---
title: EAPreventUseAsFromDocOfAField
module: core
---


<div class='entity-flows'>

# EAPreventUseAsFromDocOfAField

**This document was generated using Claude.ai**

## Overview

This entity flow prevents documents from being used as "from documents" by setting the `preventUseAsFromDoc` flag to true. It controls the ability to create copy-from or reference relationships where the target document serves as the source document for new document creation.

## When This Action Runs

- **Trigger:** Manual execution or automated workflows
- **Target:** Any DocumentFile entity that should be restricted from copy-from operations
- **Scope:** Single entity or field-specified entities
- **Purpose:** Security and data integrity control for document copying

## How It Works

### 1. Field Value Resolution
- **Parameter Processing:** Accepts a field ID parameter to identify the target field
- **Value Extraction:** Uses EntityReflection to get field value from the entity
- **Complex Handling:** Supports direct fields, collections, generic references, and external entities
- **Expression Support:** Allows SQL-like expressions for dynamic field evaluation

### 2. Entity Identification
- **Type Checking:** Verifies target entities are DocumentFile instances
- **Reference Resolution:** Handles GenericReference and ExternalEntity objects
- **Collection Processing:** Iterates through collections to apply restrictions to multiple entities
- **Recursive Handling:** Processes nested field structures automatically

### 3. Restriction Application
- **Flag Setting:** Sets `preventUseAsFromDoc = true` on target documents
- **Permission Override:** Uses `allowSetting()` to bypass normal validation
- **Immediate Effect:** Restriction applies immediately without requiring entity save
- **Persistent Change:** Modification persists until explicitly reversed

## Key Difference from Allow Action

Unlike `EAAllowUseAsFromDocOfAField`:
- **Restriction Direction:** Prevents instead of allows copy-from operations
- **Flag Value:** Sets `preventUseAsFromDoc = true` instead of false
- **Security Focus:** Emphasizes restriction rather than permission

## Parameters

### Parameter 1: Field ID
- **Type:** Text (Field identifier)
- **Required:** Yes
- **Format:** Valid field identifier or expression

**Examples:**
- `sourceInvoice` - Direct field reference
- `lines.product` - Collection field reference
- `customer.creditLimit` - Related entity field
- `sql(select invoiceId from InvoicePayment where amount > 1000)` - SQL expression

**Field Syntax:**
- **Simple Fields:** `fieldName`
- **Collection Fields:** `collectionName.fieldName`
- **Related Entity Fields:** `relationField.targetField`
- **SQL Expressions:** `sql(query returning entity references)`

## Database Tables Affected

### Primary Impact
- **Target DocumentFile Entities:** Any document entity type specified by the field parameter
  - `preventUseAsFromDoc`: Set to true to restrict copy-from operations
  - Applied to entities identified through field resolution

### Common Target Entity Types
- **Sales Documents:** SalesInvoice, SalesOrder, SalesQuotation
- **Purchase Documents:** PurchaseInvoice, PurchaseOrder, PurchaseRequest
- **Financial Documents:** PaymentVoucher, ReceiptVoucher, JournalEntry
- **Inventory Documents:** InventoryTransfer, StockAdjustment

## Business Use Cases

### 1. Document Security Control
- **Sensitive Documents:** Prevent copying from confidential or restricted documents
- **Final Documents:** Block copy-from operations on completed or audited documents
- **Template Protection:** Secure master templates from unauthorized duplication

### 2. Workflow Management
- **Status-Based Restrictions:** Prevent copying from documents in specific workflow states
- **Approval Controls:** Block copy-from until proper approvals are obtained
- **Version Control:** Restrict copying from outdated or superseded document versions

### 3. Data Integrity Protection
- **Error Prevention:** Stop copying from documents with known data issues
- **Compliance Control:** Ensure regulatory documents cannot be used as copy sources
- **Quality Assurance:** Prevent propagation of incorrect data through document copying

## SQL Query for Monitoring

To check which documents are currently restricted from copy-from usage:

```sql
SELECT 
    entityType,
    id,
    code,
    name1,
    creationDate,
    preventUseAsFromDoc
FROM (
    SELECT 'SalesInvoice' as entityType, id, code, name1, creationDate, preventUseAsFromDoc FROM SalesInvoice WHERE preventUseAsFromDoc = 1
    UNION ALL
    SELECT 'PurchaseInvoice' as entityType, id, code, name1, creationDate, preventUseAsFromDoc FROM PurchaseInvoice WHERE preventUseAsFromDoc = 1
    UNION ALL
    SELECT 'PaymentVoucher' as entityType, id, code, name1, creationDate, preventUseAsFromDoc FROM PaymentVoucher WHERE preventUseAsFromDoc = 1
) AS RestrictedDocs
ORDER BY creationDate DESC;
```

## Important Warnings

### ⚠️ Operational Impact
- **Copy-From Blocking:** Documents with this flag cannot be used as source documents for copy operations
- **User Experience:** Copy-from buttons and operations will be disabled for restricted documents
- **Workflow Disruption:** May break automated processes that rely on document copying

### ⚠️ Data Access Restrictions
- **Permanent Effect:** Restriction persists until explicitly removed using EAAllowUseAsFromDocOfAField
- **System-Wide Impact:** Affects all users and processes attempting copy-from operations
- **No Automatic Reversal:** Flag remains true indefinitely unless manually changed

### ⚠️ Field Parameter Validation
- **Invalid Fields:** Non-existent field IDs will cause action failure
- **Type Compatibility:** Field must resolve to DocumentFile entities or collections thereof
- **Expression Errors:** Malformed SQL expressions in field parameter will cause failures

### ⚠️ Security Considerations
- **Access Control:** Ensure only authorized users can execute this restriction action
- **Business Logic:** Consider impact on legitimate business processes before applying
- **Documentation:** Maintain records of why specific documents are restricted

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventUseAsFromDocOfAField`

**Related Actions:**
- [EAAllowUseAsFromDocOfAField](EAAllowUseAsFromDocOfAField.md)


</div>

