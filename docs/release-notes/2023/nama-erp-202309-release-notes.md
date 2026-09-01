# Nama ERP Release Notes - September 2023

::: info Release Information
- **Release Date**: September 2023
- **Release Number**: Nama-ERP-202309
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- The sub-item is now taken into account in the Dimensions of the entity flow for guessing the source lines of the parent document:
  com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem
- Added the field "Maximum Quantity" to the Free Items lines.

### Customer Relationship Management (CRM)

- Added the fields (description 1 to description5) to the Questionnaire Template window.

### Service Center

- Added a new window named "Model Category."

### Travel

- Added the Tourism Service Sales Return document, with the same fields as the Tourism Service Sales Invoice screen, and it works like a Sales Return document.

### Human Resources

- In the lines of the Aggregated Advance voucher, added the following fields:
  - Employee Department
  - Job Section
  - 3 references

  And in the header of the Advance voucher, added the following fields:

  - Employee Department
  - Job Section

### Point of Sale

- In the POS Order Reservation voucher, saving the Order Reservation voucher without a price is now allowed, since in restaurants a table is reserved without entering specific items.

### Settings

- Added the button "Update Fields Max Length In DB" to the Fields & Screens Settings.
- Added the option "Allow Transactions on the Composite Dimension" to all Dimensions except the Legal Entity.
- Added the button "Revert to a Version at a Specific Time."

### Mobile Applications

- Added a new window named "Additional Criteria for Filtering Mobile App Fields." The field and the name of the screen to add the criteria to are selected, taking into account that the field will be read directly from the system.
- Improved so that the location is always copied to the invoice.
- Improved so that when creating a Sales Invoice, the "Allow Credit" option can be checked, so that the system refuses to create an invoice without paying its value, with a mechanism to specify some customers, or all of them, for the rep to sell on credit.
- Added a button at the top of the pages for a (Refresh) action, whose function is to re-read changes in data not previously sent, for example in the new settings and customer locations.
- Added alerts for when there are no updates or new data in the app.
- Added the Expiry Date next to the Batch number in the Batch search table, within the various search tables.
- The Expiry Date is now shown by default, non-editable, based on the selected Batch number, within the various search tables.
- Added a screen in the mobile app named "Login Dimensions."
- Added a button to the Sales Order screen in the app. This button adds a payment line to the document.
- Added an "Add and Close" button to the Item search screen in the Batch search table, where only the Batch number and Production Date are shown.
- Added a grid specific to payment methods in the Aggregated app.
- In the payment methods search table in the invoice, removed the camera-search icon.
- Created an entity flow named com.namasoft.infor.domainbase.util.actions.EAGenerateKNetPaymentURLAndAssignToField, to add the ability to create the final payment link directly, without needing the preliminary payment screen in the OnlinePaymentConfig.

### Reports

- Added a GUI Action to open the "open custom sql expression" screen, specific to both the "staticWhereCondition" field and the "staticHavingCondition" field.
- Enabled control over the Group Header, like the Group Footer, in the Report Wizard.
- Added a Custom Expression grid and a Custom Expression field for each group.
- Added the field addTotalToGroupHeader to the Fields lines, to work like addTotalToGroupFooter.
- Added a "View Report" button to the More menu in the Report Definition screen.
- Added an option to show zero in reports: "Show Zero as Empty Text."
- Applied the same suggestion list from the field "Default Value (Works with Between)" to make it exactly like "Default Value," with the following choices added (for each of them):

  $todayMinusDays(1)

  $todayMinusMonths(1)

  $todayMinusYears(1) $todayMinusWeeks(1)

- Added the two fields "allowed Value AR" and "allowed Value EN" to the Inputs lines.
