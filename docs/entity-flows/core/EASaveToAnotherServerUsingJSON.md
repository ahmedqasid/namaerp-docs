---
title: EASaveToAnotherServerUsingJSON
module: core
---


<div class='entity-flows'>

# EASaveToAnotherServerUsingJSON

**This document was generated using Claude.ai**

## Overview

This entity flow synchronizes data between different Nama ERP servers using JSON format for data transmission. It exports entities to JSON format and imports them on the target server using the CoreWS.importJsonFromAnotherServer method, providing a more flexible alternative to direct DTO transfer.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record that needs JSON-based replication
- **Scope:** Single entity or bulk transfer via SQL query
- **Method:** JSON export/import using CoreWS interface

## How It Works

### 1. JSON Export Process
- **JsonRecordExporter:** Uses JsonRecordExporter to convert entity to JSON format
- **Complete Export:** Exports both header and collection data (full entity structure)
- **Field Overrides:** Applies custom field mappings to JSON before transmission
- **Code Modification:** Adds "@draft" suffix if configured

### 2. Data Transmission
- **JSON Packaging:** Wraps entity JSON in structured format with entity type
- **CoreWS Client:** Creates CoreWS client for target server communication
- **Import Request:** Constructs EntityImportRequest with JSON payload
- **Remote Import:** Calls `importJsonFromAnotherServer()` on target server

### 3. Configuration Options
- **Dimension Handling:** Controls user dimension assignment behavior
- **Reference Handling:** Manages missing reference resolution
- **Draft Mode:** Supports both draft and committed saves

## Key Differences from Standard EASaveToAnotherServer

### Advantages of JSON Method
- **Format Flexibility:** JSON format is more portable and debugging-friendly

### Limitations
- **Keep Creation Date:** Not supported (throws exception)
- **Manual Code Prefix:** Inherited from base class but uses JSON path

## Parameters

All parameters are the same as [EASaveToAnotherServer](EASaveToAnotherServer.md) class with the same functionality, except:

### Parameter 12: Keep Creation Date
- **Status:** **NOT SUPPORTED**
- **Behavior:** Throws `NaMaBusinessLogicExeption` if set to true
- **Reason:** JSON import process doesn't support creation date preservation
- **Workaround:** Use standard `EASaveToAnotherServer` if creation date preservation is required

All other parameters work identically to the base class:
- Server URL, Login ID, Password
- Draft mode, reference handling
- Field value overrides
- Dimension management
- Bulk processing via SQL queries

## JSON Structure Example

The transmitted JSON follows this structure:
```json
{
  "EntityTypeName": [
    {
      "code": "INV001",
      "description": "Sample Invoice",
      "valueDate": "2023-12-01",
      "lines": [
        {
          "itemCode": "ITEM001",
          "quantity": 5,
          "unitPrice": 100.00
        }
      ]
    }
  ]
}
```

## Database Tables Affected

Same as base class:
- **Source Entity:** The entity being synchronized (any entity type)
- **SentEntityToAnotherServerSysEntry:** Audit log of synchronization attempts

## Important Warnings

### ⚠️ Functional Limitations
- **Creation Date:** Cannot preserve original creation date (will throw exception)
- **Performance:** JSON serialization/deserialization adds processing overhead

### ⚠️ JSON Format Dependencies
- **Field Mapping:** Custom field overrides apply to JSON structure

### ⚠️ Error Handling
- **Validation Errors:** Server-side validation may reject imported data
- **Reference Resolution:** Missing references handled by import process settings

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServerUsingJSON`

**Related Actions:**
- [EASaveToAnotherServer](EASaveToAnotherServer.md)


</div>

