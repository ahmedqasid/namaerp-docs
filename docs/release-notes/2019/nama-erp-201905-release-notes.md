
::: info Release Information
**Release Date:** May 2019  
**Release Number:** 2019.05
:::

# Nama ERP Release Notes - May 2019

## **Additions**

### **Inventory**
- Added the option `Copy only the lines with the same customer, together with Based On` to the Supply Chain Management documents term config
- Added the option `Do not create an accounting effect for the inventory adjustments resulting from the Inventory Opening document` to the Supply Chain Management settings. This option was added because, after enabling inventory-adjustment journal entries, the system created adjustment entries for the Inventory Opening document, and there was a difference between the inventory value in the accounts and the inventory value in the warehouses per the opening document
- Added the instalments table, due date, remaining amount, and total paid to the **Additional Receipt Costs** document

### **Sales**
- Added four options to the Sales term config, in the Based On group, as follows:
  - Do not automatically pull down the item's unit price
  - Suggest the lowest price for the item
  - Suggest the default price for the item
  - Suggest the highest price for the item
- Reorganized the Sales documents term config, grouping all reservation-related fields into a single section
- File display order, when searching by system fields inside the grid and by book, term config, warehouse, and similar fields, is now sorted by code instead of creation date
- Added the option `Do not allow deleting a line from a document with quantity tracking` to the Supply Chain Management documents term config
- Added the option `Do not apply free-item offers based on the invoice's item count when Based On is not empty` to the Sales term config

### **Purchasing**
- Added 8 "do not apply discount (1-8)" options for vendors — a separate option for each discount — under Apply Vendor Discounts; when any of them is enabled, the system keeps the manually edited value of that discount

### **Fixed Assets**
- Added the instalments table to both (**Fixed Asset Purchase Document**, **Custody Purchase Document**)
- Added tax calculation to the **Asset Disposal Document** term config, since it is considered other income that must be taxed

### **Banks**
- Added a field to both the bank transaction lines and the system transaction lines, named `Match Description By`, used for matching when present

### **Service Center**
- **Assay document**: Added the ability to filter the Machine field by the customer's branch if one exists; if the customer has no branch, filtering is done by the customer

### **Customer Relationship Management (CRM)**
- Added the field `Remarks 3` to the "Spare Parts" table in the **Maintenance Order** document. To add this field to the window, this is done through the "Screen Modifier" file

### **Real Estate**
- Added a new document named **Contract Termination Request**
- **Owner and Buyer file**: Added 5 new fields (Attachment 1, Attachment 2 .. Attachment 5)

### **Contracting**
- Added the option `Copy the price from the Price field, not the Cost, from the contract and the Assay to the subcontractor contract` to the Contracting settings
- Added "Based On" to the Quotation and the Assay

### **Contracting Maintenance**
- Added a new document, the **Machine Ownership Transfer Document**, and added a `view list` to the ownership-transfer documents inside the Machine

### **Human Resources**
- Saving a draft of the **Consolidated Leave Voucher** of type (Annual Leave) is now blocked if the balance does not allow it for the employee
- Added Attendance/Departure to both the **Employee screen** and the **Salary Document**
- **Vehicle Insurance screens**: In each of "Vehicle Insurance Offer Request", "Vehicle Insurance Policy", "Add Vehicle Insurance Request", and "Add Vehicle Insurance Voucher", added the two options "Add Driver Insurance, Add Passenger Insurance" to the document header; entering them updates the lines and runs the same `postAction` that exists on the lines, based on the boolean flag
- Changed the name of the "Liquidation" group to "Liquidation and End of Service"
- Moved the following documents (**End of Service Voucher**, **Evacuation Voucher**, **End of Service Reasons**) to the "Liquidation and End of Service" group
- Added the option `alternatingWithAttendancePlanPunch` to the Human Resources settings: by specifying a certain number of hours before and after the shift, the system treats check-in and check-out within that window as belonging to the same shift, even when the shift is split across two different days. This option was added because of a problem that occurred when an employee's shift is split across two days and the employee arrives before the shift's scheduled time, or leaves after the shift's scheduled time
- Added the option `Do not repeat components if the dimensions are unchanged` to the **Salary Voucher** term config

### **Manufacturing**
- Added a new file named **Raw Material Classification**
- Added the field `Raw Material Classification` to the lines of the "Product Components" file
- Added the field `Raw Material Classification` to the "Raw Material Issue" document term config
- Added the field `Raw Material Classification` to the lines of the "Raw Material Issue" document, so that items with this classification are pulled in when a Production Order is selected

### **Accounting**
- Added the option `Do not check the subsidiary against the account if the transaction date is before` to the Accounting settings — a date field; the system ignores any subsidiary-related error when processing any voucher dated before the date specified in this field

### **Fixed Assets**
- Added the field `To Date` and the field `Creating Document` to the Custody file's details: the previous employee's "To Date" is the same as the next employee's "From Date". The creating document is the "Custody Handover" document that transferred the custody from one employee to another

### **Reports**
- Made improvements to report `022ACC-SYSR` (Income Statement — Balances)
- Added the parameter "From Location: To Location" to report `005AST-SYSR`
- Added the following changes to report `019ACC-SYSR`:
  - Changed the label "Document Term Config" to "Document Code"
  - Added a hyperlink on the document code
  - Fixed the sequence number, which was not set correctly
  - The total line is now blank in the Account, Subsidiary, Sequence, and Type fields
  - The total line is now shown in a different color
- Added the parameter (From Asset Location - To Asset Location) to the Fixed Assets reports
- Changed system report `010ACC-SYSR` so the values — the balances — are now calculated based on the accounting side

### **Settings**
- Added a new table to Screen Modifier - "Edit Selection List" page, named "Fill Fields From Column", with the fields (Column - Type - Type List - Field to Search In - Field the Column Will Be Copied To)
- Added the grid "Additional Search Fields When Searching for a Reference" to the Fields & Screens Settings
- **Document term config**: Added a criterion for the allowed books
- Added the option `Show the report if the user is allowed through the permissions table, regardless of the assigned permissions` to Global Config
- **User Favorites window - Favorite Items**: Added criteria at the level of each favorite item
- Reduced the sending interval from the CRM database to the customer database to 3 minutes instead of 15 minutes
- The maintenance contract expiry information is now shown in the `View Panel Top`, to alert the customer that the maintenance period is nearing its end
- Added a new field to the license request program, `Date End Support About User Notify` — an integer; if it is zero, this customer is not notified. This message is also not shown to users who have "Do not show critical errors" checked
- Added the field `Use the English Support-Request Change Template`; for using the English notification, this field takes the `client` settings into account rather than the `server`, and through it the appropriate template — Arabic or English — is displayed
- Added the following two fields to the CRM Settings:
  - Arabic Support-Request Change Template
  - English Support-Request Change Template
- Added an entity flow `Groovy Script` that can be used to revert vouchers to a specific version before a specific date
- Added the ability to edit the database through question fields (`Fields Question`); data from the window is also now shown in question fields (`Fields Question`)

### **New GUI**
- The color of the main menu and the system header is no longer fixed, so it now matches the theme selected by the user
- Added a `style hover` when selecting one of the side-menu items, so the selected item is highlighted and the user can easily identify it — it was already being highlighted, but not clearly
- Improved so the version number in the New GUI reflects the actual release instead of being a fixed number
- Changed the main version to 5 and changed the title from Nama 3 to Nama 5 throughout the system
- Improved the search in `Menus Down Drop` to take both Arabic and English into account together. For example, when searching the Document Type field in the term config and typing `salesinvoice`, `invoice sales`, or the Arabic فاتورة مبيعات, the system shows the "Sales Invoice" choice

## **Fixes**

### **Sales**
- Fixed an issue where, when the "Free Items Based on Invoice Item Count" offer was enabled, the system did not apply the offer correctly in Sales Invoices and Sales Orders
- Fixed an issue where the system calculated tax on free items in Sales Invoices and Sales Orders even though the option "Do not calculate tax for free items", in Global Config, was enabled
- Fixed an issue where using the Payment Schedule form on a Quotation or Sales Invoice document showed the message "the operation could not be completed"

### **Purchasing**
- There was a problem, introduced in the 24/04/2019 release, in Purchase Invoices when the document term config had the following settings:
  - Comply With Price Lists
  - Apply Vendor Discounts
  - Reapply Price Lists on Save = `true`
  
  A manual discount could not be added to the invoice; even when editing an old invoice, the discounts were removed on save

### **Accounting**
- The system did not allow deleting a **Disbursement Voucher** created based on a **Consolidated Disbursement Request**
- When creating a new Account Distribution Record, the system did not set the default value "None" in the "Distribution Policy" list on any of the pages (Record, Reference 1, Reference 2)
- When creating a Disbursement Request for 20000 and disbursing it, then reducing the value of the Disbursement Voucher to 15000, the total of the disbursement vouchers on the Disbursement Request was not affected and remained 20000, which prevented the user from disbursing the remaining amount with another voucher

### **Settings**
- When choosing to create an Archived Document from the More menu and trying to select an attachment on the lines, the attachment-selection window did not open; but when opening an Archived Document from Basics - Archived Documents, the attachments on the lines worked correctly
- **Report Definition window - Edit Selected Dimensions in Report Parameters section**: if the option "When entering with a dimension other than General" was enabled and the user's permission dimension was a composite of two branches, for example, the user could not use the report
- When a validation error occurred based on criteria, the message and the log did not show the error code, such as the entity flow
- When using a parameter of type `list` in running reports set to automatic, the results did not show correctly
- **Scheduled Task file**: Added the following two fields to the "Execution Time" section:
  - Execute Every (Count)
  - Execute Every (Unit) (Day - Month - Hour - Minute)
- When running the option "Add to Current User's Favorites", the Favorite Dimensions screen appeared; the data entered in the Arabic Title and English Title fields did not work

### **Contracting**
- In some cases, the Subcontractor Extract did not affect the Analysis Card and did not affect the Cost Execution
- When saving a Project Extract, the first save worked correctly, but making a small edit (such as changing the remark) and then re-saving or doing a recommit changed the actual cost
- When selecting an Analysis Item in a Material Issue, the inventory item did not show, even though the inventory item was linked to the Analysis Item in Direct Cost

### **Human Resources**
- Creating a Consolidated Update Voucher for an employee whose status is (Resigned, Terminated, Retired) showed the message `Employee must be Working`; the system should instead consider the employee's status as of the actual date of the Consolidated Update document
- An error occurred when selecting a car in the Add Car to Insurance voucher, but the record still saved and the line data was completed after saving
- If there was only a departure fingerprint punch with no check-in, the system considered the employee absent
- Updating an employee's data for an employee with no Job Offer showed a log "the operation could not be completed"
- Not specifying the Leave Type on one of the Job Offer's lines caused an error; this was updated so that the Leave Type on the Job Offer is now mandatory
- Re-issuing Salary Vouchers that had already been reviewed caused the re-issue to change values that had already been reviewed
- If the Leave Voucher's start date was before the payroll period, or its end date was after the payroll period, that period was counted within the leave duration; the leave period should instead be calculated from the start of the payroll period to the end of the payroll period
- Added a discount on the line and updated the total-price block with the same fields found in the **Vehicle Insurance Policy**, in each of the documents (**Add Vehicle Insurance Request**, **Add Vehicle Insurance Voucher**, **Remove Vehicle Insurance Request**, **Remove Vehicle Insurance Voucher**)

### **Reports**
- Report `005INV-SYSR` does not show the unit for some items
- Report `002INV-SYSR` does not show a transaction if it exists only in the opening balance
- Report `009INV-SYSR`, item quantities in warehouses, shows an error when run and does not work
- Report `005INV-SYSR` does not show the unit for some items

### **Real Estate**
- When setting a discount percentage in the Real Estate Investment Payment form, it did not show in the Preliminary Sales Contract
- Maintenance costs are not added to the total net payments; but there was a problem due to rounding, namely that the system does not add the remainder to the last instalment

### **New GUI**
- When there is a criterion on a list view — for example, creating a list containing Support Requests with a criterion on the list to show Support Requests by status "Initial Support Request - Support Request In Progress - etc." — the following errors occurred:
  - When selecting a Support Request from the list under the Initial Support Request criterion, the system showed only the initial Support Requests
  - When opening one of the Support Requests and, for example, changing the status or adding a discussion, then clicking "Show List" from inside the document, it returned to the base Support Requests list and did not respect returning to the Support Requests list with the criterion (Initial Support Request)
- When using the UI and changing the column width of a `view list` or of columns inside documents in the `Grid`, the widths were not kept per user, because when a column was widened it reverted to its previous size as soon as the page was refreshed. After implementing this request, it is preferable to change how `autofit` runs so it does not run automatically every time — in that case it would be a plain button, with `toggable` removed from it
- When creating a Leave Voucher and entering the start and end dates, the leave duration was not calculated; and after entering it manually, the document did not save and showed no error
- When running a report with a parameter of type `list`, the parameters screen did not show
- When opening an existing Development Request and then clicking the "New" button, the discussions and the request description were not cleared. The problem is that the system does not clear any `text rich` field when clicking "New"
- In Accounting documents, when entering an account in the details and pressing `Enter`, the system automatically added a following line in the details, instead of moving progressively through the same line's fields to fill in the amount, currency, and so on — which happened only by pressing `TAB`
