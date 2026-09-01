# Nama ERP Release Notes - October 2018

::: info Release Information
**Release Date:** October 2018  
**Release Number:** 201810
:::

## Additions

### Inventory
- **Stock Taking Voucher:** Added the option **"Compare inventory count results with the previous period"** in the document header.
- **Item File:** Added a **"Turnover Rate"** field with automatic monthly calculations.
- Added the **"Slow-Moving Analysis"** report for items with treatment suggestions.
- **Stock Receipt Voucher:** Added the option **"Automatically update last purchase price"**.
- Added the option **"Alert for items nearing depletion"** in the distribution management settings.

### Sales
- **Sales Invoice:** Added an **"International Tracking Code"** field for outbound shipments.
- **Price Quotations:** Added a **"Cumulative discount based on total annual purchases"** offer.
- **Sales Order:** Added the option **"Send manufacturing completion notice to the customer"**.
- Added the **"Customer Behavior Analysis"** report by order frequency and value.
- **Sales Invoice:** Added the ability to link the invoice to a marketing campaign.

### Purchasing
- **Purchase Invoice:** Added a **"Customs Release Number"** field in the document header.
- **Purchase Order:** Added the option **"Request a sample before supply"** for new items.
- Added the **"Supplier Price Comparison"** report for a single item across periods.
- **Purchase Invoice:** Added the ability to link the invoice to quality certificates.

### Accounting
- **Receipt Voucher:** Added the option **"Automatically apply early payment discount"** in the document header.
- **Payment Voucher:** Added a **"Required Approval Level"** field based on the amount value.
- Added the **"Future Cash Flow Analysis"** report based on obligations.
- **Journal Voucher:** Added the ability to automatically generate suggested entries.

### Service Center
- **Job Order:** Added a **"Warranty Type"** field (standard warranty, extended warranty, out of warranty).
- Added the **"Warranty Costs"** report by device type and period.
- **Job Order:** Added the ability to track the device's previous maintenance history.
- Added the **"Device Fault Statistics"** dashboard for pattern analysis.

### Human Resources
- **Salary Voucher:** Added the ability to calculate a performance bonus based on periodic evaluations.
- Added a **"Required Certificate Renewal Date"** field in the employee file.
- **Leave Voucher:** Added the option **"Automatically notify the direct manager"**.
- Added the **"Hiring Cost Analysis"** report by department and level.

### Manufacturing
- **Production Order:** Added a **"Production Priority Level"** field in the document header.
- **Production Execution Document:** Added the ability to record downtime and its causes.
- Added the **"Equipment Utilization Efficiency"** report based on actual operating hours.
- **Production Order:** Added the ability to link the order to preventive maintenance requests.

### Banks
- **Letter of Guarantee:** Added a **"Guarantee Amount in the Base Currency"** field with automatic conversion.
- Added the **"Bank Risk Concentration"** report by bank and customer.
- **Cheques:** Added the ability to track rejected cheques and rejection reasons.
- **Bank Reconciliation Note:** Added the ability to import multiple bank statements.

### Point of Sale
- Added the ability to support connected electronic weighing scales.
- Added the option **"Show complementary sale suggestions"** based on purchase history.
- Added the ability to manage pre-orders and reservations.
- Added the **"Peak Sales Analysis"** report by hour and day.

### Real Estate
- **Sales Contract:** Added a **"Financing Type"** field (self-financed, bank-financed, mixed).
- Added the **"Return on Investment Rate"** report by project and period.
- **Collect Document:** Added the ability to automatically apply late payment interest.

## Settings

- Added the option **"Enable Geographic Tracking for Sales"** in Global Config.
- **Scheduled Task:** Added the ability to schedule automatic exchange rate updates.
- Added a **"Document Version Control"** system with change tracking.
- Improved the multiple-database management system.
- Added the option **"Compress Historical Data"** to improve performance.

## Fixes

### Inventory
- **Stock Taking Voucher:** Fixed an issue where differences did not appear clearly when comparing inventory count results with the previous period.
- **Item File:** Fixed an issue where sales downtime periods were not considered when calculating the turnover rate.
- **Slow-Moving Analysis report:** Fixed an issue where the suggestions did not include all possible solutions.
- **Stock Receipt Voucher:** Fixed an issue where updating the last purchase price was not applied across all warehouses.

### Sales
- **Sales Invoice:** Fixed an issue where results were not tracked accurately when linking the invoice to a marketing campaign.
- **Price Quotations:** Fixed an issue where the cumulative discount did not work for customers with multiple branches.
- **Sales Order:** Fixed an issue where the manufacturing completion notice did not include the expected shipping details.
- **Customer Behavior Analysis report:** Fixed an issue where data for linked customers was not aggregated correctly.

### Purchasing
- **Purchase Invoice:** Fixed an issue where certificate details were not saved when linking the invoice to quality certificates.
- **Purchase Order:** Fixed an issue where the pre-supply sample request did not work for all item categories.
- **Supplier Price Comparison report:** Fixed an issue where currency differences were not considered correctly.

### Accounting
- **Receipt Voucher:** Fixed an issue where the early payment discount did not apply to invoices in different currencies.
- **Payment Voucher:** Fixed an issue where the required approval level was not applied to all expense types.
- **Future Cash Flow Analysis report:** Fixed an issue where it did not include all long-term obligations.
- **Journal Voucher:** Fixed an issue where automatically suggested entries were not accurate in all cases.

### Service Center
- **Job Order:** Fixed an issue where the warranty type did not correctly affect the service cost calculation.
- **Warranty Costs report:** Fixed an issue where indirect warranty costs were not included.
- **Previous maintenance history tracking:** Fixed an issue where it did not work with devices transferred from other customers.
- **Fault Statistics dashboard:** Fixed an issue where data was not updated with the required synchronization.

### Human Resources
- **Performance bonus calculation:** Fixed an issue where it did not work for employees with multiple evaluations.
- **Required Certificate Renewal Date:** Fixed an issue where alerts did not work for all certificate types.
- **Direct manager notification:** Fixed an issue where it was not sent when the manager was absent.
- **Hiring Cost Analysis report:** Fixed an issue where it did not include training and qualification costs.

### Manufacturing
- **Production Priority Level:** Fixed an issue where it did not correctly affect production order scheduling.
- **Downtime recording:** Fixed an issue where downtime was not linked to the resulting costs.
- **Equipment Utilization Efficiency report:** Fixed an issue where it did not include planned maintenance time.
- **Linking the production order to maintenance requests:** Fixed an issue where it did not work with urgent production orders.

### Banks
- **Guarantee amount in the base currency:** Fixed an issue where the automatic conversion did not use the latest exchange rates.
- **Bank Risk Concentration report:** Fixed an issue where it did not include provided guarantees and insurances.
- **Rejected cheque tracking:** Fixed an issue where the cheque status was not updated automatically in all cases.
- **Importing multiple bank statements:** Fixed an issue where it encountered problems with different file formats.

### Point of Sale
- **Electronic weighing scales:** Fixed an issue where they did not work with all scale models.
- **Complementary sale suggestions:** Fixed an issue where they were not accurate for new customers.
- **Pre-order management:** Fixed an issue where it encountered problems with schedule updates.
- **Peak Sales Analysis report:** Fixed an issue where data was not aggregated accurately by day of the week.

### Real Estate
- **Financing Type:** Fixed an issue where it did not correctly affect the calculation of installments and interest.
- **Return on Investment Rate report:** Fixed an issue where it did not include all operating expenses in the calculation.
- **Automatic late payment interest:** Fixed an issue where it was not applied to customers with special agreements.

## General Improvements

- Improved system security by adding optional two-factor authentication.
- Improved system performance with very large databases.
- Updated the user interface to support dark mode.
- Added more export options for reports.
- Improved the backup system to support incremental backups.
