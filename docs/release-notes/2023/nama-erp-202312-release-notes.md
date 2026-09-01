# Nama ERP Release Notes - December 2023

::: info Release Information
- **Release Date**: December 2023
- **Release Number**: Nama-ERP-202312
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- In the Stock Taking Committee, added the following:
  - A term config, enabling the option (Group similar lines with Based On) that exists in the term config.
  - The field "Initial Stocktaking Committee" to the details lines in the Electronic Stocktaking Committee screen.
- Added the fields (n1, n2, n3, n4, n5) to the lines of the table itemPriceLines, updating them from price lists exactly like the default price, minimum price, and maximum price.

### Travel

- Added the Tax Information block to the Restaurant window.

### Sales

- Added 5 attachments to the After-Sales Offer Claim document.

### Accounting

- In the document TaxAuthoritySubmissionDoc, used for sending data to the Tax Authority for integration with the Zakat and Income Authority, added discount fields similar to the tax fields, and showed the following fields:
  - Total before discount
  - Total after discount and before taxes, then the taxes
  - Final net after discount and taxes
- Added a field for the bank account number to the wizard in the Prepare Bank Account procedure.
- Added the Additional Information table to the Treasury file (the same one that exists in the Warehouse).
- When creating a Request/Disbursement Voucher Based On (Residence Renewal - Payment of Medical and Social Insurance Dues), the system did not pull in the data. Improved so that the details are copied into the lines.

### Customer Relationship Management (CRM)

- Added the ability to send text messages through Vodafone Egypt, by adding a new service provider named Vodafone Egypt.
- Added 5 ref fields to the lines of additionalSpareParts.

### Contracting

- In the Contract lines, added the field "Accounting Percentage".
- Added "Contracting Item Classification 2" to the Contracting documents.
- Added a new document named "Contracting Supplies Purchase Request".
- In the screen DailyLaborBook, added reference fields to the lines.
- In the Subcontract file, added 5 additional description fields, bringing their number to 10 instead of 5.

### Human Resources

- Increased the number of attachments to 10 in the Employee Data Update screen.
- An error sometimes occurred because a payroll year did not exist for a specific calendar. Improved so that a message indicating the error is shown.
- In each of (Employee - Employee Management - Job Location - Job Grade - Reason Type - HR Settings).
- Added the field "Maximum number of hours for a single permission".
- In the Vehicle Procedure document, added 3 attachments to the line.
- Allowed editing the screen in the app for the Leaves screen.
- Added a new voucher named "Bulk Exit & Re-entry Visa Request".

### Real Estate

- In the Real Estate Broker screen, added the group "Tax Information".

### Settings

- Added the entity flow "EAScaleImage" to compress image sizes, similar to compressing the file's image sizes, but for attachments, provided that the attachment is an image; it does not work if the attachment is not an image.
- When a temporary permission is added for a user, all the permissions in the file are added except for the customized permissions. Improved so that the permission is now treated as complete.
- Added the edit date to the system's journal entries.
- Added compression for PDF files exported from the program, due to their large size.
- Added the ability to use F9 from a mobile or tablet to trigger the Tooltip, in the New GUI, through the Column Menu and the last column dedicated to actions, taking into account that the button for triggering the (Tool TIp) is not added to the Column Menu unless it has a tooltip, and the button is not added to the Actions column unless the grid itself has one (the action named "Show Quick Help - Show Tooltip").
- Completed the integration with Saudi Telecom Company (STC) points, with the following actions:
  - Rewarding the customer for amounts paid.
  - Adjusting the customer's reward when the amount paid is reduced.
  - Checking the status of the reward request.
- Added a mechanism to automatically send invoices to the Tax Authority at a specific time, via the entity flow com.namasoft.entiyactions.EAAutoCollectSignAndSentEInvoice
- In Global Config, added the field "Use Ledger Calendar".
- In the Report Definition, added the field "Preview Layout", so that the report's display method is determined from this field, which already exists in both (User - Global Config); the priority of this field's value is as follows:
  - User
  - Report Definition
  - Global Config
- Added the field Allow Filling Disabled Fields With Creators to Global Config.

### Point of Sale

- Added an option named (doNotAffectRemaining) to the Payment Method and the payment lines.
- When the option Do Not Affect Remaining was checked, the accounting effect was incorrect. Improved so that the payment method amount does not affect the Remaining field, without changing the accounting effects.
- Added the option "Use the item's sizes and colors attachment for images in Point of Sale" to the supply chain settings.

### Mobile Applications

- Locked the app's opening language to the phone's language, which is currently English.
- Added the ability to hide some unnecessary fields in the Login screen, such as the Register Code, Email, and Admin Code.
- Added the ability to lock the Printer field in the Login screen so that it can be hidden.
- In the Nama Mobile app, made the Sales Invoice screen more clearly distinguished from the Return screen, such as by using a larger icon or changing the color of the lines or the header.
- In the Nama Mobile app, added the following:
  - Added the Customer Credit field that exists in the Customer screen, so that it cannot be edited and is for display only.
  - Added a Payment Method field to the header.
  - Rounded the Total field in the search, the line, and the payment table to the nearest two decimal places.
- Added a file named App Shortcuts Definition, where shortcuts are added; also added a reference to it in the App Menu Definition screen.
- Added a field named Icon Color to the lines of the App Shortcuts screen.
- In the Nama Mobile app, in the Sales Invoice and Return screen, after selecting the lot, improved so that the keyboard does not appear by default, and likewise after clicking the Add and Close button for the item from the search table.
- In the Applications settings, added a field named Number of Decimal Places in App Prices.
- Added the ability to pay from the Captain Order app.
- Showed a list of all invoices held on the POS in the Captain Order app, with the ability to edit and pay them from the app.
- In the mobile app settings, added the Dimensions fields, the Applies To field, and a query field named "Applies when the user's file matches the query".

### Reports

- Inside the Hyperlink Expression Editor screen, added the following:
  - Added a field to select the report to navigate to through the link.
  - Added another field that holds the parameters of the selected report.
  - Added a compo that holds the types of values that can be worked with (field - parameter - expression).
- Added Custom Expression fields to each of:
  - The grid Group1 Header Custom Expression Lines
  - The grid Group Footer Custom Expression Lines
- Added the ability to add fields to the Title and add fields to the last Page Footer, while respecting the Pattern.
- Added the Lock Language field that exists in the Report Definition, inside the tool.
- Added a Form for printing cheques for 8 Egyptian banks to the system reports.
- Added a Hyperlink inside the grid Groupr Custom Expression Header & Footer on the selected fields.
- Enabled the crosstab in its normal state so that it shows the equation fields next to each other; if the user wants to show them vertically, added an option named (Show equations vertically).
- Added a field to the crosstab's column and row lines named (Order Reference By).
- In the Stocktaking app, added the Arabic Item Name as a column in the Stocktaking Committee screen.
- Added the following fields to the fields lines:
  - A list field (Show Field As), which contains the options (Spell Out - Barcode - QRCode).
  - A list field (Barcode Type), which holds all barcode types; if no barcode type is selected, the type Code128 is used as the default.
  - A field (Currency Field): when Spell Out is selected for the field and the field does not depend on a currency or unit field in its pattern, the user must choose the field from which the currency or unit will be copied into this field.
- In the Stocktaking app, when editing a line, improved so that the system automatically recognizes the unit based on the code.
- In the Nama Mobile app, when creating a Leave document, improved so that the Leave document's code is shown above the start date, and a hyperlink is created on the code to open the document in Nama.
