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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenInvTransReq`

**Document Type:** Supply Chain Documents with Inventory Effects

**Related Utilities:** InvSystemFilesUtils, BusinessRequestUtils


</div>

