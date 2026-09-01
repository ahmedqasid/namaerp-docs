# Nama ERP Release Notes - November 2024

::: info Release Information
- **Release Date**: November 2024
- **Release Number**: Nama-ERP-202411
:::

## Additions

### Sales

- Added a new file named "Pricing Range" (PricingRange) for offers, so that some items are included in the offers and others are not.
- In the documents term config, added the field "Actual Journal Entry Date Source".
- In each of (Sales Invoice, Sales Return, POS Sales Invoice, POS Sales Return), added the field "Earned Reward Points Value", with the ability to create a journal entry for this field using the entity flow EAAddAccountingEffect.

### Inventory

- In the "AssemblyDocument" screen - the stockDocs grid, its size was made Medium, or at least Small.
- In the lines of the "Delivery" document screen, the following fields were completed for the lines (details.n \ details.date \ details.ref \ details.text), bringing their count to 5 each.
- Added two inputs to the entity flow "EAGenSCDocFromDocWithFieldsMap" - one of them a criteria definition code or id (must be on the lines), and the other a query (must also be on the lines). Note that the document will not be created if no matching lines are found.

### Manufacturing

- Added the following documents:
  - Manufacturing Template
  - Manufacturing Template Supply
  - Manufacturing Template Scrap
  - Manufacturing Template Location
  - Manufacturing Template Consumption
- Added template lines to the following windows:
  - Operation
  - Standard Operation
  - Production Order: on the Operations page
  - Production Order: on the Operations page
- Added a group to the Production Execution term config named the Manufacturing Template Consumption document.
- Added a listView to the Production Execution document, in the Related Documents tab.

### Customer Relationship Management (CRM)

- Added a grid (Request Execution Time) to the (CRMTroubleTicket) screen, with the fields (Employee - Start Date & Time - End Date & Time - Execution Time) and a (Start - Finish) button, to start a task and automatically close it when another task is started for the same employee, and to compute the execution time for each task.

### Banks

- Allowed repeating the coding prefix across Financial Papers books, provided there is no overlap in cheque numbers and no cheque number is repeated between two books, such that the first number in the following book with the same coding prefix is greater than the last number in the first book.
- Added the currency rate to Letter of Guarantee documents and made it considered in the journal entries.

### Service Center

- Added an option named "Use the Work Order to track quantities" to the term config of both the Spare Parts Issue Request and the Spare Parts Issue.
- Added the tax-enabling options to the Maintenance Contract screen term config, such as the fields (Taxable - Tax Policy - Tax Can Be Modified - Allow Modifying the Invoice Tax on the Line).
- Added the option "Show taxes in Work Orders and their documents" to the Service Center settings, to enable the tax fields to appear on the pages (Work Order - Closing the Work Order - Assay).
- Added a list view on the Work Order document in Service Center named Returned Spare Parts, and also a list view named Issued Spare Parts.

### Contracting

- Added costlines to the Equipment Statement document, similar to what exists in the Sarky document.

### Settings

- In the payment system through (pgw), improved so that when the device is restarted, the connection data is re-entered automatically, since the last settings entered in the program are saved so they are used directly; also updated so that the program runs automatically as soon as the device is turned on.
- Modified the pgw properties on the payment terminal file under the method group reference, and added new properties to link them with the interpay properties.
- In the "Submit Documents to the Tax Authority" document (TaxAuthoritySubmissionDoc), when there is a Block from the Tax Authority's website, a log appears saying the operation could not be executed. Improved so that a clarifying error message is shown, such as (You have been blocked from the website for " " and " " remains), clarifying the time in the error message.
- In Global Config - Mail and SMS screen -, added the field "Failed Pending Tasks Notification", where the file/document type "Alert Definition" is selected, the option "Manual" is enabled, and the alert template and the targets are specified.
  Note that the field will only suggest files where the file/document type is set to "Alert Definition" and the "Manual" option is enabled.
- In the Contracting settings, added the option "Deduct the tax remainder with the payment method as a percentage of the amount due with each Extract".
- Linked WhatsApp with the company Morasalaty.
- Added the option (Send Reset Config With Approval) to the License Manager for each customer.

### Human Resources

- Added the option "Do not modify the value on reissue" to the line on the Salary document.
- In the "Employee" screen, added (5 n fields and 5 text fields) to the Qualifications grid.
- Added the option "Allow negative values" to the Salary Components term config settings, to allow negative values to appear.

### Point of Sale

- Added a shortcut to reprint the document with (alt+p), which can be changed from the Point of Sale shortcuts file.
- Added a shortcut for the Redeem Loyalty Points button with (alt+r), which can be changed from the Point of Sale shortcuts file.
- Added a combo box field named (otpFormat=OTP Format) to control the OTP type, with the options (Numeric=Numbers only - AlphaNumeric=Numbers and letters - Alphabetic=Letters only); also added the field (otpCharacterCount=OTP Character Count) to determine the number of OTP characters.
- Showed the car code on suspended invoices.
- Added an option to print invoices in POS, to stop or enable printing.
- Applied the effect of the "Pricing Range" file in POS.
- Added the grid (Request authorization from another user when the following permissions are missing) to the Point of Sale settings, through which the permissions that require confirmation with another user's username and password are selected; also added the button (Actions performed by another user) to the Point of Sale menu under (Other Actions), so the user can review what was authorized by another user.
- Added the ability to send the Point of Sale invoice to the tax authority immediately after saving it, through the entity flow "EAAutoSendEInvoice".

### Accounting

- Added a field to the term config named the tax item (taxItem), to allow sending DebitNote and CreditNote to the Zakat and Income Authority, with the ability to specify the item type and the unit from within the book and the term config.
- In the "Electronic Receipt Voucher" (ElectronicReceiptVoucher) document term config, added the option "Handle in Debt Aging and Payment Method Expenses like", similar to what exists in the Bank Transfer term config, with a screenshot of the option attached from the transfer term config.

### Real Estate

- Added a checkbox to the multiple/bulk creation data named "Distribute the entire remaining value over the number of installments"; in this case, entering a percentage or a value on the line is rejected. Note that only one line may have this option selected, and it must be the last line.

### Mobile Applications

- Modified so that the "Balance Due During the Year" field takes the employee's hire date into account. That is, if the employee's hire date is 01-07, the system prorates 30 days against the 365 remaining days of the year, resulting in a balance due during the year of 15 days.
- In defining an app menu in the target links settings in Nama, the following changes were made:
  - Changed the code to (Group Code) and the link name to (linkTarget), and added a Report Definition field and an mobileDashboard field, an Arabic title and an English title, and on save, verified the value and the link.
  - In the shortcut definition
    - Shortcut translation
    - Shortcut type
    - Report Definition
    - Shortcut Definition
    - mobileDashboard
- In the phone app settings, added the option "Allow modifying free lines", and made the default to not modify free lines.

### Reports

- In the Report Designer - 'Crosstab' page -, in the Columns grid and the Rows grid, added the field "Total Position" to the lines.
- Added an item to the menu under Reports named "Currently Running Reports", where reports run during the last 48 hours are placed; through the "View Result" column the report can be displayed again. All runs are shown to system administrators - only the runs made by the current user are shown to that user.
- Added the following fields in the Report Designer, on the crosstab page, in the formula lines:
  - Final Jasper Expression
  - Custom Jasper Expression
  - Open Hyper Link Expression Editor
