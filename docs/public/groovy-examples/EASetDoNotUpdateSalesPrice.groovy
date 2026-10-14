package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.modules.basic.bookandterm.DocumentTerm
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.valueobjects.SalesDocTermConfig
import com.namasoft.modules.supplychain.utils.SCEntityTypes

public class EASetDoNotUpdateSalesPrice implements EntityAction<DocumentTerm> {
    @Override
    Result doAction(DocumentTerm term, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (ObjectChecker.areNotEqual(term.getDocumentType(), SCEntityTypes.SalesReturnRequest()))
            return result;
        SalesDocTermConfig config = term.getTermConfig();
        config.setDoNotUpdatePricesAtAll(BooleanDF.TRUE());
        return result;
    }

    @Override
    String describe() {
        return "Use it on PreUpdateCalculatedFields of Document Term. When a term for Sales Return Request is saved, the script ticks " +
                "Do Not Update Prices At All on the From Document page of its configuration, so a user cannot leave it off. " +
                "Terms of other document types are saved unchanged. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
