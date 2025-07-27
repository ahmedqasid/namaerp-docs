---
title: EAGenInvestmentDocClaimingDoc
module: accounting
---

<div class='entity-flows'>

# EAGenInvestmentDocClaimingDoc

**This document was generated using Claude.ai**

## Overview

Automatically generates Investment Document Claiming records for treasury bonds that reach their maturity date today. Creates claiming documents to track when treasury bonds become due for collection.

## When This Action Runs

- **Trigger:** Manual execution or scheduled daily processes
- **Target:** InvestmentDoc entities (treasury bonds only)
- **Purpose:** Generate claiming documents for bonds maturing today
- **Timing:** Daily processing for bonds with worth date = today

## How It Works

### Bond Selection Criteria
- **Worth Date:** Equals today's date (maturity date)
- **Type:** Treasury Bonds only (not Company Bonds)
- **Status:** "Ongoing" status (not Initial or Closed)
- **State:** Previously committed entities only

### Document Generation Process
- **Creates:** New InvestmentDocClaiming records
- **Links:** References to original investment documents
- **Copies:** Specified fields based on field mapping parameter
- **Generates:** Document codes automatically
- **Limit:** Maximum 500 records per execution

## Parameters

### Parameter 1: Fields Map (Required)
- **Type:** Text field mapping configuration
- **Purpose:** Specifies which fields to copy from source to target document
- **Format:** Field mapping syntax for data transfer

## Business Use Cases

1. **Treasury Bond Maturity Management:** Track bonds reaching maturity date
2. **Collection Process:** Generate documents for bond collection processing
3. **Lifecycle Management:** Support treasury bond lifecycle from purchase to collection

## Important Warnings

### ⚠️ Date and Processing Sensitivity
- **Today Only:** Processes bonds with worth date = today only
- **Duplicate Risk:** Multiple executions on same date may create duplicates
- **Status Dependency:** Only processes "Ongoing" status bonds

### ⚠️ Performance Limitations
- **Record Limit:** Maximum 500 records per execution
- **Error Handling:** Stops on first error to prevent partial processing

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenInvestmentDocClaimingDoc`

</div>

