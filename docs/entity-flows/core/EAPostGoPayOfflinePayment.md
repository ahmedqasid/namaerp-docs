---
title: EAPostGoPayOfflinePayment
module: core
---


<div class='entity-flows'>

# EAPostGoPayOfflinePayment

**This document was generated using Claude.ai**

## Overview

Processes offline payments for GoPay digital wallet transactions, either posting payment directly or crediting customer balance based on configuration for receipt vouchers linked to GoPay-enabled invoices.

## When This Action Runs

Offline GoPay payment processing for Receipt Voucher entities linked to GoPay-enabled invoices.

## How It Works

1. **Validates receipt voucher** and linked invoice with GoPay support
2. **Retrieves GoPay configuration** using provided config code
3. **Determines processing mode** based on recurring invoicing flag in configuration
4. **Processes payment** either as direct payment or customer balance credit
5. **Integrates with GoPay APIs** for transaction synchronization


## Parameters

**Parameter 1:** GoPay Config Code (Required) - Reference to GoPayConfiguration entity with payment settings and recurring invoicing flag

## Database Tables Affected

- **Receipt Voucher** - Updates payment status and GoPay integration data
- **Invoice** - Applies payment and updates GoPay status
- **GoPay Balance** - Credits customer balance for recurring invoicing mode
- **External GoPay System** - Synchronizes transaction data via APIs


## Important Warnings

### ⚠️ Entity Requirements
- Only works with Receipt Voucher entities linked to invoices implementing IGoPayInvoice
- Receipt voucher must be linked to valid invoice
- Proper entity relationships must be maintained

### ⚠️ Configuration Dependencies
- GoPay configuration must exist with valid API credentials
- Configuration must match target environment (test/production)
- Risk of duplicate payment processing if run multiple times

### ⚠️ Integration Dependencies
- Requires GoPay system availability and network connectivity
- Subject to GoPay API rate limits
- Balance consistency between local and GoPay systems critical


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPostGoPayOfflinePayment`


</div>

