---
title: EALoyalityEarnReward
module: core
---


<div class='entity-flows'>

# EALoyalityEarnReward

**This document was generated using Claude.ai**

## Overview

Processes customer loyalty reward points earning for invoice transactions, calculating and awarding points based on purchase amounts while handling returns and external system integration.

## When This Action Runs

Loyalty point processing for invoices after completion or approval to award reward points to customers.

## How It Works

1. **Validates invoice and configuration** ensuring proper loyalty setup and earning policy
2. **Identifies points owner** and verifies required contact information (mobile number)
3. **Calculates reward-eligible amount** after discount adjustments and coupon deductions
4. **Processes points earning/updates** including return deductions and external system communication
5. **Creates reward entries** in loyalty system with transaction tracking

## Parameters

**Parameter 1:** Reward Points Config (Required) - Code of RewardPointsConfig entity defining earning rules (e.g., STANDARD_LOYALTY, VIP_REWARDS, STC_LOYALTY_CONFIG)

## Database Tables Affected

- **STCLoyaltyPointsRewardEntry** - Creates/updates reward point entries with transaction history
- **RewardPointsConfig** - Reads earning rules, thresholds, and external system settings
- **Invoice and Related Tables** - Accesses invoice data, customer info, and payment lines
- **External System Records** - May create API transaction records and error tracking

## Important Warnings

### ⚠️ Configuration Requirements
- Reward points configuration must exist with earning policy enabled
- External system integration must be properly configured
- Points owner field mapping must be correctly defined

### ⚠️ Customer Data Requirements
- Invoice must have valid points owner (customer) information
- Points owner must have valid mobile number for external systems
- Customer must be eligible for loyalty program participation

### ⚠️ Transaction Integrity
- Only valid invoices can process loyalty points
- Return documents require proper linkage to original invoices
- Point calculations must be accurate and consistent
- External system transactions must be synchronized properly

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EALoyalityEarnReward`


</div>

