# Overdraft & Quantity Checking Configuration

This page documents the **Overdraft & Quantity Checking** tab. "Overdraft" means letting stock go negative — issuing or selling more than is on hand. These settings decide whether that is allowed, where, and how strictly the system enforces it.

::: info How the check works
Two checks can run when a stock document is saved. The **immediate balance check** compares total in vs. out and fails if you issue more than the current available balance. The **by-date check** replays the item's movements in date order and makes sure the balance never goes negative at any point in time. Whether a line is even subject to these checks is decided by an overdraft policy evaluated in priority order: the matching *Dimensions With Allowed Overdraft* row → the item's own policy → the item section's policy → the global policy below.
:::

## Overdraft Policy

**Over Draft Policy** `value.overDraftPolicy` — The company-wide fallback answer to "may stock go negative?". It is consulted only when an item and its section both defer (Inherited/empty). Set it to **No** as a safety default if most items should never be oversold and overdraft should be allowed only selectively; leave it **Yes** if your business routinely issues before receiving.

**Allow Creating Closing Entry if Negative Stock Balance Found** `value.allowClosingIfNegativeBalanceFound` — Governs the year-end / period-closing entry. When off, the system blocks closing if any item has a negative balance as of the period end (forcing you to fix negatives first). Turn on only if you deliberately close with negative balances.

**Do Not Check Overdraft with Recommit** `value.doNotCheckOverdraftWithRecommit` — When on, documents that were already committed and are being **automatically re-processed** skip the overdraft error, avoiding spurious failures during batch recomputation of documents that were valid when first saved.

**Max Days Count / Max Unprocessed Documents Count to Prevent Saving Stock Documents** `value.maxDaysCountToPreventSaveStockDocs` / `value.maxUnProcessedDocsCountToPreventSaveStockDocs` — A paired guard against a processing backlog. If a document is older than the *days* value **and** the number of stock documents still awaiting cost processing exceeds the *count* value, the save is blocked. Both must be set for the guard to activate; use them to stop users back-dating new stock documents while a large processing backlog exists.

## Allow Overdraft in Manufacturing & Assembly

By default, issues generated from manufacturing, assembly/processing, and stock transfers are **never** allowed to go negative — even when the item's own policy would permit it. The switches below relax that, each strictly for one kind of document.

::: danger Very dangerous — do not enable casually
These three options are flagged as critical: turning one on triggers a confirmation prompt. Enabling them lets production/transfer documents create negative stock, which can distort costs. Enable only when you must record production or movement before the matching materials/receipts are in stock, and you accept temporary negatives.
:::

**Allow Overdraft in Manufacturing Issues** `value.allowOverdraftInManufacturingIssues` — Lets stock issues generated from a manufacturing raw-material issue fall back to the normal item policy instead of being forced non-negative.

**Allow Overdraft in Assembly and Processing Issues** `value.allowOverdraftInAssemblyAndProcessingIssues` — The same relaxation for assembly/processing material consumption.

**Allow Overdraft in Stock Transfers** `value.allowOverdraftInStockTransfers` — The same relaxation for stock transfers (and issues generated from assembly documents).

**Dimensions with Allowed Overdraft** `value.dimensionsWithAllowedOverdraft` *(table)* — A per-line override of the overdraft policy by **warehouse**, **locator** and generic dimensions (sector / branch / department / analysis set / legal entity). Each row has a **policy** column (Allowed / Not Allowed) that wins over the item/section/global setting when a document line matches it — for example, to allow negative stock only in a transit warehouse. Not applied to real transfer documents.

## Quantity Check by Date

These settings tune the date-aware overdraft check — the one that guarantees the timeline never goes negative, which matters when documents are entered out of date order.

**Check Overdraft by Date** `value.checkOverdraftByDate` *(default on)* — Turns on the date-aware check. When saving, the system replays each item's movements chronologically and refuses to let the running balance go negative at any historical point, not just at the final total. Turn off only for performance when back-dating never happens.

**How Many Later Transactions to Check** `value.checkOverdraftNextTransCount` *(default 10)* — After validating the current document, the system also re-checks this many *later* transactions for the item to make sure inserting/editing this document doesn't push a future document negative. Increase for tighter guarantees on heavily back-dated data; set to 0 to disable the look-ahead.

**Include Reservation in Check Overdraft by Date** `value.includeReservationInCheckOverdraftByDate` — When on, the by-date balance also accounts for reserved quantities as of the document date, so reservations count toward availability on that date.

**Do Not Check Overdraft by Date for Reservation** `value.doNotCheckOverdraftByDateForReservation` — When on, the by-date check is skipped for reservation documents (useful if reservations may be made even when stock isn't available on that exact date, while issues stay strictly checked).

**Check Overdraft by Date Only** `value.checkQtyByDateOnly` — When on, only the by-date check runs and the simpler immediate balance check is skipped. This is what allows *ignoring dimensions* (for example warehouse) in the check, since that relaxation applies only to the by-date path.

**Check Overdraft by Date Only with Reservation** `value.checkQtyByDateOnlyWithReservation` — Overrides the option above specifically for reservation requests: **Yes** forces by-date-only, **No** forces both checks, **Like Quantities** follows whatever *Check Overdraft by Date Only* is set to. Use it when reservations and actual issues need different strictness.

**Enable Quantity-by-Date Check Exclusion for Warehouses / Locators** `value.enableIgnoreInReservationQtyCheckByDateForWarehouses` / `value.enableIgnoreInReservationQtyCheckByDateForLocators` — Master switches that let individual warehouses or locators be excluded from the reservation by-date check (via a flag on each warehouse/locator). Use when certain locations — quarantine, transit — should not count toward reservation availability. See the dedicated guide [Ignoring Specific Warehouses/Locators in Reservation Quantity Check by Date](../ignore-reservation-qty-check-by-date.md).

**Ignore Settings with Reservation** `value.reservationSettings` — Decides which "ignore dimensions" set reservations use: **Like Quantities** reuses the normal set below; **Separate** uses the dedicated reservation set, so reservations can ignore a different combination of dimensions than actual issues.

**Do Not Repeat Serial Number in More Than One Item** `value.doNotRepeatSerialNumberInMoreThanOneItem` — When on, a serial number may belong to only one item across the whole system; entering a serial already registered to a different item fails. Enable when serials are globally unique across your catalog.

**Do Not Consider the Following Dimensions in Overdraft by Date** `value.doNotConsiderDimensionsInOverdraftByDate` — A set of toggles (Size, Color, Revision, Box, Lot, Warehouse, Measures, Serial, Locator, Active %, Inactive %, Sub-item, Sector, Branch, Department, Analysis Set). Each one you switch on is *dropped* from the by-date balance, so quantities are pooled across it rather than checked separately — for example, ignoring Warehouse judges overdraft on total company stock by date instead of per warehouse. Takes effect together with the by-date-only path.

**Do Not Consider Dimensions in Overdraft by Date with Reservation** `value.doNotConsiderDimensionsInOverdraftByDateWithReservation` — The reservation-specific version of the toggle set above, used only when *Ignore Settings with Reservation* is **Separate**.

## Reservation

**Transfer Request Reserve Quantity Out Only** `value.transReqReserveQtyOutOnly` *(default on)* — Controls how a stock transfer request reserves stock. On, it reserves only the outgoing side at the source; off, it reserves both source (out) and destination (in).

**Cancel Reservation of Direct Parent Only** `value.cancelReservationOfDirectParentsOnly` — When a document cancels upstream reservations (via the document term's "cancel reservation" option), this limits the cascade: on, only the direct parent's reservation is released; off, the cancellation also cascades to further-related documents.

**Check Quantities in Reservation Documents** `value.checkQtiesInReservationDocs` *(default on)* — Whether reservation documents are subject to quantity/overdraft validation at all. On, you cannot reserve more than is available; off, reservation requests can reserve any quantity (e.g. soft holds / forecasting).

**Update Reservation Quantity with Prime Quantity Change** `value.updateReservationQtyWithPrimeQtyChange` — When on, editing the main quantity on a sales-order/invoice line automatically updates the reserved quantity to match, keeping reservations in sync with line edits.
