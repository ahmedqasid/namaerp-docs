---
title: EAClearGoogleDriveTrash
module: core
---


<div class='entity-flows'>

# EAClearGoogleDriveTrash

**This document was generated using Claude.ai**

## Overview

Empties the Google Drive trash folder, permanently deleting all trashed files. Maintenance utility for managing Google Drive storage by removing files no longer needed.

## When This Action Runs

Manual execution or scheduled maintenance tasks to permanently delete all files in Google Drive trash and free up storage space.

## How It Works

1. **Authenticates** to Google Drive using OAuth credentials
2. **Accesses trash folder** for the specified account
3. **Empties entire trash** in single bulk operation
4. **Permanently deletes** all files (cannot be recovered)

## Key Parameters

**Parameter 1:** OAuth File Code/ID (Required) - Google Drive authentication credentials with "Used For Emptying Trash" permission enabled

## Database Tables Affected

- **OAuthFile** - Google Drive authentication configuration

No direct database modifications - only interacts with Google Drive through API calls.

## Important Warnings

### ⚠️ Permanent Data Loss
- Files deleted from trash cannot be recovered - operation is irreversible
- All files in trash are deleted without exception
- No undo function available

### ⚠️ Requirements
- OAuth file must have "Used For Emptying Trash" permission
- Requires stable internet connection to Google APIs
- Subject to Google Drive API rate limits

## Related Actions

- [EACheckDailyBackupOnGoogleDrive](EACheckDailyBackupOnGoogleDrive.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EAClearGoogleDriveTrash`

</div>

