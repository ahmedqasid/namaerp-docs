# Nama ERP Release Notes - September 2024

::: info Release Information
- **Release Date**: September 2024
- **Release Number**: Nama-ERP-202409
:::

## Additions

### Inventory

- On the Required Item Update Data screen, improved so that when a value is set in date1, date2, .., date5 and n1, .., n5 and descriptions on the document header, they are copied to the item when the Transfer Data button is clicked.
- Added a new option named "Copy Installment Payment Based On The Voucher" to the Supply Chain document term config.
- In the Supply Chain voucher term config, added the option "Use discount offers when checking employee discount percentages" (used when you do not want to enforce adherence to price lists).

### Sales

- Added the option "Do not apply if there are offers with other-discounts-stopped in the (free items on items, discounts on invoice value) lines".
- Added the option "Copy cash payment method to the first line" in the Sales Order term config, as already exists in the Sales Invoice.
- Added a new document named the Loyalty Points Opening document (Bonus), in which the customer, the opening point count, the opening value of the points, and the points' expiry date are entered, taking this into account in the Scheduled Task that updates loyalty point validity, as well as in the loyalty point transaction and its aggregation by adding it to the total points.

### Purchasing

- Copied the fields serviceFees1,2,3,4 from the Purchase Order to the Purchase Invoice when working with "Based On" or "Copied From".
- Added the following two fields to the Preliminary Purchase Invoice screen and the Purchase Order screen:
  - "Port of Arrival" (reference)
  - "Port of Loading" (reference)

### Hospital Management System

- On the Cost List, added the fields (Subsidiary 1 Cost Percentage - Subsidiary 1 Cost Value - Subsidiary 2 Cost Percentage - Subsidiary 2 Cost Value), and also added them to the invoice lines.
- In the Invoices term config, added the fields (Subsidiary 1 Cost Debit - Subsidiary 1 Cost Credit - Subsidiary 2 Cost Debit - Subsidiary 2 Cost Credit).
- On the invoices header, added the fields (Subsidiary 1 - Subsidiary 2).

### Accounting

- Improved so that when creating a Payment Voucher based on a Payment Request, the line details such as text1, text2, number1 and number2 are copied.

### Contracting

- Added the option (copy the data of lines that have a remainder from the Condition Voucher, when the item code and condition code are empty, upon saving) in the Extract document term config, in order to calculate the values and the condition code upon saving.
- Improved both the Project Contract and the Subcontract so that when a stage group is selected at the level of a specific main item, it is applied to the sub-items belonging to the main item to which the stage group was applied.
- Added 3 fields (details.n) to the lines of the Equipment Statement document (EquipmentStatementDoc).

### Settings

- Added the following fields on the Custom List View screen:
  - Maximum number of records to show.
  - Prevent paging between pages (show all records).
- Added a scrollbar to the installer window for installing the system .. because most customer server screens are small in size .. which makes it difficult to reach the buttons at the bottom of the window.
- Added a regenerateGUIApplicableOnly button on the "Custom List View" screen.
- Added 15 description fields, in addition to the ones already present, on the Archived Document screen.
- Added logo fields 1:5 to both the Branch screen and the Sector screen.
- When importing files and documents, added the option "Add to the current lines", to add the lines to the lines of the currently existing file or document instead of replacing them.
- In the bundled app settings, reset the column widths in the "documents and files creation from apps" settings grid.

### Human Resources

- Added the field doNotDeleteRemovedSalaryDocs to the Payroll Record, so as not to delete salary vouchers whose lines were removed from the payroll record.
- Added the entity flow "EAUpdateEmployeeResidencyRenewDate", for the Residence Renewal Request and the Bulk Residence Renewal Request.
- On the Dues Settlement document, added the following:
  - Total Advances Paid field (in the header)
  - An All Remaining Advances button containing the option Copy Remaining To Paid
- In the Dues Settlement document term config, added the following:
  - Do not deduct the total advances from the remainder
  - The option "Group all unpaid advances upon saving"
- On the QualificationLine lines, added a field named (Specialization) after the Qualification field.
- Added 5 fields (attatchment1 : attatchement5) on the Bulk Residence Renewal Request screen.
- Filled in the lines for the Attendance Machine settings when the Default Query button is clicked, and also created a button named CreateTaskSchedule to create a Scheduled Task named ImportAttendanceFromCron.

### Real Estate

- In the Real Estate Revaluation Voucher term config, added the following fields:
  - Debit Management Profit Value
  - Credit Management Profit Value
  - Debit Reinvested Profits Value
  - Credit Reinvested Profits Value
  - Debit Distributed Profits Value
  - Credit Distributed Profits Value

### Mobile Applications

- Added the option "save server logs" in the app settings.
- Added a Server Logs History screen.
- Added a new file named "Document Data Display Method in the App", through which the columns shown in the app can be determined using tempo templates. It can also be used to adjust the list display as well as to search for records in other documents (as happens in Nama by editing the list and the search screen).
- **Captain Order app:** Added a print button, and printing can also be done via the "Send" button; when saving without printing, the "Save" button is used.
- **Captain Order app:** Added the option (DoNotAddPayButton) in the mobile Point of Sale interface settings.
- Improved the mobile app as follows:
  - On the Sales Document and Sales Order list screen, showed the invoice date under the code.
  - On the Customer screen, in Basics, showed the total number of customers belonging to the sales rep.
  - Showed (Customer Classification - Customer Address) next to the customer name.
- Enabled loyalty points in Point of Sale in the Captain Order app.

### Reports

- Added the following on the report builder tool screen (Crosstab page):
  - Added the Union Handling field to the formulas lines
  - Added the Open Union Handling Editor button
