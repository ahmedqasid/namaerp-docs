---
title: EASendEltezamSubmissionDoc
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendEltezamSubmissionDoc

## Overview

Sends an MCS Eltezam Submission document (`EltezamSubmissionDoc`) to the MCS Eltezam server given as the first parameter. Committing a submission does not send it and the screen has no Send button, so this action is what actually sends it. A From Date, To Date, HR Period or HR Year given as a parameter wins over the document's own value for that run; the document's values are used for any left empty. See [Eltezam Submissions and Sending](/modules/integrations/eltezam/eltezam-submissions-and-sending).

## When This Action Runs

From an entity flow on **MCS Eltezam Submission** with target action **Post Commit**, so every submission is sent as soon as it is committed. Two runs cannot overlap.

## How It Works

1. **Checks the record** - The action works only on an Eltezam submission document, and only once it is committed. A draft is refused with "The Eltezam submission document ... is a draft, commit it before sending".
2. **Picks the configuration** - If parameter 2 names an Eltezam Configuration, it replaces the document's configuration. A configuration is required, either on the document or in parameter 2.
3. **Works out the period** - Checks that any HR Period and HR Year codes given exist, then combines the period parameters with the document's own period: each filled parameter wins, each empty one falls back to the document. The document's own period fields are not changed.
4. **Clears the previous log** - Deletes the system entries (the request log) of any earlier send of this document.
5. **Sends every employee line** - For each employee and each operation enabled on the document, builds the requests from the HR data, checks them, and sends them to the server one by one. A request that fails Nama's own checks is not sent when the configuration's **Do Not Send Records Having Validation Errors** is ticked.
6. **Records the results** - Saves one system entry per request with the ministry's answer, sets each line's send state, succeeded and failed operation counts and last error, and fills the document's **Succeeded Requests Count** and **Failed Requests Count**.
7. **Stops if the server is down** - After three technical failures in a row (unreachable, timing out, answering with a web page) it stops sending. The lines not reached stay **Not Sent** and the run reports that it stopped.

## Parameters

**Parameter 1:** MCS Server (IP, host or full URL) (Required) - Where to send. A full URL (`http://10.1.2.3/EltezamDataService.svc`) is used as it is; a bare host or IP (`10.1.2.3`) keeps the scheme and path of the configuration's Service URL and replaces only the host.

**Parameter 2:** Eltezam Configuration Code (Can be Empty) - A configuration to use instead of the one on the document.

**Parameter 3:** From Date (yyyy-MM-dd, Can be Empty) - Overrides the document's From Date for this run, for example `2026-01-01`.

**Parameter 4:** To Date (yyyy-MM-dd, Can be Empty) - Overrides the document's To Date for this run, for example `2026-01-31`.

**Parameter 5:** HR Period Code (Can be Empty) - Overrides the document's HR Period. The run fails if no HR Period has this code.

**Parameter 6:** HR Year Code (Can be Empty) - Overrides the document's HR Year. The run fails if no HR Year has this code. When the From Date or To Date in use is empty, the HR Year's start or end date takes its place.

## Important Notes

- In the entity flow's **Class Name**, write the full class name below; the short name alone is not found.
- If the run ends as a failure, the save it runs in is rolled back, so none of that run's system entries are kept.

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendEltezamSubmissionDoc`

## Related Actions

- [EASubmitEltezamData](EASubmitEltezamData.md)
- [EACreateEltezamCodeTables](EACreateEltezamCodeTables.md)


</div>
