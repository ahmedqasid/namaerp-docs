---
title: Copy Project Contract Term Codes Into Its Budgets
module: contracting
entities: [EntityFlow, ProjectContract, ContractingEstimatedBudget, ContractingExecutiveBudget]
groovy: recommended
description: A Groovy script that writes each project contract term's code into the Project Term Code of the matching lines of the contract's estimated and executive budgets when the contract is saved.
---

<div class='entity-flows'>

# Copy Project Contract Term Codes Into Its Budgets

This Groovy script links the budget lines of a project to the terms of its contract. When the project contract is saved, every matching line of the contract's estimated budget and executive budget gets the contract term's code in **Project Term Code**.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters.
:::

| | |
|---|---|
| **Class name** | `EAUpdateProjectContractTermCodeInBudgets` |
| **Script** | [EAUpdateProjectContractTermCodeInBudgets.groovy](/groovy-examples/EAUpdateProjectContractTermCodeInBudgets.groovy) |
| **Runs on** | Project Contract, on **Post Commit** (and optionally **Post Delete**) |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A project's estimated and executive budgets list the same work as the project contract, term by term, and each budget line has a **Project Term Code** that says which contract term it belongs to. When the budget is prepared before the contract is final, or when the contract's terms are renumbered, those codes have to be fixed by hand on every budget line.

With this script the contract keeps its budgets in step: each time the contract is saved, the codes are written again from the contract's own terms.

## How it works

1. **It opens the contract's budgets.** It takes the contract's **Contracting Estimated Budget** and **Contracting Executive Budget**. A budget that is not set is skipped.
2. **It matches budget lines to contract terms.**
   - An estimated budget line matches a contract term when its own term code is the same as the contract term's code.
   - An executive budget line matches when its **Estimated Term Code** is the same as the contract term's code. An executive budget line with an empty Estimated Term Code is never matched.
3. **It writes the code.** Each matched budget line gets the contract term's code in **Project Term Code**. Lines that match no term are left as they are.
4. **On delete, it clears the codes.** When the line runs on **Post Delete**, the matched budget lines get an empty Project Term Code instead.

The budgets are changed directly. They are not saved through their own screens, so their own validations and flows do not run.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Project Contract**.
2. Add a line to the **Details** grid with **Target Action** set to **Post Commit**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. To clear the codes when a contract is deleted, add a second line with **Target Action** set to **Post Delete** and paste the same script.
4. Save the flow. **Class Name** shows the script's class name, and the description appears in **Description**.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A contract has eleven terms coded `1` to `11`, and its estimated budget has eleven lines with the same term codes. Before the script, the budget's **Project Term Code** column had been filled in another order: the line for term `2` pointed at contract term `10`, the line for term `3` at `11`, and so on. After the contract is saved with the script, the budget line for term `2` has Project Term Code `2`, the line for term `3` has `3`, and every other line likewise points at the contract term with its own code.

## The script

<<< @/public/groovy-examples/EAUpdateProjectContractTermCodeInBudgets.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Estimated Budgets](/modules/contracting/budgets/contracting-estimated-budget)
- [Executive Budgets](/modules/contracting/budgets/contracting-executive-budget)

</div>
