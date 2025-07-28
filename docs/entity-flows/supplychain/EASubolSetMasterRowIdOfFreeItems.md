---
title: EASubolSetMasterRowIdOfFreeItems
module: supplychain
---


<div class='entity-flows'>

# EASubolSetMasterRowIdOfFreeItems

**This document was generated using Claude.ai**

## Overview

Establishes relationships between free items and their associated master items in sales documents. Links each free item line to the most recent non-free item line that precedes it, setting up proper master-detail relationships for promotional and bonus item tracking.

## When This Action Runs

Manual execution on sales documents containing free items that need to be linked to their qualifying master items, typically used after adding promotional items or when establishing proper relationships for free item tracking and reporting.

## How It Works

1. **Scans document lines** - Iterates through all sales lines starting from the second line
2. **Identifies free items** - Finds lines marked with freeLine = true
3. **Searches for master items** - For each free item line, searches backwards through previous lines
4. **Skips other free items** - Continues searching until finding a non-free item line
5. **Sets master relationship** - Links the free item to the found master item by setting:
   - masterRowId: ID of the master line
   - freeItemId: ID of the master item
6. **Continues processing** - Repeats for all free item lines in the document

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **SalesLine** - Updates masterRowId and freeItemId fields for free item lines
- **Item Data** - Reads master item information for relationship setup (read-only)

## Important Warnings

### ⚠️ Sales Document Type Requirements
- Only works on SalesDocument types
- Requires document lines with freeLine flag properly set
- Free item identification depends on accurate freeLine field values
- Ensure free items are correctly marked before processing

### ⚠️ Line Order Dependencies
- **Processing depends on line sequence order**
- Free items are linked to the most recent preceding non-free item
- Document line order determines master-detail relationships
- Rearranging lines after processing may break established relationships

### ⚠️ Master Item Search Logic
- Searches backwards from each free item to find the associated master
- Skips over other free items during the search
- Links to the first non-free item found in reverse order
- If no master item is found, relationships are not established

### ⚠️ Free Item Identification
- Relies on freeLine boolean field for identifying promotional items
- Items must be properly marked as free items before processing
- Non-free items are not affected by this action
- Ensure accurate free item classification in document lines

### ⚠️ Relationship Overwrites
- Sets masterRowId and freeItemId fields directly
- Existing relationships may be overwritten without warning
- Previous master-detail links are replaced with new ones
- Consider backing up relationship data before processing

### ⚠️ First Line Exclusion
- Processing starts from the second line (index 1)
- First line cannot be processed as a free item
- Free items in the first position will not be linked to masters
- Consider document structure when adding free items

### ⚠️ Document Structure Impact
- Establishes permanent relationships between lines
- Relationships affect reporting, pricing, and inventory tracking
- Master-detail links influence document processing and validation
- Changes impact promotional item management and tracking

### ⚠️ Missing Master Items
- Free items without preceding non-free items remain unlinked
- Unlinked free items may cause issues in reporting and processing
- Review document structure to ensure proper master-detail pairing
- Consider document line organization for complete relationship setup

### ⚠️ Promotional Logic Dependencies
- Established relationships support promotional item business logic
- Master-detail links affect discount calculations and inventory allocation
- Relationship data is used for promotional reporting and analysis
- Ensure relationships align with promotional campaign requirements

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASubolSetMasterRowIdOfFreeItems`

**Document Type:** Sales Documents with Free Items

**Related Actions:**
- Free item management entity flows
- Promotional item processing utilities
- Sales line relationship management actions


</div>

