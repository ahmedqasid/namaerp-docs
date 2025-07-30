---
title: EAEcommerceShippingHandler
module: magento
---


<div class='entity-flows'>

# EAEcommerceShippingHandler

**This document was generated using Claude.ai**

## Overview

Handles e-commerce shipping operations for supply chain documents through configured shipping sites. Processes various shipping requests including order creation, updates, cancellations, and status checks via integrated shipping APIs.

## When This Action Runs

Manual execution on supply chain documents that require shipping integration. Typically used during order fulfillment processes when shipments need to be created, updated, or tracked through third-party shipping providers.

## How It Works

1. **Validates document type** - Ensures the document is a supply chain document (BasicSCDocument)
2. **Finds shipping site** - Locates the EcommerceShippingSite using the provided site code
3. **Creates request info** - Packages document and parameters into shipping request structure
4. **Validates request type** - Ensures the request parameter is supported
5. **Delegates to site** - Calls the shipping site's handleRequest method
6. **Processes response** - Handles results and any errors from the shipping operation

## Parameters

**Parameter 1:** Site Code (Required) - Code of the EcommerceShippingSite to use for shipping

**Parameter 2:** Request Parameter (Required) - Type of shipping operation to perform

**Parameter 3:** Default Customer Email (Optional) - Fallback email for shipping notifications

**Parameter 4:** Default Shipping Note (Optional) - Default note to include with shipments

**Parameter 5:** Refresh Token (Optional) - Authentication token for API access

**Parameter 6:** Magento Order Number Tempo (Optional) - Template for extracting Magento order numbers

**Parameter 7:** Invoice Code Template (Optional) - Template for generating invoice codes

**Parameter 8:** Count Items Query (Optional) - SQL query executed per line for item counting

**Parameter 9:** Send Warehouse From Line (Optional) - true/false to include warehouse info from line

**Parameter 10:** Send Warehouse From Header (Optional) - true/false to include warehouse info from header

## Supported Request Parameters

- **HEALTH_CHECK_REQUEST** - Check API connectivity and status
- **CREATE_ORDER_REQUEST** - Create new shipping order
- **CREATE_PICKUP_ORDER_REQUEST** - Create pickup order for returns
- **UPDATE_ORDER_REQUEST** - Update existing shipping order
- **CANCEL_ORDER_REQUEST** - Cancel shipping order
- **ORDER_HISTORY_REQUEST** - Retrieve order history and status

## Database Tables Affected

- **EcommerceShippingSite** - References shipping site configuration (read-only)
- **BasicSCDocument** - Source document for shipping information (read-only)
- **Shipping Integration Tables** - Creates or updates shipping data (varies by site implementation)

## Important Warnings

### ⚠️ Document Type Restriction
- Only works with BasicSCDocument types (sales orders, delivery notes, etc.)
- Other document types cause action failure
- Verify document compatibility before use

### ⚠️ Site Code Validation
- Site code must exist in EcommerceShippingSite table
- Invalid site codes cause action failure
- Verify shipping site configuration before running

### ⚠️ Request Parameter Validation
- Request parameter must be one of the supported constants
- Invalid request types cause validation failure
- Check ShippingAPIConstants for valid values

### ⚠️ Required Parameters
- Site code and request parameter are mandatory
- Missing required parameters cause validation failure
- All other parameters are optional with defaults

### ⚠️ API Dependencies
- Requires active connection to shipping provider APIs
- Depends on proper site configuration with valid credentials
- Network connectivity issues may cause failures

### ⚠️ Authentication Handling
- Refresh token parameter used for API authentication
- Invalid or expired tokens may cause API failures
- Monitor token validity for continued operation

### ⚠️ Template Processing
- Magento order number and invoice code templates use template engine
- Invalid templates may cause processing errors
- Test templates with sample data before use

### ⚠️ Query Execution
- Count items query executed once per document line
- Complex queries may impact performance
- Ensure query returns appropriate item count data

### ⚠️ Warehouse Information
- Warehouse data can be sourced from line level or header level
- Both parameters can be true simultaneously
- Configure based on document structure and shipping requirements

### ⚠️ Exception Handling
- Wraps all processing in try-catch block
- Any exception returns failure result
- Check logs for detailed error information

### ⚠️ Shipping Site Implementation
- Actual shipping logic handled by EcommerceShippingSite
- Different sites may have different capabilities
- Verify site supports required request types

### ⚠️ Business Impact
- Shipping operations may affect order status
- Failed shipments may require manual intervention
- Consider impact on customer notifications and tracking

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceShippingHandler`


</div>