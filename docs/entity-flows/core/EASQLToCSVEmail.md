---
title: EASQLToCSVEmail
module: core
---


<div class='entity-flows'>

# EASQLToCSVEmail

**This document was generated using Claude.ai**

## Overview

Executes a SQL query, exports results to CSV format, and emails the CSV file as an attachment. Uses Tempo templates for dynamic content generation including attachment names, email subjects, and body text.

## When This Action Runs

Manual execution for generating and emailing data exports, reports, or data extracts to specified recipients with CSV attachments.

## How It Works

1. **Executes SQL query** - Runs the provided SQL query against the database
2. **Generates CSV content** - Converts query results to CSV format with specified delimiter and headers
3. **Creates temporary file** - Saves CSV content to a temporary file with dynamic naming
4. **Renders email content** - Uses Tempo templates to generate subject and body text
5. **Sends email** - Creates and queues email with CSV attachment for delivery

## Parameters

**Parameter 1:** SQL Statement (Required) - SQL query to execute and export

Example Query:
```sql
select code,creationDate [creationDate#ddMMyyy HH:mm:ss] from Employee
```

**Parameter 2:** Delimiter (Required) - CSV field delimiter (e.g., `,` or `;` or `|`)

**Parameter 3:** Attachment Name Tempo (Required) - Dynamic filename template using Tempo syntax

**Parameter 4:** Headers Line (Optional) - CSV column headers (uses SQL column names if empty)

**Parameter 5:** Send To Emails (Optional) - Comma-separated recipient email addresses

**Parameter 6:** Subject Tempo (Required) - Email subject template using Tempo syntax

**Parameter 7:** Body Tempo (Required) - Email body template using Tempo syntax

**Parameter 8:** Preferred Sender ID (Optional) - Sender configuration ID

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the SQL query
- **PendingTask** - Creates email task for delivery queue
- **Temporary Files** - Creates temporary CSV files for attachment

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASQLToCSVEmail`

**Related Actions:**
- [EASQLToCSVFile](EASQLToCSVFile.md) - CSV file generation without email


</div>