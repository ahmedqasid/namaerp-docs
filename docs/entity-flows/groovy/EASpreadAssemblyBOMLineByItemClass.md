---
title: Spread an Assembly BOM Line Into One Line per Item of a Class
module: supplychain
entities: [EntityFlow, AssemblyBOM, ItemClass4]
menu: Inventory → Assembly Documents → Assembly BOM
groovy: customer-specific
description: A Groovy script that replaces an Assembly BOM line pointing at an Item Class 4 record with one line for every committed item of that class.
---

<div class='entity-flows'>

# Spread an Assembly BOM Line Into One Line per Item of a Class

This Groovy script lets you write an **Assembly BOM** line for a whole group of items at once. Leave the line's item empty and point its **Reference 1** at an **Item Class 4** record: on save, the line is replaced by one line for every committed item of that class, each a copy of the original line.

::: warning Customer-specific example
The class is fixed in the script: it only reacts to **Item Class 4** in **Reference 1**. To use another classification, or another reference field, change the script before you paste it.
:::

| | |
|---|---|
| **Class name** | `EASpreadAssemblyBOMLineByItemClass` |
| **Script** | [EASpreadAssemblyBOMLineByItemClass.groovy](/groovy-examples/EASpreadAssemblyBOMLineByItemClass.groovy) |
| **Runs on** | Assembly BOM. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some recipes call for "one of each" from a family of items: a sample kit that holds every flavour in the range, or a display pack with one unit of every colour of a product. Listing each item by hand is slow, and the BOM falls behind every time a new item joins the family. With this script you group the family under one **Item Class 4** record and write a single line for it.

## How it works

1. **It finds the class lines.** A line is spread when its **Item/Component** is empty and its **Reference 1** is an Item Class 4 record. Lines that have an item are never touched.
2. **It lists the items.** It finds every committed item whose **Class 4** is that record.
3. **It replaces the line.** The original line is removed, and one copy per item takes its place. Each copy keeps everything from the original line, including the quantities and Reference 1, and gets the item, the component and the item's base unit as its unit.

The new lines appear where the original line was, in **descending** item code order: items `ITEM-A`, `ITEM-B` and `ITEM-C` come out as `ITEM-C`, `ITEM-B`, `ITEM-A`.

Because every new line has an item, saving the BOM again does not spread it a second time. Items added to the class later are not picked up by themselves: to bring them in, add a new class line and save.

If the class has no committed items, the class line is simply removed.

## Setting it up

1. Group the items under one record of **Inventory → Master Files → Item class 4**, and set it as **Class 4** on each item.
2. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is **Assembly BOM**.
3. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
4. Leave all parameters empty, and save the flow.
5. On the Assembly BOM, add a line with no item, set **Reference 1** to the class record, fill in the quantities, and save.

## Example

Item Class 4 `KIT-FLAVOURS` holds the committed items `FLV-01`, `FLV-02` and `FLV-03`. A BOM has two lines: the class line with a default quantity of 4, and a normal line for the box `BOX-10`. After saving, the BOM has four lines:

| Line | Item | Default Quantity |
|---|---|---|
| 1 | `FLV-03` | 4 |
| 2 | `FLV-02` | 4 |
| 3 | `FLV-01` | 4 |
| 4 | `BOX-10` | as before |

## The script

<<< @/public/groovy-examples/EASpreadAssemblyBOMLineByItemClass.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Assembly BOMs, Components & Packaging Methods](/modules/supplychain/assembly-and-packaging/assembly-boms-and-components): the Assembly BOM screen.
- [Item Classification Files](/modules/supplychain/item-classification-files): the item class files.

</div>
