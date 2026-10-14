package com.namasoft.modules.namapos.utiles.actions

import com.namasoft.common.constants.BSCEntities
import com.namasoft.common.constants.DomainBaseEntities
import com.namasoft.common.constants.POSEntities
import com.namasoft.common.constants.SCEntities
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.BaseEntity
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.namapos.utiles.POSReadQueueInitializer

class EAReInitializePOSData implements EntityAction<BaseEntity> {
    @Override
    Result doAction(BaseEntity object, LongTextDF... parameters) {
        POSReadQueueInitializer.initTypes(DomainBaseEntities.LegalEntity, DomainBaseEntities.Branch, DomainBaseEntities.Sector,
                DomainBaseEntities.Department, DomainBaseEntities.AnalysisSet, BSCEntities.TranslationOverRider, BSCEntities.Customer,
                BSCEntities.Employee, BSCEntities.Supplier, SCEntities.UOM, BSCEntities.TaxPlan, SCEntities.InvItem, SCEntities.Warehouse,
                SCEntities.Locator, POSEntities.NamaPOSRegister, SCEntities.SalesPriceList, SCEntities.SalesOffers, SCEntities.ItemCategory,
                SCEntities.ItemBrand, SCEntities.ItemSection, SCEntities.InvoiceClassification, SCEntities.FreeItemGroup, DomainBaseEntities.User,
                POSEntities.POSSecurityProfile, POSEntities.NamaPOSGenericReference, POSEntities.NamaPOSTable, BSCEntities.DocCategory,
                SCEntities.ItemConfigurations, BSCEntities.Currency, BSCEntities.PaymentMethod, BSCEntities.CustomerClass, BSCEntities.ReportDefinition,
                BSCEntities.SalesPriceClassifier1, BSCEntities.SalesPriceClassifier2, BSCEntities.SalesPriceClassifier3,
                BSCEntities.SalesPriceClassifier4, BSCEntities.SalesPriceClassifier5, POSEntities.NamaPOSCreditNote, SCEntities.ItemClass1,
                SCEntities.ItemClass2, SCEntities.ItemClass3, SCEntities.ItemClass4, SCEntities.ItemClass5, SCEntities.ItemClass6, SCEntities.ItemClass7,
                SCEntities.ItemClass8, SCEntities.ItemClass9, SCEntities.ItemClass10, POSEntities.NamaPOSItemBarcodeParser,
                DomainBaseEntities.DiscountCoupon, BSCEntities.GenericReferenceOverrider, BSCEntities.CustomerCategory, BSCEntities.ConfigEntry,
                BSCEntities.ExchangeRate, POSEntities.NamaPosUISettings, POSEntities.NamaPosPoleDisplaySpecs, BSCEntities.AddressRegion,
                POSEntities.NamaPOSDeliveryCost, POSEntities.NamaPOSHall, POSEntities.NamaPosRequiredFields, POSEntities.PosMinChargeSettings,
                POSEntities.NamaPOSItemQtyUpdateConfig, POSEntities.NamaPosItemAdditionalItems, POSEntities.NamaPosMobileUISettings,
                POSEntities.NamaPOSDepreciationReason, POSEntities.POSServiceChargeSettings, POSEntities.NamaPosDefaultsTemplate,
                POSEntities.NamaPOSInvSavingSettings, POSEntities.NamaPOSReturnReason, POSEntities.NamaPOSExtraFilter, POSEntities.NamaPOSShortcuts,
                POSEntities.NamaPOSPaymentMethodsSettings);
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "Queues every POS master file (items, customers, price lists, offers, registers, users, payment methods, settings and " +
                "the rest of the data a POS register downloads) to be sent again to the POS registers. Heavy on a large database: the " +
                "registers take a long time to download it all. Parameter 1 holds this script (Class Name EAGroovyAction) or is left " +
                "empty.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
