---
title: EAUniCreteGenItems
module: supplychain
---


<div class='entity-flows'>

# EAUniCreteGenItems

**This document was generated using Claude.ai**

## Overview

Generates inventory items automatically based on item class hierarchies and relationships. Creates a comprehensive tree of all possible item combinations from the specified item section or class, applies business rules and restrictions, then creates or updates inventory items with proper classifications, UOM groups, and configurations.

## When This Action Runs

Manual execution on item sections or item classes when bulk item generation is needed, typically used for creating standardized item catalogs, populating new item hierarchies, or maintaining consistency across item classifications and relationships.

## How It Works

1. **Validates input entity** - Ensures target is an item class or section with proper item section reference
2. **Prevents concurrent execution** - Uses locking mechanism to prevent multiple simultaneous runs
3. **Builds item class tree** - Loads all item classes (1-10) related to the specified section
4. **Creates hierarchical tree** - Constructs tree structure representing all class relationships
5. **Processes tree relationships** - Handles null children and copies relationships appropriately
6. **Collects item combinations** - Generates all possible item data combinations from tree leaf nodes
7. **Applies business filters** - Removes incompatible combinations based on:
   - Item class relationships and restrictions
   - Allow/disallow rules defined in item class ranges
   - Section compatibility and hierarchy constraints
8. **Creates/updates items** - For each valid combination:
   - Finds existing item or creates new one
   - Sets all item class assignments (section, class1-10)
   - Applies UOM group configurations from class hierarchy
   - Copies unit of measure definitions and conversions
   - Sets item configurations from section settings
9. **Handles deletion marking** - Optionally marks or deletes items not in generated set

## Parameters

**Parameter 1:** Test Only (Optional) - true to skip item creation, empty to create items

**Parameter 2:** Log Into Field (Optional) - Field name to log generation details and tree structure

**Parameter 3:** Mark Items for Deletion (Optional) - true to mark unused items in description5 field

**Parameter 4:** Delete Unneeded Items (Optional) - true to actually delete items not in generated set

## Database Tables Affected

- **InvItem** - Creates new items or updates existing item classifications
- **Item Classes (1-10)** - Reads class hierarchies and relationships (read-only)
- **ItemSection** - Reads section configurations and settings (read-only)
- **UOMGroup** - Reads unit of measure group configurations (read-only)
- **ItemClassRange** - Reads allow/disallow relationship rules (read-only)

## Important Warnings

### ⚠️ Input Entity Requirements
- **Only works with item class or item section entities**
- Entity must have valid item section reference
- Invalid entities cause immediate processing failure
- Ensure proper entity type and section assignment

### ⚠️ Concurrent Execution Prevention
- **Only one instance can run at a time system-wide**
- Additional execution attempts are blocked with status message
- Long-running processes may block other users for extended periods
- Monitor execution progress and completion carefully

### ⚠️ Massive Item Generation Scale
- **Can generate thousands of items** from complex class hierarchies
- Processing time increases exponentially with class complexity
- System resources are heavily consumed during bulk operations
- Consider system capacity and timing for large-scale generation

### ⚠️ Item Class Relationship Logic
- Uses complex tree algorithms to determine valid item combinations
- Allow/disallow rules in item class ranges affect final item set
- Incompatible class combinations are automatically filtered out
- Review class relationship setup for accurate item generation

### ⚠️ UOM Group Integration
- **Automatically assigns UOM groups** from item class hierarchy
- Copies unit definitions, conversions, and default units to items
- Multiple UOM groups can be referenced in item ref fields
- UOM setup errors may affect item usability

### ⚠️ Item Deletion Capabilities
- **Can mark or delete existing items** not in the generated set
- Deletion is permanent and cannot be undone
- Items with dependencies may prevent deletion
- Test with marking before using actual deletion

### ⚠️ Tree Structure Complexity
- Builds complex tree structures to represent class relationships
- Null class handling may create unexpected item combinations
- Tree processing affects final item combinations
- Review tree structure logging for understanding results

### ⚠️ Business Rule Enforcement
- Applies allow/disallow rules from item class range configurations
- Complex business logic may filter out expected items
- Rule conflicts may prevent item generation
- Ensure business rules are properly configured

### ⚠️ Transaction Processing
- Each item is processed in separate transactions
- Individual item failures don't affect other items
- Failed items are skipped but processing continues
- Review results for any failed item processing

### ⚠️ Configuration Inheritance
- **Items inherit configurations from item section settings**
- UOM groups, units, and conversions are copied from class hierarchy
- Configuration conflicts may cause item setup issues
- Ensure consistent configuration across class hierarchy

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenItems`

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- [EAUniCreteGenAssemblyBOM](EAUniCreteGenAssemblyBOM.md) - Related BOM generation
- Item classification management actions
- UOM group management utilities


</div>

