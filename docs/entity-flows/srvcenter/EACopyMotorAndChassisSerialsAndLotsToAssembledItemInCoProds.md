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

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EACopyMotorAndChassisSerialsAndLotsToAssembledItemInCoProds`


</div>

