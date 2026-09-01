# Nama ERP Release Notes - February 2024

::: info Release Information
- **Release Date**: February 2024
- **Release Number**: Nama-ERP-202402
- **File Type**: Monthly Release Notes
:::

## Additions

### Inventory

- In the Item Definition, a Size and Color code was added on the (details | Price Policies) lines, and when it is selected, the size and color are filled in automatically.
- The option "Do not copy the quantity when selecting Based On" was added to all Supply Chain documents.

### Sales

- 4 fields were added to exclude tax in the Loyalty Points settings, and a field was also added to write a Groovy script, to be used as a formula for the line amount total on which the points are to be calculated.
- A field was added to the Payment Method, for settings purposes.
- A coding group was added for the Coupon and the Coupon Book in the Loyalty Points settings.
- A parameter was added in the entity flow for earning STC points, to define settings through the entity flow.
- In Price Lists, a shortcut (Copy Average Cost To) was added, and if it is empty, the calculation is based on the "Affects" field.

### Point of Sale

- In the POS interface settings - for each type (Sales, Return, ...) on the home page, the following was added:
  - A "Maximum Number of Records" field.
  - A Default Sort field (Code, Actual Date).
  - A Default Sort Direction field (Descending, Ascending).

### Fixed Assets

- An appropriate error message is now shown when attempting to delete an Asset Disposal Voucher while a Depreciation document exists for the asset in that status.

### Contracting

- The fields (Net - Contract Number 1 through Contract Number 5) were added to the Contract window.

### Human Resources

- The following two options were added to the Human Resources settings:
  - Allow leaving the Employee blank in Payroll Items
  - Allow leaving the Employee blank in Leaves
- An entity flow was created for when an employee who has 2 shifts in a single day performs a check-in fingerprint for the first shift and a check-out fingerprint at the end of the shift.
- A grid was added in the Salary Voucher term config, named "Search for a Salary Voucher for a previous period when there is no salary for the same period, for the following disbursements".

### Settings

- The action "Compare Two Versions" was added to the More menu in edit screens
- The action "Compare Selected Versions" was added to the More menu in the Edit Log screen
- An option was added that allows saving a file on a general dimension that contains, inside it, a dimension with fewer dimensions. For example, a Vehicle file under a general Department, with a Branch dimension whose Department is not general.
- Some warnings related to the Saudi E-Invoice were fixed.

### Mobile Applications

- Form 1 and Form 2 were added to the Unified App, taking into account that the Note Type field appears within the app in the document.
