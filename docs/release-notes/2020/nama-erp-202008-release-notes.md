# Nama ERP Release Notes - August 2020

::: info August 2020 Release
**Release Date:** August 2020  
**Release Number:** 202008
:::

## Additions

### Inventory

- Modified the entity flow for automatically generating a serial number for items, `EAAutoSerialNumberCalculator`; a prefix or a `tempo` can now be entered, but the `tempo` only applies to fields found inside the item

- Created the following entity flow, `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoCreateSCDocSerial`, to create a system table `SCDocSerial` for generating serial numbers individually

- Added a new field to the table, `actualDeliveryDate`, to know the time between creating the invoice and delivering it to the customer, in order to measure the warehouses' delivery efficiency and customer waiting time

### Sales

- Added 10 fields (`text`, `ref`) to each of the following files:
  - **Customer Category 1**
  - **Customer Category 2**
  - **Customer Category 3**
  - **Customer Category 4**
  - **Customer Category 5**

- Added the option **"Search Serial Numbers When Entering an Item Code in Distribution Documents"** to Distribution Management settings

### Purchasing

- Added `attachment3`, `attachment4` and `attachment5` to each of the following documents:
  - **Purchase RFQs**
  - **Purchase Quotations**
  - **Purchase Invoices**

### Accounting

- Added the following fields to both the Debit Note and Credit Note documents:
  - **Cost Type** (on the document and the term config)
  - **Contract**
  - **Clause Code**

- Developed a Groovy entity flow for the Miscellaneous Invoice so that, if the user sets the option `details.b1` to `True` on one of the lines and there is a custom `Ref` for adding the vendor on the line, the system sets the value to `True` on all lines with the same vendor

- In **Payment Methods**, created a new grid for fee taxes, as follows:
  - **From Date**
  - **To Date**
  - **Fee Tax Rate**

- **Receipt and Payment Vouchers:** Added an accounting-effect side named **"Fee Value (For the Source of Dimensions and References Only)"** to the document's term config, to specify the source of dimensions and references for calculating fees on payment methods

- In **Payment Methods - Fee Tiers table**, added the **Maximum Fee**, since with some banks, depending on the agreement with the bank, the fee percentage of the amount is agreed on, but with a maximum fee cap

- Added the option **"Treat Bills of Exchange Like Cheques in Portfolios and Similar"** to allow creating a notice for a commercial paper of type "Bill of Exchange"

### Accounting

- Added a field to the **Financial Paper** named **"Endorsee"**; when a payment voucher is created against a receipt paper and it is then received, the subsidiary the paper was paid to is added to the Endorsee field inside the paper

### Project Management

- In both the **"Expense Request"** and **"Expense Voucher"** documents, added a subsidiary to the document, and the Employee field is no longer required

### Human Resources

- Created a mechanism so that a payroll record does not consume the server's resources and block other users, as follows:
  - Each Payroll Voucher is now issued in a separate `Transaction`, so the size of the `Transactions` does not become large and block other users
  - Issuing more than one payroll record at the same time (or even the same record) is now rejected. In other words, if the user clicks Issue Payroll for voucher 1, and before voucher 2 finishes opening clicks Issue Payroll, the request is rejected until the first payroll issuance finishes, after which the user can issue record 2

- Prevented the actual date from differing from the appointment date on a **Job Assignment** when the option **"Reappointment"** is selected

- Prevented saving an **"Employee Data Update"** document together with another **"Employee Data Update"** for the same employee on the same actual date, and also together with a **Job Assignment** if the date is for the same employee on the same actual date

- Prevented saving a **Job Assignment** together with another **Job Assignment** for the same employee on the same actual date, and also together with an **Employee Data Update** if the date is for the same employee on the same actual date

- Added the following two fields to both the **"Leave Liquidation"** and **"End-of-Service Liquidation"** windows:
  - **Total Annual Leaves** (added manually to the working days)
  - **Total Other Leaves** (added manually to the working days)
  
  The label "Deducted Manually" was also changed to "Deducted Manually from Working Days"

- Added the following two fields to the Service Allowance Months Entitlement details:
  - **Number of Days per Year**
  - **Number of Days in the Year**

- **Receipt and Payment Vouchers:** Added an accounting-effect side named **"Fee Value (For the Source of Dimensions and References Only)"** to the document's term config, to specify the source of dimensions and references for calculating fees on payment methods

- On the lines of both the **Leave Liquidation Components** and the **End-of-Service Liquidation Components** in the **Dues Liquidation** document, added the following two fields:
  - **Factor**
  - **Final Result:** made up of two parts (Addition | Deduction)
  
  So that the final result (the addition or the deduction) = (the addition or the deduction) × the factor

- Improved the **Bulk Leave Voucher** for more than one employee, so that the Based-On field on the created Leave Voucher is filled with the code of the bulk voucher

- On the lines of the **"Bulk Reward / Penalty Voucher"** document, added the following:
  - 3 `ref.details` fields
  - 3 `n.details` fields

- **Bulk Advance Voucher:** Made the following improvements:
  - The currency is now copied to the lines from the header
  - The user is no longer required to enter the currency on the header if it exists on the lines

### Contracting

- Created a new document named **"Purchase Request"**, specific to Contracting

- Created a new document named **"Customer Item Submittal"**

- Added the option **"Show the Item and the Customer Item Submittal in the Contract and the Estimated and Executive Budget"** to Contracting settings, to show the `Submittal` reference and the item on the clause lines of the Executive and Estimated Budgets and the project contracts

- Added the option **"Create a Customer Item Submittal Voucher for Every Line with an Item"** to Contracting settings, to create customer submittals for materials for every line with an item in the Executive Budget

- Added a term config and a book for the created Submittal Voucher, in Contracting settings

- Added the following two options to the **"Budget Item Requests"** term config:
  - **"Do Not Exceed the Quantity Approved by the Customer"**
  - **"Do Not Exceed the Price Agreed with the Customer"**
  
  To track the quantity and the price on the Budget Item Requests

- **Customer Item Submittal window:** Improved the window so that, as soon as the quantity is approved, the system copies this quantity into the **"Quantity Approved by the Customer"** field, and likewise, as soon as the price is approved, the system copies this price into the **"Price Agreed with the Customer"** field

- Improved **"Budget Item Requests"** so that the system does the following:
  - On the **"Customer Item Submittal"** field, the system shows only the submittals in which the quantity and price were approved on the **"Customer Item Submittal"** window
  - The system shows the quantity approved by the customer, and also the price approved by the customer, for each item

### Fixed Assets

- Added a term config for the **Asset Opening Voucher**, and added the field **"Make the Last Depreciation Date on the Listed Assets the End Date of the Period Selected on the Voucher"** to the term config

- On the lines of both the **Leave Liquidation Components** and the **End-of-Service Liquidation Components** in the **Dues Liquidation** document, added the following two fields:
  - **Factor**
  - **Final Result:** made up of two parts (Addition | Deduction)
  
  So that the final result (the addition or the deduction) = (the addition or the deduction) × the factor

- Improved the **Bulk Leave Voucher** for more than one employee, so that the Based-On field on the created Leave Voucher is filled with the code of the bulk voucher

- On the lines of the **"Bulk Reward / Penalty Voucher"** document, added the following:
  - 3 `ref.details` fields
  - 3 `n.details` fields

- **Bulk Advance Voucher:** Made the following improvements:
  - The currency is now copied to the lines from the header
  - The user is no longer required to enter the currency on the header if it exists on the lines

### Manufacturing

- Added an option to allow editing the quantity after starting execution of the Production Order

### Real Estate

- Added the option **"Consider the Amount When Copying Installments from the Installment Document or Based-On"** to the Receipt and Payment Vouchers term config

- Added the following options to the **Rent Contract** term config, for creating the **"Accrual Entry for the Created Rent Installment"**:
  - **"Accrual Entry Period Type for Installments"**
  - **"Book for the Accrual Entry of the Created Rent Installment"**
  - **"Term Config for the Accrual Entry of the Created Rent Installment"**
  - **"Automatically Create an Accrual Entry for a Rent Installment"**
  - **"Save the Accrual Entry of the Created Rent Installment as a Draft"**

- Added the accrual entries to the related records

- Entries are no longer created for fully paid lines, on the Opening Rent Contract only

- Added the field **"Return Value"** to the line of the **Deal Agreement Invoice**

- Added the following two options to the Rent Contract term config:
  - **"Recreate the Entries When Deleting the Contract Ending"**
  - **"Delete Draft Entries When Creating the Contract Ending"**

- **Real Estate Investment Unit screen:** Added Opening Rent Contracts to the details page (related records)

- The **"Rent Offer"** voucher is now used for reservations, and the field **"Reservation Status (Reserved, Not Reserved)"** was added to it. When the status "Reserved" is selected, it works as a reservation document, and when "Not Reserved" is selected, it works as an offer

- Added the two fields (**Reserved for Rent**, **Rent Reservation Voucher**) to each of **"Unit, Floor, Building, and Combined Unit"**

- Added the field **"Next Rent Contract"** to both **"Rent Contract"** and **"Opening Rent Contract"**

### Banks

- Added 5 attachments inside the Bank Account

### Customer Relationship Management (CRM)

- Added 5 `ref` and 5 `descriptions` fields on the lines of the Notes in the following documents:
  - **Visit Request**
  - **Visit**

### Service Center

- Added the field **"Service Contract"** to the **Vehicle file**; it is copied to the product when a service contract is created on it, taking the service contract date into account - meaning the contract is copied to the product only if it is the latest contract

- Added the field **"Service Contract Status"** to the Vehicle file, copied from the status of the Service Contract document

- Added the field for the Service Contract and its status to the **Job Order**, updated automatically when the vehicle is selected and on save

- Added a new voucher, **"Change Service Contract Status,"** containing the contract and the status; the status on the contract is changed according to the status found on the latest status-change voucher (by date)

### Hospital Management System

- Added the Medical Classifications to each of the following documents:
  - **Outpatient Clinic Booking document**
  - **Operations Booking document**
  - **Surgery Approval Voucher**

### Fixed Assets

- Added the option **"Allow Creating a Partial Disposal Voucher for an Asset Even Though the Depreciation Voucher for Previous Months Has Not Been Created"** to the Partial Disposal Voucher term config

### Point of Sale

- Added the option **"Disable Shortcuts"** to the Point of Sale permissions file

### Settings

- Made the task that empties the `Temp` folder run by default in the system, so it does not take up a large size

- Improved the confirmation template for the Approval Definition so that a dynamic expression can be entered, similar to alerts - i.e., entering an expression for it in the `Tempo` language

- Added support for running more than one Tomcat on the same database, so there is more than one server it can run on - and if one of them goes down, the next one works without problems

- Added `Cancel Task` and `Retry Task` to `End Stock Taking Tasks`

- Sometimes the same document is saved by 2 users at the same moment - this sometimes causes lines to be duplicated. A `lockVersion` field was therefore added to all system tables (files and documents) to track concurrent edits and try to prevent them

- Added the ability to enter text longer than 255 characters in the field (Select the Field List) inside the **"Add Files Export / Import List"** screen, so that a `json` file for a sales order can be exported with fields from the customer, with all the details

- Made an improvement in the system that reduces the time the system takes to make sure voucher codes are not duplicated; this reduced the time it takes to save vouchers and made working on the system smoother

- Added the option **"Ignore Usage Permissions When Approving"** to the Approval Definition

- Added the following fields to **Global Config**:
  - `Attachment Shared Folder Drive Letter`
  - `Attachment Shared Folder User Name`
  - `Attachment Shared Folder User Password`
  - `Attachment Shared Folder URL`

### Mobile Applications

- Created a shopping app for products found in Nama, to place orders with them

- Made the following changes:
  - Created a book (code prefix) and a starting number in the device settings, following the same approach as the Collection app
  - Changed the label "Item" to "Customer" on the customer-search screen when creating a new document
  - Changed the app name shown in the app's settings menu to `Sales Order` instead of `Stocktaking`
  - Added the ability to specify a default warehouse
  - Placed an icon next to each item on the line to open a popup window with an item inquiry, following the same approach as Nama's own warehouse system
  - Placed a criterion for the items transferred to the app, following the same approach as the customer criterion
  - Changed the type of the document created in Nama so it is moved from the settings header to the details lines

- Completed moving settings into the details (Save as Draft, item- and customer-receiving criteria)

- Improved the inquiry icon so that the system calls the inquiry as soon as the item code is clicked, and the icon was therefore removed to save space

- Included the inquiry used on the device lines so it can be edited

- Included the item's default unit, or the unit whose barcode was scanned, automatically in the document on the app

### Reports

- Added the report **SYSR-SLS033** named **"Sales Profitability - With the Ability to Group by Periods and Dimensions"**

### New GUI

- Improved so that the company name is shown on the system login screen; the company found in the system settings is shown, so it displays (Login to "`<Customer Company Name>`") instead of just "Login"

## Fixes

### Inventory

- Fixed an issue where, in the latest release, when creating an Assembly Voucher with no quantity for the items inside the assembly operation, the message **"Cannot Execute the Operation"** appeared instead of the message **"The Available Quantity of the Item Is Not Enough"**

- Fixed an issue where, in some cases, when the status of a Stock Issue Request was changed from In Progress to Ended manually, on save it reverted to In Progress

- Fixed an issue where, when issuing a Stock Count Ending document and then issuing a Stock Transfer document with the same date as the Stock Count Ending document, an error message appeared

- Fixed an issue where an error sometimes occurred when making a duplicate of an item

- Fixed an issue where, in the Items window, filtering by item department and selecting the items within the item department to export to Excel showed the message **"Succeeded: Cannot Execute the Operation"**, while selecting the items and choosing to ignore attachments before exporting produced the file correctly with no error message

- Fixed an issue where, in some cases, when adding a new item or making a duplicate, the message **"Could Not Execute the Operation"** appeared

### Sales

- Fixed an issue where, in some cases, the system did not bring in the item price correctly

### Accounting

- Fixed an issue where, when using multiple payment with multiple payment methods, the total of the payment methods was not summed into the total debit, which remained empty

- Fixed an issue where, in some cases, when checking the option **"Do Not Change the Account Nature"** and the account's nature is debit, the system changed its balance to credit

- **Receipt and Payment Vouchers:** Added the option **"Prevent Updating the Amount When Selecting Based-On and Keep the Existing Value"** to the document's term config

- Fixed the issue in Receipt and Payment Vouchers with calculating fees

### Banks

- **Update Letter of Guarantee document:** Fixed an issue so that the tax value is now calculated from the amendment fees field

### Human Resources

- Fixed an issue where, in some cases, the system did not calculate employee lateness correctly

- Fixed an issue where, when creating a Reward or Penalty Voucher and selecting a Cash term config (i.e., paid out manually, separate from the Payroll Voucher), the Reward Voucher still appeared on the Payroll Voucher and affected the salary by the same value

- Fixed an issue where creating a new Job Assignment for an employee who already had an End-of-Service Voucher created produced errors as a result

- Fixed an issue where an error sometimes occurred when making a duplicate of an employee

- Improved the **"Manual Indicator Values"** document so that, when grouping employees, the system shows only employees with the status **"Currently Employed"**

- Fixed an issue where, in some cases, the payroll record could not be issued

- **Bulk Advance Voucher:** Fixed an issue where, when saving a Bulk Advance Voucher, the error message **"The Amount Cannot Be Left Empty"** appeared even though the amount was already entered

- **Employee Data Update voucher:** Fixed an issue where saving was only allowed the first time, and editing a voucher that had already been saved showed an error message

- Fixed an issue where, when creating a Bulk Leave Voucher for more than one employee, a leave could not be created for the same employee on two lines with different leave dates - that is, the system did not allow repeating the same employee on the lines, even though the leave durations did not overlap

- Fixed an issue where, when creating an Employee Data Update, the salary items were copied from the Job Assignment and not the items according to one of the updates

- **Leave Liquidation document:** Fixed an issue where the leave allowance value was not calculated at all when a Leave Balances file exists on the Leave Type file, even though, when the Leave Balances file is removed from the Leave Type file and the number of allocated leave days is entered on the Job Assignment instead, the leave allowance is calculated normally in the liquidation document

### Settings

- Fixed an issue where, when granting the View permission via search without the List-Browsing permission, search-as-you-type did not work

### Hospital Management System

- Fixed an issue where, on the **Patient Health Status** document, when trying to save, the system showed the message (The Document's Term Config Cannot Be Left Empty), even though there is no term config field on it at all

### Real Estate

- Fixed an issue where, on the Opening Rent Contract screen, clicking the **"Extend Rent Contract"** button created a new Opening Rent Contract, which was wrong; the correct behavior is that extending creates a new Rent Contract

- Fixed an issue where, applying the following scenario:
  - Creating an Opening Rent Contract
  - Creating a Collection Voucher for the first installment
  - Deleting the Collection Voucher
  
  then, when creating a Collection Voucher and clicking the Installment Code field to select the installment, the system did not show **"First Installment"** among the available options

- Fixed an issue where, on saving the Opening Rent Contract, the system created accrual entries for the unpaid lines, but when other amounts were re-entered after saving, the system did not delete those entries

- Fixed an issue where the system sometimes refused to save an Opening Rent Contract, for example when the contract period is from 31-08-2019 to 30-08-2020

- Fixed an issue where, when creating an Ending based on a Rent Contract or an Opening Contract, the system did not copy the insurance value; the same problem also occurred when the Ending was created from within the contract screens via the button

- Fixed an issue where, when creating a Rent Contract or an Opening Rent Contract with a contract date from 31-08-2020 to 30-08-2021, the following occurred:
  - The contract period showed as 13 months instead of 12 months
  - If the rent type was monthly, the system, when creating the installments, issued 13 installments instead of 12, with the wrong due date for these installments
  - If the rent type was semi-annual, the system, when creating the installments, issued 3 installments instead of 2, with the wrong due date for those installments

- Fixed an issue where, when saving a Receipt Voucher based on a Rent Contract, an error appeared saying the installments were not equal, even though they were correct

- Fixed an issue where, in the Opening Rent Contract term config, when choosing to create draft accrual entries, the system did not link the hyperlink of the created draft document on the installment line in the contract screen; it only appeared on the installment line after the entry was saved and became final

- Fixed an issue where the system allowed creating more than one Rent Contract or Opening Rent Contract for the same unit at the same time, regardless of the unit's status; the correct behavior is that rented units should not appear when searching for them in the **"Rented Property"** field

- Fixed an issue where, in some cases, a Rent Contract could not be extended

- Fixed an issue where, after installing a certain release, creating a Receipt Voucher based on a Rent Contract, the system did not copy any details and the message **"Cannot Execute the Operation"** appeared

- Fixed an issue where, when saving a draft Rent Installment Accrual Entry, the message (The Unit Is Already Rented) appeared

- Fixed an issue where a contract that had been created and turned out to have an error could not be deleted: deleting the contract showed the message **"The Record Cannot Be Deleted Since It Is Used in the Sale Contract Field in the Real Estate Investment Unit Table"**

- Fixed an issue where extending a contract that still has a remaining amount showed the error **"Cannot Execute the Operation"** on the new contract

- Fixed an issue where the Medical Insurance Company field was not shown on the price-list lines, causing pricing errors; it has now been shown

### Manufacturing

- Fixed an issue where an error occurred when saving a Production Order Execution based on a Bulk Production Order

### New GUI

- Fixed an issue where severe slowness occurred when opening more than one `tab` - for example, opening several **"Report Definition"** files

- Fixed an issue where locking the Code or Item field on the Sales Invoice lines made it disappear from the screen

- Fixed an issue where slowness was noticed in the new interface while opening screens or while typing a number or text into a field, with the page-loading indicator appearing

- Fixed an issue where clicking Add New on the Opening Rent Contract screen and then clicking the navigation arrows for the next page showed the error **"Cannot Execute the Operation"**, while the same steps worked fine in the old GUI; the same error occurred on the Rent Contract window

- Fixed an issue where, on the Opening Rent Contract screen, selecting a unit copied its details correctly, but changing the unit and selecting another one did not copy the new details

- Fixed an issue where, very often, when an error message appeared on any screen, it stayed fixed and did not disappear automatically, unlike the old GUI

- Fixed an issue where, on the **Journal Entry** screen, clicking the first column for viewing the entry made the system show the message `Entity Type is not provided`, while it worked fine in the old GUI

### Mobile Applications

- Fixed an issue where data was not transferred correctly when using certain detail settings

- Fixed an issue where, in some cases, the document-code settings did not work correctly

- Fixed an issue where the mobile app did not show approvals, following one of the updates

### Reports

- Fixed an issue where, when running the report **"Item Sales Details Filtered by Customer and Item"** and clicking From Item, the error **"Could Not Execute the Operation"** appeared

- Fixed an issue where the hyperlink for the end-of-period balance in report **SYSR-ACC044**, **"General Ledger Trial Balance Including Subsidiary Balances,"** showed no data when clicked, even though a balance exists in the account

- Added the report **SYSR-FNS009**, **"Income Statement by Account - With Grouping by Dimensions,"** to the system reports

- Fixed an issue where the system did not support the doctor's and the patient's subsidiary account in each of the following reports:
  - **SYSR-ACC002** **"General Account Statement - In Local and Foreign Currencies"**
  - **SYSR-ACC003** **"Sub-Account Statement - In Local and Foreign Currencies"**
  - **SYSR-ACC029** **"General Account Statement"**
  - **SYSR-ACC030** **"General Account Statement in the Account's Currency"**
  - **SYSR-ACC031** **"Subsidiary Account Statement"**
  - **SYSR-ACC032** **"Subsidiary Account Statement in the Account's Currency"**
