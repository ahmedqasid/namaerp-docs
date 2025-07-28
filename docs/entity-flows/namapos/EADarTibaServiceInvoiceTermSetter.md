---
title: EADarTibaServiceInvoiceTermSetter
module: namapos
---


<div class='entity-flows'>

# EADarTibaServiceInvoiceTermSetter

**This document was generated using Claude.ai**

## Overview

Sets payment terms on POS sales documents, but only when all items in the document are service items. Designed specifically for service-only invoices where special payment terms may apply. If any non-service items are present, the term setting is skipped.

## When This Action Runs

Manual execution on POS sales documents where service-specific payment terms need to be applied. Typically used in service-based businesses or mixed retail environments where service items require different payment conditions than physical products.

## How It Works

1. **Validates parameter** - Checks that a term code or ID is provided in parameter 1
2. **Filters non-service items** - Identifies any items in the document that are not service items
3. **Service-only check** - If any non-service items exist, skips term setting and returns
4. **Sets document term** - If all items are services, applies the specified payment term to the document
5. **Accumulates results** - Collects any validation errors or success status

## Parameters

**Parameter 1:** Term Code or ID (Required) - The code or database ID of the DocumentTerm to apply to the service invoice

## Database Tables Affected

- **DocumentTerm** - References payment term configuration (read-only)
- **POS Sales Document** - Updates the term field when conditions are met
- **Item/Service Tables** - Reads item type information to filter services (read-only)

## Important Warnings

### ⚠️ Service-Only Restriction
- Only applies terms when ALL items in the document are service items
- Mixed documents (service + product items) are skipped entirely
- No partial processing - it's all or nothing

### ⚠️ Parameter Validation
- Parameter 1 is required and must contain a valid term code or ID
- Empty or null parameter 1 causes action failure
- Invalid term codes/IDs may cause database lookup failures

### ⚠️ Term Lookup Logic
- Uses Persister.findByIdOrCode to locate DocumentTerm
- Accepts both numeric IDs and text codes
- Failed lookups may set null terms or cause exceptions

### ⚠️ Item Type Dependencies
- Relies on accurate ItemType.Service() classification
- Miscategorized items may cause unexpected behavior
- Verify item type configuration in master data

### ⚠️ Business Logic Specificity
- Designed for "Dar Tiba" business rules (specific client/region)
- May not apply to other business contexts
- Consider business rule alignment before use

### ⚠️ Silent Skipping
- Documents with non-service items are silently skipped
- No error or warning when term setting is bypassed
- May create confusion if users expect terms to be set

### ⚠️ No Rollback Mechanism
- Term changes are applied immediately
- No validation of term appropriateness for the document
- Consider impact on payment processing and collections

### ⚠️ Payment Term Impact
- Changing terms affects invoice due dates and payment schedules
- May impact customer payment behavior and cash flow
- Consider integration with accounting and collections systems

### ⚠️ Mixed Invoice Handling
- Action does nothing for invoices containing both services and products
- Alternative processing may be needed for mixed document types
- Consider business rules for hybrid service/product sales

### ⚠️ Document State Considerations
- May modify finalized or processed documents
- Consider document workflow state before applying terms
- Term changes might affect already-generated customer communications

### ⚠️ Error Accumulation
- Uses accumulating result pattern
- Multiple errors may be collected during processing
- Check full result for all validation issues

**Module:** namapos

**Full Class Name:** `com.namasoft.modules.namapos.utiles.actions.EADarTibaServiceInvoiceTermSetter`


</div>

