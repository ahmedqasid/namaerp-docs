# Nama ERP Release Notes - May 2023

::: info Release Information
- **Release Date**: May 2023
- **Release Number**: Nama-ERP-202305
:::

## Additions

### Inventory

- In the supply chain documents term config, added the grid "Do Not Copy the Following Fields When Building From".
- Added the grid "Alternative Grouping Methods" to the Grouping Method.
- In the term config of sub-item documents such as (Sub-Item Purchase Invoice), which is responsible for creating a sub-item from the lines, added the following:
  - Added a new option called "Update the Sub-Item's Delivery Date".
  - Added a new system field in the Sub-Item file called "Delivery Date".
  - Added the actual date of the document that created the sub-item, when the new option "Update the Sub-Item's Delivery Date" is enabled.
- In the supply chain documents term config, added the following fields to the Sub-Item Documents Settings group
  - Update the Branch on the sub-item from the invoice
  - Update the Sector on the sub-item from the invoice
  - Update the Department on the sub-item from the invoice
  - Update the Analysis Group on the sub-item from the invoice
  - Update the Branch on the sub-item from the warehouse
  - Update the Sector on the sub-item from the warehouse
  - Update the Department on the sub-item from the warehouse
  - Update the Analysis Group on the sub-item from the warehouse

### Sales

- Added the option "Delete Built-From Lines If the Reserved Quantity Equals Zero".
- Improved so that when a Sales Invoice that creates a Stock Issue, automatically or manually, is made, the system copies Ref 1 to the Stock Issue document when using Build From.

### Fixed Assets

- **Batch Addition and Disposal Voucher:** Added the ability to create a journal entry for the document.
- **Batch Addition and Disposal Voucher:** Added fields in the header for the total of the amounts on the lines.
- **Fixed Asset window:** Added the "Contracting Cost Effect" section, which contains the following two fields:
  - Contracting Cost Debit.
  - Contracting Cost Credit.
- **Depreciation Document term config:** Added the option "Calculate the Contracting Cost Debit and Credit From the Fixed Asset, If Present".

### Contracting

- Added dimensions to the CNTRTermCostEntry table, copied from every document that affects this table.
- In all Contracting documents that have the "Update Codes" button, added a new button called "Update Only Empty Term Codes", so that only the empty codes are filled in according to the term code on the line.
- Added the option "Affect the Cost Tables Before Requesting Approvals" to the Contracting Purchase Order term config.
- In the Subcontract, added Ref 1:3 on the term lines, and they are copied to the Subcontractor Extract as a Post Action along with the term code, to the Subcontractor Extract's lines.

### Document Management (DMS)

- In both the "Task Execution" and "Project Invoice" windows, added the following fields to the line:
  - Currency
  - Rate
  - Local Amount

### Real Estate

- **Sales Contract screen - Terms & Expenses page:** Added +3 references and +3 descriptions in otherFeesLines.
- Updated so that the tax is based on the Installment value on entry and on save when the option useInstallmentValueToUpdateTaxes is enabled in the Collection Document term config; the Amount field is also now calculated from the sum of the Net values; and it was also improved so that when the document is saved with the option useInstallmentValueToUpdateTaxes not enabled, the tax is calculated on the details.value field, not details.netValue

### Freight Management

- Added the following windows:
  - Added the following windows:
  - Delivery Services Price List file
  - Delivery Services Items file
  - Delivery Request document
  - Delivery Invoice

### Human Resources

- Job Grade - Responsibilities grid: Added an option called "Do Not Copy the Responsibility to the Employee".
- In the Salary Document term config, added the following option:
  - Calculate the Contracting Cost Debit and Credit From the Salary Component, If Present
- In the Salary Component, added the following fields
  - Contracting Cost Debit
  - Contracting Cost Credit
- Modified the Employee Data Update document so that the document cannot be saved if the employee has a leave of any Leave Type in the leave lines on the update document, and the update document's actual date overlaps with the leave period; also, a Leave Voucher cannot be created that overlaps with any Data Update document containing the same Leave Type as in the Leave Voucher.
- When an End of Service document is created for an employee, the system does not include them in the payroll records because they have become terminated; this was improved so that the employee can be included and a salary issued for them if the End of Service document falls within the payroll period.

### Travel

- In the Tourist Program file, in the Services grid and the Flights grid, added a field called "Day Number", in which the day's order is written; when the Program is selected in the Trip document, the date is added in the Services grid and the Flights grid based on the day order within the selected period, between the Arrival Date and the Departure Date.

### Point of Sale

- Improved so that when the Tourist Service settings are selected and the option "Automatically Add the Tourist Service Item to the Invoice" is enabled, the Tourist Service is calculated and the invoice cannot be paid without the Tourist Service.
- Added the option "Hide on the Point of Sale Payment Screen". If this option is used while the point of sale is running, please close the point of sale and restart it.

### Customer Relationship Management (CRM)

- Added the Warranty Period Type field to the header of both the "Maintenance Order Execution" and "Maintenance Order" documents.
- Added the Current Status field to the header of the Maintenance Order Execution voucher.
- In the Maintenance Order document, the "Current Status" field is updated based on a change to the same "Current Status" field in the Maintenance Order Execution document.

### Settings

- Added attachments to the header of the DailyLaborBook table
- Added a new table to the dashboard elements called "Extra Tempo Columns", through which lines with a Tempo Expression and a name can be added, and these fields are then used in the table or any other element.
- Developed the ability to add links to the Dashboard and Alerts in a variable way.
- Added the entity flow "EAErrorIfQueryNotMatched", which runs a Query to extract a text error message (in addition to a query for the error message content).
- In the Screen Editing file - Alerts & Actions lines, added a new field called Security Id, so that a code can be chosen from a user selection and added to the Action Type field in the permissions and actions lines, and choosing whether editing is enabled or not according to the permission file.
- Added the following windows:
  - Shipment Delivery Voucher
  - Delivery Plan Voucher
  - Delivery Return
  - Delivery Zone
  - Zone-Driver Allocation Voucher
  - Shipment Delivery Settings

### Mobile Applications

- In the Batch App settings, added a new option called "Show the Shipment Number and Expiry Date on the App's Lines".
- In the Nama Mobile app, added the following:
  - A screen to create a Purchase Invoice based on a Purchase Order (when there are items on the Receipts table lines within the Purchase Order dated today)
  - A screen to create an Allocation Voucher based on the Purchase Invoice, if it has not been fully allocated.
- Updated so that the "Group Invoices by the Selected Time and Date" button on the Batch Movement document groups an Invoice Receipt document for the invoices in the Delivery Document field on the line, and completes the data specific to the Sales Invoice.
- Added the following windows:
  - Shipments Delivery Voucher
  - Delivery Requests Available to the Driver screen.

### Reports

- **Report Wizard:** Developed a way to show the Running Total instead of the field, by adding a new combo to the lines called "Show the Total in the Details Instead of the Value", containing "Total for Group 1 ... 5 - Total for the Whole Report", with the save rejected if an empty group is selected.
- In the Report Wizard: added the following:
  - parameter
  - Hide Details
  - Hide the Group's Header and Footer, from 1 to 5

  by adding a combo box to the inputs lines called "Input Type", containing (Normal - Hide Details - Hide Group 1 Header - Hide Group 1 Footer - Hide Group 1 ... 5 Header and Footer - Hide Report Header - Hide Column Headers - Hide Page Header - Hide Page Footer), with saving prevented when hiding Group 1, for example, is repeated on two lines - or hiding Group 1 header and hiding Group 1 header-and-footer are both selected)
- In the Report Wizard, added a new option called "Use Groups Through an Input". If enabled, it creates an input that is a combo box from which the user selects the group to work on, based on the group lines.
- **In the Report Wizard:** Added "Total for the Page" to the Combo Box "Show the Current Total in the Details Instead of the Value" in the fields grid.
- Added the following properties in the Report Wizard:
  - Added a Suggestion on the Custom Pattern fields to show some Patterns that can be used.
  - Changed the formatting of fields written in the groups' header.
  - Added the ability to add the line number in the groups' footer.
  - Added the ability to reuse a field from the fields grid in the groups.
  - Added the ability to create a fallback field for a field, working by adding COALESCE in the SQL
- **Report Wizard:** Added (Total for the Page) to the Combo Box (Show the Current Total in the Details Instead of the Value) in the fields grid.
- **Report Wizard:** Added a new table at the bottom to edit the Aliases.
