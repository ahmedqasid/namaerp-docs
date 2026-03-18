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

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendInvItemToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- Other Datanuum integration entity flows
- Inventory item management actions


</div>

