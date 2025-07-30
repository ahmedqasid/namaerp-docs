---
title: ValidateSorceLinesOfFromDocAction
module: supplychain
---


<div class='entity-flows'>

# ValidateSorceLinesOfFromDocAction

**This document was generated using Claude.ai**

## Overview

Validates that all lines in the current document have corresponding source lines in the parent document when the document is based on another document (fromDoc relationship). Ensures document integrity by preventing orphaned lines that reference non-existent source lines, maintaining proper document relationships and traceability.

## When This Action Runs

Validation action executed during document save or processing when the document has a fromDoc relationship, typically used in document workflows where child documents (invoices, delivery notes, receipts) must maintain references to parent document lines.

## How It Works

1. **Checks for source document** - Verifies if the document has a fromDoc reference:
   - If no fromDoc exists, validation passes (standalone document)
   - If fromDoc exists, proceeds with validation
2. **Validates source document type** - Ensures the source document is a BasicSCDocument:
   - If wrong type, validation passes (not applicable)
   - If correct type, proceeds with line validation
3. **Processes each document line** - Iterates through all lines in the current document
4. **Validates source line reference** - For each line:
   - Extracts the sourceLineId from the current line
   - Searches for matching line in source document using the ID
   - Records error if no matching source line is found
5. **Accumulates validation errors** - Collects all orphaned line errors with line numbers
6. **Returns validation result** - Success if all lines have valid sources, failure with details if orphaned lines exist

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Reads sourceLineId for validation (read-only)
- **Document Relationships** - Reads fromDoc references (read-only)
- **Source Document Lines** - Searches source document line collection (read-only)

## Important Warnings

### ⚠️ Source Document Requirements
- **Only validates documents with fromDoc relationships**
- Standalone documents bypass validation entirely
- Source document must be accessible and properly loaded
- Missing or inaccessible source documents cause validation failures

### ⚠️ Document Type Validation
- Source document must be BasicSCDocument or subclass
- Other document types are silently ignored
- Type mismatch allows validation to pass without checking
- Ensure proper document type hierarchy for validation

### ⚠️ Source Line ID Dependencies
- **Every line must have valid sourceLineId** for proper validation
- Null or empty sourceLineId values may cause lookup failures
- Source line IDs must match exactly with parent document
- Ensure proper ID assignment during document creation

### ⚠️ Line Number Error Reporting
- Error messages use 1-based line numbering for user display
- Internal processing uses 0-based indexing
- Line number mismatches may confuse troubleshooting
- Cross-reference error messages with actual line positions

### ⚠️ Validation Only Action
- **Does not modify document data in any way**
- Only reports validation errors without fixing issues
- Manual correction required to resolve orphaned lines
- No automatic source line assignment capability

### ⚠️ Error Accumulation Pattern
- **Continues validation after finding errors**
- All orphaned lines are reported in single result
- Document remains in error state until all issues resolved
- May produce multiple error messages for systematic problems

### ⚠️ Performance Considerations
- **Linear search through source document lines** for each validation
- Performance degrades with large source documents
- No optimization for repeated lookups
- Consider impact on documents with many lines

### ⚠️ Document State Dependencies
- Source document must be in consistent state for validation
- Source document line collection must be properly loaded
- Lazy loading issues may cause false validation failures
- Ensure complete document initialization before validation

### ⚠️ Reference Integrity
- **Only validates that references exist, not their validity**
- Does not check if source lines are appropriate for current context
- Does not validate quantities, items, or other line details
- Additional validation may be needed for complete integrity

### ⚠️ Document Workflow Impact
- Failed validation prevents document save or processing
- Orphaned lines must be removed or source lines restored
- May block legitimate business scenarios if source document changed
- Consider workflow implications of strict reference validation

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.ValidateSorceLinesOfFromDocAction`


</div>

