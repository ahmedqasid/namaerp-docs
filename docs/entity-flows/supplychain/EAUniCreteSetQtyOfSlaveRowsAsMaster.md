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

## Important Warnings

### ⚠️ Master-Slave Relationship Requirements
- **Only processes lines with valid masterRowId references**
- Slave lines without master row IDs are not affected
- Master row IDs must reference existing lines within the same document
- Ensure proper master-slave relationship setup before processing

### ⚠️ Master Line Validation
- **Master lines must exist within the same document**
- Missing master lines are handled gracefully (no changes made)
- Orphaned slave lines (with invalid master references) remain unchanged
- Review master-slave relationships for completeness

### ⚠️ Quantity Synchronization Logic
- **Prime quantity values are copied directly** from master to slave
- Only primary quantity values are synchronized
- Other quantity fields (secondary, alternative) are not affected
- Quantity unit of measure compatibility is assumed

### ⚠️ Document Line Structure Impact
- Changes affect inventory calculations and document totals
- Slave line quantity changes may impact pricing and costing
- Document validation may be triggered after quantity updates
- Consider impact on document approval and processing workflows

### ⚠️ Line Relationship Dependencies
- Assumes master-slave relationships are properly established
- Does not create or modify master-slave relationship assignments
- Relationship logic depends on external processes for setup
- Ensure relationship data integrity before quantity synchronization

### ⚠️ Quantity Data Type Handling
- **Copies exact decimal values** from master to slave quantities
- Precision and scale of quantities are preserved
- Large quantity values are handled according to system limits
- Review quantity precision requirements for business accuracy

### ⚠️ Processing Order Independence
- Processing order of lines does not affect synchronization results
- Master lines can be processed before or after their slaves
- All slave lines are updated regardless of their position in the document
- Line sequence changes do not impact synchronization logic

### ⚠️ Single Document Scope
- **Only synchronizes quantities within the same document**
- Cross-document master-slave relationships are not supported
- Document boundaries limit the scope of quantity synchronization
- Multi-document relationships require separate processing

### ⚠️ No Recursive Processing
- Does not handle nested master-slave relationships (slaves of slaves)
- Only direct master-slave relationships are processed
- Complex hierarchy relationships require multiple processing passes
- Consider relationship depth when designing line structures

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteSetQtyOfSlaveRowsAsMaster`

**Document Type:** Supply Chain Documents with Master-Slave Line Relationships

**Related Actions:**
- Master-slave line relationship management actions
- Document line quantity processing utilities
- Line synchronization entity flows


</div>

