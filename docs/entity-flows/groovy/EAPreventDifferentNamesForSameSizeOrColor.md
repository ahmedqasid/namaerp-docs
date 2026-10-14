---
title: Validate an Item's Sizes and Colors Grid
module: supplychain
entities: [EntityFlow, InvItem]
groovy: recommended
description: Two Groovy validations for the item's Sizes and Colors grid. One refuses a size or color code used with two different names; the other refuses two default lines for the same size and color.
---

<div class='entity-flows'>

# Validate an Item's Sizes and Colors Grid

These two Groovy scripts check the **Sizes and Colors** grid of an **Item** when it is saved. The first refuses a size or color code that appears with two different names. The second refuses two lines marked **Default** for the same size and color.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You can paste them as they are; they take no parameters.
:::

| | |
|---|---|
| **Class names** | `EAPreventDifferentNamesForSameSizeOrColor` (names) and `EAPreventDuplicateDefaultSizeAndColor` (defaults) |
| **Scripts** | [EAPreventDifferentNamesForSameSizeOrColor.groovy](/groovy-examples/EAPreventDifferentNamesForSameSizeOrColor.groovy), [EAPreventDuplicateDefaultSizeAndColor.groovy](/groovy-examples/EAPreventDuplicateDefaultSizeAndColor.groovy) |
| **Runs on** | Item, on the **Validate On Save** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A clothing item can carry dozens of lines in its **Sizes and Colors** grid, one per barcode: size S in red, size S in blue, size M in red, and so on. Each line repeats the size's code and name and the color's code and name. With that much repetition, typing mistakes are common, and the system accepts them:

- Size `S` is called *Small* on one line and *Short* on another, so anything that shows the size name disagrees with itself.
- Two lines for size `S` in `RED` are both ticked **Default**, so there is no single default barcode for that combination.

These validations catch both mistakes at the moment the item is saved, and name the lines involved.

## How it works

**Names script.** It goes through the grid and remembers the first name it meets for each size code under **Size | Code**, and for each color code under **Color | Code**. When a later line uses the same code with a different name, the save is refused. Lines with no size code, or no color code, are skipped for that check.

**Defaults script.** It goes through the lines ticked **Default** and groups them by size and color. When a second default line appears for the same pair, the save is refused, naming the barcode **Code** of both lines. A line with no size or no color is grouped with the others that lack the same value.

Both scripts report every problem they find, not only the first, and neither changes the item.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Item** and **Target Action** to **Validate On Save**.
3. Add a line to the **Details** grid for each script you need. Paste the whole script into **Groovy Script** and leave **Class Name** empty: it is filled in when you save.
4. Save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

An item is saved with these lines:

| Code | Size code | Size name | Color code | Color name | Default |
|---|---|---|---|---|---|
| SZ1-S-RED | S | Small | RED | Red | ✓ |
| SZ1-S-RED-2 | S | Small | RED | Red | ✓ |
| SZ1-S-BLUE | S | Short | BLUE | Blue | |

The save is refused with two messages:

```
Size S is used with different names: Small and Short
More than one default barcode for size S and color RED: SZ1-S-RED and SZ1-S-RED-2
```

Renaming the third line's size to *Small* and unticking **Default** on the second line lets the item save.

## Messages you may see

Each message appears under the usual heading of a failed flow, *Error while running entity flow {0} for entity {1} - {2}:-* — «خطأ أثناء تشغيل مسار الكيان {0} للسجل {1} - {2}:-». The scripts' own messages have no Arabic translation, so they appear in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *{0} {1} is used with different names: {2} and {3}* | `{0}` is `Size` or `Color`, `{1}` the code, `{2}` the first name met for it and `{3}` the different one. | Give every line with that code the same name. |
| *More than one default barcode for size {0} and color {1}: {2} and {3}* | Two lines for the same size and color are both ticked **Default**. `{2}` and `{3}` are their codes; an empty value shows as `-`. | Untick **Default** on all but one of them. |

## The script

The names script:

<<< @/public/groovy-examples/EAPreventDifferentNamesForSameSizeOrColor.groovy{groovy}

The defaults script:

<<< @/public/groovy-examples/EAPreventDuplicateDefaultSizeAndColor.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Understanding Inventory Items](/modules/supplychain/understanding-items)

</div>
