---
title: EACopyEmptyAccountsFromBag
module: core
---


<div class='entity-flows'>

# EACopyEmptyAccountsFromBag

**This document was generated using AI Tools**

## Purpose
This action copies accounting accounts from an account bag template to empty subsidiary account fields in entities that have subsidiary accounting capabilities. It fills in missing account assignments by using predefined account templates.

## When to Use This Action
- **Account Setup**: Automatically populate subsidiary accounts for new entities
- **Account Template Application**: Apply standard account configurations to entities
- **Missing Account Fill**: Complete partial account setups using template accounts
- **Bulk Account Assignment**: Standardize account assignments across similar entities
- **Account Maintenance**: Update entities with missing subsidiary account information

## How It Works
1. **Interface Check**: Verifies the entity implements HasSubsidiaryAccounts interface
2. **Structure Validation**: Checks that subsidiary accounts and account bag exist
3. **Template Access**: Gets account template from the entity's account bag
4. **Selective Update**: Only fills empty account fields, preserves existing accounts
5. **Account Copy**: Copies accounts from bag template to empty subsidiary account fields

## Entity Type Restrictions
This action **ONLY** works with entities that implement the **HasSubsidiaryAccounts** interface. Common entity types include:
- **Customer**: Customer entities with subsidiary account tracking
- **Vendor**: Vendor entities with subsidiary account management
- **Item**: Items that track subsidiary accounts for different purposes
- **Other Master Files**: Any entity with subsidiary accounting capabilities

## Parameters Required
**No Parameters Required** - This action operates on the current entity without needing additional configuration parameters.

## How Subsidiary Accounts Work

### Subsidiary Account Structure
- **Main Entity**: Core entity (Customer, Vendor, Item, etc.)
- **Subsidiary Accounts**: Collection of specific accounts for different purposes
- **Account Bag**: Template containing standard account assignments
- **Account Types**: Different account categories (Sales, Purchase, Inventory, etc.)

### Account Bag System
- **Template Repository**: Account bags contain predefined account assignments
- **Standard Configurations**: Common account setups for different entity types
- **Reusable Templates**: Same bag can be applied to multiple entities
- **Account Inheritance**: Entities inherit account structure from their bag template

## What This Action Does

### Copy Logic
1. **Checks each subsidiary account field** in the entity
2. **Identifies empty account fields** (fields with no account assigned)
3. **Looks up corresponding account** in the account bag template
4. **Copies account reference** from bag to empty field
5. **Preserves existing accounts** - never overwrites assigned accounts

### Account Field Types
The action processes various subsidiary account types such as:
- **Sales Accounts**: For revenue recognition
- **Purchase Accounts**: For expense tracking
- **Inventory Accounts**: For inventory valuation
- **Cost Accounts**: For cost allocation
- **Discount Accounts**: For discount processing
- **Tax Accounts**: For tax calculation

## Important Notes

⚠️ **CRITICAL WARNINGS:**

1. **Interface Dependency**: Only works with entities implementing HasSubsidiaryAccounts
2. **Empty Fields Only**: Never overwrites existing account assignments
3. **Bag Dependency**: Requires properly configured account bag on the entity
4. **Account Validation**: Copied accounts must be valid and active
5. **No Rollback**: Changes are permanent once applied

## When Action Takes No Effect

### Scenarios Where Nothing Happens
- **No Interface**: Entity doesn't implement HasSubsidiaryAccounts
- **No Subsidiary Accounts**: Entity has no subsidiary account structure
- **No Account Bag**: Entity's account bag is null or empty
- **All Fields Filled**: All subsidiary account fields already have assignments
- **Empty Bag Template**: Account bag has no account assignments

### Success Without Changes
The action returns success even when no changes are made. This is normal behavior for:
- Entities that don't need subsidiary accounts
- Entities with complete account assignments
- Entities without account bag templates

## Common Use Cases

### Customer Account Setup
```
Scenario: New customer created without subsidiary accounts
Account Bag: Contains standard customer account template
Result: Customer gets sales account, receivables account, discount account
```

### Item Account Assignment
```
Scenario: New inventory item missing cost accounts
Account Bag: Contains standard item account template  
Result: Item gets inventory account, COGS account, variance account
```

### Vendor Account Configuration
```
Scenario: Vendor setup with partial account assignments
Account Bag: Contains complete vendor account template
Result: Missing accounts filled from template, existing accounts preserved
```

## Monitoring and Troubleshooting

### Success Indicators
- **Action Completes**: No errors during processing
- **Accounts Populated**: Previously empty account fields now have assignments
- **Template Applied**: Account assignments match the account bag template
- **Existing Preserved**: Pre-existing account assignments remain unchanged

### Common Issues

**"No changes after running action"**
- Check if entity implements HasSubsidiaryAccounts interface
- Verify entity has subsidiary account structure
- Confirm account bag is configured and contains accounts
- Check if all account fields are already populated

**"Some accounts not copied"**
- Account bag may be missing some account types
- Target account fields may already be populated
- Account bag accounts may be inactive or invalid
- Check account bag template completeness

**"Action has no effect"**
- Entity type may not support subsidiary accounts
- Subsidiary account structure may be null
- Account bag may not be assigned to entity
- All target fields may already have accounts

**"Invalid account assignments"**
- Account bag may contain inactive accounts
- Copied accounts may not be appropriate for entity type
- Account structure may have changed since bag creation
- Review account bag configuration

## Best Practices

### Account Bag Management
- **Standard Templates**: Create standard account bag templates for each entity type
- **Regular Updates**: Keep account bag templates current with chart of accounts changes  
- **Testing**: Test account bag templates before applying to production entities
- **Documentation**: Document the purpose and contents of each account bag

### Implementation Strategy
- **Gradual Rollout**: Apply to small groups of entities first
- **Verification**: Check results after running to ensure correct account assignments
- **Exception Handling**: Have procedures for entities that need custom account setups
- **User Training**: Train users on account bag concepts and maintenance

### Maintenance Considerations
- **Account Changes**: Update account bags when chart of accounts changes
- **New Entity Types**: Create appropriate account bags for new entity types
- **Regular Audits**: Periodically review account assignments for accuracy
- **Performance**: Monitor performance on large entity populations

## Account Bag Configuration

### Setting Up Account Bags
1. **Create Account Bag**: Define new account bag entity
2. **Assign Accounts**: Configure account assignments for each subsidiary account type
3. **Test Template**: Verify account bag works with sample entities
4. **Deploy Template**: Assign account bag to appropriate entities
5. **Run Action**: Execute EACopyEmptyAccountsFromBag to apply template

### Account Bag Best Practices
- **Entity-Specific**: Create different bags for different entity types
- **Account Validation**: Ensure all assigned accounts are active and valid
- **Complete Templates**: Include all necessary account types in each bag
- **Regular Review**: Periodically review and update account bag contents

## Related Actions
- **Account Management**: Actions for managing chart of accounts
- **Entity Setup**: Actions for configuring master file entities
- **Subsidiary Account Tools**: Other tools for managing subsidiary accounts
- **Account Validation**: Actions for validating account assignments

---

**Module:** core  
**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACopyEmptyAccountsFromBag`

</div>