---
title: EAGroovyAction
module: core
---


<div class='entity-flows'>

# EAGroovyAction

**This document was generated using Claude.ai**

## Overview

Executes custom Groovy scripts within the entity flow framework. Provides dynamic code execution for complex business logic without requiring Java compilation.

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

## Important Warnings

### ⚠️ Security Risks
- Groovy scripts can execute arbitrary code - validate script sources carefully
- Scripts have full access to entity framework and Java libraries
- No built-in sandboxing - implement proper security controls

### ⚠️ Performance Impact
- First execution involves compilation overhead
- Compiled scripts consume memory - monitor usage
- Complex scripts may impact overall system performance

### ⚠️ Development Requirements
- Scripts require same quality standards as Java code
- Need thorough testing and proper error handling
- Debugging can be more challenging than standard Java

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`

</div>