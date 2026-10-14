---
title: Fill a Forgotten Punch's Hour From the Employee's Shift
module: hr
entities: [EntityFlow, LeavePermission, AttendanceShift, AttendancePlan]
groovy: recommended
description: A Groovy script that sets a Forgot Check In or Forgot Check Out leave permission's hour to the start or end of the employee's shift on that day.
---

<div class='entity-flows'>

# Fill a Forgotten Punch's Hour From the Employee's Shift

This Groovy script fills in the hour of a **Leave Permission** for a forgotten punch. For **Forgot Check In** it sets **From Hour** to the start of the employee's shift that day. For **Forgot Check Out** it sets **To Hour** to the end of the shift.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters.
:::

| | |
|---|---|
| **Class name** | `EASetPermissionHourFromAttendanceShift` |
| **Script** | [EASetPermissionHourFromAttendanceShift.groovy](/groovy-examples/EASetPermissionHourFromAttendanceShift.groovy) |
| **Runs on** | Leave Permission, on the **Pre Update Calculated Fields** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

When an employee forgets to punch in, HR covers the missing punch with a **Leave Permission** whose **Permission Type** is *Forgot Check In*. Somebody still has to type the hour the employee should have punched, and that hour depends on the employee's shift: 08:00 for one person, 07:00 for another, 16:00 for someone on the evening shift. Typing it by hand is slow, and a wrong hour gives the permission a wrong period.

With this script, the hour is taken from the shift the attendance plan gives that employee on that day. HR only picks the employee, the type and the date.

## How it works

1. **It looks at the permission type.** Only *Forgot Check In* and *Forgot Check Out* are handled. Every other type is left alone.
2. **It picks the day.** For *Forgot Check In* it uses **From Date**; for *Forgot Check Out* it uses **To Date**. If that date is empty, it uses the document's date.
3. **It finds the employee's shift on that day.** It reads the [attendance plan](/modules/hr/attendance/attendance-plans-and-shifts) in force on that day for the employee, taking added shifts and plan priorities into account, and takes that day's work periods from the shift.
4. **It sets the hour.**
   - *Forgot Check In*: **From Hour** becomes the start of the first work period of the day.
   - *Forgot Check Out*: **To Hour** becomes the end of the last work period of the day.

   On a split shift, that is the start of the morning period and the end of the evening period.
5. **On a weekend or weekly rest day**, the shift's own hours for that day are used if the shift defines any. If no plan covers the employee, or the shift has no hours for that day, the permission is left as the user typed it.

The script runs on **Pre Update Calculated Fields**, so the permission's period is calculated from the new hour when the document is saved.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Leave Permission** and **Target Action** to **Pre Update Calculated Fields**.
3. In the **Details** grid, paste the whole script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

An employee's attendance plan gives him a shift from 08:00 to 16:00 on working days. HR records two permissions for him:

| Permission Type | Date | Hours typed | Hours after saving |
|---|---|---|---|
| Forgot Check In | 08-10-2026 | From 10:30 to 16:00 | **From 08:00** to 16:00 |
| Forgot Check Out | 07-10-2026 | From 08:00 to 13:00 | From 08:00 **to 16:00** |

## Messages you may see

The script raises no messages of its own. When it cannot find a shift for the day, it simply leaves the hours as they were typed, so check **From Hour** and **To Hour** after saving if the employee has no attendance plan.

## The script

The comments in the script are in Arabic; they repeat what this page explains.

<<< @/public/groovy-examples/EASetPermissionHourFromAttendanceShift.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Leave Permissions & Missions](/modules/hr/attendance/leave-permissions-and-missions)
- [Attendance Plans & Shifts](/modules/hr/attendance/attendance-plans-and-shifts)
- [Show What the System Thinks Each Day Is for an Employee](/entity-flows/groovy/EAFindDaysInfoForEmployee): to check which shift an employee has on a given day.

</div>
