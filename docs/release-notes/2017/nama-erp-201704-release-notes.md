
::: info Release Information
**Release Date:** April 2017  
**Release Number:** 2017.04
:::

# Nama ERP Release Notes - April 2017

## Additions

### Sales
- Prevented the system from automatically pulling in any **Version**, **Color**, or **Size** — even the default one — because in most cases the price is not tied to these attributes; when the price is tied to the attributes, it is better for the customer to choose them themselves
- When creating a **Sales Invoice** and choosing `Reference 1` on the line, it is not copied to the journal entry generated
- **Sales Invoice**: When a specific payment method is selected, improved so the user is prevented from saving if the amount has not been entered

### Accounting
- **Receipt and Payment Vouchers**: The total debit and credit are now calculated as the amounts are entered on the lines — as with Journal Entry Vouchers — instead of only on save

### Banks
- **Letter of Guarantee Request**: The default currency is now copied automatically into the `currency.lgtValue.values` field

### Human Resources
- **Loan Documents**: Added an installment-rounding mechanism similar to the one in sales price lists: Round Down - Round Up - Round to Nearest
- **Loan Rescheduling**: Added the following changes:
  - The ability to select the deferred installments
  - Distribute evenly across the remaining installments
  - Distribute across specific installments — for example, selecting the fifth and seventh installments to distribute the value of the deferred installments
- Added the field `Multiplied By / Divided By Query` to the brackets table in the per-unit calculation formula
- Added the following two documents:
  - **Add Employee to Social Insurance Document**
  - **Remove Employee from Social Insurance Document**
- Added the ability to display the employee's leave balance inside the **Leave Request Document** and the **Leave Document**
- Added the `nationality2` field from the Employee file to the Add Employees to Social Insurance document
- Added the `laborID` and `orgInsuranceId` fields from the Employee file to the Add Employees to Social Insurance document

### Contracting
- Added the **Project Status** field to the Project file in the Contracting system, containing the options (In Progress, Closed, Preliminary, On Hold, Open, Stopped, Finished, Postponed, Planned, Reopened)
- **Extract**: Added an **Accounting Percentage** — a percentage by which the amount due on the Extract is adjusted. Example: entering a percentage of 90% adjusts the due value by the accounting percentage and adjusts the amount due. The same percentage was also added to the lines of the **Execution** document and is copied to the **Subcontractor Extract** document
- Added a new type to the **Standard Condition** file in Contracting, being an `SQL Query`, so the condition can be applied inside the **Subcontractor Extract** using predefined criteria linked at the level of each of (Contractor / Contract / Project) — since supplies and auxiliary materials are sometimes issued to subcontractors, and the value on the Extract needs to be increased (deducted) based on the value of the warehouse issue document

### Manufacturing
- Added the following options to Manufacturing Settings:
  - Do not allow returning raw materials that were not issued against the Production Order
  - Use Size in raw material returns
  - Use Color in raw material returns
  - Use Lot in raw material returns
  - Use Box in raw material returns
  - Use Version number in raw material returns
- Added the option `Use To-Operation in Calculating the Conversion Factor` to Manufacturing Settings, to use the conversion factor of the "To Operation" instead of the conversion factor of the "From Operation"
- Added the option `Recalculate Rate on Save` to the Resources Document, so a change in the cost rate can be taken into account
- Added `From Date` and `To Date` to the activities table in the Resource file, so rates can be changed from one period to another

### Point of Sale
- When the program is opened for the first time and the Settings screen appears, improved so pressing `Enter` each time moves to the adjacent field
- Hid the **Cancel Line Tax** button when tax is not enabled in the settings

### Customer Relationship Management (CRM)
- **Call screen**: The current time is now entered into the Call Time field
- **Lead window**: Added the `Internal Source` list, containing the two options (Employee, Partner)
- **Lead window**: Added the options (Broker, Grant, Social Media) to the Lead Source list
- **Lead window**: Added the options (Preparing the Contract Wording, Price Negotiation) to the Sales Stage list
- Added attachments to the **Complaint - Suggestion** window

### Letters of Credit
- **Expense Item**: Added a criterion to the Item file so it is only distributed across items using a criterion

### Real Estate
- **Lease Contract screen**: Improved so there is an accounting effect for rental installments due in the next fiscal year, with the program calculating that value automatically
- Inside each of the files (Project, Square, Building, Floor, Residential Unit, Combined Unit), 5 additional attachments were added

### Settings
- Added a **Box Check** called (Inactive) to both **Alert Definition** and **Approval Definition**, as is already the case in the **Scheduled Task** file, so the file's activation can be turned off without having to delete it
- Added a **repository** for storing and browsing reports, to serve as a reference for all branches
- Added the option `Allow Editing After Use` to the Approval Definition
- Added the Product field found in Development Requests to the alerts sent by email
- Added the option `Use Escalation Decision to Direct Manager` to Global Config
- Added a new button `resetDisplayColumns` to the Screen Modifier, for editing the result columns
- Added a checkbox to each of (Displayed Columns - Search Fields) called Visible (meaning that when the Visible checkbox is unchecked, the column remains among the columns available for display but stays hidden until it is shown again); the option's default value is `True`

## Fixes

### Inventory
- When modifying an Item screen — editing the selection list and adding many fields — the system compresses everything into a single page instead of displaying it automatically; it should instead display with clear spacing, growing the layout so the user can scroll right to see the remaining fields via the page's scrollbar
- Fixed an issue where the value of the system journal entry was occasionally wrong when creating an Additional Receiving Costs document
- Fixed an issue where, occasionally, setting an accounting term config on consolidation vouchers showed an empty error message on save and the save was rejected
- **Quality Inspection Document and Quality Confirmation Document**: Fixed an issue where the "Create Transfer Request with the Rejected Quantity" button did not work correctly
- **Warehouse Transfer Request Document**: Fixed an issue where, when selecting Based On a Quality Confirmation document, the lookup (magnifier) search did not work
- Fixed an issue that occasionally occurred with warehouse transfers

### Sales
- Fixed an issue where, occasionally, there was a difference between the value of the system journal entry and the amount paid in cash and by card on the Sales Invoice
- **Sales Invoice**: Fixed the following problems that occurred when grouping lots — the lots appeared in the correct order when searched, but pressing the Group Lots button caused:
  - The quantity of a single lot to be split across two lines for no reason
  - The lots not to be copied to the lines in the correct order — for example, line 1 held a lot with an expiry date of 01/01/2017 while line 2 held a lot with an expiry date of 30/06/2016

### Letters of Credit
- **Letter of Credit Cost Document - Related Documents page**: Fixed an issue where the list for the Expense Document and the list for the Supply Document did not work correctly

### Accounting
- Fixed an issue where, in Receipt and Payment Vouchers, selecting a subsidiary account and then clicking "View Record" on the subsidiary type opened a new, empty window
- **Payment and Receipt Vouchers**: Fixed an issue where, when saving as a draft with the debit and credit out of balance, the total debit appeared in the total credit and the total credit appeared in the total debit
- **Receipt Vouchers, Payment Vouchers, and Journal Entries**: Fixed an issue where entering an amount without selecting the account and trying to save as a draft showed an empty message, and trying to save it as final also showed an empty message; the correct behavior is to issue a message stating that the account must be entered instead
- Fixed an issue where, when using the Distribute Across All Matching Lines Sequentially allocation, the distribution did not take into account the order of the lines in the distribution bases and criteria
- **Payment Voucher and Receipt Voucher**: Fixed an issue where the Value field on the line did not correctly bring in the remaining value

### Customer Relationship Management (CRM)
- Fixed an issue where the system recorded the time later than the actual time in both:
  - The Complaint/Suggestion Time on the "Complaint" document
  - The From Time on the "Support Request Execution" document

### Manufacturing
- Fixed an issue where, even with Automatic Loading of Operations not selected, Execution documents still issued Resource documents for operations that were not mentioned in the execution

### Settings
- Fixed an issue where, when opening a small screen from another screen while an error message was showing, the error message appeared behind the small screen so the user could not see it; the correct behavior is for the error message to appear above all open windows

### Point of Sale
- Fixed the GUI, where the system was not taking into account the dimensions of the screen it was opened on, causing most of the text not to display
- Fixed an issue where, in some cases, launching POS showed a message that it was already running even though it was not
- Fixed an issue where the Credit Note discount receipt did not print
- Fixed severe slowness when opening any search screen or navigating from one record to another
- Fixed an issue where the Help screen appeared at a different size every time it was opened
- Fixed an issue where the payment methods defined on the Terminal were not fully copied to POS — only two payment methods were transferred — and re-saving the Terminal file after adding new payment methods had no effect on POS
- Fixed an issue where the Credit Note print form could not be saved
- Fixed an issue where the POS system kept running even after the tray icon was closed

### Real Estate
- **Lease Contract and Opening Lease Contract**: Fixed an issue where, when working with the Hijri date and choosing a Monthly or Quarterly installment type, the system calculated the number of installments incorrectly (adding one extra installment)
- Fixed an issue where a 60-month Lease Contract could not be saved while working with the Hijri date

### Fixed Assets
- **Asset Letters of Credit**: Fixed an issue where the Cost Document of an Asset Letter of Credit did not handle currencies correctly — the asset's cost took the dollar amount without the conversion factor (the cost should be in the local currency)
- **Asset Letters of Credit**: Fixed an issue where, in the Expense Document of an Asset Letter of Credit, even with "No Effect on Cost" selected in the term config, the letter of credit's cost was still affected by the expense
