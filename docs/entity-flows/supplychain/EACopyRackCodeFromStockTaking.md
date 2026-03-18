---
title: EACopyRackCodeFromStockTaking
module: supplychain
---


<div class='entity-flows'>

# EACopyRackCodeFromStockTaking

**This document was generated using Claude.ai**

## Overview

Updates item rack location codes in the item master based on rack codes entered during stock taking. Copies the rack code from the Text1 field in stock taking lines to the item's warehouse-specific dimension data.

## When This Action Runs

Manual execution on stock taking documents after rack codes have been entered in the Text1 field of document lines, typically during physical inventory counts or warehouse reorganization.

## How It Works

1. **Collects rack codes** - Gathers Text1 values from all stock taking lines
2. **Maps to items** - Creates mapping of items to their new rack codes
3. **Opens item records** - Starts editing each affected item master record
4. **Updates warehouse data** - Finds matching warehouse dimensions and updates rack codes
5. **Commits changes** - Saves updated rack codes to item master records

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **InvItem** - Updates item master records with new rack codes
- **ItemDimensionsDetail** - Modifies rack code in warehouse-specific dimensions
- **StockTakingDetails** - Reads rack codes from Text1 field (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyRackCodeFromStockTaking`


</div>

