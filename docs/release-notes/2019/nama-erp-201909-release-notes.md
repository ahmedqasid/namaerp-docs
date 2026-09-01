# Nama ERP Release Notes - September 2019

::: info Release Information
**Release Date:** September 2019  
**Release Number:** 2019.09
:::

## Additions

### Inventory
- Developed an entity flow named `EAPreventRepeatedItems` to prevent saving distribution documents if an item is repeated on two or more lines.
- Added new fields (Color - Size - Version...) to the vendor codes and customer codes lines, in the Custom Codes screen inside the Item file.
- Added the following options to the Distribution Management settings:
  - Allow creating a preliminary invoice before creating the Letter of Credit
  - Do not verify box matching when linking stock vouchers to invoices
  - Do not verify color matching when linking stock vouchers to invoices
  - Do not verify lot matching when linking stock vouchers to invoices
  - Do not verify dimension matching when linking stock vouchers to invoices
  - Do not verify version matching when linking stock vouchers to invoices
  - Do not verify serial number matching when linking stock vouchers to invoices
  - Do not verify second serial number matching when linking stock vouchers to invoices
  - Do not verify size matching when linking stock vouchers to invoices

### Sales
- Added an entity flow named `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAMultiCustomerSalesOfferCreator`.
- Took the sales return quantity into account in quantity tracking. For example, when a sales return is made based on a sales order, the sales return quantity is returned to the sales order (in the Unreceived Quantity field). To support this feature, the following was added:
  - The option `Use the system table for quantity tracking` to the Distribution Management settings
  - The option `Create all system-table-for-quantity-tracking entries immediately on save` to the term config settings for Distribution Management documents
  - The option `Track quantity with negative values` to the term config settings for Distribution Management documents
- **Sales Offers - Invoice Value Discounts:** Added the ability to apply the offer if the invoice contains an item group or excludes an item group (offer application rules), similar to what exists for free items on invoice value.

### Accounting
- Added the option `Allow changing the subsidiary and account on the lines in Receipt and Payment vouchers` to the accounting settings.
- **Miscellaneous Invoice:** Added the currency and exchange rate at the line level.

### Letters of Credit
- Displayed the link to the shipments file.
- Added the fields (Shipping Line, Loading Port, Discharge Port, Expected Departure Date, Expected Arrival Date, Actual Sailing Date, Bill of Lading, Customs Release Certificate, Documents Delivery Date, Payment Date, Warehouse Arrival Date, Number of Days at Port, Vendor Invoice Date, Vendor Invoice Value, Number of Containers).
- Added lines to the shipments file containing the fields (Container Number - Item - Quantity - Primary Unit - Secondary Unit - Gross Weight - Net Weight - Total Gross Weight - Total Net Weight).
- Added the view icon for the shipment file from within the shipments screen lines in the Letter of Credit file.
- Displayed the dimensions group by default on the main Letter of Credit screen.
- Added a currency field to each of: the Letter of Credit file - Shipments page - Shipment Details, and the Shipments file.
- Changed the shipping line's subsidiary to become a `Related Party` instead of a `Vendor`, for each of: the Letter of Credit file - Shipments page - Shipment Details, and the Shipments file.
- Added the field `Actual Arrival Date` immediately after `Actual Sailing Date`, for each of: the Letter of Credit file - Shipments page - Shipment Details, and the Shipments file.
- Added the option `Allow creating a preliminary invoice before creating the Letter of Credit` to the Distribution Management settings.

### Customer Relationship Management (CRM)
- **Service Contract:** Added text1-2-3-4 at the line level, added `ref` 1-2, and also added sales tax at the line level.
- Added the ability to send text messages using phone numbers from text fields.

### Banks
- The system sometimes allows issuing commercial papers on an exhausted book. This was resolved by preventing coding once the last number has been reached - the field `Prevent Use` will be checked when the last paper is issued. If the last paper is deleted, the Prevent Use field is not automatically uncleared; it must be removed manually. The same scenario was applied to books and groups as well.
- **Bank Reconciliation Statement:** Introduced the following improvements:
  - Added the button `Calculate Totals`
  - Added the field `Difference` to the bank transaction lines and the system transaction lines
  - Added a total-difference field among the totals fields

### Contracting
- Created a `table system` named `ContrCostExecutionEntry` and made the following improvements:
  - In the Contractor Contract Fine document, in the fine details, added the Project Term Code field
  - In the Contracting Cost Execution document, in the details, added the Fines field alongside the other cost fields
  - Created a new `entry system` for costs, replacing the old method with the new one through this entry
  - Displayed the entry information on the Project Contract via a `listView`
- Added the two files (Estimated Budgets, Executive Budgets).

### Human Resources
- Added a new function named `exactWithDifferentDays#` to attendance and departure import, allowing lines with a `Type Check` to be imported consecutively regardless of the days' dates.
- Added a new table to the `Vacation Type` file, to set a time period before registering a `Leave Request` or `Leave Voucher` (or after registering the leave - in the case of casual leave), so that the system refuses to register the leave if the period before submitting the leave is longer than this period.
- Added the selection list `Exemption from Fingerprint` to the Employee, Job Grade, and Job Position.
- **Dues Liquidation document - Termination Liquidation page:** Added the field Service Duration Days (Manual) - used to enter the number of days on which the liquidation is to be calculated.
- **Dues Liquidation document - Termination Liquidation page:** Added a list for the termination liquidation days calculation method, containing the two options (Total Work Days, Manual Service Duration).
- **Vacation Type:** Changed the option `Without Salary` to be `Without Salary, Deducted from End of Service`.
- **Vacation Type:** Added the option `Without Salary, Not Deducted from End of Service`.
- Created a new voucher named `Opening Vacation Balance`.

### Customer Relationship Management (CRM)
- Added `Whatsapp` as a service provider in addition to SMS, to be able to message customers through the app.
- Added the ability to view development requests through a link on `com.namasoft`, for example: `https://namasoft.com/reqs/ECDR03269`.
- Added the field `Phone Number Correction Query` to the Global Config.

### Project Management
- Prevented the user from saving a Task Execution voucher in two cases (when the task's actual time exceeds the planned time, when entering a task that has already ended).

### Real Estate
- Added the option `Copy the paid amount from installments when creating a sales contract based on a preliminary sales contract` to the Real Estate settings.
- Added tax 1 and 2 percentage, and a Net after Tax field, for the lines, and also added Total Tax 1 and 2 and a Total after Tax field for the header.
- Added the grid `Installment types excluded from being added to the total sales contracts` to the Real Estate settings, containing a list of expense types.

### Point of Sale
- The price in the Point of Sale database has only two decimal places. Improved so it can have more than that.

### System Reports
- Added a report for stagnant items from a specific date, with the ability to deduct purchases, named `SYSR-INV022`.

### Settings
- Improved so that scheduled tasks do not run when `tomcat` starts.
- Added the ability to do `Multiselection` in the `Reports Excluded` part of the Nama license, with the reports ordered by code.
- Added the field `Used only if added in the preferred sender` to the Global Config file - `Mail & SMS` page - `Outgoing Mail Settings` table.
- Suggested the preferred sender according to the mail and SMS settings, in the alerts and scheduled tasks files. Also added the preferred sender to the Approval Definition screen.
- When writing the email in the email settings, improved so that if it ends with `@gmail`, the `SMTP` server for `gmail`, the port number, and `SSL Use` are set automatically, to make it easier to enable the sending email.
- Added the field `Phone Number Correction Query` to the Global Config - Mail & SMS page - SMS Settings table, to take the country code into account (especially for WhatsApp).
- Added a new field to the Global Config named `Show records the current user has edit permission for, in addition to records they have view permission for`, to restore the old method should a customer need it.
- Added a new file named `Performance Tuning Settings`, in which you can ignore dimensions when searching, or view permission, for specific record types.
- Added the ability to do a `Recommit` for selected records in `BizRequestView`.
- Added the ability to change the date from Gregorian to Hijri in (`Word templates`) for printing.
- Added a new entity flow named `EASaveRecordsFromQuery`, that saves records selected by a query.
- Added the ability to convert text fields to numbers when used in an `sql` statement, where the following statement can be used:
  ```
  select case when isnull({text1.$tryToDecimal},0) > 0 then 1 else 0 end
  ```
- In the scheduled task and in some entity flows, added the option `Cache Evict` after execution.
- Added the option `Go to the screen where the record was created, when opening it` to the Global Config, so that the copied version is displayed if a search is made by the copied version's code.
- Added the ability to preview attachments of type `PDF` before downloading, so they can be viewed before downloading.
- Developed a method to translate some fields, such as the guarantee type field on the Letter of Guarantee Request screen, when running a scheduled task or alerts using an `SQL` statement, using the following functions:
  - `{translate(text)}`
  - `{translateAr(text)}`
  - `{translateEn(text)}`
- Created a button on the Purchase Order screen with conditions for it to run. When the conditions are not met, it returns to the home page instead of staying on the Purchase Order screen.
- Added the following two functions to the default values of report parameters:
  - `$currentUser()`
  - `$currentEmployee()`
  
  so the current user and current employee can be called through them
- In the `DMSDocument` document, in the `DmsDocumentLine` table, added the following fields:
  - `date1, date2`
  - `description1, description2`

### New GUI
- `Handle create crm trouble ticket from new gui`
- Enabled the About the Program window that appears when clicking the release number.
- Added the ability to export to Excel in the (`View Errors`).
- Supported the shortcut (`Ctrl Alt L`) to show the log.
- Supported the shortcut (`Ctrl Alt I`) to show field data.
- Added the `Export to Excel` feature to the list view.
- **Screen Editing:** Added computed columns to editing a selection list.
- Added an option to the Approval Definition screen named `Allow editing while awaiting approval`, and also added the option `useReturnToPreviousStep` to the Global Config.

### Mobile Applications
- Added the ability to run the Nama app in Arabic in addition to English, with the ability to display the app in more than one language.
- Added an option in the settings that lets the user choose the type of electronic document saved (Request - Voucher) for leaves and permissions. Books must be entered as usual; if the type is not selected, a request will be created instead of a voucher.
- Added `Approval Reason` to the `Approval detail screen`.

## Fixes

### Inventory
- When setting item settings whose type is Service, for items within an item department, the system does not copy the stock type to the item when this department is selected.
- When setting the tax policy for items within an item department, the program does not copy the tax policy to the item when this department is selected.

### Sales
- Sometimes, the system does not allow deleting additional receiving costs on the sales invoice.

### Letters of Credit
- When creating a Letter of Credit with one of the dimensions (Company - Branch - Sector - Department - Analysis Group), the system does not create the shipments according to the same dimensions, but creates them with the General dimensions.
- The preliminary invoice in the Letter of Credit does not take the currency (rate) into account, i.e. when making an invoice for $23,000 and then doing a stock receiving, it takes a cost of 23,000 in Egyptian pounds, when the currency should be taken into account.

### Accounting
- **Miscellaneous Invoice:** When entering a value in the Discount 1 field, the message `Could not perform the action` appears.
- Added a mechanism to `Rebuild` the `dimensionbalance` table, and also specified a range for the period or periods to be rebuilt, as well as the ability to select the company.
- After adding the currency and exchange rate at the line level for the Additional Receiving Costs document and the Letter of Credit Expenses voucher, when searching the currency field the system shows only three currencies, and another currency cannot be selected even if entered manually.

### Settings
- When sending an SMS or WhatsApp message fails, the reason for failure does not appear in `Tasks Pending`'s error description field.
- When creating a license for a new customer, the Banks, Cashier, and Investment Portfolios modules are found within the Accounting module even though they were not selected.
- When the option `Allow text wrapping in tables` is not enabled, the magnifier on the serial number does not open the serial numbers table, and likewise the magnifier and navigation arrow on the item.
- When running a report on a dashboard that has a company parameter with a default company value - the report works fine on its own, but on the dashboard the report shows no result except when re-run.
- Sometimes, when a user has view permission on lists but not view permission on a record, the button `View in the same window` does not work correctly.
- Sometimes, when the option `Show the report if the user is allowed via the permissions table, regardless of other permissions` in the Global Config is enabled, an error appears.
- Sometimes an error appears when creating a new database.
- When there is more than one approval level (more than one step), going back to a previous step and then completing the remaining approval steps causes the document to appear in the Awaiting Approval state.

### Contracting
- Added the following fields to the Daily Labour Book at the line level:
  - Classification
  - Number of days
  - Extra
  - Total number of days (= number of days + extra)
  - Daily wage
  - Total (total number of days * daily wage)
  - Deductions
  - Net (total - deductions) (field already existing)
  
  When none of the fields above is entered, the net is not calculated and is left as entered by the user

### Manufacturing
- When deleting a Production Execution voucher, its effect remains in the system table for quantities and quantity transactions.

### Point of Sale
- An error sometimes occurs when a currency's fraction digits differ from the display's fraction digits for the same currency (display digits are fewer than the database digits). For example, sometimes an invoice is for 44.9999 dinars and shows as 45.000 dinars due to rounding, and when paying 45.000, the system shows an error that the payment is incorrect.

### Human Resources
- An error occurs when `to related` is not selected on the `attendance` screen.
- In the salary calculation formulas - the Factor Calculation field - the factor alone does not work if the calculation method is a single percentage.
- Sometimes, the Salary voucher deducts the sick leave salary for a month other than the salary voucher's month.
- The system indicator type `Mission Allowance` does not work.
- In the formula for the first half-hour of late attendance: the requirement is to ignore the first quarter-hour of lateness, and for the second quarter, the minute is to be counted in pairs of minutes starting from minute 16. In this case, the added value does not work as required.
- The system allows clicking the Import Attendance button without selecting the attendance machine name on the attendance document - and it shows `Could not perform the action` instead of showing a message explaining this error.
- The Opening Vacation Balance voucher does not affect the `SysVacationBalanceByDate` table.
- A problem occurs importing attendance and departure for a shift that runs from 8 PM to 8 AM, where yesterday's clock-out is imported as today's clock-in.

### Real Estate
- The Sales Contract was translated into English with the title `Sale Land` instead of `Contract Sales`.
- The system shows the message `Could not perform the action` when using the `Create Lease Contracts` button on the Aggregated Contracts document.
- **Lease Exemption voucher** has the following two errors:
  - The `Based on` list contains all files, whereas it should contain only the related files
  - The error `Could not perform the action` occurs while saving. Log attached
- **Maintenance Expense voucher:** When saving without specifying a subsidiary or a maintenance term for the line, the error `Could not perform the action` occurs
- **Contract Termination Request** has the following two errors:
  - The system does not pull the property data on the contract when entering the property to be terminated
  - The system allows this document to enter a property, and enter a Sales Contract in the field `Contract to be terminated` belonging to a different property

### Project Management
- **Task Execution document:** When setting a specific task that has no employee assigned, the system accepts the task and saves it; the correct behavior is for the system not to save when there is no employee on the task it contains.

### Banks
- **Bank Reconciliation Statement:** The system does not accept automatic matching if the field (allowed date difference range - `allowedDifferenceInDate`) is empty. Improved so that, if the field is left empty, lines are matched when the dates are equal.

### New GUI
- `The error indicator is not visible (when leaving a required field empty for example, there were a red border earlier before switching to bootstrap4)`
- Alerts do not appear to the user in the New GUI as soon as they occur, but only appear in the section for alert and approval shortcuts.
- The way fields are drawn in popup screens still works the old way.

### Mobile Applications
- An error occurs fetching approvals in the app when there are no approvals in Nama.
- A problem occurs with notifications in the `ess nama` app.

### System Reports
- Modified the `Query` for the report `022INV-SYSR`, so quantities smaller than zero after deducting purchases no longer appear.
- Made some improvements to the report `012INV-SYSR`.
- In the report `002SLS-SYSR`, several parts were modified, most importantly: ignoring invoices that have no stock issue via a parameter, basing the cost on the invoice rather than the invoice line, and totals for the profit and percentage groupings.
- In the report `005INV-SYSR`, when the incoming or outgoing column is `null`, the current quantity grouping does not come through. This was resolved, and also the quantity columns were narrowed and the item name column widened.
- An error appears in the report `012INV-SYSR`.
