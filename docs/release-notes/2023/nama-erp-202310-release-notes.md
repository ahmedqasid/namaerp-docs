# Nama ERP Release Notes - October 2023

::: info Release Information
- **Release Date**: October 2023
- **Release Number**: Nama-ERP-202310
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Improved so that the system does not allow saving the Assembly Document without adding the issue for the assembled item when there is cost tracking on the issue.
- In the supply chain settings, added the option "Show the description (remark) in the journal entries generated from issue, receipt, and stock transfer documents".
- Added the option "Retry Processing Stock Ages Task" to the More menu in the (Pending System Action) window.
- In the Start Stocktaking term config, added the option "Show only items that have a Stocktaking Committee when finishing the stocktake".
- In the Additional Receipt Costs document, added the field "Total in Document Currency", taking currency changes into account.
- In the Warehouse Receipt Documents term config, added the option "Do not copy the quantity when selecting Based On" and the field "Copy Quantity To".

### Purchasing

- In the Purchasing Documents term config, added the following:
  - Filtering on lines matching the same branch with Based On.
  - Filtering on lines matching the same analysis group with Based On.
  - Filtering on lines matching the same department with Based On.
  - Filtering on lines matching the same sector with Based On.
  - Filtering on only the selected items in the lines with Based On.
- Added the two fields (Attachment 1 - Attachment 2) to the Purchase Order lines.

### Sales

- In the Sales Documents term config, added the following:
  - Filtering on lines matching the same branch with Based On.
  - Filtering on lines matching the same analysis group with Based On.
  - Filtering on lines matching the same department with Based On.
  - Filtering on lines matching the same sector with Based On.
  - Filtering on only the selected items in the lines with Based On.

### Accounting

- In the lines of the Financial Statement Settings file, added an option named "Spread the line across the accounts" so that when the option is enabled, the system searches for the accounts linked to the chart of accounts and creates lines for them.

### Hospital Management System

- Added 5 attachments to the Patient Admission Form.

### Service Center

- In the Task screen, added dimensions to the "Product" lines.
- Added 5 boolean fields, i.e. (b1:b5), to the Operations lines in the Job Order window.

### Customer Relationship Management (CRM)

- In the Questionnaire screen, added 3 attachments and added them to the screen.
- When a questionnaire has an HTML template for the questionnaire, the option "Answered from the link" is ignored and the system allows answering the questionnaire more than once. Added a template that is used when the questionnaire has already been answered before.
- Added the field "Attachment 3" to the grid fields in the Questionnaire screen.

### Human Resources

- Added attachments to the "Approving a System Performance Indicator" window.

### Point of Sale

- Created the following two windows:
  - After-Sales Offer Settings
  - After-Sales Offer
- Added the document "After-Sales Offer Claim".
- In the Item Search screen and the Customer Search screen in Point of Sale, the fixed filter when searching by item name or customer name is Equals (=). Added an option that allows changing this fixed filter when searching by item name or customer name to be "Contains" instead of Equals (=).
- In the Captain Order app - Customer Code field, enabled the ability to search the customer code by mobile number, just like on the Register.
- Improved so that when opening the New Customer window from the Sales Invoice in Point of Sale, the mobile number is copied automatically into the Mobile Number field, since it previously only appeared in the alternate code (altCode) field.
- In the Captain Order app, in the pop-up Item Search screen, the Item Code and the Arabic Name are now shown.
- In the Captain Order app, added the Invoice Classification field and the Remarks and Description fields.
- Added a permission named "Ability to print a held invoice" to the Point of Sale permissions.
- Added the list "Save the lines deleted from the invoice" to the Point of Sale settings, which contains the following options:
  - No
  - Inherited
  - Yes
- Added the ability to search the Point of Sale invoice lines by the code present in the invoice line, in addition to the item code.
- Improved so that when a customer is created through the Point of Sale interface, the customer is saved in Nama first, and if the save succeeds, it is then saved in the Point of Sale database.
- Added the option "Do not create customers if the connection is lost" to the Point of Sale settings.
- In the Captain Order app, added the ability to open saved invoices existing in the app.
- Added the option "Always print the full invoice" to the Register file.
- Improved so that when the Send button in Captain Order is pressed, it is disabled for one second, because it was sometimes pressed twice or more in a row by mistake, causing the preparation form to be printed more than once.

### Mobile Applications

- Modified the Application screen in Nama as follows:
  - In the screen header, adjusted the field names, since when the Customer field was added the autocomplete did not work correctly.
  - Added the Production Date field to the Item Search table grid and the invoice lines grid.
- Added the ability to choose the header and details fields and hide them in the app.
- The app menus show many menu items and links. Added the ability to customize these menu items and links according to the user's permission, and also added the ability to hide the unit's name or code.
- Added a query field to the Nama Mobile app settings named "Default Payment Method Expression".
- Added a new file named "App Menu Definition" and a reference to it in the User file.
- In the Nama Mobile app, added the "Default App Menu" boolean to the App Menu Definitions screen, so that it works by default for users if no specific menu has been selected for the user.
- Added a button to the app menu named "Sync Draft Documents".
- In the Sales Invoices screen, hid the add-customer icon if the customer does not have coding permission, leaving only the search icon.
- Added 5 fields each for text, number and date, in addition to a field for remarks, to each of:
  - Sales Order
  - Sales Return
  - Shipment Delivery Document

  These fields are hidden; they are added by editing a screen.

- In the Nama Mobile app, improved so that when creating a return, the location is added just like in the invoice.
- Enabled offers on lots from the mobile invoice.
- In the app's field filtering, improved so that the item is suggested only once, since it used to repeat the item once for each existing lot.
- In the Nama Mobile app, developed a mechanism to check back with the Customer screen to determine whether this customer is allowed to sell on credit or not, taking into account that if the customer is not entitled to credit sales, a default payment method can be copied in, with the ability to change it.
- Added the ability to change the quantity from the line in Sales Returns.
- Added the field "Return Reason" to Sales Returns.
- Added the Customer and Employee fields inside each of Complaint, Suggestion, and Remark.
- Added the ability to view reports through the app.
- Enabled the field Suggestion Provider to work correctly when entering fields from other screens.
- Showed the discount box in the header.
- Added the ability to add the item name in the details.
- Took permissions into account when viewing reports through the application.
- Added the option named "Preview the print form before printing the document in the app" to the Nama Mobile app settings.
- Added the option "Print with Save" in the app, similar to what exists in Nama.

### Reports

- In Financial Statements, in the Financial Statement Settings, added the following to the lines:
  - Restrict the search to the Branch
  - Restrict the search to the Sector
  - Restrict the search to the Department
  - Restrict the search to the Analysis Group
- Added the ability to create a (Crosstab) from the Report Wizard.
- Permissions are now taken into account in the Report Wizard.
