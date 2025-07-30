---
title: SetSecondUOMToDefaultIfEmpty
module: supplychain
---


<div class='entity-flows'>

# SetSecondUOMToDefaultIfEmpty

**This document was generated using Claude.ai**

## Overview

Automatically assigns the default secondary unit of measure to document lines when the secondary UOM field is empty. Initializes the secondary quantity structure and sets the UOM based on the item's configured secondary base unit, ensuring proper dual-unit quantity tracking for items that support secondary measurements.

## When This Action Runs

Manual execution on supply chain documents when secondary unit initialization is needed, typically used during document creation, after item changes, or when preparing documents for dual-unit quantity processing where secondary measurements are required.

## How It Works

1. **Iterates through document lines** - Processes all lines in the supply chain document
2. **Initializes quantity structures** - Creates nested quantity objects if null:
   - Creates UserQuantity if missing
   - Creates Quantity within UserQuantity if missing
   - Creates SecondQty (RawQuantity) within Quantity if missing
3. **Validates secondary UOM requirements** - Checks multiple conditions before processing:
   - Secondary UOM must be empty (not already set)
   - Line must have a valid item reference
   - Item must have hasSecondUnit = true
   - Item must have a configured secondary base unit
4. **Sets default secondary UOM** - Assigns the item's secondary base unit to the line's secondary UOM field
5. **Skips ineligible lines** - Silently bypasses lines that don't meet all requirements
6. **Returns success** - Always completes successfully regardless of updates made

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Updates secondary UOM in document lines
- **UserQuantity** - Modifies quantity structure including secondary quantity data
- **RawQuantity** - Updates secondary quantity UOM field

## Important Warnings

### ⚠️ Silent Processing of Lines
- **Lines are skipped without notification** if requirements aren't met
- No error reporting for missing item references
- No warnings for items without secondary unit support
- Review processing results to identify skipped lines

### ⚠️ Existing UOM Preservation
- **Only processes lines with empty secondary UOM**
- Existing secondary UOM values are never overwritten
- Manual UOM selections are always preserved
- Cannot be used to standardize existing UOM assignments

### ⚠️ Item Configuration Requirements
- Item must have hasSecondUnit flag set to true
- Item must have a configured secondary base unit
- Missing configuration silently skips the line
- Ensure proper item setup before processing

### ⚠️ Quantity Structure Initialization
- **Creates deeply nested object structures** if missing
- May initialize more than just the UOM field
- Object creation has memory allocation impact
- Consider performance for large documents

### ⚠️ No Quantity Value Assignment
- Only sets the unit of measure, not quantity values
- Secondary quantity values remain unchanged
- Zero or null quantities are not initialized
- Additional processing needed for quantity defaults

### ⚠️ Business Rule Bypass
- Direct field assignment bypasses validation rules
- No verification that secondary UOM is valid for the context
- No conversion factor validation
- May create inconsistent unit combinations

### ⚠️ HashSet Usage Without Purpose
- Code creates HashSet for boxes but never uses it
- Indicates possible incomplete implementation
- May have been intended for duplicate checking
- Future versions might implement additional logic

### ⚠️ No Transaction Context Validation
- Applies same logic regardless of document type
- No consideration for business process requirements
- May not be appropriate for all document scenarios
- Review applicability for specific workflows

### ⚠️ Null Safety Handling
- **Extensive null checking creates objects as needed**
- Deep object initialization may have side effects
- Other code may expect null values in certain cases
- Monitor for unexpected behavior after initialization

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.SetSecondUOMToDefaultIfEmpty`


</div>

