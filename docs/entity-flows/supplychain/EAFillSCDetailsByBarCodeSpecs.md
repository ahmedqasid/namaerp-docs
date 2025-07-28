---
title: EAFillSCDetailsByBarCodeSpecs
module: supplychain
---


<div class='entity-flows'>

# EAFillSCDetailsByBarCodeSpecs

**This document was generated using Claude.ai**

## Overview

Parses barcode information from item codes and automatically fills document line details with item references and extracted properties. Uses configured barcode specifications to decode embedded information like quantities, dimensions, or other attributes from scanned barcodes.

## When This Action Runs

Manual execution on documents where item codes contain barcode data that needs to be parsed into actual item references and line properties, typically after barcode scanning in warehouse or POS operations.

## How It Works

1. **Processes document lines** - Iterates through all lines in the supply chain document
2. **Validates line state** - Only processes lines with item codes but no resolved item references
3. **Parses barcode data** - Uses DomainInvBarcodeParser to extract item code and properties from barcode
4. **Resolves item reference** - Finds the actual InvItem using the extracted item code
5. **Applies extracted properties** - Sets parsed values (quantity, dimensions, etc.) on the document line

## Parameters

This action does not require any parameters - it uses system-wide supply chain barcode configuration.

## Database Tables Affected

- **Document Lines** - Updates item references and line properties from barcode data
- **InvItem** - Reads item master records using extracted codes (read-only)
- **Supply Chain Configuration** - Uses barcode parsing specifications

## Important Warnings

### ⚠️ Barcode Configuration Dependency
- Requires proper barcode specifications configured in Supply Chain module
- Uses system-wide barcode parsing rules
- Barcode format must match configured patterns

### ⚠️ Line Processing Conditions
- Only processes lines with item codes but no resolved item references
- Lines with existing item references are skipped
- Empty item codes are ignored

### ⚠️ Item Resolution Requirements
- Extracted item codes must exist in InvItem master data
- Uses business code lookup for item resolution
- Invalid item codes leave lines unprocessed

### ⚠️ Property Extraction
- Extracted properties overwrite existing line values
- Property types must match expected line field types
- Invalid property values may cause processing errors

### ⚠️ Barcode Format Limitations
- Only works with configured barcode formats
- Complex or custom barcodes may not parse correctly
- Consider testing with representative barcode samples

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAFillSCDetailsByBarCodeSpecs`


</div>

