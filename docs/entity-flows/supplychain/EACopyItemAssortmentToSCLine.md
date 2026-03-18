---
title: EACopyItemAssortmentToSCLine
module: supplychain
---


<div class='entity-flows'>

# EACopyItemAssortmentToSCLine

**This document was generated using Claude.ai**

## Overview

Automatically copies item assortment information from the item's unit of measure configuration to document lines. Ensures lines inherit the correct assortment settings based on the selected UOM for accurate pricing and inventory management.

## When This Action Runs

Manual execution when document lines need to have assortment information populated from their item's UOM configuration, typically during document creation or item changes.

## How It Works

1. **Processes each line** - Iterates through all document lines
2. **Finds matching UOM** - Locates the item's UOM configuration matching the line's unit
3. **Checks assortment** - Verifies if the UOM has an associated item assortment
4. **Copies assortment** - Transfers the assortment reference to the document line
5. **Skips invalid lines** - Ignores lines without items or matching UOM configurations

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Document Lines** - Updates ItemAssortment field on line quantities
- **Item Master** - Reads PrimaryUnits configuration (read-only)
- **Item UOM Configuration** - Accesses assortment settings per UOM

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyItemAssortmentToSCLine`


</div>

