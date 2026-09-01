# Nama ERP Release Notes - July 2018

::: info Release Information
**Release Date:** July 2018  
**Release Number:** 201807
:::

## Additions

### Inventory
- **Stock Taking Document:** Added the option **"Automatically create an adjustment document for discrepancies"** in the document's term config.
- **Item File:** Added the fields **"Minimum Quantity"** and **"Maximum Quantity"**.
- Added the reports **"Items Below Minimum"** and **"Items Above Maximum"**.
- **Stock Receipt:** Added the option **"Automatically update the cost price"** in the document header.
- Added the option **"Show a warning for expired items"** in the Distribution Management settings.

### Sales
- **Sales Invoice:** Added the option **"Print quotation details with the invoice"** in the document header.
- **Price Quotations:** Added the offer **"Buy one quantity and get a percentage discount"**.
- **Sales Order:** Added the field **"Required Delivery Date"** in the document header.
- Added the option **"Prevent selling to frozen customers"** in the Sales settings.
- **Sales Invoice:** Added the ability to link the invoice to more than one sales order.

### Purchasing
- **Purchase Order:** Added the field **"Required Delivery Date"** in the document header.
- **Purchase Invoice:** Added the option **"Automatically update the cost price"** in the document header.
- Added the report **"Overdue Purchase Orders"** by required delivery date.

### Accounting
- **Receipt Voucher:** Added the option **"Automatically create a credit note for the difference"** when the collected amount increases.
- **Payment Voucher:** Added the option **"Automatically create a debit note for the difference"** when the disbursed amount decreases.
- Added the report **"Detailed Debt Aging"** grouped by customer and invoice.

### Service Center
- **Work Order:** Added the field **"Required Delivery Date"** in the document header.
- Added the report **"Overdue Work Orders"** by delivery date.
- **Work Order:** Added the option **"Send an alert when the delivery date approaches"**.

### Human Resources
- **Salary Voucher:** Added the ability to print a detailed statement for each employee separately.
- Added the option **"Calculate commission on net sales"** in the Human Resources settings.
- **Employee File:** Added the field **"Residence Expiry Date"** with expiry alerts.
- Added the report **"Employees with Expiring Residence"**.

### Manufacturing
- **Production Order:** Added the field **"Required Delivery Date"** in the document header.
- **Production Execution Document:** Added the option **"Automatically update the product cost"** in the document header.
- Added the report **"Overdue Production Orders"**.

### Banks
- **Letter of Guarantee:** Added the field **"Guarantee Expiry Date"** with expiry alerts.
- Added the report **"Expired Letters of Guarantee"**.
- **Bank Reconciliation:** Improved the automatic reconciliation process.

### Point of Sale
- Added the ability to display the item balance in Point of Sale.
- Added the option **"Prevent selling when there is not enough balance"** in the Point of Sale settings.
- Added the ability to print the daily sales report from Point of Sale.

## Settings

- Added the option **"Send email alerts"** for the various warnings.
- **Scheduled Task:** Added the ability to schedule reports for sending by email.
- Added the option **"Automatic backup"** in Global Config.
- Improved the permissions management mechanism to include more detailed permissions.

## Fixes

### Inventory
- **Stock Taking Document:** Fixed an issue where calculation errors appeared when the automatic adjustment document option was enabled.
- **Item File:** Fixed an issue where the entered minimum and maximum values were not validated.
- **Stock Receipt:** Fixed an issue where the cost price update was not applied across all warehouses when the option was enabled.

### Sales
- **Sales Invoice:** Fixed an issue where quantity errors appeared when the invoice was linked to more than one sales order.
- **Price Quotations:** Fixed an issue where the new "buy a quantity and get a discount" offer did not work with all item types.
- **Sales Order:** Fixed an issue where no warning message appeared when a delivery date in the past was entered.

### Purchasing
- **Purchase Invoice:** Fixed an issue where the cost price update was not applied to linked items when the option was enabled.
- **Purchase Order:** Fixed an issue where the overdue orders report did not show all due orders.

### Accounting
- **Receipt Voucher:** Fixed an issue where an automatically created credit note was not correctly linked to the original voucher.
- **Debt Aging Report:** Fixed an issue where amounts were not calculated correctly in some cases.

### Service Center
- **Work Order:** Fixed an issue where delivery-date-approaching alerts did not work with all order types.
- **Overdue Orders Report:** Fixed an issue where the status of completed orders was not updated.

### Human Resources
- **Salary Voucher:** Fixed an issue where some items were missing when printing the detailed statement.
- **Commission on Net Sales:** Fixed an issue where discounts were not calculated correctly.
- **Residence Expiry Alerts:** Fixed an issue where they did not work with all residence types.

### Manufacturing
- **Production Execution Document:** Fixed an issue where the product cost update was not applied across all warehouses.
- **Overdue Production Orders Report:** Fixed an issue where pending orders were not shown.

### Banks
- **Letter of Guarantee Expiry Alerts:** Fixed an issue where they did not work with all letter types.
- **Automatic Bank Reconciliation:** Fixed an issue where it ran into problems with complex operations.

### Point of Sale
- **Item Balance Display:** Fixed an issue where the correct balance was not shown in all cases.
- **Prevent Selling When No Balance Exists:** Fixed an issue where it did not work with items having multiple units.
- **Daily Sales Report:** Fixed an issue where it did not include all recorded operations.

## General Improvements

- Improved system performance when handling large volumes of data.
- Improved the user interface to be clearer.
- Added more validations to ensure the correctness of entered data.
- Improved the backup system to cover all data types.
