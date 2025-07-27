---
title: EARegenAccFromQuery
module: core
---


<div class='entity-flows'>

# EARegenAccFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk regenerates accounting effects for entities identified by a SQL query. Extends EARecommitFromQuery but specifically generates accounting effects instead of full recommit, targeting entities implementing IGeneratesAccountingRequest interface.

## When This Action Runs

Manual execution for bulk accounting effect regeneration after chart of accounts changes, accounting configuration updates, or when financial calculations need recalculation across multiple entities.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before processing
4. **Generates accounting effects** - Calls genAccEffect() on each entity to regenerate journal entries
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns 
- Example Query:
```sql
select s.entityType,s.id from SalesInvoice s left join DocumentTerm t on t.id = s.term_id
where t.code = 'term1' and s.valueDate between '20250601' and '20250630'
```
**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)
**Parameter 3:** Do not RegenAccEffects cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)
**Parameter 4:** Flush After Each RegenAccEffects (Optional) - true/false to flush after each entity (default: false)
**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)
**Parameter 6:** Run Update Query After Selecting Entities, and Before RegenAccEffects (Optional) - SQL update query to run before processing

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Ledger Transaction Tables** - Regenerates journal entries and accounting transactions
- **Accounting Effect Tables** - Updates accounting calculations and balances
- **Optional Update Tables** - Additional update query may affect other tables

## Important Warnings

### ⚠️ Entity Requirements
- Target entities must implement IGeneratesAccountingRequest interface
- Only entities that generate accounting effects can be processed
- Non-accounting entities will cause errors

### ⚠️ Financial Data Impact
- Regenerates all accounting effects, potentially modifying journal entries
- May affect ledger balances and financial reports significantly
- Can impact trial balances and financial statements
- CRITICAL: Test thoroughly on copy of production data first

### ⚠️ Query Safety
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Use proper WHERE conditions to avoid unintended mass operations
- Consider date ranges and entity status filters to limit scope

### ⚠️ Performance and Scale
- Large result sets can cause significant performance impact
- Each entity's accounting effect generation runs independently
- Database flushing options add substantial overhead
- Monitor system performance during bulk operations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARegenAccFromQuery`

**Related Actions:**
- [EARecommitFromQuery](EARecommitFromQuery.md) - Parent class for bulk entity operations
- [EARegenAccEffects](EARegenAccEffects.md) - Single entity accounting effect regeneration


</div>