---
title: EASCDocFromDocDeleter
module: supplychain
---


<div class='entity-flows'>

# EASCDocFromDocDeleter

**This document was generated using Claude.ai**

## Overview

Deletes supply chain documents that are referenced in specified fields of the source document. Finds the target document stored in the specified field reference and permanently deletes it from the system, including all associated data and relationships.

## When This Action Runs

Manual execution to clean up related documents, typically used to delete generated documents that are no longer needed, remove draft documents, or clean up document relationships when business processes change.

## How It Works

1. **Validates parameters** - Ensures first two parameters are provided (target type and field ID)
2. **Locates target document** - Uses the findDoc utility method to locate the referenced document:
   - Reads the specified field from the source document
   - Handles different reference types (direct BasicSCDocument, GenericReference, or ID/code)
   - Resolves references to actual document instances
3. **Deletes document** - If target document is found, calls EntityMediator.deleteEntityFromBusinessAction()
4. **Accumulates results** - Collects success/failure results from the deletion process

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to delete

Example: `SalesInvoice`, `PurchaseOrder`, `CreditNote`

**Parameter 2:** Field ID To Keep Doc (Required) - Field containing the document reference to delete

Example: `ref1`, `ref2`, `ref3`, `ref4`, `ref5`

## Database Tables Affected

- **Target Document Tables** - Completely removes the target document and all associated data
- **Target Document Lines** - Deletes all lines associated with the target document
- **Document Relationships** - Removes relationships and references involving the target document
- **Source Document** - Field containing the reference may become null after deletion

## Important Warnings

### ⚠️ Permanent Document Deletion
- **This operation permanently deletes documents and cannot be undone**
- All document data, lines, and relationships are permanently removed
- Document history and audit trails associated with the document are lost
- Consider backing up data before executing this action

### ⚠️ Required Parameter Validation
- First two parameters are mandatory and must not be empty
- Missing parameters cause immediate failure with descriptive error
- Parameter validation happens before any document processing
- Ensure both target type and field ID are correctly specified

### ⚠️ Document Reference Resolution
- Supports multiple reference types: direct document objects, GenericReference, or ID/code values
- Invalid references are handled gracefully (no error if document not found)
- Document must be accessible and not locked by other processes
- Reference resolution uses the specified entity type for validation

### ⚠️ Business Process Impact
- Deleting documents may break business workflows and processes
- Related documents may lose their references and relationships
- Inventory effects, accounting entries, and other business impacts are processed
- Consider impact on reporting, compliance, and audit requirements

### ⚠️ Document State and Locking
- Documents in certain states (approved, posted, closed) may not be deletable
- Document deletion respects business rules and validation constraints
- Concurrent access or editing may prevent deletion
- Review document status and dependencies before deletion

### ⚠️ Related Data Cleanup
- Document deletion triggers cleanup of related data and relationships
- Inventory transactions, accounting entries, and other effects may be reversed
- Cleanup process may fail if related data cannot be safely removed
- Monitor system for any orphaned data after deletion

### ⚠️ Error Handling and Reporting
- Uses accumulating result pattern to collect deletion results
- Deletion failures are reported but do not stop the process
- Review result messages for complete understanding of deletion outcome
- Failed deletions may leave documents in inconsistent states

### ⚠️ No Document Found Handling
- If referenced document is not found, no error occurs (graceful handling)
- This allows the action to be used safely even when references may not exist
- Consider whether missing documents indicate data integrity issues
- Review business logic expectations for document existence

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCDocFromDocDeleter`

**Operation Type:** Destructive - Permanent document deletion

**Related Actions:**
- [EASCDocFromDocCreator](EASCDocFromDocCreator.md) - Creates documents that can be deleted by this action


</div>

