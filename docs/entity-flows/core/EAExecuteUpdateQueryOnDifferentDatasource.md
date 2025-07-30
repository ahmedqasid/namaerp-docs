---
title: EAExecuteUpdateQueryOnDifferentDatasource
module: core
---


<div class='entity-flows'>

# EAExecuteUpdateQueryOnDifferentDatasource

**This document was generated using Claude.ai**

## Overview

Executes SQL UPDATE, INSERT, or DELETE statements on external databases using configured data sources for cross-database operations and system integration.

## When This Action Runs

Manual or automated execution for cross-database operations, data synchronization, and external system updates.

## How It Works

1. **Switches to external data source** connection temporarily
2. **Executes SQL query** on external database with parameter substitution
3. **Restores original connection** automatically after execution
4. **Optionally evicts cache** to maintain consistency

## Parameters

**Parameter 1:** Data Source Name (Required) - Name of configured external data source

**Parameter 2:** Update Query (Required) - SQL UPDATE, INSERT, or DELETE statement (use {fieldName} for entity references)

**Parameter 3:** Evict Cache After Execution (Optional) - "true"/"false" to clear application cache (default: false)

## Database Tables Affected

- **External Database Tables** - Direct modifications to specified external database tables
- **Application Cache** - May require eviction to maintain cross-system consistency
## Important Warnings

### ⚠️ Configuration
- External data source must be properly configured and accessible
- Requires valid credentials and network access to external database
- External operations are separate from main database transactions

### ⚠️ Security
- Secure management of external database credentials required
- Network latency and connection overhead may impact performance
- Consider data privacy implications of cross-system operations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQueryOnDifferentDatasource`


</div>