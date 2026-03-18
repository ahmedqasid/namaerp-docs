---
title: EASubolSetMasterRowIdOfFreeItems
module: supplychain
---


<div class='entity-flows'>

# EASubolSetMasterRowIdOfFreeItems

**This document was generated using Claude.ai**

## Overview

Establishes relationships between free items and their associated master items in sales documents. Links each free item line to the most recent non-free item line that precedes it, setting up proper master-detail relationships for promotional and bonus item tracking.

## When This Action Runs

Manual execution on sales documents containing free items that need to be linked to their qualifying master items, typically used after adding promotional items or when establishing proper relationships for free item tracking and reporting.

## How It Works

1. **Scans document lines** - Iterates through all sales lines starting from the second line
2. **Identifies free items** - Finds lines marked with freeLine = true
3. **Searches for master items** - For each free item line, searches backwards through previous lines
4. **Skips other free items** - Continues searching until finding a non-free item line
5. **Sets master relationship** - Links the free item to the found master item by setting:
   - masterRowId: ID of the master line
   - freeItemId: ID of the master item
6. **Continues processing** - Repeats for all free item lines in the document

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **SalesLine** - Updates masterRowId and freeItemId fields for free item lines
- **Item Data** - Reads master item information for relationship setup (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASubolSetMasterRowIdOfFreeItems`

**Document Type:** Sales Documents with Free Items

**Related Actions:**
- Free item management entity flows
- Promotional item processing utilities
- Sales line relationship management actions


</div>

