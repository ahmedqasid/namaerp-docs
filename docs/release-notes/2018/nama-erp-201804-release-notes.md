# Nama ERP Release Notes - April 2018

::: info Release Information
**Release Date:** April 2018  
**Release Number:** 201804
:::

## Additions

### Inventory
- Added the option **"Show alternative item when there is no balance"** in the Distribution Management settings. When this option is enabled, if the system tries to issue an item that has no quantity but has an alternative, it shows the user the alternative item to insert.
- Added quantity tracking inside the Inventory Opening Voucher term config.
- **Stock Transfer Voucher:** Added an attachment to the document header.
- **Item File:** Added Ref1 and Ref2 to the Item file.
- Updated automatic item creation so that if an item has more than one unit group, the unit group is added to the item together with the items' auto-generate (generate auto).
- Added the Stock Taking Start voucher to the list screen for the Stock Taking Committee and Stock Taking End.
- **Item File:** When adding a new item without saving it, then adding a price for it from a defined list inside the item price details (Prices screen), the save is not accepted and an empty error message is shown, but the save is accepted after deleting the price line.
- **Warehouse Issue Request:** Improved the Warehouse Issue Request so that its status changes to In Progress upon saving, and when the entire requested quantity has been issued, the status changes to Completed (Unicrete).

### Sales
- **Sales Offers:** Activated offers on the number of invoice items so they apply to all items, since they currently only work on a department, category, or item group.
- **Sales Offers:** Developed a button to update the information (From Date - To Date - Line Priority).
- Activated the "Stop other discounts" option.
- Added the other side of the tax, as exists in the Sales Invoice term config, to Sales Returns.
- Added the option **"Search by customer inside the Based On field"** in the Sales Invoice term config.

### Accounting
- **Journal Entry Voucher:** Added the option **"Delete zero lines"** to the More menu of the Journal Entry Voucher, to delete lines that have no values.

### Service Center
- Added attachments to the Job Order Execution screen.

### Human Resources
- **Payroll Vouchers - Time Attendance Information:** Now shows the Time Attendance information for the payroll period found in the Payroll Voucher only, not all payroll periods.
- **Payroll Register:** In some cases, when issuing payroll vouchers, they are saved as a draft and do not appear in the Payroll Register.
- Added the following options to the Human Resources settings:
  - Treatment of unpaid leave days for a single employment record (one Data Update Voucher) during the period.
  - Basis of unpaid leave days for a single employment record (one Data Update Voucher) during the period.
  - Treatment of unpaid leave days for multiple employment records (more than one Data Update Voucher) during the period.
  - Basis of unpaid leave days for multiple employment records (more than one Data Update Voucher) during the period.
  - Treatment of non-working days for a single employment record (one Data Update Voucher) during the period.
  - Basis of non-working days for a single employment record (one Data Update Voucher) during the period.
  - Treatment of non-working days for multiple employment records (more than one Data Update Voucher) during the period.
  - Basis of non-working days for multiple employment records (more than one Data Update Voucher) during the period.
- Added the field ("Number of months for leave allowance entitlement") to the Consolidated Job View.
- **Salary Structure:** Improved the Salary Structure so that when the user selects the Singular Type, the system fills in the payroll calendar field previously defined in the Singular Type (the default calendar).
- Prevented duplication of an employee's Time Attendance machine code within the database, taking into account the option **"Consider the company when searching for the employee when importing Time Attendance"** in the Human Resources settings.
- Added the ability to view, in the list screen, the Payroll Register (final save - draft).
- Added the table **"Items to be ignored with unpaid leave"** to the **"Leave Type"** file.
- **Mission Voucher:** Improved the voucher so that when the employee and the From Date and To Date are selected, the employee's default shift schedule for the same day is copied.

### Fixed Assets
- Added the two fields Total (Opening Acquisition Value) and (Opening Accumulated Depreciation Value).
- Created a mechanism for grouping assets (Group - Asset Type - Asset - Dimensions).

### Contracting
- **Assay Document:** Added the profit margin percentage, profit, and price to the Assay lines.
- **Term Sheets:** Improved so that Term Sheets are affected by the Term Analysis Card, as set in **"Based On"** found on the Term Analysis Card.
- **Term Analysis Card:** Added a Contracting unit of measure to the line.
- **Assay Voucher:** Added the following changes:
  - Calculating the price from the profit percentage / profit and cost upon entry.
  - Added the option **"Calculate price from profit on save"** to the document header.
  - Adjusted some translations and field order.
  - Fixed an error related to the **"Consolidate analysis in the Assay"** button.
- **Term Analysis Card:** Improved the Term Analysis Card window so that the system shows the term's description next to the code.
- **Term Analysis Card:** Added a button that aggregates costs from the Term Analysis Card lines based on the term code and updates them in a Based On document, called **"Transfer costs to the Based On voucher"**, and another button that does the same but from a different field on the Assay document, called **"Transfer costs to the Assay voucher"**.

### Manufacturing
- Added the option **"Delete selection options in the Planning document after creating the documents"** in the Manufacturing settings.

### Real Estate
- Added the tax percentage and tax value fields to Collection Vouchers, on the line next to the installment value, fine value and discount, positioned after the discount, and created an accounting effect for them in the document term config.

### Customer Relationship Management (CRM)
- **Technical Support Request:** Added the following two fields:
  - Relative Weight.
  - Ticket Type, containing the following options:
    - Addition
    - Error
    - Modification

### Point of Sale
- Improved the Item Search window so the item image can be displayed when images are used, when the option 1 = useImages is set in the properties.nama file.
- Added the code field for the document number, and moved the Receipt and Payment Voucher numbers to their corresponding screens in Nama.
- Added the branch's tax number and carried it over to Point of Sale.
- Added the other side of the tax, as exists in the Sales Invoice term config, to the Point of Sale Invoice and Point of Sale Returns.

## Settings

- Added the option **"Hide the old settings for quantity tracking from the document term config"** in the Distribution Management settings, to remove the linked document's quantity-tracking group from the document term config settings.
- **Scheduled Task:** Improved the operation of a report-based scheduled task so that the report format is selected in the email sent (... - html - pdf).
- Added the ability to define a permission that disallows viewing list screens but allows searching by being present in the field whose data needs to be entered.
- Allowed deleting reviewed files and documents directly through DeleteFromFile

## General Improvements

- Added the ability to send the printout of documents and files directly as an email - as was already done for reports.
- Added the ability to add a widget with indicators for reading server performance - database - remaining RAM - number of processors and load on the server, in order to avoid problems and system downtime for customers, especially large ones.

## Reports

- In the LedgerTrans table, the field **"id_firstAuthor"** always equals Null, so a report including the transaction creator cannot be made because of this.
- Made the permission of system reports match the group.

## Fixes

### Inventory
- Fixed an issue where, in the Consolidated Issue Request screen, in the details Issue Request field, clicking the search icon, selecting more than one issue request, and then clicking Insert at the end inserted them but with the request number only, without any data.
- Fixed an issue where coding an item with a manual item code that is a version code of another item showed the message "The operation cannot be performed", when the error message should instead have clarified that the item code is a version code of item number ......

### Sales
- **Sales Invoice:** Fixed an issue where, in the details, the "Copied From Document" field, when more than one document was selected, inserted all of the documents' details in full, and inserting again added on top of what had already been inserted.
- **Price Lists:** Fixed an issue where entering a minimum price and a maximum price of 10 and 15 respectively, with a default price of 14, caused the system, upon saving, to change the minimum and maximum price to 14, the default price.

### Purchasing
- Fixed an issue where, for one customer, the Vendor file had a group called "Vendors" that currently performed automatic coding whenever a vendor was added to it, and deleting it showed the message "The operation cannot be performed".

### Manufacturing
- **Production Execution Document:** Fixed an issue where saving with the option **"Deliver product automatically"** checked showed the error message "Product type cannot be left empty", referring to the lines, even though the lines do not contain a field called Product Type.

### Point of Sale
- Fixed an issue where the stock-taking event did not affect the shift totals.
- Fixed an issue where, for an item whose price was set with a larger unit in the price list, entering this item for the first time in Point of Sale inserted it with the unit found in the price list; if the user then changed the unit, the system did not change the price accordingly, and when the user changed the quantity, the system corrected the price.
- Fixed an issue where adding a translation for some fields (Price Selector 1 ... Price Selector 5) in Point of Sale did not change the translation from Arabic to English and vice versa when switching from the Arabic interface to English and vice versa.
- Fixed an issue where the user could use a machine payment method even though the option **"Used with the Point of Sale program"** was not checked in the Payment Method file.
- Fixed an issue where recalling an old invoice disabled all fields of the window, and if the user, while still in the old-invoice mode, opened one of the held invoices, the system opened the held invoice in the same old-invoice mode, meaning all fields were disabled.
- **Returns Invoice:** Fixed an issue where the price disappeared when the quantity was changed.
- Fixed an issue where the system gave the shift closing date the same date as the shift opening date, which caused errors when a shift extended past the current day.
- Fixed an issue where the system recorded both the shift opening time and the shift closing time as the same closing time.
- Fixed an issue where the system gave the shift opening date and time the same date and time as the shift closing.
- **Shift Opening Window:**
  - The label **"Shift Time"** should have been **"Shift Start Time"**.
  - The label **"Date"** should have been **"Shift Start Date"**.
- **Shift End Window:**
  - The label **"Shift Time"** should have been **"Shift End Time"**.
  - The label **"Date"** should have been **"Shift End Date"**.
- Fixed an issue where the user could enter a discount on the invoice while still collecting the full amount from the customer, using the following method:
  - Inserting the items to be sold.
  - Entering a discount on the invoice without moving the cursor out of the discount field.
  - Pressing (F5) or the Payment icon, upon which the system showed the payment screen without discounts, so the invoice amount could be collected from the customer without a discount, while the invoice would be recorded in Nama with a discount.
- Following the same idea, the following could also be done:
  - Inserting the items to be sold.
  - Entering a discount on the invoice, then pressing Enter (Enter) so the discount's effect on the invoice value appears.
  - Entering the value (0) in the discount field, taking care not to move the cursor out of the field.
  - Pressing (F5) or the Payment icon, upon which the system showed the payment screen still accounting for the discount, even though the discounts had been cancelled from the invoice.
- Fixed an issue where the option **"Transaction number required"** found in the **"Payment Method"** file did not work in Point of Sale.
- Fixed an issue where, when issuing a sales invoice with the default payment type, the system did not insert the payment method in the payment methods window of the resulting Point of Sale invoice in Nama; and when the invoice was paid using more than one payment method, the system inserted all payment methods except the automatic-value line, where it inserted the value but did not insert the payment method in the (Payment Method) field.
- Fixed an issue where, when issuing a return invoice, the resulting Point of Sale Return invoice in Nama - Payment Methods page inserted the amount without inserting the payment method (Cash).
- Fixed an issue where the system allowed the user, in the Multiple Payment window, to enter a transaction number without entering a value for the corresponding payment type.
- Fixed an issue where, when opening the (Item Price Inquiry) window and searching by the **"Item Code"** field, it was not possible to select one of the items and then click the **"OK"** button to have the system display the price; instead, the user had to enter the item manually or via barcode to view the price.

### Banks
- **Letter of Guarantee Amendment Voucher:** Added toDate.toValues to the initial group instead of values.toDate.
- **Letter of Guarantee Amendment Voucher:** Fixed an issue where, upon selecting the letter of guarantee to be amended, the (Expiry Date) information that should appear when selecting the guarantee to be amended, before saving, did not appear.

### Letters of Credit
- Fixed an issue where creating an Expense Voucher for a shipment that had no preliminary invoice saved the document without creating a system journal entry; the correct behavior is to prevent saving and show a message that the shipment on the Expense Voucher has no preliminary invoice.

### Real Estate
- **Project Contract:** Fixed an issue where the accounting effect of contracts on the lines did not work correctly with (Not Applicable To).
- Fixed an issue where creating a Project Extract with the Based On field set to Execution did not pull the data, and an empty message was then shown.

### Contracting
- Fixed an issue where the option that allows seeing projects that have been deactivated in reports and elsewhere did not work in the suggestion screen (when typing part of the name or code and pressing the down arrow).

### Accounting
- Fixed an issue where saving a Payment Voucher with financial-paper coding, where the paper's data was incomplete, did not show a correct error message but an empty one.
- Fixed an issue where, in the Financing Request screen, placing the cursor on the Amount field in the lines automatically deleted the value.

### Service Center
- **Product Screen:** Fixed an issue where the Services link did not work.
- **Job Order:** Fixed an issue where, in some cases, both the Create Customer Invoice button and the Create Warranty Invoice button worked incorrectly.

## General Fixes

- Fixed an issue where the system did not take the book and term config into account when printing.
- Fixed an issue where a document that had an attachment could not be deleted.

## Reports

- Deleting a report and then restoring it shows an empty error.
