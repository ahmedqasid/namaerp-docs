package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.SalesPriceList

public class EAPreventChangingItemPriceLines implements EntityAction<InvItem> {
    @Override
    Result doAction(InvItem item, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (item.getCommitedBefore().isFalse() || item.getOldData() == null || item.ifCommitFromSalesPriceList())
            return result;
        def oldDetails = item.getOldData().getItemPriceLines();
        for (def line : oldDetails) {
            def newLine = DetailLineUtil.findLineWithId(item.getItemPriceLines(), line.getId());
            if (newLine == null) {
                Result.createFailureResult("Line for price list {0}, default price {1} was deleted", line.getAddToPriceList(), line.getDefaultPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getAddToPriceList(), newLine.getAddToPriceList())) {
                Result.createFailureResult("Line for price list {0}, default price {1} was changed to price list {2}", line.getAddToPriceList(), line.getDefaultPrice(), newLine.getAddToPriceList()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getDefaultPrice(), newLine.getDefaultPrice())) {
                Result.createFailureResult("Default price {0} for price list {1} was changed to {2}", line.getDefaultPrice(), line.getAddToPriceList(), newLine.getDefaultPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getMinPrice(), newLine.getMinPrice())) {
                Result.createFailureResult("Min price {0} for price list {1} was changed to {2}", line.getMinPrice(), line.getAddToPriceList(), newLine.getMinPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getMaxPrice(), newLine.getMaxPrice())) {
                Result.createFailureResult("Max price {0} for price list {1} was changed to {2}", line.getMaxPrice(), line.getAddToPriceList(), newLine.getMaxPrice()).addToAccumulatingResult(result);
                continue;
            }
            if (ObjectChecker.areNotEqual(line.getQty().getValue(), newLine.getQty().getValue())) {
                Result.createFailureResult("Quantity {0} for price list {1} was changed to {2}", line.getQty().getValue(), line.getAddToPriceList(), newLine.getQty().getValue()).addToAccumulatingResult(result);
                continue;
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Use it on ValidateOnSave of the item. Once an item has been committed, its existing Item Price in Lists lines are locked: " +
                "the save is refused when a line was deleted, or when its sales price list, default price, minimum price, maximum price " +
                "or quantity was changed. New lines can still be added. A save made by a sales price list that updates the item is not " +
                "checked. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
