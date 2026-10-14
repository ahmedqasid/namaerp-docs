package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy


import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.PercentageDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.SalesInvoiceLine
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.SalesDocument
import com.namasoft.modules.supplychain.domain.valueobjects.InvItemRef
import com.namasoft.modules.supplychain.domain.valueobjects.UserQuantity

public class EAEInvoiceCreationWithCustomServiceFees implements EntityAction<SalesDocument> {

    @Override
    Result doAction(SalesDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (DecimalDF.isEmptyOrZero(doc.money().service1Fees))
            return result;
        SalesInvoiceLine l = new SalesInvoiceLine()
        l.updateNulls()
        def item = Persister.findByIdOrCode(InvItem.class, parameters[1].getPrimitiveValue())
        l.setItem(InvItemRef.from(item))
        l.setQuantity(UserQuantity.createQuantity(item, DecimalDF.one()));
        l.getPrice().setUnitPrice(doc.money().service1Fees)
        l.getPrice().getTax1().setMaxNormalPercent(PercentageDF.fromInteger(15))
        l.getPrice().getTax1().setValue(doc.money().service2Fees)
        doc.fetchExtraElectronicInvoiceDetails().add(l)
        return result;
    }

    @Override
    String describe() {
        return "Run it on EInvoice Creation. When the sales document has Service Fees 1, the electronic invoice gets an extra line for the item in " +
                "parameter 2 (code or id): quantity 1, unit price = Service Fees 1, tax 1 at 15% with its value taken from Service Fees 2. " +
                "The document itself is not changed. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Service Fees 1 Item")
    }
}