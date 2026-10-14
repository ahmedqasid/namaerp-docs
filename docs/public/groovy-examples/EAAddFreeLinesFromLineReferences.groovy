package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.Pair
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.valueobjects.InvoiceLineMoney
import com.namasoft.modules.supplychain.domain.details.SalesLine
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.SalesDocument
import com.namasoft.modules.supplychain.domain.valueobjects.InvItemRef
import com.namasoft.modules.supplychain.domain.valueobjects.UserQuantity

import java.util.stream.Collectors

public class EAAddFreeLinesFromLineReferences implements EntityAction<SalesDocument> {
    @Override
    Result doAction(SalesDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        List<SalesLine> lines = doc.getDetails();
        for (int i = lines.size() - 1; i >= 0; i--) {
            if (i >= lines.size())
                continue;
            SalesLine line = lines.get(i)
            if (BooleanDF.isTrue(line.getFreeLine()))
                continue;
            List<Pair<InvItem, DecimalDF>> items = new ArrayList<>();
            List<Pair<GenericReference, DecimalDF>> refs = Arrays.asList(Pair.of(line.getRef1(), line.getN1()), Pair.of(line.getRef2(), line.getN2()), Pair.of(line.getRef3(), line.getN3()));
            for (Pair<GenericReference, DecimalDF> ref : refs) {
                if (GenericReference.toReal(ref.getX()) instanceof InvItem && DecimalDF.isNotEmptyOrZero(ref.getY()))
                    items.add(new Pair<>(ref.getX().toReal(), ref.getY()));
            }
            List<SalesLine> subLines = lines.stream().filter({ ObjectChecker.areEqual(it.getMasterRowId(), line.getId()) }).collect(Collectors.toList());
            lines.removeAll(subLines);
            CollectionsUtility.makeSecondSameSize(items, subLines, { doc.createLine() });
            for (int j = 0; j < items.size(); j++) {
                Pair<InvItem, DecimalDF> pair = items.get(j);
                SalesLine l = subLines.get(j);
                l.setItem(InvItemRef.from(pair.getX()));
                l.setQuantity(UserQuantity.createQuantity(pair.getX(), pair.getY()));
                l.setMasterRowId(line.getId());
                l.setFreeLine(BooleanDF.TRUE());
                l.setPrice(new InvoiceLineMoney())
                l.updateNulls();
            }
            lines.addAll(i + 1, subLines);
        }
        return result;
    }

    @Override
    String describe() {
        return "Use it on PreUpdateCalculatedFields of a sales document. For every line that is not a free line, each of Ref 1, Ref 2 " +
                "and Ref 3 that points to an item, with a quantity in N1, N2 or N3 respectively, becomes a free line placed right after " +
                "that line. The free line carries the item, that quantity in the item's base unit and an empty price, and is linked to " +
                "its line, so saving again updates the same free lines instead of adding new ones. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
