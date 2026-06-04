# Specialized Scenarios

While the core supply chain concepts we've covered apply universally, different industries have unique requirements. NaMa ERP includes specialized documents and workflows for these specific scenarios. Let's explore how the system adapts to different business contexts.

## Hospital and Healthcare

Healthcare supply chain has unique requirements around patient safety, regulatory compliance, expiration tracking, and controlled substances.

### Pharmacy Operations

Hospital pharmacies operate differently from regular warehouses:

**HMSPharmacyInvoice** (فاتورة صيدلية): Dispensing medications to patients
- Links to patient records
- Tracks insurance coverage
- Enforces prescription requirements
- Records lot numbers for recall capability
- Monitors expiration dates
- Checks drug interactions

**HMSPharmacyReturn** (مرتجع صيدلية): Unused medications returned
- Quarantine returned medications (can't reissue)
- Document reason for return
- Proper disposal tracking for controlled substances
- Credit patient or insurance

**Why Different from Regular Sales?**
- Patient safety is paramount
- Regulatory requirements (prescription verification, controlled substance tracking)
- Insurance integration (claims, copays, formularies)
- Expiration management is critical (use FEFO - First Expiry First Out)

### Blood Bank Management

Blood products have the shortest shelf life and highest criticality:

**HMSBloodBankInvoice** (فاتورة بنك دم): Issuing blood products
- Blood type matching critical
- Strict expiration (days, not months)
- Temperature control tracking
- Patient crossmatch requirements
- Trace every unit to donor and recipient

**HMSBloodBankReturn** (مرتجع بنك دم): Unused units returned
- Must return quickly (short shelf life)
- Temperature breach = discard
- Document why unused (surgery cancelled, patient outcome changed)

**Unique Characteristics:**
- Every unit individually tracked (serial numbers mandatory)
- Zero error tolerance (wrong blood type = fatal)
- Extremely short shelf life (days)
- Complete traceability (from donor through recipient)

### Medical Supplies

General medical supplies (not drugs):

**HMSSuppliesInvoice** (فاتورة مستلزمات): Issuing supplies
- To departments (OR, ICU, wards)
- To specific procedures (track cost per surgery)
- Implants and high-value items individually tracked
- Par level replenishment

**HMSSupplyReturn** (مرتجع مستلزمات): Unused supplies returned
- Return to central supply
- Restock if sterility intact
- Discard if opened or contaminated

**HMSServiceSupplyInvoice**: Supplies tied to patient services
- Cost allocation to patient
- Insurance billing
- Supply cost tracking per procedure type

### Ward Supply Management

**HMSFeedingIssue**: Replenishing department par levels
- Each ward/department has minimum stock levels
- Automated replenishment when low
- Track consumption by department
- Cost allocation to departments

## Point of Sale (Retail)

Retail operations need speed over detailed approval workflows.

### POS Sales Process

**NamaPOSSalesInvoice** (فاتورة مبيعات نقطة بيع): Retail sales
- Immediate payment required (cash, card)
- Fast transaction processing
- Barcode scanning
- Receipt printing
- Cash drawer management
- End-of-day reconciliation

**Key Differences from Regular Sales:**
- No quotation or order process
- Payment immediate (no credit terms)
- High volume, low complexity transactions
- Customer usually anonymous (no customer record unless loyalty program)
- Inventory issues instantly

### POS Returns and Exchanges

**NamaPOSSalesReturn** (مرتجع مبيعات نقطة بيع): Retail returns
- Verify original receipt
- Return within policy period
- Check item condition
- Process refund or store credit

**NamaPOSSalesReplacement**: Size/color exchanges
- Customer exchanges without full return/repurchase
- Handle price differences
- Update inventory for both items

### POS Reservations

**NamaPOSOrderReservation** (حجز طلب نقطة بيع): Customer orders
- Customer wants item not in stock
- Reserve when arrives
- Hold for pickup
- Time limit before cancellation

**NamaPOSCancelReservation**: When customer doesn't pick up
- Release reserved stock
- Return to available inventory

### POS Inventory Management

**NamaPOSStockReceipt** (استلام مخزني نقطة بيع): Store receiving
- Receiving from central warehouse
- Store transfers
- Vendor direct delivery to store

**NamaPOSStockTransferReq**: Requesting stock from warehouse
- Store running low
- Request transfer from central warehouse or other stores
- Automated based on sales velocity

**NamaPOSStockTakingDetails**: Store inventory counts
- End-of-day counts (for high-value items)
- Periodic full counts
- Cycle counts
- Shrinkage tracking

### POS Special Handling

**NamaPOSHeldInvoice**: Holding transactions
- Customer shopping interrupted
- Hold transaction, continue later
- Prevents timeout losing customer's cart

**NamaPOSScrapDoc**: Damaged merchandise
- In-store damage
- Display damage
- Expired products
- Document for inventory write-off

**NamaPOSShortfallsDoc**: Shortage tracking
- Items missing during count
- Potential theft or loss
- Regular reporting to management

## Service Center Operations

Service centers (repair shops, service businesses) have unique inventory flows:

### Service Item Assembly

**SubItemAssemblyDocument**: Assembling service items
- Service package = base service + parts + labor
- Track component costs
- Bill customer for total service

### Service Parts Management

**SIPurchaseOrder**, **SIPurchaseInvoice**: Parts for service jobs
- Purchasing parts specific to customer orders
- Direct job costing
- Customer authorization for parts

**SISalesInvoice**, **SISalesOrder**: Billing for services
- Service labor + parts cost
- Warranty vs. paid service
- Customer approval before work

**SrvCRawMaterialIssue**: Issuing parts to technician
- Technician takes parts to job site
- Track who has what parts
- Return unused parts

**SrvCRawMaterialIssueRequest**: Requesting parts for job
- Technician identifies needed parts
- Parts issued from stock
- Charge to customer or warranty

**SrvcRawMaterialReturn**: Returning unused parts
- Job didn't need all parts issued
- Return to service parts inventory
- Adjust customer billing

### Service Location Management

**SIReceipt**, **SIReceiptCancel**: Receiving service items
- Customer brings item for service
- Receive into service queue
- Track status (waiting, in-progress, done)

**InvoiceReceiptDoc**: Completing service
- Service finished
- Invoice customer
- Release repaired item

**SIAllocation**, **SIAllocationCancel**: Assigning work
- Allocate service job to technician
- Track workload
- Schedule management

**SITrafficLetter**, **SITrafficLetterCancel**: Delivery authorization
- Authorize delivery of serviced item
- Customer pickup or delivery
- Release from service center

**SISalesApproval**: Customer approval for service
- Estimate provided
- Customer approves work
- Proceed with service

## Job Order Manufacturing

Custom manufacturing where each order is unique:

### Glass Job Orders

**GlassJobOrder** (أمر شغل زجاج): Custom glass cutting/fabrication
- Customer specifications (dimensions, type, tinting, etc.)
- Custom cutting and assembly
- Measurement → fabrication → installation

**GlassJobOrderReq**: Requesting custom work
- Customer inquires
- Site measurement
- Quotation
- Approval
- Work order created

### Job Order Sales

**JOSalesQuotation** (عرض أسعار أمر شغل): Custom quotations
- Each job is unique
- Estimate materials needed
- Estimate labor time
- Price accordingly

**JOSalesQuotationReq**: Customer requests quote
- Provide specifications
- Site visit if needed
- Create detailed quote

**JOSalesOrder**, **JOSalesInvoice**: Job order sales
- Custom order processing
- Track job progress
- Bill upon completion or milestones

### Job Order Operations

**JOOutSourceManufactureIssue**: Sending to subcontractor
- Parts that need outside processing
- Track what's at subcontractor
- Cost tracking

**JOOutSourcManufacturReceipt**: Receiving from subcontractor
- Parts return from outside processing
- Inspect work
- Pay subcontractor

**JODamageDoc**: Job site damage
- Custom work damaged
- Determine responsibility (you vs. customer vs. shipper)
- Remake or repair
- Insurance claims

## Contracting and Project Management

Construction and contracting have unique material management:

### Project Material Management

**ContractingPurchaseOrder**, **ContractingPurchaseRequest**: Project purchasing
- Materials for specific projects
- Track costs to project
- Customer approval for changes
- Budget tracking

**ContractingMaterialIssue**, **ContractingMaterialIssueReq**: Issuing to job sites
- Send materials to project site
- Track by project and location
- Cost allocation to projects

**ContractingMaterialReturn**: Returning from job sites
- Unused materials back to warehouse
- Credit to project
- Restock for other projects

### Contractor Material Management

**ContractorMaterialIssue**: Issuing to subcontractor
- Materials provided to subcontractor
- Track what they have
- Recover or charge if not returned

**ContractorMaterialReturn**: Subcontractor returns unused
- Return excess materials
- Verify quantities
- Credit to subcontractor account

### Budget and Executive Items

**ExecutiveBudgetItemRequest**: Government/large project requisitions
- Budget approval required
- Multiple approval levels
- Detailed justification
- Audit trail

## Manufacturing Operations

### Raw Material Management

**RawMaterialIssue**, **RawMaterialIssueReq**: Materials to production
- Issue to specific production orders
- Track consumption
- Variance analysis (planned vs. actual)

**RawMaterialReturn**, **RawMaterialReturnReq**: Unused materials back
- Return excess from production
- Update job costs
- Restock for other jobs

**MCRawMaterialIssue**: Manufacturing cell material issues
- JIT/cellular manufacturing
- Kanban-style replenishment
- Lean manufacturing integration

### Production Output

**ProductDelivery**: Finished goods from production
- Receive into finished goods inventory
- Calculate product cost (materials + labor + overhead)
- Quality check before stock

**ProductReturn**, **ProductReturnReq**: Defective products back
- Failed final inspection
- Return to production for rework
- Scrap if unrepairable

**ScrapReceipt**: Manufacturing scrap
- Byproducts from production
- Salvage value
- Disposal tracking

### Processing and Transformation

**ProcessingDoc** (مستند معالجة): Item processing
- Transform one item into another
- Chemical processing
- Heat treatment
- Assembly processing

**CRTNMaterialIssue**: CRTN-specific material issues
- Industry-specific issue process
- Custom tracking requirements

## Tender and Pricing Operations

**Tender** (مناقصة): Tender management
- Government or corporate tenders
- Bid preparation
- Pricing strategy
- Compliance documentation

**FinishedProductPricing** (تسعير منتج نهائي): Cost-plus pricing
- Calculate product cost (materials + labor + overhead)
- Apply margin
- Set sales prices
- Update price lists

## E-Commerce Integration

### Magento Integration

**MagentoPriceUpdaterDoc**: Syncing prices to online store
- Update Magento prices from ERP
- Bulk price updates
- Promotional pricing
- Variant pricing

**Magento Fields on Sales Invoices:**
- `magentoSourceId`: Order ID from Magento
- `magentoSiteRef`: Which Magento site
- `lastMagentoStatus`: Sync status
- `lastMagentoComment`: Notes from Magento

**Integration Flow:**
1. Customer orders on website (Magento)
2. Order syncs to NaMa ERP (SalesInvoice created)
3. Process order in ERP (pick, pack, ship)
4. Update status in Magento (customer sees tracking)
5. Invoice created in Magento
6. Shipment notification to customer

## Weight Scale Integration

**WeightScalePreparationDoc** (مستند تحضير ميزان): Bulk receiving/shipping
- For businesses receiving/shipping bulk materials
- Integration with electronic truck scales
- Automated weight capture
- Calculate net weight (gross - tare)
- Reduce manual data entry errors

**Common Industries:**
- Agriculture (grain, feed)
- Chemicals (bulk liquids)
- Construction materials (sand, gravel, cement)
- Recycling (scrap metal, paper)
- Waste management

## Common Patterns Across Specializations

Despite industry differences, patterns emerge:

### Two-Step Processes
Many industries use request → execution:
- Request ensures approval before action
- Provides planning time
- Creates audit trail
- Supports workflow management

### Cancellation Documents
Most document types have cancellations:
- Maintains audit trail
- Reverses effects properly
- Tracks why cancellation happened
- Supports controls and compliance

### Integration Points
Specialized documents integrate with:
- **Core Inventory**: All affect stock levels
- **Accounting**: All have financial impact
- **Quality**: Many include inspection steps
- **Customer/Supplier**: Many link to parties

### Traceability
All specialized scenarios emphasize:
- Where did items come from?
- Where did they go?
- Who handled them?
- When did events occur?
- Why did actions happen?

## Choosing the Right Document

With so many document types, how do you choose?

**Ask These Questions:**

1. **What's the business event?** (receiving, issuing, selling, processing)
2. **What's the industry context?** (hospital, retail, manufacturing, service)
3. **What's the source/destination?** (supplier, customer, department, production)
4. **What regulatory/compliance needs exist?** (controlled substances, safety, traceability)
5. **What approval workflow is needed?** (direct, request-first, multiple approvals)

The answers point you to the right document type.

## Tips for Specialized Operations

::: tip Best Practices

**Use Industry-Specific Documents**
Don't try to force retail operations into manufacturing documents or vice versa. Use the specialized documents designed for your industry.

**Understand Your Compliance Requirements**
Many specialized documents exist because of regulatory requirements. Make sure you understand your obligations.

**Train for Specialization**
Hospital inventory management is very different from retail. Invest in industry-specific training for your team.

**Configure Appropriately**
Many specialized features require configuration. Work with your NaMa ERP consultant to set up your system correctly.

**Don't Over-Complicate**
Just because a feature exists doesn't mean you must use it. Start simple, add complexity only when needed.

:::

## Common Questions

**Q: Can we use general documents instead of specialized ones?**

A: Technically possible but not recommended. Specialized documents enforce industry requirements, provide appropriate fields, and ensure compliance. Using general documents risks missing critical tracking.

**Q: What if our industry isn't listed here?**

A: NaMa ERP's core supply chain documents are flexible enough for most industries. The specialized documents cover common industry needs, but custom configurations can handle unique requirements.

**Q: Can we mix document types?**

A: Yes - a hospital might use POS documents for its gift shop and HMS documents for pharmacy. Use the right tool for each operation.

**Q: How do we learn more about our industry's documents?**

A: Consult with NaMa ERP specialists who understand your industry. They can guide you on best practices and configuration.

## Integration Across Industries

Despite differences, all specialized operations connect to:

**The Core Supply Chain**: All documents ultimately increase or decrease inventory, following the same underlying transaction model.

**Accounting**: All financial transactions post to ledgers using the same accounting engine.

**Common Workflows**: Request → Approve → Execute → Document patterns apply universally.

**Quality Control**: Inspection and quality management apply across industries, just with different criteria.

## Conclusion

NaMa ERP's supply chain module balances universal principles with industry-specific needs. The core concepts of receiving, issuing, buying, and selling apply everywhere. But healthcare, retail, manufacturing, and other industries each have unique documents and workflows that make the system fit their specific requirements.

Start with understanding the core supply chain concepts, then explore the specialized documents relevant to your industry. The foundation is the same; the implementation details adapt to your business reality.

## Next Steps

You've completed the supply chain documentation tour! To deepen your knowledge:

**Review Core Concepts:**
- [Understanding Items](./understanding-items.md)
- [Receiving Stock](./receiving-stock.md)
- [Issuing Stock](./issuing-stock.md)
- [Moving Stock](./moving-stock.md)

**Explore Business Processes:**
- [The Purchasing Journey](./purchasing-journey.md)
- [The Sales Journey](./sales-journey.md)
- [Quality Control](./quality-control.md)

**Get Hands-On:**
- Practice with sample data
- Configure for your specific industry
- Train your team
- Start with simple operations, add complexity gradually

Welcome to mastering supply chain management with NaMa ERP!
