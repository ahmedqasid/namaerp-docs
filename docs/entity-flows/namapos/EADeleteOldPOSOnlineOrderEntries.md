<div class='entity-flows'>

# EADeleteOldPOSOnlineOrderEntries

**This document was generated using Claude.ai**

## Overview

Deletes old POS online order entries that have exceeded a specified age in hours. This is a cleanup action that removes stale order entries from the system based on their creation date, helping keep the online order queue manageable and free of outdated records.

## When This Action Runs

Manual or scheduled execution to purge old online order entries. Typically configured as a periodic cleanup task to prevent the accumulation of stale or abandoned online order entries that are no longer relevant.

## How It Works

1. **Reads the hours parameter** - Takes the number of hours from parameter 1 and converts it to minutes
2. **Calculates cutoff date** - Subtracts the specified duration from the current date/time to determine the cutoff point
3. **Builds deletion criteria** - Creates a criteria filter matching all POSOnlineOrderEntry records whose creation date is older than the cutoff
4. **Deletes matching records** - Executes a bulk delete of all entries that match the criteria
5. **Reports critical errors** - If the deletion succeeds, checks and reports any POS critical errors related to online order entries

## Parameters

**Parameter 1:** Hours (Required, Integer) - The number of hours. All POSOnlineOrderEntry records older than this many hours will be deleted.

## Database Tables Affected

- **POSOnlineOrderEntry** - Deletes records older than the specified cutoff date

**Module:** namapos

**Full Class Name:** `com.namasoft.modules.namapos.utiles.actions.EADeleteOldPOSOnlineOrderEntries`


</div>
