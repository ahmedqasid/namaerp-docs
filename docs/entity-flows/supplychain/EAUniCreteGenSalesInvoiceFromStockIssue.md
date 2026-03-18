---
title: EAUniCreteGenSalesInvoiceFromStockIssue
module: supplychain
---


<div class='entity-flows'>

# EAUniCreteGenSalesInvoiceFromStockIssue

**This document was generated using Claude.ai**

## Overview

Creates sales documents (typically invoices) from stock issue documents by tracing back to the original parent documents (like sales orders). Copies line information from the parent documents while using quantities from the stock issue, establishing proper document relationships and maintaining inventory tracking continuity.

## When This Action Runs

Automatic execution on stock issue documents when corresponding sales documents need to be generated, typically used in workflows where stock issues trigger invoice creation or when converting stock movements into billable sales transactions.

## How It Works

1. **Prevents recursion** - Uses document mapping to avoid infinite loops during automatic processing
2. **Identifies parent documents** - For each stock issue line, finds the corresponding parent document line
3. **Validates parent relationships** - Ensures all stock issue lines have valid parent document references
4. **Creates or finds target document** - Uses SQL query to locate existing target or creates new one
5. **Sets header information** - Copies book, term, warehouse, and location data from parent document
6. **Maps fields** - Applies field mapping from source to target document
7. **Processes document lines** - For each stock issue line:
   - Skips service items (no physical inventory impact)
   - Creates corresponding line in target document
   - Copies line data from original parent document
   - Sets quantities from stock issue document
   - Establishes origin document relationships
   - Processes any slave lines (related or dependent lines)
8. **Handles special relationships** - For StockIssue → SalesInvoice:
   - Links invoice to stock issue document
   - Sets up proper stock document relationships
9. **Applies inverse mapping** - Copies selected fields back from target to source

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to create

Example: `SalesInvoice`, `PurchaseInvoice`

**Parameter 2:** Parent Type (Required) - Entity type of parent documents to trace back to

Example: `SalesOrder`, `PurchaseOrder`

**Parameter 3:** Finder Query (Required) - SQL query to find or create target document

```sql
select id from SalesInvoice where customer_id = {customer.id} and invoiceDate = {creationDate}
```

**Parameter 4:** Fields Map (Required) - Field mapping from source to target document

Example: `customer=customer,invoiceDate=creationDate,notes=remarks`

**Parameter 5:** Inverse Fields Map (Optional) - Field mapping from target back to source

Example: `invoiceNumber=generatedInvoiceRef`

## Database Tables Affected

- **Target Document** - Creates new or updates existing sales/purchase documents
- **Target Document Lines** - Creates lines copying from parent documents with stock issue quantities
- **Document Relationships** - Establishes origin document links and stock document relationships
- **Parent Document Data** - Reads original order/requisition information (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenSalesInvoiceFromStockIssue`

**Document Type:** Stock Issue Documents

**Related Actions:**
- Document generation entity flows
- Stock to billing conversion utilities
- Document relationship management actions


</div>

