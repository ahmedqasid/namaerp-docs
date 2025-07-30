---
title: UniqueBOXInsideStockReceipt
module: supplychain
---


<div class='entity-flows'>

# UniqueBOXInsideStockReceipt

**This document was generated using Claude.ai**

## Overview

Validates that each box number is used only once per item within a stock receipt document. Prevents duplicate box assignments for the same item by checking that each combination of box number and item appears only once in the document lines, ensuring proper inventory tracking and preventing data integrity issues.

## When This Action Runs

Validation action typically executed during document save, approval, or processing to ensure box number uniqueness, commonly used in warehouse operations where box tracking is critical for inventory management and item location tracking.

## How It Works

1. **Initializes tracking set** - Creates HashSet to track box-item combinations
2. **Scans document lines** - Iterates through all lines in the stock receipt
3. **Checks for box assignment** - Only processes lines that have a box number assigned
4. **Creates combination key** - Combines box number and item into a unique identifier
5. **Tests for duplicates** - Attempts to add combination to HashSet:
   - If successfully added: combination is unique, continues processing
   - If addition fails: combination already exists, records error
6. **Records duplicate errors** - Accumulates failure messages for duplicate combinations
7. **Returns validation result** - Success if no duplicates, failure with error details if duplicates found

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Reads box and item data for validation (read-only)
- **SpecificDimensions** - Reads box number from line dimensions (read-only)
- **Item References** - Reads item information for duplicate checking (read-only)

## Important Warnings

### ⚠️ Lines Without Box Numbers
- **Silently skips lines with empty box numbers**
- No validation occurs for lines without box assignments
- Missing box numbers are not flagged as errors
- May allow incomplete box tracking if not handled elsewhere

### ⚠️ Item Reference Requirements
- Validation depends on proper item references in document lines
- Lines without valid item assignments may cause errors
- Item hierarchy must be properly established
- Ensure all lines have complete item information

### ⚠️ Box Number Format
- **No validation of box number format or structure**
- Any non-empty string is accepted as valid box number
- Special characters and spaces are allowed
- Ensure consistent box numbering standards separately

### ⚠️ Case Sensitivity
- Box number comparison is case-sensitive
- "BOX01" and "box01" are treated as different boxes
- May allow unintended duplicates with different cases
- Standardize box number case formatting before processing

### ⚠️ Cross-Document Validation
- **Only validates uniqueness within single document**
- Does not check for box conflicts across different documents
- Same box-item combination may exist in other receipts
- Implement system-wide box tracking if needed

### ⚠️ Error Accumulation
- **Continues processing after finding duplicates**
- All duplicate combinations are reported in single result
- Document remains in error state until duplicates are resolved
- May produce multiple error messages for same underlying issue

### ⚠️ Memory Usage
- HashSet grows with number of unique box-item combinations
- Large documents with many boxes use more memory
- No optimization for documents with repeated patterns
- Consider memory impact for very large receipts

### ⚠️ Validation Only Action
- **Does not modify document data in any way**
- Only reports validation errors without suggesting fixes
- Manual correction required to resolve duplicate issues
- No automatic box number reassignment capability

### ⚠️ Box Dimension Dependencies
- Relies on SpecificDimensions object being properly initialized
- Null dimension objects cause validation to skip silently
- Box tracking depends on proper dimension setup
- Ensure dimension initialization in document creation

### ⚠️ MultiKeyHash Performance
- Uses hash-based duplicate detection for efficiency
- Hash collisions are handled by Java HashSet implementation
- Performance degrades with extremely large numbers of combinations
- Generally efficient for typical document sizes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.UniqueBOXInsideStockReceipt`


</div>

