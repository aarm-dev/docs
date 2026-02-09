# AARM: Autonomous Action Runtime Management

**AARM is an open system specification for securing AI-driven actions at runtime.** It defines what a runtime security system must do—not how to build it. Build systems that intercept, authorize, and audit autonomous actions before they execute.

> **AARM is not a product, library, or service you install.** It is a specification that describes the components, behaviors, and conformance requirements for systems that secure AI agents. Use AARM to design and build your own runtime security system, or to evaluate whether existing solutions meet the specification.

## The Problem: The Runtime Security Gap

The security posture of AI systems is increasingly determined not by what models *say*, but by what they *do*. Traditional security paradigms fail to address four characteristics of AI-driven actions:

| Characteristic | Why It Matters |
|---|---|
| **Irreversibility** | Tool executions produce permanent effects. Once a database is dropped or data exfiltrated, the damage is done. |
| **Speed** | Agents execute hundreds of actions per minute—far beyond human review capacity. |
| **Compositional Risk** | Individual actions may satisfy policy while their composition constitutes a breach. |
| **Untrusted Orchestration** | Prompt injection and indirect attacks mean the AI layer cannot be trusted as a security boundary. |

### Why Existing Tools Fail

- **SIEM** observes events *after* execution—too late to prevent harm
- **API Gateways** verify *who* is calling, not *what* the action means
- **Firewalls** protect perimeters—but agents operate *inside* with legitimate credentials
- **Prompt Guardrails** filter text, not actions—and are easily bypassed
- **Human-in-the-Loop** doesn't scale, and can itself be exploited

## What is AARM?

An **AARM system** is built to:

1. **Intercept** AI-driven actions before they reach target systems
2. **Accumulate Context** Track session state, prior actions, data accessed, and intent
3. **Evaluate** Assess actions against static policy *and* contextual intent alignment
4. **Enforce** Implement authorization decisions: allow, deny, modify, or require approval
5. **Record** Generate tamper-evident receipts for forensic reconstruction

```
┌─────────────────┐         ┌─────────────────────────────────┐         ┌─────────────────┐
│                 │         │          AARM SYSTEM            │         │                 │
│  Agent / LLM    │ ──────► │  ┌─────────────────────────┐   │ ──────► │  Tools / APIs   │
│                 │  action │  │    Context Accumulator  │   │  allow  │                 │
│                 │         │  └────────────┬────────────┘   │   or    │                 │
│                 │ ◄────── │               ▼                │ ◄────── │                 │
│                 │  result │  ┌─────────────────────────┐   │  result │                 │
└─────────────────┘         │  │     Policy Engine +     │   │         └─────────────────┘
                            │  │   Intent Evaluation     │   │
                            │  └────────────┬────────────┘   │
                            │               ▼                │
                            │  ┌─────────────────────────┐   │
                            │  │   Receipts (+ context)  │   │
                            │  └─────────────────────────┘   │
                            └─────────────────────────────────┘
```

## Action Classification

AARM recognizes that security decisions aren't binary. Actions fall into three categories:

### Forbidden
Always blocked regardless of context. Hard policy limits defined by the organization.
- Example: `DROP DATABASE production`, send to known malicious domains
- Evaluation: Static policy → **DENY**

### Context-Dependent Deny
Allowed by policy, but blocked when context reveals inconsistency with the user's stated intent.
- Example: Agent can send emails, but just read sensitive data and recipient is external
- Evaluation: Policy ALLOW + context mismatch → **DENY**

### Context-Dependent Allow
Denied by default, but permitted when context confirms alignment with legitimate intent.
- Example: Agent wants to delete records; context shows user explicitly requested cleanup of test data
- Evaluation: Policy DENY + context match → **STEP-UP** or **ALLOW**

This is why AARM requires both static policy evaluation *and* context accumulation. An action that looks fine in isolation might be a breach in context. An action that looks dangerous might be exactly what the user asked for.

## Core System Components

An AARM-compliant system implements these six components:

### Action Mediation Layer
Intercepts tool invocations and normalizes them to a canonical schema, enabling policy evaluation against a consistent format.

### Context Accumulator
Tracks session state throughout an agent's execution: the user's original request, prior actions executed, data accessed, tool outputs, and intermediate model responses.

### Policy Engine
Evaluates actions against static policy rules *and* contextual intent alignment. Makes binary authorization decisions: allow, deny, modify, or require approval.

### Approval Service
Human-in-the-loop mechanism for high-risk or ambiguous actions. Handles timeouts, multi-reviewer workflows, and escalation chains.

### Receipt Generator
Cryptographically signed records binding action, context, policy decision, and outcome. Enables forensic reconstruction and compliance audit trails.

### Telemetry Exporter
Structured events exported to SIEM/SOAR platforms for security monitoring and incident response.

## Implementation Architectures

AARM can be implemented through three architectures, each with distinct trust and integration properties:

| Architecture | Enforcement Point | Bypass Resistance | Integration Effort | Best For |
|---|---|---|---|---|
| **Protocol Gateway** | Network | High | Low | API-centric agents, centralized control |
| **SDK / Instrumentation** | Application | Medium | Medium | Embedded agents, framework integration |
| **Kernel / eBPF** | Kernel | Very High | High | Containerized workloads, defense in depth |

For maximum security, organizations may deploy multiple architectures in layers.

## Conformance Requirements

To claim AARM compliance, a system must satisfy these nine requirements:

| ID | Level | Requirement |
|---|---|---|
| **R1** | MUST | Block actions before execution based on policy |
| **R2** | MUST | Validate action parameters against type, range, and pattern constraints |
| **R3** | MUST | Accumulate session context including prior actions and data accessed |
| **R4** | MUST | Evaluate intent consistency for context-dependent actions |
| **R5** | MUST | Support human approval workflows with timeout handling |
| **R6** | MUST | Generate cryptographically signed receipts with full context |
| **R7** | MUST | Bind actions to human, service, agent, and session identity |
| **R8** | SHOULD | Enforce least privilege through scoped, just-in-time credentials |
| **R9** | SHOULD | Export structured telemetry to security platforms |

## Threat Model

AARM addresses specific attack vectors unique to AI-driven actions:

- **Prompt Injection**: Malicious instructions hijack agent behavior
- **Confused Deputy**: Agents misuse legitimate credentials under manipulation
- **Data Exfiltration**: Compositional attacks extract sensitive data through seemingly legitimate actions
- **Intent Drift**: Agent behavior diverges from user's stated intent over time

## Getting Started

### Understand the Specification

1. **[Read the Introduction](https://aarm.dev)** — Understand the problem and why existing tools fail
2. **[Study the Threat Model](https://aarm.dev/threats/overview)** — Learn what attacks your system must defend against
3. **[Review System Components](https://aarm.dev/components/overview)** — Understand the architecture
4. **[Choose an Architecture](https://aarm.dev/architectures/overview)** — Select your implementation path

### Build an AARM-Compliant System

1. **Implement Core Components** — Build the action mediation, context accumulator, policy engine, approval service, receipt generator, and telemetry exporter
2. **Select Architecture** — Choose protocol gateway, SDK instrumentation, or kernel-level eBPF based on your trust requirements
3. **Write Policies** — Define forbidden actions, context-dependent rules, and approval workflows
4. **Verify Conformance** — Test against R1–R9 requirements using the [conformance testing protocol](https://aarm.dev/conformance/testing)

### Practical Guides

- **[Quickstart](https://aarm.dev/guides/quickstart)** — Implement basic AARM patterns step by step
- **[First Policy](https://aarm.dev/guides/first-policy)** — Learn policy syntax by writing common rules
- **[MCP Gateway Pattern](https://aarm.dev/patterns/mcp-gateway)** — Build a protocol-level proxy for MCP tools
- **[Approval Flows](https://aarm.dev/patterns/approval-flows)** — Implement step-up authorization with Slack/email

## Why an Open Specification?

The market for AI agent security is emerging rapidly, with multiple vendors building proprietary solutions. AARM aims to:

- **Establish Baseline** — Define requirements before fragmentation forecloses interoperability
- **Enable Evaluation** — Let buyers objectively assess vendor claims against defined criteria
- **Preserve Choice** — Specify *what* systems must do, not *how* they must be built
- **Accelerate Adoption** — Provide implementation guidance, not just principles

The goal is not to build AARM, but to define what an AARM-conformant system must do—enabling the market to compete on implementation quality rather than category definition.

## Research

AARM is grounded in academic research on AI agent security:

- **[Technical Paper](https://aarm.dev/research/technical-paper)** — Full specification with formal definitions and threat analysis
- **[Research References](https://aarm.dev/research/references)** — Literature on agent security, prompt injection, and runtime protection

## Contributing

AARM is an **open specification**. We welcome contributions from security researchers, agent framework developers, and enterprise practitioners.

- **[GitHub Repository](https://github.com/aarm-dev/docs)** — Specification source, issues, and discussions
- **[Report an Issue](https://github.com/aarm-dev/docs/issues)** — Found a problem? Let us know
- **[Suggest Changes](https://github.com/aarm-dev/docs)** — Submit improvements or clarifications

## License

This specification is published under the MIT License. Reference implementations and tooling may use different licenses.

## Quick Links

- 🌐 **[Full Specification](https://aarm.dev)**
- 📋 **[Conformance Requirements](https://aarm.dev/conformance/requirements)**
- 🔒 **[Threat Model](https://aarm.dev/threats/overview)**
- 🏗️ **[System Architecture](https://aarm.dev/components/overview)**
- 📚 **[Implementation Guides](https://aarm.dev/guides/quickstart)**
- 📄 **[Research Paper](https://aarm.dev/research/technical-paper)**

---

**AARM is foundational infrastructure for AI agent security.** Like OAuth for API security, AARM establishes what runtime security systems must do—enabling the ecosystem to build, compete, and innovate.
