---
title: EARecommitFromQuery
module: core
---


<div class='entity-flows'>

# EARecommitFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk recommits entities identified by a SQL query. Executes the query to find entities, then recommits each one to trigger entity flows, business rules, and validation logic. Supports transaction control and error handling for large-scale operations.

## When This Action Runs

Manual execution for bulk recommitting entities after system updates, configuration changes, or data corrections that require re-triggering business logic.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before recommitting
4. **Recommits entities** - Loads and recommits each entity individually to trigger business logic
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns (e.g., `select entityType,id from StockIssue where fromDoc_id = {id}`)
**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)
**Parameter 3:** Do not Recommit cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)
**Parameter 4:** Flush After Each Recommit (Optional) - true/false to flush after each entity (default: false)
**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)
**Parameter 6:** Run Update Query After Selecting Entities, and Before Recommit (Optional) - SQL update query to run before recommitting

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Tables** - Recommits affect all tables related to the target entities
- **Optional Update Tables** - Additional update query may affect other tables

## Important Warnings

### ⚠️ Query Requirements
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Query should use proper WHERE conditions to avoid unintended mass operations
- Use {id} placeholder to reference the current entity's ID in the query

### ⚠️ Performance Impact
- Large result sets can cause significant performance impact
- Each entity is loaded and recommitted individually
- Database flushing options add additional overhead
- Consider transaction settings for large operations

### ⚠️ Business Logic Impact
- Recommitting triggers all entity flows and business rules
- May cause cascading effects on related entities
- Can modify calculated fields, accounting effects, and status updates
- Test thoroughly before running on production data

### ⚠️ Error Handling
- Default behavior stops on first error
- "Continue on Errors" option processes remaining entities but may leave inconsistent state
- Monitor logs for individual entity failures when continuing on errors

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARecommitFromQuery`


</div>