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

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrders`


</div>