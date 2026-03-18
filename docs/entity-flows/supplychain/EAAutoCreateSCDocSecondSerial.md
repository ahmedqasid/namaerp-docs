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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoCreateSCDocSecondSerial`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

