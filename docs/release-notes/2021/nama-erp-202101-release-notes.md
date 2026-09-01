# Nama ERP Release Notes - January 2021

::: info Release Information
**Release Date:** January 2021  
**Release Number:** Nama-ERP-202101  
**Release Type:** Improvements and New Additions
:::

## Additions

### Inventory

#### Item Window - Units Grid

- Added the two fields (`text1` & `text2`)

#### Chain Supply Settings

- Added the option **"Convert the dimensions quantity according to the transaction unit's conversion factor into the base unit"** to the `chain supply` settings

#### Chain Supply Document Term Configs

Added the following two options to the term configs of `chain supply` documents:
- Explode lines for item editions
- Explode lines for item sizes and colors

#### Other Improvements

- Added the option **"Fill in the item's data in the line when adding this item from the document found in Based On"** to the term config of Supply Chain Management documents

#### New Entity Flow

Added the entity flow `EAPreventQtyMoreThan` to set a maximum for an item's movement quantity in a document, with the ability to specify which documents it works on, so that the system prevents entering a quantity greater than the one available within a single document, taking the unit into account. For example, if the maximum quantity for an item is set to 10, and it works on (`Stock Transfer`), then when the item is added and a quantity greater than the set number is entered, such as 100, the system prevents saving the document

#### Supply Chain Management Improvements

- Added the option **"Suggest quantities per storage location or warehouse"** to the Supply Chain Management settings (`Supply Chain`)
- Improved the Sales Invoice so that, after the Code field, the cursor moves to the Quantity field instead of the **"Item Name"** field

#### The Long Description Field

- Added the field `"remark2"`, like the field `"remark"`, in the Item window, to be used for entering the long description (`Rich Text`)

### Purchasing

#### Cost Settings in Term Configs

Added the following options to the term config of Purchasing documents:
- **"Do not add Tax 1 to the cost"**
- **"Do not add Tax 2 to the cost"**
- **"Do not add Tax 3 to the cost"**
- **"Do not add Tax 4 to the cost"**
- **"Do not calculate Discount 1 for the cost"**
- **"Do not calculate Discount 2 for the cost"**
- **"Do not calculate Discount 3 for the cost"**
- **"Do not calculate Discount 4 for the cost"**
- **"Do not calculate Discount 5 for the cost"**
- **"Do not calculate Discount 6 for the cost"**
- **"Do not calculate Discount 7 for the cost"**
- **"Do not calculate Discount 8 for the cost"**
- **"Do not calculate the reduction for the cost"**

#### Vendor Attachments

- Added **6 additional attachments** to the Vendor on top of the existing ones, bringing the total to **10**

### Sales

#### New Document - Customer Item Quantity Allocation

Created a new voucher named **"Customer Item Quantity Allocation"**, for setting a specific quantity of an item that a user is allowed to take within a specified period

#### Removing the Journal Entry Document Type

- Removed the Journal Entry document type from the payment vouchers table inside Sales and Purchase documents

#### Customer Order Shortages Document

- Created a new document named **"Customer Order Shortages Voucher"**
- Added an option in Sales documents to add one of the document's lines to the **"Customer Order Shortages"** document

#### Improving Error Messages

Improved the error message for not specifying a quantity on one of the sales items so that it includes the line number, and the line is also shown in red

### Accounting

#### The Electronic Receipt Voucher

- Added the field **"Cheque Due Date"** to the `Electronic Receipt Voucher`
- Added the option **"Create a Financial Paper"** to the term config of `Electronic Receipt Voucher`
- Added an accounting effect (`Debit`, `Credit`) to the term config of `Electronic Receipt Voucher`
- Added a field specific to the Book to the term config of `Electronic Receipt Voucher`, to automatically create a Financial Paper when saving a document that belongs to this term config
- Added the field **"Financial Paper"** to the `Electronic Receipt Voucher`, so that the automatically created paper is inserted into it when the document is saved

#### Copying Data from the Electronic Receipt

When creating a `Receipt Voucher` based on an `Electronic Receipt Voucher`, the fields are now copied: (`Amount`, `Related Subsidiary`, `Financial Paper`, ...)

#### Financial Statement Settings

- Added the two buttons **"Create the Income Statement file and its group"** and **"Create the Balance Sheet settings file and its group"** to the `Financial Statement Settings` window

#### Cheques & Financial Papers Improvements

- Improved so that, when creating a cheque from within `Electronic Receipt`, the cheque is Incoming, the same as is already the case when creating a Financial Paper from a `Receipt Voucher`

#### The Electronic Receipt App

- **The Electronic Receipt App**: Added `Bank Account` to the document - and added a table to the Collection App settings for specifying the names of the bank accounts that will appear in the app

#### Payment Method

- Added the option **"Allow a fixed fee value in addition to a fee percentage"** to the `Payment Method` window

#### Calculating the Invoices' Value

- Added the field **"Calculate the invoice amounts' value from the invoice percentage when grouping invoices"** to the term config of both `Credit Note` and `Debit Note`

#### Linking the Term Config to the Type

**System Settings** (`moduleapps`) - **Receipt Vouchers App Settings**: Added an improvement to link the term config to the type. To support this improvement, the following was added:
- The field **"Receipt Document Types (entered as text, separated by ,)"**
- The two fields **"For Type"** and **"Document Term Config"** for the lines of the Electronic Receipt Vouchers Books settings

The types appear in the app as a list; the type is selected, and when the document is transferred to Nama, the term config corresponding to the type is set on the document

### Banks

#### Ordering the Transactions Table

Ordered the transaction history table on the Financial Paper by actual date then creation date, whereas the previous ordering was by creation date only

### Service Center

#### New Documents

Created the following documents:
- `Sub-Item Allocation`
- `Cancel Sub-Item Allocation`
- `Sub-Item Supply`
- `Cancel Sub-Item Supply`
- `Cancel Sub-Item Sales Order`
- `Sub-Item Traffic Letter`
- `Sub-Item Traffic Letter Request`
- `Cancel Sub-Item Traffic Letter Request`
- `Cancel Sub-Item Traffic Letter`

### Real Estate

- Added the option **"Do Not Validate Estate Before"** to the Real Estate settings

### Customer Relationship Management (CRM)

#### The (Complaint-Suggestion) Window

Added the type **"Remark"** to the Type list, so that it now contains the options (`Suggestion`, `Complaint`, `Remark`)

### Human Resources

#### Improving the Start Date

Improved so that the start-of-work date after a vacation takes priority over the return-from-vacation date. For example, if an employee takes a vacation from 2020-11-01 to 2020-12-10, and the start-of-work date is 2020-12-07, salary calculation begins from the start date 2020-12-07, not the return date 2020-12-10, without changing the return date on the `Vacation Voucher`

#### Vacation Entity Flow

Improved the entity flow `VacationsSysEntryMigratorForAllEmps.utils` so that it starts recalculating the vacation balance from a specific date

#### The Employees System Table

Improved the system table **"Employee Status Change Movements"** with respect to the `Firing Document`, so that **"From Date"** is the termination date, not the actual date

#### Auto Attendance

- Added the field **"Fetch times from Attendance"** to the lines of `Auto Attendance`

#### Payroll Settings

Added the following two options to the Payroll settings:
- Calculate work time normally for vacation days (overtime will not be for the whole day)
- Calculate work time normally for official holidays (overtime will not be for the whole day)

### Manufacturing

#### Raw Materials Issue Voucher

- Added the field **"Finished product quantity it was issued for"** to `Raw Materials Issue Voucher`

### Fixed Assets

#### Bulk Disposal Voucher

Added the following fields to the lines of `Bulk Disposal Voucher`:
- `tax1Percent`, `tax1Value`, `tax2Percent`, `tax2Value`

### Point of Sale

#### Printing Improvements

- Added the option **"Automatically close the print window after pressing the print button"** to the Point of Sale settings
- In Point of Sale forms, added the ability to specify a particular printer in the report definition, so that the full invoice form can be printed on one printer and the invoice form on another - the user puts the printer name in the field designated for the report; if there is more than one printer with different names, they can all be entered separated by a `Comma`

#### Other Improvements

- Added the option **"Do not print the normal form if the full form is being printed"** for Point of Sale machines
- Improved mouse behavior in Point of Sale fields (such as the Unit field, for example), so that a right click opens the copy menu and a left click shows the choices

#### Additional Improvements

Added the following improvements to Point of Sale:
- Removed the mirroring of the company name on the splash screen when entering Point of Sale
- Enlarged the area allocated for the logo on the splash screen when entering Point of Sale

#### Printing the Full Invoice with Payment

- Added the option **"Print Full Invoice with Payment"** to the Payment window. When this option is selected and the payment is completed, the full invoice is printed if the current user has permission to print the full invoice

#### Miscellaneous Improvements

- Added the option **"Number of times to print documents per print order"**
- Added the following two fields to the Barcode settings:
  - Minimum code length
  - Maximum code length
- In the search bar on the main screen, improved so that results are shown when searching for an item across all listed categories, without selecting a specific category
- Added the ability to remove the zero present in the default payment method, since it causes many problems during payment
- Improved the Item Inquiry window in Point of Sale so that it takes units into account
- Removed the hold-invoice button that was in the `buttons` group that contains the printers
- Added the field **"Prevent Fraction Deduction"** to the `POSSecurityProfile` file
- Added Dimensions to the lines of the Point of Sale Aggregated Generic References, and they are copied to the created document
- Displayed the field `"generatedFrom"` in the Point of Sale Generic Reference screen
- Changed the payment screen for Point of Sale Returns to be red, like the Exchange payment screen
- Added a field to show the number of items on the invoice
- In the search filters inside Point of Sale, added the choice **"Not Equal"**

### Settings

#### Improving the Validation Mechanism

Improved the Criteria-based validation mechanism so that a warning is shown alongside its nature, which is to prevent saving

#### Preventing Save in Field Settings

Prevented saving in the **"Fields & Screens Settings"** file when a value is specified in the **"Field"** field in the `"Clear On Duplicate"` grid, if no value is specified in the **"For Type"** field

#### SMS Settings

Added an option to the lines of the SMS settings, `Use POST Method`, to allow communicating with SMS servers via `HTTP POST` in addition to `HTTP GET`

#### Field Styles

In Fields & Screens Settings, added the option `"disableSuggestionProvider"` to the `Field Styles` grid

#### Changing an Error Message in an Entity Flow

Changed an error message in the entity flow:  
`com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCPreventChangingFromDocFields`

#### New Permissions

- Added the permission **"Open the record from Based On and System Actions in the lines of the Permissions file"**
- Added the UAE branch's data to the program and to the website, with a (`Nama 5`) icon

#### Entity Flow and Queries

In an entity flow, when an incorrect query is used in (`Apply When Matching the Query`) and the flow is inactive, the program executes the query and stops because of the error

#### The User Screen - User Permissions

**The User screen - "User Permissions" page**: In the **"Basic Permissions"** details, prevented entering the same type or the same list of types twice, as in the Permissions file

#### Chain Supply Settings

Added the following options to the `chain supply` settings:
- **"Consider the Subsidiary when searching for the last sale price"**
- **"Consider the Subsidiary when searching for the last purchase price"**

#### Improving Error Messages

- When a document is mistakenly saved on the **"General"** legal entity, the message **"Please specify a book for the legal entity"** appears. Clarified the message to be **"Documents cannot be saved on the General legal entity"**

#### The Function to Unpack Serial Numbers

Added a new function for unpacking grouped serial numbers in reports and print forms, which works as follows:  
`NamaRep.unzipSerialsWithComma($F{serial})`

### Mobile Applications

#### Default Login Settings

Added the group - **Default Login Settings Values** - to the **"Receipt Vouchers App Settings"** page in the `apps` settings, where the fields are filled in with default values

#### QR Code Scanner

Also added a `-scan QR-` button next to the login button in the app; it reads the `qr code` found at the header of the Nama system, in the main `Tool Bar` next to the `smile face`, after which the user finishes entering the device ID and the user's password

#### The Electronic Receipt App

- **The Electronic Receipt App**: Added the field **"Cheque Due Date"**, and writing in this field is not allowed unless a cheque number exists and Cash is not checked

#### The Collection App

In the Collection App, added the ability to print the amount in words and to show the name of the collection representative (the current user) on the printout

#### Auto-Save Fields

Added the following fields to each of the windows (`Book`, `Term Config`, `Group`):
- The fields that are auto-saved after being entered (`CSV`)
- The line added after auto-save
- The field selected after auto-save
- The auto-save method

#### DeliveryQueue

Added the field `"masterPin"` to the `DeliveryQueue` (Delivery Queue) in Nama

### Reports

#### The Cheques Statement Report

**The Cheques Statement by Status Report** (**SYSR-BNK003**): Ordered the cheque status by actual date, then creation date

#### Financial Statement Reports

Added (from Branch to Branch, from Sector to Sector, from Department to Department, from Analytical Group to Analytical Group) to all the Financial Statement reports

## Fixes

### Inventory

#### Stocktaking and Receipt Issues

- When doing a `Stocktaking` for items with an expiry, and this stocktaking resulted in a `Stock Receipt Voucher`, the system shows the expiry date on the receipt voucher, and the expiry date is not shown

#### Removing Incorrect Fields

Removed the fields related to Additional Cost vouchers from the term config options of the following documents, because they existed there by mistake:
- `Sales Invoice`
- `Sales Order`
- `Sales Quotation`
- `Sales Quotation Request`
- `Sales Exchange Request`
- `Sales Exchange Voucher`
- `Sales Return Request`
- `Sales Return`

#### Item Name Issues

Fixed an issue where, when the **Allow Editing Item Name** option was enabled in the `chain supply` settings, the Item Name was shown in all Supply Chain Management documents without exception. When trying to hide this field by editing the screen for Warehouse or Purchasing documents, it could not be hidden

#### Units Issue

Fixed an issue where, when selecting a unit that has a Variant in the Sales Invoice, the error **"Cannot perform the operation"** appeared

### Purchasing

#### Final Product Pricing Document

**Final Product Pricing Document**: Added the following improvements to the details of the main window:
- Item Unit
- Unit Price  
- Total Price (Quantity multiplied by Price)
- `n5`

**Final Product Pricing Document**: Added the following improvements to the header of the main window:
- Total Overall Price
- Total Raw Materials Cost

### Sales

#### Duplicated Dimensions

The Dimensions section is duplicated **3 times**, on the Main page, the Delivery page and the Items page alike, in each of the following documents:
- `Sales Exchange Voucher`
- `Sales Exchange Request`

#### Item Opening Issue

Fixed an issue where, when clicking the `Reference` arrow (the blue arrow) to open the item within the same invoice screen, the system opened it in a different screen, even though the item had been specified in `Popups openIng` in Fields & Screens Settings

#### Line Coloring Issue

Fixed an issue where, in the Sales Invoice, when there was an error on a specific line, the error message correctly showed the item code with the error, but the first line was colored red instead of the line that had the error

### Accounting

#### Partial Payment Issues

- Fixed an issue where, after creating a `Partial Payment Voucher` for a Financial Paper, then deleting the `Partial Payment Voucher`, the field **"Partially Paid Value"** remained affected by the partial payment value from the deleted voucher
- Fixed an issue where the system allowed deleting the journal entry vouchers generated from the `Closing Entry Voucher`

#### Financial Statement Issues

- Fixed an issue where, when creating Financial Statements, the level of `Net Profit` and `Gross Profit`, as well as the statement type, were not specified
- Fixed an issue where the system did not accept entering data in the details of the `Purchase Budget` document because no term config was entered, even though this document has no field specific to the term config

#### Financial Papers Issues

Fixed an issue where, when posting to a sub-account rather than a Subsidiary in either the `Receipt Voucher` or the `Payment Voucher`, while a Financial Paper existed on the document, the system did not copy this sub-account into the **"Related Party"** field on the Financial Paper document, as it does when posting to a Subsidiary account

### Contracting

#### General Issues

- Fixed an issue where, in some cases, the `Daily Labour Book` document did not accept saving
- Fixed an issue where, after creating a `Cost Execution`, then creating an Extract based on it, then cancelling the document for both the Execution and the Extract, the user could not delete the cancellation voucher for either of the two documents (the `Execution document` and the `Extract document`)

### Human Resources

#### Resignation and Return Issues

Fixed an issue where, when an employee resigned then returned to work (in the middle of the month, for example), after re-hiring him the system issued the `Salary Voucher` from the start of the period, even though he came back in the middle of the period

#### Salary Voucher Issuance Issues

- Fixed an issue where, in some cases, when trying to issue a `Salary Voucher` through the `Payroll Record`, the error **"Cannot perform the operation"** appeared

#### Attendance and Time Issues

- Fixed an issue where, in some cases, an employee checked in on a shift immediately before the next day's shift, so that if he checked out on the shift day, the system counted the attendance under the previous day, before the shift. For example, if an employee checked in at (23:30) on (2020-12-23) then checked out at (7:20) in the morning on (2020-12-24), the system counted the employee as having attended the (2020-12-23) shift, and then considered (2020-12-24) as absent

#### Official Holidays Issues

- Fixed an issue where, when working on official holidays, the program put the number of work hours in the `Total Number of Hours` field instead of the `Total Overtime` field
- Fixed an issue where the start-of-work date was not updated with the actual date of the **"Vacation Modification"** document

#### Vacation Balance Adjustment Issues

Fixed an issue where, when making any modification in the `Vacation Balance Adjustment Voucher` and trying to save, the error **"Cannot perform the operation"** appeared

### Manufacturing

#### Quality Inspection Issues

- Fixed an issue where, in some cases, the `Quality Inspection Voucher` did not accept saving
- Fixed an issue where, when configuring the Execution document to issue Quality Inspection vouchers, the system did not correctly auto-issue the document via the Execution document

#### Other Issues

Fixed an issue where, in the Sales Invoice, when there was an error on a specific line, the error message correctly showed the item code with the error, but the first line was colored red instead of the line that had the error

### Accounting

#### Partial Payment Issues

Fixed an issue where, after creating a `Partial Payment Voucher` for a Financial Paper, the `Partial Payment Voucher` was deleted, and the field **"Partially Paid Value"** remained affected by the partial payment value from the deleted voucher

#### Other Errors

- Fixed an issue where the system allowed deleting the journal entry vouchers generated from the `Closing Entry Voucher`
- Fixed an issue where, when creating Financial Statements, the level of `Net Profit` and `Gross Profit`, as well as the statement type, were not specified
- Fixed an issue where the system did not accept entering data in the details of the `Purchase Budget` document because no term config was entered, even though this document has no field specific to the term config

#### Sub-Accounts and Financial Papers Issues

Fixed an issue where, when posting to a sub-account rather than a Subsidiary in either the `Receipt Voucher` or the `Payment Voucher`, while a Financial Paper existed on the document, the system did not copy this sub-account into the **"Related Party"** field on the Financial Paper document, as it does when posting to a Subsidiary account

### Contracting

#### Execution Document Issue

**The Execution Document**: Fixed an issue where, in some cases, the system calculated the total cost incorrectly

### Fixed Assets

#### Transfer and Tax Issues

- Fixed an issue where, when creating a `Custody Transfer` document, the message **"Cannot perform the operation"** appeared
- Fixed an issue where the deduction tax on the `Addition Voucher` and the `Exclusion Voucher` was not deducted, but instead added to the value

### Point of Sale

#### Service and Printing Issues

- Fixed an issue where, when closing Point of Sale, the `service` kept running in the background automatically, which prevented it from being started again
- Fixed an issue where the **Print Full Invoice** button was no longer present in Point of Sale in its current form

#### Recurring Issues

- Fixed an issue where, very often, when creating an invoice or a return, the error (`Could not perform the action`) remained and was not cleared from the POS terminal or from Nama, even though the invoice had been saved

#### Other Issues

- Fixed an issue where, in one version of Point of Sale, the system transferred documents to Nama as a draft, even though they had no errors
- Fixed an issue where the amount in words did not work when printing an invoice from Point of Sale
- Fixed an issue where, when making an exchange in Point of Sale with the returned item's amount equal to the new item's amount, the **Cash Amount** field showed a value that made no sense

#### Reference and Deletion Issues

- Fixed an issue where, in some cases, when deleting a line from the Point of Sale Aggregated Generic Reference `"NamaPOSAggGenericReference"`, it was not deleted in the POS terminal
- Fixed an issue where, in some cases, choosing **Delete Errors for the Selected Machines** from the list view in the Machines screen produced the error **"Cannot perform the operation"**
- Fixed an issue that occurred, in some cases, because of the printer name

#### User Interface Issues

- Fixed an issue where, if the user entered items in Point of Sale then pressed the **Print Full Invoice** button right before completing the payment, the system cleared the screen's data
- Fixed an issue where changing the number of result lines in the Invoice Search screen did not work correctly: if the number of results was 100 lines and it was changed to 10, the first page showed 10, but moving to the next page showed 100 results instead of the 10 that had been set

### Real Estate

#### Contract Extension Issue

Fixed an issue where, when trying to extend the contract, an error appeared saying this could not be the Unit's first transaction

### Settings

#### Current Tasks Issues

Fixed an issue where tasks appeared in Nama's Current Tasks (`Monitor Current Tasks`) but were not actually active, and no matter how many times `KILL` was pressed, they were not closed

#### Formula Issues

Fixed an issue where, when creating a formula on the Book that does not add a prefix for certain years, the system did not calculate the next number correctly

#### Import Issues

Fixed an issue where, when importing an Excel sheet directly into an invoice, an error occurred: a large number of lines were added, and these lines were empty of any data

#### Payment Methods Improvements

Added the following two fields to the details of the Payment Methods window:
- Type
- Type List

#### Other Issues

- Fixed an issue where, when re-saving a draft, the system inserted a new code every time
- Fixed an issue where, in the list view for some files and documents, for example (`Item`), the field (`Display Method`) showed incorrect choices, such as item price lists
- Fixed an issue where, when selecting more than **50 customers** in the customer Dimension filter, the system showed an error message and the report did not work. For example, the Customer Balances report
- Fixed an issue where, in one version, there was a processing error (`Processing failed with an exception`) when saving a `Stock Issue Voucher` or a `Stock Receipt`, for example

### Human Resources

#### Vacation Balance Issue

Fixed an issue where an employee, during 2020, took vacation through two Vacation Vouchers of type Absence for **8 days** and **7 days**, and start-of-work was recorded after them. A problem appeared in two balance fields - the first inside the employee record, and the second on the `Vacation Voucher` - where, when selecting dates to inquire about his balance, his balance appeared to be short by about **7 days**

### Reports

#### Accounting Reports Issues

- Fixed an issue where, in the system report **"Detailed General Account Statement"** (**SYSR-ACC035**), all the lines of the `Receipt` and `Payment Vouchers` were displayed - which caused receipt and payment lines that did not belong to the customer to appear
- Fixed an issue where, in the `Customer Net Sales Values` report (**SYSR-SLS003**), `draft` documents were included in the report's calculation

#### Accounting System Reports

Fixed an issue where the following Accounting system reports did not take the creation date into account:
- **SYSR-ACC002**
- **SYSR-ACC003**
- **SYSR-ACC029**
- **SYSR-ACC030**
- **SYSR-ACC031**
- **SYSR-ACC032**
- **SYSR-ACC035**

### New GUI

#### Report Display Issue

Fixed an issue where, when displaying a report on the New GUI, it appeared in an unacceptable way, especially when there was a background, as well as with the area allocated for the bottom bar responsible for printing and reloading
