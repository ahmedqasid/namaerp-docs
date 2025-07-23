---
title: EADeleteOldFiles
module: core
---


<div class='entity-flows'>

# EADeleteOldFiles

**This document was generated using AI Tools**

## Purpose
This action manages disk space by automatically deleting old files from specified folders, keeping only a configured number of the most recent files. It can operate on single folders or recursively process entire directory structures.

## When to Use This Action
- **Log File Cleanup**: Remove old log files to prevent disk space issues
- **Backup Management**: Keep only recent backup files, delete older ones
- **Report Cleanup**: Clean up old generated reports and temporary files
- **Archive Management**: Maintain rolling archives with limited file counts
- **Scheduled Maintenance**: Automated file cleanup as part of system maintenance

## How It Works
1. **Folder Access**: Accesses the specified folder and lists all files
2. **File Sorting**: Sorts files by name or modification date (newest first)
3. **Count Check**: Compares current file count with desired files to keep
4. **File Deletion**: Deletes oldest files to maintain the specified count
5. **Recursive Processing**: Optionally processes all subdirectories with same rules
6. **Error Handling**: Reports errors if files cannot be deleted

## Entity Type Restrictions
This action **ONLY** works with **TaskSchedule** entities and is typically used in scheduled maintenance tasks.

## Parameters Required

### Parameter 1: Folder Path (Required)
- **What it is**: Full path to the folder containing files to manage
- **Format**: Absolute file system path
- **Examples**: `C:\logs\`, `/var/log/application/`, `\\server\share\backups\`
- **Purpose**: Specifies which folder to clean up

### Parameter 2: Order By (Required)
- **What it is**: How to sort files to determine which ones to keep
- **Format**: `date` or `name`
- **Options**:
  - `date`: Sort by file modification date (newest kept)
  - `name`: Sort by filename alphabetically (last alphabetically kept)
- **Purpose**: Determines which files are considered "newest" and should be preserved

### Parameter 3: Files To Keep (Required)
- **What it is**: Number of files to retain in each folder
- **Format**: Positive integer greater than 0
- **Examples**: `10`, `50`, `100`
- **Purpose**: Sets the maximum number of files to keep in each processed folder

### Parameter 4: Recursive (Optional)
- **What it is**: Whether to process subdirectories
- **Format**: `true` or `false`
- **Default**: `false` - only process the specified folder
- **Purpose**: Controls whether to apply cleanup rules to all subdirectories

## File Sorting Behavior

### Sort by Date (Parameter 2 = "date")
- **Criteria**: File modification timestamp (lastModified)
- **Order**: Newest files first, oldest files deleted first
- **Use Case**: Best for log files, backups, or any files where recency matters
- **Example**: Keep latest 10 log files, delete older ones

### Sort by Name (Parameter 2 = "name")
- **Criteria**: Filename alphabetical order
- **Order**: Alphabetically last files first, alphabetically first deleted first
- **Use Case**: Good for files with date/time in filename or sequential naming
- **Example**: Files named `backup_20241201.zip`, `backup_20241202.zip` - keeps latest dates

## Recursive Processing

### Single Folder Mode (Parameter 4 = false)
- **Scope**: Only processes the exact folder specified in Parameter 1
- **Subdirectories**: Subdirectories are ignored completely
- **File Count**: Applies file limit only to files directly in target folder

### Recursive Mode (Parameter 4 = true)
- **Scope**: Processes target folder AND all subdirectories
- **Individual Limits**: Each folder gets its own file limit separately
- **Deep Processing**: Processes subdirectories to any depth level
- **Performance**: Can be slower with deep directory structures

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Deletion**: Files are permanently deleted - they do not go to recycle bin
2. **No Recovery**: Deleted files cannot be recovered unless backups exist
3. **Disk Space**: Action only runs if folder exists and is accessible
4. **File Locks**: Cannot delete files that are currently in use or locked
5. **Permissions**: Requires proper file system permissions to delete files
6. **Path Validation**: Invalid folder paths will cause action to fail

## File Deletion Process

### Deletion Logic
1. **File Enumeration**: Lists all files (not subdirectories) in folder
2. **Sorting**: Sorts files according to specified criteria
3. **Count Comparison**: Compares current file count with target count
4. **Oldest Selection**: Selects oldest files for deletion (files at beginning of sorted list)
5. **Deletion Execution**: Permanently deletes selected files

### What Gets Deleted
- **Files Only**: Only deletes files, never deletes folders/directories
- **Oldest First**: Always deletes oldest files based on sort criteria
- **Excess Count**: Only deletes files beyond the "Files To Keep" limit
- **No Subdirectory Files**: In non-recursive mode, doesn't touch subdirectory files

## Use Case Examples

### Log File Management
```
Parameter 1: C:\logs\application\
Parameter 2: date
Parameter 3: 30
Parameter 4: false
Result: Keeps newest 30 log files, deletes older ones
```

### Backup Retention
```
Parameter 1: /backups/daily/
Parameter 2: name  
Parameter 3: 7
Parameter 4: false
Result: Keeps 7 backup files (assuming date-named files)
```

### Report Cleanup (Recursive)
```
Parameter 1: C:\reports\
Parameter 2: date
Parameter 3: 20
Parameter 4: true
Result: In each report subfolder, keeps newest 20 files
```

## Monitoring and Troubleshooting

### Success Indicators
- **File Count Maintained**: Each folder has no more than specified file count
- **Disk Space Freed**: Old files removed, disk space recovered
- **No Errors**: Action completes without file access or permission errors
- **Scheduled Execution**: When used in TaskSchedule, runs on schedule

### Common Issues

**"Cannot access folder"**
- Check folder path exists and is accessible
- Verify folder permissions allow read/write access
- Check network connectivity for network paths
- Ensure folder is not locked by other processes

**"Files not being deleted"**
- Files may be locked or in use by other applications
- Check file permissions allow deletion
- Verify Files To Keep parameter is less than current file count
- Some files may be read-only or protected

**"Permission denied errors"**
- ERP service account lacks delete permissions on folder
- Files may be owned by different user account
- Network share permissions may be insufficient
- Check Windows/Linux file security settings

**"Recursive processing too slow"**
- Deep directory structures take time to process
- Consider processing specific subdirectories separately
- Monitor system resources during execution
- Consider running during off-peak hours

**"Wrong files being deleted"**
- Check sort order - may be sorting opposite of expectation
- Verify file naming patterns match expected sort behavior
- Test with higher Files To Keep value first
- Review which files are actually oldest by criteria

## Best Practices

### Folder Management
- **Path Verification**: Always verify folder paths before deployment
- **Permission Testing**: Test file deletion permissions manually first
- **Path Format**: Use proper path separators for your operating system
- **Network Paths**: Be cautious with network drives - they may be unreliable

### File Retention Strategy
- **Conservative Approach**: Start with higher file counts, reduce gradually
- **Business Requirements**: Align retention with business and legal requirements
- **Disk Space Monitoring**: Monitor disk space before and after cleanup
- **Critical Files**: Never apply to folders containing critical system files

### Scheduling Considerations
- **Frequency**: Schedule based on file generation rate
- **Timing**: Run during low system usage periods
- **Monitoring**: Monitor execution results and adjust as needed
- **Alerts**: Set up alerts for cleanup failures

### Safety Measures
- **Testing**: Test on non-production folders first
- **Backups**: Ensure important files are backed up elsewhere
- **Gradual Rollout**: Start with less critical file types
- **Documentation**: Document which folders are managed and why

## File System Considerations

### Windows Considerations
- **Path Length**: Be aware of Windows path length limitations
- **Special Characters**: Avoid special characters in folder paths
- **Drive Letters**: Use consistent drive letter mapping
- **UNC Paths**: Test Universal Naming Convention paths thoroughly

### Linux/Unix Considerations
- **Case Sensitivity**: File names are case-sensitive
- **Permissions**: Check user/group permissions carefully
- **Symbolic Links**: Be aware of how symbolic links are handled
- **Mount Points**: Verify network mounts are available

## Related Actions
- **File Management**: Other actions for managing files and folders
- **Backup Operations**: Actions for creating and managing backups
- **Scheduled Tasks**: Tools for managing TaskSchedule entities
- **Disk Space Monitoring**: Tools for monitoring disk usage

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteOldFiles`

</div>