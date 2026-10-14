---
title: Drop Salary Documents of Another Period From a Salary Sheet
module: hr
entities: [EntityFlow, SalarySheet]
groovy: recommended
description: A Groovy script that removes from a Salary Sheet every line whose salary document belongs to a different fiscal period than the sheet.
---

<div class='entity-flows'>

# Drop Salary Documents of Another Period From a Salary Sheet

This Groovy script keeps a **Salary Sheet** to its own period. When the sheet is saved, every line whose salary document belongs to a different fiscal period than the sheet is removed.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters.
:::

| | |
|---|---|
| **Class name** | `EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod` |
| **Script** | [EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod.groovy](/groovy-examples/EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod.groovy) |
| **Runs on** | Salary Sheet, on the **Pre Update Calculated Fields** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Each line of the **Salary Sheet Lines** grid points at an employee's **Salary Document**, and the sheet's totals add those documents up. A June sheet should only ever add up June payslips. In practice a line can end up pointing at a payslip from another month, for example when lines are copied from an older sheet or imported from a spreadsheet. The sheet's totals are then wrong, and the mistake is easy to miss in a grid of a few hundred employees.

This script removes such lines whenever the sheet is saved, so the totals always cover the sheet's own period.

## How it works

1. When the Salary Sheet is saved, the script looks at every line of the **Salary Sheet Lines** grid.
2. A line whose salary document has a different **Fiscal Period** from the sheet's is removed.
3. Lines with no salary document yet are kept, so a freshly collected sheet is not emptied before its documents are generated.

The script runs on **Pre Update Calculated Fields**, before the sheet recalculates its totals, so the saved totals already leave the removed lines out. See [Salary Documents](/modules/hr/payroll/salary-documents) for how the sheet and its documents work together.

::: warning Fill the Fiscal Period first
The script compares each line with the sheet's **Fiscal Period**. The screen fills it from the document date, so this only matters when sheets are created by import: an imported sheet without a fiscal period loses every line that has a salary document, and the save is refused because the grid is empty.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Salary Sheet** and **Target Action** to **Pre Update Calculated Fields**.
3. In the **Details** grid, paste the whole script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A June 2026 salary sheet is saved with two lines:

| Employee | Salary Document | Its fiscal period |
|---|---|---|
| E0003 | the employee's June payslip | June 2026 |
| E0005 | the employee's May payslip | May 2026 |

After saving, only the E0003 line is left, and the sheet's **Net Salary** equals that line's net salary.

## Messages you may see

The script raises no messages of its own. These are messages you may meet around it.

| Message | Why | What to do |
|---|---|---|
| *Field {0} is required, can not be empty* — «لا يمكن ترك {0} فارغا» | Every line was removed, so the **Salary Sheet Lines** grid is empty. Usually the sheet's fiscal period was empty, or every line pointed at another period. | Fill the **Fiscal Period**, or collect the employees again for the sheet's period. |

## The script

<<< @/public/groovy-examples/EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Salary Documents](/modules/hr/payroll/salary-documents)

</div>
