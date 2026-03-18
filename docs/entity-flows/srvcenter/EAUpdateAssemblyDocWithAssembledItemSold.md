---
title: EAUpdateAssemblyDocWithAssembledItemSold
module: srvcenter
---


<div class='entity-flows'>

# EAUpdateAssemblyDocWithAssembledItemSold

**This document was generated using Claude.ai**

## Overview

Automatically updates assembly documents when assembled items are sold by managing co-product quantities and serial numbers. Ensures inventory consistency between assembly production and sales by tracking which assembled items have been sold and updating remaining quantities accordingly.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for sales documents. Runs when sales orders, invoices, or delivery notes containing assembled items are committed or deleted, maintaining real-time synchronization between sales and assembly inventory.

## How It Works

### For Sales Document Commits:
1. **Validates serial requirements** - Ensures items with dual serials have all required dimension data
2. **Processes sold items** - Creates new co-product lines for sold quantities
3. **Updates serial numbers** - Manages serial number allocation and tracking
4. **Adjusts quantities** - Reduces available quantities on main assembly co-product lines
5. **Links documents** - Creates reference links between sales and assembly documents

### For Sales Document Deletions:
1. **Finds linked co-products** - Identifies assembly co-products linked to deleted sales
2. **Restores quantities** - Returns sold quantities back to main assembly co-product
3. **Removes sold lines** - Deletes co-product lines created for the cancelled sale
4. **Updates serials** - Restores serial numbers to available pool

## Parameters

**Parameter 1:** Assembly Document Ref (From Header) (Optional) - Field reference to assembly document in sales header

**Parameter 2:** Assembly Document Ref (From Line) (Optional) - Field reference to assembly document in sales line

**Parameter 3:** Sales Doc Ref In Assembly Co-products Line (Required) - Field ID for sales document reference in assembly co-product lines

## Serial Number Management

- **Primary Serial**: Engine or main component serial number
- **Secondary Serial**: Chassis or secondary component serial number
- **Serial Zipping**: Combines multiple serial numbers into compressed format
- **Serial Allocation**: Moves serials from available pool to sold items

## Database Tables Affected

- **AssemblyDocCoProdLine** - Creates new lines for sold items, updates quantities on main lines
- **Sales Document Lines** - Reads sold item information and serial numbers (read-only)
- **Assembly BOM** - References main assembled item configuration (read-only)

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EAUpdateAssemblyDocWithAssembledItemSold`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>