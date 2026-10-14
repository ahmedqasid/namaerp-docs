package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.primitives.LotId
import com.namasoft.modules.supplychain.domain.primitives.SerialNumber

public class EACopySerialToLot implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (BasicSCDocumentLine l : doc.getDetails()) {
            if (l.fetchItem() == null)
                continue;
            if (l.getSpecificDimensions() == null)
                continue;
            if (ObjectChecker.isNotEmptyOrNull(l.getSpecificDimensions().getLotId()))
                continue;
            if (ObjectChecker.isEmptyOrNull(l.getSpecificDimensions().getSerialNumber()))
                continue;
            if (BooleanDF.isTrue(l.fetchItem().getHasSerial()))
                continue;
            if (BooleanDF.isFalse(l.fetchItem().getHasLot()))
                continue;
            l.getSpecificDimensions().setLotId(LotId.fromString(l.getSpecificDimensions().getSerialNumber().getPrimitiveValue()));
            l.getSpecificDimensions().setSerialNumber(SerialNumber.createEmpty());
        }
        return result;
    }

    @Override
    String describe() {
        return "For items that are lot tracked but not serial tracked: when a document line has a serial number and no lot, " +
                "moves the serial number into the lot and clears the serial number. Takes no parameters.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
