---
title: EARefreshCriticalErrors
module: core
---


<div class='entity-flows'>

# EARefreshCriticalErrors

**This document was generated using Claude.ai**

## Overview

Refreshes the system's critical errors cache to update error notifications and status indicators. This action forces the system to re-evaluate and update critical error conditions across all modules and displays.

## When This Action Runs

Manual execution when critical error indicators need to be refreshed, typically after resolving system issues or updating configurations that affect error detection.

## How It Works

1. **Triggers refresh** - Calls the CriticalErrorsUtil.refreshErrors() method to update the critical errors cache
2. **Re-evaluates conditions** - System re-checks all critical error conditions across modules
3. **Updates displays** - Refreshes error indicators in user interfaces and dashboards

## Parameters

**No Parameters Required** - This action runs without any configuration parameters.

## Database Tables Affected

- **Critical Error Cache** - Refreshes in-memory cache of critical system errors
- **Error Status Tables** - May read from various tables to evaluate current error conditions

## Important Warnings

### ⚠️ System Impact
- Forces system-wide re-evaluation of critical error conditions
- May cause temporary performance impact during refresh
- Updates may affect user interface error indicators immediately

### ⚠️ Usage Guidelines
- Use when error indicators appear outdated or incorrect
- Run after resolving critical system issues to clear stale error states
- Consider timing when running on production systems during peak usage

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARefreshCriticalErrors`


</div>