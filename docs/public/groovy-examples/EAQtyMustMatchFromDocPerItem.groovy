package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.Pair
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.UOM

public class EAQtyMustMatchFromDocPerItem implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        BasicSCDocument fromDoc = GenericReference.toReal(doc.getFromDoc());
        if (fromDoc == null)
            return Result.createFailureResult("No from doc specified");
        HashMap<Pair<InvItem, UOM>, DecimalDF> docTotals = mapDocLines(doc)
        HashMap<Pair<InvItem, UOM>, DecimalDF> fromDocTotals = mapDocLines(fromDoc)
        Set<Pair<InvItem, UOM>> all = new HashSet<>(docTotals.keySet());
        all.addAll(fromDocTotals.keySet());
        for (final def item in all) {
            if (ObjectChecker.areNotEqual(fromDocTotals.get(item), docTotals.get(item)))
                Result.createFailureResult("The item {0} total quantity in from doc is {1} and in current document is {2}",
                        item.getX(), fromDocTotals.get(item), docTotals.get(item)).addToAccumulatingResult(result);
        }
        return result;
    }

    private HashMap<Pair<InvItem, UOM>, DecimalDF> mapDocLines(BasicSCDocument doc) {
        Map<Pair<InvItem, UOM>, DecimalDF> docTotals = new HashMap<>();
        for (BasicSCDocumentLine l : doc.getDetails()) {
            docTotals.computeIfAbsent(new Pair<>(l.fetchItem(), l.fetchPrimeQtyUOM()), { DecimalDF.zero() }).mutateAdd(l.fetchPrimeQtyValue());
        }
        docTotals
    }

    @Override
    String describe() {
        return "Supply chain documents: refuses the save unless, for every item and unit, the total quantity of the document equals the total quantity of its from-doc. " +
                "Every difference is reported. A document with no from-doc is refused. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}