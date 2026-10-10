---
title: EAAutoFillSCPriceListPriority
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAAutoFillSCPriceListPriority

## Overview

Fills the **Priority** field of a sales or purchase price list automatically when the user leaves it empty. The new list gets a priority number one below the lowest priority already used by other lists of the same type, so users never have to look up the next free number. You can limit the search to lists that share certain header values (for example the same currency), so each group of lists keeps its own priority range.

## When This Action Runs

Attach it to a price list's save event that runs before validation (Priority is a required field, so it must be filled before the record is checked). It only works on price lists (Sales Price List or Purchase Price List).

## How It Works

1. **Checks the current priority** - If the price list already has a priority other than zero, the action stops and changes nothing.
2. **Builds the comparison group** - For each field name in Parameter 2, it takes the value of that field on the current price list. Only existing price lists of the same type with the same values in all those fields are considered.
3. **Finds the lowest priority** - It looks up the smallest priority among those matching price lists.
4. **Sets the priority** - If a lowest priority was found, the current list gets that number minus one. If no matching list has a priority yet, the current list gets the initial priority from Parameter 1 (or 999,999,999 if Parameter 1 is empty).

## Parameters

**Parameter 1:** Initial priority (default is 999,999,999) (Optional) - The priority given to the first list of a group, when no matching list has a priority yet. Enter a whole number. Default: 999,999,999.

**Parameter 2:** Field names that should be considered for finding the current minimum priority (CSV), use it to separate range of priorities based on any header field (Optional) - Comma-separated header field ids of the price list. Only lists with the same values in these fields are compared. Leave empty to compare against all price lists of the same type. Do not put spaces after the commas.

## Example

To keep a separate priority range per currency, set Parameter 2 to:

```
currency
```

A new USD price list then gets a priority one below the lowest priority among existing USD lists, regardless of the priorities used by EGP lists.

## Important Notes

- The action never overwrites a priority the user typed.
- Each new list gets a smaller number than the previous one, so priorities count down from the initial value.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoFillSCPriceListPriority`


</div>
