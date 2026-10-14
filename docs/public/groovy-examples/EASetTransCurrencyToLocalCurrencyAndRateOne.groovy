package com.namasoft.modules.accounting.domain.utils.actions


import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.valueobjects.TransactionMoney
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.EntityCodeDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.DocumentFile
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.modules.basic.LegalEntity
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.entities.Account
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.basic.domain.requests.BusinessRequest
import com.namasoft.modules.basic.domain.requests.LedgerTransReq

class EASetTransCurrencyToLocalCurrencyAndRateOne implements EntityAction<DocumentFile> {
    @Override
    Result doAction(EntityTargetAction action, DocumentFile object, LongTextDF... parameters) {
        if (ObjectChecker.areNotEqual(action, EntityTargetAction.PreSendRequest()))
            return Result.createSuccessResult()
        Result result = Result.createAccumulatingResult()
        BusinessRequest request = object.fetchCurrentlySendingRequest()
        if (!(request instanceof LedgerTransReq))
            return Result.createSuccessResult()
        LedgerTransReq ltr = request
        EntityCodeDF c = EntityCodeDF.fromDataField(parameters[1])
        boolean updateHappened = false;
        for (final def l in ltr.getLinesList().getLines()) {
            if (l.getAccount() == null)
                continue
            Account acc = l.getAccount().toReal()
            if (acc == null)
                continue
            if (ObjectChecker.areNotEqual(acc.getCode(), c))
                continue
            updateHappened = updateMoney(l.getDebit(), acc, object.getLegalEntity()) || updateHappened
            updateHappened = updateMoney(l.getCredit(), acc, object.getLegalEntity()) || updateHappened
        }
        if (updateHappened)
            ltr.shortenLines()
        return result
    }

    @Override
    String describe() {
        return "Runs just before a document sends its accounting request (Pre Send Business Request); the line's target action is forced to Automatic. " +
                "On every ledger line whose account code is in parameter 2, a debit or credit whose rate is not 1 is rewritten as its local amount, " +
                "in the account's currency, at rate 1. Matching lines are then combined into one. Use it only for an account kept in the local currency. " +
                "Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Account Code")
    }

    static boolean updateMoney(TransactionMoney m, Account acc, LegalEntity le) {
        if (m == null || m.getValue() == null || DecimalDF.isEmptyOrZero(m.getValue().getAmount()))
            return false
        def currency = acc.fetchCurrency(le)
        if (ObjectChecker.areEqual(m.getRate(), DecimalDF.one()))
            return false;
        m.getValue().setAmount(m.getLocalAmount())
        m.getValue().setCurrency(currency)
        m.setRate(DecimalDF.one())
        return true;
    }

    @Override
    public boolean isAutomaticForced() {
        return true
    }
}
