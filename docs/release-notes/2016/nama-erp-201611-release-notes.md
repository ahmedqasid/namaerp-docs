# Nama ERP Release Notes - November 2016

::: info Release Information
**Release Date:** November 2016  
**Release Number:** 201611
:::

## Additions

### Inventory
- Added **Default Unit Mode for Sales and Purchasing** at the warehouse level.
- Added the ability to **unlink item categories** when coding an item. Example: if the category order on the Items screen is changed so that Category 4 comes before Category 2, entering a value in Category 4 causes Nama to clear Category 2.
- **Warehouses file:** In the Use Location option, the "Optional" state was removed, keeping only the two states (**Mandatory** and **Forbidden**).
- **Item file - Versions page:** Added a default unit at the line level for each version.
- Added the **"Auto Coding"** section to the Item file - Settings page, containing the fields (**Coding Prefix, Suffix Length, First Number**). These options are active only for manufactured items (**Can Be Manufactured**), so that when the Lot code is left empty in the Production Order it is calculated automatically on save.
- When a **"Quality Inspection"** document is created based on a **"Stock Receipt Voucher"** for raw materials, improved so that the **"Retest Date"** is calculated based on the **"Retest Period"** in the **"Item file"** and recorded inside the **"Stock Receipt Voucher"**, then the **"Stock Receipt"** line is updated with the retest date, so this date is pulled into the date data for every `No Control` in the rest of the documents.
- **Item Voting file:** Allowed grouping classification documents on items; grouping is by: branch to branch – warehouse to warehouse – date to date – voting document to voting document.

### Sales
- Added the option **"Never Update Prices"** to the term config settings for Sales documents.
- Added `ref1.lines` and `ref2.lines` to the Sales Invoice.
- Added the field **"Additional Source"** to the Price List, and added the button **"Add Additional Source Lines"** to insert that source's items into the Price List details.
- Added the Contact grid to the Customers page, similar to the Contact grid on Vendors (`Contact Grid`).
- **Price Lists:** Improved so that when an item code is entered, the system first searches for the item code among the codes; if not found, it then searches versions, sizes, colors and all custom codes, and uses whichever one it finds directly.

### Purchasing
- Added `ref1.lines` and `ref2.lines` to the Purchase Request and the Purchase Invoice.

### Accounting
- Added an attachment at the Miscellaneous Invoice level, in addition to the attachment already available on the line.
- Added the two documents (**Receipt Order, Payment Order**).
- Changed the **Purchase Item** file to become a **Subsidiary** file.
- Moved `ref1.lines` and `ref2.lines` from the Journal Entry Voucher to the `Ledgertranslines` table.
- Created a new state for the Payment Request called **Deferred**.
- Improved so that when creating a Receipt Voucher, Payment Voucher, or Partner Current Account, and choosing a subsidiary account type, the subsidiary field is (**locked**).
- Added the entity flow `addPVRVFinancialPaperDetailsLines#ACCDefaultUI`.
- **Accounting - Payment Request:** Rejection and acceptance are required at the line level, and when a Payment Voucher is created from within the Payment Request, the Payment Voucher is created with the accepted lines only; likewise, when a Payment Voucher is created based on a Payment Request, only the accepted lines are inserted.
- **Profit Distribution document:** Added the following changes:
  - Added the fields `n1,n2,text1,text2`
  - In the lines, added the field (**Partner's Capital**), set by the user (from the partner's subsidiary account named as the capital account)
  - Their share of management, calculated automatically from the management ratios table
  - Total partner dues, being: their share of profits + their share of management + capital
- Prevented saving the **"Payment Voucher"** if the bank account inside the financial paper (**cheque, promissory note**) differs from the bank account on the Payment Voucher.
- When linking the invoice in the Receipt Voucher, selecting the Sales Invoice type and searching by double-clicking with the mouse, the search was performed in journal entry vouchers, but when using the lens for the search, it correctly searched Sales Invoices.
- Improved so that the user is allowed to create an account of a debit nature and link it to an account-nature tree whose nature is credit.
- Generalized the accounting effect to cover all accounting term configs.

### Banks
- Created the **Letter of Guarantee Request** file (before the Letter of Guarantee) containing an Accept and a Reject button, and a button to create a Letter of Guarantee.
- Developed a dedicated button for issuing the Letter of Guarantee inside the Letter of Guarantee screen.
- Added the **"Deferred Bank Deposit Return"** document.
- **Bank Notice:** Improved so that when a financial paper is selected, the bank account number in the financial paper is transferred to the bank account number in the Bank Notice voucher.
- Added the ability to **shorten the journal entry** arising from the two documents (**Bank Deposit, Financial Paper Cancellation**).

### Customer Relationship Management (CRM)
- Added 4 buttons to the Development Request: (**Finish - Reject - Reopen - Close**).
- Added the following two options to the Development Request:
  - Needs follow-up from technical support
  - Technical support follow-up work has ended

### Human Resources
- Added a dedicated voucher for **paying out an employee's leave dues**, to start calculating the new leave balance in cases where the employee does not take their annual leave and only receives its value.
- Added the ability to **apply a lateness calculation** starting one hour after the start of work time, so the deduction starts from that point and not from the start of work time.
- Added a new option to the Element Type screen: **"Can be used without being added to offers or updating data"**.
- When creating a Leave Allowance Payment Voucher, the system journal entry was not created correctly, as the credit side was considered on both sides of the entry without regard to the debit side, as shown in the attachments.
- Increased the number of detail fields in the Payment Settlement Request document.
- Defined a scenario that deducts 3 days when an employee is absent without permission on the first or last day of the work week (not necessarily only Sunday and Thursday).
- Added the **"Functional Section"** file, linked to the employee's department, so that when a particular department is chosen for the employee, only the sections that belong to it are shown.
- Added the ability to **record an employee's attendance and departure** on the attendance and departure sheet of a company other than the one the employee is registered under.

### Real Estate
- In the **Rent Contract** and the Opening Rent Contract, added a dedicated **contract extension** button, which creates a new contract with the same current data while changing the from/to period to the following similar period.
- **Sales Contracts/Opening Sales Contracts:** Added a **create Receipt Voucher** button from within the Sales Contract, similar to creating a Collection Voucher, so that if the customer does not need the Collection Voucher step, they can create the Receipt Voucher for a number of installments without needing a Collection Voucher.
- **Lease Termination document:** Introduced improvements to the term config of the Termination document to suit all cases.

### Project Management
- Improved so that as soon as a **"Phase and Discipline Group"** is inserted into the **"Project"** file, the system inserts both the **"Phases"** and the **"Disciplines"** into their respective screens within the same project file, without duplication (i.e., the matrix is unpacked into its two component dimensions, each in its place).
- Added the **"Phase Group Project"** file so that it has lines for selecting phases, which can then be called into the Project file's Phases screen.
- On the Phases screen in the Project file, phases are no longer linked to project coding, so phases are coded first from the Phase file screen, then called into the project at the line level.
- Added the **"Discipline"** file, then placed it on the Project screen under the name (**Disciplines**), after the Phases screen and before the Tasks screen.
- Added the **"Project Classification"** file to the **"Project"** screen.
- **Employee file:** Improved so that the fields (**Project Type - Project Subtype - Manager - Deputy Manager - Planned Project Start**) are not required.
- **Employee file:** Added the field **"Total Contract Value"** in addition to **"Currency"**, **"Exchange Rate"**, and **"Contract Value in Local Currency"**, placed before the **"Estimated Cost"** field.
- **Employee file:** Added the fields **"Responsible Employee"** and **"Broker"**, both of type **"Employee"**.

### Point of Sale
- Copied all dimension tables from the main database to the Point of Sale database for reporting purposes.
- Added the ability to make the **current user the sales representative** in Point of Sale.
- Improved so that when opening a shift there is a dedicated button to **zero out the amounts** in the actual balance.
- Modified some of the Point of Sale permission titles in the Point of Sale permissions file to be (Cancel invoice before sale, Delete a line from the invoice, Delete suspended invoices, Edit item code, Edit item price, Edit item quantity, Edit Point of Sale settings, Inquire about prices, Perform stock count, Discount on the invoice, Issue payment vouchers, Issue receipt vouchers, Open/close a shift, Issue a return without an invoice, Edit item unit, Suspend invoices, Open - close the drawer, Register a new customer, Open a previous invoice, Issue credit invoices, Edit item dimensions, Auto-logout duration).
- Activated the **Notifications and Approvals** feature inside Point of Sale.
- Allowed **searching for the item code by the alternate code**.
- Added an option to **hide numbers**, and also added a numeric shortcut (such as a keyboard and calculator).
- Added the ability to display an item image in the item search, similar to the item search in Nama.
- Added the ability to **display an item image** on the item price inquiry screen at the same display size as the header inside Point of Sale.
- Restored the item image in Point of Sale to its previous proportion and fit as it was before.
- Changed the color of **Sales Returns** in the document header to red.
- **Coding a customer from within Point of Sale:** Introduced the following improvements:
  - Controlled **required fields** from the Point of Sale settings
  - Added the following fields for coding a customer: Residency - Customer Category (controlling fields that must not be duplicated by a prior definition)
  - Coding of the mandatory customer group for Point of Sale from within each machine: it can be a single group for all machines with manual coding
- Added a dedicated section for **exchange conditions** in the Point of Sale settings, where the number of days allowed for exchange is set, in addition to five exchange conditions.
- **Payment vouchers in Point of Sale:** Controlled the payment (credit) side, allowing a choice between (the machine till, which is the current default - or the employee's custody, which was newly added).

### Manufacturing
- Improved so that **"Production Order"** is not a required field in the **"Raw Material Return Request"** document, so it can be saved without inserting a production order.
- The user is no longer allowed to modify the Production Order after clicking Start Production Order, except after clicking Cancel Start.
- Improved the Production Order so that the user is not allowed to change **operations** or **product components** unless the option **"Operation details can be edited"** and **"Product component details can be edited"** are checked in the term config.

### Customer Relationship Management (CRM)
- Added a **Ticket discussion**, similar to the Development Request.

### Document Management (DMS)
- Increased the number of record owners in archival documents and increased the number of folders.

### Real Estate
- Added **other accounting effects** to the Rent Contract and the Opening Rent Contract, beyond what currently exists. Example: (collection commission - collected by the office from the owner, which is separate from the fee the office collects from the tenant).
- **Rent Contract and Opening Rent Contract:** Added a dedicated **contract termination** button.
- In the Lease Termination document, made **"Based On"** contain only two elements: the Rent Contract and the Opening Rent Contract.
- No longer allowed editing the Rent Contract after it has been terminated.

## Settings

- Added an option to Global Config: **Send mail and messages from the servers (CSV)**.
- Created an entity flow to write the default checkout time for employees of a given job or a given department when the departure fingerprint is not registered, called `ATimeAttendanceSetDefaultToTime`.
- Added the ability to **select the screens** to which contacts are added from Global Config, such as archival documents and remarks.
- Added a **preferred mail sender** and a **preferred messaging sender** to notifications and scheduled tasks.
- Added a **search** capability so that the value of the field being searched for can be = `(null)`.
- In release notifications: **isolated already-completed requests** from rejected and closed requests.
- The customer name and release number are now written into the file downloaded from the releases download page, for example `namaerp-sws-201611261047.zip`.
- **Fields and Screens Settings - Field Layout:** Added a line-level criterion.
- Added the option **"Do not allow changing the code in documents"** to Global Config.
- Made the ordering in the change log by the event date.
- Added the ability to **control the size of document lines** by editing a screen, through the Blocks page inside the screen and choosing the type **"Edit"**.
- **Permissions file:** Allowed applying a permission to all types by leaving the type and the type list empty.

## Reports
- Added modifications to the form screens.

## Fixes

### Inventory
- Sometimes, when editing an Opening Stock Voucher, a message appears saying some quantities have been returned, and the system refuses to change the warehouse.
- The system does not allow deleting an item's attached image on the Item screen.

### Sales
- When adding a barcode to the invoice print template, an "operation not possible" error appears.

### Accounting
- In the Journal Entry Voucher, when the amount is entered in local currency and a foreign currency is chosen and the local equivalent is shown, editing the local amount does not cause the system to update the currency equivalent.
- An error appears when deleting a Profit Distribution document.
- In the Profit Distribution document, if costs exceed revenues the profit is negative, so processing the document fails, and the journal entry should be reversed when the values are negative.
- When debt aging is activated at the sector level and a Receipt Voucher is created for a customer with the sector specified on the Receipt Voucher, all of the customer's invoices are shown on the invoices screen of the Receipt Voucher, without limiting them to the invoices belonging to the specified sector only.
- When coding a financial paper from within a Receipt Voucher, an error message about a duplicate code and cheque number appears, even though there is no duplication at all.

### Banks
- When a financial paper is partially cancelled and its status becomes partially cancelled, it no longer appears again on the financial paper cancellation screen; and when a financial paper is selected in the cancellation document and the cancelled value is not entered, please copy the full paper value into the cancelled value and treat it as a final cancellation.
- **Translation of the status inside the financial paper** is not translated, as the paper's status on a deferred bank deposit is not translated.
- When creating a deferred bank deposit based on a Receipt Voucher, the financial papers come without their related subsidiary.
- Sometimes, an error message appears when saving a deferred bank deposit.
- When creating a deferred bank deposit based on a Receipt Voucher, the deferred deposit document does not copy its data from the Receipt Voucher.
- Nama allows the user to create an issued cheque even if the bank account number in its chequebook differs from the bank account number in the financial paper document.

### Settings
- Editing the font and font size does not work correctly for the user until a `test + cash evict` is performed.
- Editing the font and font size for the user affects all users.
- When creating a quick help definition and running it from one of the screens, an empty error message appears.

### Human Resources
- When creating a Leave Allowance Payment Voucher, the system journal entry is not created correctly, as the credit side is considered on both sides of the entry without regard to the debit side, as shown in the attachments.
- The system does not allow storing a (**Penalty or Reward**) voucher without entering the counterparty method, even though the (**Penalty or Reward**) type is in-kind.
- When attaching an attendance/departure file, if the departure date is earlier than the attendance date, the system accepts the save while calculating the departure time on the following day.
- When creating an Employee Data Update voucher, the value of the field `employee.description1` is not retrieved into `UpdateEmployeeInfo.description1` and is shown empty, even though the same field on the Employee screen has permitted values.

### Point of Sale
- Opening the Help screen and then moving to the Close Shift screen leaves the Help screen still showing.
- A problem occurs in the numbers of sales invoices issued from Close Shift (**invoice sequencing**).
- When **Group Invoices** is selected in Point of Sale, they are posted individually at closing.
- Navigating between Point of Sale invoice records in Nama does not work correctly when there are exchange invoices.
- The settings window opened from within Point of Sale does not contain the fields (`ReadData`, `ReadDataRecordsCount`, `ReadDataTime`).
- The lock screen no longer dims the Point of Sale window.

### Project Management
- When adding any account in the **"Project"** file, an empty error message appears.

### Real Estate
- Viewing the system journal entry does not appear in the More menu of the Assignment document.
- When creating a Receipt Voucher from within a Sales Contract or an Opening Sales Contract, the system exits the Sales Contract screen and opens the Receipt Voucher on the same screen. Improved so that the Receipt Voucher opens as a popup screen without reloading the main screen.
- When creating a Receipt Voucher from within a Sales Contract for an installment that has already been collected in the system, the system does not prevent the creation because it copies the data into the Receipt Voucher, but in the payments the net comes out empty and the paid value is empty, and it accepts the save as if it were an accounting receipt not linked to a Sales Contract.
- When selecting a group of installments from within a Sales Contract and creating a Receipt Voucher for them, the total contract value is copied into the amount instead of only the value of the selected installments.
- **Ownership Assignment document:** Improved so that all installments from the old contract are inserted, and the paid ones among them are moved to "paid in advance".
- Improved so that the unit price currency is transferred from the old contract.
- **Lease Termination document:** In the leased residential unit field, all units appear, whether leased or not, regardless of the unit's status.
- **Lease Termination document:** When a unit is selected on a Rent Contract on which an insurance value had been entered, it is not copied from the Rent Contract to the Termination document.
- **Lease Termination document:** When a lease termination is created for a unit and then deleted again, the unit's status remains "not leased" until the lease document is saved again, and creating a termination for the Rent Contract is not accepted before the re-save operation is completed.
- **Lease Termination document:** When performing a lease termination and choosing a document owner other than the lessor on the Rent Contract, the save is accepted.
- The system does not allow saving the term config of the Unit Receipt Report document.
- **Ownership Assignment document:** The unit's previous buyer is inserted into the wrong field.

### Fixed Assets
- Sometimes, in the Closing Entry, an error appears in calculating the fixed asset depreciation expense.
- Improved so that when a fixed asset is saved for the first time and an asset type with accounts is selected, the accounts inside the corresponding asset type are copied to the asset if left empty. Example: the user set only the accumulated depreciation account and left the asset account and the expense account empty; they are copied from the asset type automatically.
