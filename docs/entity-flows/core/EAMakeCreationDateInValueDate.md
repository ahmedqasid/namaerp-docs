---
title: EAMakeCreationDateInValueDate
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateInValueDate

**This document was generated using Claude.ai**

## Overview

This entity flow synchronizes document creation dates with their value dates while preserving the original creation time. It ensures that the creation date matches the value date exactly, but keeps the time portion unchanged. This action is essential for maintaining date consistency in documents while preserving the precise timing of when the document was created.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for date synchronization
- **Target:** DocumentFile entities requiring creation date and value date alignment
- **Purpose:** Synchronize creation date with value date while preserving creation time
- **Timing:** Typically runs during document processing or when date consistency is required

## How It Works

### 1. Document Date Validation
- **Value Date Check:** Verifies that the document has a valid value date
- **Skip Processing:** If no value date exists, the action completes successfully without changes
- **Current State Analysis:** Analyzes current creation date and value date relationship
- **Change Detection:** Determines if synchronization is needed

### 2. Date Comparison and Analysis
- **Date Extraction:** Extracts date portion from both creation date and value date
- **Comparison Logic:** Compares the date portions to identify differences
- **Time Preservation:** Identifies the time portion to be preserved
- **Synchronization Need:** Determines if date synchronization is required

### 3. Date Synchronization Process
- **Date Alignment:** Aligns creation date with value date
- **Time Preservation:** Preserves the original creation time exactly
- **New DateTime Creation:** Creates new datetime combining value date and original time
- **Safe Replacement:** Safely replaces the creation date with synchronized version

### 4. Result Application
- **Creation Date Update:** Updates document creation date with synchronized datetime
- **Consistency Achievement:** Achieves date consistency between creation and value dates
- **Time Integrity:** Maintains time integrity and precision
- **Successful Completion:** Returns successful result after synchronization

## Key Features

### Date Synchronization
- **Precise Date Alignment:** Aligns creation date exactly with value date
- **Automatic Detection:** Automatically detects when synchronization is needed
- **Conditional Processing:** Only processes when dates are different
- **Simple Operation:** Straightforward, single-purpose operation

### Time Preservation
- **Exact Time Retention:** Preserves creation time down to millisecond precision
- **No Time Modification:** Never modifies the time portion of creation date
- **Historical Accuracy:** Maintains historical accuracy of when document was created
- **Temporal Integrity:** Preserves temporal integrity of document creation

### Safe and Reliable Operation
- **Non-Destructive:** Operation is safe and non-destructive
- **Always Successful:** Always returns successful result (no failure conditions)
- **Simple Logic:** Simple, straightforward logic with minimal complexity
- **Reliable Execution:** Reliable execution with no external dependencies

## Parameters

This entity flow requires no parameters.

- **Parameter Count:** 0
- **Configuration:** No configuration required
- **Usage:** Simply add to entity flow without any parameter setup

## Database Tables Affected

### DocumentFile Creation Date
- **Creation Date Field:** Updates creation date field with synchronized date/time
- **Date Portion:** Changes date portion to match value date
- **Time Portion:** Preserves time portion exactly as it was
- **Timestamp Precision:** Maintains full timestamp precision

### Document Date Consistency
- **Date Alignment:** Ensures creation date and value date have same date portion
- **Document Integrity:** Improves document data integrity and consistency
- **Audit Trail Consistency:** Enhances audit trail consistency for date tracking
- **Reporting Accuracy:** Improves reporting accuracy when grouping by dates

### No External Impact
- **Isolated Changes:** Changes are isolated to the target document's creation date
- **No Cascading Effects:** Does not trigger cascading updates to related documents
- **Self-Contained Operation:** Operation is completely self-contained
- **Minimal Database Load:** Minimal impact on database performance

## Business Use Cases

### 1. Document Date Consistency
- **Financial Document Alignment:** Ensure financial documents have consistent date references
- **Accounting Period Alignment:** Align document creation dates with accounting periods
- **Reporting Consistency:** Improve consistency in date-based reporting and analysis
- **Data Quality Improvement:** Enhance overall data quality for date-related operations

### 2. Audit and Compliance
- **Audit Trail Consistency:** Maintain consistent audit trails for document dating
- **Regulatory Compliance:** Meet regulatory requirements for document date consistency
- **Date Accuracy:** Ensure accurate date representation for compliance reporting
- **Historical Integrity:** Maintain historical integrity while improving date consistency

### 3. Business Process Alignment
- **Workflow Date Consistency:** Ensure workflow processes use consistent date references
- **Process Integration:** Improve integration between processes that depend on dates
- **Business Rule Application:** Support business rules that require date consistency
- **Operational Clarity:** Provide operational clarity about document dating

### 4. Data Analysis and Reporting
- **Report Accuracy:** Improve accuracy of reports that group documents by date
- **Analytics Consistency:** Ensure analytics processes use consistent date references
- **Trend Analysis:** Support trend analysis that requires consistent date grouping
- **Performance Metrics:** Improve performance metrics based on document dates

## Date Synchronization Logic

### Synchronization Process
1. **Value Date Validation:** Checks if document has a valid value date
2. **Date Comparison:** Compares creation date with value date (date portions only)
3. **Time Extraction:** Extracts original creation time for preservation
4. **Date Combination:** Combines value date with original creation time
5. **Update Application:** Applies updated creation date to document

### Time Preservation Method
- **Precise Time Extraction:** Extracts time down to millisecond precision
- **Time Component Isolation:** Isolates time component from date component
- **Exact Preservation:** Preserves time exactly without any modification
- **Precision Maintenance:** Maintains full temporal precision

### Conditional Logic
- **Change Detection:** Only makes changes when dates actually differ
- **Efficiency Optimization:** Skips processing when no change is needed
- **Safe Execution:** Executes safely regardless of current date state
- **Graceful Handling:** Handles missing value dates gracefully

## Important Warnings

### ⚠️ Date Modification Impact
- **Creation Date Change:** Original creation date (date portion) is permanently modified
- **Time Preservation:** Time portion is preserved, but date context changes
- **Historical Context:** May affect historical context of when document was conceptually created
- **Date-Based Queries:** May affect queries that depend on specific creation dates

### ⚠️ Business Logic Dependencies
- **Date-Dependent Logic:** May affect business logic that depends on creation date
- **Workflow Impact:** May impact workflows that use creation date for routing or processing
- **Calculation Effects:** May affect calculations that use creation date as input
- **Integration Impact:** May affect integration with systems expecting original creation dates

### ⚠️ Data Consistency Considerations
- **Related Documents:** May create inconsistencies with related documents
- **Document Sequences:** May affect document sequences based on creation dates
- **Audit Trail Impact:** May affect audit trail interpretation
- **Reporting Changes:** May change results of existing reports

### ⚠️ Operational Considerations
- **DocumentFile Requirement:** Only works with DocumentFile entities
- **Value Date Dependency:** Requires valid value date to perform synchronization
- **No Rollback:** Changes cannot be easily rolled back once applied
- **Permanent Modification:** Creation date modification is permanent

## Best Practices

### Implementation Guidelines
- **Purpose Clarity:** Clearly understand why date synchronization is needed
- **Impact Assessment:** Assess impact on existing reports and business processes
- **Testing:** Test thoroughly with representative document data
- **Documentation:** Document the business rationale for date synchronization

### Data Management
- **Backup Procedures:** Backup creation dates before mass synchronization
- **Change Tracking:** Track which documents have been synchronized
- **Validation:** Validate results after synchronization
- **Monitoring:** Monitor impact on business processes after implementation

### Operational Management
- **Timing Considerations:** Consider when to run synchronization (off-hours, etc.)
- **Volume Planning:** Plan for processing large volumes of documents
- **Error Handling:** Plan for handling documents without value dates
- **User Communication:** Communicate changes to users who depend on creation dates

### Quality Assurance
- **Before/After Comparison:** Compare document states before and after synchronization
- **Spot Checking:** Perform spot checks on synchronized documents
- **Business Validation:** Validate that business processes work correctly after changes
- **Report Verification:** Verify that reports produce expected results

### Integration and Compatibility
- **System Integration:** Ensure compatibility with integrated systems
- **Report Updates:** Update reports that may be affected by date changes
- **Process Adjustment:** Adjust business processes that depend on creation dates
- **User Training:** Train users on any changes in document date behavior

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateInValueDate`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour
- [EAMakeCreationDateAlwaysBetween](EAMakeCreationDateAlwaysBetween.md) - Ensures creation time falls within specified hour range


</div>

