---
title: EACacheEvicter
module: core
---

<div class='entity-flows'>

# EACacheEvicter

**This document was generated using Claude.ai**

## Overview

Clears Hibernate second-level cache for a specific entity type, ensuring cached data is refreshed and subsequent queries retrieve current information from the database.

## When This Action Runs

Manual execution after bulk data updates or cache inconsistency issues. Should run after bulk updates, imports, or external data modifications.

## How It Works

1. **Accesses Hibernate SessionFactory** through Persister
2. **Resolves entity type** using EntityTypeUtil 
3. **Evicts cache entries** for specified entity type only
4. **Frees memory** and ensures next queries hit database

## Key Parameters

- **Parameter 1:** Entity Type (Required) - Case-sensitive entity type name (e.g., `Customer`, `SalesInvoice`)

## Database Tables Affected

No direct database changes. Action only affects Hibernate second-level cache. Subsequent queries will access database instead of cache until cache rebuilds.

## Important Warnings

### ⚠️ Performance Impact
- Next queries will be significantly slower until cache rebuilds
- Increased database load temporarily
- Users may notice slower response times

### ⚠️ Timing Considerations
- Avoid running during peak system usage
- Best executed during maintenance windows
- Entity type must be valid and case-sensitive

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACacheEvicter`

</div>

