# Nama ERP Release Notes - July 2025

::: info Release Information
**Release Date:** July 2025  
**Release Number:** 202507
:::

## Additions

### Inventory
- Added an accounting effect in the document term config for the Delivery Voucher and Delivery Cancellation Document; the default is that no accounting effect is posted, as happens with the Sales Order.
- Added the following screens:
  - Warehouse Transfer Issue
  - Warehouse Transfer Receipt

### Contracting
- Added the following to the Standard Term definition:
  - Increased the `REF` references by 5 in addition to the existing ones
  - Increased the `description` fields by 15 in addition to the existing ones

### Banks
- Added a button inside the Financial Papers Book that creates cheques in Initial status and works only with outgoing cheques, taking into account the number of cheques in the book.
- Added a list view of the cheques in the book that share the same cheque book.

### Accounting
- In the Exchange Rate Change Voucher term config, added the option **"Ignore Dimensions When Processing Exchange Rate Change"**.

### Settings
- Added the **"List View Permissions"** page to control allowing and denying list views when the Full Permissions option is not enabled.
- Added a `(Morasalaty (Data Extra))` grid on the WhatsApp screen in the My Correspondence page.

### Point of Sale
- Added the field **"Time Since Last Server Connection (in minutes)"** to the Point of Sale screens.
- Added an option in the Point of Sale settings named **"Replace the POS Customer with the Server Customer When the Code Is Duplicated"**.
- Added the field **"Shift Number"** under "Home Page Fields" in all Point of Sale screens; it shows the number of the current shift, so the field appears empty when no shift is open.
- In loyalty points, when calculating loyalty points with the Sales Return and the Point of Sale Return, saving is now allowed when there are no transactions on the loyalty points table, without needing to affect the loyalty points negatively (i.e., there is no effect at all on the loyalty points table), and the Sales Return can now be saved.
- Prevented the cashier user from changing the machine's password.

### Human Resources
- Added two fields to the Time Attendance document with the codes `removeLinesBeforeDate` and `removeLinesAfterDate`.
- Modified the `Initialization Document` for `EATimeAttendanceFromDBImporter` to allow adding any field to the Time Attendance document.
- In the Consolidated Bonus Voucher, added: Total Final Value, Disbursed, and Remaining.

### Manufacturing
- Added the Available Materials lines to the Formula screen.
- Added a Review Available Materials button to the Formula screen.

### Mobile Applications
- Field filtering (`FieldFiltering`) in `NamaMob` must be respected.  
  **Example:** In the Warehouse Transfer Request in the Warehouses app, when "no filtering" is selected on the "From Warehouse" field in the field filtering file, all warehouses should be shown in the "From Warehouse" field, as happens in Nama.
- In the Visit document inside the app, `out check` is now prevented without changing the status to "Finished", so the representative cannot leave the "Initial" status and perform `out check`.
- In the Consolidated App Settings, under the settings for creating documents and files from the apps, added an option named **"Copy Details From Based On"**.
- Added the ability to auto-save a draft in the Transfer Voucher and the Internal Transfer Voucher; the field `issueTransfer` must be added.

### Contracting (Tax Details)
- Added a new file named **"Tax Extract Item"** used to specify tax items.
- In the Extract term config, added a combo box **"When There Is No Tax Extract Item"** used to determine the strategy for what happens when there is no tax item:
  - Error
  - Do not send to the Tax Authority
  - Default item from the term config
- Also added the field **"Tax Extract Item"**; if the "Default item from the term config" option is selected, a tax item must be chosen in that field.
- The field **"Tax Extract Item"** was added to each of (Project Extract Details - Standard Term - Contract Lines - Extract Term Config).

::: info Priority of Searching for the Tax Item
Priority will go to the Extract lines, then the Standard Term, then the Contract lines that have the same item code; if all of the above are empty, the term config will be checked to determine the appropriate strategy for when there is no tax item.
:::

- In the Extract, added a new grid **"Tax Details"**:
  - It will contain: the Tax Item - Quantity (always equal to 1) - Total Price, Discounts, Taxes, and Net
  - The tax items and the totals of the lines containing them will be aggregated, and in the end aggregated into the **"Send Documents to the Tax Authority"** document
