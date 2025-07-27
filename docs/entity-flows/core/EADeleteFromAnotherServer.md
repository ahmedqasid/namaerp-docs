---
title: EADeleteFromAnotherServer
module: core
---


<div class='entity-flows'>

# EADeleteFromAnotherServer

**This document was generated using Claude.ai**

## Overview

Deletes entities from remote Nama ERP servers through web services to maintain data synchronization across multi-server environments.

## When This Action Runs

Manual or automated execution during delete operations to remove entities from secondary/backup servers after local deletion.

## How It Works

1. **Validates entity** and checks document cancellation status
2. **Creates web service client** for remote server connection
3. **Authenticates** using provided credentials
4. **Sends delete request** to remote server's entity service
5. **Processes response** and handles errors

## Parameters

**Parameter 1:** Other Server URL (Required) - Complete URL to remote Nama ERP server (e.g., `https://erp-backup.company.com/`)
**Parameter 2:** Login ID (Required) - Valid user login with delete permissions on remote server
**Parameter 3:** Password (Required) - Authentication password (hashed before transmission)
**Parameter 4:** Delete Even Documents (Optional) - "true"/"false" to control cancelled document deletion (default: false)

## Database Tables Affected

- **Local Server** - Read-only access for entity data construction
- **Remote Server** - Target entity table deletion with related records and audit logs

## Important Warnings

### ⚠️ Data Safety
- Deletion is irreversible and may affect related records on remote server
- Requires valid credentials with delete permissions on target server
- Network connectivity required - failures may cause incomplete synchronization

### ⚠️ Security
- Use HTTPS for secure communication and strong password management
- Ensure proper firewall configuration and access controls
- Monitor for authentication errors and unusual access patterns

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EADeleteFromAnotherServer`


</div>

