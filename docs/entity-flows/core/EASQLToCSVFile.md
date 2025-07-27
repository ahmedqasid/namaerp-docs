---
title: EASQLToCSVFile
module: core
---


<div class='entity-flows'>

# EASQLToCSVFile

**This document was generated using Claude.ai**

## Overview

Executes a SQL query and exports results to CSV file format. Supports saving to local file system or remote servers via FTP/FTPS/SFTP protocols. Includes date formatting capabilities and dynamic path generation using Tempo templates.

## When This Action Runs

Manual execution for generating data exports, reports, or automated file transfers to external systems requiring CSV format data.

## How It Works

1. **Executes SQL query** - Runs the provided SQL query against the database
2. **Processes results** - Formats data including special date formatting from column aliases
3. **Generates CSV content** - Converts query results to CSV format with specified delimiter
4. **Renders file path** - Uses Tempo template to generate dynamic file path
5. **Saves file** - Writes CSV to local file system or uploads to remote server

## Parameters

**Parameter 1:** SQL Statement (Required) - SQL query to execute and export

Example Query:
```sql
select code,creationDate [creationDate#ddMMyyy HH:mm:ss] from Employee
```

**Parameter 2:** Delimiter (Required) - CSV field delimiter (e.g., `,` or `;` or `|`)
**Parameter 3:** Path Tempo (Required) - Dynamic file path template using Tempo syntax
**Parameter 4:** Headers Line (Optional) - CSV column headers (uses SQL column names if empty)
**Parameter 5:** Protocol (Optional) - Transfer protocol: `local`, `ftp`, `ftps`, or `sftp` (default: local)
**Parameter 6:** Server URL (Optional) - Remote server address (required for FTP protocols)
**Parameter 7:** Server Port (Optional) - Server port (21 for FTP, 990 for FTPS, 22 for SFTP)
**Parameter 8:** Server User (Optional) - Username for remote server authentication
**Parameter 9:** Server Password (Optional) - Password for remote server authentication

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the SQL query
- **File System** - Creates CSV files on local or remote file systems

## Important Warnings

### ⚠️ SQL Query Requirements
- Query must be valid SQL and return data suitable for CSV export
- Large result sets may cause memory and performance issues
- Use proper WHERE conditions to limit result size when appropriate

### ⚠️ File System Access
- Local protocol requires write permissions to target directory
- Remote protocols require network connectivity and valid credentials
- File paths are created automatically including parent directories

### ⚠️ Date Formatting
- Column aliases with `#` syntax enable custom date formatting
- Date format patterns must be valid Java SimpleDateFormat patterns
- Only applies to Date type columns in query results

### ⚠️ Remote Server Configuration
- FTP/FTPS/SFTP require proper server configuration and credentials
- Network firewalls may block remote file transfer protocols
- Credential security considerations for password parameters

### ⚠️ Performance Considerations
- Large CSV files may consume significant memory during generation
- Remote file transfers add network latency to processing time
- File operations may fail due to disk space or permission issues

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASQLToCSVFile`

**Related Actions:**
- [EASQLToCSVEmail](EASQLToCSVEmail.md) - CSV generation with email delivery


</div>