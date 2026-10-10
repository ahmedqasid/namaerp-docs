---
title: EASendMasterDataToAlwatania
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendMasterDataToAlwatania

## Overview

Sends Nama master files to the Alwatania Distributors master data endpoints, using the credentials in an Alwatania config. One schedule with the type `All` sends every type in the order the platform needs them, and every run sends only the records that were never sent or that changed since their last successful send, so a frequent schedule stays cheap. See [Sending Master Data and Invoices to Alwatania](/modules/integrations/alwatania/alwatania-sending-data#Sending-master-data-on-a-schedule).

## When This Action Runs

From a Task Schedule of type **Action**: once with **Run Now** for the first full push, then on a schedule (every night, or every hour) to carry every later change. It ignores the record it runs on, so it refuses to be placed on an entity flow on one of the master files it sweeps; use [EASendMasterDataRecordToAlwatania](EASendMasterDataRecordToAlwatania.md) there. Two runs cannot overlap.

## How It Works

1. **Finds the config** - Looks up the Alwatania Distributors config by the code or ID in parameter 1.
2. **Decides the types** - Parameter 2 names one type, or `All` for every type in this order: Provinces, Cities, Branches, Regions, ClientClasses, Salesmen, Clients, Items, ItemDetails.
3. **Picks the records** - With parameter 3 empty, every record of each type is considered. With a query, only the records it returns are considered; rows are grouped by their entity type and still sent in the order above, whatever order the query returns them in. Rows of an entity type that feeds no Alwatania endpoint are not sent and are reported.
4. **Maps the records** - Legal entities are sent both as provinces and as cities; groups (`MasterGroup`) as branches; analysis sets as regions; Customers' Class 5 as client classes; employees as salesmen; customers as clients; items as items, and again as item details (one row per unit the item may be sold in).
5. **Sends only what is new or changed** - A record is sent only when it was never sent or changed since its last successful send. Records already on the platform are sent as updates where the platform offers one (clients, salesmen, items, item details) and as new records otherwise. Every send is recorded in the Alwatania Master Data Log.
6. **Sends in batches** - Records go out in batches of the config's **Master Data Batch Size** (1000 when empty). Each batch is saved in its own transaction: a failed batch does not undo the ones before it, and the run carries on with the next. An expired access token is refreshed and the batch retried once.

## Parameters

**Parameter 1:** Alwatania Config Code Or ID (Required) - The code (or ID) of the Alwatania Distributors config, for example `ALW01`.

**Parameter 2:** Master Data Type (All, Provinces, Cities, Branches, Regions, ClientClasses, Salesmen, Clients, Items, ItemDetails) (Required) - The type to send, or `All`. Letter case is ignored. The field suggests these values.

**Parameter 3:** Query, eg: select entityType, id from InvItem where sellable = 1 union all select entityType, id from Customer (optional, sends every record when empty) (Optional) - A `select` query returning the entity type and the id, which lets each master file carry its own condition. A table the query leaves out is not sent. The entity types it may return are `LegalEntity`, `MasterGroup`, `AnalysisSet`, `CustomerClass5`, `Employee`, `Customer` and `InvItem`.

## Example

Only sellable items, and only customers changed since the start of the year (parameter 2 = `All`):

```sql
select entityType, id from InvItem where sellable = 1
union all
select entityType, id from Customer where lastUpdateDate >= '2026-01-01'
```

## Important Notes

- When you combine a query with `All`, list every table you want sent; a table the query does not mention is not sent at all.
- The id each record is sent under is built from its Nama id, not its code, so master files do not have to be coded with numbers.
- The run can be stopped from the task monitor; progress reads "Sending {type} ... to ... of ... to Alwatania".

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendMasterDataToAlwatania`

## Related Actions

- [EASendMasterDataRecordToAlwatania](EASendMasterDataRecordToAlwatania.md)
- [EASendInvoicesToAlwatania](EASendInvoicesToAlwatania.md)


</div>
