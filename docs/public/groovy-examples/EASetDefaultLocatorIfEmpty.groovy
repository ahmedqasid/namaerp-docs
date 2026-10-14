package com.namasoft.modules.srvcenter.domain.utils

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.Locator
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

public class EASetDefaultLocatorIfEmpty implements EntityAction<BasicSCDocument> {
    @Override
    public Result doAction(BasicSCDocument src, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Locator defaultLocator = Persister.findByIdOrCode(Locator.class, parameters[1].getPrimitiveValue());
        if (defaultLocator == null) {
            Result.createFailureResult("Could not find a locator with the code {0} ", parameters[1]).addToAccumulatingResult(result);
            return result;
        }
        for (final BasicSCDocumentLine l in src.getDetails()) {
            if (l.fetchItem() == null)
                continue;
            if (l.fetchLocator() != null)
                continue;
            if (l.getSpecificDimensions() == null)
                l.setSpecificDimensions(new ItemSpecificDimensions());
            if (l.fetchWarehouse() == null) {
                if (src.getWarehouse() == null)
                    continue;
                l.getSpecificDimensions().setWarehouse(src.getWarehouse());
            }
            if (l.fetchWarehouse().calcLocatorPolicy().isPrevented())
                continue;
            if (ObjectChecker.areNotEqual(l.fetchWarehouse(), defaultLocator.getWarehouse()))
                continue;
            l.getSpecificDimensions().setLocator(defaultLocator);
        }
        return result;
    }


    @Override
    public String describe() {
        return "Puts the locator given in parameter 2 (code or id) on every document line that has an item and no locator, when the " +
                "line's warehouse is the locator's warehouse and that warehouse does not prevent locators. A line with no warehouse " +
                "first takes the document's warehouse. The save is refused when the locator is not found. Parameter 1 is not used.";
    }

    @Override
    public List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Default Locator Code Or Id");
    }
}
