---
title: EAPreventFromDocOfUsageAgain
module: core
---


<div class='entity-flows'>

# EAPreventFromDocOfUsageAgain

**This document was generated using Claude.ai**

## Overview

Automatically prevents source documents from being reused as "from documents" in multiple target documents by managing the `preventUseAsFromDoc` flag to maintain document chain integrity.

## When This Action Runs

Automatic execution on post-commit and post-delete events for DocumentFile entities with document references.

## How It Works

1. **On Commit:** Unmarks previous "from document" and marks current "from document" as unavailable via `preventUseAsFromDoc` flag
2. **On Delete:** Removes `preventUseAsFromDoc` flag from referenced document to restore availability
3. **State Management:** Updates protection state across all affected documents automatically


## Parameters

**No Parameters Required** - Automatic action that cannot be disabled or configured.

## Database Tables Affected

- **DocumentFile** - Updates `preventUseAsFromDoc` flag on source and target documents during commit and delete operations


## Important Warnings

### ⚠️ Automatic Operation
- Cannot be disabled; runs automatically on all DocumentFile entities
- Modifies document state without user intervention
- Adds processing overhead to document operations

### ⚠️ System Impact
- May affect integrations expecting document reuse capabilities
- Must be considered when designing document workflows
- Affects document reference operations through APIs


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventFromDocOfUsageAgain`

**ℹ️ Note:** This action is an automatic action that selects the appropriate events to execute itself


</div>

