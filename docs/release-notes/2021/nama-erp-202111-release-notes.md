# Nama ERP Release Notes - November 2021

::: info Release Information
**Release Date:** November 2021  
**Release Number:** 2021.11  
**File Size:** 228.1KB  
:::

## Additions

### Inventory

● **Item Quantities for Customer window**: A grid for multiples was added.

● **Multiple Aggregation voucher**: Three date fields were added to the line.

● **Aggregation Method document**: The Issue and Receipt Location were added to the Header, and a new grid was added with 5 each of (N, Ref, text, date).

● **Stock Transfer Request**: Attachments were added to the window.

● **Item Classification file**: The following fields were added to the Item Classification files:
  - Body Type
  - Number of Passengers
  - Vehicle Load Capacity
  - Liter Capacity

● **Item Section file**: Attachments were added to the Item Section file.

### Purchasing

● **Purchase Invoice, Purchase Order**: The option **"Do Not Affect the Remaining Amount"** was added to the "Payment Vouchers" table.

### Sales

● **Invoice Offers**: Developed a procedure to apply the offer (a discount percentage on the lower-priced item) before saving the invoice, so the cashier can know the invoice amount to collect before saving.

● The option **"Do Not Affect the Remaining Amount"** was added to the "Payment Vouchers" table in the Sales Invoice.

● **Sales Returns**: The button **"Distribute the Return Value Over All Unsettled Installments"** was added, so that the system — after deducting the return value — uses this button to redefine the new installment values over the remaining installments in equal proportions.

● **Discount Coupons**: Added the ability for a coupon to be (a discount percentage on the invoice) with a maximum limit — for example, a coupon of 10% with a maximum of 200 riyals.

● **Discount Coupons**: The two procedures **"Apply Discount Coupons"** and **"Apply Offers and Discount Coupons"** were added to the More menu on the Sales Invoice.

● **Payment Schedule Template**: The option **"First Payment Date Is the Voucher Date"** was added.

● **Sales Invoice, Sales Order**: The option **"Do Not Affect the Remaining Amount"** was added to the "Payment Vouchers" table.

### Accounting

● In one of the releases, an error message appears when trying to access Accounts.

### Project Management

● The option **"Create an Accounting Effect Only for Approved Lines"** was added to the term config settings of each of:
  - Task Execution document
  - Task Execution Approval document

### Fixed Assets

● The table **"Purchase Terms"** was added to the Details page, as it exists in the Purchase Order screen, in the following documents:
  - Fixed Assets Purchase Order
  - Miscellaneous Purchase Order

● **Fixed Assets Purchase Order - Document Term Config**: Tax settings were added (Subject to Tax, Allow Editing the Invoice Tax on the Line, Tax Can Be Edited, Tax Policy), and the tax is copied to the Assets Purchase voucher based on the Assets Purchase Order.

● 5 text fields and 5 boolean fields were added on the line in the Fixed Asset Opening document.

### Project Management

● The following two fields were added to the Project Invoice term config:
  - Debit Calculated Value Without Expenses
  - Credit Calculated Value Without Expenses

● A new window was added named **"Procedure"**.

● A new list (View List) of Procedures was added to the **"Project Task"** window.

● The fields **"Procedure"**, **"Next Procedure"**, **"Next Procedure Date"** were added to the lines of the Task Execution voucher.

● The field **"Procedure Group"** was added within the term config of the Task Execution voucher.

### Banks

● **Bank window**: The Bank was converted into a Subsidiary, so Subsidiary accounts can now be defined within the Bank file.

### Service Center

● **Sub-Item documents**: The following fields were added to the term config options in the Sub-Item documents:
  - Copy the First Tax Percentage from the Sub-Item
  - Copy the Second Tax Percentage from the Sub-Item
  - Copy the Third Tax Percentage from the Sub-Item
  - Copy the Fourth Tax Percentage from the Sub-Item
  - Copy the First Tax Percentage to the Sub-Item
  - Copy the Second Tax Percentage to the Sub-Item
  - Copy the Third Tax Percentage to the Sub-Item
  - Copy the Fourth Tax Percentage to the Sub-Item

● **Sub-Item file - Statistics page**: The following two fields were added:
  - Third Tax
  - Fourth Tax

● **Sub-Item file**: The following fields were added to the Sub-Item file:
  - Body Type
  - Number of Passengers
  - Vehicle Load Capacity
  - Liter Capacity

### Customer Relationship Management (CRM)

● **Machine file**: Added the following:
  - In the "Warranty Status" list, the statuses (Preliminary, In Warranty, Out of Warranty) were added
  - 10 Boolean fields
  - 10 attachment fields

### Real Estate

● **Lease Contract**: The option **"Do Not Multiply the Expense Value by the Period"** was added to the Expenses grid lines.

● **The Sales Contract and the Preliminary Sales Contract**: The following fields were added to the Payments lines:
  - Merged Value 1
  - Merged Value 2
  - Merged Value 3
  - Merged Value 4
  - Merged Value 5

● **The Sales Contract and the Preliminary Sales Contract**: The following fields were added to the term config:
  - Debit Merged Value 1
  - Credit Merged Value 1
  - Debit Merged Value 2
  - Credit Merged Value 2
  - Debit Merged Value 3
  - Credit Merged Value 3
  - Debit Merged Value 4
  - Credit Merged Value 4
  - Debit Merged Value 5
  - Credit Merged Value 5

● The field **"Planned Visit Date"** was added to each of the following documents:
  - Maintenance Invoice
  - Maintenance Order
  - Maintenance Notice

● The field **"Planned Visit Date"** was added to the Machines lines for each of the following documents:
  - Maintenance Invoice
  - Maintenance Order
  - Maintenance Notice
  - Maintenance Contract
  - Maintenance Work Plan

### Customer Relationship Management (CRM)

● A new document was added named **"Maintenance Invoice Return"**.

● A new document was added named **"Maintenance Assay"**, which contains approximately the same content as the Maintenance Invoice, so that a Maintenance Invoice can be issued based on it.

● **Machine Type file**: Spare-parts-specific details were added to the "Machine Type" window.

● 10 attachment fields and 10 boolean fields were added, which can be added by customizing the screen, to each of the following files:
  - Pre-Parking Inspection
  - Maintenance Contract
  - Maintenance Visit
  - Maintenance Order
  - Maintenance Work Plan
  - Maintenance Notice
  - Maintenance Invoice

● A new file was added named **"Visit Status"**.

### Human Resources

● **Salary Voucher**: The field **"Remarks 2"** was added, to appear in the System Journal Entry in Narration 2.

● **Bulk Residence Renewal Request and Residence Renewal Request**: 5 ref fields and 5 description fields were added to the lines, to be copied from the Bulk Residence Renewal Request to the Residence Renewal Request when it is created.

● Added the document **"Weekly Rest and Official Holiday Balance Allowance"**.

● **Payment Settlement Request**: The Transaction Type was added to the lines so that a request can be made with more than one transaction type, and Remarks were also added to the line.

### Hospital Management System

● **Room window**: The option **"Do Not Create a Supervision Invoice for the Room"** was added.

● A grid for selecting Medications was added inside the Examination Invoice, containing the information (Item, Dosage, Remarks).

### Project Management

● **Project Invoice**: The fields (Tax 2, Tax 3, Tax 4) were added to the invoice lines, and their accounting effect was also added to the document's term config.

● **Project Invoice**: 5 text fields and 5 numeric (n) fields were added.

### Contracting

● **Analysis Card**: The field **"Select"** was added to the Raw Materials lines, for selecting the lines to be converted to a Subcontractor Contract; the button (Convert to a Subcontractor Contract with the Selected Lines Only) was also added, as it already exists in the Assay document.

● **Contracting Material Issue document**: The option **"Do Not Copy the Contract Terms When Selecting It"** was added to the document's term config.

● **Contract Extract and Subcontractor Extract**: The option **"Consider the Accounting Percentage When Calculating the Extract's Total Price"** was added to the document's term config.

● **Analysis Card**: The field **"Cost Field Copied from the Analysis Card Based On"** was added to the Contracting configuration.

● **Contracting Assay document**: A Contract Template field was added inside the Assay, for pulling the terms from the contract template, as is applied in the Project Contract.

● Added the "Payment Details" table and the "Payments" table to each of the following two documents:
  - Miscellaneous Purchase Order
  - Contracting Supplies Purchase Order

● **Analysis Card**: The following buttons were added:
  - The "Move Terms to Raw Materials" button on the main page
  - The "Move Terms to Labor" button on the "Labor" page
  - The "Move Terms to Other Expenses" button on the "Other Expenses" page

so that, when pressed, the terms are moved to the page corresponding to that same button.

● In each of the two documents **"Advance Project Payment"** and **"Advance Subcontractor Payment"**, the method **"A Percentage of the Amount Due with Each Extract"** was added to the "Payment Method" list.

● The two fields **"Paid via Vouchers"**, **"Remaining After Payment via Vouchers"** were added to each of the following documents:
  - Advance Subcontractor Payment
  - Other Subcontractor Payment
  - Advance Project Payment

In the document "Subcontractor Payment," when a Receipt Voucher is created, the amount is deducted from Paid via Vouchers. In the other two documents, when a Payment Voucher is created, the disbursed amount is added to the "Paid via Vouchers" field.

● In each of **"Contracting Supplies Purchase Order"** and **"Contracting Supplies Purchase Invoice"**, 4 attachments were added to the document header, in addition to the attachment that already exists.

● The grid **"Types for Which Terms Are Coded Manually"** was added to the Contracting configuration.

● The table **"Purchase Terms"** was added to the Details page, similar to what exists in the Purchase Order screen, in "Contracting Supplies Purchase Order".

● A new document was added named **"Labor and Equipment Issue Invoice"**.

### Manufacturing

● 3 ref fields were added to each of: the Product Components lines of the Production Order, and the Detail lines of the Product Components document.

### Point of Sale

● The field **"Company Logo Width"** was added to both the Machine and the Point of Sale configuration. It can be used to set the width suitable for the customer's screen size.

● The **"Edit Customer"** icon was added to the invoice, shown to those who have the Edit Customer permission.

● The Commands list — shown via the F12 shortcut — was reorganized to be better laid out, with the ability to search within it also added.

● **"POS Order Reservation Voucher"** was added to the grid of favorite documents in the Machine window.

### Settings

● **Recurring Documents window**: The ability to search in the Created Vouchers screen was added.

● **Recurring Documents window**: Line code ordering was added.

● **Print Forms and Reports**: The option **"Print Using the Direct Printing Application"** was added to the Global Config window, so that printing happens faster instead of showing several print-related windows.

● **Movement document**: The fields (package.details6 - package.details7) were added, along with their custody fields in the term config.

● **Send Documents to the Tax Authority document**: Improved so that when clicking **"Sign Documents Electronically"**, if an error occurs, the error is shown first, along with the Egypt Clearing information.

● Added the options (Not Subject to Tax 1 - Not Subject to Tax 2 - Not Subject to Tax 3 - Not Subject to Tax 4) to each of the following windows:
  - Customer
  - Vendor
  - Owner - Buyer
  - Subcontractor
  - All windows that are handled the same way as Customer and Vendor

● **Tax Authority Configuration**: The list **"Unit Price Source"** was added.

● **Task Schedule window**: The "Run Now" procedure was added to the More menu in the list view.

● Added support for sending SMS from the system with VictoryLink.

● Improved so that if a document is added manually and has already been correctly sent to the e-Invoicing system, saving is prevented.

### Mobile Applications

● A new screen was added to the app named Restore & Backup, containing a button that, when pressed, creates a compressed file of the data found in the app (database files and user data (username, password, device name or number, etc.)), after which a share option is shown through one of the email apps. When an email app is selected (such as Yahoo or Gmail), the created file is automatically added, along with the email address of the Development department at Nama Soft.

● A button named backup restore was added; when pressed, the device's storage is opened to select a .zip file, so it can be extracted and the data restored from it if the file is valid.

## Fixes

### Inventory

● **Stock Issue document**: Fixed an issue where, in some cases, deleting the document showed the message **"The operation cannot be performed"**.

● **Aggregation Voucher**: Fixed an issue where, when the option **"Copy Details"** was not checked in the document's term config, the details were still copied from the document based on the "Aggregation Request" even though it was not selected; also, the document's header fields were not copied in full. For example, the ref1 field in the header of the Aggregation Request voucher was not copied to the Aggregation Voucher when it was created based on it.

● **Aggregation Request voucher**: Fixed an issue where, on the Additional Expenses page, the "Value per Unit" column was not multiplied by the "Total Units" field column to get the total expense value for the line, in the "Value" field.

● **Distribution Management documents**: The option **"Prevent Cancelling a Reservation"** was added to the document's term config options. When this option is selected and a "Cancel Reservation" is performed at the same time, saving is blocked and an error message appears.

### Purchasing

● **Purchase Returns document**: Fixed an issue where, in the document's term config - Settings, when selecting Create Documents Automatically, the system allowed adding a book and term config for a Stock Receipt instead of a Stock Issue.

● Fixed an issue where, when creating a Purchase Invoice with an item quantity of 100 and creating a Stock Receipt based on it for 100, then increasing the invoice quantity by 40, increasing the receipt by 40 as well showed an error message.

### Sales

● Fixed an issue where, when converting a Lead into a customer and then deleting the customer, the error message **"The operation cannot be performed"** appeared.

### Accounting

● **Receipt Voucher**: Fixed an issue where, when creating a Receipt Voucher based on a Sub-Item Sales Invoice, the payments were not carried over to the Receipt Voucher, and clicking "Aggregate Payments From" also did not bring in the payments.

● **Receipt Voucher**: Fixed an issue where, in some cases, deleting a Receipt Voucher showed an error message.

● Fixed an issue where the system did not create an accounting effect for the Fee Value and the Fee Tax Value on a Cashier Receipt Voucher.

● **Debit Note**: Added the **"Tax Policy"** to the document's term config.

● **Debit Note**: Added the two fields **"Paid via Vouchers"**, **"Remaining After Payment via Vouchers"**.

### Contracting

● Fixed an issue where, when creating a Contracting Material Return document, the system did not deduct this return's value from the costs in the Execution.

● **Contracting Supplies Invoice**: Fixed an issue where an error appeared when selecting the Subsidiary.

### Manufacturing

● **Execution document**: The document has the following issues:
  - The system did not search the item's sizes when searching for it by the "Size" field
  - The system did not search the item's colors when searching for it by the "Color" field

● **Production Order Closing document**: Fixed an issue where, when saving the Production Order Closing document, the system did not record its actual date in the Actual Delivery Date field found in the Production Order document.

### Real Estate

● **Lease Contract**: Fixed an issue where the system did not correctly create the installments for the water expense in Lease Contracts.

● Fixed an issue where the rent installments in Opening Lease Contracts were not considered when issuing Bulk Collection Vouchers.

● **Lease Contract**: Fixed an issue where, in some cases, creating a new Lease Contract showed the error **"The operation cannot be performed"**.

● Fixed an issue where, in each of the **"Preliminary Sales Contract"**, **"The Sales Contract"**, and **"Sales Quotation"** windows, adding or changing the installment percentage starting from the second line in the Bulk Creation data caused the line to be automatically cleared and the percentage cancelled, with the error appearing that the operation could not be performed.

### Settings

● Fixed an issue where, when using a field in the window's Details as a Signature field and then opening that field, the image appeared empty, even though it worked correctly with the attachment field in the header.

● **Send Documents to the Tax Authority document**: Fixed an issue where, in some cases, when the invoice status was "Invalid" and the error was then fixed so it became "Valid" at the Tax Authority, it remained displayed in the window with the status "Invalid".

● **Send Documents to the Tax Authority document**: Fixed an issue where the system did not apply the filter on the documents in the document window correctly.

● Fixed an issue where the system did not allow sending an invoice with a customer of type Individual unless their ID card number had been registered in the system, even though the invoice value was less than 50,000 EGP.

### Human Resources

● Fixed an issue where the system did not take years with 366 days into account when calculating the End of Service Settlement.

● Fixed an issue where, in one case, the value of the Salary Components was calculated for the period 2021-10-01 to 2021-10-02, which is considered 2 working days, as the value of only 1 day.

● Fixed an issue where, in some cases, when setting a template for Narration 1 or Narration 2 on the accounting side, it did not appear in the System Journal Entry.

● Fixed an issue where creating a Vehicle Insurance voucher gave the message **"The operation cannot be performed"**.

● **Leave Voucher**: Fixed an issue where, in some cases, the system did not accept saving a Leave Voucher for an employee even though they had a leave balance.

### Banks

● Fixed an issue where, when importing a Bank Reconciliation Memo, the system imported the entire memo regardless of the number of lines, except for the last line.

● Fixed an issue where all messages containing "financial paper" were incorrect, and they were accordingly changed to "commercial paper".

● **Accounting Configuration window**: Fixed an issue where the following labels needed to change from "Financial" to "Commercial", and likewise in the corresponding English labels "financial" needed to change to "commercial" — they are as follows:
  - Create Financial Papers from the Payment Voucher
  - Create Financial Papers from the Receipt Voucher
  - Create Financial Papers from the Financial Paper Opening voucher
  - Do Not Suggest Values (Subsidiary - Value) from the Financial Paper in the Receipt and Payment documents

● Fixed some spelling mistakes in the Banks module, such as the labels (تم تسليمة instead of تم تسليمه, تم إصدارة instead of تم إصداره) in the Letters of Guarantee documents.

### Point of Sale

● Fixed an issue where the default price found on the Sizes and Colors lines of an item did not affect the Point of Sale when entering an item with a color and size. Changed so that the Point of Sale is now affected by the default price found on the Sizes and Colors lines.

● Fixed an issue where, when there was an error in the unit conversion factor in the Point of Sale, the invoice was not transferred to Nama as a draft, as is normally expected.

● Fixed an issue where, in the Point of Sale on the Machine, enabling one of the forms while a QR code was present showed an error.

● Fixed an issue where updating the errors from the Machines showed an error.

● Fixed an issue where, in the Nama Data messages, the column (Failed on Some Machines) always came back as Yes, even when no failure occurred and the data was transferred successfully.

### Project Management

● **Project Invoice**: Fixed an issue where aggregating expenses showed the error **"The operation cannot be performed"**.

● **Task Execution Approval document**: Fixed an issue where an error occurred when using the **"Aggregate Records"** button.

● Fixed an issue where, after typing the item quantity and pressing Enter, the cursor moved one line up.

● Fixed an issue where the **"Procedure"** window could not be accessed through the Project Management menu.

### Service Center

● Fixed an issue where, in some cases, the Service Center module did not appear for all users, including the system administrator.

● **Vehicle Receipt window**: Fixed an issue where double-clicking the item code did not show the items.

● **Vehicle Receipt window**: Fixed an issue where, when selecting Based On a Vehicle Purchase Order, the system did not allow selecting only the items found in the Vehicle Purchase Order, even though, in the Vehicle Receipt term config, the option "Show Only the Items Found in the Document on the Line or Based On" was enabled, and the option "Fill in the Item Data on the Line When Adding This Item from the Document Found in Based On" was also enabled.

● Fixed an issue where creating a Sub-Item Sales Invoice document based on a Sub-Item Sales Order showed the error **"The operation cannot be performed"**.

● Fixed an issue where, when recording Yacht Booking sales, the system deducted a fixed hourly amount even though there was more than one hourly rate, and the system did not apply the correct rate even when the package was changed.

● **Vehicle Sales Order**: Fixed an issue where clicking the item code did not show the items that exist in the system, while searching with the lens icon did find them and they could be selected; the correct behavior is that double-clicking the item code field shows the items.

● Fixed an issue where, when creating a Payment Voucher based on **"Sub-Item Purchase Order"**, it did not appear in the Payment Vouchers on the Purchase Order and did not affect the total paid, so the Remaining field was not affected.

● Added the procedure **"Add the Line to the Shortages Document"** to the "More" menu in the Sub-Item documents such as "Sub-Item Sales Invoice", "Sub-Item Sales Order".

● Fixed an issue where creating a duplicate of a Vehicle Purchase Invoice showed the error message **"The operation cannot be performed"**.

● Fixed an issue where, in some cases, when creating a Meter Reading record for a piece of equipment and entering a current reading, tasks due for execution (Engine Rules - Welds) appeared, even though these tasks were completed and had no repeat interval, yet they still appeared among the tasks due for execution.

### Customer Relationship Management (CRM)

● **Cash Maintenance Invoice**: Fixed an issue where, when showing the **"Remaining Cash"** field, the system did not add the remaining amount to the "Remaining Cash" field.

### Mobile Applications

● Fixed an issue where, when enabling Stock Locations in the Inventory Count app and creating Electronic Inventory Count Committees, the stock location was not transferred from the device to the Inventory Count Committees in Nama.

● Fixed an issue where, in the Inventory Count app, the app closed without a clear error message when trying to read or update Stock Locations, due to them not being enabled for the customer or due to user permission restrictions on them.

● Fixed an issue where an error occurred when printing the Electronic Receipt Voucher.

### New GUI

● Fixed an issue where, with a large-sized image, zooming in on it filled and enlarged the screen, so there was no clear place to click with the mouse to make the image disappear.
