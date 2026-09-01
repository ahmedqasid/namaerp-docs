# Nama ERP Release Notes - December 2022

::: info Release Information
- **Release Date**: December 2022
- **Release Number**: Nama-ERP-202212
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the table "Inventory Aging Processing Run Times" to the Supply Chain settings.
- Added the option "Use Quick Save When Adding Sales Price List Lines to Items" to the Supply Chain settings.

### Fixed Assets

- **Fixed Asset Depreciation:** Added the following fields:
  - From Fixed Asset Classification 1, To Fixed Asset Classification 1
  - From Fixed Asset Classification 2, To Fixed Asset Classification 2
  - From Fixed Asset Classification 3, To Fixed Asset Classification 3
  - From Fixed Asset Classification 4, To Fixed Asset Classification 4
  - From Fixed Asset Classification 5, To Fixed Asset Classification 5

### Sales

- Added 5 additional description fields and 5 additional attachments, on top of what already exists, to the Sales Order screen.
- **Invoice Offers:** Added the field "Do Not Create a Coupon for Invoices That Already Have Discount Coupons" to the Discount Coupons lines.
- Added the field "Maximum Price for the Item" to the Item file, noting that the option in the Sales Invoice term config (Suggest Maximum Price for the Item) must be enabled for prices to be suggested on the invoice once the options are enabled.
- **E-Invoicing:** Added support for the Electronic Receipt system for the Electronic Invoice to Individuals, based on the directives of the Egyptian Tax Authority.

### Accounting

- Added the option "The Tax Can Be Edited" to the term config of both the Credit Note and the Debit Note.
- Added 3 n fields to the Journal Entry.
- Added the fields (Tax 1 Rate and Value, and Tax 2 Rate and Value) to the Journal Entry lines.
- Added the fields (Credit and Debit, Tax 1 and 2) to the Journal Entry term config.
- Added the option (Add Tax 1 to the Credit Total) to the Journal Entry term config.
- Added the option (Add Tax 1 to the Debit Total) to the Journal Entry term config.
- Added the option (Add Tax 2 to the Credit Total) to the Journal Entry term config.
- Added the option (Add Tax 2 to the Debit Total) to the Journal Entry term config.

### Hospital Management System

- In the Medical Services Invoice - Service Lines, added the fields (Line Subsidiary - 5 references - 5 numbers - 5 text).
- In the Indirect Medical Cost Item, added the grid "Actual Value Distribution by Invoice Type".

### Service Center

- Prevented closing the Work Order when there are open technician time entries in the executions that have not yet been closed.
- Added a Sub-Item Criterion and a Sub-Item Query to the "Sub-Item Status Movement Lines" table, so that the status is applied only if the criterion matches; also added a Criterion and a Query for the voucher in "Sub-Item Status Movement Lines".
- Added a Criterion and a Query for the sub-item in "Sub-Item Status Update Lines", and also added a Query for the voucher and changed the translation of the Criteria field to "Document Criterion".
- When a Sales Invoice linked to a Work Order is in draft status, improved so that deleting the invoice also removes it from its field inside the Work Order.

### Banks

- Added a "Tax Information" section to the Bank Account file.

### Human Resources

- **Salary Voucher:** Added the "Loan Type" field to the Paid Installments grid.

### Contracting

- **Contracting Supplies Invoice Window:** Added Date 1 through Date 5 to the Details grid.
- Added 5 date, 5 text, and 5 n fields to the Details grid in the Sarky document.
- Added a field inside the Project Contract named "Opening Extract Numbers", which is taken into account in the Extract Number field on the Extract when creating the project's Extract.
- **Standard Condition:** Added the option "From the Current Extract's Lines, or from the Previous Extracts' Lines if There Is No Quantity in the Current One" to the Custom Formula Lines Source list.
- Added the option "Invoice Return" to the Contracting Supplies Purchase Invoice term config.

### Point of Sale

- Added the field "Number of Times to Resend the Invoice if Sending Fails" to the Point of Sale settings.

### Settings

- **Global Config:** Improved so that when the option (Maximum Number of Records When Showing All in Lists) is enabled, it also applies to the selection list (the magnifier).
- Added the following two options to the Global Config:
  - Show the "Search In" field.
  - A File or Document Must Be Selected in Search In Before Searching on the Server.
- **Car Window:** Improved the "Car Owner" field so that it can be a Related Party or a Vendor.
- **Car Window:** Improved the "Insurance Company" field so that it can be a Related Party or a Vendor.
- **Car Window:** Added the following fields:
  - Car Number in English
  - Ownership Date
  - 5 description fields, in addition to what already exists
- Added the field "Additional Customer Data Template" to the Tax Authority settings.
- Added an action to change the effective date for any number of documents from the More menu in list view, using the shortcut (alt + ctrl + x).

### Mobile Applications

- Added an option named "Do Not Show in the Mobile App" to the Leave Type (works in ESS and nama Mobile).
- **Electronic Stocktaking Application:** Added the following improvements:
  - Added two fields to the Electronic Stocktaking Committee lines (Administration Code - Version). To show these two fields in the application, the option must be enabled through the settings.
  - Added a waiting dialog and a success message for sending the stocktaking committee to the system.
