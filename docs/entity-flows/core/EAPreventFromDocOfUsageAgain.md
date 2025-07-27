---
title: EAPreventFromDocOfUsageAgain
module: core
---


<div class='entity-flows'>

# EAPreventFromDocOfUsageAgain

**This document was generated using Claude.ai**

## Overview

This entity flow automatically prevents source documents from being reused as "from documents" in multiple target documents. When a document references another document as its source, the system marks that source document as unavailable for additional relationships, maintaining document chain integrity and preventing circular references.

**Operation:** Forced automatic action that runs on post-commit and post-delete events for DocumentFile entities with document references.

## How It Works

### Post-Commit Processing
1. **Old Reference Cleanup:** Unmarks previous "from document" for reuse if changed
2. **New Reference Protection:** Marks current "from document" as unavailable via `preventUseAsFromDoc` flag
3. **State Synchronization:** Updates protection state across all affected documents

### Post-Delete Processing
1. **Reference Liberation:** Frees up the referenced "from document" when target document is deleted
2. **Protection Removal:** Removes `preventUseAsFromDoc` flag from previously referenced document
3. **Cleanup:** Restores availability of source documents for future use

## Key Features

- **Automatic Protection:** Manages document reference protection without manual intervention
- **Chain Integrity:** Prevents circular references and maintains document workflow integrity
- **Lifecycle Integration:** Automatically triggers on document commit and delete events
- **State Management:** Synchronizes protection state across related documents using `preventUseAsFromDoc` flag

## Parameters

This entity flow requires no parameters and runs automatically. Cannot be disabled or configured.

## Database Impact

Updates the `preventUseAsFromDoc` flag on DocumentFile entities to control document reference availability. Processes both source documents (being referenced) and target documents (containing references) during commit and delete operations.

## Business Use Cases

### Document Workflow Management
- **Sequential Processing:** Ensures proper document workflow progression (order → invoice → payment)
- **Process Control:** Prevents documents from being reused inappropriately in multiple workflows

### Audit and Compliance
- **Document Traceability:** Maintains clear audit trails by preventing reference corruption
- **Data Integrity:** Ensures reference consistency and prevents circular relationships

## Technical Implementation

### Protection Process
1. **Reference Analysis:** Analyzes current and previous document reference states
2. **Flag Management:** Sets/removes `preventUseAsFromDoc` flag as needed
3. **State Synchronization:** Updates protection state across affected documents
4. **Error Handling:** Manages errors during protection state updates

## Important Considerations

### ⚠️ Automatic Operation
- **Forced Execution:** Cannot be disabled; runs automatically on all DocumentFile entities
- **State Changes:** Modifies document state without user intervention
- **Performance Impact:** Adds processing overhead to document operations

### ⚠️ System Integration
- **External Systems:** May affect integrations expecting document reuse capabilities
- **Workflow Design:** Must be considered when designing document workflows
- **API Behavior:** Affects document reference operations through APIs

## Best Practices

### Workflow Design
- **Plan Document Chains:** Design document reference patterns that work with automatic protection
- **Alternative Workflows:** Create alternative processes for scenarios requiring document reuse
- **User Training:** Educate users on document reference limitations

### System Management
- **Monitor Performance:** Track the impact of automatic protection on system performance
- **Test Workflows:** Validate document workflows with protection enabled
- **Error Handling:** Implement proper error handling for protection-related issues

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventFromDocOfUsageAgain`

**ℹ️ Note:** This action is an automatic action that selects the appropriate events to execute itself


</div>

