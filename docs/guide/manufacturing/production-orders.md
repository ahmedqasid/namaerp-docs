# Production Orders

## Overview

A **Production Order** (أمر إنتاج) is a formal instruction to manufacture a specific quantity of a finished product or semi-finished item. It represents the central document in the manufacturing process, containing all information needed to plan, execute, and track production activities.

**Menu Location**:
- **Arabic**: التصنيع > المستندات > أمر إنتاج
- **English**: Manufacturing > Documents > Production Order

**Entity Type**: `ProductionOrder`
**Classification**: Document File (المستندات)
**Database Table**: `ProductionOrder`

## Purpose and Functionality

Production orders serve multiple purposes:

1. **Authorization**: Formal approval to consume materials and use resources
2. **Planning**: Define what, when, and how much to produce
3. **Scheduling**: Sequence operations and allocate capacity
4. **Material Planning**: Drive component requirements and reservations
5. **Execution Control**: Track progress and work-in-process
6. **Cost Collection**: Accumulate production costs
7. **Quality Management**: Enforce quality control checkpoints

## Production Order Structure

### Header Information

#### Product Definition
- **Item** (invItem): The finished product to manufacture
- **Quantity** (quantity): Amount to produce with unit of measure
- **Specific Dimensions**: Lot, serial, size, color, revision, warehouse
- **Production/Expiry Dates**: For lot-tracked items

#### Bill of Materials
- **BOM** (bom): Reference to the product structure
- **Components Collection** (components): List of materials to consume
- **Co-Products Collection** (coProducts): By-products and co-products generated

#### Routing
- **Routing** (routing): Reference to the operation sequence
- **Routings Collection** (routings): Operation lines to perform
- **Resources Collection** (resources): Labor and machines required
- **Molds Collection** (molds): Molds/tooling needed

#### Scheduling
- **Planned Start Date** (plannedStartDate): When to begin production
- **Planned Completion Date** (plannedCompletionDate): Target finish date
- **Actual Start Date** (actualStartDate): When production actually started
- **Actual Completion Date** (actualCompletionDate): When completed

#### Status Management
- **Status** (status): Current state of the order
  - `Initial`: Created but not started
  - `InProgress`: Production has begun
  - `Closed`: Completed and finalized
  - `Terminated`: Cancelled
- **Started Order** (startedOrder): Boolean flag indicating order has started
- **Convert to Initial** (convertToInitialOrder): Flag to revert to initial state

#### Production Control
- **Permitted Percentage for OP1** (permittedPercentageForOP1): Over-production tolerance for first operation
- **Unlimited Overcompletion for OP1** (unlimitedOvercompletionForOP1): Allow any quantity in first operation
- **Quality Check List** (qualityCheckList): Quality control checklist
- **Assurance Check List** (assuranceCheckList): Quality assurance checklist

### Detail Collections

#### 1. Components (المكونات)
**Collection**: `components`
**Table**: `OrderComponentLine`

Each component line contains:
- **Item**: Raw material or component
- **Quantity**: Required amount
- **Operation Seq**: At which operation to consume
- **Issue Type**: Manual, Auto with BOM, Auto with Execution
- **Specific Dimensions**: Lot, serial, location
- **Yield & Potency**: Adjustment factors
- **Final Calculated Qty**: Actual quantity after adjustments

**Purpose**: Defines materials to withdraw from inventory during production.

#### 2. Co-Products (المنتجات الثانوية)
**Collection**: `coProducts`
**Table**: `OrderCoProductLine`

Each co-product line contains:
- **Item**: By-product or co-product
- **Quantity**: Expected output
- **Product Type**: Co-Product, By-Product, Scrap
- **Cost Percentage**: Share of production cost
- **Specific Dimensions**: Lot, serial, location

**Purpose**: Tracks secondary outputs from the production process.

#### 3. Routings (عمليات التشغيل)
**Collection**: `routings`
**Table**: `OrderRoutingLine`

Each routing line contains:
- **Operation Seq**: Sequential operation number (10, 20, 30...)
- **Operation**: Reference to standard operation
- **Work Center**: Where operation is performed
- **Operation Name**: Description
- **Auto Charge**: Automatically consume resources
- **Quantity**: Quantity passing through operation
- **Rate**: Production rate
- **Operation Duration**: Time required
- **Permitted Percentage**: Over-production tolerance
- **Unlimited Overcompletion**: Allow unlimited over-production
- **Quality Lists**: Control and assurance checklists
- **Parallel Manufacturing**: Multiple operations in parallel

**Purpose**: Defines the sequence of manufacturing steps.

#### 4. Resources (موارد التشغيل)
**Collection**: `resources`
**Table**: `OrderResourceLine`

Each resource line contains:
- **Operation Seq**: Which operation uses this resource
- **Resource**: Labor, machine, or tool
- **Resources Count**: Number of resources
- **Resource Rate**: Time per unit
- **Basis**: Fixed, Per Unit, Per Lot
- **Final Qty**: Calculated resource consumption
- **Activity**: Cost driver for accounting
- **Auto Charge**: Automatically apply to production

**Purpose**: Tracks labor and equipment usage for costing and capacity planning.

#### 5. Molds (القوالب)
**Collection**: `molds`
**Table**: `ProductionOrderMoldLine`

Each mold line contains:
- **Operation Seq**: Where mold is used
- **Mold**: Mold or tooling reference
- **Quantity**: Number of cavities or uses

**Purpose**: Tracks mold usage for specialized manufacturing (injection molding, die casting, etc.).

#### 6. Production Lot Lines (الشحنات المقترحة)
**Collection**: `productionLotLines`
**Table**: `ProductionLotLine`

For lot-size manufacturing planning.

## Production Order Lifecycle

### 1. Order Creation

Production orders can be created through multiple sources:

#### Manual Creation
1. Navigate to Manufacturing > Documents > Production Order
2. Select Book and Term
3. Choose the item to manufacture
4. Select BOM and Routing (or let system auto-select defaults)
5. Enter quantity and dates
6. Save the order

#### From Production Order Request
- Create a Production Order Request first
- Generate Production Order from the request
- System copies all details automatically

#### From MRP (Material Requirements Planning)
- Run MRP analysis
- System generates planned production orders
- Convert planned orders to actual orders

#### From Aggregated Production Order
- Batch-create multiple orders
- Collect orders from various sources
- Generate consolidated production plans

### 2. BOM and Routing Assignment

When you select an item and BOM:

**System automatically**:
1. Copies component lines from BOM to order components
2. Copies co-product lines from BOM to order co-products
3. Copies routing operations to order routing lines
4. Copies resource requirements to order resource lines
5. Copies mold requirements to order mold lines
6. Calculates quantities based on order quantity vs. BOM base quantity

**Key Actions** (from `ProdOrderPostActions.java`):
- `postBom()`: Triggers when BOM is selected
- `postRouting()`: Triggers when routing is selected
- `postQty()`: Recalculates all component/co-product quantities when order quantity changes
- `postStandardOperation()`: Adds operation resources and molds when operation is selected

**Quantity Calculation**:
```
Component Final Qty = (Component BOM Qty / BOM Base Qty) × Order Qty × (1 + Scrap%) ÷ Yield%
```

### 3. Component Collection

**Collect Lots Action** (`collectLotIds`):
- Searches inventory for available lots
- Suggests lot numbers for each component
- Filters by warehouse and locator
- Can clear existing or append to current selections

**Collect Boxes Action** (`collectBoxs`):
- Similar to lot collection for box-tracked items

### 4. Order Starting

**Start Production Order Action** (`startProdOrder`):
- Changes status from `Initial` to `InProgress`
- Sets `startedOrder` flag to `true`
- Records actual start date
- Prevents modifications to BOM/routing structure

**Validation**:
- Cannot start if order is already Closed or Terminated
- Once started, order is ready for execution

**Cancel Start Action** (`cancelStartProdOrder`):
- Reverts order to Initial status
- Only allowed if no dependent documents exist
- Checks for production executions and other transactions

### 5. Material Reservation

**Create Reservation Document Action** (`createReservationDocForQtys`):
- Generates an Inventory Reservation document
- Reserves components in inventory
- Prevents stock-outs during production
- Must save order first before creating reservation

### 6. Production Execution

Once the order is started:
- Create **Production Execution** documents to record work
- Track quantities moving through operations
- Record time and resource consumption
- System automatically generates material issues

See [Production Execution](./production-execution.md) for detailed execution workflow.

### 7. Material Issues and Receipts

**Generated Documents**:

**Raw Material Issue** (صرف مواد خام):
- Auto-generated from Production Execution
- Withdraws components from inventory
- Updates work-in-process
- Three issue types:
  - Manual: User creates separate issue document
  - Auto with BOM: Issues based on BOM quantities
  - Auto with Execution: Issues as operations are performed

**Product Delivery** (تسليم منتج):
- Auto-generated when production completes final operation
- Receives finished goods into inventory
- Records lot/serial numbers
- Handles co-products

### 8. Order Completion and Closing

**Completion**:
- Last operation is executed
- Finished goods are delivered
- All materials are consumed
- Order status remains `InProgress`

**Closing**:
- Administrative action to finalize the order
- Status changes to `Closed`
- Prevents further modifications
- Locks cost accounting

**Termination**:
- Cancel an order that won't be completed
- Status changes to `Terminated`
- Reverses any partial production effects

## Special Features

### Multi-Level BOMs

Nama ERP supports multi-level product structures:
- Finished product contains sub-assemblies
- Sub-assemblies contain components
- System automatically explodes all levels
- Can track work-in-process at sub-assembly level

### Parallel Operations

**Parallel Manufacturing** (`mfgParallel` field):
- Multiple operations run simultaneously
- Example: Two painting lines running in parallel
- Different validation rules for parallel operations
- Cannot move forward from a parallel operation (must reverse first)

### Over-Production Control

**Permitted Percentage**:
- Control over-production tolerance
- Defined per operation in routing
- First operation (OP1) has separate setting
- Example: 5% permitted percentage allows producing 105 units from 100 unit order

**Unlimited Over-Completion**:
- Flag to allow any over-production
- Useful for processes with variable yields
- Common in pharmaceutical and food industries

### Quality Integration

**Quality Control Lists**:
- Attach quality checkpoints to operations
- System enforces quality approval before proceeding
- Can block execution if quality is not approved

**Quality Documents**:
- Quality Control Doc
- Quality Assurance Doc
- Linked to specific operations
- Auto-generated from Production Execution

### Cost Tracking

**System tracks**:
- **Material Issue Cost**: Components consumed
- **Material Return Cost**: Components returned
- **Resources Cost**: Labor and machine time
- **Molds Cost**: Tooling usage
- **Scrap Cost**: Rejected and scrapped quantities
- **Delivered Product Cost**: Finished goods value
- **Returned Product Cost**: Finished goods rejected

**Cost Reallocation**:
- Distribute costs across co-products
- Use cost percentages or fixed amounts
- Handle by-products and scrap valuation

### Lot Collection and Dimensions

**Specific Dimensions**:
- Lot ID tracking
- Serial number assignment
- Box/pallet tracking
- Size, color, revision
- Active/inactive percentages (for pharmaceuticals)
- Sub-item variations

**Auto-Collection**:
- `CollectLots`: Automatically suggest lot numbers
- `CollectBoxs`: Suggest box/pallet assignments
- Filters by warehouse availability
- Respects FIFO/FEFO rules

### Production Order Requests

**Workflow**:
1. Create Production Order Request (planning document)
2. Request approved through workflow
3. Convert request to Production Order
4. System copies all data from request

**From Document Assignment**:
- Link production order to source request
- Prevents duplicate order creation
- Maintains traceability

### Aggregated Production Orders

**Purpose**: Batch creation of multiple production orders

**Process**:
1. Create Aggregated Production Order document
2. Collect Production Order Requests based on criteria:
   - Date range
   - Item range
   - Organizational units (legal entity, branch, sector, department)
   - Analysis set
3. Option to merge similar lines
4. Generate individual Production Orders for each line
5. System creates orders in batch

**Use Cases**:
- Weekly production planning
- Batch processing of customer orders
- Consolidation of forecasts

### Document Generation Workflow

**Key Generated Documents**:

From **Production Execution**:
- Raw Material Issue (صرف مواد خام)
- Resource Voucher (سند موارد)
- MFG Mold Voucher (سند قوالب)
- Product Delivery (تسليم منتج) - when auto-delivery enabled
- Production Sample Doc (سند عينة إنتاج) - when samples taken
- Quality Control/Assurance Docs

Configuration controls:
- Which documents to generate
- Book and term for each document type
- Whether to require approval workflow
- Auto-delete when source is deleted

## GUI Actions Reference

Based on `ProdOrderPostActions.java`, key actions include:

### Header Actions
- **startProdOrder**: Start production (change status to In Progress)
- **cancelStartProdOrder**: Revert to Initial status
- **CollectLots**: Auto-collect lot numbers for components
- **CollectBoxs**: Auto-collect box assignments
- **CollectProductionOrderRequests**: Collect requests for aggregated order
- **createReservationDocForQtys**: Generate inventory reservation
- **collectRawMaterials**: Collect raw materials and items

### Field Post Actors
- **postBom**: Triggered when BOM selected - copies BOM structure
- **postRouting**: Triggered when routing selected - copies operations
- **postQty**: Recalculate all quantities when order quantity changes
- **postItem**: Handle item selection and default BOM/routing
- **postStandardOperation**: Add operation resources and molds
- **postFromDoc**: Copy data from source document (Production Order Request)

### Searcher Contexts (Filters)
- **filterFinalItem**: Show only manufacturable items
- **filterItems**: Filter component items by class
- **filterBomByItemClassifier**: Filter BOMs by item and classifiers
- **filterRouting**: Filter routings by item and dimensions
- **filterProductionOrderContext**: Filter available production order requests

### Suggestion Providers
- **suggestPrimaryUOM**: Suggest primary units for items
- **suggestResOpSeq**: Suggest operation sequences
- **suggestItemCode**: Suggest item codes with auto-completion

## System Entry and Tracking

**Production System Entry** (`ProductionSysEntry`):
- Real-time tracking of quantities at each operation
- Fields per operation:
  - `toMove`: Quantity ready to move forward
  - `rejected`: Rejected quantity
  - `scrap`: Scrapped quantity
  - `sample`: Sample quantity taken

**Purpose**:
- Track work-in-process location
- Validate execution transactions
- Prevent invalid operation sequences
- Support shop floor visibility

## Related Documents

**SysPORelatedDocLine**:
- Tracks all documents related to production order
- Material issues, product deliveries, executions
- Used for validation and deletion checks
- Maintains referential integrity

## Production Order Validation

**Key Validations**:

1. **BOM Validation**:
   - BOM must exist and be active
   - Components must be available
   - BOM quantity must match item

2. **Routing Validation**:
   - Routing must exist and be active
   - Operations must be sequential
   - Work centers must be defined
   - Resources must be available

3. **Quantity Validation**:
   - Order quantity > 0
   - Component quantities calculated correctly
   - UOM conversions valid

4. **Status Validation**:
   - Cannot start closed/terminated order
   - Cannot modify started order structure
   - Cannot delete order with executions

5. **Dimension Validation**:
   - Required dimensions based on item setup
   - Lot/serial validation for tracked items
   - Warehouse/locator must exist

## Configuration Options

**Manufacturing Configuration Settings**:
- `doNotUpdateAfterQtyUpdateInProductionOrdersIfManualIsNotZero`: Preserve manual quantity overrides
- Allow/prevent various operations
- Default behaviors for document generation

**Document Term Settings**:
- Auto-generation rules
- Approval requirements
- Book assignments
- Field defaults

## Performance Considerations

**Large Orders**:
- System handles orders with hundreds of components
- Optimized quantity calculations
- Efficient BOM explosion algorithms

**Batch Operations**:
- Use Aggregated Production Orders for batch creation
- Start multiple orders together
- Parallel processing where possible

---

::: tip Next Steps
After creating production orders, proceed to [Production Execution](./production-execution.md) to learn how to record shop floor activities and track production progress.
:::

::: warning Important
Once a production order is started, you cannot modify its BOM or routing structure. Plan carefully before starting orders.
:::
