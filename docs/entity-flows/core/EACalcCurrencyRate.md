---
title: EACalcCurrencyRate
module: core
---

<div class='entity-flows'>

# EACalcCurrencyRate

**This document was generated using Claude.ai**

## Overview

Automatically calculates and sets exchange rates for foreign currency transactions on document entities. Retrieves appropriate exchange rate based on document's currency and date.

## When This Action Runs

Manual execution or automated through entity flows on DocumentFile entities with foreign currency transactions. Typically runs before document save or when currency changes.

## How It Works

1. **Retrieves currency** from specified currency field
2. **Calculates exchange rate** using ExchangeRateUtil with document context
3. **Sets calculated rate** to specified rate field
4. **Handles errors** for invalid currency or unavailable rates

## Key Parameters

- **Parameter 1:** Currency Field (Required) - Field path to currency field (e.g., `money.currency`)
- **Parameter 2:** Rate Field (Required) - Field path to rate field for calculated value (e.g., `money.currencyRate`)

### Common Field Examples:
```
Currency Field: money.currency, currency, foreignCurrency
Rate Field: money.currencyRate, exchangeRate, currencyExchangeRate
```

## Database Tables Affected

- **Target Document** - Currency field read, rate field updated
- **Currency** - Master currency data for validation
- **ExchangeRate** - Source for current/historical rates

## Important Warnings

### ⚠️ Requirements
- Currency field must contain valid, active currency
- Exchange rates must be available for specified currency
- Both currency and rate fields must exist and be accessible

### ⚠️ Field Configuration
- Currency field must reference Currency entity
- Rate field must be decimal type with sufficient precision
- Nested field paths must be correct

## Related Actions

- [EACalcCurrencyRateInDetails](EACalcCurrencyRateInDetails.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRate`

</div>


