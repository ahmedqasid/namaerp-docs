# NamaRep Complete Guide for Jasper Reports

## Overview
NamaRep is a powerful utility class that provides essential functions for Jasper Reports in Nama ERP. It extends ServerNamaRep and offers comprehensive features for localization, data retrieval, entity linking, pricing calculations, and more. This guide provides a complete reference for all available NamaRep methods and their usage patterns.

## Core Localization & Translation

### Name Selection Based on Language
```groovy
// Automatically selects Arabic or English name based on current language
NamaRep.name(name1, name2)  // Returns name1 for Arabic, name2 for English

// With fallback to code if names are empty
NamaRep.nameOrCode(code, name1, name2)
```

### Translation Methods
```groovy
// Translate any value (strings, booleans, enums)
NamaRep.translate(value)

// Translate boolean values to localized text
NamaRep.translate(true)  // Returns localized "Yes" or "نعم"

// Translate field IDs with entity context
NamaRep.title(entityType, fieldId)
NamaRep.translate(entityType, fieldId)

// Translate with prefix
NamaRep.translate("prefix", "value")  // Translates "prefix.value"

// Split translated text with pipe separator
NamaRep.head("header|subtitle")  // Returns "header"
NamaRep.sub("header|subtitle")   // Returns "subtitle"
```

## Date & Time Functions

### Hijri Calendar Support
```groovy
// Convert Gregorian to Hijri
NamaRep.toHijri(date)                    // Full Hijri date string
NamaRep.toHijriDate(date)                // HijriDate object
NamaRep.hijriDay(date)                   // Day in Hijri (padded)
NamaRep.hijriMonth(date)                 // Month in Hijri (padded)
NamaRep.hijriYear(date)                  // Year in Hijri
NamaRep.hijri_yyyyMMdd(date)            // Format: yyyyMMdd
```

### Day Names
```groovy
NamaRep.dayName(date)        // Returns day name in current language
NamaRep.arDayName(date)      // Arabic day name
NamaRep.enDayName(date)      // English day name
NamaRep.dayName(dayNumber)   // 1=Sunday, 2=Monday, etc.
```

### Time Conversion
```groovy
// Convert decimal hours to time format
NamaRep.decimalToTime(9.5)           // Returns "09:30"
NamaRep.decimalToTimeNullable(0)     // Returns null instead of "00:00"

// Convert milliseconds to time format
NamaRep.timeToString(9120000)        // Returns "02:32"
NamaRep.timeToStringNullable(0)      // Returns null instead of "00:00"
```

### Date Calculations
```groovy
// Calculate months between dates
NamaRep.dateDiffInMonth(date1, date2)
```

## Number Formatting & Conversion

### Arabic Numerals
```groovy
// Convert Western to Arabic-Hindi numerals
NamaRep.arNumbers("123")  // Returns "١٢٣"
```

### Decimal Helpers
```groovy
// Null-safe operations
NamaRep.zeroIfNull(value)        // Returns 0 if null
NamaRep.oneIfZero(value)         // Returns 1 if zero
NamaRep.nullIfZero(value)        // Returns null if zero

// Convert to BigDecimal
NamaRep.objectToDecimal(value)   // Safe conversion to BigDecimal
```

### Number Patterns
```groovy
NamaRep.currencyPattern()                    // Default currency pattern
NamaRep.currencyPattern(currencyCode)        // Specific currency pattern
NamaRep.quantityPattern()                    // Default quantity pattern
NamaRep.quantityPattern(uomCode)            // Specific UOM pattern
NamaRep.ratePattern()                        // Rate pattern
NamaRep.percentPattern()                     // Percentage pattern
NamaRep.datePattern()                        // Date pattern
NamaRep.timePattern()                        // Time pattern
NamaRep.dateTimePattern()                    // DateTime pattern
```

### Mathematical Operations
```groovy
// Access math utilities
NamaRep.math.round(value, scale)
NamaRep.round(value, scale)
```

## Tafqeet (Number to Words)

```groovy
// Convert numbers to words in different languages
NamaRep.tafqeet(currencyCode, amount)        // Current language
NamaRep.tafqeetArabic(currencyCode, amount)  // Arabic
NamaRep.tafqeetEnglish(currencyCode, amount) // English
NamaRep.tafqeetFrench(currencyCode, amount)  // French
```

## Entity Links & Navigation

### Basic Entity Links
```groovy
// Create link to entity
NamaRep.link(entityType, id)
NamaRep.link(serverUrl, entityType, id)

// Advanced link builder
NamaRep.link()
  .entityType("Customer")
  .id(customerId)
  .menuCode("CustomerMenu")
  .viewName("DetailView")
  .url(serverUrl)
  .toString()
```

### Attachment Links
```groovy
// Create link to attachment/document
NamaRep.attachmentLink(attachmentId)
NamaRep.attachmentLink(serverUrl, attachmentId)

// Get attachment as InputStream
NamaRep.getFile(attachmentId)
NamaRep.getAttachment(attachmentId)
```

### Report Links
```groovy
// Link to another report by code
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "ReportCode")
  .p("param1").v(value1)
  .p("param2").v(value2)
  .copyParams()  // Copy all shared parameters
  .toString()

// Link by report ID
NamaRep.repLinkById($P{REPORT_PARAMETERS_MAP}, reportId)
  .p("param").ref(entityType, id)
  .p("param2").refCode(entityType, code)
  .toString()

// Public report link (no authentication required)
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "PublicReport")
  .p("Code_Equals").ref(entityType, id)
  .toNoAuthResultLink()
```

## Entity Creation (Creators)

### Basic Creator
```groovy
// Create new entity with fields
NamaRep.newWithFields("ReceiptVoucher")
  .f("term").value("POTermCode")
  .f("book").value("POBook1")
  .f("remarks").v("Auto Created")
  .f("fromDoc#type").v("SalesInvoice")
  .f("fromDoc#code").v(invoiceCode)
  .menuCode("ReceiptMenu")
  .viewName("StandardView")
  .toString()

// Alternative syntax
NamaRep.creator("PurchaseOrder")
  .field("supplier").value(supplierId)
  .toString()
```

### Creator with Line Details
```groovy
// 1. Create variable with initial expression
$V{creatorLink} = NamaRep.newWithFields("PurchaseOrder")
  .field("term").value("P.Order.Term")
  .root()

// 2. Add line items (in detail band)
$V{creatorLink}
  .field("details.item.itemCode").value($F{code})
  .field("details.quantity").value($F{qty})
  .row($V{REPORT_COUNT})

// 3. Generate final link
$V{creatorLink}.toString()
```

## Pricing Calculations

### Price Calculator
```groovy
// Basic price calculation
NamaRep.priceCalculator()
  .item($F{itemId})
  .customer($F{customerId})
  .uom($F{uom})
  .qty($F{quantity})
  .date($F{date})
  .unitPriceOnly()
  .price()

// With all parameters
NamaRep.priceCalculator()
  .item(itemCode)
  .customer(customerCode)
  .supplier(supplierCode)
  .uom(uomCode)
  .qty(quantity)
  .invoiceClassification(classificationCode)
  .legalEntity(legalEntityCode)
  .sector(sectorCode)
  .branch(branchCode)
  .department(departmentCode)
  .analysisSet(analysisSetCode)
  .priceClassifier1(pc1Code)
  .priceClassifier2(pc2Code)
  .revision(revisionCode)
  .color(colorCode)
  .size(sizeCode)
  .date(priceDate)
  .unitPriceOnly()
  .price()
```

### Accessing Price Components
After storing price in variable `$V{price}`:
```groovy
$V{price}.unitPrice.primitiveValue
$V{price}.netValue.primitiveValue
$V{price}.custom.primitiveValue
$V{price}.discount1.percentage.primitiveValue
$V{price}.discount1.value.primitiveValue
$V{price}.discount1.afterValue.primitiveValue
$V{price}.tax1.percentage.primitiveValue
$V{price}.tax1.value.primitiveValue
$V{price}.totalCashShare.primitiveValue
```

### Legacy Price Methods
```groovy
// Get item prices
NamaRep.getItemPriceByCode(itemCode)
NamaRep.getItemPriceById(itemId)
NamaRep.getNetPurchaseValue(itemCode)

// Customer-specific pricing
NamaRep.getItemPriceForCustomer(item, customer)
NamaRep.getPricesForCustomer(item, customer, uom, qty)
NamaRep.getPricesForCustomer(item, customer, uom, qty, classification, date)
```

## Approval System

### Document Approval Links
```groovy
// Approve/Reject all lines
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.rejectAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllToPreviousStepLink($P{REPORT_PARAMETERS_MAP})

// With reason
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP}, reasonCode)
NamaRep.rejectAllLink($P{REPORT_PARAMETERS_MAP}, reasonCode)

// Per-line approval
NamaRep.approveLink($P{REPORT_PARAMETERS_MAP}, lineNumber)
NamaRep.rejectLink($P{REPORT_PARAMETERS_MAP}, lineNumber)
NamaRep.returnLink($P{REPORT_PARAMETERS_MAP}, lineNumber)
NamaRep.returnToPreviousStepLink($P{REPORT_PARAMETERS_MAP}, lineNumber)

// Check if line needs approval
NamaRep.isConcernedLine($P{REPORT_PARAMETERS_MAP}, lineNumber)
```

### JavaScript Approval Dialog
```groovy
// Show approval dialog in browser
NamaRep.approveFromJS(entityType, entityId, nextStepName, 
                      concernedLines, nextStepSeq, summary)
```

## Database Operations

### SQL Queries
```groovy
// Execute SQL query with parameters
List results = NamaRep.runSQLQuery(
  "SELECT * FROM Customer WHERE code = ? AND active = ?",
  customerCode, true
)

// Format query results
NamaRep.formatQueryResult(results, "\n", ",")  // Row separator, column separator
```

### Module Configuration
```groovy
// Get configuration value
NamaRep.getValueFromModuleConfig("basic", "value.info.useCurrentUserAsSalesMan")
NamaRep.getValueFromModuleConfig("accounting", "defaultCurrency")
```

## Employee & HR Functions

### Vacation Balances
```groovy
// Default vacation types
NamaRep.getVacation1RemainderBalance(employeeId)
NamaRep.getVacation2RemainderBalance(employeeId)
NamaRep.getVacation3RemainderBalance(employeeId)

// Specific vacation type
NamaRep.getVacationRemainderBalance(employeeId, vacationType)
NamaRep.getVacationRemainderBalance(employeeId, vacationType, atDate)

// Detailed vacation information
NamaRep.getVacationAssignedConsumedRemainder(employeeId, vacationType)
NamaRep.getVacationAssignedConsumedRemainder(employeeId, vacationType, atDate)

// Balance per years
NamaRep.getRemainderBalancePerYears(employeeId, atDate, yearsCount)
```

## Security & Permissions

### Security Constraints for Reports
```groovy
// Create security constraint parameter
NamaRep.security()
  .fieldEntityType("Account")
  .tableAlias("acc")
  .capabilities("firstAuthor", "viewCapability", "updateCapability", 
                "legalEntity", "branch", "sector", "department", "analysisSet")
  .toString()

// Multiple table constraints
NamaRep.security()
  .fieldEntityType("Account")
  .tableAlias("acc")
  .capabilities("viewCapability", "legalEntity")
+ " AND " +
NamaRep.security()
  .fieldEntityType("FiscalYear")
  .tableAlias("fy")
  .capabilities("legalEntity", "branch")
```

### Display Permissions
```groovy
// Check if user can display parameter/field
NamaRep.canDisplay(parameter)
```

## Utility Functions

### String Utilities
```groovy
// Access string utilities
NamaRep.strUtils.leftPad(value, length)
NamaRep.strUtils.toUUIDStr(id)

// HTML to text conversion
NamaRep.htmlToText(htmlContent)

// UUID conversion
NamaRep.toUUIDString(id)
NamaRep.idToStr(id)
```

### Serial Numbers
```groovy
// Expand compressed serials
NamaRep.expandSerials(serials)                      // Default newline separator
NamaRep.expandSerials(serials, separator)           // Custom separator
NamaRep.unzipSerials(serials)                      // Returns List<String>
NamaRep.unzipSerialsWithNewLines(serials)
NamaRep.unzipSerialsWithComma(serials)
NamaRep.unzipSerialsWithSeparator(serials, ";")

// Compress serial ranges
NamaRep.zipSerialsRange(serials)
```

### Encryption/Decryption
```groovy
// Standard encryption
NamaRep.decryptStr(encryptedString)

// Multiple encryption methods
NamaRep.encryptX(text) / NamaRep.decryptX(encrypted)
NamaRep.encrypt1(text) / NamaRep.decrypt1(encrypted)
NamaRep.encrypt2(text) / NamaRep.decrypt2(encrypted)
```

### ZATCA QR Codes (Saudi Tax Authority)
```groovy
// Generate ZATCA QR code
NamaRep.genZATCAQR(sellerName, vatNumber, timestamp, 
                   invoiceAmount, vatAmount)

// With separate value and creation dates
NamaRep.genZATCAQRWithCreationDate(sellerName, vatNumber, 
                                   valueDate, creationDate, 
                                   invoiceAmount, vatAmount)

// From entity
NamaRep.genZatcaQrCodeFromEntity(entityType, idOrCode)
NamaRep.zatcaHashedInvoice(entityType, id)
```

### URL Shortening
```groovy
NamaRep.shortenURL(serverUrl, signature, longUrl)
```

### Saudi Riyal Symbol
```groovy
// Returns SAR symbol as InputStream for image component
NamaRep.sar()
```

## Advanced Features

### Values Holder
```groovy
// Create values holder for complex operations
ValuesHolder holder = NamaRep.holder()
```

### Report References
```groovy
// Create report reference objects
NamaRep.repRef(entityType, id, code, name1, name2)
NamaRep.repRefOrderByCode(entityType, id, code, name1, name2)
NamaRep.repRefOrderById(entityType, id, code, name1, name2)
NamaRep.repRefOrderByName1(entityType, id, code, name1, name2)
NamaRep.repRefOrderByName2(entityType, id, code, name1, name2)
```

### Order By Builder
```groovy
NamaRep.orderBy()
  .orderByParameterTitles("Date", "Code", "Name")
  .orderByParameterColumns("valueDate", "code", "name1")
  .orderByDirections("ASC", "DESC", "ASC")
  .selectedOrderBy("Date", "Code")
  .selectSortDirections("DESC", "ASC")
  .setColumnsBeforeGroupFields(true)
  .toString()
```

### Group Expressions
```groovy
// Create composite group key
NamaRep.groupExpression(field1, field2, field3)
```

### Map Creation
```groovy
// Create map from key-value pairs
Map data = NamaRep.map("key1", value1, "key2", value2)
```

### Audit Trail
```groovy
// Get audit information
NamaRep.audit(entityType, id, versionNumber, actionType)
```

### File Operations
```groovy
// Retrieve file ID for entity
NamaRep.retrieverFileId(entityType, idOrCode)
```

## System Parameters Available in Reports

All reports have access to these system parameters:

### User & Login Information
- `loginLanguage` - Current language (Arabic/English)
- `loginUserId`, `loginUserCode`, `loginUserName1`, `loginUserName2`
- `loginEmployeeId`
- `currentUser` - Current user object

### Organization Structure
- `loginLegalEntityId`, `loginLegalEntityCode`, `loginLegalEntityName1`, `loginLegalEntityName2`
- `loginSectorId`, `loginSectorCode`, `loginSectorName1`, `loginSectorName2`
- `loginBranchId`, `loginBranchCode`, `loginBranchName1`, `loginBranchName2`
- `loginDepartmentId`, `loginDepartmentCode`, `loginDepartmentName1`, `loginDepartmentName2`
- `loginAnalysisSetId`, `loginAnalysisSetCode`, `loginAnalysisSetName1`, `loginAnalysisSetName2`

### Logos & Branding
- `loginLegalEntityLogo` - Primary logo (InputStream)
- `loginLegalEntityLogo2` through `loginLegalEntityLogo5` - Additional logos
- `reportsFooterNote1`, `reportsFooterNote2` - Footer text

### Report Context
- `formEntityType` - Entity type for the form
- `reportCode`, `reportId`, `reportName1`, `reportName2`
- `namaReportInstance` - Report instance object
- `runId` - Unique run identifier

### URLs
- `guiServerURL` - GUI server URL
- `externalServerURL` - External server URL
- `currentGUIURL` - Current GUI URL

### Approval System
- `concernedLines` - Lines requiring approval
- `candidateEmployeeId`, `candidateEmployeeCode`, `candidateEmployeeName1`, `candidateEmployeeName2`
- `approvedRecordId`, `approvedRecordType`, `approvedRecordCode`
- `approvalSecret`, `approvalStepSeq`

### Security & Permissions
- `allowedCapabilities`, `allowedEntities`, `allowedDocuments`, `allowedFiles`
- `notAllowedEntities`, `notAllowedDocuments`, `notAllowedFiles`
- `accessibleLegalEntityIds`, `accessibleSectorIds`, `accessibleBranchIds`
- `accessibleDepartmentIds`, `accessibleAnalysisSetIds`

### Security Flags
- `legalEntityNotUsedInSecurity`
- `sectorNotUsedInSecurity`
- `branchNotUsedInSecurity`
- `departmentNotUsedInSecurity`
- `analysisSetNotUsedInSecurity`

### Other
- `posShiftCode` - POS shift code
- `currentReplicationSiteId`, `currentReplicationSiteCode`
- `currentReplicationSiteName1`, `currentReplicationSiteName2`

## Best Practices

### 1. Variable Creation for Complex Objects
When working with price calculations or report links, create variables:
```xml
<variable name="price" class="java.lang.Object" calculation="No Calculation Function">
  <initialValueExpression>
    NamaRep.priceCalculator().item($F{item}).qty($F{qty}).price()
  </initialValueExpression>
</variable>
```

### 2. Null Safety
Always use null-safe methods when dealing with potentially null values:
```groovy
NamaRep.zeroIfNull(value)    // Instead of direct value access
NamaRep.nameOrCode(code, name1, name2)  // Fallback to code
```

### 3. Localization
Always use translation methods for user-facing text:
```groovy
NamaRep.translate(enumValue)  // For enums
NamaRep.name(arabic, english)  // For dual-language fields
```

### 4. Performance Optimization
- Cache complex calculations in variables
- Use `copyParams()` when linking reports to avoid parameter duplication
- Batch SQL queries when possible

### 5. Security Constraints
Always apply security constraints when querying sensitive data:
```sql
SELECT * FROM Account acc 
WHERE acc.active = true 
  AND $P!{SECURITY_CONSTRAINTS}
```

## Migration from Legacy Methods

If you're updating old reports, here are common replacements:

| Old Method | New Method |
|------------|------------|
| Direct field access | `NamaRep.name(name1, name2)` |
| Manual date formatting | `NamaRep.datePattern()` |
| Custom price queries | `NamaRep.priceCalculator()` |
| Manual translation | `NamaRep.translate()` |

## Troubleshooting

### Common Issues and Solutions

1. **Arabic text not displaying**: Ensure font supports Arabic and PDF encoding is set to `Identity-H`
2. **Null pointer exceptions**: Use null-safe methods like `zeroIfNull()`
3. **Price calculations returning null**: Verify all required parameters are provided
4. **Links not working**: Check that entity type and ID are valid
5. **Security constraints not applying**: Ensure parameter name matches exactly in query

## Conclusion

NamaRep provides a comprehensive toolkit for Jasper Reports development in Nama ERP. By leveraging these utilities, you can create powerful, localized, and secure reports that integrate seamlessly with the ERP system. Always refer to this guide when developing new reports or maintaining existing ones.

For additional support or undocumented features, consult the Nama ERP development team.