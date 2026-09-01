# Nama ERP Release Notes - March 2026

::: info Release Information
- **Release Date**: March 2026
- **Release Number**: Nama-ERP-202603
:::

## Additions

### Inventory

- Added the Aggregated Transfer Request, AggrStockTransferReq.

### Sales

- Added the Rounding Discount effect in the term config of the Sales Return Request document.
- Added a namrep expression that can be used to display the customer's availableRewardPoints, the invoice's earnedPoints, and the customer's availableRewardAmount in reports and the print form, the same way they are used in Alerts and Approvals.

### Purchasing

- Added a field named "Payment Form" in both the Vendor and the Vendor Data Update Request.

### Accounting

- Added the field affectOnInvoicesPaymentValueFromField (Payment Value From Field) in both the Receipt Voucher term config and the Payment Voucher term config. This field holds the name of the field to be affected.
- Added installments to both the CreditNote and the DebitNote, along with adding the following Options in the term config
  - useInstallmentLinesForDebitAges
  - installmentEffect
  - DoNotApplyEffectsOnInstallments

### Human Resources

- Added an option in SalaryComponentType named "consider Late Return Days Without Salary".

### Point of Sale

- Integrated the POS with STC Points the same way it is enabled in the Nama Sales Invoice, and made the POS Return consistent with the Namasoft Return.
- Added the option "Used to Buy and Sell Loyalty Points" in the Payment Method, and when it is enabled and this payment method is used in the Return, the program converts the amount paid with this payment method into loyalty points.
- Made the Horizontal layout the default layout; to go back to the current layout, i.e. Vertical, the newly added option in the POS Interface Settings named "Show the Title Bar Vertically" can be selected.
- Added the option AllowPaymentFromTreasury in POSConfiguration. When the user enables it, they can use the Treasury in the document.
- Added a grid in the POS for querying the status of orders, which can be shown via the Menu -> Other Actions -> Query POS Online Order Status, or the shortcut ctrl+o.
- Added an entity flow named "EADeleteOldPOSOnlineOrderEntries", which must be used in a Scheduled Task to delete the orders after a certain number of hours have passed, so orders do not pile up.
- Added the option "Do Not Apply With Hold" to the lines of the POS Required Fields, so that any mandatory field is mandatory on both Payment and Hold, unless this option is enabled, in which case the field is mandatory on Payment only.
- Added a field named "Discount a Percentage of the Invoice with the Payment Method (in the Header Discount)" in the Payment Method file.

### Contracting

- Created the "Subcontractor Material Issue Request" document, "ContractorMaterialIssueRequest". This screen is like the "Subcontractor Material Issue" screen, "ContractorMaterialIssue", but without creating a stock issue and without accounting effects. When a Subcontractor Material Issue is created based on the Request, the data is pulled from the Request, with quantity-tracking tables on the Request that disappear from the "Based On" list after execution.

### Settings

- Removed the 124546K number format from the Dashboard's metric cards, so the number now shows in full with commas, e.g. 124,546,000.
- Created the entity flow EADeleteNotificationsByDuration to delete notifications, with a parameter to specify the duration and the type (Read Only or All).
- Added a field named maxNumberOfLinesWhenCollectTaxAuthDocs to the following screens:
  - Send Documents to the Tax Authority
  - Tax Authority Settings
  - Global Config

  and the priority follows the same order if the field is empty, or 750 if all the fields are empty.

- In the Shift Closing screen, added a new button named "Reprint the Last Shift Opening Document" next to the Reprint Document button.
- Accounted for the Receipt Voucher document in the integration with the Mada network via the Geidea service provider, using the same execution mechanism currently applied in the Sales Invoice document.
- Added the option "excludeServiceFeesWithNoConfigs" in the Tax Authority Settings.
- Added a table in the WhatsApp Messages Settings to allow linking the same settings to more than one instance.
- Added the following options to the Permission Profile screen - not shown by default; the screen must be edited to show them when needed
  - Allow Reissuing Accounting Effects
  - Allow Reissuing Stock Effects
  - Allow Syncing Files
  - Allow Re-saving Files
- Added the ability to fix the Arabic language on some fields, such as the Arabic Name, and fix the English language on some fields, such as the English Name.
- Added the option notifyFieldsOnlyExcludeResponsible in the (Steps) grid, to send the notification only to the notification field, without the person responsible.
- Added a Log to record user login operations at customers via the Namasoft CRM user, along with creating permissions to specify the branch or agent and the employees allowed to log in, either only for their own branches or with permission to view other branches, and the ability to create a report to review the Log results, filtering by CRM user or by customer, based on the license, within a specified time period.

### Manufacturing

- Added an option named (Use the Execution "To Date" as the Actual Date in Product Delivery) in the Production Execution settings to achieve the required behavior.

### Mobile Applications

- In the Mission voucher on the Nama Mobile app, Reference1 is now shown.
- Added the mobile device's location when sending the DeliveryDocument to Nama, to determine the delivery location for the document.
- In editing the app screen, in the fields grid, added an option named "Mandatory".

### Real Estate

- Added fields for the Premium percentage and value, and fields for the Garage percentage and value.

### New GUI

- Improved so that when exporting an Excel file, the program formats the data as an organized table, giving it a good appearance.
- In Quick Filtering, added the following updates:
  - Added an option for the filter to be a drop-down list
  - Added the active filter to the place url
  - Reduced the size of the filter on the mobile screen
