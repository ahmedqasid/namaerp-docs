---
title: EAIgnoringNotFoundTargetFieldsValuesCalculator
module: core
---


<div class='entity-flows'>

# EAIgnoringNotFoundTargetFieldsValuesCalculator

**This document was generated using Claude.ai**

## Overview

Performs field value calculations with error tolerance, extending the standard field calculator but ignoring errors to ensure processing continues despite individual field assignment failures.

## When This Action Runs

Error-tolerant field calculations during data import, migration, or bulk updates where partial failures are acceptable.

## How It Works

1. **Performs standard field calculations** using same syntax as EAFieldsValuesCalculator
2. **Catches assignment errors** during field processing without stopping
3. **Logs all errors** for troubleshooting while continuing operation
4. **Allows partial success** when some fields assign successfully
5. **Returns success result** regardless of individual field errors

## Parameters

Same parameters as [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md) with error tolerance enabled

## Database Tables Affected

- **Target Entity Fields** - Updates fields based on mapping configuration with error tolerance
- **Referenced Data** - Reads source data and executes SQL queries (read-only)
- **Partial Updates** - Successful assignments retained even when others fail

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAIgnoringNotFoundTargetFieldsValuesCalculator`

**Related Actions:**
- [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md) - Standard field value calculator without error tolerance
- [EAAutomaticFieldsValuesCalculator](EAAutomaticFieldsValuesCalculator.md) - Automatic field value calculation


</div>

