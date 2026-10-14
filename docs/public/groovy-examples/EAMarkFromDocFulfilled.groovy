package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.dataholders.BasicSCDocumentDH

import java.util.stream.Collectors

class EAMarkFromDocFulfilled implements EntityAction<BasicSCDocument<BasicSCDocumentDH>> {
    @Override
    Result doAction(EntityTargetAction action, BasicSCDocument<BasicSCDocumentDH> object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        BasicSCDocument oldFromDoc = object.getOldData() == null ? null : GenericReference.toRealOrNull(object.getOldData().getFromDoc(), BasicSCDocument.class);
        BasicSCDocument fromDoc = GenericReference.toRealOrNull(object.getFromDoc(), BasicSCDocument.class);
        if (fromDoc == null && oldFromDoc == null)
            return result;
        applyOnFromDoc(fromDoc, object, action.isPostDelete() ? false : true);
        if (ObjectChecker.areNotEqual(fromDoc, oldFromDoc))
            applyOnFromDoc(oldFromDoc, object, false);
        return result;
    }

    void applyOnFromDoc(BasicSCDocument fromDoc, BasicSCDocument object, boolean apply) {
        if (fromDoc == null)
            return;
        List<BasicSCDocument> documents = Persister.listPageMatching(object.getEntityType(), ListPageMatchingParameters.create().criteria(
                CriteriaBuilder.create().field("fromDoc.id").equal(fromDoc.getId()).and().commitedBefore().and().field("id").notEqual(object.getId()).build()
        ));
        if (apply)
            documents.add(object);
        List<BasicSCDocumentLine> allLines = documents.stream().map({ it.getDetails() }).flatMap { it.stream() }.collect(Collectors.toList());
        Map<UniqueIDDF, List<BasicSCDocumentLine>> linesBySrcLineId = CollectionsUtility.mapList(allLines, { it.getSourceLineId() });
        boolean allLinesAreFullfilled = true;
        for (final BasicSCDocumentLine line in fromDoc.getDetails()) {
            List<BasicSCDocumentLine> lineLines = linesBySrcLineId.get(line.getId());
            if (DecimalDF.totalize(lineLines, { it.baseQtyValue() }).isLessThan(line.baseQtyValue())) {
                allLinesAreFullfilled = false;
                break;
            }
        }
        if (allLinesAreFullfilled) {
            fromDoc.allowSetting { fromDoc.setDescription1(TextDF.fromString("Fullfilled")) }
        } else {
            fromDoc.allowSetting { fromDoc.setDescription1(TextDF.fromString("")) }
        }
    }

    @Override
    String describe() {
        return "Marks this document's from-document as fulfilled. The script adds up, per from-document line, the base quantity of " +
                "the lines of every committed document of this same type that was made from it, this one included. When every " +
                "from-document line is fully covered, it writes Fullfilled into Description 1 of the from-document; otherwise it clears " +
                "Description 1. Add it twice, on PostCommit and on PostDelete. When the from-document is changed, the old one is " +
                "recalculated too. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
