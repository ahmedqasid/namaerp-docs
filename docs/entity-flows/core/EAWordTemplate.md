---
title: EAWordTemplate
module: core
---


<div class='entity-flows'>

# EAWordTemplate

**This document was generated using Claude.ai**

## Overview

Processes Microsoft Word document templates by replacing placeholders with entity data. Reads a template document, substitutes template variables with actual values, handles table loops for detail collections, and generates a final document with entity-specific content.

## When This Action Runs

Manual execution for generating entity-specific documents like invoices, contracts, reports, certificates, or any Word document that needs dynamic content based on entity data.

## How It Works

1. **Reads template** - Loads Word document from entity flow attachment or specified field
2. **Processes placeholders** - Finds and replaces template variables in format `@#fieldName#@`
3. **Handles table loops** - Processes repeating sections for detail collections (invoiceLines, etc.)
4. **Generates document** - Creates final Word document with populated data
5. **Applies protection** - Optionally makes document read-only with password protection
6. **Saves result** - Stores generated document in specified attachment field

## Parameters

**Parameter 1:** Save To Field (Required) - Target attachment field to save generated document (e.g., "attachment", "generatedDoc")

**Parameter 2:** Read Attachment From Field (Optional) - Source field for template document (e.g., "customer.remarks")

**Parameter 3:** Do Not Make Document Read-Only (Optional) - "true" to keep document editable, "false" for read-only (default: false)

**Parameter 4:** Generated File Name Tempo (Optional) - Template for output filename using entity data

## Template Syntax

### Basic Field Replacement
```
@#fieldName#@
@#customer.name1#@  
@#valueDate#@
@#moeny.netValue#@
```

## Database Tables Affected

- **Entity Attachment Fields** - Reads template documents and saves generated documents
- **All Entity Data** - Accesses entity fields and related data for template population

## Important Warnings

### ⚠️ Template Document Requirements
- Template must be valid Microsoft Word document (.docx format)
- Template source can be entity flow attachment or specified field
- Document must be accessible and readable
- Large templates may cause memory issues during processing

### ⚠️ Template Syntax Requirements
- Field placeholders use `@#fieldName#@` format exactly
- Field names are case-sensitive and must match entity structure
- Invalid field references will appear as empty in output
- Complex expressions follow Tempo rendering syntax


### ⚠️ Document Protection and Security
- Generated documents are read-only by default with random password
- Read-only protection prevents unauthorized editing
- Password is randomly generated and not stored
- Use Parameter 3 to disable protection if editing is needed


### ⚠️ File Handling and Storage
- Generated documents replace existing content in target field
- Original template document is not modified
- File naming follows Parameter 4 template or uses original name
- Large generated documents may exceed attachment size limits

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWordTemplate`


</div>