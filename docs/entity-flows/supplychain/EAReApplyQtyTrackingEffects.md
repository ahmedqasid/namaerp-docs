---
title: EAReApplyQtyTrackingEffects
module: supplychain
---


<div class='entity-flows'>

# EAReApplyQtyTrackingEffects

**This document was generated using Claude.ai**

## Overview

Recalculates and reapplies quantity tracking effects for supply chain documents by treating the document as if it were being inserted for the first time. Updates satisfied quantities between related documents to ensure accurate quantity tracking relationships after data corrections or system changes.

## When This Action Runs

Manual execution when quantity tracking relationships need to be rebuilt, typically after data migration, system updates, document corrections, or when quantity tracking appears incorrect due to system issues.

## How It Works

1. **Identifies source document** - Gets the fromDoc (source document) that this document is related to
2. **Processes document lines** - Iterates through all lines in the current document
3. **Calculates satisfied quantities** - Uses SCRelatedQtiesUtil to determine how much quantity each line satisfies from the source
4. **Updates tracking relationships** - Applies quantity tracking effects as if document was newly created
5. **Maintains data consistency** - Ensures quantity relationships are accurately reflected in the system

## Parameters

This action does not require any parameters - it automatically recalculates quantity tracking based on document relationships.

## Database Tables Affected

- **Related Quantity Tracking Tables** - Updates quantity satisfaction relationships between documents
- **Document Lines** - May update satisfied quantity fields on source and target documents
- **Supply Chain Tracking** - Recalculates quantity fulfillment status

## Important Warnings

### ⚠️ Document Relationship Dependencies
- Requires valid fromDoc (source document) relationship
- Only works on documents that have quantity tracking relationships
- Source document must be accessible and committed
- Documents without source relationships are not processed

### ⚠️ Quantity Tracking Recalculation
- Completely recalculates quantity satisfaction relationships
- May change existing satisfied quantity values
- Updates both forward and backward quantity tracking
- Can affect multiple related documents in the chain

### ⚠️ Data Consistency Impact
- Changes may affect inventory availability calculations
- Can impact other documents that depend on quantity tracking
- May affect document fulfillment status and workflows
- Consider impact on pending orders and allocations

### ⚠️ System Performance Considerations
- Processing involves complex quantity calculations
- Large documents with many lines may take significant time
- May trigger recalculation of related document chains
- Monitor system resources during execution

### ⚠️ Business Logic Dependencies
- Relies on SCRelatedQtiesUtil for quantity calculations
- Uses standard supply chain quantity tracking rules
- May not account for custom quantity tracking logic
- Ensure business rules align with standard calculations

### ⚠️ Error Accumulation Pattern
- Uses accumulating result pattern to collect all issues
- Processing continues even if individual line errors occur
- Review all error messages for complete issue resolution
- Partial success scenarios are possible

### ⚠️ Timing and Execution Context
- Should be executed when related documents are stable
- Avoid running during peak business processing times
- Consider impact on concurrent document operations
- May require exclusive access during processing

### ⚠️ Audit and Traceability Impact
- Changes quantity tracking without creating audit trail
- May affect document history and change tracking
- Consider logging requirements for quantity adjustments
- Document business justification for quantity recalculation

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAReApplyQtyTrackingEffects`

**Processing Type:** Quantity Relationship Recalculation

**Related Utilities:** SCRelatedQtiesUtil for quantity calculations


</div>

