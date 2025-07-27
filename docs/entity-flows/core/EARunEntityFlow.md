---
title: EARunEntityFlow
module: core
---


<div class='entity-flows'>

# EARunEntityFlow

**This document was generated using Claude.ai**

## Overview

Executes another entity flow by its business code. This meta-action allows one entity flow to trigger another, enabling complex workflow orchestration and reusable action patterns.

## When This Action Runs

Manual execution when one entity flow needs to invoke another entity flow as part of a larger workflow or business process sequence.

## How It Works

1. **Locates target flow** - Finds EntityFlow by the specified business code
2. **Validates applicability** - Checks if the target flow is applicable to the current entity type
3. **Verifies manual execution** - Ensures the target flow is configured for manual execution
4. **Executes flow** - Runs the target entity flow on the current entity
5. **Returns results** - Accumulates and returns results from the executed flow

## Parameters

**Parameter 1:** Entity Flow Code (Required) - Business code of the EntityFlow to execute

## Database Tables Affected

- **EntityFlow** - Reads flow configuration and execution parameters
- **Variable Tables** - Depends on the target entity flow being executed
- **Target Flow Impact** - Database changes depend entirely on what the target flow does

## Important Warnings

### ⚠️ Entity Flow Requirements
- Target entity flow must exist and have a valid business code
- Entity flow must be configured for manual execution (not automatic)
- Entity flow must be applicable to the current entity type

### ⚠️ Execution Dependencies
- Target flow's success depends on its own configuration and requirements
- All warnings and limitations of the target flow apply
- Nested flow execution may have performance implications

### ⚠️ Error Propagation
- Failures in the target flow will cause this action to fail
- Error messages may reference the target flow rather than this action
- Complex debugging when multiple flows are chained together

### ⚠️ Business Logic Considerations
- Target flow may have side effects not obvious from this action
- May trigger additional automatic flows or business rules
- Consider the complete workflow chain when planning execution

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunEntityFlow`


</div>