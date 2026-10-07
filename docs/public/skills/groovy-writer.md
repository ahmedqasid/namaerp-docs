---
name: groovy-writer
description: >
  Write Nama ERP EntityAction Groovy scripts in the correct Nama style, matching the established patterns from sample scripts.
  Use this skill whenever the user asks to write, create, generate, or draft a Groovy script for Nama ERP — even if they just say
  "write me an action", "I need validation for X", "create an EA for Y", or paste a DM URL and describe logic.
  Always fetch DM URLs to understand entity fields before writing. If the user forgets to provide DM URL(s), remind them.
---

# Groovy Writer

Write Nama ERP `EntityAction` Groovy scripts that match the established Nama coding style exactly.

---

## Step 1 — Gather Requirements

Before writing any code, make sure you have:

1. **A description of the logic** — what the action should validate or do
2. **DM URL(s)** for the entity/entities involved (e.g. `https://dm.namasoft.com/modules/...`)

**If the user did NOT provide DM URLs**, remind them:
> "Please provide the DM URL(s) for the entity/entities involved so I can check the available fields before writing. Example: `https://dm.namasoft.com/modules/basic-forms-7-8/FormDoc7.html`"

Do not write the script until you have both the logic description and the DM URLs.

---

## Step 2 — Fetch the DM

Use `web_fetch` on each DM URL provided. From the DM page, extract:
- Entity class name (e.g. `Remark`, `FormDoc5`, `BasicSCDocument`)
- Detail line class name (e.g. `RemarkLine`, `FormDoc5Line1`, `BasicSCDocumentLine`)
- Available fields: `ref1`–`ref8`, `number1`–`number35`, `date1`–`dateN`, `text1`–`textN`, `description1`–`descriptionN`
- Any special fields (e.g. `remarkDate`, `valueDate`, `term`, `code`, `altCode`)
- The correct `IdsOf*` class name for criteria (e.g. `IdsOfRemark`, `IdsOfFormDoc5`)
- The correct module package for imports

---

## Step 3 — Write the Script

### Package & Class Naming

```groovy
package com.namasoft.entiyactions
// OR for plug-n-play:
package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy
```

Package names are always lowercase `com.namasoft...`. Groovy resolves imports case-sensitively, so `com.Namasoft...` fails to compile.

Class name format: `EA` + `[ClientName]` + `[DescriptiveName]`
Example: `EAKuwaitPreventRemarkMoreThan1DayConsideringLineDate`

---

### Standard Imports (include only what's needed)

```groovy
import com.namasoft.common.Pair
import com.namasoft.common.fieldids.newids.basic.IdsOf[Entity]
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.NamaLogger
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.details.[DetailLineClass]
import com.namasoft.modules.basic.domain.entities.[EntityClass]
```

---

### Class Structure

```groovy
public class EA[Name] implements EntityAction<[EntityClass]> {

    // Instance-level maps if needed (e.g. for totals accumulation)
    private Map<Pair<GenericReference, DateDF>, List<DecimalDF>> totals = new HashMap<>();

    @Override
    public Result doAction([EntityClass] object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();

        // --- logic here ---

        return result;
    }

    // Helper methods below doAction

    @Override
    boolean shouldNotDisplayEntityFlowNameWhenFailure() {
        return true;
    }
}
```

---

### Core Patterns

**Null / empty check:**
```groovy
ObjectChecker.isEmptyOrNull(l.getRef1())
!ObjectChecker.isEmptyOrNull(l.getRef1())
```

**Yes/no (BooleanDF) fields:**
```groovy
BooleanDF.isTrue(l.getB1())    // null counts as false
BooleanDF.isFalse(l.getB1())   // true when false or null
```
Never pass a BooleanDF to `ObjectChecker.isTrue(...)` — it only accepts `Boolean` and `String`, and fails at runtime with
`MissingMethodException: No signature of method ObjectChecker.isTrue() ... (BooleanDF)`.
Never write `!BooleanDF.isTrue(x)`; use `BooleanDF.isFalse(x)`.

**Has numeric values:**
```groovy
private static boolean hasValues(List<DecimalDF> numbers) {
    return numbers.stream().anyMatch(n -> DecimalDF.isNotEmptyOrZero(n));
}
// Usage:
hasValues(CollectionsUtility.asList(l.getNumber1(), l.getNumber11(), l.getNumber21(), l.getNumber31()))
```

**Failure result (accumulating):**
```groovy
Result.createFailureResult("Error message {0} and {1}", param1, param2).addToAccumulatingResult(result);
```

**Iterating details:**
```groovy
for (int i = 0; i < object.getDetails().size(); i++) {
    def l = object.getDetails()[i];
    // ...
}
// OR simpler:
for (def l : object.getDetails()) { ... }
```

**TextDF comparison:**
```groovy
def overtime = TextDF.fromString("وقت اضافي")
if (ObjectChecker.areEqual(object.getDescription1(), overtime))
    return result;
```

**Day of week check:**
```groovy
boolean isFriday = l.getDate1()?.getPrimitiveValue()?.getDayOfWeek() == DayOfWeek.FRIDAY;
```

**Totals accumulation map:**
```groovy
void addNumbers(GenericReference ref, [DetailLine] l, List<DecimalDF> ns) {
    if (ObjectChecker.isEmptyOrNull(ref))
        return;
    def refNumbers = totals.computeIfAbsent(
        new Pair<GenericReference, DateDF>(ref, l.getDate1()),
        { new ArrayList<>(List.of(DecimalDF.zero(), DecimalDF.zero(), DecimalDF.zero(), DecimalDF.zero())) }
    );
    for (int i = 0; i < refNumbers.size(); i++) {
        refNumbers[i] = refNumbers[i] + ns[i];
    }
}
```

**DB query with Persister + CriteriaBuilder:**
```groovy
List<[Entity]> results = Persister.listPageMatching([Entity].class,
    ListPageMatchingParameters.create().criteria(
        CriteriaBuilder.create()
            .field(IdsOf[Entity].details + ".date1").in(dates)
            .and().idNotEqual(object.getId())
            .and().field(IdsOf[Entity].[dateField]).greaterThanOrEqual(object.get[DateField]().monthStart())
            .and().field(IdsOf[Entity].[dateField]).lessThanOrEqual(object.get[DateField]().monthEnd())
            .build()));
```

**Raw JDBC query:**
```groovy
def sql = "select sum(number1+number2) from [DetailTable] l where l.ref1Id = {ref1Id} and l.remark_id <> {id}";
NamaLogger.error(sql);
DecimalDF total = DecimalDF.fromQueryResult(
    Persister.prepareAndExecuteJDBCQuery(
        Map.of("ref1Id", ref.getId(), "id", object.getId()),
        sql));
```

**Totalize number fields (varargs):**
```groovy
static DecimalDF totalizeNumberFields([DetailLine] l, int ... ns) {
    DecimalDF total = DecimalDF.zero();
    for (final def n in ns) {
        total += (l["number" + n] as DecimalDF)
    }
    return total;
}
```

**GenericReference toReal:**
```groovy
def ref1 = GenericReference.toReal(l.getRef1())
if (ref1 == null) continue;
```

**Field access via bracket notation (dynamic):**
```groovy
ref8["n" + ref8N] as DecimalDF
ref8["description" + (ref8N - 100)].toString()
l["number" + n] as DecimalDF
```

**Distinct dates stream:**
```groovy
def dates = object.getDetails().stream()
    .map { it.getDate1() }
    .filter { it != null }
    .distinct()
    .toList();
```

---

### Error Message Style

- Arabic messages for Kuwait/Gulf clients: `"إجمالي اليومية لـ {0} في التاريخ {1} هو {2}، لا يمكن أن يكون أكثر من 1"`
- English messages for generic/international: `"Total of day for {0} on date {1} is {2}, it can not be more than 1"`
- Always use `{0}`, `{1}`, `{2}` placeholders — never string concatenation in error messages
- Pass entity references, dates, and values directly as parameters to `createFailureResult`

---

### DecimalDF Helpers

```groovy
DecimalDF.zero()
DecimalDF.one()
DecimalDF.fromInteger(2)
DecimalDF.fromString("50")
DecimalDF.isNotEmptyOrZero(n)
DecimalDF.fromQueryResult(...)
```

---

## Step 4 — Wire the Script into an Entity Flow

Tell the user how to attach the script. On the Entity Flow screen, each line of the actions grid has its own **Groovy Script** column:

1. Paste the complete script into **Groovy Script**.
2. Leave **Class Name** empty. On save the system fills it with the script's own class name (e.g. `com.namasoft.entiyactions.EAKuwaitPrevent...`) before the required-field check runs — that is expected.
3. Choose the **Target Action** (e.g. Validate On Save for a validator).
4. Fill **Parameter 1..15** if the script reads parameters. They arrive in order: Parameter 1 = `parameters[0]`, Parameter 2 = `parameters[1]`, ... Parameter 15 = `parameters[14]`.
5. Save. Saving compiles the script, so a syntax or import error shows at save time. The parameter titles are filled from the script's `columnNames()`.

Older flows instead put `EAGroovyAction` in Class Name and the script in **Parameter 1**. In that setup `parameters[0]` is the script text itself and the script's first real input is Parameter 2 (`parameters[1]`). Prefer the Groovy Script column for new flows; if both are filled, the Groovy Script column wins.

When the script reads parameters, override `columnNames()` so the user sees a title above each one:

```groovy
@Override
List<String> columnNames() {
    return ["Minimum remarks length"]
}
```

Full page: https://docs.namasoft.com/entity-flows/core/EAGroovyAction.html

---

## Step 5 — Output

- Provide the **complete `.groovy` file** — no placeholders, no "fill this in" comments
- Class name and package must be correct
- All imports must be present and correct based on what's actually used
- Add inline `//` comments in Arabic or English matching the client's language preference
- If the logic is complex, add a brief explanation after the code block describing what each section does

---

## Reminders

- Never use string concatenation in `createFailureResult` — always use `{0}` placeholders
- Always null-check dates before using `.getDayOfWeek()` — use safe navigation `?.`
- Always filter null dates before passing to `.in(dates)` in CriteriaBuilder
- Use `computeIfAbsent` for map initialization, not `putIfAbsent`
- `shouldNotDisplayEntityFlowNameWhenFailure()` should return `true` when the action is a pure validator
- Yes/no fields: `BooleanDF.isTrue/isFalse`, never `ObjectChecker.isTrue`
- Packages and imports are lowercase `com.namasoft...`

---

## Known Runtime Errors (confirmed from production logs)

### ❌ `def` as generic type parameter
```groovy
// WRONG — compilation error: "Unexpected input: ','"
Map<String, def> myMap = new HashMap<>()

// CORRECT
Map<String, Object> myMap = new HashMap<>()
```
Groovy does not allow `def` inside generic type parameters `<>`. Always use a concrete type like `Object`, `String`, `List`, etc.

---

### ❌ `Result.isFailure()` does not exist — use `result.failed()`
```groovy
// WRONG — runtime error: "No signature of method: Result.isFailure()"
if (result.isFailure()) {
    return result
}

// CORRECT
if (result.failed()) {
    return result
}
```
An accumulating result turns failed as soon as a failure is added to it, so `failed()` works for early exit too:

```groovy
Result result = Result.createAccumulatingResult()
for (def l : object.getDetails()) {
    // ... validate ...
    if (someConditionFails)
        Result.createFailureResult("رسالة الخطأ {0}", param).addToAccumulatingResult(result)
}
if (result.failed())
    return result  // stop here, don't proceed to next phase

// continue with next validation phase...
```

---

### ❌ `ObjectChecker.isTrue(...)` on a yes/no field
```groovy
// WRONG — runtime error: "MissingMethodException: No signature of method ObjectChecker.isTrue() ... (BooleanDF)"
if (ObjectChecker.isTrue(l.getB1())) { ... }

// CORRECT
if (BooleanDF.isTrue(l.getB1())) { ... }
```
