---
title: EAPrintFormToPrinter
module: core
---


<div class='entity-flows'>

# EAPrintFormToPrinter

**This document was generated using Claude.ai**

## Overview

Prints entity forms directly to a specified printer using Jasper Reports. Automatically selects the most appropriate form for the entity or uses a specified form code, increments print count, and sends output to the configured printer.

## When This Action Runs

Manual execution for printing entity forms directly to physical printers without user preview or PDF generation.

## How It Works

1. **Locates form definition** - Finds ReportDefinition by code (if provided) or auto-selects most appropriate form for entity type
2. **Validates form availability** - Ensures form exists and is compatible with the entity
3. **Prepares report data** - Creates filled question fields and report metadata for the entity
4. **Generates report** - Runs Jasper report with entity data and hidden question processing
5. **Prints to printer** - Sends generated report directly to specified printer and cleans up temporary files
6. **Updates print count** - Increments entity's print counter for tracking

## Parameters

**Parameter 1:** Printer Name (Required) - Name of the network or local printer to send output to

**Parameter 2:** Form Report Code (Optional) - Business code of specific ReportDefinition to use (auto-selects if empty)

## Database Tables Affected

- **ReportDefinition** - Reads form configuration and metadata for report generation
- **Entity Print Count** - Increments print count field on the source entity
- **Temporary Print Records** - Creates and deletes temporary print job records

## Important Warnings

### ⚠️ Printer Requirements
- Printer name must exactly match configured network/local printer name
- Printer must be accessible from the server running the application
- Print jobs sent directly without user preview or cancellation option

### ⚠️ Form Configuration
- If form code specified, must exist and be compatible with entity type
- If no form code provided, system must find appropriate form for entity type
- Form must have proper question fields and metadata configuration

### ⚠️ Processing Impact
- Print count is incremented regardless of actual print success
- Temporary files are automatically cleaned up after printing
- Failed print jobs may leave incomplete records

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPrintFormToPrinter`


</div>