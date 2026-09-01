# Nama ERP Release Notes - August 2017

::: info Release Information
**Release Date:** August 2017  
**Release Number:** 201708
:::

## Additions

### Inventory
- Added the option **"Do Not Recalculate Item Quantities When Saving the Assembly Document"** to the Distribution Management settings.
- Added the option **"Allow Starting a Stock Taking When There Is a Transaction on the Warehouse After the Stock Taking Date"** to the Supply Chain settings.
- Added the ability to track quantities from the Consolidated Purchase document against the request documents consolidated within it.

### Accounting
- Added the option **"Add Debit and Credit Notes to the Invoice's Payment Vouchers"** to the Debit and Credit Notes term config.
- Developed the option **"Use the Transaction's Local Currency"** on the Account screen. When the option is enabled, the system uses the local currency instead of the account's currency.

### Human Resources
- Handled employee income tax in accordance with the amendment to Article 8 of Law 91 of 2005.
- On the Rescheduling screen and the Loan Exemption screen, added the employee's data when selecting Based On a Loan Request or a Loan document, so that (the employee's name, job number, location name, original loan amount, and remaining loan balance) all appear on the Rescheduling and Exemption screens.
- Added the entity flow **"EALiptisSetComponentFromAnotherWithMax"** to calculate the Communication Allowance salary component, calculating the component's value by multiplying the loan installment value by the percentage (Liptis).
- Added category (AA) to the Medical Insurance categories.
- Developed the following documents (Start Work Request for the Start Work document, Service Termination Request for the Service Termination document).
- **Exit and Re-entry Visa Request screen:** Added a (Based On) field for Leave documents, along with the issue date, the start and end dates, and the issued visa number, in addition to copying the employee and the start date from the Based On document.
- Removed the validation that prevented editing the leave balance for an employee who has no Job Offer.

### Service Center
- **Job Orders:** Added a **"Kilometer Difference"** field to calculate the difference between the current meter reading and the previous meter reading.

### Point of Sale
- Added the ability to print the Receipt and Payment vouchers in Point of Sale.
- Added a table for coding Point of Sale documents inside the Machine in Nama.
- Added an option on the Machine in Nama to resend documents, so every branch can resend without having to open each branch individually, and so data transfer errors inside each Machine can be viewed.
- Added an action to update the Point of Sale system automatically.
- Developed a **"Migrator Database"** for Point of Sale.
- Improved Point of Sale so that Point of Sale errors are shown on open, only to those who have permission to view data errors.
- Added a button next to the Update Version button on the Settings page; clicking it opens a file showing `Current Memory usage & thread dump`.
- Added Document Classification to the Point of Sale screen, in both the Machine settings and the Point of Sale settings.
- Improved so that, when viewing a previous invoice and then pressing the ESC key, the system returns directly without showing a confirmation message.
- Improved so that clicking the Send All button shows the message (No New Data to Send) if all the data has already been sent.
- Improved Point of Sale so that the system opens the login screen as soon as the Point of Sale version is downloaded automatically, in addition to deleting the downloaded zip file.
- The error count for data transfer that exceeded 25 times is now reset as soon as the option **"Resend Documents Inside the Machine"** is selected, without needing to open the branch and click the Reset Errors button.
- Improved the system so it records the last time Point of Sale communicated with Nama inside the register, the same as with site replication.
- Added a Cash Balance Analysis button to the Shift Closing screen.
- **Machine screen - Point of Sale Errors page:** Updated the error date to the latest date.
- Improved so that showing or hiding the default general reference in Point of Sale can be controlled.
- Added a count for pending invoices.
- **Data Transfer Errors window:** Added the ability to select and copy fields, and added a Copy All Fields button.
- Improved Point of Sale so that any file prevented from use in Nama cannot be used, so it does not appear in the Point of Sale search.
- Added scrolling to the Errors window.
- Improved the system so it shows a message explaining the problem if there is an error in the Point of Sale properties file, and the splash screen no longer appears.
- Added an Actual Date column to the Customer grid in Point of Sale, to know when this customer was registered.
- On the item search screen inside Point of Sale, improved so that pressing the Enter key shows the results.
- Added statistics for data transfer (i.e., the data transferred by Point of Sale to Nama).
- Resend Data and Download Latest Version used to exist only inside the Machine file; they were added to the More menu of the Machines list view, so more than one machine can be selected and the desired action run from the More menu.
- Added the option **"Prevent Closing While Pending Documents Exist"** to the Point of Sale settings.
- Improved the grid on the Shift Opening, Shift Closing, and Stock Taking screens so a cell keeps the entered value as soon as you leave the cell, the same as the Sales grid, where currently you must press Enter after typing the value to save it.
- Added the ability to view documents that the system failed to send.
- Added the ability to resend documents whose sending had previously failed multiple times.
- Payment vouchers larger than the amount in the Cash Drawer are now allowed.
- Added the ability to view previous Receipt and Payment vouchers in Point of Sale, like invoices.
- When creating a Return for a Point of Sale Sales Invoice, the original salesperson's name on the invoice is now shown and cannot be edited.

### Customer Relationship Management (CRM)
- Added n5 to the Sales Line document.

### Letters of Credit
- Improved the Letter of Credit file so that, when creating a Letter of Credit and selecting the vendor, that vendor's default currency appears automatically.
- Added the option **"Use the Net Instead of the Price in Letters of Credit"** to the Distribution Management settings.

### Contracting
- Developed the entity flow **"tabularListPage#EntityServiceBaseImplementor"**, which allows contracts that have been disabled from use to still appear, while preventing them from being saved or having any transactions performed on them.

## Settings

- **"Approval Definition"** document: Added the ability to apply the approval to a **"List of Types"**.
- Added the following two options to the Permission file:
  - Allow using disabled records for editing.
  - Show disabled records in search.
- Changed the message shown when uploading a print form, **"A new version has been installed .."**, to give the actual error instead.
- Added the field **"Use This Company's Logo When Logging in to the General Company"** to Global Config, which lets you specify a company whose logo is used when logging in to the General Company; the option **"Use This Company's Logo When Logging in to the General Company"** was also added to the Company screen itself, with the same effect.
- Improved Nama to speed up system startup time.
- On list screens, added the two actions (Disable Use for Selected Records, and Allow Use) to the More menu.
- Added the action **"Resend Data and Download Latest Version"** inside the list view, allowing more than one branch to be selected and the action applied.

### Manufacturing
- Added the field **"Likely to Be Available"** to the lines of Manufacturing Planning documents.

## Fixes

### Inventory
- Fixed an issue where the system sometimes did not accept saving a Stock Issue Request because of the batch number.
- Fixed an issue where, in some cases, creating a Stock Receipt based on a Letter of Credit showed the error "the operation cannot be performed".

### Sales
- Fixed an issue where, when selecting an item on the Sales Invoice, it could not be marked as a free item because that option was disabled.

### Purchasing
1. Fixed an issue where the Consolidated Purchase Request did not set the approved quantity in the details, leaving it unchanged.

### Human Resources
- Fixed an issue where, in some cases on the Closing document, if Indirect Costs with machine hours were selected, the system calculated the machine hours at a different value than the one on the Resources voucher.
- Fixed an issue where the system did not send the Delegation voucher created from the Leave voucher to the branches.

### Accounting
1. Fixed an issue where, when creating a Receipt Voucher based on a Receipt Request, the line's subsidiary was updated from the **"Receive From"** field on the Receipt Request instead of from the Recipient cell.

### Manufacturing
- Fixed an issue where an error occurred when saving a Production Execution document because Based On was not selected.
- Fixed an issue where unreserving the related document did not work on Raw Material Issue.
- Fixed an issue where, in some cases, there was a difference between the actual cost and the calculated cost.
- Fixed an issue where the Indirect Cost type **"Value per Hour of Human Resource"** was not calculated on the Closing document.
- Fixed an issue where Nama copied the costs from inside the Production Order term config when resaving Production Order Closing documents, causing problems when the indirect costs changed from one period to another; the correct behavior is to select the indirect costs inside the Production Order Closing document, not inside the Production Order term config.

## Settings

- Fixed an issue where, when using a query for the error message of a criteria-based validation, if the query returned more than one column, the results only showed for the first column.
- Fixed an issue where, when escalating a particular approval to the direct manager, even after the manager approved it, the remark **"Pending Approval"** still appeared.
- Fixed an issue where, on some dashboard widgets, the title did not appear; this issue occurred when the widget type was a table.
- Fixed an issue where, in the `EntitySystemEntry` table, the `reviseLevel` and `revise` fields did not reflect the document's review status (Liptis).

### Point of Sale
1. Fixed an issue where linking a print form to a related form (a copy of the same base form) caused the related form to print twice.

2. Fixed an issue where, on the Machines screen, downloading the latest Point of Sale version from the More menu for all branches at once caused the system to download the version more than once at every branch.

3. Fixed an issue where the Table label (Point of Sale Table, Table) did not change when switching Point of Sale from Arabic to English and back, staying as-is unlike all the other fields on the window.

4. Fixed an issue where, when closing Point of Sale by mistake (using any of the Close buttons, or Alt+F4), the user could not undo the closing, because the Cancel button and the Close button on the confirmation window both confirmed the closing.

5. Fixed an issue where, when marking the free item as the last item on the invoice, the system inserted the first item instead of the last one.

6. Fixed an issue where, if there was an error in the Point of Sale settings properties file, the error message appeared about 20 times in a row.

7. Fixed an issue where clicking the close box at the top of the screen and then choosing (Cancel - i.e. cancel the closing) still closed Point of Sale.

8. Fixed an issue where the system did not count or show pending invoices inside the Previous Invoices screen.

9. Fixed an issue where the discount percentages could not be edited on the lines of the Point of Sale invoice inside Nama.

10. Fixed an issue where the system added the customer code, if the customer was already coded, and inserted it into the invoice automatically.

11. Fixed an issue where, after adding the Shift Opening voucher to the documents that must be transferred as soon as they are saved, the opening was transferred but the closing was not transferred afterward, because `sent = 1` was found in the Shift table.

12. Fixed an issue where, on the Machine screen's Errors page, the system did not update the error date to the latest date when the error recurred.

13. Fixed an issue where master files appeared in Point of Sale even though they were disabled from use in Nama.

14. Fixed an issue where changing an item's code while keeping the same (ID) in Nama was not reflected by a change in Point of Sale.

15. Fixed an issue where Point of Sale sometimes had errors reading items or certain files.

16. Fixed an issue where creating new Item Settings or new Item Dimensions and linking them to an item made the item unreadable in Nama.

17. Fixed an issue where, after entering an item via search from the search screen, the item code remained in the selection field.

18. Fixed an issue where the system sometimes sent old, suspended Point of Sale invoices to Nama, causing problems and confusion between the original paid invoices and the other invoices.

19. Fixed an issue where Point of Sale did not read the item settings file correctly.

20. Fixed an issue where deleting a Point of Sale Sales Invoice from Nama did not delete its journal entry.

21. Fixed an issue where Shift documents could not be edited in Nama even though the option allowing editing was enabled.

22. Fixed an issue where, after creating an invoice for items and then changing the item code before sending the invoice to Nama, the invoice containing items with the old code could not be sent.

### Human Resources
1. Fixed an issue where the Salary voucher did not put the loan value into its salary component.

2. Fixed an issue where issuing a Salary voucher with a criterion containing incorrect fields showed an empty log.

3. Fixed an issue where, in some cases, issuing payroll showed an empty log.

4. Fixed an issue where giving the employee two leave types on a Job Offer, then saving and deleting one of them, did not delete it from `SysVacationsBalance`.

### Letters of Credit
1. Fixed an issue where cancelling an LC assignment made it impossible to create another assignment.

### Contracting
- Fixed an issue where clicking Aggregate Terms on the Subcontractor Extract screen did not sort the terms by term code.
