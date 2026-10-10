---
title: EACreateEltezamCodeTables
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACreateEltezamCodeTables

## Overview

Creates an empty MCS Eltezam Code Table (`EltezamCodeTable`) for every MCS lookup list that does not have one yet. MCS publishes 29 code lists and only one table is allowed per list, so instead of creating them one by one before mapping can start, you run this action once. See [Eltezam Code Tables](/modules/integrations/eltezam/eltezam-code-tables).

## When This Action Runs

Once, during setup, usually from a Task Schedule of type **Action** run with **Run Now**. It ignores the record it runs on. Running it again is harmless. Two runs cannot overlap.

## How It Works

1. **Goes through every MCS lookup type** - For each list (for example `JobClassCode`, `Gender`), looks for an existing code table of that lookup type.
2. **Creates the missing tables** - A missing table is created with the lookup type's name as its code, Name1 and Name2, and with its lookup type set.
3. **Opens each new table to every context** - Sets the legal entity, sector, branch, department and analysis set of the table to the public ("any") value, because MCS codes apply to the whole agency.
4. **Repairs tables left unreachable** - An existing table with any of those five dimensions empty is given the public values and saved again. A table that already has all five is left untouched.
5. **Reports what could not be opened** - If the database has no public value for a dimension, that table is not saved and the run reports "Could not open ... to every context, this database has no public value for ...".

## Parameters

This action takes no parameters.

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EACreateEltezamCodeTables`

## Related Actions

- [EASendEltezamSubmissionDoc](EASendEltezamSubmissionDoc.md)
- [EASubmitEltezamData](EASubmitEltezamData.md)


</div>
