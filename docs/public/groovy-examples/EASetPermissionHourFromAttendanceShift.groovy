package com.namasoft.modules.humanresource.utils.actions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TimeDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.modules.hr.Employee
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.humanresource.domain.entities.AbstractLeavePermission
import com.namasoft.modules.humanresource.domain.primitives.LeavePermissionType
import com.namasoft.modules.humanresource.domain.valueobjects.TimeRange
import com.namasoft.modules.humanresource.domain.valueobjects.WorkDay
import com.namasoft.modules.humanresource.utils.AttendanceCalcContext
import com.namasoft.modules.humanresource.utils.AttendanceDayShift

/**
 * إذن الانصراف - ضبط وقت الإذن من ملف الدوام
 *
 * - نوع الإذن "نسيان بصمة دخول"  : يتم تعديل (من وقت) إلى وقت بداية الدوام في ذلك اليوم
 * - نوع الإذن "نسيان بصمة خروج" : يتم تعديل (إلى وقت) إلى وقت نهاية الدوام في ذلك اليوم
 *
 * وقت الدوام يُحسب من وردية الموظف حسب خطة الدوام السارية في تاريخ الإذن،
 * مع مراعاة الورديات المضافة والأولويات. وإذا كان اليوم إجازة أسبوعية أو راحة
 * ولكن الوردية تحمل أوقات دوام لذلك اليوم، تُستخدم تلك الأوقات.
 *
 * يجب ربط هذا المسار على الحدث: PreUpdateCalculatedFields
 * حتى تُعاد المدة (leavePeriod) وتُحسب تلقائيا بعد تعديل الوقت.
 */
class EASetPermissionHourFromAttendanceShift implements EntityAction<AbstractLeavePermission> {

    @Override
    Result doAction(AbstractLeavePermission object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult()

        LeavePermissionType type = object.getPermissionType()
        if (ObjectChecker.isEmptyOrNull(type))
            return result

        boolean forgotCheckIn = ObjectChecker.areEqual(type, LeavePermissionType.ForgotCheckIn())
        boolean forgotCheckOut = ObjectChecker.areEqual(type, LeavePermissionType.ForgotCheckOut())
        // أي نوع إذن آخر لا يتم التدخل فيه
        if (!forgotCheckIn && !forgotCheckOut)
            return result

        Employee employee = object.getEmployee()
        if (ObjectChecker.isEmptyOrNull(employee))
            return result

        // تاريخ اليوم الذي سيؤخذ منه وقت الدوام
        DateDF day = forgotCheckIn ? object.getFromDate() : object.getToDate()
        if (ObjectChecker.isEmptyOrNull(day))
            day = object.getValueDate()
        if (ObjectChecker.isEmptyOrNull(day))
            return result

        WorkDay workDay = findWorkDay(employee, day)
        if (workDay == null)
            return result

        TimeDF shiftTime = forgotCheckIn ? startOfDay(workDay) : endOfDay(workDay)
        if (ObjectChecker.isEmptyOrNull(shiftTime))
            return result

        if (forgotCheckIn)
            object.setFromHour(shiftTime)
        else
            object.setToHour(shiftTime)

        return result
    }

    /**
     * يرجع بيانات يوم الدوام للموظف في التاريخ المحدد حسب خطة الدوام السارية.
     *
     * الأولوية ليوم دوام عادي. فإذا كان اليوم إجازة أسبوعية أو راحة أسبوعية،
     * نقبل أوقات ذلك اليوم من الوردية طالما كانت معرّفة فعلا (دوام في يوم إجازة).
     * ويرجع null فقط إذا لم توجد خطة دوام أو لم تكن هناك أي أوقات دوام لذلك اليوم.
     */
    private static WorkDay findWorkDay(Employee employee, DateDF day) {
        AttendanceCalcContext.EmployeeAttendancePlanData planData =
                AttendanceCalcContext.getRelatedPlans(day, day.nextDay(), employee)
        List<AttendanceDayShift> dayShifts =
                AttendanceCalcContext.calcAttendancePlanFor(day, employee, planData, new ArrayList<>())
        WorkDay weekEndFallback = null
        for (AttendanceDayShift dayShift : dayShifts) {
            if (ObjectChecker.isEmptyOrNull(dayShift.getShift()))
                continue
            WorkDay workDay = dayShift.getShift().getWorkDayAndReturnNullIfWeekEnd(day, dayShift.getWeekendLines())
            if (workDay != null)
                return workDay
            if (weekEndFallback == null) {
                WorkDay weekEndDay = dayShift.getShift().getWorkDay(day, dayShift.getWeekendLines())
                if (hasWorkTimes(weekEndDay))
                    weekEndFallback = weekEndDay
            }
        }
        return weekEndFallback
    }

    /** هل يحمل يوم الدوام أي فترة دوام حقيقية (بداية تختلف عن النهاية) */
    private static boolean hasWorkTimes(WorkDay workDay) {
        if (workDay == null)
            return false
        return ObjectChecker.isNotEmptyOrNull(WorkDay.createWorkHoursList(workDay))
    }

    /** بداية أول فترة دوام في اليوم (تراعي الورديات المقسمة: فترة 1 و 2 و 3) */
    private static TimeDF startOfDay(WorkDay workDay) {
        TimeRange range = workDay.findFirstTimeRange()
        return range == null ? null : range.getStart()
    }

    /** نهاية آخر فترة دوام في اليوم */
    private static TimeDF endOfDay(WorkDay workDay) {
        TimeRange range = workDay.findLastTimeRange()
        return range == null ? null : range.getEnd()
    }

    @Override
    boolean shouldNotDisplayEntityFlowNameWhenFailure() {
        return true
    }

    @Override
    String describe() {
        return "Leave Permission: when the permission type is Forgot Check In, sets From Hour to the start of the employee's first work period " +
                "on that day; when it is Forgot Check Out, sets To Hour to the end of the last work period. The work periods come from " +
                "the employee's shift in the attendance plan in force on that day, including added shifts and priorities; on a weekend " +
                "or weekly rest day the shift's own times for that day are used if it has any. Other permission types are not changed. " +
                "Attach it to the Pre Update Calculated Fields event so that the permission period is recalculated. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
