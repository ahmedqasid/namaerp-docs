---
title: EAUpdateRemarksInExtractFromContractTermDescription
module: contracting
---

<div class='entity-flows'>

# EAUpdateRemarksInExtractFromContractTermDescription

**This document was generated using Claude.ai**

## Purpose

This entity action automatically fills the **Remarks** field in contract extracts (مستخلصات) by copying remarks from the contract terms in a hierarchical manner. It works on both **Project Extracts (مستخلص مشروع)** and **Contractor Extracts (مستخلص مقاول باطن)**.

## What It Does

The action looks at each line in your extract (whether in Details or Conditions), finds the matching term in the contract, then traces up the contract's term hierarchy to collect remarks from parent terms. These remarks are then combined and placed in the extract line's remarks field.

### Key Behavior:
- **Hierarchical Collection**: If a term has parent terms (like main category → sub-category → specific item), it collects remarks from all levels
- **Bottom-Up Processing**: Starts from the most specific term and works up to parent terms
- **Customizable Levels**: You can limit how many hierarchy levels to include
- **Flexible Sources**: Can work with different contract fields and term code fields

## Parameters

| Parameter | Arabic Name | Description | Required | Default |
|-----------|-------------|-------------|----------|---------|
| **1. Update Details Remarks** | تحديث ملاحظات التفاصيل | Set to `true` to update remarks in extract details (التفاصيل), `false` to skip | At least one of param 1 or 2 must be true | - |
| **2. Update Conditions Remarks** | تحديث ملاحظات الشروط | Set to `true` to update remarks in extract conditions (الشروط), `false` to skip | At least one of param 1 or 2 must be true | - |
| **3. Up to Level** | حتى المستوى | Maximum number of parent levels to include in remarks collection | No | 255 (all levels) |
| **4. Contract Field** | حقل العقد | Field path to the contract containing the terms (e.g., `projContract.executiveBudget`) | No | Uses main contract |
| **5. Term Code Field** | حقل كود البند | Field name containing the term code (e.g., `executiveTermCode`, `estimatedTermCode`) | No | Uses default `termCode` |
| **6. Separator** | الفاصل | Text to separate remarks between hierarchy levels | No | ` - ` (space-dash-space) |

## How Hierarchy Works

Contract terms are organized in a parent-child hierarchy using the `parentLineID` field. For example:

```
Foundation Work (Level 1)
├── Excavation (Level 2)
│   ├── Manual Excavation (Level 3)
│   └── Machine Excavation (Level 3)
└── Concrete Work (Level 2)
```

When the action processes "Manual Excavation", it collects remarks from:
1. Manual Excavation (Level 3) - most specific
2. Excavation (Level 2) - parent
3. Foundation Work (Level 1) - grandparent

## Database Tables Affected

### Extract Tables:
- **ProjContrExtractLine** (Project extract details)
- **ProjExtractCondLine** (Project extract conditions)  
- **ContractorContrExtractLine** (Contractor extract details)
- **ContractorExtractCondLine** (Contractor extract conditions)

### Source Tables:
- **ProjContractTermLine** (Project contract terms)
- **ContractorContractTermLine** (Contractor contract terms)

## Example Usage Scenarios

### Scenario 1: Basic Usage
```
Parameter 1: true
Parameter 2: true  
Parameter 3: (empty - uses all levels)
Parameter 4: (empty - uses main contract)
Parameter 5: (empty - uses termCode field)
Parameter 6: (empty - uses default " - ")
```
**Result**: Updates both details and conditions remarks with all parent term remarks separated by " - "

### Scenario 2: Limited Hierarchy
```
Parameter 1: true
Parameter 2: false
Parameter 3: 2
Parameter 4: (empty)
Parameter 5: (empty)
Parameter 6: | (pipe separator)
```
**Result**: Updates only details remarks, including maximum 2 hierarchy levels, separated by "|"

### Scenario 3: Alternative Contract Source
```
Parameter 1: true
Parameter 2: true
Parameter 3: (empty)
Parameter 4: projContract.executiveBudget
Parameter 5: executiveTermCode
Parameter 6: (empty)
```
**Result**: Uses executive budget contract and executive term codes instead of main contract

## Field Information

### Extract Detail Fields Updated:
- **details.remarks** (ملاحظات التفاصيل)

### Extract Condition Fields Updated:  
- **conditions.remarks** (ملاحظات الشروط)

### Term Code Sources:
- **details.termCode** (default)
- **details.executiveTermCode** 
- **details.estimatedTermCode**
- **conditions.termCode** (default)

### Contract Sources:
- Main contract (default)
- **projContract.executiveBudget**
- Any other contract reference field

## SQL Query Example

To see what this action would do manually:

```sql
-- Example: Get hierarchical remarks for a specific term
WITH TermHierarchy AS (
    SELECT 
        t.id,
        t.termCode,
        t.remarks,
        t.parentLineID,
        1 as Level
    FROM ProjContractTermLine t 
    WHERE t.termCode = 'SPECIFIC_TERM_CODE'
    AND t.projectContract_id = 'CONTRACT_ID'
    
    UNION ALL
    
    SELECT 
        p.id,
        p.termCode,
        p.remarks,
        p.parentLineID,
        th.Level + 1
    FROM ProjContractTermLine p
    INNER JOIN TermHierarchy th ON p.id = th.parentLineID
    WHERE th.Level < 3  -- Up to level limit
)
SELECT 
    STRING_AGG(
        LTRIM(RTRIM(ISNULL(remarks, ''))), 
        ' - '
    ) WITHIN GROUP (ORDER BY Level DESC) as CombinedRemarks
FROM TermHierarchy
WHERE LTRIM(RTRIM(ISNULL(remarks, ''))) != '';
```

## Important Warnings

⚠️ **Data Overwrite**: This action will **completely replace** existing remarks in the specified fields. Any manually entered remarks will be lost.

⚠️ **Performance Impact**: On large extracts with many lines, this action may take time to process as it traverses the term hierarchy for each line.

⚠️ **Contract Dependency**: The action requires that contract terms have properly filled `parentLineID` fields to build the hierarchy correctly.

⚠️ **Field Validation**: Ensure the specified contract field and term code field actually exist and contain valid data before running.

⚠️ **Empty Results**: If no matching terms are found or if terms have no remarks, the extract remarks will be set to empty.

## Verification Steps

After running this action:

1. **Check Extract Lines**: Use ALT+CTRL+I on extract lines to verify remarks were populated
2. **Compare with Contract**: Cross-reference with contract terms to ensure proper hierarchy collection
3. **Test Different Levels**: Try different "Up to Level" values to see the effect
4. **Validate Sources**: Ensure the correct contract and term code fields were used

## Module Information

**Module:** contracting  
**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateRemarksInExtractFromContractTermDescription`

</div>

