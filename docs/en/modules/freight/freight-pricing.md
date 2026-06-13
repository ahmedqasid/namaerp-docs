# Price Lists & Markups

A freight company profits from the difference between what it pays suppliers for a service and what it sells it to the customer for. Price lists in the freight module make that difference managed and calculated automatically, instead of pricing each shipment by hand.

You'll find the lists under **Freight Management System → Master Files**.

## Purchase Price List

Records what you buy services from suppliers for. Each list has:

- **Service Provider** — the supplier (shipping line, clearance agent…).
- **Service Item** and price list type.
- **Validity period (Valid From / Valid To)**, currency, and exchange rate.
- A default **Markup** for the list.
- Lines per service type: **ocean freight, customs clearance, trucking, genset, courier, other** — each with its price and conditions.

![Purchase price list](../../../modules/freight/images/pricing/purchase-price-list-en.png)

## Sales Price List

Records what you sell services to the customer for. It stands out in that it builds the selling price on top of the purchase price plus a profit margin for each service type separately:

- **Customer and Sales Man**, commodity, and the import/export and collect/prepaid flags.
- **A markup per service** — *ocean freight markup, clearance markup, trucking markup, genset markup, other markups* — each carrying both a **percentage** and a **fixed value**.
- **All-In** — an option for a single combined rate (All-In Rate) instead of detailing each service, with **Agency Fees**.
- Textual **Conditions** per service type, to print on the customer's quotation.

![Sales price list](../../../modules/freight/images/pricing/sales-price-list-en.png)

::: tip How the markup is calculated
The profit markup (FRM Mark) is flexible: it can be a **percentage** over the purchase price, a **fixed value** added to it, or both together. That's how you price one service at "cost + 10%", another at "cost + $50", and a third combining both.
:::

## From the list to the operation order

The lists aren't a static reference — they're the actual pricing source. Inside the [operation order](./operation-orders.md), the **Update All Services** button pulls prices from the matching lists (by customer, commodity, ports, container, and service type), filling in the purchase cost and selling price in every service line at once.

The **Edit Purchase Price List** document also lets you update purchase prices in bulk without opening each list individually.

## Linking sale to cost

When [invoicing sales](./freight-invoicing.md), the system matches each sale line to its corresponding purchase line in the same operation order (same service item, currency, quantity, ports, container, and commodity), computing the **actual cost** and the **difference (profit)** for each line — so you know your profit at the level of a single service, not just the shipment.
