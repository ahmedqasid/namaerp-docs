---
title: Refuse a Document Whose Quantities Differ From Its From Document
module: supplychain
entities: [EntityFlow, SalesInvoice]
groovy: recommended
description: A Groovy script that refuses to save a supply chain document unless, item by item and unit by unit, its total quantities equal those of its From Document.
---

<div class='entity-flows'>

# Refuse a Document Whose Quantities Differ From Its From Document

This Groovy script refuses to save a supply chain document unless its quantities match its **From Document** exactly. It adds up the quantity of every item, unit by unit, on both documents, and reports each item whose totals differ.

::: tip Recommended pattern
This script is not tied to any customer's setup. It takes no parameters, so you can paste it as it is.
:::

| | |
|---|---|
| **Class name** | `EAQtyMustMatchFromDocPerItem` |
| **Script** | [EAQtyMustMatchFromDocPerItem.groovy](/groovy-examples/EAQtyMustMatchFromDocPerItem.groovy) |
| **Runs on** | Any supply chain document, on **Validate On Save**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some documents must never be partial. An invoice made from a sales order that was agreed as a whole, a delivery that must carry everything that was picked, a transfer that must receive exactly what was sent. The usual checks stop a document from taking *more* than its source; they do not stop it from taking less, or from swapping one item for another.

This script makes the rule strict. The document saves only when every item appears in the same total quantity, in the same unit, as on its **From Document**. The lines do not have to match one to one: 3 units on one line of the source may be 1 and 2 on two lines of the new document.

## How it works

1. **It reads the From Document.** A document with no **From Document** is refused.
2. **It adds up both documents** by item and unit: every line's quantity is added to the total of its item in its unit.
3. **It compares the totals.** An item missing on one side, or present with a different total, is reported. All the differences are reported together, so the user sees the full list in one go.

Because it runs on **Validate On Save**, it checks a document when it is saved for real, not when it is saved as a draft.

::: warning Every document of the target type needs a From Document
The script refuses any document without one. Limit the flow to the documents that must follow the rule, with the book, the term or the flow's **Criteria**, so that documents typed by hand still save.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to the document to check, for example Sales Invoice.
2. In the **Details** grid, add a line with the action **Validate On Save**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Leave every parameter empty. After saving, Parameter 1 shows the title *Not used - leave empty*.
4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAQtyMustMatchFromDocPerItem`.

## Example

A sales order holds 2 printers and 3 scanners. With the flow on Sales Invoice:

- An invoice made from it with 2 printers and 2 scanners is refused for the scanner, with `{0}` the scanner, `{1}` 3 and `{2}` 2 in this message:

  *The item {0} total quantity in from doc is {1} and in current document is {2}*

- An invoice with no **From Document** is refused with *No from doc specified*.
- An invoice with 2 printers, and the scanners split over two lines of 1 and 2, saves.

## Messages you may see

The script's own messages have no Arabic translation, so they appear in English on Arabic screens as well. The system puts its standard heading, *Error while running entity flow {0} for entity {1} - {2}:-* — «خطأ أثناء تشغيل مسار الكيان {0} للسجل {1} - {2}:-», in front of each, naming the flow, the document and the action.

| Message | Why | What to do |
|---|---|---|
| *The item {0} total quantity in from doc is {1} and in current document is {2}* | The item's total in this unit differs between the two documents, or the item appears on only one of them. | Correct the quantities, or add or remove the item, so that the totals match. |
| *No from doc specified* | The document has no **From Document**. | Pick the From Document, or keep this kind of document out of the flow. |

## The script

<<< @/public/groovy-examples/EAQtyMustMatchFromDocPerItem.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EAPreventQtyMoreThan](/entity-flows/supplychain/EAPreventQtyMoreThan): the built-in element that refuses line quantities above a set limit.
- [ValidateSorceLinesOfFromDocAction](/entity-flows/supplychain/ValidateSorceLinesOfFromDocAction): the built-in check that every line has its source line in the From Document.

</div>
