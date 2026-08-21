---
caip: AEP-Settlement-1
title: Multi-Rail Agent Settlement Negotiation Specification
author: Steven B. Tomlinson (Lockb0x, LLC) <turbodex@steventomlinson.dev>
status: Draft
type: Standards Track
created: 2026-08-20
requires: CAIP-2, CAIP-10
license: CC-BY-4.0
---

# CAIP: Multi-Rail Agent Settlement Negotiation Specification

## Simple Summary

A standard protocol for autonomous software agents to negotiate, bind, and execute multi-rail payment settlements across EVM and non-EVM blockchain networks using CAIP-2 network identifiers and CAIP-10 account references.

## Abstract

As software agents operate across heterogeneous blockchain networks, commercial negotiation requires a standardized method to declare accepted payment networks, negotiate explicit settlement rails (`stellar-x402`, `base-lockb0x`, `demo-credit`), and bind cryptographic payment authorizations (EIP-3009, Soroban auth) without relying on single-blockchain lock-in or centralized payment processors.

This CAIP specifies how agent messages declare settlement capabilities, select a mutually supported rail, and bind CAIP-2 chain IDs and CAIP-10 account references into signed bilateral contract terms.

## Motivation

Existing Web3 payment protocols (such as HTTP 402 or single-chain escrows) assume both parties operate on the same blockchain network or use a single payment adapter. In multi-agent systems:
1. A provider may accept USDC on Base (`eip155:8453`) or XLM/LBX on Stellar (`stellar:pubnet`).
2. A requester may prefer EVM gasless EIP-3009 authorizations or Soroban smart account authorizations.
3. Agents need to declare accepted rails during discovery (`task.request`), match capabilities (`agent.card`), and lock a single rail into dual-signed contract terms (`agreement.accepted`) prior to execution.

## Specification

### 1. Settlement Rail Identifier Taxonomy

Settlement rails MUST be identified by a string tag matching one of the following normative rails:

| Settlement Rail Tag | CAIP-2 Network Identifier | Currency Unit | Escrow / Settlement Protocol |
| :--- | :--- | :--- | :--- |
| `demo-credit` | `local:sandbox` | `CREDIT` | Internal protocol ledger |
| `stellar-x402` | `stellar:pubnet`, `stellar:testnet` | `XLM`, `USDC`, `LBX` | HTTP 402 + Soroban payment authorization |
| `base-lockb0x` | `eip155:8453`, `eip155:84532` | `USDC` | Lockb0x Groth16 ZK Escrow + EIP-3009 |

### 2. Provider Capability Declaration (`agent.card`)

A provider agent MUST declare supported settlement rails and payout destinations using CAIP-10 account references:

```json
{
  "supportedSettlementRails": ["stellar-x402", "base-lockb0x"],
  "payouts": [
    {
      "rail": "stellar-x402",
      "payTo": "stellar:pubnet:GAG3X...7NK",
      "resource": "https://provider.example.com/x402/claim"
    },
    {
      "rail": "base-lockb0x",
      "payTo": "eip155:8453:0x48820949A4C0e2637D0B7085cEa5C8957827e699",
      "lockb0x": "0xACA4fd650D79c5A75DFB503461FeF3DF14fB45e1"
    }
  ]
}
```

### 3. Requester Need Solicitation (`task.request`)

A requester agent MUST declare acceptable settlement rails and maximum price:

```json
{
  "constraints": {
    "maximumPrice": {
      "currency": "USDC",
      "amount": "5.00"
    },
    "acceptedSettlementRails": ["stellar-x402", "base-lockb0x"]
  }
}
```

### 4. Proposal Rail Selection (`proposal.bid`)

The provider's proposal MUST select exactly ONE settlement rail present in both the `agent.card` and `task.request` declarations:

```json
{
  "price": {
    "currency": "USDC",
    "amount": "4.50"
  },
  "settlementRail": "base-lockb0x"
}
```

### 5. Bilateral Agreement Terms Binding (`agreement.accepted`)

The final dual-signed agreement MUST bind the selected rail, CAIP-2 network, atomic amount, and payment authorization payload in `terms.settlement`:

```json
{
  "terms": {
    "price": { "currency": "USDC", "amount": "4.50" },
    "settlement": {
      "rail": "base-lockb0x",
      "network": "eip155:8453",
      "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "lockb0xContract": "0xACA4fd650D79c5A75DFB503461FeF3DF14fB45e1",
      "payee": "eip155:8453:0x48820949A4C0e2637D0B7085cEa5C8957827e699",
      "authorization": {
        "type": "EIP-3009",
        "validAfter": 0,
        "validBefore": 1787184000
      }
    }
  }
}
```

## Rationale

Utilizing CAIP-2 and CAIP-10 ensures that AEP settlement declarations remain fully compliant with multi-chain infrastructure standards across the Web3 ecosystem. By separating rail selection from capability advertisement, agents can dynamically match payment terms without custom point-to-point integrations.

## Security Considerations

- **Private Key Isolation**: Requesters sign EIP-3009 or Soroban payment authorizations client-side targeting the exact terms hash. Private keys are never exposed to providers or transit nodes.
- **Atomic Escrow Expiry**: Escrow reservations MUST enforce an explicit block/ledger expiration window after which funds can be reclaimed by the requester.

---
*Copyright (c) 2026 Steven B. Tomlinson <turbodex@steventomlinson.dev>. Licensed under CC-BY-4.0.*
