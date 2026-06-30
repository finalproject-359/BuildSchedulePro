import './styles.css';

const activities = [
  { id: 1, name: 'Mobilization', duration: 1, predecessors: '-' },
  { id: 2, name: 'Safety and Health Program', duration: 386, predecessors: '-' },
  { id: 3, name: 'Construction of Temporary Facilities', duration: 2, predecessors: '1' },
  { id: 4, name: 'Site Clearing', duration: 2, predecessors: '3' },
  { id: 5, name: 'Layout Staking', duration: 1, predecessors: '4' },
  { id: 6, name: 'Excavation', duration: 18, predecessors: '5' },
  { id: 7, name: 'Soil Poisoning', duration: 1, predecessors: '6' },
  { id: 8, name: 'Mat Foundation (Steel Works)', duration: 23, predecessors: '7' },
  { id: 9, name: 'Mat Foundation (Concreting)', duration: 18, predecessors: '8' },
  { id: 10, name: 'Steel Works for First Floor Column', duration: 4, predecessors: '9' },
  { id: 11, name: 'Steel Works of Shear Wall for First Floor', duration: 6, predecessors: '9' },
  { id: 12, name: 'Embankment and Compaction', duration: 5, predecessors: '10,11' },
  { id: 13, name: 'CHB Laying with Doors and Windows Openings for First Floor', duration: 8, predecessors: '12' },
  { id: 14, name: 'Electrical Works for Ground Floor', duration: 3, predecessors: '13' },
  { id: 15, name: 'Plumbing Works for Ground Floor', duration: 3, predecessors: '13' },
  { id: 16, name: 'Installation of reinforcement for Ground Floor Slab', duration: 5, predecessors: '14,15' },
  { id: 17, name: 'Pouring and Curing of Concrete of Ground Floor Slab', duration: 11, predecessors: '16' },
  { id: 18, name: 'Installation of Formworks for Column', duration: 3, predecessors: '17' },
  { id: 19, name: 'Installation of Formworks for Shear Wall of First Floor', duration: 6, predecessors: '17' },
  { id: 20, name: 'Pouring and Curing of Concrete for Column', duration: 5, predecessors: '18,19' },
];

const ganttItems = [
  { start: 0, span: 1, label: 'Mobilization', milestone: true },
  { start: 2, span: 386, label: 'Safety and Health Program', milestone: true },
  { start: 4, span: 8, label: 'Construction of Temporary Facilities' },
  { start: 9, span: 8, label: 'Site Clearing' },
  { start: 16, span: 4, label: 'Layout Staking' },
  { start: 21, span: 18, label: 'Excavation' },
  { start: 41, span: 3, label: 'Soil Poisoning' },
  { start: 45, span: 22, label: 'Mat Foundation (Steel Works)' },
  { start: 68, span: 15, label: 'Mat Foundation (Concreting)' },
  { start: 82, span: 7, label: 'Steel Works for First Floor Column' },
  { start: 86, span: 9, label: 'Steel Works of Shear Wall for First Floor' },
  { start: 94, span: 8, label: 'Embankment and Compaction' },
  { start: 103, span: 8, label: 'CHB Laying with Doors and Windows Openings for First Floor' },
  { start: 112, span: 6, label: 'Electrical Works for Ground Floor' },
  { start: 116, span: 6, label: 'Plumbing Works for Ground Floor' },
  { start: 121, span: 12, label: 'Installation of reinforcement for Ground Floor Slab' },
  { start: 134, span: 13, label: 'Pouring and Curing of Concrete of Ground Floor Slab' },
  { start: 148, span: 6, label: 'Installation of Formworks for Column' },
  { start: 154, span: 8, label: 'Installation of Formworks for Shear Wall of First Floor' },
  { start: 162, span: 8, label: 'Pouring and Curing of Concrete for Column' },
];

const navItems = ['Dashboard', 'Projects', 'Activities', 'Resources', 'Reports', 'Calendar'];
const toolbarItems = [
  ['Add Activity', 'primary'], ['Edit'], ['Delete', 'danger'], ['Import Excel'], ['Export Excel'],
  ['Auto Schedule', 'purple'], ['Generate PERT'], ['Critical Path'], ['Baseline'], ['Undo', 'muted'],
  ['Redo', 'muted'], ['Zoom In'], ['Zoom Out'], ['Today'],
];

function icon(label) {
  const icons = { Dashboard: '⌂', Projects: '▣', Activities: '☷', Resources: '♙', Reports: '▤', Calendar: '□' };
  return icons[label] || '⊙';
}

function render() {
  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand" aria-label="BuildSchedule Pro">
          <div class="brand-mark"><span></span><span></span><span></span></div>
          <strong>BuildSchedule <em>Pro</em></strong>
        </div>
        <nav aria-label="Primary navigation">
          ${navItems.map((item) => `<a class="${item === 'Projects' ? 'active' : ''}" href="#"><span>${icon(item)}</span>${item}</a>`).join('')}
        </nav>
        <div class="account"><span>♧</span><span>?</span><span class="avatar">●</span><span>Admin User</span><span>⌄</span></div>
      </header>

      <section class="project-summary">
        <div class="project-title">Project: <strong>5-STOREY BUILDING PROJECT</strong><span>104 Activities</span></div>
        <div class="date-summary">
          ${summary('Start', '01-Jun-2025')}
          ${summary('Finish', '21-Jun-2026')}
          ${summary('Total Duration', '386 Days')}
          <button class="btn primary">⚙ Project Settings</button>
        </div>
      </section>

      <main class="workspace">
        <div class="toolbar" aria-label="Project actions">
          ${toolbarItems.map(([label, tone = '']) => `<button class="btn ${tone}">${label === 'Add Activity' ? '+' : ''} ${label}</button>`).join('')}
        </div>

        <section class="schedule-card" aria-label="Project schedule">
          <div class="activity-table">
            <div class="table-head table-grid"><strong>Activity No.</strong><strong>Activity Name</strong><strong>Duration (Days)</strong><strong>Predecessors</strong></div>
            ${activities.map((activity) => `
              <div class="table-row table-grid">
                <span>${activity.id}</span><span title="${activity.name}">${activity.name}</span><span>${activity.duration}</span><span>${activity.predecessors}</span>
              </div>`).join('')}
          </div>
          <div class="gantt-panel">
            <div class="gantt-toolbar"><strong>Days</strong><span>Weeks</span><span>Months</span><div><label>Scale: <select><option>Days</option></select></label><label>Display: <select><option>All Activities</option></select></label><button class="icon-btn">⛶</button></div></div>
            <div class="timeline">
              <div class="tick-row">${Array.from({ length: 25 }, (_, index) => `<strong>${index === 24 ? 43 : index * 10 + 1}</strong>`).join('')}</div>
              <div class="today-marker" aria-label="Data date marker">1</div>
              ${ganttItems.map((item, index) => ganttBar(item, index)).join('')}
            </div>
          </div>
        </section>
      </main>

      <footer class="statusbar">
        <span>◷ Total Activities: <strong>104</strong></span>
        <span class="critical">▤ Critical Path Activities: <strong>61</strong></span>
        <span>Project Duration: <strong>386 Days</strong></span>
        <span>□ Data Date: <strong>01-Jun-2025</strong></span>
        <span class="saved">✓ Last saved: 2 minutes ago</span>
      </footer>
    </div>`;
}

function summary(label, value) {
  return `<div class="summary-item"><span>□</span><p>${label}<strong>${value}</strong></p></div>`;
}

function ganttBar(item, index) {
  const width = Math.max(item.span * 4, 10);
  return `<div class="gantt-row" style="top:${44 + index * 31}px">
    <span class="dependency"></span>
    <span class="gantt-bar ${item.milestone ? 'milestone' : ''}" style="left:${item.start * 4}px;width:${width}px"></span>
    <span class="gantt-label" style="left:${item.start * 4 + width + 14}px">${item.label}</span>
  </div>`;
}

render();
