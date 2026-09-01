# Nama ERP Release Notes - August 2023

::: info Release Information
- **Release Date**: August 2023
- **Release Number**: Nama-ERP-202308
:::

## Additions

### Inventory

- Added an option, in the warehouse document generation rule, to prevent deleting a previously created document when re-saving.
- Created a new file named "Automatic Sales Pricing," where a new automatic pricing system was developed. In brief: when saving any purchase voucher - if the system finds that the option to enable pricing via the term config is checked - it searches for all items that have an Automatic Pricing file - it looks for the file in the Item file - if not found, then the Item Section - if not found, then Classification 1 through ten, and so on in the same order mentioned at the start. For all items that have Automatic Pricing - the pricing source is calculated based on the user's choices - the three profit margins are looked up in the Item file - then the Classifications, and so on in the same order mentioned above - if no profit margins are found, the system shows an error that profit margins must be specified for the selected item. The three profit margins are applied to calculate the minimum suggested selling price - the suggested default selling price - the maximum suggested selling price.
- In the Warehouse file, added a grid named "Additional Information."
- In the Assembly Voucher term config, added the option "Calculate the Average Selling Price from the Issue Cost of the Disassembly Voucher."
- Added 10 description fields and 10 n fields to the Reservation window.

### Purchasing

- Added a list to the Purchase Invoice term config named "Deduct Quantity Tracking from the Warehouse Document Quantity," with "Tracking in the First - Tracking in the Second."
- Added the option "Recreate the Warehouse Documents for the Invoice When Saving the Return" to the Purchase Return term config.
- In the lines of Sales and Purchase Invoices and Orders, added the following:
  - Added the field source line id.
  - Added 5 n fields from n6 to n10, where n1 to n5 already existed.

### Sales

- **Sales Price Lists:** Added the following fields:
  - "Color Name."
  - "Size Name."
- Added the field "Select" for selecting lines in the details lines of the Shortages document.
- **In Sales Quotations - Item Discounts:** Changed the Quantity to (Minimum Quantity, Maximum Quantity), taking this into account in POS as well.
- In the More menu of the Shortages document, added a button named "Create Purchase Order for Selected Lines Only." When clicked, only the selected lines are copied, and a new screen opens to create a Purchase Order document with the data copied from the Shortages document.
- Added 5 option fields to the Shortages document screen, which can be shown by editing the screen.
- Improved so that when issuing the Reservation Voucher from the Sales Invoice with locations, one Preparation Voucher is created per day according to the suggested delivery date on the invoice and the warehouse location classification. That is, if we have 4 warehouse location classifications W1, W2, W3, WIT, and the suggested delivery date is 30/7/2023, 4 Preparation Vouchers are created, one per classification, based on the quantities available at each location.

### Accounting

- Added the Alternate Code field to the Chart of Accounts screen.

### Fixed Assets

- Added a new voucher named "Preliminary Asset Receipt Voucher."

### Banks

- Added attachment fields to the Financial Papers Book.

### Real Estate

- Prevented reserving the Aggregated Unit if it has already been reserved.
- In the Collection Voucher screen - Details grid, added the following fields:
  - Installment 1 Tax | %
  - Installment 1 Tax | Value
  - Installment 2 Tax | %
  - Installment 2 Tax | Value
  - Installment Value After Tax

### Service Center

- In the Service Center Estimation, added the following fields to the "Total Price" section
  - Total Discount 1 for Operations
  - Total Discount 2 for Operations
  - Total Discount 1 for Spare Parts
  - Total Discount 2 for Spare Parts
  - Total Operations After Discount
  - Total Spare Parts After Discount
  - Total Cost After Discount
- In the Gate Pass voucher, added a grid named "Multiple Exit Pass."
- Created a tool that recalculates and corrects all the statuses specific to the vehicle (the sub-item), due to some errors or overlapping transactions that are hard to trace.

### Travel

- Prepared the Travel and Tourism module for e-Invoicing.

### Human Resources

- **Leave Type window:** Added the option "Must Be Added to the Contract," so it only shows for employees who have had this type added to their contract, for use with the option "Allow Exceeding the Leave Balance."
- Prevented showing leave types that are disallowed from use in the Nama Aggregated app.
- Added the option "Schedule Payroll Issuance by Reissue Date and Time" in the Human Resources settings, along with notification template fields for a successful reissue or a failed one, named "Payroll Reissue Success Notification Template" and "Payroll Reissue Failure Notification Template," respectively.
- **Project Contract:** Added the Payment Period as a compound field made up of two fields, one for the period and the other for the value.
- Added the Due Date field to the Project Extract, taking into account the value in the Contract, so that the system automatically calculates the due period from the actual date.
- **Subcontractor Contract:** Added the Payment Period as a compound field made up of two fields, one for the period and the other for the value.
- Added the Due Date field to the Subcontractor Extract, taking into account the value in the Contract, so that the system automatically calculates the due period from the actual date.
- Added a mechanism for creating a custom list view with document data from the lines.
- In the Subcontractor Extract screen, improved so that when the current quantity is entered, the program calculates the total value.
- In the Batch Residence Renewal request, added the button "Consolidate Employees."
- Added the Leave Balances file field (based on experience), which exists in the Job Offer and the Data Update Voucher, to the Personnel Affairs Information screen.
- Added a new grid named "Additional Data" containing (10 number fields, 10 text fields, 5 date fields, and 3 reference fields) in each of the following windows:
  - Project Contract
  - Subcontractor Contract
  - Project Extract document
  - Subcontractor Extract
- In the Advance Rescheduling voucher, added attachments (Attachment 1 through Attachment 5).

### Manufacturing

- Added 5 optional fields to the details lines of the Production Order Execution.
- Improved so that when issuing raw materials based on the Production Execution and selecting the operation number in the operationSeq field, the raw material lines specific to the selected operation are not filtered.

### Point of Sale

- Improved so that when there is any draft document in POS due to the "Save Documents with Errors as Draft" feature being enabled in the POS settings, a critical error is shown when users log in, just as happens when there is a document that failed processing.
- Added new options to the POS permissions, as follows:
  - Show POS Expenses for the Current Shift Only.
  - Show POS Receipts for the Current Shift Only.
- Added the following improvements:
  - When searching in the table, jump down to the selected line, with the ability to edit it.
  - Added a warning when closing POS: "The program will close, do you want to continue?"
- Added the ability to create a shortcut for every field in the POS screens according to its ID, taking into account that the Shortcuts file will not be saved if a shortcut is duplicated.
- Improved Opening the Shift by adding a Close Shift Document field, which is filled in when the shift is closed.
- Created a new file named "POS Payment Methods Settings," and added a reference to it in the Machine and the POS Settings named "Payment Methods Settings."

### Letters of Credit

- Added the following improvements to the Preliminary Purchase Invoice document:
  - Added the choice "Cash Against Documents - CAD" among the available choices in the "Shipping - Delivery Policy" field.
- The field "Expected Delivery Date" is now calculated **as soon as** the "Expected Delivery Period" is entered, starting from the "Expected Shipping Date," exactly like the way the "Delivery Date" field is calculated.
- Added the following fields to the "Basics" group in the "Details" screen
  - Added a new field (date) named "Readiness Date    - Added a new field (date) named "Discharge Start Date
    - New field (date) named "Discharge Completed Date"
    - New field (text) named "Import Permit Number"
    - New field (text) named "Import Approval Number"
  - Added the following 3 fields (reference) ..
    - Field "Marine Agent" - reference to "Related Party"
    - Field "Inspection Agent" - reference to "Related Party"
    - Field "Stevedoring Agent"

### Contracting

- Added the option "Allow the Returned Quantity to Be Greater Than the Quantity Issued to the Contract."
- In the Subcontractor Raw Material Issue lines, added (Term Analysis Code - Analysis Card), which are not shown on the screen and must be added via Edit Screen.
- **Subcontractor Extract:** Improved so that when the current quantity {details.paidQty} is entered, the system calculates the total value {details.totalQty} using postAction, rather than on save.

### Settings

- Added the option "Do Not Show Critical Errors" in the Permissions window.
- Improved so that the System Administrator user is not counted, when logging in for a customer through CRM, in the customer's user license count.
- Required when issuing the Reservation Voucher from the Sales Invoice with locations
- Improved e-Invoicing so that the software message that used to exist, which the device needs for the electronic signature, is returned.
- Added a list named "Default Price in Price List" in each of the following windows:
  - Customer
  - Sales Vouchers Term Config
  - Customer Classification
  - Customer Category
  - Supply Chain Settings
  - Machine
  - POS Settings
- Added the field "Points Owner" to the "Loyalty Points Settings" screen.
- Added the ability to send the Invoice or the Credit/Debit Note as export documents, by adding a new option in the term config named "Export Document."
- Improved the Batch Data Update voucher so that it does not recalculate the previous values of the individuals, as is the case in the Individual Data Update voucher.
- Added the following improvements:
  - Added a field in hours to make the payment link time-limited.
  - Added a field to edit as a user in the settings.
  - Added a page shown when the time-limited link expires.
- Prevented the user from adding the Settings Menu as a type in the Unused Screens grid within the Settings Menu.
- Added the option "Ignore the Error of a Missing Field in References and the Record" to the Accounting side.
- In the Report Wizard, added the ability to create jasper variables through the wizard, taking this into account and making it easier in the Custom Jasper Expression.

### Project Management

- Added the option "Do Not Use the Coding Format When Calculating the Next Number," so that the coding format is not taken into account when numbering the document series.
- In the Task Execution lines, added the following Dimensions:
  - Legal Entity
  - Sector
  - Branch
  - Analysis Group
  - Department

### Mobile Applications

- Added the following to the Aggregated app
  - The ability to keep the login data after the first login.
  - The ability to show the password.
  - A permission for the ability to code a customer (if the user does not have permission to add a customer in Nama, it will not show for them).
- Added the following improvements
  - The signature option for the customer and the sales rep is no longer mandatory.
  - Added a location for each customer and a tolerance distance, so that when the customer is selected, the location is checked and the invoice is refused if it is outside the tolerance range.
  - When adding the Sales Invoice, the Sales Order name is shown in the app settings.
- Added the following improvements:
  - Improved so that the app shows the available Batches, and also, when a Batch is selected, the Production and Expiry dates are shown automatically, without the ability to edit them.
  - Improved so that the app complies with the Price Lists and Offers set up in Nama.
  - Added an option to disallow overdraft sales.

### Reports

- **Report and Form Wizards:** Added the Sorting grid and Select Query Part Prefix to the Data Source.
- **Report Wizard:** Added the ability to build a report with the new Report Wizard containing fields (From Date - From Time - To Date - To Time) from the Leave Voucher, Mission Voucher, and Departure Permit screens.
- **Report Wizard:** Added the field allowedValues to the Parameters lines, to process it and add it as a property inside the input.
- **Report Wizard:** Added the field doNotQuote to the WhereLines lines, to remove punctuation marks as needed by the user.
- **Report Wizard:** Added the same Default Value fields, plus (Works with Between), to work with "To" when Between is selected.
- **Report Wizard:** In the "Fields" lines of the "Report Wizard" screen, the NULL value (empty field) is now shown instead of showing zero values, for fields of type PatternType.Number.
- **In the Report Wizard:** Improved so that when saving the report, if there is one or more inputs in the Data Source not handled in the Data Source's filtering lines, an error message showing their names is displayed.
- **In the Report Wizard:** Added the ability to hide a line based on a certain condition, for example - or to hide a group header.
- **In the Report Wizard:** Added the ability to create an input that can show records based on whether a certain field has a value or not - for example, showing all Invoices - Taxable only - Exempt only.
- **In the Report Wizard:** Added the ability to hide zero balances.
- **In the Report Wizard:** In the Data Source: added a checkbox field (Make All Main Table Fields Available for Use), which is used to make all the fields in the Data Source's main table available for use inside the report, instead of adding them all to the Fields grid.
- **In the Report Wizard:** Added the following improvements:
  - Added an extra system column with the field type such as Reference, Text, Decimal, or Date, as an alert when using "Show Reference As" or Pattern.
  - Made the Expression and Union Handling columns display left-to-right.
  - Added two additional values to the Pattern Type column (Currency and Quantity), matching the defaults in Global Config.
- In the Report Wizard: Added the following improvements:
  - Added Having, like Static Where Condition.
  - Inputs: Added a default value for the filter type if none is selected, such as date (falls between two values) and ref (in).
  - Inputs: Hiding column headers - the hiding should preferably apply to every page except the first.
