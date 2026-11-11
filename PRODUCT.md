# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
React + TypeScript + Vite; Node.js + TypeScript + Express; PostgreSQL in deployment. Demo uses synthetic events and seeded records.

## Users
University security analysts and IT administrators investigating suspicious activity across campus infrastructure.

## Product Purpose
UniSOC ingests normalized security events, applies explainable rules, and gives analysts a connected workflow for triage and incident response.

## Positioning
Detections retain links to their source events and assets so analysts can move from a rule explanation to an evidence-backed incident.

## Operating Context
Analysts scan an event-heavy workstation, filter event streams, inspect normalized and raw details, create incidents, assign ownership, and record response actions.

## Capabilities and Constraints
The MVP covers event ingestion, deduplication, five explainable rules, asset context, incident status and notes, audit history, and a synthetic scenario. Real university integrations are out of scope until configured. Demo data is synthetic and visibly labeled.

## Brand Commitments
UniSOC; low-glare charcoal workstation, restrained severity colors, compact tables, and monospaced technical identifiers as specified in prompt.md.

## Evidence on Hand
The event schema, rule examples, workflows, and screen requirements in ../prompt.md. No real university telemetry or customer evidence is supplied.

## Product Principles
- Make every detection inspectable.
- Preserve event provenance.
- Keep authorization server-side.
- Label generated data as synthetic.
