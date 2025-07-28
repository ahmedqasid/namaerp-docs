---
title: EASCDocFromDocCreator
module: supplychain
---


<div class='entity-flows'>

# EASCDocFromDocCreator

**This document was generated using Claude.ai**

## Overview

Creates a new supply chain document from an existing document by copying header information and all document lines. If a target document already exists in the specified field, it updates that document instead of creating a new one. Establishes proper document relationships and maintains references between source and generated documents.

## When This Action Runs

Manual execution to generate related documents from source documents, typically for creating invoices from orders, returns from sales, or any document-to-document workflow where the entire document structure needs to be replicated with different book and term settings.

## How It Works

1. **Validates parameters** - Ensures first four parameters are provided (target type, book, term, field ID)
2. **Checks for existing document** - Looks for existing target document in the specified field
3. **Resolves book and term** - Finds DocumentBook and DocumentTerm by ID or code, with document type matching
4. **Creates or updates target** - Creates new document or starts editing existing one
5. **Sets book and term** - Assigns the specified book and term to target document
6. **Determines source document** - Uses main document or specified field as source for copying
7. **Copies common data** - Transfers header information using standard copying logic
8. **Sets header details** - Applies warehouse, locator, and other header information
9. **Copies all lines** - Transfers all document lines from source to target
10. **Commits document** - Saves the target document
11. **Updates reference** - Sets the target document reference in the specified field

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to create/update

Example: `SalesInvoice`, `PurchaseOrder`

**Parameter 2:** Book Code (Required) - Document book code or ID for the target document

**Parameter 3:** Term Code (Required) - Document term code or ID for the target document

**Parameter 4:** Field ID To Keep Doc (Required) - Field where target document reference is stored

Example: `ref1`, `ref2`, `ref3`, `ref4`, `ref5`

**Parameter 5:** Field ID to Keep Make From Document (Optional) - Alternative source document field

Example: `fromDoc`, `originDoc`

## Database Tables Affected

- **Target Document Tables** - Creates new document or updates existing one
- **Target Document Lines** - Creates complete copy of all source document lines
- **Source Document** - Updates specified field with target document reference
- **DocumentBook/DocumentTerm** - Reads book and term configuration (read-only)

## Important Warnings

### ⚠️ Required Parameter Validation
- First four parameters are mandatory and must not be empty
- Missing parameters cause immediate failure with descriptive error
- Parameter validation happens before any document processing
- Ensure all required values are provided

### ⚠️ Document Book and Term Resolution
- Books and terms are looked up by ID first, then by code
- Lookup includes document type matching for accuracy
- Invalid book or term references may cause processing failures
- Ensure book and term exist for the target document type

### ⚠️ Existing Document Handling
- If target document already exists in the specified field, it will be updated
- Existing document enters edit mode and all content is replaced
- No backup of existing document content is created
- Consider impact on approved or processed documents

### ⚠️ Complete Document Replication
- **ALL document lines are copied from source to target**
- Line-level data, quantities, prices, and references are transferred
- Large documents may take significant time to process
- Ensure adequate system resources for processing

### ⚠️ Document Relationship Management
- Creates bidirectional relationship between source and target documents
- Target document reference is stored in specified source field
- Field type compatibility is enforced (BasicSCDocument or GenericReference)
- Invalid field types may cause reflection errors

### ⚠️ Source Document Selection
- Uses main document as source by default
- Parameter 5 allows specifying alternative source document field
- Source document must be valid and accessible
- Invalid source references cause processing failures

### ⚠️ Header Information Copying
- Common header data (dates, customer, amounts) is copied
- Warehouse and locator information is transferred
- Document-specific settings may need manual adjustment
- Review header data after document creation

### ⚠️ Business Process Impact
- Generated documents may enter workflows and approval processes
- Document creation may trigger additional business rules
- Consider impact on numbering sequences and document controls
- Ensure generated documents meet business requirements

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCDocFromDocCreator`

**Related Actions:**
- [EASCDocFromDocDeleter](EASCDocFromDocDeleter.md) - Deletes documents created by this action
- [EAGenSCDocFromDocWithFieldsMap](EAGenSCDocFromDocWithFieldsMap.md) - More configurable document generation


</div>

