---
title: EAGuessEntityFromNames
module: core
---


<div class='entity-flows'>

# EAGuessEntityFromNames

**This document was generated using Claude.ai**

## Overview

This entity flow intelligently guesses and assigns entity references based on name similarity matching. It uses advanced string distance algorithms to find the best matching entities when exact matches are not available, making it invaluable for data import, migration, and automated entity linking scenarios.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for intelligent entity matching
- **Target:** Entities with reference or generic reference fields requiring automatic population
- **Purpose:** Automatically populate entity references using intelligent name matching algorithms
- **Timing:** Used during data import, migration, or when automatic entity linking is needed

## How It Works

### 1. Field Type Validation and Setup
- **Reference Field Check:** Validates that target field is a reference or generic reference field
- **Entity Type Resolution:** Determines target entity type from field metadata or parameters
- **Parameter Processing:** Processes matching parameters and thresholds
- **Field Mapping Setup:** Sets up source and target field mappings

### 2. Intelligent Matching Algorithm
- **Exact Match Priority:** First attempts exact matches on codes and names
- **String Distance Calculation:** Uses advanced string distance algorithms for fuzzy matching
- **Multi-Field Comparison:** Compares against entity codes, alternative codes, and multiple name fields
- **Weight-Based Scoring:** Assigns scores to potential matches based on similarity

### 3. Performance Optimization
- **Entity Caching:** Caches entity lists for performance optimization
- **Result Caching:** Caches matching results to avoid repeated calculations
- **Cache Invalidation:** Automatically invalidates cache when entities are modified
- **Thread Safety:** Uses synchronization for thread-safe operations

### 4. Advanced Matching Features
- **Previous Results Integration:** Can use previous matching results to improve accuracy
- **Extra Field Comparison:** Supports additional field comparisons for better matching
- **First Letter Matching:** Requires matching of initial letters for improved accuracy
- **Configurable Thresholds:** Allows fine-tuning of matching sensitivity

## Key Features

### Intelligent Fuzzy Matching
- **String Distance Algorithms:** Advanced string distance calculation for similarity matching
- **Multi-Field Matching:** Matches against codes, alternative codes, and name fields
- **Configurable Sensitivity:** Adjustable matching thresholds and parameters
- **Arabic Text Support:** Normalized Arabic text processing for accurate matching

### Performance and Caching
- **Entity List Caching:** Caches entity lists for improved performance
- **Result Caching:** Caches matching results to avoid repeated calculations
- **Automatic Cache Management:** Event-driven cache invalidation when data changes
- **Memory Efficient:** Uses weak references to prevent memory leaks

### Flexible Configuration
- **Adjustable Thresholds:** Configurable weight thresholds and minimum substring lengths
- **Extra Field Matching:** Support for additional field comparisons
- **Previous Result Integration:** Can leverage historical matching data
- **Conditional Processing:** Optional processing based on field emptiness

## Parameters

### Parameter 1: Guess Into Field (Target) (Required)
- **Type:** Field Name
- **Purpose:** Target reference field to populate with matched entity
- **Format:** Field name (must be reference or generic reference field)
- **Examples:** `item`, `customer`, `supplier.ref1`, `details.item`

### Parameter 2: Guess From Field (Source) (Required)
- **Type:** Field Name
- **Purpose:** Source field containing text to match against entities
- **Format:** Field name containing text data
- **Examples:** `description`, `itemName`, `supplierName`, `details.description`

### Parameter 3: Target Entity Type (Conditional)
- **Type:** Entity Type
- **Purpose:** Target entity type for generic reference fields
- **Required:** Only if target field is generic reference
- **Examples:** `InvItem`, `Customer`, `Supplier`, `Employee`

### Parameter 4: Always Guess (Optional)
- **Type:** Boolean
- **Values:** "true" or "false"
- **Purpose:** Whether to guess even if target field is not empty
- **Default:** false (only guess for empty fields)

### Parameter 5: Max Applicable Weight (Optional)
- **Type:** Integer
- **Purpose:** Maximum weight threshold for accepting matches
- **Default:** 50
- **Range:** Lower values = stricter matching, higher values = more lenient

### Parameter 6: Minimum Substring Length (Optional)
- **Type:** Integer
- **Purpose:** Minimum substring length for string distance calculations
- **Default:** 4
- **Usage:** Affects sensitivity of fuzzy matching algorithms

### Parameter 7: Previous Result Cache Statement (Optional)
- **Type:** SQL Query
- **Purpose:** SQL statement to retrieve previous matching results for improved accuracy
- **Format:** SQL SELECT statement returning text and entity ID pairs
- **Example:** `SELECT DISTINCT l.text2, l.item_id FROM PurchaseQuotationLine l WHERE l.text2 <> '' AND l.item_id IS NOT NULL`

### Parameter 8: Extra Comparison Fields (Optional)
- **Type:** Field Mapping
- **Purpose:** Additional fields to compare for more accurate matching
- **Format:** `targetField=sourceField` pairs separated by newlines or commas
- **Example:** `defaultDetailData.minPrice=details.n2`

### Parameter 9: Min Matched First Letters (Optional)
- **Type:** Integer
- **Purpose:** Minimum number of first letters that must match
- **Default:** 4
- **Usage:** Requires initial letter matching for improved accuracy

## Database Tables Affected

### Target Entity Fields
- **Reference Population:** Populates target reference fields with matched entities
- **Field Updates:** Updates entity reference fields based on matching results
- **Relationship Creation:** Creates entity relationships through reference assignment
- **Data Linking:** Links entities based on name similarity

### Entity Data Access
- **Entity Reading:** Reads entity codes, names, and additional fields for matching
- **Master Data Access:** Accesses master entity data for comparison
- **Reference Data:** Reads reference data for entity relationship resolution
- **Cache Data:** Maintains cache data for performance optimization

### No Direct Modifications
- **Read-Only Access:** Only reads entity data for matching, doesn't modify source entities
- **Target Assignment:** Only modifies target reference fields, not source entity data
- **Cache Management:** Manages internal cache but doesn't modify entity tables

## Business Use Cases

### 1. Data Import and Migration
- **Legacy Data Import:** Match legacy system data to current entities
- **Excel Import Processing:** Match Excel data to system entities automatically
- **Data Migration:** Link migrated data to existing system entities
- **Third-Party Integration:** Match external system data to internal entities

### 2. Automated Data Entry
- **Invoice Processing:** Automatically match item descriptions to inventory items
- **Order Processing:** Match customer names to customer entities
- **Supplier Management:** Link supplier names to supplier records
- **Employee Assignment:** Match employee names to employee records

### 3. Data Cleansing and Standardization
- **Duplicate Resolution:** Identify and link duplicate or similar entities
- **Data Standardization:** Standardize entity references across the system
- **Quality Improvement:** Improve data quality through intelligent matching
- **Relationship Recovery:** Recover broken entity relationships

### 4. Workflow Automation
- **Document Processing:** Automatically populate entity references in documents
- **Approval Workflows:** Auto-assign entities in approval workflows
- **Report Generation:** Automatically link data for report generation
- **Batch Processing:** Process large volumes of data with automated matching

## Matching Algorithm Details

### String Distance Calculation
- **Multiple Algorithms:** Uses advanced string distance algorithms
- **Normalized Scoring:** Provides normalized similarity scores
- **Performance Optimized:** Optimized for performance with large datasets
- **Multi-Language Support:** Supports Arabic and English text processing

### Matching Priority
1. **Exact Code Match:** Highest priority for exact code matches
2. **Exact Alternative Code Match:** High priority for alternative code matches
3. **Exact Name Match:** High priority for exact name matches
4. **Fuzzy Matching:** Calculated similarity scores for approximate matches

### Caching Strategy
- **Entity List Caching:** Caches complete entity lists by type
- **Result Caching:** Caches matching results for identical inputs
- **Event-Based Invalidation:** Invalidates cache when entities are modified
- **Memory Management:** Uses weak references to prevent memory issues

## Important Warnings

### ⚠️ Performance Considerations
- **Large Entity Sets:** Performance may degrade with very large entity sets
- **Fuzzy Matching Overhead:** String distance calculations can be CPU intensive
- **Cache Memory Usage:** Entity caching may consume significant memory
- **Concurrent Processing:** Multiple simultaneous operations may impact performance

### ⚠️ Matching Accuracy
- **False Positives:** Fuzzy matching may produce incorrect matches
- **Threshold Sensitivity:** Incorrect thresholds may produce poor results
- **Data Quality Dependency:** Results depend heavily on source data quality
- **Manual Validation:** Consider manual validation of critical matches

### ⚠️ Field and Data Requirements
- **Reference Field Types:** Target field must be reference or generic reference
- **Source Data Quality:** Source text quality significantly affects matching accuracy
- **Entity Data Completeness:** Target entities must have complete code and name data
- **Field Mapping Accuracy:** Incorrect field mappings will produce poor results

### ⚠️ System Resource Impact
- **Memory Usage:** Caching large entity sets may consume significant memory
- **CPU Usage:** Fuzzy matching algorithms are computationally intensive
- **Database Load:** Entity loading for caching may impact database performance
- **Concurrent Operations:** Multiple matching operations may compete for resources

## Best Practices

### Parameter Tuning
- **Start Conservative:** Begin with stricter thresholds and adjust as needed
- **Test with Sample Data:** Test matching parameters with representative data
- **Monitor Results:** Monitor matching results and adjust parameters accordingly
- **Environment-Specific Tuning:** Tune parameters for specific data characteristics

### Data Preparation
- **Source Data Quality:** Ensure source data is clean and consistent
- **Entity Data Completeness:** Maintain complete and accurate entity master data
- **Standardization:** Standardize naming conventions for better matching
- **Data Validation:** Validate entity data before running matching operations

### Performance Optimization
- **Batch Processing:** Process large datasets in manageable batches
- **Resource Monitoring:** Monitor system resources during matching operations
- **Cache Management:** Monitor cache usage and clear when necessary
- **Concurrent Operation Management:** Limit concurrent matching operations

### Result Validation
- **Sample Validation:** Manually validate a sample of matching results
- **Accuracy Monitoring:** Monitor matching accuracy over time
- **Error Tracking:** Track and analyze matching errors for improvement
- **Feedback Integration:** Use feedback to improve matching parameters

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGuessEntityFromNames`


</div>