---
title: EAEmbedFileToAIDB
module: ai
---


<div class='entity-flows'>

# EAEmbedFileToAIDB

**This document was generated using Claude.ai**

## Overview

The **EAEmbedFileToAIDB** entity action processes PDF files attached to entities and converts them into AI-searchable format by storing them in a vector database. This enables AI assistants to understand and search through the content of PDF documents when answering questions.

## How It Works

1. **File Collection**: Takes attachment field names and extracts PDF files from the specified entity
2. **File Processing**: Converts PDF content to text and splits it into smaller chunks (800 characters with 200-character overlap)
3. **AI Embedding**: Creates vector embeddings using OpenAI's text-embedding-ada-002 model
4. **Storage**: Stores the embeddings in a Milvus vector database for fast AI retrieval

## Parameters

**Attachment IDs** (Required)
- **Format**: Field names separated by commas or newlines
- **Examples**: 
  - `attachment1` (single header field)
  - `attachment1,attachment2` (multiple header fields)
  - `details.attachment1` (field in a collection/detail table)
  - `attachment1,details.attachment1,otherDetails.pdfFile` (mixed fields)
- **Description**: Specifies which attachment fields to process from the current entity

## Prerequisites

Before using this action, ensure the following AI module configurations are set up in System Settings:

### Required Configuration Fields

1. **Chat Provider API Key** - API key for the AI service
2. **Chat Provider** - Select the AI provider (GPT-4, GPT-4 Turbo, or DeepSeek)
3. **Vector Store URI** - Connection string to the Milvus vector database
4. **Vector Store Token** - Authentication token for the vector database
5. **OpenAI Embedding Key** - API key for OpenAI embeddings (required for DeepSeek provider)

### Database Requirements

- Milvus vector database must be accessible and properly configured
- Network connectivity to OpenAI services (for embeddings)
- Sufficient storage space in the vector database

## File Requirements

**Supported File Types**
- Only PDF files are supported
- Other file types will be rejected with an error message

**File Processing**
- Files are identified by SHA-256 hash to prevent duplicates
- Each file creates its own collection in the vector database
- Text is split into chunks of 800 characters with 200-character overlap for optimal AI processing

## Usage Instructions

### Step 1: Configure AI Module
Navigate to System Settings > Modules > AI and configure all required fields mentioned in Prerequisites.

### Step 2: Identify Attachment Fields
Use **ALT+CTRL+I** (Show Field Info) on the entity form to identify the correct field names for attachments. For detailed field information, refer to https://dm.namasoft.com.

### Step 3: Execute Action
Run the entity action with the attachment field names as parameters.

## Expected Results

### Success Cases
- **New File**: File successfully processed and embedded into AI database
- **Duplicate File**: Warning message "The file already exists" (file skipped)

### Error Cases
- **Invalid File Type**: "Only PDF files are supported"
- **Configuration Issues**: Errors related to missing API keys or database connectivity
- **File Access Issues**: Errors if attachment fields don't exist or are empty

## Performance Considerations

- Large PDF files take longer to process due to text extraction and embedding generation
- Each file creates API calls to OpenAI for embedding generation
- Network latency affects processing time for both OpenAI and Milvus connections
- Consider running during off-peak hours for large batch processing

## Security Notes

- PDF files are processed and stored as text chunks in the vector database
- Original file content becomes searchable by AI assistants
- Ensure sensitive documents are only processed if AI access is appropriate
- API keys and database tokens are stored in system configuration

## Module Information

**Module:** ai  
**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAEmbedFileToAIDB`  
**Dependencies:** OpenAI API, Milvus Vector Database, LangChain4j

## Related Documentation

- AI Module Configuration Guide
- Vector Database Setup Instructions  
- OpenAI API Integration Documentation

</div>

