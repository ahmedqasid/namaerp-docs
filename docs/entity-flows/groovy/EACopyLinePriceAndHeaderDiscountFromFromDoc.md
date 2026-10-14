---
title: Keep the Prices of the Document a Sales Document Was Made From
module: supplychain
entities: [EntityFlow, SalesInvoice, SalesOrder]
groovy: recommended
description: Two Groovy scripts that make sales document lines take the price of the line they were made from, and the header discount percentage of the source document, also through a stock issue.
---

<div class='entity-flows'>

# Keep the Prices of the Document a Sales Document Was Made From

These two Groovy scripts make the lines of a sales document take the price of the line they were made from, and make the document take the source document's header discount percentage. The first script follows the line one step back. The second looks for a sales order, and can find it through a stock issue as well.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. They take no parameters, so you can paste them as they are.
:::

| | |
|---|---|
| **Class names** | `EACopyLinePriceAndHeaderDiscountFromFromDoc`, `EACopyLinePriceFromSalesOrderViaStockIssue` |
| **Scripts** | [EACopyLinePriceAndHeaderDiscountFromFromDoc.groovy](/groovy-examples/EACopyLinePriceAndHeaderDiscountFromFromDoc.groovy), [EACopyLinePriceFromSalesOrderViaStockIssue.groovy](/groovy-examples/EACopyLinePriceFromSalesOrderViaStockIssue.groovy) |
| **Runs on** | The first: any sales document. The second: Sales Invoice. Both on **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A sales order is the agreement with the customer: 2 printers at 500 each and a 5% header discount. By the time the invoice is made from it, the price list may have changed, or someone may have typed over a price. The customer expects to be charged what the order said.

The first script enforces that. Every line that was made from another document takes that line's price again on every save, and the document takes the source's header discount percentage.

Some installations do not invoice from the order directly. The goods leave the warehouse on a stock issue made from the order, and the invoice is then made from the stock issue: its lines point at the stock issue's lines, which carry no price agreement of their own. The second script handles that route. It looks past the stock issue to the sales order, and takes the order's price from there.

## How it works

**The first script** (`EACopyLinePriceAndHeaderDiscountFromFromDoc`) looks at every line of the document:

1. **It finds the line's source.** That is the line its **Source Line Id** points at, in the line's **Copied From Doc** or, when that is empty, in the document's **From Document**. A line with no source keeps its price.
2. **The line takes the source line's price block**: the **Unit Price** and the line discounts.
3. **The document takes the source document's header discount percentage.** This happens once for each linked line, so when the lines come from different documents, the document ends with the percentage of the document of its last linked line.

**The second script** (`EACopyLinePriceFromSalesOrderViaStockIssue`) also looks at every line, but it is looking for a sales order:

1. **It follows the line back, step by step, until it reaches a sales order.** If it finds one, the line takes the order line's price block and the invoice takes the order's header discount percentage.
2. **Otherwise it looks in the invoice's Stock Documents grid.** For each stock issue there, it looks for the line the invoice line's **Source Line Id** points at. When that stock issue line leads back to a sales order line, the invoice line takes the order line's price block and its **Number 1**, and the invoice takes the order's header discount percentage.

::: info Number 1 is copied only on the stock issue route
A line that reaches the sales order directly takes the price and the discount, but keeps its own **Number 1**. Only a line found through a stock issue also takes the order line's **Number 1**.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow. For the first script, set **Target Type** to the sales document you want to protect, for example Sales Invoice. For the second, set it to Sales Invoice.
2. In the **Details** grid, add a line with the action **Pre Update Calculated Fields**, so the totals are calculated from the copied prices. Paste the whole script from one of the files above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Leave every parameter empty. After saving, Parameter 1 shows the title *Not used - leave empty*.
4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EACopyLinePriceAndHeaderDiscountFromFromDoc` or `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EACopyLinePriceFromSalesOrderViaStockIssue`.

Use one of the two scripts, not both: they write the same fields.

## Example

A sales order has a 5% header discount and two lines: 2 printers at 500, with **Number 1** set to 7, and 3 scanners at 700.

- **First script.** An invoice is made from the order, with both lines linked to the order lines and their prices typed over as 1, plus a third line that is not linked, at 9. When the invoice is saved, the linked lines go back to 500 and 700, the header discount becomes 5%, and the third line stays at 9. Without the flow, the same invoice keeps the price of 1.
- **Second script.** A stock issue is made from the order for the 2 printers. An invoice with no **From Document** lists that stock issue in **Stock Documents**, and its printer line points at the stock issue line, at a price of 1. When the invoice is saved, the printer line takes the price 500 and **Number 1** 7, and the header discount becomes 5%.

## The scripts

The first script, `EACopyLinePriceAndHeaderDiscountFromFromDoc`:

<<< @/public/groovy-examples/EACopyLinePriceAndHeaderDiscountFromFromDoc.groovy{groovy}

The second script, `EACopyLinePriceFromSalesOrderViaStockIssue`:

<<< @/public/groovy-examples/EACopyLinePriceFromSalesOrderViaStockIssue.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EASCCopyDataFromFromDoc](/entity-flows/supplychain/EASCCopyDataFromFromDoc): the built-in element that copies data from the From Document.
- [EARecalcSalesDocUnitPrices](/entity-flows/supplychain/EARecalcSalesDocUnitPrices): recalculates prices from the price list instead.

</div>
