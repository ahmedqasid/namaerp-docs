---
title: EAReverseLedgerTrans
module: accounting
---

<div class='entity-flows'>

# EAReverseLedgerTrans

**This document was generated using Claude.ai**

## Overview

The **EAReverseLedgerTrans** action reverses (cancels) previously created accounting transactions by creating opposite entries. This is commonly used when documents need to be cancelled, reversed, or when partial reversals are required based on specific percentages.

## What This Action Does

This action finds existing ledger transactions linked to specific entities and creates reverse entries by:
1. **Finding the original ledger transaction** using the entity ID provided in parameter 1
2. **Swapping debit and credit amounts** (debits become credits, credits become debits)
3. **Applying percentage adjustments** if specified in parameter 4 (for partial reversals)
4. **Adding the reversed lines** to the current document's ledger transaction
5. **Optionally shortening/consolidating** the ledger lines to reduce duplicate entries

## Parameters

### Parameter 1: Source Entity Field ⚠️ **REQUIRED**
**Field that provides the entity to reverse its ledger transactions**

- **Purpose**: Identifies which entity's ledger transactions should be reversed
- **Format**: Field reference (e.g., `originalDocument`, `sourceInvoice`)
- **Can be**: Single entity reference or list of entity references
- **Examples**:
  - `originalSalesInvoice` - Reverses the ledger of a specific sales invoice
  - `cancelledPayments` - Reverses multiple payment documents from a collection

**⚠️ Critical Warning**: This parameter is mandatory. If empty, no reversal will occur.

### Parameter 2: Shorten Reversed Lines
**Whether to consolidate the reversed ledger lines**

- **Values**: `true` or `false` (defaults to `false` if empty)
- **Purpose**: Groups identical account entries in the reversed lines to reduce clutter
- **When to use `true`**: When the original transaction had many duplicate account entries
- **When to use `false`**: When you need to maintain the exact line structure of the original

### Parameter 3: Shorten Final Lines
**Whether to consolidate all ledger lines after adding reversals**

- **Values**: `true` or `false` (defaults to `false` if empty)
- **Purpose**: Groups all identical account entries in the final combined ledger
- **When to use `true`**: For cleaner ledger presentation, especially when reversals cancel out some original entries
- **When to use `false`**: When detailed line-by-line tracking is required for audit purposes

### Parameter 4: Percentages Field (Optional)
**Field providing percentage values for partial reversals**

- **Purpose**: Allows partial reversal of transactions based on calculated percentages
- **Format**: Field reference or SQL expression returning percentage values (1-100)
- **Examples**:
  - `details.reversalPercentage` - Uses a percentage field from detail lines
  - `sql(SELECT CASE WHEN {details.item.item.code} = '123' THEN {details.quantity} * 100 / {originalQuantity} ELSE 100 END)` - Calculates percentage based on quantities
  - `sql(SELECT 50)` - Reverses 50% of all amounts

**🔢 Percentage Logic**:
- `100` = Full reversal (default if field is empty)
- `50` = Half reversal (amounts multiplied by 0.5)
- `25` = Quarter reversal (amounts multiplied by 0.25)

## When This Action Runs

This is an **automatic action** that executes during the **PreSendRequest** event, which occurs:
- Just before the document's ledger transaction is sent to the accounting system
- After all document validations have passed
- Before the final ledger transaction is processed

## Technical Details

### Entity Lookup Process
The action searches for existing ledger transactions using:
```sql
SELECT * FROM LedgerTrans 
WHERE originId = [Entity ID from Parameter 1]
```

### Reversal Logic
For each line in the found ledger transaction:
1. **Swap sides**: Original debits become credits, original credits become debits
2. **Apply percentage**: If specified, multiply amounts by (percentage ÷ 100)
3. **Update origin references**: Link reversed lines to the current document
4. **Clear origin details**: Remove references to the original transaction lines

### Data Flow
```
Original Document → Creates LedgerTrans → Stored with originId
     ↓
Current Document → Uses EAReverseLedgerTrans → Finds original LedgerTrans
     ↓
Reversed Lines → Added to current document's LedgerTrans
     ↓
Final LedgerTrans → Contains both original document lines + reversed lines
```

## Common Use Cases

### 1. Document Cancellation
```
Parameter 1: originalDocument
Parameter 2: false
Parameter 3: true
Parameter 4: (empty - full reversal)
```

### 2. Partial Return/Reversal
```
Parameter 1: originalInvoice
Parameter 2: false  
Parameter 3: true
Parameter 4: returnedItems.returnPercentage
```

### 3. Multiple Document Reversal
```
Parameter 1: cancelledPayments  (collection field)
Parameter 2: true
Parameter 3: true
Parameter 4: (empty - full reversal)
```

## ⚠️ Important Warnings

1. **Entity Must Have Ledger Effects**: The entity referenced in Parameter 1 must have previously generated ledger transactions
2. **Timing Sensitivity**: This action only works during document processing, not on saved documents
3. **No Double Reversal Protection**: Running this action multiple times will create multiple reversals
4. **Percentage Validation**: Ensure percentage fields return valid numeric values (0-100)
5. **Performance Impact**: Reversing large numbers of transactions may slow down document processing

## Module and Technical Information

- **Module**: accounting
- **Full Class**: `com.namasoft.modules.accounting.domain.utils.actions.EAReverseLedgerTrans`
- **Action Type**: Automatic (runs on PreSendRequest event)
- **Database Impact**: Creates new ledger transaction lines in the current document

</div>

