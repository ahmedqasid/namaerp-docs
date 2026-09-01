# Nama ERP Release Notes - February 2023

::: info Release Information
- **Release Date**: February 2023
- **Release Number**: Nama-ERP-202302
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added the "Search for the Item Serial Number in the Database" button, shown when clicking the search glass icon of the serial number field.
- Renamed the Colors & Sizes Matrix file to Colors, Sizes & Versions Matrix, and also added a Versions grid to it; when it is selected on the item, if the grid is not empty the versions are filled in from it.
- Item file - Versions lines: Added two date fields (Date 1 and Date 2) that can be added by editing the screen.
- Added the following three entity flows:
  - "EAReplaceItemColorInSystem"
  - "EAReplaceItemBoxInSystem"
  - "EAReplaceItemSizeInSystem"

  These relate to adding the ability to change a color code or size code and update it in the lines of documents that had movement on those colors or sizes.

### Accounting

- In both the Receipt Voucher and the Payment Voucher, on the Payments page, improved so that installments in the Payments affect debt aging, such as invoices, by adding an option in the Receipt Voucher term config called "Use Payment Lines in Debt Aging".
- In the Account window, added 5 booleans.

### Contracting

- In both the Project Contract and the Subcontractor Contract, added the field "=Quantity | From Opening Extracts" to the Terms grid.
- Allowed doing a Recommit for a Subcontractor Extract for which the closing extract of its related Subcontractor Contract has already been done.

### Manufacturing

- In the Production Order term config, added a reference field to a criteria definition named "Raw Material Issue Request Creation Criteria", used to create the raw material issue request based on the criteria definition.

### Real Estate

- Added a grid in the Real Estate settings named "Tax Policy".
- In the Real Estate settings, in the Tax Policy grid, added a Checkbox on the line to calculate the tax from the base price rather than the net.
- In the Sales Contract document, added the following two fields:
  - A field named Type = type, with two values (Contract - Addendum), defaulting to Contract
  - A field named Addendum For = extensionFor

  So that an active contract that has not been given up via an Ownership Transfer voucher can be selected.

### Human Resources

- **Insurance Company Assignment Voucher:** Added an "Administrative Fees" group in the term config, in which the following fields were added:
  - Administrative Fees Tax
  - Administrative Fees Value Debit
  - Administrative Fees Value Credit
  - Administrative Fees Tax Value Debit
  - Administrative Fees Tax Value Credit
- Added a Leave Reason to the lines of the Bulk Leave Voucher.
- **Payroll Register:** Added the ability to group employees based on a reference (1-2-...), with the ability to also group based on a criterion, in order to issue a payroll register for each project separately.
- Created a new file named Extra Filters for the POS.
- Added a field in the Machine and the POS Settings named "Extra Filters".
- In both the Machine and the POS settings, added the following options:
  - An option named Automatically Add the Tourism Service Item to the Invoice.
  - An option named Automatically Add the Delivery Service Item to the Invoice.
- In the Employee Data Update document, added the following:
  - A reference-type field from ref6 to ref10
  - A text-type field from description16 to description20
- Added a new grid in the Annual Increase document named Exceptions, allowing elements and employees to be combined in order to set an increase percentage or value for each employee.
- **Bulk Leave Return to Work Voucher:** Improved the document so that the field "Based On" was made mandatory, and it is no longer possible to leave the details empty.

### Project Management

- In Project Tasks, allowed adding the same employee on more than one line, with the start and end dates now considered at the line level.
- In Task Execution, the actual date is now taken into account when retrieving the planned information, considering the start and end dates of the line, and on save the actual is updated according to the period of the line only.
- Improved Quotations so that when a project is created, the tasks that were added from the template are created.

### Fixed Assets

- Improved the Asset's Default Life field so that it is always zero inside the Asset screen.

### Point of Sale

- Added a new screen in the new POS interface settings file named Search Dialogue Columns Settings for POS.
- Created a field named the Date Part Pattern for the POS Code in the POS settings, the Machine, and the POS Documents Coding lines in the Machine. This field ensures the code starts over daily. This field can be used together with the existing POS Documents Coding lines fields in the Machine to customize the code.
- Added the field "POS Documents Code Suffix Length" in the POS settings.
- Added an option named Disable the Actual Balance in POS in the Payment Method file.
- Added a new group in POS named Electronic Receipt POS Settings, to activate the Machine in the portal through the POS in Nama.
- Added a field in both the Machine and the POS settings named Purge POS Documents After (Days). Once the field is used, all documents that have exceeded the specified period are deleted from the POS when the shift is opened.

### Settings

- Added the ability to set a maximum size for a single attachment, as well as a maximum total size for all attachments in the database, with the size specified in kilobytes.
  To support this setting, the property "max-single-attachment-size-kb" is used in the nama.properties file. For example, to make the maximum size of an attachment 500 kilobytes, add the line (max-single-attachment-size-kb=500) to the nama.properties file
  To support this setting as well, the property "max-total-attachment-size-gb" is used in the nama.properties file. For example, to make the maximum size of all attachments 500 kilobytes, add the line (max-total-attachment-size-gb=500) to the nama.properties file
- In Permissions (User, Permission File), added a permission for (ability to delete a draft: (Yes - No - Same as Delete), option => Delete only the drafts they created).
- Added the option "Merge Alternative Permission Files into the Main User" to Global Config.
- In the Permission File screen, added both "Prevent Deletion After Printing" and "Prevent Deletion After Approval" on the line.

### Mobile Applications

- Changed the license of the "Remark" file so that it falls under the "Basic" license in the mobile app.

### Reports

- In the Report Builder tool, added the ability to enter the Custom Expression in an easy way.
