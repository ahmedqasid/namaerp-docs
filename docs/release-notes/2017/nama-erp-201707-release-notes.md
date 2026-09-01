# Nama ERP Release Notes - July 2017

::: info Release Information
**Release Date:** July 2017  
**Release Number:** 201707
:::

## Additions

### Inventory
- Added the Group field to Color and Size combinations.
- The Sales Invoice can no longer be edited after a Return has been made against it; the system still allows editing when the return is partial.
- Added the option **"Make Quantity Zero with Based On"** to the Distribution Management document term config.
- Added the option **"Do Not Check Over Draft With Recommit"** to the Distribution Management settings.
- **Distribution Management Settings - Dimensions Allowing Overdraft:** Added an option to allow or disallow the overdraft.

### Accounting
- Locked the Capital field on the Profit Distribution document when creating a duplicate.
- Added the option **"Use Payment Vouchers in Debt Aging"** to the Sales Invoice term config, and added the Sales Return and Debit Note to the payment vouchers on the Sales Invoice.
- Added the two options **"Shorten Entries"**, **"No Accounting Effect"** to the accounting term config for each of the documents (Sales Invoice, Sales Returns, Purchase Invoice, Purchase Returns, Stock Issue, Stock Receipt, Stock Transfer).
- Added the option **"Company Bears Expenses on Payment"** to the payment method.
- Added the following options to the Receipt and Payment Voucher term config:
  - Fetch invoices based on the related subsidiary.
  - Fetch commercial papers based on the related subsidiary.
  - Fetch lines based on the related subsidiary.

### Human Resources
- Added the option **"Log Salary Calculation Details in the Database"** to the Human Resources settings.
- Added a Salary Period selection to the Loan Type screen, allowing installments to be set based on the salary period instead of monthly as usual, so the loan installment can be deducted with every Salary Voucher.
- Added the option **"Consider the Company When Searching for the Employee When Importing Attendance"** to the Human Resources settings.
- Improved so that, when creating a Loan Rescheduling document, the user is prevented from editing the Loan document's data (dates and amounts).
- Improved so that, when creating a Performance Indicator of the System type, the system does not accept saving without selecting the system indicator.

### Auditing
1. Made the following changes:
   - Separated cycles from stages and added them to the accounts.
   - Brought the inherent risk and control risk from the tests into the Relative Weights list (Sample Size Determination).
   - Added changes to the Sample Size Determination list.

### Service Center
- Added the ability to create a Sales Order instead of a Sales Invoice from Job Orders.
- Deleting a Job Order Closing is now prevented when one or more invoices have been issued against it.
- In the **"Job Order Closing"** document, improved so that the system shows all Job Orders except closed ones, so a Job Order with Pending status can be closed.
- Added the option **"Create Invoices as Draft"** to the Job Order document term config, to issue the invoice in Draft status.
- Improved so that the document header data is copied when creating a Raw Material Issue based on an Issue Request in Service Center.
- Added the following fields among the fields pulled from the vehicle data (inside the Vehicle Details block on the Job Order):
  - Make
  - Model
  - Model Year
  - License Date (Warranty Start)
  - Warranty Period (number | day/month/year)
  - Warranty End Date (calculated automatically)
  - Warranty Kilometers (number)
- Added a field to the **"Job Order"** document called **"Operation Remarks"**, with the same specification as the **"Customer Remarks"** field, so the invoice's remarks are updated with these remarks.
- Saving is now prevented for any document (Issue - Issue Request - Return - Execution - Service Stop - Resume Service) on a Job Order that is closed or cancelled.
- Developed a new file for Route Stations.
- Improved so that, when closing a Job Order, the system issues what exists in the Operation Warehouse.
- Added a Reception Engineer field to the Job Order.
- Improved the Job Order so that, when creating a Customer Invoice, a Warranty Invoice, and an Insurance Invoice from a Job Order, the system opens the invoice in a new window.

### Manufacturing
- Improved the Execution document so that the Sample Issue step does not automatically issue raw materials.
- Added **"Based On"** to Raw Material Return.

### Contracting
- Non-critical fields in contracts can now be edited after Extracts have been issued.
- Activated the default unit price in the Term Sheet only.
- Added the unit price to the Term Sheet.
- Linked the unit (uom) on the Standard Term screen to the **"Contracting Unit of Measure"** file instead of it being a text field, and pulled it into the Term Sheet, the Assay, the Contract, and any screen containing the Standard Term.
- Added the Shorten Entries option to the term configs of the documents (Subcontractor Extract, Project Extract, Standard Terms).
- A Project Extract can now be created based on a Subcontractor Extract.
- Added 2 attachments to the lines of the **"Subcontractor Extract"** document.

### Point of Sale
- Items that cannot be sold are no longer shown in Point of Sale.
- Improved the transfer of invoices to Nama along with payment so that it happens faster and does not slow down the next invoice.
- Added a View Documents button inside Point of Sale for Stock Transfer Requests, as well as copying the request number to Nama in the Point of Sale part.
- Added a Related Records page inside the Point of Sale invoice, like the one in the Nama Sales Invoice (containing the Stock Issue vouchers related to the invoice).
- Added the ability to print the Stock Transfer from Point of Sale.
- Added Shift Opening to the documents that must be transferred as soon as they are saved.
- Added an option to the Point of Sale settings to make the customer mandatory.
- Added the Free Item column to the Invoice, Exchange, and Return screens.
- Added the Free Item column to the Exchange and Return screens, and improved the system so it marks the Free Item on the Return if the return is based on a Sales Invoice that has a free item.
- **Point of Sale Settings:** Added the field **"Fields Calculated When Transferring a Point of Sale Customer"**, used to calculate a field on the Customer file when defining a new customer through Point of Sale; this field is required.
- Added the Exchanged Invoice number in Point of Sale, as well as its number in Nama.

### Project Management
- Added tax to Project Invoices by adding a new column to the window's details, through which the tax is calculated.

### Customer Relationship Management (CRM)
- The customer is no longer allowed to change the Technical Support remarks.
- **Sales Line window:** Added the fields (Address 1, Address 2, Phone 1, Phone 2, Mobile, Email, Website, Fax, Governorate, Country, City, Area, and Geographic Location (the complete contact information group)).
- Added the two files (Route, Trip).

### Real Estate
- Clicking Extend Contract is now allowed without needing to cancel it first, and the system marks the option **"Automatically Cancel Previous Contract"** on the newly created contract.

## Settings

- Developed a function to show the Arabic day name for a given date.
- Added a field to the Replication Site screen: automatically update the version in the branch.
- Partially sped up opening the **"Document Term Config"** window, which was very slow.
- Added the two functions `ifnotequal`, `ifequal` to the templating language.
- Added two buttons to the **"Fiscal Year"** window to open and close all periods at once.
- Added a `View List` inside the Permission Type file, for the users linked to that permission.
- A record can now be exported from within the record itself, without going out to the list.
- Added a mechanism to find out which files or records use a specific `SecurityCapability` permission.
- Added 15 Numbers, 15 Dates, 15 References and 15 Texts to each of (Remark, Meeting Remark, Detailed Remark).
- Added an Inactive (`boolean`) to the Default Values Templates screen.
- Developed a mechanism to be able to stop the import of files and documents.

### Manufacturing
- **MRP:** On the item, when the (`stock Safety`) calculation method is set to Period, improved so the system takes the average quantities for a single period across the planning period.
- **Planning Document:** Added the ability to select which lines will be executed.
- **Indirect Costs:** Added an allocation type of value per hour of human resource.

## Fixes

### Inventory
- **Stock Issue:** Fixed an issue where the system did not allow issuing from more than one warehouse.
- Fixed an issue where, in some cases, certain items could not be prevented from use.
- Fixed an issue where the system forced the user to enter a priority for every warehouse.
- **Assembly Document:** Fixed an issue where, in the issued materials lines, adding manual lines to complete the quantity from another Lot number meant the document would not save unless the assembly method was deleted.
- Fixed an issue where the system allowed adding to and editing Stock Taking vouchers.
- Fixed an issue where, when running Recommit on a Sales Invoice linked to a Stock Issue, the system checked for available quantity at the current moment instead of at the invoice date, causing the "insufficient quantity" message to appear.
- Fixed an issue where creating a Transfer document with different locations on the lines, and no location set in the document header, made the system refuse to save, claiming the transfer was from and to the same dimensions.

### Purchasing
- Fixed an issue where creating a Purchase Invoice for an item with Versions and Sizes caused an error on save.

### Banks
- Fixed an issue where the dimensions on the lines could not be edited in the Bank Reconciliation.

### Project Management
- **Project Invoice:** Fixed an issue where an error occurred in the accounting entry for the invoice lines (when tax was present).
- **Project Invoice:** Fixed an issue where, after setting a value in the tax rate and then changing it to 0 or clearing it, the value did not change.

### Service Center
- Fixed an issue where creating a Raw Material Issue did not distribute the percentages with the raw materials.
- Fixed an issue in the **"Add Tasks to Job Order"** document where, when inserting tasks, the prices were not pulled in.
- Spare Parts on the Job Order now take the price automatically.
- **Job Order:** Fixed an issue where, when splitting the loading percentages (Auxiliary Materials - Tasks) between the Customer, Insurance, and Warranty, the system did not save.
- Fixed an issue where the system sometimes showed incorrect task prices on the Job Order.
- Fixed an issue where, on the Job Order, Spare Parts were sometimes duplicated in the details and on the Transactions page under the issued Spare Parts.
- Fixed an issue where the Job Order allowed editing even after it was closed.
- Fixed an issue where clicking Create Customer and Insurance Invoice did not open the invoice.
- Fixed an issue where the system sometimes failed when trying to delete a Job Order; the cause was that `SrvcMaterialEntry` was not deleted.
- Fixed an issue where deleting a Job Order Closing did not delete the Stock Issue voucher.
- Fixed an issue where closing a Job Order issued stock using the Issue Location instead of the Operation Location.
- Fixed an issue where, in both the Raw Material Issue and Raw Material Return documents, an empty error message appeared if the Document Book and the document term config were not entered.

### Human Resources
- Fixed an issue where importing Job Offers wrote the error message in the first empty field instead of at the end as usual.
- Fixed an issue where creating a new Job Offer document dated outside the payroll year caused an error.
- Fixed an issue where the Loan Rescheduling document did not affect the Salary vouchers.
- Fixed an issue where the system did not allow manually deleting Employee Affairs information.

### Accounting
- Added the fields (5 Time, 5 Date, 5 Number, 5 Text) to the Receipt Request document.
- Fixed an issue where, in some cases, on the lines of both the **"Receipt Voucher"** and **"Payment Voucher"**, the account was inserted with a subsidiary type different from the one defined in the term config. For example, treasury account number 1 was inserted even though account number 2 was selected in the term config.
- Fixed an issue where creating a Receipt Voucher based on an invoice did not take into account the credit account type in the document term config.
- Fixed an issue where, on the Receipt Voucher, the total credit was not aggregated, causing the amount to appear in the Difference even though the document was saved.

### Manufacturing
- **Raw Material Issue Request:** Fixed an issue where searching by item code did not work.
- **Product Delivery:** Fixed an issue where creating a Finished Product Delivery did not calculate the cost unless raw materials were issued afterward or the Job Order was closed.
- Added a new document **"Raw Material Issue Request"**.
- Fixed an issue where clicking Analyze Requirements sometimes showed an empty error message.
- Fixed an issue where, in some cases, when the raw material issue value changed, the system re-saved the Finished Product Receipt voucher, causing the cost to be recalculated incorrectly.

## Settings

1. **Branch Data Replication:** Fixed an issue where, if a document existed at the branch in **"Pending Approval"** status while it was in Fixed status at the head office, and a **"Resave"** was performed on the document at the head office, the branch would not accept the resave because it required approval; the correct behavior is for the approval to remain closed as it is, and for the message to be accepted at the branch.

2. **Resources Voucher:** Fixed an issue where changing the values on the Resources voucher did not recalculate the Production Order's provisional cost.

3. **Criteria:** Fixed an issue where, after a user created a criterion on a field and the system administrator then removed that field from the list-view criteria fields, the user could not open the screen again.

4. **Shortcut Definitions:** Fixed an issue where editing any of the 24 default functions worked without problems, but selecting a new function from the available functions and assigning it a shortcut did not work.

5. **Exporting Reports to Excel** included the following issues:
   - The page header was shown even though "Remove Page Header" was selected in Global Config.
   - The report header was shown even though "Remove Report Header" was selected in Global Config.
   - Cells were merged and there were gaps between columns.

6. Fixed an issue where, for some items in the customer's database, the image did not appear on mouse hover.

7. Fixed an issue where, after creating a **"Field Filter"** file linked to a criterion and then editing the criterion, the filter did not work until a `Cache Evict` was performed.

8. Fixed an issue where creating a criterion on a (`Reference Generic`) reference and leaving the value empty did not work correctly, as it did not match the empty reference.

### Point of Sale
1. Fixed an issue where, after running the (`Recommit`) action on Point of Sale invoices, the system created a new Stock Issue voucher for the same invoice, incorrectly reducing stock again.

2. Fixed an issue where closing a Shift while the (`TomCat`) server was down, then starting the server and immediately re-transferring the data to Nama, caused severe slowness in Point of Sale.

3. Fixed an issue where, when creating a Price List for an item with two units of measure each with a different price, the system did not change the price for the selected unit when the unit of measure was changed.

4. Fixed an issue where the system sometimes transferred invoices without transferring their details or invoice codes.

5. Fixed an issue where Colors and Sizes were not included in Point of Sale quantity constraints.

6. Fixed an issue where colors did not appear in the Point of Sale application **"only the color code was shown"** and the color name did not appear.

7. Fixed an issue where the system sometimes duplicated the line, causing errors in quantities and calculations.

8. Fixed an issue where the system did not transfer Sales Exchanges to Nama when invoices were consolidated.

9. Fixed an issue where the system did not transfer Sales Returns to Nama when invoices were consolidated.

10. Fixed an issue where the system did not create Sales and Return vouchers as soon as the Exchange vouchers were transferred.

11. Fixed an issue where, in the notification for transferring receipts and payments, the system did not show the receipt or payment number, and instead showed the message (Point of Sale receipt null transferred successfully).

12. Fixed an issue where the system sometimes hung (`Hanging`) during operation (when selecting an item or paying).

13. Fixed an issue where, in some cases, adding more than 11 items caused the system to hang (`Hang`), resulting in one of the following scenarios:
    - When a line was entered, it was not added to the screen while the total increased.
    - When lines were entered, the invoice total was not summed.
    - Totals were calculated incorrectly.

14. Fixed an issue where the system sometimes hung (`Hanging`), and when items were added, the system did not insert them into the details.

15. Fixed an issue where, when using the option (Number of Hours Added to the Last Shift (after 00:00)) and entering, for example, 3 hours, the system deducted the hours from the current day instead of the new day.

16. Fixed data transfer issues where the program stopped sending Point of Sale invoices for a certain period; the sending component was therefore completely rewritten.

17. Fixed an issue where the system failed to search for items in Arabic.

18. **Exchange Screen:** The following issues were found:
    - Clicking the exchanged item's line caused the system to remove the (-) mark, turning it into a non-exchanged item.
    - Free items were not carried over from the Sales Invoice to the exchanged invoice, and were instead added as a new item.
    - There was an error transferring the payment methods to the Sales Invoice created from the exchange, and some invoices also had errors in calculating the invoice amount, the remaining amount, or the (Total Other Amounts Collected) value.
    - Some exchanged invoices did not have Return or Sales invoices created for them.

19. Fixed an issue where, in the notification for transferring receipts and payments, the system did not show the receipt or payment number, and instead showed the message (Point of Sale receipt null transferred successfully).

### Contracting
1. Fixed an issue where, when creating a Subcontractor Extract and calculating the terms value by clicking **"Aggregate Terms"**, the value was calculated correctly the first time, but clicking Aggregate Terms again recalculated it based on the extract's net value instead of its total value.

2. Fixed an issue where the Cumulative Execution Percentage did not work correctly inside Contracting Execution.

3. Fixed an issue where creating a Subcontractor Contract based on a Project Contract did not retrieve the fields (Unit Cost, Discount Percentage, Unit Price), or their total fields, in the document details.

### Real Estate
1. Fixed an issue where creating a Lease Contract with the Hijri date, selecting the From Date and specifying the duration in years, did not calculate the To Date and required it to be entered manually.
