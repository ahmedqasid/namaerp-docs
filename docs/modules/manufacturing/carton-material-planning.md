---
entities: [CRTNMaterialPlanning, CRTNPlanningConfiguration]
menu: Manufacturing → Cartoon → CRTN Material Planning
---
# Carton Material Planning: The Optimization Engine

## The Heart of Material Efficiency

This is where Nama ERP earns its keep in carton manufacturing. You have orders to fulfil, reels of paper in the store, and a simple goal: cut those reels to produce the ordered cartons with minimum waste.

Sounds simple. It isn't.

You have several orders of different sizes. Several layers per carton, each from a different grade of paper. Several reel widths in stock. Constraints on minimum trim, minimum cuts per reel, maximum production complexity. And an enormous number of ways to cut everything.

**Carton Material Planning** takes that complexity and searches for the cutting plan with the least waste. You tell it what has to be made and what material is available; it tells you how to cut each reel.

You'll find it under **Manufacturing → Cartoon → CRTN Material Planning**.

![A carton material planning document with two orders batched together](../../ar/modules/manufacturing/images/carton/material-planning-en.png)

The list view is the planning register — every run, with the status and the solution it reached.

![The carton material planning list view](../../ar/modules/manufacturing/images/carton/material-planning-list-en.png)

## How the Screen Is Laid Out

The document has two tabs, and the **Main** tab is a stack of four grids rather than one long form. What makes it readable is that **each grid has its own action button sitting directly above it**, and that button is what fills the grid below:

| Action | What it does |
| --- | --- |
| **Generate Production Orders** | Consumes the finished plan and creates the production orders |
| **Collect Materials** | Fills **Materails** — the cutting plan |
| **Review Available Quantities** | Fills **Available Materials** — stock against requirement |
| **Find Companion Orders** / **Accept Selected Order** | Fill **Companion Orders**, on its own tab |

So the screen reads top to bottom as the order you work in: describe what you need, find material, check it is really there, and only then generate production orders.

The **Companion Orders** tab is a separate page with its own copy of the basic header and its own two buttons. It is a search workspace rather than part of the plan itself, which is why it sits apart.

## Setting Up the Planning Document

### The Header

**Document Code** carries the **Book** and the document number, and **Term** the settings that govern the document. **Issue Date**, **Value Date** and **Fiscal Period** date it as on any other document.

**Planning Configuration** is **required** — the field is marked with a red asterisk, and nothing else on the screen works without it. It names the parameter set the solver obeys: minimum trim, search time, thread count and the rest. Those parameters are described further down.

**Planning Status** has exactly two values:

- **Initial** — you are still collecting requirements.
- **Planning** — the document is ready for the optimizer.

There is no third, "planned" status. A finished plan is still shown as **Planning**; what tells you it has been solved is the **Solution Type** field, not the status.

**Plan Single Stage** limits the run to one production stage instead of all of them. Leave it empty to plan every stage together, which is what almost every run wants.

**Solution Type** and **Solution Wall Time** are greyed out on the screen because they are outputs. The solver writes them; you never type them.

**Planned Revision** narrows the plan to a specific item revision, where the specification is revision-controlled.

### Adding Orders

The **documents** grid is where the plan starts. Each row references a **Carton Order** and shows the **Customer**, **Net value** and **Total** taken from it.

You can populate it two ways. From an order, use **Generate CRTN Material Planning** and Nama creates the planning document with that order already listed. Or create the document and add the order rows yourself.

Rows can also be added straight to Items without going through an order at all, which is how you plan for stock rather than for a customer. It is the exception rather than the rule, and it costs you the link back to the order, so use it only where there genuinely is no order to link to.

### What Saving Does to the Items Grid

This is the part worth knowing, because it saves a great deal of typing.

**When you save a planning document that has rows in `documents`, Nama fills the Items grid for you** from the manufacturing details of those orders. One row appears per carton specification, already carrying:

- **Carton Order** and **Carton Specs**
- **Sheet Length** and **Sheet Width**, taken from the specification
- **Measures | Length**, **Width**, **Height** and **Flap Value**
- **Unit Price** and **Total**

What it does **not** fill is **Quantity** and **Total Requested Quantity**. Those stay empty and you type them.

That is deliberate rather than an oversight: the quantity you plan is not always the quantity ordered — you may be planning part of an order now and the rest later, or adding a margin for expected waste — so Nama declines to guess.

::: warning Check the quantity columns before you optimize
A row with no quantity contributes nothing to the plan. The optimizer will run happily, report a solution, and simply have planned less than you meant to make.
:::

### Reading the Rest of the Items Grid

The Items grid is wide, and its right-hand half is entirely results. Before the optimizer runs, every one of those columns reads zero.

![The result columns of the Items grid, still zero before the optimizer runs](../../ar/modules/manufacturing/images/carton/material-planning-items-en.png)

After a run they carry the answer for each carton. **Roll Width** is the reel width the solver chose, and **Number Of Pieces** how many sheets fit across it. **Operating Width** is the width those pieces actually consume, and **Trim** what is left over — the waste on that pattern. **Number Of Operations** counts the separate cutting operations the plan needs, and **Metric Length** the linear metres of reel required. **Total Planned Quantity** is what will really be produced, usually a little above **Total Requested Quantity** because cutting works in whole strikes.

The **Force All Layers Roll Width** and **Force Layer 1** to **Force Layer 7 Roll Width** columns work the other way round: they are inputs, and they constrain the solver. Fill one and it will only consider reels of that width for that layer. Use them for a real requirement — finishing a part-used reel, a customer demand about appearance, a machine that runs only certain widths — and leave them empty otherwise, because every forced width is a choice taken away from the optimizer.

## What the Optimizer Matches Reels On

None of this works unless the material side is set up to be found, and that setup is not obvious from the planning screen.

A paper reel is an **ordinary stock item**. Three things make it a reel.

**Class 1 and Class 2 carry the grade and the grammage.** On the item, Class 1 is the paper grade — Kraft Liner, Test Liner, Fluting Medium — and Class 2 is the weight in grams per square metre.

![A paper reel item: the grade in Class 1, the grammage in Class 2](../../ar/modules/manufacturing/images/carton/paper-reel-item-en.png)

The same two classes appear on every layer of the [carton specification](./carton-specifications.md). That is the whole matching rule: **the solver looks for stock whose Class 1 and Class 2 equal the layer's Class 1 and Class 2**. Get either wrong, on the item or on the layer, and that layer finds no material at all — however much paper is physically in the store.

**The reel width lives in the Box dimension.** There is no "roll width" field on the item. Width is recorded as the item's **Box** dimension value on each receipt, so one item code holds stock at several widths side by side — 1200, 1350, 1450 and 1650 all under the same reel item, each with its own balance. This is why the planning grids show a column called **Box** where you would expect a width.

**The item's configuration has to track lot and packaging.** Dimensional tracking is switched on by the **Item Configurations** record the item points at, not on the item itself. If that configuration does not have packaging tracking enabled, the Box value is refused when stock is received, and no amount of editing the item will help. Reel items need a configuration that tracks both lot and packaging.

One consequence is worth stating plainly: reels are normally stocked and issued **by weight**, so quantities on these screens are kilogrammes. **Metric Length** is the separate figure that gives the linear metres, and it is what the shop floor actually cuts.

## Running the Optimizer

### Finding Companion Orders

Here is where the module gets clever. You have one order to plan. There may be other pending orders for cartons of a similar build — could they be cut from the same reels, with less waste?

![The Companion Orders tab, with its search and accept actions](../../ar/modules/manufacturing/images/carton/material-planning-companion-en.png)

Open the **Companion Orders** tab and use **Find Companion Orders**. Nama looks through committed carton orders that are not yet fully planned, keeps those whose specifications have a compatible layer structure, and for each candidate runs a quick trial: if this order were batched with yours, what would total waste be? Results come back sorted by waste, best first, with **Total Waste** on each row.

**Why this matters**: a 450 mm sheet alone on a 1650 mm reel fits three across and leaves 300 mm of trim. Add an order for a 390 mm sheet and the pair can be arranged to leave far less. The saving is real, and it is the single biggest lever on this screen.

To take a candidate, select its row and use **Accept Selected Order**. The order joins the `documents` grid and its specifications join Items, and you can search again to add another.

Waste is not the only thing to weigh. The lowest-waste candidate may be for a customer whose delivery can wait, while the second-best is urgent. The list ranks by material; you rank by material *and* by promise.

**Maximum Time In Seconds For Companion Order Search** caps how long each candidate is trialled. It is a per-candidate budget, so a generous value multiplied by many candidates is a long wait.

### Collect Materials

With the Items grid complete and the status set to **Planning**, use **Collect Materials**.

Nama searches stock for reels matching each layer's Class 1 and Class 2 that are wide enough for the sheet plus minimum trim and long enough to clear the minimum reel length, works out how many pieces and strikes each candidate reel could yield, builds a constraint model over those possibilities, and solves it for least waste.

When it finishes it writes the cutting plan into **Materails**, the aggregate into **Materials Totals**, the per-carton answers into the result columns of **Items**, and its own verdict into **Solution Type** and **Solution Wall Time**.

**Solution Type** is the honest part of the output:

- **Optimal** — the solver proved no better plan exists.
- **Feasible** — it found a workable plan but ran out of time before it could prove that.

In practice most runs are quick. A single straightforward order is typically solved as **Optimal** in a fraction of a second, and a two-order batch in a few seconds. But difficulty does not scale gently: a hard combination will run to the very end of its budget and come back **Feasible**. That is the signal to give it a longer **Maximum Search Time In Minutes** and try again — a few extra minutes of search that saves two per cent of the paper pays for itself immediately.

### When the Optimizer Finds Nothing

The usual causes, in the order worth checking:

**No matching material.** The commonest cause by far is not a shortage but a mismatch — a layer whose Class 1 or Class 2 corresponds to no reel item. Check the specification's layers against the reel items before concluding you need to buy paper.

**Genuinely insufficient stock.** No reel wide enough, long enough, or in the right grade. **Review Available Quantities** shows this directly.

**Constraints too tight.** A high minimum trim, or a minimum reel cuts figure that rules out the stock you actually hold.

**Too little time.** A complex batch against a short search budget.

## Reading the Results

### Materails: the Cutting Plan

Despite the spelling on the tab, this is the actionable output — one row per layer of each carton, saying which material to cut and how.

Each row carries the **Carton Order**, **Finished Item** and **Carton Specs** it belongs to, then the instruction: **Number Of Pieces** across, **Number Of Strikes** along, and **Metric Length** consumed. **Class 1** and **Class 2** identify the paper and **Box** the reel width, and **Lot ID** identifies the specific reel where the plan pins one down.

A three-layer carton produces three rows; a five-layer double-wall carton produces five. They may sit on different widths, because each layer is chosen on its own merits.

### Materials Totals: What to Pull From the Store

A short grid that aggregates the plan by **Class 1**, **Class 2** and **Box**, with the total **Quantity** for each combination. This is the picking list — "for this whole plan, this much 150 gsm Kraft Liner at 1350 mm" — and the quickest way to see whether the store can serve the run at all.

### Available Materials: Stock Against Requirement

**Review Available Quantities** fills this grid, and it answers a question the cutting plan does not: is the paper there?

Each row is a reel width, with the **Item** and its **Class 1** and **Class 2**, then **Required Quantity In Layer 1** through **Layer 7**, the **Total Required Quantities**, the **Available Quantity** in stock, and the **Unavailable Quantity** — the shortfall.

The layer-by-layer breakdown is the useful part. A width can be comfortably supplied for one layer and short for another, and a single combined figure would hide which. Any non-zero **Unavailable Quantity** means the plan as it stands cannot be executed from current stock.

Run this before accepting companion orders, not after. Committing to a combined plan you cannot source is worse than planning the orders separately, because the failure arrives later and at a worse moment.

## The Planning Configuration

The configuration is a small master file under **Manufacturing → Cartoon → CRTN Planning Configuration**, and it holds every parameter the solver obeys.

![The planning configuration and its solver parameters](../../ar/modules/manufacturing/images/carton/planning-configuration-en.png)

**Minimum Roll Cuts** — a reel must yield at least this many cuts to be worth using, which keeps the plan from setting up a reel for a handful of pieces.

**Minimum Roll Length** — ignore reels shorter than this. It stops the optimizer consuming short remnants that cost more in setup than they save in paper.

**Minimum Trim** — the smallest trim the plan will accept. This one reads backwards until you have seen it on a machine: why reject a *low*-waste pattern? Because a sliver of trim jams equipment, cannot be recycled cleanly, and usually means a width has been forced to fit. A slightly wider offcut that comes off the machine intact is worth more than a narrow one that stops the line.

**Max Different Lengths Per Sheet** — caps how many different sheet lengths may be cut from one sheet. It is a limit on shop-floor complexity rather than on mathematics.

**Max Roll Group Split Count** — how many separate cutting patterns may be used across reels of the same group.

**Trim Co-product Item** — the stock item that trim is booked to. Set it and the waste becomes a co-product on the generated production orders rather than vanishing, which is what lets you value recovered offcuts instead of writing them off.

**Maximum Search Time In Minutes** — the solver's budget. When runs keep coming back **Feasible**, this is the number to raise.

**Maximum Time In Seconds For Companion Order Search** — the per-candidate budget for companion trials.

**CPU Thread Workers Count** — how many threads the search may use. Don't set it above the number of cores the server actually has.

Most sites run a single configuration. A second one is worth creating when a class of work genuinely needs different rules — a long overnight run that can afford a much larger search budget, for instance.

## Moving to Production

Before committing, look at three things. Are the planned quantities acceptable — if you asked for 4,000 and the plan makes 4,020 because the cutting works out that way, is the overrun fine? Is the trim level sensible — a few per cent is normal, fifteen suggests waiting for different material or batching differently? And does **Available Materials** show any shortfall?

When the plan is right, use **Generate Production Orders**. Nama creates one production order per carton specification in Items, each carrying the planned quantity, the components from the cutting plan, the operations from the specification's routing, and the trim co-product if one is configured. Each order references the planning document and the original carton order, so the chain from customer order to shop floor stays intact. The **Production Order** column in Items fills in with the order created for that row.

Materials are then issued with a [Carton Material Issue](./carton-material-issue.md), which reads its lines from this plan.

## A Worked Example

Two orders are open. Spinneys wants 4,000 tomato boxes, 400×300×150 mm. Metro Markets wants 3,000 produce boxes, 350×250×140 mm. Both are regular slotted containers on the same three-layer build: 150 gsm Kraft Liner outside, 112 gsm fluting medium, 125 gsm test liner inside.

Their blanks are 1,440 × 450 mm and 1,240 × 390 mm.

Create a planning document, choose the planning configuration, and add both orders to `documents`. Save. The Items grid fills with the two specifications and their sheet dimensions; type 4,000 and 3,000 into Quantity, because those are the columns Nama leaves to you.

Now look at the widths. The store holds reels at 1200, 1350, 1450 and 1650 mm. A 450 mm sheet fits exactly three times across 1350 mm with nothing left over, which is as good as cutting gets. A 390 mm sheet fits three times across 1350 mm with 180 mm of trim, and three times across 1200 mm with only 30 mm — better, but the 1200 mm stock is thinner on the ground.

That trade-off is precisely what the optimizer exists to resolve, and it will weigh it against how much of each width is actually held. Set the status to **Planning**, use **Collect Materials**, and read the answer off the Items grid: which width each carton was put on, how many pieces across, and how much trim the plan accepted.

Then check **Available Materials** before generating anything. If the 1200 mm fluting shows a shortfall, the plan that looked best on paper is not the plan you can run this week.

## Working With Planning in Practice

Batching is where the money is. Planning orders one at a time leaves the optimizer nothing to work with; batching compatible orders through companion orders is the single biggest lever on this screen. But there is a ceiling — too many orders of too many different sizes makes the problem harder rather than richer, and three to five orders is a practical sweet spot.

Plan regularly rather than saving up a week's worth. Smaller, more frequent batches keep the flexibility to slot in a rush order, which a single weekly mega-plan does not.

Force widths sparingly. The optimizer is better at this than intuition is, and forced widths should be reserved for real constraints — a customer requirement, finishing off part-used reels, a machine limitation — not for a hunch.

Watch the solution type. A run that keeps returning **Feasible** rather than **Optimal** is telling you it ran out of time, and the fix is a longer search budget rather than acceptance of the result.

And when a run finds nothing at all, look at the classes before you look at the stock. A layer pointing at a grade or grammage that no reel item carries fails in exactly the same way as an empty warehouse, and it is far commoner.
