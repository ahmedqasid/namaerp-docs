# Nama ERP Release Notes - January 2017

::: info Release Information
**Release Date:** January 2017  
**Release Number:** 201701
:::

## Additions

### Inventory
- Developed the **Update Seasons** document; seasons are now also shown like price lists in the Prices tab of the Item screen.
- **Processing Vouchers** screen - Indirect Costs page: added the fields `indirectCosts.Ref1` and `indirectCosts.Ref2` to the window details.
- Improved so that costs are displayed for the Issue, Receipt, and Transfer voucher when using the **FIFO** costing method.
- Item window: the **Manufacturing Period** and **Purchase Period** fields were duplicated.
- Improved the stocktaking process so that when doing a stocktake and receiving quantities from finishing the stocktake, the receipt cost is calculated the same way as a Sales Return under the **FIFO** costing method.
- Added support for running costs under the First-In-First-Out (**FIFO**) system.
- **Document Terms:** added the option **"Do not copy the header warehouse"**.
- Improved the stocktaking process so that a stock count can be done per location separately within the same warehouse.
- Added a **"Default"** column to the Colors and Sizes lines.
- Translated the field `itemBrand.ItemRevisionFile` to **Brand**.
- Added an accounting effect for additional cost lines.
- Added two grids for colors and sizes to the **Item Revision** window.
- Added an alternate code field to the Customers and Vendors screen (as already exists in the Item screen).
- Added an **"Item Settings"** field to the **Item Section** file, so it is copied automatically to the **Item** file when the section is selected.
- Made changes to a very important and critical part: quantity verification and preventing warehouse overdrafts and their relation to reservations. The system now also considers a reserved quantity to be present in the warehouse (even if it exists only as a reservation - an overdraft reservation).
- Added attachments to Issue Voucher lines.
- Improved so that in any document, when selecting the item and searching by Lot number, the storage location is shown next to the warehouse and the balance.

### Purchasing
- When the following steps are followed, the system costs the items incorrectly:
  - Create an uncosted Receipt voucher
  - Consolidate it into a Purchase Invoice
  - Delete the Purchase Invoice
  - Reconsolidate the same Receipt voucher with other Receipt vouchers into a Purchase Invoice that has the same code as the deleted invoice
- In the Purchase Order term config: added the option **"Allow purchasing revisions from a different vendor"**.
- An error sometimes occurs when saving a Purchase Order voucher.

### Sales
- When importing price lists or opening vouchers, a message is shown stating that the color does not exist. The message was changed to read (Color **** does not exist for item ***).
- **Price Lists:** added item grouping (from item to item, from branch to branch, from section to section... and so on by dimensions, and also by the item's own classifications).
- Allowed creating a return for a service item.
- Developed the ability to search the Sales Invoices screen by any customer data field (such as mobile number, region... etc.).
- Enabled the `Descriptor` feature in documents such as the Sales Order and Sales Invoices.

### Letters of Credit
- Letter of Credit window: changed the button title **"Cost"** to **"Recalculate Provisional Cost"**.
- The system allows saving an Expenses voucher against a specific Letter of Credit even when there is no Proforma Invoice for the same Letter of Credit.
- Added a link between the Receipt and the Letter of Credit that is not related to the "based on" field.

### Project Management
- Added an option to Projects allowing all employees to work on the project from within the Team page.

### Real Estate
- **Rent Contract and Opening Rent Contract:** added the fields **"Due to Collect"** and **"Collected via Receivable Papers"** to the details, as already exist in Sales Contracts and Opening Sales Contracts.
- **Opening Rent Contract:** added a button to create a Receipt Voucher for the selected instalment.
- Added a Remarks field to the multiple-instalments creation data.
- **Unit file:** added the values (Other 1, ..., Other 5) to the **"Unit Type"** list.
- **Rent Termination window:** added the property's data and location to the document.

### Accounting
- Added a feature to the Accounting settings called **"Use Current Employee as Collector Automatically"**, working in Receipt/Disbursement vouchers under General Accounts, the same way the **"Use Current Employee as Salesperson Automatically"** feature already works in Global Config.
- Added an attachment to the Exchange Rates screen.
- Added attachments to both the Journal Entry voucher and the Financial Paper.
- **Consolidated Disbursement Request:** renamed its lines from `details` to `Lines`.
- Added the option **"Allow leaving the bank account empty in cheque books"** to the Accounting settings.
- Improved the Consolidated Disbursement Request details so that it does not consolidate disbursement requests that already have a Disbursement Voucher.

### Manufacturing
- Introduced the following improvements to the **Operations** file:
  - When a standard operation is selected, its resources are copied into the Operations file
  - When the operation name is left empty, it is copied from the standard operation's name
  - Operations are now ordered by sequence within the Production Order and Operations
  - Operation numbers are now treated as numbers, not text - example: 10-20-30-40-50-60-70-80-90-100-110, not 10-110-20-30-40-50-60-70-80-90-100, when displaying quantities inside the Production Order
- Added the related documents (Receipt vouchers) to the Raw Material Return.
- **Resources Voucher:** improved so that when the Production Order is selected in the Resources Voucher, the resource lines already in the Production Order are pulled automatically into the document's lines.
- When the Resources Voucher is created automatically with the Execution Voucher, improved so that the system calculates the resource's actual working duration by subtracting the start time from the end time recorded in the Execution Voucher.
- Added the ability to exceed the Production Order quantity when executing the first operation of the Production Order's operations.
- Requested: add the ability to `recomit` Manufacturing documents linked to a Production Order that is closed or force-stopped. These documents are (Product Delivery, Product Return, Raw Material Issue Voucher, Raw Material Return Voucher, Damaged Receipt Voucher, Execution Voucher).

### Customer Relationship Management (CRM)
- Modified many Customer Relationship Management (CRM) files to add the ability to search for Real Estate products, not just items.
- Added attachments to the Questionnaire file.

### Human Resources
- Added the Job Offer number to the Employee screen after the offer is created, so once a Job Offer is created for an employee it can be accessed directly from the Employee screen, and employees who have no Job Offer can also be searched for.
- Created the entity flow `EATimeAttendanceFromDBImporter` to automatically import Time Attendance data from the attendance machine's database, so a Scheduled Task can be set up to enter the data automatically every day at 9 AM.
- **Manual Indicator Values window:** Employee grouping - added a grouping mechanism by workplace.
- **Performance Indicator Values screen:** added a grouping mechanism from one workplace to another.
- Added the employee's hire date to the details of the Employee Insurance Addition voucher.

### Point of Sale
- Added a permission for making a Return and a permission for making an Exchange.
- Added a permission for searching items.
- Distinguished the field for a percentage discount from the field for a value discount.
- Showed the invoice classification in POS and added a permission to allow changing the classification.

### Letters of Credit
- When making an inventory Receipt for a Letter of Credit, improved so that the Letter of Credit is not selected in the "based on" field but rather in the invoice or in a dedicated field for that purpose, so "based on" can be used for another purpose.

## Settings

- Updated Nama to work only with **Java 8**.
- Improved the system so that only `admin` is allowed to access `html.test`.
- Added the ability to round numbers in Alerts.
- Developed an option in Settings that shows the code of the printed screen template for a given type, to clarify things when more than one screen template exists for the same type. This is done via the option `logforms=true` in the `nama.properties` file.
- Added the option **"Prevent Saving a Draft"** to user permissions, because some drafts cause problems due to duplicate draft numbers.
- Added **"Restore Selected Records"** to **the More menu** in the **Recycle Bin**.
- Developed a tool to update the release automatically.
- Updated Nama with the latest version of the Jaspersoft report designer.
- Increased the Meeting Notes file's line fields to become (5 `ref`, 5 `text`, 5 `date`, 5 `number`, 5 `attachment`).
- Created the entity flow **`EAScaleMasterFileImage`** to automatically shrink images attached to master files to a size of 320x240 and no more than 100 KB, for faster program operation and improved performance.
- Added a view to the **"Aging Errors"** list next to `bizRequestView`.
- Added the ability to define alerts with a `SQL` statement, so specific employees can be added.
- **Work Task screen:** added the values (Other 1, Other 2, Other 3, Other 4, Other 5) to the Status list.
- Added the option **"Allow leaving the coding prefix empty in manual books"** to the Global Config window.
- Added translations for some fields in Alerts and elsewhere, such as `{status}`, as follows:
  - `{status.$arabic}`
  - `{status.$english}`
  - By the current login language: `{translate.$status}`
- Improved the error message to work like the Template and Alert, so it can show values inside the message.
- Improved the system so that when errors occur because of a problem in Alerts, an error message is shown explaining that the problem is caused by the alert with code *****, instead of leaving the error message empty.
- Added a fourth status called **"Escalate to Direct Manager"** among the Approval decision statuses (Approve - Reject - Return), so that selecting this status forwards the Approval Request to the direct manager set on the Employee screen.
- Improved so that the bank account number is not a required field in the **Payment Method** file.
- Added the ability to choose adding the tax to the cost at the line level in the Tax Policy, by checking the option **"Tax Effect on Cost Type"** found in Settings and selecting it from the Tax Policy.
- Added the ability to hide Default Templates from **the More menu**.

### Fields & Screens Settings
- Added the following properties to Field Appearance:
  - Field color
  - Writing direction (right-to-left or left-to-right)
- Enabled formulas in the **Default Values Templates** screen, so it works similarly to an entity flow.
- Added the ability to create a template that fills information into the window's grid. As an example, an invoice template that fills in some items in the grid.
- Added screen attachments to the **Work Task** screen.

### Reports
- Added a tool that enables using fields from the Settings screen in Reports.
