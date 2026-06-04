export const SIDEBAR_CONFIG = {
  "/" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/getting-started" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", {
      text: "Getting Started",
      collapsible: true,
      children: [ "/getting-started/system-minimum-requirements.md", "/getting-started/installation-guide.md", "/getting-started/nama-properties.md", "/getting-started/two-factor-authentication.md", {
        text: ".",
        "link" : "/getting-started/"
      } ]
    }, {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/utils.md", "/platform/shortcuts.md", "/platform/shortcuts-ar.md", "/platform/screen-modifier/", "/platform/list-views/", "/platform/fiscal-period-control-guide.md", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", "/platform/virtual-entity-guide.md", "/platform/field-filter-with-criteria.md", "/platform/field-filter-faq.md", "/platform/translations.md", "/platform/criteria-based-validation.md", "/platform/text-criteria-guide.md", "/platform/scheduled-tasks.md", "/platform/GenericReferenceOverrider_UserGuide.md", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/screen-modifier" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ {
        text: "Screen Modifier",
        collapsible: true,
        children: [ "/platform/screen-modifier/screen-modifier.md", "/platform/screen-modifier/screen-modifier-faq.md", {
          text: ".",
          "link" : "/platform/screen-modifier/"
        } ]
      }, "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/list-views" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", {
        text: "List Views",
        collapsible: true,
        children: [ "/platform/list-views/quick-filters.md", "/platform/list-views/limit-user-to-year.md", {
          text: ".",
          "link" : "/platform/list-views/"
        } ]
      }, "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/approvals" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", {
        text: "Approvals",
        collapsible: true,
        children: [ "/platform/approvals/approvals-system.md", "/platform/approvals/sample-approval-email-templates.md", "/platform/approvals/approvals-faq.md", {
          text: ".",
          "link" : "/platform/approvals/"
        } ]
      }, "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/security" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", {
        text: "الصلاحيات والأمان",
        collapsible: true,
        children: [ "/platform/security/security-overview.md", "/platform/security/security-profiles.md", "/platform/security/field-page-listview-security.md", "/platform/security/record-level-security.md", "/platform/security/users-and-login.md", "/platform/security/security-delegation.md", {
          text: ".",
          "link" : "/platform/security/"
        } ]
      }, "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/entity-flows" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", {
        text: "Entity Flows",
        collapsible: true,
        children: [ "/platform/entity-flows/introduction-to-entity-flows.md", "/platform/entity-flows/excel-and-sql-import-by-entity-flow.md", "/platform/entity-flows/ea-gen-entity-from-entity.md", "/platform/entity-flows/entity-flow-examples.md", "/platform/entity-flows/entity-flow-faq.md", {
          text: ".",
          "link" : "/platform/entity-flows/"
        } ]
      }, "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/reports" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", {
        text: "Reports",
        collapsible: true,
        children: [ "/platform/reports/reports-guide.md", "/platform/reports/report-wizard-guide.md", "/platform/reports/ReportWizard_User_Documentation.md", "/platform/reports/report-faq.md", "/platform/reports/report-wizard-faq.md", {
          text: ".",
          "link" : "/platform/reports/"
        } ]
      }, "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/bi" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", {
        text: "Business Intelligence",
        collapsible: true,
        children: [ "/platform/bi/bi-module-guide.md", "/platform/bi/bi-module-technical-reference.md", "/platform/bi/bi-reference-enhanced-metrics-card.md", "/platform/bi/bi-reference-enhanced-table.md", "/platform/bi/bi-reference-wizard-mode.md", {
          text: ".",
          "link" : "/platform/bi/"
        } ]
      }, "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/platform/notifications" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", {
        text: "Notifications",
        collapsible: true,
        children: [ "/platform/notifications/notifications-system.md", "/platform/notifications/sms-and-whatsapp.md", "/platform/notifications/notification-fq.md", {
          text: ".",
          "link" : "/platform/notifications/"
        } ]
      }, {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/invoicing" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ {
        text: "الفواتير والضرائب والخصومات",
        collapsible: true,
        children: [ "/modules/invoicing/reward-points.md", "/modules/invoicing/invoice-discounts-and-tax-calculation-guide.md", "/modules/invoicing/pricing-and-offers-guide.md", "/modules/invoicing/payment-schedules-user-guide.md", "/modules/invoicing/payment-entries.md", "/modules/invoicing/online-payments.md", "/modules/invoicing/e-invoices-guide.md", "/modules/invoicing/zatca-guide.md", "/modules/invoicing/electronic-receipt-egypt-tax-eInvoice.md", "/modules/invoicing/uae-orchida-einvoice-guide.md", "/modules/invoicing/standard-terms-feature-documentation.md", "/modules/invoicing/barcode-field-feature.md", "/modules/invoicing/invoices-faq.md", {
          text: ".",
          "link" : "/modules/invoicing/"
        } ]
      }, "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/supplychain" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", {
        text: "Supply Chain",
        collapsible: true,
        children: [ "/modules/supplychain/supply-chain-intro.md", "/modules/supplychain/understanding-items.md", "/modules/supplychain/receiving-stock.md", "/modules/supplychain/issuing-stock.md", "/modules/supplychain/moving-stock.md", "/modules/supplychain/purchasing-journey.md", "/modules/supplychain/sales-journey.md", "/modules/supplychain/quality-control.md", "/modules/supplychain/specialized-scenarios.md", "/modules/supplychain/nama-pos.md", "/modules/supplychain/pos-free-items-claim-and-reconciliation.md", "/modules/supplychain/pos-fingerprint-login.md", "/modules/supplychain/reservation-system-guide.md", "/modules/supplychain/ignore-reservation-qty-check-by-date.md", "/modules/supplychain/supply-chain-faq.md", "/modules/supplychain/supply-chain-faq-english.md", {
          text: ".",
          "link" : "/modules/supplychain/"
        } ]
      }, "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/manufacturing" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", {
        text: "Manufacturing",
        collapsible: true,
        children: [ "/modules/manufacturing/manufacturing-overview.md", "/modules/manufacturing/production-orders.md", "/modules/manufacturing/production-execution.md", "/modules/manufacturing/production-costing.md", "/modules/manufacturing/material-requirements-planning.md", "/modules/manufacturing/carton-manufacturing-overview.md", "/modules/manufacturing/carton-specifications.md", "/modules/manufacturing/carton-orders.md", "/modules/manufacturing/carton-material-planning.md", "/modules/manufacturing/carton-material-issue.md", "/modules/manufacturing/manufacturing-faq.md", {
          text: ".",
          "link" : "/modules/manufacturing/"
        } ]
      }, "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/hr" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", {
        text: "Human Resources",
        collapsible: true,
        children: [ "/modules/hr/attendance-machine-formula.md", "/modules/hr/ignore-overlapping-attendance.md", "/modules/hr/human-resources-faq.md", {
          text: ".",
          "link" : "/modules/hr/"
        } ]
      }, "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/pos" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", {
        text: "Point of Sale",
        collapsible: true,
        children: [ "/modules/pos/pos-faq.md", {
          text: ".",
          "link" : "/modules/pos/"
        } ]
      }, "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/realestate" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", {
        text: "Real Estate",
        collapsible: true,
        children: [ "/modules/realestate/real-estate-fq.md", {
          text: ".",
          "link" : "/modules/realestate/"
        } ]
      }, "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/mobile" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", {
        text: "Mobile Applications",
        collapsible: true,
        children: [ "/modules/mobile/mobile-application-guide.md", "/modules/mobile/mobile-qr-integrator.md", "/modules/mobile/mobile-apps-faq.md", {
          text: ".",
          "link" : "/modules/mobile/"
        } ]
      }, "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/modules/ecommerce" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", {
        text: "e-commerce Integration",
        collapsible: true,
        children: [ "/modules/ecommerce/magento-integration-guide.md", "/modules/ecommerce/omniful-integration.md", {
          text: ".",
          "link" : "/modules/ecommerce/"
        } ]
      }, {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/integration" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, {
      text: "External Integrations",
      collapsible: true,
      children: [ "/integration/nama-erp-api.md", "/integration/system-integration-scenarios.md", "/integration/invoice-retriever.md", "/integration/attendance-machines-integration.md", "/integration/oracle-jdbc-connection.md", {
        text: ".",
        "link" : "/integration/"
      } ]
    }, {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/admin" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/tempo.md", "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/admin/troubleshooting" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ {
        text: "Troubleshooting",
        collapsible: true,
        children: [ "/admin/troubleshooting/troubleshooting-system-hanging.md", "/admin/troubleshooting/general-faq.md", "/admin/troubleshooting/database-error-related-faq.md", {
          text: ".",
          "link" : "/admin/troubleshooting/"
        } ]
      }, "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/admin/reprocessing" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", {
        text: "Reprocessing Transactions",
        collapsible: true,
        children: [ "/admin/reprocessing/reprocess-qty-and-cost.md", "/admin/reprocessing/reprocess-ledger-and-debt-ages.md", "/admin/reprocessing/cost-and-qty-problems.md", "/admin/reprocessing/inventory-utilities.md", "/admin/reprocessing/manufacturing-utilities.md", "/admin/reprocessing/fixed-asset-utilities.md", "/admin/reprocessing/real-estate-utilities.md", "/admin/reprocessing/db-operations.md", "/admin/reprocessing/suggest-index-creation.md", "/admin/reprocessing/general-purpose-utility-queries.md", "/admin/reprocessing/replication.md", {
          text: ".",
          "link" : "/admin/reprocessing/"
        } ]
      }, {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/developer" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, {
      text: "Developer Reference",
      collapsible: true,
      children: [ "/developer/docs-quick-guide.md", "/developer/dev-request-guidelines.md", "/developer/gui-post-actions-faq.md", {
        text: ".",
        "link" : "/developer/"
      } ]
    }, {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/core" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ {
        text: "Core",
        collapsible: true,
        children: [ "/entity-flows/core/ai-generated-field-maps-documentation.md", "/entity-flows/core/DeleteRelatedEntityAction.md", "/entity-flows/core/EAAllowUseAsFromDocOfAField.md", "/entity-flows/core/EAAltCodeValidator.md", "/entity-flows/core/EAAttachReportResultToRecord.md", "/entity-flows/core/EAAutoCollectSignAndSentEInvoice.md", "/entity-flows/core/EAAutoEscalateApprovalToFallBackEmployee.md", "/entity-flows/core/EAAutoEscalateApprovalToSupervisor.md", "/entity-flows/core/EAAutoSendEInvoice.md", "/entity-flows/core/EAAutomaticGenerateEntityFromEntityAction.md", "/entity-flows/core/EAAutomaticGenerateEntityFromEntityActionWithApproval.md", "/entity-flows/core/EACacheEvicter.md", "/entity-flows/core/EACalcCurrencyRate.md", "/entity-flows/core/EACalcCurrencyRateInDetails.md", "/entity-flows/core/EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry.md", "/entity-flows/core/EACheckDailyBackupOnGoogleDrive.md", "/entity-flows/core/EACheckTaxAuthorityRejectedByReceiverDocuments.md", "/entity-flows/core/EAClearGoogleDriveTrash.md", "/entity-flows/core/EACloseFiscalPeriodsInRange.md", "/entity-flows/core/EACodeValidator.md", "/entity-flows/core/EACopyEmptyAccountsFromBag.md", "/entity-flows/core/EADeleteFromAnotherServer.md", "/entity-flows/core/EADeleteFromQuery.md", "/entity-flows/core/EADeleteOldFiles.md", "/entity-flows/core/EADetailsRemover.md", "/entity-flows/core/EAEmptifyTomcatTemp.md", "/entity-flows/core/EAErrorIfQueryNotMatched.md", "/entity-flows/core/EAExecuteUpdateQuery.md", "/entity-flows/core/EAExecuteUpdateQueryOnDifferentDatasource.md", "/entity-flows/core/EAExportAttachments.md", "/entity-flows/core/EAFieldsValuesCalculator.md", "/entity-flows/core/EAForceApplyInstallmentEffects.md", "/entity-flows/core/EAForceUsersToChangePassword.md", "/entity-flows/core/EAGenerateDraftEntityFromEntityAction.md", "/entity-flows/core/EAGenerateDraftEntityFromEntityActionNoFlush.md", "/entity-flows/core/EAGenerateEntityFromEntityAction.md", "/entity-flows/core/EAGenerateEntityFromEntityActionNoFlush.md", "/entity-flows/core/EAGenerateEntityFromEntityActionNoFlushWithApproval.md", "/entity-flows/core/EAGenerateEntityFromEntityActionWithApproval.md", "/entity-flows/core/EAGenerateKNetPaymentURLs.md", "/entity-flows/core/EAGenerateMyFatoorahPaymentURLs.md", "/entity-flows/core/EAGroovyAction.md", "/entity-flows/core/EAGuessEntityFromNames.md", "/entity-flows/core/EAIgnoringNotFoundTargetFieldsValuesCalculator.md", "/entity-flows/core/EAJsonRecordExporter.md", "/entity-flows/core/EALoyalityEarnReward.md", "/entity-flows/core/EAMakeCreationDateAlwaysAfter.md", "/entity-flows/core/EAMakeCreationDateAlwaysBefore.md", "/entity-flows/core/EAMakeCreationDateAlwaysBetween.md", "/entity-flows/core/EAMakeCreationDateInValueDate.md", "/entity-flows/core/EANamaCloudBackupPrepare.md", "/entity-flows/core/EAOpenFiscalPeriodsInRange.md", "/entity-flows/core/EAPostGoPayOfflinePayment.md", "/entity-flows/core/EAPreventChangingFields.md", "/entity-flows/core/EAPreventFromDocOfUsageAgain.md", "/entity-flows/core/EAPreventUpdateDetailedRemarkLines.md", "/entity-flows/core/EAPreventUseAsFromDocOfAField.md", "/entity-flows/core/EAPrintFormToPrinter.md", "/entity-flows/core/EAPrintReportToPrinter.md", "/entity-flows/core/EARecommitFromQuery.md", "/entity-flows/core/EARefreshCriticalErrors.md", "/entity-flows/core/EARefreshGoogleDriveOrMailToken.md", "/entity-flows/core/EARegenAccEffects.md", "/entity-flows/core/EARegenAccFromQuery.md", "/entity-flows/core/EAReviseUnReviseFromQuery.md", "/entity-flows/core/EARevokeApproval.md", "/entity-flows/core/EARunBulkMassagesFromQuery.md", "/entity-flows/core/EARunEntityFlow.md", "/entity-flows/core/EARunEntityFlowFromQuery.md", "/entity-flows/core/EARunManualNotification.md", "/entity-flows/core/EARunManualNotificationFromQuery.md", "/entity-flows/core/EARunTaskSchedule.md", "/entity-flows/core/EASQLToCSVEmail.md", "/entity-flows/core/EASQLToCSVFile.md", "/entity-flows/core/EASaveDraftsFromQuery.md", "/entity-flows/core/EASaveRecordsFromQuery.md", "/entity-flows/core/EASaveToAnotherServer.md", "/entity-flows/core/EASaveToAnotherServerUsingJSON.md", "/entity-flows/core/EAScaleImage.md", "/entity-flows/core/EAScaleMasterFileImage.md", "/entity-flows/core/EASendHttpRequestByTempo.md", "/entity-flows/core/EASetCreationDateToEndOfDay.md", "/entity-flows/core/EASetCreationDateToStartOfDay.md", "/entity-flows/core/EASetFieldByTemplate.md", "/entity-flows/core/EASortFields.md", "/entity-flows/core/EAWathqAddressFetcher.md", "/entity-flows/core/EAWathqBasicInfoFetcher.md", "/entity-flows/core/EAWathqCommercialInfoFetcher.md", "/entity-flows/core/EAWordTemplate.md", "/entity-flows/core/SQLDraftImporter.md", "/entity-flows/core/SQLDraftImporterFromDifferentDataSource.md", "/entity-flows/core/SQLImporter.md", "/entity-flows/core/SQLImporterFromDifferentDataSource.md", {
          text: ".",
          "link" : "/entity-flows/core/"
        } ]
      }, "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/accounting" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", {
        text: "Accounting Module",
        collapsible: true,
        children: [ "/entity-flows/accounting/EAAddAccountingEffect.md", "/entity-flows/accounting/EAClearLedgerLines.md", "/entity-flows/accounting/EAGenInvestmentDocClaimingDoc.md", "/entity-flows/accounting/EAGenJournalEntry.md", "/entity-flows/accounting/EAGenTreasuryBillCloseDoc.md", "/entity-flows/accounting/EARVPVControlJournal.md", "/entity-flows/accounting/EAReverseLedgerTrans.md", "/entity-flows/accounting/EAShortenLedger.md", "/entity-flows/accounting/EAShortenLedgerChangeToAccountCurrency.md", "/entity-flows/accounting/EASortLedger.md", {
          text: ".",
          "link" : "/entity-flows/accounting/"
        } ]
      }, "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/ai" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", {
        text: "AI Module",
        collapsible: true,
        children: [ "/entity-flows/ai/EAEmbedFileToAIDB.md", "/entity-flows/ai/EAEmbedRecordsFromQuery.md", "/entity-flows/ai/EAKeepZillizClusterActive.md", {
          text: ".",
          "link" : "/entity-flows/ai/"
        } ]
      }, "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/contracting" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", {
        text: "Contracting Module",
        collapsible: true,
        children: [ "/entity-flows/contracting/EAUpdateExtractsEffectsOnPaymentDocs.md", "/entity-flows/contracting/EAUpdateRemarksInContractorExtractFromProjectContractTermDescription.md", "/entity-flows/contracting/EAUpdateRemarksInExtractFromContractTermDescription.md", {
          text: ".",
          "link" : "/entity-flows/contracting/"
        } ]
      }, "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/crm" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", {
        text: "CRM Module",
        collapsible: true,
        children: [ "/entity-flows/crm/EACRMContractBodyShapersCheckIn.md", "/entity-flows/crm/EACRMDevReqPadLeftRelativeWeight.md", {
          text: ".",
          "link" : "/entity-flows/crm/"
        } ]
      }, "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/egtax" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", {
        text: "EGTax Reader Module",
        collapsible: true,
        children: [ "/entity-flows/egtax/EAReadRecentTaxEInvoices.md", {
          text: ".",
          "link" : "/entity-flows/egtax/"
        } ]
      }, "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/frm" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", {
        text: "Freight Management System Module",
        collapsible: true,
        children: [ "/entity-flows/frm/EAKWSendIPSEvents.md", {
          text: ".",
          "link" : "/entity-flows/frm/"
        } ]
      }, "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/hms" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", {
        text: "Hospital Management System Module",
        collapsible: true,
        children: [ "/entity-flows/hms/EACreateAccommodationInvoice.md", {
          text: ".",
          "link" : "/entity-flows/hms/"
        } ]
      }, "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/hr" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", {
        text: "HR Module",
        collapsible: true,
        children: [ "/entity-flows/hr/CalcBasicSalaryForNetSalary.md", "/entity-flows/hr/EACalComponentFromLoan.md", "/entity-flows/hr/EAChangeEmployeeStateFromFiringHandler.md", "/entity-flows/hr/EAChangeEmployeeStateHandler.md", "/entity-flows/hr/EAClearFromDateIfFromTimeEmpty.md", "/entity-flows/hr/EAClearToDateIfToTimeEmpty.md", "/entity-flows/hr/EACopySalaryStructureToJobOffer.md", "/entity-flows/hr/EACopySalaryStructureToUpdateEmpInfo.md", "/entity-flows/hr/EADSCNormalizeTimeAttendance.md", "/entity-flows/hr/EAEmpAttendanceSysEntryCalculator.md", "/entity-flows/hr/EAGenSalarySheet.md", "/entity-flows/hr/EAHealthInsuranceOfferReqAction.md", "/entity-flows/hr/EALiptisSetComponentFromAnotherWithMax.md", "/entity-flows/hr/EAMakeSingleCheckInCheckOutIfNeeded.md", "/entity-flows/hr/EAOyoonWorkPlaceUpdateToUpdateInfo.md", "/entity-flows/hr/EASalaryCostCalculator.md", "/entity-flows/hr/EASalaryNormalizeAdditions.md", "/entity-flows/hr/EASalaryNormalizeDeductions.md", "/entity-flows/hr/EATimeAttendanceFromDBImportIntoDocument.md", "/entity-flows/hr/EATimeAttendanceFromDBImporter.md", "/entity-flows/hr/EATimeAttendanceSetDefaultFromTime.md", "/entity-flows/hr/EATimeAttendanceSetDefaultToTime.md", "/entity-flows/hr/EAUpdateEmployeeResidencyRenewDate.md", "/entity-flows/hr/SetAttendanceToFixedTimeIfEmpty.md", "/entity-flows/hr/TimeAttendanceAddExtraHoursToEmpty.md", "/entity-flows/hr/TimeAttendanceRemoveEmptyTimeLines.md", {
          text: ".",
          "link" : "/entity-flows/hr/"
        } ]
      }, "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/magento" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", {
        text: "e-commerce Integration Module",
        collapsible: true,
        children: [ "/entity-flows/magento/EAEcommerceAddItemToLinker.md", "/entity-flows/magento/EAEcommerceGuessItemBySKU.md", "/entity-flows/magento/EAEcommerceReadAbandonedCarts.md", "/entity-flows/magento/EAEcommerceReadOrders.md", "/entity-flows/magento/EAEcommerceReadOrdersFromDate.md", "/entity-flows/magento/EAEcommerceShippingHandler.md", "/entity-flows/magento/EAEcommerceUploadQuantityCSVFileToFTPServer.md", "/entity-flows/magento/EASalesRecalculateFreeAndRelatedItems.md", {
          text: ".",
          "link" : "/entity-flows/magento/"
        } ]
      }, "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/manufacturing" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", {
        text: "Manufacturing Module",
        collapsible: true,
        children: [ "/entity-flows/manufacturing/EAStartOrderIfNotStarted.md", {
          text: ".",
          "link" : "/entity-flows/manufacturing/"
        } ]
      }, "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/namapos" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", {
        text: "POS Module",
        collapsible: true,
        children: [ "/entity-flows/namapos/EADarTibaServiceInvoiceTermSetter.md", "/entity-flows/namapos/EADeleteOldPOSOnlineOrderEntries.md", {
          text: ".",
          "link" : "/entity-flows/namapos/"
        } ]
      }, "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/realestate" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", {
        text: "Real Estate Module",
        collapsible: true,
        children: [ "/entity-flows/realestate/EAAutoExtendExpiredRentContracts.md", "/entity-flows/realestate/EAAutoGenerateREFineDoc.md", "/entity-flows/realestate/EACancelReservationOFSalesInitialDoc.md", "/entity-flows/realestate/EAFixNextAndPreviousFromQuery.md", {
          text: ".",
          "link" : "/entity-flows/realestate/"
        } ]
      }, "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/srvcenter" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", {
        text: "Service Center Module",
        collapsible: true,
        children: [ "/entity-flows/srvcenter/EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds.md", "/entity-flows/srvcenter/EARecalculateSrvcOperationsAndMaterialsPrices.md", "/entity-flows/srvcenter/EARecalculateSrvcOperationsAndMaterialsPricesFromQuery.md", "/entity-flows/srvcenter/EASRVCCopyExecutionRemarksToJobOrder.md", "/entity-flows/srvcenter/EAUpdateAssemblyDocWithAssembledItemSold.md", "/entity-flows/srvcenter/EAUseReceiptPaperForEngineOrChassisItems.md", {
          text: ".",
          "link" : "/entity-flows/srvcenter/"
        } ]
      }, "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/entity-flows/supplychain" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", {
        text: "Supply Chain Module",
        collapsible: true,
        children: [ "/entity-flows/supplychain/EAApplyReservationOfDocsByQuery.md", "/entity-flows/supplychain/EAAutoCreateSCDocSecondSerial.md", "/entity-flows/supplychain/EAAutoCreateSCDocSerial.md", "/entity-flows/supplychain/EAAutoGenSCDocFromDocWithFieldsMap.md", "/entity-flows/supplychain/EAAutoGroupCloneItemFromPO.md", "/entity-flows/supplychain/EAAutoSerialNumberCalculator.md", "/entity-flows/supplychain/EACancelReservationOfDocsByQuery.md", "/entity-flows/supplychain/EACollectAlItem.md", "/entity-flows/supplychain/EACollectByItemDimension.md", "/entity-flows/supplychain/EACollectLot.md", "/entity-flows/supplychain/EACollectStockDocsIfEmpty.md", "/entity-flows/supplychain/EACopyItemAssortmentToSCLine.md", "/entity-flows/supplychain/EACopyRackCodeFromStockTaking.md", "/entity-flows/supplychain/EACopyRevisionFromFromDoc.md", "/entity-flows/supplychain/EACopyTaxesFromFromDoc.md", "/entity-flows/supplychain/EACopyUnitCostFromInvoiceToIssueDoc.md", "/entity-flows/supplychain/EAEGBRASSFixCreationDates.md", "/entity-flows/supplychain/EAFillSCDetailsByBarCodeSpecs.md", "/entity-flows/supplychain/EAGenAndItemSizesAndColorsAndRevisions.md", "/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap.md", "/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMapWithoutFlush.md", "/entity-flows/supplychain/EAGuessSourceLineByItemIdAndFreeItem.md", "/entity-flows/supplychain/EAGuessSourceLineIdByItem.md", "/entity-flows/supplychain/EAImportItemsFromLongTextField.md", "/entity-flows/supplychain/EALotCalculator.md", "/entity-flows/supplychain/EAMultiCustomerSalesOfferCreator.md", "/entity-flows/supplychain/EANotifyIfSSLCertificateAboutToExpire.md", "/entity-flows/supplychain/EAPreventChangingSCDocumentCriticalFields.md", "/entity-flows/supplychain/EAPreventQtyLessThan.md", "/entity-flows/supplychain/EAPreventQtyMoreThan.md", "/entity-flows/supplychain/EAPreventRepeatedItems.md", "/entity-flows/supplychain/EAPreventRepeatedValuesAtDetail.md", "/entity-flows/supplychain/EAReApplyQtyTrackingEffects.md", "/entity-flows/supplychain/EARecalcFreeLinesUnitPriceIfZero.md", "/entity-flows/supplychain/EARecalcPurchasePrices.md", "/entity-flows/supplychain/EARecalcSalesDocDiscounts.md", "/entity-flows/supplychain/EARecalcSalesDocUnitPrices.md", "/entity-flows/supplychain/EARecalcSalesDocUnitPricesAndDiscounts.md", "/entity-flows/supplychain/EARecalculateAdditionalCost.md", "/entity-flows/supplychain/EARegenAssemblyDocumentDetailsFromBOM.md", "/entity-flows/supplychain/EARegenInvTransReq.md", "/entity-flows/supplychain/EARegenInvTransReqFromQuery.md", "/entity-flows/supplychain/EAReplaceItemBoxInSystem.md", "/entity-flows/supplychain/EAReplaceItemColorInSystem.md", "/entity-flows/supplychain/EAReplaceItemSizeInSystem.md", "/entity-flows/supplychain/EASCDocFromDocCreator.md", "/entity-flows/supplychain/EASCDocFromDocDeleter.md", "/entity-flows/supplychain/EASCPreventChangingFromDocFields.md", "/entity-flows/supplychain/EASalesRecalculateFreeAndRelatedItems.md", "/entity-flows/supplychain/EASendCustomerToDatanuum.md", "/entity-flows/supplychain/EASendInvItemToDatanuum.md", "/entity-flows/supplychain/EASendInvoiceToDatanuum.md", "/entity-flows/supplychain/EASendReturnedInvoiceToDatanuum.md", "/entity-flows/supplychain/EASetDefaultWarehouseForServiceItems.md", "/entity-flows/supplychain/EASpreadAssemblyComponents.md", "/entity-flows/supplychain/EASubolSetMasterRowIdOfFreeItems.md", "/entity-flows/supplychain/EASupplyChainMergeDocLines.md", "/entity-flows/supplychain/EASupplyChainMergeStockTakingElectronicDocLines.md", "/entity-flows/supplychain/EAUnZipSerialsInLines.md", "/entity-flows/supplychain/EAUniCreteGenAssemblyBOM.md", "/entity-flows/supplychain/EAUniCreteGenItems.md", "/entity-flows/supplychain/EAUniCreteGenSalesInvoiceFromStockIssue.md", "/entity-flows/supplychain/EAUniCreteSetQtyOfSlaveRowsAsMaster.md", "/entity-flows/supplychain/EAUnicreteGenItemsAllAllowMustApply.md", "/entity-flows/supplychain/EAUpdateDeliveryStatusFromSalesDocToFromDoc.md", "/entity-flows/supplychain/EAUpdateLotIdDates.md", "/entity-flows/supplychain/SetQuantityToOneAction.md", "/entity-flows/supplychain/SetSecondUOMToDefaultIfEmpty.md", "/entity-flows/supplychain/UniqueBOXInsideStockReceipt.md", "/entity-flows/supplychain/ValidateSorceLinesOfFromDocAction.md", {
          text: ".",
          "link" : "/entity-flows/supplychain/"
        } ]
      }, {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2016" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ {
        text: "2016",
        collapsible: true,
        children: [ "/release-notes/2016/nama-erp-201604-release-notes-arabic.md", "/release-notes/2016/nama-erp-201605-release-notes-arabic.md", "/release-notes/2016/nama-erp-201606-release-notes-arabic.md", "/release-notes/2016/nama-erp-201607-release-notes-arabic.md", "/release-notes/2016/nama-erp-201608-release-notes-arabic.md", "/release-notes/2016/nama-erp-201609-release-notes-arabic.md", "/release-notes/2016/nama-erp-201610-release-notes-arabic.md", "/release-notes/2016/nama-erp-201611-release-notes-arabic.md", "/release-notes/2016/nama-erp-201612-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2016/"
        } ]
      }, "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2017" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", {
        text: "2017",
        collapsible: true,
        children: [ "/release-notes/2017/nama-erp-201701-release-notes-arabic.md", "/release-notes/2017/nama-erp-201702-release-notes-arabic.md", "/release-notes/2017/nama-erp-201703-release-notes-arabic.md", "/release-notes/2017/nama-erp-201704-release-notes-arabic.md", "/release-notes/2017/nama-erp-201705-release-notes-arabic.md", "/release-notes/2017/nama-erp-201706-release-notes-arabic.md", "/release-notes/2017/nama-erp-201707-release-notes-arabic.md", "/release-notes/2017/nama-erp-201708-release-notes-arabic.md", "/release-notes/2017/nama-erp-201709-release-notes-arabic.md", "/release-notes/2017/nama-erp-201710-release-notes-arabic.md", "/release-notes/2017/nama-erp-201711-release-notes-arabic.md", "/release-notes/2017/nama-erp-201712-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2017/"
        } ]
      }, "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2018" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", {
        text: "2018",
        collapsible: true,
        children: [ "/release-notes/2018/nama-erp-201801-release-notes-arabic.md", "/release-notes/2018/nama-erp-201802-release-notes-arabic.md", "/release-notes/2018/nama-erp-201803-release-notes-arabic.md", "/release-notes/2018/nama-erp-201804-release-notes-arabic.md", "/release-notes/2018/nama-erp-201805-release-notes-arabic.md", "/release-notes/2018/nama-erp-201806-release-notes-arabic.md", "/release-notes/2018/nama-erp-201807-release-notes-arabic.md", "/release-notes/2018/nama-erp-201808-release-notes-arabic.md", "/release-notes/2018/nama-erp-201809-release-notes-arabic.md", "/release-notes/2018/nama-erp-201810-release-notes-arabic.md", "/release-notes/2018/nama-erp-201811-release-notes-arabic.md", "/release-notes/2018/nama-erp-201812-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2018/"
        } ]
      }, "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2019" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", {
        text: "2019",
        collapsible: true,
        children: [ "/release-notes/2019/nama-erp-201901-release-notes-arabic.md", "/release-notes/2019/nama-erp-201902-release-notes-arabic.md", "/release-notes/2019/nama-erp-201903-release-notes-arabic.md", "/release-notes/2019/nama-erp-201904-release-notes-arabic.md", "/release-notes/2019/nama-erp-201905-release-notes-arabic.md", "/release-notes/2019/nama-erp-201906-release-notes-arabic.md", "/release-notes/2019/nama-erp-201907-release-notes-arabic.md", "/release-notes/2019/nama-erp-201908-release-notes-arabic.md", "/release-notes/2019/nama-erp-201909-release-notes-arabic.md", "/release-notes/2019/nama-erp-201910-release-notes-arabic.md", "/release-notes/2019/nama-erp-201911-release-notes-arabic.md", "/release-notes/2019/nama-erp-201912-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2019/"
        } ]
      }, "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2020" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", {
        text: "2020",
        collapsible: true,
        children: [ "/release-notes/2020/nama-erp-202001-release-notes-arabic.md", "/release-notes/2020/nama-erp-202002-release-notes-arabic.md", "/release-notes/2020/nama-erp-202003-release-notes-arabic.md", "/release-notes/2020/nama-erp-202004-release-notes-arabic.md", "/release-notes/2020/nama-erp-202005-release-notes-arabic.md", "/release-notes/2020/nama-erp-202006-release-notes-arabic.md", "/release-notes/2020/nama-erp-202007-release-notes-arabic.md", "/release-notes/2020/nama-erp-202008-release-notes-arabic.md", "/release-notes/2020/nama-erp-202009-release-notes-arabic.md", "/release-notes/2020/nama-erp-202010-release-notes-arabic.md", "/release-notes/2020/nama-erp-202011-release-notes-arabic.md", "/release-notes/2020/nama-erp-202012-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2020/"
        } ]
      }, "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2021" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", {
        text: "2021",
        collapsible: true,
        children: [ "/release-notes/2021/nama-erp-202101-release-notes-arabic.md", "/release-notes/2021/nama-erp-202102-release-notes-arabic.md", "/release-notes/2021/nama-erp-202103-release-notes-arabic.md", "/release-notes/2021/nama-erp-202104-release-notes-arabic.md", "/release-notes/2021/nama-erp-202105-release-notes-arabic.md", "/release-notes/2021/nama-erp-202106-release-notes-arabic.md", "/release-notes/2021/nama-erp-202107-release-notes-arabic.md", "/release-notes/2021/nama-erp-202108-release-notes-arabic.md", "/release-notes/2021/nama-erp-202109-release-notes-arabic.md", "/release-notes/2021/nama-erp-202110-release-notes-arabic.md", "/release-notes/2021/nama-erp-202111-release-notes-arabic.md", "/release-notes/2021/nama-erp-202112-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2021/"
        } ]
      }, "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2022" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", {
        text: "2022",
        collapsible: true,
        children: [ "/release-notes/2022/nama-erp-202201-release-notes-arabic.md", "/release-notes/2022/nama-erp-202202-release-notes-arabic.md", "/release-notes/2022/nama-erp-202203-release-notes-arabic.md", "/release-notes/2022/nama-erp-202204-release-notes-arabic.md", "/release-notes/2022/nama-erp-202205-release-notes-arabic.md", "/release-notes/2022/nama-erp-202206-release-notes-arabic.md", "/release-notes/2022/nama-erp-202207-release-notes-arabic.md", "/release-notes/2022/nama-erp-202208-release-notes-arabic.md", "/release-notes/2022/nama-erp-202209-release-notes-arabic.md", "/release-notes/2022/nama-erp-202210-release-notes-arabic.md", "/release-notes/2022/nama-erp-202211-release-notes-arabic.md", "/release-notes/2022/nama-erp-202212-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2022/"
        } ]
      }, "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2023" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", {
        text: "2023",
        collapsible: true,
        children: [ "/release-notes/2023/nama-erp-202301-release-notes-arabic.md", "/release-notes/2023/nama-erp-202302-release-notes-arabic.md", "/release-notes/2023/nama-erp-202303-release-notes-arabic.md", "/release-notes/2023/nama-erp-202304-release-notes-arabic.md", "/release-notes/2023/nama-erp-202305-release-notes-arabic.md", "/release-notes/2023/nama-erp-202306-release-notes-arabic.md", "/release-notes/2023/nama-erp-202307-release-notes-arabic.md", "/release-notes/2023/nama-erp-202308-release-notes-arabic.md", "/release-notes/2023/nama-erp-202309-release-notes-arabic.md", "/release-notes/2023/nama-erp-202310-release-notes-arabic.md", "/release-notes/2023/nama-erp-202311-release-notes-arabic.md", "/release-notes/2023/nama-erp-202312-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2023/"
        } ]
      }, "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2024" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", {
        text: "2024",
        collapsible: true,
        children: [ "/release-notes/2024/nama-erp-202401-release-notes-arabic.md", "/release-notes/2024/nama-erp-202402-release-notes-arabic.md", "/release-notes/2024/nama-erp-202403-release-notes-arabic.md", "/release-notes/2024/nama-erp-202404-release-notes-arabic.md", "/release-notes/2024/nama-erp-202405-release-notes-arabic.md", "/release-notes/2024/nama-erp-202406-release-notes-arabic.md", "/release-notes/2024/nama-erp-202407-release-notes-arabic.md", "/release-notes/2024/nama-erp-202408-release-notes-arabic.md", "/release-notes/2024/nama-erp-202409-release-notes-arabic.md", "/release-notes/2024/nama-erp-202410-release-notes-arabic.md", "/release-notes/2024/nama-erp-202411-release-notes-arabic.md", "/release-notes/2024/nama-erp-202412-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2024/"
        } ]
      }, "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2025" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", {
        text: "2025",
        collapsible: true,
        children: [ "/release-notes/2025/nama-erp-202501-release-notes-arabic.md", "/release-notes/2025/nama-erp-202502-release-notes-arabic.md", "/release-notes/2025/nama-erp-202503-release-notes-arabic.md", "/release-notes/2025/nama-erp-202504-release-notes-arabic.md", "/release-notes/2025/nama-erp-202505-release-notes-arabic.md", "/release-notes/2025/nama-erp-202506-release-notes-arabic.md", "/release-notes/2025/nama-erp-202507-release-notes-arabic.md", "/release-notes/2025/nama-erp-202508-release-notes-arabic.md", "/release-notes/2025/nama-erp-202509-release-notes-arabic.md", "/release-notes/2025/nama-erp-202510-release-notes-arabic.md", "/release-notes/2025/nama-erp-202511-release-notes-arabic.md", "/release-notes/2025/nama-erp-202512-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2025/"
        } ]
      }, "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/release-notes/2026" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", {
        text: "2026",
        collapsible: true,
        children: [ "/release-notes/2026/nama-erp-202601-release-notes-arabic.md", "/release-notes/2026/nama-erp-202602-release-notes-arabic.md", "/release-notes/2026/nama-erp-202603-release-notes-arabic.md", "/release-notes/2026/nama-erp-202604-release-notes-arabic.md", "/release-notes/2026/nama-erp-202605-release-notes-arabic.md", {
          text: ".",
          "link" : "/release-notes/2026/"
        } ]
      }, {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/videos" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/installation-video.md", "/videos/supply-chain-videos/", "/videos/manufacturing-actual-overhead.md", "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/videos/supply-chain-videos" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ {
        text: "Supply Chain Videos",
        collapsible: true,
        children: [ "/videos/supply-chain-videos/cost-video-1.md", "/videos/supply-chain-videos/cost-video-2.md", "/videos/supply-chain-videos/cost-video-3.md", {
          text: ".",
          "link" : "/videos/supply-chain-videos/"
        } ]
      }, "/videos/report-wizard-videos/", "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/videos/report-wizard-videos" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", {
        text: "Report Wizard Videos",
        collapsible: true,
        children: [ "/videos/report-wizard-videos/report-wizard-webinar-1.md", "/videos/report-wizard-videos/report-wizard-webinar-2.md", "/videos/report-wizard-videos/report-wizard-webinar-3.md", "/videos/report-wizard-videos/report-wizard-webinar-4.md", "/videos/report-wizard-videos/report-wizard-webinar-5.md", "/videos/report-wizard-videos/report-wizard-webinar-6.md", {
          text: ".",
          "link" : "/videos/report-wizard-videos/"
        } ]
      }, "/videos/hr/", {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ],
  "/videos/hr" : [ {
    text: "Home",
    collapsible: true,
    children: [ "/full-search.md", "/getting-started/", {
      text: "Platform Features",
      collapsible: true,
      children: [ "/platform/screen-modifier/", "/platform/list-views/", "/platform/approvals/", "/platform/security/", "/platform/entity-flows/", "/platform/reports/", "/platform/bi/", "/platform/notifications/", {
        text: ".",
        "link" : "/platform/"
      } ]
    }, {
      text: "Modules",
      collapsible: true,
      children: [ "/modules/invoicing/", "/modules/supplychain/", "/modules/manufacturing/", "/modules/hr/", "/modules/pos/", "/modules/realestate/", "/modules/mobile/", "/modules/ecommerce/", {
        text: ".",
        "link" : "/modules/"
      } ]
    }, "/integration/", {
      text: "System Administration",
      collapsible: true,
      children: [ "/admin/troubleshooting/", "/admin/reprocessing/", {
        text: ".",
        "link" : "/admin/"
      } ]
    }, "/developer/", {
      text: "AI Generated Entity Flows Documentation",
      collapsible: true,
      children: [ "/entity-flows/core/", "/entity-flows/accounting/", "/entity-flows/ai/", "/entity-flows/contracting/", "/entity-flows/crm/", "/entity-flows/egtax/", "/entity-flows/frm/", "/entity-flows/hms/", "/entity-flows/hr/", "/entity-flows/magento/", "/entity-flows/manufacturing/", "/entity-flows/namapos/", "/entity-flows/realestate/", "/entity-flows/srvcenter/", "/entity-flows/supplychain/", {
        text: ".",
        "link" : "/entity-flows/"
      } ]
    }, {
      text: "Release Notes",
      collapsible: true,
      children: [ "/release-notes/2016/", "/release-notes/2017/", "/release-notes/2018/", "/release-notes/2019/", "/release-notes/2020/", "/release-notes/2021/", "/release-notes/2022/", "/release-notes/2023/", "/release-notes/2024/", "/release-notes/2025/", "/release-notes/2026/", {
        text: ".",
        "link" : "/release-notes/"
      } ]
    }, {
      text: "Video Tutorials",
      collapsible: true,
      children: [ "/videos/supply-chain-videos/", "/videos/report-wizard-videos/", {
        text: "Human Resources Videos",
        collapsible: true,
        children: [ "/videos/hr/hr-course-1.md", "/videos/hr/hr-course-2.md", "/videos/hr/hr-course-3.md", "/videos/hr/hr-course-4.md", {
          text: ".",
          "link" : "/videos/hr/"
        } ]
      }, {
        text: ".",
        "link" : "/videos/"
      } ]
    } ]
  } ]
}