# Nama ERP Release Notes - May 2022

::: info Release Information
- **Release Date**: May 2022
- **Release Number**: Nama-ERP-202205
:::

## Additions

### Inventory

- **Multiple Assembly Voucher:** Improved the document so that when the Assembly Method and the quantity are added in the header, the item is inserted into the details grid by inserting the Assembled Item, the Assembly Method, the unit, the quantity, and the Issue Warehouse and Receipt Warehouse present in the selected Assembly Method.
- Supported the two fields "Attachment 1" and "Attachment 2" in all Supply Chain documents.
- Added one additional attachment to the Stock Transfer voucher.

### Purchasing

- **Purchase Quotations window:** Improved so that when clicking the "Guess Item Names" button and matching the items present in the system with the items present in the "Item Name" field for the vendor, the guess is based on the letters, then the item's concentrations, then the Retail Price field, and if there is no match through these criteria, the item appears empty.
- Added 10 attachments to the Payment Scheduling Templates screen, and also added 20 description fields to the existing ones.

### Sales

- **Sales Invoice:** In the withdrawal details grid on the Related Documents page, added 5 fields of type (Ref, N, date, Text) with no effect.
- Added a button to the Sales Invoice that calculates the tax applied to the invoice before saving the invoice. This button is added through the "Edit Screen" window.

### Accounting

- **Disbursement Request:** Improved the Disbursement Request document so that when it is issued based on a Bulk Advance, the Bulk Advance's data is inserted into the Disbursement Request's lines.
- Added a combo box named Portfolio Type in the term config of the Disbursement Request document, allowing the employee's account type to be specified.
- Added the option "Create Accounting Effect" in both the Receipt Request and the Disbursement Request. When activated, a system journal entry is made for the lines, debit and credit.
- Added the option "Deduct Paid and Received Amounts When Calculating the Remaining Balance in Invoices" in the Global Config.

### Fixed Assets

- Added the English Code field in the Fixed Asset screen.
- **Fixed Asset Opening:** Added the option "Automatically Calculate the Depreciation Start Date for Depreciated Assets" in the document's term config. This option works as follows:
  - If the asset's scrap value + the opening accumulated depreciation value = the opening acquisition value.
  - The asset's status is considered Depreciated, the remaining life is allowed to be zero, and the depreciation start date is calculated based on the document's actual date, taking into account the asset's useful life.

### Service Center

- **Meter Reading Registration document:** Added an option named "Update the Meter Reading Regardless of the Reading Date". When this option is selected, the current reading date and reading are always copied to the product, regardless of the date comparison.
- Added an option named "Ignore Price Lists for the Rental Asset" in both the "Rental Asset" and "Rental Asset Classification" documents.
- Added 5 fields (n) and 5 fields (description) to the Work Order document.

### Real Estate

- Added the following properties to both the Sales Contract and the Waiver Voucher:
  - Added the Fees to the Payments grid when installments are created.
  - Added the option "Add to Installments" to both the Real Estate Investment Fee Type and the Fees grid.
  - Added "Real Estate Investment Fee Type" to the Payments lines.
  - Added "Fee Date" to the Fees grid.
  - Added "Total Amount When Fees Are Added" to the Totals group.
  - Added a "Fees" type to the Type combo box present in the Payments grid and the Multiple Creation grid.
- Added the option "Calculate the Remaining Rent Based on Rents Paid in the System" to the Lease Termination document's term config.

### Customer Relationship Management (CRM)

- **Warranty Period Type:** Added the following two fields:
  - Warranty Period
  - Unit

  A link was made between the Serial Number and the Warranty Type from the Purchase Invoice.

- Added the Room, Floor and Building to the Maintenance Report, and filtering was made on them; when the Room is selected, the Floor and Building are filled in, and when the Floor is selected, the Building is added.
- Added the following updates to the Customer Portal page:
  - Changed the Customer Portal page's title to Extra Filters, like the grid's title
  - Added an Entity Type List field
  - Added a Dynamic Tempo Criteria field, applied to the current user's file

### Human Resources

- **Employee Introduction Letter:** Added the option "Allow Making an Introduction Letter Regardless of the Employee's Status" to the document's term config.
- **Employee Introduction Letter document:** Added 2 attachments.
- **Family Visit Request document:** Added 2 attachments.
- Added the following values to the System Performance Indicators list:
  - Penalties Carried Forward from the Previous Month
  - Penalties Carried Forward to the Next Month
- Added the following fields to the Payroll Settings:
  - Maximum Monthly Penalties
  - Salary Component Type for Penalties Carried Forward to the Next Month
  - Salary Component Type for Penalties Carried Forward from the Previous Month
- Added an option in the Salary Component Type named "Considered When Calculating Carried-Forward Penalties", which must be checked for Salary Components such as Absence Penalties, Lateness Penalties, and so on — taking care to keep the Absence Deduction separate from the Absence Penalty, according to the customer's internal regulations.
- Added 5 attachment fields to the Manual Performance Indicators screen.
- Added a Line Notes field in the Job Offer screen, on the Salary Components page, in the Salary Components grid.
- Added attachments to the Manual Performance Indicator Values document, in the header and in the details.
- **Salary Voucher:** Added a field for the Number of Working Days, similar to the example of the Number of Non-Working Days field.

### Contracting

- **Subcontractor Extract:** Improved the document so that the Works Retention value is calculated when the current quantity is negative, and regarding the display method of the system journal entry in the Subcontractor Extract, improved so that the accounts are grouped based on the Cost Item Code, in both the debit and the credit.
- Added the option "Consider Project Remarks in the Item Lines When Suggesting the Item Code" in the Contracting settings. When activated, the field terms.projRemark will be considered and shown when suggesting items.
- **Project Contract:** Improved so that the Tax Percentage and Tax Value fields are Disabled on the item and terms lines if the item is a main item.
- Added a "Copied From Document" field to the details of the Contracting Assay window, so that when it is selected on the line, the items present in it are copied to the lines.
- Added an Attachment field inside the Subcontractor screen.

### Manufacturing

- Added a new field in the Components lines inside the Production Order document, named Manually Adjusted Quantity Including Ratios. When a value is entered in this field, the value is added to the Required Quantity field, and the Manually Adjusted Quantity field's value is calculated upon saving.
- Added an option in the Manufacturing settings named Add the Manually Adjusted Quantity Including Ratios Field in the Components Lines of the Production Order. When this option is activated, the field appears in the Production Order document, in the Components lines of the Product Components screen.
- **Product Delivery window:** Improved the window so that the by-product's quantity equals the total quantity issued for the by-product present in the Production Order.
- **Sample Withdrawal document:** Added the following fields to the document header:
  - 2 attachment fields
  - 5 fields of type BigText

  Also added the following fields to the window's table:

  - 2 attachment fields
  - 3 BigText
  - 3 Text
  - 3 Date
  - 3 Number
  - 3 Ref

  All these fields are added through the "Edit Screen" window.

- **Sample Withdrawal document:** Added a field named Sample Quantity in a Different Unit (unit and value) to track the sample quantity in the required unit.

### Point of Sale

- Added the option "Allow Making a Return or Exchange for Invoices from the Nama Server" to the Point of Sale settings.
- **Point of Sale Settings:** Added the option "Do Not Show the Payment Screen with the Reservation Voucher" to the Point of Sale settings.
- **POS Order Reservation window:** Added a Reservation Date field to allow adding an Order or Table reservation with a time and date, so it does not show in yellow as occupied except on the reserved day only, and the table is available for use except on the reserved day, and the table stays reserved until the last shift's closing time, unless an invoice is made for it on the same reservation date.
- Added a field named Reservation Value, and the reservation value is deducted from the invoice's total value but is shown separately.
- Added a new button in the Order Reservation screen named Table Inquiry, and when opened it shows the "From Time" and "To Time" fields; when they are selected, the tables' status appears for the chosen day.
- Added "Reservation" to the "Home Page Fields" list in the "New POS Interface Settings" window.
- Added the following improvements to the Suspended Invoice splitting process:
  - Removed the checkbox column, because of the confusion it caused in the invoice-splitting process.
  - The invoice's items are shown, and the unwanted lines must be deleted or their quantity reduced, keeping the lines to be split into a new invoice. When OK is clicked, the invoice appears with the items that were in the table before clicking OK. After that, the Suspended Invoice contains only the remaining quantities (the ones deleted from the table).

### Fixed Assets

- Added 5 attachments to the Fixed Asset Transfer document.

### Settings

- Improved the Calendar file's dashboard so that the columns can hold the days and the rows hold the Rental Assets, showing the rental period of each asset.
- Added the option "Direct Printing (Using the Print Server)" in the Change Dimensions window.
- Added the bank information data, as in the Vendor window, to each of the following windows:
  - Customer
  - Related Party
  - Partner
- Improved document printing using the "Print Using Nama Server" option from the Global Config, so that the printer name present inside the report definition, in the Printer Name CSV field, is taken into account.
- **Cancel Document:** Improved the system so that it does not add tax settings, and they are considered from the document present in "Based On".
- Removed the option for direct printing when exporting to Excel, Word or PDF.
- **Form 1, Form 2:** Added the option "Create Accounting Entry" to the term config, noting that the journal entry is created empty, and lines can be added to it via the entity flow EAAddAccountingEffects.
- **Meeting Notes screen:** Added 30 "n" fields to the lines, bringing the total to 50 "n" fields.
- **Employee Agenda:** Added 50 number fields, 20 date fields and 10 attachment fields to the header and the lines.

### Hospital Management System

- The fields for the maximum discount percentage in the employee file are now considered in each of the following Hospital Management System documents:
  - Accommodation Invoice
  - Medical Test Invoice
  - Physiotherapy Invoice
  - Radiology Invoice
  - Medical Services Invoice
  - Medical Supervision Invoice
  - Surgery Invoice
- **Agreement Invoice:** The two fields "Maximum Total Discount Percentage" and "Maximum Total Discount Value" in the employee are now considered when verifying discounts.
- **System Administration:** In the All Records screen, added a new search filter named "Document Status".
- **Send Documents to Tax Authority document:** Improved the window so that when a quantity or price is modified in a voucher that has already been sent, saving is rejected and a message is shown stating the reason for the rejection, such as "The price was changed from X to Y for the item with tax code Z" or "The tax value changed from X to Y in line number Y for item Z".

### Mobile Applications

- Made the following changes in the Nama Queue app:
  - Changed the app's name to be Waiting Area Management
  - Made the font size larger in the ticket number and the engineer's name, and preferred that it be controllable
  - In the display screen, changed the ratio of the logo to the ticket-display area, in favor of a larger logo
  - Made the "Display Screen" wording at the top of the screen controllable
  - Added an option to not activate the logo
  - Fixed the printer's IP in the queue itself, and allowed changing it in the app, and allowed changing it in the settings

### Reports

- Added a new grid named "Based on the Current User". With this table you can select the report definition and make it work only with a specific employee — or a specific user (as it also works with employee and user groups — a criteria definition or a permissions file can also be used), and login dimensions such as the Company, Branch, Sector, Department, and Analytical Group can also be used.

## Fixes

### Inventory

- **Multiple Assembly Voucher:** Fixed an issue where, when the Assembled Item was added in the header, the Main Item was not inserted.
- **Multiple Assembly Voucher:** Fixed an issue where, when the unit present in the header was selected, the system did not filter on the item's units or the item's Assembly Method unit, but instead showed all the units present in the system.
- Fixed an issue where, when goods were reserved through a Sales Order and then a Sales Invoice was made for the items, the reservation was not cancelled when the reserved goods were issued.

### Purchasing

- **Purchase Invoice:** Fixed an issue where, when cancelling a Purchase Invoice with a stock effect, the system did not cancel the stock effect when issuing a "Cancel Document" document for the Purchase Invoice.
- Fixed an issue where, in the Purchase Order document, the Purchase Invoice and the Disbursement Requests, when a vendor was selected and that vendor was linked to a currency other than the local currency, such as the dollar, the system retrieved the account currency correctly but did not update the exchange rate, which stayed at 1, even though when the currency was selected manually, the system fetched the rate automatically.

### Service Center

- **Work Order document:** Fixed an issue where the system sometimes refused to save due to an error in rounding the entered raw materials' prices.
- Fixed an issue where, when creating a Reservation Invoice based on a Reservation Voucher, the system did not fetch the "Number of Days" field and the "Day Price" field from the "Based On" document.
- **Spare Parts Issue Request document:** Fixed an issue where the error message "The operation cannot be performed" appeared.

### Contracting

- **Fine Voucher:** Fixed an issue where the tax was not copied when the Lease Installment Code was selected, and the lines' amounts were also not totaled in the header's Amount field.
- Fixed an issue where, when a tax percentage was added on the item lines and a discount percentage or value was added on the line, the tax value was not updated correctly, and the error message (Cannot enter a negative value in the field Tax 1 | %) appeared.
- **Extracts:** Fixed an issue where, when consolidating items or consolidating items without quantities, the message "The operation cannot be performed" appeared.

### Human Resources

- Fixed an issue where, in some cases, when re-saving the "Leave Voucher", the problem appeared that the balance must be greater than zero.
- Fixed an issue where, in some cases, the value of the Tax salary component was not calculated correctly; even though there was an amount in the total tax base, the tax was not distributed correctly between the salary component named "Employment Income Tax - Employee" and the salary component "Taxes Borne by the Company".
- Fixed an issue where the Statistics listing did not display the Salary Components linked to the type.

### Hospital Management System

- **Accommodation Invoice:** Fixed an issue where, when the option to calculate the time from the check-in was activated, the system gave a fraction when calculating the day.

### Point of Sale

- Fixed an issue where, in the POS Order Reservation screen, when the payment button was clicked, the system required the customer to enter data that had been set as mandatory in another window. For example, if the Salesperson Code was mandatory in the Sales Invoice, it was also mandatory in the reservation screen.
- **Point of Sale Sales Invoice:** Fixed an issue where, when the order reservation was selected, the table was not added to the invoice.

### Customer Relationship Management (CRM)

- **Maintenance Order:** Fixed an issue where errors appeared when editing any Maintenance Order that already existed.

### Settings

- **Edit Screen window:** Fixed an issue where, if a report was added on the Reports page and the "customer" input was created, it was only passed to the parameter upon saving. Improved so that it now works when the value changes in the selected field.
