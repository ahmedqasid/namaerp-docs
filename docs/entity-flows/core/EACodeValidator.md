---
title: EACodeValidator
module: core
---


<div class='entity-flows'>

# EACodeValidator

**This document was generated using AI Tools**

## Purpose
This action validates entity codes (like customer codes, item codes, account codes) against configurable rules including length limits, prefix/suffix requirements, and regular expression patterns. It ensures consistent code formatting across the system.

## When to Use This Action
- **Code Standardization**: Enforce consistent coding standards across entities
- **Data Entry Validation**: Prevent invalid codes during entity creation/modification
- **Import Validation**: Validate codes during data import procedures
- **Compliance Requirements**: Meet coding standards required by regulations or policies
- **System Integration**: Ensure codes meet external system requirements

## How It Works
1. **Length Validation**: Checks if code length falls within specified minimum/maximum limits
2. **Prefix/Suffix Validation**: Verifies code begins and/or ends with required text
3. **Pattern Validation**: Tests code against regular expression for complex format rules
4. **Error Accumulation**: Collects all validation failures and reports them together
5. **Result Return**: Returns success if all validations pass, failure with details if any fail

## Parameters Required

### Parameter 1: Length Limits (Optional)
- **What it is**: Minimum and maximum allowed length for the entity code
- **Format**: `MinLength,MaxLength` (comma-separated)
- **Examples**: `3,10`, `5,5`, `2,20`
- **Purpose**: Ensures codes are within acceptable length ranges
- **Note**: Either value can be omitted (e.g., `,10` for max only, `3,` for min only)

### Parameter 2: Prefix and Suffix (Optional)
- **What it is**: Required text at the beginning and/or end of the code
- **Format**: `Prefix,Suffix` (comma-separated)
- **Examples**: `CUST,`, `,001`, `ACC,END`
- **Purpose**: Enforces consistent code prefixes and suffixes
- **Note**: Either value can be omitted (e.g., `CUST,` for prefix only, `,END` for suffix only)

### Parameter 3: Regular Expression (Optional)
- **What it is**: Pattern that the code must match for complex validation rules
- **Format**: Standard regular expression syntax
- **Examples**: `^[A-Z]{2}[0-9]{4}$`, `[A-Z0-9-]+`, `^(CUST|VEND)[0-9]{3}$`
- **Purpose**: Implements complex formatting rules beyond simple prefix/suffix checks

## Parameter Examples and Use Cases

### Length Validation Examples
```
Parameter 1: "3,10"     - Code must be 3-10 characters long
Parameter 1: "5,5"      - Code must be exactly 5 characters  
Parameter 1: "2,"       - Code must be at least 2 characters
Parameter 1: ",15"      - Code must be at most 15 characters
```

### Prefix/Suffix Examples
```
Parameter 2: "CUST,"    - Code must start with "CUST"
Parameter 2: ",001"     - Code must end with "001"  
Parameter 2: "ACC,END"  - Code must start with "ACC" and end with "END"
Parameter 2: ","        - No prefix/suffix requirements
```

### Regular Expression Examples
```
Parameter 3: "^[A-Z]{3}[0-9]{3}$"     - 3 letters followed by 3 numbers
Parameter 3: "^(CUST|VEND)[0-9]+$"    - Starts with CUST or VEND, then numbers
Parameter 3: "^[A-Z0-9-]+$"           - Only uppercase letters, numbers, hyphens
Parameter 3: "^.{5,10}$"              - Any characters, 5-10 length
```

## Validation Logic

### Processing Order
1. **Length Check**: If Parameter 1 provided, validates code length
2. **Prefix/Suffix Check**: If Parameter 2 provided, validates start/end text
3. **Pattern Check**: If Parameter 3 provided, validates against regular expression
4. **Error Collection**: All failed validations are collected and reported

### Error Messages
- **Length Errors**: "Code length should be at least X characters" / "Code length should not exceed X characters"
- **Prefix Errors**: "Code must start with X"  
- **Suffix Errors**: "Code must end with X"
- **Pattern Errors**: "Code does not match expression X"

## Code Validation Examples

### Customer Code Validation
```
Parameter 1: "4,8"              - 4-8 characters long
Parameter 2: "CUST,"            - Must start with "CUST"
Parameter 3: "^CUST[0-9]{1,4}$" - CUST followed by 1-4 digits

Valid Codes: CUST1, CUST123, CUST9999
Invalid Codes: CUS1 (too short), CUST12345 (too long), CUSTOMER1 (wrong pattern)
```

### Account Code Validation  
```
Parameter 1: "6,6"                    - Exactly 6 characters
Parameter 2: ","                      - No prefix/suffix requirement
Parameter 3: "^[0-9]{4}-[0-9]{2}$"   - 4 digits, hyphen, 2 digits

Valid Codes: 1000-01, 5500-10, 9999-99
Invalid Codes: 100-01 (too short), 1000-1 (wrong pattern), ABCD-01 (letters)
```

### Item Code Validation
```
Parameter 1: "3,15"         - 3-15 characters
Parameter 2: ","            - No prefix/suffix requirement  
Parameter 3: "^[A-Z0-9-]+$" - Uppercase letters, numbers, hyphens only

Valid Codes: ITEM-001, WIDGET-A, PROD123
Invalid Codes: xy (too short), item-001 (lowercase), ITEM_001 (underscore)
```

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Validation Only**: This action only validates codes - it doesn't change them
2. **Existing Codes**: Only validates the current entity's code field
3. **Parameter Order**: All three parameters are optional but processed in sequence
4. **RegEx Complexity**: Complex regular expressions can impact performance
5. **Case Sensitivity**: All validations are case-sensitive

## Regular Expression Guidelines

### Common Patterns
- **`^[A-Z]+$`**: Only uppercase letters
- **`^[0-9]+$`**: Only numbers  
- **`^[A-Z0-9]+$`**: Uppercase letters and numbers
- **`^[A-Z0-9-]+$`**: Letters, numbers, and hyphens
- **`^.{n,m}$`**: Any character, n to m length
- **`^(OPT1|OPT2).*$`**: Starts with OPT1 or OPT2

### Pattern Safety
- **Test Patterns**: Always test regular expressions before deployment
- **Escape Characters**: Use `\\` for literal backslashes, `\.` for literal dots
- **Performance**: Keep patterns simple for better performance
- **Documentation**: Document complex patterns for future reference

## Monitoring and Troubleshooting

### Success Indicators
- **No Error Messages**: All validation rules pass
- **Action Completes**: No exceptions or system errors
- **Expected Behavior**: Codes meeting requirements are accepted

### Common Issues

**"Code length should be at least X characters"**
- Entity code is shorter than minimum required length
- Check Parameter 1 minimum value is reasonable
- Verify code field contains expected data

**"Code length should not exceed X characters"**
- Entity code is longer than maximum allowed length
- Check Parameter 1 maximum value allows sufficient length
- Verify code field doesn't have extra spaces or characters

**"Code must start with X"**
- Entity code doesn't begin with required prefix
- Check Parameter 2 prefix value is correct
- Verify entity code field value

**"Code must end with X"**
- Entity code doesn't end with required suffix
- Check Parameter 2 suffix value is correct
- Ensure code doesn't have trailing spaces

**"Code does not match expression"**
- Entity code fails regular expression validation
- Test regular expression with sample codes
- Check for typos in Parameter 3 pattern
- Verify pattern syntax is correct

**"Regular expression errors"**
- Invalid regular expression syntax in Parameter 3
- Test pattern in regex testing tool
- Check for unescaped special characters
- Verify pattern compiles correctly

## SQL Queries for Code Analysis

```sql
-- Check code lengths across entities (replace TableName with actual table)
SELECT code, LEN(code) as code_length, COUNT(*) as count_records
FROM [EntityTable]
GROUP BY code, LEN(code)
ORDER BY LEN(code), code

-- Find codes that don't match prefix pattern (replace 'PREFIX' with actual prefix)
SELECT code, name1
FROM [EntityTable] 
WHERE code NOT LIKE 'PREFIX%'
ORDER BY code

-- Check for codes with special characters (replace TableName)
SELECT code, name1
FROM [EntityTable]
WHERE code LIKE '%[^A-Z0-9-]%'  -- Finds codes with chars other than A-Z, 0-9, hyphen
ORDER BY code

-- Analyze code patterns (replace TableName)
SELECT 
    LEFT(code, 3) as code_prefix,
    RIGHT(code, 3) as code_suffix,
    LEN(code) as code_length,
    COUNT(*) as count_codes
FROM [EntityTable]
GROUP BY LEFT(code, 3), RIGHT(code, 3), LEN(code)
ORDER BY count_codes DESC
```

## Best Practices

### Parameter Design
- **Start Simple**: Begin with basic length and prefix rules
- **Add Complexity Gradually**: Introduce regular expressions as needed
- **Test Thoroughly**: Validate rules with sample data before deployment
- **Document Rules**: Explain the business reason for each validation rule

### Implementation Strategy
- **Entity-Specific Rules**: Different entities may need different validation rules
- **Granular Validation**: Use separate actions for different validation needs
- **User Training**: Educate users about code formatting requirements
- **Error Messages**: Ensure validation errors are clear and actionable

### Maintenance Considerations
- **Review Regularly**: Periodically review validation rules for relevance
- **Performance Monitoring**: Monitor impact of complex regular expressions
- **Rule Updates**: Plan for changes to coding standards over time
- **Exception Handling**: Have procedures for handling legacy codes that don't comply

## Related Actions
- **Entity Creation Validation**: Other validation actions for entity data
- **Data Import Validation**: Tools for validating imported entity codes
- **Code Generation**: Actions that automatically generate compliant codes
- **Data Cleanup**: Tools for fixing non-compliant codes

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACodeValidator`

</div>