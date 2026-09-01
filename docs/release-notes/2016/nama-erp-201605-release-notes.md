# Nama ERP Release Notes - May 2016

::: info Release Information
**Release Date:** May 2016  
**Release Number:** 201605
:::

## Additions

### Inventory
- Added the entity flow `EAFieldsValuesCalculator` to add a field in the Item file that can work as **automatic coding (serial)**.
- Improved so that the **default warehouse location** can be entered for each item.
- Improved so that if a Reservation document is made for a quantity of a specific item and the user tries to create a Sales Invoice for the reserved item, the error message changes from (Insufficient item quantity) to the message **(Quantity (X) of the item is reserved)**.
- Enabled **automatic coding** with the **alternate code**.
- Developed a system for **keyword templates** for the Item Keywords system.
- Added the ability to **move categories** in the Item file.
- Prevented editing the quantities of the Delivery Voucher via the entity flow `EAPreventChangingSCDocumentCriticalFields`.
- Added the option **"Check sequencing only on first save"** in the Delivery Voucher term config.
- Added the **order limit for sizes, colors and versions** in the Item file.
- In the Stock Transfer document, added the option **"Calculate expiry dates from the Lot code"**.
- Added the section **"Dimensions allowed to overdraft"** in the Distribution Management Settings.
- Developed **item categories**, with each category in a separate file.
- Allowed attaching **more than one image** in the Item file.

### Sales
- Improved the entity flow `EAFieldsValuesCalculator` with the **"Update Calculated Fields"** event, so that as soon as the invoice is saved, the system inserts the warehouse and the sales representative according to the selected book.
- Added a page dedicated to **Fixed Assets** to the Customer file.

### Purchasing
- Added improvements to the **Discount Adjustment document** so that it accepts more than one invoice, works and is applied over a specific period and on specific vendors, and from branch to branch... and the dimensions.

### Accounting
- Added a **line-level attachment** to the Journal Entry.

### Fixed Assets
- Added the **opening acquisition value** and the **opening depreciation value** to the Fixed Asset Opening document.

### Banks
- Changed the Financial Paper so that **editing the subsidiary** is allowed after a Receipt Voucher or Payment Voucher has been made against it.
- Added the field **"Site Name"** to the Financial Paper document, for use when printing cheques from the system.

### Contracting
- **Enlarged the size of the lines** in the Assay.
- Added the ability to create a **Subcontract without linking it to a Project Contract**.

### Service Center
- **Service Request document:** Added fields for the **reservation date and time**.
- **Service Request document:** Changed the Arabic translation of the group name "Dates" to become **"Reservation and Delivery Date"**.

### Customer Relationship Management (CRM)
- Added **attachments** inside the Analysis and Quotations screens.
- Added a new status to Development Requests: **"Reopened"**.
- Prevented editing the status of requests if they occurred in a release.
- Added **attachments** inside the Support Request, like the attachments found inside the Development Request.

### Real Estate
- **Collection Voucher:** Added a details screen inside the Collection document to show related documents such as Receipt Vouchers and Ownership Transfer Vouchers.
- Created a **details screen** inside the Unit that contains all the transactions carried out on this Unit (such as the Lease Contract, the Sale Contract, or the Reservation document).

### Human Resources
- Added a new field to the Insurance Company Delegation Voucher, **"Add dependents only"**, which edits the dependents' insurance only. The journal entry is created only for the dependents' lines, not the employees' lines, and the employee's own data is not updated — only the dependents' data.
- Added a document, the **"Vacation Plan document"**.
- Developed the **Change Employee State document**.
- In the Violation Voucher, the **deduction value is now calculated by the minute** instead of by the hour.
- Added the option **"Paid for full work periods only"** in the Salary Component file.
- Changed the Delegation Voucher for health insurance, as follows:
  - The dependents' age is no longer linked to the employee's age
  - The insurance value is set based on the relationship (kinship)
- Added a new entity flow that adjusts the value of the first salary component and recalculates the taxes and so on until it reaches an acceptable difference or exceeds a specified number of attempts. This flow is `CalcBasicSalaryForNetSalary`.
- Added **ten fields** to the Payroll Record lines, namely `sComponentValue1` - `sComponentValue2` - ...... `sComponentValue10`. The same fields were also added to the Human Resources Settings, and the new fields can be shown in the Payroll Record by editing the screen.
- The **priority of the tax component** is now taken into account when calculating the tax.
- Allowed leaving a salary component's value unedited when reissuing the Salary Voucher for specific components.
- Changed so that when a draft Salary Voucher is reissued, it is left as a draft as it is.

### Accounting
- Showed the **total invoice amounts** on the Invoices page of the Receipt document.
- **Accounts Distribution file:** Added the field **"Minimum value that can be distributed to the sector/branch/department/analytical group"** to the pages (sector - branch - etc.).
- Added the **collector** to Receipt Vouchers.
- Allowed splitting a Disbursement Request across several Payment Vouchers, so that the value of the Disbursement Request is distributed over several Payment documents.

### Manufacturing
- Added the option **"Allow operations to exceed the number of resources available on the production floor"** in the Manufacturing Settings.
- Clarified the titles of the accounting effects found in the term config of the Production Order Closing document, related to resource time, resource value, raw materials, and the final product.
- **Forecast document:** Improved so that grouping can be done every three months.
- **Raw Material Issue Request:** Improved so that the field **"Based on Production Order"** is not a required field.

### Fixed Assets
- Added the **fiscal period and fiscal year** to both the `FAPropertiesEntry` and `FALocationEntry` files.

### Point of Sale
- Allowed downloading Point of Sale from the address `pos/bin/com.namasoft`, where the file can be extracted and the file `pos-0.0.1-SNAPSHOT-jfx.jar` run from its location.

## Settings

1. Improved so that columns from the lines can be displayed and added to the search. It is also possible to add a field from within another field (for example, in the Sales Invoice, the item category can be shown in the list screen or used in search via the field `details.item.item.category1`).

2. Added the ability to access the current user's data in queries, where `($currentUser.code)` can be used.

3. Created a new action that can be used with Scheduled Tasks, which will release the reservation based on a query that specifies the type in the first column and then the identifier in the second column. This action is `com.namasoft.modules.supplychain.domain.utils.EACancelReservationOfDocsByQuery`.

4. Added the ability to view the records created by a user, and those created by specific users who are named in the Permission file.

5. Added **20 text fields** and **10 miscellaneous fields** to the dimension files, so they can be used in preparation and reports, and to enter more data on the dimensions.

6. Added a page dedicated to **editing blocks** in the "Edit Screen" file.

7. Fixed the number of records for `all` in Notifications to be **500**.

8. Added a suggestion for the source on both the Reports page and the Dashboards page of the Edit Screen file.

9. Allowed grids to use `HTML` instead of plain text.

10. Reduced the program's initial load size by loading dashboard files only when needed.

11. **Recurring Documents window:** Added a details page showing the documents created and issued by the Recurring Documents system.

12. **Recurring Documents window:** Added the line-level option **"Prevent editing"** to prevent editing recurring documents.

13. **Recurring Documents window:** Allowed specifying the number of repetitions or an end date, adding the two buttons **"Repeat documents to a specific date"** and **"Repeat documents for a period"**.

14. Created a new document, **"Meeting Notes"**.

15. Allowed the permission `(UserFiledFilter)` to be open to all users on the system without adding it, via the Fields & Screens Settings.

16. Created the entity flow `ValidateSorceLinesOfFromDocAction`, which verifies that there is a "based on" line for every line in the document.

17. Added `$toReal` to make it easier to access references, as in the following example: `customer of from doc {fromDoc.$toReal.customer.name1}`.

18. Applied **"Criteria"** inside the **"Required Fields"** screen, so that applying required fields is tied to meeting a condition within the screen.

19. Added the ability to reissue the `LedgerTransReq` file for some document types, as a result of the new effect of the document term config. These types are: (Sales Invoice, Sales Returns, Purchase Invoice, Purchase Returns, Stock Issue, Stock Receipt).

## Fixes

### Inventory

1. Fixed an issue where, in the Reservation Voucher and the Delivery Voucher, the system did not allow searching for items in the document lines by pressing the down-arrow key or double-clicking with the mouse.

2. Fixed an issue where the term config for Inspection and Stock Receipt vouchers did not work.

3. Fixed an issue where running a database that has no Warehouse Settings showed a technical error (`technical Error`).

4. Added the field **"Unit used to suggest quantities"** to the Distribution Management Settings.

5. Fixed an issue where creating a **"Stock Transfer"** document based on a **"Production Order"** document showed the following errors:
   - The system retrieved the line data with the `LOT` numbers but without the production and expiry dates
   - When the dates were retrieved manually, the system retrieved the expiry date correctly, but the production date was not extracted correctly

### Sales

1. Fixed an issue where creating a Sales Return against a fully returned invoice showed the message (Insufficient item quantity); the message should instead state that the invoice had already been returned by return (number - Sales Return code).

### Purchasing

1. **"Purchase Invoice" document:** Fixed an issue where, when consolidating Stock Receipt vouchers, the system retrieved Stock Receipt vouchers for the same vendor without filtering on the warehouse stated in the document.

2. **Purchase Invoice:** Fixed an issue where, when consolidating Stock Receipt vouchers, the program included vouchers saved as draft among the consolidated documents.

### Accounting

1. Fixed an issue where the system sometimes allowed creating more than one Payment Voucher for the same Financial Paper.

2. Fixed an issue where the system allowed paying an invoice that had already been paid, via Payment and Receipt vouchers. Accordingly, creating a Payment or Receipt Voucher was prevented for an invoice whose remaining balance is 0 or whose total paid equals the invoice net.

3. Fixed an issue where the Accounts Bag accepted subsidiary accounts in the bag.

4. Fixed an issue where, in the Receipt Voucher term config, selecting Account 1 on the credit side caused the system to select the main account, and likewise in the Payment Voucher when selecting the debit side.

5. Fixed an issue where editing the Payment Voucher showed a blank error message.

6. Fixed an issue where creating a Receipt Voucher for a customer and entering invoices on the Invoices page did not update the payment vouchers on the invoice, and did not update the remaining balance and the total paid from the vouchers.

7. Fixed an issue where the system did not allow deleting a Financial Paper from the Receipt or Payment Voucher if the voucher was an implicit collection.

8. Fixed an issue where an error occurred when adding a Sales Invoice on the Invoices page of the Receipt Voucher.

9. Fixed an issue where an error occurred when creating a Receipt Voucher based on a Sales Invoice.

10. Fixed an issue where selecting a specific payment method inserted the bank account but did not automatically insert the currency in Receipt documents.

### Banks

1. Fixed an issue where the Bank Transfer document could be saved even though the credit value differed from the debit value.

2. Fixed an issue where the system allowed creating a Cancellation Voucher for a Financial Paper more than once.

3. Fixed an issue where saving the Bank Transfer document showed a blank error message.

4. Fixed an issue where, in the Bank Reconciliation Memo, after consolidating the data and performing the reconciliation and matching, the pending transactions appeared but disappeared after saving.

### Settings

1. Fixed an issue where the system did not allow printing a list-form report.

2. Fixed an issue where notifications could not be sent to the customer on the Support Request.

3. Improved so that there are filters and a search engine in the `List Notifications View`.

4. Fixed an issue where an error sometimes occurred when saving a Voucher Cancellation voucher.

5. In Scheduled Tasks, added targets like the ones found in Notifications.

6. Created the entity flow `SWSUpdateSalesInvoiceHandlingAction` to update the delivery status of the Sales Invoice based on the reservation status; it works with the **"Update Calculated Fields"** action.

### Contracting

1. Fixed an issue where converting the Assay into a contract carried over all the data except the description.

2. Fixed an issue where the Vehicle Procedure voucher would not save.

### Human Resources

1. Fixed an issue where the system allowed creating two Salary Vouchers for the same employee for the same month.

2. Fixed an issue where, when calculating cumulative taxes in the Salary Voucher, the system took draft vouchers into account.

3. Fixed an issue where, in the Attendance voucher (Add Employee Manually), the program deleted the last day of the month. For example, when selecting an employee's attendance for January, the system set the date only up to day 30, and likewise for the other months.

### Point of Sale

1. Aligned the fields with each other (such as the customer code, discount percentage, and so on).

2. Set the `Alignment` of the field labels so that they align to the left of the field in Arabic and to the right in English.

3. Unified the font across all screens.

4. Added a shortcut to hide the side bar, and another shortcut to hide the favorite items.

5. Added a sequence in the grid (line number) that is not entered manually but always displays the line number (like the line number in Nama).

### Manufacturing

1. **Operations:** Fixed an issue where Nama allowed exceeding the resources available on the production floor.

2. Added the option **"Allow operations to exceed the number of the resource available on the production floor"**.

3. In the **"Quality Confirmation"** document: when a QA employee creates a "Quality Confirmation document," which is then reviewed by the QA manager and then approved by the lab employee — improved so that the **"Create Transfer Request"** button inside the document is only activated after the lab employee's approval, i.e. it is only activated when the document status is **"Approved"**.

4. **Damaged Receipt document term config:** Fixed an issue where, when selecting **"Create documents automatically"**, it would not accept saving a book and a term config inside the automatic creation — on saving, the program deleted the book and the term config.

5. **Planning document:** Fixed an issue where pressing the **"Consolidate"** button, selecting the documents to be consolidated, and then pressing **"OK"** showed the message **"Operation cannot be performed."**

6. **Forecast document:** Improved so that there is a grouping column for every three months (quarterly total), in addition to a grouping column for the 12 columns (for the four quarterly-total columns).

7. Fixed an issue where, in the **"Production Order"** document, trying to insert an extra line in the raw material lines did not automatically calculate the required `Final Required Qty` after entering the `Qty Primary`, according to the `BOM`, as is the case with the retrieved raw materials.

8. Fixed an issue where pressing the **"Consolidate Lots"** button inside any existing Production Order caused the system to add a second-to-last line in the raw material lines with a negative quantity, the reason being an overdrawn quantity of the item.

9. Fixed an issue where an error sometimes occurred in the Production Order.

10. **Raw Material Return document:** Fixed an issue where creating a **"Raw Material Return"** document, starting by selecting the **"Production Order"** and then selecting a document in **"Based on"** such as **"Raw Material Issue"**, caused the system to show a list of all Raw Material Issue documents; the documents shown in **"Based on"** should instead be filtered to show only the documents related to the specified Production Order.

## General Fixes

1. Fixed an issue where selecting a `popup` screen made all the search suggestions disappear.

2. Fixed an issue where processing some documents failed due to an error in the aging of debts.
