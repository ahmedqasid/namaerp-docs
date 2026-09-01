# Nama ERP Release Notes - January 2025

::: info Release Information
- **Release Date**: January 2025
- **Release Number**: Nama-ERP-202501
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added an entity flow named EASendInvoiceToDatanuum.

### Sales

- Added the following options in the Sales Invoice term config:
  - Set the quantity to 1 when selecting an item that has a line in the Based On document
  - Copy the data of only one line from the Based On document for an item, without duplication
- Added the (Add Invoice Offers) action into the (Apply Offers & Discount Coupons) action, so it becomes a single action in the invoice that covers everything the earlier actions did. This was also carried over to the Sales Order, since the (Add Invoice Offers) action had not previously existed on the Sales Order.
- Added an entity flow that splits a Sales Order line into lines corresponding to the Sales Invoices created based on that order.
- Added the "Borne by the Customer" option to Sales Returns.

### Manufacturing

- Added extensive changes to bring the system in line with the carton industry.

### Accounting

- Improved so that the debt-aging grid appears in the system journal entry view for accounts that are tracked by debt aging.
- In the Payment Voucher (Accounting), added the "السركي" document to the Based On list, like the Purchase Invoice.

### Fixed Assets

- In the Fixed Asset Type, added a debit and credit for Contracting Cost, which are copied to the fixed asset when the type is selected — the same treatment as Accounts when selecting the asset type in the Fixed Asset definition.

### Settings

- Added a new document to the system named "Freeze Processing Document" that prevents cost processing before a given date, having the same effect as the Closing Entry on processing accounting or inventory effects. By default this document can only be created by the Technical Support team, with an option added that lets a regular user save the document, activation of which is done by the Technical Support team.
- Added ultra msg as a service provider in SMS Settings.
- Added waapi.app as a service provider in Messaging Settings.
- Added a page named "Extra Filters" to the User screen.
- Enabled SQL Logging via spy log.
- Added the ability to run GUI Post Actions when deleting lines, and also when duplicating a line with Shift+Insert.
- Added a field named (Email Used with the Send as Email Window) to both the User screen and the Permission Profile screen.
- Added the ability to add the panel to a Permission Profile, such that priority goes to displaying the user's own panel if it conflicts between the user's panel and the panel on their permission profile.
- Deleting a (Document Cancellation Document) that cancels an invoice already sent to the tax authority (the invoice becomes unsaved - cancelled by the cancellation document, but it had already been sent to the tax authority) — improved so that changing data already sent to the tax authority is prevented, most importantly the actual date (such a change would otherwise come from an entity flow).
- Improved the Direct Printing application so that documents that were not printed are kept, with the ability to reprint documents whose direct printing failed.
- Designated the documents (REFineDoc - REMaintenanceExpense - RECancelContract - RERentContract) for sending to the tax authority.
- In the voucher for sending documents to the Tax Authority, added Invoice-type totals, Debit Note-type totals, and Credit Note-type totals.
- Added the (upgrade version) button inside the pgw application. The latest version containing this update can be downloaded via the link.

### Human Resources

- Added the following fields to the System Indicators:
  - Non-working Days
  - Working Days

### Real Estate

- Added a button for creating a partial payment for the selected installments.

### Customer Relationship Management (CRM)

- Added the "Sub-Item Filters in Documents" grid to the "Sub-Item Status Settings" window.

### Point of Sale

- Allowed the (Max Fields Length In DB) effect in GenericReferenceOverrider to apply to Point of Sale databases.
- Improved the translation of Point of Sale fields by also showing the label outside the field, matching the change made inside the field.

### Contracting

- Added the "Project Item Code" field to the lines of the Items grid and the Items-Before-Amendment grid.
- Added the "allowNegativeRemaining" option in the ContractorAdvancePayment term config.

### Project Management

- Developed a new screen out of the Task Execution screen, called Task Planning.

### Reports

- Added a list inside DataSource showing which ReportWizard is used within it.
