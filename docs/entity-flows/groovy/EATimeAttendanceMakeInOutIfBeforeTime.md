---
title: Treat a Late Check-In as a Check-Out
module: hr
entities: [EntityFlow, TimeAttendance]
groovy: recommended
description: A Groovy script that turns a lone Time Attendance check-in made after a cut-off time into a check-out, for attendance machines that do not tell the two apart.
---

<div class='entity-flows'>

# Treat a Late Check-In as a Check-Out

This Groovy script fixes **Time Attendance** lines where the attendance machine recorded a check-out as a check-in. Any lone check-in made at or after a cut-off time that you choose is moved to the check-out side of the line.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it through its parameter.
:::

| | |
|---|---|
| **Class name** | `EATimeAttendanceMakeInOutIfBeforeTime` |
| **Script** | [EATimeAttendanceMakeInOutIfBeforeTime.groovy](/groovy-examples/EATimeAttendanceMakeInOutIfBeforeTime.groovy) |
| **Runs on** | Time Attendance, on the **Pre Update Calculated Fields** event |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Many attendance machines record every punch the same way and leave it to the import to decide which is which. When an employee forgets to punch in, the only punch of the day is the one at the end of the shift, and it arrives in the **Attendance** grid as a check-in: **In** 06-10-2026 17:05, with no **Out**. The employee then looks like someone who arrived at five in the evening and never left.

If your shifts start in the morning, a lone punch in the afternoon can only be a check-out. This script applies that rule for you: give it a cut-off time such as 12:00, and every lone check-in at or after 12:00 becomes a check-out.

## How it works

For every line of the **Attendance** grid:

1. A line that already has an **Out** date is left alone. So is a line with no **In** date.
2. If the **In** time is at or after the cut-off time in Parameter 2, the **In** date and time are moved to **Out**, and **In** is cleared.
3. Otherwise the line is left alone.

The script runs on **Pre Update Calculated Fields**, before the system's own calculations, so the document is saved with the corrected line.

::: warning Not for night shifts
The rule assumes every real check-in happens before the cut-off. An employee on an evening or night shift who checks in at 16:00 would be turned into a check-out. Do not use this script on documents that include such employees, or choose a cut-off later than any real check-in.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Time Attendance** and **Target Action** to **Pre Update Calculated Fields**.
3. In the **Details** grid, paste the whole script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Fill in the parameters, then save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Cut Off Time (eg. 11:30) | The cut-off time as hours and minutes on a 24-hour clock, for example `12:00`. This parameter is required. |

## Example

With Parameter 2 set to `12:00`, an import brings these two lines for one employee:

| Line | In | Out |
|---|---|---|
| 1 | 06-10-2026 17:05 | *(empty)* |
| 2 | 07-10-2026 08:10 | *(empty)* |

The document is saved as:

| Line | In | Out |
|---|---|---|
| 1 | *(empty)* | 06-10-2026 17:05 |
| 2 | 07-10-2026 08:10 | *(empty)* |

Line 1 was after the cut-off, so it became a check-out. Line 2 was before it, so it stayed a check-in.

## Messages you may see

The script raises no messages of its own. It changes lines silently, so check the **Attendance** grid after saving if you are not sure what it did.

## The script

<<< @/public/groovy-examples/EATimeAttendanceMakeInOutIfBeforeTime.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Time Attendance](/modules/hr/attendance/time-attendance)
- [Clear Attendance Punches Recorded at Midnight](/entity-flows/groovy/EAClearFromDateIfFromTimeIsMidnight): another clean-up for machine imports, which can share the same flow.

</div>
