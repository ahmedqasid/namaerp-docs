---
title: Link Free Item Lines of a Sales Return to the Invoice
module: supplychain
entities: [EntityFlow, SalesReturn]
groovy: recommended
description: A Groovy script that fills the Source Line Id of free item lines on a sales return, so each free line points at the matching free line of the invoice it is returned from.
---

<div class='entity-flows'>

# Link Free Item Lines of a Sales Return to the Invoice

This Groovy script fills the **Source Line Id** of the free item lines on a sales return. Each free line ends up pointing at the matching free line of the sales invoice the return was made from.

::: tip Recommended pattern
This script is not tied to any customer's setup. It takes no parameters, so you can paste it as it is.
:::

| | |
|---|---|
| **Class name** | `EASetSourceLineIDForFreeItemInSalesReturn` |
| **Script** | [EASetSourceLineIDForFreeItemInSalesReturn.groovy](/groovy-examples/EASetSourceLineIDForFreeItemInSalesReturn.groovy) |
| **Runs on** | Sales Return, on **Pre Update Calculated Fields**. It works on any sales document whose **From Document** is another sales document. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

On a sales invoice, a free item hangs under the line it was given with: buy two printers, get one ink cartridge free. When the customer returns the printers and the cartridge, the printer lines of the return point back at the invoice's printer line through their **Source Line Id**. The free cartridge line often does not. It was added under the returned printer line, and nothing told it which invoice line it stands for.

A free line with no source line cannot be traced back to the invoice. Reports that compare returns with invoices miss it, and so does any flow that relies on the link. This script repairs the link on every save.

## How it works

1. **It needs a From Document.** If the return has no **From Document**, or the From Document is not a sales document, the script does nothing.
2. **It looks only at free lines that are not linked yet**: lines with **Free Item** ticked and an empty **Source Line Id**. Every other line is left alone.
3. **It finds the line the free item belongs to** on the return. A free line that does not belong to another line is skipped.
4. **It follows that line to the invoice.** The line's **Source Line Id** points at a line of the From Document.
5. **It picks the free line of the same item that belongs to that invoice line**, and copies its id into the free line's **Source Line Id**. If there is no such line, the free line stays as it was.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Sales Return.
2. In the **Details** grid, add a line with the action **Pre Update Calculated Fields**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Leave every parameter empty. After saving, Parameter 1 shows the title *Not used - leave empty*.
4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.EASetSourceLineIDForFreeItemInSalesReturn`.

## Example

An invoice has two lines: 2 printers, and under them 1 free ink cartridge. A return is made from that invoice with 1 printer linked to the invoice's printer line, and under it 1 free cartridge with an empty **Source Line Id**. When the return is saved, the cartridge line's **Source Line Id** becomes the id of the invoice's cartridge line. A copy of the same return saved without the flow keeps the cartridge line unlinked.

## The script

<<< @/public/groovy-examples/EASetSourceLineIDForFreeItemInSalesReturn.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EAGuessSourceLineByItemIdAndFreeItem](/entity-flows/supplychain/EAGuessSourceLineByItemIdAndFreeItem): the built-in element that guesses source lines by item and free-item flag.
- [Link Sales Return Lines to the Invoices They Came From](/entity-flows/groovy/EACollectInvoicesInReturn): finds the invoice of each return line by query.

</div>
