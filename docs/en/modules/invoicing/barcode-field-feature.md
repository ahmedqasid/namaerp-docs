# Barcode Field Feature for Sequential Scanning

## Overview

A new feature has been developed in Nama ERP to solve the problem of losing focus when scanning item barcodes in browsers. This feature allows users to scan multiple item codes sequentially without needing to manually re-focus the field each time.

## The Problem

When using a barcode scanner in browsers, focus is sometimes lost from the item code field and moves to other fields on the screen. This leads to:
- Disruption of the sequential item scanning process
- The need to manually re-focus the field
- Slower data entry

## The Solution: The Smart Barcode Field

### Description

Two new fields have been added to all entities in the system:

| Field | English Name | Description |
|-------|-------------|-------------|
| **Barcode** | Barcode | A large text field used to scan item codes sequentially |
| **Invalid Barcodes** | Invalid Barcodes | A text field that retains codes for which no matching items were found |

### Key Features

#### 1. Automatic Focus Retention
- When the "Barcode" field is activated, the field automatically retains focus
- Focus does not move to other fields even when a scan completes
- Allows scanning an unlimited number of codes sequentially

#### 2. Visual Indicator
- **Green background**: When the field is active and retaining focus, the field background is green
- The green color helps the user know that the field is ready to receive scans

#### 3. Handling Codes Not Found
- When a code not present in the system is scanned:
  - A warning sound plays
  - The code is automatically added to the "Invalid Barcodes" field
  - Focus is retained to continue scanning

#### 4. Automatic Processing
- Each scanned code is automatically processed and added to the details grid
- No additional action is required from the user

#### 5. Multi-line Paste Support
- Multiple codes can be pasted into the field at once (one code per line)
- All pasted codes are automatically processed one by one
- Useful when copying a list of codes from an Excel or text file

## How to Use

### Step 1: Enable the Fields on the Screen

1. Open the desired entity screen (such as: Sales Invoice, Purchase Order, etc.)
2. Navigate to **Customize** → **Edit Screen**
3. Add the following fields to the screen:
   - **Barcode** (barcode)
   - **Invalid Barcodes** (invalidBarcodes) — optional

::: tip Tip
It is recommended to place the "Barcode" field in a prominent location on the screen for easy access.
:::

### Step 2: Start Scanning

1. Open a new or existing record
2. Click on the **Barcode** field
3. You will notice the field background changes to **green**
4. Start scanning item codes using the barcode reader

### Step 3: Sequential Scanning

- Scan codes one by one
- Each item will be automatically added to the details grid
- No need to click the field again between scans

### Step 4: Exiting Scan Mode

To exit the barcode field and move to other fields, use one of the following keys:

- **Esc key** (Escape)
- **F4 key**

::: warning Warning
You will not be able to exit the barcode field by clicking outside the field or using the Tab key. You must use Esc or F4.
:::

## Technical Details

### Field Behavior

| Event | Behavior |
|-------|----------|
| **Click on the field** | Starts focus-retention mode, background turns green |
| **Scanning a valid code** | Item is added to the grid, focus stays on the field |
| **Scanning an invalid code** | Warning sound + code added to "Invalid Barcodes", focus stays |
| **Entering an empty line** | Exits the field and moves to the next field |
| **Esc/F4 key** | Exits focus-retention mode |
| **Enter/Tab key** | Processes the entered code, retains focus |
| **Ctrl+Enter** | Inserts a new line in the text field |

### Usage Requirements

::: info Requirements
- The entity must contain a details grid
- The details grid must contain an **Item Code** column (details.item.itemCode)
- The "Barcode" field must be added to the screen through screen editing
:::

## Frequently Asked Questions

### Can the field be used in any entity?
No, the field can only be used in Supply Chain distribution documents such as sales invoices, purchase invoices, and stock transfers.

However, the fields are available in all entities in the system and may be enabled in other screens in the future.

### What happens if the item is not found?
- A warning sound plays
- The code is added to the "Invalid Barcodes" field
- The field continues to retain focus to continue scanning

### Can codes be entered manually in the field?
Yes, codes can be typed manually. Press Enter after each code to process it.

### Can multiple codes be pasted at once?
Yes, a list of codes can be copied from an Excel file or text file (one code per line) and pasted into the barcode field. All codes will be processed automatically one by one.

### Why can't I exit the field by clicking outside it?
This is by design. The goal is to prevent unintentional loss of focus during scanning. Use Esc or F4 to exit.

### Can multiple codes for the same item be scanned?
Yes, each scan will be added as a separate line in the details grid.

## Tips for Optimal Use

::: tip Tips
1. **Place the field at the top**: Put the "Barcode" field in a prominent location at the top of the screen
2. **Use "Invalid Barcodes"**: Add the "Invalid Barcodes" field to track incorrect codes
3. **Review the list**: After finishing scanning, review the items grid to verify data accuracy
4. **Clear the field**: Delete the content of the "Invalid Barcodes" field after processing
5. **Test the reader**: Make sure the barcode reader is configured to send Enter after each scan
:::

## Additional Notes

::: warning Important Notes
- The "Barcode" and "Invalid Barcodes" fields are system fields but are editable
- The content of the "Barcode" field is not saved — it is a temporary input-only field
- The content of the "Invalid Barcodes" field is saved with the record for later review
- The feature is compatible with all modern browsers
:::

**Release Date**: October 2025
**Request Number**: SRDRQ05899
