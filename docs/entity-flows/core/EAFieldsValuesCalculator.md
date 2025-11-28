---
title: EAFieldsValuesCalculator
module: core
---


<div class='entity-flows'>

# EAFieldsValuesCalculator

**This document was generated using Claude.ai**

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## Overview

Performs bulk field assignments and calculations on entities using flexible mapping syntax. Supports field copying, static values, SQL calculations, and entity commands for data manipulation and automation.

## When This Action Runs

Manual execution or automated through entity flows for field value assignments, calculations, and data processing operations.

## How It Works

1. **Processes field mappings** defined in parameters sequentially
2. **Resolves value sources** from fields, static strings, or SQL queries
3. **Executes assignments** copying values to target fields
4. **Runs entity commands** like "edit" and "save" when specified

## Key Parameters

**Parameters 1-15:** Field Mapping Definitions (Optional) - Multi-line field mapping using `targetField=sourceValue` syntax

### Supported Syntax:
- **Field Copy:** `targetField=sourceField` or `warehouse=book.ref1`
- **Static Values:** `status="ACTIVE"` or `category="STANDARD"`
- **SQL Calculations:** `totalAmount=sql(SELECT SUM(amount) FROM Table WHERE id = {id})`
- **Reference Fields:** `customerName=customer.name` or `supplierCode=supplier.code`
- **Entity Commands:** `customer.runCommand="edit"` or `runCommand="save"`

## Database Tables Affected

- **Target Entity** - Fields modified based on assignments
- **Related Entities** - Referenced entities may be updated via field assignments
- **Any Table** - SQL calculations can read from any accessible database table

## Important Warnings

### ⚠️ Processing Order
- Field assignments processed sequentially in specified order
- Entity commands should be placed after field assignments
- Dependent assignments must be ordered correctly

### ⚠️ Performance Impact
- Complex SQL queries may impact system performance
- Entity commands trigger full validation and persistence
- Large datasets require careful optimization

### ⚠️ Data Integrity
- Assigned values must pass field validation rules
- Referenced entities must exist and be accessible
- Values must be compatible with target field types

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`

</div>
