---
title: EAAutoSendEInvoice
module: core
---


<div class='entity-flows'>

# EAAutoSendEInvoice

**This document was generated using AI Tools**

## Purpose
This action automatically submits a single invoice document to the tax authority when the document is saved or updated. It creates or updates the tax submission document and sends it immediately to the tax authority system.

## When to Use This Action
- **Individual Invoice Submission**: When you want to submit invoices one-by-one as they are created
- **Real-time Tax Compliance**: For immediate submission upon invoice approval or finalization
- **Document-Specific Submission**: When each invoice needs individual processing rather than batch submission

## How It Works
1. **Document Validation**: Ensures the entity is an invoice that can be submitted to tax authorities
2. **Submission Document Management**: Creates or finds existing TaxAuthoritySubmissionDoc for today
3. **Submission Line Creation**: Adds the invoice to the submission document as a line item
4. **Digital Signing**: Signs the document if required (Egyptian e-invoices)
5. **Tax Authority Submission**: Sends the individual document to the tax authority
6. **Status Updates**: Updates submission status based on tax authority response

## Key Requirements

### Entity Flow Configuration
⚠️ **CRITICAL REQUIREMENT**: This action can ONLY be used when the entity flow has the option **"Run After Commit Doc And Effect On DB"** enabled. The system will throw an error if this option is not active.

### Entity Type Restrictions  
This action can ONLY be used with invoice entities that implement the `ITaxAuthorityDoc` interface. Other entity types will cause the action to fail.

## Parameters Required

### Parameter 1: Tax Submission Document Book (Required)
- **What it is**: The document book to use for creating tax submission documents
- **Format**: Document book code or ID
- **Purpose**: Determines numbering and classification of submission documents

## Process Flow

### Step 1: Entity Validation
- Verifies that the entity flow has "Run After Commit Doc And Effect On DB" enabled
- Confirms the entity implements ITaxAuthorityDoc interface
- Fails immediately if either requirement is not met

### Step 2: Submission Document Management
- Searches for existing TaxAuthoritySubmissionDoc for today's date that contains this invoice
- Creates new submission document if none exists
- Uses the specified document book for numbering and classification

### Step 3: Submission Line Processing
- Looks for existing submission line for this specific invoice
- Creates new submission line if the invoice is not already in a submission document
- Skips processing if the invoice status is already: Sent, Cancelled, or Rejected

### Step 4: Digital Signing (if required)
- For Egyptian e-invoices: Creates XML documents and sends them to e-signature server
- Signs the documents using configured certificates
- Processes signing results and handles any signing errors

### Step 5: Tax Authority Submission
- Sends the individual invoice (not batch) to the tax authority
- Processes tax authority response
- Updates document and line status based on submission results

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Post-Commit Only**: Must be configured to run AFTER database commit - cannot run during transaction
2. **Invoice Entities Only**: Only works with entities that implement ITaxAuthorityDoc
3. **Individual Processing**: Processes ONE invoice at a time, not batches
4. **Status Checking**: Skips already processed invoices (sent, cancelled, or rejected)
5. **Daily Grouping**: Groups invoices by date into submission documents

## Configuration Requirements

### Entity Flow Setup
- **"Run After Commit Doc And Effect On DB"** must be enabled
- Action must be placed in post-commit entity flow steps
- Should be triggered on invoice finalization or approval

### Document Book Setup
- Valid TaxAuthoritySubmissionDoc book must be configured
- Book should have proper numbering sequence
- Appropriate permissions for creating submission documents

### Tax Authority Configuration  
- Tax payer configuration must be properly set up
- For Egyptian e-invoices: E-signature server must be configured
- Network connectivity to tax authority systems required

## Monitoring and Troubleshooting

### Success Indicators
- **Submission Document Created**: New or updated TaxAuthoritySubmissionDoc records
- **Submission Line Added**: Invoice appears in submission document lines
- **Tax Authority Response**: Positive response from tax authority submission

### Common Issues

**"The action should be used only when the option 'runAfterCommitDocAndEffectOnDB' is active"**
- Enable "Run After Commit Doc And Effect On DB" in the entity flow configuration
- Ensure the action is placed in post-commit steps, not pre-commit steps

**"This entity flow must be used only with invoice entities"**
- Verify the entity type implements ITaxAuthorityDoc interface
- Check that you're using this action on the correct entity type
- Review entity type configuration and inheritance

**"Signing failed"**
- Verify e-signature server is running and accessible (for Egyptian e-invoices)
- Check certificate validity and configuration
- Review signing server logs for detailed errors

**"Submission failed"**
- Check tax authority connection settings
- Verify network connectivity to tax authority
- Review tax authority response messages for specific errors

### Log Monitoring
Monitor these system areas:
- TaxAuthoritySubmissionDoc creation and updates
- Tax authority submission responses
- E-signature server communication (if applicable)

## SQL to Check Results

```sql
-- Check recent submission documents for today
SELECT id, code, valueDate, creationDate 
FROM TaxAuthoritySubmissionDoc 
WHERE valueDate = CAST(GETDATE() AS DATE)
ORDER BY creationDate DESC

-- Check submission status for specific invoice
SELECT tasl.documentId, tasl.submissionStatus, tasl.taxAuthorityResponse
FROM TaxAuthoritySubmissionLine tasl
WHERE tasl.documentId = 'your_invoice_id'
```

## Related Actions
- **EAAutoCollectSignAndSentEInvoice**: For batch processing of multiple invoices
- **Manual Tax Submission**: For handling failed or special case submissions
- **Tax Authority Status Updates**: For processing tax authority responses

## Best Practices

### When to Use Individual vs Batch Submission
- **Individual (This Action)**: For immediate compliance, small invoice volumes, or special handling
- **Batch Processing**: For high volume, scheduled submissions, or performance optimization

### Error Handling
- Monitor submission failures and have manual backup procedures
- Set up alerts for tax authority communication failures
- Regular review of submission status and pending invoices

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoSendEInvoice`

</div>