# Nama ERP Release Notes - March 2022

::: info Release Information
- **Release Date**: March 2022
- **Release Number**: Nama-ERP-202203
- **File Size**: 178.9KB
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory
- Added a new file named **"Keyword Value"**, and added it to the keywords lines inside the item
- In the Keyword file, added a new grid named **"Allowed Values"**
- Added the field **"Keyword"** to the Keyword Value file
- **Item Quantity Limits for Customer window**: Added the following improvements:
  - A salesperson field and a checkbox field named Do Not Apply Multiples
  - When Do Not Apply Multiples is not checked, the multiples for the customer are ignored on the multiples line
  - A value can be set for the salesperson at the customer's maximum limit that cannot be exceeded on the Sales Invoice when set to **"Tele Sales"**
  - Added the period field to the multiples grid

### Purchasing
- **Pricing document**: Improved the document so that, when doing "Based On" (Quotation Request, Quotation...) through the details page grid, the system shows the data on the main page rather than on the details page
- **Purchase Price Comparison document**: Added the option **"Sort Lines Based on Item Code"**

### Sales
- **Points-Based Price Lists**: Added the fields "From Date", "To Date", in addition to **5 Boolean options** to the window's details
- Added **10 Boolean options** to the Quotations window
- **Sales Invoice**: Improved so that, when selecting the terms, the notes are fetched from inside the terms screen
- Improved the Invoice Receipt document so that, when selecting the Sales Invoice in "Based On", it shows only the Sales Invoice's items and does not accept entering any other item except items that have a particular classification
- Improved so that, when creating a Sales Invoice and manually selecting disbursement vouchers in the linked vouchers through the "Group" button - then clicking the Apply button, the lines existing on the Disbursement Voucher are copied after merging them
- Improved so that, when adding a Sales or Purchase Invoice and using linked documents, the system can move the dimensions existing on the lines of the linked document to the main screen

### Accounting
- Added the field **"Copied From"** to the lines of the Misc Purchase Order

### Banks
- **Bank Account window**: Added the field **"IBAN Bank Account Number"**

### Service Center
- **Maintenance Contract**: Added **7 task templates** to the machines' details, with each template linked to the visit type
- **Maintenance Contract**: Added a new button named **"Create Work Plans"**
- **Maintenance Notice**: Made a filter so that the machine that does not exist on the Maintenance Contract is not fetched
- Added the following two fields to the Work Order window:
  - Service Branch
  - Trouble Ticket Code

### Real Estate
- Added the option **"Ignore Paying Instalments in Order"** to the term config of both the Collect Document and the Exemption Document
- On the **Aggregated Collect Document**, added "From Date - To Date" to the document header
- Added the following fields to the Lease Termination document:
  - The Value of the Remaining Rent for the Current Year
  - The Value of the Amount Paid in Advance for the Next Year
- Added the following fields to the term config of the Lease Termination document:
  - Debit for the Remaining Rent for the Current Year
  - Credit for the Remaining Rent for the Current Year
  - Debit for the Amount Paid in Advance for the Next Year
  - Credit for the Amount Paid in Advance for the Next Year
- Added the grid **"Other Fees"** to the items page on the Waiver Document, like the one existing on the Sales Contract window

### Customer Relationship Management (CRM)
- Added the visit type field to the machines grid on the Maintenance Work Plan, so that the visit type created from the Maintenance Contract is saved into it, and likewise the task template field, so that the task template created from the Maintenance Contract is saved into it

### Contracting
- Added the field **"Contract Date"** to both the Project Contract and the Subcontractor Contract
- Added the field **"Project Duration"** to both the Project Contract and the Subcontractor Contract
- On the Project Contract, added the field **"Project Duration"**, which is the difference between the two dates in the "Starts On" field and the "Ends On" field
- Improved the Misc Contracting Invoice document so that selecting the contract is no longer mandatory on the document header
- **Subcontractor Extract**: Added a new table named **"Payment Vouchers"**, and when adding a Disbursement Voucher on the lines, the paid amount is brought down from the Disbursement Voucher; and when adding the extract document on the invoices lines of the Disbursement Voucher and saving the document, the system adjusts the paid value of the documents and adjusts the remaining amount

### Human Resources
- Added an experience grid to the job applicant screen, and the grid holds the employee's experience data
- Added the option **"Ignore Creating a Return to Work Document for Vacations That Require the Return-to-Work Document"** to the End of Service voucher
- Added the field **"Total Attendance Time"** to the electronic attendance document, to automatically calculate the number of attendance hours
- Added the ability to reschedule an instalment in the Advance Instalments Rescheduling voucher into new instalments over which the instalments to be rescheduled are distributed
- Made an option on the Salary Issuance that allows disbursing the Salary Issuance only once during the year
- Improved so that, when selecting the payroll period on the Salary voucher, the actual date is changed to the payroll period's end date
- Added the following fields to the employees lines on the Annual Increment voucher:
  - Direct Manager, Description 1 to 10, Reference 1 to 10, Contact Data

### Hospital Management System
- **Surgery Package Invoice**: Added the following fields to the invoice header:
  - Discount Percentage, Discount Value, Net Required After Discount
- **Surgery Package Invoice**: Added the following fields to the invoice's term config:
  - Debit for the Invoice Discount, Credit for the Invoice Discount, Show All Admission Forms

### Point of Sale
- Added a field on the sales and reservation invoice named Merged Tables; clicking it opens the tables screen, but with a grid for merging more than one table into a single order
- Added the **"Payment Settings"** window through Point of Sale

### Settings
- Added the ability to send files through the **SFTP** protocol in the entity flow **`EASQLToCSVFile`**
- **Invoice Receipt document**: Added a new grid titled **"Unmatched Quantities"**
- **Invoice Receipt document**: Added the button **"Update the Unmatched Quantities Table"**
- Linked the Nama system to Windows **Active Directory**, so that the user can log into the database using the username and password defined on the Active Directory

::: info Clarification Link
For more clarification about adding Active Directory, please see this link:
https://www.youtube.com/watch?v=IR_HeB3Iax0
:::

- **Invoice Receipt document**: Made the following improvements:
  - Improved so that, when scanning the items, it is on the Receipt Quantity field existing on the line in the details, not on the Quantity field
  - Improved so that, when clicking the system button "Item Quantities by Difference", the system groups similar items into a single field and sums the receipt quantity for the same item
  - Not allowing adding any item other than the items existing on the invoice only, but allowing adding other items that have a particular classification selected on the term config (the packaging items classification, for example)
  - Added the time field on the line, so that when scanning an item, the system automatically adds the time to the item automatically

- Added a grid to the Tax Authority settings file, and added **tempo** to it for five fields for the Tax Authority: the Sales Order reference and its description, the Purchase Order and its description, and the Proforma Invoice, as follows:
  - Sales Order Preference Template
  - Sales Order Description Template
  - Purchase Order Preference Template
  - Purchase Order Description Template
  - Proforma Invoice Number Template

- When downloading a new release, the program copies the old release's version to the path:
  ```
  C:\Program Files\Apache Software Foundation\Tomcat 9.0\Old-Release\{Release number}
  ```

- When adding a screen edit linked to all file types, an error occurs in the document term config file
- Made a new action named **`EASQLToCSVEmail`** to allow sending the scheduled task by email
- Added showing the attachment in the report **preview** even if the attachment type is **PDF**
- In the screen editor window **"ScreenModifier"**, the composite fields definition page, increased the number of composite fields existing on the line to **10 fields** instead of **5**
- When using "Based On" and copying the details, the items are added and linked to the "Based On" document. Improved the system so that, when the item fields **(item.item.details)** change, the link to the previous item in the fields **(details.sourceLineId)** is removed

### Freight Management
- Added the following windows:
  - Shipment Location
  - Shipment Location Classification
- Added the following documents:
  - FRM OO Receipt
  - FRM OO Delivery

### Reports
- Added the print form for the "Send Documents to the Tax Authority" document, found in Appendix 1, to the system print forms

### Mobile Applications
- In the applications settings - Stock Count settings screen: added the field **`takingTypeAllowedValues`**, in which values are placed and separated by a line
- On the electronic stock count books' settings lines, added a document type field (a type is selected from Purchase Invoice, Sales Invoice, Stock Count Committee and Stock Transfer), and added a field named Stock Count Document Type, in which one of the values registered in the field **`takingTypeAllowedValues`** is selected on the document header

## Fixes

### Inventory
- Sometimes the Additional Costs voucher does not affect the supply cost
- In the new FIFO system, an issue occurs in the cost of the items of the first stock transfer made after a stock supply on a Purchase Invoice, after the item's cost is changed through an Additional Costs voucher

### Purchasing
- **Pricing document**: When inserting one of a product's components, the error **"The Operation Could Not Be Performed"** appears
- **Pricing document**: When inserting an assembly method or a product's components, the system does not split the items out in the details
- The **barcode feature** does not work correctly. For example, on Purchase Orders and Purchase Invoices, with **scan**, the cursor does not move to the next line even if the item code is typed manually
- When performing a stock revaluation for an item that has lots, and the customer tracks the quantity on the lot but does not track the cost on it, the voucher does not affect the cost correctly

### Sales
- When issuing a Sales Invoice linked to shipping lines, an error occurs when deleting one of the shipping lines

### Accounting
- When creating a cash Disbursement Voucher based on an Aggregated Advance voucher, the dues appear in the account field, whereas correctly the advances account should appear instead of the dues account
- **The Disbursement Voucher** does not take into account the related subsidiary account when issued based on an Aggregated Advance voucher (the account existing on the debit side in the term config)
- An error sometimes occurs while creating the journal voucher resulting from the Closing Entry record

### Hospital Management System
- When searching for the stock item inside the invoices, the item cannot be searched for in the usual way, but only by selecting it from the search lens, on the supplies screen inside all invoices (Radiology - Lab Tests - Operations - Physiotherapy - Services)

### Contracting
- Added the address block information fields and the insurance information fields to the Project file, and also added a field with the alternative code **"English Code"**

### Manufacturing
- Added **5 attachments** to the Production Order Closing document

### Customer Relationship Management (CRM)
- **Maintenance Contract**: When grouping machines on the contract, the system does not fetch all the information existing on the machine from (Building - Floor - Room......)
- **Maintenance Order Execution**: When creating a Maintenance Order Execution from the Maintenance Order, the system does not split out the tasks existing on the order
- **Maintenance Notice**: The problem description does not filter what exists on the contract, as it does not fetch the descriptions existing on the contract for the user only
- **Machine window**: When selecting a floor, the higher level (building - customer) does not appear automatically, and likewise when adding a room, the floor - building - customer do not appear automatically
- **Maintenance Contract**: When clicking the "Create Work Plans" button, the message **"The Actual Date Is Outside the Fiscal Period's Date Range"** appears

### Settings
- When using the **barcode reader** with Purchase Orders and Purchase Invoices, with **scan**, it does not move to the next line even if the item code is typed manually
- **User window - Field Settings**: On the details grid, when selecting the record then typing part of the name of the field to be edited and pressing the down arrow key to show the field-name suggestion, the system moves down to a new line
- When creating a dashboard with variables and linking it to a user, it works correctly, but when adding it to favourites or as a dashboard, it does not work; however, when adding it inside the user, it works correctly

### Human Resources
- Sometimes, when creating a Dues Liquidation document **"End of Service Liquidation"**, and **"Net Worked Days"** is selected from the "Calculate Service Duration Days From" field, the error **"The Operation Could Not Be Performed"** appears

### Banks
- The Letter of Guarantee field on the Letter of Guarantee Delivery document is disabled, and a letter of guarantee cannot be selected from it
