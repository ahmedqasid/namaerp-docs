---
title: EAAutomaticGenerateEntityFromEntityActionWithApproval
module: core
---


<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityActionWithApproval

**This document was generated using Claude.ai**

## Overview

This entity flow automatically generates related entities from source entities while respecting approval workflows. Unlike its parent action, this version initiates approval processes for generated entities when approval definitions exist, ensuring proper business process compliance and authorization controls.

## When This Action Runs

- **Trigger:** Automatically on entity save/commit and delete operations
- **Post-Commit:** Creates new entities after successful source entity save
- **Post-Delete:** Deletes related entities when source entity is deleted
- **Approval Integration:** Initiates approval workflows for generated entities
- **Automatic Execution:** Runs without manual intervention (isAutomaticForced = true)

## How It Works

### 1. Entity Generation with Approval Consideration
- **Approval Check:** Determines if target entity type has approval definitions
- **Workflow Initiation:** Starts approval process for generated entities when required
- **Status Management:** Sets appropriate initial status based on approval requirements
- **Process Integration:** Integrates generated entities into existing approval workflows

### 2. Approval Workflow Integration
- **Definition Detection:** Checks for configured approval definitions on target entity type
- **Initial Status:** Sets generated entities to draft/pending status when approvals are required
- **Workflow Triggers:** Initiates approval processes according to business rules
- **Approval Chain:** Follows configured approval hierarchy and routing

### 3. Event-Based Processing
- **Post-Delete Handling:** Uses DeleteRelatedEntityAction to clean up generated entities
- **Post-Commit Processing:** Creates entities with proper approval status consideration
- **Event Routing:** Intelligently routes to appropriate handler based on triggering event
- **Status Preservation:** Maintains approval status throughout entity lifecycle

### 4. Business Process Compliance
- **Authorization Controls:** Ensures generated entities follow approval requirements
- **Process Consistency:** Maintains consistent approval handling across generated entities
- **Audit Trail:** Tracks approval-related activities for generated entities
- **Compliance Enforcement:** Enforces business rules through approval mechanisms

## Key Differences from Standard Automatic Action

| Aspect | EAAutomaticGenerateEntityFromEntityAction | EAAutomaticGenerateEntityFromEntityActionWithApproval |
|--------|-------------------------------------------|-------------------------------------------------------|
| **Approval Handling** | Bypasses approval workflows | Respects and initiates approval workflows |
| **Initial Status** | Active/committed status | Draft/pending status when approvals required |
| **Workflow Integration** | None | Full approval workflow integration |
| **Business Process** | Direct generation | Process-compliant generation |
| **Authorization** | Immediate activation | Controlled through approvals |

## Approval Workflow Behavior

### When Approval Definitions Exist
- **Initial Status:** Generated entities start in draft/pending status
- **Workflow Initiation:** Approval process begins automatically
- **Routing:** Follows configured approval routing rules
- **Notifications:** Sends notifications to designated approvers
- **Status Tracking:** Monitors approval progress and status changes

### When No Approval Definitions Exist
- **Direct Activation:** Entities are created in active status
- **Immediate Availability:** Generated entities are immediately usable
- **No Workflow Overhead:** Operates efficiently without approval processes
- **Standard Processing:** Functions like standard automatic generation

## Parameters

Inherits all parameters from EAAutomaticGenerateEntityFromEntityAction:

### Parameter 1: Target Type
- **Type:** Text (Required)
- **Format:** Entity type name for the entity to create
- **Approval Impact:** Checked for approval definition configuration
- **Example:** `PurchaseOrder`, `PaymentVoucher`, `JournalEntry`

### Parameter 2: Finder SQL
- **Type:** Text (Required)
- **Format:** SQL query returning ID of existing target entity
- **Purpose:** Locates existing entity for update operations

### Parameter 3: Field Map
- **Type:** Text (Required)
- **Format:** Field mapping expressions (targetField=sourceExpression)
- **Purpose:** Defines data flow from source to target entity

### Additional Parameters 4-10
- **Inheritance:** All parameters from parent action apply
- **Approval Consideration:** All mappings respect approval workflow requirements
- **Process Integration:** Parameters work within approval context

## Database Tables Affected

### Primary Entity Tables
- **Source Entity:** Triggering entity for automatic generation
- **Target Entity:** Generated entity with approval status consideration
  - Initial status may be draft/pending if approvals required
  - Progresses through approval workflow states

### Approval System Tables
- **ApprovalCase:** Created when approval workflows are initiated
  - Links generated entity to approval process
  - Tracks approval progress and decisions
  - Maintains approval audit trail

- **ApprovalDefinition:** Referenced to determine approval requirements
  - Checked for target entity type
  - Defines approval routing and rules
  - Determines if workflow initiation is needed

### Status and Workflow Tables
- **Entity Status Fields:** Updated based on approval requirements
- **Workflow State:** Managed through approval process progression
- **Audit Logs:** Enhanced with approval-related activities

## Business Use Cases

### 1. Controlled Document Generation
- **Purchase Orders from Requests:** Generate purchase orders requiring approval
- **Credit Notes from Returns:** Create credit notes with approval workflow
- **Journal Entries from Adjustments:** Generate accounting entries requiring authorization
- **Contracts from Proposals:** Create contracts requiring legal approval

### 2. Financial Control Processes
- **Payment Authorization:** Generate payment vouchers requiring approval
- **Expense Processing:** Create expense documents with approval workflows
- **Budget Adjustments:** Generate budget changes requiring authorization
- **Asset Transfers:** Create asset movement documents with approval controls

### 3. Multi-Level Authorization
- **Hierarchical Approvals:** Support multi-level approval processes
- **Department Routing:** Route approvals based on organizational structure
- **Amount-Based Rules:** Apply approval rules based on monetary thresholds
- **Risk-Based Controls:** Implement approval controls based on risk assessment

## Important Warnings

### ⚠️ Approval Configuration Requirements
- **Definition Setup:** Target entity types must have proper approval definitions configured
- **Routing Rules:** Approval routing must be properly configured for smooth workflow
- **User Permissions:** Approvers must have proper permissions for target entity types
- **Workflow Testing:** Approval processes should be thoroughly tested before production use

### ⚠️ Performance Considerations
- **Workflow Overhead:** Approval initiation adds processing time to entity generation
- **Database Load:** Additional approval-related database operations
- **Notification Impact:** Approval notifications may increase system load
- **Process Complexity:** More complex error handling due to approval integration

### ⚠️ Business Process Impact
- **Delayed Availability:** Generated entities may not be immediately active
- **Approval Dependencies:** Entity availability depends on approval completion
- **Process Training:** Users need training on approval workflows
- **Workflow Management:** Requires ongoing approval process management

### ⚠️ Error Handling Complexity
- **Approval Failures:** Failed approval initiation affects entity generation
- **Workflow Errors:** Approval process errors may leave entities in inconsistent states
- **Recovery Procedures:** More complex error recovery due to approval integration
- **Monitoring Requirements:** Enhanced monitoring needed for approval processes

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation
- **Field Mapping Guide:** Visit https://docs.namasoft.com/guide/entity-flows/ea-fields-values-calculator.html

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityActionWithApproval`

**Related Actions:**
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)


</div>

