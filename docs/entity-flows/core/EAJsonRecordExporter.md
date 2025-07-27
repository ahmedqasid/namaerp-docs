---
title: EAJsonRecordExporter
module: core
---


<div class='entity-flows'>

# EAJsonRecordExporter

**This document was generated using Claude.ai**

## Overview

This entity flow exports entity data as JSON to external systems via HTTP requests. It converts entity field data to JSON format, applies field filtering and renaming transformations, and sends the data to specified endpoints using GET or POST methods. This action is essential for real-time data integration and synchronization with external systems.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for data export integration
- **Target:** Any entity requiring JSON export to external systems
- **Purpose:** Export entity data in JSON format to external APIs and systems
- **Timing:** Used for real-time data synchronization, API integration, and external system notifications

## How It Works

### 1. Entity Data Collection and Filtering
- **Field Selection:** Collects only specified fields from the entity for export
- **Field Filtering:** Applies CSV field list to determine which fields to include
- **Data Extraction:** Extracts field values from the entity using internal field access
- **Collection Processing:** Handles both header fields and collection data

### 2. JSON Transformation and Renaming
- **Field Renaming:** Applies field name mapping to transform internal field names to external names
- **JSON Conversion:** Converts entity data to structured JSON format
- **Data Formatting:** Formats data appropriately for JSON transmission
- **Structure Preservation:** Maintains entity data relationships in JSON structure

### 3. HTTP Request Preparation and Transmission
- **URL Processing:** Processes URL templates using Tempo rendering for dynamic URLs
- **HTTP Method Selection:** Configures GET or POST method based on parameters
- **Header Configuration:** Sets appropriate HTTP headers for JSON transmission
- **Request Transmission:** Sends JSON data to the specified endpoint

### 4. Logging and Testing Support
- **Test Mode:** Supports log-only mode for testing without actual HTTP transmission
- **Error Logging:** Logs export operations and any errors encountered
- **Request Logging:** Logs JSON data to system logs when in test mode
- **Debug Support:** Provides debug output for troubleshooting integrations

## Key Features

### Flexible Field Export
- **Selective Field Export:** Export only specified fields to reduce data transmission
- **Field Renaming:** Transform internal field names to external system requirements
- **CSV Field Configuration:** Simple CSV format for specifying fields to export
- **Dynamic Field Mapping:** Support for complex field mapping and transformation

### HTTP Integration Support
- **Multiple HTTP Methods:** Support for GET and POST HTTP methods
- **Dynamic URL Generation:** Tempo-based URL generation for dynamic endpoints
- **JSON Content Type:** Automatic JSON content-type handling
- **Error Handling:** Robust error handling for HTTP transmission failures

### Development and Testing
- **Test Mode:** Log-only mode for testing integrations without sending requests
- **Debug Logging:** Comprehensive logging for troubleshooting export operations
- **Parameter Validation:** Built-in parameter validation for reliable operation
- **Suggestion Support:** Provides suggestions for HTTP methods and parameters

## Parameters

### Parameter 1: Request Type (Optional)
- **Type:** Text (GET or POST)
- **Purpose:** HTTP method to use for sending the JSON data
- **Default:** POST
- **Values:** "GET" or "POST"
- **Examples:** `POST`, `GET`

**HTTP Method Selection:**
- **POST:** Default method, suitable for most data export scenarios
- **GET:** Alternative method, JSON data sent as query parameter

### Parameter 2: URL Tempo (Required)
- **Type:** Tempo Template
- **Purpose:** Destination URL for sending the JSON data
- **Format:** URL with optional Tempo field references
- **Examples:** 
  - `https://api.example.com/entities`
  - `https://api.example.com/customers/{customer.code}`
  - `http://localhost:8080/api/entities/{id}`

**URL Template Examples:**
```
# Static URLs
https://api.external-system.com/entities
https://webhook.example.com/data

# Dynamic URLs using entity fields
https://api.example.com/customers/{customer.id}
https://api.example.com/orders/{orderNumber}
```

### Parameter 3: Only Export Fields (Optional)
- **Type:** CSV Field List
- **Purpose:** Comma-separated list of fields to include in JSON export
- **Format:** Field names separated by commas
- **Default:** All fields if empty
- **Examples:** `code,name1,amount`, `customer.name1,orderDate,total`

**Field Selection Examples:**
```
# Basic fields
code,name1,description,amount

# Entity reference fields
customer.code,customer.name1,supplier.name1

# Collection fields
details.item.code,details.quantity,details.price
```

### Parameter 4: Rename Fields To (Optional)
- **Type:** Field Mapping Configuration
- **Purpose:** Maps internal field names to external field names in JSON
- **Format:** `internalField=externalField` on separate lines
- **Examples:**
```
code=cust_code
name1=arabic_name
customer.name1=customer_name
```

**Field Renaming Examples:**
```
# Basic field renaming
code=entity_code
name1=entity_name
description=entity_description

# Complex field renaming
customer.code=customer_id
customer.name1=customer_name
orderDate=order_date
totalAmount=total_value
```

### Parameter 5: Do Not Send Request (Optional)
- **Type:** Boolean
- **Purpose:** When true, logs JSON to system log instead of sending HTTP request
- **Values:** "true" or "false" (or empty for false)
- **Default:** false (send HTTP request)
- **Usage:** Set to "true" for testing and debugging

## Database Tables Affected

### Entity Data Access (Read-Only)
- **Source Entity:** Reads field data from the target entity
- **Related Entities:** Accesses related entity data through references
- **Collection Data:** Reads collection data when specified in field list
- **Field Navigation:** Navigates entity relationships for complex field access

### No Database Modifications
- **Read-Only Operation:** This action only reads data, does not modify database
- **Export Only:** Purely for data export, no database side effects
- **Data Transmission:** Only transmits data to external systems
- **Logging:** May write to system logs but not to business data tables

### External System Integration
- **HTTP Requests:** Sends data to external systems via HTTP
- **JSON Transmission:** Transmits JSON data to specified endpoints
- **API Integration:** Integrates with external APIs and webhooks
- **Real-Time Sync:** Enables real-time data synchronization

## Business Use Cases

### 1. Real-Time Data Synchronization
- **Customer Data Sync:** Synchronize customer data with CRM systems
- **Inventory Updates:** Send inventory changes to e-commerce platforms
- **Order Notifications:** Notify external systems of order status changes
- **Financial Data Export:** Export financial data to accounting systems

### 2. API Integration and Webhooks
- **Webhook Notifications:** Send entity changes to webhook endpoints
- **Third-Party API Integration:** Integrate with third-party service APIs
- **Microservice Communication:** Communicate with microservice architectures
- **Event-Driven Architecture:** Trigger events in external systems

### 3. Data Export and Reporting
- **Business Intelligence:** Export data to BI and analytics platforms
- **Data Warehousing:** Send data to data warehouse systems
- **External Reporting:** Feed data to external reporting systems
- **Compliance Reporting:** Export data for regulatory compliance

### 4. System Integration and Migration
- **Legacy System Integration:** Integrate with legacy systems via JSON APIs
- **Data Migration:** Export data for system migration projects
- **Multi-System Coordination:** Coordinate data between multiple systems
- **Backup and Archive:** Export data for backup and archival purposes

## JSON Export Format

### Standard JSON Structure
- **Entity Fields:** Entity fields are exported as JSON key-value pairs
- **Field Names:** Uses internal field names unless renamed
- **Data Types:** Maintains appropriate JSON data types (string, number, boolean)
- **Nested Objects:** Supports nested objects for entity references

### Field Renaming and Transformation
- **Name Mapping:** Internal field names mapped to external names
- **Structure Preservation:** Maintains data relationships in JSON
- **Type Conversion:** Automatic type conversion for JSON compatibility
- **Collection Handling:** Proper handling of collection data in JSON arrays

### HTTP Transmission Details
- **Content-Type:** Automatically sets "application/json" content type
- **Request Headers:** Includes "Accept: application/json" header
- **GET Method:** JSON data sent as "entity" query parameter
- **POST Method:** JSON data sent in request body

## Important Warnings

### ⚠️ Security and Data Protection
- **Sensitive Data:** Review exported fields to prevent sensitive data exposure
- **URL Security:** Ensure URLs are secure and use HTTPS for sensitive data
- **Field Filtering:** Use field filtering to limit data exposure
- **Authentication:** Consider authentication requirements for external endpoints

### ⚠️ Network and Connectivity
- **Network Dependencies:** Requires network connectivity to external systems
- **Endpoint Availability:** External endpoints must be available and operational
- **Timeout Handling:** HTTP requests may timeout, plan for error handling
- **Firewall Configuration:** Ensure firewall rules allow outbound HTTP connections

### ⚠️ Performance and Resource Impact
- **HTTP Overhead:** HTTP requests add overhead to entity operations
- **Large Data Export:** Large entities may create large JSON payloads
- **Network Latency:** Network latency may impact entity processing time
- **External System Performance:** External system performance affects processing

### ⚠️ Data Consistency and Reliability
- **Eventual Consistency:** External systems may have eventual consistency
- **Failure Handling:** Plan for handling HTTP request failures
- **Retry Logic:** Consider implementing retry logic for failed exports
- **Data Validation:** Validate data before export to prevent errors

## Best Practices

### Security and Data Management
- **Field Selection:** Only export necessary fields to minimize data exposure
- **Secure URLs:** Use HTTPS URLs for all sensitive data transmission
- **Data Validation:** Validate data before export to ensure quality
- **Access Control:** Implement proper access controls for export operations

### Performance and Reliability
- **Test Mode First:** Always test with log-only mode before production use
- **Field Filtering:** Use field filtering to reduce JSON payload size
- **Error Monitoring:** Monitor HTTP request success and failure rates
- **Timeout Configuration:** Configure appropriate timeouts for HTTP requests

### Integration and Development
- **URL Templates:** Use Tempo templates for dynamic URL generation
- **Field Mapping:** Plan field mapping strategy for external system compatibility
- **Documentation:** Document field mappings and external system requirements
- **Version Management:** Manage API versions and field mapping changes

### Monitoring and Troubleshooting
- **Request Logging:** Enable logging for troubleshooting integration issues
- **Error Analysis:** Monitor and analyze HTTP request errors
- **Performance Monitoring:** Monitor export performance and latency
- **External System Monitoring:** Monitor external system availability and response

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EAJsonRecordExporter`


</div>

