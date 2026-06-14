# Frequently Asked Questions about Invoices and Payments

## I have a customer who wants to pay an invoice in 12 installments: 10 monthly installments at 5% each, plus two additional installments in months 5 and 10 at 25% each — how can this be set up in a payment schedule template?

You can implement this scenario using a **Payment Schedule Template** in Nama ERP as follows:

### Required Settings:

* **Payment Type** field: select "Variable Payments" (`VariablePayments`)
* Set the time period to "Month" (`Month`)
* Do not add a grace period (or leave it as needed)
* Use a **percentage** for each installment

### Installment Distribution:

* First 10 monthly installments, from month 1 through month 10, at **5% per month**
* An additional installment in **month 5** at **25%**
* An additional installment in **month 10** at **25%**

### Notes:

* This distribution results in a total of 50% from the monthly installments (10 × 5%), plus 25% in month 5 and 25% in month 10, bringing the total to 100% of the invoice value.
* In months 5 and 10, two installments will be generated on the same date: one at 5% and one at 25%.

### Example in JSON Format for Direct Import:

::: details JSON for direct import

```json
{
  "paymentType": "VariablePayments",
  "roundingType": "CEILING",
  "details": [
    {
      "paymentPeriod": {
        "value": 1,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 2,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 3,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 4,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 5,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 6,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 7,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 8,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 9,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 10,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 5
    },
    {
      "paymentPeriod": {
        "value": 5,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 25
    },
    {
      "paymentPeriod": {
        "value": 10,
        "uom": "Month"
      },
      "paymentType": "Percentage",
      "paymentPercent": 25
    }
  ]
}
```

:::
