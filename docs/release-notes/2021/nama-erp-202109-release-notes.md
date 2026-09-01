# Nama ERP Release Notes - September 2021

::: info Release Information
**Release Date:** September 2021  
**Release Number:** 2021.09  
**File Size:** 191.7KB  
:::

## Additions

### Inventory

- Added the entity flow **"EAUseReceiptPaperForEngineOrChassisItems"** to use receipts.

- Created an entity flow for the Assembly Voucher that adds the **"Value per Unit"** found on the Expense Term lines, taking into account the date added on the Expense Term, so that when "Value per Unit" is edited on the Expense Term lines and the Assembly Voucher is recommitted, the cost is recalculated based on what was entered on the term.

- Created a new option in the Distribution Management (Supply Chain) documents term config named **"Allow the Remaining Quantity in Quantity Tracking to Be Negative"**.

- Improved the Assembly Voucher so that the quantities in the document details are also adjusted based on the unit, not only based on the quantity of the assembled item.

- Changed the error message that appears when editing the Expiry Date, since it was unclear - it said "Expiry Date Does Not Match the Existing One". It was changed to include the following fields:
  - Please add the item name
  - Lot Code
  - Original Expiry Date
  - New Expiry Date

### Purchasing

- Added the two fields **"Coding Group for Created Contacts, Create a Contact for Each Line"** to the Vendor screen, to create contacts for each vendor (the same way they are created from the Customer screen); the contacts for each vendor are then filtered inside the Purchase Invoice and the Purchase Price Quotation.

- Improved so that, when tracking quantities on the Purchase Request Consolidation Voucher against the purchase requests, and considering the delivered quantities in the Based-On, the quantities are considered in the (Purchase Request) field, so that when the Purchase Request quantity is fully executed, it no longer appears in the field.

### Sales

- Created rules in the Approval Definition named **"Sales Below the Default Price"** and an approval named **"Sales Above the Maximum Price"**.

- Added both the fields **"First Installment Value"** and **"Rounding Method"** to the "Create Installments" screen, which is opened via the "Create Installments" button.

- Added both the fields **"First Installment Value"** and **"Rounding Method"** to the "Create Installments" screen, which is opened via the "Create Installments" button.

### Service Center

- Added the option **"Do Not Show Technicians Who Have an Open Task on the Job Order Execution Document"** to Service Center settings. When this option is enabled, only employees who are available and have no ongoing tasks are shown on the Job Order Execution document.

- Added a grid to the Sub-Item screen containing the following:
  - Attachment
  - 5 `n` fields
  - 5 `text` fields
  - 5 `date` fields
  - a Notes field

- Added the option **"Comply with the Job Order's Items, Quantities and Prices in the Invoice"** to Service Center settings.

- **Rental Asset:** Added the two fields (From Number of Hours - To Number of Hours) in the details.

- In both **"Rental Asset Reservation Request"** and **"Rental Asset Reservation Invoice"**, improved so that when a specific number of hours is selected, the system refers back to the asset and adds lines for the selected number of hours according to the date.

- Created a new document named **"Sub-Item Purchase Order"**.

- Added a new document named **"Sub-Item Assembly Voucher"**.

- Added fields for the Sub-Item details, on documents containing sub-items, without them appearing on the screen (details such as chassis number, engine number, color, transmission, vehicle category).

- Added a term config for the **"Sub-Item Purchase Order"** document, with the same data as the Purchase Order document's term config, containing two options on the settings page: (Expand the Sub-Item Lines If the Quantity Is Greater Than One, Create a Sub-Item from the Line).

### Contracting

- Added a new document named **"Contracting Contract Template"**.

- Added the field **"Contract Template"** to each of the following documents:
  - Estimated Contracting Budget
  - Executive Contracting Budget
  - Project Contract

  When "Contract Template" is selected on any document, its lines are copied into the document's lines.

### Customer Relationship Management (CRM)

- Added the **"Contacts"** table to each of the following screens:
  - Lead
  - Potential

- Added the following files:
  - Building
  - Floor
  - Room

  under the "Maintenance Files" section, and they were added inside the Machine file.

- Added the classifications **"Machine Classification 1 - Machine Classification 2 - Machine Classification 3 - Machine Classification 4 - Machine Classification 5"**, and they were added inside the Machine file.

- On the Maintenance Contract lines, added the fields **"Building - Floor - Room - Maintenance Duration - Number of Visits - Visit Type - Maintenance Group - Technician"**.

- Created a new document named **"Maintenance Work Plan"**.

- Created a file named **"Task Template"**, containing a "Tasks" grid, and the template was added to the Machine file.

- Added the **"Maintenance Order Execution"** voucher.

- **Maintenance Order:** Improved so that when a Maintenance Order is created from within a "Maintenance Plan", the system fills in the expected date in the "Actual Date" field on the Maintenance Order.

- Added a status to the Maintenance Order document (Preliminary - In Progress - Completed - Reopened); when the Maintenance Order is saved, the status is "Preliminary" on save, and when an execution is created the status becomes "In Progress"; the status changes to "Completed" when the existing executions all have status "Completed" - and if an execution is reopened, the order's status changes to "Reopened".

- Improved so that when a Maintenance Invoice is created based on a Maintenance Order Execution, it takes into account what was added on the execution.

- **Maintenance Order Execution:** Added the following improvements:
  - Improved so that clicking the "Change Status to In Progress" button sets the status to Reopened
  - Added a button named "Create Maintenance Invoice"
  - Added a Service grid to the execution, the same as in the Maintenance Order
  - Added the field "Execution Voucher Status" to the machine lines inside the Maintenance Order

- Added the following fields to the term config of both the Maintenance Order and the Maintenance Invoice:
  - Tax Policy
  - Subject to Tax
  - Allow Editing the Invoice Tax on the Line
  - The Tax Can Be Edited

### Human Resources

- **Payroll Year file:** Added `refs`, `descriptions`, `n`, `dates` to the lines, and they are copied to the periods automatically; these fields are not shown and are made visible by customizing a screen.

### Hospital Management System

- Allowed deleting and editing vouchers that have no effect on the shift's transactions.

- Added the option **"Allow Repeating the Procedure Type on the Line for the Same Invoice"** to the Surgical Procedure Invoice term config.

- Added price dimensions to the lines of the invoices (Procedures - Radiology - Lab Tests - Services - Supplies - Supplies & Services - Physiotherapy - Blood Bank), and they are taken from the price lists.

- Added the option **"Use the Doctor Instead of the Patient in the Accounting Effects"** to the Medical Classification.

### Manufacturing

- Sorted the **"Quantity Movements"** on the Production Order by Actual Date then Creation Date, by default.

### Point of Sale

- Added two options to Point of Sale settings, as follows:
  - Record Classification Is Required on the Point of Sale Receipts screen
  - Record Classification Is Required on the Point of Sale Expenses screen

### Settings

- Allowed one of the establishment's parties (whether a customer, vendor, contractor, or employee) to request being added to the system remotely, by going to a specific link to fill in their own data as a user, so that the system administrator can add them; after that, this user (customer, vendor, contractor, or employee) can request an edit to their own record's data (a customer, vendor, contractor or employee record), for these edits to be approved afterward and the record then updated. To support this feature, the following was added:

  - A Portal for requesting to add a user, available for example at the link `http://localhost:8080/erp/adduser`
  - Added an "Add User Request Settings" section to Global Config, to define the book and term config for the Add User document and to set a welcome message on the Portal for adding a user
  - Added the following documents:
    - Add User Request
    - Customer Data Edit Request
    - Vendor Data Edit Request
    - Contractor Data Edit Request

- Added a column, with a checkbox button, inside the Shopping App Panels document, so that the user can control which elements appear on the app by marking the line or removing the mark from the line, in which case it does not appear on the app.

- The system accepts adding a fiscal year on the same calendar with the same date, but does not accept editing them; the correct behavior is to prevent duplicate additions on the same calendar with the same dates, just as with editing.

- Added the following two documents:
  - FormDoc1
  - FormDoc2

  which contain the same fields as the Detailed Remark.

- Added the option **"Use the Real Next Number for Drafts"**, so that a code is generated for the document even if it is (a draft or awaiting approval), in both groups and document books.

- Added the option **"Summarize Debt Ages Within the Same Voucher"** to Global Config.

- Added the option **"Inactive Starting From Date"** to both the Book file and the Term Config file; when the "Inactive" option is checked, the system inserts today's date into this field on save.

### New GUI

- Added the option **"Used on Mobile and Tablets"** to Edit Screen.

## Fixes

### Inventory

- Fixed an issue where, sometimes, running a system reprocess at the customer's site caused processing failures for some inventory documents.

- Fixed an issue where the Assembly Voucher did not take into account a unit change on the voucher and its effect on the component quantities.

- Fixed an issue where, when using the option **"Verify Overdraft by Date"**, there was a problem with the quantity belonging to a receiving voucher that had been partly issued: the system accepted increasing the receiving quantity but did not accept decreasing it, even though doing so would not cause an item overdraft.

### Sales

- Fixed an issue where, when applying item offers and adding a condition that the invoice total falls within a specific range from amount to amount, the system applied the offer regardless of whether the condition was met.

- Fixed an issue where, after performing the steps (a Sales Order with a price, then an Assembly Voucher based on the Sales Order, then an inventory Issue Voucher based on the Assembly's receiving, then creating a Sales Invoice combining the inventory documents as linked documents, and applying), the system did not show the price when applying (the price found on the Sales Order).

### Accounting

- Fixed an issue where, after creating a Payment Voucher based on a Disbursement Request with the option **"Apply the Effect on the Topmost Based-On Voucher When Based on a Request or a Receipt/Disbursement Order"**, found on the Payment Voucher term config, checked, the system did apply the effect on the based-on voucher, but with the following errors:
  - The system accepted disbursing an amount larger than the invoice value found in the Based-On of the Disbursement Request, since the system accepted saving it
  - The remaining amount on the Disbursement Request was not affected, since it remained unchanged

- Fixed an issue where, when issuing the financial statements and setting up **"Financial Statement Issue Link Settings"** with a date input, the link did not work; likewise, when using the period start date and running an annual report, the report also did not work.

- Fixed an issue where, when adding an Inter-Company Transfer Current Account document, the error **"Cannot Execute the Operation"** appeared on save.

- Fixed an issue where, on the Payment Voucher screen, creating a Payment Voucher based on an **"Addition and Exclusion Voucher"** did not copy the details from the document.

- Fixed an issue where, in both the Receipt and Payment Vouchers, selecting the subsidiary "bank account" and a specific bank account, then clicking the payment-method field to select a payment method, the system did not show the payment methods linked to that bank.

- **Bulk Disbursement Request:** Fixed an issue where, after creating a Bulk Disbursement Request with partial values from the disbursement requests' values, the system did not accept combining the disbursement requests again into a Bulk Disbursement Request with the remaining values, even though the option "Disburse Once Regardless of the Value" was not enabled.

- Fixed an issue where, after creating a Bulk Disbursement Request for a group of disbursement requests and then deleting it, the numbers in the fields `Payment vouchers value` and `Value Remaining` on the disbursement request remained unchanged, making it impossible to disburse or combine it again; recommitting the disbursement request corrected the `Value Remaining` but left the `Payment vouchers value` unchanged — and its value even increased if the operation was repeated — with the result that, when a disbursement request was selected inside a Payment Voucher, the amount was not copied into the Payment Voucher.

### Banks

- Fixed an issue where, sometimes, an Excel file could not be imported into the Bank Statement in the Bank Reconciliation Statement.

### Real Estate

- Fixed an issue where, on the Real Estate Investment Land screen, selecting accounts showed all sub-accounts and their subsidiary; the correct behavior is to show only the accounts whose subsidiary is the Land subsidiary.

- Fixed an issue where, checking the option **"Consider Taxes When Calculating the Net Installments on Payment"** in Real Estate settings, the system checked the "Paid" option on the Sale Contract installments while no payment had actually been made.

### Contracting

- Fixed an issue where, on the Contracting Purchase Request document, creating a Purchase Request and selecting the Term code copied the details from the Term Analysis Card, but the item unit did not come from the Term Analysis Card.

- Fixed an issue where, when creating a new Purchase Request on the same Term Analysis Card and the same Term, with Quantity Tracking enabled in the term config and considering the quantities from Based-On, it did not work correctly.

- Added a new document named Contracting Supplies Purchase Order.

### Human Resources

- Fixed an issue where, when an employee was hired with a Job Offer, then terminated and rehired again, while a Salary Component was linked to a formula calculated through brackets and (Experience Duration in Days as a system indicator), the Experience Duration in Days for the first Job Offer was not taken into account, and only the employee's latest Job Offer was considered when calculating the Experience Duration in Days.

- Fixed an issue where the message **"Cannot Execute the Operation"** appeared when saving the Insurance Company Accreditation Voucher.

- Fixed an issue where, when issuing a Payroll Voucher for an employee who had a Leave Voucher for a paid leave type with a leave start date of 2021-09-16 and a return date of 2021-09-17, the Payroll Voucher calculated the return day as if it were within the leave days and charged it an extra day's value.

- Fixed an issue where an error sometimes occurred in the monthly lateness formula on the Payroll Voucher.

- Fixed an issue where, sometimes, an error appeared when creating a Leave Voucher for an employee while there was another Leave Voucher on a later date than the current leave.

- **Dues Liquidation document:** Fixed an issue where, when creating a Dues Liquidation document based on a Leave Voucher or a Bulk Leave Voucher, the system filled in the "Liquidated Until Date" field with the return date from the Leave Voucher, even though the liquidation is done up to the date of the last working day before the leave; the correct behavior is for the system to set "Liquidated Until Date" to (leave start date - 1 day), i.e. the last working day before the leave.

- **Dues Liquidation document:** Fixed the document so that the effect on the field **"Liquidated Until Date"** found on the Employee file comes from the return-to-work date after the leave for which the liquidation was created, since this date will be the start date of the employee's next liquidation, not the end date of the current liquidation as currently happens.

- **Employee Insurance Addition Request:** Fixed an issue where, when the system calculated the cost of the insurance period by day (start date, end date), an error appeared in calculating the cost value, which led to a journal entry being issued with an incorrect value.

- **Employee Insurance Addition Request:** Fixed an issue where, when saving a medical-insurance addition while there were employees with the option (Add Dependents Only - on the lines) checked, the error message appeared saying the employee's (insurance has not ended yet), even though the Medical Insurance Addition Voucher is used to add dependents who have no medical insurance.

- Fixed an issue where an error sometimes occurred in the annual leave balance in certain cases, such as when an employee leaves work for a period and, on returning, a new Job Offer is created.

### Hospital Management System

- **Surgical Procedure Invoice:** Fixed an issue where, when deleting a line with a procedure type, the system removed its related lines from the Supplies and Services.

- Fixed an issue where, on Hospital invoices that perform an inventory issue, using the entity flow for combining lots caused the system to show an error message. The following are the invoices affected by this issue:
  - Medical Services & Supplies Invoices
  - Medical Services Invoice
  - Medical Supplies Invoices
  - Blood Bank Invoices
  - Pharmacy Invoices
  - Physiotherapy Invoice
  - Surgical Procedures Invoices
  - Radiology Invoice
  - Lab Tests Invoices

### Settings

- Fixed an issue where approving a Price Quotation document and sending an approval email caused the approval to show an error.

- Fixed an issue where exporting reports and then importing them did not work correctly.

- Fixed an issue where, when using a barcode scanner, the system did not move the cursor to the second line correctly.

### Service Center

- Fixed an issue where, when deleting a Yacht Reservation Cancellation document, the system journal entry for the document was not deleted from the system's journal entries.

- Fixed an issue where, in the Sub-Item Receiving document term config, using the option **"Create Documents Automatically"** and then searching for inventory-voucher term configs and books, showed Inventory Issue books and term configs instead of Inventory Receiving books and term configs.

### Point of Sale

- Fixed an issue where, when editing a Nama translation, the system did not carry the edits over to Point of Sale.

### New GUI

- Fixed an issue where an error appeared when creating a Depreciation Voucher in the New GUI and clicking "Combine Assets".

- Fixed an issue where the report **"Two-Year Financial Position Statement by Period"** did not work correctly in the New GUI.

- Fixed an issue where some fields were given colors from the Fields & Screens Settings screen, and colors were added for items and warehouses, but opening the New GUI showed the fields with no colors at all.

- Fixed an issue where, on Sales Invoices in the New GUI, the invoice lines appeared empty because of items and warehouses that have colors.

### Reports

- Fixed an issue where the end-of-period balance value appeared doubled in report `007ACC-SYSR`.
