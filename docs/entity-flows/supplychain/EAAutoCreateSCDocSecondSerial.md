---
title: EAAutoCreateSCDocSecondSerial
module: supplychain
---


<div class='entity-flows'>

# EAAutoCreateSCDocSecondSerial

**This document was generated using Claude.ai**

## Overview

Automatically manages second serial number tracking for supply chain documents by maintaining the SCDocSecondSerial table. Creates individual serial number records for items with dual serial numbers (like vehicles with engine and chassis serials) and ensures proper cleanup when documents are deleted.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for supply chain documents. Runs when documents containing items with dual serial numbers are committed or deleted, maintaining real-time synchronization of serial number tracking.

## How It Works

### For Document Commits:
1. **Retrieves existing serials** - Lists any existing second serial records for the document
2. **Processes document lines** - Iterates through all document lines
3. **Identifies dual-serial items** - Finds items with hasTwoSerials flag set to true
4. **Unzips serial numbers** - Extracts individual serial numbers from compressed format
5. **Creates serial records** - Creates SCDocSecondSerial record for each individual serial
6. **Cleans old records** - Deletes previously existing serial records
7. **Saves new records** - Persists updated serial number tracking

### For Document Deletions:
1. **Finds document serials** - Locates all SCDocSecondSerial records for the document
2. **Deletes all records** - Removes all serial tracking records for the deleted document

## Parameters

This action does not require parameters - it works automatically based on document line data.

## Database Tables Affected

- **SCDocSecondSerial** - Creates, updates, and deletes second serial number tracking records
- **Document Lines** - Reads dual serial information from specific dimensions (read-only)

## Important Warnings

### ⚠️ Automatic Execution
- Runs automatically on document commit/delete events
- Cannot be disabled or bypassed through configuration
- May cause unexpected serial number table changes

### ⚠️ Dual Serial Dependencies
- Only processes items with hasTwoSerials flag set to true
- Depends on proper item master configuration
- Missing dual serial flags prevent serial tracking

### ⚠️ Serial Number Format Requirements
- Relies on proper serial number zipping/unzipping
- Compressed serial format must be valid for extraction
- Invalid serial formats may cause processing failures

### ⚠️ Complete Record Replacement
- Deletes ALL existing second serial records for the document on each commit
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
- Large documents with many dual-serial items may impact performance

### ⚠️ Transaction Isolation
- Serial record operations occur within document commit transaction
- Serial table failures may rollback document commits
- Ensure serial table availability during document processing

### ⚠️ Data Integrity
- No foreign key constraints validation mentioned
- Orphaned serial records possible if document IDs change
- Manual cleanup may be needed for data integrity issues

### ⚠️ Specific Dimensions Requirements
- Reads second serial from line specific dimensions
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
- Relies on accurate hasTwoSerials flag on item master
- Incorrect item configuration causes missed serial tracking
- Verify item setup for dual-serial requirements

### ⚠️ Compressed Serial Format
- Depends on proper serial number compression/decompression
- Complex serial formats may cause extraction issues
- Test serial number formats thoroughly

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoCreateSCDocSecondSerial`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

