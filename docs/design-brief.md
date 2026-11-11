# UniSOC design brief

- **Product mechanism:** every alert opens the normalized event and its raw evidence, then can become a tracked incident.
- **Audience / task:** security analysts scan a live-like event stream, isolate severity/source, inspect evidence, and assign response.
- **Surface / mode:** security operations overview and event investigator; Operate.
- **Visual world:** low-glare charcoal analyst workstation. Monospace only for identifiers and measurements; off-white operational text; amber/red/green reserved for severity and state. Thin separators, no oversized KPI cards.
- **Navigation:** Overview, Events, Detections, Incidents, Assets, Threat Intel, Vulnerabilities, Audit.
- **First viewport:** compact identity/search/status rail; incident counts and ingestion health in one narrow strip; event feed dominates; selecting a row opens a persistent evidence inspector.
- **Primary interactions:** search and severity filter the event list; selecting an event opens normalized/raw tabs; simulate scenario sends events through API; create incident from selected event; change incident state and add an investigation note.
- **Tokens:** canvas #111311, raised surface #191c19, divider #303630, primary text #e8ebe5, muted #9ba49a, amber #e6ac54, critical #e0675d, success #76b98a; 12px mono data; 14px sans UI; 8px compact geometry.
- **Responsive:** dense 2-column investigator at desktop; on mobile list and inspector stack, filters become horizontal scroll controls.
- **States:** synthetic demo label; API connection indicator; empty filtered result; ingest failure with retry; disabled controls during submission.
