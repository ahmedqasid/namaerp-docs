package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.requests.InvTransReqLine
import com.namasoft.modules.basic.domain.requests.inv.InvTransReq
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.Warehouse

class EASetInvRequestAnalysisSetFromWarehouse implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (!(object.fetchCurrentlySendingRequest() instanceof InvTransReq))
            return result;
        InvTransReq req = object.fetchCurrentlySendingRequest();
        for (final InvTransReqLine l in req.getList().getLines()) {
            if (l.getSpecificDimensions() == null)
                continue;
            if (l.getSpecificDimensions().getWarehouse() == null)
                continue;
            Warehouse w = l.getSpecificDimensions().getWarehouse().toReal();
            l.getGenericDimensions().setAnalysisSet(w.getAnalysisSet());
        }
        return result;
    }

    @Override
    String describe() {
        return "Use it on PreSendRequest. When the document sends its inventory transaction request, every request line that has a " +
                "warehouse takes the analysis set of that warehouse, so the inventory effect is recorded under the warehouse's analysis set. " +
                "The document's own lines are not changed, and other requests (such as the accounting request) are left alone. " +
                "Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
