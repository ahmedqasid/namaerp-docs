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

**Module:** namapos

**Full Class Name:** `com.namasoft.modules.namapos.utiles.actions.EADarTibaServiceInvoiceTermSetter`


</div>

