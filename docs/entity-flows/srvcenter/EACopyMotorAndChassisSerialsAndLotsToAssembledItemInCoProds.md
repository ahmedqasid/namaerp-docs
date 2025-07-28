---
title: EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds
module: srvcenter
---


<div class='entity-flows'>

# EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds

**This document was generated using Claude.ai**

## Overview

Copies engine and chassis serial numbers and lot information from assembly document component lines to their corresponding co-product lines. Ensures that critical identification numbers (motor serials, chassis serials) are properly transferred from input components to the final assembled products.

## When This Action Runs

Manual execution on assembly documents where engine and chassis components need their serial numbers transferred to the assembled co-products. Typically used in automotive assembly or machinery manufacturing processes where tracking component serials in the final product is critical.

## How It Works

1. **Identifies key components** - Finds engine and chassis items from the assembly BOM
2. **Processes engine serials** - Copies engine serial numbers and lot IDs to co-products as primary serials
3. **Processes chassis serials** - Copies chassis serial numbers to co-products as secondary serials and lots as boxes
4. **Matches component lines** - Links assembly document lines to corresponding co-product lines
5. **Updates dimensions** - Sets specific dimensions (serial numbers, lots, boxes) on co-product lines
6. **Links records** - Updates text1 field with co-product line ID for reference tracking

## Parameters

This action does not require parameters - it works based on the assembly document's BOM configuration.

## Serial Number Mapping

- **Engine Item**: Serial → Primary Serial, Lot → Lot ID
- **Chassis Item**: Serial → Secondary Serial, Lot → Box

## Database Tables Affected

- **AssemblyDocumentLine** - Reads serial numbers and lots from component lines, updates text1 field
- **AssemblyDocCoProdLine** - Updates specific dimensions with copied serial numbers and lots
- **Assembly BOM** - References engine and chassis item definitions (read-only)

## Important Warnings

### ⚠️ BOM Dependency
- Requires properly configured assembly BOM with engine and chassis items defined
- Missing BOM configuration causes no processing to occur
- Incorrect BOM setup may cause wrong serial number assignments

### ⚠️ Component Identification
- Engine and chassis items must be correctly defined in the assembly BOM
- Uses exact item matching between assembly lines and BOM definitions
- Mismatched items result in no serial number copying

### ⚠️ Co-Product Line Matching
- Attempts to match co-product lines by ID stored in text1 field first
- Falls back to matching by assembly BOM inventory item if ID match fails
- Complex co-product structures may cause incorrect matching

### ⚠️ Serial Number Overwriting
- Overwrites existing serial numbers on co-product lines without warning
- No backup or validation of existing serial data
- May lose previously entered serial information

### ⚠️ Dimension Updates
- Modifies specific dimensions on co-product lines directly
- Changes affect inventory tracking and serialization
- Updates may trigger downstream inventory effects

### ⚠️ Engine vs Chassis Logic
- Different handling for engine (first serial) and chassis (second serial)
- Lot information mapped differently for each component type
- Incorrect component classification may cause wrong field assignments

### ⚠️ No Parameter Validation
- Action ignores any provided parameters
- All logic based on assembly document structure
- Cannot customize behavior through parameters

### ⚠️ Silent Processing
- No error reporting if components or co-products not found
- Processing continues even if some items cannot be matched
- May appear successful even with partial failures

### ⚠️ Text1 Field Usage
- Uses text1 field to store co-product line ID references
- May overwrite existing text1 content
- Consider impact on other processes using text1 field

### ⚠️ Lot vs Box Conversion
- Chassis lot information stored as box data
- String conversion may cause data format issues
- Verify box field compatibility with lot data types

### ⚠️ Assembly Document State
- No validation of document state before processing
- May modify committed or locked assembly documents
- Consider document workflow restrictions

### ⚠️ Multi-Line Component Handling
- Processes all assembly lines matching engine/chassis items
- Multiple lines for same component may cause conflicts
- Ensure component quantities and lines align with business logic

### ⚠️ Co-Product Structure Assumptions
- Assumes co-products exist and are properly structured
- Missing co-product lines cause processing to skip items
- Complex multi-level assemblies may not be handled correctly

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds`


</div>

