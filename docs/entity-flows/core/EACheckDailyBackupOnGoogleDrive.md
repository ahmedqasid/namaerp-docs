---
title: EACheckDailyBackupOnGoogleDrive
module: core
---


<div class='entity-flows'>

# EACheckDailyBackupOnGoogleDrive

**This document was generated using Claude.ai**

## Overview

This entity flow monitors Google Drive folders for backup files, verifying that daily backups are being created successfully. It checks specified Google Drive folders for backup files created on a target date (today or yesterday), sends notifications based on findings, and optionally cleans up trash files.

## When This Action Runs

- **Trigger:** Scheduled maintenance task for backup monitoring
- **Target:** Google Drive folders containing backup files
- **Purpose:** Verify backup file creation and alert on missing backups
- **Frequency:** Typically scheduled daily to monitor backup processes

## How It Works

### 1. Google Drive Authentication
- **OAuth Integration:** Uses configured OAuth file for Google Drive API access
- **Credential Management:** Manages Google API credentials and authentication
- **Permission Validation:** Verifies OAuth file has necessary permissions
- **API Access:** Establishes connection to Google Drive API services

### 2. Folder Processing Modes
- **Single Folder Mode:** Checks one specified Google Drive folder
- **Multi-Folder Mode:** Processes multiple folders with section grouping
- **Batch Processing:** Handles folder lists efficiently
- **Section Organization:** Organizes folders into logical sections for reporting

### 3. Backup File Detection
- **Date-Based Detection:** Finds files created on the target date
- **Name-Based Detection:** Alternative method using filename date patterns (YYYYMMDD)
- **File Enumeration:** Processes all files in target folders with pagination
- **Metadata Extraction:** Collects file information including size, creation date, and URLs

### 4. Notification Management
- **Success Notifications:** Sends notifications when backups are found
- **Failure Notifications:** Alerts when backups are missing
- **Conditional Sending:** Supports day-of-week based notification rules
- **Template Integration:** Uses notification definitions for message formatting

### 5. Optional Maintenance
- **Trash Cleanup:** Optionally empties Google Drive trash after checking
- **Storage Management:** Helps maintain clean Google Drive storage
- **Error Handling:** Gracefully handles trash cleanup failures
- **Resource Cleanup:** Manages API resources and connections

## Key Features

### Flexible Backup Detection
- **Date Strategies:** Supports both file creation date and filename date checking
- **Time Range:** Can check for today's or yesterday's backups
- **File Pattern Recognition:** Recognizes standard backup filename patterns
- **Comprehensive Scanning:** Processes all files in target folders

### Multi-Folder Support
- **Scalable Monitoring:** Monitor multiple backup locations simultaneously
- **Section Organization:** Group folders by purpose or system
- **Consolidated Reporting:** Single notification with all folder results
- **Efficient Processing:** Batch processing for performance

### Intelligent Notifications
- **Conditional Alerts:** Send success notifications only on specific days
- **Failure Escalation:** Always notify on missing backups
- **Rich Content:** Include file details, links, and folder information
- **Template-Based:** Use notification definitions for consistent formatting

## Parameters

### Parameter 1: OAuth File Code or ID
- **Type:** Text (Required)
- **Format:** Code or ID of configured OAuth file for Google Drive access
- **Purpose:** Provides authentication credentials for Google Drive API
- **Requirements:** Must be authorized and configured for Drive access

### Parameter 2: Drive Folder ID
- **Type:** Text (Required)
- **Format:** Google Drive folder ID or multi-folder specification
- **Single Folder:** Google Drive folder ID (e.g., "1A2B3C4D5E6F7G8H9I0J")
- **Multi-Folder:** Format: "folderId1=Title1\nfolderId2=Title2\n$#Section Name\nfolderId3=Title3"

**Examples:**
```
# Single folder
1A2B3C4D5E6F7G8H9I0J

# Multiple folders with sections
folder123=Database Backups
folder456=Application Backups
$#Production Systems
folder789=Production DB
folder012=Production Files
```

### Parameter 3: Backup NOT Found Notification
- **Type:** Text (Required)
- **Format:** Notification definition code or ID
- **Purpose:** Notification sent when backups are missing
- **Content:** Should include backup details and remediation instructions

### Parameter 4: Backup Found Notification
- **Type:** Text (Required)
- **Format:** Notification definition code or ID
- **Purpose:** Notification sent when backups are successfully found
- **Scheduling:** Can be limited to specific days of the week

### Parameter 5: Check Backup File For
- **Type:** Text (Optional)
- **Values:** `today` (default) or `yesterday`
- **Purpose:** Determines which date's backups to check
- **Use Cases:** "yesterday" useful for morning checks of overnight backups

### Parameter 6: Send Success Notification Only On
- **Type:** Text (Optional)
- **Values:** `everyday` (default), `saturday`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`
- **Purpose:** Controls when success notifications are sent
- **Benefit:** Reduces notification noise while ensuring failure alerts always go out

### Parameter 7: Clear Trash After Check
- **Type:** Boolean (Optional)
- **Values:** `true` or `false`
- **Purpose:** Automatically empty Google Drive trash after backup check
- **Requirements:** OAuth file must have "Used For Emptying Trash" permission

### Parameter 8: Check Files By Name Not Date
- **Type:** Boolean (Optional)
- **Values:** `true` or `false`
- **Purpose:** Use filename pattern (YYYYMMDD) instead of file creation date
- **Use Case:** When backup files are uploaded with different creation dates

### Parameter 9: Use Multi Folder Check
- **Type:** Boolean (Optional)
- **Values:** `true` or `false`
- **Purpose:** Enable multi-folder processing mode
- **Effect:** Changes folder ID parameter interpretation and notification consolidation

## Database Tables Affected

### Configuration Tables
- **OAuthFile:** Google Drive authentication configuration
  - Must be properly authorized and configured
  - Requires specific permissions for Drive access
  - Used for API credential management

- **NotificationDefinition:** Notification templates
  - Used for both success and failure notifications
  - Should include backup information placeholders
  - Supports rich content including links and file details

### No Direct Database Modifications
This action reads configuration but does not modify entity data. All backup checking occurs through Google Drive API calls.

## Business Use Cases

### 1. Backup Monitoring and Alerting
- **Daily Verification:** Ensure backup processes completed successfully
- **Failure Detection:** Immediate alerts when backups are missing
- **Multiple Systems:** Monitor backups from various systems and databases
- **Compliance Assurance:** Verify backup requirements are being met

### 2. IT Operations Management
- **Proactive Monitoring:** Detect backup failures before they become critical
- **Maintenance Scheduling:** Coordinate backup monitoring with maintenance windows
- **Storage Management:** Monitor backup file sizes and storage usage
- **Automated Cleanup:** Manage Google Drive storage through trash cleanup

### 3. Disaster Recovery Preparedness
- **Backup Verification:** Confirm backup files are being created and accessible
- **Recovery Planning:** Ensure backup files are available when needed
- **Compliance Reporting:** Document backup monitoring for audit purposes
- **Multi-Location Monitoring:** Track backups across different locations and systems

## Important Warnings

### ⚠️ Google Drive API Dependencies
- **Internet Connectivity:** Requires stable internet connection to Google APIs
- **API Quotas:** Subject to Google Drive API rate limits and quotas
- **Authentication Management:** OAuth tokens may expire and require renewal
- **Permission Requirements:** OAuth file must have appropriate Google Drive permissions

### ⚠️ Configuration Requirements
- **OAuth Setup:** OAuth file must be properly configured and authorized
- **Folder Access:** Google account must have access to specified backup folders
- **Notification Configuration:** Notification definitions must be properly configured
- **Permission Validation:** Specific permissions required for trash cleanup

### ⚠️ Performance Considerations
- **Large Folders:** Processing folders with many files may take significant time
- **API Latency:** Google Drive API calls introduce network latency
- **Pagination Overhead:** Large folders require multiple API calls
- **Multi-Folder Impact:** Multiple folders increase processing time proportionally

### ⚠️ Backup Detection Limitations
- **Time Zone Dependencies:** File creation times may be affected by time zones
- **Filename Patterns:** Name-based detection requires consistent backup naming
- **Upload Timing:** Files uploaded after creation may have different timestamps
- **False Positives:** Non-backup files matching patterns may be detected

### ⚠️ Notification Management
- **Spam Prevention:** Configure success notifications carefully to avoid notification fatigue
- **Failure Escalation:** Ensure failure notifications reach appropriate personnel
- **Template Maintenance:** Keep notification templates current and informative
- **Delivery Dependencies:** Notification system must be functioning for alerts

## Best Practices

### Configuration
- **Regular Testing:** Test OAuth authentication and folder access regularly
- **Permission Reviews:** Periodically review and update Google Drive permissions
- **Notification Testing:** Test both success and failure notification scenarios
- **Folder Organization:** Use clear folder structures and naming conventions

### Monitoring
- **Schedule Optimization:** Run checks at appropriate times relative to backup schedules
- **Log Review:** Monitor execution logs for errors or performance issues
- **Success Rate Tracking:** Track backup success rates over time
- **Storage Monitoring:** Monitor Google Drive storage usage and quotas


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EACheckDailyBackupOnGoogleDrive`

**Related Actions:**
- [EAClearGoogleDriveTrash](EAClearGoogleDriveTrash.md)


</div>

