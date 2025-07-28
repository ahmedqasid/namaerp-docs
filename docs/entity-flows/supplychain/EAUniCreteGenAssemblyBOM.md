---
title: EAUniCreteGenAssemblyBOM
module: supplychain
---


<div class='entity-flows'>

# EAUniCreteGenAssemblyBOM

**This document was generated using Claude.ai**

## Overview

Generates assembly Bill of Materials (BOMs) for items based on partial BOM templates and item class matching. Processes items within a specified item class or section, matches them with appropriate partial BOMs based on class hierarchy, and creates complete assembly BOMs by combining matching partial BOM components.

## When This Action Runs

Manual execution on item classes or sections when assembly BOMs need to be automatically generated from partial BOM templates, typically used for bulk BOM creation, standardization of assembly structures, or updating BOMs based on item classification changes.

## How It Works

1. **Validates input entity** - Ensures the target is an item class or item section
2. **Prevents concurrent execution** - Uses locking mechanism to prevent multiple simultaneous runs
3. **Identifies affected items** - Lists all items that belong to the specified class or section
4. **Loads partial BOMs** - Retrieves all partial assembly BOM templates from the system
5. **Processes each item** - For each affected item:
   - Gets the item's complete class hierarchy
   - Finds matching partial BOMs where item classes contain all BOM classes
   - Creates or updates the assembly BOM for the item
   - Converts partial BOM lines to assembly BOM lines
   - Sets item code, UOM, and other BOM properties
   - Commits the assembly BOM to the database
6. **Uses transactions** - Processes each item in separate transactions for error isolation
7. **Tracks progress** - Updates status messages during processing

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **AssemblyBOM** - Creates new or updates existing assembly BOMs
- **AssemblyBOMLine** - Creates component lines from partial BOM templates
- **PartialAssemblyBOM** - Reads partial BOM templates (read-only)
- **InvItem** - Reads item information and class hierarchy (read-only)
- **Item Classes** - Uses item classification for BOM matching (read-only)

## Important Warnings

### ⚠️ Input Entity Requirements
- **Only works with item class or item section entities**
- Entity must implement IIsItemClass interface
- Invalid entity types cause immediate processing failure
- Ensure proper entity type before execution

### ⚠️ Concurrent Execution Prevention
- **Only one instance can run at a time**
- Additional execution attempts are blocked with status message
- Long-running processes may block other users
- Monitor execution progress and completion

### ⚠️ Bulk Processing Scale
- Processes all items within the specified class or section
- Large item classes may take significant time to process
- System resources are consumed during bulk operations
- Consider system load and timing for large-scale operations

### ⚠️ Class Hierarchy Matching Logic
- **Partial BOMs are matched based on item class containment**
- Item must contain ALL classes specified in the partial BOM
- Complex class hierarchies may match multiple partial BOMs
- Review class structure and partial BOM setup for accurate matching

### ⚠️ BOM Replacement Behavior
- **Existing assembly BOMs are completely replaced**
- All existing BOM lines are cleared before adding new ones
- Previous BOM data is lost without backup
- Consider backing up existing BOMs before processing

### ⚠️ Partial BOM Template Dependencies
- Requires properly configured partial assembly BOMs
- Partial BOMs must have correct item class assignments
- Missing or incorrectly configured partial BOMs affect results
- Ensure partial BOM templates are complete and accurate

### ⚠️ Transaction Processing
- Each item is processed in a separate transaction
- Individual item failures don't affect other items
- Failed items are skipped but processing continues
- Review results for any failed item processing

### ⚠️ Item Classification Requirements
- Items must have proper item class assignments
- Class hierarchy affects BOM matching and generation
- Missing or incorrect item classes prevent proper BOM creation
- Ensure accurate item classification before processing

### ⚠️ BOM Line Conversion
- Partial BOM lines are converted to assembly BOM lines
- Component quantities, items, and specifications are transferred
- Conversion may affect precision or formatting
- Review generated BOMs for accuracy

### ⚠️ System Performance Impact
- Large-scale BOM generation is resource-intensive
- Database transactions and commits increase system load
- Processing time increases with number of affected items
- Monitor system performance during execution

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenAssemblyBOM`

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- BOM management entity flows
- Assembly structure utilities
- Item classification processing actions


</div>

