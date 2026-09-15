---
title: "VerityRAG"
blurb: "A Slack-first RAG service that respects the permissions of the documents it retrieves from."
role: "Solo"
period: "2026"
stack: ["FastAPI", "Python", "AWS", "SQS", "Terraform", "Postgres"]
status: "active"
group: "project"
featured: true
order: 5
repo: "https://github.com/aaditg/VerityRAG"
description:
  - >-
    Retrieval that respects access control: a query never surfaces a chunk the
    asker could not open in the source system. Multi-persona and faceted, so
    the same corpus answers differently depending on who is asking and what
    they are allowed to see. Slack is the interface.
  - >-
    A production-lean monorepo on AWS — a FastAPI service for auth, Slack, ask,
    admin, and connectors; an SQS-driven ingestion and sync worker; Terraform
    for the infrastructure; and a drop-in local learnset for indexing files
    without a connector.
highlights:
  - "ACL-safe retrieval: permissions travel with the chunk"
  - "Slack as the primary surface, with a FastAPI admin and connector API behind it"
  - "Terraform-defined AWS deployment"
metrics: []
caseStudy: false
draft: false
---

## The problem

TODO

## What I built

TODO

## The hard part

TODO

## Results

TODO

