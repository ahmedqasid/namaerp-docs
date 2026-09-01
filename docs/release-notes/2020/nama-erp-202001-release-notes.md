# Nama ERP Release Notes - January 2020

::: info Release Information
**Release Date:** January 2020  
**Release Number:** 2020.01
:::

## Additions

### Inventory
- Added options for tracking inventory age on the item - Item section. These options allow tracking inventory age by warehouse, branch/sector, and all dimensions, in addition to revision, size, color, and the item's other properties
- Added the option `Split Lines of Items Withdrawn via the Assembly Method When the Supplied Item Quantity Changes` for the Assembly Voucher, and also added the Assembly Method to the supplied items lines
- **Assembly Voucher**: Added a new grid named `Planned Withdrawn Items`
- **Assembly Voucher**: Added the option `Do Not Share in the Cost of Unplanned Items` to the `Supplied Items` grid
- **Assembly Voucher**: Added the option `Use Planned Withdrawn Items in Cost Calculation` to the document's term config
- Added the document `Assembly Request`
- Added an entity flow that can add sizes, colors, and revisions if they do not already exist
- Added a merged list screen combining `Issue Vouchers` and `Receipt Vouchers`
- Added a quantity-tracking criterion to the Delivery Settings file
- **Delivery Settings file**: Removed the two fields `Quantity Must Be Less Than or Equal To` from the Relationships grid - the second grid on the main page, and added five `Quantity Must Be Less Than or Equal To` equations, each containing the three fields (Quantity, Quantity Type, Factor)
- Modified the entity flow `EAGenAndItemSizesAndColorsAndRevisions` by adding a `Fields Map` for creating the files
- Added a field in the Additional Receiving Costs document named `Temporarily Distribute Based on Purchase Order`, and also added a field in the Costed Vouchers grid named `Temporary Costed Voucher`, which for now is only allowed for a Purchase Order
- In the Distribution Management Settings, the following was added to the Cost Sources for Uncosted Receipt table:
  - Added revision, sizes, and colors
  - Added the invoice type that created the stock document
- Displayed `Reference 1` in the details of Additional Receiving Costs vouchers, Letter of Credit Expenses, and Asset Letter of Credit Expenses
- Added the following two fields to the Stock Taking Committee:
  - Manual Unit Cost
  - Total Manual Cost
  
  Note that you must select the cost source for stock taking `Line Cost` in the cost sources for uncosted receipt for this field to work correctly; the user must also fill it in manually on all lines
- Modified the entity flow `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedItems` to allow repetition when the item is free
- Added the option `Ignore Quantity Tracking When Adding Lines Manually` to the term configs of documents where quantity tracking is available
- **Multiple Assembly Voucher**: Added the following fields:
  - 5 fields of type `Ref`
  - Fields of type `Text`
  - Fields of type `n`
- **Distribution Management Settings**: In the `Cost Sources for Uncosted Receipt` table, added `Actual Entry Cost as of the Date (Purchase - Assembly - Opening Balance, etc.)` to the cost source list
- Added the option `Show and Use Item Dimensions in Transfer` in the Distribution Management Settings
- Added the option `Use the Coupon as a Discount on Invoices` to both the Discount Coupon and the Discount Coupon Book; it is copied from the book when using the Create button, and the coupon is added to the header of sales vouchers - if a coupon is found, its value is applied to the invoice discount, percentages are calculated from it, and the coupon is marked as consumed upon saving
- **Distribution Management Settings**: Added all quantity fields to the lists for system-defined delivery
- **Distribution Management Settings**: Activated the Reservation Type function when the document quantity changes and also when selecting the item; also added an option in the `supply chain` Distribution Management Settings named `Update Reservation Quantity When Document Quantity Changes`

### Sales
- In the payment method lines for `Sales Order`, `Sales Invoice`, and `Sales Returns`, the following fields were added, which only appear via `Edit Screen`:
  - Two date fields
  - Two text fields
  - Two number fields
- Added 5 new categories to the Customer file, which can be used in pricing on price lists in the future
- Added a translation for the message `You do not have the authority [PrintMoreThanOnce] on entity SalesInvoice`
- Added `Created Contacts Coding Group` to the contacts lines in the Customer file
- Added reservation to the term config of both `Sales Quotation` and `Sales Quotation Request`
- Similar to the Point of Sale system, items copied onto the Exchange Invoice are now marked in red. To support this, the field `Returned Item Color` was added to the Global Config, letting the user change the color as the customer prefers

### Banks
- Added the payment method to the term config so that it is added automatically when the term config is inserted

### Human Resources
- Added a new file `Components Group`, through which hundreds of components can be defined
- **Leave Type file**: Changed the leave entitlement policy; it now has 3 options (With the Start of the Year, Taking the Hire Date into Account - With the Start of the Month - With the End of the Month)
- Added the following fields to the Employee file:
  - Direct Supervisor (exactly like Direct Manager), placed right after it
  - Passport File Number
  - Passport Unified Number
  - Passport Nationality Code
  - Passport Language Code
  - Passport Place of Issue (a Region file, exactly like the Place of Birth field)
  - Sponsor Name
  - Passport Sponsor Code
- Added `ref.lines` at the line level in the System KPI Approval screen
- Added the following two fields to the sales lines:
  - Input Rounding Method, a list containing (Up - Down - Nearest Number)
  - Round Input to Nearest, a number
- Added a new system field to the Bulk Leave Request, Bulk Leave Voucher, and Bulk Return-to-Work Voucher, named Actual Leave Duration; this system field shows the actual duration of the leave

### Real Estate
- Improved the Sales Contract document so that the value in the field `Price Discount Value` is rounded

### Manufacturing
- Added a book and a term config for the Raw Material Issue Request in the Production Order term config
- **Grouped Production Orders Voucher**:
  - Added dimensions to the lines, taken into account when creating a Production Order for each line upon saving
  - Added a mechanism for grouping Production Order requests, with grouping by (From Date and To Date, From Item and To Item, Grouping by Dimensions)

### Contracting
- Added 5 `number` fields at the line level in the following documents:
  - Contracting Executive Budget
  - Contracting Estimated Budget
- Added the option `Project Code Not Mandatory in Cost Documents` to the term config of both Subcontractor Raw Materials Issue and Subcontractor Raw Materials Return
- Added a new document named `Subcontractor Raw Materials Return`
- In the Sarky document, added the fields `Total Cost (aggregates the cost distribution lines)` and `Total Penalties (aggregates the penalty lines)`
- Added a new file `Components Group`, through which hundreds of components can be defined
- **Leave Type file**: Changed the leave entitlement policy; it now has 3 options (With the Start of the Year, Taking the Hire Date into Account - With the Start of the Month - With the End of the Month)
- Added the following fields to the Employee file:
  - Direct Supervisor (exactly like Direct Manager), placed right after it
  - Passport File Number
  - Passport Unified Number
  - Passport Nationality Code
  - Passport Language Code
  - Passport Place of Issue (a Region file, exactly like the Place of Birth field)
  - Sponsor Name
  - Passport Sponsor Code
- Added `ref.lines` at the line level in the System KPI Approval screen
- Added the following two fields to the sales lines:
  - Input Rounding Method, a list containing (Up - Down - Nearest Number)
  - Round Input to Nearest, a number
- Added a new system field to the Bulk Leave Request, Bulk Leave Voucher, and Bulk Return-to-Work Voucher, named Actual Leave Duration; this system field shows the actual duration of the leave
- Added the option `Allow Saving Without Entering Quantity` in the Contracting Settings, which allows not entering quantities in each of the following documents:
  - Project Contract
  - Subcontractor Contract
  - Estimated Budget
  - Executive Budget
- Added the option `Do Not Copy Data in the Subcontractor Contract When Selecting the Source` in the Contracting Settings
- Improved the Extracts so that an Extract cannot be issued before the date of the last Extract
- Added the field Item Classification `Term Category` at the penalty lines level in the Sarky document
- **Subcontractor Extract**: Improved the document so that the fields (`netValue.price.details` and `dueValue.details`) are calculated on entry rather than on save
- In both `Contracting Estimated Budget` and `Contracting Actual Budget`, added the field `Parent Item Code` in the budget lines

### Point of Sale
- Improved so that categories with no items are not displayed
- Improved so that only items that belong directly to the current category, and do not belong to any subcategory, are displayed
- Added the following two options to the Point of Sale Settings:
  - Allow saving when items with a zero price exist
  - Do not include items that have no price in the price lists or units
- Improved so that when a machine is set in the `nama.properties` file and it is searched for in the Point of Sale database but not found, all previously defined Point of Sale machines on Nama are re-transferred
- Added the parameter `posShiftCode` to Point of Sale reports to specify the shift
- Added the option `Document Classification Required in Stock Transfer` to replace the option `Document Classification Required`
- Added five pages to the (New Point of Sale Interface Settings) file - Invoices - Return - Exchange - Stock Transfer - Stock Taking, for each page you set (number of columns per row - Favorites section width - main page fields - sub-page fields - table fields), and added a list named (Copy From) that lets you set the data source to save the user time. As an example (setting Copy From to Sales Return on the Exchange page: upon saving the file, the Exchange data is filled in from what exists in the Return - the data is copied from the Sales Invoice if Copy From is left empty and there is no data on the page)
- Added the grid for receipts, and added the option `Add Document Classification to Receipt and Expense` in the Point of Sale Settings, to allow selecting the classification from within Point of Sale and linking it to the term config
- Added the field Subsidiary (to the fields available for selection) in the New Point of Sale Interface Settings file - Main Page Fields
- Added the list `Has Subsidiary`, a combo box with Yes or No, to both the Sales Term Configs table in the Machine file and the Settings in Nama, to allow linking the invoice to a specific term config when the document has a subsidiary
- Added the field `printCount` inside Point of Sale documents, representing the number of times each document has been printed, for use in the Invoices screen template to prevent the user from reprinting once the maximum available count is reached. The permission (Ability to Reprint Documents) can be withheld from some users to block their ability to reprint, since the Reprint button will not appear if the user does not have the permission
- **Point of Sale Stock Transfer Request**: Made `To Warehouse` the warehouse defined at the point of sale, instead of `From Warehouse` as is currently the case
- Improved the Point of Sale windows so that when focusing on a field that is editable with a single click - such as clicking the Quantity in the Sales Invoice or the Transfer Request - a single click makes the field ready for editing by typing the quantity directly, without needing to click twice or press `F2` to edit
- Took (Can Be Sold) into account when transferring items to Point of Sale, so that if the item can be sold it can be used in Sales, Return, and Exchange, and if it cannot be sold it can be used in Stock Transfer and Stock Taking
- Added the property `namaServerURL` to the `Nama.Properties` file
- Added the property `stopPricesCaching` to the `Nama.Properties` file

### Reports
- Added a new parameter named `Do Not Mirror Report Content in Arabic` so the report is left as is, without the user having to select Fix Language
- Added the report `027INV-SYSR` for inventory aging
- Added `Profit After Tax` to both reports (`022ACC-SYSR`, `009ACC-SYSR`)
- To take the English language (name1, name2) into account, the templates of the following documents were modified (Stock Receipt Request, Stock Issue Request, Stock Transfer Request, Reservation Voucher, Stock Receipt Voucher, Stock Issue Voucher, Stock Transfer Voucher, Assembly Voucher, Assembly Methods Voucher, Additional Receiving Costs, Journal Entry, Debit Note, Credit Note, Miscellaneous Invoice, Sales Price List, Purchase Price List), along with checking that the amount-in-words also exists in both languages in the documents (Sales Invoice, Sales Return, Sales Quotation, Sales Order, Purchase Quotation Request, Purchase Quotation, Purchase Order, Purchase Invoice)
- Created the Current Inventory Value report with code `010INV-SYSR` using the `FIFO` method, with a hyperlink to the balances
- Added the new report `029INV-SYSR` to show reserved items
- Added the report `002PLC-SYSR` for tracking user activity for line insert, edit, and delete records
- Added the report `001TAX-SYSR` for the tax income statement
- The following was done:
  - `005INV-SYSR` - Analytical Trial Balance, Item Quantities
  - `006INV-SYSR` - Analytical Trial Balance, Item Quantities and Costs
  - `030INV-SYSR` - Analytical Trial Balance, Item Quantities - Warehouses
  - `031INV-SYSR` - Analytical Trial Balance, Item Quantities and Costs - Warehouses
- Added the option `Reviewed and Approved` to the `Report Definition` window - `Deployment Catalog Information` page
- Added the option `Fetch Only Approved Reports When Updating System Reports` to the Global Config
- Added the option `Allow Showing Only the First Page Header When Choosing Not to Show the Page Header`

### Settings
- Allowed changing the translation of the window's `Screen tabs` for a specific file or document type
- In the Alert Definition screen, added the field `Attachment Name Template` so the format of the attached file's name sent with the alert can be controlled, exactly like in the `Task Schedule` file and in the same way
- Added an easy way to access the input dimensions in entity flows, alerts, and `GUI Actions`
- Added the ability to round in the Budget Scenario
- Added inputs to the entity flow `EAGuessSourceLineIdByItem` so that color, size, revision, Lot, Box, and warehouse are taken into account
- Improved the system so that when creating a field format with a length greater than allowed, the message appears in Arabic
- Changed the option `Show Report If the User Is Allowed via the Permissions Table Regardless of Permissions` in the Global Config to `Show Report If the User/Group/Permission File Is Allowed via the Permissions Table Regardless of Permissions`
- Added the ability to create a filter for a `List` type field from another `List` field
- Added the entity flow `EARevokeApproval`, which cancels the approval request on a record while saving another record
- Allowed setting a group for a group, for the purpose of automatic coding of groups
- Added remarks to the lines of each of the following screens:
  - Entity Flow
  - Validation Based on Criteria
  - The `GUI Post Action` window
- Added the following two fields to the Global Config:
  - `Maximum Number of Times a User Is Allowed to Enter the Password Incorrectly`
  - Minutes Since the Last Failed Password Attempt Before Allowing Login Again
  
  If the user enters the password incorrectly more times than specified in the first field, login is rejected (even if the password is correct) until the time specified in the second field has passed (the time is measured from the first failed login attempt). If the system administrator (or any user with edit-after-save capability on Users) wants to allow the user to log in again before the specified time elapses, a new button was also added to the User screen that allows this, named `Allow Login After Being Blocked Due to Failed Login Attempts`
- Added `Alias` table codes to allow searching by additional codes in the main search field. For example, through the settings, when the `Phone Number` field on the Customer is set as a code for the customer, you can enter (Customer: the required phone number) in the main search field for the system to display that customer
- Added the following query to the coding methods:
  `Code Validity Query (Skip code if 1 is returned, and calculate next)`
  
  Where the system skips the code if this query returns 1, and calculates the next one
- Added the option `Do Not Update a Non-System Report That Has a System Report Code` in the Reports Settings within the Global Config

### New GUI
- Improved reference fields in document headers so that the reference type does not appear in the list when the list contains only one item
- Changed the (smiling face, frowning face) icon in both the new and old interfaces so that it switches to the frowning face and the smiling face, respectively, on mouse hover
- Improved image display in the grid so that they appear at an appropriate size
- Made the system field `Version Name` in the Development Request unavailable to the user - along with any other system field

## Fixes

### Inventory
- Fixed an issue where an error occurred when grouping items in the Stock Taking Committee, and also where creating the committee manually caused an error in the End of Stock Taking document
- Fixed an issue where the journal entry for the Stock Receipt Voucher created from the Assembly Voucher did not display the entry linked to Additional Receiving Costs, even though it was set in the term config
- Fixed an issue where processing of Transfer Vouchers failed
- Fixed an issue where the Transfer Request could sometimes not be saved
- Fixed an issue where creating a Multiple Assembly Voucher for an item whose raw materials have different units caused a problem on save
- Fixed an issue where an error occurred in the entity flow `EAGenAndItemSizesAndColorsAndRevisions`
- Fixed an issue where processing of stock documents sometimes failed due to reservation
- **Assembly Voucher**: Fixed an issue where selecting the quantity in the header caused an error in the multiplication operation at the line level
- Fixed issues that occurred in the system when changing units repeatedly
- Fixed an issue where, when a Transfer Voucher had lines all set to Allow Overdraft, the system rejected saving due to the overdraft

### Purchasing
- Fixed an issue where the pricing of Purchase Invoice items sometimes had an error when issued based on a Purchase Order
- Fixed an issue where a Purchase Invoice could sometimes not be deleted
- Fixed an issue where, sometimes, creating a Purchase Return for a vendor, then grouping the related documents, applying, and saving, showed the message "The operation could not be performed" with no log shown

### Sales
- Fixed an issue where deleting the Exchange Voucher did not delete the automatically created Stock Issue Voucher
- **Sales Exchange document**: Fixed an issue where creating it based on a Sales Invoice that had a discount (percentage or amount on the line) did not copy or take that discount into account
- Fixed an issue where an error occurred with the entity flow `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`
- Fixed an issue where creating a Debit Note containing invoices, then repeating the same invoice on multiple lines with different amounts, resulted upon saving in the note appearing on the invoice's payment vouchers with only the last line's amount, whereas it should show the note with the total of the amounts from the lines for the same invoice
- In some cases, `ref.lines` was added at the line level in the System KPI Approval screen

### Accounting
- Fixed an issue where, sometimes, creating the Closing Entry showed an error message that the document was not balanced
- Fixed an issue where, sometimes, saving Exchange Rate Change Vouchers and Currency Difference Entry Vouchers caused processing to fail

### Letters of Credit
- Fixed an issue where adding expense items to the Letter of Credit did not affect the distribution to items after saving; running a `recommit` on the document also had no effect, but performing any action and saving made the distribution to items work correctly, only for it to disappear afterward
- Fixed an issue where adding expenses caused the system to `duplicate` the numbers, repeating more than once for a single expense, which affected the item cost

### Settings
- Fixed an issue where adding a template inside a document book, with the option `If a Document Has Only One Book, Use It Directly` selected in the Global Config, meant the template was applied only after reselecting the book
- Fixed an issue where the system update sometimes did not work correctly, and Import & Export often stopped working

### Contracting
- Fixed an issue where, when creating a Subcontractor Extract, the quantity and cost fields were disabled for editing; saving without editing, or visiting the contract's main screen and returning to the Terms & Conditions screen of the contract, made them editable
- Fixed an issue where registering a Subcontractor Extract based on the Subcontractor Contract did not show the cost from the contract on the line in the Extract, requiring the cost to be entered manually again after looking it up in the contract
- Fixed an issue where, when the quantities of a specific item were distributed across more than one Subcontractor Contract, the system did not take into account the quantity entered in the other contracts
- Fixed an issue where, in the Contracting Executive and Estimated Budgets, the button for updating codes did not work
- Fixed an issue where an error occurred when saving a contract with a discount while nothing was selected in the field `Prevent Saving Contracts and Offers If the Line Discount Exceeds the Employee's Maximum Discount Percentage` in the Contracting Settings
- **Subcontractor Penalty Voucher**: Fixed an issue where selecting the item code on the line did not insert its description
- Fixed an issue where, in both `Contracting Estimated Budget` and `Contracting Actual Budget`, the system allowed the item code to be repeated at the line level
- **Subcontractor Extract**: Fixed an issue where an error appeared when creating a Subcontractor Extract based on another Subcontractor Extract, and the system did not pull the previous quantity from the higher Extract into the current one
- **Subcontractor Extract**: Fixed an issue where using the button for grouping items without quantities grouped all the items in the Extract without quantities, but did not bring down the item code linked to it in the Subcontractor Contract. Improved this button so that it groups the items together with the items linked to them in the Subcontractor Contract
- Fixed an issue where, when creating a Bulk Leave Request or Bulk Leave Voucher, the leave duration was not calculated correctly when the option `Include Weekly Holiday` was not enabled - the duration included the weekly holiday anyway

### Point of Sale
- Fixed an issue where item transfer rules to Point of Sale did not work correctly when selecting the item on the line, sending all items regardless of the file
- Fixed an issue that sometimes occurred when searching for a category and then returning to the main category
- Fixed an issue where the cash payment method was duplicated when using the default cash payment method `cash`, then creating a cash payment method `CASH` and using it at the point of sale
- Fixed an issue where adding (Record Classification) to (New Point of Sale Interface Settings) did not make it appear in the Stock Transfer Request document
- Fixed an issue where, when payment methods were set in the Point of Sale Settings rather than per machine, the accounting effect of a field from the voucher header - `fetchCashMethod` - did not work
- Fixed an issue where running reports with no parameters did not add the system parameters, particularly `posShiftCode`
- Fixed an issue where price lists in Point of Sale did not work, when quantities were set for the same unit, the same way they work in Nama - priority was not given to the larger quantity then the smaller quantity
- Fixed an issue where the document classification was not transferred to Nama even though it existed in the Point of Sale database

### Human Resources
- Fixed an issue where, when a Business Trip was registered against a reason, and a criterion was set on the reason, then payroll was run, the system did not consider the reason when running payroll, causing the amounts to repeat across all allowances
- Fixed an issue in the Departure Permission window with the count of departure permissions during the month, which the system calculated incorrectly: setting the maximum monthly departure permissions to 4 in the Employee Management screen still allowed 5 departure permissions, because one of them was a draft and the system did not count the draft
- Fixed an issue where, in the Departure Permission voucher, the system showed an incorrect value in the field `Duration` when the date was changed
- Fixed an issue where, in Salary Equations, Percentage of Tax Base did not work correctly
- Fixed an issue where the Leave Voucher could not be saved, showing a message that the leave duration must be less than or equal to 0
- Fixed an issue where the Performance Indicator sometimes had no effect on the system
- Fixed an issue where creating a Leave document or a Transfer Voucher showed the employee a balance far higher than what they were entitled to
- Fixed an issue where creating a Bulk Return-to-Work Voucher based on a Bulk Leave Voucher changed the employee's status-change transactions in order by date, but this caused the lines' `From Status` field to be set incorrectly; as a result, deleting the Bulk Return-to-Work Voucher did not restore the On Leave status that existed before the Return-to-Work Voucher

### Settings
- Fixed an issue where, when creating a custom list containing an attached file in `PDF` format, the content was not displayed when hovering over the attachment with the mouse
- Fixed an issue where an error occurred when running the entity flow `EAPreventChangingFields`
- Fixed an issue where, if an employee had full permission on the Sales Order and was given an additional permission (`additionalSecurityProfile.details`), and that file contained a Sales Order permission limited to viewing only the records they created, the system allowed the employee to view only the records they created, ignoring the main permission granted to them
- Fixed an issue where setting a `mask input` for the field `Value net.money` on a types list was applied correctly inside documents, but not when displaying the list
- Fixed an issue where an error occurred when running the entity flow `EAPreventChangingFields`
- Fixed an issue where an error appeared when running the entity flow `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction`

### Fixed Assets
- Fixed an issue where the error `The operation could not be performed` sometimes appeared when trying to register an asset purchase
- Fixed an issue where there was no data on the Statistics page in Fixed Assets, and consequently no data in the asset reports

### Real Estate
- Fixed an issue where processing of Sales Contracts sometimes failed with the error message `The document is not balanced`
- Fixed an issue where, in Collect Documents, an error occurred in the journal entry: the amount including tax was taken in the entry, and then the tax was calculated

### Reports
- Fixed an issue where report `005INV-SYSR` did not take the opening quantity into account
- The following reports were modified because they had issues:
  - `SYSR-SLS013`
  - `SYSR-SLS014`
  - `SYSR-SLS009`
  - `SYSR-SLS008`
- Fixed an issue in the `Journal Voucher Statement / Daily Journal Entries Movement` report, code `019ACC-SYSR`, where Type, Document Code, Account, and Subsidiary did not appear; also added an option to show and hide the totals and movements, and added a serial number at the line level
- **Fields & Screens Settings window**: Fixed an issue where setting (`Field Formats`) for a field, choosing color (X) for the text and color (Y) for the background, worked correctly inside the screen, but in (`list view`) the system reversed the options, showing color (Y) for the text and color (X) for the background

### New GUI
- Fixed an issue where an error occurred when adding more than one attachment and then hovering over them with the mouse
- Fixed an issue where, when using the new interface to log in to the system, entering the user code and pressing `Enter` showed a message that the username or password was incorrect
- Fixed an issue where, when creating a Development Request and clicking the request type then clicking `Add`, the options list stayed open and did not close after the selection
- Fixed an issue where, in the Visit Voucher, searching for specific visits by date (for example, greater than 01/12/2019, and selecting the task assignee) either showed no results or showed them incorrectly, ignoring the filter
- Fixed an issue where, in the entity flow window, clicking Inactive on the voucher header copied it to the lines; this did not happen in the New GUI
- Fixed an issue where typing in the English Code field in the Group file showed `The operation could not be performed`
- Fixed an issue where searching in the Code field did not work on any screen; for example, going to the Item and typing part of the name showed nothing
- Fixed an issue where the More menu often did not appear after being clicked for the first time; for example, in the Salary voucher, clicking Reissue from the More menu meant the menu would not appear again, and the same happened when clicking Prevent Use
- Fixed an issue where uploading a report containing a parameter of type `list` did not display it with the new interface
- Fixed an issue where opening a draft voucher and clicking the Save button caused the system to reject the save, stating there were no changes. Improved so that saving drafts is now always allowed regardless of changes
