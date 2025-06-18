<rtl>

# أسئلة شائعة حول الفواتير والدفع

## عندي عميل يريد سداد الفاتورة على 12 قسطًا: 10 أقساط شهرية بنسبة 5% لكل قسط، وقسطين إضافيين في الشهر الخامس والعاشر بنسبة 25% لكل منهما — كيف يمكن تنفيذ ذلك في نموذج جدولة دفعات؟

يمكن تنفيذ هذا السيناريو باستخدام **نموذج جدولة دفعات** في نظام Nama ERP على النحو التالي:

### الإعدادات المطلوبة:

* حقل **نوع الدفع**: اختر "دفعات متغيرة" (`VariablePayments`)
* حدد الفترة الزمنية بـ "شهر" (`Month`)
* لا تضف فترة سماح (أو اتركها حسب الحاجة)
* استخدم **نسبة مئوية** لكل دفعة

### توزيع الدفعات:

* أول 10 دفعات شهرية، من الشهر الأول حتى العاشر، بنسبة **5% لكل شهر**
* دفعة إضافية في **الشهر الخامس** بنسبة **25%**
* دفعة إضافية في **الشهر العاشر** بنسبة **25%**

### ملاحظات:

* هذا التوزيع ينتج عنه مجموع 50% من الدفعات الشهرية (10 × 5%)، بالإضافة إلى 25% في الشهر الخامس و25% في الشهر العاشر، ليصبح المجموع 100% من قيمة الفاتورة.
* سيتولد في الشهرين 5 و10 قسطان لكل منهما بنفس التاريخ، واحد بنسبة 5% وآخر بنسبة 25%.

### مثال بصيغة JSON للاستيراد المباشر:

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

</rtl>
