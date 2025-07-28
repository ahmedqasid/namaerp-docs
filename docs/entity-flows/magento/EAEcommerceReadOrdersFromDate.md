---
title: EAEcommerceReadOrdersFromDate
module: magento
---


<div class='entity-flows'>

# EAEcommerceReadOrdersFromDate

**This document was generated using Claude.ai**

## Overview

Retrieves orders from Magento e-commerce sites based on a date range calculated from the current date. Imports all orders created within a specified number of days before today, enabling bulk order synchronization and catch-up processing.

## When This Action Runs

Manual execution or scheduled tasks for bulk order imports. Typically used for regular synchronization jobs, catch-up processing after system downtime, or initial data migration from Magento to the ERP system.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code
2. **Creates utility instance** - Initializes EcommerceReaderUtils with the site ID
3. **Calculates date range** - Subtracts specified days from current date to determine start date
4. **Calls API** - Invokes readSales method to fetch orders from the calculated date onwards
5. **Processes results** - Handles returned order information and integration results
6. **Accumulates results** - Collects status information and errors during processing

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read orders from
**Parameter 2:** Read Orders Before N Days (Required) - Number of days back from today to start reading orders

## Example Usage

- Parameter 2: "7" - Reads orders from 7 days ago to today
- Parameter 2: "30" - Reads orders from 30 days ago to today
- Parameter 2: "1" - Reads orders from yesterday to today

## Database Tables Affected

- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **Order Tables** - Creates or updates order data (varies by implementation)
- **Customer Tables** - May update customer information from orders
- **Product Tables** - May update product information from order lines
- **Integration Logs** - Creates log entries for API calls and processing

## Important Warnings

### ⚠️ Site Code Validation
- Site code must exist in MAGMagentoSite table
- Invalid site codes cause action failure
- Verify site configuration before running

### ⚠️ Date Range Calculation
- Uses current system date as reference point
- Subtracts specified days to calculate start date
- End date is implicitly "now" (current date/time)

### ⚠️ Parameter Validation
- Both parameters are required and validated
- Days parameter must be a valid integer
- Negative values may cause unexpected behavior

### ⚠️ API Connection Dependencies
- Requires active Magento API connection
- Depends on proper site configuration with valid credentials
- Network connectivity issues cause action failure

### ⚠️ Exception Handling
- Throws NaMaFailureResultException for any errors
- Does not return failure results - throws exceptions instead
- Check logs for detailed error information

### ⚠️ Bulk Processing Impact
- May retrieve large numbers of orders
- Performance depends on date range and order volume
- Consider system resources for large imports

### ⚠️ Data Volume Considerations
- Longer date ranges result in more orders
- Popular sites may have thousands of orders per day
- Monitor memory usage during large imports

### ⚠️ API Rate Limits
- Magento may impose API call limits
- Large date ranges may trigger rate limiting
- Consider breaking large ranges into smaller batches

### ⚠️ Time Zone Considerations
- Uses system time zone for date calculations
- Magento API may use different time zone
- Verify time zone alignment for accurate imports

### ⚠️ Duplicate Handling
- May re-import existing orders if run multiple times
- Integration utility should handle duplicates appropriately
- Consider impact on existing order data

### ⚠️ Integration Dependencies
- Relies on EcommerceReaderUtils.readSales() method
- Utility handles actual API communication and data mapping
- Changes to utility affect action behavior

### ⚠️ Business Impact
- Order import may trigger fulfillment processes
- Customer and inventory data may be updated
- Consider timing with business operations

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrdersFromDate`


</div>

