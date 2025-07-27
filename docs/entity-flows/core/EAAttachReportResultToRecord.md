---
title: EAAttachReportResultToRecord
module: core
---

<div class='entity-flows'>

# EAAttachReportResultToRecord

**This document was generated using Claude.ai**

## Overview

Generates reports automatically and attaches the resulting files as attachments to the current entity record. Handles parameter mapping, report execution, file generation, and attachment storage in a single operation.

## When This Action Runs

Manual execution or automated workflows requiring document generation on any entity with attachment fields.

## How It Works

1. Finds report definition by ID or code
2. Maps entity data to report parameters using field expressions
3. Executes report and generates output in specified format
4. Creates attachment and stores file in specified entity field
5. Cleans up temporary files after processing

## Key Parameters

- **Parameter 1:** Report ID or Code (Required) - Report identifier or unique code
- **Parameter 2:** Save To Attachment Field ID (Required) - Must be attachment field (LargeData type)
- **Parameter 3:** Output Format (Required) - PDF, DOCX, XLSX, TXT, PPTX, ODS, ODT, RTF, XLS
- **Parameter 4:** Parameter Sources (Optional) - Field mapping expressions

### Parameter Examples:
```
Report: INVOICE_REPORT
Field: attachment1
Format: PDF
Parameters:
  customerId=customer.id
  fromDate=startDate
  amount=money.total
```

## Database Tables Affected

- **Target Entity** - Attachment field updated with generated report file
- **ReportDefinition** - Report configuration and parameters read

## Important Warnings

### ⚠️ Report Requirements
- Report must exist and be accessible by user
- Target field must be valid attachment field (LargeData type)
- Existing attachments will be replaced

### ⚠️ Performance Impact
- Complex reports may take significant time
- Large reports consume disk space and memory
- Multiple simultaneous executions may impact performance

## Related Actions

- [EAPrintReportToPrinter](EAPrintReportToPrinter.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAttachReportResultToRecord`

</div>

