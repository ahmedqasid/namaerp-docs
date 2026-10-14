package com.namasoft.modules.humanresource.utils.actions


import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TimeDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.humanresource.domain.entities.TimeAttendance

public class EATimeAttendanceMakeInOutIfBeforeTime implements EntityAction<TimeAttendance> {
    @Override
    Result doAction(TimeAttendance object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        TimeDF cuttOf = TimeDF.fromString(parameters[1].getPrimitiveValue());
        for (final def line in object.getAttendanceLines()) {
            if (line.getToDate() != null)
                continue;
            if (line.getFromDate() == null)
                continue;
            if (line.getFromTime() >= cuttOf) {
                line.setToDate(line.getFromDate());
                line.setToTime(line.getFromTime());
                line.setFromDate(null);
                line.setFromTime(TimeDF.EMPTY());
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Time Attendance: an attendance line that has an In date but no Out date, and whose In time is at or after the cut-off time " +
                "in parameter 2, is turned into a check-out: its In date and time move to Out, and In is cleared. " +
                "Lines that already have an Out date are not changed. " +
                "Attach it to the Pre Update Calculated Fields event of Time Attendance. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Cut Off Time (eg. 11:30)")
    }
}
