# Nama ERP Release Notes - August 2016

::: info Release Information
**Release Date:** August 2016  
**Release Number:** 201608
:::

## Additions

### Inventory
- Added **"Starts With"** for auto-coding for the Item section, allowing coding in the same way as coding in groups.
- Added the ability to auto-code according to criteria within the Item section.
- Added a date field at the line level in all Inventory documents.
- Improved the way the item's color/size matrix works.

### Sales
- Improved the rounding method for price updates through the Price Update window.
- Within customer keywords, improved so that more than one keyword file can be selected, and added a column for relative weight at the line level.
- Improved so that the version is entered manually rather than by default when adding a new price list for each item at the line level.
- Prevented creating a Sales Invoice based on a system-generated Stock Issue.

### Purchasing
- Prevented creating a Purchase Invoice based on a system-generated Stock Receipt.

### Accounting
- Added an option in Accounting settings to prevent the subsidiary, account, and amount from being copied automatically from the Financial Paper to the header of the Receipt and Payment Vouchers.
- Developed the option **"Revert to Previous Versions"** in the More menu after using the shortcut `(CTRL+ALT+X)`, to select a group of accounts and revert them to their last previous version.
- **"Disbursement Request" document:** Improved so that a disbursement can be requested for multiple parties through the Payment Voucher's details.
- In the Receipt Voucher based on a Collect Document, added the ability to select a group of the installments in the payments and create Financial Papers for them, copying the amount, due date, and customer name from the payment lines to the Financial Papers.
- Improved intercompany balances so they can be between more than two companies, such that one party is debited to one company while the other party has one or more companies.
- **Account Classification:** Added a text field named **"Classification Order"** so it can be used to order classifications in the Income Statement and Balance Sheet.
- Added a new column in the `LedgerTransLine` file to show the transactions issued from account distribution.
- Improved so that when creating a (Payment, Receipt) Voucher for a cheque, only the cheques linked to the bank account in the voucher are shown, and the rest of the Financial Papers are not shown.
- Added the ability to code Financial Papers from within the Receipt and Payment Vouchers, on the Financial Paper page.
- Made the following changes to the Payment Voucher:
  - When creating a cheque Payment Voucher and selecting the Financial Paper, the paper's data is copied to the Payment Voucher as follows:
    - Bank account to Subsidiary (and also the account based on the term config)
    - Related party to Related Subsidiary (and also the account based on the term config)
    - Amount to Amount
    - Currency to Currency
    - Rate to Rate
    - With a line added for the amount for the related party and its account based on the term config
  - The copy does not happen if the user has already entered the information (for example, the bank account should not be copied if the user has specified the subsidiary before selecting the paper)
- On the Details side of the Receipt and Payment Vouchers, when the related subsidiary is selected — say a vendor — and the vendor determines the account name and subsidiary, they are not copied to the document line, and the system asks for them to be entered again.

### Banks
- Showed the related party and the line subsidiary in the **"Cancel Financial Paper"** document so they can be used in the document's term config.
- Added a grid to the Bank Account screen for specifying dimensions by account numbers.

### Customer Relationship Management (CRM)
- Added the status **"Awaiting Sales Department Reply"** for requests that need negotiation with the customer.
- Added the ability to create a Development Request based on a Ticket, with a `Reference` in the Ticket to the number of the created Development Request.

### Human Resources
- **Manual Indicators:** Added the ability to place the indicator in the details, so a single voucher can be created for more than one manual indicator.
- Added a button to create the Employee from within Job Applicants.
- Added the option **"Prevent Issuing Salary Before Creating Performance Indicators"** in Payroll settings.
- Added the components used to calculate the value, such as calculating the bonus from the employee's final salary for the day.
- Added the ability to record the insurance percentages for both the employee and the company in HR settings.
- Added the fixed and variable insurance base field in the employee's Job Offer.
- Added the ability to specify the employee's or company's share of insurance directly in the component's calculation formulas.

### Point of Sale
- In the Machine file, added a definition for the accounting term config for credit sales and credit returns.
- Improved the Returns Invoice so that when searching for the invoice to be returned, the system displays (Invoice Number, Invoice Total, Invoice Date, Invoice Time).
- When displaying an old invoice via the **"View Document"** button, improved so the user can enter the number without the machine code. For example, to call up invoice `"10020052"`, the number `.52` can be entered.
- Improved the Open Shift and Close Shift windows so that the cursor starts in edit mode on the first actual-balance cell, and the `"Enter"` key moves the cursor to the actual balance for the second payment method, then the third, and so on.
- Added a shortcut key to add a new invoice.
- Added a shortcut key to insert a discount in the invoice.
- Added a shortcut key to add a new customer, and some new shortcuts in Point of Sale.
- Improved so that the version number appears when hovering the mouse over a part of the window's header.
- Improved the function of the `"ESC"` key so that it does the following:
  - Deletes the data in the current invoice, with a warning message
- When one of the windows (Receipt, Payment, Stocktaking, Open Shift, Close Shift) is opened, it returns to the main Point of Sale window.
- Improved the Login window so it can be operated using the keyboard, not only the mouse.
- Enabled the `"TAB"` key to navigate between fields in the Login window.
- Improved so that the message **"Please open a shift first"** appears before showing the invoice payment window.
- Improved the display of the simple invoice payment window and the multiple-payment-methods one.
- Improved the Receipt and Payment windows so that **"Pay To"** or **"Receive From"** is a dropdown list containing (Customer, Vendor, etc.).
- Added a Close button to the customer search window.
- Added a Close button to the pending invoices window.
- There is no Cancel button in either of the two payment windows.
- Disabled the window-maximize icon in both the multiple-payment window and the simple-payment window.
- Added an option to show the Warehouse and Location fields in the Point of Sale invoice.
- Improved the format of the invoice's required amount to be shown as `(0.0)` instead of `(0)`.
- Improved so that numeric fields are not shown with four digits.
- Added some additional permissions to Point of Sale permissions.
- Added the ability for the user to adjust the width of fields in Point of Sale, with these fields staying fixed until the user changes them again.

### Customer Relationship Management (CRM)
- Added a new status to the Development Request: **"Awaiting Reply from the Complaint-Handling Manager"**.
- Linked Tickets and Development Requests so that a Ticket can be converted into a Development Request, and vice versa.

### Fixed Assets
- Created a Stocktaking Fixed Assets voucher where the current assets are entered and the system finds the missing and surplus assets from the stocktaking process.

### Real Estate
- Added the ability to create installments and create Collect Documents from within this Contract screen.
- Added **"Buyer"** to the **"Unit"** file so it can be affected by either **"Sales Contract"** or **"Opening Sales Contract"**... while keeping **"Owner"** in the Unit file.
- **Sales Contracts and Opening Sales Contracts:** In the line for creating multiple installments, added a field called Installment Type to select the installment's type, and allowed leaving the installment period empty, in which case a monthly installment value is assumed.
- Increased the number of attachments in each of the following windows:
  - Rent Contract and Opening Rent Contract
  - the Building screen, the Units screen, and the Combined Units screen
  - the Owner-Tenant screen
  - the Collect Document
- In Unit coding, added a new unit type: **"Shop"**.
- **Sales Contracts:** Improved so that non-monthly installments can be created — for example, the first 4 installments are paid monthly, starting on a specific date with a specified value, and there are 3 quarterly payments paid on a specific date with a specified value, and so on.
- In Units, added the buyer's name automatically from the Sales Contract.
- Added the **"Unit Model"** file as a separate file, selected from within the Unit, and used as one of the pricing factors in Real Estate price lists.
- In the Sales Contract and Opening Sales Contract: in the payment lines, opened up the ability for the user to edit the installment type for the installments they insert themselves.
- **Units window:** Added the following changes:
  - Added a checkbox in the **"Unit Details"** group to select whether the unit has a garage or not, so that the Related Unit can be filtered to only the units with this option selected
  - Added a filter on **"Related Unit"** that shows only the units that have **"Has Garage"** and (**"Unit Type"**)
- Added a master Terms file, which can be called up in the Sales Contract, the Rent Contract, etc., because some terms are repeated, so calling them up saves time and effort.
- **Sales Contracts:** Allowed the customer to choose the installment type, and added three installment types as follows: (**Other 1** - **Other 2** - **Other 3**), with the person responsible for setup changing their translation according to the customer's needs.
- Developed the **"Combined Unit"** file so the combined unit can be called up in Rent and Sales Contracts, to be rented or sold in one go.
- Improved so that the paid values in the **"Sales Contract/Opening Sales Contract"** lines are updated not only through the Collect Document, but also through both the **"Cash Receipt Voucher"** and the **"Bank Notice (Cheque Collection)"**.
- Added an attachment to the Custody Delivery Document and linked it to the Employee screen.
- Made improvements to the Sales Contract related to the Contract Payment and the Booking Payment.
- In the Sales Contract and Opening Sales Contract, added the ability to select all installments at once instead of selecting them all manually.
- Added the field **"Total Discounts"** to the Sales documents in Real Estate.
- Added the following changes to the Sales Contract and Opening Sales Contract windows:
  - Translated the fields for the Handover Payment (percentage, value, and date) into Arabic
  - In the Handover Payment, set the installment type to (**Handover Payment**)
- Added the following changes to the **"Sales Contract/Opening Sales Contract"** documents:
  - The Down Payment is a percentage | value of the unit price
  - The Booking Payment is a percentage | value of the unit price
  - Added **"Handover Payment"** within the payment details data, as a percentage | value of the unit price
  - Showed the installment/payment lines ordered by due date
  - The unit price in the **"Sales Contract"** is the result of (price per meter × unit area), where the unit area is pulled from the Unit file and the price per meter is entered manually by the user
  - Showed the **"Garden Price"** inside the **"Sales Contract"**, where the garden price is the result of (price per meter × garden area), with the garden area pulled from the Unit file and the price per meter entered manually by the user
- **Collect Document:** Added the ability to register the document starting from the Property/Unit... with the ability to fill in the document by selecting the Property/Unit or based on a Sales Contract (knowing either one, the system pulls in the other data)... so that once the Property is selected, the system pulls in the full Unit data and the Owner-Buyer, in addition to filtering **"Based On"** to show only the contracts made on the same unit (and if there is only one contract, the system inserts it directly).

## Settings

- Added the following fields to auto-coding by criteria:
  - First number in the code suffix
  - Sequence account prefix
- Added the ability to show the print count via Fields & Screens Settings - the `Descriptors` section.
- Added a new document, **"Add Bulk Message"**, which can be used to send an alert to more than one (customer & vendor & ...), with the alert type (email or SMS) selectable from within the document.
- **Default Values Template:** Added the ability to specify that the template is called automatically when a certain value is entered in a specific field.
- Added the field **"Maximum Number of Report Runs"** to both the Permissions file and the User file.
- Created the entity flow `EAExecuteUpdateQuery` to execute an update query with saving.
