# Nama ERP Release Notes - October 2021

::: info Release Information
**Release Date:** October 2021  
**Release Number:** 2021.10  
**File Size:** 149.4KB  
:::

## Additions

### Inventory

● **Item Configuration file**: The following fields were added:
  - Has a Serial Number
  - Has Two Serial Numbers
  - Has Dimensions
  - Has a Sub-Item
  - Has an Active Percentage
  - Has an Inactive Percentage

● **Multiple Aggregation document**: A **"Status"** list was added to the document's line details, including the options (Completed, Planned, Preliminary, Other 1, Other 2, Other 3), so that when a status is selected, aggregation vouchers are created for the lines whose status matches it. If no status is selected, the system creates aggregation vouchers for all lines.

● The list **"Allow Overdraft"** was added to the Item Configuration, with a default value of "No".

● The field **"Calculate the Accounting Entry Date from Field"** was added to the term config of the Stock Issue, Stock Receipt, and Stock Transfer vouchers, so that the name of the field containing the date can be entered.

### Purchasing

● The option **"Automatically Unlink Manually-Linked Stock Vouchers on Deletion"** was added to the Purchase Invoice term config, allowing the vouchers linked to invoices to be deleted when the invoice is deleted.

● The option **"Pay Installments in Order"** was added to the Purchase Invoices term config, preventing any installment from being settled if an earlier installment has not yet been settled, and showing the user a message to that effect when saving the Payment Voucher.

● The option **"First Payment Date Is the Voucher Date"** was added to the Payment Schedule Template file, found in both the Purchasing and Sales menus.

### Sales

● Added the ability to create an offer when purchasing 2 items (and multiples thereof) — for example, applying a discount percentage to the lower-priced item instead of giving a free item.

● The option **"Allow Paying an Amount Greater Than the Invoice Value"** was added to the Invoices term config.

● The option **"Automatically Unlink Manually-Linked Stock Vouchers on Deletion"** was added to the Sales Invoice term config, allowing the vouchers linked to invoices to be deleted when the invoice is deleted.

● The option **"Pay Installments in Order"** was added to the Sales Invoices term config, preventing any installment from being collected if an earlier installment has not yet been collected, and showing the user a message to that effect when saving the Receipt Voucher.

● **Payment Schedule Template**: The option **"Calculate Payment Duration from the Due Date"** was added to the Payment Schedule Template and to the Create Payments button.

### Fixed Assets

● A new document was added named **"Bulk Addition and Exclusion document"**.

### Banks

● **Partial Settlement Voucher**: The option **"Prevent Saving If the Financial Paper Status Is Final Rejection"** was added to the document's term config.

● **Partial Settlement Voucher**: The option **"Use Payment Papers Instead of Receipt Papers"** was added to the document's term config.

● **Partial Settlement Voucher**: The option **"Paper Delivered to Customer"** was added to the lines.

### Service Center

● **Sub-Item Aggregation document**: The document was improved so that the system suggests serial numbers for the Sub-Item's components when searching for the serial number of any of these components (such as a Chassis item and a Motor item).

● Created the **Sub-Item Purchase Invoice** document, with the same properties, data, and accounting effect as the Purchase Invoice document, with the addition of the fields (Sub-Item, Chassis Number, Motor Number, Color, Transmission, Category) in the detail lines specific to the new document. A button was also added to create a Sub-Item from the lines, using the data recorded in the fields (Sub-Item, Chassis Number, Motor Number, Color, Transmission, Category).

● A new document was created named **"Sub-Item Sales Invoice"**, made up of the same data as the supply chain Sales Invoice, with the addition of the Sub-Item fields on the lines: (Sub-Item - Chassis Number - Motor Number - Color - Transmission - Category).

● A Purchase Items grid was added to the Sub-Item Purchase Order screen.

● The field **"Cancelled From Document"** was added to each of the following documents:
  - Sub-Item Sales Order
  - Sub-Item Gate Pass Request
  - Sub-Item Gate Pass
  - Final Sub-Item Delivery Voucher

so that, through this field, the system shows the cancellation voucher when any of these documents is cancelled, via each one's own cancellation voucher.

### Contracting

● When adding a **Contracting Material Issue Request** and entering the contract, no details were copied from the contract. Improved so that the details found in the terms are copied, along with the item found in the Standard Term.

### Real Estate

● Improved so that when creating a Rent Quotation based on another quotation, the data is copied to the new quotation.

● Enabled the annual increase on expenses — whether water costs, maintenance costs, or insurance costs — in Lease Contracts, the same as the annual increase on installments.

● The option **"Merge Similar Payment Lines"** was added to the term config of each of the following documents:
  - Preliminary Sales Contract
  - The Sales Contract
  - Opening Sales Contract

● Added Standard Sales Terms to the Real Estate sales and rental files.

### Customer Relationship Management (CRM)

● **Maintenance Notice document, Maintenance Order document**: The following fields were added to the lines of the Machines grid:
  - "Service" field
  - "Fault" field
  - "Status" field
  - "Questionnaire" field
  - "Contact" field
  - 3 reference fields
  - 3 text fields
  - 3 n fields
  - 3 checkbox fields

● **Maintenance Order document**: The field **"Responsible Employee"** was added to the document header.

● The field **"Default Warranty Duration"** was added to the Machine Type.

● The following fields were added to the Machine:
  - Manufacturing Date
  - Sale Date
  - Installation Date
  - Last Visit Date
  - Default Warranty Start Date
  - Default Warranty Duration

● **Call document**: The fields (Related Record 1, Related Record 2) were added to the Products lines.

● **Call document**: The Machine field was added. When a Machine is selected on the line, its Item field is copied to the (Product) field in the Call's Products lines.

### Human Resources

● An option was added to the Single Component calculation formula named **"Query Multiplied By Divided By Daily"**.

● Added Work Permit Fees and Penalties to each of the following documents:
  - Residence Renewal Request
  - Bulk Residence Renewal Request

● Added ref fields to the Dependents lines within the Employee window.

● 5 attachments were added to the **"Meal Details"** window.

### Point of Sale

● Items and Tax Policies are now re-saved after each release.

### Settings

● The field File Status **"documentFileStatus"** was added, as already exists on documents ("Document Status").

● New grids (Grids) were added to each of the Remark screen, the Detailed Remark screen, the Meeting Remark screen, and the Form 1 and Form 2 vouchers.

● Created the `EAAddAccountingEffect` entity flow for the documents (Stock Receipt - Stock Issue - Stock Transfer) so that the system rejects saving unless the option **"Enable PresendRequests Ledger Cost For"** is enabled in the Global Config.

● The field **"Requested By"** was added to the `ApprovalCase` table.

● The option **"Prevent Using the Same Old Password When Changing It"** was added to the Global Config. This option is enabled by default.

● A new document was added named **"Term Verification"**.

● A new document was added named **"Term Period Extension"**.

● New fields were added to the Terms page, found in some of the system's documents, such as (Term's Planned Work End Date, Term's Work End Date After Extension, Verification Date).

### Mobile Applications

● Improved so that when approving a file record, the identifier is shown instead of the code if no code exists.

### Reports

● A new **Glass Price Quotation** print form was added to the System Print Forms.

## Fixes

### Inventory

● Fixed an issue where processing the Issue Vouchers generated from the Processing Voucher failed due to the existence of an Inventory Count Closing.

### Sales

● Fixed an issue where, with the option **"Consider Subsidiary When Searching for Last Selling Price"** checked, an error appeared when selecting the Subsidiary, inserting an item, and specifying the quantity.

● **Sales Invoice**: Fixed an issue where, in some cases, selecting the document's term config gave the error "The operation cannot be performed".

### Accounting

● Fixed an issue where, when settling an invoice with a Receipt Voucher, the payment did not appear on the invoice, requiring the Recommit action to be run.

### Contracting

● **Contracting Material Issue document**: Fixed an issue where the system did not record the items' cost correctly when working with the FIFO system.

● **Contracting Material Issue Voucher**: Fixed an issue where the Release and Quantity were not suggested when clicking the Release field, unlike the Supply Chain documents.

● **Contracting Offer document**: Fixed an issue where, when setting the tax, the system calculated its value in the total price, but did not calculate the tax when saving the document — the same also occurred in the Project Contract screen, noting that the Project Contract screen is sometimes based on a Contracting Offer.

### Human Resources

● Fixed an issue in Work Schedules where the option **"Overtime"** was used incorrectly.

● Fixed an issue where, when checking the option **"Create User"** from within the Employee screen, an error appeared stating that the user code was duplicated even though it was not.

● Fixed an issue where, when performing a Bulk Data Update, some data disappeared from the Employee, such as **"National ID"** and **"Social Insurance Number"**.

### Banks

● **Bank Reconciliation Memo**: Fixed an issue where the system did not fully import the bank transactions.

### Customer Relationship Management (CRM)

● Fixed an issue in the Service Contract where adding a value in Discount 1 did not affect the Net value.

### Settings

● Fixed an issue where, when showing line fields in the Invoices list screen, the invoice was duplicated more than once. In this case, when un-reviewing a group of documents, an error appeared stating that the document had not been reviewed.

● Fixed an issue where, when recording data in the Export/Import Files list to build a report, the data was not calculated correctly.

### Real Estate

● Fixed an issue where a Preliminary Sales Contract was created for a Land Plot, then a Sales Contract was created based on the preliminary contract; opening the preliminary contract did not indicate that the plot had been sold. The Sales Contract and the preliminary contract for the land were then deleted. Afterwards, opening the Land screen showed its status as sold, even though its documents had been deleted.

● Fixed the following issues in the Preliminary Sales Contract voucher:
  - When entering the Commercial Paper details in the Payments, it was not created upon saving
  - In the Bulk Creation Data lines, the Installment Percentage field did not work
  - When checking the option "Reserve the Property" from within the term config and saving the document, the document did not accept edits after saving and showed a message that the unit was already reserved

### Service Center

● **Job Order document**: Fixed an issue where, after issuing Spare Parts and then splitting the percentages in the Spare Parts grid as 50% to the customer and 50% to the warranty, the system rounded the value to a maximum of 2 decimal places, when it should instead increase the number of decimal places within the value field.

### Point of Sale

● Fixed an issue where, in some cases, installing a new Point of Sale showed an error when creating the database.

● Fixed an issue where the system allowed dealing with items even though the option **"Do Not Transfer to Point of Sale"** was checked for them.

● Fixed an issue where deleting the Point of Sale General Reference from Nama did not delete it in the Point of Sale.

● Fixed an issue where, despite enabling the option **"Do Not Show Default Subsidiaries in Nama"**, it still appeared in the Point of Sale, in the Expense Voucher, among the available options in the Subsidiary (Machine).

● Fixed an issue where, in the Point of Sale, a specific account could not be selected when selecting the Subsidiary (for example — an Expense Voucher could not be created for an employee (the Credit Party) with Account 2 selected).

● Fixed an issue where, when adding a Tax Policy for items and specifying the document type the policy applies to (Sales Invoice), then selecting the policy inside the item, the policy was also applied in the Point of Sale despite the type being restricted to (Sales Invoice) in the policy.

● Fixed an issue where deleting the Tax Policy from an item left it still affecting the item in the Point of Sale, with its effect not disappearing.

### Reports

● Fixed an issue where, when printing the **General Account Statement in Local and Foreign Currencies** report as Excel, the account name in the header did not appear because the account was inside a frame; deleting it made the account name appear.

● Fixed an issue in the report (Journal Entry Vouchers Statement / Daily Journal Entries Movement 019-ACC-SYSR): when selecting the Subsidiary type, no data was shown, since the report did not work when a Subsidiary was specified, but displayed data normally when it was removed.

● Fixed an issue in the report (General Account Statement - Local and Foreign Currencies - Detailed) `035ACC-SYSR`, where an error appeared when editing the report's permissions.
