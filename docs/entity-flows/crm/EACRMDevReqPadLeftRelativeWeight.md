---
title: EACRMDevReqPadLeftRelativeWeight
module: crm
---


<div class='entity-flows'>

# EACRMDevReqPadLeftRelativeWeight

**This document was generated using Claude.ai**

## Overview

Formats the relative weight field in CRM development requests by padding it with leading zeros to a specified length. Ensures consistent numeric formatting for prioritization, sorting, or display purposes in development request management.

## When This Action Runs

Manual execution for standardizing relative weight values in development requests, typically used during data cleanup, import processes, or when consistent formatting is required for reporting and prioritization.

## How It Works

1. **Determines padding length** - Uses specified parameter value or defaults to 4 characters
2. **Checks field existence** - Verifies that the relative weight field contains a value
3. **Converts to integer** - Parses the existing relative weight value as an integer
4. **Applies left padding** - Adds leading zeros to reach the specified total length
5. **Updates field** - Replaces the original relative weight with the padded version

## Parameters

**Parameter 1:** Length to Pad (Optional) - Total character length for the padded relative weight (default: 4)

## Usage Examples

With default padding (4 characters):
- Original: "5" → Result: "0005"
- Original: "12" → Result: "0012"
- Original: "100" → Result: "0100"

With custom padding (6 characters):
- Original: "5" → Result: "000005"
- Original: "123" → Result: "000123"

## Database Tables Affected

- **CRMDevelopmentRequest** - Updates the relative weight field with padded formatting

**Module:** crm

**Full Class Name:** `com.namasoft.modules.crm.domain.entities.EACRMDevReqPadLeftRelativeWeight`


</div>

