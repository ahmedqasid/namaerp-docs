---
title: EAGenInvestmentDocClaimingDoc
module: accounting
---

<div class='entity-flows'>

# EAGenInvestmentDocClaimingDoc - Treasury Bonds Claiming Document Generator

**This document was generated using Claude.ai**

**Description:** Automatically generates claiming documents for treasury bonds that reach their maturity date

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenInvestmentDocClaimingDoc`

## Overview

This entity action automatically creates **Investment Document Claiming** records for treasury bonds that have reached their maturity date. It's designed to help track when treasury bonds become due for claiming/collection.

### What This Action Does

1. **Searches for Eligible Treasury Bonds**: Finds all treasury bonds that:
   - Have a worth date (maturity date) equal to today's date
   - Are of type "Treasury Bonds" (not company bonds)
   - Have status "Ongoing" (not closed or initial)
   - Have been committed (saved) before

2. **Creates Claiming Documents**: For each eligible treasury bond, it:
   - Creates a new "Investment Document Claiming" record
   - Links it to the original investment document
   - Copies specified fields from the original investment document
   - Sets up proper dimensions and accounting book information
   - Generates a code if needed
   - Saves the claiming document

## Key Fields and Entities

### Source Entity: Investment Document (سند استثمار)
- **Entity Type**: InvestmentDoc
- **Purpose**: Master file that stores treasury bond information
- **Key Fields Used**:
  - **Worth Date (تاريخ الاستحقاق)**: The maturity date when the bond becomes claimable
  - **Type (النوع)**: Must be "TreasuryBonds" (not "CompanyBonds")
  - **Investment Doc Status (حالة السند)**: Must be "Ongoing" (not "Initial" or "Closed")

### Target Entity: Investment Document Claiming (مستند استحقاق سند استثمار)
- **Entity Type**: InvestmentDocClaiming
- **Purpose**: Document that tracks the claiming/collection of matured treasury bonds
- **Key Fields**:
  - **Investment Document**: Reference to the original treasury bond
  - **Various copied fields**: Based on the field mapping parameter

## When This Action Runs

This action is typically triggered:
- **Daily**: As part of scheduled processes to check for bonds maturing today
- **Manually**: When users need to generate claiming documents for today's matured bonds
- **From workflows**: As part of treasury bond management processes

## Parameters

The action accepts one parameter:
- **Fields Map**: A text parameter that specifies which fields to copy from the source Investment Document to the target Investment Document Claiming

## Important Notes and Warnings

### ⚠️ **Critical Warnings**

1. **Date Sensitivity**: This action only processes bonds with worth date = TODAY. If run on wrong date, it will miss or incorrectly process bonds.

2. **One-Time Processing**: Each treasury bond should only generate one claiming document. Running this action multiple times on the same date may create duplicates.

3. **Status Requirements**: Only processes "Ongoing" treasury bonds. Bonds in "Initial" or "Closed" status are ignored.

4. **Performance Impact**: Limited to 500 records per run to prevent system overload.

### 🔍 **For Technical Support**

When troubleshooting issues:

1. **Check Bond Status**: Use ALT+CTRL+I on Investment Document to verify:
   - Worth Date matches expected maturity date
   - Type is "TreasuryBonds"
   - Status is "Ongoing"
   - Record is committed (not draft)

2. **Field Mapping Issues**: If claiming documents are missing fields:
   - Check the Fields Map parameter
   - Verify field names match between source and target entities
   - Use https://dm.namasoft.com to check available fields

3. **Query for Troubleshooting**:
   ```sql
   -- Find treasury bonds maturing today
   SELECT * FROM InvestmentDoc 
   WHERE worthDate = CAST(GETDATE() AS DATE)
   AND type = 'TreasuryBonds' 
   AND investmentDocStatus = 'Ongoing'
   AND commitedBefore = 1;
   
   -- Check existing claiming documents
   SELECT idc.* FROM InvestmentDocClaiming idc
   INNER JOIN InvestmentDoc id ON idc.investmentDoc_id = id.id
   WHERE id.worthDate = CAST(GETDATE() AS DATE);
   ```

### 📋 **Business Process Context**

This action supports the treasury bond lifecycle:
1. **Purchase**: Investment Document created with future worth date
2. **Ongoing**: Bond status set to "Ongoing" during active period
3. **Maturity**: This action creates claiming document when worth date arrives
4. **Collection**: Claiming document used to track actual collection/payment

### 🔧 **Customization Notes**

- **Field Copying**: The specific fields copied depend on the Fields Map parameter
- **Dimensions**: Generic dimensions are automatically copied from the book
- **Code Generation**: Codes are auto-generated based on book settings
- **Error Handling**: Process stops on first error to prevent partial processing

</div>

