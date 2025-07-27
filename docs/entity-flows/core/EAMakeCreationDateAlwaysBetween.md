---
title: EAMakeCreationDateAlwaysBetween
module: core
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBetween

**This document was generated using Claude.ai**

## Overview

This entity flow adjusts document creation dates to ensure they always fall within a specified time window during the day. It synchronizes the creation date with the value date and modifies the creation time by adding or subtracting random milliseconds until the time falls between the specified start and end hours. This action is essential for enforcing business operation windows and ensuring documents are created within designated business hours.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows for time window enforcement
- **Target:** DocumentFile entities requiring creation time constraints within specific hours
- **Purpose:** Ensure document creation times fall within designated business operation windows
- **Timing:** Typically runs during document creation or when time window validation is required

## How It Works

### 1. Document Date Validation and Synchronization
- **Value Date Check:** Verifies that the document has a valid value date
- **Date Synchronization:** Aligns creation date with value date for consistency
- **Time Extraction:** Preserves original creation time for adjustment
- **Hour Range Validation:** Validates start and end hour parameters

### 2. Time Window Analysis
- **Current Hour Assessment:** Analyzes current creation hour against target window
- **Window Boundaries:** Calculates start and end time boundaries for the day
- **Adjustment Direction:** Determines whether to add or subtract time
- **Target Window Identification:** Identifies the target time window for adjustment

### 3. Intelligent Time Adjustment
- **Bidirectional Movement:** Moves time forward or backward as needed to reach target window
- **Random Distribution:** Uses random milliseconds for natural time distribution
- **Window Targeting:** Continues adjustment until time falls within specified hours
- **Boundary Respect:** Respects both start and end hour boundaries

### 4. Safe Processing and Result Application
- **Infinite Loop Protection:** Includes safeguards against infinite processing loops
- **Task Cancellation Support:** Supports task cancellation during long-running adjustments
- **Creation Date Update:** Updates document creation date with adjusted time
- **Business Rule Compliance:** Ensures compliance with business time window requirements

## Key Features

### Flexible Time Window Control
- **Configurable Hours:** Supports any start and end hour combination within a day
- **Business Hour Enforcement:** Enforces document creation within business operating hours
- **Time Window Validation:** Validates time window parameters for consistency
- **Precise Hour Control:** Hour-level precision for time window definition

### Smart Bidirectional Adjustment
- **Intelligent Direction:** Automatically determines whether to move time forward or backward
- **Random Distribution:** Uses random distribution to avoid clustering at window edges
- **Natural Time Progression:** Creates natural-looking time distributions within windows
- **Efficient Targeting:** Efficiently targets the desired time window

### Advanced Safety Features
- **Infinite Loop Protection:** Built-in protection against infinite processing loops (50,000 iterations)
- **Task Cancellation:** Supports system task cancellation during processing
- **Parameter Validation:** Comprehensive parameter validation with detailed error messages
- **Error Recovery:** Robust error recovery for edge cases and invalid parameters

## Parameters

### Parameter 1: Ignore (Not Used)
- **Type:** Any
- **Purpose:** This parameter is not used in the current implementation
- **Note:** Can be left empty or contain any value

### Parameter 2: Start Hour (Required)
- **Type:** Integer (0-23)
- **Purpose:** Starting hour of the time window (inclusive)
- **Format:** Hour in 24-hour format (0-23)
- **Examples:** `9`, `13`, `8`, `0`

### Parameter 3: End Hour (Required)
- **Type:** Integer (0-23)
- **Purpose:** Ending hour of the time window (exclusive)
- **Format:** Hour in 24-hour format (0-23)
- **Examples:** `17`, `18`, `12`, `23`

**Time Window Configuration Examples:**
```
# Business hours: 9 AM to 5 PM
Start Hour: 9
End Hour: 17

# Afternoon window: 1 PM to 6 PM
Start Hour: 13
End Hour: 18

# Morning window: 8 AM to noon
Start Hour: 8
End Hour: 12

# Extended hours: 7 AM to 7 PM
Start Hour: 7
End Hour: 19
```

**Parameter Validation Rules:**
- Start hour must be different from end hour
- Start hour must be less than end hour
- Both hours must be valid integers (0-23)
- Time window must span at least one hour

## Database Tables Affected

### DocumentFile Creation Date
- **Creation Date Field:** Updates creation date field with time adjusted to target window
- **Timestamp Modification:** Modifies timestamp to comply with time window requirements
- **Value Date Alignment:** Ensures creation date aligns with value date
- **Audit Trail Updates:** Updates audit trail with adjusted creation times

### Document Date Consistency
- **Date Field Synchronization:** Synchronizes related date fields for consistency
- **Document Timeline:** Maintains proper document timeline within business hours
- **Processing Date Updates:** May affect processing-related date fields
- **Time-Dependent Operations:** Affects operations dependent on creation time

### No External Impact
- **Isolated Changes:** Changes are isolated to the target document
- **No Cascading Effects:** Does not trigger cascading updates to related documents
- **Self-Contained Operation:** Operation is self-contained within document boundaries
- **Minimal Database Load:** Minimal impact on database performance

## Business Use Cases

### 1. Business Hour Enforcement
- **Operating Window Compliance:** Ensure documents are created within business operating windows
- **Service Hour Alignment:** Align document creation with customer service hours
- **Shift-Based Processing:** Ensure documents align with specific work shift schedules
- **Regulatory Compliance:** Meet regulatory requirements for document timing windows

### 2. Workflow and Process Management
- **Process Window Control:** Control when documents can be processed within workflows
- **Resource Availability:** Align document creation with resource availability windows
- **Integration Schedules:** Align with external system integration schedules
- **Batch Processing Windows:** Ensure documents fall within batch processing windows

### 3. Service Level Management
- **SLA Compliance:** Ensure document creation meets service level agreement windows
- **Response Time Management:** Manage response times within defined service windows
- **Customer Communication:** Align document creation with customer communication hours
- **Peak Hour Distribution:** Distribute document creation across optimal time windows

### 4. Financial and Operational Controls
- **Settlement Windows:** Align document creation with financial settlement windows
- **Accounting Period Management:** Ensure documents fall within accounting operation windows
- **Cut-off Time Management:** Manage document creation relative to daily cut-off times
- **Audit Window Compliance:** Ensure documents are created within audit-friendly windows

## Time Adjustment Algorithm

### Bidirectional Movement Logic
- **Current Position Analysis:** Analyzes current hour relative to target window
- **Direction Determination:** Determines whether to move time forward (add) or backward (subtract)
- **Window Boundary Calculation:** Calculates precise start and end boundaries for the day
- **Random Increment Selection:** Uses random milliseconds for natural distribution

### Adjustment Process
1. **Before Window:** If current hour is before start hour, adds random milliseconds to move forward
2. **After Window:** If current hour is at or after end hour, subtracts random milliseconds to move backward
3. **Within Window:** If current hour is within window, no adjustment needed
4. **Boundary Validation:** Ensures adjustments stay within the same calendar day

### Safety and Performance
- **Loop Limitation:** Limits adjustment loops to prevent infinite processing (50,000 iterations)
- **Task Cancellation:** Checks for task cancellation during long-running adjustments
- **Efficient Calculation:** Uses efficient calculation methods for time adjustment
- **Memory Optimization:** Minimizes memory usage during adjustment process

## Important Warnings

### ⚠️ Parameter Configuration Requirements
- **Hour Validation:** Start and end hours must be valid integers (0-23)
- **Window Logic:** Start hour must be less than end hour
- **Window Size:** Start and end hours cannot be the same
- **Business Alignment:** Time window must align with actual business requirements

### ⚠️ Document Timing Impact
- **Original Time Loss:** Original creation time is permanently modified
- **Time Sequence Effects:** May affect time-based document sequences
- **Audit Trail Impact:** Changed creation times may have audit and compliance implications
- **Integration Timing:** May affect integration with systems expecting specific timing

### ⚠️ Performance and System Considerations
- **Processing Overhead:** Time adjustment adds overhead to document creation
- **Loop Protection:** Infinite loop protection may trigger in edge cases
- **Task Cancellation:** Long-running adjustments may be cancelled by system
- **Random Calculation Cost:** Random number generation adds computational overhead

### ⚠️ Business Process Impact
- **Workflow Dependencies:** May impact workflows dependent on precise creation timing
- **Time-Dependent Calculations:** May affect calculations dependent on creation time
- **Document Ordering:** May affect document ordering based on creation time
- **Process Integration:** May affect integration with time-sensitive business processes

## Best Practices

### Configuration and Setup
- **Business Hour Analysis:** Analyze actual business hours before setting time windows
- **Window Size Planning:** Plan appropriate window sizes for natural document distribution
- **Time Zone Coordination:** Coordinate time windows with system time zones
- **Documentation:** Document business rationale for time window requirements

### Parameter Management
- **Validation Testing:** Test parameter validation with various hour combinations
- **Edge Case Testing:** Test edge cases at window boundaries
- **Business Hour Alignment:** Ensure parameters align with actual business operations
- **Regular Review:** Review time window settings regularly for continued relevance

### Implementation Guidelines
- **Comprehensive Testing:** Test with various creation times and window settings
- **Performance Testing:** Test performance impact with large document volumes
- **Integration Testing:** Test integration with time-dependent business processes
- **User Acceptance Testing:** Validate time windows meet business user expectations

### Monitoring and Maintenance
- **Time Distribution Analysis:** Monitor distribution of adjusted creation times within windows
- **Performance Monitoring:** Monitor performance impact of time adjustments
- **Error Rate Monitoring:** Monitor for infinite loop protection triggers
- **Business Impact Assessment:** Assess business impact of time window enforcement

### Operational Management
- **Window Adjustment Procedures:** Establish procedures for adjusting time windows
- **Exception Handling:** Plan for handling documents that need to be outside windows
- **Stakeholder Communication:** Communicate time window policies to stakeholders
- **Change Management:** Implement proper change management for window modifications

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBetween`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>

