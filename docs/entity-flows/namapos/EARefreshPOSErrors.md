---
title: EARefreshPOSErrors
module: namapos
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARefreshPOSErrors

## Overview

Cleans out POS transfer errors that are no longer true. When a POS register fails to upload a document to the main system, the failure is recorded under **Data Errors** on the register. Once the cause is fixed and the document finally arrives, the old error line stays behind until someone presses **Refresh Errors**. This action does exactly what that button does, so it can run on a schedule and keep the error list showing only real, current problems.

## When This Action Runs

It ignores the record it runs on, so run it from a scheduled task, or on demand. It covers the errors of all registers at once.

## How It Works

1. **Removes error lines with no document type** - lines that do not say which kind of document failed.
2. **Removes errors for documents that now exist** - for each document type that has errors, deletes the error lines whose document is now present in the main system (it was uploaded successfully after the error).
3. **Removes errors for merged POS sales** - deletes the error lines of POS sales invoices and POS sales returns that have since been merged into another POS sales document.
4. **Reports the count** - the result reads "{0} error line(s) were removed". If one of the steps cannot run for a document type, it adds a warning and carries on with the others.

## Parameters

This action takes no parameters.

**Module:** namapos

**Full Class Name:** `com.namasoft.modules.namapos.utiles.actions.EARefreshPOSErrors`

See [POS data sync](/modules/pos/pos-data-sync) for how documents travel from the register to the main system.

## Related Actions

- [EADeleteOldPOSOnlineOrderEntries](EADeleteOldPOSOnlineOrderEntries.md)


</div>
