# Nama ERP Release Notes - June 2023

::: info Release Information
- **Release Date**: June 2023
- **Release Number**: Nama-ERP-202306
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the option "Do Not Consider the Reserved Quantity When Confirming Quantities" in the supply chain documents term config.

### Sales

- Added the option "Save or Update the Created Document With Save-With-Entry in the Background" in the Sales Order term config.
- Added the action "Restore Lines That Had an Error Due to Automatic Creation" to the More menu on the Sales Order.
- In the Sales Price Lists lines, added the field "itemCode".
- Added the ability to know which of the offers affected the invoice, so that a sales report can be made based on offers and discounts to list the items that were sold under the offer.
- In the Tax Authority settings, added the button "Activate Selected Lines".

### Fixed Assets

- On the Batch Addition and Disposal Voucher lines, added the following fields:
  - Adjust the Asset's Remaining Life.
  - The Default Life Added or Disposed.

### Fixed Assets

- Improved the performance of the Asset Depreciation document so that it takes less time when saving the document and when deleting it.

### Accounting

- Added the option "Use To Period in the Financial Budget" in Global Config.
- Improved so that when an Accounts Disbursement Request document is added based on a Disbursement Order, the system copies the data from the order to the request.

### Real Estate

- In the Real Estate Investment Reservation Voucher term config, added the following fields:
  - Reservation Payment Debit
  - Reservation Payment Credit

### Manufacturing

- Added the field "Operation Number" to the header of each of the following documents:
  - Raw Material Issue
  - Raw Material Return
  - Raw Material Issue Request
  - Raw Material Return Request

### Human Resources

- In the Leave Type, added the option "Allow Leave During the Work Months Before Leave Entitlement".
- In the Payroll settings, added the option "Allow Saving the End of Service Document When Exceeding the Leave Balance", taking into account that the option (allowOverBalance) in the Leave Type must be disabled.
- Added the field "Return to Work Voucher" to the lines of each of
  - Return to Work Voucher
  - Batch Leave
- In the Return to Work Voucher window, added the field "Batch Return to Work Voucher".
- On the lines of the Return to Work Voucher Batch Leave, added the field "Return to Work Voucher".
- And on the Return to Work Voucher screen, added the field "Batch Return to Work Voucher".
- Added the Number of Work Days column to the Payroll Record screen.

### Travel

- Added 5 fields (ref-n-text) to the Flights grid via a screen edit; the fields can be added on the Tourist Program document and the Tourist Trip document.
- In the Hotel window, added the following fields:
  - Bank Account Number 1
  - Bank Account Number 2
  - Bank Account Number 3
  - Bank Account Number 4
  - Bank Account Number 5

  A Currency field was also added with each account number, and they are shown on the screen as composite fields.

### Point of Sale

- Added a field called "From Captain Order" to the Point of Sale Sales Invoice.
- In the Captain Order app, added the Issue Type field. This field has the options (Normal - Raw Material Issue - Main) on the line, the same as in Point of Sale, taking into account that the default is "Normal", as in Point of Sale.
- Added a new screen in the "New Point of Sale Interface Settings" document called "Favorite Actions", so that the actions to be shown in the point of sale can be selected, and these actions then appear in the point of sale's shortcuts menu.
- In the Tax Authority settings, added a grid called "PosTerminals".
- In the New Point of Sale Interface settings, added the field (sizesAndColors.code), which exists in the Sizes and Colors table in the Item file, under: (Sales Table Fields) and (Search Dialogue Columns) fields.
- Added the ability to show the item's image when selecting from Favorites in the (Point of Sale interface).
- When the Colors and Sizes Matrix code is selected instead of using the item code, improved so that the color and size selection screen is not shown.
- When the color and size field is made mandatory, improved so that the confirmation happens on save, not on going back or closing.

### Customer Relationship Management (CRM)

- Added 12 options in addition to 12 remarks to the Maintenance Service Order Execution voucher, on the lines.

### Settings

- Merged the lines of the Electronic Inventory Committee document.
- In the All Records screen, in the More menu, added the ability to Recommit the selected records.
- In the Performance Improvement Settings window, added the field "User".
- Added the option "Works Only With Save From the Mobile App".

### Mobile Applications

- Added the Delivery Vouchers to Be Delivered screen to the Sales menu in the app. It contains the delivery vouchers that need to be delivered, and filtering can be done through the Nama Batch App settings.
- In the Batch App settings, added a list view called "Mobile App Error Log".
- Added the Mission Voucher to the Nama Batch App.
- Improved the Nama Mobile program as follows
  - When logging into the program, the user's name is shown next to the user code.
  - Hid the links in the menu when they are not used.
  - Released a new version of the program on iOS.
- In the Apps settings in the Nama system, added the following four fields:
  - Do Not Allow Item Duplication. When enabled, the item code is not duplicated.
  - Do Not Allow Showing the Quantity. When enabled, the Quantity field is not shown.
  - Item Code Mask, where a Regular Expression can be written; various sites can be used to learn how to write the mask. For example, through the following site: https://regex101.com/
  - Item Code Error Message. This field is dedicated to writing an error message so that when a code not matching the item code mask is entered, the error message appears in the apps.

  The settings are read on login, when Login is performed, and through performing an Update from the app.

- Improved the Batch Movement document so that when the invoice is selected, the system automatically inserts the Zone on the lines and posts it to the Movement document, in addition to also showing the Sales Invoice on the Movement document.
- Improved the Nama Batch App so that the Invoice Number and Customer Name are shown instead of the Invoice Receipt document code.
- Improved so that the Movement screen in the app is automatically refreshed after a check in and check out.
- Improved so that when the screen is pulled up, the system refreshes instead of the user exiting and re-entering the app.
- Improved the Batch Movement document so that the time range is from 00:00 to 23:59, and the From Date and To Date default to today's date.
- In the Batch Movement Voucher term config, added the field "Term Config of the Invoices to Be Grouped".

### Reports

- In the Employee Leaves Report - Allocated, Consumed and Remaining, with code (SYSR-HRS016), fixed the Allocated Days so that they show as 0 in the report.
- In the Report Wizard, the Arabic and English names are now copied from the Report Wizard to the generated report, and the file name is also set to match the report's English name, to make it easier to track the files exported from the report.
