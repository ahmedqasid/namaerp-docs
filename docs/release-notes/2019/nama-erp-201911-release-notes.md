# Nama ERP Release Notes - November 2019

::: info Release Information
**Release Date:** November 2019  
**Release Number:** 2019.11
:::

## Additions

### Inventory
- Added the field `From Unit To Unit` to the Item Unit Adjustment document; when both fields are entered, the unit adjustment is applied to the specified range
- Added the fields (`Additional Location Code 1`, `Additional Location Code 2`, `Additional Location Code 3`) to the line details of the `Stock Taking` document
- **Additional Receiving Costs**: Added the grid for distributing costs across items and warehouses
- Improved the **Item Barcode Renumbering** document so that it takes the analytical mode into account, and added the dimensions (From Analytical Group To Analytical Group and From Analytical Section To Analytical Section)
- Added the field `Additional Container Code` to the **Warehouse Transfer Request** document
- **Cost Price Adjustment Document**: Added the dimensions (From Analytical Group To Analytical Group and From Analytical Section To Analytical Section)

### Sales
- Added the option `Apply the Sales Invoice Discount Offer to Sales Return Invoices` to the **Sales Return Invoice** term config
- **Sales Order**: Added the `Additional Representatives` group, which contains 3 fields (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Quotations**: Added the option `Do Not Calculate the Average Selling Price for Free Items in the Offer` to the Quotations term config
- **Quotation**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Sales Invoice**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- Added the option `Group the Follow-up View by Item and Unit` to the Sales Order term config; when this option is enabled, the system groups the quantities for the same item and unit into a single line
- **Sales Invoice**: In the Customer Information Update table, added a field for the customer's tax number
- **Sales Order**: Added the option `Group Printing by Item and Unit` to the Sales Order term config
- Added the field `Reference` as an optional field on the lines of Sales documents. It can be displayed by editing the screen

### Purchasing
- **Purchase Invoice**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Purchase Request**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Accounting
- **Disbursement Permits**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Voucher Group**: Added the `Additional Representatives` group, which contains 3 fields (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Bank Reconciliation Memo**: Added dimensions to the document header (From Date To Date) so that system transactions are displayed for the specified period
- **Receipt & Payment Vouchers**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Bank Reconciliation Memo**: Added the fields `System Transaction Type` and `System Transaction Group` to the Bank Reconciliation Memo details
- Added the option `Allow Entering a Voucher Group with a Duplicate Line ID` to the Accounting Configuration

### Contracting
- **Contracting Opening Document**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Extract and Disbursement Permits**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Project Contract**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Subcontract**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Service Center
- **Service Center Documents**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Human Resources
- **Salary Voucher**: Added the `Direct Manager Substitute` group as an optional field in the document header; it can be displayed by editing the screen
- **Employee File**: Added the `Direct Manager Substitute` group as an optional field; it can be displayed by editing the screen
- Added the optional field `Work Team` to the Employee File; it can be displayed by editing the screen
- **Electronic Tasks**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Employee File**: Added the `Additional Representatives` group, which contains 3 fields (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Human Resources Documents**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Fixed Assets
- **Fixed Assets Documents**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Real Estate
- **Real Estate Documents**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Contracting Maintenance
- **Contracting Maintenance Documents**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Customer Relationship Management (CRM)
- **Trouble Tickets & Tasks**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Settings
- **User File**: Added the ability to include additional representatives (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Employee File**: Added a `List View` of the master files in which this employee is registered as a representative or an additional representative
- **User File**: Added a `List View` of the master files in which this user is registered as a representative or an additional representative
- **Representative File**: Added a `List View` of the master files in which this representative is registered as a representative or an additional representative
- Added the option `Show Search in Query Results` to the Global Config
- Added the field `Custom Arabic Title` to the Reports File
- Added the field `Custom English Title` to the Reports File
- **Quick Search Settings File**: Added the option `Use Results for the Main File Only`
- **Company File**: Added the `Additional Representatives` group, which contains 3 fields (Additional Representative 1, Additional Representative 2, Additional Representative 3)
- **Branch File**: Added the `Additional Representatives` group, which contains 3 fields (Additional Representative 1, Additional Representative 2, Additional Representative 3)

### Reports
- Attendance Report `004HRS-SYSR`: Added the parameter `Work Team` to the report
- Miscellaneous Reports: Added the ability to search Arabic and English report names in the search box inside the `Report Viewer`
- Additional Representatives Report: Created a new report to display all master files that contain specific additional representatives
- Account Balances Report `004ACC-SYSR`: Added the parameter `From Additional Representative 1 To Additional Representative 1`
- Detailed Account Statement Report `001ACC-SYSR`: Added the parameter `From Additional Representative 1 To Additional Representative 1`

### New GUI
- Added the ability to select additional representatives in all screens that support this feature
- Improved the search interface to be easier to use
- Added support for advanced search in master files using additional representatives

## Fixes

### Inventory
- Fixed an issue where posting an opening stock balance from more than one company only posted the first company's data, and did not post the other companies' data
- **Warehouse Transfer Requests**: Fixed an issue where, when using the Mandatory Locator option without a default locator specified, the locator was deleted from the lines on save, which prevented the save from completing
- **Stock Taking**: Fixed an issue where entering a count quantity lower than the actual quantity did not show the difference in the `Count Difference` column
- **Additional Receiving Costs Document**: Fixed an issue where, when trying to distribute costs across specific items, the items were not displayed correctly in the distribution grid

### Sales
- **Quotations**: Fixed an issue where, when applying a percentage discount to a quotation, the discount was not calculated correctly on free items
- **Sales Order**: Fixed an issue where, when using the print grouping option, items with the same code but different units were not grouped
- **Sales Invoice**: Fixed an issue where, in some cases, entering additional representatives did not save their data
- **Invoice Offers**: Fixed an issue where invoice discount offers were not applied correctly when free items were present

### Purchasing
- **Purchase Invoice**: Fixed an issue where, when applying vendor discounts while price lists exist, manually entered discounts were deleted
- **Purchase Request**: Fixed an issue where, when trying to create a Purchase Invoice based on a Purchase Request, the additional representatives were not carried over correctly

### Accounting
- **Bank Reconciliation Memo**: Fixed an issue where entering a large date period made the system slow to display transactions
- **Receipt & Payment Vouchers**: Fixed an issue where entering additional representatives did not show them in printed reports
- **Voucher Group**: Fixed an issue where, in some cases, a duplicate line ID could not be saved even with the relevant option enabled

### Human Resources
- **Salary Voucher**: Fixed an issue where, when specifying the Direct Manager Substitute, this information was not shown in reports
- **Electronic Tasks**: Fixed an issue where alerts were not sent to the additional representatives linked to the task
- **Employee File**: Fixed an issue where, in some cases, entering the Work Team did not save this information

### Contracting
- **Extracts**: Fixed an issue where entering additional representatives did not carry them over to the linked Disbursement Permits
- **Project Contract**: Fixed an issue where additional representatives were not shown in some contract-related reports

### Settings
- **Quick Search**: Fixed an issue where, when using the "Results for the Main File Only" option, search results did not appear in some cases
- **Reports File**: Fixed an issue where custom titles did not display correctly in all languages
- **Representative File**: Fixed an issue where the master files `List View` did not display all the required data

### Reports
- Additional Representatives Report: Fixed an issue where it did not display all files containing additional representatives
- Attendance Report: Fixed an issue where, when using the Work Team filter, not all the required results appeared
- Miscellaneous Reports: Fixed an issue where searching report names did not work correctly with English names

### New GUI
- Fixed an issue where, when selecting additional representatives, they were not displayed correctly in some screens
- Fixed an issue where advanced search using additional representatives did not give accurate results in all cases
