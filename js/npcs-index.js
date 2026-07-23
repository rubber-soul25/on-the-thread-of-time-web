async function loadNpcsGrid() {
  const response = await fetch('/data/npcs.json');
  const npcs = await response.json();
  const container = document.getElementById('npcs-container');

  // Group NPCs by region
  const grouped = {};
  npcs.forEach(npc => {
    if (!grouped[npc.location]) {
      grouped[npc.location] = [];
    }
    grouped[npc.location].push(npc);
  });

  // Build one section per region
  container.innerHTML = Object.keys(grouped).map(location => `
    <section class="gallery-section">
      <h2>${location}</h2>
      <div class="entry-grid">
        ${grouped[location].map(npc => `
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
        `).join('')}
      </div>
    </section>
  `).join('');
}

loadNpcsGrid();