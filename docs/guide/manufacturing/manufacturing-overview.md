# Manufacturing Module Overview

## Introduction

The Manufacturing module in Nama ERP is a comprehensive production planning and execution system designed to manage the entire manufacturing lifecycle. This module enables businesses to efficiently plan production, track work-in-process inventory, consume raw materials, record production activities, and deliver finished goods.

Manufacturing is the process of converting raw materials into finished products through a series of operations. Modern manufacturing systems must handle complex scenarios including:

- Multi-level Bills of Materials (BOM)
- Routing and operation sequencing
- Resource allocation and capacity planning
- Work-in-process tracking
- Quality control integration
- Cost accounting for production activities

Nama ERP's Manufacturing module provides enterprise-level capabilities to manage these requirements effectively.

## Core Manufacturing Concepts

### 1. Bill of Materials (BOM)

A **Bill of Materials** (مكونات منتج) is a structured list of all raw materials, components, and sub-assemblies required to manufacture a finished product. The BOM defines:

- **Parent Item**: The finished product being manufactured
- **Component Items**: Raw materials and sub-assemblies required
- **Quantities**: How much of each component is needed
- **Yield and Scrap**: Expected losses during production
- **Component Classification**: Material types and usage patterns

In Nama ERP, BOMs support:
- Multi-level structures (assemblies containing sub-assemblies)
- Alternative materials and substitutions
- Date-effective BOMs
- Revision control
- Co-products and by-products

### 2. Routing

A **Routing** (عملية تشغيل) defines the sequence of manufacturing operations required to produce an item. Each routing specifies:

- **Operations**: Sequential steps in the production process
- **Work Centers**: Where each operation is performed
- **Resources**: Labor, machines, and tools required
- **Standard Times**: Setup time, run time, and operation duration
- **Quality Control**: Inspection points and quality checklists

Routings enable:
- Operation sequencing and scheduling
- Capacity planning
- Cost estimation
- Production tracking by operation

### 3. Standard Operations

**Standard Operations** (عملية قياسية) are predefined manufacturing tasks that can be reused across multiple routings. They define:

- Operation description and instructions
- Standard resource requirements
- Quality control procedures
- Default time estimates

This promotes consistency and reduces setup time when creating routings.

### 4. Work Centers

**Work Centers** (صالة إنتاج) represent physical or logical production areas where manufacturing operations are performed. Work centers define:

- Production capacity
- Available resources
- Cost centers for accounting
- Operating calendars and shifts

Work centers are essential for:
- Capacity planning
- Production scheduling
- Cost allocation
- Performance tracking

### 5. Production Orders

A **Production Order** (أمر إنتاج) is a formal authorization to manufacture a specific quantity of an item. It contains:

- **Finished Product**: Item to be manufactured
- **Quantity**: Amount to produce
- **BOM**: Components to consume
- **Routing**: Operations to perform
- **Schedule**: Start and completion dates
- **Status**: Initial, In Progress, Completed, Closed

Production orders drive the entire manufacturing execution process.

### 6. Production Execution

**Production Execution** (تنفيذ إنتاج) records actual manufacturing activities as they occur on the shop floor. It tracks:

- **Quantity Movement**: Items moving between operations
- **Operation Progress**: Work performed at each step
- **Time Tracking**: Labor and machine hours consumed
- **Material Consumption**: Raw materials issued to production
- **Quality Results**: Accepted, rejected, and scrap quantities

Production execution provides real-time visibility into work-in-process.

### 7. Material Issues and Deliveries

Manufacturing involves inventory movements:

- **Raw Material Issue** (صرف مواد خام): Withdrawing components from inventory for production
- **Product Delivery** (تسليم منتج): Receiving finished goods into inventory

These transactions integrate with inventory management and cost accounting.

### 8. Manufacturing Overheads

**Manufacturing Overheads** (التكاليف الغير مباشرة) are indirect costs that cannot be directly traced to specific products but must be allocated to production. These include:

- **Facility Costs**: Rent, utilities, maintenance
- **Indirect Labor**: Supervisors, quality inspectors, material handlers
- **Depreciation**: Manufacturing equipment and facilities
- **Supplies**: Cleaning materials, lubricants, consumables
- **Other Costs**: Insurance, taxes, indirect materials

#### Overhead Types

An **Overhead Type** (التكاليف الغير مباشرة) defines a template for allocating indirect costs to production orders. It contains:

- **Overhead Elements**: Named cost components (e.g., "Factory Rent", "Utilities", "Indirect Labor")
- **Calculation Methods**: Fixed amount, percentage, or quantity-based
- **Allocation Bases**: How costs are distributed (per unit, per batch, per hour)
- **Accounting Accounts**: GL accounts for cost allocation

#### Actual Overhead Calculator

The **Actual Overhead Calculator** (طريقة حساب فعلي للمصاريف الغير مباشرة) determines actual overhead costs from accounting data:

- **Automated Calculation**: Query actual expenses from GL accounts
- **Criteria-Based**: Filter transactions by date, account, subsidiary, dimensions
- **Overhead Mapping**: Match accounting data to overhead elements
- **Actual vs. Standard**: Compare actual costs to standard overhead rates

### 9. Production Order Closing

**Order Close Voucher** (إغلاق أمر إنتاج) finalizes a production order and performs cost accounting:

- **Cost Calculation**: Compute total actual production costs
- **Overhead Allocation**: Apply indirect costs to the order
- **Variance Analysis**: Compare actual vs. standard costs
- **Inventory Valuation**: Update finished goods cost
- **Order Completion**: Change order status to Closed or Terminated
- **Accounting Effects**: Generate journal entries for cost variances

Closing types:
- **Normal Close**: Production completed successfully
- **Terminate**: Cancel order without completion

## Manufacturing Process Flow

The typical manufacturing lifecycle in Nama ERP follows these stages:

```
1. Master Data Setup
   ├─ Create Items (raw materials, components, finished goods)
   ├─ Define BOMs (component structures)
   ├─ Create Routings (operation sequences)
   └─ Setup Work Centers (production areas)

2. Production Planning
   ├─ Generate Production Orders (from MRP or manual)
   ├─ Review component requirements
   ├─ Check capacity and resources
   └─ Schedule production dates

3. Material Preparation
   ├─ Reserve components
   ├─ Issue raw materials to shop floor
   └─ Stage components at work centers

4. Production Execution
   ├─ Start production order
   ├─ Record work at each operation
   ├─ Track quantities and time
   ├─ Handle scrap and rework
   └─ Perform quality inspections

5. Completion and Delivery
   ├─ Complete final operation
   ├─ Deliver finished products to inventory
   ├─ Handle co-products and by-products
   └─ Close production order

6. Costing and Analysis
   ├─ Calculate actual production costs
   ├─ Allocate manufacturing overheads
   ├─ Compare actual vs. standard costs
   ├─ Analyze material and resource variances
   ├─ Close production order
   └─ Update inventory values
```

## Nama ERP Manufacturing Architecture

### Entity Classification

Nama ERP organizes manufacturing entities into two categories:

#### Master Files (البطاقات)
- **BOM** (مكونات منتج) - Bill of Materials definitions
- **Routing** (عملية تشغيل) - Operation sequences
- **StandardOperation** (عملية قياسية) - Reusable operation templates
- **WorkCenter** (صالة إنتاج) - Production areas
- **OverheadType** (التكاليف الغير مباشرة) - Overhead cost templates
- **ActualOverheadCalculator** (طريقة حساب فعلي للمصاريف الغير مباشرة) - Actual overhead calculation methods

Master files are reference data that define how products are manufactured.

#### Document Files (المستندات)
- **ProductionOrder** (أمر إنتاج) - Manufacturing work orders
- **ProductionExecution** (تنفيذ إنتاج) - Shop floor activity recording
- **ProductDelivery** (تسليم منتج) - Finished goods receipts
- **RawMaterialIssue** (صرف مواد خام) - Component withdrawals
- **OrderCloseVoucher** (إغلاق أمر إنتاج) - Production order closing and cost finalization

Document files represent transactional data and manufacturing events.

### Key Relationships

```
InvItem (Finished Product)
    │
    ├──> BOM (Component List)
    │     └──> BOM Details (Material Lines)
    │           └──> InvItem (Components)
    │
    └──> Routing (Operation Sequence)
          └──> Routing Details (Operation Lines)
                ├──> StandardOperation
                ├──> WorkCenter
                └──> Resources

ProductionOrder
    ├──> InvItem (Product to manufacture)
    ├──> BOM (Components to use)
    ├──> Routing (Operations to perform)
    ├──> Components Collection (Order BOM Lines)
    ├──> Routings Collection (Order Operation Lines)
    ├──> Resources Collection (Labor/Machine Lines)
    └──> Co-Products Collection (By-products)

ProductionExecution
    ├──> ProductionOrder (One or more orders)
    └──> Execution Details (Lines per order)
          ├──> From Operation & Step
          ├──> To Operation & Step
          ├──> Quantities moved
          └──> Time and resources used
```

## Integration Points

The Manufacturing module integrates with:

### Inventory Management
- Item master data
- Warehouse and location management
- Lot and serial number tracking
- Inventory transactions and balances

### Supply Chain
- Purchase requisitions for components
- Inventory reservations
- Quality control integration

### Cost Accounting
- Standard costing setup
- Actual cost collection
- Manufacturing overhead allocation
- Variance analysis (material, resource, overhead)
- Work-in-process valuation
- Cost per batch/lot tracking
- Deviation reporting

### Material Requirements Planning (MRP)
- Demand calculation
- Production order generation
- Component requirement explosion
- Capacity planning

## Navigation

Access manufacturing functions through the main menu:

**Arabic**: التصنيع > المستندات
**English**: Manufacturing > Documents

Key screens:
- Production Order (أمر إنتاج): Manufacturing > Documents > Production Order
- Production Execution (تنفيذ إنتاج): Manufacturing > Documents > Production Execution
- BOM (مكونات منتج): Manufacturing > Master Files > Bill of Materials
- Routing (عملية تشغيل): Manufacturing > Master Files > Routing

## Next Steps

For detailed information on specific manufacturing processes:

- [Production Orders](./production-orders.md) - Creating and managing work orders
- [Production Execution](./production-execution.md) - Recording shop floor activities
- [Production Costing and Order Closing](./production-costing.md) - Cost calculation and overhead allocation
- [Bill of Materials](./bill-of-materials.md) - Defining product structures
- [Routings](./routings.md) - Setting up operation sequences
- [Material Requirements Planning](./material-requirements-planning.md) - Automated planning

## Key Features Summary

### Production Order Features
- BOM and routing assignment
- Component and co-product management
- Multi-operation tracking
- Resource allocation
- Quality control integration
- Flexible scheduling
- Status management workflow

### Production Execution Features
- Operation-by-operation tracking
- Quantity movement between steps
- Multiple operation steps (ToMove, Rejected, Scrap, Sample)
- Time and resource recording
- Automatic material issue generation
- Automatic product delivery
- Work center and employee tracking
- Quality document integration

### Manufacturing Control
- Operation sequence enforcement
- Over-completion controls with permitted percentages
- Parallel operation support
- Sample taking and testing
- Scrap and rework handling
- Mold usage tracking
- Real-time production monitoring

## System Configuration

Manufacturing behavior is controlled through:

1. **Module Configuration**: Manufacturing-wide settings
2. **Document Terms**: Production order and execution policies
3. **Item Settings**: Manufacturable flag, lead times
4. **BOM Configuration**: Default batch sizes, scrap factors
5. **Routing Setup**: Operation times, auto-charge flags
