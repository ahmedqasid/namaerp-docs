---
title: EARecalculateSrvcOperationsAndMaterialsPrices
module: srvcenter
---


<div class='entity-flows'>

# EARecalculateSrvcOperationsAndMaterialsPrices

**This document was generated using Claude.ai**

## Overview

Recalculates pricing for service operations and materials on service center jobs by updating unit prices, hourly rates, and total prices based on current pricing configurations. Ensures service estimates reflect the most current pricing data from master price lists and operation definitions.

## When This Action Runs

Manual execution on service center jobs when pricing needs to be updated. Typically used after price list changes, operation updates, or when service estimates need to reflect current market rates before customer presentation or job approval.

## How It Works

1. **Starts editing** - Puts the service job in edit mode
2. **Recalculates task prices** - Updates prices for all service operations and tasks
3. **Recalculates material prices** - Updates unit prices for all materials
4. **Commits changes** - Saves the updated job with new pricing

## Task Price Calculation Logic

### For Operations with Total Pricing Strategy
- Finds model-specific total price from operation model prices
- Uses manufacturer SRP or standard total price based on configuration
- Sets total hours, hour price, and count to zero
- Sets total price to the model-specific amount

### For Operations with Hourly Pricing Strategy
- Processes slave task lines under the operation
- Updates each task's hour price and total price from operation definition
- Calculates total based on hours × rate × count

### For Individual Tasks (No Operation)
- Gets hours and hourly rate from task definition
- Calculates total price as: hours × hourly rate × count
- Updates all pricing fields on the task line

## Material Price Calculation

- Retrieves current unit price from material item master
- Uses job dimensions for price calculation context
- Updates unit price field on each material line

## Parameters

This action does not require parameters - it works based on current master data pricing.

## Database Tables Affected

- **Service Job Tasks** - Updates hour prices, total hours, and total prices
- **Service Job Materials** - Updates unit prices
- **Service Operations** - References operation pricing data (read-only)
- **Task Definitions** - References task pricing data (read-only)
- **Item Master** - References material pricing data (read-only)

## Important Warnings

### ⚠️ Price Overwriting
- Overwrites all existing pricing on the job without warning
- Manual price adjustments will be lost
- No backup of previous pricing values

### ⚠️ Master Data Dependencies
- Relies on accurate pricing in operation definitions
- Depends on current item master pricing for materials
- Missing or incorrect master data causes incorrect pricing

### ⚠️ Configuration Impact
- Service price strategy configuration affects which prices are used
- MSRP vs standard pricing may produce different results
- Configuration changes affect all price calculations

### ⚠️ Model-Specific Pricing
- Operation pricing depends on product model matching
- Missing model prices may result in zero pricing
- Incorrect model assignments cause pricing failures

### ⚠️ Task Hierarchy
- Master-slave task relationships must be properly maintained
- Slave tasks depend on master operation definitions
- Broken task hierarchies may cause pricing errors

### ⚠️ Editing State Requirements
- Job must be in editable state for pricing updates
- Committed or locked jobs may fail to update
- Document workflow state affects processing

### ⚠️ Calculation Complexity
- Multiple pricing strategies require different calculation methods
- Task vs operation pricing logic varies significantly
- Mixed pricing strategies on same job may cause confusion

### ⚠️ Currency and Rounding
- Price calculations may involve currency conversions
- Rounding rules affect final pricing amounts
- Precision settings impact calculation accuracy

### ⚠️ Performance Impact
- Recalculates all tasks and materials regardless of changes needed
- Multiple database lookups for each line item
- Large jobs with many operations may have performance issues

### ⚠️ Business Rule Bypassing
- May override manual pricing decisions
- Doesn't validate pricing appropriateness for job context
- Consider approval workflows for pricing changes

### ⚠️ Task Count Impact
- Uses count field as multiplier for task pricing
- Zero or missing counts may result in zero total prices
- Verify count values are appropriate for calculations

### ⚠️ Operation vs Task Logic
- Different calculation paths for operations vs individual tasks
- Logic complexity may cause unexpected pricing results
- Verify pricing logic matches business requirements

### ⚠️ Error Accumulation
- Uses accumulating result pattern for error collection
- Edit failures prevent all pricing updates
- Single error may block entire recalculation process

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EARecalculateSrvcOperationsAndMaterialsPrices`


</div>

