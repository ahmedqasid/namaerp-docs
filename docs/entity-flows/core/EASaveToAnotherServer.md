---
title: EASaveToAnotherServer
module: core
---


<div class='entity-flows'>

# EASaveToAnotherServer

**This document was generated using Claude.ai**

## Overview

This entity flow synchronizes data between different Nama ERP servers by sending entity records from the current server to another remote server. It handles authentication, data transformation, and error tracking to ensure reliable data replication across multiple ERP installations.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record that needs to be replicated
- **Scope:** Single entity or bulk transfer via SQL query
- **Method:** Web service calls using EntityService interface

## How It Works

### 1. Data Preparation
- **DTO Creation:** Converts entity to Data Transfer Object (BaseEntityDTO)
- **Version Reset:** Sets `lastChangeVersion` to minimum value for new record creation
- **Field Overrides:** Applies custom field mappings before transmission
- **Authentication:** Prepares login credentials and password hash

### 2. Data Transmission
- **Service Client:** Creates EntityService client for target server
- **Request Building:** Constructs SaveDraftRequest with entity data
- **Options Configuration:** Sets flags for drafts, references, logging
- **Remote Save:** Calls either `saveDraft()` or `saveAndCommit()` on target server

### 3. Audit Tracking
- **Success Logging:** Records successful transmissions with timestamp
- **Error Logging:** Captures failures with detailed error messages
- **Retry Logic:** Attempts multiple tries for non-service exceptions
- **Progress Tracking:** Shows progress for bulk operations

## Parameters

### Parameter 1: Other Server URL
- **Format:** `http://hostname:port/` or `https://hostname:port/`
- **Example:** `http://localhost:7070/`, `https://erp.company.com/`
- **Required:** Yes

### Parameter 2: Login ID
- **Format:** Username for authentication on target server
- **Example:** `admin`, `sync_user`
- **Required:** Yes

### Parameter 3: Password
- **Format:** Plain text password (will be hashed automatically)
- **Security:** Password is hashed using ServerStringUtils.hash()
- **Required:** Yes

### Parameter 4: Append @draft to Code
- **Values:** `true` or `false`
- **Purpose:** Adds "@draft" suffix to document codes for first-time saves
- **When Applied:** Only if entity is not yet committed (`commitedBefore = false`)

### Parameter 5: Ignore Not Found References
- **Values:** `true` or `false`
- **Purpose:** Allows saving even if referenced entities don't exist on target server
- **Use Case:** Synchronizing entities before their dependencies

### Parameter 6: Save As Draft
- **Values:** `true` or `false`
- **Purpose:** Controls whether to save as draft or commit immediately
- **Draft Mode:** Uses `saveDraft()` method
- **Commit Mode:** Uses `saveAndCommit()` method

### Parameter 7: Fields Value Overrider
- **Format:** Field mapping syntax (header fields only)
- **Syntax:** `fieldName=value` or `fieldName=sql(query)`
- **Examples:**
  ```
  book="ABC"
  name1=sql(select case when {group.code} = '11' then '' else {group.name1} end)
  branch="MAIN"
  ```

### Parameter 8: Do Not Use Current User Dimensions
- **Values:** `true` or `false`
- **Purpose:** Prevents automatic assignment of current user's dimension values
- **Use Case:** Maintaining original dimension assignments

### Parameter 9: Max Trials Count
- **Format:** Integer number
- **Default:** 10
- **Purpose:** Maximum retry attempts for failed transmissions
- **Note:** Only retries non-service exceptions

### Parameter 10: Save From Query
- **Format:** T-SQL query returning `entityType` and `id` columns
- **Example:** `SELECT entityType, id FROM SalesInvoice WHERE valueDate >= GETDATE()`
- **Purpose:** Bulk synchronization of multiple entities
- **Performance:** Processes in separate transactions to avoid memory issues

### Parameter 11: Add Manual Code Prefix
- **Values:** `true` or `false`
- **Purpose:** Adds manual coding prefix for auto-coded entities
- **Applied When:** Entity is committed and has auto-coding enabled

### Parameter 12: Keep Creation Date
- **Values:** `true` or `false`
- **Purpose:** Preserves original creation date on target server
- **Implementation:** Uses special marker in `arabicTitle` field

## Database Tables Affected

### Primary Tables
- **Source Entity:** The entity being synchronized (any entity type)
- **SentEntityToAnotherServerSysEntry:** Audit log of synchronization attempts
  - `targetRecord`: Reference to synchronized entity
  - `status`: Success or failure status
  - `remoteServer`: Target server URL
  - `executionTime`: When synchronization occurred
  - `errorMessage`: Error details if failed

## Business Use Cases

### 1. Multi-Site Synchronization
- Synchronizing master data between company branches
- Replicating configuration changes across environments
- Maintaining data consistency in distributed setups

### 2. Data Migration
- Moving entities from development to production
- Transferring data between different installations
- Creating backups on remote servers

### 3. Integration Scenarios
- Feeding data to external systems using Nama ERP as service
- Creating real-time or scheduled data replication
- Supporting disconnected operation scenarios

## SQL Query for Monitoring

To check synchronization audit logs:

```sql
SELECT 
    s.targetRecord_entityType,
    s.targetRecord_id,
    s.status,
    s.remoteServer,
    s.executionTime,
    s.errorMessage
FROM SentEntityToAnotherServerSysEntry s
WHERE s.executionTime >= DATEADD(day, -7, GETDATE())
ORDER BY s.executionTime DESC;
```

## Important Warnings

### ⚠️ Security Considerations
- Passwords are transmitted in plain text parameters but hashed before network transmission
- Ensure HTTPS is used for production environments
- Validate target server certificates for secure connections

### ⚠️ Performance Impact
- Bulk operations process entities in separate transactions
- Large synchronization jobs may take significant time
- Monitor memory usage during bulk transfers

### ⚠️ Data Integrity
- Field overrides only affect header fields, not collection details
- Reference validation depends on "Ignore Not Found References" setting
- Version conflicts may occur if entity exists on target server

### ⚠️ Network Dependencies
- Requires stable network connection to target server
- Failed transmissions are logged but may need manual retry
- Network timeouts are handled by retry mechanism

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServer`

**Related Actions:**
- [EASaveToAnotherServerUsingJSON](EASaveToAnotherServerUsingJSON.md)


</div>

