package com.namasoft.modules.humanresource.utils.actions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.EntityCodeDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.BaseEntity
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.modules.hr.Employee
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.basic.utils.BSCEntityTypes
import com.namasoft.modules.humanresource.domain.details.AttendancePlanLine
import com.namasoft.modules.humanresource.domain.entities.AbstractVacationDocument
import com.namasoft.modules.humanresource.domain.entities.AttendanceShift
import com.namasoft.modules.humanresource.utils.AttendanceCalcContext

class EAFindDaysInfoForEmployee implements EntityAction<BaseEntity> {

    @Override
    Result doAction(BaseEntity object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Employee employee = Persister.findByIdOrCode(BSCEntityTypes.Employee(), EntityCodeDF.fromString(ObjectChecker.toStringOrEmpty(parameters[1])));
        if (employee == null) {
            Result.createFailureResult("Could not found employee with code {0}", parameters[1]).addToAccumulatingResult(result);
            return result;
        }
        DateDF fromDate = tryParseDate(parameters[2]);
        DateDF toDate = fromDate;
        if (ObjectChecker.isNotEmptyOrNull(parameters[3]))
            toDate = tryParseDate(parameters[3]);
        while (fromDate.lessThanOrEqual(toDate)) {
            List<AttendancePlanLine> plans = AttendanceCalcContext.getRelatedPlans(fromDate, fromDate.nextDay(), employee).attendancePlanLines();
            List<DateDF> holidays = AbstractVacationDocument.getHolidays(fromDate, fromDate.nextDay(), employee);
            List<DateDF> weekEnds = AbstractVacationDocument.getWeekEnds(fromDate, fromDate.nextDay(), employee);
            List<DateDF> weekRests = AbstractVacationDocument.getWeekRests(fromDate, fromDate.nextDay(), employee);
            for (AttendancePlanLine line : plans) {
                AttendanceShift shift = line.getShift();
                if (shift == null)
                    Result.createFailureResult("There is no attendance for employee {0} at date {1}", employee.getCode(), fromDate).addToAccumulatingResult(result);
                else
                    Result.createFailureResult("Employee {0} at date {1} was at attendance shift with code {2} (holiday: {3} , week end : {4} , week rest : {5})", employee.getCode(), fromDate, shift.getCode(), holidays.contains(fromDate), weekEnds.contains(fromDate), weekRests.contains(fromDate)).addToAccumulatingResult(result);
            }
            fromDate = fromDate.nextDay();
        }
        return result;
    }

    private static DateDF tryParseDate(LongTextDF dateAsString) {
        DateDF date;
        try {
            date = DateDF.fromString(ObjectChecker.toStringOrEmpty(dateAsString));
        } catch (Exception e) {
            date = DateDF.today();
        }
        return date;
    }

    @Override
    Result validateParameters(ParamValidationInfo info, EntityTargetAction action, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        EntityAction.ensureParamIsNotEmpty(info, result, 1, parameters);
        return result;
    }

    @Override
    String describe() {
        return "Diagnostic: for the employee whose code is in parameter 2, lists one message per day from the date in parameter 3 to the date " +
                "in parameter 4, naming the attendance shift the system finds for that day and whether the day is a holiday, a weekend " +
                "or a weekly rest day. Dates are written yyyy-MM-dd; an empty or unreadable From Date means today, and an empty To Date " +
                "means the From Date only. The messages are reported as errors, so the run changes nothing. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Employee Code", "From Date (yyyy-MM-dd)", "To Date (yyyy-MM-dd)");
    }
}
