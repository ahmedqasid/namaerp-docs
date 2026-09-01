::: info Release Information
**Release Date:** December 2017  
**Release Number:** 2017.12
:::

# Nama ERP Release Notes - December 2017

## Additions

### Inventory
- Added `n1` on the Stock Issue line
- Added the following two options to the Distribution Management settings:
  - Show only the supplied items specific to the method in the Assembly Voucher
  - Show only the raw materials specific to the method in the Assembly Voucher
- Activated the barcode method of adding a new line, which works in Stock-Taking Committees, across all Sales, Inventory, and Purchase documents
- Added the Packing page, containing the Packing List `List Packing`, to `Order Sales`. This page appears via the option "Show Packing List" in the `Supply Chain` settings
- Added the ability to delete excess items in `EAUnicreteGenItems`
- Improved importing the Stock-Taking Committee so that the system shows the errors at the end of the import instead of stopping the operation repeatedly, once per error
- Improved so that if a warehouse is chosen on the Item Settings lines, then a stock location is chosen on the same line, only the stock locations found in that same warehouse open, not all the stock locations
- **Warehouse Documents - Stock Transfer**: Improved so that the dimensions on the document header are no longer left uncopied when reversing a document
- Added shortcuts in the Item file (Add Item to the Item Voting file), (Add Item to the Price Voting file), like the shortcut already existing for adding the item to a price list
- Defined the default assortment in the Item file, such as the default version, color and size
- Added the ability to specify the item's default location at the warehouse level, in the Item Settings inside the Item file, at the line level
- Allowed creating assembly components without specifying the version, size, color, and so on
- Improved so that the base type of the item/component is the item
- Developed an entity flow so that, when defining a new item that has versions, on save all the versions (Categories) are loaded onto it, and likewise for the sizes (Sizes) (Saqqara Company)
- Changed the Assembly Voucher so the supplied product is not restricted to the versions (Categories) and sizes (Sizes) found in the warehouse, and instead allows choosing any size or version defined in the system (Saqqara Company)
- In the Assembly Voucher, added the ability to choose, at the line level, (No Cost - Fixed Cost), and activated the cost percentage
- **Stock Receipt and Issue - Show Receiving Costs**: Enlarged the following fields (`details.crrentNetCost`, `details.crrentNetQty`)
- An error sometimes appears when enabling quantity tracking in the Stock Receipt Request term config

### Sales
- Activated rounding at the POS for the invoice's net value; the side for the rounding discount must be chosen in the Sales Invoice term config
- Added the fields for discounts and taxes in the breakdown and totals to the bottom section of the POS invoice, like those found on the Nama Sales Invoice
- Replaced the Add Tax Fields field with two fields (one field per tax)
- Developed the integration between the Stock-Taking Statement and the Electronic Stock-Taking, so the Electronic Stock-Taking Committee can be converted into a Stock-Taking Committee, and Electronic Stock-Taking Committees can also be recalled into the Stock-Taking Committee
- Added the option `Add the Price After Tax to the Price List Lines` to the Distribution Management settings
- An error occurs when saving a price list with the option "Calculate Prices After Tax in Price Lists" enabled
- Added some changes to the **Sales Order** document (Saqqara Company)
- Added the option `Add the Gross and Tare Weight to` to the Distribution Management settings
- Added a `grid` for terms in Sales (UniCrete)
- Created a Tax Policy for customers (in the Customer file), like the one on the item, with a higher priority than the item's
- **Sales Offers - Invoice Offers**: Added the field `freeItemGroup` to the offer based on the number of invoice items, so the free item can be chosen as one of the items in a free-items group
- Added the option "Allow Repeating Offer Priorities" to the Distribution Management settings
- Added the option "Do Not Consider Customer Codes in the Item as Real Codes" to the Distribution Management settings
- Added a category to the customer, with the ability to use it in price lists and offers

### Purchasing
- Created an entity flow so that, when creating a Purchase Invoice based on a Stock Receipt, it takes into account the sorting operation (Assembly Voucher) done on the same lot number, deducting the full waste cost (version) and deducting the remainder of the sorting (version) from the vendor on the invoice, but only when it exceeds the allowed sorting quantity (`n2`) found on the preliminary Receipt document for the same lot number
- Added the Invoice Category to the line in the Purchase Price List
- Showed the taxes on the Purchase Order
- In the **Purchase Price List** file .. (Vendor / Vendor Category) is required on the list's lines, the same way as (Customer / Customer Category) in the **Sales Price List** file
- Added the option "Do Not Consider Vendor Codes in the Item as Real Codes" to the Distribution Management settings
- **Purchase Returns screen**: Showed the Subsidiary by default, since the field was not showing and needed a Screen Modifier

### Accounting
- **Receipt and Disbursement Vouchers**: When choosing the related subsidiary, the required fields are copied; the same mechanism was activated when working with subsidiaries directly on the lines
- Sped up the formulas for calculating the total debit and credit in the Journal Entry Voucher
- **Disbursement Voucher**: Improved the Disbursement Voucher when issued based on (a Miscellaneous Invoice or an Asset Purchase) as follows:
  - **Based on a Miscellaneous Invoice**: The Subsidiary field is transferred from the header of the Miscellaneous Invoice to the lines of the Disbursement Voucher, after transferring the subsidiary type; the net amount is also transferred from the Miscellaneous Invoice to the Amount field
  - **Asset Purchase Voucher**: The net amount is transferred from the Fixed Asset Purchase Voucher to the Amount field on the Disbursement Voucher, and the Subsidiary field is transferred from the header of the Fixed Asset Purchase Voucher to the lines of the Disbursement Voucher, after transferring the subsidiary type

### Human Resources
- **Combined Leave Requests and the Combined Leave Voucher**: Showed the employee's leave balance before entering the required duration (as soon as the leave type is entered)
- **User file**: Added a file showing the additional permissions, From Date, To Date
- Created the entity flow `EAOyoonWorkPlaceUpdateToUpdateInfo` to create an Employee Data Update voucher when a Work Place Update voucher is made, and to set the Branch on the Employee Data Update voucher equal to the Branch on the work place
- Sometimes, re-issuing a Payroll Register causes an error
- Added the following indicators among the following system indicators:
  - Net Work Time
  - Net Work Time (Shift 1)
  - Net Work Time (Shift 2)
  - Net Work Time (Shift 3)
  - Absence Shift 1
  - Absence Shift 2
  - Absence Shift 3
- Added the Number of Days in the Month to the Payroll Calendar, giving it priority over the Days in the Month in the HR settings
- Added the option "Delete Lines with No Effect" to the Salary Voucher term config
- **Salary Vouchers**: Added a new page for the work places during the payroll period in which the Salary Voucher was created, containing: Employee Code - Work Place - From Date - To Date
- Created an entity flow that updates the `EmpAttendanceSysEntry` file without a Salary Voucher
- Developed the **Combined Mission Voucher** screen
- Added the link "Update Work Places" to the Statistics page on the Salary Voucher
- Added Reference Source 1 and Reference Source 2 to the accounting side in the term config and in the documents that have an accounting side, such as the Salary Component
- Created a scenario for a manual indicator (SuperGate Company) with the following specifications:
  - Leave days taken by the employee during the month, beyond two days, are deducted day-for-day from the Extraordinary Effort component, except for Annual Leave, which is not deducted
  - Sick Leave has a maximum of 15 days after the two allowed days; if it exceeds the maximum, only 50% of the Extraordinary Effort component is deducted
  - Likewise, the calculation is done on the number of absence days through the Performance Indicator (12 - Absence)
- **Combined Leave Request**: When a leave type and duration are chosen, the balance appears, but the balance disappears on saving
- Added an alternate code for the employee
- Added a dedicated Tax Base field to the Salary Voucher screen
- Took the other disbursements during the same period into account
- Added the word "in minutes" to the translation of the system indicators that work by the hour (such as Lateness), and added an option to the formulas (Precise Numbers), since they were causing many errors
- Added the following to the Leave system:
  - The ability for a leave balance to become part of another leave balance's, via the list "Also Affects the Leave Balance"
  - The leave must be taken all at once, i.e. it must be consecutive
  - Allowing the leave a specific number of times during the service period (Maternity Leave, 3 times during the service period)

### Manufacturing
- Added a filter on Production Orders so that any Production Order that has been executed or has had a final or forced closing does not appear again in Issue Requests, Return Requests, or Issue and Return
- Added 5 `N` fields to the Production Order and the Production Order Request, and developed an entity flow to add the quantities

### Contracting Maintenance
- Added the Cost Items file on the Consumed Materials lines, provided the cost item type shown = Raw Material
- Added several changes to each of the files (Tender, Contractual Position, Distributing Services over the Tender)

### Fixed Assets
- **Asset Addition and Disposal Voucher**: Added a discount and added it to the accounting term config
- Added a term config to the Asset Depreciation Voucher, to allow charging the asset's depreciation to specific projects
- **Depreciation document - Details**: Showed the Asset Location, the Dimensions

### Point of Sale
- Added the option "Zero Out Cash When Closing the Shift" to the POS settings. Accordingly, added a Cash Debit and Credit to the Closing Voucher term config, to be used with this option
- Added the field `posCreationTime`
- Added the field (Service Invoices Term Config) inside the Machine file in Nama, to be aggregated with the old invoices
- Compressed the images uploaded at the POS to speed up performance
- Improved so that the device reads the Favorite Items from the machine without needing to open and close the program, since the settings have not changed
- Activated Nama's Fields & Screens Settings inside the POS
- Improved so that several fields are transferred from Nama to the POS, such as the company data
- Added the Nama invoice code to the Coupon screen on the lines, so it appears next to the POS invoice's code, and added a hyperlink to it
- On any list screen inside the POS, showed the number of records and the current page number relative to the number of records, and added an arrow to jump to the first page and another to the last page
- Developed a way to increase the space reserved for the POS system in the `properties.nama` file
- Added the following changes:
  - Added a filter to the Actions Log list screen, and also added sorting
  - Added an arrow to jump to the first record and another to the last record
- Added settings dedicated to the accounting effect
- Added the username to the Shift Opening and Closing voucher in Nama
- Converted the Coupon Book into a document instead of a master file
- Added From Account or Customer Subsidiary to the Coupon Book screen, to replace `Customer default`
- Added the field "Created From" to the Coupon
- Copied the invoice value into the Coupon field if the coupon value was greater than the invoice value
- Improved the Payment screen so that pressing `Enter` moves to the next field
- **On the Multiple Payment window**: Improved the window so the (Remaining) field reacts to the entered values, showing the remaining amount whenever any new value is entered
- Increased the space for the detailed items in the unused area to the right and below the button

### Auditing
- Made some changes to the Risk screen and the Risk Matrix screen
- Added a screen for the Risk Matrix
- Created risk-calculation formulas on the Profiling screen, and also made changes to the screen's layout
- Added the Confirmations to the Control, Basic, and Profiling definition screens
- Created an option inside the Account - Account Group - and added the account to the Control, Basic, and Profiling tests, with filtering by the account group type
- Made the Cycle a required field on the preceding screens
- Added a screen for the Audit Risk in the required form
- Added the Risk and the Control to the lines of the Profiling screen in the required form

### Project Management
- Added an attachment to the Project Invoice on the line

### Settings
- **User screen - Edit Log page**: Added the document code among the displayed columns, and the document type (hyperlink), so the user's activity can be tracked, with the ability to filter and sort by both
- Added the tool "Cancel Approval Request" to the More menu
- Added `Map Fields` to the Default Values Template, working the same way as `EAFieldsValuesCalculator`
- Developed a mechanism to read data from Nama as `json`, based on a `query configured`
- Added the option "Ignore Attachments" to exporting records, so attachments are not exported to the sheet
- Created a document to give a user the permissions of one or more other users, as well as the ability to give them one or more permission files, from date to date
- Added the document "Temporary Additional Permissions", to allow adding a permission for an employee from date to date

### Reports
- Added the ability to change the permissions on system reports

## Fixes

### Inventory
- Fixed an error in Item Categories where the relationship lines were lost on save (UniCrete)
- Fixed an issue where opening any item and trying to edit its categories showed an error message
- Fixed an issue where an Assembly Voucher with an assembly method that had no item could not be saved
- Fixed an issue where some documents failed processing
- **Warehouse Documents - Stock Transfer**: Fixed an issue where reversing a document reversed the warehouses but did not reverse the stock location
- Fixed an issue where searching by version code, color code, and size by pressing the down arrow did not work in Distribution documents, even with the options "Show Version Codes in Search" and "Show Color Codes in Search" enabled
- Fixed an issue where using the Price Voting document showed a message that the voter did not have permission to vote, even though they had been granted the permissions
- Fixed an issue where sometimes creating items from the Item Department showed an error (UniCrete)
- Fixed an issue where sometimes recommitting Stock Issue documents did not save the document
- Fixed an issue where choosing the Unit Group in the Item file copied the lines but did not copy the following fields into the Item file:
  - `units.baseUnit`
  - `units.reportingUnit1`
  - `units.reportingUnit2`
  - `units.defaultPurchaseUnit`
  - `units.defaultSalesUnit`
- Fixed an issue where an error sometimes appeared when creating a Stock Issue (UniCrete)

### Sales
- **Price Lists**: Fixed an issue where the calculations for updating prices did not work correctly
- Fixed an issue where saving a price list with the option "Calculate Prices After Tax in Price Lists" enabled showed an error
- Fixed an issue where Sales Offers could not be saved without entering the Discount Coupon information
- Fixed an issue where creating a Sales Return based on a Sales Invoice did not calculate the tax percentage

### Purchasing
- **Purchase Returns screen**:
  - Fixed an issue where saving the document was rejected, requesting the vendor be entered, even though the document's subsidiary was already in use
  - Fixed an issue where creating a return based on a Purchase Invoice did not copy the discount field from (`money.headerDiscount.percentage`, `money.headerDiscount.value`) of the invoice
- Fixed an issue where sometimes the Based On field in a preliminary Purchase Invoice (Purchase Order) did not work
- Fixed an issue where an error sometimes appeared when creating an invoice based on a Purchase Order

### Accounting
- Fixed an issue where, with the options "Create Financial Papers from the Receipt Voucher, Create Financial Papers from the Disbursement Voucher" enabled, the Subsidiary and the party concerned were not copied from the Receipt and Disbursement Vouchers
- Fixed an issue where importing journal entries did not adjust the foreign amount's decimal places to the currency's decimal places, which sometimes caused the processing to fail
- Fixed an issue where, when importing journal entries, the system allowed a line with both a debit and a credit at the same time, and ignored the debit

### Fixed Assets
- Fixed an issue where sometimes, creating a Depreciation Voucher for a period and clicking Aggregate Assets did not execute the command

### Settings
- When there is a mismatch between the ledger and the term config, or between the ledger type and the term config type and the document itself, an error message appears
- When using "Save Documents If They Are a Draft", the message "}0{ is not a draft" appears
- When deleting a date from the Analytical Group screen, the program writes it again and does not allow it to be deleted

### Human Resources
- **Job Offer**: When making the leaves group (`offerVacationLines`) a mandatory group in Required Fields (`Fields Required`) and leaving the leaves empty, the message (`offerVacationLines` cannot be left empty) appears. The error message should be translated into Arabic as (Leaves cannot be left empty)
- In the Salary Component term config, and the term configs of all documents that have an accounting effect, improved so that when the source type ((Specific)) is chosen, the system shows only sub-accounts, or prevents saving if an account of type subsidiary, rather than sub-account, is chosen

### Point of Sale
- Recalling a held invoice shows the following errors:
  - The Cancel Discounts icon does not delete the discounts
  - The Cancel Taxes icon does not cancel the taxes
- When recalling a held invoice in Sales Returns, the system does not allow deleting it via the Delete icon
- When the item quantity is changed, the system deletes Discount 2 and changes Discount 1
- The system does not respond when changing the (value) of the discount at the item level
- The system does not calculate the tax value at the POS correctly when there is a discount at the invoice level
- Some items are not inserted when chosen, due to decimal rounding
- Sometimes, unreal amounts appear in the Amount field at the POS
- The system does not respond when clicking the document view icon inside the POS
- There is a problem with the Favorite Items showing: they appear on some devices and not on others
- An error sometimes appears when creating an invoice based on a Purchase Order
- When entering an item code by barcode, the cursor moves to the next field, which is a bug
- The system does not allow saving a document category of type POS Sales Invoice inside the POS settings
- Added the option "Salesperson Required" to the POS settings
- When creating a Stock Transfer Request at the POS with many items and then clicking Save, the system often does not respond (`Hanging`), and the system exits the POS entirely
- The Branch at the POS is transferred as (`null`) in all POS documents
- The following cannot be done despite enabling the "Allow Editing" option in `properties.nama`:
  - A duplicate of the screen cannot be made
  - `complete auto` does not work when typing the item in the Details
  - The default unit is not shown when typing the item
- Duplication sometimes occurs in payment methods, causing an error in the shift balance, where the system posted the values of some cash invoices to credit even though the employee had no permission for credit payment
- When changing the user, the system keeps showing the previous username at the top until the screen is changed and another screen is opened
- By following these steps:
  - Issue two coupons, each worth 100 pounds, for example
  - Log into one of the machines via POS, then record an invoice worth 27.5; the system issues an invoice with a specific number
  - Switch to another machine by closing the system and logging in through another machine
  - Enter an invoice worth 27.5, but enter the same value 27.5 in both coupons
  - Delete the cash amount so the system makes the remaining amount = 0, even though the invoice value has doubled
  - When issuing the invoice, an error occurs
- The system allows entering two coupons on the same Multiple Payment screen, exceeding the invoice value
- The system allows exceeding the coupon value when paying through two different machines with the same coupon at the same time
- Adding or editing the Favorite Items from the POS settings screen does not transfer to the branches
- Sometimes, issuing coupons via a Receipt Voucher causes the system to hang (`Hanging`)
- When enabling the Return Receipt using the default cash payment method, the system hides the cash payment field on the (Multiple Payment) window and puts the Return Receipt field in its place
- The system does not take unit conversion into account when inserting items in grams, given that a kilo = 1000 grams. For example, when entering an item of 200 grams, where the price per kilo is 40 pounds, the system does not calculate the gram at a price of 0.04, but instead uses the same price as the kilo
- When settling with more than one coupon while one of the coupons is (for a specific customer, or single-use, or no longer valid for any reason), the system shows a message with the reason the coupon was rejected, without stating which coupon number was rejected
- The label for the notice (Return Receipt) on the Multiple Payment screen, in both the POS invoice and the returns, is garbled and unreadable
- The user can link a Receipt Voucher to coupons via the option "Create Coupons for the Receipt Voucher's Value," while it then does not create the coupons, through the "Create Coupons" window
- The tax found at the POS is not transferred with the invoice to Nama
- When editing lines on the Tax Policy screen, the change is not transferred to the POS

### Manufacturing
- Creating a Production Order based on a Production Order Request cannot be executed
- The Stock Receipt resulting from a Product Delivery shows no cost in the journal entry
- When a Production Execution voucher automatically creates a Materials voucher, the numbers are not copied correctly

### Contracting
- An error appears when displaying Stock Transfer files

### Real Estate
- When terminating a Lease Contract, the system does not transfer the details of the leased property and its location (the residential Unit and the Building) from the Lease Contract document to the Termination document
- When extending a Lease Contract that is on the Hijri calendar, the system calculates the installments and the new contract duration in the extension based on the Gregorian calendar instead of the Hijri
- **Lease Contract**: When the term config option to split a single installment when it spans two years is chosen, along with using the Commission, Maintenance Costs, Insurance, or Water, the program also splits the Commission or Insurance installment, or any of those mentioned, into Revenue and Deferred Revenue; the correct behavior is to split only the installments linked to the contract's principal into Revenue and Deferred Revenue, since the rest of the mentioned items are not deferred-revenue items

### Letters of Credit
- Sometimes, creating a Letter of Guarantee Delivery based on a Letter of Guarantee shows an untranslated error message
