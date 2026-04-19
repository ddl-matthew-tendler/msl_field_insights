import os
import time
import random
import hashlib
from datetime import datetime
from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

app = FastAPI(title="MSLFieldInsights")
app.mount("/static", StaticFiles(directory="static"), name="static")

# ── Inline mock data (mirrors static/mock_data.js) ───────────────

MOCK_MSLS = [
    {"id": "msl-1", "name": "Dr. Priya Mehta",    "ta": "Oncology",     "region": "Northeast"},
    {"id": "msl-2", "name": "Dr. James Okafor",   "ta": "Oncology",     "region": "Southeast"},
    {"id": "msl-3", "name": "Dr. Rachel Lim",     "ta": "Hematology",   "region": "Midwest"},
    {"id": "msl-4", "name": "Dr. Carlos Vega",    "ta": "Hematology",   "region": "West"},
    {"id": "msl-5", "name": "Dr. Anya Petrov",    "ta": "Rare Disease", "region": "Northeast"},
    {"id": "msl-6", "name": "Dr. Samuel Wright",  "ta": "Rare Disease", "region": "South"},
]

MOCK_HCPS = [
    {"id": "hcp-1", "name": "Dr. Sarah Chen",       "specialty": "Medical Oncology",        "institution": "Memorial Sloan Kettering", "tier": 1, "tas": ["Oncology", "Hematology"], "crossTa": True, "pubCount": 87},
    {"id": "hcp-2", "name": "Dr. Marcus Williams",  "specialty": "Hematology/Oncology",     "institution": "MD Anderson Cancer Center", "tier": 1, "tas": ["Oncology"],              "crossTa": False, "pubCount": 63},
    {"id": "hcp-3", "name": "Dr. Elena Rossi",      "specialty": "Hematology",              "institution": "Mayo Clinic",               "tier": 1, "tas": ["Hematology", "Rare Disease"], "crossTa": True, "pubCount": 112},
    {"id": "hcp-4", "name": "Dr. James Park",       "specialty": "Medical Oncology",        "institution": "Dana-Farber Cancer Institute", "tier": 2, "tas": ["Oncology"],            "crossTa": False, "pubCount": 34},
    {"id": "hcp-5", "name": "Dr. Fatima Al-Amin",   "specialty": "Rare Disease / Metabolic","institution": "Boston Children's Hospital", "tier": 1, "tas": ["Rare Disease"],          "crossTa": False, "pubCount": 56},
    {"id": "hcp-6", "name": "Dr. Robert Kim",       "specialty": "Hematology",              "institution": "Stanford Medical Center",   "tier": 2, "tas": ["Hematology"],             "crossTa": False, "pubCount": 29},
    {"id": "hcp-7", "name": "Dr. Claudia Müller",   "specialty": "Medical Oncology",        "institution": "Johns Hopkins",            "tier": 2, "tas": ["Oncology"],               "crossTa": False, "pubCount": 41},
]

HCP_BRIEFS = {
    "hcp-1": {
        "profile": {"id": "hcp-1", "name": "Dr. Sarah Chen", "specialty": "Medical Oncology", "institution": "Memorial Sloan Kettering", "tier": 1, "tas": ["Oncology", "Hematology"], "crossTa": True, "pubCount": 87},
        "crossTaAlert": True,
        "crossTaDetail": "Dr. Chen has been engaged by MSLs in both Oncology (Dr. Mehta, 2 interactions) and Hematology (Dr. Lim, 1 interaction) this quarter. Cross-TA signal identified: pediatric off-label interest raised in both contexts.",
        "recentSignals": ["HER2+ 3rd line unmet need", "Pediatric dosing interest (Oncology context)", "Cross-TA pediatric off-label (Hematology context)"],
        "interactions": [
            {"date": "2026-04-17", "msl": "Dr. Priya Mehta", "ta": "Oncology", "product": "ZAR-041", "themes": ["HER2+ 3rd line unmet need", "Pediatric dosing interest"]},
            {"date": "2026-04-14", "msl": "Dr. Rachel Lim", "ta": "Hematology", "product": "VEL-208", "themes": ["Cross-TA pediatric off-label", "Off-label interest Hematology"]},
            {"date": "2026-04-03", "msl": "Dr. Priya Mehta", "ta": "Oncology", "product": "ZAR-041", "themes": ["HER2+ 3rd line unmet need", "Competitive landscape"]},
        ],
        "publications": [
            {"title": "PD-L1 expression heterogeneity in gastric cancer", "journal": "JCO", "year": 2024},
            {"title": "HER2 amplification patterns in solid tumors", "journal": "NEJM", "year": 2023},
        ],
        "trials": [
            {"id": "NCT04321567", "title": "KEYNOTE-811 Extension", "phase": "Phase III", "role": "PI"},
            {"id": "NCT05198742", "title": "DESTINY-Gastric03", "phase": "Phase II", "role": "Co-I"},
        ],
    },
    "hcp-5": {
        "profile": {"id": "hcp-5", "name": "Dr. Fatima Al-Amin", "specialty": "Rare Disease / Metabolic", "institution": "Boston Children's Hospital", "tier": 1, "tas": ["Rare Disease"], "crossTa": False, "pubCount": 56},
        "crossTaAlert": False,
        "crossTaDetail": None,
        "recentSignals": ["Pediatric off-label 2–5y age group", "ERT switching intent", "Caregiver burden as outcome measure", "AE: ALT/AST elevation (flagged to PV)"],
        "interactions": [
            {"date": "2026-04-12", "msl": "Dr. Anya Petrov", "ta": "Rare Disease", "product": "RDX-115", "themes": ["Pediatric off-label 2–5y", "ERT switching intent"]},
            {"date": "2026-04-10", "msl": "Dr. Samuel Wright", "ta": "Rare Disease", "product": "RDX-115", "themes": ["AE Flag: ALT/AST elevation", "Enzyme activity monitoring"]},
            {"date": "2026-04-05", "msl": "Dr. Anya Petrov", "ta": "Rare Disease", "product": "RDX-115", "themes": ["Pediatric off-label 2–5y", "Caregiver burden outcome"]},
            {"date": "2026-03-20", "msl": "Dr. Anya Petrov", "ta": "Rare Disease", "product": "RDX-115", "themes": ["Pediatric off-label 2–5y", "Natural history data gap"]},
            {"date": "2026-03-12", "msl": "Dr. Samuel Wright", "ta": "Rare Disease", "product": "RDX-115", "themes": ["AE Flag: Infusion reaction", "Enzyme activity monitoring"]},
        ],
        "publications": [
            {"title": "Long-term outcomes in pediatric enzyme replacement therapy", "journal": "NEJM", "year": 2024},
            {"title": "Caregiver burden assessment tools in rare pediatric disease", "journal": "Orphanet J Rare Dis", "year": 2023},
        ],
        "trials": [
            {"id": "NCT05439681", "title": "ILLUMINATE-C Pediatric Extension", "phase": "Phase III", "role": "PI"},
        ],
    },
}

MOCK_INTERACTIONS = [
    {"id": "int-001", "mslId": "msl-1", "mslName": "Dr. Priya Mehta",   "hcpId": "hcp-1", "hcpName": "Dr. Sarah Chen",       "hcpTier": 1, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-04-17", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-001", "themes": ["HER2+ 3rd line unmet need", "Pediatric dosing interest"]},
    {"id": "int-002", "mslId": "msl-2", "mslName": "Dr. James Okafor",  "hcpId": "hcp-4", "hcpName": "Dr. James Park",        "hcpTier": 2, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-04-16", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-002", "themes": ["NSCLC 2nd line sequencing", "NGS testing gap"]},
    {"id": "int-003", "mslId": "msl-3", "mslName": "Dr. Rachel Lim",    "hcpId": "hcp-1", "hcpName": "Dr. Sarah Chen",       "hcpTier": 1, "ta": "Hematology",   "product": "VEL-208", "date": "2026-04-14", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-003", "themes": ["Cross-TA: pediatric off-label", "Off-label Hematology"]},
    {"id": "int-004", "mslId": "msl-4", "mslName": "Dr. Carlos Vega",   "hcpId": "hcp-3", "hcpName": "Dr. Elena Rossi",       "hcpTier": 1, "ta": "Hematology",   "product": "VEL-208", "date": "2026-04-15", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-004", "themes": ["MRD endpoint adoption", "CAR-T sequencing"]},
    {"id": "int-005", "mslId": "msl-5", "mslName": "Dr. Anya Petrov",   "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-04-12", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-005", "themes": ["Pediatric off-label 2–5y", "ERT switching intent"]},
    {"id": "int-006", "mslId": "msl-6", "mslName": "Dr. Samuel Wright", "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-04-10", "routingStatus": "Pending", "routingDestination": None,                   "aeFlag": True,  "insightId": None,      "themes": ["AE: hepatic elevation", "Enzyme monitoring"]},
    {"id": "int-007", "mslId": "msl-1", "mslName": "Dr. Priya Mehta",   "hcpId": "hcp-7", "hcpName": "Dr. Claudia Müller",   "hcpTier": 2, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-04-11", "routingStatus": "Routed",  "routingDestination": "Medical Information",  "aeFlag": False, "insightId": "ins-006", "themes": ["MSI-H testing gap", "dMMR-MSI discordance"]},
    {"id": "int-008", "mslId": "msl-2", "mslName": "Dr. James Okafor",  "hcpId": "hcp-2", "hcpName": "Dr. Marcus Williams",  "hcpTier": 1, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-04-09", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-007", "themes": ["BTK resistance", "Class sequencing"]},
    {"id": "int-009", "mslId": "msl-3", "mslName": "Dr. Rachel Lim",    "hcpId": "hcp-6", "hcpName": "Dr. Robert Kim",       "hcpTier": 2, "ta": "Hematology",   "product": "VEL-208", "date": "2026-04-08", "routingStatus": "Routed",  "routingDestination": "Market Access",       "aeFlag": False, "insightId": "ins-005", "themes": ["Payer access barriers", "Step therapy"]},
    {"id": "int-010", "mslId": "msl-4", "mslName": "Dr. Carlos Vega",   "hcpId": "hcp-3", "hcpName": "Dr. Elena Rossi",       "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-04-07", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-007", "themes": ["Cross-TA: rare disease", "Trial feasibility"]},
    {"id": "int-011", "mslId": "msl-5", "mslName": "Dr. Anya Petrov",   "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-04-05", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-003", "themes": ["Pediatric off-label 2–5y", "Caregiver burden"]},
    {"id": "int-012", "mslId": "msl-1", "mslName": "Dr. Priya Mehta",   "hcpId": "hcp-1", "hcpName": "Dr. Sarah Chen",       "hcpTier": 1, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-04-03", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-001", "themes": ["HER2+ unmet need", "Competitive landscape"]},
    {"id": "int-013", "mslId": "msl-6", "mslName": "Dr. Samuel Wright", "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-04-01", "routingStatus": "Pending", "routingDestination": None,                   "aeFlag": False, "insightId": None,      "themes": ["Dosing frequency preference"]},
    {"id": "int-014", "mslId": "msl-2", "mslName": "Dr. James Okafor",  "hcpId": "hcp-4", "hcpName": "Dr. James Park",       "hcpTier": 2, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-03-28", "routingStatus": "Routed",  "routingDestination": "Medical Information",  "aeFlag": False, "insightId": "ins-002", "themes": ["NSCLC combination data request"]},
    {"id": "int-015", "mslId": "msl-3", "mslName": "Dr. Rachel Lim",    "hcpId": "hcp-3", "hcpName": "Dr. Elena Rossi",       "hcpTier": 1, "ta": "Hematology",   "product": "VEL-208", "date": "2026-03-25", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-004", "themes": ["MRD endpoint interest", "Advisory board interest"]},
    {"id": "int-016", "mslId": "msl-4", "mslName": "Dr. Carlos Vega",   "hcpId": "hcp-6", "hcpName": "Dr. Robert Kim",       "hcpTier": 2, "ta": "Hematology",   "product": "VEL-208", "date": "2026-03-22", "routingStatus": "Routed",  "routingDestination": "Market Access",       "aeFlag": False, "insightId": "ins-005", "themes": ["Payer access barriers", "Step therapy"]},
    {"id": "int-017", "mslId": "msl-5", "mslName": "Dr. Anya Petrov",   "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-03-20", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-003", "themes": ["Pediatric off-label 2–5y", "Natural history data gap"]},
    {"id": "int-018", "mslId": "msl-1", "mslName": "Dr. Priya Mehta",   "hcpId": "hcp-7", "hcpName": "Dr. Claudia Müller",   "hcpTier": 2, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-03-18", "routingStatus": "Routed",  "routingDestination": "Medical Strategy",    "aeFlag": False, "insightId": "ins-006", "themes": ["dMMR-MSI discordance", "IO eligibility"]},
    {"id": "int-019", "mslId": "msl-2", "mslName": "Dr. James Okafor",  "hcpId": "hcp-2", "hcpName": "Dr. Marcus Williams",  "hcpTier": 1, "ta": "Oncology",     "product": "ZAR-041", "date": "2026-03-15", "routingStatus": "Routed",  "routingDestination": "Clinical Development", "aeFlag": False, "insightId": "ins-007", "themes": ["Trial feasibility", "ASCO data preview"]},
    {"id": "int-020", "mslId": "msl-6", "mslName": "Dr. Samuel Wright", "hcpId": "hcp-5", "hcpName": "Dr. Fatima Al-Amin",   "hcpTier": 1, "ta": "Rare Disease", "product": "RDX-115", "date": "2026-03-12", "routingStatus": "Pending", "routingDestination": None,                   "aeFlag": True,  "insightId": None,      "themes": ["AE: infusion reaction"]},
]

MOCK_INSIGHTS = [
    {"id": "ins-001", "interactionIds": ["int-001", "int-012"], "theme": "HER2+ 3rd Line Unmet Need", "taxonomy": "Efficacy. Unmet Need", "confidence": 0.94, "routedTo": "Clinical Development", "routedDate": "2026-04-17", "decisionLinked": True, "decisionType": "Protocol amendment consideration (STELLAR-4 expansion cohort)", "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-17-001"},
    {"id": "ins-002", "interactionIds": ["int-002", "int-014"], "theme": "NGS Testing Gap. Community Setting", "taxonomy": "Access. Diagnostics", "confidence": 0.89, "routedTo": "Medical Strategy", "routedDate": "2026-04-16", "decisionLinked": False, "decisionType": None, "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-16-001"},
    {"id": "ins-003", "interactionIds": ["int-003", "int-005", "int-011", "int-017"], "theme": "Pediatric Off-Label Use. 2–5y Age Group", "taxonomy": "Safety. Off-Label", "confidence": 0.97, "routedTo": "Clinical Development", "routedDate": "2026-04-14", "decisionLinked": True, "decisionType": "ILLUMINATE-C Pediatric Extension. 2–5y cohort feasibility review initiated", "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-14-001"},
    {"id": "ins-004", "interactionIds": ["int-004", "int-015"], "theme": "MRD Negativity as Primary Endpoint", "taxonomy": "Regulatory. Endpoint Design", "confidence": 0.91, "routedTo": "Medical Strategy", "routedDate": "2026-04-15", "decisionLinked": False, "decisionType": None, "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-15-001"},
    {"id": "ins-005", "interactionIds": ["int-009", "int-016"], "theme": "Payer Step Therapy Barriers. VEL-208", "taxonomy": "Access. Reimbursement", "confidence": 0.96, "routedTo": "Market Access", "routedDate": "2026-04-08", "decisionLinked": True, "decisionType": "HEOR team initiated payer policy analysis for UHC/Cigna", "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-08-001"},
    {"id": "ins-006", "interactionIds": ["int-007", "int-018"], "theme": "dMMR/MSS Discordance. IO Eligibility Uncertainty", "taxonomy": "Efficacy. Biomarker", "confidence": 0.88, "routedTo": "Medical Strategy", "routedDate": "2026-04-11", "decisionLinked": False, "decisionType": None, "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-11-001"},
    {"id": "ins-007", "interactionIds": ["int-008", "int-019"], "theme": "BTK Inhibitor Resistance. Sequencing Signal", "taxonomy": "Efficacy. Resistance Mechanism", "confidence": 0.93, "routedTo": "Clinical Development", "routedDate": "2026-04-09", "decisionLinked": True, "decisionType": "IIT application submitted. SPECTRUM-R resistance mechanism study", "modelVersion": "claude-opus-4-6", "promptVersion": "v9", "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-04-09-001"},
]

ROUTING_DESTINATIONS = ["Medical Strategy", "Clinical Development", "Pharmacovigilance", "Market Access", "Medical Information"]

TAXONOMY_VERSIONS = [
    {"version": "v3.1", "date": "2026-02-01", "status": "Active", "changeNote": "Added Safety. Off-Label subcategory; refined Access. Reimbursement taxonomy nodes."},
    {"version": "v3.0", "date": "2025-10-15", "status": "Archived", "changeNote": "Major restructure: split Efficacy into Efficacy. Primary and Efficacy. Biomarker."},
    {"version": "v2.4", "date": "2025-07-01", "status": "Archived", "changeNote": "Added Regulatory. Endpoint Design; minor label clarifications."},
    {"version": "v2.3", "date": "2025-04-10", "status": "Archived", "changeNote": "Quarterly update. added 4 new leaf nodes per TA Medical Lead feedback."},
    {"version": "v2.2", "date": "2025-01-05", "status": "Archived", "changeNote": "Initial 2025 taxonomy baseline."},
]

COMMERCIAL_THEMES = [
    {"id": "ct-1", "theme": "HER2+ 3rd Line Unmet Need", "ta": "Oncology", "signalCount": 14, "trend": "up", "lastUpdated": "2026-04-17", "summary": "Consistent field signal across Northeast and Southeast regions: physicians report a gap in viable options for HER2+ solid tumor patients progressing after 2nd line therapy."},
    {"id": "ct-2", "theme": "NGS Testing Gap. Community Oncology", "ta": "Oncology", "signalCount": 9, "trend": "up", "lastUpdated": "2026-04-16", "summary": "MSLs report community oncologists receiving pre-treated patients without adequate comprehensive genomic profiling, limiting precision therapy options in 2nd line."},
    {"id": "ct-3", "theme": "Payer Step Therapy Barriers", "ta": "Hematology", "signalCount": 11, "trend": "up", "lastUpdated": "2026-04-09", "summary": "Growing payer burden signal: multiple payers requiring additional prior therapy lines before approving VEL-208 triplet."},
    {"id": "ct-4", "theme": "MRD Negativity as Trial Endpoint", "ta": "Hematology", "signalCount": 7, "trend": "flat", "lastUpdated": "2026-04-15", "summary": "KOL interest in MRD negativity as a primary efficacy endpoint, following recent FDA guidance alignment."},
    {"id": "ct-5", "theme": "BTK Resistance Sequencing Questions", "ta": "Oncology", "signalCount": 6, "trend": "up", "lastUpdated": "2026-04-09", "summary": "Field signal around BTK inhibitor resistance patterns and uncertainty about non-covalent sequencing strategies."},
    {"id": "ct-6", "theme": "Enzyme Replacement Dosing Frequency", "ta": "Rare Disease", "signalCount": 5, "trend": "flat", "lastUpdated": "2026-03-28", "summary": "Patient and caregiver preference consistently favors monthly over biweekly dosing schedules."},
    {"id": "ct-7", "theme": "Caregiver Burden as Outcome Measure", "ta": "Rare Disease", "signalCount": 5, "trend": "up", "lastUpdated": "2026-04-05", "summary": "KOLs recommend incorporating validated caregiver burden PRO instruments in future pediatric rare disease trials."},
]

THEME_EMERGENCE = [
    {"week": "W1 Jan", "medStrat": 2, "clinDev": 1, "pv": 0, "mktAccess": 1, "medInfo": 1},
    {"week": "W2 Jan", "medStrat": 3, "clinDev": 2, "pv": 0, "mktAccess": 1, "medInfo": 2},
    {"week": "W3 Jan", "medStrat": 2, "clinDev": 1, "pv": 1, "mktAccess": 2, "medInfo": 1},
    {"week": "W4 Jan", "medStrat": 4, "clinDev": 3, "pv": 0, "mktAccess": 1, "medInfo": 1},
    {"week": "W1 Feb", "medStrat": 3, "clinDev": 2, "pv": 1, "mktAccess": 2, "medInfo": 2},
    {"week": "W2 Feb", "medStrat": 5, "clinDev": 3, "pv": 0, "mktAccess": 3, "medInfo": 1},
    {"week": "W3 Feb", "medStrat": 4, "clinDev": 4, "pv": 1, "mktAccess": 2, "medInfo": 2},
    {"week": "W4 Feb", "medStrat": 6, "clinDev": 3, "pv": 0, "mktAccess": 2, "medInfo": 2},
    {"week": "W1 Mar", "medStrat": 5, "clinDev": 4, "pv": 1, "mktAccess": 3, "medInfo": 1},
    {"week": "W2 Mar", "medStrat": 7, "clinDev": 5, "pv": 2, "mktAccess": 2, "medInfo": 3},
    {"week": "W3 Mar", "medStrat": 6, "clinDev": 4, "pv": 1, "mktAccess": 4, "medInfo": 2},
    {"week": "W4 Mar", "medStrat": 8, "clinDev": 6, "pv": 1, "mktAccess": 3, "medInfo": 2},
    {"week": "W1 Apr", "medStrat": 7, "clinDev": 5, "pv": 2, "mktAccess": 3, "medInfo": 2},
    {"week": "W2 Apr", "medStrat": 9, "clinDev": 7, "pv": 1, "mktAccess": 4, "medInfo": 3},
    {"week": "W3 Apr", "medStrat": 6, "clinDev": 5, "pv": 2, "mktAccess": 3, "medInfo": 2},
]


# ── Routes ────────────────────────────────────────────────────────

@app.get("/")
def index():
    return FileResponse("index.html")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/dashboard/stats")
def dashboard_stats():
    routed = sum(1 for i in MOCK_INTERACTIONS if i["routingStatus"] == "Routed")
    ae_count = sum(1 for i in MOCK_INTERACTIONS if i["aeFlag"])
    linked = sum(1 for ins in MOCK_INSIGHTS if ins["decisionLinked"])
    return {
        "interactions": len(MOCK_INTERACTIONS),
        "insightsRouted": routed,
        "avgDays": 4.2,
        "closedPct": round(linked / max(len(MOCK_INSIGHTS), 1) * 100),
        "aeFlags": ae_count,
        "pendingRouting": sum(1 for i in MOCK_INTERACTIONS if i["routingStatus"] == "Pending"),
    }


@app.get("/api/dashboard/themes")
def dashboard_themes():
    return THEME_EMERGENCE


@app.get("/api/interactions")
def interactions(
    ta: str = Query(None),
    msl: str = Query(None),
    status: str = Query(None),
    ae_only: bool = Query(False),
):
    result = MOCK_INTERACTIONS[:]
    if ta:
        result = [i for i in result if i["ta"] == ta]
    if msl:
        result = [i for i in result if i["mslId"] == msl]
    if status:
        result = [i for i in result if i["routingStatus"] == status]
    if ae_only:
        result = [i for i in result if i["aeFlag"]]
    return result


@app.post("/api/interactions/submit")
async def submit_interaction(payload: dict):
    note = (payload.get("note") or "").lower()
    hcp_id = payload.get("hcpId", "hcp-4")

    # Detect output type from keywords
    if any(w in note for w in ["adverse", "elevation", "reaction", "safety concern", "lab finding", "abnormal", "alt", "ast", "hepatic", "nausea", "vomiting"]):
        output_key = "adverse"
    elif any(w in note for w in ["pediatric", "child", "age", "2-5", "2 to 5", "off-label", "off label", "young patient", "infant"]):
        output_key = "pediatric"
    else:
        output_key = "default"

    # Simulated AI processing delay
    time.sleep(1.2)

    ai_outputs = {
        "default": {
            "summary": "The HCP expressed interest in mechanism of action data and the current clinical trial landscape. Key themes identified: Unmet Need (Efficacy), Trial Feasibility, and Medical Information Request. No adverse event language detected.\n\nAI Confidence: 87% | Taxonomy: Efficacy. Unmet Need",
            "followUpDraft": "Dear Dr. [HCP Name],\n\nThank you for your time today. As discussed, I am sharing approved published data on [product] mechanism of action. Per your question on trial enrollment criteria, I have attached the current protocol synopsis for reference.\n\nPlease let me know if you would like additional information or to connect with a Medical Information specialist.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs",
            "routing": {"destination": "Medical Strategy", "confidence": 0.82, "rationale": "HCP question touches on competitive positioning and unmet need. routing to Medical Strategy for strategic awareness."},
            "aeFlag": False,
            "themes": ["Unmet Need. Efficacy", "Trial Feasibility"],
        },
        "adverse": {
            "summary": "Potential adverse event detected\n\nThe HCP referenced a patient experiencing unexpected laboratory abnormalities or safety findings possibly related to therapy. AE flag raised for PV review and human confirmation before any routing.\n\nAdditional themes identified: Safety. Monitoring, Medical Information Request.\n\nAI Confidence: 99% | Mandatory routing to Pharmacovigilance per 21 CFR 314.80",
            "followUpDraft": "Dear Dr. [HCP Name],\n\nThank you for flagging the findings in your patient. Our Medical Information and Pharmacovigilance team are reaching out directly to gather the required information for our reporting process under 21 CFR 314.80.\n\nA Medical Information specialist will contact you within 24 hours.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs",
            "routing": {"destination": "Pharmacovigilance", "confidence": 0.99, "rationale": "Potential spontaneous adverse event report detected. Mandatory routing to Pharmacovigilance per 21 CFR 314.80 obligation. Human confirmation required before intake record creation."},
            "aeFlag": True,
            "themes": ["Safety. Adverse Event (Potential)", "Safety. Monitoring"],
        },
        "pediatric": {
            "summary": "The HCP raised a reactive, unsolicited question about off-label use of the compound in a pediatric population (ages 2–5). Per PhRMA Code, this is a permissible reactive discussion.\n\nKey themes: Safety. Off-Label (Pediatric), Clinical Development. Data Gap, Trial Feasibility.\n\nIMPORTANT: This is the 4th independent field signal on this topic this quarter. escalation threshold exceeded (threshold: 3). Auto-escalation routing to Clinical Development.\n\nAI Confidence: 97% | Taxonomy: Safety. Off-Label",
            "followUpDraft": "Dear Dr. [HCP Name],\n\nThank you for your question today regarding use in the pediatric population (ages 2–5). As discussed, I am sharing available published data on our compound in this setting. Our Medical Affairs team has noted the clinical interest.\n\nI will follow up with the Medical Information team to ensure you receive a complete response to your inquiry.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs",
            "routing": {"destination": "Clinical Development", "confidence": 0.97, "rationale": "Pediatric off-label signal has crossed the 3-interaction threshold. this is the 4th independent KOL this quarter. Auto-escalation to Clinical Development for pipeline consideration."},
            "aeFlag": False,
            "themes": ["Safety. Off-Label (Pediatric)", "Clinical Development. Data Gap"],
        },
    }

    result = ai_outputs[output_key].copy()

    # Create a new interaction record
    new_id = "int-new-" + str(int(time.time()))
    new_interaction = {
        "id": new_id,
        "mslId": payload.get("mslId", "msl-1"),
        "mslName": payload.get("mslName", "Dr. Priya Mehta"),
        "hcpId": hcp_id,
        "hcpName": payload.get("hcpName", "Dr. Sarah Chen"),
        "hcpTier": payload.get("hcpTier", 1),
        "ta": payload.get("ta", "Oncology"),
        "product": payload.get("product", "ZAR-041"),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "routingStatus": "Pending",
        "routingDestination": None,
        "aeFlag": result["aeFlag"],
        "insightId": None,
        "themes": result["themes"],
        "rawNotes": payload.get("note", ""),
        "modelVersion": "claude-opus-4-6",
        "promptVersion": "v9",
        "taxonomyVersion": "v3.1",
    }
    result["interaction"] = new_interaction
    return result


@app.get("/api/hcps")
def hcps(ta: str = Query(None)):
    result = MOCK_HCPS[:]
    if ta:
        result = [h for h in result if ta in h["tas"]]
    return result


@app.get("/api/hcps/{hcp_id}/brief")
def hcp_brief(hcp_id: str):
    if hcp_id in HCP_BRIEFS:
        return HCP_BRIEFS[hcp_id]
    # Generic brief for other HCPs
    hcp = next((h for h in MOCK_HCPS if h["id"] == hcp_id), None)
    if not hcp:
        return JSONResponse(status_code=404, content={"error": "HCP not found"})
    interactions = [i for i in MOCK_INTERACTIONS if i["hcpId"] == hcp_id]
    return {
        "profile": hcp,
        "crossTaAlert": hcp.get("crossTa", False),
        "crossTaDetail": "This HCP has interactions recorded across multiple Therapeutic Areas." if hcp.get("crossTa") else None,
        "recentSignals": list(set(t for i in interactions for t in i.get("themes", []))),
        "interactions": [{"date": i["date"], "msl": i["mslName"], "ta": i["ta"], "product": i["product"], "themes": i["themes"]} for i in sorted(interactions, key=lambda x: x["date"], reverse=True)],
        "publications": [],
        "trials": [],
    }


@app.get("/api/insights")
def insights():
    return MOCK_INSIGHTS


@app.get("/api/governance/rerun")
def governance_rerun(
    quarter: str = Query("Q3-2025"),
    ta: str = Query("Oncology"),
    taxonomy_version: str = Query("v2.4"),
):
    key = f"{quarter}-{ta}"
    rerun_results = {
        "Q3-2025-Oncology": {
            "quarter": "Q3 2025", "ta": "Oncology", "modelVersion": "claude-opus-4-6", "promptVersion": "v7",
            "taxonomyVersion": "v2.4", "retrievalSnapshotId": "snap-2025-09-30-onc",
            "generatedAt": "2025-10-02T14:32:11Z", "rerunAt": datetime.now().isoformat() + "Z",
            "matchConfidence": 1.0,
            "summary": "Q3 2025 Oncology Roll-Up. REPRODUCED BIT-IDENTICALLY\n\nTop 3 Themes:\n1. PD-L1 testing variability across community settings (n=18 interactions)\n2. HER2+ 2nd/3rd line unmet need emerging signal (n=11 interactions)\n3. IO combination fatigue and tolerability burden (n=9 interactions)\n\nRouting Summary: 14 signals to Medical Strategy, 9 to Clinical Dev, 3 to Market Access, 2 to PV, 5 to Medical Information\n\nThis synthesis is guaranteed bit-identical to the original Q3 2025 roll-up presented to Medical Strategy on October 4, 2025.",
            "interactionCount": 58,
        },
        "Q4-2025-Hematology": {
            "quarter": "Q4 2025", "ta": "Hematology", "modelVersion": "claude-opus-4-6", "promptVersion": "v8",
            "taxonomyVersion": "v3.0", "retrievalSnapshotId": "snap-2025-12-31-hem",
            "generatedAt": "2026-01-03T09:22:44Z", "rerunAt": datetime.now().isoformat() + "Z",
            "matchConfidence": 1.0,
            "summary": "Q4 2025 Hematology Roll-Up. REPRODUCED BIT-IDENTICALLY\n\nTop 3 Themes:\n1. MRD endpoint adoption. growing KOL consensus (n=14 interactions)\n2. Payer access barriers. step therapy expansion to additional payers (n=12 interactions)\n3. CAR-T sequencing relative to VEL-208. no clear guidance in field (n=8 interactions)\n\nRouting Summary: 11 signals to Medical Strategy, 7 to Clinical Dev, 8 to Market Access, 1 to PV\n\nBit-identical reproduction confirmed. Original generated Jan 3, 2026.",
            "interactionCount": 47,
        },
        "Q1-2026-Rare Disease": {
            "quarter": "Q1 2026", "ta": "Rare Disease", "modelVersion": "claude-opus-4-6", "promptVersion": "v9",
            "taxonomyVersion": "v3.1", "retrievalSnapshotId": "snap-2026-03-31-rd",
            "generatedAt": "2026-04-02T08:11:33Z", "rerunAt": datetime.now().isoformat() + "Z",
            "matchConfidence": 1.0,
            "summary": "Q1 2026 Rare Disease Roll-Up. REPRODUCED BIT-IDENTICALLY\n\nTop 3 Themes:\n1. Pediatric off-label 2–5y age group. escalation threshold crossed in week 8 (n=7 interactions)\n2. Caregiver burden as patient-reported outcome. KOL consensus forming (n=5 interactions)\n3. Enzyme replacement dosing frequency preference. monthly vs. biweekly (n=5 interactions)\n\nAE Flags: 2 spontaneous reports routed to PV (ARG-2026-00441, ARG-2026-00382)\n\nRouting Summary: 4 signals to Clinical Dev, 3 to Medical Strategy, 2 to PV confirmed intake\n\nBit-identical reproduction confirmed. Original generated Apr 2, 2026.",
            "interactionCount": 22,
        },
    }
    result = rerun_results.get(key)
    if not result:
        # Generic fallback
        result = {
            "quarter": quarter.replace("-", " "), "ta": ta, "modelVersion": "claude-opus-4-6",
            "promptVersion": "v9", "taxonomyVersion": taxonomy_version,
            "retrievalSnapshotId": f"snap-{quarter.lower()}-{ta.lower().replace(' ','-')}",
            "generatedAt": "2026-04-01T00:00:00Z", "rerunAt": datetime.now().isoformat() + "Z",
            "matchConfidence": 1.0,
            "summary": f"{quarter.replace('-', ' ')} {ta} Roll-Up. REPRODUCED BIT-IDENTICALLY\n\nTop themes: Unmet Need, Trial Feasibility, Access barriers.\n\nThis synthesis is guaranteed bit-identical to the original using pinned model claude-opus-4-6, prompt {taxonomy_version}, taxonomy {taxonomy_version}.",
            "interactionCount": random.randint(20, 60),
        }
    return result


@app.get("/api/governance/lineage/{insight_id}")
def governance_lineage(insight_id: str):
    insight = next((i for i in MOCK_INSIGHTS if i["id"] == insight_id), None)
    if not insight:
        # Use first insight as demo
        insight = MOCK_INSIGHTS[0]

    interactions = [i for i in MOCK_INTERACTIONS if i["id"] in insight["interactionIds"]]
    return {
        "insightId": insight["id"],
        "theme": insight["theme"],
        "steps": [
            {"step": "Field Interaction", "status": "completed", "detail": f"{len(interactions)} HCP interaction(s): " + ", ".join(i["hcpName"] for i in interactions), "timestamp": interactions[0]["date"] if interactions else "2026-04-01"},
            {"step": "Voice / Text Capture", "status": "completed", "detail": "MSL post-call note captured and ingested", "timestamp": interactions[0]["date"] if interactions else "2026-04-01"},
            {"step": "AI Theming", "status": "completed", "detail": f"Model: {insight['modelVersion']} | Prompt: {insight['promptVersion']} | Taxonomy: {insight['taxonomyVersion']} | Snapshot: {insight['retrievalSnapshotId']}", "timestamp": insight["routedDate"]},
            {"step": "Routing Decision", "status": "completed", "detail": f"Routed to {insight['routedTo']} | Confidence: {int(insight['confidence']*100)}%", "timestamp": insight["routedDate"]},
            {"step": "MSL Approval", "status": "completed", "detail": "MSL reviewed and approved routing before submission", "timestamp": insight["routedDate"]},
            {"step": "Downstream Decision", "status": "completed" if insight["decisionLinked"] else "pending", "detail": insight["decisionType"] if insight["decisionLinked"] else "Awaiting downstream decision linkage", "timestamp": "2026-04-18" if insight["decisionLinked"] else None},
        ],
        "modelVersion": insight["modelVersion"],
        "promptVersion": insight["promptVersion"],
        "taxonomyVersion": insight["taxonomyVersion"],
        "retrievalSnapshotId": insight["retrievalSnapshotId"],
        "decisionLinked": insight["decisionLinked"],
        "decisionType": insight["decisionType"],
    }


@app.get("/api/governance/audit")
def governance_audit(
    user: str = Query(None),
    action: str = Query(None),
    limit: int = Query(50),
):
    import random as _r
    actions_list = ["insight_theme", "routing_decision", "follow_up_draft", "precall_brief", "rerun_synthesis", "lineage_query", "commercial_export"]
    users_list = ["priya.mehta", "james.okafor", "rachel.lim", "carlos.vega", "anya.petrov", "samuel.wright", "compliance.audit"]
    models = ["claude-opus-4-6", "claude-sonnet-4-6"]
    prompts = ["v7", "v8", "v9"]
    entries = []
    base_ts = 1735689600  # 2026-01-01
    for i in range(min(limit, 60)):
        ts = datetime.fromtimestamp(base_ts + i * 93600).isoformat() + "Z"
        u = users_list[i % len(users_list)]
        a = actions_list[i % len(actions_list)]
        if user and u != user:
            continue
        if action and a != action:
            continue
        entries.append({
            "id": f"aud-{str(i+1).zfill(3)}",
            "timestamp": ts,
            "userId": u,
            "action": a,
            "inputHash": "sha256:" + hashlib.md5(f"input-{i}".encode()).hexdigest()[:16],
            "outputHash": "sha256:" + hashlib.md5(f"output-{i}".encode()).hexdigest()[:16],
            "modelVersion": models[i % len(models)],
            "promptVersion": prompts[i % len(prompts)],
            "taxonomyVersion": "v3.0" if i < 20 else "v3.1",
            "routingDecision": ROUTING_DESTINATIONS[i % len(ROUTING_DESTINATIONS)],
            "tokenUsage": 2400 + (i * 137 % 6000),
        })
    return entries


@app.get("/api/governance/taxonomy")
def governance_taxonomy():
    return TAXONOMY_VERSIONS


@app.get("/api/commercial/themes")
def commercial_themes(ta: str = Query(None)):
    result = [t for t in COMMERCIAL_THEMES if t["signalCount"] >= 5]
    if ta:
        result = [t for t in result if t["ta"] == ta]
    # Strip any raw note or HCP-identifiable data. aggregated only
    return result
