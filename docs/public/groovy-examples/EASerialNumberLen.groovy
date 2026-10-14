package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.fieldids.AllModulesFieldIDs
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.primitives.SerialNumber

public class EASerialNumberLen implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (int i = 0; i < object.getDetails().size(); i++) {
            final BasicSCDocumentLine line = object.getDetails().get(i);
            SerialNumber sn = line.fetchSerialNumber();
            if (ObjectChecker.isEmptyOrNull(sn))
                continue;
            def serials = sn.unZipSerials();
            for (final def s in serials) {
                if (s.length() != 15)
                    Result.createDetailFieldValidationFailure(AllModulesFieldIDs.SalesInvoice_details_specificDimensions_serialNumber, i, "Serial number {0} length is {1}, it must be 15", s, s.length()).addToAccumulatingResult(result);
            }
        }
        return result;
    }

    @Override
    boolean shouldNotDisplayEntityFlowNameWhenFailure() {
        return true;
    }

    @Override
    String describe() {
        return "Refuses the save when a serial number on a document line is not exactly 15 characters long. " +
                "Serial ranges on a line are expanded first, and every wrong serial is reported on its own line. Takes no parameters.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
