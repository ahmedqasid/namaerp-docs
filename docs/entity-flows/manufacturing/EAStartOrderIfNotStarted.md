---
title: EAStartOrderIfNotStarted
module: manufacturing
---


<div class='entity-flows'>

# EAStartOrderIfNotStarted

**This document was generated using Claude.ai**

## Overview

Automatically starts production orders that are still in initial status by changing their status to "In Progress". This ensures production orders can begin processing if they haven't been started yet, while leaving already started orders unchanged.

## When This Action Runs

Manual execution on production orders or automated workflow triggers when orders need to transition from initial state to active production. Typically used in batch processing scenarios or when resuming operations after system downtime.

## How It Works

1. **Checks order status** - Examines if the production order is in initial status
2. **Conditionally updates status** - If status is initial, changes it to "In Progress"
3. **Preserves existing status** - If order is already started, no changes are made
4. **Returns success** - Always returns successful result regardless of status change

## Parameters

This action accepts optional parameters but does not use them. All functionality is based on the production order's current status.

## Database Tables Affected

- **ProductionOrder** - Updates the status field from initial to in-progress
- **Status Tracking Tables** - May update order status history if configured

## Important Warnings

### ⚠️ Status Check Logic
- Only affects orders with initial status
- Orders already in progress, completed, or cancelled remain unchanged
- No validation of order readiness before starting

### ⚠️ Automatic Status Change
- Changes status without user confirmation
- May start orders that aren't fully prepared
- No rollback mechanism if order shouldn't be started

### ⚠️ No Parameter Validation
- Accepts parameters but ignores them
- All logic based solely on current order status
- Cannot customize behavior through parameters

### ⚠️ Business Rule Bypassing
- May bypass normal order validation processes
- Doesn't check for required materials or capacity
- Consider impact on production planning

### ⚠️ Status History
- Status change may trigger status history updates
- Audit trails will show automated status change
- Consider impact on reporting and tracking

### ⚠️ Workflow Integration
- Starting orders may trigger downstream processes
- Material reservations, scheduling, or notifications may be activated
- Ensure dependent systems are ready

### ⚠️ Batch Processing Considerations
- Safe to run on multiple orders simultaneously
- Each order processed independently
- No cross-order dependencies or validations

### ⚠️ Production Impact
- Starting orders may allocate resources immediately
- Shop floor systems may begin displaying work orders
- Consider timing with production schedules

### ⚠️ Initial Status Definition
- Depends on proper initial status identification
- Custom status configurations may affect behavior
- Verify status logic matches business requirements

### ⚠️ No Error Handling
- Always returns success result
- Doesn't validate order data before status change
- May succeed even if order has data issues

**Module:** manufacturing

**Full Class Name:** `com.namasoft.modules.manufacturing.domain.utils.plugnplay.EAStartOrderIfNotStarted`


</div>

