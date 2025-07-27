---
title: EAPrintReportToPrinter
module: core
---


<div class='entity-flows'>

# EAPrintReportToPrinter

**This document was generated using Claude.ai**

## Overview

Prints predefined reports directly to a specified printer using Jasper Reports. Unlike form printing, this action generates standalone reports using report definitions with default question field values and sends output directly to the printer.

## When This Action Runs

Manual execution for printing predefined reports directly to physical printers without user preview or PDF generation.

## How It Works

1. **Locates report definition** - Finds ReportDefinition by the specified report code
2. **Prepares question fields** - Fills question fields with default values and processes hidden questions
3. **Generates report** - Runs Jasper report with prepared question field data
4. **Prints to printer** - Sends generated report directly to specified printer and cleans up temporary files

## Parameters

**Parameter 1:** Printer Name (Required) - Name of the network or local printer to send output to
**Parameter 2:** Report Code (Required) - Business code of the ReportDefinition to print

## Database Tables Affected

- **ReportDefinition** - Reads report configuration, metadata, and question field definitions
- **Temporary Print Records** - Creates and deletes temporary print job records

## Important Warnings

### ⚠️ Report Requirements
- Report code must exist and be a valid ReportDefinition business code
- Report must be properly configured with question fields and metadata
- Reports print with default question field values only

### ⚠️ Printer Requirements
- Printer name must exactly match configured network/local printer name
- Printer must be accessible from the server running the application
- Print jobs sent directly without user preview or cancellation option

### ⚠️ Processing Limitations
- No user input for question fields - uses defaults only
- No entity-specific data integration (unlike form printing)
- Temporary files are automatically cleaned up after printing

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPrintReportToPrinter`


</div>