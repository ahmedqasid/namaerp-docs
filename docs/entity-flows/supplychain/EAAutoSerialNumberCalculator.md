---
title: EAAutoSerialNumberCalculator
module: supplychain
---


<div class='entity-flows'>

# EAAutoSerialNumberCalculator

**This document was generated using Claude.ai**

## Overview

Automatically generates sequential serial numbers for items in supply chain documents based on configurable prefix and number range. Supports both primary and secondary serial numbers with intelligent continuation from last used serial number for each item.

## When This Action Runs

Manual execution when items require serial number assignment during document processing. Typically used for production, receiving, or assembly documents where serialized inventory tracking is required.

## How It Works

1. **Processes document lines** - Identifies items requiring serial numbers with non-zero quantities
2. **Calculates prefix** - Uses Tempo template to generate dynamic prefix based on item properties
3. **Finds last serial** - Searches for highest existing serial number with matching prefix
4. **Generates new serials** - Creates sequential serial numbers starting from next available number
5. **Handles ranges** - For quantities > 1, generates range format like "PREFIX00001:PREFIX00005"
6. **Respects limits** - Stops generation if calculated number exceeds configured last number

## Parameters

**Parameter 1:** Prefix Template (Required) - Tempo syntax supporting item properties
Example: `{item.code}-{item.category.code}-`

**Parameter 2:** Suffix Length (Required) - Number of digits for numeric portion (default: 5)

**Parameter 3:** First Number (Optional) - Starting number for new series (default: 1)

**Parameter 4:** Last Number (Optional) - Maximum allowed number (default: based on suffix length)

**Parameter 5:** Use For First Serial (Optional) - true/false to generate primary serials (default: true)

**Parameter 6:** Use For Second Serial (Optional) - true/false to generate secondary serials (default: false)

## Database Tables Affected

- **ItemSerial** - Creates new serial number records for tracking
- **Document Line Tables** - Updates ItemSpecificDimensions with generated serials
- **Assembly Document Tables** - Updates assembly item serial numbers

## Important Warnings

### ⚠️ Serial Number Requirements
- Items must have HasSerial=true or HasTwoSerials=true flags enabled
- Only works with BasicSCDocument and AssemblyDocument types
- Zero quantities are skipped, uses absolute value for negatives

### ⚠️ Template and Prefix
- Invalid Tempo syntax or missing item properties cause failures
- Prefix changes reset numbering sequence to start value
- Case-sensitive prefix matching - ensure consistency

### ⚠️ Number Management
- Generation stops at configured last number (no overflow)
- Deleted serials leave permanent gaps in sequence
- Each item maintains independent serial numbering

### ⚠️ Range Handling
- Quantities > 1 generate range format "START:END"
- Range serials cannot be individually tracked or managed
- Existing serials are preserved, only empty fields populated

### ⚠️ Performance Considerations
- Searches all existing serials to find next number
- Complex templates and large serial databases impact speed
- Serial generation not transactional - monitor for partial failures

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoSerialNumberCalculator`


</div>