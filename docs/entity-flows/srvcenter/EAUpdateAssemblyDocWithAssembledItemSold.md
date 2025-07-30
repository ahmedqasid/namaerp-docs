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

## Important Warnings

### ⚠️ Automatic Execution
- Runs automatically on sales document commit/delete events
- Cannot be disabled or bypassed through normal configuration
- May cause unexpected assembly document changes

### ⚠️ Serial Number Requirements
- Items with hasTwoSerials flag require complete serial dimension data
- Missing serial numbers, lot IDs, boxes, or second serials cause validation failures
- Incomplete serial data prevents sales document processing

### ⚠️ Assembly Document Dependencies
- Requires valid assembly document references from sales lines or header
- Missing assembly BOM configuration causes processing failures
- Invalid assembly references result in error accumulation

### ⚠️ Co-Product Line Management
- Creates new co-product lines for each sold item
- May significantly increase assembly document complexity
- Large sales volumes can create numerous co-product lines

### ⚠️ Quantity Synchronization
- Real-time quantity updates may conflict with concurrent assembly operations
- Negative quantities possible if sales exceed assembly production
- Quantity discrepancies may indicate inventory control issues

### ⚠️ Serial Number Integrity
- Complex serial number zipping/unzipping operations
- Serial number corruption may cause inventory tracking failures
- Duplicate or missing serials can break traceability

### ⚠️ Document Reference Integrity
- Creates bidirectional references between sales and assembly documents
- Broken references may cause orphaned co-product lines
- Reference field configuration errors prevent proper linking

### ⚠️ Transaction Timing
- Processes during sales document commit/delete transactions
- Long processing may cause transaction timeouts
- Failed assembly updates may rollback sales transactions

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Multiple validation errors may prevent sales document processing
- Assembly-related errors can block sales operations

### ⚠️ BOM Configuration Dependencies
- Relies on proper assembly BOM setup with main item definition
- Missing or incorrect BOM configuration causes processing failures
- BOM changes may affect existing sales-assembly links

### ⚠️ Dual Serial Logic Complexity
- Complex logic for handling items with two serial numbers
- Primary and secondary serial management requires careful coordination
- Serial type mismatches may cause data corruption

### ⚠️ Performance Impact
- Processes all sales lines even if not assembly-related
- Complex serial number operations may impact sales document performance
- Large assembly documents may slow sales processing

### ⚠️ Data Validation Requirements
- Strict validation of required fields for dual-serial items
- Field validation uses sales order field IDs regardless of document type
- Validation failures prevent sales document commitment

### ⚠️ Concurrent Access Issues
- Assembly document modifications during sales processing
- Potential conflicts with other assembly operations
- No explicit locking mechanism for assembly documents

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EAUpdateAssemblyDocWithAssembledItemSold`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>