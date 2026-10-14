---
title: Collect a Purchase Invoice's Stock Receipts From Its Car Receipts
module: srvcenter
entities: [EntityFlow, PurchaseInvoice]
groovy: recommended
description: A Groovy script that fills a purchase invoice's Stock Documents grid with the stock receipts made from the Car Receipts of the invoice's From Document.
---

<div class='entity-flows'>

# Collect a Purchase Invoice's Stock Receipts From Its Car Receipts

This Groovy script fills the **Stock Documents** grid of a purchase invoice. It takes the Car Receipts that were made from the same document as the invoice, and lists every stock receipt that was made from those Car Receipts.

::: tip Recommended pattern
This script is not tied to any customer's setup. It takes no parameters, so you can paste it as it is.
:::

| | |
|---|---|
| **Class name** | `EACollectStockReceiptsByFromDoc` |
| **Script** | [EACollectStockReceiptsByFromDoc.groovy](/groovy-examples/EACollectStockReceiptsByFromDoc.groovy) |
| **Runs on** | Purchase Invoice, on **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

In the car business, goods do not go straight from the purchase document into stock. Cars arrive first on a **Car Receipt** (**cars → Car Inventory → Car Receipt**), which records the chassis and the accessories that came with each car. The stock receipt that actually puts the car into the warehouse is made from that Car Receipt.

When the purchase invoice is then made from the same purchase document, its **Stock Documents** grid should list those stock receipts, so the invoice and the goods it pays for are linked. The system does not find them by itself, because they hang one level away from the invoice: under the Car Receipts, not under the invoice's own **From Document**. This script walks that extra step.

## How it works

1. **It finds the Car Receipts** whose **From Document** is the invoice's **From Document**.
2. **It finds the stock receipts** whose **From Document** is one of those Car Receipts.
3. **It rewrites the Stock Documents grid** to hold exactly those stock receipts: rows already in the grid are overwritten in order, missing rows are added, and rows left over are removed. Each row takes the stock receipt and its date.

::: warning The grid is replaced, not added to
Whatever was in **Stock Documents** before the save is overwritten. When no stock receipt is found, the grid is emptied. Run the flow only on the invoices that follow this Car Receipt chain, using its book, term or criteria.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Purchase Invoice.
2. The script needs the invoice's **From Document**. Put this in the flow's **Apply When Query**, so the flow is skipped on invoices that have none:

   ```sql
   select case when {fromDoc.id} is null then 0 else 1 end
   ```

3. In the **Details** grid, add a line with the action **Pre Update Calculated Fields**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Leave every parameter empty. After saving, Parameter 1 shows the title *Not used - leave empty*.
5. Save the flow. **Class Name** now shows `com.namasoft.modules.srvcenter.domain.utils.EACollectStockReceiptsByFromDoc`.

## Example

A Car Purchase Invoice has one Car Receipt made from it, and two stock receipts were made from that Car Receipt. A purchase invoice is then created with the Car Purchase Invoice as its **From Document**. When it is saved, its **Stock Documents** grid holds the two stock receipts, each with its own date. A purchase invoice with no **From Document** is skipped by the **Apply When Query** and keeps its grid as it was.

## The script

<<< @/public/groovy-examples/EACollectStockReceiptsByFromDoc.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EACollectStockDocsIfEmpty](/entity-flows/supplychain/EACollectStockDocsIfEmpty): the built-in element that fills the grid for invoices with their own stock effect.
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows): the **Apply When Query** and the save actions.

</div>
