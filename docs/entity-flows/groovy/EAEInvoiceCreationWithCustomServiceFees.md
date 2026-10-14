---
title: Add a Service Fees Line to the Electronic Invoice
module: supplychain
entities: [EntityFlow, SalesInvoice]
groovy: customer-specific
description: A Groovy script that runs when the electronic invoice is built and adds one extra line for the sales document's Service Fees 1, as a fixed item with tax 1 at 15%, without changing the document.
---

<div class='entity-flows'>

# Add a Service Fees Line to the Electronic Invoice

This Groovy script changes what is sent to the tax authority, not the document. When the electronic invoice of a sales document is being built and the document has **Service Fees 1**, the script adds one more line to the electronic invoice: a chosen service item, quantity 1, priced at the fees.

::: warning Customer-specific example
This script works, but it is hard-wired to one setup:
- The tax on the extra line is fixed at **15%** (`PercentageDF.fromInteger(15)`).
- The tax **value** on the line is taken from **Service Fees 2**, so that field must hold the tax on the fees.
- Only **Service Fees 1** is turned into a line. Fees 3 and 4 are ignored.

Change these in the script if your setup is different.
:::

| | |
|---|---|
| **Class name** | `EAEInvoiceCreationWithCustomServiceFees` |
| **Script** | [EAEInvoiceCreationWithCustomServiceFees.groovy](/groovy-examples/EAEInvoiceCreationWithCustomServiceFees.groovy) |
| **Runs on** | Sales documents that are sent to the tax authority, on **EInvoice Creation** |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some businesses charge a service fee on the invoice header, for example a delivery or handling fee, and enter it in **Service Fees 1**. The tax authority, however, may need to see that fee as an item line of its own, with its own tax, rather than as a charge on the whole document.

This script adds that line at the last moment, while the electronic invoice is being built, so the sales document keeps its fee in the header and the tax authority receives a line for it.

::: warning Check the e-invoice configuration first
The e-invoice configuration has its own handling for service fees: its **Service Fees And What Is Charged To Customer** grid, and, when that is not used, a document-level charge. See for example [what each line carries](/modules/invoicing/zatca-guide#What-each-line-carries) in the ZATCA guide. Use the script only when that handling does not fit, and check the first electronic invoices it produces, so that the same fee is not sent both as a charge and as a line.
:::

## How it works

1. **It runs while the electronic invoice is built.** The **EInvoice Creation** moment comes after the system has turned the document into an electronic invoice and before it is sent.
2. **It checks for fees.** If **Service Fees 1** is empty or zero, nothing is added.
3. **It adds one line** to the electronic invoice only:
   - the item whose code (or id) is in Parameter 2;
   - quantity 1 of the item's unit;
   - unit price equal to **Service Fees 1**;
   - tax 1 at 15%, with the value of **Service Fees 2**.

The sales document's own lines and totals are not changed, and the extra line is built again from scratch each time the electronic invoice is created.

## Setting it up

1. Create the service item that should represent the fee, and give it whatever the tax authority needs for an item, such as its tax authority code.
2. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Sales Invoice**.
3. Add a line to the **Details** grid with **Target Action** set to **EInvoice Creation**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
4. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Service Fees 1 Item | The code of the service item, for example `SRV-FEES`. It must be an existing item. |

5. Save the flow. **Class Name** shows the script's class name, the description appears in **Description**, and the parameter shows its title.

## Example

A sales invoice has two item lines and, in the header, **Service Fees 1** = 100 and **Service Fees 2** = 15. With Parameter 2 set to `SRV-FEES`, the electronic invoice sent for it has three lines: the two item lines, and a line for `SRV-FEES`, quantity 1, unit price 100, tax 1 at 15% with a value of 15. The invoice on screen still shows two lines.

## The script

<<< @/public/groovy-examples/EAEInvoiceCreationWithCustomServiceFees.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Electronic Invoicing in Nama ERP](/modules/invoicing/e-invoices-guide)
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows): the **EInvoice Creation** moment.

</div>
