# Nama ERP Release Notes - December 2019

::: info Release Information
**Release Date:** December 2019  
**Release Number:** 2019.12
:::

## Additions

### Inventory
- Added the option `Use Zero for Non-Costed Supplies Under FIFO` to the Distribution Management Configuration
- Added the warehouse to the dimensions that allow overdraft
- **Processing Document**: Added a new page called `Direct Labor`
- Added price dimensions to the Item Relations file, in both the window's header and details
- Improved the system so that, when the option `Prevent Saving After Stock Taking` is enabled in the Distribution Management Configuration, it prevents editing quantities but allows editing the document only if the purpose is adding remarks or similar
- Grouped all the options related to stock taking into the `Stock Taking Configuration` page in the Distribution Management Configuration file
- Added the two fields `Active Ratio` and `Inactive Ratio` to work like size, dimension, and color; accordingly, the following options were added to the Distribution Management Configuration:
  - Use the Active Ratio
  - Use the Inactive Ratio
  - Do not verify that the Active Ratio matches when linking stock documents to invoices
  - Do not verify that the Inactive Ratio matches when linking stock documents to invoices
  - Consider the Active Ratio when searching for the last selling price
  - Consider the Inactive Ratio when searching for the last selling price
  - Consider the Active Ratio when searching for the last purchase price
  - Consider the Inactive Ratio when searching for the last purchase price
  - Group by the Active Ratio
  - Group by the Inactive Ratio
  - Consider the Active Ratio in offers
  - Consider the Inactive Ratio in offers
  - Allow numbers and letters in the Active Ratio field
  - Allow numbers and letters in the Inactive Ratio field
- Added 5 attachments to the Stock Taking Committee so the customer can attach the actual paper committee report alongside what is entered in the stock taking committee on the system
- Added the option `Calculate the Assembled Item Quantity from the Supplied Items` to the Assembly document term config
- Added the option `Allow Entering an Item Code and Name Without Selecting an Item` to the Distribution Management Configuration
- Added the option `Calculate the Assembled Item Quantity from the Supplied Items`, to calculate the quantity through a quantity instead of calculating it through the quantity entered in the header of the Supplied Items - Document page
- Added the `Assembly Operation File` to the Assembly system
- Added the `Packaging Method File` to the Assembly system
- Modified the Assembly document to work with the two new files
- Added the following fields to bring in costs from assembly operations on the Expense Items page of the Assembly document:
  - Assembly Operation 1, Assembly Operation 2, ....... Assembly Operation 5
  - A new table with the assembly operations

### Purchasing
- Added 3 `text lines` to the Purchase Price List
- In the Purchase Invoice, when using the field `orginDoc.details` to link Purchase Orders, the system does not pull the price from the price lists
- Added the option `Allow Paying an Amount Greater Than the Invoice Value` to the Purchasing term config, noting that the accounting entry will only be processed correctly if the excess payment is made through payment methods and not the Paid in Cash field

### Sales
- Added the option `Allow Paying an Amount Greater Than the Invoice Value` to the Sales term config, noting that the accounting entry will only be processed correctly if the excess payment is made through payment methods and not the Paid in Cash field

### Accounting
- Improved the Shift Closing window so that, when searching for a shift to close, only shifts currently in the Open status are shown
- Added the option `Do Not Compare the Total Invoice Values with the Voucher Header Amount` to both the Receipt & Payment Vouchers and the Debit & Credit Notes
- **Miscellaneous Invoice - Payments Window**: Improved so that, when trying to link the invoice to a Payment or Receipt Voucher, the search is limited to vouchers linked to the same subsidiary
- **Shift Open/Close Voucher**: Improved the document so that, when opening a new shift, the system does not allow opening the shift unless the previous shift has been closed
- **Receipt & Payment Vouchers**: Added the option `Consider the Lines Amount When Grouping Invoices` to the Receipt & Payment Vouchers term config
- **Receipt & Payment Vouchers**: Added the option `Ignore the Voucher Value` to the dialog window that appears when grouping invoices in the Invoices window, so that all invoices belonging to the subsidiary are brought in regardless of the invoice value
- **Receipt & Payment Vouchers**: Improved the Receipt & Payment Vouchers so that, when selecting invoices via the lookup and choosing more than one invoice, the total of the selected invoices is calculated so their sum is entered in the Receipt Voucher's total
- Added the option `Allow Leaving the Financial Paper Due Date Empty` to the Accounting Configuration
- Added a `View List` of shift transactions to the `Shift Opening` document

### Contracting
- **Subcontract**: When hovering over the Term Code, improved so that the Standard Term and its description are shown, letting you see the term's name and description before selecting it; then, upon selecting the code and pressing `Enter`, the Standard Term's name and description are inserted automatically on the line
- **Site Diary**: Added the Executive and Estimated Budget term code and the Project Contract code to the lines of the Fines screen
- Added the following entity flows:
  - `EAUpdateRemarksInExtractFromContractTermDescription`
  - `EAUpdateRemarksInContractorExtractFromProjectContractTermDescription`

  This is to add the ability to copy the description of the Project Contract term, the Subcontract term, or the Estimated or Executive Budget term into the line's remark field, with the ability to specify the number of levels whose description will be copied. What is meant by levels here: if a term's code is 2.1.3, this means it is a sub-term of 2.1, which is a sub-term of 2. You can control the level and the lines that will be updated according to the inputs
- In the Additions and Deductions lines of the Subcontractor Extract and the Project Extract, added five reference fields `Ref` and five text fields `text`
- **Site Diary - Fines Page**: Added the fields `Subcontract` and `Remarks` to the document details
- **Site Diary - Main Page**: Improved so that when entering the `Estimated Term Code` or the `Executive Term Code`, the system inserts the `Term Description`
- **Site Diary - Fines Page**: Improved so that, when adding more than one line for the same Subcontract, the system issues a single Fine Voucher for them
- Added the following windows:
  - Pre-Concrete Inspections
  - Post-Concrete Inspections
  - ITPs
  - ITP Registers
  - Material Receipts
  - MRR Registers
  - Cleaning And Flushings
  - HydroStatic Test Reports For Fire Protection System
  - Activity Inspection Requests
  - Underground Piping Check Lists

### Fixed Assets
- Created a new document named `Consolidated Asset Properties Voucher`
- Improved the Fixed Asset Purchase Voucher so that, when selecting a term config linked to a tax policy with Tax 1 `Tax3` or Tax 2 `Tax4`, the tax is inserted automatically on the invoice
- Added the line fields `Reference 1...`, text `1...`, and number `1...` to the Depreciation Voucher

### Human Resources
- **Provisions Recalculation Document**: Improved the document so that the total field `totalOfPreviousPeriodsTotal` uses the number of decimal places defined in the currency
- Increased the number of attachments in the Employee Record to 5 attachments
- Added the option `Consider Business Trips When Calculating Overtime` in the Human Resources Configuration
- Added a button for creating an employee from the Job Offer window

### Real Estate
- Added tax fields to the Consolidated Unit

### Point of Sale
- Reduced the size of the Payment screen to fit POS terminals
- Added the option `Use Favorites Colors as Background` to the Terminal file
- Added the option `Start with the New Sales Interface` to the Terminal file
- Improved the display of item categories in the new Point of Sale interface so that they appear in a tree structure that is better and easier to use
- Made Quick Help also work with `Double Click`, in addition to the `F9` shortcut key
- **New Sales Window**: Introduced the following improvements:
  - Widened the vertical navigation bar to make it easier to use on `Touch Screen`s
  - Rearranged the icons to display better
  - Made the quantity field accept fractions

### Manufacturing
- Improved so that the record can be saved without entering resources in either of the two files (Standard Operations file, Operations Routing)

### Settings
- Added attachment 1 to the User File
- **"Favorite Note" Document**: Added 5 `Boolean` fields to the lines
- **Fields & Screens Settings**: Created a new `Field Styles` table for the colors, background, and text direction section
- Created a new entity flow named `EAPreventChangingFields` to prevent editing a line of a previously saved document, and it can be used together with the ability to save
- Modified the entity flow `EAGenerateEntityFromEntityAction` so that the sixth input is the name of the lines the entity flow runs on. The seventh input was also made to allow the entity flow to work with the input only
- **Permissions File**: Added the option `Display via Search`
- Improved the entity flow `EAGenSCDocFromDocWithFieldsMap` so that it allows saving a draft, and also takes approvals into account if any exist
- Added the following two options to the Global Config:
  - Search for the company logo in the report parameters when logged into the general company
  - Use the voucher's company logo when printing the screen template

  This is to show the company logo found in the report dimensions (From Company)

### Reports
- Introduced improvements to the report `002INV-SYSR`
- Added a new report named `025INV-SYSR`, a new report for barcodes
- Moved the report `042ACC-SYSR` (Subsidiary Trial Balance - by Date) from the (System Reports - Accounting) group to the (System Reports - Financial Statements) group, like the rest of the trial balance reports
- Added a template for printing the accounting entry
- Added the Debit party to the Receipt window template
- Added the Credit party to the Payment window template
- Added the report `026INV-SYSR`, which works like the report `002INV-SYSR` but using the `FIFO` method

### Mobile Applications
- Designed a new mobile application whose purpose is to look up items by code or barcode to display specific data that can be assembled and defined via a query written for it, such as the item's price, the item's image, and the item's balance in a warehouse or warehouses, so that the data is retrieved by connecting to Nama without needing to download the items' data onto the device being used
- Added an option to the Mobile Application Configuration so items can be `Scan`ned using the mobile's camera

### New GUI
- Reformatted the Results Columns screen, where the `List Boxes` used to appear in about a third of the space while the rest of the screen was empty

## Fixes

### Inventory
- Fixed an issue where, when working with the `FIFO` costing method, creating an Assembly document made the system create an Issue Voucher and a Stock Receipt Voucher, but when creating the Stock Receipt Voucher it did not take into account the cost of the items issued in the Stock Receipt Voucher
- Fixed an issue where, when creating a Purchase Price List and selecting `Adhere to the Price List` in the Purchasing term config, the system allowed the user to change the price (i.e., it did not adhere to the price list)
- Fixed an issue where, in the Distribution Management Configuration, enabling the option `Prevent Saving After Stock Taking` prevented saving but did not prevent deleting or editing
- Fixed an issue where, in the Warehouse Transfer document, clicking the Quick Help button gave the error message `The operation cannot be performed`
- Fixed an issue where an error sometimes appeared when saving an item or when saving the item settings
- Fixed an issue where editing the field `n` in the header of a Stock Issue Voucher after the voucher had been added to an invoice caused an error
- Fixed an issue where an error occurred when enabling the two options `Allow Using a Branch Different from the Warehouse's Branch` and `Allow Using a Sector Different from the Warehouse's Sector` in the Warehouse Transfer Request term config

### Sales
- **Price List**: Fixed an issue where the system allowed saving a line containing a (size - color - version) combination not defined for the item; the correct behavior is to prevent saving and show the line number
- Fixed the following issues that occurred when creating a Sales Invoice that is a main delivery document and having this invoice generate a Reservation Voucher — the Reservation Voucher had the following issues:
  - It did not reserve the quantity
  - Its term config allowed saving when the option `Use the Delivery Table in Reservation` was enabled, which was wrong since it is not a main delivery document
  - In the Delivery Configuration file, when selecting the warehouse source as the reservation warehouse for the reservation document, saving the invoice showed a failure due to an `exception`
- Added a new document named `Sales Exchange` to the Sales menu, to exchange goods sold to a customer for other goods
- Fixed an issue where, in the Delivery Configuration file, when selecting the warehouse source as the reservation warehouse for the reservation document, saving the invoice showed a failure due to an `exception`
- Fixed an issue where, after creating a Sales Invoice with two installments, then adding a Receipt Voucher for part of the invoice value, and then returning to the invoice and trying to change any field in it, the system objected that the remaining amount is less than the installments value; the correct behavior is to ignore the amount paid via payment vouchers when comparing the installments to the invoice's remaining amount
- Fixed an issue where an error occurred when deleting a voucher-cancellation voucher for a Sales Invoice

### Purchasing
- Fixed an issue where, in the Purchase Quotation term config, enabling the option `Tax Can Be Edited` caused the system to disable the option upon saving
- Fixed an issue with the following scenario in a Purchase Quotation:
  - Entering a taxable item (the system automatically copies the tax rate onto the line from the item)
  - Entering the quantity
  - Entering the price

  the program deleted the tax rate from the line, and refused to allow entering the tax manually
- Fixed an issue where the error `The operation could not be performed` occurred when creating a Purchase Invoice based on a Purchase Order that had lines in installments
- Fixed an issue where, when entering items into the Purchase Invoice details via `orginDoc.details`, such as the items of a Purchase Order, the system did not pull the prices of these items as defined in the Purchase Price Lists

### Accounting
- Fixed an issue where an error occurred when saving a Payment Voucher containing a Purchase Invoice paid in a foreign currency
- Fixed an issue where, when closing a shift, the system did not correctly zero out the amounts when opening the next shift
- **Cashier Receipt/Payment Voucher**: Fixed an issue where, after adding the subsidiary or a based-on reference and then selecting the shift, the data disappeared; the correct behavior is that the document should not be affected by selecting the shift
- Fixed an issue where, in some cases, an error appeared when creating a Closing Entry
- Fixed an issue where the entity flow `EAAddAccountingEffect` did not create the accounting entry when no accounting entry existed
- Fixed an issue where, when creating a Payment Voucher from Accounting based on a Salary Voucher or a Payroll Record, the Salary Voucher or Payroll Record showed that an amount equal to the Payment Voucher's amount had been paid and showed the remaining amount if any; however, when creating a bank transfer from the Banks module against a Salary Voucher, it did not show that a payment had been made and did not affect the Salary Voucher in any way
- Fixed an issue where creating a Receipt Voucher based on a Receipt Request showed an error that the remaining amount cannot be negative

### Banks
- Fixed an issue where the Bank Reconciliation Memo sometimes worked incorrectly

### Contracting
- Fixed an issue where, when creating a Subcontract and giving it quantities equal to the Project Contract's quantities, a message appeared stating that the quantity cannot exceed the Project Contract's quantity
- **Subcontract**: Fixed an issue where the Project Contract's term code did not appear correctly in the Subcontract, and other codes appeared instead
- **Fine Voucher**: Fixed an issue where the Executive Budget code did not appear
- **Subcontract Fine Voucher**: Fixed an issue where an error occurred when selecting the term in the document header
- Fixed an issue where, in some cases, the error `The operation could not be performed` appeared when saving a Selling Material to a Subcontractor document

### Point of Sale
- Fixed an issue where, in some cases, the system failed to open the Point of Sale
- Fixed an issue where some slowness was noticed navigating between levels in the Favorites section of the new interface
- Fixed an issue when dealing with the invoice category using a query statement via Quick Help
- **New Sales Window**: The following issues were discovered:
  - The number was not shown in full when increasing the font size
  - The invoice value was not shown in full when increasing the font size
  - The scroll bar for moving up and down did not appear at the fourth level
  - When searching by the `Salesperson` field, the system showed all employees instead of showing only salespeople
  - The favorites bar disappeared when scrolling down through items; the correct behavior is to pin the favorites bar and keep the search and quantity always visible, unaffected by scrolling
  - When typing text in the search while the favorites screen contained categories, an item or items were displayed and the screen froze, making it impossible to go back to the categories except by switching the program's interface
  - The transfer request did not work with the new interface

### Human Resources
- **Provisions Recalculation Document**: Fixed an issue where the field (Total of Previous Manual Adjustments) was not included in calculating the (Total) when calculating vacation provisions, while it was calculated correctly when calculating the end-of-service provision
- **Provisions Recalculation Document**: Improved so that the decimal places of the fields (Net Days, Total of Previous Periods from Provisions Opening) are based on the decimal places defined in the currency
- Fixed an issue where, in some cases, clicking Reissue kept loading and never finished
- Fixed an issue where the system allowed saving the salary component (Advance Repayment) even though the option `Do Not Modify the Value on Reissue` was enabled, which caused more than one Advance Voucher to have no effect on the Salary Voucher
- Fixed an issue where, when saving a Leave Voucher for a specific employee, an error message appeared stating that another employee had exceeded the balance; the correct behavior is to recalculate the balance only for the current employees, not other employees
- Fixed an issue in calculating the employee's balance when the employee is on non-regular leave

### Settings
- Fixed an issue where using the function `tafqeet.NamaRep` with a negative value showed an error in the amount-in-words conversion
- Fixed an issue where creating a report containing a `QR code` made the report not work

### Fixed Assets
- Fixed an issue where, after deleting Depreciation Vouchers and re-entering them, the depreciation installment was not calculated correctly, as it divided the asset's acquisition cost by the remaining life instead of the asset's current cost
- **Partial Asset Disposal Voucher**: Fixed an issue where, when saving the document, its status became Processing Failed
- Fixed an issue in the asset depreciation values starting from the second installment
- Fixed an issue where, after issuing an Asset Purchase document and specifying the `Depreciation Start Date` and saving, viewing the Statistics page inside the asset showed the (Depreciation Start Date) as the same as the Asset Purchase Voucher's date, instead of the depreciation start date entered in the Asset Purchase Voucher
- Fixed an issue where running the `utility` for recalculating asset depreciation did not calculate the last depreciation date correctly, calculating the date based on the opening document's actual date; as a result, a Depreciation Voucher could not be created for the asset since it was not picked up by the `button`

### New GUI
- Fixed an issue where the system did not warn the user before deleting the record
- Fixed an issue where, when opening any list view for the first time, the system did not automatically `AutoFit` the columns
- Fixed an issue where pressing the down arrow in a field with `provider suggestion` in the grid while suggestions were displayed triggered a new search, making it impossible to move between the suggestions using the arrow key
- Fixed an issue where, in the Chart of Accounts tree view, the top group displayed as `undefined`
- **Salary Voucher**: Fixed an issue where the embedded list view `Attendance Details for the Period` did not work in the New GUI
- Fixed an issue where selecting from a `list` field caused the selection list to appear again
- Fixed an issue where, after changing a field's value and then using the Save button directly, the system showed the message `There are no changes to save`
- Fixed an issue where, after changing the value of a field and then closing the window without saving, the system did not show a message that there were unsaved changes
- Fixed an issue where, in some cases, the text inside an alert overflowed outside the alert box
- Fixed an issue where, in the New GUI (mobile version), the filter did not work when viewing a list and clicking it
- Fixed an issue where the shortcut for showing the line details in documents and files, `F6`, did not work
- Fixed an issue where `Hidden columns` were not taken into account and all columns were shown
- Fixed an issue where, when editing a field and saving directly, the system did not take into account the changes made to the field

### Reports
- Fixed an issue in the reports `013HRS-SYSR` and `014HRS-SYSR` where grouping the Day-Off Overtime treated it the same as Working-Day Overtime
- Fixed an issue in the system report `016SLS-SYSR` with grouping the invoice discount
- Fixed an issue in the Subsidiary Account Statement report `033ACC-SYSR` where, when using the Record Type filter and the From Record To Record filter, it showed no data even though data actually existed
- Fixed an issue in the system report `024ACC-SYSR` where it ignored transactions dated on the `To Date` parameter's date
- Fixed an issue in the system report `002LCD-SYSR` where it showed incorrect data
- Fixed an issue where incorrect data appeared in the system report `003INV-SYSR`
- Reviewed the Human Resources reports group, as it contained reports specific to Project Management, and some reports were duplicated
