package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy


import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.primitives.ItemColorDF
import com.namasoft.modules.supplychain.domain.primitives.ItemSizeDF
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

public class EAFillDefaultSizeAndColor implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (BooleanDF.isFalse(doc.getCommitedBefore()))
            return result;
        List<BasicSCDocumentLine> details = doc.getDetails();
        for (BasicSCDocumentLine detail : details) {
            if (detail.fetchItem() == null)
                continue;
            if (detail.getSpecificDimensions() == null)
                detail.setSpecificDimensions(new ItemSpecificDimensions());
            if (BooleanDF.isTrue(detail.fetchItem().getHasSize())) {
                if (ObjectChecker.isEmptyOrNull(detail.fetchSize()) || !detail.fetchItem().containsSize(detail.fetchSize())) {
                    for (def sz : detail.fetchItem().getSizesAndColors()) {
                        if (ObjectChecker.isNotEmptyOrNull(sz.getSize()) && BooleanDF.isTrue(sz.getDefaultSizeAndColor())) {
                            detail.getSpecificDimensions().setSize(sz.getSize());
                            break;
                        }
                    }
                }
            } else {
                detail.getSpecificDimensions().setSize(ItemSizeDF.createEmpty());
            }
            if (BooleanDF.isTrue(detail.fetchItem().getHasColor())) {
                if (ObjectChecker.isEmptyOrNull(detail.fetchColor()) || !detail.fetchItem().containsColor(detail.fetchColor())) {
                    for (def sz : detail.fetchItem().getSizesAndColors()) {
                        if (ObjectChecker.isNotEmptyOrNull(sz.getColor()) && BooleanDF.isTrue(sz.getDefaultSizeAndColor())) {
                            detail.getSpecificDimensions().setColor(sz.getColor());
                            break;
                        }
                    }
                }
            } else {
                detail.getSpecificDimensions().setColor(ItemColorDF.createEmpty());
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Works only on a document that has been committed before. For each line: when the item has sizes and the line size is " +
                "empty or is not one of the item's sizes, the line takes the size of the first Sizes and Colors row of the item that is " +
                "marked Default and has a size; when the item has no sizes, the line size is cleared. Colors are handled the same way. " +
                "Takes no parameters.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
