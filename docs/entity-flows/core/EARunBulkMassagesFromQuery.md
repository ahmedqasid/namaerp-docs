---
title: EARunBulkMassagesFromQuery
module: core
---

<div class='entity-flows'>

# EARunBulkMassagesFromQuery

**This document was generated using Claude.ai**

## Overview

**Description:** Send bulk message notifications for all records returned by a SQL query

This entity flow allows you to send notifications (emails, SMS, or other message types) for multiple bulk message records at once. It processes each bulk message record from your query results and triggers the configured notification for that message.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunBulkMassagesFromQuery`

---

## What This Flow Does

When you run this flow, it:

1. **Runs your SQL query** to find bulk message records
2. **For each bulk message found**, it:
   - Checks if the message has a valid notification configured
   - Sends the notification using the system's notification engine
   - Marks the message as sent by setting `sendWasCalled = 1`
3. **Handles errors** based on your parameter settings (continue or stop on errors)

::: tip Common Use Case
This flow is typically used to send notifications for bulk messages that were created but not yet sent. For example, after importing bulk messages or when retrying failed messages.
:::

---

## Parameters

### 1. Query
**Type:** SQL Query (required)

**Description:** A SQL query that returns bulk message records to process. The query **must** select `entityType` and `id` columns.

**Example:**
```sql
select entityType, id from BulkMessage where sendWasCalled = 0
```

This example finds all bulk messages that haven't been sent yet.

## Technical Notes

This flow extends the base class `EARecommitFromQuery`, which provides the query execution and batch processing framework. The actual notification sending is handled by `NotificationsEngine.manualNotify()`.

**Source Code Location:** `code/infra/domain-base/src/main/java/com/namasoft/infor/domainbase/util/actions/EARunBulkMassagesFromQuery.java:10`

</div>

