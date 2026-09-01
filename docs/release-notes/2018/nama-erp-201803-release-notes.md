# Nama ERP Release Notes - March 2018

::: info Release Information
**Release Date:** March 2018  
**Release Number:** 201803
:::

## Additions

### Inventory
- Added the field **"Attachment"** to each of the Stock Receiving voucher and the Stock Issue voucher.
- Adjusted the field translations and post actions on the item's price table.
- Added an option making the Transfer Request's reservation reserve the quantities from the source warehouse without reserving them into the destination warehouse — meaning they are not treated as **"Goods in Transit"** for the destination warehouse. In effect, the Transfer Request is treated as an Issue Request for reservation purposes.
- Sometimes the system enters some items with negative quantities in the Inventory Count Committee.

### Sales
- Added the following options to Global Config:
  - Tax 1 not added to the total
  - Tax 2 not added to the total
  - Tax 3 not added to the total
  - Tax 4 not added to the total
- Also added the above options to the Tax Policy settings for use with (Price includes tax), and also added another accounting side for the tax that applies in this case.
- Added all item classifications, item categories, item section, and brand to the Sales Points window.
- Added the two options **"Deferred"**, **"Prior Years"** to the Sales Order term config, like the Sales Invoice term config.
- Added the option **"Allow returning service items"** to the Distribution Management settings.
- Added details to the Prices screen in the item, carrying the same data as the price lists, letting the user add lines to specific price lists; these lines are added to the price lists as soon as the item is saved.
- Added the option **"Allow editing data in items"** to price lists, which copies the data from the price lists to the item so the user can also edit it from the item.
- Placed the price inside the price lists list view in the item.
- When changing the free item inserted from the free group, the system sets the quantity to zero, and consequently, on save, the system restores the automatic item.

### Purchasing
- **Purchase Invoice:** Added the option **"Never update prices"** to the Purchase Invoice term config.
- Added the field **"Tax Policy"** to the Vendor file.

### Accounting
- **Journal Voucher:** Added the option
- Added the option **"Functions as sales, not purchases"** to the Miscellaneous Invoice term config.

### Service Center
- Added the following fields to the Meter Reading record:
  - Five (N) fields
  - Three (date) fields
  - Three (Text) fields

### Human Resources
- **Issuing Salaries:** Improved so that when aggregating employees, an employee whose status is Active for part of the salary period is also aggregated, provided there is no Salary voucher for the same period.
- Displayed all salary items linked to the item type in the Item Type window.
- Added a rounding mechanism for salary items, like the one found in the salary equation, adding the two fields (Rounding Method, Number of Decimal Places); when a rounding mechanism exists in the equation, it is copied to the item as soon as the equation is selected, and that rounding is used when calculating the salary for incomplete periods, even for fixed values that are not based on an equation.
- Prevented issuing the salary or saving the Salary voucher if there is a discrepancy between the salary item type and the salary item in any of the fields (Effect Type, Classification, Added to the fixed insurance base, Added to the variable insurance base, Added to the tax base, Not linked to work days).
- Improved issuing the Salary voucher so it takes into account the actual return-to-work date rather than the return-from-leave date, when the leave type is not Annual, provided the actual return-to-work date is before the return-from-leave date.
- In calculating the leave balance, took into account that the annually accrued balance may have changed during that period, so each period is calculated separately: from the start of employment until the balance change, as one period at the old balance, and from the balance change to the leave date, as another period at the current balance.
- **Leave Balance Adjustment voucher:** Added the Hire Date field to the lines, filled in as soon as the employee is entered.
- **Salary Voucher:** Calculated the From Date and To Date in the Salary Voucher as the start and end of the salary period
- **Start-of-Work vouchers:** Improved so that they do not affect the salary calculation's (From Date) unless the start-of-work type is (New Hire).
- Made the Vehicle file a subsidiary.
- **Settlement document:** Took (the change in leave balance during the period) into account when calculating the leave due from the settlement.
- **Dues Liquidation:** Made some modifications to the **"Dues Liquidation"** file.
- An error occurs when there are documents for an employee with **"View only records they created"** enabled.
- **Salary Item Calculation Equation:** Added an equation type named (The value fixed in the Job Offer).
- An error message appears when giving a user permission to view files created by another user.
- **Salary Voucher:** Added the actual date at the line level for Reward/Penalty vouchers.
- Copied the option **"Employee's last salary voucher before end of service"** from the Salary Voucher term config to the Payroll Record at the line level, and from there it is carried to the Salary Voucher, so that the field's default value in the Payroll Record is (True) when the employee's status is Resigned and the resignation date is after the start of the salary period.
- Added the list **"Holiday Factor"** to the line for the salary item calculation equation, containing the options (No calculation, Before a holiday, After a holiday, Before or after a holiday, During a holiday).
- Following the previous improvement, and having added the list **"Holiday Factor"**, added the following three options (Factor for holidays, Factor for leaves, Factor for weekly rest days).
- **HR Settings window - Salary Settings page:** Added a button for each component of the formula (attendanceMachineFormula.value.ConfigEntry), to help the user retrieve the formula components instead of always copying them from outside the Nama system.
- Added (Reward - Daily Penalty to which repetitions apply) to the system indicator in the KPI screen.
- **Bulk Leave Request:** Updated the system so that when the leave type is specified on the first line and its duration is set, the remaining leave duration (found in the document header) is inserted into the next line.
- **Reason Types window:** Added the field **"Maximum permit hours per month"**; when either the number of hours or the number of times is reached, the employee's monthly permits end.
- Added the two fields (**"Excludes the weekly rest day"**, and the field **"Full-day assignment"**) to the Business Trip voucher screen.
- When more than one employee has the same attendance code, the message: More than one record were returned appears; improved so that the employees sharing the same code are shown, to make it easier to resolve the issue.

### Fixed Assets
- Created a mechanism for aggregating assets (Group - Asset Type - Asset - Dimensions).
- Added the asset's scrap value to the Asset Type, copied to asset documents with the ability to edit it.

### Contracting
- Added the two files (Contract Actual Cost Source file, Project Cost Adjustment document).
- Added the unit cost to Extracts, along with an accounting term config for it.

### Manufacturing
- **Indirect Costs window:** Changed the translation of the **"Item"** column to Raw Material.

### Point of Sale
- Added the ability to set the length of the Point of Sale documents' code suffix in the Point of Sale settings.

### Letters of Credit
- Developed a field for the total expense value and a field for the total tax and the grand total of the Expenses voucher.

### Point of Sale
- Added the option **"Do not calculate tax for the free item"** in Global Config.
- Added the field **"Return invoices within (days)"** to the Machine file.
- Added the two options (The unit price can be edited in the Return, The discount or tax can be edited in the Return) to the Point of Sale permissions.
- Showed the Credit and Cash payment methods alongside the other payment methods when pressing the **"View payment details"** button.
- Improved Point of Sale so that the branch's logo is transferred from Nama to Point of Sale and used in the login screen and in the forms and reports (the branch logo first if it exists, otherwise the company logo is used).
- Created a linked record for the Point of Sale invoice, to identify the returns and exchanges linked to the invoice.

### Contracting Maintenance
- **Contract Job file:** Added the fields (Total Additions, Total Deductions, Net, Tenders).
  - **Contract items in the Operation & Maintenance items:** Showed only the items whose type is Operation & Maintenance
  - Added a shortcut - Labor (Update Contract Job costs)
  - Displayed the contract jobs linked to the contract job department (for which the job department was selected)
- **Contract Job Costs file:**
  - Contract Job Costs: do not repeat the Contract Job
  - The non-fixed salary was not copied from the Contract Job (noting that the total is currently correct — the total's calculation does not include the non-fixed salary)
- **Service Distribution document:**
  - Labor page: added the Monthly Cost = Cost × Count (after the Cost column), keeping the Total equation as is
  - Added a selection for (Update Tender Data)
  - Equipment: Cost = the unit price from the Tender
  - The totals on all the Service Distribution screens were improved to update on entry rather than on save
- Added the field **"Average Kilometer Consumption"**.
- Added an entity flow to recalculate the average for already-created documents.

## Settings

- Added the Permissions file as one of the options for **"Send To"** in the **"Task Schedule"** file.
- **Global Config:** Improved "Ignore closed periods" in Global Config so that a fiscal year can be specified for which closed periods are ignored, defaulting to all years until a year is specified.
- Added the following buttons (actions) to the Alert Definition window:
  - Delete all alerts
  - Delete read alerts for the current user
  - Delete read alerts for all users
  - Delete alerts up to a date
- Added the ability to set the number of records displayed for a specific user.
- Added the two options (The unit price can be edited in the Return, The discount or tax can be edited in the Return) to the Point of Sale permissions.
- Showed the Credit and Cash payment methods alongside the other payment methods when pressing the **"View payment details"** button.
- Improved Point of Sale so that the branch's logo is transferred from Nama to Point of Sale and used in the login screen and in the forms and reports (the branch logo first if it exists, otherwise the company logo is used).
- Created a linked record for the Point of Sale invoice, to identify the returns and exchanges linked to the invoice.
- Added the option **"Enable automatic coupons in supply chain"** in the Distribution Management settings.
- When defining an alert for Bulk Messages, improved the system to enter default values for the template and the recipients.
- When defining an alert for Point of Sale messages, improved the system to insert the following as default values:
  - Alert template = {messageBody}
  - Recipients (To Employee 1, To Employee 2, To Employee 3, To Employee 4, To Employee 5)

### General Improvements
- Improved the system so that when creating a cancellation document for a voucher manually linked to another voucher, that link is also cancelled.
- Example: a Purchase Invoice with aggregated stock vouchers linked to it — cancelling the invoice unlinks it from the Stock Receiving voucher.

### Reports
- Added the ability to run htmlcomponent in Jasper reports.
- Created a mechanism to prevent a user from running the same report twice at the same time.

## Fixes

### Inventory
1. Fixed an issue where, when updating codes, the system recreated the invoices and returns for Exchange vouchers, duplicating them, and linked the Exchange in Nama to both the old and new documents (more than one invoice and more than one return).
2. Fixed an issue where the system accepted overdraft reservation from Stock Transfer Requests.

### Sales
1. **Sales Invoice:** Fixed an issue where the system did not copy the salesperson from the invoice header to the lines when the line-level salesperson was empty only, and did not replace the salesperson already present on the line.
2. Fixed an issue where creating a Sales Invoice from within the Sales Order did not copy the invoice classification.
3. Fixed an issue where an error occurred when there were both regular offers (on the Offers page) and offers on invoice item counts for the same item.
4. Fixed an issue where the system accepted adding a customer as their own Payment Customer, causing a problem when using that customer where the system consumed 99% of the processor, which could only be resolved by shutting down Tomcat.

### Purchasing
1. Fixed an issue where, with a manual Receiving voucher on a Purchase Invoice, creating an Additional Receiving Costs voucher for that invoice did not calculate the values correctly.
2. Fixed an issue where the system did not retrieve the purchase price when the purchase price list was not set for a specific vendor.

### Real Estate
1. Fixed an issue where the installment discount percentages did not work correctly: entering discount percentages either had no effect on the installments, or affected installments belonging to other years.
2. **Rent Contract:** Fixed an issue where the Rent Contract sometimes did not post the required journal entry.

### Accounting
1. Fixed an issue where an error sometimes occurred when using Debit Notices.
2. Fixed an issue where creating a Payment Voucher from the Treasury automatically inserted the employee's name into the Collector field, even though the employee was neither a collector nor a sales representative.
3. Fixed an issue where an error occurred when adding a line to the Receipt Voucher and Payment Voucher.

### Service Center
1. Fixed an issue where, when creating a preliminary invoice from a Work Order, the invoice number was written into a field inside the Work Order — whether the (Customer Invoice, Warranty Invoice, or Insurance Invoice) — and clearing the preliminary invoice did not clear the data in the Work Order.
2. Fixed an issue where, while the Work Order window was open and an Issue or Return voucher was edited elsewhere, the system ignored those edits (in the Supplementary Materials table on the main window); if the user then edited the window and saved before reloading, the quantities in the Supplementary Materials table appeared different from the spare parts quantities in the Movements window.

### Contracting Maintenance
1. **Service Distribution document:** The following defects were found:
   - The available and remaining amounts are not calculated correctly in Service Distribution
   - The setup error message does not state the line number where the problem is
   - The system does not prevent saving a line that has no Contract Job or labor count
   - The system does not prevent saving a negative labor count
   - The system does not prevent saving a fractional labor count

### Manufacturing
1. Fixed an issue where, when creating a Quality Inspection document based on a Production Order, the quantity received from the Production Order was sometimes not copied to the line, contrary to normal behavior.

### Human Resources
1. **Reward and Penalty vouchers:** Fixed an issue where rounding did not work even though rounding was defined in the equation on the Reward/Penalty type.
2. Fixed an issue where the salary equation (deduction) sometimes did not work correctly.
3. Fixed an issue where, after creating a Leave voucher from the employee's annual balance during the salary period and then creating a Start-of-Work voucher for the employee during that period, the system ignored the period before the start of work and calculated the salary from the start-of-work day to the end of the month.
4. Fixed an issue where, with the option **"Fix the number of monthly work days for the Salary voucher"** enabled at **"30"**, using the Employee Data Update document to move an employee from one branch to another, for example, made the system calculate the month's actual days (From Date, To Date inside the Salary voucher) instead of the fixed number of days.
5. **Leave voucher:** Fixed an issue where, when granting leave to an employee (with the leave type set to allow exceeding the leave balance), only the leaves listed for the employee in the Job Offer appeared.
6. Fixed an issue where, in the Attendance Machine settings, **"Punch alternating"** did not work correctly.
7. **Reward/Penalty Type file:** Added the ability to set the value using an equation.
8. **Salary Item Calculation Equation file:** Added a new equation type, **"Percentage of End of Service"**, defined as a percentage of the items included in the end-of-service calculation.
9. **Salary Item Calculation Equations:** Fixed an issue where rounding did not work when issuing salaries.
10. **Payroll Record:** Fixed an issue where an error sometimes occurred when issuing the Payroll Record.
11. Fixed an issue where, when selecting more than one Payroll Record and choosing Reissue from the More menu, the message **"The operation cannot be performed"** sometimes appeared.
12. **Advance Voucher:** Fixed an issue where the system did not calculate the value of the field installmentDetails.totalRemaining on the first save, only calculating it after a recommit or any edit and re-save.
13. **Salary Structure:** Added the following two lists:
    - Transportation Allowance, containing the options (Insured - Applied - None)
    - Housing Allowance, containing the options (Insured - Applied - None)
    - which are placed in their corresponding fields in the Job Offer file when the structure is selected

### Settings
1. Fixed an issue where an error occurred when a user had documents with **"View only records they created"** enabled.

### Contracting
1. Fixed an issue where, when creating an Assay, the log **"The operation cannot be performed"** sometimes appeared, and the lines also did not show after saving.
2. Fixed an issue where saving the Extract document doubled the tax value on the Extract's total value.

### Point of Sale
1. Fixed an issue where editing an item's price in the Item screen's price lists section (ItemPriceLine) did not update the price in Point of Sale or send it to the update file (POSReadQueue); the correct behavior is to update the price lists in Point of Sale when they are updated from the item.
2. Fixed an issue where, when updating the Point of Sale document code suffix length and the connection to Nama was interrupted while updating Nama's codes — updating some codes while others had not yet been updated — the system did not update the remaining codes when the update was restarted.
3. Fixed an issue where, when locking a Point of Sale user via the lock button inside the screen, the system sometimes refused to let the new user in.
4. Fixed an issue where setting a price with fractions for an item, e.g. (item price 10.25), did not transfer the price to Point of Sale.
5. Fixed an issue where the Point of Sale screen dimensions were not adjusted correctly on small screens, where some side buttons — such as payment methods, cancel tax, and cancel line discount — did not appear.
6. Fixed an issue where the system calculated the values resulting from (Tax 1, Tax 2) at the line level incorrectly.
7. Fixed an issue where the payment methods did not display correctly.
8. Fixed an issue where an error sometimes occurred when creating a Sales Return.
9. Fixed an issue where hiding the tax fields in Point of Sale only hid the columns, while the system still calculated the tax in the total, and the invoice was posted to Nama with the tax included.
10. Fixed an issue where creating a Point of Sale invoice for an item at its default price, then inserting the same item again at a discounted price, caused the system to transfer the invoice incorrectly by combining the two into a single line at the base price.

### Banks
1. Fixed an issue where the Letter of Guarantee Request document sometimes did not work.

### Letters of Credit
1. Fixed an issue where the Costs voucher in Letters of Credit was saved without being linked to the Stock Receiving voucher.
2. Fixed an issue where the Total field in the document gave incorrect numbers.
