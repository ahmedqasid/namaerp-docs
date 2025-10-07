# Approvals System - Approval Definition Full Guide

## Overview

The Nama ERP Approvals System provides a comprehensive workflow management solution that allows organizations to define approval processes for various business operations. This system ensures proper authorization and control over critical business transactions before they are finalized.

::: tip Key Benefits
- **Flexible Workflow Design**: Create custom approval workflows for any entity type
- **Multi-step Approvals**: Support for complex, multi-level approval processes
- **Rule-based Logic**: Apply approval rules based on specific business conditions
- **Real-time Notifications**: Automatic notifications via email, SMS, and in-app messages
- **Audit Trail**: Complete tracking of approval decisions and comments
:::

## Core Concepts

### Approval Definition (تعريف موافقه)
An Approval Definition is the master configuration that defines when, how, and who should approve specific business transactions. Each definition contains:

- **Target Entity**: Which type of record requires approval (invoices, purchase orders, etc.)
- **Approval Steps**: Sequential or parallel approval stages
- **Responsible Parties**: Who can approve at each step
- **Conditions**: When the approval should be triggered
- **Notification Templates**: How approvers are notified

### Approval Case
When a transaction meets approval criteria, an Approval Case is automatically created. This represents an active approval request that tracks:

- **Current Status**: In Progress, Approved, Rejected, or Returned
- **Approval Steps**: History of decisions made by each approver
- **Next Candidates**: Who needs to act next
- **Summary Information**: Key details about the transaction requiring approval

## Getting Started

### Accessing Approval Definitions

Navigate to: **Basic > Settings > Approval Definition** (الأساسيات > الإعدادات > تعريف موافقه)

### Creating Your First Approval Definition

1. **Basic Information**
   - **Code**: Unique identifier for the approval definition
   - **Name**: Descriptive name (e.g., "Invoice Approval Above 10,000")
   - **Target Entity**: Select the entity type that requires approval

2. **Approval Conditions**
   - **Use With Insert**: Apply when creating new records
   - **Use With Update**: Apply when modifying existing records
   - **Use With Delete**: Apply when deleting records
   - **Use With Budget Exceeded**: Apply when transactions exceed budget limits
   - **Apply When Query**: SQL query to determine when approval is needed

3. **Define Approval Steps**
   - Add sequential approval steps
   - Assign responsible employees or roles
   - Set escalation timeframes
   - Configure decision options (Approve, Reject, Return, etc.)

### Special Approval Options

#### Require Execution
When **Require Execution** is enabled, the system automatically adds a final execution step after all approval steps are completed. This step requires the original **Approval Initiator** (the person who created/modified the record) to confirm final execution.

::: info Execution Step Behavior
- **Automatic Addition**: System adds execution step with sequence number after the last approval step
- **Responsible Party**: Always assigned to the approval initiator (original requester)
- **Purpose**: Ensures the person who requested the approval confirms final execution
- **Use Case**: Common in scenarios where approved transactions need final confirmation before processing
:::

**Example Flow with Require Execution:**
```
1. User creates Invoice → Approval triggered
2. Manager approves → Next step
3. Finance Director approves → All approvals complete
4. System creates "Execution Step" → Assigns back to original user
5. Original user confirms execution → Document is committed
```

#### Confirm Before Starting
When **Confirm Before Starting** is enabled, the system displays a confirmation dialog before initiating the approval process. This gives users a final opportunity to review their input and cancel if they made an error.

::: info Confirmation Dialog Features
- **Tempo Language**: Use `arabicConfirmation` and `englishConfirmation` fields with Tempo template syntax
- **Dynamic Content**: Support for field references from the approved element (e.g., `{totalAmount}`, `{code}`, `{department}`)
- **User Choice**: Users can click "Confirm" to proceed or "Cancel" to abort the approval process
- **Language Support**: Displays appropriate message based on user's language preference
:::

**Example Confirmation Messages with Dynamic Content:**
```
Arabic Confirmation:
"تأكيد: هل أنت متأكد من طلب الموافقة على {entityType} رقم {code} بمبلغ {totalAmount} للقسم {department.name1}؟"

English Confirmation:
"Confirmation: Are you sure you want to request approval for {entityType} #{code} with amount {totalAmount} for department {department.name2}?"

Static Example:
Arabic: "تأكيد: هذا المبلغ كبير، هل تريد المتابعة؟"
English: "Confirmation: This is a large amount, do you want to proceed?"
```

**Available Dynamic Fields:**
- **Entity Fields**: Any field from the record being approved (e.g., `{totalAmount}`, `{customerName}`)
- **System Fields**: Built-in fields like `{code}`, `{entityType}`, `{creationDate}`
- **Related Entity Fields**: Referenced entity fields using dot notation (e.g., `{department.name1}`, `{customer.creditLimit}`)
- **Calculated Values**: Custom calculations or formatted values

#### Revise On Completion
When **Revise On Completion** is enabled, the system automatically marks the record as "revised" after the approval process is successfully completed. This provides an additional layer of data integrity and audit control.

#### Modify While Under Approval
By default, records awaiting approval cannot be edited to maintain data integrity during the approval process. However, the system provides flexible options to allow modifications under specific conditions.

**Configuration Options:**

**Allow Modify While Under Approval** (Global Setting):
- When **disabled** (default): Records cannot be edited during approval process
- When **enabled**: Records can be modified based on the policy settings below

**Modify While Under Approval Policy** (Per Step):
The system supports three different policies for controlling modifications during approval:

::: info Modify Policies
1. **Allow For Authorized Users** (Default)
   - Users with `EditUnderApproval` capability can modify the record
   - Requires specific security permission
   - Most flexible option for authorized personnel

2. **Allow For Authorized And Can Approve**
   - Users must have `EditUnderApproval` capability AND be eligible to approve current step
   - More restrictive - only current step approvers can modify
   - Ensures modifications are made by those responsible for approval

3. **Prevent Modify**
   - No modifications allowed regardless of user permissions
   - Highest security level for critical approval steps
   - Overrides the global `allowModifyWhileUnderApproval` setting
:::

#### Field-Level Editing Control

Beyond the global `allowModifyWhileUnderApproval` setting, the system provides granular field-level control over what can be edited during approval. This allows organizations to permit modifications to specific fields while keeping others locked.

**Configuration Options:**

**Allow Editing Fields (Per Step):**
- **Field Name**: `allowEditingFields`
- **Format**: Comma-separated list of field IDs
- **Scope**: Applies to the specific approval step
- **UI Behavior**: Only listed fields remain editable; all others are disabled

**How Field-Level Control Works:**

::: info Field Editing Logic
```
User attempts to edit field during approval:
1. Check if approval is pending
2. Check if current step has allowEditingFields configured
3. If configured:
   - Listed fields → Remain editable
   - Unlisted fields → Become disabled
4. If not configured:
   - Fall back to modifyWhileUnderApprovalPolicy
5. Apply security validation for authorized users
```
:::

#### OTP (One-Time Password) Security
The system provides enhanced security through OTP verification for approval decisions. This feature ensures that approval actions are performed by the intended person and adds an extra layer of authentication.

**Configuration Options:**

**Require OTP For All Steps** (Global Setting):
- When **enabled**: All approval steps require OTP verification
- Applies to every step in the approval definition
- Overrides individual step settings

**Require OTP** (Per Step Setting):
- When **enabled**: Specific approval step requires OTP verification
- Allows selective OTP requirement for sensitive steps

#### Require All Approvers

When approval responsibilities are assigned to multiple employees simultaneously (either through employee groups, special responsibilities, or multiple candidates), the **Require All Approvers** setting controls whether ALL designated employees must approve before the step is considered complete.

**Configuration Options:**

**Require All Approvers** (Per Step Setting):
- **Field Name**: `requireAllApprovers` (يتطلب موافقة الجميع)
- **Type**: Boolean (Yes/No)
- **Default**: Disabled (any single approver can complete the step)

**How It Works:**

::: info Default Behavior (Require All Approvers = Disabled)
When **disabled** (default behavior):
- The system assigns the approval step to multiple candidates
- **Any ONE** of the candidates can approve
- Once one candidate approves, the step is considered complete
- The approval workflow proceeds to the next step immediately
- Other candidates are no longer required to act
:::

::: warning Require All Approvers = Enabled
When **enabled**:
- The system assigns the approval step to multiple candidates
- **ALL** candidates must approve before the step is complete
- Each candidate approves independently
- After each approval, the system removes that candidate from the list
- The step remains **in progress** until ALL candidates have approved
- Only after ALL approvals are received does the workflow proceed to the next step
:::

## Advanced Configuration

### Conditional Approvals

Use **Criteria Definition** and **Apply When Query** to create sophisticated approval triggers:

```sql
-- Example: Approve invoices above 50,000 SAR
SELECT case when {totalAmount} > 50000 then 1 else 0 end

```

### Approval Rules

Approval Rules are pre-built business logic components that automatically detect when approval is needed based on specific business conditions. These rules can be attached to approval definitions to trigger approvals for scenarios that require complex validation logic.

#### How Approval Rules Work

1. **Rule Evaluation**: When a document is saved, attached rules are evaluated
2. **Applicability Check**: Each rule determines if it applies to the current transaction
3. **Line Detection**: Rules can identify specific lines that triggered the approval
4. **Approval Triggering**: If any rule applies, the approval process starts
5. **Context Information**: The triggering lines are stored in `$map.approvalRuleLines` for use in templates

#### Available Built-in Rules

::: info Common Approval Rules
The system includes several pre-built rules for sales and purchasing scenarios:

**Sales Price Rules:**
- **BelowMinSalesPriceApprovalRule**: Triggers when selling below minimum allowed price
- **BelowDefaultSalesPriceApprovalRule**: Triggers when selling below standard price
- **AboveMaxSalesPriceApprovalRule**: Triggers when price exceeds maximum limit
- **MaxUserDiscountPercentageApprovalRule**: Triggers when discount exceeds user's allowed percentage

**Purchase Price Rules:**
- **AboveLastPricePurchasesApprovalRule**: Triggers when purchase price exceeds last purchase price


#### Configuring Approval Rules

**Step 1: Add Rules to Approval Definition**
In the approval definition, add rules in the "Rules" section:
- Select from available rules for your entity type
- Rules are evaluated in sequence
- All rules must pass for approval to be skipped

#### Using Rule Information in Templates

When a rule triggers approval, the affected lines are available in templates:

```tempo
{if($map.approvalRuleLines)}
<h3>Lines Requiring Approval:</h3>
<table>
  <tr><th>Item</th><th>Price</th><th>Reason</th></tr>
  {loop($map.approvalRuleLines)}
    <tr>
      <td>{link($map.approvalRuleLines.item.item)}</td>
      <td>{$map.approvalRuleLines.price.unitPrice}</td>
      <td>Price below minimum threshold</td>
    </tr>
  {endloop}
</table>
{endif}
```

### Budget Exceeded Approvals

The system supports automatic approval requirements when financial transactions exceed predefined budget limits. This feature integrates with the accounting module to monitor budget consumption in real-time.

#### How Budget Approvals Work

1. **Budget Validation**: When a document is saved, the system checks if it generates accounting entries that exceed budget limits
2. **Account-Level Configuration**: Each account can be configured with budget exceeded behavior:
   - **Prevent Saving**: Block the transaction entirely
   - **Request Approval**: Allow saving but require approval before commitment
3. **Dynamic Checking**: Budget validation considers multiple dimensions (department, branch, fiscal period, etc.)

#### Configuration Requirements

::: warning Prerequisites
For budget approvals to function, ensure the following are configured:

1. **Enable Budget Approvals**: Set `Enable Approvals For Budgets` to `true` in global configuration
2. **Budget Definitions**: Create budget records in the system for relevant accounts
3. **Account Configuration**: Set `budgetExceededBehavior` on accounts to "Request Approval"
4. **Approval Definition**: Create approval definition with `useWithBudgetExceeded = true`
:::

#### Budget Validation Process

The system performs these checks when documents are saved:

::: tip Budget validation logic
1. Generate pseudo accounting entries for the document
2. Compare against existing budget allocations
3. Check if transaction will exceed budget limits
4. Consider account's budgetExceededBehavior setting
5. If "Request Approval" → trigger approval workflow
6. If "Prevent Saving" → block transaction with error
:::

#### Budget Dimensions Considered

Budget validation can consider multiple organizational dimensions:

- **Legal Entity**: Company-level budgets
- **Fiscal Year/Period**: Time-based budget allocation
- **Department**: Departmental spending limits
- **Branch**: Location-based budgets
- **Sector**: Division-level controls
- **Analysis Set**: Custom analytical groupings
- **Account Subsidiaries**: Sub-account level budgets

### Dynamic Responsible Parties

Configure approval routing based on:

- **Organizational Hierarchy**: Supervisor approval chains
- **Department-based**: Route to department managers
- **Field-based**: Use employee fields from the transaction
- **Custom Selectors**: Advanced logic for approver selection

### Alternate Approvers

The system provides flexibility by allowing alternate approvers who can act on ANY step of the approval process, regardless of the specific step assignments. This ensures approvals can proceed even when primary approvers are unavailable.

#### Types of Alternates

**1. Alternate (Single Employee)**
- **Configuration**: Select a single employee as global alternate
- **Scope**: Can approve any step in the approval process
- **Use Case**: Designate a deputy or backup approver for the entire workflow

**2. Other Alternates (Dynamic List)**
- **Configuration**: Use SpecialResponsible selectors to dynamically determine alternates
- **Scope**: Can approve any step based on dynamic criteria
- **Options**:
  - **Initiator**: The person who created/modified the document
  - **Supervisor**: Direct supervisor of the initiator
  - **Field-based**: Employees referenced in document fields
  - **Custom Logic**: Dynamic selection based on business rules

#### Difference from Fallback

::: warning Important Distinction
- **Fallback**: Only used when system cannot determine regular approver (error handling)
- **Alternate**: Always available to approve alongside regular approvers (business flexibility)
- **Other Alternates**: Dynamically determined alternates based on context
:::

#### Approval Reference Fields

The approval system provides two optional reference fields that can be used to store additional contextual information about approved records. These references help with filtering, reporting, and obtaining extra information about the approval case.

**Configuration:**

**Approval Reference 1 Source (approvalRef1Source)** and **Approval Reference 2 Source (approvalRef2Source)**:
- **Field Type**: FieldID (field selector)
- **Source**: Select any reference or generic reference field from the approved entity
- **Purpose**: Automatically populate `approvalRef1` and `approvalRef2` in the approval case
- **Availability**: Context-aware based on approval entity and "Apply Also To" settings

::: info How Reference Fields Work
1. **Configure Source**: In approval definition, select source fields from the approved entity
2. **Automatic Population**: When approval case is created, values are copied from source fields
3. **Filtering**: Use `approvalRef1` and `approvalRef2` to filter approval cases in lists
4. **Reporting**: Include references in approval reports and summaries
5. **Context Information**: Access related data without navigating to the approved record
6. **Supports Field Values Calculator Syntax** for example `sql(select entityType,id from Table where x= {y})` 
:::

**Example Use Cases:**
- **Customer Approvals**: Store customer reference for filtering customer-specific approvals
- **Department Tracking**: Link approvals to departments for departmental reporting
- **Project Association**: Track approvals by project for project management
- **Location-Based**: Filter approvals by branch or warehouse
- **Category Grouping**: Group approvals by product category or service type

#### Consider Request Date As Creation Date

By default, the system sets the record's `creationDate` when the final approval step is completed and the record is committed. However, the `considerRequestDateAsCreationDate` option changes this behavior to use the approval request date instead.

#### Approval Summary Configuration

The system can generate customized summaries for approval requests that provide approvers with essential information about what they're approving. These summaries appear in approval lists and can be included in notification emails.

**Summary Generation Options:**

**1. Default Entity Summary**
- If no custom summary is configured, the system uses the entity's built-in `summaryForApproval()` method
- Provides basic information about the record
- Standard format across all entities of the same type

**2. Custom Summary Template**
- **summaryTemplate**: Uses Tempo language to create formatted summaries
- Access to all entity fields and related data
- Flexible formatting with HTML support
- Dynamic content based on record data

**3. Query-Based Summary**
- **summaryQuery**: SQL query to gather specific data for the summary
- **summaryTemplate**: Template that processes query results
- Powerful for complex summaries requiring calculated data or aggregations

**4. Flush Before Summary**
- **flushBeforeSummary**: Forces database commit before generating summary
- Ensures all changes are persisted before summary calculation
- Required when summary depends on data that might not be saved yet
- Use only with summaryQuery

## Step-by-Step Configuration Guide

### Step 1: Define Basic Settings

| Field | Description |
|-------|-------------|
| **Approval Entity** | Type of record to approve |
| **Priority** | Processing order when multiple definitions match |
| **Use With Insert** | Trigger on new records |
| **Use With Update** | Trigger on modifications |
| **Comment Required** | Force approvers to add comments |
| **Require Execution** | Add final execution step for initiator |
| **Confirm Before Starting** | Show confirmation dialog before starting approval |
| **Revise On Completion** | Mark record as revised after approval (locks editing/deletion) |
| **Allow Modify While Under Approval** | Allow editing records during approval process |
| **Require OTP For All Steps** | Require OTP verification for all approval decisions |
| **Fallback** | Employee to handle system errors (required) |
| **Alternate** | Employee who can approve any step |
| **Other Alternates** | Dynamic alternates (supervisor, field-based, etc.) |
| **Approval Reference 1 Source** | Source field for first approval reference (approvalRef1Source) |
| **Approval Reference 2 Source** | Source field for second approval reference (approvalRef2Source) |
| **Consider Request Date As Creation Date** | Use approval request date as record creation date |
| **Summary Template** | Tempo template for custom approval summaries |
| **Summary Query** | SQL query to gather data for summary generation |
| **Flush Before Summary** | Commit changes to database before generating summary |

### Step 2: Configure Approval Steps

1. **Add Approval Steps**
   - Step Sequence: 1, 2, 3, etc.
   - Step Name: "Department Manager Approval"
   - Required Status: All candidates must approve

2. **Assign Responsibilities**
   - **Direct Assignment**: Specific employee
   - **Role-based**: Job title or department role
   - **Dynamic**: Based on transaction data

3. **Set Decision Options**
   - **Approve**: Move to next step
   - **Reject**: Stop process and reject
   - **Return**: Send back for modifications
   - **Escalate**: Forward to supervisor

#### Global Approval Decision Configuration

The system provides global configuration options to control which approval decisions are available in approval workflows. These settings are configured in the Global Configuration (إعدادات عامة) and affect all approval processes system-wide.

##### Available Decision Configuration Options

| Configuration Option | Arabic Name | English Name | Description |
|---------------------|-------------|--------------|-------------|
| **useRejectDecision** | استعمال قرار الرفض | Use Reject Decision | Controls availability of "Reject" (رفض) decision option |
| **useReturnDecision** | استعمال قرار الارجاع | Use Return Decision | Controls availability of "Return" (إرجاع) decision option |
| **useEscalateToSupervisor** | استخدام قرار تصعيد الي المدير المباشر | Use Escalate To Supervisor | Controls availability of "Escalate to Supervisor" (تصعيد الي المدير المباشر) option |
| **useEscalateToSpecificEmployee** | استخدام قرار تصعيد الي موظف بعينه | Use Escalate To Specific Employee | Controls availability of "Escalate to Specific Employee" (تصعيد الي موظف بعينه) option |
| **useReturnToPreviousStep** | استخدام قرار إرجاع إلي الخطوة السابقة | Use Return To Previous Step | Controls availability of "Return to Previous Step" (إرجاع للخطوة السابقة) option |

##### Configuration Impact

**When Decision Options are Disabled:**
- The corresponding decision will not appear in the approval dropdown
- Approvers cannot select that decision type
- Existing approval definitions that rely on disabled decisions may have limited functionality
- The system will show only the enabled decision options

**Example Scenarios:**
1. **Simplified Approval Process**: Disable "Return" and "Escalate" options to only allow "Approve" or "Reject"
2. **No Rejection Policy**: Disable "Reject" to force approvers to use "Return" for modifications instead
3. **Hierarchical Only**: Disable "Escalate to Specific Employee" to enforce strict supervisor escalation

::: warning Configuration Considerations
- Disabling decision options affects all approval processes system-wide
- Ensure that approval definitions are compatible with the enabled decision set
- Consider the impact on existing approval workflows before making changes
- Some approval processes may require specific decision types to function properly
:::

### Step 3: Notification Configuration

#### Email Templates
Configure automated email notifications with:
- **Email Template**: HTML template for approval requests
- **Email Subject**: Dynamic subject line
- **Additional Recipients**: CC other stakeholders

#### SMS Notifications
- **SMS Template**: Text message format
- **Mobile Number Source**: Employee contact info

#### In-App Notifications
- **Notification Template**: In-system message format
- **FCM Templates**: Push notifications for mobile apps

### Step 4: Advanced Features

#### Critical Fields Monitoring
Track specific field changes that require re-approval:
- Amount changes beyond tolerance
- Key date modifications
- Status field updates

#### Auto-escalation
Set time limits for approval steps:
- **Auto Escalate After**: Time period (hours/days)
- **Escalation Target**: Supervisor or specific employee

::: warning Task Schedule Required
For auto-escalation to work, you must create a **Task Schedule** with the following configuration:
- **Schedule Type**: Action
- **Class Name**: Choose one of:
  - `EAAutoEscalateApprovalToSupervisor` - Escalates to the approver's direct supervisor
  - `EAAutoEscalateApprovalToFallBackEmployee` - Escalates to the fallback employee defined in the approval definition
- **Schedule Frequency**: Recommended to run every 15-30 minutes to check for overdue approvals
:::

## User Workflow

### For Transaction Creators

1. **Create/Modify Record**: Enter transaction data normally
2. **Save Record**: System checks approval requirements
3. **Approval Triggered**: If criteria met, approval case is created
4. **Notification Sent**: Approvers receive notifications
5. **Track Status**: Monitor approval progress in transaction

### For Approvers

1. **Receive Notification**: Email, SMS, or in-app alert
2. **Review Request**: Access approval details and transaction summary
3. **Make Decision**: Approve, Reject, Return, or Escalate
4. **Add Comments**: Provide reasoning for decision
5. **Submit**: Decision is recorded and workflow continues

### Approval Actions Available

| Action | Description | Next Step |
|--------|-------------|-----------|
| **Approve** | Accept the request | Move to next approval step |
| **Reject** | Deny the request | Stop workflow, notify creator |
| **Return** | Send back for changes | Allow modifications, restart approval |
| **Escalate to Supervisor** | Forward to manager | Manager becomes next approver |
| **Escalate to Specific Employee** | Forward to chosen person | Specific employee approves |

## Notification System

### Notification Types

1. **Email Notifications**
   - Embedded approval links
   - Attachment support
2. **SMS Messages**
3. **In-App Notifications**
4. **Push Notifications**
   - Mobile app alerts

### Notification Templates

Templates use Tempo language for dynamic content rendering. The templates have access to the `$notificationInfo` object containing:
- `$notificationInfo.employee` - The employee who should approve
- `$notificationInfo.approvalCase` - The full approval case details
- `$notificationInfo.otp` - The approval OTP (if configured)

**Email Template Example:**
```tempo
<h2>Approval Required: {entityType} #{code}</h2>
<p>Dear {$notificationInfo.employee.name2},</p>

<p>Please review and approve the following {entityType}:</p>
<ul>
    <li><strong>Document:</strong> {link(this)} (#{code})</li>
    <li><strong>Amount:</strong> {totalAmount}</li>
    <li><strong>Department:</strong> {department.name2}</li>
    <li><strong>Date:</strong> {$creationDate}</li>
    <li><strong>Current Step:</strong> {$notificationInfo.approvalCase.nextStepName2}</li>
</ul>

{if($notificationInfo.otp)}
<p><strong>Security Code (OTP):</strong> {$notificationInfo.otp}</p>
{endif}

<h3>Summary:</h3>
<p>{$notificationInfo.approvalCase.summary}</p>

<h3>Actions:</h3>
<table>
    <tr>
        <td>{approvelink}</td>
        <td>{rejectlink}</td>
        <td>{returnlink}</td>
    </tr>
</table>
```

**SMS Template Example:**
```tempo
{$notificationInfo.employee.name2}: Approval needed for {entityType} #{code}
Amount: {totalAmount}
OTP: {$notificationInfo.otp}

{approvelink}
{rejectlink}
```

**In-App Notification Template:**
```tempo
<strong>Approval Request</strong>{enter}
{entityType} #{code} requires your approval{enter}
Amount: {totalAmount}{enter}
Department: {department.name1}{enter}
{enter}
{titledlink("View Details", this)}
```

#### Available Tempo Variables for Approval Templates

::: info Context Variables
All notification templates have access to the following context objects and variables:

**Document Fields:**
- Direct field access: `{code}`, `{totalAmount}`, `{creationDate}`, etc.
- Related entity fields: `{customer.name1}`, `{department.code}`, etc.
- System fields: `{entityType}`, `{firstAuthor}`, `{currentVersion}`

**NotificationInfo Object (`$notificationInfo`):**
- `$notificationInfo.employee` - The employee who should approve
- `$notificationInfo.approvalCase` - The full approval case object
- `$notificationInfo.approvalCase.summary` - Approval summary
- `$notificationInfo.approvalCase.requestedBy` - Who requested approval
- `$notificationInfo.approvalCase.nextStepName1` - Current step Arabic name
- `$notificationInfo.approvalCase.nextStepName2` - Current step English name
- `$notificationInfo.otp` - The OTP code (if configured)
- `$notificationInfo.concernedLines` - Lines requiring approval

**Approval Action Links:**
- `{approvelink}` - Link/button to approve
- `{rejectlink}` - Link/button to reject
- `{returnlink}` - Link/button to return for modifications
- `{escalatelink}` - Link/button to escalate

:::

### Accessing Approval Case Data in Notification Templates

In notification templates (email, SMS, in-app notifications, etc.), you can access detailed approval case information using the `currentApprovalCase` prefix. This allows you to display approval history, previous decisions, candidate information, and OTP codes in your notifications.

#### Available ApprovalCase Fields

Access approval case information using `{currentApprovalCase.<field>}`:

**Step Information:**
- `{currentApprovalCase.$lastStep}` - The most recent approval step
- `{currentApprovalCase.$firstStep}` - The first approval step
- `{currentApprovalCase.nextStepSequence}` - Current step sequence number
- `{currentApprovalCase.nextStepName1}` - Current step Arabic name
- `{currentApprovalCase.nextStepName2}` - Current step English name

**Candidate Information:**
- `{currentApprovalCase.$firstCandidate}` - First candidate in current step
- `{currentApprovalCase.$secondCandidate}` - Second candidate
- `{currentApprovalCase.$thirdCandidate}` - Third candidate
- `{currentApprovalCase.$fourthCandidate}` - Fourth candidate
- `{currentApprovalCase.$fifthCandidate}` - Fifth candidate

**Approval State:**
- `{currentApprovalCase.state}` - Current approval state (InProgress, Approved, Rejected, Returned)
- `{currentApprovalCase.requestedBy}` - Employee who initiated the approval
- `{currentApprovalCase.requestDate}` - When approval was requested
- `{currentApprovalCase.completionDate}` - When approval was completed
- `{currentApprovalCase.summary}` - Approval summary text
- `{currentApprovalCase.approvalRef1}` - First approval reference (if configured)
- `{currentApprovalCase.approvalRef2}` - Second approval reference (if configured)

#### ApprovalCaseStep Fields

Access step details from `$lastStep`, `$firstStep`, or other step references:

- `{currentApprovalCase.$lastStep.decision}` - The decision made (Approve, Reject, Return, etc.)
- `{currentApprovalCase.$lastStep.actualResponsible}` - Employee who made the decision
- `{currentApprovalCase.$lastStep.approvalDate}` - When the decision was made
- `{currentApprovalCase.$lastStep.comment}` - Comment provided with the decision
- `{currentApprovalCase.$lastStep.approvalStepName1}` - Step Arabic name
- `{currentApprovalCase.$lastStep.approvalStepName2}` - Step English name
- `{currentApprovalCase.$lastStep.approvalReason}` - Reason for the approval (if provided)
- `{currentApprovalCase.$lastStep.escalated}` - Whether step was escalated
- `{currentApprovalCase.$lastStep.escalatedFrom}` - Who escalated it
- `{currentApprovalCase.$lastStep.escalateTo}` - Who it was escalated to

#### ApprovalCaseStepCandidate Fields

Access candidate details from `$firstCandidate`, `$secondCandidate`, etc.:

- `{currentApprovalCase.$firstCandidate.candidate}` - The employee candidate
- `{currentApprovalCase.$firstCandidate.concernedLines}` - Lines assigned to this candidate
- `{currentApprovalCase.$firstCandidate.otp}` - OTP code for this candidate (if OTP is enabled)
- `{currentApprovalCase.$firstCandidate.requestedOn}` - When candidate was assigned
- `{currentApprovalCase.$firstCandidate.escalated}` - Whether escalated to this candidate
- `{currentApprovalCase.$firstCandidate.escalatedFrom}` - Original approver who escalated
- `{currentApprovalCase.$firstCandidate.source}` - Source of responsibility assignment
- `{currentApprovalCase.$firstCandidate.responsibility}` - Type of responsibility

#### Practical Examples for Notification Templates

**Example 1: Display OTP Code**
```tempo
{if(currentApprovalCase.$firstCandidate.otp)}
<p>Your Security Code (OTP): <strong>{currentApprovalCase.$firstCandidate.otp}</strong></p>
{endif}
```

**Example 2: Show Previous Approver's Decision and Comment**
```tempo
{if(currentApprovalCase.$lastStep)}
<h3>Previous Approval Step:</h3>
<p><strong>Approved By:</strong> {currentApprovalCase.$lastStep.actualResponsible.name2}</p>
<p><strong>Decision:</strong> {currentApprovalCase.$lastStep.decision}</p>
<p><strong>Date:</strong> {currentApprovalCase.$lastStep.approvalDate}</p>
{if(currentApprovalCase.$lastStep.comment)}
<p><strong>Comment:</strong> {currentApprovalCase.$lastStep.comment}</p>
{endif}
{endif}
```

**Example 3: Display Escalation Information**
```tempo
{if(currentApprovalCase.$firstCandidate.escalated)}
<p style="color: orange;">
    <strong>Note:</strong> This approval was escalated from {currentApprovalCase.$firstCandidate.escalatedFrom.name2}
</p>
{endif}
```

**Example 4: Show All Current Candidates**
```tempo
<h3>Awaiting Approval From:</h3>
<ul>
{if(currentApprovalCase.$firstCandidate)}
    <li>{currentApprovalCase.$firstCandidate.candidate.name2}</li>
{endif}
{if(currentApprovalCase.$secondCandidate)}
    <li>{currentApprovalCase.$secondCandidate.candidate.name2}</li>
{endif}
{if(currentApprovalCase.$thirdCandidate)}
    <li>{currentApprovalCase.$thirdCandidate.candidate.name2}</li>
{endif}
</ul>
```

**Example 5: Complete Email Template with Approval History**
```tempo
<h2>Approval Request: {entityType} #{code}</h2>
<p>Dear {$notificationInfo.employee.name2},</p>

<h3>Document Details:</h3>
<ul>
    <li><strong>Document:</strong> {link(this)}</li>
    <li><strong>Amount:</strong> {totalAmount}</li>
    <li><strong>Requested By:</strong> {currentApprovalCase.requestedBy.name2}</li>
    <li><strong>Request Date:</strong> {currentApprovalCase.requestDate}</li>
</ul>

{if(currentApprovalCase.$lastStep)}
<h3>Previous Approval:</h3>
<p>{currentApprovalCase.$lastStep.actualResponsible.name2} - {currentApprovalCase.$lastStep.decision} on {currentApprovalCase.$lastStep.approvalDate}</p>
{if(currentApprovalCase.$lastStep.comment)}
<p><em>"{currentApprovalCase.$lastStep.comment}"</em></p>
{endif}
{endif}

{if(currentApprovalCase.$firstCandidate.otp)}
<h3>Security Code (OTP):</h3>
<p style="font-size: 24px; font-weight: bold; color: #2196F3;">{currentApprovalCase.$firstCandidate.otp}</p>
{endif}

<h3>Summary:</h3>
<p>{currentApprovalCase.summary}</p>

<p>{approvelink} {rejectlink} {returnlink}</p>
```

::: tip Use Cases for currentApprovalCase
- **OTP Display**: Show one-time passwords to candidates in notifications
- **Approval History**: Display previous approval decisions and comments
- **Escalation Alerts**: Indicate when approval was escalated and by whom
- **Multi-Candidate Notifications**: Show all candidates awaiting approval
- **Audit Trail**: Include complete approval chain in email notifications
- **Context Information**: Display step names, dates, and responsible parties
:::

#### Budget-Based Approvals
```
Account Setup:
- Expense Accounts → budgetExceededBehavior = "Request Approval"
- Budget Limits → Department/Branch level allocation
- Approval Flow → Department Head → Finance Manager

Process:
Document Creation → Budget Check → Approval (if exceeded) → Commitment
```

#### Multi-criteria Approvals
```
IF (Amount > 50,000 OR Customer = "High Risk" OR Payment Terms > 60 days)
THEN Require: Credit Manager + Finance Director approval
```

### Performance Tips

- **Optimize Queries**: Ensure Apply When Query performs efficiently
- **Batch Processing**: Group similar approvals for efficiency
- **Archive Old Cases**: Maintain system performance with data retention policies
- **Monitor Bottlenecks**: Identify and resolve approval delays

## Troubleshooting

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| **Approval not triggered** | Criteria not met | Review Apply When Query and conditions |
| **Wrong approver assigned** | Incorrect responsible party setup | Check step responsibilities configuration |
| **Notifications not sent** | Template or contact info issues | Verify email templates and employee contacts |
| **Approval stuck** | Missing approver or system error | Check approval case status and escalation rules |
| **Budget approval not working** | Configuration missing | Verify budget settings, account configuration, and global config |

### System Administration

#### Monitoring Approvals
- Regular review of pending approval cases
- Performance monitoring of approval queries
- Audit trail analysis for compliance
- Budget vs actual spending analysis

#### Maintenance Tasks
- Archive completed approval cases
- Update employee responsibilities
- Refresh approval definition cache
- Review and optimize notification templates
- Update budget allocations periodically

## Integration Points

### External Systems
The approval system can integrate with:
- **Email Servers**: SMTP configuration for notifications
- **SMS Gateways**: Third-party SMS providers
- **Mobile Apps**: Push notification services
- **BI Systems**: Approval metrics and reporting
- **Budget Systems**: Real-time budget consumption tracking

### API Access
Programmatic access for:
- Creating approval cases
- Querying approval status
- Submitting approval decisions
- Generating approval reports
- Budget validation checks

## Actions History and Audit Trail

The system automatically creates detailed audit trails for all approval activities through the Actions History system. This provides comprehensive tracking of approval decisions and workflow progression.

### Default Actions History Behavior

By default, the system creates **one Actions History record** when the entire approval process is completed:

- **Action Type**: `Approval`
- **Created**: After the final approval step is finished
- **Content**: Records the completion of the entire approval workflow
- **Purpose**: Provides basic audit trail for completed approvals

### Enhanced Step-by-Step Tracking

For organizations requiring detailed audit trails, the system supports granular tracking of every approval step through the global configuration option:

**Configuration Setting**: `addApprovalStepsToActionHistory` (Add Approval Steps to Action History)

When **enabled**, this option creates an Actions History record for **each individual approval step**:

::: info Enhanced Tracking Features
- **Individual Step Records**: Separate audit entry for each approval decision
- **Decision Types Tracked**:
  - `Approve` - When a step is approved
  - `Reject` - When a step is rejected
  - `Return` - When returned for modifications
  - `Escalate` - When escalated to supervisor/specific employee
- **Final Completion Record**: Still creates the standard `Approval` record when workflow completes
- **User Context**: Captures who made each decision and when
:::

## Security Considerations

### Access Control
- **Role-based Permissions**: Control who can create/modify approval definitions
- **Approver Validation**: Verify approver authorization for each step
- **Audit Logging**: Track all approval activities through Actions History
- **Data Segregation**: Respect organizational boundaries
- **Budget Access**: Control budget information visibility

### Compliance Features
- **Digital Signatures**: Support for electronic signature integration
- **Retention Policies**: Maintain approval records per regulatory requirements
- **Audit Reports**: Generate compliance documentation
- **Version Control**: Track changes to approval definitions
- **Segregation of Duties**: Ensure proper separation of financial controls

## Conclusion

The Nama ERP Approvals System provides a robust foundation for implementing organizational approval workflows, including sophisticated budget control mechanisms. By following this guide, you can create effective approval processes that improve control, compliance, and operational efficiency while maintaining flexibility to adapt to changing business needs.

The integration with budget management ensures financial discipline while providing the flexibility to handle exceptional circumstances through the approval process.

::: tip Next Steps
1. Start with simple approval definitions for high-impact transactions
2. Configure budget approvals for critical expense accounts
3. Train key users on both standard and budget approval processes
4. Monitor system performance and user feedback
5. Gradually expand to cover additional business processes
6. Regular review and optimization of approval workflows and budget allocations
:::

For additional support or advanced configuration questions, consult your system administrator or contact Nama ERP support.
