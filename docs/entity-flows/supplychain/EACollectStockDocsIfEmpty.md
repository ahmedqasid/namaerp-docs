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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectStockDocsIfEmpty`


</div>

