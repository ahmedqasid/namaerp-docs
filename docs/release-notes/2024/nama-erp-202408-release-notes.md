# Nama ERP Release Notes - August 2024

::: info Release Information
- **Release Date**: August 2024
- **Release Number**: Nama-ERP-202408
:::

## Additions

### Inventory

- Added the ability to link Offers to customer categories.
- Added five extra attachments to the Quality Inspection document.
- Added a new document named "Update Item Data".
- In the lines of the Item Brand file, added 5 fields of types (Ref, Number, description).
- Added the option "Ignore quantity processing for serial numbers before a certain date" on the Supply Chain settings screen.
- Added the option "Ignore cost calculation for the item" on the item settings screen.
- In Item Class 1, added a (Details) grid containing 5 fields of types (N, Description, ref).
- On the End Stock Taking screen, added 5 attachments.
- Added a relations grid in Item Class 1, like the other classifications.

### Sales

- Added the following fields to the Offers, in the (Discounts on Invoice Value) grid:
  - (Item Count | Less Than)
  - (Item Count | Greater Than or Equal To)
  - (Item Count Calculation Method)
  - (Do Not Count Free Items)
- Added the option "Do not repeat items with the additional source" on the "Price List" screen, which prevents adding duplicate items when using the (Additional Source).
- In Sales Return - document term config, added an accounting effect for the rounding discount in the Sales Return term config.
- Created the entity flow EARecalcFreeLinesUnitPriceIfZero to suggest the free item's price from the price list when no price exists.

### Purchasing

- Added the option "Allow saving with items that have no price (while adhering to price lists)" in the Purchase Invoice term config.

### Letters of Credit

- Added a new document named "Preliminary Invoice for the Shipment".

### Human Resources

- On the Employee screen, added a composite field named (Entry Visa Number + Issue Date + Expiry Date).
- Added the same fields to the Update Employee Data screen, both single and bulk.

### Real Estate

- Added a new voucher named "Real Estate Addition Voucher".
- In the Real Estate Purchase Contract term config, added the field "Property Value Field".

### Banks

- Added (attachment1, attachment, attachment2, attachment3, attachment4) on the Letter of Guarantee Opening document screen.

### Customer Relationship Management (CRM)

- On the Invoice Receipt document, reapplied (item missing from the invoice) with saving: if the item is missing it is true, and if not it is false.
- On the Maintenance Contract, adjusted the total values in the voucher header and showed the fields "Total Paid" and "Total Remaining" in the totals grid on the Maintenance Contract screen.
- Added the name of the first release for development requests, to identify requests that were closed in a silent release.

### Accounting

- Added filtering (from payment date - to payment date) on the Create Payment Links document, along with correcting the formula in the field that groups installments with fewer than (days) remaining.
- Added the fields (Installment Schedule Template, Interest Schedule Template) for use in creating a template.

### Contracting

- On the Contracting Projects screen, added a statistics page containing the project contracts linked to this project.
- On the Cost Execution screen, added the fields remarks, text1, text2, n1, n2 to the (Manual Cost Vouchers) grid line, copied from the remarks field in the voucher header.
- Added the analytical group to the detail lines on the Sirky document. It is shown by customizing a screen.

### Settings

- Linked the Rent Accrual Journal Entry screen to the tax authority.
- Created the entity flow (EASortFields) to order the lines.
  Example: alphabetical ordering of items, or by price, or by a specific field within the document lines.
- Made the entity flow EAWordTemplate prevent editing of all resulting documents by default. To prevent this, there is an entry named Do Not Make Document Read Only - set it to true if you want to cancel the new behavior. Another entry was also added to control the name of the file produced through tempo.
- Added the modification date "Event Date" on the Detailed Document Edit Log screen.
- Added the option "With Printing" in alerts, used with printing.
- In the Scheduled Task - Parameters, added Remarks 1:3, with the ability to add these remarks in each of: the email subject template and the email template.

### Point of Sale

- On the settings screen, added the following changes:
  - When it appears for the first time, the Show IDs - Upgrade Release - Resend Docs - Memory Usage button is hidden
- When clicking OK, the system first makes sure of the following:
  - The database settings are correct and can be connected to
  - The server address is correct and can be connected to
  - The machine code exists on the Nama server and is active

  If errors are found, they are displayed, saving is refused, and the system returns to the settings screen again until the errors are fixed.

- Added a button to verify the data (it performs the previous steps but without applying the settings).
- Added a button named Cancel.
- Translated everything that was not translated (into English where necessary) instead of leaving it in its current form, which some find hard to understand.
- Added ref inside the shortages document on the machine.
- Added the code and username when the Point of Sale invoice is a draft, since the code and username previously appeared only when the Point of Sale invoice was final.

### Mobile Applications

- In the Warehouses app, changed the current document's name in the stock transfer feature to Stock Transfer Request, but it still works the same way as before - that is, it can still be used as a stock transfer or a stock transfer request - and a document named Stock Transfer was added, which is based on a stock transfer request.
- In the Captain Order app, added a button (Edit Customer) next to the Add Customer button.
- In the Stock Taking app, added color and size, with the ability to add the size/color code as the item code.
- Added "based on" to a direct-work voucher in the app.
- Added the option "Allow editing from the app" in the bundled app settings, under the settings for creating documents and files from the apps.
