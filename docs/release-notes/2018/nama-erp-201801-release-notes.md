# Nama ERP Release Notes - January 2018

::: info Release Information
**Release Date:** January 2018  
**Release Number:** 201801
:::

## Additions

### Inventory
- **Aggregation System:** Added a new button inside the voucher to calculate laundry supplies items, with an option added for them in the aggregation method; pressing the buttons calculates them for the whole voucher.
- Made substantial modifications to the Multiple Aggregation voucher.
- Developed 4 entity flows specific to warehouse transfer for the customer "Uni Crete".
- Took the End of Inventory Count voucher's dimensions into account when aggregating quantities.
- After showing the warehouse at the line level in the Stock Issue voucher, as well as the location after choosing the warehouse at the line level, improved so that the location opens for selection.
- Added a new option inside the Distribution Management settings allowing the stock count to be edited after the count has ended.
- Added a page for additional costs in the Multiple Aggregation voucher screen; on save, an Additional Receiving Costs voucher is created for each aggregation document created.
- Added a voucher named **"Multiple Packing Voucher"** to the Aggregation group.
- Allowed creating vouchers in Distribution when the warehouse is empty and warehouse relations are enabled.
- Added a unit group spanning more than one classification, so that units existing in more than one classification become usable at the item level ("Uni Crete").

### Sales
- Added a reference to the customer, vendor, employee and related parties named **"Higher Party (Accounting Substitute)"**, so that if, for example, a Sales Invoice is made for a customer whose accounting substitute is a related party, the journal entry is posted to the related party rather than the customer — or a Purchase Invoice for a vendor whose higher party is a customer, the journal entry is posted to the customer rather than the vendor.
- Changed the Sales Order document's term config so that it has an accounting effect (creates a journal entry) exactly like the Sales Invoice — with an option for no accounting effect, and allowing the term config to be saved without postings.
- **Sales Quotations - Invoice Offers - Offer on Invoice Item Count:** Added the ability to choose the free item to be one of the items in the free items group.
- Added 5 more to the existing 5 in the Sales Order.
- Applied the **"Multiples Policy Mechanism"** to free groups.
- Improved the Sales Invoice so that the system shows the prices, lot number and expiry date when selecting, at invoice creation, the issue voucher the invoice is built on.

### Purchasing
- Changed the term config for the Purchase Invoice discount so that if the lot has an Aggregation voucher, the discount is drawn through it (when the actual sorting ratio is higher than the supply sorting ratio). The actual sorting quantity is carried in details.n1 and the sorting price in details.n2, and the discount is reconciled from the invoice; if there is no Aggregation voucher and n1 and n2 are filled in manually, they are used instead.
- Moved the default vendor field within the data transferred in Point of Sale, due to its importance (the daily and weekly sales report is printed separately for each vendor, treating them as shortages sent to each vendor separately).

### Accounting
- Added Text1 at the line level in the Miscellaneous Invoice.
- Added tax for payment method fees in all documents containing payment methods, so that the tax is calculated on the fee value, with a financial term config for it set within the payment method.
- Added the tax policy for purchase items.

### Auditing
- Added an account group analysis page from the Trial Balance inside the Work Program window.
- Created the Work Program screen in the required form to pull the specified procedures (Basic - Control) into the Financial Statement Area screen.
- Improved the Financial Statement Area screen to be in the required form.
- Prevented creating more than one Materiality file on the same Audit file.
- Added the account group to the Test Definition, and from it added the Accounting Cycle.
- Made the Risk in the Description screen lines filter by the Audit file.
- Added the FSA screen.
- Added modifications to GCMobileApp.

### Banks
- Added an alternate code for Financial Papers so that a paper can be searched for by check number.

### Human Resources
- Allowed any number of manual indicators when **"Do not use KPI values"** is selected in the HR settings.
- Improved the Visa Request so that when a Final Exit Visa Request is made based on an End of Service voucher, the employee is copied.
- Added taxes to the Vehicle Action voucher at the line level, with the ability to add the tax policy to the Malfunctions file used in the Vehicle Action voucher.
- **Vehicle File:** Showed (the update document code) in the vehicle update files statement for the Vehicle file.
- Added the job location for the Job Offer.
- **Vehicle Action Voucher:** When selecting the action, the action type previously defined for it is filled in.
- **Vehicle Action Document:** Added the following modifications:
  - Added 5 Ref fields to the document lines
  - Added 5 N fields to the document lines
  - Added 5 Text fields to the document lines
  - Removed the action type as a required field in the document lines
- **Passport Receipt Request:** Added the passport number, copied automatically when selecting the employee.
- Moved the default vendor field within the data transferred in Point of Sale, due to its importance (the daily and weekly sales report is printed separately for each vendor, treating them as shortages sent to each vendor separately).
- Improved so that when a work schedule is made based on a Workplace Update voucher, each of (Employee - From Date - To Date) is copied to the lines.
- Added Termination vouchers to the Statistics screen in the Salary voucher, and recorded that in the salary details.
- When making an Exit & Return Visa Request based on a Bulk Leave voucher, improved so that (Employee and Start Date) are filled in, as is the case when making an Exit & Return Visa Request based on a Leave voucher.
- **Advance Voucher:** Improved so that when selecting the advance type, the salary item previously defined for it is filled in.
- **Job Offer:** Added the following modifications:
  - Added the ticket value field to the Job Offer, and to the ticket information update in the Employee screen (editable only from the Job Offer or Employee Data Update)
  - Added marital status to the Job Offer, which on save affects the Employee screen
- Added the field **Years of Experience with the Company** to the Employee file.
- Added the field remarks 2, but it was not added to the screen.
- **Vehicle Action:** Added the fields (text, ref, number, date) to the Vehicle Action document details.
- Added the fields ref1, ref2, n1, n2, text1, text2, date1, date2 to the following documents:
  - Social Insurance Employee Addition voucher
  - Social Insurance Employee Removal vouchers
- Added a field for the National ID in the employee information, along with the ID issue date and expiry date.
- Developed a document for Annual Increases.
- Added a new file named **"Termination Item"**.

### Contracting
- Improved so that the document's net amount equals the sum of the lines' amount due, rather than the sum of the lines' net amount.

### Point of Sale
- Prevented deleting free items during exchange or return.
- Added the change password button, which had been forgotten in the new menu. Note that if the password of the user used as loginid in the nama.properties file is changed, then after the new password is transferred, the system will not be able to transfer data, since the password must also be changed inside the file to the new one.
- Created a mechanism for making a discount after taxes in Point of Sale.
- Added the ability to send alerts from Point of Sale to a Nama user when a specific error occurs in data transfer, so management can review the errors.
- Added the option **"Do not create customers when connection is lost"** in the Point of Sale settings.
- Developed the option **"Prices in the item's unit table take priority over price lists"** in the Point of Sale settings, to give the item screen's prices priority over price lists in determining the item price.
- Added a distinguishing mark to the Point of Sale sales screen for Return and Exchange, by changing the color of the screen for each.
- Improved Point of Sale so that when Point of Sale settings and the settings required in Point of Sale (Global Config - Supply Chain settings) are changed, the change is transferred to Point of Sale without needing to restart the program.
- Modified the Favorite Items section so it is not re-read every time on startup.
- Added the ability to browse reports from within Point of Sale.
- Enlarged the size of the amount field at the top of the screen.
- Added the ability to use the coupon in the Exchange invoice.
- Added a (Reprint Point of Sale Document) button, to allow printing the Point of Sale document more than once.
- Added the option **"Note is required in Point of Sale Return"** to make the note mandatory in the Point of Sale Return voucher.
- Improved so that navigation between the payment window's fields is possible using the Enter key.
- Improved so that the user can pay the invoice with the same payment method more than once.
- Improved the coupon record to include a field for the coupon's remaining value.
- Improved the Point of Sale printing system so that the user can choose whether to print when the option **"Show print window when printing"** is selected in the Point of Sale settings file — in this case the sales invoice can be printed by pressing the print icon. When the option is not checked, the system will always print the invoice without asking the user.
- Added timing for invoices (Sales, Returns, Exchange) in Nama.
- Added the following options to the Permission file:
  - Ability to search for a customer

### Letters of Credit
- In the Expense item, when the credit side is defined as a specific subsidiary and the subsidiary is not specified in the expense type — on the basis that it will be specified in the Expenses voucher — allowed choosing the subsidiary type and the subsidiary in the Expenses voucher.
- Added attachments to the Expense voucher.

### Real Estate
- **Maintenance Expenses:** Added the property at the line level in the Maintenance Expense voucher screen, to allow recording different and varied expenses for more than one property in the same document.
- Added the list **"Unit Type"** to the Unit file, containing the options (Residential, Villa, Commercial, Office, Duplex, Garage, Annex, Commercial & Annex, Private Entrance, Mezzanine, Other1, Other2).
- Added the table **"Other Fees"** inside Real Estate vouchers.

## Settings
- Added a link to utils.html named (Create Subsidiary Accounts Tables) to create the tables the first time.
- Developed a mechanism to send the report by email from within Nama after running it.
- Showed an additional permission file code in the User file.
- **Fields & Screens Settings - Field Formation:** Developed the ability to run a query at the line level, like the criteria.
- Improved so that when field translation is changed, the translation affects the field names in error messages.
- **Payment Methods:** Added an option inside the payment method that allows manually editing the fee value in documents that use payment methods (Payment Voucher - Receipt Voucher).
- **Recycle Bin:** Added the user who performed the deletion to the list view, and also added sorting fields.
- Developed a mechanism to give a user a specific report code to view. The reason is that some reports have custom permissions, and in this case, if a user needs a specific report, either of the following could be done:
  - Add the custom permission to them, which would add the required report along with all reports sharing the same custom permission — which is incorrect
  - Make a similar copy of the report and link it to a new custom permission, then give it to the user, which causes report duplication
- Added the ability to set a maximum number of retry attempts for resending emails from Nama.

## Fixes

### Inventory
- Fixed an issue where duplicate lines in a price list did not show the line number in the error message.
- Fixed an issue where creating a price list for an item sometimes accepted saving and sometimes did not.
- **Stock Receiving Document:** Fixed an issue where the button for creating a Purchase Invoice did not transfer the items to the invoice document.
- Fixed an issue where an item prevented from use still appeared in the item code search in Sales, Purchase, and Warehouse invoices.
- Fixed an issue where creating a price list with the option **"Explode versions with item selection"** did not display the version's unit correctly.
- Fixed an issue where pricing an item using the "add item to price list" button inside the Item screen exploded the item's units and versions even though the explode units and versions option was not used.
- Fixed an issue where pressing "Create with Delete" in the item section deleted all items.
- Fixed an issue in calculating indirect costs and wastage in the aggregation of vegetables and fruits.

### Sales
- Fixed an issue where setting page-level permissions on the Sales Order and hiding page 1 caused the Sales Order to appear empty when opened, requiring pressing page 2 for it to appear.
- Fixed an issue where creating a Sales Order based on a Sales Quotation did not copy the Delivery Date and Delivery Time fields into the details.
- Fixed an issue where, when creating a new visitor and setting the visitor impression to any choice (A-B-VIP) and then converting the visitor to a customer, the visitor impression choice (A-B-VIP) was copied into the Fax field on the Customer screen and rejected saving with the error message (must be a phone number); staff did not know why the impression was being copied into the Fax field. The issue was fixed by creating the entity flow EAFieldsValueCalculator and applying it directly to the customer.
- Fixed an issue where creating a Sales Order and then an Issue Request based on that order did not copy the Sales Order's details into the Issue Request, even though the Issue Request's term config had detail copying enabled.
- Fixed an issue where, when creating a free-item offer on 3 items belonging to a specific category, if the user inserted two items from that category plus another item that does not belong to any category, the system also inserted the free item.
- Fixed an issue where, after defining a free group for an item, the system did not allow changing the group's items, resetting them to the group's first items on save.

### Purchasing
- Fixed an issue where an error appeared when the vendor's payment policy was Cash.
- Fixed an issue where Tax 3 did not appear in the Purchase Return term config, preventing its postings from being configured.
- Fixed an issue where, in the Payment Voucher - Invoices page, choosing a vendor subsidiary and aggregating documents sometimes did not show its Purchase Invoices.

### Accounting
- Fixed an issue where creating a Payment Voucher based on a payroll record no longer copied the data as it did before.
- Fixed an issue where the tax in the Expenses voucher was sometimes calculated incorrectly.
- Fixed an issue where the Miscellaneous Invoice sometimes did not save.
- Fixed an issue where, in the Payment Voucher - Invoices page, the net was shown in local currency, the paid amount in local currency, and the "remaining voucher value" in foreign currency, even though the invoice amount and the remaining amount were in local currency, which was incorrect.
- Fixed an issue where editing a Receipt Voucher after saving, when it contained a collected receipt book, showed the message (the receipt is already used), and the system did not accept the edit to the Receipt Voucher at all.
- Fixed an issue where the Receipt Voucher and Payment Voucher did not total the credit or debit total column correctly — meaning that when more than one account was added, only the account on the first line was totaled.

### Manufacturing
- Fixed an issue where creating more than one raw material Stock Issue voucher for the same item caused the last voucher to have a costing problem, which could only be fixed by changing the voucher's date and saving again.

### Human Resources
- Fixed an issue where an error appeared when creating a Final Exit Visa Request based on an End of Service voucher.
- Fixed an issue with the Employee Aggregation button in the Payroll Record and Manual KPI Values screen, where pressing it with an Employee-to-Employee or Department-to-Department range entered did not work.
- **Exit & Return Visa Request:** Fixed an issue where choosing based on a Leave voucher filled in the Employee but did not fill in the Residency and Expiry Date.
- Fixed an issue where deleting a payroll record sometimes showed the error message **"The record cannot be deleted because it is used in the field Salary Voucher in the table dbo.SalaryDetailSysEntry"**.
- **Insurance Offers Request:** Fixed an issue where selecting a number of employees only inserted 25 employees, and did not insert the rest.

### Contracting
- **Assay Voucher:** Fixed an issue where adding a line in the items did not affect the total discount.

### Point of Sale
- Fixed an issue where, when issuing a Transfer Request, the system did not include the shift code in the transfer request sent to Nama.
- Fixed an issue where an error sometimes occurred when transferring a shift opening and closing.
- Fixed an issue where, after issuing a coupon on an invoice, the user could return the invoice while the coupon remained valid — the system allowed this even though the customer had already benefited from part of the coupon.
- Fixed an issue where the Point of Sale general reference could not be deleted after being created.
- Fixed an issue where the system did not apply the new font to the following:
  - The items table, whether field headers or item data
  - Entered information such as (the note in the Receipt and Payment documents, the note in an old invoice, the code, the currency, the customer code, the sales representative, the Point of Sale table, price inquiry, stock transfer request, search windows)
- Fixed an issue where, following these steps:
  - Insert some items that require a free item
  - After inserting the free item, enter the same items that require the free item again
  - Mark the recently inserted items
  - Delete these items via the search icon
  the system deleted only the free item.
- Fixed an issue where changing the shift's language while there were values in the shift caused the system to delete those values when they had not yet been saved.
- Fixed an issue where, with multiple payment, the user could enter any text input in the fields **"Return Receipt"** and **"Operation Number"**.
- Fixed an issue where inserting three items in one group (with the option **"Do not add a new line for the free item"** checked) did not set the free item's price to 0.
- Fixed an issue where, in the Sales Return invoice, the field for the Exchange invoice that produced the sales returns was labeled incorrectly as (النص البديل, Replacement text), when it should have been (سند الاستبدال, Replacement Document).
- Fixed an issue where, when issuing an invoice in which the customer had taken a specific quantity of an item and returned part of it (took 8 and returned 3, for example, for a total of 5), the system failed to save the resulting sales invoice, because the total paid matched what it was on the Point of Sale invoice, while the net differed because the negative quantity was carried over as positive. Despite the processing failure, the system created an Expenses voucher with incorrect quantities, since it did not take the returned quantity into account.

### Letters of Credit
- Fixed an issue where an error appeared when saving the Expenses voucher after VAT was enabled.

### Reports
- Fixed an issue where the maximum number of report runs in the User screen blocked the user from running reports regardless of the allowed number.

## Settings
- The system accepted saving a fiscal year with unordered periods; this issue was fixed by ordering the periods based on the start date.
- When editing a screen by adding a button and placing a date field among the fields, the date is not copied correctly.
- When showing an additional permissions file in the User file, the permissions file code does not show.
- When a document book is made inactive, it does not show when creating the document, but if it exists in a default template, it still saves the document — the correct behavior should be not to save when the book is inactive.
