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

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASQLToCSVFile`

**Related Actions:**
- [EASQLToCSVEmail](EASQLToCSVEmail.md) - CSV generation with email delivery


</div>