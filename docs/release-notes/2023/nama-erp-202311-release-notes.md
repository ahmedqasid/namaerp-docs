# Nama ERP Release Notes - November 2023

::: info Release Information
- **Release Date**: November 2023
- **Release Number**: Nama-ERP-202311
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Improved so that lots are grouped in the Delivery Plan when they are not present in the warehouse, while making sure that an unstocked lot cannot be issued through any document, the same as with stocked items.
- Added the option "Prevent filling the lot number based on the expiry date if the Lot field is empty" to the Distribution Documents term config.
- Added the Reservation Locator field to the Warehouse file.
- Added the Reservation Locator Source field to the Distribution Files term config.

### Purchasing

- In the document "Proforma Purchase Invoice (ProformaPurchaseInvoice)", completed the number of the following fields, which can be shown by editing a screen:
  - The number of details.n fields, up to 10
  - The number of details.date fields, up to 10
  - The number of details.ref fields, up to 10
  - The number of details.text fields, up to 10
  - The number of details.b fields, up to 10

### Sales

- Added an option to the Free Item Offer line named "Apply the offer using a tiered method".

### Fixed Assets

- Added the option "Allow creating a closing entry if the asset is prevented from depreciation" to the Assets settings.

### Accounting

- When creating a Sales Contract and selecting the payment installments, then clicking the button to create a Receipt Voucher for the selected installments, the system shows the Sales Contract data in the Receipt Voucher; when a Receipt Voucher book is then selected, the Sales Contract data is cleared because the Receipt Voucher book has a template (Financial Papers - Payments).
  Improved by adding an option to the Default Values Template that allows the system to keep the Based On data and the Financial Papers and Payments grid data without clearing them.

### Customer Relationship Management (CRM)

- Added reference6 through reference10 to the Complaint document (CRMComplaint). They can be shown by editing a screen.
- In the Maintenance Itinerary screen (MnItinerary), added 5 additional description fields, bringing the total to 10, in the window header.
- In the Maintenance Plan screen (MnPlan), added the following:
  - 5 description fields in the first grid, details
  - 5 reference fields in the first grid, details
  - 5 description fields in the second grid, mnNoticesDetails
  - 5 reference fields in the second grid, mnNoticesDetails
- In the Questionnaire screen, added 5 additional description fields to the answers grid, responses, bringing the total to 10.

### Travel

- Added fields (5 Boolean fields) to the lines of each of the Tour document (TRTour) and the Tour Program file (TRTourProgram). They can be added by editing a screen.
- Added a new document named "Tourism Service Purchase Return", which holds the same data as the Purchase Invoice and shares the same term config.

### Human Resources

- Added the following two fields to the Tax Equation lines:
  - Annual income less than or equal to
  - Annual income greater than
- In the Data Update document, added a field named Bulk Update Document.
- In the Bulk Advance Document term config, added the following two fields:
  - Debit - Payment Amount
  - Credit - Payment Amount
  - Added the Subsidiary field to the lines

### Real Estate

- In the Real Estate (Sale - Lease) documents, added 5 n fields.

### Settings

- Added the ability to run the entity flow com.namasoft.modules.frm.common.EAKWSendIPSEvents on any document in the system.
- Added a document named (APICredentials) that creates the client secret && client Id for the user.
- Added the ability to return specific fields in the Response of the API Integrator. For example, when the client sends a Cancellation Voucher and it is inserted into the system successfully, the response returns an error or success, the document number, and the number of documents accepted. However, when sending 5 documents with 1 failure and 4 successes, the response returned the document number rather than the number of the failed document, to allow resending it.
- Added the ability to delete more than one document, but a JSON body must be added to the request as follows: ["entity code or id ","c0006"]
- Added a column named parentAnalysisLineId to the table MRPRequirementsAnalysis.
- Added the following two procedures to entity flows:
  - Tax Authority - Post Send Invoice
  - Tax Authority - Post Approve Invoice - Valid
- Added the field **Regular Expression in Fields & Screens Settings - the Field Formats grid**
- Added major improvements to the Reward Points (Loyalty Points) settings file, for the integration with Saudi Telecom Company (STC) points.

### Point of Sale

- In the Captain Order app, added the ability to hide the Free Item field and the Issue Method from Warehouse field.
- In the Captain Order app, added the ability to add the Item Remarks field to the lines.
- In the Invoice Classification, added the field "Default Price in the Price List", and the priority of the invoice classification is now taken into account; also added N4 - N5.

### Mobile Applications

- In the Leave document, added "fromTime-toTime" and "attachment" to enter data in them for a half-day leave, and to attach a supporting document for sick leave.
- Improved the button (Group invoices by the selected time and date) in the Bulk Movement document, so that it groups the work tasks that exist on that date, and when they appear in the app, they are shown with more information such as (the customer name and the task name).
- In the Nama Mobile app, improved so that if the Location field in the Customer screen is empty, the system copies the location with the customer's first invoice; whereas if the customer's location already exists in Nama, the app compares it with the invoice's location, taking the allowed distance tolerance into account.
- Added the ability to create a Sales Return without selecting Sales Invoices inside the Nama Mobile app.
- In the Stocktaking app - in the Settings screen: added an option named (Show line number). When enabled, the line number is shown in the Stocktaking lines screen.
- In the Nama Mobile app, improved so that the message "line was added successful" is not shown after adding a line.
- Improved so that the customer's name is shown after selecting them in the Invoice screen, instead of just the code.
- In the Captain Order app, added the Item Code box, which opens automatically when adding items.
- Added the automatic ticket lines grid (autoTicketingLines) to the Queue Service settings. Through it, the steps for printing tickets can be configured; there is more than one type of step (Print Ticket - Verify Customer - Verify Sales Thread - Error Message - Success Message - Query), and the user can use a query on QueueServiceBranch as well as message templates. Also added a field on the Branch named info, with the following fields:
  - customer
  - lead
  - phoneNumber
  - plateNumber
  - ticketEntry

  Link to the app: **[Waiting Area Apk](https://drive.google.com/file/d/1tB1W6uF5Rxcnqt1n4LLeXgVDfVzs8Ofq/view?usp=sharing)**

- In the Field Selection screen, all fields selected in the tool are now shown.
- In the Nama Mobile app, in the Return screen, added an Add and Close button to the item search table.
- In the Nama Mobile app, in the Return screen, added a Payment Method section that works the same way as in the invoice.

### Reports

- In the Report Wizard, adjusted the display of the Gtoup Sections Headers And Footers, because of noticeable differences in sizes and the ability to stretch fields proportionally with the rest of the fields.
- In the Report Wizard, the query is now ordered based on the order of the group fields first, then the order of the sort fields. Joining on a text field can be used via the option (Allow Manual Join For All Field Types) in the Field Selection screen.
- Added the field "Show the attachment as an image in the report" when the option "Show the attachment as an image" is selected.
