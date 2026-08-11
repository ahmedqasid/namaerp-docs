# Project Management Reports

::: info Required licence
`ecpa`. The two reports below are installed with the system; they appear in the reports list as soon
as the module is licensed.
:::

Project Management (ECPA) ships **two** reports, and both of them are about the same thing: employee
time. That is a smaller shipped set than most Nama modules carry, and it is worth saying plainly at
the top so nobody spends an afternoon looking for the third one — **there is no project profitability
report, no work-in-progress report and no project dashboard in this module.**

What the two reports do cover is the question the module is best at answering: *who spent how long on
what, and has it been approved yet.* That is the number a partner bills from and the number a manager
chases, so it is a reasonable pair to ship.

The reports are not in the Project Management menu. Like every report in Nama they sit under
**Reports** (التقارير) → **All Reports**; type part of the title, or type `PMG`, and both come up
together.

| Code | Title (Arabic) | Title (English) | It answers |
|---|---|---|---|
| `SYSR-PMG001` | اوقات الموظفين | Employee TimeSheet | Which hours were booked on which project and task, over a date range, and what state is each line in? |
| `SYSR-PMG002` | تفاصيل أوقات الموظفين | Employee TimeSheet Details | Set against attendance, leave and missions, what does each employee's day actually look like? |

Both read committed **Tasks Executing** documents. Time that is still sitting in a draft, or in a
timesheet whose processing has not finished, is not on them.

## Employee TimeSheet — the Billing and Chasing Report

`SYSR-PMG001` is the everyday one. It lists timesheet lines over a period, one row per stretch of
recorded work, with the customer, the project, the task, the from and to times, the net time in
decimal hours, the line's remark, its code and its state — and a grand total of hours at the end.

It is the report you run before raising a Project Invoice ("what is billable on `PRJ-0042` for
March?") and the report a manager runs on a Monday morning ("whose time is still waiting for me?").

Its criteria are almost all **from/to pairs**, and the rule for all of them is the same: leave a pair
empty and it does not filter at all. The pairs are:

- **From Date / To Date** — the only criteria that come pre-filled, defaulting to the start and end of
  the current month.
- **From Employee / To Employee** — a range over employee codes.
- **From Project / To Project** and **From Task / To Task** — narrow to one job or one work package.
- **From Manager / To Manager**, available both by manager code and by manager name — this is how a
  department head pulls only the projects they are responsible for.

Beyond the ranges there are five switches, and they are what make the report useful rather than
merely long:

| Switch | What it does |
|---|---|
| **Show Details** | Off, the report collapses to totals; on, you get every individual line. |
| **Show Current Employee Only** | Restricts the report to the logged-in user's own time — the "my timesheet" view. |
| **Show Approved** | Include lines a manager has accepted. |
| **Show Rejected** | Include lines a manager has turned down. |
| **Show Pending** | Include lines still waiting for approval. |

The three state switches are independent, so any combination works: approved only, to see what is
billable; pending only, to see what is stuck; all three, to reconcile a month.

One reading note. The report has two columns whose English heading reads *Remarks*. The first is the
line's own remark text; the **rightmost** one is the line's approval state. Read the last column as
the state and the report makes sense immediately.

## Employee TimeSheet Details — Time Against Attendance

`SYSR-PMG002` answers a different and more suspicious question: *does the time an employee booked to
projects agree with the time they were actually at work?*

It takes the same timesheet lines and sets them beside the employee's HR records for the same days —
the attendance calendar, machine attendance lines, leave permissions and mission documents — so a
line booked on a day the employee was on leave, or a day with no attendance at all, stands out. Rows
are colour-coded to make that immediate: **vacation days are shaded green and absences red.**

Its criteria are wider than the first report's because it reaches into HR:

- **From Date / To Date**.
- The full **dimension** ranges (محددات): legal entity, branch, sector, department and analysis set —
  so a shared-services group can report one company or one branch at a time.
- The **employee organisation** ranges: employee department, employee section, employee code and
  employee name.
- **Show Current Employee Only**, as on the first report.

This is a payroll-and-audit report rather than a billing one. Run it at the end of a month, before
timesheet hours are used for anything expensive.

## What Is Not Here, and What to Do Instead

Neither report touches money. There is no shipped report anywhere in the module that puts revenue
next to cost, and no dashboard.

When a site asks for project profitability, the honest routes are the ones described in
[Where Project Cost and Revenue Come From](/modules/ecpa/ecpa-costing-and-profitability):

- **Labour cost per project** is on the Managed Project screen as Total Project Cost.
- **Total cost including expenses** comes from an accounting report filtered by the project, because
  both the timesheet and the expense documents carry the project onto their ledger lines.
- **Revenue against cost** is the Project Stage screen's income and cost grids — assembled by hand,
  and screen-only.

Anything beyond that is a custom report or a BI dashboard built for the site.
