---
title: EAEmptifyTomcatTemp
module: core
---


<div class='entity-flows'>

# EAEmptifyTomcatTemp

**This document was generated using AI Tools**

## Purpose
This action cleans up the system's temporary directory by removing old files and empty directories, while preserving files created within a specified number of hours. It helps manage disk space by automatically cleaning up temporary files that accumulate over time.

## When to Use This Action
- **Disk Space Management**: Free up disk space consumed by temporary files
- **System Maintenance**: Regular cleanup of temporary directory as part of maintenance
- **Performance Improvement**: Remove file system clutter that may impact performance
- **Scheduled Cleanup**: Automated temporary file management in scheduled tasks
- **Server Maintenance**: Prevent temporary directories from consuming excessive storage

## How It Works
1. **Temp Directory Access**: Locates the system temporary directory using Java system properties
2. **Age Calculation**: Calculates cutoff time based on hours parameter (default 12 hours)
3. **File Scanning**: Scans all files and directories in the temporary folder
4. **Age Filtering**: Identifies files and directories older than the specified age
5. **Cleanup Execution**: Deletes old files and empty directories
6. **Success Return**: Returns success result after cleanup completion

## Parameters Required

### Parameter 1: Leave Items Newer Than N Hours (Optional)
- **What it is**: Number of hours - files newer than this are preserved
- **Format**: Integer number (positive)
- **Default**: `12` hours if parameter is empty or invalid
- **Examples**: `6`, `24`, `48`, `168` (1 week)
- **Purpose**: Controls how recent files are protected from deletion

## Temporary Directory Details

### System Temp Directory Location
The action automatically finds the system temporary directory:
- **Windows**: Usually `%TEMP%` or `%TMP%` (e.g., `C:\Users\[User]\AppData\Local\Temp\`)
- **Linux/Unix**: Usually `/tmp/` or `/var/tmp/`
- **Java Property**: Uses `java.io.tmpdir` system property
- **Automatic Detection**: No need to specify path - system determines location

### What Gets Cleaned
- **Old Files**: Files older than specified hours
- **Empty Directories**: Directories that become empty after file removal
- **All File Types**: No file type restrictions - all old files removed
- **Recursive**: Processes all subdirectories within temp folder

## Age Calculation Logic

### Cutoff Time Calculation
```
Cutoff Time = Current Time - (Hours Parameter × 60 × 60 × 1000 milliseconds)
Files older than Cutoff Time = Deleted
Files newer than Cutoff Time = Preserved
```

### Time Examples
If current time is 2024-12-15 14:00:00:
- **Parameter = 6**: Deletes files older than 2024-12-15 08:00:00
- **Parameter = 12**: Deletes files older than 2024-12-15 02:00:00  
- **Parameter = 24**: Deletes files older than 2024-12-14 14:00:00
- **Parameter = 168**: Deletes files older than 2024-12-08 14:00:00

## File Deletion Process

### What Gets Deleted
1. **Old Files**: Any file older than the specified time threshold
2. **Empty Directories**: Directories that have no files after cleanup
3. **All Depths**: Files in subdirectories at any depth level
4. **No Exceptions**: All file types and extensions are subject to deletion

### What Gets Preserved
- **Recent Files**: Files created within the specified hours
- **Non-Empty Directories**: Directories containing preserved files
- **Active Files**: Files currently in use (may fail to delete but won't cause errors)

### Deletion Safety
- **File Locks**: Cannot delete files currently in use by applications
- **Permission Errors**: Skips files without delete permissions
- **Error Tolerance**: Continues processing even if some files cannot be deleted

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Deletion**: Files are permanently deleted - they do not go to recycle bin
2. **System-Wide Impact**: Cleans system temp directory used by all applications
3. **No Recovery**: Deleted temporary files cannot be recovered
4. **Active File Protection**: Files in use by applications may be protected but attempts deletion
5. **Directory Structure**: May remove entire directory trees if they become empty

## Temporary File Considerations

### Common Temp File Sources
- **Application Caches**: Temporary data created by applications
- **Upload Processing**: Files from web uploads being processed
- **Report Generation**: Temporary files from report creation
- **Image Processing**: Temporary image files during processing
- **System Operations**: Files created by operating system processes

### Files to Be Cautious About
- **Active Sessions**: Files from active user sessions
- **Processing Queues**: Files being processed by background jobs
- **Cached Data**: Application performance caches
- **Temporary Databases**: Temporary database files

## Scheduling Recommendations

### Frequency Guidelines
- **Daily**: For high-activity systems with lots of temporary file creation
- **Weekly**: For moderate-activity systems
- **Off-Hours**: Schedule during low system usage periods
- **Maintenance Windows**: Include in regular maintenance schedules

### Timing Considerations
- **User Activity**: Run when fewer users are active
- **Batch Processing**: Avoid running during batch job execution
- **Backup Times**: Don't run during backup operations
- **Peak Hours**: Avoid during business peak hours

## Monitoring and Troubleshooting

### Success Indicators
- **Disk Space Freed**: Available disk space increases after execution
- **Temp Directory Size**: Temporary directory size is reduced
- **No Critical Errors**: Action completes successfully
- **File Count Reduced**: Fewer old files in temporary directory

### Common Issues

**"No space freed despite running"**
- Most temp files may be newer than threshold
- Increase hours parameter to clean more aggressively
- Check if files are locked by running applications
- Verify system temp directory location is correct

**"Permission denied errors"**
- Service account may lack delete permissions
- Some files may be owned by other users/applications
- Check file system permissions on temp directory
- Run with appropriate service account privileges

**"Files not being deleted"**
- Files may be in use by active applications
- Check for locked files or running processes
- Some files may be read-only or protected
- Verify file age calculation is working correctly

**"System performance impact"**
- Large numbers of files can slow deletion process
- Consider running with more restrictive time limits
- Schedule during maintenance windows
- Monitor system resources during execution

**"Critical files accidentally deleted"**
- Applications may be storing important data in temp
- Increase preservation time to be more conservative
- Review what applications use temp directory
- Consider application-specific temp cleanup instead

## Best Practices

### Parameter Selection
- **Conservative Start**: Begin with larger hour values (24-48 hours)
- **Gradual Reduction**: Reduce hours gradually based on results
- **Business Hours**: Consider business processes that use temp files
- **Application Needs**: Account for applications that need longer temp file retention

### Safety Measures
- **Test Environment**: Test on development systems first
- **Monitor Impact**: Watch system behavior after cleanup
- **Backup Critical Data**: Ensure important data isn't in temp directories
- **User Communication**: Inform users about scheduled temp cleanup

### System Maintenance
- **Regular Scheduling**: Include in regular maintenance routines
- **Disk Monitoring**: Monitor disk space before and after cleanup
- **Log Review**: Review action logs for any issues
- **Performance Tracking**: Track cleanup effectiveness over time

### Application Coordination
- **Application Awareness**: Understand what applications use temp space
- **Process Timing**: Coordinate with application processing schedules
- **File Retention**: Align cleanup schedule with application temp file needs
- **Error Handling**: Monitor for applications affected by temp cleanup

## Related Actions
- **EADeleteOldFiles**: For cleaning up specific application directories
- **File Management**: Other file system maintenance actions
- **Scheduled Tasks**: Tools for managing scheduled maintenance
- **System Monitoring**: Tools for monitoring disk space and system health

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAEmptifyTomcatTemp`

</div>