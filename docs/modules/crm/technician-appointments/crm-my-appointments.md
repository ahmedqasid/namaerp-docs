---
entities: [TechnicianAppointment, TechnicianCrew]
---

# My Appointments

::: info Required licence
`crm-technician-appointments`.
:::

The [booking calendar](/modules/crm/technician-appointments/crm-technician-appointment-calendar.md) is for the people who plan the visits. **My Appointments** (*مواعيدي*) is for the people who go on them. A technician logs in, opens it from the **Technician Appointments** menu, and sees the week their crew is booked for — there is nothing to pick and nothing to change, which is the point: it is the schedule, not a planning tool.

## How it knows who you are

The screen works out your crew from your login in two steps. Your user must be linked to your **employee** record, and that employee must be listed in a crew's **Technicians** grid. When either link is missing, the screen says so instead of showing an empty week:

- *"Your user account is not linked to an employee, so we cannot tell which crew you belong to…"* — ask the administrator to link your user to your employee record.
- *"You are not a member of any technician crew, so there is no schedule to show…"* — the employee is not on any crew. Add them on the [crew](/modules/crm/technician-appointments/crm-technician-crews.md), or move them there with a [transfer](/modules/crm/technician-appointments/crm-technician-transfers.md).

Setting a technician up for this screen is therefore nothing more than the crew setup you already need for booking.

## Reading your week

The screen opens on the current week. **Today**, the ‹ › arrows and the **Day / Week / Month** views work as on the booking calendar.

Each block is one period of a committed appointment for your crew, labelled with the appointment code and the crew. Its colour is the appointment's **status**, so a technician can tell at a glance which visits are still *Booked*, which are done, and which were *Rescheduled* or called off. The **Status legend** (*دليل الحالات*) panel explains the colours and counts how many visits of each status are in view.

Click a block to open that appointment — read-only — with the customer, the address on the Customer Address page, the materials in Items And Services, and the other periods of the same booking.

## Your crew

A card beside the calendar shows the crew the schedule belongs to: its name, department section, code and colour, the **Crew Supervisor** (*مشرف الفريق*) and the **Technicians** (*الفنين*) in it. It answers the other question technicians ask before a visit — who am I going with, and who is in charge.
