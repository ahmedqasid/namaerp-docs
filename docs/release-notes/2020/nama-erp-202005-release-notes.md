
::: info Release Information
**Release Date:** May 2020  
**Release Number:** 2020.05
:::

# Nama ERP Release Notes - May 2020

## Additions

### Inventory
- **Stocktaking Committee Document**: Added the `Include exposed (negative) quantities` option to the Group button itself (when clicked)
- Created the `Freeze Cost Effect on Accounts` (`FrozenCostAccounts`) file in the Warehouses list under the Files group, to set a specific period during which the effect of costs on accounts is frozen
- Added 3 new additional cost distribution types - distribute to `N1` - distribute to `N2` - distribute to `N3`
- Moved the Subsidiary field to the manual cost distribution lines on items in the Additional Costs document, and also moved the item quantity to the distribution lines; also updated the `originInvoiceLineId` field in the `SystemAddCostLine` table to link the item reference with its quantity
- Improved the system to prevent the user from performing a recommit on the document while it is a draft, when the `Do Not Check Over Draft With Recommit` option is enabled in Distribution Management settings; this option is also ignored while the document is a draft

### Sales
- Enabled the `Comply with Price Lists` option in the Sales Returns term config

### Accounting
- Added the ability to prevent posting a transaction on an account if that transaction exceeds the budget value allocated to the account

### Human Resources
- **Attendance Plan**: Made the priority in the file header not required and the priority in the lines required, and the priority is not copied from the file header to the lines unless it is not zero
- Created a `Migrator` to do the following in the system tables (`SysVacTransactionBalance`, `SysVacationsBalanceByDate`):
  - Change `vacationDocId` and `entityType` to `genericreference` and rename it `owner`
  - Change `workingstartDocId` to `genericreference` and rename it `workStartdingDoc`
- Added a `ListView` for leaves on the Employee screen from the following tables:
  - `SysVacationsBalanceByDate` - for the Gulf localization
  - `SysVacBalanceTransaction` - for the Egyptian localization
- **Job Applicant File**: Added a new choice to the Interview Status field called `Awaiting another interview`
- Added the `Reset` option to both the `Job Offer screen` and the `Combined Job Offer screen`, and to their lines

### Contracting
- **Subcontractor Contract**: Allowed main items to appear in both the Executive Budget item code field and the Estimated Budget item code field
- **Budget Execution Window**: Added the budget prices and quantities when selecting the budget and clicking Group Items

### Hospital Management System
- Added the following fields to the Operations Invoice term config:
  - Debit Operation Opening Cost / Credit Operation Opening Cost
  - Debit Surgeon Fee Cost / Credit Surgeon Fee Cost
  - Debit Assistant Surgeon Cost / Credit Assistant Surgeon Cost
  - Debit Anesthesia Fee Cost / Credit Anesthesia Fee Cost
  - Debit Other Cost / Credit Other Cost
- **Patient Admission Document**: Added a list screen of the Stay Invoices linked to the Admission document
- **Stay Invoice**: Added a list screen of the Medical Supervision Invoices linked to the Stay Invoice

### Manufacturing
- Added a new document named `Finished Product Pricing`
- Added the `Insert the manufactured item when Copied From or Based On is selected` option to Manufacturing settings
- **Planning Document**: Removed the `Document Type` list from each of the `Main`, `Required`, and `Analysis` pages, and replaced this list on the `Purchasing Plan` page with the `Created Purchase Document Type` list, which contains the three options (Purchase Order, Planning Purchase Order, Purchase Request); the list remained as-is on the `Production Plan` page, but under the name `Created Production Document Type`

### Fixed Assets
- Added the `maxCacheSize` property, which represents the maximum amount of information stored in the cache, and the `cacheClearCount` property, which represents the number of items or records to be deleted from the cache. They must be defined in the `properties.nama` file for machines with limited RAM. For example, defining the first property as `maxCacheSize=1000` and the second as `cacheClearCount=400` means that once the number of records in RAM reaches 1000, the system will delete the last 400 (the least recently used)
- Added 5 options to POS settings named (Do not save the last screen for the Sales Invoice - Do not save the last screen for the Sales Return - ... etc.), meaning that the data of the last unsaved screen is not saved. These options should be enabled to save memory
- Added the `Allow creating Depreciation documents dated before (Addition, Exclusion and Partial Disposal) documents` option to the Depreciation document term config

### Point of Sale
- In the new POS interface, did the following:
  - Added a Cash Analysis button to the Shift screen
  - Added the time, date and user to the screens
- Added a new grid named `Favorite Documents` to both the `POS Settings` file and the `Machine`, so a favorite document can be reached by clicking it directly instead of opening the Help menu first
- Added the `shortcutImgBtnsToTextBtns` option to POS settings. This option turns the shortcut buttons (Calculator - Keyboard - Lock Screen ...) and menu buttons from buttons with images and text into text-only buttons
- Changed the layout of the Multiple Payment screen, since the Notes field was very large and took up more than half the screen; the numbers, the keyboard button and the confirm button were moved to the left of the payment methods
- Added Record Classification to the (Favorite Documents) table, allowing the same document type to be repeated when the record classification differs

### Settings
- Included all `Conflicts` in the log field so they can be resolved in translation
- **User Favorites Window**: Allowed the file/document to be repeated if one of the selections, such as the item type or criteria or others, differs
- **Alert Definition File**: Added 7 fields for the days of the week to the (Allow sending messages and email at the following times (and sending them at the earliest possible time if outside these periods)) table, to avoid sending the alert on holidays such as Friday
- Improved the system so that the alert status remains Postponed when using the (Allow sending messages and email at the following times (and sending them at the earliest possible time if outside these periods)) table
- Fixed an issue where importing a report via `Repo Implementation Open` with the `Fetch only audited reports` option checked did not import the report because it was not reviewed
- Enabled the program's main search to search intelligently by `EntityType` in addition to fields

## Fixes

### Inventory
- Fixed an issue where, sometimes, on the Assembly document window and some other windows, the `Operation could not be performed` message appeared
- **Stock Receiving Document**: Fixed an issue where, when issuing a Stock Receiving document based on a Purchase Order, the system allowed inserting a quantity greater than the Purchase Order's quantity despite Quantity Tracking

### Purchasing
- Fixed an issue where Purchase Price Lists did not work correctly with a Vendor Category

### Sales
- **Replacement Documents**: Fixed an issue where, when the `Create Sales Invoices and Returns` option was enabled and an edit was then attempted on the document, the error message `Line number 1 cannot be edited because it has 1 transaction(s)` appeared
- **Replacement Documents**: Fixed an issue where creating a Replacement document, which creates an invoice and a return, was not shown by the system in statistics the way it is for the Issue and Receiving documents
- Fixed an issue where, when using the `Copy Remaining to Paid in Cash` option and the total paid was greater than the invoice net, the remaining amount became negative and was copied to Paid in Cash, and the system did not reject a negative value in Paid in Cash
- Fixed an issue where, when creating an offer on (free items based on the number of items on the invoice) without enabling the (Enable offers based on the number of items on the invoice) option, the system did not show a warning message, making the user think there was an error in the offer itself without noticing the option; the correct behavior is to show a warning message

### Accounting
- **Cashier Receipt Document**: Fixed an issue where, after adding the patient's name and then using Based On an Admission Form or any medical invoice, the system did not filter the invoices or the form for that patient; the correct behavior is that, when a patient is added and Based On is used, the system should take the patient into account when filtering the Based On fields
- Fixed an issue where, on the Receipt Voucher, adding 2 lines for the same customer against different accounts with a value of 500 each, for example, then opening the Invoices page on the Receipt Voucher and grouping the invoices, showed all the invoices belonging to that customer regardless of the amount or account
- Fixed an issue where, sometimes, enabling the options that prevent posting a transaction on an account if it exceeds the budget value allocated to the account caused a problem on the Sales Order even though it has no accounting effect
- Fixed an issue where clicking a button that opens a link in the following format, for example: `{openinnewwindow}https://namasoft.com/reqs/{code}`, caused the system to open the link incorrectly

### Fixed Assets
- Fixed an issue where adding an Asset Approval Costs document term config showed the `Account cannot be left empty` error
- Fixed an issue where creating a Partial Disposal document for an asset did not adjust the installment value, so the first Depreciation document after that carried the depreciation value from before the disposal (i.e. based on the full asset count before the disposal); likewise, canceling the Partial Disposal document left its effect remaining in the `FAproperties` table, which then prevented editing documents prior to it
- Fixed an issue where, sometimes, processing of Depreciation documents failed after a `Reprocess`; also, running a `Recommit` on a Depreciation document was rejected because a later Depreciation document existed, which needs to be fixed; also, deleting the document showed the `Cannot change the asset status` error even though the Depreciation document was the last operation performed on the asset
- Added a new method to the `EAFieldValuesCalculator` entity flow, which can now also be used in `Actions Post GUI`
- Fixed an issue where, sometimes, the Partial Disposal document could not be saved

### Manufacturing
- In the Assembly window opened via the Assembly button on the `Resource Planning` document, the following labels were wrong:
  - `تضمن أوامر الإنتاج`, corrected to `تضمين أوامر الإنتاج`
  - `تضمن سندات الطلب اليدوية`, corrected to `تضمين سندات الطلبات اليدوية`
  - `تضمن سند التوقعات`, corrected to `تضمين سندات التوقعات`
- On the Planning document - Purchasing Plan page, there were the following two errors:
  - The Permit Type list contained the two options (Production Order, Production Order Request) instead of (Purchase Order, Purchase Request)
  - The Document list on the same line contained all documents instead of (Purchase Order, Purchase Request)
- On the Planning document - Production Plan page: in the window's details, the Document list on the same line contained all documents instead of (Production Order, Production Order Request)
- The two fields (Purchase Order Book, Purchase Order Term Config) point to the `Purchase Request` document found in the Purchasing list, when they should instead point to the `Planning Purchase Order` document — however the `Planning Purchase Order` document has no term config to begin with
- The two fields (Purchase Request Book, Purchase Request Term Config) point to the `Purchase Order` document found in the Purchasing list, when they should instead point to the `Purchase Request` document found in the Purchasing list

### Contracting
- Fixed an issue where, in some cases, saving a Subcontractor Contract showed the `Operation could not be performed` error
- **Raw Material Issue Document**: The Statistics page does not include the linked Stock Issue documents
- **Daily Engineering Works Document**: The system does not support searching by item code based on the entered Project Contract, since any value can be entered, which does not help in producing reports on work related to each item on the project
- **Subcontractor Materials Return Document**: The Based On list contains all documents, when it should instead be a search field limited to the Subcontractor Material Issue document only
- **Material Issue Document**: The Based On list contains all documents, when it should only contain the possible documents
- **Subcontractor Material Issue Document**: The Based On list contains all documents, when it should only contain the possible documents

### Point of Sale
- Fixed an issue where, on Return and Replacement invoices, the system did not retrieve the document classification, whether from the same machine or from another machine
- Fixed an issue where, sometimes, the system did not work when starting with the new POS interface
- Fixed an issue where, in the new POS interface, opening a search screen and then using the `Enter` key did not perform the search, especially when columns were selected in the view
- Fixed an issue where, when creating a Sales Offer with a fixed-value discount type, the offer did not work at all, i.e. had no effect on a POS Sales Invoice, but selecting a fixed percentage worked normally
- Fixed an issue where enabling the `maxCacheSize` and `clearCacheCount` properties caused some items to show an incorrect price (zero)
- Fixed an issue where, sometimes, the `threaddump` file did not work correctly when run from the jar file located in the POS folder

### Human Resources
- **Payroll Record Document**: Fixed an issue where, sometimes, clicking the Issue Salary button showed the `Operation could not be performed` error
- **Job Offer Document - Leaves Window**: Fixed an issue where the system refused to save and required entering Custom Leave Days, even though the Leave Type entered has a Leave Balances (Based on Experience) file; the Custom Leave Days field should not be required in this case
- Fixed an issue where, sometimes, saving a Leave document showed the `Leave duration cannot be left empty` message
- Fixed an issue where, sometimes, reissuing salaries by a certain user did nothing, while reissuing by the system administrator worked without problems
- Fixed an issue where, in the Attendance Plan, when attendance was linked to employees via an Employee Group on more than one line, the first line's attendance was added for all employees in the entire system
- Fixed an issue where, sometimes, reissuing the Payroll Record showed an error message that the employee is not on active duty
- Fixed an issue where, sometimes, saving the document as a draft and then reissuing it did not calculate correctly on the first reissue, requiring reissuing again
- Fixed an issue where, in the Attendance Plan, changing the priority in the window header did not change it on the lines
- **Employee Leave Document**: Fixed an issue where selecting the start date after selecting the leave type, or selecting the leave type after selecting the start date, showed the error message (Could not find a Leave document with id `ffff0001-71ee-af2b-1300-0000ff5e46be`, and this id does not exist)
- **Employee Window - Companions & Passports**: Fixed an issue where searching for the Sponsor or trying to open the Customer file resulted in the `Operation could not be performed` error
- Fixed an issue where, clicking Save All Drafts on the Payroll Record while the system found an approval definition for Salary documents, the system ignored the approval and saved the document directly
- Fixed an issue where, in the `ESS` Attendance app, if an approval definition was set up, approval was requested along with clocking in — and a problem occurred when clocking out
- Fixed an issue where creating a Job Offer for an employee who had left via a Termination document and then returned after a period showed an error
- Fixed an issue where changing the leave type on a saved Leave document showed the `Operation could not be performed` error
- Fixed an issue where adding a Leave document for an employee with no Job Offer, and selecting the leave type or the start date, showed the `Operation could not be performed` error

### Hospital Management System
- Fixed an issue where an error occurred on save when configured to issue a Stock Receiving document, in each of the following documents:
  - Supplies Return document
  - Pharmacy Return document
  - Blood Bank Return document
- Fixed an issue where the `Based On` field on the Pharmacy Return document pointed to the Pharmacy file instead of the Pharmacy Invoice
- Fixed an issue where, on the Blood Bank Returns, Supplies Returns and Pharmacy Returns, the Related Documents page showed the incorrect label `مستندات الصرف المخزني` (Stock Issue Documents) instead of `مستندات التوريد المخزني` (Stock Receiving Documents)

### Settings
- Fixed an issue where, in Notifications, using (Alert Content Template) below (Mobile App Notification Templates) sent the regular notification twice to the user on Nama ERP
- Fixed an issue where an error occurred when running a `recommit` on a document that was issued via another document

### Mobile Applications
- Fixed an issue where the Employees app duplicated the notification in the display, so that each notification showed twice when opening the Notifications list. For example, if there are 1,000 Sales Invoice records and each invoice has two lines: when the item name is shown in the List View, each invoice appears on two lines, and only the first 500 invoices are shown. This problem exists in the old GUI and is still present in the new one; when a field from the details is shown in the List View, not all documents are shown

### New GUI
- Fixed an issue where specific items could not be selected when clicking the search lens on the Price List grid
