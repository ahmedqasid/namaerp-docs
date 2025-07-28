---
title: EASendCustomerToDatanuum
module: supplychain
---


<div class='entity-flows'>

# EASendCustomerToDatanuum

**This document was generated using Claude.ai**

## Overview

Synchronizes customer information with the Datanuum external service for reward points and loyalty program integration. Builds a JSON payload containing customer personal details and contact information, then sends it to Datanuum's API to create or update customer records in their loyalty platform.

## When This Action Runs

Manual execution when customer data needs to be synchronized with the Datanuum loyalty system, typically after customer registration, profile updates, or when setting up reward points integration for existing customers.

## How It Works

1. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
2. **Extracts POS register** - Gets POS register code from customer's ref5 field if available
3. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
4. **Builds customer payload** - Creates JSON request body with customer details:
   - Personal information (first name, last name, gender, birth date)
   - Contact details (mobile phone, email address)
   - Address information (nationality from country field)
5. **Sends to Datanuum** - Transmits customer data to Datanuum API endpoint
6. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Customer Data** - Reads customer personal and contact information (read-only)
- **External Datanuum System** - Creates/updates customer records via API calls

## Important Warnings

### ⚠️ External API Dependency
- Requires active internet connection to Datanuum services
- API calls may fail due to network issues or service downtime
- Timeout and connectivity errors are possible
- Consider retry mechanisms for critical synchronization operations

### ⚠️ Required Configuration Setup
- RewardPointsConfig must exist and be properly configured
- Configuration must contain valid Datanuum API credentials and endpoints
- Invalid configuration causes immediate processing failure
- Test configuration thoroughly before production use

### ⚠️ Customer Data Requirements
- Requires Customer entity with basic name fields (name1, name2)
- Other fields (phone, email, gender, birth date) are optional but recommended
- Missing contact information reduces loyalty program effectiveness
- Incomplete customer data may cause API validation errors

### ⚠️ POS Register Integration
- POS register code is extracted from customer's ref5 field
- Ref5 must reference a NamaPOSRegister entity type
- Invalid or missing POS register references are handled gracefully
- POS integration affects reward point attribution and tracking

### ⚠️ Personal Data Privacy
- Transmits personally identifiable information (PII) to external service
- Ensure compliance with data protection regulations (GDPR, CCPA)
- Customer consent may be required for data sharing
- Review data retention and deletion policies with Datanuum

### ⚠️ API Data Format Requirements
- Customer data is converted to specific JSON format expected by Datanuum
- Date formats must match API specifications (yyyy-MM-dd)
- Field mapping is fixed and cannot be customized through parameters
- API format changes may require code updates

### ⚠️ Contact Information Processing
- Mobile phone and email are critical for customer communication
- Invalid contact formats may cause API rejection
- Contact information must be current and verified
- Multiple contact methods improve customer experience

### ⚠️ Error Handling and Recovery
- Uses accumulating result pattern to collect API errors
- Failed synchronization does not prevent customer operations
- Manual retry may be needed for failed synchronizations
- Monitor error logs for synchronization issues

### ⚠️ Data Consistency Considerations
- Customer data changes in ERP are not automatically synchronized
- Manual execution required after customer updates
- Timing delays may cause inconsistencies between systems
- Consider automated synchronization triggers for critical changes

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendCustomerToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- Other Datanuum integration entity flows
- Reward points management actions
- Customer data synchronization utilities


</div>

