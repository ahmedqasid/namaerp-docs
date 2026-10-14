package com.namasoft.modules.humanresource.utils.actions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TimeDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.humanresource.domain.details.TimeAttendanceLine
import com.namasoft.modules.humanresource.domain.entities.TimeAttendance

public class EAClearToDateIfToTimeIsMidnight implements EntityAction<TimeAttendance> {
    @Override
    Result doAction(TimeAttendance doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        TimeDF _00_00 = TimeDF.fromString("00:00");
        for (TimeAttendanceLine l : doc.getAttendanceLines()) {
            if (ObjectChecker.areEqual(l.getToTime(),_00_00))
            {
                l.setToTime(TimeDF.EMPTY());
                l.setToDate(null)
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Time Attendance: clears the Out date and Out time of every attendance line whose Out time is exactly 00:00, " +
                "so that a missing check-out that the attendance machine wrote as midnight is not counted as a check-out at midnight. " +
                "Attach it to the Pre Update Calculated Fields event of Time Attendance. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }

}
