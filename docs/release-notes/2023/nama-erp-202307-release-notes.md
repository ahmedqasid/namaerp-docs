# Nama ERP Release Notes - July 2023

::: info Release Information
- **Release Date**: July 2023
- **Release Number**: Nama-ERP-202307
- **File Type**: Monthly Release Notes
:::

## Additions

### Purchasing

- **Vendor file:** Added a grid named (Additional Information) containing 5 fields of the following types (reference, number, and description).

### Sales

- In Sales Quotations (free items based on invoice value), improved so that if the free item is a free group, and any item not included in the free group is selected, the invoice accepts this and does not block it.

### Accounting

- Updated so that the details are brought down into the Payment Voucher based on (the Aggregated Vacation Allowance Payment Voucher).
- In the Letter of Guarantee screen - Movements page: Added the Target Type to the movement columns.
- In Global Config, Debt Aging Follow-up settings, added the option "Track Debt Aging at the Record Level," as is already available for the Legal Entity, Branch, and Sector.

### Document Management (DMS)

- In the Archived Document (DMSDocument), added 10 n + 5 ref + 10 text fields.

### Customer Relationship Management (CRM)

- Added Dimensions to the lines in both the Maintenance Service Contract and the Maintenance Contract, and the Dimensions carry over from the Contract to the Plan, then to the Maintenance Order, then to the Execution.
- Added the following documents:
  - Maintenance Quotation
  - Maintenance Service Quotation
  - Maintenance Sales Order
  - Maintenance Service Sales Order
- Improved so that a Maintenance Contract can be used based on a Maintenance Order, with all the data in the Order carried over.

### Service Center

- In the Estimation, added "Discount 1, Discount 2" to the tasks and spare parts lines.
- Created 2 entity flows that recalculate the prices of spare parts and tasks, as follows:
  - EARecalculateSrvcOperationsAndMaterialsPrices
  - EARecalculateSrvcOperationsAndMaterialsPricesFromQuery
- In the Service file, added the field "Repeats Every / How Many" to the service price lines for all models.

### Real Estate

- Added the ability to make a reservation for an Aggregated Unit.

### Human Resources

- In the Dues Liquidation voucher, added the button "Consolidate Unpaid Salary Vouchers."
- In the Dues Liquidation voucher term config, added the button "All Unpaid Salary Vouchers for the Employee, Saving Only the First Time."
- In the Dues Liquidation voucher term config, added the following option: "Consolidate Unpaid Salary Vouchers for the Employee, Saving Only the First Time."

### Contracting

- In the Term Analysis Card lines, added the field "Property."
- In Contracting Configuration, added the option "Calculate the Actual Cost of Properties from the Term Analysis Card."
- Added tax fields to the header of the Contracting Offer screen and the Assay screen, so that taxes can be applied on the total of the sub-items.
- In Contracting Configuration, added the following fields:
  - Copy Last Project to the Employee File, in a field.
  - Copy Last Project to the Asset File, in a field.
  - Copy Last Project to the Vehicle File, in a field.

### Point of Sale

- Added the option "Do Not Add the Value to Any Payment Method," which sets all the payment methods in the payment dialog to zero and forces the user to enter the value in one of the payment methods.
- Added the option "Use the Item's Sizes and Colors Attachment for Images in POS" to the supply chain settings.
- Added the field (Search in Table) to the fields that can be added from the (New POS Interface Settings) file; once shown on the POS screen, it can be used to filter on the mentioned fields.
- Developed a shortcut for deleting pending invoices when searching for them.
- In the POS Shifts window, the following was done:
  - Added 3 attachments.
  - Added the total of the payment methods (for the Actual Balance, the Book Balance, and the Difference).
- Improved so that when a customer is added, it is copied to the invoice.
- In the POS Open/Close Shift document, improved so that Description and Description 2 are added to the lines of the POS Shifts screen.
- Added a file named POS Shortcuts.
- Added a reference named Shortcuts in the Machine, as well as in the POS Settings.
- In the Captain Order app, added discount fields to display in the app, where "Discount" can be selected in the "Document Header Fields" lines of the "Mobile Interface Settings" document in Nama.
- Updated the POS Numpad so that it is hidden by default; when the user clicks on it, it becomes visible; and the next time POS is opened, the "Numpad" state is whatever it was last (whether visible or hidden).
- Added a reference specific to the Shift for POS Sales Invoices, so that the Shift number can be identified from the invoice.
- Improved the customer search in the Sales Invoice so that the customer's phone number can be searched by. The same applies when searching for the customer in Return and Exchange invoices.

### Fixed Assets

- Removed the "Assets Resulting from Disposal" table and made its use and display subject to an option in the Assets settings.

### Travel

- In the Trip document, added a button named "Create Purchase Orders" in the More menu.
- In the Accommodation grid, added a new field named "Hotel Purchase Order."
- In the Services grid, added the following fields:
  - "Tourism Service Purchase Order."
  - "Restaurant Purchase Order."
  - "Tour Guide Purchase Order."
- In the Flights grid, added a new field named "Flight Purchase Order."
- Added a term config for the Tourist Trip document, containing the following fields:
  - Hotel Purchase Order Book
  - Hotel Purchase Order Term Config
  - Flight Purchase Order Book
  - Flight Purchase Order Term Config
  - Tourism Service Purchase Order Book
  - Tourism Service Purchase Order Term Config
  - Tour Guide Purchase Order Book
  - Tour Guide Purchase Order Term Config
  - Restaurant Purchase Order Book
  - Restaurant Purchase Order Term Config
  - Hotel Service
  - Flight Service

  The system creates the mentioned purchase orders when the "Create Purchase Orders" action is used from the More menu.

### Settings

- Added a system-level "Clear On Duplicate" for the altCode field at the file level.
- When searching in the Search bar, the extraFilters in the Permission file are now taken into account.
- Improved so that when opening a Data Model link, the result is displayed in pages, with the ability to set the number of records per page or show all, because of slow display on some devices due to the large number of tables.

### Mobile Applications

- Removed the Quantity column from appearing in the screen lines and showed the Location value in the lines instead - since the column was showing but not displaying the location.
- The field (Leave Value Less Than a Day) found in the Leave voucher was added to the Nama Aggregated app, to allow taking half a day's leave or less.
- Prevented saving the Electronic Attendance voucher from the mobile app if there is a voucher still open.
- Added an option in the Aggregated App settings named "Select Sales Return Lines in the App."
- Orders were sorted by GPS.
- Added the ability to open the customer's location on Google Maps from the app.
- In the Available Orders window, improved the filter to work with input, so that the search happens with each new character typed into the filter field.

### Reports

- In the Report and Form Wizards, added 5 new pages (Data Source 1 to 5), each page containing the following:
  - A new field named Data Source.
  - The linking lines grid (field from the source - operator - field from the report - report input).
  - The filtering lines grid (field from the source - input from the source - operator - field from the report - report input).
- Created a new file named (Data Source), similar to the Report Wizard file but without the jasper-specific properties.
- In the Report Wizard, editing the query and adding "select top" is now allowed.
- In the Report Wizard, added the following:
  - Added the following two options:
  - useDataSourceAsSubQuery
  - useTempTablesInsteadOfCTE
- In the Printing Form Wizard, added the following:
  - Created the User Aliases grid.
  - Added the field "static Query" to allow the user to enter the query.
- In the Report Wizard, added control over the pattern in the (Group Footer Custom Expression Line).
- In the Report Wizard, fixed the display of inputs inside the report to work like fields in (Show Reference As).
