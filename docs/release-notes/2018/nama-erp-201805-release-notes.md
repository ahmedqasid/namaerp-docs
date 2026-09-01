# Nama ERP Release Notes - May 2018

::: info Release Information
**Release Date:** May 2018  
**Release Number:** 201805
:::

## Additions

### Inventory
- **Supply Voucher:** Improved the Supply Voucher so that the system copies the warehouse location from the document header to the document details upon saving.
- Improved the Stock Transfer Voucher for an item from one warehouse to another so that the system copies the default locations from the item into the location fields.
- Added the option **"Allow issuing lots that have not been received"** in the Distribution Management settings.
- Created a method to calculate the net cost on the Item screen.
- Added attachments to the Additional Receiving Costs screen.
- Activated item relations on the Issue Voucher specifically, and on inventory documents in general.
- The entity flow that changes the status of the Warehouse Issue Request to Cancelled when its related sales order's status changes to Cancelled does not work correctly.

### Sales
- To recalculate discounts upon saving, the following entity flows were added:
  - EARecalcSalesDocDiscounts
  - EARecalcSalesDocUnitPrices
  - EARecalcSalesDocUnitPricesAndDiscounts
- **Sales Price List:** Added 5 numeric, text, and date fields at the line level in the Sales Price List screen.
- Added the document **"Sales Representative Update"** to the Sales menu, containing: Customer - Dimensions - Sales Representative - From Date - To Date, and the document's data was added to the statistics in the Customer file.
- **Coupon Book Window:** Added the following improvements:
  - Copied the default currency by default into the Currency field.
  - Added the field for the remaining coupon value at the line level.
  - Added a status column for each coupon at the line level (used or not used).
- **Distribution Management Settings:** Corrected the name of the option **"Allow duplicate priorities for offers price lists"** to become (Allow duplicate priorities for offers and price lists).
- Created 2 entity flows of type GroovyScript to prevent editing Price Lists in the fields (Minimum Price - Default Price - Maximum Price - Minimum Quantity), allowing only the addition of a new item with its full data of quantity and prices.
- Improved the Duplicate function so that payment documents are not copied for the documents (Sales Invoice, Purchase Invoice, Sales Returns, Purchase Returns, Miscellaneous Invoice)

### Accounting
- In the Account Classification, the department is now shown inside the classification without needing to show it via Screen Edit.
- Added an option to allow using the payment method with the Cash Fund subsidiary type, since it currently only works with the bank account.
- Improved Payment and Receipt Vouchers so that the system totals the amounts of the vouchers listed in the document details into the amount found in the header of the Receipt and Payment Vouchers.
- Developed the following windows:
  - Investor
  - Project
  - Investment Fund
  - Open Investment
  - Project Investment Allocation
  - Investment Projects Budget
- Created the file **"Block Transactions on Accounts or Subsidiaries"** to stop transactions on certain accounts during a specific period.
- Added a template and query for Description and Description 2 on the header of both the Receipt Voucher and Payment Voucher, but it was not shown on the window; Screen Edit can be used to show it.

### Banks
- **Bank Reconciliation Memo:** Improved the memo so that the system sorts bank transactions in ascending order by date when importing them from an Excel file.
- Added the option **"Reverse the effect of installments"** to the Bank Notice term config.

### Human Resources
- Added the Leave Type to the EmpAttendanceSysLine table so that paid leave days can be distinguished from unpaid ones.
- Added the option **"Automatic shift - based on attendance time"** to the Shift file.
- Added a table specific to automatic shifts. The idea of automatic attendance is to define specific attendance windows so that if the employee attends within a given window, they belong to that window; for example, if the employee's attendance is (from 9 AM to 11 AM), the system links this employee on this day to the Morning Shift, and if the employee's attendance is (from 3 PM to 7 PM), the system links this employee on this day to the Evening Shift.
- Created a "migrator" to Recommit Leave Vouchers after Return to Work Vouchers have been made against them, so they affect the EmployeeStateSysEntry table. To run it, the following link can be used:
  `http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry`
- Configured the salary-deduction-related options in the Human Resources settings as follows:
  - Treatment of unpaid leave days for a single employment record (one Data Update Voucher) during the period.
  - Basis of unpaid leave days for a single employment record (one Data Update Voucher) during the period.
  - Treatment of unpaid leave days for multiple employment records (more than one Data Update Voucher) during a full period.
  - Basis of unpaid leave days for multiple employment records (more than one Data Update Voucher) during a full period.
  - Treatment of unpaid leave days for multiple employment records (more than one Data Update Voucher) during a partial period.
  - Basis of unpaid leave days for multiple employment records (more than one Data Update Voucher) during a partial period.
  - Treatment of non-working days for a single employment record (one Data Update Voucher) during the period.
  - Basis of non-working days for a single employment record (one Data Update Voucher) during the period.
  - Treatment of non-working days for multiple employment records (more than one Data Update Voucher) during a full period.
  - Basis of non-working days for multiple employment records (more than one Data Update Voucher) during a full period.
  - Treatment of non-working days for multiple employment records (more than one Data Update Voucher) during a partial period.
  - Basis of non-working days for multiple employment records (more than one Data Update Voucher) during a partial period.
- **Payroll Voucher:** Added the total of paid installments to the totals.
- **Payroll Voucher - Statistics:** In each of: Leave Vouchers, Bonuses and Penalties Vouchers, Departure Permits - Mission Vouchers, added a mechanism to show only the documents belonging to the period, or to show all vouchers belonging to the employee.
- **Payroll Voucher - Statistics:** Added the table **"Employee Status Change Transactions"** showing the employee's status changes on the Employee screen.
- Created the system indicator **"Difference in days between the return-to-work date and the return date"** from the leave linked in the Return to Work Voucher, provided that the return-to-work date is after the return date.
- Nama now accepts creating two leaves for an employee on the same day in the case of a half-day leave type.
- **Leave Balance Adjustment Voucher:** Added a field for the added days on the lines, without needing to update the Adjusted Balance field, such that (Adjusted Balance = Current Remaining + Added Balance). Example: the employee worked on official holiday days, and these days are to be added to the annual leave balance.
- Allowed the user to change their own email and password.
- **Payroll Register:** An error sometimes appears when issuing a payroll register.
- Added the following improvements to the Medical Insurance system:
  - Added the medical insurance company on the Employee screen, updated from the Assignment and Addition Voucher.
  - Updated dependents' insurance data with Addition, Promotion, and Deletion vouchers.
  - Added the insurance start date and insurance end date to the Dependents table, updating the information from the Addition, Promotion, and Deletion vouchers.
  - With the Medical Insurance Deletion Voucher, all medical insurance data is cleared from the Employee screen.
  - Created a mechanism to clear insurance data from the employee's card when their employment ends.
- Developed the Consolidated Leave Voucher.
- Added the option **"Do not group employees without a Return to Work Voucher after leave"** in the Human Resources settings.
- **Consolidated Return to Work Voucher:** Added the following improvements:
  - Added details to specify some leave-related fields (Leave Type, Leave Duration, etc.).
  - Added the option **"Extend the return date to the last leave"**.
  - Added the line-level option **"Return date extended from a Return to Work Voucher"**.
- **Payroll Voucher:** Improved the Payroll Voucher so that the system adds the total penalties - total bonuses before the total additions and total deductions.
- **Payroll Voucher - Statistics - Leave Vouchers:** Added the return-to-work date (found on the Leave Voucher) to the leave vouchers after the Leave Duration field.
- Added the following fields to both **"Job View"** and **"Employee Data Update"**, and they are copied to the employee like the other fields (15 Description.. …6 Description).
- Added the Job Department field to the Employee Data Update document, as it exists in the employee data.
- **Payroll Voucher - Statistics:** An error sometimes appears when viewing missions.
- When saving an employee under a group that has automatic coding, the system copies the code containing @draft into the Time Attendance machine code, which causes the machine code to be duplicated, and the system therefore rejects the save.
- **Advance Installment Rescheduling Voucher:** Improved the voucher so that when the Advance Voucher is selected, fully settled advance vouchers are not shown.
- Added an attachment to the Dues Liquidation voucher.
- Removed 6 additions and 6 deductions from the Dues Liquidation document (Additions and Deductions group), and created an option for them in the settings.
- **Vehicle Action Voucher:** Improved the voucher so that when the vehicle is selected, the system automatically shows the previous odometer reading from the Vehicle file.

### Fixed Assets
- **Asset Receipt Voucher, Custody Receipt and Delivery Document:** Added (3 numeric fields and 3 text fields) to the lines in the tables FADeliveryReceiptLine, FAReceiptDocLine, and also added an attachment to each of the two preceding documents.

### Contracting
- Added a button to update the profits from the Term Sheet referenced in the Assay, inside the Assay screen, to pull the profits, their percentages, and the price from the Term Sheet into the Assay.
- **Subcontractor Extract:** Added Ref at the line level.
- Added the two fields (Arabic Description, English Description) to the Standard Term window.
- **Term Analysis Card:** The standard term's code and the term's name are now shown from the document called via the Based On field.
- **Term Analysis Card:** Removed the following fields from the document header:
  - Term Code
  - Profit Margin
  - Profit Margin Percentage
  - Selling Price
  since the term code will now be handled at the line level rather than the document header, to allow more than one term (different terms) to be placed. The profit, and from it the selling price, will be determined in the lines of Based On documents.

### Customer Relationship Management (CRM)
- Created a maintenance invoice, with machines added to its lines.

### Letters of Credit
- Added a new screen in the Expense Voucher that allows distributing the expense item's value across more than one Letter of Credit.

### Customer Relationship Management (CRM)
- Created an entity flow as follows: when an action is taken on a Case and a specific legal service (item) is selected, a Sales Invoice is created for the same customer with this legal service, taking the price from the Service Contract.

### Point of Sale
- Activated the ability to return or exchange an invoice resulting from an exchange normally, and the checking of the return or exchange days is done based on the difference between the date of the current return or exchange document and the date of the original first invoice made.
- Improved coupons so that they can be tiered, allowing the coupon value to differ according to the invoice value.
- Added the Location to Point of Sale lines, working as follows when the Location is mandatory:
  - If the cashier does not specify the location on the invoice, upon payment the system sets the default location found on the Item screen and copies it to the Point of Sale invoices in Nama, then copies it to the resulting warehouse issue vouchers afterward.
  - If the item does not have a default location, the system refuses to pay the invoice until the location is set on the lines that do not have a location.
- Created a hyperlink inside the Return to open the original Point of Sale invoice.
- Added the ability to copy any field in the search grid, where double-clicking with the mouse on one of the grid's fields allows using right-click and Copy.
- Improved item pricing so that the price is copied from the classification found inside the machine, and if it is empty, the price is copied from the classification found in the settings.
- Added two fields to the Machine file: the machine's IP address (address ip for the machine), and the machine's port number (port), which must be defined to give the devices the ability to connect and transfer files. After the change to the Machine file is read into Point of Sale, a return or exchange can be made using an invoice code that is not on the current machine by clicking the button - Search in other machines - next to the invoice code field, and entering the invoice code and (the source machine - if known).
- Improved Point of Sale so that when an offer is applied and the message for applying the offer appears, the system shows the code of the applied offer.
- Improved Point of Sale so that free items are without tax.
- Added the option **"Adhere to price lists"** in the Point of Sale settings.

## Settings

- Added the two options **"Hide the line-selection column in selection lists"** and **"Hide the insertion-count column in selection lists"** in Global Config; they are the first two columns in the selection window when searching for one of the document details fields.
- **Global Config:** Added the list **"Alert Content"** in the **"Alert Settings"** block. This list contains the two values (Show alert content, which is the default, Do not show alert content).
- **User:** Added the list **"Alert Content"** in the **"Alert Settings"** block. This list contains the two values (Show alert content, which is the default, Do not show alert content).
- Added the field **"Type List"** to the Document Classification window, to link the document classification to multiple documents.
- Showed "listPageMatchingRef" in Monitor Current Tasks
- Created a mechanism to alert when sending a document or file to replication sites fails.
- Added a monitor task screen without the Kill Task option, to be used by the IT department, provided the user is also other than admin.
- Added the field **"Applied To"** to the Alerts window.
- **Employee Data Update Document:** Added the fields (6description to 15description) and (1ref to 5ref) so the system carries them over from the Employee window as soon as the employee is selected in the Update Voucher.
- Added the default list within the Permissions file.
- **Global Config:** Added the option **"Allow editing the dimensions of dimensions"**.
- Added the user's permissions and the permission files to the databases so that a report and a print form can be made for permissions.
- Added the option **"Number of rows in the grid"** to Global Config.

## General Improvements

- Prevented reviewing and un-reviewing documents saved as a draft.
- Improved the system to alert the user when there are documents whose processing has failed.
- Added the option **"Only include employees whose status is 'Active' in the payroll register"** in the Employee Settings window.
- Improved the action **"Request approval cancellation"** in the More menu.
- Added the ability to convert a date and time into a date only or a time only in entity flows, using the following two mechanisms:
  - toTime=creationDate.$toTime
  - toDate=creationDate.$toDate

## Reports

- Added the following functions to the Report Designer:
  - NamaRep.getItemPriceByCode($F{ItemCode})
  - NamaRep.getItemPriceById($F{ItemId})
- Added the field **"Type"** next to the field **"Applied To"**, which contains the options (Files, Documents, All Screens).
- Added the system reports (Item Purchases Details, Purchase Quotations Details, Purchase Orders Details).
- Added 2 groupings to the report **"Invoice Profitability"** to group by warehouse, branch, and customer. Also added a hyperlink for the invoice number.
- **Item Profitability Report:** Added the item's unit to the report and created a grouping only on the item's department.

## Fixes

### Inventory
- Fixed an issue where trying to edit the Supply Warehouse or Supply Location in the Consolidation document showed an empty error message.
- Fixed an issue where creating a description template for the receiving, issuing, or stock transfer accounting effect was ignored by the system, which used the word "Debit or Credit" in the system journal entry's description instead.

### Sales
- Fixed an issue where, when selecting a customer in a Sales Order who has a salesperson, and a salesperson had already been selected in the Sales Order, the system did not replace the existing salesperson with the one defined for the customer.
- Fixed an issue where, when creating a Sales Invoice and selecting the customer, the sales representative disappeared from the invoice.
- **Quotations:** Fixed an issue where selecting the item in a line of the Quotations screen made the system copy a unit for the item and the Unit column could not be edited, but after saving the quotation, the Unit column could then be edited.
- Fixed an issue where the system did not clear **"Cancel Reservation"** with Duplicate.
- Fixed an issue where, if the system found Cancel Reservation set upon the first save, it performed the reservation without verifying the quantities.
- **Distribution Management Settings:** Fixed an issue where the system allowed duplicate priorities for an offer even though the option (Allow duplicate priorities for offers and price lists) was not enabled.

### Contracting
- **Subcontractor Extract:** Fixed an issue where consolidating the terms, when clicked more than once, showed different numbers.

### Accounting
- Fixed an issue where creating a Duplicate of a Miscellaneous Invoice carried the payment documents over to the duplicate, when the correct behavior is not to copy them.
- Fixed an issue where creating a Requirements Request and using the option **"Group by version, size, or color .."** summed the lines and quantities correctly before saving, but upon clicking the Save button, the quantities changed and were all summed and placed in every line, which was incorrect.
- **Miscellaneous Invoice:** Fixed an issue where a problem sometimes occurred when saving the Miscellaneous Invoice.
- Fixed an issue where coding a financial paper from the line inside a Receipt Voucher, when the financial paper's code already existed, showed an error message that the code was duplicated without indicating which code caused the error.

### Banks
- Fixed an issue where creating a Bank Notice based on a Bank Portfolio did not insert the line's subsidiary into the notice's lines, even though it existed in the portfolio.

### Human Resources
- Fixed an issue where, when issuing a Payroll Voucher for an employee with, say, Shift 1, then changing the shift to Shift 2 through Attendance Plans & Shifts, then reissuing the payroll, the system did not delete the old EmpAttendanceSysLine lines, which caused the effects to be duplicated.
- Fixed an issue where creating a Leave Voucher of type (Regular, for example) and saving it, then changing it to (Sick, for example), still deducted the balance from the Regular type even after the change.
- Fixed an issue where the system did not copy the fields (ref1, ref2, ref3, ref4, ref5) from the Employee Data Update to the Employee file.
- Fixed an issue where an error appeared when deleting a Return to Work Voucher that was not linked to a Leave Voucher.
- Fixed an issue where making an Employee Data Update from last month for half of the current month or more caused a problem in the performance indicators that run on an SQL statement.

### Contracting
- **Subcontractor Extract:** Fixed an issue where the sales tax on the line did not work correctly.
- **Subcontractor Extract:** Fixed an issue where adding a sales tax did not affect the journal entry.
- **Dues Liquidation Document:** The document had the following issues:
  - The net liquidation reversed the entry found in the term config.
  - Subsidiary amount balances were not recalculated when the document was settled, and were only recalculated when the document was preliminary.
  - The amount was deducted from the subsidiary accounts even though the option **"Deduct the amount from the subsidiary"** was not checked.
- **Dues Liquidation Document:** Activated the rounding mechanism found in the Salary Item, within the liquidation.

### Point of Sale
- Fixed an issue where, when issuing a sales invoice and paying via a return receipt from one machine, then paying a sales invoice from another machine with the same return receipt, the system duplicated the line for the second invoice in the return window's details.
- Fixed an issue with the following scenario:
  - Creating a Point of Sale sales invoice for item x with a quantity of 5 pieces.
  - Creating an exchange for the same previous invoice for item X with a quantity of 1.
  - When clicking the minus (-) button in the Quantity field to specify the exchanged quantity, the system duplicated the item in another line with the same quantity.
- Fixed an issue where, when returning or exchanging items after a price change, the returned or exchanged items appeared at the new price.
- Fixed an issue where holding an exchange invoice caused the system to issue a sales invoice and a return invoice and post them to Nama.
- Fixed an issue where an invoice could be returned twice from two different machines using the following steps:
  - Issuing an invoice from one of the machines.
  - Opening a return invoice for it on another machine, then holding it without issuing it.
  - Going back to the first machine and returning or exchanging it.
  - Going to the second machine again, recalling the held return invoice, and then returning it.
- Fixed an issue where the system sometimes allowed returning a quantity larger than what was on the original invoice.
- Fixed an issue where an invoice could be returned twice using the following steps:
  - Opening the Returns window and inserting the invoice to be returned on the first machine, and opening the payment window.
  - Opening the Returns window and inserting the invoice to be returned on the second machine, opening the payment window, and actually paying.
  - Going back to the first machine and executing the payment.
- Fixed an issue where merely holding an exchange invoice caused the system to issue a return invoice for it, and when recalling it from hold, the system changed its positive quantities to negative, after which it could then be exchanged or returned, whether from the same machine or a different one.
- Fixed an issue where an invoice could be exchanged twice using the following steps:
  - Opening the Exchange window and inserting the invoice to be exchanged on the first machine, and opening the payment window.
  - Opening the Exchange window and inserting the invoice to be exchanged on the second machine, opening the payment window, and actually paying.
  - Going back to the first machine and executing the payment.
- Fixed an issue where, when recalling an invoice to exchange it from another machine, then closing the first machine, then trying to issue the exchange invoice, the system did not respond, but showed the message (The previous document was not saved - Connection lost) when the exchanged invoice number was deleted from the exchange invoice's header.
- Fixed an issue where, when using a coupon issued from an invoice value of a certain amount, the system refused to redeem the coupon when the customer's name was typed manually instead of being selected from the customer grid.
- Fixed an issue with the following steps:
  - Defining Machine 1's exchange period (1 day).
  - Machine 2's exchange period (5 days).
  - After two days, exchanging an invoice belonging to Machine 1 from Machine 2 was accepted by the system.
- Fixed an issue where rounding in price calculation was done using the -number of decimal places- inside the Unit rather than inside the Currency, which caused price discrepancies.
- Fixed an issue where a connection problem occurred when returning an invoice and entering a value in the return receipt's **"Notice"** field.

## Reports

- The system report **"Invoice Profitability"** does not show the cost of sales returns, and therefore it is not deducted from the profitability.
- There is an error in the Item Profitability report where the report duplicates the item when there are sales returns, and the cost does not appear.
