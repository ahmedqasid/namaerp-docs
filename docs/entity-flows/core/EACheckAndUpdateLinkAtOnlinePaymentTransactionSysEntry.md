---
title: EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry
module: core
---


<div class='entity-flows'>

# EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry

**This document was generated using Claude.ai**

## Overview

This entity flow performs maintenance on online payment transaction entries by checking for expired payment links and updating their status accordingly. It processes all valid payment links in batches, calculates their expiry times, and marks expired links as "Expired" to maintain data accuracy and system integrity.

## When This Action Runs

- **Trigger:** Scheduled maintenance task or manual execution
- **Target:** OnlinePaymentTransactionSysEntry entities with "Valid" link status
- **Purpose:** Maintain accurate payment link status by identifying and marking expired links
- **Frequency:** Typically run periodically (daily/hourly) to keep payment link statuses current

## How It Works

### 1. Valid Link Discovery
- **Query Execution:** Finds all OnlinePaymentTransactionSysEntry records with linkStatus = 'Valid'
- **Batch Identification:** Identifies payment links that need expiry checking
- **System-Wide Scope:** Processes all valid payment links across the entire system
- **Status Filtering:** Only processes entries currently marked as valid

### 2. Batch Processing Architecture
- **Batch Size:** Processes entries in batches of 300 records
- **Transaction Management:** Each batch processed in separate database transaction
- **Memory Efficiency:** Prevents memory issues when processing large numbers of entries
- **Performance Optimization:** Balances processing speed with system resource usage

### 3. Expiry Calculation Process
- **Configuration Retrieval:** Gets payment configuration for each transaction entry
- **Expiry Time Calculation:** Uses OnlinePaymentUtils to calculate link expiry time
- **Date Comparison:** Compares current time with calculated expiry time
- **Timezone Handling:** Properly handles date/time calculations across timezones

### 4. Status Update Logic
- **Expiry Detection:** Identifies links where current time exceeds expiry time
- **Status Update:** Changes linkStatus from "Valid" to "Expired" for expired links
- **Selective Updates:** Only updates entries that have actually expired
- **Data Integrity:** Maintains accurate link status information

### 5. Transaction Safety
- **Batch Transactions:** Each batch of 300 entries processed in separate transaction
- **Error Isolation:** Errors in one batch don't affect processing of other batches
- **Atomic Updates:** All updates within a batch succeed or fail together
- **Resource Management:** Proper transaction management prevents resource leaks

## Key Components

### Online Payment System Integration
- **Payment Configuration:** Uses OnlinePaymentConfig to determine expiry rules
- **Link Management:** Manages payment link lifecycle and status transitions
- **Expiry Calculation:** Leverages OnlinePaymentUtils for consistent expiry logic
- **Status Tracking:** Maintains accurate payment link status information

### Batch Processing Framework
- **Scalable Design:** Handles large numbers of payment entries efficiently
- **Resource Management:** Controls memory and database resource usage
- **Transaction Boundaries:** Ensures data consistency during bulk updates
- **Performance Optimization:** Balances throughput with system stability

### Data Maintenance
- **Status Accuracy:** Ensures payment link statuses reflect actual expiry state
- **System Cleanup:** Prevents accumulation of stale "Valid" status entries
- **Data Integrity:** Maintains consistent payment transaction data
- **Operational Excellence:** Supports reliable payment system operation

## Parameters

**No Parameters Required**

This action does not require any parameters as it performs system-wide maintenance on all valid payment transaction entries. The action automatically:
- Identifies all entries needing expiry checking
- Determines appropriate batch sizes for processing
- Calculates expiry times based on payment configuration
- Updates statuses based on expiry calculations

## Database Tables Affected

### Primary Tables
- **OnlinePaymentTransactionSysEntry:** Main table for payment transaction tracking
  - `linkStatus`: Updated from "Valid" to "Expired" for expired entries
  - `id`: Used to identify and retrieve specific entries
  - `creationDate`: Used in expiry time calculations
  - `onlinePaymentConfig`: Referenced for expiry configuration

### Referenced Tables
- **OnlinePaymentConfig:** Payment configuration settings
  - Read to determine expiry rules and timeouts
  - Used for calculating when payment links should expire
  - Contains configuration for different payment methods

## Business Use Cases

### 1. Payment Link Lifecycle Management
- **Link Expiry Tracking:** Maintain accurate status of payment links
- **Customer Experience:** Prevent customers from using expired payment links
- **System Cleanup:** Remove stale valid statuses from payment entries
- **Operational Accuracy:** Ensure payment system reflects actual link states

### 2. System Maintenance and Health
- **Data Accuracy:** Keep payment transaction data current and accurate
- **System Performance:** Prevent accumulation of outdated status information
- **Operational Efficiency:** Maintain clean payment transaction records
- **Monitoring Support:** Provide accurate data for payment system monitoring

### 3. Compliance and Reporting
- **Audit Trail Accuracy:** Ensure payment records reflect actual link states
- **Reporting Precision:** Provide accurate data for payment reporting
- **Compliance Requirements:** Meet requirements for payment processing accuracy
- **Financial Reconciliation:** Support accurate financial reconciliation processes

## Processing Performance

### Batch Processing Benefits
- **Memory Efficiency:** 300-record batches prevent memory overflow
- **Transaction Management:** Separate transactions prevent long-running locks
- **Error Recovery:** Batch failures don't affect entire processing run
- **Resource Control:** Manages database connection and memory usage

### Scalability Considerations
- **Large Volume Handling:** Efficiently processes thousands of payment entries
- **Resource Optimization:** Balances processing speed with system stability
- **Concurrent Operation:** Can run alongside other system operations
- **Performance Monitoring:** Processing time scales linearly with entry count

## Important Warnings

### ⚠️ System Load Considerations
- **Database Impact:** Processing large numbers of entries may impact database performance
- **Resource Usage:** Batch processing consumes database connections and memory
- **Timing Sensitivity:** Best run during low-activity periods to minimize user impact
- **Monitoring Required:** Monitor system performance during execution

### ⚠️ Payment System Dependencies
- **Configuration Dependency:** Requires valid OnlinePaymentConfig entries for each transaction
- **Utility Dependencies:** Relies on OnlinePaymentUtils for expiry calculations
- **Status Consistency:** Changes affect payment system behavior and customer experience
- **Integration Impact:** Status changes may affect external payment system integrations

### ⚠️ Data Consistency Requirements
- **Transaction Integrity:** Batch processing requires proper transaction management
- **Status Accuracy:** Incorrect expiry calculations could affect payment processing
- **Configuration Validity:** Invalid payment configurations may cause processing errors
- **Date/Time Accuracy:** System time accuracy critical for proper expiry detection

### ⚠️ Operational Considerations
- **Execution Frequency:** Should be run regularly to maintain status accuracy
- **Error Handling:** Processing errors may leave some entries with incorrect status
- **Performance Impact:** Large-scale processing may affect system responsiveness
- **Monitoring Needs:** Requires monitoring to ensure successful completion

## Best Practices

### Scheduling
- **Regular Execution:** Schedule to run at regular intervals (hourly or daily)
- **Off-Peak Timing:** Execute during low system usage periods
- **Monitoring Integration:** Include in system monitoring and alerting
- **Performance Tracking:** Monitor execution time and processed record counts

### Error Management
- **Log Monitoring:** Monitor logs for processing errors or failures
- **Recovery Procedures:** Implement procedures for handling processing failures
- **Validation Checks:** Verify processing results through status queries
- **Backup Strategies:** Consider backup strategies for payment transaction data

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry`


</div>

