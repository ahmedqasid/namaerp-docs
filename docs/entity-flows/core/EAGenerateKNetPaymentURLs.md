---
title: EAGenerateKNetPaymentURLs
module: core
---


<div class='entity-flows'>

# EAGenerateKNetPaymentURLs

**This document was generated using Claude.ai**

## Overview

Generates KNet payment URLs for documents supporting online payment processing, creating both direct and redirect URLs for Kuwait's KNet payment gateway integration.

## When This Action Runs

Online payment URL generation for documents implementing ISupportOnlinePaymentDoc interface (invoices, orders, bills).

## How It Works

1. **Validates entity compatibility** with ISupportOnlinePaymentDoc interface
2. **Retrieves payment configuration** using provided config code
3. **Generates payment URLs** for both direct KNet gateway and redirect processing
4. **Creates payment entries** for tracking and audit purposes
5. **Assigns URLs to entity fields** as specified in parameters

## Parameters

**Parameter 1:** Payment Config Code (Required) - Code of OnlinePaymentConfig entity (e.g., KNET_PROD, KNET_TEST)

**Parameter 2:** Copy URL To Field (Required) - Field name for redirect payment URL storage

**Parameter 3:** Copy Nama Payment URL To Field (Required) - Field name for direct payment URL storage

## Database Tables Affected

- **Entity Payment URL Fields** - Updates specified fields with generated payment URLs
- **OnlinePaymentConfig Table** - Reads payment gateway configuration settings
- **Payment Tracking Tables** - Creates payment entries for audit and monitoring

## Important Warnings

### ⚠️ Entity Requirements
- Entity must implement ISupportOnlinePaymentDoc interface
- Target fields for URL storage must exist and support URL text data
- Entity must be a valid payment document type

### ⚠️ Configuration Dependencies
- Payment configuration must exist and be properly configured
- KNet gateway must be accessible and operational
- Valid merchant account required for payment processing

### ⚠️ Security
- Payment URLs contain sensitive information - handle securely
- Use SSL/TLS for all payment-related communications
- Protect payment data according to PCI DSS requirements

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateKNetPaymentURLs`


</div>