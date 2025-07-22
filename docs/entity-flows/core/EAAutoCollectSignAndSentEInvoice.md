---
title: EAAutoCollectSignAndSentEInvoice
module: core
---


<div class='entity-flows'>

# EAAutoCollectSignAndSentEInvoice

**This document was generated using AI Tools**

## Purpose
This action automates the complete e-invoice submission process for tax authorities. It collects eligible documents, creates submission batches, digitally signs them, and sends them to the tax authority - all in one automated workflow.

## When to Use This Action
- **Automated E-Invoice Submission**: When you want to automatically submit e-invoices to tax authorities
- **Scheduled Tax Compliance**: As part of scheduled tasks for regular tax submissions
- **Bulk Document Processing**: When handling large volumes of invoices that need tax authority submission

## How It Works
1. **Document Collection**: Finds documents matching the specified criteria
2. **Batch Creation**: Groups documents into submission batches (max 500 per batch by default)
3. **Document Creation**: Creates TaxAuthoritySubmissionDoc records
4. **Digital Signing**: Signs the documents using the e-signature server
5. **Tax Authority Submission**: Sends the signed documents to the tax authority
6. **Asynchronous Processing**: Uses background threads for signing and submission

## Parameters Required

### Parameter 1: Submission Document Book (Required)
- **What it is**: The document book to use for creating submission documents
- **Format**: Document book code/name
- **Purpose**: Determines numbering and classification of submission documents

### Parameter 2: Tax Payer Configuration (Required)
- **What it is**: The tax configuration that defines submission settings
- **Format**: Tax payer configuration code
- **Purpose**: Contains tax authority connection details and signing certificates

### Parameter 3: Entity Type (Required)
- **What it is**: The type of documents to collect and submit
- **Format**: Entity type name from the system
- **Purpose**: Determines which documents will be included in the submission

### Parameter 4: Max Lines Per Submission Document
- **What it is**: Maximum number of document lines per submission batch
- **Format**: Integer number
- **Default**: 500 (if not specified)
- **Purpose**: Controls batch size to avoid overly large submissions

### Parameter 5: Collect When Query Matched
- **What it is**: SQL condition to filter which documents to include
- **Format**: SQL CASE statement that returns 1 (include) or 0 (exclude)
- **Example**: `select case when {description1} like 'ABC%' then 1 else 0 end`
- **Purpose**: Allows conditional collection based on document properties

### Parameter 6: Created Submission Extra Fields Map
- **What it is**: Additional field values to set on the submission document
- **Format**: `fieldName="value"` pairs
- **Example**: `branch="ABC"`
- **Purpose**: Allows setting custom fields on the created submission documents

## Process Flow

### Step 1: Document Collection
- Searches for documents matching the entity type and collection criteria
- Applies the "Collect When Query" filter if specified
- Groups documents by their tax configuration

### Step 2: Batch Processing
- Splits collected documents into batches (default 500 lines per batch)
- Creates a separate TaxAuthoritySubmissionDoc for each batch
- Sets the document book, value date, and custom fields

### Step 3: Digital Signing
- Generates e-invoice XML documents
- Sends documents to the e-signature server for signing
- Processes signing results and handles any signing errors

### Step 4: Tax Authority Submission
- Submits signed documents to the tax authority
- Handles submission responses and error conditions
- Updates document status based on submission results

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Automated Process**: This action runs completely automatically - ensure all parameters are correct before scheduling
2. **Tax Compliance**: Incorrect submissions can cause tax authority penalties
3. **Digital Signatures**: Requires properly configured e-signature server and valid certificates
4. **Background Processing**: Signing and submission happen asynchronously - check logs for completion status
5. **Batch Limitations**: Large batches may take significant time to process

## Common Configuration Patterns

### Pattern 1: Daily Invoice Submission
```
Parameter 1: [SubmissionBookCode]
Parameter 2: [TaxPayerConfigCode]
Parameter 3: [InvoiceEntityType]
Parameter 4: 500
Parameter 5: (empty - submit all)
Parameter 6: (empty)
```

### Pattern 2: Conditional Submission by Branch Code
```
Parameter 1: [SubmissionBookCode]
Parameter 2: [TaxPayerConfigCode]
Parameter 3: [InvoiceEntityType]
Parameter 4: 200
Parameter 5: select case when {branch.code} = 'MAIN' then 1 else 0 end
Parameter 6: submissionType="BRANCH_MAIN"
```

## Monitoring and Troubleshooting

### Success Indicators
- **Submission Documents Created**: Check for new TaxAuthoritySubmissionDoc records
- **Digital Signatures**: Verify documents are properly signed
- **Tax Authority Response**: Check submission status in the documents

### Common Issues

**"No documents collected"**
- Check the entity type parameter
- Verify the collection query syntax
- Ensure documents exist and meet the criteria

**"Signing failed"**
- Verify e-signature server is running and accessible
- Check certificate validity and configuration
- Review signing server logs for detailed errors

**"Submission failed"**
- Verify tax authority connection settings
- Check network connectivity
- Review tax authority response messages

**"Process hangs or takes too long"**
- Consider reducing batch size (Parameter 4)
- Check server resources and performance
- Review executor service thread status

### Log Monitoring
Monitor these log entries:
- `SEND E-INVOICE : Start processing document with code [X]`
- Signing server connection status
- Tax authority submission responses

## SQL to Check Results

```sql
-- Check recent submission documents
SELECT id, code, valueDate, documentStatus 
FROM TaxAuthoritySubmissionDoc 
WHERE creationDate > DATEADD(day, -1, GETDATE())
ORDER BY creationDate DESC

-- Check submission lines
SELECT tas.code, tasl.documentId, tasl.submissionStatus
FROM TaxAuthoritySubmissionDoc tas
JOIN TaxAuthoritySubmissionLine tasl ON tas.id = tasl.parentId
WHERE tas.creationDate > DATEADD(day, -1, GETDATE())
```

## Related Processes
- **Manual E-Invoice Submission**: For individual document submissions
- **Tax Authority Configuration**: Setup of tax authority connection settings
- **Document Status Monitoring**: Tracking submission and response status

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoCollectSignAndSentEInvoice`

</div>