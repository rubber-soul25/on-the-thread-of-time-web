async function loadOrgsGrid() {
  const response = await fetch('/data/organizations.json');
  const orgs = await response.json();
  const grid = document.getElementById('orgs-grid');

  grid.innerHTML = orgs.map(org => `
    <a href="entry/temp-organizations.html?id=${org.id}" class="entry-card">
      <div class="entry-card-portrait">
        <img src="${org.portrait}" alt="${org.name}">
      </div>
      <div class="entry-card-body">
        <div class="entry-card-name">${org.name}</div>
        <div class="entry-card-title">${org.type}</div>
        <p class="entry-card-blurb">${org.blurb}</p>
      </div>
    </a>
  `).join('');
}

loadOrgsGrid();