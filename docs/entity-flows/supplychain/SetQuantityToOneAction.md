---
title: SetQuantityToOneAction
module: supplychain
---


<div class='entity-flows'>

# SetQuantityToOneAction

**This document was generated using Claude.ai**

## Overview

Sets default quantity values to 1 for document lines that have zero or empty quantities. Also initializes measurement dimensions (length, width, height) to 1 for items that require measurements, ensuring all lines have valid quantity data for processing.

## When This Action Runs

Manual execution on supply chain documents when default quantities need to be assigned, typically used for initializing new documents, fixing empty quantity issues, or preparing documents where single unit quantities are standard.

## How It Works

1. **Scans document lines** - Iterates through all lines in the supply chain document
2. **Validates item references** - Skips lines without valid item assignments
3. **Initializes null fields** - Calls updateNulls() to ensure proper field initialization
4. **Sets primary quantity defaults**:
   - Sets unit of measure from item's base unit if missing
   - Sets quantity value to 1 if zero or empty
5. **Handles measurement items** - For items with hasMeasures = true:
   - Creates measures object if missing
   - Sets measure quantity to 1 if empty
   - Sets length to 1 if empty
   - Sets width to 1 for 2D/3D items if empty
   - Sets height to 1 for 3D items if empty
6. **Returns success** - Always completes successfully

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Updates quantity and measurement values in document lines
- **UserQuantity** - Modifies quantity data including primary quantity and measures
- **Measures** - Updates or creates measurement dimensions (length, width, height)

## Important Warnings

### ⚠️ Overwrites Zero Quantities
- **Automatically changes zero quantities to 1**
- May not be appropriate for all business scenarios
- Zero quantities might be intentional (e.g., placeholder lines)
- Review business requirements before applying

### ⚠️ Item Reference Requirements
- **Lines without items are skipped** silently
- No error reporting for missing item references
- Incomplete document lines remain unmodified
- Ensure all lines have valid items before processing

### ⚠️ Unit of Measure Assignment
- Automatically assigns item's base unit if UOM is missing
- May override intended unit of measure selections
- Different UOMs may require different quantity values
- Review UOM assignments after processing

### ⚠️ Measurement Dimension Logic
- **Sets all empty dimensions to 1**
- May not reflect actual physical dimensions
- Affects volume and area calculations
- Consider impact on shipping and storage calculations

### ⚠️ Measure Type Dependencies
- Dimension requirements based on item's measure type:
  - Single dimension: Only length
  - Two dimensions: Length and width
  - Three dimensions: Length, width, and height
- Incorrect measure type configuration affects results

### ⚠️ No Validation of Results
- Does not verify if quantity of 1 is valid for the item
- No minimum/maximum quantity checks
- No business rule validation
- May create invalid document states

### ⚠️ Existing Data Preservation
- **Only modifies empty or zero values**
- Existing non-zero quantities are preserved
- Partial updates may result in inconsistent data
- Review all lines for consistency after processing

### ⚠️ Null Field Initialization
- Calls updateNulls() which may have side effects
- Additional fields may be initialized beyond quantities
- Field initialization logic is item-specific
- Monitor for unexpected field changes

### ⚠️ Performance Considerations
- Processes all document lines regardless of current values
- No optimization for documents with existing quantities
- Large documents may take time to process
- Consider selective processing for efficiency

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.SetQuantityToOneAction`

**Document Type:** All Supply Chain Documents

**Related Actions:**
- Quantity initialization utilities
- Measurement management entity flows
- Document line default value actions


</div>

