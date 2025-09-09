# Two-Factor Authentication (2FA) Guide

## Overview

Two-Factor Authentication (2FA) adds an extra layer of security to the Nama ERP login process by requiring users to provide a second form of verification beyond their username and password. This feature supports multiple authentication methods and provides flexible configuration options for system administrators.

## Supported Authentication Methods

### 1. Message OTP (One-Time Password)
- **SMS**: Send OTP codes via SMS to the user's registered mobile number
- **Email**: Send OTP codes to the user's registered email address
- **Notification**: Uses the configured notification template for 2FA

### 2. Estidamah API Integration
Custom authentication provider integration for organizations using the Estidamah authentication gateway. This method:
- Encrypts credentials using configured encryption keys
- Sends encrypted data to the Estidamah authentication gateway
- Gateway handles OTP delivery to users
- Validates OTP through the integrated API

### 3. None
Disables 2FA (not recommended for production environments)

## Configuration Settings

### Access Login Settings
Navigate to: **Global Configuration** → **Login Settings**

### Configuration Validation Rules

The system enforces the following validation rules when configuring 2FA:

1. **Message OTP Method Requirements**:
   - **Notification Template**: You must select a notification definition for sending OTP codes
   - Error message if not configured: *"Cannot select the option Message OTP without filling Notification For Two-Factor Authentication OTP"*

2. **Estidamah API Method Requirements**:
   - **All three Estidamah fields are mandatory**:
     - Environment URL
     - Encryption Key  
     - Encryption IV
   - **Custom Password Validator**: Must be enabled in `nama.properties`
   - Error if not enabled: *"You cannot enable Estidamah login method without enabling custom password validator in nama.properties first"*

### Available Configuration Fields in Global Config

| Field | Description | Default | Options | Validation Rules |
|-------|-------------|---------|---------|-----------------|
| **login2FAMethod** | Select the 2FA authentication method | None | • None<br>• Message OTP<br>• Estidamah API | - |
| **notificationFor2FAOtp** | Notification template for sending OTP | - | Select from available notification definitions | **Required** when using Message OTP method |
| **otpFormat** | Format of the generated OTP | Numeric | • Numeric (e.g., 123456)<br>• Alphabetic (e.g., ABCDEF)<br>• AlphaNumeric (e.g., A1B2C3) |
| **otpLength** | Number of characters in the OTP | 6 | 4-10 characters |
| **otpExpiryTime** | Time in seconds before OTP expires | 300 | 60-1200 seconds (1-20 minutes) |
| **otpResendDelay** | Delay in seconds before allowing OTP resend | 60 | 30-300 seconds |

### Estidamah-Specific Settings
Only required when using Estidamah API method:

| Field | Description |
|-------|-------------|
| **estidamahEnvironmentUrl** | Estidamah gateway URL (Required) |
| **estidamahEncryptionKey** | Encryption key for securing credentials (Required) |
| **estidamahEncryptionIV** | Initialization vector for encryption (Required) |

::: warning Important Configuration Requirement
To use Estidamah API authentication method, you must enable custom password validator in `nama.properties`:
```properties
use-custom-password-validator=true
```
This setting prevents password hashing and allows the system to send encrypted credentials to the Estidamah gateway.
:::

## User Experience Flow

### Standard Login with 2FA

1. **Initial Login**
   - User enters username and password
   - System validates credentials

2. **OTP Generation**
   - If 2FA is enabled, system generates OTP
   - OTP is sent via configured method (SMS/Email/Notification)
   - User sees OTP input screen

3. **OTP Verification**
   - User enters received OTP code
   - System validates the OTP
   - Upon successful validation, user gains access

4. **OTP Resend**
   - If user doesn't receive OTP, they can request resend
   - Resend is available after configured delay period
   - Same OTP is resent if still valid, new one generated if expired

### Error Handling

- **Invalid OTP**: User receives error message and can retry
- **Expired OTP**: User must request new OTP
- **Maximum Attempts**: After multiple failed attempts, account may be temporarily locked (configured separately)

## User Settings

### Excluding Users from 2FA

Individual users can be excluded from 2FA requirements:

1. Navigate to **User Management** → **User Settings**
2. Find the user account
3. Enable **"Exclude from 2FA"** option
4. Save changes

This is useful for:
- Service accounts
- Emergency access accounts
- Users in specific roles that don't require 2FA

## Technical Implementation Details

### Session Management

- OTP validation is tied to the login session
- Once validated, OTP ID is cached temporarily
- Subsequent API calls within the session don't require re-validation
- Session timeout triggers new 2FA requirement

## Notification Template Setup

### Creating 2FA Notification Template

1. Navigate to **System Configuration** → **Notification Definitions**
2. Create new manual notification with:
   - **Name**: "2FA OTP Notification"
   - For Type: User
   - Manual: True (Selected)
   - **Template Variables**:
     - `{name1}` - User's full Arabic name
     - `{name2}` - User's full English name
     - `{otpCode}` - Generated OTP code
     - Any field available in the user master file

### Example SMS Template
```
Dear ${name2},
Your Nama ERP verification code is: {otpCode}
This code expires in 3 minutes.
Do not share this code with anyone.
```

### Example Email Template
```html
<p>Dear {name1},</p>
<p>Your Nama ERP login verification code is:</p>
<h2>{otpCode}</h2>
<p>This code will expire in 2 minutes.</p>
<p>If you didn't request this code, please contact your system administrator immediately.</p>
```


## Compliance and Regulations

The 2FA implementation helps organizations meet various security compliance requirements:

- **ISO 27001**: Information security management
- **PCI DSS**: Payment card industry standards
- **GDPR**: Data protection regulations
- **Local regulations**: Saudi Arabia's NCA ECC requirements
