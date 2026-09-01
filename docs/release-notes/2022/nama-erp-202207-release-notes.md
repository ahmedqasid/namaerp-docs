# Nama ERP Release Notes - July 2022

::: info Release Information
- **Release Date**: July 2022
- **Release Number**: Nama-ERP-202207
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the field "Date Affecting Sub-Item Status" to the term configs of Supply Chain documents.
- **Multiple Assembly Voucher - Details Lines:** Improved so that when there is a sub-method, and inside that sub-method a second-level sub-method, clicking the Expand Lines button orders the sub-methods on the lines from last to first (levels from the last method down to the first method).
- **Multiple Assembly Voucher - Details Lines:** Added the following fields:
  - Used only with the main item's versions.
  - Used only with the main item's colors.
  - Used only with the main item's sizes.

  These show the sizes, colors and versions belonging to the main item, and when a size, version or color is selected for the main item in the Assembly Voucher, only the items for which that size, version or color was selected are pulled in, along with the items whose columns were left empty.

- In the Warehouse Revaluation term config, the debit and credit labels were being misunderstood, so the accounting effects title was changed to (Adjustment Side, Inventory Side).
- **Multiple Assembly Voucher:** Added a button named "Change Line Status and Create Assembly Vouchers by Level". This button changes the line statuses to the status set in the document's term config and creates an Assembly Voucher for them.

### Sales

- Added the option "Cancel Reservation of the Higher Document Only When Using the Cancel Reservation Option in the Term Config" to the Supply Chain settings.

### Fixed Assets

- **Fixed Asset Opening:** Added the installments grid as well as the payment vouchers grid.
- **Fixed Asset Opening:** Added an option to the document's term config named "Calculate the Depreciation Start Date Based on the Difference Between the Useful Life and the Remaining Life", so that the depreciation start date is calculated as = Actual Date - (Useful Life - Remaining Life).

### Purchasing

- Added the option "Do Not Update Prices After Changing the Date" to the Purchase Invoice term config.
- Added the following changes to the Purchase Quotation document:
  - Added a list field "Delivery Method" containing the options (CIF / FOB / EX-Work).
  - Added the field "Estimated Percentage for Calculating Delivery Cost" in the document header, and the "Estimated Delivery Cost Value" field, calculated as (Net × Estimated Percentage for Calculating Delivery Cost).
- Added the following changes to the Purchase Price Comparison document:
  - Made the "Copied From" field on the line accept Purchase Quotations only.
  - Added the following fields to the line in the document details:
    - Delivery Method
    - Estimated Percentage for Calculating Delivery Cost
    - Estimated Delivery Cost Value
    - Total Unit Price
- Added the option "Copy Tax Registration and Commercial Registration Data in Purchasing on Save" to the Supply Chain settings.
- Added the following fields to Purchasing:
  - Vendor's Arabic Name
  - Vendor's English Name
  - Vendor's Tax Registration Number
  - Vendor's Commercial Registration Number

  Note that these are only added to the windows through screen editing.

- Used the Priority field in the Purchase Quotation Comparisons screen, so that when comparing and the quotations have the same price, the best item is chosen based on the best price and the vendor's priority.

### Sales

- Added the option "Cancel Reservation of the Higher Document Only When Using the Cancel Reservation Option in the Term Config" to the Supply Chain settings.
- Added the option "Copy Tax Registration and Commercial Registration Data in Sales on Save" to the Supply Chain settings.
- Added the following fields to Sales:
  - Customer's Arabic Name
  - Customer's English Name
  - Customer's Tax Registration Number
  - Customer's Commercial Registration Number

  Note that these are only added to the windows through screen editing.

- Improved so that the "Based On" field on the line (lines.originDoc) can be used to fill the payment vouchers table with invoices, in case there are no details in the invoices table.
- **Discount Coupon:** Added 5 attachment fields to the window.
- **Sales Return:** Added the option "Do Not Update Prices When There Is a Sales Voucher in Based On" to the document's term config.
- Added the option "Ignore Compliance with Price Lists for the Free Item" to the Sales Invoice term config.

### Banks

- Added the Subsidiary field to the following documents:
  - Letter of Guarantee Receipt
  - Letter of Guarantee Termination
  - Letter of Guarantee Delivery
  - Letter of Guarantee Issuance
  - Letter of Guarantee Amendment

### Accounting

- Added the ability to create a Payment Voucher based on more than one Payment Request, using the document field on the line.
- When tax fields are added to Receipt and Payment Vouchers, the total debit and credit fields do not include the tax values, so a difference appears to exist. This was improved so that the total debit and credit are calculated from the resulting journal entry, not just from the lines and document header.
- Added the option "Allow Endorsing Temporarily Rejected Incoming Cheques" to the Payment Order and Payment Voucher term config, to allow creating a Payment Voucher for a cheque whose status is temporarily rejected.
- Added the option "Allow Endorsing Permanently Rejected Incoming Cheques" to the Payment Order and Payment Voucher term config, to allow creating a Payment Voucher for a cheque whose status is permanently rejected.
- Added the option "Copy Tax Registration and Commercial Registration Data for Misc Invoices in Accounting on Save" to the Accounting settings.
- Added the option "Copy Tax Registration and Commercial Registration Data for Misc Invoices in Contracting on Save" to the Contracting settings.
- **Partner window:** Duplicated the bank data group 3 times, for use in entering different data specific to the partner.
- **Receipt Voucher - Payment Voucher:** In the Remarks field on the line, an entity flow (Groovy) was created that generates an automatic serial (Sutomatic Serial), consisting of (the subsidiary code on the line + a serial), with a different serial for each different subsidiary.
- **Account Distribution window:** Added the ability to distribute over each of:
  - Subsidiaries
  - Reference 3

### Contracting

- Improved so that when creating an Advance Payment Voucher and selecting the standard term, the value is calculated automatically from the "Planned Term Value" field (addition or deduction).
- Added the following fields to the Extract document:
  - The field "Total Actual Cost of All Extracts".
  - The field "Total Actual Cost of All Cost Documents".
  - The field "Difference Between Total Actual Cost of Extracts and Cost Documents".
- Added the section "Effects of the Difference Between Total Actual Cost of Extracts and Cost Documents". It contains the following two fields:
  - Debit of the Difference Between Total Actual Cost of Extracts and Cost Documents
  - Credit of the Difference Between Total Actual Cost of Extracts and Cost Documents

  None of these figures are calculated except with the Final Extract.

- **Contracting Terms Tables:** Added a list field on the terms lines in contracts named "Relation with Vouchers", containing the following options:
  - Requires an Advance Payment Voucher
  - Requires an Other Payments Voucher
  - Requires a Penalty Voucher
  - None
- **Subcontract:** When the source "Project Contract" is selected, the details are copied, but the field "Project Item Description" is not copied; when the project item number is selected manually, this field is copied.
- **Contracting Supplies Purchase Invoice and Misc Invoice:** Added the following fields:
  - Vendor's Arabic Name
  - Vendor's English Name
  - Vendor's Tax Registration Number
  - Vendor's Commercial Registration Number
  - Manual Document Number | manualRef1

  Note that these fields are hidden (Hidden).

- **Cost Execution document:** Added the "Total Cost" field to the document header, calculated as the sum of the total cost of the lines.
- Added a new document named (Project Contract Amendment), in which the user selects the project contract to keep the original data from the contract such as the items, terms, contract date, start date and end date; the user then selects the items or terms from (Items and Terms Before Amendment) to make the amendment to the contract, whether (edit - add - delete), and the (end date) can also be amended from the amendment document.

### Service Center

- Added the invoice effects to the Sub-Item Sales Order term config.

### Freight Management

- There is a system field named "Commodity" in the "Operation Order Delivery" document. This field was added to the "Bill of Lading" window, and the data is copied to it whether the "Based On" field is used or the system button in the "Operation Order Delivery document" screen.

### Customer Relationship Management (CRM)

- Added Sourcelineid to the Spare Parts and Services lines, copied from the ID of the Based On lines.
- Added the two options "Do Not Copy Details from Based On" and "Do Not Copy Document Header Data from Based On" to the term config of each of the following documents:
  - Maintenance Order
  - Maintenance Invoice
  - Maintenance Assay
  - Maintenance Invoice Return

### Human Resources

- Added the option "Allow Final Save If the Salary Record Is a Draft" to the Salary Voucher term config.
- Added a dedicated Disbursements grid to the Salary Item file and the Salary Item Type, so that an item can work in more than one disbursement.
- **Attendance file:** Added two fields to the details lines (AutoShifts) named (Check-out Time | From Time) and (Check-out Time | To Time), taking the check-out time into account when the check-out time is specified.
- **Official Holiday window:** Added a "Job Position" field 'JobPosition' to the header, like the Employee Department field, because some official holidays apply to a specific position.
- **Employee window:** Added a "Total Insurance" field (the sum of the employee's insurance value + the value of their family's insurance) to the Employee window.
- Added the following two fields to the Leave Type:
  - Weekly Rest Treatment (Balances)
  - Weekly Rest Treatment (Salaries)

### Customer Relationship Management (CRM)

- Added the "Social Media Subscription Settings" window, to provide a mechanism for connecting Facebook with Nama.

### Manufacturing

- Added 5 description fields (description) to the Production Order screen.
- **Production Order Closing document:** Added remarks on the line, and they are taken into account when generating the journal entry.
- **Multiple Assembly Voucher:** Added a new button named "Delete Generated Assembly Vouchers"; when clicked, the system deletes all the Assembly Vouchers generated from the Multiple Assembly Voucher that exist on the lines.
- Added the option "Do Not Update Journal Entries with Actual Values" to the Production Order Closing term config - the default is to update the journal entries, and if there is a case where the customer does not want the journal entries updated, they can use this option.
- **Actual Calculation Methods for Indirect Expenses:** Added the following improvements:
  - Added the following fields to the window header:
    - Indirect Cost.
    - The option "Indirect Cost Type Must Be Specified".
  - Added the following fields to the window details:
    - Chart of Accounts
    - Indirect Cost
  - Added a suggestion for the names of indirect costs in the Name field (in the window details), using the values found inside the indirect cost profiles (in the window header, and if not found there, in the lines) in the "Name" field.
  - Improved so that saving an Actual Calculation Methods for Indirect Expenses record is rejected if a line has a name that does not exist in the selected Indirect Costs file in the table.
  - In the details table, the chart of accounts is an alternative to the account (a value cannot be entered in both fields), and when searching for values, all accounts belonging to the tree are considered, directly or indirectly (indirectly meaning accounts that belong to another chart of accounts, but that chart belongs to the selected tree).
- **Actual Indirect Production Costs file:** In the "Actual Indirect Production Costs" table, added the following fields:
  - Account
  - Chart of Accounts
  - Dimensions
  - The indirect cost found in the details table, as a reference for the user to help in the review process.

  When distributing the figures in the table mentioned above, the indirect cost is taken into account when selected.

### Point of Sale

- Added a new file named "Add Register Quantity Update Settings" to the Point of Sale system.
- Made the following updates to the Held Invoices search table:
  - Added a column to the list screen named Sales Rep.
  - Added a mechanism to search within held invoices using the following fields:
    - Held Invoice Code
    - Customer (name or code)
    - Net
    - Sales Rep
- Added the groups (Files - Documents - Register - Settings) to the Point of Sale menu, and distributed the screens across each group.
- Added the option "Do Not Use Tables in the Mobile App" to the Point of Sale settings.
- Added the ability to prevent overdraft withdrawal in Point of Sale.

### Project Management

- **Project Invoices:** Added the following changes:
  - Added the Executions grid.
  - The "Consolidate Executions" button.

### Settings

- Developed a new method for calculating line numbers differently, to handle barcode activation.
- Improved so that the customer's number of users is shown along with the usage license when clicking the Nama logo, in addition to showing the number of legal entities and points of sale and the maintenance contract expiry date.
- **Approval Definition window:** Added "Employee Group" to the "Responsible Employee" field.
- Added the following windows to the Basics menu:
  - Subsidiary 1
  - Subsidiary 2
  - Subsidiary 3
  - Subsidiary 4
  - Subsidiary 5
- Created a new file named "Data Dump", through which user activity over a given period and previous versions over a given period can be cleared, in addition to deleting any records, whether documents or files. To prevent misuse of this mechanism, its use is restricted by the following two conditions:
  - The system only allows the admin user to perform any of these operations.
  - The login must be done through Alt F12 - through the CRM server
- In Forms (FormDoc1:10): Improved so that when Based On Form 1:10 is selected, all the fields in the header and lines are copied from the selected form.
- Added a new capability to system reports so that when printing documents or files in the system, the system spreads the pages of PDF attachments into separate pages in the report, so the attachment can be printed.
- **Document Cancel Document:** Added a new table to the voucher so more than one voucher can be selected in it for cancellation.
- Added the following two options to the lines of the Performance Optimization Settings file:
  - Apply the Ignore to Reading Records
  - Apply the Ignore to Using Records
- Added a list screen to the Basics menu to display all attachments in the system. To show this list screen, added the option "Create Attachments Data Table" to Global Config, to make it possible to view all attachments in the system. A "Regenerate UI" of the system must be performed to show this list screen.
- Added a new action named "Recalculate E Invoice JSON" to the More menu of the document for submission to the Tax Authority, to recalculate the json in the lines of the submission voucher to the Tax Authority.
- **Approvals System:** Added the following options to the approval definition line:
  - A note must be entered with the approval.
  - A note must be entered with the rejection.
  - A note must be entered with the return.
  - A note must be entered with the escalation to the direct manager.
  - A note must be entered with the return to the previous step.
- **Approvals System:** Added the following columns when displaying current approvals:
  - Responsible for Last Step
  - Decision of Last Step
  - Arabic Name of Last Step
  - English Name of Last Step
  - Note of Last Step
  - Approval Date of Last Step
  - Whether the Last Step Was Escalated
  - Last Step Escalated From
  - Reason for Approval of Last Step

### Mobile Applications

- **Consolidated Transaction document:** When clicking the "Consolidate Invoices by Selected Time and Date" button, the system inserted the invoices without inserting the dimensions. Improved so that the button also inserts the dimensions.

## Fixes

### Inventory

- **Assembly Voucher and Assembly Request:** Fixed an issue where editing the dimensions updated the quantity and updated the quantities on the pulled items' lines.
- Fixed an issue where, despite the option "Check Overdraft by Date" being enabled, the system allowed editing the supply date even if that edit caused an overdraft withdrawal in an issue document dated later than the supply voucher.

### Purchasing

- Fixed an issue where, when using the vendor's last purchase price and saving the Purchase Invoice, then returning to the invoice and changing the date, the system changed the prices in the invoice.

### Service Center

- Fixed an issue where, when selecting the debit and credit in the invoice effect in the Booking Form (Sub-Item Sales Order) term config, the system deleted the debit and credit on save, as well as the "Summarize Journal Entries" option.
- Fixed an issue where creating a system Inventory Supply based on a Vehicle Sales Return did not show the debit and credit amount in the system journal entry, and no unit cost appeared in the receiving costs journal entry.

### Hospital Management System

- Fixed an issue where an error occurred when trying to save the Surgical Operation Invoice, when supplies were added to the invoice while the option "Do Not Add Supplies to the Invoice" in the term config was not enabled.

### Accounting

- Fixed an issue where, in some cases, an error appeared when saving the Payment Voucher.
- Fixed an issue in **Payment Vouchers** where the Tax Value field did not round fractions according to the currency's fraction.

### Human Resources

- Fixed an issue where the message "Repeating the Payment Date Is Not Allowed" appeared when performing "Recommit" on the Advance Voucher, in the case where there was an exempted installment and an unpaid installment on the same date.
- Fixed an issue where, in some cases, creating an Advance Exemption Voucher did not change the installment status to exempted, did not affect the Exempted Installments field, and did not change the installment values when part of the installment was exempted.
- Fixed an issue in **calculating employee leave balances** where, if the employee had a balance from a previous year and had not taken any leave in the current year, the balance was calculated incorrectly.
- Fixed an issue where employee leave balances were incorrect in some cases, such as when there was a Leave Voucher for an employee extending into the following year, and also when there was an earlier Leave Voucher.
- Fixed an issue where, in some cases, an error appeared when saving a Consolidated Advance Voucher or an Advance Voucher.
- Fixed an issue where, when the option "Create Accounting Effect" was enabled in the Salary Record and salaries were issued and saved as final, the system did not generate a journal entry for all employees, but only generated the entry for the first employee or two, requiring the document to be saved again to generate the entry correctly.
- Fixed an issue where calculating the leave balance for an employee whose service had been terminated added one extra day to the length of service.
- Fixed an issue in the **Leave Allowance Payment Voucher** where, after setting the employee and selecting the leave type, the system showed the remaining leave balance, but when the allowance value was entered, the system did not calculate the total allowance by multiplying the number of days by the entered value.
  To work correctly, use the "Leave Duration" field, and do not use the "Allowance Days" field.

### Settings

- Fixed an issue where fields could not be translated in Boards. For example, the "Employee Status" field.
- Fixed an issue where, in some cases, the document code did not appear in the run log when rerunning a report with the same inputs.
- Fixed an issue where, when defining a composite dimension containing several branches and granting a user the dimension (Branch) as a composite dimension, the following errors occurred:
  - When searching in all reports, the Branch field showed the branches that fall under the composite branch as well as (all branches defined as a composite dimension), whereas the correct behavior is not to show composite dimensions not granted to the user as a permission.
  - In reports, when choosing to leave the branch empty, filtering was not applied on the sub-dimensions of the composite dimension; instead the composite dimension was ignored entirely and the report ran on all branches.
- Fixed an issue where the system did not send an email when it contained an attached image in the form data:image.

### Manufacturing

- Fixed an issue where the system did not account for calculating the cost in the smaller unit when delivering by-products.

### Contracting

- Fixed an issue where the system did not allow saving a Subcontract if the "Item Description" field contained more than 255 characters.

### Point of Sale

- Fixed an issue where a credit return could not be saved even if the invoice was from the same register, but it was saved when paying in cash or by another payment method, despite the option "Allow Returns or Exchanges for Invoices from the Nama Server" being checked.

### Mobile Applications

- Fixed an issue where the system did not update customers in the Collection Vouchers app, as it only sent new customers.
- Fixed an issue where the Tourism Service app in Point of Sale "Nama pos captain order" did not support reading the scale's barcode.

### Reports

- Fixed an issue where the Employee Leaves report - Allocated, Consumed and Remaining - did not work correctly.
