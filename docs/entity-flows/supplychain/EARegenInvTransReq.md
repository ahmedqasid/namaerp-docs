---
title: EARegenInvTransReq
module: supplychain
---


<div class='entity-flows'>

# EARegenInvTransReq

**This document was generated using Claude.ai**

## Overview

Regenerates and processes inventory transaction requests for supply chain documents by creating fresh inventory transaction requests and sending them through the business request system. Rebuilds the complete inventory impact of the document by generating new transaction requests and executing post-request creation actions.

## When This Action Runs

Manual execution on supply chain documents when inventory transaction requests need to be regenerated, typically after document corrections, inventory system issues, or when inventory effects appear incorrect and need to be rebuilt from scratch.

## How It Works

1. **Generates inventory requests** - Uses InvSystemFilesUtils to create fresh inventory transaction requests
2. **Processes each request** - Iterates through all generated inventory transaction requests
3. **Sets request type** - Configures each request as a "Create" transaction type
4. **Sets current context** - Associates the request with the document for processing
5. **Runs post-creation actions** - Executes entity actions for post-request creation processing
6. **Sends business requests** - Submits each request through the business request system
7. **Accumulates results** - Collects success/failure results from all request processing

## Parameters

This action does not require any parameters - it automatically regenerates all inventory transaction requests for the document.

## Database Tables Affected

- **Inventory Transaction Requests** - Creates new inventory transaction requests
- **Inventory Transaction History** - Records inventory movements and changes
- **Item Quantities** - Updates available, allocated, and on-hand quantities
- **Inventory Locations** - Updates warehouse and location-specific quantities
- **Business Request Queue** - Queues inventory requests for processing

## Important Warnings

### ⚠️ Document Type Requirements
- Only works on BasicSCDocument types (supply chain documents)
- Document must have inventory effects (stock issues, receipts, transfers)
- Requires valid item references and inventory configuration
- Non-inventory documents will not generate transaction requests

### ⚠️ Inventory Request Regeneration
- Completely regenerates all inventory transaction requests for the document
- Previous inventory requests may be duplicated or conflicted
- May cause double inventory effects if not properly managed
- Consider existing inventory state before regeneration

### ⚠️ Business Request Processing
- Each inventory request is processed through the business request system
- Request processing may fail due to inventory constraints or validation
- Failed requests are accumulated in the result but processing continues
- Review all result messages for complete issue resolution

### ⚠️ Inventory Impact Considerations
- May cause significant changes to inventory quantities and allocations
- Could affect inventory availability for other documents and processes
- Changes impact inventory valuation and cost calculations
- Consider impact on material planning and stock management

### ⚠️ System Integration Dependencies
- Relies on InvSystemFilesUtils for request generation logic
- Uses BusinessRequestUtils for request processing
- Depends on proper inventory system configuration
- May trigger additional inventory-related business processes

### ⚠️ Post-Creation Action Execution
- Runs PostInvTransReqRequestCreation entity actions for each request
- Additional business logic may be executed during processing
- Post-creation actions may have their own side effects
- Ensure all related entity actions are properly configured

### ⚠️ Error Accumulation Pattern
- Uses accumulating result pattern to collect all processing issues
- Individual request failures don't stop processing of remaining requests
- Partial success scenarios are possible
- Review complete result set for full understanding of processing outcome

### ⚠️ Performance and Resource Impact
- Processing multiple inventory requests may be resource-intensive
- Large documents with many lines may take significant time
- Database locking may occur during inventory quantity updates
- Monitor system performance during execution

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenInvTransReq`

**Document Type:** Supply Chain Documents with Inventory Effects

**Related Utilities:** InvSystemFilesUtils, BusinessRequestUtils


</div>

