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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventQtyLessThan`

**Related Actions:**
- [EAPreventQtyMoreThan](EAPreventQtyMoreThan.md)


</div>

