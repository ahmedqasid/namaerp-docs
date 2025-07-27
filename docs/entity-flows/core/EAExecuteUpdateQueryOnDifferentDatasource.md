---
title: EAExecuteUpdateQueryOnDifferentDatasource
module: core
---


<div class='entity-flows'>

# EAExecuteUpdateQueryOnDifferentDatasource

**This document was generated using Claude.ai**

## Overview

This entity flow executes custom SQL UPDATE, INSERT, or DELETE statements on external databases using configured data sources. It allows operations on databases other than the main application database, enabling cross-database operations and external system integration with optional cache management.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for cross-database operations
- **Target:** External databases configured as data sources in the application
- **Purpose:** Perform database operations on external systems or secondary databases
- **Timing:** Used for data synchronization, external system updates, or multi-database operations

## How It Works

### 1. Data Source Connection Management
- **Context Switching:** Temporarily switches to specified external data source
- **Connection Isolation:** Isolates external database operations from main database
- **Automatic Restoration:** Restores original data source connection after execution
- **Safe Connection Handling:** Ensures connection state is properly managed

### 2. External Database Query Execution
- **Cross-Database Operations:** Executes SQL on databases other than main application database
- **Parameter Substitution:** Supports field references using {fieldName} syntax from current entity
- **Direct Database Access:** Bypasses ORM layer for direct external database access
- **Transaction Context:** Manages transaction context for external database operations

### 3. Connection Context Management
- **Dynamic Switching:** Switches database connection based on data source parameter
- **State Preservation:** Preserves original connection state during execution
- **Error Recovery:** Restores original connection even if operation fails
- **Resource Management:** Properly manages database connection resources

### 4. Cache Management Integration
- **Optional Cache Eviction:** Can clear application cache after external database operations
- **Cache Consistency:** Maintains cache consistency when external changes affect cached data
- **Cross-System Consistency:** Ensures application cache reflects external database changes
- **Performance Balance:** Optional cache clearing based on operation requirements

## Key Features

### Multi-Database Support
- **External Database Access:** Execute operations on configured external databases
- **Data Source Flexibility:** Support any configured JDBC data source
- **Cross-System Integration:** Integrate with external systems through database operations
- **Isolated Operations:** Keep external operations separate from main database

### Dynamic Data Source Switching
- **Runtime Configuration:** Switch data sources at runtime based on parameters
- **Multiple Database Support:** Support multiple external databases simultaneously
- **Connection Pooling:** Leverage connection pooling for external data sources
- **Configuration-Based:** Use server configuration for data source definitions

### Safe Connection Management
- **Automatic Restoration:** Always restore original connection state
- **Error Isolation:** External database errors don't affect main database connection
- **Resource Cleanup:** Proper cleanup of database resources
- **Thread Safety:** Safe handling of connection state in multi-threaded environment

## Parameters

### Parameter 1: Data Source Name
- **Type:** Text (Required)
- **Format:** Name of configured data source in application context
- **Purpose:** Specifies which external database to connect to
- **Configuration:** Must be defined in context.xml or application configuration

**Data Source Examples:**
- `ExternalDB` - External application database
- `WarehouseDB` - Warehouse management system database
- `HRDB` - Human resources system database
- `AnalyticsDB` - Analytics and reporting database
- `LegacyDB` - Legacy system database

### Parameter 2: Update Query
- **Type:** Text (Required)
- **Format:** Valid SQL UPDATE, INSERT, or DELETE statement
- **Purpose:** Defines the database operation to execute on external database
- **Field References:** Use {fieldName} to reference current entity fields

### Parameter 3: Evict Cache After Execution
- **Type:** Text (Optional)
- **Values:** "true" or "false"
- **Purpose:** Whether to clear application cache after external database operation
- **Default:** false (cache is not cleared)

**When to Use Cache Eviction:**
- Set to "true" when external changes affect data cached in main application
- Use when external database changes impact application business logic
- Required when external operations affect entities loaded in current session
- Important for maintaining data consistency across systems

## Database Tables Affected

### External Database Tables
- **Target External Tables:** Tables in the specified external database
- **Direct Modifications:** Changes are made directly to external database tables
- **External Constraints:** Must respect external database constraints and rules
- **Cross-System Impact:** Changes may affect external systems and applications

### Application Cache Impact
- **Application Cache:** May require cache eviction if external changes affect cached data
- **Entity Cache:** Cached entities may need refresh if external data affects them
- **Cross-System Consistency:** Maintain consistency between application and external data
- **Performance Considerations:** Cache eviction may temporarily impact performance

## Business Use Cases

### 1. System Integration
- **Legacy System Updates:** Update legacy system databases with current application data
- **External System Synchronization:** Synchronize data with external business systems
- **Third-Party Integration:** Update third-party system databases
- **Cross-System Data Flow:** Move data between different business systems

### 2. Data Warehouse Operations
- **ETL Processes:** Extract, transform, and load data into data warehouses
- **Reporting Data Updates:** Update reporting databases with operational data
- **Analytics Data Preparation:** Prepare data for analytics and business intelligence
- **Historical Data Management:** Manage historical data in separate databases

### 3. Multi-Tenant Operations
- **Tenant-Specific Databases:** Update tenant-specific databases in multi-tenant scenarios
- **Client System Updates:** Update client system databases with shared data
- **Branch Database Synchronization:** Synchronize data across branch databases
- **Regional Database Operations:** Update regional databases with central data

### 4. Backup and Archive Operations
- **Backup Database Updates:** Update backup databases with current data
- **Archive System Operations:** Move data to archive systems
- **Compliance Database Updates:** Update compliance databases with required data
- **Audit Trail Creation:** Create audit trails in separate audit databases

## Configuration Requirements

### Data Source Configuration
- **Context.xml Configuration:** Data source must be defined in server context.xml
- **JDBC Driver:** Appropriate JDBC driver must be available
- **Connection Parameters:** Database connection parameters must be configured
- **Security Configuration:** Database credentials and security settings

### Network and Security
- **Network Access:** Application server must have network access to external database
- **Firewall Configuration:** Firewall rules must allow database connections
- **Authentication:** Valid database credentials for external system
- **SSL/TLS:** Secure connection configuration if required

## Important Warnings

### ⚠️ Data Source Configuration
- **Configuration Dependency:** External data source must be properly configured
- **Connection Availability:** External database must be accessible and operational
- **Authentication Requirements:** Valid credentials required for external database access
- **Network Dependencies:** Requires stable network connection to external systems

### ⚠️ Cross-Database Consistency
- **Transaction Boundaries:** External operations are separate from main database transactions
- **Data Consistency:** Changes to external databases may create consistency issues
- **Rollback Limitations:** External operations cannot be rolled back with main transactions
- **Synchronization Challenges:** Data synchronization across databases requires careful management

### ⚠️ Performance and Resource Impact
- **Connection Overhead:** External database connections consume additional resources
- **Network Latency:** External database operations may introduce network latency
- **Connection Pool Impact:** May affect connection pool resources
- **Cache Performance:** Cache eviction may temporarily impact application performance

### ⚠️ Security and Access Control
- **External System Security:** Must ensure appropriate security for external database access
- **Credential Management:** Secure management of external database credentials
- **Access Auditing:** Audit external database access and operations
- **Data Privacy:** Consider data privacy implications of cross-system operations

## Best Practices

### Configuration Management
- **Environment-Specific Configuration:** Use different data sources for different environments
- **Connection Testing:** Test external data source connections during deployment
- **Monitoring Setup:** Monitor external database connections and operations
- **Error Handling:** Implement appropriate error handling for external database failures

### Security Considerations
- **Credential Security:** Use secure credential storage for external databases
- **Access Control:** Implement appropriate access controls for external operations
- **Audit Logging:** Log external database operations for security auditing
- **Network Security:** Use secure connections for external database access

### Performance Optimization
- **Connection Pooling:** Configure appropriate connection pooling for external data sources
- **Query Optimization:** Optimize SQL queries for external database performance
- **Batch Operations:** Use batch operations for bulk external database updates
- **Cache Strategy:** Develop appropriate caching strategy for cross-system data

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQueryOnDifferentDatasource`


</div>

