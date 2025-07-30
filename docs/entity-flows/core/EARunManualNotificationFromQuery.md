---
title: EARunManualNotificationFromQuery
module: core
---


<div class='entity-flows'>

# EARunManualNotificationFromQuery

**This document was generated using Claude.ai**

## Overview

Bulk sends manual notifications to multiple entities identified by a SQL query. Extends EARecommitFromQuery but sends notifications instead of recommitting, useful for mass communication campaigns and alerts.

## When This Action Runs

Manual execution for bulk notification operations, such as sending payment reminders, status updates, or promotional communications to entities matching specific criteria.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before notifications
4. **Sends notifications** - Calls NotificationsEngine.manualNotify() on each entity
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

Example Query:
```sql
select entityType,id from SalesInvoice where dueDate < getdate() and balance > 0
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)

**Parameter 3:** Do not Send Notifications to cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)

**Parameter 4:** Flush After Each Notification (Optional) - true/false to flush after each entity (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before Notifications (Optional) - SQL update query to run before notifications

**Parameter 7:** Manual Notification ID or Code (Required) - Business code or ID of NotificationDefinition to send

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **NotificationDefinition** - Reads notification configuration and templates
- **Notification Logs** - Creates notification delivery tracking records
- **Optional Update Tables** - Additional update query may affect other tables

## Important Warnings

### ⚠️ Query Requirements
- Query must return exactly 2 columns: entityType (string) and id (uniqueID)
- Query should use proper WHERE conditions to avoid unintended mass notifications
- Use {id} placeholder to reference the current entity's ID in the query

### ⚠️ Notification Requirements
- Notification definition must exist and be configured for manual execution
- Notification templates and recipient lists must be properly configured
- Each entity type must be compatible with the notification template

### ⚠️ Delivery Considerations
- Large result sets can overwhelm email/SMS services
- Consider rate limiting and service quotas for external notification providers
- Monitor delivery failures and bounce rates for large campaigns

### ⚠️ Performance and Scale
- Each notification sends individually which may take significant time
- Network latency affects bulk notification performance
- Consider system load and timing for large notification campaigns

### ⚠️ Content and Recipients
- Notification content is populated from each entity's data
- Missing contact information may cause delivery failures
- Template fields must be available across all target entity types

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunManualNotificationFromQuery`

**Related Actions:**
- [EARunManualNotification](EARunManualNotification.md) - Single entity notification
- [EARecommitFromQuery](EARecommitFromQuery.md) - Parent class for bulk entity operations


</div>