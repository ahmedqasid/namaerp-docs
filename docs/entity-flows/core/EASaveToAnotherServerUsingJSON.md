---
title: EASaveToAnotherServerUsingJSON
module: core
---

<div class='entity-flows'>

# EASaveToAnotherServerUsingJSON

**This document was generated using Claude.ai**

## Overview

Synchronizes data between Nama ERP servers using JSON format for data transmission. Provides more flexible alternative to direct DTO transfer through JSON export/import.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record requiring JSON-based replication
- **Purpose:** Server synchronization with JSON format flexibility
- **Timing:** On-demand or scheduled for data consistency

## How It Works

1. **Exports entity to JSON** using JsonRecordExporter (full structure)
2. **Applies field overrides** to JSON before transmission
3. **Transmits via CoreWS** using `importJsonFromAnotherServer()` method
4. **Imports on target server** with configuration options for references and drafts

## Key Differences from Standard EASaveToAnotherServer

### Advantages
- **Format Flexibility:** JSON is more portable and debugging-friendly
- **Complete Structure:** Exports both header and collection data

### Limitations
- **Keep Creation Date:** NOT SUPPORTED (throws exception)
- **Performance:** JSON serialization adds processing overhead

## Parameters

**Same as EASaveToAnotherServer except:**

### Parameter 12: Keep Creation Date
- **Status:** **NOT SUPPORTED**
- **Behavior:** Throws `NaMaBusinessLogicExeption` if set to true
- **Workaround:** Use standard `EASaveToAnotherServer` for creation date preservation

**Other parameters work identically:**
- Server URL, Login ID, Password
- Draft mode, reference handling, field overrides
- Dimension management, bulk processing via SQL

## JSON Structure Example

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

**Same as base class:**
- **Source Entity** - The entity being synchronized
- **SentEntityToAnotherServerSysEntry** - Audit log of synchronization attempts

## Important Warnings

### ⚠️ Functional Limitations
- **Creation Date Preservation:** Not supported - will throw exception
- **Performance Impact:** JSON serialization/deserialization adds overhead
- **Field Mapping:** Custom overrides apply to JSON structure

### ⚠️ Error Handling
- **Validation Errors:** Server-side validation may reject imported JSON data
- **Reference Resolution:** Missing references handled by import process settings

## Related Actions

- **EASaveToAnotherServer** - Standard DTO-based server synchronization

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServerUsingJSON`

</div>

