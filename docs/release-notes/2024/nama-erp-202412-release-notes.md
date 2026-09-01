# Nama ERP Release Notes - December 2024

::: info Release Information
- **Release Date**: December 2024
- **Release Number**: Nama-ERP-202412
:::

## Additions

### Inventory

- In the Item file, added the option "Allow duplicate data in the details table in the item" to the supply chain settings.
- Added the field "Prevent appearing in Based On" for the stock documents, in the Purchase Invoice, Sales Return and Sub-Item Purchase Invoice.
- Added the field "Enable preventing appearance in stock documents if all items are service items" to the invoices term config.
- Added a new screen named "Create Multiple Items".
- In the entity flow (DeliveryDocument), the purpose is that when the delivery status is changed at the line level in the Delivery document, the system updates the delivery status at the line level in the document by taking the item code at the line level into account. Improved so that the flow takes the item code at the line level into account, because it currently updates the line based on its order among the lines even if the item is different.

### Sales

- In the Sales Invoice term config, added a grid named "External documents that affect the amount paid and remaining by themselves when the invoice is saved".

### Purchasing

- Added a new screen named "Edit Purchase Documents".
- Added tracking of the count in the dimensions on supply chain documents. That is, if there is a Purchase Request with an item having a count of 30, a length of 3 and a width of 3, the system computes the quantity as (30*3*3) = 270; likewise, if the count on the Purchase Order is 20, the quantity is 180.

### Manufacturing

- Allowed closing the Production Order after reviewing its related documents, such as the Resources, the Product Delivery, or the Product Return.

### Accounting

- In the Bank Transfer, the Receipt Voucher and the Payment Voucher, in the Payments grid, improved so that when searching for an installment, the following are shown (Installment Description - Due Date - Installment Document - Net - Remaining).
- Added a filter by the related party and the linked subsidiary on the cheque, in the Receipt and Payment Vouchers.
- In the Bank Portfolio, added a screen named "Payments".

### Service Center

- Added 5 additional references to the Sub-Item.
- Added two system fields to the Sub-Item: Pass Letter Request - Stock Supply document, and added options to update them in the term configs (Copy the Stock Supply to the Sub-Item - Copy the Pass Letter Request to the Sub-Supply).

### Settings

- In the Preliminary Receipt screen, added the Standard Items grid, containing some basic fields such as text, number, date and 5 attachments.
- Across the whole system, improved so that the code and the name identify documents in lists, so that the file or document can be opened from the list view by the code.

### Human Resources

- On the Payment Settlement Request document, added details.ref1 to 5 - details.n1 to 5.
- Moved the documents (Employee Transfer document, Employee Transfer Requests, Transfer Reasons) to Human Resources.
- Added the following fields to the Leave Type screen:
  - Read "without salary" from the leave reason.
  - Do not save if the leave reason is empty.
- Added the following fields to the Leave Reason screen
  - "Without pay", "Not deducted from end of service".
- In the term config of both the Employee Insurance Upgrade document and the Employee Insurance Upgrade Request, added the option "Use the Insurance Upgrade document to lower the employee's insurance category".
- Added a method for managing Evacuation approvals, which includes the following:
  - A new file named Evacuation Approval Settings
  - Added a reference to this file named (Approval Settings) in Evacuation.
  - Added a new document named Evacuation Approval - containing the Evacuation document - the step code - the step description in Arabic and English - the decision: Approved - Rejected - Note - Attachments
  - Added a field named the approval status in the Evacuation document, with: Initial - Approval In Progress - Rejected - Approved, changing automatically with each Evacuation Approval document.
- Added 5 additional attachments, on top of the existing ones, to the WorkTask document.
- Added the option "Ignore electronic attendance and departure" to Global Config for Human Resources.
- Added Electronic Attendance as a List View in the Statistics tab of the Employee, just as it exists in the Salary document.
- In the Leave Type, added the option "Read deducted from the paid leave duration in the settlement, from the reason".
- In the Reason Type, added the option "Deduct from the paid leave duration in the settlement".

### Point of Sale

- Added a grid of counted items with each shift in the Open Shift screen.
- Added a shortcut (Ctrl+d) by default. You can change it from the Point of Sale shortcuts document.
- Added the grid ("fixedFavouriteItems") to the Register document as well as to the Point of Sale settings. Please make use of it.

### Hospital Management System

- Added the field "Do not allow the system to modify the line" to the Stay Invoice lines.

### Real Estate

- In the Sales Contract, added a new button to pay the selected installments by bank transfer.
- Added the "Real Estate Cost Opening" document.
- Added the "Real Estate Investment Cost" document.
- Added the "Real Estate Investment Cost Item" file.
- In the Property file (Real Estate Investment Unit), added the field "Allocated Cost", computed from the opening cost and from the cost document.
- Created the "Create a Bank Portfolio for the Selected Installments" button and the "Create a Notice for the Selected Installments" button on the Sales Contract page.
- Added the field "Comply with Price Lists" to the term config of each of
  - Offers
  - Reservation
  - Sales Contract

### Mobile Applications

- In the Visit screen in the aggregated app, made the following improvements:
  - Removed the two signatures from the mandatory fields.
  - Gave control over the fields present on the screen, to remove the two signatures and the attachment.
  - Included the Visit document within the allowed values for reference fields in mobile app screens.
- In the app shortcuts definition screen - target links -, added the Stock Supply document.
- In the mobile phone apps settings, added the following:
  - Show the Save as Draft button in the app.
  - Show documents saved as a draft in the app.
  - Show a message when there is no record.
  - Automatically add a new line and set the quantity to one.
- Added the Sale document among the available types in the app shortcuts definition screen.
- In the TaxAuthoritySubmissionDoc screen, added the following two actions to ActionsHistory:
  - recalculateEInvoiceJsonForSelectedLines
  - recalculateEInvoiceJson
- In the Electronic Receipt document screen, added the following:
  - Reference fields 1 to 3.
  - Enabled the grid for "Allowed values for reference fields in mobile app screens" that exists in the settings, so the new fields can be used and the values to be used in the app can be shown.
  - Made sure that the (Field) column in the same grid still does not suggest the values available on the screen.
- In the Sale document screen, showed a "Purchase Coupon".
- When saving an Electronic Receipt document in the app, it did not appear in the list view until returning to the home page. Improved this behaviour, and also added the reload shortcut to the list view for the Receipt document.
- In the app settings screen, enabled the grid for "Allowed values for text fields in mobile app screens" with the Electronic Receipt screen, and also suggesting the available fields for the screen.

### Reports

- **Report Designer:** Added the pattern fields to the crosstab formula lines in the tool.
