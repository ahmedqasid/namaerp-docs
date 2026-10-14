package com.namasoft.infor.domainbase.util.actions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.common.utilities.StringUtils
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.security.NaMaUser
import com.namasoft.infra.domainbase.util.Result

import java.util.stream.Collectors

class EARemoveAllFCMTokens implements EntityAction<NaMaUser> {
    @Override
    Result doAction(NaMaUser object, LongTextDF... parameters) {
        if (object.getSettings() == null || ObjectChecker.isEmptyOrNull(object.getSettings().getFcmDeviceTokens()))
            return Result.createSuccessResult();
        List<String> tokens = StringUtils.csvLineToList(object.getSettings().getFcmDeviceTokens().getPrimitiveValue()).stream().distinct()
                .collect(Collectors.toList());
        object.getSettings().setFcmDeviceTokens(LongTextDF.fromString(tokens.last()));
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "Manual flow on users (target type User). Removes repeated and older mobile app device tokens from User Device " +
                "Tokens For Mobile Apps and keeps only the last one registered, so push notifications reach that one device. Run it on " +
                "one user, or on many users through a task schedule with EARunEntityFlowFromQuery. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
