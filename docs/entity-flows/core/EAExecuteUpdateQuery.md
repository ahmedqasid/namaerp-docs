---
title: EAExecuteUpdateQuery
module: core
---


<div class='entity-flows'>

# EAExecuteUpdateQuery

**This document was generated using Claude.ai**

## Overview

Executes custom SQL UPDATE, INSERT, or DELETE statements directly against the database for bulk operations and data modifications with optional cache eviction.

## When This Action Runs

Manual or automated execution for bulk data operations, data migration, and database maintenance.

## How It Works

1. **Prepares SQL statement** with parameter substitution using {fieldName} syntax
2. **Executes query directly** against database within current transaction
3. **Optionally evicts cache** to maintain data consistency
4. **Returns execution result** with error handling

## Parameters

**Parameter 1:** Update Query (Required) - Valid SQL UPDATE, INSERT, or DELETE statement (use {fieldName} for entity references)
**Parameter 2:** Evict Cache After Execution (Optional) - "true"/"false" to clear Hibernate cache after execution (default: false)

## Database Tables Affected

- **Any Database Tables** - Direct modifications to specified tables in SQL statement
- **Hibernate Cache** - May require eviction to maintain consistency

## Important Warnings

### ⚠️ Data Safety
- Bypasses entity validation and business logic
- Direct SQL changes may leave stale data in cache
- Must respect database constraints and referential integrity

### ⚠️ Security
- Ensure proper parameter substitution to prevent SQL injection
- Validate and sanitize dynamic SQL components
- Test queries thoroughly before deployment

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery`


</div>

