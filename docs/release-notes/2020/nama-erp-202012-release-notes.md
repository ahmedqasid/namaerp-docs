# Nama ERP Release Notes - December 2020

::: info Release Information
**Release Date:** December 2020  
**Release Number:** Nama-ERP-202012  
**Release Type:** Improvements and New Additions
:::

## Additions

### Inventory

- Added the option **"Do not copy the code when converting to an item"** to the `Chain Supply` settings

### Purchasing

- Added the option **"Do not clear the subsidiary field when choosing the customer or vendor"** to the Purchase vouchers term config

### Sales

#### Supply Chain Settings

Added the following options to the Supply Chain settings:
- Insert `N1` on the sales lines from a price list when the item code is selected
- Insert `N2` on the sales lines from a price list when the item code is selected  
- Insert `N3` on the sales lines from a price list when the item code is selected

- Added the option **"Do not clear the subsidiary field when choosing the customer or vendor"** to the Sales vouchers term config

#### Credit Card Payment

Added the two files **"Payment Terminal"**, **"Payment Gateway Method Group"**, to enable payment by credit card and recognizing it automatically on the Sales Invoice instead of entering the payment method manually, by adding the following to the Sales Invoice:
- The field `"paymentTerminal"` on the Sales Invoice header
- The button **"Pay the Invoice"** to automatically recognize the credit card inserted into the device and then pay off the remaining amount with it, or pay the amount of the active line in the Sales Invoice details

### Accounting

- Added the fields **"From Date"**, **"To Date"** to the `Exchange Rate` window; the period between the two dates takes priority over the daily rate
- **Debit Note and Credit Note vouchers**: Added **five attachments**

### Contracting

- Added the option **"Copy the manual total from the previous one with Based On"** to the Contracting settings
- Added **5 numbers**, **5 texts**, **5 dates**, **5 references** to the `Customer Approval for Item` window
- Added the ability to **consolidate the Financial Statement issuance lines** by dimensions and (`ref1`, `ref2`, `ref3`), the record, and the subsidiary, from the lines of the system journal entries
- Added the document **"Contracting Material Issue Request"**

#### Project Extract

Added an `entity flow` that adds the quantities transferred by stock transfer for the estimated budget code of the current item, to the current quantity, as soon as the item code is entered

### Letters of Credit

- Allowed creating a `Commitment Voucher` after doing a `Stock Count`

### Customer Relationship Management (CRM)

Added **ten fields** (`Boolean`) to each of the following documents:
- `Maintenance Report`
- `Maintenance Order`
- `Pre-Installation Survey`

Making sure they are copied when using **"Based On"**

### Banks

#### Letter of Guarantee Vouchers

- Added two fields (`percentage - value`) after the coverage, named **Facilities**, which is the percentage that always complements the coverage percentage, such that changing either one affects the other on Letter of Guarantee vouchers
- Added the fields **"Facilities Debit"**, **"Facilities Credit"**, **"Value Debit"**, **"Value Credit"** to the `Issue Letter of Guarantee` document term config

### Human Resources

#### Performance Indicator

Added the following options to the **Performance Indicator** window:
- Not calculated on weekly holidays
- Not calculated on leave days  
- Not calculated on official holidays
- Not calculated on working days

- Added the option **"Consider attendance to start with the start of the second shift when there is an attendance/departure line spanning more than one shift"** to the Human Resources settings

#### Other Improvements

- In the `Approve the system Performance Indicator` window, improved so that the document can be saved when the **Maximum hours per day** field on the document header is empty, relying instead on the maximum-hours-per-day field on the lines only

#### Employee File

- Increased the number of `description` fields to **20** instead of **15**. Likewise increased the number of `N` fields so they are **10** instead of **5**

#### Advanced Work File

- Added **5 attachments**

### Manufacturing

#### Resource Voucher

Added the two sections **"Manual Resources for an Operation in a Range"**, **"Manual Resources for Specific Operations"**, so all these operations can be entered in the document details

#### Production Order

- **Production Order**: Changed the title of the action **"Cancel Starting a Production Order"** on the Production Order
- **Consolidated Production Order**: Changed the title of the action **"Cancel Starting a Consolidated Production Order"**

#### Production Order Execution Voucher Term Config

Added the following two options to the `Production Order Execution Voucher` term config:
- **"An operation in a Production Order cannot be executed without an approved Quality Inspection voucher"**
- **"An operation in a Production Order cannot be executed without an approved Quality Confirmation voucher"**

- Added the option **"Do not issue a Quality Inspection voucher if there is no Quality Checklist on the operation lines in the Production Order"**

#### Resource Voucher Improvements

- **Resource Voucher**: Improved so that, when the operation number (`operation1`, `operation2`, `operation3`, `operation4`, `operation5`) is entered after all the resource lines have been added from `Based On`, it filters the resources of the entered operation

#### Activity Window

Added **ten** additional fields for each field type (`date`, `n`, `description`, `ref`)

- Added **5 date fields** at the line level for the `Production Execution` screen

### New GUI

- Improved the approvals system so that **"Approve"** is no longer the default decision

### Fixed Assets

#### Asset Disposal Document

- Changed the title of the grid for disposing of a fixed asset to be **"Assets Resulting from Disposal"**
- Made the grid on the `Fixed Asset Disposal` document one of the features that might be unused, controlled through the settings list. This feature was added under the name **"Create assets in disposal vouchers"**

#### Opening Fixed Asset Window

- On the `Opening Fixed Asset` window, showed the **Remaining Life** column

### Point of Sale

#### Invoicing and Payment Improvements

- Improved so that the total invoice value is included in the `payment details grid`
- Added the options **"Do not use for point-of-sale expenses"** and **"Do not use for point-of-sale receipts"** to the Nama `Payment Method` file
- Added the option **"Hide the default subsidiaries in Payment and Receipt vouchers"** to the point-of-sale settings
- Added the option **"Do not hide fields when the user has no permission for them"** to the point-of-sale settings. Used when the user does not want fields, buttons, and menu items to be hidden when they are not available to them

#### New Customer Registration

- Added the two fields (`Customer Category - Customer Classification`) to the `New Customer Registration` window in the point of sale. Each of them has options in the point-of-sale settings for whether to add it and whether it is required

#### Other Improvements

- Enabled (`invoice classification`, and `Sales Return`) to work the same way as the discount does — i.e. pressing it shows a `pop` for the higher user to approve and carry out the action

#### Critical Payment Methods

Improved the point of sale so that not every user can use every payment method, by defining some payment methods as **critical payment methods**. To support this, added the following two options:
- The option **"Critical payment method for point of sale"** in the `Payment Method` file
- The option **"Prevent using critical payment methods in point of sale"** in the point-of-sale permissions

#### Additional Improvements

- Applied `rounding` to the value in the cash-drawer field shown at payment
- Added the following fields to the `Point of Sale Sales` table:
  - `tax1Total`, `tax2Total`
  - `discount1Total` to `discount8Total`
  - `afterDiscount1` to `afterDiscount8`

### Settings

#### Permissions and User Windows

Showed the following fields in each of the **Permissions and User windows**:
- Minimum number of characters to start a search
- Maximum number of print times
- Allow browsing other users' records in search  
- Prevent showing the More menu
- Import
- Export

Showed the following fields in the **Permissions window**:
- Copy from
- Copy to

#### New Entity Flows

- Added a new entity flow named `EAGuessEntityFromNames` to infer the item name when a similar name is entered

#### Popup In Reference Open Table

Added a new table named **"Popup In Reference Open"** to the Fields & Screens Settings, which lets you designate certain fields so that, when the blue link on the field is clicked, the window opens in the same entry screen instead of a new tab; likewise, adding an asterisk (`*`) in the field's Field, together with a set of types, activates this feature for all those types, and putting the asterisk with no type chosen activates it for every field in the system

#### Handling Excel Files

Developed an `entity flow` that handles the Excel file attached to a Purchase Quotation, creating a `Purchase Price List` based on the information in the attached Excel file

#### User Improvements

- Removed the option **"Ability to browse all lists"** from the User window

#### Tax Information

Added **the group for tax information** to the screens (`Subcontractor` - `Related Party`) and any subsidiary that can deal with taxes, containing the following fields:
- `taxInfo.taxRegNo`
- `taxInfo.fileNo`
- `taxInfo.supplier`
- `SpecifiedMission`
- `DealNature`

Also added a field named **"Customer Type"** with the following options:
- Government entity
- Private sector  
- Natural person

Also added the field **"National ID Number for Individuals"**

#### Other Improvements

- Made the `utils.html` page, and the pop-up pages it opens (such as `Monitor Current Tasks`), more suitable for mobile screens
- Prevented running `regenui` except from a browser that is already logged in
- In the `Disposing of an Asset` window, changed the name of the grid at the bottom from "Details" to a name reflecting how it works
- Added the option **"Automatically show Quick Help when a field's value changes"** to the input-to-field mapping table in the `Quick Help Definition` window
- Changed the entity flow execution so the system shows an error message when one of the dimensions has the value `"null"`
- Added the option **"Prevent running manual entity flows if the document is a draft"** to the entity flow

#### System Setup Improvement

Improved so that, when running `setup` for the system, the `installer` refuses to install the system if an incorrect value is placed in the field for `extras`

### Mobile Applications

- Added the choice **"print Normal"** to the **"version sdk printing"** menu on the login screen and the settings screen

### Reports

#### Bank Reports

- Added the report **("بيان أوراق تجارية", "Statement Paper Financial")** to replace the `Receipt Papers Statement` report (**SYSR-BNK001**), since after the change the report covers commercial papers issued or received, not just received ones

#### Financial Reports

- Restructured **the reports for the Financial Statements module**

## Fixes

### Inventory

#### Assembly Request

- Fixed an issue where, in some cases, adding the assembly method on the line showed the error **"The operation could not be performed"**

### Purchasing

#### Purchase Price Quotation Comparison

- Fixed an issue where, in the `Purchase Price Quotation Comparison` window, enabling the option **"Do not update best price on save"** in the window header, choosing a quotation manually, and saving caused the system to clear the selections on all the quotation lines; it should keep the line selections as they are when clicked, and allow editing and saving them

#### Purchase Price Quotation Screen

- Fixed an issue where, on the `Purchase Price Quotation` screen, pressing the **Guess Item Names** button after attaching an Excel sheet made the system take a long time to load the sheet and not pull the items into the item field

### Sales

#### Free Items

- Fixed an issue where, if there were free items on the Sales Invoice, the system incorrectly deleted these free items when the term config was changed

### Accounting

#### Payment Voucher Term Config

- Fixed an issue where, in the `Payment Voucher` term config, when a subsidiary was set on both the debit and credit sides, a subsidiary type was chosen, and the related references were set, creating the `Payment Voucher` always picked the account on the debit side regardless of the credit side

#### Check Payment Voucher

- Fixed an issue where a `Check Payment Voucher` that automatically creates the check showed the message **"The operation could not be performed"** if the `Check Book` was not selected and the document was saved; the message should instead read **"A book must be selected"**

### Contracting

#### General Issues

- Fixed an issue where, in some cases, selecting `info field show` and right-clicking any `system field` did not show the `info field` for those fields — for example, the penalty voucher number field found on the `Debit Note`
- Fixed an issue where, in some cases, saving a `Subcontractor Extract` showed the error **"The operation could not be performed"**

#### Subcontractor Extract

- Fixed an issue where, when a line had a main item and a `unit price` was entered, saving did not clear the `unit price` field; it should, on save, clear the unit price as well as the quantity fields — except the total fields — whenever a line with a main item has a unit price

### Human Resources

#### Salary Voucher

- Fixed an issue where, in some cases, an error occurred in calculating the `Salary Voucher`, counting an absence day even though the employee was not actually absent on that day

#### Business Trip Voucher

- Fixed an issue where, in some cases, `Business Trip Vouchers` did not show up in the `Salary Voucher` and the `business trip allowance` was not calculated

### Manufacturing

#### Machine Creation Issues

- Fixed an issue where machines were not created automatically when running the entity flow:  
  `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`

### Settings

#### Recommit Issues

- Fixed an issue where, when running `recommit`, the system detected a problem in one of the vouchers and displayed the problem in a message, but did not show which voucher had the problem; the message should include the voucher number where the problem is, to make it easy to open and fix

#### Screen Editing Issues

- Fixed an issue where editing the display list in the `Edit Screen` window duplicated columns. Duplicating columns was prevented
- Fixed an issue where, when doing a `screen edit` on the Sales Order and adding `Salesman` to the displayed columns, the system refused to display anything in the Sales Order's display list — showing a blank error message — if that employee did not have permission to browse employees

### Project Management

- Fixed an issue where **creating recurring invoices** showed the error **"The operation could not be performed"**

### Accounting

#### Financial Papers Issues

- Fixed an issue where creating a `Receipt Voucher` or a `Check Payment` showed an error that the `Financial Paper Book` could not be empty

### New GUI

#### Classification Issues

- Fixed an issue where, when the option **"Show item classification relationships"** was enabled in the Supply Chain settings and one of the classifications was then linked to a specific department through the `Classification 1` window, the system deleted the department on save

#### Approval and Field Issues

- Fixed an issue where approvals did not work from inside the document
- Fixed an issue where the system showed fields that had been set as disabled through Fields & Screens Settings

#### Purchase Invoice Issues

- Fixed an issue where clicking the **"Item Code"** field on the Purchase Invoice showed no items, and sometimes crashed the system with the error **"The operation could not be performed"**
- Fixed an issue where, in some cases, the system did not show references when trying to select from them — such as the reference **"Document Subsidiary"** on the Purchase Invoice — when the vendor was selected first

#### Other Issues

- Fixed an issue where **"Fields for which creation opens when a non-existing code is entered"**, set for a field through Fields & Screens Settings, did not work correctly

### Point of Sale

#### Printing and Display Issues

- Fixed an issue where an error occurred on **reprinting** a point-of-sale sales invoice
- Fixed an issue where an error occurred when clicking **payment details** for the invoice's deferred amount
- Fixed an issue where the **Quantity** field on the point-of-sale invoice header was unclear at the `1024*768` display setting
- Fixed an issue where the **line number** did not appear at the `1024*768` screen setting

### Reports

#### General Assets Report

- Corrected the parameter labels in report **"SYSR-AST003"** (`General Assets Report`)
