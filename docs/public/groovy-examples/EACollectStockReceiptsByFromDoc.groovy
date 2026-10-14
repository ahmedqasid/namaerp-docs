package com.namasoft.modules.srvcenter.domain.utils

import com.namasoft.common.fieldids.NotGeneratedFields
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.srvcenter.domain.entities.SIReceipt
import com.namasoft.modules.supplychain.domain.entities.AbsPurchaseInvoice
import com.namasoft.modules.supplychain.domain.entities.StockReceipt
import com.namasoft.modules.supplychain.domain.utils.InvoiceStockLine

import java.util.stream.Collectors

public class EACollectStockReceiptsByFromDoc implements EntityAction<AbsPurchaseInvoice> {
    @Override
    Result doAction(AbsPurchaseInvoice doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        List<SIReceipt> receipts = Persister.listPageMatching(SIReceipt.class, ListPageMatchingParameters.create().criteria(CriteriaBuilder.create().field(NotGeneratedFields.fromDoc + ".id").equal(doc.getFromDoc().getId())));
        List<UniqueIDDF> receiptsIds = receipts.stream().map({ R -> R.getId() }).collect(Collectors.toList());
        List<StockReceipt> stockReceipts = new ArrayList<>();
        if (ObjectChecker.isNotEmptyOrNull(receiptsIds))
            stockReceipts = Persister.listPageMatching(StockReceipt.class, ListPageMatchingParameters.create().criteria(CriteriaBuilder.create().field(NotGeneratedFields.fromDoc + ".id").in(receiptsIds)));
        CollectionsUtility.makeSecondSameSize(stockReceipts, doc.getStockDocs(), { -> doc.createNewInvoiceStockLine() });
        for (int i = 0; i < stockReceipts.size(); i++) {
            InvoiceStockLine line = doc.getStockDocs().get(i);
            StockReceipt receipt = stockReceipts.get(i);
            line.updateStockDoc(receipt);
            line.setValueDate(receipt.getValueDate());
        }
        return result;
    }

    @Override
    String describe() {
        return "Purchase invoice: fills the Stock Documents grid with the stock receipts that were made from the Car Receipts " +
                "of the invoice's from-doc. Rows already in the grid are overwritten, extra rows are removed, and each row takes the receipt and its date. " +
                "Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
