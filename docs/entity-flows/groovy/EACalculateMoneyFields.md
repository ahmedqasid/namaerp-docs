---
title: Recalculate an Invoice's Totals After a Field Map
module: supplychain
entities: [EntityFlow, SalesInvoice]
groovy: recommended
description: A Groovy flow line that recalculates an invoice's line values, discounts, taxes and totals, for use right after a field map that changes prices on Validate On Save or a later event.
---

<div class='entity-flows'>

# Recalculate an Invoice's Totals After a Field Map

This Groovy script recalculates the money fields of an invoice from its current lines: each line's values, discounts and taxes, and the invoice totals. It is a building block: put it on the line right after a field map that changes prices.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters.
:::

| | |
|---|---|
| **Class name** | `EACalculateMoneyFields` |
| **Script** | [EACalculateMoneyFields.groovy](/groovy-examples/EACalculateMoneyFields.groovy) |
| **Runs on** | Sales and purchase invoices, and the other documents that have invoice lines with prices. Same target action as the field map before it. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

When an invoice is saved, the system calculates its money fields at a fixed point: after the **Pre Update Calculated Fields** event and before **Validate On Save**. A field map on **Pre Update Calculated Fields** that changes a unit price is therefore picked up by that calculation, and the totals are right.

A field map on **Validate On Save** comes too late. Suppose a flow that gives every line of certain invoices a unit price from a special list was put on **Validate On Save**, or on a later event. The unit price changes, but the line value, the taxes and the invoice total keep the numbers of the old price. The invoice is saved with a total that does not match its lines.

Add this script as the next line of the same flow, on the same event, and the invoice is recalculated from the new prices before it is saved.

## How it works

The script runs the same money calculation the save itself uses, over the invoice's current lines: unit price times quantity, the line discounts, the header discount, the taxes, the net value and the invoice total. It also takes the local currency from the legal entity's ledger, and sets the currency rate to 1 when the invoice is in that currency.

## Setting it up

1. Open the flow that holds the field map, on **Administration → Display Customization → Entity Flow**.
2. In the **Details** grid, add a line **after** the field map line, with the **same target action**.
3. Paste the whole script into its **Groovy Script** column and leave **Class Name** empty.
4. Save. **Class Name** now shows the script's class name, and the line's description is filled in.

The lines of a flow run in their order, so the recalculation must come after every line that changes prices or quantities.

## Example

On the demo database two sales invoices were each given a flow on **Validate On Save** with a field map line `details.price.unitPrice="…"`:

| Invoice | Flow lines | Unit price | Line price, net value and invoice total |
|---|---|---|---|
| `SIV50501202600508` | Field map only (`"44000"`) | 44,000 | 45,000, the old price |
| `SIV50501202600509` | Field map (`"16000"`), then this script | 16,000 | 16,000 |

The first invoice was saved with a unit price that does not match its total. The second was recalculated.

## The script

<<< @/public/groovy-examples/EACalculateMoneyFields.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Field Maps in Nama ERP](/entity-flows/core/ai-generated-field-maps-documentation): the field map syntax.
- [EAFieldsValuesCalculator](/entity-flows/core/EAFieldsValuesCalculator)

</div>
