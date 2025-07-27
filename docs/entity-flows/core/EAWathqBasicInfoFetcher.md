---
title: EAWathqBasicInfoFetcher
module: core
---

<div class='entity-flows'>

# EAWathqBasicInfoFetcher

**This document was generated using Claude.ai**

## Overview

Fetches basic commercial registration information from Saudi government's Wathq platform. Provides a lightweight alternative to the full commercial info fetcher, focusing on essential company identification data.

## When This Action Runs

Manual execution on entities implementing IHasCommercialInfo interface (customers, suppliers, companies) with valid Commercial Registration National Number.

## How It Works

1. Uses `/commercial-registration/info/` endpoint (lighter than `/fullinfo/`)
2. Processes response using shared `EAWathqCommercialInfoFetcher.copyInfo()` method
3. Updates company name and basic commercial details

## Key Differences from Full Fetcher

| Aspect | Basic Info | Full Info |
|--------|-----------|-----------|
| **Endpoint** | `/info/` | `/fullinfo/` |
| **Response** | Essential data | Complete details |
| **Performance** | Faster | Slower |
| **Use Case** | Quick validation | Complete setup |

## Key Parameters

- **Parameter 1:** API Key (Required) - Wathq platform API key
- **Parameter 2:** Bearer Token (Required) - OAuth token for authentication
- **Parameter 3:** Extra Fields Copier - Custom field mapping expressions
- **Parameter 4:** Do Not Copy Any Fields - Skip automatic field copying
- **Parameter 5:** Log Response - Log API response for debugging
- **Parameter 6:** Multi Call On Same Data - Allow multiple calls for same CR number

## Database Tables Affected

- **Target Entity** - Updates `name1`, `taxInfo.*` fields
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Important Warnings

### ⚠️ Limited Data Scope
- Basic information only - no comprehensive business details
- No address data (use EAWathqAddressFetcher)
- Not suitable for complete customer/supplier setup

### ⚠️ Processing Behavior
- May update more fields than just name due to shared logic
- Overwrites existing data with registry information

## Related Actions

- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqBasicInfoFetcher`

</div>

