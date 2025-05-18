# Email By Parameterized Reports In Task Scheduler

- Create a task schedule
  - Task Type is Action
  - Action name is `com.namasoft.reporting.ParamterizedReporTask`
  - First Parameter should be the query that returns the parameter values
  - Second parameter should be the parameter names
  - You can return entities by two columns: parameterName#type, paramerterName#id
  - You can return subject of email by column named subject
  - You can specify send to by a column named sendto
  
- Example 1:
  First Parameter:
```sql
select case when DATEDIFF(day,GETDATE(),residencyEnd)<1  then N'الاقامة انتهت منذ ' else N'باقي علي انتهاء الاقامة ' end + cast(ABS(DATEDIFF(day,GETDATE(),residencyEnd)) as nvarchar(100)) +N' يوم' as subject, 'Employee' as sendto#type,supervisor_id as sendto#id,'Employee' as empoyee#type,id as employee#id
from Employee where DATEDIFF(day,GETDATE(),residencyEnd) < 30 order by 2
```
 - Second Parameter: subject,sendto#type,sendto#id,employee#type,employee#id
  - This will run the specified report, fill in the parameter named employee and send the email to the direct supervisor
- Example 2:
```sql
select case when DATEDIFF(day,GETDATE(),residencyEnd)<1  then N'الاقامة انتهت منذ ' else N'باقي علي انتهاء الاقامة ' end + cast(ABS(DATEDIFF(day,GETDATE(),residencyEnd)) as nvarchar(100)) +N' يوم' as subject,contactInfoEmail as sendto, 'Employee' as empoyee#type,id as employee#id
from Employee where DATEDIFF(day,GETDATE(),residencyEnd) < 30 order by 2
```

- This will run the specified report, fill in the parameter named employee and send the email to the email address of the employee

## Notification By SQL In Task Scheduler
- Create a task schedule
  - Task Type is Action
  - Action name is `com.namasoft.infra.domainbase.utils.notifications.NotificationByQueryTask`
  - First Parameter should be the query that returns the parameter values
  - The second parameter should be the parameter names
  - Third Parameter: If you want the report to be used as a notification, add “notification" to the third parameter, if you want mail add the word “mail".
    - The following will summerize it:
```
leave the param empty: mail only
mail: mail only
notification: notification only
mail,notification: notification and email
``` 
- You can return entities by two columns: parameterName#type, paramerterName#id
- You can return subject of notification by column named subject
- You can specify send to by a column named sendto
- Example:
  - First Parameter:
```sql 
select case when DATEDIFF(day,GETDATE(),residencyEnd)<1  then N'الاقامة انتهت منذ ' else N'باقي علي انتهاء الاقامة ' end + cast(ABS(DATEDIFF(day,GETDATE(),residencyEnd)) as nvarchar(100)) +N' يوم' as subject, 'Employee' as sendto#type,supervisor_id as sendto#id,'Employee' as empoyee#type,id as employee#id
from Employee where DATEDIFF(day,GETDATE(),residencyEnd) < 30 order by 2
```
- Second Parameter: `subject,sendto#type,sendto#id,employee#type,employee#id`
This will run the specified report, fill in the parameter named employee and send the email to the direct supervisor

Example:
```sql
select case when DATEDIFF(day,GETDATE(),residencyEnd)<1  then N'الاقامة انتهت منذ ' else N'باقي علي انتهاء الاقامة ' end + cast(ABS(DATEDIFF(day,GETDATE(),residencyEnd)) as nvarchar(100)) +N' يوم' as subject,contactInfoEmail as sendto, 'Employee' as empoyee#type,id as employee#id
from Employee where DATEDIFF(day,GETDATE(),residencyEnd) < 30 order by 2
```