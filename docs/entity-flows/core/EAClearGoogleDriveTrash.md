---
title: EAClearGoogleDriveTrash
module: core
---


<div class='entity-flows'>

# EAClearGoogleDriveTrash

**This document was generated using AI Tools**

## Purpose
This action permanently empties the trash (recycle bin) of a Google Drive account using OAuth authentication. It removes all files and folders that have been deleted and are currently in the Google Drive trash.

## When to Use This Action
- **Storage Cleanup**: Free up Google Drive storage space by permanently deleting trashed items
- **Maintenance Tasks**: Regular cleanup as part of system maintenance procedures
- **Storage Management**: When approaching Google Drive storage limits
- **Automated Cleanup**: Scheduled task to keep Google Drive accounts clean
- **Post-Backup Cleanup**: After backup verification, remove old backup files from trash

## How It Works
1. **Authentication**: Uses OAuth credentials to connect to Google Drive API
2. **Trash Access**: Connects to Google Drive trash/recycle bin
3. **Empty Operation**: Calls Google Drive API to permanently delete all trashed items
4. **Completion**: Returns success or failure result

## Entity Type Restrictions
This action works with **BaseEntity** and does not require specific entity types. It operates directly on Google Drive accounts through the API.

## Parameters Required

### Parameter 1: OAuth File Code/ID (Required)
- **What it is**: Code or ID of the OAuthFile configured for Google Drive access
- **Format**: OAuthFile entity code or hexadecimal ID
- **Purpose**: Provides authentication credentials for Google Drive API
- **Requirements**: Must be authorized and configured for trash emptying

## OAuth File Requirements

### Required Permissions
The OAuthFile must be configured with proper permissions:
- **Authorized**: Must complete OAuth flow and be authenticated
- **For Emptying Trash**: Must have "Used For Emptying Trash of Google Drive Account" enabled

### Setup Steps
1. Create OAuthFile entity in system
2. Configure Google Drive API credentials  
3. Complete OAuth authorization flow
4. Enable "Used For Emptying Trash of Google Drive Account" permission flag
5. Test connection and permissions

## How Trash Emptying Works

### Google Drive Trash System
- **Trash Storage**: Deleted files are moved to trash, not immediately deleted
- **Storage Impact**: Trashed files still count against Google Drive storage quota
- **Recovery**: Items in trash can be recovered until permanently deleted
- **Automatic Deletion**: Google automatically deletes items after 30 days

### Empty Trash Operation
- **Permanent Action**: Once emptied, files cannot be recovered
- **All Items**: Empties entire trash - cannot selectively delete items
- **Immediate Effect**: Files are permanently deleted immediately
- **Storage Recovery**: Freed storage space is immediately available

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Deletion**: This action permanently deletes all files in Google Drive trash
2. **No Recovery**: Deleted files cannot be recovered after this action runs
3. **All Files**: Empties entire trash - cannot select specific files to delete
4. **OAuth Security**: OAuth files contain sensitive authentication credentials
5. **Network Dependency**: Requires internet connection and Google Drive access
6. **API Limits**: Subject to Google Drive API rate limits

## Common Use Cases

### Storage Management
- **Quota Issues**: When Google Drive storage is full or near capacity
- **Regular Cleanup**: Monthly or weekly trash cleanup procedures
- **Automated Maintenance**: Scheduled cleanup after backup operations
- **Compliance**: Data retention policies requiring permanent deletion

### Integration Scenarios
- **Backup Systems**: Clean up after backup verification completes
- **File Management**: Part of larger file lifecycle management
- **System Maintenance**: Regular system health and cleanup procedures
- **Storage Optimization**: Maximize available Google Drive space

## Monitoring and Troubleshooting

### Success Indicators
- **No Errors**: Action completes without authentication or API errors
- **Storage Freed**: Google Drive available storage increases
- **Empty Trash**: Google Drive trash shows as empty after operation
- **Completion Message**: Action returns successful result

### Common Issues

**"OAuth authentication failed"**
- Check OAuthFile is properly authorized
- Verify OAuth flow was completed successfully
- Confirm Google Drive API credentials are valid
- Check internet connectivity to Google services

**"Permission denied errors"**
- Verify OAuthFile has "For Emptying Trash" permission enabled
- Check Google Drive account permissions
- Confirm OAuth account has access to trash operations
- Re-authorize OAuth file if needed

**"No items in trash"**
- Normal result if trash is already empty
- Verify items were actually in trash before running
- Check if trash was recently emptied by another process
- Confirm you're checking the correct Google Drive account

**"API rate limit exceeded"**
- Wait before retrying operation
- Avoid running too frequently
- Monitor Google API quota usage
- Consider scheduling during off-peak hours

**"Network connection errors"**
- Check internet connectivity
- Verify Google Drive API is accessible
- Check firewall settings for outbound connections
- Monitor for Google service outages

## SQL Queries for Setup Verification

```sql
-- Check OAuthFile configuration for trash emptying
SELECT code, userEmail, authorized, forDriveEmptyTrash
FROM OAuthFile 
WHERE forDriveEmptyTrash = 1 
  AND authorized = 1

-- Find OAuthFile by code/ID for verification
SELECT code, userEmail, authorized, forDriveEmptyTrash
FROM OAuthFile 
WHERE code = '[oauth-file-code]' 
   OR id = '[oauth-file-id]'

-- Monitor recent trash emptying activities (check actual table structure)
SELECT entityCode, actionClass, lastRunDate, success
FROM EntityTargetAction 
WHERE actionClass LIKE '%EAClearGoogleDriveTrash%'
ORDER BY lastRunDate DESC
```

## Best Practices

### Scheduling Recommendations
- **Frequency**: Monthly or weekly depending on usage patterns
- **Timing**: During off-peak hours to minimize API impact
- **After Backups**: Run after backup verification is complete
- **Storage Monitoring**: Schedule when approaching storage limits

### Security Best Practices
- **OAuth Protection**: Protect OAuth credentials like passwords
- **Account Access**: Only grant minimum necessary permissions
- **Regular Review**: Periodically review OAuth permissions and access
- **Audit Trail**: Log when trash emptying operations are performed

### Operational Guidelines
- **Verification First**: Ensure items in trash are safe to delete permanently
- **Backup Verification**: If cleaning backup files, verify backups are successful first
- **User Communication**: Inform users before scheduled trash emptying
- **Recovery Planning**: Have data recovery procedures for critical files

## Safety Considerations

### Before Running This Action
1. **Verify Trash Contents**: Check what files are in Google Drive trash
2. **Confirm Safety**: Ensure no important files are accidentally in trash
3. **Backup Verification**: If deleting backup files, confirm backups are successful
4. **User Notification**: Inform users about upcoming permanent deletion

### Data Protection
- **Important Files**: Double-check that no critical files are in trash
- **Backup Strategy**: Ensure important data has alternative backups
- **Recovery Plan**: Have procedures for data recovery if needed
- **Testing**: Test with non-critical accounts first

## Related Actions
- **EACheckDailyBackupOnGoogleDrive**: Often used together for backup management
- **Google Drive Integration**: Other Google Drive management actions
- **OAuth Management**: Tools for managing OAuth authentication files
- **Storage Management**: Other storage cleanup and management tools

## API Reference

### Google Drive API Used
- **Method**: `drive.files().emptyTrash().execute()`
- **Authentication**: OAuth 2.0 with Google Drive scope
- **Effect**: Permanently deletes all items in trash
- **Rate Limits**: Subject to Google Drive API quotas

### Error Handling
- **IOException**: Network or API communication errors
- **Authentication Errors**: OAuth credential or permission issues
- **Rate Limiting**: Google API usage quota exceeded
- **Service Errors**: Google Drive service unavailable

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EAClearGoogleDriveTrash`

</div>