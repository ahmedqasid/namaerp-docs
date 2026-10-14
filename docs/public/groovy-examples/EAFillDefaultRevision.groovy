package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.NaMaLogger
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

public class EAFillDefaultRevision implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (int i = 0; i < doc.getDetails().size(); i++) {
            BasicSCDocumentLine l = doc.getDetails().get(i);
            if (l.fetchItem() == null)
                continue;
            if (l.getSpecificDimensions() == null)
                l.setSpecificDimensions(new ItemSpecificDimensions());
            if (ObjectChecker.isNotEmptyOrNull(l.getSpecificDimensions().getRevisionId()))
                continue;
            if (BooleanDF.isFalse(l.fetchItem().getHasRevisions()))
                continue;
            l.getSpecificDimensions().setRevisionId(l.fetchItem().findDefaultRevision());
            if (ObjectChecker.isEmptyOrNull(l.getSpecificDimensions().getRevisionId()))
                l.getSpecificDimensions().setRevisionId(l.fetchItem().getRevisions().get(0).getRevisionId());
        }
        return result;
    }

    @Override
    String describe() {
        return "Gives every document line whose item has revisions and whose revision is empty the item's default revision, " +
                "or the item's first revision when none is marked as default. Lines that already have a revision are left as they are. " +
                "Takes no parameters.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
