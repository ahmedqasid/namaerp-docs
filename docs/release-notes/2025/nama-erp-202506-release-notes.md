# Nama ERP Release Notes - June 2025

::: info Release Information
- **Release Date**: June 2025
- **Release Number**: Nama-ERP-202506
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- The following options were added to the term config of the Supply Chain vouchers:
  - Always recalculate prices with the color
  - Always recalculate prices with the version
  - Always recalculate prices with the size
  - Always recalculate prices with the unit
- In the Final Product Pricing screen, 5 text fields and six numeric fields were added.
- The field altCode was added to the Item Section screen.

### Sales

- In the Price Lists, the field "Applies to Items" was added in the header and lines.

### Purchasing

- In the Contracting Purchase Request screen, in the Installments grid, the installment code is now generated automatically on save, like the Purchase Order screen.
- The Currency field and the Rate field were added to the lines of the Purchase Price Comparison screen.
- The Purchase Quotations screen was improved so that clicking the Guess Item Names button no longer inserts items that are forbidden to use.
- The following fields were added to the term config of the Group Purchase Request screen:
  - Created Document Type
  - Document Book
  - Document Term Config
  - The button "Create Purchase Quotations for the Selected Vendors".

### Customer Relationship Management (CRM)

- A new document was created in the CRM named Follow up.

### Accounting

- The following two fields were added to Exchange Rates to calculate the equivalent price automatically:
  - Equivalent Purchase Price
  - Equivalent Sale Price
- The option "Automatically Calculate the Equivalent Price" was added to the term config of the Receipt, Payment, and Bank Transfer documents.
- Processing journal entries, quantities, and costs after issuing the Closing Entry was prevented.
- A grid named "Accounts & Subsidiaries Source Settings" was added to the term config settings for the Payment and Receipt vouchers.
- The option "Automatically Create Payment and Receipt Requests" was added to the term config of both the Group Payment Voucher and the Group Receipt Voucher, to automatically create payment and receipt requests.

### Fixed Assets

- A number of attachments were added to the Asset Capitalization Cost vouchers.
- The following two documents were added:
  - Asset Transfer Request document
  - Group Asset Transfer document

### Customer Relationship Management (CRM)

- In the products grid of the "Task" screen, the field "docCategory" was added.
- The following two screens were added:
  - Sub Item Quotation
  - Sub Item Quotation Request
- The following two options were added to the term config of the Sub Item document:
  - Update the Sub Item Quotation
  - Update the Sub Item Quotation Request

### Contracting

- In the Project Extract term config, the option "Consider Tax Values from Previous Extracts" was added.

### Real Estate

- The Tax Policy field was added to the Tenant screen.
- In the Real Estate Broker, 5 attachments were added.

### Letters of Credit

- In the Expense Voucher (LcExpenseDocument), 4 attachments were added alongside the existing one.

### Manufacturing

- An accounting side (Debit/Credit) was added to the Operation Vendor screen in the Manufacturing system, so that this side takes priority in affecting the journal entry in the Vendor Voucher screen.
- In the Group Product Delivery screen, the Carton Materials Planning field was added, like the Production Execution screen.
- In the Close Group Production Orders screen, the Carton Materials Planning field was added, like the Production Execution screen.
- The Carton Order field and the Carton Specifications field were added to the Production Order screen.

### Settings

- The ability to send a WhatsApp message through the company https://waapi.app/billing-plans was added, so that the file is a PDF rather than a link.
- When paying with PaymentTerminal and selecting stop-loading, an improvement was made to resend and match the amount paid based on the same date and within a short time window, and to report back to Nama that the invoice is paid if it was paid on the payment machine but sending the payment information to Nama failed.
- The option "doNotCopyRateFromHeaderToLines" was added to the term configs of (Expense Voucher, Additional Receipt Costs).
- A new field named "creditTransAmount" was added to the lines of the System Journal Entry View.
- The field "Default List" was added to the Company screen.
- The option "Hide Document Codes in the Direct Print Application Log" was added to Global Config.
- In the Delegation document, the system transfers approvals from the employee to the delegated employee. It was improved so that notifications are also transferred using the same mechanism.

### Human Resources

- 5 attachments were added to the Group Bonus voucher and the Group Employee Data Update voucher.
- 4 attachment fields were added to the Business Trip voucher screen, since only attachment field 1 existed.
- In the Leave Type, an option named "Consider the Return Date as the Start of Work from the Leave Reason" was added.
- The following fields were added to the Violation Item screen:
  - Salary Component Group
  - The Component Used to Show the Violation Item in the Salary Voucher
  - The field "Group Violation Vouchers That Have a Component in the Salary Lines" was added to the term config of the Salary Voucher document
  - A listView was added for the period's Violation Vouchers in the Salary Voucher screen.
- A new document named "Exemption from Attendance Indicators" was added.
- The field "Select Salary Transfer Method Type" (Cash / Bank) was added within the Employee Data Update screen, so that employee-specific information can be edited directly through this field from the same data update screen, without needing to go into the Personal Information screen within the Employees screen.
- In the Work Schedule Plan, saving was prevented if there is more than one duplicate line with (From Date, To Date, Priority, Employee).

### Point of Sale

- In Point of Sale New GUI - Compact Mode, the fields (Total Quantity, Total Distinct Item Count, Total) were moved above the invoice data.
- The following options were added to the Point of Sale settings file:
  - Use Delivery Cost with the Reservation document
  - Use the Minimum Item with the Reservation document
  - Use the Service Item with the Reservation document
- The following fields were added to the payment vouchers' effect lines found in the term config:
  - Applies When the Payment Document Matches the Criteria
  - Applies When the Payment Document Matches the Query
- In the Point of Sale Payment screen, the following improvements were added:
  - An option "Do Not Print the Invoice" was added; when selected, the invoice is paid normally but the invoice is not printed after payment.
  - The f5 shortcut now opens the Payment screen without selecting the "Do Not Print the Invoice" option, so the program works as it does now — the invoice is paid then printed.
  - The ctrl+f5 shortcut now opens the Payment screen with the "Do Not Print the Invoice" option selected, so the payment is completed without printing the invoice.
  - This means the f5 shortcut pays the invoice and prints it, while the ctrl+f5 shortcut pays the invoice without printing it.
- The option "Make the Reason for Deleting a Suspended Invoice Mandatory" was added to the Point of Sale settings, to force the user to enter a reason for the deletion.

### Mobile Applications

- In the Stock Taking application - Electronic Stock Taking Committee, the Location | locator was added for the Header fields of the Electronic Stock Taking Committee document in Nama, along with the ability to add it to the Electronic Stock Taking screen in the Stock Taking application.
- 2 attachment fields were added to the application's documents (Advance Request - Business Trip Voucher), with the ability to control their visibility by editing the application screen.
- The field reason and the field allowanceValue were added to the Business Trip Voucher document on Nama Mobile.
- In the electronic Receipt vouchers, in the list view, the Amount, Date, and Type (docType) are now shown, the cash option is shown, and the sort order was made descending by date.
