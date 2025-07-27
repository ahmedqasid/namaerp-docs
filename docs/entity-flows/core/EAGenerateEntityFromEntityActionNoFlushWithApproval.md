---
title: EAGenerateEntityFromEntityActionNoFlushWithApproval
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlushWithApproval

**This document was generated using Claude.ai**

Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

Combines entity generation with approval workflow integration but without immediate database flush for batch processing optimization.

## When This Action Runs

Batch entity creation requiring approval workflows where database flush timing needs to be controlled.

## How It Works

1. **Generates entity** using standard field mapping and validation
2. **Submits for approval** through configured approval workflows
3. **Sets approval status** on generated entity
4. **Defers database flush** keeping changes in memory
5. **Maintains approval state** until manual flush

## Parameters

Same parameters as [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) with approval workflow integration

## Database Tables Affected

- **Target Entity Tables** - Creates entities in memory with approval status (not flushed)
- **Approval Workflow Tables** - Creates approval requests and workflow tracking
- **Source Entity Tables** - May update based on inverse mapping

## Important Warnings

### ⚠️ Approval Process Dependencies
- Requires proper approval workflow configuration
- Approval rules must be properly defined and tested
- Authority matrix must be current and accurate

### ⚠️ Manual Flush Required
- Changes are NOT automatically saved to database
- Approval state remains in memory until flush
- Risk of losing approval state if system fails before flush

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlushWithApproval`

**Related Actions:**
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Entity generation with approval and auto-flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md) - Draft generation without flush
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Draft entity generation


</div>