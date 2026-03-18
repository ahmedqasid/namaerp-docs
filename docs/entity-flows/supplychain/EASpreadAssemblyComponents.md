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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASpreadAssemblyComponents`

**Document Type:** Supply Chain Documents with Assembly Items

**Related Actions:**
- BOM management entity flows
- Assembly processing utilities
- Component allocation actions


</div>

