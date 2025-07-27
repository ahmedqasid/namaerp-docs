---
title: EAGenerateEntityFromEntityAction
module: core
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityAction

**This document was generated using Claude.ai**
Please review the human-written page at [Field Values Calculator](../../guide/entity-flows/ea-fields-values-calculator.md)

## Overview

This entity flow creates new entities from existing entities with full commitment to the database. It's the core entity generation action that provides comprehensive field mapping, conditional processing, and automatic database persistence. This is the foundation action for most document generation workflows in the system.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for standard entity creation
- **Target:** Any entity type requiring full document generation with immediate commitment
- **Purpose:** Create fully committed entities based on existing entity data
- **Timing:** Used when generated documents should be immediately committed and available

## How It Works

### 1. Source Entity Processing
- **Entity Analysis:** Analyzes the source entity for data extraction and processing
- **Field Mapping:** Maps fields from source to target entity based on detailed configuration
- **Relationship Navigation:** Navigates complex entity relationships for data copying
- **Conditional Logic:** Applies conditional logic to determine generation behavior

### 2. Target Entity Creation or Updating
- **Entity Search:** Uses finder SQL to locate existing target entities for updates
- **Create or Update Logic:** Creates new entity if not found, updates existing if found
- **Document Properties:** Copies standard document properties when applicable
- **Code Generation:** Automatically generates document codes if needed

### 3. Advanced Field Value Assignment
- **Static Values:** Assigns literal string values to target fields
- **Field References:** Copies values from source entity fields and related entities
- **SQL Calculations:** Executes SQL queries to calculate complex field values
- **Tempo Expressions:** Processes Tempo templates for dynamic content generation
- **Collection Processing:** Handles detail collections and line item processing

### 4. Full Commitment Process
- **Validation:** Performs full entity validation before commitment
- **Business Rules:** Applies all business rules and constraints
- **Database Persistence:** Immediately commits changes to database
- **Workflow Integration:** Triggers related workflows and processes

## Key Features

### Complete Entity Generation
- **Full Commitment:** Generated entities are fully committed to database
- **Immediate Availability:** Documents are immediately available for use
- **Workflow Integration:** Triggers all associated business processes
- **Validation Enforcement:** Enforces all validation rules and constraints

### Advanced Field Mapping System
- **Multi-Source Values:** Combine data from multiple sources and entities
- **Complex Expressions:** Support for SQL, Tempo, and calculation expressions
- **Reference Management:** Advanced handling of entity references and relationships
- **Collection Processing:** Sophisticated processing of detail collections

### Conditional and Batch Processing
- **Conditional Generation:** Generate entities based on complex conditional logic
- **Line-by-Line Processing:** Process source collections line by line
- **Grouping Logic:** Group detail lines by specified criteria
- **Performance Optimization:** Optimized for both single and batch processing

## Parameters

### Parameter 1: Target Type (Required)
- **Type:** Entity Type
- **Purpose:** Specifies the type of entity to create
- **Format:** Entity type name (e.g., "SalesInvoice", "PurchaseOrder")
- **Examples:** `SalesInvoice`, `CreditNote`, `DeliveryNote`, `PaymentVoucher`

### Parameter 2: Finder SQL (Required)
- **Type:** SQL Query
- **Purpose:** SQL query to find existing target entity for updates
- **Format:** SQL SELECT statement returning entity ID
- **Field References:** Use {fieldName} to reference source entity fields

**Validated Finder SQL Examples:**
```sql
-- Find existing credit note for sales invoice
SELECT id FROM CreditNote WHERE ref5Id = {id}

-- Find payment voucher for customer reference
SELECT id FROM PaymentVoucher WHERE ref1Id = {ref1.id} AND valueDate = {valueDate}

-- Always create new (return nothing)
SELECT id FROM SalesInvoice WHERE 1 = 0
```

### Parameter 3: Field Map (Optional)
- **Type:** Multi-line field mapping configuration
- **Purpose:** Defines how fields are copied from source to target
- **Format:** `targetField=sourceValue` with comprehensive syntax support
- **Reference:** Visit the [Field Mapping Guide](https://docs.namasoft.com/guide/entity-flows/ea-fields-values-calculator.html) for complete syntax

**Advanced Field Mapping Examples:**
```
# Basic field copying
code=code
description=description
customer=customer

# Static value assignment
status="CONFIRMED"
documentType="SALES_INVOICE"

# Reference to source entity
fromDoc=$this
ref5=$this

# SQL-based calculations
totalAmount=sql(SELECT SUM(lineTotal) FROM SalesOrderLine WHERE salesOrder_id = {id})
nextCode=sql(SELECT 'INV-' + FORMAT((MAX(CAST(SUBSTRING(code, 5, 10) AS INT)) + 1), '000000') FROM SalesInvoice)

# Tempo template processing
description=tempo(Invoice for {customer.name} dated {documentDate})

# Collection copying with modifications
[details]=sql(SELECT lineTotal, item_id FROM SalesOrderLine WHERE salesOrder_id = {id})

# Conditional field assignment
priority=sql(SELECT CASE WHEN {totalAmount} > 10000 THEN 'HIGH' ELSE 'NORMAL' END)
```

### Parameter 4: Update Only (Optional)
- **Type:** Boolean
- **Values:** "true" or "false"
- **Purpose:** When true, only updates existing entities (no new creation)
- **Default:** false (creates new entities if not found)
- **Use Case:** Data synchronization scenarios where only updates are desired

### Parameter 5: Inverse Copy (Optional)
- **Type:** Multi-line field mapping configuration
- **Purpose:** Copy fields from generated entity back to source entity
- **Format:** Same as field map, but copies from target to source
- **Timing:** Executed after target entity is saved

**Inverse Copy Examples:**
```
# Update source with generated entity reference
ref5=$this
description5=n1
lastGeneratedId=id
lastGeneratedDate=documentDate
generatedStatus="COMPLETED"
```

### Parameter 6: Run Entity Flow Per Each Line (Optional)
- **Type:** Collection Field Name
- **Purpose:** Execute this action for each line in specified collection
- **Format:** Collection field name (e.g., "details", "lines", "items")
- **Effect:** Runs the entire generation process once per collection item

### Parameter 7: Insert Only (Optional)
- **Type:** Boolean
- **Values:** "true" or "false"
- **Purpose:** When true, only creates new entities (no updates to existing)
- **Default:** false (updates existing entities if found)
- **Use Case:** Data import scenarios where duplicates should be avoided

### Parameter 8: Apply When Query (Optional)
- **Type:** SQL Query
- **Purpose:** Conditional logic to determine if generation should proceed
- **Format:** SQL query returning 1 (proceed) or 0 (skip)
- **Use Case:** Primarily used with "Per Each Line" processing

**Validated Apply When Query Examples:**
```sql
-- Only for service items
SELECT CASE WHEN {line.item.itemType} = 'Service' THEN 1 ELSE 0 END

-- Only for amounts above threshold
SELECT CASE WHEN {lineTotal} > 1000 THEN 1 ELSE 0 END

-- Only for specific customers
SELECT CASE WHEN {customer.code} IN ('CUST001', 'CUST002') THEN 1 ELSE 0 END

-- Only for active items
SELECT CASE WHEN {line.item.status} = 'ACTIVE' THEN 1 ELSE 0 END
```

### Parameter 9: Group Details By (Optional)
- **Type:** Field Expression
- **Purpose:** Groups detail lines by specified criteria before processing
- **Format:** Field name or complex grouping expression
- **Documentation:** Review samples documentation for detailed examples

### Parameter 10: Run Only If (Optional)
- **Type:** SQL Expression
- **Purpose:** Only run generation if the expression returns a number greater than zero
- **Format:** SQL expression or totalize function
- **Examples:** `totalizesql(SELECT CASE WHEN {details.item.code} IN ('a','b','c') THEN 1 ELSE 0 END)`

## Database Tables Affected

### Target Entity Tables
- **Generated Entity:** Creates or updates records in target entity table
- **Committed Status:** Entity is fully committed and validated
- **Field Updates:** Updates all mapped fields based on configuration
- **Relationship Records:** Creates or updates related entity records

### Source Entity Updates
- **Inverse Mapping:** Updates source entity fields based on inverse copy configuration
- **Reference Updates:** Updates source entity with references to generated entity
- **Status Changes:** Source entity status may be updated based on generation
- **Tracking Fields:** Updates tracking fields to maintain audit trail

### Collection and Detail Tables
- **Detail Generation:** Generates detail collections based on source collections
- **Line Item Processing:** Processes line items according to grouping and filtering rules
- **Related Collections:** Updates related collections and detail tables
- **Cross-References:** Maintains cross-references between related entities

### Automatic Database Effects
- **Code Generation:** May trigger automatic code generation sequences
- **Ledger Entries:** May create accounting ledger entries if applicable
- **Workflow Triggers:** May trigger workflow processes and state changes
- **Audit Trails:** Creates comprehensive audit trails for generated entities

## Business Use Cases

### 1. Standard Document Workflows
- **Order to Invoice:** Convert sales orders to committed invoices
- **Quote to Order:** Convert quotes to confirmed sales orders
- **Invoice to Payment:** Generate payment vouchers from invoices
- **Delivery to Invoice:** Create invoices from delivery confirmations

### 2. Financial and Accounting Processes
- **Ledger Entry Generation:** Generate accounting entries from business documents
- **Tax Document Creation:** Create tax-compliant documents from source transactions
- **Financial Reporting:** Generate financial documents for reporting purposes
- **Compliance Documentation:** Create compliance-required documents

### 3. Operational Workflows
- **Production Orders:** Generate production orders from sales requirements
- **Purchase Requests:** Create purchase orders from inventory requirements
- **Service Orders:** Generate service orders from customer requests
- **Quality Control:** Create quality control documents from production data

### 4. Integration and Automation
- **System Integration:** Generate entities for external system integration
- **Automated Workflows:** Integrate with automated business processes
- **Data Transformation:** Transform data between different entity types
- **Process Automation:** Automate complex multi-step business processes

## Commitment Benefits

### Immediate Availability
- **Real-Time Processing:** Generated documents are immediately available for use
- **Workflow Integration:** Triggers all associated business processes immediately
- **System Integration:** External systems can access generated documents immediately
- **User Access:** Users can access and work with generated documents right away

### Data Integrity
- **Full Validation:** All validation rules and constraints are enforced
- **Business Rules:** All business rules are applied during generation
- **Referential Integrity:** Database referential integrity is maintained
- **Audit Compliance:** Complete audit trails are created for compliance

### Process Integration
- **Workflow Triggers:** Automatically triggers related workflow processes
- **Notification Systems:** Integrates with notification and alert systems
- **Reporting Systems:** Documents are immediately available for reporting
- **Performance Metrics:** Contributes to real-time performance metrics

## Important Warnings

### ⚠️ Immediate Commitment Implications
- **No Rollback:** Generated entities are immediately committed and cannot be easily rolled back
- **Validation Enforcement:** All validation rules must be satisfied before generation
- **Process Triggers:** May trigger immediate downstream processes and workflows
- **Resource Impact:** Immediate commitment may impact system resources

### ⚠️ Field Mapping Complexity
- **Mapping Validation:** Complex field mappings require thorough testing and validation
- **Performance Impact:** Complex mappings may impact system performance significantly
- **Data Consistency:** Field mappings must maintain data consistency across entities
- **Error Handling:** Complex mappings require sophisticated error handling mechanisms

### ⚠️ SQL Query Performance and Validation
- **Query Optimization:** All SQL queries must be optimized for production performance
- **Index Requirements:** Ensure appropriate database indexes exist for all queries
- **Large Dataset Impact:** Consider performance impact on large datasets and batch operations
- **Resource Usage:** Monitor database resource usage during generation operations

### ⚠️ Workflow and Process Dependencies
- **Downstream Effects:** Generated entities may trigger multiple downstream processes
- **Integration Impact:** May affect external systems and integration points
- **User Training:** Users must understand the implications of entity generation
- **Process Documentation:** Document all related processes and dependencies

## Best Practices

### Field Mapping Strategy
- **Incremental Development:** Start with simple field mappings and add complexity gradually
- **Comprehensive Testing:** Test field mappings thoroughly with various data scenarios
- **Performance Monitoring:** Monitor performance of complex field calculations
- **Documentation:** Document complex mapping logic and business rules

### SQL Query Optimization
- **Performance Testing:** Test SQL query performance under realistic load conditions
- **Index Strategy:** Ensure appropriate indexes exist for optimal query performance
- **Result Validation:** Validate SQL query results for accuracy and completeness
- **Error Handling:** Implement robust error handling for SQL execution failures

### Entity Generation Management
- **Process Documentation:** Document entity generation processes and their business impact
- **User Training:** Train users on proper use of entity generation workflows
- **Error Monitoring:** Monitor for generation errors and implement alerting systems
- **Performance Tracking:** Track generation performance and optimize as needed

### System Integration
- **Integration Testing:** Test integration with downstream systems and processes
- **Workflow Coordination:** Coordinate with other system workflows and processes
- **Change Management:** Implement proper change management for generation processes
- **Monitoring and Alerting:** Implement comprehensive monitoring and alerting systems

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction`

**Related Actions:**
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Draft entity generation for review
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Entity generation without immediate flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval


</div>