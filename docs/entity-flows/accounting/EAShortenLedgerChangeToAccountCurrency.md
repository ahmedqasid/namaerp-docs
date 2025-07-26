---
title: EAShortenLedgerChangeToAccountCurrency
module: accounting
---


<div class='entity-flows'>

# EAShortenLedgerChangeToAccountCurrency

**This document was generated using Claude.ai**

**Description:** Makes the ledger lines use the same currency as the account

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAShortenLedgerChangeToAccountCurrency`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself

## Overview

This entity flow automatically processes ledger transactions (LedgerTrans) to ensure that ledger lines use the same currency as their associated accounts. The action runs automatically before sending the request and handles currency alignment for multi-currency scenarios.

## When This Action Runs

- **Trigger Event:** PreSendRequest (before the ledger transaction request is sent for processing)
- **Automatic Execution:** Yes - this action runs automatically without manual intervention
- **Processing Scope:** All ledger transaction requests that contain lines with currency mismatches

## What This Action Does

The action examines each line in a ledger transaction request and performs the following steps:

1. **Identifies Currency Mismatches:** Checks if the account's currency differs from the transaction line's currency
2. **Validates Main Currency Alignment:** Ensures the account currency matches the legal entity's main ledger currency
3. **Currency Conversion:** When conditions are met, converts the line currency to match the account currency
4. **Optimizes Transaction:** Calls `shortenLines()` to consolidate and optimize the ledger lines

## Technical Process Flow

### Step 1: Line-by-Line Processing
For each line in the ledger transaction request:
- Retrieves the associated account
- Identifies the transaction amount (either debit or credit)
- Compares the account currency with the transaction currency

### Step 2: Currency Validation
The action only processes lines where:
- Account currency ≠ Transaction line currency
- Account currency = Legal entity's main ledger currency

### Step 3: Currency Adjustment
When validation passes:
- Sets exchange rate to 1.0 (since converting to main currency)
- Changes transaction currency to match account currency
- Updates transaction amount to use the local amount

### Step 4: Line Optimization
After processing all lines, calls `shortenLines()` to:
- Combine duplicate lines
- Remove zero-amount lines
- Optimize the overall transaction structure

## Key Fields and Entities

### Primary Entities
- **LedgerTrans:** The ledger transaction being processed
- **LedgerTransLine:** Individual lines within the transaction
- **Account:** Chart of accounts entries with currency specifications
- **LegalEntity:** The company/legal entity with main ledger currency

### Critical Fields
- **Account.currency:** The currency assigned to the account
- **LedgerTrans.legalEntity:** Reference to the legal entity
- **TransactionMoney:** Contains amount, currency, and exchange rate information
- **line.debit/credit:** Transaction amounts in debit or credit

## Field Assignments

When currency conversion occurs:
- `money.rate = 1.0` (exchange rate set to one)
- `money.currency = account.currency` (currency aligned to account)
- `money.amount = money.localAmount` (amount updated to local value)

## Business Rules and Conditions

### When Currency Conversion Happens
- Account currency differs from transaction line currency
- Account currency matches the legal entity's main currency
- Transaction contains either debit or credit amount

### When No Action Occurs
- Account currency already matches transaction currency
- Account currency differs from legal entity's main currency
- Transaction line has no debit or credit amount

## SQL Query Examples

To identify transactions that would be affected by this action:

```sql
SELECT 
    lt.id AS TransactionId,
    lt.legalEntity_id,
    ltl.account_id,
    a.currency_id AS AccountCurrency,
    le.mainCurrency_id AS MainCurrency,
    CASE 
        WHEN ltl.debit_amount IS NOT NULL THEN ltl.debit_currency_id
        WHEN ltl.credit_amount IS NOT NULL THEN ltl.credit_currency_id
    END AS LineCurrency
FROM LedgerTrans lt
    INNER JOIN LedgerTransLine ltl ON lt.id = ltl.ledgerTrans_id
    INNER JOIN Account a ON ltl.account_id = a.id
    INNER JOIN LegalEntity le ON lt.legalEntity_id = le.id
WHERE a.currency_id != CASE 
        WHEN ltl.debit_amount IS NOT NULL THEN ltl.debit_currency_id
        WHEN ltl.credit_amount IS NOT NULL THEN ltl.credit_currency_id
    END
    AND a.currency_id = le.mainCurrency_id;
```

To check accounts with specific currency settings:

```sql
SELECT 
    a.code,
    a.name1 AS AccountName,
    c.code AS CurrencyCode,
    le.name1 AS LegalEntityName,
    mc.code AS MainCurrencyCode
FROM Account a
    INNER JOIN Currency c ON a.currency_id = c.id
    INNER JOIN LegalEntity le ON a.legalEntity_id = le.id
    INNER JOIN Currency mc ON le.mainCurrency_id = mc.id
WHERE a.currency_id != le.mainCurrency_id;
```

## Important Warnings

**⚠️ Currency Alignment Requirement:** This action only processes accounts whose currency matches the legal entity's main currency. Accounts with other currencies will not be converted.

**⚠️ Exchange Rate Override:** The action sets the exchange rate to 1.0, assuming no conversion is needed when aligning to the main currency. Verify this assumption in your multi-currency setup.

**⚠️ Transaction Modification:** This action modifies transaction amounts and currencies before processing. Ensure your reporting and audit trails account for these automatic adjustments.

**⚠️ Line Optimization Impact:** The `shortenLines()` call may combine or remove lines, affecting the final transaction structure and line-level reporting.

## System Integration Notes

- **UI Field Inspection:** Use ALT+CTRL+I on currency and account fields to verify field configurations
- **Documentation Reference:** Check https://dm.namasoft.com for detailed entity field specifications
- **Audit Considerations:** Track currency conversion effects in audit logs and reports
- **Performance Impact:** This action processes every line in large transactions, monitor performance on high-volume systems


</div>

