package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.SizesAndColors
import com.namasoft.modules.supplychain.domain.entities.InvItem

public class EAPreventDifferentNamesForSameSizeOrColor implements EntityAction<InvItem> {
    @Override
    Result doAction(InvItem item, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult()
        validateSameValueHasSameName(item, result, "Size", { SizesAndColors line -> line.getSize() }, { SizesAndColors line -> line.getSizeName() })
        validateSameValueHasSameName(item, result, "Color", { SizesAndColors line -> line.getColor() }, { SizesAndColors line -> line.getColorName() })
        return result
    }

    private static void validateSameValueHasSameName(InvItem item, Result result, String fieldLabel, Closure valueOf, Closure nameOf) {
        Map<String, String> nameByValue = new HashMap<>()
        for (SizesAndColors line : item.getSizesAndColors()) {
            String value = ObjectChecker.toStringOrEmpty(valueOf(line))
            if (ObjectChecker.isEmptyOrNull(value))
                continue
            String name = ObjectChecker.toStringOrEmpty(nameOf(line))
            String previousName = nameByValue.putIfAbsent(value, name)
            if (previousName != null && ObjectChecker.areNotEqual(previousName, name))
                Result.createFailureResult("{0} {1} is used with different names: {2} and {3}", fieldLabel, value, previousName, name)
                        .addToAccumulatingResult(result)
        }
    }

    @Override
    String describe() {
        return "Item: refuses the save when the same size code, or the same color code, appears on more than one line of the " +
                "Sizes and Colors grid with different names. Attach it to the Validate On Save event of Item. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
