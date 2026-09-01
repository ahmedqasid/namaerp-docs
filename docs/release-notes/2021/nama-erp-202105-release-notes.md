# Nama ERP Release Notes - May 2021

::: info Release Information
**Release Number:** May 2021  
**Release Date:** May 2021  
**File Size:** 153.1KB  
:::

## Additions

### Inventory

- Improved the performance of the **FIFO ("First In, First Out")** costing method
- `Inventory Count Committee`: The "**Consolidate Items on Date**" button opens the consolidation window. In this window, the label of the "In Date" field was improved to read "**In Date (excluding warehouse movements on the same day)**"
- Added the option "**When to recalculate the cost of uncosted supply, inventory-count supply, and returns**" to the `Chain Supply` settings, so that recalculating the cost of uncosted supplies can be prevented, which reduces cost changes in closed years
- The analysis group and the other dimensions used in quantity tracking, whether on the line or in the document header, are now considered when suggesting locations in `Chain Supply` documents
- When creating a `Delivery Voucher` based on a `Warehouse Issue Voucher` based on a `Warehouse Issue Request` based on a `Sales Order`, the shipping address recorded in the `Sales Order` did not appear in the `Delivery Voucher`. The shipping details are now copied across these documents
- Added the field "**Method of Splitting the Assembled Item's Components**" to the Item file
- Added the option "**Split the assembled item's components on save**" to the term config for sales documents

### Sales

- Activated and enabled the integration with the **Egyptian Tax Authority** for electronic invoices
- Added the field "**Installment Description**" next to the field "**Installment Code**" in the payments grid on the Sales Invoice, and in all installment windows, so that an entity flow can show the installment's details while searching (in the Receipt Voucher, for example) — buyer name, net amount, due date — making it easier for the user to find an installment while collecting payment

### Accounting

- Added the document "**Miscellaneous Purchase Request**"
- Changed the translation of `MiscPurchaseOrder` to **Miscellaneous Purchase Order**
- Added the option "**Prevent debt-aging tracking for this subsidiary — even if it is enabled for the account**" to all subsidiaries
- `Financial Statement Settings window`: Increased the number of selectable line levels; instead of (Sub, Main, Intermediate), they are now as follows:
  - Sub
  - Sub 2
  - Sub 3
  - Intermediate
  - Intermediate 2
  - Intermediate 3
  - Main
  - Main 2
  - Main 3
- Added the option "**Prevent saving if there is no budget for the account**" to the account window

### Contracting

- Added the field "**Purchase Order Quantity**" to the Analysis Card details
- Added the fields (Item Code, Analysis Item Code, Analysis Card, Standard Item, Item Description, Cost Execution, Execution Budget Item Code, Estimated Budget Item Code, Execution Budget Item Description, Estimated Budget Item Description) to the details of the `Contracting Purchase Order`

### Letters of Credit

- Added an option named "**Allow editing preliminary invoices for credits after expense vouchers have been created against them**" to the `Chain Supply` settings; by default, editing is prevented unless the user checks the option
- Added the option "**Round the total quantity to multiples of the number**" to the details of the "`Expense Item`" window

### Service Center

- `Spare Parts Issue Request Document`: Improved so that when the work order is selected and the task on the line is clicked, it is filtered to the tasks that actually exist inside the work order
- Added the option "**Use the issued quantity, not the transferred quantity, when adding spare parts to the work order from external vouchers**" to the Work Order term config
- Added a new section to the module named "**Rental Assets**" containing the following:
  - Rental Assets file
  - Rental Booking Invoices
- `Rental Booking Invoice`: Improved so that editing the Number of Hours field on the Rental Booking Invoice affects the "**To Time**" field with the edited number of hours
- Added a new voucher named "**Rental Booking Request**"
- Added a new voucher named "**Rental Asset Booking Cancellation**"
- Added the "**Working Hours**" grid inside the Rental Asset

### Human Resources

- Added the **Employee** field to the displayed columns in the list screens and filters for the following screens:
  - Combined Leave Request
  - Combined Leave Voucher
  - Leave Allowance Disbursement Voucher
  - Employee Status Change
  - Advance Request
  - Advance Voucher
  - Advance Repayment Voucher
  - Advance Suspension Voucher
  - Advance Waiver Voucher
  - Reward/Penalty Voucher
  - Suspension Voucher
  - Settlement of Dues Voucher
  - Employee Termination Voucher
  - Clearance Voucher

### Real Estate

- Added the field "**Responsible Employee**" to each of the following screens:
  - Maintenance Expense Request
  - Maintenance Expense

### Customer Relationship Management (CRM)

- Added a call icon and a WhatsApp icon next to the contact (mobile) field, or any contact field found on screens that carry contact information, such as (Customer - Lead - Vendor - Subcontractor - Partner - Related Party - Employee - Consultant - ...)

### Human Resources

- Added the following fields to the details of the `System KPI Voucher`:
  - Maximum Number of Hours for the Period
  - KPI Value During the Period
- Added the field "**Calculate the value in the System KPI Approval Voucher**" to the KPI file
- The totals in the `Salary Records` do not sum the overtime and deduction values correctly

### Point of Sale

- Improved so that when saving a `POS Invoice`, prices are recalculated based on the selected customer and price dimensions
- In the Receipt and Payment windows in POS, added (the subsidiary and the subsidiary code) to the fields used for searching
- Added a field named "**Delivery Service Item**" to both the Register file and the Nama settings file (the register takes the highest priority)
- Added a new window named "**POS Delivery Service Costs**" to the Point of Sale module
- Added the ability to edit a customer — from the More menu — Edit Customer — but this is only possible for a user with the "Ability to Edit Customer" permission, a permission that was added. When the button is clicked, the user selects a customer, and the system opens a window dedicated to editing the customer
- Added the option "**Used for POS**" to the "Area" file, to transfer the area for use in POS
- Added the ability to add a **Delivery Representative** to the invoice; it is also added automatically when a service item is defined on the register in use
- Added the ability to **hold a POS order**, through the `POS Booking Voucher`, which is used to hold a POS invoice and pay part of the amount; the remaining amount is then paid when issuing a `POS Invoice` based on a `Booking Voucher`. When a POS invoice partly paid via a booking voucher is issued, the booking voucher is applied to the payment vouchers inside the invoice
- To activate the booking voucher feature, added the option "**Use POS Booking Voucher**" found in the POS settings

### Settings

- Updated the contact information for the Kuwait branch, which appears when clicking `about`
- Added the option "**Max Concurrent List Page Matching Operations Count Per User**" to the Global Config file
- Added the option "**With Approval Request**" to the Approval Definition
- Added a reference named "**Allow For**" containing the options (Employee - Permission File - Group (Users) - Employee Group) to the "**Ignore Closed Periods**" grid in both the Fiscal Year and Global Config files
- Added a numeric field, "**Maximum Number of Export Times**", to both the User window and the Global Config window. If the number is left empty for the user, the system uses the value in Global Config. The default value for the field in Global Config is "2". If the field is also left empty in Global Config, this means there is no limit on the number of exports per user
- In some cases, when approving an edit to a document (Disbursement Voucher) linked to a Financial Paper, an error message appears saying the financial paper has already been issued
- `Send Documents to the Tax Authority`: Added a Tax Settings field to the book and term config, so that on save it is known which file will be used to send the invoice. Based on this, the voucher (invoices, returns, etc.) is confirmed to be suitable for sending when it is saved, according to the settings file on its book or term config — so the settings must be specified on the book or term config before saving vouchers against it
- `Tax Authority Settings File`: Added the following two fields:
  - "**Start Sending From Date**", so that confirmation is skipped when resaving or editing vouchers dated before this date
  - "**Send Documents Digitally Signed**"
- Saving vouchers with a future date is now prevented if they will be sent to the tax authority, and saving vouchers dated more than 3 days in the past is also prevented if they will be sent to the tax authority
- Added the following two actions to the More menu on the Sales Order:
  - View the Invoice on the E-Invoice Portal
  - View the Invoice on the E-Invoice Portal for the Unregistered
- Translated all the messages related to sending documents to the tax authority so that they appear clearly
- Added tracking of the status with the tax authority, through the field "**Document Status at the Tax Authority**" in the "`Send Documents to the Tax Authority`" document
- Added the button "**Send Documents That Were Not Sent**" to the "`Send Documents to the Tax Authority`" document

### Reports

- The `024ACC-SYSR` report does not show the debt-aging values in their periods when a vendor is selected in the subsidiary; also, the link on the `025ACC-SYSR` report from the Value column does not work correctly
- Improved the Item Profitability and Invoice Profitability reports (`001SLS-SYSR` and `002SLS-SYSR`) so that the sales value is shown excluding tax

## Fixes

::: warning Bug Fixes
Many bugs were fixed in this release to improve performance and stability
:::

### Inventory

- Fixed an issue where, in the `Consolidation Voucher`, when using an expense item set in the item's details to be "Greater Than or Equal" or "Less Than or Equal", the calculation was not correct, whether from the raw materials or from the supplied quantity
- Fixed an issue causing an error when moving out of the consolidated item field in the document header, in the `Consolidation Voucher`
- Fixed an issue where selecting the item with the barcode enabled showed the error "**Cannot execute the operation**"
- Fixed an issue where processing sometimes failed in the **FIFO ("First In, First Out")** costing method
- Fixed an issue where inserting the "Consolidation Method" in the details of the `Consolidation Voucher` caused an error when storing the document
- Fixed an issue where, when issuing a `Warehouse Supply Voucher` based on a `Warehouse Inspection Voucher`, the system did not track the quantities of the inspected items correctly

### Banks

- Fixed an issue where the system compared the system's movements with the bank's movements incorrectly

### Human Resources

- Fixed an issue where an error sometimes occurred while issuing the Salary Record

### Service Center

- Fixed an issue where clicking the `Close Work Order` button in the `Work Order Execution` screen closed the work order, but the tasks and spare parts data did not carry over into the closing screen and totals. Improved so that all the work order's data carries over into the closing screen when the work order is closed
- `Tasks screen`: Fixed an issue where selecting brands on the lines did not filter the models

### Real Estate

- Fixed an issue where, in some cases, performing a `Recommit` on a Sale Price Offer voucher caused the system to change the unit's status to an incorrect status

### Settings

- Fixed an issue where, in some cases, when an employee enters a new customer from inside one of the system's documents, while a template for entering the customer exists for this employee, the system showed an error message
- Fixed an issue where an error sometimes occurred when changing the user's password
- Fixed an issue where approving via email and clicking Approve showed the message (`Could not perform the action`)
- Fixed an issue where creating an alert together with an approval request was not sent by the system
- Fixed an issue where, when performing a validation based on criteria with the option "Warning, not error" checked, the warning message appeared and disappeared very quickly, so the customer did not see it

### Contracting

- `Contracting documents`: Fixed an issue where it was not possible to search for the analysis item code by the analysis item name, as is the case when searching master-file records elsewhere in the system (searching for an item by the item code field, for example)
- Fixed an issue in the `Quotation Budget` (an Estimated Contracting Budget) where the total price for the first main item (when there are main items nested under it) was not calculated, even after performing a `Recommit` or editing and resaving
- Fixed an issue in the `Execution Contracting Budget` where deleting the conditions did not recalculate the cost or the additions from the conditions in the items table

### Point of Sale

- Fixed an issue where, after sending a `POS Invoice` to Nama while the invoice had a problem, if the user refreshed the errors from the register, the invoice turned into a draft even if it had already been reviewed
- Fixed an issue where an error sometimes appeared when the customer consolidated the shift's invoices into a single invoice

### Reports

- Fixed an issue in the `Item Quantities in Warehouses ("009INV-SYSR")` report where the filter dimension codes were shown instead of the dimension names; also, when exporting the report to `PDF`, some item names did not appear in full

### New GUI

- Fixed an issue in the `Journal Voucher` screen and the `Disbursement Voucher` screen where, when selecting a contracting project in the subsidiary field on the line and selecting the item-description field `lines.text`, the items for that field did not appear in the New GUI
- Fixed an issue where some reports do not work with the New GUI, such as the following reports:
  - `SYSF-ACC01-new`
  - `SYSR-ACC031`
- Fixed an issue where, when creating a `Receipt Voucher` for an employee who has more than one account, clicking the subsidiary on the line, selecting the type Employee, then selecting the employee, did not show the accounts linked to them, as is the case in the old GUI
