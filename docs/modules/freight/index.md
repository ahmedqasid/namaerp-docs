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

The freight and clearance documents are gated behind the module license `frm` (NaMa Freight Management). The postal half has a licence of its own, `frm-ips` — so a licence can carry one without the other. If a licence is missing, its menus simply do not appear.

## How this guide is organized

The module is large, so we've split it into two main areas that mirror how the system itself is organized.

### Freight & Logistics

<LandingGrid>
  <LandingCard icon="🗂️" title="Master Files" link="/modules/freight/freight-master-files.md" details="The infrastructure everything builds on: service items, containers and their types and sizes, vessels, ports, sailing schedules, commodities, countries, and locations." />
  <LandingCard icon="📋" title="Operation Orders" link="/modules/freight/operation-orders.md" details="The central shipment document and everything that branches from it: services, statuses, release, short shipments, and operation-order delivery/receipt/transfer." />
  <LandingCard icon="📜" title="Bills of Lading" link="/modules/freight/bills-of-lading.md" details="The official shipping document, its lines and data." />
  <LandingCard icon="💲" title="Price Lists & Markups" link="/modules/freight/freight-pricing.md" details="Sales and purchase prices per service, profit markups, and updating operation-order services from them." />
  <LandingCard icon="🔁" title="From Supplier Rates to Customer Quotations" link="/modules/freight/freight-price-list-workflow.md" details="Price-list elements, turning supplier rates into quotations, re-pricing, and bulk rate changes with the Edit Purchase Price List." />
  <LandingCard icon="🧾" title="Invoices & Returns" link="/modules/freight/freight-invoicing.md" details="Sales orders, sales and purchase invoices, returns, payments, and linking cost to sale." />
  <LandingCard icon="🏬" title="Storage Locations" link="/modules/freight/freight-storage-locations.md" details="Locations and their capacity, and receiving, moving and releasing operation-order cargo." />
</LandingGrid>

### International Postal System (IPS)

<LandingGrid>
  <LandingCard icon="📮" title="Postal System Overview" link="/modules/freight/ips-postal-intro.md" details="The core concepts: mail items, receptacles, offices, and receipt/delivery areas." />
  <LandingCard icon="✉️" title="Mail Items" link="/modules/freight/ips-mail-items.md" details="The mail-item lifecycle: manifesting, transfer between offices, adjustment, stock taking, retention, and sorting." />
  <LandingCard icon="👜" title="Receptacles" link="/modules/freight/ips-receptacles.md" details="Receiving receptacles, dispatching them on route schedules, and the customs manifest." />
  <LandingCard icon="🚚" title="Delivery Service" link="/modules/freight/ips-delivery.md" details="Delivery requests and invoices, how the sort creates and prices them, and non-delivery handling." />
  <LandingCard icon="🔌" title="IPS Integration" link="/modules/freight/ips-integration.md" details="Reading data from the external IPS server, reporting events, and following up failed events." />
</LandingGrid>

### Setup

<LandingGrid>
  <LandingCard icon="⚙️" title="Freight Configuration" link="/modules/freight/freight-configuration.md" details="The module settings: default service items, storage behaviour, invoice currency totals, and the IPS connection." />
  <LandingCard icon="📑" title="Freight Document Terms" link="/modules/freight/freight-document-terms.md" details="What each freight and postal document term controls: accounting sides, operation-order status, postal events and storage effect." />
</LandingGrid>

### E-Invoicing

<LandingGrid>
  <LandingCard icon="🏛️" title="E-Invoicing Handling" link="/modules/freight/freight-einvoicing.md" details="How the freight module sends its invoices to the tax authority, and how it handles the agent/commission model and service-item tax codes." />
</LandingGrid>
