# Nama ERP Release Notes - November 2020

::: info Release Information
**Release Date:** November 2020  
**Release Number:** Nama-ERP-202011  
**Release Type:** Improvements and New Additions
:::

## Additions

### Purchasing

- In the entity flow **"Create Purchase Orders from a Purchase Quotation per Vendor"**, added a `parameter` that lets you set a criterion on the lines, so the flow applies only to those lines
- Developed a new document named **"Purchase Price Comparison"**, to review the prices available for items across Purchase Price Lists and Quotations, then pick the lowest to issue Purchase Orders

### Accounting

- Added the following options to the **"Account Distribution"** window:
  - Allocate to the sectors on the other side
  - Sector criterion on the lines of the other side
  - Allocate to the branches on the other side
  - Branch criterion on the lines of the other side
  - Allocate to the departments on the other side
  - Department criterion on the lines of the other side
  - Allocate to the analytical groups on the other side
  - Analytical group criterion on the lines of the other side
  - Allocate to the records on the other side
  - Record criterion on the lines of the other side
  - Allocate to Reference 1 on the other side
  - Reference 1 criterion on the lines of the other side
  - Allocate to Reference 2 on the other side
  - Reference 2 criterion on the lines of the other side

- Improved so that adding the invoice in `Bank Transfer` affects the Paid amount on the linked invoice and is treated the same as a `Receipt Voucher`
- Added **3 attachments** to `Receipt Voucher` and `Payment Voucher`
- **Payment Voucher**: When choosing `Based On a Payroll Record`, improved so that the lines are filled only with the lines of the Salary Vouchers in the payroll record that are saved as `Final`, ignoring drafts
- Added **5 attachments** to the header of `Journal Voucher`

#### Financial Statement Settings File

Added the following:
- A `checkbox` on the lines named **Select Line**
- **3 buttons** on the Financial Statement Settings file to do the following:
  - Select all lines
  - Deselect all lines
  - Invert the selected lines

- A menu on the file header for the following fields, titled **Default Settings**, applying a `post action` to the selected lines when any of these values changes:
  - Change (**Debit - Credit**) for the selected lines
  - Change (**Balance - Movement - Opening**) for the selected lines
  - Change (**the opening balance calculation formula**) for the selected lines
  - Change (**the total calculation formula**) for the selected lines
  - Change (**the Level**) for the selected lines
  - Statement Type, containing (**Income Statement - Balance Sheet - Cash Flow**), so that selecting the `source` on the line takes the statement type into account

- Button **Clear Codes**
- Added a new column named **"Restrict Search To"** for `pathText` on the lines of the settings for the aforementioned documents

#### In the Financial Statement Issuance File

Did the following:
- Added the field **Comparison Type**
- Added a `post action` on the settings file so that selecting the file inserts `default values` from the settings file

### Banks

- **Bank Transfer window**: The Bank Transfer is now taken into account when consolidating invoices, treating them as paid on the invoices
- Improved so that adding the invoice in `Bank Transfer` affects the Paid amount on the linked invoice and is treated the same as a `Receipt Voucher`

### Contracting

- The **Statistics screen** inside the Project Contract does not correctly display the Extracts linked to the project

### Real Estate

- Created the option **"Copy the financial paper to the payment lines when creating a Receipt Voucher for a bank check financial paper"** in the Real Estate settings

### Hospital Management System

- In the `Accommodation Transfer` document, added a `filter` on the Form field so the system only searches for those with an accommodation

### Manufacturing

- Added a `select list` to the `Production Execution` document term config named **Generated Quality Inspection Type**, containing (**Quality Inspection Request - Quality Inspection Document**); whichever is created depends on the book chosen — `Generated Quality Inspection Type` in the term config
- Added a `book and term config` for the `Quality Inspection` document in the `Production Execution` term config; the Quality Inspection document is only created after the book is added

### New GUI

- Added the option **"Use detail grids by default on mobile"** to Global Config, so the detail grid editing screen shows by default on mobile devices — also added remembering whether the detail editing screen is open on computers and mobile phones

### Fixed Assets

- Added the field **"Asset Receipt Document"** to the custody details in the `Fixed Asset` window
- Added the option **"Use detail grids by default on mobile"**

### Point of Sale

- Added a button in the point of sale to **Reset Columns** on invoices, back to their original width if the column width was changed
- Added the fields **"Sales Grid Height Ratio"** and **"Shortcut Buttons Height"** to the size-editing table (opened from Help)
- Created a `Consolidated Reference Document` with a details grid that generates the reference file transferred to the point of sale

### Settings

- Added the option **"jasper-no-threads"** to the `nama.properties` file, to make reports run in a single `Thread` only
- Added **5 fields** (`date`) to the Vehicle page - custody details grid
- Added the field **"Maximum number of lines for vouchers and files"** to Global Config
- Added the grid **"Maximum number of lines for vouchers and files"** to Fields & Screens Settings

### Mobile Applications

- Allowed showing the following fields when printing Sales Orders:
  - `{createdAtDate}`
  - `{createdAtTime}`
  - `{salesmanFromSettings}`

- Also added the company's `logo` to the `moduleapps` settings, to be used in printing through the following:
  ```html
  <img width='200' height='150' src="{companyLogo}" align="middle" alt="">
  ```

### Reports

- Added a `hyperlink` on the asset code to open the `Fixed Asset` screen in the General Assets report (**SYSR-AST003**)

## Fixes

### Inventory

- Fixed an issue where, in the `Assembly Request` document - Supplied Items, adding the item and the assembly method on the line showed the error **"The operation could not be performed"**

#### Assembly Requests

- Fixed an issue where adding an assembly method to the supplied items showed the message **"The operation could not be performed"**; the fix handles this while making sure that, when an assembly method is added, it is expanded out the same way it is on Assembly Vouchers
- Fixed an issue where creating the document manually and going to `Assembly Voucher`, then putting the request in `Based On` (`Assembly Voucher based on an Assembly Request`), showed the message **"The operation could not be performed"**

- Fixed an issue where, after granting permission to use `records banned from use` for entry and editing, the system still did not accept selecting a banned item on the lines of warehouse vouchers
- Fixed an issue where, in some cases, processing a `Transfer Voucher` failed

### Purchasing

- Fixed an issue where entering the same item on a Purchase Order across two lines, with one of the lines free, caused a problem in costing the items
- Fixed an issue where removing a `Stock Receipt` line from the Purchase Invoice showed the error **"The operation could not be performed"**
- Fixed an issue where, when a `Purchase Price List` contained the same item with different sizes, any transaction ignored the size and pulled the price of the first size only
- Fixed an issue where creating a Purchase Order for the best price from `Purchase Quotation Comparison` did not show the vendor; it should show the vendor in the header of the `Purchase Order` window

### Sales

- Fixed an issue where an error occurred sometimes when editing Price Lists

### Accounting

- Fixed an issue where creating a `Closing Entries` document showed the error **"The operation could not be performed"**

### Contracting

- Fixed an issue where, after creating a `Contracting Material Issue` document and then a `Contracting Cost Execution` document, the earlier issue's cost did not appear in the cost execution document until the issue document was `recommit`-ed twice

#### Project Contract, Subcontractor Contract

- Fixed an issue where the system did not factor tax into the total calculation, whether at the line level or across the whole contract
- Fixed an issue where the Total field on the main screen showed the total before tax, when it should be after tax
- Fixed an issue where, on the `Project Contract` and `Subcontractor Contract` screens, `Total Price` showed `Price * Quantity`, when it should include the tax value within the total price; also, the tax value was not calculated automatically from the price even though the tax rate existed on the line
- Fixed an issue where, on the `Project Extract` screen, adding an item on the line and choosing the phase — whether the installation phase or the supply phase — showed an error

#### Extract Errors

- Fixed an issue where `recommit` could not be run on the Extract if its type was `Final Extract`
- Fixed an issue where, after creating a `Contracting Penalty Voucher` and then creating an Extract and pressing **Consolidate Conditions**, the system did not pull the voucher's data until the voucher was saved as a draft
- Fixed an issue where, when a `Penalty Voucher` contained a condition with effect type `Other`, creating the Extract and consolidating the conditions put the values into the **"Discount"** field instead of the **"Other"** field

### Fixed Assets

- **Fixed Asset Stocktaking Document**: Fixed an issue where the system did not record the fixed asset as a shortage against the employee even though the asset was in the employee's custody

### Human Resources

- Fixed an issue where an error sometimes occurred in calculating the employee's `Lateness`
- Fixed an issue where, in some cases, the system did not insert the `Single` value on the Salary Voucher even though it had a value in the `Job Offer`
- Fixed an issue where the `Medical Insurance` module did not show up for a customer on one release, even though it was included in the customer's license
- Fixed an issue where, when fields were hidden in the `Permissions` file (`Field Permissions`) for a user, exporting the file or document by that user showed the hidden fields in the Excel sheet
- Fixed an issue where, in some cases, when an employee arrived before the shift start time, the system did not count the employee's attendance
- Fixed an issue where the system did not calculate `Missed Check-in` or `Check-out` Fingerprint on weekly holidays
- Fixed an issue where, when a `Payroll Record` contained several `Salary Vouchers`, some saved as `Final` and some as drafts, creating a (accounting) `Payment Voucher` paid out all the Salary Vouchers, including the ones saved as drafts; and going back to the payroll record and pressing **Save All Drafts** showed an error

### Manufacturing

- Fixed an issue where, after creating a `Production Execution Voucher` and executing the first operation, adding a line to draw a sample and then checking **Automatically Create Sample Withdrawal Documents** in the voucher header and saving showed an error

### Settings

#### Custom Display List Window

- Fixed an issue where the screen was built on `Purchase Order` and added to the `Price Quotation` screen, which carries `Purchase Order` in `ref1`; the filter field `ref1` was selected, but displaying it showed no purchase orders

#### Default Values Templates

- Fixed an issue where creating more than one manual `Default Value Template` (`Apply with field values`) on the same field but with a different reference value meant only the last template worked

#### Special Permissions

- Added `special permissions` for exporting and importing records
- Fixed an issue where, in some cases, the **"UI Regenerate"** command caused errors

#### Permissions File

- Fixed an issue where marking some fields as `Fields Disabled` at the level of a list of types caused the system to apply this setting to all types

### Hospital Management System

#### The Extension Scheduled Task

- Fixed an issue where running the `scheduled task` responsible for automatically extending expired Rent Contracts made the system create an insurance installment line even though the option **"Do not create an installment on extension"** was enabled; the system also did not check the `boolean` copied from the earlier contract on the Expenses page
- Fixed an issue where, in some cases, the system did not accept recording **"Accommodation Transfer"**

### Real Estate

Fixed an issue with the following scenario:
1. Creating an `Opening Rent Contract`, say for 1200, containing an expense `Insurance 500` (the expense has the option `Do not carry the expense over on extension`)
2. Creating an `extension to the contract`
3. Reducing the contract value with the extension to 1000 instead of 1200
4. Pressing the **Create Rents** button

The system calculated an installment for the insurance even though the option **"Do not create an installment for the insurance expense on extension"** was enabled

#### Subcontractor Contract Window

- Payments grid: Fixed an issue where the **Percentage** column showed no data

### Mobile Applications

#### Android 7

- Fixed an issue where running the `Sales Orders` app on Android 7 caused an error during registration and during an update
- Fixed an issue where selecting from the `search list` did not work correctly, on Android 7 only
- Fixed an issue where the `item code entry` field did not display correctly, unlike the quantity field, on any Android version
- Increased the width of the item `search fields` to fill the screen width instead of being centered, on any Android version

#### Saving Settings

- Fixed an issue where saving the settings did not retain the number of records per page or the focus on `print quality`

### New GUI

#### Report Inputs

- Fixed an issue where `report inputs` embedded in screens did not work correctly

#### Miscellaneous Invoice

- Fixed an issue where, in the New GUI's `Miscellaneous Invoice`, a button that creates another `Miscellaneous Invoice` (a separate copy) named **IPO** did not add the book and term config, even though they were set in the button's lines and it worked correctly in the old GUI
- Fixed an issue where deleting one of the `Miscellaneous Invoices` from the displayed list deleted it but still showed an **"Error"** message

#### Recycle Bin

- Fixed an issue where, in the Recycle Bin, restoring any deleted document showed the error **"The operation failed"**

#### Descriptors

- Fixed an issue where, when using `Descriptors` (`Search only`) or (`Title and search`) with the option **"Do not use the description in the title"** enabled in Global Config, the item name on the invoice switched to the format found in the `Descriptors`

#### Browsing Nama from Mobile

- Fixed an issue where opening Nama from mobile, searching for an item, and tapping the wanted item did not open the item's screen but opened a New Item screen instead

### Point of Sale

- Fixed an issue where the point of sale system could not be opened when working on a new database

### Service Center

#### Maintenance Work Order

- Fixed an issue where, in some cases, creating a `Maintenance Work Order` and pressing **Create Invoice for the Work** caused the error **"The operation could not be performed"**
- Fixed an issue where, in some cases, `spare parts` were not issued automatically when closing the work order, even though this option was checked on the work order, and no task or spare-part details had been called up

### Mobile Applications

#### Nama ESS App

- Fixed an issue where, in the `Nama ESS` app, selecting a particular `combo box` showed the options repeated as a single choice. For example, if there were 10 warehouses with different names, opening the combo to pick a warehouse showed the 10 warehouses as the first warehouse repeated

### Reports

#### Subsidiary Account Statement Report

- Fixed an issue where displaying the `Subsidiary Account Statement` report (**SYSR-ACC031**) showed the (`parameter`) **Record Type** defaulted to Department, so no data appeared when the report ran
