package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.IntegerDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.entities.Customer
import com.namasoft.modules.supplychain.domain.details.LimitSalesMultiplyByQtyLine
import com.namasoft.modules.supplychain.domain.entities.LimitSalesQty
import com.namasoft.modules.supplychain.utils.SCEntityTypes

public class EAMaintainLimitSalesQtyFromCustomer implements EntityAction<Customer> {
    @Override
    Result doAction(Customer object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        LimitSalesQty target = EAGenerateEntityFromEntityAction.findOrCreateTarget(object, result, SCEntityTypes.LimitSalesQty(), parameters[1].getPrimitiveValue(), false, false);
        if (result.failed())
            return result;
        def line = target.getMultipliedByQties().stream().filter({ ObjectChecker.areEqual(it.getCustomer(), object) }).findFirst().orElse(null);
        if (line == null) {
            line = new LimitSalesMultiplyByQtyLine();
            target.getMultipliedByQties().add(line);
        }
        line.setCustomer(object);
        line.setPeriodInDays(IntegerDF.fromInteger(ObjectChecker.tryParseInt(object.getShippingAddress().getCity().getPrimitiveValue())));
        line.setMultiplyQtyLimitBy(DecimalDF.fromBigDecimal(ObjectChecker.tryParseDecimal(object.getShippingAddress().getArea().getPrimitiveValue())));
        EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(object, target, parameters[2].getPrimitiveValue());
        EntityMediator.commitFromBusinessAction(target).addToAccumulatingResult(result);
        return result;
    }

    @Override
    String describe() {
        return "Use it on PostCommit of the customer. The script finds the Limit Sales Qty record returned by the finder query in parameter 2, " +
                "or creates a new one when the query returns nothing, and keeps one line for this customer in its Multiplied By Quantities " +
                "grid: Period In Days takes the number typed in the City of the customer's shipping address, and Quantity Limit Multiplied By " +
                "takes the number typed in its Area. The fields map in parameter 3 is then applied to the record, and the record is saved. " +
                "Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Finder Query (eg. select id from LimitSalesQty where code = {customerCategory.code} )", "Fields Map (eg. \ncode=customerCategory.code\ngroup=\"G1\")");
    }
}
