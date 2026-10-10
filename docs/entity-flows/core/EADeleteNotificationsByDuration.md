---
title: EADeleteNotificationsByDuration
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADeleteNotificationsByDuration

## Overview

Deletes user notifications older than a given number of days. Every approval, alert and manual notification leaves a row behind, and on a busy system they pile up into the hundreds of thousands — which slows the notification list and eventually raises a critical error warning that the notification count is too high. This action is the housekeeping job that keeps that table small. It can delete every old notification, or only the ones the user has already viewed.

## When This Action Runs

It ignores the record it runs on, so it is meant to be run from a scheduled task (for example once a night). It can also be run manually when the notification-count warning appears.

## How It Works

1. **Works out the cut-off date** - today minus the number of days in parameter 1. Everything submitted on or before that day is a candidate.
2. **Picks the notifications** - all notifications up to the cut-off, or only the ones whose status is *Viewed* when parameter 2 is `readonly`.
3. **Deletes in batches of 200** - each batch is deleted in its own transaction, so a long run that is stopped half-way keeps what it has already deleted. Progress ("Deleting notifications - {0} rows were deleted") is shown on the running task, and the task can be stopped between batches.
4. **Re-checks the notification count** - when it finishes, it re-evaluates the "too many user notifications" critical error, so the warning disappears once the count is back under the limit (the *Max User Notification Count* in Global Configuration, 10,000 when left empty).

## Parameters

**Parameter 1:** Duration Days (default is 25 days) (Optional) - Keep notifications newer than this many days. Must be a whole number. Empty means 25.

**Parameter 2:** Delete Type (all, readonly) - Default is all (Optional) - `all` deletes every old notification; `readonly` deletes only the ones that were already viewed, so unread notifications survive however old they are. Any other value is rejected when the entity flow is saved.

## Important Notes

- Notifications are deleted for every user and every legal entity, not only the current user's.
- Run with `readonly` first if users rely on old unread notifications as a to-do list.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteNotificationsByDuration`

## Related Actions

- [EARunManualNotification](EARunManualNotification.md)
- [EARunManualNotificationFromQuery](EARunManualNotificationFromQuery.md)
- [EADeleteOldFiles](EADeleteOldFiles.md)


</div>
