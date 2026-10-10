---
title: EASQLToCSVAttachmentField
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASQLToCSVAttachmentField

## Overview

Runs a SQL query and stores the result as a delimited text (CSV) file inside an attachment field of the record being saved. It is the sibling of [EASQLToCSVFile](EASQLToCSVFile.md), which writes the same file to a folder or an FTP server, and [EASQLToCSVEmail](EASQLToCSVEmail.md), which emails it. Use this one when the file should travel with the record — for example a daily sales export kept on a record so anyone can download it later from the record itself.

## When This Action Runs

It changes a field of the record it runs on, so attach it to an event that runs **before the record is saved**. The file then becomes part of the saved record.

## How It Works

1. **Runs the query** - the SQL in parameter 1 is executed. It can refer to the current record's fields with `{fieldName}`, as in other query-based actions.
2. **Formats dates** - a column whose alias contains `#` is treated as a date column and formatted with the pattern after the `#` (for example `[creationDate#dd-MM-yyyy HH:mm:ss]`).
3. **Builds the text** - writes the header line (if given), then one line per row with the values separated by the delimiter, then the footer line (if given). Numbers are written in plain form (no scientific notation). The file is saved as UTF-8.
4. **Names the file** - the file name comes from parameter 3, a Tempo template evaluated on the current record.
5. **Stores it** - writes the file into the attachment field named in parameter 6. If the field already holds a file, its content and name are replaced; if it is empty, a new attachment is created.

## Parameters

**Parameter 1:** SQL Statement (ex. select code,creationDate [creationDate#ddMMyyy HH:mm:ss] from Employee ) (Required) - The query whose rows become the file's lines.

**Parameter 2:** Delimiter (Required) - The text placed between values, for example `,` or `;` or `|`.

**Parameter 3:** Attachment Name Tempo (ex. OUTLET1001_{$currentDate.$toStringDDMMMYYYY}_daily_{$currentDateTime.$toStringDDMMMYYYYHH24MISS}.txt) (Required) - The file name, as a Tempo template. Include the extension you want (`.csv`, `.txt`).

**Parameter 4:** Headers Line (Optional) - A line written at the top of the file. When empty, the file has no header line — the query's column names are **not** written automatically.

**Parameter 5:** Footer Line (Optional) - A line written at the end of the file.

**Parameter 6:** Save To Attachment Field ID (Required) - The field id of the attachment field that receives the file, for example `attachment` on an Employee record.

## Example

On an Employee entity flow, store a one-line summary file in the employee's attachment field:

- Parameter 1: `select code, creationDate [creationDate#dd-MM-yyyy] from Employee where id = {id}`
- Parameter 2: `,`
- Parameter 3: `{code}_summary.csv`
- Parameter 4: `Code,Created On`
- Parameter 6: `attachment`

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASQLToCSVAttachmentField`

## Related Actions

- [EASQLToCSVFile](EASQLToCSVFile.md) - same file, saved to a folder or FTP/SFTP server
- [EASQLToCSVEmail](EASQLToCSVEmail.md) - same file, sent by email


</div>
