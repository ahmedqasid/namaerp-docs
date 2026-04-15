::: warning In Progress
This document is still in progress, not yet finished
:::

# UAE E-Invoicing Integration via Orchida osTax

## Overview

NamaERP supports sending electronic invoices to the UAE Federal Tax Authority (FTA) through the Orchida osTax service provider. Orchida acts as an Accredited Service Provider (ASP) in the UAE's Peppol-based 5-corner e-invoicing model.

The system sends invoices in JSON format to Orchida, which validates them, reports tax data to the FTA, and routes them to the buyer through the Peppol network.

## Prerequisites

Before starting the setup, you need:

- An account on the Orchida osTax platform (https://app.orchidatax.com)
- An API Key (Bearer Token) from the Orchida dashboard
- A Company ID from the Orchida dashboard

### Getting Credentials from Orchida

1. Log in to the Orchida dashboard
2. Enter the OTP sent to your email
3. Select your tenant and company
4. Go to Security > Generate Key
5. Create a new key (set expiration date and name)
6. Copy the API Key and Company ID

## System Setup

### Step 1: Global E-Invoice Settings

From Global Configuration > Page 2:
- Set `e-Invoice Page To Show` to `UAE Page`
- After changing the value, perform a Regen UI

### Step 2: Tax Payer Configuration

Create a new Tax Payer Configuration or edit an existing one.

#### Basic Information

| Field          | Value |
|----------------|-------|
| taxPayerType | `UAE - Electronic Invoice Staging` (for testing) or `UAE - Electronic Invoice` (for production) |
| TaxRegNo     | Your establishment's tax registration number |

#### Integration Settings

| Field              | Description |
|--------------------|-------------|
| APIURL             | Auto-filled when Tax Payer Type is selected |
| password           | API Key from Orchida (Bearer Token) |
| orchidaCompanyID | Company ID from the Orchida dashboard |

#### Tax Code Configuration

UAE tax codes follow the UN/EDIFACT 5305 standard (Aligned Tax Category Codes).

**Tax Type**:

| Code | Description |
|------|-------------|
| VAT | Value Added Tax |

**Tax SubType**:

| Code | Description |
|------|-------------|
| S | Standard rate (5%) |
| Z | Zero rated |
| E | Exempt from tax |
| O | Out of scope |
| AE | Reverse Charge |

::: warning
When using code `S` (Standard rate), the VAT rate must be exactly `5.00`
:::

### Step 3: Customer Setup

For each customer that will receive electronic invoices, fill in the following fields:

#### Tax Information

| Field        | Description |
|--------------|-------------|
| taxRegNo     | Customer's Tax Registration Number (TRN) |
| specialNumber | Customer's Peppol Endpoint ID |
| description4 | Agency ID (e.g. `TL`) |
| description5 | Agency Name (e.g. company name) |

#### Address

| Field       | Description |
|-------------|-------------|
| country     | Country code (e.g. `AE`) |
| city        | City name |
| street      | Street address |
| governorate | Emirate code |

::: tip Emirate Codes

| Code | Emirate |
|------|---------|
| AUH | Abu Dhabi |
| DXB | Dubai |
| SHJ | Sharjah |
| AJM | Ajman |
| UAQ | Umm Al Quwain |
| RAK | Ras Al Khaimah |
| FUJ | Fujairah |
:::

### Step 4: Unit of Measure Setup

Each UOM used in invoices must have a valid tax authority code following UN/ECE Rec 20:

| Code | Description |
|------|-------------|
| EA | Each |
| KGM | Kilogram |
| MTR | Metre |
| LTR | Litre |
| XBX | Box |
| PCE | Piece |

### Step 5: Currency Setup

Ensure a currency with tax authority code `AED` exists and is set as the default currency.

## Sending Invoices

### Creating a Tax Authority Submission Document

1. Go to Tax Authority Submission Document
2. Click "Collect Documents" to add the invoices to be sent
3. Click "Send" to submit the invoices to Orchida

### Submission Statuses

After sending, the document status is set to:
- **Sent**: Orchida accepted the invoice for processing
- **NotValidSent**: The invoice was rejected — check the errors field for details

### Checking Invoice Status from Orchida

After submission, you can check the final status of the invoice with the tax authority:

1. From the Tax Authority Submission Document, click "Check Documents Status"
2. The system calls Orchida and retrieves the current status
3. The following fields are updated automatically:
   - **Status In Tax Authority**: `valid`, `invalid`, or `pending`
   - **Tax Auth Entity Status Type**: updated based on Orchida's response

::: warning
Orchida may take some time to process the invoice. If the status is `pending`, wait and check again later.
:::

## Supported Document Types

| Type | Supported |
|------|-----------|
| Invoice | Yes |
| Credit Note | Yes |
| Debit Note | No |

## Maximum Days to Send

The default number of days allowed to send an invoice after its value date is **14 days**. This can be changed in the Tax Payer Configuration under "Max Days To Send Invoice".
