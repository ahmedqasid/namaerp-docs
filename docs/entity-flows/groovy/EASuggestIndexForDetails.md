---
title: Generate the Missing-Index Query for Detail Tables
module: core
entities: [EntityFlow, TaskSchedule]
groovy: recommended
description: A Groovy task schedule that writes into its own Parameter 2 an SQL query listing the large detail tables with no index on their header column, with a CREATE INDEX statement for each.
---

<div class='entity-flows'>

# Generate the Missing-Index Query for Detail Tables

This Groovy script is a task schedule that writes an SQL query into its own Parameter 2. The query lists the detail tables whose link to their header has no index, largest first, with a ready `CREATE INDEX` statement for each one.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no inputs: paste it, save, and run it.
:::

| | |
|---|---|
| **Class name** | `EASuggestIndexForDetails` |
| **Script** | [EASuggestIndexForDetails.groovy](/groovy-examples/EASuggestIndexForDetails.groovy) |
| **Runs on** | A task schedule only. |
| **Uses** | Parameter 2, which the run fills in. Parameter 1 holds the script. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

[Suggest Indexes for Large Detail Tables](/admin/reprocessing/suggest-index-creation) explains why a big detail table with no index on its header column slows down every document that loads its lines. That page gives a ready query with a fixed list of tables and columns.

This script builds the same kind of query from the installation itself. It reads the data model of the version that is running, collects every detail table and the column that links it to its header, and writes the query with exactly that list. Tables added by a newer version or by a module the fixed list does not cover are included automatically. On the demo database the list held about 2,800 table and column pairs.

The script **creates nothing**. It only prepares the query. You read the result and decide which indexes to create.

## How it works

1. **It reads the data model.** It takes every entity that has detail lines, except the tables that belong only to the POS register's own database.
2. **It writes the query into Parameter 2** of the task itself, replacing whatever was there.
3. **The query** compares that list with the indexes in the database. It returns up to 100 rows, largest tables first, with four columns: `table_name`, `column_name`, `row_count` and `create_index_sql`.

## Setting it up as a task schedule

1. Open **Basic → Settings → Task Schedule** and create a new task of type **Action**.
2. In **Class Name** enter `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`.
3. Paste the whole script from the file above into **Parameter 1**. Leave Parameter 2 empty.
4. Save. **Action description** shows the script's description. Parameter 1's title shows the script's class name and Parameter 2's title becomes *Generated Query For Index Suggestion (filled in by each run)*.
5. Click [Run Now](/platform/automation-and-rules/scheduled-tasks#Running-a-Task-on-Demand). When it finishes, Parameter 2 holds the query.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | The script's class name | The whole script. |
| Parameter 2 | Generated Query For Index Suggestion (filled in by each run) | Nothing. Each run overwrites it. |

The task does not need a schedule. If you only want to run it by hand, tick **Inactive**: **Run Now** still works on an inactive task, and nothing runs at night.

## Using the result

1. Copy the whole of Parameter 2.
2. Run it on the customer's database in SQL Server Management Studio. It is a single `SELECT`: it reads the system catalogue and changes nothing.
3. Read the `row_count` column. Follow the threshold advice on [Suggest Indexes for Large Detail Tables](/admin/reprocessing/suggest-index-creation): create an index only where the table is genuinely large.
4. Copy the `create_index_sql` of those rows and run them in a quiet period. Creating an index on a big table takes time and load.

::: warning The query itself is slow
The list of tables is long, so the query takes minutes, not seconds. On the demo database it took about four minutes. Run it from SQL Server Management Studio, not from a screen in the system, where it would time out.
:::

## Example

The first rows on the demo database looked like this:

| table_name | column_name | row_count | create_index_sql |
|---|---|---|---|
| LedgerTransLine | ledgerTrans_id | 32371 | `CREATE NONCLUSTERED INDEX IX_LedgerTransLine_ledgerTrans_id ON dbo.LedgerTransLine(ledgerTrans_id);` |
| QtyTransLine | qtyTrans_id | 11467 | `CREATE NONCLUSTERED INDEX IX_QtyTransLine_qtyTrans_id ON dbo.QtyTransLine(qtyTrans_id);` |
| SalesInvoiceLine | salesInvoice_id | 9001 | `CREATE NONCLUSTERED INDEX IX_SalesInvoiceLine_salesInvoice_id ON dbo.SalesInvoiceLine(salesInvoice_id);` |

Tables this small do not need an index yet. On a customer database with millions of lines, the same rows are the ones worth indexing.

## Messages you may see

The script has one message of its own. It has no Arabic translation, so it appears in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *Can be only used with task schedule* | The script was put on an entity flow, not on a task schedule. | Remove it from the flow and set it up as a task schedule as described above. |

## The script

<<< @/public/groovy-examples/EASuggestIndexForDetails.groovy{groovy}

## Related

- [Suggest Indexes for Large Detail Tables](/admin/reprocessing/suggest-index-creation): why these indexes matter and when to create them.
- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks)

</div>
