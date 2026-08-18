# Technician Appointments

::: info Required licence
`crm-technician-appointments`.
:::

Some businesses sell a product and then have to turn up at the customer's address to make it work. An air-conditioning dealer sells a split unit on Sunday and has to send two installers on Thursday morning; a lab sells a home-sampling package and has to send a nurse; a furniture shop sells a wardrobe and has to send an assembly crew. In all of these the sale is easy to record and the *visit* is the hard part: which two people, on which morning, and are they already promised to somebody else?

**Technician Appointments** is the part of CRM that answers that question. It is a small, self-contained booking system: you describe the work you do, you group your field staff into crews, you tell the system when those crews work, and then you book slots against a weekly calendar that shows you, in colour, exactly who is already promised to somebody else.

![The technician booking calendar](../../../ar/modules/crm/images/technician-appointments/technician-appointment-calendar-en.png)

## The eight screens, and the order to meet them in

Everything lives under one menu group, **Technician Appointments** (*مواعيد الفنيين*), inside the CRM module. The menu lists the screens in roughly the order you will build them:

| Screen | What it is | Read |
|---|---|---|
| Technician Procedure (*إجراء فني*) | A job you are booked for — "Split unit installation" | [Services and Procedures](/modules/crm/technician-appointments/crm-technician-services-and-procedures.md) |
| Technician Service (*خدمة فنية*) | One task inside that job — "Fit the indoor unit" | [Services and Procedures](/modules/crm/technician-appointments/crm-technician-services-and-procedures.md) |
| Technician Crew (*فريق فنيين*) | The team that goes out, and who supervises it | [Crews](/modules/crm/technician-appointments/crm-technician-crews.md) |
| Appointment Booking Settings (*إعدادات حجز المواعيد*) | Working hours, slot length, and the books to number appointments with | [Booking Settings](/modules/crm/technician-appointments/crm-appointment-booking-settings.md) |
| Technician Appointment (*موعد فني*) | The booking itself | [The Appointment](/modules/crm/technician-appointments/crm-technician-appointment.md) |
| Technician Appointment Creator (*منشئ موعد الفني*) | The weekly calendar you book from | [The Booking Calendar](/modules/crm/technician-appointments/crm-technician-appointment-calendar.md) |
| Technician Service Distribution (*سند توزيع الخدمات*) | What was actually done, by whom, for how long | [Service Distribution](/modules/crm/technician-appointments/crm-technician-service-distribution.md) |
| Technician Transfer (*سند نقل فني*) | Moving a technician from one crew to another | [Transfers](/modules/crm/technician-appointments/crm-technician-transfers.md) |

## How the pieces fit together

The chain reads cleanly in one sentence: **a procedure is a bundle of services; a crew is a group of technicians that is qualified for certain procedures; an appointment books one crew for one procedure at particular times; and a service distribution says which technician performed which service afterwards.**

Two of those links are enforced when you save, and they are the reason the setup order above matters:

- A **service distribution** will only accept services that belong to the appointment's procedure, and only technicians who are members of the appointment's crew. Get the procedure's service list right and the distribution becomes a short pick-list rather than a free-text form.
- A **technician belongs to exactly one crew**. The crew screen checks it, and the transfer document is the way to move somebody without breaking that rule.

The department section (*القسم الوظيفي*) runs through the whole thing as the organising axis. Crews belong to a section, procedures can be restricted to sections, and — most importantly — the booking calendar and the numbering rules are both looked up from the section. If you run installation in Giza and Cairo out of two different sections, the two teams get their own calendars, their own working hours and their own document numbering without any further setup.

## Setting up a section for booking

There is one preparatory step outside this menu group, and skipping it makes the whole feature look broken: **the department section must be marked as bookable**.

Open **Department Section** (under the organisation files) and set:

- **Show In Appointments Screen** (*يظهر في شاشة المواعيد*) — tick it. Only ticked sections are offered in the Department Section picker on an appointment and in the booking calendar. An unticked section is invisible to this feature.
- **Appointment Booking Settings** (*إعدادات حجز المواعيد*) — point it at the settings record that describes when this section works. This is how the calendar knows the working hours, the slot length and the bookable date range, and how a saved appointment finds its document book.

Do this for every section that takes bookings, then work through the pages in the table above in order.

## What this feature records, and what it does not

Worth being clear about early, because it decides where the rest of your process lives:

**An appointment is a scheduling document.** It reserves people and time. It carries the usual document frame — book, term, value date, fiscal period, dimensions and an approval cycle — but it does not price the work, does not move stock and does not post to the ledger. Neither does the service distribution: it is a record of effort, not an invoice.

**Money and materials stay where they already are.** The link back to the commercial side is the **From Document** (*بناء على*) field: an appointment is normally raised from the sales invoice, sales order or contract that promised the visit, so anyone looking at the booking can jump straight to what was sold. Billing, spare parts and revenue continue to be handled by those documents.

**Status is mostly automatic.** A new appointment is *Booked*; committing a service distribution against it moves it to *Executed*, and cancelling that distribution moves it back. The remaining values — *Cancelled*, *No Show*, *Rescheduled* — are yours to set by hand as the day unfolds.
