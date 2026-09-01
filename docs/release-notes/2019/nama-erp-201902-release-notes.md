# Nama ERP Release Notes - February 2019

::: info Release Information
**Release Date:** February 2019  
**Release Number:** 201902
:::

## Additions

### Inventory
- Added a mechanism to export item images from the More menu in the Item file; the user selects some items and exports them as a compressed (zip) file. This feature can be applied to any file in the system by editing the screen with the identifier `exportSelectedFilesImagesWithCode`.
- Developed a mechanism to read the item code and the codes for versions, sizes, and others.
- **Reservation Document:** Added the two fields (To Employee, Photo To Employee), which can be shown on the window by editing a screen.
- Improved the Additional Receiving Costs document so that invoice lines containing service items are ignored.
- Improved the quantity and cost tracking settings in the Distribution Management settings so that dimensions are taken into account when viewing the Item Quantities and Movements list screen.
- Added the field `allowOverdraft` to the lines (not shown on the screen).
- **Inventory Count Closing:** Added the option "Calculate quantities by date and save" to the More menu on the list screen. The system will wait for the processing of all quantity movements to finish, and will then recalculate the quantities.
- **Inventory Count Closing:** Added the option "Consider warehouse movements on the same day as the inventory count closing (excluding adjustment movements resulting from the count)" to the Inventory Count Closing document.
- Created a Groovy entity flow on the Warehouse Issue Request document that runs on draft save; it adds the items available in the warehouse selected in the request document's header — for the shipment written in `description` — to the detail lines, with the full quantity of each item.
- Developed the `app mobile android` for collections, for use in collections.

### Sales
- Added the entity flow `EAReApplyQtyTrackingEffects` to fix an issue where the quantity did not move from the field `unsatisfiedQty.details` to the field `satisfiedQty.details` when creating an invoice against a Sales Order, with the invoice's term config tracking quantity based on quantity 1.

### Purchasing
- In some cases, the journal entry issued from the Warehouse Issue Voucher for a Purchase Return is incorrect.
- **Discount Adjustment Document:** If an invoice is selected in the document header and the same invoice is selected in the document details, the system doubles the discount on the same invoice.
- The document only works with a compound percentage discount, and does not work with a fixed percentage or a reduction.
- Improved the document so that the system identifies the discounts of the documents targeted by the discount adjustment and sets these discounts to zero.

### Contracting Installations
- **Contracting Quotation:** Reduced the space between the scroll and the Grid.
- **Terms:** Added the option "The stage can be edited".
- In each of the Contracting Quotation, Contract, and Payment Certificate: added a payments table and a payments form similar to the one in the Supply Chain documents.
- In each of the Contracting Quotation and Bill of Quantities: added a grid for the terms, since the terms may change and therefore cannot be defined inside the Standard Items file.

### Human Resources
- **Insurance Policy (Vehicles):** Improved the policy so that when an insurance offer is selected, both fields (Driver Insurance, Passenger Insurance) are filled in.
- **Vehicle Insurance Removal Voucher:** Added some fields to the removal voucher, such as (Add Driver Insurance, Add Passenger Insurance...etc.), working in a manner similar to the Addition Voucher.
- Added a new option for the salary item, "Redistribute the full value over the complete work periods"; this option distributes the item's value over the working days proportionally and does not take into account unpaid leave days or non-working days.
- **Dues Settlement:** Added the field Deduct from the paid leave period in the settlement (`dedFromPaidVacPeriodInDues`), which is enabled when the "without salary" option is not enabled.
- Added the following two fields to the Settlement document:
  - Annual Leave With Salary (`annualVacationWithSalary`), which includes leave of types with salary (the "without salary" option not enabled), and also where "Deduct from the paid leave period in the settlement" is enabled.
  - Net Paid Leave Period as required (`netPaidVacationPeriod`).
- Added the option "Consider permits when calculating overtime" to the Payroll settings.
- Added the option "Handle overlap between attendance, departure, and permits, giving priority to the longest duration" to the Payroll settings, with the priority ordered as follows:
  - Missions
  - Attendance & Departure file
  - Departure permits
  - Partial leaves (half day, quarter day, etc.)
- These priorities can be controlled from the following settings by setting an order (from 1 to 4):
  - Priority of missions on overlap
  - Priority of permits on overlap
  - Priority of attendance & departure on overlap
  - Priority of partial leaves on overlap
- Added the option "Redistribute the full value over the complete work periods" to the Salary Item file.
- Added a Total field on the line and made it editable by the user; the calculation was also changed to rely on the total.
- Added the option "Redistribute the full value over the complete work periods" to the Salary Item Type.
- Added the field "Contract End Date" to each of the following documents:
  - Job Offer
  - Bulk Job Offer
  - Update Employee Data
  - Employee screen
- **Employee Allocations Opening Voucher:**
  - Improved so that the credit side of the journal entry is on the item, and the debit side is the one selected in the document.
  - An option is required in the term config (No Accounting Effect).
- Changed the debit and credit accounts for salary items, penalty & reward vouchers, and penalty & reward types, and their application in the accounts form, as exists in the term configs.
- **Advance Voucher:** Added the list "Installment Period Type", which is (Monthly, Weekly).
- **Recalculate Allocations:** Added the following to the document's term config:
  - A grid in the document's term config containing (Number of Months From-To, Multiplied By, Divided By).
  - Added the option "No Accounting Effect".
- **Job Offer and Update Employee Data:** Added a criterion on the item lines.
- Added a table with the users to whom this assistance will be shown (an employee, a user, a user group, or a permission file can be specified), along with a list containing the two options (Allow - Deny), so that specific users can be prevented from using this assistance, or a specific group of users can be allowed (except for a specific user, for example).
- Added the option "Do not consider other months when calculating tax" to the salary item formula, so that the system does not balance the tax amount against previous months of the year, and instead the customer performs a settlement at the end of the year.
- Improved the "Employee Allocations Opening" voucher so that the employee's allocations are calculated by day rather than by month.
- Added a new button to the "Recalculate Employee Allocations" document to display the results before saving.

## Settings

- Added the group (Copy Lines With Based-On) to the term config for Distribution Management documents.
- Added the "Login Dimensions" grid to the User file, to give the user more than one permission, such as allowing them to log in to two legal entities.
- **Permission File:** Added the group to the lines, since the targeted type may exist in more than one group.
- Added the ability to define users with limited capabilities in the software license.
- Added (Report File Name Template) to the Report Definition.
- Moved the buttons for browsing reports to the middle of the screen to give them priority.
- Added the option "Allow uploading attachments without the need to sign in to Nama" to the Global Config.

## Fixes

### Inventory
- Fixed an issue where, in some cases, the system did not correctly add taxes to the Additional Receiving Costs.
- Fixed an issue where the action `CollectBoxsWithoutQuestions` and `CollectBoxs` did not work correctly; after collecting the quantities it copied the box number into the lot number and refused to save the document.
- **Inventory Count Closing:** Fixed an issue where, when closing an inventory count for a document that calculates quantities based on date, the system sometimes did not allow warehouse vouchers to be created, even though the count closing status was "Finished" or "Closed" and enabled.

### Sales
- Fixed an issue where, in some cases, the tax amount appeared incorrect.

### Purchasing
- Fixed an issue where an error sometimes occurred when saving a Purchase Invoice as a draft.
- Fixed an issue where creating a Purchase Invoice and clicking Collect Issue Vouchers caused the system to not collect the vouchers issued for the required vendor, and to display an error.

### Fixed Assets
- **Fixed Asset Opening Document:** Fixed an issue where selecting From Group to Group caused the system to suggest all the program's groups, instead of only the asset groups.

### Settings
- **Global Config:** Fixed an issue where enabling the option (If there is only one book for a document, use it directly when creating a new one) applied to both the book and the term config, even when the option (If there is only one term config for a document, use it directly when creating a new one) was not enabled.
- Fixed an issue where the tooltip was only shown on reference fields and lines, and a field such as Code or Name, for example, did not have the quick help working on it.
- Fixed an issue where running a report that contained a hyperlink pointing to a report that did not exist, or a parameter that did not exist in the referenced report, prevented the base report from running and showed an error instead. The fix ignores this check and runs the base report, only showing the error when the hyperlink is actually used.

### Human Resources
- **Salary Item:** The system no longer allows saving a "Salary Item" record if the user has checked the option "Not linked to working days".
- Fixed an issue where the system did not take into account the dimensions of the Reward/Penalty voucher.
- Fixed an issue where the system showed that the salary could not be issued because the employee was outside the issuance scope, even though the employee belonged to the salary issuance scope.
- Fixed an issue where, in some cases, an error appeared when issuing salaries saying the operation could not be performed; this was resolved by enabling the option `HandleOverlapBetweenAttendanceAndMissions`.
- Fixed an issue where a message appeared saying the operation could not be performed when recalculating allocations.
- Fixed an issue where employees whose status was On Leave but who had working days during the month were not collected when collecting employees into the salary record for a given month, even though the option "Collect only employees who are actively at work" was not enabled.

### Point of Sale
- Fixed an issue where an error appeared when entering a value in the Shift Work Time field (`workShiftTime.value`).
- Fixed an issue where, in transferring item data to the Point of Sale, the barcode existed on the item but was not transferred to the Point of Sale.
- Fixed an issue where an error sometimes occurred when posting Point of Sale invoice values to Nama.
- Fixed an issue where, if the item was set to have versions, and price lists were created with versions, and an item was selected in the price list without selecting a version, the version was transferred to the Point of Sale as Null, and as a result, on the Point of Sale, the item's price without a version number did not come through.

### Manufacturing
- **Vendor Voucher:** Fixed an issue where the tax on the line was not copied from the tax policy, whether from the term config or from the operation vendor, during data entry. This was fixed to work as in the Costs Voucher or the Expense Voucher in Letters of Credit, so that it works as soon as the vendor is entered on the line.
- Fixed an issue where the error (The operation cannot be performed) appeared when selecting the operation in the Production Order document, in some cases.

### Service Center
- **Product File:** Fixed an issue where the system initially calculated "Average Daily Kilometer Consumption" incorrectly.
- Fixed an issue where the message (Cannot close work order {0} because its status is {1}) appeared when creating a Work Order Closing document.

### General Fixes
- Fixed an issue where a deadlock error sometimes occurred in `NamaModules.getInstance`.
