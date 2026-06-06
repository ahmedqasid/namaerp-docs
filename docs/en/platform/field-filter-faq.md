# Frequently Asked Questions about Field Filtering

## How can I filter Reference 1 in the item inventory to display only the same items found in the details?

- Question:

I am using Reference 1 in the item inventory to fetch items, and I want it to show only the same items that were selected in the details. The code I wrote is:

```tempo
{loop(details)}
termsLines.ref1,Equal,{details.item.item.code},OR;
{endloop}
```

- Answer:

It is clear you want to filter the `termsLines.ref1` field so it displays only the items selected in `details.item.item`.

However, there is an error in the code used:

* When writing the filter condition, you must write **the field name as it exists inside the item screen** (which is the screen being filtered), not the field name inside the document you are working with.
* Using `termsLines.ref1` inside the condition is incorrect, because this field is only used to specify where the filter will be applied, not inside the filter condition itself.

- Correction:

Use the fields as they exist in **the item screen**, as follows:

If you want to filter by code:

```tempo
{loop(details)}
code,Equal,{details.item.item.code},OR;
{endloop}
```

And if you want to filter more precisely using the identifier number:

```tempo
{loop(details)}
id,Equal,{details.item.item.id},OR;
{endloop}
```

::: tip
Make sure you are using the correct field name as it exists in the entity screen being filtered, not the field name in the source document.
:::

## What is the best approach when searching in a stock receipt or stock issue to show items based on available balance?

* **In a stock issue**: Show only items that have a balance.
* **In a stock receipt**: Show only items that have no balance.

---

### First: Filtering Items with Balance Only in a Stock Issue

The `InvItem` entity contains lines named `quantities` linked to the `ItemDimensionsQty` table. You can use this relationship to filter items that have a balance as follows:

::: details JSON for direct import

```json
{
  "forType": "StockIssue",
  "automaticUsage": true,
  "lines": [
    {
      "fieldId": "details.item.item",
      "dynamicFilter": "quantities.data.net,GreaterThan,0,AND;"
    }
  ]
}
```

:::

---

### Second: Filtering Items with No Balance in a Stock Receipt

Since an item may not always have data directly in `quantities` if there is no balance, it is better to update a custom field (e.g., `n5`) in the `InvItem` entity that reflects the total available quantity, then use it in the filter.

#### 1. Create a scheduled task to update the `n5` field with the available balance value:

::: details JSON for direct import

```json
{
  "scheduleType": "Action",
  "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
  "title1": "Update Query",
  "parameter1": "update i set n5 = coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net) net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
  "title2": "Evict Cache After Execution(true,false)",
  "parameter2": "true",
  "actionDescription": "Execute update query specified in first parameter"
}
```
:::

#### 2. After that, filter the item field in the stock receipt based on the new value in the `n5` field:

::: details JSON for direct import

```json
{
  "forType": "StockReceipt",
  "automaticUsage": true,
  "lines": [
    {
      "fieldId": "details.item.item",
      "dynamicFilter": "quantities.data.net,LessThanOrEqual,0,AND;"
    }
  ]
}
```
:::

::: tip Note
- You can also replace `quantities.data.net` with `n5` directly if you want to bind the filter to the calculated field, but using `quantities.data.net` is more accurate since n5 depends on the task being run.
- Choose the scheduled task's run interval carefully so that it maintains the accuracy of the n5 field while not putting excessive load on the server and database resources.
:::

### Improving Automatic `n5` Field Updates Using an Entity Flow

Instead of relying solely on an independent scheduled task, you can use an **Entity Flow** to update the `n5` field immediately after any inventory movement (issue, receipt, transfer), achieving instant and efficient updates while reducing system load.

---

- Suggested Steps:

1. **Create a new Entity Flow**

* It runs after the actual effect on the database (after the final save).

2. **Set the target types in the entity types list**:

* `StockIssue` (stock issue)
* `StockReceipt` (stock receipt)
* `StockTransfer` (stock transfer)

3. **Add an action of type "Run SQL Update Command"** with the same code as the scheduled task:

4. **Enable the following options in the Entity Flow**:

* ✅ `Runs after the document is finally saved and the effect on the database`
* ✅ `Wait for quantity processing to finish`

These settings ensure that the update only happens **after successful inventory processing**, preventing conflicts or premature updates.

---

- Benefits of This Approach:

* Instant update of `n5` without the need for a time-based schedule.
* Reduces system load caused by repeated execution.
* Maintains balance accuracy across all screens that rely on `n5`.

---
Here is the flow ready for import:
::: details JSON for direct import
```json
{
  "entityTypeList": "StockIssueReceiptTransfer",
  "runAfterCommitDocAndEffectOnDB": true,
  "waitForQuantityProcessing": true,
  "details": [
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
      "parameter1": "update i set n5 =  coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net)  net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
      "parameter2": "true",
      "targetAction": "PostCommit"
    },
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
      "parameter1": "update i set n5 =  coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net)  net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
      "parameter2": "true",
      "targetAction": "PostDelete"
    }
  ]
}
```
:::
> You can also keep the scheduled task as a backup plan that runs once a day, for example, to ensure full synchronization — especially in cases of manual edits or large import operations.
