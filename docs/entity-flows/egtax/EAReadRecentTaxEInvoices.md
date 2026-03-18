---
title: EAReadRecentTaxEInvoices
module: egtax
---


<div class='entity-flows'>

# EAReadRecentTaxEInvoices

**This document was generated using Claude.ai**

## Overview

Retrieves recent electronic invoices from the Egyptian Tax Authority API and imports them into the system. Connects to the official tax authority portal to fetch newly submitted e-invoices and synchronizes them with local tax e-invoice records.

## When This Action Runs

Manual execution or scheduled tasks for synchronizing e-invoice data with the Egyptian Tax Authority. Typically used for regular updates to ensure local records match the official tax authority database.

## How It Works

1. **Locates tax configuration** - Finds the specified TaxPayerConfiguration record by code or ID
2. **Connects to tax authority** - Establishes API connection using the configuration credentials
3. **Fetches recent invoices** - Calls Egyptian Tax Authority API to retrieve recent e-invoice submissions
4. **Processes invoice data** - Converts API response data into system-compatible format
5. **Saves local records** - Creates or updates local tax e-invoice records with fetched data
6. **Returns count** - Provides total count of processed invoices from the operation

## Parameters

**Parameter 1:** Tax Payer Configuration Code (Required) - Code or ID of the TaxPayerConfiguration entity containing API credentials and settings

## Database Tables Affected

- **TaxPayerConfiguration** - Reads configuration for API access credentials
- **Tax E-Invoice Tables** - Creates or updates local e-invoice records
- **Integration Log Tables** - May log API communication and synchronization results

**Module:** egtax

**Full Class Name:** `com.namasoft.modules.egtax.util.actions.EAReadRecentTaxEInvoices`


</div>

