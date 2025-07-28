---
title: EACopyRevisionFromFromDoc
module: supplychain
---


<div class='entity-flows'>

# EACopyRevisionFromFromDoc

**This document was generated using Claude.ai**

## Overview

Copies revision ID and pricing information from parent document lines to child document lines. Ensures consistency of revision tracking and pricing across related documents in supply chain workflows.

## When This Action Runs

Manual execution on documents that have parent-child line relationships, typically when revision information needs to be synchronized from source documents to derived documents.

## How It Works

1. **Processes each line** - Iterates through all document lines
2. **Finds parent line** - Locates the corresponding parent line from the source document
3. **Copies revision ID** - Transfers revision ID from parent to child line
4. **Updates pricing** - For invoice lines, also copies price information
5. **Skips invalid lines** - Ignores lines without valid parent relationships

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Document Lines** - Updates revision ID in specific dimensions
- **Invoice Lines** - Additionally updates price information for invoice documents
- **Parent Document References** - Reads parent line relationships (read-only)

## Important Warnings

### ⚠️ Parent-Child Requirements
- Only works on documents with established parent-child line relationships
- Lines without parent references are skipped
- Parent document must be accessible and valid

### ⚠️ Revision Consistency
- Overwrites existing revision IDs without validation
- No verification that revision ID is appropriate for item
- May create inconsistencies if parent revisions are incorrect

### ⚠️ Price Copying for Invoices
- Automatically copies prices for invoice line types
- Overwrites existing pricing without confirmation
- May impact profitability calculations and discounts

### ⚠️ Data Dependencies
- Requires proper document linking setup
- Parent documents must exist and be committed
- Changes are permanent once applied

### ⚠️ Business Logic Impact
- Revision changes may affect inventory tracking
- Price updates could impact financial calculations
- Consider impact on approval workflows and business rules

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyRevisionFromFromDoc`


</div>

