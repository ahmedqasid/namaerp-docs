package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.LimitSalesQtyLine
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.LimitSalesQty
import com.namasoft.modules.supplychain.utils.SCEntityTypes

public class EAMaintainLimitSalesQtyFromItem implements EntityAction<InvItem> {
    @Override
    Result doAction(InvItem object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        LimitSalesQty target = EAGenerateEntityFromEntityAction.findOrCreateTarget(object, result, SCEntityTypes.LimitSalesQty(), parameters[1].getPrimitiveValue(), false, false);
        if (result.failed())
            return result;
        def line = target.getDetails().stream().filter({ ObjectChecker.areEqual(it.getItem(), object) }).findFirst().orElse(null);
        if (line == null) {
            line = new LimitSalesQtyLine();
            target.getDetails().add(line);
        }
        line.setItem(object);
        line.setPeriodInDays(object.getItemDensity().toIntegerDF());
        line.setQtyLimitForCustomer(object.getItemLength());
        if (DecimalDF.isEmptyOrZero(line.getQtyLimitForCustomer()))
            target.getDetails().remove(line);
        EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(object, target, parameters[2].getPrimitiveValue());
        EntityMediator.commitFromBusinessAction(target).addToAccumulatingResult(result);
        return result;
    }

    @Override
    String describe() {
        return "Use it on PostCommit of the item. The script finds the Limit Sales Qty record returned by the finder query in parameter 2, " +
                "or creates a new one when the query returns nothing, and keeps one line for this item in its grid: Period In Days takes " +
                "the item's Item Density and Quantity Limit takes the item's Item Length. When Item Length is zero the item's line is " +
                "removed. The fields map in parameter 3 is then applied to the record, and the record is saved. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Finder Query (eg. select id from LimitSalesQty where code = {itemClass1.code} )", "Fields Map (eg. \ncode=itemClass1.code\ngroup=\"G1\")");
    }
}
