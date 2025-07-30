---
title: EAGenAndItemSizesAndColorsAndRevisions
module: supplychain
---


<div class='entity-flows'>

# EAGenAndItemSizesAndColorsAndRevisions

**This document was generated using Claude.ai**

## Overview

Automatically creates missing size, color, and revision master files and adds them to item configurations based on document line dimensions. Generates new master data records when document lines reference dimensions that don't exist in the item's configuration.

## When This Action Runs

Manual execution when documents contain size, color, or revision dimensions that need to be added to item master configurations, typically during data migration or when new product variants are introduced.

## How It Works

1. **Processes document lines** - Iterates through all lines in the supply chain document
2. **Checks item dimensions** - Examines size, color, and revision values on each line
3. **Validates against item config** - Compares line dimensions with item's existing configurations
4. **Creates missing master files** - Generates new size, color, or revision master records if needed
5. **Updates item configuration** - Adds new dimensions to the item's available options
6. **Commits changes** - Saves updated item records with new dimension configurations

## Parameters

### Size Configuration
**Parameter 1:** Add Size to Item (Optional) - true/false to add sizes not found in item (default: false)

**Parameter 2:** Create Size Master File (Optional) - true/false to create missing size master records (default: false)

**Parameter 3:** Size Fields Map (Optional) - Field mapping for size master file creation

### Color Configuration  
**Parameter 4:** Add Color to Item (Optional) - true/false to add colors not found in item (default: false)

**Parameter 5:** Create Color Master File (Optional) - true/false to create missing color master records (default: false)

**Parameter 6:** Color Fields Map (Optional) - Field mapping for color master file creation

### Revision Configuration
**Parameter 7:** Add Revision to Item (Optional) - true/false to add revisions not found in item (default: false)

**Parameter 8:** Create Revision Master File (Optional) - true/false to create missing revision master records (default: false)

**Parameter 9:** Revision Fields Map (Optional) - Field mapping for revision master file creation

## Database Tables Affected

- **InvItem** - Updates item configurations with new size, color, and revision options
- **Size Master Files** - Creates new size records if configured
- **Color Master Files** - Creates new color records if configured
- **Revision Master Files** - Creates new revision records if configured
- **Item Configuration Tables** - Links new dimensions to items

## Important Warnings

### ⚠️ Master File Creation
- Only creates master files when both "Add to Item" and "Create Master File" are true
- New master files use default field mappings unless specified
- Master file creation is permanent and affects system-wide options

### ⚠️ Item Configuration Impact
- Modifies item master records permanently
- New dimensions become available for all future transactions
- May affect existing business rules and validations

### ⚠️ Dimension Validation
- No validation of dimension values before adding to items
- Invalid or duplicate dimensions may be created
- Consider business impact of new dimension options

### ⚠️ Field Mapping Requirements
- Field maps must match target master file structure
- Invalid field mappings may cause master file creation failures
- Test field mappings with sample data before production use

### ⚠️ Performance Considerations
- Processes each document line individually
- Large documents with many new dimensions may be slow
- Master file creation adds database overhead

### ⚠️ Data Consistency
- New dimensions apply immediately to item configurations
- May affect pending transactions and inventory tracking
- Consider impact on existing stock with different dimensions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenAndItemSizesAndColorsAndRevisions`


</div>