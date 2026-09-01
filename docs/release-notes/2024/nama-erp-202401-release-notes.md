# Nama ERP Release Notes - January 2024

::: info Release Information
- **Release Date**: January 2024
- **Release Number**: Nama-ERP-202401
- **File Type**: Monthly Release Notes
:::

## Additions

### Sales

- In the Sales Return Request document, an accounting effect was created for the return request.
- In Sales Quotations, improved so that the invoice classification is considered in quotation invoices.
- Attachments were added to the After-Sales Quotations file.

### Accounting

- Cancelling a commercial paper is now allowed if it has been partially paid.

### Manufacturing

- In the Planning document (MRPDocumet), a sourceLineId field was added to the requiredLines lines, so that when a "collect" operation is performed, the line ID is copied from the lines it was created for.
- In the lines of the MRPSalesForecasting document, a field named totalForecastedQty was added, which sums the total value of the forecastedQty fields on the line.
- Two fields were added to the Planning document (MRP document) term config, named productionDocType and purchaseDocType.
- Date- and time-related modifications were added to the Planning (MRP) document.

### Contracting

- In the Estimated and Executive Budgets - Items grid: updated so that when a standard item is selected, the tax is inserted from the tax policy.
- A new document named "Subcontract Amendment" was added.
- 5 numeric fields (n) were added to the item lines in both the Project Contract and the Subcontract.
- In the Standard Condition, the option "the condition value can exceed the value planned in the contract" was added.
- In the header of the Term Analysis Card window, the fields (Item Code - Item Classification - Item Classification 2) were added, so that on save they are copied to the lines.
- In the Term Analysis Card window, the following was added:
  - A term config that includes the options (Split lines for item revisions - Split lines for item sizes and colors - Call Post Action Of Field After Spreading Revisions Or Sizes).
  - Fields specific to color, size and revision were added on the lines.

### Human Resources

- Improved the Job Offer so that lines are copied when a job offer is created based on a job applicant.

### Real Estate

- A new file named Real Estate Investment Commission Type was added.
- In the Rent Contract term config, the following was added:
  - Allowing the rental of sold units, lease contract
  - A button named "Create a Payment Voucher for the Selected Installments"

### Settings

- Saving groups is now prevented if the suffix length exceeds 15 digits.
- The New GUI was made available to all customers in the main release.
- Control over the maximum log file size, as well as the maximum number of files to keep, is now allowed via the "Nama.Property" file, through the two lines:
  - max-log-size
  - max-log-files-count
- In the "Send Documents to the Tax Authority" document, the following improvements were added:
  - The remaining dimensions (Branch - Sector - Department - Analytical Group) are now considered exactly like the Legal Entity when grouping documents by book.
  - Dimension fields were added to the line fields.
- Improved the integration with the Zakat, Tax and Customs Authority, by adding fields specific to the Zakat Authority, and an option was added in Global Config to control the display of the fields for both E-Invoicing and the Zakat Authority.
- Improved the printing services by adding the following fields:
  - A text field named "Selected Printer", from which the printer name is copied.
  - A text field named "Progress Message", which displays a message showing the number of printing attempts.
- Service fields present on invoices and returns were added, in connection with the Zakat and Income Authority in Saudi Arabia.
- The ProjectAdvancePayment and ContractorAdvancePayment documents are now considered when sending to the Zakat and Income Authority, taking the term as the item, and the tax account and amount from the document.
- The tax policy on items is now considered when sending data to the Tax Authority, since there are zero-tax items and tax-exempt items.

### Point of Sale

- The "Sales Representative" field was added among the line fields of POS documents (POS Sales Invoice / POS Sales Returns ...), since some invoices have more than one representative depending on the salesperson per department, so the representative can be selected manually on the lines, while an empty representative field on the lines is automatically updated from the representative field in the document header.
- The searchDialogRecordsCountPerPage option was added in POS Settings.
- A button was added to the POS menu to enable image display, so that the requirements for displaying images are set automatically, such as (useImages, guiserver, and imagesFolderPath).

### Mobile Applications

- A dedicated maintenance app was developed.
- A new document named "Maintenance Routes" was created.
- A new document named "Maintenance Plan" was created.
- In the Unified App, the ability to download documents or share them directly was added.
- In the Unified App, documents in the list view are now sorted in descending order instead of ascending.
- **Captain Order App:** A new option named "Do not verify the reservation date and time" was added in POS Settings.
- A Phone ID document field was added to the lines of the "create documents and files from the app" settings, under the Unified App settings.
- The Electronic Attendance Records list and the lists of documents saved from the app are now read directly from the server.

### Reports

- **Report Wizard:** The ability to have a Merged Cell field in the table header was added, to be used as a title spanning more than one column in the table header.
- All the field lines' fields were added to the Group Header and Footer custom expression lines, and to the Crosstab Rows and Crosstab Columns lines, and they are now processed.
- The ability to design the print form for POS documents (POS Sales Invoice) was added via the Printing Form Wizard, where an option named (used In POS - Used in POS) was added.
- An option was added in the Report Wizard to give priority to sort fields over group fields in the Order By.
