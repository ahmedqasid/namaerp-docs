# Generic Reference Overrider - User Guide (Fields and Entities Settings)
## إعدادات الحقول والشاشات
## Overview
The Generic Reference Overrider is a powerful system configuration entity in Nama ERP that allows administrators to customize and override various field behaviors, validations, and display properties across different entities without modifying the source code. This provides flexibility in adapting the system to specific business requirements.

### Core Concept
In enterprise systems, different organizations have varying business rules, validation requirements, and display preferences. Rather than creating multiple versions of the software or modifying source code, the Generic Reference Overrider provides a configuration-based approach to customize system behavior. 

The system works by intercepting standard field operations (validation, display, search, etc.) and applying custom rules defined in the overrider configurations. These configurations are loaded into memory at startup and cached for performance, with automatic cache invalidation when configurations change.

### Architecture Overview
The Generic Reference Overrider operates through several key components:

1. **DSL Entity Definition** (`GenericReferenceOverrider.java`): Defines the master configuration entity with various detail line types
2. **Utility Cache Layer** (`GenericRefOverriderFromDBUtil.java`): Provides cached access to configurations with thread-safe concurrent hash maps
3. **Detail Line Types**: Specialized configuration lines for different customization aspects
4. **Event-Based Cache Invalidation**: Automatic cache refresh when configurations change
5. **Post Actions System** (`GenericReferenceOverriderPostActions.java`): Provides intelligent field suggestions and validation

::: tip Technical Implementation
The system uses sophisticated auto-suggestion mechanisms that dynamically filter available fields based on:
- Entity type context
- Field type compatibility
- Predefined business rules
- System metadata integration
:::

## Purpose and Benefits

### Key Benefits:
- **No-Code Customization**: Modify system behavior without programming knowledge
- **Entity-Specific Rules**: Apply different rules to different entity types
- **Centralized Configuration**: All customizations in one location
- **Immediate Effect**: Changes apply immediately without system restart
- **Dimension Control**: Override dimension validation rules per business needs

## Detailed Feature Descriptions

### 1. Generic Reference Field Overrides (`GenRefOverriderLine`)

#### Concept and Purpose
Generic reference fields in the system typically allow selection from multiple entity types. For example, a "Reference" field might accept Customers, Suppliers, Employees, or Items. The Generic Reference Override allows you to restrict or modify which entity types are available for selection in specific contexts.

#### How It Works
The system maintains a cached mapping (`genRefTypesMap`) that stores entity type restrictions per field. When a user opens a reference field lookup, the system checks this map to determine which entity types should be available for selection.

::: details Field Suggestion System
The system provides intelligent field suggestions through the `EntityFieldIdsSuggestionUtil` utility:
- **Context-Aware Filtering**: Only shows fields compatible with the selected entity type
- **Field Type Filtering**: Restricts suggestions to `Genericreference` field types
- **Dynamic Updates**: Field suggestions update automatically when entity type changes
- **Discussion Fields**: Optionally includes discussion-related fields in suggestions
:::

#### Configuration Options
- **For Type**: Apply override to a specific entity type (e.g., only SalesInvoice)
- **Entity List**: Apply to multiple entity types using a predefined list
- **Field ID**: The specific field being overridden (e.g., "customer", "item", "reference")
- **Allowed Entities (1-5)**: Up to 5 entity types that should be available for selection
- **Allowed Entity List**: For more than 5 entity types, use a predefined entity list
- **Default Entity Type**: The entity type that should be pre-selected
- **Add to Existing**: Whether to add to existing allowed types or replace them completely


### 2. Visual Indicators and Icons

::: tip Supported Field Types
Icon configurations support different field types depending on the icon type:
- **Field Icons**: All field types
- **Entity Icons**: Applied to entity types globally
- **Enum Icons**: Specific to enumeration fields with dynamic value suggestions
:::

#### Field Icons (`FieldIconLine`)
**Concept**: Add contextual icons to field labels to provide immediate visual feedback about status, priority, or type.

**How It Works**: The system evaluates field values and applies configured icons based on field ids.

**Configuration**:
- **Entity Type/Entity Type List**: Scope of application
- **Field ID**: Target field (e.g., "status", "priority", "type")
- **Icon Code**: Icon identifier
- **Color Code**: Associated color (hex or named color)


#### Entity Icons (`EntityIconLine`)
**Concept**: Apply icons to entire entity types, typically shown in lists and search results.


#### Enum Constant Icons (`EnumConstantIconLine`)
**Concept**: Add icons to enumeration (dropdown lists) values across the system.

**Benefits**: Provides consistent visual language for status values, types, and categories throughout the application.

::: details Enum Management System
**Dynamic Enum Discovery**: The system automatically discovers all available enumeration types from system metadata using `fetchEnumsData()` method.

**Configuration Process**:
1. **Enum Type Selection**: Choose from dynamically suggested enum types
2. **Value Selection**: System provides allowed values specific to the selected enum type
3. **Icon Assignment**: Assign icons and colors to specific enum values

**Technical Implementation**:
- Cached enum metadata for performance
- Real-time value suggestions based on enum type
- Supports all system-defined enumerations
:::

**Examples**:
- Order Status: "Draft" = yellow circle, "Approved" = green check, "Cancelled" = red X
- Priority Level: "High" = red exclamation, "Medium" = orange dash, "Low" = green dot

### 3. Field Display and Formatting

#### Display Masks (`FieldDisplayMask`)
**Concept**: Apply formatting patterns to field values for consistent display without changing stored data.

**Technical Note**: Masks are applied during UI rendering but don't affect database storage.

::: details Supported Field Types
**Compatible Fields**: Integer, Long, Decimal fields only

**Mask Examples**:
- `###,###.##` - Standard number formatting with thousands separator
- `###.00` - Fixed decimal places
- `##.##%` - Percentage formatting
:::

::: tip G2 Display Masks (Advanced)
**Enhanced Formatting Options**:
- `##,#` → "1234 → 1,234" (Thousands separator)
- `##.## \%` → "25.5 → 25.5%" (Percentage with escaped %)
- `##.00` → "25.5 → 25.50" (Fixed decimals)
- `c` → "1234 → $1,123.00" (Currency formatting)
- `##,#.00` → "1234567.56 → 1,234,567.56" (Full number formatting)
:::

#### Field Formats (`FieldFormatLine`)
**Concept**: Control field input validation and formatting rules. This can be applied conditionally based on dynamic queries or criteria definitions.

**Configuration Options**:
- **Max Length**: Maximum number of characters allowed
- **Min Length**: Minimum number of characters required
- **Allow Numbers**: Whether numeric characters are permitted
- **Allow Letters**: Whether alphabetic characters are permitted
- **Mixed Content**: Whether both numbers and letters are allowed
- **Conditional Application**: Apply rules based on dynamic queries or specific criteria

**Use Cases**:
- Restrict item codes to numeric-only format
- Enforce minimum password length requirements
- Allow only letters in name fields
- Apply different validation rules based on document type or status

#### Field Styles (`FieldStyleLine`)
**Concept**: Control field display properties and behavior. This is not conditional styling, but direct field property configuration.

**Configuration Options**:
- **Text Direction**: Set right-to-left (RTL) or left-to-right (LTR) text direction
- **Password Field**: Convert text fields to password fields (showing asterisks or dots)
- **Text Color**: Set the color of the text content
- **Background Color**: Set the background color of the field

**Use Cases**:
- Set Arabic fields to RTL direction
- Convert sensitive fields to password display
- Apply corporate color schemes to specific fields
- Highlight important fields with background colors
- Ensure proper text direction for multilingual applications

### 4. Data Validation and Restrictions

#### Field Allowed Values (`FieldAllowedValues`)
**Concept**: Create custom dropdown lists and restrict field values to predefined options.

**How It Works**: The system maintains a metadata structure (`FieldsAllowedValuesMetadata`) that stores allowed values per entity type and field combination. During data entry, the system validates against these lists.

::: details Supported Field Types
**Compatible Fields**: Text, Integer, Long, Decimal, BigText, Enum, EntityType

**Smart Value Suggestions**: The system provides context-aware suggestions for allowed values based on:
- Field type and existing data patterns
- Entity type context
- Business rules and constraints
:::

**Configuration**:
- **Restrict Values**: Boolean flag to enforce restrictions
- **Allowed Values (1-10)**: Up to 10 predefined values per configuration line
- **Multiple Lines**: Create additional lines for more values

**Business Benefits**:
- Ensure data consistency
- Reduce data entry errors
- Standardize terminology across departments
- Comply with regulatory requirements

#### Maximum Field Length (`MaxFieldLengthInDB`)
**Concept**: Override default database field lengths with business-specific limits for regular systems.

::: details Supported Field Types
**Compatible Fields**: Text, FieldID, Enum, Link, Email, Password, Color, PhoneNumber

**System Integration**: Includes administrative action `updateFieldsMaxLengthInDB` to apply field length changes to the database schema.
:::

**Configuration**:
- **For Type**: Specific entity type
- **Field ID**: The field to limit
- **Max Length**: Maximum number of characters

**Use Cases**:
- Restrict item codes to specific patterns
- Comply with external system integration requirements
- Enforce data consistency across systems
- Prevent excessively long entries

#### Maximum POS Field Length (`MaxPOSFieldLengthInDB`)
**Concept**: Set specific field length limits for Point of Sale systems, typically shorter than regular systems.

::: details POS Entity Recognition
**Automatic POS Detection**: The system automatically identifies POS entities using the `isPosClass()` flag in entity metadata.

**Smart Filtering**: When configuring POS field lengths:
- Only POS entities are suggested in entity type selection
- Field suggestions are limited to Decimal, Text, and Password fields
- System prevents configuration of non-POS entities for POS-specific limits
:::

**Why Separate POS Limits**: POS systems often have constraints due to:
- Receipt printer character limits (typically 40-48 characters per line)
- Small display screens
- Quick transaction requirements
- Thermal printer limitations

**Configuration**:
- **For Type**: Entity type in POS context (automatically filtered to POS entities)
- **Field ID**: The field to limit
- **Max Length**: Maximum characters for POS display/printing

**Common POS Limits**:
- Customer name: 20-25 characters
- Item description: 30 characters
- Address lines: 35 characters
- Payment reference: 15 characters

**Use Cases**:
- Ensure names fit on receipts
- Optimize POS screen display
- Maintain readability on small screens
- Comply with fiscal printer requirements

#### Maximum Line Count (`MaxLineCount`)
**Concept**: Limit the number of detail lines allowed in documents.

::: info Field Type Requirement
**Compatible Fields**: Detail fields only

Line count restrictions apply specifically to detail/collection fields that represent document lines.
:::

**Benefits**:
- Prevent system performance issues
- Enforce business rules (e.g., max 10 items per order)
- Control document complexity
- Manage printing and display constraints

### 5. Dimension Consistency Management

#### Understanding Dimensions
In ERP systems, dimensions represent organizational structures:
- **Branch**: Physical locations or business units
- **Department**: Functional divisions
- **Legal Entity**: Separate legal companies
- **Analysis Set**: Custom analytical groupings

#### Dimension Consistency Rules (`IgnoreDimensionsConsistency`)
**Default Behavior**: The system enforces dimensional consistency, ensuring all related data belongs to the same organizational unit.

**Override Options**:
- **Ignore Branch**: Allow cross-branch transactions
- **Ignore Department**: Enable inter-department operations  
- **Ignore Legal Entity**: Permit inter-company transactions
- **Ignore Analysis Set**: Skip analytical consistency checks
- **Allow Drafts**: Include draft documents in references

**Business Scenarios**:
- Cross-branch inventory transfers
- Shared services across departments
- Inter-company loans and transfers
- Consolidated reporting requirements

### 6. Field State and Behavior Controls

#### Disabled Fields (`DisabledFieldsLines`)
**Concept**: Make specific fields read-only or disabled in the user interface.

**Configuration**:
- **For Type**: Apply to a specific entity type
- **Entity List**: Apply to multiple entity types
- **Field ID**: The field to be disabled

**Use Cases**:
- Prevent editing of calculated fields
- Lock system-generated values
- Protect critical data from accidental modification

#### Allow Usage of Prevented Records (`AllowUsageOfPreventedRecords`)
**Concept**: Override the system's prevention of using certain records that are normally blocked (records with the field preventUsage = true).

**How It Works**: When records are marked as prevented from usage, the system normally doesn't allow them to be selected in reference fields. This configuration allows specific exceptions.

**Use Cases**:
- Allow selection of inactive items for historical reports
- Permit blocked customers for specific operations
- Enable expired contracts for reference purposes
- Allow draft documents in certain workflows

#### Not Color Fields (`NotColorField`)
**Concept**: Prevent specific fields from being treated as color fields, even if they contain color-like values.

**Purpose**: Some text fields might contain values that look like color codes (e.g., "#123456") but shouldn't be rendered as colors.

### 7. Advanced Field Behaviors

#### Rich Text Fields (`RichTextFieldsLines`)
**Concept**: Enable rich text editing (bold, italic, bullets, etc.) for specific text fields.

::: info Field Type Requirement
**Compatible Fields**: BigText fields only

Rich text functionality is specifically designed for large text fields that can accommodate formatted content.
:::

**Use Cases**:
- Product descriptions with formatting
- Contract terms with emphasis
- Email templates with styling
- Report narratives with structure

#### Signature Fields (`SignatureFields`)
**Concept**: Convert attachment fields to display signature icons instead of standard upload icons, enabling digital signature capture.

::: warning Field Type Requirement
**Compatible Fields**: Binary/Attachment fields only

The system automatically filters field suggestions to show only binary fields when configuring signature functionality.
:::

**How It Works**: When configured, attachment fields show a signature button. Clicking this button opens a drawing canvas where users can:
- **Touch Screen Signing**: Sign using finger or stylus on touch-enabled devices
- **Mouse Signing**: Draw signatures using mouse on desktop computers
- **ePad Ink Device Integration**: Capture signatures using specialized signature pad devices with pen input

**Technical Integration**: Supports ePad Ink devices which are professional signature capture devices used in retail, banking, and document processing environments.

**Use Cases**:
- Contract approval signatures
- Delivery confirmation signatures
- Authorization approvals
- Legal document acknowledgments
- Customer consent forms

#### Scanner Integration (`UseScannerInField`)
**Concept**: Configure attachment fields to support direct document scanning from connected scanner devices or multifunction printers with scanning capability.

::: warning Field Type Requirement
**Compatible Fields**: Binary/Attachment fields only

Similar to signature fields, scanner integration is limited to binary field types for proper document storage.
:::

**How It Works**: When applied to attachment fields, this enables:
- **Direct Scan to Field**: Scan documents directly into attachment fields
- **Scanner Device Integration**: Works with connected document scanners
- **Printer-Scanner Combinations**: Supports multifunction devices with scanning capabilities
- **Automatic File Creation**: Scanned documents are automatically saved as attachments

**Technical Requirements**:
- Compatible scanner devices connected to the system
- Proper scanner drivers installed
- Network-connected multifunction printers with scan-to-folder capabilities

**Use Cases**:
- Scan invoices directly to purchase order attachments
- Capture ID documents during customer registration
- Digitize paper contracts and agreements
- Archive physical receipts and documentation
- Streamline document workflow processes

### 8. Code Fields Management

#### Extra Code Fields (`ExtraCode`)
**Concept**: Designate additional fields to function as code fields alongside the primary code field.

**How It Works**: In Nama ERP, entities typically have one primary "code" field for unique identification. This feature allows you to designate other fields to also function as codes, enabling multiple unique identifiers or alternative lookup keys.

**Configuration**:
- **For Type**: Specific entity type
- **For Type List**: Multiple entity types
- **Applicable For**: Use predefined applicability rules (All Screens, Documents, Master Files)
- **Field ID**: The field to treat as an additional code

**Use Cases**:
- Add barcode field as an alternative item code
- Use employee number as additional code beside employee ID
- Create SKU field as secondary product identifier
- Add tax registration number as additional customer code
- Enable multiple reference number systems

**Benefits**:
- Search by multiple unique identifiers
- Support legacy numbering systems
- Enable industry-specific coding standards
- Facilitate integration with external systems

#### Detailed Audit Fields (`DetailedAuditFields`)
**Concept**: Enable detailed audit tracking for specific fields, recording every change with timestamp and user information.

**How It Works**: While the system tracks standard audit information (created/modified by/when), this feature enables granular field-level audit trails for critical data fields.

**Configuration**:
- **For Type**: Specific entity type
- **For Type List**: Multiple entity types
- **Applicable For**: Predefined scope rules
- **Field ID**: The field to track in detail

**Tracked Information**:
- Old value and new value
- User who made the change
- Exact timestamp of change

**Use Cases**:
- Track price changes on items
- Monitor credit limit modifications
- Audit approval status changes
- Record sensitive data modifications
- Maintain compliance audit trails

### 9. Search and Reference Enhancement

#### Reference Descriptors (`ReferenceDescriptorLine`)
**Concept**: Customize how entity records appear in search results and dropdown lists.

**Descriptor Types**:
- **Search Only**: Custom display in search results
- **Title Only**: Custom display in field headers
- **Search and Title**: Both contexts

**Configuration**:
- **Arabic Descriptor**: Custom format for Arabic display
- **English Descriptor**: Custom format for English display
- **Field Placeholders**: Use `{fieldName}` syntax to include dynamic values

**Example**: `{code} - {name} ({branch})` displays as "CUST001 - ABC Company (Branch A)"

#### Extra Reference Search Fields (`ExtraReferenceSearchFields`)
**Concept**: Include additional fields in reference field searches beyond the standard code and name.

**Benefits**:
- Search by phone number in customer lookups
- Find items by barcode or alternative codes
- Locate employees by employee number or department
- Search documents by reference numbers

**Configuration**:
- **Field ID**: Additional field to search in
- **Search Operator**: How to match (contains, equals, starts with)

#### Search in Name for Find by Code (`SearchInNameInFindByCode`)
**Concept**: When users search by code, also search in the name field for matches.

**Use Case**: User types "ABC" expecting to find "ABC Company" even though the code is "CUST001"

### 10. Advanced Query and Display Controls

#### Query-Based Screen Fields (`QueryBasedScreenField`)
**Concept**: Create dynamic, calculated fields that execute queries to display aggregated or computed values.

**How It Works**: Define up to 20 different query-based fields that execute SQL queries and display results in entity screens. These fields are calculated in real-time based on current data.

**Configuration**:
- **For Type/For Type List**: Entity types where fields appear
- **Detail Field**: If displaying in detail lines
- **Field Query (1-20)**: SQL queries for each dynamic field

**Query Capabilities**:
- Aggregate functions (SUM, COUNT, AVG, MIN, MAX)
- Related entity lookups
- Conditional calculations
- Cross-table joins
- Date-based computations

**Use Cases**:
- Show customer's total outstanding balance
- Display item's current stock across all warehouses
- Calculate employee's accumulated leave days
- Show document's approval progress percentage
- Display related transactions count

#### Field Extra Filters (`FieldExtraFilter`)
**Concept**: Apply additional filtering criteria to reference field lookups based on dynamic conditions.

**How It Works**: When users open a reference field lookup, additional filters are applied to limit the available options based on defined criteria.

**Configuration**:
- **For Type**: Entity type containing the field
- **Entity List**: Multiple entity types
- **Field ID**: The reference field to filter
- **Criteria Definition**: The filtering rules to apply
- **Filtered Type**: The entity type being filtered

**Filter Examples**:
- Show only items from specific categories
- Display customers with credit available
- List employees in active departments
- Show documents within date range
- Filter suppliers by payment terms

#### Row Style Overrider (`GenRefRowStyleOverriderLine`)
**Concept**: Apply dynamic background colors to entire rows in grids and lists based on query results.

**How It Works**: Execute a query for each row that returns a color value, which is then applied as the row's background color.

**Configuration**:
- **For Type**: Entity type for the grid
- **Entity List**: Multiple entity types
- **Field ID**: Specific field context (optional)
- **Row Background Color Query**: Query returning color value

**Use Cases**:
- Highlight overdue invoices in red
- Show priority orders in yellow
- Display cancelled items in gray
- Mark VIP customers in gold
- Indicate urgent tasks in orange

### 11. Document and Record Management

#### Duplicate Field Handling (`DuplicatedFieldsLines`)
**Concept**: Specify which fields should be cleared when users duplicate a document.

**How It Works**: When a user selects "Duplicate" on a document, the system clears specified fields while preserving others.

**Common Patterns**:
- Clear document numbers and dates
- Preserve customer and line item details
- Reset approval statuses
- Clear reference numbers

#### Open in Popup (`OpenInPopup`)
**Concept**: Force specific entity types to open in popup windows instead of full-screen navigation.

**Benefits**:
- Faster reference lookups
- Maintain context in parent screen
- Improve user workflow efficiency
- Reduce screen navigation complexity

#### Open Create Fields (`OpenCreateFields`)
**Concept**: Enable users to create new records directly from reference field lookups.

**Workflow**: User starts typing in a reference field, if no match is found, system offers to create a new record with the typed value as a starting point.

#### Text to Link Fields (`TextToLinkFieldsLine`)
**Concept**: Convert text fields into clickable hyperlinks with various link types.

**Configuration**:
- **For Type**: Specific entity type
- **Entity List**: Multiple entity types
- **Field ID**: The text field to convert
- **Link Type**: Type of link (URL, Email, Phone, WhatsApp, etc.)

**Link Types Available**:
- **URL**: Opens web addresses
- **Email**: Opens email client with mailto:
- **Phone**: Initiates phone calls on mobile devices
- **WhatsApp**: Opens WhatsApp with pre-filled number
- **Internal Navigation**: Links to other entities in the system

**Use Cases**:
- Make website fields clickable
- Enable click-to-email for email addresses
- Create click-to-call for phone numbers
- Link to related documents
- Connect to external tracking systems

### 12. Layout and UI Components

#### Add Discussion To (`AddDiscussionTo`)
**Concept**: Add discussion/comments sections to entity screens where they don't exist by default.

**How It Works**: Injects a discussion panel into entity layouts, allowing users to add comments, notes, and threaded discussions.

**Configuration**:
- **For Type/For Type List**: Target entity types
- **Applicable For**: Scope rules
- **Add To Page**: Which page/tab to add the discussion panel
- **Insert At**: Position in the layout (order number)

**Features**:
- Threaded discussions
- File attachments in comments
- Timestamp and user tracking

**Use Cases**:
- Add comments to master data records
- Enable discussions on configuration entities
- Create notes section for items
- Add communication threads to documents
- Enable team collaboration on projects

#### Add Related Documents To (`AddRelatedDocumentsTo`)
**Concept**: Add a related documents section to entity screens for document management.

**Configuration**:
- **For Type/For Type List**: Target entity types
- **Applicable For**: Scope rules
- **Add To Page**: Which page/tab to add the panel
- **Insert At**: Position in the layout

### 13. Integration and External System Support

#### Public Entities (`PublicEntitiesLine`)
**Concept**: Force specific records to have all dimensions set as public, overriding normal dimensional restrictions.

**How It Works**: Normally, when a user logs into a specific legal entity or branch, they can only edit or create records within that dimensional scope. This configuration removes those restrictions for specified entity types.

**Default Behavior**: Users are restricted to their assigned dimensions (legal entity, branch, department, etc.)

**Override Effect**: Records become accessible and editable across all dimensions, regardless of user's assigned dimensional restrictions

**Use Cases**:
- Shared master data (like chart of accounts) accessible to all branches
- Corporate-wide policies and procedures
- System configuration entities that need global access
- Reference data used across multiple legal entities
- Common item catalogs shared across all locations

**Security Considerations**: Use carefully as this bypasses important security boundaries established by the dimensional structure

#### Integrator Config (`IntegratorConfig`)
**Concept**: Configure REST API endpoints for creating and updating entities through external integrations.

**How It Works**: Defines how external systems can send data to create or update records, with field mapping and response templates.

**Configuration**:
- **Created Type**: The entity type to create
- **Created Type Param**: Dynamic type parameter
- **Finder Query**: Query to find existing records for updates
- **Fields Map**: JSON mapping of external to internal fields
- **Response Template**: Custom response format
- **Close Browser Window**: Auto-close after completion
- **Run Entity Flow**: Execute workflow after creation
- **Export Integrator**: Make available for export
- **Create Only**: Prevent updates, only allow creation

**Use Cases**:
- E-commerce platform integration
- Third-party CRM synchronization
- Mobile app data submission
- Partner system integration
- Automated data imports

#### Import Integrator (`ImportIntegratorLine`)
**Concept**: Configure how external data should be imported and mapped to internal entities.

::: details Predefined Integrator IDs
**System Integrators**: The system includes predefined integrator configurations:
- `MAGSaveOrder` - Magento order processing
- `lastEcommerceSyncTime` - E-commerce synchronization timing
- `lastEcommerceOrderId` - Order tracking integration
- `vacbal` - Vacation balance imports
- `shipordstatus` - Shipping order status updates
- `assetTimes` - Asset time tracking
- `assetTimesWithSlots` - Asset scheduling with time slots

**Auto-Configuration**: When selecting an integrator ID, the system automatically applies default settings:
- Import Type: JSON
- Add Record: Enabled
- Update Record: Enabled
- Continue on Errors: Enabled
- Trim Extra Spaces: Enabled
:::

**Features**:
- Field mapping rules
- Data transformation logic
- Validation requirements
- Error handling procedures

#### Email Send To Types (`EmailSendToTypes`)
**Concept**: Configure which entity types can be selected as email recipients for specific email fields.

::: details Predefined Email Field Types
**Available Email Fields**: The system supports predefined email field types:
- `to1`, `to2`, `to3` - Primary recipients
- `cc1`, `cc2`, `cc3` - Carbon copy recipients

**Smart Suggestions**: Field ID suggestions are automatically filtered to show only these predefined email field types.
:::

**Configuration**:
- **Field ID**: The email field being configured (from predefined list)
- **Entity Types (1-5)**: Up to 5 entity types that can be email recipients
- **Send Type**: How emails should be sent (To, CC, BCC)

**Use Cases**:
- Configure customer email notifications
- Set up employee communication fields
- Define supplier correspondence rules
- Establish multi-party email fields
- Control email distribution lists

#### Invoice Retriever Lines (`InvoiceRetrieverLine`)
**Concept**: Configure automatic document generation and retrieval for entities.

**How It Works**: Automatically generates documents (invoices, reports, etc.) when entities are created or modified, storing them in specified locations.

**Configuration**:
- **Report Definition**: The report template to use
- **Save Files In Folder**: File system location for generated documents
- **URL Prefix**: Web access URL prefix
- **Output Format**: PDF, DOCX, XLSX, ODS, ODT
- **Do Not Cache**: Disable caching for dynamic content

**Use Cases**:
- Auto-generate invoices on sale completion
- Create order confirmations automatically
- Generate certificates on approval
- Produce shipping documents
- Create compliance reports

### 14. Auto-Coding and Numbering

#### Automatic Coding (`GenRefAutoCodingLine`)
**Concept**: Generate automatic codes for new records based on configurable patterns.

::: details Criteria Definition Integration
**Smart Entity Type Filtering**: The system provides intelligent filtering for criteria definitions:
- Criteria definitions are filtered to show only those applicable to the selected entity type(s)
- When a criteria definition is selected, the system automatically populates the entity type field
- Supports both single entity types and entity type lists
- Bidirectional relationship ensures consistency between criteria and entity types

**Technical Implementation**: Uses `DTOCriteriaBuilder` to create filtered criteria based on entity type context.
:::

**Pattern Syntax**:
- `{valueDate.year}`: Four-digit year
- `{valueDate.month}`: Two-digit month
- `{branch.code}`: Record branch code

**Examples**:
- Invoice: `INV-{valueDate.year}-` → "INV-2024-000001"
- Purchase Order: `PO-{branch.code}-{fiscalPeriod.shortCode}-` → "PO-HQ-2503-0001"

### 15. System Integration and Repository Features

#### Implementation Repository Integration
**Concept**: Integrate configurations with the implementation repository system for centralized management.

::: info Repository Fields
**System Integration Fields**:
- `saveToImplRepo` - Save configuration to implementation repository
- `systemReport` - Mark as system-wide report configuration
- `implRepo` - Reference to implementation repository entry
- `screenshot` - Visual documentation of the configuration
- `pdfSample` - Sample PDF output for reference
- `attachment1-5` - Additional documentation attachments
- `relatedEntity1-2` - Related entity references
- `relatedToModule1-2` - Module relationship tracking
:::

#### Administrative Actions
**System Maintenance**: The Generic Reference Overrider includes administrative capabilities:

::: tip Available Actions
**updateFieldsMaxLengthInDB**: Applies configured field length restrictions to the database schema.

**Requirements**:
- Configuration must be saved before execution
- Requires appropriate administrative permissions
- Changes are applied immediately to database structure
:::
