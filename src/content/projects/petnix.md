---
title: "Petnix"
blurb: "An iOS app for a pet's weight, feeding, and care. On TestFlight; App Store next."
role: "Co-founder — iOS app, backend, and site"
period: "2025 — present"
stack: ["React Native", "Expo", "TypeScript", "Supabase", "Postgres", "Maestro", "Astro", "Cloudflare"]
status: "beta"
group: "product"
featured: true
order: 1
links:
  # petpal.app is a for-sale parking page as of 15 Sep 2026 — do not link it
  # unless the domain is actually bought and pointed at the site.
  - { label: "petnix.app", href: "https://petnix.app" }
description:
  - >-
    Petnix tracks what a pet eats, what it weighs, and what it needs: meals
    with calories against a daily target, weigh-ins against a goal, and a care
    hub for medication, water, supplements, and reminders. Households share
    pets, so two people can feed the same dog without double-logging it.
  - >-
    It is a native Expo app on a Supabase backend — 27 tables with row-level
    security on every one, a food reference catalog fed by seven importers, an
    OCR parser for packaging labels, Siri and App Shortcuts, notification quick
    actions, and an AI assistant that answers questions about a specific pet's
    history. Build 9 is on TestFlight; App Store submission is the next
    milestone.
highlights:
  - >-
    A 23-flow Maestro end-to-end suite — happy, dumb, and edge cases per
    feature — that builds any branch into a simulator from GitHub Actions. It
    found two shipped bugs the day it came online.
  - >-
    Database changes are migrations only, mirrored to a canonical schema and
    logged, so the app and the backend cannot drift.
  - >-
    Weekly and monthly medication scheduling that re-plans on every sync, so
    completing a dose rolls the next reminder forward. Fifty tests.
  - >-
    One rule governs every screen: log a saved food in two taps from Home,
    confirm a feeding in one.
hardPart: >-
  Keeping the core loop fast while the feature count grew. Every UI change is
  tap-counted before and after — the apps this competes with all shipped
  redesigns whose top complaint was added taps.
metrics: ["TestFlight build 9", "27 tables, RLS on all", "23 E2E flows"]
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

