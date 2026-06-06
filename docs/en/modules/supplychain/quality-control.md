# Quality Control

Quality control is the gatekeeper between your suppliers and your customers - ensuring that only items meeting your standards make it into available inventory and out to your customers. Let's explore how NaMa ERP helps you maintain quality throughout your supply chain.

## Why Quality Control Matters

Imagine this scenario: You receive 1,000 units from a supplier. You immediately receive them into stock. The next day, production discovers half are defective. Now you have to:
- Stop production (disruption)
- Segregate bad units (extra handling)
- Contact supplier (time consuming)
- Process returns (paperwork and shipping)
- Find emergency replacement (likely expensive)
- Explain delay to your customers (damage to reputation)

Quality control prevents this cascade of problems by catching issues **before** items enter your regular stock and production flow.

## The Quality Control Philosophy

Quality control in NaMa ERP follows these principles:

**1. Gate Keeping**: Items don't automatically become "available" just because they arrived. They become available after passing quality checks.

**2. Documentation**: Every quality decision is recorded - what was checked, who checked it, what criteria were used, what was found.

**3. Traceability**: Link quality records to specific batches, lots, or serial numbers so you can trace issues.

**4. Continuous Improvement**: Quality data helps you improve suppliers, processes, and specifications over time.

## Quality Control for Incoming Goods

The most common quality control scenario is inspecting items as they arrive from suppliers.

### The Two-Step Receipt Process

Instead of directly receiving into available stock, use a two-step process:

#### Step 1: Receipt to Inspection

Use `ReceiptInspection` (فحص استلام) to receive items into a quality inspection area:

**What Happens:**
- Items physically arrive
- Count them (verify quantities)
- Move to inspection area (separate from regular stock)
- Create receipt inspection document
- Items status: "Under Inspection"

**At This Point:**
- Items are in your custody (ownership transferred)
- They're in your inventory (counted as asset)
- But they're NOT available for use (can't be issued to production or sold)

#### Step 2: Quality Inspection

Quality team inspects items using configured checklists:

**Physical Inspection:**
- Visual examination (damage, finish, appearance)
- Dimensional checks (measurements match specifications?)
- Functional tests (does it work?)
- Sample testing (destructive or non-destructive tests)

**Documentation Review:**
- Certificates of analysis
- Material certifications
- Test reports from supplier
- Compliance documentation

**Recording Results:**
Use `QualityControlDoc` (مستند فحص جودة) to record:
- What was inspected
- What tests were performed
- What results were found
- Pass/fail decision for each criterion
- Overall accept/reject decision

#### Step 3: Disposition

Based on inspection results:

**Accept (Full):**
- Create stock receipt from inspection to regular stock
- Items now available for use
- Update supplier quality score positively

**Reject (Full):**
- Create purchase return request
- Keep items in inspection/reject area
- Contact supplier for RMA
- Return items
- Update supplier quality score negatively

**Partial Accept:**
- Accept good quantity (move to regular stock)
- Reject bad quantity (prepare for return)
- Document discrepancy
- Inform purchasing for price adjustment

**Accept with Deviation:**
- Items don't fully meet specifications but usable
- Create deviation approval document
- Document the deviation
- Move to stock with notes
- Supplier may owe price reduction

### The Quality Control Request

For planned inspections, start with `QualityControlReq` (طلب فحص جودة):

**Workflow:**
1. Goods arrive, receipt inspection created
2. Quality team receives request: "Please inspect 1,000 widgets in inspection area A-12"
3. Team plans inspection (schedule, assign inspector, prepare equipment)
4. Perform inspection
5. Create quality control document with results
6. Make disposition decision

This formalized request ensures:
- Inspections don't get forgotten
- You can track inspection backlogs
- Management visibility into quality workload
- Priority inspections get handled first

## Quality Checklists

Rather than relying on inspector memory, use standardized checklists.

### Item-Level Quality Checklists

Configure quality requirements at the item level:

`qualityCheckList` field on `InvItem` defines:
- Which checks are required for this item
- What criteria define pass/fail
- What measurements to record
- What tolerances are acceptable

**Example Checklist for Electronic Components:**
- [ ] Visual inspection: No physical damage
- [ ] Dimensional check: Within ±0.1mm tolerance
- [ ] Electrical test: Resistance 100Ω ±5%
- [ ] Function test: Powers on correctly
- [ ] Documentation: Certificate of compliance present

**Example Checklist for Food Products:**
- [ ] Visual inspection: No damage to packaging
- [ ] Temperature check: Maintained cold chain
- [ ] Expiration date: Minimum 6 months remaining
- [ ] Sample test: Microbiological analysis
- [ ] Documentation: Health certificate present

### Using Checklists

When inspector creates `QualityControlDoc`:
1. System shows the checklist for that item
2. Inspector checks off each item
3. Enter measurement values where applicable
4. Mark pass/fail for each criterion
5. System calculates overall pass/fail based on rules

This ensures:
- Consistency (all inspectors check the same things)
- Completeness (nothing gets skipped)
- Documentation (every check is recorded)
- Data capture (measurements for trend analysis)

## Quality Assurance for Inventory

Quality control isn't just for newly arrived items. Items in stock may need periodic quality checks.

### Quality Assurance Documents

The `QualityAssuranceDoc` (ضمان جودة) records ongoing quality checks:

**Use Cases:**

**Periodic Retesting:**
Some items (chemicals, pharmaceuticals) degrade over time. The `reTestPeriod` field on items defines how often to retest.

Example: Chemical expires 1 year after manufacture, but requires retesting every 3 months to confirm it's still within specifications.

**Random Quality Sampling:**
Periodically pull random samples from inventory to verify quality is maintained during storage.

**Pre-Use Inspection:**
Before issuing critical items (especially if they've been in stock a while), verify they're still good.

**Compliance Audits:**
Regulatory or customer audits may require demonstration of ongoing quality management.

### Quality Assurance Requests

The `QualityAssuranceReq` (طلب ضمان جودة) initiates quality checks:
- Quality manager schedules periodic checks
- Production requests check before using materials
- Customer audit triggers compliance verification

## Quality Control for Outgoing Goods

Quality control isn't just about what comes in - it's also about what goes out.

### Pre-Shipment Inspection

Before shipping to customers, especially for:
- Large orders
- Critical customers
- Complex assembled items
- First-time products

Perform final inspection:
- Verify correct items picked
- Check condition (no damage during warehouse handling)
- Test function (if applicable)
- Verify completeness (all components included)
- Inspect packaging

Record this inspection so if customer later complains, you have documentation of condition when shipped.

### Certificate of Quality

Some customers require certificates:
- Certificate of conformance (items meet specifications)
- Certificate of origin (items manufactured in specific location)
- Certificate of analysis (lab test results)
- Calibration certificates (for measurement equipment)

Generate these from quality control records and ship with goods.

## Handling Quality Failures

When items fail quality control, you need clear processes.

### Supplier Communication

**First Failure:**
- Document the issue clearly
- Provide evidence (photos, measurements, test results)
- Request corrective action
- Process return or claim discount

**Repeated Failures:**
- Escalate to supplier management
- Require corrective action plan
- Increase inspection stringency (inspect 100% instead of samples)
- Consider alternative suppliers
- Document everything for potential legal action

### Internal Quality Issues

When items already in your stock are found defective:

**Source Identification:**
- Which lot/batch is affected?
- Who is the supplier?
- When was it received?
- What other items from same lot exist?

**Segregation:**
- Physically separate suspected items
- Flag in system as "Quarantine"
- Prevent from being issued
- Investigate

**Disposition:**
- Test all items from affected lot
- Return to supplier (if possible)
- Scrap (if cannot return)
- Accept for alternative use (if partially usable)
- Document total cost impact

## Quality Metrics and Reporting

Quality control generates valuable data for improvement.

### Supplier Quality Metrics

Track by supplier:
- **Defect rate**: Percentage of items failing inspection
- **First-pass yield**: Percentage passing inspection on first try
- **Return rate**: Percentage of receipts resulting in returns
- **Response time**: How quickly supplier addresses issues
- **Corrective action effectiveness**: Do their fixes work?

Use this data to:
- Rate suppliers
- Make sourcing decisions
- Negotiate better terms (good quality = better prices)
- Drive supplier improvement

### Item Quality Metrics

Track by item:
- **Failure modes**: What kinds of defects occur?
- **Failure frequency**: How often does this item fail?
- **Cost of quality**: Inspection cost + failure cost
- **Trend**: Is quality improving or degrading?

Use this data to:
- Improve specifications
- Change suppliers
- Redesign items
- Adjust inspection intensity

### Inspector Performance

Track by inspector:
- **Consistency**: Do different inspectors reach same conclusions?
- **Speed**: How long does inspection take?
- **Accuracy**: How often do customers report defects that passed inspection?

Use for:
- Training needs identification
- Process improvement
- Capacity planning

## Automated vs. Manual Inspection

### Manual Inspection

Traditional approach:
- Inspector physically examines items
- Uses measurement tools
- Records results in system
- Makes subjective judgments

**Good For:**
- Small batches
- Complex criteria
- Items where automated equipment doesn't exist
- Subjective quality factors (appearance, fit, feel)

### Automated Inspection

Modern approach:
- Electronic equipment performs measurements
- Camera systems perform visual inspection
- Integration with NaMa ERP records results
- Consistent, fast, objective

**Good For:**
- Large batches
- Objective measurements
- High-volume operations
- Dangerous or difficult inspections

The `WeightScalePreparationDoc` is an example of automated integration - electronic scales feed weight data directly to the system.

## Statistical Quality Control

For high-volume operations, inspect samples rather than 100%.

### Sampling Plans

Define:
- **Sample size**: How many to inspect from each lot
- **Acceptance criteria**: How many defects allowed in sample
- **Risk levels**: Balance between inspection cost and defect risk

**Example**: "From each lot of 1000, inspect 50 random items. If more than 2 defects found, reject entire lot."

### Control Charts

Over time, plot quality metrics:
- Are defect rates stable or trending?
- Are we within control limits?
- When do we need to intervene?

This shifts from reactive (inspect everything) to proactive (monitor and intervene when trends indicate problems).

## Tips for Effective Quality Control

::: tip Best Practices

**Risk-Based Inspection**
Not everything needs equal scrutiny. Inspect more stringently:
- New suppliers (until they prove quality)
- Critical items (safety, regulatory, high-value)
- Items with history of problems

Inspect less stringently:
- Proven suppliers
- Non-critical items
- Items with excellent quality history

**Fast Feedback Loop**
Don't let inspection results sit. Immediately:
- Move accepted items to available stock (don't delay production)
- Initiate returns for rejected items (sooner = better)
- Communicate with suppliers (real-time feedback improves quality faster)

**Inspector Training**
Quality is only as good as your inspectors. Invest in:
- Clear procedures and checklists
- Equipment and tools
- Training and certification
- Regular calibration checks

**Root Cause Analysis**
Don't just reject defects - understand why they occurred:
- Supplier process issue?
- Design problem?
- Shipping damage?
- Specification ambiguity?

Fix causes, not just symptoms.

**Customer Voice**
Customer complaints are quality data too:
- What are customers finding that your inspection missed?
- Are specifications complete?
- Is inspector training adequate?
- Should inspection criteria change?

:::

## Common Questions

**Q: Do we need to inspect everything from every supplier?**

A: No. Use risk-based inspection. Proven suppliers with excellent history can have reduced inspection (or even skip-lot inspection). New or problematic suppliers get 100% inspection.

**Q: What if inspection takes too long and delays production?**

A: Balance risk vs. speed. Options:
- Increase inspection resources
- Use sampling instead of 100%
- Accept with provision (use but segregate in case issues found)
- Supplier certification (they do inspection, you audit)

**Q: Can supplier inspection replace our inspection?**

A: Depends on trust level. Some organizations:
- Accept supplier certificates initially
- Periodically audit supplier process
- Spot-check to verify
- Move to full acceptance if supplier proves consistent

**Q: What percentage of defects is acceptable?**

A: Depends on criticality:
- Safety items: Zero defects
- Critical components: Very low (0.1%)
- Standard items: Low but acceptable (1-2%)
- Non-critical supplies: Higher tolerance acceptable (5%)

**Q: How do we balance quality control cost vs. defect cost?**

A: Calculate:
- Inspection cost per unit
- Cost of defect reaching customer
- Probability of defect

If (cost of defect × probability) > inspection cost, inspect. Otherwise, accept the risk.

## Integration Points

Quality control connects to:

**Purchasing**: Supplier quality scores inform purchasing decisions and negotiations.

**Inventory**: Items don't become available until passing QC. Failed items trigger returns.

**Production**: Manufacturing can't use materials that fail QC. Prevents defects from propagating.

**Sales**: Pre-shipment inspection prevents customer complaints. Certificates document quality for customers.

**Accounting**: Rejected items reduce inventory value. Returns credit accounts payable. Quality issues affect supplier negotiations.

## Next Steps

Quality control is crucial but specialized. Now explore:
- [Specialized Scenarios](./specialized-scenarios.md) - How different industries handle quality uniquely
- [Receiving Stock](./receiving-stock.md) - Where quality control fits in receiving
- [The Purchasing Journey](./purchasing-journey.md) - How quality affects supplier relationships
