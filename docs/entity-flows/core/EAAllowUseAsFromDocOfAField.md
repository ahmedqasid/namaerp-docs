---
title: EAAllowUseAsFromDocOfAField
module: core
---

<div class='entity-flows'>

# EAAllowUseAsFromDocOfAField

**This document was generated using Claude.ai**

## Overview

Allows a specific field to be used as a source document reference ("from doc") in document creation workflows. Enables field-level control over document reference functionality.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Specific field in entity forms
- **Purpose:** Enable field for use as document reference source
- **Timing:** On-demand when field access control is needed

## How It Works

Configures the specified field to allow its use as a "from doc" reference when creating new documents from existing ones. This enables users to select this field's value as a source for document creation workflows.

## Parameters

### Parameter 1: Field ID (Required)
- **Purpose:** Identifies the specific field to allow for "from doc" usage
- **Format:** Field identifier string
- **Examples:** `customerRef`, `sourceInvoice`, `originalOrder`

## Important Warnings

### ⚠️ Configuration Impact
- **Field Access:** Changes field behavior in document creation workflows
- **User Interface:** May affect available options in "from doc" selections
- **Workflow Dependencies:** Other processes may depend on field reference capabilities

## Related Actions

- **EAPreventUseAsFromDocOfAField** - Prevents field from being used as document reference

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAllowUseAsFromDocOfAField`

</div>

