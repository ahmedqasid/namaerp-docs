---
title: EARunTaskSchedule
module: core
---


<div class='entity-flows'>

# EARunTaskSchedule

**This document was generated using Claude.ai**

## Overview

Manually executes a predefined task schedule by its business code. This allows triggering scheduled tasks outside of their normal schedule, useful for testing, maintenance, or running tasks on demand.

## When This Action Runs

Manual execution when scheduled tasks need to be run immediately, such as for testing task configuration, running maintenance tasks outside normal hours, or triggering processes on demand.

## How It Works

1. **Locates task schedule** - Finds TaskSchedule by the specified business code
2. **Initiates execution** - Calls TaskScheduleRunner to execute the task immediately
3. **Runs synchronously** - Task executes in the current context without scheduling delay
4. **Returns immediately** - Returns success result once task execution is initiated

## Parameters

**Parameter 1:** Task Schedule Code (Required) - Business code of the TaskSchedule to execute

## Database Tables Affected

- **TaskSchedule** - Reads task configuration, parameters, and execution settings
- **Task Execution Tables** - May create task execution log records
- **Variable Tables** - Depends entirely on what the task schedule does (could affect any tables)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunTaskSchedule`


</div>