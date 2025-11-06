# The Purchasing Journey

Let's follow the complete story of how items get purchased - from "we need something" to "it's in our warehouse and we've paid for it." This journey involves many people, documents, and decisions. Understanding the flow helps you know which document to use when.

## The Big Picture

Before diving into details, here's the typical purchasing journey:

```
Need → Request → Quotations → Comparison → Order → Receipt → Invoice → Payment
```

Not every purchase follows every step (sometimes you skip straight to ordering), but understanding the full path helps you choose the right level of process for each situation.

## Step 1: Identifying the Need

Every purchase starts with a need. Someone, somewhere in your organization realizes they need something.

### The Item Request

The `ItemRequest` (طلب شراء صنف) is where it begins. Think of it as a formal "shopping list" that says:

**From**: Production Department
**Message**: "We need 500kg of steel, 200 bolts, and 50 liters of paint for next week's production run."

The request includes:
- What items are needed
- How much of each
- When they're needed
- Why they're needed (production order, project, general replenishment)
- How urgent it is

**Who Creates These?**
- Production planners (for manufacturing materials)
- Department heads (for operational supplies)
- Project managers (for project-specific items)
- Store keepers (for stock replenishment)

**What Happens Next?**
The request goes through an approval workflow. Managers review:
- Is this really necessary?
- Is it budgeted?
- Do we already have some in stock?
- Should we bundle this with other requests?

### Consolidating Requests

Multiple small requests can be consolidated. The `ConsolidatedPurchaseReq` (طلب شراء مجمع) combines:
- IT department needs keyboards
- Admin needs office supplies
- Production needs steel

All grouped by:
- Supplier (buy everything from OfficeSupplyCo in one order)
- Category (all electronics together)
- Urgency (all urgent items now, regular items next week)

**Why Consolidate?** Because it:
- Reduces shipping costs
- Improves negotiating power (bigger orders = better prices)
- Reduces administrative overhead
- Simplifies supplier management

## Step 2: Getting Quotations

Now you know what you need. Time to find out who can supply it and at what price.

### The Quotation Request

The `PurchaseQuotationRequest` (طلب عرض أسعار شراء) is sent to potential suppliers asking:
- Can you supply these items?
- What price will you charge?
- What delivery timeframe?
- What payment terms do you offer?

You typically send this to multiple suppliers (3-5 is common) to get competitive pricing.

**What Goes in a Quotation Request:**
- Clear item specifications (so all suppliers quote the same thing)
- Quantities needed
- Delivery location
- Desired delivery date
- Payment terms you prefer
- Any special requirements

### Receiving Quotations

Suppliers respond with their quotes, which you record as `PurchaseQuotation` (عرض أسعار شراء) documents.

Each quotation captures:
- Supplier offered prices for each item
- Delivery time they promise
- Payment terms they offer
- Validity period (quote expires after 30 days, etc.)
- Any conditions or notes

**Reality Check**: Not all suppliers respond on time. Some prices are surprisingly high. Some quotes have hidden conditions. This is normal - the comparison process helps you navigate this.

### Comparing Quotations

The `PurchasePriceComparing` (مقارنة أسعار شراء) document puts all quotations side-by-side so you can analyze:

| Item | Supplier A Price | Supplier B Price | Supplier C Price | Delivery A | Delivery B | Delivery C |
|------|------------------|------------------|------------------|------------|------------|------------|
| Steel | $2.50/kg | $2.30/kg | $2.60/kg | 5 days | 7 days | 3 days |
| Bolts | $0.10/each | $0.12/each | $0.09/each | 5 days | 7 days | 3 days |

**Decision Factors Beyond Price:**
- Quality (cheapest isn't always best)
- Reliability (does this supplier deliver on time?)
- Payment terms (30 days vs. 60 days credit makes a cash flow difference)
- Existing relationships
- Service and support
- Local vs. imported

The comparison document supports your approval workflow - management reviews and approves the selected supplier.

## Step 3: Placing the Order

Quotations compared, supplier selected, approval received. Time to officially order!

### The Purchase Order

The `PurchaseOrder` (أمر شراء) is the official document that says: "Dear Supplier, please supply us with these items under these terms."

**What Makes It Official:**
- Legal commitment (you're promising to buy, they're promising to sell)
- Specific quantities and items
- Agreed prices
- Delivery terms (where and when)
- Payment terms (when and how you'll pay)
- Order number (your reference and theirs)

**The Information it Contains:**

**Your Information:**
- Company name and legal details
- Delivery address
- Billing address
- Contact person
- Order number

**Supplier Information:**
- Supplier name and details
- Supplier code (your internal reference)

**Items Ordered:**
- Item descriptions (clear, specific)
- Quantities
- Units of measure
- Unit prices
- Line totals

**Terms:**
- Delivery date
- Delivery location
- Shipping method
- Payment terms
- Currency
- Tax handling
- Special conditions

**Totals:**
- Subtotal
- Discounts
- Taxes
- Grand total

### The Proforma Alternative

Sometimes you need a purchase order that's not quite official - maybe for:
- Getting customs approval before formal purchase
- Budget approval process
- Letter of credit application

Use `ProformaPurchaseInvoice` (فاتورة مشتريات مبدئية) for these "almost orders" that aren't yet committed.

### After the Order is Sent

Once sent to the supplier:
1. Supplier acknowledges receipt
2. Supplier confirms or negotiates any changes
3. Order enters "open" status
4. You wait for delivery
5. System tracks: What's been received? What's still outstanding?

You can track purchase order status:
- Open (nothing received yet)
- Partially received (some items arrived, some pending)
- Fully received (everything arrived)
- Cancelled (order was terminated)

## Step 4: Receiving the Goods

The truck arrives! Time to receive what you ordered.

### The Receipt Process

Physically:
1. Truck delivers goods
2. Receiving clerk counts and inspects
3. Compares received quantity to packing slip
4. Compares packing slip to purchase order

In the system:
1. Create receipt document (often `PurchaseInvoiceReceipt` if created from the invoice, or standalone stock receipt)
2. Link to purchase order
3. Enter actually received quantities
4. Note any discrepancies

**Common Discrepancies:**
- Ordered 100, received 95 (short shipment)
- Ordered 100, received 105 (over shipment)
- Received wrong item
- Received damaged items
- Received correct quantity but wrong specifications

Each requires different handling:
- Accept partial and wait for balance
- Accept all (even over shipment)
- Reject and return
- Accept good, reject damaged
- Escalate to purchasing for resolution

### Inspection Receipts

For critical items, use two-step receiving:

1. **Initial Receipt**: Items arrive, count them, move to inspection area (`ReceiptInspection` document)
2. **Quality Inspection**: Test, measure, verify specifications
3. **Final Decision**:
   - Accept: Move to regular stock
   - Reject: Prepare return to supplier
   - Partial: Accept some, reject some

More on this in [Quality Control](./quality-control.md).

## Step 5: Receiving the Invoice

Days or weeks later (or sometimes with the goods), the supplier sends an invoice.

### The Purchase Invoice

The `PurchaseInvoice` (فاتورة مشتريات) is the supplier's bill. It says: "You received these goods, now pay us this amount."

**Key Information:**

**Header:**
- Supplier invoice number (their reference)
- Invoice date
- Due date
- Payment terms
- Supplier details
- Your purchase order reference

**Lines (for each item):**
- Item received
- Quantity
- Unit price
- Line total
- Taxes

**Summary:**
- Subtotal
- Discounts
- Shipping charges
- Other charges (customs, insurance, handling)
- Taxes
- Grand total

### The Three-Way Match

Best practice is to match three documents:
1. Purchase Order: What you agreed to buy
2. Receipt Document: What you actually received
3. Purchase Invoice: What the supplier is billing

Check:
- ✓ Quantities match (or discrepancies are explained)
- ✓ Prices match what was agreed
- ✓ Math is correct
- ✓ Terms are as agreed

Only pay invoices that pass the three-way match. Discrepancies require investigation and resolution.

### What the System Does

When you save the purchase invoice (not as draft):

**Inventory Update**:
If you haven't already created a receipt (maybe invoice arrived first), the system can automatically create the receipt. Inventory increases.

**Accounting Entries**:
- Debit: Inventory Asset (or Expense if not inventory items)
- Debit: Tax Input Account (recoverable VAT)
- Credit: Accounts Payable - Supplier

**Payment Scheduling**:
Based on payment terms, system creates payment schedule:
- Invoice for $10,000
- Terms: Net 30 days
- Due date: (Invoice date + 30 days)
- Reminder: System alerts as due date approaches

## Step 6: Payment

Eventually (hopefully on time!), you pay the supplier.

### Payment Documents

Payment can happen through:
- Bank transfer
- Check
- Cash (for small amounts)
- Credit card
- Payment vouchers

The system tracks:
- Which invoices are paid
- When payment was made
- How much was paid
- What payment method was used
- Remaining balance

### Scheduled Payments

The `scheduleLines` collection on the invoice tracks payment schedule:
- First installment: $5,000 due in 30 days
- Second installment: $5,000 due in 60 days

As you make payments, these get marked paid.

### External Payment Lines

The `externalPaymentLines` collection links purchase invoices to payment vouchers in the accounting system. This creates the connection between:
- Accounts Payable (liability)
- Cash/Bank (asset reduction)

## Handling Returns and Problems

Things go wrong. You need to return items.

### The Purchase Return

The `PurchaseReturn` (مرتجع مشتريات) reverses a purchase:

**Common Scenarios:**
- Items arrived defective
- Wrong items were shipped
- Items failed quality inspection
- You ordered too much and supplier accepts return

**The Process:**
1. Get return authorization from supplier (RMA number)
2. Create purchase return document linking to original purchase
3. Issue items from your warehouse
4. Ship back to supplier
5. Await credit note
6. Apply credit to your payable balance

**Accounting Impact:**
Purchase return creates:
- Credit: Inventory (reduces asset)
- Debit: Accounts Payable (reduces liability)

If you've already paid, you might get:
- Credit note applied to future purchases
- Refund (cash back)

### The Return Request

The `PurchaseReturnReq` (طلب مرتجع مشتريات) initiates the return process:
1. Warehouse identifies items to return
2. Creates return request with reason
3. Purchasing contacts supplier for RMA
4. Once authorized, create actual return
5. Execute the return

## Special Scenarios

### Import Purchases and Letters of Credit

For international purchases, the process becomes more complex with customs, shipping, and payment security.

**Letter of Credit Documents:**
- `LCProformaInvoice`: Proforma invoice for opening letter of credit
- `LCShipmentProformaInvoice`: For specific shipments under LC

These integrate with your banking relationships to ensure payment is secured before goods ship.

### Purchase Document Updates

Sometimes you need to adjust a purchase after the fact:

`PurchaseDocumentUpdate` (تحديث مستند مشتريات) handles:
- Price adjustments (supplier gives discount after invoice)
- Quantity corrections (invoice said 100, should be 95)
- Additional charges (freight charge billed separately)
- Tax adjustments

Think of these as "amendments" to the original purchase.

## Forecasting and Planning

### Purchase Forecasts

The `PurchaseForecast` (توقعات شراء) helps plan future purchases:
- Based on sales forecasts
- Based on production schedules
- Based on historical consumption
- Accounting for lead times

This shifts purchasing from reactive to proactive:
- **Reactive**: "We're out! Order now!" (often paying rush fees)
- **Proactive**: "We'll run low in 3 weeks. Order now for normal delivery." (better prices, better terms)

## Tips for Effective Purchasing

::: tip Best Practices

**Document Everything**
Every conversation with suppliers, every negotiation, every price change - document it in the system's remarks and notes fields.

**Standardize Requests**
Use consistent item requests. Clear specifications prevent misunderstandings and make comparing options easier.

**Compare Before Ordering**
Even with preferred suppliers, periodically get competitive quotes. Markets change, relationships can become complacent.

**Three-Way Match Strictly**
Don't skip the matching process. It catches errors, prevents fraud, and ensures you pay what you should pay.

**Track Supplier Performance**
Note which suppliers deliver on time, which have quality issues, which respond well to problems. This data informs future decisions.

**Negotiate Payment Terms**
Price isn't everything. Extra 30 days to pay can be worth more than 2% discount if cash flow is tight.

**Maintain Safety Stock**
Don't wait until you're at zero. Reorder when you hit safety stock level to buffer against delivery delays.

**Communicate Lead Times**
Tell your internal customers realistic lead times. Under-promising and over-delivering is better than the reverse.

:::

## Common Questions

**Q: Can we create a purchase invoice before receiving the goods?**

A: Yes, but it's not recommended. Best practice is receive first (to verify what you got), then match invoice to receipt. However, sometimes invoices arrive first - the system can handle this by automatically creating the receipt from the invoice.

**Q: What if the supplier charges more on the invoice than on the purchase order?**

A: The system typically warns you about price discrepancies. Either:
- Reject the invoice and contact supplier
- Accept if the difference is small and documented
- Update the purchase order if prices were renegotiated

**Q: How do we handle partial deliveries?**

A: Create a receipt for what arrived. Purchase order tracks what's still outstanding. When the rest arrives, create another receipt against the same order. System handles this naturally.

**Q: Can we order items not in our item master?**

A: Technically possible (free-text line items) but not recommended. Better to add items to the master first - ensures consistent tracking, costing, and accounting.

**Q: What happens if we cancel a purchase order after partially receiving?**

A: You can close the order for remaining quantities. What's been received stays received, but the system won't expect the balance anymore.

## Integration Points

Purchasing connects to:

**Accounting**: Every purchase invoice creates payables. Every payment reduces payables and cash.

**Inventory**: Receipts increase stock. Returns reduce stock. All with proper costing.

**Production**: Raw material purchases feed production. Purchase lead times affect production scheduling.

**Quality**: Inspection requirements affect receiving process and supplier relationships.

**Budget**: Purchase requisitions can check budget availability before allowing orders.

## Next Steps

Now understand the purchasing journey. Continue to:
- [The Sales Journey](./sales-journey.md) - The mirror process of selling
- [Quality Control](./quality-control.md) - How inspection fits into receiving
- [Specialized Scenarios](./specialized-scenarios.md) - Industry-specific variations

Or go back to understand the foundation:
- [Understanding Items](./understanding-items.md) - What you're buying
- [Receiving Stock](./receiving-stock.md) - Detailed receipt processes
