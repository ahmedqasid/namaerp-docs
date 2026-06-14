# Freight Management

Welcome to the Freight Management module of Nama ERP — the module built specifically for shipping, forwarding, customs-clearance, postal, and logistics companies, where the "goods" you sell aren't items on a shelf but a **service**: moving a container from port to port, clearing a shipment through customs, delivering a parcel to a customer's door.

## Who is this module for?

Most ERP modules revolve around items entering and leaving a warehouse. Your freight business is different: you sell time, routes, and services. You buy ocean freight, clearance, and trucking from suppliers (shipping lines, agents, hauliers), then resell them to your customer at a margin. The Freight Management module is built around this logic from the ground up:

- **No stock items, no balances** — instead, **service items** (ocean freight, customs clearance, trucking, genset, courier…).
- **One central document** — the *Operation Order* — that gathers every detail of a shipment in one place, and from which bills of lading and invoices branch off.
- **Purchase and sales price lists** per service, with profit **markups** calculated automatically.
- **E-invoicing** that intelligently handles the "agent" model, where part of the amount is a pass-through cost and part is your commission.

Alongside freight and logistics, the module includes a complete **International Postal System (IPS)**: receiving mail receptacles, manifesting items, transferring between offices, sorting, and final last-mile delivery. We cover it in a separate section of this guide.

## The Big Picture

Let's follow a single shipment from start to cash collection.

A customer (the Shipper) contacts you to move a container from one port to another. You start by creating an **Operation Order** — the complete shipment file: who the shipper, consignee, and agent are; which loading and discharge ports; which vessel and voyage; the container type; and the services required (ocean freight? clearance? trucking?). Inside the operation order you enter each service line with its cost and selling price.

Once the shipment data is confirmed, you generate a **Bill of Lading** from the operation order — the official shipping document proving receipt of the goods and the terms of carriage. Then you issue a **Sales Invoice** to the customer for the service value, and a **Purchase Invoice** to the suppliers (shipping line, clearance agent…) for their share. The difference between the two is your profit on the shipment.

Throughout the journey, the operation order tracks its **status** (under operation, shipped, arrived…), and you can issue release documents (Telex Release), short shipments, and duplicate the whole operation with one click.

## How documents work in Nama ERP

::: tip Understanding document states
Unlike systems that require a separate "posting" step, Nama ERP acts immediately:

**Draft mode:** Create and edit a document with no accounting effect.

**Saved:** Once a document is saved out of draft, its accounting effect is created **immediately** (revenue/cost/customer and supplier balances).

**Edits:** Any change to a saved document is reflected at once, with no separate confirm step.
:::

## Licensing

Every document in this module is gated behind the module license `frm` (NaMa Freight Management). If the module isn't enabled in your license, its menus won't appear.

## How this guide is organized

The module is large, so we've split it into two main areas that mirror how the system itself is organized.

### Freight & Logistics

- **[Master Files](./freight-master-files.md)** — the infrastructure everything builds on: service items, containers and their types and sizes, vessels, ports, sailing schedules, commodities, countries, and locations.
- **[Operation Orders](./operation-orders.md)** — the central shipment document and everything that branches from it: services, statuses, release, short shipments, and operation-order delivery/receipt/transfer.
- **[Bills of Lading](./bills-of-lading.md)** — the official shipping document, its lines and data.
- **[Price Lists & Markups](./freight-pricing.md)** — sales and purchase prices per service, profit markups, and updating operation-order services from them.
- **[Invoices & Returns](./freight-invoicing.md)** — sales orders, sales and purchase invoices, returns, payments, and linking cost to sale.

### International Postal System (IPS)

- **[Postal System Overview](./ips-postal-intro.md)** — the core concepts: mail items, receptacles, offices, and receipt/delivery areas.
- **[Mail Items](./ips-mail-items.md)** — the mail-item lifecycle: manifesting, transfer between offices, adjustment, stock taking, retention, and sorting.
- **[Receptacles](./ips-receptacles.md)** — receiving receptacles, dispatching them on route schedules, and the customs manifest.
- **[Delivery Service](./ips-delivery.md)** — delivery requests and invoices, delivery service items and prices, delivery areas, and non-delivery handling.

### E-Invoicing

- **[E-Invoicing Handling](./freight-einvoicing.md)** — how the freight module sends its invoices to the tax authority, and how it handles the agent/commission model and service-item tax codes.
