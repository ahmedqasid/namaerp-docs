---
title: EAEmptifyTomcatTemp
module: core
---


<div class='entity-flows'>

# EAEmptifyTomcatTemp

**This document was generated using Claude.ai**

## Overview

Cleans Tomcat temp directory by removing old files and folders while preserving recent items to manage server storage and improve performance.

## When This Action Runs

Scheduled maintenance or manual cleanup operations to remove old temporary files and free disk space.

## How It Works

1. **Locates temp directory** using `java.io.tmpdir` system property
2. **Calculates cutoff time** based on specified hours parameter
3. **Scans files recursively** in temp directory and subdirectories
4. **Removes old files** exceeding age threshold using safe deletion
5. **Cleans empty directories** after file removal

## Parameters

**Parameter 1:** Leave items newer than n hours (Optional) - Number of hours to preserve recent files (default: 12 hours)

## Database Tables Affected

- **None** - File system operation only, no database interaction

## Important Warnings

### ⚠️ System Impact
- May delete files currently in use by applications
- Could affect running applications that rely on temp files
- Run during low-activity periods to minimize disruption

### ⚠️ Configuration
- Requires appropriate file system permissions for deletion
- Choose retention period carefully to avoid deleting needed files
- Some files may fail to delete due to locks or permissions

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAEmptifyTomcatTemp`


</div>

