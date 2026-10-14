package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.infra.domainbase.util.xml.XmlSerializer
import com.namasoft.modules.supplychain.domain.details.SalesInvoiceLine
import com.namasoft.modules.supplychain.domain.details.SalesReturnLine
import com.namasoft.modules.supplychain.domain.entities.SalesInvoice
import com.namasoft.modules.supplychain.domain.entities.SalesReturn

class EACollectInvoicesInReturn implements EntityAction<SalesReturn> {
    private Map<SalesInvoiceLine, DecimalDF> linesRemainingQty = new HashMap<>();
    private SalesReturn returnDoc;
    private LongTextDF copyExtraFieldsParam;

    @Override
    Result doAction(SalesReturn object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        this.returnDoc = object;
        this.copyExtraFieldsParam = parameters[2];
        List<SalesReturnLine> details = object.getDetails();

        for (int i = 0; i < details.size(); i++) {
            def detail = details.get(i);
            if (detail.getSourceInvoice() != null)
                continue;
            object.setCurrentLine(detail);
            def queryResult = Persister.prepareAndExecuteJDBCQuery(object, parameters[1].getPrimitiveValue());

            for (final def l in queryResult) {
                if (DecimalDF.isEmptyOrZero(detail.fetchPrimeQtyValue()))
                    break;
                SalesInvoice invoice = Persister.findByID(SalesInvoice.class, UniqueIDDF.fromObject(l[0]));
                SalesInvoiceLine invoiceLine = Persister.findByID(SalesInvoiceLine.class, UniqueIDDF.fromObject(l[1]));
                DecimalDF lineRemaining = linesRemainingQty.computeIfAbsent(invoiceLine, { it.fetchPrimeQtyValue().subtract(it.getReturnedQty()) });
                if (DecimalDF.isEmptyOrZero(lineRemaining))
                    continue;
                if (detail.fetchPrimeQtyValue().isGreaterThan(lineRemaining)) {
                    def clone = XmlSerializer.getInstance().clone(detail);
                    clone.updatePrimaryQty(clone.fetchPrimeQtyValue().subtract(lineRemaining));
                    clone.setId(UniqueIDDF.createRandomUniqueIDDF());
                    details.add(i + 1, clone);
                    consumeQty(invoice, invoiceLine, detail, lineRemaining);
                    i += 1;
                    detail = clone;
                } else {
                    consumeQty(invoice, invoiceLine, detail, detail.fetchPrimeQtyValue());
                    break;
                }
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Sales return: links every line that has no invoice yet to the sales invoice lines returned by the query in parameter 2. " +
                "The query runs once per line, can use {currentLine...} fields, and returns the invoice id in its first column and the invoice line id in its second. " +
                "The line takes the quantity still returnable on each invoice line in turn, with that line's price and free item flag: " +
                "when it has more quantity than one invoice line can take, the line is split and the rest goes to the next invoice line. " +
                "Parameter 3 is an optional field map copied from the invoice to the return for each linked line. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Query to find invoices per line, example: select top 15 s.id invoiceId,l.id lineId from SalesInvoiceLine l inner join SalesInvoice s on s.id = l.salesInvoice_id\n" +
                "where s.commitedBefore = 1 and l.quantityBaseValue - coalesce(l.returnedQty,0) >0 and l.item_id = {currentLine.item.item} and l.lotid = {currentLine.specificDimensions.lotId}  and l.customer_id = {customer.id} order by s.valueDate, s.creationDate ",
                "Extra fields map, example: currentLine.n1=currentLine.n2"
        );
    }

    void consumeQty(SalesInvoice invoice, SalesInvoiceLine invoiceLine, SalesReturnLine detail, DecimalDF consumedQty) {
        detail.updatePrimaryQty(consumedQty);
        detail.setOrginDoc(invoice.toGenericReference());
        detail.setSourceInvoice(invoice);
        detail.setSourceLineId(invoiceLine.getId());
        detail.setPrice(invoiceLine.getPrice().cloneData());
        detail.setFreeLine(invoiceLine.getFreeLine());
        linesRemainingQty.put(invoiceLine, linesRemainingQty.get(invoiceLine).subtract(consumedQty));
        if (ObjectChecker.isNotEmptyOrNull(copyExtraFieldsParam)) {
            returnDoc.setCurrentLine(detail);
            invoice.setCurrentLine(invoiceLine);
            EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(invoice, returnDoc, copyExtraFieldsParam.getPrimitiveValue());
        }
    }
}
