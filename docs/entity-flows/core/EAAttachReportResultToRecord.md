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
4. Creates or updates attachment in specified entity field
5. Sets attachment filename using report code and output format (e.g., `INVOICE_REPORT.pdf`)
6. Optionally runs for each detail line when configured
7. Cleans up temporary files after processing

## Key Parameters

- **Parameter 1:** Report ID or Code (Required) - Report identifier or unique code
- **Parameter 2:** Save To Attachment Field ID (Required) - Must be attachment field (LargeData type)
- **Parameter 3:** Output Format (Required) - PDF, DOCX, XLSX, TXT, PPTX, ODS, ODT, RTF, XLS
- **Parameter 4:** Parameter Sources (Optional) - Field mapping expressions
- **Parameter 5:** Custom File Name Template (Optional) - Template expression for custom file naming
- **Parameter 6:** Run On Detail (Optional) - Detail collection ID to run report for each line (e.g., details, lines, paymentMethods)

### Parameter Examples:

#### Basic Usage:
```
Report: INVOICE_REPORT
Field: attachment1
Format: PDF
Parameters:
  customerId=customer.id
  fromDate=startDate
  amount=money.total
  fromDate=$today.$yearStart
  toDate=$today
```

#### With Custom File Naming:
```
Report: INVOICE_REPORT
Field: attachment1
Format: PDF
Parameters:
  customerId=customer.id
  amount=money.total
Custom File Name: Invoice_{code}_{customer.name}_{$today.$toStringYYYYMMDD}
```

#### Running for Each Detail Line:
```
Report: LINE_REPORT
Field: details.attachment1
Format: PDF
Parameters:
  lineId=details.id
  itemCode=details.item.itemCOde
  quantity=details.quantity
Run On Detail: details
```

### Detail Processing Features:
- When **Run On Detail** is specified, the action iterates through each item in the detail collection
- The attachment field must be a sub-field of the specified detail (e.g., `lines.reportAttachment` when running on `lines`)
- Each detail line has access to its own context through `$line` expressions

### Attachment File Naming:
- **Default Naming:** Files are automatically named using the pattern: `[ReportCode].[format]`
  - Example: A report with code `INVOICE_REPORT` exported as PDF becomes `INVOICE_REPORT.pdf`
- **Custom Naming:** Use Parameter 5 to specify a template expression for dynamic file names
  - Template expressions can reference entity fields and use complex rendering
  - The appropriate file extension is automatically appended if not included
  - Example: `Invoice_{code}_{customer.code}` becomes `Invoice_INV001_CUST123.pdf`
- The filename is set on the attachment's `fileName` field for proper identification

## Database Tables Affected

- **Target Entity** - Attachment field updated with generated report file
- **ReportDefinition** - Report configuration and parameters read

## Important Warnings

### ⚠️ Report Requirements
- Report must exist and be accessible by user
- Target field must be valid attachment field (LargeData type)
- Existing attachments are updated rather than replaced (preserves attachment ID)
- When using Run On Detail, attachment field must be a sub-field of the detail collection

### ⚠️ Performance Impact
- Complex reports may take significant time
- Large reports consume disk space and memory
- Multiple simultaneous executions may impact performance
- Running on detail collections multiplies execution time by number of detail lines

## Related Actions

- [EAPrintReportToPrinter](EAPrintReportToPrinter.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAttachReportResultToRecord`

</div>

