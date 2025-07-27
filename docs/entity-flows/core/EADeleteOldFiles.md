---
title: EADeleteOldFiles
module: core
---


<div class='entity-flows'>

# EADeleteOldFiles

**This document was generated using Claude.ai**

## Overview

Manages file system cleanup by keeping only a specified number of recent files in folders, deleting older files to maintain storage efficiency.

## When This Action Runs

Scheduled cleanup operations or manual execution for log rotation, backup maintenance, and storage management.

## How It Works

1. **Validates folder** path and permissions
2. **Lists all files** in target folder (optionally recursive)
3. **Sorts files** by date or name
4. **Deletes excess files** keeping only specified number
5. **Processes subdirectories** independently if recursive mode enabled

## Parameters

**Parameter 1:** Folder Path (Required) - Target directory path for cleanup
**Parameter 2:** Order By (Required) - "date" for modification time or "name" for alphabetical sorting
**Parameter 3:** Files To Keep (Required) - Number of files to retain (must be > 0)
**Parameter 4:** Recursive (Optional) - "true"/"false" to process subdirectories

## Database Tables Affected

- **None** - File system operation only, no database interaction

## Important Warnings

### ⚠️ Data Safety
- Files permanently deleted without recovery option
- Test with non-critical directories before production use
- Backup important files before cleanup

### ⚠️ Requirements
- Requires valid folder paths and delete permissions
- Recursive mode affects all subdirectories and may consume significant resources
- All file types subject to cleanup without filtering

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteOldFiles`


</div>

