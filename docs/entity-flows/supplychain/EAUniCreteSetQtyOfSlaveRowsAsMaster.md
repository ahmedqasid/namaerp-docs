---
title: EAUniCreteSetQtyOfSlaveRowsAsMaster
module: supplychain
---


<div class='entity-flows'>

# EAUniCreteSetQtyOfSlaveRowsAsMaster

**This document was generated using Claude.ai**

## Overview

Synchronizes quantities of slave (dependent) document lines with their corresponding master lines. Finds all slave lines that have master row ID references and updates their quantities to match their master lines, ensuring consistency in master-slave line relationships.

## When This Action Runs

Manual execution on supply chain documents when slave line quantities need to be synchronized with master line quantities, typically used after quantity changes to master lines or when establishing consistent quantity relationships between related lines.

## How It Works

1. **Scans document lines** - Iterates through all document lines in the supply chain document
2. **Identifies slave lines** - Finds lines that have masterRowId field populated (indicating slave relationship)
3. **Locates master lines** - For each slave line, searches for the corresponding master line using the masterRowId
4. **Validates master existence** - Ensures the referenced master line exists in the document
5. **Synchronizes quantities** - Copies the primary quantity value from master line to slave line
6. **Updates prime quantity** - Sets the slave line's prime quantity value to match the master's value
7. **Continues processing** - Repeats for all slave lines in the document

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Updates quantity values for slave lines to match master lines
- **Line Quantity Data** - Modifies prime quantity values in slave line relationships

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteSetQtyOfSlaveRowsAsMaster`

**Document Type:** Supply Chain Documents with Master-Slave Line Relationships

**Related Actions:**
- Master-slave line relationship management actions
- Document line quantity processing utilities
- Line synchronization entity flows


</div>

