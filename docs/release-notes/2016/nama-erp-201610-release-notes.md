# Nama ERP Release Notes - October 2016

::: info Release Information
**Release Date:** October 2016  
**Release Number:** 201610
:::

## Additions

### Inventory
- Added the entity flow `EACopyRackCodeFromStockTaking` to handle shelves during the Inventory Stocktaking process.
- Added the option **"Verify Available Quantities Before Saving"** in the term configs of Distribution Management documents, except documents that make reservations; the option also does not work with (Receipt, Issue, and Reservation) documents.
- Improved so that when creating a Stock Issue Request or a Raw Material Issue Request and selecting the warehouse, selecting the item shows the Box and the Lot number available for this item with their quantities.
- Added the **Item Voting** file.
- Added the **Price Voting** document.
- Improved the entity flow `CreatRMIFromStockTransfer` to allow an automatic issue if the transfer is based on a Production Order or a Raw Material Issue Request.
- In Distribution Management documents, added the option **"Verify Quantities on Saving"** in the documents' term config.
- In the Prevent Lot Usage screen, added the ability to leave the Lot number empty, so the item itself is prevented from being used.
- Added the option **"Overdraft Cost Sources"**.
- Moved the fields that contain a value and a unit, during screen editing, keeping their normal shape without separating them.
- Added the Tax Policy to the Item file.
- Added **"Item Section"** to the Item Brand file.
- Added the column **"Default Price"** in the Item Versions screen, to set a price for each version of the item, applied the same way as the default price on the Units screen.
- Within Item Settings, added the following fields, which are applied automatically to items when the settings are selected and can be edited within the item (**Has Size**, **Has Color**, **Has Version**).

### Sales
- **Sales Quotations screen:** Copied the default currency `currency.money` and the rate `currencyRate.money` automatically.

### Accounting
- In the Profit Distribution to Partners document, added the Management Profit Percentage, which is a percentage of the total of only the partners to whom the management profit applies; the value deducted from the profit is deducted from each partner according to their partnership percentage in the project.
- **Partners' Shares window:** Added the field **"Management's Share of the Partner's Profit"** to the lines of the **"Shares"** file.
- When creating a Journal Entry where the book is on a certain dimension and, in the lines, the analytical record is on a different dimension, the error message does not indicate which line has the error.
- Improved the Financial Balance so it automatically takes the period lines from the document header.

### Banks
- **Deferred Bank Portfolios:** Added the ability to create them based on a Financial Paper, which selects all the Financial Papers with the status "Received".
- **Bank Portfolios:** Added the ability to create them based on a Financial Paper, which selects all the Financial Papers with the status "Received" or "In a Deferred Portfolio", and, in the Bank Notice, all papers with the status `Portfolioed`, `PostponedPortfolioed`.
- **Deferred Bank Portfolio document:** Added additional expenses, as in the Bank Notice, with a financial effect — they are deducted from the bank's current account and charged to Bank Expenses.
- **Bank Notice:** Improved so that when the option **"Verify the Remaining Amount Matches the Total Installments"** is enabled, instead of the current matching between the document total and the paid values, matching is done against the values of lines with the status **"Collected"** only, and renamed the property to **"Match Collected Payments with Paid Values"**.
- **Cancel Financial Paper:** Added the ability to cancel a Financial Paper for less than its value and change its status to (**Partially Cancelled**); once the rest of the amount's cancellation is completed, its status changes to (**Cancelled**). While a Financial Paper's status is Partially Cancelled, no transaction can be made on it except completing the cancellation.
- **Bank Notice:** Added a **Group Payments** button to group the payments from the Opening Contracts and Sales Contracts against which the cheque numbers in the Bank Notice appear.

### Customer Relationship Management (CRM)
- Added a **"Create Development Request"** button inside the error message that appears within the document.
- **Customer Service Task:** Added a new group in the main screen called **"Detailed Tasks"**.
- Added the field **"Technical Support Notes"** to the Technical Support Ticket.
- Updated the closing date based on the status changing to Closed.
- **Ticket window:** Added the ability to convert a Ticket into a Development Request and change the status to **"Development Request"**.
- **Ticket window:** Increased the size of the Technical Support Notes field so it can hold a larger number of characters.
- **Ticket window:** Added the ability to change the request's status to **"Reopened"**.

### Fixed Assets
- **Stocktaking Fixed Assets document:** Added the following fields at the line level (**Asset Code**, **Custodian**, **Asset Value**, **Net Value**).

### Sales
- Added the **"Contact Information"** window to the Customer file.

### Human Resources
- **Employee Leave Voucher:** Added the two fields **"Substitute Employee"** and **"Delegation"**, so the substitute employee can approve the approvals required from the employee.
- In the Component Calculation Formula screen, added **"Formula Result"** to the Performance Rate list.
- Added the maximum number of Departure Permissions in the screens (**Employee**, **Position**, **Job Grade**, **Department**, **HR Settings**, **Reason Type**).
- When uploading the fingerprint file, there are days with only a check-in fingerprint or only a check-out one, and in this case saving the document is rejected. Added the ability to handle this case through Performance Indicators.
- Added the ability to run a query at the line level in the Formula Verification screen.
- **Employee Vacation Plans document:** In the **"Group Employees"** window, shown via the **"Group Employees"** button, added the dimensions (**From Department... To Department**, **From Branch... To Branch...**, etc.) as additional dimensions for grouping employees.
- Added an attachment field in the Work Start Document screen.

### Contracting
- **Work Area file:** Added the list **"Work Area Type"**, containing the following options:
  - Squares
  - Blocks
  - Land Plots
  - Buildings
  - Floors
  - Units
  - Unit Components
  - Unit Sub-Components

### Real Estate
- Enabled the **"Create Rents"** feature so it works before saving the contract, like Sales Contracts before saving.
- Improved the Contract Basis field so it holds the rent value for a single period based on the selected rent period type (Monthly / Annual...); also added a new field, **"Rent Value per Period"**, entered manually, so the Contract Basis is calculated automatically as the total rent value for the entire contract period, by computing the rent value per period × the number of contract periods.
- Added a new file named **"Real Estate Investment Expense Item"**.
- **Owner/Buyers screen:** Increased the number of attachments to 5 attachments.
- Made a unified `Entry System` for all installment-collection documents, viewable inside the contracts, containing (Contract - Payment Voucher - Installment Code - Date - Effect Type {Due for Collection - Collected via Receipt Papers - Finally Collected} - Payment Date - Financial Paper - Paid Value).
- **Sales Contract and Opening Sales Contract:** In the installment lines, allowed the user to select a cheque number for each installment from the cheques in the Receipt Voucher linked to the contract.
- **Sales Contract and Opening Sales Contract:** Split the Collected amount into three fields as follows:
  - Collected from the Collect Document (**Due for Collection**)
  - Collected from the Cheque Receipt Voucher (**Collected via Receipt Papers**)
  - Finally collected from the Cash Receipt Voucher, the Bank Notice, or the Bank Deposit (**System-Paid**)
- Added a dropdown list titled **"Installment Effect"** in the term config of the Collect, Receipt, and Bank Notice documents, containing the following options:
  - None
  - Collected via Financial Papers
  - System-Collected
  - Due for Collection
  - Effect on Installments (**Due for Collection** - **Collected via Receipt Papers** - **System-Paid**)

### Point of Sale
- Improved so the label of the Lock field is (**Auto Lock Period**), in English `Auto Lock period`.
- Improved so the Auto Lock Period is in minutes rather than seconds.
- Controlled showing/hiding the features (**Serial Number** - **Taxes** - **Has Lot** - **Has Version** - **Color** - **Size**...).
- Improved so that hovering over a certain button shows the button's shortcut next to its function.
- Defined the shortcuts for Point of Sale functions, such as `F1` to switch between Point of Sale, Receipt, and Payment, `F2` to open a shift, `F3` to search, ... and so on.
- Added some user-specific permissions in Point of Sale, such as **"Ability to Open the Drawer"**, **"Ability to Suspend an Invoice"** (which includes clearing suspended invoice(s)), and **"Ability to Return an Invoice"**.
- Changed the label (`Actual time` / الوقت الفعلي) to (`Shift start time` / وقت بداية الوردية) in the Shift window.
- Improved so the shift start time is recorded after clicking the **"Ok"** button for starting the shift.
- Changed the label (`Actual time` / الوقت الفعلي) to (`Cash Count time` / وقت الجرد) in the Shift window.
- Improved so the cash-count start time is recorded after clicking the **"Ok"** button in the Cash Count window.
- Improved so the system loads the data automatically the first time Point of Sale is opened.

### Manufacturing
- Added a page for Lots in the Production Order window, containing the following fields:
  - Lot Code
  - Lot Name
  - Suggested Quantity
- Removed the direct link between the Operation and the Product Component, so the user can choose, within the **"Production Order"** screen, between more than one version of product components for the same operation.

### Fixed Assets
- Moved the option **"Not Depreciable"** to the Asset Type, and it is copied automatically to the asset.

## Settings

- Added an option for the display method when opening a new window, to be one of two options:
  - List Screen
  - New Record
This applies to files, with a separate option for each of (**Files** - **Documents**)
- Improved so the approval's name is shown in the document's status instead of the status name.
- Added the feature **"Delete (Hide) a Group (Block)"**.
- Added an image inside the **"User"** file, to be used as a custom background on the `Home Page`... if no image is attached, the background stays the current default.
- Added the ability to search and create a criterion on `generationtype`.
- **"Notifications and Actions" screen:** Added the ability to link the added button to a `Static URL` or a `Dynamic URL with parameters`.
- Added the entire Permissions file to the User, so the permissions inherited from the file can be edited on the user.
- Added the option **"Maximum Number of Records When Showing All in Lists"** to Global Config.
- Added the ability to create a file that can be inserted inside the Keyword Template.
- **Translation Change file:** Added an **"Applies To"** policy on the translations table, adding the two fields **"For Type"** and **"Types List"**.
- Added a color code to all the system's files and documents. It can be enabled for all files - all documents - all types - or for specific types, through the Global Config screen.
- Added the ability to pin search criteria by selecting a Criteria Definition in the list screen, as well as the search screen (the magnifying glass).
- Added the ability to create a Criteria file from within the list screen via the More menu, creating a Criteria Definition with the same inputs found on the screen.
- Added the ability to `Recommit` documents that have been reviewed.

## General Improvements

- Improved so that when a Document Classification is created from within a document (via the button in the Sales Invoice, for example), the Document Classification automatically takes the document type (Sales Invoice, in the example), and when created from within **"Purchase Order"**, the Document Classification type is **"Purchase Order"** ... and so on.

## Fixes

### Inventory
- Fixed an issue where, in Global Config - File Images, enabling the option **"Show in a Window as the Code Is Typed"** for items and pressing the item code showed the item's image when opening the item's main screen, and it did not disappear after moving the mouse away from the item code.
- Fixed an issue where creating a **"Stock Transfer"** based on a **"Stock Transfer Request"** did not pull in either **"From Location"** or **"To Location"**.
- Fixed an issue where the **Stock Issue** did not suggest warehouses correctly.
- Fixed an issue where, in some cases, linking a **Stock Receipt** to a Purchase Invoice turned it into a draft, and unlinking it returned its status to final.
- Fixed an issue where cancelling the reservation from the More menu on the **"Reservation Voucher"** document showed an error message that there was no available quantity of the item in the warehouse.

### Sales
- Fixed an issue where creating a Sales Invoice and consolidating Stock Issues into it did not show the sales tax automatically in the Sales Invoices.
- Fixed an issue where the system allowed more than one Sales Invoice for the same Stock Issue.

### Purchasing
- Fixed an issue where deleting a Purchase Order linked to a Purchase Request prevented the system from creating a new Purchase Order for the same request.

### Accounting
- Fixed an issue where enabling the option **"Code the Financial Paper from the Payment Voucher Line"** without opening the Financial Papers window and selecting a previously coded Financial Paper did not copy the paper's details to the Payment Voucher line... and on saving, an error message appeared that the due date could not be left empty and that there was a line with no amount.
- Fixed an issue where the Currency Difference Entry sometimes failed to save.
- Fixed an issue where creating a Cash Disbursement Request did not total the amount field from the lines into the amount field in the document header on saving, showing an empty error message; if the user typed the amount themselves in the header, saving worked.
- Fixed an issue where deleting the Subsidiary Type from any `Reference` did not delete it on saving, leaving it as-is, which caused a problem in the Sub-Accounts Statement.

### Banks
- Fixed an issue where creating a Bank Transfer showed the error message `"Total installments does not equal document total"`, even though the term config had no installment options and the document had no place for payments.

### Settings
- Fixed an issue where searching fields in **"Fields & Screens Settings"** did not always work correctly.
- Fixed an issue where, in **Fields & Screens Settings**, checking **"Allow Numbers Only"** without checking **"Allow Letters"** still let letters be typed in the field, and Nama allowed saving.
- Fixed an issue where creating a Quick Help Definition with a text field showed the following error: `No Dialect mapping for JDBC type`.
- Improved so that after setting Allowed Values for a field and then putting the field in search, the values appear as a `Drop Down`.
- Fixed an issue where not all buttons were visible in list screens when the screen `Resolution` used was `1280*768` or `768*1366`.
- Fixed an issue where editing a list for a group or a link did not apply the required order correctly.
- Fixed an issue where criteria sometimes disappeared after being saved.
- Fixed all composite fields in all screens so they all always have an identifier.
- Fixed an issue where the condition was sometimes cleared when saving a new criterion.

### Human Resources
- Fixed an issue where importing Time Attendance data with an employee code not found in the system showed an error; the error message should instead show the employee code that needs to be coded.
- Fixed an issue where creating a scheduled task set to send on Sunday caused the program to send it on Monday — the program was adding one day to the requested day.
- Fixed an issue where, in some cases, a problem occurred with importing Time Attendance at the customer's site.

### Customer Relationship Management (CRM)
- Fixed an issue where an error appeared in Technical Support Tickets when viewing the Executions.

### Point of Sale
- Fixed an issue where opening a suspended invoice then pressing the `F1` key several times did not return to the main Point of Sale invoice window.
- Fixed an issue where, in practice, the system did not transfer customers defined in Point of Sale to Nama.
- Fixed an issue where the system shut down completely instead of doing an Auto Lock and showing the Lock screen after the time specified in the Settings screen.
- Fixed an issue where Point of Sale was not affected by price lists.
- Fixed an issue where `Logging out` of Point of Sale did not warn the user about losing unsaved invoice data.
- Fixed an issue where `Exit`ing Point of Sale did not warn the user about losing unsaved invoice data.
- Fixed an issue where trying to post a Sales Return without a Sales Invoice showed the wrong message (**"Please enter the invoice code"**); it should instead be (**"You do not have permission to return without an invoice"**).
- Fixed an issue caused by the following steps:
  - Opening an old invoice
  - Suspending this invoice and showing it again
  - Paying this invoice: the system accepted it even though it had already been paid, and deleted the old invoice
- Fixed an issue where the Receipt and Payment windows did not accept fractional numbers.

### Contracting
- Fixed an issue where the list screen for Collect Documents inside the Sales Contract and Opening Sales Contract duplicated the lines for the same document when it was saved again.
- Fixed an issue where creating a **Term Analysis Card** based on an **Assay** showed an error that the term code was incorrect.

### Real Estate
- Fixed an issue where selecting a contract start date of `2016-01-01` and a contract duration of 2 years calculated the contract end date correctly but rejected saving, showing the following error message: `To date should be 2016-02-29`.
- **Rent Contract:** Moved the Annual Increase field so it is located in the (**Annual Increase Rate**) group.
- Fixed an issue where, in some cases, an error message appeared when creating a Rent Contract.

### Project Management
- Fixed an issue that occurred when duplicating projects, in the case of selecting from-customer to-customer.

### Manufacturing
- Fixed an issue where selecting `No Control` manually inside the Production Order — in the Product Components lines — did not immediately pull in **"Production Date"**, **"Expiry"**, and **"Reselection"**.
- Fixed an issue where, in the **"Production Components"** screen inside the Production Order, selecting `Number Control` for a certain item did not insert the production and expiry dates automatically.
- Fixed an issue where not linking the product's components to operations showed an empty error.
- Fixed an issue where creating a Production Order with a unit of measure for the finished product that was not defined in Item coding showed an empty error message.

### Reports
- Fixed an issue where giving the user the Legal Entity as a composite dimension (containing more than one legal entity) made the Legal Entity parameter disappear from reports.
