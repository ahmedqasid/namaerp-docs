---
title: EADeleteFromAnotherServer
module: core
---


<div class='entity-flows'>

# EADeleteFromAnotherServer

**This document was generated using AI Tools**

## Purpose
This action deletes the current entity from another ERP server instance by connecting to a remote server via web services and executing a delete operation. It's used for synchronizing deletions across multiple server environments.

## When to Use This Action
- **Multi-Server Synchronization**: When entities need to be deleted from multiple ERP instances
- **Environment Mirroring**: Keeping test/staging servers synchronized with production changes
- **Data Replication**: Maintaining data consistency across distributed ERP installations
- **Cross-Server Integration**: When business processes span multiple server instances
- **Backup Server Maintenance**: Keeping backup servers updated with deletion changes

## How It Works
1. **Cancellation Check**: Verifies if document is cancelled and skips deletion if configured to do so
2. **Entity Reference**: Gets the entity reference (type, ID, code) for the deletion request
3. **Service Connection**: Establishes web service connection to the remote server
4. **Authentication**: Authenticates with remote server using provided credentials
5. **Delete Request**: Sends delete request with entity details to remote server
6. **Remote Execution**: Remote server processes the deletion using its business logic

## Parameters Required

### Parameter 1: Other Server URL (Required)
- **What it is**: Complete URL of the target ERP server for deletion
- **Format**: Full HTTP/HTTPS URL with protocol and port
- **Examples**: `http://localhost:7070/`, `https://erp-backup.company.com:8080/`
- **Purpose**: Specifies which server to connect to for the deletion

### Parameter 2: Login ID (Required)  
- **What it is**: Username for authentication on the remote server
- **Format**: Valid user account on the target server
- **Purpose**: Provides authentication credentials for remote server access
- **Security**: Should be a service account with appropriate deletion permissions

### Parameter 3: Password (Required)
- **What it is**: Password for the login ID on the remote server
- **Format**: Plain text password (will be hashed before transmission)
- **Purpose**: Completes authentication credentials for remote server
- **Security**: Password is automatically hashed before sending to remote server

### Parameter 4: Delete Cancelled Documents (Optional)
- **What it is**: Whether to delete entities even if they are cancelled documents
- **Format**: `true` or `false` (empty defaults to `false`)
- **Default**: `false` - cancelled documents are NOT deleted
- **Purpose**: Controls whether cancelled documents should be deleted on remote server

## Document Cancellation Logic

### What Counts as Cancelled
The action considers a document cancelled if:
- **Cancelled Status**: Document has documentFileStatus = Cancelled
- **Cancellation Document**: Document was created as a cancellation of another document
- **Both Conditions**: Either condition triggers the cancellation check

### Cancellation Behavior
- **Parameter 4 = false (default)**: Cancelled documents are skipped - no deletion occurs
- **Parameter 4 = true**: Cancelled documents are deleted normally
- **Non-Documents**: Cancellation check only applies to DocumentFile entities

## Entity Flow Handling

### Special Processing for EntityFlow
If the current entity is an EntityFlow:
- **Pending Entry Check**: Uses the pending entry's target record instead of the EntityFlow itself
- **Target Entity**: Deletes the actual target entity, not the flow record
- **Business Logic**: Ensures the correct entity is deleted on the remote server

## Authentication and Security

### Credential Handling
- **Password Hashing**: Password is automatically hashed using server hash function
- **Secure Transmission**: Credentials are sent securely to remote server
- **Service Account**: Should use dedicated service account, not personal credentials
- **Permission Requirements**: Remote account must have delete permissions for target entities

### Security Considerations
- **Network Security**: Communication occurs over HTTP/HTTPS web services
- **Authentication**: Full authentication required on remote server
- **Authorization**: Remote server enforces its own authorization rules
- **Audit Trail**: Both servers maintain audit logs of deletion activities

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Permanent Deletion**: This action permanently deletes entities on remote server
2. **Network Dependency**: Requires network connectivity to remote server
3. **Authentication Required**: Must have valid credentials on target server
4. **No Rollback**: Cannot undo remote deletions once executed
5. **Business Logic**: Remote server applies its own deletion validation and business rules
6. **Data Integrity**: May affect referential integrity on remote server

## Network and Connectivity

### Connection Requirements
- **Network Access**: Source server must be able to reach target server
- **Port Access**: Target server port must be accessible
- **Firewall Rules**: Firewalls must allow web service communication
- **Service Availability**: Target server must be running and accessible

### URL Format Examples
```
Local Development: http://localhost:7070/
Remote Server: https://erp-server.company.com:8080/
With Context Path: http://server:8080/
IP Address: http://192.168.1.100:7070/
```

## Monitoring and Troubleshooting

### Success Indicators
- **No Errors**: Action completes without network or authentication errors
- **Remote Confirmation**: Remote server successfully processes deletion
- **Audit Logs**: Both servers log the deletion activity
- **Data Consistency**: Entity is deleted from both servers

### Common Issues

**"Connection failed to remote server"**
- Check network connectivity to target server
- Verify server URL is correct and accessible
- Confirm target server is running and responding
- Check firewall settings and port accessibility

**"Authentication failed"**
- Verify login ID exists on remote server
- Check password is correct
- Confirm account has deletion permissions
- Ensure account is not locked or disabled

**"Entity not found on remote server"**
- Entity may not exist on remote server
- Check if entity was already deleted
- Verify entity synchronization between servers
- Confirm entity ID/code matches on both servers

**"Remote deletion failed"**
- Check remote server logs for specific error details
- Verify entity can be deleted (no dependencies)
- Check remote server business rules and validations
- Ensure entity is not locked by other processes

**"Cancelled document not deleted"**
- Check Parameter 4 setting for cancelled document handling
- Verify document cancellation status
- Confirm business requirement for cancelled document deletion
- Review cancellation logic and business rules

## SQL Queries for Monitoring

```sql
-- Check entities that might need remote deletion (verify actual table/column names)
SELECT entityType, id, code, lastUpdateDate
FROM [EntityTable]
WHERE lastUpdateDate > DATEADD(hour, -1, GETDATE())
  AND [deletion_flag] = 1

-- Monitor EntityFlow entries for remote processing
SELECT ef.id, ef.code, ef.pendingEntry_id, ef.targetEntityType
FROM EntityFlow ef
WHERE ef.actionClass LIKE '%EADeleteFromAnotherServer%'
  AND ef.status = 'Pending'

-- Check document cancellation statuses
SELECT d.id, d.code, d.documentFileStatus, d.cancelledBy_id
FROM [DocumentTable] d
WHERE d.documentFileStatus = 'Cancelled'
   OR d.cancelledBy_id IS NOT NULL
ORDER BY d.lastUpdateDate DESC
```

## Best Practices

### Implementation Strategy
- **Service Accounts**: Use dedicated service accounts for inter-server communication
- **Error Handling**: Implement proper error handling for network failures
- **Logging**: Log all remote deletion attempts and results
- **Testing**: Test connectivity and permissions before production use

### Security Best Practices
- **Password Management**: Use secure password storage and rotation
- **Network Security**: Use HTTPS when possible for secure communication
- **Access Control**: Limit service account permissions to minimum required
- **Audit Trails**: Maintain comprehensive audit logs on both servers

### Operational Guidelines
- **Scheduled Operations**: Consider running during maintenance windows
- **Batch Processing**: Group related deletions to minimize network overhead
- **Monitoring**: Monitor success rates and failure patterns
- **Documentation**: Document server relationships and synchronization rules

### Error Recovery
- **Retry Logic**: Implement retry logic for temporary network failures
- **Manual Verification**: Verify critical deletions were successful
- **Rollback Procedures**: Have procedures for handling partial failures
- **Communication**: Establish procedures for coordinating with remote server administrators

## Related Actions
- **EADeleteFromQuery**: For bulk deletion operations using queries
- **Cross-Server Synchronization**: Other actions for multi-server data management
- **Entity Replication**: Actions for copying entities between servers
- **Web Service Integration**: Tools for managing web service communications

---

**Module:** core  
**Full Class Name:** `com.namasoft.commonservices.utils.EADeleteFromAnotherServer`

</div>