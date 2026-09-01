# Nama ERP Release Notes - July 2024

::: info Release Information
- **Release Date**: July 2024
- **Release Number**: Nama-ERP-202407
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the following two options:
  - Creation date always starts at the hour
  - Creation date always ends at the hour

  in the settings of the stock document term config (Issue - Supply - Transfer) to set the creation time.

### Sales

- Added the option "Do not validate the tax data sent with saving" in the term config and document book, under tax information.
- Added the following fields to the Sales Order as well as the Invoice:
  - Deferred Save Error Count
  - Has Deferred Save Errors
  - Number of Unsaved Lines

  These fields can be shown and are filled in automatically when errors occur, and each line is saved individually to reduce the impact of errors.

- Added an option named "Do Not Update Item Lot And Box From Issue And Sales" in the Supply Chain settings.

### Human Resources

- In the Attendance Machine Config file, added the following:
  - A button for manual sending
  - The ability to make the WAR work manually only
  - The ability to pull data from an SQL or Access database

### Real Estate

- Added 5 fields of type (date) to the payment lines on the Sale Contract screen.
- There was no effects page for the term config of the "Real Estate Purchase Contract" document. It was added just as on the Sale Contract screen, with the ability to specify accounting aspects for each installment type, as with the Sale Contract.
- Added the following documents:
  - Real Estate Purchase Contract
  - Real Estate Revaluation Voucher
  - Add Financing to Investment Fund Voucher
  - Real Estate Investment Fund
  - Investor Exit Voucher

### Customer Relationship Management (CRM)

- Added VAT, withholding tax and additional tax fields on the Maintenance Contract screen, in the (Spare Parts - Services) tables, and added fields for the tax totals on the same screen.
- Added tax fields to the spare parts and services tables in each of the following windows:
  - Maintenance Order
  - Maintenance Notice
  - Maintenance Visit
  - Maintenance Invoice.
- Added a services grid, with its own tax fields, to the Maintenance Notice document, on the Spare Parts and Services page.
- Added the item version to the spare parts lines on the (Maintenance Invoice - Maintenance Order Execution) screens: the system used to create a stock issue automatically when a Maintenance Invoice was created, and would not allow saving because the version was missing. It was added to the spare parts lines, taking into account copying it to the stock issue voucher.

### Accounting

- Added the option "Treated like the Receipt Voucher with all its effects" in the Receipt Order term config.
- Added the option "Treated like the Payment Voucher with all its effects" in the Payment Order term config.
- Added the option "Not included in exchange rate change vouchers automatically" on the account, so that the system does not include and adjust the account's balances in exchange rate change [vouchers] unless the user places it manually in the "Account" field on the voucher header.

### Taxes

- Added the option "Fill the current quantity with the remaining quantity from the previous Extract" to fill the current quantity with the remaining quantity based on the previous Extract.
- Added "Accounting Percentage" fields to the stages grid of the contract items.

### Settings

- Updated the current release to require Tomcat 10 and Java 21, reflecting Namasoft's commitment to keeping pace with the latest software developments to ensure better performance and security. For more details on the upgrade, please contact technical support.
- In the integration with the Zakat, Tax and Customs Authority, added an option in the Sales Return term config and the Sales Return Request term config that allows creating a Sales Return that is not sent to the tax [authority], based on a Sales Invoice that is sent to the tax [authority].
- When all pages are hidden from a user through permissions, the system used to show "Could not perform the operation" - improved so that a clear message is shown.
- Added the alternate code (altCode) for each of:
  - sizesAndColors
  - primaryUnits
  - secondaryUnits
  - manfCodes
  - customerCodes
- Added an error message when saving an attachment on the (BankReconciliation and TimeAttendance) screens in the old Excel format (xls) instead of the modern format (xlsx).
- Showed an error message when importing records in the old Excel format (xls) instead of the modern format (xlsx).
- In E-Invoicing, updated so that sales invoices are sent to the tax [authority] when the subsidiary is "Employee" (Jordan taxes).
- Prevented creating a "document cancellation document" for a document that has been reviewed.
- Enabled the taqnyat.sa SMS provider.
- Added the line (bindOnInit="false") to the server file when installing the program.
- Added a system confirmation message for the code field when it has already been saved and is then changed at the file level.
- Added the field altCode = English Code on the Related Party screen.
- Added the alternate code on each of the following windows:
  - Partner
  - Vehicle screen
  - Warehouses screen

### Point of Sale

- In Point of Sale, when paying through a payment terminal, handling payment with more than one card was taken into account, since the system previously did not account for this when splitting the invoice amount across two payment cards.
- Added a shortcut for the payment terminal button, for the payment method that has an amount.
- Added "Allow editing field", "Tax can be edited" to the Point of Sale voucher term configs.

### Mobile Applications

- Enabled the Stock Taking app in the bundled app.
- Applied screen templates (Point of Sale Default Values Template) to the Captain Order app.

### Reports

- In the report builder tool, added the Ignore Width option in the crosstab section.
