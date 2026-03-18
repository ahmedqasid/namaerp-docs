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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAPreventChangingSCDocumentCriticalFields`

**Validation Type:** Data Integrity Control

**Protected Field Categories:**
- Inventory quantities and units
- Item dimensions (size, color, revision)  
- Lot and serial tracking information
- Other business-critical identifiers


</div>

