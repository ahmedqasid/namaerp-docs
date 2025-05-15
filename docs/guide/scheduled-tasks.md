# Scheduled Tasks

## Task Type1: Parameterized Report Task

### Task Type: Action
### Action Name: com.namasoft.reporting.ParamterizedReporTask

### Parameters

- #### First Parameter: SQL query that returns the parameter values.
- #### Second Parameter: List of parameter names (used by the report).

### Column Naming Conventions

| Purpose             | Column Name Format                                |
| ------------------- | ------------------------------------------------- |
| Entity as parameter | `parameterName#type`                              |
| Entity ID           | `parameterName#id`                                |
| Email subject line  | `subject`                                         |
| Email recipients    | `sendto` (can also be `sendto#type`, `sendto#id`) |

### Example 1
#### Use Case: Send report to supervisor with message about residency end
- ##### First Parameter:

```sql
SELECT 
  CASE 
    WHEN DATEDIFF(day, GETDATE(), residencyEnd) < 1 
      THEN N'الاقامة انتهت منذ ' 
      ELSE N'باقي علي انتهاء الاقامة ' 
  END + CAST(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) AS NVARCHAR(100)) + N' يوم' AS subject,
  'Employee' AS sendto#type,
  supervisor_id AS sendto#id,
  'Employee' AS employee#type,
  id AS employee#id
FROM Employee 
WHERE DATEDIFF(day, GETDATE(), residencyEnd) < 30 
ORDER BY 2

```
- ##### Second Parameter:
```sql
subject,sendto#type,sendto#id,employee#type,employee#id
```
### Example 2
#### Use Case: Email report directly to employee
- ##### First Parameter:

```sql
SELECT 
  CASE 
    WHEN DATEDIFF(day, GETDATE(), residencyEnd) < 1 
      THEN N'الاقامة انتهت منذ ' 
      ELSE N'باقي علي انتهاء الاقامة ' 
  END + CAST(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) AS NVARCHAR(100)) + N' يوم' AS subject,
  contactInfoEmail AS sendto,
  'Employee' AS employee#type,
  id AS employee#id
FROM Employee 
WHERE DATEDIFF(day, GETDATE(), residencyEnd) < 30 
ORDER BY 2

```

## Task Type2: Notification by SQL Task

### Task Type: Action
### Action Name: com.namasoft.infra.domainbase.utils.notifications.NotificationByQueryTask

### Parameters

- #### 1- First Parameter: SQL query to generate dynamic values.
- #### 2- Second Parameter: Parameter names used by the notification/report.
- #### 3- Third Parameter: Output type (choose one or more):

    #####  mail → email only
    
    ##### notification → in-app notification only
    
    #####       mail,notification → both
    
    #####        (empty) → default to mail

### Column Naming Conventions

#### Same as in Report Task.

### Example 1
#### Use Case:  Send notification to supervisor with parameterized report data
- ##### First Parameter:

```sql
SELECT 
  CASE 
    WHEN DATEDIFF(day, GETDATE(), residencyEnd) < 1 
      THEN N'الاقامة انتهت منذ ' 
      ELSE N'باقي علي انتهاء الاقامة ' 
  END + CAST(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) AS NVARCHAR(100)) + N' يوم' AS subject,
  'Employee' AS sendto#type,
  supervisor_id AS sendto#id,
  'Employee' AS employee#type,
  id AS employee#id
FROM Employee 
WHERE DATEDIFF(day, GETDATE(), residencyEnd) < 30 
ORDER BY 2

```

- ##### Second Parameter:

```sql
subject,sendto#type,sendto#id,employee#type,employee#id

```

- #### Third Parameter:

```sql
mail,notification
```

### Example 2
#### Use Case:  Notify employees via email
- ##### First Parameter:

```sql
SELECT 
  CASE 
    WHEN DATEDIFF(day, GETDATE(), residencyEnd) < 1 
      THEN N'الاقامة انتهت منذ ' 
      ELSE N'باقي علي انتهاء الاقامة ' 
  END + CAST(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) AS NVARCHAR(100)) + N' يوم' AS subject,
  contactInfoEmail AS sendto,
  'Employee' AS employee#type,
  id AS employee#id
FROM Employee 
WHERE DATEDIFF(day, GETDATE(), residencyEnd) < 30 
ORDER BY 2

```

## General Utility

### To execute an SQL statement within the task:

```sql
NamaRep.runSQLQuery(sql, pName1, pValue1, pName2, pValue2, ...)

```