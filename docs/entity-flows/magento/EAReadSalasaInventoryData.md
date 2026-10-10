---
title: EAReadSalasaInventoryData
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReadSalasaInventoryData

## Overview

Reads the current stock that the Salasa fulfilment platform holds for you and records it in Nama as one committed `FormDoc4` document, one line per item and Salasa warehouse. This gives you a snapshot of Salasa's quantities (sellable and damaged) inside the ERP, which you can report on or compare with Nama's own stock.

## When This Action Runs

From a Task Schedule, on a schedule (for example once a day) or on demand with **Run Now**. It ignores the record it runs on; every run creates a new document.

## How It Works

1. **Finds the shipping site** - Looks up the Ecommerce Shipping Site (`EcommerceShippingSite`) by the code or ID in parameter 1 and stops with "Can not find ecommerce shipping site with code ..." if none is found.
2. **Signs in to Salasa** - Uses the site's stored access token, or requests a new one with the site's credentials when it is missing or expired.
3. **Reads the inventory** - Reads Salasa's inventory list, 100 rows per page, until there are no more pages.
4. **Creates the document** - Creates a new `FormDoc4` and fills its header from the fields map in parameter 2 (book, term and any other header values).
5. **Fills the lines** - Adds one detail line per Salasa row:
   - **Related Entity 1** (`details.relatedEntity1`) - the Nama item linked to the SKU in the site's item linker
   - **Text 1** (`details.text1`) - the Salasa warehouse code
   - **Text 2** (`details.text2`) - the SKU
   - **Number 1** (`details.number1`) - the quantity
   - **Number 2** (`details.number2`) - the damaged ("hurt") quantity
   - **Date 1** (`details.date1`) - the date Salasa last updated the row
6. **Commits** - Copies the book's dimensions to the document, gives it a code from the book if it has none, and commits it.

## Parameters

**Parameter 1:** Ecommerce Shipping Site Code (Required) - The code (or ID) of the Ecommerce Shipping Site record that holds the Salasa connection and the item linker.

**Parameter 2:** Fields Map (Required) - The header values of the new `FormDoc4`, one `field=value` per line, written the same way as the field map of [EAGenerateEntityFromEntityAction](../core/EAGenerateEntityFromEntityAction.md). Text values go in single quotes, for example `book='SALASA'` and `term='SALASA'`, where `SALASA` stands for your own FormDoc4 book and term codes. The map is applied to the new, empty document itself, so use fixed values rather than references to another record.

## Important Notes

- Every SKU Salasa returns must be linked to an item, once only, in the item linker of the shipping site; otherwise the run fails and no document is created.
- Each run creates a new document. Nothing is updated or replaced, so schedule it only as often as you need snapshots.

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.integration.salasa.EAReadSalasaInventoryData`

## Related Actions

- [EAEcommerceShippingHandler](EAEcommerceShippingHandler.md)
- [EAGenerateEntityFromEntityAction](../core/EAGenerateEntityFromEntityAction.md)


</div>
