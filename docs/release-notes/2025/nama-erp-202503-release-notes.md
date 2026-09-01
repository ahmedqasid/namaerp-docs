# Nama ERP Release Notes - March 2025

::: info Release Information
- **Release Date**: March 2025
- **Release Number**: Nama-ERP-202503
:::

## Additions

### Inventory

- Added the Item Code and the Free Item Code to the line of Free Items on Items.
- Added the following changes to the EAGuessSourceLineIdByItem entity flow:
  - Added a Parameter: Consider Remarks
  - The ability to apply it to specific lines
- Added 3 Boolean fields to the lines of distribution documents.

### Sales

- In Offers - Invoice Offers - Discounts on the Invoice Value: under Applies To, added the "Price Application Scope" file.

### Accounting

- Added the "Do Not Copy Dimensions When Adding a New Line" option to the Journal Voucher term config.

### Manufacturing

- Added a "Create Production Orders" button to the Carton Material Planning document, to create Production Orders.
- Improved the Production Order so that it can be based on Carton Material Planning.
- Added a Secondary Item field to the Carton Material Planning document term config for selecting the secondary product item; based on it, the item is included on the Production Orders that are created, and its quantity is calculated automatically based on the (Trim) quantity — if the Trim value on the planning document is zero, no secondary product is added to the Production Order.
- Included the operations from the Carton Specification file on the Production Order, and included the operation resources linked to the standard operations listed in the Resources grid.

### Settings

- In the Direct Printing application, added a PrintLog containing the document code, Printed, Faild, PrinteTime.
- The TaxAuthoritySubmissionDoc document was taking a long time to save and a long time to send. This time has been reduced.
- Created a critical error message (POSCriticalErrorsParticipant) aimed at speeding up system performance for large customers who use Price Lists, built on a settings field for ("Warn users when the number of days since Price Lists expired exceeds") — with a default of, say, 100 days.
- Integrated WhatsApp with unifonic, the same way it was integrated with Wati.
- Added the "Allow Editing Vouchers That Stop the Cost Effect on Accounts" option to the User file.

### Point of Sale

- Improved so that the "Mobile Point of Sale Interface Settings" document is used to show only the desired fields.
- Added many new options to the "Mobile Point of Sale Interface Settings" file. Please review it.
- Added a field named "Print Captain Order Invoices" to the "Point of Sale Settings" document.
- Then blocked the automatic printing of the Shift Closing document.
- Added a permission named "Ability to Print the Shift Closing Document" ("CanPrintShiftClosing"). It is used in the permission lines of the Point of Sale Permissions file to grant the ability to print the Shift Closing document automatically.

### Human Resources

- Added the "Create Installments on Save" option to the Loan Voucher term config (so that, upon saving, the installment schedule is generated based on the data in the Header).

### Mobile Applications

- Added the ability to control deleting and showing the fields displayed in the attachment — namely the employee's own balances — on the Leave Request screen in the app, and applied the same idea to the Attendance & Departure screen.
- Improved the Work Commencement voucher from the app, in the Based On field for a Leave Voucher or an Aggregate Leave Voucher, so that only Leave Vouchers or Aggregate Leave Vouchers that do not already have a Work Commencement voucher are shown, rather than all Leave Vouchers.
- Added the Sales Invoice, Quotation, and Quotation Request types to the mobile app.
- Added a locator field to the line screen of the Electronic Stock-Count Committee document.
- Added 5 attachments to the Electronic Receipt document in the app.
