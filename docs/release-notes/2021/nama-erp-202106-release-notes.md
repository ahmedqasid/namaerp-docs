# Nama ERP Release Notes - June 2021

::: info Release Information
**Release Number:** June 2021  
**Release Date:** June 2021  
**File Size:** 176.2KB  
:::

## Additions

### Inventory

- Added the option "**Include the reservation when checking for a dated overdraft**" to the `Supply Chain` settings
- `Inventory Count Committee`: When selecting a barcode for an item, and the barcode was defined for a specific unit, the unit was filled in correctly after selecting the barcode; but when creating the inventory count committee by consolidating electronic count committees, the item barcode was filled in but the unit was not. The same `action post` (which runs when the barcode is entered) is now also applied on save
- `Color & Size Assortment file`: Added the following:
  - The field "**Default Quantity**"
  - The field "**The assortment is all the color-and-size combinations of the item it is used with**"
  - Added a button to generate a color-and-size matrix from all the possible combinations of the data entered on the lines
- Added the following fields to the "**Item Size**" file:
  - US Size System
  - UK Size System
  - Crocs Size System
  - Japanese Size System
  - Korean Size System
  - Chinese Size System
  - Other Size System 1
  - Other Size System 2
  - Other Size System 3
  - The "Size System" list

### Accounting

- Added the "**Cost Distribution**" grid to the following vouchers:
  - Receipt Request
  - Receipt Voucher
  - Disbursement Request
  - Disbursement Voucher
  - Journal Voucher
  - Bank Transfer Voucher
- Added the "**Party Evaluation**" section to the Accounting module, containing the following files:
  - Party Evaluation Elements file
  - Party Evaluation Groups file
  - Party Evaluation document
- Created a new window named "**Financial Statement Issuance Link Settings**"

### Fixed Assets

- Added the following fields to the `MaintenancePlanLine` table for `Maintenance Plans`:
  - Of type `reference`: `ref1,ref2,ref3`
  - Of type `date`: `date1,date2,date3`
  - Of type `Big text`: `text1,text2,text3`
  - Of type `text`: `description1, description2, description3`
  - Of type `number`: `n1,n2,n3`
  - Of type `Boolean`: `b1,b2,b3`
- Added 5 attachments inside the `Combined Disposal` document

### Contracting

- `Project Extract document`: Added five attachments (`5 attachment`) to the basic information group, and added two more attachments (`2 attachment`) to the lines
- `Customer Approval for Item`: Added a system field named Item Code, which is filled in automatically when the approval is created
- `Purchase Request for Materials from the Execution Budget`: Added a system field on the window's lines that is filled in automatically when the approval is selected

### Service Center

- Added the Warehouse and Location fields to the spare-parts detail lines in each of the following documents:
  - Work Order
  - Close Work Order
  - Assay Update, Assay
- Added the option "**Consider the warehouse and location in the system spare parts table**" to the Service Center settings
- Improved the `Close Work Order` document so that, when the work order is selected, the system carries the details (operations - spare parts) over to the Close Work Order document
- Improved the "Rental Booking Request" document so that the system shows an error message when attempting to book a slot that has already been booked
- Added the option "**Do not copy the warehouse from the work order lines to the invoice**" to the Service Center settings
- Added 5 (n) fields and 5 (text) fields to the lines of the `Spare Parts Issue` document

### Human Resources

- Added 5 (n) fields and 5 (text) fields on the lines of the `Employee Evaluation` document
- Added the option "**Calculate the To Date on the salary voucher from the employee status change table, not only the resignation date**" to the Salary Voucher term config. When enabled, the date is calculated correctly for an employee who is dismissed and rehired within the month in which the dismissal occurred
- Added a new document named "**Combined Residency Renewal Request**"
- Added the field "**Residency Renewal Fee**" to both documents "Residency Renewal Request" and "Combined Residency Renewal Request"
- Added the field "**Total**" to the `Combined Residency Renewal Request`
- Improved the `Disbursement Voucher` so that, when it is issued based on a "Combined Residency Renewal Request", the total is copied into the amount in the document header, and a line is added with the total in the Debit field
- Added the option "**Allow ignoring previous years' balances in Gulf leave**" to the Human Resources settings. When this option is enabled, "Ignore" can be selected in the Carryover Policy field on the leave type
- `Medical Insurance Company Authorization Document`: Added an option to the document's term config named "**Allow leaving the company empty**"; when enabled, it allows creating the document with the Company field left empty, and does not force the user to enter the company

### Letters of Credit

- `Expenses Voucher`: Added the following to the Expenses Voucher:
  - A grid named Payments on the main screen
  - A field named Payment Template
  - A button named Create Payments
- The payment template is added, and when the "**Create Payments**" button is clicked, lines are added based on the payment template

### Settings

- Added the Amount in Local Currency field to the `DebtLine` table
- Added 5 attachments to the `Document Cancel Document`
- Created an entity flow that calculates the currency exchange rate in vouchers
- Added the ability to send a Debit Note to the tax authority
- The program's interface language (Arabic, English) is now taken into account on the screen opened from the `Creator`

### Manufacturing

- Added 5 new fields named (`date6,date7,date8,date9,date10`) to all the dimensions (Company - Branch - Department - Sector - Analysis Group)

### Point of Sale

- Added the option "**Use From Hour - To Hour in item discounts**" to the POS settings. When this option is selected, the fields (From Time - To Time) appear in the header and lines of the item discounts for the `sales offer` voucher. Also added the action "**Update From Time and To Time**" in the details, which copies From Time and To Time from the header to the lines (for the user's convenience)
- Added the following options to the POS settings:
  - Do not update prices when selecting the customer
  - Do not update prices when selecting the invoice classification
  - Do not update prices when selecting Price Dimension 1
  - Do not update prices when selecting Price Dimension 2
  - Do not update prices when selecting Price Dimension 3
  - Do not update prices when selecting Price Dimension 4
  - Do not update prices when selecting Price Dimension 5

### Customer Relationship Management (CRM)

- In the `Questionnaire`, added 5 attachments
- `Work Plan document`: Added 10 Description fields in the header, 5 Description fields on the lines, and 5 n fields on the lines

### Mobile Applications

- Added numerous changes and improvements to the `Kas Shopping` app

### Point of Sale

- Added the action "**Deferred Payment Invoices**" to the POS menu, from which the invoices can be viewed, one selected, and paid
- Added the option "**Ability to Defer Invoice Payment**" to the POS permissions
- Added the option "**Defer Payment**" to the Multiple Payment window, where it appears in POS above the Remaining and Notes fields
- Changed the system so that a shift cannot be closed while there are deferred shifts
- Improved the system so that when attempting to disburse an amount via a `Disbursement Voucher` that exceeds the shift's book balance, the system does not show the book balance to people who are not permitted to view it
- Added the ability for POS offers to be time-based, i.e. within a specific period of the day
- `POS Invoices`: Activated navigation between the item code and the quantity using the `TAB` key

### Hospital Management System

- Added the option "**Free Item**" to the supplies grid in each of the following windows:
  - Surgery Type
  - Medical Services
  - X-Ray Type
  - Medical Test Type
  - Physical Therapy Type
- Added the following options to the hospital invoices term config:
  - Prevent saving without supplies
  - Prevent saving without services
  - Update prices on save
- Added the following options to the header of hospital invoices:
  - Allow editing the main prices
  - Allow editing the medical service prices
  - Allow editing the medical supply prices

### Settings

- Added the field "**Linked To**" to the Work Task screen, containing the types (Customer - Vendor - Employee)
- In the `Task Pending` table, added a field that records the SMS provider's response, for review and to know the remaining balance
- Added the option "**Do not change the dimensions of non-general documents with the general dimension found on the book when selecting the book**" to the book window

### Mobile Applications

- `Inventory Count App`: Changed so that the end date (`Expiry date`) shown is today's date
- `Inventory Count App`: Allowed entering a fractional quantity in the Inventory Count app, as it previously only accepted whole numbers
- Added a `Scroll` up and down for the items entered in the app within the file, with the items ordered so that the last item added is the first item at the top of the list, making it easier to edit in case of an error

## Fixes

::: warning Bug Fixes
Many bugs were fixed in this release to improve performance and stability
:::

### Inventory

- Fixed an issue where, in some cases, the system did not retrieve the expense items when inserting the consolidated item in the `Consolidation Voucher`
- Fixed an issue where, in some cases, an error occurred when performing an inventory count on a specific location in a warehouse
- Fixed an issue in the additional costs vouchers where, when creating one based on a `Consolidation Voucher` and adding the items manually, selecting the items showed the message "**Cannot execute the operation**" and left a draft document
- Fixed an issue where, when using the `Consolidation Voucher` to break down a consolidated item, the system did not calculate the quantities of the issued items on the Supplied Items page correctly
- `Inventory Count Committee`: Fixed an issue where, when counting items with dimensions, the system did not insert the dimension details (Length - Width - Count - Quantity) when inserting the items into the details
- Fixed an issue where, in some cases, issuing an `End Inventory Count` document and selecting the status Finished and Activated showed the error message "**Cannot execute the operation**"

### Purchasing

- Fixed an issue in the `Purchase Price Quotations` screen where clicking the button to guess item names and compare them with the items in the system did not match the items correctly
- `Purchase Price Comparison`: Fixed an issue where, when selecting several purchase price quotations on the lines via the lens, the system did not retrieve the items of these quotations correctly
- Fixed an issue where there was a cost difference between purchase returns and the warehouse issue; the cause was that the debit and credit sides for the purchase-return difference were not set in the Issue term config. This was resolved by preventing the term config from being saved unless both sides are specified

### Accounting

- Fixed an issue where the `Purchasing Budget` only accepted saving when a term config was selected — a defect in this document
- Fixed an issue where, when creating a `Miscellaneous Purchase Request` for several purchase items with a variable description, then creating a `Miscellaneous Purchase Order` based on this purchase request, the description did not appear on the lines

### Letters of Credit

- Fixed an issue in the "Combined Leave Request" screen where the field "Remaining Balance After Leave" was not calculated the same way as in the (Combined Leave Voucher)

### Hospital Management System

- Fixed errors in retrieving prices in each of the following invoices:
  - Examination
  - Accommodation
  - Medical Supervision
  - Facilities
  - X-Rays
  - Lab Tests
  - Services
  - Supplies and Services
  - Physical Therapy
  - Operations
- Fixed an issue where the system did not consider the value "**Maximum Amount Borne by the Insurance Company Across All Invoices**" specified on the Patient Admission Form, in the hospital management invoices
- Fixed an issue where, when adding an item in a `Medical Service Invoice`, the system did not recognize it by its code, and it could only be inserted via the lens
- `Medical Invoices`: Fixed an issue where, in one version, the system added the tax to the total due from the patient even though the tax had already been added to the total, meaning the tax was added twice

### Service Center

- `Rental Booking Request`: Fixed an issue where, in the Item Code field on the Rental Booking Request screen, the system did not show the items when clicked, and pressing the Down arrow key added a new line instead of showing the items
- Added the option "**Request Invoiced**" to both documents "Rental Booking Invoice" and "Rental Booking Request". The system checks this option when an invoice is created from a rental booking request, and unchecks it when the invoice is deleted
- Fixed an issue where creating a `Rental Booking Invoice` based on a "Rental Booking Request" caused an error
- Fixed an issue where an error occurred when attempting to save a `Sub-Item Supply Voucher`

### Real Estate

- Fixed an issue where an error occurred when attempting to link a `Receipt Voucher` to a rent contract code and editing it
- Fixed an issue where, in the term config screens for `Rent Contracts`, `Opening Rent Contracts`, and `Rent Accrual Journal Entries`, the grid (term config settings lines) became invisible in one of the Nama versions
- Fixed an issue where, in some cases, a `Rent Contract` could not be saved, and in some cases could not be deleted

### Settings

- Fixed an issue where converting the fields `description1 - description2 - description3 - description10` into reference fields via Fields & Screens Settings in the Employee window did not work correctly — all fields were converted except the field `description10`
- Fixed an issue where, in some cases, an error occurred when sending an alert with an attachment
- Fixed an issue where the entity flow for escalating approvals did not correctly account for the time specified in the approval definition

### Manufacturing

- Fixed an issue where, in some cases, the system set `Raw Material Return` documents to draft status even though they had previously been saved as final; resaving the document turned it back to final, then it reverted to draft again

### Fixed Assets

- Fixed an issue where, in some cases, attempting to delete a `Fixed Asset Disposal Voucher` showed the error "**Cannot execute the operation**"
- Added the field "**Change the Custody Custodian on the Asset**" to the `Custodies Delivery Receipt Document` term config

### Point of Sale

- Fixed an issue where, in some cases, when creating a `POS Invoice` containing a discount in the header, creating a return for that invoice did not copy the discount
- Fixed an issue where, in some cases, on the POS invoice, after selecting the item and editing the price to a specific number, entering the customer afterward caused the system to change the price
- Fixed an issue where, if no employee is specified in the user field and this user creates an invoice in POS with a discount percentage, an error occurred when attempting to pay

### Reports

- Fixed an issue in the report `008FNS-SYSR`, Balance Sheet - Balances - by Account Classification
- Fixed an issue where, in the `System Journal Voucher` template "**001ACC-SYSF**", the currency in the amount-in-words was not correct
- Fixed an issue where the Customer dimension did not work correctly in the system report `032SLS-SYSR`

### New GUI

- Improved the New GUI so that the composite field is rendered as it is in the old GUI (merged into a single field) when working on a computer, while it remains split into two fields on mobile devices
- Fixed an issue where editing a screen's alerts and actions and adding them to the More menu did not take effect in the New GUI or on mobile
- Fixed an issue where, when adding images to the Item screen, their size was not adjusted in the Item file view, the list screen, the selection list, or the preview when hovering over the item code
- Fixed an issue in the `Rental Asset Booking Request` screen where clicking the lens on the Item field showed the error "Cannot execute the operation", and only on the second attempt was the item list shown
- Fixed an issue where the `list` parameter did not work correctly with the New GUI
- `Rental Booking Request`: Fixed an issue where, when creating a booking document and specifying From Date to Date, the system inserted an incorrect date in the field "**toDate**"; the correct behavior is for the default value of the "**toDate**" field to be the same as the default value of the "**fromDate**" field, with the user still able to edit it
- Fixed an issue where checking the option to allow editing while awaiting approval did not allow editing, unlike the old GUI
- Fixed an issue where the option "**View Selected Version**", which appears when viewing the `Audit Trail`, did not close the popup (`POP UP`) for viewing the audit trail, as it does in the old GUI
- Fixed an issue where an error occurred when attempting to change the warehouse in an `Opening Inventory` document

### Mobile Applications

- Added numerous fixes to the `Kas Shopping` app
- `Inventory Count App`: Fixed an issue where, with the option to show the item name enabled, after typing the item code and pressing `enter`, attempting to type the quantity closed the app
- Fixed an issue where, when selecting a unit inside the count file, it was always ignored and the first unit alphabetically was selected automatically instead
- Fixed an issue where, when typing the item code, the item's unit was not displayed correctly
- Fixed an issue where, even though the app's interface language was set to English, the app displayed the warehouse and item names in Arabic
- `Inventory Count App`: Fixed an issue where adding an item with a fractional unit quantity such as 1.5 was not sent to the database; also, when an item had more than one unit in the units table, the units were duplicated
- Added a new field to the SMS settings, "**HTTP Headers**". Set the following value for the messages to work correctly: "**Content-Type==>text/html; charset=utf-8**"
