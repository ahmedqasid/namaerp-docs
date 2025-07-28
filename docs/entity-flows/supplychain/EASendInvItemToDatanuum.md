---
title: EASendInvItemToDatanuum
module: supplychain
---


<div class='entity-flows'>

# EASendInvItemToDatanuum

**This document was generated using Claude.ai**

## Overview

Synchronizes inventory item information with the Datanuum external service for reward points and loyalty program integration. Builds a JSON payload containing item details (SKU, name, category, description) and sends it to Datanuum's API to create or update product records in their loyalty platform catalog.

## When This Action Runs

Manual execution when inventory items need to be synchronized with the Datanuum loyalty system, typically after item creation, product updates, or when setting up reward point eligibility for existing items in the loyalty program.

## How It Works

1. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
2. **Initializes API client** - Creates DatanuumApiClient with configuration settings
3. **Builds item payload** - Creates JSON request body with item details:
   - SKU (item code)
   - Item name (prefers name2 over name1)
   - Category (from itemClass9 classification)
   - Description (prefers description1 over description2)
4. **Formats as array** - Wraps item data in JSON array format expected by API
5. **Sends to Datanuum** - Transmits item data to Datanuum API endpoint
6. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **InvItem** - Reads inventory item details and classifications (read-only)
- **ItemClass9** - Reads item category classification for business fields (read-only)
- **External Datanuum System** - Creates/updates product catalog via API calls

## Important Warnings

### ⚠️ External API Dependency
- Requires active internet connection to Datanuum services
- API calls may fail due to network issues or service downtime
- Timeout and connectivity errors are possible
- Consider retry mechanisms for critical product synchronization

### ⚠️ Required Configuration Setup
- RewardPointsConfig must exist and be properly configured
- Configuration must contain valid Datanuum API credentials and endpoints
- Invalid configuration causes immediate processing failure
- Test configuration thoroughly before production use

### ⚠️ Item Data Requirements
- Requires InvItem entity with valid code (SKU)
- Item name fields (name1, name2) should be populated for proper display
- Description fields improve product information in loyalty system
- Missing core item data may cause API validation errors

### ⚠️ Item Classification Integration
- Category information is extracted from itemClass9 field
- ItemClass9 must be properly assigned for complete product data
- Missing item classification results in incomplete category information
- Category data affects loyalty program product grouping and rules

### ⚠️ API Data Format Requirements
- Item data is converted to specific JSON array format expected by Datanuum
- Field mapping is fixed and cannot be customized through parameters
- API format changes may require code updates
- Array wrapping is mandatory for proper API processing

### ⚠️ Item Name and Description Logic
- Name field uses priority: name2 first, then name1 as fallback
- Description uses priority: description1 first, then description2 as fallback
- Empty or null fields are handled gracefully
- Consider multilingual requirements for item names

### ⚠️ Product Catalog Synchronization
- Item changes in ERP are not automatically synchronized
- Manual execution required after item updates
- Timing delays may cause inconsistencies between systems
- Consider automated synchronization triggers for inventory changes

### ⚠️ Error Handling and Recovery
- Uses accumulating result pattern to collect API errors
- Failed synchronization does not prevent item operations
- Manual retry may be needed for failed synchronizations
- Monitor error logs for synchronization issues

### ⚠️ Loyalty Program Impact
- Synchronized items become available for loyalty program rules
- Product availability affects customer reward point earning opportunities
- Item changes may impact existing loyalty campaigns and promotions
- Consider timing of synchronization with marketing campaigns

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendInvItemToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- Other Datanuum integration entity flows
- Inventory item management actions


</div>

