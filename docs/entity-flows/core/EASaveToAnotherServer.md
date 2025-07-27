---
title: EASaveToAnotherServer
module: core
---

<div class='entity-flows'>

# EASaveToAnotherServer

**This document was generated using Claude.ai**

## Overview

Synchronizes data between different Nama ERP servers by sending entity records to remote servers. Handles authentication, data transformation, and error tracking for reliable data replication.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record requiring replication
- **Purpose:** Multi-site data synchronization and integration
- **Timing:** On-demand or scheduled for data consistency

## How It Works

1. **Prepares data** by converting entity to DTO and applying field overrides
2. **Authenticates** with target server using provided credentials
3. **Transmits data** via web service calls (EntityService interface)
4. **Tracks results** with audit logging and retry logic for failures

## Key Parameters

### Connection Parameters
- **Parameter 1:** Other Server URL (Required) - `http://hostname:port/` or `https://hostname:port/`
- **Parameter 2:** Login ID (Required) - Username for target server authentication
- **Parameter 3:** Password (Required) - Plain text password (automatically hashed)

### Processing Options
- **Parameter 4:** Append @draft to Code - Adds "@draft" suffix for first-time saves
- **Parameter 5:** Ignore Not Found References - Allows saving without dependencies
- **Parameter 6:** Save As Draft - Controls draft vs commit mode
- **Parameter 7:** Fields Value Overrider - Custom field mapping syntax
- **Parameter 8:** Do Not Use Current User Dimensions - Preserves original dimensions
- **Parameter 9:** Max Trials Count - Retry attempts (default: 10)

### Advanced Options
- **Parameter 10:** Save From Query - T-SQL for bulk synchronization
- **Parameter 11:** Add Manual Code Prefix - For auto-coded entities
- **Parameter 12:** Keep Creation Date - Preserves original timestamps

## Database Tables Affected

### SentEntityToAnotherServerSysEntry
- **targetRecord** - Reference to synchronized entity
- **status** - Success or failure status  
- **remoteServer** - Target server URL
- **executionTime** - Synchronization timestamp
- **errorMessage** - Error details if failed

## Business Use Cases

1. **Multi-Site Synchronization:** Master data between branches
2. **Data Migration:** Moving entities between installations
3. **Integration:** Real-time or scheduled data replication

```sql
SELECT s.targetRecord_entityType, s.status, s.remoteServer, s.executionTime, s.errorMessage
FROM SentEntityToAnotherServerSysEntry s
WHERE s.executionTime >= DATEADD(day, -7, GETDATE())
ORDER BY s.executionTime DESC;
```

## Important Warnings

### ⚠️ Security Requirements
- **HTTPS Required:** Use secure connections for production environments
- **Password Handling:** Passwords hashed before network transmission
- **Certificate Validation:** Validate target server certificates

### ⚠️ Performance Considerations
- **Bulk Processing:** Large synchronization jobs may take significant time
- **Memory Usage:** Monitor memory during bulk transfers
- **Network Stability:** Requires stable connection to target server

### ⚠️ Data Integrity
- **Field Limitations:** Overrides only affect header fields, not collections
- **Reference Dependencies:** Validation depends on "Ignore Not Found References" setting
- **Version Conflicts:** May occur if entity exists on target server

## Related Actions

- **EASaveToAnotherServerUsingJSON** - JSON-based server synchronization

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServer`

</div>

