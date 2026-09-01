# Nama ERP Release Notes - September 2022

::: info Release Information
- **Release Date**: September 2022
- **Release Number**: Nama-ERP-202209
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the option "Defer Creating Inventory Documents" to all Supply Chain vouchers, noting that it has not been shown on the screen.
- Added the option "Ignore Service Items in Offers Based on Item Counts" to the Supply Chain settings, which allows ignoring service items in offers.
- Added the option "Use the Manual Creation Time Field in Stock Taking Closing" to the Supply Chain settings.
- Added a field named "Manual Creation Time" to the Stock Taking Closing file. This field is shown when the option "Use the Manual Creation Time Field in Stock Taking Closing" is checked in the Supply Chain settings.
- When clicking the "Consolidate Quantities from the Warehouse by Actual Date" button in the More menu of the Warehouse Transfer Voucher, the system did not take the warehouse location into account. Improved so that when a location is selected, quantities are pulled from it, and if no location is selected, quantities are pulled from the selected warehouse.

### Sales

- Added 5 number fields (n) to the Sales Quotation lines, needed for preparation.
- When creating a Sales Invoice with a value of 0 for an individual customer (B2C), and setting the value 50000 in the field "Minimum Invoice Value to Require Sending the Customer" in the Tax Authority settings, the system, on save, requests the national ID number.

### Accounting

- In each of the Payment Voucher, Receipt Voucher, Payment Order, Receipt Order and Bank Transfer, added the following options:
  - Add Tax 1 to Total Debit
  - Add Tax 1 to Total Credit
  - Add Tax 2 to Total Debit
  - Add Tax 2 to Total Credit

  When the option is enabled in any of the mentioned documents, the tax from the lines is added to the total.

### Fixed Assets

- Prevented saving the document if the depreciation start date is after the period start date and there is an accumulated depreciation value, in each of the following two documents:
  - Fixed Asset Opening document.
  - Fixed Asset Opening Amendment document.

### Contracting

- Added the following fields to the term config of each of (Subcontractor Extract - Contracting Supplies Purchase Invoice - Contracting Supplies Purchase Order):
  - Do Not Add Discount 1 to the Cost
  - Do Not Add Discount 2 to the Cost
  - Do Not Add Discount 3 to the Cost
  - Do Not Add Discount 4 to the Cost
  - Do Not Add Discount 5 to the Cost
  - Do Not Add Discount 6 to the Cost
  - Do Not Add Discount 7 to the Cost
  - Do Not Add Discount 8 to the Cost
- **Employee & Equipment Assignment to a Project window:** Added 5 attachments to each of the window header and the details.
- **Employee & Equipment Assignment to a Project window:** Added the list "Employee / Equipment" to the window header, containing the following values:
  - Fixed Asset
  - Vehicle
  - Employee
- Improved item entry in Contracting so that when a sub-item is selected and this item has a tax rate, the system copies the tax at the line level.

### Banks

- Added a new master file window named "Bank Credits".
- Added a new document named "Bank Credit Request".
- Added a new document named "Bank Credit Opening".
- Added a new document named "Bank Credit Amendment".
- Added a new document named "Bank Credit Termination".

### Customer Relationship Management (CRM)

- Added the Payment Methods grid and the Payment Vouchers grid to both the Maintenance Order and Maintenance Invoices.
- In the Maintenance Order and Maintenance Invoices, developed a method to prevent saving the document if the spare parts prices do not equal the prices in the price list. This was done via a Groovy script and an entity flow that blocks on save.
- Added loyalty points to both the Maintenance Order and Maintenance Invoices.

### Human Resources

- Amended the "Number of Tickets" field in all Human Resources documents and lines so that it accepts decimal fractions.
- Improved so that when creating a Departure Permit, and the permit type is "Forgot Check-out Fingerprint", the system affects the system indicator "No Check-out Fingerprint Recorded".
- Improved so that when creating a Departure Permit, and the permit type is "Forgot Check-in Fingerprint", the system affects the system indicator "No Check-in Fingerprint Recorded".
- **Leave Type window:** Added the option "Consider the Leave Period When Calculating the Balance". When enabled, the balance is calculated taking the leave period into account.
- Added a grid to the Human Resources settings named "Employee Statuses Allowed to Create an Advance Voucher or Request For", which allows creating an Advance Voucher for the statuses found in the grid, in addition to the basic status "Active".
- **Leave Allowance Payment Voucher:** Created a migrator to copy the values from the "Allowance Days" field to the "Leave Duration" field with a version update, in the case where the value in the Allowance Days field is not (null).
- Added the following fields to the lines of the Insurance Offer from a Company Voucher:
  - Age | From
  - Age | To
  - Nationality
- Added the option "Reissue Saved Salary Vouchers" to both the "Employee Salary Hold" and "Cancel Salary Hold" documents.
- **"Leave Type" window:** Added a new group named "Maximum Leave Within a Specific Period". This group contains the following fields:
  - Maximum Leave (Days)
  - Period Type (Days)
  - Period Value (Days)
  - Period Start Date
- **"Leave Type" window:** Added a new group named "Number of Leave Occurrences During the Service Period". This group contains the following fields:
  - Maximum Leave (Days)
  - Period Type (Days)
  - Period Value (Days)
  - Period Start Date
- Developed a mechanism for a leave type to be linked to the leave duration rather than the salary period. That is, there may be a sick leave with a specific handling policy, whose treatment depends on the leave duration, since the leave might fall at the end of a month and extend into the following month. This mechanism is a script inserted into the Scenario field of a performance indicator of type Groovy Script.

### Point of Sale

- Improved so that when selecting Merge Tables, they are handled as a multi-select: clicking a table changes its color to make it clear that it has been selected; the window does not close as soon as a single table is selected for the merge; more than one table can be selected at once; and when reopening the merge, the merged tables appear in a different color.
- Amended the Point of Sale Additional Items window - the additional items grids - by adding the Unit field, so the unit that applies to the item selected in the grid can be chosen.
- Added a new window named "Tourism Service Settings in Point of Sale".
- Added the option "Automatically Add the Delivery Item When the Invoice Classification Is Selected" to both the Register file and the Point of Sale settings.
- Added the option "Automatically Add the Tourism Service Item When the Invoice Classification Is Selected" to both the Register file and the Point of Sale settings.
- Added the option "Automatically Add the Minimum Charge Item When the Invoice Classification Is Selected" to both the Register file and the Point of Sale settings.
- Added the option "Automatically Add the Tourism Service Item When a Table Is Selected" to both the Register file and the Point of Sale settings.
- Added a reference to the Tourism Service Settings in Point of Sale to both the Register file and the Point of Sale settings.
- In some cases, right-clicking one of the grid fields did not show the menu containing the copy options.
- Added a language-change option to the More menu (when clicking the three dots).

### Settings

- Added a new entity flow named com.namasoft.services.utils.EASaveToAnotherServerUsingJSON
- **Screen Editing:** Added the list "Show Only With Language", containing the two options (Arabic, English), to the "Edit Line Fields" table.
- **Import/Export:** Added a column for the reference field names by language, to make it easier to edit the file exported from the system.
- Added a system table to the Settings menu next to Pending Tasks, named "Tasks for Sending Documents to Another Server".

## Fixes

### Inventory

- Fixed an issue where, after creating an Inventory Supply with a specific date, trying to change the date to an earlier date - i.e. before the date the document was created - the system rejected it with a message stating that there was no quantity on that date, even though a Warehouse Transfer had been made after creating the supply document.

### Accounting

- Fixed an issue in the **Operation Invoice** where, after checking the "Subject to Tax" field and then selecting a tax policy, the tax rate was not automatically copied onto the line.
- Fixed an issue in the **Receipt Voucher** where, when using a payment method with fees while the term config had the option "Do Not Summarize Payment Method Expenses Entries" enabled, the fields (Total Debit, Total Credit) showed different values.

### Contracting

- Fixed an issue in the **Subcontractor Extract** where the values in the Net field and the Remaining field differed from the value in the Total Due field, and when creating a Payment Voucher based on the Extract, the net and remaining amount was added instead of the total due. Corrected the way the Net and Remaining are calculated.
- Fixed an issue where creating a duplicate of a Subcontract showed the error "Operation Cannot Be Performed".

### Fixed Assets

- Fixed an issue where, in some cases, the system calculated the depreciation installment value in the Depreciation Voucher incorrectly.
- Fixed an issue where, in some cases, saving the Fixed Asset Amendment document showed the error "Operation Cannot Be Performed".
- Fixed an issue where, after creating installments in the Fixed Asset Opening document, then creating a Payment Voucher and selecting the Fixed Asset Opening voucher as the installment document, the system pulled the installments, but on save the Payment Voucher did not accept saving and showed a message that the installment code did not exist in the document.
- Fixed an issue where, in some cases, saving the Fixed Asset Amendment document showed the error "Operation Cannot Be Performed".

### Customer Relationship Management (CRM)

- Fixed an issue in the **Maintenance Order** by improving it so that when the customer is selected before the machine, the customer is not changed when the machine is selected afterward.
- Fixed an issue in the **Maintenance Order - Spare Parts grid and Services grid** where, when an item was selected and then the quantity entered, the system did not calculate the tax on the line, and so it did not affect the net or the total tax in the totals group of each grid. Improved so that the system calculates these fields as soon as the cursor leaves (Post-Action) the fields (Quantity, Tax Rate, Tax Value), instead of calculating them only on save.
- Fixed an issue in the **Maintenance Order document** where inserting a spare part in the "Spare Parts" table did not insert the unit specific to the inserted spare part.

### Settings

- Fixed an issue where the print server did not work correctly with some printers in Arabic.
- Fixed an issue where using the $ sign in a criteria-based field filter caused the system not to auto-fill the "Dynamic Filter Context Fields" field.

### Human Resources

- Fixed an issue where making an Employee Data Update dated after the salary period start date caused the system to calculate the salary incorrectly.
- Fixed an issue where the remaining leave balance was calculated incorrectly in a Consolidated Leave Voucher for more than one employee.
- Fixed an issue in the **Advance Repayment Voucher** where, in some cases, when some installments contained decimal numbers, a rounding error occurred, preventing the save.

### Point of Sale

- Fixed an issue where selecting a reservation order from the Cancel Reservation screen and clicking the payment mark showed the error "Please Enter the Items".
- Fixed an issue where, after opening a Point of Sale Sales Invoice, adding items and selecting a table, then holding the invoice, reopening the held invoice and adding any new item or performing any action on the invoice, then holding the invoice again, showed an error that the table was reserved.
- Fixed an issue where creating a Return voucher with a Sales Invoice code, or without an invoice number, showed the message "The Document Quantity Is Insufficient - It May Have Been Returned from Another Register".
