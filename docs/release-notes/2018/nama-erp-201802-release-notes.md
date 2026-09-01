# Nama ERP Release Notes - February 2018

::: info Release Information
**Release Date:** February 2018  
**Release Number:** 201802
:::

## Additions

### Inventory
- In the Stock Receiving voucher's term config, added the option **"Allow purchasing versions from a different vendor"**, for making a manual purchase receiving against a different vendor.
- When creating a Stock Opening voucher, the field details.ref4 is not copied from the lines to the receiving voucher.
- **Additional Receiving Costs:** Copied the tax percentage, currency, and rate from the main page to the manual distribution, both on entry and on save.
- **Stock Issue Request:** Sometimes some items do not appear when searching for items.
- Added the option **"Search for the item by Box or Lot"** in the Distribution Management settings.
- Added stock voucher aggregation to Sales and Purchase Returns, as in the Sales and Purchase Invoices.
- Showed reservation movements inside the item, like quantity movements.
- **Packing Voucher:** Calculated additional costs on the raw material quantity in the issued lines grid view only, without calculating them on wastage and sorting.
- **Additional Receiving Costs Voucher:** Added fields for the total tax and the total before and after taxes.
- **Distribution Management Settings:** Added the option **"Treat custom item codes as alternate codes"**.
- **Item Aggregation Methods:** Introduced the following improvements:
  - Copy the unit on entry
  - Do not suggest any quantities in the post action, whether for the first line or others
  - On save, copy between the default, minimum, and maximum quantity when one of them is left empty
- Added a Status field to the Stock Issue Request (can be shown via screen customization).
- Allowed deleting the Additional Costs voucher, removing it from the Multiple Packing voucher.

### Sales
- Added the tax policy to the term config of both Sales and Purchase documents.
- Added 10 options to the Customer file for use when needed.
- Created an entity flow to post a journal entry for the tax due on a specific discount, for both sales and returns.
- In Global Config, added options for calculating Discount 3 percentage of value up through Discount 8 percentage of value.

### Accounting
- In the Payment Voucher and Receipt Voucher term config, added the account code from the portfolio.
- Improved the tax policy so that it can be a subsidiary with its own accounts.
- Added a new reference at the line level for the (Journal Voucher, Receipt, Payment) vouchers named the Tax Policy, with the ability for it to appear in system journal entries, and added it to the accounting term configs.
- **Payment Voucher:** Improved the Payment Voucher so that when issued based on a Payment Order, description1, 2, 3, 4, 5 are copied from the Payment Order to description1, 2, 3, 4, 5 in the Payment Voucher, as well as collector and remarks.
- Added the option **"Use all years in calculating the actual"** to the Budget Scenario file, allowing years to be disregarded when calculating actual values.
- Added lines.narration2 and showed lines.text1 in the system journal entries for Accounting documents (Journal Voucher - Receipt - Payment).
- Added payment documents to the Miscellaneous Invoice.
- **Accounting Settings:** Added the option **"Track the paid amount in Receipt and Payment requests in local currency"**.

### Banks
- Made the Deferred Bank Portfolio return allow returning to the Bank Portfolio in addition to returning to the Deferred Bank Portfolio, so that each of the two cases has its own separate term config and book in the document's term config.
- Showed the Bank, Letter Type, Value, Coverage Value, and so on fields in the Letter of Guarantee list view.
- Prevented saving the **"Amend Letter of Guarantee"** document before the Letter of Guarantee is issued.
- Added the following fields to each of the Issue Letter of Guarantee, Amend Letter of Guarantee, and End Letter of Guarantee vouchers:
  - Tax 1 percentage on fees
  - Tax 1 value on fees
  - Tax 2 percentage on fees
  - Tax 2 value on fees
- Also made the following changes to the document's term config:
  - Added the two fields **"Tax Policy"** and the option **"Tax is editable"**
  - Added debit and credit for the value of Tax 1 and Tax 2 on fees

### Human Resources
- **Advance Voucher:** Registered the following fields (which previously existed only on the screen) in the database, so the user can show them in the list view, selection list, reports, and form:
  - installmentDetails.paidInstallmentsCount
  - installmentDetails.exemptInstallmentsCount
  - installmentDetails.remainInstallmentsCount
  - installmentDetails.totalPaid
  - installmentDetails.totalReliefValue
  - installmentDetails.totalRemaining
- Added the following options in the HR settings:
  - Prevent creating a Departure Permit when there is no work schedule
  - Prevent creating a Business Trip voucher when there is no work schedule
  - Prevent creating a Leave voucher when there is no work schedule
- Even though the option **"Do not mark the Purchase Request as processed"** is enabled, its status still changes to Processed and it cannot be used again when creating an Agent Claim based on a Purchase Request.
- Added the field **"Manual"** to the Advance Voucher.
- **Bulk Reward - Penalty Voucher:** Added the issue date to the lines, with the ability to carry it to the created voucher as the actual date.
- Added the tax policy and added it to the document's term config (debit side - credit side) for each of:
  - Insurance Company Approval voucher
  - Insurance Employee Addition voucher
  - Insurance Employee Removal voucher
  - Insurance Employee Promotion voucher
  - Insurance Compensation voucher
- Also added the following options:
  - An option to calculate the tax before the reduction (if true, the tax is calculated before the reduction; if false, the tax is calculated after the reduction)
  - Added an option allowing the tax to be updated manually
- Added the files (Car Brand, Car Model) (selecting the Car Brand is mandatory).
- **Insurance Offers Request screen:** Added two new insurance categories.
- Added the ability to create a salary item for the daily wage, selected within the item type, which is placed in the employee's salary items at the value of the day's wage and multiplied by the number of work days.
- Changed the equation calculation method, and removed the Reward/Penalty calculation factor (number of applications) from the equation.
- **Leave Liquidation document:** Made substantial modifications to the document.
- Added the following two fields:
  - Partial first check-in time in the EmpAttendanceSysLine table
  - First check-in time of the day, last check-out time of the day in the EmpAttendanceSysLine table
- **Reward/Penalty voucher:** Changed the group name (document type) to: Reward/Penalty Details, and also changed the id, since the id duplicated one of the screen's fields (document Type).
- **Work Schedules:** Improved so that the dimensions are not filled in on the lines when the document header is General, on save.
- Added dimensions at the line level in the Vehicle Data Update vouchers, to update the vehicle's dimensions.
- **Bulk Reward - Penalty Voucher:** Added the following modifications:
  - Made the actual date available at the line level, filling in empty lines on save with the actual date from the document header, with the actual date of the automatically created documents being the actual date found on the lines
  - Added a field to count the number of rewards/penalties of the same type for the same employee across the full fiscal year, and copied it to the automatically created Reward - Penalty voucher
  - Added a note at the line level that is carried to the note in the automatically created voucher
- Added the option **"Pay installments in order"** to the Sales Contract term config.
- **Job Offer and Employee Data Update screen:** Added the medical insurance category, carried to the Employee screen on save if not empty.
- Developed a Bulk Reward voucher where each line contains an employee and a reward type, and the system creates a Reward voucher for each line.
- Added some fields specific to the Exit & Return Visa Request data, along with extension data.
- Added dimensions to the Manual KPI Values screen and the Payroll Record screen, from Job Grade to Job Grade.
- Added the ability to schedule advance installments across 2 pay periods.
- Added 10 text fields to the Employee.

### Auditing
- Added a button for creating Work Program files from the AUFSA screen.
- Moved Review, Follow-up, and Execution to the main screen inside the Description screen, and also added Account Group 2.
- Changed the name of the Company Trial Balance inside the Work Program screen to Account Group Analysis.

### Contracting
- Added the tax, net before tax, and net after tax to the (Extract, Contract) documents.

### Manufacturing
- **Direct Costs screen:** Added a type (value per raw material quantity), which can optionally be linked to a (raw material) item.
- When making an item return, it is not deducted from the cost.
- Added the option **"Use raw material documents with the Preliminary Production Order"** in the Manufacturing settings.
- Changed the error message in the Execution voucher for insufficient quantity to write the available quantities, showing the available quantity in the Issue Without Balance (Overdraft) message in stock vouchers.
- Added the field **"Sourcelineid"** to the Resource voucher lines, to allow joining on it from the Execution voucher lines.
- Added the ability to cancel and apply reservation on all documents that perform reservation, and on the Production Order.
- Added the option **"Take Based-On into account when aggregating documents"** in the term config of each of (Sales Invoice - Purchase Invoice - Sales Return - Purchase Return).

### Point of Sale
- Added tax settings at the machine level, since some showrooms require selling without tax.

### Letters of Credit
- Added the option **"No effect on costs"** to the Expense Item window.

### Real Estate
- Added **"Installment Percentage"** to the Real Estate Payment Model, taking it into account when used in contracts.
- Added a note at the line level that is carried to the note in the automatically created voucher.
- Added the option **"Pay installments in order"** to the Sales Contract term config.
- **Job Offer and Employee Data Update screen:** Added the medical insurance category, carried to the Employee screen on save if not empty.
- Developed a Bulk Reward voucher where each line contains an employee and a reward type, and the system creates a Reward voucher for each line.
- Added some fields specific to the Exit & Return Visa Request data, along with extension data.
- Added dimensions to the Manual KPI Values screen and the Payroll Record screen, from Job Grade to Job Grade.
- Added the ability to schedule advance installments across 2 pay periods.
- Added 10 text fields to the Employee.
- Added **"Start Installment After"**, which is a period (type and duration), from which the installment start date is calculated when the model is selected.
- Added the Payment Model to Real Estate vouchers — updated from the property when the property is selected, and when selected, the installments are updated based on the model.
- **Salary Voucher:** When an employee's service ends, added the following improvements to the Salary Voucher:
  - When issuing the salary, the From Date on the Salary Voucher lines should be (the start of the salary period), and the To Date on the lines should be (the End of Service Date on the Employee screen, if any)
  - Allow issuing a salary for an employee whose status is Resigned, provided the end of service date is after the start of the salary period, with the period calculated as in the previous point (from the start of the salary period to the end of service date)
- **Rent Contract term config:** Added the following two options to the term config settings lines:
  - Not used with current year lines
  - Not used with following years' lines (deferred revenue)
- Made the Payment Model field appear automatically in the Land Plot file.
- **Maintenance Expense voucher:** Improved the document so that the property in the document header is not mandatory and can be left unselected.
- Improved the system so that when a financial paper for a specific installment is cancelled, the amount in the "collected via financial papers" field is also cancelled.
- **End Rent Contract screen:** Copied the default currency into the Currency field by default.
- **End Rent Contract screen:** Copied the insurance value if it was not collected in the contract, with the field non-editable by default, and set zero in the (Insurance Deduction Value) field, with the field editable if the user wishes.

### Point of Sale
- Added the field **"Fraction Discount"**, a value-only field used to discount halalas or piasters (small fractions); the name can be changed via the Translation Overrider.
- Added a new option in the Point of Sale settings, **"Add the fraction reduction field to sales"**, which must be used to show the reduction in Point of Sale.
- Added the option **"Copy the fraction reduction to"** in the Point of Sale settings.
- Added the **"Discounts Coupon"** page to the Receipt Voucher generated from Point of Sale.

## Settings

- In calculating taxes on payment methods, added a From Date and To Date for the tax calculation.
- Added the field **"text1"** to the Attendance document, and also added a new function to import text values when importing from the fingerprint machine.
- Added a font size and font type for lists, and also added font colors, in the Global Config window.
- Added the following two actions to the Utils.html page:
  - Upgrade To Latest Release
  - Force-Online
- Also showed the steps currently being executed, so the progress of the release download can be tracked through the link.
- Improved some windows (such as the Detailed Note window) so that the system does not show the **"Add and Cancel"** buttons until after saving and the discussion and attachment fields appear.
- Allowed adding a button that runs a system action (such as Lot Aggregation - Quantity Aggregation) to screens via screen customization.
- Added the tax settings found in Global Config to the Tax Policy screen, with an option for those settings to come from the Tax Policy details, the Tax Policy header, or from Global Config.
- In Reports, added the ability to access a link for a modified window (copied via list customization).
- Created a mechanism to calculate a region's costs based on another region's costs.
- Improved the system so that when an error appears due to a criteria validation, the line numbers can be shown in the error message.

## Fixes

### Inventory
- Fixed an issue where, after unchecking the reservation flag in the term config and then re-saving any voucher that performs reservation, the reservation was not released even when pressing Cancel Reservation.
- Fixed an issue where the tax percentage in the Expense Item was copied into the tax value field rather than the percentage field in the Expenses voucher.
- Fixed an issue where the system calculated the tax percentage from the local amount, yet posted the system journal entry for the tax in foreign currency, causing the tax value to double.
- Fixed an issue where the tax could not be edited even though the option **"Tax can be edited in the term config"** was enabled.
- Fixed an issue where the system allowed saving an item with units that had no conversion between them, and an empty error message appeared when using that item with a unit that had no conversion to the main unit.
- Fixed an issue where the Stock Transfer Request allowed saving with a destination warehouse that has locations, without selecting a destination location, causing processing to fail.
- Fixed an issue where entering an item's price in a price list with a version not found in the item's master file was accepted on save; the correct behavior is to prevent saving a price list containing a version not found in the item file.
- Fixed an issue where the Multiple Packing voucher did not calculate the cost correctly.
- Fixed an issue where the unit cost in Multiple Packing did not work.
- **Aggregation Voucher (Production Order):** Fixed an issue where, in cost distribution, all raw materials took the same issue cost at production, with the remaining cost charged to the raw material.

### Purchasing
- Fixed an issue where an error sometimes appeared when creating an Aggregated Purchase Request.

### Sales
- Fixed an issue where cancelling a Sales Order (used as a reservation receipt) showed a success message, implying the reservation was cancelled, when in fact the goods remained reserved and could not be sold.
- Fixed an issue where the price was not updated when selecting the price dimensions (1..5).
- Fixed an issue where an error sometimes appeared when creating a Sales Invoice based on a Sales Order.
- Fixed an issue where the Sales Order had fields shared across pages, and when a permission hiding page 1 was set for a user, previously saved Sales Orders appeared without data when opened.
- Fixed an issue where, when the system was configured to allow exceeding the linked document's quantity (e.g. a Sales Invoice of 110 based on a Sales Order of 100), the system did not honor the allowance to exceed it, whereas in this example the (delivered quantity should be 100) and the remaining = -10.
- **Sales Returns - Stock Vouchers page:** Fixed an issue where the system did not allow aggregating Receiving vouchers, and did not allow selecting or entering the Receiving voucher number except through the Based-On field only.

### Accounting
- Fixed an issue where Budgets did not change the number in the Actual when no movements had been made on the account and dimensions.
- Fixed an issue where the Based-On in the Bank Notice contained only the Fixed Asset Purchase voucher and the Miscellaneous Invoice.
- Fixed an issue where, when creating a Receipt Voucher and defining the financial paper from the Receipt Voucher, the related subsidiary from the financial paper was inserted into the related subsidiary in the Receipt Voucher, and an error appeared on save.
- Fixed an issue where the note was not carried from the financial paper to the Payment Voucher when using the **"Create Payment Voucher"** button inside the Financial Papers screen.

### Manufacturing
- Fixed an issue where Nama incorrectly calculated the time for the Scrap step, inserting resource lines into the Resource voucher for the scrap operation.
- Fixed an issue where the indirect cost distribution methods (percentage of raw material cost, percentage of prime cost, and allocated) did not work correctly, because the system added the raw material return cost to the raw material issue cost instead of subtracting it.
- **MRP System:** Fixed an issue where the system did not aggregate quantities from more than one component of the product correctly. For example, when a finished product appeared twice with component A specified on the first line and component B on the second line, the system used component A for both lines.
- Fixed an issue where a Transfer Request based on a Production Order did not copy the production date and expiry date.
- Fixed an issue where the system did not take raw material returns into account when calculating the item cost.

### Human Resources
- **Insurance Offers Request screen:** Fixed an issue where an error message appeared as soon as the insurance category was selected, stating that the operation could not be performed.
- **Payroll Record:** Fixed an issue where aggregation by sector did not work.
- Fixed an issue where the system accepted creating two Leave vouchers on the same day for the same employee.
- Fixed an issue where, in each of (Attendance/Departure - Manual KPI Values - Payroll Records), manually aggregating employees did not work.
- **Job Offer screen:** Fixed an issue where, when creating a Job Offer for a Job Applicant, the search lens did not show job applicants, though typing the applicant's code manually worked correctly.
- Fixed an issue where the system did not record the last check-out time when working on the weekly rest day, in the attendance information in the Salary voucher.

### Point of Sale
- Fixed an issue where an error occurred when transferring price lists from Nama to Point of Sale.
- Fixed an issue where the Return screen showed the line order incorrectly.
- Fixed an issue where some items sometimes did not appear in Point of Sale even though they existed in the database and could be sold.
- Fixed an issue where, in an Exchange without an invoice, the system did not include the items' taxes, even though they were included in Point of Sale Sales Returns and in the main Nama system's returns — the correct behavior is to include them in Exchange as well, since the principle is the same.
- Fixed an issue where, when issuing an invoice containing a priced quantity of an item and a free quantity of the same item, then performing an Exchange, the system combined them into one line with a negative quantity.
- Fixed an issue where, when issuing an invoice containing a priced quantity of an item and a free quantity of the same item, then performing a Return, the system combined them into one line.
- Fixed an issue where the Shift window allowed changing the Credit value and saving while the input cursor was in the **"Actual Credit"** field.
- Fixed an issue where, when the option (Show the price column in item search) was enabled, the system showed the price column but only displayed prices that had already been selected before.
- Fixed an issue where the Color and Size fields did not appear in Point of Sale even though they were enabled in the Nama settings.

### Banks
- **Receive Letter of Guarantee screen:** Fixed an issue where Letters of Guarantee sometimes did not appear in the search, requiring the full Letter of Guarantee code to be typed manually to pull up the data.
- Fixed an issue where an error message appeared when ending a Letter of Guarantee.
- **Receive Letter of Guarantee:** Fixed an issue where searching via the search lens did not work, while typing the guarantee code manually worked correctly.
- Fixed an issue where creating an Opening Letters of Guarantee document carried over all the opening document's data except the customer (Delivered To); the correct behavior is to carry the customer into the letter from the opening document.

### Letters of Credit
- Fixed an issue in the tax term config of the Credit Expenses vouchers.
- Fixed an issue where setting the credit side to a field from the voucher header did not work correctly in the Credit Expenses voucher.

### Reports
- Fixed an issue where creating a link in a report to a document did not open its view; the fix requires specifying the menu code and the view file identifier code in the link from Jasper.

## Settings
- An error sometimes occurs when importing a voucher from an Excel sheet, where the book inserts a prefix into the code.
- When adding the Contact to Fields & Screens Settings - Files Allowed to be General, the system does not take it into account correctly.
- The review levels are two, yet a second review is not possible.
- Fields cannot be searched for in System Settings and the term config screen.
- In screen customization, when adding a new group to a page, it is added to all pages.
