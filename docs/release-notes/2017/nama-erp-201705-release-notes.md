
# Nama ERP Release Notes - May 2017

::: info Release Information
**Release Date:** May 2017  
**Release Number:** 201705
:::

## Additions

### Inventory
- Added a mechanism for calculating the number of items at the line level.
- Added a Multiples Policy mechanism (applied to the items the offer is applied to — multiplying the quantity of the item the offer is applied to).
- Prevented editing an item's base unit when the item has transactions, except via the option in Distribution Management Settings **"Allow Editing the Unit for Items with Transactions"**.
- Prevented making the use of Locations mandatory if the warehouse already has any transaction without a location, except through the option in Distribution Management Settings, **"Allow Changing the Location Usage Method for Warehouses with Transactions"**.
- The default location from the warehouse, when left blank, is now copied to the line in Distribution (and Production) documents, as well as to the location in Transfer and Transfer Request.
- Improved so an item is only inserted automatically with an Additional Service, Item Accessories, and Suggested Item.
- Item file: The default selection of the field **"Allow Overdraft"** found on the Item screen is now (No) by default.

### Purchasing
- **Purchase Returns:** Occasionally, the system inserted values into the discounts that could not be deleted.
- Added the Received Quantity to the Purchase Order.
- Developed the entity flow `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem`, to guess the line in the Purchase Order and deduct it from the Purchase Order when creating the Warehouse Receipt.
- Added the option **"Allow Returning Sales Invoices Whose Items Have Not Been Issued"** to the Sales Returns term config settings.

### Sales
- Added an option to the Sales Returns document term config to allow returning sales invoices whose items have not been issued.

### Accounting
- Added payment methods to Payment Vouchers.
- Renamed the option **"Do Not Apply Installment Effect"** in the Payment Voucher term config to **"Apply Installment Effect"**.
- Improved the Receipt Voucher and Payment Voucher so that, when including a Financial Paper, the relevant party is automatically copied from the document to the Financial Paper.
- Added 3 text fields to the lines of the Maintenance Amount Disbursement Request screen.
- Added date fields to the lines.
- Added attachments to the lines.
- Added the option **"Settle Currency Differences"** to Accounting Settings.
- Enabled the references for use in the document term config's record source on the (Debit Note - Credit Note - Payroll Document) documents.
- Added two fields for the Receipt Book and the Receipt, so a Receipt Voucher can be made for more than one customer, or a payment for more than one party, with each customer or party having a separate paper specified on the lines.
- Added the option **"Apply Installment Effect"** to the Payment Voucher term config.

### Banks
- **Bank window:** Increased the N and the Description to 10.
- Improved Bank Transfer so an account can be added in the Bank Transfer term config.
- **Cancel Financial Paper:** Added Reference 1 and Reference 2 to the lines without displaying them on the screen.

### Human Resources
- Created a new document titled **"Employee Achievement Document"**.
- Improved the Work Commencement Document based on a Leave Document so the system automatically carries over the employee and the leave type from the Leave Document.
- Added the ability to group employees while ignoring the legal entity in the book.
- Improved the system so it does not count unpaid leave days falling before the actual work-commencement date.
- Added attachments to the Update Workplace window.
- Moved the **"HOPaymentRequest"** document and renamed it to Payment Settlement Request, to Human Resources, into a separate group named Administrative Transactions.
- Moved the **"Employee Sponsorship Transfer Request"** document from the Labor Regulations group to the Administrative Transactions group.
- Moved **"Labor Regulations"** to the Human Resources module.
- Developed the entity flow `EAFieldsValuesCalculator` for the Work Commencement Document, to make the default work-commencement date today's date.
- **Termination of Service Document:** The effect of the termination reason, when it is Other 1, is now copied to Other 1 in the Status field on the Employee screen, and likewise for Other 2, Other 3, and Other 4.
- Moved Visas to the Human Resources module.
- Moved Insurance to the Human Resources module.
- In the Resignation Document, made the Actual Work End Date field mandatory.
- **Leave Balance Adjustment:** No longer allowed saving a Leave Balance Adjustment document for an employee who has no job offer.
- Created an entity flow to add a line to the Employee Achievement Document daily, with the default achievement being whatever is specified in Parameter 1 of the entity flow's parameters.

### Fixed Assets
- **Fixed Asset Purchase:** Entering the tax percentage previously calculated the tax amount only on save. Improved so it is calculated before saving, as in the Purchase Invoice.

### Project Management
- Added the following improvements to the Project file:
  - Added a new field to Matrix (3): **Specialty Distribution Percentage Over the Phase**. For each specialty, this percentage must not exceed 100%.
  - Improved so the percentage of the project in Matrix (3) is the product of the specialty distribution percentage times the specialty's percentage of the project (given in table (2)).
  - Improved so the estimated cost on the Matrix (3) line is the specialty distribution percentage from table (3) times the specialty's cost from table (2).
  - Improved so the number of hours in the Phases table (1) is the total number of hours stated for the phase in the Matrix table (3), and likewise for the cost.

### Service Center
- Added both of the files (Recall Campaign, Accessories Group).
- Added the fields (Chassis Number, Engine Number, Plate Number, Vendor Code, Accessories Group, Recall Campaign, Current Meter Reading, Previous Meter Reading) to the Product file.
- Improved the system so that (Chassis Number - Engine Number - Plate Number - Vendor Code - Current Meter Reading - Customer, etc.) are pulled into all Service Center documents as soon as the "Vehicle/Product" is selected.

### Manufacturing
- **Forecast Document:** Added the following improvements:
  - The From Date and To Date are filled in on save
  - If the Unit field is left blank, it takes the item's sales unit.

### Contracting
- Increased the number of attachments on the Contracting Assays screen to 5 attachments.
- Developed the entity flow `PMGValidateContractingJobOrderQuantitiesWithContract`, which prevents the quantity on Contracting Work Orders from exceeding what is in the contract.
- Added a new file similar to the Vendor Category file, named Contractor Category, and added a reference to it inside the Subcontractor file.

### Point of Sale
- Adjusted the print forms so they can work with linked forms, with the system now issuing two invoices instead of one.
- **Sales Offers - Invoice Offers:** Updated the Invoice Offer as follows:
  - A free item can now be issued on a group of items, where the free item is different from them.
  - Added the ability to apply the previous offer to: (a specific item department, a specific item category, a specific item classification, or selected items), with an application priority when the item appears on more than one line of the offer, according to the department, category, and classification.
  - Added the policy (Once - Multiples)
- Added the ability to save the `properties.nama` file inside Nama separately for each terminal.
- Added the ability to control the company name and logo shown on the POS login screen.
- Added an option to hide Cash Payment from all screens and rely only on payment methods.
- In both the Sales Invoices display screen and browsing Sales Invoices from within Returns or Exchange invoices, showed the fields (Customer Code - Value - Date).
- **Exchange Invoice:** Showed the difference at payment.
- Reset the column formatting.
- Added an option to show the unit name, the unit code, or both together.
- In the Payment screen, improved so pressing (ESC) makes the system go back.
- Created a page dedicated to displaying users in the Permissions file.
- Showed the username at the top of the screen.
- Created a shortcut to disburse amounts to a Credit Note.
- Added a field for the column properties on the Terminal and in Settings, which is found in the `screenproperties.properties` file.
- Added the button **"Create Expense Document for a Credit Note"**.
- **POS Settings:** Added internal messages for the documents that must be transferred as soon as they are saved.

### Customer Relationship Management (CRM)
- Added the statuses (Preliminary, First Missed Call, Second Missed Call, Closed, Rejected, Complaint, Finished) to the Questionnaire file.

### Real Estate
- **Lease Contract:** **Opening Lease Contract:** Showed the records related to the contract, like Sale Contracts.
- The Sales Representative field is now entered automatically from the current user's login information, with the ability to change it, in each of the documents (Sale Contract, Preliminary Sale Contract, Opening Sale Contract, Reservation Form).
- Added the field (Discount Percentage) to the details of each of the documents (Sale Contract document, Opening Sale Contract, Preliminary Sale Contract, Reservation document).

## Settings

- Added a new field to the Currency file, **"Number of Decimal Places for Display"**, so the local amount can be calculated with a large number of decimal places and then displayed on screen with fewer decimal places.
- Added the option **"Default Number of Display Decimal Places"** to Global Config, used for display in a list when there is no currency.
- Added the Unit to the Conversion Factor table in Distribution Management Settings.
- Allowed using a field from the document header and a field from the line with any term config, as well as the references.
- Added the ability to edit system reports' permissions via the More menu.
- Added a tool in the Responsible Type in Alert Definitions to fetch employees from a criterion.
- Requested: adding the ability to total up fields on the lines into a field in the window header, via the new `totalize(detailName,detailName.fieldName)` function.
- **Global Config:** Checked the option **"Disable Inventory Adjustment Entries"** by default.
- Added `ReplicationSite` to `ActionsHistory`.
- Added `ReplicationSite` to `ReportLog`.
- The Export to Excel 2000 button found inside the Reports view does not work.
- Added the following sources to the term config:
  - Document Header - Reference 1
  - Document Header - Reference 2
  - Document Header - Reference 3
  - Document Header - Reference 4
  - Document Header - Reference 5
- Also added the ability to specify a field directly from the line or from the document header.
- Added the ability to choose the list in the `Creator`, in the case of inserting a button on a screen modified via **"Edit List"**.
- Added the ability to open the document found on a button in `Window New` inside the browser or inside a screen.
- Added the ability to choose the list in the `Creator`, in the case of inserting a button on a screen modified via **"Edit List"**.
- Added the ability to create Installation documents for invoices whose period is closed, without needing to open the period.
- Enabled amount-in-words in French.
- Added a step to `Updater Nama` that deletes all files in the path `C:\Program Files\Apache Software Foundation\Tomcat 9.0\temp`, because that folder grows large from running the system.

### Manufacturing
- Added the ability to specify the `BOM` and the `ROUTING` in the Planning Document.

## Fixes

### Inventory
- Fixed an issue where deleting the transactions made on an item did not remove them from the fields inside the item.
- Fixed an issue where the entity flow for calculating the prices of the Installation document (`tender`) did not take the date from the price list into account.
- Fixed an issue where Nama allowed grouping a Supply document into more than one Sales Return invoice, unlinking the Supply document from the older Return invoice.
- Fixed an issue where returns on raw materials did not affect the Inventory Movement Statement with Costs report.
- Fixed an issue where, occasionally, an error appeared when creating a Warehouse Issue based on a Transfer document.
- Fixed some errors that occurred when creating a Unit via Duplicate.

### Sales
- Fixed an issue where a Sales Invoice with a discount could not be saved, because the system compared the discount to the invoice total and found the discount greater than the invoice total — since the invoice total was zero and only changed once the calculated fields were updated; that is, the system checked the field values before updating the calculated fields.

### Fixed Assets
- **Custodies Delivery Receipt Document:** Fixed an issue where viewing the document's system journal entry showed the custody account closed from a debit custody to a credit custody, when the opposite should appear to close the in-kind custody subsidiary; also, no system journal entry was created to load the custody onto the employee the custody was transferred to — so the closing entry needed to be reversed and an entry created for the employee the custody was transferred to.
- Fixed an issue where creating and then deleting a Cost Document for an Asset Letter of Credit left the letter of credit's status stuck as Closed and did not allow editing its Expense documents, showing the error message **"Invalid Letter of Credit Status"**.

### Purchasing
- Fixed an issue where creating a Purchase Invoice for an item with versions and sizes showed an error on save.

### Accounting
- Fixed an issue where, occasionally, searching for invoices inside the Receipt Voucher showed **"Operation Cannot Be Performed"**.
- Added the option **"Do Not Show Automatically Settled Debt Aging"** to Global Config.
- Fixed an issue where creating a detailed Payment Voucher, saving it with a specific currency and conversion rate, and then trying to change the currency rate on the lines left the local amount unchanged, unaffected by the change.
- **Accounting - Payment Voucher:** Fixed an issue where adding Loan documents in Based On filled in values for the lines but did not fill the Value field with the loan amount.

### Service Center
- Fixed an issue in the lines of the **"Edit Assay"** document, where the Task was duplicated; the correct order is Service then Task, as in the **"Assay"** document.
- Fixed a translation error for **"Brand"** in the **"Task"** file, where it appeared as `brad.SrvCTask` after using `alt+ctrl+X`.

### Human Resources
- Fixed an issue that occurred when duplicating an employee who has a user account, then choosing to create a user for the new employee.
- Fixed an issue where creating a Suspension Document from 2017-04-02 to 2017-04-03 showed the total suspension days as 2 on the Suspension Document, while issuing a Payroll Document showed it as 1 day.
- Fixed an issue where, when an employee was late for check-in, the system calculated the lateness, but if the employee also had overtime on that same day, the system deducted the lateness duration from the overtime, making the calculated overtime wrong; selecting **"Calculate Overtime from End of Shift"** in the settings calculated the overtime correctly, but some items did not work when this option was selected.
- Fixed an issue where the system did not accept importing or exporting Attendance and Departure.
- Fixed an issue where selecting the To Date on the Leave Document caused an error ("Operation Cannot Be Performed").
- **Payroll Document:** Fixed an issue where the system calculated the total leave days incorrectly.
- Fixed an issue where Field Settings in the Permissions file (Control Type - Applies When) did not work with lines.
- Fixed an issue where creating the Update document on the same day did not affect the Employee screen with the change.
- Fixed an issue where editing a previously saved Update Workplace document and changing the From Date field did not copy the entered date to the lines (it was only carried over the first time).
- Fixed an issue that occasionally occurred when trying to save the Termination of Service document.
- Fixed an issue where the system allowed issuing two payroll records for the same employee for the same period, and if the user tried to delete the payroll record from both, the system refused.

### Accounting
- Fixed an issue that occasionally occurred in processing debt aging for the Journal Entry Voucher.

### Manufacturing
- Fixed an issue where analyzing the Planning Document showed **"Operation Cannot Be Performed"**.
- Fixed an issue where the number of lots was not calculated in Planning.
- Fixed an issue where, in the Planning Document, pressing the Execute button showed the error **"Quantity Must Be Greater Than Zero"**.
- **Damaged Goods Receipt Document:** Fixed an issue where selecting the item in the Code field did not copy the name into the Name field.
- **Damaged Goods Receipt Document:** Fixed an issue where the search in the Batch and Box fields did not work.
- Fixed an issue where creating a Raw Material Issue Request or a Raw Material Issue based on a Production Order copied the product's component lines but not the production date and expiry date; the correct behavior is to copy the production date and expiry date as well.
- Fixed an issue where creating a Raw Material Return document based on a Production Order copied the warehouse from the Production Order, which was wrong, since the Production Order's warehouse is for delivering the finished product, not for the return.
- Fixed an issue where creating an Issue Order based on an Issue Request did not carry the lines from the request to the order correctly.
- **Planning Document:** Fixed an issue where the system did not accept grouping on month 1.
- **Execution Document:** Fixed an issue where moving the product from an operation to the same operation did not automatically load the resources and raw materials — for example, moving from Operation 20 Rejected to 20 Ready to Move did not load the resources and raw materials.

## Settings

- Fixed an issue where, occasionally, the version updater showed a message that it could not reach `com.namasoft` even though there was an internet connection, because a specific port was closed.
- Fixed an issue where, occasionally, the Scheduled Task did not run.
- Fixed an issue in Field Settings in the Permissions file where selecting a field — for example, (Actual Date) — without specifying the type, with control type (Not Editable), worked correctly, but creating another line, for example for a Sales Invoice with the field (Actual Date) and control type (Normal), did not have Nama open with the specific type that governs the editing permission for that type.
- Fixed an issue where, occasionally, a newly created database with no data could not be opened through the system.
- Fixed an issue where, occasionally, creating a new database and trying to run Nama on it showed an error message about difficulty accessing the Permissions file, and the user could not open the system.
- Fixed an issue where sorting descending, opening any record, and navigating between records using the Next and Previous arrows did not work correctly (navigation did not follow the order shown in the list).

### Point of Sale
- Fixed an issue where some invoices were not transferred to Nama.
- Fixed an issue where applying a discount and then canceling it had no effect.
- Fixed an issue where printing a Sales Invoice in POS showed the print screen a second time after closing the invoice view — appearing twice.
- Fixed an issue where, occasionally, closing POS and reopening it showed the message `running already`.
- **Customer Search screen:** Showed the mobile number and the ability to search by it.
- Fixed an issue where the **"Edit Font"** mechanism did not work.
- Fixed an issue where the numeric pad and keyboard did not work with the Payment screen.
- Fixed an issue where suspending an invoice and then saving it again left the invoice code as `@ draft`.
- Fixed an issue where closing the shift and entering a value in the Actual Balance transferred it to the shift closing with a different value.
- Fixed an issue where the system saved the `logo.LegalEntity` field found inside Nama, inside POS, in the `POSLegalEntity` table.
- Fixed an issue where changing a user's password in Nama did not carry the change over to POS.
- Fixed an issue where POS could not be opened with any user enabled as a POS user and given permissions, other than `Admin`.
- Fixed an issue where the tray icon sometimes did not appear, and trying to open the program showed a message that the program was already open even though the tray icon was not there.
- Fixed an issue where creating an Issue Order based on an Issue Request did not carry the lines from the request to the order correctly.
- **Planning Document:** Fixed an issue where the system did not accept grouping on month 1.
- **Execution Document:** Fixed an issue where moving the product from an operation to the same operation did not automatically load the resources and raw materials — for example, moving from Operation 20 Rejected to 20 Ready to Move did not load the resources and raw materials.

### Settings
- Fixed an issue where, occasionally, the version updater showed a message that it could not reach `com.namasoft` even though there was an internet connection, because a specific port was closed.
- Fixed an issue where, occasionally, the Scheduled Task did not run.
- Fixed an issue where, occasionally, modifying a screen for the Archive document to control the displayed columns caused the archive documents to display incorrectly.
- Fixed an issue where creating an Archive document from within a document via the More menu — when the popup screen appeared, it was not possible to upload a file on the lines via the `attach` control on the line.

### Banks
- Fixed an issue where Nama allowed editing the Bank Account field on an issued Financial Paper.

### Contracting
- Fixed an issue that occurred when calculating **"Total Quantity"** on the lines of the **"Contracting Work Order"** document.

### Real Estate
- Fixed an issue where the journal entries shortcut did not work on contracts in Real Estate.
