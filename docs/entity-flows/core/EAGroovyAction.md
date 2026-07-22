---
title: EAGroovyAction
module: core
---


<div class='entity-flows'>

# EAGroovyAction

**This document was generated using Claude.ai**

## Overview

Executes custom Groovy scripts within the entity flow framework. Provides dynamic code execution for complex business logic without requiring Java compilation.

::: tip Writing a Groovy action?
Follow the **[Groovy Writer skill](https://docs.namasoft.com/skills/groovy-writer.md)** — a step-by-step guide (raw Markdown) for writing Nama `EntityAction` Groovy scripts in the correct Nama style, matching the established sample-script patterns. Intended for Claude Code and support staff drafting scripts.
:::

## When This Action Runs

Manual execution or automated through entity flows when custom business logic is needed that standard entity flows cannot meet.

## How It Works

1. **Compiles Groovy script** at runtime using GroovyClassLoader
2. **Caches compiled classes** for performance optimization
3. **Executes script** implementing EntityAction interface
4. **Returns results** and handles compilation/execution errors

## Key Parameters

**Parameter 1:** Groovy Script (Required) - Complete Groovy code implementing EntityAction interface

### Script Requirements:
- Must implement `com.namasoft.infra.domainbase.entity.base.EntityAction`
- Include `doAction()`, `describe()`, and `columnNames()` methods
- Access entity via `object.getFieldValue("fieldName")`
- Return `Result` object with success/error status

## Database Tables Affected

- **Target Entity** - Can modify any fields based on script logic
- **Related Entities** - Can access and modify through entity relationships  
- Scripts work through entity framework with validation and security enforcement

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`

</div>