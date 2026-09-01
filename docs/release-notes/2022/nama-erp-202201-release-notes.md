# Nama ERP Release Notes - January 2022

::: info Release Information
- **Release Date**: January 2022
- **Release Number**: Nama-ERP-202201
- **File Size**: 202.8KB
:::

## Additions

### Inventory
- Added a mechanism to separate quantity processing from cost processing, so that running cost processing does not affect quantity processing, which used to cause an overdraft
- Added the following two options to the More menu on distribution management vouchers:
  - View the payment and disbursement vouchers linked to the invoice
  - View the invoices linked to the payment or disbursement voucher
- **Additional Receiving Costs voucher**: Removed the "Expense Value" field and replaced it with the "Value" field
- Editing a warehouse's company is now prevented when transactions have been posted on that warehouse, unless the **"Allow Changing the Warehouse's Company"** option is checked in the SupplyChain settings
- Added the entity flow **`EACollectAltItems`**, which adds alternative items to the document so that when an item has no balance, the other item sharing its classification is considered instead
- **Item Assembly Method**: Added the following fields to the assembly method:
  - Used only with the assembled item's unit
  - Used only with the assembled item's size
  - Used only with the assembled item's colour
  - Used only with the assembled item's lot code
  - Used only with the assembly's version
  - Used only with the assembled item's box

### Purchasing
- Added a new document named **"Purchase Proforma Invoice"**
- Added the **"Create Vendor"** button in the "Request to Edit Vendor Data" document
- Added the **"Updated"** option in the "Request to Edit Vendor Data" document
- Added the **"Create the Voucher as a Draft"** option to the term config of the "Request to Edit Vendor Data" document
- **Vendor window - Contacts**: Added **2 attachments** on the lines

### Sales
- Added the subsidiary to the sales and quotation price lists, treated the same way as the customer
- Added a new document named **"Sales Proforma Invoice"**
- Added the **"Create Customer"** button in the "Request to Edit Customer Data" document
- Added the **"Updated"** option in the "Request to Edit Customer Data" document
- Added the **"Create the Voucher as a Draft"** option to the term config of the "Request to Edit Customer Data" document
- Added the following two options to the Sales Invoice term config:
  - Do not update prices when the term config changes
  - Do not update prices after changing the date
- Added the option **"Use System Tables to Track Linking Disbursement and Receipt to Invoices"** to Global Config
- Added the option **"Copy the System Tables for Tracking Linking Disbursement and Receipt to Invoices"** to the term config of distribution management documents
- **Sales Invoice**: Added the field **"Select"** to the "Instalments" grid, and also added the "Create a Receipt Voucher for the Selected Instalments" button, to allow selecting specific instalments to settle them
- Increased the number of **(description)** and **(n)** fields to **20 fields** on the Quotation Request screen
- Added the field **"Subsidiary"** to the price list, so that the prices belonging to the price list's subsidiary are fetched when the same subsidiary is used on the Sales Invoice
- Added attachments to the **"Sales Order"** window

### Accounting
- Added the following fields to the lines of the financial statement issuance settings:
  - Restrict Search to Reference 1
  - Restrict Search to Reference 2
  - Restrict Search to Reference 3
  - Restrict Search to Record
- Added the option **"Calculate the Paid Amount Instead of the Remaining Amount of a Document Based on"** to the term config of both the Receipt and Disbursement documents
- In the **installmentLines** lines of both the "Receipt Voucher" and the "Disbursement Voucher", the following was added:
  - Added **(5) numeric n** fields
  - In the instalment lines of both the "Receipt Voucher" and the "Disbursement Voucher", added **5 (n)**
  - Added **(5) numeric n** fields

### Banks
- Added an improvement to the entity flow **`EAAddAccountingEffect`** so that two fields are defined, from which the currency and the journal entry's factor are determined
- Added the field **"Allow Cancelled Financial Papers"** to the term config of both the Receipt Voucher and the Disbursement Voucher

### Fixed Assets
- Added **5 attachments** to the **"Aggregated Fixed Asset Transfer"** voucher
- Added a line attachment to the **"Aggregated Fixed Asset Transfer"** voucher
- **Asset Purchase Request**: Added the fields **ref, N, description** on the lines
- Added the option **"Update the Asset's Dimensions from the Invoice"** to the term config of the Asset Purchase Invoice
- An error appears when saving the Aggregated Addition and Deduction voucher

### Document Management (DMS)
- When clicking Create Archival Document from the More menu on any screen and trying to add an attachment on the lines (pages), the message "There are unsaved changes. Are you sure you want to exit?" appears
- In archival documents, when approaching the attachment on the lines (pages), it does not show in the preview; likewise, when adding the attachment on the lines, it does not show in the preview and Download is not allowed

### Manufacturing
- Added the table **"Order Voucher Date Fields"** to the term config of the Planning document, to set the order voucher's date on the Planning document's details as soon as it is saved, through the settings configured in the document's term config

### Project Management (ECPA)
- Added **5 attachments** to the Project Sales Quotation
- **Procedure window**: Added a filter on the customer for the project, as well as the tasks linked to the project and the customer

### Customer Relationship Management (CRM)
- **Ticket Execution**: Added the field **"Status"**, which includes the options (Reviewed, Rejected, Finished, Finished Pending Review)
- Added the fields **"Supply Warehouse"** and **"Issue Warehouse"** to the Maintenance Order document
- Added a new grid inside the Spare Parts screen named **"Returned Spare Parts"**
- Added the fields **"Warehouse"** and **"Storage Location"** to each of the following lines:
  - Spare Parts
  - Returned Spare Parts
- Added the field **"Current Status Type"** to each of the following two documents:
  - Maintenance Order
  - Maintenance Order Execution
  
  It includes the following options:
  - Finished Pending Review
  - Reviewed
  - Rejected
  - Finished with Customer Approval
- Added **10 descriptions** to the Contact document
- Added the field **`Styles Extra UI Legacy`** to Global Config, so that most of the system's colours can be controlled through the text it holds
- Made a Groovy entity flow that adds the warehouse supplies to the vehicle Purchase Invoice
- Added **5 attachments** to the "Machine Type" screen
- Added a machine classification field and a visit type field to the Task Template
- Added the Task Template field to both the document header and the machines lines in each of the following documents:
  - Maintenance Contract - Maintenance Order
  - Maintenance Work Plan
  - Maintenance Visit
  - Maintenance Estimation
  - Maintenance Invoice Return
  - Maintenance Notice
  
  And on the header of the "Maintenance Order Execution" document, the following was done:
  - Added **5 Ref** fields in the "Maintenance Order" window
  - Added **5 Ref** fields in the "Maintenance Visit" window

### Contracting
- Added the **"Create Customer"** button in the "Request to Edit Contractor Data" document
- Added the **"Updated"** option in the "Request to Edit Contractor Data" document
- Added the **"Create the Voucher as a Draft"** option to the term config of the "Request to Edit Contractor Data" document
- Added the field **"Condition Value After Tax"** to the additions and deductions lines in both the Project Extract and the Subcontractor Extract
- Added improvements to both Real Estate and Contracting aimed at linking the Real Estate system to the Contracting system, so that the estimated and executed cost of each Real Estate unit can be identified through what has been done in the Contracting system
- In each of the Real Estate files (Project: Unit), the following fields were added:
  - Estimated Cost, Estimated Total, Percentage
  - Actual Cost, Actual Total, Percentage
- Added the field **"Real Estate Project"** to each of the following files:
  - Project Contract, Subcontractor Contract, Estimated Budget, Executed Budget
- Added the field **"Property"** to the item lines in the preceding documents
- **Contracting Settings**: Added a distribution type for the actual and estimated cost, so distribution can be based on area or based on "Estimated Cost"
- In the analysis card field of the Subcontractor Contract's item lines, an improvement was made so that only the analysis cards belonging to the current contract are shown
- Improved each of the Estimated Budget, the Executed Budget, the Assay, the Subcontractor Contracts and the Project Contracts to allow adding a negative profit margin percentage and profit when an item makes a loss
- Improved each of the Estimated Budget, the Executed Budget, the Subcontractor Contracts and the Project Contracts so that the profit percentage and profit margin are calculated automatically when the unit price and unit cost are entered, as in the Project Assay
- **Daily Labour Book**: Changed the field name "Total Cost" to **"Total Allocated Costs"**
- **Daily Labour Book**: Added the field **"Total Labour Costs"**

### Point of Sale
- Added the option **"Add a Prevent Usage Field to the POS Customer Screen"** to the POS settings; when it is checked, an option called "Prevent Usage" appears on the customer edit screen
- Added a new file named **Hall**, and inside the Table file you select the hall the table belongs to, if any
- Added a mechanism for splitting the bill in restaurants, splitting its price among the customers of a single table according to what each customer consumed
- Added the Hall field to the tables grid in the Register file, to allow using halls or tables with the same idea as favourite items
- Added the ability to reserve a table without prices

### Human Resources
- Improved so that, when creating a Bulk Vacation Request or a Bulk Vacation Voucher, the system automatically places the current logged-in employee in the requesting employee field
- Added **View List** to each of the following:
  - By the singulars inside the formula
  - By the formulas inside the KPI
  - By the formulas that used the singular type in Singular Type - Singular Type 1 to 10
  - By the formulas that used the singulars group inside the group

### Freight Management
- Added the following fields to the service purchase and service sales invoices:
  - portOfLoading, portOfDischarge, loadingPoint
  - gateInPort, gateOutPort, container, commodity

### Settings
- Improved the system's behaviour when more than one screen edit record is issued on the same window with different priorities
- Improved the **"Send Documents to the Tax Authority"** document so that, when grouping documents is clicked, the system displays the documents ordered by the actual date
- **Fields & Screens Settings**: Added the field **"Allowed Types List"** to the "Allowed Values for References" table
- Allowed selecting drafts in the record linked to the archival document, so that attachments can be uploaded for, say, a Sales Order before it is approved
- Added the following two fields to the transactions grid in the Item Sub-Status Settings file:
  - The Type Allowed to Make the Transaction
  - The Types Allowed to Make the Transaction
- Added the following two fields to the Tax Authority settings:
  - Maximum Number of Documents to Send at Once
  - Allow Making a Return for Invoices Not Sent to the Tax Authority
- Added the following two fields to the Tax Authority Submission document:
  - Group From Document, Group To Document
- Added the button **"Digitally Sign the Selected Documents"** to the Tax Authority Submission document
- Added the option **"Reverse the Debit and Credit of the Fees Tax in Returns and Purchases"** to the Payment Method

## Fixes

### Inventory
- When reservation is enabled on the Exchange Request document, the system reserves the returned item as a negative
- The option **"Stop Other Discounts"** in the Item Relations file has no effect
- The entity flow `EARegenAssemblyDocumentDetailsFromBOM.plugnplay` on the Assembly document does not honour the "Quantity Is Always a Whole Number" option from the assembly method when fetching it into the Assembly document
- After deleting a unit conversion factor from within the unit, and then from the item containing that unit, an error message appears saying there is no conversion factor between the units
- When creating a Purchase Invoice containing a service item, the system creates an Additional Costs voucher for the service item... Improved so that when the Purchase Invoice's currency or exchange rate changes, the system accounts for that change in the Additional Costs voucher automatically created for the Purchase Invoice
- In the Assembly document, when adding two lines by two methods and deleting one of the two lines, the system does not delete the lines it had split out

### Purchasing
- When creating a Purchase Invoice and selecting an item that has two units and selecting the smaller unit, the system fetches the price from the purchase price list at the larger unit's price, and the system does not calculate the smaller unit's price despite the conversion factor existing within the item

### Sales
- **Quotations window**: The option "Stop Other Discounts of the Same Type" works correctly when the type is a category, and does not work correctly when the type is a classification
- When selecting the lot on the Sales Invoice, it is inserted without a validity date and an expiry date, and when the production date and expiry date are added manually, an error message appears on save
- **Sales Proforma Invoice**: When creating a Receipt Voucher based on the Sales Proforma Invoice, the system does not insert the receipt document into the receipt vouchers table on the Payments window

### Accounting
- The option **"Shorten Debt Ageing in the Same Voucher"** does not work correctly

### Fixed Assets
- When re-saving either the "Fixed Asset Opening" or "Fixed Asset Purchase Voucher" document, if depreciation vouchers had already been made for the assets listed in them, the following fields on the asset are changed back as though no depreciation vouchers had been made for it:
  - Current Year Depreciation, Accumulated Depreciation, Current Book Value, Last Depreciation Date
- In the **"Fixed Asset Opening"** voucher, when entering a date after the actual date in the "Depreciation Start Date" field, the asset is not grouped into the depreciation voucher

### Contracting
- When grouping the conditions on both the Project Extract and the Subcontractor Extract, the system does not fetch the deductions correctly
- **Subcontractor Contract window**: On the item lines, the following was done:
  - In the analysis item code field, all the analysis items existing on all the cards appear, which is wrong
  - When selecting the analysis item code, the system does not fetch the "Item Description", "Item Unit" and "Contracted Quantity" from the analysis card

### Human Resources
- Sometimes an error appears when re-issuing a Salary voucher
- On the electronic attendance screen **`ElectronicAttendance`**, clicking the location icon does not open the location
- **Salary Voucher**: Sometimes the system mistakenly adds the employee's last advance instalment twice
- The error **"The Operation Cannot Be Performed"** appears when creating a "Vacation Carry-Forward" document to move the vacation balance from one year to another
- When linking the Job Offer to (the Vacation Balances file "Based on Experience"), it does not work correctly

### Customer Relationship Management (CRM)
- When creating a Maintenance Estimation document based on a Maintenance Order or a Maintenance Notice, the system does not copy the customer, the machine and the details onto the lines as the Maintenance Invoice document does
- In both **"Maintenance Invoice (MnInvoice)"** and **"Maintenance Estimation (MnEstimation)"**, a button called "Copy All Lines from Work Orders" was added
- Added the option **"Consider the Document's Lines Based On"** to the term config of both the Maintenance Invoice and the Maintenance Estimation

### Real Estate
- **Sales Contract window**: When creating a contract based on a Preliminary Sales Contract, there are required system fields that the system does not fetch from the "based on" document, on both the multiple-creation data lines and the instalment lines

### Settings
- **`codes extra`** in Fields & Screens Settings does not work with the **invItem** type
- When importing files or documents containing lines from Excel and an error occurs, the line with the error is correctly marked with the word **error**, but what was saved successfully is not marked as **inserted**
- When creating a **Filter Dynamic** on the field filtering by criteria screen and then saving, the system deletes the **"Dynamic Filter Context Fields"** field
- When an invoice whose value contains fractions is sent to the Tax Authority, it is not accepted by the Tax Authority because the number of fraction digits does not equal 5. The invoice value was set so that the fraction digits are **5 digits**
- When importing a file that has approval with modification, the message **"Needed Confirmation"** appears
- When exporting a file with an image from one device (a customer record or an item, for example) and then importing it on another device, the system saves the record without the exported image
- On the **Actions Post GUI** window, when setting criteria on **lines**, the field is not inserted into either **(lines.contextField1)** or into **(quickCreator)**

### Banks
- When creating a Letter of Guarantee where the letter type is Incoming and the status is Preliminary, then creating a Letter of Guarantee Receipt, the letter does not appear in the Letter of Guarantee field

### Contracting
- **Contracting Purchase Request**: When selecting a Project Contract in the **"contract"** field and selecting the analysis card on the line, all the analysis cards belonging to all projects appear, whereas correctly only the analysis cards belonging to this contract should appear

### Freight Management
- The recently added payment methods do not work correctly, in that they:
  - Do not affect the remaining-amount field in the invoice's amounts
  - Do not affect the accounting entry when paid with them, unlike what happens on the Sales Invoice

### Point of Sale
- When creating an assembly method for a particular item, selecting a gram assembly unit, then using the method of splitting the assembled item's components out in the POS Sales Invoice term config... Nama's program splits the item's components out in gram-unit quantities without taking the conversion factor into account
- Sometimes the system does not post the Exchange document to the database
- Sometimes, when making a deferred POS return, the customer is set and the deferred value is set from the point of sale, yet the data is nonetheless posted to the point of sale as cash

### New GUI
- Sometimes, when opening any existing document or file, the reference's code field appears empty
- When using a **tip tool** and selecting to show quick help automatically while changing the field's value, the results do not appear in the new **GUI**

### Mobile Applications
- Allowed adding a hyperlink inside the banner description
