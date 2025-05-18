export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ {
      text: "Guides",
      collapsible: true,
      children: [ "/guide/utils.md", "/guide/system-minimum-requirements.md", "/guide/shortcuts.md", "/guide/screen-modifier.md", "/guide/ea-fields-values-calculator.md", "/guide/excel-and-sql-import-by-entity-flow.md", "/guide/attendance-machine-formula.md", "/guide/scheduled-tasks.md", "/guide/nama-properties.md", "/guide/oracle-jdbc-connection.md", "/guide/criteria-based-validation.md", "/guide/tempo.md" ]
    }, {
      text: "Examples",
      collapsible: true,
      children: [ "/examples/entity-flow-examples.md" ]
    }, {
      text: "Reprocessing Transactions",
      collapsible: true,
      children: [ "/reprocessing/reprocess-qty-and-cost.md", "/reprocessing/reprocess-stock-ages.md" ]
    } ]
  } ]
}