# Carton Orders: From Customer Request to Production Plan

## What a Carton Order Is

A carton order is your sales document - it's how customers purchase cartons from you. Think of it as a sales order specialized for the carton manufacturing business.

On the surface, it looks like any sales document: customer, quantities, prices, delivery date. But behind the scenes, it's doing something smarter - translating customer requirements into manufacturing requirements.

When a customer orders assembled cartons, Nama automatically figures out all the component cartons that need to be manufactured. When they order 5000 units, Nama tracks which of those units have been planned for production, which are still pending, and prevents you from accidentally planning the same order twice.

You'll find carton orders under **Manufacturing > Documents > CRTN Order** (التصنيع > المستندات > طلبية كرتون).

## Creating a Basic Carton Order

Let's walk through a typical order entry.

### Step 1: Header Information

Start a new carton order and fill in the essentials:

**Customer** (العميل): Select the customer placing the order. This is required - you can't create orders without a customer.

**Issue Date** (تاريخ الإصدار): When the order was placed

**Value Date** (تاريخ القيمة): When the order should be valued (for accounting purposes)

**Sales Person** (م.المبيعات): The salesperson handling this account (optional)

**Book** (الدفتر) and **Term** (الشرط): These control numbering and automatic document generation settings

**Subsidiary**: If this order should post to a specific subsidiary account (advanced accounting feature)

**Tax Plan**: If sales taxes apply, select the tax plan

### Step 2: Order Lines - Selecting Cartons

In the **Details** (التفاصيل) grid, add lines for each carton the customer wants:

**Carton Specs** (مواصفات الكرتونة): Select the carton specification. Here's the smart part - Nama filters the list to show only specifications for this customer. You won't accidentally see specs for other customers.

When you select a specification, Nama automatically:
- Fills in the **Item** field (if the spec is linked to an inventory item)
- Sets up pricing (if a price is defined in the spec)
- Populates descriptions

**Quantity** (الكمية): How many cartons the customer wants

**Price fields**: Unit price, discounts, taxes - standard invoicing fields

The system calculates line totals, applies discounts, calculates taxes, and updates the document money totals automatically.

**Important**: You can only select carton specifications with manufacturing types:
- Normal Carton (كرتونة عادية)
- Assembled Carton (كرتونة مجمعة)
- Normal Separator (فاصل عادي)

You can't directly order "Small Separators" or "Assembled Separators" in orders - those are components manufactured as part of other products.

### Step 3: Review Manufacturing Details

Here's where it gets interesting. Once you save the order, look at the **Manufacturing Details** (تفاصيل التصنيع) tab (read-only grid).

This grid shows what actually needs to be manufactured to fulfill the order.

**For normal cartons**: Manufacturing details match order details. One order line = one manufacturing line.

**For assembled cartons**: Nama explodes the assembly into components. If you ordered an assembled carton with two child components, you'll see two manufacturing detail lines - one for each child carton that needs to be produced.

**Example**:
```
Order Details:
- 1000 units of "Display Shipper Full" (assembled carton)

Manufacturing Details:
- 1000 units of "Display Base" (child component 1)
- 1000 units of "Display Lid" (child component 2)
```

The manufacturing details are what feeds into material planning. When you plan materials, you're planning for the manufacturing details, not the order details.

**Used In Document** (مستعمل في سند): This field in manufacturing details shows if a manufacturing line has been included in a material planning document. Once planned, it's marked to prevent duplicate planning.

### Step 4: Money Calculations

The **Money** section shows financial totals:

**Net Value** (القيمة الصافية): Subtotal before taxes
**Taxes**: Tax amounts if tax plan is applied
**Total** (الإجمالي): Final amount due

All calculations happen automatically as you enter order lines. Discount percentages, tax rates, everything flows from the term configuration and tax plan.

### Step 5: Commit the Order

Once everything looks good, commit the order. Nama validates:

**Customer consistency**: Every carton specification in the order must be for the selected customer. You can't order Customer A's specs on Customer B's order.

**No assembled separators**: Can't order assembled separator specs directly (they're manufacturing components only).

If validation passes, the order commits and is ready for planning.

## The Planning Status: Fully Planned vs. Partially Planned

Once an order is committed, Nama tracks its planning status with two fields (visible in the header):

**Used In Document** (مستعمل في سند): Shows the material planning document that this order is part of (or null if not yet planned)

**Fully Planned** (مخطط بالكامل): True if all manufacturing detail lines have been included in material planning, false if any lines are still pending

Here's how it works:

### Scenario 1: New Order, Not Yet Planned

You just committed Carton Order #5001 with 5000 tomato boxes.

- Manufacturing Details: 1 line, "Tomato Box 250", 5000 units, Used In Document = null
- Order Header: Used In Document = null, Fully Planned = False

This order appears in searches for "unplanned orders" when creating material planning documents.

### Scenario 2: Order Fully Planned

You created Material Planning #MP-001, added Order #5001, ran optimization, committed the planning document.

Nama marks:
- Manufacturing Details: Used In Document = Material Planning #MP-001
- Order Header: Used In Document = Material Planning #MP-001, Fully Planned = True

This order no longer appears in searches for unplanned orders. You won't accidentally plan it again.

### Scenario 3: Assembled Carton, Partially Planned

You have Order #5002 for 1000 assembled cartons (base + lid components).

Manufacturing Details show:
- Line 1: Base component, 1000 units
- Line 2: Lid component, 1000 units

You create Material Planning #MP-002 and add only the base component (maybe lids are in stock, you just need to manufacture bases).

After committing MP-002:
- Line 1 (Base): Used In Document = MP-002
- Line 2 (Lid): Used In Document = null
- Order Header: Used In Document = MP-002, Fully Planned = False

The order is partially planned. It still appears in searches (because Fully Planned = False), but when you look at it, you'll see the base is already planned.

Later, you create MP-003 for the lids. After committing:
- Line 1 (Base): Used In Document = MP-002
- Line 2 (Lid): Used In Document = MP-003
- Order Header: Used In Document = MP-002 (first planning document), Fully Planned = True

Now it's fully planned and drops off the unplanned list.

### Scenario 4: Planning Document Cancelled

If you cancel or delete a material planning document, Nama automatically updates all orders that were included in it:

- Used In Document fields are cleared
- Fully Planned status recalculates

The orders become available for planning again.

## Generating Material Planning from an Order

Once you have a committed order, there's a quick path to material planning:

Click the **Generate CRTN Material Planning** (إنشاء تخطيط خامات الكرتون) action button on the order.

Nama:
1. Creates a new material planning document
2. Adds this order to the planning document
3. Opens the planning document for you

You're now in material planning, ready to run optimization. This shortcut saves you from manually creating a planning document and selecting the order - it does it in one click.

**Note**: This button requires a document term configuration that specifies which book and term to use for generating planning documents.

## Understanding Assembled Cartons in Orders

When you order assembled cartons, here's what happens step by step:

### Order Entry

You add one line:
- Carton Specs: "Display Shipper Full" (an assembled carton with 2 child components)
- Quantity: 500

That's it from a sales perspective. The customer ordered 500 display shippers.

### Manufacturing Details Generation

Nama looks at the specification for "Display Shipper Full" and sees it has two child carton lines:
1. "Display Base" - quantity per assembly: 1
2. "Display Lid" - quantity per assembly: 1

So manufacturing details show:
- 500 units of "Display Base" needed
- 500 units of "Display Lid" needed

Both lines reference the order detail line ID, so you can trace back to which order line drove these requirements.

### Material Planning

When you plan materials for this order, you're planning for 500 bases and 500 lids. The optimizer finds materials for both components independently - they might use different paper grades, different roll widths.

The cutting plan will show separate material requirements for each component.

### Production

If you generate production orders from the material planning, you get:
- One production order for 500 "Display Base" cartons
- One production order for 500 "Display Lid" cartons

Each has its own BOM, routing, and material requirements.

### Assembly

The actual assembly of bases + lids into complete shippers typically happens outside the carton manufacturing module (maybe in a packaging/fulfillment operation, or the customer assembles them). The carton manufacturing system tracks that you produced the components.

## Small Separator Handling

Assembled separators work similarly but with an extra twist:

If you order an assembled separator specification, Nama finds all the small separator children and marks them as needing manufacturing. However, it groups by the assembled parent.

If you have multiple assembled separator specs that use the same small separator child, Nama makes sure you don't double-count that child - it only manufactures the required quantity once to support all assemblies.

This is an advanced scenario - most factories don't use assembled separators heavily.

## Pricing and Invoicing Integration

Carton orders are full invoicing documents. They implement the standard Nama invoicing interface, which means:

**Discount support**: Line-level and header-level discounts, cascading calculations
**Tax integration**: Tax plans with multiple tax types (VAT, local taxes, etc.)
**Payment tracking**: Link to payment receipts (if configured)
**Accounting effects**: Can generate accounting entries when committed (if term is configured)
**Subsidiary accounting**: Can post to customer subsidiary ledgers

The **Money** section calculates exactly like a sales invoice. Discounts reduce prices, taxes apply to after-discount amounts, and the total matches what you'd invoice the customer.

## Tips for Effective Order Entry

**Confirm specs with customer**: Before creating an order, make sure you and the customer agree on which specification to use. If they ordered "250mm tomato box" but you have three different 250mm specs with different fluting or printing, clarify which one.

**Check inventory before committing large orders**: If the order is large and has tight delivery timing, do a quick material availability check before committing. Create a draft planning document to see if you have materials in stock.

**Use consistent customers on specs**: Make sure the specification is tagged with the right customer. If it's not, you won't be able to select it when creating orders for that customer.

**Batch similar orders**: If you have multiple small orders for the same customer, consider whether they can be combined into one order with multiple lines. This makes material planning more efficient (the optimizer sees all requirements together).

**Monitor planning status**: Before promising delivery dates, check if the order has been planned. An unplanned order doesn't have confirmed material availability or production scheduling.

**Document special requirements**: Use the remarks and description fields for anything unusual - special printing, rush delivery, customer-specific packaging instructions. This information travels with the order through production.

## Common Questions

**Q: Can I edit an order after it's been planned?**
A: You can edit the order, but if manufacturing details are already in material planning documents, you need to handle those separately. Safer approach: delete the planning document, edit the order, re-plan.

**Q: What if I order an assembled carton but only need to manufacture one of the child components (the other is in stock)?**
A: When you create the material planning document, you can selectively add just the manufacturing detail lines you want to plan. The order stays partially planned until all lines are planned.

**Q: Can I mix multiple customers' orders in one material planning document?**
A: Yes. Material planning documents don't care about customers - they care about carton specs and material efficiency. You can batch orders from different customers if it makes sense for production efficiency.

**Q: What happens if I delete an order that's been planned?**
A: Nama prevents deletion if it's referenced in committed planning documents. You'd need to cancel/delete the planning documents first. This protects you from breaking the link between orders and production plans.

**Q: Why can't I select my assembled separator specification in an order?**
A: Assembled separators aren't sold directly - they're manufacturing structures. You'd order the normal separator specification that uses the assembled separator internally, or you'd order the final product that incorporates the separators.

**Q: How do I handle rush orders?**
A: Enter the order normally, then use the "Find Companion Orders" feature in material planning to see if batching with other orders would delay the rush order too much. You might choose to plan the rush order alone to prioritize it.

---

::: tip Next Step
With orders entered, you're ready for the most powerful part of the carton module - material planning and optimization. See [Carton Material Planning](./carton-material-planning.md).
:::

::: info Order Status Tracking
The "Fully Planned" flag is your quick indicator of order readiness. Use it to filter pending orders when creating production schedules.
:::
