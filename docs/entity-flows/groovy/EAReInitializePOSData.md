---
title: Send All POS Master Data to the Registers Again
module: namapos
entities: [EntityFlow, TaskSchedule, POSReadQueue]
groovy: recommended
description: A Groovy task that queues every record of the 72 master-data types POS registers download, so every register receives all of it again on its next syncs. Heavy on a large database.
---

<div class='entity-flows'>

# Send All POS Master Data to the Registers Again

This Groovy script puts every record a POS register downloads back on the POS read queue: items, customers, price lists, offers, registers, users, payment methods, POS settings and the rest, 72 types in all. Every register then reads all of it again.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters.
:::

::: danger Heavy: plan the run
On a large database this queues hundreds of thousands of entries. Writing them takes a long time, and every register then spends its next syncs downloading all of it, which slows the registers and the server down. Run it out of shop hours, and only when the narrower tools below do not solve the problem.
:::

| | |
|---|---|
| **Class name** | `EAReInitializePOSData` |
| **Script** | [EAReInitializePOSData.groovy](/groovy-examples/EAReInitializePOSData.groovy) |
| **Runs on** | A task schedule. |
| **Uses** | No parameters. Parameter 1 holds the script. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

The registers learn about changes from the [POS read queue](/modules/pos/erp-setup/pos-items-and-sync-settings#Watching-what-goes-down-the-read-queue). Every change the server makes to something registers need is placed on that queue, and the registers read it. The server fills the queue with everything only once, the first time it starts with an empty queue.

So a change that never went through the queue never reaches the registers. That happens when data was changed directly in the database, when part of the server's data was restored from a backup, or when registers were attached to a database that already had data. The registers then show old prices, miss items or customers, or keep records that were removed.

For a few records, the right tool is **More → Advance** on the POS read queue: select the entries and the registers read them again. When the damage is wide and nobody knows which records are affected, this script queues everything.

## How it works

1. **It goes through each of the 72 types** in turn, a page of records at a time, each page in its own transaction.
2. **It queues every committed record.** A record the registers should have is queued as **UPDATED**. A record that should not go to the registers, for example an item marked not to move to POS, is queued as **DELETED**, so the registers drop it.
3. **Drafts are skipped.**
4. **The registers read the new entries** on their next syncs, in the order of the queue and of any **POS Read Queue Priority Configuration**.

The script returns as soon as the entries are written. The registers' downloads continue long after that.

## Setting it up as a task schedule

1. Open **Basic → Settings → Task Schedule** and create a new task of type **Action**.
2. In **Class Name** enter `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`.
3. Paste the whole script from the file above into **Parameter 1**.
4. Tick **Inactive**, so the task never runs on a schedule. **Run Now** still works on an inactive task.
5. Save, then click [Run Now](/platform/automation-and-rules/scheduled-tasks#Running-a-Task-on-Demand) at the planned time.

## The script

<<< @/public/groovy-examples/EAReInitializePOSData.groovy{groovy}

## Related

- [What a Register Receives: Items, Barcodes & Sync Settings](/modules/pos/erp-setup/pos-items-and-sync-settings): the POS read queue, **Advance** and the priority configuration.
- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks)

</div>
