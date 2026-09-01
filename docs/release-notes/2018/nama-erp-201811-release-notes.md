# Nama ERP Release Notes - November 2018

::: info Release Information
**Release Date:** November 2018  
**Release Number:** 201811
:::

## Additions

### Inventory
- **Stock Taking Voucher:** Added the option **"Apply periodic count based on item cycle"** in the document header.
- **Item File:** Added a **"Safety Factor"** field to automatically calculate safety stock.
- Added the **"Inventory Efficiency Analysis"** report with key performance indicators.
- **Stock Receipt Voucher:** Added the option **"Automatic quality inspection on receipt"**.
- Added the option **"Link items to specific storage locations"** in the distribution management settings.

### Sales
- **Sales Invoice:** Added a **"QR Code"** field for the e-invoice.
- **Price Quotations:** Added a **"Tiered discount scale based on total quantity"** offer.
- **Sales Order:** Added the option **"Automatically reserve stock when the order is confirmed"**.
- Added the **"Sales Forecast"** report based on historical data and trends.
- **Sales Invoice:** Added the ability to apply multiple taxes based on the nature of the item.

### Purchasing
- **Purchase Invoice:** Added a **"Supplier Performance Rating"** field in the document header.
- **Purchase Order:** Added the option **"Compare prices with the last 3 purchases"**.
- Added the **"Supply Chain Risk Analysis"** report by supplier and region.
- **Purchase Invoice:** Added the ability to link the invoice to goods insurance operations.

### Accounting
- **Receipt Voucher:** Added the option **"Apply staged collection policy"** in the document header.
- **Payment Voucher:** Added a **"Project or Activity Code"** field to track expenses.
- Added the **"Profitability Analysis by Cost Center"** report with detailed breakdowns.
- **Journal Voucher:** Added the ability to create recurring entries on a time schedule.

### Service Center
- **Job Order:** Added a **"Repair Complexity Level"** field (simple, medium, complex).
- Added the **"Response Time Analysis"** report by fault type and priority level.
- **Job Order:** Added the ability to create a custom preventive maintenance plan.
- Added the **"Real-Time Equipment Status Monitoring"** dashboard.

### Human Resources
- **Salary Voucher:** Added the ability to calculate bonuses based on company goals.
- Added an **"Annual Performance Evaluation"** field in the employee file with a 360-degree evaluation system.
- **Leave Voucher:** Added the option **"Calculate unused leave allowance"**.
- Added the **"Employee Turnover Rate Analysis"** report by department and reasons.

### Manufacturing
- **Production Order:** Added a **"Required Quality Model"** field in the document header.
- **Production Execution Document:** Added the ability to track energy consumption for each stage.
- Added the **"Energy Efficiency Analysis"** report for manufacturing operations.
- **Production Order:** Added the ability to plan production based on equipment capacity.

### Banks
- **Letter of Guarantee:** Added a **"Beneficiary Type"** field (government, private, international).
- Added the **"Bank Liquidity Analysis"** report by bank and currency.
- **Cheques:** Added the ability to create a secured electronic chequebook.
- **Bank Reconciliation Note:** Added the ability to reconcile automatically based on defined rules.

### Point of Sale
- Added the ability to support digital payments and electronic wallets.
- Added the option **"Show detailed item information"** to the customer.
- Added the ability to manage electronic coupons and discount codes.
- Added the **"Promotional Offer Effectiveness Analysis"** report by period and type.

### Real Estate
- **Sales Contract:** Added a **"Flexible Payment Plan"** field with multiple options.
- Added the **"Real Estate Risk Analysis"** report by region and unit type.
- **Collect Document:** Added the ability to apply early payment incentives.

## Settings

- Added the option **"Enable Integration with External Systems"** in Global Config.
- **Scheduled Task:** Added the ability to schedule predictive analysis tasks.
- Added a **"Change and Approval Management"** system for important documents.
- Improved the user management system to include custom roles.
- Added the option **"Smart Performance Monitoring and Alerts"**.

## Fixes

### Inventory
- **Stock Taking Voucher:** Fixed an issue where the cycle for some items was not calculated correctly when applying the periodic count.
- **Item File:** Fixed an issue where seasonal fluctuations were not considered when calculating safety stock.
- **Inventory Efficiency Analysis report:** Fixed an issue where the performance indicators did not include all efficiency criteria.
- **Automatic quality inspection:** Fixed an issue where it did not work with all types of imported items.

### Sales
- **Sales Invoice:** Fixed an issue where the QR code was not generated in the format required for e-invoices.
- **Price Quotations:** Fixed an issue where the tiered discount scale did not work with invoices in different currencies.
- **Sales Order:** Fixed an issue where the automatic stock reservation caused conflicts with concurrent sales orders.
- **Sales Forecast report:** Fixed an issue where it did not include the impact of external factors and seasonal events.

### Purchasing
- **Purchase Invoice:** Fixed an issue where the supplier performance rating was not saved in all cases.
- **Purchase Order:** Fixed an issue where the price comparison did not include special discounts and offers.
- **Supply Chain Risk Analysis report:** Fixed an issue where it did not include geopolitical and economic risks.
- **Linking the invoice to insurance operations:** Fixed an issue where it did not work with all insurance companies.

### Accounting
- **Receipt Voucher:** Fixed an issue where the staged collection policy was not applied to customers with special agreements.
- **Payment Voucher:** Fixed an issue where expense tracking by project did not include indirect expenses.
- **Profitability Analysis report:** Fixed an issue where shared costs were not distributed accurately.
- **Recurring entries:** Fixed an issue where the time schedule did not work with Hijri dates.

### Service Center
- **Job Order:** Fixed an issue where the repair complexity level did not accurately affect time and cost estimation.
- **Response Time Analysis report:** Fixed an issue where it did not include spare part waiting times.
- **Preventive maintenance plan:** Fixed an issue where it was not integrated with regular job order scheduling.
- **Equipment status monitoring:** Fixed an issue where real-time updates encountered delays.

### Human Resources
- **Bonus calculation based on company goals:** Fixed an issue where it did not work with long-term goals.
- **360-degree performance evaluation:** Fixed an issue where it did not include external customer evaluations.
- **Unused leave allowance calculation:** Fixed an issue where it did not account for different policies by job grade.
- **Employee Turnover Rate Analysis report:** Fixed an issue where it did not include temporary and contract employees.

### Manufacturing
- **Required Quality Model:** Fixed an issue where compliance with all model criteria was not verified.
- **Energy consumption tracking:** Fixed an issue where it did not work with all types of equipment and machinery.
- **Energy Efficiency Analysis report:** Fixed an issue where it did not include wasted energy costs and lost time.
- **Production planning by equipment capacity:** Fixed an issue where it did not account for planned maintenance times.

### Banks
- **Beneficiary Type for the Letter of Guarantee:** Fixed an issue where it did not correctly affect the letter's terms and conditions.
- **Bank Liquidity Analysis report:** Fixed an issue where it did not include short-term deposits and investments.
- **Electronic chequebook:** Fixed an issue where it encountered problems with encryption and security.
- **Automatic reconciliation by rules:** Fixed an issue where it did not work with complex and exceptional transactions.

### Point of Sale
- **Digital payments and electronic wallets:** Fixed an issue where they did not work with all service providers.
- **Detailed item information display:** Fixed an issue where it did not include maintenance and warranty information.
- **Electronic coupon management:** Fixed an issue where it encountered problems validating codes.
- **Promotional Offer Effectiveness report:** Fixed an issue where results were not linked to marketing costs.

### Real Estate
- **Flexible Payment Plan:** Fixed an issue where it was not integrated with bank financing systems.
- **Real Estate Risk Analysis report:** Fixed an issue where it did not include environmental and regulatory risks.
- **Early payment incentives:** Fixed an issue where they were not applied to contracts with special terms.

## General Improvements

- Improved system security by adding advanced encryption for sensitive data.
- Improved system performance by optimizing complex database queries.
- Updated the user interface to be more interactive and easier to use.
- Added more integration options with external systems.
- Improved the error and log management system to facilitate maintenance.
