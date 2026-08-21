# MCP-AEP Integration Specification: Commercial Agent Tool Execution

**Author**: Steven B. Tomlinson <turbodex@steventomlinson.dev>  
**Status**: Informational / Standards Extension  
**Created**: 2026-08-20  
**Repository**: [https://github.com/steven-tomlinson/agent-exchange-protocol-spec](https://github.com/steven-tomlinson/agent-exchange-protocol-spec)  
**License**: Creative Commons Attribution 4.0 International (CC-BY-4.0)  

---

## 1. Overview and Architecture

The **Model Context Protocol (MCP)**, created by Anthropic, establishes how LLM clients discover and invoke tools, resources, and prompt templates over `stdio` or `SSE/HTTP` connections. However, MCP operates in a single-host or pre-authenticated context: it does not define P2P agent discovery, SLA negotiation, pricing models, or cryptographic payment settlement.

The **Agent Exchange Protocol (AEP)** complements MCP by serving as the commercial negotiation and multi-rail transaction protocol for independent agents:

```
+-----------------------------------------------------------------------+
|                         LLM / Agent Runtime                           |
+-----------------------------------------------------------------------+
                                   |
           +-----------------------+-----------------------+
           |                                               |
           v                                               v
+-----------------------+                       +-----------------------+
|  MCP (Client-Server)  |                       |   AEP (P2P Commerce)  |
| - Tool Discovery      |                       | - Agent Cards        |
| - Stdio / SSE Transport|                      | - Bilateral SLAs      |
| - Local Tool Calls    |                       | - Multi-Rail Payment  |
+-----------------------+                       +-----------------------+
```

## 2. Mapping MCP Tools to AEP Capabilities

An agent exposing tools via MCP CAN advertise those tools to the wider P2P agent market by converting MCP `Tool` definitions into an AEP `agent.card` capability array:

### MCP Tool Schema
```json
{
  "name": "deep_research",
  "description": "Perform multi-source technical domain research",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "depth": { "type": "integer" }
    },
    "required": ["query"]
  }
}
```

### Corresponding AEP `agent.card` Capability Entry
```json
{
  "id": "capability-deep-research-v1",
  "name": "deep_research",
  "description": "Perform multi-source technical domain research",
  "tags": ["research", "mcp-tool", "technical-report"],
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "depth": { "type": "integer" }
    },
    "required": ["query"]
  },
  "pricing": {
    "currency": "USDC",
    "model": "fixed",
    "minimum": "2.50"
  },
  "supportedSettlementRails": ["base-lockb0x", "stellar-x402"]
}
```

## 3. Commercial Tool Execution Lifecycle

When an MCP client requires a specialist tool that is not available locally:

1. **Discovery**: The client searches P2P AEP channels for an `agent.card` matching the requested MCP tool capability.
2. **Negotiation**: The client issues an AEP `task.request` with the tool input parameters attached as an `ArtifactReference`.
3. **Agreement**: Requester and provider negotiate price and settlement rail (`base-lockb0x` or `stellar-x402`), generating a dual-signed `agreement.accepted`.
4. **Tool Execution**: The provider executes the tool via its internal MCP server pipeline.
5. **Delivery & Settlement**: The provider returns the output artifact wrapped in an AEP `receipt.delivery`, unlocking payment release on-chain.

## 4. MCP Proxy Server Pattern

An agent author can wrap an existing MCP server with an AEP proxy adapter (`aep-mcp-proxy`) that automatically:
- Listens on P2P Waku channels for commercial task requests.
- Accepts EIP-3009 or Soroban x402 payment reservations.
- Proxies validated requests to the underlying MCP server over `stdio`.
- Returns signed AEP receipts and output artifacts to the requester.

---
*Copyright (c) 2026 Steven B. Tomlinson <turbodex@steventomlinson.dev>.*
