---
title: EAEcommerceReadAbandonedCarts
module: magento
---


<div class='entity-flows'>

# EAEcommerceReadAbandonedCarts

**This document was generated using Claude.ai**

## Overview

Retrieves abandoned shopping cart data from Magento e-commerce sites. Connects to Magento API to fetch information about carts that customers created but did not complete as orders, enabling follow-up marketing and analysis.

## When This Action Runs

Manual execution or scheduled tasks for abandoned cart analysis and recovery campaigns. Typically used for marketing automation, customer retention efforts, or business intelligence reporting on e-commerce behavior.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code or uses current object if it's a MagentoSite
2. **Creates utility instance** - Initializes EcommerceReaderUtils with the site ID
3. **Sets record limit** - Uses provided maximum records parameter or defaults to 50
4. **Calls API** - Invokes readAbandonedCarts method to fetch data from Magento
5. **Processes results** - Handles returned abandoned cart information
6. **Accumulates results** - Collects any errors or status information during processing

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read abandoned carts from

**Parameter 2:** Maximum Records To Read Per Call (Optional) - Limit for number of records per API call (default: 50)

## Database Tables Affected

- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **Abandoned Cart Tables** - Creates or updates abandoned cart data (varies by implementation)
- **Integration Logs** - May create log entries for API calls

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadAbandonedCarts`


</div>