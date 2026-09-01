# Nama ERP Release Notes - July 2016

::: info Release Information
**Release Date:** July 2016  
**Release Number:** 201607
:::

## Additions

### Inventory
- Added a dedicated file for linking items to warehouses.
- Added the option **"Do not verify quantities against vouchers created from the Stock Taking voucher"** in the Distribution Management Settings.
- Added the option to delete Stock Taking vouchers on resave, to the Distribution Management Settings.
- Added the **"Consolidate Lots"** button to the Stock Issue voucher, like the Stock Transfer voucher and the Raw Material Issue voucher.

### Sales
- Added four options to the Global Config as follows: (Tax 1 is a value not a percentage, Tax 2 is a value not a percentage, Tax 3 is a value not a percentage, Tax 4 is a value not a percentage).

### Purchasing
- Added the option **"Do not mark the Purchase Return Request as processed"** in the Distribution Management Settings.
- Improved the Purchase Invoice so that, when a vendor is selected, it is automatically copied to the subsidiary.

### Banks
- When creating a Financial Paper and selecting the cheque book, improved so that the system automatically selects the bank account from the book.

### Customer Relationship Management (CRM)
- Added the field **"Screen"** inside the **"Development Request"** document, so the user can select the name of the screen to be developed.

### Human Resources
- Added an entity flow to automatically fill in the attendance time, if it is missing, with the employee's default work-shift time, according to a specified criterion.
- Added the option **"Departure permission starts today (lateness does not add the difference between the end of the permission and the start of actual attendance)"** to the Human Resources Settings.
- Added the option **"Prevent issuing a Salary Voucher with a date outside the payroll period"** in the Human Resources Settings.
- Added changes to the Job Applicant screen, where the following fields were added: (Interview date, Interview appointment, CV attachment, Interview status).
- Improved so that creating a Return-to-Work voucher based on a Leave voucher updates the balance based on the date of the selected Leave voucher, not the date of the last leave.
- Added a field in the Human Resources Settings that holds the default number of days in the month.

### Project Management
- Added **"Time in hours"** (planned / actual) to both of the following screens: (Task Execution, Task Execution Approval).

### Point of Sale
- Added a permission enabling qualified users to return items without an invoice.
- Added permissions for opening the Settings window.
- Supported taxes on Point of Sale invoices.
- Added item specifications (such as color, size, measurement, etc.) to the Point of Sale invoice.
- The translation for **"Open - Close Drawer"** was incorrect; it should be `(Cash drawer)`.
- The `(Hints)` for **"Load Data"**, **"Exit"**, and **"Push Data to Source"** were not translated into English.
- Improved the Cash Count and Shift windows so that the fields **"Machine Code"** and **"Machine Name"** have the same height.
- Improved the Shift window so that the title shows either **"Open Shift"** or **"Close Shift"**, not both titles together.
- In both the Cash Count and Shift windows, improved the grid field titles to be as follows: (Payment Method, Book Balance, Actual Balance, Difference).
- Changed the English name of the Stock Taking window to be `"Cash count"` instead of `"Inventory"`.
- Arabized the Help titles.
- Changed the Help title `"Show Holded Invoices"` to be `"Show Held Invoices"`.
- Added a line for the default language of Point of Sale via the `nama.properties` file.

### Manufacturing
- Added a dedicated file for indirect production costs, for retrieving them in Production Orders; the indirect manufacturing costs are also distributed over stock items according to multiple distribution methods.
- Added the quantity, item, and Production Order to the displayed columns on the Product Delivery pages.
- Made the fields **"From Step"** and **"To Step"** in the lines of the Production Execution document required fields.

### Fixed Assets
- Added the ability to make the tax not part of the asset value (a recoverable tax).
- Added the option **"Shorten journal entries"** to the term config of the Asset Addition and Exclusion document.

### Letters of Credit
- Added Stock Receipt Vouchers - Expense Vouchers - Assignment Vouchers to the Letter of Credit, on a new page (Linked Records).

### Real Estate
- **Owner / Buyer file**: Added the following changes:
  - Added the owner type to include (Individual - Group)
  - Added a table of owner details with the fields (Owner/Buyer, Number of Shares)
  - When there is any accounting effect on a group owner, it is split according to the number of shares held by the owner, using the formula (Value * Owner's Shares ÷ Total Number of Shares).

- **Sale Contracts and Opening Contracts**: Improved so that a Collection Voucher can be issued for more than one installment.
- **Collection Voucher**: Improved so that creating a Collection Voucher based on a Sale Contract shows only the unpaid installments instead of showing all the installments.
- Fixed an issue where, sometimes, entering an Opening Sale Contract showed a blank error message.
- Added a system for the annual increase method in Lease Contracts.

- **Opening Sale Contract**: Introduced the following improvements:
  - The installment is calculated from the installment's due date rather than from the actual date, as it worked in previous versions.
  - Added the field for the amount paid via the system on the line, so that when a Collection document is created against the Sale Contract, its effect appears in the contract.

- **Sale Contract and Opening Sale Contract**: Added the option **"Verify that the remaining balance matches the total installments"** to the term config of both the Sale Contract and the Opening Sale Contract.
- Added the two windows **"Sale Quotation"** and **"Rent Quotation"**, and also added the ability to create Sale and Lease Contracts based on a quotation.
- In all Real Estate documents, improved so that, when the user selects the project in any document, the system automatically filters to only the units that exist in that project.
- Improved the system so that it retrieves the **"Floor"** like the rest of the data retrieved from the Unit file, inside all Real Estate documents.
- Added the following data to the Unit file: (price per square meter of the unit, garden area, price per square meter of the garden, total value).
- Added the following data to the Reservation document (booking deposit, remaining balance, number of installments, reservation expiry date, sales representative).

- **Sale Contract / Opening**: Added the following improvements:
  - Grouped the data of the **"Create Installments"** button into a group within the screen.
  - Added both **"Value of the first installment"** and **"Value of the last installment"** within the **"Create Installments"** data, so that their value is deducted before distributing the contract value over the number of installments or the value of each installment.
  - Added the **"Handle the remaining amount"** property within the **"Create Installments"** data, giving the user four options as follows: (added to the first installment, added to the last installment, separate first installment, separate last installment).

- Added a new document within the Sales documents of the Real Estate system, named **"Preliminary Sale Contract"**.
- **Collection document**: Added the ability to create a Collection Voucher for more than one installment by inserting the installments into lines.
- **Temporary Reservation document**: Added the ability to apply the **"Temporary Reservation"** document to units and buildings, as is the case with the block, square, and land plot.
- Changed the installment due date in the Lease Contract and the Opening Lease Contract to be in the Hijri calendar when working with the Hijri date is selected, as well as the installment code in the contract.
- Added the option **"Work with the Hijri date"** in the Lease Contract file.
- **Opening Sale Contract**: Improved the term config for the **"Opening Sale Contract"** document so that it accepts having no accounting effect.

## Settings

- Added the following options to the Global Config: (Edit the selected legal entity, Edit the selected sector, Edit the selected branch, Edit the selected department, Edit the selected analytical group, Edit the selected dimensions in report inputs).
- Added the ability to show the date with its Hijri equivalent in Notifications.
- In Notification templates, added the ability (Change Status) on the document, so that a notification can be sent to an employee that a user has changed the document's status.
- Added an option in the Users file, **"Do not allow logging in to the General legal entity"**, to force the user to log in to a specific legal entity and not work from the General dimension.
- Added a table to the Global Config for ignoring closed periods for specific dimensions.
- Created a new entity flow named `com.namasoft.sws.SWSPreventUpdateDetailedRemarkLinesAction`.
- Added the option **"Prevent manual coding for automatic books"** to the Global Config.
- Allowed error messages to contain `HTML` code, so a link can be placed inside the coding error message with the recurrence positions.
- Added two fields for the error message in the Global Config, as follows: (Automatic coding error message with recurrence position - Arabic, Automatic coding error message with recurrence position - English).
- Improved so that a `Detailed Remark` can be inserted via the More menu in documents, as well as the Meeting Note.
- Added the option `"Log Report Performance To DB"` to the Global Config file.
- Developed the ability to show the tasks the system is currently running via `serverip:8080/erp/test.html`.
- Changed the unused features to include Discount 1 through Discount 8.
- Added a group inside the Remarks screens.
- Added the option `"CancelActivated"` to some files, such as the dimension files (legal entity, sector, branch, department, analytical group), Fiscal Year, Book, Term Config, and Group, so that records in these files can be deleted after deleting all the documents linked to them.

## Fixes

### Inventory
- Fixed an issue where an error occurred while saving the Stock Taking Completion voucher, when recalculating quantities based on a date and saving.

### Sales
- Fixed an issue where creating an offer with a free item in the Sales Invoice showed the free item's price and affected the invoice net before saving (invoice total - free item price), while after saving the total showed correctly.
- Fixed an issue where, sometimes, saving a Sales Order showed a blank error message.
- Fixed an issue where Point of Sale did not support free items.
- Fixed an issue where entering a Sales Invoice and entering its linked stock voucher caused the voucher to be deleted on saving, without showing a reason.

### Purchasing
- Fixed an issue where, sometimes, editing the Purchase Invoice and saving showed a blank error message.
- Fixed an issue where, sometimes, the tax was deleted from the Purchase Invoice on saving, without reason.
- Fixed an issue where, in the Miscellaneous Invoice, editing the actual date did not automatically update the period.
- Fixed an issue where an error sometimes occurred when creating a consolidated Purchase Request while selecting Purchase Requests.

### Settings
- Fixed an issue where, when selecting the legal entity in the Inter-Company Transfer at the line level, the system only showed the legal entities after deleting the legal entity present in the documents' dimensions.
- Fixed an issue where Attendance could not be imported from a `csv` file, because the system read the file incompletely.
- Fixed an issue where the edit log of documents could not be viewed at the customer's site.
- Fixed an issue where calculated fields sometimes did not work.

### Human Resources
- Fixed an issue where, sometimes, query statements did not work when placed inside a salary component's calculation formula.
- Fixed an issue where, when defining official holidays and creating an Attendance voucher by adding employees manually, the system recorded attendance for the employees during official holidays and did not remove it, unlike the weekly rest days.
- Fixed an issue where, in Payroll Records, when Salary Vouchers were issued as drafts, the Payroll Record could not be edited.
- Fixed an issue where deleting a draft Salary Voucher showed the error message **"Records that are still a draft Salary Voucher cannot be used."**
- Fixed an issue where creating a Salary Voucher for an employee showed the salary value as `(9999.99)`, even though the currency has a 3-digit decimal factor and it should be `9999.999`.
- Fixed an issue where the system allowed saving a Job Offer document for legal entity (General).
- Fixed an issue where creating a Job Offer for a group of employees containing the salary components `A001 - A002 - A003` and filling in the components' values, then creating a Salary Structure containing the salary components `A001 - A002 - A003 - A004 - A005 - A006 - A007 - A008 - D001 - D002` and entering it in the same Job Offer, inserted all the salary components from the beginning and erased the values previously entered for the components.

### Point of Sale
- Fixed an issue where the amount due, shown in red, included the total value without the discounts.
- Fixed an issue where the user could reissue an old invoice by recalling an old invoice, holding it, recalling it again, and then reissuing it.
- Fixed an issue where the **"+"** icon for repeating the line did not carry over the item's specifications (color, size).
- Fixed an issue where inserting an item in the invoice did not remove the spaces preceding the item code `(Trim Left)`.
- Fixed an issue where, when logging into the database, entering a wrong username or password made the system show an error message, and if the user then corrected the mistake, the system did not hide the displayed error message.
- **Payment window**: Fixed an issue where entering an amount less than the amount due and then pressing Enter caused the system to delete this value.
- Fixed an issue where the system accepted defining a new customer with a code that already existed.
- Fixed an issue where the system accepted entering invalid codes on the Point of Sale invoice header, for each of (customer code, currency, warehouse, location, item code).
- Fixed an issue where, when inserting an item via the touch screen, the icon for deleting the item did not work for that item.
- Fixed an issue where inserting a new item in the invoice inserted the quantity `(1)` without inserting the item's price, requiring the quantity to be re-entered manually for the item's price to appear.
- Fixed an issue where clicking the currency search icon several times changed the size of the currency window. In addition, when closing Point of Sale, the currency window remained open in Windows.
- Fixed an issue where the system allowed issuing an invoice with quantities equal to zero.
- Fixed an issue where using the shortcut for creating a new invoice did not warn the user that the current invoice's data would be lost.
- Fixed an issue where pressing `"ESC"` while there was data in the invoice did not warn the user that the data would be lost.
- Fixed an issue where there was no way to move the cursor to the Point of Sale details using the keyboard.
- Fixed an issue where, when deleting one of the items, the cursor did not move to the **"Item Code"** field.
- Fixed an issue where, in the Invoice Payment window or the Multiple Payment window, the cursor was not in the **"Amount Paid"** field.
- Fixed an issue where, after paying the invoice, the cursor did not move to the **"Item Code"** field.
- Fixed an issue where recalling a held invoice did not warn the user that the current invoice's data would be lost.
- Fixed an issue where the user could hold an unlimited number of empty invoices.
- Fixed an issue where there was no way to delete held invoices.
- Fixed an issue where the system did not delete held invoices when closing the shift, and instead showed them in the next shift.
- Fixed an issue where, sometimes, the system inserted an item code different from the item code entered in the document header.
- Fixed an issue where there was no way to cancel the Multiple Payment window.
- [The long list of Point of Sale fixes continued...]

### Manufacturing
- Fixed an issue where adding a Stock Transfer based on a Product Delivery showed a blank error message.
- Fixed an issue where the system would not accept saving the Production Order voucher until the quantity was edited.
- Fixed an issue where not entering values in the fields **"From Step"** and **"To Step"** in the lines of the Production Execution document showed a blank error message.
- **Production Order document**: Fixed an issue where the required quantity of the product's components was calculated incorrectly, computing the raw material quantity needed to produce 1 unit of the final product instead of the quantity written at the line level against each raw material.
- Fixed an issue where, in the Quality Confirmation voucher window `(Quality Assurance Doc)`, the system refused to save the document in some cases.

### Real Estate
- Fixed an issue where deleting a Sale Contract or an Opening Sale Contract made it impossible to resell the Unit, because the Unit remained **"Sold."**
- **Collection document**: Fixed an issue where creating a **"Collection Voucher"** based on an Opening Sale Contract did not retrieve the Unit's data, such as the buyer and the property data, such as the project... etc.
- **Collection document**: Fixed an issue where the system did not filter the installment codes after selecting the document in **"based on"** an Opening Sale Contract.
- **Collection document**: Fixed an issue where, as soon as the installment code was selected, the system did not retrieve the installment's data, namely (installment type - due date - amount).
- **Collection document**: Fixed an issue where, sometimes, a blank error message appeared when trying to save the document.
- Fixed an issue where there was a day's difference when working with the Hijri date, as saving in the Lease Contract and the Opening Lease Contract still had a one-day error.
- Fixed an issue where deleting a land plot, unit, building, or block linked to a Reservation voucher was allowed by the program, despite its link to a Reservation document.
- **Opening Sale Contract**: Fixed an issue where, sometimes, the error **"Operation cannot be performed"** appeared when trying to create the installments.

### Project Management

1. Fixed an issue where, in the Task screen, the total planned time was calculated from the lines as (planned + actual) instead of the total planned value of the lines.

### Letters of Credit
- Fixed an issue where the system did not show the linked documents on the Letter of Credit's Linked Records page.
- Fixed an issue where saving an Assignment Voucher showed the linked Stock Receipt Vouchers incorrectly, and the required documents were not consolidated.
- Fixed an issue where, sometimes, saving an Assignment Voucher showed a blank error message.
