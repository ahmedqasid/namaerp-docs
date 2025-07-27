---
title: EAWathqCommercialInfoFetcher
module: core
---


<div class='entity-flows'>

# EAWathqCommercialInfoFetcher

**This document was generated using Claude.ai**

## Overview

This entity flow fetches comprehensive commercial registration information from the Saudi government's Wathq platform (wathq.sa) using a company's Commercial Registration National Number. It retrieves and populates core business information including company name, registration details, and contact information from the official Saudi commercial registry.

## When This Action Runs

- **Trigger:** Manual execution on entities with commercial registration information
- **Target:** Any entity implementing IHasCommercialInfo interface (customers, suppliers, companies)
- **Requirement:** Valid Commercial Registration National Number must be present
- **API Dependency:** Requires active Wathq API credentials and internet connectivity

## How It Works

### 1. Prerequisites Validation
- **Commercial Number Check:** Verifies that `crNationalNumber` field is not empty
- **Duplicate Call Prevention:** Checks for previous Wathq calls on the same commercial number
- **API Credentials:** Validates that API key and bearer token are provided
- **Entity Type:** Ensures target entity has commercial information fields

### 2. API Request Process
- **URL Construction:** Builds request to `https://api.wathq.sa/commercial-registration/fullinfo/{crNationalNumber}`
- **Language Support:** Adds language parameter based on current user language (Arabic/English)
- **Authentication:** Includes API key and bearer token in request headers
- **HTTP Method:** Uses GET request with JSON content type

### 3. Response Processing
- **JSON Parsing:** Converts API response to WathqCommercialInfo object
- **Field Mapping:** Maps Wathq fields to Nama ERP entity structure
- **Contact Information:** Updates email, phone, mobile, and website details
- **Registration Data:** Updates commercial registration number and company name

### 4. Data Population
- **Core Information:** Updates company name and commercial registration details
- **Contact Details:** Populates email, mobile, telephone, and website fields
- **Immediate Update:** Changes apply immediately to the entity
- **Official Data:** Ensures information matches government registry

## Commercial Information Fields Updated

The action automatically populates these core business fields:

| Nama ERP Field | Wathq Source | Description |
|----------------|--------------|-------------|
| `name1` | name | Official company name |
| `taxInfo.commercialRegNo` | crNumber | Commercial registration number |
| `taxInfo.crNationalNumber` | crNationalNumber | CR national identifier |
| `contactInfo.email` | contactInfo.email | Company email address |
| `contactInfo.mobile` | contactInfo.mobileNo | Mobile phone number |
| `contactInfo.telephone1` | contactInfo.phoneNo | Primary telephone |
| `contactInfo.website` | contactInfo.websiteUrl | Company website |

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
description1=$map.issueDateHijri
name2=$map.headquarterCityName
remarks=$map.legalStatusName
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
  - `name1`: Updated with official company name
  - `taxInfo.*`: Commercial registration fields updated
  - `contactInfo.*`: Contact information fields populated

### Audit Tables
- **WathqCallInfo:** Logs all Wathq API calls
  - `commercialRegNo`: Commercial registration number used
  - `crNationalNumber`: National number for the call
  - `entityActionKlass`: This action class name (EAWathqCommercialInfoFetcher)
  - `onRecord`: Reference to the entity that triggered the call
  - `user`: User who executed the action
  - `onTime`: Timestamp of the API call
  - `wathqResponse`: Complete JSON response from Wathq

## Business Use Cases

### 1. Customer Registration
- **New Customer Setup:** Automatically populate core information when adding Saudi customers
- **Data Accuracy:** Ensure company details match official commercial registry
- **Time Saving:** Eliminate manual entry of company name and contact information

### 2. Supplier Management
- **Vendor Onboarding:** Validate and populate supplier company information
- **Compliance Requirements:** Use official data for tax and legal documentation
- **Information Verification:** Confirm supplier legitimacy and contact details

### 3. Data Maintenance
- **Information Updates:** Refresh existing customer/supplier company details
- **Standardization:** Ensure all company names follow official registry format
- **Contact Verification:** Update phone numbers, emails, and websites from registry

## SQL Query for Monitoring

To check recent Wathq commercial info calls:

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
WHERE w.entityActionKlass = 'EAWathqCommercialInfoFetcher'
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
- **Registry Dependency:** Information accuracy depends on Commercial Registry data quality
- **Update Lag:** Registry data may not reflect recent company changes
- **Overwrite Warning:** Action overwrites existing company and contact data
- **Validation Required:** Verify critical information manually when needed

### ⚠️ Commercial Registration Requirements
- **Valid CR Number:** Only works with valid Saudi Commercial Registration numbers
- **Active Registration:** Inactive or cancelled registrations may return no data
- **Number Format:** Ensure CR National Number is correctly formatted

### ⚠️ Security Considerations
- **API Key Security:** Protect API credentials from unauthorized access
- **Audit Trail:** All API calls are logged with user and timestamp
- **Data Privacy:** Wathq responses may contain sensitive business information
- **Access Control:** Restrict action execution to authorized personnel only

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqCommercialInfoFetcher`

**Related Actions:**
- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)


</div>

