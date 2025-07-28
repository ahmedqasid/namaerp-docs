---
title: EASendReturnedInvoiceToDatanuum
module: supplychain
---


<div class='entity-flows'>

# EASendReturnedInvoiceToDatanuum

**This document was generated using Claude.ai**

## Overview

Synchronizes sales return/credit memo information with the Datanuum external service for reward points and loyalty program integration. Builds a comprehensive JSON payload containing return transaction details (original invoice reference, returned items, refund payments) and sends it to Datanuum's API to process loyalty point reversals and customer return history.

## When This Action Runs

Manual execution when sales return transactions need to be synchronized with the Datanuum loyalty system, typically after return document completion or when processing loyalty point reversals for returned items.

## How It Works

1. **Validates return document** - Ensures the document is actually a return (ifOut = false)
2. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
3. **Extracts POS register** - Gets POS register code from the sales document
4. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
5. **Builds return invoice payload** - Creates detailed JSON request body with:
   - Customer account information (phone number)
   - Original invoice reference (code and creation date)
   - Return document details (code and return time)
   - Returned item details (SKU, name, quantity, unit price, line amounts)
   - Refund payment details (methods and amounts)
6. **Formats numeric values** - Strips trailing zeros from all monetary and quantity fields
7. **Sends to Datanuum** - Transmits complete return transaction data to Datanuum API
8. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Sales Return Document Data** - Reads complete return transaction information (read-only)
- **Original Invoice Data** - Reads referenced original invoice details (read-only)
- **Customer Data** - Reads customer account details (read-only)
- **Payment Lines** - Reads refund payment method and amount details (read-only)
- **External Datanuum System** - Creates return transaction records and processes loyalty point reversals

## Important Warnings

### ⚠️ Return Document Validation
- **Only processes return documents (ifOut = false)**
- Outbound sales documents are rejected with error message
- Document type validation happens before any processing
- Ensure document is properly configured as a return transaction

### ⚠️ External API Dependency
- Requires active internet connection to Datanuum services
- API calls may fail due to network issues or service downtime
- Timeout and connectivity errors are possible
- Consider retry mechanisms for critical return synchronization

### ⚠️ Required Configuration Setup
- RewardPointsConfig must exist and be properly configured
- Configuration must contain valid Datanuum API credentials and endpoints
- Invalid configuration causes immediate processing failure
- Test configuration thoroughly before production use

### ⚠️ Original Invoice Reference Requirements
- Requires valid reference to the original returned invoice
- Original invoice code and creation date are transmitted to Datanuum
- Missing original invoice reference may cause API validation errors
- Ensure proper document relationships are established

### ⚠️ Customer Information Processing
- Customer phone number is required for account identification
- Missing customer contact information may cause processing failures
- Customer must exist in both ERP and Datanuum systems
- Ensure customer data synchronization before processing returns

### ⚠️ Return Item Detail Processing
- All returned sales lines are included in the transaction payload
- Item quantities, prices, and line amounts are transmitted
- Tax calculations are currently set to zero for return items
- Large returns with many items may impact API performance

### ⚠️ Payment Processing for Returns
- Handles refund payments through multiple methods
- Payment classification affects loyalty point reversal calculations
- Voucher and coupon refunds are tracked with redemption flags
- Numeric formatting strips trailing zeros for API compatibility

### ⚠️ Loyalty Point Reversal Logic
- Return processing may reverse previously earned loyalty points
- Point reversal calculations depend on original transaction data
- Complex loyalty rules may affect return processing
- Consider timing of returns relative to point expiration policies

### ⚠️ Data Format and Precision
- All monetary values are formatted with trailing zeros stripped
- Quantity values are converted to plain string format
- Numeric precision must match Datanuum API expectations
- Review formatting requirements for API compatibility

### ⚠️ Transaction Timing Considerations
- Uses original invoice creation date and return document creation date
- Timing information affects loyalty program rules and point calculations
- Late return synchronization may impact time-sensitive loyalty policies
- Consider grace periods for return processing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendReturnedInvoiceToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Document Type:** Sales Return Documents Only

**Related Actions:**
- [EASendInvoiceToDatanuum](EASendInvoiceToDatanuum.md) - Original invoice synchronization
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- Other Datanuum integration entity flows


</div>

