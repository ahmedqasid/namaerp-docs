# Nama ERP Release Notes - October 2025

::: info Release Information
- **Release Date**: October 2025
- **Release Number**: Nama-ERP-202510
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Created a button named "Create Preparation Documents" in the (Weighbridge Preparation Vouchers Creation Document).
- Added a dropdown list named (Copy Pricing Quantity from one of the Stock Vouchers' Fields) in the term config of each of the following documents:
  - Sales Invoice, Sub Sales Invoice and Sales Return.
  - Purchase Invoice, Sub Purchase Invoice and Purchase Return.
- In the Item definition, added "Can Be Sold" and "Can Be Purchased" to the Sizes and Colors lines.
- Prevented saving Sales Vouchers if the size and color are not sellable - and likewise prevented purchasing if they are not purchasable.
- Changed the dropdown list that appears on double-clicking the color and size, based on the new options.
- Added an option in the Supply Chain Settings named "Enable Can Be Sold and Can Be Purchased on the Colors and Sizes lines", implementing everything above and showing it on the screen only if this option is selected.

### Fixed Assets

- Added the Branch, Department, Company, and Fixed Asset Classification 1 through Fixed Asset Classification 5 fields to the line in the Fixed Asset Opening and Fixed Asset Purchase documents.

### Settings

- Added the English code for the Treasury and Bank Account screens.
- Added the automatic-execution entity flow EARunBulkMassagesFromQuery. This entity is responsible for executing the operation of sending messages based on the query, and it is linked with the Scheduled Task.

### Accounting

- Added 5 additional references to the LetterOfGuarantee screen.
- Added a new file named "Prepaid Expense Item".
- Added the following two documents:
  - Prepaid Expense Contract.
  - Prepaid Expense Accrual Entry.

### Customer Relationship Management (CRM)

- Added a Spare Parts grid to add the spare parts associated with each machine, in the Machine file.
- In the sub-item file (the Car), added an option named "Prevent Sale"; when selected, the car does not appear in the sales documents (Invoice - Sales Order - Stock Delivery).

### Point of Sale

- Added lines named "Authorized Users" in the Register file.
- Added the field (Invoice Classification) in the Report Definition file.
- Added lines named "Gift Cards" in the Point of Sale Settings.
- Added the ability to dynamically turn on **Tool Tip Quick Help** inside Point of Sale, with an option that works with barcode scanning, so that a help message is displayed each time an item is inserted into the lines within the documents.

### Real Estate

- Added the field **"Calculate Percentage of Value"** in the Commissions screen within the Sales Contract.

### Human Resources

- Added a new field named "End of Service Document" in the Employee Dues Liquidation document.
- Added a new option in the Human Resources Settings named allow Evaluation Element Duplicate
- Added a field named maxValuePerDayInTime in the System Performance Indicator Approval screen.

### Contracting

- Added the following fields to the Contracting Supplies Purchase Order:
  - MiscContractingOrder
  - MiscContractingRequest
  - MiscContractingInvoice
- Added an option with the code addTermAnalysisCardLines to the term config of the following documents:
  - ContractingMaterialIssue
  - ContractingMaterialIssueReq
  - ContractingPurchaseOrder
  - ContractingPurchaseRequest

### Manufacturing

- Added the following fields in the Carton Specifications screen
  - manufacturingType
  - manufacturingParentSpecification
  - childCartonLines
- Added Manufacturing Details lines in the Carton Sales Order screen.
- In the Combined Production Order, added the following:
  - 1- A Main Items grid that expands the items making up the selected products in the details that have product components (Work-in-Process product).
  - Added an "Expand Main Lines" button - a "Create Production Orders" button - an option in the Manufacturing Settings to use the grid.
  - Added a grid that aggregates the raw materials used in the final production orders (unmanufactured - without product components), aggregated from the production orders in the details and the Main Items grid.

### Service Center

- Added the following documents:
  - Proforma Car Purchase Invoice
  - Proforma Car Sales Invoice
  - Car Sales Approval

### Mobile Applications

- Changed the mobile app screen for the IssueStockTransfer document to take the sendToWarehouse field into account.
- Implemented AutoFocus in Nama Mobile on the item code in Distribution documents, after scanning the item for the first time.
- In the Approvals screen, added the ability to select more than one document and approve them in a single step.
- Added a "Delete All" button for Notifications in Nama Mobile, as well as deleting the selected notifications.
- Took the fields N1, N2, N3, N4 into account in the app so they appear when editing the app screen for the Mission voucher.
