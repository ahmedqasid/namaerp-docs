---
title: EANamaCloudBackupPrepare
module: core
---


<div class='entity-flows'>

# EANamaCloudBackupPrepare

**This document was generated using Claude.ai**

## Overview

This entity flow prepares Google Drive backup configuration by scanning specified Google Drive folders and generating folder structure information for backup operations. It connects to Google Drive using OAuth authentication, analyzes folder hierarchies, and prepares configuration parameters for the daily backup checking process. This action is essential for automated cloud backup monitoring and validation.

## When This Action Runs

- **Trigger:** Manual execution or automated through task schedules for backup preparation
- **Target:** TaskSchedule entities managing Google Drive backup operations
- **Purpose:** Prepare folder structure configuration for Google Drive backup monitoring
- **Timing:** Typically runs before backup validation processes or when backup configuration needs updating

## How It Works

### 1. Google Drive Authentication
- **OAuth File Retrieval:** Retrieves OAuth credentials file for Google Drive access
- **Credential Authentication:** Authenticates with Google Drive API using stored credentials
- **Drive Service Setup:** Sets up Google Drive service with proper authentication
- **API Connection:** Establishes connection to Google Drive API for folder operations

### 2. Folder Structure Analysis
- **Root Folder Processing:** Processes specified root folders from configuration
- **Subfolder Discovery:** Discovers all subfolders within each root folder
- **Hierarchy Validation:** Validates expected folder structure (expects 2 subfolders per backup folder)
- **Folder Information Extraction:** Extracts folder names and IDs for configuration

### 3. Configuration Generation
- **Folder Mapping Creation:** Creates folder ID to name mappings for backup configuration
- **Section Organization:** Organizes folders by sections (server groups, etc.)
- **Output Formatting:** Formats output for use by backup validation processes
- **Error Detection:** Identifies folder structure inconsistencies

### 4. Result Management and Storage
- **Configuration Storage:** Stores generated configuration in task schedule parameters
- **Error Reporting:** Reports folder structure errors and inconsistencies
- **Output Saving:** Optionally saves output to other task schedules
- **Result Validation:** Validates and reports preparation results

## Key Features

### Google Drive Integration
- **OAuth Authentication:** Secure OAuth-based authentication with Google Drive
- **API Integration:** Full integration with Google Drive API for folder operations
- **Folder Scanning:** Comprehensive folder scanning and structure analysis
- **Hierarchical Processing:** Processes complex folder hierarchies automatically

### Backup Configuration Management
- **Automated Discovery:** Automatically discovers backup folder structures
- **Configuration Generation:** Generates configuration for backup validation processes
- **Structure Validation:** Validates expected folder structures for backup operations
- **Error Detection:** Detects and reports folder structure inconsistencies

### Flexible Output Management
- **Task Parameter Storage:** Stores configuration in task schedule parameters
- **Multiple Output Options:** Supports multiple output destinations
- **Custom Output Formatting:** Supports custom output formatting and appending
- **Configuration Persistence:** Persists configuration for use by other processes

## Parameters

### Parameter 1: (Not Used)
- **Type:** Any
- **Purpose:** This parameter is not used in the current implementation
- **Note:** Can be left empty

### Parameter 2: OAuth File Code or ID (Required)
- **Type:** Business Code or Entity ID
- **Purpose:** Reference to OAuthFile entity containing Google Drive credentials
- **Format:** Business code or numeric ID of OAuthFile entity
- **Examples:** `GOOGLE_DRIVE_OAUTH`, `BACKUP_CREDENTIALS`, `123`

### Parameter 3: Drive Folder IDs (Required)
- **Type:** Folder Configuration Mapping
- **Purpose:** Maps server/section names to Google Drive folder IDs
- **Format:** `sectionName=folderId1,folderId2,folderId3`
- **Examples:**
```
# Single server section
SERVER1=1a2b3c4d5e6f7g8h9i0j

# Multiple servers
PROD=1a2b3c4d5e6f7g8h9i0j,2b3c4d5e6f7g8h9i0j1k
DEV=3c4d5e6f7g8h9i0j1k2l,4d5e6f7g8h9i0j1k2l3m

# With section markers
PRODUCTION@MAIN=1a2b3c4d5e6f7g8h9i0j
DEVELOPMENT@BACKUP=2b3c4d5e6f7g8h9i0j1k
```

### Parameter 4: Append To Output (Optional)
- **Type:** Text
- **Purpose:** Additional text to append to the generated configuration output
- **Format:** Any text content
- **Usage:** Add custom configuration or notes to the output

### Parameter 5: Save Output To Task Schedule (Optional)
- **Type:** Task Schedule Code or ID
- **Purpose:** Task schedule where the output should be saved
- **Format:** Business code or numeric ID of target TaskSchedule entity
- **Examples:** `BACKUP_CONFIG_TASK`, `DAILY_BACKUP_CHECK`, `456`

### Parameter 6: Output (Output Parameter)
- **Type:** Generated Output
- **Purpose:** Generated configuration output for backup processes
- **Format:** Automatically generated folder configuration
- **Usage:** Used by backup validation processes

## Database Tables Affected

### TaskSchedule Parameter Updates
- **Parameter6 Update:** Updates current task schedule's parameter6 with generated configuration
- **Configuration Storage:** Stores folder structure configuration for backup operations
- **Version Management:** Increments task schedule version after configuration update
- **Forced Stable Update:** Uses forced stable update to ensure configuration persistence

### Target TaskSchedule Updates
- **Parameter2 Update:** Updates target task schedule's parameter2 with configuration
- **Cross-Task Configuration:** Enables configuration sharing between task schedules
- **Backup Process Integration:** Integrates with backup validation task schedules
- **Configuration Synchronization:** Synchronizes configuration across related tasks

### OAuthFile Access
- **Credential Retrieval:** Reads OAuth credentials for Google Drive authentication
- **Authentication Data:** Accesses stored authentication tokens and certificates
- **Security Token Management:** Manages secure access to Google Drive APIs
- **Credential Validation:** Validates OAuth credentials before API access

### No Google Drive Modifications
- **Read-Only Access:** Only reads folder information from Google Drive
- **No File Operations:** Does not create, modify, or delete files or folders
- **Structure Analysis Only:** Only analyzes existing folder structures
- **Non-Destructive Operation:** Completely non-destructive to Google Drive content

## Business Use Cases

### 1. Automated Backup Monitoring
- **Backup Validation Setup:** Sets up automated backup validation processes
- **Folder Structure Monitoring:** Monitors backup folder structures for consistency
- **Configuration Management:** Manages backup configuration automatically
- **Error Detection:** Detects backup folder structure issues early

### 2. Cloud Backup Management
- **Google Drive Integration:** Integrates backup monitoring with Google Drive storage
- **Multi-Server Backups:** Manages backups across multiple servers and environments
- **Centralized Configuration:** Centralizes backup configuration management
- **Automated Discovery:** Automatically discovers new backup folders

### 3. Backup Compliance and Auditing
- **Compliance Monitoring:** Monitors backup compliance with organizational policies
- **Audit Trail Generation:** Generates audit trails for backup operations
- **Structure Validation:** Validates backup folder structures meet requirements
- **Reporting Support:** Supports backup reporting and compliance documentation

### 4. DevOps and System Administration
- **Infrastructure Backup:** Manages infrastructure and system backups
- **Multi-Environment Support:** Supports development, staging, and production environments
- **Automated Configuration:** Automates backup configuration management
- **System Integration:** Integrates with existing DevOps and monitoring tools

## Google Drive Folder Structure

### Expected Folder Hierarchy
```
Root Backup Folder
├── Server1
│   ├── Differential
│   └── Full
├── Server2
│   ├── Differential
│   └── Full
└── Server3
    ├── Differential
    └── Full
```

### Folder Structure Requirements
- **Root Folders:** Each section contains one or more root backup folders
- **Server Subfolders:** Each server has its own subfolder under root
- **Backup Type Folders:** Each server folder contains exactly 2 subfolders (Differential and Full)
- **Naming Convention:** Folders should follow consistent naming conventions

### Structure Validation
- **Subfolder Count:** Validates each server folder has exactly 2 subfolders
- **Folder Organization:** Ensures proper folder organization and hierarchy
- **Error Reporting:** Reports folders that don't meet structure requirements
- **Configuration Generation:** Generates configuration only for valid folder structures

## Important Warnings

### ⚠️ Google Drive API Dependencies
- **OAuth Configuration:** Requires valid OAuth credentials configured in OAuthFile entity
- **API Access:** Requires Google Drive API access and proper authentication
- **Network Connectivity:** Requires stable internet connection for Google Drive access
- **API Limits:** Subject to Google Drive API rate limits and quotas

### ⚠️ Folder Structure Requirements
- **Strict Structure:** Expects specific folder structure (2 subfolders per server)
- **Structure Validation:** Fails if folder structures don't match expectations
- **Folder Access:** Requires read access to all specified Google Drive folders
- **Folder Existence:** All specified folder IDs must exist and be accessible

### ⚠️ Configuration and Data Dependencies
- **TaskSchedule Entity:** Only works with TaskSchedule entities
- **OAuthFile Dependency:** Requires valid OAuthFile entity for authentication
- **Folder ID Accuracy:** Folder IDs must be accurate and accessible
- **Parameter Configuration:** Requires proper parameter configuration for operation

### ⚠️ Error Handling and Recovery
- **Authentication Failures:** May fail due to expired or invalid OAuth credentials
- **Network Issues:** May fail due to network connectivity problems
- **Folder Structure Errors:** Will report errors for invalid folder structures
- **Configuration Errors:** May fail due to invalid parameter configuration

## Best Practices

### OAuth and Authentication Management
- **Credential Maintenance:** Regularly maintain and refresh OAuth credentials
- **Security Monitoring:** Monitor OAuth credential usage and access
- **Authentication Testing:** Test OAuth authentication before backup operations
- **Credential Backup:** Maintain backup copies of OAuth configuration

### Folder Organization and Management
- **Consistent Structure:** Maintain consistent folder structures across all backups
- **Naming Conventions:** Use consistent naming conventions for backup folders
- **Access Management:** Ensure proper access permissions for backup folders
- **Structure Documentation:** Document folder structure requirements and conventions

### Configuration Management
- **Regular Updates:** Regularly update folder configurations as infrastructure changes
- **Configuration Testing:** Test configuration changes in development environments first
- **Version Control:** Maintain version control for backup configurations
- **Documentation:** Document configuration changes and updates

### Monitoring and Maintenance
- **Regular Execution:** Run folder structure preparation regularly
- **Error Monitoring:** Monitor for folder structure errors and inconsistencies
- **Performance Monitoring:** Monitor Google Drive API usage and performance
- **Alert Configuration:** Configure alerts for backup configuration failures

### Integration and Automation
- **Scheduled Execution:** Schedule regular execution through task schedules
- **Integration Testing:** Test integration with backup validation processes
- **Automation Workflows:** Integrate with automated backup workflows
- **Error Recovery:** Implement error recovery procedures for failed preparations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EANamaCloudBackupPrepare`

**Related Actions:**
- [EACheckDailyBackupOnGoogleDrive](EACheckDailyBackupOnGoogleDrive.md) - Uses output from this action for backup validation


</div>

