async function loadNpcsPage() {
  const params = new URLSearchParams(window.location.search);
  const activeTimeline = params.get('timeline') || 'lenara';
  const activePlane = params.get('plane') || 'all';

  // --- Timeline switch ---
  const timelineEl = document.getElementById('timeline-switch');
  timelineEl.innerHTML = `
    <a href="npcs.html?timeline=lenara&plane=${activePlane}" class="${activeTimeline === 'lenara' ? 'active' : ''}">Lenara</a>
    <a href="npcs.html?timeline=aranel&plane=${activePlane}" class="${activeTimeline === 'aranel' ? 'active' : ''}">Aranel</a>
  `;

  // --- Plane filter (built from planes.json, preserves current timeline) ---
  const planesResponse = await fetch('/data/planes.json');
  const planes = await planesResponse.json();

  const filterEl = document.getElementById('plane-filter');
  const allButton = `<a href="npcs.html?timeline=${activeTimeline}&plane=all" class="${activePlane === 'all' ? 'active' : ''}">All</a>`;
  const planeButtons = planes.map(plane => {
    const label = activeTimeline === 'lenara' ? plane.lenaraName : plane.aranelName;
    return `<a href="npcs.html?timeline=${activeTimeline}&plane=${plane.id}" class="${activePlane === plane.id ? 'active' : ''}">${label}</a>`;
  }).join('');
  filterEl.innerHTML = allButton + planeButtons;

  // --- Filter NPCs by both timeline AND plane ---
  const npcsResponse = await fetch('/data/npcs.json');
  const npcs = await npcsResponse.json();

  const filteredNpcs = npcs.filter(npc => {
    const matchesTimeline = npc.timeline === activeTimeline;
    const matchesPlane = activePlane === 'all' || npc.plane === activePlane;
    return matchesTimeline && matchesPlane;
  });

  const grid = document.getElementById('npcs-grid');

  if (filteredNpcs.length === 0) {
    grid.innerHTML = '<p style="opacity: 0.6;">No NPCs recorded here yet.</p>';
    return;
  }

  grid.innerHTML = filteredNpcs.map(npc => `
    <a href="entry/temp-npcs.html?id=${npc.id}" class="entry-card">
      <div class="entry-card-portrait">
        <img src="${npc.portrait}" alt="${npc.name}">
      </div>
      <div class="entry-card-body">
        <div class="entry-card-name">${npc.name}</div>
        <div class="entry-card-title">${npc.role}</div>
        <p class="entry-card-blurb">${npc.blurb}</p>
      </div>
    </a>
  `).join('');
}

loadNpcsPage();