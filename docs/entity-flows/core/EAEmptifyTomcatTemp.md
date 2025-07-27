---
title: EAEmptifyTomcatTemp
module: core
---


<div class='entity-flows'>

# EAEmptifyTomcatTemp

**This document was generated using Claude.ai**

## Overview

This entity flow cleans the Tomcat temp directory by removing old files and folders while preserving recent items. It helps manage server storage by cleaning up temporary files that accumulate during application operations, improving system performance and preventing disk space issues.

## When This Action Runs

- **Trigger:** Scheduled maintenance tasks or manual cleanup operations
- **Target:** System temporary directory used by Tomcat and Java applications
- **Purpose:** Remove old temporary files to free disk space and improve performance
- **Frequency:** Typically scheduled regularly (daily/weekly) as part of server maintenance

## How It Works

### 1. Temporary Directory Location
- **System Property Access:** Uses `java.io.tmpdir` system property to locate temp directory
- **Absolute Path Resolution:** Converts to absolute file path for reliable access
- **Cross-Platform Support:** Works on Windows, Linux, and other operating systems
- **Standard Location:** Typically points to OS-specific temp directory

### 2. Age-Based File Filtering
- **Time Calculation:** Calculates cutoff time based on specified hours parameter
- **Age Detection:** Identifies files older than the specified time threshold
- **Filter Application:** Uses Apache Commons AgeFileFilter for efficient filtering
- **Timestamp Comparison:** Compares file modification time with cutoff time

### 3. File and Directory Processing
- **Comprehensive Scanning:** Processes both files and directories in temp folder
- **Recursive Processing:** Scans all subdirectories within temp folder
- **Type-Agnostic Deletion:** Removes all types of files and folders
- **Sequential Processing:** Processes items one by one for controlled deletion

### 4. Safe Deletion Process
- **Empty Directory Check:** Verifies directories are empty before deletion
- **File Deletion:** Removes individual files that exceed age threshold
- **Error Tolerance:** Continues processing even if some deletions fail
- **System Integration:** Uses standard Java file operations for deletion

## Key Features

### Configurable Retention Period
- **Flexible Time Threshold:** Specify retention period in hours
- **Recent File Protection:** Preserves files created within retention period
- **Default Value:** Uses 12 hours as default if no parameter specified
- **Fine-Grained Control:** Allows precise control over cleanup timing

### Comprehensive Cleanup
- **All File Types:** Removes all types of temporary files
- **Directory Cleanup:** Removes empty directories after file cleanup
- **Deep Scanning:** Processes all subdirectories recursively
- **Complete Coverage:** Ensures thorough cleanup of temp directory

### Server Performance Optimization
- **Disk Space Recovery:** Frees up valuable disk space on server
- **Performance Improvement:** Reduces directory listing times and I/O overhead
- **Maintenance Automation:** Automates routine server maintenance tasks
- **Resource Management:** Helps manage server resources efficiently

## Parameters

### Parameter 1: Leave items newer than n hours
- **Type:** Number (Optional)
- **Format:** Integer representing hours
- **Purpose:** Files and folders newer than this many hours will be preserved
- **Default:** 12 hours if not specified or invalid value provided

**Examples:**
- `6` - Keep files created in last 6 hours
- `24` - Keep files created in last 24 hours (1 day)
- `72` - Keep files created in last 72 hours (3 days)
- `168` - Keep files created in last 168 hours (1 week)

**Value Guidelines:**
- Use shorter periods (1-6 hours) for servers with limited disk space
- Use longer periods (24-72 hours) for development environments
- Consider application restart frequency when setting retention
- Monitor temp directory size to adjust retention period

## Database Tables Affected

### No Database Impact
This action operates entirely on the file system and does not affect any database tables. It only:
- Reads file system metadata (creation times, directory structure)
- Deletes physical files and directories from temp folder
- Does not interact with database records or application data

## Business Use Cases

### 1. Server Maintenance
- **Automated Cleanup:** Regular removal of accumulated temporary files
- **Disk Space Management:** Prevent disk space exhaustion on application servers
- **Performance Optimization:** Improve server performance by reducing file system overhead
- **System Health:** Maintain clean server environment for optimal operation

### 2. Development Environment Management
- **Development Cleanup:** Clean up temporary files created during development and testing
- **Build Artifact Cleanup:** Remove temporary build files and artifacts
- **Testing Environment:** Clean test environments between test runs
- **Resource Management:** Free up development server resources

### 3. Production Server Optimization
- **Regular Maintenance:** Scheduled cleanup as part of production maintenance routines
- **Monitoring Integration:** Include temp directory cleanup in server monitoring
- **Capacity Planning:** Manage server capacity by controlling temp file growth
- **Incident Prevention:** Prevent disk space related incidents

### 4. Application Performance
- **Startup Optimization:** Faster application startup with cleaner temp directories
- **I/O Performance:** Reduced file system I/O overhead with fewer temp files
- **Memory Management:** Better memory utilization with cleaner file system
- **Response Time:** Improved application response times

## Temporary File Management

### File Types Commonly Cleaned
- **Web Application Temp Files:** Uploaded files, session data, cached content
- **Framework Temp Files:** Spring, Hibernate, and other framework temporary files
- **Build Artifacts:** Temporary compilation files and build outputs
- **Log Rotation Files:** Temporary log files and rotation artifacts
- **Session Files:** Expired user session data and temporary session storage

### Directory Structure
- **Root Temp Directory:** Main system temp directory (e.g., /tmp, C:\Temp)
- **Application Subdirectories:** Subdirectories created by various applications
- **Framework Directories:** Temp directories used by web frameworks
- **User-Specific Directories:** Temp directories for different users or processes

## Important Warnings

### ⚠️ System Impact
- **Active File Risk:** May attempt to delete files currently in use by applications
- **Application Disruption:** Could affect running applications that use temp files
- **Service Impact:** May impact applications that rely on cached temp files
- **Restart Consideration:** Consider application restart after major cleanup

### ⚠️ Retention Period Selection
- **Too Short:** Risk of deleting files needed by running applications
- **Too Long:** Reduced effectiveness of cleanup operation
- **Application Dependency:** Consider how long applications typically need temp files
- **System Load:** Account for system load and application restart frequency

### ⚠️ File System Permissions
- **Access Rights:** Requires appropriate permissions to delete temp files
- **System Files:** May encounter system files that cannot be deleted
- **User Ownership:** Files owned by different users may require elevated permissions
- **Security Context:** Ensure appropriate security context for file operations

### ⚠️ Operational Considerations
- **Timing Sensitivity:** Run during low-activity periods to minimize impact
- **Monitoring Required:** Monitor for any application issues after cleanup
- **Backup Consideration:** Consider whether any temp files need backup before deletion
- **Error Handling:** Some files may fail to delete due to locks or permissions

## Best Practices

### Scheduling and Timing
- **Off-Peak Execution:** Schedule during low system usage periods
- **Regular Frequency:** Run regularly to prevent excessive accumulation
- **Monitoring Integration:** Include in system monitoring and alerting
- **Coordination:** Coordinate with other maintenance activities

### Parameter Configuration
- **Conservative Start:** Start with longer retention periods and adjust as needed
- **Environment Specific:** Use different settings for different environments
- **Application Analysis:** Analyze application temp file usage patterns
- **Testing:** Test retention settings in non-production environments

### Safety Measures
- **Monitoring Setup:** Monitor temp directory size and cleanup effectiveness
- **Error Tracking:** Track cleanup errors and failed deletions
- **Performance Monitoring:** Monitor application performance after cleanup
- **Recovery Planning:** Have procedures for handling cleanup-related issues

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAEmptifyTomcatTemp`


</div>

