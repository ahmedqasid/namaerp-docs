---
title: EAUpdateEmployeeResidencyRenewDate
module: hr
---


<div class='entity-flows'>

# EAUpdateEmployeeResidencyRenewDate

**This document was generated using Claude.ai**

## Overview

Updates employee residency renewal dates based on residence renewal documents. Automatically synchronizes employee residency information when residence renewal documents are processed, ensuring employee records reflect current residency status.

## When This Action Runs

Manual execution on residence renewal documents. Typically used after processing residency renewals for expatriate employees to update their main employee records with new residency expiration dates.

## How It Works

1. **Invokes document method** - Calls the built-in updateEmployeeResidenceRenewDate method on the document
2. **Document handles updates** - The residence renewal document updates associated employee records
3. **Accumulates results** - Collects any errors or warnings during the update process

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **Employee** - Updates residency renewal date fields
- **IResidenceRenewDoc** - Interface implemented by various residence renewal document types
- Related employee residency fields depending on document implementation

## Important Warnings

### ⚠️ Document Type Flexibility
- Works with any document implementing IResidenceRenewDoc interface
- Different document types may update different employee fields
- Verify document type supports this action before use

### ⚠️ Update Logic Delegation
- Actual update logic resides in the document implementation
- This action is merely a wrapper that triggers the update
- Document must properly implement updateEmployeeResidenceRenewDate method

### ⚠️ Employee Data Synchronization
- Updates employee master data with residency information
- Changes are permanent and affect employee records
- Ensure residence renewal document data is accurate before running

### ⚠️ Multiple Employee Updates
- If document contains multiple employees, all are updated
- Partial failures may occur if some employees have issues
- Review accumulated results for individual failures

### ⚠️ Residency Compliance
- Critical for maintaining legal compliance for expatriate employees
- Incorrect dates may affect work permit validity
- Regular updates required to maintain accurate records

### ⚠️ No Rollback Mechanism
- Updates are applied directly to employee records
- No automatic rollback if errors occur
- Consider backing up employee data before bulk updates

### ⚠️ Result Accumulation
- All errors and warnings collected in result object
- Individual employee update failures don't stop processing
- Always check result for any issues after execution

### ⚠️ Document State Requirements
- Document should be in appropriate state for updates
- Some implementations may require document to be committed
- Check specific document type requirements

### ⚠️ Field Mapping
- Different residence renewal document types may update different fields
- Common fields include residency expiry date, renewal date
- Verify field mappings for your specific document type

### ⚠️ Business Process Integration
- Often part of larger HR compliance workflows
- May trigger notifications or alerts based on new dates
- Consider downstream effects of date updates

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAUpdateEmployeeResidencyRenewDate`


</div>

