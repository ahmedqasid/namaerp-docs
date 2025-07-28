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

## Important Warnings

### ⚠️ Site Code Resolution
- First attempts to find site by provided code
- Falls back to using current object if it's a MagentoSite instance
- Returns failure if neither approach yields a valid site

### ⚠️ API Connection Dependencies
- Requires active Magento API connection
- Depends on proper site configuration with valid credentials
- Network connectivity issues cause action failure

### ⚠️ Record Limit Management
- Default limit is 50 records per call
- Large limits may cause API timeouts
- Consider API rate limits when setting maximum records

### ⚠️ Parameter Validation
- Site code parameter is required and validated
- Maximum records parameter must be integer or empty
- Invalid parameters cause validation failure

### ⚠️ Exception Handling
- Wraps all processing in try-catch block
- Any exception returns failure result
- Check logs for detailed error information

### ⚠️ Data Freshness
- Retrieves current abandoned cart data from Magento
- Data may change between API calls
- Consider frequency of execution for data consistency

### ⚠️ Performance Considerations
- API calls may take significant time
- Large datasets require multiple calls
- Consider impact on Magento server performance

### ⚠️ Integration Utility Dependencies
- Relies on EcommerceReaderUtils implementation
- Utility handles actual API communication
- Changes to utility affect action behavior

### ⚠️ Business Use Cases
- Customer retention and follow-up campaigns
- Abandoned cart recovery automation
- E-commerce analytics and reporting
- Marketing campaign effectiveness analysis

### ⚠️ Data Privacy
- May contain customer personal information
- Handle retrieved data according to privacy policies
- Consider data retention and security requirements

### ⚠️ API Rate Limits
- Magento may impose API call limits
- Frequent execution may hit rate limits
- Monitor API usage to avoid restrictions

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadAbandonedCarts`


</div>

