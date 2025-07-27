---
title: EAAutoSendEInvoice
module: core
---

<div class='entity-flows'>

# EAAutoSendEInvoice

**This document was generated using Claude.ai**

## Overview

Automatically submits individual invoices to tax authorities (ZATCA/Egyptian Tax Authority) immediately after invoice creation or modification. Handles single-invoice submissions with automatic document signing.

## When This Action Runs

Automatically after invoice save/commit operations on entities implementing ITaxAuthorityDoc interface. Must be configured to run after commit (runAfterCommitDocAndEffectOnDB = true).

## How It Works

1. **Validates** entity implements ITaxAuthorityDoc and is eligible for submission
2. **Creates or finds** submission document for today's date
3. **Adds submission line** linking invoice to submission document
4. **Applies digital signing** for Egyptian e-Invoices if required
5. **Submits to tax authority** and processes response

## Key Parameters

- **Parameter 1:** Tax Submission Document Book (Required) - Document book code (e.g., `EINV_SUB`, `ZATCA_SUB`)

## Database Tables Affected

- **TaxAuthoritySubmissionDoc** - Submission documents grouping invoices by date
- **TaxAuthoritySubmissionLine** - Links invoices to submission documents
- **Invoice Entities** - Updated with submission status and references

## Configuration Requirements

### Entity Flow Settings
- Must have `runAfterCommitDocAndEffectOnDB = true`
- Only works with entities implementing ITaxAuthorityDoc
- Should run after invoice save operations

### Tax Authority Setup
- Valid TaxPayerConfiguration required
- API credentials and digital certificates needed
- Stable internet connection to tax authority systems

## Important Warnings

### ⚠️ Configuration Requirements
- MUST be configured with `runAfterCommitDocAndEffectOnDB = true`
- Only works with entities implementing ITaxAuthorityDoc
- Submission document book must exist and be configured

### ⚠️ Performance Impact
- Tax authority communication may slow invoice saves
- High-volume creation may overwhelm tax authority APIs
- Failed submissions require manual intervention

### ⚠️ Tax Authority Dependencies
- Requires accessible tax authority systems
- Valid digital certificates and API credentials needed
- Invoices must meet format requirements

## Related Actions

- [EAAutoCollectSignAndSentEInvoice](EAAutoCollectSignAndSentEInvoice.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoSendEInvoice`

</div>

