---
title: EASaveDraftsFromQuery
module: core
---


<div class='entity-flows'>

# EASaveDraftsFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk saves draft entities identified by a SQL query. Processes entities that have draft status, committing them to permanent state with full validation and business logic execution. Continues processing remaining entities even if individual saves fail.

## When This Action Runs

Manual execution for bulk conversion of draft entities to committed state, typically for batch processing of prepared documents or completing pending transactions.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Validates draft status** - Only processes entities that have draftCreated = true
4. **Commits entities** - Calls EntityMediator.commitFromBusinessAction() on each draft entity
5. **Handles errors** - Continues processing remaining entities even if individual commits fail

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

Example Query:
```sql
select entityType,id from StockIssue where commitedBefore = 0 and draftCreated = 1
```

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Tables** - Updates entity status from draft to committed
- **Related Tables** - All tables affected by entity business logic during commit
- **Validation Tables** - Tables accessed during commit validation

## Important Warnings

### ⚠️ Query Requirements
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Query should filter for draft entities (draftCreated = 1)
- Use proper WHERE conditions to avoid processing non-draft entities

### ⚠️ Draft Status Requirements
- Only entities with draftCreated = true are processed
- Entities already committed (commitedBefore = 1) are skipped
- Entity must be in valid draft state for successful commitment

### ⚠️ Business Logic Impact
- Commit triggers all entity flows, validation rules, and business logic
- May cause cascading effects on related entities
- Can modify calculated fields, accounting effects, and status updates

### ⚠️ Error Handling and Transactions
- Each entity is processed in separate transaction
- Failed commits are logged but don't stop processing of remaining entities
- Partial success possible - some entities may commit while others fail

### ⚠️ Performance Considerations
- Large result sets can cause significant processing time
- Each entity commit includes full validation and business logic
- Monitor system performance during bulk draft processing

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASaveDraftsFromQuery`


</div>