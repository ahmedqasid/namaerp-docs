---
title: EAErrorIfQueryNotMatched
module: core
---


<div class='entity-flows'>

# EAErrorIfQueryNotMatched

**This document was generated using AI Tools**

## Purpose
This action validates entities by running a query condition and displaying customized error messages when the condition is not met. It provides a flexible way to implement business rule validation with multilingual error messages.

## When to Use This Action
- **Business Rule Validation**: Enforce complex business rules that require custom error messages
- **Data Integrity Checks**: Validate entity data meets specific requirements
- **Custom Validation Logic**: Implement validation that standard validators cannot handle
- **User-Friendly Errors**: Provide clear, context-specific error messages to users
- **Conditional Validation**: Validate entities only when certain conditions are met

## How It Works
1. **Query Execution**: Runs the specified query against the current entity
2. **Condition Check**: Evaluates if the query condition is met (returns non-zero)
3. **Error Generation**: If condition fails, generates custom error message
4. **Message Rendering**: Processes error message templates with entity data
5. **Multilingual Support**: Supports both Arabic and English error messages
6. **Validation Failure**: Returns failure result with rendered error message

## Parameters Required

### Parameter 1: Query (Required)
- **What it is**: SQL-like query that returns 0 for error condition, non-zero for valid condition
- **Format**: Query using entity field syntax with {} placeholders
- **Purpose**: Defines the validation condition to check
- **Logic**: Query returns 0 = Show error, Query returns 1+ = Validation passes

### Parameter 2: Arabic Error Message Template (Required)
- **What it is**: Error message template in Arabic with field placeholders
- **Format**: Text with {} placeholders for dynamic field values
- **Purpose**: Provides Arabic error message when validation fails
- **Rendering**: Field placeholders are replaced with actual entity values

### Parameter 3: English Error Message Template (Optional)
- **What it is**: Error message template in English with field placeholders
- **Format**: Text with {} placeholders for dynamic field values  
- **Default**: Uses Arabic message if English message not provided
- **Purpose**: Provides English error message for multilingual support

## Query Logic and Examples

### Query Return Values
- **0 (zero)**: Validation fails - error message is displayed
- **1 or higher**: Validation passes - no error shown
- **NULL**: Treated as 0 - validation fails

### Query Structure
```sql
SELECT CASE WHEN [valid_condition] THEN 1 ELSE 0 END
```

### Query Examples (Template Format)
```sql
-- Validate code is not a specific value
SELECT CASE WHEN {code} = 'INVALID' THEN 0 ELSE 1 END

-- Validate required field is not empty
SELECT CASE WHEN {name1} IS NULL OR {name1} = '' THEN 0 ELSE 1 END

-- Validate numeric range
SELECT CASE WHEN {quantity} BETWEEN 1 AND 1000 THEN 1 ELSE 0 END

-- Validate date relationships
SELECT CASE WHEN {startDate} <= {endDate} THEN 1 ELSE 0 END

-- Complex business rule validation
SELECT CASE WHEN {status} = 'ACTIVE' AND {approvalDate} IS NOT NULL THEN 1 ELSE 0 END
```

## Error Message Templates

### Field Placeholder Syntax
Use `{fieldName}` to include entity field values in error messages:
- **Simple Fields**: `{code}`, `{name1}`, `{quantity}`
- **Related Entities**: `{customer.name1}`, `{item.code}`
- **Nested Properties**: `{address.city}`, `{contact.email}`

### Message Template Examples
```
Arabic: "الكود {code} غير صالح، يرجى استخدام كود آخر"
English: "The code {code} is invalid, please use a different code"

Arabic: "الكمية {quantity} يجب أن تكون بين 1 و 1000"
English: "Quantity {quantity} must be between 1 and 1000"

Arabic: "تاريخ البداية {startDate} يجب أن يكون قبل تاريخ النهاية {endDate}"
English: "Start date {startDate} must be before end date {endDate}"
```

### Message Rendering Process
1. **Template Processing**: System takes the message template
2. **Field Resolution**: Resolves all `{fieldName}` placeholders  
3. **Value Substitution**: Replaces placeholders with actual entity values
4. **Final Message**: Returns fully rendered error message

## Validation Logic Flow

### Validation Process
1. **Query Execution**: Query runs against current entity
2. **Result Evaluation**: Checks if query result equals 0
3. **Error Triggering**: If result is 0, validation fails
4. **Message Generation**: Renders appropriate error message
5. **Failure Return**: Returns failure result with error message

### Success vs Failure
- **Success**: Query returns 1 or higher → No error, action continues
- **Failure**: Query returns 0 → Error message shown, action stops

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Query Logic**: Remember that 0 = error, 1+ = success (opposite of typical true/false)
2. **Required Messages**: Arabic message is required, English is optional
3. **Field References**: All field references in templates must exist on the entity
4. **Performance**: Complex queries may impact validation performance
5. **Error Context**: Error messages should provide clear guidance to users

## Multilingual Support

### Language Handling
- **Primary Language**: Arabic message is always required
- **Secondary Language**: English message is optional
- **Fallback Logic**: If English not provided, Arabic message used for both
- **User Interface**: System chooses appropriate language based on user settings

### Message Consistency
- **Same Meaning**: Both messages should convey the same validation error
- **Cultural Appropriateness**: Messages should be appropriate for each language
- **Field Names**: Consider translating field names in messages

## Common Validation Patterns

### Code Validation
```sql
Query: SELECT CASE WHEN {code} NOT LIKE 'TEMP%' THEN 1 ELSE 0 END
Arabic: "الكود {code} لا يمكن أن يبدأ بـ TEMP"
English: "Code {code} cannot start with TEMP"
```

### Required Field Validation
```sql
Query: SELECT CASE WHEN {description} IS NOT NULL AND LEN({description}) > 0 THEN 1 ELSE 0 END
Arabic: "الوصف مطلوب ولا يمكن أن يكون فارغاً"
English: "Description is required and cannot be empty"
```

### Business Rule Validation
```sql
Query: SELECT CASE WHEN {status} = 'DRAFT' OR {approvedBy} IS NOT NULL THEN 1 ELSE 0 END
Arabic: "المستند يجب أن يكون في حالة مسودة أو معتمد من مستخدم"
English: "Document must be in draft status or approved by a user"
```

## Monitoring and Troubleshooting

### Success Indicators
- **No Error Message**: Validation passes without showing error
- **Action Continues**: Subsequent actions in flow continue executing
- **No System Errors**: Query executes without technical errors

### Common Issues

**"Query not returning expected results"**
- Check query logic and field references
- Verify query syntax is correct
- Test query with known entity data
- Ensure query returns 0/1 values correctly

**"Error message not displaying correctly"**
- Check field placeholder syntax in message template
- Verify all referenced fields exist on entity
- Test message rendering with sample data
- Check for special characters in templates

**"Validation not triggering when expected"**
- Query may be returning 1 instead of 0 for error cases
- Review query logic - remember 0 = error
- Check if query conditions are correct
- Verify entity data matches expected values

**"Field placeholders not being replaced"**
- Check placeholder syntax uses curly braces {}
- Verify field names are spelled correctly
- Ensure fields exist on the entity being validated
- Check for typos in field paths

**"Multilingual messages not working"**
- Verify both Arabic and English messages are provided
- Check user language settings
- Ensure message templates are correctly formatted
- Test with different user language preferences

## Best Practices

### Query Design
- **Simple Logic**: Keep query logic as simple as possible
- **Clear Conditions**: Make validation conditions obvious and understandable
- **Performance**: Avoid complex joins or subqueries in validation
- **Testing**: Test queries with various entity data scenarios

### Error Message Design
- **User-Friendly**: Write messages that users can understand and act upon
- **Specific Information**: Include relevant field values in error messages
- **Action Guidance**: Tell users what they need to do to fix the error
- **Professional Tone**: Use appropriate business language

### Implementation Strategy
- **Start Simple**: Begin with basic validations, add complexity gradually
- **Test Thoroughly**: Test with various data combinations
- **User Feedback**: Get user feedback on error message clarity
- **Documentation**: Document validation rules for business users

### Maintenance Considerations
- **Rule Updates**: Plan for changing business rules over time
- **Message Updates**: Keep error messages current with business terminology
- **Performance Monitoring**: Monitor validation performance as data grows
- **User Training**: Train users on validation requirements

## Related Actions
- **Other Validation Actions**: Actions for different types of entity validation
- **Business Rule Management**: Tools for managing business rules and criteria
- **Error Handling**: Actions for managing error conditions and workflows
- **Message Management**: Tools for managing multilingual messages

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAErrorIfQueryNotMatched`

</div>