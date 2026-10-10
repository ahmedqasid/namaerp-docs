---
title: EASCSpreadOriginDoc
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASCSpreadOriginDoc

## Overview

Spreads origin document lines for details that have an origin document but no item. A user can add one line that only names an origin document, and the action replaces that line with all the lines of the origin document. This makes it quick to pull several source documents into one supply chain document.

## When This Action Runs

Attach it to a supply chain document's save event (before save). It changes the lines of the record being saved.

## How It Works

1. **Scans the lines** - Goes through every line of the document in order.
2. **Finds placeholder lines** - A line with an **Origin Doc** filled and no item is treated as a placeholder.
3. **Replaces placeholders** - Each placeholder is replaced, in the same position, by copies of all the lines of its origin document (item, quantities, prices and other line data). Fields listed in the current term's "do not copy with From Doc" setting are skipped.
4. **Keeps everything else** - Lines with an item, and placeholder lines whose origin document is not a supply chain document, are left as they are.

## Parameters

This action takes no parameters.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCSpreadOriginDoc`

## Related Actions

- [EASCCopyDataFromFromDoc](EASCCopyDataFromFromDoc.md) - fills the whole document from the header From Doc


</div>
