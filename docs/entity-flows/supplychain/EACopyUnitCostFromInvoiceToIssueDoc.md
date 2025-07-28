---
title: EACopyUnitCostFromInvoiceToIssueDoc
module: supplychain
---


<div class='entity-flows'>

# EACopyUnitCostFromInvoiceToIssueDoc

**This document was generated using Claude.ai**

## Overview

Copies unit prices from related invoice lines to issue document lines as unit costs. Calculates total costs by multiplying unit costs with quantities, ensuring accurate cost tracking in issue documents based on actual invoice pricing.

## When This Action Runs

Manual execution on issue documents that have origin relationships with invoices, typically when cost information needs to be transferred from purchase invoices to stock issue documents for accurate inventory costing.

## How It Works

1. **Processes issue lines** - Iterates through all lines in the issue document
2. **Finds origin invoice lines** - Locates the corresponding invoice line that originated the issue
3. **Validates line type** - Ensures origin line is an InvoiceLine (not other document types)
4. **Copies unit price** - Transfers unit price from invoice to issue line as unit cost
5. **Calculates total cost** - Multiplies unit cost by line quantity to get total cost

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Issue Document Lines** - Updates UnitCost and TotalCost fields
- **Invoice Lines** - Reads unit price information (read-only)
- **Document Origin Relationships** - Uses origin line references

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on IssueDocument types
- Origin lines must be InvoiceLine types
- Lines without invoice origins are skipped

### ⚠️ Origin Relationship Dependencies
- Requires valid origin line relationships between issue and invoice
- Issue lines without origin references are ignored
- Origin invoices must be accessible and committed

### ⚠️ Cost Overwrite
- Overwrites existing unit cost and total cost values
- Does not preserve manually entered costs
- No validation of cost reasonableness

### ⚠️ Inventory Costing Impact
- Changes affect inventory valuation and cost of goods sold
- May impact financial reporting and profitability analysis
- Consider impact on standard vs actual costing methods

### ⚠️ Currency Considerations
- No currency conversion between invoice and issue documents
- Assumes same currency for accurate cost transfer
- May create inconsistencies with multi-currency operations

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyUnitCostFromInvoiceToIssueDoc`


</div>

