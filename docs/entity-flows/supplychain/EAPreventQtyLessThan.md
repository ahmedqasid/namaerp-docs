---
title: EAPreventQtyLessThan
module: supplychain
---


<div class='entity-flows'>

# EAPreventQtyLessThan

**This document was generated using Claude.ai**

## Overview

Validates that document line quantities meet minimum quantity requirements by comparing actual quantities against configurable minimum limits. Prevents processing of supply chain documents when item quantities fall below specified thresholds, ensuring compliance with business rules and operational requirements.

## When This Action Runs

Validation during document processing before commitment. Typically used on sales orders, purchase orders, or inventory documents where minimum quantity constraints must be enforced for specific items or item categories.

## How It Works

1. **Groups document lines** - Organizes lines by item to calculate total quantities per item
2. **Executes quantity query** - Runs the provided query to determine minimum quantity limits
3. **Calculates totals** - Sums base quantities for each item across all document lines
4. **Compares quantities** - Checks if total quantity meets minimum requirements
5. **Reports violations** - Creates failure results for items below minimum thresholds

## Parameters

**Parameter 1:** Minimum Qty Calculation Query (Required) - Query to determine minimum quantity limits for each item

## Example Query

```sql
select {details.item.item.n1}
```

This example uses the n1 field from the item master as the minimum quantity.

## Query Result Handling

- **Per-line results**: If query returns one result per document line, uses corresponding result for each line
- **Single result**: If query returns one result total, applies same limit to all items

## Database Tables Affected

This is a validation action that does not modify any database tables. It only reads data for validation purposes.

## Important Warnings

### ⚠️ Query Dependency
- Entire validation depends on provided SQL query
- Invalid SQL syntax causes action failure
- Query must return numeric values for quantity limits

### ⚠️ Quantity Aggregation
- Sums quantities across all lines for the same item
- Multiple lines for same item are totaled together
- Base quantity values used for calculations

### ⚠️ Validation Failure Impact
- Prevents document processing when quantities are below minimum
- All validation failures must be resolved before document can proceed
- Error messages include specific item and quantity information

### ⚠️ Query Result Interpretation
- Assumes query returns minimum quantity limits as first column
- Non-numeric query results may cause processing errors
- Null or empty query results may be interpreted as zero

### ⚠️ Item Grouping Logic
- Groups lines by exact item match
- Different item variants treated as separate items
- Item identification depends on proper item master data

### ⚠️ Base Quantity Usage
- Uses base quantity values, not primary or secondary quantities
- Unit conversion may affect quantity calculations
- Ensure query limits align with base unit expectations

### ⚠️ Error Message Visibility
- Action configured to not display entity flow name in failure messages
- Error messages focus on item and quantity details
- May make troubleshooting more difficult if source unclear

### ⚠️ Parameter Validation
- Parameter 1 is required and validated as non-empty
- Missing or empty query parameter causes validation failure
- No validation of query syntax or logic

### ⚠️ Query Execution Context
- Query executed per line using document context
- Template variables like {details.item.item.n1} available
- Query complexity may impact document processing performance

### ⚠️ Business Rule Enforcement
- Strictly enforces minimum quantity requirements
- No override mechanism for exceptional cases
- May block legitimate business transactions if limits inappropriate

### ⚠️ Multiple Line Scenarios
- Correctly handles documents with multiple lines for same item
- Partial quantity distribution across lines still validates total
- Line-by-line limits vs item-total limits depend on query design

### ⚠️ Zero and Negative Quantities
- Zero quantities may violate minimum requirements
- Negative quantities handled according to business logic
- Consider impact of quantity corrections and returns

### ⚠️ Performance Considerations
- Query executed during document validation process
- Complex queries may slow document processing
- Large documents with many items increase processing time

### ⚠️ Related Actions
- Works in conjunction with EAPreventQtyMoreThan for quantity range validation
- Multiple quantity validation actions may compound performance impact
- Ensure consistent quantity validation logic across related actions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventQtyLessThan`

**Related Actions:**
- [EAPreventQtyMoreThan](EAPreventQtyMoreThan.md)


</div>

