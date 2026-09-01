# Nama ERP Release Notes - September 2018

::: info Release Information
**Release Date:** September 2018  
**Release Number:** 201809
:::

## Additions

### Inventory
- **Stock Taking Document:** Added the option **"Save stock take details to a separate file"** in the document header.
- **Item File:** Added the field **"Reorder Level"** for items with automatic alerts.
- Added the report **"Items Below Reorder Level"** with advanced filtering.
- **Stock Receipt:** Added the ability to link the receipt to more than one purchase order.
- Added the option **"Apply FIFO to items with an expiry date"** in the Distribution Management settings.

### Sales
- **Sales Invoice:** Added the fields **"Shipment Number"** and **"Shipping Company"** in the document header.
- **Price Quotations:** Added the offer **"Buy X and get Y free"** with advanced conditions.
- **Sales Order:** Added the option **"Send order status updates by SMS"**.
- Added the report **"Profit Margin Analysis"** by item, customer and period.
- **Sales Invoice:** Added the ability to split the invoice across several sales representatives.

### Purchasing
- **Purchase Invoice:** Added the field **"Internal Shipment Number"** in the document header.
- **Purchase Order:** Added the option **"Request receipt confirmation from the vendor"**.
- Added the report **"Vendor Performance Analysis"** by delivery speed and quality.
- **Purchase Invoice:** Added the ability to automatically distribute additional expenses.

### Accounting
- **Receipt Voucher:** Added the option **"Save payment details in the attachments"** in the document header.
- **Payment Voucher:** Added the field **"Final Beneficiary"** for financial tracking.
- Added the report **"Financial Liquidity Analysis"** with performance indicators.
- **Journal Entry:** Added the ability to link the entry to multiple supporting documents.

### Service Center
- **Work Order:** Added the field **"Service Quality Rating"** on a scale of 1-5.
- Added the report **"Customer Satisfaction"** by service type and technician.
- **Work Order:** Added the ability to track spare-parts consumption in detail.
- Added the **"Real-Time Performance Indicators"** dashboard for service centers.

### Human Resources
- **Salary Voucher:** Added the ability to customize salary items by department.
- Added the field **"Passport Number"** in the employee file with number validation.
- **Leave Voucher:** Added the option **"Apply the graduated leave policy"**.
- Added the report **"Employee Efficiency"** by projects and tasks.

### Manufacturing
- **Production Order:** Added the field **"Required Quality Standards"** in the document header.
- **Production Execution Document:** Added the ability to record quality-inspection results.
- Added the report **"Detailed Production Costs"** by production stage.
- **Production Order:** Added the ability to link the order to the master production plan.

### Banks
- **Letter of Guarantee:** Added the field **"Purpose of the Guarantee"** with a selection list.
- Added the report **"Letters of Guarantee Obligations"** by bank and customer.
- **Cheques:** Added the ability to print the cheque list with a barcode.
- **Bank Reconciliation:** Added the ability to reconcile operations in batches.

### Point of Sale
- Added support for advanced thermal invoice printers.
- Added the option **"Show offer details to the customer"** on screen.
- Added the ability to manage loyalty programs and reward points.
- Added the report **"Point of Sale Performance"** with time-based comparisons.

### Real Estate
- **Sales Contract:** Added the field **"Down Payment Percentage"** with automatic calculations.
- Added the report **"Real Estate Unit Status"** by project and status.
- **Collect Document:** Added the ability to apply early-payment discounts.

## Settings

- Added the option **"Enable advanced financial audit"** in Global Config.
- **Scheduled Task:** Added the ability to schedule monthly performance reports.
- Added the **"Time-Based Access Control"** system for sensitive documents.
- Improved the attachment management system to support larger sizes.
- Added the option **"Encrypt communications"** with remote databases.

## Fixes

### Inventory
- **Stock Taking Document:** Fixed an issue where the save path was not correctly determined when saving stock take details to a separate file.
- **Item File:** Fixed an issue where no clear error message appeared when an invalid reorder level was entered.
- **Items Below Reorder Level Report:** Fixed an issue where some filters were not applied correctly.
- **Stock Receipt:** Fixed an issue where conflicting quantities appeared when linking the receipt to more than one purchase order.

### Sales
- **Sales Invoice:** Fixed an issue where commissions were not distributed correctly when the invoice was split across several sales representatives.
- **Price Quotations:** Fixed an issue where the new "buy X and get Y" offer did not work with complex conditions.
- **Sales Order:** Fixed an issue where sending status updates by SMS did not include all the required details.
- **Profit Margin Analysis Report:** Fixed an issue where additional costs were not calculated accurately.

### Purchasing
- **Purchase Invoice:** Fixed an issue where the proportional distribution was not correct when distributing additional expenses.
- **Purchase Order:** Fixed an issue where requesting receipt confirmation did not work with all vendor types.
- **Vendor Performance Analysis Report:** Fixed an issue where quality indicators were not calculated accurately.

### Accounting
- **Receipt and Payment Vouchers:** Fixed an issue where saving payment details in the attachments ran into problems with large files.
- **Liquidity Analysis Report:** Fixed an issue where data was not updated in real time.
- **Journal Entry:** Fixed an issue where linking the entry to multiple documents did not work in all cases.

### Service Center
- **Work Order:** Fixed an issue where the service quality rating was not saved in some cases.
- **Customer Satisfaction Report:** Fixed an issue where data was not grouped correctly by time period.
- **Spare-Parts Consumption Tracking:** Fixed an issue where quantities were not automatically deducted from stock.
- **Performance Indicators Dashboard:** Fixed an issue where data was not updated at the required speed.

### Human Resources
- **Salary Item Customization:** Fixed an issue where it did not work with all departments and job grades.
- **Passport Number:** Fixed an issue where number validation did not cover all nationalities.
- **Graduated Leave Policy:** Fixed an issue where it was not applied correctly to new employees.
- **Employee Efficiency Report:** Fixed an issue where it did not include all completed projects and tasks.

### Manufacturing
- **Required Quality Standards:** Fixed an issue where compliance with the standards was not checked before delivery.
- **Recording Quality-Inspection Results:** Fixed an issue where saving the detailed results ran into problems.
- **Production Costs Report:** Fixed an issue where it did not include all indirect costs.
- **Linking a Production Order to the Production Plan:** Fixed an issue where it did not work with long-term plans.

### Banks
- **Letter of Guarantee Purpose:** Fixed an issue where the purpose was not saved in all cases.
- **Letters of Guarantee Obligations Report:** Fixed an issue where obligations were not grouped correctly.
- **Printing the Cheque List:** Fixed an issue where the barcode was not generated in the required format.
- **Reconciling Operations in Batches:** Fixed an issue where it ran into problems with large operations.

### Point of Sale
- **Thermal Invoice Printers:** Fixed an issue where they did not work with all advanced printer types.
- **Offer Details Display:** Fixed an issue where not all offer conditions were shown to the customer.
- **Loyalty Programs and Reward Points:** Fixed an issue where problems occurred when calculating points.
- **Point of Sale Performance Report:** Fixed an issue where the time-based comparisons were not accurate.

### Real Estate
- **Down Payment Percentage:** Fixed an issue where the automatic calculations did not include all fees.
- **Unit Status Report:** Fixed an issue where statuses were not updated instantly.
- **Early-Payment Discounts:** Fixed an issue where they were not applied to all contract types.

## General Improvements

- Improved system security by adding advanced data encryption.
- Improved database performance by optimizing complex queries.
- Updated the user interface to support high-resolution screens.
- Added more customization options for dashboards.
- Improved the backup system to support advanced compression.
