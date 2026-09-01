# Nama ERP Release Notes - May 2024

::: info Release Information
- **Release Date**: May 2024
- **Release Number**: Nama-ERP-202405
:::

## Additions

### Inventory

- In the Supply Chain settings, added the option "Update Price Lists from the Item Regardless of Whether There Is a Change".
- Added the field for the item code (itemCode) to the (ItemDimensionsDetail) grid.
- Added the Second Unit to the header of both the Assembly Request and the Assembly Document.

### Sales

- In both the Sales Quotation and the Sales Order, added the "Apply Offers" button to the More menu.
- In Sales Quotations, added the "Apply Offers" button to the More menu.
- Added a new action to the More menu named "Group Without Dates".

### Purchasing

- Added the button "Create Payment Voucher for Selected Lines" in the Payments page of the Purchase Invoice screen. This button creates payment vouchers for the selected payments, the same way as in the Sales Invoice screen.

### Contracting

- Added "Analysis Card", "5 Ref", "5 Number" and "5 Text" on the line in the Contracting Contract Template screen.
- In each of the documents "Contracting Supplies Purchase Request", "Contracting Supplies Purchase Order" and "Contracting Supplies Purchase Invoice", added the following:
  - Added the Quantity Tracking mechanism, similar to what is available in the Supply Chain system.
  - Added the ability to fill in the Quantity Tracking fields for documents that were previously re-saved (with Recommit).
- In the Extracts, added 5 (Net) fields for each stage in the stage items grid.
- In the lines of both the Subcontractor Extract and the Project Extract, added the following fields:
  - Net in Previous Extracts
  - Due Value in Previous Extracts

### Point of Sale

- Added the shortcut key (ALT+F10) for discounting lines, also available from the Invoice Actions menu.
- Added the option "Consider Maximum Discount from the Discount Applier" in the POS settings.
- Prevented deleting a category, item, or item department that exists in the Favorites, whether at the machine or in the settings.
- Added a Payment Terminal file inside the POS Machine. When a value is selected in it, a "pgw" button appears next to the Confirm button on the Multiple Payment screen.
- The quantities of items in pending invoices are now taken into account in the message shown when an item is unavailable, so the message shows the missing item's quantity - if any - in the pending invoices.

### Accounting

- In the Receipt Voucher term config, added the following subsidiary types to the existing ones:
  - Owner
  - Buyer
  - Subcontractor
  - Real Estate Broker
- No accounting entry was created when the term config data was filled with accounts inside the MiscPurchaseOrder document. Creating the entries has now been enabled.
- In the Budget lines, added the two fields "From Date" and "To Date".

### Customer Relationship Management (CRM)

- In the CRM settings, added the option "Do Not Filter the Machine by Customer".
- In the Maintenance Contract, added a new page named "Payment", containing (the Payment Form - the Payments grid - the Create Payments button - the Create Receipt Voucher for Selected Payments button).

### Real Estate

- Added the accounting effects for generating a journal entry in the term config of the Real Estate Reservation Cancellation document.
- In the Rent Contract term config - Tax Policy grid, added the field "Unit Model".

### Human Resources

- In the calculation formula for the Tax salary component, improved so that the tax value enters its own calculation base — so that if the employee's salary is Net, the tax base includes the tax value alongside the net value.
- To prevent employees who already have a salary record for the same period from appearing, added the option "Do Not Group Employees Who Have a Salary Record for the Same Period" in the HR settings.

### Settings

- Added support for sending the Equipment Rental Invoice document - MachineRentInvoice - to the tax authority.
- In the (Send Documents to the Tax Authority) document, added grouping options to be as follows:
  - Grouping from document type to document type: the user selects only a document type, and it groups all documents of that type.
  - Grouping from book to book, linked to the grouping from document type to document type: when a document type is selected, only the books of that type appear for selection.
  - Grouping from term config to term config, linked to the grouping from document type to document type: when a document type is selected, only the term configs of that type appear for selection.
  - Grouping from branch to branch
  - Grouping from sector to sector
  - Grouping from analysis group to analysis group
  - Grouping from department to department
  - Grouping by record
- Added support for the Jordan e-invoice (JoFotara).
- Added an OTP code on the approval steps, with the ability to have an OTP code for each approval step, keeping it in the document's approvals table.
- Added Tax Code Sources in the Tax Authority settings.
- In the header of the "Send Documents to the Tax Authority" document, improved so that invoices are grouped based on the Tax Settings field in the document header, matched against the tax settings in either the book or the term config.
- Created a window named "Incoming E-Invoices".
- Added the button "Import E-Invoices from the Tax Authority" to the screen's More menu, to import invoices.
- In the WhatsApp Message screen, added a new page named Rasayel, and added the fields "template id" and "channel id".
- Added the option "Prevent the User from Running the Same Report Twice at the Same Time", available in the Global Config, to each of:
  - the User window
  - the Permission File window
- Translated the error message "Update approval can not be used with documents" into Arabic (the error message for using approval with a document under edit), adding to it (used with files only); the same was done for deletion.

### Manufacturing

- Added a new option in the Raw Material Issue term config named "Copy the Remaining Quantity and Consider What Was Previously Issued".

### Mobile Applications

- In the Consolidated App settings, added a grid named "Allowed Values for Text Fields in the Mobile App Screens".
- Added the Dimensions to the Sales Order screen in the Consolidated App. They are added by editing the app screen.
- Added the following fields to the Leave document, in the app and in Nama:
  - Balance Consumed During the Year
  - Balance Due During the Year
  - Balance Remaining During the Year
- In the Captain Order app, in the screen that shows all orders, added some changes to make it easier to identify orders, by adding the order type (invoice classification), whether Dine in or takeaway; if the order is Dine in, a table number is assigned to it, and if it is takeaway, a car number is assigned to it.
- Added a document named "Sale Document" that works with sales documents such as the Sales Invoice and the Sales Order.
- In the Captain Order app, enabled additional codes to allow searching by car number, and for when no customer exists with that number.
- Improved so that if the search is done with an unregistered mobile number, an Add Customer form opens automatically, and the searched mobile number is copied into the customer code and the mobile number.
- In the Mobile Applications settings, improved the grid "Home Screen Bar Items Display Settings" so that the record type "Sale Document" is shown, since it exists in the "Record Type in the App" field but was not appearing in the items.

### Reports

- Added an option in the Report named "Allow Running the Report Without Login".
- In the invoice generation mechanism, in the CrossTab, added the following improvements:
  - Showed the report's remaining Bands alongside the crosstab.
  - Added the ability to select row and column fields through parameters.
