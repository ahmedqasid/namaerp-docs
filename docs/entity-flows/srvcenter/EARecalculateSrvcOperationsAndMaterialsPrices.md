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

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EARecalculateSrvcOperationsAndMaterialsPrices`


</div>

