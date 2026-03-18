---
title: EACopySalaryStructureToJobOffer
module: hr
---


<div class='entity-flows'>

# EACopySalaryStructureToJobOffer

**This document was generated using Claude.ai**

## Overview

Copies salary structure element lines to job offers, adding only new component types that don't already exist in the job offer. Automatically populates job offer salary components based on predefined salary structure templates.

## When This Action Runs

Manual execution during job offer creation or modification when you need to apply a standard salary structure template to the offer. Typically used to streamline job offer preparation by applying consistent salary component definitions.

## How It Works

1. **Validates salary structure** - Checks if the job offer has an associated salary structure
2. **Identifies new components** - Finds salary structure elements not already present in the job offer
3. **Manages editing state** - Starts editing mode if the job offer isn't currently in draft
4. **Creates offer elements** - Copies component type, values, formulas, and criteria from salary structure
5. **Transfers all properties** - Copies calculation formulas, values, criteria definitions, dates, calendars, and issuance settings
6. **Commits changes** - Saves the job offer if editing was initiated by the action

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **JobOffer** - May transition to editing mode and gets committed after element addition
- **OfferElementLine** - New lines created with copied salary component data
- **SalaryStructure** - Source for element line data (read-only)
- **SalaryElementLine** - Source elements that get copied (read-only)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EACopySalaryStructureToJobOffer`


</div>

