'use strict';

dayjs.extend(dayjs_plugin_relativeTime);

var h = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;
var useMemo = React.useMemo;
var useRef = React.useRef;
var useCallback = React.useCallback;

var _antd = antd;
var ConfigProvider = _antd.ConfigProvider;
var Layout = _antd.Layout;
var Menu = _antd.Menu;
var Button = _antd.Button;
var Switch = _antd.Switch;
var Table = _antd.Table;
var Tag = _antd.Tag;
var Alert = _antd.Alert;
var Tabs = _antd.Tabs;
var Select = _antd.Select;
var Input = _antd.Input;
var Spin = _antd.Spin;
var Progress = _antd.Progress;
var Tooltip = _antd.Tooltip;
var Badge = _antd.Badge;
var Divider = _antd.Divider;
var Space = _antd.Space;
var Modal = _antd.Modal;
var Descriptions = _antd.Descriptions;
var Timeline = _antd.Timeline;
var Empty = _antd.Empty;
var Form = _antd.Form;
var message = _antd.message;

var TextArea = Input ? Input.TextArea : null;

Highcharts.setOptions({
  colors: ['#543FDE', '#0070CC', '#28A464', '#CCB718', '#FF6543', '#E835A7', '#2EDCC4', '#A9734C'],
  chart: { style: { fontFamily: 'Inter, Lato, Helvetica Neue, Arial, sans-serif' } },
});

var dominoTheme = {
  token: {
    colorPrimary: '#543FDE',
    colorPrimaryHover: '#3B23D1',
    colorPrimaryActive: '#311EAE',
    colorText: '#2E2E38',
    colorTextSecondary: '#65657B',
    colorTextTertiary: '#8F8FA3',
    colorSuccess: '#28A464',
    colorWarning: '#CCB718',
    colorError: '#C20A29',
    colorInfo: '#0070CC',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#FAFAFA',
    colorBorder: '#E0E0E0',
    fontFamily: 'Inter, Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: 14,
    borderRadius: 4,
    borderRadiusLG: 8,
  },
  components: {
    Button: { primaryShadow: 'none', defaultShadow: 'none' },
    Table: { headerBg: '#FAFAFA', rowHoverBg: '#F5F5F5' },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────

function apiGet(path) {
  return fetch(path).then(function(r) { return r.json(); });
}

function apiPost(path, body) {
  return fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(function(r) { return r.json(); });
}

function tierColor(tier) {
  if (tier === 1) return 't1';
  if (tier === 2) return 't2';
  return 't3';
}

function routingColor(dest) {
  var map = {
    'Medical Strategy': 'med-strategy',
    'Clinical Development': 'clin-dev',
    'Pharmacovigilance': 'pv',
    'Market Access': 'mkt-access',
    'Medical Information': 'med-info',
  };
  return map[dest] || 'med-info';
}

function trendIcon(trend) {
  if (trend === 'up') return h('span', { className: 'trend-up' }, '↑');
  if (trend === 'down') return h('span', { className: 'trend-down' }, '↓');
  return h('span', { className: 'trend-flat' }, '→');
}

function taTag(ta) {
  var colorMap = { 'Oncology': 'purple', 'Hematology': 'blue', 'Rare Disease': 'green' };
  return h(Tag, { color: colorMap[ta] || 'default', key: ta }, ta);
}

function StatusBadge(props) {
  var status = props.status;
  var color = status === 'Routed' ? 'success' : status === 'Pending' ? 'warning' : 'default';
  return h(Tag, { color: color }, status);
}

function VersionTag(props) {
  return h('span', { className: 'version-tag' }, props.v);
}

// ── StatCard ───────────────────────────────────────────────────────────

function StatCard(props) {
  var cls = 'stat-card' + (props.onClick ? ' stat-card-clickable' : '') + (props.active ? ' stat-card-active' : '');
  return h('div', { className: cls, onClick: props.onClick || null },
    h('div', { className: 'stat-card-label' }, props.label),
    h('div', { className: 'stat-card-value ' + (props.color || '') }, props.value),
    props.sub ? h('div', { className: 'stat-card-sub' }, props.sub) : null
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE 1: Post-Call Capture
// ─────────────────────────────────────────────────────────────────────

var SAMPLE_NOTES = {
  'default': 'Met with Dr. Chen today at MSK. She expressed strong interest in our mechanism of action data for ZAR-041 and asked about trial enrollment criteria for KEYNOTE-811 extension cohort. Very engaged — she has 4 patients she believes would be good candidates.',
  'adverse': 'Follow-up with Dr. Al-Amin. She mentioned one of her pediatric patients on RDX-115 (8-year-old female) has had unexplained ALT/AST elevations at 2x ULN over the past two monitoring visits. She is managing conservatively but wanted to know if we have any DSMB signals on hepatic findings.',
  'pediatric': 'Dr. Al-Amin asked reactively about RDX-115 use in children aged 2-5 years. She has 4 patients in that age bracket whose families are asking about off-label use. Current label covers ages 6+. She mentioned she will be presenting this topic at the WORLD symposium in June.',
};

function PostCallCapturePage(props) {
  var useDummy = props.useDummy;

  var _s = useState(null); var stats = _s[0]; var setStats = _s[1];
  var _n = useState(''); var note = _n[0]; var setNote = _n[1];
  var _h = useState(null); var selectedHcp = _h[0]; var setSelectedHcp = _h[1];
  var _hcps = useState([]); var hcpList = _hcps[0]; var setHcpList = _hcps[1];
  var _ai = useState(null); var aiOutput = _ai[0]; var setAiOutput = _ai[1];
  var _loading = useState(false); var loading = _loading[0]; var setLoading = _loading[1];
  var _approved = useState(false); var approved = _approved[0]; var setApproved = _approved[1];
  var _sampleKey = useState('default'); var sampleKey = _sampleKey[0]; var setSampleKey = _sampleKey[1];

  useEffect(function() {
    if (useDummy) {
      setStats({ interactions: 7, avgDays: 4.2, insightsGenerated: 5, aeFlags: 1 });
      setHcpList(MOCK_HCPS);
    } else {
      apiGet('api/dashboard/stats').then(function(d) {
        setStats({ interactions: d.interactions, avgDays: d.avgDays, insightsGenerated: d.insightsRouted, aeFlags: d.aeFlags });
      }).catch(function() {});
      apiGet('api/hcps').then(setHcpList).catch(function() {});
    }
  }, [useDummy]);

  function loadSample(key) {
    setSampleKey(key);
    setNote(SAMPLE_NOTES[key]);
    setAiOutput(null);
    setApproved(false);
  }

  function submitNote() {
    if (!note.trim()) return;
    setLoading(true);
    setAiOutput(null);
    setApproved(false);
    var hcp = hcpList.find(function(h) { return h.id === selectedHcp; }) || hcpList[0];
    if (useDummy) {
      setTimeout(function() {
        var noteL = note.toLowerCase();
        var key = 'default';
        if (/adverse|elevation|reaction|alt|ast|hepatic|safety/.test(noteL)) key = 'adverse';
        else if (/pediatric|child|2.5|off.label|young/.test(noteL)) key = 'pediatric';
        var out = MOCK_AI_OUTPUTS[key];
        setAiOutput(out);
        setLoading(false);
      }, 1300);
    } else {
      apiPost('api/interactions/submit', {
        note: note,
        hcpId: hcp ? hcp.id : 'hcp-1',
        hcpName: hcp ? hcp.name : 'Dr. Sarah Chen',
        hcpTier: hcp ? hcp.tier : 1,
        ta: hcp ? (hcp.tas || [])[0] : 'Oncology',
        product: 'ZAR-041',
      }).then(function(d) {
        setAiOutput(d);
        setLoading(false);
      }).catch(function() { setLoading(false); });
    }
  }

  var hcpOptions = hcpList.map(function(h) {
    return { label: h.name + ' — ' + (h.tas || []).join('/') + ' | Tier ' + h.tier, value: h.id };
  });

  return h('div', null,
    h('div', { className: 'page-header' },
      h('h2', { className: 'page-title' }, 'Post-Call Capture'),
      h('p', { className: 'page-subtitle' }, 'Submit a post-call note — AI generates themed summary, follow-up draft, and routing recommendation in <60s')
    ),

    stats ? h('div', { className: 'stats-row' },
      h(StatCard, { label: 'Interactions This Week', value: stats.interactions, color: 'primary' }),
      h(StatCard, { label: 'Avg Time-to-Signal', value: stats.avgDays + 'd', color: 'success', sub: 'Target: <7 days' }),
      h(StatCard, { label: 'Insights Generated', value: stats.insightsGenerated, color: 'info' }),
      h(StatCard, { label: 'AE Flags (QTD)', value: stats.aeFlags, color: 'danger', sub: 'Requires PV review' })
    ) : null,

    h('div', { className: 'capture-layout' },
      // Left: input
      h('div', { className: 'note-input-area' },
        h('div', { style: { marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          h('span', { style: { fontWeight: 600, fontSize: 14 } }, 'Post-Call Note'),
          h(Space, null,
            h('span', { style: { fontSize: 11, color: '#8F8FA3' } }, 'Load sample:'),
            h(Button, { size: 'small', onClick: function() { loadSample('default'); } }, 'Standard'),
            h(Button, { size: 'small', onClick: function() { loadSample('adverse'); }, danger: true }, 'AE Signal'),
            h(Button, { size: 'small', onClick: function() { loadSample('pediatric'); }, style: { color: '#543FDE', borderColor: '#543FDE' } }, 'Pediatric OL')
          )
        ),

        h('div', { style: { marginBottom: 12 } },
          h('label', { style: { fontSize: 12, color: '#65657B', display: 'block', marginBottom: 4 } }, 'HCP'),
          h(Select, {
            style: { width: '100%' },
            placeholder: 'Select HCP',
            value: selectedHcp,
            onChange: function(v) { setSelectedHcp(v); },
            options: hcpOptions,
            showSearch: true,
            filterOption: function(input, opt) { return opt.label.toLowerCase().includes(input.toLowerCase()); },
          })
        ),

        h(TextArea || 'textarea', {
          rows: 12,
          value: note,
          onChange: function(e) { setNote(e.target.value); },
          placeholder: 'Dictate or type your post-call note here...\n\nTip: Try one of the sample notes above to see AE detection or Pediatric off-label routing in action.',
          style: { marginBottom: 12, fontSize: 13, lineHeight: 1.6 },
        }),

        h(Button, {
          type: 'primary',
          size: 'large',
          block: true,
          loading: loading,
          disabled: !note.trim(),
          onClick: submitNote,
        }, loading ? 'Analyzing...' : '⚡ Submit Note — Generate AI Summary'),

        h('p', { style: { fontSize: 11, color: '#8F8FA3', marginTop: 8, textAlign: 'center' } },
          'Model: ', h(VersionTag, { v: 'claude-opus-4-6' }), ' · Prompt: ', h(VersionTag, { v: 'v9' }), ' · Taxonomy: ', h(VersionTag, { v: 'v3.1' })
        )
      ),

      // Right: AI output
      h('div', { className: 'ai-output-area' },
        h('div', { style: { fontWeight: 600, fontSize: 14, marginBottom: 12 } }, 'AI Output'),

        loading ? h('div', { className: 'ai-thinking' },
          h(Spin, null),
          h('span', null, 'Analyzing note against MARS corpus and taxonomy...')
        ) : null,

        !loading && !aiOutput ? h('div', { className: 'empty-state' },
          h('div', { className: 'empty-state-icon' }, '📋'),
          h('div', { className: 'empty-state-text' }, 'Submit a note to see AI-generated insights')
        ) : null,

        !loading && aiOutput ? h('div', null,
          aiOutput.aeFlag ? h(Alert, {
            type: 'error',
            showIcon: true,
            message: '⚠️ Potential Adverse Event Detected',
            description: 'This note contains language suggestive of a spontaneous adverse event report. Mandatory routing to Pharmacovigilance under 21 CFR 314.80. Human confirmation required before PV intake record is created.',
            style: { marginBottom: 12 },
          }) : null,

          h(Tabs, {
            defaultActiveKey: 'summary',
            items: [
              {
                key: 'summary',
                label: 'Summary',
                children: h('div', null,
                  h('div', { style: { background: '#F8F8FC', borderRadius: 6, padding: '12px 14px', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 12 } },
                    aiOutput.summary
                  ),
                  h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
                    (aiOutput.themes || []).map(function(t) {
                      return h(Tag, { key: t, color: 'purple' }, t);
                    })
                  )
                ),
              },
              {
                key: 'followup',
                label: 'Follow-Up Draft',
                children: h('div', null,
                  h('div', { style: { background: '#F8F8FC', borderRadius: 6, padding: '12px 14px', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' } },
                    aiOutput.followUpDraft
                  ),
                  h(Button, { style: { marginTop: 10 }, size: 'small' }, '📋 Copy Draft')
                ),
              },
              {
                key: 'routing',
                label: 'Routing',
                children: h('div', null,
                  h('div', { style: { marginBottom: 12 } },
                    h('div', { style: { fontSize: 12, color: '#65657B', marginBottom: 6 } }, 'Recommended Destination'),
                    h('span', { className: 'routing-badge ' + routingColor(aiOutput.routing.destination) },
                      '→ ' + aiOutput.routing.destination
                    )
                  ),
                  h('div', { className: 'confidence-row' },
                    h('span', null, 'Confidence:'),
                    h(Progress, {
                      percent: Math.round(aiOutput.routing.confidence * 100),
                      size: 'small',
                      style: { flex: 1, marginLeft: 8 },
                      strokeColor: aiOutput.routing.confidence > 0.9 ? '#28A464' : '#543FDE',
                    })
                  ),
                  h('div', { style: { background: '#F8F8FC', borderRadius: 6, padding: '10px 12px', fontSize: 12, color: '#65657B', marginTop: 10, lineHeight: 1.6 } },
                    aiOutput.routing.rationale
                  ),

                  approved
                    ? h(Alert, { type: 'success', message: 'Routed — signal sent to ' + aiOutput.routing.destination, style: { marginTop: 12 } })
                    : h(Button, {
                        type: 'primary',
                        style: { marginTop: 12 },
                        onClick: function() { setApproved(true); message.success('Signal routed to ' + aiOutput.routing.destination); },
                      }, '✓ Approve & Route')
                ),
              },
            ],
          })
        ) : null
      )
    )
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE 2: MSL Lead Dashboard
// ─────────────────────────────────────────────────────────────────────

function DashboardPage(props) {
  var useDummy = props.useDummy;

  var _stats = useState(null); var stats = _stats[0]; var setStats = _stats[1];
  var _themes = useState([]); var themeData = _themes[0]; var setThemeData = _themes[1];
  var _interactions = useState([]); var interactions = _interactions[0]; var setInteractions = _interactions[1];
  var _filter = useState(null); var tableFilter = _filter[0]; var setTableFilter = _filter[1];
  var _ta = useState(null); var taFilter = _ta[0]; var setTaFilter = _ta[1];
  var _expanded = useState(null); var expandedRow = _expanded[0]; var setExpandedRow = _expanded[1];

  var themeChartRef = useRef(null);
  var donutChartRef = useRef(null);

  useEffect(function() {
    if (useDummy) {
      setStats({ interactions: 20, insightsRouted: 14, avgDays: 4.2, closedPct: 43, aeFlags: 2, pendingRouting: 3 });
      setThemeData(MOCK_THEME_EMERGENCE);
      setInteractions(MOCK_INTERACTIONS);
    } else {
      apiGet('api/dashboard/stats').then(setStats).catch(function() {});
      apiGet('api/dashboard/themes').then(setThemeData).catch(function() {});
      apiGet('api/interactions').then(setInteractions).catch(function() {});
    }
  }, [useDummy]);

  // Build theme chart
  useEffect(function() {
    if (!themeData.length || !themeChartRef.current) return;
    Highcharts.chart(themeChartRef.current, {
      chart: { type: 'column', height: 220 },
      title: { text: null },
      xAxis: { categories: themeData.map(function(d) { return d.week; }), labels: { style: { fontSize: '10px' } } },
      yAxis: { title: { text: null }, stackLabels: { enabled: false } },
      legend: { enabled: true, itemStyle: { fontSize: '11px' } },
      plotOptions: {
        column: {
          stacking: 'normal',
          cursor: 'pointer',
          point: {
            events: {
              click: function() {
                setTableFilter({ type: 'week', value: this.category });
              }
            }
          }
        }
      },
      series: [
        { name: 'Medical Strategy', data: themeData.map(function(d) { return d.medStrat; }) },
        { name: 'Clinical Dev', data: themeData.map(function(d) { return d.clinDev; }) },
        { name: 'Market Access', data: themeData.map(function(d) { return d.mktAccess; }) },
        { name: 'PV', data: themeData.map(function(d) { return d.pv; }), color: '#C20A29' },
        { name: 'Med Info', data: themeData.map(function(d) { return d.medInfo; }), color: '#A9734C' },
      ],
      credits: { enabled: false },
    });
  }, [themeData]);

  // Build donut chart
  useEffect(function() {
    if (!interactions.length || !donutChartRef.current) return;
    var counts = {};
    interactions.forEach(function(i) {
      var dest = i.routingDestination || 'Pending';
      counts[dest] = (counts[dest] || 0) + 1;
    });
    Highcharts.chart(donutChartRef.current, {
      chart: { type: 'pie', height: 220 },
      title: { text: null },
      plotOptions: {
        pie: {
          innerSize: '55%',
          cursor: 'pointer',
          dataLabels: { enabled: false },
          showInLegend: true,
          point: {
            events: {
              click: function() {
                var dest = this.name;
                setTableFilter(tableFilter && tableFilter.value === dest ? null : { type: 'dest', value: dest });
              }
            }
          }
        }
      },
      legend: { enabled: true, itemStyle: { fontSize: '11px' } },
      series: [{
        name: 'Interactions',
        data: Object.keys(counts).map(function(k) { return { name: k, y: counts[k] }; }),
      }],
      credits: { enabled: false },
    });
  }, [interactions]);

  var filteredInteractions = useMemo(function() {
    var result = interactions;
    if (taFilter) result = result.filter(function(i) { return i.ta === taFilter; });
    if (tableFilter) {
      if (tableFilter.type === 'dest') result = result.filter(function(i) { return (i.routingDestination || 'Pending') === tableFilter.value; });
    }
    return result;
  }, [interactions, tableFilter, taFilter]);

  var uniqueTas = useMemo(function() {
    var s = {};
    interactions.forEach(function(i) { s[i.ta] = true; });
    return Object.keys(s);
  }, [interactions]);

  var uniqueDests = useMemo(function() {
    var s = {};
    interactions.forEach(function(i) { s[i.routingDestination || 'Pending'] = true; });
    return Object.keys(s);
  }, [interactions]);

  var columns = [
    { title: 'MSL', dataIndex: 'mslName', key: 'msl', width: 160,
      filters: useMemo(function() { var s = {}; interactions.forEach(function(i) { s[i.mslName] = true; }); return Object.keys(s).map(function(n) { return { text: n, value: n }; }); }, [interactions]),
      onFilter: function(v, r) { return r.mslName === v; },
      sorter: function(a, b) { return a.mslName.localeCompare(b.mslName); },
    },
    { title: 'HCP', dataIndex: 'hcpName', key: 'hcp', width: 170,
      sorter: function(a, b) { return a.hcpName.localeCompare(b.hcpName); },
      render: function(name, rec) {
        return h('span', null,
          name,
          ' ',
          h('span', { className: 'tier-badge ' + tierColor(rec.hcpTier) }, 'T' + rec.hcpTier)
        );
      }
    },
    { title: 'TA', dataIndex: 'ta', key: 'ta', width: 110,
      filters: uniqueTas.map(function(t) { return { text: t, value: t }; }),
      onFilter: function(v, r) { return r.ta === v; },
      render: function(ta) { return taTag(ta); },
    },
    { title: 'Themes', dataIndex: 'themes', key: 'themes',
      render: function(themes) {
        return h('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
          (themes || []).slice(0, 2).map(function(t) { return h(Tag, { key: t, style: { fontSize: 11 } }, t); })
        );
      }
    },
    { title: 'Status', dataIndex: 'routingStatus', key: 'status', width: 100,
      filters: [{ text: 'Routed', value: 'Routed' }, { text: 'Pending', value: 'Pending' }],
      onFilter: function(v, r) { return r.routingStatus === v; },
      render: function(s, rec) {
        return h('div', null,
          h(StatusBadge, { status: s }),
          rec.aeFlag ? h('span', { className: 'status-flag ae-flag', style: { marginLeft: 4 } }, '⚠ AE') : null
        );
      }
    },
    { title: 'Destination', dataIndex: 'routingDestination', key: 'dest', width: 170,
      filters: uniqueDests.map(function(d) { return { text: d, value: d }; }),
      onFilter: function(v, r) { return (r.routingDestination || 'Pending') === v; },
      render: function(dest) {
        if (!dest) return h(Tag, { color: 'default' }, 'Pending');
        return h('span', { className: 'routing-badge ' + routingColor(dest) }, dest);
      }
    },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 105,
      sorter: function(a, b) { return new Date(a.date) - new Date(b.date); },
      defaultSortOrder: 'descend',
    },
  ];

  return h('div', null,
    h('div', { className: 'page-header' },
      h('h2', { className: 'page-title' }, 'MSL Lead Dashboard'),
      h('p', { className: 'page-subtitle' }, 'Team insight flow, theme emergence, routing status, and decision loop metrics')
    ),

    stats ? h('div', { className: 'stats-row' },
      h(StatCard, { label: 'Interactions (QTD)', value: stats.interactions, color: 'primary',
        active: !tableFilter && !taFilter, onClick: function() { setTableFilter(null); setTaFilter(null); } }),
      h(StatCard, { label: 'Insights Routed', value: stats.insightsRouted, color: 'info',
        active: tableFilter && tableFilter.value === 'Routed',
        onClick: function() { setTableFilter(tableFilter && tableFilter.value === 'Routed' ? null : { type: 'status', value: 'Routed' }); } }),
      h(StatCard, { label: 'Avg Time-to-Signal', value: stats.avgDays + 'd', color: 'success', sub: 'Target: <7 days' }),
      h(StatCard, { label: 'Decision Loop Closed', value: stats.closedPct + '%', color: 'success', sub: 'Target: 40%' }),
      h(StatCard, { label: 'AE Flags', value: stats.aeFlags, color: 'danger',
        active: tableFilter && tableFilter.type === 'ae',
        onClick: function() { setTableFilter(tableFilter && tableFilter.type === 'ae' ? null : { type: 'ae' }); } }),
      h(StatCard, { label: 'Pending Routing', value: stats.pendingRouting, color: 'warning',
        active: tableFilter && tableFilter.value === 'Pending',
        onClick: function() { setTableFilter(tableFilter && tableFilter.value === 'Pending' ? null : { type: 'dest', value: 'Pending' }); } })
    ) : null,

    h('div', { className: 'charts-row' },
      h('div', { className: 'chart-container' },
        h('div', { className: 'chart-title' }, 'Theme Emergence by Week — click bar to filter table'),
        h('div', { ref: themeChartRef, id: 'theme-chart' })
      ),
      h('div', { className: 'chart-container' },
        h('div', { className: 'chart-title' }, 'Routing Destinations — click segment to filter table'),
        h('div', { ref: donutChartRef, id: 'donut-chart' })
      )
    ),

    h('div', { className: 'panel' },
      h('div', { className: 'panel-header' },
        h('span', { className: 'panel-title' },
          tableFilter ? 'Interactions — ' + (tableFilter.value || 'AE Flags') : 'All Interactions'
        ),
        tableFilter ? h(Tag, {
          closable: true,
          onClose: function() { setTableFilter(null); },
          color: 'purple',
          style: { marginLeft: 4 }
        }, tableFilter.value || 'AE Flags') : null,
        h('div', { style: { marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' } },
          h('span', { style: { fontSize: 12, color: '#65657B' } }, 'Filter by TA:'),
          h(Select, {
            style: { width: 140 },
            placeholder: 'All TAs',
            value: taFilter,
            allowClear: true,
            onChange: function(v) { setTaFilter(v || null); },
            options: uniqueTas.map(function(t) { return { label: t, value: t }; }),
          })
        )
      ),
      h(Table, {
        dataSource: filteredInteractions,
        columns: columns,
        rowKey: 'id',
        size: 'small',
        pagination: { pageSize: 10, showSizeChanger: false },
        expandable: {
          expandedRowKeys: expandedRow ? [expandedRow] : [],
          onExpand: function(exp, rec) { setExpandedRow(exp ? rec.id : null); },
          expandedRowRender: function(rec) {
            return h('div', { style: { padding: '12px 24px', background: '#FAFAFA' } },
              h('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap' } },
                h('div', { style: { flex: 1, minWidth: 280 } },
                  h('div', { style: { fontSize: 11, fontWeight: 600, color: '#8F8FA3', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Source Note Snippet'),
                  h('div', { style: { fontSize: 12, lineHeight: 1.7, color: '#2E2E38', background: '#fff', border: '1px solid #E0E0E0', borderRadius: 6, padding: '10px 12px' } },
                    rec.rawNotes || '(Note captured via voice — transcript retained in governed corpus)'
                  )
                ),
                h('div', { style: { minWidth: 200 } },
                  h('div', { style: { fontSize: 11, fontWeight: 600, color: '#8F8FA3', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Provenance'),
                  h('div', { style: { fontSize: 12, lineHeight: 1.8 } },
                    h('div', null, 'Model: ', h(VersionTag, { v: rec.modelVersion || 'claude-opus-4-6' })),
                    h('div', null, 'Prompt: ', h(VersionTag, { v: rec.promptVersion || 'v9' })),
                    h('div', null, 'Taxonomy: ', h(VersionTag, { v: rec.taxonomyVersion || 'v3.1' })),
                    rec.insightId ? h('div', null, 'Insight: ', h(Tag, { color: 'purple', style: { fontSize: 10 } }, rec.insightId)) : null
                  )
                )
              )
            );
          }
        }
      })
    )
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE 3: Pre-Call Brief
// ─────────────────────────────────────────────────────────────────────

function PreCallBriefPage(props) {
  var useDummy = props.useDummy;

  var _hcps = useState([]); var hcpList = _hcps[0]; var setHcpList = _hcps[1];
  var _sel = useState(null); var selectedId = _sel[0]; var setSelectedId = _sel[1];
  var _brief = useState(null); var brief = _brief[0]; var setBrief = _brief[1];
  var _loading = useState(false); var loading = _loading[0]; var setLoading = _loading[1];

  useEffect(function() {
    if (useDummy) {
      setHcpList(MOCK_HCPS);
    } else {
      apiGet('api/hcps').then(setHcpList).catch(function() {});
    }
  }, [useDummy]);

  function selectHcp(id) {
    setSelectedId(id);
    setBrief(null);
    setLoading(true);
    if (useDummy) {
      setTimeout(function() {
        var mockBriefs = {
          'hcp-1': {
            profile: MOCK_HCPS[0],
            crossTaAlert: true,
            crossTaDetail: 'Dr. Chen has interactions recorded across Oncology (Dr. Mehta, 2 interactions) and Hematology (Dr. Lim, 1 interaction) this quarter. Cross-TA signal: pediatric off-label interest raised in both contexts.',
            recentSignals: ['HER2+ 3rd line unmet need', 'Pediatric dosing interest', 'Cross-TA pediatric off-label (Hematology)'],
            interactions: [
              { date: '2026-04-17', msl: 'Dr. Priya Mehta', ta: 'Oncology', product: 'ZAR-041', themes: ['HER2+ 3rd line unmet need', 'Pediatric dosing interest'] },
              { date: '2026-04-14', msl: 'Dr. Rachel Lim', ta: 'Hematology', product: 'VEL-208', themes: ['Cross-TA pediatric off-label', 'Off-label interest Hematology'] },
              { date: '2026-04-03', msl: 'Dr. Priya Mehta', ta: 'Oncology', product: 'ZAR-041', themes: ['HER2+ unmet need', 'Competitive landscape'] },
            ],
            publications: [
              { title: 'PD-L1 expression heterogeneity in gastric cancer', journal: 'JCO', year: 2024 },
              { title: 'HER2 amplification patterns in solid tumors', journal: 'NEJM', year: 2023 },
            ],
            trials: [
              { id: 'NCT04321567', title: 'KEYNOTE-811 Extension', phase: 'Phase III', role: 'PI' },
              { id: 'NCT05198742', title: 'DESTINY-Gastric03', phase: 'Phase II', role: 'Co-I' },
            ],
          },
          'hcp-5': {
            profile: MOCK_HCPS[4],
            crossTaAlert: false,
            crossTaDetail: null,
            recentSignals: ['Pediatric off-label 2–5y', 'ERT switching intent', 'Caregiver burden as outcome measure', '⚠️ AE: ALT/AST elevation (PV flag)'],
            interactions: [
              { date: '2026-04-12', msl: 'Dr. Anya Petrov', ta: 'Rare Disease', product: 'RDX-115', themes: ['Pediatric off-label 2–5y', 'ERT switching intent'] },
              { date: '2026-04-10', msl: 'Dr. Samuel Wright', ta: 'Rare Disease', product: 'RDX-115', themes: ['⚠️ AE: hepatic elevation', 'Enzyme monitoring'] },
              { date: '2026-04-05', msl: 'Dr. Anya Petrov', ta: 'Rare Disease', product: 'RDX-115', themes: ['Pediatric off-label 2–5y', 'Caregiver burden'] },
              { date: '2026-03-20', msl: 'Dr. Anya Petrov', ta: 'Rare Disease', product: 'RDX-115', themes: ['Pediatric off-label 2–5y', 'Natural history data gap'] },
            ],
            publications: [
              { title: 'Long-term outcomes in pediatric enzyme replacement therapy', journal: 'NEJM', year: 2024 },
            ],
            trials: [
              { id: 'NCT05439681', title: 'ILLUMINATE-C Pediatric Extension', phase: 'Phase III', role: 'PI' },
            ],
          },
        };
        setBrief(mockBriefs[id] || {
          profile: MOCK_HCPS.find(function(h) { return h.id === id; }) || MOCK_HCPS[0],
          crossTaAlert: false,
          crossTaDetail: null,
          recentSignals: ['No recent signals recorded'],
          interactions: [],
          publications: [],
          trials: [],
        });
        setLoading(false);
      }, 600);
    } else {
      apiGet('api/hcps/' + id + '/brief').then(function(d) {
        setBrief(d);
        setLoading(false);
      }).catch(function() { setLoading(false); });
    }
  }

  var hcpOptions = hcpList.map(function(h) {
    return { label: h.name + ' · ' + h.specialty + ' · ' + h.institution, value: h.id };
  });

  var pubColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Journal', dataIndex: 'journal', key: 'journal', width: 120 },
    { title: 'Year', dataIndex: 'year', key: 'year', width: 70, sorter: function(a, b) { return a.year - b.year; } },
  ];

  var trialColumns = [
    { title: 'NCT ID', dataIndex: 'id', key: 'id', width: 120, render: function(v) { return h('code', { style: { fontSize: 11 } }, v); } },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Phase', dataIndex: 'phase', key: 'phase', width: 100 },
    { title: 'Role', dataIndex: 'role', key: 'role', width: 80 },
  ];

  return h('div', null,
    h('div', { className: 'page-header' },
      h('h2', { className: 'page-title' }, 'Pre-Call Brief'),
      h('p', { className: 'page-subtitle' }, 'Select an HCP to generate a full cross-TA brief before your meeting')
    ),

    h('div', { className: 'panel' },
      h('div', { className: 'panel-body' },
        h('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          h(Select, {
            style: { flex: 1, maxWidth: 560 },
            size: 'large',
            placeholder: 'Search for an HCP...',
            value: selectedId,
            onChange: selectHcp,
            options: hcpOptions,
            showSearch: true,
            filterOption: function(input, opt) { return opt.label.toLowerCase().includes(input.toLowerCase()); },
          }),
          h('span', { style: { fontSize: 12, color: '#8F8FA3' } }, 'Try: Dr. Sarah Chen (cross-TA) or Dr. Fatima Al-Amin (AE flags)')
        )
      )
    ),

    loading ? h('div', { style: { textAlign: 'center', padding: 60 } }, h(Spin, { size: 'large' })) : null,

    !loading && brief ? h('div', null,
      // HCP Profile card
      h('div', { className: 'hcp-profile-card' },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 } },
          h('div', null,
            h('div', { className: 'hcp-name' }, brief.profile.name),
            h('div', { className: 'hcp-meta' }, brief.profile.specialty + ' · ' + brief.profile.institution),
            h('div', { className: 'hcp-tags-row' },
              h('span', { className: 'tier-badge ' + tierColor(brief.profile.tier) }, 'Tier ' + brief.profile.tier),
              (brief.profile.tas || []).map(function(ta) { return taTag(ta); }),
              h(Tag, null, brief.profile.pubCount + ' publications'),
            )
          ),
          brief.crossTaAlert ? h('div', { className: 'status-flag cross-ta', style: { fontSize: 13, padding: '6px 14px' } }, '🔗 Cross-TA HCP') : null
        ),

        brief.crossTaAlert && brief.crossTaDetail ? h(Alert, {
          type: 'info',
          showIcon: true,
          message: 'Cross-TA Signal Detected',
          description: brief.crossTaDetail,
          style: { marginTop: 14 },
        }) : null
      ),

      // Signals + timeline
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 } },
        h('div', { className: 'panel' },
          h('div', { className: 'panel-header' }, h('span', { className: 'panel-title' }, 'Recent Signals')),
          h('div', { className: 'panel-body' },
            h('ul', { style: { margin: 0, paddingLeft: 18, lineHeight: 1.9 } },
              (brief.recentSignals || []).map(function(s) {
                return h('li', { key: s, style: { fontSize: 13 } }, s);
              })
            )
          )
        ),
        h('div', { className: 'panel' },
          h('div', { className: 'panel-header' }, h('span', { className: 'panel-title' }, 'Interaction Timeline (' + (brief.interactions || []).length + ' interactions)')),
          h('div', { className: 'panel-body', style: { maxHeight: 240, overflowY: 'auto' } },
            (brief.interactions || []).length === 0 ? h('div', { style: { color: '#8F8FA3', fontSize: 13 } }, 'No prior interactions recorded') :
            h(Timeline, {
              items: (brief.interactions || []).map(function(i) {
                return {
                  color: '#543FDE',
                  children: h('div', null,
                    h('div', { style: { fontSize: 12, color: '#65657B' } }, i.date + ' · ' + i.msl),
                    h('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 2 } },
                      taTag(i.ta),
                      h(Tag, { style: { fontSize: 10 } }, i.product),
                      (i.themes || []).map(function(t) { return h(Tag, { key: t, color: 'purple', style: { fontSize: 10 } }, t); })
                    )
                  )
                };
              })
            })
          )
        )
      ),

      // Publications + Trials
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
        h('div', { className: 'panel' },
          h('div', { className: 'panel-header' }, h('span', { className: 'panel-title' }, 'Recent Publications')),
          (brief.publications || []).length === 0
            ? h('div', { className: 'panel-body', style: { color: '#8F8FA3', fontSize: 13 } }, 'No publications in database')
            : h(Table, { dataSource: brief.publications, columns: pubColumns, rowKey: 'title', size: 'small', pagination: false })
        ),
        h('div', { className: 'panel' },
          h('div', { className: 'panel-header' }, h('span', { className: 'panel-title' }, 'Trial Involvement')),
          (brief.trials || []).length === 0
            ? h('div', { className: 'panel-body', style: { color: '#8F8FA3', fontSize: 13 } }, 'No active trials in database')
            : h(Table, { dataSource: brief.trials, columns: trialColumns, rowKey: 'id', size: 'small', pagination: false })
        )
      )
    ) : null,

    !loading && !brief ? h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, '👤'),
      h('div', { className: 'empty-state-text' }, 'Select an HCP above to generate their pre-call brief')
    ) : null
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE 4: Governance Console
// ─────────────────────────────────────────────────────────────────────

function GovernancePage(props) {
  var useDummy = props.useDummy;

  var _stats = useState(null); var gStats = _stats[0]; var setGStats = _stats[1];
  var _insights = useState([]); var insights = _insights[0]; var setInsights = _insights[1];
  var _audit = useState([]); var auditLog = _audit[0]; var setAuditLog = _audit[1];
  var _taxonomy = useState([]); var taxonomy = _taxonomy[0]; var setTaxonomy = _taxonomy[1];

  // Re-run state
  var _quarter = useState('Q3-2025'); var quarter = _quarter[0]; var setQuarter = _quarter[1];
  var _ta = useState('Oncology'); var ta = _ta[0]; var setTa = _ta[1];
  var _taxVer = useState('v2.4'); var taxVer = _taxVer[0]; var setTaxVer = _taxVer[1];
  var _rerunResult = useState(null); var rerunResult = _rerunResult[0]; var setRerunResult = _rerunResult[1];
  var _rerunLoading = useState(false); var rerunLoading = _rerunLoading[0]; var setRerunLoading = _rerunLoading[1];

  // Lineage state
  var _lineageId = useState(null); var lineageId = _lineageId[0]; var setLineageId = _lineageId[1];
  var _lineage = useState(null); var lineage = _lineage[0]; var setLineage = _lineage[1];
  var _lineageLoading = useState(false); var lineageLoading = _lineageLoading[0]; var setLineageLoading = _lineageLoading[1];

  useEffect(function() {
    if (useDummy) {
      setGStats({ totalInsights: MOCK_INSIGHTS.length, rerunCount: 12, auditEvents: 60, taxonomyVersions: MOCK_TAXONOMY_VERSIONS.length });
      setInsights(MOCK_INSIGHTS);
      setAuditLog(MOCK_AUDIT_LOGS.slice(0, 50));
      setTaxonomy(MOCK_TAXONOMY_VERSIONS);
    } else {
      apiGet('api/insights').then(setInsights).catch(function() {});
      apiGet('api/governance/audit').then(setAuditLog).catch(function() {});
      apiGet('api/governance/taxonomy').then(setTaxonomy).catch(function() {});
      setGStats({ totalInsights: 7, rerunCount: 12, auditEvents: 60, taxonomyVersions: 5 });
    }
  }, [useDummy]);

  function runRerun() {
    setRerunLoading(true);
    setRerunResult(null);
    if (useDummy) {
      setTimeout(function() {
        var key = quarter + '-' + ta;
        var results = {
          'Q3-2025-Oncology': MOCK_RERUN_RESULTS['Q3-2025-Oncology'],
          'Q4-2025-Hematology': MOCK_RERUN_RESULTS['Q4-2025-Hematology'],
        };
        var r = results[key] || {
          quarter: quarter.replace('-',' '), ta: ta, modelVersion: 'claude-opus-4-6', promptVersion: 'v9',
          taxonomyVersion: taxVer, retrievalSnapshotId: 'snap-' + quarter.toLowerCase() + '-' + ta.toLowerCase().replace(' ', '-'),
          generatedAt: '2026-04-01T00:00:00Z', rerunAt: new Date().toISOString(),
          matchConfidence: 1.0,
          summary: quarter.replace('-',' ') + ' ' + ta + ' Roll-Up — REPRODUCED BIT-IDENTICALLY\n\nTop themes generated from ' + ta + ' interactions. Synthesis guaranteed bit-identical using pinned model claude-opus-4-6, prompt v9, taxonomy ' + taxVer + '.',
          interactionCount: 35,
        };
        setRerunResult(r);
        setRerunLoading(false);
      }, 1500);
    } else {
      apiGet('api/governance/rerun?quarter=' + quarter + '&ta=' + encodeURIComponent(ta) + '&taxonomy_version=' + taxVer).then(function(d) {
        setRerunResult(d);
        setRerunLoading(false);
      }).catch(function() { setRerunLoading(false); });
    }
  }

  function loadLineage(id) {
    setLineageId(id);
    setLineage(null);
    setLineageLoading(true);
    if (useDummy) {
      var mockLineage = {
        insightId: id,
        theme: (insights.find(function(i) { return i.id === id; }) || {}).theme || 'Unknown Theme',
        steps: [
          { step: 'Field Interaction', status: 'completed', detail: '4 HCP interactions captured across MSLs', timestamp: '2026-04-12' },
          { step: 'Voice / Text Capture', status: 'completed', detail: 'Post-call notes ingested to governed corpus', timestamp: '2026-04-12' },
          { step: 'AI Theming', status: 'completed', detail: 'Model: claude-opus-4-6 | Prompt: v9 | Taxonomy: v3.1 | Snapshot: snap-2026-04-14-001', timestamp: '2026-04-14' },
          { step: 'Routing Decision', status: 'completed', detail: 'Routed to Clinical Development | Confidence: 97%', timestamp: '2026-04-14' },
          { step: 'MSL Approval', status: 'completed', detail: 'MSL Dr. Anya Petrov approved routing', timestamp: '2026-04-14' },
          { step: 'Downstream Decision', status: id === 'ins-003' ? 'completed' : 'pending', detail: id === 'ins-003' ? 'ILLUMINATE-C Pediatric Extension — 2–5y cohort feasibility review initiated' : 'Awaiting downstream decision linkage', timestamp: id === 'ins-003' ? '2026-04-18' : null },
        ],
        modelVersion: 'claude-opus-4-6', promptVersion: 'v9', taxonomyVersion: 'v3.1',
        retrievalSnapshotId: 'snap-2026-04-14-001',
        decisionLinked: id === 'ins-003' || id === 'ins-001' || id === 'ins-005' || id === 'ins-007',
        decisionType: id === 'ins-003' ? 'ILLUMINATE-C Pediatric Extension feasibility review' : id === 'ins-001' ? 'STELLAR-4 expansion cohort consideration' : null,
      };
      setTimeout(function() { setLineage(mockLineage); setLineageLoading(false); }, 500);
    } else {
      apiGet('api/governance/lineage/' + id).then(function(d) {
        setLineage(d);
        setLineageLoading(false);
      }).catch(function() { setLineageLoading(false); });
    }
  }

  var auditColumns = [
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'ts', width: 170, render: function(v) { return h('span', { style: { fontSize: 11, fontFamily: 'monospace' } }, v ? v.substring(0,19).replace('T',' ') : '—'); }, sorter: function(a,b) { return new Date(a.timestamp) - new Date(b.timestamp); }, defaultSortOrder: 'descend' },
    { title: 'User', dataIndex: 'userId', key: 'user', width: 140,
      filters: useMemo(function() { var s = {}; auditLog.forEach(function(a) { s[a.userId] = true; }); return Object.keys(s).map(function(u) { return { text: u, value: u }; }); }, [auditLog]),
      onFilter: function(v, r) { return r.userId === v; },
    },
    { title: 'Action', dataIndex: 'action', key: 'action', width: 160,
      filters: useMemo(function() { var s = {}; auditLog.forEach(function(a) { s[a.action] = true; }); return Object.keys(s).map(function(a) { return { text: a, value: a }; }); }, [auditLog]),
      onFilter: function(v, r) { return r.action === v; },
      render: function(a) { return h(Tag, { color: 'blue', style: { fontSize: 10 } }, a); }
    },
    { title: 'Model', dataIndex: 'modelVersion', key: 'model', width: 140, render: function(v) { return h(VersionTag, { v: v || 'claude-opus-4-6' }); } },
    { title: 'Prompt', dataIndex: 'promptVersion', key: 'prompt', width: 70, render: function(v) { return h(VersionTag, { v: v || 'v9' }); } },
    { title: 'Routing', dataIndex: 'routingDecision', key: 'routing', width: 150, render: function(d) { return d ? h('span', { className: 'routing-badge ' + routingColor(d), style: { fontSize: 10, padding: '1px 7px' } }, d) : '—'; } },
    { title: 'Tokens', dataIndex: 'tokenUsage', key: 'tokens', width: 80, sorter: function(a,b) { return a.tokenUsage - b.tokenUsage; } },
  ];

  var taxColumns = [
    { title: 'Version', dataIndex: 'version', key: 'v', width: 80, render: function(v) { return h(VersionTag, { v: v }); } },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 100 },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 90, render: function(s) { return h(Tag, { color: s === 'Active' ? 'green' : 'default' }, s); } },
    { title: 'Change Note', dataIndex: 'changeNote', key: 'note' },
  ];

  var insightColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: function(v) { return h(Tag, { color: 'purple', style: { cursor: 'pointer', fontSize: 10 }, onClick: function() { loadLineage(v); } }, v); } },
    { title: 'Theme', dataIndex: 'theme', key: 'theme' },
    { title: 'Taxonomy', dataIndex: 'taxonomy', key: 'tax', width: 190 },
    { title: 'Confidence', dataIndex: 'confidence', key: 'conf', width: 110, render: function(c) { return h(Progress, { percent: Math.round(c * 100), size: 'small', strokeColor: c > 0.9 ? '#28A464' : '#543FDE' }); } },
    { title: 'Routed To', dataIndex: 'routedTo', key: 'rt', width: 170, render: function(d) { return d ? h('span', { className: 'routing-badge ' + routingColor(d), style: { fontSize: 10, padding: '1px 7px' } }, d) : '—'; } },
    { title: 'Decision', dataIndex: 'decisionLinked', key: 'dec', width: 80, render: function(v) { return v ? h(Tag, { color: 'green' }, '✓ Linked') : h(Tag, { color: 'default' }, 'Pending'); } },
    { title: 'Lineage', key: 'lineage', width: 80, render: function(_, rec) { return h(Button, { size: 'small', onClick: function() { loadLineage(rec.id); } }, 'View'); } },
  ];

  var tabItems = [
    {
      key: 'rerun',
      label: 'Insight Re-Run',
      children: h('div', { style: { padding: 18 } },
        h('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' } },
          h('div', null,
            h('div', { style: { fontSize: 11, color: '#65657B', marginBottom: 4 } }, 'Quarter'),
            h(Select, { value: quarter, onChange: setQuarter, style: { width: 140 },
              options: [{ value: 'Q3-2025', label: 'Q3 2025' }, { value: 'Q4-2025', label: 'Q4 2025' }, { value: 'Q1-2026', label: 'Q1 2026' }] })
          ),
          h('div', null,
            h('div', { style: { fontSize: 11, color: '#65657B', marginBottom: 4 } }, 'Therapeutic Area'),
            h(Select, { value: ta, onChange: setTa, style: { width: 140 },
              options: [{ value: 'Oncology', label: 'Oncology' }, { value: 'Hematology', label: 'Hematology' }, { value: 'Rare Disease', label: 'Rare Disease' }] })
          ),
          h('div', null,
            h('div', { style: { fontSize: 11, color: '#65657B', marginBottom: 4 } }, 'Taxonomy Version'),
            h(Select, { value: taxVer, onChange: setTaxVer, style: { width: 100 },
              options: MOCK_TAXONOMY_VERSIONS.map(function(t) { return { value: t.version, label: t.version }; }) })
          ),
          h(Button, { type: 'primary', loading: rerunLoading, onClick: runRerun }, '↻ Regenerate Roll-Up')
        ),

        rerunLoading ? h('div', { style: { textAlign: 'center', padding: 40 } }, h(Spin, null), h('div', { style: { marginTop: 12, color: '#65657B', fontSize: 13 } }, 'Re-running synthesis with pinned model, prompt, and retrieval snapshot...')) : null,

        rerunResult ? h('div', null,
          h(Alert, {
            type: 'success',
            showIcon: true,
            message: 'Bit-Identical Reproduction Confirmed',
            description: h('div', null,
              h('span', null, 'Model: '), h(VersionTag, { v: rerunResult.modelVersion }), ' ',
              h('span', null, ' · Prompt: '), h(VersionTag, { v: rerunResult.promptVersion }), ' ',
              h('span', null, ' · Taxonomy: '), h(VersionTag, { v: rerunResult.taxonomyVersion }), ' ',
              h('span', null, ' · Snapshot: '), h(VersionTag, { v: rerunResult.retrievalSnapshotId }),
              h('div', { style: { marginTop: 4 } }, 'Original: ' + rerunResult.generatedAt + ' · Re-run: ' + rerunResult.rerunAt)
            ),
            style: { marginBottom: 12 },
          }),
          h('div', { style: { background: '#F8F8FC', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' } },
            rerunResult.summary
          ),
          h('div', { style: { marginTop: 10, color: '#8F8FA3', fontSize: 12 } }, 'Based on ' + rerunResult.interactionCount + ' interactions · Match confidence: ' + (rerunResult.matchConfidence * 100) + '%')
        ) : null
      ),
    },
    {
      key: 'lineage',
      label: 'Lineage Browser',
      children: h('div', { style: { padding: 18 } },
        h('div', { style: { marginBottom: 16 } },
          h('div', { style: { fontSize: 13, color: '#65657B', marginBottom: 10 } }, 'Select an insight to view its full lineage chain. Click an insight ID in the table below, or use the Insights table on the right.'),
          h('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            h(Select, {
              style: { width: 320 },
              placeholder: 'Select insight...',
              value: lineageId,
              onChange: loadLineage,
              options: insights.map(function(i) { return { value: i.id, label: i.id + ' — ' + i.theme }; }),
            })
          )
        ),

        lineageLoading ? h('div', { style: { textAlign: 'center', padding: 40 } }, h(Spin, null)) : null,

        lineage ? h('div', null,
          h('div', { style: { fontWeight: 600, fontSize: 14, marginBottom: 4 } }, lineage.theme),
          h('div', { style: { fontSize: 12, color: '#65657B', marginBottom: 16 } },
            'Model: ', h(VersionTag, { v: lineage.modelVersion }), ' · Prompt: ', h(VersionTag, { v: lineage.promptVersion }),
            ' · Taxonomy: ', h(VersionTag, { v: lineage.taxonomyVersion }), ' · Snapshot: ', h(VersionTag, { v: lineage.retrievalSnapshotId })
          ),

          h('div', { className: 'lineage-chain' },
            (lineage.steps || []).map(function(step, idx) {
              var isLast = idx === lineage.steps.length - 1;
              return h(React.Fragment, { key: step.step },
                h('div', { className: 'lineage-step' },
                  h(Tooltip, { title: h('div', null, h('div', null, step.detail), step.timestamp ? h('div', null, '📅 ' + step.timestamp) : null) },
                    h('div', { className: 'lineage-node ' + step.status },
                      step.status === 'completed' ? '✓' : step.status === 'active' ? '⟳' : '○'
                    )
                  ),
                  h('div', { className: 'lineage-label' }, step.step)
                ),
                !isLast ? h('div', { className: 'lineage-connector ' + step.status }) : null
              );
            })
          ),

          lineage.decisionLinked ? h(Alert, {
            type: 'success',
            showIcon: true,
            message: 'Downstream Decision Linked',
            description: lineage.decisionType,
            style: { marginTop: 12 },
          }) : h(Alert, {
            type: 'info',
            showIcon: true,
            message: 'No downstream decision linked yet',
            description: 'When a protocol amendment, IIT approval, or strategy pivot cites this insight, the link will appear here.',
            style: { marginTop: 12 },
          })
        ) : null
      ),
    },
    {
      key: 'audit',
      label: 'Audit Log',
      children: h('div', null,
        h(Table, {
          dataSource: auditLog,
          columns: auditColumns,
          rowKey: 'id',
          size: 'small',
          pagination: { pageSize: 15, showSizeChanger: false },
          scroll: { x: 900 },
        })
      ),
    },
    {
      key: 'taxonomy',
      label: 'Taxonomy Manager',
      children: h('div', { style: { padding: 18 } },
        h(Alert, { type: 'info', message: 'Taxonomy versions are immutable once pinned. New versions must be approved by the Medical Insights team before activation.', style: { marginBottom: 14 }, showIcon: true }),
        h(Table, {
          dataSource: taxonomy,
          columns: taxColumns,
          rowKey: 'version',
          size: 'small',
          pagination: false,
        })
      ),
    },
    {
      key: 'insights',
      label: 'Insights Registry',
      children: h(Table, {
        dataSource: insights,
        columns: insightColumns,
        rowKey: 'id',
        size: 'small',
        pagination: { pageSize: 10 },
        scroll: { x: 900 },
      }),
    },
  ];

  return h('div', null,
    h('div', { className: 'page-header' },
      h('h2', { className: 'page-title' }, 'Governance Console'),
      h('p', { className: 'page-subtitle' }, 'Insight re-runs, lineage browser, audit log, and taxonomy management')
    ),

    gStats ? h('div', { className: 'stats-row' },
      h(StatCard, { label: 'Total Insights (24 mo)', value: gStats.totalInsights, color: 'primary' }),
      h(StatCard, { label: 'Reproducible Re-Runs', value: gStats.rerunCount, color: 'success', sub: '100% bit-identical' }),
      h(StatCard, { label: 'Audit Events', value: gStats.auditEvents, color: 'info', sub: '7-year WORM retention' }),
      h(StatCard, { label: 'Taxonomy Versions', value: gStats.taxonomyVersions, color: 'warning' })
    ) : null,

    h('div', { className: 'panel' },
      h(Tabs, { items: tabItems, tabBarStyle: { paddingLeft: 18, paddingRight: 18 } })
    )
  );
}

// ─────────────────────────────────────────────────────────────────────
// PAGE 5: Commercial View (Firewall-Enforced)
// ─────────────────────────────────────────────────────────────────────

function CommercialViewPage(props) {
  var useDummy = props.useDummy;

  var _themes = useState([]); var themes = _themes[0]; var setThemes = _themes[1];
  var _taFilter = useState(null); var taFilter = _taFilter[0]; var setTaFilter = _taFilter[1];
  var _filter = useState(null); var tableFilter = _filter[0]; var setTableFilter = _filter[1];
  var chartRef = useRef(null);

  useEffect(function() {
    if (useDummy) {
      setThemes(MOCK_COMMERCIAL_THEMES);
    } else {
      apiGet('api/commercial/themes').then(setThemes).catch(function() {});
    }
  }, [useDummy]);

  // Monthly trend data (synthetic)
  var trendData = [
    { month: 'Nov', onco: 8, hem: 5, rd: 3 },
    { month: 'Dec', onco: 9, hem: 6, rd: 4 },
    { month: 'Jan', onco: 11, hem: 7, rd: 4 },
    { month: 'Feb', onco: 13, hem: 8, rd: 5 },
    { month: 'Mar', onco: 14, hem: 10, rd: 6 },
    { month: 'Apr', onco: 15, hem: 11, rd: 7 },
  ];

  useEffect(function() {
    if (!chartRef.current) return;
    Highcharts.chart(chartRef.current, {
      chart: { type: 'line', height: 220 },
      title: { text: null },
      xAxis: { categories: trendData.map(function(d) { return d.month; }) },
      yAxis: { title: { text: 'Signal Count (aggregated)' } },
      plotOptions: {
        line: {
          cursor: 'pointer',
          point: {
            events: {
              click: function() {
                var ta = this.series.name;
                setTaFilter(taFilter === ta ? null : ta);
              }
            }
          }
        }
      },
      series: [
        { name: 'Oncology',     data: trendData.map(function(d) { return d.onco; }) },
        { name: 'Hematology',   data: trendData.map(function(d) { return d.hem; }) },
        { name: 'Rare Disease', data: trendData.map(function(d) { return d.rd; }) },
      ],
      credits: { enabled: false },
    });
  }, [themes]);

  var filteredThemes = useMemo(function() {
    var result = themes;
    if (taFilter) result = result.filter(function(t) { return t.ta === taFilter; });
    if (tableFilter) result = result.filter(function(t) { return t.ta === tableFilter; });
    return result;
  }, [themes, taFilter, tableFilter]);

  var stats = useMemo(function() {
    var taSet = {};
    themes.forEach(function(t) { taSet[t.ta] = true; });
    var emerging = themes.filter(function(t) { return t.trend === 'up'; }).length;
    var suppressed = 2; // signals below N=5 threshold
    return { activeTas: Object.keys(taSet).length, emerging: emerging, suppressed: suppressed };
  }, [themes]);

  var columns = [
    { title: 'Theme', dataIndex: 'theme', key: 'theme',
      sorter: function(a, b) { return a.theme.localeCompare(b.theme); } },
    { title: 'Therapeutic Area', dataIndex: 'ta', key: 'ta', width: 140,
      filters: [{ text: 'Oncology', value: 'Oncology' }, { text: 'Hematology', value: 'Hematology' }, { text: 'Rare Disease', value: 'Rare Disease' }],
      onFilter: function(v, r) { return r.ta === v; },
      render: function(ta) { return taTag(ta); }
    },
    { title: 'Signal Count (N≥5)', dataIndex: 'signalCount', key: 'count', width: 150,
      sorter: function(a, b) { return a.signalCount - b.signalCount; },
      render: function(n) { return h('span', { style: { fontWeight: 600 } }, n + ' interactions'); }
    },
    { title: 'Trend', dataIndex: 'trend', key: 'trend', width: 80, render: function(t) { return trendIcon(t); } },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'updated', width: 120,
      sorter: function(a, b) { return new Date(a.lastUpdated) - new Date(b.lastUpdated); },
    },
  ];

  return h('div', null,
    h('div', { className: 'page-header' },
      h('h2', { className: 'page-title' }, 'Commercial View'),
      h('p', { className: 'page-subtitle' }, 'Aggregated, de-identified thematic trends — PhRMA Code compliant')
    ),

    h('div', { className: 'firewall-banner' },
      h('div', { className: 'firewall-banner-icon' }, '🔒'),
      h('div', { className: 'firewall-banner-text' },
        h('h4', null, 'PhRMA Code Compliant — Medical/Commercial Firewall Active'),
        h('p', null,
          'All themes are aggregated from a minimum of 5 independent field interactions (N≥5 threshold). No HCP identifiers, individual interaction data, or specific off-label references are visible in this view. Firewall policy is externally auditable by the Chief Compliance Officer. All access to this view is SIEM-logged.'
        )
      )
    ),

    h('div', { className: 'stats-row' },
      h(StatCard, { label: 'Active TA Theme Areas', value: stats.activeTas, color: 'primary' }),
      h(StatCard, { label: 'Emerging Signals (↑)', value: stats.emerging, color: 'info', sub: 'Increasing trend' }),
      h(StatCard, { label: 'Suppressed (N<5)', value: stats.suppressed, color: 'warning', sub: 'Below disclosure threshold' })
    ),

    h('div', { className: 'chart-container', style: { marginBottom: 20 } },
      h('div', { className: 'chart-title' }, 'Aggregated Theme Signal Trends by Month — No HCP data'),
      h('div', { ref: chartRef, id: 'commercial-chart' })
    ),

    h('div', { className: 'panel' },
      h('div', { className: 'panel-header' },
        h('span', { className: 'panel-title' }, taFilter ? 'Themes — ' + taFilter : 'All Aggregated Themes'),
        taFilter ? h(Tag, { closable: true, onClose: function() { setTaFilter(null); }, color: 'purple' }, taFilter) : null,
        h('div', { style: { marginLeft: 'auto', fontSize: 11, color: '#C20A29', fontWeight: 600 } }, '🔒 No HCP identifiers — aggregated only')
      ),
      h(Table, {
        dataSource: filteredThemes,
        columns: columns,
        rowKey: 'id',
        size: 'small',
        pagination: false,
        expandable: {
          expandedRowRender: function(rec) {
            return h('div', { style: { padding: '12px 24px', background: '#FAFAFA' } },
              h('div', { style: { fontSize: 12, fontWeight: 600, color: '#8F8FA3', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Aggregated Theme Summary'),
              h('div', { style: { fontSize: 13, lineHeight: 1.7, maxWidth: 700 } }, rec.summary),
              h(Alert, {
                type: 'warning',
                showIcon: true,
                message: 'Commercial Firewall: Source interactions, HCP identifiers, and individual signals are not accessible from this view.',
                style: { marginTop: 10 },
              })
            );
          }
        }
      })
    )
  );
}

// ─────────────────────────────────────────────────────────────────────
// SIDEBAR + APP SHELL
// ─────────────────────────────────────────────────────────────────────

var NAV_ITEMS = [
  { key: 'capture',    label: 'Post-Call Capture',   icon: '📝' },
  { key: 'dashboard',  label: 'MSL Lead Dashboard',  icon: '📊' },
  { key: 'precall',    label: 'Pre-Call Brief',       icon: '👤' },
  { key: 'governance', label: 'Governance Console',   icon: '🔍' },
  { key: 'commercial', label: 'Commercial View',      icon: '🔒' },
];

function App() {
  var _page = useState('dashboard'); var page = _page[0]; var setPage = _page[1];
  var _dummy = useState(true); var useDummy = _dummy[0]; var setUseDummy = _dummy[1];

  function renderPage() {
    if (page === 'capture')    return h(PostCallCapturePage, { useDummy: useDummy });
    if (page === 'dashboard')  return h(DashboardPage, { useDummy: useDummy });
    if (page === 'precall')    return h(PreCallBriefPage, { useDummy: useDummy });
    if (page === 'governance') return h(GovernancePage, { useDummy: useDummy });
    if (page === 'commercial') return h(CommercialViewPage, { useDummy: useDummy });
    return null;
  }

  return h(ConfigProvider, { theme: dominoTheme },
    h('div', { className: 'app-shell' },

      // Top bar
      h('div', { className: 'app-topbar' },
        h('span', { className: 'topbar-brand' }, 'MSL', h('span', null, 'Field'), 'Insights'),
        h('div', { className: 'topbar-spacer' }),
        h('div', { className: 'dummy-data-toggle' },
          h('span', null, 'Dummy Data'),
          h(Switch, { checked: useDummy, onChange: setUseDummy, size: 'small' })
        ),
        h('span', { className: 'topbar-user' }, '⬢ Domino')
      ),

      // Sidebar
      h('div', { className: 'app-sidebar' },
        h('div', { className: 'nav-section-label' }, 'MSL Tools'),
        NAV_ITEMS.slice(0, 3).map(function(item) {
          return h('div', {
            key: item.key,
            className: 'nav-item' + (page === item.key ? ' active' : ''),
            onClick: function() { setPage(item.key); },
          },
            h('span', { className: 'nav-icon' }, item.icon),
            item.label
          );
        }),
        h(Divider, { style: { margin: '8px 0' } }),
        h('div', { className: 'nav-section-label' }, 'Governance'),
        NAV_ITEMS.slice(3).map(function(item) {
          return h('div', {
            key: item.key,
            className: 'nav-item' + (page === item.key ? ' active' : ''),
            onClick: function() { setPage(item.key); },
          },
            h('span', { className: 'nav-icon' }, item.icon),
            item.label
          );
        }),
        h('div', { className: 'nav-firewall-badge' },
          h('div', { style: { fontWeight: 700, marginBottom: 2 } }, '🔒 Firewall Active'),
          'Commercial view is PhRMA Code compliant. N≥5 threshold enforced.'
        )
      ),

      // Main content
      h('div', { className: 'app-content' },
        renderPage()
      )
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(App));
