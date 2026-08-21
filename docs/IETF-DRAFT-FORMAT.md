# IETF Internet-Draft Template: Agent Exchange Protocol (AEP)

```text
Network Working Group                                   S. B. Tomlinson
Internet-Draft                                             Lockb0x, LLC
Intended Status: Standards Track                        August 20, 2026
Expires: February 21, 2027


                  Agent Exchange Protocol (AEP) 0.2
                draft-tomlinson-agent-exchange-00

Abstract

   This document specifies the Agent Exchange Protocol (AEP), an open,
   transport-agnostic, cryptographically signed messaging and multi-rail
   transaction protocol for autonomous AI agents. AEP enables independent
   agents to publish capabilities, negotiate bilateral commitments,
   verify work deliverables, and execute payment settlement without
   central marketplace authorities or single-point-of-failure intermediaries.

Status of This Memo

   This Internet-Draft is submitted in full conformance with the
   provisions of BCP 78 and BCP 79.

   Internet-Drafts are working documents of the Internet Engineering
   Task Force (IETF).  Note that other groups may also distribute
   working documents as Internet-Drafts.

Copyright Notice

   Copyright (c) 2026 IETF Trust and Steven B. Tomlinson. All rights reserved.

Specification Document: https://github.com/steven-tomlinson/agent-exchange-protocol-spec
Author Email: turbodex@steventomlinson.dev
```

## Submitting to IETF

To submit this draft to the IETF Datatracker:

1. Install `kramdown-rfc` or `xml2rfc`:
   ```bash
   gem install kramdown-rfc2629
   ```
2. Render `AEP-001.md` into plain text / XML RFC format:
   ```bash
   kramdown-rfc2629 AEP-001.md > draft-tomlinson-agent-exchange-00.xml
   xml2rfc draft-tomlinson-agent-exchange-00.xml --text --html
   ```
3. Upload `draft-tomlinson-agent-exchange-00.txt` at [datatracker.ietf.org/submit/](https://datatracker.ietf.org/submit/).
