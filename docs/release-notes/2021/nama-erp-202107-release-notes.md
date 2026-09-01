# Nama ERP Release Notes - July 2021

::: info Release Information
**Release Date:** July 2021  
**Release Number:** 2021.07  
**File Size:** 183.2KB  
:::

## Additions

### Inventory

- Added the option **"Allow Creating a Closing Entry When Warehouse Balances Are Negative"** to Distribution Management (Supply Chain) settings.

- Added the option **"Allow Creating a Closing Entry If There Are Non-Depreciated Assets"** to Assets settings.

- Added the following two options to Distribution Management (Supply Chain) settings:
  - Maximum Number of Days to Prevent Saving Inventory Documents
  - Maximum Number of Documents Whose Costs Have Not Been Processed, to Prevent Saving Documents

- **Item Assembly Methods file:** Added 3 fields, namely (Version Name - Size Name - Color Name), so that when a version, color or size is selected, the name is recorded in the document header after saving; the fields were also added to the lines in the same way.

- **Assembly Voucher:** Added 3 fields (Version Name - Color Name - Size Name); when a version, color or size is selected, the name is automatically recorded in the document header on save, and when an assembly method is added on the file, the data is filled in from the Assembly Method file. The same three fields were also added, in the same way, to the lines of the drawn items and the supplied items, so that if a version is selected on the line the version name is automatically filled in, and likewise for the color and the size.

  Version Name, Color Name and Size Name are each activated through the options **"Add Color Name"**, **"Add Size Name"**, and **"Add Version Name"** on the Costs / Second Unit / Dimensions page of the supply chain configuration.

- Added two fields to the Stock Transfer Voucher, namely **"To Production Date"** and **"To Expiry Date"**, which depend on the option **"Show 'To' Item Dimensions in the Transfer and Use Them"** found in the supply chain settings.

- Added a field on the Assembly operation lines named **"Copy the Item to the 'Restrict Distribution to Item' Field on the Supplied Item"**, which is activated when the line-item account is selected from the supplied items.

- Added a field named **"Restrict Distribution to Item"** to the item lines of both the Assembly Voucher and the Additional Costs Voucher.

### Sales

- Added the option **"The Invoice Quantity Must Match the Linked Inventory Documents"** to the term config of each of the following documents:
  - Sales Invoice
  - Purchase Invoice
  - Sales Return
  - Purchase Return

- Added the option **"Prevent Saving If the Replaced Item Does Not Exist in the Based-On Document"** to the term config of both the Replacement Request and the Replacement Voucher.

### Accounting

- **Payment Voucher:** Improved so that when the subsidiary (a bank account) is selected and the Financial Papers Book is selected, the system shows only the Financial Papers Books for that same bank account.

- Added the **"Cost Distribution"** grid to both the Disbursement Request and the Receipt Request.

- Added the option **"The Line Value Must Be Distributed in Costs"** to the lines of each of the following documents:
  - Disbursement Request
  - Payment Voucher
  - Receipt Request
  - Receipt Voucher

- **Cost Distribution Grid on Receipt and Payment Vouchers:** Improved so that when the project contract is selected, only the Term Analysis Card for that contract is shown, along with the term codes found on the card for that same contract.

- Added both **"Register"** and **"Reference 3"** to the details of the Disbursement Request.

### Service Center

- Created a customer-service app with a Queue system that works on mobile and desktop, so that customers requesting service are served in order of request seniority.

- Added 5 `ref` fields to the details of the Job Order screen.

- **Task screen:** Added two fields to the raw-materials lines, namely (Brand and Model), on the line, so that the raw materials can be specified for each model and brand.

- **Spare Parts Issue Voucher, Spare Parts Issue Request:** Improved data entry so that as soon as one of the tasks is entered in the document details, the system inserts all the raw materials defined for that task.

- **Rental Assets:** Prevented creating more than one Reservation Cancellation document for the same document, whether a Reservation Invoice or a Reservation Request.

- **Rental Assets:** Added a system field named Cancellation Document to both the (Rental Reservation Request / Rental Reservation Invoice).

- **Sub Sales Order:** Added the following sections to the Sub Sales Order screen:
  - Payment Methods
  - Payment Details
  - Payment Vouchers
  - A group for the totals, cash paid, remaining amount, etc.

### Real Estate

- Added the following options to the Real Estate Investment Unit screen:
  - Not Available for Rent
  - Not Available for Sale

### Human Resources

- **Bulk End-of-Service Request Voucher:** Added attachments to both the document header and its details.

### Hospital Management System

- Added the field **"Subsidiary"** to the invoice header and to the lines of both the Costs List and the Discounts List.

- Added the following two fields to the invoices and to the lines of the Costs List:
  - Subsidiary Cost Percentage
  - Subsidiary Cost Value

- Added the following two fields to the invoices term config:
  - Subsidiary Cost Debit
  - Subsidiary Cost Credit

- Added an "Update Details from Header" button to each of:
  - Price Lists
  - Discounts Lists
  - Costs Lists

- Added the field **"Procedure Classification"** to the Medical Price List - Surgical Operations page.

- Added the option **"Calculate Entry and Exit Time Based on the First Entry Time During the Stay"** to Hospitals settings.

### Contracting

- Added 3 attachments to the Contracting Project screen.

- Added the field **"Quantity | Contracted"** to the lines of the Term Analysis Card screen.

- **Penalty Voucher:** Added the option **"Calculate the Accounting Effect from the Clause"** to the term config of the "Project Contract Penalty" document.

- Added the option **"Do Not Exceed the Quantity"** to the Contracting Purchase Order term config.

- **Term Analysis Card screen:** Allowed inserting the item directly on the Term Analysis Card instead of defining a raw material for this item and then inserting it afterward on the Term Analysis Card.

### Customer Relationship Management (CRM)

- **Call screen:** Improved the **"Phone Number"** field by adding a call icon and a WhatsApp icon to it.

- Added accounts and five attachments inside the Mediator screen.

### Settings

- Added 5 fields on the lines in the Detailed Remark screen.

- Added the following two fields, specific to the e-Invoice, to the Tax Authority settings:
  - Maximum Number of Days to Send the Invoice
  - Maximum Number of Days to Cancel the Invoice

- Added the ability to send the **"Project Invoice"** document to the Tax Authority.

- Activated notifications from the tax authority (Document Validity - Document Acceptance - Document Rejection - Document Cancellation).

- **Custom List View screen:** Added the field **"Edit Screen Identifier"** to the "Add as a Block To" table.

- **Files Export / Import Menu:** Added a new page named **"User Report"**.

- In external report-run links, added a method that allows the error message to be shown in JSON format.

- Improved the Nama license verification mechanism for cases where the license server is unavailable.

### New GUI

- Modified the Calendar used in the New GUI so that the day starts at 12:00 AM, like the old GUI, instead of at 7:00 AM.

## Fixes

### Inventory

- Fixed an issue where Stock Transfer Vouchers could cause an error in inventory cost when relying on the **"First In First Out (FIFO)"** costing method.

- Fixed cost-related issues in both **"Receiving a Sales Return"** and **"Issuing Sales Invoices"**.

- **Assembly Voucher:** Fixed an issue where, when more than one packaging method was added for the supplied items, the system distributed the packaging cost of each method across all the drawn items instead of across the drawn items for each method separately.

- Fixed an issue where an error appeared when saving an Additional Receiving Costs Voucher linked to more than one Purchase Invoice.

- Fixed an issue where, when selecting an item on the lines of the Inventory Receiving Inspection document, the item name did not appear, so the document could not be saved and the message "Details cannot be left empty" appeared.

- Fixed an issue where, with the option **"The Invoice Quantity Must Match the Linked Inventory Documents"** enabled and the invoice having free items, an error occurred on save even though the item quantities on the invoice equaled the quantities on the Issue Vouchers.

### Purchasing

- Fixed an issue where an error sometimes occurred when issuing a Purchase Invoice with more than one Receiving Voucher.

### Sales

- Fixed an issue where an error sometimes occurred when issuing a Sales Invoice with more than one Issue Voucher.

- Fixed an issue where creating a Sales Invoice with the option (Expand Assembled Item Components on Save) worked correctly, but when a Sales Return was created for this invoice, the system received both the assembled item and its components in the receiving costs of the inventory receipt.

- Fixed an issue where an error sometimes appeared when saving a Sales Invoice.

### Banks

- Fixed an issue where the Bank Notice sometimes appeared twice in the Financial Paper's movements, and where deleting the Bank Notice and then trying to delete the Bank Deposit caused an error message to appear.

- **Financial Paper:** Fixed an issue where, after issuing a Financial Paper through a Payment Voucher and then creating a Bank Notice to collect it, the system correctly prevents creating a second collection Bank Notice — but if the Payment Voucher's date is later changed to after the date of the first collection Bank Notice, the system then accepts creating a second collection Bank Notice, so the paper ends up being collected twice by mistake.

### Human Resources

- Fixed an issue where the entity flow `EAEmpAttendanceSysEntryCalculator` failed when there was an employee with no attendance plan, even if that employee had resigned or been terminated; its behavior was adjusted to match the behavior of the Payroll Voucher in this regard.

- Fixed an issue where, after creating a Job Offer following an End-of-Service Voucher — whether it was a rehire or not — the system did not delete the data from the (Service End Date) field on the Employee file.

### Contracting

- **Contracting Purchase Order:** Fixed an issue where an error appeared when saving the document, after creating a Purchase Order based on a Contracting Assay and selecting the Term code on the line.

- **Contracting Purchase Order:** Fixed an issue where, when the Term was selected, the system did not pull in the quantity and price from the Term Analysis Card.

### Real Estate

- Fixed an issue where, after creating a Sale Contract for a Real Estate Investment Unit or creating a Real Estate Investment Reservation document, the Real Estate Investment Unit did not appear again in the Sale Price Quotation.

### Settings

- Fixed an issue where, clicking the button to create a voucher from another voucher using Creator, after the new voucher opened and data was entered, the system reverted to the old voucher.

- Fixed an issue where, when using a reports server, the user sometimes had to use the tasks monitor to kill a report, and it did not work.

- Fixed an issue where, when updating the release, the system downloaded a file specific to the POS release, but this file caused the release download to be slow for some customers; this was fixed by delaying the download of this file until after the release is downloaded and run.

- Fixed an issue where, when exporting to Excel, particularly for files where the code is duplicated, the system exported a single code instead of exporting a separate code for each company.

### Fixed Assets

- **Asset Price Quotation:** Fixed an issue where, when adding an Asset Price Quotation based on an Asset Purchase Request, the system deleted the prices on save.

- **Asset Purchase Order:** Fixed an issue where, when adding an Asset Purchase Order based on an Asset Price Quotation, the system did not carry over all the data found in the quotation.

### Service Center

- Fixed an issue where, when creating Sales Invoices and adding an item on the line:
  - If the item is a service item, selecting the warehouse and location on the line showed the error message **"Cannot Execute the Operation"**.
  - If the item is an inventory item, clicking the warehouse and location field on the line did not let the system select the warehouse directly, and only allowed selecting it through the lookup.

### Mobile Applications

- Fixed an issue where, in the ESS Nama app, when displaying a chart of type `ColumnWithRotatedLables`, the values for each variable were not shown.

- Fixed an issue where, in charts of type `Chart Pie D3` or `Chart Pie`, the colors in the chart legend were shown differently from the colors in the chart itself, some variable values were not shown, and it was difficult to tell which value belonged to which element.

### New GUI

- Fixed an issue where, opening the search in the item field on the lines of a Sales or Purchase Invoice, selecting more than one item, and clicking OK, Insert, or Insert at End, did not insert the selected items.

- Fixed an issue where, when printing a Journal Voucher with the system form (001ACC-SYSF) in the New GUI, the print count shown at the top of the form did not correctly reflect the number of times printed.

- **Rental Reservation Request:** Fixed an issue where, when creating a new reservation from 10:00 PM to 2:00 AM, the (To Date) field did not change to the next day's date.

- Fixed an issue where selecting Export Selected Records or Export All Records from the More menu showed a dialog containing several fields, including the field **"Select Field List"**. In the old GUI, this field suggests field names, i.e., autocompletes the name whether in Arabic or English, but the New GUI does not support this feature.

- Fixed an issue where, clicking on the results columns, the words "Visible Columns" and "Hidden Columns" appeared on the same side; the formatting was redone.

- Fixed an issue where, with a large number of visible columns, trying to change their order caused the system to become very slow.

- Fixed an issue where, in the New GUI, on any document, clicking "View Permissions" from within the More menu showed an empty result, even though the document has view and edit permissions linked to it.

- Fixed an issue where, for a report that has no language set on it, the report direction was Arabic regardless of whether the user interface language was Arabic or English.

---

::: info Summary of Key Improvements

**Among the most important of these improvements in this release:**

1. Added the **"Cost Distribution"** grid to both the Disbursement Request and the Receipt Request.
2. Created a customer-service app with a Queue system that works on mobile and desktop, so that customers requesting service are served in order of request seniority.
3. Added a new page named **"User Report"** to the **"Files Export / Import Menu"**.
4. Improved the Nama license verification mechanism for cases where the license server is unavailable.

:::

**We ask God to grant us and you success and guidance.**

**Official Website:** [https://www.namasoft.com/release-item/July-2021-release/](https://www.namasoft.com/release-item/July-2021-release/)

---

**Namasoft - Cairo**
