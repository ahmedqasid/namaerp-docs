---
title: EAFieldsValuesCalculator
module: core
---


<div class='entity-flows'>

# EAFieldsValuesCalculator

**This document was generated using Claude.ai**

Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

This entity flow performs bulk field assignments and calculations on entities using a flexible mapping syntax. It allows copying values between fields, setting fields to static values, executing SQL calculations, and triggering entity commands. This is a powerful tool for data manipulation and business logic automation.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for field manipulation
- **Target:** Any entity requiring field value assignments or calculations
- **Purpose:** Automate complex field assignments, data copying, and value calculations
- **Timing:** Typically used during entity processing, data migration, or business rule execution

## How It Works

### 1. Field Mapping Processing
- **Multi-Line Configuration:** Processes multiple field assignments defined in parameters
- **Flexible Assignment:** Supports various value sources including fields, strings, and SQL
- **Sequential Processing:** Executes field assignments in the order specified
- **Error Accumulation:** Collects and reports errors from individual field assignments

### 2. Value Source Resolution
- **Field References:** Copy values from other entity fields using field names
- **Static Values:** Assign quoted string literals to fields
- **SQL Calculations:** Execute SQL queries to calculate field values
- **Reference Navigation:** Access fields from related entities using dot notation

### 3. SQL Integration
- **Dynamic Queries:** Execute SQL queries with entity field references
- **Parameter Substitution:** Use {fieldName} syntax to reference current entity fields
- **Database Calculations:** Perform complex calculations using database functions
- **Result Assignment:** Assign SQL query results directly to entity fields

### 4. Entity Command Execution
- **Command Triggering:** Execute entity commands like "edit" and "save"
- **Reference Entity Commands:** Execute commands on referenced entities
- **Process Automation:** Automate entity lifecycle operations
- **Workflow Integration:** Integrate with entity workflow processes

## Key Features

### Flexible Value Sources
- **Field-to-Field Copy:** Copy values between entity fields
- **Static Assignment:** Set fields to specific string values
- **SQL Calculations:** Use database queries for complex calculations
- **Reference Navigation:** Access fields from related entities

### Multiple Assignment Types
- **Simple Assignment:** Direct field value assignments
- **Complex Expressions:** Support for complex value expressions
- **Conditional Logic:** Use SQL for conditional value assignment
- **Batch Operations:** Process multiple field assignments in single operation

### Command Integration
- **Entity Commands:** Execute commands on current or referenced entities
- **Process Control:** Control entity processing through commands
- **Automation Support:** Automate complex business processes
- **Workflow Triggers:** Trigger workflow processes through commands

## Parameters

### Parameters 1-15: Field Mapping Definitions
- **Type:** Text (Optional - up to 15 parameters)
- **Format:** Multi-line field mapping definitions
- **Purpose:** Define field assignments and value calculations
- **Syntax:** `targetField=sourceValue` with various source value types

**Field Mapping Syntax:**

### Simple Field Copy
```
targetField=sourceField
warehouse=book.ref1
name1=code
```

### Static String Assignment
```
status="ACTIVE"
description="Default Description"
category="STANDARD"
```

### SQL Calculation Assignment
```
maxValue=sql(SELECT MAX(value) FROM InvItem WHERE category = {category})
totalAmount=sql(SELECT SUM(amount) FROM SalesOrderLine WHERE salesOrder_id = {id})
nextCode=sql(SELECT 'PREFIX-' + CAST((MAX(CAST(SUBSTRING(code, 8, 10) AS INT)) + 1) AS VARCHAR) FROM Customer)
```

### Reference Entity Field Access
```
customerName=customer.name
supplierCode=supplier.code
warehouseLocation=warehouse.location
```

### Entity Command Execution
```
customer.runCommand="edit"
customer.runCommand="save"
runCommand="validate"
```

**Parameter Examples:**

**Parameter 1:**
```
warehouse=defaultWarehouse
status="DRAFT"
totalAmount=sql(SELECT SUM(lineTotal) FROM SalesOrderLine WHERE salesOrder_id = {id})
```

**Parameter 2:**
```
customer.runCommand="edit"
customer.creditLimit=sql(SELECT SUM(amount) FROM SalesInvoice WHERE customer_id = {customer_id})
customer.runCommand="save"
```

## Database Tables Affected

### Target Entity Tables
- **Primary Entity:** Fields on the current entity are modified based on assignments
- **Related Entity Tables:** Referenced entities may be modified through field assignments
- **Command Effects:** Entity commands may trigger additional database changes
- **Cascading Changes:** Field assignments may trigger cascading updates

### SQL Query Access
- **Read Access:** SQL calculations can read from any accessible database table
- **Cross-Table Calculations:** Perform calculations across multiple related tables
- **Aggregate Operations:** Use aggregate functions for complex calculations
- **Conditional Logic:** Apply conditional logic in SQL calculations

## Business Use Cases

### 1. Data Standardization
- **Field Normalization:** Standardize field values across entities
- **Default Value Assignment:** Set default values for new or existing entities
- **Data Cleanup:** Clean and standardize existing data
- **Format Standardization:** Apply consistent formatting to entity fields

### 2. Calculated Field Updates
- **Total Calculations:** Calculate totals and aggregates from related data
- **Dynamic Pricing:** Calculate prices based on complex business rules
- **Status Updates:** Update entity status based on business conditions
- **Performance Metrics:** Calculate and update performance indicators

### 3. Cross-Entity Data Synchronization
- **Reference Data Sync:** Keep reference data synchronized across entities
- **Master Data Updates:** Update entities when master data changes
- **Relationship Maintenance:** Maintain data consistency across related entities
- **Cascade Updates:** Propagate changes across entity relationships

### 4. Business Process Automation
- **Workflow Automation:** Automate complex business workflows
- **Validation Processing:** Perform complex validation and correction
- **Integration Processing:** Process data for system integration
- **Batch Operations:** Perform bulk data operations efficiently

## Field Mapping Examples

### Basic Field Assignments
```
# Copy from one field to another
targetWarehouse=sourceWarehouse
customerCode=defaultCustomer.code
description=product.description

# Set static values
status="ACTIVE"
priority="HIGH"
category="STANDARD"
```

### SQL-Based Calculations
```
# Calculate next sequence number
nextNumber=sql(SELECT ISNULL(MAX(sequenceNumber), 0) + 1 FROM SalesOrder WHERE year = YEAR(GETDATE()))

# Calculate customer balance
customerBalance=sql(SELECT ISNULL(SUM(balance), 0) FROM SalesInvoice WHERE customer_id = {customer_id})

# Get latest price
currentPrice=sql(SELECT TOP 1 price FROM PriceList WHERE item_id = {item_id} ORDER BY effectiveDate DESC)
```

### Complex Entity Operations
```
# Update customer and save
customer.creditLimit=sql(SELECT SUM(amount) FROM SalesInvoice WHERE customer_id = {customer_id})
customer.lastOrderDate=sql(SELECT MAX(orderDate) FROM SalesOrder WHERE customer_id = {customer_id})
customer.runCommand="save"

# Process related entities
item.runCommand="edit"
item.lastSoldDate=sql(SELECT MAX(orderDate) FROM SalesOrderLine sol JOIN SalesOrder so ON sol.salesOrder_id = so.id WHERE sol.item_id = {item_id})
item.runCommand="save"
```

## Important Warnings

### ⚠️ Field Assignment Order
- **Sequential Processing:** Field assignments are processed in the order specified
- **Dependency Management:** Ensure dependent assignments are ordered correctly
- **Command Timing:** Entity commands should be placed after field assignments
- **Reference Resolution:** Referenced fields must exist before assignment

### ⚠️ SQL Query Performance
- **Query Optimization:** Ensure SQL queries are optimized for performance
- **Index Usage:** Verify queries use appropriate database indexes
- **Complex Calculations:** Complex SQL may impact system performance
- **Large Datasets:** Consider performance impact on large datasets

### ⚠️ Entity Command Effects
- **Save Operations:** Save commands trigger full entity validation and persistence
- **Workflow Triggers:** Commands may trigger additional workflow processes
- **Cascading Effects:** Entity commands may cause cascading changes
- **Error Propagation:** Command failures may affect overall operation

### ⚠️ Data Integrity Considerations
- **Field Validation:** Assigned values must pass field validation rules
- **Reference Integrity:** Referenced entities must exist and be accessible
- **Type Compatibility:** Assigned values must be compatible with target field types
- **Business Rules:** Assignments must comply with business rule validation

## Best Practices

### Field Mapping Design
- **Clear Mapping Logic:** Use clear, understandable field mapping logic
- **Documentation:** Document complex assignments and their business purpose
- **Testing:** Test field assignments thoroughly with various data scenarios
- **Error Handling:** Include error handling for failed assignments

### SQL Query Optimization
- **Performance Testing:** Test SQL query performance under load
- **Index Strategy:** Ensure appropriate indexes exist for query performance
- **Result Validation:** Validate SQL query results before assignment
- **Fallback Values:** Consider fallback values for null SQL results

### Entity Command Strategy
- **Minimal Commands:** Use entity commands sparingly to avoid performance impact
- **Command Ordering:** Order commands logically in relation to field assignments
- **Error Recovery:** Plan for command failure scenarios
- **Transaction Management:** Consider transaction boundaries with entity commands

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`


</div>
