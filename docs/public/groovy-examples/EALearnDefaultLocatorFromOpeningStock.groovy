package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.detail.EntityDetailLine
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.ItemDimensionsDetail
import com.namasoft.modules.supplychain.domain.details.OpeningStockLine
import com.namasoft.modules.supplychain.domain.entities.OpeningStockDocument
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensions
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensionsData
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

public class EALearnDefaultLocatorFromOpeningStock implements EntityAction<OpeningStockDocument> {
    @Override
    Result doAction(OpeningStockDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (OpeningStockLine l : doc.getDetails()) {

            def item = l.getItem().getItem()
            def detail = item.getDetails().stream().filter({
                it.getItemDimensions() != null && it.getItemDimensions().getSpecificDimensions() != null && ObjectChecker.areEqual(it.getItemDimensions().getSpecificDimensions().getWarehouse(), l.getSpecificDimensions().getWarehouse())
            }).findFirst().orElse(null);
            if (detail != null && ObjectChecker.areEqual(detail.getItemDimensions().getSpecificDimensions().getLocator(), l.getSpecificDimensions().getLocator()))
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
            detail.getItemDimensions().getSpecificDimensions().setWarehouse(l.getSpecificDimensions().getWarehouse());
            detail.getItemDimensions().getSpecificDimensions().setLocator(l.getSpecificDimensions().getLocator());
            detail.setDefaultLocator(BooleanDF.TRUE());
            EntityMediator.commitFromBusinessAction(item).addToAccumulatingResult(result);
        }
        return result;
    }

    @Override
    String describe() {
        return "Opening Stock Document: for every line, records the line's locator as the item's default locator in the line's warehouse. " +
                "The item's Details grid gets a line for that warehouse (or its existing line is updated) with the locator and " +
                "the default locator box ticked, and the item is saved. Items whose line for that warehouse already has the same " +
                "locator are not saved again. Attach it to the Post Commit event of Opening Stock Document. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
