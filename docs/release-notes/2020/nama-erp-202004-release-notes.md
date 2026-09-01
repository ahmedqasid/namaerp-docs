
::: info Release Information
**Release Date:** April 2020  
**Release Number:** 2020.04
:::

# Nama ERP Release Notes - April 2020

## Additions

### Inventory
- Added the `Prevent editing the properties of lines linked to Based On` group to the term config
- Created a Groovy entity flow dedicated to the Item Assembly Method document
- When Location Stocktaking is enabled and a stocktaking start is created for a location inside a warehouse, movements dated before the stocktaking date could not be made for another location inside the same warehouse, because of the **Do not allow movements after stocktaking** option. The system was improved so that this option considers the location rather than just the warehouse
- Added the `Quantity Tracking Skip Tolerance Percentage` field to the term config of Distribution Management documents
- Added the `Only insert alternative materials found in drawn materials on the Assembly document when creating the Alternative Materials document` option to Distribution Management settings
- Improved the system to log the resolution in the `log.cost` file, to make it easier to resolve processing failures caused by adjustments between warehouses
- Designed a new `Application Desktop` app connected to Nama ERP, aimed at tracking the delivery of invoices created in Nama ERP from warehouses: invoices awaiting delivery are shown on a dedicated screen visible to customers, so they can know their turn according to invoice numbers
- Added a Groovy entity flow to create Purchase Orders from a Purchase Request
- Added an option on the Assembly Method to calculate the cost of the supplied item from only the drawn items present in its own planned assembly method
- Created the `"EASupplyChainMergeDocLines"` entity flow, which merges similar lines when creating a document (example: merging items when creating a Purchase Order using the `entityfromentity` entity flow from a Purchase Request that contains the same item more than once because the requesting department differs at the line level)
- **Stock Transfer Document**: Improved so that the Stock Transfer Document's lines are filled with the Production Order's items when it is issued based on a **Production Order**
- **Stock Transfer Document**: Improved so that the Stock Transfer Document's lines are filled with the items of all Production Orders included within the Combined Production Order when it is issued based on a **Combined Production Order**

### Sales
- **Sales Replacement Document**: Added the following fields to the document's term config:
  - A dropdown list (the type of documents created from the Sales Replacement Document)
  - Book and term config of the Sales Invoice
  - Book and term config of the Sales Return
- Added the following two options to the Sales Returns term config:
  - Mark the coupon created on an invoice that was returned as a used coupon
  - Prevent returning an invoice whose generated coupon has already been used on other invoices
- Added the `A return was made for the invoice the coupon was created for` option to the Discount Coupon
- Added the `Add the return to the invoice's payment vouchers and reduce the remaining amount` option to the Returns term config

### Accounting
- Added reference, text and date fields to the `contact` lines in the Customer file

### Customer Relationship Management (CRM)
- In the Main Sales Lead window, added a date field to the customer follow-up lines `assignedTo`

### Human Resources
- Added the `Only create offers and do not update them when the document is re-saved` option in Combined Job Offers, to allow updating only new offers without modifying documents already created
- Added (3) reference fields to the `TimeAttendanceLine` table, bringing the total number of references in that table to (5)
- Added a new file, and the **Leave Balances (Based on Experience)** file
- Added a reference to the **Based on Experience** file in the lines of both the Employee Data Update document and Job Offers, and it was also added to the Leave Type
- Added 11 attachments, bringing the total to 12, with only 5 shown on the screen
- **Employee Window - Companions & Passports Page**: The following fields are now shown by default in the **Passport Data** group on the **Companions & Passports** window:
  - Passport File Number
  - Unified Passport Number
- Created a new file named **Sponsor** and used it in place of the two fields (Sponsor Code / Sponsor Name) in the same location
- **Employee Window - Personal Information Page**: Added both the Middle Name (`Middle Name`) and Mother's Name (`Mother Name`) fields
- Added a date to the lines of the (Combined Leave for Multiple Employees) document
- In one case, an extra day's deduction was applied to an employee's salary, making the salary negative, because the month had 27 days and the employee was absent for the entire month
- Added a date to the lines of the (Combined Leave for Multiple Employees) document

### Real Estate
- Added the `Down Payment After Discount Calculation` option

### Project Management
- **Project Invoice - Document Term Config**: Added an accounting effect for Discount 1 and Discount 2

### Manufacturing
- **Combined Production Order Document**: Added the following two fields to the document header:
  - **Start Production Order**
  - **Cancel Start of Production Order**
- **Combined Production Order Document**: Added a **Cancel Start of Production Order** button to the More menu
- **Production Order - Document Term Config**: Added the `Allow modifying Product Components and Operations after the Production Order has started` option
- **Combined Production Order**: Added the `Recreate Production Orders on save regardless of whether changes exist` option
- **Combined Production Order Document**: Added the `Copied From Document` field to the lines, so a Combined Production Order document can be created based on more than one document

### Fixed Assets
- **Asset Types Window**: Added 5 attachments
- Added the two fields (Attachment 1 - Attachment 2) to the main Fixed Asset screen

### Contracting
- Improved so that, when creating a Subcontractor Contract Penalty document from the Sarky document, the Item Classification field is carried over from the Sarky document to the Subcontractor Contract Penalty document
- Added the following options to the term config of both Contracting Supplies Purchase Invoices and the Subcontractor Extract:
  - Do not add Tax 1 to the cost
  - Do not add Tax 2 to the cost
  - Do not add Tax 3 to the cost
  - Do not add Tax 4 to the cost
- Added the **Item Classification** field to the Cost Distribution lines
- **Subcontractor Material Issue**: Improved so that the unit price of the materials in the details is set automatically based on the last price, and can then be edited

### Point of Sale
- Added the `Disburse to Default` field on the Expense Voucher and the `Receive from Default` field on the Receipt Voucher, for both the machine and the settings; the machine takes priority — if data exists in both the settings and the machine, what is set on the machine is used
- Added the `Allow making an expense from the current employee` option to the POS settings
- Added the `Item Quantity Grouping Method for Sales Lines` field to the machine and to POS settings; it is a dropdown list with (Group by Quantity - No Grouping), and the machine takes priority over the settings
- Added 2 buttons to increase and decrease the quantity at the sales line level
- Added 4 options to the New POS Interface settings (Do not add the button (Repeat - Delete - Increase Quantity - Decrease Quantity)) to allow controlling the buttons shown in the dedicated column in Sales
- Added the **Region** field to the Add New Customer window from POS, along with an option to disable it in POS settings: the `Do not add the Region field to POS customer fields` option

### Settings
- When typing in Arabic on Mac devices, Hindi (Arabic-Indic) numerals were entered and not accepted by the system. Improved so that Hindi numerals are accepted and replaced with regular numerals
- Added an extra Home Page icon to both the old and new GUI, so the main window can be reached in cases such as viewing reports and report dimensions
- **Payment Methods - Fee Tiers**: Added (From Date, To Date) so that the fee amount on POS invoices and their returns, and on Nama ERP sales invoices and their returns, depends on the invoice's actual date falling within the (From Date, To Date) range, in order to calculate a given fee percentage
- Filtered the **Intermediate Account** field on the Legal Entity screen so that it shows only sub-accounts and not subsidiaries
- Added the `Maximum duration in seconds for executing a dashboard query` option to Global Config
- Added the `Aggregates` column-grouping feature with the `(Sum, Avg, Max, Min)` functions. For example, you can group by item and then use the `Sum` function on the quantity field, and the system will sum all the quantities for the same item — to see that item's quantity on the invoice, for instance
- **Global Config File**: Added the following two fields:
  - The folders for which the system should check the remaining space, `CSV`
  - Warn users when the remaining space drops below `GB`
- The default is `"C:\"` on Windows and `"/"` on Linux

### New GUI
- Enabled filtering from the column menu on tables

## Fixes

### Inventory
- Fixed an issue where, when Quantity Tracking was enabled, the system ignored the size in the tracking
- Fixed an issue where, sometimes, enabling the `Create an Additional Receiving Costs document with service items` option on Purchase Invoices caused the `"draft with end must code"` error when saving the invoice; enabling this option after saving the invoice and then re-saving it worked correctly
- Fixed an issue where, sometimes, creating an Additional Receiving Costs document on a Purchase Invoice showed an error message that the document was not balanced
- **Multiple Assembly Document Window**: Fixed an issue where the Assembly Method field was disabled and an assembly method could not be selected
- Fixed an issue where, sometimes, the Multiple Assembly Document could not be deleted
- Fixed an issue where posting an Assembly Method (draft) while leaving the item on the lines empty showed the **Operation could not be performed** error
- Fixed an issue where enabling the use of item relations from the `supply chain` settings with documents (Purchase Order - Purchase Invoice - Purchase Request) did not work the way it did with Sales documents or Stock Transfer
- **Assembly Document - Supplied Items Page**: Fixed an issue where adding an assembly method through the **Supplied Items** table caused the system to reject the added assembly method, because the system did not add the table's total quantity to the quantity field in the header of the **Alternative Assembly Materials** window
- **Assembly Document - Drawn Items Table**: Fixed an issue where selecting a group of items from the lookup inside the item name to insert into the Drawn Items table brought down the item names without their codes
- Fixed an issue where creating a Stocktaking End document and then deleting it showed the following message (The record cannot be deleted because it is used in the Stocktaking End field in the table)
- Fixed an issue where, when using the `Schedule stocktaking procedures (to preserve server resources so users are not blocked)` option and creating a Stocktaking End document with status Preliminary, then clicking (Create a task to change the status to Finished) from the More menu, it was converted to Finished and Active
- Fixed an issue where the system allowed creating an item with sizes without specifying the sizes — an error, and likewise for colors
- Fixed an issue where the Version field on the Assembly Method screen did not show the versions of the selected item

### Purchasing
- Fixed an issue where, sometimes, running a `recommit` or changing the date showed the **Line without amounts** error
- Fixed an issue where, sometimes, a Purchase Invoice could not be saved

### Sales
- Fixed an issue where, sometimes, creating a Sales Invoice for employees showed an error that the document was not balanced, with the difference equal to the full invoice amount

### Accounting
- **Reconcile with Subsidiary Window**: Fixed an issue where attaching a previous memo in the field and then clicking Group did not copy the amounts from the previous memo
- Fixed an issue where, when using a payment method on an Account Transfer document, and the transfer originated from the legal entity's own bank, the fees were posted as credit even though in this case the fees should be debit

### Real Estate
- Fixed an issue where, sometimes, a unit's status remained **Relinquished** even though it had been sold

### Manufacturing
- Added the `Do not copy the warehouse from the Product Components header when entering` option to Manufacturing settings. When enabled, it prevents copying the warehouse from the Product Components header
- **Product Components Window**: Fixed an issue where the system accepted entering a size not found on the item, and allowed saving
- **Operations Window**: Fixed an issue where the system accepted entering a size not found on the item, and allowed saving
- **Combined Production Order Document**: Fixed an issue where, when selecting a From Date and To Date to group Production Requests, checking **Group quantities for the same items**, clicking the **Group Production Order Requests** option, then editing the Production Order Request and returning to the Combined Production Order document and clicking Group Production Order Requests again, all quantities were duplicated. The correct behavior is that clicking (Group Production Order Requests) should clear all lines and regroup them so the quantities are not doubled
- Fixed an issue where changing the actual date on the Combined Production Order did not automatically affect the individual Production Orders

### Settings
- Fixed an issue where placing a window under Unused Screens still left it appearing in the system's dropdown lists. For example, placing the **Sales Order** window under Unused Screens left **Sales Order** as one of the options in the **Based On** list on the Sales Invoice

### Contracting
- Fixed an issue where, on both the **Subcontractor Contract Penalty Screen - Penalty Details** and the **Sarky Document Screen - Cost Distribution**, the cost item code could only be a sub-item, and charging any main item was not allowed
- Fixed an issue where, on the Contracting Supplies Purchase Invoice screen and the Subcontractor Extract screen, charging was only possible on a sub-item and not on any main item
- Fixed an issue where selecting an Executive Budget item code copied that item's description into both the Executive Budget item description and the item description; the correct behavior is that it should not be copied into the item description
- Fixed an issue where, on a Subcontractor Contract, entering an Executive Budget item code did not show it in the Executive Budget item description
- Fixed an issue on the Product Components screen where, applying the following scenario:
  - Selecting Operations
  - Selecting the Finished Product Warehouse in the header
  - Selecting the Operation Cost Center from the line
- The program copied the warehouse from the header onto the line, into the Materials Warehouse field; the correct behavior is that the header's warehouse should not be copied onto the line
- Fixed an issue where linking two Executive Budget items to one Estimated Budget item, then editing the Estimated Budget and trying to save, showed an error
- Fixed an issue where the second window in both the Estimated Budget and Executive Budget files was named (Items, Terms & Payment), when it should have been Items only

### Fixed Assets
- Added an attachment field to Custody Handover, and another attachment field to Custody Transfer
- Fixed an issue where, sometimes, saving the **Asset Approval Expense** document showed the **Operation could not be performed** error

### Point of Sale
- Fixed an issue where, in POS settings, when the `(Number of hours added to the last shift (after 00:00)) = 4` option was enabled, for example, closing a shift after `(00:00)` showed the actual date as the following day's date

### Human Resources
- Fixed an issue where the amount on a Disbursement Request was sometimes incorrect when creating a request based on the Termination Settlement document
- Fixed an issue where an error sometimes appeared when issuing a Salary document
- Fixed an issue where, sometimes, clicking the Issue Salary button on the Payroll Record showed the **Operation could not be performed** error
- Fixed an issue where, sometimes, the system refused to save the Leave document, showing the message (Leave duration must be less than or equal to 0)
- Fixed an issue where, sometimes, clicking the Issue Salary button showed the **Operation could not be performed** error
- Fixed an issue where approving an Add Employee request, then adding a new employee, caused the Add Employee approval to fail
- Fixed an issue where creating a duplicate of a Combined Leave document did not delete the Leave document created on the lines; when saving the duplicate, the system updated the Leave document linked to the Combined Leave that was duplicated, instead of creating a new document
- Fixed an issue where trying to delete a Job Offer linked to a Combined Job Offer showed an empty-log error, with no clear message that the reason deletion failed was its link to a Combined Job Offer
- Fixed an issue where trying to delete an offer from within the Combined Job Offer caused the Combined Job Offer to update all employees without exception in the offers after they were modified
- Fixed an issue where, sometimes, the **Operation could not be performed** error occurred when trying to issue the Payroll Record or when issuing a Salary document
- Fixed an issue where, sometimes, deleting a Job Offer showed an error message with no description
- Fixed an issue where deleting a Stocktaking Start document was rejected by the system because the record was in use in the `WarehouseTaking` table
- Fixed an issue where an error sometimes appeared on the Combined Leave for Multiple Employees document
- Fixed an issue where, in Attendance, when a clock-in fingerprint was on one line and the employee's clock-out fingerprint was on a different line, not the same line, the system counted overtime for the employee even though his working hours were zero — they were not counted because they were not on the same line
- Fixed an issue where creating a Leave Carry-Forward document and calculating showed the correct balance, but saving the document changed all the number values

### Settings
- Fixed an issue where the Material Classification file was still under the Manufacturing license even though it is used in Assembly Methods; it was therefore moved to Distribution Management

### Mobile Applications
- Fixed an issue where, if the user was on a branch other than General and tried to clock in, the system refused to save because the branch was General; the correct behavior is that the branch should be the login branch, not the book's branch, and this should also apply to the rest of the dimensions (Sector - Department - Analytical Group)

### New GUI
- Fixed an issue where, opening the edit screen for any record and changing the browser window width, at a certain width the More button did not show and was covered by the Home button
- Fixed an issue where the attachment preview did not show the first time, in the New GUI
- Fixed an issue where the attachment preview did not work on mouse hover, whether for an image or a `pdf` file
- Fixed an issue where, on the Sales Invoice for example, grouping the lines by the Code — then selecting `Count` from the `Aggregates` menu — made all the data disappear from the table, and selecting any `Aggregate` on another column for the first time did not work; but going to the list view, for example, then reopening the screen and selecting the Code as the group showed the data correctly
- Fixed an issue where placing the cursor in a `Text Rich` field, editing the content and pressing `(CTRL + S)` caused the save to be refused, showing the **No changes** message; if a change had been made in another field, it was saved, but the edits made in the `Text Rich` field did not appear
- Fixed an issue where the `Tooltip` did not work if the `Cursor` was on one of the detail (line) fields rather than one of the document header fields
