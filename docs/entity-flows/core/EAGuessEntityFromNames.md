---
title: EAGuessEntityFromNames
module: core
---


<div class='entity-flows'>

# EAGuessEntityFromNames

**This document was generated using Claude.ai**

## Overview

Intelligently guesses and assigns entity references based on name similarity matching using advanced string distance algorithms for data import, migration, and automated entity linking.

## When This Action Runs

Automated entity matching for reference fields requiring population during data import, migration, or entity linking scenarios.

## How It Works

1. **Validates field types** ensuring target is reference or generic reference field
2. **Applies matching algorithm** using exact matches first, then fuzzy matching with string distance
3. **Caches results** for performance optimization with automatic invalidation
4. **Scores potential matches** using weight-based scoring and configurable thresholds
5. **Assigns best match** to target reference field based on similarity scores

## Parameters

**Parameter 1:** Guess Into Field (Target) (Required) - Target reference field to populate (e.g., item, customer)

**Parameter 2:** Guess From Field (Source) (Required) - Source field containing text to match (e.g., description, itemName)

**Parameter 3:** Target Entity Type (Conditional) - Required for generic reference fields (e.g., InvItem, Customer)

**Parameter 4:** Always Guess (Optional) - "true"/"false" to guess even if target field not empty (default: false)

**Parameter 5:** Max Applicable Weight (Optional) - Weight threshold for accepting matches (default: 50)

**Parameter 6:** Minimum Substring Length (Optional) - Minimum substring length for calculations (default: 4)

**Parameter 7:** Previous Result Cache Statement (Optional) - SQL query for previous matching results

**Parameter 8:** Extra Comparison Fields (Optional) - Additional field comparisons (targetField=sourceField)

**Parameter 9:** Min Matched First Letters (Optional) - Minimum first letters that must match (default: 4)

## Database Tables Affected

- **Target Reference Fields** - Populates reference fields with matched entities
- **Entity Master Data** - Reads entity codes, names, and additional fields for matching (read-only)
- **Internal Cache** - Maintains matching cache for performance optimization

## Important Warnings

### ⚠️ Performance Considerations
- Large entity sets may degrade performance
- String distance calculations can be CPU intensive
- Entity caching may consume significant memory

### ⚠️ Matching Accuracy
- Fuzzy matching may produce incorrect matches
- Results depend heavily on source data quality
- Consider manual validation of critical matches

### ⚠️ Field Requirements
- Target field must be reference or generic reference type
- Source text quality significantly affects accuracy
- Target entities must have complete code and name data

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGuessEntityFromNames`


</div>