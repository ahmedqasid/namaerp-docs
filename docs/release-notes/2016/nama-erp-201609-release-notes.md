# Nama ERP Release Notes - September 2016

::: info Release Information
**Release Date:** September 2016  
**Release Number:** 201609
:::

## Additions

### Inventory
- **Keywords:** Made the keyword bilingual, in Arabic and English, and added an attachment at the line level.
- Added the following options within the Item file: (**Has Lots**, **Has Expiry**, **Boxed**, **Purchasable**, **Sellable**, **Manufacturable**, **Returnable**, **Item Type**).
- **Item file:** Controlled the display width ratio of the attached image relative to the Master Group's width ratio.
- Added the following two options in Distribution Management settings:
  - Adding quantities to the search on item properties in Issue documents
  - Adding quantities to the search on item properties in Receipt documents
- Added a new file to Distribution: **Shelf Quantities**, with lines — each line is a `BasicSCDocumentLine`, and the line has the shelf code.
- Changed the driver data at the line level when the driver is changed in the header of the Delivery document, so both have the same driver number.

### Purchasing
- Added **Attachment 1** and **Attachment 2** to each of the following two documents:
  - Purchase Invoice
  - Purchase Return
- Improved so that when creating a Purchase Order based on a Purchase Request, `Date1` at the line level is copied as-is from the Purchase Request to the Purchase Order, with the ability to edit it in the Purchase Order.
- **Purchasing Price Lists:** Added a formula that can be used to add prices for items, similar to the one in Sales Price Lists.
- **Sales Contract:** Added a field to show the difference between the total installments and the remaining amount, for use when creating installments whose total value is less than or greater than the remaining amount, before saving.
- When creating a Purchase Order based on a Purchase Request, improved so the `Date1` field is copied as-is from the Purchase Request, with the ability to edit the date.
- Added the Requester in the Details tab in Combined Purchase Requests, next to the Purchase Request number.

### Accounting
- Added the ability to create installments and create Collect Documents from within the Contract screen.
- Added **Attachment 1** and **Attachment 2** to both the Receipt Voucher and the Payment Voucher.
- Added the document **"Currency Difference Entry"**.
- When creating a **"Receipt Voucher"** based on a **"Service Contract"**, the program does not pull the customer into the Related Subsidiary.
- Added a new document named **"Profit Distribution"**.

### Banks
- In the Letter of Guarantee Amendment document, when the Letter of Guarantee's value is amended to a lower value, an error appears that the value must be greater than or equal to the Letter of Guarantee's value. Added the ability to reduce the Letter of Guarantee, with the reduction entry being the reverse of the increase entry.
- **Financial Paper Opening screen:** Added the following two changes:
  - Allowed saving the document without entering the bank account, since Financial Papers with the status "Received" do not have a bank account specified
  - Allowed using the status **"In a Deferred Bank Portfolio"** on the Opening document
- Added a new document called **"Deferred Bank Portfolio"** in the Banks section, used the same way as the Bank Portfolio but with a different status, **"Deferred Portfolio"**, so the document-cycle order for a received Financial Paper is (Creation - Receipt - Deferred Bank Portfolio (optional) - Bank Portfolio - Bank Notice), allowing the user to create a Bank Portfolio based on the Deferred Bank Portfolio.
- In the Financial Paper screen, improved so that when the paper type is selected as **Promissory Note**, the program accepts saving without entering the due date, the bank account number, or the book.
- **Bank Notices, Receipts and Payments:** Improved so that if it is linked to installments and the total value of the installments does not equal the notice's value, saving is not accepted.

### Customer Relationship Management (CRM)
- **Ticket window:** Added the ability to change the request's status to **"Reopened"**.

### Human Resources
- Added **Attachment 1** and **Attachment 2** to the Request to Add Employee to Insurance document.
- Added the following fields to the `VacationPlanLine` table:
  - `date1`, `date2`
  - `n1`, `n2`
  - `description1`, `description2`
- Updated the Update Document so that employee data is updated in all statuses except (**Resignation** - **Retirement** - **Dismissal**). This is because an employee was on leave and senior management approved a salary-increase request during their leave, and the Update Document could not be saved because they were on leave.
- Added attachments to the Employee Sponsorship Transfer document.
- Added the ability to print the employee's balance when printing the Leave Request and in various reports via `NamaRep`, in report design.
- When terminating an employee's service, the system requires their status to be Active; please allow terminating an employee's service regardless of their status, except for (**Dismissal** - **Resignation** - **Retirement**).
- In the Component Type screen, added the Default Payroll Calendar.

### Real Estate
- Added **"Opening Sales Contract"** to the linked documents for the **"Owner/Buyers"** file.
- **Sales Contract:** Added the Sales Representative, who can be an employee or a related party, with an accounting effect possible on it using **"Seller"** in the term config.
- **Sales Contract, Opening Sales Contract, Preliminary Sales Contract:** Added a manual installment-coding feature via the document's term config, so the user can code the installments any way they like, whether by writing numbers or letters.
- Added the **Ownership Waiver** document.
- **Unit Models:** Added Project and Building, so that when searching for a model from within a Unit, only the models linked to the same Project and Building appear; also translated the word "Model" inside the Unit, since it had not been translated.
- Added the ability to create installments and create Collect Documents from within this Contract screen.
- Added **"Buyer"** to the **"Unit"** file so it can be affected by either **"Sales Contract"** or **"Opening Sales Contract"**... while keeping **"Owner"** in the Unit file.
- **Sales Contracts and Opening Sales Contracts:** In the line for creating multiple installments, added a field called Installment Type to select the installment's type, and allowed leaving the installment period empty, in which case a monthly installment value is assumed.
- Increased the number of attachments in each of the following windows:
  - Rent Contract and Opening Rent Contract
  - the Building screen, the Units screen, and the Combined Units screen
  - the Owner-Tenant screen
  - the Collect Document

### Service Center
- Added the net number of hours to the execution of a Work Order in Service Center.
- Added a **Time Attendance** screen inside Service Center to replace Time Attendance in the HR screens, so a designated employee records the attendance and departure of employees or technicians, calculated on a daily basis.

### Customer Relationship Management (CRM)
- Added a new status to the Development Request: **"Awaiting Reply from the Complaint-Handling Manager"**.

### Fixed Assets
- Added **Attachment 1** and **Attachment 2** to each of the following two documents:
  - Fixed Asset Purchase Document
  - Addition & Disposal Document
- Added the field **"Default Useful Life"** in the Asset Type, so that when creating a Fixed Asset Purchase Document for an asset linked to this type, the useful life is automatically pulled from the type.
- Improved the Fixed Asset Purchase Document so that when the asset is selected, the automatic depreciation start date is the start date of the accounting period following the document's current period.

## Settings

- Added the ability to add a review to close off editing on documents at the last step of the document's approvals.
- Added a feature to print selected records when specific records and files are selected within a given list screen.
- Such as the option to print a barcode for the selected records and design a template for them, customized in the Report Definition screen.
- Improved so that when reviewing approvals, the user can see a link to the attachment; hovering the mouse over it opens the attachment.
- Added the ability to change Quick Help to a double-click on the line header instead of `F9`.
- Added **"Print Selected Records"** to the More menu.
- Added the entity flow `EARunTaskSchedule` to run a scheduled task.
- Added the ability to see the number of current users and their data, such as code, username, name, device used, and login time.
- Put in place a mechanism to limit the number of concurrent users of the program.
- Draft documents did not read `Fields SQL`; this has been enabled for drafts.
- Added the ability to add an entity flow at the line level in the Screen Editor for the Notifications page, so the entity flow runs when the notification button is pressed.
- Added the ability to export a list screen's display to an Excel file without needing to design a report.
- Added the following within Fields & Screens Settings:
  - Controlling field content (numbers only - letters only - letters and numbers), default is letters and numbers
  - Controlling field language (Arabic only - English only), default is both languages
- **Tax Policy screen:** Added From Date and To Date at the line level.
- When creating a template and applying it based on a field, it does not work correctly with the reference field type.
- Added the option **"Show in a Window as the Code Is Typed"** to the **"File Images"** page in Global Config.
- Improved so that when a message fails to go through because of validation based on criteria, the criterion's code is shown in the error message.
- Improved so that when importing Units, if the Unit is linked to a Model and the Unit's area is empty, the area is copied from the Model to the Unit.
- **Permissions file screen:** Added that when, for example, (**Types List**) or (**Master Group in the Lists**) is selected, all the screens available in the list are shown, so different permissions can be given to each screen individually, while allowing more than one list to be selected on the same screen — for example, choosing permissions for a user on the Accounting list, the HR list, and the Inventory list together.

## Fixes

### Inventory
- Fixed the following issues that occurred when using **"Item Classifications"** in Item coding:
  - Selecting **"Classification 1"** or **"Item Section"** first, then selecting **"Classification 2"**, showed an empty error message, even though the Item Section and Classification 1 were linked within Classification 2
  - Selecting **"Classification 2"** first showed the choices correctly, and the program inserted both the Item Section and Classification 1

### Sales
- Fixed an issue where, in some cases, an empty error appeared when creating a Sales Return based on a Stock Receipt.
- Fixed an issue where an error occurred on saving when Credit Limits were enabled for the customer on a different sector while the rest of the dimensions were the same.

### Accounting
- Fixed an issue where, when (**Do Not Suggest Values in Receipt and Payment Lines**) was not checked in Accounting settings and a detailed Receipt or Payment Voucher was created, the account name did not appear when typing the code inside the vouchers.
- Fixed an issue where the option requiring the total to equal the payments in the Payment Voucher's term config did not work correctly.
- Fixed an issue where creating a Receipt Voucher from within a Receipt Request did not copy the amount to the line in the Receipt Voucher.
- Fixed an issue where, in the Receipt Request, the system did not copy the amount into the `localAmount.money` field from the `moneyValueAmount` field, and also did not set the default currency `money.value.currency` or the default rate `money.rate`.

### Banks
- Fixed an issue where creating a Cancel Financial Paper and leaving the rate empty caused the processing to fail.

### Settings
- Fixed an issue where, in some cases, creating a Notification Definition with the targets set to a Permissions file and a specific Permissions file selected did not show the notification or send an email to the users in that Permissions file.
- Fixed an issue where controlling the length and width of image files did not work correctly.

### Human Resources
- Fixed an issue where creating a Reward or Penalty Voucher and saving it as a draft affected the Salary Voucher on posting even though it had not been finally saved, and the same applied to vouchers rejected in the approvals system, which prevented posting and caused a problem.
- Fixed an issue where creating a Salary Record, saving it as a draft, then deleting it did not automatically delete all the Salary Vouchers created based on it.
- Fixed an issue where creating a Combined Job Offer and trying to delete it showed an error that the Combined Job Offer was linked to a Job Offer and could not be deleted, while trying to delete the Job Offer itself showed an error that it was linked to a Combined Job Offer and could not be deleted.
- Fixed an issue where saving an Employee Data Update Document and selecting the document type prevented saving and showed an empty error.
- Fixed an issue where entering an Employee Update Document and selecting one of the employees did not fill in the employee's dimension fields correctly — all dimensions showed a value except the Legal Entity, which showed (**General**) — and on saving, the employee's dimensions were changed to (**General**), as shown in the attachments.

### Customer Relationship Management (CRM)
- Fixed an issue where an error appeared in Technical Support Tickets when viewing the Executions.
- Fixed an issue where saving the **"Ticket Execution"** document showed an empty error message, and where selecting a **"Service Contract"** did not pull in the customer.

### Point of Sale
- Fixed an issue where an error sometimes occurred when logging into Point of Sale.
- Fixed an issue where, after using the `"ESC"` key to cancel an invoice, the user could not enter a discount using the Discount button because the discount field became unavailable.
- Fixed an issue where the quantity `Format` for a free item was different from that for regular items.
- Fixed the following issues that occurred when entering a discount in the invoice such as `28.46`:
  - The system did not accept this value
  - The system did not accept paying the invoice
  - When moving to the Shift screen, the system did not accept returning to the invoice
- Fixed an issue where the fields overlapped when doing `minimize & Restore down` on the screen.
- Fixed an issue where, in some cases, changing the language in the Sales Invoice deleted the invoice details.
- Fixed an issue where, in some cases, changing the language in the Receipt and Payment Vouchers deleted the remark.
- Fixed an issue where the transaction number for a payment method (such as Visa) had no corresponding field in the Point of Sale Sales Invoice in Nama.
- Fixed an issue where maximizing Point of Sale reduced the space for the invoice details, with no way to resize the details back.
- Fixed an issue where the user could post a Receipt or Payment Voucher with a value of zero.
- Fixed an issue where hiding the `(Touch screen panel)` left the fields in the document header `(Not aligned)`.
- Fixed an issue where, in the **Point of Sale Machine**, the user could enter the same order for two different payment methods.
- Fixed an issue where exiting Point of Sale using the **"Exit"** button distorted the fields of the Login screen.
- Fixed an issue where preventing the user from posting a Payment Voucher caused the `F1` key to not open the Receipt Voucher.
- Fixed an issue where, when the user's permission was set so they could not cancel the invoice before saving, they could still do any of the following:
  - Use the `F4` key to create a new invoice
  - Delete all the lines
  - Use the `F1` key to move to another window (such as the payment window)
  - Use the `ESC` key, which returned to the Point of Sale invoice while deleting all the invoice's content
  - Open a previous invoice, thereby deleting all the content of the current invoice
- Fixed an issue where preventing the user from posting a Receipt Voucher caused the `F1` key to open the Payment Voucher, and using the `F1` key again did not open the Point of Sale invoice.
- Fixed an issue in the **Point of Sale Permissions file**, where the label **"Ability to Cancel a Sales Line"** was wrong and should have been **"Ability to Delete a Sales Line"**.
- Fixed an issue where the system grouped similar items together even when some items had a discount and others did not.
- Fixed an issue where calling up an old invoice while a current invoice was open did not warn the user about data loss.
- Fixed an issue where switching to any of the Point of Sale screens warned the user about data loss even though there was no data in the current window.
- Fixed an issue where switching the interface from Arabic to English left the Notes field misaligned with the field above it.
- Fixed an issue where the Notes field was not correctly `(Not Aligned)` in all Point of Sale windows.
- Fixed an issue where, in the Receipt and Payment screens, the system hid the field next to **"Pay To"** when switching from Arabic to English and vice versa.
- Fixed an issue where currencies deleted from the Machines file were not removed from Point of Sale files such as the Shift file.
- Fixed an issue where the Stocktaking window appeared under the name "Item window".

### Real Estate
- Fixed an issue where, in some cases, an error message appeared when creating a Rent Contract.
- **Real Estate Price Lists:** Improved so that more than one price could be set for a Unit.
- **Real Estate Price Lists:** Made the price lists date-ranged (from date to date), taking into account that the price set in the contract will be based on the prices on the booking date.
- Fixed the following issues that occurred when the Unit's Owner was added to the Unit automatically from the Sales Contract based on a prior request:
  - If a Sales Contract was added for a unit for the buyer and the user wanted to edit the Sales Contract, an error message appeared, because the owner in the Sales Contract was not copied automatically and had to be entered by hand before it could be edited
  - If the owner was entered manually and the user wanted to edit the installments in the Sales Contract and made the payments' value greater than the contract's value, the contract accepted saving
  - If the contract was deleted, the owner remained fixed on the Unit and could not be removed except manually

### Manufacturing
- Fixed an issue where creating a Production Order with a unit of measure for the finished product that was not defined in Item coding showed an empty error message.

### Real Estate
- Fixed an issue where the linked documents for the Sales Contract did not work correctly.
