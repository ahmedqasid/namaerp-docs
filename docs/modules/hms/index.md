# Hospital Management System

Welcome to the Hospital Management module of Nama ERP — the module that runs the full patient lifecycle: from the moment a patient is registered, through admission and a bed assignment, then consultations, lab tests, radiology and surgeries, all the way to the final closing invoice at discharge. It's a complete hospital system built on top of Nama's solid accounting and inventory engine.

## What makes a hospital different?

A hospital isn't a shop that sells goods. What it "sells" are **medical services** — a consultation, a blood test, an X-ray, a night in a room, a surgery — many of which consume drugs and supplies from the warehouse at the same time. And crucially, **the patient often doesn't pay alone**: an **insurance company** shares the bill at an agreed percentage. The Hospital Management module is built around these two ideas from the ground up:

- **Every service has a price and a cost** — the price is charged to the patient/insurer, and the cost may be shared with the doctor or another party.
- **Split billing** — every invoice line is automatically divided into the **patient's share** and the **insurance company's share**, based on endurance percentages coming from the insurance approval and the admission.
- **Insurance cap** — an admission has a maximum value the insurer will cover across all invoices, with a live remaining counter.

## The patient journey (the big picture)

Let's follow a single patient from the front door to discharge.

A patient arrives and is registered in a **Patient** file — which is at once a medical record and an accounting party. If they're an outpatient, a slot is booked via an **Outpatient Reservation** against an **Outpatient Schedule**. If they're to be admitted, a **Patient Admission** is opened — the pivotal document from which the rest of the journey branches.

From the admission, an **Accommodation** document is generated that assigns the patient a bed in a room and starts charging the daily accommodation and medical-supervision fees. During the stay they may be moved between rooms via an **Accommodation Transfer**, fed via **Feeding Issues**, and the doctor orders **lab tests**, **radiology** and **surgeries** whose **results** are recorded, while drugs and supplies are dispensed from the pharmacy.

Each of these services produces its own **invoice** (lab test invoice, radiology invoice, pharmacy invoice…) split between the patient and the insurer. At discharge, an **Accommodation Exit** document frees the bed and ends the stay, and then a single **Closing Invoice** gathers every invoice from the admission into the final statement of account.

## How documents work in Nama ERP

::: tip Understanding document states
Unlike systems that require a separate "posting" step, Nama ERP acts immediately:

**Draft:** create and edit the document with no accounting effect.

**Saved:** the moment a document is saved out of draft, it creates its accounting effect **immediately** (revenue, costs, patient and insurer balances), and may auto-generate other documents (accommodation, invoice, stock issue).

**Edits:** any change to a saved document is reflected at once, with no separate confirmation step.
:::

## Licensing

Every document in this module is protected by the module license `hms` (NaMa Hospital Management). If the module isn't enabled in your license, its menus won't appear.

## How this guide is organized

The module is large, so we've split it into pages that follow the way hospital data is built and operated.

### Setup & master files

- **[Hospital Structure & Rooms](./hms-facility.md)** — buildings, floors, sections, rooms, beds and clinics, and the room classifications that drive accommodation pricing.
- **[Medical Master Files](./hms-medical-master-files.md)** — doctors, specialties, diseases, medical services, analyzers, feeding types, patient classes and document categories.
- **[Medical Service Catalog](./hms-service-catalog.md)** — lab, radiology, physiotherapy and surgery types and their categories, plus surgery packages.

### Insurance & pricing

- **[Medical Insurance & Approvals](./hms-insurance.md)** — insurance companies and their classes, and the insurance approval that is the source of prices and the patient/insurer split.
- **[Pricing, Costing & Discounts](./hms-pricing.md)** — sales price lists, cost lists and discounts, indirect (overhead) costing, and changing a patient's price plan.

### The patient journey

- **[Patients & Admission](./hms-patients.md)** — the patient file, the admission form, outpatient clinics, diagnosis and health status.
- **[Accommodation & Feeding](./hms-accommodation.md)** — bed accommodation, transfers, exit, and meal issuing.
- **[Clinical Orders & Results](./hms-clinical-orders.md)** — lab and radiology requests and results, surgery requests, reservations and approvals, and the blood bank.

### Billing

- **[Invoicing & Billing](./hms-invoicing.md)** — all service invoices (lab, radiology, pharmacy, surgery…), and the closing invoice that consolidates them at discharge.
