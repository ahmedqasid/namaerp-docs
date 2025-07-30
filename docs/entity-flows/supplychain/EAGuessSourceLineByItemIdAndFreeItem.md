---
title: EAGuessSourceLineByItemIdAndFreeItem
module: supplychain
---


<div class='entity-flows'>

# EAGuessSourceLineByItemIdAndFreeItem

**This document was generated using Claude.ai**

## Overview

Automatically matches document lines to their corresponding source lines when the normal origin/from document relationships are missing or broken. This enhanced version also considers the "free item" status when matching lines, ensuring free items only match with other free items and regular items only match with regular items.

## When This Action Runs

Manual execution on documents with missing or incorrect line relationships, typically after data migration, document imports, or when origin document links are corrupted. Most commonly used for invoices and sales documents where free item distinction is important.

## How It Works

1. **Identifies unlinked lines** - Finds document lines without valid origin or from document references
2. **Searches potential matches** - Looks for lines in source documents with matching item IDs
3. **Applies matching criteria** - Compares lines based on enabled parameters (size, color, etc.)
4. **Free item validation** - Ensures free items only match with other free items
5. **Selects best match** - Chooses the most similar line based on all matching criteria
6. **Updates relationships** - Sets the origin line reference to establish proper document linkage

## Parameters

**Parameter 1:** Consider Size (Optional) - true/false to match size dimensions

**Parameter 2:** Consider Color (Optional) - true/false to match color dimensions  

**Parameter 3:** Consider Revision (Optional) - true/false to match revision dimensions

**Parameter 4:** Consider Lot ID (Optional) - true/false to match lot tracking

**Parameter 5:** Consider Box (Optional) - true/false to match box dimensions

**Parameter 6:** Consider Warehouse (Optional) - true/false to match warehouse locations

**Parameter 7:** Consider Sales Man or Purchases Man (Optional) - true/false to match responsible person

**Parameter 8:** Consider Ref 1 (Optional) - true/false to match reference field 1

**Parameter 9:** Consider Ref 2 (Optional) - true/false to match reference field 2

**Parameter 10:** Consider Locator (Optional) - true/false to match storage locations

**Parameter 11:** Consider SubItem (Optional) - true/false to match sub-item references

**Parameter 12:** Consider Active Percentage (Optional) - true/false to match active percentages

**Parameter 13:** Consider Inactive Percentage (Optional) - true/false to match inactive percentages

**Parameter 14:** Consider Remarks (Optional) - true/false to match remarks/notes

**Parameter 15:** Apply Only If Query Applicable (Optional) - Conditional execution query

```sql
select case when {details.item.item.code} in ('A','B') then 1 else 0 end
```

## Database Tables Affected

- **Document Lines** - Updates origin line references for matched lines
- **Source Document Lines** - Reads potential match candidates (read-only)
- **Item Master Data** - Uses item references for matching (read-only)

## Important Warnings

### ⚠️ Free Item Matching Logic
- Free items only match with other free items
- Regular (non-free) items only match with regular items
- This prevents incorrect associations between promotional and regular sales
- Critical for accurate revenue recognition and inventory tracking

### ⚠️ Matching Accuracy Dependencies
- More enabled parameters increase matching accuracy but reduce match probability
- Consider business requirements when selecting matching criteria
- Too many criteria may prevent valid matches from being found

### ⚠️ Missing Origin Document Impact
- Only processes lines without existing valid relationships
- Will not override existing correct origin line references
- May not find matches if source documents are unavailable

### ⚠️ Multiple Match Scenarios
- Uses "best match" logic when multiple candidates exist
- May not always select the expected match in ambiguous cases
- Review results carefully in complex document scenarios

### ⚠️ Invoice Line Type Requirements
- Free item logic only applies to invoice lines (IInvoiceLine interface)
- Other document types use standard matching without free item consideration
- Ensure document types support the free item field

### ⚠️ Data Consistency Impact
- Changes affect document traceability and audit trails
- May impact downstream processes relying on document relationships
- Consider business workflow implications before execution

### ⚠️ Conditional Execution
- Query condition must return numeric result (0=skip, >0=process)
- Applied at line level - each line evaluated separately
- Complex conditions may impact performance

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineByItemIdAndFreeItem`

**Parent Class:** `EAGuessSourceLineIdByItem`

**Related Actions:**
- [EAGuessSourceLineIdByItem](EAGuessSourceLineIdByItem.md) - Base version without free item consideration


</div>