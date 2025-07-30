---
title: EADeleteFromQuery
module: core
---


<div class='entity-flows'>

# EADeleteFromQuery

**This document was generated using Claude.ai**

## Overview

Executes SQL query to find entities, then deletes all returned entities. Powerful bulk deletion tool with transaction management and error handling options.

## When This Action Runs

Manual or automated execution for bulk deletion operations, data cleanup, cascade deletions, and maintenance.

## How It Works

1. **Executes SQL query** to find entities (must return entityType and id columns)
2. **Collects entity list** with duplicate prevention and validation
3. **Runs optional update query** before deletion if specified
4. **Deletes entities individually** using proper business logic
5. **Manages transactions** and error handling based on configuration

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns (supports {fieldName} substitution)

**Parameter 2:** Flush Before Starting (Optional) - "true"/"false" to flush database before deletion

**Parameter 3:** Do not Delete cancelled Records (Optional) - "true"/"false" to skip cancelled documents

**Parameter 4:** Flush After Each Delete (Optional) - "true"/"false" to flush after each deletion

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - "true"/"false" for separate transactions with error continuation

**Parameter 6:** Run Update Query After Selecting Entities, and Before Delete (Optional) - SQL update query to run before deletions

## Database Tables Affected

- **Query Tables** - Any tables referenced by SQL query (read-only)
- **Target Entity Tables** - Tables of entities returned by query (deleted with business logic)
- **Audit Tables** - Deletion logs and transaction logs created

## Important Warnings

### ⚠️ Data Safety
- Irreversible bulk deletion operation with potential cascade effects
- Test queries with SELECT before using for deletion
- Backup data before large deletion operations

### ⚠️ Performance
- Complex queries and bulk operations may impact system performance
- Choose appropriate transaction mode and error handling strategy
- Monitor database locks and resource usage during large operations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteFromQuery`

## Related Actions

- [EARunManualNotificationFromQuery](EARunManualNotificationFromQuery.md)
- [EARegenAccFromQuery](EARegenAccFromQuery.md)
- [EARegenInvTransReqFromQuery](../supplychain/EARegenInvTransReqFromQuery.md)
- [EASaveRecordsFromQuery](EASaveRecordsFromQuery.md)
- [EAEGBRASSFixCreationDates](../supplychain/EAEGBRASSFixCreationDates.md)


</div>

