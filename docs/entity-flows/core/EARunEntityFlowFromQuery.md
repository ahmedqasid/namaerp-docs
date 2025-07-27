---
title: EARunEntityFlowFromQuery
module: core
---


<div class='entity-flows'>

# EARunEntityFlowFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk executes an entity flow on multiple entities identified by a SQL query. Each entity found by the query has the specified entity flow executed against it in separate transactions with error isolation.

## When This Action Runs

Manual execution for bulk entity flow operations, such as running scheduled maintenance, batch processing, or applying business logic across multiple entities matching specific criteria.

## How It Works

1. **Locates target flow** - Finds EntityFlow by the specified business code
2. **Executes query** - Runs the provided SQL query to find target entities (must return entityType and id columns)
3. **Processes each entity** - For each result, loads the entity and checks flow applicability
4. **Executes in transactions** - Runs the entity flow on each entity in separate transactions
5. **Handles errors** - Continues processing remaining entities even if individual entities fail
6. **Supports cancellation** - Monitors for task cancellation during bulk operations

## Parameters

**Parameter 1:** Entity Flow Code (Required) - Business code of the EntityFlow to execute
**Parameter 2:** Query (Required) - SQL query returning entityType and id columns
- Example Query:
```sql
select entityType,id from SalesInvoice where valueDate = getdate()
```

## Database Tables Affected

- **EntityFlow** - Reads flow configuration and execution parameters
- **Query Target Tables** - Reads from tables specified in the query
- **Variable Tables** - Depends on the target entity flow being executed
- **Target Flow Impact** - Database changes depend entirely on what the target flow does

## Important Warnings

### ⚠️ Entity Flow Requirements
- Target entity flow must exist and have a valid business code
- Entity flow must be configured for manual execution (not automatic)
- Entity flow must be applicable to each target entity type

### ⚠️ Query Requirements
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Query should use proper WHERE conditions to avoid unintended mass operations
- Use {id} placeholder to reference the current entity's ID in the query

### ⚠️ Transaction and Error Handling
- Each entity is processed in a separate transaction
- Failures on individual entities do not stop processing of remaining entities
- Error details are logged but processing continues
- Monitor logs for individual entity failures

### ⚠️ Performance and Scale
- Large result sets can cause significant performance impact
- Each entity flow execution runs independently
- Consider system load and timing for bulk operations
- Supports task cancellation for long-running operations

### ⚠️ Business Logic Considerations
- Target flow may have side effects not obvious from this action
- Each entity flow execution may trigger additional automatic flows
- Consider cascading effects when processing large numbers of entities

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunEntityFlowFromQuery`

**Related Actions:**
- [EARunEntityFlow](EARunEntityFlow.md) - Single entity flow execution
- [EARecommitFromQuery](EARecommitFromQuery.md) - Bulk entity recommit operations


</div>