# Nama ERP Release Notes - April 2016

::: info Release Information
- **Release Date**: April 2016
- **Release Number**: Nama-ERP-201604
:::

## Additions

### Inventory

- Created the entity flow SetSecondUOMToDefaultIfEmpty, to automatically set the second unit of measure for warehouse documents.
- When tracking the lot and box, the production and expiry dates are now shown next to each lot or box.
- Added the option "Search only in available quantities" to Distribution Management settings.
- Assembly Voucher - Supplied Items page: Added the ability to automatically issue both Lotid and BOX codes according to the supply warehouse type.
- Added the field "Retest Period" to the Item file - Settings page, which is updated based on quality inspection documents, for all warehouse documents.
- Quality Inspection and Confirmation Requests: Added the ability to select a quality checklist within the request, and when creating quality inspection and confirmation vouchers based on the request, it is called directly from within the request.
- Added the field "Based On" to both the Quality Inspection Request and the Quality Confirmation Request.
- Improved so that warehouse transfer requests cannot be created from within quality inspection and confirmation documents until those documents are saved first.
- **QA Documents:** In the case of creating a transfer request with the accepted or rejected quantity, improved so that the quantity of the quality inspection or confirmation document can be tracked.
- Added a Reference named "Group" in the details of the Quality Checklist document.
- **Assembly Voucher:** Improved so that the quantity inside the box (serial number) or the full batch quantity is retrieved, instead of the default quantity of 1.

### Sales

- Improved so that when a Receipt Voucher is created based on a Sales Invoice, or invoices are added on the Invoices page, this affects the Payment screen > Payment Vouchers in the Sales Invoice, and affects the cash paid and remaining amounts.

### Purchasing

- Added the field "Processed By" to the Purchase Return Request.

### Accounting

- Added the ability to auto-code within the Chart of Accounts.
- Added the option "System-Specific Account" to the Accounts file, so this account is used only by document term configs as a system account, but cannot be used manually in the system's files and documents.
- Added keeping the original line and its reversal in the account distribution.

### Fixed Assets

- Added displaying all movements on the asset within the asset itself.

### Banks

- Improved cancellation of the Financial Instrument so that it accepts canceling an issued instrument for which a Payment Voucher was created and whose status became (Collected).
- **Financial Instrument:** When creating a Bank Deposit from within a Financial Instrument that does not contain a bank account number, the system does not accept executing the operation. Changed so that the operation is accepted with the account number field left empty.
- **Financial Instrument:** When creating a Payment Voucher from within the Financial Instrument, improved so that the system pulls the bank account contained within the Financial Instrument.
- Added a field for the customer's bank name, for incoming Financial Instruments.
- Improved the Financial Instrument so that when creating an instrument of type "Issued", the system prevents saving unless a bank account number is selected.

### Contracting

- In the Extract, added the ability to create a condition that calculates based on the net value after the preceding conditions.
- Added the ability to create an Extract based on an Execution document, such that each Execution has only one Extract.
- Added the ability to modify the unit price in the Project Extract (Percentage).

### Customer Relationship Management (CRM)

- Created the Visit Request as a proactive, non-mandatory step before the visit, obtaining approval from the person required to make the visit together with the request owner, and scheduling it into the tasks table through approval.
- **Project Window - Training & Preparation:** Added a column for the sequence number, meaning each stage has a sequence number.
- **Visit Window:** Added the field "Visit Location" which contains the values (Customer - Company Premises - Communication Means - Remote Use).
- **Visit Window:** Added the field "Customer Responsible".
- **Visit Window:** Added the field "Status" which contains the values (Initial - In Progress - ......).

### Human Resources

- Added the ability to carry forward the leave balance to the following year.
- Added the ability to create a Payment Voucher based on an advance.
- Created a tool in the "Insurance Offer Requests" voucher to update employee and dependent data upon saving.
- Created a new document named "Health Insurance Offer Request".
- Added a details section to the Advance screen that shows the related documents.

### Real Estate

- Created two buttons inside the Maintenance Expense to create a Payment Request and a Payment Voucher.
- Copied the details when creating a Payment Voucher based on a Maintenance Expense.
- Activated the term config in the Lease Contract Termination document and added its own accounting effects.
- Changed the shortcut in the Collection Voucher screen to be Receipt Voucher and Receipt Request instead of Payment Voucher and Payment Request.
- Copied the data from the Collection Voucher when creating a Receipt Voucher or Receipt Request based on this document.
- Added two buttons inside the Collection Voucher to create a Receipt Request or a Receipt Voucher.
- When creating a Collection Voucher based on a Sale Contract or a Reservation document, the details are now shown on this voucher's screen.
- Added details to the Unit such as living room area, number of rooms, number of bathrooms, unit area.
- Owner-Buyer: Added details such as "Residency Number", "Expiry Date".
- Added related records to "Owner - Buyer" containing (Lease Contracts - Sale Contracts - Collection Vouchers).
- Added a Contract Items screen in the Contracts, containing the item number and item details.
- Added the collection type to the Collection Voucher term config.
- Added the Sales Representative to the Owner-Buyer screen.
- **Ownership Transfer Voucher:** Created a term config for this document to record its accounting effects, since the transfer may result in a financial settlement.

### Manufacturing

- Added the option "Default Withdrawal Method" to Manufacturing settings.
- **Execution Document:** Improved so that quantity can be moved from an operation to the same operation while changing the status.
- Added a unit-of-measure conversion relationship at the operation level in operations, where the unit used at the operation level can be fixed, with the ability to change it according to previously defined conversion relationships.
- **Production Execution Document:** Added the option "Auto Sample Withdrawal" and set up a term config and book for it within the Execution document's term config, such as Finished Product Delivery, Raw Material Issue, and Resources Voucher.
- Added the field "Based On" (Production Order Execution) inside the "Sample Withdrawal" document.
- **Operations:** Added the option "Allow Exceeding Tolerance Percentages" to the operation lines.

### Fixed Assets

- Added an option for non-depreciable assets such as land. In this case, it is enough to enter an account for the asset only, and depreciation vouchers cannot be created for these assets.

### Reports

- Added a User field in the form details within the Report Definition, through which a user, permission file, or group can be selected, the purpose being to give them a different layout for the screen or report form.
- Added the ability to create a new ReportDefinition from the Reports Catalog.

### Settings

- Added the ability to run Scheduled Tasks on a specific Replication site or a group of Replication sites.
- Added a new file for issuing recurring documents.
- Updated Alerts so that a condition can be set for applying the template.
- Added the option "Maximum Number of Records When Displaying All in Lists" to Global Config.
- Added the following options to the Alert Definition: (With Review, With Cancel Review, With Cancellation, With Cancel Cancellation).
- Added the following fields to the Company file: (Establishment Date, Activity Start Date, Commercial Register Number, Commercial Register Issued From, Tax Registration Number, Tax File Number, Tax Office, Establishment Insurance Number).
- **Alert Definition File:** Added the grid "When the Following Fields Change", to send the alert only when these fields change.
- Added the ability to send text messages to customers, related parties, contacts, and vendors, in addition to employees.
- Added the ability to modify a screen by adding a button that performs a specific function.
- Added the option "Prevent Using Branch Servers While the Main Server Is Working" to Global Config.
- Added the field "Number of Saves While the Main Server Is Working" to the User file, to allow a number of saves after the main server comes back.
- **Permission File:** Added an option to prevent the user from editing documents that have been approved, even if they have permission to approve the document.
- Added the option "Use Smart Search for the Arabic Language" to Global Config, through which certain letters are treated as interchangeable, such as (ه ة), (أ ا إ ء آ), (ي ى آ), (وؤ).
- Added the ability to import drafts through the Scheduled Task using SQLDraftImporter.
- Created a new voucher named "Voucher Cancellation Voucher", which turns the voucher into something exactly like a draft (with no effect at all), while keeping its number and marking the document as "Canceled" "Canceled".


## Fixes

### Inventory

- Fixed an issue where clicking the New button on the "Warehouse Transfer Voucher" screen caused the system to show an empty error message and not allow data to be entered correctly.
- Fixed an issue where an error sometimes occurred when creating a Payment Voucher based on a Purchase Invoice.
- Fixed an issue where a problem sometimes occurred in Reservation Vouchers created from Sales Invoices.
- Fixed an issue where creating an Inspection document based on a Preliminary Receipt document did not automatically copy the warehouse to the Inspection document.
- Fixed an issue where the item code did not appear inside Quality Inspection and Confirmation Requests.
- Fixed an issue where, in some cases, saving an Assembly Voucher showed the error "The lot code cannot be left empty" even though there was no item or component with a lot or expiry date, and expiry dates had not been enabled in the settings menus.

### Sales

- Fixed an issue where an error occurred specific to approving Price Lists.
- Fixed an issue where, when adding a Sales Invoice, the price did not appear for the cashier and only appeared with full permissions.

### Purchasing

- Fixed an issue where, when a Purchase Price List existed, entering Purchase Invoice data based on a Warehouse Supply did not retrieve prices into the lines unless the date was cleared and re-entered.
- Fixed an issue where enabling "Mandatory Size Selection" worked correctly with Supply Vouchers but not with Purchase Invoices, since the Purchase Invoice could be saved without entering the size despite the option being enabled in the item settings.

### Customer Relationship Management (CRM)

- Fixed an issue where Related Records inside the Sales Thread did not show related contacts.
- Fixed an issue where an error sometimes appeared when executing a Support Request.

### Accounting

- Fixed an issue where creating a Check Receipt Voucher, then creating a Payment Voucher for the same check (endorsing the check), then afterwards deleting the Payment Voucher, showed an error message that the check was used in another document, and the same error appeared when deleting the Receipt.
- Fixed an issue where creating Payment and Receipt Vouchers from within Requests did not show the details.
- Fixed an issue where creating a Budget Scenario, and then creating a budget to compare the current year's balances with the previous year's, resulted in the following:-
  - **Previous Year Balance:** The system showed the balance to date rather than only what belonged to the previous year, while the current year's balance was correct.
  - As soon as "Calculate Values" was clicked, numbers appeared that were completely inconsistent with the account balances for the current and previous year.
- Fixed an issue where, in a Payment document linked to a Financial Instrument that was implicitly collected, if the user wanted to delete the Financial Instrument, a message appeared saying the operation could not be executed because the Financial Instrument was used in another document, even though it was not used.
- Fixed an issue where creating a Receipt Voucher based on a Sales Invoice showed the error "Document not balanced", while creating the same document without specifying "Based On" saved without problems.
- Fixed an issue where creating a Cancellation document for a Check Payment Voucher showed a message saying the Financial Instrument linked to this voucher had been used elsewhere, even though the instrument's status was "Collected" and no transactions had been made on it except the Payment Voucher itself.

### Banks

- **Bank Transfer Document:** Fixed an issue where selecting an account did not show any of (account name, subsidiary type, currency, exchange rate), whereas selecting the subsidiary type directly and selecting a subsidiary did fill in the rate, account name, and currency.
- **Bank Reconciliation Document:** Fixed an issue where selecting the bank account number, selecting the type "Credit", and entering the amount for this data filled the data into the line but placed the amount in the debit according to the type, which was an error - the amount should have been on the line opposite the selected type.
- Fixed an issue where creating a Bank Notice based on a Payment Voucher did not automatically fill in the Financial Instrument's data.

### Settings

- Fixed an issue where selecting the Planned Visit Date in the "Work Task" document showed the error message "The operation cannot be executed".
- Fixed an issue where adding a new screen and trying to insert fields into it added the screen successfully but did not show these fields.
- Fixed an issue where, in the "Add Group" screen under screen editing, the page to which the group should be added was not there.
- Fixed an issue where, in some cases, the RegenLedgerTransReqFromFile procedure did not work correctly.
- Fixed an issue where an error sometimes appeared when approval took place, showing an empty log.
- **View and Use Reports Permissions:** Fixed an issue where creating a permission type and linking it to the user or the Permission file (in custom permissions), then linking it to the Report Definition, and afterwards running the report, showed the error "The operation cannot be executed".

### Contracting

- Fixed an issue where, in both the Contract and the Extract, the "Stage Percentage of Price" field allowed entering decimal fractions but rounded the number when calculating - for example, a stage percentage of price of 66.6 was allowed to be entered, but the multiplication result was the result of multiplying 67 by the price.
- **Subcontractor Extract:** Fixed an issue where the subcontractor was not present in the Extract, and the accounting term config could not be linked to a subcontractor reference; the correct behavior was to add the subcontractor to the Extract and add the subcontractor as the reference in the accounting term config.
- Fixed an issue where converting the Assay to a Contract did not transfer the following information from the Assay to the Contract: (the engineer responsible in the Assay, the description in the Assay).

### Human Resources

- Fixed an issue where an error sometimes occurred when importing an Employee Data Update file.
- Fixed an issue where importing an Attendance and Departure document that had previously been exported via the More menu (not the fingerprint machine file) placed zero in the time field for attendance and departure.
- Fixed an issue where the system allowed the user to create manual or calculated KPI values for the same employee and the same period more than once.
- Fixed an issue where the system did not prevent paying off an advance against an advance code that had already been fully paid off, and this code still appeared on the Advance Repayment screen when repaying.
- Fixed an issue where selecting a salary component on the Advance Voucher screen did not show only the components of type "Installment".

### Real Estate

- Fixed an issue where errors occurred in each of the following documents: (Reservation documents, Sale Contracts, Floors, Units, Buildings).
- Fixed an issue where creating Floors from within the Building screen showed them in English rather than Arabic.
- Fixed an issue where the Maintenance Expense document's term config did not accept saving and also had no accounting effect.
- Fixed an issue where the Block field appeared on the Square screen when it should not have.
- Fixed an issue where, in the Lease Contract, the system allowed completing the save without entering the Tenant (Buyer).
- Fixed an issue where creating leases from the Contract screen caused the system to create a fixed code for all installments.
- Fixed an issue where selecting a specific installment and creating a Collection document for it did not copy the installment code along with the rest of the copied data.
- Fixed an issue where, in the Contract window, selecting the From Date and To Date allowed setting the (To Date) before the (From Date) by a difference of one day.

### Fixed Assets

- Fixed an issue where errors occurred in asset depreciations after applying the properties table regeneration for the customer "الشتاء والصيف".
- Fixed an issue where the system sometimes failed to save the Asset Purchase Voucher.
- Asset Transfer document: Fixed an issue where searching in the Depreciation Account displayed all accounts, not just the accounts of the asset's subsidiary.

### Manufacturing

- Fixed an issue where the system did not allow saving Transfer Vouchers to the Production Floor warehouse.
