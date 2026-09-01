# Nama ERP Release Notes - February 2022

::: info Release Information
- **Release Date**: February 2022
- **Release Number**: Nama-ERP-202202
- **File Size**: 169.4KB
:::

## Additions

### Inventory
- Added a technical field to the Stock Supply Request document, like the Stock Issue Request document
- Added the option **"Prevent Saving Stock Vouchers Falling Within the Period"** to the "Stop Costs' Effect on Accounts" file
- Added **3 new fields for the second quantity** to Finishing the Stock Count, as follows:
  - Second Quantity | Book
  - Second Quantity | Actual
  - Second Quantity | Quantity Difference
- **Assembly document**: The sub-items from the assembly method are now considered, and the quantities belonging to the sub-items are considered as well
- Added the **"Add Item to Purchase Price List"** button inside the item file
- **Quality Inspection document**: The document is now prevented from being saved when there is no answer for a question, depending on the question type
- **Item window - Transactions page**: Added a filter on the net field in quantities
- Added the option **"Do Not Update Prices After Based On"** to the term config of both the Delivery document and the Loading document

### Sales
- Added the option **"Allow Using the Discount Coupon More Than Once if the Type Is a Percentage"** to Global Config
- Added a Groovy entity flow named **`EACollectStockDocsIfEmpty`** to group the linked vouchers
- **Customer Data Update**: Added the following fields:
  - Customer Category 1... Customer Category 5
  - Previous Customer Category 1... Previous Customer Category 5
  - Previous Description 1... Previous Description 5
- Improved the entity flow `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectAlItem` so that it considers the classifications when fetching the alternative item, in addition to giving priority to alternative items
- **Sales Invoice - Payment page**: Improved so that, when clicking Create Instalments, the fields (advance instalment value, second instalment value, and last instalment value) are shown in the displayed Create Instalments window

### Banks
- **Letter of Guarantee**: Added the alternative code, working the same way the alternative code works for items

### Accounting
- Improved the Receipt Voucher so that the system refuses to save if the subsidiary on the main window differs from the subsidiary on the Subsidiary Invoices page
- Added the following two options to the accounting settings:
  - **"Add Tax Fields to Disbursement Vouchers"**
  - **"Add Tax Fields to Receipt Vouchers"**
  
  to show the tax-related fields on the mentioned vouchers, these fields being (Unit Price - Quantity - Total - Tax 1 percentage and value - Tax 2 percentage and value - Net)
- Building on the previous point, two fields were added to the term config options for these two documents, to determine whether the taxes are a deduction or an addition, and the debit and credit for each tax
- Improved so that, when issuing a Disbursement Voucher through the "Create Disbursement Voucher" button on the Disbursement Request, the amount is copied from the request's lines into the total price on the voucher's lines

### Service Center
- Added the following two documents:
  - Sub Item Sales Return document
  - Sub Item Purchase Return document
- Improved both the Car Purchase Invoice and the Car Sales Invoice when grouping and applying against the existing stock vouchers on the linked vouchers page

### Customer Relationship Management (CRM)
- Added the field **task2** to the tasks lines in each of the following files/windows:
  - Machine, Maintenance Order, Maintenance Order Execution
- **Maintenance Order document**: Added the option **"Consider the Task Template's Tasks When Creating Execution Operations"**
- Filtered the machine type on the same item existing inside the machine type on the Machine screen
- Filtered the items inside the returned spare parts lines based on the items inside the spare parts lines on the Maintenance Order screen
- **Maintenance Visit**: Added lines for the work order, and also added the "Copy All Lines from Work Orders" button
- **Maintenance Visit**: Added the option **"Consider the Lines from Based On"** to the document's term config
- **Maintenance Invoice Return**: Added the work order lines, and also added the "Copy All Lines from Work Orders" button

### Human Resources
- Added the option **"Calculate the Due Vacation Balance Based on the Return Date"** to the HR settings
- Added a new field to the vacation type named **"Carry Forward with a Minimum Consumed Annually"**, and also added a method to calculate the balance retroactively for the years
- **Aggregated Mission Document**: Added the following fields to the document header:
  - Default From Time, Default To Time
  - Default Reason, Default From Date, Default To Date

### Hospital Management System
- Allowed recording the discount, as a percentage and a value, inside the Hospital Management System's invoices (Accommodation - Medical Supervision - Amenities - Radiology - Lab Tests - Physiotherapy - Blood Bank - Operations - Medical Services - Medical Supplies - Medical Services and Supplies - Pharmacy - Consultation)

### Settings
- **Invoice Receipt document**: Added the option **"Fill the Item Data on the Line When Adding This Item from the Document in Based On"**
- Improved so that saving is prevented when the entry dimensions table is filled without checking the option **"Prevent Editing Entry Dimensions"**
- Handled the development fee tax in the automotive sector, as this tax is a fixed number per chassis and has an effect on the value-added tax
- Added the following improvements to the Customer Portal:
  - Added the company logo
  - Swapped the place of "Add User Request" with the place of "Welcome Message"
  - Changed the titles for the users
  - Added a shortcut for switching the interface language (Arabic, English)
- Added the button **"Link the Electronic Invoice ID to the Nama Invoice"** to the "Send Documents to the Tax Authority" document
- Added the fields (Customer Name - Total Invoice Value - Tax - Net) to the details of the "Send Documents to the Tax Authority" document
- **Send Documents to the Tax Authority document**: Allowed editing the fields (Notes, Attachments) after sending them
- Added the field **"Processed By"** to each of the following documents:
  - Fixed Asset Offer, Fixed Asset Purchase Order, Fixed Asset Purchase Request
  - Miscellaneous Invoice, Misc Purchase Order, Misc Purchase Request
  - Misc Contracting Order
- Added the action **`CancelActivated`** to the More menu on both document books and document term configs

### Project Management (ECPA)
- **Project Invoices**: Added the **"Instalments"** window to the Project Invoices

### Point of Sale
- Improved so that a POS line can hold a list containing the options (Main Item Not Issued - Issued Raw Material - Normal), this being the issuing method from the warehouse

## Fixes

### Inventory
- When creating a Loading document for an invoice containing a free item, the free item does not appear when selecting the document in "Based On". This issue was fixed by adding the option "Do Not Update Prices After Based On"
- **Assembly document**: When creating an Assembly document based on an Assembly Request and editing the quantity or any data on the supplied items line, it splits the items out onto the ones existing in the drawn items

### Purchasing
- On the Finished Product Pricing document, when adding the assembly method on the line, the error **"The Operation Could Not Be Performed"** appears
- An error sometimes occurs when selecting the document's term config on the Purchase Invoice

### Sales
- **Lot Grouping** does not work well: when clicking Group Lots without a prompt, a prompt appears anyway; the lots are grouped but the production and validity dates are not copied
- Also, when double-clicking the lot number, the production and validity dates appear in an incorrect format

### Accounting
- When the option **"Consider the Lines' Amount When Grouping Invoices"** is not checked in the Disbursement document's term config, the system accepts saving the document even though the values in the invoices table are greater than the corresponding values in the Disbursement Voucher's lines
- **Credit and Debit Notes**: When grouping invoices or using "Based On" to fetch values from the Misc Invoice or the Project Invoice, the system does not insert correct values when the option (do not calculate Tax 1 or 2, 3, 4) is enabled

### Service Center
- **Yacht Booking Invoice**: The system does not post the system journal entry unless the **`Regenerate Accounting Effects`** action is performed

### Banks
- When creating a Partial Settlement voucher, it mistakenly affects the financial paper on the partially settled value field when a currency other than the one on the paper is used
- The correct behaviour is that it should be affected according to the paper's currency, not the settlement document's currency

### Contracting
- **Subcontractor Extract**: When adding a manual condition on the extract that does not exist on the contract and has no condition voucher, the system calculates the value of the "Previous Value" field incorrectly
- **Project Contract**: The system does not roll the sub-items up into the main item on the "Actual Cost" field

### Hospital Management System
- **Medical Sector Invoices**: The system allows adding a negative value in the unit price

### Human Resources
- The error message **"The Operation Cannot Be Performed"** appears when saving an Advance Rescheduling voucher

### Manufacturing
- **Production Order**: When selecting a batch number, the active and inactive percentages do not appear automatically when the batch is selected

### Real Estate
- **Subcontractor Extract - Additions and Deductions**: If the condition is mentioned in the contract and has no advance payment voucher for it, the system does not calculate the "Value Before Tax" field correctly
- When creating a rental contract for an aggregated unit containing more than one unit, the units' status is not changed to rented
- **Exemption Document**: Changed the translation of the field "Value After Tax" to **"Exemption Value"**
- **Collect Document**: Changed the field "Value After Tax" to **"Collected Value"**

### Settings
- **Approval Definition**: When using the other-substitutes field, having specified a responsibility and a job grade and linked them to a particular employee, the approval is not sent to that employee
- An error occurs in the electronic signature when sending invoices with a **1%** withholding tax
- When creating a file export/import list for a file that has a **Reference** to a document containing lines, the lines cannot be exported
- Sometimes, when the option **"Use the Real Next Number for Drafts"** is enabled on document books, errors occur in document numbering
- The system does not allow sending a Sales Invoice electronically via "Send Documents to the Tax Authority" when this invoice was created based on a Sales Order
- **Tolerance Percentage for Skipping Quantity Tracking**, found in the term config, does not work. It has been fixed

### Human Resources
- Sometimes, when creating an End of Service voucher for an employee, a message appears that the employee is not entitled to a casual leave balance after **6 periods** have passed since they started work, even though the employee has not taken any casual leave
- Sometimes, when creating a leave voucher for an employee, an error message appears saying that a Return to Work must be created after the previous leave voucher, because the leave in it affects another leave balance
- Sometimes, when creating a leave voucher for an employee, an error message appears saying that the employee has leave on the same day, due to an overlap with a Leave Allowance Disbursement voucher
- Added the option **"Use Working Months Before Leave Entitlement for Verification Only"** to the leave type

### Fixed Assets
- When creating a Delivery/Receipt of Assets and Custodies document, the assets file and the employee files are not affected correctly
- When creating a Fixed Asset Purchase Voucher while there is a withholding and an additional tax, it is deducted from the asset's value despite the option "Prevent Adding Withholding and Additional Tax" being enabled
- When entering a discount on the spare parts lines and the returned spare parts lines on the Maintenance Order screen **MnOrder**, an **action Post** is not performed on the total of both the spare parts and the spare parts returns

### Reports
- The report for items' reorder level has an issue linking with the **`ItemDimensionsDetail`** table. The issue has been fixed

### New GUI
- When searching in the subsidiary field **"subsidiary.lines"**, some windows - namely (Journal Entry voucher, Disbursement Voucher, Receipt Voucher) - do not work correctly
- When using the new GUI from mobile with sales and purchase invoices and orders, the system does not show the search lens and items cannot be selected or added
