---
title: EAUnicreteGenItemsAllAllowMustApply
module: supplychain
---


<div class='entity-flows'>

# EAUnicreteGenItemsAllAllowMustApply

**This document was generated using Claude.ai**

## Overview

Enhanced version of the item generation process with stricter allow rule enforcement. Generates inventory items based on item class hierarchies but applies more restrictive validation where all allow rules must be satisfied at each hierarchical level, ensuring that every item class in the combination must be explicitly allowed.

## When This Action Runs

Manual execution on item sections or item classes when strict item generation is needed with comprehensive allow rule validation, typically used when business rules require that every item class level must be explicitly permitted rather than just having any applicable allow rule.

## How It Works

1. **Inherits base functionality** - Uses all features from EAUniCreteGenItems for tree building and item creation
2. **Enhances allow rule validation** - Overrides the allowRangeApplicable method with stricter logic:
   - Groups allow rules by item class level (section, class1, class2, etc.)
   - For each item class in the combination, checks if it appears in the allowed set for its level
   - Requires that ALL item classes must be explicitly allowed at their respective levels
   - Rejects combinations where any class level is not explicitly permitted
3. **Applies level-by-level validation** - Ensures comprehensive rule coverage across all hierarchy levels
4. **Maintains parent processing** - All other item generation logic remains identical to parent class

## Parameters

**Parameter 1:** Test Only (Optional) - true to skip item creation, empty to create items

**Parameter 2:** Log Into Field (Optional) - Field name to log generation details and tree structure

**Parameter 3:** Mark Items for Deletion (Optional) - true to mark unused items in description5 field

**Parameter 4:** Delete Unneeded Items (Optional) - true to actually delete items not in generated set

## Database Tables Affected

- **InvItem** - Creates new items or updates existing item classifications
- **Item Classes (1-10)** - Reads class hierarchies and relationships (read-only)
- **ItemSection** - Reads section configurations and settings (read-only)
- **ItemClassRange** - Reads allow/disallow relationship rules with stricter validation (read-only)
- **UOMGroup** - Reads unit of measure group configurations (read-only)

## Important Warnings

### ⚠️ Stricter Allow Rule Enforcement
- **ALL item classes must be explicitly allowed** at their respective levels
- More restrictive than parent class which allows any applicable rule match
- Missing allow rules for any level cause item combination rejection
- Ensure comprehensive allow rule coverage across all class levels

### ⚠️ Allow Rule Configuration Requirements
- **Allow rules must exist for every relevant item class level**
- Empty allow rule sets for any level prevent item generation
- Rule gaps at any hierarchy level cause validation failures
- Review allow rule completeness before processing

### ⚠️ Reduced Item Generation Volume
- **Stricter validation typically produces fewer items** than parent class
- More item combinations are filtered out due to comprehensive validation
- Rule conflicts or gaps significantly reduce generated item count
- Expect lower item volumes compared to standard generation

### ⚠️ Level-Based Rule Organization
- Allow rules are organized and validated by item class level
- Rule conflicts within the same level affect validation results
- Cross-level rule dependencies are enforced more strictly
- Ensure logical rule organization across hierarchy levels

### ⚠️ Parent Class Dependency
- **Inherits all functionality and warnings from EAUniCreteGenItems**
- All parent class limitations and requirements apply
- Enhanced validation adds additional constraints on top of base functionality
- Review parent class documentation for complete understanding

### ⚠️ Business Rule Complexity
- More complex validation logic increases processing time
- Advanced rule checking may impact system performance
- Complex allow rule hierarchies require careful management
- Consider rule complexity impact on generation performance

### ⚠️ Rule Coverage Validation
- Missing allow rules for any item class prevent generation
- Partial rule coverage results in incomplete item catalogs
- Rule validation failures provide limited diagnostic information
- Test rule coverage thoroughly before production use

### ⚠️ Hierarchy Level Enforcement
- **Each hierarchy level (section, class1-10) is validated independently**
- All levels must have appropriate allow rule coverage
- Mixed rule coverage across levels causes validation failures
- Ensure consistent rule application across all hierarchy levels

### ⚠️ Backwards Compatibility
- Same parameter structure as parent class maintains compatibility
- Enhanced validation may produce different results than parent class
- Existing workflows may need adjustment for stricter validation
- Test compatibility with existing item generation processes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUnicreteGenItemsAllAllowMustApply`

**Parent Class:** [EAUniCreteGenItems](EAUniCreteGenItems.md)

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- [EAUniCreteGenItems](EAUniCreteGenItems.md) - Base item generation functionality
- [EAUniCreteGenAssemblyBOM](EAUniCreteGenAssemblyBOM.md) - Related BOM generation
- Item classification management actions


</div>

