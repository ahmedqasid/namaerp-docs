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
4. **Replaces image markers** - Inserts images from binary fields using `image(fieldName)` syntax
5. **Generates document** - Creates final Word document with populated data
6. **Applies protection** - Optionally makes document read-only with password protection
7. **Saves result** - Stores generated document in specified attachment field

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

### Image Insertion
Insert images from binary/attachment fields into the document:
```
image(fieldName)
image(customer.logo)
image(productImage)
```

The system will:
- Extract the image data from the specified field (must be a LargeData/attachment field)
- Replace the marker with the actual image in the document
- Automatically detect image format (PNG, JPEG, GIF, BMP, TIFF)
- Size the image to 100x100 EMU (default size)

::: tip Image Field Requirements
The field referenced in `image(fieldName)` must be a binary/attachment field containing image data. Supported formats: PNG, JPEG, GIF, BMP, TIFF.
:::


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWordTemplate`


</div>