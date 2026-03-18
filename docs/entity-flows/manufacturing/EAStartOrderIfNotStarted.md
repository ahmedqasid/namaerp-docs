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

**Module:** manufacturing

**Full Class Name:** `com.namasoft.modules.manufacturing.domain.utils.plugnplay.EAStartOrderIfNotStarted`


</div>

