# ReportWizard User Documentation (أداة إنشاء تقرير)
## Complete Guide to Report Creation and Management

---

## Introduction

The ReportWizard (**أداة إنشاء تقرير**) is a powerful report generation tool within Nama ERP that enables users to create professional, data-rich reports without writing code. It generates JasperReports-based outputs with extensive customization options for data extraction, formatting, and presentation.

::: info Entity Information
- **Entity Type**: ReportWizard
- **Arabic Name**: أداة إنشاء تقرير  
- **English Name**: Report Wizard
- **Entity Classification**: Master File
- **Database Table**: ReportWizard
:::

### Entity Structure Overview

The ReportWizard entity contains **32 detail collections** for comprehensive report configuration:

| Collection | Arabic Name | English Name | Purpose |
|------------|-------------|--------------|---------|
| `fields` | الحقول | Fields | Report field definitions and formatting |
| `parameters` | المدخلات | Parameters | User input parameters for report filtering |
| `group1Lines` - `group5Lines` | سطور المجموعة 1-5 | Group 1-5 Lines | 5-level hierarchical grouping configuration |
| `crosstabColumns` | الأعمدة | Columns | Crosstab horizontal dimension fields |
| `crosstabRows` | الصفوف | Rows | Crosstab vertical dimension fields |
| `crosstabMeasures` | المعادلات | Measures | Crosstab aggregated value fields |
| `dataSource1FilterLines` - `dataSource5FilterLines` | سطور الفلترة لمصدر البيانات 1-5 | Data Source 1-5 Filter Lines | Multi-source data filtering |
| `conditionalStyleLines1` - `conditionalStyleLines5` | جدول التنسيق الشرطي 1-5 | Conditional Style 1-5 Lines | Dynamic formatting rules |
| `securityConstraints` | Security Constraints | Security Constraints | Row-level security configuration |
| `includeTablesByParameters` | تضمين الجداول بشرط من خلال مدخلات | Include Tables By Parameters | Dynamic table inclusion |

### Key Benefits
- **No SQL Required**: Select entities and fields through intuitive interface
- **Multi-Language Support**: Full Arabic and English support throughout
- **Real-Time Preview**: See changes as you make them
- **Reusable Templates**: Save and copy report configurations
- **Enterprise Security**: Built-in row and field-level security
- **Multiple Output Formats**: PDF, Excel, HTML, and direct printing

### Report Types Supported
- **Standard Lists**: Simple tabular reports with filtering and sorting
- **Grouped Reports**: Multi-level hierarchical reports with subtotals
- **Crosstab/Pivot Reports**: Multi-dimensional analysis with row and column grouping
- **Master-Detail Reports**: Parent-child relationships with nested data
- **Statistical Reports**: Aggregations, calculations, and summaries
- **Form Letters**: Document generation with background templates
- **Dashboard Reports**: KPI and metric displays

---

## Getting Started

### Creating a New Report

1. **Access the ReportWizard**
   - Navigate to Basic → Reports → Report Wizard
   - Click "New" to create a new report
   - Or copy an existing report using "Copy Configuration From Report"

2. **Basic Configuration**
   - **Code**: Unique identifier for the report (e.g., "SALES_MONTHLY_001")
   - **Name**: Display name in report lists
   - **Report Group**: Category for organizing reports
   - **Arabic Title**: Report title in Arabic
   - **English Title**: Report title in English

3. **Layout Method Selection**
   - **Standard**: Traditional columnar layout
   - **Crosstab**: Pivot table format
   - **Custom**: Advanced layouts with manual configuration

### Page Setup

#### Page Format Options
- **A4** (210 × 297 mm): Standard international size
- **Letter** (8.5 × 11 inches): North American standard
- **Legal** (8.5 × 14 inches): Extended length documents
- **Custom**: Define specific width and height in millimeters

#### Page Orientation
- **Portrait**: Vertical orientation (taller than wide)
- **Landscape**: Horizontal orientation (wider than tall)

#### Margin Configuration
- **Top Margin**: Space above content
- **Bottom Margin**: Space below content
- **Left Margin**: Space on left side
- **Right Margin**: Space on right side
- **Gutter**: Additional binding margin

### Band Heights
Bands are sections of the report that appear in specific locations:

- **Title Band Height**: One-time header at report start (default: 50px)
- **Page Header Band Height**: Repeated at top of each page (default: 30px)
- **Column Header Band Height**: Table headers (default: 30px)
- **Detail Band Height**: Data rows (default: 20px)
- **Page Footer Band Height**: Repeated at bottom of each page (default: 30px)
- **Last Page Footer Band Height**: Special footer for last page only
- **Summary Band Height**: Report totals section (default: 30px)

---

## Data Source Configuration

### Main Table Selection

The main table is the primary data source for your report:

1. **Table Type Selection**
   - **Entity**: Business objects (Customer, Invoice, Product, etc.)
   - **SQL View**: Pre-defined database views
   - **Custom Query**: Write your own SQL (advanced users)

2. **Entity Browser**
   - Search by entity name or code
   - Filter by module (Accounting, CRM, HR, etc.)
   - View entity descriptions and field counts
   - Check POS compatibility if needed

### Union Tables (Combining Multiple Sources)

Union tables allow you to combine data from multiple similar entities that serve different purposes or come from different systems into a single unified report.

#### When to Use Union Tables
- **Net Calculations**: Combine positive and negative transactions (e.g., Sales Invoices + Sales Returns for net sales)
- **Multi-Source Documents**: Merge similar documents from different systems (e.g., SalesInvoice + NamaPOSSalesInvoice)
- **Payment Consolidation**: Combine different payment types (e.g., ReceiptVoucher + BankTransfers)
- **Cross-System Reporting**: Unite data from multiple business processes into one view
- **Document Type Aggregation**: Combine various document types that share similar business meaning

#### How Union Tables Work
1. **Field Mapping**: The system maps corresponding fields between tables
2. **Column Flexibility**: If column names differ, you can specify which column from each table maps to the report field
3. **Union Handling**: Apply transformations to differentiate or modify data from each source

#### Configuration Steps
1. Add union tables in the "Union Tables" section
2. Map fields between tables (automatic for matching names, manureal for different names)
3. Configure "Union Handling" expressions to transform data per source
4. Test the combined result set

#### Example 1: Net Sales Report
```
Main Table: SalesInvoice
Union Table: SalesReturn
Union Handling: 
  - SalesInvoice: Keep quantities positive
  - SalesReturn: Make quantities negative
Result: Net sales with returns automatically deducted
```

#### Example 2: Unified Sales from Multiple Systems
```
Main Table: SalesInvoice (Regular sales)
Union Table: NamaPOSSalesInvoice (POS terminal sales)
Result: Complete sales picture from all channels
```

#### Example 3: Consolidated Cash Flow
```
Main Table: ReceiptVoucher (Cash receipts)
Union Table 1: BankTransfers (Bank receipts)
Union Table 2: PaymentVoucher (Cash payments - negative)
Result: Complete cash flow report
```

### Dynamic Table Inclusion

The "Include Tables By Parameters" feature enables runtime table selection:

1. **Configuration**
   - Define up to 10 table slots per parameter line
   - Create parameter for user selection
   - Tables are included based on parameter value

2. **Use Cases**
   - **Multi-Company Reports**: User selects which companies to include
   - **Period Selection**: Include specific month/year tables
   - **Regional Reports**: Dynamically include region-specific tables
   - **Product Categories**: Include only selected category tables

3. **Example Setup**
   ```
   Parameter: "Select Regions to Include"
   Table 1: NorthRegionSales (included if "North" selected)
   Table 2: SouthRegionSales (included if "South" selected)
   Table 3: EastRegionSales (included if "East" selected)
   ```

### Multiple Data Sources

The wizard supports up to 5 additional data sources beyond the main table:

#### Data Source Configuration
1. **Data Source 1-5**: Select additional entities or queries
2. **Linking Configuration**: Define relationships between sources
3. **Filter Configuration**: Add WHERE conditions per source

#### Linking Options
- **Inner Join**: Include only matching records
- **Left Join**: Include all main records, matching additional when available
- **Subquery**: Use data source as a subquery for calculations
- **Independent**: No relationship (Cartesian product - use carefully)

#### Use as Subquery Option
When enabled, the data source becomes a correlated subquery:
- Useful for calculations (e.g., "Total orders per customer")
- Aggregations independent of main query grouping
- Performance optimization for complex calculations

#### Show All Values Option
Controls outer join behavior:
- **Enabled**: Left outer join (show all main records)
- **Disabled**: Inner join (only matching records)

---

## Field Management

### Field Types

#### 1. Database Fields
Direct columns from the selected entity:
- **Simple Fields**: Text, numbers, dates
- **Reference Fields**: Links to other entities (shown as codes or names)
- **System Fields**: Created date, modified date, created by, etc.

#### 2. Custom Expression Fields
User-defined calculations:
- **SQL Expressions**: Database-level calculations
- **Jasper Expressions**: Report-engine calculations
- **Formula Examples**:
  - `amount * 1.15` (Add 15% tax)
  - `CONCAT(firstName, ' ', lastName)` (Combine names)
  - `DATEDIFF(endDate, startDate)` (Calculate days between)

#### 3. Alternative Fields
System-provided alternatives for complex data:
- Reference display options (Code, Name, Full Description)
- Translated values
- Formatted representations

### Field Configuration Options

The `fields` collection (**الحقول**) contains comprehensive field configuration with 50+ properties per field:

::: details Field Collection Technical Structure
**Table**: `ReportWizardFieldLine`  
**Join Column**: `reportWizard_id`

**Key Properties Include:**
- **Basic Configuration**: `fieldId`, `arabicTitle`, `englishTitle`, `type`, `namaFieldType`
- **Display Settings**: `fieldWidth`, `widthSize`, `hidden`, `displayFieldAs`
- **Formatting**: `patternType`, `customPattern`, `barcodeType`
- **Aggregation**: `sqlAggregationType`, `totalPosition`, `showRunningTotalInsteadOfValue`
- **Group Totals**: `showTotalInGroup1Section` through `showTotalInGroup5Section`
- **References**: `displayReferenceAs`, `doNotAddLinkToReferences`, `referenceOrderBy`
- **Custom Logic**: `customSqlExpression`, `customJasperExpression`, `unionHandling`
- **Styling**: `style`, `conditionalStyleGrid`, `summaryStyle`
:::

#### Display Properties

1. **Field Width**
   - **Fixed Width**: Specify exact width in pixels
   - **Grid Size**: Responsive sizing (Small, Medium, Large, XLarge)
   - **Auto**: System determines based on content

2. **Titles and Labels**
   - **Arabic Title**: Label shown in Arabic reports
   - **English Title**: Label shown in English reports
   - **Merged Titles**: Combined headers for grouped columns
   - **User Alias**: Alternative internal name for expressions

3. **Visibility Control**
   - **Hidden**: Field is included in data but not displayed
   - **Display Attachment as Image**: Show file attachments as embedded images
   - **Do Not Add Link to References**: Disable drill-down on reference fields

#### Formatting Options

1. **Pattern Types**
   - **Number**: Decimal places, thousand separators, negative format
   - **Currency**: Currency symbol, decimal places
   - **Date**: Various date formats (dd/MM/yyyy, MMM dd yyyy, etc.)
   - **Time**: Time formats (HH:mm:ss, hh:mm AM/PM)
   - **Percentage**: Show as percentage with specified decimals
   - **Custom**: User-defined format patterns

2. **Custom Patterns**
   - `#,##0.00`: Number with 2 decimals
   - `dd/MM/yyyy`: Date format
   - `#,##0.00;(#,##0.00)`: Positive;Negative format
   - `00000`: Leading zeros (e.g., 00123)

3. **Display Options**
   - **Display Field As**: Text, Number, Barcode, QR Code
   - **Barcode Type**: Code128, Code39, QR, DataMatrix, EAN13
   - **Currency Field**: Link to currency field for multi-currency reports
   - **Show Zero as Empty**: Hide zero values

#### Aggregation Functions

1. **SQL Aggregation Types**
   - **SUM**: Total of all values
   - **COUNT**: Number of records
   - **COUNT DISTINCT**: Number of unique values
   - **AVG**: Average value
   - **MIN**: Minimum value
   - **MAX**: Maximum value
   - **GROUP_CONCAT**: Concatenate text values

2. **Total Positions**
   - **None**: No totals
   - **Summary Only**: Grand total at report end
   - **Group Footers**: Subtotals per group
   - **Both**: Group subtotals and grand total

3. **Running Totals**
   - **Show Running Total Instead of Value**: Display cumulative sum
   - **Reset at Group**: Restart running total at group boundaries

#### Advanced Field Features

1. **Hyperlink Configuration**
   - Create clickable links in reports
   - Link to other reports or external URLs
   - Pass parameters through links
   - Example: `"http://erp/customer/" + $F{customerId}`

2. **Conditional Styling**
   - Apply different styles based on values
   - Highlight negative numbers
   - Color-code status fields
   - Bold important values

3. **Reference Display Options**
   - **Code Only**: Show reference code
   - **Name Only**: Show reference name
   - **Code and Name**: Show both
   - **Full Details**: Complete reference information

---

## Grouping and Organization

### Understanding Groups

Groups organize data hierarchically, creating sections with headers, footers, and subtotals. The ReportWizard supports 5 levels of grouping.

### Group Hierarchy Example
```
Country (Group 1)
  ├── Region (Group 2)
  │   ├── City (Group 3)
  │   │   ├── District (Group 4)
  │   │   │   ├── Store (Group 5)
  │   │   │   │   └── Detail Records
  │   │   │   └── Store Totals
  │   │   └── District Totals
  │   └── City Totals
  └── Region Totals
Country Totals
```

### Configuring Each Group Level

#### Group Fields
- Select one or more fields to group by
- Order matters for hierarchy
- Can group by expressions

#### Group Headers
1. **Show Group Header**: Enable/disable header section
2. **Arabic Title**: Header label in Arabic
3. **English Title**: Header label in English
4. **Custom Header Expression**: Dynamic header content

#### Group Footers
1. **Footer Band Height**: Space for group totals
2. **Totals Arabic Title**: Label for subtotals in Arabic
3. **Totals English Title**: Label for subtotals in English
4. **Custom Footer Expression**: Calculated footer content

#### Group Behavior Options

1. **Page Control**
   - **Start New Page**: Begin new page when group changes
   - **Reprint Header on Each Page**: Repeat group header after page breaks
   - **Reset Page Number**: Restart page numbering for each group

2. **Visual Specifications**
   - **Height**: Group band height in pixels
   - **Font Size**: Text size for group headers/footers
   - **Foreground Color**: Text color
   - **Background Color**: Band background color

### Custom Group Expressions

Groups support custom expressions for complex calculations:

#### Header Custom Expressions
- Display calculated values in group headers
- Show group statistics
- Conditional content based on group values

#### Footer Custom Expressions
- Complex subtotal calculations
- Percentage of total calculations
- Group-level aggregations

#### Expression Lines
Add multiple expression fields to headers/footers:
1. Define expression
2. Set position and formatting
3. Configure visibility conditions

### Group Totals Configuration

For each field with aggregation:
- **Show Total in Group 1 Section**: None/Header/Footer/Both
- **Show Total in Group 2 Section**: None/Header/Footer/Both
- (Continues for all 5 group levels)

---

## Sorting and Filtering

### Sorting Methods

The `sortMethod` field (**طريقة الترتيب**) determines how data is sorted in the report:

#### 1. Sort Based On Sort Fields (ترتيب محدد من خلال حقول الترتيب)
- **Enum Value**: `SortBasedOnSortFields`
- **Sort Parameters Count**: Number of sort fields (1-10)  
- **Ascending/Descending**: Sort direction per field
- **Performance**: Most efficient for large datasets
- **Configuration**: Uses `sortFields` collection (حقول الترتيب) to define sort criteria

#### 2. Sort Based On Report Parameter (ترتيب من خلال مدخلات يقوم باختيارها المستخدم)
- **Enum Value**: `SortBasedOnReportParameter`
- **Jasper Sort Fields**: Uses `jasperSortFieldsLines` collection
- **Use When**: User-selectable sorting or sorting by calculated fields
- **Runtime Control**: Users can modify sort order during report execution

#### 3. Multi-Level Sorting
Configure primary, secondary, tertiary sort fields:
1. Primary: Main sort criterion
2. Secondary: Sort within primary groups
3. Tertiary: Final sort level

### Filtering Options

#### Static WHERE Conditions
Permanent filters always applied:
```sql
-- Examples:
status = 'Active'
amount > 1000
date >= '2024-01-01'
region IN ('North', 'South')
```

#### Static HAVING Conditions
Filters applied after grouping:
```sql
-- Examples:
SUM(amount) > 10000
COUNT(*) >= 5
AVG(score) > 75
```

#### Dynamic Parameter Filtering
Create user-selectable filters:
1. Define parameter
2. Add to WHERE clause
3. User selects value at runtime

#### Where Lines Configuration
Build complex filter conditions:
1. Add multiple WHERE line conditions
2. Combine with AND/OR logic
3. Support for subqueries and EXISTS clauses

### Print When Expressions

Control when elements appear:
```
-- Examples:
$F{amount} > 0  -- Only show if amount is positive
$V{PAGE_NUMBER} == 1  -- Only on first page
$P{showDetails} == true  -- Based on parameter
```

---

## Parameters and User Input

### Parameter Types

#### 1. Simple Parameters
- **Text**: Free text input
- **Number**: Numeric values with validation
- **Date**: Date picker with calendar
- **Boolean**: Yes/No checkbox

#### 2. Selection Parameters
- **Single Select**: Dropdown list
- **Multi-Select**: Multiple choice checkboxes
- **Entity Reference**: Select from entity list

#### 3. Range Parameters
- **Date Range**: From and To dates
- **Number Range**: Minimum and Maximum values
- **Custom Range**: User-defined range logic

### Parameter Configuration

The `parameters` collection (**المدخلات**) provides extensive parameter configuration options:

::: details Parameter Collection Technical Structure
**Table**: `ReportWizardParameterLine`  
**Join Column**: `reportWizard_id`

**Key Properties Include:**
- **Basic Setup**: `fieldId`, `arabicTitle`, `englishTitle`, `required`, `requiredGroup`
- **Data Types**: `paramType`, `parameterType`, `namaFieldType`
- **Default Values**: `defaultValue`, `defaultValueDate`, `defaultValueDateTime`, `refDefaultValue`
- **Range Support**: `defaultValueWithBetween`, `defaultValueDateWithBetween`, `refDefaultValueWithBetween`
- **Reference Parameters**: `refEntityType`, `filter`, `filterType`, `referenceOrderBy`
- **Layout Control**: `layout`, `showInsideReport`, `hidden`
- **Cascading Logic**: `sourceParameter`, `sourceProperty`, `allowedValues`
- **Custom Expressions**: `customSqlExpression`, `customJasperExpression`
:::

#### Basic Settings
1. **Field ID**: Parameter reference name
2. **Arabic Title**: Label in Arabic interface
3. **English Title**: Label in English interface
4. **Default Value**: Pre-filled value
5. **Required**: Must be filled before running

#### Layout Configuration
1. **Parameters Position** (`parametersPosition`):
   Available values from the system:
   - **FirstPageHeaderOnly**: Show only on first page header
   - **AllPagesHeader**: Repeat on every page header  
   - **AllPagesFooter**: Show on every page footer
   - **None**: Don't display parameters in report
   - **GroupHeader**: Display in group headers
   - **GroupFooter**: Display in group footers
   - **LastPageFooter**: Show only on last page footer
   - **Summary**: Display in summary section

2. **Number of Parameters in Row** (`numberOfParametersInRow`): Columns per row (1-4)

3. **Parameters Grid Specs**:
   - Height, font size, colors
   - Alignment and spacing
   - Border and background

### Advanced Parameter Features

#### Cascading Parameters
Parameters that depend on other parameters:
1. Country selection filters available cities
2. Department selection filters employees
3. Year selection determines available months

#### Hidden Parameters
System-calculated values:
- Current user
- Current date/time
- Organization unit
- Security context

#### Parameter Validation
- Required field validation
- Format validation (email, phone, etc.)
- Range validation
- Custom validation expressions

### Using Groups as Parameters

Enable users to select grouping at runtime:
1. **Use Groups as Parameter**: Enable option
2. **Configure**: Which group levels are selectable
3. **Runtime**: User chooses grouping structure

---

## Crosstab Reports

### Understanding Crosstabs

Crosstabs (pivot tables) transform row-based data into a matrix format, ideal for comparative analysis across multiple dimensions.

### Basic Structure
```
                 Column Dimension →
                 Jan    Feb    Mar    Total
Row       North   100    150    125    375
Dimension South   200    175    225    600
    ↓     East    150    160    180    490
          Total   450    485    530   1465
```

### Crosstab Configuration

#### Row Fields (Vertical Dimension)
1. **Select Row Fields**: Choose fields for vertical grouping
2. **Row Order**: Determines hierarchy
3. **Row Parameters**: Allow runtime selection
   - **Select as Parameter**: Enable user selection
   - **Parameters Count**: Max selectable fields
   - **Title Prefix**: Parameter label prefix

#### Column Fields (Horizontal Dimension)
1. **Select Column Fields**: Choose fields for horizontal grouping
2. **Column Order**: Determines hierarchy
3. **Column Parameters**: Allow runtime selection
   - **Select as Parameter**: Enable user selection
   - **Parameters Count**: Max selectable fields
   - **Title Prefix**: Parameter label prefix

#### Measures (Values)
1. **Select Measure Fields**: Values to aggregate
2. **Aggregation Type**: SUM, COUNT, AVG, MIN, MAX
3. **Display Format**: Number format, decimals
4. **Multiple Measures**: Support for multiple value fields

### Crosstab Display Options

#### Cell Configuration
- **Cell Width**: Width in pixels
- **Cell Height**: Height in pixels
- **Ignore Width**: Auto-size based on content
- **Display Measures Vertically**: Stack multiple measures

#### Visual Settings
- **Show Grid**: Display cell borders
- **Use White Grid**: Light border color
- **Color Scheme**: Apply to crosstab structure

### Advanced Crosstab Features

#### Dynamic Dimensions
Allow users to select dimensions at runtime:
1. Enable parameter selection
2. Provide dimension choices
3. Report adapts to selection

#### Calculated Measures
Create derived values:
- Percentages of totals
- Growth calculations
- Ratios and indices
- Custom formulas

#### Drill-Down Support
Click on cells to see details:
- Link to detail reports
- Pass cell context as parameters
- Maintain navigation context

---

## Visual Formatting

### Color Schemes

#### Predefined Schemes

The `colorScheme` field provides extensive color options. Key schemes include:

**Professional/Business Colors:**
- **Aliceblue**: Light blue professional theme
- **Ghostwhite**: Clean white-based theme  
- **Lightgray**: Professional gray theme
- **Silver**: Metallic corporate theme
- **Gainsboro**: Subtle gray professional

**Vibrant Colors:**
- **Blue**: Classic blue scheme
- **Green**: Nature-inspired green
- **Red**: Bold red theme
- **Purple**: Rich purple scheme  
- **Orange**: Energetic orange theme

**Neutral/Print-Friendly:**
- **White**: Clean white background
- **Black**: High contrast black theme
- **Gray**: Standard gray scheme

::: details Complete Color List (100+ Options)
The system supports over 100 predefined colors including: Aliceblue, Antiquewhite, Aqua, Aquamarine, Azure, Beige, Bisque, Black, Blanchedalmond, Blue, Blueviolet, Brown, Burlywood, Cadetblue, Chartreuse, Chocolate, Coral, Cornflowerblue, Cornsilk, Crimson, Cyan, and many more. Each color can be applied with variations (Default, Light, Dark).
:::

#### Color Variations
- **Default**: Standard scheme colors
- **Light**: Lighter shade variants
- **Dark**: Darker shade variants

#### Component Colors
Configure colors for each report element:

1. **Headers and Totals**
   - **Total Color**: Background for total rows
   - **Total Text Color**: Text in total rows
   - **Group Color**: Group header background
   - **Group Text Color**: Group header text

2. **Data Areas**
   - **Measures Color**: Measure cell background
   - **Measures Text Color**: Measure cell text
   - **Detail Color**: Data row background
   - **Detail Text Color**: Data row text

3. **Alternating Rows**
   - **Line by Line Coloring**: Enable alternating colors
   - **Even Line Background**: Even row background
   - **Even Line Foreground**: Even row text

### Band Specifications

Each band (section) has configurable properties:

#### Column Header Band
- **Height**: Header row height
- **Font Size**: Header text size
- **Bold**: Make headers bold
- **Alignment**: Left/Center/Right
- **Background**: Header background color

#### Detail Band
- **Height**: Data row height
- **Font Size**: Data text size
- **Padding**: Cell padding
- **Borders**: Cell borders

#### Summary Band
- **Height**: Summary section height
- **Font Size**: Total text size
- **Style**: Bold, italic, underline
- **Separator**: Line above totals

### Grid Configuration

#### Grid Display Options
1. **Show the Grid**: Display table borders
2. **Use White Grid**: Light gray borders
3. **Grid Style**: Solid, dotted, dashed

#### Grid Line Configuration
- **Vertical Lines**: Column separators
- **Horizontal Lines**: Row separators
- **Outer Border**: Table frame
- **Inner Borders**: Cell divisions

### Conditional Styling

Apply formatting based on data values:

#### Style Conditions (5 Available Grids)
1. **Condition Expression**: When to apply style
2. **Style Properties**: What to change
3. **Priority**: Order of evaluation

#### Common Conditional Styles
- **Negative Values**: Red text for negative numbers
- **Thresholds**: Color based on ranges
- **Status Indicators**: Color by status field
- **Highlights**: Bold important values

#### Example Conditions
```
$F{amount} < 0           → Red text
$F{status} == "Urgent"    → Bold + Yellow background
$F{score} >= 90          → Green background
$V{ROW_COUNT} % 2 == 0   → Alternate row color
```

### Background Images

#### Image Configuration
1. **Upload Image**: JPEG, PNG, or GIF
2. **Opacity**: 0-255 (0=transparent, 255=opaque)
3. **Size**: Width and height in pixels
4. **Position**: X and Y coordinates

#### Image Use Cases
- **Watermarks**: Company logo at low opacity
- **Letterhead**: Official document template
- **Forms**: Pre-printed form backgrounds
- **Security**: Copy protection patterns

#### Field Transparency
- **Make Fields Transparent**: Blend with background
- **Keep Fields Opaque**: Solid field backgrounds

---

## Advanced Features

### Security Constraints

#### Row-Level Security
Filter data based on user permissions:
1. **User-Based**: Show only user's data
2. **Role-Based**: Filter by user role
3. **Organization**: Limit to user's organization
4. **Custom Rules**: Complex security logic

#### Field-Level Security
Control field visibility:
- Hide sensitive fields
- Mask partial data
- Conditional visibility

### Jasper Variables

Create custom variables for calculations:

#### Variable Types
1. **Sum**: Running or group totals
2. **Count**: Record counts
3. **Average**: Mean calculations
4. **Min/Max**: Extreme values
5. **Custom**: User expressions

#### Variable Configuration
- **Name**: Variable identifier
- **Expression**: Calculation formula
- **Reset Type**: When to reset value
- **Initial Value**: Starting value

### Header Components

Add custom elements to report headers:

#### Component Types
1. **Static Text**: Labels and titles
2. **Dynamic Fields**: Current date, page numbers
3. **Images**: Logos and graphics
4. **Parameters**: Display parameter values
5. **Custom**: Expression-based content

#### Component Layout
- Position components precisely
- Layer multiple components
- Conditional display

### Data Source Features

#### Subqueries
Use data sources as subqueries:
```sql
-- Main query gets customers
-- Subquery gets order count per customer
SELECT c.*, 
  (SELECT COUNT(*) FROM orders WHERE customerId = c.id) as orderCount
FROM customers c
```

#### Union Handling

Union Handling expressions allow you to transform and differentiate data from each source table in union queries:

**Purpose**: Apply different logic or transformations to data depending on which table it comes from.

**Common Use Cases**:
1. **Sign Conversion**: Make returns negative while keeping sales positive
2. **Source Identification**: Add labels to identify which system the data comes from
3. **Value Transformations**: Apply different calculations per source
4. **Data Standardization**: Normalize different formats to a common structure

**Configuration**:
- Each field can have a union handling expression
- Expression determines how to process the field value from each source
- Can reference the source table to apply conditional logic


**Field Mapping with Different Column Names**:
When union tables don't share the same column names, you can map them:
- Main Table column: `customer_name`
- Union Table column: `client_name`
- System maps these as the same field in the report

---

## Report Output and Export

### Running Reports

#### Execution Options
1. **Run Report**: Generate and display
2. **Download Report**: Save to file
3. **Email Report**: Send to recipients
4. **Schedule Report**: Automatic generation

#### Output Formats

1. **PDF**
   - High-quality printing
   - Embedded fonts
   - Searchable text
   - Bookmarks and links

2. **Excel**
   - Data export with formatting
   - Auto-filter enabled

3. **HTML**
   - Web browser viewing
   - Interactive elements

### Print Options

#### Direct Printing
- Send directly to printer
- Printer selection
- Copies and collation
- Page range selection

#### Print Settings
- Paper size matching
- Orientation handling
- Margin adjustment
- Scale to fit

---

## Performance Optimization

### Query Optimization

#### Use Temp Tables vs CTEs
- **CTEs**: Better for smaller datasets
- **Temp Tables**: Better for large datasets
- **Configuration**: `useTempTablesInsteadOfCTE`

#### Pagination Control
- **Enable**: Load data in pages
- **Disable**: Load all data at once
- **Configuration**: `ignorePagination`

### Sorting Optimization

#### Before Groups Sort
- Sort data before grouping
- Improves group performance
- Configuration: `usedBeforeGroupsSort`

#### Database vs Report Sorting
- **Database**: Faster for large datasets
- **Report**: Required for calculated fields

### Data Loading Strategies

#### Lazy Loading
- Load data as needed
- Reduce initial load time
- Better for large reports

#### Eager Loading
- Load all data upfront
- Better for small reports
- Faster navigation

### Index Utilization

#### Ensure Indexes Exist For:
- JOIN columns
- WHERE clause columns
- ORDER BY columns
- GROUP BY columns

### Report Design Best Practices

1. **Limit Fields**: Only include necessary fields
2. **Optimize Expressions**: Simple expressions perform better
3. **Reduce Groups**: Fewer group levels = faster processing
4. **Aggregate Early**: Use SQL aggregation when possible
5. **Filter Early**: Apply WHERE clauses to reduce data

---

## Common Use Cases

### Sales Reports

#### Monthly Sales Summary
1. Main Table: SalesInvoice
2. Groups: Month, Region, Salesperson
3. Measures: Total Sales, Count, Average
4. Parameters: Date range, Region filter

#### Customer Sales Analysis
1. Main Table: Customer
2. Data Source 2: SalesInvoice (linked)
3. Groups: Customer Category, Customer
4. Measures: YTD Sales, Last Year Sales, Growth %

### Financial Reports

#### Income Statement
1. Main Table: GeneralLedger
2. Groups: Account Type, Account
3. Measures: Debit, Credit, Balance
4. Special: Hide zero balances

#### Aged Receivables
1. Main Table: AccountsReceivable
2. Groups: Aging Buckets (0-30, 31-60, etc.)
3. Measures: Outstanding Amount
4. Parameters: As-of date

### Inventory Reports

#### Stock Status Report
1. Main Table: InventoryItem
2. Data Source 2: StockMovement
3. Groups: Category, Item
4. Measures: On Hand, Available, On Order

#### Movement Analysis
1. Main Table: StockMovement
2. Groups: Period, Movement Type
3. Crosstab: Items × Months
4. Measures: Quantity, Value

### HR Reports

#### Employee List
1. Main Table: Employee
2. Groups: Department, Position
3. Fields: Name, Hire Date, Salary
4. Security: Salary visibility by role

#### Attendance Summary
1. Main Table: Attendance
2. Crosstab: Employee × Date
3. Measures: Hours, Overtime
4. Conditional Style: Highlight absences

---

## Troubleshooting

### Common Issues and Solutions

#### Report Runs Slowly
**Causes & Solutions:**
1. **Large Dataset**: Enable pagination, use filters
2. **Complex Expressions**: Simplify or move to SQL
3. **Many Groups**: Reduce grouping levels
4. **Missing Indexes**: Add database indexes

#### Data Not Appearing
**Check:**
1. WHERE conditions excluding data
2. Security constraints limiting access
3. JOIN conditions too restrictive
4. Parameter default values

#### Incorrect Totals
**Verify:**
1. Aggregation type (SUM vs COUNT)
2. Group reset settings
3. Duplicate data from JOINs
4. NULL value handling

#### Formatting Issues
**Review:**
1. Pattern configuration
2. Locale settings
3. Font availability
4. Color scheme selection

### Validation Errors

#### "Fields grid validation failed"
- Check field references are valid
- Ensure expressions are syntactically correct
- Verify field types match usage

#### "Group validation failed"
- Ensure group fields are selected
- Check group expressions are valid
- Verify group totals configuration

#### "Parameter validation failed"
- Parameter names must be unique
- Default values must match type
- Required parameters need defaults

### Performance Tips

#### For Large Reports (>10,000 rows)
1. Use database sorting
2. Enable pagination
3. Limit visible fields
4. Use summary reports with drill-down

#### For Complex Calculations
1. Pre-calculate in database views
2. Use jasper variables efficiently
3. Cache repeated calculations
4. Optimize expression complexity

#### For Multiple Data Sources
1. Use appropriate join types
2. Consider subqueries for aggregations
3. Limit cross-products
4. Filter early in each source

### Debug Mode Features

When troubleshooting:
1. **View Generated SQL**: See actual query
2. **Expression Evaluation**: Test expressions
3. **Preview with Sample Data**: Limited dataset
4. **Execution Plan**: Database query plan
5. **Performance Metrics**: Time per phase

---

## Best Practices

### Report Design

1. **Start Simple**: Begin with basic report, add features gradually
2. **Test Incrementally**: Verify each section works before adding more
3. **Use Templates**: Copy successful reports as starting points
4. **Document Purpose**: Use descriptions and comments

### Naming Conventions

1. **Report Codes**: Use prefixes (FIN_*, HR_*, SALES_*)
2. **Field Aliases**: Meaningful names for expressions
3. **Parameter Names**: Clear, user-friendly labels
4. **Group Names**: Hierarchical naming

### Maintenance

1. **Version Control**: Keep report backup before major changes
2. **Change Documentation**: Document modifications
3. **Test After Updates**: Verify after entity changes
4. **Regular Review**: Audit report usage and performance

### Security

1. **Least Privilege**: Only grant necessary access
2. **Test Security**: Verify constraints work correctly
3. **Audit Sensitive Reports**: Log access to confidential data
4. **Regular Reviews**: Update security as roles change

### User Experience

1. **Clear Parameters**: Provide helpful parameter descriptions
2. **Meaningful Defaults**: Set sensible default values
3. **Consistent Formatting**: Use standard formats across reports
4. **Helpful Totals**: Include relevant subtotals and grand totals
5. **Error Messages**: Provide clear guidance when issues occur

---

## Appendix

### Field Type Reference
- `TextDF`: Text fields
- `IntegerDF`: Whole numbers
- `DecimalDF`: Decimal numbers
- `BooleanDF`: True/False values
- `DateDF`: Date fields
- `DateTimeDF`: Date and time fields
- `LongTextDF`: Large text fields
- `FieldID`: Entity field references

### SQL Aggregation Functions
- `SUM()`: Total of values
- `COUNT()`: Number of rows
- `COUNT(DISTINCT)`: Unique values
- `AVG()`: Average value
- `MIN()`: Minimum value
- `MAX()`: Maximum value
- `GROUP_CONCAT()`: Concatenated text
- `STDDEV()`: Standard deviation
- `VARIANCE()`: Statistical variance

### Jasper Expression Functions
- `$F{fieldname}`: Field value
- `$P{parameter}`: Parameter value
- `$V{variable}`: Variable value
- `$R{resource}`: Resource bundle
- `PAGE_NUMBER`: Current page
- `REPORT_COUNT`: Total records
- `ROW_COUNT`: Current row

### Date Format Patterns
- `dd/MM/yyyy`: 31/12/2024
- `MM/dd/yyyy`: 12/31/2024
- `yyyy-MM-dd`: 2024-12-31
- `dd MMM yyyy`: 31 Dec 2024
- `MMMM dd, yyyy`: December 31, 2024
- `EEEE, MMMM dd, yyyy`: Tuesday, December 31, 2024

### Number Format Patterns
- `#,##0`: 1,234
- `#,##0.00`: 1,234.00
- `#,##0.00;(#,##0.00)`: 1,234.00 or (1,234.00)
- `0.00%`: 12.34%
- `$ #,##0.00`: $ 1,234.00
- `00000`: 01234

### Color Codes (Hex)
- `#000000`: Black
- `#FFFFFF`: White
- `#FF0000`: Red
- `#00FF00`: Green
- `#0000FF`: Blue
- `#FFFF00`: Yellow
- `#808080`: Gray
- `#E6E6E6`: Light Gray

---

## Technical Appendix

### Complete Entity Structure

::: details ReportWizard Entity Technical Details
**Entity Information:**
- **Entity Type**: ReportWizard
- **Arabic Name**: أداة إنشاء تقرير
- **English Name**: Report Wizard  
- **Database Table**: ReportWizard
- **Classification**: Master File (not Document File)

**Key Header Fields:**
- **Layout & Design**: `layoutMethod`, `pageFormat`, `pageOrientation`, `colorScheme`, `variation`
- **Data Sources**: `mainTable`, `dataSource1`-`dataSource5`, `tableType`, `entityType`
- **Sorting**: `sortMethod`, `sortParametersCount`, `ascendingOrDescending`, `usedBeforeGroupsSort`
- **Grouping**: `useGroupsAsParameter`, `startNewPageGroup1`-`startNewPageGroup5`
- **Performance**: `useTempTablesInsteadOfCTE`, `ignorePagination`, `usedBeforeGroupsSort`
- **Security**: View, update, and usage capabilities with row-level constraints
- **Crosstab**: `crosstabCellWidth`, `crosstabCellHeight`, `displayCrosstabMeasuresVertically`

**Complete Collection List (32 Collections):**
1. **fields** (الحقول) - Field definitions
2. **parameters** (المدخلات) - Parameter configurations  
3. **userAliases** - User-defined field aliases
4. **headerComponents** - Header layout components
5. **sortFields** (حقول الترتيب) - Database sort field definitions
6. **group1Lines** through **group5Lines** (سطور المجموعة 1-5) - 5-level grouping
7. **group1HeaderCustomExpressionLines** through **group5HeaderCustomExpressionLines** - Group header expressions
8. **group1FooterCustomExpressionLines** through **group5FooterCustomExpressionLines** - Group footer expressions
9. **unionTables** - Union table configurations
10. **whereLines** - WHERE clause conditions
11. **jasperSortFieldsLines** - Jasper sort configurations
12. **jasperVariables** - Custom Jasper variables
13. **dataSource1FilterLines** through **dataSource5FilterLines** - Multi-source filtering
14. **dataSource1LinkingLines** through **dataSource5LinkingLines** - Multi-source linking
15. **printWhenExpressionLines** - Conditional printing rules
16. **crosstabColumns** (الأعمدة) - Crosstab column fields
17. **crosstabRows** (الصفوف) - Crosstab row fields  
18. **crosstabMeasures** (المعادلات) - Crosstab measure fields
19. **securityConstraints** - Security constraint rules
20. **conditionalStyleLines1** through **conditionalStyleLines5** (جدول التنسيق الشرطي 1-5) - 5 grids of conditional formatting
21. **includeTablesByParameters** (تضمين الجداول بشرط من خلال مدخلات) - Dynamic table inclusion

**Enum Field Values:**
- **sortMethod**: `SortBasedOnSortFields` (ترتيب محدد من خلال حقول الترتيب), `SortBasedOnReportParameter` (ترتيب من خلال مدخلات يقوم باختيارها المستخدم)
- **parametersPosition**: `FirstPageHeaderOnly`, `AllPagesHeader`, `AllPagesFooter`, `None`, `GroupHeader`, `GroupFooter`, `LastPageFooter`, `Summary`
- **colorScheme**: 100+ predefined colors from `Aliceblue` to `Yellowgreen`
- **layoutMethod**: `Manual`, `FromUploadedFile`, `FromEditor`
:::

### Integration with Nama ERP

The ReportWizard integrates deeply with the Nama ERP system:

- **Entity Integration**: Can report on any entity in the system
- **Security Integration**: Respects user permissions and organizational constraints  
- **Multi-Language**: Full Arabic/English support in field names and UI
- **Performance Optimization**: Advanced query optimization and caching
- **Export Capabilities**: Multiple output formats (PDF, Excel, HTML)

---

This comprehensive documentation provides users with detailed information about every aspect of the ReportWizard, from basic setup to advanced features, complete with examples, best practices, troubleshooting guidance, and technical implementation details using accurate system translations and field information.