# Point of Sale

Most of Nama ERP runs in a web browser. **Nama POS** is the exception: a dedicated **desktop application** that runs right on the cash register, with a companion **Captain Order** mobile app for waiters. It is built this way for one simple reason — a point of sale cannot stop selling just because the internet went down.

![Nama POS main screen](../../ar/modules/pos/images/overview/pos-app-overview-en.png)

## Offline-first by design

A shop floor is a demanding place: the connection drops, a busy night brings a queue to the counter, and the customer in front of you still expects a receipt in seconds. So every register keeps its own **local database**, records every sale, return, payment and shift **locally first**, and **syncs** in the background up to the central Nama ERP — flushing any queued documents automatically once the connection returns.

This is the single most important idea about Nama POS, and it has its own page below.

## How this guide is organized

This guide is a tour of the register, roughly in the order you meet each part.

### Start here

- **[Nama POS — Overview](./pos-overview.md)** — what the system is, its pieces (register, Captain Order, server, peripherals), and who uses each.
- **[Getting Started at the Register](./pos-getting-started.md)** — launching, signing in, the slide menu, keyboard shortcuts, locking the screen, supervisor authorization, language & theme.

### Selling

- **[The Sales Invoice](./pos-sales-invoice.md)** — the main selling screen: adding items, the customer, discounts, holding and recalling a sale.
- **[Payment & Tender](./pos-payment-and-tender.md)** — taking the money: cash, card, split payments, coupons, credit notes, reward points.
- **[Returns & Replacements](./pos-returns-and-replacements.md)** — refunds, exchanges, credit notes, and depreciation on returned goods.

### Running the register

- **[Shifts & Cash](./pos-shifts-and-cash.md)** — opening and closing a shift, counting the drawer, pay-ins and pay-outs.
- **[Tables, Reservations & Captain Order](./pos-tables-and-restaurant.md)** — halls and tables, reservations, suspended orders, the call-center flow, and the waiter's mobile app.
- **[Item Add-ons](./pos-item-addons.md)** — sizes, colours, and extras (like sugar and milk for a coffee).
- **[Inventory Operations at the Register](./pos-inventory-operations.md)** — receiving, transferring, counting, and scrapping stock from the register.
- **[Reports & Tools](./pos-reports-and-tools.md)** — running reports, internal messages, the price checker, and maintenance utilities.

### Behind the scenes

- **[How POS Data Syncs with the Server](./pos-data-sync.md)** — what "sent" and "unsent" mean, and what to do when a document won't go up.

### Technical & reference

- **[Nama POS — Technical Points of Use Guide](./nama-pos.md)** — pole display, dimension filtering, API-key login, column widths, reset counter, and other technical tips.
- **[Free Items in POS: Claim at Scan and Reconciliation at Payment](./pos-free-items-claim-and-reconciliation.md)** — how promotional free items are claimed and reconciled.
- **[Fingerprint Login in Point of Sale](./pos-fingerprint-login.md)** — signing in with a fingerprint reader.
- **[Point of Sale FAQ](./pos-faq.md)** — quick answers to common questions.

::: tip Configuration is a separate topic
This guide is about **using** Nama POS day to day. Setting it up — defining registers, payment methods, security profiles, screen layouts, and the many POS settings — is documented separately.
:::
