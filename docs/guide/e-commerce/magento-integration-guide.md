# Nama ERP E-Commerce Integration Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Module Overview](#module-overview)
3. [Supported E-Commerce Platforms](#supported-e-commerce-platforms)
4. [Core Entities](#core-entities)
   - [MAGMagentoSite](#magmagentosite)
   - [MagentoItemLinker](#magentoitemlinker)
   - [MagentoPriceUpdaterDoc](#magentopriceupdaterdoc)
   - [EcommerceProductConfig](#ecommerceproductconfig)
   - [EcommerceCategoryConfig](#ecommercecategoryconfig)
5. [Integration Workflows](#integration-workflows)
6. [Configuration Guide](#configuration-guide)
7. [Technical Architecture](#technical-architecture)
   - [Webhook Processing](#webhook-processing)
   - [Data Synchronization](#data-synchronization)
   - [Error Handling](#error-handling)
8. [Troubleshooting](#troubleshooting)
9. [Technical Support](#technical-support)
10. [Appendix](#appendix)

---

## Introduction

The Nama ERP E-Commerce Integration module provides seamless connectivity between Nama ERP and various e-commerce platforms. This comprehensive guide covers setup, configuration, and management of e-commerce integrations for end users and technical support staff.

### Key Benefits

- **Multi-Platform Support**: Connect to Magento, Shopify, Salla, BigCommerce, Zid, WooCommerce, and custom e-commerce frameworks
- **Real-Time Synchronization**: Automatic sync of products, prices, inventory, and orders
- **Flexible Configuration**: Customizable field mappings and business rules
- **Comprehensive Tracking**: Full audit trail and error handling

---

## Module Overview

**Module Information:**
- **Arabic Name**: Magento Integration
- **English Name**: Magento Integration
- **Module ID**: magento
- **Menu Path**: ims > Master Files > Magento Site

The module consists of five core entities that work together to provide complete e-commerce integration functionality:

1. **MAGMagentoSite** - Main configuration entity for e-commerce sites
2. **MagentoItemLinker** - Links Nama items with e-commerce platform products
3. **MagentoPriceUpdaterDoc** - Manages price updates to e-commerce platforms
4. **EcommerceProductConfig** - Configures product-specific settings
5. **EcommerceCategoryConfig** - Manages category configurations

---

## Supported E-Commerce Platforms

The integration module supports the following platforms:

### Primary Platforms
- **Magento** (Magento 1.x and 2.x)
- **Shopify**
- **Salla**
- **BigCommerce**
- **Zid**
- **WooCommerce**

### Shipping & Logistics Platforms
- **OTO** - Logistics platform integration for inventory quantity synchronization

### Custom Platforms
The module's flexible architecture allows integration with any custom e-commerce framework through configurable APIs and webhooks.

---

## Core Entities

### MAGMagentoSite

**Entity Type**: MAGMagentoSite  
**Arabic Name**: Magento Site  
**English Name**: Magento Site  
**Type**: Master File  

The MAGMagentoSite entity is the central configuration hub for e-commerce integrations. It defines connection parameters, synchronization settings, and business rules for each connected e-commerce site.

#### Key Configuration Areas

##### Connection Settings
- **URL**: E-commerce site URL
- **Username/Password**: Authentication credentials
- **Gateway Settings**: Client ID, Client Secret, Gateway URL for OAuth
- **API Configuration**: REST API or GraphQL endpoints
- **Webhook Configuration**: Webhook URL and secret for real-time updates

##### Integration Behavior
- **Site Type**: Platform type (Magento, Shopify, Salla, etc.)
- **Integrator Name**: Custom integration identifier
- **Update Capabilities**: Control what data can be synchronized
- **Sync Frequency**: How often to sync data

##### Order Processing
- **Order Import Settings**: Configure how orders are imported from e-commerce platform
- **Document Generation**: Automatic creation of sales documents
- **Customer Creation**: Automatically create customers if they don't exist
- **Payment Method Mapping**: Map e-commerce payment methods to Nama payment types

##### Product Synchronization
- **Item Sync Settings**: Control product data synchronization
- **Price Update Configuration**: Manage pricing synchronization
- **Inventory Management**: Stock level synchronization
- **Product Status Updates**: Active/inactive status management

#### Detail Collections

The MAGMagentoSite entity includes several detail collections for granular configuration:

1. **Payment Methods** (`paymentMethods`)
   - Map e-commerce payment methods to Nama payment types
   - Configure payment method calculation types

2. **Shipping Items** (`shippingItems`)
   - Define shipping service items
   - Configure delivery method mappings

3. **Copy to E-commerce Item Lines** (`copyToEcommerceItemLines`)
   - Define field mappings from Nama items to e-commerce products
   - Specify which item fields to synchronize

4. **Document Generation Info Lines** (`documentGenerationInfoLines`)
   - Configure automatic document creation based on order criteria
   - Define business rules for document generation

5. **E-commerce Event Actions Lines** (`ecommerceEventActionsLines`)
   - Define automated actions triggered by e-commerce events
   - Configure webhook response actions

6. **E-commerce Warehouse Lines** (`ecommerceWarehouseLines`)
   - Map e-commerce warehouse identifiers to Nama warehouses
   - Configure multi-warehouse inventory sync

7. **GraphQL Lines** (`graphQLLines`)
   - Configure GraphQL queries and mutations
   - Define custom GraphQL operations

8. **Update Item Criteria** (`updateItemFor`)
   - Define criteria for when to update item information
   - Configure selective synchronization rules

9. **Update Order Status** (`updateOrderStatusTo`)
   - Map Nama document statuses to e-commerce order statuses
   - Configure order status synchronization

10. **Update Quantity Criteria** (`updateQtyFor`)
    - Define criteria for inventory updates
    - Configure quantity synchronization rules

11. **Related Parent Service Items Query For Qty Update** (`relatedParentServiceItemsQueryForQtyUpdate`)
    - SQL query to find parent service items that should have their quantity updated
    - Enables quantity tracking for service-type bundle products

#### Available Actions

The MAGMagentoSite entity provides numerous actions for managing e-commerce integration:

##### Sales and Order Management
- **Read Sales**: Import sales orders from e-commerce platform
- **Read Sales From Date**: Import sales orders from a specific date
- **Read Returns**: Import return orders
- **ReRead Selected Orders**: Retry importing specific orders

##### Inventory Management
- **Update All Qtys**: Synchronize all inventory quantities
- **Retry Selected Lines**: Retry failed quantity update requests
- **Delete Finished Requests**: Clean up completed sync requests

##### Price Management
- **Price Retry Selected Lines**: Retry failed price update requests
- **Delete Finished Price Requests**: Clean up completed price sync requests

##### Item Management
- **Item Retry Selected Lines**: Retry failed item update requests
- **Delete Item Entries**: Remove item synchronization entries
- **Delete Finished Item Requests**: Clean up completed item sync requests

##### Platform-Specific Actions
- **Read Salla Access Token**: Retrieve Salla platform access token
- **Request Token**: Request authentication token from platform
- **Register Webhooks**: Set up webhook notifications

##### Maintenance Actions
- **Delete Error**: Remove error entries
- **Delete Requests**: Clean up sync requests

### MagentoItemLinker

**Entity Type**: MagentoItemLinker  
**Arabic Name**: ملف ربط الأصناف بموقع ماجنتو (Item Link File with Magento Site)  
**English Name**: ملف ربط الأصناف بموقع ماجنتو  
**Type**: Master File  

The MagentoItemLinker entity creates the crucial link between Nama ERP items and e-commerce platform products. It manages product mappings and ensures data consistency across systems.

#### Key Fields

##### Basic Information
- **Code**: Unique identifier for the linker
- **Magento Site**: Reference to the connected e-commerce site
- **Description Fields**: Multiple description fields for internal reference

##### Linking Configuration
- **Branch/Department/Sector**: Organizational categorization
- **Legal Entity**: Company/legal entity association

#### Detail Collections

1. **Details** (`details`)
   - Contains the actual item-to-product mappings
   - Links Nama items to e-commerce product SKUs
   - Manages product variation mappings

### MagentoPriceUpdaterDoc

**Entity Type**: MagentoPriceUpdaterDoc  
**Arabic Name**: مستند تحديث أسعار ماجنتو (Magento Price Update Document)  
**English Name**: مستند تحديث أسعار ماجنتو  
**Type**: Document File  

The MagentoPriceUpdaterDoc entity is a document-based system for managing price updates to e-commerce platforms. It provides batch processing capabilities for price synchronization.

#### Key Features

##### Document Header
- **Standard Document Fields**: Document number, date, approval workflow
- **Magento Site Reference**: Links to specific e-commerce site configuration
- **Financial Integration**: Supports accounting integration for price changes
- **Customer Information**: Can include customer-specific pricing context

##### Advanced Pricing Features
- **Multi-Currency Support**: Handle different currencies
- **Discount Management**: Complex discount structures
- **Tax Integration**: Tax calculation and synchronization
- **Price Classification**: Support for different price tiers

##### Delivery and Logistics
- **Shipping Integration**: Delivery management fields
- **Location Tracking**: Billing and shipping address management
- **Delivery Scheduling**: Time-based delivery options

#### Detail Collections

1. **Details** (`details`)
   - Contains individual price update line items
   - Specifies items and their new prices
   - Manages price update status and results

### EcommerceProductConfig

**Entity Type**: EcommerceProductConfig  
**Arabic Name**: إعدادات منتج بالمتجر الالكتروني (E-commerce Store Product Settings)  
**English Name**: إعدادات منتج بالمتجر الالكتروني  
**Type**: Master File  

The EcommerceProductConfig entity provides detailed product-level configuration for e-commerce integration. It manages product-specific settings, attributes, and presentation options.

#### Key Configuration Areas

##### Product Identification
- **SKU**: Stock Keeping Unit identifier
- **Item Reference**: Link to Nama ERP item
- **Magento Site**: Associated e-commerce site
- **Product Type**: Type of product (simple, configurable, etc.)

##### Product Hierarchy
- **Parent Product**: For product variations and bundles
- **Attribute Set ID**: Magento attribute set configuration

##### Request Management
- **Last Request Sent**: Tracking of last synchronization attempt
- **Request Status**: Current synchronization status

#### Detail Collections

1. **Category Lines** (`categoryLines`)
   - Manages product category assignments
   - Handles multi-category product placement
   - Category-specific settings and attributes

2. **Custom Attributes Lines** (`customAttributesLines`)
   - Defines custom product attributes
   - Manages attribute values and mappings
   - Platform-specific attribute configuration

3. **Gallery Lines** (`galleryLines`)
   - **Arabic Name**: سطور العرض بالمتجر الالكتروني (E-commerce Store Display Lines)
   - Manages product images and media
   - Controls product presentation in e-commerce platform

4. **Product Attributes Lines** (`productAttributesLines`)
   - Standard product attributes configuration
   - Attribute value management
   - Multi-language attribute support

### EcommerceCategoryConfig

**Entity Type**: EcommerceCategoryConfig  
**Arabic Name**: Ecommerce Category Config  
**English Name**: Ecommerce Category Config  
**Type**: Master File  

The EcommerceCategoryConfig entity manages category-level settings and configurations for e-commerce platforms. It provides control over how product categories are structured and presented.

#### Key Features

##### Category Management
- **Code**: Unique category identifier
- **Magento Site**: Associated e-commerce site
- **Category Hierarchy**: Parent-child category relationships

##### Configuration Settings
- **Standard Master File Fields**: Common configuration options
- **Custom Descriptions**: Multiple description fields for category information

#### Detail Collections

1. **Lines** (`lines`)
   - **Arabic Name**: التفاصيل (Details)
   - Contains detailed category configuration settings
   - Manages category-specific rules and attributes

---

## Integration Workflows

### 1. Initial Setup Workflow

1. **Create MAGMagentoSite Configuration**
   - Configure connection settings (URL, credentials)
   - Set up authentication (OAuth tokens, API keys)
   - Define synchronization preferences

2. **Configure Payment and Shipping Methods**
   - Map e-commerce payment methods to Nama payment types
   - Set up shipping service items and delivery methods

3. **Set Up Product Linking**
   - Create MagentoItemLinker records
   - Map Nama items to e-commerce product SKUs
   - Configure product synchronization rules

4. **Configure Product Details**
   - Create EcommerceProductConfig records for detailed product settings
   - Set up product categories using EcommerceCategoryConfig
   - Configure product attributes and galleries

### 2. Order Processing Workflow

1. **Order Import**
   - System reads orders from e-commerce platform
   - Orders are validated and processed according to configuration
   - Customer records are created automatically if needed

2. **Document Generation**
   - Sales documents are automatically created based on order criteria
   - Inventory is reserved or adjusted as configured
   - Accounting entries are generated if integration is enabled

3. **Order Status Updates**
   - Order status changes in Nama ERP are synchronized back to e-commerce platform
   - Shipping and fulfillment status updates are handled automatically

### 3. Inventory Synchronization Workflow

1. **Inventory Changes in Nama ERP**
   - Stock movements trigger synchronization requests
   - Quantity updates are queued for e-commerce platform

2. **Batch Updates**
   - System processes inventory updates in batches
   - Failed updates are tracked and can be retried

3. **Real-time Sync**
   - Webhook events from e-commerce platform trigger immediate updates
   - Critical stock levels are synchronized in real-time

### 4. Bundle and Service Items Quantity Synchronization

The system now supports advanced quantity tracking for service-type bundle products through the **Related Parent Service Items Query For Qty Update** feature.

#### Understanding the Challenge

Service items in Nama ERP typically don't track quantities because they represent non-physical products (like warranties, installations, or bundles). However, in e-commerce platforms, these service items might represent product bundles that need quantity tracking based on their physical components.

#### Common Use Case: Furniture Retail

A furniture retailer might have:
- **Physical Items**:
  - King Size Bed (SKU: BED-KING)
  - Queen Size Bed (SKU: BED-QUEEN)
  - Nightstand (SKU: NIGHT-01)
  - Dresser (SKU: DRESS-01)

- **Service/Bundle Items**:
  - Master Bedroom Set (SKU: ROOM-MASTER) - Contains 1 King bed, 2 nightstands, 1 dresser
  - Guest Bedroom Set (SKU: ROOM-GUEST) - Contains 1 Queen bed, 1 nightstand

#### Configuration

To enable quantity tracking for service bundles, configure the `relatedParentServiceItemsQueryForQtyUpdate` field with an SQL query that returns parent service items when a component's quantity changes.

**Example Query**:
```sql
-- Find all service items that contain the current physical item as a component
SELECT DISTINCT parent.id
FROM InvItem parent
INNER JOIN ItemBundleComponents bundle ON bundle.parent_id = parent.id
WHERE bundle.component_id = {item.id}
  AND parent.itemType = 'Service'
  AND bundle.item = {dimensions.item.id}
```
::: tip 
Any field accessible from the `ItemDimensionsQty` object is available to the query
::: 
#### How It Works

1. **Physical Item Quantity Changes**: When a physical item's quantity changes (e.g., King Size Bed stock updated)

2. **Query Execution**: The system executes the configured query to find all parent service items containing this physical item

3. **Service Item Update**: For each parent service item found:
   - A virtual quantity record is created or updated
   - The quantity is incremented to trigger e-commerce synchronization
   - The e-commerce platform receives the update

4. **E-commerce Sync**: The service bundle's availability is updated on the e-commerce platform based on component availability


### 5. Price Management Workflow

1. **Price Updates**
   - Create MagentoPriceUpdaterDoc for batch price updates
   - Define price changes and approval workflow
   - Process approved price changes to e-commerce platform

2. **Dynamic Pricing**
   - Real-time price calculation based on Nama ERP price lists
   - Customer-specific pricing support
   - Currency conversion and tax calculation

---

## Configuration Guide

### Setting Up a New E-Commerce Site

#### Step 1: Basic Site Configuration

1. Navigate to **ims > Master Files > Magento Site**
2. Create a new MAGMagentoSite record
3. Configure basic settings:
   ```
   Code: [Unique site identifier]
   Name: [Descriptive site name]
   URL: [E-commerce site URL]
   Site Type: [Platform type - Magento, Shopify, etc.]
   ```

#### Step 2: Authentication Setup

Configure authentication based on your platform:

**For Magento:**
```
Username: [Admin username]
Password: [Admin password]
Use GraphQL: [Enable if using GraphQL API]
```

**For OAuth-based platforms (Shopify, BigCommerce):**
```
Gateway Client ID: [OAuth client ID]
Gateway Client Secret: [OAuth client secret]
Gateway URL: [OAuth authorization URL]
```

**For Token-based platforms (Salla, Zid):**
```
Authorization Code: [Platform authorization code]
Zid Manager Token: [For Zid platform]
Zid Store ID: [For Zid platform]
```

**For OTO Shipping Platform:**
```
Site Type: OTOUpdater
Password: [API refresh token from OTO platform]
Ecommerce Warehouse Lines: [Required - Map OTO location codes to Nama warehouses]
```

#### Step 3: Synchronization Settings

Configure what data to synchronize:

```
Send Items To Magento: [Enable product sync]
Link Items: [Enable item linking]
Read Orders From Date: [Starting date for order import]
Max Orders Per Read: [Batch size for order processing]
Update All Item Qtys: [Enable inventory sync]
```

#### Step 4: Business Rules Configuration

Set up business rules:

```
Create Customer If Not Exist: [Auto-create customers]
Update Customer If Exist: [Update existing customer data]
Create Invoice For Returns If Invoice Not Found: [Handle returns]
Put Coupon Discount To: [Where to apply coupon discounts]
Put Header Discount In Line Discount: [Discount distribution]
```

### Configuring Product Synchronization

#### Item Linking Setup

1. Create MagentoItemLinker records
2. In the Details collection, map:
   - Nama Item Code → E-commerce SKU
   - Product variations and options
   - Attribute mappings

#### Product Configuration

1. Create EcommerceProductConfig records for each product
2. Configure:
   - Product type (simple, configurable, bundle)
   - Parent product relationships
   - Custom attributes and values
   - Image gallery settings

#### Category Configuration

1. Create EcommerceCategoryConfig records
2. Set up category hierarchy
3. Configure category-specific settings

### Payment Method Configuration

1. In MAGMagentoSite, go to Payment Methods collection
2. Add entries mapping:
   - E-commerce payment method names → Nama payment types
   - Payment calculation methods
   - Special handling rules

### Shipping Configuration

1. In MAGMagentoSite, go to Shipping Items collection
2. Configure:
   - Shipping service items
   - Delivery method mappings
   - Shipping cost calculations

---

## Technical Architecture

### Webhook Processing

The e-commerce integration module uses a sophisticated webhook processing system to handle real-time events from connected platforms.

#### EcommerceWebhookProcessor

The `EcommerceWebhookProcessor` class (`com.namasoft.modules.magento.domain.utils.EcommerceWebhookProcessor`) handles incoming webhook events from e-commerce platforms:

**Key Features:**
- **Batch Processing**: Processes webhook events in configurable batches (default 300 events)
- **Multi-Site Support**: Handles webhooks from multiple e-commerce sites simultaneously
- **Event Prioritization**: Sorts events by creation date for proper sequence processing
- **Transaction Management**: Each webhook event is processed within its own transaction context
- **Error Recovery**: Continues processing even if individual events fail

**Processing Flow:**
1. Retrieves active sites with webhook integration enabled
2. Fetches pending webhook events from gateway for each site
3. Sorts all events chronologically across sites
4. Processes each event individually with error handling
5. Updates last read timestamp after processing

**Configuration Properties:**
```properties
# Enable webhook processing in debug mode
run-ecommerce-webhook-in-debug=true

# Number of webhook events to read per batch
read-ecommerce-webhook-events-page-size=300
```

### Data Synchronization

#### Real-Time Synchronization

The module supports multiple synchronization mechanisms:

1. **Push Synchronization**
   - Triggered by changes in Nama ERP
   - Updates sent to e-commerce platform via API
   - Supports inventory, price, and product data

2. **Pull Synchronization**
   - Scheduled or manual retrieval from e-commerce platforms
   - Imports orders, customers, and returns
   - Configurable polling intervals

3. **Webhook-Based Synchronization**
   - Real-time event notifications from e-commerce platforms
   - Immediate processing of critical events (orders, cancellations)
   - Reduces API polling overhead

#### Synchronization Queue Management

The system uses internal queues to manage synchronization requests:

- **MAGUpdateQtyRequestEntry**: Manages inventory update requests
- **MAGUpdatePriceRequestEntry**: Handles price synchronization
- **MAGUpdateItemRequestEntry**: Manages product data updates

Each queue entry tracks:
- Request status (pending, processing, completed, failed)
- Retry count and last attempt timestamp
- Error messages for failed attempts
- Related entity references

### Error Handling

#### Error Recovery Mechanisms

1. **Automatic Retry Logic**
   - Exponential backoff for failed requests
   - Configurable maximum retry attempts
   - Smart retry based on error type

2. **Error Logging and Notification**
   - Detailed error logs with stack traces
   - Email notifications for critical failures
   - Dashboard alerts for operational issues

3. **Manual Recovery Tools**
   - "Retry Selected Lines" actions for failed requests
   - "ReRead Orders" for order import failures
   - Error cleanup utilities

#### Error Types and Resolution

| Error Type | Common Causes | Resolution Steps |
|------------|--------------|------------------|
| Authentication Failed | Expired tokens, wrong credentials | Use "Request Token" action, verify credentials |
| Network Timeout | Slow connection, large payload | Increase timeout settings, reduce batch size |
| Data Validation | Missing required fields, format issues | Check field mappings, validate data formats |
| Rate Limiting | Too many API requests | Implement throttling, adjust sync frequency |
| Concurrent Update | Race conditions | Enable semaphore locking, sequential processing |

---

### Error Management

#### Viewing Errors
- Use system error logs to identify specific issues
- Review failed synchronization requests
- Check webhook event logs for real-time sync issues

#### Cleaning Up Errors
- Use "Delete Error" action to remove resolved error entries
- Use "Delete Finished Requests" actions to clean up completed sync requests
- Regular maintenance prevents system clutter

## Technical Support

### Diagnostic Tools

#### Available Actions for Troubleshooting

1. **Read Sales**: Test order import functionality
2. **Update All Qtys**: Force complete inventory synchronization
3. **Request Token**: Test authentication connectivity
4. **Register Webhooks**: Verify webhook configuration

#### Log Analysis

The system maintains detailed logs for:
- API requests and responses
- Synchronization attempts and results
- Error conditions and resolution attempts
- Performance metrics

#### Support Information Collection

When contacting technical support, provide:

1. **Site Configuration**: 
   - MAGMagentoSite configuration details
   - Platform type and version
   - Authentication method used

2. **Error Details**:
   - Specific error messages
   - Time and frequency of errors
   - Affected entities and operations

3. **Data Samples**:
   - Sample orders that fail to import
   - Products with synchronization issues
   - Configuration screenshots

### Best Practices

#### Security
- Regularly rotate API keys and tokens
- Use HTTPS for all e-commerce site connections
- Implement proper access controls
- Monitor authentication logs

#### Performance
- Schedule bulk operations during off-peak hours
- Monitor system resources during large synchronizations
- Use incremental synchronization when possible
- Regular maintenance of completed requests

#### Data Integrity
- Regularly verify synchronization accuracy
- Implement data validation rules
- Monitor for duplicate records
- Maintain backup configurations

### Contact Information

For technical support:
- Review system logs and error messages
- Use diagnostic actions to test functionality
- Document specific error conditions and steps to reproduce
- Contact your system administrator or Nama ERP support team

---

::: tip Integration Success Tips
- Start with a test environment before configuring production systems
- Configure one platform integration at a time
- Test all workflows thoroughly before going live
- Monitor initial synchronization closely
- Keep authentication credentials secure and up to date
:::

::: warning Important Considerations
- Always backup your configuration before making changes
- Test authentication and connectivity before configuring synchronization
- Monitor system performance during initial bulk synchronization
- Ensure proper access controls are in place for e-commerce integration users
:::

::: info Module Documentation
This guide covers the Nama ERP E-Commerce Integration module. For additional technical details, API references, or custom integration requirements, consult your system administrator or technical documentation.
:::

---

## Appendix

### A. Field Mappings Reference

#### Standard Product Field Mappings

| Nama ERP Field | E-commerce Field | Data Type | Notes |
|----------------|------------------|-----------|-------|
| Item.Code | SKU | String | Unique product identifier |
| Item.Name1 | Product Name | String | Primary product name |
| Item.Description1 | Short Description | Text | Brief product description |
| Item.Description2 | Description | Text | Detailed product description |
| Item.SalesPrice | Price | Decimal | Regular selling price |
| Item.SpecialPrice | Special Price | Decimal | Promotional price |
| Item.Weight | Weight | Decimal | Product weight for shipping |
| Item.Barcode | Barcode/EAN | String | Product barcode |
| Item.Active | Status | Boolean | Enabled/Disabled status |

#### Customer Field Mappings

| Nama ERP Field | E-commerce Field | Data Type | Notes |
|----------------|------------------|-----------|-------|
| Customer.Code | Customer ID | String | Unique customer identifier |
| Customer.Name1 | First Name | String | Customer first name |
| Customer.Name2 | Last Name | String | Customer last name |
| Customer.Email | Email | Email | Primary email address |
| Customer.Mobile | Phone | String | Primary phone number |
| Customer.TaxRegNo | VAT Number | String | Tax registration number |
| Customer.CreditLimit | Credit Limit | Decimal | Maximum credit allowed |

### B. Platform-Specific Configuration

#### Magento 2.x Configuration

**Required Extensions:**
- REST API enabled
- OAuth authentication configured
- Webhook module installed (for real-time sync)

**API Endpoints:**
```
Base URL: https://yourstore.com/rest/V1/
OAuth URL: https://yourstore.com/oauth/
Webhook URL: https://yourstore.com/webhooks/
```

**Required Permissions:**
- Catalog (Read/Write)
- Sales (Read/Write)
- Customers (Read/Write)
- Inventory (Read/Write)

#### Shopify Configuration

**Required Setup:**
- Private app created with appropriate permissions
- Webhook notifications configured
- API version 2024-01 or later (GraphQL API 2025-04 recommended)

**API Configuration:**
```
API Key: [From private app]
API Secret: [From private app]
Access Token: [Generated after app installation]
API Version: 2025-04 (for GraphQL)
```

#### Shopify GraphQL Integration Details

The Nama ERP system uses Shopify's GraphQL API for efficient data synchronization and operations. This section provides technical details for support staff to understand and troubleshoot the Shopify GraphQL integration.

##### GraphQL API Architecture

**Endpoint Configuration:**
- **Base URL**: `https://[store-name].myshopify.com/admin/api/2025-04/graphql.json`
- **Authentication**: X-Shopify-Access-Token header
- **API Version**: 2025-04 (latest stable version with full GraphQL support)

**Core Integration Classes:**
- `ShopifyQraphQLApi`: Main API client for GraphQL operations
- `ShopifyProductsQLApi`: Product-specific GraphQL operations
- `ShopifyOrdersQLApi`: Order management GraphQL operations

##### Supported GraphQL Operations

The integration supports the following GraphQL operations defined in `EcommerceGraphEntityOperation`:

| Operation | Purpose | GraphQL Query/Mutation |
|-----------|---------|------------------------|
| `ProductCreate` | Create new products | `productSet` mutation |
| `ProductUpdate` | Update existing products | `productSet` mutation with ID |
| `ProductPriceUpdate` | Update product prices | `productVariantsBulkUpdate` mutation |
| `ProductSpecialPriceUpdate` | Set special/sale prices | `productVariantsBulkUpdate` with compareAtPrice |
| `ProductQuantityUpdate` | Update inventory quantities | `inventorySetQuantities` mutation |
| `GetOrderList` | Retrieve orders | `orders` query with pagination |
| `GetOrderById` | Get specific order | `order` query by ID |
| `GetProductById` | Get product by ID | `productByIdentifier` query |
| `GetProductList` | List all products | `products` query with pagination |
| `GetProductBySku` | **Search product by SKU** | `products` query with SKU search filter |
| `UpdateOrderStatusAndComment` | Update order notes | `orderUpdate` mutation |

##### Product SKU Search Optimization

**Previous Implementation Issues:**
- The system previously fetched all products and searched locally for SKUs
- This caused API throttling with large product catalogs
- Performance degraded with catalogs over 1000 products

**Current Optimized Implementation:**
```graphql
query GetProductBySku($sku: String!, $nestedLinesSize: Int!) {
  products(first: 1, query: $sku) {
    nodes {
      title
      status
      id
      variants(first: $nestedLinesSize) {
        nodes {
          id
          sku
          title
          inventoryItem { id measurement { weight { value }}}
          price
          inventoryQuantity
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "sku": "sku:YOUR_PRODUCT_SKU",
  "nestedLinesSize": 250
}
```

**Key Benefits:**
- Single API call instead of paginating through all products
- Shopify's server-side search using `query` parameter
- Prevents API rate limiting
- Sub-second response times regardless of catalog size

##### GraphQL Query Configuration

**Dynamic Query Building:**
The system dynamically builds GraphQL queries based on the operation type. Each operation has:
1. Query/Mutation template
2. Variables mapping
3. Field selection based on requirements

**Variable Field Mapping:**
The system uses a special notation for mapping Nama ERP fields to GraphQL variables:
- `namaFieldId`: Specifies the field path to extract from Nama entities
- `.emptyStringIfNull`: Returns empty string if field is null
- `.dashIfBlank`: Returns "-" if field is empty or null

Example variable configuration:
```java
map.put("sku", ShopifyQLUtils.fieldMap("productsApi.productInfo.sku"));
map.put("price", ShopifyQLUtils.fieldMap("item.currentPrice.primitiveValue"));
```

##### Error Handling and Throttling

**Rate Limiting:**
- Shopify GraphQL API has cost-based rate limiting
- Each query has a calculated cost based on complexity
- System monitors `X-Shopify-API-Call-Limit` header

**Error Response Handling:**
```java
// ShopifyQLUtils.throwsExceptionIfError checks for:
- GraphQL errors in response
- User errors in mutations
- Network and authentication errors
```

**Retry Mechanism:**
- Automatic retry with exponential backoff
- Maximum 3 retry attempts
- Special handling for throttling errors (429 status)

##### Webhook Integration

**Supported Webhook Topics:**
- `orders/create` - New order placed
- `orders/updated` - Order status changed
- `orders/cancelled` - Order cancelled
- `products/update` - Product information changed
- `inventory_levels/update` - Stock level changed

**Webhook Processing:**
- Webhooks are processed by `EcommerceWebhookProcessor`
- Events are batched (default 300 events)
- Chronological processing across multiple sites
- Transaction isolation for each event

##### Product Synchronization Details

**Product Field Mappings:**
```java
// Core product fields synchronized
- title → Item.Name1
- description → Item.Description1
- status → Item.Active
- variants.sku → Item.Code
- variants.price → Item.SalesPrice
- variants.compareAtPrice → Item.SpecialPrice
- variants.inventoryQuantity → Item.AvailableQty
```

**Variant Management:**
- Each product variant is mapped to a unique SKU
- Parent-child relationships maintained
- Inventory tracked at variant level
- Pricing per variant supported

##### Order Processing Workflow

**Order Import Process:**
1. Query orders using date range or after_id pagination
2. Transform Shopify order structure to Nama format
3. Create/update customer records
4. Generate sales documents based on configuration
5. Update order status back to Shopify

**Order Status Mapping:**
| Shopify Status | Nama Status | Notes |
|---------------|-------------|-------|
| pending | Draft | Payment pending |
| authorized | Approved | Payment authorized |
| paid | Confirmed | Payment received |
| fulfilled | Delivered | Order shipped |
| cancelled | Cancelled | Order cancelled |
| refunded | Returned | Full refund issued |

##### Inventory Management

**Multi-Location Support:**
- Shopify locations mapped to Nama warehouses
- Inventory levels tracked per location
- Transfer orders supported

**Inventory Update Query:**
```graphql
mutation UpdateInventory($calculatedQuantityArray: [InventorySetQuantityInput!]!) {
  inventorySetQuantities(input: $calculatedQuantityArray) {
    inventoryItem {
      id
      inventoryLevels {
        edges {
          node {
            location { id name }
            available
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

##### Performance Optimization Tips

**For Technical Support:**

1. **Batch Operations:**
   - Use bulk mutations for multiple updates
   - Group similar operations together
   - Limit batch size to 100 items

2. **Query Optimization:**
   - Request only required fields
   - Use pagination for large result sets
   - Implement cursor-based pagination

3. **Caching Strategy:**
   - Cache product mappings locally
   - Store webhook signatures for deduplication
   - Maintain GraphQL query cache

4. **Monitoring:**
   - Track API call costs in response headers
   - Monitor webhook delivery success rate
   - Log query execution times

##### Troubleshooting GraphQL Issues

**Common Problems and Solutions:**

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Rate Limiting | 429 errors, "Throttled" message | Reduce batch sizes, implement delays |
| Query Timeout | No response after 30s | Simplify query, reduce nested fields |
| Invalid SKU Search | Product not found by SKU | Ensure SKU format: "sku:VALUE" |
| Mutation Errors | userErrors in response | Check required fields, validate data types |
| Authentication Failed | 401 errors | Verify access token, check permissions |

**Debug Mode:**
Enable GraphQL debug logging:
```properties
shopify.graphql.debug=true
shopify.graphql.log.queries=true
shopify.graphql.log.responses=true
```

**Testing GraphQL Queries:**
Use the GraphQL testing action in MAGMagentoSite:
1. Navigate to the site configuration
2. Use "Test GraphQL Query" action
3. Enter operation type and test data
4. Review response and errors

##### Required Shopify App Permissions

For full GraphQL integration, ensure the following scopes are enabled:

**Products:**
- `read_products` - Read product information
- `write_products` - Create/update products
- `read_inventory` - Read inventory levels
- `write_inventory` - Update inventory

**Orders:**
- `read_orders` - Import orders
- `write_orders` - Update order status
- `read_customers` - Access customer data
- `write_customers` - Create/update customers

**Additional:**
- `read_locations` - Multi-location support
- `read_shipping` - Shipping information
- `read_fulfillments` - Fulfillment status

#### Salla Configuration

**Required Setup:**
- OAuth app registered in Salla Partner Portal
- Webhook endpoints configured
- Store ID obtained

**OAuth Configuration:**
```
Client ID: [From Salla app]
Client Secret: [From Salla app]
Redirect URL: [Your callback URL]
```

#### OTO Platform Configuration

**Platform Overview:**
OTO (https://tryoto.com/) is a logistics and shipping platform that provides warehouse and inventory management services. The Nama ERP integration with OTO focuses exclusively on **inventory quantity synchronization** to OTO warehouses.

**Integration Scope:**
- **Supported**: Inventory quantity updates to OTO warehouse locations
- **NOT Supported**: Product creation, price updates, order processing

**Required Setup:**
1. Obtain API refresh token from OTO platform dashboard
2. Identify your OTO warehouse location codes
3. Map OTO locations to Nama ERP warehouses

**API Configuration:**
```
Site Type: OTOUpdater
URL: https://api.tryoto.com/ (or your OTO instance URL)
Password: [API refresh token from OTO platform]
```

**Warehouse Mapping (Required):**
In the MAGMagentoSite configuration, you **must** configure the `ecommerceWarehouseLines` collection:


**Quantity Synchronization Behavior:**
- Updates are sent using the `createInventoryOrder` API endpoint
- Action type is always "inbound" for quantity updates
- Quantities are sent per warehouse location based on SKU
- Each warehouse location is updated independently
- Failed updates are tracked and can be retried

**Limitations:**
- Product information (name, description, price) cannot be synchronized
- Orders cannot be imported or updated
- Only supports inventory quantity updates
- Requires products to already exist in OTO system

### C. Database Tables Reference

#### Core Integration Tables

| Table Name | Description | Key Fields |
|------------|-------------|------------|
| MAGMagentoSite | E-commerce site configurations | id, code, url, siteType |
| MagentoItemLinker | Item-to-product mappings | id, magentoSite, code |
| MagentoItemLinkerLine | Individual item links | itemId, sku, magentoItemId |
| MagentoPriceUpdaterDoc | Price update documents | id, documentNo, issueDate |
| MagentoPriceUpdaterLine | Price update line items | itemId, newPrice, status |
| EcommerceProductConfig | Product configurations | id, item, sku, attributeSetId |
| EcommerceCategoryConfig | Category configurations | id, code, magentoSite |

#### Synchronization Queue Tables

| Table Name | Description | Key Fields |
|------------|-------------|------------|
| MAGUpdateQtyRequestEntry | Inventory sync queue | id, itemId, quantity, status, retryCount |
| MAGUpdatePriceRequestEntry | Price sync queue | id, itemId, price, status, retryCount |
| MAGUpdateItemRequestEntry | Product sync queue | id, itemId, status, lastAttempt |
| MAGSiteError | Error log entries | id, errorType, errorMessage, timestamp |

### D. System Properties Configuration

#### Core Properties

```properties
# E-commerce Integration Properties
# ===================================

# Webhook Processing
run-ecommerce-webhook-in-debug=false
read-ecommerce-webhook-events-page-size=300

# Order Processing
max-orders-per-read=100
order-processing-batch-size=50
order-import-timeout=300000

# Inventory Synchronization
inventory-sync-enabled=true
inventory-sync-interval=300
inventory-sync-batch-size=500

# Price Synchronization
price-sync-enabled=true
price-sync-interval=600
price-sync-batch-size=200

# Error Handling
max-retry-attempts=3
retry-delay-seconds=60
error-notification-email=admin@company.com

# Performance Tuning
concurrent-sync-threads=5
api-request-timeout=30000
connection-pool-size=10
```

### E. Troubleshooting Checklist

#### Initial Setup Checklist

- [ ] E-commerce platform API credentials obtained
- [ ] MAGMagentoSite record created and configured
- [ ] Authentication tested using "Request Token" action
- [ ] Webhook URL registered (if applicable)
- [ ] Payment methods mapped
- [ ] Shipping methods configured
- [ ] Test order successfully imported
- [ ] Test product successfully synchronized

#### Daily Operations Checklist

- [ ] Check for failed synchronization requests
- [ ] Review error logs for critical issues
- [ ] Verify inventory levels are accurate
- [ ] Confirm orders are importing correctly
- [ ] Monitor system performance metrics
- [ ] Clear completed synchronization requests

#### Performance Monitoring

- [ ] API response times within acceptable range
- [ ] Synchronization queue sizes manageable
- [ ] Database query performance optimized
- [ ] Memory usage within limits
- [ ] Network connectivity stable

### F. Integration Best Practices

#### Data Management
1. **Regular Cleanup**: Schedule regular cleanup of completed synchronization requests
2. **Archiving**: Archive old error logs and completed transactions
3. **Validation**: Implement data validation rules before synchronization
4. **Backup**: Regular backup of configuration and mapping data

#### Security Considerations
1. **Credential Storage**: Use secure credential storage mechanisms
2. **API Keys Rotation**: Regularly rotate API keys and tokens
3. **Access Control**: Implement role-based access control
4. **Audit Logging**: Enable comprehensive audit logging
5. **SSL/TLS**: Always use encrypted connections

#### Performance Optimization
1. **Batch Processing**: Use appropriate batch sizes for bulk operations
2. **Caching**: Implement caching for frequently accessed data
3. **Indexing**: Ensure proper database indexing
4. **Throttling**: Implement API request throttling
5. **Monitoring**: Set up performance monitoring and alerts

### G. Shopify GraphQL Technical Reference

#### GraphQL Configuration Storage

**EcommerceGraphQLLine Table Structure:**
The GraphQL operations are stored in the MAGMagentoSite's graphQLLines collection:

| Field | Description | Example |
|-------|-------------|---------|
| operationName | Operation identifier | GetProductBySku |
| graphQuery | GraphQL query/mutation template | query GetProductBySku($sku: String!)... |
| variablesFieldsMapASJson | JSON mapping of variables | {"sku": {"namaFieldId": "productsApi.productInfo.sku"}} |
| isActive | Enable/disable operation | true |
| priority | Execution priority | 100 |

#### GraphQL Operation Cache

The system implements a caching mechanism for GraphQL configurations:

```java
// Cache structure in ShopifyQraphQLApi
private static Map<EcommerceGraphEntityOperation, EcommerceGraphQLLine> graphCacheMap;
```

**Cache Benefits:**
- Avoids repeated database lookups
- Improves query execution performance
- Reduces memory footprint

#### SKU Search Implementation Details

**Method: findProductBySku**
Location: `ShopifyProductsQLApi.java`

```java
public IEcommerceProduct findProductBySku(String sku) {
    // Set SKU in productInfo for query variable mapping
    this.productInfo.put("sku", "sku:" + sku);
    
    // Execute direct SKU search query
    Map<String, Object> response = apiClient.executeQueryForType(
        EcommerceGraphEntityOperation.GetProductBySku()
    );
    
    // Process response and validate SKU match
    // Returns ShopifyProductInterface or null
}
```

**Query Format:**
The SKU must be formatted as `"sku:VALUE"` for Shopify's search syntax.

#### Variable Field Mapping System

**Special Notations:**
- **Standard mapping**: `"field.subfield"` - Direct field extraction
- **Null handling**: `"field.emptyStringIfNull"` - Returns "" if null
- **Blank handling**: `"field.dashIfBlank"` - Returns "-" if empty

**Mapping Process:**
1. Parse variable configuration from JSON
2. Extract field values using reflection
3. Apply null/blank transformations
4. Insert values into GraphQL variables

#### Error Handling Classes

**ShopifyQLUtils Error Methods:**

```java
public static void throwsExceptionIfError(Map<String, Object> response, String inputType) {
    // Check for GraphQL errors
    if (response.containsKey("errors")) {
        // Parse and throw appropriate exception
    }
    
    // Check for user errors in mutations
    if (response.containsKey("userErrors")) {
        // Handle mutation validation errors
    }
}
```

#### Performance Metrics

**Typical Response Times:**
| Operation | Average Time | Max Records |
|-----------|-------------|-------------|
| GetProductBySku | 200-500ms | 1 product |
| GetProductList | 500-2000ms | 250 products |
| ProductUpdate | 300-800ms | 1 product |
| InventoryUpdate | 400-1200ms | 100 locations |
| GetOrderList | 800-3000ms | 100 orders |

#### API Cost Calculation

**Shopify GraphQL Cost Points:**
- Base query cost: 1 point
- Each node requested: 1 point
- Nested connections: Points × requested count
- Maximum bucket: 1000 points
- Restore rate: 50 points/second

**Cost Optimization:**
- Limit nested field depth
- Use specific field selection
- Implement pagination for large datasets
- Cache frequently accessed data

### H. Common Integration Scenarios

#### Scenario 1: Multi-Channel Retail
- Single Nama ERP instance
- Multiple e-commerce platforms (Magento, Shopify, marketplace)
- Centralized inventory management
- Unified customer database

#### Scenario 2: B2B E-commerce
- Customer-specific pricing
- Credit limit management
- Bulk order processing
- Custom catalog per customer

#### Scenario 3: Omnichannel Fulfillment
- Store inventory synchronization
- Click-and-collect orders
- Multi-warehouse management
- Cross-channel returns

### I. Version Compatibility Matrix

| Platform | Supported Versions | Nama ERP Version | API Type | Notes |
|----------|-------------------|------------------|----------|-------|
| Magento | 2.3.x, 2.4.x | 2023.1+          | REST API V1 | Full REST support |
| Shopify | All current | 2023.1+          | GraphQL 2025-04 | Optimized SKU search, bulk operations |
| Salla | Current | 2023.2+          | REST + OAuth 2.0 | Webhook support |
| BigCommerce | V2, V3 API | 2023.1+          | REST API | V3 recommended |
| WooCommerce | 5.x, 6.x, 7.x | 2023.1+          | REST API v3 | WordPress 5.8+ |
| Zid | Current | 2023.3+          | Custom API | Manager token required |
| OTO | Current | 2025.10+         | REST API v2 | Inventory sync only, refresh token auth |