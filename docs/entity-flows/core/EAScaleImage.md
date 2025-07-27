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

## Important Warnings

### ⚠️ Image Processing Requirements
- Only processes valid image files that can be read by Java ImageIO
- Attachments must contain actual image data (not just files with image extensions)
- Original images are permanently replaced with scaled versions

### ⚠️ Scaling Behavior
- Only scales images larger than target dimensions (preserves smaller images)
- Maintains aspect ratio - actual dimensions may be smaller than specified maximums
- Uses high-quality Graphics2D scaling which may increase processing time

### ⚠️ File and Memory Considerations
- Large images may consume significant memory during processing
- Original image data is lost after scaling (irreversible operation)
- Processing time increases with image size and number of attachments

### ⚠️ Format and Extension Handling
- Supports common image formats (JPEG, PNG, BMP, GIF)
- Output format matches input format based on file extension
- Invalid or corrupted image files will cause processing errors

### ⚠️ Field Configuration
- Attachment field must exist and contain LargeData objects
- Field can be in entity header or detail collections
- Non-attachment fields will cause validation errors

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAScaleImage`


</div>