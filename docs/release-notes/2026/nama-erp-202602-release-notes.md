# Nama ERP Release Notes - February 2026

::: info Release Information
- **Release Date**: February 2026
- **Release Number**: Nama-ERP-202602
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- Added an option named allowEmptySysDistributionLines in the term config of the Additional Receiving Costs document.

### Accounting

- In each of the Miscellaneous Invoice, Contracting Miscellaneous Invoice, and Equipment Rental Invoice, and all vouchers that have a credit side and a purchase item, the following was done:
  - When a sub purchase item is added and then a subsidiary purchase item is selected, the Account and Subsidiary fields become inactive for use.
  - Improved so that if a credit side (a specific subsidiary or a sub account) is not selected, all accounts appear as subsidiary or sub, and when a subsidiary account is selected, the linked subsidiary appears, as in the Journal Voucher or the Receipt and Payment Voucher.
  - The Wallet accounts + the Subsidiary accounts are now considered when a subsidiary is selected first and then the account.
- In the "LedgerTrans" screen, added a "Review Status" 'Revised' column for the document that created the journal entry.
- In the Prepaid Expenses Contracts screen, added the option "Delete Related Documents When the Contract Is Deleted".

### Human Resources

- Added maxEOSMonths in the Termination Reason screen, representing the maximum number of months for the end-of-service benefit value linked to the termination reason. It is used to cap the final end-of-service benefit value so it does not exceed it.
- Added 5 more values to the "salaryPaymentMethod" field: (Other1, Other2, Other3, Other4, Other5).
- Moved the option "Exclude the First Leave Day from the Balance Calculation Period" from the Human Resources settings to the Leave Type voucher.

### Point of Sale

- Improved so that a fingerprint can be required to edit the POS invoice and return for a specific permission profile (a supervisor, for example).
- Added the ability to hide the POS invoice and return code through the POS settings.
- Added two options in Payment (Hide in Sales Payment and Hide in Returns Payment).
- Improved the POS Return so that when "Based On" the Sales Invoice is selected and the data is copied into the header and details, the system, upon deleting the invoice code, clears all the data that was copied based on the invoice.
- Added lines named "Permissions" in the Weighbridge Settings file.
- Added the ability to merge pending invoices into a single invoice, with the ability to delete the merged invoices after payment is completed in the POS.
- Added lines named "Permissions" in the Weighbridge Settings file.
- Added the option "Calculate the Price from the Purchase Price List in the Supply Voucher" in the POS settings.
- Added the "ctrl+r" shortcut to prevent creating a return after the grace period; it can be changed through the "POS Shortcuts" file.
- In the Shift Closing document, added a shortcut (Open Document in Nama) so that it navigates to the customer's link, and after entering the username and password, the document opens directly.

### Contracting

- In the Analysis Card, added the ability so that when a contract is selected, or based on a contract, and the sequence is (Price Offer - Project Contract - Analysis Card), the system inserts the cost items found in the Price Offer with their data - and if there are no cost items, the system inserts the cost items found in the Standard Item.
- Added an option named calcTotalDueValueFromPreviousTotal in the Extract term config.

### Service Center

- In the term config of the Work Orders and vouchers in the Maintenance module, there is an option named "Change Vehicle Status To" (ChangeProductStatusTo). Added the following:
  - Another field, of type Criteria Definition, named "Change Status Only When the Criteria Match".
  - Another field, of type Alert Definition on the Vehicle (Product), of the manual type, named "Trigger the Alert When the Status Changes", where the alert is triggered only if the status changed.
  - A date and time field on the Vehicle (Product) screen.

### Settings

- Added Dashboard-type reports to the Report Tracking (Reports Currently Running and Results of Executed Reports), and also showed Dashboard-type reports in the System Task Monitor, like Report-type reports (with the report code + identifier)
- Added a mechanism to control the reference search to be (Starts With, Contains) at the level of a specific field in a specific screen, like the one found in Global Config at the level of the entire system.
- Added the ability to send an OTP when requesting approval on certain documents, along with sending the OTP as an alert via a WhatsApp Message for My Correspondence.
- Added a button that gathers the permission profiles and the users who have that permission type.
- In the Report Definition screen - Permissions page - added a button that gathers the permission profiles and the users who have the permission type entered when the button is pressed.
- When creating an Alert Definition and specifying that it be sent to a specific permission profile, the alert was not sent to users who have that permission through an additional permission profile, and was only sent for the permission if it existed directly on the user. Improved so that the alert is now also sent to those who have the profile's permission through an additional permission profile.
- Improved so that documents that were not saved as final (Draft or Cancelled) no longer appear when trying to select them in fields, and only Fixed documents appear.
- Added the ability to make the Preferred Sender calculated dynamically through tempo, so that WhatsApp messages can be sent using the phone number of the invoice's Salesman or the record's creator. For example: {salesMan.conactInfo.mobile}

### Fixed Assets

- Prevented deleting the Asset Capitalization Costs voucher when there are transactions on the asset.

### Manufacturing

- Added the option "Use the Secondary Product Warehouse" in the Production Order Execution term config.

### Mobile Applications

- Updated the Kitchen App along with the Nama update.

### Real Estate

- Added the option "Maintenance Deposit Before Calculating the Discount".
- Added "Based On" a Rent Contract at the line level, so that it shows only the rent contracts belonging to the tenant found in the header, allowing a Collection Voucher to be created for more than one rent contract at the same time. Note that the Installment Number field found at the line level shows the unpaid installments for the rent contract found on the same line.

### New GUI

- Allowed adding a Time field with specific values in (Allowed Values for Fields) in the Fields & Screens Settings.
- Added the ability to open a new tab when clicking in the menu or in the search list with the mouse while holding ctrl or alt, and added an arrow in the search list to make it easier to open directly in a new tab.
- Added a Tool Bar next to the grid's title in the screen, to add more control over the shape and content of the grid.
