# Nama ERP Release Notes - November 2017

::: info Release Information
**Release Date:** November 2017  
**Release Number:** 201711
:::

## Additions

### Inventory
- Improved the Start Stock-Taking voucher so that, if it contains only one line, the Location and Warehouse are copied from that line to the header of the Stock-Taking Committee.
- When creating a Stock Issue based on a Stock Issue Request and the quantity of the main item changed without the quantity of the accompanying item (service items) changing, creating a Sales Invoice based on the Stock Issue showed an error that the quantity in line 0 is not sufficient. To solve this problem, created the entity flow **EAUniCreteSetQtyOfSlaveRowsAsMaster.plugnplay**, which can be used with Update Calculated Fields and will adjust the quantities on save.
- Added the options (Filter Location Based on Subsidiary, Filter Location Based on Customer, Filter Location Based on Vendor) to the Distribution Management settings.
- Added a new file (Partial Assembly Method **BOM Assembly Partial**), in which the ten item categories, the item department, and the component lines are specified.
- Created an entity flow that generates a component for the item, being an assembly of all the lines found in the Partial Assembly Methods file that apply to the item (via the categories).
- Activated additional costs in Transfer documents, taking inter-company transfer into account.
- **"Based On"** does not work correctly in all documents.
- Developed an entity flow to create a Stock Transfer document when a Stock Issue is created.
- Changed it so that only unlinked documents appear in Based On, in the documents (Purchase Order, Stock Receipt, Purchase Invoice, Purchase Request).
- Added a filter on Based On so that any Issue Request or Return that already had an issue or return made against it does not appear again when searching in Based On.
- Improved so that, when creating a Combined Issue Request from requests, only Issue Requests with a remaining balance not yet drawn appear among the combined requests; likewise, the Stock Issue only shows the Combined Issue Requests that have not yet been inserted into Stock Issue documents.

### Sales
- Applied the five **"Price Dimensions"** used in price lists at the line level of the Distribution system's documents (Purchase / Sales Price List - Purchase / Sales Order - Purchase / Sales Invoice ... etc.).
- The value type on the Price Offer is (Amount, Compound Percentage), whereas it should be (Amount, Percentage).
- When creating a Sales Return or a Purchase Return, Sales Invoices do not appear in Based On.
- Added the Coupon Book file to create a number of coupons at once.
- Added the Discount Coupon file.
- Added a section on the Sales Offer, on the Invoice Offers page, for the Discount Coupon, where the conditions that must be met to obtain the coupon are specified.
- Added the contact information found on the customer to the Sales Price Quotation, the Sales Order, the Issue Request, the Stock Issue, the Sales Invoices, the Stock Receipt, and the Purchase Invoices.
- Added the option **"Do Not Add the Location to the Warehouse"** to the Supply Chain settings, and added a list view for the locations linked to the warehouse on the Warehouse screen.
- Added taxes on the line in the Sales Order and the Price Quotation.

### Purchasing
- **Combined Purchase Request:** Added grouping mechanisms (From Request Code, To Request Code, From Analytical Group, To Analytical Group, From Vendor, To Vendor).
- Added the Payment Period to the Purchase Invoice window.

### Auditing
- Made changes to the Trial Balance as follows:
  - Added Prior Balance Debit and Credit
  - Added Balance Debit and Credit
  - Added the totals to confirm whether the balance is balanced or not
- Added changes to the Materiality screen, where the value is fetched from the Trial Balance according to the account chosen.
- Added the Sample Size to the Basic screen, fetched from the Relative Weights list.
- Added the Employee - Account to the Basic screen, fetched from the Balance.
- Added the Working Paper - Policies and Disclosures to the Basic screen.
- Added the Employee, Account, Cycle, and Planned Execution Time inside the Balance screen.
- Added the ability to insert the Reconciliation and the Balance inside the Manual.
- Changed the Planning Preface screen to be as follows:
  - Procedure - Partner Comment and Evaluation, the Partner in Charge, and Aggregating the Evaluation Scores
  - Added a Summary with the totals

### Accounting
- Added the ability to leave the periods in Budgets empty.
- Added the Subsidiary to the Financial Budget lines.

### Human Resources
- Showed the total Tax Base and Insurance Base inside the Salary Voucher.
- Activated Composite Formulas in calculating Salary Vouchers.
- Created the document **"Combined Leave Request"**.
- Created the document **"Combined Leave"**, which works with the same mechanism as the request and creates individual Leave documents according to each leave type.
- Developed a mechanism for Return to Work based on the Combined Leave document, which creates a separate Return-to-Work document for each leave type.
- Developed a scenario for one customer, for Penalties, for the formula (025 - Revenue Incentive Deduction), as follows:
  - If an employee receives the penalty (103 - Allowance Reduction) or the penalty (104 - Grade Reduction), the Revenue Incentive component (112) is deducted in full for two months, then 50% is deducted for the following two months.
  - If the employee receives the penalty (101 - Penalty) for more than three days, 50% of the Revenue Incentive component (112) is deducted for two months.
  - If the employee receives the penalty (101 - Penalty) for less than three days and more than one day, 25% of the Revenue Incentive component (112) is deducted for that month only.
  - If the employee receives the penalty (101 - Penalty) for one day, 20% of the Revenue Incentive component (112) is deducted for that month only.
  - If the employee receives the penalty (102 - Warning) once, 10% of the Revenue Incentive component (112) is deducted for that month only.
- Increased the Manual Performance Indicators to 20 indicators, and the Salary Voucher can now be issued without the Performance Indicator Values document.
- Added the option **"Do Not Use Performance Indicator Values"** to the HR settings.
- Activated the Disbursement field in the Manual Performance Indicators (for components with no disbursement defined for them).
- Added a choice to the Performance Rate field (Component Calculation Formula screen): the sum of the header components' values, to link it with an indicator, and enabled adding a component to the Component 1 field when linking with a Performance Indicator.
- Added a new type to the Performance Rate: **"A Percentage of Specific Salary Components"**.
- Developed the salary disbursements system.
- Added the option **"Do Not Pay Advances in the Voucher"** to the Payroll Register.
- Added the ability to specify the disbursement while defining the Advance.
- Added the ability to specify the disbursement while defining a Reward or a Penalty.
- Added 5 more components to link a component to.
- **Employee Introduction Letter:** Copied the Employee Introduction Letter document from the Housing module to the Human Resources module.
- Added From Sector and To Sector inside the documents (Payroll Register - Performance Indicator Values).
- Made the number of components a formula can be linked to 5.

### Manufacturing
- Added the document's Subsidiary to the Vendor Voucher screen.
- Showed the item linked to the Production Order on the Issue and Return Requests screen.
- Created a new document, **"Combined Product Delivery"**, which creates a Delivery document for each line, with the Production Order present both on the document header and on the lines; also, if the Production Order is entered on the header, it is copied to all the lines.

### Service Center
- Added the following two buttons to Job Order Execution:
  - Close Job Order - creates a new Closing document for the Job Order
  - Reopen Job Order - deletes the Job Order's closing
- Prevented saving any document in Service Center against a Job Order that already has an invoice issued for it.
- Added the following improvements to the Job Order:
  - The Job Order can no longer be deleted after invoices have been made on it
  - Second: prevented creating more than one closing for the same Job Order
- **Execution Voucher:** Added the two buttons **"Start Service for the Current Line"** and **"End Service for the Current Line"**.
- Employees' times are no longer allowed to overlap across different Execution lines.
- Added Technician 2, 3, 4 and 5 to the Execution Voucher lines.
- **Meter Reading Log:** Added the following changes:
  - If the last reading date on the vehicle is before the Update document's date, the current date and reading are copied to the previous date and reading on the vehicle.
  - If the last reading date on the vehicle is the same as the Update document's date, only the current reading is changed and copied from the Update document.
  - If the last reading date on the vehicle is after the Update document's date, no data on the vehicle is changed.

### Fixed Assets
- When defining a Fixed Asset of type Vehicle, the system copies the vehicle code into the Asset file; improved so that the asset code is also copied into the Vehicle file.
- Added the options **"Shorten Entries"** and **"Sort Entry Lines"** to all of the system's term configs, as well as the ledgers.
- Allowed handling custodies without creating a Custody Purchase document, via an option inside the Custody Type (Must Be Purchased).
- Improved Asset Maintenance as follows:
  - Added the document Fixed Asset Maintenance Record Request.
  - Added the Start Time and End Time to the documents (Maintenance Record Request - Maintenance Record).
  - Added attachments to each of (Maintenance Plan - Maintenance Record Request - Maintenance Record).

### Point of Sale
- Added the ability to repeat any payment method on the Multiple Payment screen via a + sign next to any method, and added the Coupon to the payment methods on the screen.
- Improved so that a Receipt Voucher can generate coupons when it is a receipt from a customer, showing a screen to specify the number of coupons to create and their duration.
- Improved so that when the POS creates the coupon via a Receipt Voucher or via an invoice meeting the conditions defined in the Sales Offer, the system prints the coupon form if one exists.
- Added a field on the Stock-Taking window for the Shift Code.
- Added the option **"Delete Selected Errors"** to the action menu more menu inside the Errors screen.
- Added the following improvements to the Errors window:
  - On the Data Transfer Errors screen, added a count of the record.
  - Added numbering to the lines.
  - Added the ability to copy the failure reason.
- Added a grid named **"POS Data Sending Settings"** to control the data sent to the POS.
- Adjusted the Favorite Items section and the bottom list for the system's shortcuts.
- Added two fields to the POS Exchange: a field for the created invoice's code and a field for the created return's code.
- Copied the settings found in the Stock Transfer Request term config to the Stock Transfer Request term config.
- When creating an Exchange with a value less than the items' value (i.e., the customer is owed a refund), improved so that the amount due to the customer appears on the Payment screen in red.
- Adjusted the space of the bottom information bar as well as the top section's username field, since they did not display clearly on some devices.
- Added a button for holding the invoice next to the View Held Invoices button.
- **Close Shift screen:** Improved so that values and amounts are no longer suggested in the Actual Balance fields for all payment methods.
- **Sales Returns screen:** When browsing Sales Returns at the POS, improved so that it is possible to search by the return's code or by the Sales Invoice code the return was made against.
- When transferring the Sales Return to Nama, the system transferred only the return's code without the code of the invoice the return was made against; improved by adding a field for the Sales Invoice code.

### Customer Relationship Management (CRM)
- **Ticket - Contact Information:** Added a Contact; choosing it fills in the contact information fields.
- Added the Electronic Task screen to be used by the attendance and departure recording application outside Nama.

## Settings

- Added the ability to print documents directly without previewing the document (opening it in a new window) before printing.
- Added the Basic Information and Vehicle Ownership - found on the Vehicle - to the Delivery Vehicle.
- Improved the option **"Price Includes Tax"** so it can be configured on one or some of the dimensions (Price Includes Tax 1, Price Includes Tax 2, Price Includes Tax 3, Price Includes Tax 4).
- Added the Discussion via the Fields & Screens Settings screen, **"Discussions"** page.
- Added contact information to the Work Task file.
- Added an option to the Global Config to allow deducting the tax value from the discounts base.
- Added the options (Add Line, Delete Line, Copy Line) to the Permissions file - Field Settings page.
- Added a dedicated page for archival documents to the Archival Document, so it can be permanently hidden from unused screens.
- Added a dedicated notes page to the Note, Detailed Notes, and Meeting Notes, so they can be permanently hidden from unused screens.
- Added arrows on the Choice List screen for jumping to the first record and to the last record.
- Added the ability to apply an entity flow to **"All Documents - All Files - All Screens"**, as is the case with Validation by Criteria and Screen Modifier.
- Added the Senior Manager to the Employee Update document, since transferring an employee to another department sometimes also changes their manager.
- Created the entity flow **EASortLedger.actions** to sort journal entry lines (it will be applied to all documents, except entries arising from inventory costs).
- Added **"Apply Filter with Type"** to field filtering, so that any field of type multi-reference can be filtered according to the type chosen in the field.

For example: the Based On field inside the Transfer document, as follows:
If the type is Sales Invoice, the criterion is **"Invoice on Credit"**, and if the type is Purchase Invoice, the criterion is **"Purchase Invoice from a Category 1 Vendor"**.

### Banks
- **Letter of Guarantee Issuance document:** In the document's term config, when From Reference is chosen and the Reference Type is Reference 1 or 2, it only works with subsidiary accounts and not with sub-accounts.

## Fixes

### Inventory
- Fixed an issue where the entity flow **EAUniCreteGenItems** took a long time and the user could not tell how many items had been created.
- Fixed an issue where releasing a reservation on an item released the reservation in the Item Reservation document but not on the item itself.
- Fixed an error in calculating the Overdraft.

### Sales
- Added the Delivery Vehicle, the Driver, and Work Task (Project) inside the Price Quotation Request (UniCrete).
- **Sales Order:** Fixed an issue where the system did not take the cash paid amount into account when calculating installments (UniCrete).
- Fixed an issue where creating a Payment Template and entering it, whether in the Price Quotation or the Sales Order, showed the error message (the sum of the installments does not equal the remaining amount).
- **Sales Price Lists:** Fixed an issue where choosing From Category 1 to Category 1 and clicking Group Items showed the message (at least one item must be entered).

### Purchasing
- Fixed an issue where, when creating a Purchase Invoice while Purchase Price Lists existed for the items, the item price was not pulled from the price lists (UniCrete).
- **Combined Purchase Request:** Fixed an issue where, with the option **"Group Similar Purchase Lines in the Combined Purchase Request"** enabled in the Distribution Management settings, the system grouped the items on the Totals screen but did not group the quantities.
- Fixed an issue where, when choosing the Stock Receipt in Based On inside the invoice, only receipts not linked to invoices appeared.

### Accounting
- Fixed an issue where creating an accounting effect from the line's subsidiary, when the line's subsidiary was an account, caused a technical error.
- Fixed an issue where the system did not correctly take into account whether the effect of Tax 1 and Tax 3 was a discount or not, on the accounting effect inside the invoice and the return.

### Fixed Assets
- Added the ability to delete the Maintenance Record, as well as to delete the Maintenance Record field in the Maintenance Plan.
- **Custody Delivery Voucher:** Added the ability for an employee to receive more than one custody, as opposed to the current setup, which is (a custody being received by more than one employee).

### Customer Relationship Management (CRM)
- Fixed an issue where exporting all records in Tickets showed the error message (Operation cannot be performed).

## Settings

- When applying a certain sort to the Edit Log inside any document, the display is not correct, and likewise applying a certain filter shows an error message.
- Sorting in Screen Modifier does not work correctly when **"With Respect To"** is used.
- Creating an empty database causes the system to stop.

### Human Resources
- For one customer, with a night shift from 22:00 to 8:00, issuing the salary for this employee calculates an extra work day.
- With the option **"Change the Employee's Status from Termination of Service Only When the Work End Date Matches Today's Date"** enabled, saving a Termination of Service Voucher does not change the employee's status; but re-saving the document after editing any field does change the employee's status. The correct behavior is to change the employee's status when the work end date is before today's date (today's date from the server), and to apply the previous option when the service end date is after today's date.

### Service Center
- Issuing raw materials sometimes does not affect the Job Order.

### Point of Sale
- When paying an invoice with a specific coupon, and the invoice value then leads into another offer while that offer has a problem (such as the offer having no coupon duration), the system settles the invoice and shows a message that the offer cannot be applied, but it does not record this invoice against the coupon that was used, so the coupon can be used more than once.
- An invoice cannot be issued correctly using a coupon that was issued via a Receipt Voucher.
- The invoice can be paid with a coupon of less value than the invoice price, by inserting the coupon number, then deleting the cash amount so the remainder becomes zero, then saving; the system accepts this.
- The system does not react to the user when the coupon value is entered on the Payment window, since it does not display the remaining amount correctly when the coupon value is entered or when the cash amount or any of the other values are changed; the correct behavior is for the (validation Post) to take the remaining amount into account across all the fields of the Multiple Payment window, and, when a sufficient coupon value is entered, the cash amount should be zeroed out.
- The user can pay by coupon, via the Multiple Payment window, an amount less than the invoice value, using the following steps:
  - Issue an invoice, say for 50 pounds
  - Set the cash amount to zero
  - Enter the transaction number for the coupon with a value of 20
  - Add a new coupon line and enter the same existing coupon number
  - Enter the value 30 in the new field added for the same coupon
  - The system sets the remaining amount to zero
  - Delete the added coupon number, leaving the remaining amount at zero
  - Confirm the invoice, so the system issues a 50-pound invoice while only 20 was paid from the coupon.
- When the invoice is settled with a coupon on the Multiple Payment window, the system does not calculate the remaining amount correctly when the remaining amount is set to zero.
- Images no longer appear on the Favorites bar.
- When entering values on the Stock-Taking window, after entering the first value and pressing Enter, the system moves to line 3; if the user then enters a value there, the system enters that value into line 2 instead, and likewise for the remaining lines when the same action is repeated.
- The system does not transfer Sales Returns to Nama.
- When the system transfers an Exchange document to Nama, two duplicate Sales Invoices and two duplicate Return Invoices are transferred for each Exchange invoice.
- When paying in cash on the Exchange invoice via the cash payment icon, the system adds to the cash, card, and credit payment methods.
- Often, on the Exchange document, the number of the invoice the exchange was made against does not appear in Nama.
- When creating a Stock Transfer based on a POS Transfer Request, the program does not copy the data into the (toWarehouse) field.
- When opening the POS for the first time, the screen appears for two seconds and then closes again.
- The system allows creating a return or exchange with a value greater than what is in the cash drawer.
- When opening any offer screen at the POS, returning to the Sales screen requires pressing ESC twice.
- There are two invoices transferred from the POS to Nama with the same code.
- When creating a return for an invoice containing the same item repeated on more than one line at different prices, the system, in the return, groups the item's quantity into a single line at the first line's price.

## General Fixes

- Fixed an issue where creating an empty database caused the system to stop.
- Fixed an issue with creating an inter-company Transfer document - it did not save.
- Fixed an issue where creating an empty database caused the system to stop.
