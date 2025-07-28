---
title: EAUpdateDeliveryStatusFromSalesDocToFromDoc
module: supplychain
---


<div class='entity-flows'>

# EAUpdateDeliveryStatusFromSalesDocToFromDoc

**This document was generated using Claude.ai**

## Overview

Updates delivery status information in parent sales documents based on changes in the current document. Synchronizes delivery-related fields (status, car, driver, date, time) between child and parent documents, ensuring that delivery information flows back to the original order when processing delivery notes or shipping documents.

## When This Action Runs

Automatic execution on sales documents when delivery information changes, typically triggered during delivery note processing, shipment confirmation, or when updating delivery status to keep parent orders synchronized with actual delivery details.

## How It Works

1. **Processes old document lines** - For each line in the previous version of the document:
   - Finds the corresponding parent line in the source document
   - Clears delivery information (status, car, driver, date, time) in the parent line
   - Resets delivery fields to empty/null values
2. **Processes current document lines** - For each line in the current document:
   - Finds the corresponding parent line in the source document
   - Copies all delivery information from current line to parent line:
     - Delivery status
     - Car assignment
     - Driver assignment
     - Delivery date
     - Delivery time
3. **Updates parent documents** - Changes are applied directly to parent document lines
4. **Returns success** - Processing completes without validation errors

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Parent Sales Document Lines** - Updates delivery status fields in original order lines
- **Delivery Status Data** - Synchronizes status, car, driver, date, and time information
- **Document Relationships** - Uses parent-child document relationships for updates

## Important Warnings

### ⚠️ Parent Document Requirements
- **Requires valid parent document relationships** for all lines
- Lines without parent references are skipped silently
- Parent documents must be accessible and editable
- Ensure proper document relationship setup before processing

### ⚠️ Two-Phase Update Process
- **First phase clears old delivery data** from parent lines
- **Second phase applies new delivery data** to parent lines
- This ensures accurate updates even when lines are modified or removed
- Both old and new line states are processed for complete synchronization

### ⚠️ Sales Line Type Validation
- Only processes lines that are SalesLine instances
- Other line types in the document are ignored
- Parent lines must also be SalesLine type for updates
- Mixed line type documents may have partial updates

### ⚠️ Delivery Field Synchronization
- **All delivery fields are updated as a set**:
  - DeliveryStatus - Current delivery state
  - Car - Vehicle assignment for delivery
  - Driver - Driver assignment for delivery
  - DeliveryDate - Scheduled or actual delivery date
  - DeliveryTime - Scheduled or actual delivery time
- Partial field updates are not supported

### ⚠️ Parent Document State Impact
- **Parent documents are modified directly** without validation
- Changes may trigger business rules in parent documents
- Parent document approval status may be affected
- Consider impact on parent document workflows

### ⚠️ No Rollback Capability
- Changes to parent documents are immediate and permanent
- No automatic rollback if processing fails partway
- Parent documents may be left in inconsistent state on errors
- Ensure data integrity before processing

### ⚠️ Document History Considerations
- Uses fetchOldDetails() to get previous line states
- Requires proper document history tracking
- Missing history data may cause incomplete updates
- Document versioning must be properly configured

### ⚠️ Performance Impact
- Updates multiple parent documents in single operation
- Large documents with many lines affect multiple parents
- No batch optimization for parent document updates
- Consider performance impact for high-volume processing

### ⚠️ Concurrent Access Issues
- Parent documents may be locked by other users
- Concurrent updates to parent documents may fail
- No retry mechanism for locked documents
- Monitor for update conflicts in multi-user environments

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUpdateDeliveryStatusFromSalesDocToFromDoc`

**Document Type:** Sales Documents with Delivery Information

**Related Actions:**
- Delivery management entity flows
- Document relationship synchronization utilities
- Status update propagation actions


</div>

