---
title: EAUpdateItemPricesFromPriceList
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUpdateItemPricesFromPriceList

## Overview

Recomputes the price of every item in a sales price list and writes it into a numeric field of the item card. The price is calculated by the normal sales pricing engine (the same one that prices invoice lines) for a quantity of 1, optionally for a given customer, legal entity and analysis set. Use it to keep a price stored on the item (for example for e-commerce or label printing) in step with the price lists.

## When This Action Runs

Attach it to a Sales Price List event (for example after save or after commit). It does not change the price list itself; it changes the items listed in it.

## How It Works

1. **Goes through the price list lines** - Lines without an item are skipped.
2. **Works out which colors and sizes to price**
   - If the line has a color or a size, only that color/size combination is priced.
   - If the line has neither, every color/size row of the item's sizes and colors grid is priced. Items with no such rows are skipped.
3. **Calculates the price** - Asks the pricing engine for the unit price of the item (with the color and size) for a quantity of 1, using the customer, legal entity and analysis set from the parameters when they are given.
4. **Skips zero prices** - If the result is empty or zero, nothing is written.
5. **Writes the price** - If the item uses colors or sizes, the price is written into the target field of the matching rows in the item's sizes and colors grid. Otherwise it is written into the target field on the item header.

## Parameters

**Parameter 1:** Customer Code (Optional) - Code of the customer to price for, so customer-specific prices and lists apply.

**Parameter 2:** Legal Entity (Optional) - Code of the legal entity to price for.

**Parameter 3:** Analysis Set (Optional) - Code of the analysis set to price for.

**Parameter 4:** Target Field1 (Required) - The field id that receives the price, on the item header or on the sizes and colors row, for example `n2`, `n3` or `n4`.

## Example

Write the price for customer `C0001` into the item's N2 field:

- Parameter 1: `C0001`
- Parameter 4: `n2`

## Important Notes

- The price list only decides which items are priced. The price itself comes from the pricing engine, so it can differ from the price typed on this list when another list applies to the item.
- On items that use colors or sizes, a color/size combination with no matching row in the item's sizes and colors grid is not written anywhere.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAUpdateItemPricesFromPriceList`

## Related Actions

- [EAUpdateItemPricesFromQuery](EAUpdateItemPricesFromQuery.md) - same price update for items chosen by a SQL query


</div>
