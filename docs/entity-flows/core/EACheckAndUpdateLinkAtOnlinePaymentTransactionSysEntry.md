---
title: EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry
module: core
---

<div class='entity-flows'>

# EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry

**This document was generated using Claude.ai**

## Overview

Performs maintenance on online payment transaction entries by checking for expired payment links and updating their status. Processes valid payment links in batches and marks expired ones as "Expired".

## When This Action Runs

Scheduled maintenance task or manual execution on OnlinePaymentTransactionSysEntry entities with "Valid" link status. Typically run periodically to keep payment link statuses current.

## How It Works

1. **Finds all entries** with linkStatus = 'Valid'
2. **Processes in batches** of 300 records for efficiency
3. **Calculates expiry times** using OnlinePaymentUtils and payment configuration
4. **Compares with current time** to identify expired links
5. **Updates status** from "Valid" to "Expired" for expired entries
6. **Uses separate transactions** for each batch to ensure safety

## Key Parameters

**No Parameters Required** - Performs system-wide maintenance on all valid payment transaction entries automatically.

## Database Tables Affected

- **OnlinePaymentTransactionSysEntry** - `linkStatus` updated from "Valid" to "Expired"
- **OnlinePaymentConfig** - Referenced for expiry rules and timeouts

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry`

</div>

