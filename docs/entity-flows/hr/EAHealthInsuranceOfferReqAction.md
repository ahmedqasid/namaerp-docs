---
title: EAHealthInsuranceOfferReqAction
module: hr
---


<div class='entity-flows'>

# EAHealthInsuranceOfferReqAction

**This document was generated using Claude.ai**

## Overview

Automatically generates health insurance request lines for employees and their eligible dependents. Creates detailed insurance coverage entries based on employee data and dependent information, including age calculations and relationship details.

## When This Action Runs

Executes before committing a health insurance offer request document. Typically triggered during the save process to automatically populate insurance coverage lines for employees and their family members marked for medical insurance.

## How It Works

1. **Checks commit status** - Exits if document is already in the process of committing
2. **Processes employee lines** - Iterates through existing request lines for employees
3. **Creates employee entry** - Generates primary insurance line with employee details including age, gender, nationality
4. **Identifies eligible dependents** - Finds attendants marked for medical insurance coverage
5. **Creates dependent entries** - Generates insurance lines for each eligible family member
6. **Calculates ages** - Computes age in years for all covered individuals
7. **Determines gender** - Infers gender based on relationship type for dependents
8. **Links records** - Associates dependent entries with employee entries using master row ID
9. **Replaces original lines** - Clears and replaces document lines with expanded entries

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **HealthInsuranceOfferRequest** - Updates detail lines collection and commit status flag
- **HealthInsOffReqLine** - Creates new lines for employees and dependents
- **Employee** - Reads employee personal data and attendants (read-only)
- **AttendantLine** - References dependent information for insurance eligibility

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAHealthInsuranceOfferReqAction`


</div>

