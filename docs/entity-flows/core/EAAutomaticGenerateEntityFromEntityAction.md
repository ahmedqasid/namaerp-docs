---
title: EAAutomaticGenerateEntityFromEntityAction
module: core
---

<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityAction

**This document was generated using Claude.ai**

## Overview

Automatically generates related entities from source entities and handles their deletion when the source entity is deleted. Provides complete lifecycle management for related entity generation.

## When This Action Runs

Automatically on entity save/commit and delete operations. Creates entities after save, deletes them after source deletion. Runs without manual intervention (isAutomaticForced = true).

## How It Works

1. **Detects event type** - post-delete or post-commit
2. **Routes to handler** - deletion uses DeleteRelatedEntityAction
3. **Creates entities** - uses EAGenerateEntityFromEntityAction for creation
4. **Maintains relationships** - ensures data integrity throughout lifecycle

## Key Parameters

Uses same parameters as EAGenerateEntityFromEntityAction:

- **Parameter 1:** Target Type (Required) - Entity type to create (e.g., `CreditNote`)
- **Parameter 2:** Finder SQL (Required) - Query to find existing entity
- **Parameter 3:** Field Map (Required) - Field mapping expressions
- **Parameter 4:** Update Only (Optional) - Only update existing entities
- **Parameter 5:** Inverse Copy (Optional) - Copy fields back to source
- **Parameter 6:** Run Entity Flow Per Each Line (Optional) - Process collections
- **Parameter 7:** Insert Only (Optional) - Only create new entities
- **Parameter 8:** Apply When Query (Optional) - Conditional processing
- **Parameter 9:** Group Details By (Optional) - Group collection items
- **Parameter 10:** Run Only If (Optional) - Execution condition

### Example Field Map:
```
code=code
fromDoc=$this
customer=customer
amount=money.total
```

## Database Tables Affected

- **Source Entity** - Triggers automatic action on save/delete
- **Target Entity** - Created on commit, deleted on source deletion
- **Reference Fields** - Maintain relationships between entities

## Important Warnings

### ⚠️ Automatic Execution
- Cannot be disabled once configured (isAutomaticForced = true)
- Executes on every save/delete operation
- May trigger additional entity actions

### ⚠️ Data Integrity
- Related entity deletion may fail if dependencies exist
- Operations occur within entity transaction scope
- Failures affect source entity operations

### ⚠️ Configuration Requirements
- All parameters must be valid for both creation and deletion
- Finder SQL must return correct entity IDs
- Field maps must be compatible with target entity

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityAction`

</div>

