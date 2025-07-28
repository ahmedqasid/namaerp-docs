---
title: EAPreventRepeatedItems
module: supplychain
---


<div class='entity-flows'>

# EAPreventRepeatedItems

**This document was generated using Claude.ai**

## Overview

Validates supply chain documents to prevent duplicate items in document lines based on configurable criteria. Checks for repeated items considering various dimensions like size, color, revision, lot, warehouse, and free item status. Can either block document save with errors or issue warnings depending on configuration.

## When This Action Runs

Automatic execution during document save/commit operations to validate that items are not duplicated within the document lines based on the specified matching criteria.

## How It Works

1. **Builds unique key for each line** - Creates composite key from item and enabled dimension parameters
2. **Processes all document lines** - Iterates through each line to check for duplicates
3. **Constructs matching criteria** - Adds item ID and optional dimensions to the uniqueness key:
   - Item (always included)
   - Size, color, revision, lot ID, box (if enabled)
   - Warehouse location (if enabled)
   - Free item status for invoice lines (if enabled)
4. **Detects duplicates** - Tracks line numbers where each unique key appears
5. **Reports violations** - Creates errors or warnings when duplicate keys are found
6. **Shows line numbers** - Identifies specific lines containing duplicate items

## Parameters

**Parameter 1:** Consider Size (Optional) - true/false to include size in uniqueness check (default: false)

**Parameter 2:** Consider Color (Optional) - true/false to include color in uniqueness check (default: false)

**Parameter 3:** Consider Revision (Optional) - true/false to include revision in uniqueness check (default: false)

**Parameter 4:** Consider Lot ID (Optional) - true/false to include lot tracking in uniqueness check (default: false)

**Parameter 5:** Consider Box (Optional) - true/false to include box dimension in uniqueness check (default: false)

**Parameter 6:** Consider Warehouse (Optional) - true/false to include warehouse in uniqueness check (default: false)

**Parameter 7:** Consider Free Item (Optional) - true/false to include free item status in uniqueness check (default: false)

**Parameter 8:** Warning Not Failure (Optional) - true/false to issue warnings instead of blocking errors (default: false)

## Database Tables Affected

- **Document Lines** - Validates uniqueness of items within document (read-only validation)

## Important Warnings

### ⚠️ Uniqueness Criteria Selection
- Item ID is always included in uniqueness check
- Additional parameters define what constitutes a "different" item
- More parameters = more granular uniqueness (allows more combinations)
- Fewer parameters = stricter uniqueness (prevents more duplicates)

### ⚠️ Business Logic Impact
- May prevent legitimate business scenarios requiring duplicate items
- Consider business requirements before enabling strict uniqueness
- Different item dimensions may legitimately appear multiple times
- Warehouse transfers may require same item in multiple locations

### ⚠️ Free Item Handling
- Free item parameter only applies to invoice lines
- Allows same item to appear as both regular and free
- Non-invoice documents ignore free item parameter
- Ensure business rules align with free item treatment

### ⚠️ Validation Mode Selection
- Failure mode blocks document save completely
- Warning mode allows save but alerts users to duplicates
- Choose mode based on business criticality of duplicate prevention
- Warning mode provides visibility without blocking workflow

### ⚠️ Error Message Behavior
- Error messages do not display entity flow name for cleaner user experience
- Shows specific line numbers where duplicates occur
- Users can identify and resolve duplicate items easily
- Messages focus on business issue rather than technical validation

### ⚠️ Performance Considerations
- Validation runs on every document save operation
- Large documents with many lines may have performance impact
- Complex uniqueness criteria increase processing time
- Consider document size when configuring validation

### ⚠️ Dimension Dependency
- Only validates dimensions that exist on document lines
- Missing dimension data is treated as empty/null values
- Empty values are considered equal for uniqueness purposes
- Ensure dimension data quality for accurate validation

### ⚠️ Line Processing Logic
- Skips lines without item references (null items)
- Processes lines in order and reports first duplicate found
- Line numbers are displayed as 1-based for user clarity
- All duplicates are reported, not just the first occurrence

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedItems`

**Validation Type:** Duplicate Prevention Control

**Uniqueness Scope:** Within single document lines only


</div>

