---
title: EARefreshGoogleDriveOrMailToken
module: core
---


<div class='entity-flows'>

# EARefreshGoogleDriveOrMailToken

**This document was generated using Claude.ai**

## Overview

Refreshes Google OAuth tokens for Google Drive or Gmail integration by re-authenticating and testing the connection. This action forces token renewal and validates connectivity to Google services.

## When This Action Runs

Manual execution when Google API integration fails due to expired or invalid OAuth tokens, typically after authentication errors or when Google access stops working.

## How It Works

1. **Locates OAuth configuration** - Finds the OAuthFile entity by code or ID
2. **Retrieves credentials** - Gets Google OAuth credentials with 5-minute timeout
3. **Builds Google Drive service** - Creates authenticated Google Drive service connection
4. **Tests connectivity** - Executes a simple file list operation to validate the token
5. **Updates token** - Token is automatically refreshed during the authentication process

## Parameters

**Parameter 1:** OAuth file code or ID (Required) - Business code or entity ID of the OAuthFile containing Google credentials

## Database Tables Affected

- **OAuthFile** - Reads Google OAuth configuration and credentials
- **Google Token Storage** - OAuth tokens may be refreshed and updated during the process

## Important Warnings

### ⚠️ OAuth Configuration Requirements
- OAuthFile must exist and contain valid Google OAuth credentials
- OAuth configuration must be properly set up for Google Drive/Gmail access
- Network connectivity to Google APIs is required

### ⚠️ Authentication Impact
- Forces token refresh which may affect other concurrent Google operations
- May require user re-authentication if refresh token is invalid
- 5-minute timeout for credential retrieval operations

### ⚠️ Service Dependencies
- Requires Google Drive API access permissions
- Network connectivity to Google services is essential
- May fail if Google services are temporarily unavailable

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EARefreshGoogleDriveOrMailToken`


</div>