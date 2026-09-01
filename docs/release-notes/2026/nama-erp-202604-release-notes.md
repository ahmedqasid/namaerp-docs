# Nama ERP Release Notes - April 2026

::: info Release Information
- **Release Date**: April 2026
- **Release Number**: Nama-ERP-202604
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the following two options:
  - Enable checking the reservation quantity by date for warehouses
  - Enable checking the reservation quantity by date for locations

  For more details, please refer to the following document:

  [https://docs.namasoft.com/modules/supplychain/ignore-reservation-qty-check-by-date.html](https://docs.namasoft.com/modules/supplychain/ignore-reservation-qty-check-by-date.html)

- Added an option named "Do Not Send the Next Save to Point of Sale" in the Item file.
- Created a new file in the Sales files named "Monthly Sales Offers".
- Added the option "Do Not Verify Quantities with Documents Created from the Stock-Taking Voucher (may lead to an overdraft)" in the Supply Chain settings.

### Real Estate

- In the Real Estate Investment Sales Contract (RESalesDoc), under Terms & Expenses, in Commissions, fields were added (5n + 3ref + 3 text - 3 date).

### Customer Relationship Management (CRM)

- Added 4 attachments to the CRMVisit, CRMVisitRequest screens
- In the Maintenance Invoice document's term config, added (Default Price in Price List), similar to what exists in the Sales Invoice document's term config, to control the price listed on the Maintenance Invoice from the price list.
- Added a new group specifically for Shipping Address in the Maintenance Order and Maintenance Invoice screens (MnOrder, MnInvoice)

### Purchasing

- In the Purchase Return Request lines, 7 N fields were added in addition to the 3 fields currently existing.
- Added a field in the header of the Purchase Price Comparison screen named "Request for Quotation" and a button named "Aggregate Documents Made Based on the Request", which spreads the lines of every quotation into the comparison lines.
- Added Purchase Order Field Map to the term config and ran it before saving Purchase Orders to fill in some mandatory fields.
- In the (PurchaseQuotation, PurchaseQuotationRequest) documents, added a status field, a status-change date field, and five Boolean fields

### Accounting

- Connected and activated the UAE E-Invoicing. Please refer to the following document:
  https://docs.namasoft.com/modules/invoicing/uae-orchida-einvoice-guide.html

### Human Resources

- Added an option in the Dues Liquidation document's term config named "Calculate the Liquidation Amount Value from the Actual Date Field".
- In the Job Offer, added (Contact Information) that exists in the Employee file, and copied it to the employee upon save.

### Point of Sale

- Added a list view for Reward Points Redemption and added a field "Total Remaining Points" from the Reward Points.
- Added a new option in the Point of Sale settings named "Prevent Closing the Shift When There Are Pending Invoices"; please enable this option and do not enable the old option "Prevent Closing When There Are Pending Documents", so that pending returns and exchanges, if any, are ignored.
- Added shortcut fields in the Payment Method file.
- Added the "Customer Service" button next to the Pending Invoices button, so that it only appears if the option to read online orders is enabled in the Machine file.
- Added "Number of Table Buttons per Row", "Table Button Height", and "Table Button Width" on the Home Page in the new Point of Sale Interface settings file.
- Added a field named "Pricing at the Item Classification Level" in the Supply Chain settings, through which any of the ten item classification types can be selected for use in pricing. After selecting an item classification type, please run regen ui util from the utils page to display a field named "Item Classification" on the Price List lines next to the item.
- In the Pending Invoices lines, added the fields "Invoice Classification", "Order Date / Time", and "Order Period".
- Changed the name "Table" (grid) to become "Table" (dining table) in the Home Page fields of the Point of Sale Interface settings.
- Improved so that when clicking the "Query Tables" button, the entire Tables list view is displayed on the page by default.
- Added the ability to move an item from one table to another, and the ability to split a table into two tables.
- Added the "Tables" button after the "Pending Invoices" button on the main screen, to open the Tables screen directly instead of adding it to the shortcuts.
- Added a new grid named "Filtered Pending Invoices Buttons" in the Point of Sale settings, containing the Arabic name of the button, the English name, and the condition on which invoices will be filtered.

### Sales

- Added an entity flow for when importing an Excel sheet from the Import Records document, which has a field copied from a document such as the Sales Order; it copies the line from the Sales Order, and it is not necessary to select an item during the import process.

### Settings

- Added the option "Enable Preventing a Document Based-On from Being Used When Saving a Draft" in Global Config, to achieve the required behavior.
- Enabled control over closing and opening fiscal periods through the FiscalYearStatusUpdate document, with the ability to specify the legal entity or the type of operations (such as Accounting or Inventory) to be closed or kept open.
- Added the ability to enable comparing two periods in a Dashboard, easily and quickly.
- In the column suggestions in the Dashboard interface, improved so that columns added through tempo are taken into account.
- The comparison Config column is now taken into account.
- Displayed the available fields in the wizard data source instead of the query, when it is used.
- Changed the new headquarters address and phone number for the Egypt branch in About the Program.

### Service Center

- Added 5 fields for date and time.

### Mobile Applications

- In the Nama Aggregator app - Delivery Documents to Be Delivered, added 2 attachments in addition to the existing attachment, and also added the ability to open the mobile camera as soon as the attachment is selected, via a pre-set option in the mobile settings.

### New GUI

- Added an option to control the display of the rows total.
- Added an option to control how cells are selected.
- Added a built-in analytical reporting system inside the program that removes the need to use external tools such as Power BI
- Added a sound for system notifications, so that the sound plays as soon as the notification reaches the user. This is enabled through the settings.
- Added control over the display method of list parameters (listDisplayType)
- Added the ability to easily change dimensions and measures, by the end user, in a Dashboard created with a Wizard Data Source.
- Added a new dashboard widget named "Enhanced Table" - through which simple graphics can be displayed - and cells can be colored based on conditions.
- Activated interactive filters with tables and metric cards.
- Added the ability to control the number format in metric cards.
- Added the ability to control the currency in metric cards.
- Improved dashboards built on the dashboard builder tool as a data source, to allow using the field as the Left Hand Side instead of manually specifying the column name.

### Reports

- Added the Unit (Smallest - Sale - Purchase) for the inputs in the report builder tool.
