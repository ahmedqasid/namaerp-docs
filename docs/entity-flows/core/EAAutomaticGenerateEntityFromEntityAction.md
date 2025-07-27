---
title: EAAutomaticGenerateEntityFromEntityAction
module: core
---


<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityAction

**This document was generated using Claude.ai**

## Overview

This entity flow automatically generates related entities from source entities and handles their deletion when the source entity is deleted. It intelligently determines when to create or delete entities based on the triggering event, providing a complete lifecycle management solution for related entity generation.

## When This Action Runs

- **Trigger:** Automatically on entity save/commit and delete operations
- **Post-Commit:** Creates new entities after successful source entity save
- **Post-Delete:** Deletes related entities when source entity is deleted
- **Automatic Execution:** Runs without manual intervention (isAutomaticForced = true)
- **Event-Driven:** Responds to specific entity lifecycle events

## How It Works

### 1. Event Detection
- **Post-Delete Detection:** Checks if the action is triggered by entity deletion
- **Post-Commit Detection:** Checks if the action is triggered by entity save/commit
- **Event Routing:** Routes to appropriate handler based on event type
- **Skip Conditions:** Returns success for other event types without processing

### 2. Delete Operation Handling
- **Related Entity Deletion:** Uses DeleteRelatedEntityAction to remove generated entities
- **Cleanup Process:** Ensures related entities are properly removed
- **Data Integrity:** Maintains referential integrity during deletion
- **Cascade Management:** Handles dependent entity removal

### 3. Creation Operation Handling
- **Entity Generation:** Uses parent EAGenerateEntityFromEntityAction for creation
- **Field Mapping:** Applies configured field mappings between entities
- **Relationship Establishment:** Creates proper references between source and target
- **Business Logic:** Applies all configured generation rules and validations

### 4. Automatic Execution
- **Forced Execution:** Always executes when conditions are met (isAutomaticForced = true)
- **No Manual Trigger:** Does not require explicit user action
- **System Integration:** Seamlessly integrates with entity lifecycle management
- **Event Synchronization:** Executes at appropriate points in entity processing

## Key Features

### Intelligent Event Handling
- **Context Awareness:** Responds appropriately to different entity events
- **Bidirectional Management:** Handles both creation and deletion scenarios
- **Event Filtering:** Only processes relevant events, ignoring others
- **Performance Optimization:** Minimal overhead for non-applicable events

### Complete Lifecycle Management
- **Creation Phase:** Generates related entities with proper field mappings
- **Deletion Phase:** Removes related entities to maintain data integrity
- **Relationship Maintenance:** Ensures consistent entity relationships
- **Data Consistency:** Prevents orphaned records and referential issues

### Automatic Operation
- **Zero Configuration:** Operates automatically once configured
- **Transparent Execution:** Works behind the scenes without user intervention
- **Reliable Processing:** Consistent execution across all applicable scenarios
- **System Integration:** Fully integrated with entity framework operations

## Parameters

This action uses the same parameters as EAGenerateEntityFromEntityAction:

### Parameter 1: Target Type
- **Type:** Text (Required)
- **Format:** Entity type name for the entity to create
- **Purpose:** Specifies which type of entity to generate
- **Example:** `CreditNote`, `PaymentVoucher`, `JournalEntry`

### Parameter 2: Finder SQL
- **Type:** Text (Required)
- **Format:** SQL query returning ID of existing target entity
- **Purpose:** Locates existing entity for update operations
- **Parameter Substitution:** Supports `{fieldName}` placeholders

**Example:**
```sql
SELECT id FROM CreditNote WHERE ref5Id = {id}
```

### Parameter 3: Field Map
- **Type:** Text (Required)
- **Format:** Field mapping expressions (targetField=sourceExpression)
- **Purpose:** Defines how data flows from source to target entity

**Examples:**
```
code=code
fromDoc=$this
ref5=$this
customer=customer
amount=money.total
```

### Parameter 4: Update Only
- **Values:** `true` or `false` (Optional)
- **Purpose:** Only update existing entities, don't create new ones
- **Default:** `false` (create new if not found)

### Parameter 5: Inverse Copy
- **Type:** Text (Optional)
- **Format:** Field mapping expressions from generated back to source
- **Purpose:** Copy fields from generated entity back to source entity

**Example:**
```
ref5=$this
description5=n1
```

### Parameter 6: Run Entity Flow Per Each Line
- **Type:** Text (Optional)
- **Format:** Collection field name (e.g., "details")
- **Purpose:** Process each line in a collection separately

### Parameter 7: Insert Only
- **Values:** `true` or `false` (Optional)
- **Purpose:** Only create new entities, never update existing ones
- **Default:** `false` (update existing if found)

### Parameter 8: Apply When Query
- **Type:** Text (Optional)
- **Format:** SQL expression returning 1 (apply) or 0 (skip)
- **Purpose:** Conditional processing based on data values

**Example:**
```sql
SELECT CASE WHEN {line.item.item.itemType} = 'Service' THEN 1 ELSE 0 END
```

### Parameter 9: Group Details By
- **Type:** Text (Optional)
- **Format:** Field expression for grouping detail lines
- **Purpose:** Groups collection items for consolidated processing

### Parameter 10: Run Only If
- **Type:** Text (Optional)
- **Format:** SQL expression that must return value > 0 to execute
- **Purpose:** Prevents execution unless conditions are met

**Example:**
```sql
totalize(SELECT CASE WHEN {details.item.item.code} IN ('a','b','c') THEN 1 ELSE 0 END)
```

## Database Tables Affected

### Source Entity
- **Any Entity Type:** The entity triggering the automatic action
  - Monitored for save/commit and delete operations
  - Source of data for field mapping
  - Trigger for related entity lifecycle management

### Target Entity
- **Specified Target Type:** Entity created/deleted by the action
  - Created during post-commit operations
  - Deleted during post-delete operations
  - Populated with mapped field values

### Relationship Tables
- **Reference Fields:** Fields linking source and target entities
  - Updated to maintain proper relationships
  - Used for finding related entities during deletion
  - Critical for data integrity maintenance

## Business Use Cases

### 1. Document Generation Workflows
- **Invoice-Credit Note:** Automatically create credit notes from invoices
- **Order-Invoice:** Generate invoices from sales orders
- **Request-Order:** Create purchase orders from purchase requests
- **Contract-Invoice:** Generate invoices from contract milestones

### 2. Accounting Integration
- **Document-Journal:** Create journal entries from business documents
- **Payment-Allocation:** Generate payment allocations from receipts
- **Adjustment-Entry:** Create accounting entries from inventory adjustments
- **Closing-Reversal:** Generate reversal entries for period closing

### 3. Workflow Automation
- **Approval-Notification:** Create notifications from approval requests
- **Task-Subtask:** Generate subtasks from main tasks
- **Project-Phase:** Create project phases from project templates
- **Campaign-Activity:** Generate activities from marketing campaigns

## Important Warnings

### ⚠️ Automatic Execution
- **Forced Operation:** Cannot be disabled once configured (isAutomaticForced = true)
- **Performance Impact:** Executes on every save/delete operation
- **Cascade Effects:** May trigger additional entity actions and validations
- **Resource Usage:** Consumes system resources during entity operations

### ⚠️ Data Integrity
- **Deletion Dependencies:** Related entity deletion may fail if dependencies exist
- **Referential Integrity:** Must maintain proper relationships during all operations
- **Transaction Boundaries:** Operations occur within entity transaction scope
- **Error Propagation:** Failures in related entity operations affect source entity

### ⚠️ Configuration Dependencies
- **Parameter Validation:** All parameters must be valid for both creation and deletion
- **Field Mapping:** Field maps must be compatible with target entity structure
- **SQL Accuracy:** Finder SQL must return correct entity IDs for deletion
- **Type Compatibility:** Target entity type must support all mapped fields

### ⚠️ Event Handling
- **Event Timing:** Must execute at correct points in entity lifecycle
- **State Dependencies:** Source entity must be in proper state for processing
- **Concurrency Issues:** Multiple simultaneous operations may cause conflicts
- **Error Recovery:** Failed operations may leave system in inconsistent state

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityAction`

**Related Actions:**
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)


</div>

