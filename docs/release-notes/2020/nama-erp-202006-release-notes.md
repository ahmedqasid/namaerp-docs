
::: info Release Information
**Release Date:** June 2020  
**Release Number:** 2020.06
:::

# Nama ERP Release Notes - June 2020

## Additions

### Inventory
- **Finished Product Pricing Document**: Added changes to the document so that `Semi-Manufactured` or `Semi-Assembled` items are expanded, to preview the finished product's total cost and then set the appropriate price
- Added the `Use the line cost for FIFO, except for returns` option to `supply chain` settings; it is enabled by default and does not apply to returns
- **Item Window - Conversions Table**: Improved so that the unit (S) is always the main (smallest) unit, and saving is rejected with an error message if it is not
- Added an entity flow named `EAAutoSerialNumberCalculator` so the item's serial number is set automatically
- **Distribution Management Documents**: Added an option to prevent saving if the Quantity Tracking fields are negative
- Added the `Maximum Times of Reprocessing When Overdraft Cost Changes` option to control how many times cost is rolled back and recalculated
- **Assembly Machine File**: Added the (Warehouse - Warehouse Location) fields to the header of the (Raw Materials - Auxiliary Raw Materials - Outputs) screens, to work as follows:
  - If a warehouse / warehouse location exists in the header, it is inserted automatically into the Assembly Machine file's lines on save
  - It is inserted automatically when an Assembly Machine file is selected on a Processing document, exactly like the rest of the fields are currently inserted
- Added 5 time fields to the header of the Assembly document
- **Assembly Document**: Copied Reference 1 and Reference 2 from the Supplied Items lines to the lines of the Stock Receiving document automatically generated from the Assembly document

### Sales
- Added the Customer Classification on the line to the choices available to it, the same way it exists in the header, in Price Lists
- Service items are now shown on the Sales Invoice when searching inside the invoice

### Purchasing
- Added the `Consider the subsidiary when grouping stock documents into invoices` option to the Purchase Invoice term config
- Added 3 `Boolean` options to the lines of the Purchase Price Offer document
- Service items are now shown on the Purchase Invoice when searching inside the invoice

### Accounting
- Added the two fields - Credit Side for the Shift Difference and Debit Side for the Shift Difference - to the Payment Method file; when the side is set within the payment method, it is used instead of the difference side set generally in the term config
- On the Miscellaneous Invoice document, added the following:
  - 3 fields of type `Boolean` on the lines
  - 3 fields of type `Date` on the lines
  - `details.ref3,4,5`
  - `description`
  - `n3,4`
  - `date1,2,3,4`
- Added the ability to create a Bank Advice after cashing a check on a Receivable Financial Paper (i.e. when the paper's status is Endorsed, a Bank Advice can be created for it), and added an accounting effect for it in the term config
- **Miscellaneous Invoice**: Added the following fields:
  - 10 (`n`)
  - 10 (`date`)
  - 10 (`ref`)
- Added a field for the accounts belonging to the relevant party, so that when the account is selected and a Receipt, Payment or Advice document is created, it posts against this account — meaning the selected account is the paper's primary account
- **Miscellaneous Invoice**: Added the following:
  - When selecting the Credit side (a subsidiary account) and then selecting the account for the subsidiary, the subsidiary linked to the account is shown (i.e. selecting a Customers account automatically shows the Customer subsidiary, or the subsidiary linked to the account)
  - When selecting the Credit side (a subsidiary account) and going to the subsidiary and selecting, for example, Employee, and selecting the employee (the accounts linked to the subsidiary are shown automatically)
- **Account Classification**: Added `Adjustments` to the Cash Flow Type
- Added the `Cash Flow Statement Adjustments Classification` field (hidden) to the Journal Entry lines
- Added the `Allow transactions without a subsidiary and vice versa on system journal entries` option; to prevent errors, this option cannot be checked unless the `Enable allowing transactions without a subsidiary and vice versa on system journal entries in accounting` option is checked first, in Accounting settings

### Human Resources
- Added an attachment to the line on the Responsibilities page in the Employee window
- **Job Applicant File**: Added a new state to the Interview Status field: `The other interview was held`
- **Job Opportunity File**: Improved so that clicking the Change Status button adds the `On Hold` status to the resulting `Change Status` window
- **Employees File**: When the (`Code Extra`) property is enabled for a field, then a record is added and the same code entered, a non-descriptive message appeared. The error message was changed to include the id of the record where the code is duplicated
- Improved so that salary formula queries can be written to reach the number of days of the previous or next payroll period - fixed or actual
- **Bonus / Penalty Document**: Added the following:
  - Added a term config for the document containing the fields (Has an accounting effect, Calculate debit and credit from the bonus type, Bonus/Penalty disbursement method)
  - Added a currency and a subsidiary to the document
- **Clearance Document**: Added additional fields (`b`, `ref`, `date`, `n`, `description`), bringing the total of each to 20, to be used as a substitute for approving the clearance from different departments
- Created a term config for the Job Offer document with the `Do not change the employee's hire date to the Job Offer date` option; also added the `Automatically Source the Document Term Config` field on the Combined Job Offer, to add the term config
- Added two fields to the Termination Settlement document screen, on the End of Service page, as follows:
  - The Round Net Working Days option
  - The Net Working Days Rounding Method list
- They can be used in calculating the net working days
- Added a new field named `Calculate Service Duration Days From`, with two options: `Net Working Days` and `Service Duration`, which is the number used for working with tiers and calculating through it
- Added a Daily Wage document, and added an accounting effect for the line totals to the document's term config
- Added a new document named `Combined Advance Document`

### Letters of Credit
- A non-descriptive message appeared when trying to save an Expense document for an item that had been deleted from the preliminary invoice. The message was improved to describe the problem

### Contracting
- **Contracting Settings**: Added the `Determine the parent item code from the coding method (the sub-item code starts with the main item code)` option, to compute the main item for each item based on how that item's code starts. It can only be enabled when the `Manually code items in contracts and Assays` option is enabled
- Allowed creating an Estimated Budget or an Executive Budget without linking it to the Project Contract
- Added the Source field to the Estimated Budget and the Executive Budget

### Manufacturing
- Added a new issue method for raw materials in Product Components: `Supplies Not Issued`
- Added the `Add resources from Standard Operations to the Operations file` option to the More menu on the Operations screen
- Added the following options to the Execution document term config:
  - `Consider the approval when creating a Product Delivery document`
  - `Consider the approval when creating a Resources document`
  - `Consider the approval when creating a Material Issue document`
  - `Consider the approval when creating a Sample Withdrawal document`

### Project Management
- Added a maximum monthly hours and a maximum daily hours, at the line level, for each employee in the Executors

### Fixed Assets
- Added payment details and a Create Payments button to the Shipping screen on the Asset Purchase Order
- Added the Sector, Analytical Group and Department to the Depreciation document grouping, where previously only the Branch existed

### Customer Relationship Management (CRM)
- Added a new document named `Work Plan`, and added the two fields (Visit Book and Term Config, Call Book and Term Config) to this document's term config

### Point of Sale
- Adjusted the default column sizes on the Search screen
- Adjusted and formatted the Payment screen
- Added the `read as mark` button for notifications, like the one in Nama ERP
- Added the `Cannot view notifications` option to POS permissions
- Added the `Custom Base Price Calculation Query` field to POS settings and to the Machine file — the query used to determine the custom base value, for example the following query:
  - `select (:qtyValue * 2) * :unitPrice`
  - This means the custom base is calculated by multiplying the quantity * 2 * the unit price, and it is calculated as soon as it is entered and used
- Added a message shown to the user when entering POS, informing them that there are a number of documents that have not been sent (just a notice to the user); they can then review them by any of the known methods
- Added the `Use the server to update the version` option to POS settings. When this option is selected, the POS version matching the current Nama ERP version number is downloaded
- Improved so that column names in the Sales grid `wrap words`, so the column name can be narrowed on small touch screens
- Enabled item discount offers together with the invoice classification

### Settings
- Created the `EAExportAttachments` entity flow to export file images, allowing the image name to be the file's code or name, and letting the export folder be specified
- Added a dedicated Help file to help understand screen fields and error messages
- **Permissions File, User File - Field Settings Page**: In the `fields disabled` table, added 3 new fields (Applies On (New - Edit - Draft)) in place of the old Applies On field
- Created the `File Export List` file, through which more than one record can be exported or imported
- Added export to the `Tasks Current Monitor` list, to control whether it keeps running
- Modified the `webservice` guide page so that no problem occurs when clicking the links on it
- **Approval File**: Prevented the user from checking both the `With Entry` option and the `With Budgets` option on the same approval
- Translated the following error message into Arabic: `Satisfied quantity (6) greater than order quantity (5)`, which appears when the linked document has quantity tracking and the quantity entered is greater than the linked document's quantity
- Added 3 `parameters` to the `com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect` entity flow
- **"File Export / Import List" Window**: Modified the window so it is a `File Export / Import List` instead of a File Export List
- To keep the previous release's files in case they are needed if a problem occurs in the current release, a folder named `yyyyMMddHHmmssSSS-Release-Old` is created inside the Tomcat folder, and `war.services-basic` + `war.erp` are placed inside it — the last part of the folder name is of course replaced with the current date and time at update time
- Added the ability to differentiate using additional fields such as `salesMan.details` or `ref1.details` in the `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem` entity flow, since a customer can have the same item but with a different salesman, and needs to edit the original document by adding a new salesman for the same item — without this, they cannot add it to the dependent document because of Quantity Tracking
- Added the `Inactive` option to some setup screens that lacked it, for example the screens (`Actions Post GUI`, Fields & Screens Settings, Quick Help Definition, Custom Reports List)
- Added the `Prevent editing documents after they are used in Based On` option to document term configs
- So that sending emails and text messages can be tested by sending the email to one specific address or the text message to one specific number, added the following options:
  - `send-emails-only-to=abc@example.com` to send the email to only one address and ignore other email addresses
  - `send-sms-only-to=01xxxxxxx` to send the email to only one address and ignore other email addresses
- Improved field filtering by criteria so it works both automatically and manually, similar to the Default Value template
- Made the edit log inside the User show the document type
- Added the ability to search using the plural form, such as the word `فواتير` (invoices) instead of `فاتورة` (invoice), so the system shows the invoice options
- Improved search to ignore similar letters (such as ا and أ)
- Improved search so that it searches for an Arabic or English word based on the context of the word typed (similar to Google search)
- Added the `Do Not Send With Recommit` option to the Alert Definition

### New GUI
- Changed the color of read notifications, as happens in email (background color), in the New GUI only
- Added the `Start with the New GUI on mobile and tablet devices` field to Global Config
- The part responsible for updating notifications and approvals, `UnreadNotifications5listTop`, was being called every short interval, causing severe slowness. Updated so it is only called on startup and when the number of notifications or new approvals changes; also, a message is now shown if an action is performed and a server-connection problem is found on a device (`there is unhandled exception`)
- **"Dashboard Widget" File**: Added (English Title | `chartTitle E`), since previously there was only an Arabic title, which showed in Arabic even when working in the English interface
- Added the `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedValuesAtDetail` entity flow, to prevent certain fields from repeating
- Made the last four icons on the lines in Attachment 2 appear on a single line instead of two
- Updated the Kendo version, but the `pager` was not moved to the top, since the `footer` moves with it, which looks bad

### Reports
- Added the system report `016HRS-SYSR` - Employee Leaves - Allocated, Consumed and Remaining
- Added the system report `017HRS-SYSR`, for employee leave transactions, consumed, remaining, and balance

## Fixes

### Inventory
- **Miscellaneous Invoice**: Fixed an issue where creating a document term config with the effect "document subsidiary debit, line subsidiary credit" produced no journal entry, because the account was taken from the line subsidiary on both sides; when the term config was changed to set the debit side from a header field and the `subsidiary` field was selected, the same problem continued, still pulling both sides from the line subsidiary
- Fixed an issue where, sometimes, an error occurred in item costs when issuing a Stock Receiving document based on a Purchase Order

### Sales
- Fixed an issue where, sometimes, Replacement documents could not be saved
- Fixed an issue where saving a Price Offer after enabling the approval options showed the `Operation could not be performed` message

### Accounting
- Fixed an issue where, on the Financial Papers screen, selecting the type `Promissory Note` with the paper direction `Payable` disabled the Bank Account Number field
- Fixed an issue where, when using payment methods on invoices and selecting a subsidiary within the document, the system could not create the journal entry from the payment method; and when using the direct term config for payment methods, the bank fees journal entry was incorrect
- Fixed an issue where, sometimes, an error appeared when saving the Miscellaneous Invoice

### Human Resources
- Fixed an issue where, sometimes, the Salary Item added the rounding factor even though the value it was applied to was not related to it
- Fixed an issue where, in Salary Item formulas, when a query existed in both Multiplied By and Divided By, the system ignored the values in Multiplied By and Divided By; the correct behavior is to consider both together
- Fixed an issue where, after adding the two fields on the Termination Settlement document screen for rounding the net working days, the system did not calculate the net working days correctly

### Manufacturing
- Fixed an issue where, sometimes, the system delivered products with incorrect costs

### Settings
- Fixed an issue where, when adding a field from the lines to the result columns in the `view list` view, Nama ERP did not allow browsing all the records; for example, if there are 50 records and each record has 2 lines, so the total number of lines shown in the `view list` is 100 lines, Nama ERP only allowed browsing the first fifty of them
- Fixed an issue where, when no users were specified in the `Applied To` table, what was defined in the Help Definition file did not work with fields and did not work with error messages; the correct behavior in this case is that it should work with all users
- Fixed an issue where granting the View by Search permission without the View Lists permission caused search not to work, because it lacked the View Lists permission
- Fixed an issue where returning a Work Task document whose status was Awaiting Approval showed the `technical error` message
- Fixed an issue where creating an approval definition for a file (Product Components, for example), then returning the approval (on entry, not on edit) — with lines present — then resubmitting it for approval, showed an error
- Fixed an issue where creating a Permissions file, copying the types from the `default` list, copying from the `accounting` group, then clicking the `Add the types found in this group` button, caused an error

### Point of Sale
- Fixed an issue where, sometimes, the system did not send some Receipt documents to Nama ERP
- Fixed an issue where navigating between screens with unsaved data showed a message that the data would be discarded, and after confirming and then returning to the same screen, the data appeared not to have been deleted

### Letters of Credit
- **LC Expense Document**: Fixed an issue where, when the rate had decimal fractions, the document showed one value and the journal entry showed a different value
- Fixed an issue where, on the Expenses document window, the Dimensions section appeared above the Totals section, which is inconsistent with the rest of the system's windows

### Customer Relationship Management (CRM)
- Fixed an issue where an error appeared when saving a Visit document

### Real Estate
- Fixed an issue where, after creating a Relinquishment document on a Sales Contract, then creating a new Sales Contract for the same unit after the Relinquishment document, a second Relinquishment document could not be created on the new contract
- Fixed an issue where, sometimes, the system refused to save the Relinquishment document
- Fixed an issue where creating an Ownership Relinquishment document did not update the unit to being available for sale, i.e. the unit still showed (Sold)

### Hospital Management System
- Fixed an issue where, on the Patient's Final Invoice, when grouping invoices, the system did not show the value of the Medical Supervision Invoice retrieved with the invoices, so the total invoice value did not include the Medical Supervision Invoice's value
- Fixed an issue where inserting a Medical Service into the Surgical Procedure Type file showed the `Operation could not be performed` error
- Fixed an issue where, on the Operations Invoice document, there was a problem calculating prices linked to an Approval document
- Fixed an issue where a Patient Admission Form was created, then a Patient Admission document was created manually, which in turn automatically created a Stay Invoice and a Medical Supervision Invoice, then an Operations Invoice, then a Final Invoice; after that, creating a Patient Discharge document showed the error (Operation could not be performed)
- **Surgical Procedure Invoice**: Fixed an issue where inserting one of the surgical procedures in the `Surgical Procedure Type` field showed the following two errors:
  - The system retrieved the supplies price from the `Surgical Procedure Type` file, while retrieving the services from the `Medical Price List` file
  - In this case, the system deleted the supplies prices when the surgical procedure was saved, because there is a unit price on the Medical Supplies page of the Procedure Invoice, while there is no unit price on the Supplies page of the Procedure Type file (only a total price exists)
- Fixed an issue where a quantity and unit price exist on the Medical Services page of the Surgical Procedure Invoice, while no quantity or unit price exists on the Medical Services page of the Surgical Procedure Type
- Fixed an issue where a unit price exists on the Medical Supplies page of the Surgical Procedure Invoice, while no unit price exists on the Medical Supplies page of the Surgical Procedure Type
- **"Insurance Company Approval" File**: Fixed an issue where the `Patient Admission Form` field had no value in the document details, when it must equal the Admission Form found in the document header
- **"Feeding Issue" Document**: Fixed an issue where the (Based On) list contained all files, when it should contain only the possible files
- **"Feeding Issue" Document**: Fixed an issue where the Receiving Warehouse and Receiving Location had no effect, since the system did not use them in the resulting Assembly document
- Fixed an issue where the Patient Admission document term config had the following label errors:
  - `دفتر فاتورة التسكين` (Admission Invoice Book) should be `دفتر فاتورة الإقامة` (Stay Invoice Book)
  - `توجيه فاتورة التسكين` (Admission Invoice Term Config) should be `توجيه فاتورة الإقامة` (Stay Invoice Term Config)
  - `نوع فاتورة التسكين` (Admission Invoice Type) should be `نوع فاتورة الإقامة` (Stay Invoice Type)
- Fixed an issue where, on the (Stay Invoice) document term config, the label `نوع فاتورة التسكين` (Admission Invoice Type) should be `نوع فاتورة الإقامة` (Stay Invoice Type)
- Fixed an issue where, on the Doctor Form document (`Medical Price Info`), the translation should be (`Medical Supervision Price Info`)
- **Surgical Procedure Document Costs – Effect**: Fixed an issue where the label `تكاليف أسعار العمليات` (Operations Price Costs) should be `(العمليات)` ((Operations))

### Settings
- **"File Export / Import List" File**: Fixed an issue where a Purchase Invoice was exported through this window, then it was changed to `export reference fields that were not specified with the export`, causing the system to show the `Operation could not be performed` error when exporting the record again
- Fixed an issue where, with an `Action Post GUI` on the Subsidiary field, for example on the Receipt Voucher, selecting the subsidiary caused the system to change the current line back to the first line, which affected ease of keyboard data entry
- Fixed an issue where the system allowed creating a Document Cancellation document for a document that was Awaiting Approval

### Mobile Applications
- Fixed an issue where approving an Electronic Attendance document through the `Nameless` app showed `500 failed`

### New GUI
- Fixed an issue where, sometimes, the More menu did not work in the new `gui`
- Fixed an issue where the More menu did not show for a regular, non-`admin` user, even though it showed for the same user in the old GUI
- Fixed an issue where opening the list view and doing a page `Refresh` made two round trips to the server, which sometimes caused slowness
- Fixed an issue where, on the Item Settings window, selecting the policy for Withdrawal or Receipt (Mandatory or Optional) on any of the item settings prevented checking the `Quantity Tracking` option or the `Cost Tracking` option, since the option became unavailable to the user — even though this worked correctly in the old GUI
- Fixed an issue where, sometimes, `actions post gui` did not work with the new `gui`
- Fixed an issue where a screen change was made to the Payment Voucher so that its `default` filter order is descending, but this did not work in the new `gui`; also, selecting the view mode from the filter showed it empty in the new interface
- Fixed an issue where selecting to print the document's system journal entry in the new `gui` did not show the entries
- Fixed an issue where, sometimes, opening a specific Development Request or any document containing an `editor` showed empty content
- Fixed an issue where, when a base text in the program needed two lines, the field did not expand to two lines — for example, option names in Settings, in term configs, in the Permissions file, and in the User
- Fixed an issue where the time column did not work correctly in the New GUI, for example the From - To column in Attendance for the period inside the Salary document
- Fixed an issue where, placing an image inside the page in the New GUI and reducing the screen width, field names were not adjusted and long labels overlapped
- Fixed an issue where hovering over Previous Versions in the More menu did not show its submenu, and the user could not view any of the previous versions
- Fixed an issue where the program's background logo showed even when a dashboard was present on the main screen, and was not hidden or dimmed as in the old interface
- Fixed an issue where displaying the FIFO cost journal entry from the More menu on the Stock Receiving document showed the system journal entry instead of the cost journal entry, even though this worked correctly in the old `GUI`
- Fixed an issue where the permission to prevent actions in the More menu did not work correctly
- Fixed an issue where opening the `Code QR` screen in the New GUI showed it small and unreadable
