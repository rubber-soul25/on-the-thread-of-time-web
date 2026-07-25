const searchSources = [
  { file: '/data/characters.json', label: 'Characters', link: id => `/pages/entry/temp-character.html?id=${id}` },
  { file: '/data/places.json', label: 'Places', link: id => `/pages/entry/temp-place.html?id=${id}` },
 { file: '/data/npcs.json', label: 'NPCs', link: id => `/pages/entry/temp-npcs.html?id=${id}` },
 { file: '/data/items.json', label: 'Items', link: id => `/pages/entry/temp-item.html?id=${id}` },
{ file: '/data/organizations.json', label: 'Organizations', link: id => `/pages/entry/temp-organizations.html?id=${id}` },
{ file: '/data/supernatural.json', label: 'Supernatural', link: id => `/pages/entry/temp-supernatural.html?id=${id}` },
  { file: '/data/planes.json', label: 'Planes', link: id => `/pages/planes/plane.html?id=${id}&timeline=lenara` }
];

async function runSearch() {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim().toLowerCase();

  document.getElementById('search-query-display').textContent = query
    ? `Showing results for "${query}"`
    : 'Enter a search term above.';

  const container = document.getElementById('search-results-container');

  if (!query) {
    container.innerHTML = '';
    return;
  }

  // Fetch every data source at once
  const allResults = await Promise.all(
    searchSources.map(async source => {
      const response = await fetch(source.file);
      const items = await response.json();

     const matches = items.filter(item => {
    const name = (item.name || item.lenaraName || '').toLowerCase();
    const blurb = (item.blurb || item.description || item.lenaraDescription || '').toLowerCase();
    return name.includes(query) || blurb.includes(query);
    });

      return { label: source.label, link: source.link, matches };
    })
  );

  // Only show categories that actually have matches
  const nonEmptyResults = allResults.filter(result => result.matches.length > 0);

  if (nonEmptyResults.length === 0) {
    container.innerHTML = '<p style="opacity: 0.6;">No entries found.</p>';
    return;
  }

  container.innerHTML = nonEmptyResults.map(result => `
    <section class="search-results-section">
      <h2>${result.label}</h2>
      ${result.matches.map(item => `
        <a href="${result.link(item.id)}" class="search-result-item">
         <div class="search-result-name">${item.name || item.lenaraName}</div>
          <p class="search-result-blurb">${item.blurb || item.description || ''}</p>
        </a>
      `).join('')}
    </section>
  `).join('');
}

runSearch();