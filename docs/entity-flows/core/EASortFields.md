---
title: EASortFields
module: core
---


<div class='entity-flows'>

# EASortFields

**This document was generated using Claude.ai**

## Overview

Sorts detail collections within an entity based on specified field values. Allows reordering of detail records (like invoice lines, payment details) and optionally preserves original order in a backup field before sorting.

## When This Action Runs

Manual execution for organizing detail collections, improving data presentation, or preparing data for reports that require specific ordering of detail records.

## How It Works

1. **Identifies detail collection** - Locates the specified detail field collection in the entity
2. **Extracts sort values** - Retrieves values from the specified sort field for each detail record
3. **Saves original order** - Optionally stores current record positions in a backup field
4. **Applies sorting** - Sorts the detail collection based on the sort field values and direction
5. **Updates collection** - Reorders the detail records in the entity according to sort results

## Parameters

**Parameter 1:** Detail Field (Required) - Name of the detail collection field to sort (e.g., "details", "lines")

**Parameter 2:** Sort On Field (Required) - Field within detail records to sort by (e.g., "details.item.itemCode", "paymentDetails.amount")

**Parameter 3:** Save Original Order In Field (Optional) - Field to store original position numbers before sorting (e.g. "details.n1")

**Parameter 4:** Sort Direction (Optional) - "asc" for ascending or "desc" for descending (default: "asc")

## Usage Examples

Sort invoice lines by item code:
```
Parameter 1: details
Parameter 2: details.item.itemCode  
Parameter 3: details.n1
Parameter 4: asc
```

Sort payment details by amount (descending):
```
Parameter 1: paymentDetails
Parameter 2: paymentDetails.amount
Parameter 3: (empty)
Parameter 4: desc
```

## Database Tables Affected

- **Detail Collection Tables** - Reorders records within the specified detail collection
- **Backup Fields** - Updates original position field if specified in Parameter 3

## Important Warnings

### ⚠️ Detail Collection Requirements
- Detail field must exist and contain a valid collection of records
- Sort field must exist within each detail record
- Empty collections are processed without error but no sorting occurs
- Invalid field names will cause action failure

### ⚠️ Sort Field Compatibility
- Sort field values must be comparable (strings, numbers, dates)
- Null or empty values may cause unexpected sort results
- Text fields are sorted alphabetically, numbers numerically

### ⚠️ Original Order Preservation
- Original order is permanently lost unless backup field is specified
- Backup field must be numeric type to store position numbers
- Position numbers start from 1 and increment sequentially
- Existing values in backup field are overwritten

### ⚠️ Data Integrity Impact
- Reordering may affect dependent calculations that rely on record sequence
- Business logic depending on detail order may be impacted
- Consider implications for reports and displays that show detail records
- Audit trails may not capture the reordering operation

### ⚠️ Performance Considerations
- Large detail collections may take longer to sort
- Complex sort fields (with calculations) may impact performance
- Sorting is done in memory - very large collections may cause memory issues
- Multiple sorts on same entity should be done carefully

### ⚠️ Field Reference Format
- Sort field must include the detail collection prefix (e.g., "invoiceLines.amount")
- Backup field should also include collection prefix if specified
- Field references are case-sensitive

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASortFields`


</div>