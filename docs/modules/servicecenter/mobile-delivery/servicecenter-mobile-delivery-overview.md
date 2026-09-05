---
entities: [MobDeliveryDoc, MultiMobDeliveryDoc]
---
# Delivering with the Driver App

::: info Required licence
`srvcenter-mobile-delivery`. All three documents in this folder are gated behind it.
:::

::: danger These documents have nothing to do with vehicles
Read this before anything else, because the folder's position inside Service Center makes the wrong reading almost irresistible.

**Mobile Delivery has no connection whatsoever to car delivery.** It is not the [Car Final Delivery](/modules/servicecenter/car-sales/car-final-delivery.md), it does not hand a sold car over to a buyer, it does not touch the [car register](/modules/servicecenter/cars-setup/car-master-file.md), and no code path connects the two. A delivery line here can point at a sales invoice, a sales return, a work task or an invoice receipt document — a car final delivery is not even an option.

What it actually is: **the route sheet for a courier carrying goods to customers**, driven from the Nama Delivery phone app. If you came here looking for how a sold car is handed over, that belongs to the [car sales cycle](/modules/servicecenter/car-sales/car-sales-cycle.md) and this is the wrong folder.
:::

## What it is for

Al-Sahra Motors sells spare parts over the counter and also runs a small van that takes parts out to fleet customers around Riyadh. Every morning somebody has to decide which of yesterday's invoices go on the van, in what order, and with which crates and cool-bags. At the end of the day somebody has to know which drops actually happened.

That is the whole job of this sub-module. You reach it from **Service Center → Mobile Apps - Service Center**, and it consists of three documents:

| Document | Arabic | What it is |
|---|---|---|
| **Mobile Delivery Document** | مستند الحركة | One courier's route sheet — a list of stops for the day. |
| **Multi Mobile Delivery Document** | مستند حركة مجمع | A batch generator. Collects invoices and work tasks by date and time window and produces one route sheet per group. |
| **Invoice Receipt Document** | مستند استلام الفاتورة | What the customer actually received against a delivered sales invoice, and what packaging came back. |

The first two are covered on the [delivery documents page](/modules/servicecenter/mobile-delivery/servicecenter-mobile-delivery-documents.md); the third has [its own page](/modules/servicecenter/mobile-delivery/servicecenter-invoice-receipt-document.md).

## What these documents change

Very little, and that is the honest answer.

- **No accounting effect.** Neither the delivery document nor the batch document produces a journal entry. There are no accounts on their [توجيه](/modules/servicecenter/document-terms/servicecenter-terms-cars-and-other.md) to fill in, and nothing reaches the ledger when they commit.
- **No inventory effect of their own.** The batch document moves no stock at all.
- **One real effect.** A Mobile Delivery Document can optionally generate **stock transfers** that move packaging items — crates, boxes, cool-bags — onto the courier's own locator, so that what is riding in the van is visible in the warehouse figures. That happens only when the توجيه is configured for it, and the mechanics are on the delivery documents page.

Everything else the sub-module does is record-keeping: which stop belongs to which courier, when the courier arrived, what state the drop ended in, and what the courier said about it.

## The courier's day

The delivery document is written for a phone app the courier carries, not for the Nama screen. The flow, from the courier's side:

1. **The courier opens the app and sees the day's stops.** The list is drawn from delivery-document lines where the courier is the logged-in employee — or where no courier has been named at all — whose delivery state is still open, that carry no courier remarks yet, and whose value date falls inside a recent window.

   ::: info The collection window is configurable
   The app only shows lines from roughly the last few days; on a fresh installation that window is **three days**. If a courier reports that yesterday's stop is missing from the app, that window is the first thing to check.
   :::

2. **The courier checks in.** Check-in records the time and the GPS position on a *time check* line of the document. A second check-in is refused before the matching check-out, so a courier cannot open two shifts at once. Check-out closes the line with its own time and position.

3. **The app can re-order the stops.** The courier asks for the route to be arranged, and the stops come back in driving order rather than the order somebody happened to type them in.

4. **At each stop the courier records what happened.** Each line carries a **delivery state** with four values — *Initial*, *Delivered*, *Customer Not Available* and *Moved* — plus the arrival date and time, the customer address as the courier found it, free remarks, and a voice note.

5. **The courier can raise work from the road.** Beyond updating stops, the app can create a receipt voucher for cash collected, a sales return, an item request, a sales order, a work task, and a suggestion or complaint. Those are ordinary Nama documents; they are not part of the delivery document itself.

::: warning Courier edits bypass the document's own checks
When the app writes the delivery state, the arrival time, the address, the remarks or the voice note back to a line, it writes **straight onto the line** — the delivery document is not opened for editing, its validations do not run, and its effects are not re-applied.

This is expected behaviour, not a fault to report, but support staff need to know it for two reasons. First, changes made from the app do not appear in the document's editing history the way a change made on the Nama screen would, so an apparently unexplained value on a line is usually the courier. Second, whatever the document would normally check on save is simply not checked for those fields.
:::

## Addresses go back onto the customer file

One thing on the delivery document reaches outside it. The courier types the address as actually found — *"gate 4, behind the mosque"* — and the delivery screen has an action that copies the addresses from the selected lines **back onto the customer master files**.

That is deliberate, and it is how a delivery operation gradually cleans up its address book. But it is a master-file change made from a document screen, so treat it accordingly: it is not local to the document, and it will affect every future document raised for that customer.

::: warning One bad line stops the rest
If a selected line's recipient is not a party that can hold contact information, the copy stops there — the remaining selected lines are silently skipped rather than processed. After running the action on a large selection, spot-check that the addresses you expected actually landed.
:::

## Where to read next

- [Delivery Documents](/modules/servicecenter/mobile-delivery/servicecenter-mobile-delivery-documents.md) — the single route sheet and the batch generator, with the setup rules that keep them usable.
- [Invoice Receipt Document](/modules/servicecenter/mobile-delivery/servicecenter-invoice-receipt-document.md) — recording what the customer actually received and crediting the shortfall.
