# توجيهات مستندات الحسابات

كل مستند حسابات يُنشئ قيدًا يأخذ حساباته من **توجيه المستند** — فحين يقع سند على حساب خاطئ، أو تنتقل ورقة
تجارية إلى حالة غير متوقعة، أو لا يُنشئ خطاب ضمان أي قيد، فالجواب في التوجيه غالبًا. وفكرة التوجيه وكيف
يختار المستند توجيهه مشروحة في
[توجيهات المستندات (قواعد المعالجة لكل نوع)](/ar/modules/accounting/support/accounting-document-terms).
أما الصفحات أدناه فهي المرجع خيارًا بخيار، مجمَّعة بحسب عائلة المستند.

يُذكر كل خيار **بمعرّف حقله** — `termConfig.` ثم اسم الحقل، مثل `termConfig.impliedCollection` — كي تبحث
عن الإعداد أيًّا كانت لغة الشاشة. وتُفتح شاشة التوجيه من **الأساسيات ← الإعدادات ← توجيه مستند**.

<LandingGrid>
  <LandingCard icon="💵" title="سندات القبض والصرف والطلبات" link="/ar/modules/accounting/document-terms/acc-terms-vouchers-and-requests.md" details="سندات وأوامر القبض والصرف، والتحويل البنكي، وطلبات الصرف والقبض، وسند القبض الإلكتروني، ومستندات الكاشير." />
  <LandingCard icon="✍️" title="القيود والإقفال وتوجيهات أخرى" link="/ar/modules/accounting/document-terms/acc-terms-journals-and-closing.md" details="سند القيد، وسند قيد فرق العملة، وتغيير سعر الصرف، والقيد الختامي، وتسوية أعمار الديون، وجاري تحويل الشركات، وتوزيع الأرباح." />
  <LandingCard icon="🧾" title="الإشعارات وفواتير المتنوعات" link="/ar/modules/accounting/document-terms/acc-terms-notes-and-misc-invoices.md" details="الإشعارات الدائنة والمدينة، وفواتير وطلبات وأوامر المتنوعات، وفاتورة تشغيل المعدات." />
  <LandingCard icon="📝" title="الأوراق التجارية" link="/ar/modules/accounting/document-terms/acc-terms-commercial-papers.md" details="إفتتاح الأوراق، والحوافظ البنكية، والإشعار البنكي، والسداد الجزئي، والإلغاء، والأجيو، ونقل الأوراق." />
  <LandingCard icon="🛡️" title="خطابات الضمان والاعتمادات" link="/ar/modules/accounting/document-terms/acc-terms-guarantees-and-credits.md" details="إصدار خطاب الضمان وافتتاحيه وتعديله وإنهاؤه، وتوجيهات الاعتماد البنكي." />
  <LandingCard icon="💳" title="القروض والودائع والتسهيلات" link="/ar/modules/accounting/document-terms/acc-terms-loans-deposits-facilities.md" details="إصدار القرض وسداد أقساطه وفوائده، والتسهيلات الائتمانية، والودائع، وسند إصدار الأرباح." />
  <LandingCard icon="💼" title="الاستثمارات والمصروفات المقدمة" link="/ar/modules/accounting/document-terms/acc-terms-investments-and-prepaid.md" details="أذون الخزانة، وسندات ووثائق الاستثمار، ومحافظ الاستثمار، والمصروفات المقدمة." />
</LandingGrid>

::: tip نوعان من الجوانب المحاسبية
بعض الأزواج على هذه الشاشات كتلة جانب محاسبي كاملة، مشروحة في
[إعدادات التأثيرات المحاسبية](/ar/modules/supplychain/document-terms/doc-term-accounting-effects)؛
وبعضها حقل مرجع واحد إلى سجل
[إعداد جانب محاسبي](/ar/platform/shared-master-files/accounting-side-config) محفوظ. وفي الحالتين لا يُنشئ
الزوج في أغلب التوجيهات قيدًا إلا إذا ضُبط مدينه ودائنه كلاهما، ويُتخطى الزوج نصف المملوء دون رسالة. والاستثناءات القليلة مذكورة في صفحاتها.
:::
