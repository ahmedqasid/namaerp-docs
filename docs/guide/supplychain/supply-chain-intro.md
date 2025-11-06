# Supply Chain Management

Welcome to the Supply Chain Management module - the heart of how NaMa ERP helps you track, manage, and control the flow of goods through your organization.

## What This Module Does

Think of the Supply Chain module as the central nervous system for everything related to inventory, purchasing, and sales in your business. Whether you're receiving raw materials from suppliers, manufacturing products, selling to customers, or simply moving items between warehouses, this module orchestrates all these activities and ensures everything is properly tracked and accounted for.

## The Big Picture

Let's start with a simple story to understand how everything fits together.

Imagine you run a manufacturing company that makes furniture. Your journey with the Supply Chain module begins when you realize you need wood to make tables. You create a **purchase request** for wood, get **quotations** from suppliers, place a **purchase order**, and when the wood arrives, you create a **receipt document** that brings the wood into your inventory and updates your accounting books automatically.

Now you're ready to make tables. You **issue** the wood to your production department (which reduces your raw materials inventory), and when the tables are ready, you **receive** them back as finished products (which increases your finished goods inventory). The costs of the wood automatically flow into the value of your tables.

When a customer places an order, you create a **sales quotation**, convert it to a **sales order**, and eventually issue a **sales invoice** that simultaneously records the sale in accounting and issues the table from your warehouse. The system tracks every step, ensures you have enough stock, and even helps you reserve items for specific customers.

Throughout this entire journey, the system is doing much more than just tracking numbers. It's:
- Making sure you don't sell what you don't have
- Calculating costs and profits automatically
- Creating accounting entries so your books are always up to date
- Tracking serial numbers and batch numbers where needed
- Managing multiple warehouses and locations
- Handling returns, replacements, and quality control
- Supporting multiple units of measure (selling by piece but buying by carton)
- And so much more...

## How Documents Work in NaMa ERP

::: tip Understanding Document States
Unlike some systems that require "posting" documents, NaMa ERP works differently:

**Draft Mode**: Create and edit documents without affecting inventory or accounting. Perfect for preparation and review.

**Saved**: Once you save a document (not in draft), it **immediately** affects:
- Inventory quantities
- Accounting balances
- Customer/supplier accounts
- Available stock calculations

**Updates**: Any changes you make to saved documents are reflected immediately in the system. There's no separate "post" or "commit" step.
:::

This immediate-effect approach means:
- Real-time inventory accuracy
- Up-to-date accounting at all times
- No batch posting delays
- Immediate visibility of changes

But it also means you need to be careful - once you save (not in draft), the document has real impact!

## How This Documentation Works

We've organized this guide to follow the natural flow of how you'll use the system. Instead of throwing technical terms at you, we'll walk through real-world scenarios and explain how the system supports your business processes.

Here's what we'll cover:

### [Understanding Inventory Items](./understanding-items.md)
Before you can buy or sell anything, you need to define what "things" exist in your system. We call these **Items** (or صنف in Arabic). This section explains how items work and all the clever ways you can classify, track, and manage them.

### [Receiving Stock](./receiving-stock.md)
Learn about all the different ways items come into your warehouse - from supplier purchases to production output to simple stock adjustments. We'll explain when to use each type of receipt document and how they affect your inventory.

### [Issuing Stock](./issuing-stock.md)
What goes in must (usually) come out! This section covers how to release items from your warehouse for production, sales, internal use, or other purposes.

### [Moving Stock Around](./moving-stock.md)
Sometimes you just need to move items from one warehouse to another, or from one location to another within the same warehouse. Learn about transfers, assembly operations, and how the system tracks items in transit.

### [The Purchasing Journey](./purchasing-journey.md)
Follow the complete lifecycle of a purchase - from identifying what you need, through getting quotes from suppliers, placing orders, receiving goods, and paying invoices. This is where you'll spend a lot of time if you're in procurement!

### [The Sales Journey](./sales-journey.md)
Mirror image of purchasing - this covers everything from generating quotations for customers, through taking orders, fulfilling them, invoicing, and handling returns or exchanges.

### [Quality Control](./quality-control.md)
Not every item that comes in meets your standards, and sometimes you need to inspect items before they go to customers. Learn how the quality control system works and integrates with receiving and shipping.

### [Specialized Scenarios](./specialized-scenarios.md)
The Supply Chain module supports many specific industries and use cases - from hospital pharmacies to point-of-sale systems to job order manufacturing. We'll explore these special cases and how they extend the core concepts.

## A Note About Document Types

As you read through this documentation, you'll encounter many different "document types" - PurchaseInvoice, StockReceipt, SalesOrder, etc. Don't let this overwhelm you!

Think of these as different types of forms you fill out to record different business events. Just like in a paper-based system where you'd have a "Purchase Order Form" and a "Receipt Note Form", the system has different document types for different purposes.

Each document type is designed for a specific business transaction and includes exactly the fields and features needed for that transaction. But they all follow similar patterns, so once you understand a few, the rest become intuitive.

## Integration with Other Modules

The Supply Chain module doesn't work in isolation. It's deeply integrated with:

**Accounting**: Every inventory transaction creates accounting entries automatically. When you receive a purchase, your inventory asset increases and your payables increase. When you make a sale, your revenue increases and your inventory decreases. You don't have to think about it - it just happens.

**Manufacturing**: When you issue raw materials to production and receive finished products, the system tracks costs and ensures materials are available for production orders.

**CRM**: Sales quotations and orders can originate from CRM opportunities, and customer service cases can trigger returns or replacements.

**Fixed Assets**: Some items you purchase become fixed assets rather than inventory. The system handles this distinction automatically.

**Hospital Management**: Pharmacies, blood banks, and medical supplies have special requirements that the system handles natively.

## Let's Get Started

Ready to dive in? Start with [Understanding Inventory Items](./understanding-items.md) to learn the foundation, or jump directly to the section that matches what you're trying to accomplish right now.

Remember: this documentation focuses on helping you understand **how** and **why** the system works the way it does, not just listing features. If you're looking for a specific field or technical detail, those references exist elsewhere. Here, we're telling the story of your supply chain.

::: tip Navigation Tip
Use the sidebar to jump between sections, and don't feel obligated to read everything in order. Each section is written to stand alone while building on the foundational concepts introduced here.
:::
