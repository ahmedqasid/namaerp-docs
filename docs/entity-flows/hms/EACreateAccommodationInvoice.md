---
title: EACreateAccommodationInvoice
module: hms
---


<div class='entity-flows'>

# EACreateAccommodationInvoice

**This document was generated using Claude.ai**

## Overview

Creates invoices for hospital accommodation services based on patient admissions and room stays. Processes accommodation entries to calculate billable days, applies checkout times, and generates invoices for hospital bed charges and related services.

## When This Action Runs

Manual execution for billing patient accommodation charges, typically at discharge or during regular billing cycles. Used in hospital management systems to convert accommodation entries into billable invoices.

## How It Works

1. **Identifies accommodation entries** - Finds relevant accommodation entries based on source entity type
2. **Groups by admission** - Organizes entries by patient admission for consolidated billing
3. **Calculates end times** - Sets checkout dates and times for open accommodation entries
4. **Computes billable days** - Calculates chargeable accommodation days based on stay duration
5. **Applies configuration** - Uses HMS module checkout time settings if not using current time
6. **Creates invoices** - Generates accommodation invoices through specialized invoice creation utility
7. **Handles multiple stays** - Processes overlapping or consecutive accommodation periods

## Parameters

**Parameter 1:** Use The Current Time Instead Of Defined Checkout Time (Required) - "true" to use current time, "false" to use configured checkout time

## Entity Type Processing

### For HMSAbsAccommodation Entities
- Processes accommodation entries for the specific patient admission
- Creates invoices for the single accommodation document

### For Other Entity Types
- Processes all unclosed accommodation entries across all admissions
- Creates invoices for multiple accommodation documents simultaneously

## Database Tables Affected

- **HMSAccommodationEntry** - Reads accommodation stay records and updates billable days
- **HMSPatientAdmission** - Groups accommodation entries by patient admission
- **HMSAccommodation** - Links to accommodation documents for invoice creation
- **Invoice Tables** - Creates new accommodation invoices through invoice creation utility
- **HMSConfiguration** - Reads checkout time settings and billing configuration

## Important Warnings

### ⚠️ Accommodation Entry Requirements
- Only processes accommodation entries that are marked as "in line" (active)
- Entries must belong to valid patient admissions
- Missing or invalid accommodation data causes processing failures

### ⚠️ Checkout Time Calculation
- Parameter determines whether to use current time or configured checkout time
- Using configured checkout time may adjust checkout date if resulting time is before check-in
- Incorrect checkout times affect billable day calculations and invoice amounts

### ⚠️ Billable Days Calculation
- System calculates billable days based on accommodation duration and overlap rules
- Last accommodation entry in a sequence may have different billing rules
- Calculation considers multiple consecutive stays for the same admission

### ⚠️ Configuration Dependencies
- Requires HMS module configuration for checkout times and billing rules
- Missing configuration falls back to default values
- Incorrect configuration affects billing accuracy

### ⚠️ Invoice Creation Impact
- Creates actual billable invoices that affect patient accounts
- Failed invoice creation may leave accommodation entries in inconsistent state
- Generated invoices follow standard billing and accounting procedures

### ⚠️ Multi-Admission Processing
- When processing multiple admissions, failures in one may affect the entire operation
- Large numbers of admissions may cause performance issues
- Consider processing in smaller batches for high-volume operations

### ⚠️ Date and Time Handling
- Checkout date automatically adjusts to next day if checkout time creates past timestamp
- Time zone handling follows system configuration
- Date calculations affect billing periods and invoice amounts

### ⚠️ Data Consistency
- Modifies accommodation entry data during processing (sets end dates/times)
- Changes are made to cloned entries before invoice creation
- Original accommodation entries remain unchanged

**Module:** hms

**Full Class Name:** `com.namasoft.modules.hms.domain.utils.EACreateAccommodationInvoice`


</div>

