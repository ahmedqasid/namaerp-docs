# Nama ERP Release Notes - June 2016

::: info Release Information
**Release Date:** June 2016  
**Release Number:** 201606
:::

## Additions

### Inventory
- No longer allowed users to edit the Stock Taking voucher after saving.
- When ignoring items not listed in the Stock Taking, improved so that overdrawn items can be excluded from being ignored and are always settled to zero.

### Sales
- **Sales Price Lists**: Added a system for automatic pricing of items inside the price list files.

### Fixed Assets
- Added more than one tax to the (Asset Addition and Exclusion) document, so that it is like the Purchase Invoice in having a tax and a withholding tax on the vendor calculated for it.
- **Fixed Assets Depreciation voucher**: Added the ability to group assets by the following dimensions: (from asset to asset, from branch to branch, from asset type to asset type, from group to group).

### Banks
- **Financial Paper**: Improved so that the system retrieves the bank account, if empty, from the first transaction made on the Financial Paper, while still allowing it to be changed manually.

### Customer Relationship Management (CRM)
- Added the following new statuses to the Development Request: (Awaiting Technical Support Reply, Awaiting Development Reply, Awaiting Customer Reply).

### Human Resources
- **Salary Component - Application Scope**: Added from group to group.
- Increased the number of manual and calculated indicators to 10 instead of 5.
- Added attachments to the Violation Voucher.

### Contracting
- Added attachments to the main screen of the Project Contract.
- **Project Extract document**: Made the default value of the extract type field blank.

### Accounting
- **Account Classification window**: Added the Department field.
- Improved so that when searching in accounting vouchers, the subsidiary account name can be shown instead of Account 1, Account 2.

### Manufacturing
- Added the ability to start more than one Production Order at a time.
- Took overhead costs `(Overhead)` into account when calculating Production Order costs.
- Added the Production Order to the product delivery list screen and to the search fields, and also added it to the Production Execution document, Raw Material Issue, Raw Material Return, Product Return, and the Resources document.
- Added the option **"Do not check that the production date and expiry date match"** to the Distribution Management Settings.
- In the **"Forecast document"** and the **"Planning document"**, added **"Item Category 1"** in the lines, after the item code and name.

### Real Estate
- Added the ability to create a Lease Contract for a Building.
- In the Lease Contract, when selecting a Unit, improved so that the owner is copied from the Unit.
- Created a new document named **"Opening Contract"**.

### Letters of Credit
- Added each of **"Stock Receipt Vouchers"**, **"Expense Vouchers"**, and **"Assignment Vouchers"** to the Letter of Credit, on a new page (Linked Records).
- Allowed saving a Letter of Credit Opening document without recording the write-up of the credit value.

## Settings

- Enabled setting values for a `generic reference` inside the entity flow `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`.
- The following entity flow does not work with the details: `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`.
- An error sometimes occurs when importing reports.
- Added the ability to run more than one database without needing to restart the server. This feature is for demos and technical support, and is strongly discouraged for use with customer databases.
- **Revision document**: Added the revision record to the document's details and removed it from the document header, so the user can revise several records at once in a single document.
- Created a voucher dedicated to revising records.

## Fixes

### Inventory
- Fixed an issue where, sometimes, trying to edit an item's units made the system show a blank error message.
- Fixed an issue where the cost of the Stock Transfer voucher did not change when the cost of a preceding voucher changed.
- Fixed an issue where creating a Stock Issue and selecting an item automatically pulled a location, even though this location was not linked to the item; the location should not be pulled unless it was entered by the user.
- Fixed an issue where creating a Stock Transfer voucher based on a Stock Transfer Request did not pull the "from warehouse" into the Transfer voucher from the Transfer Request.
- Fixed an issue where creating an automatic stock document creation rule did not allow using a book with automatic coding.

### Sales
- **Customer window**: Fixed an issue where selecting a payment customer and saving caused the system to branch out all the accounts under the customer, which caused many errors in reports.
- Fixed an issue where the journal entry on the Sales Invoice was affected after Receipt Vouchers were made against the invoice, and the remaining-balance value changed.

### Purchasing
- Fixed an issue where creating a Purchase Return based on a Purchase Return Request did not show the Return Request vouchers in "based on."
- Fixed an issue where processing sometimes failed in the Stock Receipt voucher made from a Purchase Invoice.

### Accounting
- Fixed an issue where entering a detailed Receipt or Payment voucher did not allow changing the amount in the details until the account code was entered.

### Banks
1. Fixed an issue where saving a Bank Transfer voucher with a USD currency on the document header and a line in EUR caused the system to reject it and change the line's currency to USD (like the document header).
2. Fixed an issue where the system did not allow saving an Opening Financial Papers voucher if the responsible department was not specified on the line.
3. Fixed an issue where creating a Financial Paper from within a Receipt Voucher and then selecting the due date showed no result for the user to select from, while creating a Financial Paper from the Financial Paper screen worked correctly.
4. Added the related subsidiary on the line for the following types: (Bank Deposit Slips, Bank Advices, Financial Paper Cancellation, Financial Paper Opening).

### Settings
- Added a caption for the inputs of the entity flow.
- **Criteria-Based Validation file**: Fixed an issue where leaving **"Must"** blank and selecting **"Lines must match"** showed a blank error message.
- Fixed an issue where running the recurrence caused the system to reject saving Sales Invoices, objecting to the system book of the Payment Voucher.
- Fixed an issue where an error occurred when saving an Accounts Bag.
- Fixed an issue where, if the Accounts Book was empty on the legal entity and a document was entered on that legal entity, a blank log appeared.
- Fixed an issue where importing Receipt Vouchers did not apply the entity flow `com.namasoft.extras.alnouri.AddCommissionFromAccountAction`, which is applied with the `Pre Send Business Request` action.
- Fixed an issue where creating required fields based on criteria and selecting "Lines must match" showed the error `RequiredFields`.
- Fixed an issue where, sometimes, notifications did not insert the lines after `{endif}`.
- Fixed an issue where an error sometimes occurred when creating a composite dimension.
- Fixed an issue where a user's entry dimensions could not be changed because there was no search in the screen window from which the screen is selected, requiring the code to be typed by hand.

### Human Resources
- Fixed an issue where, in both the **"Salary Voucher"** and the **"Employee Data Update document"**, these documents could not be edited or have a `recommit` performed on them if the employee's status was Leave.
- Fixed an issue where an error occurred when saving a manual performance indicator with an order greater than 5.
- Fixed an issue where, sometimes, disabling an Advance voucher caused the system to disable the issuing of the salary.
- Fixed an issue where creating a Training Plan in Human Resources showed a message that the estimated unit cost could not be left blank.

### Manufacturing
- Fixed an issue where the system did not allow saving the Resources voucher and showed the message **"Quantity or number of lots cannot be left blank."**
- **Production Order**: Fixed an issue where the system did not allow saving if the planned start date equaled the planned delivery date.
- Fixed an issue where the system sometimes changed the production and expiry dates in the delivery document for the batch after saving, based on the production and expiry dates present in the Production Order; the system should instead ignore the production and expiry dates present in the Production Order and rely primarily on the production and expiry dates present in the delivery document.
- Fixed an issue where, in production documents, the system currently allowed the expiry date to equal the production date.

### Real Estate
- Fixed an issue where selecting an account on the Owner - Buyer screen showed all subsidiary accounts instead of only the owner-buyer's subsidiary.
- Fixed an issue where entering the annual increase percentage in the Lease Contract did not show the value.

### Fixed Assets
1. Fixed an issue where an Asset Opening document held by the customer could not be opened.

## General Fixes
- Fixed an issue where the system checked whether a document saved as draft could be deleted at all when deleting it.
- Fixed an issue where approving vouchers allowed the voucher to be created with the status **"Awaiting Approval"** without reviewing any criteria or even reviewing the recurrence position in the book.
- Fixed an issue where processing some documents sometimes failed and showed the message `(Update.TransactionRequestType)` as the error description message, as it appears in the log; the message should instead be clearer and shown directly in the error message rather than as the error description.
