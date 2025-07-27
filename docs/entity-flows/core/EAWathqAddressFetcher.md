---
title: EAWathqAddressFetcher
module: core
---

<div class='entity-flows'>

# EAWathqAddressFetcher

**This document was generated using Claude.ai**

## Overview

Fetches address information from Saudi government's Wathq platform using Commercial Registration National Number. Populates entity address fields with official commercial registry data.

## When This Action Runs

Manual execution on entities with commercial registration information (customers, suppliers implementing IHasCommercialInfo interface).

## How It Works

1. Validates CR National Number and API credentials
2. Makes API request to `https://api.wathq.sa/spl/national/address/info/{crNationalNumber}`
3. Maps Wathq response to Nama ERP address fields including GPS coordinates

## Key Parameters

- **Parameter 1:** API Key (Required) - Wathq platform API key
- **Parameter 2:** Bearer Token (Required) - OAuth token for authentication
- **Parameter 3:** Extra Fields Copier - Custom field mapping expressions
- **Parameter 4:** Do Not Copy Any Fields - Skip automatic field copying
- **Parameter 5:** Log Response - Log API response for debugging
- **Parameter 6:** Multi Call On Same Data - Allow multiple calls for same CR number

## Database Tables Affected

- **contactInfo.address*** - All address fields updated with Wathq data
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Important Warnings

### ⚠️ Requirements
- Valid Saudi Commercial Registration number required
- Stable internet connection to Wathq servers
- Valid API credentials from Wathq developer portal

### ⚠️ Data Impact
- Overwrites existing address data completely
- Address accuracy depends on Commercial Registry data quality
- Manual verification recommended for critical addresses

## Related Actions

- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqAddressFetcher`

</div>

