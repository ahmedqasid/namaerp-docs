---
title: EAPreventUseAsFromDocOfAField
module: core
---

<div class='entity-flows'>

# EAPreventUseAsFromDocOfAField

**This document was generated using Claude.ai**

## Overview

Prevents documents from being used as "from documents" by setting the `preventUseAsFromDoc` flag to true. Controls document copy-from and reference relationships for security and data integrity.

## When This Action Runs

- **Trigger:** Manual execution or automated workflows
- **Target:** DocumentFile entities that should be restricted from copy-from operations
- **Purpose:** Security and data integrity control for document copying
- **Timing:** On-demand when document access control is needed

## How It Works

1. **Resolves field value** from parameter to identify target documents
2. **Verifies target entities** are DocumentFile instances
3. **Sets restriction flag** `preventUseAsFromDoc = true` on target documents
4. **Applies immediately** without requiring entity save

## Key Difference from Allow Action

- **Restriction Direction:** Prevents instead of allows copy-from operations
- **Flag Value:** Sets `preventUseAsFromDoc = true` instead of false
- **Security Focus:** Emphasizes restriction rather than permission

## Parameters

### Parameter 1: Field ID (Required)
- **Purpose:** Identifies target field containing documents to restrict
- **Format:** Field identifier or expression
- **Examples:** `sourceInvoice`, `lines.product`, `sql(SELECT invoiceId FROM ...)`

## Database Tables Affected

### DocumentFile Entities
- **preventUseAsFromDoc** - Flag set to true to restrict copy-from operations
- **Common Types:** SalesInvoice, PurchaseInvoice, PaymentVoucher, JournalEntry

## Business Use Cases

1. **Document Security:** Prevent copying from confidential or completed documents
2. **Workflow Control:** Block copy-from until proper approvals obtained
3. **Data Integrity:** Stop copying from documents with known issues

## SQL Monitoring Example

```sql
SELECT entityType, id, code, preventUseAsFromDoc
FROM (
    SELECT 'SalesInvoice' as entityType, id, code, preventUseAsFromDoc 
    FROM SalesInvoice WHERE preventUseAsFromDoc = 1
    UNION ALL
    SELECT 'PurchaseInvoice' as entityType, id, code, preventUseAsFromDoc 
    FROM PurchaseInvoice WHERE preventUseAsFromDoc = 1
) AS RestrictedDocs;
```

## Important Warnings

### ⚠️ Operational Impact
- **Copy-From Blocking:** Documents cannot be used as source for copy operations
- **User Experience:** Copy-from buttons disabled for restricted documents
- **Workflow Disruption:** May break automated processes relying on document copying

### ⚠️ Access Control
- **Permanent Effect:** Restriction persists until explicitly removed
- **System-Wide Impact:** Affects all users and processes
- **Field Validation:** Invalid field IDs will cause action failure

## Related Actions

- **EAAllowUseAsFromDocOfAField** - Allows field to be used as document reference

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventUseAsFromDocOfAField`

</div>

