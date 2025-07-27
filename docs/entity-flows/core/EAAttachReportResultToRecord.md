---
title: EAAttachReportResultToRecord
module: core
---


<div class='entity-flows'>

# EAAttachReportResultToRecord

**This document was generated using Claude.ai**

## Overview

This entity flow generates reports automatically and attaches the resulting files as attachments to the current entity record. It handles parameter mapping, report execution, file generation, and attachment storage in a single operation, making it ideal for automated document generation workflows.

## When This Action Runs

- **Trigger:** Manual execution or automated workflows requiring document generation
- **Target:** Any entity with attachment fields that needs auto-generated reports
- **Scope:** Single report generation and attachment per execution
- **Purpose:** Automated document creation and storage for audit trails, confirmations, or compliance

## How It Works

### 1. Report Resolution
- **Report Lookup:** Finds report definition by ID or code in the system
- **Validation:** Ensures report exists and is accessible
- **Definition Loading:** Loads complete report configuration and parameters
- **Error Handling:** Fails gracefully if report is not found

### 2. Parameter Mapping
- **Source Evaluation:** Uses field expressions to extract values from the current entity
- **Parameter Creation:** Maps entity data to report parameters using field map syntax
- **Dynamic Values:** Supports complex expressions including related entity fields
- **Type Handling:** Automatically handles different data types and conversions

### 3. Report Execution
- **Question Fields:** Creates FilledQuestionField objects for report parameters
- **Report Running:** Executes report with provided parameters
- **Format Generation:** Produces output in specified format (PDF, DOCX, etc.)
- **Temporary Files:** Manages temporary file creation and cleanup

### 4. Attachment Creation
- **File Metadata:** Sets filename based on report code and output format
- **Large Data Object:** Creates LargeData attachment with unique ID
- **File Content:** Reads generated report file into attachment
- **Field Assignment:** Attaches file to specified entity attachment field

### 5. Cleanup Process
- **Temporary File Removal:** Deletes temporary report files after attachment
- **Memory Management:** Cleans up resources used during report generation
- **Error Recovery:** Handles cleanup even if errors occur during processing

## Parameters

### Parameter 1: Report ID or Code
- **Type:** Text (Required)
- **Format:** Report identifier or unique code
- **Purpose:** Specifies which report to generate
- **Lookup:** Can use either binary ID or text code

**Examples:**
- `INVOICE_REPORT` - Report code
- `CUSTOMER_STATEMENT` - Named report
- `FINANCIAL_SUMMARY` - Business report code

### Parameter 2: Save To Attachment Field ID
- **Type:** Text (Required)
- **Format:** Valid attachment field identifier
- **Purpose:** Specifies where to store the generated report file
- **Field Type:** Must be an attachment field (LargeData type)

**Examples:**
- `attachment1` - Primary attachment field
- `attachment2` - Secondary attachment field

### Parameter 3: Output Format
- **Type:** Text (Required)
- **Format:** One of the supported output formats
- **Purpose:** Determines the file format of the generated report
- **Case Insensitive:** Format names are case-insensitive

**Supported Formats:**
- `PDF` - Portable Document Format (most common)
- `DOCX` - Microsoft Word document
- `XLSX` - Microsoft Excel spreadsheet
- `TXT` - Plain text file
- `PPTX` - Microsoft PowerPoint presentation
- `ODS` - OpenDocument Spreadsheet
- `ODT` - OpenDocument Text
- `RTF` - Rich Text Format
- `XLS` - Legacy Excel format

**Note:** HTML and JasperPrint formats are not supported for attachments.

### Parameter 4: Parameter Sources
- **Type:** Text (Optional)
- **Format:** Field mapping expressions (parameterName=sourceExpression)
- **Purpose:** Maps entity data to report parameters
- **Syntax:** Uses same pattern as EAGenerateEntityFromEntityAction

**Examples:**
```
customerId=customer.id
fromDate=startDate
toDate=endDate
amount=money.total
companyName=customer.name1
```

**Advanced Expressions:**
```
// Related entity fields
supplierName=supplier.name1
branchCode=branch.code

// Calculated values  
totalAmount=money.total
currencyCode=money.currency

// Date fields
reportDate=creationDate
dueDate=valueDate
```

## Database Tables Affected

### Primary Tables
- **Target Entity:** Entity receiving the report attachment
  - Specified attachment field updated with generated report file
  - File stored as LargeData object with metadata
  - Filename includes report code and format extension

### Report System Tables
- **ReportDefinition:** Report configuration and parameters read

## Business Use Cases

### 1. Document Automation
- **Invoice Generation:** Auto-generate and attach PDF invoices to sales orders
- **Contract Documents:** Create contract PDFs attached to agreement records
- **Compliance Reports:** Generate regulatory reports attached to submissions
- **Financial Statements:** Create period-end reports attached to accounting periods

### 2. Workflow Integration
- **Approval Workflows:** Generate summary documents for approval processes
- **Notification Documents:** Create attachments for email notifications
- **Audit Documentation:** Generate audit trail reports attached to transactions
- **Backup Documents:** Create document copies for record keeping

### 3. Customer Communication
- **Statements:** Generate customer statements attached to account records
- **Confirmations:** Create order confirmations attached to sales documents
- **Certificates:** Generate certificates attached to qualification records
- **Reports:** Create custom reports attached to project records

## Important Warnings

### ⚠️ Report Dependencies
- **Report Existence:** Action fails if specified report ID/code doesn't exist
- **Parameter Matching:** Report parameters must match field map parameter names
- **Access Permissions:** User must have access to run the specified report
- **Report Functionality:** Report must be properly configured and tested

### ⚠️ File Management
- **Storage Space:** Large reports consume significant disk space
- **File Size Limits:** Very large reports may exceed attachment size limits
- **Temporary Files:** Temporary files are cleaned up but require disk space during processing
- **Concurrent Execution:** Multiple simultaneous executions may impact performance

### ⚠️ Attachment Field Requirements
- **Field Type:** Target field must be a valid attachment field (LargeData type)
- **Field Existence:** Specified attachment field must exist on the entity
- **Overwrite Behavior:** Existing attachments in the field will be replaced
- **Field Access:** User must have permission to modify the attachment field

### ⚠️ Performance Considerations
- **Report Complexity:** Complex reports may take significant time to generate
- **Large Data Sets:** Reports with large data sets may cause timeouts
- **Resource Usage:** Report generation consumes CPU and memory resources
- **Network Impact:** Large attachments may impact system performance

### ⚠️ Error Handling
- **Report Failures:** Report generation errors will cause action failure
- **Parameter Errors:** Invalid parameter mappings will cause failures
- **File System Errors:** Disk space or permission issues may cause failures
- **Format Compatibility:** Some reports may not support all output formats

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAttachReportResultToRecord`

**Related Actions:**
- [EAPrintReportToPrinter](EAPrintReportToPrinter.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)


</div>

