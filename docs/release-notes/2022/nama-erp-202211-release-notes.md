# Nama ERP Release Notes - November 2022

::: info Release Information
- **Release Date**: November 2022
- **Release Number**: Nama-ERP-202211
:::

## Additions

### Purchasing

- **Purchase Price Comparison Window:** Improved the document so that the best price for the item is selected based on the net amount after deductions.

### Accounting

- Added the field "Margin to Prevent Changing the Nature of the Account Balance" to the Accounting settings

### Customer Relationship Management (CRM)

- Added a button named "Create a Price Quotation for Items Without a Price".

### Manufacturing

- In the Final Product Pricing window, by-products from the Components Card are now shown on the pricing screen and deducted from the total costs.
- In the Manufacturing settings, the following options were added:
  - Consider the size when searching for operations and product components in planning
  - Consider the Box when searching for operations and product components in planning
  - Consider the Lot when searching for operations and product components in planning
  - Consider the version when searching for operations and product components in planning
  - Consider the color when searching for operations and product components in planning
  - Consider the effective ratio when searching for operations and product components in planning
  - Consider the non-effective ratio when searching for operations and product components in planning

  When these options are enabled, the dimensions of the same name are considered on the lines.

### Real Estate

- Added the option "Do Not Create an Accounting Entry for Other Fees Lines" in the "preventAccEffectsForOtherFeesLines" table.

### Hospital Management System

- Added a new window named "Indirect Medical Cost Item".
- Added a new window named "Indirect Medical Costs List".
- Added a new document named "Actual Indirect Medical Cost Calculation".
- Added the "Indirect Medical Cost Items" grid to the hospital invoices.
- Added a field named (Item Sent to the Tax Authority) to the term config of the following invoices:
  - Examination Invoice
  - Stay Invoice
  - Companions Invoice
  - Medical Supervision Invoice
- Added the same field above to the following screens
  - Medical Service
  - Lab Test Type
  - Physiotherapy Type
  - Operation Type
  - Surgical, and Radiology Type

### Human Resources

- **Dues Liquidation Document:** Added a field for the total value of the Salary Vouchers payable with the liquidation.
- **Dues Liquidation Document:** Changed the document's term config so that the total of the field (Total Salary Voucher Values) is included in the Effect Settings grid.
- **Dues Liquidation Document Term Config:** Added the Debit Total Salary Vouchers and Credit Total Salary Vouchers fields.
- Added a new document in the Car Insurance group named "Car Insurance Installment Accrual Entry". This document is created automatically from a (Car Insurance Policy or Car Insurance Addition Voucher) via the term config.
- **Liquidation Components:** Improved so that the financial effect is based on a criterion, similar to the one in the Salary Component. This was done by adding a grid for the financial effect containing the following information:
  - Employee File Criterion
  - Employee File Query
  - Dues Liquidation Document Criterion
  - Dues Liquidation Document Query
  - Debit
  - Credit
- Added the option "Allow Saving a Data Update Document When the Balance Is Exceeded" to the Human Resources settings.
- In the Liquidation Component, the following options were added:
  - Used with Contracting Cost
- In the Dues Liquidation Voucher term config, the following was added:
  - Use the Document as a Cost Source in Contracting
  - Debit Contracting Cost
  - Credit Contracting Cost
- Added the following fields to the Employee Provisions Recalculation Voucher term config
  - Use the Document as a Cost Source in Contracting
  - Debit Contracting Cost
  - Credit Contracting Cost
- Added 5 more attachments to the Car file.
- **Loan:** Added the following fields to the Required Conditions table:
  - The value of the last Salary Voucher before the loan (Greater Than or Equal - Less Than - the components to be considered) - taking into account the component's base value (baseValue), to handle non-working days and unpaid leave.
  - The loan value (Greater Than or Equal - Less Than).
  - The Loan Voucher date (From - To)
  - The option "Ignore the Required Conditions in the Loan Voucher" in the term config of the Loan Request and the Loan Voucher.

### Fixed Assets

- Increased the number of attachments in the Fixed Asset screen to 10.

### Contracting

- **Standard Condition File:** Added a new value to the "Value Type" list named "The Value Is a Custom Formula".
- **Standard Condition File:** Added a new option to the Value field: "Custom Formula".
- **Standard Condition File:** Added the following fields:
  - A dropdown list named "Custom Formula Lines Source" containing the following values:
    - The Current Extract's Lines
    - The Previous Extracts' Lines
    - The Current Extract's and the Previous Extracts' Lines
  - Added a grid named "Custom Formula Details"

### Mobile Applications

- Added a shortcut to the Approvals screen on the home page.
- Added the swipe action feature to the Approvals screen.
- Added the following options to the applications settings:
  - Allow Editing the "Electronic Receipt" Document for Those With Permission
  - Allow Editing the "Electronic Stocktaking" Document for Those With Permission
  - Allow Editing the "Electronic Attendance" Document for Those With Permission
  - Allow Editing the "Electronic Permission Request" Document for Those With Permission
  - Allow Editing the "Electronic Leave Request" Document for Those With Permission
- Added the option "Confirm Electronic Attendance and Departure by Fingerprint" in the applications settings
- Improved customer creation through the application; also improved Delivery so that only the information of the employee linked to the user is retrieved, and the default currency is now inserted without needing to be selected.

### Settings

- Prevented the following entity flows from running more than once at the same time
  - com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImportIntoDocument
  - com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImporter
  - com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator
  - com.namasoft.importer.SQLImporter
- Added attachments to both of the tables
  - PriceVotingDoc
  - PriceVotingFile
- Changed reference fields to behave like text fields when creating composite fields for lines via Edit Screen.
- Added Number fields to the ItemDiscountLine table
- Added a parameter to distinguish by location, "Consider Locator", for the entity flow com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem
