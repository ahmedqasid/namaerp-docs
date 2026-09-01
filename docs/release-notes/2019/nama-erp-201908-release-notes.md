# Nama ERP Release Notes - August 2019

::: info Release Information
**Release Date:** August 2019  
**Release Number:** 2019.08
:::

## Additions

### Inventory
- Added the delivery settings file to the term config for the Delivery Cancellation voucher, making the term config similar to the Distribution Management term configs.
- **Delivery Settings File:** Added two quantity-type fields at the line level.
- **Item File - Versions & Sizes page:** Added a field for the unit file at the line level in the colors and sizes grid.
- **Additional Receiving Costs window:** Added three text fields (`Text field`) and two date fields to the document details.
- **Inventory Committee document:** Improved the Inventory Committee document so that, when using the "Group Items" button, the system sorts items by item code, then warehouse code, then location code.

### Sales
- Added 5 `ref` fields to the lines for the `Packinglist` in the Sales Order.
- Added the field `Do not apply free item offers based on the invoice's item count on save` to the Sales term config; by default the system applies offers on save. Enable it if you work by a procedure, so that free items are not recalculated again on save, which would otherwise change the sales lines undesirably.
- Added the field `Group value by` to the item discounts table, so the discount is applied on the total value of the items belonging to a specific department rather than on the invoice total.
- Added the option `Group similar stock voucher lines` to the invoices term config (Sales, Sales Return).
- Added payment methods to the Sales Order, as in Sales Invoices.
- In the invoice-value discounts section, there is a single field for the invoice value (the minimum invoice value). Added another field for the maximum invoice value, so the bracket is capped and given its percentage without cumulative aggregation.
- Added a new group on the voucher header named Customer Grouping to the Salesman Update voucher, containing the following:
  - From customer to customer
  - From salesman to salesman
  - From customer's responsible person to customer's responsible person
  - From branch to branch
  - From sector to sector
  - From department to department
  - From analysis group to analysis group
  - Added a button named (Group Customers) that groups the customers when clicked, provided at least one of the fields above is entered

### Purchasing
- Added the option `Group similar stock voucher lines` to the invoices term config (Purchases, Purchase Return).

### Accounting
- Added the option `Allow changing the subsidiary and account on the lines in Receipt and Payment vouchers` to the accounting settings.
- Added the field `Apply when matching the query` to the distributions table and its criteria.
- Moved both (account bags and cashier bags) from the basic files to the accounting files.
- Prevented changing any account within a subsidiary after a transaction has been made on that subsidiary and the same account.
- To allow changing accounts after a transaction has been made on them, added a field to the accounting settings named `Allow editing subsidiary accounts within subsidiaries after they have been used in transactions`.

### Banks
- **Bank Reconciliation Statement:** Added the total debit, total credit, and the difference for each `Grid`.
- **Bank Reconciliation Statement:** Sorted the system transactions by date, and the pending transactions will also be sorted, since they are derived from the system transactions.

### Real Estate
- Added the field `Price from Price Lists` to the Unit screen. It can be used in entity flows and `PostActions Gui`. This field is not available to the user; the system updates it when a price is set for this unit in the price lists.
- **Unit File - Details page:** Added the unit's price lists as one of the links in the unit's details (`List view`).

### Contracting
- **Daily Labour Book:** Added another grid to the document containing the fields (Standard Term Code, Standard Term, Standard Term Description, Explanation, Value or Cost).
- Improved the Daily Labour Book so that it distributes the selected cost in the new grid across the standard terms; consequently, when creating a Contracting Cost Execution document, the cost loaded on the term in the Daily Labour Book is taken into account.
- Created the two documents (Project Contract Fine, Contractor Contract Fine).
- Added the fields (Total Fines, Total Materials Deduction, Fines, Materials Deduction) to both the Project Extract and the Subcontractor Extract.
- Added a new document named `Contractor Material Issue`; through this document, the effect is applied on the Subcontractor Extract, and the value of the materials is deducted from the extract.
- In both the Subcontractor Extract and the Project Extract, added the fields (Additions from Conditions, Deductions from Conditions, Total after Deductions, Fines and Additions) to the details.
- Changed the name `Direct Cost` in the Contracting module, including the direct cost fields on the documents, to be `Contracting Direct Cost`.
- **Subcontractor Extract:** Calculated the materials deduction at the line level, through Contractor Material Issue documents.

### Human Resources
- Added the fields (`text1`, `machineCode`, `ref1` through `part1Details`, `part2Details`, `part3Details`) to the Attendance voucher details; they can be shown by editing the screen.
- Added attachments inside the (Regulation Materials) screen in the (Labour Regulation) list.
- **Dues Liquidation document:** Improved the query in the subsidiary amount fields (`subsidiaryAmount.money`) so it does not take into account the transaction value resulting from the current Dues Liquidation document, on re-issue or `ReCommit`; the query was changed to the following:
  ```
  select SUM(debitValueAmount-creditValueAmount) from LedgerTransLine where account_id =? and subsidiaryId=? and originId <> ?
  ```
- Added 4 new fields to the single-component calculation formula at the line level in the brackets grid, as follows:
  - Annual repetition count (two fields: from, to)
  - Annual range (two fields: from, to)
  - Added a new field to the performance indicator (Consider component values as annual)
- In the vacation balance messages, added the employee's name to the message, so it is understandable in an Aggregated Vacation file for more than one employee.
- Added 4 new fields to the single-component calculation formula at the line level in the brackets grid, as follows:
  - Annual repetition count, two fields from, to
  - Annual range, two fields from, to
- Added a new field to the performance indicator (Consider component values as annual)
- **Performance Indicator Values document:** Added the following dimensions to the document header:
  - Grouping by group (from group, to group)
  - Grouping by department (from department, to department)
- **Salary Sheet:** Added grouping by department (from department, to department)
- Added an accounting term config for the ticket value, among the effects already existing in the Dues Liquidation voucher and the Aggregated Liquidation.
- **Advance Type:** Added a dedicated page for the advance conditions containing 2 grids. The first grid sets the conditions specific to the advance, such as the maximum number of months to repay the advance and the maximum advance amount, and the second grid sets the salary components from which the advance will be repaid when the "maximum advance type" is set to be a percentage of a specific salary component.

### Customer Relationship Management (CRM)
- Prevented editing the status of development requests once they have been shipped in a release, allowing only the creation of a development request based on them.

### Service Center
- Changed all titles named (Raw Materials, Raw Material, Auxiliary Materials) to be Spare Parts.

### Fixed Assets
- Improved the Fixed Asset Purchase voucher so that the system multiplies the unit price by the quantity in the total price field on the line, if the asset has a quantity only.
- **Asset Purchase Invoice:** When adding the asset type in the document details, improved so the system inserts the "Asset Useful Life" and "Salvage Value" on the invoice line as soon as the asset type is selected.
- Set the Asset Commissioning Approval document to not save if the assigned asset has already been purchased and is currently being depreciated.
- Added the fields (From Branch - To Branch.. From Type - To Type......) to the Asset Count voucher, and also added dimensions to the lines.

### System Reports
- Report `Consolidated Fixed Assets Trial Balance`: Added an option to show the total only, and also added a parameter for type and group.
- Report `General Assets`: Added an option to show the total only (for the group that already exists).

### Settings
- Added fields to the details (number, description, and reference) in the responsibility table found on the employee screen, for use in preparation.
- **Periodic Documents file:** Displayed documents created as a draft on the (Created Documents) page.
- Added the option `Go to the screen where the record was created, when opening it` to the Global Config.
- **Screen Editing:** Added computed columns to editing a selection list.
- In the `ReplicationSite` in the `ListView`, added `Automatically update the version in the branch` to the More menu, so the version can be updated across the whole branch.
- **Periodic Documents:** Added the button `Repeat documents according to line periods`.
- Added a new table to the licenses called `Reports Excluded`, in which the user can add a group of reports or a specific report.
- **Accounting Side window:** Rearranged and renamed the fields to make them clearer; also prevented saving if the user selects a reference type field, for example, from the line and leaves the field empty - likewise prevented saving if a bag type field is selected from the voucher header and the bag code / field is left empty. This validation was applied to all accounting effects in all term configs.
- When there is an error in a composite field, the error indicator is not shown next to it (such as leaving the account empty in the accounting term config, despite a dimension being selected in the source).

### Customer Relationship Management (CRM)
- **Customer Service Task:** Added the following fields to the detailed tasks table:
  - `date1, date2, date3, date4, date5`
  - `n1, n2, n3, n4, n5`
  - `description1, description2, description3, description4, description5`

### Mobile Applications
- Developed a new mobile application, through which the following can be carried out:
  - Electronic task
  - Leave request
  - Permission request
  - Attendance and departure
- Added notifications and approvals to the `ESS NAMA` mobile app.
- Added the ability to show employee-specific notifications inside the `ESS` app.

## Fixes

### Inventory
- An error appears when saving a Reservation voucher that contains a delivery settings file.
- There is an error in the field `Less than or equal to` in the Distribution Settings file.
- The system does not allow saving the Loading voucher.
- An error appears when running an entity flow via a button on the Stock Issue voucher, to cancel the reservation for the sales order linked to the stock issue voucher.
- **Stock Transfer Request:** When mandatory stock location is enabled and no default stock location is set on the location, then a Stock Transfer Request is created and the warehouse is selected, then the stock location on the lines - the stock location gets cleared on save, and so saving is not allowed.
- **Issue Vouchers:** When selecting financial paper coding from within the document and entering the bank account, then trying to select the cheque book, the system shows all the books for the branch and does not take into account showing only the books belonging to that bank account.
- An error sometimes occurs when deleting a Grouping voucher.
- Sometimes, when reprocessing a system Stock Receiving voucher, the document status changes to Fixed, but on updating the document the status reverts to Failed.
- After adding units to the sizes and colors file, if the item's sales unit is `set` (a `set` unit has a matrix) and a barcode with a size, color, and unit `pc` is selected, then the unit on the Sales Invoice is `pc` but it still has a matrix; the correct behavior is for the system to remove the matrix if the unit does not have one.
- An error occurs when processing an item request that performs a reservation, due to a change of units on the item.

### Sales
- **Sales Offers:** The system does not take dimensions into account in sales offers.
- The system does not call up associated items (item relations) when the primary item is entered.
- If the option `If a document has only one term config, use it directly when creating a new one` is checked in the Global Config, the system does not correctly call up the tax settings in the term config when there is only one term config.
- **Invoice Offers:** In the part related to discounts on the invoice value, the permission field does not work correctly - when it is used, it does not work and prevents the discount.

### Accounting
- When creating a Cash Payment voucher and selecting an Additional Receiving Costs voucher in the invoices, the error `Could not perform the action` appears.
- When creating a Payment Request based on a Salary Sheet, the lines are not filled, and so the system does not work correctly when creating a Payment voucher based on a previously issued Payment Request that was based on a Salary Sheet.
- **Receipt and Payment vouchers:** When editing is allowed in the document details, the system allows entering values in both debit and credit on the same line and saving, but processing fails.
- When using the `Create Payment Voucher` button from screen editing for a `Payment Request` document, the date is inserted incorrectly.
- When searching the lines for a specific account and entering part of the account name, the system does not display any results.
- **Payment Voucher:** When entering the cheque number in the financial paper details grid, the system does not copy the relevant party; and when entering more than one paper and saving, the system copies the relevant party of the first line to all the lines.

### Settings
- When creating an alert for a list of types and a type in the list is duplicated, the alert is sent twice.
- When the option `Allow text wrapping in tables` is selected, if there is, for example, an item name or an account name, the text wraps in the grid and its master file cannot be opened from the document screen by clicking the (blue) arrow icon for creating or viewing.
- **Alerts - Targets:** If an employee is duplicated, the alert is sent more than once, according to the number of times the employee is duplicated.

### Contracting
- **Cost Execution document:** The system pulls execution quantities from other, earlier contracting contracts.
- The system allows deleting Subcontractor Extracts, Contractor Material Issue vouchers, and Supplies Purchase Invoices while a Cost Execution document has already been created based on them.
- In the Cost Execution document details, the fields `Used Quantity` and `Remaining Quantity` do not work correctly - sometimes the used quantity is not affected by the extract's quantity.
- The system does not pull the actual cost specific to subcontractors, by the analysis term codes specific to subcontractors on the Term Analysis Card - the actual cost remains equal to zero even though Subcontractor Extracts have been issued on the same project contract for that Term Analysis Card.

### Fixed Assets
- An error appears (specific to one customer's cycle) when performing a stock receiving based on a Fixed Asset Purchase voucher.

### Human Resources
- Sometimes, when importing attendance and departure for a shift that runs from 8 PM to 8 AM, yesterday's clock-out is imported as today's clock-in.
- When importing attendance and departure on a document that has prior lines via the procedure `EATimeAttendanceFromDBImporter`, ref1, ref2, and text1 are left unchanged.
- Added the field `experienceDaysNumber` to the employee file; it can be shown by editing the screen.
- When clicking the button to create installments on the Advances screen, the first installment is created one month before the repayment start date; the correct behavior is for the first installment to start from the beginning of the repayment date.
- When there is an electronic attendance record with a clock-in only, the day is counted as absent.
- **HR Settings:** The field `Non-working days treatment for the last salary voucher` is duplicated twice.
- **HR Settings:** The field `Basis of non-working days for the last salary voucher` does not exist.
- Sometimes, an absent day is calculated in the Salary voucher statistics for the same day, despite there being a clock-in and clock-out record.

### Real Estate
- Sometimes, when trying to save a Sales Contract based on a Reservation document, the error `Could not perform the action` appears, with the log attached.
- An error `Could not perform the action` appears when issuing a Sales Contract for a grouped unit.
- The Unit Price field on the Reservation document is duplicated twice with incorrect titles: the first is for the currency, and the second should be titled `Property Price`.
- When issuing a Sales Contract document based on a Reservation document, the system does not pull the installment-creation data from the Reservation document, but instead just copies the installments into the table, and so shows the message `Total installments does not equal the remaining amount`.

### Service Center
- If a task is added to a Work Order through an Add Task voucher, and the Work Order is not subsequently edited before being closed directly, the system does not display this task in the Latest Tasks list.

### New GUI
- `Reference Images Not Handled (Upload Image in edit view, Image On Hover on Link, separate column, and so on)`

### System Reports
- The report General Account Statement in local and foreign currency, code: `002ACC-SYSR`, shows an error when displayed.
- An error message appears in each of the following reports when using a specific company instead of the general option:
  - Annual Sales Quantities Comparison by Month `021SLS-SYSR`
  - Annual Sales Quantities Comparison by Month - Percentage `022SLS-SYSR`
  - Annual Sales Values Comparison by Month `023SLS-SYSR`
  - Annual Sales Values Comparison by Month - Percentage `024SLS-SYSR`
  - Annual Sales Quantities Comparison by Month - by Branch / Item Department `025SLS-SYSR`
  - Annual Sales Quantities Comparison by Month - by Branch / Item Department - Percentage `SYSR-SLS026`
  - Annual Sales Values Comparison by Month - by Branch / Item Department `027SLS-SYSR`
  - Annual Sales Values Comparison by Month - by Branch / Item Department - Percentage `028SLS-SYSR`
- The report `005INV-SYSR` has abnormal results, especially with an item in more than one warehouse, due to the presence or absence of the `evaluation Time variable`.
- The report `Consolidated Fixed Assets Trial Balance` does not display the opening value correctly.
- The report `General Assets` does not display the opening value correctly.

### General Fixes
- An error sometimes occurs when deleting a revised voucher.
- The `DeleteFromFile` tool does not delete documents that have been revised.
- When searching for items in reports, the system may refuse the search or show fewer search results; also, when searching for the last items using the magnifier, no results appear.
- The report Item Quantities by Warehouse, code: `009INV-SYSR`, shows an error when displayed.
- The release number has not changed since 2019-08-22, even though the release contains the latest changes, and the release number on the website is correct.
