# Replication Utilities
## Replication Clean Up
```sql
update m set messageSent = 1 from SiteOutMessage m left join ReplicationSite rs on rs.code = m.siteCode where rs.inActive = 1 and m.messageSent = 0

    WHILE exists (select top 1 id from SiteOutMessage where messageSent = 1)
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from SiteOutMessage where messageSent = 1;
Commit transaction x;
END;
go
WHILE exists (select top 1 toDel.id from OutBusMessage toDel left join SiteOutMessage som on som.messageId = toDel.id where som.id is null and toDel.messageSent = 1 and toDel.sequence < (select max(sequence) from OutBusMessage ))
BEGIN
BEGIN TRANSACTION x;
delete top (1000) toDel from OutBusMessage toDel left join SiteOutMessage som on som.messageId = toDel.id where som.id is null and toDel.messageSent = 1 and toDel.sequence < (select max(sequence) from OutBusMessage );
Commit transaction x;
END;
go
WHILE exists (select top 1 id from InBusMessage where status = 'Executed')
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from InBusMessage where status = 'Executed'
Commit transaction x;

END;
go

```

## Take Backup and Restore It in Branch Steps
- PREPARE BACKUP and COPY IT TO BRANCH
- STOP TOMCAT IN BRANCH
- RESTORE BACKUP IN BRANCH
- STOP TOMCAT IN HEAD OFFICE
- Run The Following in Head Office

```sql
update ReplicationStatistics set lastSentMessage = 1, waitingReadCount = 0 , remoteFailuresCount = 0 , localFailuresCount = 0,
lastReceivedMessage = 0 
where siteCode = 'branchcode'
```

- Run The Following In Branch
```sql
delete from SiteOutMessage
delete from OutBusMessage
delete from InBusMessage

update ReplicationStatistics set lastSentMessage = 1, waitingReadCount = 0 , remoteFailuresCount = 0 , localFailuresCount = 0,
lastReceivedMessage = 0 
where siteCode = 'headoffice'
```
- START TOMCAT in HEAD OFFICE and in BRANCH
- RECOMMIT ANY THING IN BRANCH and MAKE SURE THE MESSAGE IS RECEIVED IN HEAD OFFICE
- RECOMMIT ANY THING IN HEAD OFFICE and MAKE SURE THE MESSAGE IS RECEIVED IN BRANCH
