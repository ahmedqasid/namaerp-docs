---
title: EACopyTaxesFromFromDoc
module: supplychain
---


<div class='entity-flows'>

# EACopyTaxesFromFromDoc

**This document was generated using Claude.ai**

## Overview

Copies maximum normal tax percentages (Tax1-Tax4) from parent invoice lines to child invoice lines. Ensures tax consistency across related documents by synchronizing tax rate settings between source and derived invoices.

## When This Action Runs

Manual execution on invoice documents that have parent-child line relationships, typically when tax rates need to be synchronized from source invoices to derived invoices like credit notes or return documents.

## How It Works

1. **Processes invoice lines** - Iterates through all document lines (only InvoiceLine types)
2. **Finds parent lines** - Locates corresponding parent invoice line from source document
3. **Initializes null values** - Updates null tax fields on both parent and child lines
4. **Copies tax percentages** - Transfers maximum normal percentages for all four tax types
5. **Skips non-invoice lines** - Ignores lines that are not InvoiceLine instances

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Invoice Lines** - Updates tax percentage fields (MaxNormalPercent for Tax1-Tax4)
- **Parent Document References** - Reads parent line relationships (read-only)
- **Price Information** - Modifies tax components within line pricing

## Important Warnings

### ⚠️ Invoice Line Requirement
- Only works on InvoiceLine document types
- Non-invoice lines are completely ignored
- Will not process other supply chain document line types

### ⚠️ Parent-Child Dependencies
- Requires valid parent-child line relationships
- Lines without parent references are skipped
- Parent documents must be accessible and contain InvoiceLine types

### ⚠️ Tax Rate Overwrite
- Overwrites existing tax percentages without validation
- Does not verify if tax rates are appropriate for jurisdiction
- May replace manually entered tax rates

### ⚠️ Limited Tax Scope
- Only copies maximum normal percentages (MaxNormalPercent)
- Does not copy other tax properties like tax codes or descriptions
- Limited to four tax types (Tax1, Tax2, Tax3, Tax4)

### ⚠️ Financial Impact
- Tax changes directly affect invoice totals and calculations
- May impact tax reporting and compliance
- Consider impact on accounting and tax submissions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyTaxesFromFromDoc`


</div>

