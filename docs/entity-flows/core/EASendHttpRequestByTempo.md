---
title: EASendHttpRequestByTempo
module: core
---


<div class='entity-flows'>

# EASendHttpRequestByTempo

**This document was generated using Claude.ai**

## Overview

Generates HTTP requests using Tempo templates and queues them for asynchronous execution. Parses Tempo content to extract HTTP request definitions and creates pending system actions for external API communication.

## When This Action Runs

Manual execution for integrating with external APIs, web services, or third-party systems. Commonly used for sending notifications, synchronizing data, or triggering external workflows based on entity changes.

## How It Works

1. **Parses Tempo template** - Processes the Tempo template using ComplexRenderer to extract HTTP request definitions
2. **Renders entity data** - Uses entity data to populate template variables and generate final HTTP request content
3. **Extracts HTTP requests** - Identifies all HTTP request blocks defined in the rendered Tempo content
4. **Creates pending actions** - Generates PendingSystemAction records for each HTTP request
5. **Queues for execution** - Stores requests in the system action queue for asynchronous processing

## Parameters

**Parameter 1:** Request Tempo (Required) - Tempo template containing HTTP request definitions with entity data placeholders
**Parameter 2:** Do Not Delete Task After Finishing (Optional) - true/false to preserve action records after execution (default: false)

## Tempo Template Structure

The Tempo template should define HTTP requests using the system's HTTP request format:
- Example 1:
```tempo
{loop(details)}
{httprequest}
 {requesturl}https://namasoft.com/api/v3.0/item{endurl}
 {requestmethod}POST{endmethod}
 {contenttype}application/json{endcontenttype}
 {charset}utf8{endcharset}
 {headername}api-key{endheadername}
 {headervalue}xxHjjk889523{endheadervalue}
 {paramname}company_name{endparamname}
 {paramvalue}{legalEntity.name2}{endparamvalue}
 {bodypartname}user_whatsapp_number{endbodypartname}
 {bodypartvalue}{details.ref1.$toReal.contactInfo.mobile}{endbodypartvalue}
 {bodypartname}ordernumber{endbodypartname}
 {bodypartvalue}{details.ref2.$toReal.code}{endbodypartvalue}
{endrequest}
{endloop}
```
- Example 2:
```tempo
{loop(details)}
{httprequest}
 {requesturl}https://namasoft.com/api/v3.0/item{endurl}
 {requestmethod}POST{endmethod}
 {contenttype}application/json{endcontenttype}
 {charset}utf8{endcharset}
 {headername}api-key{endheadername}
 {headervalue}xxHjjk889523{endheadervalue}
 {paramname}company_name{endparamname}
 {paramvalue}{legalEntity.name2}{endparamvalue}
 {requestbody}
\{
"user_whatsapp_number":"{details.ref1.$toReal.contactInfo.mobile}"
,"ordernumber":"{details.ref2.$toReal.code}"
\}
{endbody}
{endrequest}
{endloop}
```
## Database Tables Affected

- **PendingSystemAction** - Creates new records for HTTP request execution
- **Entity Data** - Reads entity data to populate Tempo template variables

## Important Warnings

### ⚠️ Tempo Template Requirements
- Template must contain valid HTTP request definitions
- Entity field references use {entity.fieldName} syntax
- Invalid Tempo syntax will cause parsing failures
- Missing required HTTP elements (URL, Method) will cause execution errors

### ⚠️ HTTP Request Configuration
- URL must be accessible from the server environment
- Authentication headers should be properly configured
- Request timeouts and retry logic are handled by the system action processor
- Large request bodies may cause memory or size limit issues

### ⚠️ Asynchronous Execution
- HTTP requests are queued for background processing, not executed immediately
- Execution timing depends on system action processor schedule
- Failed requests may be retried based on system configuration
- Success/failure status is recorded in PendingSystemAction records

### ⚠️ Security Considerations
- Sensitive data in templates (passwords, API keys) should be handled carefully
- Template content is stored in pending action records
- External URLs should be validated and trusted endpoints only
- Consider using entity field references rather than hardcoded credentials

### ⚠️ Template Processing
- Entity data is rendered into template at action execution time
- Complex entity relationships may require careful template design
- Template parsing errors will prevent action creation
- Large templates may impact parsing performance

### ⚠️ Action Management
- Default behavior deletes action records after successful execution
- Use Parameter 2 to preserve records for audit or debugging purposes
- Failed actions remain in queue for retry or manual intervention
- Monitor pending action queue to prevent accumulation

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EASendHttpRequestByTempo`


</div>

