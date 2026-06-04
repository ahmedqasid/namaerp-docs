# Omniful Integration Guide

## Overview

Nama ERP integrates with [Omniful](https://www.omniful.ai/), a unified supply chain platform that provides comprehensive warehouse management and order fulfillment capabilities. This integration enables seamless data synchronization between Nama ERP and Omniful for inventory management, order processing, and supply chain operations.

## Integration Architecture

The integration operates in two directions:

1. **Outbound (Nama ERP → Omniful)**: Master data and transactions are sent from Nama ERP to Omniful using Entity Flows
2. **Inbound (Omniful → Nama ERP)**: Orders, stock transfers, purchase orders, and receipts are received from Omniful via webhooks

## Configuration Setup

### 1. Omniful Configuration Entity

Navigate to **Magento → Omniful Configuration** to create and configure the integration settings.

#### Required Fields

| Field | Arabic Name | Description |
|-------|-------------|-------------|
| User Name | - | Omniful API username |
| Password | - | Omniful API password |
| Seller Code | اسم البائع | Unique seller identifier in Omniful |
| Webhook Secret Key | - | Secret key for webhook authentication |
| Tenant API Username | المستخدم | Tenant API username for advanced operations |
| Tenant API Password | كلمة المرور | Tenant API password |
| Nama API Key | - | API credentials for Nama ERP access |

#### Reference Field Configuration

These fields map Omniful IDs to specific fields in Nama ERP entities:

| Field | Arabic Name | Purpose |
|-------|-------------|---------|
| Omniful Reference Field For Orders | حقل مرجع أومنيفل في الطلبات | Maps sales orders to Omniful order IDs |
| Omniful Reference Field For Issue Stock Transfer | حقل مرجع أومنيفل في صرف تحويل مخزني | Maps stock issue transfers |
| Omniful Reference Field For Receipt Stock Transfer | حقل مرجع أومنيفل في استلام تحويل مخزني | Maps stock receipt transfers |
| Omniful Reference Field For Purchase Order | حقل مرجع أومنيفل في أمر شراء | Maps purchase orders |
| Omniful Reference Field For Stock Transfer Request | حقل مرجع أومنيفل في طلب التحويل المخزني | Maps stock transfer requests |
| Omniful Reference Field For Stock Receipt | حقل مرجع أومنيفل في التوريد المخزني | Maps stock receipts |

### 2. Document Generation Configuration

For each document type that will be received from Omniful, configure the Document Generation Info Lines:

#### Supported Document Types

- **Sales Order** (`SalesOrder`)
- **Issue Stock Transfer** (`IssueStockTransfer`)
- **Receipt Stock Transfer** (`ReceiptStockTransfer`)
- **Stock Transfer Request** (`StockTransferReq`)
- **Purchase Order** (`PurchaseOrder`)
- **Stock Receipt** (`StockReceipt`)

#### Configuration Fields

| Field | Description |
|-------|-------------|
| Entity Type | Select the document type from the dropdown |
| Apply When Query | Optional query to conditionally apply this configuration |
| Book | Document book to assign to generated documents |
| Term | Document term to assign to generated documents |
| Save Doc With Errors As Draft | If enabled, documents with validation errors will be saved as drafts instead of failing |

::: warning Important
- At least one configuration line must be defined for the integration to work
- Either Webhook Secret Key or Nama API Key must be configured
- All reference fields are required and must point to valid custom fields in the respective entities
:::

## Outbound Data Synchronization (Nama ERP → Omniful)

### Available Entity Flows

The following Entity Flows can be used to send data from Nama ERP to Omniful:

#### Master Data Flows

1. **EASendCustomerToOmniful**
   - Sends customer information including contact details, addresses, and documents
   - Parameters: Omniful Config Code/ID, Omniful Reference Field ID
   - Supports both create and update operations

2. **EASendSupplierToOmniful**
   - Sends supplier master data to Omniful
   - Parameters: Omniful Config Code/ID, Omniful Reference Field ID

3. **EASendItemToOmniful**
   - Sends inventory items with sizes and colors variations
   - Creates SKUs in Omniful for each size/color combination
   - Parameters: Omniful Config Code/ID, Update Condition Field

4. **EASendWarehouseToOmniful**
   - Sends warehouse information including location, contact details, and configuration
   - Configures warehouse settings for inventory management
   - Parameters: Omniful Config Code/ID, Update Flag Field

#### Transaction Flows

5. **EASendSalesInvoiceToOmniful**
   - Sends sales invoices as orders to Omniful
   - Includes customer details, order items, addresses, and payment information
   - Parameters: Omniful Config Code/ID, Omniful ID Field

6. **EASendSalesQuotationToOmniful**
   - Sends sales quotations to Omniful
   - Parameters: Omniful Config Code/ID, Omniful Reference Field ID

7. **EASendPurchaseOrderToOmniful**
   - Sends purchase orders to Omniful for supplier management
   - Parameters: Omniful Config Code/ID

8. **EASendStockTransferReqToOmniful**
   - Sends stock transfer requests between warehouses
   - Parameters: Omniful Config Code/ID, Omniful Reference Field ID

9. **EASendStockTransferReqAsPurchaseOrderToOmniful**
   - Converts stock transfer requests to purchase orders in Omniful
   - Parameters: Omniful Config Code/ID

10. **EASendIssueStockTransferToOmniful**
    - Sends issued stock transfers to Omniful
    - Parameters: Omniful Config Code/ID, Omniful Reference Field ID

## Inbound Data Synchronization (Omniful → Nama ERP)

#### Webhook Endpoint

Configure Omniful to send webhooks to your Nama ERP webhook endpoint with the following events:

#### Supported Events

1. **Order Events**
   - `order.*` with `type: "sto"` → Creates Stock Transfer Requests or Issue Stock Transfers
   - `order.*` (non-STO) → Creates Sales Orders

2. **Purchase Events**
   - `purchase.*` → Creates Purchase Orders

3. **GRN Events**
   - `grn.*` → Creates Stock Receipts or Receipt Stock Transfers

### Document Creation Logic

#### Sales Orders
- Created when receiving `order` events (non-STO type) with status ≠ "new_order"
- Maps customer information, billing/shipping addresses, and order items
- Links to existing Sales Quotations if `order_alias` is provided

#### Stock Transfer Operations
- **Stock Transfer Request**: Created for STO orders with status "new_order"
- **Issue Stock Transfer**: Created for STO orders with status ≠ "new_order"
- **Receipt Stock Transfer**: Created from GRN events when matching Issue Stock Transfer exists

#### Purchase Orders
- Created from `purchase` events
- Includes supplier information, warehouse details, and purchase items

#### Stock Receipts
- Created from GRN events when no matching Issue Stock Transfer exists
- Links to existing Purchase Orders via `entity_id` reference

### Webhook Payload Processing

The webhook handler:
1. Validates the webhook secret key against the configuration
2. Parses the JSON payload to extract event type and data
3. Routes the event to the appropriate document creation method
4. Maps Omniful data to Nama ERP entities
5. Saves documents according to the Document Generation Info configuration
6. Updates reference fields with Omniful IDs for future synchronization

## Data Mapping

### Customer Data Mapping

| Nama ERP Field | Omniful Field |
|----------------|---------------|
| Name1 | first_name |
| Name2 | last_name |
| Contact Info → Email | email |
| Contact Info → Mobile | mobile |
| Gender | gender |
| Birth Date | date_of_birth |
| Contact Info → Address | address object |
| Passport Details | documents array |

### Item Data Mapping

| Nama ERP Field | Omniful Field |
|----------------|---------------|
| Size/Color Code | sku_code |
| Item Name | name |
| Code + Color | description |
| Prevent Usage | status ("live"/"un_sync") |
| Base UOM | uom |
| Net Purchase Value | cost |
| Current Price | selling_price, retail_price |

### Order Data Mapping

| Nama ERP Field | Omniful Field |
|----------------|---------------|
| ID | order_id |
| Code | order_alias |
| Warehouse Code | hub_code |
| Customer ID | customer.id |
| Billing Address | billing_address |
| Shipping Address | shipping_address |
| Order Items | order_items array |
| Payment Method | payment_method |

## Error Handling

### Document Creation Errors

When webhook processing encounters errors:

1. **Save as Draft**: If "Save Doc With Errors As Draft" is enabled in the configuration, the document is saved as a draft
2. **Exception Throwing**: If draft saving is disabled, the process throws an exception and returns an error response

### Validation Requirements

Before processing, the system validates:
- Omniful Configuration exists and is properly configured
- Document Generation Info Lines are defined
- Required reference fields are configured
- Webhook secret key matches the configuration

## API Clients

The integration uses two API client types:

### OmnifulSalesChannelAPIClient
- Used for customer and order-related operations
- Handles sales channel API endpoints
- Manages customer creation and updates

### OmnifulTenantAPIClient
- Used for warehouse management and inventory operations
- Handles tenant-level API endpoints
- Manages items, warehouses, and supply chain operations
 