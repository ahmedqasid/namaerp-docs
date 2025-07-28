---
title: EASpreadAssemblyComponents
module: supplychain
---


<div class='entity-flows'>

# EASpreadAssemblyComponents

**This document was generated using Claude.ai**

## Overview

Expands assembly items in supply chain documents by spreading their Bill of Materials (BOM) components. Replaces assembly items with their individual component items, transferring quantities and specifications from the parent assembly to each component line according to the BOM structure.

## When This Action Runs

Manual execution on supply chain documents containing assembly items that need to be broken down into their component parts, typically used for production orders, material requisitions, or detailed shipping documents where individual components need to be tracked separately.

## How It Works

1. **Identifies assembly items** - Scans document lines for items with Bill of Materials (BOM) structures
2. **Retrieves BOM components** - Gets component items and quantities from the assembly's BOM
3. **Calculates component quantities** - Multiplies BOM component quantities by assembly line quantities
4. **Creates component lines** - Adds new document lines for each BOM component
5. **Transfers specifications** - Copies dimensions, pricing, and other details to component lines
6. **Handles parent lines** - Either removes original assembly lines or keeps them based on parameter setting
7. **Accumulates results** - Collects any processing errors or warnings

## Parameters

**Parameter 1:** Do Not Remove Parent Lines (Optional) - true/false to keep original assembly lines (default: false)

- `true` - Keep original assembly lines along with component lines
- `false` - Remove original assembly lines after creating component lines

## Database Tables Affected

- **BasicSCDocumentLine** - Creates new component lines and optionally removes assembly lines
- **BOM Components** - Reads bill of materials structure and component quantities (read-only)
- **Item Data** - Reads component item information and specifications (read-only)
- **Item Dimensions** - Transfers lot, box, size, color, revision data to components

## Important Warnings

### ⚠️ Assembly Item Requirements
- Only processes lines with items that have valid Bill of Materials (BOM)
- Items without BOM structures are not affected
- BOM must be active and properly configured with component items
- Ensure BOM accuracy before processing to avoid incorrect component expansion

### ⚠️ Quantity Calculation Logic
- Component quantities are calculated by multiplying BOM quantities by line quantities
- Quantity calculations respect unit of measure conversions
- Large assembly quantities may result in very large component quantities
- Review quantity calculations for accuracy before document processing

### ⚠️ Parent Line Handling Options
- **Default behavior (false)**: Original assembly lines are removed after component expansion
- **Keep parent lines (true)**: Assembly lines remain along with new component lines
- Keeping parent lines may cause duplicate inventory effects
- Consider business requirements for assembly vs. component tracking

### ⚠️ Document Line Structure Impact
- Adds multiple new lines for each assembly item expanded
- Document line count may increase significantly
- Line numbering and sequence may be affected
- Large assemblies with many components may impact document performance

### ⚠️ Component Item Validation
- All BOM component items must exist and be active
- Missing or inactive component items cause processing failures
- Component items must be compatible with document type
- Review BOM completeness before assembly expansion

### ⚠️ Dimension and Specification Transfer
- Lot, box, size, color, and revision data are transferred to components
- Some specifications may not be appropriate for all component types
- Component-specific dimensions may need manual adjustment
- Consider component compatibility with inherited specifications

### ⚠️ Pricing and Cost Implications
- Component pricing may differ from assembly pricing
- Cost allocations between components may require adjustment
- Assembly discounts and pricing rules may not apply to components
- Review pricing logic after component expansion

### ⚠️ Inventory Impact Considerations
- Component expansion affects inventory allocation and tracking
- Assembly inventory effects are replaced by component effects
- Stock availability must be checked for all component items
- Consider impact on material planning and procurement

### ⚠️ BOM Version and Effectivity
- Uses current active BOM version for component expansion
- BOM effective dates and versions affect component selection
- Historical BOMs may produce different component structures
- Ensure appropriate BOM version is active for processing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASpreadAssemblyComponents`

**Document Type:** Supply Chain Documents with Assembly Items

**Related Actions:**
- BOM management entity flows
- Assembly processing utilities
- Component allocation actions


</div>

