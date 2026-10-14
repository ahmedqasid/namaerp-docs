---
title: Learn an Item's Default Locator From Stock Movements
module: supplychain
entities: [EntityFlow, StockTransfer, OpeningStockDocument, InvItem]
groovy: recommended
description: Two Groovy scripts that record, on the item, the locator a stock transfer or an opening stock document put it in, so later documents fill that locator by themselves.
---

<div class='entity-flows'>

# Learn an Item's Default Locator From Stock Movements

These two Groovy scripts teach each **Item** where it lives. When a **Stock Transfer** or an **Opening Stock Document** is saved, the locator it put the item in becomes the item's default locator in that warehouse.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You can paste them as they are; they take no parameters.
:::

| | |
|---|---|
| **Class names** | `EALearnDefaultLocatorFromStockTransfer` (stock transfer) and `EALearnDefaultLocatorFromOpeningStock` (opening stock) |
| **Scripts** | [EALearnDefaultLocatorFromStockTransfer.groovy](/groovy-examples/EALearnDefaultLocatorFromStockTransfer.groovy), [EALearnDefaultLocatorFromOpeningStock.groovy](/groovy-examples/EALearnDefaultLocatorFromOpeningStock.groovy) |
| **Runs on** | Stock Transfer or Opening Stock Document, on the **Post Commit** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

In a warehouse whose **Locator Usage** is **Required**, every document line needs a locator. When a line leaves it empty and the warehouse has no default locator of its own, the system looks at the item: the line of the item's **Details** grid for that warehouse that is ticked as the default locator supplies it. Keeping those lines up to date by hand, for thousands of items, is not realistic.

These scripts keep them up to date from the stock movements themselves. Load the opening stock into its shelves, or move an item to a new shelf with a stock transfer, and from then on documents in that warehouse fill that shelf for the item by themselves.

## How it works

For every line of the saved document:

1. **It finds the warehouse and locator** the line put the item in. On a stock transfer that is the line's to warehouse and to locator. On an opening stock document it is the line's warehouse and locator.
2. **It finds the item's line for that warehouse** in the item's **Details** grid.
   - If that line already has the same locator, nothing is done for this document line.
   - If it has another locator, the line is updated.
   - If the item has no line for that warehouse, one is added.
3. **It sets the line** to the warehouse and the locator, and ticks it as the default locator. The stock transfer script also ticks **Desirable**.
4. **It saves the item.** The item goes through its normal save, so its own validations apply.

The scripts run on **Post Commit**, after the document itself is saved.

::: warning Use it where every line has a locator
The scripts copy the line's locator as it is. A line without a locator would leave the item's line for that warehouse with an empty locator. In a warehouse whose **Locator Usage** is **Required**, every line has one, so attach the flow to documents in such warehouses.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Stock Transfer** (or **Opening Stock Document**) and **Target Action** to **Post Commit**.
3. In the **Details** grid, paste the matching script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Save the flow. For both document types, create one flow for each, each with its own script.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A new item is loaded with an opening stock document into warehouse `WH1`, locator `L1`. After the document is saved, the item's **Details** grid has a new line:

| Warehouse | Locator | Default locator | Desirable |
|---|---|---|---|
| WH1 | L1 | ✓ | |

Later, a stock transfer moves part of the stock within `WH1` from `L1` to `L2`. After it is saved, the same line reads:

| Warehouse | Locator | Default locator | Desirable |
|---|---|---|---|
| WH1 | L2 | ✓ | ✓ |

## Messages you may see

The scripts raise no messages of their own. If the item cannot be saved, the item's own validation messages are shown.

## The script

The stock transfer script:

<<< @/public/groovy-examples/EALearnDefaultLocatorFromStockTransfer.groovy{groovy}

The opening stock script:

<<< @/public/groovy-examples/EALearnDefaultLocatorFromOpeningStock.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [The Document Screen](/modules/supplychain/the-document-screen): how a document line picks its warehouse and locator.
- [Understanding Inventory Items](/modules/supplychain/understanding-items)

</div>
