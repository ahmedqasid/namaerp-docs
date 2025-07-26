---
title: EAGenJournalEntry
module: accounting
---

<div class='entity-flows'>

# EAGenJournalEntry - Generate Journal Entries from Documents

**This document was enhanced using Claude.ai**

## Overview

**Purpose:** This entity action automatically creates journal entries (accounting vouchers) from any document in the system, allowing automatic posting of accounting effects to the ledger.

**When to Use:** Use this action when you need to automatically generate accounting entries for business documents like invoices, receipts, payments, purchase orders, etc.

**Module:** accounting  
**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenJournalEntry`

---

## How It Works

This action performs the following steps:
1. **Finds or creates** a journal entry using your finder query
2. **Updates journal entry fields** based on values from the source document  
3. **Generates accounting lines** (debits and credits) based on your effects configuration
4. **Applies currency conversion** if multi-currency fields are specified
5. **Saves the journal entry** and commits it to the ledger
6. **Copies data back** to the source document if needed

---

## Parameters Guide

### Parameter 1: Finder Query
**Purpose:** Locates an existing journal entry or determines when to create a new one.

**Format:** SQL query that returns a journal entry ID
```sql
-- Find existing journal entry linked to this document
SELECT id FROM JournalEntry WHERE ref1Id = {id}

-- Find by reference number
SELECT id FROM JournalEntry WHERE code = {code}

-- Always create new (return no results)
SELECT id FROM JournalEntry WHERE 1 = 0
```

**⚠️ Important Notes:**
- Use `{id}` to reference the source document's ID
- Use `{fieldName}` to reference any field from the source document
- If query returns no results, a new journal entry is created
- If query returns multiple results, the first one is used

---

### Parameter 2: Journal Entry Fields Updater
**Purpose:** Sets header fields on the journal entry from the source document.

**Format:** Field assignments separated by newlines
```
book="JEB"
term="JET"  
description1=description
ref1=id
date1=issueDate
branch=branchId
department=departmentId
```

**Available Fields:** Use ALT+CTRL+I on any journal entry to see all available fields, or check [Entity Documentation](https://dm.namasoft.com).

**⚠️ Critical Notes:**
- **book** field is required - specifies the journal book code
- Use double quotes for literal values: `book="JEB"`
- Use direct field names for source document fields: `ref1=id`
- Each assignment must be on a separate line

---

### Parameter 3: Effects Configuration
**Purpose:** Defines which fields create debit/credit lines and their accounting sides.

**Format:** `fieldId=DebitSideCode,CreditSideCode`

**Examples:**
```
-- Header field creating single debit/credit pair
n1=ASSET_DR,LIABILITY_CR

-- Detail lines creating multiple debit/credit pairs  
lines.n2=EXPENSE_DR,PAYABLE_CR
lines.amount=INVENTORY_DR,COST_CR

-- Multiple effects (each on new line)
n1=CASH_DR,SALES_CR
n2=COST_DR,INVENTORY_CR
```

**Field Types:**
- **Header fields:** `n1`, `n2`, `n3`, `n4`, `n5` or any numeric field
- **Detail fields:** `lines.fieldName` for collection items
- **Available fields:** Use ALT+CTRL+I to inspect field names

**Accounting Side Codes:**
- Must exist in **AccountingSideConfig** master file
- Examples: `ASSET_DR`, `LIABILITY_CR`, `REVENUE_CR`, `EXPENSE_DR`
- Use SQL to find available codes:
```sql
SELECT code, description FROM AccountingSideConfig WHERE active = 1
```

**⚠️ Critical Rules:**
- Field values must be **non-zero** to generate lines
- **Debit side** creates positive entries
- **Credit side** creates negative entries  
- Both sides must have valid AccountingSideConfig codes
- Empty or zero field values are **ignored**

---

### Parameter 4: Shorten Ledger
**Purpose:** Controls whether duplicate account lines are consolidated.

**Values:**
- `true` - Combines lines with same account into single debit/credit entries
- `false` - Keeps separate lines for each source detail

**Example:**
If you have 3 invoice lines affecting the same expense account:
- `false`: Creates 3 separate journal entry lines
- `true`: Creates 1 consolidated line with total amount

**⚠️ Recommendation:** Use `true` for cleaner journal entries unless you need line-by-line detail.

---

### Parameter 5: Inverse Copy Fields  
**Purpose:** Copies calculated values back from the journal entry to the source document.

**Format:** Field assignments (journal entry → source document)
```
ledgerTransReqId=ledgerTransReqId
totalDebit=totalDebit
totalCredit=totalCredit
```

**Common Use Cases:**
- Store journal entry ID reference in source document
- Copy totals for reporting
- Update status fields after posting

---

### Parameter 6: Apply When Query
**Purpose:** Conditional logic to include/exclude specific lines from effects.

**Format:** SQL query returning 0 (exclude) or 1 (include) for each line

**Examples:**
```sql
-- Only process lines where ref1 is Branch or Department  
SELECT CASE 
    WHEN {lines.ref1.entityType} IN ('Branch','Department') 
    THEN 1 ELSE 0 
END

-- Only process lines above certain amount
SELECT CASE 
    WHEN {lines.amount} > 1000 
    THEN 1 ELSE 0 
END

-- Process all lines
SELECT 1
```

**⚠️ Important Notes:**
- Query runs **once per detail line** if effects use `lines.fieldName`
- Query runs **once total** if effects use header fields only
- Use `{lines.fieldName}` to reference detail line fields
- **Missing query = process all lines**

---

### Parameter 7: Currency Field (Optional)
**Purpose:** Specifies which field contains the transaction currency.

**Format:** Field ID containing Currency entity reference
```
currency
lines.currency  
foreignCurrency
```

**Default Behavior:** Uses main currency from legal entity's ledger if not specified.

**⚠️ Multi-Currency Notes:**
- Field must reference a valid **Currency** entity
- Used with Rate Field for foreign currency conversion
- Each line can have different currency if using `lines.currencyField`

---

### Parameter 8: Rate Field (Optional)  
**Purpose:** Specifies exchange rate for currency conversion.

**Format:** Field ID containing exchange rate value
```
exchangeRate
lines.rate
conversionRate  
```

**Default Behavior:** Uses standard system exchange rate if not specified.

**⚠️ Exchange Rate Notes:**
- Rate should be relative to base currency
- Used in conjunction with Currency Field
- Decimal values like 1.25, 0.85, etc.

---

---

## Example Configurations

### Simple Sales Invoice Posting
```
Parameter 1 (Finder): SELECT id FROM JournalEntry WHERE ref1Id = {id}
Parameter 2 (Fields): book="SAL"\nref1=id\ndate1=issueDate
Parameter 3 (Effects): totalAmount=RECEIVABLE_DR,SALES_CR
Parameter 4 (Shorten): true  
Parameter 5 (Inverse): ledgerTransReqId=ledgerTransReqId
Parameter 6 (Apply When): [empty]
Parameter 7 (Currency): [empty]
Parameter 8 (Rate): [empty]
```

### Multi-Line Purchase Invoice
```
Parameter 1 (Finder): SELECT id FROM JournalEntry WHERE ref1Id = {id}
Parameter 2 (Fields): book="PUR"\nref1=id\ndate1=issueDate
Parameter 3 (Effects): lines.amount=EXPENSE_DR,PAYABLE_CR
Parameter 4 (Shorten): true
Parameter 5 (Inverse): ledgerTransReqId=ledgerTransReqId  
Parameter 6 (Apply When): SELECT CASE WHEN {lines.amount} > 0 THEN 1 ELSE 0 END
Parameter 7 (Currency): [empty]
Parameter 8 (Rate): [empty]
```

### Foreign Currency Transaction
```
Parameter 1 (Finder): SELECT id FROM JournalEntry WHERE ref1Id = {id}
Parameter 2 (Fields): book="FCY"\nref1=id\ndate1=transactionDate
Parameter 3 (Effects): foreignAmount=ASSET_DR,LIABILITY_CR
Parameter 4 (Shorten): false
Parameter 5 (Inverse): ledgerTransReqId=ledgerTransReqId
Parameter 6 (Apply When): [empty]  
Parameter 7 (Currency): foreignCurrency
Parameter 8 (Rate): exchangeRate
```

---

## Related Entities

- **JournalEntry** - The target accounting voucher entity
- **JournalEntryLine** - Individual debit/credit lines  
- **AccountingSideConfig** - Defines debit/credit behavior for accounts
- **Currency** - Multi-currency support
- **LedgerTransReq** - Internal ledger transaction request

---


</div>

