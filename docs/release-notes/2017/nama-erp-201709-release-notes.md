# Nama ERP Release Notes - September 2017

::: info Release Information
**Release Date:** September 2017  
**Release Number:** 201709
:::

## Additions

### Sales
- Added the ability to search the fields (Version, Size, Color) on the main Quotations page in Sales.

### Purchasing
- Added the Payment grid to the Purchase Invoice, as it already exists on the Sales Invoice, and added the options (Cash Receipt, Customer Debit Notes, Journal Voucher, Bank Transfers).

### Banks
- **Financial Papers window:** Made the Drawer field take its value from the related party when the paper is incoming, and made the Beneficiary field take its value from the related party when the paper is outgoing.

### Contracting
- **Project Contract and Subcontractor Contract:** Added the two fields **"From Date"**, **"To Date"** to the Employees grid.
- **Extracts:** Added the following fields:
  - The Current field on Extracts is calculated as (the quantity from the Quantities minus the quantity from the Extract) present on the contracts.
  - Work Value = Total to Date * Unit Price.
- Added the documents (Daily Engineering Works document, Equipment Statement document, Serky document).

### Human Resources
- Added the ability to reissue more than one Salary record at the same time.
- **Medical Insurance:** Added the field **"Insurance Cost for the Month"** to the document details, next to the Insurance Cost for the Day field, on each of:
  - Insurance Company Approval voucher
  - Employee Insurance Addition Requests
  - Employee Insurance Addition vouchers
  - Adding an Insurance Upgrade Request
  - Insurance Upgrade vouchers
  - Employee Insurance Removal Request
  - Employee Insurance Removal voucher
- Added the option **"Employee's Last Salary Voucher Before Service Termination"** to the employee's Salary voucher.
- Added an option for this voucher to be the employee's Service Termination voucher; when selected, all unpaid installments of this employee's loans are aggregated.
- Added the Workplace to the **"Update Employee Data"** voucher, and also added the Workplace for each period on the line of the Salary voucher, so it can be used in the accounting effect: field from the line - field name; this way the Update Data voucher is used instead of an Update Workplace voucher.

### Point of Sale
- Improved the use of the (ESC) key so it closes the following windows when they are open:
  - Customer Search window
  - Currency Search window
  - Salesperson Search window
  - Point of Sale Table Search window
  - Previous Invoice Search window
  - Item Search window via the Item field
  - Item Price Search window
  - Warehouse Search window
  - Location Search window
  - Payment window
  - Multi-Search window
  - Calculator window
  - Multi-Payment window
  - Data Transfer Errors window
  - Data Statistics window
  - Font Editing window
- Improved the main windows such as (the Main window, Receipts, Payments, Return, Exchange, Transfer Request .....) so that, when the (ESC) key is used, the system does the following:
  - Deletes the entered data and shows a confirmation message, provided there is data and the permission is available.
  - Returns to the Main window when there is no data.
- Added the option **"Add Shelf Fields"** to the Point of Sale settings.
- The user is now prevented from issuing an Exchange invoice where all the items are sold, or all the items are returned.
- Lines are now removed from price lists that contain an item marked **"Do Not Transfer to Point of Sale"** before they are transferred to Point of Sale, and likewise for offers, if any.
- Improved Point of Sale so it reads the following records (after the first time) within only 100 milliseconds if there is data to read.
- Added the option **"Do Not Transfer to Point of Sale"** inside the Item file.

### Letters of Credit
- Added attachments to the Letter of Guarantee.

### Manufacturing
- Changed the order of the dimensions in the details of the Production Execution document to match the rest of the system (L * W * H).

## Settings

- **Criteria-Based Validation:** Added the following improvements:
  - Showed the (applyAlsoTo) field, which allows selecting a list of types.
  - Added the ability to apply it to (documents, files).
- Improved so the upgrader closes after the version download finishes, and it no longer asks about emptying the temp folder, emptying it directly without asking.
- **Alerts:** Added a query and result columns, to allow creating an alert from the query results.

## Fixes

### Inventory
- **Inter-Company Stock Transfer:** Fixed an issue where the system allowed saving an Inter-Company Stock Transfer even when there was no intermediary account in the company transferred from or to, after which the processing failed; the correct behavior is to show the error message (An intermediary account must be added to the companies to perform an inter-company stock transfer).
- Fixed an issue in the Item-Warehouse Linking file where, when linking an item to a warehouse with the link type **"Allow Dealing"**, the item was linked to that warehouse as well as to the rest of the warehouses, whereas it should only be linked to the warehouse it was linked to; the correct behavior for the **"Allow Dealing"** link type is to link the item to the intended warehouse only and prevent dealing with the rest of the warehouses.
- Fixed an issue where starting a Stock Taking showed the error message "a Stock Taking cannot be started because there are Stock Issue and Stock Receipt vouchers", even though reviewing the date found no such Issue or Receipt vouchers.
- Added five Item Classifications to the files and used them on items (Unicreate).
- Fixed an issue where an item linked through Item Relations on the Sales Order was inserted without multiplying the price by the quantity to give a total price.
- Fixed an issue where, in some cases, the conversion factor between units relied on the lowest price instead of the default price.
- Fixed an issue where, in some cases, creating an Additional Receiving Costs voucher based on a Purchase Invoice showed the error message that the item did not exist on the invoice, even though it did.
- Fixed an issue where the tree view did not work correctly in the Keywords file.

### Sales
- Fixed an issue where creating a Sales Return on a Sales Invoice that had free items did not work.

### Accounting
- Fixed an issue where, when creating a Debit Note document in a foreign currency, the local-currency value was calculated correctly on the document, but the system journal entry treated the foreign-currency value as if it were the local-currency value and did not copy the conversion factor.
- Fixed an issue where, in some cases, opening the Purchase Order did not open, showing the message "the operation could not be performed".

## Settings

- Fixed an issue where creating a permission line without a Type or a List of Types gave the user full permissions.
- Added the option **"Price Includes Tax"** to Global Config.

### Point of Sale
- Fixed an issue where the system allowed saving a Stock Transfer Request document without items, and also allowed transferring it to Nama even though it had no items.
- Fixed an issue where, on the Shift Closing window, the system did not let the user enter the cash value and only showed Credit Cards.
- Fixed an issue where the system allowed editing a previous invoice through the following steps:
  - Recalling a previous invoice
  - Editing its items, whether by adding, editing, or deleting
  - Editing the remark
  - Clicking the New Invoice icon
- Fixed an issue where the system allowed paying out a Debit Note more than once, which allowed cash to be withdrawn from the drawer without entitlement; this was done by entering the notice number directly into the Notice field on the Payment window instead of entering it through the search window.
- Fixed an issue where the user could, through the Multi-Payment window, pay an amount less than or greater than the invoice value, by following these steps:
  - Inserting the invoice's items
  - Opening the Multi-Payment window
  - Changing the cash-paid value to a lower or higher amount
  - Entering letters instead of numbers in any of the payment methods
  - Clicking the Confirm button, after which the system accepted the invoice with the incorrect value.
- Fixed an issue where, when creating more than one Return for the same invoice, the system allowed the second return to increase the returned quantity; for example, if the item quantity was 10 and 5 were returned on a Return invoice, the user could create another return for the same invoice increasing the item quantity to 8.
- Fixed an issue where the system no longer showed the book values on Shift Opening and Closing.
- Fixed an issue where the system allowed entering discounts on exchanged items.
- Fixed an issue where the system had two incorrect labels, as follows:
  - "Create an Expense voucher for a Bank Notice"
  - "Credit Note"
- Fixed an issue where the system allowed creating an Exchange invoice without a reference invoice, with added items only.
- Fixed an issue where, when entering the actual values on the Shift for one payment method and then moving to enter the actual values for another payment method, the system deleted the previous value, requiring the user to press Enter after entering any value.
- Fixed an issue where the system allowed handling Notice vouchers through the Receipt window.
- Fixed an issue where, when closing a Shift that contained Exchange vouchers, the system did not advance the Point of Sale invoice number to stay in sync with the Sales invoices generated from the Exchange vouchers; so if the user then issued a Sales invoice with the same number (without using the ESC key), the system showed the message "operation not possible" because it was trying to issue an invoice with a number matching one generated from an Exchange voucher.
- Fixed an issue where, after recalling a suspended invoice, adding a remark to it, and then issuing it, the system did not save the remark, so it was transferred to Nama without it.
- Fixed an issue where the system did not allow inserting items into the Stock Transfer Request through Favorite Items.
- Fixed an issue where the system did not accept suspending an invoice when it had a table.
- Fixed an issue where the action to delete suspended invoices only deleted suspended Sales invoices, while not deleting suspended Return and Exchange invoices.
- Fixed an issue where the system did not accept entering the table code directly, requiring the user to enter the table code through search instead.
- Fixed an issue where deleting a line on the Sales invoice via the shortcut (Ctrl+Delete) deleted the last line, while on the Return and Exchange invoices the system deleted the first line.
- Fixed an issue where, when creating an Exchange or a Sales Return and entering the invoice code by inserting or typing it manually instead of through the search lens, the system correctly pulled in the invoice's items but then refused payment, showing the message that the invoice code was incorrect.
- Fixed an issue where the system allowed deleting all the items of a previous invoice that had not yet been transferred, and it was then transferred without any items.
- Fixed an issue where, when an invoice could not yet be transferred, the system allowed editing it and then attempting to transfer it; the transfer failed but the edits remained.
- Fixed an issue where the system allowed items on the invoice with a zero quantity.
- Fixed an issue where, when there was a line for a free item, the system added an extra line for that free item when transferring the invoice to Nama.
- Fixed an issue where the user could edit the quantities on a previous invoice, then post it to the system; it was posted, but the processing failed.
- Fixed an issue where the action (Create an Expense Item for a Bank Notice) did not work, always showing the message (Please enter the subsidiary).
- Fixed an issue where free-item offers (not on the invoice) did not work, whether item-based offers or group-based offers.
- Fixed an issue where, after applying a specific offer in Point of Sale and then disabling that offer via the **"Disable"** option, the system kept applying the offer.
- Fixed an issue where, when editing the offer's date so it was earlier than the current date, the system still applied the offer even though it no longer matched the current date.
- Fixed an issue where, when Sales and Return invoices were set up to create Stock Issue and Stock Receipt vouchers, Exchange invoices in this case only issued Return invoices while not issuing Sales invoices.
- Fixed an issue where the system did not transfer the creation date from Point of Sale to Nama on all Point of Sale documents.
- Fixed an issue where, after setting a Warehouse and a Location on the Machine file, the system pulled in the warehouse on the Point of Sale invoice as expected for the default warehouse, but did not do the same for the location, leaving the field on the invoice empty even though it was set as the default location on the Machine.
- Fixed an issue where, when inserting a warehouse that requires a specific location without inserting the location, the system accepted the invoice but did not transfer it to Nama.
- Fixed an issue where, when issuing a Payment document from Point of Sale with the payment type (From the Current Employee), the system deducted the payment amount from the Shift balance instead of from the employee's account when posting the Shift.
- Fixed an issue where, when Point of Sale was set up to consolidate invoices, the system did not transfer the invoices to Nama, only transferring the Shifts.
- Fixed an issue where, when the system was set up to create a Debit Note voucher, it did not create a Sales Return voucher in Nama, and therefore did not increase the returned quantity.
- Fixed an issue where an error occurred when applying an offer to the invoice's items and converting the item to free.
- Fixed an issue where, after changing the item's unit and getting the price for the new unit, the system gave the same price as the previously entered unit when selecting the item again with the default unit (problem Cash).
- Fixed an issue where the system was not aware of changes made to the Price List header, such as (To Date), (Disable), or Customer-Specific, and pulled in the price without considering the new changes.
- Fixed an issue where, after changing an item's price through the Price List and then waiting while Point of Sale kept running (no matter how long), if the user then inserted that item, the system pulled in the old price the first time, and only pulled in the new price from the second time onward.
- Fixed an issue where, when changing Point of Sale settings such as Show Total Quantities, Point of Sale was not affected by the change and the field intended to be shown did not appear.
- Fixed an issue where the system allowed an Exchange without a reference invoice, without entering items with negative quantities, so the invoice became like an ordinary Sales invoice.
- Fixed an issue where the system accepted closing a Shift with a negative actual value.
- Fixed an issue where the Customer Class was not transferred and was not taken into account in price lists and offers.
- Fixed an issue where Point of Sale data messages could not be viewed from their list in Nama.

### Human Resources
- Fixed an issue where the system did not apply income tax if the priority of the Tax salary component was equal to 1.
- **Update Employee Data document:** Fixed an issue where, for example, transferring the employee from branch (1) to branch (2) on 2017-01-01, then transferring the employee from branch (2) to branch (3) on 2017-01-12, caused Nama to calculate the employee's full salary twice.
- Fixed an issue where, on the Insurance Company Approval request and voucher, the Add Employee to Insurance request and voucher, and the Remove Employee Insurance request and voucher screens, the categories and the insurance cost did not appear, but the cost appeared once selected manually.
- Fixed an issue where, when a Delegation was automatically created for approvals along with the Leave voucher, and the substitute employee on the voucher was then changed, it was not changed on the Delegation.
- Fixed an issue where an error sometimes appeared when creating a Detailed Payment voucher based on a Payroll record and trying to add a new debit line (Salary Transfer Commission); removing the Payroll record from Based On made the document accept saving.
- Fixed an issue where the General dimensions were not read into Point of Sale, so items belonging to the General company, for example, were transferred with the Company dimension = Null.

### Letters of Credit
- Fixed an issue where, when duplicating an LC Expense voucher for an LC that had been closed, the system accepted saving the Expense voucher even though the LC was closed.

### Real Estate
- Fixed an issue where changing the term config on Sales Contracts showed an empty error message.
- Fixed an issue where, in some cases, an error occurred when deleting a Lease Contract.
- **Opening Sales Contract:** Fixed an issue where the system issued the journal entry incorrectly.

### Manufacturing
- Fixed an issue where the option **"Do Not Create Raw Material Lines from the Production Order"** only worked on the Raw Material Issue and Issue Request, and did not work on the Return and Return Request.
- Fixed an issue where an error occurred in processing the dimensions on the Stock Receipt voucher created from a Finished Product Receipt voucher.

## General Fixes

- Fixed an issue where, in Data Import, entering an incorrect "Entity Type" gave no error message at all.
- Fixed an issue where the system allowed deleting a Group, a Document Book, a term config, or a Fiscal Period even though records existed under that document book.
- Fixed an issue where inserting into a document's lines, when the number of entries was large — more than 300 entries, for example — showed the error message "the operation cannot be performed".
