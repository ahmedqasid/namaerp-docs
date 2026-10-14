package com.namasoft.modules.realstate.domain.utils.plugnplay

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.realestate.domain.details.IREPaymentLineWithTaxes
import com.namasoft.modules.realestate.domain.details.RECancelContrPaymentLine
import com.namasoft.modules.realestate.domain.entities.AbsRERentContract
import com.namasoft.modules.realestate.domain.entities.RECancelContract
import com.namasoft.modules.realestate.domain.primitives.REInstallmentType

public class EAFillExpensesWithRecommitRECancelContract implements EntityAction<RECancelContract> {
    @Override
    Result doAction(RECancelContract doc, LongTextDF... parameters) {

        Result result = Result.createAccumulatingResult();
        AbsRERentContract<?> contract = GenericReference.toRealOrNull(doc.getFromDoc(), AbsRERentContract.class);
        if (contract == null)
            return result;
        List<RECancelContrPaymentLine> expenses = doc.getExpenses();
        expenses.clear();
        for (IREPaymentLineWithTaxes line : contract.fetchDetails()) {
            if (ObjectChecker.areEqual(line.getType(), REInstallmentType.Installment()))
                continue;
            RECancelContrPaymentLine newLine = new RECancelContrPaymentLine();
            newLine.setInstallmentCode(line.fetchCode());
            newLine.setAmount(line.fetchPaymentAmount(null));
            newLine.setNetValue(line.fetchNetValue());
            newLine.setDueDate(line.fetchDueDate());
            newLine.setToDate(line.fetchToDate());
            newLine.setType(line.getType());
            newLine.setExpenseType(line.fetchExpenseType());
            expenses.add(newLine);
        }
        return result;
    }

    @Override
    String describe() {
        return "Cancel contract: clears the Expenses grid and rebuilds it from the lines of the rent contract in From Doc that are not installments " +
                "(code, amount, net value, due date, to date, type and expense type). Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
