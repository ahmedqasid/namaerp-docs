# The Sales Journey

The sales journey is the mirror image of purchasing - instead of bringing items in, you're selling and delivering them to customers. But the principles are similar: Quote → Order → Fulfill → Invoice → Collect. Let's walk through this journey and understand when to use each document.

## The Big Picture

Here's the typical sales process flow:

```
Inquiry → Quotation → Order → Reservation → Picking → Delivery → Invoice → Payment
```

Not every sale follows every step (cash-and-carry skips most of these!), but understanding the complete path helps you design the right process for each type of sale.

## Step 1: Customer Inquiry

Every sale starts with interest. A customer (potential or existing) wants something you offer.

### The Quotation Request

The `SalesQuotationRequest` (طلب عرض أسعار مبيعات) captures customer inquiries:

**Customer**: "We're interested in 100 office chairs. Can you quote us a price?"

**What You Capture:**
- Customer information (who's asking?)
- Items of interest (what do they want?)
- Quantities (how much?)
- Delivery requirements (where and when?)
- Special requirements (customization, warranty, support?)

**Who Creates These:**
- Sales team (after customer call/email)
- Inside sales (from web inquiries)
- Customer service (from support requests that become sales opportunities)
- Sometimes customers directly (through web portal)

**Why Formalize Inquiries?**
- Track potential sales (pipeline visibility)
- Measure quote-to-order conversion rates
- Ensure timely follow-up (don't let inquiries fall through cracks)
- Assign to sales representatives
- Prioritize hot leads

### Preparing the Quotation

Before quoting, sales team needs to know:
- Do we have the items in stock?
- If not in stock, can we get them in time?
- What's our cost? (to ensure profitable pricing)
- Any special considerations for this customer?

The system helps by showing:
- Available inventory
- Lead times for out-of-stock items
- Cost information (so you can price with desired margin)
- Customer history (past purchases, payment behavior, special terms)

## Step 2: The Sales Quotation

The `SalesQuotation` (عرض أسعار مبيعات) is your formal price proposal to the customer.

### What Goes Into It

**Header Information:**
- Quotation number
- Date
- Validity period (quote expires after 30 days, etc.)
- Customer details
- Delivery terms
- Payment terms
- Sales representative

**Line Items:**
- Item descriptions (clear, compelling)
- Quantities
- Unit prices
- Discounts (if any)
- Line totals
- Taxes

**Additional Information:**
- Delivery schedule
- Warranty terms
- Service and support
- Terms and conditions
- Special notes or instructions

**Totals:**
- Subtotal
- Discounts
- Taxes
- Grand total

### Pricing Strategy

The system supports sophisticated pricing:

**Price Lists**: Different prices for different customer segments
- Retail price list
- Wholesale price list
- VIP customer price list
- Promotional pricing

**Automatic Pricing**: Based on cost plus margin
- System calculates cost
- Applies desired margin (configurable per item or customer)
- Suggests price (can be overridden with approval)

**Discount Handling**:
- Item-level discounts (10% off this item)
- Header discounts (5% off entire order)
- Multiple discount layers
- Minimum price enforcement (can't go below floor price)

### Quotation Lifecycle

Once created:
1. **Review**: Sales manager reviews and approves (especially if special pricing)
2. **Send to Customer**: PDF or email
3. **Follow Up**: Track customer response
4. **Outcomes**:
   - **Convert to Order**: Customer accepts!
   - **Revise**: Customer negotiates, you create revised quote
   - **Expire**: Validity period passes, quote is closed
   - **Lost**: Customer goes elsewhere

## Step 3: The Sales Order

Customer accepted your quote! Time to create the official order.

### The Sales Order Document

The `SalesOrder` (أمر بيع) is the formal commitment: "We will sell you these items under these terms."

**Converting from Quotation:**
The easiest way is to convert the accepted quotation to an order. The system:
- Copies all information from quotation
- Links order to quotation (audit trail)
- Changes status from "quote" to "order"
- Initiates fulfillment process

**Creating Directly:**
For existing customers with standard items, you might skip quotation and create orders directly.

**What Makes It Official:**
- Order number (unique identifier)
- Customer signature/acceptance
- Credit approval (if selling on credit)
- Inventory reservation (if configured)
- Fulfillment workflow triggered

### Order Information

Everything from the quotation, plus:

**Fulfillment Details:**
- Requested delivery date
- Delivery address (might be different from billing address)
- Shipping method
- Special delivery instructions

**Inventory Allocation:**
- Which warehouse will fulfill?
- Are items in stock?
- If not, when will they be available?

**Financial Terms:**
- Final prices (might differ from quote if negotiated)
- Payment terms (cash, credit, installments)
- Credit limit check (for credit customers)

### Proforma Orders

The `ProformaSalesInvoice` (فاتورة مبيعات مبدئية) is a halfway point:
- Looks like an invoice
- Acts like a quote
- Used for customer's budget approval, customs, or advance payment

Once customer pays or approves, convert to actual order.

## Step 4: Reservation and Allocation

Order confirmed. Now ensure you can fulfill it.

### Stock Reservation

If configured, the system automatically reserves stock:
- 100 office chairs reserved for Order #12345
- These chairs remain in warehouse
- But they're flagged "not available for other sales"
- Prevents overselling

**Reservation Benefits:**
- Guarantee you can fulfill (no "sorry, we just sold out")
- Warehouse knows what's committed vs. truly available
- Can promise delivery with confidence

**When to Reserve:**
- At order entry (most common)
- At order approval (after management review)
- Only when customer confirms (for tentative orders)
- Not at all (for make-to-order businesses)

### Allocation Strategy

If you have multiple warehouses, which one fulfills this order?

**Options:**
- **Closest to customer**: Minimizes shipping time and cost
- **Where inventory is**: Fulfill from warehouse with stock
- **Dedicated fulfillment center**: All orders ship from central location
- **Load balancing**: Distribute orders to balance warehouse workload

The system can automatically suggest or require manual selection.

## Step 5: Picking and Preparation

Order confirmed, stock reserved. Time to physically prepare the shipment.

### The Pick List

The `pickLines` collection (or separate picking list document) tells warehouse:
- What items to pick
- From which locations
- In what sequence (optimized path through warehouse)
- Special handling notes

**Pick List Information:**
- Order number
- Customer name (so packer knows who it's for)
- Each item to pick:
  - Item code and description
  - Quantity to pick
  - Location (Aisle C, Shelf 4, Bin 12)
  - Serial numbers (if applicable)
- Packing notes
- Shipping method

**The Picking Process:**
1. Warehouse receives pick list
2. Picker collects items from locations
3. Marks each item picked
4. Brings to packing station
5. Confirms all items picked

**Partial Picks:**
Sometimes not everything is available:
- Pick what you have
- Note what's short
- Create backorder for remaining items
- Contact customer about partial shipment

### Packing and Loading

After picking:
1. Verify items are correct
2. Pack appropriately
3. Create shipping label
4. Record package weight/dimensions
5. Create `LoadingDocument` (staging for shipment)
6. Load onto delivery vehicle
7. Create `DeliveryDocument` (handoff to customer)

## Step 6: The Sales Invoice

Time to bill the customer!

### The Sales Invoice Document

The `SalesInvoice` (فاتورة مبيعات) is both:
- The bill (customer owes you money)
- The inventory transaction (items leave your stock)

**Key Information:**

**Header:**
- Invoice number
- Date
- Customer details
- Billing address
- Shipping address
- Sales representative
- Order reference
- Payment terms

**Lines:**
- Item descriptions
- Quantities sold
- Unit prices
- Discounts
- Taxes
- Line totals

**Financial Summary:**
- Subtotal
- Discounts
- Shipping charges
- Taxes (VAT, sales tax, etc.)
- Grand total

**Payment Details:**
- Due date
- Payment method
- Bank account details
- Early payment discounts

### What the System Does

When you save the sales invoice (not as draft):

**Inventory Transaction:**
Automatically creates `SalesInvoiceIssue` documents that:
- Reduce inventory quantities
- Remove items from warehouse locations
- Track which serial numbers/batches were sold
- Record cost of goods sold

**Accounting Entries:**
- Debit: Accounts Receivable (or Cash if immediate payment)
- Credit: Sales Revenue
- Credit: Tax Output Account
- Debit: Cost of Goods Sold
- Credit: Inventory

**Customer Account:**
- Increases customer balance (what they owe you)
- Updates credit limit utilization
- Creates payment due date

### Tax Authority Integration

For countries with electronic tax reporting (e-invoicing):
- System generates tax-compliant invoice format
- Submits to tax authority system
- Receives unique tax ID
- Stores in `taxAuthoritySysFields`
- QR code generated for invoice
- Customer can verify invoice authenticity

## Step 7: Delivery and Confirmation

Physically getting items to customer.

### Delivery Methods

**Self-Pickup:**
- Customer collects from your location
- Verify identity
- Hand over goods
- Get signature
- Close delivery

**Your Delivery:**
- Load items on your vehicle
- Driver delivers to customer location
- Get customer signature
- Photograph delivery (optional)
- Update delivery status

**Third-Party Shipping:**
- Hand off to shipping company
- Provide tracking number
- Customer tracks shipment
- Confirm delivery when received

### Delivery Documentation

The `DeliveryDocument` (مستند تسليم) records:
- What was delivered
- When it was delivered
- Where it was delivered
- Who received it (signature)
- Condition at delivery (any issues?)
- Driver and vehicle details

This is your proof of delivery - critical if customer later claims non-delivery.

## Step 8: Payment Collection

The final step: collecting what you're owed.

### Payment Methods

**Cash Sales:**
Payment happens immediately at invoice time:
- Customer pays
- Record payment
- Invoice is closed
- No receivable created (or created and immediately cleared)

**Credit Sales:**
Payment happens later per terms:
- Invoice creates receivable
- Due date based on terms (Net 30, Net 60, etc.)
- System tracks aging
- Alerts as due date approaches
- Records payment when received

**Installment Sales:**
The `scheduleLines` collection breaks payment into installments:
- First payment: $5,000 due at delivery
- Second payment: $5,000 due after 30 days
- Third payment: $5,000 due after 60 days

System tracks each installment separately.

### Payment Recording

The `paymentLines` collection records payments:
- Date received
- Amount
- Method (cash, check, bank transfer, credit card)
- Reference number
- Bank details

System automatically:
- Reduces customer balance
- Updates aging
- Closes invoice if fully paid
- Creates accounting entries

## Handling Returns and Exchanges

Sometimes sales don't stick. Customers return or exchange items.

### The Sales Return

Use `SalesReturnRequest` (طلب مرتجع مبيعات) when customer wants to return:

**Common Reasons:**
- Defective item
- Wrong item shipped
- Customer changed mind (within return period)
- Damaged in shipping
- Doesn't meet expectations

**The Return Process:**
1. **Request**: Customer contacts you
2. **Authorization**: Sales/customer service reviews and approves
3. **RMA Number**: Issue return authorization number
4. **Return**: Customer ships back (or you collect)
5. **Inspection**: Verify item condition
6. **Outcome**:
   - **Accept**: Process refund/credit
   - **Reject**: Item damaged by customer, no refund
   - **Partial Credit**: Restocking fee or condition issues

**Accounting Impact:**
Return creates:
- Debit: Sales Returns (contra-revenue account)
- Debit: Inventory (goods back in stock)
- Debit: Tax Payable (reverse tax)
- Credit: Accounts Receivable (customer owes less)

### The Sales Replacement

The `SalesReplacement` (استبدال مبيعات) handles exchanges:

**Example**: Customer bought size Medium shirt, wants size Large instead.

The system:
- Returns the Medium (credit)
- Issues the Large (new sale)
- Handles price difference (if sizes cost different)
- One smooth transaction

**Use For:**
- Size/color exchanges
- Warranty replacements
- Upgrades (customer wants better version)
- Downgrades (customer wants cheaper version)

## Sales Forecasting and Planning

### The Sales Forecast

The `SalesForecast` (توقعات مبيعات) helps plan future sales:

**Based On:**
- Historical sales patterns
- Seasonal trends
- Marketing campaigns
- Sales pipeline (open quotations and orders)
- Market intelligence

**Used For:**
- Inventory planning (buy enough, not too much)
- Production scheduling (make-to-forecast)
- Cash flow projections
- Sales team targets
- Management planning

Forecasting shifts from reactive to proactive selling.

## Special Sales Scenarios

### Cash and Carry (POS)

For retail, the process is much simpler:
1. Customer comes to store
2. Selects items
3. You ring up sale (invoice created)
4. Customer pays immediately
5. Customer takes items

All happens in minutes with `NamaPOSSalesInvoice` or similar POS documents. More on this in [Specialized Scenarios](./specialized-scenarios.md).

### Export Sales

International sales add complexity:
- Customs documentation
- Export licenses
- Shipping documentation
- Currency exchange
- International payment terms (letters of credit, etc.)

### Project Sales

Large project sales span months:
- Initial quotation for entire project
- Multiple orders as project progresses
- Delivery in phases
- Payment milestones
- Long-term customer relationship

## Tips for Effective Sales Management

::: tip Best Practices

**Quote Quickly**
Customers are impatient. Respond to inquiries within hours if possible, not days. Fast response rates correlate with higher conversion rates.

**Follow Up Systematically**
Don't let quotes die silently. Follow up: after 3 days, after 1 week, before expiration. Track why you win and why you lose.

**Reserve Stock Wisely**
Reserve for confirmed orders, not for tentative inquiries. Tying up stock for "maybes" prevents selling to "yeses."

**Pick Accurately**
Wrong items shipped cost you: return shipping, restocking, customer frustration, relationship damage. Double-check picks.

**Invoice Promptly**
The faster you invoice, the faster you get paid. Don't delay invoicing waiting for "all deliveries to complete" - invoice what's delivered.

**Flexible Payment Terms**
Different customers need different terms. Cash-strapped small business might need Net 60. Large corporate might demand Net 90. Build relationships by accommodating.

**Track Returns**
High return rates for an item signal quality problems. High returns from a customer signal training needs or fit issues. Analyze patterns.

**Maintain Stock for Fast-Movers**
Your best-selling items should never stock out. Forecast accurately, monitor closely, reorder early.

:::

## Common Questions

**Q: Can we invoice before delivery?**

A: Yes - it's called advance invoicing. Common for: custom orders (pay before we make it), large orders (deposit required), or high-credit-risk customers. System can handle invoicing before stock issue.

**Q: What if customer wants partial delivery?**

A: Create multiple invoices against one order. Invoice and deliver what's available now, invoice and deliver the rest later. System tracks what's fulfilled vs. outstanding.

**Q: How do we handle customer discounts?**

A: Multiple ways:
- Price list with discounted prices for that customer
- Line-item discounts on invoice
- Header discount (5% off entire order)
- Payment discount (2% off if paid within 10 days)

**Q: Can we change prices after creating an order?**

A: Depends on your controls. Some organizations lock prices at order confirmation. Others allow adjustment until invoice. Configure based on your business practices.

**Q: What happens if we can't fulfill an order?**

A: Options:
- Create backorder (fulfill when stock arrives)
- Offer substitute item
- Cancel and refund
- Partial fulfill (ship what you have)
Best practice: Communicate immediately with customer to decide together.

## Integration Points

Sales connects to:

**Accounting**: Every invoice creates receivables and revenue. Every payment reduces receivables and increases cash.

**Inventory**: Sales reduce stock. Returns increase stock. Reservations tie up stock.

**CRM**: Quotations feed sales pipeline. Customer interactions inform future sales. Service issues trigger returns or exchanges.

**Manufacturing**: Sales orders can trigger production orders (make-to-order). Sales forecasts drive production planning (make-to-stock).

**Shipping**: Delivery documents integrate with carriers for tracking and proof of delivery.

## Next Steps

Now you understand the complete sales journey. Explore related topics:
- [The Purchasing Journey](./purchasing-journey.md) - The mirror process
- [Quality Control](./quality-control.md) - Ensuring quality before delivery
- [Specialized Scenarios](./specialized-scenarios.md) - Industry-specific variations

Or revisit foundations:
- [Understanding Items](./understanding-items.md) - What you're selling
- [Issuing Stock](./issuing-stock.md) - How items leave your warehouse
