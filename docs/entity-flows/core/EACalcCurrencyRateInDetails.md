---
title: EACalcCurrencyRateInDetails
module: core
---


<div class='entity-flows'>

# EACalcCurrencyRateInDetails

**This document was generated using Claude.ai**

## Overview

This entity flow calculates and sets exchange rates for foreign currencies in document detail lines (collections). It processes each line in a document's detail collection, calculates the appropriate exchange rate for any foreign currency, and updates the rate field for each detail line individually.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows
- **Target:** DocumentFile entities with detail collections containing foreign currencies
- **Purpose:** Automatic exchange rate calculation for individual detail lines
- **Scope:** Processes all lines in the specified detail collection

## How It Works

### 1. Parameter Processing and Validation
- **Field Path Parsing:** Extracts detail collection name from field paths
- **Path Validation:** Ensures currency and rate fields start with the detail collection name
- **Field Resolution:** Removes detail prefix to get relative field names within details
- **Parameter Consistency:** Validates that all parameters reference the same detail collection

### 2. Detail Collection Processing
- **Collection Access:** Retrieves the detail collection from the document entity
- **Line Iteration:** Processes each individual line in the collection
- **Null Handling:** Skips processing for lines without valid data
- **Sequential Processing:** Handles lines one by one for accurate rate calculation

### 3. Line-Level Rate Calculation
- **Currency Extraction:** Gets currency value from each detail line's currency field
- **Rate Calculation:** Uses ExchangeRateUtil to calculate rate for the specific currency
- **Context Consideration:** Uses document context (date, branch) for rate calculation
- **Individual Assignment:** Sets calculated rate on each detail line separately

### 4. Error Handling and Continuation
- **Currency Validation:** Skips lines with missing or invalid currencies
- **Error Isolation:** Errors in one line don't affect processing of other lines
- **Graceful Continuation:** Continues processing remaining lines even if some fail
- **Result Accumulation:** Collects any errors or warnings during processing

## Key Differences from Header Rate Calculation

| Aspect | EACalcCurrencyRate | EACalcCurrencyRateInDetails |
|--------|-------------------|-----------------------------|
| **Scope** | Single document header | Multiple detail lines |
| **Processing** | One rate calculation | Multiple rate calculations |
| **Target** | Header currency field | Detail line currency fields |
| **Complexity** | Simple field assignment | Collection iteration |
| **Use Case** | Document-level currency | Line-item level currencies |

## Detail Collection Processing

### Collection Iteration
- **Dynamic Collection Access:** Works with any named detail collection
- **Line-by-Line Processing:** Processes each detail line independently
- **Currency Detection:** Identifies which lines have foreign currencies
- **Rate Assignment:** Sets rates only for lines with valid currencies

### Field Path Resolution
- **Prefix Removal:** Removes detail collection name from field paths
- **Relative Field Access:** Accesses fields relative to each detail line
- **Type Safety:** Ensures field types are compatible with currency and rate data
- **Dynamic Field Support:** Works with any currency and rate field combination

## Parameters

### Parameter 1: Currency Field
- **Type:** Text (Required)
- **Format:** Full field path including detail collection name
- **Purpose:** Specifies currency field within detail lines
- **Validation:** Must start with the detail collection name

**Examples:**
- `details.currency` - Currency field in "details" collection
- `lines.foreignCurrency` - Foreign currency in "lines" collection
- `items.transactionCurrency` - Transaction currency in "items" collection
- `invoiceLines.currency` - Currency in "invoiceLines" collection

**Path Requirements:**
- Must begin with detail collection name followed by dot
- Currency field must exist in detail line entity
- Must reference Currency entity type

### Parameter 2: Rate Field
- **Type:** Text (Required)
- **Format:** Full field path including detail collection name
- **Purpose:** Specifies where to store calculated rates in detail lines
- **Validation:** Must start with the same detail collection name as currency field

**Examples:**
- `details.exchangeRate` - Rate field in "details" collection
- `lines.currencyRate` - Currency rate in "lines" collection
- `items.rate` - Rate in "items" collection
- `invoiceLines.foreignExchangeRate` - Exchange rate in "invoiceLines" collection

**Field Requirements:**
- Must be decimal/numeric field type
- Field must be writable
- Should have appropriate precision for exchange rates

### Parameter 3: Detail Name
- **Type:** Text (Required)
- **Format:** Name of the detail collection to process
- **Purpose:** Identifies which collection contains the detail lines
- **Validation:** Must match the prefix used in currency and rate field parameters

**Common Detail Collection Names:**
- `details` - Standard detail collection
- `lines` - Invoice or order lines
- `items` - Item details
- `invoiceLines` - Invoice line items
- `orderDetails` - Order detail lines
- `paymentLines` - Payment allocation lines

## Database Tables Affected

### Document Header
- **Main Document Entity:** The document containing the detail collection
  - Used for context (date, branch) in rate calculation
  - Collection field provides access to detail lines
  - Document properties influence rate calculation

### Detail Line Entities
- **Detail Collection Items:** Individual lines within the detail collection
  - Currency fields: Read to determine which rates to calculate
  - Rate fields: Updated with calculated exchange rates
  - Each line processed independently

### Currency and Rate System
- **Currency Master Data:** Referenced for rate calculation context
- **Exchange Rate Sources:** Used to calculate current or historical rates
- **Rate Configuration:** System settings for rate calculation methods

## Business Use Cases

### 1. Multi-Currency Invoicing
- **International Sales:** Calculate rates for each line item in different currencies
- **Mixed Currency Orders:** Handle orders with items priced in various currencies
- **Foreign Supplier Invoices:** Process purchase invoices with multiple currency lines
- **Export Documentation:** Calculate rates for export shipment line items

### 2. Complex Transaction Processing
- **Multi-Currency Payments:** Calculate rates for payment allocation lines
- **Foreign Exchange Deals:** Process FX transaction details with varying rates
- **International Projects:** Handle project cost lines in different currencies
- **Global Procurement:** Calculate rates for procurement items from various countries

### 3. Financial Reporting and Consolidation
- **Subsidiary Reporting:** Calculate rates for subsidiary transaction details
- **Consolidation Entries:** Process consolidation adjustment line details
- **Budget Variations:** Handle budget line items in multiple currencies
- **Cost Allocation:** Calculate rates for cost allocation detail lines

## Important Warnings

### ⚠️ Parameter Consistency Requirements
- **Collection Name Matching:** All three parameters must reference the same detail collection
- **Field Path Validation:** Currency and rate fields must start with the detail collection name
- **Case Sensitivity:** Collection and field names are case-sensitive
- **Path Format:** Must use exact dot notation format (collection.field)

### ⚠️ Detail Collection Dependencies
- **Collection Existence:** Specified detail collection must exist on the document entity
- **Collection Population:** Collection should contain detail lines for processing
- **Field Compatibility:** Currency and rate fields must exist in detail line entity type
- **Data Types:** Fields must have compatible data types (Currency reference, Decimal rate)

### ⚠️ Performance Considerations
- **Large Collections:** Processing many detail lines may impact performance
- **Rate Lookup Overhead:** Each line requires separate rate calculation
- **Database Queries:** Multiple currency lookups may increase database load
- **Memory Usage:** Large detail collections may consume significant memory

### ⚠️ Exchange Rate Availability
- **Rate Sources:** Exchange rates must be available for all currencies in details
- **Date Dependencies:** Rate calculation depends on document date and rate availability
- **Network Requirements:** Real-time rate sources may require internet connectivity
- **Fallback Rates:** Consider fallback scenarios for unavailable rates

### ⚠️ Data Consistency
- **Partial Processing:** Some lines may succeed while others fail
- **Rate Accuracy:** Ensure rates are calculated consistently across all lines
- **Currency Validation:** Invalid currencies in some lines may cause processing issues
- **Transaction Integrity:** Consider transaction boundaries for rate updates

## Best Practices

### Configuration
- **Standard Naming:** Use consistent field naming across detail collections
- **Error Handling:** Configure appropriate error handling for rate calculation failures
- **Validation:** Validate detail collection structure before action execution
- **Testing:** Test with various currencies and collection sizes

### Performance Optimization
- **Rate Caching:** Consider caching rates for frequently used currencies
- **Batch Processing:** Group rate calculations where possible
- **Collection Filtering:** Process only lines that need rate calculation
- **Resource Monitoring:** Monitor system resources during large collection processing

## Field Information Access

For detailed field information:
- **System UI:** Use ALT+CTRL+I on any entity field for "Show Field Info"
- **Documentation:** Visit https://dm.namasoft.com for comprehensive entity documentation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRateInDetails`

**Related Actions:**
- [EACalcCurrencyRate](EACalcCurrencyRate.md)


</div>

