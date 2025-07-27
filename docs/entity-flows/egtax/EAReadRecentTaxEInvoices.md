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

## Important Warnings

### ⚠️ Configuration Requirements
- TaxPayerConfiguration must exist and contain valid API credentials
- Configuration must include proper Egyptian Tax Authority API endpoint settings
- Action fails if configuration record cannot be found by the specified code

### ⚠️ API Connection Dependencies
- Requires active internet connection to Egyptian Tax Authority servers
- API credentials must be valid and not expired
- Network firewalls must allow outbound connections to tax authority endpoints

### ⚠️ Egyptian Tax Authority Integration
- Follows official Egyptian Tax Authority API specifications
- Subject to API rate limits and availability imposed by tax authority
- API responses depend on tax authority system status and maintenance schedules

### ⚠️ Data Synchronization Impact
- Creates or updates local e-invoice records based on tax authority data
- May overwrite existing local data with authoritative tax authority information
- Synchronization affects invoice status, timestamps, and reference numbers

### ⚠️ Authentication and Security
- Uses sensitive tax authority API credentials stored in configuration
- API communications should occur over secure HTTPS connections
- Credentials must be properly secured and regularly rotated as required

### ⚠️ Error Handling
- API connection failures cause action to fail immediately
- Invalid or expired credentials result in authentication errors
- Tax authority system maintenance may cause temporary unavailability

### ⚠️ Performance Considerations
- API response time depends on tax authority system performance
- Large numbers of recent invoices may cause longer processing times
- Network latency affects overall operation duration

### ⚠️ Compliance Requirements
- Synchronization ensures compliance with Egyptian tax authority requirements
- Regular execution may be required by tax regulations
- Failed synchronizations may impact tax compliance status

**Module:** egtax

**Full Class Name:** `com.namasoft.modules.egtax.util.actions.EAReadRecentTaxEInvoices`


</div>

