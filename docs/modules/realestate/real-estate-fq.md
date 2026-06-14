# Real Estate Investment FAQ

## How do I extract the journal entry from a real estate investment cost distribution?

**Question:**
In the *Real Estate Investment Cost Document* (**RECostDocument**), I need to extract the accounting journal entry based on the distribution the system created and added to the **REEstateCostEntry** table. How can I do that?

**Answer:**
There is a utility named **fetchCostEntries** that returns the **REEstateCostEntry** lines belonging to the current document.
You can then use the entity flow **EAAddAccountingEffects** to add the accounting effect based on the values in that table.

**Example:**
```text
$fetchCostEntries.costValue=CostDR,CostCR
````

In the accounting effect you can use any field from the line. Among the available fields are:

* `estate`
* `owner`
* and the rest of the fields defined in the **REEstateCostEntry** table
