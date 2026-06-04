# Pricing and Offers Management Guide

This comprehensive guide covers the pricing system in Nama ERP, including price lists, sales offers, and automated pricing mechanisms that help maintain accurate and competitive pricing throughout your sales processes.

## Overview

Nama ERP provides a sophisticated pricing engine that supports:
- **Sales Price Lists** (قوائم أسعار) - Fixed pricing structures for items
- **Sales Offers** (عروض) - Discount-based promotional pricing  
- **Automated Price Updates** - System-driven price adjustments
- **Multi-dimensional Pricing** - Support for customer classes, seasons, and classifications

## Sales Price Lists (قوائم أسعار)

### Navigation
**Menu Path**: Sales > Prices And Offers > Price List  
**Arabic Path**: المبيعات > قوائم الأسعار والعروض > قائمة أسعار

### Purpose
Sales Price Lists define standardized pricing structures for inventory items, allowing businesses to maintain consistent pricing across different customer segments, time periods, and business scenarios.

### Key Features

#### Header Configuration

**Basic Information:**
- **Code** (رمز) - Unique identifier for the price list
- **Name** (اسم) - Descriptive name for easy identification
- **Priority** (أولوية) - Determines which price list takes precedence when multiple apply
- **Currency** (عملة) - Base currency for all prices in the list

**Date Range Management:**
- **From Date** (من تاريخ) - Start date when prices become effective
- **To Date** (إلى تاريخ) - End date when prices expire
- **From Time/To Time** - Optional time-specific pricing

**Customer Targeting:**
- **Customer** (عميل) - Link to specific customers, customer classes, or categories
- **Invoice Classification** (تصنيف فاتورة) - Apply to specific invoice types
- **Price Classifiers 1-5** (مصنف سعر) - Multi-dimensional classification system

#### Price List Details

Each price list contains comprehensive detail lines with extensive configuration options:

**Item Identification & Selection:**
- **Item** (صنف) - Primary inventory item for pricing
- **Item Code** (رمز الصنف) - Alternative item identification method
- **Item Dimensions** - Complete dimensional support:
  - Color, Size, Revision ID, Lot ID, Serial Numbers (first and second)
  - Box, Measures, Sub-item, Warehouse, Locator specifications
  - Active/Inactive percentages for item variants
- **Apply On Items** (تطبيق على الأصناف) - Link to item groups or pricing ranges
- **Apply Only If Item In Invoice** (تطبيق فقط إذا كان الصنف في الفاتورة) - Conditional pricing activation

**Pricing Structure:**
- **Default Price** (سعر افتراضي) - Standard selling price for the item
- **Custom Price** (سعر مخصص) - Override price for special circumstances
- **Min Price** (أدنى سعر) - Minimum allowable selling price
- **Max Price** (أعلى سعر) - Maximum allowable selling price
- **Price After Tax 1/2** (السعر بعد الضريبة 1/2) - Tax-inclusive pricing options
- **This Unit Only** (هذه الوحدة فقط) - Unit-specific price constraints

**Quantity & UOM Configuration:**
- **Quantity** (كمية) - Minimum purchase quantity for price tier
- **Max Qty** (أقصى كمية) - Maximum quantity for this price level
- **Unit of Measure** (وحدة قياس) - Pricing UOM specification
- **Qty In Base UOM** (الكمية بوحدة القياس الأساسية) - Converted base unit quantity

**Customer & Classification Targeting:**
- **Customer** (عميل) - Specific customer, class, or category targeting
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price classification
- **Dimensions** (أبعاد) - Generic dimensional constraints
- **Invoice Classification** (تصنيف فاتورة) - Document type specific pricing
- **Security Capability** (صلاحية أمنية) - User permission requirements

**Time & Lot Management:**
- **From Date/To Date** (من تاريخ/إلى تاريخ) - Price validity period
- **From/To Lot ID** (من/إلى رقم دفعة) - Lot-specific pricing periods

**Advanced Features:**
- **Stop Discounts** (إيقاف الخصومات) - Prevents discount applications on this item
- **Selected For Price Change** (محدد لتغيير السعر) - Marks items for bulk price updates
- **Free Item Is Same As Invoice Item** (الصنف المجاني هو نفس صنف الفاتورة) - Self-referential pricing
- **Deactivate Price List** (إلغاء تفعيل قائمة الأسعار) - Line-level deactivation
- **Origin** (أصل) - Reference to source price list for traceability

**Display & Reference Fields:**
- **Color Name** (اسم اللون) - Display name for item color
- **Size Name** (اسم المقاس) - Display name for item size  
- **Revision Name** (اسم المراجعة) - Display name for item revision

**Extended Data Storage:**
- **Numeric Fields (n1-n5)** - Custom numeric data
- **Reference Fields (ref1-ref5)** - Custom reference data
- **Text Fields (text1-text5)** - Custom text information
- **Date Fields (date1-date5)** - Custom date tracking

**System Tracking:**
- **Created From Order ID/Line ID** - Tracks price list generation from sales orders for audit purposes

#### Advanced Pricing Features

**Price Updaters (محدثات الأسعار):**
The system provides a sophisticated 5-stage price update mechanism with comprehensive calculation and rounding capabilities:

**Update Process Overview:**
The `updatePrices` GUI action orchestrates price updates through a sequential 5-stage process, where each updater can be configured independently and operates on the result of the previous stage.

**Sequential Processing Logic:**
1. **Stage 1**: Source price → Price Updater 1 → Destination Field 1
2. **Stage 2**: Previous result → Price Updater 2 → Destination Field 2  
3. **Stage 3**: Previous result → Price Updater 3 → Destination Field 3
4. **Stage 4**: Previous result → Price Updater 4 → Destination Field 4
5. **Stage 5**: Previous result → Price Updater 5 → Final Destination Field

**Source Field Configuration:**
- **Source Field** (حقل المصدر) - Defines the starting price for calculations:
  - Default Price, Custom Price, Min Price, Max Price
  - Item cost-based fields, last sales price
  - Fixed Price - Uses header-level fixed price value
- **Fixed Price** (سعر ثابت) - Header-level fixed amount used when source field is "FixedPrice"

**Destination Field Mapping:**
- **Destination Field** (حقل الوجهة) - Final target field for price updates
- **Destination Fields 1-4** (حقل الوجهة 1-4) - Intermediate stage targets
- **Default behavior**: If no destination specified, uses source field as destination

**Price Updater Configuration (Per Stage):**
Each of the 5 price updaters supports:

**Operation Types** (نوع العملية):
- **Add** (جمع) - Adds value/percentage to current price
- **Subtract** (طرح) - Subtracts value/percentage from current price  
- **Multiply** (ضرب) - Multiplies current price by value (percentages not allowed)
- **Divide** (قسمة) - Divides current price by value (percentages not allowed)

**Value Types** (نوع القيمة):
- **Fixed Value** (قيمة ثابتة) - Absolute monetary amount
- **Percentage** (نسبة مئوية) - Percentage of current price (only with Add/Subtract operations)

**Rounding Control** (ضبط التقريب):
- **Rounding Type** (نوع التقريب) - Mathematical rounding method
- **Rounding Value** (قيمة التقريب) - Precision level for rounding
- **Currency Scale** - Automatic decimal place adjustment based on currency configuration

**Line Applicability Control:**
- **Applied On Lines** (تطبيق على الخطوط):
  - **All** (الكل) - Apply to all price list lines
  - **Selected** (المحددة) - Only lines marked with "Selected for Price Change"
  - **Not Selected** (غير المحددة) - Lines not marked for price changes

**Validation & Error Handling:**
- **Percentage Validation**: System prevents percentage values with multiply/divide operations
- **Empty Updater Handling**: Skips processing for empty updater configurations  
- **Currency Integration**: Automatically applies currency-specific decimal scaling
- **Line Filtering**: Respects line-level applicability settings

**Bulk Item Collection (`collectItems` Action):**
Automated item collection for price list population with comprehensive filtering:

**Range-Based Selection:**
- **Item Range** (من صنف/إلى صنف) - Item code range selection
- **Category Ranges** (من فئة/إلى فئة) - 5-level category filtering
- **Classification Ranges** (من تصنيف/إلى تصنيف) - 5-level item class filtering
- **Brand Range** (من علامة/إلى علامة) - Brand-based selection
- **Section Range** (من قسم/إلى قسم) - Departmental section filtering
- **Dimensional Ranges** - Branch, sector, analysis set, department filtering

**Automatic Spreading Options:**
- **Spread Units** (نشر الوحدات) - Creates lines for all item UOM variants
- **Spread Revisions** (نشر المراجعات) - Includes all item revision variants
- **Spread Colors/Sizes** (نشر الألوان/الأحجام) - Expands for all color/size combinations

**Average Cost Price Calculation (`calculateAverageCostPrice` Action):**
Automated cost-based pricing with real-time cost calculation:

**Configuration:**
- **Average Cost Field** (حقل متوسط التكلفة) - Source field for cost calculation
- **Destination Field** (حقل الوجهة) - Target field for calculated prices
- **Applied On Lines** (تطبيق على الخطوط) - Line applicability control

**Calculation Process:**
- Retrieves real-time average costs from inventory system
- Considers item dimensions (color, size, revision, lot) in cost calculation
- Applies business dimensional constraints (branch, department, legal entity)
- Updates specified destination fields with calculated costs

**Additional Utility Actions:**
- **Copy Deactivate Status** - Propagates header deactivation flag to all lines
- **Add Additional Source Lines** - Merges lines from additional source price lists
- **Spread Selected Line Data** - Expands selected lines across dimensions

**Automated Spreading:**
- **Spread Units** (نشر الوحدات) - Automatically create lines for all item UOMs
- **Spread Revisions** (نشر المراجعات) - Include all item revisions  
- **Spread Sizes/Colors** (نشر الأحجام/الألوان) - Expand for all variants

### Price List Management

#### Creating Price Lists

1. **Navigate** to Sales > Prices And Offers > Price List
2. **Set Header Information**:
   - Enter unique code and descriptive name
   - Define date range for validity
   - Set priority level (lower numbers = higher priority)
   - Select target customers or customer groups

3. **Configure Price Updates** (Optional):
   - Set up to 5 price updaters for automated calculations
   - Choose source fields (cost, previous price, etc.)
   - Define mathematical operations and rounding rules

4. **Add Detail Lines**:
   - Select items manually or use bulk import
   - Configure item dimensions and quantities
   - Set prices or use updaters for automatic calculation

#### Bulk Price Updates

**From Source Documents:**
- **Source** (مصدر) - Import from existing price lists, invoices, or orders
- **Additional Source** (مصدر إضافي) - Combine multiple sources
- **Include Discounts** (تضمين الخصومات) - Factor in promotional pricing

**Filter Criteria:**
- Item ranges (From Item to To Item)
- Category ranges across 5 classification levels
- Department, branch, sector filtering
- Analysis set constraints

### System Integration

#### Price Resolution Logic

When determining prices, the system follows this hierarchy:

1. **Document-Specific Pricing** - Manual overrides on sales documents
2. **Active Price Lists** - Based on priority, date, and customer matching
3. **Last Sales Price** - Historical pricing when enabled in configuration
4. **Item Master Price** - Default item selling price
5. **Cost-Plus Pricing** - Calculated from item cost with markup

#### Real-Time Price Updates

The pricing engine automatically:
- Validates date ranges and customer eligibility
- Applies quantity-based tiered pricing
- Calculates tax implications
- Considers contract pricing agreements
- Factors in promotional offers and discounts

## Sales Offers (عروض)

### Navigation  
**Menu Path**: Sales > Prices And Offers > Sales Offer  
**Arabic Path**: المبيعات > قوائم الأسعار والعروض > عرض

### Purpose
Sales Offers provide sophisticated discount and promotion management, enabling businesses to create complex promotional campaigns with multiple discount types, free items, and conditional applications.

### Offer Types and Collections

#### 1. Item Discounts (خصومات الأصناف)
**Collection**: `details` (التفاصيل)  
**Table**: `ItemDiscountLine`

Provides sophisticated item-specific discount structures with comprehensive targeting and conditional logic:

**Item Targeting & Selection:**
- **Item** (صنف) - Specific inventory item for discount application
- **Item Code** (رمز الصنف) - Alternative item identification method
- **Item Dimensions** - Full dimensional support including:
  - Color, Size, Revision ID, Lot ID, Serial Numbers
  - Box, Measures, Sub-item specifications
  - Warehouse and Locator specific pricing
- **Related Items** (أصناف مرتبطة) - Apply to item groups or free item groups
- **Apply On Items** (تطبيق على الأصناف) - Link to free item groups or pricing ranges

**Category & Classification Filters:**
- **Categories 1-5** (فئة 1-5) - Multi-level category targeting
- **Item Classes 1-10** (تصنيف صنف 1-10) - Extended classification system
- **Brand** (علامة تجارية) - Brand-specific discounts
- **Section** (قسم) - Departmental item grouping

**Discount Configuration:**
- **Discount Location** (وقت حساب التخفيض في الفاتورة) - **Required field** defining when/where discount applies in invoice processing
- **Value or Percent** (قيمة أم نسبة) - Discount calculation method
- **Discount Min Value** (أدنى قيمة خصم) - Minimum discount amount
- **Discount Max Value** (أعلى قيمة خصم) - Maximum discount ceiling  
- **Discount Default Value** (قيمة الخصم الافتراضية) - Standard discount amount
- **Special Discount** (خصم خاص) - Flag for exceptional discount handling

**Quantity & Value Controls:**
- **Quantity** (كمية) - Minimum purchase quantity for discount eligibility
- **Max Qty** (أقصى كمية) - Maximum quantity for tiered pricing
- **Min Item Value to Apply Discount** - Individual item value threshold
- **Max Item Value to Apply Discount** - Upper item value limit
- **Min Invoice Value to Apply Discount** - Document-level minimum amount
- **Max Invoice Value to Apply Discount** - Document-level maximum amount

**Time & Date Restrictions:**
- **From Date/To Date** (من تاريخ/إلى تاريخ) - Validity period for discount
- **From Time/To Time** (من وقت/إلى وقت) - Daily time window restrictions
- **From/To Lot ID** (من/إلى رقم دفعة) - Lot-specific discount periods

**Advanced Discount Logic:**
- **Accumulate Value By** (تجميع القيمة حسب) - Defines how values are accumulated for discount calculation:
  - Item sections, classes, categories 1-5
  - Master groups, invoice value
- **Apply Offer Discount Once** (تطبيق خصم العرض مرة واحدة) - Prevents multiple applications
- **Stop Same Type Other Discounts** (إيقاف خصومات أخرى من نفس النوع) - Controls discount stacking
- **Sales Items Count Type** (نوع عد أصناف المبيعات) - Method for counting qualifying items

**Conditional Application:**
- **Apply Only If Item In Invoice** (تطبيق فقط إذا كان الصنف في الفاتورة) - Requires specific items presence
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price classification
- **Dimensions** (أبعاد) - Generic dimensional constraints (branch, department, sector, etc.)
- **Security Capability** (صلاحية أمنية) - User permission requirements
- **Subsidiary** (تابعة) - Multi-entity business unit targeting

#### 2. Free Items (الأصناف المجانية)  
**Collection**: `freeItems` (الأصناف المجانية)  
**Table**: `FreeItemLine`

Comprehensive free item management extending base offer line functionality with sophisticated conditional logic:

**Trigger Item Configuration:**
- **Item** (صنف) - Primary item that triggers the free item offer
- **Item Code** (رمز الصنف) - Alternative identification for trigger item
- **Item Dimensions** - Full dimensional support for trigger items:
  - Color, Size, Revision ID, Lot ID, Serial Numbers
  - Box, Measures, Warehouse, Locator specifications
- **Quantity** (كمية) - Required purchase quantity to activate offer
- **Max Qty** (أقصى كمية) - Maximum qualifying quantity

**Free Item Definition:**
- **Free Item Code** (كود الصنف المجاني) - Unique identifier for the free item
- **Free Item Data** (بيانات الصنف المجاني) - **Required** comprehensive free item configuration:
  - **Free Item** (صنف مجاني) - The actual item to be given free
  - **Free Item Dimensions** - Complete dimensional specifications
  - **Free Quantity** (كمية مجانية) - Amount to be provided free
  - **Max Qty** (أقصى كمية) - Limit on free quantity
  - **Free Policy** (سياسة مجاني) - Rules governing free item provision
  - **Replace Policy** (سياسة الاستبدال) - Item replacement rules
  - **Offer Apply Rules** (قواعد تطبيق العرض) - Complex application logic
  - **Taxable** (خاضع للضريبة) - Tax treatment for free items
  - **Manual** (يدوي) - Manual override capability

**Alternative Discount Mode:**
- **Not Free But Discount** (خصم نسبة من السعر بدلا من مجاني) - **Key Feature** - Instead of providing items free, apply percentage discount to the item price
- **Discount Location** (وقت حساب التخفيض في الفاتورة) - Defines where discount is applied in invoice processing
- **Discount Percentage** (نسبة الخصم) - Percentage discount amount when using discount mode

**Category & Classification Targeting:**
- **Categories 1-5** (فئة 1-5) - Multi-level category filtering for trigger items
- **Item Classes 1-10** (تصنيف صنف 1-10) - Extended classification targeting
- **Brand** (علامة تجارية) - Brand-specific free item offers
- **Apply On Items** (تطبيق على الأصناف) - Link to item groups or pricing ranges
- **Apply Only If Item In Invoice** (تطبيق فقط إذا كان الصنف في الفاتورة) - Conditional activation

**Advanced Configuration:**
- **Apply Offer By Slides Way** (تطبيق العرض بطريقة الشرائح) - Specialized application methodology
- **Sales Items Count Type** (نوع عد أصناف المبيعات) - Method for counting qualifying items
- **Item Max Qty** (أقصى كمية للصنف) - Maximum quantity limits per item
- **Free Item Is Same As Invoice Item** (الصنف المجاني هو نفس صنف الفاتورة) - Self-referential offers
- **This Unit Only** (هذه الوحدة فقط) - Unit-specific constraints
- **Do Not Copy Master Item Data** (عدم نسخ بيانات الصنف الرئيسي) - Data inheritance control

**Time & Date Management:**
- **From Date/To Date** (من تاريخ/إلى تاريخ) - Offer validity period
- **From/To Lot ID** (من/إلى رقم دفعة) - Lot-specific offer periods
- **Invoice Classification** (تصنيف فاتورة) - Document type targeting

**Price Classification & Targeting:**
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price targeting
- **Dimensions** (أبعاد) - Generic dimensional constraints
- **Subsidiary** (تابعة) - Multi-entity business unit support

**Extended Data Fields:**
- **Numeric Fields (n1-n5)** - Custom numeric data storage
- **Reference Fields (ref1-ref5)** - Custom reference data
- **Text Fields (text1-text5)** - Custom text information
- **Date Fields (date1-date5)** - Custom date tracking

#### 3. Invoice-Level Discounts (خصومات الفاتورة)
**Collection**: `invDiscountLines`  
**Table**: `InvoiceDiscountLine`

Document-wide discount management with sophisticated threshold and conditional logic:

**Invoice Value Thresholds:**
- **Min Invoice Value** (أدنى قيمة فاتورة) - Minimum document total for discount eligibility
- **Max Invoice Value** (أعلى قيمة فاتورة) - Maximum document total for discount application
- **Min Invoice Items** (أدنى عدد أصناف الفاتورة) - Minimum line item count requirement
- **Max Invoice Items** (أعلى عدد أصناف الفاتورة) - Maximum line item count for eligibility

**Discount Configuration:**
- **Discount Type** (نوع الخصم) - Method of discount calculation (percentage, fixed amount, etc.)
- **Discount Min Value** (أدنى قيمة خصم) - Minimum discount amount to apply
- **Discount Max Value** (أعلى قيمة خصم) - Maximum discount ceiling

**Discount Control Logic:**
- **Stop Other Discounts** (إيقاف خصومات أخرى) - Prevents other discount applications when this discount is applied
- **Consider Stop Other Discounts** (اعتبار إيقاف الخصومات الأخرى) - Respects other discounts' stop flags
- **Ignore Other Offers** (تجاهل العروض الأخرى) - Excludes other promotional offers
- **Ignore Free Items In Count** (تجاهل الأصناف المجانية في العد) - Excludes free items from item count calculations

**Advanced Item Counting:**
- **Items Count Mechanism** (آلية عد الأصناف) - Defines how items are counted for threshold calculations
- **Discount Basis From Matched Lines** (أساس الخصم من الخطوط المطابقة) - Calculates discount only on qualifying line items

**Conditional Application:**
- **Offer Apply Rules** (قواعد تطبيق العرض) - Links to complex rule sets for conditional logic
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price targeting
- **Dimensions** (أبعاد) - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Security Capability** (صلاحية أمنية) - User permission requirements
- **Subsidiary** (تابعة) - Multi-entity business unit targeting

#### 4. Invoice Free Items (أصناف مجانية للفاتورة)
**Collection**: `invOffersLines`  
**Table**: `InvoiceFreeItemLine`

Document-level free item promotions with comprehensive threshold management and dimensional controls:

**Invoice Thresholds:**
- **Min Invoice Value** (أدنى قيمة فاتورة) - Minimum document total to trigger free items
- **Max Invoice Value** (أعلى قيمة فاتورة) - Maximum document total for free item eligibility

**Free Item Configuration:**
- **Free Item Data** (بيانات الصنف المجاني) - Complete free item specification including:
  - **Free Item** (صنف مجاني) - The item to be provided free
  - **Free Item Dimensions** - Full dimensional support (color, size, revision, lot, etc.)
  - **Free Quantity** (كمية مجانية) - Amount to be given free
  - **Max Qty** (أقصى كمية) - Maximum free quantity limit
  - **Free Policy** (سياسة مجاني) - Rules governing free item provision
  - **Replace Policy** (سياسة الاستبدال) - Item replacement logic
  - **Offer Apply Rules** (قواعد تطبيق العرض) - Complex conditional application rules
  - **Taxable** (خاضع للضريبة) - Tax handling for free items
  - **Manual** (يدوي) - Manual override capability
  - **Sold Qty** (كمية مباعة) - Track quantities in sales context

**Discount Control:**
- **Stop Other Discounts** (إيقاف خصومات أخرى) - Prevents other discount applications
- **Consider Stop Other Discounts** (اعتبار إيقاف الخصومات الأخرى) - Respects other discounts' stop flags
- **Ignore Other Offers** (تجاهل العروض الأخرى) - Excludes other promotional offers

**Targeting & Classification:**
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price targeting
- **Dimensions** (أبعاد) - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Security Capability** (صلاحية أمنية) - User permission requirements
- **Subsidiary** (تابعة) - Multi-entity business unit targeting

#### 5. Items Count Offers (عروض عدد الأصناف)
**Collection**: `itemsCountOffers`  
**Table**: `OfferOnItemsCountLine`

Advanced quantity-based promotional system with sophisticated counting mechanisms and flexible reward structures:

**Counting & Threshold Configuration:**
- **Number of Invoice Items** (عدد أصناف الفاتورة) - Minimum item count to trigger offer
- **Items Count Mechanism** (آلية عد الأصناف) - Defines how items are counted and grouped
- **Multiple Policy Mechanism** (آلية سياسة متعددة) - Controls behavior when multiple qualifying groups exist
- **Priority** (أولوية) - Order of evaluation when multiple offers apply
- **Ignore Matched Item To Be Free Qty** (تجاهل الصنف المطابق ليكون كمية مجانية) - Excludes trigger items from free quantity

**Item Targeting & Classification:**
- **Categories 1-5** (فئة 1-5) - Multi-level category targeting for counting
- **Item Classes 1-10** (تصنيف صنف 1-10) - Extended classification system
- **Brand** (علامة تجارية) - Brand-specific counting and rewards
- **Section** (قسم) - Departmental item grouping
- **Items Group** (مجموعة أصناف) - Predefined item collections for counting
- **Free Item Group** (مجموعة الصنف المجاني) - Categories of items available as rewards
- **Free Item Classification** (تصنيف الصنف المجاني) - Classification system for reward items

**Reward Configuration:**
- **Free Item Qty** (كمية الصنف المجاني) - Quantity of free items to provide
- **Free Policy** (سياسة مجاني) - Rules governing free item distribution
- **Not Free But Discount** (خصم نسبة من السعر بدلا من مجاني) - **Alternative Mode** - Apply discount instead of free items
- **Discount Location** (وقت حساب التخفيض في الفاتورة) - Where discount is applied in invoice processing
- **Discount Percentage** (نسبة الخصم) - Percentage discount when using discount mode
- **Discount Value** (قيمة الخصم) - Fixed discount amount option

**Time & Date Management:**
- **From Date/To Date** (من تاريخ/إلى تاريخ) - Offer validity period for this specific count offer

**Control & Exclusion Logic:**
- **Stop Other Discounts** (إيقاف خصومات أخرى) - Prevents other discount applications
- **Ignore Other Offers** (تجاهل العروض الأخرى) - Excludes other promotional offers from consideration

**Targeting & Classification:**
- **Price Classifiers 1-5** (مصنف سعر 1-5) - Multi-dimensional price targeting
- **Dimensions** (أبعاد) - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Subsidiary** (تابعة) - Multi-entity business unit targeting

#### 6. Coupon Management (إدارة قسائم الخصم)
**Collection**: `coupons` (قسائم خصم)  
**Table**: `OfferCouponLine`

Comprehensive coupon and voucher management system with advanced validation and tracking capabilities:

**Coupon Configuration:**
- **Coupon Value** (قيمة القسيمة) - Monetary value or discount amount
- **Coupon Value Type** (نوع قيمة القسيمة) - Defines whether value is percentage, fixed amount, etc.
- **Coupon Period** (فترة القسيمة) - Validity duration with UOM (days, months, etc.)
- **Coupon Used Once** (استخدام القسيمة مرة واحدة) - Single-use restriction
- **Deactivated** (معطلة) - Manual deactivation flag

**Invoice Value Thresholds:**
- **Invoice Value From** (قيمة الفاتورة من) - Minimum invoice amount for coupon eligibility
- **Invoice Value To** (قيمة الفاتورة إلى) - Maximum invoice amount for coupon application

**Generation & Control Logic:**
- **Do Not Create Coupon If Invoice Has** (عدم إنشاء قسيمة إذا كانت الفاتورة تحتوي على) - Conditional coupon creation based on invoice content
- **Sales Items Count Type** (نوع عد أصناف المبيعات) - Method for counting qualifying items for coupon generation
- **Dimensions Copy Method** (طريقة نسخ الأبعاد) - How dimensional data is inherited in coupon creation

**Time & Date Management:**
- **From Date/To Date** (من تاريخ/إلى تاريخ) - Coupon validity period
- **Priority** (أولوية) - Resolution order when multiple coupons apply

**Application Rules:**
- **Offer Apply Rules** (قواعد تطبيق العرض) - Complex conditional logic for coupon application
- **Consider Stop Other Discounts** (اعتبار إيقاف الخصومات الأخرى) - Respects other discounts' exclusion flags

**Targeting & Classification:**
- **Dimensions** (أبعاد) - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Subsidiary** (تابعة) - Multi-entity business unit targeting

### Offer Configuration

#### Header Settings

**Basic Configuration:**
- **Code/Name** (رمز/اسم) - Offer identification
- **Priority** (أولوية) - Resolution order when multiple offers apply
- **Date/Time Range** - Precise scheduling of promotional periods
- **Customer Targeting** - Specific customers, classes, or categories

**Behavior Controls:**
- **Stop Other Discounts** (إيقاف خصومات أخرى) - Prevent discount combination
- **Currency** (عملة) - Offer pricing currency
- **Season** (موسم) - Seasonal promotion linking

**Advanced Features:**
- **Price Classifiers 1-5** - Multi-dimensional targeting
- **Employee Restrictions** - Limit offers to specific sales staff
- **Subsidiary Controls** - Multi-entity business support

#### Offer Logic Implementation

**Discount Cascading:**
The system implements sophisticated discount cascading where:
1. Header-level "Stop Other Discounts" prevents all other discount applications
2. Line-level stops control individual item discount stacking  
3. Priority-based resolution ensures predictable offer application

**Price Updater Integration:**
Sales offers can use the same 5-level price updater system as price lists:
- **Source Field** (حقل المصدر) - Base calculation field
- **Destination Field** (حقل الوجهة) - Target field for updates
- **Mathematical Operations** - Add, subtract, multiply, divide
- **Rounding Control** - Precision management

## System Price Update Mechanisms

### Automated Price Calculation

The system's `SalesPriceUtils.updateLinePriceAndDiscounts()` method orchestrates complex pricing calculations:

#### Price Resolution Process

1. **Tax Calculation** - Recalculates tax percentages if required
2. **Detail Validation** - Removes lines without items
3. **Configuration Loading** - Retrieves system pricing preferences
4. **Base Price Calculation** - Determines starting prices from:
   - Price lists (by priority and eligibility)
   - Last sales prices (if configured)
   - Item master prices
   - Cost-plus calculations

#### Discount Application Sequence

1. **Item-Level Discounts** - Applied first from offers
2. **Header Discount Calculation** - Document-wide discount determination
3. **Discount Cascade Processing** - Applies discounts in priority order
4. **Tax Recalculation** - Updates tax amounts after discounts
5. **Free Item Processing** - Adds qualifying free items
6. **Boundary Validation** - Ensures min/max price compliance

### Integration Points

#### Sales Document Processing

The `updateLinesPrices()` method in `SalesOrderInvoicePostActions` demonstrates real-world price updating:

#### Configuration Controls

The system respects various configuration flags:
- **doNotUpdatePricesAtAll** - Completely disable automatic pricing
- **doNotUpdatePricesWhenThereSalesDocInFromDoc** - Preserve prices from source documents
- **considerValueDateFromFromDocInPricingAndOffers** - Use source document dates for price/offer eligibility

## Advanced Configuration

### Multi-Currency Pricing

When operating across multiple currencies:
- Set base currency at price list level
- Use currency-specific price lists for local markets
- Consider exchange rate fluctuation impact
- Implement currency-specific offer strategies

### Integration with Other Modules

**Inventory Management:**
- Price lists automatically filter for sellable items
- Item availability impacts free item offers
- Inventory dimensions integrate with pricing dimensions

**Customer Management:**
- Customer classes enable group pricing strategies
- Customer credit limits may affect offer eligibility
- Sales territory alignment with pricing regions

**Financial Management:**
- Price changes trigger financial impact reporting
- Margin analysis based on pricing vs. cost data
- Revenue recognition implications for free items

This pricing and offers system provides comprehensive tools for maintaining competitive pricing while maximizing profitability through strategic promotional campaigns and automated price management.