---
title: EACopySalaryStructureToUpdateEmpInfo
module: hr
---


<div class='entity-flows'>

# EACopySalaryStructureToUpdateEmpInfo

**This document was generated using Claude.ai**

## Overview

Copies salary structure element lines to employee update documents, adding only new component types that don't already exist in the target employee information. Automatically applies standard salary structure templates when updating employee compensation packages.

## When This Action Runs

Manual execution during employee information updates when applying new salary structure templates or when employee promotions/transfers require updated compensation components. Typically used to standardize employee salary structures.

## How It Works

1. **Validates salary structure** - Checks if the target employee info (toInfo) has an associated salary structure
2. **Identifies new components** - Finds salary structure elements not already present in the employee update document
3. **Manages editing state** - Starts editing mode if the update document isn't currently in draft
4. **Creates update elements** - Copies component types, values, formulas, and criteria from salary structure
5. **Transfers all properties** - Copies calculation formulas, values, criteria definitions, dates, calendars, and issuance settings
6. **Commits changes** - Saves the employee update document if editing was initiated by the action

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **UpdateEmployeeInfo** - May transition to editing mode and gets committed after element addition
- **OfferElementUpdateLine** - New lines created with copied salary component data
- **SalaryStructure** - Source for element line data (read-only)
- **SalaryElementLine** - Source elements that get copied (read-only)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACopySalaryStructureToUpdateEmpInfo`

**Related Actions:**
- [EACopySalaryStructureToJobOffer](EACopySalaryStructureToJobOffer.md) - Similar functionality for job offers


</div>

