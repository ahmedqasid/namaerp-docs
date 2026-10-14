package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.SizesAndColors
import com.namasoft.modules.supplychain.domain.entities.InvItem

public class EAPreventDuplicateDefaultSizeAndColor implements EntityAction<InvItem> {
    @Override
    Result doAction(InvItem item, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult()
        Map<String, SizesAndColors> defaultLineByCombination = new HashMap<>()
        for (SizesAndColors line : item.getSizesAndColors()) {
            if (BooleanDF.isFalse(line.getDefaultSizeAndColor()))
                continue
            String size = ObjectChecker.toStringOrEmpty(line.getSize())
            String color = ObjectChecker.toStringOrEmpty(line.getColor())
            SizesAndColors previousLine = defaultLineByCombination.putIfAbsent(size + " / " + color, line)
            if (previousLine != null)
                Result.createFailureResult("More than one default barcode for size {0} and color {1}: {2} and {3}",
                        emptyAsDash(size), emptyAsDash(color), codeOf(previousLine), codeOf(line))
                        .addToAccumulatingResult(result)
        }
        return result
    }

    private static String codeOf(SizesAndColors line) {
        return emptyAsDash(ObjectChecker.toStringOrEmpty(line.getCode()))
    }

    private static String emptyAsDash(String value) {
        return ObjectChecker.isEmptyOrNull(value) ? "-" : value
    }

    @Override
    String describe() {
        return "Item: refuses the save when more than one line of the Sizes and Colors grid is marked Default for the same " +
                "size and color combination. Attach it to the Validate On Save event of Item. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
