export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", {
      text: "Guides",
      collapsible: true,
      children: [ "/guide/entity-flows/", "/guide/invoices/" ]
    }, "/examples/", "/reprocessing/", "/faq/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/" ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/" ]
    } ]
  } ]
}