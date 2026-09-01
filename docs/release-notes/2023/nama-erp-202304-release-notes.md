# Nama ERP Release Notes - April 2023

::: info Release Information
- **Release Date**: April 2023
- **Release Number**: Nama-ERP-202304
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added a new window called "Item Allocation by Location Classifications".

### Travel

- **Hotel Voucher document:** The "Starts At" and "Ends At" fields were converted to text fields.
- **Tourist Trip document:** Improved so that when a Hotel Voucher or Restaurant Voucher is added on the lines, the Trip document is placed in the Trip field inside them.
- Added the following fields to both the Tourist Program and the Trip, on the accommodation and services lines.
  - 5 text fields
  - Five date fields
  - 5 numeric fields

### Contracting

- Added the option "Allow Overlapping Periods in the Staff/Equipment Allocation on Project document" in the Contracting settings.
- Improved so that when a Contract Template is selected on the Contracting Price Quotation screen and the Contracting Assay screen, the system shows the terms when the term code is pressed twice, taking into account that the "Do Not Copy Term Lines" option must be enabled for this to work correctly, the same as on the Project Contract screen, and confirmed that the term description appears when the term code is pressed.
- Added 5 booleans to each of
  - Project Extract
  - Subcontractor Extract
- Staff/Equipment Allocation on Project window:
  - Added dimensions on the line in the Allocation Voucher screen, taking into account the cost-splitting by dimensions within the project.
  - Added a Number of Days field on the line (the difference in days between From Date and To Date).

### Freight Management

- Added the following Office field to the window header on each of the following screens:
  - IPSMailItemManifest
  - PSPostalParcelsSort
- Added the "Non-Delivery Reason" and "Non-Delivery Action" fields to the IPSPostalParcelsSort document
- Added the field "IPS User Code Field" in the Freight Management settings, which suggests the text fields that exist in the User file.

### Human Resources

- **Batch Mission Voucher:** Added 5 attachments to both the document header and the document details.

### Point of Sale

- Added the ability to send electronic receipts to companies, by adding a new field called "Sent Document Type" to determine whether the sent document type is a Receipt or an Invoice, or according to the type of the party the document is issued to, and deleting the old option and moving its value to the new one.

### Settings

- Developed a mechanism to correct the customer's phone number in the loyalty points before sending the message to the customer, by adding a new field called "Mobile Correction Query" in the Points settings file.
- Created a web template for unexpected operations, the templates used during payment to notify the user of the operation's success or failure.

### Mobile Applications

- Created a new document for receiving purchases, issued based on a Purchase Invoice, so that the purchased items are scanned; if any scanned item is not found on the Purchase Invoice, the system alerts the user of this.
- **Remarks window:** Added the following fields:
  - Signature
  - Description 1
  - Description 2

### Reports

- Added the following improvements to the Report Wizard:
  - Added the ability to apply a Style to the report details to color the lines, so one line has one color and the next has another.
  - Added the ability to control the size and weight of the report title.
  - Showed the color palette in the page design.
  - Added two extra fields for (Report Title in Arabic) and (Report Title in English) on the main page.
