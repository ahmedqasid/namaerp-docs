# Nama ERP Release Notes - October 2019

::: info Release Information
**Release Date:** October 2019  
**Release Number:** 2019.10
:::

## Additions

### Inventory
- Added two fields to the term config that can only be used with the `Documents Root`, as follows:
  - `Reserve using the system delivery table`
  - `Reserve from the system delivery table quantity`
- Added the option `Allow changing the item type from Service to Stock and vice versa, after the item has been used in receiving, issuing, and transfer` to the Distribution Management settings.

### Purchasing
- **Purchase RFQ document:** Allowed entering the unit price, and also displayed the document totals fields, which were not previously shown.

### Sales
- In all payment details (`externalPaymentLines`), added the payment date.
- In the Sales and Purchasing price lists, the Update Details button does not update the information (customer, vendor, invoice classification, price selector 1 to 5, the entity flow has been modified).
- `http://bsn.namasoft.com:8080/erp/#edit:id/ffff0001-6662-c79f-2900-1b00ff04feae&view/EDIT&pgid/0&entity/EntityFlow&page/0&pageSize/all&asc/true`, which creates a Sales Invoice based on an Assay, so that it displays the spare parts lines and the services lines (from the Spare Parts page and the Services page in the Assay screen) in the Sales Invoice lines.
- **Sales Offers:** Added the option `Limit the offer to the item that will be issued free, ignoring its quantity`, for the lines of the `Free items on invoice item count` table.

### Accounting
- Added the feature `Create financial papers from a Financial Paper Opening voucher`, exactly like `Create financial papers from the Payment voucher` and `Create financial papers from the Receipt voucher`, in the accounting settings.
- Added the currency to all subsidiary files, and developed the option `The subsidiary's currency must match the account's currency` in the Global Config; saving is prevented if there is an account with a different currency, when this option is checked.
- **Receipt Voucher - Invoices table:** Added the two fields (`n1 - n2`).
- Improved year closing so that when closing a fiscal year, e.g. 2019, and opening another fiscal year, 2020, the profit and loss of the 2019 period is closed to a Carried-Forward Profit and Loss account when viewing 2020, and appears in the 2019 period's profit and loss only. To support this improvement, the field `Carried Journal Entry Voucher` was added to the Year Closing voucher header, and the following fields were added to the Closing Entry term config:
  - Carry the profit and loss account forward to the beginning of the following year
  - Carried journal entry vouchers book
  - Carried journal entry vouchers term config
  - Carried profit and loss account

### Customer Relationship Management (CRM)
- **Service Contract:** Added the tax policy to the voucher's term config.
- **Service Contract:** Added the two options (tax can be edited, allow editing the invoice tax at the line) to the document's term config.
- Added the two files (Competitor Company, Competitor Company Item).
- In the product lines (Sales Lead screen - Contact screen - Sales Opportunity screen), added `Competitor Company`, `Competitor Company Item`.

### Banks
- Added a new voucher to the commercial paper document cycle: Partial Collection. On saving the voucher, the status of the existing papers changes to Partially Collected (a new status), unless the full amount is collected, in which case the status changes to Collected. Also added a voucher with no accounting effect, named `Commercial Paper Receipt Request`, containing a commercial paper table and a note.

### Contracting
- **Estimated and Executive Budget window:**
  - Inserted the default currency automatically when opening the budget
  - Also, when a project is selected, the customer name is inserted automatically
- Added a new document named `Contractor Advance Payment`.
- Added a list view of advance payments to both the Extract and the Advance Payment voucher.
- Added the field `Contractor Advance Payment` to the conditions lines in the Extract.
- **Subcontractor Extract and Project Extract:** Added the fields (`N1 N2 N3 N4 N5`) at the line level.
- **Contractor Contract Fine:** Added the fields (`n1,n2,n3,n4,n5,text1, text2, text3, text4,text5`) to the lines.
- **Estimated Budget:** Modified the Executive Budget code so that, when viewed, the term code and term description appear, not just the code.
- Improved the Payment and Receipt vouchers based on an Extract, so they insert the details specific to the Extract.
- Added the option `Add main term codes when suggesting terms` to the Contracting settings, so that when the user selects a specific sub-term in the Extract screen, the related main term appears; and likewise, if there is a main term linked to it, it also appears.
- **Subcontractor Extract and Project Extract:** Added the two fields (Previous Value, Total) to the conditions grid.
- **Estimated Budget:** Added a column showing the term linked to it in the Executive Budget, even if more than one term - all the terms are shown.
- Added the following fields to the vouchers (Contractor Contract Fine - Project Contract Fine - Contractor Material Issue):
  - Payment method (Next Extract - Final Extract - Percentage of Extract - Value from Extract)
  - Payment percentage
  - Payment value
  - Term code
  - Condition
- When creating a Project Contract based on an Assay, the cost price found in the Assay is inserted into the unit price and the cost price in the Project Contract. Improved the system so the unit price is inserted into the unit price, and the cost is inserted into the cost.
- Modified the system so that when creating a Project Contract based on an Assay, it takes the selling price instead of the cost price.
- Added the letter of guarantee to the standard terms, and also displayed it in the Subcontractor Extract and the Client Extract when aggregating the extract's conditions.
- In both the `Subcontractor Extract` and the `Project Extract`, added the total quantity at the line level, as a manual quantity.
- In both the Estimated Budget and the Executive Budget: created a button to group the Executive Budget terms at the line level.
- In both the Subcontractor Extract and the Project Extract, created a button to group the terms.
- In the Project Contract, added the Estimated Budget and the Executive Budget as a source, so that when either is selected in the Project Contract, the budget's terms are aggregated into the contract.
- In the Estimated Budget and the Executive Budget, in the Executive Budget term code field and the Estimated Budget term code field, added the ability to search by the term description.
- Added the option `Automatically group payment vouchers on save` to the Extract term config, which takes one of the options (None - with each extract - with the final extract only). This option is used when the extract is final; if enabled, it automatically groups the conditions.

### Human Resources
- To fix some errors that occur with the vacation balance, created a new method to calculate the vacation balance. To use the new method, the following line must be added to the `nama.properties` file: `usenewvacationmethod=true`, and before performing any other transaction, the following `utility` must first be run: `http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps`.
- Added the field `Number of days for vacation allowance entitlement` to each of the following documents:
  - Job Offer document
  - Update Employee Info voucher
  - Employee file
- Displayed the vacation balance on the Aggregated Vacation voucher screen, in the details.
- **Employee Provisions Recalculation voucher:** Added the field `Vacation Balance` to the document details.
- **Salary Component Type file:** Added a new section named `Provisions Calculation`, containing the following options:
  - `Automatic settlement`
  - `A settlement document is created when its value changes`
  - `Use brackets when recalculating employee provisions`
  - `Apply days deducted from provisions recalculation`
- **Cars Insurance Policy:** Added debit and credit for the fee value, and debit and credit for the fee tax, to the document's term config.
- Added the field Paid Vacation Days to the Salary voucher screen.
- **Update Employee Info voucher:** Added Total Additions, Total Deductions, Total Salary, Total Previous Additions, Total Previous Deductions, and Total Previous Salary, based on the salary components listed on the document.
- **Job Offer window:** Added Total Additions, Total Deductions, and Total Salary, based on the salary components listed on the document.
- Added an option to the HR settings named `Calculate the final evaluation percentage based on the total evaluation points divided by the total maximum grades`, to change how the system calculates the final evaluation percentage in the `Employee Evaluation` and `Course Evaluation` windows.
- Added a table named `Brackets` to the `Evaluation Element` file, used for defining evaluations (Good, Very Good, Excellent... etc.) within a specific range.
- **Employee Evaluation and Course Evaluation documents:** Set up both documents so that the system pulls the employee's evaluation into the Result field on each line as soon as the percentage is entered on the line. The system pulls the evaluation from what is defined in the Brackets table in the Evaluation Element file.
- Added a dropdown list named (Exemption from Fingerprint) to the Employee, Job Grade, and Job Position. The list contains the options (Exemption from Departure, Exemption from Attendance, Exemption from Attendance and Departure, None).
- Added the field `Multiplied by, when used in the tax base` to the salary component.
- Added grouping by nationality to each of the windows (Performance Indicator Values, Salary Sheet, Salary Generation Range, Aggregated Job Offer, Health Insurance Offer Request, Annual Increases document, Employment Information, Reward document, Aggregated Penalty).
- In each of (`SalarySheet, PerformanceMeasure`), added text, date, reference, and number fields at the line level.
- Modified how the daily entitlement balance is calculated for the employee, instead of dividing by the number of days in the year, in the `hr` settings, where the first non-empty value is taken (the field found on the employee, Number of days for vacation allowance entitlement - then the number of days in the year in the settings), taking into account whether the field was modified via the Update Employee Info voucher.
- Added the field `Non-working days` to the Salary voucher.
- **Salary Component:** Added the field `Number of days in the month for provisions`. Through it, one of two values is selected:
  - Actual days
  - Fixed days (HR settings)
- **Salary Component:** Created a new group for provisions, and gathered everything related to provisions into it.

### Customer Relationship Management (CRM)
- **Assay window - Spare Parts & Services screen - Services lines:** Added service items instead of the maintenance service.
- **Service Contract document:** Added the options (Taxable, Tax can be edited, Allow editing the invoice tax at the line) to the document's term config.

### Real Estate
- Added the option `Consider taxes in calculating the net installments on payment` to the Real Estate settings.

### Point of Sale
- Added the document classification to `Point of Sale Stock Transfer Request`, so the classification can be selected on the Transfer Request; also added the option `Classification is required in the Transfer Request` to the Point of Sale settings.
- **Point of Sale Settings:** Added the option `Print the last document if there is no open document`, for the case when there is no open document.
- Removed the option `Names are required in Point of Sale` from the Point of Sale settings, and replaced it with the two options (Arabic name is required for the Point of Sale customer, Arabic name is required for the Point of Sale customer).
- Rearranged the fields (Stock Transfer Request book, Stock Transfer Request term config, Replacement book, Inventory Committee book, Service invoices term config), so they follow the books and term configs fields, for a more consistent window.

### System Reports
- Added a report named `002POS-SYSR`, which is invoice profitability with Point of Sale invoice profitability added, to the system reports.
- Added a report named `024INV-SYSR`, for sales invoices and their linked stock issue vouchers, to the system reports.
- Added a report named `023INV-SYSR`, detailing issue vouchers and their invoices.
- Modified the unit price and total to be net, on the `004PIV-SYSF` screen template.
- In report `010SLS-SYSR`, added a parameter and a second part to the query, to filter by items that have no price in the price lists and are not prevented from use.

### Settings
- **Fields & Screens Settings:** Added a new table named `Text Fields Converted to Links`. When a field is entered into this table, the system adds a link icon to the link found as text in this field, so a link can then be added to reach it.
- Added `filters` to the group file, as it exists in the file but is not shown.
- Added the following fields to the Global Config - `Reporting`:
  - `Reports Footer Note 1`
  - `Reports Footer Note 2`
  
  which can be used as a parameter in the `Jasper Report`
- Adjusted how the entity flow `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem` runs, so it works on items without a real source, not all items.

### New GUI
- Added a dedicated bar to make it easier to enter and insert a new line on mobile devices (iPad and tablet); also enlarged the magnifier for easier tapping, and displayed the item name below the item image.
- Added a `box check` - always show the search part - next to each of (Any Condition - All Conditions), which already existed.
- Adjusted the criteria and sorting fields so they are more consistent, and reduced the spacing between them.
- Supported displaying items as buttons - in the same style as Point of Sale - in the search window. To support this feature, the following data was added to the `Item Settings` window:
  - The field `Item button height`
  - The field `Item button width`
  - The option `Display items as buttons at the last search level`
  - The field `Maximum number of item buttons that can be displayed`
  - Added a grid dedicated to the item levels shown in the search, working on the same concept as favorite items in Point of Sale

### Mobile Applications
- Added the following fields to the alert definition and approval definition:
  - Alert title
  - Alert content
  - Send alerts to mobile apps
  
  used to determine the shape of the alert sent to mobile apps
- Mobile alerts are not sent instantly.
- Added `Dashboards` to the `ESS NAMA` mobile app.

## Fixes

### Inventory
- The reservation quantity always shows as zero in messages issued from system documents.
- On the Sales Order, the quantity is reserved along with tracking the second quantity in the Issue, but when editing the Sales Order after the quantity has been fully issued, the quantity gets reserved.
- Processing sometimes fails with some Stock Valuation vouchers.
- Sometimes, when saving a Stock Transfer voucher, processing fails.
- Sometimes, the system does not allow deleting additional receiving costs on a sales invoice.
- Sometimes, an error occurs while deleting an Inventory Committee document that has no term config.
- On the Stock Receiving voucher's term config, the two fields with the same name were added: (Additional Costs Debit, Additional Costs Debit), instead of (Additional Costs Debit, Additional Costs Credit).

### Sales
- The error `Could not perform the action` occurs when writing a non-existent item code on the Sales Invoice.
- **Sales Offers - Free items on invoice item count:** When creating an offer where taking one unit of an item and one unit of another item within the offer makes the cheaper one free, taking multiples into account: in this offer, when saving, the offer applies correctly, but the problem is that when editing by decreasing the paid item's quantity or increasing the free item's quantity, the program calculates more free items than the paid item; the correct behavior is to recalculate the offer after the edit, along with the quantity change.

### Accounting
- A processing problem occurs where the journal entry, whose lines are all in dollars, is nevertheless unbalanced in dollars because the customer changed the rate from one line to another - and the system puts the difference between debit and credit on the first debit line, because the entry is on a single currency. Prevented calculating the difference between debit and credit if the lines' currency is not the local currency.
- **Accounting Side window:** The feature `Select the account from the bag by currency and account type` does not work with the term config for the Service Purchase Invoice document.
- When registering a Debit Note for the first time for the full value based on a Sales Order, then editing the note's actual date after the first save, the message `The remaining amount in the invoice............ cannot be a negative value` appears, even though the Sales Order shows the total paid at the note's full value after the first save.

### Settings
- **Screen Editing window - Add Pages block:** When writing the Arabic name, English name, and `id resource`, the system objects to the `id resource` field, showing a message that this field must be empty; and when the `id resource` field is deleted, the system objects that this field is empty. The system filters the book according to the user's dimensions and ignores books set to General.
- The amount-in-words sometimes displays incorrectly. For example, the system shows (a thousand and a million) instead of (two thousand and two million).
- Errors occur in unit conversion handling in the `Table System Delivery`.
- There is slowness in the system when running the scheduled task for attendance and departure, when using `alternatingWithAttendancePlanPunch`.
- Added the following options to the Distribution Management settings:
  - From the term config's tax policy, then the item, for all taxes
  - From the item's tax policy, then the term config, for all taxes
- Changed the option name from tax policy to the following, for clarity: 1 and 2 from the item's policy, and 3 and 4 from the term config.
- When creating an entity flow that makes one table equal to another using `[details2]=[details]`, the excess lines beyond the number in `details2` are not deleted.
- **Permissions:** When creating action permissions, the error message `Could not perform the action` appears.
- Sometimes, the system calculates an absence for the employee despite an attendance and departure fingerprint being recorded.

### Contracting
- On the Materials Issue and Supplies Purchase Invoices for contracting, when selecting the Estimated Budget term code, the term description does not come down.
- On the Daily Labour Book, when selecting the term code in the cost-distribution line, the term description is not inserted.
- On a Project Contract, Contractor Contract, Contracting Price Quote, and Assay, and any document that uses sub-terms, the field `totalBeforeTaxes` is the total sum of the values of the `totalPrice.terms` column, taking the main terms into account, which is incorrect; the correct behavior is not to take the main terms into account when calculating the fields `totalBeforeTaxes` and `totalAfterTaxes`.
- In the Contractor Advance Payment document, when creating the payment document and selecting the condition "percentage of each next extract", no values are entered in the Subcontractor Extract document.
- In the Contractor Material Issue document, an error appears when saving as a draft.
- In the Contractor Advance Payment document, the term code at the line level is not enabled; the correct behavior is to enable it, with the ability to select term codes.
- **Fine voucher:** In the payment method list, the option `Percentage of each next extract` should be changed to `Percentage with each extract`; also, the percentage does not work, since when this option is selected, the system does not insert any percentages.
- When selecting "Next Extract" and selecting more than one fine line, say a first line of 100 and a second line of 200, and selecting a total fine of 1000, the 1000 is inserted into the extract - i.e. the system allows the total fines to exceed the total of the fine lines.

### Manufacturing
- The error `Could not perform the action` appears when closing a Production Order.

### Service Center
- The entity flow `http://bsn.namasoft.com:8080/erp/#edit:id/ffff0001-6662-c79f-2900-1b00ff04feae&view/EDIT&pgid/0&entity/EntityFlow&page/0&pageSize/all&asc/true`, for creating a sales invoice based on an Assay, was modified so it displays the spare parts lines and the services lines (from the Spare Parts and Services page in the Assay screen) in the Sales Invoice lines.

### Point of Sale
- Some item codes in Nama were changed after those items were sold in Point of Sale; when making a sales return for that invoice, a message appears that items cannot be added manually, because the system considers the items with the new code different from the items with the old code, even though they are the same items with a different code.
- Sometimes, an error occurs when adding a discount to a Point of Sale sales invoice.

### Human Resources
- When creating a (Manual Indicator Values) voucher for employee X, then creating a Cancellation voucher for (the Manual Indicator Values document), then creating a Salary voucher for this employee, the effect of the cancelled manual indicator values still appears for this employee in the Salary voucher.
- **Dues Liquidation document - Termination Liquidation screen:** The system does not take into account the value written in the field (Service Duration in Days, used in calculating the End of Service Liquidation).
- **Dues Liquidation document:** In the journal entry for calculating the liquidation amount, the system calculates the amount incorrectly. Added a new field, Net Components (Net Liquidation), which is what the journal entry takes from.
- When taking a leave, then issuing a Work Resumption voucher a few days after it ends, the system calculates the employee's attendance days count incorrectly.
- **Dues Liquidation document:** When entering the Termination Liquidation screen and selecting the last working day date, the attached log appears.
- When using `alternatingWithAttendancePlanPunch` in attendance and departure, and there is a shift with no working days at all, an error appears.
- Sometimes, the system does not calculate the number of days correctly (from Salary vouchers, vacation balance).
- An error sometimes occurs when issuing the Salary voucher.
- When creating an Aggregated Vacation voucher that includes an annual leave taken from the balance, with the rest of the leave entered as unpaid leave, an error appears.
- On the Employee screen, or in the Remaining Balance field on the Vacation screen, when querying the balance on a specific day, and this day falls within a particular vacation period, the current vacation duration is ignored and the calculation is based on the vacation before it.
- When running the `utility` specific to the Gulf system with documents saved as a draft, the system takes the saved-as-draft documents into account, which is incorrect.
- An error occurs in the balance when querying on the same date a previous vacation returns.

### Fixed Assets
- When the option `Add asset-creation columns to purchase and opening vouchers` is checked in the Fixed Assets settings, the system adds the following fields (Asset Type, Asset Arabic Name, Asset English Name, Serial Number, Market Value) to the Purchase voucher, but does not add them to the Asset Opening voucher.
- In the term config for the `Custody Purchase` document, there is the setting option `Create assets if they do not exist`. It is not an asset, and this feature is also not available for custody items; also, there is no page for the deductions effect.
- When performing depreciation vouchers for assets after the opening voucher, then re-saving the opening voucher, an error occurs in the depreciation.
- When there is a single depreciation voucher for an asset, say, and it is deleted, the asset's last depreciation date is not cleared, which prevents it from being depreciated afterward.
- The option `Create assets if they do not exist` was removed from the Asset Purchase term config, instead of being removed from the Custody Purchase term config.
- **Custody file:** The field `Stock Location` should be `Custody Location`, noting that this field is linked to the `Asset Location` file.
- When entering the custody type on the Custody file, the system does not pull the `In-kind Without Price` information onto the Custody file.
- The Custody Purchase Invoice does not update the field `Purchase Date` on the Custody Purchase voucher, even though the field `Purchase Date` is not available to the user.
- The system records the custody's price, coming from the `Custody Purchase voucher`, without adding tax and discount, unlike assets, where the Asset Acquisition Value and the initial book value are net, after adding the discount and tax.
- When specifying a tax policy on the custody item, the system does not pull this tax onto the Custody Purchase invoice.
- When specifying a `tax policy` on the term config of the Custody Purchase voucher, the system removes the tax policy from the term config file when saving the term config.
- Sometimes, an error occurs when saving the term config for the Fixed Asset Depreciation document.

### New GUI
- A problem occurs searching in the list view, in the case of searching by a field such as "based on" or "issued to" in the Payment Request, for example, where the list view hangs when selecting the document type in the list.
- When importing a master file, the program shows the error message `Please choose a file` and does not perform the import.

### Mobile Applications
- When there is an approval definition that sends an email but does not send a regular alert or an `FCM` alert, no `Push Notification` is sent to the `ESS Nama` app.

### System Reports
- The report `010HRS-SYSR` does not work correctly when there is more than one employee and more than one Salary voucher, where each employee should be isolated with each Salary voucher separately.
- In the stock movement statement with cost report `004INV-SYSR`, which includes revaluation by batch number, when grouping by lots, the balance only computes a prior balance for the first lot, and does not show a prior balance for the remaining lots.
