# Free Items in POS: Claim at Scan and Reconciliation at Payment

When you have a promotion of the "buy one item and get another for free" type, the default behavior in the POS is to add the free item to the invoice **immediately** upon adding the qualifying item. This behavior suits many businesses, but not all.

Imagine a supermarket running a promotion "buy a large bottle of oil and get a small bottle free." If the system automatically added the small bottle the moment the cashier scanned the large bottle, a line item would appear in the invoice for something the customer never picked up from the shelf! The correct approach here is for the customer to pick up the small bottle themselves, and the cashier scans its barcode just like any other item — the system then recognizes it and makes it free.

This is exactly what the option **"Do not add free items automatically (claim at scan or reconcile at payment)"** in the POS settings provides.

## Activating the Feature

From the **POS Settings (POS Configuration)** screen, enable the option:

* **Do not add free items automatically (claim at scan or reconcile at payment)**

Next to it you will find the complementary option:

* **Free items must be added before payment** — determines whether the cashier can complete payment without fulfilling the free items or not (explained below).

## How Does the System Work After Activation?

After enabling the option, the system behavior changes as follows: when a qualifying item for a free-items promotion is added, the system does **not** add the free item automatically. Instead, it keeps an internal "entitlement" record that says: this invoice is entitled to such-and-such a quantity of a specific item (or a group of items) for free.

After that, the free item can be claimed in two ways:

### First Method: Claim at Scan During the Sale

When the cashier scans a barcode of an item that matches one of the pending entitlements in the invoice, the system recognizes it immediately and converts the line into a **free line** (price zero) linked to the original qualifying item line.

The system also handles quantities intelligently:

* If the entitlement is "one free unit" and the cashier scans one unit → the entire line becomes free.
* If the cashier scans a **larger quantity** than the entitlement (for example, 3 units while the entitlement is only 1) → the system automatically splits the line: one unit in a free line, and the remaining two units in a paid line at the regular price.

### Second Method: Reconciliation at Payment

What if the cashier completely forgets about the free items and presses the payment button directly? Here the system intervenes in two steps:

**First — Automatic reconciliation:** The system reviews all lines in the paid invoice. If it finds a line matching a pending entitlement (the customer already bought the item they were entitled to for free!), it automatically converts it to a free line — splitting the quantity if needed — and displays a notification to the cashier with a list of items that have become free:

> The following free items were automatically added to the invoice:

**Second — Pending free items screen:** If after reconciliation there are still unfulfilled entitlements, a screen appears showing the cashier a list of the remaining free items and their quantities, along with a barcode scan field. The customer picks up the items from the shelf, the cashier scans them one by one, and each scanned item is added as a free line while the remaining quantity shown decreases.

The screen also includes a search button that opens an item search screen **restricted to eligible items only** — useful if an item's barcode is damaged or the cashier wants to select manually.

When all items are complete, the message "All free items have been added" appears, and the cashier can press **Continue to Payment** to complete the payment normally.

::: tip
If the cashier scans an item that does not match any pending entitlement, the system rejects it with the message "The scanned item is not part of any pending free offer" — so there is no way to accidentally add unentitled free items.
:::

## What If the Customer Does Not Want the Free Item?

This is where the **"Free items must be added before payment"** option comes in:

* **Disabled:** The "Continue to Payment" button on the pending items screen remains always available, and the cashier can proceed and complete the invoice without the remaining free items (the customer waived them).
* **Enabled:** The "Continue to Payment" button is disabled until all free items are fulfilled — suitable for businesses that consider the free item an inseparable part of the promotion.

## Free Item Groups

Promotions are not limited to a specific free item; a promotion might be "buy X and choose a free item from a group of items." In this case:

* Any item from the group that the cashier scans is accepted as a valid claim.
* On the pending items screen, the group name is shown with the phrase "Choose an item from:" followed by a list of the group's items.

## Notes Worth Paying Attention To

* **Deleting a free line:** If the cashier deletes a free line from the invoice, the entitlement becomes pending again and will reappear on the pending items screen at payment.
* **Deleting the qualifying item:** If the line of the item that generated the entitlement is deleted, entitlements are automatically recalculated and the associated entitlement is dropped.
* **Captain Order invoices:** The same behavior is supported in the mobile application (Captain Order); reconciliation and claim at scan are handled through the app, and pending free items are shown before completing payment.

::: warning
For invoices with a very large number of lines, entitlements are recalculated for all lines at payment, which may take a noticeably longer time.
:::
