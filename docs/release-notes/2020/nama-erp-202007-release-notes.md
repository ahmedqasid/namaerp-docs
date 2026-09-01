# Nama ERP Release Notes - July 2020

::: info July 2020 Release
**Release Date:** July 2020  
**Release Number:** 202007
:::

## Additions

### Inventory

- Added the following files:
  - **Driver Delivery Organization**
  - **Driver Settings**
  
- Added the field **"Nearest Delivery Date Info"** to Distribution Management documents

- Added the option **"Use Driver Delivery Organization"** to Distribution Management settings

- Added the field **"Driver Delivery Organization"** to the Sales documents term config

- Added a document named **"Replacement Request"** so that a Replacement Voucher can be created based on it

- **Assembly Voucher:** Removed the planned-items grid from the screen and turned it into a `View List`, since with a large number of lines it was increasing the document's opening time

- Added the option **"Consider Overdraft Per Cost Dimension Not Per Qty Dimension"** to the Distribution system settings

- Created a new option named **"Ignore Compliance with Price Lists When a Sales Voucher Exists in Based-On"** to ignore the "Compliance with Price Lists" option in the Sales documents term config

- Added the option **"Allow Issuing and Receiving the Same Item in the Same Assembly Voucher"** to the Assembly Voucher term config

- Added the option **"Place the Item Cost Link on a Separate Page"** to Distribution Management settings

### Sales

- Added the file **"Order Status Settings with Quantity Tracking"**

- Added the following to the Distribution Management documents term config, in the Quantity Tracking group:
  - **Update Order Status on -** which contains (Tracking on First Quantity - Tracking on Second Quantity)
  - **Order Status Settings with Quantity Tracking**
  - **Check the Executed Quantity** (manually + automatically) when changing the sales order status to Cancelled

- Improved the **Replacement Request**, when created based on a sales invoice, so that it makes the quantities negative like the Replacement Voucher

- Added the option **"Allow Saving with Items That Have No Price (While Complying with Price Lists)"** to the Sales documents term config

- Added **Attachment 3, Attachment 4, Attachment 5** to each of the following windows:
  - Sales Quotation
  - Sales Invoice

### Accounting

- Improved the **Accounting Payment Vouchers** so that when an amount is entered in the `Debit Amount` field, the system deletes the amount entered in the `Credit Amount` field, as is the case in journal vouchers

- Added the option **"Allow Multiple Payment Methods in Payment and Receipt Vouchers"** in Accounting settings, to show the payment-methods grid on the Payments page of these vouchers

- Added the option **"Allow Multiple Payment Methods"** in the Payment and Receipt Vouchers term config, to enable multiple payment methods

- Added an option inside the **Tax Policy**, namely **"Give This Policy Priority Over the Policy Specified on the Customer and Vendor"**

- Improved the **Payment and Receipt Vouchers** so that when a payment or receipt voucher is created based on an invoice and the subsidiary is an account, the system removes this account from the subsidiary and copies it into the account name on the line

- Added the option **"Prevent Entering Values Different from Those in the Term Config, Such as Account Source Type - Related Subsidiary (Their Accounts)"** to the Receipt and Payment Vouchers term config

- Added **attachments on the header and on the lines** to the Dividend Distribution document

### Document Management (DMS)

- Added the following to the `HOEmployeeAchievementLine` table:
  - `number 10`
  - `text 10`
  - `ref 10`
  - `description 10`

### Human Resources

- **Dues Liquidation document:** Added the following fields to the Payroll Voucher lines (on the Leave Liquidation page and the End-of-Service Liquidation page), before the Final Salary field:
  - **Total Additions**
  - **Total Deductions**

- Created a system indicator named **"Daily Vacation Days (Recurrences Apply)"** `Vacation Type Value Daily`

- Created a system indicator named **"Daily Indicator From SQL"** "A daily manual indicator from an SQL statement"

- Added the following two fields to the **Leave Voucher:**
  - **Previous Balance of the Main Leave Type Before the Leave Starts**
  - **Remaining Balance After the Leave, of the Main Leave Type**

- Added the option **"Do Not Repeat the Disbursement During the Same Combined Payroll Period"** to the Disbursement

- Added the option **"Consider the Leave as Ending at Month End When No Voucher Is Recorded Directly, Counting the Leave Days Without Salary"** in the Leave Type settings

- Added the fields **"Periodic Shift Code"** and **"Labor Group Shift Code"** to the statistics found on the Payroll Voucher. They can be shown by customizing a screen

- Added the filter **"Payroll Run Scope"** to both the **"Performance Indicator Values"** document and the **"Manual Indicators Document"**

- **Bulk Advance Voucher:** Changed the way the last installment date is calculated, on the header or on the lines, so that it is calculated from the number of installments

- If the "without" rounding method is used in the salary formula, then when issuing a Payroll Voucher the error **"Cannot Execute the Operation"** appears

- In the **Leave Voucher**, on the line field `Leave Type`, the leave type is now filtered by employee

- In the **Leave Voucher**, duplicate lines (employee, leave type and duration) are now prevented

### Contracting

- Added the option **"Allow Calculating Taxes Through the Tax Settings"** to Contracting settings, to allow taxes to be calculated through the Tax Settings

### Manufacturing

- Added the option **"Copy Manual Lines Only When Creating a Voucher Based on a Production Order"** to Manufacturing settings

### Real Estate

- **Expense Type window:** Added the option **"With Every Installment"** to the `Due Every` list

- **Rent Contract - Fees, Terms and Expenses page:** Added the option **"With Every Installment"** to the `Due Every` list in the expense details

- Added the option **"Fully Paid"** to the lines of the Opening Rent Contract document

- Added the field **"Price List Type"** to the Real Estate Price List

- Created a **"Convert to Property"** button `Create Real Estate` on the Fixed Asset Voucher, and also **"Convert to Properties"** `Create Real estates` in the More menu on the list view

- Added the fields **"Price Reduction Debit and Price Reduction Credit"** to the Waiver Voucher term config

- **Unit screen:** Improved the system so that when the building code is entered for this unit, the system copies the owner from the Building screen into the Owner field on the Unit

- On the **Rent Contract and Opening Rent Contract** screens, made the `Percentage Basis` field mandatory on the **"Fees, Terms and Expenses"** details page when the expense percentage type is a percentage

- **Bulk Collection Voucher:** Improved so that when the contract is selected on the line in the window's details, then the Installment Code field is clicked, the system displays the codes and types of uncollected installments

### Service Center

- Added the option **"Cannot Edit a Line Whose Status Is Ended"** to Service Center settings

- Added 5 `ref` fields on the lines of the **Technician Notes** `CRMVisitEmployee` in the following documents:
  - Visit Request
  - Visit

### Hospital Management System

- Added the **Medical Specialty** to all invoices on the lines; when the specialty is added on the document header it appears in the details, and when the specialty is not added on the document header it is not added to the details

- **Bulk Advance Voucher:** Changed the way the last installment date is calculated, on the header or on the lines, so that it is calculated from the number of installments

- If the "without" rounding method is used in the salary formula, then when issuing a Payroll Voucher the error **"Cannot Execute the Operation"** appears

- In the **Leave Voucher**, on the line field `Leave Type`, the leave type is now filtered by employee

- In the **Leave Voucher**, duplicate lines (employee, leave type and duration) are now prevented

### Contracting

- Added the option **"Allow Calculating Taxes Through the Tax Settings"** to Contracting settings, to allow taxes to be calculated through the Tax Settings

### Manufacturing

- Added the option **"Copy Manual Lines Only When Creating a Voucher Based on a Production Order"** to Manufacturing settings

### Real Estate

- **Expense Type window:** Added the option **"With Every Installment"** to the `Due Every` list

- **Rent Contract - Fees, Terms and Expenses page:** Added the option **"With Every Installment"** to the `Due Every` list in the expense details

- Added the option **"Fully Paid"** to the lines of the Opening Rent Contract document

- Added the field **"Price List Type"** to the Real Estate Price List

- Created a **"Convert to Property"** button `Create Real Estate` on the Fixed Asset Voucher, and also **"Convert to Properties"** `Create Real estates` in the More menu on the list view

- Added the fields **"Price Reduction Debit and Price Reduction Credit"** to the Waiver Voucher term config

- **Unit screen:** Improved the system so that when the building code is entered for this unit, the system copies the owner from the Building screen into the Owner field on the Unit

- On the **Rent Contract and Opening Rent Contract** screens, made the `Percentage Basis` field mandatory on the **"Fees, Terms and Expenses"** details page when the expense percentage type is a percentage

- **Bulk Collection Voucher:** Improved so that when the contract is selected on the line in the window's details, then the Installment Code field is clicked, the system displays the codes and types of uncollected installments

### Service Center

- Added the option **"Cannot Edit a Line Whose Status Is Ended"** to Service Center settings

- Added 5 `ref` fields on the lines of the **Technician Notes** `CRMVisitEmployee` in the following documents:
  - Visit Request
  - Visit

### Hospital Management System

- Added the **Medical Specialty** to all invoices on the lines; when the specialty is added on the document header it appears in the details, and when the specialty is not added on the document header it is not added to the details

### Customer Relationship Management (CRM)

- Added (2) `ref` fields to the Grid for **"Technician Notes"** in the **"Visit Request"** document and the **"Visit"** document

### Point of Sale

- Added the field **"Favorite Item Button Display Method"** to Point of Sale settings

- Improved the way field labels are displayed so that the system shows them on two lines when needed

- Discontinued work on the old interface and now works only on the new interface

- Added **five attachments** that can be added to the Point of Sale interface through Point of Sale settings

- Added the following two options to Point of Sale permissions:
  - **Ability to Make a Return in Another User's Shift**
  - **Ability to Make a Replacement in Another User's Shift**

- Improved so that a message is shown that the fee account for the payment method is required if it is left empty while fees exist

### Settings

- Added two options to the More menu to show the inputs for quantity tracking, as follows:
  - **Inputs Affected by the Document**
  - **Inputs That Affect the Document**

- Added a report-dimensions list containing the options (Select All - Delete All - Delete Selected Lines)

- Added a `Combo Box` named **Export Type** when exporting through the More menu, containing (`JSON` - `EXCEL` - `XML`)

- Added the export type to the **"Files Export / Import Menu"** screen

- Added the option **"Do Not Calculate Item Tax with This Policy"** to the Tax Policy file

- Attachments are now taken into account when exporting with `json` export

- Improved the system so that when importing (Attendance & Departure - Bank Reconciliation Statements), two columns, for example, are merged into a single column between them (-):

```
m1=#ignore#date{dd-MM-yyyy}#empid#ignore#ignore#ignore#ignore#text1{-}#intime{HH:mm:ss}#outtime{HH:mm:ss}#text1{-}#ignoreLinesFromTop{1}
```

- Created a new entity flow `EASCPreventChangingFromDocFields`, which works on the same idea as `EAPreventChangingFields`, but instead of making sure the data has not changed between the previous version and what is being saved, it makes sure the data matches, in the fields you specify, between the voucher and the voucher it is based on

- Doing the following steps shows an empty message:
  - Creating a filter in the list view showing invoices whose actual dates are greater than 2020-01-01
  - Opening any invoice among them
  - Clicking the **"Next Invoice"** button on the top bar of the invoice-navigation view

- Added the ability to import a `json` file through the `Integrators` mechanism

- The `EAFieldsValueCalculator` entity flow now has the ability to remove spaces between words and to convert similar-looking characters into a unified form

- Improved menus so that only menu items covered by the customer's license are shown, and they no longer contain all of Nama's items, while still respecting whatever has been hidden or changed by editing the menu

### Mobile Applications

- Added the ability, in the Collection app, to sort vouchers in descending order, since currently, when there are 120 vouchers on the device, printing any voucher created today requires scrolling down to the end of the list

- Added a `Password Master` for the `pin` of the `Nama StockTaking` app

### Reports

- In report **SYSR-HRS016**, improved the system so that if the consumed, allocated and remaining are all equal to zero, the system does not show the line

- Added the ability to not show document-template reports in the reports list, since their display style may be unclear to many customers

- Added sorting by creation date to the following system reports:
  - `SYSR-ACC031`
  - `SYSR-ACC003`
  - `SYSR-ACC035`
  - `SYSR-INV004`

- Modified the Branch Expense Analysis report **SYSR-ACC013** so that the report sorts by account code

- Improved system reports so that when system reports are updated, reports that are no longer used are deleted, or their codes are changed

## Fixes

### Inventory

- Some items have no balance but show a negative balance in the **"Current Inventory Value"** report; a query was designed to fix this issue

- Fixed an issue where, with an overdraft transfer, in some cases the cost was not updated between the outgoing and incoming lines, causing cost discrepancies

- Fixed an issue where, when an inventory document that performs inventory reservation is issued and is pending approval, the system allowed the person who issued the document to cancel or execute the reservation

- Fixed an issue where, when a stock count was ended through the End Stock Count task, the ending details did not include items that were actually found by the counting committee but have no balance in this warehouse

- Fixed an issue where, when the option **"Show Stock Count Ending Lines in a List View Instead of a Grid"** was enabled, an error occurred when counting an item with a positive quantity while its book balance is zero

- **Item file:** Fixed an issue where, after selecting a vendor in the "Restrict Purchase to Vendor" field for an item, searching for that item afterward in a Purchase Order with the same vendor selected did not show it

### Sales

- Fixed an issue where selecting the option **"Do Not Summarize Payment Method Expense Entries"** on a payment method caused a problem saving invoices that have payment methods

- Fixed an issue where an error sometimes appeared when navigating between sales invoices using Next or Previous

- Fixed an issue where an error sometimes occurred when trying to save a sales order

### Purchasing

- Fixed an issue where selecting the option **"Do Not Summarize Payment Method Expense Entries"** on a payment method caused a problem saving invoices that have payment methods

### Accounting

- Fixed an issue where, in some cases, a problem appeared where the closing entry was unbalanced

- Fixed an issue where, when clicking Create Payment Voucher from within a Disbursement Request and then selecting the document's term config in the Payment Voucher, the system did not correctly bring in the subsidiary account found in the term config

- Added the following options to the Debit Note and Credit Note vouchers term config:
  - Do not calculate Tax 1 in the invoice value
  - Do not calculate Tax 2 in the invoice value
  - Do not calculate Tax 3 in the invoice value
  - Do not calculate Tax 4 in the invoice value

- Added the option **"Do Not Use Invoices in Debt Ages"** to the Debit Note and Credit Note vouchers term config

- **Debit Note and Credit Note vouchers:** Added the `Invoice Value` field to the document details; from then on, if the note document's term config does not calculate any of the applied taxes, the system subtracts this tax from any of the invoices listed in the details, so that the invoice value in the details no longer includes this tax (or these taxes), and the "Invoice Value" in the details is also added to the invoice value on the document header

### Banks

- The group related to coverage (letter-of-guarantee coverage) has fields that are too small, in the following documents:
  - Issuing a Letter of Guarantee
  - Delivering a Letter of Guarantee
  - Receiving a Letter of Guarantee
  - Ending a Letter of Guarantee

- Fixed an issue where, in some cases, the system did not allow saving an "End Letter of Guarantee" document

- Fixed the following errors in the term config of both the "Issue Letter of Guarantee" document and the "Update Letter of Guarantee" document:
  - When accounts are entered on the tax-effect page and the record is saved, the system deleted the accounts on save
  - When a tax policy at the bottom of the page is selected, the system did not display anything

### Human Resources

- Fixed an issue where, in some cases, the system showed an extra holiday on the Payroll Voucher while no holiday exists on that day

- Fixed an issue where the system did not calculate the value of the Net Paid Leave Duration field and the Paid Leave Duration field until saving twice

- **Bulk Advance Voucher:** Fixed an issue where, on save, an error appeared saying the amount on the document header is empty even though the amount exists on the lines, and likewise the number of installments, first installment date and last installment date. Also, the Amount, Number of Installments, First Installment Date and Last Installment Date fields, when empty on the lines, are now filled on save from the same fields on the document header

- Fixed an issue where, in leave vouchers for more than one employee, the **"Leave Duration on Lines"** field did not calculate the leave duration correctly, since it ignored other leaves falling within the leave duration

### Contracting

- **Subcontract - Terms page:** Fixed an issue where entering clauses and saving, then adding a new clause, caused the system to delete the unit price of all previous sub-clauses

- **Subcontract - Terms page:** Fixed an issue where, when entering the contracted quantity and unit price, the multiplication was performed correctly, but when the contracted quantity was later edited, the total price was divided by the contracted quantity, making the unit price wrong

### Settings

- Fixed an issue where, when navigating between lines with the keyboard and deleting a line, after the deletion the selection moved to the first line. For example, deleting line 21 left the system positioned on line 1 after the deletion

- Fixed an issue with compound sectors, where selecting more than one sector in a compound sector and then deleting any of them kept what had been recorded regardless of the changes made

### Point of Sale

- Fixed an issue where, when an item department or category is set on the file of items sent to Point of Sale, the system refused to save

- Fixed an issue where hiding columns had no effect on those columns, for example (tax columns and discount columns)

- Fixed an issue where the discount value did not work correctly when typing into it

- Fixed an issue with transferring the shift closing in Point of Sale

- Fixed an issue where the Quick Help definition did not work with the new Point of Sale layout

### Hospital Management System

- Fixed an issue where the system did not create an inventory issue for the items on a Procedures Invoice

### Real Estate

- Fixed an issue where, when clicking the Create Installments button on the Opening Rent Contract screen, the system created the installments incorrectly, and when saving the contract again the message **"Database error occurred"** appeared

- Fixed an issue where an error appeared when saving a Bulk Collection Voucher

- **Rent Contract:** Fixed an issue where the system, in some cases, calculated the expenses added on the installments incorrectly

### Fixed Assets

- Fixed an issue where the entity flow for creating Partial Asset Disposal and Fixed Asset Opening vouchers sometimes showed an error when saving the document

- Fixed an issue where, when deleting one of the assets from one of the documents (Asset Purchase Invoice, Asset Opening Voucher, Asset Assignment Voucher), an error occurred trying to delete the asset, since the system, after deleting it from any of these documents, did not delete it from the two tables (Asset Attributes and Asset Location)

- Fixed an issue where an error appeared when saving an Asset Purchase Invoice again

- Fixed an issue where, in some cases, a fixed asset was depreciated with a negative value even though the asset is not fully depreciated

- Fixed an issue where, on an Asset Purchase Invoice, selecting a vendor did not update the vendor in the asset's purchase information with the vendor found on the (lines of the) Asset Purchase Invoice

- Fixed an issue where the entity flow for creating Partial Asset Disposal and Fixed Asset Opening vouchers led to an error on save, since the Partial Disposal voucher did not work with a fully depreciated asset

### New GUI

- Fixed an issue where, logging in as a user with **"Keep Me Logged In"** selected, creating a new file or document and entering data, then opening a `new tab` next to the main one, clicking `logout all users`, returning to the first tab and trying to save, a blank page appeared

- Fixed an issue where, opening the Executive Contracting Budget screen and clicking Add New, the error **"Cannot Execute the Operation"** appeared

- Fixed an issue where, when adding an item image, it was not displayed correctly on the item file, unlike in the old user interface

- Fixed an issue where the employee photo in the new `gui` was not sized according to what is set in Global Config: a width ratio of 15 was selected, and the height was auto-adjusted to the group height relative to the width

- Fixed an issue where allowed values were set for the `text2.details` field on the Miscellaneous Invoice screen, but it still appeared as a text field instead of appearing as a list

- Fixed an issue where, when there is a board with inputs and the inputs window is closed with **"Close"**, the interface no longer responds afterward, whether to buttons or to any element in the interface

- Fixed an issue with how the list is displayed

- Fixed an issue where, when working with a particular `theme` in the New GUI different from the default, closing the `browser` and reopening it reverted the `theme` to the `default` look and the chosen look was not applied. The default `theme` was made `default` instead of `blue opel`

- **Subcontract - Terms page:** Fixed an issue where entering clauses and saving, then editing the unit price after saving, turned the field into a `disabled field` that no longer accepted edits to the unit price, even though it works in the old GUI

- Fixed an issue with filtering from the `column menu`, where filtering on a date did not work correctly, as follows:
  - When choosing any option such as (Equals - Contains), the menu closed before the data was completed, and reopening it caused the system to delete the old data
  - Filtering on one column deleted the filters existing on other columns; the correct behavior is to allow a filter on more than one column at the same time

### Reports

- In report **SYSR-HRS016**, the Consumed Days columns did not work and were always "zero"

- In report **SYSR-ACC013**, there was an error in that it counted instead of summing

- Corrected the item cost calculation formula in the report (Inventory Movement Statement with Costs), code **SYSR-INV002**, since for some items the report showed an error due to a failed division operation

- In report **SYSR-ACC007**, the hyperlink on sub-accounts showed an error and required re-running the Account Statement report to work, as in the **"General Ledger Trial Balance"** report; the option **"Hide Zero Values in the Hyperlink"** was also made always `true`

- In the **"Debt Ages Documents Details"** report, settlements that came after the "As Of Date" were being taken into account, which is incorrect

- Corrected the query in report **SYSR-INV001**, since it was bringing back all items and ignoring the from-item to-item filter

- Fixed an issue where, when running the Leaves report **SYSR-HRS016**, the remaining balance did not show correctly; a new column, **"Remaining Until Year End"**, was therefore added, and the column **"Remaining"** was renamed to **"Remaining as of Date"**

- In the Monthly Income Statement report **SYSR-ACC009**, clicking the hyperlink on the balances of parent accounts in the tree, such as account 4 (Revenues & Sales) or account 5 (Costs & Expenses), in any month column or the Total, resulted in no data in the report opened from the hyperlink

- In the Financial Position Statement by Account report **SYSR-ACC010**, the Company parameter had no effect: selecting a from-company to-company range brought back the totals of all companies, not just the selected company; the report was therefore corrected, and its code was also changed to **SYSR-FNS007**

- The Purchase Invoice print template does not calculate the net correctly
