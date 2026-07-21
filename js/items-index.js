async function loadItemsGrid() {
  const response = await fetch('/data/items.json');
  const items = await response.json();
  const grid = document.getElementById('items-grid');

  grid.innerHTML = items.map(item => `
    <a href="entry/temp-item.html?id=${item.id}" class="entry-card">
      <div class="entry-card-portrait">
        <img src="${item.portrait}" alt="${item.name}">
      </div>
      <div class="entry-card-body">
        <div class="entry-card-name">${item.name}</div>
        <div class="entry-card-title">${item.type}</div>
        <p class="entry-card-blurb">${item.blurb}</p>
      </div>
    </a>
  `).join('');
}

loadItemsGrid();