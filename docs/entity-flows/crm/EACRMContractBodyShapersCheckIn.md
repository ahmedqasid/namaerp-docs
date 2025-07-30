---
title: EACRMContractBodyShapersCheckIn
module: crm
---


<div class='entity-flows'>

# EACRMContractBodyShapersCheckIn

**This document was generated using Claude.ai**

## Overview

Records customer check-in for CRM service contracts by creating or updating meeting remark documents. Validates contract existence and validity, then logs check-in time with optional hour adjustments and comments for service contract tracking.

## When This Action Runs

Manual execution when customers check in for services under active CRM service contracts. Typically used for fitness centers, gyms, spas, or other service-based businesses that track customer attendance.

## How It Works

1. **Finds active contract** - Locates the customer's most recent CRM service contract by value date
2. **Validates contract existence** - Ensures customer has at least one service contract
3. **Checks contract validity** - Verifies contract has active service lines covering today's date
4. **Creates/updates check-in record** - Finds existing meeting remark or creates new one using contract code
5. **Records check-in details** - Adds new meeting remark line with current date, adjusted time, and customer reference
6. **Saves check-in** - Commits the meeting remark document with check-in information

## Parameters

**Parameter 1:** Added Hours (Optional) - Number of hours to add to current time for check-in timestamp (can be decimal)

**Parameter 2:** Value for text1 (Optional) - Additional text/comments to record with the check-in

## Database Tables Affected

- **CRMServiceContract** - Reads customer's service contracts to find active contract
- **ServiceContractLine** - Checks contract line validity dates
- **MeetingRemark** - Creates or updates check-in document
- **MeetingRemarkLine** - Adds new check-in entry with timestamp and details

## Important Warnings

### ⚠️ Contract Requirements
- Customer must have at least one CRM service contract
- Action fails if no service contracts exist for the customer
- Contract must have valid service lines covering the current date
- Expired contracts prevent check-in recording

### ⚠️ Contract Validity Checking
- System checks if today's date falls within any service contract line period
- Service lines must have start date ≤ today ≤ actual end time
- If no valid service lines exist, check-in is rejected
- Contract expiration is enforced at the service line level

### ⚠️ Meeting Remark Document Management
- Uses contract code as the business code for meeting remark document
- Creates new document if none exists, updates existing if found
- Multiple check-ins for same contract accumulate in same document
- Document editing state is managed automatically

### ⚠️ Time Adjustment Handling
- Parameter 1 allows adding hours to current system time
- Hours can be decimal values (e.g., 0.5 for 30 minutes)
- Time adjustment affects only the recorded check-in time
- Negative values can be used to record past check-ins

### ⚠️ Data Integrity
- Each check-in creates a new meeting remark line
- Check-in date is always set to today regardless of time adjustment
- Customer reference is stored in the check-in line
- Contract reference is stored at the document level

### ⚠️ Business Logic Impact
- Check-ins may trigger attendance tracking calculations
- Service usage reporting may depend on check-in records
- Contract utilization metrics may be affected
- Integration with billing or membership systems may occur

**Module:** crm

**Full Class Name:** `com.namasoft.modules.crm.domain.entityactions.EACRMContractBodyShapersCheckIn`


</div>