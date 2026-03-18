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

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASortFields`


</div>