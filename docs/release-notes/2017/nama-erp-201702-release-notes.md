# Nama ERP Release Notes - February 2017

::: info Release Information
**Release Date:** February 2017  
**Release Number:** 201702
:::

## Additions

### Inventory
- Added the fields (Order, Volume, Area, Density) to the Item file.
- Added 5 references to the Item (`ref6`, `ref7`, `ref8`, `ref9`, `ref10`).
- Added the ability to modify item data from within the Receipt voucher or the Sales Invoice, as well as the ability to modify the customer, for example, from the Sales Invoice, via the entity flow `EAFieldValuesCalculator`.
- Added attachments to the Brand file for use as logos.
- Added the option **"Consider Delivered Quantities in Based-On"** to the Inventory Receipt document term config.
- Added the **"Item Addition Request"** document.

### Purchasing
- Created an entity flow that copies the item as many times as the quantity in the Purchase Order.

### Sales
- Added **"From Lot Code, To Lot Code"** to Price Lists.
- **Quotations:** added a new choice to the discount type: **Fixed Percentage**, so there are now three discount types: (Compound Percentage - Fixed Percentage - Value).
- Added the ability to apply price lists to a group of invoices.
- Improved the Sales Price List so that the **"Inventory Opening Voucher"** is among the documents available in the **"Source"** field of the **Sales Price List** file.
- Added the option **"Close Invoice Debt"** to the Return term config; it works with "based on" only when it is a Sales Invoice.

### Real Estate
- Added (Four-Monthly, Two Years, Three Years, Five Years) to the Rent Types.
- When creating a Receipt Voucher based on a Rent Contract or an Opening Rent Contract, improved so that the system copies the Lessor from the Contract screen to the related subsidiary in the Receipt Voucher.
- **Project screen:** added 5 more attachments.

### Accounting
- Developed a new **Exchange Rate Change** document.
- **Disbursement Request:** added the Purpose field to the document header; on save, the system copies the Purpose to lines that have no data.
- In the Account window, for the option **"System Account"**, added another option in Settings to exclude the opening period from this option.

### Customer Relationship Management (CRM)
- Added **(Awaiting Customer Reply)** to the record status field inside the Support Request.
- When creating a Visit Request document or a Visit document linked to a specific project, added a reference to the line number in the preparation and training plan, letting the user select the line number related to the visit.

### Human Resources
- **Leave Adjustment Voucher:** moved the work start date to the "Return to Work Date After Last Annual Leave" field in the Employee file. If there is no later Return-to-Work voucher, it takes the work start date from the Balance Adjustment voucher.
- Added the ability to deduct three days from the employee for a day's absence when it precedes or follows an official holiday, only when the holiday falls at the start or end of the week, not on any ordinary day.
- Added the following two entity flows:
  - `EASalaryNormalizeAdditions`
  - `EASalaryNormalizeDeductions`

### Point of Sale
- Enlarged the icons for Delete and Duplicate.
- Rearranged the data on the Multiple Payment screen.
- Developed a mechanism to organize opening and closing the cash drawer.
- Showed the suspend time on the Suspended Invoices screen.
- Added the ability to delete the table from the Suspended Invoices screen.
- Added the **Item images caching** feature.
- When opening an old invoice, improved so the invoice's date and time are shown instead of the current date.
- Improved so that when choosing not to add the discount and tax fields, the system does not calculate discounts and taxes for items, if any.
- Added the option **"All Permissions"** to POS permissions.
- Showed a warning message in both cases (cancelling an invoice before saving, deleting a suspended invoice).
- Added an option to POS settings to show the second serial number.
- Made Credit Note transfers instant.
- Modified the alert shown for the error that occurs when creating a Sales Invoice and entering a Credit Note value greater than its balance.
- When entering a discount receipt number, its value is now copied automatically.
- Added a way to display data-transfer errors.
- Added the option **"Ability to search by part of the invoice code in Returns and Exchanges"** to POS permissions.

### Letters of Credit
- Added new methods for expense items so that expenses can be allocated based on (Volume, Area, Length, Density).
- Added Volume, Area, Length, and Density fields to the Proforma Invoice, and added the same fields to the Item.

## Settings

- When an Approval Request is sent from a branch, the document is approved by the head office. Improved so that when an error occurs in the document while saving at the branch, a message is sent to the head office (the approver) that the approval failed, along with the reason.
- Added 10 attachments to the Detailed Note screen.
- Added an attachment to the header of the Detailed Note file.
- Added a choice to reject changing an account's balance from debit to credit or vice versa. For example, not allowing the Treasury account balance to go negative.
- Modified the entity flow `EAFieldValueCalculator` to allow specifying the inputs in any one of the five input fields, or in all of them (so it is not necessary to enter the fields across several lines in some simple cases).
- **Global Config:** added the ability to add contact information (`Contacts`), and also removed Meeting Notes since it was duplicated twice.
- When creating a filter on the Revision for an item report, the system does not display the revisions automatically; they must be entered manually.
- Added the ability to suggest values in report dimensions.
- When creating a report, making a parameter required, and running the report without selecting the parameter, the error message was (values must be entered) without specifying which values were required. Improved the error message to state the name of the required parameter.
- Improved the system so `javascript` can be added to the Dashboard (`HTML`).
- Added a new field to Reports that stores the report's content, so previous versions can be retrieved, and the content of the field can be copied into the report file. This applies to the main report (in the file header) and to sub-reports.
- Added the option **"Inactive"** to the **Criteria Based Validation** window.
- **List Update:** added field filtering to the added/modified links lines, such as: Criteria and the Default Values Template.
- Developed the `Ctrl + Alt + Insert` shortcut to duplicate the current line in grids a number of times.

## Fixes

### Inventory
- Fixed an issue where, in some cases, an error occurred when viewing the Items file and creating a filter to select a group of items with a certain condition, while choosing "Show All" in the display list.

### Sales
- Fixed an issue where an error sometimes occurred when searching the Unit field in the Sales Invoice.
- Fixed an issue where creating a Sales Invoice based on a Sales Order that has a shipping address did not copy the shipping address data from the Sales Order to the invoice.
- Fixed an issue where, in some cases, applying a discount of 2 dinars to an invoice caused the discount value to automatically change to 1.999 on save.
- Fixed an issue where the Stock Transfer voucher's lines were not affected when the warehouse was changed in the document header.
- Fixed an issue where creating a Sales Return based on a Sales Invoice did not affect that invoice's aging, but instead settled the full return value against the oldest invoice.

### Accounting
- **Accounting Settings:** the title **"Serial Number Setup"** is wrong; it should be **"Serial Number Settings for System Journal Entries"**.
- Fixed an issue where, in the **Consolidated Disbursement Request**, the filter by record creator did not work correctly.
- Fixed an issue where creating a Receipt Voucher without entering line data, then selecting the related subsidiary, made it impossible to consolidate invoices.
- Fixed an issue where, in some cases, creating a Receipt Voucher for a Financial Paper did not change the paper's status.
- Fixed an issue where, with the option **"Create Financial Paper from Disbursement Voucher"** enabled in Accounting settings, creating the Financial Paper from the Disbursement Voucher did not copy the cheque number and the paper code into the details.
- Fixed an issue where, on the Receipt Order screen, filtering by Financial Papers worked incorrectly.
- Fixed an issue where creating a Disbursement Voucher based on a Payroll Record did not retrieve the Payroll Record's details into the Disbursement Voucher.

### Banks
- Fixed an issue where, in the **Letter of Guarantee Request** document, selecting the bank account did not fill in the bank automatically, unlike the other bank documents.
- **Letter of Guarantee Issuance** document: added the following changes:
  - Removed the Fees field, and created an accounting term config for the issuance fees
  - Made the (Letter of Guarantee) group `Disable`d for editing
- **Letter of Guarantee Amendment** document: added the following changes:
  - Retranslated the Amendment Fees field to become the Fees (created in the Letter of Guarantee Request)
  - The issuance fees found in the Letter of Guarantee Issuance document are not copied to the issuance-fees field in the Letter details group of the Amendment document
  - Amendment fees: the value does not affect the percentage, and the percentage does not affect the value
  - Amendment fees have an accounting effect defined, but it has no actual effect
  - When making more than one amendment document, the Total Amendment Expenses field does not sum the total amendment expenses
- Fixed an issue where an error occurred in the Bank Reconciliation Memo when selecting the previous reconciliation.
- Fixed an issue where creating a Bank Notice based on a Disbursement Voucher did not copy the bank account number details from the Disbursement Voucher.
- The term config for the Letter of Guarantee Amendment document contains the following translation errors:
  - "Previous Coverage Debit", correct is: "Coverage Debit"
  - "Previous Coverage Credit", correct is: "Coverage Credit"
  - "Coverage Debit", correct is: "Previous Coverage Debit"
  - "Coverage Credit", correct is: "Previous Coverage Credit"
- Fixed an issue where, in some cases, an error appeared when trying to edit the Bank Transfer voucher.

### Settings
- **Distribution Management Settings:** the field title **"Ignore Current Average Quantity for Uncosted Receipts"** is wrong; it should be **"Ignore Current Average Cost for Uncosted Receipts"**.
- Fixed an issue where, with archival documents set to be stored outside the database, deleting an archival document left it still present on the server's disk and it was not deleted.
- Fixed an issue where, in some cases, editing a screen and choosing effect type "Copy" did not work.
- Fixed an issue where an error sometimes occurred when applying the auto-coding format settings found in Global Config - Separator Settings, on the `InvItemOpiningRequest` screen.
- Fixed an issue where creating a user with a code only, then logging into the database, allowed logging in with the code only, without entering the password.
- Fixed an issue where choosing the Display Mask `##.###,###` for a field containing an amount showed an error message, requiring clicking anywhere on the screen and saving again before it could be saved.
- Fixed an issue where received cheques appeared in both the Receipt Order and the Receipt Voucher.
- Fixed an issue where, in some cases, there was a difference between the invoice value and the system journal entry linked to the invoice when the fraction was less than (0.005).
- Fixed an issue where adding a reversed criterion to an entity flow prevented the flow from running when the criterion was met (the opposite of the existing criterion).
- **Fields & Screens Settings:** the `Descriptors` page contains the file's Dimensions, even though they already exist on the main window.
- Fixed an issue where the **"Payment Methods"** window allowed editing both the **"Fee Percentage"** and **"Fixed Fee Value"** fields on the same line.
- Fixed an issue where searching by additional criteria did not work unless the Search button was clicked.

### Human Resources
- Fixed an issue where an error occurred when trying to issue a Loan voucher when dividing (loan value / number of instalments) did not produce a whole number.
- Fixed an issue where the system treated an official-holiday day as a weekly day off, which was incorrect.

### Point of Sale
- Fixed an issue on the Suspended Invoices screen, whose severity varied from one device to another.
- Fixed an issue where there was a conflict in Price Lists between priority and invoice classification.
- Fixed an issue where pressing (`Esc`) did not close either of the two windows (Sales Price Inquiry, Suspended Invoices).
- Fixed an issue where, in some cases, the system did not display item images.
- Fixed an issue where, with settings set to consolidate invoices in the same shift, the system also consolidated invoices that were transferred individually.
- Fixed an issue where transferring a single invoice while the shift was open did not show a message indicating whether the invoice had been transferred or not.
- Fixed an issue where the system sometimes retrieved prices in the wrong `Format`.
- Fixed an issue where, with settings set to consolidate invoices in the same shift, the system did not total the invoice values correctly, showing only the total of the first invoice.
- Fixed an issue where entering the short number in POS returns was not accepted (e.g., 15 instead of 1100015).
- Fixed an issue where creating price lists for an employee caused an error when opening the item record.
- Fixed an issue where the system did not consolidate invoices by salesperson.
- Fixed an issue where, with settings set to consolidate invoices in the same shift, the system did not apply discounts correctly.
- Fixed an issue where exiting the POS using the **"Exit"** icon showed a warning that the data would not be saved even when the invoice contained no items.
- Fixed an issue where opening an old invoice, editing the note, then using the **"Cancel"** button emptied the invoice's contents.
- Fixed an issue where an error sometimes occurred when retrieving a suspended invoice.
- Fixed an issue where opening the Help window multiple times reduced the screen width each time.
- The title **"Show Free Items in a Single Line"** is wrong; it should be **"Show Favorite Items in a Single Line"**.
- Fixed an issue where the system did not close the Help screen after pressing **"Esc"**.
- Fixed an issue where exporting reports to Excel prevented creating any formulas on them because they were exported as text.

### Contracting
- **Contracting Settings window:** the option title **"Allow Exceeding Stage Price Percentages of 100%"** is wrong; it should be **"Allow Exceeding Stage Completion Percentages of 100%"**.
- Fixed an issue where the **"Group"** field was duplicated in the Project window.

### Manufacturing
- Fixed an issue where the **Planning** document allowed editing in the Analysis window, even though these fields should be view-only.
- Fixed an issue where entering a start date/time of 31/01/2017 16:00 and an end date/time of 01/02/2017 10:50 in the Execution Voucher's lines showed the error message **"from time can't be after time"**.

### Real Estate
- Fixed an issue where terminating a Rent Contract of type (Early) was not accepted on save.
- **Rent Contracts:** fixed an issue where selecting more than one line and clicking (Create Collection Voucher for Selected Instalments) did not sum the selected instalments' value in the Total field of the Collection voucher, but instead put only a single instalment's value.

### Fixed Assets
- Fixed an issue where the new group `Custody of assets` had no corresponding Arabic translation.
- Fixed an issue where, in some cases, the system did not update the last depreciation based on the last Depreciation voucher.

### Reports
- Fixed an issue where an error sometimes occurred when adding a new report.

### General Fixes
- Fixed an issue where creating a transaction on Company 1 / Branch 1, where Branch 2's legal entity is a composite one that contains Company 1, the system rejected saving.
