---
title: EAPreventRepeatedValuesAtDetail
module: supplychain
---


<div class='entity-flows'>

# EAPreventRepeatedValuesAtDetail

**This document was generated using Claude.ai**

## Overview

Validates document detail collections to prevent duplicate values in specified fields across detail lines. Uses configurable field combinations to define what constitutes a duplicate and blocks document save when repeated values are found in the specified detail collection.

## When This Action Runs

Automatic execution during document save/commit operations to validate that specified fields in detail collections do not contain duplicate value combinations.

## How It Works

1. **Retrieves detail collection** - Gets the specified detail collection from the document using reflection
2. **Parses field specifications** - Extracts field names from comma or newline separated list
3. **Processes each detail line** - For each line in the collection:
   - Extracts values from specified fields using reflection
   - Creates composite key from field values
   - Checks if key already exists from previous lines
4. **Detects duplicates** - Tracks which line number first used each unique key combination
5. **Reports violations** - Creates failure results when duplicate keys are found
6. **Shows line numbers** - Identifies specific lines containing duplicate field combinations

## Parameters

**Parameter 1:** Details Name (Required) - Name of the detail collection field to validate

Example: `details`, `packingList`, `paymentLines`

**Parameter 2:** Not To Repeat Field Names (Required) - Field names that should not have duplicate combinations

Format: Comma-separated or newline-separated field names with collection prefix

Example: `details.item.item,details.size,details.color`

## Database Tables Affected

- **Detail Collections** - Validates uniqueness of field combinations within collections (read-only validation)

## Important Warnings

### ⚠️ Field Name Format Requirements
- Field names must include the detail collection prefix (e.g., "details.item.item")
- Field names are validated to ensure they belong to the specified collection
- Invalid field names cause parameter validation failures
- Use exact field paths as they appear in the entity structure

### ⚠️ Reflection-Based Field Access
- Uses reflection to access field values dynamically
- Field names must match exact property names in the code
- Nested field access supported using dot notation
- Invalid field paths may cause runtime errors

### ⚠️ Composite Key Matching
- Creates unique keys from combination of all specified field values
- All specified fields must match for lines to be considered duplicates
- Empty/null values are considered equal for matching purposes
- Consider business logic when selecting field combinations

### ⚠️ Document Save Blocking
- Validation failures prevent entire document save operation
- Error messages do not display entity flow name for cleaner user experience
- Users must resolve duplicate combinations to proceed
- No override mechanism available

### ⚠️ Collection Processing Requirements
- Only processes non-empty detail collections
- Empty collections pass validation automatically
- Collection must exist on the document entity
- Invalid collection names cause runtime failures

### ⚠️ Line Number Reporting
- Shows 1-based line numbers for user clarity
- Reports both original and duplicate line numbers
- Error message format: "Line X is repeated with line Y"
- All duplicates are reported, not just first occurrence

### ⚠️ Field Value Extraction
- Field values extracted using object reflection at runtime
- Complex object references are compared by object identity
- String values are compared by content
- Consider data types when defining uniqueness criteria

### ⚠️ Performance Considerations
- Reflection-based field access has performance overhead
- Large detail collections may impact validation speed
- Complex field paths increase processing time
- Validate only essential field combinations

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedValuesAtDetail`

**Validation Type:** Generic Detail Duplicate Prevention

**Scope:** Any document detail collection with configurable fields


</div>

