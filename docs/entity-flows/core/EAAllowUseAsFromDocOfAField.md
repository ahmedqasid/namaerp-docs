---
title: EAAllowUseAsFromDocOfAField
module: core
---


<div class='entity-flows'>

# EAAllowUseAsFromDocOfAField

**This document was generated using AI Tools**

## Purpose
This action **removes restrictions** on using document files as source documents (reference documents). When a document has been marked as "prevented from use as from-doc", this action allows it to be used again as a reference.

**Note**: Despite the confusing description in the code, this action actually **ALLOWS** usage, not prevents it.

## When to Use This Action
- **Enable Document References**: When you need to allow a document to be used as a source/reference document
- **Remove Restrictions**: When a previously blocked document should become available for referencing
- **Workflow Management**: As part of document approval or status change processes

## How It Works
1. **Field Resolution**: Identifies the field containing document references
2. **Document Detection**: Finds DocumentFile entities in that field
3. **Permission Update**: Removes the restriction flag from those documents
4. **Bulk Processing**: Handles multiple documents if the field contains a collection

## Parameters Required

### Parameter 1: Field ID
- **What it is**: The property name of the field that contains the documents to allow
- **Format**: Property name as defined in the entity (not the database column name)
- **Note**: Must be a property that contains DocumentFile entities

## Field ID Format

The field ID must be the exact **property name** as defined in the entity class, not the database column name. You can find valid property names in the entity documentation files.

**Example**: For Activity entity, valid property names include: `analysisSet`, `branch`, `code`, `remarks`, `ref1`, `ref2`, etc.

**Template**: `[propertyName]` - Replace with actual property name from the entity documentation

## How Document Referencing Works

### What "From Doc" Means
- **From Doc** = Source Document = Reference Document
- When creating new documents, users can select existing documents as "sources" or "references"
- This creates a link saying "this new document was created based on that old document"
- Some documents might be marked as "not allowed to be used as references"

### Document Restriction System
Documents can be in two states:
1. **Allowed as From-Doc**: ✅ Can be selected as source/reference when creating new documents
2. **Prevented as From-Doc**: ❌ Cannot be selected as source/reference (restricted)

## Common Use Cases

### Pattern 1: Approve Uploaded Documents
When documents are uploaded, they might be initially restricted. After approval:
```
Field ID: [documentFieldName]
Result: All documents in that field become available as reference documents
```

### Pattern 2: Enable Document Files for Reference
When document files in a field should be available for creating related documents:
```
Field ID: [documentPropertyName]  
Result: Document files in that property can be selected when creating related documents
```

### Pattern 3: Enable Documents in a Property
When documents in a specific property should become available for reference:
```
Field ID: [documentPropertyName]
Result: Documents in that property can be used as reference documents
```

**Note**: Replace bracketed placeholders with actual property names from your entity documentation files.

## Important Notes

⚠️ **Key Points:**

1. **Only Works with DocumentFile Entities**: This action only affects fields containing DocumentFile objects
2. **Removes Restrictions**: Sets `preventUseAsFromDoc = false` on the documents
3. **Collection Support**: Automatically handles multiple documents in collection fields
4. **No Effect on Non-Documents**: Silently ignores fields that don't contain DocumentFile objects

## Opposite Action
- **EAPreventUseAsFromDocOfAField**: Does the opposite - restricts documents from being used as references

## Testing Your Configuration

To verify this action works:

1. **Check Initial State**: Verify some documents are marked as "prevented from use as from-doc"
2. **Run the Action**: Execute this entity flow
3. **Test Document Selection**: Try selecting the documents as sources when creating new documents
4. **Verify Database**: Check that `preventUseAsFromDoc` field is now `false` or `null`

## Troubleshooting

### Common Issues

**"Action runs but documents still restricted"**
- Verify the field ID is correct and contains DocumentFile objects
- Check if the field contains the documents you expect
- Ensure the documents were actually restricted before running the action

**"Property not found"**
- Double-check the property name spelling and case sensitivity
- Verify the property exists on the entity you're running this action against
- Make sure you're using the property name, not the database column name
- Check the entity documentation files for valid property names

**"No effect on documents"**
- The property might not contain DocumentFile entities
- Documents might already be allowed (not restricted)
- Check system logs for any error messages

## SQL to Check Document Status

To verify document restriction status:

```sql
-- Check if documents are restricted
SELECT id, code, preventUseAsFromDoc 
FROM DocumentFile 
WHERE id IN (your_document_ids)

-- After running the action, this should show preventUseAsFromDoc = false/null
```

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAllowUseAsFromDocOfAField`

</div>