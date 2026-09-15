---
entities: [TechnicianAppointment]
---
# The Booking Calendar

::: info Required licence
`crm-technician-appointments`.
:::

**Technician Appointment Creator** (*إنشاء موعد فني*) is the screen booking staff actually live in. It is a week view of your crews' commitments with three fields on top, and it serves two jobs. You **book** a new visit on it — pick the section, the job and the document the visit was sold on, drag out the hours and press **Save** — and you **rearrange** the visits already booked, by dragging them to a new time or right-clicking them to cancel one, close it or record a no-show.

![The technician booking calendar](../../../ar/modules/crm/images/technician-appointments/technician-appointment-calendar-en.png)

## The three fields at the top

**Department Section** (*القسم الوظيفي*) — offered only for sections marked **Show In Appointments Screen**. Choosing it loads that section's [booking settings](/modules/crm/technician-appointments/crm-appointment-booking-settings.md), which is what gives the grid its working hours, its slot height and the range of weeks you are allowed to page through.

**Technician Procedure** (*إجراء فني*) — the job. The picker offers procedures whose Department Sections grid names the section you chose, plus procedures whose grid is empty.

**From Document** (*بناءا على*) — the sales invoice, order or contract that promised the visit. It is required for new bookings: the calendar will not create an appointment without it.

Until both the section and the procedure are set the calendar stays behind a *"Pick department & procedure to start drawing periods"* panel. As soon as both are set, the crew list and the week fill in.

The **New** button next to Save clears the three fields, ready for the next customer. You can also arrive with them already filled in, from a link in a notification — see [Opening the calendar from a link](#Opening-the-calendar-from-a-link).

## Reading the week

**The Available crews panel** on the side lists the crews that can do this job in this section — crews whose Procedures grid names the chosen procedure or is empty, and whose Department Section matches or is empty. Each crew has its colour and a tick box; untick a crew to take it and its bookings out of the view. It is the fastest way to answer "when is the Cairo crew free" on a crowded week: untick everybody else.

**Existing appointments** are drawn in their crew's colour and labelled with the crew and the appointment code. They are not frozen — you can move them and change their status, as described in [Changing a booking on the calendar](#Changing-a-booking-on-the-calendar). Two kinds are the exception: an **Executed** appointment carries a padlock and cannot be moved or changed, and a **Cancelled** appointment is not drawn at all, so its time shows as free.

**Blocks without an appointment code** are the periods you have just drawn and not saved yet.

**Shaded time** cannot be booked: days the shift marks as rest, the hours outside the shift's work periods, and **everything before the current moment**. The past is greyed out so that nobody books a visit whose time has already gone.

**The Appointment statuses panel** lists each status with the number of appointments in view that carry it. Cancelled has no row, because cancelled appointments are never shown.

The toolbar has **Today**, the ‹ › arrows to page back and forward, and the **Day / Week / Month** views. The **Confirm each change immediately** tick box is explained under [Saving your changes](#Saving-your-changes).

## Drawing a booking

1. Drag down the column for the day you want, from the start time to the end time. The drag snaps to the slot length set in booking settings — hour rows in the screenshot.
2. A dialogue asks you to **Choose the crew for this period**, with a search box for sites that have many. If only one crew is available it is chosen for you without asking.
3. The block appears in that crew's colour. Repeat for as many periods as the job needs — a morning block and an afternoon block, or three consecutive mornings.
4. Press **Save**.

::: tip All the periods you draw belong to one crew
Choose a different crew for a second period and the calendar tells you *"Crew changed — previous periods removed"* and clears what you had drawn, leaving only the new period.

That is not the screen being awkward: an appointment books exactly one crew, so a single booking session can only ever be about one of them. Book the second crew as a second appointment.
:::

To get rid of a period you drew, click it and answer **Delete this period?**. Right-clicking a drawn period offers the same **Delete this period**, and also **Save this period**, which books an appointment from that one period straight away and leaves the rest of your drawing on screen.

## What Save does with new periods

**Save** is enabled once you have a section, a procedure, a source document and at least one drawn period. It builds the appointment and commits it in one step:

- Department Section, Technician Procedure and From Document go on the header.
- Each drawn block becomes a detail row — crew, day, start time, end time.
- The status starts at *Booked*, and the book, term, number and dimensions are filled in from the section's booking settings.

The **Items And Services** grid is not filled in by the calendar. If the visit needs its materials listed, open the appointment afterwards and fill it in there — see [The Technician Appointment](/modules/crm/technician-appointments/crm-technician-appointment.md).

A confirmation shows *Appointment created* with the new code, and the drawn blocks turn into an existing appointment like all the others. You are left on the same week with the same section and procedure, ready to book the next customer.

If the appointment cannot be committed — a missing book, an approval rule, a required dimension, a period that starts before the current time — the errors are shown and nothing is created. Your drawn periods stay on screen so you can fix the cause and press Save again.

## Changing a booking on the calendar

Plans change after the booking is made: the customer asks for the afternoon instead, a crew overruns, a visit turns out not to be needed. You make those changes here, where you can see the whole week, rather than opening each document.

**To move a period**, drag it to another time or day. To make it longer or shorter, drag its bottom edge. The calendar refuses three kinds of move on the spot: one that overlaps another period of the same crew (*"This period overlaps another period of the same crew"*), one into the past, and any move of an executed appointment.

**Right-click** an existing appointment for everything else:

| Action | What it does |
|---|---|
| Cancel appointment | Sets the appointment to *Cancelled*; once saved it disappears from the calendar |
| Mark as no-show | Sets the appointment to *No Show* |
| Mark as executed | Sets the appointment to *Executed*, which locks it |
| Delete this period | Takes just this period out of the appointment |
| Undo period deletion | Brings back a period you had marked for deletion |
| Add a reason | Asks for the *Reason for the change* |
| Remove from pending changes | Forgets every unsaved change you made to this appointment |
| Open the record | Opens the appointment document in a new tab |

The three status actions act on the **whole appointment**, not on the period you clicked — an appointment has one status. A locked, executed appointment offers only Open the record.

::: warning An appointment keeps at least one period
Deleting the last period of an appointment is refused with *"An appointment cannot lose all of its periods — cancel it instead"*. That is exactly the right advice: use **Cancel appointment**.
:::

### Moving a period makes the appointment Rescheduled

When you move or delete a period, the appointment is saved as *Rescheduled* — unless you also chose a status from the menu for the same appointment, in which case your choice wins. The appointment document applies the same rule when its periods are changed on its own screen, so the status tells the same story whichever way the change was made.

### The reason for a change

**Add a reason** opens a small box. What you type there is saved with the periods you **moved**, and it shows up as the Remark on those rows of the appointment's [Change History](/modules/crm/technician-appointments/crm-technician-appointment.md#Change-History) — so a week later "why did the Giza visit go to Thursday" has an answer. Type it before the change is saved.

A reason typed for a status change on its own, or for a deleted period, is not stored.

### Saving your changes

By default, changes wait for you. As soon as you change something a bar appears above the calendar with a count of the appointments and periods you changed, the hint *"Use Save changes at the top to apply them"*, and a **Discard** button that throws them all away. The Save button now reads **Save changes**, with a badge counting the appointments involved.

Pressing **Save changes** saves every changed appointment, one by one, and then — if you have also drawn new periods — creates the new appointment. The message tells you how many appointments were updated. Any appointment the system refuses, for example because a moved period now clashes with an approval rule, stays pending and is reported as *could not be saved and is still pending*, with the errors, so you can fix it and save again.

If you prefer each change to take effect immediately, tick **Confirm each change immediately**. Every move or status change is then saved the moment you make it, and there is nothing to discard. The setting is remembered for the next time you open the calendar.

## Opening the calendar from a link

A notification, email or SMS can carry a link that opens this calendar with the section, the procedure and the From Document already filled in. The typical use is the moment a sale is made: when a sales invoice for an installation is committed, the booking team gets a message with a link that opens the calendar on that invoice, and all they have left to do is draw the periods.

The link is produced by the Tempo function `createappointment`. For a notification template on the sales invoice:

```
Invoice {code} for {customer.name1} needs an installation visit.
<a href="{createappointment(technicianProcedure="01",departmentSection="01",fromDocType="SalesInvoice",fromDocCodeOrId=$id)}">Book it now</a>
```

| Parameter | What it fills in |
|---|---|
| `departmentSection` | Department Section, by its code |
| `technicianProcedure` | Technician Procedure, by its code |
| `fromDocType` + `fromDocCodeOrId` | From Document: the document type, plus that document's code or id — both are needed |

Every parameter is optional; leave out the ones you want the booking clerk to choose. When the calendar opens it looks each value up and fills in the field; a value it cannot find is simply left empty. The parameters are then removed from the address bar, so refreshing the page does not refill fields you have since changed.

The full reference is in the Tempo guide, under [Link to Book a Technician Appointment](/admin/tempo.md#6-Link-to-Book-a-Technician-Appointment).

## Where the calendar's limits come from

Nothing about the working week is configured on this screen. Everything traces back:

| What you see | Where it comes from |
|---|---|
| Which sections you may choose | **Show In Appointments Screen** on the department section |
| Which weeks you may page to | From/To dates on the booking settings Details grid |
| The height of a grid row | Slot Duration In Minutes — the shortest one, if the rows differ |
| Working hours and rest days | The attendance shift named on the booking settings |
| Time before now | The current time — the past is never bookable |
| Which crews are listed | The crews' Department Section and Procedures grid |
| Each crew's colour | Color Code on the crew |
| Which appointments are drawn | Committed appointments of the listed crews, except cancelled ones |
| The book the appointment is numbered in | Appointment Books And Terms Per Section |

If the calendar is not offering what you expect, that table is the checklist to walk down.
