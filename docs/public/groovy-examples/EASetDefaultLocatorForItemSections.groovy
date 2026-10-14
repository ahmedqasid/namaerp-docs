package com.namasoft.modules.srvcenter.domain.utils

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.EntityCodeDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.Locator
import com.namasoft.modules.supplychain.domain.valueobjects.ItemSpecificDimensions

import java.util.stream.Collectors
import java.util.stream.Stream

public class EASetDefaultLocatorForItemSections implements EntityAction<BasicSCDocument> {
    @Override
    public Result doAction(BasicSCDocument src, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        List<EntityCodeDF> sections = Stream.of(parameters[1].getPrimitiveValue().split(",")).map { EntityCodeDF.fromString(it) }.distinct().collect(Collectors.toList());
        List<EntityCodeDF> excludedItems = Stream.of(parameters[2].getPrimitiveValue().split(",")).map { EntityCodeDF.fromString(it) }.distinct().collect(Collectors.toList());
        Locator defaultLocator = Persister.findByIdOrCode(Locator.class, parameters[3].getPrimitiveValue());
        if (defaultLocator == null) {
            Result.createFailureResult("Could not find a locator with the code {0} ", parameters[3]).addToAccumulatingResult(result);
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
            l.getGenericDimensions().setAnalysisSet(l.fetchWarehouse().getAnalysisSet());
            if (l.fetchWarehouse().calcLocatorPolicy().isPrevented())
                continue;
            if (ObjectChecker.areNotEqual(l.fetchWarehouse(), defaultLocator.getWarehouse()))
                continue;
            if (shouldSetLocator(l.fetchItem(), sections, excludedItems))
                l.getSpecificDimensions().setLocator(defaultLocator);
        }
        return result;
    }

    private boolean shouldSetLocator(InvItem item, List<EntityCodeDF> sections, List<EntityCodeDF> excludedItems) {
        if (excludedItems.contains(item.getCode()))
            return false;
        if (item.getSection() == null)
            return false;
        if (!sections.contains(item.getSection().getCode()))
            return false;
        return true;
    }

    @Override
    public String describe() {
        return "Puts the locator given in parameter 4 (code or id) on every document line that has no locator, when the item's section " +
                "code is listed in parameter 2 (comma separated), the item code is not listed in parameter 3 (comma separated), the " +
                "line's warehouse is the locator's warehouse and that warehouse does not prevent locators. A line with no warehouse first " +
                "takes the document's warehouse. " +
                "The save is refused when the locator is not found. Parameter 1 is not used.";
    }

    @Override
    public List<String> columnNames() {
        return Arrays.asList("Not used - leave empty",
                "Apply On Section Codes (CSV)", "Excluded Item Codes(CSV)", "Default Locator Code Or Id");
    }
}
