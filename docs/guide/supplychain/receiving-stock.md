# Receiving Stock into Your Warehouse

Inventory doesn't magically appear in your warehouse - it arrives through various means and for various reasons. Let's explore all the ways items come into your system and how to record each scenario properly.

## The Receipt Document: Your Inventory Entry Point

At its heart, a **receipt document** (known as `StockReceipt` or توريد مخزني in Arabic) is simple: it's the official record that says "these items entered our warehouse at this time." But depending on the source and purpose, you'll use different types of receipt documents.

Think of it like different types of envelopes for different types of mail. A personal letter, a legal document, and a package all get delivered, but each needs different handling and tracking.

## The General Stock Receipt: Your Workhorse

The `StockReceipt` document is your general-purpose receipt tool. Use it whenever items come in from sources other than suppliers (which have their own special receipt process we'll cover in the [Purchasing Journey](./purchasing-journey.md)).

### When To Use It

Here are common scenarios:

**Receiving from Production**
Your production department finished manufacturing 100 chairs. You create a stock receipt to bring those chairs into finished goods inventory. The system increases your inventory, calculates the cost based on materials used, and creates the accounting entries.

**Customer Returns**
A customer returns a defective laptop. You receive it back into inventory (probably to a "returns" location for inspection) using a stock receipt. Now you can decide whether to refund, repair, or scrap it.

**Internal Returns**
The IT department borrowed 5 laptops for training and is returning them. Stock receipt documents them coming back into available stock.

**Found Items**
During a physical count, you discover 10 widgets that weren't in the system. Create a receipt to bring them into tracked inventory with a note explaining they were "found during inventory count."

**Sample Receipts**
A supplier sent free samples. Receive them with zero cost to track them in inventory without financial impact.

### How It Works

Every receipt document needs:

1. **Warehouse and Location**: Where are these items going? Main warehouse? Defective goods area? Specific shelf location?

2. **Items and Quantities**: What's coming in and how much? Include unit of measure - are those 10 cases or 240 bottles?

3. **Cost Information**: What's the value of these items? Sometimes it's zero (samples), sometimes it's calculated (from production), sometimes you specify it directly.

4. **Source Information**: Where did they come from? Production order #12345? Customer return for invoice #789? Use reference fields to link documents.

The system then:
- Increases inventory quantity in the specified location
- Updates the inventory value based on your costing method
- Creates accounting entries (debiting inventory assets)
- Records the transaction history
- Updates available-to-promise calculations

If items have serial numbers or batch numbers, you'll enter those details. The system tracks each individual unit or batch from this moment forward.

## Starting Fresh: Opening Balance Receipts

When you first implement NaMa ERP, you already have inventory - you're not starting from zero. How do you get existing stock into the system?

### InitialReceipt - Your Go-Live Document

The `InitialReceipt` (توريد افتتاحي) is a special receipt type used during system implementation. It lets you:

- Enter all existing inventory quantities
- Set the current values
- Establish opening balances
- Create the initial accounting entries

Think of it as a snapshot of your inventory on day zero of using NaMa ERP. After go-live, you won't use this document type again - it's specifically for initialization.

**Best Practice for Go-Live:**
1. Perform a complete physical inventory count before go-live
2. Value your inventory using your chosen costing method
3. Create initial receipts for each item/location combination
4. Verify total inventory value matches your accounting books
5. Go live!

### OpeningStockDocument - The System's View

The `OpeningStockDocument` (رصيد افتتاحي) is related but slightly different - it's often system-generated and represents the official opening position for accounting purposes. You may not directly create these; the system generates them based on your initial receipts or migration data.

## Damaged and Scrap Receipts

Not everything that comes in is in good condition.

### PurgeStockReceipt - Tracking the Unusable

The `PurgeStockReceipt` (توريد إتلاف) is for receiving items that are damaged, defective, or designated for disposal.

Why bother receiving items you're going to throw away? Because:

1. **Financial Tracking**: You need to know the value of damaged goods for insurance claims or supplier disputes
2. **Compliance**: Regulated industries must track disposal of certain materials
3. **Quality Analysis**: Understanding what percentage of receipts are damaged helps you assess supplier quality
4. **Internal Investigation**: Was it damaged in shipping? In storage? During handling?

You receive these items to a special "purge" or "scrap" location, and later create disposal documents to remove them from inventory. The paper trail is complete.

### ScrapReceipt - Manufacturing Byproducts

In manufacturing, `ScrapReceipt` (استلام خردة) documents scrap materials that result from production. This is different from damaged goods - it's expected byproduct.

For example:
- You stamp 100 metal parts from a sheet, and have scrap metal left over
- You cut fabric for 50 dresses, and have offcut scraps
- You mill wood, and collect sawdust

Receiving scrap into inventory lets you:
- Sell it (scrap metal has value!)
- Track material efficiency
- Calculate true production costs
- Account for the disposition of materials

## Handling Corrections and Cancellations

Mistakes happen. You created a receipt, then realized it was wrong. What now?

### StockReceiptCancellation - Reversing a Receipt

The `StockReceiptCancellation` (إلغاء توريد مخزني) document reverses a previously saved receipt.

**Important**: This is not deletion! The original receipt remains in the system with its history. The cancellation creates an equal-and-opposite transaction that brings inventory back to where it was before.

Why is this important?

- **Audit Trail**: Anyone can see the original receipt, why it was cancelled, and when
- **Accounting Integrity**: The cancellation creates proper accounting reversal entries
- **No Time Travel**: You can't pretend the original transaction never happened - you can only undo its effect going forward

Use cancellation when:
- The receipt was entered with wrong quantities
- Items were received to the wrong location
- The receipt was entered in error (goods never actually arrived)

**Alternative to Cancellation:**
Sometimes instead of cancelling, you create an **adjusting issue document** to remove excess quantities, or a **second receipt** to add missing quantities. This depends on your organization's internal controls and audit requirements.

## Special Receipt Scenarios

### CostRevaluation - Adjusting Values Without Quantities

Sometimes inventory quantities are fine, but the value needs adjustment. The `CostRevaluation` (إعادة تقييم) document changes item values without changing quantities.

Use cases:
- Market value of inventory has declined (write-down for obsolescence)
- Currency revaluation for imported goods
- Correction of costing errors
- Lower of cost or market adjustments

This creates accounting entries only - no physical movement happens.

### WeightScalePreparationDoc - Bulk Material Handling

For businesses that receive bulk materials (grain, chemicals, aggregates), the `WeightScalePreparationDoc` (مستند تحضير ميزان) integrates with electronic weighing scales.

The process:
1. Truck arrives loaded with material
2. Weight the loaded truck (gross weight)
3. Unload the material
4. Weight the empty truck (tare weight)
5. System calculates net weight automatically
6. Creates receipt document for the net quantity

This eliminates manual weight entry errors and speeds up the receiving process.

## Receipts From Specific Sources

Different sources of inventory need different handling:

### ProductDelivery - From Manufacturing

When production is complete, `ProductDelivery` (تسليم منتج) documents finished goods coming out of manufacturing and into finished goods inventory.

The system:
- Increases finished goods
- Decreases work-in-process
- Accumulates costs from materials, labor, and overhead
- Tracks against production order quantities

### RawMaterialReturn - Back from Production

Sometimes production doesn't use all the materials issued. `RawMaterialReturn` (مرتجع مواد أولية) receives unused materials back from production into raw materials inventory.

This keeps your inventory accurate and ensures materials aren't "lost" in the production black box.

## Quality Control Integration

Many organizations don't immediately receive items into regular stock - they go to a quality inspection area first.

### ReceiptInspection - The Gatekeeper

The `ReceiptInspection` (فحص استلام) document records items arriving for inspection. This creates a two-step receipt process:

1. **Initial Receipt to Inspection**: Items arrive and go to "goods under inspection" location
2. **Quality Checks**: Inspection team tests/examines items
3. **Final Disposition**:
   - **Accept**: Transfer to regular stock via another receipt
   - **Reject**: Create return to supplier or move to defective goods
   - **Partial Accept**: Some quantity accepted, some rejected

This ensures only quality-approved items make it into your available inventory. We'll cover more about quality processes in the [Quality Control](./quality-control.md) section.

## The Receipt Life Cycle

Understanding the journey of a receipt document helps you use the system effectively:

### 1. Creation
Someone (receiving clerk, production supervisor, returns processor) creates the receipt document. At this stage, it's a draft - nothing has happened yet.

### 2. Data Entry
Fill in all the details:
- What items and quantities
- Where they're going
- What they cost
- Source information (links to other documents)
- Serial/batch numbers if applicable

### 3. Review (Optional)
Depending on your organization's controls, receipts might require approval before saving.

### 4. Save the Document
When you save the receipt (not as draft):
- Inventory quantities update **immediately**
- Accounting entries are created **right away**
- Serial/lot numbers are recorded
- Changes take effect instantly (can only be reversed via cancellation)

::: tip Draft vs. Save
- **Save as Draft**: Document stored but has NO effect on inventory or accounting. Use for preparation and review.
- **Save (not draft)**: Document immediately updates inventory, accounting, and all related calculations.
- Any future edits to saved documents update the system immediately - no separate "post" step needed.
:::

### 5. History
The receipt becomes part of the item's history. You can trace:
- Where did the items in location A-12-B come from?
- When was serial number 12345 received?
- What was the cost of items received in March?

## Multi-Warehouse and Location Management

Large organizations often have multiple warehouses, and each warehouse has multiple locations (aisles, shelves, bins).

Every receipt specifies:
- **Warehouse**: Which physical warehouse or site
- **Locator**: Specific location within the warehouse

Why this matters:

**Physical Organization**: "Put the new chairs in warehouse 2, aisle C, shelf 4"

**Inventory Separation**: Keep finished goods separate from raw materials, keep high-value items in secure areas, keep chemicals in compliant storage

**Cost Tracking**: Some organizations track costs differently by warehouse (one warehouse has older inventory at different costs)

**Fulfillment Optimization**: When an order comes in, pick from the closest warehouse to the customer

## Understanding Inventory Transactions Behind the Scenes

Every receipt document creates **inventory transactions** that update your stock levels. The system tracks:

- **Transaction ID**: Unique identifier for this movement
- **Item and Quantity**: What moved and how much
- **From/To Locations**: Where it came from (often "none" for receipts) and where it went
- **Transaction Date**: When it happened
- **Cost/Value**: Financial impact
- **Document Reference**: Link back to the receipt document

These transactions are immutable - once saved, they're permanent history. That's why cancellations create new reverse transactions rather than deleting originals.

## Tips for Accurate Receiving

::: tip Best Practices

**Count Everything**
Don't assume the packing slip is correct. Physical count every receipt. Discrepancies between ordered, shipped, and received quantities are common.

**Use Batch Receipts When Appropriate**
If 100 items arrive, you don't need to create 100 separate receipt documents. One document with a line for 100 quantity is fine.

**Record Receipt Time, Not Document Time**
Enter receipts promptly when goods arrive, not days later when you get around to paperwork. Inventory accuracy depends on real-time recording.

**Use Locations Consistently**
Establish clear location naming conventions. "Shelf A3" should always mean the same physical location. Inconsistent location codes lead to "lost" inventory.

**Document Exceptions**
When something unusual happens (partial receipt, damaged goods, missing items), use the remarks field to note what happened and why. Your future self will thank you.

**Serial Number Discipline**
If items require serial numbers, don't skip them! Record them accurately at receipt. Trying to reconstruct serial numbers months later is nearly impossible.

**Link to Source Documents**
Always link receipts to their source (purchase order, production order, sales return, etc.). This traceability is invaluable for investigating discrepancies.

:::

## Common Questions

**Q: We received 100 items but only 95 were good. How do we record this?**

A: Two options:
1. Receive all 100, then immediately issue 5 to a defective location
2. Receive 95 to regular stock and 5 to defective location in one receipt document

Choice depends on whether you want to show the full receipt quantity matching the supplier's paperwork.

**Q: Can we receive items before the purchase order is approved?**

A: Technically yes, but not recommended. The purchase process should complete before receiving. However, emergencies happen - you can create an unlinked receipt, then later match it to the purchase when paperwork catches up.

**Q: What if we receive items with the wrong cost?**

A: If you saved as draft, just correct the cost before saving. If you've already saved the document, you might:
- Create a cost revaluation document
- Cancel and re-receive (if very soon after saving)
- Accept it and let subsequent receipts average the cost

**Q: How do we handle partial receipts against an order?**

A: Create a receipt for the quantity you received. The system tracks what's still outstanding. When the rest arrives, create another receipt. Link both to the same order.

## Next Steps

Now that you understand how items enter your inventory, learn about:
- [Issuing Stock](./issuing-stock.md) - How items leave your warehouse
- [Moving Stock Around](./moving-stock.md) - Transfers and relocations
- [The Purchasing Journey](./purchasing-journey.md) - The complete purchase process that often leads to receipts
