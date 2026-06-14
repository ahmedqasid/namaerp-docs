# Production Costing: Following the Money

## The Real Cost of Making Things

Here's a question that keeps manufacturing managers up at night: *How much did it actually cost to make that product?*

It sounds simple, but it's surprisingly tricky. Sure, you know what you spent on materials - you have the invoices. You know how much labor time went into it - you tracked the hours. But what about the factory rent? The electricity bill? The supervisor's salary? The equipment depreciation? How do you fairly allocate those costs across all the different products you make?

And even more important: Did production go according to plan? Did you spend what you expected, or were there surprises? If you're spending more than expected, where is the money going?

This is what production costing is all about. It's the financial truth-telling part of manufacturing - tracking every dollar (or riyal, or whatever currency you use) that went into making your products, and figuring out if you're making money or losing it.

You'll find the main document under **Manufacturing > Documents > Order Close** (التصنيع > المستندات > إغلاق أمر إنتاج).

## Understanding Manufacturing Costs: The Three Buckets

Think of manufacturing costs as falling into three buckets. Two are easy to track, one is... complicated.

### Bucket 1: Direct Materials - The Easy One

These are the raw materials and components that physically go into your product. You can point at them and say "this steel sheet, these screws, that paint - they're all in the finished product."

Tracking this is straightforward: When you issue materials to a production order, the system records the cost. If you issued 100 kg of steel at $5/kg, that's $500 of material cost. Done.

The system uses your inventory costing method (FIFO, Average, or Standard) to value the materials. If you're using lot-tracked materials, it knows exactly which lot you consumed and what that lot cost.

### Bucket 2: Direct Labor and Machine Time - Still Pretty Clear

These are the people and machines directly making the product. The welder spending 4 hours on this order, the CNC machine running for 2 hours - you can tie these directly to the production order.

When you record production executions, the system creates Resource Vouchers tracking this time. If your welder costs $30/hour and worked 4 hours, that's $120 of labor cost. If your CNC machine costs $75/hour and ran for 2 hours, that's $150 of machine cost.

Again, pretty straightforward. You have the time, you have the rates, you multiply. The costs get accumulated on the production order.

### Bucket 3: Manufacturing Overhead - The Complicated One

This is where it gets interesting. These are all the other costs of running a factory that you can't tie to a specific product:

**The factory itself**: You pay rent whether you make 100 units or 1000 units. How much of that rent should this particular production order bear?

**Utilities**: The electricity bill covers the whole factory. Sure, running machines uses power, but so does lighting, heating, ventilation. How do you split it up?

**Indirect labor**: Your production supervisor oversees multiple production lines. Quality inspectors check various products. Material handlers move stuff around. How much of their salary goes to each order?

**Equipment depreciation**: That expensive machine depreciates every month whether you use it heavily or barely at all. How do you charge that to products?

**Supplies and consumables**: Lubricants, cleaning materials, protective equipment, small tools - they support production but aren't in the final product.

**Facility costs**: Insurance, property taxes, maintenance, security - all necessary, none directly traceable to a specific product.

This overhead is real money you're spending. It needs to be recovered through product pricing. But how do you allocate it fairly?

## Overhead Allocation: Making the Invisible Visible

This is where **Overhead Types** (التكاليف الغير مباشرة) come in. An overhead type is your formula for spreading indirect costs across products.

Think of it as a recipe for overhead allocation. You define overhead "elements" (like "Factory Rent", "Utilities", "Supervision") and tell the system how to calculate each one.

### Method 1: Fixed Amount per Order

The simplest approach. Every production order gets charged a flat amount.

```
Overhead Element: "Production Setup Cost"
Method: Fixed $500 per order
```

Whether you're making 10 units or 1000 units, you get charged $500. This works if setup/administrative overhead is roughly the same regardless of order size.

**When to use it**: Small-batch manufacturing where setup costs dominate. Job shops. Custom manufacturing.

**Limitation**: Unfair to large orders (they subsidize small orders) and small orders might look unprofitable when they're really not.

### Method 2: Percentage of Material Cost

Allocate overhead as a percentage of direct material cost.

```
Overhead Element: "Material Handling Overhead"
Method: 12% of material cost
```

If an order consumed $10,000 in materials, it gets charged $1,200 in overhead.

**When to use it**: When overhead correlates with material value. More expensive materials often require more careful handling, storage, and quality control.

**Real example**: You make both budget products with cheap materials and premium products with expensive materials. The premium products need climate-controlled storage, extra security, more careful handling. A percentage of material cost is a fair way to allocate those costs.

### Method 3: Percentage of Labor Cost

Similar idea, but based on direct labor.

```
Overhead Element: "Labor Burden"
Method: 35% of direct labor cost
```

If an order consumed $8,000 in direct labor, it gets charged $2,800 in overhead.

**Why 35%?** That might cover payroll taxes, benefits, training, supervision, and HR costs. In many countries, for every dollar you pay in wages, you're spending another 30-40% on labor-related overhead.

**When to use it**: When indirect labor overhead (supervision, training, HR) is significant. Labor-intensive manufacturing.

### Method 4: Rate per Production Hour

Charge based on how long products were in production.

```
Overhead Element: "Facility Overhead"
Method: $50 per production hour
```

If an order took 80 hours to produce (from start to finish), it gets charged $4,000 in overhead.

**When to use it**: When time on the factory floor is the main cost driver. The longer something occupies your facility, the more rent, utilities, and depreciation it should bear.

**Getting the rate**: Add up all your monthly overhead costs (rent, utilities, depreciation, supervision, etc.), divide by the total production hours per month. That's your overhead rate per hour.

### Method 5: Rate per Unit Produced

Charge a fixed amount per unit.

```
Overhead Element: "Quality Control Overhead"
Method: $3 per unit
```

Produce 500 units, get charged $1,500 in overhead.

**When to use it**: When certain overhead costs scale directly with volume. If every unit needs an inspection and inspections cost about the same per unit, this makes sense.

### Method 6: The Actual Overhead Calculator - Getting Real

All the above methods use predetermined rates - you're estimating what overhead should be. But what if you want to use actual overhead costs?

That's where the **Actual Overhead Calculator** (طريقة حساب فعلي للمصاريف الغير مباشرة) comes in.

Instead of guessing, you tell the system: "Go look at the actual general ledger accounts for factory overhead. Take the real numbers from accounting."

```
Overhead Element: "Actual Factory Utilities"
Source: GL Account 5400 (Utilities Expense)
Period: This month
```

At month-end, the system queries account 5400, finds you spent $15,200 on utilities this month, and allocates that actual cost across all production orders closed this month.

**The beauty**: You're using real numbers, not estimates.

**The trade-off**: You can only finalize costs at period-end when you have actual numbers. If you need real-time costing, you have to use predetermined rates.

**How allocation works**: Usually proportional to something - maybe production hours, maybe direct labor cost, maybe units produced. The system divides the total actual overhead across orders based on their share of that allocation base.

Example:
```
January actual utilities: $15,200
Total production hours in January: 1,900 hours

Order A: 200 hours → gets charged $15,200 × (200/1900) = $1,600
Order B: 500 hours → gets charged $15,200 × (500/1900) = $4,000
Order C: 300 hours → gets charged $15,200 × (300/1900) = $2,400
```

## Closing Production Orders: The Final Reckoning

Eventually, production is done. Materials are consumed, work is executed, finished goods are in inventory. Time to close the books on this production order.

This is where the **Order Close Voucher** (إغلاق أمر إنتاج) comes in. It's the final accounting step that says "here's what we actually spent, here's what it means financially."

### When to Close an Order

You close an order when:
- ✅ All production executions are complete
- ✅ All finished goods have been delivered to inventory
- ✅ All material issues are accounted for
- ✅ No more work will happen on this order
- ✅ You're ready to lock the costs and move on

**Important**: The system won't let you normally close an order if there are still quantities in intermediate operations. If you have 20 units sitting at Operation 30 waiting to move forward, those represent unfinished work. You need to either complete them or scrap them before closing.

### What Happens When You Close

When you create and commit an Order Close Voucher, several things happen:

**1. Cost Collection**

The system gathers every cost related to this production order:
- All material issues (صرف مواد خام)
- All resource vouchers (سند موارد) tracking labor and machine time
- All mold/tooling usage (سند قوالب)
- Any returned materials (negative cost)
- Any scrapped units (cost of waste)
- Finished goods delivered

It adds them all up. This is your total actual cost before overhead.

**2. Overhead Application**

If you specified an overhead type (either in the close voucher or it came from the production order's default), the system generates overhead lines.

For each element in your overhead type, it calculates the overhead amount based on the method you defined. If you use actual overhead calculator, it pulls real numbers from GL accounts.

These overhead amounts get added to your total cost.

**3. Inventory Revaluation**

Here's the clever part: The system goes back to all the Product Delivery documents for this order and updates them with the actual unit cost.

Maybe when you delivered 100 units, the system used a standard cost of $50/unit. Now, after closing, the actual cost is $52/unit. The system adjusts the inventory value accordingly.

This ensures your finished goods inventory reflects actual production costs, not estimates.

**4. Accounting Entries**

Journal entries are generated for:
- Overhead application (DR: Work in Process, CR: Overhead accounts)
- WIP to finished goods transfer
- Any variances (if using standard costing)

The general ledger gets updated to reflect the reality of what this production cost.

**5. Status Change**

The production order status changes from "In Progress" to "Closed". It's locked - no more changes allowed. What you see is what happened.

If the order came from a Production Order Request, that request's status updates to "Finished" too.

## The Two Ways to Close

### Normal Close: Mission Accomplished

This is the standard way - production completed successfully, all units are accounted for. When you select "Normal Close" type, the system validates that:
- No quantities are stuck in intermediate operations
- All work-in-process has been delivered or scrapped
- The production order is truly done

If validation passes, closure proceeds and costs are finalized.

### Terminate: Calling It Quits

Sometimes you need to cancel an order before completion:
- Customer cancelled the order
- Design flaw discovered
- Material quality issues can't be resolved
- Business priorities changed

When you select "Terminate" type, the system:
- Closes the order without requiring all quantities to be delivered
- Writes off any work-in-process as loss
- Allocates costs to variance accounts
- Marks the order status as "Terminated" (not "Closed")

You still go through the costing calculation - you spent money on partial production, and that cost needs to be recorded. But instead of flowing to finished goods inventory, it flows to loss accounts.

## Variance Analysis: Playing Detective

If you're using standard costing (where you set expected costs for materials and labor), the Order Close Voucher can show you variances - the differences between what you expected to spend and what you actually spent.

This is incredibly valuable for continuous improvement. Let's look at the types of variances:

### Material Variances

For each component you consumed, the system can compare expected vs. actual on two dimensions:

**Quantity Variance** (Did you use the right amount of material?)
```
Standard: Should use 100 kg
Actual: Used 110 kg
Variance: 10 kg over

At standard price of $10/kg: 10 kg × $10 = $100 unfavorable variance
```

**What it tells you**: You're consuming more material than expected. Maybe there's waste in the process, maybe the BOM needs updating, maybe quality issues are causing scrap. This is a red flag to investigate.

**Price Variance** (Did you pay the expected price?)
```
Standard: Expected $10/kg
Actual: Paid $11/kg
Variance: $1/kg over

For 110 kg actually consumed: 110 kg × $1 = $110 unfavorable variance
```

**What it tells you**: Material costs are higher than expected. Maybe supplier raised prices, maybe you bought from an expensive source due to shortage, maybe freight costs increased. This variance points to purchasing issues, not manufacturing issues.

**Total Material Variance**: Quantity variance + Price variance = Total

### Resource Variances

Similar analysis for labor and machine time:

**Efficiency Variance** (Did the work take as long as it should?)
```
Standard: Should take 40 hours
Actual: Took 45 hours
Variance: 5 hours over

At standard rate of $25/hour: 5 hours × $25 = $125 unfavorable variance
```

**What it tells you**: Work is taking longer than expected. Maybe workers need more training, maybe the routing times are optimistic, maybe there were delays or problems. Look for root causes.

**Rate Variance** (Did you pay the expected rate?)
```
Standard: Expected $25/hour
Actual: Paid $28/hour
Variance: $3/hour over

For 45 hours actually worked: 45 hours × $3 = $135 unfavorable variance
```

**What it tells you**: Labor is costing more than expected. Maybe you used overtime (higher rate), maybe you used a more skilled (expensive) worker than planned, maybe rates increased. This points to labor cost or staffing issues.

### Reading the Clues

Variances tell stories. Here are some common patterns:

**High material quantity variance + normal price variance**: You're wasting material or having quality issues. Check scrap rates, look for process problems.

**Normal material quantity + high price variance**: Purchasing is paying more than expected. Check supplier contracts, freight costs, market conditions.

**High labor efficiency variance + normal rate variance**: Work is taking longer than it should. Check for bottlenecks, training needs, equipment issues.

**Normal labor efficiency + high rate variance**: Labor costs increased. Check overtime usage, skill mix, wage changes.

**Large variances on some orders but not others**: Process inconsistency. Some orders go well, others have problems. Look for what's different.

**Consistently favorable variances**: Your standards might be too pessimistic. Or you've genuinely improved the process - time to update standards and take credit!

## Cost Per Batch: When One Size Doesn't Fit All

Sometimes you need to track costs separately for each batch or lot produced. This is common in:

**Pharmaceuticals**: Regulatory requirements demand batch-level costing. Batch 2024-001 might have different costs than Batch 2024-002.

**Food production**: Different production runs can have different ingredient costs, yields, and quality results.

**Chemicals**: Batch yields vary. One batch might produce 95% good product, another 98%. Costs should reflect that.

When you enable "Cost Per Batch" in the production order term configuration, the system:

1. **Tracks costs separately per lot**: Each lot number in your product deliveries gets its own cost calculation.

2. **Allocates overhead by lot**: Overhead is split proportionally based on what each lot produced.

3. **Creates separate inventory values**: Lot A finished goods might cost $50/unit while Lot B cost $52/unit because they had different yields.

**Example**:
```
Production Order: Make 200 units total
  - Lot 2024-001: 100 units delivered
  - Lot 2024-002: 100 units delivered

Total Costs:
  - Materials: $8,000
  - Labor: $3,000
  - Overhead: $1,000
  - Total: $12,000

But Lot 2024-001 used more material (lower yield):
  - Lot 2024-001: $5,000 materials + $1,500 labor + $500 overhead = $7,000 (100 units = $70/unit)
  - Lot 2024-002: $3,000 materials + $1,500 labor + $500 overhead = $5,000 (100 units = $50/unit)
```

Now your inventory correctly shows that Lot 2024-001 units cost more than Lot 2024-002 units. When you sell or consume them later, COGS reflects the actual cost of that specific lot.

## Practical Scenarios

### Scenario 1: Simple Order with Standard Overhead

You made 100 widgets:
- Material cost: $5,000 (from material issues)
- Labor cost: $2,000 (from resource vouchers)
- Machine cost: $1,500 (from resource vouchers)
- Subtotal: $8,500

Your overhead type charges 20% of direct costs:
- Overhead: $8,500 × 20% = $1,700

Total cost: $8,500 + $1,700 = $10,200
Unit cost: $10,200 / 100 = $102/unit

When you close the order:
1. System tallies the $8,500 in direct costs
2. Calculates $1,700 in overhead
3. Updates the 100 units in inventory to $102/unit each
4. Generates accounting entries
5. Locks the order as Closed

Simple, clean, done.

### Scenario 2: Variance Analysis Reveals Problems

Expected costs (from standards):
- Materials: 100 kg @ $10/kg = $1,000
- Labor: 40 hours @ $25/hour = $1,000
- Total expected: $2,000

Actual costs:
- Materials: 115 kg @ $11/kg = $1,265
- Labor: 50 hours @ $25/hour = $1,250
- Total actual: $2,515

Variance: $515 unfavorable (25% over budget - yikes!)

The Order Close Voucher breaks it down:

**Material Variances**:
- Quantity: (115 - 100) × $10 = $150 unfavorable
- Price: (11 - 10) × 115 = $115 unfavorable
- Total material: $265 unfavorable

**Labor Variances**:
- Efficiency: (50 - 40) × $25 = $250 unfavorable
- Rate: ($25 - $25) × 50 = $0 (no variance)
- Total labor: $250 unfavorable

**The story**: You used 15% more material than expected (waste or scrap issue) AND paid 10% more for it (purchasing issue). Plus labor took 25% longer (efficiency issue). Three separate problems revealed.

Now you can investigate:
- Why the material waste? Check scrap records
- Why the higher price? Talk to purchasing
- Why the extra labor hours? Check execution records for that order

Without variance analysis, you'd just know "this order cost more than expected" but not why. With it, you have specific clues to follow.

### Scenario 3: Using Actual Overhead

You're closing orders at month-end using actual overhead calculator.

Your actual overhead calculator queries GL accounts:
- Account 5100 (Factory Rent): $12,000
- Account 5200 (Utilities): $8,500
- Account 5300 (Supervision): $15,000
- Account 5400 (Maintenance): $4,500
- Total actual overhead for month: $40,000

Three production orders closed this month:
- Order A: 150 production hours
- Order B: 250 production hours
- Order C: 100 production hours
- Total: 500 production hours

Overhead allocated proportionally:
- Order A: $40,000 × (150/500) = $12,000
- Order B: $40,000 × (250/500) = $20,000
- Order C: $40,000 × (100/500) = $8,000

Each order gets charged based on its share of total production hours. Order B, which consumed half the production time, gets charged half the overhead.

This reflects reality - you spent $40,000 in overhead this month, and you've recovered all of it through product costs.

## Configuration That Controls Everything

Several settings control how costing works:

### Production Order Term

**Cost Per Batch**: Enable lot-specific costing. Each lot gets its own cost calculation.

**Calculate Deviations**: Enable variance analysis. System will populate material and resource deviation lines showing expected vs. actual.

**Overhead**: Default overhead type for all orders using this term.

### Order Close Term

**Overhead**: If specified, overrides the production order's overhead type. Useful if you have a special overhead allocation for certain situations.

**Do Not Update Accounting Effects With Actual Values**: Use standard costs in accounting instead of actual. Variances are posted separately. This is a policy decision - some companies prefer standard cost accounting, others prefer actual.

### Overhead Type Configuration

**Elements**: Define each overhead component (rent, utilities, supervision, etc.)

**Calculation Methods**: Fixed, percentage of material cost, percentage of labor cost, rate per hour, rate per unit, or actual from GL accounts.

**Accounting Accounts**: Where to debit and credit for each overhead element.

## Tips for Effective Costing

**Close orders regularly**: Don't let them pile up. Close orders a week or two after production completes. Fresh data, fresh memories if questions arise.

**Review variances**: If you're using standard costing, actually look at the variances. They're telling you something. Big variances are red flags.

**Update standards periodically**: If you consistently have 20% favorable variances, your standards are probably outdated. Update them to reflect current reality.

**Choose overhead methods that match your business**: Don't just copy what another company does. If your overhead really is driven by production hours, use rate per hour. If it's driven by material handling, use percentage of material cost.

**Use actual overhead for period-end accuracy**: Predetermined rates are fine for quick costing, but run an actual overhead calculation at period-end to true up your costs.

**Track cost trends over time**: Is the cost per unit going up or down? Are variances getting better or worse? Trends tell you if you're improving or declining.

**Investigate, don't just record**: A 15% unfavorable material variance is data. Understanding why (supplier quality issues, process waste, BOM inaccuracy) is information. Information drives improvement.

**Consider cost-per-batch for compliance**: If you're in a regulated industry (pharma, food, medical devices), batch-level costing might not be optional - it might be required for traceability and compliance.

---

::: tip The Big Picture
Production costing connects manufacturing reality to financial results. It's the bridge between "we made 100 units" and "it cost us $X to make them, and here's why."
:::

::: warning Lock It Down
Once an order is closed, costs are locked. Make sure all production is truly complete before closing. You can't easily reopen a closed order if you realize you forgot something.
:::

::: info Variance Analysis is Gold
If you're using standard costing, the variance analysis isn't just accounting busywork - it's your early warning system for process problems and cost overruns. Pay attention to it.
:::
