---
title: EADetailsRemover
module: core
---


<div class='entity-flows'>

# EADetailsRemover

**This document was generated using AI Tools**

## Purpose
This action removes specific detail lines from entities (like removing lines from invoices, orders, or other documents with detail collections) based on query conditions or predefined criteria. It selectively deletes detail lines that match specified conditions.

## When to Use This Action
- **Conditional Line Removal**: Remove detail lines that meet specific criteria
- **Data Cleanup**: Remove invalid or incomplete detail lines from documents
- **Business Rule Enforcement**: Remove lines that violate business rules
- **Partial Line Deletion**: Remove specific lines while keeping others
- **Document Correction**: Fix documents by removing problematic detail lines

## How It Works
1. **Parameter Validation**: Ensures detail name and at least one condition (query or criteria) are provided
2. **Condition Evaluation**: Tests each detail line against the specified query or criteria
3. **Line Identification**: Identifies which detail lines match the removal conditions
4. **Safe Removal**: Removes matching lines in reverse order to maintain index integrity
5. **Collection Update**: Updates the detail collection with remaining lines

## Parameters Required

### Parameter 1: Detail Collection Name (Required)
- **What it is**: Name of the detail line collection property on the entity
- **Format**: Property name (like `lines`, `details`, `items`)
- **Examples**: `lines`, `orderDetails`, `invoiceLines`
- **Purpose**: Specifies which detail collection to process

### Parameter 2: Query (Optional)
- **What it is**: SQL-like query that returns 1 for lines to remove, 0 to keep
- **Format**: Query using entity field syntax with {} placeholders
- **Purpose**: Defines complex conditions for line removal
- **Note**: Must use Parameter 1 OR Parameter 3, not both

### Parameter 3: Criteria Definition Code (Optional)
- **What it is**: Code of a predefined CriteriaDefinition entity
- **Format**: Code or ID of existing CriteriaDefinition
- **Purpose**: Uses predefined business criteria for line removal
- **Note**: Must use Parameter 1 OR Parameter 2, not both

## Query Syntax and Examples

### Query Structure
Queries should return 1 for lines to remove, 0 for lines to keep:
```
SELECT CASE WHEN [condition] THEN 1 ELSE 0 END
```

### Query Examples (Template Format)
```sql
-- Remove lines with null account
SELECT CASE WHEN {[detailCollection].account.id} IS NULL THEN 1 ELSE 0 END

-- Remove lines with zero quantity
SELECT CASE WHEN {[detailCollection].quantity} = 0 THEN 1 ELSE 0 END

-- Remove lines over certain amount
SELECT CASE WHEN {[detailCollection].unitPrice} > 1000 THEN 1 ELSE 0 END

-- Remove lines with specific status
SELECT CASE WHEN {[detailCollection].status} = 'CANCELLED' THEN 1 ELSE 0 END
```

### Field Reference Format
- **Detail Fields**: Use `{[detailCollectionName].[fieldName]}` format
- **Related Entities**: Use `{[detailCollection].[relatedEntity].[field]}` format
- **Nested Properties**: Chain properties with dots like `{lines.item.category.code}`

## Criteria Definition Method

### Using Predefined Criteria
- **Create CriteriaDefinition**: Set up criteria using system criteria builder
- **Detail-Level Criteria**: Criteria must be designed to work on detail lines
- **Code Reference**: Use the criteria code in Parameter 3
- **Business Logic**: Encapsulates complex business rules in reusable criteria

### Criteria Advantages
- **Reusability**: Same criteria can be used across multiple actions
- **Maintainability**: Update criteria without changing action parameters
- **Business Logic**: Complex rules managed through criteria system
- **Testing**: Criteria can be tested independently

## Line Removal Process

### Safe Removal Algorithm
1. **Index Collection**: Collects indices of lines that match removal conditions
2. **Reverse Sort**: Sorts indices in descending order (highest first)
3. **Backward Removal**: Removes lines starting from highest index
4. **Index Integrity**: Prevents index shifting problems during removal

### Why Reverse Order Matters
- **Index Stability**: Removing from end preserves earlier indices
- **Collection Integrity**: Maintains collection structure during removal
- **Error Prevention**: Avoids accessing invalid indices

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Removal**: Removed detail lines are permanently deleted from the entity
2. **No Undo**: Cannot recover removed lines once action completes
3. **Collection Dependency**: Only works with entities that have detail collections
4. **Query Complexity**: Complex queries may impact performance
5. **Business Logic**: Removal bypasses normal entity validation rules

## Entity Requirements

### Supported Entity Types
This action works with any entity that has detail line collections:
- **Documents**: Invoices, orders, receipts with detail lines
- **Master Files**: Items with price lists, customers with contacts
- **Complex Entities**: Any entity with collection properties

### Detail Collection Requirements
- **List/Collection Type**: Detail property must be a list or collection
- **Object Elements**: Collection must contain entity objects (not primitives)
- **Field Access**: Detail objects must have accessible fields for query evaluation

## Condition Evaluation

### Query Evaluation Process
1. **Line-by-Line**: Each detail line is evaluated individually
2. **Field Resolution**: Query fields are resolved for each line
3. **Boolean Result**: Query must return 1 (remove) or 0 (keep)
4. **Context Isolation**: Each line evaluation is independent

### Criteria Evaluation Process
1. **Criteria Loading**: Loads CriteriaDefinition from database
2. **Line Matching**: Tests each detail line against criteria
3. **Boolean Result**: Criteria returns match/no-match for each line
4. **Index Tracking**: Tracks matching line indices for removal

## Monitoring and Troubleshooting

### Success Indicators
- **Lines Removed**: Target detail lines are removed from collection
- **Collection Updated**: Detail collection reflects changes
- **No Errors**: Action completes without validation errors
- **Entity Integrity**: Entity remains in valid state after removal

### Common Issues

**"You must specify detail name"**
- Parameter 1 is empty or missing
- Check that detail collection name is provided
- Verify spelling of detail collection property name

**"You must at least specify one of query or criteria code"**
- Both Parameter 2 and Parameter 3 are empty
- Provide either a query OR a criteria definition code
- Cannot leave both condition parameters empty

**"No lines removed despite matching conditions"**
- Query may not be returning 1 for any lines
- Check query logic and field references
- Verify detail lines actually exist that match conditions
- Test query logic with sample data

**"Query execution errors"**
- Invalid field references in query
- Check spelling of field names and collection name
- Verify field paths exist on detail entities
- Test with simpler query first

**"Criteria not found"**
- CriteriaDefinition with specified code doesn't exist
- Check criteria code spelling and existence
- Verify criteria is configured for detail-level evaluation
- Confirm criteria is active

**"Wrong lines removed"**
- Query logic may be inverted (0/1 values swapped)
- Review query conditions carefully
- Test query with known data to verify logic
- Check field value formats and data types

## Best Practices

### Query Design
- **Simple Conditions**: Start with simple conditions, add complexity gradually
- **Field Verification**: Verify all field references exist before deployment
- **Logic Testing**: Test query logic with sample data first
- **Performance**: Avoid overly complex nested queries

### Safety Measures
- **Backup First**: Consider backing up entities before bulk line removal
- **Test Environment**: Test actions on development data first
- **Small Batches**: Process small numbers of entities initially
- **Verification**: Verify results immediately after execution

### Criteria Management
- **Documentation**: Document criteria purpose and logic clearly
- **Naming**: Use descriptive codes for criteria definitions
- **Testing**: Test criteria independently before using in actions
- **Maintenance**: Review and update criteria as business rules change

### Usage Guidelines
- **Specific Conditions**: Use precise conditions to avoid unintended removals
- **Business Alignment**: Ensure removal logic aligns with business requirements
- **User Communication**: Inform users when detail lines will be removed
- **Audit Trail**: Maintain records of why lines were removed

## Related Actions
- **Detail Line Management**: Other actions for managing detail collections
- **Entity Validation**: Actions for validating entity data integrity
- **Bulk Operations**: Tools for processing multiple entities
- **Criteria Management**: Tools for managing CriteriaDefinition entities

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADetailsRemover`

</div>