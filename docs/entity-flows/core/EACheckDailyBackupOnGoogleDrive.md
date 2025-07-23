---
title: EACheckDailyBackupOnGoogleDrive
module: core
---


<div class='entity-flows'>

# EACheckDailyBackupOnGoogleDrive

**This document was generated using AI Tools**

## Purpose
This action monitors Google Drive folders to verify that daily backup files have been created and uploaded successfully. It can check single or multiple folders, send notifications about backup status, and optionally clean up Google Drive trash after checking.

## When to Use This Action
- **Daily Backup Monitoring**: Automated verification that backup files are being created
- **Backup Compliance**: Ensure backup procedures are working correctly
- **Notification System**: Alert administrators when backups are missing or successful
- **Multi-System Monitoring**: Check backups across multiple systems or databases
- **Scheduled Maintenance**: Run as part of daily system health checks

## How It Works
1. **Authentication**: Uses OAuth credentials to connect to Google Drive
2. **Folder Access**: Accesses specified Google Drive folder(s) to check for files
3. **File Detection**: Looks for files created today (or yesterday) in the target folder
4. **Notification Logic**: Sends different notifications based on whether backups are found
5. **Optional Cleanup**: Can empty Google Drive trash after checking
6. **Multi-Folder Support**: Can process multiple folders in a single operation

## Parameters Required

### Parameter 1: OAuth File Code/ID (Required)
- **What it is**: Code or ID of the OAuthFile configured for Google Drive access
- **Format**: OAuthFile entity code or hexadecimal ID
- **Purpose**: Provides authentication credentials for Google Drive API
- **Requirements**: Must be authorized and configured for backup checking

### Parameter 2: Drive Folder ID (Required)
- **What it is**: Google Drive folder ID(s) to check for backup files
- **Format**: Single folder ID or multi-folder format with titles
- **Purpose**: Specifies which folder(s) to check for backup files
- **Multi-Folder Format**: `folderId1=FolderTitle1|folderId2=FolderTitle2`

### Parameter 3: No Backup Found Notification (Required)
- **What it is**: NotificationDefinition code/ID to use when no backup is found
- **Format**: NotificationDefinition entity code or hexadecimal ID
- **Purpose**: Sends alert when backup files are missing
- **Usage**: Critical for alerting administrators of backup failures

### Parameter 4: Backup Found Notification (Required)
- **What it is**: NotificationDefinition code/ID to use when backup is found
- **Format**: NotificationDefinition entity code or hexadecimal ID
- **Purpose**: Confirms successful backup completion
- **Usage**: Can be limited to specific days of week (see Parameter 6)

### Parameter 5: Comparison Date (Optional)
- **What it is**: Which date to check for backup files
- **Format**: `today` or `yesterday`
- **Default**: `today`
- **Purpose**: Allows checking for yesterday's backups if run early in morning

### Parameter 6: Send Success Only On Day (Optional)
- **What it is**: Limits success notifications to specific days of week
- **Format**: `everyday`, `saturday`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`
- **Default**: `everyday`
- **Purpose**: Reduces notification volume by only sending success alerts on specific days

### Parameter 7: Clear Trash After Check (Optional)
- **What it is**: Whether to empty Google Drive trash after checking
- **Format**: `true` or `false`
- **Default**: `false`
- **Purpose**: Cleanup Google Drive storage space
- **Requirements**: OAuth file must have trash emptying permission

### Parameter 8: Check Files By Name Not Date (Optional)
- **What it is**: Use filename pattern instead of creation date to identify backups
- **Format**: `true` or `false`
- **Default**: `false`
- **Purpose**: When backup files include date in filename (YYYYMMDD format)

### Parameter 9: Use Multi Folder Check (Optional)
- **What it is**: Enable checking multiple folders in single operation
- **Format**: `true` or `false`
- **Default**: `false`
- **Purpose**: Process multiple backup locations with consolidated notifications

## Multi-Folder Format

### Single Folder
```
Parameter 2: 1BxU2t3pT4bIIGaJHFXYKLcNi5_example
```

### Multiple Folders
```
Parameter 2: folderID1=Database Backup|folderID2=File Backup|$#Section Name|folderID3=Log Backup
Parameter 9: true
```

### Section Headers
- **Section Format**: `$#Section Name` - Used to group folders in notifications
- **Purpose**: Organize multiple backup types in notification emails
- **Usage**: Place before related folder entries

## File Detection Methods

### Method 1: By Creation Date (Default)
- **How it works**: Checks Google Drive file creation timestamp
- **Comparison**: Files created on specified date (today/yesterday)
- **Advantages**: Works regardless of filename patterns
- **Best for**: Standard backup systems that upload files immediately

### Method 2: By Filename Pattern
- **How it works**: Looks for YYYYMMDD pattern in filename
- **Format**: Files must contain date like `backup_20241123.sql`
- **When to use**: When backup files are renamed or moved after creation
- **Parameter**: Set Parameter 8 to `true`

## OAuth File Requirements

### Required Permissions
The OAuthFile must be configured with proper permissions:
- **Authorized**: Must complete OAuth flow and be authenticated
- **For Checking Backups**: Must have "Used For Checking Backups On Google Drive" enabled
- **For Emptying Trash** (if Parameter 7 = true): Must have "Used For Emptying Trash of Google Drive Account" enabled

### Setup Steps
1. Create OAuthFile entity in system
2. Configure Google Drive API credentials
3. Complete OAuth authorization flow
4. Enable required permission flags
5. Test connection and permissions

## Notification System

### Success Notifications
- **When Sent**: When backup files are found in folders
- **Day Restriction**: Can be limited to specific days (Parameter 6)
- **Content**: Includes backup file details, sizes, creation times
- **Multi-Folder**: Consolidated notification for all found backups

### Failure Notifications
- **When Sent**: When no backup files found in any checked folder
- **Always Sent**: No day-of-week restrictions (critical alerts)
- **Content**: Lists folders that lack backup files
- **Urgency**: High priority - indicates backup system failure

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **OAuth Security**: OAuth files contain sensitive authentication credentials
2. **Google API Limits**: May hit Google Drive API rate limits with frequent checking
3. **Network Dependency**: Requires internet connection and Google Drive access
4. **Trash Emptying**: Parameter 7 permanently deletes files from Google Drive trash
5. **Multi-Folder Performance**: Checking many folders can be slow and resource-intensive
6. **Notification Spam**: Without proper day restrictions, can generate excessive emails

## Monitoring and Troubleshooting

### Success Indicators
- **Files Found**: Backup files detected in specified folders
- **Notifications Sent**: Appropriate notifications delivered successfully
- **No Errors**: Action completes without authentication or API errors
- **Trash Cleaned**: If enabled, trash emptying succeeds

### Common Issues

**"OAuth authentication failed"**
- Check OAuthFile is properly authorized
- Verify OAuth flow was completed successfully
- Confirm Google Drive API credentials are valid
- Check internet connectivity to Google services

**"No backup files found"**
- Verify backup system is actually running
- Check if files are being uploaded to correct folder
- Confirm folder ID is correct in Parameter 2
- Check date comparison logic (today vs yesterday)

**"API rate limit exceeded"**
- Reduce frequency of checking (don't run too often)
- Avoid checking too many folders simultaneously
- Consider checking different folders at different times
- Monitor Google API quota usage

**"Permission denied errors"**
- Verify OAuthFile has required permission flags enabled
- Check Google Drive folder sharing permissions
- Confirm OAuth account has access to target folders
- Re-authorize OAuth file if needed

**"Trash emptying fails"**
- Check "For Emptying Trash" permission in OAuthFile
- Verify Google Drive account has items in trash
- Check network connectivity during trash operation
- Monitor for Google Drive service issues

### Performance Considerations
- **Folder Count**: More folders = longer processing time
- **File Count**: Folders with many files take longer to scan
- **Network Speed**: Google Drive API calls depend on internet speed
- **API Quotas**: Google imposes daily API usage limits

## SQL Queries for Setup Verification

```sql
-- Check OAuthFile configuration
SELECT code, userEmail, authorized, forCheckingBackupOnDrive, forDriveEmptyTrash
FROM OAuthFile 
WHERE code = '[oauth-file-code]'

-- Check NotificationDefinition setup
SELECT code, title, emailTemplate, smsTemplate
FROM NotificationDefinition 
WHERE code IN ('[success-notification-code]', '[failure-notification-code]')

-- Monitor recent backup check results (check actual table structure)
SELECT entityCode, actionClass, lastRunDate, success
FROM EntityTargetAction 
WHERE actionClass LIKE '%EACheckDailyBackupOnGoogleDrive%'
ORDER BY lastRunDate DESC
```

## Best Practices

### Scheduling Recommendations
- **Daily Frequency**: Run once per day for daily backups
- **Timing**: Run after backup completion window (e.g., early morning)
- **Day Restrictions**: Use Parameter 6 to limit success notifications to avoid spam
- **Stagger Checks**: If checking multiple systems, spread across different times

### Security Best Practices
- **OAuth Protection**: Protect OAuth credentials like passwords
- **Folder Access**: Only grant minimum necessary folder permissions
- **Regular Review**: Periodically review OAuth permissions and access
- **Backup Security**: Ensure backup folders have appropriate security settings

### Notification Strategy
- **Failure Alerts**: Always send immediately (critical)
- **Success Confirmation**: Weekly summary or specific days only
- **Escalation**: Set up escalation for repeated failures
- **Testing**: Test notifications to ensure delivery works

## Google Drive Folder ID Reference

### Finding Folder IDs
1. Open Google Drive folder in web browser
2. Copy ID from URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`
3. Use the folder ID portion in Parameter 2

### Folder Structure Recommendations
```
Backups/
├── Database/     (ID: 1BxU2t3pT4bIIGaJHFXYKLcNi5_db)
├── Files/        (ID: 1CyV3u4qU5cJJHbKIGXZLMdOj6_files)
└── Logs/         (ID: 1DzW4v5rV6dKKIcLJHYANNeP17_logs)
```

## Related Actions
- **Google Drive Integration**: Other Google Drive management actions
- **Backup Systems**: Actions that create and manage backup files
- **Notification Management**: Tools for managing notification definitions
- **OAuth Management**: Tools for managing OAuth authentication files

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EACheckDailyBackupOnGoogleDrive`

</div>