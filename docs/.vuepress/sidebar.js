export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ {
      text: "Arabic Guides",
      collapsible: true,
      children: [ {
        text: "Arabic Examples",
        collapsible: true,
        children: [ "/ar/examples/entity-flow-examples.md" ]
      }, {
        text: "Arabic Guides",
        collapsible: true,
        children: [ "/ar/guide/ea-fields-values-calculator.md", "/ar/guide/excel-and-sql-import-by-entity-flow.md", "/ar/guide/tempo.md" ]
      } ]
    }, {
      text: "English Guides",
      collapsible: true,
      children: [ "/guide/attendance-machine-formula.md", "/guide/criteria-based-validation.md", "/guide/nama-properties.md", "/guide/oracle-jdbc-connection.md", "/guide/scheduled-tasks.md", "/guide/screen-modifier.md", "/guide/shortcuts.md", "/guide/system-minimum-requirements.md", "/guide/utils.md" ]
    } ]
  } ]
}