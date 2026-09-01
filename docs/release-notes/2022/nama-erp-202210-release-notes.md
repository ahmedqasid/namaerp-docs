# Nama ERP Release Notes - October 2022

::: info Release Information
- **Release Date**: October 2022
- **Release Number**: Nama-ERP-202210
:::

## Additions

### Inventory

- **Item Assembly Method Voucher:** Improved so that on save, the system copies the item unit from the document header to the document lines if it is empty.
- Added a new section named "Consider Item Dimensions When Checking for Price Changes in Sales" in the Supply Chain settings. This section includes the following fields:
  - Consider the warehouse when checking that prices have not changed in sales.
  - Consider the size when checking that prices have not changed in sales.
  - Consider the dimensions when checking that prices have not changed in sales.
  - Consider the serial number when checking that prices have not changed in sales.
  - Consider the version when checking that prices have not changed in sales.
  - Consider the effective ratio when checking that prices have not changed in sales.
  - Consider the sub-item when checking that prices have not changed in sales.
  - Consider the location when checking that prices have not changed in sales.
  - Consider the color when checking that prices have not changed in sales.
  - Consider the Lot when checking that prices have not changed in sales.
  - Consider the second serial number when checking that prices have not changed in sales.
  - Consider the Box when checking that prices have not changed in sales.
  - Consider the non-effective ratio when checking that prices have not changed in sales.
- **Item Screen:** Added 3 text fields and 3 number fields to both the Vendor Codes grid and the Customer Codes grid.
- **Product Pricing Document:** Added the finished-product density field to the Products grid, and added a button named "Recalculate Raw Material Quantities" that takes into account the effective and non-effective ratio and the finished-product density from the pricing document (and the weight complement from the product's components).
- Added the option "Do Not Repeat Serial Number Across More Than One Item" in the Supply Chain settings.

### Sales

- **Sales Invoice:** Allowed saving when the option "Invoice Quantities Must Match the Stock Document Quantities" is enabled and the invoice has not yet been linked to a stock issue.
- **Customer Window:** Improved so that when the legal entity's Private Sector company type is selected, the system requires the user to enter all the customer data needed to register the customer with the Tax Authority.
- **Price Quotation Window:** Added the subsidiary field on the line, so that a discount offer can be made covering more than one subsidiary on the lines.
- **Price Quotation Window:** Added the types (Employee Administration - Employee Department - Job Grade) to the subsidiary field, taken from the employee file (when an employee is selected).
- Added the option "Add a Line in Payment Vouchers for Paid Based On" to the Sales and Purchasing term config.

### Accounting

- In each of the Receipt Voucher, Payment Voucher, and Journal Entry, the following was added:
  - The "Item Description" field in the Cost Distribution grid.
  - 2 references in the Cost Distribution grid.
- Added the option "Do Not Verify That the Total Payments Match the Voucher Total" in the Payment Voucher term config.

### Letters of Credit

- **Letter of Credit Expense Voucher Screen:** Added Discount 1 on the line, with an accounting effect for it in the term config.

### Banks

- Added a new section named "Financial Commitment Management". It includes the following windows:
  - Financial Commitment Categories.
  - Financial Commitments.
  - Financial Commitment Payment Documents.
  - Financial Commitment Rescheduling Documents.

### Service Center

- Added the fields found in the "Sub-Item Sales Invoice" to the "Sub-Item Sales Order".

### Fixed Assets

- Added the option "Ignore Asset Status When Editing a Fixed Asset Opening" to the Fixed Assets settings.
- Added the option "Delete the Fixed Asset from Depreciation Vouchers if It Has Already Been Depreciated, When Saving a Fixed Asset Opening Edit Voucher" in the Fixed Assets settings.

### Contracting

- Added the "Taxable" field to Extracts, activated on save - it was not added to the screen.
- In both the Subcontractor Extract and the Project Extract, added the following fields to the document header:
  - (Tax 1 | %)
  - (Tax 2 | %)
- In both the Project Contract and the Subcontractor Contract, improved so that when recording sub-terms, if the term includes a tax, the system automatically copies the tax to the line with the post action.
- The Cost field in the CNTRTermCostEntry table pulls the net amount from the Subcontractor Extract, whereas it should pull the amount due in the Extract, taking into account the options for not adding deductions to the cost.
- Added a grid in the Contracting settings named "Documents Allowed to Create a Financial Paper From", used to specify the documents from whose Payments grid a Financial Paper can be created.
- **Employee Assignment Window:** Improved so that the "Employee / Equipment" field is not mandatory.
- Added the following options to the Standard Condition:
  - Not Used with Subcontractor Contracting
  - Not Used with Project Contracting
- When adding a "Contracting Work Order", selecting the contract, and entering some data, the message "The Operation Could Not Be Performed" appears; but if "Do Not Copy Project Contract Details" is chosen first, and then the contract and the rest of the data are selected, the document is saved.
- Added the option "Calculate Cost Based on Total Quantity" in the Contracting settings, and added a field named "Cost Difference" that is calculated when this option is enabled in the term config.
- Added the "Cost Difference" field to the lines of both the Project Extract and the Subcontractor Project Extract.

### Human Resources

- In the Employee file, in the "employeeState" field, added Other5 through Other10.
- Changed the message (This record cannot be deleted because it is used in the Salary Voucher field in the dbo.LiquidationSalaryDocLine table) to the following:
  (This record cannot be deleted because it is used in the Salary Voucher field in the Liquidation Voucher's Salary Vouchers grid).
- Added an entity flow for the Attendance file that, when there is only one fingerprint scan for the employee on a given day, treats that scan as a check-in if it is before 11:30 AM and as a check-out if it is after that.
- Added the option "Allow Reissuing Paid Salary Vouchers" to the Human Resources settings.
- Added the option "Consider Leave Balance Changes in Multiple Data Update Vouchers for the Same Year" in the Human Resources settings.
- **Dues Liquidation Document:** Added a new component type named "Total Amounts Payable in the Liquidation". This type includes the total from both End of Service Liquidation and Leave Liquidation, so there is no value in using it with leave alone or end of service alone - it works automatically with both.
- Added the following two fields to the Additions and Deductions document:
  - Apply the Default Useful Life Value to the Asset.
  - The Useful Life Added or Deducted

### Manufacturing

- Improved the Indirect Costs window by adding the item and its classifications to the lines, so that different values can be set for the same expense depending on the item.
- Improved so that when deleting a Production Execution that has any linked document, the deletion is prevented.

### Point of Sale

- In the nama pos captain order application, added a field for selecting the item that works the same way as in the Point of Sale invoice.
- Improved so that when a customer number is entered and then the user moves focus with TAB or clicks elsewhere on the screen, the customer number and name are shown; the same applies to the item and the sales representative.
- Added a new window named "POS Receiving" to the Point of Sale system.
- Allowed adding Reference 1 to the sales grid lines. (Added through the interface settings, not by default.)
- Improved so that the tourism service item value is updated with every change to the invoice value (adding a new item - a change in the prices of items already added to the invoice).
- In the Captain Order application, improved so that the system takes the dimensions in the Customers screen into account.
- In the Captain Order application, added a button in the menu named "Settings".
- In the Point of Sale invoice, when selecting a table, the user clicks the icon to open the Tables files, then from inside it clicks the Table Code reference to open the tables to choose from. Improved so that both windows open together, with the second window the same size as the first, in addition to the following improvements:
  - Fixed the OK and Cancel buttons in place in the second window - previously, as data increased they would disappear, and showing them required dragging the window's corner to enlarge it.
  - When a table is selected, only the code is added, and the name is not inserted in its designated place unless Enter is pressed in the Table Code field.
  - When one or more tables are selected and the Tables window is opened again, the selected tables are shown; but opening the second window, not selecting anything, and pressing OK removed the previous selections. Improved so that when the second window is opened, it shows the previous selections.
  - When more than one table is selected, no name is inserted for them. Improved so that the name is added the same way as the codes, for example (Table 12, Table 7).
- Added a Default Values Template file for Point of Sale documents.
- Created a file named "Save Settings in Point of Sale".
- Added a field in the Point of Sale and Machine settings named "Save Settings in Point of Sale".

### Settings

- Sometimes, errors occur in the documents being processed.
- Added the "Insert at the End, Keeping Order" button to the "Item Selection" window, used when the magnifier button opens this window in item documents.
- Added the option "Create Entity System Entry For Draft Records" to the Global Config window.
- Created a new entity flow named "EAPreventQtyLessThan".
- Added an employee group to the Targets grid in the Required Alert Definition.
- Added an employee group to the "Send To" grid in the Task Schedule.
- Prevented editing the permission (found in the More menu) if the file or document has been reviewed.
- When updating the version, improved so that a backup is taken of the previous POS release file, as well as a backup of the previous version.
- Changed the entity flow com.namasoft.services.utils.EASaveToAnotherServerUsingJSON so that, when transferring documents or files, the inputs on the other database - books, term config, and dimensions - can be controlled, by adding a Fields Map to the parameters.
- Added the ability to link Nama with WhatsApp, by adding the following two screens:
  - WhatsAppMessage
  - WhatsAppMessageConfiguration

  To use the new screens, the WhatsApp module must be added to the license.

### Reports

- In the General Assets report SYSR-AST003, assets for which Asset Disposal documents had been created did not appear. Improved so that disposed assets appear, with the disposal value shown in the report.

## Fixes

### Inventory

- Fixed an issue where, after creating a Stock Receipt for items with a serial number and quantity tracking by serial number, then creating a Stock Transfer based on it, the system did not allow editing the Stock Receipt. Editing is now allowed in both the Stock Receipt and the Stock Transfer.

### Banks

- **Bank Notices:** Fixed an issue where creating a bank notice for cheques under collection showed all old cheques instead of only the cheques that had not yet been collected.

### Contracting

- Fixed an issue where, when creating a Subcontractor Contract and selecting the Analysis Card on the line and selecting the Term Analysis Code, the system did not allow editing the Contracted Quantity field.
- Fixed an issue where, sometimes, in both Salary Records and Salary Vouchers, the system calculated the addition amounts and the salary remainder incorrectly.

### Real Estate

- Fixed an issue where, when a Rent Contract is set up to create a rent accrual entry, deleting the rent accrual caused the system to show the message "The Operation Could Not Be Performed". The system was improved so that deleting the accrual entry also deletes it from the Rent Contract lines.
- Fixed an issue where an error occurred when clicking the "Consolidate Rent Contracts" button on the Collect Document screen.

### Settings

- Fixed an issue where the projContract field appeared on some screens for customers even though they do not have the Contracting system.
- Fixed an issue where the totalAfterTaxes field appeared on the DebitNote and CreditNote screens and was not tied to unused features (Taxes).
- Fixed an issue where the lines.salaryDocument field appeared on some screens for customers even though they do not have the HR module.
- Fixed an issue where the totalAfterTaxes field appeared on the DebitNote and CreditNote screens and was not tied to unused features (Taxes).
- Fixed an issue where, sometimes with large amounts of data, an error occurred when using the entity flow "EAEmpAttendanceSysEntryCalculator" with a Task Schedule action.
- Fixed an issue in the entity flow for transferring data from one server to another.
- Fixed an issue where a manual GUI post action set the Amount field in the payment methods equal to the invoice remainder, in the Sales Invoice, the Maintenance Invoice, and the Sub-Item Sales Invoice, but the field came back null even though the Remaining field had a value.

### Human Resources

- **Aggregated Loan Voucher:** Fixed an issue where the system did not consider the maximum loan limit when an approval was linked to the document.
- **Dues Liquidation Document:** Fixed an issue where, when liquidating annual leave, the system did not calculate any results if the liquidation date was up to January 19, but calculated the liquidation correctly if the date was changed to January 31.
- **Dues Liquidation Document:** Fixed an issue where, in the Components grid, if there were no amounts in the Factor field, the system calculated the total incorrectly.
- Fixed an issue where, sometimes, the system calculated the leave balance incorrectly.

### Fixed Assets

- **Fixed Asset Opening Window - Payments Grid:** Fixed an issue where the Paid, Remaining, System Collected, and Settled fields did not work correctly - for example, if the amount was 1000 and the paid amount was 500, the Remaining field did not show the correct value, and the same applied to the other fields. These fields were also not updated correctly when a Payment Voucher was created based on a Fixed Asset Opening voucher.
- Fixed an issue where the system allowed creating more than one Asset Disposal Voucher for the same asset.

### Contracting

- Fixed an issue where, on the Subcontractor Extract screen, when a tax was added to the Extract and the tax policy inside the Standard Term was "Price Excludes Tax", the VAT value was not calculated correctly.

### Point of Sale

- Fixed an issue where, in the Nama Captain Order application, the item units could not be changed.
- Fixed an issue where, when selecting a table, the system did not insert the table code into the field, so the user had to press Enter for the table code to appear.
- Fixed an issue where clicking Split Invoice did not open a new invoice for the invoice to be split into.
- Fixed an issue where, in the Point of Sale Sales Invoice, clicking the Held Invoices button and selecting an invoice did not add the invoice data to the lines, even though the invoice total was there.
- Fixed an issue where the translation of the references added to the Point of Sale invoice did not work correctly.
- Fixed an issue where the system did not save the Stock Transfer Request after one of the releases.
- Fixed some errors caused by preventing overdrafts.
- Fixed an issue where the screen size negatively affected a number of header fields, causing the bottom shortcut-button bar to disappear as the number of header fields increased. This was addressed in the Invoice, Return, and Exchange screens.
- Fixed an issue where clicking the Customer Code field, then pressing Enter or clicking any other field afterward, opened the Add Customer screen even though the "Ability to Add a Customer" permission was not enabled in the Point of Sale permissions.
- Fixed an issue where, sometimes, creating a Sales Invoice caused the system to hang, and a new invoice could not be created.
