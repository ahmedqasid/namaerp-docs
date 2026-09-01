# Nama ERP Release Notes - August 2021

::: info Release Information
**Release Date:** August 2021  
**Release Number:** 2021.08  
**File Size:** 160KB  
:::

## Additions

### Inventory

- Added the entity flow **"EACopyUnitCostFromInvoiceToIssueDoc"** to copy the Unit Price field (sale price) from the based-on document into the Cost field found on the Inventory Issue Voucher.

- **Item file - Movements page - Movements link:** Added the ability to show the Actual Date and the Creation Date.

- Added 10 `dates`, `n`, `description`, `ref` fields to the tables of each of:
  - Price Voting File
  - Price Voting File details

- **Assembly Voucher:** Added the option **"Prevent Saving If the Assembly Operations Do Not Contain the Supplied Items"** to the Assembly Voucher term config, so that the system prevents saving the document if any of the items found on the "Supplied Items" lines page is not found in one of the assembly operations defined on the "Supplied Items" page.

### Purchasing

- Added the option **"Consider Returned Quantities in Tracking the Linked Voucher's Quantities"** to the Purchase Invoice term config.

### Sales

- **Sales documents:** Added an option to the document term config named **"Ignore Current Discount Values When Recalculating Discounts and Prices"**, so that when enabled, the discount values on the line are ignored and recalculated.

- Added new fields of the types (`dates`, `n`, `description`, `ref`) to the Price Voting File.

- Added 3 `Boolean` fields on the line in the Sales Order document.

- Added the option **"Consider Returned Quantities in Tracking the Linked Voucher's Quantities"** to the Purchase Invoice term config.

- Added the option **"Update Tracking of the Linked Voucher's Quantities"** to the term config of the supply chain documents.

### Accounting

- Added the Journal Voucher among the vouchers available in the Based-On field on the (Disbursement Order - Receipt Order - Payment Voucher - Receipt Voucher); when a Journal Voucher is selected, the lines are automatically copied with the debit and credit values reversed.

- Added the Advance Repayment Voucher to the (Based-On) field; when it is added, the data is copied from the voucher into the Receipt Voucher and a line is created in the Receipt Voucher details.

- Added the documents (Bulk Reward - Penalty Voucher) and the (Reward - Penalty) Voucher to the Based-On field; when they are selected, the data is copied and the lines are created.

- Added several buttons for bank formats to Accounting settings, related to entering data in the field `ConfigEntry.value.bankNamesFormulas`.

- Added the option **"Merge Automatic Account Coding and the Chart of Accounts"** to Accounting settings.

- Added the option **"Apply the Effect on the Topmost Based-On Voucher When Based on a Request or a Receipt/Disbursement Order"** to the term config of the following documents:
  - Receipt Voucher
  - Payment Voucher
  - Bank Transfer
  - Receipt Request
  - Disbursement Request
  - Credit Advice
  - Debit Advice

  For example, when the option is enabled, if a Receipt Request is issued based on a Sales Order, then a Receipt Order based on the Receipt Request, then a Receipt Voucher based on the Receipt Order, the system, when issuing the Receipt Voucher, deducts the received amount from the cash paid on the Sales Order.

- Added Employee as an Account Source Type to the term config of both the Receipt and Payment Vouchers.

- Added the option **"Account Based on Currency"** to the term config of the Receipt Voucher, Payment Voucher, Receipt Request and Disbursement Request, so that the account changes based on the currency.

### Service Center

- Added the ability to select customers registered in Nama through the app for the `nama queue` service system.

### Real Estate

- **Rent Price Quotation:** Added the field **"Rent Contract"** to the Rent Price Quotation.

- Added **"Two Months, Five Months, Seven Months"** to the Installment Period in each of the following documents:
  - Sale Price
  - Preliminary Sale Contract
  - Sale Contract

### Customer Relationship Management (CRM)

- Split the option **"Allow Creating the Permit Without Invoices"** in the Gate Exit Permit term config into the following options:
  - Allow Creating the Permit Without a Customer Invoice
  - Allow Creating the Permit Without a Guarantee Invoice
  - Allow Creating the Permit Without an Insurance Invoice

- Split the option **"Allow Creating the Permit Without Fully Paying the Invoices"** in the Gate Exit Permit term config into the following options:
  - Allow Creating the Permit Without Fully Paying the Customer Invoice
  - Allow Creating the Permit Without Fully Paying the Guarantee Invoice
  - Allow Creating the Permit Without Fully Paying the Insurance Invoice

- Added 10 `text` fields to the header of the Detailed Remark file.

### Human Resources

- In the Term Analysis Card screen, added 10 `(n)` fields and 7 `(Ref)` fields to the lines of the `items` table on the main page of the screen. These fields can be shown by customizing a screen.

- Added the choice list found on the Leave Dues Liquidation Voucher, **"Calculate the Number of Due Days Based On"**, to the Salary Component, giving priority to the Salary Component.

- Also added a new field named **"Actual Leave Duration"**, which takes its duration from the Bulk Leave Voucher through Based-On, and it was added as one of the options of the choice list "Calculate the Number of Due Days Based On" on the Liquidation document and the Salary Component.

- Added the two documents (Bulk Reward - Penalty Voucher, Reward - Penalty Voucher) to the Based-On field; when they are selected, the data is copied and the lines are created.

- In the term config of the **"Bulk Reward - Penalty"** voucher, added the field **"Document Term Config"**, to specify the term config of the resulting (Reward - Penalty) document.

- Added the Subsidiary to the lines of the **"Bulk Reward - Penalty Voucher"**, so that it can be affected by the resulting (Reward - Penalty) voucher.

- Added 5 attachments to each of the following documents:
  - Leave Request
  - Leave Voucher
  - Start of Work Voucher
  - Bulk Leave Request
  - Bulk Leave Voucher
  - Bulk Leave Start of Work Voucher
  - Employee Data Update
  - Clearance Voucher
  - Leave Allowance Disbursement Voucher
  - Start of Work Voucher

- Added the field Number of Year Days to the leave lines in the Job Offer document.

- Added Spouses to the field **"Insured Through"**, so that when the dependent is a spouse, the spouse can be selected.

- Added the list **"Other Effect Type on the Dues Liquidation Document"** to the "Salary Component" file.

- For example, when a data update is made on 2021-04-18, editing one of the salary components, and the salary for the month of 2021-04 is then issued, the lines show the old component value from 2021-04-01 to 2021-04-18 and again from 2021-04-18 to 2021-04-30, meaning the date 2021-04-18 is duplicated on the lines. The correct behavior is for the lines to show the old values from the start of the period 2021-04-01 up to just before the update voucher's actual date, i.e. 2021-04-17, and the new values, after the update, from 2021-04-18 to 2021-04-30.

- Added the option **"Add Dependents Only"** to the lines of the following documents:
  - Insurance Company Accreditation Voucher
  - Employee Insurance Addition Request
  - Employee Insurance Addition Voucher
  - Insurance Upgrade Request
  - Insurance Upgrade Voucher
  - Employee Insurance Deletion Request
  - Employee Insurance Deletion Voucher

### Contracting

- **Term Analysis Card:** Improved so that the unit for the term is copied when the term code is inserted.

- **Term Analysis Card:** Added the field **"Item Unit"** to the raw-materials lines, when the item code is entered.

- Added the option **"The Project Term Code Can Be Left Empty in Subcontracts"** to Contracting settings.

### Hospital Management System

- **Procedure Agreement Invoice:** Changed the way prices are brought in when an Admission Form is inserted on a Procedure Agreement Invoice.

- Added the option **"Do Not Create More Than One Invoice on the Same Patient Admission Form"** to the Procedures Invoice term config.

- Added the field **"A Procedures Invoice Has Been Created"** to the Admission Form.

- Added the option **"Do Not Create More Than One Procedure Type on the Same Patient Admission Form"** to the Procedures Invoice term config.

- Added the option **"Take Into Account the Time Difference Between a Booking and the Next Booking for the Same Room"** to the Surgical Procedure Booking term config.

- Added the option **"Time Difference Between a Booking and the Next Booking for the Same Room"** to the Room.

- Added 5 attachments to the Surgical Procedure Approval document.

- Added the fields **"Quantity"** and **"Unit"** to the Medical Price List (Pharmacies screen - Medical Supplies screen - Blood Banks screen).

### Real Estate

- Added the option **"Rent Value Includes the Brokerage Fee"** to the Rent Contract term config.

### Fixed Assets

- Improved the Fixed Asset Purchase Invoice so that, when it is issued based on an Asset Purchase Order, the system copies the tax and discounts from the Purchase Order into the Asset Purchase Invoice.

### Settings

- When approving from a link, if a problem occurred, the message `Could not perform the action` was shown with no details. Improved so that the error details are now shown.

- In some cases, the error message **"You do not have the authority to perform this operation"** appeared when approving a document, because the approval definition has the option "Review the Record on Approval Completion" enabled and the user does not have review permission. The review-permission issue was clarified in the error message.

- **User Permissions file:** Added the option **"Prevent Editing While Awaiting Approval"** to the User Permissions file.

- **Approval Definition:** Added the list **"Editing Policy During Approval"** to both the approval header and the approval details. This list contains the following options:
  - Allow Editing Only for Whoever Has Permission and Can Approve the Step
  - Allow Editing for Everyone Who Has Permission
  - Editing Is Forbidden

  The system does not allow selecting any value other than "Editing Is Forbidden" in this field unless the option "Allow Editing During Approval", found on the approval header, is checked.

- Added the ability to use the Composite Dimension in the report, so that a `where` clause can be built on its children.

- Created an entity flow named `EAJsonRecordExporter` to export any of the system's files or documents whenever this file or document is added or edited. Specific fields from the file or document can also be selected for export, one at a time. The export is done by sending a JSON file to a URL, via Tempo.

- An error occurs when opening the multi-select lookup and then clicking Insert in reports.

- **Fields & Screens Settings:** In the "Integrators Import" grid, added the ability to also export Nama files (master files and documents), which can be added in the field `Response Fields (CSV - write mode)`.

- Added the option **"Works Only With Import"** to the entity flow, which runs the flow only with file imports and does not run with manual entry.

### Mobile Applications

- Added a new app dedicated to tracking distribution, sales and customer-service activity for pharmaceuticals.

### Reports

- Added the Payroll Register print form to the system screen templates.

## Fixes

### Inventory

- Fixed an issue where, in one case, a Stock Receiving Voucher was created and then a Purchase Invoice was created based on the Receiving Voucher; reviewing the journal entries resulting from the two documents found them not to match, and it was also possible to edit the item quantities on the Receiving Voucher even though it was linked to the invoice.

### Human Resources

- Fixed an issue where, sometimes, when importing attendance and departure data, the system read the date format incorrectly.

- Added a button named **"No Date Parsing"** to Human Resources settings, to prevent the date from being reformatted.

### Hospital Management System

- **Procedures Invoice:** Fixed an issue where, when adding a procedure type, the system did not expand the items found across all the lines, and only the last line was shown.

- **Procedures Invoice:** Fixed an issue where, when the Procedures Invoice was configured to issue an Issue Voucher, deleting the invoice did not delete the inventory Issue Voucher.

- Fixed an issue where, on the Rent Contract screen, creating a rent contract with the contract period in days caused an error on save.

- Fixed an issue where the system allowed creating an invoice on an Admission Form while the patient was not present on that form.

- Fixed an issue where, when using the Edit Prices feature from the More menu, the system showed the message **"Cannot Execute the Operation"** on each of the following documents:
  - Supplies Invoice
  - Blood Bank Invoice
  - Supplies & Services Invoice

### Fixed Assets

- Fixed an issue where, when trying to issue a year-end closing entry while there were assets whose depreciation had not yet started but whose depreciation start date was before the end of the year, the error "Cannot Execute the Operation" occurred.

### Settings

- Fixed an issue where, checking the option **"Summarize Journal Entries"** in the Job Order Closing term config and then creating a Closing document showed the error message "Cannot Execute the Operation".

- Fixed an issue where, when there was inconsistency in the dimensions, the error message was unclear and not translated.

- Fixed an issue where, when adding a template linked to a report definition of type Screen Template, the main template was printed twice.

- Fixed an issue where an error occurred when clicking "Update Price List" on a cost term.

### Service Center

- **Yacht Rental Invoice term config:** Fixed an issue where, when accounts were selected in the Invoice Effect, Other Effects, or Discounts Effect and the document was saved, all the accounts were deleted on save.

- Fixed an issue where an error occurred when deleting a Sub-Item, stating that it is in use in the quantity and cost tables, even though all documents relating to the Sub-Item had been deleted.

- Fixed an issue where, on the Sales Order document for an item (vehicle), inserting the Sub-Item caused the system to delete the item quantity, and inserting the quantity caused the system to delete the unit price.

### Human Resources

- Fixed an issue where, when a Salary Component was entered on a composite legal entity, the system did not take this component into account when issuing a Payroll Voucher on one of the subsidiary companies of the component's legal entity.

### Point of Sale

- Fixed an issue where the error message **"Cannot Execute the Operation"** appeared on the Items Sent to Point of Sale screen when adding a category.

- Fixed an issue where an error occurred when transferring order-reservation data from Point of Sale, and the system also did not accept saving it after it was transferred as a draft into the main database.

### New GUI

- Fixed an issue where, clicking Login Dimensions after logging into the system in the New GUI, the Login Dimensions grid did not open.

- Fixed an issue where the system did not take into account the setting for the number of lines in the grid, and also did not respect the `ctrl+end` shortcut with the lines of the first page, or the `ctrl+home` shortcut with the lines of the last page.

- Fixed an issue where, sometimes, running any system report in the New GUI showed an error message.

- Fixed an issue where an error occurred when showing the color field.
