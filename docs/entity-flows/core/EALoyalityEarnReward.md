---
title: EALoyalityEarnReward
module: core
---


<div class='entity-flows'>

# EALoyalityEarnReward

**This document was generated using Claude.ai**

## Overview

This entity flow processes customer loyalty reward points earning for invoice transactions. It calculates and awards loyalty points to customers based on purchase amounts, handles point adjustments for returns, and integrates with external reward point systems like STC loyalty programs. The action manages the complete lifecycle of earning, updating, and refunding loyalty points.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for loyalty point processing
- **Target:** Invoice entities that support loyalty point earning (sales invoices, service invoices)
- **Purpose:** Award loyalty points to customers based on purchase transactions
- **Timing:** Typically runs after invoice completion or approval to process reward points

## How It Works

### 1. Invoice and Configuration Validation
- **Invoice Type Check:** Verifies the entity is an invoice that supports loyalty rewards
- **Configuration Lookup:** Retrieves reward points configuration using the provided config code
- **Earning Policy Validation:** Confirms the configuration supports earning reward points
- **Replication Site Check:** Handles multi-site scenarios (only processes at head office)

### 2. Customer and Points Owner Identification
- **Points Owner Resolution:** Identifies the customer or entity that will receive loyalty points
- **Contact Information Verification:** Ensures the points owner has required contact information (mobile number)
- **Existing Points History:** Retrieves existing reward point entries for the customer and invoice
- **Phone Number Validation:** Validates mobile number requirements for external reward systems

### 3. Reward Points Calculation
- **Amount Calculation:** Calculates reward-eligible amount based on invoice totals
- **Discount Adjustments:** Subtracts discount coupon values from reward calculation
- **Line Item Processing:** Processes individual invoice lines for detailed reward calculations
- **Net Value Determination:** Determines final amount eligible for reward points

### 4. Points Earning and Adjustment Processing
- **New Points Earning:** Processes new loyalty point awards for first-time earnings
- **Points Updates:** Handles updates to existing reward entries when invoices are modified
- **Return Document Processing:** Manages point deductions when processing return documents
- **External System Integration:** Communicates with external loyalty systems (STC, etc.)

## Key Features

### Comprehensive Loyalty Management
- **Multi-Configuration Support:** Supports multiple reward point configurations
- **Flexible Point Calculation:** Configurable point calculation based on various invoice amounts
- **Return Handling:** Automatic point deduction for returned items
- **Update Management:** Handles updates to existing reward entries

### External System Integration
- **STC Loyalty Integration:** Native integration with STC (Saudi Telecom) loyalty systems
- **API Communication:** Real-time communication with external reward point APIs
- **Transaction Tracking:** Complete tracking of external system transactions
- **Error Handling:** Robust error handling for external system failures

### Business Rule Enforcement
- **Earning Policy Compliance:** Enforces reward configuration earning policies
- **Point Owner Validation:** Validates point ownership and customer eligibility
- **Amount Thresholds:** Supports minimum amount thresholds for earning points
- **Time-Based Restrictions:** Manages time-based restrictions for point updates

## Parameters

### Parameter 1: Reward Points Config (Required)
- **Type:** Business Code
- **Purpose:** Code of the RewardPointsConfig entity that defines earning rules
- **Format:** Business code of RewardPointsConfig entity
- **Examples:** `STANDARD_LOYALTY`, `VIP_REWARDS`, `STC_LOYALTY_CONFIG`

**Configuration Requirements:**
- Must be a valid RewardPointsConfig entity
- Must have earning policy enabled (earnableConfig = true)
- Must define point calculation rules and external system settings
- Must specify points owner field mapping

**Configuration Examples:**
```
# Standard customer loyalty program
STANDARD_LOYALTY

# VIP customer reward program with higher point rates
VIP_REWARDS

# STC integration for telecom customers
STC_LOYALTY_CONFIG

# Retail store loyalty program
RETAIL_REWARDS
```

## Database Tables Affected

### STCLoyaltyPointsRewardEntry
- **Reward Entry Creation:** Creates new reward point entries for earned points
- **Entry Updates:** Updates existing entries when invoices are modified
- **Reduction Tracking:** Tracks point reductions for returns and adjustments
- **Transaction History:** Maintains complete transaction history for auditing

### RewardPointsConfig
- **Configuration Access:** Reads reward point configuration settings
- **Earning Rules:** Accesses earning calculation rules and thresholds
- **External System Settings:** Reads integration settings for external systems
- **Point Owner Mapping:** Accesses field mapping for identifying point owners

### Invoice and Related Tables
- **Invoice Data Access:** Reads invoice totals, line items, and payment information
- **Customer Information:** Accesses customer contact information for point assignment
- **Return Document Processing:** Handles return document relationships for point adjustments
- **Payment Line Analysis:** Analyzes payment lines for discount coupon deductions

### External System Integration
- **API Transaction Records:** May create records for external system communications
- **Transaction Logging:** Logs external system transactions for auditing
- **Error Tracking:** Tracks external system integration errors
- **Response Management:** Manages responses from external loyalty systems

## Business Use Cases

### 1. Retail Customer Loyalty Programs
- **Purchase Rewards:** Award points for retail purchases based on spending amounts
- **Tier-Based Rewards:** Different point rates for different customer tiers
- **Promotional Campaigns:** Special point multipliers for promotional periods
- **Cross-Store Integration:** Unified loyalty across multiple store locations

### 2. Service Industry Rewards
- **Service Purchase Points:** Award points for service purchases and subscriptions
- **Professional Services:** Loyalty programs for professional service clients
- **Recurring Service Rewards:** Points for recurring service billings
- **Premium Service Benefits:** Enhanced point earning for premium services

### 3. Telecom and Utility Loyalty
- **STC Integration:** Direct integration with STC loyalty programs
- **Bill Payment Rewards:** Points for utility and telecom bill payments
- **Service Upgrade Incentives:** Additional points for service upgrades
- **Long-Term Customer Rewards:** Bonus points for long-term customers

### 4. Return and Adjustment Management
- **Return Processing:** Automatic point deduction for returned items
- **Invoice Adjustments:** Point recalculation for invoice modifications
- **Partial Returns:** Proportional point adjustments for partial returns
- **Exchange Transactions:** Point management for product exchanges

## Loyalty Points Calculation

### Basic Earning Calculation
- **Net Invoice Amount:** Base calculation on net invoice amount after discounts
- **Configuration Multipliers:** Apply configuration-defined point multipliers
- **Line Item Analysis:** Calculate points per line item based on categories
- **Minimum Thresholds:** Apply minimum purchase amount requirements

### Discount and Adjustment Handling
- **Coupon Deductions:** Subtract discount coupon values from point calculation
- **Payment Method Adjustments:** Consider payment method impacts on earning
- **Tax Exclusions:** Exclude tax amounts from point calculations
- **Return Adjustments:** Calculate point deductions for returned items

### External System Communication
- **Real-Time Processing:** Real-time communication with external loyalty systems
- **Transaction Verification:** Verify transactions with external systems
- **Balance Synchronization:** Maintain balance synchronization with external systems
- **Error Recovery:** Handle communication errors and retry logic

## Important Warnings

### ⚠️ Configuration and Setup Requirements
- **Valid Configuration:** Reward points configuration must exist and be properly configured
- **Earning Policy:** Configuration must have earning policy enabled
- **External System Setup:** External system integration must be properly configured
- **Field Mapping:** Points owner field mapping must be correctly defined

### ⚠️ Customer Data Requirements
- **Points Owner Identification:** Invoice must have valid points owner (customer) information
- **Mobile Number Required:** Points owner must have valid mobile number for external systems
- **Contact Information:** Complete contact information required for external system integration
- **Customer Eligibility:** Customer must be eligible for loyalty program participation

### ⚠️ Transaction and Data Integrity
- **Invoice Validation:** Only valid invoices can process loyalty points
- **Return Document Handling:** Return documents require proper linkage to original invoices
- **Amount Calculations:** Point calculations must be accurate and consistent
- **External System Sync:** External system transactions must be synchronized properly

### ⚠️ Multi-Site and Replication
- **Head Office Processing:** Points processing only occurs at head office in replicated environments
- **Site Coordination:** Multi-site setups require proper configuration coordination
- **Data Synchronization:** Reward data must be synchronized across sites
- **Replication Compatibility:** Must work correctly with database replication

## Best Practices

### Configuration Management
- **Thorough Testing:** Test reward configuration thoroughly before production use
- **Point Calculation Validation:** Validate point calculation rules with business requirements
- **External System Testing:** Test external system integration end-to-end
- **Regular Configuration Review:** Review and update configurations regularly

### Customer Data Management
- **Data Quality:** Ensure customer data quality for accurate point assignment
- **Contact Information Maintenance:** Maintain current customer contact information
- **Eligibility Management:** Manage customer eligibility for loyalty programs
- **Privacy Compliance:** Ensure compliance with data privacy regulations

### Transaction Processing
- **Error Monitoring:** Monitor external system integration for errors
- **Transaction Auditing:** Maintain comprehensive audit trails for point transactions
- **Balance Reconciliation:** Regularly reconcile point balances with external systems
- **Performance Monitoring:** Monitor processing performance for large transaction volumes

### Return and Adjustment Handling
- **Return Policy Alignment:** Align point deduction policies with return policies
- **Partial Return Management:** Handle partial returns accurately
- **Adjustment Procedures:** Establish clear procedures for point adjustments
- **Customer Communication:** Communicate point changes to customers appropriately

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EALoyalityEarnReward`


</div>

