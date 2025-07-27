---
title: EAGenerateMyFatoorahPaymentURLs
module: core
---


<div class='entity-flows'>

# EAGenerateMyFatoorahPaymentURLs

**This document was generated using Claude.ai**

## Overview

This entity flow generates MyFatoorah payment URLs for documents that support online payment processing. It creates payment links through MyFatoorah's payment gateway, enabling customers to pay invoices and bills online using various payment methods popular in the Middle East region.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for MyFatoorah payment URL generation
- **Target:** Documents that implement ISupportOnlinePaymentDoc interface (invoices, orders, bills)
- **Purpose:** Generate MyFatoorah payment URLs for online payment processing
- **Timing:** Used when documents need to be made available for online payment through MyFatoorah

## How It Works

### 1. Entity Compatibility Validation
- **Interface Check:** Verifies that the entity implements ISupportOnlinePaymentDoc interface
- **Payment Support:** Ensures the document supports online payment functionality
- **Entity Type Validation:** Confirms entity is a valid payment document type
- **Error Prevention:** Prevents execution on incompatible entity types

### 2. Payment Configuration Validation
- **Config Lookup:** Retrieves online payment configuration using the provided config code
- **Config Existence:** Validates that the payment configuration exists
- **Type Validation:** Confirms the configuration is specifically for MyFatoorah
- **Gateway Setup:** Loads MyFatoorah payment gateway configuration settings

### 3. Customer Information Collection
- **Customer Data Extraction:** Extracts customer information from specified entity fields
- **Required Fields:** Processes customer name (required) and optional contact details
- **Contact Information:** Collects mobile number, email, and country code if provided
- **Customer Reference:** Extracts customer reference information for tracking

### 4. Payment URL Generation and Assignment
- **Invoice Creation:** Creates payment invoice through MyFatoorah API
- **URL Generation:** Generates payment URL from MyFatoorah response
- **Field Assignment:** Assigns generated URL to specified entity field
- **State Management:** Handles both draft and committed entity states

## Key Features

### MyFatoorah Payment Integration
- **Middle East Gateway:** Integrates with popular Middle East payment gateway
- **Multiple Payment Methods:** Supports credit cards, bank transfers, and digital wallets
- **Regional Payment Options:** Supports payment methods popular in GCC countries
- **Multi-Currency Support:** Handles multiple currencies for international payments

### Customer Information Integration
- **Customer Data Mapping:** Maps customer information from entity fields
- **Contact Details:** Includes customer mobile and email for payment notifications
- **Customer Reference:** Links payments to customer records for tracking
- **Flexible Field Mapping:** Allows mapping from various customer-related fields

### State-Aware Processing
- **Draft Entity Handling:** Directly updates fields for draft entities
- **Committed Entity Handling:** Uses force-stable updates for committed entities
- **Version Management:** Manages entity version changes appropriately
- **Safe Updates:** Ensures safe field updates regardless of entity state

## Parameters

### Parameter 1: Payment Config Code (Required)
- **Type:** Text
- **Purpose:** Code of the MyFatoorah payment configuration to use
- **Format:** Business code of OnlinePaymentConfig entity
- **Examples:** `MYFATOORAH_PROD`, `MYFATOORAH_TEST`, `MF_CONFIG_01`

**Configuration Examples:**
- Production MyFatoorah configuration for live payments
- Test configuration for development and testing
- Merchant-specific MyFatoorah configurations
- Region-specific payment settings

### Parameter 2: Copy URL To Field (Required)
- **Type:** Text Field Name
- **Purpose:** Field name where the payment URL will be stored
- **Format:** Field name on the entity (typically a text field)
- **Examples:** `paymentURL`, `myFatoorahURL`, `onlinePaymentLink`

### Parameter 3: Customer Name Field (Required)
- **Type:** Field Reference
- **Purpose:** Field containing customer name for payment processing
- **Format:** Field reference (e.g., customer.name1, customerName)
- **Examples:** `customer.name1`, `customer.fullName`, `billToName`

### Parameter 4: Mobile Country Code Field (Optional)
- **Type:** Field Reference
- **Purpose:** Field containing mobile country code (e.g., '+966')
- **Format:** Field reference to country code field
- **Examples:** `customer.countryCode`, `mobileCountryCode`, `phonePrefix`

### Parameter 5: Mobile Number Field (Optional)
- **Type:** Field Reference
- **Purpose:** Field containing customer mobile number
- **Format:** Field reference to mobile number field
- **Examples:** `customer.mobile`, `customer.phone`, `contactMobile`

### Parameter 6: Customer Email Field (Optional)
- **Type:** Field Reference
- **Purpose:** Field containing customer email address
- **Format:** Field reference to email field
- **Examples:** `customer.email`, `customer.emailAddress`, `contactEmail`

### Parameter 7: Customer Reference Field (Optional)
- **Type:** Field Reference
- **Purpose:** Field containing customer reference or code
- **Format:** Field reference to customer identifier field
- **Examples:** `customer.code`, `customer.customerNumber`, `customerRef`

## Database Tables Affected

### Entity Fields Update
- **Payment URL Field:** Updates specified field with generated MyFatoorah payment URL
- **URL Storage:** Stores payment URL on the entity for customer access
- **Field Assignment:** Assigns URL to configured entity field
- **Data Persistence:** Persists URL data with the entity

### Online Payment Configuration
- **Config Access:** Reads from OnlinePaymentConfig table
- **MyFatoorah Settings:** Accesses MyFatoorah-specific configuration settings
- **Merchant Data:** Retrieves merchant account information
- **API Configuration:** Loads API credentials and endpoint configurations

### Customer Data Access
- **Customer Information:** Reads customer data from related entity fields
- **Contact Details:** Accesses customer contact information
- **Reference Data:** Retrieves customer reference and identification data
- **Relationship Navigation:** Navigates entity relationships to access customer data

### Payment Tracking
- **Payment Records:** Creates payment tracking entries through MyFatoorah API
- **Invoice Creation:** Creates invoice records in MyFatoorah system
- **Transaction Tracking:** Tracks payment transactions for monitoring
- **Audit Trail:** Maintains audit trail for payment URL generation

## Business Use Cases

### 1. Regional E-Commerce
- **GCC Market Integration:** Support for GCC and Middle East payment preferences
- **Local Payment Methods:** Integration with locally popular payment methods
- **Multi-Currency Billing:** Support for regional currencies and exchange rates
- **Cultural Payment Preferences:** Accommodate regional payment behaviors

### 2. Customer Payment Convenience
- **Mobile Payment Support:** Support for mobile-first payment experiences
- **Digital Wallet Integration:** Integration with popular digital wallets
- **Bank Transfer Options:** Support for direct bank transfer payments
- **Multi-Language Support:** Support for Arabic and English payment interfaces

### 3. Business Process Integration
- **Invoice Payment Automation:** Automate invoice payment link generation
- **Customer Communication:** Include payment links in customer communications
- **Payment Tracking:** Track online payments and reconciliation
- **Revenue Collection:** Streamline revenue collection processes

### 4. Financial Management
- **Accounts Receivable:** Integrate with accounts receivable processes
- **Payment Reconciliation:** Facilitate payment reconciliation processes
- **Financial Reporting:** Support financial reporting and analytics
- **Cash Flow Management:** Improve cash flow through faster payment collection

## MyFatoorah Gateway Features

### Payment Methods Support
- **Credit/Debit Cards:** Visa, MasterCard, and regional card networks
- **Digital Wallets:** Apple Pay, Google Pay, and regional wallets
- **Bank Transfers:** Direct bank transfer options
- **Buy Now Pay Later:** Installment and deferred payment options

### Regional Capabilities
- **Multi-Currency:** Support for USD, SAR, KWD, AED, and other regional currencies
- **Local Payment Networks:** Integration with regional payment networks
- **Compliance:** Compliance with regional financial regulations
- **Language Support:** Arabic and English language support

### Security and Compliance
- **PCI DSS Compliance:** Secure payment processing standards
- **Data Protection:** Strong data protection and privacy measures
- **Fraud Prevention:** Advanced fraud detection and prevention
- **Secure APIs:** Secure API integration with authentication

## Important Warnings

### ⚠️ Entity Compatibility Requirements
- **Interface Implementation:** Entity must implement ISupportOnlinePaymentDoc interface
- **Payment Document:** Entity must be a valid payment document type
- **Field Requirements:** Entity must have required fields for customer data and URL storage
- **Data Structure:** Entity must have proper payment and customer data structure

### ⚠️ MyFatoorah Configuration Dependencies
- **Valid Configuration:** MyFatoorah payment configuration must exist and be properly configured
- **Configuration Type:** Configuration must be specifically set for MyFatoorah type
- **API Credentials:** Valid MyFatoorah API credentials required
- **Gateway Connectivity:** MyFatoorah API must be accessible and operational

### ⚠️ Customer Data Requirements
- **Customer Name Required:** Customer name field is mandatory for payment processing
- **Field Mapping:** Customer data fields must be properly mapped and accessible
- **Data Quality:** Customer data must be complete and accurate for payment processing
- **Contact Information:** Valid contact information improves payment success rates

### ⚠️ Field and Data Management
- **Field Existence:** Target field for URL storage must exist on entity
- **Field Type:** Target field must be compatible with URL text data
- **Data Length:** Field must accommodate full payment URL length
- **Entity State:** Consider entity state (draft vs committed) for field updates

## Best Practices

### Payment Configuration Management
- **Environment Separation:** Use separate configurations for test and production
- **Configuration Testing:** Thoroughly test MyFatoorah configurations before deployment
- **API Security:** Securely manage MyFatoorah API credentials
- **Regular Updates:** Keep payment gateway configurations up to date

### Customer Data Management
- **Data Validation:** Validate customer data before payment URL generation
- **Complete Information:** Ensure complete customer information for better payment experience
- **Contact Details:** Include mobile and email for payment notifications
- **Data Privacy:** Handle customer data according to privacy regulations

### Integration and Testing
- **API Testing:** Test MyFatoorah API integration thoroughly
- **Payment Flow Testing:** Test complete payment flows end-to-end
- **Error Handling:** Implement robust error handling for API failures
- **User Experience Testing:** Test payment experience from customer perspective

### Security and Compliance
- **Data Protection:** Protect payment URLs and customer data appropriately
- **Access Controls:** Implement proper access controls for payment functions
- **Audit Procedures:** Establish audit procedures for payment activities
- **Regulatory Compliance:** Ensure compliance with regional payment regulations

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateMyFatoorahPaymentURLs`


</div>