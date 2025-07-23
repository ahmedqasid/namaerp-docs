export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", {
      text: "Guides",
      collapsible: true,
      children: [ "/guide/docs-quick-guide.md", "/guide/utils.md", "/guide/system-minimum-requirements.md", "/guide/installation-guide.md", "/guide/reports-guide.md", "/guide/shortcuts.md", "/guide/screen-modifier.md", {
        text: "Entity Flows",
        collapsible: true,
        children: [ "/guide/entity-flows/introduction-to-entity-flows.md", "/guide/entity-flows/ea-fields-values-calculator.md", "/guide/entity-flows/excel-and-sql-import-by-entity-flow.md", "/guide/entity-flows/ea-gen-entity-from-entity.md" ]
      }, "/guide/report-wizard-guide.md", {
        text: "الفواتير والضرائب والخصومات",
        collapsible: true,
        children: [ "/guide/invoices/payment-entries.md", "/guide/invoices/taxes-and-discounts-guide.md", "/guide/invoices/e-invoices-guide.md", "/guide/invoices/zatca-guide.md", "/guide/invoices/electronic-receipt-egypt-tax-eInvoice.md" ]
      }, "/guide/tempo.md", "/guide/invoice-retriever.md", "/guide/sms-and-whatsapp.md", "/guide/field-filter-with-criteria.md", "/guide/translations.md", "/guide/criteria-based-validation.md", "/guide/attendance-machine-formula.md", "/guide/attendance-machines-integration.md", "/guide/scheduled-tasks.md", "/guide/nama-properties.md", "/guide/reward-points.md", "/guide/nama-pos.md", "/guide/mobile-application-guide.md", "/guide/oracle-jdbc-connection.md", "/guide/nama-erp-api.md", "/guide/text-criteria-guide.md", "/guide/dev-request-guidelines.md" ]
    }, {
      text: "Examples",
      collapsible: true,
      children: [ "/examples/entity-flow-examples.md" ]
    }, {
      text: "Reprocessing Transactions",
      collapsible: true,
      children: [ "/reprocessing/reprocess-qty-and-cost.md", "/reprocessing/reprocess-ledger-and-debt-ages.md", "/reprocessing/cost-and-qty-problems.md", "/reprocessing/inventory-utilities.md", "/reprocessing/manufacturing-utilities.md", "/reprocessing/fixed-asset-utilities.md", "/reprocessing/real-estate-utilities.md", "/reprocessing/db-operations.md", "/reprocessing/suggest-index-creation.md", "/reprocessing/general-purpose-utility-queries.md", "/reprocessing/replication.md" ]
    }, {
      text: "Frequently Asked Questions",
      collapsible: true,
      children: [ "/faq/general-faq.md", "/faq/screen-modifier-faq.md", "/faq/notification-fq.md", "/faq/gui-post-actions-faq.md", "/faq/entity-flow-faq.md", "/faq/invoices-faq.md", "/faq/supply-chain-faq.md", "/faq/manufacturing-faq.md", "/faq/pos-faq.md", "/faq/human-resources-faq.md", "/faq/report-faq.md", "/faq/report-wizard-faq.md", "/faq/approvals-faq.md", "/faq/mobile-apps-faq.md", "/faq/field-filter-faq.md", "/faq/database-error-related-faq.md" ]
    }, {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ {
        text: "Core",
        collapsible: true,
        children: [ "/entity-flows/core/DeleteRelatedEntityAction.md", "/entity-flows/core/EAAllowUseAsFromDocOfAField.md", "/entity-flows/core/EAAltCodeValidator.md", "/entity-flows/core/EAAttachReportResultToRecord.md", "/entity-flows/core/EAAutoCollectSignAndSentEInvoice.md", "/entity-flows/core/EAAutoEscalateApprovalToFallBackEmployee.md", "/entity-flows/core/EAAutoEscalateApprovalToSupervisor.md", "/entity-flows/core/EAAutoSendEInvoice.md", "/entity-flows/core/EAAutomaticGenerateEntityFromEntityAction.md", "/entity-flows/core/EAAutomaticGenerateEntityFromEntityActionWithApproval.md", "/entity-flows/core/EACacheEvicter.md", "/entity-flows/core/EACalcCurrencyRate.md", "/entity-flows/core/EACalcCurrencyRateInDetails.md", "/entity-flows/core/EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry.md", "/entity-flows/core/EACheckDailyBackupOnGoogleDrive.md", "/entity-flows/core/EAClearGoogleDriveTrash.md", "/entity-flows/core/EACloseFiscalPeriodsInRange.md", "/entity-flows/core/EACodeValidator.md", "/entity-flows/core/EACopyEmptyAccountsFromBag.md", "/entity-flows/core/EADeleteFromAnotherServer.md", "/entity-flows/core/EADeleteFromQuery.md", "/entity-flows/core/EADeleteOldFiles.md", "/entity-flows/core/EADetailsRemover.md", "/entity-flows/core/EAEmptifyTomcatTemp.md", "/entity-flows/core/EAErrorIfQueryNotMatched.md", "/entity-flows/core/EAExecuteUpdateQuery.md", "/entity-flows/core/EAExecuteUpdateQueryOnDifferentDatasource.md", "/entity-flows/core/EAExportAttachments.md", "/entity-flows/core/EAFieldsValuesCalculator.md", "/entity-flows/core/EAForceApplyInstallmentEffects.md", "/entity-flows/core/EAGenerateDraftEntityFromEntityAction.md", "/entity-flows/core/EAGenerateDraftEntityFromEntityActionNoFlush.md", "/entity-flows/core/EAGenerateEntityFromEntityAction.md", "/entity-flows/core/EAGenerateEntityFromEntityActionNoFlush.md", "/entity-flows/core/EAGenerateEntityFromEntityActionNoFlushWithApproval.md", "/entity-flows/core/EAGenerateEntityFromEntityActionWithApproval.md", "/entity-flows/core/EAGenerateKNetPaymentURLs.md", "/entity-flows/core/EAGenerateMyFatoorahPaymentURLs.md", "/entity-flows/core/EAGroovyAction.md", "/entity-flows/core/EAGuessEntityFromNames.md", "/entity-flows/core/EAIgnoringNotFoundTargetFieldsValuesCalculator.md", "/entity-flows/core/EAJsonRecordExporter.md", "/entity-flows/core/EALoyalityEarnReward.md", "/entity-flows/core/EAMakeCreationDateAlwaysAfter.md", "/entity-flows/core/EAMakeCreationDateAlwaysBefore.md", "/entity-flows/core/EAMakeCreationDateAlwaysBetween.md", "/entity-flows/core/EAMakeCreationDateInValueDate.md", "/entity-flows/core/EANamaCloudBackupPrepare.md", "/entity-flows/core/EAOpenFiscalPeriodsInRange.md", "/entity-flows/core/EAPostGoPayOfflinePayment.md", "/entity-flows/core/EAPreventChangingFields.md", "/entity-flows/core/EAPreventFromDocOfUsageAgain.md", "/entity-flows/core/EAPreventUpdateDetailedRemarkLines.md", "/entity-flows/core/EAPreventUseAsFromDocOfAField.md", "/entity-flows/core/EAPrintFormToPrinter.md", "/entity-flows/core/EAPrintReportToPrinter.md", "/entity-flows/core/EARecommitFromQuery.md", "/entity-flows/core/EARefreshCriticalErrors.md", "/entity-flows/core/EARefreshGoogleDriveOrMailToken.md", "/entity-flows/core/EARegenAccEffects.md", "/entity-flows/core/EARegenAccFromQuery.md", "/entity-flows/core/EAReviseUnReviseFromQuery.md", "/entity-flows/core/EARevokeApproval.md", "/entity-flows/core/EARunEntityFlow.md", "/entity-flows/core/EARunEntityFlowFromQuery.md", "/entity-flows/core/EARunManualNotification.md", "/entity-flows/core/EARunManualNotificationFromQuery.md", "/entity-flows/core/EARunTaskSchedule.md", "/entity-flows/core/EASQLToCSVEmail.md", "/entity-flows/core/EASQLToCSVFile.md", "/entity-flows/core/EASaveDraftsFromQuery.md", "/entity-flows/core/EASaveRecordsFromQuery.md", "/entity-flows/core/EASaveToAnotherServer.md", "/entity-flows/core/EASaveToAnotherServerUsingJSON.md", "/entity-flows/core/EAScaleImage.md", "/entity-flows/core/EAScaleMasterFileImage.md", "/entity-flows/core/EASendHttpRequestByTempo.md", "/entity-flows/core/EASetCreationDateToEndOfDay.md", "/entity-flows/core/EASetCreationDateToStartOfDay.md", "/entity-flows/core/EASetFieldByTemplate.md", "/entity-flows/core/EASortFields.md", "/entity-flows/core/EAWathqAddressFetcher.md", "/entity-flows/core/EAWathqBasicInfoFetcher.md", "/entity-flows/core/EAWathqCommercialInfoFetcher.md", "/entity-flows/core/EAWordTemplate.md", "/entity-flows/core/SQLDraftImporter.md", "/entity-flows/core/SQLDraftImporterFromDifferentDataSource.md", "/entity-flows/core/SQLImporter.md", "/entity-flows/core/SQLImporterFromDifferentDataSource.md" ]
      }, {
        text: "Accounting Module",
        collapsible: true,
        children: [ "/entity-flows/accounting/EAAddAccountingEffect.md", "/entity-flows/accounting/EAClearLedgerLines.md", "/entity-flows/accounting/EAGenInvestmentDocClaimingDoc.md", "/entity-flows/accounting/EAGenJournalEntry.md", "/entity-flows/accounting/EAGenTreasuryBillCloseDoc.md", "/entity-flows/accounting/EARVPVControlJournal.md", "/entity-flows/accounting/EAReverseLedgerTrans.md", "/entity-flows/accounting/EAShortenLedger.md", "/entity-flows/accounting/EAShortenLedgerChangeToAccountCurrency.md", "/entity-flows/accounting/EASortLedger.md" ]
      }, {
        text: "AI Module",
        collapsible: true,
        children: [ "/entity-flows/ai/EAEmbedFileToAIDB.md" ]
      }, {
        text: "Contracting Module",
        collapsible: true,
        children: [ "/entity-flows/contracting/EAUpdateExtractsEffectsOnPaymentDocs.md", "/entity-flows/contracting/EAUpdateRemarksInContractorExtractFromProjectContractTermDescription.md", "/entity-flows/contracting/EAUpdateRemarksInExtractFromContractTermDescription.md" ]
      }, {
        text: "CRM Module",
        collapsible: true,
        children: [ "/entity-flows/crm/EACRMContractBodyShapersCheckIn.md", "/entity-flows/crm/EACRMDevReqPadLeftRelativeWeight.md" ]
      }, {
        text: "EGTax Reader Module",
        collapsible: true,
        children: [ "/entity-flows/egtax/EAReadRecentTaxEInvoices.md" ]
      }, {
        text: "Freight Management System Module",
        collapsible: true,
        children: [ "/entity-flows/frm/EAKWSendIPSEvents.md" ]
      }, {
        text: "Hospital Management System Module",
        collapsible: true,
        children: [ "/entity-flows/hms/EACreateAccommodationInvoice.md" ]
      }, {
        text: "HR Module",
        collapsible: true,
        children: [ "/entity-flows/hr/CalcBasicSalaryForNetSalary.md", "/entity-flows/hr/EACalComponentFromLoan.md", "/entity-flows/hr/EAChangeEmployeeStateHandler.md", "/entity-flows/hr/EAClearFromDateIfFromTimeEmpty.md", "/entity-flows/hr/EAClearToDateIfToTimeEmpty.md", "/entity-flows/hr/EACopySalaryStructureToJobOffer.md", "/entity-flows/hr/EACopySalaryStructureToUpdateEmpInfo.md", "/entity-flows/hr/EADSCNormalizeTimeAttendance.md", "/entity-flows/hr/EAEmpAttendanceSysEntryCalculator.md", "/entity-flows/hr/EAHealthInsuranceOfferReqAction.md", "/entity-flows/hr/EALiptisSetComponentFromAnotherWithMax.md", "/entity-flows/hr/EAMakeSingleCheckInCheckOutIfNeeded.md", "/entity-flows/hr/EAOyoonWorkPlaceUpdateToUpdateInfo.md", "/entity-flows/hr/EASalaryCostCalculator.md", "/entity-flows/hr/EASalaryNormalizeAdditions.md", "/entity-flows/hr/EASalaryNormalizeDeductions.md", "/entity-flows/hr/EATimeAttendanceFromDBImportIntoDocument.md", "/entity-flows/hr/EATimeAttendanceFromDBImporter.md", "/entity-flows/hr/EATimeAttendanceSetDefaultFromTime.md", "/entity-flows/hr/EATimeAttendanceSetDefaultToTime.md", "/entity-flows/hr/EAUpdateEmployeeResidencyRenewDate.md", "/entity-flows/hr/SetAttendanceToFixedTimeIfEmpty.md", "/entity-flows/hr/TimeAttendanceAddExtraHoursToEmpty.md", "/entity-flows/hr/TimeAttendanceRemoveEmptyTimeLines.md" ]
      }, {
        text: "e-commerce Integration Module",
        collapsible: true,
        children: [ "/entity-flows/magento/EAEcommerceAddItemToLinker.md", "/entity-flows/magento/EAEcommerceGuessItemBySKU.md", "/entity-flows/magento/EAEcommerceReadAbandonedCarts.md", "/entity-flows/magento/EAEcommerceReadOrders.md", "/entity-flows/magento/EAEcommerceReadOrdersFromDate.md", "/entity-flows/magento/EAEcommerceShippingHandler.md", "/entity-flows/magento/EAEcommerceUploadQuantityCSVFileToFTPServer.md", "/entity-flows/magento/EASalesRecalculateFreeAndRelatedItems.md" ]
      }, {
        text: "Manufacturing Module",
        collapsible: true,
        children: [ "/entity-flows/manufacturing/EAStartOrderIfNotStarted.md" ]
      }, {
        text: "POS Module",
        collapsible: true,
        children: [ "/entity-flows/namapos/EADarTibaServiceInvoiceTermSetter.md" ]
      }, {
        text: "Real Estate Module",
        collapsible: true,
        children: [ "/entity-flows/realestate/EAAutoExtendExpiredRentContracts.md", "/entity-flows/realestate/EAAutoGenerateREFineDoc.md", "/entity-flows/realestate/EACancelReservationOFSalesInitialDoc.md", "/entity-flows/realestate/EAFixNextAndPreviousFromQuery.md" ]
      }, {
        text: "Service Center Module",
        collapsible: true,
        children: [ "/entity-flows/srvcenter/EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds.md", "/entity-flows/srvcenter/EARecalculateSrvcOperationsAndMaterialsPrices.md", "/entity-flows/srvcenter/EARecalculateSrvcOperationsAndMaterialsPricesFromQuery.md", "/entity-flows/srvcenter/EASRVCCopyExecutionRemarksToJobOrder.md", "/entity-flows/srvcenter/EAUpdateAssemblyDocWithAssembledItemSold.md", "/entity-flows/srvcenter/EAUseReceiptPaperForEngineOrChassisItems.md" ]
      }, {
        text: "Supply Chain Module",
        collapsible: true,
        children: [ "/entity-flows/supplychain/EAApplyReservationOfDocsByQuery.md", "/entity-flows/supplychain/EAAutoCreateSCDocSecondSerial.md", "/entity-flows/supplychain/EAAutoCreateSCDocSerial.md", "/entity-flows/supplychain/EAAutoGenSCDocFromDocWithFieldsMap.md", "/entity-flows/supplychain/EAAutoGroupCloneItemFromPO.md", "/entity-flows/supplychain/EAAutoSerialNumberCalculator.md", "/entity-flows/supplychain/EACancelReservationOfDocsByQuery.md", "/entity-flows/supplychain/EACollectAlItem.md", "/entity-flows/supplychain/EACollectByItemDimension.md", "/entity-flows/supplychain/EACollectLot.md", "/entity-flows/supplychain/EACollectStockDocsIfEmpty.md", "/entity-flows/supplychain/EACopyItemAssortmentToSCLine.md", "/entity-flows/supplychain/EACopyRackCodeFromStockTaking.md", "/entity-flows/supplychain/EACopyRevisionFromFromDoc.md", "/entity-flows/supplychain/EACopyTaxesFromFromDoc.md", "/entity-flows/supplychain/EACopyUnitCostFromInvoiceToIssueDoc.md", "/entity-flows/supplychain/EAEGBRASSFixCreationDates.md", "/entity-flows/supplychain/EAFillSCDetailsByBarCodeSpecs.md", "/entity-flows/supplychain/EAGenAndItemSizesAndColorsAndRevisions.md", "/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap.md", "/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMapWithoutFlush.md", "/entity-flows/supplychain/EAGuessSourceLineByItemIdAndFreeItem.md", "/entity-flows/supplychain/EAGuessSourceLineIdByItem.md", "/entity-flows/supplychain/EAImportItemsFromLongTextField.md", "/entity-flows/supplychain/EALotCalculator.md", "/entity-flows/supplychain/EAMultiCustomerSalesOfferCreator.md", "/entity-flows/supplychain/EANotifyIfSSLCertificateAboutToExpire.md", "/entity-flows/supplychain/EAPreventChangingSCDocumentCriticalFields.md", "/entity-flows/supplychain/EAPreventQtyLessThan.md", "/entity-flows/supplychain/EAPreventQtyMoreThan.md", "/entity-flows/supplychain/EAPreventRepeatedItems.md", "/entity-flows/supplychain/EAPreventRepeatedValuesAtDetail.md", "/entity-flows/supplychain/EAReApplyQtyTrackingEffects.md", "/entity-flows/supplychain/EARecalcFreeLinesUnitPriceIfZero.md", "/entity-flows/supplychain/EARecalcPurchasePrices.md", "/entity-flows/supplychain/EARecalcSalesDocDiscounts.md", "/entity-flows/supplychain/EARecalcSalesDocUnitPrices.md", "/entity-flows/supplychain/EARecalcSalesDocUnitPricesAndDiscounts.md", "/entity-flows/supplychain/EARecalculateAdditionalCost.md", "/entity-flows/supplychain/EARegenAssemblyDocumentDetailsFromBOM.md", "/entity-flows/supplychain/EARegenInvTransReq.md", "/entity-flows/supplychain/EARegenInvTransReqFromQuery.md", "/entity-flows/supplychain/EAReplaceItemBoxInSystem.md", "/entity-flows/supplychain/EAReplaceItemColorInSystem.md", "/entity-flows/supplychain/EAReplaceItemSizeInSystem.md", "/entity-flows/supplychain/EASCDocFromDocCreator.md", "/entity-flows/supplychain/EASCDocFromDocDeleter.md", "/entity-flows/supplychain/EASCPreventChangingFromDocFields.md", "/entity-flows/supplychain/EASalesRecalculateFreeAndRelatedItems.md", "/entity-flows/supplychain/EASendCustomerToDatanuum.md", "/entity-flows/supplychain/EASendInvItemToDatanuum.md", "/entity-flows/supplychain/EASendInvoiceToDatanuum.md", "/entity-flows/supplychain/EASendReturnedInvoiceToDatanuum.md", "/entity-flows/supplychain/EASetDefaultWarehouseForServiceItems.md", "/entity-flows/supplychain/EASpreadAssemblyComponents.md", "/entity-flows/supplychain/EASubolSetMasterRowIdOfFreeItems.md", "/entity-flows/supplychain/EASupplyChainMergeDocLines.md", "/entity-flows/supplychain/EASupplyChainMergeStockTakingElectronicDocLines.md", "/entity-flows/supplychain/EAUnZipSerialsInLines.md", "/entity-flows/supplychain/EAUniCreteGenAssemblyBOM.md", "/entity-flows/supplychain/EAUniCreteGenItems.md", "/entity-flows/supplychain/EAUniCreteGenSalesInvoiceFromStockIssue.md", "/entity-flows/supplychain/EAUniCreteSetQtyOfSlaveRowsAsMaster.md", "/entity-flows/supplychain/EAUnicreteGenItemsAllAllowMustApply.md", "/entity-flows/supplychain/EAUpdateDeliveryStatusFromSalesDocToFromDoc.md", "/entity-flows/supplychain/EAUpdateLotIdDates.md", "/entity-flows/supplychain/SetQuantityToOneAction.md", "/entity-flows/supplychain/SetSecondUOMToDefaultIfEmpty.md", "/entity-flows/supplychain/UniqueBOXInsideStockReceipt.md", "/entity-flows/supplychain/ValidateSorceLinesOfFromDocAction.md" ]
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/installation-video.md", {
        text: "Supply Chain Videos",
        collapsible: true,
        children: [ "/videos/supply-chain-videos/cost-video-1.md", "/videos/supply-chain-videos/cost-video-2.md", "/videos/supply-chain-videos/cost-video-3.md" ]
      }, "/videos/manufacturing-actual-overhead.md", {
        text: "Report Wizard Videos",
        collapsible: true,
        children: [ "/videos/report-wizard-videos/report-wizard-webinar-1.md", "/videos/report-wizard-videos/report-wizard-webinar-2.md", "/videos/report-wizard-videos/report-wizard-webinar-3.md", "/videos/report-wizard-videos/report-wizard-webinar-4.md", "/videos/report-wizard-videos/report-wizard-webinar-5.md", "/videos/report-wizard-videos/report-wizard-webinar-6.md" ]
      } ]
    } ]
  } ]
}