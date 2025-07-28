---
title: EAUseReceiptPaperForEngineOrChassisItems
module: srvcenter
---


<div class='entity-flows'>

# EAUseReceiptPaperForEngineOrChassisItems

**This document was generated using Claude.ai**

## Overview

Automatically manages receipt paper allocation for engine or chassis items by matching lot IDs to receipt books and assigning unused receipt papers to document lines. Ensures proper documentation and serial number tracking for high-value components requiring formal receipt papers.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for supply chain documents. Runs when sales orders, invoices, or delivery notes containing engine/chassis items are committed or deleted, managing receipt paper usage and availability.

## How It Works

### For Document Commits:
1. **Clears previous assignments** - Releases any receipt papers previously assigned to this document
2. **Validates lot IDs** - Ensures all document lines have required lot ID information
3. **Matches receipt books** - Finds receipt books that match the line's lot ID
4. **Allocates papers** - Assigns unused receipt papers based on document line quantities
5. **Updates serial numbers** - Sets serial numbers from allocated receipt paper codes
6. **Marks papers as used** - Updates receipt papers as used and linked to the document

### For Document Deletions:
1. **Clears assignments** - Finds all receipt papers assigned to the deleted document
2. **Releases papers** - Marks receipt papers as unused and removes document references
3. **Restores availability** - Makes receipt papers available for future use

## Parameters

This action does not require parameters - it works based on document line data and receipt book configuration.

## Receipt Paper Allocation Logic

- **Lot ID Matching**: Uses document line lot ID to find corresponding receipt book
- **Quantity Matching**: Allocates exact number of receipt papers equal to document line quantity
- **Serial Assignment**: Combines receipt paper codes into compressed serial number format
- **Usage Tracking**: Marks allocated papers as used and links them to the document

## Database Tables Affected

- **ReceiptPaper** - Updates usage status and document references
- **Document Lines** - Updates serial numbers with receipt paper codes (read-only for other fields)
- **Receipt Books** - References for matching lot IDs to paper series (read-only)

## Important Warnings

### ⚠️ Automatic Execution
- Runs automatically on document commit/delete events
- Cannot be disabled or bypassed through configuration
- May cause unexpected receipt paper allocations

### ⚠️ Lot ID Requirements
- All document lines with specific dimensions must have lot IDs
- Missing lot IDs cause validation failures and prevent document processing
- Lot IDs must match existing receipt book codes exactly

### ⚠️ Receipt Paper Availability
- Requires sufficient unused receipt papers in matching receipt books
- Insufficient papers cause processing failures with specific error messages
- Paper shortages prevent document commitment

### ⚠️ Quantity Matching
- Exact quantity match required between document line and available papers
- Partial allocations are not supported - it's all or nothing
- Fractional quantities may cause integer conversion issues

### ⚠️ Serial Number Overwriting
- Overwrites existing serial numbers on document lines
- Previous serial number data is lost without backup
- Serial numbers become compressed receipt paper code ranges

### ⚠️ Document Reference Integrity
- Creates strong references between receipt papers and documents
- Deleting documents without running this action may leave orphaned papers
- Broken references may cause receipt paper unavailability

### ⚠️ Receipt Book Configuration
- Depends on proper receipt book setup with matching codes
- Receipt book code must exactly match document line lot ID
- Misconfigured receipt books prevent paper allocation

### ⚠️ Concurrent Access Issues
- Multiple documents may compete for same receipt papers
- No locking mechanism to prevent double allocation
- Race conditions may cause receipt paper conflicts

### ⚠️ Transaction Timing
- Processes during document commit/delete transactions
- Receipt paper queries and updates within same transaction
- Database flush operations may impact transaction performance

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Receipt paper allocation failures prevent document processing
- Multiple line failures compound error messages

### ⚠️ Paper Usage Tracking
- Marks papers as used immediately upon document commit
- No reversal mechanism if document is later cancelled through other means
- Usage tracking relies on document reference integrity

### ⚠️ Serial Number Format
- Converts receipt paper codes to compressed serial number format
- Complex serial number zipping may cause format issues
- Serial number length limitations may truncate data

### ⚠️ Performance Impact
- Queries receipt papers for each document line individually
- Database flush operations during processing
- Large documents with many lines may cause performance issues

### ⚠️ Receipt Paper Sequence
- Uses natural receipt paper ordering from database queries
- No guarantee of sequential paper allocation
- Paper sequence may not match business expectations

### ⚠️ Validation Scope
- Only validates lot ID presence, not lot ID validity
- Invalid lot IDs may cause subsequent processing failures
- No validation of receipt book existence before allocation

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EAUseReceiptPaperForEngineOrChassisItems`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

