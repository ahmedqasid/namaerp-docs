---
title: EASetFieldByTemplate
module: core
---


<div class='entity-flows'>

# EASetFieldByTemplate

**This document was generated using Claude.ai**

## Overview

Sets an entity field value using a Tempo template that can include dynamic content based on the current entity's data. Processes template placeholders and entity references to generate the final field value.

## When This Action Runs

Manual execution for dynamic field population, automated data formatting, content generation based on entity data, or creating calculated field values using complex templates.

## How It Works

1. **Identifies target field** - Locates the specified field ID in the entity (can be header or detail field)
2. **Processes template** - Renders the Tempo template using DomainComplexRenderer with entity data
3. **Replaces placeholders** - Substitutes template variables with actual entity field values
4. **Sets field value** - Updates the target field with the rendered template result
5. **Handles type conversion** - Automatically converts string result to appropriate field type

## Parameters

**Parameter 1:** Field Id (Required) - Target field ID to set (supports header fields and detail collection fields)
**Parameter 2:** Template (Required) - Tempo template with entity data placeholders

## Template Examples

Simple field reference:
```tempo
Customer: {entity.customerName} - Order: {entity.orderNumber}
```

Complex formatting:
```tempo
Invoice #{code} dated {valueDate} 
Amount: {money.netValue} 
Status: {documentFileStatus}
```

## Database Tables Affected

- **Entity Tables** - Updates the specified field in the entity's main table or detail collection tables
- **Related Tables** - No direct changes, but template may reference related entity data

## Important Warnings

### ⚠️ Field Requirements
- Target field must exist in the entity structure
- Field ID can reference header fields or fields within detail collections
- Invalid field IDs will cause action to fail
- Field type conversion is automatic but may fail for incompatible data

### ⚠️ Template Processing
- Template must use valid Tempo syntax for entity field references
- Use {fieldName} format for field placeholders
- Complex templates with conditional logic supported
- Template parsing errors will cause action failure

### ⚠️ Data Type Handling
- String template result is automatically converted to target field type
- Conversion may fail for incompatible data types (e.g., text to numeric)
- Date and numeric formatting should be handled within template
- Large text content may exceed field size limits

### ⚠️ Entity Data Access
- Template can only access data from the current entity being processed
- Related entity data requires proper field references or navigation

### ⚠️ Field Updates and Business Logic
- Field updates may trigger entity validation rules
- Business logic depending on the field may be affected
- Consider impact on calculated fields and derived values
- Field changes may cascade to related entities

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASetFieldByTemplate`


</div>

