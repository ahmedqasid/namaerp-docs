---
title: EAAutoSendEInvoice
module: core
---


<div class='entity-flows'>

# EAAutoSendEInvoice

**This document was generated using Claude.ai**

## Overview

This entity flow automatically submits individual invoices to tax authorities (ZATCA/Egyptian Tax Authority) immediately after invoice creation or modification. It handles single-invoice submissions with automatic document signing, submission document creation, and tax authority communication.

## When This Action Runs

- **Trigger:** Automatically after invoice save/commit operations
- **Target:** Invoice entities implementing ITaxAuthorityDoc interface
- **Requirement:** Must be configured to run after commit (runAfterCommitDocAndEffectOnDB = true)
- **Purpose:** Real-time e-Invoice compliance and tax authority submission

## How It Works

### 1. Pre-execution Validation
- **Entity Type Check:** Validates entity implements ITaxAuthorityDoc interface
- **Configuration Check:** Ensures action runs after commit and database effects
- **Invoice Validation:** Confirms entity is a valid invoice document
- **Status Verification:** Checks if invoice is eligible for submission

### 2. Submission Document Management
- **Document Search:** Looks for existing submission document for today's date
- **Document Creation:** Creates new TaxAuthoritySubmissionDoc if none exists
- **Line Management:** Adds or finds submission line for the specific invoice
- **Status Checking:** Prevents re-submission of already processed invoices

### 3. Submission Line Processing
- **Line Creation:** Creates TaxAuthoritySubmissionLine for the invoice
- **Reference Setting:** Links submission line to the original invoice
- **Status Tracking:** Monitors submission status (sent, cancelled, rejected)
- **Duplicate Prevention:** Avoids creating duplicate submission lines

### 4. Document Book Assignment
- **Book Configuration:** Uses specified submission document book
- **Code Generation:** Generates unique submission document code
- **Date Setting:** Sets submission value date to current date
- **Metadata Population:** Applies book-specific settings and dimensions

### 5. Digital Signing (Egyptian E-Invoice)
- **Configuration Check:** Determines if Egyptian e-Invoice signing is required
- **Document Preparation:** Creates e-Invoice documents without initial signatures
- **Signature Application:** Uses ESignerServerUtils for digital signing
- **Validation:** Ensures signatures meet tax authority requirements

### 6. Tax Authority Submission
- **Document Transmission:** Sends submission document to tax authority
- **Single Invoice Focus:** Submits only the specific invoice
- **Response Handling:** Processes tax authority response and confirmations
- **Status Updates:** Updates submission status based on tax authority feedback

## Key Features

### Real-time Processing
- **Immediate Submission:** Submits invoices as soon as they're created/modified
- **Individual Processing:** Handles one invoice at a time for immediate compliance
- **Error Isolation:** Invoice submission failures don't affect other operations
- **Status Tracking:** Provides immediate feedback on submission success/failure

### Intelligent Document Management
- **Daily Grouping:** Groups submissions by date for organization
- **Reuse Logic:** Reuses existing submission documents when appropriate
- **Status Awareness:** Prevents duplicate submissions of processed invoices
- **Book Management:** Proper document numbering and classification

### Multi-Tax Authority Support
- **ZATCA Integration:** Supports Saudi ZATCA e-Invoice requirements
- **Egyptian Integration:** Handles Egyptian tax authority submissions with signing
- **Configuration-Driven:** Adapts behavior based on taxpayer configuration
- **Compliance Standards:** Meets different tax authority format requirements

## Parameters

### Parameter 1: Tax Submission Document Book
- **Type:** Text (Required)
- **Format:** Document book code for TaxAuthoritySubmissionDoc
- **Purpose:** Determines numbering sequence and classification for submission documents
- **Configuration:** Must be properly configured in document books setup

**Examples:**
- `EINV_SUB` - E-Invoice submission book
- `TAX_SUB` - General tax submission book
- `ZATCA_SUB` - ZATCA-specific submission book
- `EGY_EINV` - Egyptian e-Invoice submission book

**Important:** The book must exist and be properly configured with:
- Correct entity type (TaxAuthoritySubmissionDoc)
- Appropriate numbering sequence
- Proper dimension settings
- Valid branch/department assignments

## Database Tables Affected

### Primary Tables
- **TaxAuthoritySubmissionDoc:** Submission document containing the invoice
  - Created or updated with invoice reference
  - Tracks overall submission status
  - Groups invoices by submission date

- **TaxAuthoritySubmissionLine:** Individual invoice submission reference
  - Links original invoice to submission document
  - Tracks individual invoice submission status
  - Maintains submission attempt history

### Source Invoice Tables
- **Invoice Entities:** SalesInvoice, SalesCreditNote, PurchaseInvoice, etc.
  - Updated with submission status information
  - Tagged with submission document references
  - Audit trail maintained for compliance

## Business Use Cases

### 1. Real-time ZATCA Compliance
- **Immediate Submission:** Submit invoices to ZATCA as soon as they're created
- **Compliance Assurance:** Ensure all invoices meet submission deadlines
- **Error Detection:** Immediate feedback on submission issues
- **Audit Trail:** Complete submission history for regulatory compliance

### 2. Egyptian E-Invoice Processing
- **Digital Signing:** Automatic digital signature application
- **Format Compliance:** Ensure invoices meet Egyptian tax authority standards
- **Submission Tracking:** Monitor submission status and responses
- **Certificate Management:** Handle digital certificate requirements

### 3. Multi-Branch Operations
- **Branch-Specific Submission:** Handle invoices from different branches
- **Book Segregation:** Use different submission books per branch/entity
- **Compliance Isolation:** Maintain separate audit trails per operation
- **Configuration Management:** Apply branch-specific tax configurations

## Important Configuration Requirements

### Entity Flow Configuration
- **Post-Commit Execution:** Must have `runAfterCommitDocAndEffectOnDB = true`
- **Entity Type Restriction:** Only works with entities implementing ITaxAuthorityDoc
- **Trigger Timing:** Should be configured to run after invoice save operations
- **Error Handling:** Configure appropriate error handling and retry mechanisms

### Tax Authority Setup
- **Taxpayer Configuration:** Proper TaxPayerConfiguration setup required
- **API Credentials:** Valid tax authority API credentials
- **Certificate Management:** Digital certificates for signing (if required)
- **Network Configuration:** Stable internet connection to tax authority systems

## Important Warnings

### ⚠️ Configuration Requirements
- **Post-Commit Only:** Action MUST be configured with `runAfterCommitDocAndEffectOnDB = true`
- **Entity Type Restriction:** Only works with invoice entities implementing ITaxAuthorityDoc
- **Book Configuration:** Submission document book must exist and be properly configured
- **Execution Context:** Should only run after successful invoice commit operations

### ⚠️ Performance Considerations
- **Network Dependency:** Requires stable internet connection to tax authority
- **Processing Delay:** Tax authority communication may slow invoice save operations
- **Error Impact:** Submission failures may affect invoice save performance
- **Volume Impact:** High-volume invoice creation may overwhelm tax authority APIs

### ⚠️ Submission Status Management
- **Duplicate Prevention:** Prevents re-submission of already processed invoices
- **Status Tracking:** Monitors sent, cancelled, and rejected statuses
- **Error Handling:** Failed submissions require manual intervention or retry
- **Audit Compliance:** Maintains complete submission attempt history

### ⚠️ Tax Authority Dependencies
- **API Availability:** Tax authority systems must be accessible and operational
- **Certificate Validity:** Digital certificates must be valid and not expired
- **Credential Management:** API credentials must be current and authorized
- **Format Compliance:** Invoices must meet tax authority format requirements

### ⚠️ Error Recovery
- **Manual Intervention:** Failed submissions may require manual reprocessing
- **Retry Mechanisms:** Consider implementing retry logic for transient failures
- **Compliance Risk:** Failed submissions may result in regulatory penalties
- **Monitoring Requirements:** Active monitoring of submission success rates essential

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoSendEInvoice`

**Related Actions:**
- [EAAutoCollectSignAndSentEInvoice](EAAutoCollectSignAndSentEInvoice.md)


</div>

