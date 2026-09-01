# Nama ERP Release Notes - April 2024

::: info Release Information
- **Release Date**: April 2024
- **Release Number**: Nama-ERP-202404
:::

## Additions

### Inventory

- In Stock Transfers, the following changes were added:
  - In the document's term config, added the internal stock transfer type (Issue, Receipt).
  - When selecting Based On, filtering is applied based on the term config's internal transfer type.
  - In the Stock Transfer, added the field "Stock Transfer Issue Document", which works the same way as "Based On".

### Point of Sale

- Added two options to the POS Permission file to allow opening the Waste and Shortage document.
- Added "the option to send pending invoices to Nama" in the POS settings.

### Contracting

- Added the option "Show Stage Items Table" in the Contracting settings. When this option is enabled, a "Stage Items" page appears with the basic information along with the stage items grid in the Project Extract and the Subcontractor Extract. On save, the stage item lines are flattened into the main details grid.
- Added the following in the Project Extract and the Subcontractor Extract:
  - Linked the accounting percentage in the stage item lines with the "Use Accounting Percentage" option.
  - Linked the accounting percentage in the stage item lines with the accounting percentage in the details.

### Fixed Assets

- In the Assets settings, added the option "Copy the Tax Registration and Commercial Registration data into the asset's Purchase and Addition & Disposal documents on save", and also added the fields (Vendor Invoice Number, Vendor Name, Tax Registration Number) to each of the following documents:
  - Fixed Asset Purchase
  - Addition & Disposal Document
  - Bulk Addition & Disposal Document
- Added an option in the Fixed Asset Opening term config named "Do Not Calculate Remaining Life from Dates".
- In the Fixed Asset and the Asset Type, added "Tax Authority Code" and "Unit Code".
- In the Addition & Disposal document, the addition tax is sent in Tax1 and Tax2, and the deduction tax is sent in Tax3 and Tax4.

### Real Estate

- In the Real Estate settings, added a field named "Allow Saving Contracts if the Difference Between the Net and the Instalments is Less Than", with a default value of 0.05.
- In the term config of the "Handing the Unit Over" document, added the accounting effects and added an option named "Create the Accounting Effect".
- Added the following in each of the Project Extract and the Subcontractor Extract:
  - Linked the accounting percentage in the stage item lines with the Use Accounting Percentage option.
  - Linked the accounting percentage in the stage item lines with the accounting percentage in the details.
- Added a document named "Real Estate Reservation Cancellation".
- In the term config of the Handing the Unit Over document, added the accounting effects and added a new option named "Create the Accounting Effect".

### Human Resources

- Added the Substitute Employee on the line; when the document is saved, the substitute employee is copied into the leave documents created from the (Bulk Leave for Multiple Employees) document.
- In the Salary Records screen, the option for issuing all lines that previously had a salary issued and those with no document issued yet was split into two options:
  - Issue for lines that have salary documents
  - Issue for lines that do not have salary documents (default option)

### Settings

- Developed the option for sending pending invoices to Nama in the POS settings.
- In the Fiscal Year, added an option named "Allow Processing Costs After the Closing Entry".
- In the Global Config, added an option named "Allow Editing Documents Before the Closing Entry Date".
- Added the ability to block one or more users from logging in via the nama.properties file, as well as blocking login from a specific IP or a group of IPs.
- Added the ability to format dates and numbers in Tempo.

### Customer Relationship Management (CRM)

- In the term config of the Maintenance Order Execution document, added a Settings page to enable Subject to Tax and to calculate tax on services and spare parts, similar to the Maintenance Order and the Maintenance Invoice.

### Mobile Applications

- Allowed editing the screen on the app for the Complaint screen, and added 2 ref and 2 desc fields to the screen.
