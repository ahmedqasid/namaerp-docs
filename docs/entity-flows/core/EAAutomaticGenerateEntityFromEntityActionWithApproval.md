---
title: EAAutomaticGenerateEntityFromEntityActionWithApproval
module: core
---

<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityActionWithApproval

**This document was generated using Claude.ai**

## Overview

Automatically generates related entities from source entities while respecting approval workflows. Initiates approval processes for generated entities when approval definitions exist.

## When This Action Runs

Automatically on entity save/commit and delete operations. Runs without manual intervention (isAutomaticForced = true).

## How It Works

1. **Checks approval definitions** for target entity type
2. **Creates entities** with draft/pending status if approvals required
3. **Initiates approval workflow** when definitions exist
4. **Handles deletion** using DeleteRelatedEntityAction for cleanup

## Key Difference

Unlike standard automatic generation, this version:
- Respects approval workflows instead of bypassing them
- Creates entities in draft/pending status when approvals required
- Initiates approval processes automatically
- Provides controlled activation through authorization

## Key Parameters

Inherits all parameters from EAAutomaticGenerateEntityFromEntityAction:
- **Target Type** - Entity type to create (checked for approval definitions)
- **Finder SQL** - Query to find existing entity
- **Field Map** - Field mapping expressions
- **Parameters 4-10** - All parent action parameters apply

## Database Tables Affected

- **Source/Target Entities** - Generated with approval status consideration
- **ApprovalCase** - Created when workflows initiated
- **ApprovalDefinition** - Checked for workflow requirements

## Important Warnings

### ⚠️ Approval Configuration
- Target entity types must have approval definitions configured
- Approval routing must be properly set up
- Approvers need proper permissions

### ⚠️ Performance Impact
- Approval initiation adds processing overhead
- Generated entities may not be immediately active
- More complex error handling required

## Related Actions

- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityActionWithApproval`

</div>

