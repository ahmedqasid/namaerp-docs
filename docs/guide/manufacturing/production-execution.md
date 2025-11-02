# Production Execution

## Overview

**Production Execution** (تنفيذ إنتاج) is the document used to record actual manufacturing activities as they occur on the shop floor. It tracks the movement of work-in-process through production operations, records time and resource consumption, and manages material flow during manufacturing.

**Menu Location**:
- **Arabic**: التصنيع > المستندات > تنفيذ إنتاج
- **English**: Manufacturing > Documents > Production Execution

**Entity Type**: `ProductionExecution`
**Classification**: Document File (المستندات)
**Database Table**: `ProductionExecution`

## Purpose and Functionality

Production Execution serves as the primary data capture mechanism for:

1. **Quantity Tracking**: Record quantities moving between production operations
2. **Operation Progress**: Track completion status of routing operations
3. **Time Recording**: Capture actual labor and machine hours
4. **Material Consumption**: Trigger automatic material issues
5. **Quality Control**: Record accepted, rejected, scrap, and sample quantities
6. **Resource Usage**: Track employees, machines, and tools used
7. **Product Delivery**: Auto-generate finished goods receipts
8. **Cost Actuals**: Collect actual production costs

## Production Execution Concepts

### Operation Steps

Manufacturing quantities can be in different states at each operation:

#### ToMove (للنقل)
- **Meaning**: Quantity ready to move to the next operation
- **Usage**: Standard work-in-process that has passed quality control
- **Symbol**: `OperationStep.ToMove`
- **Typical Flow**: Material moves forward through routing sequence

#### Rejected (مرفوض)
- **Meaning**: Quantity that failed quality inspection
- **Usage**: Items requiring rework or additional processing
- **Symbol**: `OperationStep.Rejected`
- **Typical Flow**: Moves backward for rework or correction

#### Scrap (تالف)
- **Meaning**: Quantity that cannot be salvaged
- **Usage**: Defective items to be disposed
- **Symbol**: `OperationStep.Scrap`
- **Typical Flow**: Written off, removed from production

#### Sample (عينة)
- **Meaning**: Quantity taken for testing/quality analysis
- **Usage**: Laboratory testing, quality assurance
- **Symbol**: `OperationStep.Sample`
- **Typical Flow**: Set aside for testing, may be destroyed or returned

### Operation Movement Types

#### Forward Movement
Moving quantities from one operation to the next:
```
From: Operation 10, Step ToMove
To:   Operation 20, Step ToMove
```
- Typical production flow
- Quantity advances through routing
- Progress toward completion

#### Reverse Movement
Moving quantities backward for rework:
```
From: Operation 20, Step Rejected
To:   Operation 10, Step ToMove
```
- Quality issues requiring rework
- Send back to previous operation
- Re-process defective items

#### Same Operation Movement
Changing quantity status within an operation:
```
From: Operation 10, Step ToMove
To:   Operation 10, Step Rejected
```
- Quality inspection at operation
- Identify defects
- Segregate good from bad

#### Sample Taking
```
From: Operation 10, Step ToMove
To:   Operation 10, Step Sample
```
- Extract samples for testing
- Both must be same operation
- Testing before proceeding

## Production Execution Structure

### Header Information

#### Document Identification
- **Code** (code): Unique execution number
- **Book** (book): Document book configuration
- **Term** (term): Document term with execution rules
- **Value Date** (valueDate): Execution transaction date

#### Production Context
- **From Doc** (fromDoc): Link to Production Order
- **Aggregated Production Order** (aggregatedProductionOrder): For batch executions
- **CRTN Material Planning** (crtnMaterialPlanning): Carton production planning

#### Resource Information
- **Resource** (resource): Primary resource (work center/machine)
- **Employee** (employee): Worker performing execution (for human resources)
- **Fixed Asset** (fixedAsset): Machine/equipment used (for machine resources)

#### Default Values for Lines
- **Default From Operation** (defFromOperation): Default starting operation
- **Default To Operation** (defToOperation): Default ending operation
- **Default From Step** (defFromStep): Default starting status
- **Default To Step** (defToStep): Default ending status

#### Product Dimensions
- **Specific Dimensions** (specificDimensions): Lot, serial, size, color, box, revision
- **Production Date** (productionDate): Manufacturing date for lot control
- **Expiry Date** (expiryDate): Expiration date for lot control
- **Measures** (measures): Dimensional measurements (length, width, height)

#### Execution Control
- **Auto Delivery** (autoDelivery): Automatically create Product Delivery when finishing last operation
- **Auto Gen Sample Docs** (autoGenSampleDocs): Auto-generate sample documents
- **Contains Sample Steps** (containsSampleSteps): System flag indicating sample taking occurred
- **Quality Control Doc** (qualityControlDoc): Generated quality control/assurance document

### Detail Lines

**Collection**: `details`
**Table**: `ProdExecutionLine`

Each execution line represents one quantity movement for one production order.

#### Production Order Reference
- **Production Order** (productionOrder): Which order this execution applies to
- **Production Order Qty** (prodOrderQty): Total order quantity for reference

#### From Location (Starting Point)
- **From Operation** (fromOperation): Starting operation sequence (e.g., 10)
- **From Step** (fromStep): Starting quantity status (ToMove, Rejected, Scrap, Sample)
- **From Date** (fromDate): Start date of execution
- **From Time** (fromTime): Start time of execution

#### To Location (Ending Point)
- **To Operation** (toOperation): Ending operation sequence (e.g., 20)
- **To Step** (toStep): Ending quantity status (ToMove, Rejected, Scrap, Sample)
- **To Date** (toDate): End date of execution
- **To Time** (toTime): End time of execution

#### Quantities
- **User Qty** (userQty): Quantity and UOM entered by user
  - May be in operation-specific UOM (different from order UOM)
  - Examples: Pieces, kilograms, meters
- **User To Qty** (userToQty): Ending quantity if different (for over/under production)
- **Quantity** (quantity): Calculated quantity in order UOM
- **To Quantity** (toQuantity): Calculated ending quantity in order UOM

#### Measurements
- **Measure Qty** (measureQty): Number of pieces/cuts
- **Measures** (measures): From dimensions (length, width, height)
- **To Measure Qty** (toMeasureQty): Ending measure quantity
- **To Measures** (toMeasures): Ending dimensions

#### Delivery Location
- **Delivery Warehouse** (deliveryWarehouse): Target warehouse for finished goods
- **Delivery Locator** (deliveryLocator): Target location for finished goods
- **Lot ID** (lotId): Lot number assignment

#### Product Dates
- **Production Date** (productionDate): Manufacturing date for this line
- **Expiry Date** (expiryDate): Expiration date for this line
- **Retest Date** (retestDate): Retest date for pharmaceutical products

## Production Execution Workflow

### 1. Creating an Execution Document

#### From Single Production Order

**Manual Entry**:
1. Navigate to Manufacturing > Documents > Production Execution
2. Select Book and Term
3. Select **From Doc** = Production Order
4. System automatically creates first line with:
   - Production Order reference
   - Default from/to operations from header
   - Suggested quantity from Production System Entry
   - Current date/time

**Quick Setup Using Defaults**:
- Set **Default From Operation** (e.g., 10)
- Set **Default To Operation** (e.g., 20)
- Set **Default From Step** (ToMove)
- Set **Default To Step** (ToMove)
- System populates first line automatically

#### From Aggregated Production Order

**Batch Processing**:
1. Select **Aggregated Production Order**
2. System creates one line per production order in the aggregate
3. All lines have same operation movement
4. Efficient for batch work centers

#### From CRTN Material Planning

**Carton Production**:
- Select CRTN Material Planning document
- System collects all production orders from the planning
- Creates execution lines for each order

#### By Resource

**Work Center Execution**:
1. Select **Resource** (work center or machine)
2. System pre-fills **To Step** = ToMove
3. System enables/disables employee or fixed asset based on resource type
4. For each order:
   - Select Production Order
   - System finds operations for this resource
   - Auto-populates to operation

### 2. Configuring Execution Lines

#### Operation Selection

**From Operation**:
- Select starting operation (10, 20, 30...)
- System reads Production System Entry
- Shows available quantity in that operation/step
- Suggests quantity to move

**To Operation**:
- Select ending operation
- Must be valid according to routing
- Can be same as from operation (status change)
- Can be forward or backward movement

**Operation Sequences**:
- Production orders have operations: 10, 20, 30, 40, 50...
- Operation 1 is implicit (before first routing operation)
- Last operation is the highest number in routing

#### Step Selection

**From Step**:
- Usually **ToMove** (normal work in process)
- Can be **Rejected** (rework)
- Can be **Scrap** or **Sample** (unusual)

**To Step**:
- **ToMove**: Standard forward progress
- **Rejected**: Quality issue, rework needed
- **Scrap**: Defective, cannot be salvaged
- **Sample**: Taking sample for testing

**Step Validation Rules**:
- Cannot move from/to same operation and step
- If from step = Rejected, cannot move forward (must go backward or same operation)
- Rejected ↔ Scrap must be same operation
- Sample must be same operation (ToMove ↔ Sample)

#### Quantity Entry

**User Quantity**:
- Enter quantity in operation-specific UOM
- System may allow different UOM per operation (via routing UOM conversions)
- Example: Operation 10 in pieces, Operation 20 in kilograms

**System Calculation**:
- Converts user quantity to order UOM
- Uses routing UOM conversion factors
- If no conversion defined, uses item's primary UOM conversion
- Formula example:
  ```
  Order UOM Qty = User Qty × (From Value / To Value)
  ```

**User To Quantity** (optional):
- For over-production or under-production
- If entered, represents ending quantity different from starting quantity
- Example: Start with 100, produce extra, end with 105

**Measures** (for dimensional items):
- Enter measure quantity (number of pieces)
- Enter dimensions (length, width, height)
- System calculates total quantity = measure qty × dimensions
- Can have different "to measures" for ending size

#### Time Recording

**From Date and Time**:
- When work started
- Defaults to current date/time
- Can be manually adjusted

**To Date and Time**:
- When work completed
- System can calculate based on operation duration from routing
- Formula:
  ```
  To Time = From Time + (Operation Duration × Quantity)
  ```

**Duration Calculation**:
- System reads operation duration from routing
- Considers all auto-charge operations in sequence
- Multiplies by quantity produced
- Useful for planning and actual tracking

### 3. Auto-Delivery Feature

**Purpose**: Automatically create Product Delivery when production completes

**Configuration**:
- Set **Auto Delivery** = True in header
- System automatically sets **Default To Step** = ToMove
- Sets **Default To Operation** = last operation in routing

**Behavior**:
1. When execution line moves quantity to last operation with ToMove step:
2. System generates Product Delivery document
3. Finished goods are received into inventory
4. Co-products are also delivered
5. Lot/serial numbers from execution are applied
6. Warehouse/locator from execution line is used

**Validation**:
- Auto delivery only allowed if execution includes last operation
- System checks that to-operation and to-step indicate completion
- Cannot enable auto delivery for intermediate operations

### 4. Generated Documents

Production Execution automatically generates related documents based on configuration:

#### Raw Material Issue (صرف مواد خام)

**Trigger**: Execution lines that consume materials

**Generation Logic**:
- For each production order in execution
- Collect components with issue type = "Auto with Execution"
- Calculate quantities based on operation consumption
- Generate material issue document per order
- Components are withdrawn from inventory

**Configuration**:
- **Term Config**: Mat Issue Config (generation book and term)
- **Approval Option**: Consider approval for generating mat issue

#### Resource Voucher (سند موارد)

**Trigger**: Execution lines using resources

**Generation Logic**:
- For each production order
- Collect resource lines from routing
- Match resources to operations executed
- Calculate resource hours = operation time × resource rate
- Generate resource voucher

**Purpose**: Track labor and machine time for costing

**Configuration**:
- **Term Config**: Res Voucher Config (generation book and term)
- **Approval Option**: Consider approval for generating res voucher

#### MFG Mold Voucher (سند قوالب)

**Trigger**: Execution using molds

**Generation Logic**:
- Collect mold usage from production order
- Generate mold voucher for tracking

**Configuration**:
- **Term Config**: Mold Voucher Config (generation book and term)
- **Approval Option**: Consider approval for generating mold voucher

#### Product Delivery (تسليم منتج)

**Trigger**: Auto Delivery = True and execution to last operation

**Generation Logic**:
- Create Product Delivery document
- Quantity = user to quantity (or user quantity if not specified)
- Item = finished product from production order
- Specific dimensions from execution header
- Warehouse/locator from execution line delivery location
- Production/expiry dates from execution

**Co-Products**:
- System also creates delivery lines for co-products
- Each co-product delivered with its quantity

**Configuration**:
- **Term Config**: Prod Delivery Config (generation book and term)
- **Approval Option**: Consider approval for generating prod delivery

#### Production Sample Doc (سند عينة إنتاج)

**Trigger**: Auto Gen Sample Docs = True and execution contains sample steps

**Generation Logic**:
- Collect lines where to-step = Sample
- Create sample document
- Record sample quantities and operations

**Purpose**: Track samples taken for quality testing

**Configuration**:
- **Term Config**: Sample Config (generation book and term)
- **Approval Option**: Consider approval for generating sample

#### Quality Control/Assurance Docs

**Trigger**: Quality control required for operations

**Generation Logic**:
- Check operations for quality check lists
- Generate Quality Control Doc or Quality Assurance Doc
- Create lines for each check item from checklist
- Operator fills in answers and results

**Configuration**:
- **Term Config**: Quality Control Doc Book/Term
- **Generated Quality Control Type**: QC Doc or QA Doc

**Validation**:
- If quality approval required, execution blocked until quality approved
- Checks for approved QC/QA documents for operations

### 5. Validation Rules

**Operation Sequence Validation**:
- Cannot skip operations (must execute in sequence)
- Cannot move to operation if next operation already has quantities
- System checks Production System Entry for proceeding operations

**Parallel Operations**:
- If operation marked as parallel in routing
- Can only be from-operation in reverse movement
- Cannot be to-operation unless from a specific prior operation
- Different validation logic applies

**Permitted Percentage Validation**:
- If user-to-quantity > user-quantity (over-production)
- System checks permitted percentage from routing
- Example: 5% permitted, order 100, max allowed 105
- If unlimited over-completion = true, any quantity allowed

**Quality Approval Validation**:
- If term requires QC/QA approval
- System checks for approved quality documents
- For operations with quality check lists
- Execution blocked until approval

**Order Status Validation**:
- Production order must be "In Progress"
- Cannot execute on Initial, Closed, or Terminated orders

**UOM Validation**:
- User quantity UOM must exist in item's UOM list
- Must be primary UOM type
- Or must have routing UOM conversion defined

### 6. Commit and Effect

**When execution is committed**:

1. **Update Production System Entry**:
   - Decrease quantity at from-operation/from-step
   - Increase quantity at to-operation/to-step
   - Real-time work-in-process tracking

2. **Generate Material Issues**:
   - Create raw material issue documents
   - Withdraw components from inventory
   - Update work-in-process value

3. **Generate Resource Vouchers**:
   - Record labor and machine hours
   - Cost accounting integration

4. **Generate Product Deliveries** (if auto-delivery):
   - Receive finished goods to inventory
   - Clear work-in-process
   - Complete production order

5. **Update Production Order**:
   - Set actual start date (first execution)
   - Update order dimensions if not set
   - Copy lot/serial/dimensions from execution

6. **Create System Entries**:
   - SysPORelatedDocLine: Link execution to production order
   - Track related documents

7. **Generate Quality Documents**:
   - Create QC/QA documents if needed
   - Populate checklists from routing operations

### 7. Editing and Deleting

**Editing Committed Execution**:
- System allows editing if no proceeding operations exist
- Must cancel and regenerate related documents
- Recalculates Production System Entries

**Deleting Execution**:
- Validates no proceeding operations have been executed
- Reverses Production System Entry effects
- Deletes auto-generated documents (if configured)
- Removes material issues, deliveries, etc.

**Validation**:
- Cannot delete if next operations have quantities
- Cannot delete if generated documents cannot be deleted
- Order status must allow modifications

## Working with Production System Entries

**Production System Entry** tracks quantities at each operation step:

**Structure**:
```
Production Order: PO-001
Operation: 10
- To Move: 100
- Rejected: 5
- Scrap: 2
- Sample: 3

Operation: 20
- To Move: 95
- Rejected: 0
- Scrap: 0
- Sample: 0
```

**How Execution Affects Entries**:

Example execution:
```
From: Op 10, ToMove, Qty 50
To:   Op 20, ToMove, Qty 50
```

Result:
```
Operation 10: ToMove decreases by 50 (100 → 50)
Operation 20: ToMove increases by 50 (95 → 145)
```

**Entry Visibility**:
- Users see available quantities when selecting operations
- System suggests quantities to move
- Real-time updates as executions are committed

## Special Scenarios

### Rework Processing

**Scenario**: Quality inspection finds defects

**Execution 1** (Identify defects):
```
From: Op 30, ToMove, Qty 10
To:   Op 30, Rejected, Qty 10
```
Move to rejected status at same operation.

**Execution 2** (Send for rework):
```
From: Op 30, Rejected, Qty 10
To:   Op 10, ToMove, Qty 10
```
Send back to earlier operation for rework.

**Execution 3** (Rework complete):
```
From: Op 10, ToMove, Qty 10
To:   Op 30, ToMove, Qty 10
```
Process through operations again.

### Scrap Recording

**Scenario**: Discover defective materials

```
From: Op 20, ToMove, Qty 5
To:   Op 20, Scrap, Qty 5
```

**Effect**:
- Quantity removed from ToMove
- Marked as Scrap
- Will be written off
- Cost accounting reflects scrap loss

### Sample Taking

**Scenario**: Quality requires testing

**Take Sample**:
```
From: Op 10, ToMove, Qty 3
To:   Op 10, Sample, Qty 3
```

**Generate Sample Doc**:
- Auto Gen Sample Docs = True
- System creates Production Sample Doc
- Laboratory performs tests

**Return Sample** (if destructive testing):
```
From: Op 10, Sample, Qty 3
To:   Op 10, Scrap, Qty 3
```

**Or Pass Sample**:
```
From: Op 10, Sample, Qty 3
To:   Op 10, ToMove, Qty 3
```

### Over-Production

**Scenario**: Produced more than planned due to yields

**Execution**:
```
From: Op 40, ToMove, Qty 100
To:   Op 50, ToMove, User To Qty 105
```

**Validation**:
- System checks permitted percentage
- If operation allows 5% over, 105 is acceptable
- If not, validation error occurs

### Different UOM per Operation

**Scenario**: Cut fabric (meters) into garments (pieces)

**Routing Setup**:
- Operation 10 (Cutting): UOM = Meters
- Operation 20 (Sewing): UOM = Pieces
- UOM Conversion: 1 Meter = 2 Pieces

**Execution**:
```
From: Op 10, ToMove, User Qty 50 Meters
To:   Op 20, ToMove (User Qty auto-calculated as 100 Pieces)
```

**System Conversion**:
- Uses routing UOM conversion table
- Converts both directions
- Maintains accuracy in order UOM

### Batch Processing Multiple Orders

**Use Aggregated Production Order**:
1. Create Aggregated Production Order with multiple detail lines
2. Create Production Execution
3. Select Aggregated Production Order
4. System creates one execution line per production order
5. All execute same operation movement
6. Efficient for work centers processing batches

## Configuration and Setup

### Document Term Configuration

**ProdExecutionTermConfig** controls execution behavior:

**Material Issue Config**:
- Generation Book
- Generation Term
- Consider Approval for Generating Mat Issue

**Resource Voucher Config**:
- Generation Book
- Generation Term
- Consider Approval for Generating Res Voucher

**Mold Voucher Config**:
- Generation Book
- Generation Term
- Consider Approval for Generating Mold Voucher

**Product Delivery Config**:
- Generation Book
- Generation Term
- Consider Approval for Generating Prod Delivery

**Sample Config**:
- Generation Book
- Generation Term
- Consider Approval for Generating Sample

**Quality Control Config**:
- Quality Control Doc Book
- Quality Control Doc Term
- Generated Quality Control Type (QC Doc or QA Req)
- QC Doc Approval Is Required
- QA Doc Approval Is Required

**Other Settings**:
- Auto Delivery (default value)
- Delete Auto Generated Docs With Doc Deletion

### Manufacturing Configuration

**Module-wide settings**:

**Subtract Lines Quantities From Operation Calculated Quantities**:
- When suggesting quantities to move
- Subtract already-entered lines from available quantity
- Prevents over-allocation in same execution document

**Do Not Suggest From Time In Execution**:
- Control whether from-time auto-populates
- Some shops prefer manual time entry

**Using Production Movement Sys Entry**:
- Alternative tracking mechanism
- More detailed movement tracking
- Advanced feature
