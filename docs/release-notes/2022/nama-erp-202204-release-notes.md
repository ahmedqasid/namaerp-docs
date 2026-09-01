# Nama ERP Release Notes - April 2022

::: info Release Information
- **Release Date**: April 2022
- **Release Number**: Nama-ERP-202204
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the option "Include Quantities of Items Selected in the Lines Only" in the Stock Taking Committee document.
- Added a book and a term config for Stock Transfer within the Invoice Receipt document term config, named "Transfer Packing Items", so that a stock issue can be made with the items of the classification selected in the Invoice Receipt document term config, in the "Packing Items" table, and added a Transfer Packing Items warehouse and location, and an Issue Packing Items warehouse and location.
- Improved the entity flow com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectLot so that the Lot is inserted along with the Lot's own expiry dates.
- Added ignoring drafts in the Fields & Screens Settings, such as the branch and company selection, in the "Ignore Dimension Consistency for Fields" grid.
- **Multiple Assembly Voucher:** Added the following fields:
  - Main Assembly Method
  - Main Item
  - Main Quantity and its Unit
- **Assembly Method:** Added "Sub Assembly Method" in the details grid.
- Improved the Invoice Receipt document so that when an item that does not exist in the invoice and has no classification selected from the term config is chosen, an error message appears before clicking the "Update Mismatched Quantities Table" button.

### Purchasing

- Added a dedicated Grid for the items in the Purchase Quotation Request.

### Sales

- **Proforma Sales Invoice:** Added the date to the "packingList" table.
- Added a new file named "Customer Reward Points".
- Added a field in the Sales Documents term config for configuring reward points.
- Improved the Invoice Receipt document so that when an item is entered, or a scan is done for an item that does not exist in the invoice, an error message appears at the time of entry stating that the item is not among the invoice's contents, except for items that have a classification added from inside the document term config.

### Service Center

- Improved "Based On" for sub-item documents so that the system copies the properties to the line's sub-item if it exists, or from the line to the corresponding field in "Based On".
- Added a new file named "Rental Asset Classification".
- Added a new list named "Pricing Method" in the Service Center settings, where pricing is set by the day or by the hour.
- **Maintenance Order:** Made the "Select" option in the "Status Definitions" table available to the user.
- **Maintenance Order:** Added a note that changes statuses from the Header to the Grid, without changing the status.
- Added a status-change note in the header, and when the status is changed in the header, the system adds a new line in the grid holding the current status.

### Freight Management

- **Operation Order Receipt documents:** Added a button in the window to suggest places to put the goods present in the Operation Order according to the conditions selected in the location on the same document, and according to the quantity and dimensions of the order recorded in the Operation Order.
- Added an option for the suggestion in the module's settings, so as not to suggest locations whose status is (Partially Available), to avoid placing more than one Lot in the same location except manually and not by suggestion.
- **Operation Order Transfer document:** Added a button in the window to insert all Operation Orders available according to the filter above, filling in the current locations for each Operation Order.
- Added a new grid named Packing Dimensions that includes the dimensions (length, width and height), and the capacity in the lines must equal the capacity in the header, in each of the following documents:
  - Operation Order
  - Operation Order Receipt document

  So that when the Operation Order is selected in the Operation Order Receipt document, the data is automatically pulled down from the grid of the Operation Order document into the grid in the Operation Order Receipt document.

- Added a button in the Operation Order Receipt document so that, when clicked, it creates lines with the criteria selected from the location classification, location type, length, width, height and capacity.
- Added an option in the Freight module's settings named "Do Not Suggest Partially Empty Locations".

### Real Estate

- When a Floor is rented, the Floor is updated and its status becomes Rented, while the status of the Units inside the Floor is not updated. Improved so that they are treated like Grouped Units.
- Added the "Term Config Settings Lines" grid to the Collection Voucher term config.
- Added the "Expenses" grid to the Lease Termination Voucher, and also added the following fields to the document's term config:
  - Debit Remaining from Expenses for the Current Year
  - Credit Remaining from Expenses for the Current Year
  - Debit Prepaid from Expenses for the Next Year
  - Credit Prepaid from Expenses for the Next Year
- Added the "Term Config Settings Lines" grid to the Lease Termination term config.
- In each of the files (Project - Land - Square - Block - Building - Floor - Unit), added the following improvements:
  - Added a field named Delivery Status, which is a system checkbox that is activated when the Unit is delivered.
  - Added a Delivery Date field, which is a system field where the date is added when the Unit is delivered, with the actual date of the Unit Delivery document.
  - Added a Delivery Document field, in which a reference to the Unit Delivery document is added when it is created.
  - Added a Cost Before Delivery field and a Cost After Delivery field.
- Added two fields in the Sales Contract term config named Debit Before Delivery and Credit Before Delivery, so that if they are not empty in the term config, an accounting journal entry is created for the property present in the Sales Contract.
- Added a new document named "Post-Delivery Cost".
- Added the two fields (Remaining Cost Debit - Remaining Cost Credit) in the "Post-Delivery Cost" document's term config, so that an accounting journal entry is created for the remaining cost in the lines, for each line.
- **Lease Termination Voucher:** The expense value in the Expenses grid is now calculated with the same mechanism as the revenue, so that the expense value is split into a prepaid amount for the current year and a prepaid amount for the next year, with a financial effect like the revenue.
- Added an option in the Bulk Collection document term config to exclude installments that were previously collected in a Bulk Receipt Voucher. When activated and the "Consolidate Lease Contracts" button is clicked, the system ignores the codes of installments for which a Collection Voucher has already been made.
- Added a new voucher named "Cancel Rent Quotation Reservation".

### Customer Relationship Management (CRM)

- **Maintenance Order:** Added the following improvements:
  - Added a field in the document header for writing status-change notes.
  - **Status Change page:** Added a field in the status-change Grid that is automatically filled in with what was written in the added status-change notes field.
- **Machine file:** Added the option "Has Sub Machines".
- **Machine file:** Added a new grid in the Machine file named "Sub Machines", where sub machines can be added in this table, provided the "Has Sub Machines" option is checked.
- **Maintenance Contract:** Added a list named "Maintenance Plan Creation Method" containing the following options:
  - Create the Maintenance Plan based on the contract period.
  - Create the Maintenance Plan based on the visit type only.
  - Create the Maintenance Plan based on the visit type while also considering the contract period.

### Human Resources

- Added the option "Ignore Values Less Than When Calculating the Total Period" in the Performance Indicator and in the Approval Voucher header.

### Manufacturing

- **Production Order:** Improved so that when the final product's quantity changes, the by-product's quantity changes too, and the by-product is calculated using the equation (Total Quantity / Final Product Quantity * By-Product Quantity).

### Settings

- Added a new table named "Max Fields Length In DB" to the Fields & Screens Settings.
- Added the entity flow EACalcCurrencyRateInDetails to calculate the exchange rate in the lines.
- **Responsibility document:** Added the following options:
  - The Sector must match the record's sector when searching for employees.
  - The Company must match the record's company when searching for employees.
  - The Branch must match the record's branch when searching for employees.
  - The Department must match the record's department when searching for employees.
  - The Analytical Group must match the record's analytical group when searching for employees.
- Added the ability to calculate a message template dynamically from another field. Example: there is a field named Current Status in the Maintenance Order, and it is required to set a text message template inside the field, and to send the template when the Maintenance Order is saved. To support this, the following can be used:

Use the {tempo} node. Example:

{tempo}{customer.remarks}{endtempo}

- Added "Second Note" in the Standard Sale Item window.
- Added the following options in each of "Tax Authority Settings" and "Tax Policy":
  - Send Tax 1 as zero
  - Send Tax 2 as zero
  - Send Tax 3 as zero
  - Send Tax 4 as zero
- **Tax Authority Settings file:** Added a grid named "Discount Settings", where discounts can be controlled to be before or after the tax.

### Mobile Applications

- Supported running printing on Pegasus machines in the Collection app.
- In Attendance, added the two options (**Forgot Check-In:** allows making a check-out without making a check-in, **Forgot Check-Out:** allows making a check-in without making a check-out).
- **Leave Request and Leave Permission voucher:** Added permission types (Missing check in, Missing check out).
- Allowed excluding employees from attendance zones in the Electronic Attendance Zones document.

## Fixes

### Inventory

- **Stock Taking:** In some cases, the system did not adjust items with no quantities, so they were not adjusted to zero.
- **Stock Taking Committee document:** When clicking the "Collect Items by Date" button, the items came down with their Lots except for the expiry dates.
- Fixed an issue where, when making a Receipt based on a quality inspection, all the data appeared except for the batch's expiry date.

### Sales

- Fixed an issue where, when sending the e-invoice in a foreign currency, the tax portal showed it as a local currency and recalculated the tax again.

### Accounting

- Fixed an issue where the creation date was shown in the System Journal Entries screen's list.

### Human Resources

- Fixed an issue where the system carried forward the leave balance even though carrying forward was not selected in the carry-forward policy inside the leave type.

### Settings

- Fixed an issue where, in a report with an input of type List (which allows selecting more than one value through a table), with a hyperlink made inside the report using this input in the link, running the report resulting from the hyperlink did not show the selected inputs as a single value separated by commas.
- Fixed an issue where, in the (Import/Export Files list) window, an error sometimes occurred when doing an import.
- Fixed an issue where, in the Fields & Screens Settings, in the extra codes, applying to all screens did not work correctly on all screens.

### Human Resources

- Fixed an issue where, in some cases, when updating an employee's data during a payroll period, the system calculated the salary for the period incorrectly.

### Service Center

- Fixed an issue where, when making a Receipt Voucher based on a sub-item Sales Order with an amount greater than the Sales Order amount, the system showed an error message that the invoice's remaining amount cannot be a negative value, even though the option to allow paying an amount greater than the invoice's value was activated in the sub-item Sales Order.

### Hospital Management System

- The discount worked as a percentage only, not as a percentage or a value, in the following documents:
  - Accommodation Invoice
  - Physiotherapy Invoice
  - Services Invoice
  - Operations Invoice
- The discount did not work as a percentage or a value in the following documents:
  - Radiology Invoice
  - Medical Tests Invoice
  - Services & Supplies Invoice
- The discount affected the value of the administrative service, while it should not affect it, in the following documents:
  - Accommodation Invoice
  - Physiotherapy Invoice
  - Services Invoice
  - Operations Invoice
