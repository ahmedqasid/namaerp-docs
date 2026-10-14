package com.namasoft.modules.accounting.utils.entityactions

import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.entities.RVPVVoucher

class EACopyViewCapabilityFromAccountToRVPV implements EntityAction<RVPVVoucher> {
    @Override
    Result doAction(RVPVVoucher object, LongTextDF... parameters) {
        for (final def line in object.fetchLines()) {
            if (line.getAccount() != null && line.getAccount().getViewCapability() != null) {
                object.setViewCapability(line.getAccount().getViewCapability());
                break;
            }
        }
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "Receipt or payment voucher: copies the View Capability of the first line account that has one into the voucher's own View Capability, " +
                "so the voucher is visible only to users who may see that account. Run it on Update Calculated Fields. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
