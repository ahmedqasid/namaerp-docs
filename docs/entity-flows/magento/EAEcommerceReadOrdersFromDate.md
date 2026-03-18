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

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrdersFromDate`


</div>