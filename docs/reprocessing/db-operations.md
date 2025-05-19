# Database Related Operations
## Enable READ_COMMITED_SNAPSHOT
```sql
USE master
ALTER DATABASE DBNAME
SET READ_COMMITTED_SNAPSHOT ON;
 
ALTER DATABASE DBNAME
SET ALLOW_SNAPSHOT_ISOLATION ON;
 
ALTER DATABASE DBNAME
SET MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT ON;
```

## Find Current Isolation Level
```sql
SELECT CASE  
          WHEN transaction_isolation_level = 1 
             THEN 'READ UNCOMMITTED' 
          WHEN transaction_isolation_level = 2 
               AND is_read_committed_snapshot_on = 1 
             THEN 'READ COMMITTED SNAPSHOT' 
          WHEN transaction_isolation_level = 2 
               AND is_read_committed_snapshot_on = 0 THEN 'READ COMMITTED' 
          WHEN transaction_isolation_level = 3 
             THEN 'REPEATABLE READ' 
          WHEN transaction_isolation_level = 4 
             THEN 'SERIALIZABLE' 
          WHEN transaction_isolation_level = 5 
             THEN 'SNAPSHOT' 
          ELSE NULL
       END AS TRANSACTION_ISOLATION_LEVEL 
FROM   sys.dm_exec_sessions AS s
       CROSS JOIN sys.databases AS d
WHERE  session_id = @@SPID
  AND  d.database_id = DB_ID();

```

## Monitor or Find Currently Running Queries
```sql
SELECT DatabaseName = db_name(req.database_id),sqltext.TEXT,
req.session_id,
req.status,
req.command,
req.cpu_time,
req.total_elapsed_time,
req.percent_complete
FROM sys.dm_exec_requests req
CROSS APPLY sys.dm_exec_sql_text(sql_handle) AS sqltext
Order by total_elapsed_time desc

```
## Find Table Sizes
```sql
SELECT t.NAME AS TableName, s.Name AS SchemaName, p.rows AS RowCounts, SUM(a.total_pages) * 8 AS TotalSpaceKB, 
       SUM(a.used_pages) * 8 AS UsedSpaceKB, (SUM(a.total_pages) - SUM(a.used_pages)) * 8 AS UnusedSpaceKB,
       cast(SUM(a.total_pages) * 8.0/1024/1024 as DECIMAL(20,3)) AS TotalSpaceGB 
FROM sys.tables t INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id 
    INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id 
    INNER JOIN sys.allocation_units a ON p.partition_id = a.container_id
    LEFT OUTER JOIN sys.schemas s ON t.schema_id = s.schema_id 
WHERE t.NAME NOT LIKE 'dt%' AND t.is_ms_shipped = 0 AND i.OBJECT_ID > 255 
GROUP BY t.Name, s.Name, p.Rows 
ORDER BY TotalSpaceKB desc
```
## View Users and creation dates
```sql
SELECT name, createdate FROM master..syslogins

```

## Externalize all attachments to c:\temp
```sql
sp_configure 'show advanced options', 1;  
GO  
RECONFIGURE;  
GO  
sp_configure 'Ole Automation Procedures', 1;  
GO  
RECONFIGURE;  
GO


declare @lastid as varbinary(16)
declare @minid as varbinary(16)
declare @data as varbinary(max)
declare @filename as nvarchar(500)
select @minid = min(id) from LargeData

while (1=1)
begin
	select @lastid = max(id) from LargeData where @lastid is null or id<@lastid
	select @filename=fileName,@data=data from LargeData where id = @lastid
	declare @init int
	declare @file varbinary(max) = CONVERT(varbinary(max), (select top 1 data from LargeData where filename = '59696_426831487403451_1487925844_n.jpg'))
	declare @filepath nvarchar(4000) = N'c:\temp\'+convert(nvarchar(50),@lastid,2)+'-'+@filename
	

	EXEC sp_OACreate 'ADODB.Stream', @init OUTPUT; -- An instace created
	EXEC sp_OASetProperty @init, 'Type', 1; 
	EXEC sp_OAMethod @init, 'Open'; -- Calling a method
	EXEC sp_OAMethod @init, 'Write', NULL, @file; -- Calling a method
	EXEC sp_OAMethod @init, 'SaveToFile', NULL, @filepath, 2; -- Calling a method
	EXEC sp_OAMethod @init, 'Close'; -- Calling a method
	EXEC sp_OADestroy @init; -- Closed the resources
	if(@minid = @lastid)
		break

end
go

sp_configure 'show advanced options', 1;  
GO  
RECONFIGURE;  
GO  
sp_configure 'Ole Automation Procedures', 0;  
GO  
RECONFIGURE;  
GO


```

## DROP ALL FOREIGN KEYS
```sql
while(exists(select 1 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where CONSTRAINT_TYPE='FOREIGN KEY'))
begin
	declare @sql nvarchar(2000)
	SELECT TOP 1 @sql=('ALTER TABLE ' + TABLE_SCHEMA + '.[' + TABLE_NAME
	+ '] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
	FROM information_schema.table_constraints
	WHERE CONSTRAINT_TYPE = 'FOREIGN KEY'
	exec (@sql)
end

```

## Repair Database (suspect database)

```sql
USE master;
GO
ALTER DATABASE dbName
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO
DBCC CHECKDB (dbName, Repair_ALL)
GO
ALTER DATABASE dbName
SET MULTI_USER;
GO
```

## Allow Deleting Users

```sql
while(exists(select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('group_id','FirstAuthor_id','editedBy_id','revisedBy_id','UpdateCapability_id','ViewCapability_id','UsageCapability_id','book_id','term_id','fiscalYear_id','fiscalPeriod_id','sector_id','branch_id','department_id','analysisSet_id','legalentity_id')))
begin
 declare @sql nvarchar(2000)
 SELECT TOP 1 @sql=('ALTER TABLE ' + t.TABLE_SCHEMA + '.[' + t.TABLE_NAME
           + '] DROP CONSTRAINT [' + t.CONSTRAINT_NAME + ']')
 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
 where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('group_id','FirstAuthor_id','editedBy_id','revisedBy_id','UpdateCapability_id','ViewCapability_id','UsageCapability_id','book_id','term_id','fiscalYear_id','fiscalPeriod_id','sector_id','branch_id','department_id','analysisSet_id','legalentity_id')
 exec (@sql)
end

```

## Allow Deleting Attachments
```sql
while(exists(select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('attachment_id','attachment1_id','attachment2_id','attachment3_id','attachment4_id','attachment5_id')))
begin
 declare @sql nvarchar(2000)
 SELECT TOP 1 @sql=('ALTER TABLE ' + t.TABLE_SCHEMA + '.[' + t.TABLE_NAME
           + '] DROP CONSTRAINT [' + t.CONSTRAINT_NAME + ']')
 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
 where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('attachment_id','attachment1_id','attachment2_id','attachment3_id','attachment4_id','attachment5_id')
 exec (@sql)
end

```

## Allow Deleting Dimensions, and Fiscal Years
```sql
delete from BusinessRequestStatus where requestType = 'Delete' and transStatus = 'Processed'
go
delete from LedgerTransReq where requestType = 'Delete' and transStatus = 'Processed'
go
delete from InvTransReq where requestType = 'Delete' and transStatus = 'Processed'
```

## Allow Deleting Approval Cases
```sql
while(exists(select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('currentApprovalCase_id')))
begin
 declare @sql nvarchar(2000)
 SELECT TOP 1 @sql=('ALTER TABLE ' + t.TABLE_SCHEMA + '.[' + t.TABLE_NAME
           + '] DROP CONSTRAINT [' + t.CONSTRAINT_NAME + ']')
 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
 where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('currentApprovalCase_id')
 exec (@sql)
end

```

## Allow Deleting Employees
```sql
while(exists(SELECT  
    fk.name, OBJECT_NAME(fk.parent_object_id) 'ParentTable', c1.name 'ParentColumn', OBJECT_NAME(fk.referenced_object_id) 'ReferencedTable', c2.name 'ReferencedColumn'
FROM 
    sys.foreign_keys fk
INNER JOIN 
    sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
INNER JOIN
    sys.columns c1 ON fkc.parent_column_id = c1.column_id AND fkc.parent_object_id = c1.object_id
INNER JOIN
    sys.columns c2 ON fkc.referenced_column_id = c2.column_id AND fkc.referenced_object_id = c2.object_id
where OBJECT_NAME(fk.referenced_object_id) = 'Employee'))
begin
 declare @sql nvarchar(2000)
 SELECT  TOP 1 @sql=('ALTER TABLE ' +  '[' + OBJECT_NAME(fk.parent_object_id)
           + '] DROP CONSTRAINT [' +  fk.name + ']')
FROM 
    sys.foreign_keys fk
INNER JOIN 
    sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
INNER JOIN
    sys.columns c1 ON fkc.parent_column_id = c1.column_id AND fkc.parent_object_id = c1.object_id
INNER JOIN
    sys.columns c2 ON fkc.referenced_column_id = c2.column_id AND fkc.referenced_object_id = c2.object_id
where OBJECT_NAME(fk.referenced_object_id) = 'Employee'

 exec (@sql)
end

```

## Allow Deleting Accounts
```sql
while(exists(select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('mainAccount_id','account1_id','account2_id','account3_id','account4_id','account5_id','account6_id','account7_id','account8_id','account9_id','account10_id','account11_id','account12_id','account13_id','account14_id','account15_id','account16_id','account17_id','account18_id','account19_id','account20_id','account_id')))
begin
 declare @sql nvarchar(2000)
 SELECT TOP 1 @sql=('ALTER TABLE ' + t.TABLE_SCHEMA + '.[' + t.TABLE_NAME
           + '] DROP CONSTRAINT [' + t.CONSTRAINT_NAME + ']')
 from INFORMATION_SCHEMA.TABLE_CONSTRAINTS t left join INFORMATION_SCHEMA.KEY_COLUMN_USAGE k on k.CONSTRAINT_NAME = t.CONSTRAINT_NAME
 where CONSTRAINT_TYPE='FOREIGN KEY' and COLUMN_NAME in ('mainAccount_id','account1_id','account2_id','account3_id','account4_id','account5_id','account6_id','account7_id','account8_id','account9_id','account10_id','account11_id','account12_id','account13_id','account14_id','account15_id','account16_id','account17_id','account18_id','account19_id','account20_id','account_id')
 exec (@sql)
end

```

## Cleanup few tables
```sql
--You must specify the following parameters to perform versions and history cleanups
--BusinessRequests Cleanup will always happen
declare @clean_recycle_bin as bit = 0
declare @delete_action_history_before as date = null
declare @delete_versions_before as date = null
declare @delete_notificatios_before as date = null
declare @delete_pending_tasks_before as date = null

while exists (select top 1 e.id  from EntityVersion e left join EntitySystemEntry ese on ese.targetId = e.ownerId 
where @clean_recycle_bin = 1 and ese.id is null
)
begin
BEGIN TRANSACTION x
delete top(1000) e from EntityVersion e left join EntitySystemEntry ese on ese.targetId = e.ownerId
where @clean_recycle_bin = 1 and ese.id is null
Commit transaction x
end

while exists (select top 1 id from ActionsHistory e where actionDate < @delete_action_history_before)
begin
 BEGIN TRANSACTION x
 delete top(1000) e from ActionsHistory e where actionDate < @delete_action_history_before
 Commit transaction x
end

while exists (select top 1 id from EntityVersion e where date < @delete_versions_before)
begin
 BEGIN TRANSACTION x
 delete top(1000) e from EntityVersion e  where date < @delete_versions_before
 Commit transaction x
end
while exists (select top 1 id from UserNotification e where submittedOn < @delete_notificatios_before)
begin
 BEGIN TRANSACTION x
 delete top(1000) e from UserNotification e where submittedOn < @delete_notificatios_before
 Commit transaction x
end



while exists (select top 1 id from InvTransReq e where requestType = 'Delete' and transStatus = 'Processed')
begin
 BEGIN TRANSACTION x
 delete top(1000) e from InvTransReq e where requestType = 'Delete' and transStatus = 'Processed'
 Commit transaction x
end

while exists (select top 1 id from LedgerTransReq e where requestType = 'Delete' and transStatus = 'Processed')
begin
 BEGIN TRANSACTION x
 delete top(1000) e from LedgerTransReq e where requestType = 'Delete' and transStatus = 'Processed'
 Commit transaction x
end

while exists (select top 1 id from BusinessRequestStatus e where requestType = 'Delete' and transStatus = 'Processed')
begin
 BEGIN TRANSACTION x
 delete top(1000) e from BusinessRequestStatus e where requestType = 'Delete' and transStatus = 'Processed'
 Commit transaction x
End

while exists (select top 1 id from PendingTask e where submitionDate < @delete_pending_tasks_before)
begin
 BEGIN TRANSACTION x
 delete top(1000) e from PendingTask e where submitionDate < @delete_pending_tasks_before
 Commit transaction x
end


```

## Delete entity version of deleted records
```sql
while exists (select top 1 e.id  from EntityVersion e left join EntitySystemEntry ese on ese.targetId = e.ownerId where
ese.id is null
)
begin
BEGIN TRANSACTION x
delete top(1000) e from EntityVersion e left join EntitySystemEntry ese on ese.targetId = e.ownerId where
ese.id is null
Commit transaction x
end

```

## Keep Only last five versions

```sql
declare @keepCount as int = 5 --change this number if you want more or less than 5 versions
while exists (select top 1 e.id  from EntityVersion e where
e.versionNumber < (select max(sube.versionNumber) from EntityVersion sube where sube.ownerId = e.ownerId)-@keepCount
)
begin
BEGIN TRANSACTION x
delete top(1000) e from EntityVersion e  where
e.versionNumber < (select max(sube.versionNumber) from EntityVersion sube where sube.ownerId = e.ownerId)-@keepCount
Commit transaction x
end


```

::: danger
## Shrink database for backup upload (VERY DANGEROUS, TAKE CARE, YOU MUST BACKUP THE DATABASE FIRST)
:::
::: details Click to view the SQL Statement
```sql
use q
//PLEAE BACKUP THE DATABASE AND RESTORE IT TO A DIFFERENT ONE AND APPLY THIS ON IT
truncate table q.dbo.EntityVersion
//NEVER DO IT ON THE ACTUAL DATABASE
truncate table q.dbo.ActionsHistory
//THIS IS DANGERIOUS
update q.dbo.LargeData set data = null,pdfCopy = null,thumbnailCopy=null where RIGHT(fileName,5) not in ('.jrxml')
//PLEASE THIS IS DANGERIOUS
truncate table q.dbo.namalayout
DBCC SHRINKDATABASE(q,0)
//REMEBEMR THIS IS DANGERIOUS
SELECT
   t.NAME AS TableName,
   s.Name AS SchemaName,
   p.rows AS RowCounts,
   SUM(a.total_pages) * 8 AS TotalSpaceKB,
   SUM(a.used_pages) * 8 AS UsedSpaceKB,
   (SUM(a.total_pages) - SUM(a.used_pages)) * 8 AS UnusedSpaceKB
FROM
   sys.tables t
INNER JOIN     
   sys.indexes i ON t.OBJECT_ID = i.object_id
INNER JOIN
   sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
INNER JOIN
   sys.allocation_units a ON p.partition_id = a.container_id
LEFT OUTER JOIN
   sys.schemas s ON t.schema_id = s.schema_id
WHERE
   t.NAME NOT LIKE 'dt%'
   AND t.is_ms_shipped = 0
   AND i.OBJECT_ID > 255
GROUP BY
   t.Name, s.Name, p.Rows
ORDER BY
   TotalSpaceKB desc
```
:::

## Backup Database Task
::: tip
You can find a better solution in the [installation video](https://youtu.be/EVaF2BtVPUU?t=2382):
<iframe width="560" height="315" src="https://www.youtube.com/embed/EVaF2BtVPUU?si=NA_qiuje-bvh_joJ&amp;start=2385" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::
```sql
use DBNAME
DECLARE @SQLStatement VARCHAR(2000) 
BACKUP LOG [DBNAME]
TO DISK = 'nul:' WITH STATS = 1
DBCC SHRINKFILE(DBNAME_log, 1)
BACKUP LOG [DBNAME]
TO DISK = 'nul:' WITH STATS = 1
DBCC SHRINKFILE(DBNAME_log, 1)
BACKUP LOG [DBNAME]
TO DISK = 'nul:' WITH STATS = 1
DBCC SHRINKFILE(DBNAME_log, 1)
BACKUP LOG [DBNAME]
TO DISK = 'nul:' WITH STATS = 1
DBCC SHRINKFILE(DBNAME_log, 1)

SET @SQLStatement = 'D:\dialyBackups\DBNAME' + CONVERT(nvarchar(30), GETDATE(), 112) +'.bak' 
BACKUP DATABASE DBNAME TO  DISK = @SQLStatement with compression


```

## Delete Zombie Aliases
- Find Zombie Aliases Query
```sql
select a.* from Alias a left join EntitySystemEntry e on e.targetid = a.ownerId
where e.id is null
```

- Delete Zombie Aliases Query
```sql
delete a from Alias a left join EntitySystemEntry e on e.targetid = a.ownerId
where e.id is null
```