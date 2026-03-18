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

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAUpdateEmployeeResidencyRenewDate`


</div>

