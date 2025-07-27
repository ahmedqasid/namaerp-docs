---
title: EAGenerateDraftEntityFromEntityAction
module: core
---


<div class='entity-flows'>

# EAGenerateDraftEntityFromEntityAction

**This document was generated using Claude.ai**

## Overview

This entity flow creates new entities from existing entities and saves them as draft documents. It's identical to the standard entity generation flow but automatically saves the generated entities in draft status instead of committing them. This allows for creating documents that need review or additional processing before finalization.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for draft entity creation
- **Target:** Any entity type that needs to generate related draft documents
- **Purpose:** Create draft entities based on existing entity data without full commitment
- **Timing:** Used when generated documents require review or approval before finalization

## How It Works

### 1. Source Entity Processing
- **Entity Analysis:** Analyzes the source entity for data extraction
- **Field Mapping:** Maps fields from source to target entity based on configuration
- **Relationship Navigation:** Navigates entity relationships for complex data copying
- **Validation Checking:** Applies conditional logic to determine if generation should proceed

### 2. Target Entity Creation or Finding
- **Entity Search:** Uses finder SQL to locate existing target entities
- **Create or Update Logic:** Creates new entity if not found, or updates existing entity
- **Draft Entity Creation:** Creates target entity in draft status for review
- **Common Data Copying:** Copies standard document properties when applicable

### 3. Field Value Assignment
- **Static Values:** Assigns literal string values to target fields
- **Field References:** Copies values from source entity fields
- **SQL Calculations:** Executes SQL queries to calculate field values
- **Complex Expressions:** Supports advanced value assignment expressions

### 4. Draft Save Process
- **Draft Status:** Saves generated entity as draft without full commitment
- **Validation Bypass:** May bypass certain validations during draft save
- **Review Preparation:** Prepares entity for manual review and approval
- **Workflow Integration:** Integrates with approval workflows if configured

## Key Features

### Draft Document Generation
- **Draft Status:** Generated entities are saved as drafts requiring approval
- **Review Process:** Documents can be reviewed before final commitment
- **Validation Flexibility:** Draft documents may have relaxed validation rules
- **Approval Workflow:** Integrates with document approval workflows

### Flexible Entity Creation
- **Any Entity Type:** Can generate any type of entity from any source
- **Complex Field Mapping:** Support advanced field mapping and value assignment
- **Conditional Generation:** Generate entities based on conditional logic
- **Batch Processing:** Process multiple source entities efficiently

### Advanced Field Assignment
- **Multi-Source Values:** Combine data from multiple sources
- **Calculated Fields:** Use SQL and expressions for calculated values
- **Reference Handling:** Manage entity references and relationships
- **Collection Processing:** Handle detail collections and line items

## Parameters

### Parameter 1: Target Type (Required)
- **Type:** Entity Type
- **Purpose:** Specifies the type of entity to create
- **Format:** Entity type name (e.g., "SalesInvoice", "PurchaseOrder")
- **Examples:** `SalesInvoice`, `CreditNote`, `DeliveryNote`, `PaymentVoucher`

### Parameter 2: Finder SQL (Required)
- **Type:** SQL Query
- **Purpose:** SQL query to find existing target entity (returns empty for new creation)
- **Format:** SQL SELECT statement returning entity ID
- **Field References:** Use {fieldName} to reference source entity fields

**Finder SQL Examples:**
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
- **Format:** `targetField=sourceValue` with various source value types
- **Reference:** Visit the [Field Mapping Guide](https://docs.namasoft.com/guide/entity-flows/ea-fields-values-calculator.html) for complete syntax

**Basic Field Mapping Examples:**
```
# Simple field copying
code=code
description=description
customer=customer

# Static value assignment
status="DRAFT"
documentType="CREDIT_NOTE"

# Reference to source entity
fromDoc=$this
ref5=$this

# SQL-based calculations
totalAmount=sql(SELECT SUM(lineTotal) FROM SalesOrderLine WHERE salesOrder_id = {id})
nextCode=sql(SELECT 'CN-' + CAST((MAX(CAST(SUBSTRING(code, 4, 10) AS INT)) + 1) AS VARCHAR) FROM CreditNote)
```

### Parameter 4: Update Only (Optional)
- **Type:** Boolean
- **Values:** "true" or "false"
- **Purpose:** When true, only updates existing entities (no new creation)
- **Default:** false (creates new entities if not found)

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

### Parameter 8: Apply When Query (Optional)
- **Type:** SQL Query
- **Purpose:** Conditional logic to determine if generation should proceed
- **Format:** SQL query returning 1 (proceed) or 0 (skip)
- **Use Case:** Primarily used with "Per Each Line" processing

**Apply When Query Examples:**
```sql
-- Only for service items
SELECT CASE WHEN {line.item.item.itemType} = 'Service' THEN 1 ELSE 0 END

-- Only for amounts above threshold
SELECT CASE WHEN {lineTotal} > 1000 THEN 1 ELSE 0 END

-- Only for specific customers
SELECT CASE WHEN {customer.code} IN ('CUST001', 'CUST002') THEN 1 ELSE 0 END
```

### Parameter 9: Group Details By (Optional)
- **Type:** Field Expression
- **Purpose:** Groups detail lines by specified criteria before processing
- **Format:** Field name or expression for grouping
- **Documentation:** Review samples documentation for detailed examples

### Parameter 10: Run Only If (Optional)
- **Type:** SQL Expression
- **Purpose:** Only run generation if the expression returns a number greater than zero
- **Format:** SQL expression or totalize function
- **Examples:** `totalizesql(SELECT CASE WHEN {details.item.item.code} IN ('a','b','c') THEN 1 ELSE 0 END)`

## Database Tables Affected

### Target Entity Tables
- **Generated Entity:** Creates or updates records in target entity table
- **Draft Status:** Entity is saved with draft status flags
- **Field Updates:** Updates all mapped fields based on field map configuration
- **Relationship Records:** May create or update related entity records

### Source Entity Updates
- **Inverse Mapping:** May update source entity fields based on inverse copy configuration
- **Reference Updates:** May update source entity with references to generated entity
- **Status Changes:** Source entity status may be updated based on generation

### Collection and Detail Tables
- **Detail Generation:** May generate detail collections based on source collections
- **Line Item Processing:** Processes line items according to grouping and filtering rules
- **Related Collections:** Updates related collections and detail tables

## Business Use Cases

### 1. Document Generation Workflows
- **Invoice to Credit Note:** Generate draft credit notes from sales invoices for review
- **Order to Invoice:** Create draft invoices from sales orders requiring approval
- **Quote to Order:** Convert quotes to draft orders for processing
- **Contract Renewals:** Generate draft renewal contracts from existing contracts

### 2. Approval and Review Processes
- **Management Review:** Create documents requiring management approval
- **Financial Review:** Generate financial documents requiring finance team review
- **Legal Review:** Create contracts requiring legal department approval
- **Customer Approval:** Generate documents requiring customer confirmation

### 3. Template-Based Document Creation
- **Standard Templates:** Generate documents from standard templates
- **Customer-Specific Templates:** Create documents based on customer-specific templates
- **Recurring Documents:** Generate recurring documents from templates
- **Bulk Document Creation:** Create multiple documents from templates

### 4. Integration and Migration
- **System Integration:** Generate entities for external system integration
- **Data Migration:** Create entities during data migration processes
- **Bulk Processing:** Process large volumes of entity generation
- **Automated Workflows:** Integrate with automated business workflows

## Draft Document Benefits

### Review and Approval
- **Quality Control:** Documents can be reviewed for accuracy before finalization
- **Approval Workflows:** Integration with formal approval processes
- **Error Prevention:** Catch errors before document commitment
- **Process Control:** Maintain control over document generation processes

### Flexible Processing
- **Incremental Processing:** Documents can be processed in stages
- **Conditional Commitment:** Commitment based on business conditions
- **User Intervention:** Allow user intervention before finalization
- **Workflow Integration:** Integration with complex business workflows

## Important Warnings

### ⚠️ Draft Status Implications
- **Incomplete Documents:** Draft documents may not trigger all business processes
- **Reporting Exclusion:** Draft documents may be excluded from certain reports
- **Workflow Dependencies:** Some workflows may require committed documents
- **Integration Impact:** External systems may not process draft documents

### ⚠️ Field Mapping Complexity
- **Mapping Validation:** Complex field mappings require thorough testing
- **Performance Impact:** Complex mappings may impact system performance
- **Data Consistency:** Ensure field mappings maintain data consistency
- **Error Handling:** Complex mappings may require sophisticated error handling

### ⚠️ SQL Query Performance
- **Query Optimization:** Finder SQL and field calculation queries must be optimized
- **Index Requirements:** Ensure appropriate database indexes exist
- **Large Dataset Impact:** Consider performance impact on large datasets
- **Resource Usage:** Monitor database resource usage during generation

### ⚠️ Approval Workflow Dependencies
- **Workflow Configuration:** Ensure approval workflows are properly configured
- **User Training:** Users must understand draft review and approval processes
- **Process Documentation:** Document approval processes for consistency
- **Escalation Procedures:** Have procedures for handling approval delays

## Best Practices

### Field Mapping Strategy
- **Simple Mappings First:** Start with simple field mappings and add complexity gradually
- **Testing:** Thoroughly test field mappings with various data scenarios
- **Documentation:** Document complex field mapping logic and business rules
- **Performance Monitoring:** Monitor performance of complex field calculations

### Draft Document Management
- **Clear Naming:** Use clear naming conventions for draft documents
- **Review Procedures:** Establish clear procedures for draft document review
- **Approval Tracking:** Track approval status and review progress
- **Cleanup Processes:** Have processes for cleaning up unused draft documents

### Error Handling and Monitoring
- **Error Logging:** Log errors encountered during entity generation
- **Result Validation:** Validate generation results for accuracy
- **Performance Monitoring:** Monitor generation performance and optimize as needed
- **User Feedback:** Provide clear feedback to users on generation results

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateDraftEntityFromEntityAction`

**Related Actions:**
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md) - Draft generation without database flush
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard generation without database flush


</div>