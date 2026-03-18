---
title: EAEcommerceUploadQuantityCSVFileToFTPServer
module: magento
---


<div class='entity-flows'>

# EAEcommerceUploadQuantityCSVFileToFTPServer

**This document was generated using Claude.ai**

## Overview

Exports SKU and quantity data from Magento sites to CSV files and uploads them to FTP/SFTP servers. Generates inventory data files that can be consumed by external systems for inventory synchronization or reporting purposes.

## When This Action Runs

Manual execution or scheduled tasks for inventory data export. Typically used for regular inventory synchronization with external systems, third-party logistics providers, or e-commerce platforms that require CSV-based inventory updates.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code
2. **Exports CSV data** - Calls the site's exportCSVForSKUAndQty method to generate inventory data
3. **Handles file pagination** - Splits large datasets into multiple files based on row count limit
4. **Generates file names** - Creates unique file names for paginated files (e.g., items-1.csv, items-2.csv)
5. **Uploads to server** - Uses FTP utilities to transfer each file to the specified server
6. **Manages connections** - Handles FTP/FTPS/SFTP connections with proper authentication

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to export data from

**Parameter 2:** Server URL (Required) - FTP/SFTP server hostname or IP address

**Parameter 3:** Protocol (Required) - Transfer protocol: "ftp", "ftps", or "sftp"

**Parameter 4:** Server Port (Required) - Port number (21 for FTP, 990 for FTPS, 22 for SFTP)

**Parameter 5:** Server Username (Optional) - Username for server authentication

**Parameter 6:** Server Password (Optional) - Password for server authentication

**Parameter 7:** File Name (Required) - Target file name (e.g., "nama-items.csv")

**Parameter 8:** File Rows Count (Optional) - Maximum rows per file for pagination

## Supported Protocols

- **FTP** - Standard File Transfer Protocol (port 21)
- **FTPS** - FTP over SSL/TLS (port 990)
- **SFTP** - SSH File Transfer Protocol (port 22)

## File Pagination Example

If file rows count is set to 1000 and there are 2500 records:
- File 1: nama-items-1.csv (1000 rows)
- File 2: nama-items-2.csv (1000 rows)
- File 3: nama-items-3.csv (500 rows)

## Database Tables Affected

- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **Inventory Tables** - Reads item and quantity data for export (read-only)
- **Item Linker Tables** - Accesses SKU mappings for export (read-only)

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceUploadQuantityCSVFileToFTPServer`


</div>