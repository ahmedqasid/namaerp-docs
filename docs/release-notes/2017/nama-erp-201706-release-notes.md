
# Nama ERP Release Notes - June 2017

::: info Release Information
**Release Date:** June 2017  
**Release Number:** 201706
:::

## Additions

### Inventory
- **Warehouse Transfer Document:** Changed the automatic (Default) base unit in Transfer documents to the purchase unit.

### Sales
- **Sales Returns Document:** Changed the automatic (Default) base unit in Sales Returns to the sales unit.
- When creating a credit invoice or credit return, improved so the Invoices and Returns table records that the invoice is on credit.

### Human Resources
- **Visa Delegation:** Added the Delegation Number to the Visa Delegation screen.
- Made the Delegation End Date on the Delegation screen not mandatory; the visa's expiry date is copied into it if left blank.
- **Employee Arrival Registration screen:** Added text fields (Employee Name) and added the Entry Airport.

### Service Center
- **Spare Parts Issue and Return documents:** Made the Task not mandatory.
- Improved the system so the effect of the **"Raw Material Issue"** document in the Service Center system can become the effect of a Warehouse Transfer document, with the **"Sales Invoice"** or closing the Work Order issuing the difference between what was transferred between the Spare Parts warehouse and the Workshop Floor warehouse, and what was returned via the **"Raw Material Return"** document (transferring it from the Workshop Floor warehouse to the Spare Parts warehouse).
- Added a new document, **"Raw Material Return"**, that produces the reverse effect of the **"Raw Material Issue"** document in the Service Center and Maintenance system.
- Added a new price to the **"Service"** file, at the level of the service's total price, called **"Vendor Price"**.
- Added a new option in **"Service Center Settings"** called **"Service Pricing Policy"**, letting the user choose a pricing method for all Service Center documents between two options: (Normal Pricing / Vendor Pricing).

### Point of Sale
- Added the option **"Ability to View Data Transfer Errors"** to POS permissions, to control who can view data transfer errors.
- Since POS takes about 20 seconds to open, which makes the user click the icon more than once, added a mechanism to tell the user, after the first click, that the program is opening.
- Added a button for deleting lines in the Warehouse Transfer Request.
- Added the ability to print Shift Open and Shift Close in POS.
- Enlarged the size of the Save mark found on the document.
- When creating a Warehouse Transfer, hid the payment ($) symbol to prevent user errors.
- Added the permission **"Ability to Give Free Items"** to the POS Permissions file.
- Improved so the price and free items are ignored when creating a Warehouse Transfer from POS.

### Auditing
- Added a filter on the Test Definition by phase or cycle in the tree view.
- Added the option **"The Line Unit Must Match the Sales Offer Unit When Searching"** to Distribution Management Settings; it must be enabled for the unit to be taken into account when searching.
- Improved so a Work Order is rejected if the recorded odometer reading is lower than the Product's current reading.
- Improved so the odometer reading is recorded from the **"Work Order"** document, then recorded as the current reading inside the Product and Item files.
- Added new fields for each of (Previous Meter Reading Date, and added Current Meter Reading Date) in the **"Product"** and **"Item"** files.

## Settings
- Added **"Send Emails Only From the Following Sites"** to Alerts, as in Scheduled Tasks.
- Added the ability to create an alert for overdue approvals required from the user.

## Reports
1. Allowed creating a link to attachments in reports, via the following function: `NamaRep.attachmentLink(fileId)`

## Fixes

### Inventory
- **Warehouse Issue Document:** Fixed an issue where an Issue document created based on a Consolidated Issue Request could not be edited, showing an error message that more than one Issue document cannot be created for the same request.

### Manufacturing
- **Planning Document: Production Plan page:** Fixed an issue where the batch size was not taken into account when splitting Production Orders.

### Human Resources
- Fixed an issue where, when an employee had an evening overtime shift on the day before a holiday that ended on the new day (the holiday), and the employee also worked the holiday, the system added the number of holiday hours on top of the overtime hours that fell on that same day.

### Settings
- Fixed an issue where modifying a screen with a button that creates a document, when the line number was not stated and `@rownumber` was used instead, did not work correctly.
- Fixed an issue where modifying a screen with a button that creates a document did not work if there were spaces written into the `creator` for formatting purposes.
- **Alerts:** Fixed an issue where creating an alert for a user did not show the alert as a notification, only inside Alerts.
- Fixed an issue where defining a new dimension (Department - Branch - ...) showed neither its name nor its code when searching for it, only empty parentheses ().
- Fixed an issue where selecting **"Apply to Selected"** in validation based on criteria worked as though it were **"Apply to All Except Selected"**.

### Point of Sale
- Fixed an issue where opening POS could take longer than expected.
- **POS Returns Term Config - Settings page:** Fixed an issue where, for automatically created documents — whether the book or the term config — the system did not show the books and term configs for the Supply document when searching for them.
- Fixed an issue where, after designing a print form for Shift Close, the Close screen did not close when pressing OK, requiring pressing Cancel afterward.
- Fixed an issue where the user could avoid paying the full invoice value, via the following steps:
  - Choosing Multiple Payment.
  - Deleting the value in Cash Payment using the (Delete) or (Backspace) key.
  - Entering a value less than the invoice value in one of the payment types other than Cash Payment.
  - Pressing the Confirm button.
  - The system accepted the invoice with a lower value.
- Fixed an issue that occurred when entering the following data:
  - Invoice quantity: 3.
  - Item count calculation mechanism: by item quantities.
  - Item group: (a group made up of 3 items).
  - Free item: the first item on the invoice.
  - Policy: Multiples
  - Multiples policy mechanism: multiply the item quantity
  - The system did not multiply the free item, and instead inserted it with a value of 1
- Fixed an issue where POS did not respond to offers for item categories.
- Fixed an issue where POS did not apply offers for item departments.
- Fixed an issue where offers did not take the item's brand into account, so free offers were not applied to items belonging to the same item.
- Fixed an issue where creating a Warehouse Transfer Request in POS caused an error transferring the record creator's name to Nama.
- Fixed an issue where some invoices had a remaining balance, causing a save problem when the Customer account was used in the term config.
- Fixed an issue where clicking a line with a free item made the system unresponsive.
- Fixed an issue where creating a price list for an item in a unit of measure other than the base unit made the system read the item's price from the price list using only the base unit.
- Fixed an issue where changing the database name in the `properties nama` file from database X to database Y left the system showing the payment methods of database X.
- Fixed an issue where the system did not transfer the Shift Open and Close details to Nama.
- Fixed an issue where creating a POS invoice and changing the price to zero made the system treat the line as free, but changing the price again did not un-mark the line as free.
- Fixed an issue where creating a return on a Sales Invoice that had one item worth 100 riyals and a second one free — linking the invoice to the Sales Return showed the return amount as 200 riyals instead of 100 riyals.
- Fixed an issue where the system transferred suspended invoices.
- Fixed an issue where, occasionally, paying an invoice that had a remaining balance left the system holding the remainder as a negative number when closing the shift, and the system refused to close the shift.
- Fixed an issue where, occasionally, the system did not insert the free item from offers.
- Fixed an issue where, occasionally, the system did not transfer the Shift Open and Close details to Nama.

### Letters of Credit
- **Expense Document:** Fixed an issue where entering the expense value as negative reversed the entry, but did not copy the conversion factor to the system journal entry — meaning that even though the document had a conversion factor, the system journal entry's local currency value equaled the account currency value.
