package com.namasoft.modules.accounting.utils.entityactions

import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.entities.JournalEntry

class EACopyViewCapabilityFromAccountToJournalEntry implements EntityAction<JournalEntry> {
    @Override
    Result doAction(JournalEntry object, LongTextDF... parameters) {
        for (final def line in object.getLines()) {
            if (line.getAccount() != null && line.getAccount().getViewCapability() != null) {
                object.setViewCapability(line.getAccount().getViewCapability());
                break;
            }
        }
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "Journal entry: copies the View Capability of the first line account that has one into the journal entry's own View Capability, " +
                "so the entry is visible only to users who may see that account. Run it on Update Calculated Fields. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
