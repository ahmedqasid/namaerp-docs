---
title: EAEmbedFileToAIDB
module: ai
---

<div class='entity-flows'>

# EAEmbedFileToAIDB

**This document was generated using Claude.ai**

## Overview

Processes PDF files attached to entities and converts them into AI-searchable format by storing them in a vector database. Enables AI assistants to search through document content.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Entities with PDF attachments
- **Purpose:** Make PDF content searchable by AI assistants
- **Timing:** On-demand when AI document search is needed

## How It Works

1. **Extracts PDF files** from specified attachment fields
2. **Converts content to text** and splits into 800-character chunks (200-character overlap)
3. **Creates vector embeddings** using OpenAI's text-embedding-ada-002 model
4. **Stores embeddings** in Milvus vector database for AI retrieval

## Parameters

### Parameter 1: Attachment IDs (Required)
**Format:** Field names separated by commas or newlines
**Examples:**
- `attachment1` (single header field)
- `attachment1,attachment2` (multiple fields)
- `details.attachment1` (collection field)
- `attachment1,details.attachment1` (mixed fields)

## Prerequisites

### Required AI Module Configuration (System Settings)
- **Chat Provider API Key** - AI service authentication
- **Chat Provider** - GPT-4, GPT-4 Turbo, or DeepSeek
- **Vector Store URI** - Milvus database connection
- **Vector Store Token** - Database authentication
- **OpenAI Embedding Key** - Required for embeddings

### Database Requirements
- Accessible Milvus vector database
- Network connectivity to OpenAI services
- Sufficient vector database storage

## File Requirements

- **Supported:** PDF files only
- **Duplicate Prevention:** SHA-256 hash identification
- **Processing:** 800-character chunks with 200-character overlap

## Expected Results

### Success Cases
- **New File:** Successfully embedded into AI database
- **Duplicate File:** Warning "The file already exists" (skipped)

### Error Cases
- **Invalid File Type:** "Only PDF files are supported"
- **Configuration Issues:** Missing API keys or database connectivity
- **Field Issues:** Attachment fields don't exist or are empty

## Related Actions

- **AI Module Setup** - Required configuration for AI features
- **Vector Database Management** - Manages searchable document storage

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAEmbedFileToAIDB`

</div>

