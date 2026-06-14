# Frequently Asked Questions — Payroll and Human Resources Module

## If an employee is late for the morning check-in due to an emergency (no salary deduction), how should this be handled in the system?

## Answer:

If an employee arrives later than the scheduled time (for example, they were due at 8:00 AM but arrived at 10:00 AM) and they have a **valid excuse**, the system can exclude this delay from deductions or warnings, provided a formal permission record is entered.

### Processing Steps in the System:

1. **Open the "Leave Permission" screen**:

    * Enter a permission that covers the period from **08:00 to 10:00** on the same day as the delay.
    * Select the appropriate permission type (for example: excused late arrival, not deducted from salary).

2. **Result**:

    * When delays are calculated in the attendance and departure sheet, the system will **exclude the two hours** from the delay count.
    * Therefore, **the day will not be counted as a delay**, and no deduction or warning will be recorded against the employee.

::: tip Additional Notes

* It is recommended to document the reason for the permission in the Notes field.
* You can configure permissions for the direct manager or HR officer to approve the permission when needed.
:::

---

## How can employee delays and overtime be calculated on weekly holidays and official holidays?

### Mechanism for Calculating Delays and Overtime:

#### 1. **Official Holidays and Weekly Days Off:**

Overtime calculation for holidays is controlled through the settings in **HR Configuration** (`HRConfiguration`):

* **For official holidays**: Enable the setting **"Calculate work hours normally for official holiday days (overtime will not be the full day)"**
* **For weekly days off**: Enable the setting **"Calculate work hours normally for vacation days (overtime will not be the full day)"**

When these settings are enabled:
- The entire day is not treated as overtime
- Only the actual time worked beyond the scheduled hours is calculated

#### 2. **Calculating Delays:**

Delays are calculated based on the **Attendance Shift** (`AttendanceShift`) file assigned to the employee:

* **Working Hours**: Check-in and check-out times are defined for each day of the week
* **Weekly Days Off**: These are defined in the attendance shift file (for example: Friday as a weekly rest day)
* **Allow Specifying Times**: The setting **"Allow specifying check-in and check-out times for weekly days off"** determines whether work on rest days is possible

#### 3. **Processing Leave Permissions:**

To handle delays that have a valid excuse, use a **Leave Permission** (`LeavePermission`):

1. **Create the permission**: Register a permission covering the delay period
2. **Effect on overtime**: Depends on the setting **"Consider leave permissions when calculating overtime"** in HR Configuration
3. **Effect on delays**: The permission period will be excluded from the delay calculation

#### 4. **Additional Control Settings:**

* **Calculate overtime from end of shift**: Determines when overtime starts being counted
* **Consider assignments when calculating overtime**: The effect of assignments on overtime calculation
* **Number of hours allowed before preventing check-out registration**: Maximum allowed hours

::: tip Important Technical Notes
- The **Attendance Shift** (`AttendanceShift`) defines working hours and rest days for each day
- **HR Configuration** (`HRConfiguration`) controls overtime and delay calculation behavior
- **Leave Permission** (`LeavePermission`) is used to exclude justified delay periods
- A different **Leave Reason** (`LeaveReason`) type can be assigned to each permission depending on the nature of the excuse
:::

::: details Technical Fields in the System
**In the Attendance Shift (`AttendanceShift`)**:
- `allowSpecifyingTimeInWeekEnd`: Allow specifying check-in and check-out times for weekly days off
- `friday.weeklyRest`: Mark Friday as a weekly rest day
- `numberOfHoursAllowedBeforePreventingCheckOut`: Number of hours allowed before preventing check-out registration

**In HR Configuration (`HRConfiguration`)**:
- `calculateNormalWorkHoursForHolidays`: Calculate work hours normally for official holiday days
- `calculateNormalWorkHoursForVacations`: Calculate work hours normally for vacation days
- `overTimeAfterWorkTime`: Calculate overtime from end of shift
- `leavePermissionAddsOvertime`: Consider leave permissions when calculating overtime
:::

---

## How can salary vouchers be made to create a single consolidated journal entry for all employees at once instead of a separate entry per employee, in order to maintain payroll confidentiality?

- The Problem:
By default, the system creates a **separate accounting journal entry for each employee's salary voucher**, which means anyone with access to the accounting entries can see each employee's individual salary details. This conflicts with **payroll confidentiality**.

- The Solution:
A **unified consolidated journal entry** system can be applied through the following steps:

1. **Salary Document Term Config (SalaryDocument) settings:**
- Enable the **"Without Accounting Effect" (`withoutAccountingEffect`)** option in the salary document term config
- This will prevent the creation of individual journal entries for each salary voucher

2. **Salary Sheet Term Config (SalarySheet) settings:**
- Enable the **"Generate Accounting Effects" (`generateAccountingEffects`)** option in the salary sheet term config
- This will result in a single consolidated journal entry being created when the salary sheet is saved

⚠️ **Additional Important Steps to Ensure Confidentiality:**

3. **Modify the accounting effect for salary components:**
Change the accounting effect in the **Salary Component** (`SalaryComponent`) file from:
- **Before:** Employee receivable account (employee name appears in the entry)
- **After:** General subsidiary account (aggregate number without employee names)

4. **Change employee payables accounts:**
- Change **employee payables** accounts from **employee receivable accounts** to **general subsidiary accounts**
- Use aggregate numbers instead of employee names

---

🎯 **Final Result:**

::: tip **With the correct application of the steps above:**
- ✅ **One consolidated journal entry** instead of individual entries per employee
- ✅ **Payroll confidentiality preserved** — no employee's salary will appear in accounting entries
- ✅ **Aggregate numbers only** in subsidiary accounts
- ✅ **Accounting accuracy** while maintaining total payroll and payables figures
:::

::: warning **Important Warning:**
If you do **not** change the employee payables accounts from **employee receivable** to **general subsidiary accounts**, people with access to the accounting entries will still be able to **see each employee's salary details**, and therefore the required confidentiality will not be achieved.
:::

---
