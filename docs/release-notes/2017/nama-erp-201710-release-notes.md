# Nama ERP Release Notes - October 2017

::: info Release Information
**Release Date:** October 2017  
**Release Number:** 201710
:::

## Additions

### Inventory
- Added the option **"View Item Category Relations"** to the Distribution Management settings.
- Added delivery fields to the Stock Issue.
- Added the following changes to the Item file:
  - The ability to add the item to a specific price list via a button on the Item screen (Add Item to Price List); clicking the button opens the price lists so a specific price list can be chosen to insert the item into, and once a price list is chosen the item is inserted as the last item in that price list.
  - Notes about the item while inserting it:
    - Item Has Versions: check the option (Expand Versions When Selecting the Item).
    - Item Has Sizes: check the option (Expand Sizes and Colors When Selecting the Item).
    - and always check the option (Expand Units When Selecting the Item).
- Added the entity flow **"EAUniCreteGenItems"** to create items automatically through combinations of item categories.
- Added the sales, purchase and base units to the unit group (UniCrete).
- Added the screen - Electronic Stock-Taking Committee - for the StockTaking application.
- Added the ability to link Category 4 to Categories 3, 2 and 1.
- Improved the system so that the document the lines were copied from is tracked at the line level in Sales and Purchase documents and all Distribution documents.
- **Item: Prices - Sales Price Lists:** Added: Unit - Version - Invoice Category, in that order; the default order of price lists is by priority, from lowest to highest.

### Sales
- Created the entity flow **"EAUniCreteGenSalesInvoiceFromStockIssue"** which creates a Sales Invoice from the Stock Issue with the issued quantity, plus the service items in the Sales Order according to quantity, based on the Sales Order (UniCrete).
- Copied the price dimensions from invoices with "based on".
- In Sales documents, added three fields on the line: Supply Rate, Supply Start Date and Supply Period (UniCrete).
- In the Sales Order and Sales Invoice, the price of additional items is now inserted automatically as soon as the main item is chosen.
- **Price List:** Added the following options:
  - Expand Versions When Selecting the Item
  - Expand Units When Selecting the Item
  - Expand Sizes and Colors When Selecting the Item
- **Price List:** Added the button Expand Selected Line Data. How it works: if one of the options is checked, it expands all the item's data into the selected line; also, if one of the options is checked and an item is then chosen in the lines, the item's data is expanded automatically without clicking the button.
- When creating price quotations on the category or department such that the system inserts a free item for the lowest-priced item, the system now inserts the free item for the highest-priced item instead.
- Added 5 categories to the Sales Invoice for price lists and offers.

### Purchasing
- Created two entity flows, one for curing and the other for transport, which create two Purchase Invoices from the Sales Invoice — one for the transport service and another for curing (UniCrete).
- **Purchase Invoice:** Improved so that when a Disbursement Receipt is chosen as the payment document, the system makes the Amount field (in payment documents) come from the amount found in the Disbursement Receipt, and added filtering by customer in Disbursement Receipts.

### Auditing
- Made changes to the Law Articles screen.
- Separated the Procedures - Control and Basic - and everything linked to them into a standalone Control and a standalone Basic.
- Added the screens (Law, Chapter, Article, Regulations, Chapter, Article, Circulars, Law Circulars, Regulation Circulars).

### Letters of Credit
- **Expense Item:** Added the Portfolio Type next to the Credit Side, as well as adding the Currency.
- **Expense Vouchers:** The Currency, Credit Side, and Portfolio Type fields, previously defined in the Expense Item, are now filled in when the Expense Item is chosen.

### Contracting Maintenance
- Added the following changes to the Tender - Labor:
  - Added the field Monthly Overtime (Overday) = Fixed Salary + Non-Fixed Salary + Monthly Cost.
  - Changed the formula of the field (Total Monthly Salary) = Monthly Overtime (Overday) × Number of Workers.
  - Service allocations onto the Tender items.
- Added the following changes to the Tender - Main:
  - The Tender field is mandatory; once chosen, the Tender Duration field is filled in, the chosen Tender items are tracked in the Distribution document, and an item outside the Tender cannot be chosen.
  - The ability to add a number of services, provided that only the listed services are used in the distribution over the Tender items.
  - After saving, editing is prevented on the service items used in the distribution.
  - Monthly Cost and Total Contract Duration Cost are fields holding the total found in the Tender items.
  - Added the Category field after the Count field on every page of the document; it is the Units file.
- **Contracting Maintenance: Distributing Services over Tenders:** Created a document to distribute the value of services over the Tender items.
- **Tenders:** Changed the formulas according to the attachment.
- **Main:** The item totals are now shown automatically through the items that have values in the Tender, divided into items by the item type previously defined.
- **Operation and Maintenance Items:** Reviewed the totals after the change because they were incorrect and the labels were reversed.
- **Equipment and Tools Items:** Added the Equipment file on the line, noting that when an Equipment file is chosen, the Code field cannot be typed into manually.
- **Contracting Maintenance Settings:** Added a mechanism for the allowed decimal places within the Contracting Maintenance module.

### Human Resources
- Added two entity flows, one to set the creation date to the start of the day and the other to the end of the day, as follows:
  - EASetCreationDateToStartOfDay
  - EASetCreationDateToEndOfDay
- Added the section **"Handling Overtime for Days with More Than One Holiday (Weekly - Official - Leave)"** to the HR settings to handle a day falling under more than one type of leave; it contains the following fields:
  - Official Holiday and Weekly Holiday.
  - Official Holiday and Leave
  - Weekly Holiday and Leave
  - Official Holiday, Weekly Holiday and Leave
- **Termination of Service Voucher:** The employee's status is now changed only when the work end date matches today's date.
- Created a mechanism for employee promotion to know the salary components from date to date, with the ability to have approvals on that upon promotion.
- Removed the choice list **"Performance Rate"** from the Performance Indicator file since there is a list serving the same purpose in the Formula file.
- **Social Insurance:** Added the (Fixed - Variable Insurance Basic) found in the Job Offer to the (Fixed - Variable Insurance Base).
- **Salary Voucher:** Sometimes the Lateness component does not get reflected in the voucher.
- Added an option to the HR settings so that every step of the salary calculation is logged in the log file, to detect processing errors more quickly.

### Manufacturing
- **Production Order:** Made the Warehouse field not required in the Production Order.
- **Product Delivery:** Made the warehouse copied on the delivery the delivery warehouse on the lines in Production Execution.
- Added the option **"Copy the Warehouse from the Production Order Lines to the Raw Material Return Lines"** to the Manufacturing settings.

### Service Center
- Linked the Sales Order line to the Job Order line.

### Customer Relationship Management (CRM)
- Added the discussion date and time inside the Development Request and the Ticket.

### Banks
- Created the entity flow **EAReverseLedgerTrans**, which can cancel the journal entry of any voucher via a field inside the voucher.
- Added the Short Entry feature inside the Letter of Guarantee Issuance term config.
- Added a dedicated attachment field to each of the documents (Letter of Guarantee Amendment, Letter of Guarantee Closing, Letter of Guarantee Delivery, Letter of Guarantee Issuance, Letter of Guarantee Receipt).

### Point of Sale
- Added the option **"Return It Without Reducing the Commission on the Original Invoice"**; if the invoice was paid with a payment method on which this option is checked, it must also be present on the Return, and with the same payment ratio (the ratio of the amount paid to the invoice total).
- Added the ability, when browsing Sales Returns and Exchanges, to search by the Sales Invoice code in addition to searching by the document's own code.

### Real Estate
- Added an option inside the document term config **"Allow Non-Opening Accounting Periods in the Opening Sales Contract"**.

## Settings

- Developed very major changes to the way taxes and discounts are calculated.
- Added the Apply Query and Do-Not-Apply Query to the entity flow, in addition to the Apply Criteria and Do-Not-Apply Criteria; the same data was also added to the lines.
- Added the grid for the ordering fields on the Edit Choice List page.
- Added attachments to all the system's documents.
- Added the ability to write the description formula in the document term config, either as a template, an SQL query, or plain text, alongside every accounting side.
- Added the ability to code archival documents from inside the groups, so that there is an alternate code, in a different coding format, alongside the main code.
- Added the following options to the Global Config:
  - Tax 1 Value for the Total, Not per Unit
  - Tax 2 Value for the Total, Not per Unit
  - Tax 3 Value for the Total, Not per Unit
  - Tax 4 Value for the Total, Not per Unit
- Added the entity flow **EAShortenLedger** to shorten journal entries when there is a voucher without the option in the term config.

## Reports

- Made system screens' forms lower priority so they only print when no other form exists.
- Added an option to prevent editing system reports.
- Cleared the Report Catalog data when duplicating a report.
- Developed printing so that the PDF file name for printing documents (Sales Invoices, for example) is the document's own code rather than the print form's code.

## Fixes

### Inventory
- Fixed an issue in the Combined Issue Request screen where, in the Details, Issue Request field, clicking the search icon, choosing more than one issue request, and then clicking Insert would insert them with only the request number and no other data.
- Fixed an issue where coding an item with a manual item code that was actually a version code of another item showed the message "Operation cannot be performed"; the error message should instead state that the item code is a version code of item number ......

### Sales
- **Sales Invoice:** Fixed an issue where, in the Details, Copied From Document field, choosing more than one document inserted all of the documents' details in full, and inserting again added on top of what had already been added.
- **Price Lists:** Fixed an issue where entering a Minimum Price and Maximum Price of 10 and 15 respectively with a Default Price of 14 would, on saving, move the Minimum Price and Maximum Price to 14.

### Purchasing
- Fixed an issue where, for one customer, a group named Vendors in the Vendor file was doing automatic coding whenever a vendor was added to it, and deleting the group showed the message "Operation cannot be performed."

### Manufacturing
- **Production Execution Document:** Fixed an issue where saving with the option **"Deliver the Product Automatically"** checked showed the error message "Product Type cannot be left empty," referring to the lines, even though the lines have no field named Product Type.

## Settings

- In required fields based on a condition on the lines, e.g. (Account equals X), the condition applies to all the lines rather than only the line that satisfies the condition; the correct behavior is for it to apply only to the line that satisfies the condition.

### Point of Sale
- The Stock-Taking event does not affect the shift totals.
- When inserting an item whose price was set with a larger unit in the price list: the first time this item is entered at the POS, the system inserts it with the unit found in the price list; if the user then changes the unit, the system does not change the price accordingly, and when the user changes the quantity, the system corrects the price.
- When a translation is added for some of the fields (Price Dimension 1 ... Price Dimension 5) at the POS, the system does not switch the translation from Arabic to English and vice versa when switching from the Arabic interface to the English one and vice versa.
- The user can use a machine payment method even though the option **"Used with the POS Program"** is not checked in the Payment Method file.
- When recalling an old invoice, the system disables all the fields of the window; if the user, while in old-invoice mode, then opens one of the held invoices, the system opens the held invoice in the same old-invoice mode, meaning all the fields remain disabled.
- **Return Invoice:** the price disappears when the quantity is changed.
- The system gives the shift's closing date the same date as the shift's opening date, which causes errors when the shift extends past the current day.
- The system records the shift opening time and the shift closing time, both as the shift closing time.
- The system gives the shift opening date and time the same date and time as the shift closing.
- **Open Shift Window:**
  - The label **"Shift Time"** should be **"Shift Start Time"**.
  - The label **"Date"** should be **"Shift Start Date"**.
- **Close Shift Window:**
  - The label **"Shift Time"** should be **"Shift End Time"**.
  - The label **"Date"** should be **"Shift End Date"**.
- The user can enter a discount on the invoice and still collect the full amount from the customer, as follows:
  - Insert the items to be sold
  - Enter a discount on the invoice without moving the cursor out of the Discount field
  - Press (F5) or the payment icon; the system shows the payment screen without discounts, so the invoice value can be collected from the customer without a discount, while Nama records the invoice with a discount.
- With the same idea, the following can also be done:
  - Insert the items to be sold
  - Enter a discount on the invoice, then press Enter so the discount's effect shows on the invoice value
  - Enter the value (0) in the Discount field, taking care not to move the cursor out of the field
  - Press (F5) or the payment icon; the system shows the payment screen taking the discount into account, even though the discount has been cancelled from the invoice.
- The option **"Transaction Number Required"** found in the **"Payment Method"** file does not work at the POS.
- When issuing a Sales Invoice with the default payment type, the system does not insert the payment method into the Payment Methods window of the resulting POS invoice in Nama; and when the invoice is paid with more than one payment method, the system inserts all the payment methods except the automatic-value line, where it inserts the value but does not insert the payment method into the (Payment Method) field.
- When issuing a Return Invoice, on the POS Return Invoice in Nama - Payment Methods page, the system inserts the amount without inserting the payment method (Cash).
- The system allows the user, in the Multiple Payment window, to enter a transaction number without entering a value for the corresponding payment type.
- When opening the (Item Price Inquiry) window, searching in the **"Item Code"** field does not let the user choose an item and then click **"OK"** for the system to display the price; instead, the user must enter the item manually or by barcode to view the price.

### Banks
- **Letter of Guarantee Amendment Voucher:** Added toDate.toValues to the first group instead of values.toDate.
- **Letter of Guarantee Amendment Voucher:** When choosing the letter of guarantee to be amended, the (Expiry Date) information, which should appear when the guarantee to be amended is chosen and before saving, does not appear.

### Letters of Credit
- When making an Expense Voucher for a Lot that has no preliminary invoice, the document is saved without creating a system journal entry; the correct behavior is to prevent saving and show a message that the Lot in the Expense Voucher has no preliminary invoice.

### Real Estate
- **Project Contract:** The accounting effect of contracts on the lines does not work correctly with (Does Not Apply To).
- When creating a Project Extract, in the Based On Execution field, the system does not fetch the data and an empty (blank) message then appears.

### Contracting
- The option that allows seeing deactivated projects in reports and elsewhere does not work in the suggestion box (when typing part of the name or code and pressing the down arrow).

### Accounting
- When saving a Disbursement Voucher with Financial Paper coding where some paper data is missing, a correct error message does not appear; instead, an empty message appears.
- In the Financing Request screen, standing on the Amount field in the lines automatically deletes the value.

### Service Center
- **Product screen:** The Services link does not work.
- **Job Order:** Sometimes both the Create Customer Invoice button and the Create Warranty Invoice button work incorrectly.

## General Fixes

- Fixed an issue where the system did not take the ledger and term config into account when printing.
- Fixed an issue where a document with an attachment could not be deleted.

## Reports

- Fixed an issue where deleting a report and then restoring it showed a blank error.
