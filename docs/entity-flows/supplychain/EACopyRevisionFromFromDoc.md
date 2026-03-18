---
title: EACopyRevisionFromFromDoc
module: supplychain
---


<div class='entity-flows'>

# EACopyRevisionFromFromDoc

**This document was generated using Claude.ai**

## Overview

Copies revision ID and pricing information from parent document lines to child document lines. Ensures consistency of revision tracking and pricing across related documents in supply chain workflows.

## When This Action Runs

Manual execution on documents that have parent-child line relationships, typically when revision information needs to be synchronized from source documents to derived documents.

## How It Works

1. **Processes each line** - Iterates through all document lines
2. **Finds parent line** - Locates the corresponding parent line from the source document
3. **Copies revision ID** - Transfers revision ID from parent to child line
4. **Updates pricing** - For invoice lines, also copies price information
5. **Skips invalid lines** - Ignores lines without valid parent relationships

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Document Lines** - Updates revision ID in specific dimensions
- **Invoice Lines** - Additionally updates price information for invoice documents
- **Parent Document References** - Reads parent line relationships (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyRevisionFromFromDoc`


</div>

