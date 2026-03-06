# SEO Landing Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the root homepage indexable and strengthen `whisk2capcut` metadata and above-the-fold copy for search intent.

**Architecture:** Replace the root redirect stub with a crawlable x-default landing page because the site is deployed as static output on GitHub Pages. Tighten `whisk2capcut` metadata in the Next.js layout and update localized hero copy so the rendered H1 and intro better match target queries.

**Tech Stack:** Next.js App Router, static export, TypeScript, localized string tables

---

### Task 1: Turn the root route into an indexable x-default landing page

**Files:**
- Modify: `landing/app/(redirect)/layout.tsx`
- Modify: `landing/app/(redirect)/page.tsx`

**Step 1: Replace noindex root metadata with canonical root metadata**

Set root metadata to canonical `https://touchizen.com/`, add language alternates, and mark the page indexable.

**Step 2: Replace the spinner redirect page with crawlable content**

Render a real landing page with:
- H1 describing Touchizen and the product area
- Links to `/en/`, `/ko/`, `/ja/`, `/de/`
- A direct product CTA to `/en/whisk2capcut/`

**Step 3: Verify generated root HTML**

Run: `cd landing && npm run build`

Expected:
- build exits `0`
- `landing/out/index.html` contains canonical root metadata and no `noindex`

### Task 2: Improve Whisk2CapCut metadata for search intent

**Files:**
- Modify: `landing/app/(main)/[lang]/whisk2capcut/layout.tsx`

**Step 1: Rewrite localized title and description maps**

Use titles and descriptions that directly target “Google Whisk to CapCut” intent instead of mostly brand-only phrasing.

**Step 2: Add missing SEO metadata fields**

Ensure metadata includes:
- `metadataBase`
- explicit robots directives
- Open Graph site and type fields

**Step 3: Keep structured data aligned**

Make JSON-LD description match the stronger SEO summary rather than weaker marketing copy.

### Task 3: Update localized hero copy to match the metadata

**Files:**
- Modify: `landing/lib/i18n/en.ts`
- Modify: `landing/lib/i18n/ko.ts`
- Modify: `landing/lib/i18n/ja.ts`
- Modify: `landing/lib/i18n/de.ts`

**Step 1: Rewrite the Whisk2CapCut H1 copy**

Change hero title from brand-only text to a keyword-bearing phrase.

**Step 2: Reposition the slogan as the product name**

Keep brand recognition by using the subheading for `Whisk2CapCut`.

**Step 3: Tighten subtitle and workflow summary**

Make the first visible paragraph explain the exact job-to-be-done: turn Google Whisk image batches into editable CapCut projects.

### Task 4: Verify before completion

**Files:**
- Read: `landing/out/index.html`
- Read: `landing/out/en/whisk2capcut/index.html`

**Step 1: Run the production build**

Run: `cd landing && npm run build`

Expected: build exits `0`

**Step 2: Inspect generated root HTML**

Run: `rg -n "canonical|robots|Touchizen Creator Tools" landing/out/index.html`

Expected:
- canonical points to `https://touchizen.com/`
- no `noindex`

**Step 3: Inspect generated product HTML**

Run: `rg -n "Whisk2CapCut|canonical|robots|FAQPage|SoftwareApplication" landing/out/en/whisk2capcut/index.html`

Expected:
- stronger title and description present
- canonical remains `/en/whisk2capcut/`
- structured data still emitted
