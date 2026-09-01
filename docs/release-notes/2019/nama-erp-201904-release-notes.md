# Nama ERP Release Notes - April 2019

::: info Release Information
**Release Date:** April 2019  
**Release Number:** 201904
:::

## Additions

### Sales
- **Quotation:** Added the option **"Export Items to Excel"** in **the More menu** on the quotation.
- **Sales Invoice:** Added the option **"Stop Quantity Reservation"** to **the More menu** on the Sales Invoice document.
- **Sales Order - Sales Invoice:** When converting a Sales Order into a Sales Invoice, added the option **"Do Not Carry Over Fulfilled Quantities"** to avoid carrying over quantities that were already fulfilled.
- **Sales Invoice:** Added the option **"Update Sales Prices"** in **the More menu** to update the sales prices of the items on the invoice.
- **Quotation:** Added the entity flow `printOfferAndSendViaEmailsAndSMS` to print and send the quotation by email and SMS.
- **Sales Order:** Added the option **"Update Sales Prices"** in **the More menu**.
- **Bill of Lading:** Added the entity flow `collectShipmentItemsFromSalesOrder` to consolidate shipment items from the sales order.
- **Quotation:** Added the entity flow `duplicateLastOffer`, **"Copy Last Quotation"**, in **the More menu**.
- **Sales Invoice:** Added the entity flow `updateSalesPrices`, **"Update Sales Prices"**, in **the More menu**.
- **Sales Order:** Added the entity flow `updateSalesPrices`, **"Update Sales Prices"**, in **the More menu**.
- Added the document **"Items and Services Sales"** (`SalesItemsAndServices`), which shows the sales details for each salesperson and includes a set of features: it works like the Salesperson Sales Inquiry document, and it calculates the profits on sales for each item.

### Purchasing
- **Purchase Invoice:** Added the entity flow `reversePurchasesInvoice`, **"Reverse the Purchase Invoice"**, in **the More menu**, to reverse the effects of the Purchase Invoice.
- **Purchase Invoice:** Added an icon next to the **"Received"** field on the Purchase Invoice lines to indicate that there are stock movements (stock vouchers) linked to the line.
- **Purchase Invoice:** Added the entity flow `collectToOnePurchasesInvoice`, **"Consolidate Purchase Invoices"**, in **the More menu**, to merge several invoices into a single invoice.
- **Purchase Order:** Added the entity flow `generatePurchasesInvoicesFromPos`, **"Generate Purchase Invoices from Purchase Orders"**, in **the More menu**.
- **Purchase Invoice:** Improved the entity flow `collectToOnePurchasesInvoice` so that it copies the criteria and references from the original invoices.

### Inventory
- **Stock Issue Voucher:** Added the option **"Consolidate Similar Items"** to consolidate items with the same type, unit and Lot into a single line.
- **Stock Transfer:** Improved the Stock Transfer so that it takes the item's **"Within Safety Stock"** field into account, and only transfers the quantity above the safety stock.
- **Goods Receipt Voucher:** Added the option **"Update Purchase Prices"** in **the More menu** to update the purchase prices of the items.
- **Issue Request:** Added the entity flow `collectDispenseRequestItems`, **"Consolidate Issue Request Items"**, to merge similar issue requests.
- **Goods Receipt Voucher:** Added the entity flow `updatePurchasesPrices`, **"Update Purchase Prices"**, in **the More menu**.
- **Issue Request:** Added the entity flow `collectDispenseRequestItems` in **the More menu**.
- Added the option **"Allow Going Negative for an Item with No Quantity in the Warehouse"** in the Inventory settings.
- Added the option **"Allow Issuing Consignment Goods"** for warehouses.
- When the option **"Allow Issuing Consignment Goods"** is checked in the warehouse settings, and a stock issue is performed, the system loads the Lots into the grid and allows issuing from them even if the consignment quantity equals the total quantity.

### Human Resources
- **Salary Analysis:** Added a salary analysis showing the salary components and their formulas.
- **Employee Document:** Added the entity flow `updateEmployeeSalaryList`, **"Update the Payroll Record According to the Employee File"**.
- **Job Offer, Update Employee Data, Employee's Desire to Terminate Service, and Employee Termination documents:** Added the field **"Decision Number"**.
- **Salary Suspension:** Enabled suspending a salary on the record without affecting the settlement, and added the option **"Suspend End-of-Service Dues"** to the Salary Suspension document and its settings in the Salary Suspension Types file.
- **Suspension Types:** Added the option **"Suspend End-of-Service Dues"**.
- Added the document **"Cash Payment Receipt to Employee"** (`cashPaidToEmployee`).
- **Prior Service Addition Voucher:** Improved so that, when there is no dues settlement voucher for an employee, the default settings are used.
- **Sales Order:** Added the **"Labor Law"** dimension to both the employee lines and the labor lines on the Sales Order.
- **Employee Overtime and the Overtime Record:** Added the fields **"Night Hour From"** and **"Night Hour To"** so that if the overtime falls within this period, it is considered night overtime.
- **Tax Formula:** Added the following variables: the monthly tax percentage (`percIncomeMonthlyPerc`), the tax value for the prior months of the year (`prevIncomeVal`), the value of the taxable salary components for the prior months of the year (`prevtaxableVal`).
- **Accounting for Fractions of an Hour - Night Work Hours:** Fractions of an hour are now taken into account in night work hours.
- **Update Overtime by Date:** Added this document to calculate overtime from one date to another.
- Added the option **"Do Not Consider Insurance in Report 41"** in the Human Resources settings.
- Added an entity flow on the Payroll Record document, **"Update the Payroll Record According to the Employee File"**, so that when an employee's salary is issued and the basic salary is then modified, the employee's new basic salary is placed in the payroll record.
- When issuing a payment voucher for an employee, a reversing journal entry is now generated.

### Fixed Assets
- **Asset File:** Added a collection `custDepsHistory` containing a table showing the depreciation start and end dates, and another with the warranty start and end dates.
- **Asset File:** Added the depreciation and warranty value for each period to the grid.
- **Asset File:** Added the location field to the grid.
- **Asset File:** With every change to the dates or values related to depreciation in the asset file, the system now keeps them in the grid.
- When depreciating an asset, the dates now appear as they were in the first depreciation performed (start date and end date).

### Point of Sale
- Added the point of sale warehouse to the data migration.
- To fix an issue with enabling the alternate commission mechanism, the option **"Enable the Alternate Commission Mechanism"** was added in the Global Config window of the Point of Sale module.
- Added the field `posinvoicedetails.unitPrice` and the field `posinvoicedetails.tax`.
- Added the ability to open the cash drawer without making a sale.
- Improved the Point of Sale screen by adding a **"Confirm Before Closing"** setting in Global Config, along with the message **"Do you want to close the screen?"**.

### Banks
- **Issued Cheque Document:** Added the entity flow **"Cancel Deposit"** — when triggered, it returns the cheque from Deposited status to Issued status.

### Project Management
- **Project Document:** Added the entity flow `calculateActualCostsFromLedger`, **"Calculate the Project's Actual Costs"**.
- Added the Project Actual Costs table (`ActualProjectCostFromLedger`).

### Contracting Installations
- **Contracting Contract:** The message **"Required Data Not Found"** used to appear on entry — this has been fixed.
- **Contracting Quotation, Contracting Contract:** Added clauses to the terms.
- **Contracting Quotation and Contract:** Added the field `priceListId` (Price List) to the header of the Contracting Quotation and the header of the Contract.
- **Terms:** Added the option **"The Stage Can Be Modified"**.
- Added the payment schedule table to the Contracting Quotation, the Contracting Contract, and the Extract.
- Added terms to both the Contracting Quotation and the Assay.

### Settings
- **Field Help:** Added the option **"Enable Help For"**, which contains three options:
  - All users
  - The users specified here
  - All users except those specified here
- Added the Global Config setting **"Automatic Screen Reload Time in Minutes"**.
- Added improvements to allow the customer to send SMS through Nama.
- Implemented all instances of `CriteriaProcessingAdapter` to use the variable `whereCondition` and add it to `CriteriaTools.getCriteria` when it is not empty.
- Added the fields **"Countries Dimension"** and **"Regions Dimension"** within the Region definition file.
- Added the field **"Nama Developer Tag"** to the Quick Help grid.
- Added the ability to define more than one category per user, and the ability to define a category at the company level and have it taken into account.
- Added a new sort type called **"Tree"** for screens and reports.
- Developed a mechanism for scheduling before- and after-functions so that they run before or after the scheduled task runs.
- Added the Lot dimension to the lines of the Distribution Management documents.
- Added handling for the field `autoGenerateCodeJavaScript` during the copy operation.
- Added a shortcut in dimensions (selection lists) of the (master-detail) type through the option **"Vocabulary List ID"**.
- When applying (Click to Expand) to the Code field (from the field settings), the system displays an error message after the addition.
- Added the option **"Allow Selecting All Values in the Dimension"** to **Settings**.
- When creating the Android mobile app via the `mobile apps` path, it is now packaged and embedded directly in the repository.
- Improved the dimension so that if the customer typed a value into the selection field and wanted to attach a file, the system no longer clears the value.
- Added the option **"Number of Rows Displayed in the Records List"** in Global Config.
- Added the entity flow **"Calculate Amounts from the Profit & Loss Report Screen"** to calculate amounts in the Profit & Loss report.
- Added the `entityInspector` tool in Attachments.

## Fixes

### Inventory
- **Item Card:** Fixed an issue where the message **"Required Data Not Found"** appeared when saving the Item Card document.
- **Item Card:** Fixed an issue where the system converted item serial numbers on the Serials page into whole numbers, so it was only possible to search by number.
- **Stock Transfer:** Fixed an issue where running a Stock Transfer document by item or stock transfer codes (between different locations) and then saving the document could cause the system to display an error message.
- Fixed an issue where the Stock Issue Voucher document did not deduct quantities correctly.

### Sales
- **Sales Order - Sales Invoice:** Fixed an issue where, if a customer had a tax policy, a Sales Order was created with the tax data of that policy, and a Sales Invoice was then created from the Sales Order — the tax information on the Sales Order did not carry over to the invoice.
- Fixed an issue in filtering the price list, where in some cases it did not retrieve the correct dimensions.
- **Sales Return:** Fixed an issue where, in some cases, an error appeared on the Sales Return when creating a Stock Issue Voucher.

### Purchasing
- **Purchase Invoice:** Fixed an issue where, in some cases, the system displayed an error message when saving as a draft.
- **Purchase Invoice:** Fixed an issue where the system displayed the error message **"No Vendor with the Specified Code"** when saving as a draft.

### Human Resources
- **Attendance and Departure Data:** Fixed an issue where the **"Year"** dimension did not work, and only year, month and day together worked.
- **Meeting:** Fixed an issue where the check was performed on the employee as well as the user, so that a user with no linked employee record could not enter the Meetings document.
- **Employee Departure Data:** Fixed an issue where the calculation was not performed for some employees.
- **Uploading the Attendance and Departure File:** Fixed an issue where, if an employee had a leave day in the middle of the week and the file was uploaded, the system automatically marked it as absence and did not take the leave into account.
- Fixed an issue where the Android app for leave requests did not work in some cases.
- Fixed an issue where creating a partial-day leave and clicking OK could show the message **"Operation Cannot Be Performed"**.

### Point of Sale
- Fixed an issue where cancelling the posting of Point of Sale invoice values to Nama caused the system to display an error message.
- Fixed an issue where, in some cases, applying a discount did not calculate the discount value correctly.

### Fixed Assets
- **Asset Location Transfer by Barcode Document:** Fixed an issue where, after selecting the new location and scanning the asset's barcode, the system did not fill in the asset's information.
- **Asset Depreciation Document:** Fixed an issue where, when opening a new month and attempting to depreciate assets, the system displayed the message **"Operation Cannot Be Performed"**.

### Banks
- **Issued Cheque:** Fixed an issue where, in some cases, deposited and collected issued cheques did not generate a journal entry, while cheques still in Issued status did generate one.

### Accounting
- **General Journal:** Fixed an issue where, if there was a saved dimension for the journal with a condition set on the **"From"** or **"To"** dimension, that condition did not work correctly.

### Mobile Applications
- Fixed a data-collection issue: the mobile data collection tool showed the document to an employee who had no permission on that document.
- **Issuance Document for Filling Data:** Fixed an issue where the document was created without being filled in, and was sometimes empty.
- **Mobile Inventory Count Document:** Fixed an issue where, after performing an inventory count for the first time and then editing it a second time, the edit did not work.

### Manufacturing
- **Production Order:** Fixed an issue where the **"Start Status"** dimension did not work.
- **Finished Product Receipt Voucher:** Fixed an issue where, in some cases, the **"Damaged Quantity"** field on the document was not filled in correctly.

### Settings
- **Task Scheduling:** Fixed an issue where adding a rule to the schedule without adding a line to the grid caused the system to display an error message.
- Fixed an issue where, in some cases, exporting did not download the file.
- Fixed an issue where changing the browser zoom level changed the size of the menu icons.
- Fixed an issue where opening a screen slowly could result in a black screen.
- Fixed an issue where, in some cases, maximizing the screen (F11) could make the Ribbon disappear, only reappearing when the screen was restored to its normal size.
- **Printing to PDF:** Fixed an issue where, when the report to be printed exceeded 100 pages, the PDF was very slow.
- **Connected System Users View:** Fixed an issue where sorting records by date did not display correctly.
- Fixed an issue where, in some cases, errors occurred in processing financial data or stock quantities.
