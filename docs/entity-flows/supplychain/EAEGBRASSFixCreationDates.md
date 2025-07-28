---
title: EAEGBRASSFixCreationDates
module: supplychain
---


<div class='entity-flows'>

# EAEGBRASSFixCreationDates

**This document was generated using Claude.ai**

## Overview

Bulk fixes creation dates on supply chain documents identified by SQL query. Synchronizes creation dates with source documents and adjusts them based on document type (issues vs receipts) to maintain proper chronological order for inventory effects.

## When This Action Runs

Manual execution for data correction when creation dates are incorrect or inconsistent, typically after data migration, system integration issues, or when documents need chronological reordering for accurate inventory processing.

## How It Works

1. **Executes SQL query** - Finds documents to process based on query criteria
2. **Synchronizes with source** - Copies creation date from source document (fromDoc) if available
3. **Adjusts chronological order** - For StockIssue: makes creation date after source; for others: makes creation date before source
4. **Regenerates inventory effects** - Recalculates inventory transactions with corrected dates
5. **Processes in sequence** - Handles each document individually with error accumulation

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

```sql
select entityType,id from StockIssue where fromDoc_id = {id}
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before processing (default: false)

**Parameter 3:** Skip Cancelled Records (Optional) - true/false to ignore cancelled documents (default: true)

**Parameter 4:** Flush After Each Fix (Optional) - true/false to flush after each document (default: false)

**Parameter 5:** Continue on Errors (Optional) - true/false to process remaining documents if errors occur (default: false)

**Parameter 6:** Pre-Processing Update (Optional) - SQL update query to run before fixing dates

## Database Tables Affected

- **Supply Chain Documents** - Updates creation dates on target documents
- **Inventory Transactions** - Regenerates inventory effects with new dates
- **Document Relationships** - Reads source document dates (read-only)

## Important Warnings

### ⚠️ Document Type Specificity
- Only processes BasicSCDocument types (supply chain documents)
- Different logic for StockIssue vs other document types
- Non-supply chain documents will cause errors

### ⚠️ Chronological Order Impact
- StockIssue documents get creation dates AFTER source documents
- Other documents get creation dates BEFORE source documents
- Critical for maintaining proper inventory transaction sequence

### ⚠️ Inventory Effect Regeneration
- Automatically regenerates inventory transactions with new dates
- May affect inventory balances and valuation
- Can impact historical inventory reports

### ⚠️ Source Document Dependencies
- Requires valid fromDoc relationships for date synchronization
- Documents without source relationships keep original dates
- Source documents must be accessible and committed

### ⚠️ Bulk Operation Risks
- Processes all documents returned by query
- Large datasets may take significant time
- Consider system performance during execution

### ⚠️ Date Consistency
- May create date conflicts with related documents
- Consider impact on document workflows and approvals
- Verify business date logic after execution

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAEGBRASSFixCreationDates`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Parent class for bulk operations
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Used for StockIssue documents
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Used for other documents


</div>

