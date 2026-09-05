---
entities: [TaxPlan, TaxDiscountEffectsConfig]
menu: Basic → Master Files → Tax Plan
---
# Invoice Discounts and Tax Calculation System - Comprehensive Guide
## Overview

Nama ERP provides a sophisticated invoice discount and tax calculation system that supports complex business requirements. This guide explains how discounts and taxes are calculated, configured, and applied to invoices with detailed field-level configuration information.

::: tip Key Features
- Support for 8 sequential line discounts plus 1 header discount
- 4 configurable tax types with flexible application points  
- Complex discount-tax interactions and custom ordering
- Multi-currency and multi-rate support
- Extensive configuration options for different business scenarios
- Tax can be configured as addition or deduction
:::

## Understanding the Calculation Flow

### Basic Calculation Sequence

When an invoice is processed, Nama ERP follows this general calculation sequence:

1. **Line Total Calculation**: Quantity × Unit Price = Line Total
2. **Line Discounts Application**: Apply Discount1 through Discount8 in sequence
3. **Header Discount Application**: Apply single discount to entire invoice
4. **Tax Calculations**: Apply Tax1 through Tax4 at configured points
5. **Final Totals**: Calculate net amounts and remaining balances

::: info Important Note
The exact sequence can be customized through the `effectsConfig` field in TaxConfiguration, allowing for different discount and tax application orders based on business requirements.
:::

## Tax Configuration Resolution System

### Understanding fetchTaxConfiguration Method

The `fetchTaxConfiguration` method in `TaxPlan.java` determines which tax configuration to use through a hierarchical resolution process:

```java
public static TaxConfiguration fetchTaxConfiguration(
    TaxPlan header,      // Header tax plan (from document)
    TaxPlan line,        // Line tax plan (from item/line)
    LegalEntity legalEntity, 
    DateDF valueDate,
    EntityTypeDF entityType)
```

#### Resolution Hierarchy

1. **Header Tax Plan Priority**
   - First checks if header tax plan exists
   - If exists, checks its `defaultTaxConfig` field:
     - **GlobalConfig**: Uses system-wide global configuration
     - **TaxPlanHeader**: Uses configuration from tax plan header
     - **TaxPlanLine**: Uses configuration from legal entity tax lines

2. **Line Tax Plan Fallback**
   - If header plan doesn't provide configuration, checks line tax plan
   - Follows same `defaultTaxConfig` resolution logic

3. **Global Default**
   - If neither plan provides configuration, uses global system configuration

### Tax Plan Configuration Fields

#### Core Tax Plan Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Item Plan** | `itemPlan` | Indicates if this plan applies to items | When true, plan is used for item-level taxes (Tax1, Tax2) |
| **No Item Taxes With This Policy** | `noItemTaxesWithThisPolicy` | Disables Tax1 and Tax2 | When true, item taxes are zeroed regardless of rates |
| **No Invoice Taxes With This Policy** | `noInvoiceTaxesWithThisPolicy` | Disables Tax3 and Tax4 | When true, invoice taxes are zeroed regardless of rates |
| **Prioritize This Policy Over Policy Specified In Customer and Supplier** | `priorityPolicyOverCusOrSup` | Policy precedence control | When true, this plan overrides customer/supplier tax settings |
| **Default Tax Configuration** | `defaultTaxConfig` | Source of tax configuration | Options: GlobalConfig, TaxPlanHeader, TaxPlanLine |
| **Tax Configuration** | `taxConfiguration` | Embedded tax behavior settings | Contains all tax calculation rules |
| **Legal Entity Taxes** | `legalEntityTaxes` | Tax rates by entity and date | List of entity-specific tax rates |
| **Subsidiary Accounts** | `subsidiaryAccounts` | Account-level settings | Contains tax exemption flags |

#### Legal Entity Tax Fields

Each `LegalEntityTax` record contains:

| Field Name | Database Field | Description |
|------------|---------------|-------------|
| **Legal Entity** | `legalEntity` | Specific legal entity or null for all |
| **Effective From** | `effectiveFrom` | Start date for tax rates |
| **Effective To** | `effectiveTo` | End date for tax rates |
| **Tax 1** | `tax1` | Tax1 rate (percentage or value) |
| **Tax 2** | `tax2` | Tax2 rate (percentage or value) |
| **Entity Type** | `entityType` | Specific document type |
| **Entity Type List** | `entityTypeList` | Multiple document types |
| **Revision ID** | `revisionId` | Version control for rates |
| **Tax Configuration** | `taxConfiguration` | Override configuration for this entity |

## Discount System Configuration

### Types of Discounts

#### Line Discounts (Discount 1-8)
- **Sequential Application**: Each discount applies after the previous one
- **Configurable Base**: Each discount can apply to different base amounts
- **Percentage or Value**: Can be specified as percentage or fixed amount
- **Individual Control**: Each discount has independent configuration

#### Header Discount
- **Invoice-Wide**: Applied to the entire invoice total
- **Proportional Distribution**: Distributed across all invoice lines proportionally
- **Configurable Timing**: Can be applied at different points in the calculation sequence

### Discount Configuration Fields

#### Global Configuration - Discount Apply Types

Located in `GlobalConfigInfo.java`:

| Field Name | Database Field | Description | Available Values |
|------------|---------------|-------------|------------------|
| **Discount 1 Apply Type** | `discount1ApplyType` | Base amount for Discount 1 | TotalPrice, AfterDiscount1-8, AfterHeaderDiscount, Custom, Tax/Discount Values |
| **Discount 2 Apply Type** | `discount2ApplyType` | Base amount for Discount 2 | Same as above |
| **Discount 3 Apply Type** | `discount3ApplyType` | Base amount for Discount 3 | Same as above |
| **Discount 4 Apply Type** | `discount4ApplyType` | Base amount for Discount 4 | Same as above |
| **Discount 5 Apply Type** | `discount5ApplyType` | Base amount for Discount 5 | Same as above |
| **Discount 6 Apply Type** | `discount6ApplyType` | Base amount for Discount 6 | Same as above |
| **Discount 7 Apply Type** | `discount7ApplyType` | Base amount for Discount 7 | Same as above |
| **Discount 8 Apply Type** | `discount8ApplyType` | Base amount for Discount 8 | Same as above |
| **Header Discount Apply Type** | `headerDiscountApplyType` | Base amount for header discount | Same as above |

#### Discount Calculation Method Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Calculate discount 1 percentage from value** | `calcDisc1PercentFromValue` | Calculation direction for Discount 1 | True: Calculate % from fixed value<br>False: Calculate value from % |
| **Calculate discount 2 percentage from value** | `calcDisc2PercentFromValue` | Calculation direction for Discount 2 | Same as above |
| **Calculate discount 3 percentage from value** | `calcDisc3PercentFromValue` | Calculation direction for Discount 3 | Same as above |
| **Calculate discount 4 percentage from value** | `calcDisc4PercentFromValue` | Calculation direction for Discount 4 | Same as above |
| **Calculate discount 5 percentage from value** | `calcDisc5PercentFromValue` | Calculation direction for Discount 5 | Same as above |
| **Calculate discount 6 percentage from value** | `calcDisc6PercentFromValue` | Calculation direction for Discount 6 | Same as above |
| **Calculate discount 7 percentage from value** | `calcDisc7PercentFromValue` | Calculation direction for Discount 7 | Same as above |
| **Calculate discount 8 percentage from value** | `calcDisc8PercentFromValue` | Calculation direction for Discount 8 | Same as above |

#### Tax Effect on Discount Configuration

Each discount (1-8) has a `TaxEffectOnDiscount` configuration with these fields:

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Consider Tax 1** | `discount[N].considerTax1` | Subtract Tax1 from discount base | When true, Tax1 is deducted before applying discount |
| **Consider Tax 2** | `discount[N].considerTax2` | Subtract Tax2 from discount base | When true, Tax2 is deducted before applying discount |
| **Consider Tax 3** | `discount[N].considerTax3` | Subtract Tax3 from discount base | When true, Tax3 is deducted before applying discount |
| **Consider Tax 4** | `discount[N].considerTax4` | Subtract Tax4 from discount base | When true, Tax4 is deducted before applying discount |

### How Discounts Are Calculated

#### Percentage-Based Discounts
```
Discount Amount = (Base Amount × Discount Percentage) ÷ 100
New Total = Base Amount - Discount Amount
```

#### Value-Based Discounts
```
Discount Amount = Fixed Discount Value
New Total = Base Amount - Discount Amount
```

#### Tax-Inclusive Discounts
When taxes are included in the price, the discount calculation adjusts:
```
Discount Amount = Base Amount - (Base Amount × 100) ÷ (100 + Tax Percentage)
```

## Tax System Configuration

### Tax Configuration Fields in TaxConfiguration Object

The `TaxConfiguration` object contains all tax behavior settings:

#### Tax Location Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Location** | `tax1Location` | When Tax1 is calculated | Controls sequence position |
| **Tax 2 Location** | `tax2Location` | When Tax2 is calculated | Controls sequence position |
| **Tax 3 Location** | `tax3Location` | When Tax3 is calculated | Controls sequence position |
| **Tax 4 Location** | `tax4Location` | When Tax4 is calculated | Controls sequence position |

Available Location Values:
- `MainPrice`: Applied to original line total
- `Discount1` through `Discount8`: Applied after specific discount
- `HeaderDiscount`: Applied after header discount

#### Tax Apply Type Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Apply Type** | `tax1ApplyType` | Base for Tax1 calculation | Determines what amount Tax1 applies to |
| **Tax 2 Apply Type** | `tax2ApplyType` | Base for Tax2 calculation | Determines what amount Tax2 applies to |
| **Tax 3 Apply Type** | `tax3ApplyType` | Base for Tax3 calculation | Determines what amount Tax3 applies to |
| **Tax 4 Apply Type** | `tax4ApplyType` | Base for Tax4 calculation | Determines what amount Tax4 applies to |

#### Tax Behavior Control Fields

| Field Name | Database Field | Description | Impact on Calculation |
|------------|---------------|-------------|----------------------|
| **Tax 1 Is Discount** | `tax1IsDiscount` | Tax1 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 2 Is Discount** | `tax2IsDiscount` | Tax2 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 3 Is Discount** | `tax3IsDiscount` | Tax3 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 4 Is Discount** | `tax4IsDiscount` | Tax4 reduces total | When true: Amount is subtracted<br>When false: Amount is added |

#### Tax Calculation Method Fields

| Field Name | Database Field | Description | Calculation Formula |
|------------|---------------|-------------|---------------------|
| **Tax 1 Is Value Not Percentage** | `tax1IsValue` | Tax1 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 2 Is Value Not Percentage** | `tax2IsValue` | Tax2 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 3 Is Value Not Percentage** | `tax3IsValue` | Tax3 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 4 Is Value Not Percentage** | `tax4IsValue` | Tax4 as fixed amount | True: Fixed amount<br>False: Percentage of base |

#### Tax Value Application Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Value Is For Total Not Per Piece** | `tax1ValueIsForTotal` | Tax1 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 2 Value Is For Total Not Per Piece** | `tax2ValueIsForTotal` | Tax2 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 3 Value Is For Total Not Per Piece** | `tax3ValueIsForTotal` | Tax3 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 4 Value Is For Total Not Per Piece** | `tax4ValueIsForTotal` | Tax4 value application | True: Flat amount<br>False: Multiplied by quantity |

#### Price Inclusion Fields

| Field Name | Database Field | Description | Calculation Impact |
|------------|---------------|-------------|-------------------|
| **Price Includes Tax 1** | `priceIncludesTax` | Tax1 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 2** | `priceIncludesTax2` | Tax2 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 3** | `priceIncludesTax3` | Tax3 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 4** | `priceIncludesTax4` | Tax4 in quoted price | True: Tax extracted from price<br>False: Tax added to price |

#### Total Inclusion Fields

| Field Name | Database Field | Description | Invoice Total Impact |
|------------|---------------|-------------|---------------------|
| **Tax 1 Not Included In Total** | `tax1NotIncludedInTotal` | Tax1 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 2 Not Included In Total** | `tax2NotIncludedInTotal` | Tax2 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 3 Not Included In Total** | `tax3NotIncludedInTotal` | Tax3 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 4 Not Included In Total** | `tax4NotIncludedInTotal` | Tax4 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |

### Tax as Addition vs Deduction

The system determines whether a tax adds to or subtracts from the invoice total based on the `tax[N]IsDiscount` field:

#### When Tax Adds to Total (Standard Tax)
- **Field Setting**: `tax[N]IsDiscount = false`
- **Calculation**: `New Total = Base Amount + Tax Amount`
- **Use Case**: VAT, GST, Sales Tax
- **Example**: 
  ```
  Line Total: $100
  Tax1 (15%): $15
  Final Total: $100 + $15 = $115
  ```

#### When Tax Reduces Total (Discount Tax)
- **Field Setting**: `tax[N]IsDiscount = true`
- **Calculation**: `New Total = Base Amount - Tax Amount`
- **Use Case**: Withholding Tax, Discount Tax, Rebates
- **Example**:
  ```
  Line Total: $100
  Tax3 (5% withholding): $5
  Final Total: $100 - $5 = $95
  ```

### Tax Calculation Methods

#### Percentage-Based Taxes

**Tax-Exclusive (Added to Price):**
```java
if (!priceIncludesTax && !taxIsDiscount) {
    taxAmount = (baseAmount × taxPercentage) ÷ 100;
    finalAmount = baseAmount + taxAmount;
}
```

**Tax-Inclusive (Included in Price):**
```java
if (priceIncludesTax && !taxIsDiscount) {
    taxAmount = baseAmount - (baseAmount × 100) ÷ (100 + taxPercentage);
    finalAmount = baseAmount; // Price already includes tax
}
```

**Tax as Discount:**
```java
if (taxIsDiscount) {
    taxAmount = (baseAmount × taxPercentage) ÷ 100;
    finalAmount = baseAmount - taxAmount;
}
```

#### Value-Based Taxes

**Per Unit Calculation:**
```java
if (taxIsValue && !taxValueIsForTotal) {
    taxAmount = taxRate × quantity;
}
```

**Total Amount Calculation:**
```java
if (taxIsValue && taxValueIsForTotal) {
    taxAmount = taxRate; // Fixed amount regardless of quantity
}
```

## Advanced Effects Configuration

### TaxDiscountEffectsConfig Entity

The `effectsConfig` field in TaxConfiguration references a `TaxDiscountEffectsConfig` entity that provides complete control over calculation sequence:

#### Effects Order Configuration

| Field Name | Database Field | Description |
|------------|---------------|-------------|
| **Effects Order** | `effectsOrder` | List defining sequence of effects |
| **Effect 1 Type** | `effect1Type` | Type of first effect (Tax1-4, Discount1-8, HeaderDiscount) |
| **Effect 1 Basis Lines** | `effect1BasisLines` | Calculation rules for effect 1 |
| **Effect 2 Type** | `effect2Type` | Type of second effect |
| **Effect 2 Basis Lines** | `effect2BasisLines` | Calculation rules for effect 2 |
| ... | ... | ... |
| **Effect 13 Type** | `effect13Type` | Type of thirteenth effect |
| **Effect 13 Basis Lines** | `effect13BasisLines` | Calculation rules for effect 13 |

#### Effect Basis Line Configuration

Each effect basis line contains:

| Field Name | Description | Impact |
|------------|-------------|---------|
| **Source Type** | What value to use (MainPrice, CurrentTotal, Discount1-8, Tax1-4, etc.) | Determines base value |
| **Source Value** | Which aspect of source (Value, AfterValue, Percentage) | Specifies exact value to extract |
| **Source Operation** | Mathematical operation (Add, Subtract, Multiply, Divide, CalcPercentage, CalcInversePercentage) | How to apply the value |

### Custom Calculation Operations

The system supports these operations for custom effect calculations:

| Operation | Formula | Use Case |
|-----------|---------|----------|
| **Add** | `total + value` | Standard addition |
| **Subtract** | `total - value` | Standard subtraction |
| **Multiply** | `total × value` | Scaling calculations |
| **Divide** | `total ÷ value` | Division operations |
| **CalcPercentage** | `(total × value) ÷ 100` | Percentage calculations |
| **CalcInversePercentage** | `total - (total ÷ ((100 + value) ÷ 100))` | Tax-inclusive extractions |

## Special Configuration Options

### Free Item Handling

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **No Taxes For Free Item** | `noTaxesForFreeItem` | Disable taxes on free items | All taxes zeroed for lines marked as free |

### Additional Value Usage

These fields control whether tax percentages are added as additional values to line totals:

| Field Name | Database Field | When False (Default) |
|------------|---------------|---------------------|
| **Do Not Use Tax1 Percentage As Additional Value1** | `doNotUseTax1PercentageAsAdditionalValue1` | Tax1 percentage added to line total |
| **Do Not Use Tax2 Percentage As Additional Value2** | `doNotUseTax2PercentageAsAdditionalValue2` | Tax2 percentage added to line total |
| **Do Not Use Tax3 Percentage As Additional Value3** | `doNotUseTax3PercentageAsAdditionalValue3` | Tax3 percentage added to line total |
| **Do Not Use Tax4 Percentage As Additional Value4** | `doNotUseTax4PercentageAsAdditionalValue4` | Tax4 percentage added to line total |

### Subsidiary Account Tax Exemptions

Customers and suppliers can have tax exemptions configured in their subsidiary accounts:

| Field Name | Description | Impact |
|------------|-------------|---------|
| **Tax 1 Exempt** | `subsidiaryAccounts.tax1Exempt` | When true, Tax1 is zeroed for this entity |
| **Tax 2 Exempt** | `subsidiaryAccounts.tax2Exempt` | When true, Tax2 is zeroed for this entity |
| **Tax 3 Exempt** | `subsidiaryAccounts.tax3Exempt` | When true, Tax3 is zeroed for this entity |
| **Tax 4 Exempt** | `subsidiaryAccounts.tax4Exempt` | When true, Tax4 is zeroed for this entity |

### Document-Level Extra Discount (Egypt Tax Authority)

When sending invoices to the Egypt Tax Authority (ETA), you sometimes need to grant a cash / "pay-now" discount on the whole invoice **after tax** — it lowers the total the customer pays without changing the VAT already calculated. ETA exposes a dedicated **Extra Discount** field on the invoice header for exactly this, separate from the ordinary line discounts.

A field on the **Tax Payer Configuration** named **Document Level Extra Discount Location** controls it: you pick which line discount slot (Discount 1–8) carries this extra discount. That slot's value is then reported in ETA's Extra Discount field instead of being folded into the normal Total Discount Amount.

For example: an item at 10,000, with Discount 1 = 300 and Discount 2 = 200 applied **before** tax, VAT at 14%, plus an 830 cash discount applied **after** tax and designated as the extra discount:

| ETA field | Value |
|-----------|-------|
| Total Sales Amount | 10,000 |
| Total Discount Amount | 500 (Discount 1 + 2, before tax) |
| Net Amount | 9,500 |
| Total Tax (14% of 9,500) | 1,330 |
| Extra Discount Amount | 830 (after tax) |
| Total Amount | 10,000 |

The portal reconciles the invoice as `Net + Tax − Extra Discount = 9,500 + 1,330 − 830 = 10,000`, and VAT stays exactly 14% of the net.

::: warning
The discount slot chosen as the Extra Discount Location must be applied **after all taxes** in the effect order. An extra discount is post-tax by definition — if the chosen slot is calculated before tax, the reported net amount and tax no longer reconcile, so NamaERP stops the submission with a clear error naming the discount. Move the slot to after the taxes to resolve it.
:::

::: info
This applies to Egypt Tax Authority e-invoices only (tax invoices, credit/debit notes, and their export variants). ZATCA, JoFotara, UAE, and the Egyptian e-receipt are unaffected.
:::

## Common Scenarios and Examples

### Scenario 1: Standard VAT with Trade Discount

**Configuration:**
- `discount1ApplyType`: TotalPrice
- `tax1Location`: HeaderDiscount
- `priceIncludesTax`: false
- `tax1IsDiscount`: false

**Calculation:**
```
Line Total: $1,000
Discount 1 (10%): $100
After Discount: $900
VAT (15%): $135
Final Total: $900 + $135 = $1,035
```

### Scenario 2: Tax-Inclusive Pricing with Discount

**Configuration:**
- `priceIncludesTax`: true
- `discount1ApplyType`: TotalPrice
- `discount1.considerTax1`: true

**Calculation:**
```
Quoted Price (includes 15% VAT): $1,150
VAT Component: $150
Net Price: $1,000
Discount Base (net): $1,000
Discount (10%): $100
Final Net: $900
Final VAT: $135
Final Total: $1,035
```

### Scenario 3: Withholding Tax Configuration

**Configuration:**
- `tax3IsDiscount`: true (makes it a deduction)
- `tax3Location`: HeaderDiscount
- `tax3NotIncludedInTotal`: false

**Calculation:**
```
Line Total: $1,000
VAT (15%): $150
Subtotal: $1,150
Withholding (5%): $50 (deducted)
Final Total: $1,150 - $50 = $1,100
```

### Scenario 4: Complex Effects Order

**Configuration using TaxDiscountEffectsConfig:**
```
Effect 1: Discount1 (10% trade discount)
Effect 2: Discount2 (5% volume discount)  
Effect 3: Tax1 (15% VAT)
Effect 4: HeaderDiscount ($25 promotional)
Effect 5: Tax3 (3% withholding)
```

**Calculation:**
```
Line Total: $1,000
After Discount1: $900
After Discount2: $855
After Tax1: $855 + $128.25 = $983.25
After Header Discount: $958.25
After Withholding: $958.25 - $28.75 = $929.50
```

## Configuration Best Practices

### Setting Up Tax Plans

1. **Create Base Tax Plans**
   - Set `defaultTaxConfig` to control configuration source
   - Configure `taxConfiguration` with standard settings
   - Define `legalEntityTaxes` for different entities and date ranges

2. **Configure Tax Behavior**
   - Set `tax[N]IsDiscount` correctly for additions vs deductions
   - Configure `priceIncludesTax[N]` based on pricing strategy
   - Set `tax[N]NotIncludedInTotal` for display-only taxes

3. **Set Application Points**
   - Configure `tax[N]Location` for proper sequence
   - Set `tax[N]ApplyType` for correct base calculation
   - Use `effectsConfig` for complex sequences

### Discount Configuration Guidelines

1. **Sequential Discounts**
   - Configure `discount[N]ApplyType` for cascading discounts
   - Use `AfterDiscount[N-1]Price` for sequential application
   - Consider tax effects with `discount[N].considerTax[N]`

2. **Value vs Percentage**
   - Set `calcDisc[N]PercentFromValue` based on business rules
   - Use value-based for fixed discounts
   - Use percentage-based for proportional discounts

### Tax Configuration Validation

Before deploying tax configurations:

1. **Verify Calculation Direction**
   - Check `tax[N]IsDiscount` for correct addition/subtraction
   - Validate `priceIncludesTax[N]` matches pricing strategy

2. **Test Date Ranges**
   - Ensure `effectiveFrom` and `effectiveTo` cover required periods
   - Test rate transitions at date boundaries

3. **Validate Sequences**
   - Confirm `effectsOrder` produces expected results
   - Test with sample data covering all scenarios

## Troubleshooting Guide

### Common Configuration Issues

#### Issue: Tax Being Added Instead of Deducted

**Check These Fields:**
- `tax[N]IsDiscount`: Should be `true` for deductions
- `tax[N]Location`: Verify calculation point
- `effectsConfig`: Check if custom sequence overrides settings

#### Issue: Incorrect Discount Base

**Check These Fields:**
- `discount[N]ApplyType`: Verify base value selection
- `discount[N].considerTax[N]`: Check tax consideration
- `effectsConfig`: Review custom calculation rules

#### Issue: Tax Not Appearing in Total

**Check These Fields:**
- `tax[N]NotIncludedInTotal`: Should be `false` to include
- `noItemTaxesWithThisPolicy`: Should be `false` for Tax1/Tax2
- `noInvoiceTaxesWithThisPolicy`: Should be `false` for Tax3/Tax4
- Customer/Supplier `tax[N]Exempt`: Check exemption flags

#### Issue: Wrong Tax Rate Applied

**Check Resolution Order:**
1. Header tax plan with matching legal entity and date
2. Line tax plan with matching criteria
3. Global configuration default
4. Verify `priorityPolicyOverCusOrSup` setting

### Validation Rules

The system enforces these validation rules:

1. **Tax Plan Consistency**
   - `itemPlan` and `noItemTaxesWithThisPolicy` cannot both be true
   - Configuration combinations must be mathematically valid

2. **Calculation Integrity**
   - Discount amounts cannot make line totals negative
   - Tax percentages must be within valid ranges
   - Rounding must maintain accuracy

3. **Date Range Validity**
   - Overlapping date ranges for same entity not allowed
   - Effective dates must be logically consistent

## Performance Considerations

### Optimization Guidelines

1. **Minimize Effects Configuration Complexity**
   - Use only necessary effect positions
   - Avoid redundant calculations
   - Cache frequently used configurations

2. **Efficient Tax Plan Design**
   - Minimize legal entity tax records
   - Use date ranges effectively
   - Leverage default configurations

3. **Configuration Caching**
   - Tax configurations are cached per invoice
   - Avoid unnecessary tax plan changes
   - Use consistent configurations across similar documents

::: warning Important
Always test configuration changes in a development environment before applying to production systems. Complex discount and tax interactions can have unexpected results, especially when using custom effects configurations.
:::

## Summary

The Nama ERP invoice discount and tax calculation system provides extensive flexibility through:

- **Hierarchical Configuration**: Tax plans, legal entity rates, and global defaults
- **Flexible Calculation**: Taxes can be additions or deductions
- **Custom Sequences**: Complete control over calculation order via effects configuration
- **Date-Based Rates**: Automatic rate changes over time
- **Entity-Specific Settings**: Different rates and rules per legal entity
- **Comprehensive Control**: Field-level configuration for all aspects of calculation

The eight-level discount structure, the unified tax model and the effects configuration between them cover complex discount and tax requirements through configuration alone, without anyone writing code for them.

Understanding the field-level configuration options and the tax configuration resolution process is essential for proper system setup and maintenance. The combination of tax plans, configuration objects, and effects ordering provides the flexibility to handle virtually any business requirement while maintaining calculation accuracy and regulatory compliance.
