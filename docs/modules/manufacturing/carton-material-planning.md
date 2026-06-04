# Carton Material Planning: The Optimization Engine

## The Heart of Material Efficiency

This is where Nama ERP earns its keep in carton manufacturing. You have orders to fulfill, rolls of paper in inventory, and a simple goal: cut those rolls to produce the ordered cartons with minimum waste.

Sounds simple. It's not.

You have multiple orders of different sizes. Multiple layers per carton, each potentially from different grades of paper. Multiple roll widths in stock. Constraints on minimum trim, minimum cuts per roll, maximum production complexity. And thousands of possible ways to cut everything.

**Carton Material Planning** (تخطيط خامات الكرتون) takes all of that complexity and finds the optimal cutting plan using industrial-strength constraint-programming algorithms. You tell it what you need to make and what materials you have. It tells you exactly how to cut every roll to minimize waste while fulfilling your orders.

You'll find material planning under **Manufacturing > Documents > CRTN Material Planning** (التصنيع > المستندات > تخطيط خامات الكرتون).

## The Big Picture: What Material Planning Does

Think of material planning as a three-stage process:

**Stage 1: Collect Requirements**
- Start with one or more carton orders
- Optionally find companion orders to batch together
- System extracts manufacturing details (what actually needs to be produced)
- You review and adjust the list of items to plan

**Stage 2: Optimize Cutting**
- Click "Collect Materials"
- Optimizer searches inventory for suitable rolls
- Runs constraint-programming solver to find best cutting plan
- Generates detailed material requirements showing exactly how to cut each roll

**Stage 3: Execute Production**
- Review the cutting plan
- Generate production orders
- Issue materials from specific lots/rolls
- Send cutting plan to shop floor

Let's walk through each stage in detail.

## Stage 1: Setting Up the Planning Document

### Creating the Document

Start a new material planning document. Fill in the header:

**Planning Configuration** (إعدادات التخطيط): **Required**. Select the configuration that defines your optimization parameters (minimum trim, maximum search time, etc.). You must select this before you can do anything else.

**Book** and **Term**: Control numbering and document generation settings

**Planning Status** (حالة التخطيط): System-managed field showing where you are in the process:
- **Initial**: Just created, collecting requirements
- **Planning**: Ready to run optimizer
- **Planned**: Optimization complete, results available

**Value Date**: When this planning should be dated (for accounting purposes)

### Adding Orders to Plan

You have several ways to populate the planning document with orders:

#### Method 1: From an Order (Quick Start)

If you're already viewing a carton order, click **Generate CRTN Material Planning** on the order. Nama creates a planning document with that order already added.

#### Method 2: Manual Selection

Create a blank planning document. In the **Documents** (المستندات) tab, add lines:

Each line references a **CRTN Order**. When you select an order, Nama shows the customer and totals.

When you save, Nama automatically populates the **Items** (الوصلات) tab based on the manufacturing details from all selected orders.

#### Method 3: Direct Item Entry (Advanced)

You can manually add lines to the **Items** tab without going through orders. This is for special scenarios like:
- Planning for internal use (not customer orders)
- Replanning after production changes
- Test runs to evaluate material availability

When adding items manually:
- Select the **CRTN Order** (or leave blank for non-order planning)
- Select the **Carton Specs**
- Enter **Quantity**
- Fill in sheet dimensions (length, width)

Most users stick with Methods 1 or 2 - planning from orders.

### Understanding the Items Tab

Once you save, the **Items** tab shows what you're planning to produce. Each line represents one carton specification from one order.

**Key fields**:

**Carton Specs** (مواصفات الكرتونة): The specification being produced
**CRTN Order** (طلبية كرتون): Which order this is for
**Item** (الصنف): The inventory item (if spec is linked to an item)
**Total Requested Qty** (إجمالي الكمية المطلوبة): How many cartons total
**Sheet Length/Width** (طول اللوح / عرض اللوح): Dimensions of the flat sheet (from the spec)
**Flap Value** (اللسان): Flap allowance

**Planning results (filled after optimization)**:

**Roll Width** (عرض اللفة): Which roll width was selected for this carton
**Number of Pieces** (عدد القطع): How many pieces fit across the roll width (strikes)
**Number of Strikes** (عدد الضربات): How many times to strike/cut along the roll
**Number of Operations** (عدد العمليات): How many separate cutting operations
**Metric Length** (الطول المتري): Total linear meters of roll needed
**Total Planned Qty** (إجمالي الكمية المخططة): Actual quantity planned (might be slightly more than requested due to cutting multiples)
**Trim** (التريم): Waste/trim per cut
**Operating Width** (العرض التشغيلي): Total width consumed across all pieces

**Force roll widths (optional)**:

If you need to use a specific roll width for a layer, you can force it:
- **Force Layers Roll Width** (إجبار عرض لفة الطبقات): Forces all layers to use this width
- **Force Layer 1/2/3... Roll Width**: Forces a specific layer to use this width

The optimizer respects these constraints when searching for solutions.

## Stage 2: Running the Optimizer

### Understanding Planning Status

Before you can optimize, change the **Planning Status** to "Planning" (تخطيط). This unlocks the optimization functions.

While in "Initial" status, you're still collecting requirements. Move to "Planning" when you're ready to find materials.

### Finding Companion Orders (The Secret Weapon)

Here's where Nama gets really smart. You have one order to plan - let's say 2000 units of a 450mm wide carton. But you know there are other pending orders out there for similar cartons. Could you batch them together to reduce waste?

Click **Find Companion Orders** (البحث عن أوامر مصاحبة).

Nama searches:
1. All committed carton orders that aren't fully planned yet
2. Filters to orders with carton specs that have identical layer structures (same number of layers, same item classes, same corrugating factors, same layer types)
3. For each candidate order, runs a quick optimization: "If I batch the current order with this candidate, what's the total waste?"
4. Sorts candidates by total waste - best matches first

The **Companion Orders** (الأوامر المصاحبة) tab populates with results:

Each line shows:
- The candidate order
- The carton specification
- Quantities
- **Total Waste** (إجمالي الهدر): How much total waste (in square meters) if you batch this order with yours

The list is sorted by waste - least waste at the top.

**Why this matters**: Maybe your 450mm carton alone would use a 2000mm roll with 200mm trim (10% waste). But there's an order for a 540mm carton. Cut both from the same 2000mm roll (450 + 540 = 990mm, fit 2 pairs = 1980mm used) and waste drops to 20mm (1% waste). Huge savings.

**To accept a companion order**:
1. Review the list
2. Consider not just waste, but also customer priorities (maybe the top waste-saver is for a customer whose delivery can wait, but the second-best match is for a rush customer)
3. Click **Accept Selected Order** (قبول الأمر المختار) on the line you want

Nama adds that order to your Documents tab and updates the Items tab with the new carton specs. Now you're planning for both orders together.

**You can repeat this**: Find companions again, accept another, keep batching until you've hit a good balance of efficiency vs. production complexity.

### Before Running Optimization

Make sure:
- Planning Status is "Planning"
- Items tab has all the carton specs you want to produce
- You're happy with any forced roll widths (or they're all blank for full flexibility)
- Your planning configuration has reasonable parameters (more on this below)

### Running "Collect Materials"

Click **Collect Materials** (تجميع المواد).

Nama goes to work:

**Step 1: Query Inventory**

For each layer of each carton spec, Nama searches for rolls that:
- Match the required item classes (Section, Class1, Class2, etc.) defined in the spec
- Are wide enough to fit the sheet width plus minimum trim
- Are long enough to meet minimum roll length requirements
- Have available quantity in inventory (based on lot tracking)

This might find dozens or hundreds of candidate rolls.

**Step 2: Calculate Possibilities**

For each candidate roll and each carton:
- How many pieces fit across the width (considering trim)?
- How many strikes along the length?
- What's the total quantity this roll could produce?
- What's the waste?

**Step 3: Set Up the Optimization Problem**

Nama creates a constraint-programming model with:
- Variables for which rolls to use, how many strikes, how many operations
- Constraints: Must produce requested quantities (or close to it), must respect minimum trim, can't exceed roll availability, etc.
- Objective: Minimize total waste + number of rolls used

**Step 4: Solve with CP-SAT**

The Google OR-Tools CP-SAT solver takes over. It's searching through a massive solution space - millions of possible cutting plans - applying constraints to prune invalid solutions, and using sophisticated search heuristics to find the optimal plan.

You can configure in the Planning Configuration:
- **Max Time in Minutes** (أقصى وقت بالدقائق للبحث): Default 10 minutes. The solver stops after this time.
- **Workers Count** (عدد الـ Workers): How many CPU threads to use. More threads = faster (if your server has multiple cores).

The solver runs until it finds an optimal solution or hits the time limit.

**Step 5: Return Results**

The solver finishes and Nama populates three grids:

**Materials Tab** (قطع غيار): The detailed cutting plan. Each line shows:
- Which lot/roll to use (Lot ID, Box - roll width)
- How many pieces to cut
- How many strikes
- Metric length consumed
- Specific dimensions assigned

**Materials Totals Tab** (إجماليات الخامات): Summary by item class and roll width showing total quantities needed

**Items Tab Updates**: Each item line now shows:
- Roll width selected
- Number of pieces and strikes
- Total planned quantity
- Trim/waste

**Planning Status Changes**: If a solution was found, status changes to indicate success:

**Solution Type** (نوع الحل):
- **Optimal** (مثالي): The solver proved this is the best possible solution
- **Feasible** (ممكن): A good solution was found, but the solver ran out of time before proving it's optimal

**Solution Wall Time** (الوقت المستغرق للبحث عن حل): How many seconds the solver took

### If the Optimizer Fails

Sometimes the optimizer can't find a solution. Common reasons:

**Insufficient Materials**: You don't have rolls wide enough, long enough, or in the right grades. Check the error message - it'll tell you which items/layers couldn't find suitable rolls.

**Fix**: Purchase materials, or adjust order quantities to what's available.

**Constraints Too Tight**: Maybe your minimum trim requirement is too high, or minimum roll cuts is preventing use of available inventory.

**Fix**: Relax constraints in the Planning Configuration, or accept that you need to purchase more materials.

**Orders Incompatible**: The companion orders you batched together can't actually be cut from the same rolls efficiently.

**Fix**: Remove some orders from the planning document and plan them separately.

**Time Limit Too Short**: The problem is complex and the solver needs more time.

**Fix**: Increase "Max Time in Minutes" in the Planning Configuration and try again.

## Interpreting the Results

### Materials Tab: Your Cutting Plan

This is the actionable output - exactly what to cut.

Each line represents material for one layer of one carton spec from one specific lot/roll.

**Example line**:
```
Item Class 1: Kraft Liner
Item Class 2: 125 GSM
Box (Roll Width): 2000mm
Lot ID: A2024-5001
Number of Pieces: 4
Number of Strikes: 250
Metric Length: 110 meters
Source Line ID: (links back to the item being produced)
```

**What this means**: Take roll lot A2024-5001 (which is 2000mm wide). Cut 4 pieces across the width, make 250 strikes along the length. You'll consume 110 meters of this roll.

**Why multiple lines for one carton?**: A carton has multiple layers (facing, fluting, liner). Each layer might come from different rolls, different lots, even different widths. You'll see one material line per layer.

**Grouping and filtering**: Use the grid filters to group by carton spec, by lot, by layer - whatever view helps you understand the plan.

### Materials Totals: Roll Requirements Summary

This grid aggregates materials by item class and roll width:

```
Item Class 1: Kraft Liner
Item Class 2: 125 GSM
Box (Roll Width): 2000mm
Quantity: 2500 linear meters
```

This tells you: "In total, across all cartons in this plan, you need 2500 meters of 125gsm Kraft liner in 2000mm width."

Use this for:
- Quick availability check (do we have enough?)
- Purchase requisitions (if you're short)
- Warehouse pull lists (which rolls to stage for production)

### Available Materials: Inventory vs. Requirements

Before running optimization, you can click **Review Available Quantities** (مراجعة الكميات المتاحة) to see what's in inventory.

This action asks: "Include Item in Result?" (usually say No for a summary by width/class, Yes for detail by specific item).

It populates the **Available Materials** (الخامات المتاحة) tab showing:

- Roll width
- Item classes
- Available quantity in inventory
- Required quantity for each layer (Layer 1-7)
- Total required quantity
- Unavailable quantity (shortfall, if any)

**Use case**: Before committing to a planning document or before accepting a companion order, review available materials to make sure you can actually fulfill the plan. If "Unavailable Qty" shows values, you don't have enough material - either reduce order quantities or purchase more material.

## Advanced: Controlling the Optimization

### Planning Configuration Parameters

The Planning Configuration (master file) controls how the optimizer behaves. Understanding these parameters lets you tune the solver for your specific needs.

**Minimum Roll Length** (أقل طول للرول): Don't use rolls shorter than this. Prevents using up small remnant rolls that aren't efficient to set up.

*Example*: Set to 50 meters. The optimizer ignores any rolls in inventory under 50 meters length.

**Minimum Roll Cuts** (أقل عدد قطعيات للرول): A roll must yield at least this many cuts to be used. Prevents inefficient use where you set up a roll for just a few pieces.

*Example*: Set to 10. The optimizer won't use a roll unless it can get at least 10 cuts from it.

**Minimum Trim** (أقل تريم): The smallest acceptable trim/waste per cut. If you cut pieces that leave less than this as waste, the optimizer rejects that cutting plan.

*Example*: Set to 20mm. Any cutting pattern that leaves less than 20mm trim is rejected. This prevents using up roll width inefficiently.

**Why have minimum trim?**: Seems counterintuitive - why reject low-waste solutions? Because very narrow trim can jam machines, can't be reused, and might indicate you're forcing an inefficient width match. Sometimes it's better to have a bit more waste that can be recycled than a tiny sliver that causes production problems.

**Maximum Time in Minutes** (أقصى وقت بالدقائق للبحث): How long the CP-SAT solver can search for a solution. Longer time = better chance of finding optimal solution, but you wait longer.

*Typical values*: 5-10 minutes for simple plans (few orders, lots of material options), 15-30 minutes for complex plans (many orders, tight constraints).

**Companion Order Search Max Time in Seconds** (أقصى وقت بالثواني للبحث عن مصاحب): When searching for companion orders, how long to test each candidate order. Shorter time = faster search but might miss good matches.

*Typical values*: 5-10 seconds per candidate.

**CPU Thread Workers Count** (عدد الـ Workers): How many parallel search threads to use. Modern multi-core CPUs can run multiple threads simultaneously, speeding up the search.

*Typical values*: 4-12 threads depending on your server. Don't exceed the number of CPU cores you have.

**Max Different Lengths Per Sheet**: Limits complexity. If you're cutting multiple cartons from one roll, this limits how many different lengths can be cut from that sheet.

*Example*: Set to 2. If you're batching three orders with different lengths, the optimizer might split them across different sheets to stay within this limit.

**Max Roll Group Split Count**: When grouping compatible rolls (same width, same grade), how many separate cutting patterns can be used per group.

*Example*: Set to 2. The optimizer can use up to 2 different cutting patterns on rolls from the same group, but not more.

**Trim Co-Product** (الصنف الثانوي للتريم): If trim waste should be tracked as inventory (maybe you recycle it or sell it as scrap), select the inventory item here. When production orders are generated, trim is added as a co-product.

### Forcing Roll Widths

Sometimes you need to override the optimizer's selection:

**Scenario 1: Finish off inventory**: You have a partial roll of 2100mm width you want to use up before it sits forever. Force that layer to use 2100mm, and the optimizer plans around it.

**Scenario 2: Customer requirements**: Customer specified that the facing layer must be from a certain width for appearance consistency. Force it.

**Scenario 3: Machine limitations**: Your corrugator handles only certain widths efficiently. Force those widths.

In the **Items** tab, fill in:
- **Force Layers Roll Width**: Forces all layers of this carton to use this width
- **Force Layer X Roll Width**: Forces a specific layer (1-7) to use this width

The optimizer treats these as hard constraints - it will only consider rolls of the forced width for those layers.

**Trade-off**: Less flexibility for the optimizer usually means less optimal solutions (more waste or fewer batching opportunities). Only force widths when there's a real requirement.

### Planning Single Layer (Advanced)

The **Plan Single Layer** (تخطيط طبقة واحدة) field lets you run optimization for just one layer at a time.

**Why?**: Sometimes you have materials for most layers but one layer is problematic. Plan that layer separately to see what's needed.

*Example*: Set "Plan Single Layer" to 2. Run optimization. Nama plans only Layer 2 (fluting), ignoring layers 1, 3, etc.

Review the results, see if fluting materials are adequate. Then set to 1, run again for facing. And so on.

Most users leave this blank and plan all layers together.

## Stage 3: Moving to Production

### Reviewing the Plan

Before committing to production, review:

**Materials tab**: Do the lot selections make sense? Maybe you prefer using certain lots first (older inventory, lower quality for non-critical orders, etc.). Note which lots are assigned.

**Items tab**: Are planned quantities reasonable? If you requested 5000 and planned 5040 (because cutting multiples work out that way), is the 40-unit overrun acceptable?

**Totals**: Do you have enough of everything? Check available materials vs. requirements.

**Waste/Trim**: Is the waste level acceptable? Maybe 5% trim is fine, but 15% suggests you should wait for different materials or batch with different orders.

### Generating Production Orders

Once you're happy with the plan, click **Generate Production Orders** (إنشاء أوامر إنتاج).

Nama creates one production order for each carton specification in the Items tab.

**Each production order includes**:

**Header**: Quantity to produce (from Total Planned Qty), item (if spec has an item), dates copied from the planning document

**Components (BOM)**: Exact materials from the Materials tab - which item classes, which specific lots, which quantities. If you planned Layer 1 to use Lot A2024-001 with 110 meters, the BOM shows "Lot A2024-001, 110 meters."

**Routings**: Operations copied from the carton specification's routing lines

**Co-Products**: If trim co-product is configured, trim quantity is added as a co-product

**Link to Planning**: The production order references the planning document as its "From Doc", so you can trace back.

**Link to Order**: The production order references the original carton order, maintaining the chain from customer order → planning → production.

The production orders are committed automatically. They're ready for execution.

**In the Items tab**, each line now shows the **Production Order** field filled in, linking to the generated order.

### Material Issues

With production orders created, the next step is issuing materials from inventory.

You can create **Carton Material Issues** (صرف خامات كرتون) referencing this planning document.

When you select the planning document in a material issue, it can auto-populate with the exact materials, lots, and quantities from the Materials tab.

See [Carton Material Issues](./carton-material-issue.md) for details.

## Real-World Workflow Example

Let's walk through a complete planning session from start to finish.

**Monday morning**: Production planner Sarah reviews pending carton orders. She sees:
- Order #6501: Customer A, 3000 units, "Tomato Box 250"
- Order #6502: Customer B, 2000 units, "Electronics Box 300"
- Order #6503: Customer C, 1500 units, "Produce Tray 280"

**Step 1**: Sarah creates a new Material Planning document, selects the default Planning Configuration.

**Step 2**: In Documents tab, she adds Order #6501 (the Tomato Box). Saves. Items tab populates with one line: 3000 units of Tomato Box 250.

**Step 3**: Changes Planning Status to "Planning".

**Step 4**: Clicks "Find Companion Orders". System searches, finds Orders #6502 and #6503 plus a few others.

Reviews the list sorted by waste:
- Order #6503 (Produce Tray) shows lowest total waste if batched
- Order #6502 (Electronics Box) shows slightly higher waste

Sarah checks delivery dates. Produce Tray is due same week as Tomato Box. Electronics Box is two weeks out. She decides to batch Tomato Box + Produce Tray for now.

Selects Order #6503, clicks "Accept Selected Order".

**Step 5**: Items tab now shows:
- 3000 units, Tomato Box 250, 520mm sheet width
- 1500 units, Produce Tray 280, 480mm sheet width

Sarah notices these widths: 520 + 480 = 1000mm. Two pairs fit nicely on a 2000mm roll with minimal waste. Good match.

**Step 6**: Clicks "Collect Materials".

The solver runs for 2 minutes. Status changes to "Planned", Solution Type shows "Optimal".

**Step 7**: Reviews Materials tab. Sees:

For Tomato Box:
- Layer 1 (Facing): Lot K2024-015, 2000mm width, 4 pieces, 187 strikes, 97 meters
- Layer 2 (Fluting): Lot F2024-022, 2000mm width, 4 pieces, 187 strikes, 82 meters (shorter because fluting has corrugating factor)
- Layer 3 (Liner): Lot L2024-008, 2000mm width, 4 pieces, 187 strikes, 97 meters

For Produce Tray (similar pattern with different lots).

Checks Materials Totals: 195 meters of 125gsm Kraft, 164 meters of C-Flute, 195 meters of Test Liner. All available in inventory.

**Step 8**: Clicks "Review Available Quantities" to double-check. Available Materials shows adequate inventory for all layers. No shortfalls.

**Step 9**: Happy with the plan. Clicks "Generate Production Orders".

Two production orders created:
- PO-8801: 3000 Tomato Box 250
- PO-8802: 1500 Produce Tray 280

Both have full BOMs with specific lots assigned, routing steps, everything ready.

**Step 10**: Saves and commits the planning document. Orders #6501 and #6503 are now marked "Fully Planned". They won't appear in future companion order searches.

**Tuesday**: Shop floor pulls the specific lots identified in the plan, issues them to production, and starts cutting according to the plan (4 pieces across, 187 strikes). The plan was followed precisely, waste came in at 2.3% - well below the usual 8%.

Sarah saved the company roughly 5% in material costs by batching these orders. Over a year, that adds up to significant savings.

## Tips for Effective Planning

**Plan in batches**: Don't plan every order individually. Use companion orders to batch compatible orders together. The more orders you batch (up to a point), the better the optimizer can pack material usage.

**But don't over-batch**: Too many orders in one plan (especially with different sizes) increases complexity. The optimizer might struggle. Aim for 3-5 orders per plan as a sweet spot.

**Plan regularly**: Don't wait until you have a week's worth of orders. Plan daily or every few days. Smaller, more frequent batches give you flexibility to prioritize rush orders.

**Review available materials early**: Before accepting companion orders, click "Review Available Quantities" to make sure you can actually fulfill the combined plan. Don't commit to planning you can't execute.

**Use forced widths sparingly**: Let the optimizer do its job. Only force widths when there's a real reason (customer requirement, finishing off partial rolls, machine constraints).

**Monitor solution type**: If you keep getting "Feasible" instead of "Optimal" solutions, consider increasing max search time. An extra 5 minutes of search might save 2% in materials - worth the wait.

**Save failed planning attempts**: If optimization fails, save the document as draft and review the error. It tells you what's wrong (which items couldn't find materials, which constraints failed). Fix the underlying issue before trying again.

**Communicate the plan**: Make sure the shop floor gets the full materials list with lot numbers. Cutting the wrong lot defeats the whole optimization effort.

---

::: tip Batching is Gold
The difference between planning orders individually vs. batching compatible orders can easily be 5-10% in material savings. Always search for companion orders before finalizing a plan.
:::

::: warning Time Limits Matter
If the optimizer hits the time limit before finding an optimal solution, you get a "Feasible" result. It's usually good enough, but increasing search time might find better solutions. Experiment with your typical order mix to find the right time limit.
:::

::: info Next Step
With materials planned, you're ready to issue them to production. See [Carton Material Issues](./carton-material-issue.md).
:::
