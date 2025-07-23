---
title: EAAutomaticGenerateEntityFromEntityAction
module: core
---


<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityAction

**This document was generated using AI Tools**

## Purpose
This is an **automatic** version of the entity generation action that creates related entities from a source entity and automatically handles cleanup when the source entity is deleted. It combines both entity creation and deletion cleanup in a single action configuration.

## When to Use This Action
- **Automatic Document Generation**: When you need entities to be automatically created and maintained without manual intervention
- **Master-Detail Relationships**: For automatically generating supporting documents or related records
- **Data Synchronization**: When changes to one entity should automatically create or update related entities
- **Cleanup Management**: When related entities should be automatically deleted when the source is deleted

## How It Works

### Creation Phase (Post-Commit)
1. **Entity Generation**: Creates new entities based on the source entity's data
2. **Field Mapping**: Copies specified fields from source to target entities
3. **Conditional Processing**: Applies filters and conditions to determine what to generate
4. **Batch Processing**: Can process detail lines individually or in groups

### Deletion Phase (Post-Delete)
1. **Related Entity Cleanup**: Automatically deletes related entities when source is deleted
2. **Uses Same Configuration**: Uses the same SQL finder to locate entities to delete
3. **Safe Deletion**: Performs deletion through business logic, not direct SQL

## Key Differences from Manual Version

### Automatic Version (This Action)
- **Forced Automatic**: Always runs automatically - cannot be disabled once configured
- **Handles Both Create and Delete**: Manages entire lifecycle of related entities
- **Post-Commit/Post-Delete Only**: Runs after database transactions are committed
- **No Manual Control**: Users cannot choose when to run it

### Manual Version (EAGenerateEntityFromEntityAction)  
- **User-Triggered**: Runs only when manually invoked
- **Creation Only**: Only handles entity generation, not cleanup
- **Can Run Anytime**: Can be configured for different trigger points

## Parameters Required

### Parameter 1: Target Type (Required)
- **What it is**: The type of entity to create
- **Format**: Entity type name from system entity definitions
- **Purpose**: Determines what kind of entity will be generated

### Parameter 2: Finder SQL (Required)
- **What it is**: SQL query to find existing target entities (for updates) or determine if creation is needed
- **Format**: SQL query returning entity IDs
- **Template**: `select id from [TargetTable] where [conditions]`
- **Purpose**: Prevents duplicate creation and enables updates

### Parameter 3: Field Map (Required)
- **What it is**: Defines how to copy fields from source to target entity
- **Format**: `targetField=sourceField` pairs, one per line
- **Templates**:
  - `code=code` (copy field to same name)
  - `fromDoc=$this` (reference to source entity)
  - `description={source.name1}` (copy from specific source field)

### Parameter 4: Update Only
- **What it is**: If true, only updates existing entities, doesn't create new ones
- **Format**: `true` or `false`
- **Default**: `false` (creates new entities)

### Parameter 5: Inverse Copy
- **What it is**: Copies fields back from generated entity to source entity
- **Format**: Same as Field Map - `sourceField=targetField` pairs
- **Purpose**: Allows generated entities to update the source entity

### Parameter 6: Run Entity Flow Per Each Line
- **What it is**: Property name containing detail lines to process individually
- **Format**: Property name (like `details`, `lines`)
- **Purpose**: Processes each detail line separately instead of once per header

### Parameter 7: Insert Only  
- **What it is**: If true, only creates new entities, never updates existing ones
- **Format**: `true` or `false`
- **Default**: `false` (can update existing)

### Parameter 8: Apply When Query
- **What it is**: Conditional filter to determine which lines to process
- **Format**: SQL CASE statement returning 1 (include) or 0 (exclude)
- **Template**: `select case when [condition] then 1 else 0 end`

### Parameter 9: Group Details By
- **What it is**: Groups detail lines before processing
- **Purpose**: Creates one target entity per group instead of per line

### Parameter 10: Run Only If
- **What it is**: Overall condition to determine if the action should run at all
- **Format**: SQL expression that should return a number greater than zero
- **Template**: `totlaizesql(select case when [condition] then 1 else 0 end)`

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Automatic and Forced**: This action CANNOT be disabled once configured - it will always run
2. **Post-Commit Only**: Only runs after database transactions are committed, not during
3. **Creates AND Deletes**: Handles complete lifecycle of related entities
4. **Performance Impact**: Automatic actions can slow down document processing
5. **Careful Configuration**: Test thoroughly before deploying to production

## Field Mapping Examples

### Basic Field Copying
```
code=code
name1=name1  
valueDate=valueDate
```

### Reference to Source Entity
```
fromDoc=$this
sourceId={id}
parentEntity=$this
```

### Conditional Field Mapping
```
amount=sql(select case when {amount} > 0 then {amount} else 0 end)
status=sql(select case when {approved} = 1 then 'APPROVED' else 'PENDING' end)  
```

## SQL Query Templates

### Find Existing Related Entity
```sql
select id from [TargetTable] where sourceId = {id}
```

### Find by Reference Field
```sql  
select id from [TargetTable] where parentId = {id} and status = 'ACTIVE'
```

### Conditional Processing Query
```sql
select case when {amount} > 1000 then 1 else 0 end
```

## Common Configuration Patterns

### Pattern 1: Auto-Generate Supporting Document
```
Parameter 1: [SupportingDocType]
Parameter 2: select id from [SupportingTable] where mainDocId = {id}
Parameter 3: code=code
fromDoc=$this
valueDate=valueDate
Parameter 4: false
Parameters 5-10: (empty)
```

### Pattern 2: Process Each Detail Line
```
Parameter 1: [DetailEntityType]
Parameter 2: select id from [DetailTable] where parentId = {id}
Parameter 3: itemId={line.item.id}
quantity={line.quantity}
Parameter 4: false
Parameter 5: (empty)
Parameter 6: details
Parameters 7-10: (empty)
```

## Monitoring and Troubleshooting

### Success Indicators
- **Related Entities Created**: New target entities appear after source entity creation
- **Automatic Updates**: Changes to source entity trigger updates to related entities
- **Cleanup on Deletion**: Related entities are removed when source entity is deleted

### Common Issues

**"Action runs too often"**
- This is expected behavior - automatic actions run every time
- Consider using manual version if automatic behavior is not desired
- Review entity flow configuration to ensure it's on the right trigger

**"Related entities not created"**
- Check field mapping syntax and field names
- Verify target entity type exists and is spelled correctly
- Review conditional queries for syntax errors

**"Performance problems"**
- Automatic actions add overhead to every document operation
- Consider optimizing field mapping and conditional queries
- Monitor database performance during peak usage

## Related Actions
- **EAGenerateEntityFromEntityAction**: Manual version for user-controlled generation
- **DeleteRelatedEntityAction**: Manual deletion of related entities
- **EAUpdateRelatedEntityAction**: For updating existing entities only

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityAction`

**⚠️ Note:** This action is forced automatic and cannot be disabled once configured.

</div>