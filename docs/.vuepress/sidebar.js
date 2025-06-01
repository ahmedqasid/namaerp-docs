export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ {
      text: "Guides",
      collapsible: true,
      children: [ "/guide/utils.md", "/guide/system-minimum-requirements.md", "/guide/reports-guide.md", "/guide/shortcuts.md", "/guide/screen-modifier.md", "/guide/ea-fields-values-calculator.md", "/guide/excel-and-sql-import-by-entity-flow.md", "/guide/tempo.md", "/guide/invoice-retriever.md", "/guide/sms-and-whatsap.md", "/guide/field-filter-with-criteria.md", "/guide/translations.md", "/guide/criteria-based-validation.md", "/guide/attendance-machine-formula.md", "/guide/scheduled-tasks.md", "/guide/nama-properties.md", "/guide/reward-points.md", "/guide/oracle-jdbc-connection.md" ]
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
      children: [ "/faq/general-faq.md", "/faq/fields-values-calculator-faq.md", "/faq/supply-chain-faq.md", "/faq/report-wizard-faq.md" ]
    } ]
  } ]
}