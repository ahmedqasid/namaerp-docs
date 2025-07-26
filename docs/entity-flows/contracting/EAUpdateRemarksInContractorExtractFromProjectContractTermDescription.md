---
title: EAUpdateRemarksInContractorExtractFromProjectContractTermDescription
module: contracting
---

<div class='entity-flows'>

# EAUpdateRemarksInContractorExtractFromProjectContractTermDescription

**This document was generated using Claude.ai**

## Overview

This entity flow automatically updates the remarks field in Contractor Extract lines and conditions by copying remarks from the related Project Contract Terms. The system builds a hierarchical chain of remarks from parent terms up to a specified level, combining them with a separator.

**Key Concept:** This flow bridges contractor extracts with their corresponding project contract terms, ensuring that important remarks from the project level are propagated down to the contractor extract level for reference and documentation purposes.

## What This Flow Does

1. **For Extract Details (Lines):** Updates the `remarks` field in each line of the contractor extract (`ContractorContrExtractLine` table) by copying remarks from related project contract terms
2. **For Extract Conditions:** Updates the `remarks` field in each condition line (`ContractorExtractCondLine` table) by copying remarks from related project contract terms  
3. **Hierarchical Remarks:** Combines remarks from parent term levels into a single field, working up the term hierarchy tree
4. **Smart Term Mapping:** Maps contractor contract terms to their corresponding project contract terms using the `projTermCode` field

## Parameters Explained

| Parameter | Required | Description | Example Values |
|-----------|----------|-------------|----------------|
| **Update Details Remarks** | Yes | Whether to update remarks in extract detail lines | `true`, `false` |
| **Update Conditions Remarks** | Yes | Whether to update remarks in extract condition lines | `true`, `false` |
| **Up to Level** | No | Maximum hierarchy levels to include in remarks (default: 255) | `3`, `5`, `10` |
| **Contract Field** | No | Custom field path to get contract terms from | `projContract.executiveBudget`, leave empty for default |
| **Term Code Field** | No | Custom field to get term code from | `executiveTermCode`, `estimatedTermCode`, `termCode` |
| **Separator** | No | Text to separate remarks from different levels | `" - "` (default), `" | "`, `"; "` |

**Important:** At least one of "Update Details Remarks" or "Update Conditions Remarks" must be set to `true`.

## How Term Mapping Works

The system uses a two-step process to find the correct project contract terms:

1. **Find Contractor Term:** Locates the term in the contractor contract using the term code from the extract line/condition
2. **Map to Project Term:** Uses the `projTermCode` field from the contractor contract term to find the corresponding project contract term
3. **Build Hierarchy:** Walks up the project contract term hierarchy using parent-child relationships
4. **Combine Remarks:** Concatenates remarks from all parent levels with the specified separator

## Database Tables Affected

### Primary Tables
- **ContractorContrExtractLine** - Extract detail lines (remarks updated)
- **ContractorExtractCondLine** - Extract condition lines (remarks updated)

### Reference Tables Used
- **ContractorContractTermLine** - Contractor contract terms (for term mapping)
- **ProjContractTermLine** - Project contract terms (source of remarks)

## Example Usage Scenarios

### Scenario 1: Update All Remarks with Default Settings
```
Parameter 1: true              (Update details)
Parameter 2: true              (Update conditions) 
Parameter 3: 5                 (Up to 5 levels)
Parameter 4: [empty]           (Use default contract)
Parameter 5: [empty]           (Use default term code)
Parameter 6: [empty]           (Use default separator " - ")
```

### Scenario 2: Update Only Details with Custom Separator
```
Parameter 1: true              (Update details only)
Parameter 2: false             (Skip conditions)
Parameter 3: 3                 (Up to 3 levels)
Parameter 4: [empty]           (Use default contract)
Parameter 5: [empty]           (Use default term code)  
Parameter 6: " | "             (Use pipe separator)
```

### Scenario 3: Use Executive Term Codes
```
Parameter 1: true              (Update details)
Parameter 2: true              (Update conditions)
Parameter 3: [empty]           (All levels)
Parameter 4: [empty]           (Use default contract)
Parameter 5: executiveTermCode (Use executive term codes)
Parameter 6: [empty]           (Default separator)
```

## SQL Query to Check Results

After running this flow, you can verify the results with:

```sql
-- Check updated remarks in extract details
SELECT 
    ce.code AS ExtractCode,
    cel.lineNumber,
    cel.termCode,
    cel.remarks AS UpdatedRemarks,
    pct.remarks AS OriginalProjectRemarks
FROM ContractorContrExtract ce
INNER JOIN ContractorContrExtractLine cel ON ce.id = cel.contractorContrExtract_id
INNER JOIN ContractorContract cc ON ce.contract_id = cc.id
INNER JOIN ContractorContractTermLine ccl ON cc.id = ccl.contractorContract_id 
    AND cel.termCode = ccl.termCode
INNER JOIN ProjContractTermLine pct ON ccl.projTermCode = pct.termCode
    AND cc.projContract_id = pct.projContract_id
WHERE ce.id = [YourExtractId]
ORDER BY cel.lineNumber;

-- Check updated remarks in extract conditions  
SELECT 
    ce.code AS ExtractCode,
    cec.lineNumber,
    cec.termCode,
    cec.remarks AS UpdatedRemarks
FROM ContractorContrExtract ce
INNER JOIN ContractorExtractCondLine cec ON ce.id = cec.contractorContrExtract_id
WHERE ce.id = [YourExtractId]
ORDER BY cec.lineNumber;
```

## Important Notes and Warnings

⚠️ **Data Overwrite Warning:** This flow completely replaces existing remarks in the target fields. Any manually entered remarks will be lost.

⚠️ **Term Code Dependency:** The flow requires proper mapping between contractor contract terms and project contract terms via the `projTermCode` field. Missing mappings will result in empty remarks.

⚠️ **Performance Consideration:** For extracts with many lines and deep term hierarchies, this operation may take time to complete.

⚠️ **Hierarchy Limitation:** The "Up to Level" parameter counts from the bottom up. Level 1 is the immediate term, Level 2 includes its parent, etc.

## Field Information for Support

When investigating issues, use **ALT+CTRL+I** in the system to check field information for:

- **ContractorContrExtractLine.remarks** - Target field for detail line remarks
- **ContractorExtractCondLine.remarks** - Target field for condition remarks  
- **ContractorContractTermLine.projTermCode** - Mapping field to project terms
- **ProjContractTermLine.remarks** - Source field for project term remarks

For complete entity documentation, refer to: https://dm.namasoft.com

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateRemarksInContractorExtractFromProjectContractTermDescription`

</div>

