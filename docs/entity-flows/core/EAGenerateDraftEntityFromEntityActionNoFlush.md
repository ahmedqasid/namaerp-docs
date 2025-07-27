---
title: EAGenerateDraftEntityFromEntityActionNoFlush
module: core
---


<div class='entity-flows'>

# EAGenerateDraftEntityFromEntityActionNoFlush

**This document was generated using Claude.ai**
Visit [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md) to know more about fields map and the available features

## Overview

Same as [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) but without automatic database flush for batch processing optimization.

## When This Action Runs

Batch draft entity creation where database flush timing needs to be controlled for performance optimization.

## How It Works

1. **Validates parameters** and identifies target entity type for generation
2. **Creates draft entity** in memory using source entity data and field mappings
3. **Applies field mappings** without database persistence
4. **Defers flush operation** keeping changes in memory for batch processing
5. **Returns generated entity** ready for manual flush when needed

## Parameters

Same parameters as [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)

## Database Tables Affected

- **Target Entity Tables** - Creates draft entities in memory (not flushed to database)
- **Source Entity Tables** - May update source entity based on inverse mapping

## Important Warnings

### ⚠️ Manual Flush Required
- Changes are NOT automatically saved to database
- Must call manual flush to persist changes
- Risk of data loss if system fails before flush

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateDraftEntityFromEntityActionNoFlush`

**Related Actions:**
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Standard draft entity generation with auto-flush
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval


</div>