---
title: EADeleteOldFiles
module: core
---


<div class='entity-flows'>

# EADeleteOldFiles

**This document was generated using Claude.ai**

## Overview

This entity flow manages file system cleanup by keeping only a specified number of recent files in a folder and deleting older files. It sorts files by date or name and removes excess files to maintain storage efficiency and prevent accumulation of old files.

## When This Action Runs

- **Trigger:** Scheduled task execution or manual cleanup operations
- **Target:** File system folders containing files that need regular cleanup
- **Purpose:** Maintain storage efficiency by removing old files automatically
- **Frequency:** Typically scheduled regularly (daily/weekly) for log rotation and cleanup

## How It Works

### 1. Folder Access and Validation
- **Folder Location:** Accesses the specified folder path on the file system
- **Existence Check:** Validates that the folder exists and is accessible
- **Permission Verification:** Ensures the system has read and delete permissions
- **Error Handling:** Handles cases where folder is inaccessible or doesn't exist

### 2. File Discovery and Filtering
- **File Enumeration:** Lists all files in the target folder
- **File Type Filtering:** Only processes actual files, not subdirectories
- **File Collection:** Creates a list of files for sorting and processing
- **Recursive Processing:** Optionally processes subdirectories if recursive mode is enabled

### 3. File Sorting and Ordering
- **Sort Criteria:** Orders files by modification date or filename alphabetically
- **Date Sorting:** Uses file last modification timestamp for chronological ordering
- **Name Sorting:** Uses alphabetical filename sorting for predictable ordering
- **Sort Direction:** Sorts in ascending order (oldest/first alphabetically files listed first)

### 4. Excess File Deletion
- **Retention Calculation:** Determines which files exceed the retention limit
- **File Removal:** Deletes files starting from the oldest/first alphabetically
- **Sequential Processing:** Removes files one by one until count reaches target
- **Error Handling:** Stops processing if file deletion fails

### 5. Recursive Directory Processing
- **Subdirectory Traversal:** Optionally processes all subdirectories recursively
- **Independent Processing:** Each directory processed independently with same rules
- **Hierarchical Cleanup:** Maintains consistent file limits across directory tree
- **Complete Coverage:** Ensures all subdirectories are cleaned according to same rules

## Key Features

### Flexible File Selection
- **Date-Based Cleanup:** Keep most recently modified files
- **Name-Based Cleanup:** Keep files based on alphabetical ordering (useful for numbered files)
- **Configurable Retention:** Set any number of files to retain
- **Smart Filtering:** Only processes files, ignores directories during counting

### Recursive Processing
- **Directory Tree Cleanup:** Clean entire directory hierarchies
- **Independent Limits:** Each directory maintains its own file limit
- **Scalable Operation:** Handle complex directory structures efficiently
- **Consistent Rules:** Apply same retention rules across all directories

### Safe Operation
- **Retention Enforcement:** Never deletes all files (requires minimum of 1 file to keep)
- **File-Only Deletion:** Only deletes files, never removes directories
- **Error Isolation:** Failure in one directory doesn't affect others
- **Atomic Operations:** Each file deletion is a separate operation

## Parameters

### Parameter 1: Folder Path
- **Type:** Text (Required)
- **Format:** Absolute or relative path to the folder to clean
- **Purpose:** Specifies the target directory for file cleanup
- **Permissions:** Must have read and delete permissions on the folder

**Examples:**
- `C:\logs\application` - Windows absolute path
- `/var/log/nama-erp` - Unix absolute path
- `logs/backup` - Relative path from application directory
- `\\server\share\backups` - Network share path

### Parameter 2: Order By
- **Type:** Text (Required)
- **Values:** "date" or "name"
- **Purpose:** Determines how files are sorted before deletion
- **Default Behavior:** Any value other than "date" will use name sorting

**Sorting Behavior:**
- **"date":** Sort by file last modification time (oldest first)
- **"name":** Sort alphabetically by filename (A-Z, 0-9 first)

### Parameter 3: Files To Keep
- **Type:** Number (Required)
- **Format:** Positive integer greater than 0
- **Purpose:** Number of files to retain in each folder
- **Validation:** Must be greater than zero to prevent deleting all files

**Examples:**
- `5` - Keep the 5 most recent files
- `10` - Keep the 10 most recent files
- `50` - Keep the 50 most recent files

### Parameter 4: Recursive
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to process subdirectories recursively
- **Default:** false (process only specified folder)

## Database Tables Affected

### No Database Impact
This action operates entirely on the file system and does not affect any database tables. It only:
- Reads file system metadata (filenames, modification dates)
- Deletes physical files from the file system
- Does not interact with database records or entity data

## Business Use Cases

### 1. Log File Management
- **Application Logs:** Rotate and cleanup application log files automatically
- **System Logs:** Manage system log retention to prevent disk space issues
- **Audit Logs:** Maintain audit log retention policies
- **Debug Logs:** Clean up debug and trace log files regularly

### 2. Backup File Maintenance
- **Database Backups:** Keep only recent database backup files
- **Document Backups:** Manage document and file backup retention
- **System Backups:** Maintain system backup file rotation
- **Archive Management:** Clean up temporary archive files

### 3. Report and Export Cleanup
- **Generated Reports:** Remove old report files to save storage
- **Data Exports:** Clean up old export files automatically
- **Temporary Files:** Remove temporary processing files
- **Cache Files:** Manage cache file retention

### 4. Storage Management
- **Disk Space Optimization:** Prevent disk space exhaustion from file accumulation
- **Performance Improvement:** Reduce directory listing times by limiting file counts
- **Maintenance Automation:** Automate routine storage cleanup tasks
- **Compliance Requirements:** Meet data retention policy requirements

## File Deletion Logic

### Date-Based Deletion
- Files sorted by modification date (oldest first)
- Oldest files deleted first until desired count reached
- Most recently modified files are preserved
- Useful for log files and time-based data

### Name-Based Deletion
- Files sorted alphabetically by filename
- Files starting with numbers/letters earliest in alphabet deleted first
- Useful for numbered backup files or sequentially named files
- Predictable deletion order based on filename patterns

### Recursive Processing
- Each directory processed independently
- Same retention rules applied to all directories
- Subdirectories cleaned according to their own file counts
- Directory structure preserved (only files deleted)

## Important Warnings

### ⚠️ Data Loss Risk
- **Permanent Deletion:** Deleted files cannot be easily recovered
- **No Recycle Bin:** Files are permanently deleted from file system
- **Backup Recommendation:** Ensure important files are backed up elsewhere
- **Test First:** Test with non-critical directories before production use

### ⚠️ Path and Permission Requirements
- **Valid Paths:** Folder paths must exist and be accessible
- **Permission Requirements:** Requires delete permissions on target folders
- **Network Paths:** Network drives may have additional permission requirements
- **Path Format:** Use correct path format for operating system

### ⚠️ Recursive Operation Impact
- **Subdirectory Impact:** Recursive mode affects all subdirectories
- **Large Directory Trees:** May process many directories and take significant time
- **Permission Inheritance:** All subdirectories must be accessible
- **Resource Usage:** Recursive processing may consume significant system resources

### ⚠️ File Selection Logic
- **Sort Understanding:** Understand how files will be sorted and selected for deletion
- **Retention Logic:** Files to keep count applies to each directory independently
- **Mixed File Types:** All file types in directory are subject to cleanup
- **No File Type Filtering:** Action doesn't distinguish between file types

## Best Practices

### Planning and Testing
- **Test Environment:** Test file cleanup logic in non-production environment
- **Path Verification:** Verify folder paths are correct before scheduling
- **Retention Planning:** Determine appropriate file retention counts for each use case
- **Backup Strategy:** Ensure critical files are backed up before cleanup

### Scheduling and Monitoring
- **Regular Schedule:** Schedule cleanup during low-activity periods
- **Monitoring:** Monitor disk space and file counts after cleanup operations
- **Error Handling:** Implement error notification for cleanup failures
- **Documentation:** Document cleanup policies and schedules

### Security and Safety
- **Permission Management:** Use minimal required permissions for cleanup operations
- **Path Security:** Ensure cleanup paths don't accidentally target critical system files
- **Access Control:** Restrict access to cleanup configuration to authorized personnel
- **Audit Trail:** Log cleanup operations for audit purposes

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteOldFiles`


</div>

