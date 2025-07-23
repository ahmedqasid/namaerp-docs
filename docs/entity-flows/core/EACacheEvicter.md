---
title: EACacheEvicter
module: core
---


<div class='entity-flows'>

# EACacheEvicter

**This document was generated using AI Tools**

## Purpose
This action clears (evicts) cached data for a specific entity type from the system's memory cache. It forces the system to reload fresh data from the database the next time that entity type is accessed.

## When to Use This Action
- **After Data Updates**: When entity data has been updated directly in the database outside of normal application flow
- **Cache Refresh**: When cached data becomes stale or inconsistent with database values
- **Performance Issues**: When cached data is causing incorrect behavior or display issues
- **Bulk Data Changes**: After running mass update queries that bypass the application cache

## How It Works
1. **Cache Access**: Connects to the Hibernate session and cache system
2. **Entity Type Resolution**: Converts the entity type parameter to the actual Java class
3. **Cache Eviction**: Removes all cached instances of that entity type from memory
4. **Cache Refresh**: Next access to entities of this type will reload fresh data from database

## Parameters Required

### Parameter 1: Entity Type (Required)
- **What it is**: The type of entity whose cache should be cleared
- **Format**: Entity type name from system entity definitions
- **Examples**: `InvItem`, `Customer`, `Account`, `Employee`
- **Purpose**: Specifies which entity type's cache to evict

## What is Caching?

### How System Caching Works
- **Memory Storage**: System keeps frequently used data in memory for fast access
- **Database Bypass**: Cached data is served from memory instead of querying database
- **Performance Benefit**: Much faster than database queries, but data can become outdated
- **Automatic Management**: System usually manages cache automatically

### When Cache Problems Occur
- **Direct Database Updates**: Manual SQL updates bypass cache, creating inconsistencies
- **Bulk Import/Export**: Large data operations may not update cache properly
- **System Integration**: External systems updating database directly
- **Development/Testing**: During development when data is frequently modified

## Common Cache Problems

### Symptoms of Stale Cache
- **Old Data Displayed**: Users see outdated information that doesn't match database
- **Inconsistent Behavior**: Same entity shows different data in different screens
- **Search Results**: Entity searches return incorrect or missing results
- **Performance Issues**: Slow responses when cache and database are inconsistent

### Entities That Are Commonly Cached
- **Items/Products**: Item master data, pricing, descriptions
- **Customers**: Customer information, addresses, contact details
- **Accounts**: Chart of accounts, account names and properties
- **Employees**: Employee details, organizational structure
- **Master Data**: Reference data that changes infrequently

## Usage Examples

### Clear Item Cache After Price Update
```
Parameter 1: Item
Use Case: After bulk price updates via SQL
Result: Next item lookup will get fresh prices from database
```

### Clear Customer Cache After Data Import
```
Parameter 1: Customer  
Use Case: After importing new customers or updating existing ones
Result: Customer search and displays will show updated information
```

### Clear Account Cache After Chart Changes
```
Parameter 1: Account
Use Case: After modifying chart of accounts structure
Result: Accounting screens will reflect new account hierarchy
```

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Performance Impact**: Cache eviction will slow down next access to that entity type
2. **System-Wide Effect**: Affects all users and processes accessing that entity type
3. **Memory Cleanup**: Only clears cache, does not affect database data
4. **Temporary Solution**: Does not fix underlying cache synchronization issues
5. **Use Sparingly**: Frequent cache eviction can hurt system performance

## When NOT to Use This Action

### Avoid Using For:
- **Normal Data Entry**: Regular application updates handle cache automatically
- **Performance Tuning**: Cache eviction makes things slower, not faster
- **Regular Maintenance**: Should not be part of routine maintenance procedures
- **User Complaints**: First investigate if issue is actually cache-related

### Better Alternatives:
- **Application Updates**: Use normal entity saving instead of direct SQL
- **System Restart**: For widespread cache issues, consider system restart
- **Cache Configuration**: Review and adjust cache settings if problems persist

## Monitoring and Troubleshooting

### Success Indicators
- **Immediate Effect**: Cache is cleared instantly when action runs
- **Fresh Data**: Next entity access will load from database
- **No Error Messages**: Action completes successfully without exceptions

### Common Issues

**"No visible change after cache eviction"**
- Problem may not be cache-related
- Check if data was actually updated in database
- Verify you're clearing cache for correct entity type

**"System becomes slower after cache eviction"**
- This is expected behavior - cache needs to be rebuilt
- Performance will improve as cache is repopulated
- Consider timing cache eviction during low-usage periods

**"Cache problems return quickly"**
- Underlying synchronization issue not resolved
- May need to review cache configuration
- Consider whether direct database updates are necessary

### Testing Cache Eviction
1. **Note Current Data**: Record what data is currently displayed
2. **Update Database**: Make changes directly in database
3. **Verify Problem**: Confirm application still shows old data
4. **Run Cache Eviction**: Execute this action
5. **Check Results**: Verify application now shows updated data

## SQL Queries for Troubleshooting

```sql
-- Check last update times vs. displayed data
SELECT id, code, name1, lastUpdateDate 
FROM [EntityTable] 
WHERE lastUpdateDate > DATEADD(hour, -1, GETDATE())
ORDER BY lastUpdateDate DESC

-- Compare database values with what users report seeing
SELECT id, code, [problematic_field]
FROM [EntityTable] 
WHERE id = 'specific_entity_id'
```

## Best Practices

### When to Use Cache Eviction
- **After Data Import**: Clear cache after bulk data imports
- **Database Maintenance**: After direct database updates or repairs
- **Integration Updates**: After external system updates database
- **Development Testing**: During development when testing data changes

### Timing Considerations
- **Low Usage Periods**: Run during off-hours when possible
- **Batch Operations**: Group multiple cache evictions together
- **User Communication**: Inform users of potential temporary slowdown
- **Monitor Performance**: Watch system performance after cache eviction

## Related Actions
- **System Cache Management**: For broader cache operations
- **Database Refresh Operations**: For data synchronization issues
- **Performance Monitoring Tools**: For ongoing cache performance tracking

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACacheEvicter`

</div>