---
title: EASendInvoicesToAlwatania
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendInvoicesToAlwatania

## Overview

Sends the sales invoices and sales returns selected by a query to the Alwatania Distributors invoices endpoint, using the credentials in an Alwatania config. Each document keeps one row in the Alwatania Invoice Log, so a document already accepted by the platform is never sent twice, and one that was refused is sent again on the next run. See [Sending Master Data and Invoices to Alwatania](/modules/integrations/alwatania/alwatania-sending-data#Sending-invoices-and-returns).

## When This Action Runs

From a Task Schedule of type **Action**, for example every hour or every night. Two runs cannot overlap. Because of that, do not also put it on an entity flow on the sales invoice: saving an invoice while the scheduled run is working would fail.

## How It Works

1. **Finds the config** - Looks up the Alwatania Distributors config (`AlwataniaDistConfig`) by the code or ID in parameter 1.
2. **Runs the query** - Runs the query in parameter 2. Each row gives a document's entity type and id.
3. **Leaves out documents already accepted** - A document whose log row says it reached the platform is skipped. A document whose earlier send failed is sent again, and its existing log row is updated.
4. **Sends in batches** - Sends the documents in batches of the config's **Invoices Batch Size** (5000 when empty), one request per batch, each batch saved in its own transaction. A batch too large for the platform is split into smaller requests. Each document is sent as a sale or a return according to the document itself.
5. **Keeps one bad document from sinking a batch** - The platform checks a whole batch before storing any of it. When it refuses a document, that document is taken out and the rest of the batch is sent again.
6. **Retries the refused documents** - At the end of the run, every document that was not accepted is sent once more. Whatever is still refused stays on its own row of the Alwatania Invoice Log with the platform's answer, and the run fails with "Alwatania did not accept N of the M documents selected, the rest were sent...".
7. **Refreshes the token** - An expired access token is refreshed and the batch retried once.

## Parameters

**Parameter 1:** Alwatania Config Code Or ID (Required) - The code (or ID) of the Alwatania Distributors config, for example `ALW01`.

**Parameter 2:** Query, eg: select entityType, id from SalesInvoice where valueDate = getdate() (Required) - A query that returns the entity type in the first column and the id in the second, selecting from `SalesInvoice` and `SalesReturn` only. The query decides which documents are sent; it can safely overlap earlier runs.

## Example

Yesterday's and today's invoices and returns:

```sql
select entityType, id from SalesInvoice where valueDate >= dateadd(day, -1, getdate())
union all
select entityType, id from SalesReturn where valueDate >= dateadd(day, -1, getdate())
```

## Important Notes

- Once a document has been accepted, later edits to it in Nama are not sent. Deleting its successful row from the Alwatania Invoice Log is what makes it eligible to be sent again.
- Every failure is also written to the server log, because a scheduled run reports its result to nobody who is watching.
- The run can be stopped from the task monitor; progress reads "Sending documents ... to ... of ... to Alwatania".

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendInvoicesToAlwatania`

## Related Actions

- [EASendMasterDataToAlwatania](EASendMasterDataToAlwatania.md)
- [EASendMasterDataRecordToAlwatania](EASendMasterDataRecordToAlwatania.md)


</div>
