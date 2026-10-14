package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.Pair
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.details.SalesInvoiceIssue
import com.namasoft.modules.supplychain.domain.details.SalesInvoiceLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.SalesInvoice
import com.namasoft.modules.supplychain.domain.entities.SalesOrder

public class EACopyLinePriceFromSalesOrderViaStockIssue implements EntityAction<SalesInvoice> {
    @Override
    Result doAction(SalesInvoice doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (SalesInvoiceLine l : doc.getDetails()) {
            Pair<BasicSCDocument, BasicSCDocumentLine> parent = doc.fetchParentLine(l, SalesOrder.class);
            if (parent != null) {
                l.setPrice(parent.getY().getPrice().cloneData());
                doc.getMoney().getHeaderDiscount().setPercentage(parent.getX().getMoney().getHeaderDiscount().getPercentage());
            } else {
                for (SalesInvoiceIssue issue : doc.getStockDocs()) {
                    if (issue.getStockDoc() == null)
                        continue;
                    def issueParent = DetailLineUtil.findLineWithId(issue.getStockDoc().getDetails(), l.getSourceLineId());
//                    Result.createFailureResult("Found line {0} - 1", issueParent).addToAccumulatingResult(result);
                    if (issueParent == null)
                        continue;
                    def issueParentParent = issue.getStockDoc().fetchParentLine(issueParent, SalesOrder.class);
//                    Result.createFailureResult("Found line {0} - 2", issueParentParent).addToAccumulatingResult(result);
                    if (issueParentParent != null) {
                        l.setN1(issueParentParent.getY().getN1());
                        l.setPrice(issueParentParent.getY().getPrice().cloneData());
                        doc.getMoney().getHeaderDiscount().setPercentage(issueParentParent.getX().getMoney().getHeaderDiscount().getPercentage());
                    }
                }
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Sales invoice: every line that traces back to a sales order line, directly or through earlier documents, takes that order line's unit price, " +
                "and the invoice takes the order's header discount percentage. A line that does not is looked up in the stock issues of the Stock Documents grid: " +
                "when it came from a stock issue line that traces back to a sales order line, it takes that order line's unit price and N1, " +
                "and the invoice takes the order's header discount percentage. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}