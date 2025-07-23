---
title: EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry
module: core
---


<div class='entity-flows'>

# EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry

**This document was generated using AI Tools**

## Purpose
This action automatically checks and updates online payment link statuses in the system by finding expired payment links and marking them as expired. It processes payment transaction entries in batches to handle large volumes efficiently.

## When to Use This Action
- **Scheduled Maintenance**: Run as scheduled job to clean up expired payment links
- **Payment System Cleanup**: When payment links need to be marked as expired based on their expiry dates
- **Link Status Management**: To ensure payment link statuses reflect their actual validity
- **Batch Processing**: When dealing with large numbers of payment transactions

## How It Works
1. **Database Query**: Searches for all OnlinePaymentTransactionSysEntry records with 'Valid' link status
2. **Batch Processing**: Processes records in batches of 300 to avoid memory issues
3. **Expiry Check**: For each entry, calculates expiry time based on payment configuration
4. **Status Update**: Changes link status from 'Valid' to 'Expired' if current time exceeds expiry
5. **Transaction Safety**: Each batch is processed in its own database transaction

## Entity Type Restrictions
This action works with **BaseEntity** and processes **OnlinePaymentTransactionSysEntry** records directly from the database. It does not require specific entity types to trigger it.

## Parameters Required
**No Parameters Required** - This action takes no input parameters and operates on all valid payment links system-wide.

## How Expiry Detection Works

### Expiry Time Calculation
1. **Configuration Lookup**: Gets OnlinePaymentConfig associated with each payment entry
2. **Creation Date**: Uses the creation date of the payment transaction entry
3. **Expiry Calculation**: Uses `OnlinePaymentUtils.expiryTimeInMilliSeconds()` to calculate when link expires
4. **Current Time Check**: Compares current system time against calculated expiry time

### Status Update Logic
- **Current Status**: Only processes entries with linkStatus = 'Valid'
- **Expiry Check**: If current time > expiry time, mark as 'Expired'
- **Batch Safety**: Processes in batches of 300 to prevent memory issues
- **Transaction Isolation**: Each batch processed in separate transaction

## Batch Processing Details

### Why Batch Processing?
- **Memory Management**: Prevents loading too many records at once
- **Transaction Size**: Keeps transactions manageable
- **System Performance**: Reduces lock contention and improves throughput
- **Error Isolation**: If one batch fails, others can still succeed

### Batch Size: 300 Records
- **Optimized Size**: Balances performance with memory usage
- **Database Efficiency**: Good balance for most database configurations
- **Memory Safety**: Prevents out-of-memory errors on large datasets

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **System-Wide Effect**: Updates all expired payment links across entire system
2. **Irreversible**: Once marked as 'Expired', links cannot be automatically reverted to 'Valid'
3. **Customer Impact**: Expired links will no longer work for customers trying to pay
4. **Database Load**: Processes all valid payment links - can be resource intensive
5. **Transaction Safety**: Uses separate transactions for each batch to prevent data loss

## Payment Link Lifecycle

### Payment Link States
- **Valid**: Link is active and can be used for payment
- **Expired**: Link has passed its expiry time and cannot be used
- **Other States**: May include Used, Cancelled, etc. (not processed by this action)

### Expiry Configuration
- **OnlinePaymentConfig**: Defines how long payment links remain valid
- **Creation-Based**: Expiry calculated from payment entry creation time
- **Configurable Duration**: Each payment configuration can have different expiry periods

## Monitoring and Troubleshooting

### Success Indicators
- **Records Processed**: Action completes without errors
- **Status Updates**: Previously 'Valid' expired links now show 'Expired' status
- **Batch Completion**: All batches process successfully

### Common Issues

**"No records processed"**
- Check if any payment links have 'Valid' status in database
- Verify OnlinePaymentTransactionSysEntry table has data
- Confirm payment links actually exist

**"Performance issues during processing"**
- Monitor during processing - action processes all valid links
- Consider running during off-hours for large datasets
- Check database performance during batch processing

**"Some links not expired despite being old"**
- Check OnlinePaymentConfig settings for those entries
- Verify expiry time calculation is working correctly
- Confirm system clock is accurate

**"Transaction timeout errors"**
- Reduce batch size if needed (currently 300)
- Check database transaction timeout settings
- Monitor database lock contention

## SQL Queries for Monitoring

```sql
-- Check payment link statuses before/after running action
SELECT linkStatus, COUNT(*) as count_records
FROM OnlinePaymentTransactionSysEntry 
GROUP BY linkStatus

-- Check recently expired links
SELECT id, creationDate, linkStatus, onlinePaymentConfig_id
FROM OnlinePaymentTransactionSysEntry 
WHERE linkStatus = 'Expired' 
  AND lastUpdateDate > DATEADD(hour, -1, GETDATE())

-- Find potentially expired but still valid links
SELECT opte.id, opte.creationDate, opte.linkStatus, 
       opc.expiryHours, -- check actual column name in OnlinePaymentConfig
       DATEADD(hour, opc.expiryHours, opte.creationDate) as calculated_expiry
FROM OnlinePaymentTransactionSysEntry opte
JOIN OnlinePaymentConfig opc ON opte.onlinePaymentConfig_id = opc.id
WHERE opte.linkStatus = 'Valid'
  AND DATEADD(hour, opc.expiryHours, opte.creationDate) < GETDATE()
```

## Best Practices

### When to Run This Action
- **Scheduled Jobs**: Set up as recurring task (daily or hourly)
- **Maintenance Windows**: Run during low-usage periods for large datasets
- **After Configuration Changes**: When payment expiry settings are modified
- **Manual Cleanup**: When payment link cleanup is needed

### Scheduling Recommendations
- **Frequency**: Run hourly or daily depending on payment volume
- **Timing**: During off-peak hours to minimize system impact
- **Monitoring**: Log results and monitor for any issues
- **Alerting**: Set up alerts if action fails or finds unusual patterns

## Related Actions
- **Payment Processing**: Actions that create payment links
- **Payment Configuration**: Tools for managing OnlinePaymentConfig settings
- **System Cleanup**: Other maintenance actions for payment data

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACheckAndUpdateLinkAtOnlinePaymentTransactionSysEntry`

</div>