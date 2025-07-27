---
title: EAGenerateEntityFromEntityActionNoFlushWithApproval
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlushWithApproval

**This document was generated using Claude.ai**

Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

This entity flow creates new entities from existing entities with full commitment, approval process integration, but without immediate database flush. It combines the comprehensive field mapping and validation of standard entity generation with approval workflow integration and deferred database synchronization for batch processing scenarios.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for batch entity creation with approval workflows
- **Target:** Any entity type requiring full document generation with approval process but without immediate database flush
- **Purpose:** Create fully committed entities with approval integration efficiently in batch scenarios
- **Timing:** Used in bulk processing scenarios where entities require approval workflow integration before database flush

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

### 3. Database Transaction Management
- **No Auto-Flush:** Prevents automatic database flush after entity creation and approval
- **Transaction Deferral:** Defers database synchronization until manual flush
- **Memory Persistence:** Maintains committed and approved changes in memory
- **Batch Optimization:** Optimizes performance for batch processing with approval workflows

### 4. Approval State Management
- **Approval Tracking:** Tracks approval status and workflow state
- **Approval History:** Maintains approval history and audit trails
- **Approval Dependencies:** Manages dependencies on approval processes
- **Workflow Coordination:** Coordinates with approval workflow systems

## Key Features

### Approval Workflow Integration
- **Automatic Approval Submission:** Automatically submits entities for approval
- **Approval Rules Engine:** Integrates with approval rules and routing
- **Multi-Level Approvals:** Supports multi-level approval processes
- **Approval Status Tracking:** Tracks approval status throughout process

### Batch Processing with Approvals
- **No Auto-Flush:** Database changes are not automatically flushed
- **Approval Batch Processing:** Efficient batch processing with approval workflows
- **Memory Efficiency:** Efficient memory usage during bulk processing with approvals
- **Transaction Control:** Fine-grained control over database transaction timing

### Complete Entity Processing
- **Full Validation:** All validation rules and constraints are enforced
- **Business Rules:** All business rules are applied during generation
- **Committed Status:** Generated entities are fully committed with approval status
- **Workflow Ready:** Entities are ready for workflow integration after flush

## Parameters

This entity flow uses the same parameters as [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md):

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
- **Generated Entity:** Creates or updates records in target entity table (in memory)
- **Committed Status:** Entity is fully committed and validated with approval status
- **Approval Fields:** Updates approval-related fields and status
- **Deferred Persistence:** Changes remain in memory until manual flush

### Approval Workflow Tables
- **Approval Requests:** Creates approval request records for workflow processing
- **Approval History:** Maintains approval history and audit trails
- **Workflow State:** Updates workflow state and tracking information
- **Approval Dependencies:** Manages approval dependencies and relationships

### Source Entity Updates
- **Inverse Mapping:** Updates source entity fields based on inverse copy
- **Reference Updates:** Updates source entity with references to generated entity
- **Approval Status:** May update source entity with approval-related information
- **Memory Changes:** All changes remain in memory until flush

## Business Use Cases

### 1. Financial Document Processing
- **High-Value Transactions:** Generate financial documents requiring approval for high-value transactions
- **Budget Approvals:** Create budget-related documents requiring management approval
- **Financial Controls:** Implement financial controls through approval processes
- **Compliance Documents:** Generate compliance documents requiring authorized approval

### 2. Procurement and Purchasing
- **Purchase Order Approvals:** Generate purchase orders requiring approval workflows
- **Vendor Approvals:** Create vendor-related documents requiring approval
- **Contract Approvals:** Generate contracts requiring legal or management approval
- **Expenditure Controls:** Implement expenditure controls through approval processes

### 3. Operational Approvals
- **Production Orders:** Generate production orders requiring supervisor approval
- **Quality Control:** Create quality control documents requiring approval
- **Service Approvals:** Generate service orders requiring manager approval
- **Resource Allocation:** Create resource allocation documents requiring approval

### 4. Batch Processing with Governance
- **Bulk Approvals:** Process large batches of documents requiring approval
- **Compliance Batches:** Generate compliance documents in batches with approval
- **Regulatory Processing:** Process regulatory documents with approval workflows
- **Audit Trail Creation:** Create comprehensive audit trails for approval processes

## Approval Integration Benefits

### Governance and Control
- **Automated Approval Routing:** Automatically routes documents through approval workflows
- **Approval Rules Enforcement:** Enforces approval rules and business policies
- **Authority Matrix:** Respects authority matrix and approval hierarchies
- **Compliance Assurance:** Ensures compliance with approval requirements

### Workflow Integration
- **Approval Engine Integration:** Integrates with approval workflow engines
- **Multi-Stage Approvals:** Supports complex multi-stage approval processes
- **Conditional Approvals:** Applies conditional approval logic based on business rules
- **Approval Notifications:** Integrates with notification systems for approvals

### Audit and Compliance
- **Approval Audit Trail:** Creates comprehensive audit trail for approval processes
- **Regulatory Compliance:** Supports regulatory compliance requirements
- **Approval History:** Maintains complete approval history for auditing
- **Compliance Reporting:** Supports compliance reporting requirements

## Important Warnings

### ⚠️ Approval Process Dependencies
- **Approval Configuration:** Requires proper approval workflow configuration
- **Approval Rules:** Approval rules must be properly defined and tested
- **Authority Matrix:** Authority matrix must be current and accurate
- **Workflow Engine:** Approval workflow engine must be operational

### ⚠️ Manual Flush with Approvals
- **No Auto-Flush:** Changes are NOT automatically saved to database
- **Approval State:** Approval state remains in memory until flush
- **Manual Intervention:** Requires manual flush to persist changes and approval state
- **Data Loss Risk:** Risk of losing approval state if system fails before flush

### ⚠️ Memory Usage with Approvals
- **Memory Consumption:** Approval data increases memory consumption during batch processing
- **Approval Objects:** Approval objects and workflow state consume additional memory
- **Batch Size Limits:** Consider practical limits on batch sizes with approval processing
- **Memory Monitoring:** Enhanced memory monitoring required for approval batches

### ⚠️ Approval Workflow Complexity
- **Workflow Dependencies:** Dependencies on approval workflow engines and processes
- **Approval Timing:** Approval processing may introduce timing complexities
- **Workflow Failures:** Approval workflow failures may affect batch processing
- **Integration Complexity:** Complex integration with approval systems

## Best Practices

### Approval Workflow Management
- **Workflow Testing:** Thoroughly test approval workflows before deployment
- **Approval Rules Validation:** Validate approval rules and routing logic
- **Authority Matrix Maintenance:** Maintain current and accurate authority matrix
- **Workflow Monitoring:** Monitor approval workflow performance and status

### Batch Processing with Approvals
- **Reasonable Batch Sizes:** Use smaller batch sizes when approval processing is involved
- **Approval Monitoring:** Monitor approval processing during batch operations
- **Error Handling:** Implement robust error handling for approval failures
- **Resource Planning:** Plan additional resources for approval processing

### Manual Flush Management with Approvals
- **Approval State Verification:** Verify approval state before manual flush
- **Transaction Boundaries:** Clearly define transaction boundaries including approval state
- **Error Recovery:** Have procedures for handling approval and flush failures
- **Approval Persistence:** Ensure proper persistence of approval state during flush

### Integration and Monitoring
- **Approval System Integration:** Test integration with approval systems thoroughly
- **Performance Monitoring:** Monitor performance impact of approval processing
- **Approval Notifications:** Configure appropriate approval notifications
- **Escalation Procedures:** Implement escalation procedures for approval delays

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