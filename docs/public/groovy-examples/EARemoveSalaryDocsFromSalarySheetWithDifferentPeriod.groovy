package com.namasoft.modules.humanresource.utils.clientscripts

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.humanresource.domain.entities.SalarySheet

class EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod implements EntityAction<SalarySheet> {
    @Override
    Result doAction(SalarySheet object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        object.getSalarySheetLines().removeIf { it -> it.getSalaryDocument() != null && ObjectChecker.areNotEqual(it.getSalaryDocument().getFiscalPeriod(), object.getFiscalPeriod()) }
        return result;
    }

    @Override
    String describe() {
        return "Salary Sheet: removes every line whose salary document belongs to a different fiscal period than the salary sheet. " +
                "Lines without a salary document are kept. " +
                "Attach it to the Pre Update Calculated Fields event of Salary Sheet. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
