package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.bus.TransactionProvider
import com.namasoft.common.utilities.NaMaLogger
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.enums.EntityTypeDF
import com.namasoft.infra.domainbase.entity.base.BaseEntity
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.NaMaFailureResultException
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.utils.SCRelatedQtiesUtil

public class EAUpdateQtyTrackingEffectsFromQuery implements EntityAction<BaseEntity> {
    @Override
    Result doAction(EntityTargetAction action, BaseEntity entity, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        int i = 0;

        List<Object[]> r = Persister.executeJDBCQuery(parameters[1].getPrimitiveValue());
        for (Object[] row : r) {
            i++;
            try {
                TransactionProvider.get().doInNewTransaction({
                    BasicSCDocument d = Persister.findByIdOrCode(EntityTypeDF.fromString(row[0].toString()), row[1]);
                    if (d.getCommitedBefore().isFalse())
                        return null;
                    def effects = SCRelatedQtiesUtil.updateEffects(d);
                    if (effects.failed()) {
                        effects.addToAccumulatingResult(result)
                        throw new NaMaFailureResultException(effects)
                    }
                });
            } catch (Exception e) {
                NaMaLogger.error(e);
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Rebuilds the quantity-tracking effects (the quantities each document satisfies on its source documents) of every " +
                "document returned by the query in parameter 2. The query returns entityType, id (or code). Each document runs in its " +
                "own transaction, and documents that were never committed are skipped. Meant for installations where Use System Table " +
                "to Track Quantities is ticked in the supply chain settings. Parameter 1 holds this script (Class Name EAGroovyAction) " +
                "or is left empty.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty",
                "Query returning entityType, id - eg: select entityType, id from SalesInvoice where valueDate >= '20260101'");
    }
}
