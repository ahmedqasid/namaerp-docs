# Nama ERP Release Notes - August 2025

::: info Release Information
- **Release Date**: August 2025
- **Release Number**: Nama-ERP-202508
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- When performing a Warehouse Issue based on an Operations Invoice, the lines are not expanded and no data is shown. Improved so that when using any Hospital invoices as the based-on document for the Warehouse Issue, the lines are expanded.
- Added the following options in the Supply Chain document term configs:
  - Do not filter the Sub-Item by what is available in the document it is based on.
  - Do not copy the line data when selecting a Sub-Item that already exists in the document it is based on.
- In the Issue Request, added 5 `description` fields in addition to the existing ones.
- In the Supply Chain settings, improved so that if the option "Check Overdraft by Date" is enabled, it can only be removed by a `crm L2` user.
- Added Color, Version, and Size to the Details group so that an item can be identified with a specific color and linked to a specific warehouse and location.
- In the Disbursement Voucher, improved so that when the Related Subsidiary `{relatedSubsidiary}` is selected, the financial papers are shown in the `{fblines.financialPaper}` field whether the Related Subsidiary inside the financial paper is the same as the Related Subsidiary inside the Disbursement Voucher, or the Related Subsidiary inside the financial paper is empty.

### Sales

- In loyalty points, added a new file named "Prevent Calculating and Redeeming Loyalty Points".
- In the Sales Order, Sales Invoice, and Sales Return screens, in the Payment Methods grid, references 1, 2, and 3 must be added.

### Fixed Assets

- Added 5 `ref` fields to the lines of the Consolidated Asset Transfer document, and they are copied to the generated vouchers (they are not shown on the screen by default).

### Settings

- Split the old option into two options in the User and Permissions file:
  - Allow PDF Printing Only for Screen Templates
  - Allow PDF Printing Only for Reports
- In Criteria Based Validation, added (With Approval) on the lines, and also added the columns (Approval Definition: shows only the approval definitions that have the same document type, and Step Number); if the Approval Definition is left empty, the validation works with all the approvals on the document.

### Point of Sale

- Added the permission "Ability to Open a Shift" as well as the permission "Ability to Close a Shift", but they can only be used in the lines of the Point of Sale Permissions file.
- Added the option `UseSizeAndColorAttachmentAsImageInPOS` in the Distribution Management (SC) settings. Please use it.

### Human Resources

- In the HR settings, added the option "Prevent Creating More Than One Liquidation Document on the Same Liquidation Date", so more than one liquidation cannot be made for the same employee with a (Liquidated Until Date) earlier than the (Liquidated Until Date) on another voucher. It will also prevent editing the following fields after the first save (Employee - Liquidated Until Date - Leave Liquidation Type).
- In the Work Schedule, added a new grid named Weekly Holidays.
- Added an entity flow named `EAChangeEmployeeStateFromFiringHandler`. It is used in a scheduled task.
- Added a list view inside the Employee screen, in the Statistics tab, for the Work Schedules linked to the employee, or, if the employee is empty, linked to the employee's Administration, Job Department, and Employee Group.
- In the Time Attendance screen, the (Add Employees Manually) button now has an added option: (add the Work Schedule to Reference 1, and add the Attendance File to Reference 2).

### Manufacturing

- Added Materials Totals lines to the Formula screen.
- Added a new document named Standard Price.
- Added the following to the Production Order Closing document:
  - In the header (Standard Unit Cost of the Product - Actual Product Cost - Deviation of the Standard Cost from the Standard) and added two accounting sides to the Deviation field.
  - A grid named Materials Deviation.
  - A grid named Resources Deviation.
- In the Actual Indirect Production Costs document, added a field in the Actual Indirect Costs grid named Indirect Cost Deviation (the difference between the Estimated and Actual indirect costs).
- Added the option "Calculate Deviations on Save" in the Production Order document, to enable calculating deviations when the Production Order is closed.
- Added the following fields to the Consolidated Production Orders Closing and Consolidated Product Delivery screens:
  - n1, n2, n3, n4, n5.
  - description1, description2, description3, description4, description5.

### Customer Relationship Management (CRM)

- In the New GUI, added a button in the list view screen editor below the toolbar, which can be linked to a GUI action.
- Added a Transfer button; selecting a group of Leads from the list and clicking it opens a pop-up with a reference to Sales Employees to transfer the customers to, and the button carries its own permissions.
- Added a button to change the Lead status.

### Mobile Applications

- Added the option "Works Automatically in the Mobile App".
- In the Nama Mobile app, made the Purchase Invoice work exactly like the Sales Invoice and the Sales Order, taking into account the option "Copy Details from Based On" found in the Mobile Applications settings.
- Added the "Item Price Inquiry" screen, with the ability to print it using more than one print template; the template can be selected from the screen before printing.
- In the Mobile Delivery app settings, added the option "Number of Previous Days to Search for a Transaction Document".

### Real Estate

- Added the (Commissions) grid to both the Waiver Voucher and the Waiver Request, and it is copied when creating based on another document.
- In the Waiver Voucher term config, added the option "Reverse the Accounting Effect of the Commissions".
- Added the field "Actual Date of the Accrual Journal Entry" to the Rent lines in the Rent Contracts and Opening Rent Contracts screens.
