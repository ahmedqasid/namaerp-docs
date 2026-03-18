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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventQtyMoreThan`

**Related Actions:**
- [EAPreventQtyLessThan](EAPreventQtyLessThan.md)


</div>

