---
title: EAGenerateEntityFromEntityActionWithApproval
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionWithApproval

**This document was generated using Claude.ai**

Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

This entity flow creates new entities from existing entities with full commitment, approval process integration, and immediate database flush. It combines the comprehensive field mapping and validation of standard entity generation with approval workflow integration and automatic database persistence for real-time processing scenarios.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for entity creation with approval workflows
- **Target:** Any entity type requiring full document generation with approval process and immediate availability
- **Purpose:** Create fully committed entities with approval integration for immediate use and workflow processing
- **Timing:** Used when entities require approval workflow integration and immediate database commitment

## How It Works

### 1. Complete Entity Generation with Approval
- **Standard Generation:** Performs all standard entity generation operations
- **Full Validation:** Applies all validation rules and business logic
- **Approval Integration:** Integrates with approval workflow systems during entity creation
- **Field Mapping:** Maps fields comprehensively from source to target entity

### 2. Approval Workflow Processing
- **Approval Request:** Submits generated entity for approval through configured workflows
- **Approval Rules:** Applies approval rules and routing logic
- **Approval Status:** Sets appropriate approval status on generated entity
- **Workflow Integration:** Integrates with approval workflow engines and processes

### 3. Immediate Database Commitment
- **Auto-Flush:** Automatically flushes database changes after entity creation and approval
- **Immediate Persistence:** Commits changes to database immediately
- **Real-Time Availability:** Makes entities immediately available for use
- **Workflow Triggers:** Immediately triggers related workflows and processes

### 4. Approval State Management
- **Approval Tracking:** Tracks approval status and workflow state in database
- **Approval History:** Maintains approval history and audit trails
- **Approval Dependencies:** Manages dependencies on approval processes
- **Workflow Coordination:** Coordinates with approval workflow systems

## Key Features

### Approval Workflow Integration
- **Automatic Approval Submission:** Automatically submits entities for approval
- **Approval Rules Engine:** Integrates with approval rules and routing
- **Multi-Level Approvals:** Supports multi-level approval processes
- **Approval Status Tracking:** Tracks approval status throughout process

### Immediate Database Persistence
- **Auto-Flush:** Database changes are automatically flushed
- **Real-Time Processing:** Immediate processing for real-time scenarios
- **Immediate Availability:** Entities are immediately available for use
- **Workflow Integration:** Immediate workflow trigger integration

### Complete Entity Processing
- **Full Validation:** All validation rules and constraints are enforced
- **Business Rules:** All business rules are applied during generation
- **Committed Status:** Generated entities are fully committed with approval status
- **Immediate Integration:** Ready for immediate system integration

## Parameters

This entity flow uses the same parameters as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md):

### Parameter 1: Target Type (Required)
- **Type:** Entity Type
- **Purpose:** Specifies the type of entity to create
- **Format:** Entity type name (e.g., "SalesInvoice", "PurchaseOrder")

### Parameter 2: Finder SQL (Required)
- **Type:** SQL Query
- **Purpose:** SQL query to find existing target entity for updates
- **Format:** SQL SELECT statement returning entity ID
- **Field References:** Use {fieldName} to reference source entity fields

**Validated Finder SQL Examples:**
```sql
-- Find existing credit note for sales invoice
SELECT id FROM CreditNote WHERE ref5Id = {id}

-- Find payment voucher for customer reference
SELECT id FROM PaymentVoucher WHERE ref1Id = {ref1.id} AND valueDate = {valueDate}

-- Always create new (return nothing)
SELECT id FROM SalesInvoice WHERE 1 = 0
```

### Parameter 3: Field Map (Optional)
- **Type:** Multi-line field mapping configuration
- **Purpose:** Defines how fields are copied from source to target
- **Format:** `targetField=sourceValue` with comprehensive syntax support
- **Reference:** Visit the [Field Mapping Guide](../../guide/entity-flows/ea-fields-values-calculator.md) for complete syntax

### Parameter 4-10: Additional Parameters
- **Update Only:** Boolean flag for update-only mode
- **Inverse Copy:** Copy fields from generated entity back to source
- **Run Per Line:** Execute for each line in specified collection
- **Insert Only:** Boolean flag for insert-only mode
- **Apply When Query:** Conditional logic for generation
- **Group Details By:** Grouping criteria for detail processing
- **Run Only If:** Conditional execution based on expression

## Database Tables Affected

### Target Entity Tables
- **Generated Entity:** Creates or updates records in target entity table immediately
- **Committed Status:** Entity is fully committed and validated with approval status
- **Approval Fields:** Updates approval-related fields and status
- **Immediate Persistence:** Changes are immediately persisted to database

### Approval Workflow Tables
- **Approval Requests:** Creates approval request records for workflow processing
- **Approval History:** Maintains approval history and audit trails
- **Workflow State:** Updates workflow state and tracking information
- **Approval Dependencies:** Manages approval dependencies and relationships

### Source Entity Updates
- **Inverse Mapping:** Updates source entity fields based on inverse copy
- **Reference Updates:** Updates source entity with references to generated entity
- **Approval Status:** May update source entity with approval-related information
- **Immediate Persistence:** All changes are immediately persisted

### Automatic Database Effects
- **Code Generation:** May trigger automatic code generation sequences
- **Ledger Entries:** May create accounting ledger entries if applicable
- **Workflow Triggers:** Immediately triggers workflow processes and state changes
- **Audit Trails:** Creates comprehensive audit trails for generated entities and approvals

## Business Use Cases

### 1. Real-Time Financial Approvals
- **High-Value Transactions:** Generate financial documents requiring immediate approval
- **Credit Approvals:** Create credit documents requiring real-time approval processing
- **Payment Authorizations:** Generate payment documents requiring immediate authorization
- **Financial Controls:** Implement real-time financial controls through approval processes

### 2. Operational Workflow Integration
- **Production Approvals:** Generate production orders requiring immediate supervisor approval
- **Service Authorizations:** Create service orders requiring immediate manager approval
- **Quality Approvals:** Generate quality control documents requiring immediate approval
- **Resource Approvals:** Create resource allocation documents requiring immediate approval

### 3. Customer-Facing Processes
- **Order Confirmations:** Generate customer orders requiring immediate approval and confirmation
- **Service Requests:** Create service requests requiring immediate approval and processing
- **Contract Approvals:** Generate contracts requiring immediate legal or management approval
- **Delivery Authorizations:** Create delivery documents requiring immediate approval

### 4. Compliance and Regulatory
- **Regulatory Approvals:** Generate regulatory documents requiring immediate approval
- **Compliance Checks:** Create compliance documents requiring immediate verification
- **Audit Requirements:** Generate audit documents requiring immediate approval
- **Legal Approvals:** Create legal documents requiring immediate legal approval

## Approval Integration Benefits

### Real-Time Governance
- **Immediate Approval Routing:** Immediately routes documents through approval workflows
- **Real-Time Control:** Provides real-time governance and control
- **Instant Notifications:** Immediate notifications to approvers
- **Dynamic Authority Matrix:** Real-time authority matrix application

### Workflow Integration
- **Immediate Workflow Triggers:** Triggers workflows immediately after generation
- **Real-Time Status Updates:** Provides real-time approval status updates
- **Instant Process Integration:** Immediate integration with business processes
- **Dynamic Routing:** Real-time dynamic routing based on approval rules

### Customer and User Experience
- **Immediate Feedback:** Provides immediate feedback to users
- **Real-Time Status:** Real-time approval status for customer-facing processes
- **Instant Processing:** Immediate processing for time-sensitive operations
- **Responsive Operations:** Responsive operations for critical business processes

## Important Warnings

### ⚠️ Immediate Commitment with Approvals
- **No Rollback:** Generated entities with approval status are immediately committed
- **Approval State Persistence:** Approval state is immediately persisted to database
- **Process Triggers:** May immediately trigger downstream processes and workflows
- **Resource Impact:** Immediate commitment with approval processing may impact system resources

### ⚠️ Approval Process Dependencies
- **Approval Configuration:** Requires proper approval workflow configuration
- **Approval Rules:** Approval rules must be properly defined and tested
- **Authority Matrix:** Authority matrix must be current and accurate
- **Workflow Engine:** Approval workflow engine must be operational

### ⚠️ Performance Considerations with Approvals
- **Approval Processing Overhead:** Approval processing adds overhead to entity generation
- **Database Performance:** Immediate persistence with approval may impact database performance
- **Workflow Performance:** Approval workflow processing may impact overall performance
- **Resource Usage:** Monitor resource usage during approval processing

### ⚠️ Workflow and Process Dependencies
- **Immediate Workflows:** Workflows are triggered immediately, requiring system readiness
- **Integration Dependencies:** Immediate integration with external systems required
- **Process Coordination:** Must coordinate with dependent processes immediately
- **Real-Time Requirements:** System must meet real-time processing requirements

## Best Practices

### Approval Workflow Management
- **Workflow Testing:** Thoroughly test approval workflows before deployment
- **Approval Rules Validation:** Validate approval rules and routing logic
- **Authority Matrix Maintenance:** Maintain current and accurate authority matrix
- **Workflow Monitoring:** Monitor approval workflow performance and status

### Real-Time Processing Optimization
- **Performance Tuning:** Tune system for real-time approval processing
- **Resource Planning:** Plan resources for immediate processing requirements
- **Monitoring Setup:** Set up monitoring for real-time approval processing
- **Error Handling:** Implement robust error handling for real-time scenarios

### Database and System Optimization
- **Database Tuning:** Optimize database for immediate persistence with approvals
- **Connection Pooling:** Configure appropriate connection pooling for approval processing
- **Index Optimization:** Ensure appropriate indexes for approval queries
- **System Monitoring:** Monitor system performance during approval processing

### Integration and Coordination
- **Workflow Coordination:** Coordinate with workflow systems for immediate processing
- **External Systems:** Ensure external systems are ready for immediate integration
- **Notification Systems:** Configure immediate notifications for approval processes
- **Escalation Procedures:** Implement escalation procedures for approval delays

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionWithApproval`

**Related Actions:**
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) - Standard entity generation with auto-flush
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Entity generation with approval, no flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard generation without flush
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Draft entity generation


</div>