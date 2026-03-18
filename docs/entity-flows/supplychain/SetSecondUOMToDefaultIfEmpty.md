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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.SetSecondUOMToDefaultIfEmpty`


</div>

