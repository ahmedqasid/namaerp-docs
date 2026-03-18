---
title: EAKWSendIPSEvents
module: frm
---


<div class='entity-flows'>

# EAKWSendIPSEvents

**This document was generated using Claude.ai**

## Overview

Sends mail item status events to the International Postal System (IPS) for postal tracking integration. Processes mail items from entity detail collections and creates integration tasks to update postal tracking status in the external IPS system.

## When This Action Runs

Manual execution for updating postal tracking status when mail items change location, status, or encounter delivery issues. Typically used in postal management systems for international mail tracking compliance.

## How It Works

1. **Checks configuration** - Verifies FRM module configuration allows IPS event sending
2. **Processes detail records** - Iterates through specified detail collection containing mail items
3. **Validates mail items** - Checks mail item IDs against allowed prefix filters
4. **Builds event data** - Creates JSON payload with mail item details, office codes, and event information
5. **Looks up classifications** - Finds mail class codes from delivery entries or postal sort lines
6. **Creates integration tasks** - Saves IPS integration tasks for asynchronous processing
7. **Flushes changes** - Ensures all integration tasks are committed to database

## Parameters

**Parameter 1:** Office Code (Required) - Current postal office code handling the mail item

**Parameter 2:** Next Office Code (Optional) - Destination office code for forwarding

**Parameter 3:** Non Delivery Reason Code (Optional) - Code indicating reason for delivery failure

**Parameter 4:** Non Delivery Measure Code (Optional) - Code indicating corrective action taken

**Parameter 5:** Details Field ID (Required) - Field ID of the detail collection containing mail items

**Parameter 6:** Mail Item Field ID (Required) - Field ID within detail records containing mail item identifiers

**Parameter 7:** Event Code (Required) - IPS event code defining the type of status update

## Database Tables Affected

- **IPSIntegrationTask** - Creates new integration tasks for IPS communication
- **IPSEvent** - Reads event configuration for JSON formatting
- **DLVDeliveryEntry** - Looks up mail classification codes
- **IPSPostalParcelsSortLine** - Alternative lookup for mail classification codes
- **FRMConfiguration** - Reads module settings for IPS integration

**Module:** frm

**Full Class Name:** `com.namasoft.modules.frm.common.EAKWSendIPSEvents`


</div>