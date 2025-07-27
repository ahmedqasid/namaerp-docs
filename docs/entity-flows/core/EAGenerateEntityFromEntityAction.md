---
title: EAGenerateEntityFromEntityAction
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityAction

**This document was generated using Claude.ai**
Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

Creates new entities from existing entities with full database commitment. Core action for most document generation workflows providing field mapping, conditional processing, and automatic persistence.

## When This Action Runs

Manual execution or automated through entity flows requiring full document generation with immediate commitment.

## How It Works

1. **Analyzes source entity** for data extraction
2. **Maps fields** from source to target based on configuration  
3. **Searches for existing** target entities using finder SQL
4. **Creates or updates** target entity with mapped values
5. **Commits to database** with full validation and business rules
6. **Triggers workflows** and related processes

## Key Parameters

- **Parameter 1:** Target Type (Required) - Entity type to create (e.g., `SalesInvoice`, `CreditNote`)
- **Parameter 2:** Finder SQL (Required) - Query to find existing entity for updates
- **Parameter 3:** Field Map (Optional) - Field mapping configuration (`targetField=sourceValue`)
- **Parameter 4:** Update Only (Optional) - Only update existing entities, don't create new
- **Parameter 5:** Inverse Copy (Optional) - Copy fields back from generated to source entity
- **Parameter 6:** Run Per Each Line (Optional) - Execute for each collection item
- **Parameter 7:** Insert Only (Optional) - Only create new entities, don't update existing
- **Parameter 8:** Apply When Query (Optional) - Conditional logic for generation
- **Parameter 9:** Group Details By (Optional) - Group detail lines by criteria
- **Parameter 10:** Run Only If (Optional) - Execute only if expression returns > 0

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with full commitment
- **Source Entity Table** - May update via inverse copy configuration  
- **Detail Collections** - Generates detail lines based on source collections
- **Related Tables** - Updates cross-references and relationships

## Important Warnings

### ⚠️ Immediate Commitment
- Generated entities are immediately committed and cannot be easily rolled back
- All validation rules must be satisfied before generation
- May trigger immediate downstream processes and workflows

### ⚠️ Performance Impact  
- Complex field mappings and SQL queries impact system performance
- Large datasets require careful optimization
- Monitor database resource usage during operations

### ⚠️ Dependencies
- Generated entities may trigger multiple downstream processes
- Field mappings must maintain data consistency
- Requires proper testing and validation

## Related Actions

- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction`

</div>