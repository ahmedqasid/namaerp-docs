---
title: EAWathqCommercialInfoFetcher
module: core
---

<div class='entity-flows'>

# EAWathqCommercialInfoFetcher

**This document was generated using Claude.ai**

## Overview

Fetches commercial registration information from Saudi government's Wathq platform using Commercial Registration National Number. Populates company name, registration details, and contact information from official registry.

## When This Action Runs

Manual execution on entities implementing IHasCommercialInfo interface (customers, suppliers, companies) with valid Commercial Registration National Number.

## How It Works

1. Validates CR National Number and API credentials
2. Makes API request to `https://api.wathq.sa/commercial-registration/fullinfo/{crNationalNumber}`
3. Maps Wathq response to entity fields (name, contact info, registration details)

## Key Parameters

- **Parameter 1:** API Key (Required) - Wathq platform API key
- **Parameter 2:** Bearer Token (Required) - OAuth token for authentication
- **Parameter 3:** Extra Fields Copier - Custom field mapping expressions
- **Parameter 4:** Do Not Copy Any Fields - Skip automatic field copying
- **Parameter 5:** Log Response - Log API response for debugging
- **Parameter 6:** Multi Call On Same Data - Allow multiple calls for same CR number

## Database Tables Affected

- **Target Entity** - Updates `name1`, `taxInfo.*`, and `contactInfo.*` fields
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Important Warnings

### ⚠️ Requirements
- Valid Saudi Commercial Registration number required
- Stable internet connection to Wathq servers
- Valid API credentials from Wathq developer portal

### ⚠️ Data Impact
- Overwrites existing company and contact data
- Information accuracy depends on Commercial Registry data quality
- Manual verification recommended for critical information

## Related Actions

- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqCommercialInfoFetcher`

</div>

