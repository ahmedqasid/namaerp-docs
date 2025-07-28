---
title: EAAutoCreateSCDocSerial
module: supplychain
---


<div class='entity-flows'>

# EAAutoCreateSCDocSerial

**This document was generated using Claude.ai**

## Overview

Automatically manages primary serial number tracking for supply chain documents by maintaining the SCDocSerial table. Creates individual serial number records for items with serial numbers and ensures proper cleanup when documents are deleted.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for supply chain documents. Runs when documents containing serialized items are committed or deleted, maintaining real-time synchronization of serial number tracking.

## How It Works

### For Document Commits:
1. **Retrieves existing serials** - Lists any existing serial records for the document
2. **Processes document lines** - Iterates through all document lines
3. **Identifies serialized items** - Finds items with hasSerial flag set to true
4. **Unzips serial numbers** - Extracts individual serial numbers from compressed format
5. **Creates serial records** - Creates SCDocSerial record for each individual serial
6. **Cleans old records** - Deletes previously existing serial records
7. **Saves new records** - Persists updated serial number tracking

### For Document Deletions:
1. **Finds document serials** - Locates all SCDocSerial records for the document
2. **Deletes all records** - Removes all serial tracking records for the deleted document

## Parameters

This action does not require parameters - it works automatically based on document line data.

## Database Tables Affected

- **SCDocSerial** - Creates, updates, and deletes primary serial number tracking records
- **Document Lines** - Reads serial information from specific dimensions (read-only)

## Important Warnings

### ⚠️ Automatic Execution
- Runs automatically on document commit/delete events
- Cannot be disabled or bypassed through configuration
- May cause unexpected serial number table changes

### ⚠️ Serial Item Dependencies
- Only processes items with hasSerial flag set to true
- Depends on proper item master configuration
- Missing serial flags prevent serial tracking

### ⚠️ Serial Number Format Requirements
- Relies on proper serial number zipping/unzipping
- Compressed serial format must be valid for extraction
- Invalid serial formats may cause processing failures

### ⚠️ Complete Record Replacement
- Deletes ALL existing serial records for the document on each commit
- Recreates all records from current document state
- No incremental updates - complete refresh each time

### ⚠️ Document ID Dependencies
- Uses document ID as primary key for serial tracking
- Document ID changes would orphan serial records
- Ensure document ID stability for proper tracking

### ⚠️ Line ID Tracking
- Associates each serial with specific document line ID
- Line ID changes may break serial-to-line associations
- Maintain line ID consistency for accurate tracking

### ⚠️ Serial Number Validation
- No validation of serial number format or uniqueness
- Duplicate serials may be created if present in source data
- Invalid serial numbers are stored as provided

### ⚠️ Performance Impact
- Processes all document lines on every commit
- Database operations for serial creation/deletion
- Large documents with many serialized items may impact performance

### ⚠️ Transaction Isolation
- Serial record operations occur within document commit transaction
- Serial table failures may rollback document commits
- Ensure serial table availability during document processing

### ⚠️ Data Integrity
- No foreign key constraints validation mentioned
- Orphaned serial records possible if document IDs change
- Manual cleanup may be needed for data integrity issues

### ⚠️ Specific Dimensions Requirements
- Reads serial from line specific dimensions
- Requires proper specific dimensions configuration
- Missing specific dimensions prevent serial extraction

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Serial operation failures may prevent document processing
- Check logs for detailed error information

### ⚠️ Business Logic Integration
- Serial tracking may be used by other business processes
- Changes affect serial number reports and tracking
- Consider downstream system dependencies

### ⚠️ Item Configuration Dependencies
- Relies on accurate hasSerial flag on item master
- Incorrect item configuration causes missed serial tracking
- Verify item setup for serial number requirements

### ⚠️ Compressed Serial Format
- Depends on proper serial number compression/decompression
- Complex serial formats may cause extraction issues
- Test serial number formats thoroughly

### ⚠️ Traceability Impact
- Serial tracking enables product traceability and recalls
- Missing or incorrect serial records affect regulatory compliance
- Ensure serial accuracy for critical business processes

### ⚠️ Inventory Management Integration
- Serial records may be used for inventory location tracking
- Serial changes affect inventory availability calculations
- Consider impact on warehouse and inventory systems

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoCreateSCDocSerial`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

