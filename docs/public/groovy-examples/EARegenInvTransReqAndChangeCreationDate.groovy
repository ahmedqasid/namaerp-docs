package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.utils.InvSystemFilesUtils

class EARegenInvTransReqAndChangeCreationDate implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        object.setCreationDate(object.creationDate().addMilliSeconds(1));
        InvSystemFilesUtils.update(object).addToAccumulatingResult(result);
        return result;
    }

    @Override
    String describe() {
        return "Manual flow for documents that carry their own inventory effect (stock issues, stock receipts, stock transfers and " +
                "similar). Moves the document's creation date 1 millisecond later and sends its inventory transaction request again as an " +
                "update, so its inventory effect is processed again. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}