# Supply Chain Management

Welcome to the Supply Chain Management module - the heart of how NaMa ERP helps you track, manage, and control the flow of goods through your organization.

## What This Module Does

Think of the Supply Chain module as the central nervous system for everything related to inventory, purchasing, and sales in your business. Whether you're receiving raw materials from suppliers, manufacturing products, selling to customers, or simply moving items between warehouses, this module orchestrates all these activities and ensures everything is properly tracked and accounted for.

## The Big Picture

Let's start with a simple story to understand how everything fits together.

Imagine you run a manufacturing company that makes furniture. Your journey with the Supply Chain module begins when you realize you need wood to make tables. You create a **purchase request** for wood, get **quotations** from suppliers, place a **purchase order**, and when the wood arrives, you create a **receipt document** that brings the wood into your inventory and updates your accounting books automatically.

Now you're ready to make tables. You **issue** the wood to your production department (which reduces your raw materials inventory), and when the tables are ready, you **receive** them back as finished products (which increases your finished goods inventory). The costs of the wood automatically flow into the value of your tables.

When a customer places an order, you create a **sales quotation**, convert it to a **sales order**, then issue a **sales invoice** that records the sale in accounting and issues the table from your warehouse at the same time. The system tracks every step, makes sure you have enough quantity, and helps you reserve items for specific customers.

Throughout this journey, the system does much more than just track numbers; it:
- Makes sure you don't sell what you don't own
- Calculates costs and profits automatically
- Creates accounting entries so your books are always up to date
- Tracks serial numbers and batch numbers when needed
- Manages multiple warehouses and locations
- Handles returns, replacements, and quality control
- Supports multiple units of measure (selling by piece, buying by carton)
- And much more...

## How Documents Work in NaMa ERP

::: tip Understanding Document States
Unlike some systems that require "posting" documents, NaMa ERP works differently:

**Draft Mode**: Create and edit documents with no effect on inventory or accounting. Perfect for preparation and review.

**Saved**: Once a document is saved (out of draft mode), it **immediately** affects:
- Inventory quantities
- Accounting balances
- Customer and supplier accounts
- Available stock calculations

**Edits**: Any changes you make to saved documents appear in the system immediately, with no separate "post" or "confirm" step needed.
:::

This immediate approach means:
- Real-time inventory accuracy
- Up-to-date accounting at all times
- No delays from periodic posting
- Instant visibility of changes

But it also means you need to be careful - once saved (out of draft), a document has a real effect!

## How This Guide Is Organized

The Supply Chain module is large, so we've split it into related groups that follow the way the system organizes itself into sub-modules. You don't have to read them in order; jump to whatever serves your current task.

### Foundations

Before you buy, sell, or store anything, you need to define **what** you deal in and **where** you keep it.

- **[Understanding Inventory Items](./understanding-items.md)** — Items are the cornerstone: how you define them, classify them (by brand, category, color, size), track them by batch and serial number, and handle multiple units of measure.
- **[Warehouses & Locators](./warehouses-and-locators.md)** — Where your stock physically lives: warehouses and their groups, locators within each warehouse, and linking items to their preferred warehouses.

### Stock Movement

Everything that enters your inventory, leaves it, or moves around inside it.

- **[Receiving Stock](./receiving-stock.md)** — All the ways items enter your warehouse: stock receipts, opening balances, and initial receipts.
- **[Issuing Stock](./issuing-stock.md)** — Issuing items to production, internal use, or writing off damaged goods.
- **[Moving Stock Between Warehouses](./moving-stock.md)** — Two-sided stock transfers (issue and receipt) and aggregated transfers.
- **[Stock Taking](./stock-taking.md)** — Physical counting through start/end stock-taking documents, electronic counting, and reconciling differences.
- **[Inventory Costing & Revaluation](./inventory-costing.md)** — Cost revaluation, additional costs on receipts, and freezing cost at period close.

### Purchases

- **[The Purchasing Journey](./purchasing-journey.md)** — The full purchase cycle: item request, quotation request, quotation, purchase order, receipt, purchase invoice, returns, and purchase price lists and comparisons.
- **[Purchase Forecast](./purchase-forecast.md)** — Estimating future needs based on sales history or other quantity sources.

### Sales

- **[The Sales Journey](./sales-journey.md)** — From quotation to sales order to delivery to invoice, then returns and replacement.
- **[Pricing, Offers & Coupons](./pricing-offers-and-coupons.md)** — Sales price lists, offers and free items, post-sales offers, coupons, and automatic pricing.
- **[Comprehensive Reservation System Guide](./reservation-system-guide.md)** — How the system reserves items for specific customers and tracks reserved quantities.
- **[Delivery & Loading](./delivery-and-loading.md)** — Delivery and loading documents, delivery queues, driver setup, and pick rules.

### Specialized Sub-Modules

- **[Assembly & Packaging](./assembly-and-packaging.md)** — Bills of materials (BOM), assembly documents, packaging methods, and processing.
- **[Quality Control](./quality-control.md)** — Quality control and assurance documents, checklists, and integration with receiving and production.
- **[Letters of Credit](./letters-of-credit.md)** — The letter-of-credit lifecycle: opening, shipments, costs, and expenses.
- **[Weight Scale](./weight-scale.md)** — Weight scale configuration and the preparation documents tied to it.
- **[Specialized Scenarios](./specialized-scenarios.md)** — Other cases such as glass job orders, automatic document-generation rules, and tenders.

::: info Point of Sale Has Its Own Module Now
The Point of Sale (POS) guides have moved to the standalone [Point of Sale module](/modules/pos/). There you'll find the guides for fingerprint login, free items in POS, and technical points of use.
:::

### Development Request Notes

Some client requests change how a core part of the module behaves in ways worth explaining on their own. The **[Development Request Notes](./development-requests/)** section keeps the story behind those changes — the business problem, what the feature does, and when to enable it.

## A Note About Document Types

As you read this documentation, you'll encounter many "document" types like PurchaseInvoice, StockReceipt, SalesOrder, and others. Don't let that confuse you!

Think of them as different kinds of forms you fill out to record different business events. Just like in a paper system where you have a "purchase order form" and a "goods receipt note," the system has different document types for different purposes.

Each document type is designed for a specific business transaction and contains exactly the fields and features appropriate to it. But they all follow similar patterns, so once you understand a few, the rest become intuitive.

## Integration with Other Modules

The Supply Chain module doesn't work in isolation; it's deeply integrated with:

**Accounting**: Every inventory transaction creates accounting entries automatically. When you receive purchases, the inventory asset rises and payables rise. When you sell, revenue rises and inventory falls. No need to think about it - it happens on its own.

**Manufacturing**: When you issue raw materials to production and receive finished products, the system tracks costs and ensures materials are available for production orders.

**CRM**: Sales quotations and orders can originate from CRM opportunities, and customer service cases can trigger returns and replacements.

**Fixed Assets**: Some items you buy become fixed assets rather than inventory. The system handles this distinction automatically.

**Hospital Management**: Pharmacies, blood banks, and medical supplies have special requirements that the system handles in a built-in way.

## Let's Get Started

Ready to dive in? Start with [Understanding Inventory Items](./understanding-items.md) to build your foundation, or jump straight to the section that matches what you're trying to accomplish right now.

Remember: this documentation focuses on helping you understand **how** and **why** the system works the way it does, not just listing features. If you're looking for a specific field or technical detail, those references live elsewhere. Here, we tell the story of your supply chain.

::: tip Navigation Tip
Use the sidebar to move between modules, and don't feel obligated to read everything in order. Each section is written to stand on its own while building on the core concepts introduced here.
:::
