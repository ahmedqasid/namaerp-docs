export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ {
      text: "Guides",
      collapsible: true,
      children: [ "/guide/docs-quick-guide.md", "/guide/utils.md", "/guide/system-minimum-requirements.md", "/guide/installation-guide.md", "/guide/reports-guide.md", "/guide/shortcuts.md", "/guide/screen-modifier.md", {
        text: "Entity Flows",
        collapsible: true,
        children: [ "/guide/entity-flows/introduction-to-entity-flows.md", "/guide/entity-flows/ea-fields-values-calculator.md", "/guide/entity-flows/excel-and-sql-import-by-entity-flow.md", "/guide/entity-flows/ea-gen-entity-from-entity.md" ]
      }, {
        text: "الربط مع الهيئات الحكومية لإرسال الفواتير الإلكترونية",
        collapsible: true,
        children: [ "/guide/einvoices/e-invoices-guide.md", "/guide/einvoices/zatca-guide.md", "/guide/einvoices/electronic-receipt-egypt-tax-eInvoice.md" ]
      }, "/guide/tempo.md", "/guide/invoice-retriever.md", "/guide/sms-and-whatsap.md", "/guide/field-filter-with-criteria.md", "/guide/translations.md", "/guide/criteria-based-validation.md", "/guide/attendance-machine-formula.md", "/guide/attendance-machines-integration.md", "/guide/scheduled-tasks.md", "/guide/nama-properties.md", "/guide/reward-points.md", "/guide/nama-pos.md", "/guide/oracle-jdbc-connection.md" ]
    }, {
      text: "Examples",
      collapsible: true,
      children: [ "/examples/entity-flow-examples.md" ]
    }, {
      text: "Reprocessing Transactions",
      collapsible: true,
      children: [ "/reprocessing/reprocess-qty-and-cost.md", "/reprocessing/reprocess-ledger-and-debt-ages.md", "/reprocessing/cost-and-qty-problems.md", "/reprocessing/inventory-utilities.md", "/reprocessing/manufacturing-utilities.md", "/reprocessing/fixed-asset-utilities.md", "/reprocessing/real-estate-utilities.md", "/reprocessing/db-operations.md", "/reprocessing/general-purpose-utility-queries.md", "/reprocessing/replication.md" ]
    }, {
      text: "Frequently Asked Questions",
      collapsible: true,
      children: [ "/faq/general-faq.md", "/faq/entity-flow-faq.md", "/faq/supply-chain-faq.md", "/faq/human-resources-faq.md", "/faq/report-faq.md", "/faq/report-wizard-faq.md", "/faq/approvals-faq.md", "/faq/mobile-apps-faq.md", "/faq/field-filter-faq.md" ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/installation-video.md", "/videos/report-wizard-webinar-1.md", "/videos/report-wizard-webinar-2.md", "/videos/report-wizard-webinar-3.md", "/videos/report-wizard-webinar-4.md", "/videos/report-wizard-webinar-5.md", "/videos/report-wizard-webinar-6.md" ]
    } ]
  } ]
}