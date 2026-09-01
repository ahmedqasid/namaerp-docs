# Nama ERP Release Notes - November 2025

::: info Release Information
- **Release Date**: November 2025
- **Release Number**: Nama-ERP-202511
:::

## Additions

### Inventory

- Added the field "Has Sales Vouchers" in the Item screen.
- Added the field "Search for Item Vouchers When Entering the Item Code in Sales" in the Supply Chain Settings.
- Added an option in all Supply Chain vouchers named "Allow Saving Without Details".

### Sales

- Added the document "Vouchers Sales Order".
- Added the file "Sales Vouchers Coding Method".
- Added each of:
  - Tourism Service Item
  - Tourism Service Percentage
  - Tourism Service Calculated From

  in the Sales Settings, in the Invoice Effect window, for calculating Tourism Service items.

### Settings

- Added the ability to run reports in AG Grid, to take advantage of its speed in receiving and displaying data.
- In Fields & Screens Settings - the Field Formats grid - added an option named "Prevent Leading Space" and another option named "Prevent Trailing Space". On save, the system rejects a leading or trailing space according to the options mentioned.
- In the Fields & Screens Settings screen - in the Clear On Duplicate grid - added a column named Applies To, containing a list with the following options (All Files - Documents - All Screens).

### Accounting

- Added an option with the code ignoreAndRoundAmountIfScaleIsInvalid in the Tax Authority Settings screen.
- Added the field "Customer Bears the Expenses on Receipt" in the Payment Method.

### Human Resources

- Added the Dimensions to the lines in the Official Holiday.
- Added the option "Allow Adding Insurances Manually Without an Insurance Offer" to each of the following documents:
  - Insurance Company Accreditation Voucher
  - Add Employee to Insurance Voucher
  - Insurance Upgrade Voucher
  - Delete Employee Insurance Voucher

### Point of Sale

- Added a permission named "ReadSalesInvCodeInReturnsUsingScannerOnly"; through it, a line can be added to the lines of the Point of Sale Permissions file to enable this permission.
- Added a permission named "CanDisplayReturnedLinesWhenSelectingInv", and a line was added by default in the Point of Sale Permissions file.
- Added a permission named "CanSelectSalesInvoiceInReturns", and a line was added by default in the Point of Sale Permissions file. The line can be deleted so that the search cannot be opened in the Invoice field in the Point of Sale Return screen.
- Added the option "preventShiftCloseOnUnusedCreditNotes" in the Point of Sale Settings.
- Removed the coding prefix for Point of Sale invoices (1) and returns (2), and so on, so the code in Nama can be the same as the Point of Sale documents' code.
- When Credit Notes are enabled in Point of Sale, added a reference to the Credit Note number in the Point of Sale Return (suggested in the Payment Vouchers' lines), and created a mechanism for making a different journal entry to add an accounting effect when creating a Credit Note based on a Sales Return.
- Created a Notifications icon in Point of Sale that shows the current number of notifications; clicking it shows a screen with the notifications, in addition to the program's existing behavior of showing notifications on the right side of the screen.
- Created a checkbox in the Point of Sale Settings named "Notification Content"; it can be unselected so the notification content is not shown on the right side of the screen and notifications are shown only via the Notifications icon.
- Added an option in the Discount Voucher named "Consider the Voucher's Branch Dimension When Redeeming".
- Added an option named "Allow the Customer to Pay More Than the Invoice Net with Non-Cash Payment Methods" in the Register file and the Point of Sale Settings.
- Added a button named "Make a Return After Exceeding the Allowed Return Period", with the shortcut ctrl+r.
- Added a permission named "Ability to Make a Return After Exceeding the Allowed Return Period".

### Project Management

- Added a document named "Project Invoice Return", the reverse of the Project Invoice document CPAProjectInvoice - the same data, but with the journal entry reversed.

### Contracting

- In the Subcontractor Contracting file group, added a new screen named Subcontractor Offer.
- In the Contracting Price List, added the ability to save without a Standard Item.

### Manufacturing

- In Standard Operations, added a new field to the Operation Resources lines named Maximum Quantity per Lot, used when the costing basis Lot is selected; it is also added to Operations and Production Orders, and the number of lots in the Resources voucher is determined based on it, rounded up to a whole number. Example: a resource with a Maximum Quantity per Lot of 2 tons and a Production Order quantity of 9 tons - the number of lots is 9/2, which equals 4.5 ≈ 5.

### Mobile Applications

- Improved Stock Transfer Receipt so that the following data is copied when selecting the Stock Transfer Issue document:
  - warehouse=toWarehouse
  - locator=toLocator
  - toWarehouse=sendToWarehouse
  - toLocator=sendToLocator
- Added a field in the Combined App Settings to determine the time taken to execute a request from the mobile app.
- Added an option in the Combined App Settings named "Do Not Update the Prices and Discounts of Items Copied From, Based On, in the Sales Return".
