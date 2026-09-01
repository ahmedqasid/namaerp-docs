# Nama ERP Release Notes - January 2023

::: info Release Information
- **Release Date**: January 2023
- **Release Number**: Nama-ERP-202301
:::

## Additions

### Inventory

- Added an option to allow overdraft reservation in the Item settings, taking priority over the warehouse settings, in order to allow reservation when issuing Sales Orders for items that are manufactured.
- Improved Stock Taking Committees so that when generating the Stock Taking Committee lines from Electronic Stock Taking Committees, the system copies the warehouse and serial number from the Electronic Stock Taking Committee lines into the Stock Taking Committee.
- Prevented saving the Stock Taking Committee when there is no warehouse on the line.
- Added the option "Allow Overdraft in Reservation" in the Item settings.
- Improved the quantity aggregation action for the Stock Transfer voucher so that it retrieves serial numbers, if any.
- Item file - list screen - the (Update Selected Items' Classifications) action: Added the ability to update the brand as part of the "Update Selected Items' Classifications" action in the Items list screen.

### Sales

- The Paid in Cash value in the invoice header is now treated as a cash payment method; invoices where no payment method is specified are considered credit (deferred) with code others.
- Updated the status of documents sent to the Tax Authority.
- Added the option "Validate EGS Codes" to the Tax Authority settings.
- Added 5 attachments to the Sales Representative Update voucher.
- Added support for the Electronic Receipt mechanism as an alternative to the e-invoice, for the case where the invoice is issued to an individual customer.

### Accounting

- In the Financial Commitments list, added a button in the More menu named (Create Installments for Selected Vouchers).
- **Receipt & Payment Vouchers:** - The direct term config field for the fee value is now taken into account.
- **Receipt & Payment Vouchers:** Improved so that when creating a Financial Paper from within the document, the system takes the same dimensions of the voucher and matches them in the Financial Paper.
- When creating a Payment Voucher based on a Miscellaneous Invoice, fully paid invoices used to appear. Improved so that only invoices with a remaining balance appear.

### Real Estate

- **Partial Payment Voucher:** Added the Payments page, which now includes an Aggregate Payments button.
- **Partial Payment Voucher:** Added the "Installments Effect" list in the document term config, containing the options (None - Collected via Financial Papers - Collected Officially - To Be Collected), the same as in the Notice.

### Service Center

- Added 5 optional (Boolean) fields to the Traffic Letter Request, the Traffic Letter, the Car Delivery, and the Car Sales Invoice.

### Hospital Management System

- **Patient Admission Form:** Added a "Services" grid with the fields (Procedure Type - Invoice Type - Cost - Remarks).
- Added 5 attachments to each of the following documents:
  - Consultation Invoices
  - Patient Discharge
  - Admission
  - Medical Supervision
  - Medical Tests
  - Radiology
  - Surgical Operations
  - Physiotherapy
  - Pharmacy
  - Blood Banks
  - Medical Supplies
  - Medical Services
  - Medical Services & Supplies
  - Patient Form

### Human Resources

- In the scheduled task com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator, improved so that the system continues running the scheduled task when it finds an employee with no job offer or no shift file, completing the Time Attendance data entry for the employees whose data is complete, and showing an error message at the end listing the employees who have no shift plan or job offer.
- **Leave Type window:** Added a new grid named "Deduct a Percentage from the Elements".

### Manufacturing

- Added a voucher named "Bulk Production Order Closing Voucher".

### Service Center

- **Vehicle Item Receipt document:** Created a field in the Vehicle Item Receipt (Cancelled From Voucher, in which the cancellation number of the Vehicle Item Receipt is entered), similar to (Car Sales Order & Car Delivery & Car Traffic Letter Request).
- Added 5 Boolean fields to the Traffic Letter Request, the Traffic Letter, the Car Delivery, and the Car Sales Invoice.

### Point of Sale

- Added the option "Do Not Show Returned Lines When Selecting the Invoice" in both the Machine document and the POS Settings document.
- Changed how the option "Customer Mandatory in POS" works, so the field is mandatory when no subsidiary is selected for the document, and not mandatory when a subsidiary is selected in the Subsidiary field, via an option named (Customer or Subsidiary Mandatory in POS).
- Added a new window named Return Reason in the main Nama interface.
- Added a new field named Return Reason to the header of POS invoices, and also created a field named Return Reason in the POS lines. They can be selected from the new POS interface settings for returns and exchanges.
- Applied the effect of the option (Return Invoices Within (Days)) in the Machine settings to the filtering in the Sales Returns window when selecting a specific invoice.
- Added lines named Items Counted with Each Shift in both the POS Settings and the Machine settings.

### Settings

- Developed an entity flow that allows importing attachments from one database to another based on the document code.
- Added an entity flow named "EARunManualNotificationFromQuery" that runs a manual notification on a set of files or documents from a query.
- Added the "View Record" action - similar to updating computed fields, but due to the sensitivity of this action it was made available only through the option "Enable Record View Entity Flows" in Global Config.
- Increased the number of entity flow inputs to 15 instead of only 10.
- In the Required Fields screen, added a grid named "Ignore Required Fields When".
- Made it easier to select sort fields, criteria, and displayed columns when editing the screen (list shape and selection list).
- In the Data Purge screen - the creation date is now taken into account so files are deleted from newest to oldest.
- Improved the Quick Help tool so the F9 key is used to hide the tooltip just as it is used to show it.
- Added the following two fields in Global Config:
  - Custom Template for Dimensions Description (Arabic)
  - Custom Template for Dimensions Description (English)
- Improved the entity flow for generating an (OTP) so that it is possible to control whether the generated code consists of digits, digits and letters, or letters only.

### Mobile Applications

- Created a new document named "User Phone Definition Voucher".
- Added the following vouchers to the "nama mobile" app:
  - Visit Voucher - the document type (voucher or request) is controlled from the app settings.
  - Return to Work Request
  - Exit & Re-entry Visa Request
  - Service Termination Request

  Sending to Nama (request / voucher) will be controlled from Mobile Apps Configurations.

- Added both "Representative Signature" and "Customer Signature" to the Visit Voucher.

### Reports

- Modified the Item Profitability report "SYSR-SLS001" so that it takes into account both official and unofficial documents.
- Added two fields to the report definition to hide the headers and footers of specific groups or all groups.
