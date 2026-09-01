# Nama ERP Release Notes - October 2024

::: info Release Information
- **Release Date**: October 2024
- **Release Number**: Nama-ERP-202410
:::

## Additions

### Inventory

- In the supply chain documents term config, added the option "Recalculate Discounts When Selecting the Invoice Classification".

### Sales

- Added the field "Added to Unit Price" to the discount settings lines in the Tax Authority settings.

### Manufacturing

- Added a reference in the Product Components file lines named "Component Classification".
- Added an option in the Manufacturing settings named "Allow leaving the item blank in the product components lines when a component classification is selected".

### Customer Relationship Management (CRM)

- In the "Maintenance Invoice (MnInvoice)" document term config, added the options "Service Expenses 1, 2, 3 and 4" along with their credit and debit accounting effect for each, exactly as in the "Sales Invoice" document term config.
- Added the option "Add spare parts when selecting the task" to the Work Order term config.

### Fixed Assets

- Added the option "doNotCopyDetailsOfFromDoc" to the Fixed Asset Opening Adjustment document term config, to not copy the details.

### Contracting

- Added the Payments grid to the Project Contract page.

### Settings

- Added all approval statuses to the Modification Log (previously only "Approved" was shown - "Returned", "Rejected" and "Escalated" needed to be added), so that all movements now appear in the Modification Log.
- Added relatedEntityFlows to the Entity Flow screen.
- Improved so that when pressing the shortcut key "alt + ctrl + l" to show the log while there is a criteria-based validation, the system now selects the validation in the log.
- Added SMS Misr as a service provider in the SMS settings under Global Config.
- In both the User window and the Permission file, added the option "Maximum number of records when displaying all in lists".
- Added a field to control the position of the quick help tooltip in Global Config, with the code Tooltip Position, which can be set to the top or the bottom of the page.

### Human Resources

- In the Leave Type, added the option "Always shown in the Leave document". When this option is enabled, the leave type is shown in the Leave document.
- In the Employee Insurance Deletion document term config, added the option "Always create an accounting effect for the dependents".

### Point of Sale

- Added the option "Allow deleting free items from a Sales Return that exist in the original invoice" to the Point of Sale permissions.
- Developed a secondary Point of Sale screen that is displayed in front of the customer to show them some data such as the customer number, name, accumulated loyalty points, item names, quantities, prices and totals, with some additional capabilities for displaying images, noting the following:
  - The data to be shown on the screen is selected through the new Point of Sale Interface settings.
  - Displaying the image can be controlled through the "Show Image" field of the sale window in the Point of Sale settings file.
  - The sale window in Point of Sale can be shown and hidden through a button named "Customer Window" in the shortcuts menu in Point of Sale.

### Freight Management

- In the Container (FRMContainer) file, added fields for both Time and Date & Time.

### Real Estate

- In the Real Estate Purchase Contract screen, added a page named "Payment Vouchers" containing a "Payment Vouchers" grid and a "Total Paid from Vouchers" field.
- Made the Buyer a non-mandatory field in the Purchase Contract.

### Mobile Applications

- Added the description1 field to the fields shown in the Aggregated Fingerprint app in the Electronic Attendance document.
- In the Captain Order app, improved so that when adding a car number for a customer that already exists, a message is shown that the customer exists, and the system displays a screen through which the customer can add the car number along with the customer's data.
- In the mobile settings, added the "Direct Work Order" document to the Type field in the list of allowed values for reference fields in mobile app screens.

### Reports

- Added the field "Show attachment as an image in the report" to the Report Designer screen (in the Groups tab lines).
