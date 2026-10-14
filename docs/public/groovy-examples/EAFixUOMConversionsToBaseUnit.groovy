package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.entities.InvItem

import java.util.stream.Collectors

public class EAFixUOMConversionsToBaseUnit implements EntityAction<InvItem> {
    @Override
    Result doAction(InvItem item, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        def invalidConversions = item.getPrimConversionLines().stream().filter({ ObjectChecker.areNotEqual(it.getToUOM(), item.getPrimaryUOM().getBaseUnit()) }).collect(Collectors.toList());
        for (def conversion : invalidConversions) {
            def firstMatchingLine = item.getPrimConversionLines().stream().filter({ ObjectChecker.arePairsEqual(it.getToUOM(), item.getPrimaryUOM().getBaseUnit(), it.getFromUOM(), conversion.getToUOM()) }).findFirst().orElse(null);
            if(firstMatchingLine == null)
                continue;
            conversion.setToUOM(item.getPrimaryUOM().getBaseUnit());
            conversion.setToValue(conversion.getToValue().multiply(firstMatchingLine.getToValue()).divide(firstMatchingLine.getFromValue()));
        }
        return result;
    }

    @Override
    String describe() {
        return "Item: rewrites every line of the Conversions grid that converts to a unit other than the base unit, so that it converts " +
                "to the base unit instead. It uses the line that converts that other unit to the base unit: for example, 1 Carton = 12 Box " +
                "and 1 Box = 10 Piece (Piece being the base unit) becomes 1 Carton = 120 Piece. A line with no such matching line is left " +
                "as it is. Attach it to the Pre Update Calculated Fields event of Item. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
