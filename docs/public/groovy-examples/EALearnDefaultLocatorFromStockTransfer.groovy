package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.detail.EntityDetailLine
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.ItemDimensionsDetail
import com.namasoft.modules.supplychain.domain.details.StockTransferLine
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.StockTransfer
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensions
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensionsData
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

public class EALearnDefaultLocatorFromStockTransfer implements EntityAction<StockTransfer> {
    @Override
    Result doAction(StockTransfer doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (StockTransferLine l : doc.getDetails()) {

            def item = l.getItem().getItem()
            def detail = item.getDetails().stream().filter({
                it.getItemDimensions() != null && it.getItemDimensions().getSpecificDimensions() != null && ObjectChecker.areEqual(it.getItemDimensions().getSpecificDimensions().getWarehouse(), l.getToWarehouse())
            }).findFirst().orElse(null);
            if (detail != null && ObjectChecker.areEqual(detail.getItemDimensions().getSpecificDimensions().getLocator(), l.getToLocator()))
                continue;
            item.startEditing().addToAccumulatingResult(result);
            if (detail == null) {
                detail = new ItemDimensionsDetail();
                item.getDetails().add(detail);
                detail.setItemDimensions(new ItemDimensions());
                detail.getItemDimensions().setSpecificDimensions(new ItemSpecificDimensions());
                detail.setData(new ItemDimensionsData());
            } else {
                detail = EntityDetailLine.findById(item.getDetails(), detail.getId());
            }
            detail.getItemDimensions().getSpecificDimensions().setWarehouse(l.getToWarehouse());
            detail.getItemDimensions().getSpecificDimensions().setLocator(l.getToLocator());
            detail.setDefaultLocator(BooleanDF.TRUE());
            detail.getData().setDesirable(BooleanDF.TRUE());
            EntityMediator.commitFromBusinessAction(item).addToAccumulatingResult(result);
        }
        return result;
    }

    @Override
    String describe() {
        return "Stock Transfer: for every line, records the line's to locator as the item's default locator in its to warehouse. " +
                "The item's Details grid gets a line for that warehouse (or its existing line is updated) with the locator, " +
                "the default locator box ticked and Desirable ticked, and the item is saved. Items whose line for that warehouse " +
                "already has the same locator are not saved again. Attach it to the Post Commit event of Stock Transfer. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
