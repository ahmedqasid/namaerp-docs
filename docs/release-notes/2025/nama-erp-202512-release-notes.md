# Nama ERP Release Notes - December 2025

::: info Release Information
- **Release Date**: December 2025
- **Release Number**: Nama-ERP-202512
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the Driver field to the line in the Stock Issue document, copied from the document header if no data was entered in it; also, if a Stock Issue is created based on a Sales Order, the Driver is copied from the Order's details to the Stock Issue's details.
- In the Inventory Count Committee, added a page for grouping items, containing a grid named "Item Grouping" with the item's Brand - Item Section - Classification 1 through 10, along with the option "Expand Sizes and Colors When Grouping" in the header of the Item Grouping page.
- Added the ability to create the "Additional Receiving Costs" document together with the "Sub-Item Purchase Invoice" document.
- Added a new grid to the Supply Chain Settings named "Filtering on Warehouses and Locations".
- Added (backorder, cancelled) to the Status field in the statusToRunEntityFlows lines in the Ecommerce Shipping Site screen.

### Sales

- Created a new document named Vouchers Sales Order Return.
- Improved the Sales Invoice so that when using "based on" or the Group & Apply button, the system takes into account, when grouping the lines, the price from the source document - the Driver - Reference 1.

### Accounting

- Added the Tax Policy to the term config of the Prepaid Expense Contract, and took it into account in the term config.
- In the Financial Statement Settings screen, added the following:
  - Restricted the search to the Subsidiary, allowing a specific subsidiary to be selected.
  - Added an option on the line that, when using a Subsidiary account, expands all the subsidiaries within the account.

### Human Resources

- In the UpdateEmployeeInfo document, added the optional fields that exist in the Employee file, such as b1, b2, b3 and b4, to be copied from the UpdateEmployeeInfo document to the employee file, via an option added in the term config named "Copy Boolean Fields to Employee"
- Added the field "Extended Permission for More Than One Day" to each of
  - Leave Permission
  - Leave Permission Request
- Added the field "maxBalanceDay" in the Leave Type screen.
- In the Leave Balance Adjustment voucher, added the following:
  - 5 ref
  - 5 num
  - 5 text
  - a Remark field on the line

### Point of Sale

- Made the language of the Item Code field in the Point of Sale invoice and return always English, so even if the Windows language is changed to Arabic, the language switches to English when moving to the Item Code field.
- Added a shortcut named "Duplicate Line".
- Added each of (Do Not Print the Invoice, Print the Full Invoice) to the table: "Request Authorization from Another User When the Following Permissions Are Missing" in the Point of Sale Settings.
- Added an option in the (Leave Type) screen named moveReturnDateToFirstWorkday.
- Added a permission named "Prevent Editing the Credit Note Value in Payment", which you can use in the Permissions file lines.
- Added the option "Do Not Insert the Item at Zero Price" in the Point of Sale Settings.

### Real Estate

- Added the following improvements via the API:
  - Viewing the balance (Balance) of any customer, in both sectors and in total.
  - Viewing the item balance at the Engineer's Site.

### Contracting

- Made the Consultant screen (ContractingAdvisory) a Subsidiary, and added its own accounts.
- Added the following changes to the Standard Item window:
  - Added the Quantity field in the Standard Item window
  - Added the following two fields to the Cost Elements lines in the Standard Item:
    - Productivity
    - Qty Waste%
  - Added the Unit field in the Cost Item
  - Improved so that when selecting a cost item, the item and unit found in the cost item are inserted.
  - Improved so that when adding based on a Contract or a Quotation in the Analysis Card, the Contracting cost items added in the Standard Item are inserted, taking the added quantities into account.
- Improved the Analysis Card, so that a Contracting cost item is added to the lines (Raw Materials - Labor - Subcontractor - Other Expenses).
- Added a details grid (Grid) to the following screens:
  - ContractTemplate
  - ContractingOffer
  - ContractingEstimatedBudget
  - ContractingExecutiveBudget

  The grid is the same as the Analysis Card grid (Raw Materials - Labor - Subcontractor - Other).

- In the following Contracting screens:
  - ContractTemplate
  - ContractingOffer
  - ContractingEstimatedBudget
  - ContractingExecutiveBudget

  the cost items are grouped as a total along with their own item total, via a button; on save, the calculation is redone.

- Added the Contracting Unit to the Standard Item, in the header - and in the Cost Elements grid, on the lines.
- In the Contracting Contract Templates, added the following buttons:
  - Create Material Issue Order for the Selected Items
  - Create Quotation for the Selected Items
  - Create Contracting Purchase Order for the Selected Items

### Settings

- Added the ability to call the employee's leave balance NamaRep. getVacationAssignedConsumedRemainder in tepmo templates - particularly in the Schedule dashboard.
- Prevented Scheduled Tasks from running more than once simultaneously by default; to allow it, added an option named Allow Simultaneous Runs.
- Added the following mandatory checkbox fields in the Approval Definition window:
  - The Reason Must Be Entered with Approval
  - The Reason Must Be Entered with Rejection
  - The Reason Must Be Entered with Return
  - The Reason Must Be Entered with Escalation to the Direct Manager
  - The Reason Must Be Entered with Return to the Previous Step
- Added the entity flow EASQLToCSVAttachmentField, adding the ability to export some data as a TXT file. For example, the employee salaries file for upload to the bank's website, with the ability to implement this via an SQL query.
- Improved the way Document and File Export works so that it works like the Report Run list.
- Added (criteria expression (filter) on the line in Params.
- In the Limit User To Year file, added a Fiscal Period field to the line, and filling in both fields together (the Fiscal Year and the Fiscal Period on the line) will be prevented.
- Improved so that there is a separate additional user counter specific to mobile applications, independent of the Nama users counter, matching the number of Nama users granted by the license for each customer.

### Manufacturing

- Added a document named ManufacturingStockTaking, containing the button (Aggregate Production Orders and Their Materials) and the button (Aggregate Production Orders for Materials), for taking stock of the materials added in the Stock Taking details.

### Mobile Applications

- In the Leave Request document in the app, took the Substitute Employee field into account so it appears in the app when editing the app screen for the Leave Request.
- In the Combined App Settings, added the option "Maximum Number of Detail Lines on Mobile".
- Added the following screens to the app:
  - DetailedRemark
  - MeetingRemark
  - ResidenceRenewReq
- In the Mobile Applications Settings, in the Stock Taking Settings, added a new option named "Prevent Changing the Item Unit in Stock Taking When Using the Barcode".
- Took the Substitute Employee into account when editing the app screen for the Vacation Document screen.

### New GUI

- Added Create List Screen Modifier for the embedded list display on screens, so the shape of the embedded list can be easily modified.
- In the Sales Invoice screen for example, improved so that clicking Previous Version from the More menu and selecting version number 3 writes the version number next to the word "Draft" when displaying the version
  Example: Sales Invoice No. 123, Draft, Version No. 3
- Added totals row + column totals in the pivot mode of the new GUI.
- Added a field that allows deleting the Quick Filter present in the list screen.
- Added two new fields to control filtering of values and dates, as follows:
  - The Criteria Used to Search for Quick Filter Values
  - The Text Criteria for Quick Filter Values.
- In the Layout Settings screen - made it a Popup instead of being a separate link.
- Changed the location of notifications (Toasts, Errors, Tooltips), because they were appearing in places that covered toolbar buttons or important text, which hindered the user experience.
