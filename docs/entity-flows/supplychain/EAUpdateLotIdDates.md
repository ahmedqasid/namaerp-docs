---
title: EAUpdateLotIdDates
module: supplychain
---


<div class='entity-flows'>

# EAUpdateLotIdDates

**This document was generated using Claude.ai**

## Overview

Updates lot date information (expiry, production, retest dates) across all system tables based on the dates specified in document lines. Performs a comprehensive update that synchronizes lot date information throughout the entire system, ensuring consistency across inventory, transaction history, and all document types.

## When This Action Runs

Manual execution on supply chain documents when lot date information needs to be propagated system-wide, typically used after receiving updated lot information, correcting date errors, or standardizing lot dates across all references.

## How It Works

1. **Scans document lines** - Processes each line that has both an item and lot ID
2. **Validates date parameters** - Determines which dates to update based on parameters
3. **Prepares update queries** - Creates SQL update statements for each affected table
4. **Updates critical inventory tables** - Updates in synchronized block:
   - ItemDimensionsQty (inventory quantities)
   - QtyTransLine (transaction history)
5. **Updates additional tables** - Updates without synchronization:
   - ItemLot (lot master data)
   - EndStockTakingLine (stock taking records)
   - All BasicSCDocumentLine subclasses (all document types)
6. **Processes in transactions** - Each update runs in separate transaction for isolation
7. **Tracks progress** - Updates task progress for monitoring long-running operations

## Parameters

**Parameter 1:** Do Not Update Expiry Date (Optional) - true/false to skip expiry date updates (default: false)

**Parameter 2:** Do Not Update Production Date (Optional) - true/false to skip production date updates (default: false)

**Parameter 3:** Do Not Update Retest Date (Optional) - true/false to skip retest date updates (default: false)

**Parameter 4:** Force Update of Current Entity Lines (Optional) - true/false to update current document's table (default: false)

## Database Tables Affected

- **ItemDimensionsQty** - Updates lot dates in inventory quantity records
- **QtyTransLine** - Updates lot dates in transaction history
- **ItemLot** - Updates lot master data with new date information
- **EndStockTakingLine** - Updates lot dates in stock taking records
- **All Document Line Tables** - Updates lot dates in every document type that extends BasicSCDocumentLine

## Important Warnings

### ⚠️ System-Wide Impact
- **Updates affect ALL tables containing lot information**
- Changes propagate throughout the entire system
- No way to limit updates to specific documents or modules
- Consider impact on all business processes using lot data

### ⚠️ Direct SQL Updates
- **Uses direct SQL UPDATE statements** bypassing business logic
- No validation rules or entity actions are triggered
- Database constraints are the only protection
- Business rule violations may occur after updates

### ⚠️ Transaction Locking
- Updates to inventory tables use synchronized locking
- May cause performance issues in high-transaction environments
- Other processes may be blocked during execution
- Monitor system performance during updates

### ⚠️ Irreversible Updates
- **No automatic rollback or undo capability**
- Original date values are permanently overwritten
- Backup lot date information before executing
- Consider data recovery requirements

### ⚠️ Date Field Requirements
- Only updates dates that exist in document lines
- Null dates in document lines skip updates for those fields
- Invalid date formats may cause SQL errors
- Ensure date data quality before processing

### ⚠️ Performance Considerations
- **Scans and updates ALL document line tables** in the system
- Processing time increases with number of affected records
- Each line triggers multiple database transactions
- Large documents may take significant time to process

### ⚠️ Kill Task Support
- Process can be interrupted using task kill functionality
- Partial updates may occur if task is killed
- Data consistency may be compromised on interruption
- Plan for cleanup if process is terminated

### ⚠️ Current Document Line Updates
- By default, skips updating the current document's table to avoid locks
- Parameter 4 forces updates to current document table
- Forcing updates may cause database locking issues
- Use with caution in concurrent environments

### ⚠️ Lot Identification Logic
- **Updates are based on item ID and lot ID combination**
- All records matching this combination are updated
- No additional filtering by date, location, or other criteria
- May update more records than intended

### ⚠️ Reflection-Based Table Discovery
- Uses reflection to find all document line subclasses
- New document types are automatically included
- Custom document types must extend BasicSCDocumentLine
- Verify all target tables before execution

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAUpdateLotIdDates`

**Update Scope:** System-Wide Lot Date Synchronization

**Related Actions:**
- Lot management entity flows
- Inventory date correction utilities
- Batch update processing actions


</div>

