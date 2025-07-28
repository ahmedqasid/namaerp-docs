---
title: EACollectStockDocsIfEmpty
module: supplychain
---


<div class='entity-flows'>

# EACollectStockDocsIfEmpty

**This document was generated using Claude.ai**

## Overview

Automatically collects and links stock documents into invoices that have stock effects. Used for invoices that directly affect inventory without separate stock documents, ensuring proper inventory tracking and documentation.

## When This Action Runs

Manual execution on invoices with stock effects that need associated stock documents generated or linked for inventory management purposes.

## How It Works

1. **Validates invoice type** - Ensures the document is an invoice with stock effects capability
2. **Checks existing links** - Processes only if stock documents not already linked
3. **Collects stock documents** - Uses InvoiceWithStockEffectUtils to gather relevant stock documents
4. **Links to invoice** - Associates collected stock documents with the invoice

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Invoice Tables** - Updates invoice with stock document references
- **Stock Document Tables** - Links or creates stock documents
- **Document Relationship Tables** - Establishes invoice-to-stock document relationships

## Important Warnings

### ⚠️ Invoice Type Requirements
- Only works with invoices that implement InvoiceWithStockEffect interface
- Will fail on regular invoices without stock effect capability
- Cannot be used on non-invoice document types

### ⚠️ Stock Document Generation
- May create new stock documents automatically
- Existing stock documents may be modified
- Process is not reversible without manual intervention

### ⚠️ Inventory Impact
- Affects inventory tracking and valuation
- May trigger additional inventory transactions
- Consider timing of execution for period-end processes

### ⚠️ Document Relationships
- Creates permanent links between invoice and stock documents
- Linked documents cannot be independently deleted
- May affect document workflow and approval processes

### ⚠️ Performance Considerations
- Processing time depends on invoice complexity
- Large invoices with many lines may be slow
- Locks related documents during processing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectStockDocsIfEmpty`


</div>

