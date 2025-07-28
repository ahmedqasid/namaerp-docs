---
title: EARegenAssemblyDocumentDetailsFromBOM
module: supplychain
---


<div class='entity-flows'>

# EARegenAssemblyDocumentDetailsFromBOM

**This document was generated using Claude.ai**

## Overview

Regenerates assembly document lines from the Bill of Materials (BOM) by replacing existing document lines with fresh component lines based on the current BOM structure. Recreates the complete assembly structure using the most up-to-date BOM configuration and component requirements.

## When This Action Runs

Manual execution on assembly documents when the BOM structure has changed and document lines need to be completely rebuilt, typically after BOM updates, component changes, or when assembly lines are out of sync with the current BOM configuration.

## How It Works

1. **Invokes BOM regeneration** - Calls the document's regenAssemblyDocumentLinesFromBom() method
2. **Clears existing lines** - Removes current assembly document lines
3. **Reads current BOM** - Accesses the latest BOM structure for the assembly item
4. **Creates new lines** - Generates fresh document lines for each BOM component
5. **Applies quantities** - Sets component quantities based on BOM requirements and assembly quantity
6. **Maintains relationships** - Establishes proper parent-child relationships between components
7. **Returns success** - Always completes successfully after regeneration

## Parameters

This action does not require any parameters - it automatically regenerates all lines from the current BOM structure.

## Database Tables Affected

- **Assembly Document Lines** - Completely replaces existing lines with new BOM-based lines
- **Bill of Materials (BOM)** - Reads current BOM structure and components (read-only)
- **Item Master Data** - References component items and specifications (read-only)
- **Assembly Configuration** - Uses assembly setup and parameters (read-only)

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on AssemblyDocument types
- Other document types are not supported
- Document must have valid assembly item with associated BOM
- Requires proper BOM configuration and component setup

### ⚠️ Complete Line Replacement
- **ALL existing document lines are removed and replaced**
- Any manual modifications to lines will be lost permanently
- Custom line data, notes, or adjustments are not preserved
- This is a destructive operation that cannot be undone

### ⚠️ BOM Structure Dependencies
- Uses current active BOM for the assembly item
- Requires valid BOM with properly configured components
- BOM must be accessible and not in draft or inactive state
- Component items in BOM must exist and be active

### ⚠️ Quantity and Relationship Impact
- Component quantities are recalculated based on BOM ratios
- Assembly quantity affects all component quantities proportionally
- Multi-level assemblies create nested component structures
- Quantity changes may affect material requirements and costs

### ⚠️ Data Loss Warning
- **All existing line modifications are permanently lost**
- Manual cost adjustments, notes, and custom data are removed
- Previously allocated inventory may become unallocated
- Consider backing up document data before execution

### ⚠️ Inventory and Allocation Impact
- Existing inventory allocations for old lines are released
- New lines may require fresh inventory allocation
- May affect material availability and production scheduling
- Consider impact on work orders and material planning

### ⚠️ Cost and Pricing Impact
- Component costs are recalculated based on current BOM costing
- Assembly costs may change significantly
- Labor and overhead allocations are recalculated
- May affect assembly pricing and profitability analysis

### ⚠️ Business Process Considerations
- May invalidate approved assembly orders
- Could affect production schedules and material planning
- Consider impact on work in progress and manufacturing execution
- Document changes for production planning and cost accounting

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenAssemblyDocumentDetailsFromBOM`

**Document Type:** Assembly Documents Only

**Operation Type:** Destructive - Complete line replacement


</div>

