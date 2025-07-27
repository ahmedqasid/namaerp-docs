---
title: EAMakeCreationDateInValueDate
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateInValueDate

**This document was generated using Claude.ai**

## Overview

Synchronizes document creation dates with their value dates while preserving the original creation time, ensuring date consistency without losing timing information.

## When This Action Runs

Date synchronization for DocumentFile entities requiring creation date and value date alignment.

## How It Works

1. **Validates value date** exists on document (skips if missing)
2. **Compares date portions** of creation date and value date
3. **Extracts original time** from creation date for preservation
4. **Combines value date** with original creation time
5. **Updates creation date** with synchronized datetime maintaining time precision

## Parameters

**No Parameters Required** - This action requires no configuration

## Database Tables Affected

- **DocumentFile Creation Date** - Updates creation date field with synchronized date/time preserving original time
- **Document Date Consistency** - Ensures creation date and value date have same date portion
- **Self-Contained Operation** - Changes isolated to target document only

## Important Warnings

### ⚠️ Date Modification Impact
- Original creation date (date portion) is permanently modified
- Time portion preserved but date context changes
- May affect historical context and date-based queries

### ⚠️ Requirements
- Only works with DocumentFile entities
- Requires valid value date to perform synchronization
- Changes cannot be easily rolled back once applied

### ⚠️ Business Impact
- May affect business logic that depends on creation date
- May impact workflows using creation date for routing
- May affect integration with systems expecting original dates

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateInValueDate`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour
- [EAMakeCreationDateAlwaysBetween](EAMakeCreationDateAlwaysBetween.md) - Ensures creation time falls within specified hour range


</div>

