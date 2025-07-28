---
title: EAMultiCustomerSalesOfferCreator
module: supplychain
---


<div class='entity-flows'>

# EAMultiCustomerSalesOfferCreator

**This document was generated using Claude.ai**

## Overview

Creates individual sales quotations for multiple customers from a single sales order that contains lines for different customers. Groups sales order lines by customer (stored in ref1 field), creates separate quotations for each customer, and maintains relationships between the original order and generated quotations.

## When This Action Runs

Manual execution on sales orders that contain lines for multiple customers, typically when a bulk order needs to be split into individual customer quotations for separate processing, pricing, or approval workflows.

## How It Works

1. **Groups lines by customer** - Uses ref1 field to identify customer for each sales order line
2. **Retrieves packing data** - Gets associated packing list information for pricing (n1 field)
3. **Finds existing quotations** - Looks for quotations already linked to this sales order
4. **Creates/updates quotations** - For each customer group:
   - Creates new quotation or updates existing one (based on ref4 reference)
   - Copies header data from sales order with field mapping
   - Sets customer, from document, and reference relationships
   - Copies pricing information from packing list
   - Creates quotation lines from corresponding sales order lines
5. **Updates order references** - Sets ref4 on sales order lines to link back to quotations
6. **Cleans up orphans** - Deletes quotations that are no longer referenced

## Parameters

**Parameter 1:** Reserved (Not used)
**Parameter 2:** Fields Map (Required) - Field mapping for copying header data from sales order to quotations

```
code=code
currency=currency
term=term
```

## Database Tables Affected

- **SalesQuotation** - Creates new quotations or updates existing ones
- **SalesQuotationLine** - Creates quotation lines from sales order lines
- **SalesOrder** - Updates ref4 references on lines to link to quotations (read/update)
- **PackingList** - Reads pricing information (read-only)

## Important Warnings

### ⚠️ Customer Grouping Requirements
- Lines must have customer references in ref1 field
- Lines without ref1 values are ignored
- Each unique ref1 value creates a separate quotation
- Ensure customer references are valid and accessible

### ⚠️ Existing Quotation Handling
- Existing quotations linked via ref4 are updated, not recreated
- Orphaned quotations (not referenced by any line) are deleted
- Quotation deletion is permanent and cannot be undone
- Consider business impact before running on orders with existing quotations

### ⚠️ Field Mapping Requirements
- Fields map must specify valid field names for both source and target
- Invalid field mappings may cause silent failures or errors
- Header data copying happens twice for consistency
- Test field mappings with sample data before production use

### ⚠️ Packing List Dependencies
- Pricing information (n1) comes from packing list entries
- Packing list lines must also be grouped by customer (ref1)
- Missing packing data results in zero pricing
- Ensure packing list is properly maintained before execution

### ⚠️ Line Reference Management
- Updates ref4 on sales order lines to maintain quotation relationships
- Changes affect document traceability and reporting
- May impact existing business processes relying on these references
- Consider downstream effects on inventory and fulfillment

### ⚠️ Transaction Scope Impact
- Creates/updates multiple quotations in single transaction
- Large orders with many customers may have performance impact
- All changes roll back if any quotation creation fails
- Monitor system resources during execution

### ⚠️ Document Relationship Complexity
- Creates bidirectional relationships between orders and quotations
- Sets fromDoc, ref5, and ref4 references for complete traceability
- Complex relationship structure may affect reporting queries
- Document deletion becomes more complex due to relationships

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAMultiCustomerSalesOfferCreator`

**Related Entities:**
- **SalesOrder** - Source document containing multi-customer lines
- **SalesQuotation** - Generated quotations for individual customers
- **PackingList** - Source of pricing information


</div>

