---
title: EAAutoGroupCloneItemFromPO
module: supplychain
---


<div class='entity-flows'>

# EAAutoGroupCloneItemFromPO

**This document was generated using Claude.ai**

## Overview

Converts multi-quantity document lines into individual single-quantity lines by creating separate line entries and unique item codes for each quantity unit. For each line with quantity greater than 1, creates multiple individual lines each with quantity 1, and generates new unique item codes for the cloned items.

## When This Action Runs

Manual execution when purchase orders or other supply chain documents need to be converted from grouped quantities to individual item tracking. Typically used when items require individual serial numbers, unique identification, or separate processing for each unit.

## How It Works

1. **Processes lines in reverse order** - Iterates through document lines from bottom to top
2. **Identifies multi-quantity lines** - Finds lines with quantity greater than 1
3. **Reduces original quantity** - Sets original line quantity to 1
4. **Creates individual lines** - Clones the original line for each additional quantity unit
5. **Generates unique items** - Creates new item master records for each cloned line
6. **Assigns unique codes** - Generates new item codes using "ABCEDFG" prefix + item ID
7. **Updates document calculations** - Recalculates totals and fields after line modifications

## Parameters

This action does not require parameters - it works automatically based on document line quantities.

## Database Tables Affected

- **Document Lines** - Creates multiple new lines from single multi-quantity lines
- **InvItem** - Creates new item master records for each cloned line
- **Document Header** - Updates calculated fields and totals


**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoGroupCloneItemFromPO`


</div>

