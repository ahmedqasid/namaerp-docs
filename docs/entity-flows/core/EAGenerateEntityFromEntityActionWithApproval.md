---
title: EAGenerateEntityFromEntityActionWithApproval
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionWithApproval

**This document was generated using Claude.ai**

Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

Creates new entities from existing entities with full commitment and approval process integration. Combines standard entity generation with approval workflow integration and immediate database flush.

## When This Action Runs

Manual execution or automated through entity flows for entity creation requiring approval workflows and immediate database commitment.

## How It Works

1. **Performs standard entity generation** with full validation and field mapping
2. **Integrates with approval workflows** - submits entity for approval through configured workflows
3. **Commits to database immediately** with auto-flush for real-time availability
4. **Tracks approval status** and maintains approval history and audit trails

## Key Parameters

Same as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) but with approval workflow integration.

## Key Difference

**Approval Integration:** Automatically submits generated entities for approval through configured approval workflows while maintaining immediate database commitment.

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with approval status immediately  
- **Approval Tables** - Creates approval requests and maintains approval history
- **Source Entity Table** - May update via inverse copy configuration
- **Related Tables** - Updates cross-references with immediate flush

## Important Warnings

### ⚠️ Approval Dependencies
- Requires proper approval workflow configuration and authority matrix
- Approval workflow engine must be operational
- Generated entities are immediately committed with no rollback

### ⚠️ Performance Impact
- Approval processing adds overhead to entity generation
- Immediate persistence with approval workflows may impact performance
- System must meet real-time processing requirements

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md)
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionWithApproval`

</div>