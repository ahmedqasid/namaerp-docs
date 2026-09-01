# Nama ERP Release Notes - March 2021

::: info Release Information
**Release Number:** March 2021  
**Release Date:** March 2021  
**File Size:** 240.5KB  
:::

## Additions

### Inventory

* **Aggregation Voucher:** Added the following fields:
  * The field "**Aggregation method for withdrawn items**" to the aggregation line for withdrawn items
  * The option "**Calculate received items through the aggregation method for withdrawn items**" to the term config of the Aggregation Voucher

### Purchasing

* Added "**Service Expenses**" as an accounting effect (Debit, Credit) to the term config of each of `Purchase Invoice`, `Purchase Return`, and `Sales Return`
* Added the section "**Filter stock vouchers when aggregating by**", which contains the following options:
  * Filter by Sector
  * Filter by Branch
  * Filter by Department
  * Filter by Analytical Group
* A `Purchase Order` was created for 10 units of an item, then a `Stock Inspection Document` was created based on the purchase order with 9 units accepted and 1 unit rejected. Improved so that **the Executed Units show as 9, not 10**

### Sales

* Created a field in the `Item Discounts Lines` in the Offer window named "**Apply the offer once**"
* Added "**Service Expenses**" as an accounting effect (Debit, Credit) to the term config of `Sales Return`
* Added **5 boolean fields** to the lines of `Customer Order Shortages Voucher`, and they were not shown on the screen
* Improved so that both the contacts linked to the customer and the contacts not linked to any customer are shown, since some contacts are intermediary contacts that work with more than one customer
* Added the option "**Total quantities of the other lines for the same item (in the same invoice)**" to the field "How to consider the item's sales from other invoices" in the item discounts details, on the "Item Offers" page in the Offers window
* Added the option "**Calculate the quantity from the serial number as it is entered**" to all term configs of Supply Chain Management documents
* In the `Sales Invoice`, in the Serial Number field, it could be selected if it was a single number, but when more than one number was entered it could not be selected, and opening the magnifying-glass lookup did not allow selecting from it either. Improved so that **it can now be selected from the lookup**
* Added the option "**Do not check for a dated overdraft in reservation**" to the Supply Chain Management settings (`Supply Chain`)
* `Sales Order`: On the document inputs screen, in Quantity Tracking from the More menu, added the **Item field**
* Added the option "**Prevent Sale**" to the details of the "Customer Item Quantity Allocation" file, to make it possible to stop selling the item entirely

### Customer Relationship Management (CRM)

* Added the fields "**Warranty Start Date, Warranty Duration, Warranty End Date**" to each of `Maintenance Notice` and `Maintenance Order`
* In `Maintenance Contract`, added a new page named "**Visit Vouchers**", and also added the field "**Number of Executed Visits**" to the window header
* In `Maintenance Contract`, added the "**Visits**" grid
* On the `Maintenance Visit` screen, added the "**Discussions**" grid
* Added the fields "**Previous Meter Reading, Current Meter Reading, Previous Meter Reading Date, Current Meter Reading Date**" to each of `Machine`, and the lines of `Maintenance Order` and `Maintenance Visit`
* Added **5 attachments** to the `Competitor Company` document

### Accounting

* Improved so that fees are treated on the `Receipt Voucher` in a way similar to how fees are treated on the invoice
* `Payment Request`: Added "**Based On**" to the lines, so that more than one Based On document can be added, in the same way "Copied From" works in `Chain Supply` - for example, creating a payment request based on more than one payroll record
* To the term config of each of the documents "**Credit Note**" and "**Debit Note**", added the following:
  * Do not calculate Tax 1 in the invoice value
  * Do not calculate Tax 2 in the invoice value
  * Do not calculate Tax 3 in the invoice value
  * Do not calculate Tax 4 in the invoice value
  * Do not calculate Tax 5 in the invoice value
  * Do not calculate Tax 6 in the invoice value
  * Do not calculate Tax 7 in the invoice value
  * Do not calculate Tax 8 in the invoice value
  * Do not calculate the Discount in the invoice value
* Added the option "**Effects Accounting Regenerate**" to the More menu when using the shortcut `CTRL + ALT + X`, for documents that have an accounting effect
* Added the following options to the Accounts window:
  * Not used with the General Sector
  * Not used with the General Branch
  * Not used with the General Department
  * Not used with the General Analytical Group
* `Financial Papers Book`: Made it possible to enter a first number and a last number together with manual coding, and prevented saving the Financial Paper if it is outside the range of the first and last number

### Letters of Credit

* `Letter of Credit`: In some cases, the `Receipt Voucher` specific to the credit does not appear in the Statistics window, and the `Receipt Voucher` specific to the letter of credit might also not appear on the Cost Document

### Contracting

* Added the Payments grid to `Subcontractor Extract`, like the Payments grid found on the ordinary Extract screen, and it reads the payments found inside the `Subcontract`
* Added the document `Contracting Purchase Order`, which can be created based on `Project Contract`; the items are selected on the purchase order, and the terms specific to this contract are selected on the item lines, in order to know which term each item was purchased for
* Added the option "**Show the main terms in Execution**" to the Contracting settings
* `Executive and Estimated Budgets`: The fields **Dimensions, Count, and Deducted Quantity** on the terms are now calculated as they are entered
* `Extracts`: Improved so that, when grouping terms, the fields "**Count, Dimensions, and Quantity from Dimensions**" are copied from the contract
* Improved `Subcontractor Extract` in the Payments grid so that it shows the payments specific to the selected contract, and when a payment is selected, the system copies the payment's details onto the line
* Added the option "**Update the remaining amount on the contract, not on the extract, when creating a Receipt or Payment Voucher**" to the term config of both `Subcontractor Extract` and `Project Extract`
* Added the following fields to the lines of each of `Project Contract`, `Subcontract`, and the Estimated and Executive Budgets:
  * Additions to Terms
  * Deductions from Terms
  * Other for Terms
* Added the two buttons "**Group All Terms**" and "**Group All Terms Without Quantities**" to the `Project Extract` screen

### Service Center

* Added two fields to `Product` named (**Plate Letters - Plate Number**); after entering them, the system automatically combines them into the field **License Plate Number**
* Added the field "**Contact**" inside the Product window and in all Service Center documents, filtering on the customer's contact, and also updating the contact on the Product when it is changed on the vouchers
* Added the following buttons to the "**Close Job Order**" screen:
  * "Create the Customer Invoice"
  * "Create the Warranty Invoice"
  * "Create the Insurance Invoice"

### Real Estate

* Added the following fields to the table found on both the sale and lease contracts:
  * `DecimalDF n1,n2,n3`
  * `TextDF text1,text2,text3`
  * `GenericReference ref1,ref2,ref3`
* Improved so that deleting the `Lease Contract` or the `Opening Lease Contract` is prevented if it is linked to a Receipt or Payment Voucher (whether the link is through Based On in the header, or through the payment lines)
* Added **3 n fields** to the lines of the multiple-installment-creation data table in `Units Sale Price Offer`, `Preliminary Sale Contract`, and `Sale Contract`

### Customer Relationship Management (CRM)

* Added **2 date fields** and **2 description fields** to the answers table of the `Questionnaire` document
* Added an accounting term config to the `Maintenance Contract` document
* Added a new grid in the `Faults` file named **Solutions**, and also added the field "**Suggested Solution**" to the Faults table
* Added the page "**Status Changes**" to the `Maintenance Notice` window
* Improved so that the field **Task Description** on the "CRM Task" document accepts a large number of words, since it previously did not accept more than 255
* When creating a visits schedule on the `Maintenance Contract` screen (the Visits Schedule grid), the system refused to save without entering a Machine. This is now allowed, since a visit can be created to service all the machines on the contract

### Human Resources

* Added the following fields to the `Employee` screen, in the deduction percentages:
  * Maximum value for the total deduction
  * Maximum value for Deduction 1
  * Maximum value for Deduction 2
  * Maximum value for Deduction 3
  * Maximum value for Deduction 4
  * Maximum value for Deduction 5
  * Maximum value for Deduction 6
  * Maximum value for Deduction 7
  * Maximum value for Deduction 8
* Added the following fields to the lines of the voucher "**Aggregated Firing Request**":
  * 5 boolean fields
  * 5 number fields
  * 5 date fields
  * 5 description fields
* They are copied from the lines to the created voucher; also added **5 boolean fields** to the header of the "Firing Request" voucher, and the fields were not shown on the screen
* On the `System Indicator Approval` document, added the field "**Performance Indicator**" to the document header and lines
* Added the field "**Vacation Duration (excluding official holidays and weekends - depending on the vacation type)**" to the details of the `Aggregated Vacation Voucher` and `Aggregated Vacation Request` documents
* Added the option "**Flag the employee's last salary voucher before end of service if a Firing Document exists within the period**" to the term config of the Salary Voucher, in the term config of the "Payroll Record" voucher
* Added the option "**Prevent saving the Dues Liquidation Document if it is based on a Vacation Voucher whose type is not Annual**" to the Human Resources settings

### Hospital Management System

* Added two pages specific to Medical Supplies and Medical Services to each of the following windows:
  * Radiology Invoice
  * Lab Test Invoice
  * Services Invoice
  * Physical Therapy Invoice
  * Radiology Type
  * Lab Test Type
  * Physical Therapy Type
* The price is fetched from the price lists, with an option added for whether it affects the price or not (the price the customer will be charged), and it is linked to stock issue and warehouses, so that when the procedure is selected, the system explodes its own items or services exactly as in the Procedure Type and Procedures Invoice. Services were also added to `Blood Bank Invoice`, with the same price-effect option added

### Manufacturing

* Added **attachments** to the Resource Voucher
* Added the fields **Lot Number, Production Date, and Expiry Date** to the lines of the `Production Execution` document, to be copied from the `Production Order`; these fields are ignored on the document header
* Added **Fixed Asset Classification 1 through 5, and Group** to the lines of `Fixed Asset Purchase Document`

### Fixed Assets

* Created the lines of `Custodies Delivery Receipt Document` vouchers on the Statistics screen on the `Fixed Asset` and `Custody` documents
* Added the document "**Fixed Asset Offer**"
* Added `ref1, ref2` to the line in each of the two documents "**Fixed Asset Opening Document**" and "**Fixed Asset Purchase Document**"
* `Fixed Asset Purchase Order`: Added **Discounts 1 through 8, Tax 1 through 4, and the Net** to the lines, and added the Net and the Discounts to the price group
* On the Statistics screen, in the `Custodies Delivery Receipt Document` grid, added **Custody Responsible** From Employee, To Employee, and the voucher date

### Point of Sale

* `Point of Sale`: Added the ability to search for a customer by name, by their code, or by mobile number, in the search window for Point of Sale invoices, returns, and exchanges
* Added the option "**Hide in the Shifts screen**" to the `Payment Method` window
* Added the field **Shift Number** to the display columns and search options in the search table of the Invoices, Returns, Exchanges, Expenses, and Receipts screen

### Settings

* `Employee Agenda`: Added two **boolean** fields, two **text** fields, and two **description** fields to the lines
* From `utils`, on the `Users Current View` screen, added a Count column
* Added the ability to use `iFrame` in panels of type `HTML`
* Added the option "**Allow approvals for editing documents**" to Global Config
* Allowed changing the code of any file if the change is only a change in letter case - `Small or Capital`
* Added the option "**Allow manually editing the fee tax value**" to the "Payment Method" file
* Added the ability to use the employee code in documents even if the employee does not have the view permission linked to the employee
* Added the following two fields to the approval steps:
  * Send alerts, messages, and emails to the fields
  * Send emails to the addresses
* Added a new section named "**Auto Coding**" to the "Fields & Screens Settings" window, so that some settings can be entered, after which certain files or documents are coded automatically as soon as they are saved, according to this section's settings
* Added the "**Payment Vouchers**" grid to `Service Contract`
* Added the option "**Use payment vouchers in debt ages**" to the term config of `Service Contract`
* Added the following two fields to the Global Config window:
  * `sendPasswordByMailTemplate`
  * `sendPasswordBySMSTemplate`

### Mobile Applications

* Improved so that, when selecting the item, the system inserts its base unit, and filters the units to those specific to the item
* Added the app "**Order Nama**" to `Google Play`, and also improved the "**Receipts Vouchers App**" app
* Improved so that, when the user adds a personal photo of himself on the app, it is sent as an attachment on his own User record in Nama
* Standardized the image sizes (banners, items, and categories)
* Added the ability to download any `PDF` on the app; if the user is a guest, the download happens and notifications are shown for it
* Improved so that, when adding the item to Favorites or the Cart, the screen is not refreshed and scrolled back up
* Improved so that, when adding the item to the cart and confirming the order, the message "**Your order has been registered successfully and is being processed**" appears, after which the order screen opens showing the order's components and prices
* When opening the `My Orders` screen with all the orders present, added a button on the order with the words **Click for details**
* Added **Invoice Classification** to the app settings - added the invoice classification and a price dimension from 1 to 5
* Changed the title "New Registration" so that it is just "**Register**"; when clicked, the basic registration screen appears, containing the username and password entry as well as "New Registration", and the customer chooses: if they have a username and password they enter it, and if they are a new customer they choose New Registration

### Reports

* Added the option "**Store report inputs in the database on run**" to Global Config
* Added the option "**DB To Forms Log**" to both the report and Global Config
* Added the following two fields:
  * `reportDefinitionNotificationType=Report Definition Notification Type`
  * `reportDefinitionNotifications=Report Definition Notifications`
* When a report definition type is chosen, the user is asked what they want, and some default alerts are created in the alert template to help
* Added the column **Number of Print Times** + the printed record
* Modified the report `Sub-Account Statement 033ACC-SYSR`
* Modified the system print form of `Purchase Return`
* Modified the system report `027INV-SYSR`
* Modified the hyperlink in the attached system reports, report (`005ACC-SYSR`) and report (`006ACC-SYSR`), where the report that opened from the hyperlink used to come up with a "No data" message
* Added a filter by account classification to the report `General Ledger Trial Balance 005ACC-SYSR`

## Fixes

::: warning Bug Fixes
Many bugs were fixed in this release to improve performance and stability
:::

### Inventory

* Fixed an issue where, when creating a `Quality Inspection Document` and adding a `Quality Inspection Request` and saving, the system did not accept it, and the message "**You must enter the accepted or rejected quantity**" appeared
* Fixed an issue where, when creating a `Quality Inspection Document`, the document could not be saved, and the message "**Could not perform the operation**" appeared
* Fixed an issue where, on the `Aggregation Voucher` screen, in the Received Items table, when typing in the Code field, the message "**Cannot perform the operation**" appeared the first time, and the item was not automatically searched for afterward
* Fixed an issue where, when doing a `Lot Grouping` on the `Issue Voucher`, the error "**Cannot perform the operation**" appeared
* Fixed an issue where, if a Stocktaking was done on a location and a warehouse that has no locations, at the same start of the Stocktaking, an error occurred
* `Additional Receipt Cost Voucher`: Fixed an issue where, in some cases, on manual distribution, the system gave an error message that the expense item was not distributed correctly

### Purchasing

* Added the option "**Do not match lines with the purchase requests' lines**" to the term config of the `Aggregated Purchase Request` document

### Sales

* Offers screen - "**Item Discounts**" table: There is a problem with the option "**Stop other discounts of the same type**", as follows:
  * When used on the second offer for Discount 1, Discount 1 does not stop and includes all the discounts for Discount 1
  * When used on the first and second offer for Discount 2, and the second offer for Discount 1, Discount 1 stops for the first offer that comes before the stop, but Discount 2 does not stop and includes all the Discount 2 items; what stopped Discount 1 was checking Discount 2, not Discount 1
* Fixed an issue where a `Sales Order` was issued, then an `Issue Request` was created for it from the `Sales Order` for the full quantity of 180, with quantity tracking in place; after that, a receipt was created for the same item based on the same `Sales Order` for a quantity of 16, tracked in the same quantity, which caused the 16 units to be subtracted from the executed quantity. Then an `Issue Request` for a quantity of 10 was issued, and when re-saving the earlier receipt again, an error appeared saying the quantity was not sufficient

### Accounting

* Fixed an issue where, when creating installments inside the `Sales Invoice`, the error "**Cannot perform the operation**" appeared
* Fixed an issue where, when clicking `Create Payment Voucher` from within `Payment Request`, the error "**Cannot perform the operation**" appeared
* Fixed an issue where, when creating a `Sales Invoice` and adding the item and quantity on the first line, then moving down to the second line and adding the item, then adding the quantity, the error "**Cannot perform the operation**" appeared
* Fixed an issue where, on the `Credit Note` screen, when creating a credit note for a vendor and grouping invoices from a date to a date, the Invoice Value field showed the net amount after the reduction present on the invoice
* Fixed an issue where the system, on the `Account Group` window, allowed the group's source to be the group itself

### Document Management (DMS)

* Fixed an issue where, when coding a new document folder and choosing a document subject inside it, then creating an archive document and choosing the folder, the system did not copy the subject found inside that folder into the archive document window
* Fixed an issue where, when the option "**Save attachments outside the database**" was enabled, and two documents with attachments were saved at the same moment, an error sometimes occurred and each document's attachment appeared on the other document

### Real Estate

* Fixed an issue where the `Rent Accrual Entry` document, automatically issued from the `Lease Contract` or the `Opening Lease Contract`, did not correctly copy the data from the field (`type`) and (`toDate.details`) to the `Rent Recognition Entry` document
* `Maintenance Expense` document: Fixed an issue where, when selecting a term on the line that includes a tax, the system did not calculate the tax value after entering the amount in the Value field on the line
* Fixed an issue where the entries resulting from the `Installment Accrual Recognition Entries` document were issued incorrectly
* Fixed an issue where, when clicking the `End Lease Contract` button from within the `Opening Lease Contract` or `Lease Contract` screen, the system did not copy the Unit, the Building, and the Aggregated Unit

### Contracting

* Fixed an issue where the `Rent Accrual Entry` document, automatically issued from the `Lease Contract` or the `Opening Lease Contract`, did not correctly copy the data from the field (`type`) and (`toDate.details`) to the `Rent Recognition Entry` document
* Added the field "**Term Status**" to the lines of each of `Contracting Assay` and `Estimated Budget`
* Fixed an issue where, when creating a `Project Contract` and choosing `Contracting Assay` as the source, the system did not pull the Assay quantity found in the terms into the `Project Contract`, even though the field was filled in on the Assay

### Human Resources

* Fixed an issue where, when adjusting an employee's balance in the `Vacation Balance Adjustment Voucher` (reducing the number of the employee's vacation days in the Adjusted Balance field), the system added the days to the current balance instead of deducting them
* Fixed an issue where, in the `Vacation Balance Adjustment Voucher`, when adjusting the balance, it was only adjusted on the day found in the Start Date field, ignoring the entire payroll period
* Fixed an issue where, when creating an `Attendance and Departure` document across several months, the system did not pull the data of employees with the status "**Suspended from Work**", even though the employee might already have attendance and departure data recorded for the queried period

### Customer Relationship Management (CRM)

* Fixed an issue where, when creating a `Maintenance Contract` for one of the machines, the Warranty Start Date and Warranty End Date on the machine were not updated
* Fixed an issue where, inside `Maintenance Contract`, when entering spare parts and services, the system did not track what had been executed or issued of spare parts or services in the `Sales Invoices`, in the fields designated for that (Quantity - Sold - Remaining)
* Fixed an issue where, on the `Maintenance Contract` screen, in the `MnContractService` table, when selecting a service that is not linked to an item, the service price available in the `MnMaintenanceService` table, in the `price` field, was not fetched
* Fixed an issue where, on the `Maintenance Contract` screen - the `Visits Schedule` grid, when searching for a machine, all the machines added to Nama were shown, whereas only the machines found on the maintenance contract should appear in the Machines grid
* Fixed an issue where, in some cases, when running Quick Help on the `Maintenance Notice` document, on a spare-part field, the results were not shown

### Fixed Assets

* Fixed an issue where the error "**Could not perform the action**" occurred when creating the `Custody Transfer` document
* Fixed an issue where the `Custodies Delivery Receipt Document` did not affect the Custody Responsible field

### Settings

* Fixed an issue where, in some cases, arithmetic operations inside fields did not work correctly
* Fixed an issue where, in some cases, the dashboard did not display correctly
* Fixed an issue where, when a document was rejected, its status changed to Fixed instead of Rejected
* Fixed the following issues that occurred when the option "**Allow approval for editing documents**" was enabled in Global Config:
  * When changing the payment method on the Sales Invoice to another payment method with different fees, the amount was changed in the window, but after saving it reverted to the old amount before the change - although the journal entry was issued correctly
  * When editing discounts on Sales and Purchasing documents, the amount was changed in the window, but after saving it reverted to the old amount before the change
* Fixed an issue where, on any screen, in the More menu, when using the action "**Edit Permissions**" (the edit permission), it was mistakenly copied from (the usage permission)

### Point of Sale

* Fixed an issue where, when creating a `Payment Voucher` in `Point of Sale`, the Subsidiary was not transferred to Nama, causing the document to be transferred as a draft and never saved as final
* Fixed an issue where, when choosing to change sizes from Help and changing (the grid cell font size), all the fields changed except the Item Name
* Fixed an issue where, in some cases, the `Point of Sale Receipts Voucher` could not be saved in Nama
* Fixed an issue where, if the invoice value was less than 1 riyal, for example 0.99, when manually typing the amount in any of the payment methods, the system wrote the amount without taking the (,) character into account, i.e. it wrote 99
* Fixed an issue where offers do not work with `Point of Sale`, so (discount percentages) inside the Employee screen were used instead, but the option (maximum percentage for the total discount) does not work with the invoice discount

### Mobile Applications

* Fixed an issue where the device code and the sales order number on the device were not copied to the `Sales Order` in Nama, when using the `Sales Orders` app
* Fixed an issue in the fingerprint app for `IOS` operating systems
* Fixed the following issues in the `Nama Orders` app:
  * The storage location was not handled correctly, and sending failed because of it
  * When showing the storage location and an item is on two lines, the buttons at the bottom disappear, and only a tiny part of them remains, as in Attachment 1
* Fixed an issue where advertising banners did not appear when changed at the same time
