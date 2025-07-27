---
title: EAUpdateRemarksInExtractFromContractTermDescription
module: contracting
---

<div class='entity-flows'>

# EAUpdateRemarksInExtractFromContractTermDescription

**This document was generated using Claude.ai**

## Overview

Automatically fills remarks fields in contract extracts by copying remarks from contract terms in hierarchical manner. Works on both Project and Contractor extracts.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Contract extract documents (Project/Contractor)
- **Purpose:** Populate extract remarks from contract term hierarchy
- **Timing:** On-demand when remarks synchronization is needed

## How It Works

1. **Finds matching term** in contract using term code from extract line
2. **Traces hierarchy** up through parent terms using `parentLineID`
3. **Collects remarks** from all hierarchy levels
4. **Combines remarks** with specified separator
5. **Updates extract fields** in details and/or conditions

### Hierarchy Example
```
Foundation Work (Level 1)
├── Excavation (Level 2)
│   ├── Manual Excavation (Level 3)
│   └── Machine Excavation (Level 3)
```
For "Manual Excavation": collects remarks from levels 3→2→1

## Parameters

### Parameter 1: Update Details Remarks (Required)
- **Values:** `true` or `false`
- **Purpose:** Update remarks in extract detail lines

### Parameter 2: Update Conditions Remarks (Required)
- **Values:** `true` or `false`  
- **Purpose:** Update remarks in extract condition lines

### Parameter 3: Up to Level (Optional)
- **Default:** 255 (all levels)
- **Purpose:** Maximum hierarchy levels to include

### Parameter 4: Contract Field (Optional)
- **Purpose:** Custom field path to contract terms
- **Examples:** `projContract.executiveBudget`

### Parameter 5: Term Code Field (Optional)
- **Purpose:** Custom field for term codes
- **Examples:** `executiveTermCode`, `estimatedTermCode`

### Parameter 6: Separator (Optional)
- **Default:** `" - "`
- **Purpose:** Text to separate hierarchy level remarks

## Database Tables Affected

### Extract Tables (Updated)
- **ProjContrExtractLine** - Project extract details
- **ProjExtractCondLine** - Project extract conditions
- **ContractorContrExtractLine** - Contractor extract details
- **ContractorExtractCondLine** - Contractor extract conditions

### Source Tables
- **ProjContractTermLine** - Project contract terms
- **ContractorContractTermLine** - Contractor contract terms

## SQL Query Example

```sql
-- Get hierarchical remarks for specific term
WITH TermHierarchy AS (
    SELECT t.id, t.termCode, t.remarks, t.parentLineID, 1 as Level
    FROM ProjContractTermLine t 
    WHERE t.termCode = 'TERM_CODE' AND t.projectContract_id = 'CONTRACT_ID'
    
    UNION ALL
    
    SELECT p.id, p.termCode, p.remarks, p.parentLineID, th.Level + 1
    FROM ProjContractTermLine p
    INNER JOIN TermHierarchy th ON p.id = th.parentLineID
    WHERE th.Level < 3
)
SELECT STRING_AGG(LTRIM(RTRIM(ISNULL(remarks, ''))), ' - ') 
       WITHIN GROUP (ORDER BY Level DESC) as CombinedRemarks
FROM TermHierarchy
WHERE LTRIM(RTRIM(ISNULL(remarks, ''))) != '';
```

## Important Warnings

### ⚠️ Data Impact
- **Data Overwrite:** Completely replaces existing remarks - manual entries will be lost
- **Hierarchy Dependency:** Requires properly filled `parentLineID` fields in contract terms
- **Empty Results:** Missing terms or empty remarks result in empty extract remarks

### ⚠️ Configuration Requirements
- **Parameter Validation:** At least one of Update Details/Conditions must be `true`
- **Field Validation:** Contract and term code fields must exist and contain valid data
- **Performance:** Large extracts with deep hierarchies may take time to process

## Related Actions

- **Contract Term Management** - Maintains source remarks and hierarchy
- **Extract Processing** - Uses updated remarks for documentation
- **Project/Contractor Coordination** - Ensures consistent remarks across extract types

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateRemarksInExtractFromContractTermDescription`

</div>

