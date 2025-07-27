---
title: EAUpdateRemarksInContractorExtractFromProjectContractTermDescription
module: contracting
---

<div class='entity-flows'>

# EAUpdateRemarksInContractorExtractFromProjectContractTermDescription

**This document was generated using Claude.ai**

## Overview

Automatically updates remarks fields in Contractor Extract lines and conditions by copying remarks from related Project Contract Terms. Builds hierarchical chain of remarks from parent terms.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Contractor Extract documents
- **Purpose:** Propagate project contract term remarks to contractor extracts
- **Timing:** On-demand when remarks synchronization is needed

## How It Works

1. **Maps contractor terms** to project terms using `projTermCode` field
2. **Builds hierarchy** by walking up project contract term parent-child relationships
3. **Combines remarks** from all parent levels with specified separator
4. **Updates target fields** in extract lines and/or conditions

## Parameters

### Parameter 1: Update Details Remarks (Required)
- **Values:** `true` or `false`
- **Purpose:** Whether to update remarks in extract detail lines

### Parameter 2: Update Conditions Remarks (Required)
- **Values:** `true` or `false`
- **Purpose:** Whether to update remarks in extract condition lines

### Parameter 3: Up to Level (Optional)
- **Default:** 255 (all levels)
- **Purpose:** Maximum hierarchy levels to include
- **Examples:** `3`, `5`, `10`

### Parameter 4: Contract Field (Optional)
- **Purpose:** Custom field path to get contract terms
- **Examples:** `projContract.executiveBudget`

### Parameter 5: Term Code Field (Optional)
- **Purpose:** Custom field to get term code
- **Examples:** `executiveTermCode`, `estimatedTermCode`

### Parameter 6: Separator (Optional)
- **Default:** `" - "`
- **Purpose:** Text to separate remarks from different levels
- **Examples:** `" | "`, `"; "`

## Database Tables Affected

### Updated Tables
- **ContractorContrExtractLine** - Extract detail lines (remarks field)
- **ContractorExtractCondLine** - Extract condition lines (remarks field)

### Reference Tables
- **ContractorContractTermLine** - Term mapping via `projTermCode`
- **ProjContractTermLine** - Source of remarks

## SQL Verification

```sql
-- Check updated remarks in extract details
SELECT ce.code, cel.lineNumber, cel.termCode, cel.remarks
FROM ContractorContrExtract ce
INNER JOIN ContractorContrExtractLine cel ON ce.id = cel.contractorContrExtract_id
WHERE ce.id = [ExtractId] ORDER BY cel.lineNumber;
```

## Important Warnings

### ⚠️ Data Impact
- **Data Overwrite:** Completely replaces existing remarks - manual entries will be lost
- **Term Code Dependency:** Requires proper `projTermCode` mapping for contractor to project terms
- **Hierarchy Requirement:** Missing parent terms result in incomplete remarks chains

### ⚠️ Configuration Requirements
- **Parameter Validation:** At least one of Update Details/Conditions must be `true`
- **Term Mapping:** ContractorContractTermLine.projTermCode must reference valid project terms
- **Performance:** Large extracts with deep hierarchies may take time to process

## Related Actions

- **Project Contract Term Management** - Maintains source remarks
- **Contractor Contract Setup** - Establishes term mappings via projTermCode
- **Extract Processing** - Uses updated remarks for documentation

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateRemarksInContractorExtractFromProjectContractTermDescription`

</div>

