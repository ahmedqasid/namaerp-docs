# Nama ERP Release Notes - June 2022

::: info Release Information
- **Release Date**: June 2022
- **Release Number**: Nama-ERP-202206
:::

## Additions

### Inventory

- Added the following changes to the Multiple Assembly Voucher:
  - Added a grid named Main Items.
  - Added a grid named Final Raw Materials. To show this grid, the new option "Show Final Raw Materials Table" must be checked in the Supply Chain settings.
  - Added a button named Expand Main Lines, which expands all the sub and main methods inside the details grid.
- Added the field "Copy the Warehouse to the Sub-Item" in the Stock Documents term configs.
- Added a mechanism that allows filtering the items in the Sales Invoice and the Purchase Invoice to only the items that have a balance in the warehouse selected in the header.
- Added a field named "Quantity Deducted from Production" on the line in the Multiple Assembly Voucher.
- Added an option named "Main Item" in the details grid in the Multiple Assembly Voucher, so that when the Main Item comes down from the Main Items grid into the details grid, the field is checked.
- **Item Color window:** Added Item Classification 6 through Item Classification 10, in addition to (Item Classification 1 through 5 only).
- **Stock Issue Voucher:** Improved so that when a Maintenance Order is selected in "Based On", the data is expanded in the Issue Voucher.

### Hospital Management System

- Added the following fields to the Costs list and to the Surgery Invoice's lines:
  - Operation Opening Costs | Overtime Cost Value
  - Surgeon Fee Costs | Overtime Cost Value
  - Assistant Surgeon Costs | Overtime Cost Value
  - Anesthesia Fee Costs | Overtime Cost Value
  - Other Costs | Overtime Cost Value
  - Subsidiary Cost | Overtime Cost Value
- A term config was made for the Stock Transfer Request document, and the option "Copy the Details" was not checked; however, when a Stock Transfer Request is made based on a Maintenance Order, the system copies the details.

### Fixed Assets

- Added the option "Create the Assets If They Do Not Exist" to the Preliminary Approval Invoice's term config.

### Purchasing

- Added the following options to the Supply Chain settings:
  - Insert N1 in the Purchasing lines from the price list when the item code is selected.
  - Insert N2 in the Purchasing lines from the price list when the item code is selected.
  - Insert N3 in the Purchasing lines from the price list when the item code is selected.
- Improved the Purchase Quotation so that when the "Guess Items" button is clicked, the system shows the items that do not match the vendor's sheet first, then shows the matching items below them.

### Sales

- **Sales Invoice:** The customer's remaining points and amounts are now shown when using the "Request Redeem Customer Amount" button.
- **Sales Price List:** Added the "Maximum Quantity" field in the list's details.
- **Offers file:** Added a field in the Discount Coupons lines on the invoice named "Applies To".
- Added a field in the Rewards settings named "Points Due After (Days)".
- In the Sales Invoice, when using the option "Copy the Remaining Amount to Cash Paid", saving is now prevented if the Cash Paid field does not equal 0.
- Added the option "do-not-delete-stock-docs-with-non-system-book" to the nama.properties file.
- **Invoice Receipt document:** Improved so that the Sales Return is created from the difference present in the Mismatched Quantities grid, not the difference present in the details.

### Accounting

- Added the option "Invoice Return" to each of the following documents:
  - Misc Invoice
  - Misc Order
  - Misc Request
- Added 5 attachments to the Purchase Item screen.
- When using the option "Prevent Transactions with the General Branch" on the account and then making a Closing Entry, the system refused to save. Saving is now allowed.

### Real Estate

- Added the option "Do Not Calculate the Unit Price from the Unit and Garden Area" in the Real Estate settings, to do what is needed.

### Service Center

- **Rental Asset Reservation Request window:** Added an accounting effect to the document's term config.
- Made an entity flow named "Delete Machines with the Purchase Invoice Return (Maintenance)".
- Work Order window - Details page: Added the following fields:
  - Customer Percentage in Operations and Customer Percentage in Spare Parts.
  - Insurance Percentage in Operations and Insurance Percentage in Spare Parts.
  - Warranty Percentage in Operations and Warranty Percentage in Spare Parts.
  - Company Percentage in Operations and Company Percentage in Spare Parts.

  When a percentage is entered, the percentage and value on the lines are adjusted based on the entered percentage.

### Contracting

- **Contracting Quotation window:** Added the following fields:
  - A Contract Template field in the window's header.
  - The Analytical Card field in the window's details.
- **Contracting Supplies Invoice:** Added 3 text fields to the document's details "details.text", in addition to the two already existing, bringing the total to 5 fields.
- **Misc Invoice:** Improved so that when the contract is selected in the lines, the system suggests the item codes and the description, just as happens when the contract is selected in the header.
- Added the option "Do Not Copy the Data in the Analytical Card If Based On a Contracting Quotation" to the Contracting settings window.

### Project Management

- **Task Type window:** Added the "Phase" field.
- Added a new window named "Phase Extension Reason Type".
- Added a new window named "Phase Extension Reason".
- Added the document "Project Phase".
- Added the document "Project Phase Extension".
- **Project Phase document:** Added the status "Preliminary" to the "Project Status" list.

### Customer Relationship Management (CRM)

- Added documents that work in the same way as the maintenance screens but are based on the service, namely the documents (Maintenance Service, Maintenance Service Contract, Maintenance Service Plan, Maintenance Service Order, Maintenance Service Order Execution, Maintenance Service Report, Maintenance Service Invoice, Maintenance Service Invoice Return).
- **Service Contract document:** Added fields for dates and time.
- In the Maintenance Invoice term config, added an option named "Copy the Remaining Amount to Cash Paid" that allows moving the remaining amount from the invoice to the cash paid.
- **Visit document:** Added a new page named "Notes" in the Visit document, containing:
  - Customer Notes
  - Technician Notes
  - Supervisor Notes
- In addition to some fields that can be shown through Edit Screen:
  - 10 description fields
  - 10 number fields
  - 10 reference fields
  - 10 boolean fields
  - 10 date fields
- Improved the Maintenance Return so that it can be issued based on a "Maintenance Invoice"; when the invoice number is selected, the invoice's data is copied to the return document.
- **Maintenance Order, Maintenance Invoice:** Added new fields in the Faults lines, namely (Old Warranty Period Type, Old Warranty Start Date, Old Warranty End Date, Remaining Days in the Old Warranty, New Warranty Period Type, New Warranty Start Date, New Warranty End Date).
- **Maintenance Order - Maintenance Invoice:** Added the option "Update the Faults Table in the Machine" to the Maintenance Order and Maintenance Invoice term config.
- **Machine document:** Added new lines named Fault Warranties, containing the fields (Fault, Document, Document Date, Warranty Period Type, Warranty Start Date, Warranty End Date, Number of Warranty Days).
- **Vehicle Procedure document:** Increased the number of attachments to 5 attachments.

### Human Resources

- **Employee file:** Added the "IBAN Number" field.
- **Update Employee Data document:** Added the two fields "Identifier" and "IBAN Number".
- **Job Offer document:** Added each of the following fields:
  - IBAN Number
  - Bank Identifier
  - Bank Account
- **Evaluation Element:** Added 5 remarks fields, to be BigText fields and not shown on the screen.
- **Bulk Advance Rescheduling:** Changed the error message (There are no installments to postpone in this period) to become (There are no installments to postpone in this period for Advance voucher number .....).
- Added a new document named "Bulk Leave Allowance Payment".
- Added a field in the Leave Allowance Payment voucher's term config for the equation that calculates the allowance value per day, named "Allowance Value Calculation Equation".

### Manufacturing

- **Indirect Costs window:** Added the option "Value per Work Hour (from the Execution Voucher)" in the Type field in the details grid, so that when a value is selected for this type, the system multiplies the value by the number of hours present in the Production Execution, and the cost is calculated based on that. Example: when a value of "5" is set in the Indirect Costs, and the number of work hours present in the Production Execution is "3 hours", the total cost equals 15.
- Improved so that when a system Stock Receipt is issued based on a Product Delivery, the system calculates the by-product's cost in the system journal entry, as a percentage of the finished product, where the by-product's cost percentage is the percentage present in the Production Order for the Product Delivery.
- Added the option "Do Not Affect the Production Order's Quantities" to the Sample Withdrawal document's term config.
- **Production Order - By-Products page:** Added a "Cost Type" list to the By-Products lines, containing the two options (Fixed Cost, Cost Percentage) and the "Fixed Cost per Unit" field.
- Added the option "Allow Making an Invoice Document Based On an Expired Quotation" to the Sales Invoice's term config.
- Changed the finished product delivery so that it allows delivering the finished product in one warehouse and the by-product in another warehouse.

### Point of Sale

- Created a new file named "Minimum Order Settings in Point of Sale".
- In both the "Point of Sale Settings" window and the Machine window, added the following fields:
  - "Minimum Order Settings in Point of Sale".
  - "Minimum Order Is Calculated From".
  - "Minimum Order Item".

  So that the Machine's priority for applying these fields' data is higher than the priority of these fields' data in the "Point of Sale Settings" window.

- Added the ability to make a cash disbursement to refund the order reservation amount in case the customer does not show up on the reservation day.
- Added a new document named "Cancel POS Order Reservation". It holds the same data as the POS Order Reservation document, with the addition of a field in the header named Order Reservation, from which the reserved orders are selected, and a field in the header named Deducted Amount Percentage and Deducted Amount Value. When the amount is refunded to the customer with a POS Expense Voucher, the Cancel Reservation voucher is selected, and the amount present in the Cancel Order Reservation voucher is inserted.
- **Machine Settings and Point of Sale Settings:** Added the type "POS Order Reservation document" to the POS Documents Coding grid.
- Added a new option in the Report Definition screen named "Order Preparation Print Form in Point of Sale", where the forms that have this option are ignored when printing.
- Also added 3 dropdown lists (Combobox) in both the Point of Sale Settings file and the Machine file, named "Print the Order Preparation Form with Payment", "Print the Order Preparation Form with Suspending the Order", "Print the Order Preparation Form with Deferring Payment", each containing Yes and No.
- Based on these previous settings, all the invoice's forms in which the option "Order Preparation Print Form in Point of Sale" is checked are printed.
- Reformatted the size of the header fields in the Order Reservation voucher screen, in terms of area.
- Improved so that when the issue method "Raw Material Issued" is selected on the line, the system sets the item's selling price to zero.
- Added the option "Do Not Group Sales Lines" in the settings.
- Added the option "Prevent Saving the Shift Voucher with the F2 Shortcut" in the Point of Sale settings.
- **Point of Sale Interface Settings:** Added the field (Reservation From Time - To Time) to the Home Page fields.
- Added the option "Use Merged Tables by Default" in the Point of Sale settings.

### Fixed Assets

- Improved the Asset Disposal document so that saving is allowed even if the disposal value is zero.

### Settings

- **Edit Screen window:** Added the option "For Quick Creator View".
- Added the field "The Field Where the Value Will Be Placed" to the table "Fields That Open Creation When a Non-Existent Code Is Entered" in the Fields & Screens Settings file.
- **Tax Authority Settings window - Settings grid:** Added the following fields:
  - From Date
  - To Date
  - Apply When
  - Do Not Apply When
  - Apply When Matching the Query
  - Prevent Applying When Matching the Query
- Developed the entity flow EADeleteFromQuery, which can be used in a Scheduled Task to delete records.
- **Permissions file:** Added the "Element Code" field in the Prevent or Allow Appearance Through the Menu grid.
- Added a new file specific to e-invoicing, "E Invoice Notification Receiver".
- Added new fields to the Tax Authority Settings file: (Intermediary Server Client ID - Intermediary Server Client Secret - Intermediary Server URL - API Key - Receiver Mode)
- Improved so that when consolidating invoices to send them to the Tax Authority, each company's invoices are consolidated separately.
- **Invoice Receipt document:** Added the option "Save Despite Missing Items from the Invoice", which allows saving when there are items in the Mismatched Items grid.
- **Tax Authority Settings window:** Added a new field named "Item Code Template". To use the template, select the value "From the Item Code Template" from the field "Calculate the Item's Tax Code From".
- Created a new document named Movement Voucher.
- Added a new settings file named "Options Search Module".
- Added 5 new document forms, bringing the total number of forms to 10, from Form 1 through Form 10.

### Project Management

- **Task Execution document:** Added the option "Take the Recorded Time into Account Upon Saving" to the document's term config.
- Added the "Recorded Time" field to the Task lines.
- **Project Invoice:** Added the "Calculated Value Aggregation Method" field to the invoice's term config.
- Added the option "Take the Actual Date into Account When Consolidating Invoices".
- **Project Sales Quotation window:** Added the following:
  - Added the Payments grid.
  - Added the "Payment Template" field.
  - Added the Notes grid.
  - Added the discount fields (Discount - Net - Currency).
- Added the Alternative Code field to each of the following windows:
  - Detailed Remark
  - Meeting Remark
  - Remarks
- **Remarks:** Added Form 3, 4, 5, exactly like Form 1, 2 that already exist.

### Customer Relationship Management (CRM)

- Added a new grid named "Additional Spare Parts" to each of the following two documents:
  - Maintenance Order document.
  - Maintenance Assay document.
- **Maintenance Visit document:** Added the following fields:
  - A Maintenance Report field.
  - An option named "Product Withdrawal Request".
  - An option named "Immediate Product Withdrawal Request".
  - An options list named "Product Withdrawal Request Type" containing the options (Return, Exchange, Maintenance).
  - A "Product Withdrawal Request Notes" field.

### Mobile Applications

- Added a new consolidated app "Nama Mobile" that includes most of Nama's mobile apps, such as the E-Signature app, issuing and printing Receipt Vouchers and Sales Orders, and more.
- Added an Advance Voucher screen in the Nama consolidated app, in the Payroll module.
- Added a Delivery Voucher to the mobile app.
- Added two fields named "Device Type" and "device Fingerprint", so that when making an Electronic Attendance voucher from the mobile app, information about the device type it was recorded with is sent.
- Added a new field in the "Edit Screen" window, in the Actions lines, named "GUI Post Actions", and also added a new field in the GUI Post Actions screen named "Perform Action As Field". To activate this feature, the "Manual" option must be checked in the "GUI Post Actions" window.

### Reports

- Uploaded the report SYSR-RA001 for Rental Assets as a system report in the Service Center reports.
- Added the report "SYSR-SLS035" to show the total quantities and values of sales and returns — horizontal and vertical aggregation.

## Fixes

### Inventory

- Fixed an issue where an error occurred when deleting one of the Multiple Assembly Voucher's records, showing the message "There are no quantities of the item".
- Fixed an issue where, in some cases, the system did not cost the Stock Receipt voucher even though there was a link to the cost source on the Approval.
- Fixed an issue where, when using Dimensions and navigating between the existing fields using either the "enter" or "Tab" key, the cursor did not move to the next field.

### Purchasing

- **Sales Return document:** Improved so that when the serial number field is opened via the lens or via the F4 key, the system now opens with Select All.
- **Purchase Quotation window:** Fixed an issue where, when clicking the "Guess Prices" button, the system did not show some of the items present in the vendor's Excel sheet attached to the document.
- **Purchase Return document:** Improved so that when the serial number field is opened via the lens or via the F4 key, the system now opens with Select All.
- Fixed an issue where, when defining a Contact and linking it to a vendor, this contact did not appear in that vendor's window, on the Contacts page.

### Sales

- **Offers - Free Items on Items:** Fixed an issue where, when a percentage discount off the price was selected instead of free, saving the invoice showed the message "Invalid item discount".
- Fixed an issue where, in some cases, an error appeared when saving a Sales Invoice.
- **Sales Invoice:** Fixed an issue where the error "The operation cannot be performed" appeared when clicking the Code field in the details grid.
- Fixed an issue where, when editing a Sales Invoice, the system deleted the Issue voucher created from the invoice's Loading voucher.

### Accounting

- Fixed an issue where, in some cases, the system issued the system journal entry for the Stock Revaluation voucher with incorrect values.
- **Disbursement Voucher:** Fixed an issue where, when the Disbursement Voucher's value differed from the value present in the approved Disbursement Request, an error appeared that the document was unbalanced. Editing the Disbursement Voucher is now allowed as long as it is a value lower than the Disbursement Voucher's value, but the system still rejects it if the edited Disbursement Voucher's value is greater than the Disbursement Request voucher's value.

### Contracting

- **Subcontractor Contract:** Fixed an issue where, when the source "Project Contract" was selected, the project's items were copied with their full details except for the Project Contract's item code, even though the option "Do Not Copy the Data in the Subcontractor Contract When Selecting the Source" in the Contracting settings was not activated.
- **Subcontractor Extract:** Fixed an issue where, when calculating the Works Retention, the system calculated it with a wrong number, even though the option "Consider Discount 1 Values from Previous Extracts" was selected.
- Fixed an issue where, when working based on Contracting Quotations in the Analytical Card, the system showed only the item code and the standard item, without showing the item description.
- Fixed an issue where, in some cases, an error appeared when saving the Subcontractor Extract screen.
- Fixed an issue where, when creating a Subcontractor Contract, then selecting a Project Contract in the file header, then a sub Project Item code on the line, the system did not allow entering data in the tax fields, even though the standard item fetched from the Project Contract was a sub item, not a main item.

### Human Resources

- **Bulk Advance Voucher:** Fixed an issue where, when editing a Bulk Advance Voucher, the created Advance voucher was not edited correctly.
- **Bulk Advance Rescheduling:** Fixed an issue where, when rescheduling the Advance for a second time, the system did not account for the installments based on the Advance voucher (i.e., after the postponed or rescheduled installments).
- Fixed an issue where, in some cases, when making a Payroll Record for employees and issuing the Salary Vouchers, the deductions value in the Payroll Record was wrong and different from the Salary Voucher, and when the Salary Voucher was re-saved, the value in the Payroll Record was corrected.
- Fixed an issue where, when making a Leave Voucher for the Annual type, and the Casual Leave balance was negative, the system objected to the Casual Leave balance even though the leave was Annual.

### Manufacturing

- Fixed an issue where, when making a Product Return document and entering the quantity to be returned, the system showed the message "The operation cannot be performed", and saving was also not possible, showing the same message.

### Service Center

- **Service Center:** Fixed an issue where, when creating a Receipt Voucher based on a Rental Reservation Request, the Receipt Voucher did not appear in the Payment Vouchers grid on the Payments page, and when the Receipt Voucher was deleted, the remaining amount in the Reservation Request became negative.
- **Service Contract document:** Fixed an issue where, when entering the Discount 1 value present in the Service Contracts details line, the percentage appeared automatically, and vice versa.
- Fixed an issue where, when making a sub-item Sales Order, the system allowed making more than one reservation form for the same sub-item.

### Settings

- **Approvals System:** Fixed an issue where, when making a document for approval, the user could cancel the approval, then open the More menu, then open Edit Permissions and click OK, gaining the ability to save the document without the approval being considered.
- Fixed an issue where, in some cases, the error message "The operation cannot be performed" appeared when activating a Scheduled Task.
- Fixed an issue where, when printing the Maintenance Invoice's A4 form through the "A4 Print" button present on the screen, the print form contained 2 Subreports, one of which appeared and the other did not appear in the print, but when viewing the report from the Report Definition, both Subreports appeared in the print.
- Fixed an issue where, when sending an invoice with an amount greater than 10 million to the Tax Authority, the system showed it as invalid because the signature was incorrect.

### Human Resources

- Fixed an issue where, when adding an Opening Leave Balance Entry voucher, and there were employees with a problem such as not having entered a Start of Work voucher while on leave, only the first employee's problem was shown, not the rest of the employees'.
- **Clearance Voucher:** Fixed an issue where the system required the user to specify the "Leave Type" and the start and end dates, even though the Clearance does not require being linked to a Leave voucher.

### Fixed Assets

- Fixed an issue where, in some cases, the system did not depreciate the assets correctly.
- Fixed an issue where the system allowed editing the Fixed Asset's purchase date and setting it to a date after the Depreciation voucher's date.

### Contracting

- **Project Extract:** Fixed an issue where, when consolidating items or consolidating items without quantities, the items' order appeared as 1.1, then 1.10, then 1.2 — that is, it was sorting as text rather than as a number, which was wrong.
- **Contracting Settings:** Added an option to show Subcontractor Contracts in the Subcontractor Fine voucher.

### Point of Sale

- Fixed an issue where the option "Allow Making a Return or Exchange for Invoices from the Nama Server" did not work correctly.
- Fixed an issue where, when returning an invoice from another machine and then going back to the machine that has the invoice's original, it could be returned again.
- Fixed an issue where messages specific to the invoice appeared when saving the Transfer Request.
- Fixed an issue where, if a document was sent from the Point of Sale to the main Nama database and contained errors, so it was stored as a draft, and then the user fixed the error and saved it, the system sent the document as a draft again. This was fixed by not allowing the user to save a document with an error that had already been sent.
