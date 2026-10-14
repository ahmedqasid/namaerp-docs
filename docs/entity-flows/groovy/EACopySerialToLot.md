---
title: Move a Serial Number Typed by Mistake Into the Lot
module: supplychain
entities: [EntityFlow]
groovy: recommended
description: A Groovy script that, for items tracked by lot but not by serial, moves a number typed in the Serial Number column into the empty Lot ID.
---

<div class='entity-flows'>

# Move a Serial Number Typed by Mistake Into the Lot

This Groovy script fixes a common data-entry slip on document lines: a batch number typed in the **Serial Number** column of an item that is tracked by lot, not by serial. The script moves the number into **Lot ID** and clears the serial number.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EACopySerialToLot` |
| **Script** | [EACopySerialToLot.groovy](/groovy-examples/EACopySerialToLot.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Scanners, imports and users in a hurry often put the batch number in the wrong column. When the document holds both serial-tracked and lot-tracked items, the two columns sit side by side and the mistake is easy to make. The save is then refused because the item does not use serial numbers, and the lot it needs is missing.

With this script on the flow, the number is moved to where it belongs before the system checks the line.

## How it works

The script changes a line only when all of these are true:

- the line has an item,
- the item has **Has Lot** switched on and **Has Serial** switched off,
- the line's **Lot ID** is empty,
- the line's **Serial Number** is not empty.

On such a line, the serial number becomes the **Lot ID**, and **Serial Number** is cleared. Every other line is left untouched; in particular, a line that already has a lot keeps both its lot and its serial number as they were. The script never refuses the save. It also runs when a document is saved as a draft.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover (for example **Stock Issue**).
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.

## Example

Item `MED-500` is tracked by lot only. A stock issue line for it has **Serial Number** `B2026-0042` and no lot. After saving, the line shows **Lot ID** `B2026-0042` and an empty serial number.

## The script

<<< @/public/groovy-examples/EACopySerialToLot.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Tracking-Special-Attributes): serial and lot tracking on the item.
- [Clear Lots That Were Never Received, and Unused Dimensions](/entity-flows/groovy/EAClearLotIdsWithNoItemDimensionsQty): a broader clean-up of line dimensions.

</div>
