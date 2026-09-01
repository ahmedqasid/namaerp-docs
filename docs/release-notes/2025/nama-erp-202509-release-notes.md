# Nama ERP Release Notes - September 2025

::: info Release Information
- **Release Date**: September 2025
- **Release Number**: Nama-ERP-202509
- **File Type**: Monthly Release Notes
:::

## Additions

### Purchasing

- Created a mechanism for balancing purchases.
- Added the following two fields to the Sub-Item Purchase Return term config screen and the Purchase Return term config:
  - allowPaymentOfInvoiceInstallementsWithReturn
  - addReturnToInvoicePayment

### Sales

- Added the `applyOn` grid to the `RewardPointsConfig` screen.

### Accounting

- In the `FinancialBudget` document, on the `FBudgetLine` lines, added 5 numeric fields for use in comparisons: (n1, n2, n3, n4, n5); they are not shown by default.

### Settings

- Added the option `useSignatureInApprovalAttachment` in Global Config to make Attachment 1 a signature.
- Added the following fields to the (Login Settings) page (`loginConfigPage`) in the System Settings screen (`ConfigEntry`) - Global Config
  - (login2FAMethod)
  - (otpLength)
  - (otpExpiryTime)
  - (otpResendDelay
  - (notificationFor2FAOtp)
  - (otpFormat)
  - (estidamahEnvironmentUrl)
  - (estidamahEncryptionKey)
  - (estidamahEncryptionIV)

### Point of Sale

- Added the Return number to a reference inside the notice in Nama; this happens when a Point of Sale Credit Note is created automatically from a Point of Sale Return and sent to Nama.

### Human Resources

- In the Official Holiday document, improved so that the leave is specified as a From Date and To Date instead of a separate line for every day, while keeping the existing data working as it is.
- Created a new screen named "Employee Evaluation Request" as a first step before using the "Employee Evaluation" screen.

### Manufacturing

- Added a new page to the Formula named Accompanying Orders.
- Added a new document named (Material Change).
- Added the following to the Production Order Closing document
  - Renamed the field Total Actual Product Cost to (Actual Product Cost)
  - Added the field Total Actual Product Cost (Actual Cost * Quantity of Products Delivered to the Warehouse)
  - Added the field Total Standard Cost (Standard Unit Cost * Quantity of Products Delivered to the Warehouse)
  - Total Standard Deviation of the Product (Unit Cost Deviation * Quantity of Products Delivered to the Warehouse)
  - Product Quantity Deviation (the difference between the quantity planned to be produced by the Production Order and the quantity delivered at the time of closing)
  - Standard Product Cost Deviation (Standard Unit Cost * Product Quantity Deviation)
- Added the Unit of Measure to the lines of the Standard Price document for Manufacturing, and the unit is now taken into account when closing the Production Order in the Standard Price.

### Real Estate

- In the Collect Document for the Real Estate module, added an option in the document term config to split the installment, similar to what exists in the Rent Contract term config and the Rent Installment Accrual Ledger.

### Mobile Applications

- The fields in the following documents are now respected when editing an app screen for them:
  - Departure Permit
  - Mission Voucher
  - Work Start Voucher
- Added the "Electronic Attendance Settings" window.
- In Nama Mobile, improved so that the home screen shortcuts can be controlled, with the ability to specify which documents should appear on the app's home screen.

### Reports

- Added the option `showCrossTabMeasuresHeaders` in the report builder tool.

### Service Center

- In the `MnNotice` screen, added the Payments line like `MnOrder`, and added a separate page for the payments.
- Created a new document named "Serviced Product Tasks Opening" to add the last meter reading for each of the product's tasks.
- In the Job Order, added a new button named "Group Tasks", which groups the tasks and raw materials together, provided the difference between the "Current Meter Reading" and the "Reading at Task Execution" (found in the `SrvCProductLastService` table) is less than the value of the "Repeat Every" field.
- In each of the (`MnNotice` and `MnOrder`) screens, in the "Services" lines, added the following fields:
  - Warranty Period Type `warrantyPeriodType`
  - Warranty Contract `warrantyContract`
  - Maintenance Contract `mnContract`
  - Warranty Duration (`warrantyPeriod.value`/`warrantyPeriod.uom`)
  - 3 fields for each of the following types (`ref`, `Boolean`, `Attachment`)
  - Contracting
- In the Contracting Price List, improved so that the prices are taken into account in the Contracting Estimated Budget document (`ContractingEstimatedBudget`), so that when the item is selected, the price appears in the cost.
- In the Contracting Purchase Order screen term config (`ContractingPurchaseOrder`), added the option "Prevent Applying the Effect of Contracting Costs and Quantities", so as not to affect the quantities and costs tables of the Analytical Card.
- In the Project Extract term config and the Subcontractor Extract term config, added the option "Comply with Contract Prices", so that prices cannot be edited in the extracts and the prices in the contract are complied with.
