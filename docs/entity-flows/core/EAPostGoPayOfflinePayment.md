---
title: EAPostGoPayOfflinePayment
module: core
---


<div class='entity-flows'>

# EAPostGoPayOfflinePayment

**This document was generated using Claude.ai**

## Overview

This entity flow processes offline payments for GoPay digital wallet transactions. It handles receipt vouchers that were paid through GoPay but processed offline, either posting the payment directly or crediting the customer's GoPay balance for recurring invoicing scenarios. This action bridges offline payment processing with the GoPay digital payment ecosystem.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for GoPay payment processing
- **Target:** Receipt Voucher entities linked to GoPay-enabled invoices
- **Purpose:** Process offline GoPay payments and integrate with GoPay payment system
- **Timing:** Runs after offline payment collection to update GoPay system records

## How It Works

### 1. Entity Validation and Type Checking
- **Receipt Voucher Validation:** Verifies the entity is a valid receipt voucher
- **Invoice Relationship Check:** Validates the receipt voucher is linked to an invoice
- **GoPay Support Verification:** Confirms the linked invoice supports GoPay payments
- **Entity Type Validation:** Ensures proper entity type relationships

### 2. Configuration Retrieval and Validation
- **GoPay Configuration Lookup:** Retrieves GoPay configuration using provided config code
- **Configuration Validation:** Validates that the configuration exists and is accessible
- **Settings Analysis:** Analyzes configuration settings for payment processing mode
- **Integration Setup:** Sets up integration parameters based on configuration

### 3. Payment Processing Mode Determination
- **Recurring Invoice Check:** Determines if recurring invoicing is enabled in configuration
- **Processing Mode Selection:** Selects appropriate processing mode based on configuration
- **Payment Method Routing:** Routes to either balance credit or direct payment processing
- **Configuration-Based Logic:** Applies logic based on GoPay configuration settings

### 4. Payment Processing Execution
- **Balance Credit Processing:** For recurring invoicing, credits customer's GoPay balance
- **Direct Payment Processing:** For standard invoicing, posts payment directly to GoPay
- **Transaction Integration:** Integrates with GoPay system APIs for payment processing
- **Result Management:** Manages and returns processing results

## Key Features

### GoPay Digital Wallet Integration
- **Offline Payment Support:** Supports offline payment processing for GoPay transactions
- **Digital Wallet Integration:** Integrates with GoPay digital wallet ecosystem
- **Payment Gateway Bridge:** Bridges offline payments with digital payment systems
- **Transaction Synchronization:** Synchronizes offline payments with GoPay records

### Flexible Payment Processing
- **Dual Processing Modes:** Supports both direct payment and balance credit processing
- **Recurring Invoice Support:** Special handling for recurring invoicing scenarios
- **Configuration-Driven Logic:** Uses configuration to determine processing approach
- **Adaptive Processing:** Adapts processing based on invoice and configuration type

### Comprehensive Validation
- **Entity Type Validation:** Thorough validation of entity types and relationships
- **Configuration Validation:** Validates GoPay configuration exists and is properly set up
- **Invoice Compatibility:** Ensures invoice supports GoPay payment processing
- **Parameter Validation:** Built-in parameter validation with detailed error messages

## Parameters

### Parameter 1: GoPay Config Code (Required)
- **Type:** Business Code or Entity ID
- **Purpose:** Reference to GoPayConfiguration entity containing payment settings
- **Format:** Business code or numeric ID of GoPayConfiguration entity
- **Examples:** `GOPAY_MAIN`, `GOPAY_RECURRING`, `GOPAY_PROD`, `123`

**Configuration Examples:**
```
# Main GoPay configuration
GOPAY_MAIN

# Recurring invoicing configuration
GOPAY_RECURRING

# Production environment configuration
GOPAY_PROD

# Test environment configuration
GOPAY_TEST

# Specific merchant configuration
GOPAY_MERCHANT_001
```

**Configuration Requirements:**
- Must be a valid GoPayConfiguration entity
- Must contain proper GoPay API credentials and settings
- Must specify whether recurring invoicing is enabled
- Must be properly configured for the target environment

## Database Tables Affected

### Receipt Voucher Processing
- **Payment Status Updates:** Updates receipt voucher payment status and processing information
- **GoPay Integration Data:** Updates GoPay-specific fields and transaction references
- **Payment Confirmation:** Records payment confirmation and processing details
- **Transaction Linking:** Links receipt voucher to GoPay transaction records

### Invoice Updates
- **Payment Application:** Applies payment to the linked invoice
- **GoPay Status Updates:** Updates GoPay payment status on the invoice
- **Balance Updates:** Updates invoice balance and payment status
- **Payment History:** Maintains payment history and transaction records

### GoPay Balance Management
- **Balance Credit Processing:** For recurring invoicing, credits customer's GoPay balance
- **Account Updates:** Updates customer GoPay account information
- **Credit Transaction Records:** Creates credit transaction records
- **Balance History:** Maintains balance history and transaction audit trail

### External GoPay System Integration
- **Payment Posting:** Posts payment information to external GoPay systems
- **Transaction Synchronization:** Synchronizes transaction data with GoPay APIs
- **Status Updates:** Updates payment status in external GoPay systems
- **Integration Logging:** Logs integration activities for audit and troubleshooting

## Business Use Cases

### 1. Offline Payment Processing
- **Cash Payment Integration:** Process cash payments for GoPay-initiated transactions
- **Bank Transfer Processing:** Handle bank transfers for GoPay transactions
- **Manual Payment Entry:** Process manually entered payments for GoPay invoices
- **Payment Reconciliation:** Reconcile offline payments with GoPay system records

### 2. Digital Wallet Management
- **Balance Credit Operations:** Credit customer GoPay balances for future use
- **Wallet Top-Up Processing:** Process wallet top-up transactions
- **Prepaid Account Management:** Manage prepaid GoPay account balances
- **Credit Allocation:** Allocate credits to customer accounts for recurring payments

### 3. Recurring Payment Support
- **Subscription Payment Processing:** Process payments for subscription-based services
- **Recurring Invoice Management:** Handle recurring invoice payment processing
- **Automatic Payment Setup:** Set up automatic payment processing for recurring services
- **Credit-Based Billing:** Implement credit-based billing for recurring customers

### 4. Payment Gateway Integration
- **Multi-Channel Payment Support:** Support payments across multiple channels
- **Payment Method Bridging:** Bridge different payment methods with GoPay system
- **Transaction Unification:** Unify offline and online payment processing
- **Payment System Integration:** Integrate with broader payment processing systems

## GoPay Integration Process

### Direct Payment Processing
1. **Payment Validation:** Validates receipt voucher and linked invoice
2. **GoPay API Integration:** Connects to GoPay payment APIs
3. **Payment Posting:** Posts payment information to GoPay system
4. **Transaction Confirmation:** Receives and processes payment confirmation
5. **Status Updates:** Updates local and remote payment status

### Balance Credit Processing
1. **Account Identification:** Identifies customer GoPay account
2. **Credit Calculation:** Calculates credit amount based on payment
3. **Balance Update:** Updates customer's GoPay balance
4. **Credit Transaction:** Creates credit transaction record
5. **Account Synchronization:** Synchronizes account data with GoPay system

### Configuration-Based Routing
- **Recurring Flag Check:** Checks useRecurringInvoicing flag in configuration
- **Processing Mode Selection:** Selects appropriate processing mode
- **API Endpoint Routing:** Routes to appropriate GoPay API endpoints
- **Parameter Customization:** Customizes parameters based on configuration

## Important Warnings

### ⚠️ Entity Type and Relationship Requirements
- **Receipt Voucher Requirement:** Only works with Receipt Voucher entities
- **Invoice Linkage Required:** Receipt voucher must be linked to a valid invoice
- **GoPay Support Required:** Linked invoice must support GoPay payments (implement IGoPayInvoice)
- **Entity Relationship Integrity:** Proper entity relationships must be maintained

### ⚠️ Configuration Dependencies
- **Valid Configuration Required:** GoPay configuration must exist and be properly configured
- **API Credentials:** GoPay configuration must contain valid API credentials
- **Environment Configuration:** Configuration must match the target environment (test/production)
- **Permission Settings:** Configuration must have proper permission settings

### ⚠️ Payment Processing Considerations
- **Payment Duplication:** Risk of duplicate payment processing if run multiple times
- **Transaction Timing:** Consider timing of offline payment vs. GoPay system processing
- **Balance Consistency:** Ensure balance consistency between local and GoPay systems
- **Error Recovery:** Plan for error recovery in case of GoPay system failures

### ⚠️ Integration and External Dependencies
- **GoPay System Availability:** Requires GoPay system to be available and operational
- **Network Connectivity:** Requires stable network connection for API communication
- **API Rate Limits:** Subject to GoPay API rate limits and quotas
- **System Synchronization:** Requires proper synchronization between systems

## Best Practices

### Configuration Management
- **Environment Separation:** Use separate configurations for test and production environments
- **Configuration Testing:** Thoroughly test GoPay configurations before production use
- **Credential Security:** Securely manage GoPay API credentials and access tokens
- **Regular Updates:** Keep GoPay configurations up to date with system changes

### Payment Processing
- **Idempotency Control:** Implement controls to prevent duplicate payment processing
- **Transaction Logging:** Log all payment processing activities for audit and troubleshooting
- **Error Handling:** Implement comprehensive error handling for GoPay integration failures
- **Status Monitoring:** Monitor payment processing status and GoPay system health

### Data Management and Validation
- **Data Validation:** Validate all payment data before processing
- **Relationship Verification:** Verify entity relationships before payment processing
- **Amount Validation:** Validate payment amounts and currency information
- **Customer Verification:** Verify customer information and account status

### Integration and Monitoring
- **API Monitoring:** Monitor GoPay API performance and availability
- **Transaction Reconciliation:** Regularly reconcile transactions with GoPay system
- **Balance Verification:** Verify customer balance consistency between systems
- **Performance Monitoring:** Monitor payment processing performance and timing

### Security and Compliance
- **Secure Communication:** Use secure communication channels for GoPay integration
- **Access Control:** Implement proper access controls for payment processing
- **Audit Procedures:** Establish audit procedures for payment processing activities
- **Compliance Monitoring:** Monitor compliance with payment processing regulations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPostGoPayOfflinePayment`


</div>

