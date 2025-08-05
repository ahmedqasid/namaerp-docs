# Nama ERP Notification System

## Overview

The Nama ERP notification system is a comprehensive communication platform that automatically sends notifications to users when specific business events occur. This system can send messages through multiple channels including in-app notifications, emails, SMS, and WhatsApp messages.

## What is the Notification System?

The notification system monitors business activities within Nama ERP and automatically triggers communication to relevant users based on predefined rules. It acts as a bridge between business processes and user communication, ensuring that stakeholders are informed about important changes or actions that require their attention.

### Key Components

1. **Notification Engine** - The core system that monitors events and triggers notifications
2. **Message Renderer** - Converts templates into personalized messages
3. **Delivery Channels** - Various ways to send notifications (email, SMS, etc.)
4. **Notification Definitions** - Rules that determine when and to whom notifications are sent

## How Notifications Work

### 1. Event Detection
The system automatically detects when business events occur, such as:
- Creating a new record (customer, invoice, employee, etc.)
- Updating existing records
- Deleting records
- Approval workflows (approve, reject, return)
- Status changes (draft, cancel, revise)
- Print operations
- System failures or processing errors

### 2. Rule Matching
When an event occurs, the system checks for notification rules that match:
- **Entity Type**: What kind of record was changed (e.g., SalesInvoice, Customer)
- **Change Type**: What happened (insert, update, delete, approval, etc.)
- **Conditions**: Additional criteria that must be met
- **Priority**: Rules are processed in priority order

### 3. Target Identification
The system identifies who should receive notifications based on:
- **Field-based targeting**: Send to users referenced in specific fields (e.g., salesperson, manager)
- **Query-based targeting**: Use database queries to find recipients
- **Role-based targeting**: Send to users with specific roles or positions
- **Manual targeting**: Explicitly defined recipients

### 4. Message Generation
Messages are created using dynamic templates that can include:
- Field values from the changed record
- Related record information
- User-specific content
- Links to relevant records
- Formatted tables and data

### 5. Multi-Channel Delivery
The system can deliver the same notification through multiple channels:
- **In-App Notifications**: Displayed within the ERP interface
- **Email**: Rich HTML emails with attachments and links
- **SMS**: Text messages to mobile phones
- **WhatsApp**: Messages through WhatsApp Business API
- **FCM Notifications**: Push notifications to mobile devices

## Notification Types by Business Event

### Document Lifecycle Notifications
- **Creation**: "New sales invoice SI-2024-001 was created by John Smith"
- **Updates**: "Customer ABC Corp contact information has been updated"
- **Approval**: "Purchase order PO-2024-123 requires your approval"
- **Status Changes**: "Invoice SI-2024-001 has been cancelled"

### Workflow Notifications
- **Approval Requests**: Notify approvers when documents need approval
- **Approval Decisions**: Inform stakeholders about approval outcomes
- **Escalations**: Alert when approvals are overdue
- **Returns**: Notify when documents are returned for revision

### System Notifications
- **Process Failures**: Alert administrators about system errors
- **Replication Issues**: Notify about data synchronization problems
- **Scheduled Tasks**: Results of automated processes

### Custom Business Rules
- **Threshold Alerts**: Notify when values exceed limits
- **Deadline Reminders**: Alert about approaching due dates
- **Compliance Notifications**: Ensure regulatory requirements are met

## Message Templates and Dynamic Content

### Template Language (Tempo)
Notification messages use the Tempo templating language to create dynamic, personalized content. This allows messages to include:

```tempo
Dear {customer.name1},

Your invoice {code} dated {valueDate} with amount {money.total} 
has been {translate(status)}.

You can view the invoice details here: {link($this)}

Best regards,
{$user.name1}
```

### Dynamic Field Access
Templates can access any field from the record or related records:
- `{code}` - The record's code
- `{customer.name1}` - Customer's Arabic name
- `{employee.contactInfo.email}` - Employee's email address
- `{details.item.item.name2}` - Item name from document lines

### Conditional Content
Show different content based on conditions:
```tempo
{if(money.remaining)}
Outstanding amount: {money.remaining}
{else}
This invoice is fully paid
{endif}
```

### Loops and Tables
Display repeated information like document lines:
```tempo
{opentable}
{row}{cell}Item{cell}Quantity{cell}Price{endrow}
{loop(details)}
{row}{cell}{details.item.item.name2}{cell}{details.quantity}{cell}{details.price.unitPrice}{endrow}
{endloop}
{closetable}
```

## Notification Channels in Detail

### In-App Notifications
- Appear in the user's notification panel within Nama ERP
- Include read/unread status tracking
- Can contain rich formatting and links
- Support action buttons (approve, reject, etc.)
- Automatically mark as read when related records are accessed

### Email Notifications
- Support HTML formatting with embedded images
- Can include file attachments from the record
- Automatic email signatures and branding
- Reply-to addresses for two-way communication
- Delivery confirmation and bounce handling

### SMS Notifications
- Plain text messages up to 160 characters
- Support for Unicode (Arabic) text
- Delivery status tracking
- Cost management and quotas
- Integration with multiple SMS providers

### WhatsApp Business Messages
- Rich media support (images, documents)
- Template-based messaging for compliance
- Delivery and read receipts
- Integration with WhatsApp Business API
- Support for interactive buttons and quick replies

## Advanced Features

### Multi-Message Support
A single notification template can generate multiple messages:
```tempo
{openmsg}
{sendto}{customer.email}{endsendto}
{subject}Invoice {code} - Customer Copy{endsubject}
Dear Customer, your invoice is ready...
{closemsg}

{openmsg}
{sendto}{salesperson.email}{endsendto}
{subject}Invoice {code} - Sales Copy{endsubject}
Dear Sales Team, invoice {code} was sent to customer...
{closemsg}
```

### Conditional Sending
Control when notifications are sent based on:
- Field values and conditions
- User roles and permissions
- Time-based rules
- Business logic criteria

### Priority and Escalation
- High-priority notifications for urgent matters
- Automatic escalation if no response within timeframe
- Fallback recipients when primary recipients are unavailable
- Different notification methods based on urgency

### Approval Integration
Special support for approval workflows:
- Approval request notifications with action buttons
- Automatic routing to next approver
- Escalation to supervisors for overdue approvals
- Notification of approval decisions to stakeholders

## Configuration and Administration

### Notification Definitions
Administrators can create and manage notification rules through the ERP interface:
- Define trigger conditions
- Specify target recipients
- Create message templates
- Configure delivery channels
- Set priority and timing rules

### Template Management
- Visual template editor with syntax highlighting
- Template testing and preview capabilities
- Version control and change tracking
- Template libraries for common patterns
- Validation and error checking

### Delivery Settings
- Configure email servers and authentication
- Set up SMS provider connections
- WhatsApp Business API integration
- Delivery retry policies and failure handling
- Performance monitoring and logging

### User Preferences
Individual users can control their notification preferences:
- Choose preferred delivery channels
- Set quiet hours and vacation modes
- Filter notification types
- Group similar notifications
- Mobile app push notification settings

## Best Practices

### Template Design
- Keep messages concise and actionable
- Use clear, professional language
- Include relevant context and links
- Test templates with sample data
- Consider mobile device formatting

### Performance Optimization
- Use efficient database queries for targeting
- Avoid sending duplicate notifications
- Implement proper retry mechanisms
- Monitor delivery success rates
- Archive old notifications regularly

### Security Considerations
- Validate all template inputs
- Sanitize dynamic content
- Protect sensitive information
- Use secure delivery channels
- Audit notification access

### User Experience
- Provide clear notification summaries
- Group related notifications
- Offer easy unsubscribe options
- Include help and contact information
- Maintain consistent branding

The Nama ERP notification system is a powerful tool that enhances business communication, improves process efficiency, and ensures that important information reaches the right people at the right time. By leveraging dynamic templates, multiple delivery channels, and intelligent targeting, organizations can create a responsive and effective communication infrastructure that supports their business operations.