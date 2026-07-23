async function loadDeitiesGrid() {
  const response = await fetch('/data/triarchy.json');
  const deities = await response.json();
  const container = document.getElementById('deities-container');

  const grouped = {};
  deities.forEach(deity => {
    if (!grouped[deity.category]) {
      grouped[deity.category] = [];
    }
    grouped[deity.category].push(deity);
  });

  container.innerHTML = Object.keys(grouped).map(category => `
    <section class="gallery-section">
      <h2>${category === 'Triarchy' ? 'The Triarchy' : 'The Aevum'}</h2>
      <div class="entry-grid">
        ${grouped[category].map(deity => `
          <a href="entry/temp-supernatural.html?id=${deity.id}" class="entry-card">
            <div class="entry-card-portrait">
              <img src="${deity.portrait}" alt="${deity.name}">
            </div>
            <div class="entry-card-body">
              <div class="entry-card-name">${deity.name}</div>
              <div class="entry-card-title">${deity.domain}</div>
              <p class="entry-card-blurb">${deity.blurb}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `).join('');
}

loadDeitiesGrid();