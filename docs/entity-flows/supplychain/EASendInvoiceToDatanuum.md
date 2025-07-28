---
title: EASendInvoiceToDatanuum
module: supplychain
---


<div class='entity-flows'>

# EASendInvoiceToDatanuum

**This document was generated using Claude.ai**

## Overview

Synchronizes sales invoice/receipt information with the Datanuum external service for reward points and loyalty program integration. Builds a comprehensive JSON payload containing transaction details (customer, items, payments, discounts) and sends it to Datanuum's API to process loyalty points, rewards, and customer purchase history.

## When This Action Runs

Manual execution when sales transactions need to be synchronized with the Datanuum loyalty system, typically after invoice completion, POS sales finalization, or when processing loyalty points for completed transactions.

## How It Works

1. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
2. **Extracts POS register** - Gets POS register code from the sales document
3. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
4. **Builds comprehensive invoice payload** - Creates detailed JSON request body with:
   - Customer account information (phone, email, name)
   - Receipt details (code, open/close times)
   - Transaction totals (billed, paid, redeemed amounts)
   - Discount information (header and line discounts)
   - Item details (SKU, name, quantity, unit price, discounts)
   - Payment details (methods, amounts, loyalty redemptions)
   - Custom fields (document category)
5. **Processes payment types** - Handles different payment methods:
   - Regular payment methods (cash, card)
   - Loyalty point redemptions
   - Voucher redemptions with reference tracking
6. **Calculates redeemed values** - Sums loyalty point and voucher redemptions
7. **Sends to Datanuum** - Transmits complete transaction data to Datanuum API
8. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Sales Document Data** - Reads complete transaction information (read-only)
- **Customer Data** - Reads customer account details (read-only)
- **Payment Lines** - Reads payment method and amount details (read-only)
- **Item Details** - Reads product information and pricing (read-only)
- **External Datanuum System** - Creates transaction records and processes loyalty points

## Important Warnings

### ⚠️ External API Dependency
- Requires active internet connection to Datanuum services
- API calls may fail due to network issues or service downtime
- Timeout and connectivity errors are possible
- Consider retry mechanisms for critical transaction synchronization

### ⚠️ Required Configuration Setup
- RewardPointsConfig must exist and be properly configured
- Configuration must contain valid Datanuum API credentials and endpoints
- Invalid configuration causes immediate processing failure
- Test configuration thoroughly before production use

### ⚠️ Complete Transaction Data Requirements
- Requires SalesDocument with complete transaction information
- Customer information should be populated for proper loyalty processing
- Missing critical data may cause API validation errors
- Incomplete transactions may result in incorrect loyalty calculations

### ⚠️ POS Register Integration
- POS register code is automatically extracted from sales document
- POS integration affects transaction attribution and tracking
- Invalid or missing POS register data may impact reporting
- Ensure proper POS register configuration in sales documents

### ⚠️ Payment Processing Complexity
- Handles multiple payment types: cash, card, loyalty points, vouchers
- Payment classification affects loyalty point calculations
- Loyalty redemptions are tracked separately from regular payments
- Voucher payments include reference tracking for audit purposes

### ⚠️ Loyalty Point Calculation Logic
- Redeemed value calculation excludes loyalty vouchers but includes loyalty points
- Different voucher types (loyalty points vs. loyalty vouchers) are handled differently
- Header discount coupons are included in redeemed value calculations
- Complex redemption logic may require careful testing

### ⚠️ Item Detail Processing
- All sales lines are included in the transaction payload
- Item quantities, prices, and discounts are transmitted
- Unit of measure information is included for accuracy
- Large invoices with many items may impact API performance

### ⚠️ Customer Data Privacy
- Transmits customer personally identifiable information (PII)
- Includes customer contact details and purchase history
- Ensure compliance with data protection regulations
- Customer consent may be required for loyalty program participation

### ⚠️ Transaction Timing and Synchronization
- Uses document creation date as open time and current time as close time
- Timing information affects loyalty program rules and eligibility
- Late synchronization may impact time-sensitive promotions
- Consider real-time vs. batch synchronization requirements

### ⚠️ Discount and Pricing Accuracy
- Separates header discounts from line item discounts
- Tax calculations are currently set to zero (may need customization)
- Discount amounts must be accurate for proper loyalty calculations
- Review discount logic for compliance with loyalty program rules

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendInvoiceToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- [EASendInvItemToDatanuum](EASendInvItemToDatanuum.md) - Item synchronization
- Other Datanuum integration entity flows


</div>

