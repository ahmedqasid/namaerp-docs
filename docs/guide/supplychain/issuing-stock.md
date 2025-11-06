# Issuing Stock from Your Warehouse

What goes in must come out! While [receiving stock](./receiving-stock.md) is about bringing items into your warehouse, issuing is about releasing them for use. Let's explore when, why, and how items leave your inventory.

## The Stock Issue Document: Your Inventory Exit Point

A **stock issue** (entity `StockIssue` or صرف مخزني in Arabic) is the formal record that items left your warehouse at a specific time for a specific purpose. Just like receipts, different scenarios call for different types of issue documents.

## The General Stock Issue: Your Go-To Tool

The `StockIssue` document is your general-purpose tool for releasing items from inventory for any reason other than sales (which have their own process we'll cover in [The Sales Journey](./sales-journey.md)).

### Common Scenarios

**Issuing to Production**
Your manufacturing floor needs 500 kg of steel to make furniture. You create a stock issue that:
- Reduces raw materials inventory by 500 kg
- Records which production order received the materials
- Accumulates cost to work-in-process
- Tracks what was issued to whom and when

**Internal Department Use**
The IT department needs 10 laptops for a new project. Create a stock issue to:
- Move laptops from "available" to "in use by IT"
- Track who has custody of the items
- Reduce available inventory (so you don't accidentally sell those laptops)
- Know where to find the laptops later

**Samples and Demonstrations**
Your sales team needs product samples for a trade show. Issue them with notes about the purpose, so you can:
- Track what was given out vs. what's available to sell
- Account for the cost of samples (marketing expense)
- Follow up after the trade show (were samples returned? converted to sales?)

**Shrinkage and Loss**
During inventory count, you discover 5 widgets are missing. Create an issue to:
- Formally remove them from tracked inventory
- Record the loss for accounting
- Document when and why (theft? damage? miscounting?)

**Donations**
You're donating old equipment to a charity. Issue the items with:
- Proper documentation for tax purposes
- Fair market value recording
- Recipient information

### How It Works

Every issue document requires:

1. **Source Location**: Where are items being taken from? Which warehouse and specific location?

2. **Items and Quantities**: What's going out and how much? Include unit of measure.

3. **Purpose/Recipient**: Where are these items going? Production order? Department? Customer? External party?

4. **Cost Method**: How should cost be calculated? (Usually automatic based on your costing method)

The system then:
- Decreases inventory quantity in the source location
- Reduces inventory asset value
- Creates accounting entries (crediting inventory, debiting expense or WIP)
- Records which specific serial numbers or batches were issued
- Updates available-to-promise calculations
- Creates transaction history

## The Request-First Approach

In many organizations, you don't just randomly issue items - someone first requests them. This creates a two-step process with better control.

### StockIssueReq - The Requisition Document

The `StockIssueReq` (طلب صرف مخزني) is a request for items. Think of it as a formal shopping list that must be reviewed and approved before items are actually issued.

**The Workflow:**

1. **Request**: The production department creates a stock issue request: "We need 100 kg steel, 50 bolts, 20 liters of paint for production order #12345"

2. **Review**: Warehouse supervisor reviews:
   - Do we have these items in stock?
   - Is this a valid production order?
   - Are quantities reasonable?

3. **Approval**: Once approved, the request becomes authorized

4. **Fulfillment**: Warehouse creates the actual `StockIssue` document, linked to the request

5. **Issuance**: Items are physically picked and issued, document is saved (not draft)

**Why the extra step?** Because it gives you:
- **Control**: Not everyone can just take items - they must request and be approved
- **Planning**: Warehouse can prepare items before the production line needs them
- **Visibility**: Management sees what's being consumed before it's consumed
- **Audit Trail**: Clear record of who requested what and who approved it

This is especially important for:
- High-value items
- Controlled substances
- Items subject to budget constraints
- Organizations with complex approval hierarchies

## Issuing for Manufacturing

Manufacturing has special issue requirements because materials consumed must be tracked to production orders and eventually cost into finished products.

### RawMaterialIssue - Feeding Production

The `RawMaterialIssue` (صرف مواد أولية) document specifically handles issuing raw materials to manufacturing.

**The Story:**
Production order #12345 is scheduled to make 100 wooden chairs. The bill of materials says each chair needs:
- 5 kg of wood
- 4 bolts
- 0.5 liters of varnish

You create a raw material issue for:
- 500 kg wood
- 400 bolts
- 50 liters varnish

All issued to production order #12345.

The system:
- Reduces raw materials inventory
- Increases work-in-process for PO #12345
- Tracks material cost for eventual product costing
- Compares issued quantities to planned quantities (variance analysis)

### RawMaterialIssueReq - Planning Material Needs

The `RawMaterialIssueReq` (طلب صرف مواد أولية) is the requisition before the issue. Production planners create these to:
- Request materials be ready when production starts
- Allow warehouse to prepare materials in advance
- Get approval for consuming materials

Often these are auto-generated when a production order is released!

## Handling Special Cases

### HMSFeedingIssue - Hospital Ward Supply

Hospitals have unique requirements. The `HMSFeedingIssue` documents issuing supplies from the central pharmacy or warehouse to:
- Patient wards
- Operating rooms
- Clinical departments

This tracks:
- Which department received which supplies
- Cost allocation to departments
- Par level replenishment
- Controlled substance tracking

### ContractingMaterialIssue - Job Site Materials

For contracting businesses, the `ContractingMaterialIssue` documents materials sent to job sites. This is crucial because:
- Materials might be at multiple active job sites
- You need to track cost by project
- Materials might be returned from site (unused materials)
- Job costing depends on accurate material tracking

### ItemCuttingDoc - Material Transformation

The `ItemCuttingDoc` (مستند تقطيع) handles a special case: when you're not just issuing material, but transforming it.

**Example**: You have a roll of fabric (100 meters). You cut it into pieces:
- 20 pieces of 2 meters each
- 15 pieces of 1.5 meters each
- 10 pieces of 3 meters each

This document:
- **Issues** the full roll (100 meters)
- **Receives** 45 cut pieces of various sizes
- **Tracks** waste (100 meters issued vs. 95 meters in cut pieces = 5 meters waste)

It's simultaneously an issue and receipt - a transformation document.

## The Issue Life Cycle

Understanding the document journey:

### 1. Creation (Optional Request)
If your organization uses requisitions, start with `StockIssueReq`. Otherwise, go straight to creating the issue.

### 2. Data Entry
Specify:
- Items and quantities to issue
- From which location
- For what purpose (production order, department, project, etc.)
- Any special instructions

### 3. Availability Check
The system checks:
- Do we have enough quantity in the specified location?
- Are serial numbers/batches selected correctly?
- Will this cause negative inventory?

Depending on your overdraft policy, the system might prevent, warn, or allow going negative.

### 4. Approval (Optional)
Depending on item value, quantity, or organizational policy, the issue might require approval before saving.

### 5. Physical Picking
Someone physically retrieves items from the warehouse. For complex picks, you might print a picking list.

### 6. Save the Document
When you save (not as draft):
- Inventory quantities decrease immediately
- Accounting entries are created right away
- Serial/lot numbers are removed from available inventory
- Transaction history is recorded

### 7. Potential Return
Sometimes issued items come back unused. Create a receipt document to return them to available stock.

## Batch Selection: Which Items Get Issued?

When you have multiple batches of the same item, which ones get issued? The system can automatically select based on:

**FIFO (First In, First Out)**
Issue oldest inventory first. Good for:
- Perishable items
- Items with shelf life
- Preventing obsolescence

**LIFO (Last In, First Out)**
Issue newest inventory first. Sometimes used for:
- Tax optimization (in jurisdictions where allowed)
- Items where newer is better (technology)

**FEFO (First Expiry, First Out)**
Issue items with earliest expiration date first. Essential for:
- Pharmaceuticals
- Food products
- Any item with expiration dating

**Manual Selection**
Sometimes you need to manually pick which batch:
- Quality considerations
- Customer preferences
- Specific lot requirements

## Serial Number Management

For serialized items, issuing requires specifying exactly which serial numbers are leaving.

**The Process:**
1. System shows all available serial numbers in the source location
2. User selects which serial numbers to issue (or scans them)
3. System verifies each serial number is available
4. Upon saving, those serial numbers move from available to issued
5. Future tracking: "Where is serial #12345?" shows it was issued on X date to Y department

This level of tracking is crucial for:
- Warranty tracking
- Recall management
- Asset management
- Compliance requirements

## Reservations and Committed Stock

Sometimes stock is physically in the warehouse but not really "available" - it's reserved for a specific purpose.

When you issue reserved stock, the system:
- Checks that you're issuing to the correct purpose (the one it was reserved for)
- Releases the reservation as you issue
- Prevents accidentally issuing someone else's reserved items

## Accounting Impact of Issues

Every issue has accounting consequences. What happens depends on the purpose:

**Issue to Production**
- Credit: Raw Materials Inventory
- Debit: Work-in-Process Inventory

**Issue to Department (Internal Use)**
- Credit: Inventory
- Debit: Department Expense Account

**Issue for Samples (Marketing)**
- Credit: Inventory
- Debit: Marketing Expense

**Issue for Warranty Replacement**
- Credit: Inventory
- Debit: Warranty Expense

**Issue to Repair (To Be Returned)**
- Credit: Inventory
- Debit: Inventory-Under-Repair (Still an asset!)

The system creates these entries automatically based on how you configured the item's accounting settings and the issue purpose.

## Correcting Issue Mistakes

What if you issued too much? Too little? Wrong item?

**Option 1: Receipt Document**
If you issued too much and items are returned, create a receipt to bring them back.

**Option 2: Adjustment Issue**
If you issued too little, create another issue for the additional quantity.

**Option 3: Negative Issue (Careful!)**
Some systems allow negative quantity issues (effectively receipts). Use cautiously - this mixes receipt and issue concepts.

**Option 4: Cancellation and Reissue**
Cancel the wrong issue, then create a new correct one. Cleanest audit trail but most work.

Choose based on your organization's controls, how much time has passed, and whether downstream processes (like production costing) have already used the issue data.

## Tips for Accurate Issuing

::: tip Best Practices

**Verify Before Saving**
Double-check quantities and items before saving (not as draft). Once saved, the document affects the system immediately.

**Use Locations Precisely**
Issue from the exact location where items physically are. Don't issue from "Warehouse 1" generically - issue from "WH1-Aisle-A-Shelf-3".

**Link to Source Docs**
Always link issues to their purpose: production order number, sales order number, requisition number, project code. This traceability is essential.

**Don't Stockpile Issues**
Enter issues when they happen, not in batch at the end of the day/week. Real-time inventory accuracy requires real-time recording.

**Serial Number Accuracy**
If you're issuing serialized items, scan or carefully record serial numbers. Wrong serial numbers mean inventory inaccuracy.

**Handle Partial Issues**
If you can only issue part of a request (not enough stock), issue what you have and note the shortage. Don't wait until you can fulfill the entire request.

**Use Remarks**
When something unusual happens, document it in the remarks field. Future you will need this context.

:::

## Common Questions

**Q: Can we issue items we don't have (go negative)?**

A: It depends on the item's overdraft policy. Some items (critical supplies) might prevent negative inventory. Others might warn but allow. Check with your system administrator about policies for different item categories.

**Q: We issued the wrong items. Can we reverse the issue?**

A: You can't "un-post" an issue, but you can:
1. Receive the wrong items back (undo the effect)
2. Issue the correct items
This maintains proper audit trail.

**Q: How do we handle partial returns of issued items?**

A: Create a receipt document for the returned quantity, linking it to the original issue document. This handles scenarios like issuing 100 units but 10 come back unused.

**Q: What's the difference between issuing and transferring?**

A: **Issue** reduces total inventory (items left the organization's control). **Transfer** moves items between locations but total inventory stays the same. Issue to a customer is an issue. Move from warehouse A to warehouse B is a transfer.

**Q: Can one issue go to multiple purposes?**

A: Technically yes - one issue document can have multiple lines for different purposes. But often it's clearer to create separate issues when the purposes are different (one for production, one for samples, etc.).

## Integration with Other Processes

Issues connect to many other business processes:

**Manufacturing**: Issues feed production orders, which eventually produce finished goods receipts.

**Sales**: While direct sales use specialized sales documents, sometimes you issue items for demonstrations, samples, or sales kits.

**Projects**: For project-based businesses, issues allocate costs to specific projects or job numbers.

**Maintenance**: Issuing spare parts reduces parts inventory and increases maintenance expense or asset improvement cost.

**Quality Control**: Sometimes you issue items for destructive testing - they're consumed in the quality process.

## Next Steps

Now you understand both receiving and issuing. Next, learn about:
- [Moving Stock Around](./moving-stock.md) - Transfers, assemblies, and transformations
- [The Purchasing Journey](./purchasing-journey.md) - How purchased items arrive (leading to receipts)
- [The Sales Journey](./sales-journey.md) - How sold items leave (leading to issues)
