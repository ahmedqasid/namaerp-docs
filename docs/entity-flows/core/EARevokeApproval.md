---
title: EARevokeApproval
module: core
---


<div class='entity-flows'>

# EARevokeApproval

**This document was generated using Claude.ai**

## Overview

Revokes approval for entities currently in approval workflows. Can target the current entity, entities referenced through fields, or entities found by SQL query. Includes safety checks to prevent revoking partially completed approvals.

## When This Action Runs

Manual execution when approval workflows need to be reset, cancelled, or restarted due to data changes, errors, or business process requirements.

## How It Works

1. **Determines target entities** - Current entity (if no parameters), entities from reference field, or entities from SQL query
2. **Validates approval state** - Ensures entities are currently in active approval cycles
3. **Checks partial approvals** - Prevents revoking approvals that have already been partially processed (unless forced)
4. **Revokes approval** - Calls EntityMediator.revokeApproval() to reset approval workflow
5. **Handles multiple entities** - Processes all target entities with individual validation

## Parameters

**Parameter 1:** Field Name (Optional) - Field ID pointing to entities to revoke approval for (can be in detail collections)
**Parameter 2:** Finder query (Optional) - SQL query returning entityType and id/code columns
- Example Query:
```
select entityType,id from SalesInvoice where ref1Id = {id} and documentFileStatus = 'ApprovalPending'
```
**Parameter 3:** Force Revoke Partially Approved (Optional) - true to allow revoking approvals with existing approval steps (default: false)

## Database Tables Affected

- **Approval Case Tables** - Resets current approval case and workflow state
- **Approval Step Tables** - May clear existing approval steps
- **Entity Status Fields** - Updates entity approval status and workflow state
- **Query Target Tables** - Reads from tables specified in finder query

## Important Warnings

### ⚠️ Approval State Requirements
- Entities must be currently in active approval cycles
- Entities not in approval workflow are skipped with warning
- Cannot revoke approvals for entities without current approval cases

### ⚠️ Partial Approval Protection
- By default, prevents revoking approvals with existing approval steps
- Use Parameter 3 (Force) carefully as it removes completed approval steps
- Partial revocation may impact audit trails and approval history

### ⚠️ Business Process Impact
- Revoking approval resets the entire approval workflow
- May require entities to restart approval process from beginning
- Can impact business timelines and approval deadlines

### ⚠️ Multi-Entity Operations
- When using field references or SQL queries, multiple entities may be affected
- Each entity is validated individually before approval revocation
- Failed entities are skipped but operation continues for remaining entities

### ⚠️ Query Requirements
- SQL query must return at least 2 columns: entityType and id/code
- Use proper WHERE conditions to avoid unintended mass operations
- Query results must reference valid, existing entities

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARevokeApproval`


</div>