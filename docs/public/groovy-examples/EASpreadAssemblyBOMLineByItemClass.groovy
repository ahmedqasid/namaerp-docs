package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.fieldids.CommonFieldIds
import com.namasoft.common.fieldids.AllModulesFieldIDs
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.infra.domainbase.util.xml.XmlSerializer
import com.namasoft.modules.supplychain.domain.details.AssemblyBOMLine
import com.namasoft.modules.supplychain.domain.entities.AssemblyBOM
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.ItemClass4

public class EASpreadAssemblyBOMLineByItemClass implements EntityAction<AssemblyBOM> {
    @Override
    Result doAction(AssemblyBOM bom, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        for (int i = bom.getDetails().size() - 1; i >= 0; i--) {
            AssemblyBOMLine l = bom.getDetails().get(i);
            if (ObjectChecker.isNotEmptyOrNull(l.getItem()))
                continue;
            if (!(GenericReference.toReal(l.getRef1()) instanceof ItemClass4))
                continue;
            def items = Persister.listPageMatching(InvItem.class, ListPageMatchingParameters.create()
                    .criteria(CriteriaBuilder.create().field(AllModulesFieldIDs.InvItem_itemClass4).equal(l.getRef1().toReal()).and().commitedBefore().build())
                    .orderBy(CommonFieldIds.CODE));
            bom.getDetails().remove(l);
            for (def item : items) {
                def clone = XmlSerializer.getInstance().clone(l);
                clone.setId(UniqueIDDF.createRandomUniqueIDDF());
                clone.setItem(item);
                clone.setComp(item.toGenericReference());
                clone.getQuantities().setUom(item.getPrimaryUOM().getBaseUnit());
                bom.getDetails().add(i, clone);
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Assembly BOM: every line that has no item and whose Reference 1 is an Item Class 4 record is replaced by one line per " +
                "committed item of that class, placed where the original line was, in descending item code order. Each new line is a copy of the " +
                "original line with the item, the component and the item's base unit filled in. Takes no parameters.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
