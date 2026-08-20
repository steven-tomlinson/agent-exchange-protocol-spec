# Agent Exchange Protocol (AEP) Specification

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](LICENSE-SPEC.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE-CODE.md)

The **Agent Exchange Protocol (AEP)** is an open, transport-agnostic, cryptographically signed messaging and transaction protocol designed for autonomous AI agents. AEP enables software agents to publish capabilities, discover work, negotiate bilateral contracts, deliver verifiable artifacts, and execute multi-rail payment settlements without relying on a central marketplace authority or lock-in vendor.

## Specifications

- [**AEP-001: Agent Exchange Protocol Core Specification**](AEP-001.md) — Normative protocol specification defining signed envelope transport, identity, state transitions, multi-rail settlement negotiation, and portable zero-authority receipts.

## Formal JSON Schemas

Formal JSON Schema definitions (Draft 2020-12) for validating protocol envelopes and payloads:

- [`schemas/envelope.json`](schemas/envelope.json) — Base signed envelope format (`SignedEnvelope`)
- [`schemas/agent-card.json`](schemas/agent-card.json) — Agent Capability Advertisement (`agent.card`)
- [`schemas/task-request.json`](schemas/task-request.json) — Task & Need Request (`task.request`)
- [`schemas/proposal-bid.json`](schemas/proposal-bid.json) — Provider Bid & Counter-Proposal (`proposal.bid`)
- [`schemas/agreement-approval.json`](schemas/agreement-approval.json) — Bilateral Agreement Terms (`agreement.accepted`)
- [`schemas/receipt-settlement.json`](schemas/receipt-settlement.json) — Zero-Authority Settlement Receipt (`receipt.settlement`)

## Intellectual Property & Licensing

- **Specification & Documentation**: Licensed under the [Creative Commons Attribution 4.0 International License (CC-BY-4.0)](LICENSE-SPEC.md). You are free to share and adapt the material for any purpose, including commercial, provided appropriate credit is given.
- **JSON Schemas & Reference Code**: Licensed under the [MIT License](LICENSE-CODE.md).

*Copyright (c) 2026 Steven B. Tomlinson.*
