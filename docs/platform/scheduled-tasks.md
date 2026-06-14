# Scheduled Tasks (Task Scheduler)

Task Scheduler allows you to automate recurring operations in Nama ERP. Whether you need to send daily reports to managers, run system maintenance queries, or trigger notifications when certain conditions are met, the Task Scheduler handles it all—running in the background while you focus on your business.

## Understanding Task Types

When you create a scheduled task, the first decision you'll make is choosing the **Schedule Type**. This determines what kind of action the task will perform when it runs. Let's walk through each type:

### Report (Email Report)
The most common use case. The system runs a report and emails it to specified recipients. You'll select a report definition, configure the output format (HTML, PDF, Excel), and specify who should receive it.

### Print Report
Similar to the Report type, but instead of emailing, the report is sent directly to a printer. You'll need to specify the printer name that's configured on the server.

### Notification
Sends notifications to users based on query results and templates. You can configure notification templates for:
- In-app notifications
- Email messages
- SMS messages

### System
Executes a native SQL query directly against the database. Use this for maintenance operations, data cleanup, or batch updates. The query runs as-is, so use with caution.

### Action
Runs a Java class that implements `EntityAction`. This is the most flexible option—you specify the fully qualified class name and up to 15 parameters. The system validates parameters before execution and provides descriptions of what each action does.

### Parameterized Report (Email)
A powerful variation of Report type. Instead of running the report once, it executes a SQL query first to get parameter values, then runs the report multiple times—once for each row returned. Each execution can go to different recipients.

### Parameterized Report (Print)
Same as above, but sends each report iteration to a printer instead of email.

### Recurring Document
Automates the creation of recurring documents. You link the task to a Recurring Document definition, and it generates new documents based on the schedule.

### Read Magento Orders / Read Magento Returns
For e-commerce integration—pulls orders or returns from a configured Magento site.

### Purge Expired Reward Points
A specialized task for loyalty programs that removes expired reward points from the system.

### Read E-Invoice Notifications
For e-invoicing integrations—reads notifications from an intermediary e-invoicing server.

## Scheduling Options

The scheduler offers two approaches: a user-friendly checkbox interface or advanced cron expressions.

### Simple Scheduling (Checkbox Mode)

When **Using Cron** is unchecked, you get an intuitive scheduling interface:

**Run Every X Minutes/Hours/Days/Months**
The simplest approach. Set **Run On** to a number (like 5) and **Run On Type** to "Minute" to run every 5 minutes. Examples:
- Run On: 10, Run On Type: Minute → Runs every 10 minutes
- Run On: 2, Run On Type: Hour → Runs every 2 hours
- Run On: 1, Run On Type: Day → Runs daily

**Weekly Schedule**
Check **Weekly** and then select which days of the week to run. You can select any combination of Saturday through Friday.

**Monthly Schedule**
Check **Monthly** and select:
- Which months to run (January through December)
- Which days of the month to run (1st through 31st)

**Time of Day**
For weekly and monthly schedules, you specify exactly when during the day to run. Select any 30-minute time slots from 00:00 to 23:30.

### Advanced Scheduling (Cron Mode)

When **Using Cron** is checked, you enter a cron expression directly using these five fields:

| Field | Allowed Values |
|-------|---------------|
| Minute | 0-59, or `*` for every minute, or `*/5` for every 5 minutes |
| Hour | 0-23, or `*` for every hour |
| Day of Month | 1-31, or `*` for every day |
| Month | 1-12, or `*` for every month |
| Day of Week | 0-6 (Sunday=0) or SUN,MON,TUE,WED,THU,FRI,SAT |

**Cron Examples:**
- `0 8 * * *` → Every day at 8:00 AM
- `*/30 * * * *` → Every 30 minutes
- `0 0 1 * *` → First day of every month at midnight
- `0 9 * * 1-5` → Every weekday at 9:00 AM

## Targeting Recipients

You have several options for specifying who receives reports and notifications:

### Direct Email Addresses
Enter email addresses directly in **Target Emails** field, separated by commas or on separate lines.

### Target Reference
Select from:
- **Employee** → specific employee
- **Organization Position** → all employees in that position
- **Master Group** → all members of the group
- **Special Responsible** → based on special responsibility assignments

### Target Criteria
Define dynamic criteria to calculate recipients. This is useful when the recipient depends on the data being processed.

### Target Lines
Add multiple target references in a grid for complex recipient lists.

## Email by Parameterized Reports

This powerful feature lets you run a single report with different parameters for different recipients.

**How it works:**
1. Set Schedule Type to **Action**
2. Set Action name to `com.namasoft.reporting.ParamterizedReporTask`
3. First Parameter: SQL query that returns parameter values
4. Second Parameter: comma-separated list of column names

**Query Result Column Conventions:**
- `subject` → email subject line
- `sendto` → email address to send to (plain email)
- `sendto#type` and `sendto#id` → entity reference for recipient
- `parameterName#type` and `parameterName#id` → entity reference for report parameter

**Example: Employee Residency Expiration Alerts**

This sends personalized emails to supervisors about employees whose residency permits are expiring:

**First Parameter (SQL Query):**
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  'Employee' as sendto#type,
  supervisor_id as sendto#id,
  'Employee' as employee#type,
  id as employee#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

**Second Parameter:**
```
subject,sendto#type,sendto#id,employee#type,employee#id
```

This runs the specified report for each employee expiring within 30 days, filling in the `employee` parameter, and emailing the result to their supervisor.

**Alternative: Send to Employee's Own Email**

Replace the sendto columns with the employee's contact email:
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  contactInfoEmail as sendto,
  'Employee' as employee#type,
  id as employee#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

## Notification by SQL Query

Send notifications (in-app, email, or SMS) based on SQL query results.

**Setup:**
1. Set Schedule Type to **Action**
2. Set Action name to `com.namasoft.infra.domainbase.utils.notifications.NotificationByQueryTask`
3. First Parameter: SQL query returning notification data
4. Second Parameter: comma-separated column names
5. Third Parameter: notification type (optional)

**Third Parameter Options:**
| Value | Behavior |
|-------|----------|
| (empty) | Email only |
| `mail` | Email only |
| `notification` | In-app notification only |
| `mail,notification` | Both email and notification |

**Query Column Conventions:**
- `subject` → notification/email subject
- `sendto` → direct email address
- `sendto#type` and `sendto#id` → entity reference for recipient
- `parameterName#type` and `parameterName#id` → entity parameters

**Example:**
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  'Employee' as sendto#type,
  supervisor_id as sendto#id,
  'Employee' as employee#type,
  id as employee#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

## Notification Templates

When using the Notification schedule type, you can configure templates for three channels:

**Email Template**: HTML content for email body. Use placeholders like `{columnName}` to insert query result values.

**Notification Template**: Content for in-app notifications.

**SMS Template**: Short text content for SMS messages.

Each template supports the complex renderer syntax with placeholders that get filled from query results.

## Email Customization

### Subject and Attachment Name Templates
You can customize email subjects and attachment filenames using templates with placeholders:

- **Email Subject Template**: Template with placeholders filled from the report or query
- **Email Subject Query**: SQL query to provide values for subject template
- **Attachment Name Template**: Template for the attached file name
- **Attachment Name Query**: SQL query to provide values for attachment name

### Output Format
Choose the format for email attachments:
- HTML
- PDF
- Excel
- Word
- CSV

### Preferred Email Sender
Select a specific configured email sender to use for outgoing emails from this task.

## Error Handling

### Error Notification
Configure **When Errors Notification** to send alerts when a task fails. This notification definition must be:
- Set to "Use Manually"
- Configured for Task Schedule

If no error notification is configured, the system automatically notifies the admin user with error details.

### Error Information
When a task fails, the system captures:
- **Error Message**: Brief description of what went wrong
- **Error Description**: Full stack trace for technical debugging

## Advanced Options

### Allow Simultaneous Runs
By default, if a task is still running when its next scheduled execution time arrives, the new execution is skipped. Enable **Allow Simultaneous Runs** to let multiple instances run in parallel.

### Run in Sites (Replication)
For multi-site deployments with replication enabled, you can specify which sites should run this task. Leave empty to run on all sites, or select specific sites.

### Inactive
Check **Inactive** to temporarily disable a task without deleting it. The task remains in the system but won't execute.

### Development Mode
By default, scheduled tasks don't run when the server is in debug mode. To enable task execution during development, add to `nama.properties`:
```properties
run-task-schedules-in-debug-mode=true
```

### Initial Delay
Tasks don't start immediately when the server starts—there's a 5-minute default delay. Customize this in `nama.properties`:
```properties
tasks-initial-delay-minutes=10
```

## Implementation Repository Integration

Tasks can be saved to the Implementation Repository for deployment across environments:
- **Save to Implementation Repository**: Enable to include this task in exports
- **System Report**: Mark as a system-provided task

## Parameters Collection

For Parameterized Report tasks, you can define parameters using the **Params** collection instead of a SQL query. Each parameter line specifies:
- **Send To**: Recipient for this parameter set
- **P1 through P15**: Parameter values (can reference entities or use static values)

::: warning
You cannot use both a Query and the Params collection on the same task. Choose one approach.
:::

## Practical Example Scenarios

### Daily Sales Summary to Management
- Type: Report
- Report: Daily Sales Summary
- Output Format: PDF
- Weekly: All weekdays selected
- Time: 08:00
- Target Emails: management@company.com

### Monthly Invoice Reminders
- Type: Parameterized Report
- Query: Select unpaid invoices older than 30 days
- Report: Invoice Reminder Letter
- Monthly: All months, Day 1
- Send to: Each customer's contact email

### Nightly Database Maintenance
- Type: System
- Query: `EXEC sp_updatestats`
- Daily at 02:00
- No recipients needed

### Real-time Order Sync
- Type: Read Magento Orders
- Run Every: 5 Minutes
- Magento Site: configured site reference
