---
title: EASetDefaultWarehouseForServiceItems
module: supplychain
---


<div class='entity-flows'>

# EASetDefaultWarehouseForServiceItems

**This document was generated using Claude.ai**

## Overview

Automatically assigns a default warehouse to service items in supply chain documents that don't already have a warehouse specified. Scans all document lines, identifies service items without warehouse assignments, and sets the specified warehouse for proper inventory tracking and reporting.

## When This Action Runs

Manual execution on supply chain documents when service items need warehouse assignments, typically used for standardizing warehouse locations for service items or ensuring all items have proper warehouse tracking for reporting purposes.

## How It Works

1. **Scans document lines** - Iterates through all lines in the supply chain document
2. **Filters for service items** - Identifies lines with items that have service item type
3. **Checks warehouse assignment** - Skips lines that already have warehouse assignments
4. **Updates dimensions** - Calls updateNulls() to initialize dimension fields
5. **Assigns warehouse** - Sets the specified warehouse in the line's specific dimensions
6. **Validates assignment** - Verifies the warehouse was found and assigned successfully
7. **Accumulates errors** - Collects any failures for invalid warehouse codes

## Parameters

**Parameter 1:** Warehouse Code (Required) - Code of the warehouse to assign to service items

Example: `WH001`, `SERVICES`, `MAIN`

## Database Tables Affected

- **BasicSCDocumentLine** - Updates warehouse assignment in line dimensions
- **Warehouse** - Reads warehouse record by business code (read-only)
- **Item Dimensions** - Updates specific dimensions with warehouse information

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASetDefaultWarehouseForServiceItems`

**Document Type:** Supply Chain Documents with Service Items

**Related Actions:**
- Warehouse management entity flows
- Item dimension management actions
- Document line processing utilities


</div>

