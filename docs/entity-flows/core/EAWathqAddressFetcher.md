---
title: EAWathqAddressFetcher
module: core
---


<div class='entity-flows'>

# EAWathqAddressFetcher

**This document was generated using Claude.ai**

## Overview

This entity flow fetches comprehensive address information from the Saudi government's Wathq platform (wathq.sa) using a company's Commercial Registration National Number. It automatically populates all address fields in the entity's contact information with official data from the Saudi commercial registry.

## When This Action Runs

- **Trigger:** Manual execution on entities with commercial registration information
- **Target:** Any entity implementing IHasCommercialInfo interface (typically customers, suppliers)
- **Requirement:** Valid Commercial Registration National Number must be present
- **API Dependency:** Requires active Wathq API credentials and internet connectivity

## How It Works

### 1. Prerequisites Validation
- **Commercial Number Check:** Verifies that `crNationalNumber` field is not empty
- **Duplicate Call Prevention:** Checks for previous Wathq calls on the same commercial number
- **API Credentials:** Validates that API key and bearer token are provided
- **Entity Type:** Ensures target entity has commercial information fields

### 2. API Request Process
- **URL Construction:** Builds request to `https://api.wathq.sa/spl/national/address/info/{crNationalNumber}`
- **Language Support:** Adds language parameter based on current user language (Arabic/English)
- **Authentication:** Includes API key and bearer token in request headers
- **HTTP Method:** Uses GET request with JSON content type

### 3. Response Processing
- **JSON Parsing:** Converts API response to WathqCommercialAddressInfo object
- **Field Mapping:** Maps Wathq fields to Nama ERP address structure
- **Error Handling:** Uses "Not Found" for missing or null values
- **Address Creation:** Creates new Address object if none exists

### 4. Data Population
- **Complete Address:** Updates all standard address fields
- **Geographic Data:** Sets latitude/longitude coordinates for mapping
- **Saudi Standards:** Follows Saudi address format (district, building number, etc.)
- **Immediate Update:** Changes apply immediately to the entity

## Address Fields Updated

The action automatically populates these address fields:

| Nama ERP Field | Wathq Source | Description |
|----------------|--------------|-------------|
| `address1` | address | Primary address line |
| `address2` | address2 | Secondary address line |
| `mapLocation` | latitude + longitude | GPS coordinates |
| `postalCode` | postCode | Postal/ZIP code |
| `city` | city | City name |
| `street` | street | Street name |
| `buildingNumber` | buildingNumber | Building number |
| `district` | district | District/neighborhood |
| `landPlotNumber` | unitNumber | Unit/plot number |

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

### Parameter 3: Extra Fields Copier
- **Type:** Text (Optional)
- **Format:** Field mapping expressions similar to EAFieldsValuesCalculator
- **Purpose:** Copy additional fields from API response to entity

**Examples:**
```
description1=$map.street
name2=$map.district
remarks=$map.buildingNumber
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
  - `contactInfo.address.*`: All address fields updated with Wathq data
  - Changes applied to current entity record

### Audit Tables
- **WathqCallInfo:** Logs all Wathq API calls
  - `commercialRegNo`: Commercial registration number used
  - `crNationalNumber`: National number for the call
  - `entityActionKlass`: This action class name
  - `onRecord`: Reference to the entity that triggered the call
  - `user`: User who executed the action
  - `onTime`: Timestamp of the API call
  - `wathqResponse`: Complete JSON response from Wathq

## Business Use Cases

### 1. Customer Registration
- **New Customer Setup:** Automatically populate address when adding Saudi customers
- **Data Accuracy:** Ensure addresses match official commercial registry
- **Time Saving:** Eliminate manual address entry for registered businesses

### 2. Supplier Management
- **Vendor Onboarding:** Validate and populate supplier addresses
- **Compliance Requirements:** Use official addresses for tax and legal documentation
- **Address Verification:** Confirm supplier location accuracy

### 3. Data Cleansing
- **Address Updates:** Refresh existing customer/supplier addresses
- **Standardization:** Ensure all addresses follow Saudi format standards
- **Geographic Data:** Add GPS coordinates for mapping and logistics

## SQL Query for Monitoring

To check recent Wathq address calls:

```sql
SELECT 
    w.crNationalNumber,
    w.onRecordEntityType,
    w.onRecordId,
    w.userCode,
    w.onTime,
    CASE 
        WHEN LEN(w.wathqResponse) > 100 
        THEN 'Response received'
        ELSE 'No response'
    END AS ResponseStatus
FROM WathqCallInfo w
WHERE w.entityActionKlass = 'EAWathqAddressFetcher'
    AND w.onTime >= DATEADD(day, -30, GETDATE())
ORDER BY w.onTime DESC;
```

## Important Warnings

### ⚠️ API Dependencies
- **Internet Required:** Action requires stable internet connection to Wathq servers
- **API Credentials:** Invalid or expired credentials will cause action failure
- **Rate Limits:** Wathq may impose API call limits per day/month
- **Service Availability:** Government API may have maintenance downtime

### ⚠️ Data Accuracy
- **Registry Dependency:** Address accuracy depends on Commercial Registry data quality
- **Update Lag:** Registry data may not reflect recent address changes
- **Overwrite Warning:** Action overwrites existing address data completely
- **Validation Required:** Verify critical addresses manually when needed

### ⚠️ Commercial Registration Requirements
- **Valid CR Number:** Only works with valid Saudi Commercial Registration numbers
- **Active Registration:** Inactive or cancelled registrations may return no data
- **Number Format:** Ensure CR National Number is correctly formatted

### ⚠️ Security Considerations
- **API Key Security:** Protect API credentials from unauthorized access
- **Audit Trail:** All API calls are logged with user and timestamp
- **Data Privacy:** Wathq responses may contain sensitive business information
- **Access Control:** Restrict action execution to authorized personnel only

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqAddressFetcher`

**Related Actions:**
- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)


</div>

