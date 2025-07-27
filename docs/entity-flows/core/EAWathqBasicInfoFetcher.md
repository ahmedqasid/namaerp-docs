---
title: EAWathqBasicInfoFetcher
module: core
---


<div class='entity-flows'>

# EAWathqBasicInfoFetcher

**This document was generated using Claude.ai**

## Overview

This entity flow fetches basic commercial registration information from the Saudi government's Wathq platform (wathq.sa) using a company's Commercial Registration National Number. It provides a lightweight alternative to the full commercial info fetcher, focusing primarily on essential company identification data.

## When This Action Runs

- **Trigger:** Manual execution on entities with commercial registration information
- **Target:** Any entity implementing IHasCommercialInfo interface (customers, suppliers, companies)
- **Requirement:** Valid Commercial Registration National Number must be present
- **Purpose:** Quick validation and basic information retrieval from Saudi commercial registry

## How It Works

### 1. API Endpoint Difference
- **Basic Info URL:** Uses `/commercial-registration/info/` endpoint (lighter response)
- **Full Info Comparison:** Unlike EAWathqCommercialInfoFetcher which uses `/fullinfo/` endpoint
- **Reduced Data:** Fetches essential information without extensive details
- **Performance:** Faster response times due to lighter payload

### 2. Shared Processing Logic
- **Data Processing:** Uses the same `EAWathqCommercialInfoFetcher.copyInfo()` method
- **Field Mapping:** Applies identical field mapping logic as the full version
- **Inheritance:** Extends EAAbstractWathq with same validation and logging
- **API Structure:** Follows same authentication and parameter patterns

### 3. Response Handling
- **JSON Processing:** Converts API response to WathqCommercialInfo object
- **Field Population:** Updates company name and basic commercial details
- **Error Handling:** Uses same error handling as other Wathq actions
- **Logging:** Maintains same audit trail and logging capabilities

## Key Differences from Full Commercial Info Fetcher

| Aspect | EAWathqBasicInfoFetcher | EAWathqCommercialInfoFetcher |
|--------|-------------------------|------------------------------|
| **API Endpoint** | `/info/` | `/fullinfo/` |
| **Response Size** | Smaller, essential data | Complete commercial details |
| **Performance** | Faster | Slower |
| **Data Scope** | Basic company information | Comprehensive business data |
| **Use Case** | Quick validation | Complete setup |

## Information Fields Updated

The action primarily focuses on updating:

| Nama ERP Field | Description | Source Priority |
|----------------|-------------|----------------|
| `name1` | Official company name | Primary focus |
| `taxInfo.commercialRegNo` | Commercial registration number | Basic validation |
| `taxInfo.crNationalNumber` | CR national identifier | Registry confirmation |

**Note:** This action may populate additional fields through the shared `copyInfo()` method, but the primary intent is basic company name validation.

## Parameters

### Parameter 1: API Key
- **Type:** Text (Required)
- **Format:** Wathq platform API key
- **Source:** Obtained from Wathq developer portal
- **Security:** Keep confidential, do not share

### Parameter 2: Bearer Token
- **Type:** Text (Required)
- **Format:** OAuth bearer token for API authentication
- **Source:** Generated through Wathq authentication process
- **Expiry:** May expire and require renewal

### Parameter 3: Extra Fields Copier
- **Type:** Text (Optional)
- **Format:** Field mapping expressions similar to EAFieldsValuesCalculator
- **Purpose:** Copy additional fields from API response to entity

**Examples:**
```
description1=$map.crNumber
remarks=$map.issueDateHijri
name2=$map.legalStatusName
```

### Parameter 4: Do Not Copy Any Fields
- **Values:** `true` or `false` (Optional, defaults to false)
- **Purpose:** Skip automatic field copying for manual processing
- **Use Case:** When you want to process the API response manually

### Parameter 5: Log Response
- **Values:** `true` or `false` (Optional, defaults to false)
- **Purpose:** Log the complete API response for debugging
- **Location:** Response logged to application log files

### Parameter 6: Multi Call On Same Data
- **Values:** `true` or `false` (Optional, defaults to false)
- **Purpose:** Allow multiple API calls for the same commercial registration number
- **Default Behavior:** Prevents duplicate calls to save API quota

## Database Tables Affected

### Primary Tables
- **Target Entity:** Any entity with IHasCommercialInfo interface
  - `name1`: Updated with official company name from registry
  - `taxInfo.*`: Basic commercial registration fields confirmed
  - Fields updated depend on API response content

### Audit Tables
- **WathqCallInfo:** Logs all Wathq API calls
  - `commercialRegNo`: Commercial registration number used
  - `crNationalNumber`: National number for the call
  - `entityActionKlass`: This action class name (EAWathqBasicInfoFetcher)
  - `onRecord`: Reference to the entity that triggered the call
  - `user`: User who executed the action
  - `onTime`: Timestamp of the API call
  - `wathqResponse`: Complete JSON response from Wathq

## Business Use Cases

### 1. Quick Company Name Validation
- **Name Verification:** Confirm company names match official registry
- **Data Quality:** Ensure basic information accuracy without full data load
- **Performance Critical:** When speed is more important than completeness

### 2. Lightweight Registry Checks
- **CR Number Validation:** Verify commercial registration numbers are valid
- **Basic Compliance:** Meet minimum registry validation requirements
- **Batch Processing:** Validate multiple entities quickly

### 3. API Quota Conservation
- **Cost Efficiency:** Use lighter API calls when full data isn't needed
- **Rate Limit Management:** Preserve API quota for detailed calls
- **Resource Optimization:** Reduce bandwidth and processing overhead

## SQL Query for Monitoring

To check recent Wathq basic info calls:

```sql
SELECT 
    w.crNationalNumber,
    w.onRecordEntityType,
    w.onRecordId,
    w.userCode,
    w.onTime,
    CASE 
        WHEN LEN(w.wathqResponse) > 50 
        THEN 'Response received'
        ELSE 'No response'
    END AS ResponseStatus
FROM WathqCallInfo w
WHERE w.entityActionKlass = 'EAWathqBasicInfoFetcher'
    AND w.onTime >= DATEADD(day, -30, GETDATE())
ORDER BY w.onTime DESC;
```

## Important Warnings

### ⚠️ Limited Data Scope
- **Basic Information Only:** Does not provide comprehensive business details
- **Contact Information:** May not include complete contact details
- **Address Data:** Does not fetch address information (use EAWathqAddressFetcher)
- **Incomplete Profile:** Not suitable for complete customer/supplier setup

### ⚠️ API Endpoint Differences
- **Response Variation:** API response may differ from full info endpoint
- **Data Availability:** Some fields may not be available in basic response
- **Version Dependencies:** API endpoint behavior may change over time
- **Testing Required:** Verify response format matches expectations

### ⚠️ Shared Processing Logic
- **Field Updates:** May update more fields than just `name1` due to shared logic
- **Overwrite Behavior:** Will overwrite existing data with registry information
- **Processing Dependencies:** Inherits behavior from EAWathqCommercialInfoFetcher
- **Consistency:** Ensure compatibility with other Wathq actions

### ⚠️ Performance Considerations
- **Not Always Faster:** Performance gain depends on API response size
- **Network Factors:** Internet connection quality affects speed
- **API Availability:** Government API may have varying response times
- **Caching:** Consider API call frequency to avoid unnecessary requests

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqBasicInfoFetcher`

**Related Actions:**
- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)


</div>

