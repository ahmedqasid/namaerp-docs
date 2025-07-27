---
title: EAExportAttachments
module: core
---


<div class='entity-flows'>

# EAExportAttachments

**This document was generated using Claude.ai**

## Overview

This entity flow exports file attachments from entity attachment fields to the server file system. It provides flexible options for organizing exported files, including custom naming schemes, folder structures, and handling of existing files.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for attachment export
- **Target:** Entities with attachment fields containing files to be exported
- **Purpose:** Export entity attachments to server file system for backup, processing, or external access
- **Timing:** Typically used for data archival, backup operations, or file processing workflows

## How It Works

### 1. Attachment Field Processing
- **Field Identification:** Identifies specified attachment fields on the entity
- **Multi-Field Support:** Processes multiple attachment fields in single operation
- **Field Validation:** Validates that specified fields exist and contain attachment data
- **Collection Handling:** Handles both single attachments and attachment collections

### 2. File System Organization
- **Directory Creation:** Creates target directories if they don't exist
- **Folder Structure:** Optionally organizes files by entity type in separate folders
- **Path Management:** Manages file paths and directory structures automatically
- **Nested Directory Support:** Supports nested directory structures for organization

### 3. File Naming Strategy
- **Flexible Naming:** Configurable file naming including field names, entity codes, and original filenames
- **Name Components:** Combines various components to create unique file names
- **Collision Avoidance:** Provides options for handling file name collisions
- **Custom Patterns:** Supports custom file naming patterns for organization

### 4. File Export Process
- **Data Streaming:** Streams attachment data directly to file system
- **Efficient Transfer:** Uses efficient file transfer mechanisms
- **Overwrite Control:** Configurable handling of existing files
- **Error Recovery:** Handles file system errors gracefully

### 5. Conflict Resolution
- **Existing File Handling:** Configurable behavior for existing files
- **Error Reporting:** Reports conflicts and errors clearly
- **Overwrite Options:** Option to replace existing files or report errors
- **Safe Operation:** Prevents accidental data loss through conflict detection

## Key Features

### Flexible File Organization
- **Custom Directory Structure:** Organize files by entity type, field, or custom patterns
- **Configurable Naming:** Control file naming with multiple component options
- **Multi-Field Export:** Export multiple attachment fields in single operation
- **Batch Processing:** Process multiple entities efficiently

### Attachment Field Support
- **Multiple Field Types:** Support various attachment field types
- **Collection Fields:** Handle attachment collections with multiple files
- **Large File Support:** Handle large attachment files efficiently
- **Binary Data:** Support all binary file types and formats

### File System Management
- **Automatic Directory Creation:** Create target directories automatically
- **Path Validation:** Validate file system paths before export
- **Permission Handling:** Handle file system permissions appropriately
- **Cross-Platform Support:** Work across different operating systems

## Parameters

### Parameter 1: Folder Path (on the server)
- **Type:** Text (Required)
- **Format:** Absolute or relative path to target export directory
- **Purpose:** Specifies where exported attachment files will be saved
- **Requirements:** Path must be writable by application server

**Path Examples:**
- `/var/exports/attachments` - Unix absolute path
- `C:\Exports\Attachments` - Windows absolute path
- `exports/attachments` - Relative path from application directory
- `\\server\share\exports` - Network share path

### Parameter 2: Attachment Field Names
- **Type:** Text (Optional)
- **Format:** Comma-separated list of attachment field names
- **Purpose:** Specifies which attachment fields to export
- **Default:** "mainFile" if not specified

**Field Name Examples:**
- `mainFile` - Default main attachment field
- `attachment1,attachment2,attachment3` - Multiple attachment fields
- `document,invoice,receipt` - Custom attachment field names
- `mainFile,additionalDocs` - Mix of default and custom fields

### Parameter 3: Include Attachment Field Name in File
- **Type:** Boolean (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to include the field name as part of the exported file name
- **Default:** false

### Parameter 4: Do not add entity code to file name
- **Type:** Boolean (Optional)
- **Values:** "true" or "false"
- **Purpose:** When true, excludes entity code from exported file names
- **Default:** false (entity code is included)

### Parameter 5: Do not add attachment file name to file path
- **Type:** Boolean (Optional)
- **Values:** "true" or "false"
- **Purpose:** When true, excludes original attachment filename from exported file name
- **Default:** false (original filename is included)

### Parameter 6: Do not add each entity in a separate folder
- **Type:** Boolean (Optional)
- **Values:** "true" or "false"
- **Purpose:** When true, all files are exported to same directory instead of entity-specific folders
- **Default:** false (separate folders created for each entity type)

### Parameter 7: Error if attachment exists in the folder before
- **Type:** Boolean (Optional)
- **Values:** "true" or "false"
- **Purpose:** When true, reports error if target file already exists instead of overwriting
- **Default:** false (existing files are overwritten)

## Database Tables Affected

### Entity Attachment Fields
- **LargeData Tables:** Reads attachment data from entity attachment fields
- **Attachment Metadata:** Accesses attachment filename and metadata
- **Binary Data:** Streams binary attachment data for export
- **Field Collections:** Processes attachment collections if applicable

### No Database Modifications
This action only reads attachment data and does not modify any database tables.

## Business Use Cases

### 1. Data Backup and Archival
- **Attachment Backup:** Export entity attachments for backup purposes
- **Data Archival:** Archive old attachments to external storage systems
- **Compliance Backup:** Create compliance backups of important documents
- **Disaster Recovery:** Export attachments for disaster recovery planning

### 2. Document Processing
- **External Processing:** Export documents for external processing systems
- **OCR Processing:** Export documents for optical character recognition
- **Document Conversion:** Export files for format conversion processes
- **Content Analysis:** Export files for content analysis and indexing

### 3. Integration and Migration
- **System Migration:** Export attachments during system migrations
- **External System Integration:** Provide files to external systems
- **Data Exchange:** Export files for data exchange with partners
- **Legacy System Support:** Export files for legacy system compatibility

### 4. Reporting and Analysis
- **Report Generation:** Export attachments for report generation
- **File Analysis:** Export files for analysis and processing
- **Content Management:** Move files to content management systems
- **Quality Assurance:** Export files for quality assurance processes

## File Naming Examples

### Default Naming (all options enabled)
```
fieldName-entityCode-originalFileName.ext
Example: mainFile-INV001-receipt.pdf
```

### Entity Code Only
```
entityCode-originalFileName.ext
Example: INV001-receipt.pdf
```

### Original Filename Only
```
originalFileName.ext
Example: receipt.pdf
```

### Field Name and Original Filename
```
fieldName-originalFileName.ext
Example: mainFile-receipt.pdf
```

## Directory Structure Examples

### Separate Entity Folders
```
/exports/
├── SalesInvoice/
│   ├── mainFile-INV001-receipt.pdf
│   └── attachment1-INV002-contract.docx
└── PurchaseOrder/
    ├── mainFile-PO001-specification.pdf
    └── mainFile-PO002-quote.xlsx
```

### Single Directory
```
/exports/
├── mainFile-INV001-receipt.pdf
├── attachment1-INV002-contract.docx
├── mainFile-PO001-specification.pdf
└── mainFile-PO002-quote.xlsx
```

## Important Warnings

### ⚠️ File System Requirements
- **Path Permissions:** Export path must be writable by application server
- **Disk Space:** Ensure sufficient disk space for exported attachments
- **Path Validity:** Ensure export paths are valid for the operating system
- **Network Access:** Network paths must be accessible from application server

### ⚠️ File Naming Conflicts
- **Name Collisions:** Multiple files may have same generated name
- **Overwrite Risk:** Existing files may be overwritten unless conflict detection enabled
- **Special Characters:** Attachment filenames may contain characters invalid for file system
- **Length Limitations:** Generated file names may exceed file system length limits

### ⚠️ Performance Considerations
- **Large Files:** Large attachments may impact server performance during export
- **Multiple Files:** Exporting many attachments may take significant time
- **Disk I/O:** File export operations may impact server disk I/O performance
- **Memory Usage:** Large file exports may consume significant memory

### ⚠️ Security and Access Control
- **File Access:** Exported files may be accessible to server administrators
- **Sensitive Data:** Consider security implications of exporting sensitive attachments
- **Path Traversal:** Ensure export paths don't allow unauthorized file system access
- **File Permissions:** Exported files inherit server file system permissions

## Best Practices

### Path and Organization
- **Consistent Paths:** Use consistent export path structures across environments
- **Date-Based Organization:** Consider including dates in export paths for time-based organization
- **Entity Separation:** Use separate folders for different entity types for better organization
- **Backup Verification:** Verify exported files after export operations

### File Naming Strategy
- **Unique Names:** Design naming strategy to minimize file name collisions
- **Meaningful Names:** Include meaningful components in file names for identification
- **Character Safety:** Avoid special characters that may cause file system issues
- **Length Management:** Keep generated file names within reasonable length limits

### Performance and Monitoring
- **Batch Size Control:** Export attachments in manageable batches for large operations
- **Progress Monitoring:** Monitor export progress for large operations
- **Error Handling:** Implement appropriate error handling and retry logic
- **Resource Monitoring:** Monitor server resources during export operations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExportAttachments`


</div>

