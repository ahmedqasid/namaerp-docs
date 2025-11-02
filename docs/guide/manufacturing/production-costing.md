# Production Costing and Order Closing

## Overview

Production costing in Nama ERP provides comprehensive tracking and analysis of manufacturing costs. The system captures actual costs throughout production and compares them to standard costs, generating variance reports and finalizing order costs through the Order Close Voucher.

This document covers:
- Manufacturing cost components
- Overhead allocation
- Cost calculation methods
- Order closing process
- Variance analysis
- Cost per batch/lot tracking

## Manufacturing Cost Components

### Direct Costs

Direct costs can be traced directly to specific production orders:

#### 1. Material Costs
**Tracked Through**: Raw Material Issue documents

**Components**:
- Raw materials consumed
- Component parts
- Purchased sub-assemblies
- Packaging materials

**Cost Sources**:
- Actual inventory cost (FIFO, Average, or Standard)
- Purchase price
- Landed costs (freight, customs, etc.)

#### 2. Labor Costs
**Tracked Through**: Resource Voucher documents (auto-generated from Production Execution)

**Components**:
- Direct labor hours
- Employee wages/salaries
- Shift premiums
- Overtime costs

**Cost Sources**:
- Resource hourly rates
- Employee cost centers
- Actual time recorded

#### 3. Machine Costs
**Tracked Through**: Resource Voucher documents

**Components**:
- Machine hours
- Equipment usage
- Tooling and mold usage

**Cost Sources**:
- Machine hourly rates
- Fixed asset depreciation
- Maintenance costs

### Indirect Costs (Overheads)

Indirect costs cannot be traced to specific orders and must be allocated:

#### Manufacturing Overheads Include:
- **Facility Costs**: Rent, utilities, property taxes
- **Indirect Labor**: Supervisors, inspectors, material handlers, maintenance staff
- **Equipment**: Depreciation, maintenance, repairs
- **Supplies**: Lubricants, cleaning materials, small tools
- **Quality Control**: Testing, inspection costs
- **Other**: Insurance, security, waste disposal

## Overhead Types

### Overhead Type Entity

**Entity**: `OverheadType`
**Arabic**: التكاليف الغير مباشرة
**English**: Overhead Type
**Classification**: Master File

An Overhead Type defines a template for allocating indirect costs to production orders.

### Overhead Type Structure

**Header**:
- **Code and Name**: Identifier and description
- **Active Status**: Whether this overhead type is currently in use

**Detail Lines** (`OverheadTypeLine`):
Each line represents one overhead cost element:

- **Name**: Overhead element name (e.g., "Factory Utilities", "Indirect Labor")
- **Calculation Type**: How overhead is calculated
  - **Fixed Amount**: Flat cost per order
  - **Percentage**: Percentage of another cost base
  - **Rate**: Amount per unit of allocation base
- **Element Value**: Base value for calculation (percentage, rate, or fixed amount)
- **Allocation Base**: What to multiply the rate by
  - Per unit produced
  - Per production hour
  - Percentage of material cost
  - Percentage of labor cost
  - Fixed per order
- **Accounting Configuration**:
  - **Debit Account**: GL account to debit
  - **Credit Account**: GL account to credit
  - **Dimensions**: Cost centers, departments, etc.

### Overhead Calculation Examples

#### Example 1: Fixed Overhead per Order
```
Name: "Production Setup Cost"
Calculation Type: Fixed
Element Value: 500
Allocation: Per Order

Result: Every production order gets $500 overhead
```

#### Example 2: Percentage of Material Cost
```
Name: "Material Handling"
Calculation Type: Percentage
Element Value: 5%
Allocation: Material Cost Base

If Material Cost = $10,000
Overhead = $10,000 × 5% = $500
```

#### Example 3: Rate per Production Hour
```
Name: "Factory Utilities"
Calculation Type: Rate
Element Value: 25 per hour
Allocation: Production Hours

If Production Hours = 40
Overhead = 40 × $25 = $1,000
```

#### Example 4: Percentage of Labor Cost
```
Name: "Labor Benefits & Taxes"
Calculation Type: Percentage
Element Value: 30%
Allocation: Labor Cost Base

If Labor Cost = $2,000
Overhead = $2,000 × 30% = $600
```

## Actual Overhead Calculator

### Purpose

The **Actual Overhead Calculator** (طريقة حساب فعلي للمصاريف الغير مباشرة) determines actual overhead costs from accounting transactions, rather than using predetermined rates.

**Entity**: `ActualOverheadCalculator`
**Classification**: Master File

### How It Works

Instead of applying fixed overhead rates, the system:
1. Queries actual general ledger transactions
2. Filters by account, subsidiary, dimensions, date range
3. Calculates total actual overhead costs
4. Allocates to production orders

### Structure

**Header**:
- **Name**: Calculator description
- **Overhead Type**: Which overhead type this calculator populates
- **Must Determine Overhead Type in Details**: Validation flag

**Detail Lines** (`ActualOverheadCalculatorLine`):

Each line maps accounting data to an overhead element:

- **Name**: Overhead element name (must match OverheadType line name)
- **Overhead Type**: Reference to overhead type
- **Data Source**: Choose one method:
  - **Account + Subsidiary + Dimensions**: Specific account criteria
  - **Accounts Chart**: All accounts in a chart of accounts
  - **Query**: Custom SQL query for complex filtering
- **Account**: Specific GL account
- **Subsidiary**: Subsidiary account filter
- **Entity Dimension**: Dimension filter (department, branch, etc.)
- **Dimensions**: Additional dimension filters
- **Accounts Chart**: Chart of accounts to aggregate
- **Query**: Custom SQL for overhead calculation

### Validation Rules

1. Each line must have an overhead type (if header flag is set)
2. Overhead name must exist in the overhead type
3. Cannot mix account criteria with accounts chart
4. Cannot use both query and account criteria

### Usage Scenario

**Setup**:
```
Overhead Type: "Standard Factory Overhead"
  - Line 1: "Utilities" (5% of material cost)
  - Line 2: "Maintenance" (10% of machine hours)

Actual Overhead Calculator: "January 2024 Actual"
  - Line 1: Name="Utilities", Account=5400 (Utilities Expense)
    → Query GL account 5400 for January 2024
    → Total = $12,500
  - Line 2: Name="Maintenance", Account=5300 (Repairs & Maintenance)
    → Query GL account 5300 for January 2024
    → Total = $8,200
```

**When closing production orders**:
- Instead of applying 5% and 10% rates
- System uses actual $12,500 and $8,200
- Allocates proportionally to orders closed in that period

## Order Close Voucher

### Overview

**Entity**: `OrderCloseVoucher`
**Arabic**: إغلاق أمر إنتاج
**English**: Order Close Voucher
**Menu**: Manufacturing > Documents > Order Close

The Order Close Voucher finalizes a production order by:
1. Calculating total actual costs
2. Allocating overhead costs
3. Computing cost variances
4. Updating inventory values
5. Generating accounting entries
6. Changing order status to Closed or Terminated

### When to Close Production Orders

Close production orders when:
- ✅ All finished goods have been delivered to inventory
- ✅ All material issues are complete
- ✅ All production executions are recorded
- ✅ No more work will be performed on the order
- ✅ Ready to finalize costs and lock the order

### Order Close Voucher Structure

#### Header Fields

**Production Order Reference**:
- **Production Order** (productionOrder): Which order to close
- **Closing Date** (closingDate): Date of closure
- **Close Type** (closeType): Normal close or terminate

**Overhead Configuration**:
- **Overhead** (overhead): Overhead type to apply
- **Actual Prod Overhead** (actualProdOverhead): Reference to actual overhead calculator
- **Currency** (currency): Costing currency

**Cost Summary Fields** (System Calculated):
- **Product Unit Standard Cost** (productUnitStandardCost): تكلفة الوحدة القياسية
- **Standard Product Total Cost** (standardProductTotalCost): إجمالي التكلفة القياسية
- **Actual Product Cost** (actualProductCost): تكلفة المنتج الفعلية
- **Actual Product Total Cost** (actualProductTotalCost): إجمالي تكلفة المنتج الفعلية
- **Product Qty Deviation** (productQtyDeviation): انحراف كمية المنتج
- **Total Product Cost Deviation** (totalProductCostDeviation): انحراف تكلفة المنتج القياسية
- **Total Product Standard Deviation** (totalProductStandardDeviation): إجمالي الإنحراف القياسي للمنتج
- **Standard Cost Deviation** (standardCostDeviation): انحراف تكلفة الوحدة

#### Detail Collections

##### 1. Overhead Lines (details)
**Collection**: `details`
**Table**: `OrderCloseLine`

Generated from Overhead Type, one line per overhead element:

- **Name**: Overhead element name
- **Lot ID** (lotId): For cost-per-batch scenarios
- **Element Value**: Overhead rate or percentage
- **Overhead Value** (overheadValue): Calculated overhead amount
- **Overhead Calculation Type**: Fixed, percentage, or rate
- **Value**: Actual overhead value applied
- **Script Statement**: Formula for calculation
- **Dimensions**: Cost center allocation
- **Debit Side / Credit Side**: Accounting accounts

##### 2. Material Deviation Lines
**Collection**: `materialDeviationLines`
**Table**: `OrderCloseMaterialDeviationLine`

Variance analysis for each component:

- **Material**: Item that was consumed
- **Standard Quantity**: Expected quantity from BOM
- **Actual Quantity**: Actual quantity issued
- **Quantity Variance**: Difference
- **Standard Cost**: Expected cost per unit
- **Actual Cost**: Actual cost per unit
- **Cost Variance**: Price variance
- **Total Variance**: Total material variance

##### 3. Resource Deviation Lines
**Collection**: `resourceDeviationLines`
**Table**: `OrderCloseResourceDeviationLine`

Variance analysis for labor and machines:

- **Resource**: Labor or machine
- **Standard Hours**: Expected hours from routing
- **Actual Hours**: Actual hours from execution
- **Hours Variance**: Efficiency variance
- **Standard Rate**: Expected cost per hour
- **Actual Rate**: Actual cost per hour
- **Rate Variance**: Price variance
- **Total Variance**: Total resource variance

### Close Types

#### Normal Close
**Value**: `OrderCloseType.NormalClose`

**Purpose**: Standard production completion

**Requirements**:
- All quantities must be in the final operation (no pending work-in-process)
- Production order status changes to **Closed**
- Costs are finalized and locked

**Validation**:
- System checks Production System Entry
- Ensures no quantities remain in intermediate operations
- Last operation must have all quantities in "ToMove" status

#### Terminate
**Value**: `OrderCloseType.Terminate`

**Purpose**: Cancel production without completion

**Use Cases**:
- Order obsolete due to design change
- Material quality issues prevent completion
- Customer cancellation
- Engineering changes

**Effect**:
- Production order status changes to **Terminated**
- Work-in-process is written off
- Costs are allocated to scrap or variance accounts

### Cost Calculation Process

When an Order Close Voucher is committed, the system performs these steps:

#### Step 1: Collect Actual Costs

System queries all documents related to the production order:

**Material Costs**:
```
Query: Raw Material Issue documents
Where: productionOrder = this order
Sum: All material costs
```

**Resource Costs**:
```
Query: Resource Voucher documents
Where: productionOrder = this order
Sum: Labor + machine costs
```

**Mold Costs**:
```
Query: MFG Mold Voucher documents
Where: productionOrder = this order
Sum: Tooling costs
```

**Delivery Costs**:
```
Query: Product Delivery documents
Where: productionOrder = this order
Sum: Finished goods value
```

**Return Costs**:
```
Query: Material Return documents
Where: productionOrder = this order
Sum: Returned materials
```

**Scrap Costs**:
```
Query: Production Execution documents
Where: productionOrder = this order AND toStep = Scrap
Sum: Scrapped value
```

#### Step 2: Apply Overhead

**If using standard overhead rates**:
- Apply overhead type rates
- Calculate based on allocation bases
- Multiply by appropriate drivers

**If using actual overhead calculator**:
- Query actual GL transactions
- Fetch overhead amounts by element
- Allocate proportionally to production orders

**For cost-per-batch scenarios**:
- Separate overhead calculation per lot
- Each lot/batch gets its own overhead allocation
- Useful for pharmaceutical, food, and chemical industries

#### Step 3: Update Production Order Cost Fields

System updates these fields on the Production Order:

- **Material Issue Cost** (materialIssueCost)
- **Material Return Cost** (materialReturnCost)
- **Resources Cost** (resourcesCost)
- **Molds Cost** (moldsCost)
- **Scrap Cost** (scrapCost)
- **Delivered By Prod Cost** (deliveredByProdCost)
- **Returned By Prod Cost** (returnedByProdCost)

#### Step 4: Calculate Variances (if enabled)

**Material Variances**:
```
For each component:
  Quantity Variance = (Actual Qty - Standard Qty) × Standard Price
  Price Variance = (Actual Price - Standard Price) × Actual Qty
  Total Variance = Quantity Variance + Price Variance
```

**Resource Variances**:
```
For each resource:
  Efficiency Variance = (Actual Hours - Standard Hours) × Standard Rate
  Rate Variance = (Actual Rate - Standard Rate) × Actual Hours
  Total Variance = Efficiency Variance + Rate Variance
```

**Product Quantity Variance**:
```
Expected Output = Order Quantity
Actual Output = Sum of delivered quantities
Quantity Deviation = Actual - Expected
```

**Product Cost Variance**:
```
Standard Total Cost = Standard Unit Cost × Order Quantity
Actual Total Cost = Material + Labor + Machine + Overhead
Total Deviation = Actual - Standard
Unit Cost Deviation = Total Deviation / Actual Quantity
```

#### Step 5: Re-commit Deliveries

System re-calculates and updates Product Delivery documents:
- Updates finished goods inventory value
- Applies actual costs to delivered quantities
- Adjusts co-product valuations
- Updates GL inventory accounts

#### Step 6: Generate Accounting Entries

Creates journal entries for:
- Overhead allocation (debit WIP, credit overhead accounts)
- Cost variances (favorable/unfavorable)
- Work-in-process to finished goods transfer
- Scrap write-offs (if terminated)

#### Step 7: Update Order Status

- Normal Close → Status = **Closed**
- Terminate → Status = **Terminated**
- If order was created from Production Order Request, updates request status to **Finished**

### Cost Per Batch/Lot

**Configuration**: Set in Production Order Term Config

**Purpose**: Track costs separately for each lot/batch produced

**When to Use**:
- Pharmaceutical manufacturing (batch validation)
- Food production (lot traceability)
- Chemical processing (batch yields vary)
- Any industry requiring lot-specific costing

**How It Works**:
1. Production Deliveries assign lot numbers
2. Order Close Voucher creates separate cost calculations per lot
3. Each lot gets its own:
   - Material costs
   - Resource costs
   - Overhead allocation
   - Finished goods value
4. Overhead lines are duplicated per lot
5. Variance analysis per lot

**Example**:
```
Production Order: PO-001
  Lot A: 100 units delivered
  Lot B: 95 units delivered

Costs:
  Material: $10,000 total
  Labor: $3,000 total
  Overhead: $2,000 total

Cost Per Batch Allocation:
  Lot A: (100/195) × $15,000 = $7,692
  Lot B: (95/195) × $15,000 = $7,308

Lot A Unit Cost: $7,692 / 100 = $76.92
Lot B Unit Cost: $7,308 / 95 = $76.93
```

## Overhead Allocation Methods

### Method 1: Fixed Overhead per Order

**Setup**:
```
Overhead Type: "Factory Overhead"
  Line: "Production Overhead"
    Element Value: 1000
    Calculation Type: Fixed
```

**Result**: Every order gets $1,000 overhead regardless of size

### Method 2: Percentage of Material Cost

**Setup**:
```
Overhead Type: "Material Handling Overhead"
  Line: "Material Overhead"
    Element Value: 10% (0.10)
    Calculation Type: Percentage
    Base: Material Cost
```

**Example**:
```
Material Cost: $25,000
Overhead: $25,000 × 10% = $2,500
```

### Method 3: Percentage of Labor Cost

**Setup**:
```
Overhead Type: "Labor Burden"
  Line: "Benefits & Taxes"
    Element Value: 35%
    Calculation Type: Percentage
    Base: Labor Cost
```

**Example**:
```
Labor Cost: $8,000
Overhead: $8,000 × 35% = $2,800
```

### Method 4: Rate per Production Hour

**Setup**:
```
Overhead Type: "Machine Overhead"
  Line: "Equipment Overhead"
    Element Value: 50 per hour
    Calculation Type: Rate
    Base: Production Hours
```

**Example**:
```
Production Hours: 80
Overhead: 80 × $50 = $4,000
```

### Method 5: Rate per Unit Produced

**Setup**:
```
Overhead Type: "Quality Overhead"
  Line: "Inspection Cost"
    Element Value: 2.50 per unit
    Calculation Type: Rate
    Base: Units Produced
```

**Example**:
```
Units Produced: 500
Overhead: 500 × $2.50 = $1,250
```

### Method 6: Actual Overhead Calculation

**Setup**:
```
Actual Overhead Calculator: "Monthly Overhead"
  Line 1: "Factory Utilities"
    Account: 5400
    Query actual expenses for the month

  Line 2: "Indirect Labor"
    Account: 5200
    Query actual expenses for the month

  Line 3: "Maintenance"
    Accounts Chart: "Manufacturing Expenses"
    Sum all accounts in chart
```

**Result**:
```
January 2024 Actual Costs:
  Utilities: $15,200
  Indirect Labor: $28,500
  Maintenance: $7,800
  Total Overhead: $51,500

Allocation to orders closed in January:
  Order A (200 units): $51,500 × (200/1000) = $10,300
  Order B (500 units): $51,500 × (500/1000) = $25,750
  Order C (300 units): $51,500 × (300/1000) = $15,450
```

## Variance Analysis

### Material Variances

#### Quantity Variance
**Formula**: (Actual Qty - Standard Qty) × Standard Price

**Causes**:
- Yield losses
- Scrap
- Waste
- Rework
- Theft or spoilage

**Example**:
```
Standard: 100 kg @ $10/kg = $1,000
Actual: 110 kg @ $10/kg = $1,100
Quantity Variance: (110 - 100) × $10 = $100 Unfavorable
```

#### Price Variance
**Formula**: (Actual Price - Standard Price) × Actual Qty

**Causes**:
- Market price changes
- Supplier changes
- Purchase discounts/premiums
- Exchange rate fluctuations

**Example**:
```
Standard: 100 kg @ $10/kg = $1,000
Actual: 100 kg @ $11/kg = $1,100
Price Variance: ($11 - $10) × 100 = $100 Unfavorable
```

### Resource Variances

#### Efficiency Variance
**Formula**: (Actual Hours - Standard Hours) × Standard Rate

**Causes**:
- Worker skill level
- Equipment performance
- Learning curve
- Process improvements or issues

**Example**:
```
Standard: 40 hours @ $25/hour = $1,000
Actual: 45 hours @ $25/hour = $1,125
Efficiency Variance: (45 - 40) × $25 = $125 Unfavorable
```

#### Rate Variance
**Formula**: (Actual Rate - Standard Rate) × Actual Hours

**Causes**:
- Wage rate changes
- Different skill levels used
- Overtime premiums
- Machine rate changes

**Example**:
```
Standard: 40 hours @ $25/hour = $1,000
Actual: 40 hours @ $28/hour = $1,120
Rate Variance: ($28 - $25) × 40 = $120 Unfavorable
```

### Overhead Variances

#### Volume Variance
**Cause**: Producing more or fewer units than planned

**Example**:
```
Standard: 1,000 units @ $5/unit = $5,000 overhead
Actual: 900 units @ $5/unit = $4,500 expected
Actual Overhead: $5,200
Volume Variance: (900 - 1,000) × $5 = $500 Unfavorable
```

#### Spending Variance
**Cause**: Actual overhead costs differ from budget

**Example**:
```
Budgeted Overhead: $5,000
Actual Overhead: $5,200
Spending Variance: $5,200 - $5,000 = $200 Unfavorable
```

## Configuration

### Production Order Term Configuration

**Cost-Related Settings**:

**Cost Per Batch** (costPerBatch):
- Enable lot-specific costing
- Creates separate cost pools per lot/batch
- Overhead allocated by lot

**Calculate Deviations** (calculateDeviations):
- Enable variance analysis
- Populates material and resource deviation lines
- Compares actual vs. standard

**Overhead** (overhead):
- Default overhead type for orders
- Can be overridden per order

### Order Close Term Configuration

**Overhead** (overhead):
- Default overhead type for closing
- Overrides production order overhead if set

**Do Not Update Accounting Effects With Actual Values**:
- Use standard costs in accounting instead of actual
- Variances posted separately

## Common Workflows

### Standard Order Closing Process

1. **Ensure Order is Complete**:
   - All executions recorded
   - All materials issued
   - All finished goods delivered
   - No pending quantities in operations

2. **Create Order Close Voucher**:
   - Select production order
   - Choose close type (Normal Close)
   - Select overhead type (or use default)
   - Set closing date

3. **Review Overhead Lines**:
   - System auto-generates from overhead type
   - Review calculated amounts
   - Adjust if necessary (manual overrides allowed)

4. **Review Variance Analysis** (if enabled):
   - Check material deviation lines
   - Check resource deviation lines
   - Investigate significant variances

5. **Commit the Voucher**:
   - System calculates final costs
   - Updates production order
   - Generates accounting entries
   - Changes order status to Closed

### Using Actual Overhead Calculator

1. **Create Actual Overhead Calculator**:
   - Define overhead elements
   - Map to GL accounts or use queries
   - Set date filters

2. **Run Calculation**:
   - System queries actual transactions
   - Aggregates costs by element
   - Returns actual overhead values

3. **Apply to Order Close Voucher**:
   - Reference actual overhead calculator in close voucher
   - System uses actual costs instead of rates
   - More accurate costing

4. **Review and Commit**:
   - Verify overhead amounts are reasonable
   - Compare to standard overhead
   - Commit to finalize

### Terminating an Order

1. **Reason for Termination**:
   - Document why order is being cancelled
   - Ensure approvals obtained

2. **Create Order Close Voucher**:
   - Select production order
   - Choose close type: **Terminate**
   - Set closing date

3. **Cost Handling**:
   - System calculates costs incurred to date
   - Work-in-process written off
   - Materials issued are scrapped
   - Costs allocated to variance accounts

4. **Commit**:
   - Order status changes to Terminated
   - Cannot be reopened
   - Production order request status updated

## Accounting Integration

### Generated Journal Entries

When Order Close Voucher is committed:

**Overhead Allocation**:
```
DR: Work in Process (WIP)
CR: Manufacturing Overhead Applied
```

**WIP to Finished Goods**:
```
DR: Finished Goods Inventory
CR: Work in Process (WIP)
```

**Material Variance**:
```
If Unfavorable:
  DR: Material Variance (Expense)
  CR: Work in Process (WIP)

If Favorable:
  DR: Work in Process (WIP)
  CR: Material Variance (Income)
```

**Labor Variance**:
```
If Unfavorable:
  DR: Labor Variance (Expense)
  CR: Work in Process (WIP)

If Favorable:
  DR: Work in Process (WIP)
  CR: Labor Variance (Income)
```

### Accounting Accounts from Overhead Lines

Each overhead line specifies:
- **Debit Side**: Account to debit (usually WIP or finished goods)
- **Credit Side**: Account to credit (overhead control account)
- **Dimensions**: Cost centers, branches, departments for allocation

---

::: tip Costing Accuracy
For most accurate costs, use Actual Overhead Calculator to query real accounting data rather than applying predetermined overhead rates.
:::

::: warning Order Completion
Ensure all production activities are complete before closing an order. Closed orders cannot be modified and costs are locked.
:::

::: info Variance Investigation
Significant variances (>10%) should be investigated to identify process improvements or correct standard cost assumptions.
:::
