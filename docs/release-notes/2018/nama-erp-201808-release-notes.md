# Nama ERP Release Notes - August 2018

::: info Release Information
**Release Date:** August 2018  
**Release Number:** 201808
:::

## Additions

### Inventory
- **Stock Taking Document:** Added the option **"Print the stock take sheet before execution"** in the document header.
- **Item File:** Added the field **"Warranty Period in Months"** for items.
- Added the report **"Detailed Stock Movement"** grouped by period and warehouse.
- **Stock Receipt:** Added the ability to link the receipt to a shipment number.
- Added the option **"Automatically freeze expired items"** in the Distribution Management settings.

### Sales
- **Sales Invoice:** Added the field **"Shipping Method"** in the document header.
- **Price Quotations:** Added the offer **"Graduated discount by quantity"**.
- **Sales Order:** Added the option **"Send order confirmation by email"**.
- Added the report **"Sales Analysis by Geographic Region"**.
- **Sales Invoice:** Added the ability to record delivery and receipt details.

### Purchasing
- **Purchase Invoice:** Added the field **"Shipment Number"** in the document header.
- **Purchase Order:** Added the option **"Send the request to the vendor by email"**.
- Added the report **"Purchase Analysis by Vendor and Period"**.
- **Purchase Invoice:** Added the ability to link the invoice to more than one purchase order.

### Accounting
- **Receipt Voucher:** Added the option **"Print the receipt with the voucher"** in the document header.
- **Payment Voucher:** Added the option **"Print the payment receipt with the voucher"** in the document header.
- Added the report **"Expected Cash Flow"** by due dates.
- **Journal Entry:** Added the ability to attach multiple supporting documents.

### Service Center
- **Work Order:** Added the field **"Priority Level"** in the document header.
- Added the report **"Technician Efficiency"** by time spent and quality.
- **Work Order:** Added the ability to record the customer's rating of the service.
- Added a dashboard for real-time monitoring of work orders.

### Human Resources
- **Salary Voucher:** Added the ability to send the payslip to the employee by email.
- Added the field **"Passport Expiry Date"** in the employee file with alerts.
- **Leave Voucher:** Added the option **"Automatically deduct leave days from the balance"**.
- Added the report **"Human Resources Cost Analysis"**, monthly and yearly.

### Manufacturing
- **Production Order:** Added the field **"Production Batch Number"** in the document header.
- **Production Execution Document:** Added the ability to record quality standards and inspection.
- Added the report **"Production Line Efficiency"** by planned versus actual rate.
- **Production Order:** Added the ability to link the order to customer requests.

### Banks
- **Letter of Guarantee:** Added the field **"Guarantee Type"** (initial, final, maintenance).
- Added the report **"Letters of Guarantee Position"** by type and status.
- **Cheques:** Added the ability to track the cheque status (under collection, collected, bounced).
- **Bank Reconciliation:** Added the ability to import the bank statement electronically.

### Point of Sale
- Added support for advanced barcode scanners.
- Added the option **"Print the invoice with a QR code"** for electronic payment.
- Added the ability to manage tables for restaurants and cafés.
- Added the report **"Sales by Product and Time"** with hourly detail.

### Real Estate
- **Sales Contract:** Added the field **"Payment Method"** (cash, instalment, mixed).
- Added the report **"Real Estate Returns Analysis"** by project and unit.
- **Collect Document:** Added the ability to automatically apply late-payment penalties.

## Settings

- Added the option **"Enable electronic signature for documents"** in Global Config.
- **Scheduled Task:** Added the ability to schedule automatic backups.
- Added the **"Electronic Approvals"** system for financial documents.
- Improved the user management system to include two-factor authentication.
- Added the option **"Encrypt sensitive data"** in the database.

## Fixes

### Inventory
- **Stock Taking Document:** Fixed an issue where some items with zero quantities did not appear when printing the stock take sheet.
- **Item File:** Fixed an issue where no clear error message appeared when an invalid warranty period was entered.
- **Stock Movement Report:** Fixed an issue where opening balances were not calculated correctly.
- **Stock Receipt:** Fixed an issue where duplication was not checked when linking the receipt to a shipment number.

### Sales
- **Sales Invoice:** Fixed an issue where the timing was not saved correctly when recording delivery details.
- **Price Quotations:** Fixed an issue where the graduated discount did not work with items of different units.
- **Sales Order:** Fixed an issue where sending the order confirmation by email did not include all the required details.
- **Sales Analysis Report:** Fixed an issue where data was not grouped accurately by region.

### Purchasing
- **Purchase Invoice:** Fixed an issue where quantity problems appeared when linking the invoice to more than one purchase order.
- **Purchase Order:** Fixed an issue where sending the request to the vendor did not work with all email formats.
- **Purchase Analysis Report:** Fixed an issue where discounts and taxes were not calculated correctly.

### Accounting
- **Receipt and Payment Vouchers:** Fixed an issue where printing the receipts did not include all required data.
- **Cash Flow Report:** Fixed an issue where forecasts were not updated when due dates changed.
- **Journal Entry:** Fixed an issue where attaching supporting documents ran into problems with large files.

### Service Center
- **Work Order:** Fixed an issue where the priority level did not affect the order-processing sequence.
- **Technician Efficiency Report:** Fixed an issue where overtime was not calculated correctly.
- **Customer Rating:** Fixed an issue where ratings were not saved in all cases.
- **Dashboard:** Fixed an issue where data was not updated in real time.

### Human Resources
- **Sending the Payslip:** Fixed an issue where it did not work with all email addresses.
- **Passport Expiry Alerts:** Fixed an issue where they did not work with Hijri dates.
- **Leave Days Deduction:** Fixed an issue where the balance was not deducted upon cancellation.
- **Cost Analysis Report:** Fixed an issue where it did not include all financial items.

### Manufacturing
- **Production Batch Number:** Fixed an issue where duplication was not checked.
- **Quality Standards:** Fixed an issue where not all inspection results were saved.
- **Production Line Efficiency Report:** Fixed an issue where downtime periods were not calculated.
- **Linking the Order to Customer Requests:** Fixed an issue where it did not work with multiple requests.

### Banks
- **Cheque Status Tracking:** Fixed an issue where the status was not automatically updated in all cases.
- **Bank Statement Import:** Fixed an issue where it ran into problems with different file formats.
- **Letters of Guarantee Position Report:** Fixed an issue where data was not grouped correctly.

### Point of Sale
- **Barcode Scanners:** Fixed an issue where they did not work with all barcode types.
- **QR Code for Payment:** Fixed an issue where it was not generated in the required format.
- **Table Management:** Fixed an issue where it ran into problems with multiple orders.
- **Hourly Sales Report:** Fixed an issue where the timing was not saved accurately.

### Real Estate
- **Late-Payment Penalties:** Fixed an issue where they were not applied to all instalment types.
- **Returns Analysis Report:** Fixed an issue where operating costs were not calculated.

## General Improvements

- Improved system security by adding extra protection layers.
- Improved database performance with enhanced indexing.
- Updated the user interface to be more modern and easier to use.
- Added more customization options for reports and documents.
- Improved the backup system to be faster and more reliable.
