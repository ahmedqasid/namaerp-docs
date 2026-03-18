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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUpdateDeliveryStatusFromSalesDocToFromDoc`

**Document Type:** Sales Documents with Delivery Information

**Related Actions:**
- Delivery management entity flows
- Document relationship synchronization utilities
- Status update propagation actions


</div>

