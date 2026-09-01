# Nama ERP Release Notes - March 2023

::: info Release Information
- **Release Date**: March 2023
- **Release Number**: Nama-ERP-202303
- **File Type**: Monthly Release Notes
:::

## Additions

### Sales

- Added the ability to send Electronic Receipts to the Tax Authority without requiring an electronic signature or seal, since sending the receipt does not require a signature or seal.
- In the e-invoice - the document sent to the Tax Authority, added a field on the lines named "Final Net".
- Improved the e-invoice so that if the invoice is related to a receipt that has already been sent, it is prevented from being cancelled via a Voucher Cancellation Voucher.
- In the free items grid based on the invoice's item count, added a new type for the field "Item Count Calculation Method" named "By Item Count Without Repetition", and also added a new type in the discounts named "Invoice Reduction".

### Accounting

- In the term config of both the "Payment Request" and the "Bulk Payment Request", added the option "Set the Request Status to Accepted on Save".

### Freight Management

- Prevented duplicating the same number in the "Bag Number" field in the "Bags Receipt Document" window.

### Contracting

- In Subcontractor Contracts, added a Check Box named "Manual Term Coding". This option allows manually coding terms on a given contract even when automatic term coding is in effect (per the Contracting settings).
- Added a field named Manual Parent Term Code to the term lines.
- Added the option "Automatic Term Coding" to the Contract Template.
- Improved so that double-clicking the Manual Parent Term Code in the Contracting screens makes the system guess the term's name, to make it easier to know the name of its parent term.
- Added the option "Do Not Copy Term Lines" to the Contract Template screen.
- Added the Alternative Code to the Project Contract screen.
- Added an option named "Consider the Previous Term When Searching by Term Code" in each of the following windows:
  - Project Contract
  - Subcontractor Contract
  - Executive Contracting Budget
  - Estimated Contracting Budget
- In the Subcontractor Execution screen, added 5 attachments in the main group and added 2 attachments on the lines.
- Improved so that when searching for a term code, the term description is shown.
- Improved so that when the option "Consider the Project Remarks in the Term Lines When Suggesting a Term Code" is enabled in the Contracting settings, the project description is shown.
- Improved so that when filtering by term code, the standard term is taken into account when it is not empty.

### Real Estate

- Added a new window named "Real Estate Broker".

### Customer Relationship Management (CRM)

- Improved so that when a survey is sent by SMS for Kuwait customers, a "Powered By Exceed ERP" message is shown after the survey is completed.
- Added an option on the Survey Template named "Allow Answering the Same Survey More Than Once from the Link"; if this option is not selected and answering the survey is attempted again via the link after it has already been answered once, the message "This survey has already been answered" is shown.
- Added four remarks fields to the Contact window.
- In the Survey screen, added 5 description + 5 n + 5 reference (ref) fields on the lines.
- In the Survey screen, added 2 attachments on the lines.

### Human Resources

- In both the "Residence Renewal Request" and the "Bulk Residence Renewal Request" documents, added a Number of Days field, so that when a number of renewal days is entered, e.g. 60 days, the system calculates the new end date by adding the number of days to the old end date field.
- In both the Dues Liquidation window and the Bulk Liquidation window, the field "Liquidated Up To Date" is now taken from the date in the Employee screen field "Last Return-to-Work Date After Liquidation"; if this field is empty, the date in the Opening Leave Balance is copied, and if that has no date in the opening leave balance voucher, the hire date is copied.
- Added a new grid in the Human Resources settings named "Prevent Issuing Salary Vouchers If the Following Exist".
- Added an entry allowing codes of non-existent employees to be ignored when importing time attendance data via the entity flow EATimeAttendanceFromDBImporter or the entity flow EATimeAttendanceFromDBImportIntoDocument.
- In the Medical Insurance Upgrade voucher, added the following two fields to the lines
  - Refunded Value | Tax Percentage
  - Refunded Value | Tax Value

  Also added the following two fields to the term config

  - Refunded Value Tax Debit
  - Refunded Value Tax Credit
- Added 5 text fields on the line in the Employee screen - Dependents grid.

### Contracting Maintenance

- In the Maintenance Invoice, added a Payment Form field + a Payments grid. In the invoice's term config, added the option "Use Payment Vouchers in Debt Aging".

### Travel

- Launched a new system dedicated to Travel.

### Point of Sale

- Added a new option in the POS settings, allowing the company's legal entity field to be added to the Customer screen.
- Added the ability to change the table when a specific invoice is on hold, moving the invoice from one table to another or merging more than one table onto the same invoice.
- Added a Scroll to the Tables screen.
- Added the ability for the user to show versions, sizes, and colors of items when adding the item in the item's additional-items file in POS.
- Reduced the size of the invoice data in the Favorites part of the Sales Invoice screen, allowing more space to display the favorite items part, and also rearranged the POS buttons so they look better and work more efficiently.
- Added the POS database tables and fields at https://www.namasoft.com/dm

### Project Management

- In a Work Task, added 5 numeric fields in CPATaskLine on the lines.
- Added 10 options in each of Invoice Classification and Document Classification.

### Settings

- Added a new button in the Editor screen in Screen Customization that shrinks to show the fields, composite fields, blocks and actions found in previous screen customizations, with the ability to restore them.
- Added a button to control the More Actions inside the Editor.
- Increased the text fields to 30 in each of the Remarks lines, Model 1 - 2 ..., and Subsidiary 1 - 2 ....
- Added 5 options to the Analytical Group screen.
- When there are accounts blocked from movement, an error message appears saying there is a problem. Made the message more detailed so that it shows the file through which the account was blocked.
- In the entity flow com.namasoft.modules.accounting.domain.utils.actions.EAReverseLedgerTrans, added an entry for a percentage (the journal entry values are reversed by a certain percentage).

### Mobile Applications

- In the Bulk App settings, added a grid named "Fields Allowed to Be Edited" in the mobile app screens, to allow selecting the allowed values for "the field linked to" in Electronic Attendance in the Nama mobile app.
- In the Nama Mobile app (Bulk), added the ability to attach a file in the following screens:
  - Electronic Attendance (1 attachment)
  - Departure Permission (attachment)
  - Leave Voucher (1 attachment)
  - Maintenance Visit (1 attachment)
  - Visit Voucher (attachment)
  - Sales Order (1 attachment)
  - Sales Return (1 attachment)
  - Delivery Voucher (1 attachment)
- **Captain Order app:** Added the ability to require the POS user to select versions, sizes, or colors of the item when creating the item's additional-items file, and it can no longer be left empty.
- Added a screen that allows scanning any item, showing the available quantity of the item and its storage location, or scanning a storage location to show the items and quantities present at that location.

### Reports

- Added the ability to filter a dimension in the report based on another dimension, using the new Report Builder tool.
