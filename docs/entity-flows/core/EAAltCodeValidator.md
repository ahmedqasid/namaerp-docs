---
title: EAAltCodeValidator
module: core
---


<div class='entity-flows'>

# EAAltCodeValidator

**This document was generated using AI Tools**

## Purpose
This action validates the **alternative code** (altCode) of an entity against specified business rules. It checks the alternative code's length, prefix/suffix requirements, and pattern matching using regular expressions.

## When to Use This Action
- **Data Quality**: Ensure alternative codes follow company standards
- **Business Rules**: Enforce specific formatting requirements for alt codes
- **Integration**: Validate codes before sending to external systems
- **Compliance**: Meet regulatory requirements for code formats

## How It Works
1. **Code Retrieval**: Gets the alternative code from the entity
2. **Length Validation**: Checks minimum and maximum length requirements
3. **Prefix/Suffix Check**: Verifies codes start/end with required text
4. **Pattern Matching**: Tests against regular expression patterns
5. **Error Collection**: Accumulates all validation failures

## Parameters (All Optional)

### Parameter 1: Length Constraints
- **Format**: `MinLength,MaxLength`
- **Description**: Minimum and maximum allowed character count
- **Examples**: 
  - `5,10` - Code must be 5-10 characters
  - `3,` - Code must be at least 3 characters
  - `,8` - Code must be 8 characters or less

### Parameter 2: Prefix and Suffix
- **Format**: `Prefix,Suffix`
- **Description**: Required text at start and/or end of code
- **Examples**:
  - `ALT,` - Code must start with "ALT"
  - `,_X` - Code must end with "_X"
  - `PRE,SUF` - Code must start with "PRE" and end with "SUF"

### Parameter 3: Regular Expression
- **Format**: Any valid regular expression pattern
- **Description**: Advanced pattern matching for complex rules
- **Examples**:
  - `^[A-Z]{3}[0-9]{3}$` - 3 letters followed by 3 numbers
  - `^ALT-.*` - Must start with "ALT-"
  - `[A-Z0-9]+` - Only uppercase letters and numbers

## What Gets Validated

This action validates the **alternative code** field of entities, not the primary code. The alternative code is retrieved using `PersistenceUtility.getAltCode(entity)`.

## Validation Results

### Success
- **No errors**: If all validations pass, the action succeeds silently
- **Entity continues**: Business process continues normally

### Failure
- **Validation errors**: Clear messages explaining what validation failed
- **Process stops**: The business action is prevented from completing
- **Error examples**:
  - "Code length should be at least 5 characters"
  - "Code must start with ALT"
  - "Code does not match expression [A-Z]{3}[0-9]{3}"

## Common Validation Patterns

### Pattern 1: Basic Length Control
```
Parameter 1: 3,20
Parameter 2: (empty)
Parameter 3: (empty)
Result: Alt code must be 3-20 characters long
```

### Pattern 2: Department Prefix Requirement
```
Parameter 1: (empty)
Parameter 2: DEPT-,
Parameter 3: (empty)
Result: Alt code must start with "DEPT-"
```

### Pattern 3: Complex Format Validation
```
Parameter 1: 8,8
Parameter 2: (empty)
Parameter 3: ^[A-Z]{3}[0-9]{5}$
Result: Alt code must be exactly 8 characters: 3 letters + 5 numbers
```

## Important Notes

⚠️ **Key Points:**

1. **Alternative Code Only**: This validates the altCode field, not the primary code field
2. **All Parameters Optional**: Leave parameters empty to skip those validations
3. **Accumulating Errors**: Multiple validation failures are reported together
4. **Case Sensitive**: Prefix/suffix matching is case-sensitive
5. **Stops Process**: Validation failures prevent the business action from completing

## Related Actions
- **EACodeValidator**: Validates the primary code field instead of alternative code
- Both actions use the same validation logic but target different code fields

## Testing Your Validation Rules

Before implementing, test your rules:

1. **Test Length Rules**: Try codes that are too short/long
2. **Test Prefix/Suffix**: Try codes without required prefixes
3. **Test Regex**: Use online regex testers to validate patterns
4. **Edge Cases**: Test empty codes, special characters, spaces

## Troubleshooting

### Common Issues

**"Validation passes but shouldn't"**
- Check if the entity actually has an alternative code
- Verify parameter format (commas in right places)
- Test regex pattern separately

**"Regex always fails"**
- Escape special characters in regex
- Test pattern with actual code values
- Consider case sensitivity issues

**"Empty parameters cause errors"**
- Leave unwanted parameters completely empty
- Don't use spaces or placeholder text in empty parameters

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAltCodeValidator`

</div>