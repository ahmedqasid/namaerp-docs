---
title: EACacheEvicter
module: core
---


<div class='entity-flows'>

# EACacheEvicter

**This document was generated using Claude.ai**

## Overview

This entity flow clears Hibernate second-level cache for a specific entity type, ensuring that cached data is refreshed and subsequent queries retrieve the most current information from the database. It's essential for maintaining data consistency when entities are updated outside normal ORM operations.

## When This Action Runs

- **Trigger:** Manual execution after bulk data updates or cache inconsistency issues
- **Target:** Any entity type that uses Hibernate second-level caching
- **Purpose:** Force cache refresh to ensure data consistency
- **Timing:** Should run after bulk updates, imports, or external data modifications

## How It Works

### 1. Session Factory Access
- **Hibernate Integration:** Accesses the Hibernate SessionFactory through Persister
- **Cache Management:** Gets reference to the second-level cache manager
- **Entity Manager:** Uses the JPA EntityManager wrapped as Hibernate Session
- **Framework Integration:** Works within the existing ORM framework

### 2. Entity Type Resolution
- **Type Conversion:** Converts string entity type to actual Java class
- **Class Lookup:** Uses EntityTypeUtil to resolve entity class from type name
- **Validation:** Ensures entity type is valid and recognized by the system
- **Dynamic Resolution:** Supports any registered entity type in the system

### 3. Cache Eviction Process
- **Targeted Eviction:** Evicts cache entries only for the specified entity type
- **Complete Removal:** Removes all cached instances of the entity type
- **Immediate Effect:** Cache eviction takes effect immediately
- **Memory Cleanup:** Frees memory used by cached entity instances

### 4. System Impact
- **Performance Reset:** Next queries for the entity type will hit the database
- **Data Freshness:** Ensures subsequent operations use current database data
- **Memory Recovery:** Releases memory used by potentially stale cached data
- **Consistency Restoration:** Resolves cache-database inconsistencies

## Key Concepts

### Hibernate Second-Level Cache
- **Purpose:** Caches entity data across multiple sessions for performance
- **Scope:** Shared across the entire application instance
- **Benefits:** Reduces database queries for frequently accessed data
- **Risk:** May serve stale data if not properly managed

### Cache Inconsistency Scenarios
- **Bulk Updates:** Direct SQL updates bypass Hibernate cache management
- **External Updates:** Database changes made outside the application
- **Import Operations:** Bulk data imports using direct database access
- **Migration Scripts:** Database schema or data migration operations

### When Cache Eviction is Needed
- **After Bulk Operations:** Following bulk updates, deletes, or imports
- **External System Integration:** When external systems modify shared data
- **Data Correction:** After manual database corrections or fixes
- **Performance Issues:** When cache contains corrupted or invalid data

## Parameters

### Parameter 1: Entity Type
- **Type:** Text (Required)
- **Format:** Valid entity type name registered in the system
- **Purpose:** Specifies which entity type's cache to evict
- **Case Sensitive:** Must match exact entity type name

**Common Examples:**
- `Item` - Product/inventory item master data
- `Customer` - Customer master data
- `Supplier` - Supplier master data
- `Account` - Chart of accounts data
- `Employee` - Employee master data
- `Product` - Product catalog data
- `Branch` - Branch/location master data
- `Department` - Department master data

**Document Entity Examples:**
- `SalesInvoice` - Sales invoice documents
- `PurchaseOrder` - Purchase order documents
- `PaymentVoucher` - Payment voucher documents
- `JournalEntry` - Journal entry documents

## Database Tables Affected

### Cache Impact
- **No Direct Database Changes:** This action does not modify database tables
- **Indirect Effect:** Subsequent queries will access database instead of cache
- **Performance Impact:** Next queries for the entity type will be slower
- **Data Consistency:** Ensures database is the source of truth for subsequent operations

### Memory Impact
- **Cache Memory:** Frees memory used by cached entity instances
- **JVM Heap:** Reduces memory pressure on application heap
- **Garbage Collection:** May trigger garbage collection of evicted objects
- **Resource Recovery:** Returns memory resources to the system

## Business Use Cases

### 1. Data Import and Migration
- **Bulk Import Completion:** Clear cache after importing master data
- **Migration Operations:** Refresh cache after data migration scripts
- **Synchronization:** Update cache after external system synchronization
- **Data Correction:** Refresh cache after manual data corrections

### 2. System Administration
- **Performance Troubleshooting:** Clear cache when investigating performance issues
- **Data Consistency Issues:** Resolve cache-database inconsistencies
- **Memory Management:** Free memory used by large cached datasets
- **Cache Debugging:** Clear cache to verify data freshness issues

### 3. Integration Scenarios
- **External System Updates:** Clear cache when external systems modify shared data
- **Batch Processing:** Refresh cache after batch processing operations
- **Report Generation:** Ensure reports use current data by clearing cache
- **API Data Updates:** Clear cache after API-driven data modifications

## Performance Considerations

### Immediate Impact
- **Memory Release:** Immediate freeing of cache memory
- **Next Query Performance:** Subsequent queries will be slower until cache rebuilds
- **Database Load:** Increased database queries until cache is repopulated
- **Application Response:** Temporary performance impact on entity access

### Cache Rebuilding
- **Automatic Repopulation:** Cache rebuilds naturally as entities are accessed
- **Gradual Performance Recovery:** Performance improves as cache repopulates
- **Query Pattern Dependency:** Cache rebuild speed depends on application usage patterns
- **Memory Usage:** Memory usage gradually increases as cache repopulates

## Important Warnings

### ⚠️ Performance Impact
- **Immediate Slowdown:** Next queries for the entity type will be significantly slower
- **Database Load:** Increased load on database until cache repopulates
- **System Resources:** May cause temporary increase in CPU and I/O usage
- **User Experience:** Users may notice slower response times temporarily

### ⚠️ Timing Considerations
- **Peak Hours:** Avoid running during peak system usage periods
- **Batch Operations:** Best executed during maintenance windows or off-peak hours
- **Concurrent Users:** Consider impact on concurrent users accessing the entity type
- **System Monitoring:** Monitor system performance after cache eviction

### ⚠️ Entity Type Validation
- **Valid Types Only:** Entity type must be a valid, registered entity in the system
- **Case Sensitivity:** Entity type name is case-sensitive and must match exactly
- **Spelling Accuracy:** Incorrect entity type names will cause action failure
- **Type Existence:** Ensure entity type exists before attempting cache eviction

### ⚠️ Memory and Resource Impact
- **Memory Release:** Large cached datasets may cause noticeable memory changes
- **Garbage Collection:** May trigger garbage collection cycles
- **System Stability:** Monitor system stability after large cache evictions
- **Resource Planning:** Plan for temporary increase in database and system load

## Best Practices

### When to Use
- **After Bulk Updates:** Always run after bulk database modifications
- **Import Completion:** Execute after data import or migration operations
- **Data Inconsistency:** Use when cache-database inconsistencies are suspected
- **Maintenance Windows:** Schedule during planned maintenance periods

### Monitoring and Validation
- **Performance Monitoring:** Monitor query performance after cache eviction
- **Data Verification:** Verify data consistency after cache clearing
- **System Load:** Monitor database and application load during cache rebuild
- **User Feedback:** Monitor for user reports of performance issues

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACacheEvicter`


</div>

