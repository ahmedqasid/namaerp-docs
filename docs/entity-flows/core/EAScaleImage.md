---
title: EAScaleImage
module: core
---


<div class='entity-flows'>

# EAScaleImage

**This document was generated using Claude.ai**

## Overview

Resizes image attachments in entity fields to specified dimensions while maintaining aspect ratio. Processes all images in the specified attachment field, filtering by allowed file extensions and only scaling images larger than target dimensions.

## When This Action Runs

Manual execution for image optimization, storage space reduction, or standardizing image sizes for display purposes across system attachments.

## How It Works

1. **Locates image fields** - Finds all attachment fields specified by field ID (supports collections)
2. **Filters by extension** - Only processes files with allowed extensions (jpg, png, bmp, etc.)
3. **Validates image data** - Ensures attachments contain valid image data
4. **Calculates scaling** - Maintains aspect ratio while fitting within specified dimensions
5. **Resizes images** - Uses Java Graphics2D for high-quality image scaling
6. **Updates attachments** - Replaces original image data with scaled version

## Parameters

**Parameter 1:** Scaled Width (Required) - Maximum width in pixels for scaled images

**Parameter 2:** Scaled Height (Required) - Maximum height in pixels for scaled images  

**Parameter 3:** Attachment Field ID (Required) - Field ID containing image attachments (can be in collections)

**Parameter 4:** Allowed Extensions (Optional) - Comma-separated file extensions to process (e.g., `jpg,png,bmp`)

## Database Tables Affected

- **Entity Attachment Fields** - Updates image attachment data with scaled versions
- **Large Data Storage** - Modifies binary data storage for image attachments

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAScaleImage`


</div>