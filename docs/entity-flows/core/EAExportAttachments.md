---
title: EAExportAttachments
module: core
---


<div class='entity-flows'>

# EAExportAttachments

**This document was generated using Claude.ai**

## Overview

Exports file attachments from entity attachment fields to server file system with flexible naming and organization options.

## When This Action Runs

Manual or automated execution for attachment export, data archival, backup operations, and file processing workflows.

## How It Works

1. **Identifies attachment fields** on entity and validates field existence
2. **Creates target directories** and organizes folder structure
3. **Generates file names** using configurable naming components
4. **Streams attachment data** to file system with conflict handling
5. **Reports export results** with error handling
- **Permission Handling:** Handle file system permissions appropriately
- **Cross-Platform Support:** Work across different operating systems

## Parameters

**Parameter 1:** Folder Path (Required) - Target export directory path

**Parameter 2:** Attachment Field Names (Optional) - Comma-separated field names (default: "mainFile")

**Parameter 3:** Include Attachment Field Name in File (Optional) - "true"/"false" to include field name

**Parameter 4:** Do not add entity code to file name (Optional) - "true"/"false" to exclude entity code

**Parameter 5:** Do not add attachment file name to file path (Optional) - "true"/"false" to exclude original filename

**Parameter 6:** Do not add each entity in a separate folder (Optional) - "true"/"false" for single directory

**Parameter 7:** Error if attachment exists in the folder before (Optional) - "true"/"false" for conflict handling

## Database Tables Affected

- **Entity Attachment Fields** - Read-only access to attachment data and metadata

## Important Warnings

### ⚠️ File System
- Export path must be writable with sufficient disk space
- Large attachments may impact server performance during export
- File naming conflicts may occur without proper configuration

### ⚠️ Security
- Exported files may be accessible to server administrators
- Consider security implications of exporting sensitive attachments

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExportAttachments`


</div>