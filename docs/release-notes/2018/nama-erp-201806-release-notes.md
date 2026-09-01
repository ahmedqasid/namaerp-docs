# Nama ERP Release Notes - June 2018

::: info Release Information
**Release Date:** June 2018  
**Release Number:** 201806
:::

## Additions

### Inventory
- Added the option **"Show deactivated items"** in the Distribution Management settings.
- **Item File:** Added the field Expiry Date for the expiration date.
- **Price List Amendment Voucher:** Added the improvement so that the amendment is applied only to active price lists.
- **Stock Taking Voucher:** Added the option **"Adjust the cost price during stock taking"** to the document header.
- Added the options **"Automatically create a supply voucher for the stock-taking surplus"** and **"Automatically create an issue voucher for the stock-taking shortage"** to the Stock Taking Voucher term config.
- **Item File:** Added the Alternative Code for the item.

### Sales
- **Sales Invoice:** Added the option **"Prevent editing item prices"** to the document header.
- **Sales Order:** Added the option **"Prevent editing item prices"** to the document header.
- **Quotations:** Added an offer on the category (item quantity).
- Added **"Free quantity"** to price offers.
- **Sales Invoice:** Added the option **"Prevent changing the item quantity to less than the original quantity"** to the document header.
- **Sales Order:** Added the option **"Prevent changing the item quantity to less than the original quantity"** to the document header.

### Purchasing
- **Purchase Invoice:** Added the field **"Due Date"** to the document header.
- **Purchase Order:** Added the option **"Prevent editing item prices"** to the document header.

### Accounting
- **Journal Entry Voucher:** Added the option **"Prevent duplicate reference numbers"** to the document header.
- Added the other side of the tax to the Receipt Voucher and Payment Voucher.

### Service Center
- **Job Order:** Added the option **"Prevent editing item prices"** to the document header.
- **Job Order:** Added the option **"Prevent changing the item quantity to less than the original quantity"** to the document header.

### Human Resources
- **Payroll Voucher:** Added the option **"Print the monthly statement with the voucher"** to the document header.
- Added the following fields to the Human Resources settings:
  - Treatment of lateness and early-leave days for a single employment record (one Data Update Voucher) during the period.
  - Basis of lateness and early-leave days for a single employment record (one Data Update Voucher) during the period.
  - Treatment of lateness and early-leave days for multiple employment records (more than one Data Update Voucher) during the period.
  - Basis of lateness and early-leave days for multiple employment records (more than one Data Update Voucher) during the period.
- **Payroll Voucher:** In some cases, Time Attendance items such as lateness and early leave do not appear.

### Manufacturing
- **Planning Document:** Added the option **"Prevent editing item prices"** to the document header.

### Contracting
- **Term Analysis Card:** Added the option **"Prevent editing term prices"** to the document header.
- **Assay Voucher:** Added the option **"Prevent editing term prices"** to the document header.

### Point of Sale
- Added the ability to display the expiration date for items in Point of Sale.
- Added settings to specify the display format of the expiration date.

## Settings

- Added the option **"Prevent creating documents in closed accounting periods"** in Global Config.
- Added the option **"Allow editing documents in closed accounting periods"** in Global Config.
- **Scheduled Task:** Improved the mechanism for sending emails for scheduled reports.

## Fixes

### Inventory
- **Stock Taking Voucher:** Fixed an issue where saving the voucher with items at zero quantity created lines with incorrect values.
- **Item File:** Fixed an issue where, after adding a new item and saving it, then adding an alternative code, the save did not work correctly.

### Sales
- **Sales Invoice:** Fixed an issue where applying a price offer on an item quantity did not calculate the free quantity correctly.
- **Sales Order:** Fixed an issue where copying a Sales Order to a Sales Invoice did not take into account the options set on the order.

### Purchasing
- **Purchase Invoice:** Fixed an issue where saving an invoice based on a Purchase Order did not copy the due date correctly.

### Accounting
- **Journal Entry Voucher:** Fixed an issue where enabling the "Prevent duplicate reference numbers" option showed an unclear error message.
- **Receipt Voucher:** Fixed an issue where applying a tax on the voucher did not calculate the other side of the tax correctly.

### Human Resources
- **Payroll Voucher:** Fixed an issue where printing the monthly statement did not show some of the required data.
- **Payroll Voucher:** Fixed an issue where lateness and early-leave days were not calculated correctly in some cases.

### Point of Sale
- Fixed an issue where displaying the expiration date did not validate the specified format.
- Fixed an issue where searching for an item by expiration date did not show warnings for expired items.

## General Improvements

- Improved system performance when dealing with large price lists.
- Improved the mechanism for displaying warning messages to users.
- Added the ability to customize warning messages according to the document type.
