---
title: EARunManualNotification
module: core
---


<div class='entity-flows'>

# EARunManualNotification

**This document was generated using Claude.ai**

## Overview

Triggers a manual notification for the current entity using a predefined notification definition. Sends emails, SMS, or other configured notifications based on the notification template and recipient configuration.

## When This Action Runs

Manual execution when specific notifications need to be sent outside of automatic triggers, such as custom alerts, reminders, or status notifications for business processes.

## How It Works

1. **Locates notification definition** - Finds NotificationDefinition by the specified business code
2. **Validates configuration** - Ensures notification is configured for manual execution
3. **Prepares notification data** - Uses current entity data to populate notification template
4. **Sends notification** - Executes the notification through the NotificationsEngine
5. **Returns results** - Reports success or failure of notification delivery

## Parameters

**Parameter 1:** Notification Definition Code (Required) - Business code of the NotificationDefinition to execute

## Database Tables Affected

- **NotificationDefinition** - Reads notification configuration, templates, and recipient settings
- **Notification Logs** - May create notification delivery tracking records
- **Entity Data** - Reads current entity data for notification content population

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunManualNotification`


</div>