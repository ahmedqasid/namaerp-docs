---
title: EASCCopyDataFromFromDoc
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASCCopyDataFromFromDoc

## Overview

Copies data from the document in the **From Doc** field into the current supply chain document, when that From Doc is itself a supply chain document. It fills the header (dates, dimensions, customer or supplier, warehouse and locator, descriptive fields) and rebuilds the lines from the source document's lines. Use it when users pick a From Doc manually and want the document filled in one step.

## When This Action Runs

Attach it to a supply chain document's save event (before save). It changes the record being saved. If the From Doc field is empty, or the From Doc is not a supply chain document, the action does nothing.

## How It Works

1. **Reads the From Doc** - If the field is empty or points to a document that is not a supply chain document, the action stops.
2. **Copies header data** - Copies the source document's header fields (such as the N, date and description fields, remarks and subsidiary). Fields listed in the source term's "do not copy with From Doc" setting are skipped.
3. **Sets header info** - Keeps the current document's own book and term, and takes the fiscal period, value date, issue date, dimensions, customer or supplier, warehouse and locator from the source document.
4. **Rebuilds the lines** - Replaces the current document's lines with copies of all the source document's lines. A current line that already points to a source line (through its source line) is reused and refreshed; other current lines are removed.

## Parameters

**Parameter 1:** (no label) - Not used.

## Important Notes

- Existing lines on the current document are replaced by the source document's lines every time the action runs.
- The value date, fiscal period and fiscal year of the current document are overwritten with those of the source document.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCCopyDataFromFromDoc`

## Related Actions

- [EASCSpreadOriginDoc](EASCSpreadOriginDoc.md) - copies lines from a per-line origin document instead of the header From Doc
- [EAGenSCDocFromDocWithFieldsMap](EAGenSCDocFromDocWithFieldsMap.md) - generates a new supply chain document from another one
- [EACopyTaxesFromFromDoc](EACopyTaxesFromFromDoc.md)
- [EACopyRevisionFromFromDoc](EACopyRevisionFromFromDoc.md)


</div>
