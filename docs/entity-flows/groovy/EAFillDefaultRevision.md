---
title: Fill the Item's Default Revision on Document Lines
module: supplychain
entities: [EntityFlow, InvItem]
groovy: recommended
description: A Groovy script that gives every document line with an empty revision the item's default revision, or its first revision when none is marked as default.
---

<div class='entity-flows'>

# Fill the Item's Default Revision on Document Lines

This Groovy script fills the revision on document lines that were left without one. Each such line gets the revision marked as default on its item, or the item's first revision when none is marked.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EAFillDefaultRevision` |
| **Script** | [EAFillDefaultRevision.groovy](/groovy-examples/EAFillDefaultRevision.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Once an item has **Has Revisions** switched on, every stock line for it carries a revision, so the old and the new version of a product are counted apart. Most of the time users deal with the current version only, and choosing it on every line is extra work that is easy to forget. Lines that come in through import, or from screens where the revision column is hidden, arrive empty.

With this script on the flow, mark the current version as **Default** in the item's **Revisions** grid, and any line left without a revision gets it on save. A user who needs an older revision simply picks it, and the script leaves that line alone.

## How it works

For every line that has an item:

1. If the line already has a revision, it is left as it is.
2. If the item does not have **Has Revisions** switched on, the line is skipped.
3. Otherwise the line gets the revision whose **Default** box is ticked in the item's **Revisions** grid. When no revision is ticked, it gets the first revision in the grid.

An item with revisions always has at least one row in its Revisions grid, so a line of such an item always ends up with a revision. The script never refuses the save. It also runs when a document is saved as a draft.

## Setting it up

1. On each item with revisions (**Inventory → Master Files → Item**), tick **Default** on the revision that should be used when none is chosen.
2. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover (for example **Stock Issue**).
3. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
4. Leave all parameters empty, and save the flow.

## Example

Item `PUMP-200` has two revisions, `R1` and `R2`, and `R2` is ticked as **Default**. A stock issue is saved with a `PUMP-200` line whose revision is empty: the line is saved with revision `R2`. A second line where the user chose `R1` keeps `R1`.

## The script

<<< @/public/groovy-examples/EAFillDefaultRevision.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Revisions): what revisions are.
- [EACopyRevisionFromFromDoc](/entity-flows/supplychain/EACopyRevisionFromFromDoc): a built-in flow that takes the revision from the source document instead.

</div>
