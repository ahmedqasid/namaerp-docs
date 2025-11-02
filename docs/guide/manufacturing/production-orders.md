# Production Orders: Planning What to Make

## What is a Production Order?

A Production Order (أمر إنتاج) is your formal instruction to the factory: "Make this product, in this quantity, by this date." It's the bridge between planning and execution - where you take all your preparation (BOMs, routings, work centers) and turn them into a concrete plan that the shop floor can work from.

You'll find production orders under **Manufacturing > Documents > Production Order** (التصنيع > المستندات > أمر إنتاج).

Think of a production order as a work packet that contains everything needed for manufacturing:
- What product to make
- How many units
- Which materials to use (from the BOM)
- Which steps to follow (from the routing)
- When to start and finish
- Who can do the work
- Quality standards to meet

The beauty is that most of this information is automatically filled in based on your master data. You select a product and quantity, and the system does the heavy lifting of calculating materials, operations, and resources.

## Creating Your First Production Order

Let's walk through actually creating a production order to see how it all comes together.

### The Basics

You start by opening a new production order and filling in the essentials:
- **Book and Term**: These control document numbering and behavior (like which documents get auto-generated)
- **Product (Item)**: What you're going to make
- **Quantity**: How many units
- **Dates**: When you plan to start and when it should be done

The moment you select a product, something interesting happens. The system looks for the product's default BOM and Routing. If they exist, it automatically loads them into the order. You can always change to a different BOM or routing if needed - maybe you have multiple recipes for the same product, or different production methods.

### The Magic of Auto-Population

Once you've selected your BOM and routing, the system springs into action. It:

**Calculates all component quantities**. If your BOM says you need 2 screws per widget and you're making 100 widgets, you need 200 screws. But it gets smarter - if the BOM accounts for 5% scrap during production, it adds that in. If you have a yield factor (maybe only 95% of components make it through successfully), it adjusts for that too.

**Copies all routing operations**. Every operation from the routing becomes a line in your production order, with sequence numbers (10, 20, 30...). Each operation knows which work center to use, how long it should take, and what resources (labor or machines) are needed.

**Brings in resource requirements**. If an operation needs a specific machine or skilled worker, that gets added to the order automatically.

**Includes any molds or tooling** needed for the operations.

The calculation is based on the actual order quantity versus the BOM base quantity. So if your BOM is defined for making 1 unit but you're making 100, everything scales proportionally.

### Before You Start Production

At this stage, your production order is in "Initial" status. It's a plan, not yet an instruction to begin work. This gives you time to:

**Review the component list**. Maybe you need to substitute a material because the preferred one isn't available. You can change component items, quantities, or specify which lots to use.

**Adjust operation sequences**. In rare cases, you might need to modify the routing for this specific order - maybe skip an operation, or change the work center.

**Check resource availability**. If a critical machine is down for maintenance, you might need to reschedule.

**Verify dates**. The system can help calculate realistic completion dates based on operation durations and the quantity you're making.

When you're satisfied with the plan, you **Start** the production order. This changes its status from "Initial" to "In Progress" and locks down the BOM and routing structure. You can still adjust some things (like dates or dimensional attributes), but the fundamental structure is fixed. This ensures traceability - you can always look back and see exactly what the order called for.

## Understanding the Production Order Structure

A production order isn't just a simple document - it's actually quite rich with information across several areas. Let's break down what's in there.

### The Header

The header contains overall order information:

**Product Definition**: Which item you're making, how many, and any specific attributes like lot numbers, serial numbers, colors, sizes, or revisions. If you're making a blue widget size Large with lot number 2024-001, all that gets tracked here.

**BOM and Routing References**: Links to the master BOM and routing you're using. The system makes copies of these into the order details, but maintains the reference to the originals for reporting.

**Schedule**: Planned start and finish dates, plus actual start and finish dates (filled in as production progresses).

**Status**: Initial, In Progress, Closed, or Terminated. This drives what you can and can't do with the order.

**Quality**: References to quality checklists and assurance requirements.

**Source**: If this order came from somewhere else (like an MRP run or a production request), that link is maintained.

### Component Details

This collection shows every material you need to consume. Each line includes:

- Which component item
- How much you need
- At which operation it gets consumed (important for operation-by-operation material issuing)
- How it should be issued (manually, automatically with the BOM, or automatically as operations are executed)
- Specific dimensional details (lot, serial, location in warehouse)
- Any yield or potency adjustments

When materials are actually issued during production, the system creates Material Issue documents and links them back to these component lines.

### Co-Products

Some manufacturing processes create multiple outputs. When you process crude oil, you get gasoline, diesel, and other products. When you butcher meat, you get various cuts and by-products.

The co-products collection tracks these secondary outputs. Each co-product line includes:
- The item being produced
- Expected quantity
- Whether it's a valuable co-product or just a by-product
- What percentage of the total cost it should bear
- Where to deliver it (warehouse and location)

### Routing Operations

This is your step-by-step manufacturing process. Each operation line has:

**Operation Sequence**: Usually numbered 10, 20, 30, 40... (leaving gaps makes it easy to insert new operations if needed).

**Operation Description**: What work gets done - "Cut material", "Weld joints", "Paint finish", "Quality inspection".

**Work Center**: Where it happens - maybe "Cutting Machine 1" or "Assembly Line B".

**Time Estimates**: How long the operation takes. This can be split into setup time (one-time prep) and run time (time per unit). The system uses this for scheduling and capacity planning.

**Quantity Flow**: How many units pass through this operation. Sometimes you lose a few units along the way due to scrap or samples.

**Over-Production Controls**: You can set limits on how much over-production is allowed. Maybe the final operation can only produce 5% more than ordered, but the first operation (cutting raw materials) can have unlimited over-completion because you want to account for downstream losses.

**Quality Requirements**: Links to inspection checklists. Quality staff must complete these before the operation is considered done.

**Parallel Manufacturing**: A flag indicating if multiple work centers can do this operation simultaneously to increase throughput.

### Resource Requirements

For each operation, you might need various resources - people or machines. Each resource line specifies:

- Which resource (Labor Class A, CNC Machine #3, Forklift, etc.)
- How much (maybe 2 workers, or 1 machine)
- The basis (fixed time regardless of quantity, time per unit, or time per batch)
- Whether it's automatically charged to the order or needs manual confirmation

This data feeds into capacity planning (are we overloading any resources?) and cost accounting (how much labor and machine time did this order consume?).

### Molds and Tooling

Some manufacturing - like injection molding or die casting - requires special tooling. The molds collection tracks which molds are needed for which operations. This helps with:
- Ensuring molds are available before starting production
- Tracking mold usage for maintenance scheduling
- Costing mold usage charges to products

## The Production Order Lifecycle

Let's follow a production order from birth to completion.

### Creation

Production orders can come into existence several ways:

**Manual Creation**: You simply create a new order, pick a product, enter a quantity. This is common for make-to-order scenarios or when responding to specific customer requests.

**From MRP**: If you're running Material Requirements Planning, the system analyzes demand (from sales orders, forecasts, etc.) and automatically generates proposed production orders. You review these proposals and convert them to actual orders.

**From Production Requests**: Some companies like a two-step process - planners create Production Order Requests (proposals), they go through an approval workflow, then approved requests are converted to actual Production Orders.

**From Aggregated Orders**: You might collect multiple small requirements and batch them into an aggregated order, then generate individual production orders from it.

However they're created, they all follow the same lifecycle after that.

### BOM Explosion

When you select a BOM, the system performs "BOM explosion" - it breaks down the product structure into actual material requirements.

For a simple product, this is straightforward. For complex assemblies with sub-assemblies, it gets interesting. The system can explode multiple levels. If you're making a car:
- The car needs an engine (level 1)
- The engine needs a crankshaft (level 2)
- The crankshaft needs special steel (level 3)

The system cascades through all levels, calculating total raw material needs.

It also handles tricky scenarios like:
- **Scrap factors**: If you expect to waste 10% of material during cutting, it adds 10% more to the requirement.
- **Yield factors**: If only 95% of components pass quality control, it adjusts quantities to ensure you end up with the right amount of good parts.
- **Phantoms**: Sometimes you have "phantom" sub-assemblies that exist in the BOM for engineering purposes but are never actually stocked - they're assembled and immediately used. The system handles these seamlessly.

### Lot Collection and Material Staging

Before production can start, you need to identify which actual inventory you'll use. If you track by lot numbers (common in food, pharma, chemicals), this is critical for traceability.

Nama ERP has "Collect Lots" functionality. You tell it which component you need, and it searches your inventory for available lots. It can apply rules like FIFO (First In, First Out) or FEFO (First Expired, First Out). You review the suggestions and approve them.

Similarly, if you track items by boxes or pallets, there's "Collect Boxes" functionality.

Once you know which lots you're using, you can create **Reservation Documents** to lock that inventory for this production order. This prevents the warehouse from shipping that material to customers or using it for another order.

You might also create Material Issues at this stage to physically move materials from the warehouse to the shop floor, ready for production. Or you might wait and issue materials as each operation needs them. It depends on your factory's workflow.

### Starting the Order

When everything's ready, you click the **Start Production** button. This is significant because:

1. The order status changes from "Initial" to "In Progress"
2. The BOM and routing structure gets locked - you can't add/remove components or operations anymore
3. The system records the actual start date
4. Shop floor personnel can now start recording work against this order

If you realize you made a mistake and need to go back, there's a **Cancel Start** action - but it only works if no production has been executed yet and no downstream documents have been created.

### Production Execution

Now the real work begins. As operations are performed on the shop floor, workers (or supervisors) record what happened using Production Execution documents.

These executions might say:
- "Moved 50 units from Operation 10 to Operation 20"
- "Found 5 defective units at Operation 30, moving them to Rejected status"
- "Took 2 samples at Operation 40 for quality testing"

Each execution can automatically trigger other documents:
- **Material Issues**: If you configured components to be issued automatically during execution, the system creates these as operations consume materials.
- **Resource Vouchers**: Recording actual labor and machine hours used.
- **Quality Documents**: If operations have quality checklists, the system can generate quality control documents that must be filled out.
- **Product Deliveries**: When the final operation is completed, the system can automatically receive finished goods into inventory.

We'll cover execution in detail in its own guide, but the key point is that production orders and production executions are tightly linked. The order is the plan; execution is the reality.

### Tracking Progress

Behind the scenes, Nama ERP maintains something called **Production System Entries**. These track exactly where quantities are at any moment.

For each operation in your order, the system knows:
- How many units are waiting to move forward (ToMove status)
- How many were rejected for rework
- How many were scrapped
- How many are held as samples

This gives you real-time visibility. You can open a production order and immediately see: "Operation 20 has 75 units ready to move forward, Operation 30 has 60 units in progress, we've scrapped 3 units so far."

Production managers love this because they don't have to walk the factory floor to know the status - it's right there in the system.

### Handling the Unexpected

Manufacturing rarely goes perfectly to plan. Nama ERP handles the reality:

**Rework**: When quality finds problems, units move to Rejected status. They can then be sent back to an earlier operation for rework, fixed, and sent through the process again.

**Scrap**: Sometimes units are damaged beyond repair. They move to Scrap status. The system tracks scrap quantities for cost accounting and process improvement.

**Over-production or Under-production**: Maybe your yields are better than expected and you're producing more units than planned. Or maybe a problem caused you to produce less. The system allows this (within configured limits) and tracks the actual quantities.

**Parallel Paths**: Some products can have operations that run in parallel. Maybe units can go through Paint Line A or Paint Line B simultaneously. The system supports this with parallel operation flags and handles the complexity.

### Completion

Eventually, the final operation is complete, and all your finished goods are delivered to inventory. The order is functionally done, but it's still "In Progress" status.

To truly finalize the order, you create an **Order Close Voucher**. This:
- Calculates the total actual costs (materials, labor, overhead)
- Compares to standard costs if you have them
- Updates finished goods inventory values
- Generates accounting entries
- Changes the order status to "Closed"

Once closed, the order is locked. No more executions, no more changes. It's history.

(There's also an option to **Terminate** an order if you're cancelling it without completion - maybe the customer cancelled, or you discovered a design flaw, or raw materials are unavailable.)

## Special Features Worth Knowing About

### Permitted Percentages and Over-Completion

In a perfect world, you'd order 100 units and produce exactly 100 units. Reality is messier.

You can set **Permitted Percentages** on operations. If Operation 50 has a 5% permitted percentage and you ordered 100 units, workers can produce up to 105 units without errors or warnings.

Why allow this? Sometimes you need over-production at early operations to account for losses downstream. You might cut 110 pieces knowing that 5 will fail inspection and 5 will be damaged during finishing. End result: 100 good units.

For the first operation, there's even an **Unlimited Over-Completion** flag. This lets you produce as much as needed at that stage, accounting for all downstream losses.

### Multi-Level BOMs and Sub-Assemblies

Nama ERP shines with complex products. You can have a finished product made from sub-assemblies, which are themselves made from components.

The system can handle this in two ways:

**Full Explosion**: Explode all levels of the BOM down to raw materials. Create one production order for the top-level product, and the component list includes everything down to the lowest level. This works for products where sub-assemblies aren't stocked separately.

**Nested Production Orders**: Create separate production orders for sub-assemblies. Make the sub-assemblies first, receive them to inventory, then consume them when making the final product. This works when sub-assemblies are standard items used in multiple products.

You choose the approach based on your business needs.

### Co-Products and By-Products

Some manufacturing inherently creates multiple products. The classic example is petroleum refining - you don't just make gasoline, you also get diesel, jet fuel, and various petrochemicals.

The co-products collection lets you track all outputs. Each co-product can have:
- Its own quantity
- Its own destination (warehouse and location)
- Its own cost share (what percentage of the total production cost it bears)

When you close the production order, costs are allocated across the main product and co-products based on the percentages you set.

### Quality Integration

Quality is built into the process, not bolted on.

Operations can have **Quality Control Checklists** or **Quality Assurance Checklists** attached. When a production execution reaches that operation, the system automatically generates a Quality Control document with all the check items from the checklist.

Quality inspectors fill out the document, answering questions and recording measurements. The document might need approval before production can continue - you configure this based on your quality requirements.

This ensures quality gates are actually enforced, not skipped.

### Cost Tracking Throughout Production

Even before you close the order, the system is tracking costs. Fields on the production order header accumulate:
- **Material Issue Cost**: Every material issued to the order
- **Material Return Cost**: If materials are returned (maybe you over-issued)
- **Resources Cost**: Labor and machine time
- **Molds Cost**: Tooling usage
- **Scrap Cost**: Value of scrapped units
- **Delivered Product Cost**: Value of finished goods delivered
- **Returned Product Cost**: If finished goods are returned for rework

You can check these anytime to see how much you've spent on the order so far.

### Production Order Requests and Approval Workflows

Some organizations want a formal approval process before manufacturing can begin. Production Order Requests serve this purpose.

The flow is:
1. Planner creates a Production Order Request (a proposed order)
2. Request goes through approval workflow (maybe production manager, then materials manager)
3. Approved requests are converted to actual Production Orders
4. Production begins

This separates planning from authorization, giving management control over what gets produced.

### Aggregated Production Orders for Batch Planning

If you're running a weekly planning cycle and have dozens or hundreds of small requirements, creating individual production orders for each is tedious.

**Aggregated Production Orders** let you:
1. Create one aggregated order
2. Add multiple lines (different products, different quantities, different due dates)
3. Review and adjust the whole batch
4. Generate individual production orders from each line with one click

It's a time-saver for high-volume, make-to-stock environments.

The system can even merge similar lines. If you have three separate requirements for the same product in the same week, it can combine them into one larger production order.

## Common Workflows

Let's look at a few typical scenarios.

### Scenario: Make-to-Order Manufacturing

A customer orders 50 custom widgets. Here's how it flows:

1. Sales creates a Sales Order for 50 widgets
2. Planner creates a Production Order linked to that sales order
3. Selects product, quantity 50, desired delivery date
4. System populates BOM and routing automatically
5. Planner reviews, adjusts if needed (maybe customer wants a different color)
6. Starts the production order
7. Materials are issued to the shop floor
8. Shop floor executes production operation by operation
9. Finished goods are delivered to inventory
10. Order is closed, costs are finalized
11. Widgets are shipped to customer

The production order ties everything together - you can trace from the customer order to the materials consumed to the shop floor work to the finished goods to the shipment.

### Scenario: MRP-Driven Make-to-Stock

You manufacture standard products to keep inventory stocked. MRP helps automate the planning:

1. System looks at sales forecasts, current inventory, and open sales orders
2. Calculates net requirements (what you need to make)
3. Generates proposed production orders to meet those requirements
4. Planner reviews the proposals, adjusts quantities or dates if needed
5. Converts approved proposals to actual production orders
6. Starts the orders
7. Production executes
8. Finished goods replenish inventory
9. Orders are closed

This can run weekly or even daily, constantly adjusting production plans based on changing demand.

### Scenario: Rework and Quality Issues

You're producing a batch of 100 units. At Operation 30 (painting), quality inspection finds that 10 units have defects.

1. Production Execution moves 90 units from Op30-ToMove to Op40-ToMove (they passed inspection)
2. Another execution moves 10 units from Op30-ToMove to Op30-Rejected (they failed)
3. Units in Rejected status are sent back: move 10 units from Op30-Rejected to Op20-ToMove (re-do sanding before re-painting)
4. Those 10 units work through Op20 and Op30 again
5. This time they pass inspection and move forward with the rest

The system tracks all this. Reports can show you how much rework you're doing, where defects are occurring, which operations have the highest failure rates - valuable data for continuous improvement.

## What You Can and Can't Do

Understanding the constraints helps avoid frustration:

### When the Order is "Initial"

✅ You can change anything - BOM, routing, components, operations, quantities, dates
✅ You can delete the order
✅ You can start the order

❌ You can't execute production (must be In Progress first)

### When the Order is "In Progress"

✅ You can execute production
✅ You can adjust dates
✅ You can modify component quantities or specify lots
✅ You can adjust operation parameters like permitted percentages
✅ You can close or terminate the order

❌ You can't add or remove components (the BOM is locked)
❌ You can't add or remove operations (the routing is locked)
❌ You can't delete the order (if any work has been done)

### When the Order is "Closed"

✅ You can view everything for historical reference
✅ You can run cost reports and variance analysis

❌ You can't change anything (it's locked)
❌ You can't execute more production
❌ You can't re-open it (closed is final)

This lifecycle ensures data integrity. Once you've started production and are consuming materials and recording labor, you can't go back and change what the order was supposed to be. What you see is what actually happened.

## Tips for Success

A few practical suggestions from experience:

**Start with good BOMs and routings**. The production order is only as good as the master data it's based on. Invest time in getting BOMs accurate (correct quantities, scrap factors, yields) and routings realistic (accurate operation times, correct work centers). Bad master data leads to constant manual adjustments.

**Use standard operations**. If you do the same operation on many products, create a standard operation template. It ensures consistency and saves data entry time.

**Let the system do the calculations**. Don't override component quantities unless you have a good reason. The system's calculations account for yields, scrap, and order quantity scaling. Manual overrides often lead to shortages or excess.

**Start orders when you're ready to produce, not months in advance**. The "In Progress" status is meant for active production. If you start orders too early and then priorities change, you end up with lots of open orders that aren't actually being worked on.

**Close orders promptly when production is done**. Open orders consume system resources and clutter reports. A few weeks after production completes, close the order. You can still reference it later, but it's clearly marked as finished.

**Use production requests or aggregated orders for batch planning**. If you're creating dozens of similar orders, these tools make life much easier than creating them one by one.

---

::: tip Next Step: Execution
Creating a production order is planning. The next step is actually doing the work. Check out the [Production Execution](./production-execution.md) guide to learn how shop floor activities are recorded.
:::

::: warning Locked After Starting
Once you start a production order, the BOM and routing structure is locked. Double-check everything before starting.
:::
