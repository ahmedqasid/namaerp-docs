# Troubleshooting System Hanging or Unresponsiveness

## Overview

When your Nama ERP system becomes unresponsive, slow, or appears to hang, the most effective diagnostic tool is a **thread dump** (also called a stack dump). A thread dump captures a snapshot of all threads in the Tomcat process at a specific moment, showing exactly what each thread is doing. This information is invaluable for the development team to identify the root cause of performance issues.

## When to Capture a Thread Dump

Capture a thread dump when you experience any of these symptoms:

- 🔴 **Complete System Freeze** - The application stops responding entirely
- 🟡 **Extreme Slowness** - Pages take several minutes to load or operations timeout
- 🔵 **High CPU Usage** - Tomcat process consuming 90-100% CPU continuously
- 🟣 **Database Deadlocks** - Users getting timeout errors or waiting indefinitely
- 🟠 **Hanging Requests** - Specific operations never complete (e.g., report generation, data import)

::: tip Best Practice
Capture **2-3 thread dumps** with 10-30 second intervals between them. This helps identify patterns and distinguish between temporary spikes and persistent issues.
:::

## What is a Thread Dump?

A thread dump is a text file containing detailed information about all running threads in the Java Virtual Machine (JVM), including:

- Thread names and IDs
- Thread states (RUNNABLE, WAITING, BLOCKED, etc.)
- Stack traces showing the exact line of code each thread is executing
- Lock information and potential deadlocks
- Resource usage patterns

## Prerequisites

- **Administrator access** to the Windows server
- **PowerShell 5.1 or later** (included in Windows Server 2016+)
- **Network connectivity** to download the script (or save it locally)

## Step-by-Step Instructions

### Step 1: Open PowerShell as Administrator

1. Press `Win + X` or right-click the Start button
2. Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
3. Click **Yes** when prompted by User Account Control

### Step 2: Download and Run the Script

Copy and paste the following commands into PowerShell:

```powershell
# Download the jstack dump script
Invoke-WebRequest https://www.namasoft.com/jstack-dump.ps1 -OutFile C:\Users\Administrator\jstack-dump.ps1

# Run the script
C:\Users\Administrator\jstack-dump.ps1
```

::: warning Execution Policy
If you encounter an error about execution policy, run this command first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```
This temporarily allows the script to run for the current PowerShell session only.
:::

### Step 3: Select the Tomcat Process

The script will automatically detect running Tomcat processes:

#### Single Process Scenario
If only one Tomcat instance is running, the script will automatically select it:
```
Auto-detected process: Tomcat101010
```

#### Multiple Process Scenario
If multiple Tomcat instances are running, you'll see a menu:
```
Found 3 Tomcat processes:

[1] Tomcat109999 (PID: 2972)
[2] Tomcat101010 (PID: 29500)
[3] Tomcat101111 (PID: 20984)

Select process number (1-3):
```

Enter the number corresponding to the **hanging or problematic instance**.

::: tip How to Identify the Correct Instance
- Check the **port number** in the Tomcat service name (e.g., Tomcat10**1010** = port 1010)
- Match it with the URL users are accessing (e.g., `http://server:1010/namaerp`)
- If unsure, capture dumps for all instances
:::

### Step 4: Wait for Completion

The script will:
1. Find the JDK installation automatically
2. Locate the process ID (PID)
3. Execute the jstack command
4. Save the output to a timestamped file
5. Automatically open the file in your default text editor

```
Found PID: 29500
Running jstack...
Output file: Tomcat101010-20251102-143025.txt

Thread dump saved successfully to Tomcat101010-20251102-143025.txt
File size: 2847623 bytes
Opening file...
```

### Step 5: Capture Multiple Dumps (Recommended)

For better analysis, capture 2-3 dumps with intervals:

```powershell
# First dump
C:\Users\Administrator\jstack-dump.ps1

# Wait 10-30 seconds
Start-Sleep -Seconds 10

# Second dump
C:\Users\Administrator\jstack-dump.ps1

# Wait again
Start-Sleep -Seconds 10

# Third dump
C:\Users\Administrator\jstack-dump.ps1
```

This creates three timestamped files showing how thread states evolve over time.

## Understanding the Output

The generated file will contain sections like:

```text
"http-nio-8080-exec-42" #123 daemon prio=5 os_prio=0 tid=0x00007f8c4c123456 nid=0x4567 waiting on condition
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at com.namasoft.erp.service.InventoryService.processOrder(InventoryService.java:456)
```

::: details What This Means
- **Thread Name**: `http-nio-8080-exec-42` (HTTP request handler)
- **Thread State**: `WAITING` (thread is idle, waiting for a resource)
- **Stack Trace**: Shows the exact code path - in this case, waiting in `InventoryService.java` at line 456
:::

## Sending Results to Development Team

### What to Send

1. **All generated dump files** (e.g., `Tomcat101010-20251102-143025.txt`)
2. **Timestamp** of when the issue occurred
3. **Description** of the problem:
   - What operation was being performed?
   - How many users were affected?
   - How long had the system been unresponsive?
   - Any error messages displayed to users?

### Email Template

```
Subject: Thread Dump - System Hanging on [Server Name]

Hi Development Team,

The ERP system experienced [describe issue: hanging/slowness/high CPU] 
on [date] at [time].

Issue Details:
- Server: [server name/IP]
- Tomcat Instance: [service name and port]
- Duration: [how long the issue lasted]
- Affected Operations: [what users were trying to do]
- Number of Users Affected: [approximate number]

I've captured thread dumps as requested. Files attached:
- Tomcat101010-20251102-143025.txt (2.8 MB)
- Tomcat101010-20251102-143035.txt (2.7 MB)
- Tomcat101010-20251102-143045.txt (2.9 MB)

The system [returned to normal/required restart] after [action taken].

Please let me know if you need additional information.

Best regards,
[Your name]
```

### Preferred Delivery Methods

1. **Email** - For files under 10 MB
2. **Shared Drive** - For larger files or multiple dumps
3. Whatsapp Messages

## Troubleshooting the Script

### Script Download Fails

**Error**: `Invoke-WebRequest : Unable to connect to the remote server`

**Solutions**:
1. Check internet connectivity
2. Verify firewall allows outbound HTTPS
3. Download manually from https://www.namasoft.com/jstack-dump.ps1 and save locally

### JDK Not Found

**Error**: `ERROR: Could not find jstack automatically`

**Solution**: The script will prompt you for the JDK path. Enter the full path:
```
C:\Program Files\Java\jdk-21
```

Or find your JDK location:
```powershell
Get-ChildItem "C:\Program Files\Java" -Directory
```

### Process Not Found

**Error**: `ERROR: Could not find process Tomcat101010`

**Solutions**:
1. Verify the Tomcat service is running:
   ```powershell
   Get-Service | Where-Object {$_.Name -like "*Tomcat*"}
   ```
2. Check Task Manager for java.exe or Tomcat*.exe processes
3. Run the script without parameters to see available processes

### Permission Denied

**Error**: `Access is denied` or similar

**Solutions**:
1. Ensure PowerShell is running **as Administrator**
2. Verify your user account has admin rights on the server
3. Check if antivirus is blocking the script

### Large File Size

Thread dumps can be 5-50 MB depending on the number of threads and loaded classes.

**To compress**:
```powershell
Compress-Archive -Path "Tomcat*.txt" -DestinationPath "thread-dumps.zip"
```

## Advanced Usage

### Specify Process Name Directly

If you know the exact process name:

```powershell
C:\Users\Administrator\jstack-dump.ps1 Tomcat101010
```

::: tip Need Help?
If you encounter any issues with the script or need assistance interpreting results, contact the Nama ERP Development team at dev@namasoft.com
:::
