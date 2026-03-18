---
title: EAScaleMasterFileImage
module: core
---


<div class='entity-flows'>

# EAScaleMasterFileImage

**This document was generated using Claude.ai**

## Overview

Specialized image scaling action that processes the main file attachment of MasterFile entities. Resizes the primary image to specified dimensions while maintaining aspect ratio, specifically designed for master file image standardization.

## When This Action Runs

Manual execution for standardizing master file images, reducing storage space, or ensuring consistent image dimensions for display purposes in master file records.

## How It Works

1. **Accesses main file** - Retrieves the main file attachment from the MasterFile entity
2. **Validates image data** - Ensures the main file contains valid image data
3. **Calculates scaling** - Maintains aspect ratio while fitting within specified dimensions
4. **Resizes image** - Uses Java Graphics2D for high-quality image scaling
5. **Updates main file** - Replaces original image data with scaled version

## Parameters

**Parameter 1:** Scaled Width (Required) - Maximum width in pixels for scaled images

**Parameter 2:** Scaled Height (Required) - Maximum height in pixels for scaled images

## Database Tables Affected

- **MasterFile Tables** - Updates main file attachment data with scaled version
- **Large Data Storage** - Modifies binary data storage for main file attachments

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAScaleMasterFileImage`

**Related Actions:**
- [EAScaleImage](EAScaleImage.md) - General image scaling for any attachment field


</div>