package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.infra.domainbase.common.invoicing.IInvoice
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.InvoiceMoneyCalcualtor
import com.namasoft.infra.domainbase.util.Result

public class EACalculateMoneyFields implements EntityAction<IInvoice> {
    @Override
    Result doAction(IInvoice object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        InvoiceMoneyCalcualtor calcualtor = new InvoiceMoneyCalcualtor(object.fetchInvoiceDetails(), object.money(), object);
        calcualtor.calculate();
        return result;
    }

    @Override
    String describe() {
        return "Recalculates the money fields of an invoice (line values, discounts, taxes and totals) from its current lines. " +
                "Put it after a field map or another flow line that changes prices or quantities, on the same event. " +
                "Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
