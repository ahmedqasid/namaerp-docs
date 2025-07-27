---
title: EAMakeCreationDateAlwaysBefore
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBefore

**This document was generated using Claude.ai**

## Overview

Adjusts document creation dates to ensure they always occur before a specified hour by synchronizing with value date and subtracting random milliseconds.

## When This Action Runs

Document date enforcement for DocumentFile entities requiring creation time constraints within business hour limitations.

## How It Works

1. **Validates document value date** and synchronizes creation date with it
2. **Compares creation hour** with specified maximum hour
3. **Subtracts random milliseconds** backward until time is before specified hour
4. **Protects start-of-day boundary** to prevent invalid times
5. **Updates creation date** maintaining consistency with value date

## Parameters

**Parameter 1:** Hour (Required) - Maximum hour (0-23) before which creation time must occur (default: 12 if empty)

## Database Tables Affected

- **DocumentFile Creation Date** - Updates creation date field with adjusted time aligned to value date
- **Document Date Fields** - Synchronizes related date fields for consistency
- **Self-Contained Operation** - Changes isolated to target document only

## Important Warnings

### ⚠️ Document Timing Integrity
- Original creation time is permanently modified
- May affect time-based document sequences
- Changed creation times may have audit implications

### ⚠️ Requirements
- Only works with DocumentFile entities
- Requires valid value date on the document
- Hour parameter must be valid (0-23)

### ⚠️ Business Impact
- May impact workflows dependent on precise creation timing
- May affect calculations dependent on creation time
- May affect integration with systems expecting original times

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBefore`

**Related Actions:**
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>

