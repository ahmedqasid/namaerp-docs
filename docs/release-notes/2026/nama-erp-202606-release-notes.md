# Nama ERP Release Notes - June 2026

::: info Release Information
- **Release Date**: June 2026
- **Release Number**: Nama-ERP-202606
:::

## Additions

### E-Invoicing & Government Portals

- Implemented a large set of changes to comply with the requirements of the Saudi Zakat, Tax and Customs Authority, most notably:
  - **Seller and Buyer Identity (BR-KSA-08 / BR-KSA-14)**: The buyer's identity type is now taken from a new field in the Customer file instead of always being fixed to "Commercial Registration CRN"; the identity element is not sent if it is empty, and the identity value is cleaned of symbols and spaces.
  - **Buyer's Tax Number**: Now sent in its correct field for the tax-registered buyer (B2B).
  - **Invoice Time (BR-KSA-70)**: Now written in 24-hour format in the signed document.
  - **First Invoice in the Chain (BR-KSA-26 / BR-KSA-61)**: Now carries the standard value required for the "Previous Invoice Hash" (PIH).
  - **Exempt, Zero-Rated, and Out-of-Scope Lines (BR-KSA-CL-04)**: The exemption reason code/text is now taken from the Tax Authority setting for categories E, Z, and O.
  - **Supply Date (BR-KSA-15)**: Now sent from the actual delivery date, or from the invoice date if it does not exist.
  - **Invoices with a Discount (BR-CO-11 / BR-CO-13 / BR-KSA-EN16931-03)**: Corrected the discount calculation so it is not counted twice, and only the amount is sent in the discount item.
  - **Invoice Stamped by the Authority (Cleared Invoice)**: The system now stores the version stamped by the authority for standard invoices (B2B) and uses it for printing and for the QR code, reads the QR code / hash from the invoice actually sent, and fixes the retry logic when the connection is interrupted.
  - For all the details and the new required settings (the buyer's identity type in the Customer file, and the exemption-reason codes in the Tax Authority setting) please refer to the document:
    [https://docs.namasoft.com/modules/invoicing/zatca-guide.html](/modules/invoicing/zatca-guide.html)
- Added a field in the Tax Authority settings named (Extra Discount Location at the Document Level / extraDiscountLocation), in which the discount slot among the line's discount slots (Discount 1 through Discount 8) that holds the extra discount is specified, so it is sent in the extra-discount field to the portal instead of being included in the regular discount total. The selected discount slot is required to be applied after all taxes, otherwise the system stops the sending with a clear error message.
- Added a new entity flow named (EASendNotSentTaxAuthorityDocuments) to send the batch-submission documents that were not sent automatically to the Tax Authority, running via a Scheduled Task at intervals.

### Inventory

- In the Additional Costs document, the Payments grid now reads the payment template from the Vendor file and fills the lines automatically (Installment Code, Payment Percentage, Remaining Value).
- In the Additional Costs document, the value of the created installments is now in the invoice's currency, with a Net field added in the document's currency.
- Added an option in the Supply Chain settings named (Allow More Than One Stock-Taking for the Same Warehouse on the Same Day - allowMultipleStockTakingSameDayForSameWarehouse).
- Added a mechanism for handling items that have lots and an expiry/validity date, so that the system allows issuing and transferring without entering the lot number as long as a quantity without a lot number exists, with control over making the lot number mandatory upon receipt.
- Added a new file named (Warehouse Usage Policy - WarehouseUsagePolicy) to allow specific users to work on specific warehouses for specific document types.

### Purchasing

- In the Purchase Order, added a field for the Purchase Order status (Initial - Confirmed - Partially Received - Fully Received - Cancelled), and created a new document to change the Purchase Order status.
- To monitor goods under clearance, added options to the Purchase Order term config (genStockReceiptForUnsatisfiedQty, stockReceiptBook, stockReceiptTerm) to automatically create a Stock Receipt voucher for the unfulfilled quantities, and added the options (useFromDocValueDateForReceipt, showOnlyOrdersWithUnsatisfiedQtyInFromDoc, genReceiptDocsForLinesOriginDocs) to the Purchase Invoice term config.

### Manufacturing

- Activated the Color field (selecting from the item's defined colors) in the following Manufacturing documents: Scrap Receipt (ScrapReceipt), Resource Voucher (ResourceVoucher), Raw Material Return/Issue and their Requests (RawMaterialReturn/Issue and Req), Product Return/Delivery and their Requests (ProductReturn/Delivery and Req), Production Sample, Production Execution, Production Order and its Request.
- In the Bill of Materials (BOM), it is now possible to select the Size on the raw-materials line, with the Size and Color fields filled automatically when entering the item code.
- Added the ability to make more than one product delivery/receipt for a Production Order without affecting the quantities schedule. For more details:
  [https://ask.namasoft.com/questions/10010000000000336/](https://ask.namasoft.com/questions/10010000000000336/)

### Accounting

- In the Prepaid Expense Contract, added an option (Repeat Installments Monthly on Contract Start Date Day) to create the installments on the same day as the contract's start date.
- In the Debit Note, added the fields (money.value.amount, money.value.currency, money.localAmount) and the dimensions on the lines, so that the values are loaded onto the lines based on the dimensions and affect the resulting journal entries.
- In the Debit Note, when the option (doNotUseInvoicesInDebtAges) is enabled in the term config, the system now allows saving without specifying an invoice or account on the invoices lines, in order to distribute the note's value before tax over various dimensions, with the same behavior enabled for the Receipt Voucher and Payment Voucher.
- In the Receipt Voucher and Payment Voucher, when using the (Based On) field, the account on the line is now filled from the account bag (MainAccount) according to the document's currency, if the Main Account in the subsidiary is empty.
- In the Prevent Transactions document (PreventAccTransactions), all five dimensions (including the Branch) are now taken into account when applying.

### Fixed Assets

- Added a new document named (Revaluation), with a field (Depreciation Installment Type) added to the Asset card with two values (Fixed Installment / Revaluation). Assets of the (Revaluation) type are not included in the periodic depreciation vouchers, and their depreciation is instead handled through the new document, which generates an automatic journal entry for the difference between the net book value and the new value, with support for more than one asset in the same document, and a Migrator to fill the new field.

### Contracting

- In the Subcontractor Extract, the term's tax written on the line is now calculated and included in the Extract's value, and appears correctly in the journal entry.
- In the Subcontractor Contract Amendment, added suggestions for the field (terms.projTermCode) to automatically generate the term code according to the coding field when adding.
- Added an attachment field on the lines of the details grid in the Daily Engineering Doings screen (DailyEngineeringDoings).

### Real Estate

- Added the option (Make the Sold Unit Available for Rent) in the Real Estate Investment Unit file, which works with sold units only, so that a sold unit for which this option is selected appears among the units available in the Rental Contract.
- In the Maintenance Charge Accrual document, added the accounting effects for the Unit Maintenance Value field, filtered the property to units subject to maintenance within the Box only, calculated the maintenance cost basis, the unit's area, and the unit's maintenance value systemically, and added Paid and Remaining fields on the line.
- In the Maintenance Charge Accrual document, added the fields (tax1, tax2) on the line, and added the Tax Policy in the term config along with the tax-related accounting effects.

### Point of Sale

- Added an option named (Disable Taxes) in the Point of Sale Machine file, so that tax is not applied for that machine.
- Added an option named (Verify the Customer's Tax Data if Subject to Tax) in the Point of Sale settings, so the invoice for a customer with a tax registration number is not saved until his tax data is verified as complete.
- Added a column (Term Config in Case of Error) in the Books & Term Configs grid on the Point of Sale Machine, so that the document is saved to this term config when the primary term config fails (such as an insufficient quantity for automatic stock issue).
- Enabled full Point of Sale permissions for the admin user.

### Customer Relationship Management (CRM)

- Added 5 Boolean fields on the line in the (detailedTasks) grid of the CRMTask screen.

### Vehicles

- Implemented a large set of developments in Car Insurance, most notably:
  - In the Car Insurance Program (SIInsuranceProgram): the item on the line is no longer mandatory, an attachment was added on the line, and fields were added on the header (Company Commission Percentage, Salesperson Commission Percentage, 5 attachment fields).
  - In the Car Sales Order (CarSalesSISalesOrder): added the fields (Car Insurance Price, Sale Type: Installment/Cash, Authorized Person), with suggestions for the insurance programs available for the car on the lines, based on the insurance price, the insurance company, and its category.
  - In the Car Sales Invoice (SISalesInvoice): added the two fields (Sale Type, Authorized Person).
  - Converted (Customer Car Insurance Documents) into a file instead of a document, adding the Code and the Group, and the fields (Financial Status, Physical Status, Document Number).
  - Developed the Car Insurance Document Issue/Receive/Deliver/Renew/Amend documents (renaming fields, copying the document's details upon selection, additional attachment fields, an option to prevent saving the Receive if the document is unpaid, a grid for the linked Receipt Vouchers, and accounting effects for the document's value in the term config).

### Human Resources

- In the Attendance Voucher, added a button (Copy Attendance from Other Vouchers) that displays a dialog (From Date, To Date, Employee) to copy the lines according to the selected criteria, without copying lines from any voucher that has the (Ignore Overlapping Attendance) option.
- Added a new document named (Weekly Rests) among the Attendance documents, with an option in the HR settings to rely on this document instead of the Work Schedule when calculating weekly rests.
- Added the document (Batch Early-Leave Permission) to automatically create Early-Leave Permission vouchers for more than one employee, with a Book and a creation term config in the term config.
- In the Penalty Voucher (HRPenaltyDocument) and its request, added the Payroll Period, and a grid for the number of repetitions during (Payroll Period, Fiscal Period, Payroll Year, Fiscal Year), and moved the calculation fields to the lines.
- In the Batch Reward document, added a reward type with a variable value that totals the system indicator for each employee separately, where the system simulates the employee's salary calculation in memory to extract the correct actual value instead of a fixed value.
- In the Reward/Penalty Voucher document (single and batch), added the document currency and the currency rate, with the value now taken into account after the rate.
- In the Liquidation Component screen, added a query for the Factor (components.factor), with (components.finalAddedValue, components.finalDeductedValue) calculated automatically when a query exists for the factor.

### Mobile Applications

- Added a grid (App Attendance Summary Settings) in the App settings, to display a dashboard with the employee's attendance summary.
- Added the option (Do Not Use with the App) in Default Values Templates, to handle not saving certain documents (such as Sales Return) on the app.
- Added a screen in the Nama Aggregator app (Human Resources) that displays the employee's check-in and check-out fingerprints, with a shortcut on each line to create an Early-Leave Permission when a fingerprint is forgotten, with each month shown on a separate page according to the Payroll Period.

### Service Center

- In the Work Order Execution screen (SrvCProductionExecution), changed the Time field in the details grid to TextDF so it accepts more than 24 hours.

### Work Orders

- In the Work Order screen (SrvCJobOrder), added date, text, and numeric fields for the two grids (SrvJOrderMaterialLine, SrvJobOrderResLine).

### Sales & Loyalty Points

- Added a mechanism to calculate Loyalty Points monthly based on the customer's total spending during the month, with spending brackets (Amount From / Amount To) on the lines of the Customer Reward Points file, a field (Points Calculation Method) in the Reward Points settings with two values (Per Invoice / Periodic Cumulative), and a new document named (Periodic Loyalty Points Grant Voucher).

### Document Management (DMS)

- Added a Groovy entity flow named (EADownloadURLsIntoAttachments) that converts links into attachments. For details:
  [https://docs.namasoft.com/entity-flows/core/EADownloadURLsIntoAttachments.html](/entity-flows/core/EADownloadURLsIntoAttachments.html)

### e-commerce Integration

- In the Amazon integration, it is now possible to read only orders whose status is (Shipped), excluding pending orders (Pending), with the (Amazon SP-API Order Change) webhook activated to read orders and automatically convert their status. For details:
  [https://docs.namasoft.com/modules/ecommerce/amazon-order-notifications.html](/modules/ecommerce/amazon-order-notifications.html)

### New GUI

- When using the shortcut (Ctrl + Enter) or (Alt + Enter), the program now creates a new line within the same cell, and the (Bulk Action) shortcut was changed to (Shift + Enter).
- Added a grid (Global Shortcuts - globalShortcuts) in the Shortcuts Definition screen (ShortCutsDefinition), with default global shortcuts: (General Search Ctrl+K) and (List Search Ctrl+U). To activate the new default shortcuts, a Regen UI must be performed.
- Improvements to the search in the selection list (Searcher) and the list view (List View):
  - Fields to control the default number of records per page (searchDefaultPageSize, defaultSearchPageSize, listViewDefaultPageSize) in the (Screen Edit, User, Custom List View) screens.
  - A Maximize button for the dialog in the selection list.
  - A (Clear Filter - removeFilter) button in the toolbar for the list view and the edit screen.
  - A toggle to permanently pin the filter bar in the list view.
  - An option (Always Apply the List's Default Criteria - listViewAlwaysApplyDefaultCriteria) in the (Custom List View, Screen Edit) screens.
- Added a button in the functions toolbar above the line grids inside screens, to delete all the filters activated on the grid.

### Business Intelligence

- Added a new export format (XLSX) in Report Viewing, so the report is downloaded directly to Excel without being displayed on screen.
- Added a button to export a dashboard widget to a JSON file to make it easier for customers to import, with the JSON file's shape improved to be a nested object instead of text.

### Settings

- Added an option named (allowCancelWithNonSystemRelatedStockDocs) in the term configs of (Sales Invoice, Sales Return, Purchase Invoice, Purchase Return) to allow saving the Cancellation document even if the document has non-system related documents.
- In the Fields & Screens Settings (GenericReferenceOverrider), the grid (Add Related Documents To - addRelatedDocumentsTo) now works with the new Screen Edit via the option (Allow System Modifiers) in the Screen Edit screen.
- In Scheduled Tasks, added the option (Run Log) to display the task's run log (succeeded/failed + completion time) in a table within the task file.
- Added support for running Nama as an MCP Server to make it easier to connect with AI tools, with the ability to set the MCP subscription's expiry date from the License Manager. For details:
  [https://docs.namasoft.com/modules/ai/ai-mcp-server.html](/modules/ai/ai-mcp-server.html)
- Increased the number of attachments in the Customer screen.
- In the Approval with Amendment for documents, rejection is now prevented, since a previously saved document cannot be rejected.
- Added the option (removeOtherEmployeesWhenEscalate) in the Approval Definition, so that the rest of the employees required to approve are removed upon escalation, leaving it to the escalated-to employee only.
- Added a new table named (Reorder Pages) to allow changing the order of pages through the Screen Edit.
- Added two fields in the Actions lines in the Screen Edit (confirmationMessageAr, confirmationMessageEn), to show a confirmation message before executing manual entity-flow actions.
- Added two date fields and two time fields for Discussions, and showed them on the screen and the list view, with a field (discussionFieldLayout) added in the Screen Edit screen to control the discussion's size.
- Modified the Setup Wizard to create additional stock-receipt and stock-issue books and term configs, correct the types of some system term configs, and create an account bag for the Subcontractor subsidiary when the Contracting module exists.

## Fixes

### Inventory & Purchasing

- Fixed an issue where the item's image appeared empty when printing the invoice, due to the WEBP image format.
- Fixed an issue where the warehouse selected on the line for free items was deleted when creating a Sales Invoice with a bundled item (which splits into items on save).
- Prevented adding a Stock-Taking Start and End for the same warehouse on the same day, with control over this made available via the option added in the Supply Chain settings.
- Corrected the fields (totalPaid, remaining) in the Additional Receipt Costs document so they behave like the rest of the documents (zero for Paid, and the amount due shown in Remaining when unpaid).
- Made improvements to the speed of cost processing.

### Accounting

- Fixed an issue in the Aggregate Documents button on the regular Payment Voucher, where it used to pull in already-settled Purchase Invoices and other documents such as the vendor's Opening Journal Entry.
- Fixed an issue where the parent group was not added when creating the Chart of Accounts from the Setup Wizard, causing some branches to appear disconnected from the tree.
- Corrected copying the amount from the document field (lines.originDoc) to the local field, not only the value field, in the Payment Voucher, to avoid the new line being automatically deleted because the local amount was zero.

### Real Estate

- Fixed an issue where the accrual entries were not posted automatically in the Receipt Voucher built based on the Rent Installment Accrual entry, and where the already-saved accrual entries were deleted when performing a Recommit on the Rental Contract.
- Corrected copying the installment codes into the Payments tab when creating a single Receipt Voucher based on more than one Rent Installment Accrual Entry document (previously, only one installment code was copied).

### Contracting

- Addressed the system's rejection of creating a Contracting Supplies Purchase Invoice based on a contract that has a final Extract (by making this possible via an option).

### Human Resources

- Fixed an issue where absence days were not deducted from the basic salary when issuing the Salary Voucher, in the case of a Batch Leave voucher and unpaid leave existing.
- Fixed an issue in calculating the End-of-Service Dues Liquidation, where the same value of the Leave Dues Liquidation used to be added to it.
- Fixed an issue where the leave balance in the Batch Leave document differed from the leave balance before the leave started in the Leave voucher.
- Fixed an issue where editing/re-saving the Job Offer and updating the employee's data used to fail, with errors appearing about the employee not having a Job Offer.

### Point of Sale

- Corrected the coupon offers and discounts on the invoice value so they take the invoice classification into account.

### Mobile Applications

- Fixed an issue where the Check-In document disappeared from the app when the check-out fell on the following day, making it impossible for the employee to record the check-out despite the allowed number of hours being enabled in the app settings.

### e-commerce Integration (Magento)

- Corrected reading the invoice price from Magento to be the price before the discount instead of the price after the discount.

### Settings

- Fixed an issue where the (Run ID) code did not appear in the report when run from an entity flow, while it did appear when run manually.
- Fixed an issue where the field settings permissions configured for the employee (Hide Field) were ignored when a temporary permission profile existed for the employee, in both the legacy and the new interface.
- Modified the integration with Nami according to the API change, and addressed an issue where some accepted transactions appeared as rejected, and the transaction data did not return to the payment lines.
- Fixed an issue where the approval was not escalated to the backup employee (fallBack) after the specified time elapsed, despite the system Scheduled Task running.

### New GUI

- Fixed an issue where the date-range filter was cleared the first time, when clicking on the date before selecting the second date.
- Fixed the flicker issue and the redrawing of lines when selecting the page size in the embedded list view.
- Fixed an issue where (Loading) sometimes remained for a long time in the list view without finishing.
- Fixed an issue where the grid's height on the page shrank after pressing (Ctrl + Alt + I).
- Fixed a display issue in the Edit Log when canceling the timeline and scrolling down with the mouse wheel in the middle of the page.
- Fixed an issue where the action (Delete Selected Errors) did not work in the Machine file, and the message (There Are Unsaved Changes) appeared when navigating with the Next/Previous button without making any changes.
- Fixed an issue where some panels did not work in the (RARentalRequest) screen with the new interface, and where the systemically required fields (fromDateFromTime, toDateToTime) did not appear as required fields in the new interface.
- Fixed an issue where the error tooltip disappeared after clicking in the new blocks, and adjusted the default dimensions of the new dashboard widget.
- Fixed an issue where the (Delete) keyboard key did not work when clearing, in the new Screen Edit screen.
- Fixed an issue where the navigation keys (Home, End, Page Up, Page Down) did not work in screens and reports in the new interface.
- Fixed an issue where links overlapped with each other when using the Next/Previous buttons from inside the screen, when there is more than one link with criteria on a specific field.
- Fixed an issue where empty lines were mistakenly inserted when pasting into the item-code field, with the option (Enable Barcode) enabled.
- Fixed an issue where the legacy interface was used when clicking the (Open In Editor) button in the Screen Edit.
- Fixed an issue where the values of some fields were not sent correctly in filtered list-view links (such as committedBefore, documentFileStatus).
- Fixed an issue where sorting from the column header was not respected in the search-list table (SearchViewModify).
- Corrected the month names in date fields and parameters to appear in full.
- Fixed an issue where nothing happened when clicking the (Close Periods) button on the Fiscal Year page.
- Fixed an issue where the filtering and sorting of the list view were not retained for the user after logging out and back in.
- Corrected the default sort fields in links so they are respected when clearing filters and when switching between ascending and descending order.
- Corrected the order of the Notifications list so it does not appear sorted ascending when viewing all notifications.
- Fixed an issue where the Settings/Features list was duplicated.
- Improved the header's appearance in the Dashboard's interactive filter, and addressed issues with the (QuestionList) field for the types (Chips, Dropdown List), and the repeated grid refresh when opening a list-parameter field.
- Fixed an issue where an error appeared when saving the Indirect Costs file as a draft, and the file did not open in the new interface while it worked correctly in the legacy interface.
