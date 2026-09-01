# Nama ERP Release Notes - December 2018

::: info Release Information
**Release Date:** December 2018  
**Release Number:** 201812
:::

## Additions

### Inventory
- **Stock Taking Voucher:** Added the option **"Automatically generate the final inventory count report"** in the document header.
- **Item File:** Added an **"Item of the Year"** field to identify the best-selling items.
- Added the **"Year-End Inventory Analysis"** report with item values and losses.
- **Stock Receipt Voucher:** Added the option **"Automatically calculate shipping and clearance cost"**.
- Added the option **"Archive inventory data for the ended year"** in the distribution management settings.

### Sales
- **Sales Invoice:** Added a **"Customer Service Rating"** field in the document header.
- **Price Quotations:** Added a **"Special Year-End Offers"** offer with a defined validity period.
- **Sales Order:** Added the option **"Calculate annual bonuses for sales representatives"**.
- Added the **"Annual Sales Summary"** report with comprehensive comparisons and analyses.
- **Sales Invoice:** Added the ability to issue electronic warranty certificates.

### Purchasing
- **Purchase Invoice:** Added a **"Year-End Supplier Rating"** field in the document header.
- **Purchase Order:** Added the option **"Review annual contracts with suppliers"**.
- Added the **"Annual Purchasing Summary"** report by supplier, category and value.
- **Purchase Invoice:** Added the ability to calculate annual purchasing savings.

### Accounting
- **Receipt Voucher:** Added the option **"Close customer accounts for year-end"** in the document header.
- **Payment Voucher:** Added an **"Expense Tax Classification"** field for tax return purposes.
- Added the final **"Annual Balance Sheet and Income Statement"** report.
- **Journal Voucher:** Added the ability to automatically create fiscal year-closing entries.

### Service Center
- **Job Order:** Added a **"Annual Services Summary for the Customer"** field.
- Added the **"Annual Service Statistics"** report by device type and service.
- **Job Order:** Added the ability to create new annual maintenance contracts.
- Added the **"Annual Performance Indicators"** dashboard for service centers.

### Human Resources
- **Salary Voucher:** Added the ability to calculate the annual bonus and quarter-salary.
- Added a **"Final Annual Performance Evaluation"** field in the employee file.
- **Leave Voucher:** Added the option **"Settle leave balance for year-end"**.
- Added the **"Annual HR Summary"** report with statistics and indicators.

### Manufacturing
- **Production Order:** Added a **"Production Plan for Next Year"** field in the document header.
- **Production Execution Document:** Added the ability to calculate total annual costs.
- Added the **"Annual Production Efficiency"** report with comparisons of targets and achievements.
- **Production Order:** Added the ability to plan production capacity for next year.

### Banks
- **Letter of Guarantee:** Added a **"Review of Expiring Letters of Guarantee"** field for year-end.
- Added the **"Annual Banking Operations Summary"** report by bank and currency.
- **Cheques:** Added the ability to create a new chequebook for next year.
- **Bank Reconciliation Note:** Added the ability to close reconciliations for year-end.

### Point of Sale
- Added the ability to generate year-end sales reports.
- Added the option **"Special Year-End Offers and Discounts"**.
- Added the ability to calculate year-end commissions for cashiers.
- Added the **"Annual Point of Sale Performance"** report with comparisons.

### Real Estate
- **Sales Contract:** Added a **"Contract Review for Year-End"** field with updates.
- Added the **"Annual Real Estate Investment Summary"** report with returns and risks.
- **Collect Document:** Added the ability to calculate final annual revenues.

## Settings

- Added the option **"Prepare the System for the New Fiscal Year"** in Global Config.
- **Scheduled Task:** Added the ability to schedule year-end closing tasks.
- Added a **"Historical Data Archiving"** system for ended years.
- Improved the backup system to support year-end backups.
- Added the option **"Prepare Annual Government Reports"**.

## Fixes

### Inventory
- **Stock Taking Voucher:** Fixed an issue where not all transactions for the specified period appeared when generating the final inventory count report.
- **Item File:** Fixed an issue where identifying the item of the year did not rely on comprehensive evaluation criteria.
- **Year-End Inventory Analysis report:** Fixed an issue where it did not include all types of losses and damage.
- **Shipping cost calculation:** Fixed an issue where costs were not distributed across all items in the shipment.

### Sales
- **Sales Invoice:** Fixed an issue where the customer service rating was not saved in the customer satisfaction database.
- **Year-End Offers:** Fixed an issue where they did not apply to customers with special pricing agreements.
- **Annual bonus calculation:** Fixed an issue where it did not include commissions on deferred sales.
- **Annual Sales Summary report:** Fixed an issue where the comparisons did not include the impact of inflation and price changes.

### Purchasing
- **Year-End Supplier Rating:** Fixed an issue where it did not include quality criteria and delivery-date compliance.
- **Annual contract review:** Fixed an issue where it did not include temporary contracts and sub-agreements.
- **Annual Purchasing Summary report:** Fixed an issue where it did not include late returns and discounts.
- **Purchasing savings calculation:** Fixed an issue where it did not include savings from price negotiation.

### Accounting
- **Closing customer accounts:** Fixed an issue where accounts with pending balances were not processed correctly.
- **Expense Tax Classification:** Fixed an issue where it did not apply to all expense and cost types.
- **Annual Balance Sheet report:** Fixed an issue where some accounts did not appear under the correct classification.
- **Fiscal year-closing entries:** Fixed an issue where they did not include all transitional accounts.

### Service Center
- **Annual Services Summary:** Fixed an issue where it did not include services provided outside working hours.
- **Service Statistics report:** Fixed an issue where data was not aggregated accurately by geographic region.
- **Annual maintenance contracts:** Fixed an issue where they were not integrated with updated spare part prices.
- **Annual Performance Indicators:** Fixed an issue where they did not include comprehensive customer satisfaction indicators.

### Human Resources
- **Annual bonus calculation:** Fixed an issue where it did not apply to employees who had recently joined.
- **Final Annual Performance Evaluation:** Fixed an issue where it did not include evaluations of activities outside the scope of work.
- **Leave balance settlement:** Fixed an issue where it did not account for different policies by job type.
- **Annual HR Summary report:** Fixed an issue where it did not include training and development costs.

### Manufacturing
- **Production Plan for Next Year:** Fixed an issue where it did not account for expected technical developments.
- **Annual cost calculation:** Fixed an issue where it did not include maintenance and development costs.
- **Annual Production Efficiency report:** Fixed an issue where it did not compare results with industry standards.
- **Production capacity planning:** Fixed an issue where it did not account for planned plant expansions.

### Banks
- **Review of expiring letters of guarantee:** Fixed an issue where it did not include automatically renewed letters.
- **Annual Banking Operations report:** Fixed an issue where it did not include bank fees and commissions.
- **New chequebook:** Fixed an issue where it was not correctly linked to the bank account.
- **Closing bank reconciliations:** Fixed an issue where it encountered problems with pending transactions.

### Point of Sale
- **Year-end reports:** Fixed an issue where they did not include deferred credit card sales.
- **Year-end offers:** Fixed an issue where they did not apply to items with previously fixed prices.
- **Year-end commissions:** Fixed an issue where they did not include commissions on cancelled or returned sales.
- **Point of Sale Performance report:** Fixed an issue where comparisons did not account for the difference in working days between years.

### Real Estate
- **Contract review for year-end:** Fixed an issue where it did not include deferred or pending contracts.
- **Annual Investment Summary report:** Fixed an issue where it did not include the impact of real estate price fluctuations.
- **Annual revenue calculation:** Fixed an issue where it did not include revenue from additional services.

## General Improvements

- Improved system performance to handle heavy year-end operations.
- Updated the user interface to facilitate annual closing operations.
- Added more annual analytical reports.
- Improved the security system to protect important historical data.
- Developed helper tools to facilitate the transition to the new fiscal year.
