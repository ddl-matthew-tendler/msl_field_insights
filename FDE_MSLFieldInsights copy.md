# FDE Spec: MSLFieldInsights
*Generated: 2026-04-19 | Target Persona: MSL Lead / Director of Field Medical Insights | Phase: Medical Affairs (Non-GxP)*

> **Extension summary:** Captures and themes MSL field interactions (voice + text) into actionable insights with auto-drafted follow-ups, scientific Q cards, and governed routing of signals to the right internal function — with end-to-end lineage from raw field signal → themed insight → decision artifact.
>
> *Workflow Phase: Medical Affairs  •  Functional Category: Workflow Automation  •  Sizzle 8/10  •  Broader Value 8/10  •  Integration Depth 4/5  •  Composite Effort 7/10*

---

## About this extension
*A 90-second, non-SME-friendly orientation. Written so an FDE, AE, PMM, or exec can walk into a customer conversation and talk confidently about this extension. This section doubles as a short talk-track.*

### What this extension does, in plain language
Medical Science Liaisons (MSLs) are the company's most scientifically credible field function — PhDs and PharmDs who meet with leading physicians every week to exchange scientific information. In those conversations, they hear the earliest signals about unmet needs, data gaps, off-label interest, trial-feasibility barriers, and competitive moves. Today, those signals get written down as free-text notes in Veeva CRM, compiled by hand into a PowerPoint once a quarter, sent upstream, and rarely acted on. **MSLFieldInsights** turns that messy, human, voice-and-text stream into a governed, searchable, themed intelligence feed that routes the right signal to the right function — Clinical Development, Medical Strategy, Market Access, Pharmacovigilance — within days instead of months, and proves in an audit trail that the signal drove a decision.

### Jobs to be done

- **When I finish an HCP interaction, I want to dictate a 90-second voice note and have a full themed summary, draft follow-up, and routing recommendation ready before I leave the parking lot, so I can stop losing nuance in free-text fields I'll never re-read.**
- **When I'm prepping for tomorrow's KOL meeting, I want the system to hand me a pre-call brief that knows every prior interaction this HCP has had with anyone at my company — across every TA — plus their recent publications, trial involvement, and the topics other MSLs have discussed with them, so I can walk in looking informed instead of starting from zero.**
- **When my 15 MSLs have logged 200+ interactions this quarter, I want to see the emergent themes in real time — not in a quarterly PowerPoint — so I can flag an urgent pediatric off-label pattern to Medical Strategy the week it appears, not 10 weeks later.**
- **When a signal I routed to Clinical Dev three months ago turns into a protocol amendment, I want the system to automatically close the loop and show me that traceback, so I can finally answer "does the field function drive decisions?" with evidence instead of anecdote.**
- **When Compliance or a Medical Governance Committee asks "regenerate the Q3 2025 pediatric-off-label theme exactly as you showed it," I want to re-run that synthesis bit-identically — same notes, same model version, same taxonomy — so I can defend Medical Affairs work under a Corporate Integrity Agreement or litigation hold without manual archaeology.**
- **When an MSL mentions a potential adverse event in a note, I want the system to catch it, flag it for human confirmation, and — if confirmed — create a structured intake record in Argus / LifeSphere automatically, so we never miss a 21 CFR 314.80 reporting obligation because someone forgot to forward an email.**
- **When Commercial asks "what are HCPs saying?" I want to be able to share de-identified, PhRMA-Code-reviewed, aggregated themes with full confidence that no raw notes, HCP identifiers, or individual-interaction details can leak across the firewall, so I can stop saying "no" reflexively and start saying "yes, here — auditably."**

### Before vs. After

| Today (without this tool) | Tomorrow (with this tool) |
|---|---|
| Post-call documentation takes 15–20 minutes of typing into Veeva + a spreadsheet + sometimes a Slack message to the MSL Lead. | Voice dictation → themed summary, draft follow-up, and routing recommendation ready in under 60 seconds. MSL reviews and approves in under 5 minutes total. |
| Free-text Veeva notes are write-only; nobody reads them, nobody searches them, structured taxonomy strips the nuance. | Every note is semantically indexed, themed against a versioned taxonomy, and searchable across all MSLs, all TAs, all products, all time. |
| Quarterly insight roll-ups take 80–120 MSL-Lead hours per TA per quarter and always ship 6–10 weeks late. | Roll-ups draft themselves continuously from live field data; MSL Lead spends <10 hours per quarter curating and editing. |
| Time from HCP interaction → routed signal reaching Clinical Dev or Medical Strategy: 45–90 days. | Time from interaction → routed signal: under 7 days. |
| Same physician speaks to an MSL in Oncology and another in Hematology three months apart; nobody at the company notices the pattern. | Cross-TA HCP re-discovery on a single governed corpus surfaces every prior touch automatically in the pre-call brief. |
| Zero closed-loop evidence that a field insight ever drove a downstream decision. Executives ask "what is Medical Affairs worth?" and we answer with anecdotes. | Insight-to-decision lineage is instrumented: we can show exactly which field signals fed which protocol amendments, advisory board topics, or market access pivots. |
| Six months later, if Legal or Compliance asks "regenerate Q3's pediatric theme," the answer is "we can try, but the notes have been edited, the taxonomy changed, and the person who built the deck left." | Pinned model versions + pinned taxonomy + immutable WORM-logged retrieval snapshots → any prior synthesis regenerates bit-identically, on demand, for the full retention period. |
| Potential AEs in field notes rely on the MSL remembering to email Pharmacovigilance. One missed mention = a regulatory event. | Redundant rule-based + LLM AE detection + human-in-loop confirmation + guaranteed delivery to Argus/LifeSphere. PV SLO-monitored. |
| Commercial is either blocked from field themes entirely (no value) or given raw notes (firewall breach). | Commercial sees only aggregated, de-identified, N≥5-thresholded, PhRMA-Code-reviewed themes. Firewall externally auditable. |
| MSLs under-document nuance because Legal discoverability fears are higher than the perceived value of the insight. | Every insight carries its own provenance chain and governance posture; MSLs document more, not less, because the risk model is explicit and defensible. |

### Why only Domino can deliver this

- **Single governed cross-TA corpus** — Domino is a neutral platform holding all MSL interactions, notes, voice, and metadata across every TA and every business unit. Veeva can't hold this without being the system-of-record everywhere; Sorcero is literature-adjacent; Aktana is engagement-adjacent. Only a platform with Domino's governed-data primitives can be the single substrate for enterprise-wide MSL intelligence.
- **End-to-end lineage from raw voice → theme → routed signal → downstream decision citation** — built natively on Domino's experiment, artifact, and model-registry primitives. No bolted-on metadata store, no after-the-fact reconciliation.
- **Reproducible, audit-grade insight re-runs** — pinned model versions, pinned prompt versions, pinned retrieval snapshots, pinned taxonomy versions. A Medical Governance Committee can regenerate any prior quarter's synthesis bit-identically. This is the feature that makes the system defensible under a CIA, a partner diligence, or a litigation discovery request — and the feature no MSL tool vendor has meaningfully delivered.
- **Dual-path agentic routing with deterministic fallback** — LLM-driven routing for nuanced signals plus a rules-based guaranteed-delivery floor for pharmacovigilance (AE detection). Domino's workflow primitives support this resilience natively; a point solution can't.
- **Externally-auditable RBAC at the app layer** — the PhRMA Code firewall between Medical and Commercial is the governance boundary the customer's Chief Compliance Officer will personally review. Domino's app-framework RBAC makes this policy-driven, queryable, and SIEM-streamable.

### 60-second talk track

You know that every week your MSLs sit with the most important physicians in their therapeutic areas and hear things nobody else in your company hears — unmet needs, off-label interest, trial barriers, competitive signals. And you know that most of that intelligence ends up dying in a Veeva free-text field or a quarterly PowerPoint that gets read once. What we've built, on Domino, is a governed intelligence layer underneath your field function. MSLs dictate a 90-second voice note after a call; 60 seconds later they have a themed summary, a draft follow-up citing only MARS-approved content, and a routing recommendation to Clinical Dev or Medical Strategy. It writes back into Veeva, so MSLs never leave their primary tool. It surfaces cross-TA patterns — the same KOL talking to three different MSLs about the same signal — in real time, not 10 weeks from now. It closes the loop: when a protocol amendment cites a field theme, we show you that lineage. And when Compliance asks you to regenerate Q3's themes bit-identically for an audit or a CIA monitor, we do it in 90 seconds with full provenance. No vendor in this market — not Veeva, not Aktana, not Sorcero, not Within3 — owns the governed substrate that makes this possible. Where would it help most to go deeper — the MSL UX, the governance audit story, or the cross-TA re-discovery demo?

---

## Competitive Landscape Summary

- **Veeva CRM Medical (MedInquiry, MedComms, Medical Insights) + Veeva AI (Dec 2025, Medical module Aug 2026)** is the incumbent in field interaction capture. Its "Medical Insights" module does post-hoc thematic analysis of MedInquiry inquiry data, not raw, continuous voice/text field-interaction synthesis. Free-text CRM note fields are write-only — MSLs document them, and nobody reads them. No closed loop from MSL signal to downstream decision.
- **IQVIA OCE Medical** focuses on engagement orchestration (Next Best Action, unified HCP record, remote engagement). Strong at "what to do next" — weak at "what did the field actually learn, and did anyone act on it?"
- **Aktana (with Tact.ai field/conversational tech acquired 2023)** pushes AI-driven engagement recommendations and KOL intelligence. Emphasis is coaching-forward ("ask about X"), which MSLs experience as surveillance. Does not produce a governed, auditable insight corpus.
- **Within3** converts structured virtual advisory board input into synthesized insights (claims ~90% reduction in manual synthesis). Excellent for episodic ad boards; does not handle the continuous, daily stream of MSL field interactions or route signals to Clinical Dev / Medical Strategy / Market Access.
- **Sorcero MIM / Instant Insights Engine (Nov 2024) + Axiom Health (Jul 2025)** is the most sophisticated evidence-synthesis platform — spans 100M+ medical records — but is a literature + evidence layer, not an MSL field-interaction operational system. No voice ingest, no routing-to-function workflow, no MSL-specific UX.
- **H1 / Monocl ExpertInsight / Indegene / ZoomRx** round out the space with KOL databases, engagement tracking, and primary research — none claim end-to-end lineage from field signal → themed insight → governed internal record → decision.

**The white space — and where MSLFieldInsights wins:** (1) End-to-end lineage from raw field voice/text → theme → governed insight record → routable signal → decision artifact → audit trail, (2) Enterprise-scale cross-TA re-discovery on a single governed corpus, and (3) Reproducible, audit-grade insight re-runs (e.g., regenerate Q3 themes exactly for a Medical Governance Committee inquiry, a partner diligence, or — rarely but importantly — a litigation discovery request). No vendor owns this stack because no vendor owns both the governed data substrate *and* the agentic compute layer. Domino does.

---

## Persona Context

**MSL Lead / Director of Field Medical Insights — daily reality:**

- **Monday 8am:** reviews what their 12–18 MSLs captured last week across Veeva notes, Slack messages, and the TA Insights SharePoint. Realizes two MSLs flagged similar off-label pediatric signals from different KOLs — but the Q-review isn't for six weeks. By then the signal is stale.
- **Three primary frustrations** (verbatim from MAPS panels and MSL Society forums, 2023–2025):
  1. **"Insights die in PowerPoint."** 200+ field interactions per quarter get manually synthesized into a slide deck that goes to Medical Strategy. There is no closed-loop feedback mechanism confirming whether a signal drove a protocol amendment, an IIT prioritization, an advisory board topic, or a market-access strategy pivot. MSLs stop flagging subtle signals because "nothing ever comes of it."
  2. **Double-keying + tool fragmentation.** MSLs document once in Veeva, again in an insights spreadsheet, and sometimes a third time in a TA-strategy workbook. Field teams admit to *under-documenting* in Veeva specifically to avoid re-keying.
  3. **Compliance chilling effect.** Under PhRMA Code, MSLs can reactively respond to unsolicited off-label questions — but Legal's guidance on "documentation discoverability" causes MSLs to soften or omit precisely the signals Medical Strategy needs most. An AI tool that looks like surveillance makes this worse, not better.
- **What "winning" looks like:** insight capture rate, interaction-to-insight conversion ratio (target ~1:3–1:5), time-to-routed-signal (target <7 days, not 45), TA-theme emergence traceable to ≥3 independent field sources, and — the grail — **% of insights traced to a downstream decision**. Nobody in the market has credibly instrumented that last one.
- **What they say, in their own words:** "Medical Insights Framework" (MIF), "TA strategic imperatives," "thought leader mapping (Tier 1/2/3)," "field medical plan," "Medical Insight Report (MIR)," "quarterly insight roll-up," "advisory board pre-read pack," "RTQ backlog," "MARS," "MI intake," "unsolicited off-label," "on-label reactive," "IIT routing," "fair balance."
- **AI fears:** Will raw MSL notes be readable by Commercial (firewall breach)? Will a transcript be discoverable in litigation? Will the AI mis-categorize a reactive off-label conversation as promotional? Will the audit trail be defensible in a regulator inquiry or DOJ subpoena? Will the AI "coach" me into sales-like behavior I'll fail compliance review for? These fears, more than any technical limitation, are what stall Medical Affairs AI pilots.

---

## SECTION 1: Submitter Information

- **Full name:** Matthew Tendler
- **Work email:** matthew.tendler@dominodatalab.com
- **Role:** — fill in —
- **Submission date:** [auto-populated by portal]
- **Notes:** Non-GxP extension, Medical Affairs workflow. Compliance posture is PhRMA Code + HIPAA + AE reporting obligations (21 CFR 314.80 spontaneous adverse event reporting from the field), not 21 CFR Part 11. However, the prospect will almost certainly request submission-grade audit rigor because Medical Affairs artifacts can become discoverable in litigation, DOJ subpoenas, and integrity / consent-decree monitoring. Design accordingly.

---

## SECTION 2: Prospect Overview

- **Company / prospect name:** [fill in per customer engagement]
- **Region:** [fill in per customer engagement]
- **Industry vertical:** [fill in per customer engagement] *(expected: Pharma / Biotech — large and mid-cap with a dedicated Field Medical organization, typically 30+ MSLs across 3+ TAs)*
- **Relationship stage:** [fill in per customer engagement] *(Early discovery / Active evaluation / POC / trial / Late stage / negotiation)*
- **Primary contact name:** [fill in per customer engagement]
- **Primary contact title / role:** [fill in per customer engagement] *(expected: VP / Executive Director, Field Medical Affairs; or Director, Medical Insights & Analytics; or Head of Medical Excellence)*
- **Estimated data science team size:** [fill in per customer engagement]
- **Additional context:** [fill in per customer engagement]

---

## SECTION 3: Business Problem

### High-level problem description
Medical Affairs field teams generate the richest, highest-signal stream of unfiltered scientific intelligence in the enterprise — and the least-used. Each quarter, 30+ MSLs produce 500–800 HCP interactions containing data gaps, unmet need signals, trial-feasibility feedback, competitive intelligence, and off-label interest patterns. Today this signal dies in free-text Veeva fields and quarterly PowerPoints with no feedback loop, no cross-TA re-discovery, no lineage into downstream decisions, and no audit-grade reproducibility when compliance, a partner, or a regulator asks the inevitable "how do you know?" question. The business problem is not insight capture — it is **insight-to-decision latency and traceability**.

### Business objectives
- Cut median time from HCP interaction to routed, themed, decision-ready signal from 45–90 days (quarterly cycle) to **<7 days**.
- Double **interaction-to-insight conversion** (targeting 1 routed signal per 3–5 interactions, vs. current ~1:10–1:15 effective rate once PowerPoint attrition is accounted for).
- Close the loop: instrument **% of field insights traced to a downstream decision** (protocol amendment, IIT greenlight, advisory board topic, market access reframe, commercial firewall-appropriate strategy input). Target: 40%+ within 12 months — up from ~5% self-reported today.
- Eliminate double-keying between Veeva CRM Medical and the insights synthesis layer; MSLs document once.
- Give Medical Governance a reproducible, audit-grade insight re-run capability: regenerate any past quarter's themes exactly, with full lineage to source interactions, source notes, model version, and taxonomy version.
- Deliver cross-TA HCP re-discovery ("every interaction with Dr. X across every MSL, every product, every TA at this company") on a single governed corpus.

### Current state
Most large pharma Medical Affairs organizations run some combination of (a) **Veeva CRM Medical** for structured interaction capture plus free-text notes, (b) a secondary insights layer — often a SharePoint, Smartsheet, or bespoke insights-intake form built on ServiceNow or Salesforce, (c) **Veeva MedInquiry** for reactive RTQ/MIR handling, (d) an advisory board platform like **Within3** or **Guidepoint**, (e) a KOL platform like **Monocl ExpertInsight** or **H1** for engagement planning, and (f) a quarterly insight roll-up process that is >80% manual — MSL Leads hand-read notes, hand-theme, hand-build slides. Some organizations have piloted **Aktana** Copilot or **Veeva AI Agents** (Medical module not GA until Aug 2026). These pilots have stalled at one of three points: MSLs experience them as surveillance, Legal blocks the integration pending discoverability review, or the tool fails to close the loop to a decision.

### Pain points
- **"Insights die in PowerPoint."** Quarterly roll-ups go upstream and nothing comes back. MSLs lose motivation to document nuance. *(Direct quote pattern from MAPS 2023–2024 panels.)*
- **Double-keying.** Same interaction captured in Veeva, a SharePoint insights form, and a TA workbook. MSLs admit under-documenting Veeva notes to avoid re-keying.
- **Free-text data grave.** The only fields rich enough to carry real signal (the 5000-char "Notes" in Veeva) are write-only. Structured taxonomy fields strip the nuance.
- **Compliance chilling effect.** Under PhRMA Code reactive off-label framework, MSLs self-censor precisely the signals Medical Strategy needs most, fearing Legal discoverability or Commercial-firewall breach.
- **No cross-TA HCP memory.** A KOL who spoke to MSL-A in Oncology and MSL-B in Hematology three months apart — two different TAs, two different Veeva accounts, two different sets of notes — and nobody in the company sees the connection.
- **No reproducibility.** Six months later, Medical Governance asks "regenerate the Q3 pediatric-off-label theme summary exactly as you showed it." There is no way to do this — the PowerPoint was manually built from notes that have since been edited, the taxonomy has evolved, and the synthesis is non-deterministic.
- **AI tools that feel like coaching/surveillance.** Aktana-style "ask this question next" real-time suggestions erode MSL trust. MSLs do not want an AI steering the conversation — they want an AI that makes their post-call synthesis 10× faster and their insights 10× more likely to be acted on.
- **Audit trail pain.** If Commercial is accused of off-label promotion in a consent-decree-style investigation, Medical Affairs artifacts may be subpoenaed. Today's file-share + PowerPoint audit trail does not meet a defensible standard.

### Success metrics
- **Time-to-routed-signal** (median): baseline 45–90 days → target <7 days.
- **Interaction-to-insight conversion ratio**: baseline ~1:10–1:15 effective → target 1:3–1:5.
- **% of routed signals traced to a downstream decision** (new KPI — establish baseline in first 90 days; target 40%+ at 12 months).
- **% of MSL interactions with ≥1 auto-themed insight** (target 85%+).
- **MSL documentation time per interaction** (baseline ~15–20 min Veeva + adjunct tools → target <5 min total via voice-first capture and auto-theming).
- **Cross-TA HCP interaction recall** (new metric — % of interactions where the system surfaces relevant prior touches from other TAs within the same company). Target 60%+ at 12 months.
- **Audit-grade reproducibility**: 100% of historical insight roll-ups regenerable bit-identically for ≥24 months with full lineage.
- **MSL Net Promoter (system)**: target +30 at 6 months. Sub-zero means we built surveillance, not a copilot.
- **Quarterly insight roll-up prep time**: baseline 80–120 MSL-hours per TA → target <10 hours.

### Key stakeholders
`VP/Executive Director Field Medical Affairs` · `Director Medical Insights & Analytics` · `Head of Medical Excellence` · `TA Medical Leads` · `MSLs (end users)` · `Medical Strategy` · `Clinical Development (trial feasibility feedback recipient)` · `Market Access & HEOR (payer-signal recipient)` · `Medical Information (RTQ/MIR triage)` · `Pharmacovigilance (AE feed)` · `Compliance / Legal` · `IT / Data Governance` · `Privacy Officer` · `Commercial (firewall-mediated consumer of select anonymized themes only)`

### Urgency and timeline drivers
- **Launch windows.** Product launches are 12–18 months of peak HCP field engagement. An organization approaching launch has a hard deadline: the field insight engine must be live before the first peak-engagement quarter or the data is gone.
- **Veeva AI Agents Medical module availability (Aug 2026)** is creating a fork-in-the-road moment — prospects are deciding *now* whether to commit deeper to Veeva's closed stack or to a platform-based alternative that gives them enterprise reach and governance control. First-mover window closes when Veeva ships.
- **MAPS 2025/26 agentic-AI framework guidance.** Medical Affairs professional body has published adoption framing; Chief Medical Officers are being asked by their boards "what is our Medical AI strategy?" Budget has crystallized around a discrete set of copilots, and MSL insight synthesis is the #1 or #2 line item at most large-pharma Medical organizations.
- **Post-launch 12-month retrospectives** force Medical leadership to answer "what signals did the field see that we missed?" — a painful exercise today, and an executive-visible commitment pressure.
- **Compliance triggers.** Any company under a corporate integrity agreement or consent decree has heightened audit-trail obligations, and the current Veeva-notes-plus-PowerPoint architecture does not clear that bar.

---

## SECTION 4: Data Assets

### Data overview
The extension is fed by a governed, continuously-ingested stream of field interaction artifacts — voice dictation, typed notes, structured CRM fields, and attached scientific materials — joined against a slowly-moving reference corpus of approved content (MARS), KOL master data, clinical trial registry, publication index, and prior routed insights. The core unit is the **interaction record**: one HCP × one MSL × one timestamp. Around each interaction, the system assembles a contextual envelope (HCP prior history, TA strategic imperatives, approved response library, recent publications, prior competitive signals) before the agent reasons over the raw note to produce themed insights, draft follow-ups, and routing proposals. Governance requires that every downstream artifact (themed insight, routed signal, roll-up deck, decision trace) links back to the specific interaction record, model version, and taxonomy version used to generate it.

### Data sources

**1. Veeva CRM Medical — Interaction Records**
- **System type:** SaaS CRM
- **Data formats:** Structured (tabular) + Unstructured text (Notes field)
- **Access status:** Access pending *(standard Veeva Vault API access via customer's existing Veeva admin; typical 4–8 weeks to provision sandbox → prod)*
- **Notes:** Primary source. Includes `Call_vod`, `Medical_Inquiry_vod`, `Account_vod` (HCP), `Address_vod`, and `Attendee_vod` objects. Free-text `Call_Notes_vod` is the richest unstructured field. Requires Veeva Vault connector, OAuth 2.0 service account, and sandbox for iteration. Historical backfill likely 2–3 years retrievable.

**2. Voice dictation (post-call) — mobile + web capture**
- **System type:** Streaming / event bus *(uploaded to customer's object storage as chunks; streamed to Domino via event-triggered job)*
- **Data formats:** Audio + Unstructured text *(transcripts)*
- **Access status:** Requires procurement / licensing *(customer must choose and license a HIPAA-BAA-covered ASR: AWS Transcribe Medical, Azure Speech Service with HIPAA BAA, or Deepgram/AssemblyAI under enterprise BAA. Self-hosted Whisper is a viable path and preferred by several large-pharma compliance teams)*
- **Notes:** Voice-first capture is the single biggest MSL adoption lever — it eliminates post-call typing burden. Must be **zero-retention on the ASR provider side** and land only in the customer's governed Domino datasets. Critical compliance decision point.

**3. Veeva MedInquiry — RTQ / MIR corpus**
- **System type:** SaaS CRM *(Veeva Vault module)*
- **Data formats:** Structured + Unstructured text
- **Access status:** Access pending
- **Notes:** Provides the "approved response" context for reactive off-label handling. Used by the agent to (a) help MSLs draft compliant follow-ups and (b) detect when a field interaction should trigger a formal MIR.

**4. MARS / MedComms — Approved Response Library + Scientific Content**
- **System type:** Document store *(typically Veeva Vault MedComms or SharePoint-based MARS; occasionally a bespoke medical library)*
- **Data formats:** Unstructured text + Images (slides, figures)
- **Access status:** Access pending
- **Notes:** Core RAG grounding corpus. All agent-drafted follow-ups must cite only approved content. Non-negotiable compliance requirement.

**5. HCP Master Data (Monocl / Definitive / IQVIA OneKey / Veeva OpenData / customer master)**
- **System type:** SaaS CRM *(usually surfaced via Veeva OpenData or an HCP master data platform)*
- **Data formats:** Structured (tabular)
- **Access status:** Already accessible *(via Veeva CRM)*
- **Notes:** Used for KOL tiering, specialty, affiliations, and cross-TA disambiguation. Critical for cross-TA re-discovery — resolves the "same Dr. X across two TAs" problem.

**6. ClinicalTrials.gov + internal Trial Management System (e.g., Medidata CTMS / Veeva Vault CTMS)**
- **System type:** REST / GraphQL API + On-prem relational database *(for internal CTMS)*
- **Data formats:** Structured (tabular) + Unstructured text
- **Access status:** Already accessible *(CT.gov is public; internal CTMS read-only access is typically governed but obtainable)*
- **Notes:** Lets the agent cross-reference field trial-feasibility feedback against the company's own pipeline and competitor pipeline.

**7. Publications corpus — PubMed + internal publications database**
- **System type:** REST API *(PubMed E-utilities)* + Document store *(internal pubs)*
- **Data formats:** Structured (tabular) + Unstructured text + Embeddings / vectors
- **Access status:** Already accessible
- **Notes:** Used to contextualize MSL references to specific papers and to detect when a KOL is citing unpublished, off-label, or pre-print evidence.

**8. Prior Medical Insight Reports (MIRs) + Quarterly Roll-up Archive**
- **System type:** Document store *(SharePoint / Box / Veeva Vault)*
- **Data formats:** Unstructured text + Images *(slides)*
- **Access status:** Access pending
- **Notes:** Critical for re-discovery ("did we see this signal before?") and for training the theming agent on the organization's historical taxonomy. Also the source of truth for the reproducibility requirement — we must be able to regenerate prior MIRs bit-identically.

**9. Advisory board transcripts (Within3 / Guidepoint) and MSL field observation memos**
- **System type:** SaaS *(Within3 API)* + Document store
- **Data formats:** Unstructured text + Audio
- **Access status:** Requires procurement / licensing *(Within3 API access is a per-seat, per-board license decision)*
- **Notes:** Episodic but high-signal. Ad board themes should flow into the same insights corpus.

**10. Pharmacovigilance intake (Argus Safety / ArisGlobal LifeSphere) — write-only routing endpoint**
- **System type:** SaaS *(Oracle Argus or equivalent)*
- **Data formats:** Structured (tabular)
- **Access status:** Access pending
- **Notes:** **Write-direction only.** When the agent detects a potential adverse event mention in field notes (a legal obligation under 21 CFR 314.80 — "spontaneous reports from any source including company representatives"), it must create a structured PV intake record. This is the single highest-stakes integration and must be over-engineered for reliability.

### Estimated total data volume
**10–100GB** initial *(3 years of back-filled Veeva interactions for a 30–50 MSL organization across 3–5 TAs, plus MARS approved-content library, plus publication embeddings)*. Steady-state growth ~5–20GB/year including audio. **>100GB** if full audio retention is required (most customers will opt for transcript-retention-only with audio discarded post-transcription, for HIPAA and discoverability reasons — strongly recommend this path).

### Data velocity / freshness
**Mixed.** HCP interactions and voice captures arrive in near real-time (MSL submits post-call, minutes). Agent theming and routing runs within 15 minutes of capture. MARS approved content, publications, trial registry updates refresh batch (daily). Reproducibility requires daily snapshotting of all reference corpora.

### Known data quality issues
- **Veeva free-text notes are highly variable in quality** — some MSLs write 5–10 words, some write 800. Voice-first capture improves this dramatically.
- **HCP identity disambiguation across TAs** is imperfect — same physician may have two `Account_vod` IDs in two different Veeva business units. HCP master data reconciliation is a named workstream.
- **Historical insight taxonomy drift.** Organizations rename their insight categories every 1–2 years. Reproducibility requires versioned taxonomies and versioned mappings.
- **Audio quality from field** (cars, airports, conference venues) varies. ASR WER benchmarks must be part of acceptance criteria.
- **PII in free-text.** MSLs occasionally write patient identifiers in notes ("Mr. Smith's case") which is a HIPAA violation regardless of intent. The ingest pipeline must de-identify at the source and alert the compliance lead.
- **Off-label content density varies wildly by TA** (rare diseases, oncology, and pediatrics have the highest reactive off-label discussion rates; primary care has the lowest).

### Data access notes
All data remains inside the customer's Domino deployment. No raw MSL notes, voice, or transcripts leave the governed tenant — ever — to an external LLM provider. If cloud LLMs are approved, access is via the customer's own Bedrock/Azure OpenAI/Vertex tenant with zero-retention terms and private networking. Self-hosted (Llama / Mistral / DeepSeek / gemma) is the preferred path for organizations under active integrity agreements. Row-level security enforced on HCP records; Commercial users have access only to aggregated, de-identified themes — never raw notes — with enforcement at the Domino app layer (RBAC) and a separate signed compliance audit of the firewall.

---

## SECTION 5: Governance & Compliance

### Applicable regulatory frameworks
- [x] **HIPAA** *(HCP contact data and any patient references in MSL notes; AE reporting requires HIPAA-covered handling)*
- [x] **GDPR** *(EU-based HCPs; Art. 9 special-category health data if patient references slip through)*
- [x] **CCPA / CPRA** *(California-based HCPs)*
- [x] **SOC 2** *(enterprise customer expectation for any system handling Medical Affairs data)*
- [ ] FedRAMP
- [ ] PCI-DSS
- [ ] FINRA / SEC
- [ ] BASEL / BCBS
- [ ] DORA
- [x] **EU AI Act** *(Medical Affairs decision-support is not currently high-risk under Annex III, but the prospect's legal team will require an EU AI Act posture statement; expect this to be live by the time we deliver)*
- [ ] None identified
- [x] **Other:** PhRMA Code on Interactions with Health Care Professionals (2022 update); **21 CFR 314.80** (spontaneous adverse event reporting — binding on the AE-routing subsystem); **OIG Compliance Program Guidance for Pharmaceutical Manufacturers**; customer-specific **Corporate Integrity Agreement (CIA)** if applicable *(common at large pharma, adds heightened audit-trail and monitoring requirements)*; **AdvaMed Code** if the prospect is a combination product / device company; **EFPIA Code of Practice** for EU operations; **ICH E2D** post-approval safety data management (cross-referenced by the AE-routing subsystem).

### Data residency requirements
- **US-based MSL data → US region** (AWS us-east-1 / us-west-2, Azure East US 2, or on-prem US DC).
- **EU-based MSL data → EU region** (Frankfurt / Ireland / Paris) with no cross-region replication. GDPR + EDPB Schrems II posture.
- **APAC HCP data** may require Japan- or Singapore-residency for customers with strong local-data mandates (common at Japanese pharma).
- Audit log storage co-located with data for each region.
- **No cross-region inference.** LLM calls must execute in the same region as the data.

### Data access restrictions
- **MSL notes** are visible to the MSL who created them, their direct MSL Lead, TA Medical Lead, and Medical Insights team. **Commercial has zero access** to raw notes — firewall enforced at the Domino app layer with independently auditable policy.
- **Themed, de-identified insights** can be surfaced to Medical Strategy, Clinical Dev, Market Access; Commercial receives only further-aggregated, PhRMA-Code-reviewed rollups (no HCP identifiers, no specific off-label references).
- **HCP PII** governed by HCP master data rules; data minimization enforced — agent only sees HCP identifier + tier + TA alignment, not full contact data, unless the MSL is drafting a follow-up.
- **AE / safety signals** routed to Pharmacovigilance via a write-only API with cryptographic hash of the source note attached for auditable lineage. **PV team does not have browse access** to the MSL corpus.
- **Compliance / Legal access** is read-only to the full corpus, gated by named-user approval and break-glass logging — every Compliance query is itself logged as a governance event.

### Input / output logging requirements
**Every** agent interaction must be logged with: timestamp (UTC + local), user identity, session ID, input artifact hash(es), agent / model version, prompt template version, retrieval set IDs and hashes, model parameters (temperature, top-p, seed), output artifact hash, token usage, and downstream routing decision. Logs are immutable (append-only, WORM storage with object-lock), retained **7 years minimum** (PhRMA Code common practice) or longer under Corporate Integrity Agreement. Logs themselves are indexed and searchable by Compliance with a separate audit trail of access.

### Decision audit trail requirements
For every routed signal, Medical Affairs must be able to answer, on demand:
- **What raw field interaction(s) triggered this signal?** (cryptographic linkage)
- **What agent / model / prompt version produced the theme?**
- **What retrieval context was in scope at that moment?** (snapshot ID)
- **What taxonomy version was applied?**
- **Who reviewed / approved the routing, and when?**
- **What downstream decision cites this signal?** (closed-loop link to protocol amendment, IIT approval, ad board topic, market access strategy doc)

All answerable bit-identically for the full retention period. This is the audit backbone — and the single biggest differentiator vs. Veeva + SharePoint.

### Explainability requirements
For every themed insight, the system must show: **source note snippets** (highlighted, cited), **retrieval grounding** (which MARS docs / publications / prior insights informed the theming), **confidence / consensus score** (if multiple interactions contributed), and **taxonomy mapping rationale** (why "Safety — hepatic" vs. "Safety — general"). Med Affairs professionals trust only explainable AI. No black-box classification. Model cards for every deployed model, versioned and queryable.

### Result consumer access restrictions
- **Commercial firewall** is the single highest-risk governance boundary. Commercial users see only aggregated, de-identified thematic trends, PhRMA-Code-reviewed, with a ≥N threshold (typical N=5) on contributing sources to prevent HCP re-identification. All firewall policies externally auditable.
- **External partners** (co-promote, co-develop) can receive pre-approved summaries only, with a separate review-and-release workflow and watermarked outputs.
- **Field team leads** see their own team's data plus peer benchmarks (aggregated across TAs).

### Additional governance notes
- **PV legal obligation is binding:** 21 CFR 314.80 requires the company to report AEs "from any source of which it becomes aware" within defined windows. An AI system that sees an AE mention and fails to route is a regulatory event. Build this subsystem with belt-and-suspenders: redundant detection (rule-based + LLM), human-in-loop confirmation on every flag, guaranteed delivery to Argus/LifeSphere, SLO-monitored. Treat this as P0.
- **Off-label detection is sensitive in both directions** — false negatives miss important signal; false positives may trigger unnecessary Compliance escalation and erode MSL trust. Tune with Compliance in the loop; do not ship with a single fixed threshold.
- **PhRMA Code firewall between Commercial and Medical is the governance boundary the customer's Chief Compliance Officer will personally review.** Design for external auditability.
- **EU AI Act posture statement** will be requested even where not strictly required — have a pre-authored customer-specific document.
- **Legal holds / discovery preservation.** The system must support customer-driven legal holds on specified date ranges / HCPs / TAs (ediscovery posture) with preservation unaffected by normal retention policies.
- **Deepfake / synthetic-audio guardrails.** ASR ingestion should detect and flag potentially synthesized audio — low-probability but high-reputational-risk failure mode.

---

## SECTION 6: Solution Requirements

### Deployment environment
**Hybrid (cloud + on-prem)** — most likely target. Customer-chosen primary cloud (AWS or Azure most common at large pharma; some biotech on GCP) plus on-prem components if the customer maintains local object storage for audio or a specific data-residency mandate. Support for **Air-gapped environment** is required for a subset of prospects (US federal contracts, certain global health sponsors, some EU customers under heightened data-sovereignty postures). Domino's ability to deploy identically across all these modes is a material differentiator.

### Prototype timeline expectation
**4–8 weeks** from kickoff to a working demo against synthetic MSL data, with a second 4–6 week phase to hook into the customer's Veeva sandbox. Total **Phase 1 POC: 8–14 weeks**.

### Deployment notes
- Phase 1 (weeks 1–4): synthetic data foundation — generate 500 realistic MSL interaction records across 3 TAs, build theming agent, build routing workflow, build reproducibility harness. Live demo-able.
- Phase 2 (weeks 5–10): Veeva sandbox integration, MARS ingestion, HCP master data reconciliation, ASR integration, compliance firewall enforcement, audit logging pipeline end-to-end.
- Phase 3 (weeks 11–16): PV write-direction integration (highest-stakes — compressed timeline with PV SME in the loop), PhRMA Code firewall audit, production cutover plan.
- **Customer IT dependencies to flag on day one:** Veeva admin availability for sandbox provisioning (critical path), MARS custodian identification (often a single person in Medical Excellence), PV integration point-of-contact (often slow to engage — start this conversation in week 1), ASR vendor selection (customer decision, usually 2–4 weeks).

### Integration requirements

**1. Veeva CRM Medical / Veeva Vault**
- **Integration type:** Bidirectional (read + write) *(read interactions & HCP data; write themed insights + routing back as structured fields on the Call record so MSLs see the AI output inline in their primary tool)*
- **Notes:** Primary integration. Veeva Vault API + Vault Loader for bulk backfill. Service account with scoped object permissions. Rate-limit aware. Write-back is critical for adoption — MSLs should never leave Veeva to see the AI output.

**2. Voice ASR (AWS Transcribe Medical / Azure Speech / Deepgram / self-hosted Whisper)**
- **Integration type:** Read data from it *(event-triggered ingestion)*
- **Notes:** Customer selects ASR based on compliance posture. HIPAA BAA mandatory. Zero-retention. WER benchmarking in UAT. Speaker diarization (MSL vs. HCP) where available.

**3. Veeva MedInquiry / MedComms / MARS**
- **Integration type:** Read data from it *(RAG grounding corpus)*
- **Notes:** Approved response library ingestion; must respect document lifecycle (superseded responses excluded from grounding).

**4. Pharmacovigilance (Oracle Argus Safety / ArisGlobal LifeSphere)**
- **Integration type:** Write data to it *(structured AE intake record creation)*
- **Notes:** **P0 critical integration.** AE detection in field notes → human-in-loop confirmation → structured intake creation in PV system with full source linkage. SLO-monitored. Redundant detection. Dead-letter queue + PV team alert if delivery fails.

**5. HCP Master Data (Veeva OpenData / IQVIA OneKey / Definitive / Monocl)**
- **Integration type:** Read data from it
- **Notes:** HCP identity resolution across TAs. Required for the cross-TA re-discovery feature.

**6. Internal CTMS (Veeva Vault CTMS / Medidata) + ClinicalTrials.gov**
- **Integration type:** Read data from it
- **Notes:** Trial-feasibility signal cross-reference against pipeline.

**7. PubMed + internal publications database**
- **Integration type:** Read data from it
- **Notes:** Publication context for MSL references; detect unpublished / preprint citations.

**8. SharePoint / Box / Veeva Vault (prior MIR archive)**
- **Integration type:** Read data from it *(initial backfill)* + Write data to it *(optionally publish new MIRs back)*
- **Notes:** Historical roll-up archive for re-discovery; optional write-back to preserve organizational paper trail.

**9. Identity provider (Okta / Azure AD / Ping)**
- **Integration type:** Authentication / SSO
- **Notes:** SSO + SCIM provisioning. MFA required for any write-direction function (PV, governance approvals).

**10. Microsoft Teams / Slack (MSL workflow)**
- **Integration type:** Embed / surface results in it + Event trigger / webhook
- **Notes:** Agent can deliver follow-up drafts, routing confirmations, and prep briefs via the MSL's collaboration tool of choice. Teams is dominant at large pharma.

**11. Microsoft Outlook / Google Calendar**
- **Integration type:** Read data from it
- **Notes:** Pre-call prep briefs auto-generated the evening before a scheduled HCP meeting. Reads calendar + HCP master + prior interaction history.

**12. Within3 / Guidepoint (virtual ad boards)**
- **Integration type:** Read data from it
- **Notes:** Ad board transcripts flow into the insights corpus (same theming pipeline, flagged as ad-board origin for governance).

**13. Enterprise audit / SIEM (Splunk / Datadog / Microsoft Sentinel)**
- **Integration type:** Write data to it
- **Notes:** All governance events, every agent invocation, every firewall policy evaluation streamed to customer SIEM for independent monitoring.

### UX and delivery requirements
- **MSL app (mobile-first + web):** voice-first capture, auto-generated post-call summary ready for MSL review in <60 seconds, inline follow-up drafts citing MARS, pre-call prep briefs auto-generated from calendar. *Critical principle: the MSL is the author; the AI is the assistant. No "coaching" during live calls. No real-time suggestions mid-interaction. Post-call only.*
- **MSL Lead dashboard:** team-level insight flow, cross-MSL theme emergence, routing status, decision-loop closure metrics. One-click drill from theme → contributing interactions → source notes with highlighting.
- **TA Medical Lead view:** cross-MSL TA-level strategic imperatives alignment, weekly themed digest, nominate-for-MIR workflow.
- **Medical Insights / Governance console:** insight re-run ("regenerate Q3 2025 pediatric theme exactly"), lineage browser, taxonomy version manager, audit log viewer.
- **Commercial-visible view (separate app, firewall-enforced):** aggregated, de-identified thematic trends with N ≥ 5 threshold, PhRMA-Code-reviewed auto-redaction.
- **Accessibility:** WCAG 2.2 AA. Screen-reader safe. Keyboard-first. Voice-first capture is the primary adoption lever.
- **Design principle:** the system must feel like an extension of the MSL's thinking, not a compliance imposition. If the first MSL using it in a pilot says "this feels like surveillance," we have failed.

### Target user personas
`MSL (end user, primary)` · `MSL Lead / Regional Medical Director` · `TA Medical Lead` · `Director of Medical Insights & Analytics` · `VP / Executive Director Field Medical Affairs` · `Medical Information Lead (RTQ triage consumer)` · `Medical Strategy (insight consumer)` · `Clinical Development (trial-feasibility consumer)` · `Market Access & HEOR (payer-signal consumer)` · `Pharmacovigilance (AE routing consumer)` · `Compliance / Legal (audit consumer)` · `Commercial leadership (firewall-mediated aggregated theme consumer)` · `Privacy Officer / DPO (governance reviewer)`

### Priority level
**High** *(Critical for organizations with imminent launches or active CIA obligations; High for steady-state Medical Affairs modernization.)*

### Technology constraints
- **No raw MSL notes / voice / transcripts leave the customer's governed tenant to an external LLM API.** This is a hard constraint at virtually every large-pharma Legal review. Either use a customer-tenant Bedrock / Azure OpenAI / Vertex with zero-retention + VPC, or self-hosted OSS models on Domino compute.
- **HIPAA BAA required** with any ASR, LLM, and embedding provider touching the data.
- **Deterministic re-runs** require pinned model versions, pinned prompt versions, pinned retrieval snapshots, and pinned taxonomy versions. This is non-negotiable for the reproducibility requirement.
- **Air-gap supportable** for a subset of prospects.
- **Veeva rate limits + object schema specifics** must be respected; customer-specific Veeva customizations are common.
- **Language support:** English primary; Japanese, German, French, Spanish, Portuguese (Brazil), Mandarin required for large-pharma global deployments. ASR and LLM both need multilingual.

### Predictive ML models toggle
**Yes** *(insight classification / taxonomy mapping, routing-destination prediction, AE detection classifier, de-identification / PII redaction, HCP disambiguation models, anomaly detection on theme emergence)*.

### Generative AI / LLMs toggle
**Yes**

#### GenAI use case types
- [x] **Text generation / drafting** *(follow-up drafts, MIR draft sections, pre-call prep briefs, scientific Q cards)*
- [x] **Summarization** *(post-call summaries, quarterly roll-up drafts, MSL-Lead daily digests)*
- [x] **Document Q&A** *(ground responses in MARS / MedInquiry / publications corpus)*
- [x] **Classification / entity / info extraction** *(theme classification, AE detection, off-label detection, HCP / drug / dose entity extraction, PII redaction)*
- [x] **Agents / autonomous tasks** *(routing signals to correct internal function, calendar-driven pre-call prep generation, insight-to-decision trace completion agent, reproducibility re-run orchestration)*
- [x] **RAG** *(all theming and drafting is grounded in MARS, publications, and prior insights)*
- [ ] Code generation
- [x] **Conversational chat** *(MSL Lead / Governance console — "show me every pediatric off-label signal in oncology in Q3," "regenerate the Q3 roll-up exactly")*
- [ ] Other

#### Preferred LLM providers
- [x] **Anthropic Claude** *(customer tenant with zero-retention, Claude Opus for theming/reproducibility, Claude Sonnet for high-throughput classification/drafting)*
- [x] **AWS Bedrock** *(preferred route to Claude + Llama / Mistral; customer tenant; HIPAA BAA; private networking)*
- [x] **Azure OpenAI** *(for Azure-anchored customers; customer tenant; HIPAA BAA; private networking)*
- [ ] OpenAI *(direct API — not acceptable for raw MSL data at most large pharma Legal reviews)*
- [x] **Google Vertex AI / Gemini** *(for Google-anchored customers; customer tenant)*
- [x] **Open source / self-hosted** *(Llama 3.1/3.3, Mistral Large, DeepSeek R1 variants, Qwen 2.5 for non-English — required for air-gapped deployments and preferred by several large-pharma Legal teams for PV-adjacent components. Self-hosted Whisper for ASR at several prospects.)*
- [ ] No preference

#### Must use self-hosted / open-source models only
**No** at most prospects — customer-tenant commercial models with zero-retention are generally acceptable. **Yes** at prospects under active CIA, air-gapped environments, or with strict data-sovereignty mandates. Design for both paths from day one.

#### Approach
- [x] **RAG** *(primary — MARS + publications + prior MIRs + HCP context)*
- [ ] Fine-tuning *(not recommended until we have 6+ months of customer-specific data and a clear eval framework; prompt engineering + retrieval tuning will get us 90% there)*
- [x] **PEFT** *(LoRA for taxonomy classification, AE detection, off-label detection — once per-customer labeled data accumulates)*
- [x] **Prompt engineering only** *(initial state for drafting and summarization)*
- [x] **Agentic workflows / tool use** *(signal routing, calendar-driven prep generation, reproducibility re-runs, cross-TA re-discovery, decision-loop closure trace)*
- [ ] Mixture / not yet determined

#### Context window / document size needs
- **Routine theming and drafting:** 32K–128K tokens (single interaction + prior HCP history + retrieved MARS context + taxonomy).
- **Quarterly roll-up generation:** 200K+ tokens (all interactions in a TA for a quarter, with retrieval context). Must be handled via map-reduce / chunked agent orchestration, not reliance on a single huge context window.
- **Cross-TA re-discovery queries:** on-demand, bounded by retrieval not context window.

#### Streaming responses required
**Yes** *(MSL UX demands progressive response rendering for drafting flows; governance console tolerates non-streaming for re-runs)*

#### Content safety / guardrails required
**Yes.** Critical guardrails:
- **Off-label volunteering guardrail** — drafts must never proactively introduce off-label framing; reactive-only language enforced.
- **PhRMA Code firewall** — no Commercial-routed output may contain HCP identifiers, specific off-label references, or individual-interaction detail below the N-threshold.
- **PII / PHI redaction** at ingest and on every output.
- **AE mandatory-reporting guardrail** — AE mention in source note forces routing to PV even if the MSL didn't flag it.
- **Hallucination guardrails on MARS citations** — every cited approved response must exist and be current.
- **Prompt-injection resistance** on MSL-typed input *(adversarial robustness; an MSL typing a malicious instruction into a note must not be able to exfiltrate HCP data or alter routing)*.
- **Refusal policies** vetted with Legal quarterly.

#### Specific model version requirements
All deployed models must be **version-pinned and reproducible for ≥24 months**. Model retirement (e.g., cloud provider deprecations) requires a formal re-validation workflow and a shadow-comparison period before cutover. Version history of every model, prompt, and taxonomy change is an auditable governance artifact. **Claude Opus 4.6 / Sonnet 4.6** + customer-tenant Bedrock or Azure OpenAI is the current recommended stack; **Llama 3.3 / Mistral Large / DeepSeek V3** for self-hosted paths.

### Real-time / online inference toggle
**Yes** *(post-call summary generation and MSL review loop must complete in <60 seconds of wall-clock time to preserve the adoption lever of voice-first capture; routing proposals must be ready in <5 minutes; cross-TA retrieval queries must return <10 seconds. Quarterly roll-up generation is batch/offline and can take hours.)*

### Additional solution notes
- **The Domino primitives that make this extension "only Domino":**
  1. **A single governed corpus spanning all TAs, all MSLs, all products** (nobody else has the neutral platform position to hold this — Veeva controls their own walled garden; Sorcero is literature-adjacent; Aktana is engagement-adjacent).
  2. **End-to-end lineage** from raw voice → transcript → theme → routing decision → downstream citation in a protocol amendment or strategy doc. Domino's experiment / artifact / model-registry primitives make this native, not bolted on.
  3. **Reproducible insight re-runs.** Pinned model versions, pinned prompt versions, pinned retrieval snapshots — a Medical Governance Committee can regenerate any prior quarter's insight roll-up bit-identically, on demand. This is the feature that makes this system defensible under a CIA or litigation discovery request — and the feature no MSL tool vendor has meaningfully delivered.
  4. **Cross-TA re-discovery** — enterprise semantic search over the full governed MSL corpus. "Every interaction with Dr. Jane Smith across every TA at this company" in one query.
  5. **Agentic routing with deterministic fallback** — LLM-driven signal routing with a rules-based guaranteed-delivery floor for PV (AE detection); Domino's workflow primitives support this dual-path resilience natively.
  6. **Governed promotion of themes to decision artifacts** — model-registry-style promotion pathway for insights that become part of the strategic record.
- **Phase 1 demo sequencing (for the FDE / demo team):** voice dictation of a synthetic post-call note → 45-second latency to themed insight + follow-up draft + routing proposal → MSL Lead receives cross-MSL pattern alert for the third similar signal this week → one-click insight-to-decision trace → governance console re-runs the last quarter's roll-up in 90 seconds with bit-identical output → cross-TA re-discovery surfaces the same HCP from a different TA two years ago. That is the "only Domino could do this" demo.
- **Failure modes to pre-empt in the pilot:**
  - MSL experiences the tool as surveillance → lost. Mitigation: no live coaching, MSL-is-author principle, MSL-driven insight edit/approve step before routing.
  - PV false-negative → regulatory event. Mitigation: redundant rule-based + LLM AE detection, mandatory human-in-loop confirmation, SLO-monitored delivery, dead-letter alerting.
  - Commercial firewall breach → CIA / consent-decree event. Mitigation: RBAC at the app layer, N ≥ 5 threshold, externally auditable firewall policy, SIEM streaming.
  - Reproducibility drift → audit finding. Mitigation: pinned everything, immutable snapshots, WORM storage for audit logs, 7+ year retention.
- **Commercial framing for executive audience:** we turn the most expensive, highest-IQ field function in pharma into a continuous, governed, reproducible enterprise intelligence engine — with the audit trail a Chief Compliance Officer can defend and the decision-loop closure that Medical Strategy has been asking for since the CRM was invented.
