---
title: EAGenerateMyFatoorahPaymentURLs
module: core
---


<div class='entity-flows'>

# EAGenerateMyFatoorahPaymentURLs

**This document was generated using Claude.ai**

## Overview

Generates MyFatoorah payment URLs for documents supporting online payment processing, creating payment links through MyFatoorah's gateway for Middle East region payment methods.

## When This Action Runs

MyFatoorah payment URL generation for documents implementing ISupportOnlinePaymentDoc interface (invoices, orders, bills).

## How It Works

1. **Validates entity compatibility** with ISupportOnlinePaymentDoc interface
2. **Validates MyFatoorah configuration** exists and is properly configured
3. **Extracts customer information** from specified entity fields (name required, contact details optional)
4. **Creates payment invoice** through MyFatoorah API
5. **Assigns generated URL** to specified entity field with state-aware updates

## Parameters

**Parameter 1:** Payment Config Code (Required) - Code of MyFatoorah payment configuration (e.g., MYFATOORAH_PROD)

**Parameter 2:** Copy URL To Field (Required) - Field name for payment URL storage

**Parameter 3:** Customer Name Field (Required) - Field reference containing customer name (e.g., customer.name1)

**Parameter 4:** Mobile Country Code Field (Optional) - Field reference for country code (e.g., customer.countryCode)

**Parameter 5:** Mobile Number Field (Optional) - Field reference for mobile number (e.g., customer.mobile)

**Parameter 6:** Customer Email Field (Optional) - Field reference for email address (e.g., customer.email)

**Parameter 7:** Customer Reference Field (Optional) - Field reference for customer code (e.g., customer.code)

## Database Tables Affected

- **Entity Payment URL Field** - Updates specified field with generated MyFatoorah payment URL
- **OnlinePaymentConfig Table** - Reads MyFatoorah-specific configuration settings
- **Customer Data Fields** - Accesses customer information from related entity fields
- **MyFatoorah API Records** - Creates payment tracking entries through API

## Important Warnings

### ⚠️ Entity Requirements
- Entity must implement ISupportOnlinePaymentDoc interface
- Customer name field is mandatory for payment processing
- Target field for URL storage must exist and support URL text data

### ⚠️ Configuration Dependencies
- MyFatoorah payment configuration must exist and be properly configured
- Configuration must be specifically set for MyFatoorah type
- Valid MyFatoorah API credentials required

### ⚠️ Data Quality
- Customer data must be complete and accurate for payment processing
- Valid contact information improves payment success rates
- Consider entity state (draft vs committed) for field updates

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateMyFatoorahPaymentURLs`


</div>