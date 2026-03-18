---
title: EANotifyIfSSLCertificateAboutToExpire
module: supplychain
---


<div class='entity-flows'>

# EANotifyIfSSLCertificateAboutToExpire

**This document was generated using Claude.ai**

## Overview

Monitors SSL certificate expiration dates for specified websites and sends email notifications when certificates are about to expire. Connects to HTTPS URLs, retrieves certificate information, and creates pending email tasks when expiration is within the warning period.

## When This Action Runs

Manual execution or scheduled automation to monitor SSL certificate health, typically used by system administrators to proactively manage certificate renewals and prevent website security issues.

## How It Works

1. **Parses input parameters** - Reads CSV lists of URLs and corresponding common names
2. **Validates input data** - Ensures URL and common name lists have matching counts
3. **Processes each URL** - For each URL-common name pair:
   - Establishes HTTPS connection to the URL
   - Retrieves SSL certificate chain from the server
   - Searches for certificate matching the common name
   - Extracts certificate expiration date
4. **Calculates remaining days** - Compares expiration date with current date
5. **Creates notifications** - If remaining days < warning period, creates email pending task
6. **Handles connection errors** - Retries failed connections up to 10 times with delays

## Parameters

**Parameter 1:** Reserved (Not used)

**Parameter 2:** URLs (Required) - Comma-separated list of HTTPS URLs to check

Example: `https://crm.namasoft.com:8443/,https://erp.namasoft.com/`

**Parameter 3:** Common Names (Required) - Comma-separated list of certificate common names to match

Example: `crm.namasoft.com,erp.namasoft.com`

**Parameter 4:** Warning Period In Days (Optional) - Days before expiration to trigger alerts (default: 10)

**Parameter 5:** Send To Email (Optional) - Email address for notifications (default: a.qasid@namasoft.com)

## Database Tables Affected

- **PendingTask** - Creates email notification tasks for certificates about to expire

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EANotifyIfSSLCertificateAboutToExpire`

**Related Systems:**
- Email notification system for sending alerts
- Network infrastructure for HTTPS connectivity
- Certificate management systems for renewals


</div>

