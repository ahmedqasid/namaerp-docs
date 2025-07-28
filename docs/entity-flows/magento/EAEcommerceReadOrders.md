---
title: EAEcommerceReadOrders
module: magento
---


<div class='entity-flows'>

# EAEcommerceReadOrders

**This document was generated using Claude.ai**

## Overview

Retrieves specific order data from Magento e-commerce sites using order IDs. Connects to Magento API to fetch detailed information about individual orders, enabling order synchronization and processing between Magento and the ERP system.

## When This Action Runs

Manual execution when specific orders need to be imported or synchronized. Typically used for troubleshooting individual orders, manual order imports, or selective order processing based on specific order IDs.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code
2. **Creates utility instance** - Initializes EcommerceReaderUtils with the site ID
3. **Parses order IDs** - Processes the comma-separated list of order IDs
4. **Calls API** - Invokes readOrdersByIds method to fetch specific orders from Magento
5. **Processes results** - Handles returned order information and any errors
6. **Accumulates results** - Collects status information and errors during processing

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read orders from
**Parameter 2:** Order IDs (Required) - Comma-separated list of Magento order IDs to retrieve

## Example Order IDs Parameter

```
100001234,100001235,100001236
```

## Database Tables Affected

- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **Order Tables** - Creates or updates order data (varies by implementation)
- **Customer Tables** - May update customer information from orders
- **Integration Logs** - May create log entries for API calls

## Important Warnings

### ⚠️ Site Code Validation
- Site code must exist in MAGMagentoSite table
- Invalid site codes cause action failure
- Verify site configuration before running

### ⚠️ Order ID Format
- Order IDs must be valid Magento order identifiers
- Invalid order IDs may be skipped or cause errors
- Ensure order IDs exist in the Magento system

### ⚠️ API Connection Dependencies
- Requires active Magento API connection
- Depends on proper site configuration with valid credentials
- Network connectivity issues cause action failure

### ⚠️ Parameter Validation
- Both site code and order IDs parameters are required
- Missing either parameter causes validation failure
- Empty order ID list prevents processing

### ⚠️ Comma-Separated Format
- Order IDs must be separated by commas
- No spaces around commas recommended
- Invalid format may cause parsing issues

### ⚠️ Exception Handling
- Wraps all processing in try-catch block
- Any exception returns failure result
- Check logs for detailed error information

### ⚠️ Batch Processing
- Processes multiple orders in a single API call
- All specified orders processed together
- Partial success possible if some orders are invalid

### ⚠️ Performance Considerations
- Large numbers of orders may impact performance
- API response time depends on order complexity
- Consider breaking large lists into smaller batches

### ⚠️ Order State Considerations
- Retrieves orders regardless of their current state
- May include cancelled, completed, or pending orders
- Consider order status implications for processing

### ⚠️ Data Synchronization
- Order data may have changed since last sync
- Existing order data may be updated or overwritten
- Consider impact on existing ERP order records

### ⚠️ Integration Utility Dependencies
- Relies on EcommerceReaderUtils implementation
- Utility handles actual API communication and data mapping
- Changes to utility affect action behavior

### ⚠️ Business Impact
- Order import may trigger fulfillment processes
- Customer and inventory data may be updated
- Consider timing with business operations

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrders`


</div>

