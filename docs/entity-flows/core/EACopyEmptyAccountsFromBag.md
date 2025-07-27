---
title: EACopyEmptyAccountsFromBag
module: core
---


<div class='entity-flows'>

# EACopyEmptyAccountsFromBag

**This document was generated using Claude.ai**

## Overview

Copies subsidiary account assignments from account bag to fill empty subsidiary account fields. Only updates empty fields, preserving existing assignments.

## When This Action Runs

Manual or automated execution on entities implementing HasSubsidiaryAccounts interface to populate empty subsidiary account fields.

## How It Works

1. **Validates entity** implements HasSubsidiaryAccounts interface
2. **Checks account structure** and account bag configuration 
3. **Retrieves account templates** from account bag
4. **Identifies empty fields** and selectively fills with template assignments

## Key Parameters

**No Parameters Required** - Automatically detects entities with subsidiary accounts and uses configured account bag for template source.


## Database Tables Affected

- **Target Entity** - Updates empty subsidiary account fields only
- **Account Bag** - Template source for account assignments
- **Account Master Data** - Referenced for validation and account resolution


## Important Warnings

### ⚠️ Requirements
- Entity must implement HasSubsidiaryAccounts interface
- Requires properly configured subsidiary account structure and account bag
- Only updates empty fields - existing assignments are preserved

### ⚠️ Dependencies
- Account bag must contain valid subsidiary account templates
- Account assignments must comply with business rules
- Changes may affect accounting and reporting systems

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACopyEmptyAccountsFromBag`

</div>

