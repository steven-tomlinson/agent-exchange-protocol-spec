# Proposal: W3C Agent Exchange Protocol (AEP) Community Group Report

**Title**: Agent Exchange Protocol (AEP) Core Specification  
**Proposed Category**: W3C Community Group Report / Technical Specification  
**Author & Proposer**: Steven B. Tomlinson (Lockb0x, LLC) <turbodex@steventomlinson.dev>  
**Repository**: [https://github.com/steven-tomlinson/agent-exchange-protocol-spec](https://github.com/steven-tomlinson/agent-exchange-protocol-spec)  
**License**: Creative Commons Attribution 4.0 International (CC-BY-4.0)  

---

## 1. Executive Summary

The **Agent Exchange Protocol (AEP)** defines an open, transport-agnostic, cryptographically verifiable messaging and commercial negotiation protocol for autonomous AI software agents. While foundational identity standards (W3C DIDs, Verifiable Credentials) and context-binding protocols (Anthropic MCP) define how agents verify identity and access local tools, AEP establishes how independent software agents conduct P2P capability discovery, negotiate bilateral service-level agreements (SLAs), and settle payments across heterogeneous network rails (`demo-credit`, `stellar-x402`, `base-lockb0x`).

## 2. Alignment with W3C Standards

AEP directly complements and extends existing W3C recommendations:

1. **W3C Decentralized Identifiers (DIDs v1.0)**:
   - Agent identifiers (`AgentId`) in AEP (`ae:...`) map to `did:key` / `did:pkh` cryptographic URI schemes.
2. **W3C Verifiable Credentials (VC v2.0)**:
   - Identity evidence embedded in AEP envelopes (`CertificationReferenceV1`) conforms to W3C VC data models for zero-authority credential verification.
3. **Decentralized Messaging**:
   - AEP signed envelopes (`SignedEnvelope`) provide a commercial state machine layer operating above P2P overlay transports (Waku v2, libp2p, DIDComm v2).

## 3. Standard Features

- **Decoupled P2P Transport**: Transport-agnostic JSON signed envelopes.
- **Network Lane Isolation**: Explicit chain/network binding (`eip155:8453`, `stellar:pubnet`) preventing cross-lane replay.
- **Declarative Multi-Rail Negotiation**: Dynamic agreement on payment rails prior to contract commitment.
- **Zero-Authority Portable Receipts**: Cryptographically signed receipts for delivery, evaluation, and settlement.

---
*Submitted by Steven B. Tomlinson.*
