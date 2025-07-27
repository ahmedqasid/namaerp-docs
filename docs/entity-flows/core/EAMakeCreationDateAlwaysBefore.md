---
title: EAMakeCreationDateAlwaysBefore
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBefore

**This document was generated using Claude.ai**

## Overview

This entity flow adjusts document creation dates to ensure they always occur before a specified hour of the day. It synchronizes the creation date with the value date and modifies the creation time by subtracting random milliseconds until the time is before the specified hour. This action is essential for enforcing business rules about document timing and ensuring compliance with operational schedules.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for document date enforcement
- **Target:** DocumentFile entities requiring creation time constraints
- **Purpose:** Ensure document creation times comply with business hour limitations
- **Timing:** Typically runs during document creation or when date/time validation is required

## How It Works

### 1. Document Date Validation
- **Value Date Check:** Verifies that the document has a valid value date
- **Date Synchronization:** Aligns creation date with value date for consistency
- **Time Extraction:** Preserves original creation time for adjustment
- **Date Context Analysis:** Analyzes current date and time context

### 2. Time Adjustment Process
- **Hour Comparison:** Compares current creation hour with specified maximum hour
- **Backward Adjustment:** Subtracts random milliseconds to move time backward
- **Target Achievement:** Continues adjustment until creation hour is before specified hour
- **Start-of-Day Boundary:** Ensures adjustments don't go before start of day

### 3. Safe Time Calculation
- **Start-of-Day Calculation:** Calculates safe start-of-day boundary for adjustments
- **Random Seed Usage:** Uses consistent random seed for predictable behavior
- **Millisecond Precision:** Performs adjustments at millisecond level for accuracy
- **Boundary Protection:** Prevents adjustments from creating invalid times

### 4. Result Application and Validation
- **Creation Date Update:** Updates document creation date with adjusted time
- **Consistency Maintenance:** Maintains consistency between creation and value dates
- **Validation Enforcement:** Enforces the before-hour requirement consistently
- **Business Rule Compliance:** Ensures compliance with business timing requirements

## Key Features

### Document Date Management
- **Value Date Synchronization:** Synchronizes creation date with document value date
- **Time Constraint Enforcement:** Enforces creation times to be before specified hour
- **Business Hour Compliance:** Supports business hour and operational time requirements
- **Flexible Hour Configuration:** Configurable hour parameter for different business needs

### Smart Time Adjustment
- **Backward Time Movement:** Intelligently moves time backward to meet hour requirements
- **Random Distribution:** Uses random distribution to avoid clustering at specific times
- **Same-Day Preservation:** Keeps adjustments within the same calendar day
- **Natural Time Progression:** Creates natural-looking time distributions

### Safety and Performance
- **Infinite Loop Protection:** Built-in protection against infinite processing loops
- **Boundary Validation:** Validates time boundaries to prevent invalid dates
- **Error Handling:** Comprehensive error handling for edge cases
- **Performance Optimization:** Optimized for performance with safety limits

## Parameters

### Parameter 1: Hour (Required)
- **Type:** Integer (0-23)
- **Purpose:** Maximum hour before which creation time must occur
- **Format:** Hour in 24-hour format (0-23)
- **Default:** 12 (noon) if parameter is empty or invalid
- **Examples:** `10`, `13`, `23`, `8`

**Hour Configuration Examples:**
```
# Morning deadline before 9 AM
9

# Pre-lunch deadline before noon
12

# Afternoon deadline before 3 PM
15

# Evening deadline before 6 PM
18

# End-of-business before 5 PM
17
```

**Hour Range Guidelines:**
- **1-5:** Early morning deadlines (1 AM to 5 AM)
- **6-11:** Morning deadlines (6 AM to 11 AM)
- **12-17:** Afternoon deadlines (noon to 5 PM)
- **18-23:** Evening deadlines (6 PM to 11 PM)
- **0:** Midnight deadline (rarely used)

## Database Tables Affected

### DocumentFile Creation Date
- **Creation Date Field:** Updates creation date field with adjusted time
- **Timestamp Modification:** Modifies timestamp to comply with hour requirements
- **Value Date Alignment:** Ensures creation date aligns with value date
- **Audit Trail Updates:** Updates audit trail with adjusted creation times

### Document Date Consistency
- **Date Field Synchronization:** Synchronizes related date fields for consistency
- **Document Timeline:** Maintains proper document timeline and sequence
- **Processing Date Updates:** May affect processing-related date fields
- **Time-Dependent Operations:** Affects operations dependent on creation time

### No External Impact
- **Isolated Changes:** Changes are isolated to the target document
- **No Cascading Effects:** Does not trigger cascading updates to related documents
- **Self-Contained Operation:** Operation is self-contained within document boundaries
- **Minimal Database Load:** Minimal impact on database performance

## Business Use Cases

### 1. Business Hour Compliance
- **Operating Hour Enforcement:** Ensure documents are created within business operating hours
- **Cut-off Time Management:** Enforce document creation cut-off times
- **Service Window Compliance:** Align document creation with service availability windows
- **Regulatory Compliance:** Meet regulatory requirements for document timing

### 2. Financial and Accounting Controls
- **Financial Cut-off Enforcement:** Enforce financial period cut-off times
- **Accounting Period Compliance:** Ensure documents fall within correct accounting periods
- **Settlement Deadline Management:** Align with payment and settlement deadlines
- **Audit Trail Consistency:** Maintain consistent audit trails for financial documents

### 3. Operational Workflow Management
- **Process Deadline Enforcement:** Enforce deadlines for operational processes
- **Shift-Based Processing:** Align document creation with specific work shifts
- **Resource Availability:** Ensure documents are created when resources are available
- **System Integration Windows:** Align with external system integration schedules

### 4. Service Level Management
- **SLA Compliance:** Ensure document creation meets service level agreements
- **Customer Service Hours:** Align with customer service operating hours
- **Peak Hour Avoidance:** Avoid document creation during peak processing hours
- **Maintenance Window Avoidance:** Prevent document creation during maintenance windows

## Time Adjustment Algorithm

### Backward Time Movement
- **Millisecond Subtraction:** Subtracts random milliseconds to move time backward
- **Hour Target:** Continues adjustment until creation hour is before specified hour
- **Random Distribution:** Uses seeded random (1500) for consistent behavior
- **Safe Range Calculation:** Calculates safe time range for adjustments

### Boundary Management
- **Start-of-Day Protection:** Prevents time adjustments from going before start of day
- **Safe Range Determination:** Determines safe time range for backward movement
- **Overflow Prevention:** Prevents time adjustments from creating invalid times
- **Boundary Validation:** Validates all time boundaries before adjustment

### Performance and Safety
- **Loop Limitation:** Limits adjustment loops to prevent infinite processing (50,000 iterations)
- **Efficient Calculation:** Uses efficient calculation methods for time adjustment
- **Memory Optimization:** Minimizes memory usage during adjustment process
- **Error Recovery:** Provides error recovery for boundary edge cases

## Important Warnings

### ⚠️ Document Timing Integrity
- **Original Time Loss:** Original creation time is permanently modified
- **Time Sequence Issues:** May affect time-based document sequences
- **Audit Trail Impact:** Changed creation times may have audit implications
- **Integration Timing:** May affect integration with systems expecting original times

### ⚠️ Business Process Impact
- **Workflow Dependencies:** May impact workflows dependent on precise creation timing
- **Time-Dependent Calculations:** May affect calculations dependent on creation time
- **Document Ordering:** May affect document ordering based on creation time
- **Process Triggers:** May affect process triggers based on creation timing

### ⚠️ Performance and System Impact
- **Processing Overhead:** Time adjustment adds overhead to document creation
- **Loop Protection Triggers:** Infinite loop protection may trigger in edge cases
- **Random Calculation Cost:** Random number generation adds computational cost
- **Boundary Edge Cases:** Be aware of edge cases near start-of-day boundaries

### ⚠️ Configuration and Data Requirements
- **DocumentFile Requirement:** Only works with DocumentFile entities
- **Value Date Dependency:** Requires valid value date on the document
- **Hour Parameter Validation:** Hour parameter must be valid (0-23)
- **Business Alignment:** Ensure hour parameter aligns with business requirements

## Best Practices

### Configuration and Setup
- **Business Hour Analysis:** Analyze business requirements before setting hour parameters
- **Time Zone Coordination:** Coordinate hour settings with system time zones
- **Documentation Requirements:** Document business rationale for hour limitations
- **Regular Review Process:** Review hour settings regularly for continued relevance

### Implementation Guidelines
- **Comprehensive Testing:** Test with various creation times and hour settings
- **Edge Case Validation:** Test edge cases near start-of-day and hour boundaries
- **Performance Impact Testing:** Test performance impact with large document volumes
- **Integration Testing:** Test integration with time-dependent business processes

### Monitoring and Maintenance
- **Time Distribution Analysis:** Monitor distribution of adjusted creation times
- **Performance Impact Monitoring:** Monitor performance impact of time adjustments
- **Error Rate Monitoring:** Monitor for infinite loop protection triggers
- **Business Impact Assessment:** Regularly assess business impact of time adjustments

### Document Management
- **Audit Trail Documentation:** Document time adjustments in audit trails
- **Change Impact Analysis:** Analyze impact of time changes on document workflows
- **Stakeholder Communication:** Communicate time adjustment policies to stakeholders
- **Compliance Review:** Review compliance implications of time modifications

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBefore`

**Related Actions:**
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>

