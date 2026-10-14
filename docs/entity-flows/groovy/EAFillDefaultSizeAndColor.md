---
title: Fill the Default Size and Color When a Committed Document Is Edited
module: supplychain
entities: [EntityFlow, InvItem]
groovy: customer-specific
description: A Groovy script that, when an already committed document is saved again, puts the item's default size and color on lines whose size or color is empty or wrong, and clears them for items without sizes or colors.
---

<div class='entity-flows'>

# Fill the Default Size and Color When a Committed Document Is Edited

This Groovy script repairs the size and color on the lines of a document that has already been committed once. When such a document is saved again, a line whose size or color is empty, or is not one the item has, gets the item's default; an item that does not use sizes or colors has them cleared.

::: warning Customer-specific example
This script was written for one customer's workflow and has one built-in rule you cannot change through parameters: **it does nothing on a document's first save.** It acts only when a document that has been committed before is saved again. Adapt the script if you need it on new documents too.
:::

| | |
|---|---|
| **Class name** | `EAFillDefaultSizeAndColor` |
| **Script** | [EAFillDefaultSizeAndColor.groovy](/groovy-examples/EAFillDefaultSizeAndColor.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Suppose a business changes its items' size and color grids after documents have already been committed: some sizes are renamed, and some items stop using colors altogether. Opening one of those documents and saving it again then trips over values the items no longer have. With this script, re-saving such a document brings each line back in line with its item.

## How it works

If the document has never been committed, the script stops at once. Otherwise, for each line with an item:

- **Size.** When the item has **Has Size** on and the line's size is empty or is not one of the item's sizes, the line takes the size of the first row in the item's **Sizes and Colors** grid that has **Default** ticked and a size filled in. When the item has **Has Size** off, the line's size is cleared.
- **Color.** The same rule, using **Has Colors** and the first **Default** row that has a color.

A line whose size or color is valid for the item keeps it. If no row of the item is ticked as **Default**, a wrong size or color is left as it is. The script never refuses the save.

## Setting it up

1. On each item with sizes or colors (**Inventory → Master Files → Item**), tick **Default** on the row of the **Sizes and Colors** grid that should be used.
2. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover.
3. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
4. Leave all parameters empty, and save the flow.

## Example

Item `TSHIRT-01` has the rows `S / RED` and `M / BLUE` in its Sizes and Colors grid, and `M / BLUE` is ticked as **Default**. A committed document has a `TSHIRT-01` line with size `XL` and no color. When the document is saved again, the line becomes size `M` and color `BLUE`. A line for an item without sizes or colors ends up with both cleared.

The same `TSHIRT-01` line on a brand-new document is saved exactly as typed.

## The script

<<< @/public/groovy-examples/EAFillDefaultSizeAndColor.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Colors-Sizes-and-Variants): sizes and colors on the item.
- [EAGenAndItemSizesAndColorsAndRevisions](/entity-flows/supplychain/EAGenAndItemSizesAndColorsAndRevisions): a built-in flow that takes the other route and adds a document's missing sizes and colors to the item.

</div>
