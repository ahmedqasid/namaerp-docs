# Nama ERP Release Notes - September 2020

::: info September 2020 Release
**Release Date:** September 2020  
**Release Number:** 202009
:::

## Additions

### Inventory

- Added the two fields **"Finished Product Issue Book"** and **"Finished Product Issue Term Config"** to the Assembly Voucher term config

- Improved the **Replacement Request** document so that it creates the journal entry; the document's term config was modified so that it now has an accounting effect

- Added the following fields on the lines of both the **Voting file** and the **Item Voting document**:
  - A reference field to the Item Addition Request file
  - A numeric field (Suggested Price)
  - 10 description (text) cells on the line
  - 10 numeric field cells (`N1`, `N2`, `N3`)
  - 3 attachment cells

- Added the option **"Prevent Saving on the Same Stock Count Date"** to Distribution Management settings

- Added the option **"Pay Invoice Installments Through the Return"** to the Sales Returns term config; a Payments screen was also created on Sales Returns to select the installment code and cancel the installment's due status on the schedules inside the invoice

- Improved the **Reservation Voucher** so that, when created based on a quotation, the system adds the price totals in the following fields:
  - **Total**
  - **Net After Discounts**
  - **Tax Totals**
  - **Reduction**
  - **Net**
  - **Paid in Cash**
  - **Remaining**

- Created an integration between the Nama system and the **OTO** company's system

- Improved the system so that, when trying to log in as the system administrator, it is allowed even if the maximum number of users has been exceeded - and if the maximum number of users has been exceeded, the system logs the administrator out from the other devices

- Made the default value of the field **"Max Concurrent Logins for a Single User"** 1 on the User file and the Permissions file, and likewise made the default value of the field **"Automatically Log Out When the Max Number of Logins Is Exceeded (From the Oldest Sessions)"** Yes

- Added the option `reprocessAssemblyMargin` to Distribution Management options

- Enabled preventing edits in the warehouse before the stock count date, since the current situation was that, with a stock count that is ended and active, a stock receipt preceding the stock count date could still be added

### Sales

- Converted the **Delivery Voucher** into a **Sales Voucher** (with prices)

- Added the option **"Base the Discount on the Total of Matching Lines Only"** inside the Quotation, on the discount lines

- Added an entity flow to search for all Equipment Operation invoices whose sales invoice actual date falls between the fields `date1` & `date2`, whose `description2` field equals (a value of "من المتر"), whose company is the same as the invoice's company, and whose sector is the same as the invoice's sector

- Added 5 text fields, 5 date fields, 5 reference fields and 5 number fields to the terms table in each of the following documents:
  - **Sales Invoice**
  - **Sales Order**
  - **Quotation**
  - **RFQ**

### Accounting

- Added the field **"Used in the Account Bundle"**, a multi-select field with the options (Main Account - Account 1 - Account 2 - ... - Account 20), such that:
  - This field is `Disabled` if the account type is not "Subsidiary"
  - This account only appears in the field designated for it inside subsidiaries (`Context Searcher`)
  - Saving is rejected if it is used elsewhere in any of the subsidiaries

- If an invoice was paid with a Receipt Voucher, the voucher appears in the invoice's payment vouchers. A **Voucher Cancellation Voucher** can then be created for the Receipt Voucher, and the same voucher stays on the original invoice, which remains marked as paid

### Banks

- Added 5 extra number fields, 5 text fields and 5 checkbox fields to the Bank Account window

### Project Management

- Added the following windows:
  - **Project Template screen**
  - **Project Quotation screen**

- **Project Quotation window:** Made the following improvements:
  - The employee's hourly rate is now shown automatically when the employee is selected
  - The times recorded on the Tasks screen are now summed and included on the main screen, by each task's time
  - Added the project's planned start and planned end, plus the project period, which automatically controls the project end
  - Added 2 attachments
  - Added the two fields **"From Date"** and **"To Date"**
  - Added the field **"Manager"**
  - Added a new field named **"Service Performance"**, a list containing the options (Monthly - Quarterly - Semi-Annual - Annual - Per Task)

- Added the project type - Main Project, which is taken into account when creating the project

- Added the project name on quotations, so that when it is added, it appears on the created project

- Added the ability to delete the tasks and the created project that was issued from quotations

### Human Resources

- Added the option **"Calculate End-of-Service Liquidation Based on the Full Period"** to Human Resources settings, to control the display of columns on the End-of-Service Reason file; the added columns are as follows:
  - **Total Years of Experience Starts From | Factor**
  - **Total Years of Experience Starts From | Value**
  - **Total Years of Experience Ends At | Factor**
  - **Total Years of Experience Ends At | Value**

- Added the document **"Reschedule Bulk Advance Installments"**

- Added the field **"Actual Leave Duration"** to the header of the Bulk Leave Voucher, and hid the field **"Less-Than-a-Day Leave Value"** from the lines

- Added a `ComboBox` on Salary Item Types and Salary Items, named **"Other Items' Effect on the Tax Base"** (Addition - Deduction), so that an item whose effect is "Other" and is added to the tax base cannot be saved unless this option is selected; based on this selection, the item's value is added to or deducted from the tax base

### Contracting

- Added a warning when creating Payroll Vouchers if there is a conflict between the order of the items in the calculation formulas

- **Customer Item Submittal screen:** Made the following improvements:
  - Added `D` to the submittal's approval status, and linked the document's appearance on the Purchase Request to statuses `A` or `B`; when the status is `C` or `D`, it does not appear on the request
  - Added a Unit Cost field, carried over from the Executive Budget line the submittal is linked to
  - Added a grid with an approval-status field carrying the same options as the document header (`A`, `B`, `C`, `D`) and an attachments field; when the status is `A` or `B` on the last line, no further lines can be added
  - Changed the document header's status based on the status of the last line in the grid

- Improved the **Budget Item Requests** window so it is treated like a regular purchase request: a Purchase Order or Purchase Invoice can be created based on it, with quantity tracking; the only difference is the Clause Code and Clause Description, so that when it is used as a Based-On for Contracting documents, the system adds the clauses from the lines

- Added the following two fields to the Terms lines:
  - **Planned Value | Addition**
  - **Planned Value | Deduction**

- Added **Standard Terms** to the Estimated Budget and the Executive Budget, as they exist on the Project Contract, also with planned values (addition or deduction)

- Added the field **"Total Due Value"** to each of the following windows:
  - **Project Contract**
  - **Estimated Budget**
  - **Executive Budget**
  
  On the first page, in the first group; the field's content is (the Total Price field + the planned values on the terms, whether addition or deduction)

- Added the button **"Create Fixed Asset Voucher"** on the Contracting project

- Added the ability to save a term of type "Value" without entering the value, allowing it to be entered instead on the Extract or the contract

- On the **Subcontract screen**, added a field (`text`) named "Project Clause Code Description" to the contract details

- On the **Subcontract - Clauses page**, improved the system so that, instead of showing only the code when clicking the project code, the system shows the project code and the clause description

### Real Estate

- **Rent Contract:** Created a mechanism to link old contracts with the correct value in the Next Contract and Previous Contract fields

- **Expense Type:** Added the option **"Do Not Carry Over on Extension"** to the Expense Type, so that when a Rent Contract is extended, these clauses or their values are not copied

- **Quotation window:** Added the button **"Create Rent Contract"**, and also improved it so that the Reservation Status field can be used, selecting (Not Reserved), to cancel a reservation

- Created an entity flow named `EAAutoExtendExpiredRentContracts` that can be used in a scheduled task to automatically extend Rent Contracts that have ended or are close to ending

- Added the following fields to the lines of the **Maintenance Expense**:
  - **Customer Share Percentage**
  - **Company Share Percentage**
  - **Customer Share Value**
  - **Company Share Value**

- Added the following fields to the **Maintenance Expense** document's term config:
  - **Debit - Customer Share Value**
  - **Credit - Customer Share Value**
  - **Debit - Company Share Value**
  - **Credit - Company Share Value**

- Added the document **"Maintenance Expense Request"**

- In each of (**Maintenance Expense Request**, **Maintenance Expense**, **Receiving Report**), added 4 attachments on the document header, bringing the total to 5, and also added 5 attachments on the line

- When creating a **Rent Exemption Voucher**, the error message **"Cannot Execute the Operation"** appears

- Added the field **"Copied from the Previous Contract"** to the expense lines

- Added the field **"Do Not Create an Installment If the Expense Is Copied from the Previous Contract"** to the Expense Type

- Added the following fields to the **Rent Contract Ending** document:
  - **Insurance Value Carried Over from the Previous Contract and Not Present in the Rentals**
  - **Total Insurance**

### Customer Relationship Management (CRM)

- Added new lines to the **(Complaint - Suggestion)** screen with the fields (Following-Up Employee - Follow-Up Date - Notes)

- Added up to 10 `description` fields to the **"Complaint - Suggestion"** window's table

- **Maintenance Report document:** Added 3 `description` fields, bringing the total to 5, and also added 5 `ref` fields on the malfunction lines

- Added up to 10 `description` fields to the header of the **"Complaint - Suggestion"** document

- Added the Sector, Item Department, Item Category, Item Classification 1...10, and Brand to the **Campaign file**

### Hospital Management System

- Replaced the field **"Medical Service Classification"** with the field **"Medical Classification,"** which was added in a previous release, in the following documents:
  - **Outpatient Clinic Booking document**
  - **Operations Booking document**
  - **Procedure Approval document**

### Fixed Assets

- Added 5 classification fields to Assets, like the Items

### Settings

- Added the ability to create a scheduled task that alerts if a database backup has not been uploaded to Google Drive every day

- Added the ability, when an alert is created that sends an email for creating a certain document, to also send the attachments found on that document with the email

- Improved field search so it works smartly when the requested field is entered in a language other than the one the user intended

- Licenses are now required to use the mobile apps (Sales Orders - Shopping - `ESS`)

- Linked `Users concurrent` to groups: each group consists of a number of users, and a user cannot be added to more than one group; groups can be added per company, and each group is linked to its own `Users concurrent`, with the `Users concurrent` across all groups equal to the number of `Users concurrent` in the contract. Through these groups, each group is limited to its available number of users, so that if a group reaches the maximum number of users actively interacting with the system, no other user from the same group is allowed to log in, while the other groups keep working normally

- Added a screen for running arbitrary `SQL`, accessible through the link `localhost:8080/erp.html#sql`; it works only in the New GUI, and a link to it was added at the top of `utils.html`. This screen works only with the `admin` user

- Added to the entity flow `EAPreventChangingFields` the ability to prevent the user from editing the lines under a certain condition

### Mobile Applications

- Added a field to the country-specific settings in the mobile app settings, named **"Item Card Height"** `itemCardHeight`; if left empty, the default value is `300`

- Added the ability to sort receipts in descending order, so the newest receipt is at the top

- Added the ability to print all of today's or yesterday's receipts in a single batch

- Added the field `multiReceiptHtmlFormula` to the `appsConfigurations` settings, adding a new way to print a full day's Collection Vouchers, in the Collection Vouchers app, as a summary. For example: (Number - Customer - Amount - Cheque - Note)

### New GUI

- Added the option `printing sdk version` to the login screen and the settings screen. This option allows choosing between `old version`, for the old method, and `new version`, for the new method

- Added the option **"Filter the First Level by the User's Dimensions"** to Distribution Management settings

## Fixes

### Inventory

- Fixed an issue where, in some cases, the Assembly Voucher did not accept saving

- Fixed an issue where calculating Purchase Return differences was not enabled when FIFO is used for inventory costing

- Fixed an issue where, in some cases, processing certain system Stock Issue documents failed

- Fixed an issue where, in the Sales Invoice term config, when the option **"Consider the Subsidiary When Consolidating Inventory Documents in Invoices"** is checked, then a Stock Issue with a customer subsidiary is created, then the inventory documents are consolidated onto the Sales Invoice, the system consolidated all the documents with the selected subsidiary plus those with no subsidiary; the correct behavior is for the system to consolidate only the documents belonging to the subsidiary, without showing the ones with none

- Fixed an issue where, in some cases, re-saving an **Additional Receiving Costs Voucher** turned the first line in the system allocation into a negative value, and each re-save increased the negative value further

- Fixed an issue where a `Re-commit` on the **Stock Count Committee** document caused the system to double the items' cost

- **Assembly Voucher:** Fixed an issue in the "Quantity per Assembled Item" column, where selecting the assembly method and then editing the item quantity made the system recalculate the "quantity per assembled item" field by dividing the edited item quantity by the assembled-item quantity, even though it is stated in the assembly method. The issue was fixed by no longer editing the "quantity per assembled item" when the quantity is entered on the line

- Fixed an issue where, in some cases, processing a Stock Transfer voucher failed

- Fixed an issue where, after creating a stock receipt not linked to a purchase invoice, then performing a stock count, then creating a purchase invoice and linking it to the stock receipt, the system refused this link because of the stock count, even though the option allowing it was enabled

### Sales

- Fixed an issue where, when the option **"Ignore Compliance with Price Lists When a Sales Voucher Exists in Based-On"** is enabled to ignore the **"Compliance with Price Lists"** option in the Sales documents term config, an error appeared with free-item offers: creating a Sales Invoice based on a Sales Order with free items resulting from free-item offers showed an error that the free item is not compatible with the offers

- **Offers window - Free Items on Items section:** Fixed an issue where, when choosing a main item that is similar in department and classifications but has a different brand, an error appeared saying the line is duplicated, even though the brand is different

- Fixed an issue where the system sometimes did not accept editing a Sales Invoice that automatically creates a Stock Issue voucher

- Fixed an issue where editing the Additional Costs on the **Additional Costs** document caused an error in the amounts in some cases, such as the following:
  - Adding an expense and saving
  - Then another expense and saving
  - Then reducing the value of the first expense and saving
  
  In most cases, negative and completely incorrect numbers appeared

### Purchasing

- Fixed an issue where, in some cases, editing any Purchase Invoice and saving made the system execute the operation very slowly, sometimes taking 5 minutes for an invoice with no more than 10 items

- Fixed an issue where a `Recommit` on a Purchase Invoice that has an Additional Receiving Costs Voucher made the system double the values of its expense items on the Additional Receiving Costs Voucher (if any)

### Accounting

- Fixed an issue where, on the **Cash Payment Voucher** document, selecting a Disbursement Request as Based-On did not copy the data from the request, and the error **"Cannot Execute the Operation"** appeared

- **Payment Voucher:** Fixed an issue where changing the account on the line to any other account made the system revert the account to its original state. For example, on a line with a Vendors account, changing the account to Deferred Payment Cheques with a specific account code left the system on the Vendors account and did not accept the change

- Fixed an issue where creating an accounting-effect side for the dimensions of fees on payment methods did not take the dimensions from the accounting-effect side, and they were ignored

### Letters of Credit

- Fixed an issue where, after deleting an **LC Assignment Voucher** from a Letter of Credit and then adding any expenses to the Letter of Credit, the message `delete from SystemLcExpenseLine where lcExpenseDocument_id is null` appeared on the **LC Assignment Voucher**

- Fixed an issue where, when selecting a Letter of Credit that has lots, selecting a specific lot, and clicking the Consolidate Expenses on Items button, the error `Invalid criteria, closed brackets are more than open brackets` appeared

- Fixed an issue where a `Recommit` on an **LC Expense Voucher** made the system double the values of the expense items on the Letter of Credit

### Contracting

- Fixed an issue where an **Executive Budget** could not be deleted while a Customer Item Submittal created from it existed, and likewise that submittal could not be deleted while a budget that created it existed. This was fixed so that, as soon as the budget is deleted, the customer submittal created because of it is deleted, and likewise, when the customer submittal is deleted, its line on the budget is deleted

- Fixed an issue where the **Cost Execution** document did not take into account the actual date of the cost documents (Contracting Miscellaneous Invoice - Contracting Material Issue documents)

- Fixed an issue where, clicking the Consolidate Clauses button on the **Subcontractor Extract** screen, the system sometimes included some of the main clauses found on the Subcontract and sometimes did not; all main and sub clauses should appear when clicking Consolidate Clauses

- Fixed an issue where, clicking the Consolidate Clauses button on the **Subcontractor Extract** screen, the cost clause's name (the Executive Budget clause description) found on the Subcontract did not appear

- On the **Budget Item Requests** screen, selecting the Customer Item Submittal on the line has the following issues:
  - The item code does not appear
  - There is no item name field
  - The item unit does not appear
  - The unit price comes from the submittal's unit price, which is wrong - it should come from the unit cost, not the unit price
  - The main unit (quantity and unit) is duplicated again at the end of the line
  - There is no field for the total price after tax and discount on the line

- Fixed an issue where, on the **Estimated Budget** and **Executive Budget** screens, selecting a Standard Term made the **"Value Type"** and **"Value"** fields not appear, so the planned value, whether addition or deduction, was not calculated, and an error appeared on save

- Fixed an issue where, on the **Project Contract** screen, creating a new document and selecting a Standard Term that is a percentage of the total showed an error, since the contract's base-price field had not been calculated yet

- Fixed an issue where creating a Project Contract based on an Estimated Budget did not copy the Standard Terms from the budget to the contract

### Project Management

- **Project Quotation:** Fixed an issue where, when the quotation status is "Preliminary," accepting or rejecting it and then saving left it as "Preliminary"

- **Project Quotation:** Fixed an issue where the Planned Cost on the Tasks page did not work

### Human Resources

- Fixed an issue where, on Bulk Leave Vouchers, selecting the leave type caused a long loading delay before the leave type appeared

- Fixed an issue where the system allowed saving a Payroll Voucher update with an actual date earlier than the Job Assignment's actual date

- Fixed an issue where, in some cases, clicking the Reissue Payroll button on the payroll-record screen showed the error **"Could Not Execute the Operation"**

- Fixed an issue where an employee was appointed on 12/7/2020 and the employee's salary on the Payroll Voucher was calculated based on 18 working days, while it should have been only 17 working days after deducting the weekly holiday (Friday) from the working days

- Fixed an issue where, on one Payroll Voucher, an employee was appointed on 2020-08-04 and the full month's salary was calculated, while the salary should have been calculated for only 24 days - meaning two extra days were included in the salary

- Fixed an issue where deleting a **Leave Allowance Payment Voucher** showed an unclear error message because of an incorrectly entered email on the employee; the correct behavior is to show a clear error message

- Added the `combobox` **"Less-Than-a-Day Leave Value"** to Bulk Leave Vouchers and Bulk Leave Vouchers for More Than One Employee, as in regular Leave Vouchers

- Fixed an issue where, in some cases, when there are two salary items of the same type, one with a criterion and lower priority, even though the criterion applies to the employee, that item was not selected

- **Payroll record:** Fixed an issue where, in some cases, clicking Issue Payroll Vouchers took a very long time

### Settings

- For vouchers that already had their prices changed, their Exit Voucher was re-saved

- Added the following fields to the Vehicle screen details:
  - 5 `ref` fields
  - 5 `text` fields
  - 5 `n` fields

- **Term Sheets window:** Fixed an issue where applying a Default Values Template from the More menu showed the error **"Cannot Execute the Operation"**

- Fixed an issue where filtering fields by criteria was set up for a Purchase Invoice, and it was found that the `Context Filter Dynamic Fields` field was not filled in automatically; an incorrect error message also appeared in the Notes

### Hospital Management System

- Fixed an issue where not all of a patient's documents appeared on the Patient window's Related Documents page, such as Lab Test Invoices, Radiology Invoices and Final Invoices

### Real Estate

- **Rent Contract:** Fixed an issue where a `Recommit` on the new contract made the system modify the value in the **"Previous Rent Contract"** field, copying the current contract's number into the Previous Contract Number field

- Fixed an issue where, extending a Rent Contract or Opening Rent Contract, the system copied the installments correctly but also copied the field **"Paid = true"** on the paid installments from the old contract, considering them paid on the new contract too

- Fixed an issue where creating a **Real Estate Maintenance Expense Voucher** based on a **Maintenance Report** document did not copy the notes found on the report's header or on its lines

- Fixed an issue where, in one case, the system journal entry for the Real Estate Expense voucher put Reference 1 and Reference 2 on the credit side even though nothing was selected in the term config; likewise, if a percentage was set on the Customer field, the entry put a reference that was not selected in the term config, or the accounting-effect side, on the debit side

### New GUI

- Fixed an issue where, in some cases with the Arabic interface, applying a sales offer made it impossible to open the Payment window

- Fixed an issue where, in some cases, field filtering did not work correctly

- Fixed an issue where, in some cases, a button created by customizing a screen in the New GUI took much longer to create documents than in the old GUI; the button could also fail to perform the task it was configured for

- Fixed an issue where page permissions did not work correctly as in the old interface: hiding pages from the user's Permissions file left them still visible to the user

### Point of Sale

- Fixed an issue with slowness and freezing when using the Point of Sale app and saving consecutive invoices intensively

- Fixed an issue where, in some cases, the price list worked correctly in Nama, but in Point of Sale the system did not bring in the item price

- Fixed an issue where multiple documents (Sales Invoices, Shift Open and Close, Stock Transfer Request) were transferred as drafts even though there were no errors, while trying to save them in Nama saved them directly

### Mobile Applications

- Fixed an issue where, in the **Shopping app**, the system did not display data correctly when switching to Arabic

- Fixed an issue where, in the `Nama ESS` app's new version 2.3.1, approving a Stock Issue Request with a single line showed the full approval summary, while with more than one line the system did not show the whole approval summary
