# Nama ERP Release Notes - October 2020

::: info October 2020 Release
**Release Date:** October 2020  
**Release Number:** 202010
:::

## Additions

### Inventory

- Added the following two options to the Supply Chain settings:
  - **Prevent saving Sales Return vouchers if there is an item that was not returned**
  - **Prevent saving Purchase Return vouchers if there is an item that was not returned**

- Added the option **"Allocate material cost by total average sale price rather than by quantity"** to the Assembly Voucher term config

- Added the option **"Allocate by total average sale price (from Assembly Vouchers)"** to the allocation method on the expense item

- Improved the **Assembly Voucher** so that, when it issues a Direct Cost voucher, the system adds the subsidiary to the automatically generated Additional Receipt Cost voucher

- Added the option **"Allow editing the conversion factor for item units that already have transactions"** to the Supply Chain settings

- Created a voucher titled **"Stock Receipt Cancellation"**

- Added the option **"Show the received and canceled quantity in the Stock Receipt voucher"** to the Supply Chain settings

- Added two fields to the Stock Receipt voucher lines, **"Received Quantity"** and **"Canceled Quantity"** `canceledQty`; they can be shown by editing the screen or through the option **"Show the received and canceled quantity in the Stock Receipt voucher"** in the Supply Chain settings

- Added an entity flow for automatic, sequential coding of Lots at the warehouse and item level

- Created an **Item Cutting Voucher** and a term config for it, carrying a term config and the book of the generated Assembly Voucher. The Item Cutting Voucher lines carry the dimensions of the issued item, and the quantities and dimensions of the requested item

- **Quality Inspection Document, Quality Confirmation Document:** Added the following fields:
  - The option **"Quality Re-inspection Required"**
  - The field **"Previous Document"**
  - The reference **"Next Inspection Document"**
  - The field **"Previous Answer"** (text, date, number)

- Added the following two options to the **Quality Checklist:**
  - **Do not verify the minimum and maximum accepted count in the quality document**
  - **Change the inspection result based on the answer number**

- Added options to the Supply Chain settings to allow overdraft in these vouchers, although activating them is not recommended

### Sales

- **Sales Returns:** Added the button **"Consolidate Payments from Based On"** to the **"Payments"** window

- Added the grid **"Additional Prices"** to the Price Dimension 1, 2, ..., 5 windows

- Improved so that a paid Sales Invoice linked to a Receipt Voucher cannot be deleted until its linked Receipt Voucher is deleted

### Purchasing

- Added the option **"Copy stock vouchers from the Copied From Voucher field"** to the Invoice or Return term config

- Added a reference (**Purchase Items**) to the Purchase Order screen's Details page, the same as the one that exists in the Sales Order under the name (**Sales Items**)

### Accounting

- Added the option **"Change status with a bank portfolio"** to the Receipt Voucher term config

- When the option **"Do not copy existing payments"** is enabled on the Payment Voucher term config, the system used to copy the payments anyway. Improved so that they are not copied, while still taking into account where payments are consolidated when pressing the Consolidate Payments button, as well as showing installments when searching for them by installment code and selecting the payment

- Added the **Remaining** column to the payments grid in the Payment Voucher

### Human Resources

- Added the option **"Allow more than one Employee Data Update voucher for the same employee on the same day"** to the Human Resources settings

- **Loan Voucher:** Increased the number of attachments to 5 attachments

- In the **Performance Indicators** window, the (`SQL statement`) field was activated when the indicator type (System) is selected along with the system indicator (daily manual indicator from an SQL statement)

- Added an attachment to the header and lines of both documents (**Vehicle Data Update Request, Vehicle Data Update**)

- **Leave Type File:** Added the option **"Start of year regardless of the hiring date"** to the **"Leave Accrual Policy"** list

- In the **Leave Allowance Payment Voucher**, the `PostAction` for the leave duration was fixed when the start date is changed

### Contracting

- Allowed consolidating conditions before saving a Subcontractor Extract

- Created a new document named **"Project Handover Letter"**

- Added the option **"Allow the Extract to exceed the contract quantities"** to the Extract Document Terms

- Added the option **"Do not copy the item description from the Project Contract to the Subcontractor Contract"** to the Contracting settings

- Added the field **"Item Description"** to the vouchers (**Subcontractor Advance Payment, and Other Subcontractor Payment**)

- Added the option **"Calculate the price from the profit margin percentage on save"** to the Contracting settings

### Real Estate

- When creating a Rent Contract for a reserved Unit, the error message was improved to be clearer

- **Rent Contract and Opening Rent Contract windows:** Improved so that pressing the Extend Rent Contract button shows an error message that an ended contract cannot be extended if the **"Ended"** field is checked

- Added Reference 1, ..., Reference 5 to the lines of the **Real Estate Maintenance Expense Voucher**

- Added the option **"Copy the paid amount from the installments when creating a Rent Contract based on a Quotation"** to the Real Estate settings

- Added the option **"Tax can be edited"** to the term config of both the Rent Contract and the Opening Rent Contract

- Added **the tax debit and credit accounts, the tax policy, and Subject to Tax** to the term config of the **Rent Installment Accrual Journal Entry** screen

- Added the following fields to both the **Rent Contract and the Opening Rent Contract:**
  - **Tenant's Next Rent Contract**
  - **Tenant's Previous Rent Contract**
  
  An entity flow was also created to process the old documents

- Added the option **"Do not copy the amount with Based On"** to the Payment and Receipt term config

- Added a payments grid to the **Subcontractor Contract** screen, the same as the one already in the Project Contract screen; it takes into account that, when creating an Accounting Payment Voucher based on the contract, the system copies the payments at the remaining value of each payment and allocates the amount across the payments

- Added Reference 1, ..., Reference 5 to the lines of the **Receipt Report**

### Customer Relationship Management (CRM)

- Added the option **"Allow editing the sales lead after it is linked"** to the CRM settings

### Manufacturing

- Added the field **"Request Status"** to the **"Production Order Request"** document

### Service Center

- Changed the entity flow so that created machines cannot be edited

### Hospital Management System

- Created the **"Procedure Type"** file and added it to the Examination Invoice

- Added **Based On** to the Examination Invoice, through which the booking data and price are inserted

- Added **Dimensions** to the Medical Invoices lines and factored them into the journal entry

### Fixed Assets

- Added the field **"Intangible Asset"** to the Fixed Asset

- Added the fields (**Note 1...Note 5**), (**Description 6....Description 10**) to each of the following:
  - **Maintenance Request**
  - **Maintenance Record**

- Added the **"Shared Assets"** list to the Employee window - Fixed Assets page

- Allowed the **Asset Stocktaking Voucher** to be saved with an empty details grid; in this case, the system treats the assets in the employee's custody as a shortage

### Settings

- Improved so that, when editing (**the report file's content**), the system checks the "copy text content to file on save" field automatically on save

- Added keyboard shortcuts for the buttons on the Signature window, as follows:
  - `OK - Alt+O`
  - `Clear - Alt+C`
  - `Cancel - Alt L`

- On import, when an error occurred no error message was shown, and likewise no success message was shown when the operation succeeded — the system downloaded the sheet with no messages either way; also, exporting `GenericReferenceOverrider` from the export list and then importing it did not work correctly. Fixed by ignoring references that do not exist if they share the same code as the file currently being imported (and, of course, the same type)

- Added the option **"Review on Save"** to books, term configs, and groups alike

- Improved the system so that, when running `recommit`, the check that prevents saving vouchers when an item cannot be purchased - sold - returned, etc. is skipped

- Added **Record Creator** as a search filter and a display column for the screen, across every record in the system

- Added the option **"Do not calculate the invoice tax with this policy"** to the Tax Policy

### Mobile Applications

- In the **Nama Orders** app, added the items list (such as customers - warehouses - units) so the user can press More - Refresh Data to read the new items

- In the **Nama orders** app, added the following improvements:
  - Added the ability to delete documents from the app when an option inside the settings allowing document cancellation is checked
  - Added other input fields alongside the customer field, controlled by an existing Nama option for whether they show or not
  - Added two voucher types (**Sales Return - Sales Return Request**)
  - Added the ability to print following the same approach as the Collection app
  - Improved so that, after reading an item and dropping it into the document, focus returns to the item code field for fast entry

- Added two new fields to the Receipt Vouchers app settings: `new receipt print formula` and `new multi receipt print formula`

- Replaced the name `item price` with `Item Info` for use with quantities, prices, or any other detail items

- Added two signature fields, which can be shown or hidden the same way as the shipping and address fields in the settings

- Added a button that, when pressed, inserts a formula for printing the receipt — and another for printing multiple receipts — in `HTML` format as well as the new format, to make editing easier

- Added an option that lets the user control making the print font bolder or lighter

- Placed the quantity and unit fields on the same line to save screen height, along with the item search field and the item code field

- On the search screen, swapped the positions of `next` and `cancel`

- Created a custom menu to update the logo and the formula

- Moved the signatures into the voucher body instead of the header, so signing happens at the end rather than at the start of data entry

### Reports

- Added a hyperlink on the balances in report **SYSR-FNS003** (**Balance Sheet by Account**)

- Updated the system report with code **SYSR-INV022**

- Added a hyperlink on the balances

## Fixes

### Inventory

- Fixed an issue where, in some cases, the Stock Receipt generated from a Sales Return was not costed by the system

- Fixed an issue where the Based On list in the **Reservation Cancellation Document** contained every document in the system, when it should only allow the Reservation Document

- Fixed an issue where the Based On list in the **Delivery Document** contained every document in the system, when it should only allow the appropriate documents

- Fixed an issue where the Based On list in the **Delivery Cancellation Document** contained every document in the system, when it should only allow the Delivery Document

- Fixed an issue where the Location field appeared twice in the details of each of the following documents:
  - Reservation Voucher
  - Reservation Cancellation Voucher
  - Delivery Cancellation Voucher

- Fixed an issue where the Warehouse was missing from the Delivery Voucher details, even though it existed in the Delivery Cancellation Voucher details

- Fixed an issue where the Warehouse was missing from the Loading Voucher header, and the Location appeared before the Warehouse in the Loading Voucher details

- Fixed an issue where the Warehouse and Location were missing from the Reservation Cancellation Document header, even though they existed in the Reservation Voucher

- Fixed an issue where the Warehouse and Location were missing from the Delivery Cancellation Document header, even though they existed in the Delivery Document

- Fixed an issue where, in the Warehouse file - **"Related Documents"** page, the title was wrong and should have read **"Related Locations"**

- Fixed the following spelling errors in the Item file - Settings page ("تشكلية" instead of "تشكيلة", "الوان" instead of "ألوان")

- Fixed the following spelling errors in the Item Range file ("تشكيله" instead of "تشكيلة", "ألوان" instead of "ألوان", "مصفوفه" instead of "مصفوفة", "إجمالي الكميه" instead of "إجمالي الكمية", "اقصي قيمة لفعالية" instead of "أقصى قيمة للفعالية")

- Fixed an issue where the option **"منع إدخال قيم مختلفة عن الموجودة في التوجيه مثل نوع مصدر الحساب - الذمة المتعلقة(حسابتهم)"** on the Payment Voucher and Receipt Voucher term configs had a typo and should have read **"...الذمة المتعلقة(حساباتهم)"**

- Fixed an issue where, in some cases, an error occurred when editing an Assembly Voucher that had automatically generated an Additional Receipt Cost voucher

- Fixed an issue where, when issuing a Stock Issue for an item with dimensions while quantity-by-dimension tracking is enabled and then searching the dimension fields, the dimensions appeared as `{(الطول * العرض) الكمية}`, when they should have appeared as `{(قيمة العدد للصنف)(الطول * العرض) الكمية}`

- Fixed an issue where, in the Sales and Quotation Price Lists, selecting the Employee field worked even for a user with no employee record

- Fixed the following issues in the **"Supply Chain Settings"** `Supply Chain` window:
  - The field **"Allow numbers and letters in the Inactive Percentage field"** was duplicated
  - In the section (Using item dimensions in LC costs, additional costs, and tender pricing), the following two fields:
    - **"استخدام النسبة الفعالة"** should have read **"استعمال النسبة الفعالة"** (like the other properties)
    - **"استخدام النسبة الغير فعالة"** should have read **"استعمال النسبة الغير فعالة"** (like the other properties)
  - The title (Insert the alternative materials found among the materials withdrawn in the Assembly Voucher only when creating the Alternative Materials voucher) should have read "Insert......etc."
  - The title `ConfigEntry.activateRelationshipsOfItemsInNextDocs` should be replaced with the title **"Activate item relationships in the following documents"**
  - The title `ConfigEntry.addGeneratedDocsTo` should be replaced with the title **"Show generated documents"**

- Fixed the following issues with the option **"Show the received and canceled quantity in the Stock Receipt voucher"** in the Supply Chain settings:
  - It had no Arabic title and was instead shown as `ConfigEntry.value.showReceivedAndCanceledQty`
  - This option was on the Stocktaking page instead of its proper place

### Sales

- Fixed the following issues in the **Sales Invoice**:
  - When the option that the invoice is paid in installments was enabled, the user was not forced to add the installment details
  - When the option that the installment code equals the document code and line number was enabled, the system did not allow saving and gave an error that the installment code could not be left empty
  - When installments with fractions were created — say 550.251 — and then a Receipt Voucher was created, the system settled the installment amount without the fractions
  - When payments were created from payment scheduling templates, the date was not generated correctly, so it did not fall every month
  - When saving for the first time with payments present, and the settings had the installment code as the document code + line code, the system did not accept the save

### Project Management

- Fixed an issue where the title **"Projects"** was replaced with the title **"Contracting Projects"**, which was a mistake

### Accounting

- Fixed an issue where the system did not copy the details when creating a Payment Voucher based on a **Subcontractor Penalty Voucher**

- Fixed an issue where, when creating a **Miscellaneous Invoice** and selecting the header subsidiary as Account and choosing a specific account, the document refused to save due to a conflict between the header subsidiary and the line subsidiary

### Contracting

- Fixed an issue where, in some cases, attempting to delete a **Subcontractor Contract** showed the message **"Technical error happened"**, when it should show a clear message in this case: **"The contract cannot be deleted because it is linked to a Subcontractor Penalty Voucher"**

- Fixed an issue where, in some cases, the system calculated the cost in the Extract incorrectly

- **Subcontractor Extract window:** Fixed an issue where clicking the project item code showed nothing, when it should show the code, the item description, and the project item description

- Fixed an issue where, in some cases, the price could not be entered for items on the line in the **Subcontractor Contract** screen

- Fixed an issue where, in the **Subcontractor Extract**, adding a condition on the lines did not affect the total fields, such as the **Total Due Value** field

- Fixed an issue where, in the **Executive Contracting Budget**, editing any item on the line and pressing Save showed a message that the record could not be deleted

- **Project Contract, Subcontractor Contract:** Fixed an issue where, in the payments grid, if there was a value in the Paid Value field, that value was not copied to the Payment Voucher with **Based On**

- Fixed an issue where, when the option **"Do not copy existing payments"** was enabled on the term config, the program still copied the payments — it should not, while still taking into account where payments are consolidated when pressing the Consolidate Payments button, as well as showing installments when searching for them by installment code and selecting the payment

### Fixed Assets

- **Fixed Assets Depreciation Document:** Fixed an issue where selecting a record in the Depreciation Voucher term config did not show the journal entry correctly

- Fixed an issue where the tax amount did not appear in the **Partial Disposal Journal Entry Voucher**

- Fixed an issue where changing the status of the **Asset Stocktaking Voucher** to Final caused the system, on save, to change the status back to Draft

### Human Resources

- Fixed an issue where, in some cases, an error occurred when issuing a **Loan Voucher** for an employee while previous Loan Vouchers already existed for that employee

- Fixed an issue where, in some cases, an error appeared when saving a **Settlement Document**

- Fixed an issue where the system allowed issuing a **Start of Work Voucher** for a former employee who had resigned, without creating a new job offer for them

- Fixed an issue where the system did not allow saving the **Leave Voucher** when a leave type with 3 months of accrual was selected

- Fixed an issue where the **Employee Payroll Record** took a long time when reissuing a Salary Voucher containing a huge number of employees

- Fixed an issue where, in some cases, the Salary Voucher showed a number of non-working days different from the actual number of non-working days

### Manufacturing

- Fixed an issue where, when a **Raw Material Issue** was generated automatically from a **Production Execution Voucher**, the system did not honor the overdraft setting when it was disabled — because more than one Raw Material Issue voucher was created within the same fraction of a second, the overdraft restriction was not enforced

### Settings

- Fixed an issue with the following setup: an entity flow creates Installation Invoices together with Sales Invoices automatically, and another entity flow deletes the Installation Invoices when a certain condition is met; when a Sales Invoice is saved and is pending approval, the system creates the Installation Invoice, and once it is approved, another entity flow runs that changes some fields on the invoice, which causes the created Installation Invoice to be deleted. With this setup, the system saved the `Alias` table entries generated from the Installation Invoice and did not delete them when they were deleted by the third entity flow, even though it had deleted the Installation Invoice correctly

- **Permissions File:** Fixed an issue where, when using the option **"Edit only the records they created"** on the line, and the user had the Edit permission after saving, the user could not add a new record or document, and the error **"You cannot edit the record because you are not its creator"** appeared

- Fixed an issue where, while setting report inputs, the system did not treat required parameters (`Parameters`) as mandatory and allowed running the report without entering a value for the (`Parameter`); the required parameters should be enforced

- Fixed an issue where a report with a `required parameter` did not enforce it in the New GUI, while it worked correctly in the old one

- Fixed an issue where the **Subsidiary Account Statement** report was placed on the Payment Voucher via a screen edit, but running it showed **"No data"**, and only after going back to the inputs and running the report again did the data appear

- Fixed an issue where sending an approval on a document by email, with the approval form and the email template set inside the approval definition, sent 2 emails, when only 1 should be sent

### Hospital Management System

- **Final Invoice:** Fixed an issue where, when consolidating invoices, the system pulled in the prices of medical services (accommodation, medical supervision, etc.) on the consolidated invoices without taking into account the taxes and discounts specific to each service

- **Examination Invoice:** Fixed an issue where selecting any option (such as doctor, etc.) showed **"The operation could not be performed"**

- Fixed an issue where an Operations Invoice could only be created for a Form that had an Accommodation assignment, when it should be possible to create an Operations Invoice for a Form with no Accommodation or admission

- Fixed an issue where the system allowed creating Accommodation documents for a bed with a past date while another patient was already occupying that bed on that same date

### Real Estate

- Fixed an issue where, when creating a **Rent Contract** based on a **Rent Quotation**, the system did not copy the details on the quotation's second page (the Expense Items page) — it copied the expense type but not the value on the line against that expense type

- Fixed an issue where the tax value and the net value after tax were not copied from the line of Opening Rent Contracts and Rent Contracts to the **Rent Installment Accrual Journal Entry** screen, whether on creation or on editing

- Fixed an issue where, when creating a **Payment Voucher** and choosing **Based On a Subcontractor Penalty Voucher** and selecting the voucher number, the system copied the details correctly but at the same time showed the message **"The operation could not be performed"**

- Fixed an issue where the system calculated the after-tax value in the **Real Estate Expense Voucher**

### Mobile Applications

- Fixed an issue where, in the **Nama Orders** app, the item query did not work when tapping an item

- Fixed an issue where adding a warehouse on the settings screen and saving did not save it, leaving the field empty

- Fixed an issue where, on running the app for the first time and entering the settings then saving, the app closed and reopened automatically

- Fixed an issue where a selected customer could not be deleted

- Fixed an issue where all search lists that use `Paging` did not sort records by code

- Fixed an issue where scanning an item's barcode in the `item code` field added an empty line after every correct line, with no items

- Fixed an issue where connecting to a Nama Soft customer's server did not transfer the full customer or item data because of their large number

- Fixed an issue where printing from the app was not possible, showing `order formula was not found`

- Fixed an issue where pressing the Send button showed a connection error even though the send actually succeeded

- Fixed an issue where tapping an item inside the **Sales Order** and choosing `item price` did not show the item query result

- Fixed an issue where, in some cases, the New GUI did not work on mobile (an error message appeared)

- Fixed an issue where, in the Sales Orders app, loading the app against the database of one of Nama Soft's large customers, item and customer data could not be read because of their size — around 28,000 items and about 350,000 customers

- Fixed an issue where attempting to send a Sales Return Request through the `nama orders` app did not send

- Fixed an issue where tapping the signatures did not open the signature window

### New GUI

- Fixed an issue where approvals did not work from the Approvals list or from the Notifications list at the top of the page

### Point of Sale

- Fixed the last connection time on POS machines, which did not show the connection time correctly even though the connection and data transfer succeeded

- Fixed an issue where, on the **Report Definition** screen, selecting the option **"Used for Point of Sale"** did not send the report to the point of sale

### Reports

- Fixed an issue where, in report **SYSR-FNS003** (**Balance Sheet by Account**), unchecking the option to hide zero balances made accounts with zero movement appear at the beginning of the report instead of under their parent group

- Fixed an issue where, when working in the system in English and opening a report then clicking the link, the report opened from the (`Hyperlink`) opened in Arabic instead of taking the language from the first report

- Fixed an issue where the following reports caused errors when filtering by legal entity:
  - `SYSR-SLS021`, `SYSR-SLS022`, `SYSR-SLS023`, `SYSR-SLS024`
  - `SYSR-SLS025`, `SYSR-SLS026`, `SYSR-SLS027`, `SYSR-SLS028`
