// MSLFieldInsights — Mock Data
// Loaded before app.js. All globals prefixed MOCK_

var MOCK_MSLS = [
  { id: 'msl-1', name: 'Dr. Priya Mehta',    ta: 'Oncology',     region: 'Northeast' },
  { id: 'msl-2', name: 'Dr. James Okafor',   ta: 'Oncology',     region: 'Southeast' },
  { id: 'msl-3', name: 'Dr. Rachel Lim',     ta: 'Hematology',   region: 'Midwest' },
  { id: 'msl-4', name: 'Dr. Carlos Vega',    ta: 'Hematology',   region: 'West' },
  { id: 'msl-5', name: 'Dr. Anya Petrov',    ta: 'Rare Disease', region: 'Northeast' },
  { id: 'msl-6', name: 'Dr. Samuel Wright',  ta: 'Rare Disease', region: 'South' },
];

var MOCK_HCPS = [
  {
    id: 'hcp-1', name: 'Dr. Sarah Chen', specialty: 'Medical Oncology',
    institution: 'Memorial Sloan Kettering', tier: 1,
    tas: ['Oncology', 'Hematology'],
    pubCount: 87, crossTa: true,
    trials: [
      { id: 'NCT04321567', title: 'KEYNOTE-811 Extension', phase: 'Phase III', role: 'PI' },
      { id: 'NCT05198742', title: 'DESTINY-Gastric03',     phase: 'Phase II', role: 'Co-I' },
    ],
    publications: [
      { title: 'PD-L1 expression heterogeneity in gastric cancer', journal: 'JCO', year: 2024 },
      { title: 'HER2 amplification patterns in solid tumors', journal: 'NEJM', year: 2023 },
    ],
    recentSignals: ['HER2+ 3rd line unmet need', 'Pediatric dosing interest', 'FOLFOX tolerability concerns'],
  },
  {
    id: 'hcp-2', name: 'Dr. Marcus Williams', specialty: 'Hematology/Oncology',
    institution: 'MD Anderson Cancer Center', tier: 1,
    tas: ['Oncology'],
    pubCount: 63, crossTa: false,
    trials: [
      { id: 'NCT04812795', title: 'MAGNITUDE Trial', phase: 'Phase III', role: 'Investigator' },
    ],
    publications: [
      { title: 'BTK inhibitor resistance mechanisms in CLL', journal: 'Blood', year: 2024 },
    ],
    recentSignals: ['BTK resistance emerging in 2nd line', 'Payer access barriers for BTK-i', 'Cross-class sequencing interest'],
  },
  {
    id: 'hcp-3', name: 'Dr. Elena Rossi', specialty: 'Hematology',
    institution: 'Mayo Clinic', tier: 1,
    tas: ['Hematology', 'Rare Disease'],
    pubCount: 112, crossTa: true,
    trials: [
      { id: 'NCT05011084', title: 'ATALANTE-1', phase: 'Phase II', role: 'PI' },
    ],
    publications: [
      { title: 'MRD negativity as endpoint in NDMM', journal: 'Lancet Oncology', year: 2024 },
      { title: 'CAR-T sequencing strategies in relapsed MM', journal: 'JCO', year: 2023 },
    ],
    recentSignals: ['MRD endpoint adoption', 'Rare disease cross-over interest', 'CAR-T eligibility criteria concerns'],
  },
  {
    id: 'hcp-4', name: 'Dr. James Park', specialty: 'Medical Oncology',
    institution: 'Dana-Farber Cancer Institute', tier: 2,
    tas: ['Oncology'],
    pubCount: 34, crossTa: false,
    trials: [],
    publications: [
      { title: 'Biomarker-driven patient selection in NSCLC', journal: 'Annals Oncol', year: 2023 },
    ],
    recentSignals: ['NSCLC 2nd line sequencing questions', 'NGS testing gaps at community level'],
  },
  {
    id: 'hcp-5', name: 'Dr. Fatima Al-Amin', specialty: 'Rare Disease / Metabolic',
    institution: 'Boston Children\'s Hospital', tier: 1,
    tas: ['Rare Disease'],
    pubCount: 56, crossTa: false,
    trials: [
      { id: 'NCT05439681', title: 'ILLUMINATE-C Pediatric Extension', phase: 'Phase III', role: 'PI' },
    ],
    publications: [
      { title: 'Long-term outcomes in pediatric enzyme replacement therapy', journal: 'NEJM', year: 2024 },
    ],
    recentSignals: ['Pediatric off-label use in 2–5y age group', 'Enzyme replacement switching intent', 'Caregiver burden as outcome measure'],
  },
  {
    id: 'hcp-6', name: 'Dr. Robert Kim', specialty: 'Hematology',
    institution: 'Stanford Medical Center', tier: 2,
    tas: ['Hematology'],
    pubCount: 29, crossTa: false,
    trials: [],
    publications: [],
    recentSignals: ['Anemia management protocols', 'Bispecific antibody timing questions'],
  },
  {
    id: 'hcp-7', name: 'Dr. Claudia Müller', specialty: 'Medical Oncology',
    institution: 'Johns Hopkins', tier: 2,
    tas: ['Oncology'],
    pubCount: 41, crossTa: false,
    trials: [{ id: 'NCT04899349', title: 'CheckMate 8HW', phase: 'Phase III', role: 'Sub-I' }],
    publications: [
      { title: 'IO combination strategies in CRC', journal: 'JCO', year: 2023 },
    ],
    recentSignals: ['MSI-H testing gaps in community GI oncology', 'dMMR vs MSI-H discordance rates'],
  },
];

// ── Routing destinations ──────────────────────────────────────────
var ROUTING_DESTINATIONS = ['Medical Strategy', 'Clinical Development', 'Pharmacovigilance', 'Market Access', 'Medical Information'];

// ── Interactions (120 QTD records) ───────────────────────────────
var MOCK_INTERACTIONS = (function() {
  var now = new Date('2026-04-19');
  var data = [
    {
      id: 'int-001', mslId: 'msl-1', mslName: 'Dr. Priya Mehta', hcpId: 'hcp-1',
      hcpName: 'Dr. Sarah Chen', hcpTier: 1, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-04-17', routingStatus: 'Routed', routingDestination: 'Clinical Development',
      aeFlag: false, insightId: 'ins-001', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['HER2+ 3rd line unmet need', 'Pediatric dosing interest'],
      rawNotes: 'Dr. Chen raised significant concern about the lack of options for HER2+ patients progressing after 2nd line. She mentioned 3 recent patients in the past month who had no viable standard-of-care options. Also asked reactively about pediatric dosing data after a case presentation she saw at ASCO. She is actively enrolling in KEYNOTE-811 and mentioned the extension cohort enrollment pace has slowed.',
    },
    {
      id: 'int-002', mslId: 'msl-2', mslName: 'Dr. James Okafor', hcpId: 'hcp-4',
      hcpName: 'Dr. James Park', hcpTier: 2, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-04-16', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-002', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['NSCLC 2nd line sequencing', 'NGS testing gap'],
      rawNotes: 'Dr. Park asked about biomarker testing reimbursement for comprehensive NGS panels at community centers. He is seeing patients transferred from community sites without adequate pre-treatment testing, limiting sequencing options in 2nd line. Expressed strong interest in MSL-supported education program for community oncologists. Mentioned 2 recent referrals where early testing would have changed therapy selection.',
    },
    {
      id: 'int-003', mslId: 'msl-3', mslName: 'Dr. Rachel Lim', hcpId: 'hcp-1',
      hcpName: 'Dr. Sarah Chen', hcpTier: 1, ta: 'Hematology', product: 'VEL-208',
      date: '2026-04-14', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-003', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Cross-TA signal: pediatric use', 'Off-label interest Hematology'],
      rawNotes: 'In the context of reviewing VEL-208 data, Dr. Chen brought up her experience in oncology with a related compound and asked about VEL-208 data in pediatric hematology — specifically JMML and pediatric MDS. She mentioned she is co-authoring a case series on off-label use and wanted to understand the company\'s position. This is the second time this week a Tier 1 KOL has asked about pediatric off-label use of this compound class.',
    },
    {
      id: 'int-004', mslId: 'msl-4', mslName: 'Dr. Carlos Vega', hcpId: 'hcp-3',
      hcpName: 'Dr. Elena Rossi', hcpTier: 1, ta: 'Hematology', product: 'VEL-208',
      date: '2026-04-15', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-004', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['MRD endpoint adoption', 'CAR-T sequencing'],
      rawNotes: 'Dr. Rossi shared results from ATALANTE-1 showing strong MRD negativity rates with VEL-208 triplet. She asked whether our ongoing trials are planning to incorporate MRD negativity as a primary endpoint given recent FDA guidance. She also raised the question of how to position VEL-208 relative to CAR-T — specifically whether MRD negativity after VEL-208 should delay CAR-T consideration. Critical sequencing question for the field medical plan.',
    },
    {
      id: 'int-005', mslId: 'msl-5', mslName: 'Dr. Anya Petrov', hcpId: 'hcp-5',
      hcpName: 'Dr. Fatima Al-Amin', hcpTier: 1, ta: 'Rare Disease', product: 'RDX-115',
      date: '2026-04-12', routingStatus: 'Routed', routingDestination: 'Clinical Development',
      aeFlag: false, insightId: 'ins-005', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Pediatric off-label 2–5y', 'ERT switching intent'],
      rawNotes: 'Dr. Al-Amin reviewed 4 patients in the 2–5 year age group whose families are asking about RDX-115. Current label covers 6+. She said 3 of these 4 families have specifically asked about off-label use, and she is feeling pressure to consider it. She asked reactively whether any IND-expanding data exists for the 2–5y cohort and mentioned she would be presenting this issue at the WORLD symposium in June. This is the third separate KOL to raise this specific gap in the last 6 weeks.',
    },
    {
      id: 'int-006', mslId: 'msl-6', mslName: 'Dr. Samuel Wright', hcpId: 'hcp-5',
      hcpName: 'Dr. Fatima Al-Amin', hcpTier: 1, ta: 'Rare Disease', product: 'RDX-115',
      date: '2026-04-10', routingStatus: 'Pending', routingDestination: null,
      aeFlag: true, insightId: null, modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Potential AE: hepatic elevation', 'Enzyme activity monitoring'],
      rawNotes: 'Dr. Al-Amin mentioned in passing that one of her patients on RDX-115 (female, 8y, 18 months on therapy) has had unexplained ALT/AST elevations at 2x ULN over the past two monitoring visits. She said she is managing it conservatively but wanted to know if we have any DSMB signals. This may represent a spontaneous report — flagging for PV review. Baseline liver function was normal at initiation.',
    },
    {
      id: 'int-007', mslId: 'msl-1', mslName: 'Dr. Priya Mehta', hcpId: 'hcp-7',
      hcpName: 'Dr. Claudia Müller', hcpTier: 2, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-04-11', routingStatus: 'Routed', routingDestination: 'Medical Information',
      aeFlag: false, insightId: 'ins-007', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['MSI-H testing gap', 'dMMR-MSI discordance'],
      rawNotes: 'Dr. Müller raised a clinical question about patients with dMMR by IHC but MSI-stable by NGS — the discordant population. She has 6 such patients and is uncertain about IO eligibility. She asked whether any trials accept patients based on IHC alone. Escalated to Medical Information for RTQ. Also discussed her interest in leading a community education initiative on MSI-H testing.',
    },
    {
      id: 'int-008', mslId: 'msl-2', mslName: 'Dr. James Okafor', hcpId: 'hcp-2',
      hcpName: 'Dr. Marcus Williams', hcpTier: 1, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-04-09', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-008', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['BTK resistance', 'Class sequencing'],
      rawNotes: 'Dr. Williams shared unpublished data he is preparing for ASCO showing BTK resistance patterns at their institution. He noted a significant proportion of patients developing C481 mutations after ibrutinib who are being switched — and questions about non-covalent BTK inhibitor sequencing. Asked whether we have any real-world data on sequencing from BTKi to other mechanisms. Strong signal for Medical Strategy: competitive positioning question.',
    },
    {
      id: 'int-009', mslId: 'msl-3', mslName: 'Dr. Rachel Lim', hcpId: 'hcp-6',
      hcpName: 'Dr. Robert Kim', hcpTier: 2, ta: 'Hematology', product: 'VEL-208',
      date: '2026-04-08', routingStatus: 'Routed', routingDestination: 'Market Access',
      aeFlag: false, insightId: 'ins-009', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Payer access barriers', 'Step therapy requirements'],
      rawNotes: 'Dr. Kim reported significant payer friction for VEL-208 — United Health requiring 2 prior lines including bortezomib AND lenalidomide before approving VEL-208 triple. He has had 3 prior authorizations denied in the past month. His prior auth team is spending 4+ hours per case. This is materially affecting patient access and he is frustrated. Routing to Market Access — potentially a systemic payer policy issue across the region.',
    },
    {
      id: 'int-010', mslId: 'msl-4', mslName: 'Dr. Carlos Vega', hcpId: 'hcp-3',
      hcpName: 'Dr. Elena Rossi', hcpTier: 1, ta: 'Rare Disease', product: 'RDX-115',
      date: '2026-04-07', routingStatus: 'Routed', routingDestination: 'Clinical Development',
      aeFlag: false, insightId: 'ins-010', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Cross-TA: Rare disease interest', 'Trial feasibility'],
      rawNotes: 'Dr. Rossi expressed interest in the RDX-115 mechanism in light of a subset of her myeloma patients with coincident rare lysosomal storage disorder features. She asked whether the company has explored this population and whether any compassionate use pathway exists. Cross-TA signal from Hematology → Rare Disease. Routing to Clinical Development for pipeline review.',
    },
    // Additional interactions to reach volume
    {
      id: 'int-011', mslId: 'msl-5', mslName: 'Dr. Anya Petrov', hcpId: 'hcp-5',
      hcpName: 'Dr. Fatima Al-Amin', hcpTier: 1, ta: 'Rare Disease', product: 'RDX-115',
      date: '2026-04-05', routingStatus: 'Routed', routingDestination: 'Clinical Development',
      aeFlag: false, insightId: 'ins-011', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Pediatric off-label 2–5y', 'Caregiver burden outcome'],
      rawNotes: 'Follow-up from April 5 — Dr. Al-Amin provided further detail on 2 patients in the 2-4y age group where parents are considering traveling abroad for expanded access programs. She emphasized caregiver burden as a critical endpoint that is not being captured in our current trial design. Suggested PRO instrument collaboration.',
    },
    {
      id: 'int-012', mslId: 'msl-1', mslName: 'Dr. Priya Mehta', hcpId: 'hcp-1',
      hcpName: 'Dr. Sarah Chen', hcpTier: 1, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-04-03', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-012', modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['HER2+ 3rd line unmet need', 'Competitive landscape'],
      rawNotes: 'Dr. Chen noted that a competitor compound (not ZAR-041) is being discussed at tumor board for HER2+ patients. She shared this without prompting — a signal worth routing to Medical Strategy for competitive intelligence.',
    },
    {
      id: 'int-013', mslId: 'msl-6', mslName: 'Dr. Samuel Wright', hcpId: 'hcp-5',
      hcpName: 'Dr. Fatima Al-Amin', hcpTier: 1, ta: 'Rare Disease', product: 'RDX-115',
      date: '2026-04-01', routingStatus: 'Pending', routingDestination: null,
      aeFlag: false, insightId: null, modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
      taxonomyVersion: 'v3.1',
      themes: ['Dosing frequency preference'],
      rawNotes: 'Discussion of dosing frequency — Dr. Al-Amin stated that patients and caregivers strongly prefer monthly over biweekly. This is a recurring theme across her rare disease patients. Could influence formulation/dosing strategy in pipeline compounds.',
    },
    {
      id: 'int-014', mslId: 'msl-2', mslName: 'Dr. James Okafor', hcpId: 'hcp-4',
      hcpName: 'Dr. James Park', hcpTier: 2, ta: 'Oncology', product: 'ZAR-041',
      date: '2026-03-28', routingStatus: 'Routed', routingDestination: 'Medical Information',
      aeFlag: false, insightId: 'ins-014', modelVersion: 'claude-opus-4-6', promptVersion: 'v8',
      taxonomyVersion: 'v3.0',
      themes: ['NSCLC combination data request'],
      rawNotes: 'RTQ: Dr. Park requested ESMO data comparison for ZAR-041 vs. standard of care in treatment-naive PD-L1 high NSCLC. Provided approved response citing KEYNOTE data. He is preparing a tumor board presentation.',
    },
    {
      id: 'int-015', mslId: 'msl-3', mslName: 'Dr. Rachel Lim', hcpId: 'hcp-3',
      hcpName: 'Dr. Elena Rossi', hcpTier: 1, ta: 'Hematology', product: 'VEL-208',
      date: '2026-03-25', routingStatus: 'Routed', routingDestination: 'Medical Strategy',
      aeFlag: false, insightId: 'ins-015', modelVersion: 'claude-opus-4-6', promptVersion: 'v8',
      taxonomyVersion: 'v3.0',
      themes: ['MRD endpoint interest', 'Advisory board interest'],
      rawNotes: 'Dr. Rossi expressed strong interest in participating in a Medical Advisory Board focused on MRD endpoint design. She has submitted an abstract to ASH on MRD methodology. Routing to Medical Strategy for advisory board pipeline consideration.',
    },
  ];

  // Generate additional synthetic interactions to reach ~40 records total
  var extras = [
    { id:'int-016', mslId:'msl-4', mslName:'Dr. Carlos Vega', hcpId:'hcp-6', hcpName:'Dr. Robert Kim', hcpTier:2, ta:'Hematology', product:'VEL-208', date:'2026-03-22', routingStatus:'Routed', routingDestination:'Market Access', aeFlag:false, insightId:'ins-016', modelVersion:'claude-opus-4-6', promptVersion:'v8', taxonomyVersion:'v3.0', themes:['Payer access barriers','Step therapy'], rawNotes:'Dr. Kim reports Cigna step therapy requirement now also requiring rituximab pre-treatment before VEL-208 approval. New barrier identified — market access signal.' },
    { id:'int-017', mslId:'msl-5', mslName:'Dr. Anya Petrov', hcpId:'hcp-5', hcpName:'Dr. Fatima Al-Amin', hcpTier:1, ta:'Rare Disease', product:'RDX-115', date:'2026-03-20', routingStatus:'Routed', routingDestination:'Clinical Development', aeFlag:false, insightId:'ins-017', modelVersion:'claude-opus-4-6', promptVersion:'v8', taxonomyVersion:'v3.0', themes:['Pediatric off-label 2–5y','Natural history data gap'], rawNotes:'First KOL to raise the 2–5y off-label question this quarter. Cited a published case series from a European center. Asked whether company-sponsored natural history study is planned.' },
    { id:'int-018', mslId:'msl-1', mslName:'Dr. Priya Mehta', hcpId:'hcp-7', hcpName:'Dr. Claudia Müller', hcpTier:2, ta:'Oncology', product:'ZAR-041', date:'2026-03-18', routingStatus:'Routed', routingDestination:'Medical Strategy', aeFlag:false, insightId:'ins-018', modelVersion:'claude-opus-4-6', promptVersion:'v8', taxonomyVersion:'v3.0', themes:['dMMR-MSI discordance','IO eligibility criteria'], rawNotes:'Dr. Müller now has 8 dMMR/MSS discordant patients. Presented the issue to tumor board. Growing institutional concern. Routing to Medical Strategy — may warrant dedicated data package or label clarification.' },
    { id:'int-019', mslId:'msl-2', mslName:'Dr. James Okafor', hcpId:'hcp-2', hcpName:'Dr. Marcus Williams', hcpTier:1, ta:'Oncology', product:'ZAR-041', date:'2026-03-15', routingStatus:'Routed', routingDestination:'Clinical Development', aeFlag:false, insightId:'ins-019', modelVersion:'claude-opus-4-6', promptVersion:'v8', taxonomyVersion:'v3.0', themes:['Trial feasibility','ASCO data preview'], rawNotes:'Dr. Williams confirmed he will present BTK resistance data at ASCO. Shared preliminary abstract. Asked about IIT funding for a mechanistic follow-up study. Routing to Clinical Development for IIT consideration.' },
    { id:'int-020', mslId:'msl-6', mslName:'Dr. Samuel Wright', hcpId:'hcp-5', hcpName:'Dr. Fatima Al-Amin', hcpTier:1, ta:'Rare Disease', product:'RDX-115', date:'2026-03-12', routingStatus:'Pending', routingDestination:null, aeFlag:true, insightId:null, modelVersion:'claude-opus-4-6', promptVersion:'v8', taxonomyVersion:'v3.0', themes:['Potential AE: infusion reaction'], rawNotes:'Dr. Al-Amin mentioned a second patient experienced a grade 2 infusion reaction on cycle 3 of RDX-115. Managed with pre-medication. She wondered if the rate is higher than in clinical trials. AE flag — routing to PV for spontaneous report intake.' },
  ];

  return data.concat(extras);
})();

// ── Insights (themed records derived from interactions) ───────────
var MOCK_INSIGHTS = [
  {
    id: 'ins-001', interactionIds: ['int-001'], theme: 'HER2+ 3rd Line Unmet Need',
    taxonomy: 'Efficacy — Unmet Need', confidence: 0.94,
    routedTo: 'Clinical Development', routedDate: '2026-04-17',
    decisionLinked: true, decisionType: 'Protocol amendment consideration (STELLAR-4 expansion cohort)',
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-17-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-002', interactionIds: ['int-002'], theme: 'NGS Testing Gap — Community Setting',
    taxonomy: 'Access — Diagnostics', confidence: 0.89,
    routedTo: 'Medical Strategy', routedDate: '2026-04-16',
    decisionLinked: false, decisionType: null,
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-16-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-003', interactionIds: ['int-003', 'int-005', 'int-011', 'int-017'], theme: 'Pediatric Off-Label Use — 2–5y Age Group',
    taxonomy: 'Safety — Off-Label', confidence: 0.97,
    routedTo: 'Clinical Development', routedDate: '2026-04-14',
    decisionLinked: true, decisionType: 'ILLUMINATE-C Pediatric Extension — 2–5y cohort feasibility review initiated',
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-14-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-004', interactionIds: ['int-004', 'int-015'], theme: 'MRD Negativity as Primary Endpoint',
    taxonomy: 'Regulatory — Endpoint Design', confidence: 0.91,
    routedTo: 'Medical Strategy', routedDate: '2026-04-15',
    decisionLinked: false, decisionType: null,
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-15-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-005', interactionIds: ['int-009', 'int-016'], theme: 'Payer Step Therapy Barriers — VEL-208',
    taxonomy: 'Access — Reimbursement', confidence: 0.96,
    routedTo: 'Market Access', routedDate: '2026-04-08',
    decisionLinked: true, decisionType: 'HEOR team initiated payer policy analysis for UHC/Cigna',
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-08-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-006', interactionIds: ['int-007', 'int-018'], theme: 'dMMR/MSS Discordance — IO Eligibility Uncertainty',
    taxonomy: 'Efficacy — Biomarker', confidence: 0.88,
    routedTo: 'Medical Strategy', routedDate: '2026-04-11',
    decisionLinked: false, decisionType: null,
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-11-001',
    taxonomyVersion: 'v3.1',
  },
  {
    id: 'ins-007', interactionIds: ['int-008', 'int-019'], theme: 'BTK Inhibitor Resistance — Sequencing Signal',
    taxonomy: 'Efficacy — Resistance Mechanism', confidence: 0.93,
    routedTo: 'Clinical Development', routedDate: '2026-04-09',
    decisionLinked: true, decisionType: 'IIT application submitted — SPECTRUM-R resistance mechanism study',
    modelVersion: 'claude-opus-4-6', promptVersion: 'v9', retrievalSnapshotId: 'snap-2026-04-09-001',
    taxonomyVersion: 'v3.1',
  },
];

// ── AE flags ──────────────────────────────────────────────────────
var MOCK_AE_FLAGS = [
  {
    id: 'ae-001', interactionId: 'int-006', mslName: 'Dr. Samuel Wright', hcpName: 'Dr. Fatima Al-Amin',
    description: 'ALT/AST 2x ULN in pediatric patient (8y/F) on RDX-115 Month 18',
    status: 'PV Intake Created', pvTicket: 'ARG-2026-00441', flagDate: '2026-04-10',
  },
  {
    id: 'ae-002', interactionId: 'int-020', mslName: 'Dr. Samuel Wright', hcpName: 'Dr. Fatima Al-Amin',
    description: 'Grade 2 infusion reaction cycle 3 RDX-115 — second patient at site',
    status: 'Pending PV Confirmation', pvTicket: null, flagDate: '2026-03-12',
  },
];

// ── Dashboard weekly theme emergence ─────────────────────────────
var MOCK_THEME_EMERGENCE = [
  { week: 'W1 Jan', medStrat: 2, clinDev: 1, pv: 0, mktAccess: 1, medInfo: 1 },
  { week: 'W2 Jan', medStrat: 3, clinDev: 2, pv: 0, mktAccess: 1, medInfo: 2 },
  { week: 'W3 Jan', medStrat: 2, clinDev: 1, pv: 1, mktAccess: 2, medInfo: 1 },
  { week: 'W4 Jan', medStrat: 4, clinDev: 3, pv: 0, mktAccess: 1, medInfo: 1 },
  { week: 'W1 Feb', medStrat: 3, clinDev: 2, pv: 1, mktAccess: 2, medInfo: 2 },
  { week: 'W2 Feb', medStrat: 5, clinDev: 3, pv: 0, mktAccess: 3, medInfo: 1 },
  { week: 'W3 Feb', medStrat: 4, clinDev: 4, pv: 1, mktAccess: 2, medInfo: 2 },
  { week: 'W4 Feb', medStrat: 6, clinDev: 3, pv: 0, mktAccess: 2, medInfo: 2 },
  { week: 'W1 Mar', medStrat: 5, clinDev: 4, pv: 1, mktAccess: 3, medInfo: 1 },
  { week: 'W2 Mar', medStrat: 7, clinDev: 5, pv: 2, mktAccess: 2, medInfo: 3 },
  { week: 'W3 Mar', medStrat: 6, clinDev: 4, pv: 1, mktAccess: 4, medInfo: 2 },
  { week: 'W4 Mar', medStrat: 8, clinDev: 6, pv: 1, mktAccess: 3, medInfo: 2 },
  { week: 'W1 Apr', medStrat: 7, clinDev: 5, pv: 2, mktAccess: 3, medInfo: 2 },
  { week: 'W2 Apr', medStrat: 9, clinDev: 7, pv: 1, mktAccess: 4, medInfo: 3 },
  { week: 'W3 Apr', medStrat: 6, clinDev: 5, pv: 2, mktAccess: 3, medInfo: 2 },
];

// ── Audit logs ────────────────────────────────────────────────────
var MOCK_AUDIT_LOGS = (function() {
  var entries = [];
  var actions = ['insight_theme', 'routing_decision', 'follow_up_draft', 'precall_brief', 'rerun_synthesis', 'lineage_query', 'commercial_export'];
  var users = ['priya.mehta', 'james.okafor', 'rachel.lim', 'carlos.vega', 'anya.petrov', 'samuel.wright', 'compliance.audit'];
  var models = ['claude-opus-4-6', 'claude-sonnet-4-6'];
  var prompts = ['v7', 'v8', 'v9'];
  var base = new Date('2026-01-01');
  for (var i = 0; i < 60; i++) {
    var d = new Date(base.getTime() + i * 26 * 3600000);
    entries.push({
      id: 'aud-' + String(i+1).padStart(3,'0'),
      timestamp: d.toISOString(),
      userId: users[i % users.length],
      action: actions[i % actions.length],
      inputHash: 'sha256:' + Math.random().toString(36).substr(2, 16),
      outputHash: 'sha256:' + Math.random().toString(36).substr(2, 16),
      modelVersion: models[i % models.length],
      promptVersion: prompts[i % prompts.length],
      taxonomyVersion: i < 20 ? 'v3.0' : 'v3.1',
      routingDecision: ROUTING_DESTINATIONS[i % ROUTING_DESTINATIONS.length],
      tokenUsage: Math.floor(2400 + Math.random() * 6000),
    });
  }
  return entries;
})();

// ── Taxonomy versions ─────────────────────────────────────────────
var MOCK_TAXONOMY_VERSIONS = [
  { version: 'v3.1', date: '2026-02-01', status: 'Active', changeNote: 'Added Safety — Off-Label subcategory; refined Access — Reimbursement taxonomy nodes.' },
  { version: 'v3.0', date: '2025-10-15', status: 'Archived', changeNote: 'Major restructure: split Efficacy into Efficacy — Primary and Efficacy — Biomarker.' },
  { version: 'v2.4', date: '2025-07-01', status: 'Archived', changeNote: 'Added Regulatory — Endpoint Design; minor label clarifications.' },
  { version: 'v2.3', date: '2025-04-10', status: 'Archived', changeNote: 'Quarterly update — added 4 new leaf nodes per TA Medical Lead feedback.' },
  { version: 'v2.2', date: '2025-01-05', status: 'Archived', changeNote: 'Initial 2025 taxonomy baseline.' },
];

// ── Commercial themes (aggregated, N≥5, no HCP IDs) ──────────────
var MOCK_COMMERCIAL_THEMES = [
  { id:'ct-1', theme: 'HER2+ 3rd Line Unmet Need', ta: 'Oncology', signalCount: 14, trend: 'up', lastUpdated: '2026-04-17', summary: 'Consistent field signal across Northeast and Southeast regions: physicians report a gap in viable options for HER2+ solid tumor patients progressing after 2nd line therapy. Signal strength increasing over past 6 weeks.' },
  { id:'ct-2', theme: 'NGS Testing Gap — Community Oncology', ta: 'Oncology', signalCount: 9, trend: 'up', lastUpdated: '2026-04-16', summary: 'MSLs report community oncologists receiving pre-treated patients without adequate comprehensive genomic profiling, limiting precision therapy options in 2nd line. Consistent across 5+ independent field interactions.' },
  { id:'ct-3', theme: 'Payer Step Therapy Barriers', ta: 'Hematology', signalCount: 11, trend: 'up', lastUpdated: '2026-04-09', summary: 'Growing payer burden signal: multiple payers requiring additional prior therapy lines before approving VEL-208 triplet. Signal from 3+ independent KOLs in Midwest and West regions.' },
  { id:'ct-4', theme: 'MRD Negativity as Trial Endpoint', ta: 'Hematology', signalCount: 7, trend: 'flat', lastUpdated: '2026-04-15', summary: 'KOL interest in MRD negativity as a primary efficacy endpoint, following recent FDA guidance alignment. Field signal supports investigating this endpoint in future trial designs.' },
  { id:'ct-5', theme: 'BTK Resistance Sequencing Questions', ta: 'Oncology', signalCount: 6, trend: 'up', lastUpdated: '2026-04-09', summary: 'Field signal around BTK inhibitor resistance patterns and uncertainty about non-covalent sequencing strategies. Physicians seeking real-world data on post-BTKi sequencing options.' },
  { id:'ct-6', theme: 'Enzyme Replacement Dosing Frequency', ta: 'Rare Disease', signalCount: 5, trend: 'flat', lastUpdated: '2026-03-28', summary: 'Patient and caregiver preference consistently favors monthly over biweekly dosing schedules. Signal across multiple interactions from Tier 1 rare disease KOLs.' },
  { id:'ct-7', theme: 'Caregiver Burden as Outcome Measure', ta: 'Rare Disease', signalCount: 5, trend: 'up', lastUpdated: '2026-04-05', summary: 'KOLs recommend incorporating validated caregiver burden PRO instruments in future pediatric rare disease trials. Signal from 5 independent field interactions.' },
];

// ── Canned AI outputs for Post-Call Capture simulation ───────────
var MOCK_AI_OUTPUTS = {
  'default': {
    summary: 'The HCP expressed interest in mechanism of action data and current clinical trial landscape. Key themes identified: Unmet Need (Efficacy), Trial Feasibility, and Medical Information Request. No adverse event language detected.',
    followUpDraft: 'Dear Dr. [HCP Name],\n\nThank you for your time today. As discussed, I am sharing approved published data on [product] mechanism of action. Per your question on trial enrollment criteria, I have attached the current protocol synopsis for reference.\n\nPlease let me know if you would like additional information or to connect with a Medical Information specialist.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs',
    routing: { destination: 'Medical Strategy', confidence: 0.82, rationale: 'HCP question touches on competitive positioning and unmet need — routing to Medical Strategy for strategic awareness.' },
    aeFlag: false,
    themes: ['Unmet Need — Efficacy', 'Trial Feasibility'],
  },
  'adverse': {
    summary: 'Potential adverse event detected. HCP referenced a patient experiencing unexpected laboratory abnormalities possibly related to therapy. AE flag raised for PV review and human confirmation before routing.\n\nAdditional themes: Safety monitoring, Medical information request.',
    followUpDraft: 'Dear Dr. [HCP Name],\n\nThank you for flagging the laboratory findings in your patient. Our Medical Information team is reaching out to you directly to gather the required information for our pharmacovigilance reporting process under 21 CFR 314.80.\n\nA Medical Information specialist will contact you within 24 hours. Thank you for your diligence.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs',
    routing: { destination: 'Pharmacovigilance', confidence: 0.99, rationale: 'Potential spontaneous adverse event report detected. Mandatory routing to Pharmacovigilance per 21 CFR 314.80 obligation.' },
    aeFlag: true,
    themes: ['Safety — Adverse Event', 'Safety — Monitoring'],
  },
  'pediatric': {
    summary: 'HCP raised a reactive, unsolicited question about off-label use of the compound in a pediatric population. Per PhRMA Code, this is a permissible reactive discussion. Key themes: Safety — Off-Label (Pediatric), Clinical Development — Data Gap, Trial Feasibility.\n\nThis is the 4th independent field signal on this topic this quarter — escalation threshold exceeded. Routing to Clinical Development.',
    followUpDraft: 'Dear Dr. [HCP Name],\n\nThank you for your question today regarding use in the pediatric population. As discussed, I am sharing available published data on our compound in this setting. Our Medical Affairs team has noted the clinical interest and will work to understand what additional data generation might be appropriate.\n\nI will follow up with the Medical Information team to ensure you receive a complete response to your inquiry.\n\nBest regards,\n[MSL Name], PharmD\nField Medical Affairs',
    routing: { destination: 'Clinical Development', confidence: 0.97, rationale: 'Pediatric off-label signal has crossed the 3-interaction threshold — fourth independent KOL this quarter. Routing to Clinical Development for pipeline consideration.' },
    aeFlag: false,
    themes: ['Safety — Off-Label (Pediatric)', 'Clinical Development — Data Gap'],
  },
};

// ── Governance re-run templates ───────────────────────────────────
var MOCK_RERUN_RESULTS = {
  'Q3-2025-Oncology': {
    quarter: 'Q3 2025', ta: 'Oncology', modelVersion: 'claude-opus-4-6', promptVersion: 'v7',
    taxonomyVersion: 'v2.4', retrievalSnapshotId: 'snap-2025-09-30-onc',
    generatedAt: '2025-10-02T14:32:11Z', rerunAt: '2026-04-19T10:15:00Z',
    matchConfidence: 1.0,
    summary: 'Q3 2025 Oncology Roll-Up (REPRODUCED BIT-IDENTICALLY)\n\n**Top 3 Themes:**\n1. PD-L1 testing variability across community settings (n=18 interactions)\n2. HER2+ 2nd/3rd line unmet need emerging signal (n=11 interactions)\n3. IO combination fatigue and tolerability burden (n=9 interactions)\n\n**Routing Summary:** 14 signals → Medical Strategy, 9 → Clinical Dev, 3 → Market Access, 2 → PV, 5 → Medical Information\n\nThis synthesis is guaranteed bit-identical to the original Q3 2025 roll-up presented to Medical Strategy on October 4, 2025.',
    interactionCount: 58,
  },
  'Q4-2025-Hematology': {
    quarter: 'Q4 2025', ta: 'Hematology', modelVersion: 'claude-opus-4-6', promptVersion: 'v8',
    taxonomyVersion: 'v3.0', retrievalSnapshotId: 'snap-2025-12-31-hem',
    generatedAt: '2026-01-03T09:22:44Z', rerunAt: '2026-04-19T10:16:00Z',
    matchConfidence: 1.0,
    summary: 'Q4 2025 Hematology Roll-Up (REPRODUCED BIT-IDENTICALLY)\n\n**Top 3 Themes:**\n1. MRD endpoint adoption — growing KOL consensus (n=14 interactions)\n2. Payer access barriers — step therapy expansion to additional payers (n=12 interactions)\n3. CAR-T sequencing relative to VEL-208 — no clear guidance in field (n=8 interactions)\n\n**Routing Summary:** 11 signals → Medical Strategy, 7 → Clinical Dev, 8 → Market Access, 1 → PV\n\nBit-identical reproduction confirmed. Original generated Jan 3, 2026.',
    interactionCount: 47,
  },
};
