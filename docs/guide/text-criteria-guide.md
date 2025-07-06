# Criteria from Text Parser

Nama ERP provides a flexible text-based filtering mechanism that allows users to define filter criteria using a simple, structured format.

Each filter condition in Nama ERP consists of the following components:

* **Field ID**: The property (field) to apply the filter on.
* **Operator**: One of the following options:

    * `Equal`, `NotEqual`
    * `GreaterThan`, `GreaterThanOrEqual`
    * `LessThan`, `LessThanOrEqual`
    * `StartsWith`, `NotStartsWith`
    * `EndsWith`, `NotEndWith`
    * `Contains`, `NotContain`
    * `In`, `NotIn`
    * `OpenBracket`, `CloseBracket` (used for grouping expressions, and do not require a field ID or value)
* **Compared Value**: The value to compare against.
* **Logical Relationship**: The logical connector to the next condition (`AND` or `OR`).

## Format

Each filter condition is represented as a line of text with four parts separated by commas, followed by a semicolon (`;`):

```
fieldID,operator,value,logic;
```

Multiple conditions should be separated by semicolons.

### Special Field Formats

* **Date Fields**: Format must be `dd-MM-yyyy`
* **Date-Time Fields**: Format must be `yyyy-MM-ddTHH:mm:ss.SSS` (milliseconds can be `000`)
* **Reference Fields**: A reference is written as a colon-separated string:

  ```
  <id>:<entityType>:<code>
  ```

    * The `code` part is optional.
    * Alternatively, you can reference specific parts using `.id` or `.code` for clarity and simplicity.

## Example

```csv
code,StartsWith,01,AND;
name1,Contains,abc,AND;
date1,Equal,06-07-2025,AND;
creationDate,GreaterThanOrEqual,2025-07-06T13:05:00.000,AND;
n1,Equal,10,AND;
section,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd:ItemSection:00,AND;
```

The last line can also be expressed in two alternative forms:

```csv
section.id,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd,AND;
section.code,Equal,00,AND;
```

::: tip
You can use the screen **Criteria Definition** to visually build the required filter conditions through the system interface.
Once you've defined the desired criteria using the UI, simply click the **Convert to Text** button to generate the equivalent text-based representation.
This text can then be used directly in APIs or automation scripts.
:::