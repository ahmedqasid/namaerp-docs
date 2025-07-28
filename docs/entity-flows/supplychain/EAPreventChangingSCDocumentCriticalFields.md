---
title: EAPreventChangingSCDocumentCriticalFields
module: supplychain
---


<div class='entity-flows'>

# EAPreventChangingSCDocumentCriticalFields

**This document was generated using Claude.ai**

## Overview

Enforces data integrity by preventing modifications to critical fields in supply chain document lines after the document has been committed for the first time. Compares current line data with original committed data and blocks changes to quantity, size, color, and other essential fields that affect inventory and business logic.

## When This Action Runs

Automatic execution during document save/commit operations to validate that critical fields have not been modified since the document was first committed. This is a data integrity validation that runs before allowing document updates.

## How It Works

1. **Checks for existing data** - Verifies document has previous committed version (oldData exists)
2. **Retrieves original lines** - Gets the document lines from the original committed version
3. **Compares current vs original** - Uses built-in validation to compare current lines with original lines
4. **Validates critical fields** - Checks that protected fields have not been changed
5. **Blocks unauthorized changes** - Returns validation errors if critical fields were modified

## Parameters

This action does not require any parameters - it automatically protects predefined critical fields.

## Database Tables Affected

- **Document Lines** - Validates current line data against original committed data (read-only validation)

## Important Warnings

### ⚠️ Critical Field Protection
- Prevents changes to quantity, size, color, revision, lot ID, and other inventory-affecting fields
- Protection activates only after first document commit
- New documents (never committed) are not restricted
- Field protection is hardcoded in business logic

### ⚠️ Data Integrity Enforcement
- Validation failures prevent document save operations
- Error messages do not display entity flow name for cleaner user experience
- Changes must be reverted or document recreated to proceed
- No override mechanism available through parameters

### ⚠️ Business Process Impact
- May prevent legitimate business corrections after document commitment
- Users cannot modify critical inventory data once document is saved
- Consider business workflow requirements before implementing
- May require alternative processes for legitimate corrections

### ⚠️ Document Lifecycle Dependency
- Only applies to documents with committed history (oldData exists)
- New document creation is not affected
- Document cloning may bypass restrictions depending on implementation
- Consider impact on document revision workflows

### ⚠️ Error Handling Behavior
- Validation errors prevent entire document save operation
- Partial saves are not possible when critical fields are changed
- Users must revert all restricted changes to proceed
- Error messages focus on field restrictions rather than action name

### ⚠️ Field Scope Limitations
- Protection applies to predefined set of critical fields
- Cannot be customized through parameters
- Additional field protection requires code modifications
- Non-critical fields remain editable after commitment

### ⚠️ Integration Considerations
- May conflict with bulk update operations
- Import processes may fail if updating committed documents
- API integrations must respect field restrictions
- Consider impact on automated document processing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAPreventChangingSCDocumentCriticalFields`

**Validation Type:** Data Integrity Control

**Protected Field Categories:**
- Inventory quantities and units
- Item dimensions (size, color, revision)  
- Lot and serial tracking information
- Other business-critical identifiers


</div>

