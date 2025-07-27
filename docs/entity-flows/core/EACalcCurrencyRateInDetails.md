---
title: EACalcCurrencyRateInDetails
module: core
---

<div class='entity-flows'>

# EACalcCurrencyRateInDetails

**This document was generated using Claude.ai**

## Overview

Calculates and sets exchange rates for foreign currencies in document detail lines (collections). Processes each line individually to calculate appropriate exchange rates.

## When This Action Runs

Manual execution or automated through entity flows on DocumentFile entities with detail collections containing foreign currencies.

## How It Works

1. **Validates parameters** ensure all reference same detail collection
2. **Iterates through collection** processing each detail line
3. **Calculates rates** using ExchangeRateUtil for each line's currency
4. **Sets individual rates** on each detail line separately
5. **Handles errors gracefully** continuing with remaining lines

## Key Difference

Unlike EACalcCurrencyRate which handles single document header currencies, this action processes multiple detail lines with individual currencies in collections.

## Key Parameters

- **Parameter 1:** Currency Field (Required) - Full path including collection (e.g., `details.currency`)
- **Parameter 2:** Rate Field (Required) - Full path including collection (e.g., `details.exchangeRate`)
- **Parameter 3:** Detail Name (Required) - Collection name (e.g., `details`, `lines`, `items`)

### Parameter Examples:
```
Currency Field: details.currency, lines.foreignCurrency
Rate Field: details.exchangeRate, lines.currencyRate
Detail Name: details, lines, items, invoiceLines
```

## Database Tables Affected

- **Document Header** - Provides context for rate calculation
- **Detail Collection Items** - Currency fields read, rate fields updated
- **Currency/ExchangeRate** - Master data for rate calculation

## Important Warnings

### ⚠️ Parameter Requirements
- All three parameters must reference the same detail collection
- Field paths must use exact dot notation (collection.field)
- Collection and field names are case-sensitive

### ⚠️ Performance Impact
- Large collections may impact performance
- Each line requires separate rate calculation
- Consider memory usage with large detail collections

### ⚠️ Data Consistency
- Some lines may succeed while others fail
- Exchange rates must be available for all currencies
- Invalid currencies in lines may cause processing issues

## Related Actions

- [EACalcCurrencyRate](EACalcCurrencyRate.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRateInDetails`

</div>

