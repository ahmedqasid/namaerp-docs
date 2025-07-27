---
title: EADetailsRemover
module: core
---


<div class='entity-flows'>

# EADetailsRemover

**This document was generated using Claude.ai**

## Overview

Removes specific lines from document detail collections based on query conditions or predefined criteria for selective cleanup of detail records.

## When This Action Runs

Manual or automated execution during document processing for detail line cleanup and validation.

## How It Works

1. **Validates parameters** and selection criteria
2. **Evaluates detail lines** using query or criteria definition
3. **Collects matching indices** of lines to remove
4. **Removes lines safely** from highest index to lowest
5. **Returns results** with validation feedback

## Parameters

**Parameter 1:** Detail ID (Required) - Name of detail collection property (e.g., "lines", "details", "items")
**Parameter 2:** Query (Optional) - SQL-like query returning 1 for lines to remove (use {collection.field} syntax)
**Parameter 3:** Criteria Definition Code (Optional) - Code of predefined criteria for standardized line removal rules

*Note: Must provide either Query or Criteria Definition Code*

## Database Tables Affected

- **Document Detail Collections** - In-memory modification of specified detail collection
- **CriteriaDefinition** - Read-only access when using criteria-based selection

## Important Warnings

### ⚠️ Data Safety
- Removed lines cannot be recovered once entity is saved
- Test queries thoroughly to ensure correct line selection
- Line removal may affect document totals and related records

### ⚠️ Requirements
- Must provide either query or criteria definition code
- Specified detail collection must exist on entity
- Verify field references in queries are valid

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADetailsRemover`


</div>

