async function loadPlaceEntry() {
  const params = new URLSearchParams(window.location.search);
  const placeId = params.get('id');

  if (!placeId) {
    document.querySelector('main').innerHTML = '<p>No place specified.</p>';
    return;
  }

  const response = await fetch('/data/places.json');
  const places = await response.json();
  const place = places.find(p => p.id === placeId);

  if (!place) {
    document.querySelector('main').innerHTML = '<p>Place not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${place.name} — On the Thread of Time`;
  document.getElementById('place-portrait').src = place.portrait;
  document.getElementById('place-portrait').alt = place.name;
  document.getElementById('place-name').textContent = place.name;
  document.getElementById('place-type').textContent = place.type;
  document.getElementById('place-timeline').textContent = place.timeline === 'lenara' ? 'Lenara' : 'Aranel';
  document.getElementById('place-ruled-by').textContent = place.ruledBy;
  document.getElementById('place-description').textContent = place.description;
  document.getElementById('place-history').textContent = place.history;
}

loadPlaceEntry();