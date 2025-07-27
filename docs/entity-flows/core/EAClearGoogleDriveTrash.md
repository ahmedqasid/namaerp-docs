---
title: EAClearGoogleDriveTrash
module: core
---


<div class='entity-flows'>

# EAClearGoogleDriveTrash

**This document was generated using Claude.ai**

## Overview

This entity flow empties the trash folder in Google Drive, permanently deleting all files that have been moved to trash. It's a maintenance utility that helps manage Google Drive storage by removing files that are no longer needed.

## When This Action Runs

- **Trigger:** Manual execution or scheduled maintenance tasks
- **Target:** Google Drive trash folder for the specified OAuth account
- **Purpose:** Permanently delete all files in Google Drive trash to free up storage space
- **Frequency:** Typically run periodically as part of storage maintenance routines

## How It Works

### 1. OAuth Authentication
- **Credential Access:** Retrieves OAuth credentials using the specified OAuth file
- **Authentication:** Establishes authenticated connection to Google Drive API
- **Permission Validation:** Ensures OAuth file has necessary permissions for trash operations
- **API Connection:** Creates Drive service instance for API operations

### 2. Trash Emptying Process
- **Trash Access:** Connects to Google Drive trash folder
- **Bulk Operation:** Empties entire trash folder in single operation
- **Permanent Deletion:** Files are permanently deleted and cannot be recovered
- **Storage Recovery:** Frees up storage space used by deleted files

### 3. Error Handling
- **Authentication Errors:** Handles OAuth authentication failures
- **Permission Issues:** Manages cases where OAuth file lacks trash permissions
- **API Failures:** Handles Google Drive API communication errors
- **Network Issues:** Manages connectivity problems with Google services

## Key Features

### Simple Operation
- **Single Action:** Empties entire trash folder with one operation
- **No File Selection:** Removes all files in trash without individual selection
- **Immediate Effect:** Files are deleted immediately upon execution
- **Complete Cleanup:** Ensures trash folder is completely emptied

### Storage Management
- **Space Recovery:** Frees up significant storage space
- **Maintenance Support:** Supports regular storage maintenance routines
- **Quota Management:** Helps manage Google Drive storage quotas
- **Cost Optimization:** Reduces storage costs for paid Google Drive accounts

## Parameters

### Parameter 1: OAuth File Code or ID
- **Type:** Text (Required)
- **Format:** Code or ID of configured OAuth file for Google Drive access
- **Purpose:** Provides authentication credentials for Google Drive API
- **Requirements:** Must be authorized and configured for Drive access with trash permissions

**OAuth File Requirements:**
- Must have "Used For Emptying Trash" permission enabled
- Must be properly authorized with Google account
- Account must have access to Google Drive
- Credentials must be current and not expired

**Examples:**
- `GDRIVE_OAUTH_001` - OAuth file code
- `12345` - OAuth file ID
- `BACKUP_DRIVE_AUTH` - Descriptive OAuth file code

## Database Tables Affected

### Configuration Tables
- **OAuthFile:** Google Drive authentication configuration
  - Must be properly authorized and configured
  - Requires specific "Used For Emptying Trash" permission
  - Used for API credential management

### No Direct Database Modifications
This action only interacts with Google Drive through API calls and does not modify any local database tables.

## Business Use Cases

### 1. Storage Maintenance
- **Regular Cleanup:** Periodic removal of deleted files to maintain storage efficiency
- **Storage Optimization:** Free up space for active files and backups
- **Cost Management:** Reduce storage costs by removing unnecessary files
- **Quota Management:** Keep Google Drive usage within allocated quotas

### 2. Backup Management
- **Backup Cleanup:** Remove old backup files that are no longer needed
- **Archive Maintenance:** Clean up archived files that have been moved to trash
- **Storage Rotation:** Support backup rotation policies by clearing old files
- **Disaster Recovery:** Maintain clean backup environments

### 3. System Administration
- **Automated Maintenance:** Include in automated maintenance routines
- **Manual Cleanup:** Provide tool for manual storage cleanup operations
- **Integration Support:** Support integration with other storage management tools
- **Compliance Requirements:** Meet data retention and deletion requirements

## Important Warnings

### ⚠️ Permanent Data Loss
- **Irreversible Operation:** Files deleted from trash cannot be recovered
- **No Backup:** Deleted files are permanently removed from Google Drive
- **Complete Deletion:** All files in trash are deleted without exception
- **No Undo Function:** Operation cannot be reversed or undone

### ⚠️ Permission Requirements
- **Specific Permissions:** OAuth file must have "Used For Emptying Trash" permission
- **Account Access:** Google account must have appropriate Drive permissions
- **Authentication Status:** OAuth credentials must be current and valid
- **API Access:** Requires access to Google Drive API services

### ⚠️ Storage Impact
- **Immediate Effect:** Storage space changes immediately after execution
- **Billing Impact:** May affect Google Drive storage billing
- **Quota Changes:** Drive storage quota usage will decrease immediately
- **Sync Effects:** Changes may trigger sync operations across devices

### ⚠️ Operational Considerations
- **Network Dependency:** Requires stable internet connection to Google APIs
- **API Limits:** Subject to Google Drive API rate limits and quotas
- **Timing Sensitivity:** Consider timing relative to backup and file operations
- **User Impact:** May affect users accessing shared drives or folders

## Best Practices

### Safety Measures
- **Review Before Execution:** Review trash contents before permanent deletion
- **Backup Verification:** Ensure important files are backed up elsewhere
- **Permission Validation:** Verify OAuth file has correct permissions
- **Testing:** Test with non-critical drives before production use

### Scheduling
- **Maintenance Windows:** Execute during planned maintenance periods
- **User Communication:** Notify users when scheduled maintenance will occur
- **Frequency Planning:** Establish appropriate cleanup frequency
- **Monitoring:** Monitor execution results and storage impact

### Integration
- **Combine with Backup Checks:** Often used after backup verification actions
- **Workflow Integration:** Include in broader storage management workflows
- **Error Handling:** Implement appropriate error handling and notification
- **Logging:** Log execution results for audit and troubleshooting

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EAClearGoogleDriveTrash`

**Related Actions:**
- [EACheckDailyBackupOnGoogleDrive](EACheckDailyBackupOnGoogleDrive.md)


</div>

