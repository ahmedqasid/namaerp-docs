# Nama ERP Release Notes - June 2024

::: info Release Information
- **Release Date**: June 2024
- **Release Number**: Nama-ERP-202406
:::

## Additions

### Inventory

- Added the option "Compress Serial Numbers in the Dialog" in the Supply Chain settings.
- Added the following fields to the Item Classification screen:
  - Attachment 1
  - Attachment 2
  - Attachment 3
  - Attachment 4
  - Attachment 5
- Added the following fields to the Quality Inspection document and the Quality Inspection Request screen:
  - Attachment 1
  - Attachment 2
  - Attachment 3
  - Attachment 4
  - Attachment 5

### Sales

- In the Sales term config, added the option "Prevent Selling a Quantity Less Than the Sale Quantity in the Item's Unit Table".
- Added the button "Insert Selected Records" in the dialog for inserting serial numbers.
- Added the field "Default Price in Price List" to the five price dimensions, and it is now taken into account.
- In the Sales Invoice, when a number is entered in the Pricing Quantity field, improved so that the program calculates the total price as it is entered; the same mechanism applies if the user edits the unit price, where the program recalculates the item's total price by multiplying the unit price by the pricing quantity.

### Contracting

- In both the Subcontractor Extract and the Project Extract, added the section "Total Payment Vouchers" with the fields (Total Paid from Vouchers - Remaining).
- Added the table "Unit Price Effect Settings" in the Analysis Card term config.

### Point of Sale

- When logging in without closing and reopening the machine, improved so that the logged-in user's data is updated to change the username.
- Changed the log of another user's shift to show the shift's date and time and the name of the user who opened the shift.
- Enlarged the size of the invoice's total value figure.
- In the New POS Interface Settings file, added a grid named Search Dialogue Filter Fields, which can be used to order the filters, since the filters are displayed in the same order as the grid's lines.
- Added the option "Quantity Is Always a Whole Number" in the Unit of Measure file.
- Added an option for automatic temporary saving until the invoice is completed, to avoid losing invoice data in the event of a power outage; if incomplete documents exist, a window listing them appears when the program starts.
- Added the button "Transfer the Amount to a Payment Method" next to the Add and Delete buttons for payment methods; the shortcuts alt+1 can be used to transfer to the first payment method, alt+2 to the second, and so on, noting that the tenth payment method is reached with Alt+0.
- Converted the books and term configs in the NamaPOSRegister file into a grid named "Books and Term Configs".

### Accounting

- Added the following options in the Electronic Receipt Voucher term config:
  - Apply the effect on the document Based On the highest, when Based On a Request or a Receipt/Payment Order.
  - Use Based On for debt aging.
  - Do not compare the total invoice values with the document header amount.
  - Use the payment lines in debt aging.
  - Do not use invoices in debt aging.

### Fixed Assets

- In the Assets settings, the option "Allow Creating a Closing Entry If There Are Undepreciated Assets" was improved to be based on the document's legal entity, to distinguish between different legal entities.

### Human Resources

- Added the following fields to the Employee Affairs Information window:
  - Total Additions
  - Total Deductions
  - Total Other
  - Total Salary
- In the Payroll Run, added the option "Do Not Group Employees Who Have No Salary Components for This Payroll Run".
- Created a new screen named (Bulk Sponsorship Transfer Request) under (Administrative Transactions), containing the lines of the (Employee Sponsorship Transfer Request) screen. When a document is created from the bulk screen, the system creates the individual one.
- Added the field "Increase Value in the Fixed Insurance Basic" in the Annual Increase document.

### Settings

- When adding new pages to any screen via Edit Screen, and entering the Arabic name and the English name along with the ID, the page used to appear in the screen named as the record type followed by the Arabic or English name. This was changed so it now appears only with the Arabic or English name, according to the language.
- Improved so that recommitting documents found in bizRequestView works the same way the program's current Recommit works, so it does not stop on encountering an error but continues and shows the errors after finishing.
- Added the option "Add Report Runs to the Edit Log" in the Global Config.
- In the integration with ZATCA (Saudi Arabia), the following improvements were made:
  - Allowed sending more than one document at the same time.
  - Added an option in the list view to allow selecting a group of documents and sending the documents that were not yet sent among the selected documents.
- Added the Revision (Revision Id) to the Tax Policy lines, and used it when selecting the tax policy settings from the Sales and Purchasing lines.
- Changed the Kuwait branch address shown when clicking About.
- In the "LedgerTrans" system entries screen, adjusted the width of some columns to fit larger numbers, since some customers have large numbers, along with the fields and the suggested width.

### Manufacturing

- Added the following fields to the Production Order screen:
  - Attachment 6
  - Attachment 7
  - Attachment 8
  - Attachment 9
  - Attachment 10

### Mobile Applications

- Made the following improvements to the Receipt Voucher screen:
  - In Based On, the type names (Sales Order and Sales Invoice) appeared in English; improved so they appear in Arabic when the app's language is Arabic.
  - When opening the Based On lookup, the related subsidiary's name is now shown next to the code.
  - Copy the Cash Amount field from the invoice's remaining amount, not the invoice's net value.
  - Hidden documents for which an electronic receipt voucher was created for the full amount, making the remaining amount zero, from the Based On field, so that more than one receipt voucher is not created for the same invoice.
