---
title: EAAutoCollectSignAndSentEInvoice
module: core
---


<div class='entity-flows'>

# EAAutoCollectSignAndSentEInvoice

**This document was generated using Claude.ai**

## Overview

This entity flow automates the complete Saudi ZATCA e-Invoice submission process by collecting eligible invoices, creating submission documents, digitally signing them, and sending them to the tax authority. It operates as a scheduled task to handle high-volume electronic invoice submissions with proper batching and error handling.

## When This Action Runs

- **Trigger:** Scheduled task execution for automated e-Invoice processing
- **Target:** TaskSchedule entities configured for e-Invoice automation
- **Scope:** Batch processing of multiple invoices per execution
- **Purpose:** Automated compliance with Saudi ZATCA electronic invoicing requirements

## How It Works

### 1. Invoice Collection Phase
- **Entity Identification:** Finds invoices of specified entity type ready for submission
- **Query Filtering:** Uses collector query to determine which invoices to include
- **Tax Configuration:** Applies specific taxpayer configuration settings
- **Batch Preparation:** Groups invoices into manageable submission batches

### 2. Submission Document Creation
- **Document Generation:** Creates TaxAuthoritySubmissionDoc for each batch
- **Line Population:** Adds collected invoices as submission lines
- **Field Mapping:** Applies additional field mappings if specified
- **Code Assignment:** Generates unique submission document codes

### 3. Digital Signing Process
- **E-Signature:** Uses ESignerServerUtils to digitally sign invoice documents
- **Certificate Management:** Handles taxpayer digital certificates
- **Signature Validation:** Ensures signatures meet ZATCA requirements
- **Error Handling:** Manages signing failures and retries

### 4. Tax Authority Submission
- **Document Transmission:** Sends signed documents to ZATCA systems
- **Response Processing:** Handles submission responses and confirmations
- **Status Tracking:** Updates submission status based on tax authority response
- **Compliance Logging:** Maintains audit trail for regulatory compliance

### 5. Asynchronous Processing
- **Thread Management:** Uses dedicated executor service for submission tasks
- **Transaction Isolation:** Processes each batch in separate transactions
- **Lock Synchronization:** Prevents concurrent submission conflicts
- **Error Recovery:** Handles failures without affecting other batches

## Key Components

### E-Invoice Compliance
- **ZATCA Integration:** Full compliance with Saudi tax authority requirements
- **Digital Signatures:** Implements required cryptographic signatures
- **Format Standards:** Generates invoices in ZATCA-approved formats
- **Submission Protocols:** Uses official tax authority submission APIs

### Batch Processing
- **Volume Management:** Handles large numbers of invoices efficiently
- **Memory Optimization:** Processes invoices in configurable batch sizes
- **Performance Tuning:** Balances throughput with system resources
- **Scalability:** Supports high-volume invoice processing

## Parameters

### Parameter 1: Submission Document Book
- **Type:** Text (Required)
- **Format:** Document book code for TaxAuthoritySubmissionDoc
- **Purpose:** Determines numbering and classification for submission documents
- **Example:** `EINV_SUB` - E-Invoice submission book

### Parameter 2: Tax Payer Configuration
- **Type:** Text (Required)
- **Format:** TaxPayerConfiguration business code
- **Purpose:** Specifies taxpayer settings, certificates, and ZATCA credentials
- **Example:** `MAIN_TAXPAYER` - Primary taxpayer configuration

### Parameter 3: Entity Type
- **Type:** Text (Required)
- **Format:** Entity type name for invoices to collect
- **Purpose:** Specifies which type of documents to process
- **Examples:**
  - `SalesInvoice` - Sales invoices
  - `SalesCreditNote` - Credit notes
  - `PurchaseInvoice` - Purchase invoices

### Parameter 4: Max Lines Per Submission Document
- **Type:** Text (Optional)
- **Format:** Integer value (defaults to 500)
- **Purpose:** Controls batch size for submission documents
- **Performance Impact:** Larger batches reduce document count but increase processing time

**Recommendations:**
- `100-200` - For high-frequency processing
- `500` - Default balanced setting
- `1000+` - For low-frequency, high-volume batches

### Parameter 5: Collect When Query Matched
- **Type:** Text (Optional)
- **Format:** SQL expression returning 1 (include) or 0 (exclude)
- **Purpose:** Dynamic filtering of invoices for submission
- **Parameter Substitution:** Supports `{fieldName}` placeholders

**Examples:**
```sql
-- Only invoices above certain amount
SELECT CASE WHEN {money.total} > 1000 THEN 1 ELSE 0 END

-- Only specific customer invoices
SELECT CASE WHEN {customer.code} LIKE 'VIP%' THEN 1 ELSE 0 END

-- Only invoices with specific description
SELECT CASE WHEN {description1} LIKE 'EXPORT%' THEN 1 ELSE 0 END

-- Time-based filtering
SELECT CASE WHEN {creationDate} >= DATEADD(day, -1, GETDATE()) THEN 1 ELSE 0 END
```

### Parameter 6: Created Submission Extra Fields Map
- **Type:** Text (Optional)
- **Format:** Field mapping expressions (fieldName=value)
- **Purpose:** Sets additional fields on created submission documents

**Examples:**
```
branch="MAIN_BRANCH"
department="SALES"
description1="Auto E-Invoice Submission"
remarks="Generated by scheduled task"
```

## Database Tables Affected

### Primary Tables
- **TaxAuthoritySubmissionDoc:** Created submission documents
  - Contains batched invoice references
  - Tracks submission status and responses
  - Maintains audit trail for ZATCA compliance

- **TaxAuthoritySubmissionLine:** Individual invoice references
  - Links original invoices to submission documents
  - Tracks individual invoice submission status
  - Maintains relationship for compliance reporting

### Supporting Tables
- **TaskSchedule:** Source entity triggering the process
- **Source Invoice Entities:** SalesInvoice, SalesReturn, etc.
  - Updated with submission status
  - Tagged with submission document references

## Business Use Cases

### 1. Automated ZATCA Compliance
- **Daily Submissions:** Process all invoices created during business hours
- **Real-time Compliance:** Ensure timely submission to meet regulatory deadlines
- **Bulk Processing:** Handle high-volume invoice submissions efficiently
- **Error Recovery:** Automatically retry failed submissions

### 2. Multi-Entity Operations
- **Branch Processing:** Handle invoices from multiple branches
- **Entity Segregation:** Process different entity types separately
- **Configuration Management:** Use different taxpayer configs for different entities
- **Compliance Isolation:** Maintain separate audit trails per entity

### 3. Performance Optimization
- **Off-Peak Processing:** Schedule submissions during low-activity periods
- **Batch Optimization:** Balance submission volume with system performance
- **Resource Management:** Control system load through batching parameters
- **Monitoring Integration:** Track submission metrics and performance

## Important Warnings

### ⚠️ ZATCA Compliance Requirements
- **Certificate Validity:** Digital certificates must be valid and not expired
- **Network Connectivity:** Requires stable internet connection to ZATCA systems
- **API Credentials:** Tax authority API credentials must be current and authorized
- **Format Compliance:** Invoices must meet ZATCA format and content requirements

### ⚠️ Processing Performance
- **System Load:** High-volume processing may impact system performance
- **Memory Usage:** Large batches consume significant memory resources
- **Database Impact:** Bulk operations may affect database performance
- **Concurrent Execution:** Multiple simultaneous executions may cause conflicts

### ⚠️ Error Handling
- **Partial Failures:** Some invoices may fail while others succeed
- **Retry Logic:** Failed submissions require manual intervention or retry
- **Audit Trail:** Maintain records of all submission attempts and outcomes
- **Compliance Risk:** Failed submissions may result in regulatory penalties

### ⚠️ Security Considerations
- **Certificate Security:** Digital certificates must be securely stored and accessed
- **API Security:** Tax authority credentials must be protected
- **Data Privacy:** Invoice data transmission must be encrypted
- **Access Control:** Restrict execution to authorized personnel only

### ⚠️ Configuration Dependencies
- **Taxpayer Setup:** TaxPayerConfiguration must be properly configured
- **Book Configuration:** Submission document book must exist and be properly set up
- **Entity Types:** Specified entity types must exist and have required fields
- **Query Validation:** Collector queries must be syntactically correct and tested

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoCollectSignAndSentEInvoice`

**Related Actions:**
- [EAAutoSendEInvoice](EAAutoSendEInvoice.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)


</div>

