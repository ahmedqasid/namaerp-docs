---
title: Refuse Serial Numbers That Are Not 15 Characters Long
module: supplychain
entities: [EntityFlow]
groovy: customer-specific
description: A Groovy validation that refuses to save a document when any serial number on its lines is not exactly 15 characters long, marking each wrong serial on its line.
---

<div class='entity-flows'>

# Refuse Serial Numbers That Are Not 15 Characters Long

This Groovy script is a save validation for serial numbers. If any serial number on the document's lines is not exactly 15 characters long, the save is refused, and every wrong serial is reported on its own line.

::: warning Customer-specific example
The length **15** is written into the script (twice: in the check and in the message). It suits devices whose serial is a 15-digit IMEI. For another length, change both places in the script before you paste it.
:::

| | |
|---|---|
| **Class name** | `EASerialNumberLen` |
| **Script** | [EASerialNumberLen.groovy](/groovy-examples/EASerialNumberLen.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Validate On Save**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Mobile phones are sold by IMEI, which is always 15 digits. A digit dropped or added while typing creates a serial that will never match the device again, and the mistake only surfaces later, when the phone comes back for service. Refusing it at the moment of entry is much cheaper.

## How it works

1. **It reads every line's serial numbers.** A line can hold several serials separated by commas, or a range; the script expands them into single serials first.
2. **It checks each one.** Every serial whose length is not 15 produces a refusal on the **Serial Number** cell of its line. All wrong serials are reported together, so the user sees every problem in one go.
3. **The message stands alone.** The refusal is shown without the entity flow's name in front of it, so the user reads only the reason.

Lines without a serial number are not checked.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to check (for example **Sales Invoice** or **Stock Receipt**).
2. In the **Details** grid, add a line with **Target Action** set to **Validate On Save**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.

## Example

A line holds the serials `SN12345678901,123456789012345`. The second one is 15 characters long, the first one 13. The save is refused with:

*Serial number SN12345678901 length is 13, it must be 15*

After the user corrects the first serial, the document saves.

## Messages you may see

This message has no Arabic translation, so it appears in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *Serial number {0} length is {1}, it must be 15* | The serial `{0}` on this line has `{1}` characters instead of 15. | Correct the serial. If the length rule is wrong for this business, adapt the script. |

## The script

<<< @/public/groovy-examples/EASerialNumberLen.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [EAUnZipSerialsInLines](/entity-flows/supplychain/EAUnZipSerialsInLines): a built-in flow that splits a line with several serials into one line per serial.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Serial-Numbers): serial tracking on the item.

</div>
