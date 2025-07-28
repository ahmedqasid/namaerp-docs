---
title: EAPreventQtyMoreThan
module: supplychain
---


<div class='entity-flows'>

# EAPreventQtyMoreThan

**This document was generated using Claude.ai**

## Overview

Validates that document line quantities do not exceed maximum quantity limits by comparing actual quantities against configurable maximum thresholds. Prevents processing of supply chain documents when item quantities exceed specified limits, ensuring compliance with inventory controls and operational constraints.

## When This Action Runs

Validation during document processing before commitment. Typically used on sales orders, purchase orders, or inventory documents where maximum quantity constraints must be enforced to prevent over-ordering, over-selling, or exceeding storage capacity.

## How It Works

1. **Groups document lines** - Organizes lines by item to calculate total quantities per item
2. **Executes quantity query** - Runs the provided query to determine maximum quantity limits
3. **Calculates totals** - Sums base quantities for each item across all document lines
4. **Compares quantities** - Checks if total quantity exceeds maximum allowed limits
5. **Reports violations** - Creates failure results for items above maximum thresholds

## Parameters

**Parameter 1:** Maximum Qty Calculation Query (Required) - Query to determine maximum quantity limits for each item

## Example Query

```sql
select {details.item.item.n1}
```

This example uses the n1 field from the item master as the maximum quantity.

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
- Prevents document processing when quantities exceed maximum
- All validation failures must be resolved before document can proceed
- Error messages include specific item and quantity information

### ⚠️ Maximum Limit Logic
- Uses less-than-or-equal comparison (limit ≤ quantity triggers failure)
- Equal quantities to limit also trigger validation failure
- Consider if limit should be exclusive or inclusive

### ⚠️ Query Result Interpretation
- Assumes query returns maximum quantity limits as first column
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
- Strictly enforces maximum quantity requirements
- No override mechanism for exceptional cases
- May block legitimate business transactions if limits inappropriate

### ⚠️ Multiple Line Scenarios
- Correctly handles documents with multiple lines for same item
- Partial quantity distribution across lines still validates total
- Line-by-line limits vs item-total limits depend on query design

### ⚠️ Inventory Control Integration
- Useful for preventing over-selling of limited inventory
- May complement available quantity checks in other systems
- Consider integration with real-time inventory updates

### ⚠️ Performance Considerations
- Query executed during document validation process
- Complex queries may slow document processing
- Large documents with many items increase processing time

### ⚠️ Capacity Management
- Can enforce storage capacity limits
- Useful for controlling maximum order sizes
- Consider impact on bulk order processing

### ⚠️ Related Actions
- Works in conjunction with EAPreventQtyLessThan for quantity range validation
- Multiple quantity validation actions may compound performance impact
- Ensure consistent quantity validation logic across related actions

### ⚠️ Zero Limit Handling
- Zero maximum limit prevents any quantity for the item
- May be used to block specific items from being ordered
- Consider business impact of zero quantity limits

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventQtyMoreThan`

**Related Actions:**
- [EAPreventQtyLessThan](EAPreventQtyLessThan.md)


</div>

