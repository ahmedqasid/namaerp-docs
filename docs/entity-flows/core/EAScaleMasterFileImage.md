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

## Important Warnings

### ⚠️ MasterFile Specific Requirements
- Only processes entities of type MasterFile
- Targets the main file attachment only (not other attachment fields)
- Main file must contain actual image data (not just files with image extensions)

### ⚠️ Image Processing Requirements
- Only processes valid image files that can be read by Java ImageIO
- Original main file image is permanently replaced with scaled version
- Uses same scaling logic as EAScaleImage with Graphics2D processing

### ⚠️ Scaling Behavior
- Only scales images larger than target dimensions (preserves smaller images)
- Maintains aspect ratio - actual dimensions may be smaller than specified maximums
- Uses high-quality Graphics2D scaling which may increase processing time

### ⚠️ File and Memory Considerations
- Large images may consume significant memory during processing
- Original image data is lost after scaling (irreversible operation)
- Processing time increases with image size

### ⚠️ Format Support
- Supports common image formats (JPEG, PNG, BMP, GIF)
- Output format matches input format based on file extension
- Invalid or corrupted image files will cause processing errors

### ⚠️ Entity Requirements
- Entity must be of type MasterFile
- Main file attachment must exist and contain LargeData object
- Non-image main files will cause validation errors

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAScaleMasterFileImage`

**Related Actions:**
- [EAScaleImage](EAScaleImage.md) - General image scaling for any attachment field


</div>

