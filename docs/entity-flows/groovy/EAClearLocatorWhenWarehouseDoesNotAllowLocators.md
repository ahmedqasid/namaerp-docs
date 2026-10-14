---
title: Clear the Locator When the Warehouse Does Not Use Locators
module: supplychain
entities: [EntityFlow, Warehouse]
groovy: recommended
description: A Groovy script that clears the locator of every document line whose warehouse is empty or does not use locators.
---

<div class='entity-flows'>

# Clear the Locator When the Warehouse Does Not Use Locators

This Groovy script removes a locator from every document line whose warehouse does not use locators. It is the smallest of the supply chain examples: one loop, one check, no parameters.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EAClearLocatorWhenWarehouseDoesNotAllowLocators` |
| **Script** | [EAClearLocatorWhenWarehouseDoesNotAllowLocators.groovy](/groovy-examples/EAClearLocatorWhenWarehouseDoesNotAllowLocators.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A company with some warehouses that use locators and some that do not runs into this when a line's warehouse is changed. The user picks a locator in a locator warehouse, then moves the line to a small store where **Locator Usage** is **Prevented**. The old locator stays on the line, even though it belongs to another warehouse and the new one does not use locators at all. The same happens with documents copied or imported from another warehouse.

With this script on the flow the leftover locator is simply dropped when the document is saved.

## How it works

For every line that has a locator, the script looks at the line's warehouse and clears the locator when:

- the line has no warehouse, or
- the warehouse's **Locator Usage** is empty, or
- the warehouse's **Locator Usage** is **Prevented**.

Lines in a warehouse whose Locator Usage is **Required** or **Optional** keep their locator. The script never refuses the save.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover (for example **Stock Issue**).
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.

## Example

Warehouse `01` has **Locator Usage** set to **Prevented**. A stock issue line is moved to warehouse `01` but still shows the locator `A-01-03` from the warehouse it was copied from. On save, the locator is cleared, and the issue is saved without one.

## The script

<<< @/public/groovy-examples/EAClearLocatorWhenWarehouseDoesNotAllowLocators.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Warehouses & Locators](/modules/supplychain/warehouses-and-locators#Locator-Policy-Required-or-Prevented): what the warehouse's locator setting does.
- [Set a Default Locator on Lines Without One](/entity-flows/groovy/EASetDefaultLocatorIfEmpty): the opposite case, filling an empty locator.

</div>
