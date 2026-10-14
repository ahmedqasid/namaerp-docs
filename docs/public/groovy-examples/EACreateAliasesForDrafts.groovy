package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.BaseEntity
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result

class EACreateAliasesForDrafts implements EntityAction<BaseEntity> {
    @Override
    Result doAction(BaseEntity doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Persister.saveAdditionalFieldsAndAliases(doc).addToAccumulatingResult(result);
        return result;
    }

    @Override
    String describe() {
        return "Save Draft flow. Saves the record's code and its other codes (such as the alternative code) to the system's code " +
                "list while the record is still a draft, so these codes are reserved at once and the draft can be found by any of " +
                "them. Without it this happens only when the record is committed. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
