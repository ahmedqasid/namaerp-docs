# Understanding Inventory Items

Let's talk about **Items** - the building blocks of your entire supply chain system.

## What Is an Item, Really?

In NaMa ERP, an "Item" (entity type `InvItem`, or صنف in Arabic) represents anything you track in your business. It could be:
- A physical product you sell (a laptop, a chair, a bottle of juice)
- A raw material you purchase (steel, fabric, flour)
- A spare part for maintenance (a bearing, a filter)
- A service you provide (consulting hours, installation service)
- A consumable you use internally (office supplies, cleaning materials)

The beauty of the item master is that it's flexible enough to handle all these scenarios while capturing exactly the information you need for each type.

## The Item Code: Your Item's Identity

Every item needs a unique identifier - we call this the **item code**. You can think of it like a person's ID number.

You have two choices for how items get their codes:
1. **Automatic numbering**: The system generates codes for you (like IT-00001, IT-00002, etc.)
2. **Manual entry**: You type in your own codes (like "LAPTOP-DELL-5540" or "STEEL-REBAR-12MM")

Many organizations use manual codes because they embed meaning - you can look at "DESK-WOOD-120" and immediately know it's a wooden desk, 120cm wide. But auto-numbering ensures you never accidentally create duplicates.

Beyond the primary code, items can have:
- **Alternative codes** for legacy systems or different departments
- **Supplier codes** (what your supplier calls this item)
- **Customer codes** (what your customers call this item)
- **Barcodes** - multiple barcodes per item if needed
- **Tax authority codes** for compliance

## Names and Descriptions: Communicating About Items

An item code is precise, but not very friendly. That's why every item has names and descriptions:

- **name1** and **name2**: Typically Arabic and English names
- **description1** through **description5**: For longer explanations, specifications, or different contexts

Why so many description fields? Because different people need different information. Your purchasing department might need technical specifications in description1, your sales team needs marketing language in description2, and your warehouse needs handling instructions in description3.

## Organizing Your Items: Categories and Classifications

Imagine you have 10,000 items in your system. How do you make sense of them all? Through classification!

### Hierarchical Categories

NaMa ERP gives you five levels of categories (`category1` through `category5`) that work hierarchically:

```
Category 1: Electronics
  Category 2: Computers
    Category 3: Laptops
      Category 4: Business Laptops
        Category 5: Dell Business Laptops
```

This hierarchy lets you:
- Run reports at any level ("show me all Electronics sales")
- Apply rules to entire categories ("all Business Laptops require serial numbers")
- Search efficiently ("find items in Computers category")

### Additional Classification Dimensions

Sometimes hierarchical categories aren't enough. What if you also need to classify by:
- Brand (Dell, HP, Lenovo)
- Product line (Budget, Premium, Enterprise)
- Supplier source (Local, Imported)
- Department that uses it (IT, Admin, Production)

That's where `itemClass1` through `itemClass10` come in. These are independent classification dimensions you can define however you need.

You might use:
- `itemClass1` for Brand
- `itemClass2` for Product Line
- `itemClass3` for Price Range
- And so on...

### Groups and Other Organizers

The `group` field provides yet another way to organize items - perfect for  grouping items that behave similarly for reporting or processing purposes.

::: tip Classification Strategy
Start simple! Don't try to define all 10 item classes on day one. Set up the 2-3 classifications you need most, and add more as your needs evolve. You can always reclassify items later.
:::

## The Unit of Measure Puzzle

Here's where things get interesting. Imagine you sell juice:
- You **purchase** it by the case (24 bottles per case)
- You **store** it in your warehouse by the case
- You **sell** it by the bottle
- You **report** on it in liters for analysis

How does the system handle this? Through a sophisticated Unit of Measure (UOM) system.

### Primary UOM System

Every item has a **base unit** - the fundamental unit for tracking inventory. In our juice example, this might be "bottle".

Then you define **conversion factors**:
- 1 case = 24 bottles
- 1 bottle = 0.5 liters

Now you can:
- Create a purchase order in cases
- Receive 10 cases (system records 240 bottles in inventory)
- Sell 50 bottles (system issues 50 bottles, which is 2.08 cases)
- Run reports in liters (system shows 125 liters sold)

All the conversion happens automatically behind the scenes!

You configure:
- `primaryUOM.baseUnit`: Your fundamental tracking unit
- `primaryUOM.defaultPurchaseUnit`: What unit you usually buy in
- `primaryUOM.defaultSalesUnit`: What unit you usually sell in
- `primaryUOM.reportingUnit1` and `reportingUnit2`: Units for reporting

### Secondary UOM System: When You Need Two Measures

Some items need **dual measurement**. A classic example is meat:
- Tracked primarily by **weight** (kilograms)
- But also by **count** (how many pieces)

You might purchase "10 kg of chicken (5 pieces)" and need to track both numbers independently.

Enable this by setting `hasSecondUnit` to true, then configure the secondary UOM system parallel to the primary one. Now every transaction captures both measures.

### Why This Matters

Getting UOMs right is crucial because:
- Wrong conversions mean wrong inventory counts
- Wrong inventory counts mean wrong financial statements
- Wrong financial statements mean... well, you get the idea!

Take the time to set up conversions accurately, and test them with sample transactions before going live.

## Tracking Special Attributes

Different items need different tracking methods:

### Serial Numbers

For items where each unit is unique and traceable (laptops, vehicles, high-value equipment), enable **serial number tracking** with the `hasSerial` flag.

Now every time you receive or issue this item, the system asks for serial numbers. You can track:
- Where did serial #12345 come from?
- Who currently has it?
- What's its warranty status?
- Has it been serviced?

Some items need **two serial numbers** (set `hasTwoSerials`) - imagine an air conditioner with separate indoor and outdoor unit serial numbers.

### Batch/Lot Numbers

For items produced or purchased in batches (pharmaceuticals, food products, chemicals), enable `hasLot`. Each batch gets a unique lot number, so if there's a quality issue, you know exactly which batch is affected and can trace where every item from that batch went.

### Expiration Dates

For perishable items, enable `hasExpiry`. Now the system tracks expiration dates and can:
- Warn you about items approaching expiration
- Use FEFO (First Expiry First Out) for automatic lot selection
- Prevent issuing expired items

### Warranty Tracking

Enable `hasWarrantyCode` for items with warranty coverage. The system tracks warranty periods and can alert you when warranties are expiring.

## Physical Characteristics

The system can track physical attributes that affect storage, shipping, and handling:

- **Dimensions**: Length, width, height, area, volume
- **Weight**: Item weight (crucial for shipping calculations)
- **Density**: For liquids and bulk materials

Why track these? Because:
- Your warehouse needs to know if an item fits on a standard shelf
- Shipping companies charge based on dimensional weight
- Production needs to know how much space materials occupy
- Capacity planning depends on physical constraints

## Colors, Sizes, and Variants

Fashion retail and many other industries need to track items with multiple variants. A T-shirt might come in:
- 5 sizes (S, M, L, XL, XXL)
- 8 colors (Red, Blue, Green, Yellow, Black, White, Gray, Pink)

Do you create 40 separate items? No! You create one "item" with the `hasSize` and `hasColor` flags enabled, then define the size/color matrix in the `sizesAndColors` collection.

Now you can:
- Purchase "100 T-shirts (20 of each size, mixed colors)"
- Track inventory separately for "Red-Large" vs "Blue-Small"
- Report at the style level ("total T-shirt sales") or variant level ("Red-Large sales")

## Item Types: What Can You Do With This Item?

Every item has flags that define how it can be used:

**Can you buy it?**
- `purchasable`: Yes, this item can be purchased from suppliers
- If false, system prevents creating purchase orders for it

**Can you sell it?**
- `sellable`: Yes, this item can be sold to customers
- If false, system prevents adding to sales invoices

**Can you manufacture it?**
- `manufacturable`: Yes, this item can be produced
- System allows creating production orders for it

**Can customers return it?**
- `returnable`: Yes, customers can return this item after purchase
- If false, system prevents sales returns

**Can customers exchange it?**
- `replaceable`: Yes, allow exchanges/replacements
- Useful for warranty replacements or size exchanges

These flags give you fine-grained control. You might have:
- Raw materials (purchasable but not sellable)
- Finished products (sellable and manufacturable, but not purchasable)
- Service items (sellable but not storable)
- Consumables (purchasable but not sellable or returnable)

## Inventory Control: How Stock Behaves

### Safety Stock and Reorder Points

Every item can have a **safety stock** level - the minimum quantity you want to keep on hand. Drop below this, and the system alerts you.

You can set:
- **Safety stock quantity**: "Never let laptop inventory fall below 10 units"
- **Reorder point**: "When we hit 10 units, automatically suggest creating a purchase requisition"

The `slowMovingPeriod` helps identify items that aren't selling. If an item hasn't moved in 180 days, maybe it's time to discount it or stop stocking it.

### Overdraft Policy: What Happens When Stock Goes Negative?

Real life is messy. Sometimes you need to issue more than you have - maybe an urgent customer order arrives before your scheduled delivery.

The `overDraftPolicy` defines what happens:
- **Prevent**: Don't allow negative stock under any circumstances
- **Warn**: Show a warning but allow the transaction
- **Allow**: Go ahead, we'll track the negative balance

Different items need different policies. Critical medical supplies might prevent overdraft, while office supplies might just warn.

### Reservation: Holding Stock for Specific Purposes

The `reservationType` controls how items can be reserved:
- Can you reserve stock for a sales order? (Ensures it won't be sold to someone else)
- Can you reserve for a production order? (Ensures materials are available when production starts)
- At what stage does reservation happen? (Order entry, order approval, before delivery?)

Reservations are powerful because they ensure commitments can be met without physically moving stock until the last moment.

## Pricing: How Much Does It Cost? How Much Do We Charge?

### Cost Management

Every item has a **standard cost** (what you expect it to cost on average). But the system also tracks:
- **FIFO cost**: Based on the actual sequence of receipts
- **Average cost**: Average of all purchases
- **Last cost**: What you paid most recently

You choose which costing method to use for each item or category.

### Sales Pricing

Items can have prices in multiple **price lists**:
- Retail price list
- Wholesale price list
- VIP customer price list
- Special promotion price list

When you create a sales invoice, you select which price list to use, and the system fills in prices automatically.

But here's the clever part: you can enable **automatic pricing** with profit margins:
- `autoSalesPricingInfo.autoSalesPricing`: Enable automatic calculation
- `autoPricingDefaultProfitPercent`: "Usually add 40% margin"
- `autoPricingMinProfitPercent`: "Never go below 25% margin"
- `autoPricingMaxProfitPercent`: "Never exceed 60% margin (even if customer would pay it)"

Now when costs change, sales prices can be automatically recalculated while respecting your margin policies.

### Minimum Price Control

Set `defaultDetailData.minPrice` to prevent salespeople from discounting too heavily. The system will warn or prevent selling below this floor price.

## Purchasing Configuration

For items you purchase, you can configure:

**Lead Time**: `purchaseLeadTime` tells the system how long it takes from ordering to receiving. This affects:
- When to create purchase requisitions
- Promise dates to customers
- Production scheduling

**Preferred Supplier**: `defaultSupplier` indicates who you usually buy from. The system can auto-suggest this supplier when creating purchase orders.

**Order Quantities**:
- `minOrderQty`: Minimum you must order (supplier minimums)
- `orderLimit`: Maximum you can order at once
- `reRequest`: Should the system automatically suggest reordering when stock is low?

## Accounting Integration

This is where the magic happens. Every item can have multiple accounting settings through the `subsidiaryAccounts` configuration:

- `mainAccount`: The main inventory asset account
- `account1` through `account20`: Specialized accounts for different scenarios
- Expense accounts for service items
- Different accounts for different branches or cost centers

When you receive a purchase, the system automatically:
- Debits the inventory account
- Credits accounts payable
- Records tax inputs

When you make a sale:
- Debits cost of goods sold
- Credits inventory
- Debits accounts receivable
- Credits sales revenue
- Records tax outputs

You never have to create manual journal entries - the system handles it all based on how you configured the item.

### Tax Configuration

Items can be:
- **Taxable** (`taxable` flag): Subject to tax
- **Tax exempt**: Not subject to tax
- **Different tax rates**: Through the `taxPlan` configuration

You can even set specific tax exemptions (`tax1Exempt` through `tax4Exempt`) if an item is exempt from certain taxes but not others.

## Manufacturing Configuration

For manufactured items, you can set:

- `manufactureLeadTime`: How long production takes
- `maxYield`: Expected output per unit of input (for process manufacturing)
- `maxPotency`: Quality specification
- `qualityCheckList`: Required quality checks
- `deAssemblyBomMethod`: How to disassemble back to components

The manufacturing module uses these settings to schedule production, calculate material requirements, and ensure quality standards.

## Quality Control Settings

Items can have:
- `qualityCheckList`: Checks required on receipt
- `assuranceCheckList`: Ongoing quality assurance requirements
- `reTestPeriod`: How often to retest (important for chemicals, pharmaceuticals)

When these are configured, the system won't let items go from receiving to available stock until quality checks are completed.

## Custom Fields: Making Items Yours

Every business is different. That's why items have custom fields you can use however you need:

**Numbers**: `n1` through `n5` - Store numeric values (grade, rating, score, etc.)
**Booleans**: `b1` through `b5` - True/false flags for custom properties
**Dates**: `date1` through `date5` - Custom date tracking
**References**: `ref1` through `ref10` - Link to other entities in your system

You define what these mean. Maybe `n1` is "shelf life in days" and `b1` is "requires refrigeration". The system doesn't care - it just stores and retrieves these values for you to use in reports, workflows, and business rules.

## Analysis and Reporting

Items can belong to **analysis sets** - groups used for financial and managerial analysis. This lets you report on "how much did we spend on IT equipment this year?" without having to list every individual item code.

## Attachments and Documentation

Every item can have up to 5 file attachments (`attachment` through `attachment5`):
- Product photos
- Technical specifications (PDF)
- Safety data sheets
- Supplier catalogs
- Usage instructions

These attachments are stored in the database and travel with the item definition, always available when needed.

## Revisions and Version Control

For engineering and manufacturing, items can have **revisions**. Each revision has:
- Version number
- Effective date
- What changed
- Who authorized the change

This is crucial when you improve a product design but need to support both old and new versions during a transition period.

## Bringing It All Together

Setting up items seems like a lot of work - and it is! But here's the thing: you do it once per item, and from that point forward, hundreds of transactions flow through the system using that configuration.

A well-configured item definition means:
- Purchases happen smoothly (system knows the supplier, units, and accounts)
- Sales happen smoothly (system knows the price, units, and accounts)
- Inventory is tracked accurately (system knows about serials, lots, and locations)
- Accounting is automatic (system knows which accounts to post to)
- Reports are meaningful (system knows the categories and classifications)

::: tip Starting Simple
Don't try to configure everything perfectly on the first item. Start with the basics:
1. Code and name
2. Base unit of measure
3. Category
4. Whether it's purchasable/sellable
5. Basic accounting accounts

You can always come back and add serial number tracking, quality checklists, or automatic pricing later. Get items into the system and start using them - you'll quickly learn what additional configuration you need.
:::

## Next Steps

Now that you understand items, you're ready to learn what you do with them:
- [Receiving Stock](./receiving-stock.md) - Bringing items into your warehouse
- [Issuing Stock](./issuing-stock.md) - Releasing items from your warehouse
- [The Purchasing Journey](./purchasing-journey.md) - How items get into your system
- [The Sales Journey](./sales-journey.md) - How items get to your customers
