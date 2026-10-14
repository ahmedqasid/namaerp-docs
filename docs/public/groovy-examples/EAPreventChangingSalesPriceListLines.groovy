package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.SalesPriceListLine
import com.namasoft.modules.supplychain.domain.entities.DeliveryDocument
import com.namasoft.modules.supplychain.domain.entities.SalesPriceList

public class EAPreventChangingSalesPriceListLines implements EntityAction<SalesPriceList> {
    @Override
    Result doAction(SalesPriceList list, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (list.getCommitedBefore().isFalse() || list.getOldData() == null || list.ifCommitFromItem())
            return result;
        def oldDetails = list.getOldData().getDetails();
        for (def line : oldDetails) {
            def newLine = DetailLineUtil.findLineWithId(list.getDetails(), line.getId());
            if (newLine == null) {
                Result.createFailureResult("Line for item {0}, default price {1} was deleted", line.getItem(), line.getDefaultPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getItem(), newLine.getItem())) {
                Result.createFailureResult("Line for item {0}, default price {1} was changed to item {2}", line.getItem(), line.getDefaultPrice(), newLine.getItem()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getDefaultPrice(), newLine.getDefaultPrice())) {
                Result.createFailureResult("Default price {0} for item {1} was changed to {2}", line.getDefaultPrice(), line.getItem(), newLine.getDefaultPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getMinPrice(), newLine.getMinPrice())) {
                Result.createFailureResult("Min price {0} for item {1} was changed to {2}", line.getMinPrice(), line.getItem(), newLine.getMinPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getMaxPrice(), newLine.getMaxPrice())) {
                Result.createFailureResult("Max price {0} for item {1} was changed to {2}", line.getMaxPrice(), line.getItem(), newLine.getMaxPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getQty().getValue(), newLine.getQty().getValue())) {
                Result.createFailureResult("Quantity {0} for item {1} was changed to {2}", line.getQty().getValue(), line.getItem(), newLine.getQty().getValue()).addToAccumulatingResult(result);
                continue;
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Use it on ValidateOnSave of the sales price list. Once a sales price list has been committed, its existing lines are " +
                "locked: the save is refused when a line was deleted, or when its item, default price, minimum price, maximum price " +
                "or quantity was changed. New lines can still be added. A save made by an item that updates the price list is not " +
                "checked. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
