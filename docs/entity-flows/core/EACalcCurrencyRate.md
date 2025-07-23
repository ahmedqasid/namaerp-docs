---
title: EACalcCurrencyRate
module: core
---


<div class='entity-flows'>

# EACalcCurrencyRate

**This document was generated using AI Tools**

## Purpose
This action automatically calculates and sets the exchange rate for a foreign currency on document files. It looks up the current exchange rate between the document's currency and the base currency, then stores this rate in the specified field.

## When to Use This Action
- **Multi-Currency Documents**: When documents use foreign currencies and need exchange rates
- **Automatic Rate Calculation**: To avoid manual entry of exchange rates by users
- **Rate Standardization**: To ensure consistent exchange rates across documents
- **Real-Time Rates**: When you want current exchange rates applied automatically

## How It Works
1. **Currency Field Reading**: Reads the currency reference from the specified currency field
2. **Currency Resolution**: Converts the currency reference to the actual Currency entity
3. **Rate Calculation**: Uses the system's exchange rate utility to calculate the current rate
4. **Rate Setting**: Stores the calculated exchange rate in the specified rate field

## Entity Type Restrictions
This action can **ONLY** be used with **DocumentFile** entities (documents). It will not work with other entity types like master files or system entities.

## Parameters Required

### Parameter 1: Currency Field (Required)
- **What it is**: The property path to the field containing the currency reference
- **Format**: Property path using dot notation
- **Purpose**: Specifies where to find the currency for rate calculation
- **Note**: Must reference a Currency entity

### Parameter 2: Rate Field (Required)
- **What it is**: The property path to the field where the calculated rate should be stored
- **Format**: Property path using dot notation  
- **Purpose**: Specifies where to store the calculated exchange rate
- **Note**: Must be a decimal field that can store exchange rates

## Parameter Format Examples

### Simple Money Field Structure
```
Parameter 1: money.currency
Parameter 2: money.currencyRate
```

**Note**: Verify that the specific property paths exist in your entity before using them.

## How Exchange Rate Calculation Works

### System Exchange Rate Logic
- **Base Currency**: System has a configured base currency (usually local currency)
- **Rate Lookup**: System maintains exchange rate tables with current rates
- **Date Sensitivity**: Rates may be date-specific based on document date
- **Default Handling**: If no rate found, may use default rate or fail

### Rate Calculation Process
1. **Currency Identification**: Determines source currency from currency field
2. **Base Currency Reference**: Gets system base currency
3. **Rate Table Lookup**: Searches exchange rate tables for applicable rate
4. **Date Consideration**: Uses document date or current date for rate lookup
5. **Rate Assignment**: Sets calculated rate in the specified rate field

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **DocumentFile Only**: Can only be used with document entities, not master files
2. **Currency Required**: Currency field must contain a valid Currency entity reference
3. **Rate Field Type**: Rate field must be decimal type capable of storing exchange rates
4. **Exchange Rate Setup**: System must have exchange rates configured and maintained
5. **Field Validation**: Both parameter fields must exist on the entity

## Common Use Cases

This action is used when documents contain currency fields that need corresponding exchange rates calculated. The specific property names depend on your entity structure and must be verified in the entity documentation before use.

## Exchange Rate Configuration Requirements

### System Setup Needed
- **Base Currency**: System base currency must be defined
- **Exchange Rate Tables**: Current exchange rates must be maintained
- **Rate Sources**: Exchange rate data sources configured (manual or automatic)
- **Date Ranges**: Rate effective dates properly maintained

### Maintenance Requirements
- **Regular Updates**: Exchange rates should be updated regularly
- **Historical Rates**: Past rates maintained for historical documents
- **Rate Validation**: Rates should be validated for reasonableness
- **Backup Rates**: Default or backup rates for missing currencies

## Monitoring and Troubleshooting

### Success Indicators
- **Rate Calculated**: Exchange rate field is populated with decimal value
- **Non-Zero Rate**: Rate should be greater than zero for valid currencies
- **Consistent Rates**: Similar documents should get similar rates on same date

### Common Issues

**"Rate field remains empty"**
- Check if currency field contains valid Currency entity
- Verify exchange rate is configured for that currency pair
- Ensure rate field is correct property path and decimal type

**"Action fails with error"**
- Verify entity is DocumentFile type (not master file)
- Check both parameter field paths are valid
- Confirm currency field actually contains Currency reference

**"Rate is zero or unreasonable"**
- Check exchange rate table configuration
- Verify rates are current and properly maintained
- Review rate calculation logic and base currency setup

**"Different rates for same currency/date"**
- Check if multiple rate sources or rate types exist
- Verify rate lookup logic and priority rules
- Review system base currency configuration

## SQL Queries for Troubleshooting

```sql
-- Check current exchange rates (verify actual table and column names)
SELECT fromCurrency_id, toCurrency_id, rate, [dateColumn]
FROM [ExchangeRateTable] 
WHERE [dateColumn] <= GETDATE()
ORDER BY [dateColumn] DESC

-- Check document currency and rate fields (replace with actual table/column names)
SELECT id, code, [currencyField], [rateField], valueDate
FROM [DocumentTable]
WHERE [rateField] IS NULL OR [rateField] = 0
```

## Best Practices

### When to Use Automatic Rate Calculation
- **Standard Transactions**: For routine multi-currency transactions
- **High Volume**: When many documents need rates calculated
- **Consistency**: When rate consistency across documents is important
- **User Simplification**: To reduce manual data entry requirements

### When to Use Manual Rates
- **Special Transactions**: For non-standard or hedged transactions
- **Contracted Rates**: When specific rates are contractually agreed
- **Rate Override**: When system rates need to be overridden
- **Historical Documents**: When correcting historical rate errors

## Related Actions
- **EACalcCurrencyRateInDetails**: For calculating rates in document detail lines
- **Multi-Currency Validation**: For validating currency and rate combinations
- **Exchange Rate Management**: For maintaining exchange rate tables

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRate`

</div>