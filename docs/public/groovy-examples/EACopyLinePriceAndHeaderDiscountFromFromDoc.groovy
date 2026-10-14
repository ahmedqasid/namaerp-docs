package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.Pair
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.details.SalesLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.SalesDocument

public class EACopyLinePriceAndHeaderDiscountFromFromDoc implements EntityAction<SalesDocument> {
    @Override
    Result doAction(SalesDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (SalesLine l : doc.getDetails()) {
            Pair<BasicSCDocument, BasicSCDocumentLine> parent = doc.fetchParentLine(l, BasicSCDocument.class);
            if (parent != null) {
                l.setPrice(parent.getY().getPrice().cloneData());
                doc.getMoney().getHeaderDiscount().setPercentage(parent.getX().getMoney().getHeaderDiscount().getPercentage());
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Sales documents: every line that was made from a line of another document takes that source line's unit price, " +
                "and the document takes the source document's header discount percentage. Lines with no source line keep their price. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}