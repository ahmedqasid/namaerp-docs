# Nama ERP Release Notes - March 2024

::: info Release Information
- **Release Date**: March 2024
- **Release Number**: Nama-ERP-202403
:::

## Additions

### Inventory

- A new option was added on the Free Items line for items, named "Do not copy the main item's data".
- The entity flow EARegenInvTransReqFromQuery was added, along with the ability to run an Update Query before performing the Regenerate.
- The option "Do not update the prices and discounts of items copied from Based On" was added.
- A mechanism was added to group Locations in the Supply Chain settings by (Code, First Supply Date, Priority, ...). This was done via the "Group Locations" button.
- A grid was added in the Supply Chain settings, named "Order of Group By fields".
- In the Invoices term config, an option named "Link the invoice in the invoices grid in Receipt and Payment Vouchers" was added.
- The following two fields were added in the Unit screen:
  - Tax Authority code for weight
  - Weight per unit
- In Supply Chain documents, when creating a document based on another document, improved so that the discount field on the invoice total (percentage and value) is copied to the new document.

### Sales

- In the Sales Quotation lines, the option "Free item same as the main item" was added.
- A grid named "Applies To" was added in the After-Sales Quotations settings.

### Point of Sale

- A new permission was added in Point of Sale, named "Ability to use another user's shift".
- A field named "Sound clip path for an item not found" was added in POS Settings, and a default sound was also added. If this sound needs to be changed, the desired sound file path can be entered in the field mentioned above, and if you want to disable the sound, enter "none" in the field mentioned above.
- In the POS Sales screen - Quantity field, when a whole number is entered without decimal fractions, improved so that the decimal digits are hidden if they are zeros.

### Contracting

- Improved the Contractor Extract and the Project Extract so that when the accounting percentage is entered as zero, the system does not change the accounting percentage if its value is zero and zero is entered in the item calculation formula, via a new option in the term config named "Leave the accounting percentage at zero and do not change it to 100".
- The following fields were added in Contracting settings:
  - Copy last branch to the Employee file in field
  - Copy last branch to the Asset file in field
  - Copy last branch to the Vehicle file in field
- In the Items grid found in each of (Estimated Budgets, Executive Budgets, Project Contract), the field "Item quantity executed in Subcontractor Extracts" was added, and this field is affected when the option "Update the item quantity in the budget from Subcontractor Extracts", found in Contracting settings, is enabled.

### Accounting

- 5 additional fields were added to the lines of the Bank Portfolio.
- In the Bank Reconciliation Memo (BankReconciliation) screen, the following three buttons were added to page 2 (Reconciliation):
  - CollectData
  - importBankLines
  - updateUnmatchedPrevLines
- In the Competent Authority field in the Receipt Order Voucher, improved so that the system no longer copies the subsidiary account automatically, because this gives incorrect data in the Financial Paper's data, and consequently in any transaction performed on the commercial paper itself.
- An option was added in the term config to not fill the Competent Authority field on the Commercial Papers lines.
- An option was added in the term config to not fill the Competent Authority field on the lines in the Commercial Papers page automatically, making it possible to leave it blank so it can be filled in manually in case it was forgotten.
- In the Receipt Voucher term config, a new option named "Do not use invoices in Debt Ages" was added.

### Human Resources

- The field (Group) (empGroup) was added in the Update Employee Data screen.
- The field (Employee's Personal Account Bank) (personalAccountBank) was added in the Update Employee Data screen.
- The column (Renewed) was added to the grid in the Aggregate Residence Renewal Request screen.
- The following two fields were added in the Aggregate Residence Renewal Request screen, below the (Group Employees) button:
  - (Maximum number of employees to be grouped):
    - The field accepts a number, to specify a certain number of employees to group when using the (Group Employees) button.
  - (Group residences that will expire within (days)):
    - The field accepts a number, to group employees whose residence has expired or is about to expire when using the (Group Employees) button.
- Improved the Insurance Company Accreditation document - Group Employees, so that [employees] are added from the Medical Insurance Company to the Medical Insurance Company.
- In the Residence Renewal Request screen, improved so that when clicking the Update Data button, the system updates the records for which both (Paid) and (Renewed) are enabled, instead of (Paid) only.

### Settings

- In the (TaxAuthoritySubmissionDoc) document, when grouping documents and grouping again for the same period, the same documents were grouped a second time; improved so that documents that were already sent inside a document are not grouped again inside another document.
- An entity flow was created to send the Tax Invoice as soon as it is saved, and a mechanism to send invoices at the end of the day at a specified time, automatically.
- A GUIAction named (recalculateLines) was added, with the id RecalculateLinesFromDiscountPercentage.
- In the Creator, the ability to click a button or an item from the More menu after finishing entering the fields was added. Example: clicking Save - running the Group Shipments button - and so on.
- Major improvements were added to Loyalty Points.
- In the Approval Definition lines, the following was added:
  - Substitutes | Employee
  - Substitutes | Responsible Type
  - Substitutes | Field
- The field (Show records prevented from use) was added in (Basic Permissions) in each of:
  - the Permissions window
  - the User window
- Updating sqlFields through GuiPostAction is now allowed.
- The following actions were added to the More menu of the TaxAuthoritySubmissionDoc voucher, with the following names:
  - exportCurrentEInvoiceJsonForSelectedLines
  - exportLastSentJsonForSelectedLine
  - recalculateEInvoiceJsonForSelectedLines
- Control over specifying the reference type in the Discussion is now allowed through Fields & Screens Settings.
- A group "Edit Discussion Fields" was added in (Edit Screen) on the (Edit Group Fields) page, to control showing and deleting Discussion fields.
- Control over specifying the reference type in the Discussion is now allowed through Fields & Screens Settings.
- A group "Edit Discussion Fields" was added in "Edit Screen" on the (Edit Group Fields) page, to control showing and deleting Discussion fields.

### Mobile Applications

- In the Captain Order app, the following improvements were added:
  - An about field was added showing the version number
  - A mechanism was added to know the number of devices open online through Nama and Point of Sale
- The Subsidiary field was added to the Purchase Order screen.
- In Nama Mobile for the Delivery Service, in the Delivery Voucher, the following improvements were added:
  - The OTP now contains numbers and letters. Improved so that it can be chosen to be numbers only, or numbers and letters, and so on.
  - The representative's and the customer's signature are now mandatory. An option was added to make it non-mandatory.
- The ability to transfer Electronic Receipt Vouchers to the app if the phone data is cleared, such as invoices and returns, was added.
