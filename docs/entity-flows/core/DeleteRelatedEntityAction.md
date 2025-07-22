---
title: DeleteRelatedEntityAction
module: core
---


<div class='entity-flows'>

# DeleteRelatedEntityAction

**This document was generated using AI Tools**

## Purpose
This action automatically deletes related entities from the database when triggered by another entity's operation. It's primarily designed to work with `EAGenerateEntityFromEntityAction` to clean up automatically-generated records.

## When to Use This Action
- **Cleanup Operations**: When you need to delete records that were automatically created by another action
- **Data Integrity**: To maintain referential integrity by removing dependent records
- **Business Rule Enforcement**: When certain entities should be deleted based on changes to their parent entities

## How It Works
1. **Target Identification**: Uses a SQL query to find the specific entity to delete
2. **Entity Lookup**: Retrieves the target entity using its ID and type
3. **Safe Deletion**: Performs deletion through the business layer (not direct SQL)

## Parameters Required

### Parameter 1: Target Type
- **What it is**: The type of entity you want to delete
- **Format**: Entity type name (e.g., "CreditNote", "Invoice", "Payment")
- **Example**: `CreditNote`

### Parameter 2: Finder SQL
- **What it is**: SQL query to find the entity to delete
- **Must return**: The ID of the entity to delete as the first column
- **Placeholders**: Use `{id}` to reference the source entity's ID
- **Example**: `select id from CreditNote where ref5Id={id}`

## SQL Query Examples

### Delete a Credit Note linked to an Invoice
```sql
select id from CreditNote where invoiceId={id}
```

### Delete Payment linked to a specific field
```sql
select id from Payment where ref5Id={id} and status='GENERATED'
```

### Delete multiple entities (first one found will be deleted)
```sql
select id from TempDocument where sourceId={id} order by createdDate desc
```

## Important Safety Notes

⚠️ **CRITICAL WARNINGS:**

1. **Business Layer Deletion**: This action uses proper business deletion methods, which means:
   - Validation rules are respected
   - Related records are handled properly
   - Audit trails are maintained
   - Business logic is executed

2. **Single Entity Only**: Only deletes the FIRST entity found by your SQL query, even if multiple records match

3. **No Undo**: Once deleted, the entity goes to the system's recycle bin and can only be restored by system administrators

4. **Dependency Checks**: The deletion will fail if other entities depend on the target entity

## Common Use Cases

### Scenario 1: Cleanup Auto-Generated Credit Notes
When an invoice is cancelled, delete any automatically generated credit notes:
- **Target Type**: `CreditNote`
- **SQL**: `select id from CreditNote where invoiceId={id} and source='AUTO_GENERATED'`

### Scenario 2: Remove Temporary Documents
When a main document is finalized, remove temporary working copies:
- **Target Type**: `TempDocument` 
- **SQL**: `select id from TempDocument where parentId={id} and status='DRAFT'`

## Testing Your Configuration

Before using in production, test your SQL query directly:

1. **Run the SQL manually** replacing `{id}` with a real ID
2. **Verify it returns only the ID column**
3. **Ensure it finds the correct entity to delete**
4. **Check that deletion won't break other business processes**

## Troubleshooting

### Common Issues

**"No entity found to delete"**
- Check your SQL syntax
- Verify the entity ID exists
- Confirm the target entity type is correct

**"Deletion failed"**
- Another entity might reference the target entity
- Business validation rules might prevent deletion
- Check system logs for detailed error messages

**"Multiple entities match but only one deleted"**
- This is expected behavior
- Add ORDER BY clause to control which entity is selected
- Consider using more specific WHERE conditions

## Related Actions
- **EAGenerateEntityFromEntityAction**: Creates entities that this action can clean up
- **EAUpdateRelatedEntityAction**: Updates related entities instead of deleting them

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.DeleteRelatedEntityAction`

</div>