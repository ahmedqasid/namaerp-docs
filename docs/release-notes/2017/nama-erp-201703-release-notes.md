# Nama ERP Release Notes - March 2017

::: info Release Information
**Release Date:** March 2017  
**Release Number:** 201703
:::

## Additions

### Inventory
- Prevented creating an Issue voucher based on a Consolidated Issue Request that already has a voucher created for it; in this case, the user is also prevented from creating an Issue voucher via the **"Create Issue Voucher"** button inside the Consolidated Issue Request.
- **Stock Transfer Request:** added the ability to prevent requesting a transfer of quantities that do not exist.
- **Stock Transfer Voucher:** added the ability to prevent editing the lines when there is a document in "based on".
- Created an entity flow to modify the Stock Transfer journal entry using account codes specified in the flow's inputs.
- Added the ability in the system to modify journal entries resulting from costing, via an entity flow.
- **Assembly Voucher:** added the ability to search the info fields (Color, Size, Revision).

### Purchasing
- Added the ability to make the term config on the Purchase Invoice apply to the purchasing representative's subsidiary.

### Sales
- Created a mechanism to set discount percentages for employees or a group of employees.
- **Price Lists:** added an invoice classification at the line level, because in POS an item can have more than one selling price, which used to force the employee to create more than one price list for the same item.
- Improved the Sales Invoice so that when "based on" a Stock Transfer voucher is selected, the warehouse added is the one in the **From Warehouse** field, not the one in the **To Warehouse** field.

### Accounting
- **Accounting Settings:** added the following checkboxes:
  - Allow using system accounts in the Journal Entry voucher
  - Allow using system accounts in the Receipt Voucher
  - Allow using system accounts in the Disbursement Voucher
  - Allow using system accounts in the Bank Transfer voucher
- **System Journal Entries:** showed the total debit and total credit.
- **Account Distribution window:**
  - If the distribution method consists of other distributions, improved so that another choice is added to determine how lines are selected between:
    - First: only the first matching line is selected
    - Second: the first matching line is selected and distributed to; then, once that distribution is finished, a line is selected from the following lines if it matches, and distributed to, and so on
  - Renamed **"Distribute by First Matching Line"** to **Distribute by All Matching Lines in Sequence**
- **Payment Methods:** added the option **"Transaction Number Required"** to the Payment Methods file.

### Banks
- Added the created Letter of Guarantee to the Request, and added a checkbox **"Converted to a Letter of Guarantee"**.
- Added the following changes to the term config of the **Letter of Guarantee Issuance** document:
  - Renamed **"Previous Coverage Credit"** to **"Coverage Credit"**
  - Renamed **"Previous Fees Debit"** to **"Fees Debit"**
  - Renamed **"Previous Fees Credit"** to **"Fees Credit"**
  - Added the option to shorten journal entries

### Human Resources
- Developed the entity flow `EADSCNormalizeTimeAttendance` so attendance hours before 8:30 are not counted for the employee, while separating the employee's break time when it is recorded in the timesheet.
- Added Time Attendance information inside the Payroll Voucher screen.
- In the **Update Workplace** screen, added a field for the employee's current location on the line, copied automatically when the employee is selected.
- Made the **Actual Return-to-Work Date** field empty when opened.
- Added a system indicator for the total actual working days.
- Improved the system so that when creating a Leave voucher (half day - quarter day), the Leave Duration field shows (.5-.25).
- Improved the system so that when creating a half-day or quarter-day leave, a "from time" to "to time" can be entered and this time is considered part of the attendance, so the system does not mark the employee as late if a **"Partial"** leave exists for the day.
- Added the two options **"Fix the Number of Working Days for the Payroll Voucher"** and **"Fixed Working Days"** to Human Resources settings.
- **Employee Termination:** added the fields (`other 1&2&3&4`) to the termination-reason fields, matching the statuses on the Employee screen, so that changing `other 1` on the Termination voucher changes `other 1` on the Employee screen as well.
- Introduced the following improvements to the fingerprint attendance recording system:
  - Improved fingerprint data recording so that one document is issued per fingerprint day, instead of a document containing more than one day
  - Ignored the type when importing a fingerprint scan (first scan = check-in, second = check-out)
  - When two scans occur within five minutes, the second scan is ignored
  - Added the ability to manually edit and delete lines in the Time Attendance file, starting the following day, while keeping these edits
- **Manual Performance Indicators - Performance Indicator Values:** improved so that when consolidating using the consolidation mechanisms available in Nama, the ordering is by employee code.
- Improved the Job Offer so that a leave balance can be given as a fraction.
- **Payroll Record:** ordered the records by employee code when consolidating according to the consolidation mechanisms available in Nama.

### Fixed Assets
- Added an accounting term config to the **Custodies Delivery Receipt** document, so the entry runs from the total custody of the receiver to the total custody of the deliverer.
- Created a new document to transfer assets and custody items in kind from one employee's custody to another employee's custody, based on employee-to-employee transfer, showing the assets and custody details specific to the employee.

### Project Management
- Added 9 additional fields for project classifications on the Project screen.
- Added an accounting effect to the **"Task Execution"** document, so the entry's formula is calculated as: Value = Number of Hours x Hourly Rate (the standard hourly rate from the Employee file).

### Contracting
- Copied the fields (Responsible Engineer / Sales Representative / Customer) from the **Project** file when the project is selected in the documents (Sales Quotation Request, Measurement Request, the Assay, Project Contract, Job Order, Project Execution, Project Extract, Measurement Request, Subcontract, Subcontractor Execution, Subcontractor Extract).
- Took the new units into account in the Contracting Prices file.
- **Job Order** document: introduced the following changes:
  - When the customer is selected first, a filter is applied on the Contract / Project / Contract in the lines
  - When searching by the item's code, the item's classification is shown next to the item code
  - Added a calculated field for the square meterage, being Quantity x Length x Width
- Added an **"Item"** field to the **Standard Item** file.
- **Job Order:** introduced the improvement so that when the contract is selected, both the **Customer** and the **Project** are retrieved and inserted into the document automatically.
- Added a new Contracting document called **"Technical Office Job Order"**, whose lines are the same as the **"Items"** lines in the **Project Contract** document.
- Added a new field to all screens' lines, linked to the Units file, with the same effect on quantities.
- Added a new field to the **Job Order** document's lines called **"Total Quantity"**, being the product of (Count x Length x Width x Height), taking the unit's dimensions into account - for example, if the unit is square meter, height is ignored; if the unit is linear meter, width and height are ignored, and so on.

### Contracting Maintenance
- **Tenders:** removed the Contractual Job field from the Basic Information.
- **Tenders:** for deleted labor-item lines, improved so that deleted lines do not affect the cost, but the cost shown includes them once the deleted items are restored (meaning the monthly cost field is unaffected while the lines are deleted, and returns to working fully once the deleted lines are restored).
- **Tenders - Labor:** added the following:
  - Annual Salary = Total Monthly Salary x 12
  - Labor Count, with a default value of 1
- **Contractual Job:** added new fields: (Basic - Housing Allowance - Transport Allowance - Residence Fee - Social Insurance & Risk - Leave Dues - End of Service - Medical Insurance - Travel Tickets - Exit & Re-entry - Subsistence - Transfer - Administrative Profits - Other 1: 10).
- **Contractual Jobs Cost** document: improved so that it is linked to the Tender code, and the previous cost values are calculated from the Contractual Job when previous costs exist there; when no cost exists in the Contractual Job, the values remain empty. In all cases, the values can be edited in the cost-calculation document.
- Added a new page inside the Tender for Consumed Materials.
- Renamed **"Operation & Maintenance Items"** to **"Operation & Maintenance Items and Spare Parts"**.
- **Tenders - Deleted Records Table:** added the deletion date and time.

### Manufacturing
- Added text and numeric fields to the details of the windows (Product Components, Production Order Product Components, Operations, Production Order Operations).
- Added the option **"Allow Including the Final Product in Its Own Components"** to Manufacturing settings.

### Point of Sale
- Enabled printing linked templates in POS.
- **Stock Transfer Request:** made the warehouse defined on the register the default for the **To Warehouse** field, instead of the **From Warehouse** field.
- **POS Settings:** added a grid for the documents that are transferred as soon as they are saved.
- When closing POS and reopening it from the tray icon, improved so the system asks for the username and password again.
- Fully reviewed the POS Permissions file, since granting an employee a specific permission caused some permission-related errors to appear.
- When selecting several items from the search screen, the number of selected items is now shown.
- Added a permission for the Stock Transfer Request.
- Added the ability to create a Stock Transfer Request from POS (the **POS Stock Transfer Request** document is different from Nama's own Stock Transfer Request); the transfer's document cycle can be continued by creating a Stock Transfer Voucher in Nama based on the POS Stock Transfer Request, while tracking the request's quantities.
- Created internal messages containing: message text, sent to (the Employees file).
- Changed the POS release naming convention to be in the form `POS pos.version.zip`.
- In the POS Expense, added **(To Notice)**, which fills in the data as soon as the notice is selected.
- **Register file:** added the ability to specify the term config for the Expense in the case of a notice and in the case of cash, as well as for the Return.
- Improved so that when creating a POS Sales Return, the user must specify whether the return is cash or via a Credit Note (with the choice available only when the option to use Credit Notes was already enabled in Settings); if the user does not choose, the return defaults to cash automatically.
- **POS:** added the ability to multi-select items in the search screen.
- **POS Permissions:** improved so that disabling any permission also unchecks **(Full Permissions)** for the user.
- Improved so that when the option **"Can Review the Book Balance"** is not enabled, the Difference column is hidden.
- Improved so that when viewing a document there is a button to show payment details.
- Enlarged the shortcuts bar at the bottom of the screen so it automatically fits the screen size.
- Developed the **"Consolidated Receipt Requests"** voucher, modeled on the Consolidated Disbursement Requests.
- Added permissions for using the calculator and the keyboard.
- Improved so that when numbers are hidden, the header is stretched.
- Allowed the user to change their password from within POS, since some users never deal with Nama directly and only work with POS.

### Customer Relationship Management (CRM)
- Added 5 date fields to the Support Request document.
- **Contact screen:** added the checkbox **"Replied"**.

### Project Management
- Added the field **"Calculated Field 1 Query with Date Change"** to Project Management settings; a query can be placed in it and copied from Fields & Screens Settings.
- Added the fields (Document Subsidiary, Line Subsidiary) to the **Task Execution** document.

### Real Estate
- Added a page named **"Contract Basis"** to the term config of the Rent Contract and Opening Rent Contract documents.
- **Opening Rent Contract window:** made the `fiscalPeriod` field mandatory and of type Opening.
- In the Rent Contract and Opening Rent Contract screens, changed the translation of `value paid` to **"Amount Paid"** in the instalment details, and the same word in the Receipt Voucher's Payments page.
- Rounded the resulting numbers in the values according to the contract's currency.
- **Rent Contracts and Opening Contracts:** added the following changes:
  - When using the **"Create Receipt Voucher for Selected Instalments"** field, the system now opens a popup window without leaving the main screen (as is the case in Sales Contracts)
  - Added a button to select all instalments, as is the case in Sales Contracts
- Prevented changing the contract after the Waiver voucher is saved.

## Settings

- Added formulas for extracting parts of text, usable with Templates, Alerts, Approvals, and so on, as follows:
  - `$left_LENGTH` -1
  - `$right_LENGTH` -2
  - `$mid_START_LENGTH` -3
- Changed the order of the actions performed by the `Nama Release upgrader` to reduce the downtime for the customer's program (for customers already live on the program) by the time it takes to download the update files, by downloading the files before the `Service` stops. The order is now:
  - Download the files
  - Extract the files
  - Stop the `Service`
  - Copy the release files
  - Start the `Service`
- Added Quick Help to the Preparation Catalog.
- Added Scheduled Task to the Preparation Catalog.
- Added the action **"Prevent Usage for All Records"** to **the More menu**; it can be shown by editing the screen.
- Added **"Does Not Apply To"** to the **Criteria Based Validation** window.
- Added a Receipt Book and Receipts so they can be used in system vouchers to simulate paper books.
- Added Payroll Vouchers inside the Statistics page of the Employee screen.
- Added **"Dashboards"** to the Preparation Catalog.
- Added the field **"Convert to Preparation Catalog"** to the report definition, copying the data from the report to the catalog directly on save.
- Added permissions for Dashboards and Dashboard elements.
- Translated the field `lastUpdateData` to **"Last Update Date"**.
- Added **"Block Login"** to the User; when set, the user cannot log in to the system even with a correct username and password.
- Showed the release number at every replicated site (`Sites Replication`).
- Added the ability to link Alerts to a user, not only to an employee.
- In the Alerts window, added the ability to filter by dimensions, as well as anything else specified when defining the alert.
- Added the **"Loan Rescheduling"** document, for modifying loan due dates.
- Allowed migrating certain data from one server to another.
- Added a new option to Fields & Screens Settings - Field Appearance - **"Mask Text (Password)"**, so the field's value is shown as a password (`******`).
- Added a new improvement to make it easier for customers to submit support requests, as follows:
  - Created a list to show support requests with their statuses in the Settings menu, below `pending tasks`
  - In this list's More menu, added a button to create a support request
  - On the About screen, developed a button to create a support request
  - Also added an `icon` in the error message to create a support request
  - When the request is created in Nama, Nama notifies the customer about the status of the created requests
  - The customer can review the statuses of the created requests and know the requests' status via the Alerts screen
  - Prevented the customer from creating technical support requests once the technical support period has expired

## Fixes

### Inventory
- **Stock Transfer Voucher:** fixed an issue where inserting additional lines in the details via search caused an error.
- Fixed an issue where creating a relationship of type "Additional Service" between two items did not add the second item using only the quantity stated in the relationship, but instead multiplied it by the first item's quantity, as happens with the **"Item Accessory"** relationship.
- **Stocktaking:** fixed an issue where, with a stocktake in status Finished and Active, Nama refused to issue from the warehouse and showed the error message `(Can not receipt or issue item from locator under stock taking)`.
- Fixed an issue where clicking the batch or box number suggested quantities using the net quantity after reservation rather than before it, and likewise clicking Consolidate Lots used the net quantity after reservation for each lot.
- Fixed an issue where processing failed for some documents.
- Fixed an issue where, in some cases, the system did not accept saving a Quality Inspection document.
- Fixed an issue where the Raw Material Return voucher's costs were not affected by the number calculated inside the voucher.
- Fixed an issue where Additional Receipt Cost vouchers did not affect the cost of the receipt resulting from the Assembly Voucher.
- **Stock Transfer Voucher:** fixed an issue where transferring between two warehouses in the same company, on save or when editing an old document, showed the error message `(From legal entity PMG - elprince - PMG Group can not be same as to legal entity because this is inter-company transfer)` even though the Transfer document's term config was of the normal type.
- Fixed an issue where creating a Stock Transfer whose term config type was (Inter-Company Transfer) and using it within the same company showed an error message.
- Fixed an issue where creating an item with more than one unit, and setting the relationship between them in Transfers, showed an error.
- **Item file:** fixed an issue where selecting **"Has a Second Unit"** in the Item file added an empty line on save to the second-unit lines, and searching for the item in Inventory documents did not retrieve the item correctly nor display its name.

### Sales
- Fixed an issue where, with a stocktake in status Finished and Active, Nama refused to issue from the warehouse and showed an error message.
- Fixed an issue where the customer could not be searched using `altCode`, unlike items, which can be searched by their alternate code: typing the full alternate code and pressing `Enter` showed the customer's code, but typing the alternate code and trying to search for the customer by it returned no results.
- Fixed an issue where Sales Tax 1 at the line level calculated the tax after Discount 6 on save, while before saving it was calculated after Discount 3, even though the Global Config screen specifies that the sales tax base is calculated after Discount 3.
- Fixed an issue where creating a price list for an item, repeated on more than one line with a different invoice classification, prevented the system from saving the document.
- Fixed an issue where offers set on Discount 5 - 6 - 7 - 8 were not inserted automatically into the Sales Invoice.
- Fixed an issue where an error sometimes occurred when saving invoices.

### Purchasing
- Fixed an issue where creating a Purchase Invoice based on a Purchase Order in a foreign currency did not retrieve the currency and currency factor fields from the Purchase Order, keeping the local currency instead.
- **Purchase Orders:** fixed an issue where the Invoice Tax 1 field had no effect on the document.

### Letters of Credit
- Fixed an issue where, in some cases, Letters of Guarantee showed status Draft even though they had been issued.
- Fixed an issue where the expense-items list in documents linked to the Letter of Credit and the LC Costing voucher showed incorrect numbers (multiplied by 2) for some expenses, not all of them.
- Fixed an issue where processing sometimes failed when adding an LC Costing voucher.
- Fixed an issue where Nama allowed creating a Document Cancellation for an Expenses voucher against a Letter of Credit whose status was Closed (an LC Costing voucher had already been created for it), resulting in a negative Letter of Credit value; the correct behavior is that Nama should not allow cancelling the Expenses voucher until the LC Costing voucher is cancelled first.
- Fixed an issue where the Letter of Credit's cost was affected by cancelled Expenses vouchers.

### Accounting
- Fixed an issue where creating a Disbursement Voucher for 3000, then changing the first line's value to 2000, made the system insert a second line for 1000; changing the second line's value to 500 then inserted a third line for 2500. The correct behavior is to take all the lines' values into account, so the third line's value should be 500.
- **Disbursement Voucher:** fixed an issue where creating a Disbursement Voucher from within a Purchase Invoice that has a subsidiary of type Vendor (rather than the Vendor field directly on the Purchase Invoice) did not copy the subsidiary-type and subsidiary fields to the Disbursement Voucher's lines.
- **Payment Methods:** fixed an issue where selecting a payment method inside Receipt and Disbursement vouchers, when the payment method has a Treasury subsidiary, did not auto-fill the subsidiary type and subsidiary, unlike when the payment method is linked to a bank account.
- Fixed an issue where, on printing, the amount shown in the document differed from the amount in the journal entry; the correct behavior is that the print form should not print when the document's status is "Awaiting Processing".
- Fixed an issue where an error sometimes occurred when creating a Financial Paper from within the Receipt Voucher.
- Fixed an issue where creating a Letter of Guarantee based on a Letter of Guarantee Request did not copy the details from the request.
- Fixed an issue where the system did not allow deleting a Receipt Voucher if it had been issued based on a Receipt Request.
- Fixed an issue where, in the **Receipt Voucher** and **Disbursement Voucher** documents, selecting a foreign currency and an exchange rate did not, on save, correctly copy both (the foreign-currency value and the local-currency value) into the document's lines; instead, the local-currency amount was copied into the foreign-currency amount field, forcing the user to correct it manually before saving.
- Fixed an issue where creating a Debit Note without filling in the "based on" field, while the term config had **"Use Based-On for Aging"** selected, showed an aging error.
- Fixed an issue where creating a Disbursement Voucher based on a Payroll Record and adding a line for the bank commission without a subsidiary caused an error.

### Banks
- Fixed an issue where cancelling a Bank Notice document, then trying to cancel the related Bank Portfolio, showed an error message that the record could not be deleted because a Bank Notice exists based on it; and trying to edit the Portfolio document showed the error message **"(Cannot use records that are still a draft Bank Notice)"**.
- Fixed an issue where using the entity flow `EntityFromEntity` to create a Debit Note based on saving a Sales Invoice did not fill in the `MoneyLOcalAmount` field in the Debit Notes table, filling in only the `MoneyValueAmount` field in the database.

### Service Center
- Fixed an issue where the system did not show Receipt Requests created inside the Receipt Voucher's "based on" field.

### Human Resources
- Fixed an issue where the system did not accept saving the Clearance document.
- Fixed an issue where the system did not allow saving the **"Meal Details"** voucher due to a missing term config, even though the document has no term config at all.
- Fixed an issue where the system did not allow saving the **Course Evaluation** record.
- Fixed an issue where creating more than one manual performance indicator with the same order caused a problem when issuing the payroll: the system swapped indicator values with each other, and sometimes with zero.
- Fixed an issue where the system did not prevent the user from creating more than one manual performance indicator with the same order.
- Fixed an issue where, in some cases, an error occurred when opening the Employee screen.
- Fixed an issue where using the entity flow `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceSetDefaultToTime` made the system take a very long time before it could save the voucher.
- **Payroll Record screen:** fixed an issue where the system consolidated employees who already had a Payroll Voucher or Payroll Record issued for the same period.
- Fixed an issue where creating a Job Offer allowed leaving the Item Type empty on the line, and then issuing the Payroll Voucher was rejected.
- Fixed an issue where creating an Employee Evaluation voucher and trying to select an employee on the document header showed an error with no message; then trying to save the voucher without an employee showed the message attached to the log.
- Fixed an issue where adding a leave type in the Job Offer showed the error message **"Cannot Perform Operation"**.
- Fixed an issue where, after rejecting a Leave voucher and creating a new Leave voucher for the same employee, a message appeared saying the employee already has a Leave voucher on the same date.

### Manufacturing
- **Damaged Receipt Voucher:** fixed an issue where items were received at a cost different from the cost specified in the document; the correct behavior is to receive at the cost entered in the Receipt voucher, or zero cost if left empty.
- **Damaged Receipt Voucher:** fixed an issue where the system copied items into the document's details when the Production Order was selected.
- Fixed an issue where executing a Planning voucher showed an error message.
- Fixed an issue where the Books and Term Configs fields were not translated in the Planning voucher's term config.
- Fixed an issue where the system issued resources **"by operation"** in production.
- **Damaged Receipt Voucher:** fixed an issue where searching for operations and the item sometimes did not work, and in some cases, after entering the data manually, the document did not save.
- Fixed an issue where an error appeared when creating a cancellation voucher for the Raw Material Issue Voucher.
- Fixed an issue where returning raw materials from a Production Order gave the return a cost different from the item's issue cost; the correct behavior is for the cost to be equal between the issue and the return, also taking the Lot, Box, and any other property the system tracks cost by into account.

### Contracting Maintenance
- **Tenders - Labor Items:** fixed an issue where marking a line as deleted and moving it to the Deleted Records table did not carry over the Contractual Job Department field.
- **Tenders:** fixed an issue where the Operation & Maintenance Items totals did not work.
- **Tenders:** fixed an issue where the Contractual Job Costs total did not work.
- **Tenders - Main:** fixed an issue where the totals did not work correctly.

### Settings
- Fixed an issue where the field order was incorrect in both the Book and Group windows.
- Fixed an issue where, in some cases, clicking the Approve mark showed the message **"Cannot Perform Operation"**.
- Fixed an issue where an entity flow with two lines was invoked twice, and one with three lines was invoked three times, and so on.
- Fixed an issue where creating an **"Approval Definition"** and specifying a **"Substitute Employee"** meant the system did not send the Approval Request and the email.
- Fixed an issue where, in **Scheduled Tasks**, some scheduled tasks with status Inactive still ran and sent notifications.
- Fixed an issue where, after enabling the option **"Allow Editing After Use"** in Approvals and making an edit, the system refused to save if the user then wanted to deselect this option.
- Fixed an issue where field permissions did not work with the **"Document Code"** field.
- Fixed an issue where a problem occurred when opening the Executions list inside the Support Request.
- **Payment Methods:** fixed an issue where selecting a bank account did not auto-fill the bank, unlike selecting a bank account in all other bank documents.
- Fixed an issue where an error sometimes appeared when logging into the database.

### Point of Sale
- Fixed an issue where, inside the POS Sales Invoice lines, entering a line-level discount and pressing `Enter` moved the cursor to the first field on the same line; the correct behavior is for the cursor to move to the same field on the next line.
- Fixed an issue where, in Multiple Payment, the system did not allow exceeding the invoice value in the **"Paid in Cash"** field.
- Fixed an issue where the system did not accept mouse movement after clicking the Price field.
- Fixed an issue where returning part of an invoice prevented the system from allowing a return on the rest of the invoice's items; also, only the remaining items and quantities should be shown.
- Fixed an issue where the net return value showed an error frequently when making a Sales Return.
- Fixed an issue where an error occurred when navigating through records.
- Fixed an issue where navigating between pages while on a line showed the item's international barcode on the left.
- Fixed an issue where paying a Sales Invoice using a return receipt closed the payment screen and printed the receipt immediately; the correct behavior is not to close the screen, and to stop at the next payment method.
- Fixed an issue where, in some cases, the invoice lines' serial numbers appeared unordered.
- Fixed an issue where, in some cases, scanning an item with the barcode reader did not show the item on the line, even though its quantity affected the total quantity.
- Fixed an issue where a problem occurred when entering POS with favorite items that have no image.

### Fixed Assets
- Fixed an issue where purchasing a Fixed Asset in a foreign currency issued the system journal entry correctly, while the value shown in the asset's statistics in the local currency used the same amount as the foreign currency, i.e. the system did not apply the foreign-currency factor; the depreciation instalment showed the same error.
- Fixed an issue where the journal entry issued from the Disposal voucher took all accounts' dimensions from the asset's dimensions; the correct behavior is for the dimensions to come from what is set in the document's term config, for the accounts that exist in the term config.
- **Asset Transfer document - "To" section:** fixed an issue where the fields (To Company, To Department, To Branch, To Sector, To Analytical Group) were duplicated twice.

### Banks
- Fixed an issue where the system allowed creating a Letter of Guarantee via the **"Create Letter of Guarantee"** button from within the Letter of Guarantee Request, even though a letter had already been created for the same request.
- Fixed an issue where an error occurred when saving the opening accounting term config for the Letter of Guarantee.
- Fixed an issue where creating a Letter of Guarantee based on a Letter of Guarantee Request left the request still showing when creating another Letter of Guarantee based on it, making it possible to create more than one Letter of Guarantee for the same request, and the system accepted the save.

### Contracting
- Fixed an issue where, in the **Job Order** document's lines, the Total Quantity field (linked to the dimensions) did not calculate the quantity correctly while entering data (before saving), but calculated it correctly (accounting for the dimensions) after saving.
- Fixed an issue where, in some cases, approving a **Job Order** document showed an error message.
- Fixed an issue where the classification name was not added to the item-code suggestions.
- **Job Order:** the option **"Do Not Copy Project Contract Details"** works in reverse; that is, its translation is incorrect.

### Real Estate
- Fixed an issue where, in Opening Rent Contracts, editing some previously entered Rent Contracts showed a message that **"To Date"** must be a specific date, and then choosing that date showed an error message.
- Fixed an issue where, after creating a combined unit from a group of units and creating a Rent Contract for that combined unit, the system correctly rented all the units linked to the combined unit; but afterward, when the customer deleted the units linked to the combined unit, the system allowed it even though a Rent Contract existed on them, and when later trying to delete the combined unit itself, the system could not do so because it no longer saw the linked units to unlink them. The combined unit should therefore be prevented from being edited once the customer has made transactions on it.

### Reports
- Fixed an issue where an error occurred when updating system reports, when a report contains a sub-report.
- Fixed an issue where, in some cases, screen templates did not work.
- Fixed an issue where an error occurred when running a report whose design includes the company logo, when logging in with dimensions other than the global ones.
- Fixed an issue where an error occurred in the print output when using the page-columns system in the report designer.
