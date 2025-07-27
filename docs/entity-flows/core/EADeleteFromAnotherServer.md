---
title: EADeleteFromAnotherServer
module: core
---


<div class='entity-flows'>

# EADeleteFromAnotherServer

**This document was generated using Claude.ai**

## Overview

This entity flow deletes entities from a remote Nama ERP server by sending delete requests through web services. It's designed for multi-server environments where entities need to be synchronized by removing records from secondary servers when they're deleted from the primary server.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows during delete operations
- **Target:** Any entity that needs to be deleted from a remote Nama ERP server
- **Purpose:** Maintain data synchronization across multiple Nama ERP server instances
- **Timing:** Typically runs after an entity is deleted from the local server

## How It Works

### 1. Document Cancellation Check
- **Cancelled Document Handling:** Checks if the entity is a cancelled document
- **Skip Logic:** Optionally skips deletion for cancelled documents based on parameter setting
- **Document Status Validation:** Verifies document cancellation status before proceeding
- **Smart Processing:** Avoids unnecessary deletion requests for cancelled documents

### 2. Entity Reference Resolution
- **Generic Reference Creation:** Converts entity to generic reference for web service call
- **EntityFlow Handling:** Special handling for EntityFlow entities using pending entry target
- **ID and Code Extraction:** Extracts entity ID and code for remote deletion request
- **Type Resolution:** Determines entity type for proper service endpoint routing

### 3. Remote Service Connection
- **Web Service Client:** Creates web service client for the target server
- **URL Configuration:** Uses provided server URL for service endpoint
- **Service Discovery:** Automatically determines correct service based on entity type
- **Connection Management:** Manages connection to remote Nama ERP server

### 4. Authentication and Authorization
- **Login Credentials:** Uses provided login ID and password for authentication
- **Password Security:** Hashes password before transmission for security
- **Authorization Check:** Verifies user has deletion permissions on remote server
- **Security Context:** Maintains secure connection throughout the operation

### 5. Delete Request Execution
- **Request Construction:** Builds entity operation request with all necessary details
- **Remote Deletion:** Sends delete request to remote server's entity service
- **Log Tracking:** Includes audit log tracking based on current context settings
- **Response Handling:** Processes response from remote server

## Key Features

### Multi-Server Synchronization
- **Data Consistency:** Ensures entities are deleted consistently across multiple servers
- **Distributed Systems:** Supports distributed Nama ERP deployments
- **Centralized Control:** Allows centralized management of multi-server deletions
- **Network Communication:** Handles network-based inter-server communication

### Flexible Document Handling
- **Cancelled Document Options:** Configurable handling of cancelled documents
- **Document Type Awareness:** Special logic for document entities vs. master data
- **Status-Based Processing:** Different behavior based on document status
- **Business Logic Integration:** Respects business rules for document deletion

### Secure Remote Operations
- **Authentication Required:** Requires valid credentials for remote server access
- **Password Protection:** Encrypts passwords during transmission
- **Permission Validation:** Verifies deletion permissions on target server
- **Audit Trail:** Maintains audit logs for security compliance

## Parameters

### Parameter 1: Other Server URL
- **Type:** Text (Required)
- **Format:** Complete URL to remote Nama ERP server including protocol and port
- **Purpose:** Specifies the target server where entity should be deleted
- **Requirements:** Must be accessible and running Nama ERP services

**Examples:**
- `http://localhost:7070/` - Local development server
- `https://erp-backup.company.com/` - Backup server
- `http://192.168.1.100:8080/` - Internal network server
- `https://subsidiary-erp.company.com/` - Subsidiary server

### Parameter 2: Login ID
- **Type:** Text (Required)
- **Format:** Valid user login ID on the remote server
- **Purpose:** Provides authentication credentials for remote server access
- **Requirements:** User must exist and have delete permissions on remote server

### Parameter 3: Password
- **Type:** Text (Required)
- **Format:** Plain text password (will be hashed for transmission)
- **Purpose:** Authentication credential for the specified login ID
- **Security:** Password is hashed before sending to remote server

### Parameter 4: Delete Even Documents
- **Type:** Text (Optional)
- **Format:** "true" or "false" (default: false)
- **Purpose:** Controls whether cancelled documents should also be deleted
- **Behavior:** When false, cancelled documents are skipped; when true, all documents are deleted

## Database Tables Affected

### Local Server
- **No Direct Changes:** This action does not modify local database tables
- **Entity References:** Reads entity data to construct remote deletion request
- **Context Information:** Uses current context for audit log settings

### Remote Server
- **Target Entity Table:** The corresponding entity table on the remote server
  - Entity record will be deleted from remote server
  - Related records may be affected based on server's deletion logic
  - Audit logs created on remote server for deletion tracking

## Business Use Cases

### 1. Multi-Server Data Synchronization
- **Primary-Secondary Setup:** Delete entities from secondary servers when removed from primary
- **Branch Synchronization:** Remove entities from branch servers when deleted from headquarters
- **Backup Maintenance:** Clean up backup servers when entities are deleted from production
- **Distributed Systems:** Maintain consistency across geographically distributed servers

### 2. System Migration and Cleanup
- **Migration Support:** Remove entities from old servers during system migration
- **Decommissioning:** Clean up entities from servers being decommissioned
- **Data Archival:** Remove entities from active servers after archiving
- **Environment Synchronization:** Keep development/test environments synchronized

### 3. Business Process Integration
- **Workflow Synchronization:** Delete entities across servers as part of business workflows
- **Cross-System Integration:** Remove entities from integrated subsidiary systems
- **Compliance Requirements:** Ensure consistent data deletion for regulatory compliance
- **Audit Trail Maintenance:** Maintain synchronized audit trails across servers

## Important Warnings

### ⚠️ Network and Connectivity
- **Network Dependency:** Requires stable network connection to remote server
- **Server Availability:** Remote server must be accessible and operational
- **Service Endpoints:** Remote server must have entity services enabled
- **Firewall Configuration:** Network firewalls must allow connection to remote server

### ⚠️ Authentication and Security
- **Valid Credentials:** Login credentials must be valid on remote server
- **Permission Requirements:** User must have delete permissions for the entity type
- **Password Security:** Use strong passwords and secure transmission
- **Access Control:** Ensure proper access controls are configured on remote server

### ⚠️ Data Integrity and Safety
- **Irreversible Operation:** Deletion on remote server cannot be easily undone
- **Referential Integrity:** May affect related records on remote server
- **Business Logic:** Remote server's business rules will be applied during deletion
- **Data Loss Risk:** Risk of permanent data loss if used incorrectly

### ⚠️ System Integration
- **Version Compatibility:** Ensure remote server version is compatible
- **Service Availability:** Entity services must be properly configured on remote server
- **Error Handling:** Network or service errors may cause incomplete synchronization
- **Transaction Boundaries:** Deletion is not part of local transaction scope

## Best Practices

### Configuration and Setup
- **Test Connections:** Test connectivity and credentials before production use
- **Permission Verification:** Verify user permissions on remote server
- **URL Validation:** Ensure server URLs are correct and accessible
- **Security Review:** Review security implications of cross-server operations

### Operational Procedures
- **Backup Strategy:** Backup remote server data before mass deletions
- **Error Monitoring:** Monitor for network and authentication errors
- **Audit Tracking:** Enable audit logging for deletion tracking
- **Gradual Rollout:** Test with non-critical entities before full deployment

### Security Considerations
- **Credential Management:** Use secure credential storage and rotation
- **Network Security:** Use HTTPS for secure communication
- **Access Monitoring:** Monitor access patterns and unusual activity
- **Permission Auditing:** Regularly audit user permissions on remote servers

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EADeleteFromAnotherServer`


</div>

