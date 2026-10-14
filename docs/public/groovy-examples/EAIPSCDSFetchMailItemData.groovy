package com.namasoft.modules.frm.contracts.impl

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.contracts.common.dtos.requests.SendRequest
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.frm.domain.details.AbstractIPSMailItemLine
import com.namasoft.modules.frm.domain.entities.IPSPostalParcelsSort
import com.namasoft.commonservices.factories.ReferenceFactory

class EAIPSCDSFetchMailItemData implements EntityAction<IPSPostalParcelsSort> {
    @Override
    Result doAction(IPSPostalParcelsSort object, LongTextDF... parameters) {
        FRMUtilityWSImpl ws = new FRMUtilityWSImpl();
        for (final AbstractIPSMailItemLine detail in object.getDetails()) {
            def mailItemData = ws.fetchMailItemsDataFromIPS(new SendRequest<>(detail.mailItemId.primitiveValue)).getData();
            if (ObjectChecker.isEmptyOrNull(mailItemData))
                continue;
            if (mailItemData.getMailItemWeightIPS() != null && ObjectChecker.isNotEmptyOrZero(mailItemData.getMailItemWeightIPS()))
                detail.setMailItemWeightIPS(DecimalDF.fromBigDecimal(mailItemData.getMailItemWeightIPS()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getMailSubclassId()))
                detail.setMailSubclassId(ReferenceFactory.fetchReference(mailItemData.getMailSubclassId()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getOriginCountry()))
                detail.setOriginCountry(ReferenceFactory.fetchReference(mailItemData.getOriginCountry()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getMailClass()))
                detail.setMailClass(ReferenceFactory.fetchReference(mailItemData.getMailClass()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getMailCategory()))
                detail.setMailCategory(ReferenceFactory.fetchReference(mailItemData.getMailCategory()))
//            values.addValue(IPSManifestForCustody_details_value, mailItemData.getValue());
//            values.addValue(IPSManifestForCustody_details_currency, mailItemData.getCurrency());
//            detail.setreceiverContactNo, FlatObjectUtilies.createFlatObject(mailItemData.getReceiverContactNo()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getHsCode()))
                detail.setHsCode(TextDF.fromString(mailItemData.getHsCode()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getRevisedHSCode()))
                detail.setRevisedHSCode(TextDF.fromString(mailItemData.getRevisedHSCode()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getReceiverName()))
                detail.setReceiverName(TextDF.fromString(mailItemData.getReceiverName()));
            if (ObjectChecker.isNotEmptyOrNull(mailItemData.getMailItemDescription()))
                detail.setMailItemDescription(TextDF.fromString(mailItemData.getMailItemDescription()));
        }
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "IPS postal parcels sort: for every line, asks the IPS service about the line's mail item id and fills in what it returns: weight, " +
                "mail subclass, origin country, mail class, mail category, HS code, revised HS code, receiver name and item description. " +
                "A value the service does not return is left as it is. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
