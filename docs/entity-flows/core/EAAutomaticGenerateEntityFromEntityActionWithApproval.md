---
title: EAAutomaticGenerateEntityFromEntityActionWithApproval
module: core
---


<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityActionWithApproval

**This document was generated using AI Tools**

## Purpose
This is an **approval-aware** automatic entity generation action that creates related entities from a source entity and ensures the **generated entities** go through proper approval workflows if they require approval. It extends the automatic generation functionality to handle approval requirements for the newly created entities.

## When to Use This Action
- **Generated Entity Approvals**: When the created entities themselves need to go through approval workflows
- **Compliance Requirements**: When automatically generated documents must follow approval processes
- **Controlled Generation**: For automatic processes where generated entities require approval before being active
- **Audit Trail Management**: When generated entities need approval history and workflow tracking

## How It Works

### Entity Generation Phase
1. **Entity Creation**: Creates new entities based on source entity's data (same as standard automatic version)
2. **Field Mapping**: Copies specified fields from source to target entities
3. **Conditional Processing**: Applies filters and conditions to determine what to generate
4. **Batch Processing**: Can process detail lines individually or in groups

### Approval Integration Phase
1. **Approval Workflow Setup**: Ensures generated entities are properly integrated with approval system
2. **Approval Case Creation**: Creates approval cases for generated entities if they require approval
3. **Approval Status Management**: Manages approval status and workflow progression for generated entities
4. **Approval Rule Compliance**: Respects approval rules and requirements for the generated entity types

### Deletion Phase (Post-Delete)
1. **Related Entity Cleanup**: Automatically deletes related entities when source is deleted
2. **Uses Same Configuration**: Uses the same SQL finder to locate entities to delete
3. **Safe Deletion**: Performs deletion through business logic, not direct SQL

## Key Differences from Standard Automatic Version

### With Approval (This Action)
- **Generated Entity Approvals**: Creates approval workflows for the generated entities
- **Approval Integration**: Ensures generated entities follow proper approval processes
- **Compliance Management**: Generated entities go through required approval steps
- **Workflow Tracking**: Maintains approval history and audit trails for generated entities

### Without Approval (EAAutomaticGenerateEntityFromEntityAction)
- **No Approval Processing**: Generated entities bypass approval workflows
- **Direct Creation**: Created entities are immediately active without approval requirements
- **Simpler Processing**: No additional approval overhead or workflow management

## Parameters Required
This action uses the **exact same parameters** as EAAutomaticGenerateEntityFromEntityAction:

### Parameter 1: Target Type (Required)
- **What it is**: The type of entity to create
- **Format**: Entity type name from system entity definitions
- **Purpose**: Determines what kind of entity will be generated

### Parameter 2: Finder SQL (Required)
- **What it is**: SQL query to find existing target entities (for updates) or determine if creation is needed
- **Format**: SQL query returning entity IDs
- **Template**: `select id from [TargetTable] where [conditions]`

### Parameter 3: Field Map (Required)
- **What it is**: Defines how to copy fields from source to target entity
- **Format**: `targetField=sourceField` pairs, one per line

### Parameter 4: Update Only
- **What it is**: If true, only updates existing entities, doesn't create new ones
- **Format**: `true` or `false`
- **Default**: `false` (creates new entities)

### Parameter 5: Inverse Copy
- **What it is**: Copies fields back from generated entity to source entity
- **Format**: Same as Field Map - `sourceField=targetField` pairs

### Parameter 6: Run Entity Flow Per Each Line
- **What it is**: Property name containing detail lines to process individually
- **Format**: Property name (like `details`, `lines`)

### Parameter 7: Insert Only
- **What it is**: If true, only creates new entities, never updates existing ones
- **Format**: `true` or `false`
- **Default**: `false` (can update existing)

### Parameter 8: Apply When Query
- **What it is**: Conditional filter to determine which lines to process
- **Format**: SQL CASE statement returning 1 (include) or 0 (exclude)

### Parameter 9: Group Details By
- **What it is**: Groups detail lines before processing
- **Purpose**: Creates one target entity per group instead of per line

### Parameter 10: Run Only If
- **What it is**: Overall condition to determine if the action should run at all
- **Format**: SQL expression that should return a number greater than zero

## Approval Integration

### How Generated Entity Approvals Work
- **Approval Workflow Creation**: Generated entities that require approval get proper approval workflows created
- **Approval Case Management**: System creates approval cases for generated entities based on their type requirements
- **Workflow Processing**: Generated entities follow the same approval rules as manually created entities of the same type
- **Status Tracking**: Approval status and history are properly maintained for generated entities

### Configuration Requirements for Generated Entity Approvals
The system handles approval integration by:
- Checking if the generated entity type requires approval workflows
- Creating appropriate approval cases and workflow steps
- Applying approval rules and definitions for the generated entity type
- Managing approval permissions and candidate assignments

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Generated Entity Approval Requirements**: Created entities will go through approval workflows if their entity type requires it
2. **Automatic and Forced**: This action CANNOT be disabled once configured - it will always run
3. **Post-Commit Only**: Only runs after database transactions are committed, not during
4. **Creates AND Deletes**: Handles complete lifecycle of related entities
5. **Approval Overhead**: Generated entities requiring approval will add approval processing overhead

## Common Use Cases

### Use Case 1: Purchase Order → Approval-Required Journal Entry
When a purchase order is created, automatically generate journal entries that need approval:
```
Parameter 1: [JournalEntryType]
Parameter 2: select id from [JournalTable] where poId = {id}
Parameter 3: debitAccount={expense.account.id}
amount={totalAmount}
poId=$this
Note: Generated journal entries will require approval before posting
```

### Use Case 2: Sales Order → Approval-Required Credit Limit Adjustment
When large sales orders are created, automatically generate credit limit adjustments that need approval:
```
Parameter 1: [CreditLimitAdjustmentType]
Parameter 2: select id from [CreditTable] where orderId = {id}
Parameter 3: customerId={customer.id}
newLimit={requiredCreditLimit}
orderId=$this
Note: Credit limit adjustments will go through approval workflow
```

### Use Case 3: Contract → Approval-Required Payment Schedule
When contracts are created, automatically generate payment schedules that need approval:
```
Parameter 1: [PaymentScheduleType] 
Parameter 2: select id from [PaymentTable] where contractId = {id}
Parameter 3: contractId=$this
amount={installmentAmount}
dueDate={calculatedDueDate}
Note: Payment schedules will require approval before activation
```

## Monitoring and Troubleshooting

### Success Indicators
- **Generated Entities Created**: New target entities are created automatically when source entities are processed
- **Approval Workflows Active**: Generated entities that require approval have approval cases created
- **Proper Approval Status**: Generated entities show correct approval status and workflow progression
- **Cleanup on Deletion**: Related entities are removed when source entity is deleted

### Common Issues

**"Generated entities created but no approval workflow"**
- Check if the generated entity type is configured to require approval
- Verify approval definitions exist for the target entity type
- Review approval workflow configuration for generated entity types

**"Generated entities bypass approval unexpectedly" **
- Verify you're using the "WithApproval" version, not the standard automatic version  
- Check entity flow configuration and action class name
- Confirm the generated entity type actually requires approval

**"Approval workflow errors for generated entities"**
- Ensure generated entity type has proper approval definition configured
- Verify approval permissions and candidate setup for generated entity type
- Check approval rule configuration and dependencies

## Configuration Requirements

### Generated Entity Approval Setup
- Target entity type must have approval workflow configured if approvals are needed
- Approval definitions must be properly defined for the generated entity types
- Approval permissions must be correctly assigned for generated entity approvals

### Entity Flow Configuration
- Action should be configured to run post-commit
- Should be triggered on source entity creation/modification events
- No special approval-related triggers needed for source entity

## SQL to Check Results

```sql
-- Check generated entities and their approval status
SELECT s.id as source_id, s.code as source_code, r.id as generated_id, r.code as generated_code, ac.state as generated_approval_state
FROM [SourceTable] s
JOIN [GeneratedTable] r ON s.id = r.sourceId
LEFT JOIN ApprovalCase ac ON r.id = ac.entityId
WHERE s.creationDate > DATEADD(day, -7, GETDATE())

-- Check generated entities that should have approval but don't
SELECT r.id, r.code, r.creationDate
FROM [GeneratedTable] r
LEFT JOIN ApprovalCase ac ON r.id = ac.entityId
WHERE r.creationDate > DATEADD(day, -1, GETDATE()) 
  AND ac.id IS NULL
  AND r.id IN (SELECT entityId FROM [EntityTypesThatRequireApproval])
```

## Related Actions
- **EAAutomaticGenerateEntityFromEntityAction**: Version without approval requirement
- **EAGenerateEntityFromEntityAction**: Manual version for user-controlled generation
- **ApprovalFlow Actions**: For managing approval workflows

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityActionWithApproval`

**⚠️ Note:** This action is forced automatic and ensures generated entities go through approval workflows if required by their entity type.

</div>