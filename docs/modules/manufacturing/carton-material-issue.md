# Carton Material Issues: From Warehouse to Shop Floor

## Connecting Planning to Execution

You've created a material planning document. The optimizer figured out exactly which rolls to use, from which lots, in what quantities. Production orders are generated and ready to execute.

Now you need to actually pull those materials from the warehouse and allocate them to production. That's where **Carton Material Issues** (صرف خامات كرتون) come in.

A material issue is a specialized inventory document that withdraws materials from stock and allocates them to production. It's linked to the material planning document, so you're issuing exactly what the optimizer specified - the right lots, the right quantities, no guesswork.

You'll find material issues under **Manufacturing > Documents > Carton Material Issue** (التصنيع > المستندات > صرف خامات كرتون).

## Why Carton Material Issues Are Special

Nama ERP has general-purpose material issue documents for manufacturing. So why a special one just for cartons?

**Two reasons**:

**1. Direct Link to Planning**: Carton material issues reference the planning document directly. When you select a planning document, the system can auto-populate issue lines with exactly what the optimizer specified - specific lot numbers, specific quantities, specific dimensional attributes. No manual entry, no mistakes.

**2. Lot/Dimensional Tracking**: Carton manufacturing is heavy on lot tracking (paper rolls come in lots with varying quality) and dimensional attributes (roll width is a dimension). Carton material issues are designed to handle this complexity naturally.

## Creating a Material Issue

### Step 1: Header Information

Start a new carton material issue and fill in the basics:

**CRTN Material Planning** (تخطيط خامات الكرتون): **Required**. Select the material planning document you're issuing materials for.

This is the key link. Everything else flows from this selection.

**Book** and **Term**: Control numbering, accounting settings, warehouse defaults

**Value Date**: When this issue should be dated

**Issue Date**: When the actual withdrawal happens (or happened)

### Step 2: Populate Details from Planning

You have two approaches:

#### Automatic Population (Recommended)

Once you save the document after selecting the planning document, Nama can auto-populate the **Details** (التفاصيل) grid based on the materials tab from the planning document.

**How it works**: The system reads all materials from the planning document and creates one issue line per material. Each line includes:
- Item classes (grade, weight, etc.)
- Specific lot number
- Roll width (Box dimension)
- Quantity to issue
- Warehouse and location (from term defaults)

You get a complete issue list matching exactly what the optimizer planned.

#### Manual Entry

Alternatively, you can manually add detail lines:

Each line specifies:
- **Item**: The inventory item (or leave blank and use item classes)
- **Item Class 1/2**: Paper grade, weight, etc.
- **Specific Dimensions - Box**: Roll width
- **Specific Dimensions - Lot ID**: Which lot to issue from
- **Warehouse** and **Locator**: Where to pull from
- **Quantity**: How much to issue

Manual entry makes sense if:
- You're issuing materials that differ from the plan (maybe substituting a different lot)
- The planning document doesn't exist (you're issuing for ad-hoc production)
- You want to issue partial quantities (issue some materials now, rest later)

### Step 3: Review and Adjust

Review the details grid. Each line should show:

**Item information**: What you're issuing (item classes, dimensions)
**Quantity**: How much (in base UOM - usually meters for rolls)
**Available quantity at insert** (الكمية عند الإدخال): How much is currently in stock of this exact item/lot/dimension combination

**Important**: If "Available quantity at insert" shows less than the quantity you're trying to issue, you have a problem. Either:
- The lot doesn't have enough material
- The warehouse doesn't have enough inventory
- Inventory records are wrong

Adjust quantities or lot selections to match what's actually available.

**Specific Dimensions Fields**:

- **Box** (العرض): Roll width. Critical for carton planning - make sure this matches what the planning specified.
- **Lot ID** (رقم التشغيلة): The specific lot/batch. This should match exactly what the planning document specified for optimal results.
- **Warehouse** (المستودع): Where you're pulling from
- **Locator** (الموقع): Specific location within the warehouse (optional but helpful for large warehouses)

Other dimension fields (Color, Size, Serial Number, etc.) might not apply to paper rolls but are available if needed.

### Step 4: Commit the Issue

Once everything looks good, commit the document.

Nama:
1. **Decreases inventory**: Reduces available quantity of each item/lot/dimension in the specified warehouse
2. **Creates accounting entries**: Debits work-in-process or production cost accounts (if configured in the term)
3. **Links to planning**: The material issue is permanently linked to the planning document, creating an audit trail

The materials are now "on the floor" - allocated to production, no longer in warehouse inventory.

## Common Scenarios

### Scenario 1: Standard Planning-Based Issue

You completed Material Planning #MP-501 which planned:
- Lot K2024-015, 2000mm width, 97 meters (Kraft facing)
- Lot F2024-022, 2000mm width, 82 meters (Fluting)
- Lot L2024-008, 2000mm width, 97 meters (Liner)

Create a carton material issue:
- Select "CRTN Material Planning" = MP-501
- Save
- System auto-populates three detail lines with exact lot numbers, widths, and quantities
- Verify all "available quantity at insert" values show sufficient stock
- Commit

Boom. Materials issued exactly as planned.

### Scenario 2: Partial Issue

Planning #MP-502 planned materials for a large job. Shop floor wants to start production but doesn't have space to stage all materials at once. Issue in batches.

**Issue #1** (Monday):
- Select Planning #MP-502
- Auto-populate details
- Manually reduce quantities to 50% of planned
- Commit

**Issue #2** (Wednesday):
- Select Planning #MP-502 again
- Auto-populate details
- System shows full planned quantities
- Reduce to the remaining 50%
- Commit

Both issues link to the same planning document. Total issued equals planned amount.

### Scenario 3: Lot Substitution

Planning specified Lot K2024-015, but that lot has quality issues discovered after planning. You need to use Lot K2024-017 instead (same grade, same width, just different lot).

Create material issue:
- Select the planning document
- Auto-populate
- Find the line that specifies Lot K2024-015
- Change "Lot ID" to K2024-017
- Verify "Available quantity" shows adequate stock of the new lot
- Commit

Production uses the substitute lot. The issue document shows you made a substitution (for quality/audit records).

### Scenario 4: Multiple Planning Documents, One Issue

Sometimes shop floor setups make it efficient to issue materials for multiple jobs at once.

Create a material issue:
- DON'T select a planning document in the header (leave it blank)
- Manually add detail lines, one per material from each planning document
- Use remarks to note which lines are for which planning documents
- Commit

This works but loses the automatic link. You can't auto-populate. Use this only when batching issues makes operational sense and the overhead of manual entry is worth it.

## Understanding Inventory Impact

When you commit a material issue, inventory quantities change:

**Before**:
```
Item: Kraft Liner 125gsm
Lot: K2024-015
Box (Width): 2000mm
Warehouse: Main Warehouse
Locator: Roll Storage Zone A
Available Quantity: 500 meters
```

**Issue 97 meters**

**After**:
```
Item: Kraft Liner 125gsm
Lot: K2024-015
Box (Width): 2000mm
Warehouse: Main Warehouse
Locator: Roll Storage Zone A
Available Quantity: 403 meters
```

The 97 meters are no longer available for other purposes - they're allocated to this production job.

**Multi-dimensional tracking**: Nama tracks quantities by item + lot + dimensions + warehouse + locator. If you have:
- Lot K2024-015, 2000mm width: 500 meters
- Lot K2024-015, 1800mm width: 300 meters

These are tracked separately. Issuing from 2000mm doesn't affect the 1800mm quantity.

This level of detail is critical for carton manufacturing where roll width drives everything.

## Tips for Effective Material Issues

**Issue from planning whenever possible**: Auto-population eliminates manual errors. Use the link to the planning document.

**Issue promptly after planning**: Don't plan materials and then wait weeks to issue them. Inventory availability might change. Issue soon after planning (and before production starts).

**Verify lot availability before committing**: Check "available quantity at insert". If it's lower than needed, investigate why (did someone else issue from that lot? was there a stock adjustment?).

**Match roll widths exactly**: The optimizer planned for specific widths. Don't substitute a 1800mm roll where 2000mm was planned without understanding the impact - it might not fit the cutting pattern.

**Document substitutions**: If you must substitute lots or widths, use the remarks field to note why. Future audits will thank you.

**One issue per planning is cleanest**: While you can create multiple issues from one planning (partial issues) or one issue for multiple plannings, the simplest audit trail is one planning → one issue. Stick to that when possible.

**Coordinate with shop floor**: Make sure the shop floor knows which lots are being issued. They need to pull the right rolls - a lot number on paper doesn't help if they grab the wrong physical roll.

**Use locators if you have them**: In large warehouses, specifying locators (rack/zone/position) speeds up physical picking. The warehouse team knows exactly where to go.

## Validation and Business Rules

Nama enforces several validations:

**Must have a planning document** (unless manually creating lines): The planning document link is what enables auto-population and audit trails.

**Quantities can't exceed availability**: The system checks current stock before committing. If you try to issue more than what's available in that lot/dimension/warehouse combination, the commit fails.

**Dimensions must be complete**: If lot tracking is enabled for the item, you must specify a lot. If dimensional tracking includes Box (width), you must specify it.

**Warehouse must be specified**: You must indicate which warehouse you're pulling from. No warehouse = no idea where materials are coming from.

## Integration with Production

Material issues are the handoff point from planning to execution:

**Material Planning** (Planning Phase):
- Creates the "what to cut" plan
- Specifies lots and quantities

**Material Issues** (Staging Phase):
- Physically withdraws materials from warehouse
- Allocates them to production
- Reduces inventory

**Production Execution** (Execution Phase):
- Uses the issued materials on the shop floor
- Records actual consumption
- Compares actual to planned

**Production Costing** (Closing Phase):
- Allocates material costs to finished goods based on what was actually issued and consumed

The material issue is the bridge between planning's "ideal world" and production's "reality."

## Common Questions

**Q: Can I edit a material issue after committing?**
A: Like most inventory documents, committed material issues typically shouldn't be edited (it creates accounting and audit issues). If you issued wrong quantities or wrong lots, the standard approach is to create a return/reversal issue or adjust inventory, then issue correctly.

**Q: What if the planning document didn't specify lot numbers (just item classes)?**
A: Rare for optimized planning, but if it happens, you select lots manually when creating the material issue. Use the freshest/highest quality lots available.

**Q: Can I issue more than planned?**
A: Yes, if you expect higher consumption (waste/scrap higher than planned). But this means you're deviating from the optimized plan. Better to stick to planned quantities and issue more later if actually needed.

**Q: What if I issue materials and then production is cancelled?**
A: Create a return/reversal material issue to put materials back in inventory. Or leave them as "issued but unused" and adjust when production eventually happens.

**Q: Does the material issue update the production order BOM automatically?**
A: No. The production order BOM comes from material planning. The material issue is a separate inventory transaction. However, if you configured the production order term to auto-generate material issues, those issues would match the BOM. If creating material issues manually, you control what's issued.

---

::: tip Stick to the Plan
The material planning optimizer worked hard to find the best cutting plan with specific lots and widths. Issue exactly what it specified to get the planned material efficiency. Substitutions might seem minor but can throw off the whole cutting pattern.
:::

::: warning Check Availability First
Before committing a material issue, verify that all lots have adequate available quantities. The last thing you want is to commit a production schedule and then realize you don't have the materials you thought you had.
:::

::: info Traceability
The chain from Customer Order → Material Planning → Material Issue → Production Order creates complete traceability. You can trace any finished carton back to the exact roll lot it came from. This is critical for quality investigations.
:::

---

## You're Ready to Manufacture Cartons

You now have the complete carton manufacturing workflow:

1. **[Specifications](./carton-specifications.md)** define your products
2. **[Orders](./carton-orders.md)** capture customer requirements
3. **[Material Planning](./carton-material-planning.md)** optimizes cutting plans
4. **Material Issues** (this document) stage materials for production
5. Standard Nama **Production Execution** records actual work
6. **Production Costing** finalizes costs and inventory values

The carton manufacturing module brings industrial optimization to a traditionally manual process. Use it well, and you'll see material waste drop, production efficiency rise, and margins improve.
