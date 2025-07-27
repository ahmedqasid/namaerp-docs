---
title: EAGenerateEntityFromEntityActionNoFlush
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlush

**This document was generated using Claude.ai**

## Overview

Creates new entities from existing entities with full commitment but without immediate database flush. Same as standard generation but defers database synchronization for batch processing and performance optimization.

## When This Action Runs

Manual execution or automated through entity flows for batch entity creation where multiple entities are generated before database flush.

## How It Works

1. **Performs standard entity generation** with full validation and field mapping
2. **Creates fully committed entities** (not draft status)
3. **Defers database flush** - changes remain in memory until manual flush
4. **Optimizes for batch processing** - reduces database I/O operations

## Key Parameters

Same as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) but without immediate database flush.

## Key Difference

**No Database Flush:** Changes remain in memory until manual flush, optimizing batch processing performance.

## Database Tables Affected

- **Target Entity Table** - Creates/updates records in memory (not flushed to database)
- **Source Entity Table** - May update via inverse copy (in memory)
- **Related Tables** - All changes remain in memory until manual flush

## Important Warnings

### ⚠️ Manual Flush Required
- Changes are NOT automatically saved to database
- Risk of data loss if system fails before manual flush
- Must ensure proper batch completion and flush

### ⚠️ Memory & Performance  
- Large batches may consume significant memory
- Workflows and external integrations deferred until flush
- Requires careful transaction boundary management

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlush`

</div>