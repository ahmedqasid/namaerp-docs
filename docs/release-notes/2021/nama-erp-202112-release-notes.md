# Nama ERP Release Notes - December 2021

::: info Release Information
- **Release Date**: December 2021
- **Release Number**: Nama-ERP-202112
- **File Size**: 190.6KB
:::

## Additions

### Inventory
- Added **10 Boolean fields** to each of the **Aggregation Request** screen and the **Aggregation Voucher** screen
- Developed a mechanism in the Aggregation Voucher so that when the method is changed, the new method is re-expanded, the old lines in the Aggregation Voucher are deleted, and the quantities are recalculated from scratch
- To support this mechanism, the entity flow `EARegenAssemblyDocumentDetailsFromBOM` was developed, which can be used in a manual entity flow — with the option "Requires Saving When Run Manually" checked — and then added to the list view for Aggregation Vouchers

### Purchasing
- **Purchase Quotation window**: The description fields in the Header were increased to **10** instead of **5**, and the text.details fields were increased by adding **7** more, bringing them to **10** as well
- **Vendor Data Edit Request**: The following changes were made:
  - The field **"Update Type"** was added, containing the two options (Add New, Update Existing), so that if the "Update Vendor Data" button is used with the first option, the system adds a new vendor, and if the second option is selected, the system updates the vendor that already exists in the document
  - The Actual Date and the Editing Date are now shown, making it similar to the system's other documents
- **Vendor file**: A list of Vendor Data Edit Requests was added to the Statistics window
- **Purchase Invoice**: On the Payment Vouchers page, only the Notices (when paying via Notices) belonging to the document's Subsidiary are now shown

### Sales
- The option **"Number of Days to Allow Creating Future-Dated Documents"** was added to the Tax Configuration file
- **Customer Data Edit Request**: The following changes were made:
  - The field **"Update Type"** was added, containing the two options (Add New, Update Existing), so that if the "Update Customer Data" button is used with the first option, the system adds a new customer, and if the second option is selected, the system updates the customer that already exists in the document
  - The Actual Date and the Editing Date are now shown, making it similar to the program's other documents
- **Customer file**: A list of Customer Data Edit Requests was added to the Statistics window

### Accounting
- A term config was added to each of the following two documents:
  - Miscellaneous Purchase Order
  - Miscellaneous Purchase Request
- **Accounts Portfolio**: The option **"Do Not Copy the Portfolio's Accounts to the Subsidiary"** was added
- **Miscellaneous Invoice**: On the Payment Vouchers page, only the Notices (when paying via Notices) belonging to the document's Subsidiary are now shown

### Project Management
- **Task Execution**: The system creates a Procedure document even though there is no data in the "Next Procedure" field
- The option **"Create an Accounting Effect for Lines That Have No Expense Term"** was added to the Project Invoices term config

### Document Management (DMS)
- Added a new file named **"Add a Compressed File to Archival Documents"**
- **Document Subject**: Both the Folder and the Archive (Location) were added to the "Document Subject" file
- **Document Subject**: The file was set up so that when selecting the Subject in the Archival document, the filtering is applied to Subjects that have the same Archive or no Archive, and likewise for the Folder

### Contracting
- **Subcontractor Contract**: Each of (Extract Number, Extract Type, Net After Tax, and Total Amount Due) is now shown in the displayed Extracts of Subcontractor Contracts
- **Contracting Material Issue Request**: 5 attachments were added to the document header
- **Contracting Supplies Purchase Invoice**: On the Payment Vouchers page, only the Notices (when paying via Notices) belonging to the document's Subsidiary are now shown
- The option **"Do Not Aggregate the Condition When Aggregating Conditions in the Extract"** was added to the Standard Condition window
- Improved the Contracting Extracts so that, when applying the Conditions, the net values of the Conditions are pulled in after the tax is applied
- In each of the **Estimated Budgets** and **Executive Budgets**, the following buttons were added:
  - Convert to a Contract
  - Convert to a Subcontractor Contract
  - Convert to a Contract with the Selected Lines Only
  - Convert to a Subcontractor Contract with the Selected Lines Only
- **Project Extract**: The field **"Total Cost"** was added to the document header, representing the sum of the cost of all the terms listed in the document
- A new document was added named **"Assigning Employees and Equipment to a Project"**
- A new document was added named **"Distributing Employee and Equipment Costs Across Projects"**
- The option **"Allow Editing the Extract Details If Based on an Execution"** was added to the term config of each of the two documents "Project Extract", "Subcontractor Extract"
- Linked Salary to Contracting in the Cost Terms
- **Contractor Data Edit Request**: The following changes were made:
  - The field **"Update Type"** was added, containing the two options (Add New, Update Existing)
  - The Actual Date and the Editing Date are now shown, making it similar to the program's other documents

### Real Estate
- Added a document named **"Unit Handover"**

### Customer Relationship Management (CRM)
- Added the "Contract Terms" table to the Maintenance Contract document
- Added the "Contract Terms" fields (Issue Level, Issue Description, Response Time, Remarks 1, Remarks 2) to each of the following documents:
  - **Maintenance Notice**: where the user can search for them from the Maintenance Contract belonging to the notice
  - **Maintenance Order**: where the system pulls them from the "Maintenance Notice" field of the Maintenance Order
  - **Maintenance Order Execution**: where the system pulls them from the "Maintenance Order" field of the Execution document
- Added the two fields (**Machine Type**, **Machine Classification**) to the document header of each of the following documents:
  - Maintenance Visit, Maintenance Contract, Maintenance Invoice Return, Maintenance Invoice, Maintenance Work Plan, Maintenance Assay, Maintenance Notice, Maintenance Order, Pre-Installation Inspection
- In all the documents mentioned in the previous point (on the Spare Parts and Services page), the search for Spare Parts in the Spare Parts table was modified so that the system pulls in the spare parts that exist for the Machine Type mentioned in the document
- Added **five classifications** to the "Maintenance Job Order" document. They are shown by customizing the screen
- Added a new document named **"Update Machine Data"**
- Added the following files:
  - Machine Classification 1, Machine Classification 2, Machine Classification 3, Machine Classification 4, Machine Classification 5
- **Questionnaire screen**: **10 Boolean fields** were added
- **Maintenance Contract**: In the Machines details, **7 fields** specific to the Visit Type were added (Visit Type 1, Visit Type 2, etc.), each a list containing the options (Daily - Weekly - 15 Days - Monthly - Annual - Every 3 Months - Every 6 Months)
- **Maintenance Work Plan**: The button **"Group Machines That Have the Same Specified Visit Dates"** was added, grouping machines based on the filter, taking (the Room, Building, or Floor) into account when grouping
- **Maintenance Order Execution**: **2 attachment fields** were added to the line, at the level of each task in the Maintenance Order Execution, in the Tasks grid

### Fixed Assets
- **Asset Purchase Invoice**: On the Payment Vouchers page, only the Notices (when paying via Notices) belonging to the document's Subsidiary are now shown

### Human Resources
- Improved so that specific Components (or a group of Components) can be specified in the Tax Formula, with only their values considered in the Tax Base; another Component (with a higher order) can then be created to calculate the taxes
- Reworked the tax calculation, which includes recalculating the tax starting from the second disbursement in a way that complements the tax brackets from the first disbursement

### Point of Sale
- Improved the **Search list** — accessed via the **F12** key — so that it works the same way as Favorite Items
- Improved so that the Service Invoice is treated like the Regular Invoice if there is no term config specific to the Service Invoice

### Settings
- The button **"Transfer Approvals to the Delegated Employee"** was added to the More menu in the edit screen and list view of the Delegation window
- The option **"Ignore Item Lines That Have the Following Tax Code"** was added to the Tax Authority Configuration
- In the **Tasks Pending** screen, the option **"Re-run the Selected Tasks"** was added to the More menu
- **Send Documents to the Tax Authority document**: The two fields "Aggregate Documents From Date", "Aggregate Documents To Date" were added
- **Global Config**: The field **"Type List"** was added to the "Add Archival Documents To" grid
- The option **"Allow Printing Drafts"** was added at the document term config level

## Fixes

### Inventory
- Fixed an issue where creating a POS Inventory Count Committee, selecting it in the details of a Stock Inventory Count Committee, and then clicking the "Create Stock Inventory Count Committee Lines" button showed the message "The operation cannot be performed"
- Fixed an issue where saving an Inventory Count Start voucher without entering the document's term config showed an error with an unclear message. The message was corrected
- **Price List**: Fixed an issue where adding the same item with different Dimensions at different prices showed the message "Line 2 is a duplicate of line 1"
- Fixed an issue where, when duplicating a line using the shortcut (Shift + Insert), the system copied the attachment — if one existed on the copied line — and afterwards, editing one of the two attachments made the system apply the same edit to the other attachment

### Purchasing
- Fixed an issue where, when issuing a Purchase Invoice based on a Purchase Order and then issuing an Additional Costs voucher based on it, if the user reselected the same Purchase Order again and saved the invoice, the system deleted the additional cost entry
- Fixed an issue where, in the Vendor Data Edit Request, selecting the update type "Update Existing" and choosing a specific vendor showed the message "The operation cannot be performed"

### Sales
- Fixed an issue where, when selecting an Aggregation Voucher on a Sales Invoice line through the "Copied From Voucher" field, the system pulled in the correct item, but the Aggregation Voucher was then automatically cleared from the "Copied From Voucher" field
- Fixed an issue where, when checking the option for automatically inserting the sole term config, the system inserted the term config into the document but did not enable the options belonging to that term config on the document
- Fixed an issue where the system did not allow creating a Sales Return that is sent to Taxes while leaving the "Based On" field empty

### Fixed Assets
- **The Depreciation Document**: Fixed an issue where selecting the Date and the Asset Group, then selecting From Sector to Sector and clicking Aggregate Assets, did not pull in the assets; however, selecting the Date and the Asset Group and specifying the Sector from the Dimensions, then clicking the Aggregate Assets button, did pull in the assets

### Contracting
- Fixed an issue where the system did not allow a **recommit** on the Cost Execution voucher to address cost discrepancies. To resolve this issue, the following **utility** was developed:
  ```
  http://localhost:8080/erp/test?util=com.namasoft.modules.contracting.domain.utils.util.RecalculateCostExecutionAndUpdateProjExtractCostsUtil
  ```
- **Contracting Contracts**: Fixed an issue where, when adding a Project Contract that contains a large number of terms (250 terms, for example), editing the Quantity or Unit made the system take a long time to apply the edit
- Fixed an issue where the system coded the terms incorrectly in both the Executive Budgets and the Estimated Budgets

### Human Resources
- Fixed an issue where, in some cases, when an employee started work during the month, the Salary Components were not calculated correctly
- Fixed an issue where, when creating a Job Offer or updating an employee's data, the following data was not added to the employee:
  - empRate, overTimeRate, vacationDayRate, hourlyWorkCost
- Fixed an issue where creating an Approval voucher for the Holiday Overtime indicator also added the number of Regular Day overtime hours to the employee, even though no Approval voucher had been created for the Workday Overtime indicator
- Fixed an issue where an error sometimes appeared when trying to save a Salary Voucher
- Fixed an issue where an error sometimes appeared when trying to save a Salary Record
- Fixed an issue where, in some cases, a Start of Work voucher could not be deleted
- Fixed an issue where clicking Missions in the employee's Statistics to view their Missions showed the message "The operation cannot be performed"
- **Employee window**: Fixed an issue where the Leaves list view (View List) showed incorrect balance information
- **Leave Balance Adjustment window**: Fixed an issue where the system showed an incorrect value in the "Current Remaining" field
- **Bulk Leave Voucher**: Fixed an issue where, in some cases, the system did not calculate the employee's balance correctly

### Manufacturing
- Fixed an issue where, in some cases, editing some of the system's documents such as the Production Order showed the message "The operation cannot be performed"

### Banks
- **Letter of Guarantee Issuance document**: Fixed an issue where the system did not take the Issuance Fees into account when calculating the tax, as it did not add the Issuance Fees to the tax
- **Letter of Guarantee Issuance document**: Fixed an issue where the system did not automatically insert the tax into the "Sales Tax 1" field as soon as the document's term config was specified, through the Tax Policy set in the term config
- **Bank Transfer document**: Fixed an issue where the system allowed creating a Bank Transfer based on a Payment Request for an amount larger than its value, causing the remaining amount on the Payment Request to become a negative number

### Settings
- The prefix for System Journal Entries' serial numbers was changed to work in the **Tempo** style
- Fixed an issue where the error "The operation cannot be performed" occurred when running a **calendar**-type chart widget
- Fixed an issue where creating a Receipt Book made up of **2000 receipts** or more caused the system to take a long time loading before creating these receipts

### Fixed Assets
- **Fixed Assets Purchase Order**: Fixed an issue where, after adding the Tax Policy in the term config, checking each of the options "Subject to Tax", "Allow Editing the Invoice Tax on the Line", "Tax Can Be Edited", saving the term config caused the system to set the previous fields' values to **False**

### Contracting
- Fixed an issue where the **Contracting Purchase Invoice** did not post journal entries in one of the releases
- Fixed an issue where, after changing the Condition Aggregation Policy in the Subcontractor Extract so that aggregation is done using the tax-inclusive amount, the system did not save the Extract document

### Hospital Management System
- **Stay Invoice**: Fixed an issue where an accounting side could not be set on Reference 1 found inside the Room at the line level

### Point of Sale
- Fixed an issue where, when a user had full permissions, the system did not automatically grant new permissions to the user
- Fixed an issue where, when using the **pole display** and paying an invoice, the change-due message disappeared quickly, so the user could not see it, and the welcome message for the new invoice appeared quickly
- Fixed an issue where, in the Point of Sale, selecting the option "Use Order Reservation Vouchers" from the Point of Sale configuration prevented logging into the Point of Sale
- Fixed an issue where the Creation Date column in the Point of Sale did not display the data correctly

### Point of Sale
- **Service Contract document**: Fixed an issue where the system required the Unit as well as the customer's ID card number and Legal Entity, even though they already existed within the customer

### New GUI
- Fixed an issue where Point of Sale errors (the Machine Errors page in the Machine screen) did not display correctly when shown in the new look
- Improved the Grid Dashboard in the new interface
