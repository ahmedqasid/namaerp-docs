# CRM Settings

The CRM module has its own settings screen, reached from the configuration area rather than from the CRM menu itself. It is refreshingly short — eight options and one grid — and unlike some module settings screens, most of what is on it genuinely does something.

Two of the options change how staff enter data every day, so it is worth setting them deliberately rather than leaving the defaults.

## The options

| Setting | Arabic label | What it does |
|---|---|---|
| **Compliant Source** | مصدر الشكوي | Pre-fills the *Source* field on a new complaint. Default is Sales Invoice. Set it to whatever your support desk sees most often. |
| **fill Responsible Employee With Current Employee** | السماح بجعل القيمة الافتراضية للموظف بالمسئول بالحالي | On a new lead, defaults the responsible employee to the employee linked to the logged-in user. On by default. |
| **Number Of Result Sources Of Complaint** | عدد مصادر الشكوى | Caps how many rows the complaint screen's search action brings back when it looks up a customer's source documents. |
| **Arabic CRM Trouble Ticket Change Template** | قالب تغير طلب الدعم العربي | Nothing — see the warning below. |
| **English CRM Trouble Ticket Change Template** | قالب تغير طلب الدعم الإنجليزي | Nothing — see the warning below. |
| **Allow Creating Maintenance Invoice With Customer Different From Machine Customer** | إنشاء فاتورة الصيانة بعميل مختلف عن العميل الموجود في الآلة | Relaxes the maintenance-invoice rule that the invoice customer must match the machine's customer. Switch this on if you bill a landlord, a head office or an insurer for work on someone else's machine. |
| **Allow Editing CRM Lead After Connection** | السماح بتعديل خيط البيع بعد ربطه | Lets a lead stay editable after it has been converted. Without it, a converted lead is locked. |
| **Do Not Filter Machine By Customer** | عدم الفلترة على الآلة بالعميل | Removes the customer filter from the machine picker on maintenance documents, so any machine can be selected regardless of who owns it. |
| **Add Questionairs Page To** (grid) | إضافة صفحة الاستبيانات الي | Lists the screens that should gain a related-questionnaires page. Add an entity type here and its edit screen grows a page showing questionnaires linked to that record. |

## Two options that do nothing

::: warning The trouble-ticket change templates are dead
**Arabic CRM Trouble Ticket Change Template** and **English CRM Trouble Ticket Change Template** are on the screen, accept text, and save it — but nothing ever reads them. The code that would have used them to build a notification message is disabled.

The related switch on the Global Config screen, *Use English CRM Trouble Ticket Change Template*, is equally inert for the same reason: it chooses between two templates that are never used.

Filling these in does no harm. It also achieves nothing, so do not spend time crafting the message and do not promise a customer that ticket-change notifications can be styled here.
:::

## One option that is narrower than it sounds

**fill Responsible Employee With Current Employee** reads as a module-wide default. It is not — it is honoured by the **lead** screen only.

Several other screens in the module fill the responsible employee with the current user *regardless of this setting*, and switching it off will not stop them. If you turn it off expecting the auto-fill to stop everywhere, you will be surprised. Treat it as a lead-screen setting and nothing more.

## What is not here

The settings screen carries no options at all for the risk register or the Kitchen Net screens, and only two for the whole maintenance suite — the invoice-customer relaxation and the machine-filter switch. Everything else about how maintenance behaves is configured on the document terms instead. See [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms).

There is also a **Nama CRM Connection** group on the Global Config screen — server URL, user name and password. That group is not about this module. It is how your ERP raises and follows support tickets with Nama's own support system, and it is unrelated to the trouble tickets your own staff handle in [the Support folder](/modules/crm/support/crm-support-overview).

Reporting: none. This module ships no system reports, and this screen has no print form.
