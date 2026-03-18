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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenAssemblyBOM`

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- BOM management entity flows
- Assembly structure utilities
- Item classification processing actions


</div>

