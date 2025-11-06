# Moving Stock Around

Sometimes items don't come in or go out - they just move from one place to another. Let's explore all the ways inventory moves within your organization and how to track these movements properly.

## Stock Transfers: The Basics

A **stock transfer** is any movement of items from one location to another without changing who owns them. The total inventory stays the same - only the location changes.

Think of it like moving money between your checking and savings accounts. Your total wealth doesn't change, but where the money sits does change, and you need to track that.

## The Simple Transfer: One Document, Complete Movement

The `StockTransfer` (سند تحويل مخزني) document handles straightforward transfers in a single step.

### Common Transfer Scenarios

**Between Warehouses**
You have three warehouses: Main (downtown), North Branch, and South Branch. A North Branch customer wants an item you only have at Main. Create a transfer:
- From: Main Warehouse
- To: North Branch Warehouse
- Item: The product
- Quantity: What they need

The system:
- Decreases inventory at Main
- Increases inventory at North Branch
- Total inventory unchanged
- Tracks the item's movement history

**Within a Warehouse**
Even within one building, you might move items:
- From receiving dock to storage location
- From storage to picking area
- From regular storage to promotional display area
- From one shelf to another (reorganization)

**Example**: During warehouse reorganization, you're moving all electronics from Aisle A to the new electronics section in Aisle E. Create transfers to update the system location records to match physical reality.

### How Transfers Work

A transfer simultaneously:
1. **Issues** from the source location (decreases quantity there)
2. **Receives** at the destination location (increases quantity there)

It's atomically both an issue and receipt, wrapped in one document. If the transfer fails or is cancelled, both sides reverse together - you never end up with items lost in limbo.

**Costing Note**: Transfers typically move items at their current cost - no revaluation happens. Items cost the same wherever they sit.

## The Two-Step Transfer: More Control, More Tracking

Some organizations want tighter control over transfers, especially when:
- Items travel between distant locations
- Transit time is significant
- Custody changes hands
- Security or compliance requires tracking in-transit inventory

Enter the two-step transfer process.

### IssueStockTransfer - Sending Items

The `IssueStockTransfer` (صرف تحويل مخزني) documents the **issuing side** of a transfer:
- Items leave the source warehouse
- Inventory decreases at source
- Items are now "in transit"
- Document records what was sent, when, by whom

### ReceiptStockTransfer - Receiving Items

The `ReceiptStockTransfer` (استلام تحويل مخزني) documents the **receiving side**:
- Items arrive at destination warehouse
- Inventory increases at destination
- Items are now "available" at new location
- Document records what was received, when, by whom

### Why Two Steps?

**Tracking In-Transit Inventory**
If items are in a truck for two days between warehouses, you need to know:
- They're not available at the source (already shipped)
- They're not available at the destination (not yet arrived)
- They're in transit (and where: "En route on truck #17")

**Discrepancy Management**
Source warehouse ships 100 items, but destination receives only 98:
- Issue document shows 100 shipped
- Receipt document shows 98 received
- System highlights 2-unit discrepancy for investigation
- Was there damage in transit? Theft? Miscounting?

**Custody Transfer**
When different people/departments are responsible:
- Source warehouse person signs off (issued)
- Destination warehouse person signs off (received)
- Clear accountability at each stage

**Approval Points**
You might require:
- Approval to issue (authorize sending items)
- Separate approval to receive (verify items arrived in good condition)

### The Transfer Request

The `StockTransferReq` (طلب تحويل مخزني) adds another layer: requesting a transfer before executing it.

**Workflow:**
1. **Request**: North Branch: "We need 50 units of Item X from Main"
2. **Review**: Main Warehouse: "We have it, approved"
3. **Issue**: Main ships 50 units
4. **Transit**: Items travel for 1 day
5. **Receipt**: North receives 50 units (or fewer, with explanation)

This ensures:
- Planned transfers (not reactive)
- Coordination between locations
- Visibility of upcoming movements

## Assembly Operations: Transforming Stock

Sometimes moving stock involves changing it. This is where **assembly** comes in.

### AssemblyDocument - Building from Components

The `AssemblyDocument` (سند تجميع) simultaneously:
- **Issues** component items (consumes them from inventory)
- **Receives** finished/assembled item (creates it in inventory)

**Example: Building Computer Systems**
You sell pre-configured computers. You have in inventory:
- 50 computer bases
- 100 monitors
- 100 keyboards
- 100 mice

A customer orders 20 complete systems. Create an assembly document that:

**Issues (Components)**:
- 20 computer bases
- 20 monitors
- 20 keyboards
- 20 mice

**Receives (Finished Product)**:
- 20 complete computer systems

The system:
- Reduces component inventory
- Increases finished system inventory
- Accumulates cost (system cost = base + monitor + keyboard + mouse)
- Maintains total inventory value (value moved from components to systems)

### When to Use Assembly

**Kitting**
Creating kits or bundles for sale. Instead of selling 4 separate items, sell one "Computer Kit."

**Manufacturing Light**
Simple manufacturing without complex production orders. You're not tracking labor and overhead - just combining parts.

**Custom Configurations**
Customer orders a laptop with specific RAM and storage. Assemble from base laptop + RAM module + SSD.

**Display Models**
Assembling components into display models for your showroom.

### AssemblyRequest - Planning Assemblies

The `AssemblyRequest` (طلب تجميع) is the requisition before assembly:
1. Determine what needs to be assembled
2. Request approval (do we have the components? is this the right configuration?)
3. Once approved, create the assembly document
4. Execute the assembly

### Disassembly: Going Backwards

Sometimes you need to disassemble:
- A kit isn't selling, break it back into components
- A configured system needs to be reconfigured differently
- Returned items need to be broken down for restock

Create a "negative" assembly or use the item's `deAssemblyBomMethod` configuration to properly reverse the assembly.

## Reservations: Holding Stock in Place

A **reservation** doesn't physically move items, but it changes their status from "available" to "committed."

### ReservationDocument - Claiming Stock

The `ReservationDocument` (حجز مخزني) reserves stock for a specific purpose:

**For a Sales Order**
Customer places order for 10 laptops. You reserve 10 laptops so:
- They won't be sold to another customer
- They won't be transferred to another branch
- You can confidently promise delivery

The laptops still sit in their warehouse location - they're just flagged as "reserved for order #12345."

**For a Production Order**
Production order requires 500kg of steel. Reserve it so:
- Purchasing knows not to sell this steel
- Other production orders can't claim it
- When production starts, materials are guaranteed available

**For a Specific Customer**
VIP customer has standing order. You reserve stock at your best warehouse, ready to ship when they call.

### ReservationCancellationDoc - Releasing Stock

The `ReservationCancellationDoc` (إلغاء حجز مخزني) cancels a reservation:
- Order was cancelled
- Customer changed their mind
- Production order was postponed
- Reserved too much, need to release excess

Cancelled reservation makes items available again for other purposes.

### Why Reserve Instead of Issue?

**Timing**
You confirm the order today, but delivery is in two weeks. Don't issue today (customer doesn't have the items yet), but do reserve (so you don't accidentally sell them).

**Flexibility**
Reserved items can be unreserved. Issued items are gone. If the customer changes the order, you can adjust reservations more easily than reversing issues.

**Warehouse Operations**
Reserved items can stay in optimal storage locations until needed. Issue happens only when you're ready to physically pick and pack.

## Loading and Delivery: The Physical Journey

The final stage of internal movement is preparing items for departure.

### LoadingDocument - Staging for Shipment

The `LoadingDocument` (مستند تحميل) records that items have been:
- Picked from warehouse locations
- Moved to the loading dock
- Prepared for loading onto delivery vehicle
- Assigned to a specific shipment

This creates a staging area concept. Items are:
- No longer in regular storage (can't be sold to someone else)
- Not yet delivered (still your inventory)
- Ready for loading (organized by shipment)

### DeliveryDocument - Handoff

The `DeliveryDocument` (مستند تسليم) records that items have been:
- Loaded onto vehicle
- Delivered to customer/destination
- Signed for by recipient
- Now out of your custody

This is the final step before items leave your control (usually followed by invoicing, which completes the financial transaction).

### Cancellations

Both have cancellation documents (`LoadingCancellationDoc`, `DeliveryCancellationDoc`) for when:
- Shipment is cancelled
- Items need to be returned to regular storage
- Delivery failed and items came back

## Inventory Adjustments: Fixing Reality

Sometimes inventory in the system doesn't match physical reality. Stock takes (physical counts) reveal discrepancies.

### StockTakingDetails - Counting Everything

The `StockTakingDetails` (جرد مخزني) document records physical count results:
1. Generate count sheets showing expected quantities
2. Physically count items
3. Enter actual counted quantities
4. System compares expected vs. actual
5. Generate adjustment documents for differences

**Why Discrepancies Happen:**
- Theft or loss
- Damage not recorded
- Transactions not entered
- Count errors
- Items in wrong locations

### Adjustments

For items found during counts:
- Create receipt documents (increase inventory to match physical)

For items missing:
- Create issue documents (decrease inventory to match physical)

Always document **why** the adjustment is needed in the remarks field. This helps identify patterns (is one location always short? is one shift having recording issues?).

## Cost Revaluation: Value Without Movement

The `CostRevaluation` (إعادة تقييم) document is special - it doesn't move items at all, just changes their value.

**Use Cases:**

**Market Value Changes**
Electronics you purchased for $1000 each are now worth only $600 (newer model released). Write down the inventory value to match market.

**Obsolescence**
Inventory is aging and won't sell at full price. Adjust value to match expected recoverable amount.

**Currency Revaluation**
Imported inventory was valued at old exchange rates. Revalue to current rates.

**Error Correction**
Items were received at wrong cost. Revalue to correct cost.

This affects accounting only - quantity stays same, location stays same, only value in accounting books changes.

## Tips for Accurate Movement Tracking

::: tip Best Practices

**Transfer for Physical Moves Only**
Only create transfers when items physically move. Don't create "virtual" transfers for reporting convenience.

**Batch Transfers Wisely**
If moving 100 items between warehouses, one transfer document with 100 quantity is cleaner than 100 separate transfers. But if items move at different times, create separate transfers.

**Track In-Transit Time**
For two-step transfers, minimize time between issue and receipt. Long in-transit periods suggest items are lost or the process needs improvement.

**Use Assembly for True Transformation**
Only use assembly when you're actually combining/transforming items. Don't use it as a shortcut for other types of movements.

**Reserve Early, Release Quickly**
Create reservations as soon as you know stock is committed. Cancel reservations promptly when no longer needed (don't tie up stock unnecessarily).

**Document Adjustment Reasons**
Never create adjustments without explaining why in the remarks field. "Count discrepancy" is not enough - explain what investigation revealed.

**Reconcile Regular**
Don't wait for annual physical count. Do cycle counts regularly and reconcile differences immediately.

:::

## Common Questions

**Q: Can we transfer items between different legal entities?**

A: Transfers within one legal entity are simple. Between legal entities, you typically need to use intercompany sale/purchase documents to properly account for the ownership change.

**Q: What happens to reservations when we transfer reserved items?**

A: Reservations typically move with the items - if you transfer reserved stock to another warehouse, it remains reserved for the same purpose at the new location.

**Q: Can we assemble items from multiple warehouses?**

A: Usually assembly happens in one location - components and finished product must be in the same warehouse. If components are in different warehouses, transfer them to one location first, then assemble.

**Q: How do we handle items that are damaged during transfer?**

A: When receiving a transfer, receive the good quantity and document the damaged quantity. Create a separate issue or adjustment to account for the damaged items.

**Q: Should we use two-step or one-step transfers?**

A: Use one-step for transfers within a single location or between nearby locations with minimal transit time. Use two-step when:
- Transit time is significant (hours/days)
- Different people handle shipping vs. receiving
- You need to track in-transit inventory
- Security or compliance requires separation of duties

## Integration Points

Movement tracking connects to:

**Sales**: Reservations ensure you can fulfill orders. Loading and delivery documents prepare items for shipment.

**Manufacturing**: Transfers bring raw materials to production areas. Assemblies create finished products.

**Accounting**: Transfers don't change total inventory value but may affect location-specific reporting. Assemblies reallocate cost from components to finished goods.

**Warehouse Management**: All movements update location tracking, affecting picking efficiency, space utilization, and inventory organization.

## Next Steps

Now you understand inventory movements. Continue to:
- [The Purchasing Journey](./purchasing-journey.md) - How items arrive (often leading to receipts)
- [The Sales Journey](./sales-journey.md) - How items leave (often involving reservations, loading, delivery)
- [Quality Control](./quality-control.md) - How items move through inspection and approval processes
