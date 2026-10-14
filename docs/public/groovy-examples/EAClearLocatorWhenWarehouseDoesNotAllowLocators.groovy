package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.Warehouse

public class EAClearLocatorWhenWarehouseDoesNotAllowLocators implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        for (BasicSCDocumentLine line : doc.getDetails()) {
            if (line.getSpecificDimensions() == null || line.getSpecificDimensions().getLocator() == null)
                continue
            if (warehouseDoesNotAllowLocators(line.getSpecificDimensions().getWarehouse()))
                line.getSpecificDimensions().setLocator(null)
        }
        return Result.createAccumulatingResult()
    }

    private static boolean warehouseDoesNotAllowLocators(Warehouse warehouse) {
        if (warehouse == null)
            return true
        return ObjectChecker.isEmptyOrNull(warehouse.getLocatorPolicy()) || warehouse.getLocatorPolicy().isPrevented()
    }

    @Override
    String describe() {
        return "Clears the locator of every document line whose warehouse is empty, or whose warehouse has an empty Locator Usage " +
                "or a Locator Usage of Prevented. Lines with no locator are left as they are. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
