# Nama ERP Release Notes - August 2022

::: info Release Information
- **Release Date**: August 2022
- **Release Number**: Nama-ERP-202208
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- **Warehouse Transfer Voucher:** Added the following filters to the "Consolidate Quantities from the Warehouse by Actual Date" button:
  - Item Section
  - Item Classification
  - ....
  - Item Classification 10
- Added the following two fields to Stock Taking Closing:
  - Secondary Serial Number (Book)
  - Secondary Serial Number in the Stock Taking Committee
- Allowed entering the Lot number in the Supply Voucher when the cost source is "Letter of Credit". The Lot number is added through screen editing.

### Purchasing

- Added the terms table found in the Sales Invoice to the Purchase Invoice.

### Sales

- Added the option "Expand Components of the Assembled Item on Save" to the term config of all Sales vouchers.
- Added the attachments (Attachment and Attachment1 … up to Attachment8) to the Partner window, and added them to the window.

### Banks

- In Bank Transfers, changed the label in the document header (Credit) to "Bank Account / Treasury".
- Added the option "Make the Accounting Effect Similar to Receipt or Payment Based on the 'Aging Treatment' Field" to the Bank Transfer term config, taking into account the field "Treated in Aging and Payment Method Expenses Like".
- **Bank Account:** Added the bank account type (Overdraft Current, Current, Investment, Intermediary Account, ............).

### Accounting

- Added the "Paper Type" field (Cheque - Promissory Note) to the Financial Papers grid in each of the following documents:
  - Receipt Voucher
  - Payment Voucher
  - Receipt Request
  - Payment Request
- Improved so that when the option "Prevent Changing the Account Balance Nature" is used in the Accounting settings and in the account, the system also applies the option "Value Ignored When Comparing Fractions" in Global Config.
- Showed the contract field in the Cost Distribution lines in the Journal Voucher, Receipt Voucher, Payment Voucher, Bank Transfer, Payment Order and Receipt Order.

### Real Estate

- Added a button named "Waiver Value Payment Voucher", which creates the Payment Voucher with the value of the "Waived Price" field. Also, in the Payment Voucher, when it is based on the Ownership Waiver Voucher, the amount is carried over from the "Waived Price" field and the installment lines are not added.
- Added the "Paper Type" field (Cheque - Promissory Note) to the installments grid in Real Estate documents.
- **Unit Booking document:** In the document header, increased the number of description, reference and number fields to 10, and also added 5 Boolean fields, and added reference fields to the installments lines.

### Project Management

- Added the option "Consolidate by the Document Period", so that when clicking the "Consolidate Executions" button and selecting this option, consolidation is done by the period found in the document.

### Fixed Assets

- In the Asset Approval window, added the linked screens as they exist in the approvals, as follows:
  - Assignment Vouchers
  - Preliminary Invoices
  - Expense Vouchers
  - Expense Items
  - Expense Item Details

### Human Resources

- **Salary Record:** Added 4 attachments, bringing the total to 5 attachments in the window header.
- **Attendance file:** Added 5 attachments to the window header.
- **End of Service Request:** Added 4 attachments, bringing the total to 5 attachments in the window header.
- **End of Service Voucher:** Added 4 attachments, bringing the total to 5 attachments in the window header.
- **Salary Items Group window:** Added the list "Treatment of Items from Another Type" to the lines of the Salary Items Group document, containing the two options (Addition, Deduction), so that the amount value is added or deducted.
- **Salary Item window:** Added a new grid named "Formula Calculation Table".
- **Settlement Voucher:** Added a field to the Settlement Voucher named "Leave Duration Manually".
- **Settlement Voucher:** Added a new type for the field "Calculate Number of Due Days Based On", which is "Leave Duration Manually".
- **Settlement Voucher Term Config - Effect Settings:** Added the field "Include the Component's Effect With" on the line in the "Effect Settings" table. The field includes the options (Settlement Voucher Journal Entry - Payment Vouchers' Lines on Creation - Either of Them).
- In the Settlement Components definition, added the list "Include the Component's Effect With, Like the One in the Settlement Document Term Config".
- Improved so that when creating a Payment Voucher based on a Settlement document, while there is a balance with a negative sign on one of the subsidiary accounts, its nature is reversed. For example, if the balance of the Subsidiary 1 account is (3000) and the account's nature is debit, the value is copied to the credit side when creating the Payment Voucher, and vice versa.
- Improved the system so that leave is prorated correctly when there is more than one data update.

### Freight Management

- Added date fields in the Operation Order Delivery document - the second page, the grid for certificates and forms.

### Contracting

- Added a list view (listView) on the Related Records page named "Penalty Vouchers" in each of the following screens:
  - Rent Contract
  - Opening Rent Contract
  - Ownership Waiver Voucher
  - Sales Contract
  - Opening Sales Contract
- Added a list view named "Contract Addenda" on the Statistics page found in the Project Contract, showing the contracts whose type is a contract addendum based on the main contract.
- **Subcontractor Extract:** Amended the calculation of the "Total Due Value" so that it takes into account the terms value after tax.
- **Project Contract Amendment:** Added 4 attachments, bringing the total to 5 attachments in the window header.
- Improved so that when the item code is selected in the Contracting Purchase Order, the "Item Description" field is expanded.
- **Contracting Settings:** Added the grid "Salary Items Contributing to Contracting Costs", with (Item Type - Treatment of Items from Another Type).
- Created a document named Contracting Purchase Request, similar to the Purchase Request but containing the fields of the Contracting Purchase Order.
- In the Subcontract Penalty Voucher and Project Fine screens, added 5 attachments to the document header and 2 attachments on the lines.
- In the Subcontractor Execution screen, added 10 "n" fields on the lines.
- Added the following two fields to the term config of each of (Salary Voucher - Depreciation Voucher):
  - Debit of Contracting Cost
  - Credit of Contracting Cost
- Added "Vehicle" to the lines of the Assignment Voucher and the Employee & Equipment Cost Distribution to Projects Voucher.
- Added the following fields to the Employee & Equipment Cost Distribution to Projects Voucher:
  - From Vehicle, To Vehicle.
  - From Make, To Make.
  - From Model, To Model.
  - From Vehicle Group, To Vehicle Group.
  - From Branch (Vehicle), To Branch (Vehicle).
  - From Sector (Vehicle), To Sector (Vehicle).
  - From Department (Vehicle), To Department (Vehicle).
  - From Analysis Group (Vehicle), To Analysis Group (Vehicle).
- Added the following options to the term config of the Vehicle Insurance Policy and the term config of the Add Vehicle Insurance Voucher:
  - Use the document as a cost source in Contracting.
  - Calculate the day's cost from the net after discount.
- Added the field "Quantity | Previous %" to the lines of each of "Subcontractor Execution - Subcontractor Extract".
- Added the option "Prevent Saving If the Quantity of Issued Items Exceeds the Quantity of Items in the Purchase Order" to the Contracting Materials Issue term config.
- In the Contracting settings and the term config of Extracts (Project - Subcontractor), added the option "Calculate Prices Based on Total Quantity".
- In the Extracts lines, added the following fields:
  - Total Overall Price, calculated as = Total Price in the current Extract line - Total Price in the previous Extract line.
  - Net Difference, calculated as = Net in the current Extract - Net in the previous Extract.
  - Discount1 Difference, calculated as = Discount1 Difference in the current Extract - Discount1 Difference in the previous Extract.
  - Discount2 Difference, calculated as = Discount2 Difference in the current Extract - Discount2 Difference in the previous Extract.
  - ………….and so on up to Discount8 Difference
  - Due Value, calculated as = Net in the current Extract - Net in the previous Extract.
- In the Extracts term config, added a new section named "Effects of the Total Quantity Difference", for the accounting effect.

### Point of Sale

- Added a new window named "Additional Items for the Item in Point of Sale".
- Added a new file named "Point of Sale Mobile Interface Settings", used to determine the fields to be shown in the document header and details, working the same way as the regular interface settings file; this file is linked inside the Register or the Point of Sale settings.
- Added a new icon (Paid) next to the Send icon, to identify paid invoices, which cannot be edited; sent invoices can now be edited until they are paid.
- Improved the Nama POS Captain Order app so that items can be entered normally instead of using the Add button to enter items.
- Added the ability to search for each of (Color - Size - Version) of the item.
- Added a logout button in the Captain Order app.
- Even with a held invoice that had a table selected for it, opening the Held Invoices screen showed this held invoice without the table it was held on.
- Added a button to create the customer while opening a Sales Invoice in the Point of Sale Captain Order program.
- In the Nama Captain Order app, added a mechanism to select more than one saved draft and send them at once, without entering each invoice separately.
- Added the Point of Sale Cancel Reservation screen to the Favorite Documents.
- When opening a Sales Invoice and clicking the Reservation field, all existing reservations appeared, including ones not relevant to the user.
- In previous versions, when searching for customers, employees, etc., the system filtered based on the register's branch, so it would search, for example, for all employees working in the current register's branch. Added a feature to allow filtering per document, so that the branch's customers are searched for in the Return Invoice, while all customers are searched for in the Sales Invoice.

### Document Management (DMS)

- Added the option "Filter Folders by Archive in Archival Documents" to Global Config.
- Added the term config field to the "Folder Movement" document, where the book of the movement document that will be created is selected in the term config, in the "Created Movement Book" field.
- Added the option "isSalesNotPurchase" to each of the following windows:
  - Misc Purchase Order
  - Misc Purchase Request
  - Misc Invoice
  - Contracting Supplies Purchase Invoice
  - Labor & Equipment Issue Invoice
  - Equipment Operation Invoice
  - Contracting Supplies Purchase Order

  It is shown through screen editing.

### Project Management

- To consolidate the executions found in Project Invoices, added the option "Consolidate by the Document Period", so that when clicking the "Consolidate Executions" button and checking the option, the system consolidates by the period found in the document.

### Settings

- **Fields & Screens Settings:** In the "Text Fields Converted to Links" grid, added the list "Link Type", containing the options (Email, Phone Number, Link), so that when selected, the chosen field is turned into a link of the selected type. For example, if Email is selected, a link is added next to the field to communicate by email, while if the link type "Phone Number" is selected, a link to call and a link to communicate via WhatsApp are added.
- Added the following options to each of the Approval Definition file and the Alerts Definition file:
  - "Sector Must Match the Record's Sector When Searching for Employees"
  - "Legal Entity Must Match the Record's Legal Entity When Searching for Employees"
  - "Branch Must Match the Record's Branch When Searching for Employees"
  - "Department Must Match the Record's Department When Searching for Employees"
  - "Analysis Group Must Match the Record's Analysis Group When Searching for Employees".
- Added the ability to display lines in custom list screens.
- Added a query in the Approval Definitions, like the one found in Alerts, so that SQL can be used in the approval summary or in the confirmation.
- **Approval Definition:** Added the field "Fields Allowed to Be Edited" to the Steps grid lines.
- Added the createdFrom field to pending tasks.
- Added a new option to the Criteria-Based Validation screen named "Ignore Validation on Approval", so that when this option is enabled, the validation is ignored when the responsible person approves.
- Allowed reading system fields in GUI post actions.
- Added the following fields to Global Config:
  - ratePatternInReports=Rate Pattern In Reports
  - percentPatternInReports=Percent Pattern In Reports
  - datePatternInReports=Date Pattern In Reports
  - dateTimePatternInReports=Date Time Pattern In Reports
  - timePatternInReports=Time Pattern In Reports
- Added a new list named "Criterion Type" to the lines of the Criteria-Based Validation definition, and removed the old field "Warning, Not an Error". The list contains the options (Error - Warning - Confirmation).

### Mobile Applications

- Added a field to the User and to the Permissions file named "Allow Login Through Apps Only".
- In the Stock Taking app, added fields for Serial 1 and 2, as is the case for the Lot, and they are treated the same as the Lot field in showing and hiding, as well as in the Electronic Stock Taking document on Nama.
- Added the ability to search for the item, or scan the barcode, and also search by serial number, and also search for the customer by phone number.
- Added the following features to the consolidated app:
  - Enabling the Dashboard.
  - Not showing documents sent to Nama from the mobile app on the mobile app.
  - Adding "Based On" to the Electronic Collection Voucher.
  - Adding returns to the app.
  - Adding an attachment as an alternative to the customer's signature, while keeping the customer's signature.
  - Adding Discount 1 to the sales lines.
- In the Captain Order app, the following issues occurred:
  - After clicking the magnifier to select a customer or sales rep, a field was added to search within this table, like the one found in Point of Sale, such as by code or name.
  - When choosing to add an item, a mechanism was added to search for items within the system, and a mechanism to scan the item with the camera.

### Reports

- Created a new report "SYSR-INV032" that shows the transactions that led to an overdraft, with their dates.
- Amended the report SYSR-INV027.

## Fixes

### Inventory

- Fixed an issue where cost processing did not correctly consider the priorities and voucher dates.
- Fixed an issue where, when using Based On a Sales Order in (Assembly Request - Assembly Voucher), the details appeared in the withdrawn items rather than the supplied items; the correct behavior is that when Based On (Sales documents) is added in the Assembly Request or Assembly Voucher, they appear in the supplied items, not the withdrawn items.
- Fixed an issue where creating an Assembly Voucher or Multiple Assembly Voucher based on a Sales Order did not insert the final product on the line, to be able to set the required assembly method for it.

### Purchasing

- Fixed an issue where the system did not correctly save the edit history record of the Detailed Purchase Order (PO) document.

### Accounting

- Fixed an issue where, in both the Receipt Voucher and Payment Voucher, when the option "Do Not Copy Installments" was enabled in the Receipt or Payment term config, changing the value of the Amount field caused the system to copy the installments again from the Based On voucher; the correct behavior is that installments are not copied when the amount is entered or changed while the option "Do Not Copy Installments" is enabled.
- Fixed an issue where, in some cases, the system did not accept saving a Closing Entry.
- Fixed an issue where creating a Payment Voucher based on a Leave Allowance Payment Voucher did not copy the amount into the Payment Voucher, and did not set the account on the line.

### Contracting

- Fixed an issue where saving any document or file in Contracting that affects the item's costs, such as (Subcontractor Extract - Contracting Materials Issue - Subcontractor Materials Issue - the "السركي" document), took the system a long time to save the document.

### Human Resources

- Fixed an issue where deleting a Consolidated Mission Voucher showed an error message: the voucher could not be deleted because there was a Mission Voucher based on it.
- Fixed an issue where deleting an employee who had been added without any transactions on them showed the message "Technical error happended".
- Fixed an issue where, in some cases, the system showed a message that the employee had no leave balance, despite a balance existing.
- Fixed an issue where, in some cases, the system incorrectly calculated the remaining duration in the Leave Allowance Payment Voucher.

### Manufacturing

- Fixed an issue in the **Production Order** where the actual indirect costs calculated in the Closing Voucher were not taken into account when re-saving the Product Delivery voucher.
- Fixed an issue where, in some cases, the message "Operation Cannot Be Performed" appeared when saving the Production Order.
- Fixed an issue where making any edits to the Production Execution, or performing a recommit, deleted the issue permits linked to the execution.

### Project Management

- Fixed an issue when consolidating executions in Project Invoices, where on save, the invoice code was added to lines that did not belong to the same invoice. The correct behavior is to take the customer, project, invoice and employee into account when sending the invoice code to the execution, since there can be more than one line in the execution with different customers and projects.
- Fixed an issue in the Project Phase document with calculating extensions: in Phase 3 and every phase after it, the system did not calculate the expected phase end date despite an extension being added.

### Real Estate

- Fixed an issue where calculation errors occurred when generating rents, when the unit's rent value contained fractions (e.g. 500.56).

### Settings

- **Entity Flow:** Added the option "Runs After the Document Is Saved as Final and Affects the Database".
- **Entity Flow:** Created a "List View" named "Pending Entity Flows".
- Fixed an issue where, in the Approvals window (Current Approvals), using filters to filter some approvals showed the message "Operation Cannot Be Performed".
- Fixed an issue where trying to approve a group of documents from the Approvals list screen, selecting a group and then choosing "Approve Selected Records" from the More menu, showed the error "Operation Cannot Be Performed", even though the system accepted it without errors when trying to approve a single document.
- Fixed an issue where an approval defined with Delete also worked with deleting drafts, which was incorrect.
- Fixed an issue where, in some cases, trying to perform a reprocess through the BizRequestView screen gave the error "Operation Cannot Be Performed".

### Human Resources

- Fixed an issue in the **Dues Settlement document** where the system did not settle end-of-service dues correctly.
- Fixed an issue where saving the Leave Allowance Payment Voucher document caused the system to clear the value of the Total Allowance field and the value of the Leave Duration field.
- Added an attachment at the approval step of a document, so the attachment is shown in (View Approval Log) on the voucher.

### Contracting

- Fixed an issue where, after adding the field "Total Actual Costs of All Extracts", the cost was only calculated on final save; the correct behavior is to calculate the value when saving as a draft too.
- Fixed an issue in the Subcontractor Execution where, when the "Execution Percentage" field contained decimal fractions, the system rounded up to a whole number; the correct behavior is not to round up.

### Document Management (DMS)

- Fixed an issue where, when registering a "Folder Movement" document, the system did not transfer the data found in the "Movement Details" block to the equivalent "Movement Details" block in the "Document Movement" document that the system automatically creates on save; the correct behavior is to copy all fields to their equivalent fields on save.

### Fixed Assets

- Fixed an issue where performing a recommit on the Assets Opening voucher showed the message "Operation Cannot Be Performed".
- Fixed an issue where, in some cases, the system calculated the depreciation installment incorrectly, resulting in a negative depreciation installment.

### Point of Sale

- Fixed an issue where the system was slow when navigating in general, especially when opening any group of favorites. To work around this issue, please use the option "Do Not Use Item Images" in the Point of Sale settings, and download the new Point of Sale version.
- Fixed an issue in the "Nama POS Captain Order" app where clicking the back arrow caused the system to hang (Hanging).
- Fixed an issue where the system did not respond when trying to open the "(Table Inquiry)" screen.
- Fixed an issue where a calculation error sometimes occurred when entering the item via the barcode.
- Fixed an issue where, after creating a Reservation Order Voucher in Point of Sale with the reservation date, reservation time and reserved table entered, opening a Point of Sale Sales Invoice and selecting the reservation did not insert the reservation data from the customer and the reserved table.
- Fixed an issue where switching Point of Sale from Arabic to English left the line and header fields showing in Arabic, and they only changed after closing Point of Sale and reopening it.
- Fixed an issue where, in some cases, only one invoice could be held, and holding any invoice after that was refused.
- Fixed an issue where, in some cases, reserving tables from a Reservation Order Voucher with a specific date and time, then opening a Sales Invoice in Point of Sale and selecting the table, showed the table as not reserved.
- Fixed an issue where, in the Nama Captain Order app, the size of the header and details within the app differed from one device to another.

### Freight Management

- Fixed an issue where, when using Descriptors specific to a document and selecting the address and searching, the selection did not appear in the document header and only appeared in the details.

### Mobile Applications

- Fixed an issue where creating a Leave Voucher through the app showed all the leave types existing in the system. Improved so that when the leave type is selected, only the ones available for the job position are shown.
- Fixed an issue where the Approvals screen in the NamaEss App and the consolidated app did not show the documents awaiting approval, and returned (Null).
- Fixed an issue where, in the Approvals screen in both NamaEss and the consolidated app, approving a document showed an error log.
- Fixed an issue where the Captain Order app could hang (Hanging).

### Reports

- Amended the general Fixed Assets report "SYSR-AST003", correcting the formula "Net Asset Value" because the formula was wrong.
