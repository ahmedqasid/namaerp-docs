---
title: Number Lot-Tracked Lines by Item Section and Year
module: supplychain
entities: [EntityFlow, ItemSection]
groovy: recommended
description: A Groovy script that gives every lot-tracked document line a running number such as QC-26-RAW00001 in Text 1, counted separately for each item section and year.
---

<div class='entity-flows'>

# Number Lot-Tracked Lines by Item Section and Year

This Groovy script writes a running number into **Text 1** of every document line whose item is lot tracked. The number is built from a fixed prefix, the year of the document, the item's section and a five-digit serial, for example `QC-26-RAW00001`.

::: tip Recommended pattern
This script is not tied to any customer's setup. It works as it is; its only parameter is the prefix.
:::

| | |
|---|---|
| **Class name** | `EAAutoLotIdFromItemSectionAndYear` |
| **Script** | [EAAutoLotIdFromItemSectionAndYear.groovy](/groovy-examples/EAAutoLotIdFromItemSectionAndYear.groovy) |
| **Runs on** | Any supply chain document with lines, such as a stock receipt or a stock issue. Target action **Pre Update Calculated Fields**. |
| **Uses** | Parameter 2 (optional). Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A quality team often wants a reference on every incoming batch that tells at a glance which section the material belongs to and in which year it arrived: `QC-26-RAW00017` is the 17th raw-material batch of 2026. Typing these numbers by hand leads to gaps and duplicates. This script hands them out on save and keeps a separate count for each section and each year.

The number goes into **Text 1** of the line, not into the **Lot ID** itself. That leaves the lot free for the supplier's own batch number, while Text 1 carries your internal reference.

## How it works

1. **It picks the lines.** A line is numbered only when it has an item, the item has **Has Lot** switched on, and the line's **Text 1** is still empty. A line that already has a Text 1 keeps it, so saving the document again never renumbers it.
2. **It builds the prefix.** The prefix is the text in Parameter 2 (or `QC-` when Parameter 2 is empty), then the last two digits of the document's value date year, a hyphen, and the code of the item's **Item Section**. A line whose item has no item section is skipped.
3. **It finds the next serial.** It looks at Text 1 of all saved lines of the same kind of document (all stock receipt lines, for example) that start with the same prefix, and takes the highest five-digit serial among them. The line gets the next one. Lines on the same document that share a prefix get consecutive numbers.
4. **It stops at 99999.** If the next serial for a prefix would pass 99999, the line is left without a number and the save is refused with the message below.

The script refuses to run twice at the same time. If two users save at the same moment, the second save is refused and can simply be repeated. This keeps two documents from taking the same number.

::: info Each document type counts on its own
The count is kept per kind of document line. A stock receipt and a stock issue can both have a line numbered `QC-26-RAW00001`.
:::

## Setting it up

1. Make sure every lot-tracked item has an **Item Section** (**Inventory → Master Files → Item Section**). Its code becomes part of the number, so keep section codes short.
2. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to number (for example **Stock Receipt**).
3. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
4. Fill in the parameters and save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Static prefix, defaults to QC- when left empty | The fixed start of every number, for example `QC-` or `LAB/`. |

## Example

The item section `RAW` holds raw materials, and Parameter 2 is empty. A stock receipt dated in 2026 has two lot-tracked raw-material lines and one line for an item without lots. When it is saved:

- the first line gets Text 1 `QC-26-RAW00001`,
- the second line gets `QC-26-RAW00002`,
- the third line is left alone.

The next stock receipt of 2026 continues with `QC-26-RAW00003`. In January 2027 the count restarts at `QC-27-RAW00001`.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *The serial of {0} reached its maximum {1}* | The prefix `{0}` has already used every serial up to `{1}` (99999). This message has no Arabic translation, so it appears in English on Arabic screens. | Change the prefix in Parameter 2 so a new count starts. |
| *You can not run the entity action class {0} multiple times* — «لا يمكنك تنفيذ الإجراء {0} أكثر من مرة في نفس الوقت» | Another save was running the script at the same moment. `{0}` is the script's class name. | Save again. |

## The script

<<< @/public/groovy-examples/EAAutoLotIdFromItemSectionAndYear.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows): what each target action means.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#BatchLot-Numbers): lot tracking on the item.

</div>
