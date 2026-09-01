# Nama ERP Release Notes - January 2026

::: info Release Information
- **Release Date**: January 2026
- **Release Number**: Nama-ERP-202601
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the entity flow EAAutoFillSCPriceListPriority to add the ability to automatically order the priority of price lists (Sales / Purchasing).
- In the Item screen - Prices - Sales Price Lists, added a column and a filter for the (Disable) field found on the price lists.
- In the "Stock Transfer" document, improved so that when selecting the transfer type in the document's term config (Normal Company Transfer / Purchasing), the filter on the company in the "To Warehouse" field of the document is ignored.
- Added an option named "Reserve Only When Criteria Match" in the term config of Supply Chain documents.
- Added the item code on the lines (compItemcode), and when the item code (size and color code) is entered, each of (details.comp, details.color, details.size) is filled in, along with the rest of the item's properties such as the version.

### Accounting

- Added the option "use Fixed Monthly Amount" in the "Expense Accrual Entry" term config, so that a fixed value is disbursed based on the number of months. For example, if the total value is 18500 and the period is from 1-1-2025 to 31-12-2025, with 12 months, the value would be 18500/12 = 1,541.6
- Added the option "Prevent Generated Document Deletion" in the Expense Accrual Entry term config, which prevents deleting a fixed document generated from the contract, so it does not affect the available data.
- In the Account screen "Account", added 4 options to prevent saving the systematic journal entry on any cost center other than General in any document. The option names are as follows:
  - Used only with the General Sector
  - Used only with the General Branch
  - Used only with the General Department
  - Used only with the General Analytical Group

### Human Resources

- Added the ability, in the Employee Transfer voucher term config, to make it without accounting effect.
- Created the LeavePermissionConfiguration file for Departure Permission settings, replacing (Maximum Number of Departure Permissions per Month, Maximum Number of Departure Permission Hours per Month, Maximum Hours per Single Permission) found in the Human Resources settings.
- The email is now copied when edited inside the Employee record to the User (and if there is more than one user for the same employee, the email is copied to them as well), and likewise the phone number.

### Point of Sale

- Activated the permission (Prevent Editing the Credit Note Value in Payment) with the Expense Voucher, the same way it is activated as a payment method in the Sales Invoice.
- In the "New POS Interface Settings" file, in the "Other Screens" screen, added the lines "Fields of the Payment and Receipt Screens".
- In the Sales Return, improved so that the invoice code is always in English regardless of the Windows language.
- In the Sales Return, improved so that the Focus is on the invoice code, and when scanning the invoice code, it automatically moves to the item code.
- Added a shortcut for creating an Expense Voucher for a Debit Note.
- Added the POS Credit Note to the lines of the "POS Search Dialog Columns Settings" screen.
- In the POS permissions, added the following permissions to the permissions grid (Prevent Viewing Previous POS Invoices, Prevent Viewing Previous POS Returns), to prevent viewing invoices and returns via the "View Document" shortcut in the Invoice and Return screens.
- Added a field named "Jasper Font" in NamaPOSUI, which creates the Directory for saving the JAR Files inside it.
- Added a permission named "Prevent Payment" in the POS permissions file. The permission can be used on the lines.

### Contracting

- Created a dedicated journal entry for ContractingAssay, which can be enabled by selecting a debit and credit for the Value, Tax 1 and 2, and the Discount in the term config.
- Added an option named "allow Current Quantity Percentage Exceed Permitted Percentage" in the Contracting settings.
- Created an equation for the Analysis Card with the Cost Item in the Contracting Price Offer.

### Service Center

- Improved the option for updating documents specific to the Sub Item (such as Sales Order - Purchase Order - Movement Letter Request - ......................), found in the term config of these documents for the Sub Item (Chassis), so that when the chassis is changed in these documents, copying of the documents from the old chassis is canceled.

### Vehicles

- Updated the documents specific to the Sub Item (such as Sales Order - Purchase Order - Movement Letter Request - ......................), found in the term config of these documents for the Sub Item (Chassis), so that when the chassis is changed in these documents, copying of the documents from the old chassis is canceled.

### Settings

- Added the following options:
  - Delete all notifications for the current user.
  - Mark all notifications as read (for the current user).
  - Mark all notifications as read for all users (this option is available only to those with full permissions).
- In the Sales Invoice, when integrated with Mada and paying through the Payment Terminal, improved to account for paying with more than one different payment card (splitting the invoice amount) via a new button next to the invoice payment button. It shows a Popup Menu for entering the part of the amount to be sent to the network.
- Added the number of executed and remaining records to the System Task Monitor.
- In documents, when paying via the Terminal, added the ability to cancel the request sent to the bank if the customer changes the payment method before the bank confirms the payment, since the current situation completely freezes the program when the payment is canceled from being sent to the bank, forcing the user to redo the entire invoice.
- Prevented saving a document-cancellation document for the following documents:
  - Sales Invoice
  - Sales Return
  - Purchase Invoice
  - Purchase Return

  if the document has non-systematic related documents (relatedDocs - stockDocs), since deleting the cancellation would delete the related vouchers in order to modify them and create a cancellation document again, whereas it is preferable for the customer to unlink them before canceling.

### Fixed Assets

- Added 3 attachments in the "Disposing of Many Assets at Once" screen.
- In the term config of the "Fixed Asset Purchase Order and Fixed Asset Purchase Voucher" documents, added the option "Consider the Delivered Quantities Based on, in order to track executed and non-executed lines".
- In the Fixed Assets screen - Statistics page, Asset Properties grid, added the Document Type among the displayed columns.

### Customer Relationship Management (CRM)

- Added a dedicated Faults grid in MnOrderExecution, like the one already in the Maintenance Order screen, whose data is copied based on it.

### Mobile Applications

- In the Aggregated App, added the ability to filter based on criteria and a query template together.
- In the Aggregated App settings, added a grid named "App Sort Settings".

### Real Estate

- Added the option aggregateFPLinesBySimilarChequeNumbers=Aggregate Commercial Paper Lines with Similar Cheque Numbers in the Accounting settings to achieve the required behavior.
- In each of the following two documents
  - Opening Rent Contract
  - Rent Contract.

  Added a "Total Discount" field in the Totals (it calculates the total of the Discount field found at the line level, details.discountValue).

- In Rent Contract Termination, added the following:
  - Maintenance Cost Discount Percentage and Maintenance Cost Discount Value, which affect the Remaining Maintenance Costs.
  - Water Cost Discount Percentage and Water Cost Discount Value, which affect the Remaining Water Costs.
- Added the field "Consider the Amount Paid from the Reservation as Paid from the Installments" in the term config of the following documents:
  - RESalesOffer
  - REReservationDoc
  - REInitialSalesContract
  - REReservationDocCancel,
  - REWaiverDoc
  - REOpeningSales
  - RESalesDoc
  - REPurchaseContract
- In the Rent Contract screen, added the two options "Treat Maintenance Costs as Installments", "Treat Water as Installments"

### New GUI

- Added the Chat feature between employees in the system.
