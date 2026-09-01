
::: info Release Information
**Release Date:** June 2019  
**Release Number:** 2019.06
:::

# Nama ERP Release Notes - June 2019

## **Additions**

### **Inventory**
- Coding more than one item for the same Item Addition Request is no longer allowed; a system field was also added holding the code of the item that was coded based on this request
- Improved so a request and a voucher for an inventory transfer can be made from one section to another within the same warehouse
- Added the option `Show the effect only on the cost of the assembled item` to the Supply Chain Management settings
- Added the field `Effect only on the cost of the assembled item` to the lines of the items pulled into the **Assembly Voucher**, to specify particular components for entry into the assembly of particular items
- In the **Assembly Machine** file, added the following:
  - A new sub-screen called "Raw Materials", holding the same "Raw Materials" lines as the "Processing Voucher" document, so the lines are entered automatically when the machine is selected inside the Processing Voucher
  - A new sub-screen called "Outputs", holding the same "Outputs" lines as the "Processing Voucher" document, so the lines are entered automatically when the machine is selected inside the Processing Voucher
- **Processing Voucher - document term config**: Added the option `Do not copy the details`, so that details are not entered after selecting a document in the "Based On" field — exactly like the Sales and Inventory documents

### **Sales**
- Added the field `Custom Price` to both the Sales Price List details and the Item Price details
- **Sales Invoice - Payments page**: Added a payment start date inside the Payments button, to be able to specify the desired day for the payment to start
- Improved so that when issuing a Sales Invoice based on a Quotation, the system copies the standard clauses from the Quotation along with the copied data

### **Service Center**
- **Maintenance Order**: Built a filter for machines so that only the machines belonging to the selected customer and contact on the Maintenance Order's header are retrieved
- Added 5 price dimensions to Maintenance Orders, because the customer uses price dimensions but they were not shown on the screen

### **Customer Relationship Management (CRM)**
- Added the alternate code to the Machine window

### **Real Estate**
- **Tenant Owner file**: Added extra description fields, namely Description 6 through 10, to add more customer-specific data for customers who have real estate investment and contracting
- **Tenant Owner file**: Added the Tax Number and added the Commercial Registration Number, as already exist in the Customer file and the Vendor file
- Added a **Tax Policy** to the Expense Type
- Improved so that, when creating Collection Vouchers from inside the contract, the line in the Collection Voucher is filled with Tax Percentage 1 and Tax Percentage 2 from the Tax Policy on the Expense Type if one exists; the Expense Type on the line in the Collection Voucher is also filled in

### **Contracting**
- Added the option `Do not include lines that have no current quantity` to the Contracting settings
- Added the field `Quantity from the Cost Execution` to the Project Contract details

### **Human Resources**
- Added a new voucher named **Departure Permission Request**
- **Human Resources settings**: Added the following lists:
  - Treatment of non-working days for the last Salary Voucher
  - Basis of non-working days for the last Salary Voucher
  - Treatment of unpaid leave days for the last Salary Voucher
  - Basis of unpaid leave days for the last Salary Voucher
- **Salary Voucher - Statistics page**: Added the two display lists "Electronic Attendance" and "Electronic Attendance by Period"
- Added 5 attachments to each of (**Salary Hold Voucher**, **Salary Hold Cancellation Voucher**)

### **Point of Sale**
- Added a column for the time an error occurred, on the data-transfer errors page in the Machines window
- Added the shortcut "Sales (New)" to the Point of Sale shortcut keys list, to be able to handle the Sales Invoice differently
- Added five fields to the favorite-fields table on the existing Machine file (Level 1 through Level 5), where a level can be an item section, item category, or item classification. For example: setting Level 1 to (section - Perfumes), then Level 2 to Classification 1, then Level 3 to Classification 4 — the favorite items start with the (Perfumes) button, and pressing it opens all Classification-1 items under the Perfumes section; pressing any of the shown Classification-1 items opens all Classification-4 items under that Classification 1, down to the items under the last level defined
- Added the table (Filter Dimensions on Send) to the Point of Sale settings

### **Accounting**
- Added **Instalment Settlement Vouchers** to the More menu on documents that have instalments, such as "Sales Invoices", "Custody Purchases", "Project Contracts", and "Raw Material Issues", to show the instalments belonging to the document that have been settled by settlement vouchers
- Added the option `Disbursed once regardless of the value` to each of (**Receipt Request**, **Consolidated Receipt Request**, **Disbursement Request**, **Consolidated Disbursement Request**)

### **Reports**
- Added a new function in the reports that handles price retrieval faster. It can be called as in the following example:
  ```
  NamaRep.getPricesForCustomer($P{REPORT_PARAMETERS_MAP},$F{Itemid},null, null,1, null, $F{date},"001", "2", null,null, null, null, $F{color}, $F{size})
  ```

### **Settings**
- Improved the pinning of the company name in Global Config, so the company name no longer appears in the browser tab, where the name of the open screen used to appear after the company name
- Changed the entity flow `com.namasoft.importer.SQLDraftImporterFromDifferentDataSource`, which reads from another database, to read each document independently, so it is read and its `Update` performed separately from the other documents being read alongside it
- Added an option to the approval/rejection return link sent by email, which opens a field to enter remarks, and those remarks are sent back to the system to raise an alert with them

### **General Improvements**
- Added `Date End Rent` to the NLM application, so that saving any voucher is blocked once the customer passes the specified date, in order to automatically manage trial periods for the system
- Improved the Supply Chain Management (`Chain Supply`) documents so that, when searching for the unit, the system also shows the unit's conversion factor alongside the unit

## **Fixes**

### **Inventory**
- **Vendor window - Details page**: The English translation of the field "Replacement Period" was swapped with the field "Return Period"

### **Sales**
- **Sales Offers - Invoice Offers**: Fixed an issue where creating discount vouchers on the invoice value added 30 days to the selected voucher duration
- **Sales Invoice - Payments page**: Fixed an issue where, when clicking the Payments button and setting the grace period to the period in which payment should start, and setting the payment duration to 1 month, the payments were generated, but their dates were not correct — they should fall on day 1 of each month, while the system calculated only 30 days even if the month had 31 days
- Fixed an issue where, when using automatic issuance of purchase vouchers with the invoice, together with duplication locations, the invoice number did not show on the voucher
- Fixed an issue where, with quantity tracking on a Sales Order, defining a specific unit for an item on the Sales Order and then issuing that item in a different unit through an Issue voucher based on the Sales Order, showed an incorrect remaining quantity on the Sales Order, because it did not take unit differences into account
- **Sales Return document**: Fixed an issue where, when consolidating the inventory vouchers, the document did not save and showed the error "the operation could not be completed"; it only saved when the inventory voucher was chosen in Based On

### **Purchasing**
- Fixed an issue where an error appeared when saving a Purchase Order with instalments selected

### **Accounting**
- **Receipt Voucher - Payments page**: Fixed an issue where, when adding a line with a Sales Invoice (partially settled in a previous Receipt Voucher), the instalment code did not show, so the system did not accept settlement on that invoice
- Fixed an issue where trying to delete a Consolidated Disbursement Request showed the error "the operation could not be completed"
- **Receipt or Disbursement Voucher**: Fixed an issue where setting a value in the document header in a foreign currency, then changing that value on the lines in the local currency to enter another line, did not account for the conversion factor between the currencies
- **Receipt or Disbursement Voucher**: Fixed an issue where, when linking an account bag to an employee's subsidiary and then selecting that employee in the document details, searching for the account showed the account codes instead of their names

### **Settings**
- Fixed an issue where running a scheduled task of type Report and choosing a text file as the attachment format showed the error "the operation could not be completed"
- Fixed an issue where printing documents sometimes showed a log "the operation could not be completed", with the log attached
- Fixed an issue where, with the option "Allow using unlimited allowed books in the term config" enabled, selecting one of these books on documents and then searching for a term config did not show term configs that were not linked to it

### **Contracting**
- **Contracting Cost Execution document**: Fixed an issue where the "Cost from Contractors" field was not included in the total cost — in other words, the system ignored the field and did not add it to the total cost
- **Contracting Cost Execution document**: Fixed an issue where the value of the "Cost from Contractors" field comes from a Subcontractor Extract, but when there was no Analysis Card on the subcontractor contract and the Subcontractor Extract, the value in the "Cost from Contractors" field was zero, which was wrong; when the Analysis Card existed on the subcontractor contract and the Subcontractor Extract, the value in the field was the Subcontractor Extract's value, which was correct
- Fixed an issue where, in some cases, selecting the Analysis Item code on a Subcontractor Extract and saving deleted the Analysis Item code
- **Contracting Cost Execution**: Fixed an issue where the "Cost from Issue" field was only filled when an Analysis Card existed on the Contracting Raw Material Issue document; when there was no Analysis Card on the Contracting Raw Material Issue, the cost from issue was not entered on the Contracting Cost Execution document
- **Contracting Raw Material Issue document**: Fixed an issue where an error appeared when selecting the Analysis Item code
- **Cost Execution document**: Fixed an issue where creating a new Cost Execution for the same project did not show the previous quantity
- Fixed an issue where creating an Execution document made up of 2 lines and sending it for approval, then approving one line and rejecting the other, allowed editing of the entire document; the correct behavior, when one line is approved and one is rejected, is to allow editing only on the rejected line, not the whole document

### **Fixed Assets**
- **Fixed Asset Purchase Document**: Fixed an issue where the tax was calculated on save rather than when the value changed — for example, entering the price calculated the tax on it, but adding a discount or changing the price did not update the tax until save, and some customers ran into a problem where, while entering the voucher, they saw the tax as wrong and did not complete the operation, even though it was corrected automatically on save

### **Human Resources**
- Fixed an issue where, with a draft data-update voucher existing for an employee, saving that employee's Job Offer showed the error "the operation could not be completed"
- Fixed an issue displaying shared custodies on the Employee screen
- Fixed an issue that sometimes occurred when saving an Employee Provisions Opening document
- **Provisions Recalculation Voucher**: Fixed an issue where the current day's value was computed as = the basic salary value from the last Salary Voucher / the number of days in the year for end of service
- **Employee Provisions Recalculation Voucher**: Fixed an issue where using "Recalculate Document" did not recalculate the per-day component value

### **Service Center**
- **Meter Reading Record**: Fixed an issue where, when adding a meter on the line, the previous reading date and previous reading appeared, but entering the current reading and saving made the previous reading date and previous reading disappear, leaving only the current reading
- Fixed an issue where, in some cases, issuing an invoice based on a Sales Order and then consolidating the issue voucher showed an error message related to machines. This error is related to the entity flow made for the customer "البسيوني"

### **Manufacturing**
- Fixed an issue where setting one of the operations to run in parallel, then selecting operations on a Production Order, did not copy the "runs in parallel" setting

### **New GUI**
- Fixed an issue where, on a list view with "Show All" selected, the number in the # column was replaced with `NaN`, though it worked with the other choices
- Fixed an issue where, in some cases, opening one of the CRM links showed the error "the operation could not be completed"
- Fixed an issue where the "Show List" button, on the entry screen, appeared between the two Save buttons, which sometimes caused user error; it should be returned to its place, as in the Old GUI, to reduce user error

### **Mobile Applications**
- Fixed an issue where the app accepted storing a Receipt Voucher even though it was not yet complete

### **General Fixes**
- Fixed an issue where the system allowed cancelling a system document through the "Document Cancel Document"
