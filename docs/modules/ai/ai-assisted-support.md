---
entities: [AIToolDefinition]
---

# Getting Better Support with an AI Coding Agent

Most support questions are already answered somewhere on this site — the trouble is finding the paragraph. A ticket arrives saying "the invoice is not creating its journal entry", and answering it well means knowing which screen holds the setting, what the field is called in Arabic, which table the value lands in, and whether a warning box somewhere says the whole thing is irreversible. That is four or five pages, and the person reading them has a customer waiting.

An **AI coding agent** solves this differently. Instead of searching a website, you give the agent the entire documentation and data model as files on your own machine and simply ask your question in Arabic or English. It reads the pages, quotes the menu path, gives you the table and column, and hands you a link you can forward to the customer. What used to be a ten-minute hunt becomes a question and an answer.

And it gets considerably better than that. Once you connect the agent to a live Nama installation through the [MCP server](./ai-mcp-server.md), it stops answering from the manual alone and starts answering from the customer's actual system — reading the records, reading how the document term and the configuration are set, running a query against the data, and explaining why the document behaved the way it did.

This page walks through the whole setup, from a machine with nothing installed to an agent that can diagnose a real ticket.

::: info Who this is for
Nama technical support staff, and system administrators at customer sites who want the same capability in-house. You do not need to be a developer — the steps below are copy-and-paste.
:::

## Step 1: Install Git

Git is the tool that downloads the knowledge base and keeps it up to date. Open a terminal and type `git --version`; if it answers with a version number you already have it and can move on.

If it does not:

- **Windows** — install from [git-scm.com/download/win](https://git-scm.com/download/win), or run `winget install --id Git.Git -e` in PowerShell.
- **macOS** — run `xcode-select --install`, or `brew install git` if you use Homebrew.
- **Linux** — `sudo apt install git` on Debian/Ubuntu, `sudo dnf install git` on Fedora or RHEL.

Close and reopen the terminal afterwards so it picks up the new command.

## Step 2: Clone the Support Knowledge Base

The knowledge base is a single repository that bundles two things: this documentation site, and the [data model site](https://dm.namasoft.com) that describes every table, column and enum in the system. It also carries a set of instructions that teaches the agent how Nama is organised — where the modules live, that the Arabic pages mirror the English ones, that the item master file is called `InvItem` and not `Item`, and how to cite what it found.

Pick a folder you will remember and run:

```bash
git clone --recurse-submodules https://github.com/ahmedqasid/namaerp-support-kb.git
cd namaerp-support-kb
```

::: warning Don't forget `--recurse-submodules`
The documentation and the data model are attached as submodules. Clone without that option and you get two empty folders and an agent with nothing to read. If that happens, run `git submodule update --init --recursive` inside the folder to fill them.
:::

The content moves as the two sites are published, so pull before a working day the same way you would refresh a browser tab:

```bash
git pull
git submodule update --init --recursive
```

## Step 3: Run a Coding Agent in That Folder

A coding agent is a command-line program that reads files, runs commands, and answers questions about whatever folder you started it in. Start it **inside `namaerp-support-kb`** — that is what gives it the documentation — and then ask your question the way you would ask a colleague.

We recommend **[Claude Code](https://docs.claude.com/en/docs/claude-code)**. Install it with one line:

```bash
# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex

# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash
```

Then move into the knowledge base folder, type `claude`, and start asking.

::: tip Other agents work too — but not equally well
We tested **Codex**, OpenAI's coding agent, against the same knowledge base and it works: it finds the pages and answers correctly. In side-by-side use on real Nama questions, though, Claude Code has been noticeably stronger — it follows the repository's instructions more faithfully, reads more pages before answering instead of settling for the first hit, and holds a long diagnosis together better. If you have a choice, choose Claude Code.
:::

From here you can ask things like:

- "العميل يقول إن قيد اليومية لم يتكوّن للفاتورة — من أين أبدأ؟"
- "Which table stores salary item values, and what is the column for the amount?"
- "What does the `EAGenJournalEntry` entity flow do, and what parameters does it take?"
- "Give me the menu path for the accounting periods setting, and the docs link I can send the customer."

## Step 4: Connect the Agent to a Live System

Everything so far is a very good library. The step that changes the nature of the work is connecting the agent to an actual Nama installation over **MCP** — the standard protocol AI clients use to reach external systems. Nama has a built-in MCP server, so there is nothing to install on the server beyond the AI module itself.

Once connected, the agent can read records, look up how a document type is configured, list the settings behind a behaviour, run a report, and — when you allow it — create and update records. The question stops being "what does the manual say about credit limits" and becomes "why did *this* order get blocked", which the agent answers by reading the customer, the document term, and the configuration entry that governs it.

The connection itself is a few lines in the agent's configuration file:

```json
{
  "mcpServers": {
    "nama-erp": {
      "type": "http",
      "url": "https://<customer-server>/basic-services/mcp",
      "headers": { "X-API-Key": "<client-secret>" }
    }
  }
}
```

The endpoint, the authentication headers, the **API Credentials** record the key comes from, and the way every call executes as a real user with the full security model applied are all covered on the [Nama ERP MCP Server](./ai-mcp-server.md) page. Read it before you connect — particularly the part about dedicating a user with measured permissions rather than pointing the agent at an administrator account out of convenience.

## Step 5: Give the Agent the Right Tools

An MCP connection on its own exposes nothing. The agent can only call the tools an administrator has defined on the **AI Tool Definition** screen, so this step is where you decide how capable — and how dangerous — the agent is. Three groups of ready-made [system tools](./ai-tool-definitions.md) are worth setting up deliberately.

### The record tools — for everyone, bounded by permissions

The six export/import tools, added in one click with the **Add Export Tools** button, let the agent resolve an Arabic or English term to an entity type, search records, read a record as JSON, list the allowed values of a field, learn an entity's import schema, and import new records.

The important property is that **every one of them goes through the same gates the screens use**. If the linked user cannot see a company's documents, neither can the agent. If the user may not create purchase invoices, the import call is refused. These tools are bounded by exactly the permissions you already trust that user with, which is what makes them reasonable to hand to support staff generally.

### The read-only SQL tool — administrators only, and unbounded

Add `AITReadOnlySQLQuery` as a line in the **System Tools Configuration** grid and the agent gains a single tool, `<prefix>runReadOnlySqlQuery`, that runs one T-SQL `SELECT` against the database and returns the rows as JSON.

This is the tool that transforms troubleshooting. Combined with the data model in the knowledge base, an agent that can query directly will find the twelve documents whose cost never recalculated, compare a setting across seven companies, or trace a balance difference back to the three entries that caused it — investigations that would otherwise cost an afternoon and a developer. It is the difference between an agent that describes how the system is supposed to work and one that tells you what actually happened in this database.

It is also the tool that demands the most care, for one specific reason:

::: danger The SQL tool is not limited by user permissions
The record tools are bounded by what the linked user may read. **The SQL tool is not.** It reads the database directly, so it sees every company, every branch, every salary and every price — regardless of what its user is allowed to open on screen. Restrict it to administrators through the **Security (Access Control)** grid on the tool definition, and to administrators only.
:::

What it cannot do is change anything. Only a single `SELECT` is accepted: `INSERT`, `UPDATE`, `DELETE`, `EXEC`, DDL, `SELECT ... INTO`, several statements in one call, and pass-through functions that could reach another server are all rejected before the statement runs. Whatever does run executes inside a transaction that is always rolled back, so even a statement that somehow slipped past the check leaves nothing behind. Results are capped as well — 200 rows per call by default, which you can raise to at most 5000 by putting the number in the line's first parameter column, with a one-minute query timeout.

### The term and configuration tools — the everyday administrator's superpower

Add `AITTermAndConfigTools` and the agent gains four tools covering the settings screens: one that lists what can be configured, one that describes the settings of a document type's term (توجيه) or of a configuration entry — grouped exactly the way the screen groups them, with the Arabic and English label of each setting — one that reads the current values, and one that updates them.

For a system administrator this is the difference between knowing a setting exists and finding it. The global configuration holds thousands of settings across seventeen tabs, and a single document term holds hundreds. Asking "how is the sales invoice term configured for the cost centre, and which setting controls it" now gets you the setting, its labels, its tab, and its current value in one answer instead of a tour of the screens. The update tool merges a patch onto the stored settings rather than replacing them, reports the old and the new value of everything it changed, and can create a term that does not exist yet.

::: warning Everything the AI does must be reviewed
This is not a caveat about Nama — it is true of every AI tool. A model can misread a question, pick a plausible but wrong field, or write a query that answers a slightly different question than the one you asked. Read what it did before you act on it: check the query it ran, check the setting it changed, check the record it created. Import as a draft first when the change matters. The agent is an extremely fast assistant, not an unsupervised one, and reviewing it takes a fraction of the time the work would have.
:::

## Tell Us When It Fails

The single most valuable thing a system administrator or a support engineer can do for AI-assisted support at Nama is to tell us when it does not work.

Every one of these matters to us:

- The agent could not find something that plainly exists in the system.
- It choked on a question a support person would consider simple.
- It went round in circles, or gave up on a task that should have been straightforward.
- The documentation says one thing and the system does another — an inconsistency is a defect in the documentation, and we want to fix it.
- A tool returned something confusing, or refused something it should have allowed.

Each report tells us exactly which page to rewrite, which tool description to sharpen, or which capability is missing. Write to us at **[ai@namasoft.com](mailto:ai@namasoft.com)** — a sentence describing what you asked and what happened is enough — or raise it through your usual channel with Nama. The more of these we receive, the better the next answer is for everyone.
