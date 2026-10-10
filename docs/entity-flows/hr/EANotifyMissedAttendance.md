---
title: EANotifyMissedAttendance
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EANotifyMissedAttendance

## Overview

Sends each employee a push notification on the Nama mobile app for every working day on which they have no attendance, or checked in but never checked out. The notification points the app at the employee's missed attendance for that day, so they can follow up while it is still fresh.

## When This Action Runs

It ignores the record it runs on, so run it from a scheduled task — typically once a day, after the attendance calculation has run.

## How It Works

1. **Takes the date range** - from parameter 1 to parameter 2; two days ago to today when they are empty.
2. **Reads the calculated attendance** - looks at the employees' calculated daily attendance lines in that range and keeps the days marked as an absence or as *no check-out*. Only days that the attendance calculation has already produced are considered, so an employee whose attendance was never calculated for the period receives nothing.
3. **Skips days off** - a day that is a weekend, holiday, vacation, suspension or mission day is never treated as missed.
4. **Notifies the employee** -
   - absent: title *Missing attendance* — «لا يوجد تسجيل حضور», text *You did not record your attendance on* followed by the date;
   - no check-out: title *Incomplete attendance* — «حضور غير مكتمل», text *You have an incomplete attendance record on* followed by the date.
5. **Reports the total** - the running task shows "Missed attendance notifications sent: {0}".

## Parameters

**Parameter 1:** From Date (yyyy-MM-dd, default: 2 days ago) (Optional) - First day to check, written like `2026-10-01`.

**Parameter 2:** To Date (yyyy-MM-dd, default: today) (Optional) - Last day to check.

A date in any other format is rejected when the entity flow is saved.

## Important Notes

- Fixed dates in the parameters make every run check the same days. For a daily schedule, leave both parameters empty so the range moves with the calendar.
- With the default two-day window, a daily schedule notifies the employee about the same missed day on more than one run. Narrow the window if that is unwanted.

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EANotifyMissedAttendance`

See [HR self-service on the mobile app](/modules/mobile/mobile-hr-self-service) for what the employee sees.

## Related Actions

- [EAEmpAttendanceSysEntryCalculator](EAEmpAttendanceSysEntryCalculator.md)


</div>
