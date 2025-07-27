---
title: EACheckDailyBackupOnGoogleDrive
module: core
---


<div class='entity-flows'>

# EACheckDailyBackupOnGoogleDrive

**This document was generated using Claude.ai**

## Overview

Monitors Google Drive folders for backup files, verifying daily backups were created successfully. Checks folders for files created on target date and sends notifications based on findings.

## When This Action Runs

Scheduled maintenance task on Google Drive folders containing backup files. Typically runs daily to monitor backup processes.

## How It Works

1. **Authenticates** to Google Drive using configured OAuth file
2. **Scans folders** for backup files created on target date (today/yesterday)
3. **Detects files** by creation date or filename patterns (YYYYMMDD)
4. **Sends notifications** for found/missing backups
5. **Optionally cleans** Google Drive trash after check

## Key Parameters

- **Parameter 1:** OAuth File (Required) - Google Drive authentication credentials
- **Parameter 2:** Folder ID (Required) - Single folder ID or multi-folder format
- **Parameter 3:** Backup NOT Found Notification (Required) - Alert for missing backups
- **Parameter 4:** Backup Found Notification (Required) - Success confirmation
- **Parameter 5:** Check Date (Optional) - `today` (default) or `yesterday`
- **Parameter 6:** Success Notification Days (Optional) - When to send success alerts 
- **Parameter 7:** Clear Trash (Optional) - Auto-empty trash after check
- **Parameter 8:** Check By Name (Optional) - Use filename patterns vs creation date
- **Parameter 9:** Multi-Folder Mode (Optional) - Enable multiple folder processing

## Database Tables Affected

- **OAuthFile** - Google Drive authentication configuration
- **NotificationDefinition** - Templates for success/failure notifications

No direct database modifications - only reads configuration and uses Google Drive API.

## Important Warnings

### ⚠️ Dependencies
- Requires stable internet and valid OAuth file with Drive permissions
- Subject to Google API rate limits and quotas
- OAuth tokens may expire and require renewal

### ⚠️ Performance Impact
- Large folders with many files increase processing time
- Multiple folders require proportionally more API calls
- Time zone differences may affect file creation date detection

### ⚠️ Configuration Requirements
- OAuth file must have appropriate Google Drive access
- Notification definitions must be properly configured
- Trash cleanup requires specific "Used For Emptying Trash" permission

## Related Actions

- [EAClearGoogleDriveTrash](EAClearGoogleDriveTrash.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EACheckDailyBackupOnGoogleDrive`

</div>

