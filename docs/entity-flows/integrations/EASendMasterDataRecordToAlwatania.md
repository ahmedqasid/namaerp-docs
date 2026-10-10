---
title: EASendMasterDataRecordToAlwatania
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendMasterDataRecordToAlwatania

## Overview

Sends the master record the entity flow runs on to Alwatania Distributors, using the credentials in an Alwatania config, so that a new customer or item reaches the platform the moment it is saved instead of waiting for the next scheduled sweep. Only records the platform does not hold yet are sent. See [Sending Master Data and Invoices to Alwatania](/modules/integrations/alwatania/alwatania-sending-data#Sending-a-master-record-as-it-is-saved).

## When This Action Runs

From an entity flow on one of the master files Alwatania accepts — Legal Entity, Group (`MasterGroup`), Analysis Set, Customers' Class 5, Employee, Customer or Item — with target action **Post Commit**. It refuses to be placed on any other screen, including a task schedule. Several users can save at the same time; runs are not locked against each other.

## How It Works

1. **Finds the config** - Looks up the Alwatania Distributors config by the code or ID in parameter 1.
2. **Works out the type** - Reads the master data type from the record: a legal entity is sent both as a province and as a city, every other master file as one type. If parameter 2 is filled, only that type is sent, and it must be one of the types the record can be sent as.
3. **Sends the record as it is being saved** - Sends the record in the same save, so the log is written in that same transaction. If the save rolls back, no log row is left claiming the record was sent, and the next scheduled sweep picks it up.
4. **Sends new records only** - A record the platform already holds is left alone, even when the flow runs again on a later edit. Changes reach the platform through the scheduled sweep.
5. **Logs every send** - Every send is recorded in the Alwatania Master Data Log, and every problem is written to the server log.

## Parameters

**Parameter 1:** Alwatania Config Code Or ID (Required) - The code (or ID) of the Alwatania Distributors config, for example `ALW01`.

**Parameter 2:** Master Data Type, empty to read it from the record (Provinces, Cities, Branches, Regions, ClientClasses, Salesmen, Clients, Items, ItemDetails) (Optional) - Leave empty in most cases. Fill it only to restrict the record to one of the types it could be sent as, for example `Items` on an item flow to skip the item details. The field suggests only the types valid for the flow's screen.

## Important Notes

- The record is sent on its own, not the records it points at. A new customer refers to its city, branch, class and salesman, so those must already be on the platform: run [EASendMasterDataToAlwatania](EASendMasterDataToAlwatania.md) once from a task schedule before switching these flows on, and keep that schedule running to carry whatever a flow did not get across.
- Trigger the flow on the creation of records; edits to a record already on the platform are not sent by this action.

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendMasterDataRecordToAlwatania`

## Related Actions

- [EASendMasterDataToAlwatania](EASendMasterDataToAlwatania.md)
- [EASendInvoicesToAlwatania](EASendInvoicesToAlwatania.md)


</div>
