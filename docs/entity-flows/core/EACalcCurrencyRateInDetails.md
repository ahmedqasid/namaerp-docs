---
title: EACalcCurrencyRateInDetails
module: core
---


<div class='entity-flows'>

# EACalcCurrencyRateInDetails

**This document was generated using AI Tools**

## Purpose
This action automatically calculates and sets exchange rates for foreign currencies in document detail lines. It processes each detail line individually, looking up exchange rates for currencies found in detail lines and storing the calculated rates in the specified rate fields.

## When to Use This Action
- **Multi-Currency Detail Lines**: When document details have different currencies per line
- **Line-Level Currency Processing**: When each detail line needs its own exchange rate
- **Mixed Currency Documents**: Documents where different detail lines use different currencies
- **Automatic Detail Rate Calculation**: To avoid manual entry of exchange rates in detail lines

## How It Works
1. **Detail Line Processing**: Iterates through all detail lines in the specified detail collection
2. **Currency Field Reading**: For each detail line, reads the currency from the specified currency field
3. **Currency Resolution**: Converts currency references to actual Currency entities
4. **Rate Calculation**: Uses the system's exchange rate utility to calculate current rates
5. **Rate Setting**: Stores calculated rates in the specified rate field for each detail line

## Entity Type Restrictions
This action can **ONLY** be used with **DocumentFile** entities (documents) that have detail line collections. It will not work with other entity types.

## Parameters Required

### Parameter 1: Currency Field (Required)
- **What it is**: The full property path to the currency field in the detail lines
- **Format**: `[detailCollectionName].[currencyPropertyName]`
- **Purpose**: Specifies where to find the currency in each detail line
- **Validation**: Must start with the detail collection name from Parameter 3

### Parameter 2: Rate Field (Required)
- **What it is**: The full property path to the rate field in the detail lines
- **Format**: `[detailCollectionName].[ratePropertyName]`
- **Purpose**: Specifies where to store the calculated exchange rate in each detail line
- **Validation**: Must start with the detail collection name from Parameter 3

### Parameter 3: Detail Collection Name (Required)
- **What it is**: The name of the detail line collection property
- **Format**: Property name (like `details`, `lines`, `items`)
- **Purpose**: Specifies which detail collection to process
- **Validation**: Must be the prefix for both currency and rate field parameters

## Parameter Validation Rules

The system enforces strict parameter validation:
- **Parameter 1** must start with the detail collection name from Parameter 3
- **Parameter 2** must start with the detail collection name from Parameter 3
- All three parameters are required and cannot be empty

## Parameter Format Examples

### Template Format
```
Parameter 1: [detailCollectionName].[currencyPropertyName]
Parameter 2: [detailCollectionName].[ratePropertyName]  
Parameter 3: [detailCollectionName]
```

**Note**: Replace bracketed placeholders with actual property names from your entity documentation. Verify that the properties exist before using them.

## How Detail Processing Works

### Processing Flow
1. **Collection Access**: Gets the detail line collection using Parameter 3
2. **Line Iteration**: Processes each detail line in the collection individually
3. **Field Path Resolution**: Removes the collection prefix to get relative field paths
4. **Currency Lookup**: For each line, gets currency value from the currency field
5. **Rate Calculation**: Calculates exchange rate for each line's currency
6. **Rate Storage**: Sets the calculated rate in each line's rate field

### Field Path Processing
The system automatically handles field path conversion:
- **Input**: `[collection].[currencyField]` becomes `[currencyField]` for detail line processing
- **Input**: `[collection].[rateField]` becomes `[rateField]` for detail line processing
- This allows the action to work with the relative field names within each detail line

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **DocumentFile Only**: Can only be used with document entities, not master files
2. **Detail Collection Required**: Document must have a detail line collection
3. **Currency Required**: Each detail line's currency field must contain valid Currency entity
4. **Rate Field Type**: Rate fields must be decimal type capable of storing exchange rates
5. **Parameter Consistency**: All parameters must reference the same detail collection
6. **Null Currency Handling**: Lines with null/empty currency are skipped (no error)

## Common Use Cases

This action is used when document detail lines contain currency fields that need corresponding exchange rates calculated. Examples include:

- **Multi-Currency Sales Documents**: When each line item may have different currencies
- **Purchase Documents with Mixed Currencies**: When detail lines use various supplier currencies  
- **Expense Reports**: When individual expense lines are in different currencies

The specific property names depend on your entity structure and must be verified in the entity documentation before use.

## Monitoring and Troubleshooting

### Success Indicators
- **Rates Calculated**: Exchange rate fields populated in detail lines with currencies
- **Selective Processing**: Only detail lines with valid currencies get rates calculated
- **Consistent Rates**: Similar currencies on same date should get similar rates

### Common Issues

**"Some detail lines missing rates"**
- Check if those lines have valid currency values
- Lines with null/empty currency are intentionally skipped
- Verify currency references are properly set

**"Parameter validation errors"**
- Ensure Parameter 1 starts with Parameter 3 value
- Ensure Parameter 2 starts with Parameter 3 value
- Check parameter spelling and format

**"Action fails with error"**
- Verify entity is DocumentFile type with detail collections
- Check that detail collection name (Parameter 3) exists on entity
- Confirm currency and rate field paths are valid within detail lines

**"Rates are zero or incorrect"**
- Check exchange rate table configuration
- Verify system base currency is properly configured
- Review rate calculation logic and currency setup

## Field Path Examples

### Valid Parameter Combinations
```
✅ Correct Format:
Parameter 1: [collection].[currencyProperty]
Parameter 2: [collection].[rateProperty]
Parameter 3: [collection]
```

### Invalid Parameter Combinations
```
❌ Wrong - Parameter 1 doesn't start with Parameter 3:
Parameter 1: [currencyProperty]
Parameter 2: [collection].[rateProperty]
Parameter 3: [collection]

❌ Wrong - Inconsistent collection names:
Parameter 1: [collection1].[currencyProperty]
Parameter 2: [collection2].[rateProperty]
Parameter 3: [collection1]
```

## SQL Queries for Troubleshooting

```sql
-- Check detail lines with currencies but no rates
SELECT d.id, d.code, dl.[currencyField], dl.[rateField]
FROM [DocumentTable] d
JOIN [DetailTable] dl ON d.id = dl.parentId
WHERE dl.[currencyField] IS NOT NULL 
  AND (dl.[rateField] IS NULL OR dl.[rateField] = 0)

-- Check available exchange rates
SELECT fromCurrency_id, toCurrency_id, rate, effectiveDate
FROM ExchangeRate
WHERE effectiveDate <= GETDATE()
ORDER BY effectiveDate DESC
```

## Related Actions
- **EACalcCurrencyRate**: For calculating rates at document header level
- **Multi-Currency Validation**: For validating currency and rate combinations
- **Detail Line Processing**: For other detail line calculations

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRateInDetails`

</div>