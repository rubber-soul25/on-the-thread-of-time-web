async function loadItemEntry() {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
    document.querySelector('main').innerHTML = '<p>No item specified.</p>';
    return;
  }

  const response = await fetch('/data/items.json');
  const items = await response.json();
  const item = items.find(i => i.id === itemId);

  if (!item) {
    document.querySelector('main').innerHTML = '<p>Item not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${item.name} — On the Thread of Time`;
  document.getElementById('item-portrait').src = item.portrait;
  document.getElementById('item-portrait').alt = item.name;
  document.getElementById('item-name').textContent = item.name;
  document.getElementById('item-type').textContent = item.type;
  document.getElementById('item-owner').textContent = item.owner;
  document.getElementById('item-description').textContent = item.description;
  document.getElementById('item-effects').textContent = item.effects;
}

loadItemEntry();