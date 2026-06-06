# Frequently Asked Questions About the Report Builder

## How can I create a report that shows the account balance for each branch filtered by a date range, along with total sales for the same branch filtered by a different date range?

### Scenario

* You created a report using the Report Builder on the `LedgerTransLine` table.
* You added a branch column and another column with a formula to calculate the balance (`debit - credit`).
* You created an external data source (`DataSource1`) to fetch total sales for the same branch.
* You added a filter on the `valueDate` field in the main table to filter balances.
* You created the sales data source from the `SalesInvoice` table and linked the two tables by the `branch` field.

### Problem

You want to use an independent date filter for the sales data without affecting the balance date filter.

---

### Solution

To achieve this, follow these steps:

1. **Add a custom date parameter** named `salesValueDate`:

    * Type: `Custom`
    * Data type: `Date`

2. **Link this parameter to the first data source** (for sales) in the filters row using the `valueDate` field.

---

### Import Report Settings

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

### Import Data Source

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

::: tip Summary

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

## Selecting an Item Price from the Price List Based on the Report Date

### Problem

If there are multiple price lists containing the **same item** with partially overlapping dates, for example:

* A price list from the 1st to the end of the month
* Another price list starting from the 15th to the end of the month

The report must select the correct price based on the **report run date** or a **user-specified date**.

### Solution

Use the `NamaRep.priceCalculator()` function inside a **Custom Jasper Expression** to fetch the item price at the correct date.

#### Example 1: Fetch item price at the report run date

```groovy
NamaRep.priceCalculator().item(@{details.item.item.id}@).unitPriceOnly().unitPrice()
```

This example returns the item price at the report run date.

#### Example 2: Fetch item price based on a user-provided date (e.g., `FromDate`)

```groovy
NamaRep.priceCalculator().item(@{details.item.item.id}@).date($P{FromDate}).unitPriceOnly().unitPrice()
```

This example uses the date specified by the user to calculate the price.

### Notes

* Make sure the **Legal Entity** is taken from the report context automatically, or you can specify it manually using:

  ```groovy
  .legalEntity($P{CompanyId})
  ```
* You can also specify the customer, quantity, unit, or any other factor that affects the price if the price lists contain additional conditions.
* The function returns `null` if no matching price is found.
