async function loadSupernaturalPage() {
  const params = new URLSearchParams(window.location.search);
  const activeCategory = params.get('category') || 'Triarchy'; // default view

  // Render the switch
  const switchEl = document.getElementById('category-switch');
  switchEl.innerHTML = `
    <a href="supernatural.html?category=Triarchy" class="${activeCategory === 'Triarchy' ? 'active' : ''}">Triarchy</a>
    <a href="supernatural.html?category=Aevum" class="${activeCategory === 'Aevum' ? 'active' : ''}">Aevum</a>
  `;

  document.getElementById('category-heading').textContent =
    activeCategory === 'Triarchy' ? 'The Triarchy' : 'The Aevum';

  // Load and filter
  const response = await fetch('/data/supernatural.json');
  const deities = await response.json();
  const filtered = deities.filter(deity => deity.category === activeCategory);

  const grid = document.getElementById('deities-grid');

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="opacity: 0.6;">No entries recorded here yet.</p>';
    return;
  }

  grid.innerHTML = filtered.map(deity => `
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
  `).join('');
}

loadSupernaturalPage();