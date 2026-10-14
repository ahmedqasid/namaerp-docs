package com.namasoft.modules.accounting.domain.utils.actions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.details.MiscPurchaseInvLine
import com.namasoft.modules.accounting.domain.entities.MiscPurchaseInvoice
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.specialserialization.ReflectionUtils

public class EAGroovyUpdateRefInMiscPurchaseInvDetails implements EntityAction<MiscPurchaseInvoice> {

    @Override
    Result doAction(MiscPurchaseInvoice invoice, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        MiscPurchaseInvLine firstMatchedLine = invoice.getDetails().stream().filter { l -> ObjectChecker.areEqual(ReflectionUtils.getFieldValue(parameters[1].getPrimitiveValue(), l), BooleanDF.TRUE()) }.findFirst()
                .orElse(null);
        if (firstMatchedLine == null)
            return result;
        for (MiscPurchaseInvLine line in invoice.getDetails()) {
            if (ObjectChecker.areEqual(ReflectionUtils.getFieldValue(parameters[2].getPrimitiveValue(), line), ReflectionUtils.getFieldValue(parameters[2].getPrimitiveValue(), firstMatchedLine)))
                ReflectionUtils.setProperty(line, parameters[1].getPrimitiveValue(), BooleanDF.TRUE());
            else
                ReflectionUtils.setProperty(line, parameters[1].getPrimitiveValue(), BooleanDF.FALSE());
        }
        return result;
    }

    @Override
    Result validateParameters(ParamValidationInfo info, EntityTargetAction action, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        EntityAction.ensureParamIsNotEmpty(info, result, 1, parameters);
        EntityAction.ensureParamIsNotEmpty(info, result, 2, parameters);
        return result;
    }

    @Override
    String describe() {
        return "Miscellaneous invoice: finds the first line whose yes/no field (field id in parameter 2, eg: b1) is ticked. That field is then ticked on " +
                "every line whose reference field (field id in parameter 3, eg: ref1) holds the same value as that line, and unticked on all the other lines. " +
                "Nothing changes when no line is ticked. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Yes/No line field id - eg: b1", "Reference line field id - eg: ref1")
    }

}
