# General Questions About GUI Post Actions

## How to Automatically Recalculate the Price When Selecting a Lot?

In a sales invoice, when a lot is selected for one of the items, I need the system to automatically update the price if there is a custom price for that lot in the price list, or if the lot is included in an offer that includes a discount.
Note that the system already recalculates the price correctly when the quantity is modified, but this requires manually changing the quantity after selecting the lot.

**Solution:**
To achieve this, you can set up a GUI Post Action linked to the lot field (`lotId`) that triggers the GUI Post Action of the quantity field (`primeQty.value`). This linkage ensures that the system recalculates the price immediately after selecting the lot without the need for a manual quantity change.

::: details JSON for Direct Import
```json
{
  "lines": [
    {
      "forType": "SalesInvoice",
      "fieldID": "details.specificDimensions.lotId",
      "expression": "code=code",
      "callPostActorOfField": "details.quantity.quantity.primeQty.value"
    }
  ]
}
```
:::
