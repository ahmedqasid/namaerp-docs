<rtl>

# أسئلة شائعة حول أداة إنشاء التقارير

## كيف يمكنني إنشاء تقرير يظهر رصيد حساب معين لكل فرع بفلتر تاريخ، بالإضافة إلى إجمالي المبيعات لنفس الفرع مع فلتر تاريخ مختلف؟

### السيناريو

* أنشأت تقريرًا باستخدام أداة إنشاء التقارير على جدول `LedgerTransLine`.
* أضفت عمودًا للفرع، وعمودًا آخر يحتوي على معادلة لحساب الرصيد (`المدين - الدائن`).
* أنشأت مصدر بيانات خارجي (`DataSource1`) لجلب إجمالي المبيعات لنفس الفرع.
* أضفت فلتر على حقل `valueDate` في الجدول الرئيسي لفلترة الأرصدة.
* أنشأت مصدر البيانات للمبيعات من جدول `SalesInvoice`، وربطت الجدولين بواسطة حقل `branch`.

### المشكلة

أرغب في استخدام فلتر تواريخ مستقل لبيانات المبيعات دون التأثير على فلتر تواريخ الأرصدة.

---

### الحل

لتحقيق ذلك، يجب تنفيذ الخطوات التالية:

1. **إضافة مدخل مخصص للتاريخ** باسم `salesValueDate`:

    * نوعه: `Custom`
    * نوع البيانات: `Date`

2. **ربط هذا المدخل مع مصدر البيانات الأول** (الخاص بالمبيعات) في سطر الفلاتر باستخدام حقل `valueDate`.

---

### استيراد إعدادات التقرير

::: details

```json
{
  "tableType": "DetailLine",
  "mainTable": "LedgerTransLine",
  "useDataSource1AsSubQuery": true,
  "fields": [
    { "fieldId": "branch" },
    {
      "fieldId": "credit.value.amount",
      "hidden": true,
      "hasTotalInSummary": true,
      "sqlAggregationType": "Sum"
    },
    {
      "fieldId": "debit.value.amount",
      "hidden": true,
      "hasTotalInSummary": true,
      "sqlAggregationType": "Sum"
    },
    {
      "type": "Normal",
      "arabicTitle": "الرصيد",
      "customJasperExpression": {
        "Details": {
          "expression": "@{debit.value.amount}@-@{credit.value.amount}@"
        }
      },
      "customPattern": "###,###.##",
      "hasTotalInSummary": true,
      "sqlAggregationType": "Sum"
    },
    {
      "fieldId": "$dataSource1.money.netValue",
      "arabicTitle": "المبيعات"
    }
  ],
  "parameters": [
    {
      "fieldId": "branch",
      "filterType": "Between",
      "showInsideReport": true,
      "generatedParameterName": "FromBranch,ToBranch"
    },
    {
      "fieldId": "valueDate",
      "filterType": "Between",
      "showInsideReport": true,
      "generatedParameterName": "FromValueDate,ToValueDate",
      "defaultValue": "$today()",
      "defaultValueWithBetween": "$today()"
    },
    {
      "fieldId": "salesValueDate",
      "arabicTitle": "من تاريخ مبيعات",
      "filterType": "Between",
      "parameterType": "Custom",
      "showInsideReport": true,
      "generatedParameterName": "FromSalesValueDate,ToSalesValueDate",
      "defaultValue": "$today()",
      "defaultValueWithBetween": "$today()",
      "patternType": "Date",
      "paramType": "Date"
    }
  ],
  "dataSource1LinkingLines": [
    {
      "dataSourceField": "branch",
      "operator": "Equals",
      "reportingWizardField": "branch"
    }
  ],
  "dataSource1FilterLines": [
    {
      "dataSourceField": "valueDate",
      "operator": "Between",
      "reportingWizardParameter": "FromSalesValueDate,ToSalesValueDate"
    }
  ]
}
```

:::

---

### استيراد مصدر البيانات

::: details

```json
{
  "mainTable": "SalesInvoice",
  "allowAllMainTableFieldsForUse": true,
  "fields": [
    {
      "fieldId": "money.netValue",
      "sqlAggregationType": "Sum"
    }
  ]
}
```

:::

::: tip Summary in English

**Question**:
How can I create a report that shows the balance of a specific account for each branch filtered by a date range, and at the same time show the total sales for each branch filtered by a different date range?

**Answer**:

* Create a report based on the `LedgerTransLine` table to calculate balance per branch.
* Add a custom SQL expression to compute balance (`debit - credit`).
* Add an external data source (DataSource1) based on `SalesInvoice`, linked by `branch`, to retrieve sales totals.
* Add two separate date filters:

    * One for the main table (`valueDate`) for account balances.
    * Another for the external data source, using a custom date parameter named `salesValueDate`.
* Link `salesValueDate` to the `valueDate` field in the external data source.

This setup allows independent filtering of account balances and sales totals per branch.

:::

</rtl>
